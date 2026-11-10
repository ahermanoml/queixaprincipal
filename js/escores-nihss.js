/* escores-nihss.js — cálculo e texto da NIHSS (página própria no Ficha Vermelha, fora do motor comum).
   Os dois miolos marcados são cópia byte a byte do script de fichavermelha.pages.dev/nihss/:
   totals / buildText / quickString (faixa, texto para o prontuário, entrada rápida) e renderFicha / whenFigs
   (ficha impressa). O estado (state) é o mesmo objeto que o original usa: {v: {id: pontos}, moment, fmt}. */
const NIHSSM = (function () {
  var ARM = NIHSS.ARM, LEG = NIHSS.LEG, FARM = NIHSS.FARM, ITEMS = NIHSS.ITEMS, MOMENTS = NIHSS.MOMENTS,
      MOM_TXT = NIHSS.MOM_TXT, FMTS = NIHSS.FMTS, BANDS = NIHSS.BANDS;
  var state = { v: {}, moment: 'Admissão', fmt: 'lista' };
  var $ = function (id) { return document.getElementById(id); };
  var has = function (id) { return typeof state.v[id] === 'number'; };
  var pad = function (n) { return String(n).padStart(2, '0'); };

  /* --- início: cópia byte a byte (cálculo e texto) --- */
  function totals() {
    var total = 0, answered = 0;
    ITEMS.forEach(function (it) { if (has(it.id)) { total += state.v[it.id]; answered++; } });
    var b = answered === 0 ? BANDS.none : total === 0 ? BANDS.zero : total <= 4 ? BANDS.leve : total <= 15 ? BANDS.mod : total <= 20 ? BANDS.modg : BANDS.grave;
    var bandText = total === 0 ? 'sem déficit mensurável' : 'déficit ' + b.label.toLowerCase();
    return { total: total, answered: answered, band: b, bandText: bandText };
  }

  function stampNow() {
    var d = new Date();
    return { date: pad(d.getDate()) + '/' + pad(d.getMonth() + 1) + '/' + d.getFullYear(), short: pad(d.getDate()) + '/' + pad(d.getMonth() + 1), time: pad(d.getHours()) + ':' + pad(d.getMinutes()) };
  }

  function joinE(list) { return list.length <= 1 ? (list[0] || '') : list.slice(0, -1).join(', ') + ' e ' + list[list.length - 1]; }
  function cap(s) { return s ? s.charAt(0).toUpperCase() + s.slice(1) : s; }

  function buildText() {
    var T = totals(), v = state.v;
    if (T.answered === 0) return 'Marque os itens para gerar o texto.';
    var byId = {};
    ITEMS.forEach(function (it) { byId[it.id] = it; });
    var missing = ITEMS.filter(function (it) { return !has(it.id); }).map(function (it) { return it.id; });
    var missingNote = missing.length ? 'Itens não avaliados: ' + missing.join(', ') + '.' : '';

    if (state.fmt === 'linha') {
      var parts = ITEMS.filter(function (it) { return has(it.id); }).map(function (it) { return it.s + ' ' + v[it.id]; });
      return 'NIHSS ' + T.total + ' (' + T.bandText + ') - ' + state.moment.toLowerCase() + ': ' + parts.join(', ') + '.' + (missingNote ? ' ' + missingNote : '');
    }

    if (state.fmt === 'descritivo') {
      var phr = function (ids) { return ids.filter(has).map(function (id) { return byId[id].p[v[id]]; }); };
      var out = [];
      var g1 = phr(['1a', '1b', '1c']);
      if (g1.length) out.push('Paciente ' + g1.join(', ') + '.');
      var g2 = phr(['2', '3', '4']);
      if (g2.length) out.push(cap(g2.join(', ')) + '.');
      var ARMP = ['sem queda', 'com queda antes de 10 s', 'com algum esforço contra a gravidade', 'sem esforço contra a gravidade', 'sem movimento'];
      var LEGP = ['sem queda', 'com queda antes de 5 s', 'com algum esforço contra a gravidade', 'sem esforço contra a gravidade', 'sem movimento'];
      var limbs = ['5a', '5b', '6a', '6b'].filter(has).map(function (id) { return byId[id]; });
      if (limbs.length) {
        var abn = limbs.filter(function (it) { return v[it.id] > 0; }).map(function (it) { return it.limb + ' ' + (it.arm ? ARMP : LEGP)[v[it.id]]; });
        var nor = limbs.filter(function (it) { return v[it.id] === 0; }).map(function (it) { return it.limb; });
        var m = abn.length ? joinE(abn) : '';
        if (nor.length) m += (abn.length ? '; ' : '') + (nor.length === 4 ? 'força preservada nos quatro membros, sem queda' : joinE(nor) + ' sem queda');
        out.push(cap(m) + '.');
      }
      var g4 = phr(['7', '8']);
      if (g4.length) out.push(cap(g4.join(', ')) + '.');
      var g5 = phr(['9', '10', '11']);
      if (g5.length) out.push(cap(g5.join(', ')) + '.');
      if (missingNote) out.push(missingNote);
      return 'NIHSS ' + MOM_TXT[state.moment] + ': ' + T.total + ' pontos - ' + T.bandText + '.\n' + out.join(' ');
    }

    var lines = ITEMS.map(function (it) {
      return it.id + '. ' + it.t.replace(' — ', ' - ') + ': ' + (has(it.id) ? v[it.id] + ' (' + it.o[v[it.id]].toLowerCase() + ')' : 'não avaliado');
    });
    return 'NIHSS - ' + state.moment + '\n'
      + 'Total: ' + T.total + ' pontos (' + T.bandText + ')' + (T.answered < 15 ? ' - incompleto, ' + T.answered + ' de 15 itens' : '') + '\n\n'
      + lines.join('\n');
  }

  function quickString() {
    var q = '';
    for (var i = 0; i < ITEMS.length; i++) { if (has(ITEMS[i].id)) q += String(state.v[ITEMS[i].id]); else break; }
    return q;
  }
  /* --- fim: cópia byte a byte --- */

  // entrada rápida: a mesma regra do campo "Entrada rápida" do original (um dígito por item, para no primeiro inválido)
  function parseQuick(value) {
    var raw = String(value || '').replace(/\D/g, '').slice(0, 15);
    var nv = {}, warn = '';
    for (var i = 0; i < raw.length; i++) {
      var d = parseInt(raw[i], 10), it = ITEMS[i];
      if (d > it.o.length - 1) { warn = 'O item ' + it.id + ' vai só até ' + (it.o.length - 1) + '.'; break; }
      nv[it.id] = d;
    }
    return { v: nv, warn: warn };
  }

  /* --- início: cópia byte a byte (ficha impressa) --- */
  function renderFicha(blank) {
    var T = totals(), S = stampNow(), col = MOMENTS.indexOf(state.moment);
    var filled = !blank && T.answered > 0;
    var head = $('fHead').children;
    for (var h = 2; h < head.length; h++) head[h].className = (filled && h - 2 === col) ? 'on' : '';
    function cells(valFn, extraCls) {
      var html = '';
      for (var c = 0; c < 4; c++) {
        var on = filled && c === col;
        html += '<td class="c' + (extraCls ? ' ' + extraCls : '') + (on ? ' on' : '') + '">' + (on ? valFn() : (extraCls === 'dt' ? '__/__ __:__' : '')) + '</td>';
      }
      return html;
    }
    var rows = '<tr><td class="id"></td><td class="desc"><b>Data e hora</b></td>' + cells(function () { return S.short + ' ' + S.time; }, 'dt') + '</tr>';
    ITEMS.forEach(function (it) {
      rows += '<tr><td class="id">' + it.id + '</td><td class="desc"><b>' + it.t + '</b><small>' + it.f + '</small>' + (it.x ? '<small class="x">' + it.x + '</small>' : '') + '</td>'
        + cells(function () { return has(it.id) ? state.v[it.id] : '—'; }) + '</tr>';
    });
    rows += '<tr class="tot"><td></td><td class="desc">Total (0–42)</td>' + cells(function () { return T.total; }) + '</tr>';
    $('fBody').innerHTML = rows;
    $('fScore').style.display = filled ? 'flex' : 'none';
    if (filled) {
      $('fScoreLbl').innerHTML = state.moment.toUpperCase() + ' · ' + S.short + ' ' + S.time + '<b>' + T.band.label + '</b>';
      $('fScoreVal').textContent = T.total;
    }
    var sev = $('fSev').children;
    var idx = !filled ? -1 : T.total === 0 ? 0 : T.total <= 4 ? 1 : T.total <= 15 ? 2 : T.total <= 20 ? 3 : 4;
    for (var s = 0; s < sev.length; s++) sev[s].classList.toggle('ring', s === idx);
    $('fFoot').textContent = filled
      ? 'Coluna ' + state.moment + ' preenchida pela calculadora em ' + S.date + ' ' + S.time + (T.answered < 15 ? ' · incompleta (' + T.answered + ' de 15 itens)' : '') + ' · Pontuar o que o paciente faz.'
      : 'Pontuar o que o paciente faz, não o que se acha que ele consegue. Registrar a 1ª resposta. Não treinar.';
  }
  function whenFigs(cb) {
    var imgs = Array.prototype.filter.call(document.querySelectorAll('#ficha img'), function (i) { return !i.complete; });
    var left = imgs.length, done = false;
    var fire = function () { if (!done) { done = true; cb(); } };
    if (!left) return fire();
    imgs.forEach(function (i) { var f = function () { if (--left <= 0) fire(); }; i.addEventListener('load', f); i.addEventListener('error', f); });
    setTimeout(fire, 4000);
  }
  /* --- fim: cópia byte a byte --- */

  return { state: state, totals: totals, buildText: buildText, quickString: quickString, parseQuick: parseQuick,
           renderFicha: renderFicha, whenFigs: whenFigs, has: has };
})();
