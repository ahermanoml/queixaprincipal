/* escores-motor.js — motor dos escores (todos menos a NIHSS): calcula o resultado (evaluate), monta o texto para o
   prontuário (buildText, formatos "lista" e "linha") e a ficha em branco para imprimir (fichaHTML).
   O miolo entre as marcas é cópia byte a byte de assets/escore.js do Ficha Vermelha (fichavermelha.pages.dev),
   para que o resultado e o texto copiado sejam idênticos aos do site original. Não edite o miolo: adapte em
   js/views/escores.js. tests/escores_parity.py e tests/fixtures/escores.json conferem a igualdade. */
const FV = (function () {
  /* --- início: cópia byte a byte --- */
  var LEVELS = {
    0: { bg: '#EEF2F3', fg: '#33454D' },
    1: { bg: '#DCEEF1', fg: '#0B4A58' },
    2: { bg: '#F6D58B', fg: '#12212B' },
    3: { bg: '#F2A65A', fg: '#12212B' },
    4: { bg: '#C2413A', fg: '#FFFFFF' }
  };
  var pad = function (n) { return String(n).padStart(2, '0'); };
  function num(n) { return String(Math.round(n * 10) / 10).replace('.', ','); }
  function signed(n) { return n > 0 ? '+' + num(n) : n < 0 ? '−' + num(-n) : '0'; }
  function stampNow() {
    var d = new Date();
    return { date: pad(d.getDate()) + '/' + pad(d.getMonth() + 1) + '/' + d.getFullYear(), time: pad(d.getHours()) + ':' + pad(d.getMinutes()) };
  }
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }

  function realItems(def) { return def.items.filter(function (it) { return it.type !== 'group'; }); }
  function visible(it, v) {
    if (!it.showIf) return true;
    for (var k in it.showIf) { if (v[k] !== it.showIf[k]) return false; }
    return true;
  }
  function initState(def) {
    var v = {};
    realItems(def).forEach(function (it) {
      if (it.type === 'check') v[it.id] = false;
      else if (typeof it.def === 'number') v[it.id] = it.def;
    });
    return v;
  }
  function itemPts(it, v) {
    if (it.type === 'num') return 0;
    if (it.type === 'check') return v[it.id] ? (it.pts || 0) : 0;
    if (typeof v[it.id] === 'number') return it.opts[v[it.id]].p;
    return 0;
  }
  function bandFor(bands, total) {
    for (var i = 0; i < bands.length; i++) if (total <= bands[i].upTo) return i;
    return bands.length - 1;
  }

  function fmtML(n) { return String(Math.round(n / 10) * 10).replace(/\B(?=(\d{3})+(?!\d))/g, '.'); }
  function parkland(def, v, R) {
    var form = def.items.filter(function (i) { return i.id === 'form'; })[0].opts[v.form || 0];
    var regra = 0;
    def.items.forEach(function (it) { if (it.type === 'check' && v[it.id]) regra += it.pts; });
    var scq = typeof v.scq === 'number' ? v.scq : regra;
    R.scq = scq; R.scqFrom = typeof v.scq === 'number' ? 'informada' : 'pela regra dos 9';
    R.missing = [];
    if (typeof v.peso !== 'number') R.missing.push({ t: 'Peso' });
    if (!scq) R.missing.push({ t: 'Superfície corporal queimada' });
    R.complete = R.missing.length === 0;
    R.bandIdx = -1;
    if (!R.complete) { R.valueText = '—'; R.value = 0; return R; }
    scq = Math.min(scq, 100);
    var total = form.p * v.peso * scq, half = total / 2;
    var h = typeof v.horas === 'number' ? Math.min(v.horas, 24) : 0;
    var feito = typeof v.feito === 'number' ? v.feito : 0;
    var diur = form.elec || (form.kid && v.peso < 30) ? 1 : 0.5;
    var t1 = '', t2 = '';
    if (h < 8) {
      var rest1 = Math.max(half - feito, 0), left = 8 - h;
      t1 = 'Primeiras 8 h: ' + fmtML(half) + ' mL' + (feito ? ' (faltam ' + fmtML(rest1) + ' mL)' : '') + ', cerca de ' + fmtML(rest1 / left) + ' mL/h ' + (h ? 'nas ' + String(Math.round(left * 10) / 10).replace('.', ',') + ' h que faltam' : 'por 8 h') + '.';
      t2 = ' Depois, ' + fmtML(half) + ' mL em 16 h (cerca de ' + fmtML(half / 16) + ' mL/h).';
    } else {
      var rest = Math.max(total - feito, 0), left2 = Math.max(24 - h, 1);
      t1 = 'Já passou das 8 h: ' + fmtML(rest) + ' mL restantes até completar 24 h, cerca de ' + fmtML(rest / left2) + ' mL/h.';
    }
    R.value = total;
    R.valueText = fmtML(total) + ' mL';
    R.band = { label: 'Ringer lactato em 24 h', level: 2, text: t1 + t2 + ' Ajustar pela diurese: alvo ' + String(diur).replace('.', ',') + ' mL/kg/h (cerca de ' + Math.round(diur * v.peso) + ' mL/h).' };
    R.extra = 'SCQ ' + String(Math.round(scq * 10) / 10).replace('.', ',') + '% ' + R.scqFrom + ' · ' + form.l + (form.kid && v.peso < 30 ? ' · somar manutenção com glicose' : '');
    return R;
  }

  /* Calcula o resultado. Retorna {complete, value, valueText, bandIdx, band, altLabel, extra, missing:[]} */
  function evaluate(def, v) {
    var items = realItems(def).filter(function (it) { return visible(it, v); });
    var missing = items.filter(function (it) { return (it.type === 'choice' || it.type === 'num') && !it.optional && typeof v[it.id] !== 'number'; });
    var R = { complete: missing.length === 0, missing: missing, extra: '' };

    if (def.kind === 'rule') {
      var on = items.filter(function (it) { return it.type === 'check' && v[it.id]; });
      var key;
      if (def.slug === 'hints') {
        var central = items.some(function (it) { return it.type === 'choice' && typeof v[it.id] === 'number' && it.opts[v[it.id]].central; });
        if (!central && !R.complete) { R.valueText = '—'; R.value = 0; return R; }
        R.complete = true;
        key = central ? 'central' : 'periferico';
        R.valueText = central ? 'Central' : 'Periférico';
        R.bandIdx = def.bands.map(function (b) { return b.key; }).indexOf(key);
        R.band = def.bands[R.bandIdx];
        R.value = central ? 1 : 0;
        return R;
      }
      if (!R.complete) { R.valueText = '—'; R.value = 0; return R; }
      if (def.slug === 'regra-canadense') {
        key = on.some(function (it) { return it.risk === 'alto'; }) ? 'alto' : on.some(function (it) { return it.risk === 'medio'; }) ? 'medio' : 'nenhum';
        R.valueText = on.length ? on.length + (on.length === 1 ? ' critério' : ' critérios') : 'Nenhum';
      } else if (def.slug === 'perc') {
        key = on.length ? 'pos' : 'neg';
        R.valueText = on.length + ' de 8';
      } else if (def.slug === 'ottawa') {
        var ankle = v.malzona && (v.lat || v.med || v.apoio);
        var foot = v.mediope && (v.meta5 || v.navic || v.apoio);
        key = ankle && foot ? 'ambos' : ankle ? 'tornozelo' : foot ? 'pe' : 'nenhum';
        R.valueText = ankle && foot ? 'Tornozelo e pé' : ankle ? 'Tornozelo' : foot ? 'Pé' : 'Sem RX';
      } else if (def.slug === 'nexus' || def.slug === 'sao-francisco' || def.anyRule) {
        key = on.length ? 'pos' : 'neg';
        R.valueText = on.length + ' de ' + items.length;
      } else if (def.slug === 'canadense-cervical') {
        var hi = on.some(function (it) { return it.risk === 'alto'; });
        var lo = on.some(function (it) { return it.risk === 'baixo'; });
        key = hi ? 'alto' : !lo ? 'semBaixo' : v.rotacao ? 'dispensa' : 'semRotacao';
        R.valueText = key === 'dispensa' ? 'Sem imagem' : 'Imagem';
      } else if (def.slug === 'pecarn') {
        key = on.some(function (it) { return it.risk === 'alto'; }) ? 'alto' : on.some(function (it) { return it.risk === 'medio'; }) ? 'medio' : 'baixo';
        R.valueText = key === 'alto' ? 'TC' : key === 'medio' ? 'Observar ou TC' : 'Sem TC';
      }
      R.bandIdx = def.bands.map(function (b) { return b.key; }).indexOf(key);
      R.band = def.bands[R.bandIdx];
      R.value = on.length;
      return R;
    }

    if (def.kind === 'addrs') {
      var grps = {};
      items.forEach(function (it) { if (it.type === 'check' && v[it.id]) grps[it.grp] = 1; });
      var n = Object.keys(grps).length;
      R.value = n; R.valueText = String(n); R.complete = true;
      R.bandIdx = bandFor(def.bands, n); R.band = def.bands[R.bandIdx];
      return R;
    }

    if (def.kind === 'parkland') return parkland(def, v, R);

    var total = 0;
    items.forEach(function (it) { total += itemPts(it, v); });
    R.value = total;
    R.valueText = num(total);

    if (def.kind === 'glasgow') {
      var base = ['o', 'v', 'm'];
      var ok = base.every(function (id) { return typeof v[id] === 'number'; });
      R.complete = ok;
      var ecg = 0;
      base.forEach(function (id) { if (typeof v[id] === 'number') ecg += def.items.filter(function (i) { return i.id === id; })[0].opts[v[id]].p; });
      R.value = ecg;
      R.valueText = String(ecg);
      R.ecgp = typeof v.pup === 'number' ? ecg + def.items.filter(function (i) { return i.id === 'pup'; })[0].opts[v.pup].p : null;
      if (ok && R.ecgp !== null) R.extra = 'ECG-P ' + R.ecgp;
      if (ok) { R.bandIdx = bandFor(def.bands, ecg); R.band = def.bands[R.bandIdx]; }
      return R;
    }

    if (def.kind === 'news2') {
      var three = items.some(function (it) { return it.type === 'choice' && !it.noPts && typeof v[it.id] === 'number' && it.opts[v[it.id]].p === 3; });
      if (R.complete) {
        var k = total >= 7 ? 'alto' : total >= 5 ? 'medio' : three ? 'tres' : 'baixo';
        R.bandIdx = def.bands.map(function (b) { return b.key; }).indexOf(k);
        R.band = def.bands[R.bandIdx];
      }
      return R;
    }

    if (R.complete) {
      R.bandIdx = bandFor(def.bands, total);
      R.band = def.bands[R.bandIdx];
      if (def.alt) R.altLabel = def.alt.bands[bandFor(def.alt.bands, total)].label;
    }
    return R;
  }

  function answerText(it, v) {
    if (it.type === 'num') return typeof v[it.id] === 'number' ? num(v[it.id]) + ' ' + it.unit : 'não informado';
    if (it.type === 'check') return v[it.id] ? 'sim' + (it.pts ? ' (' + signed(it.pts) + ')' : '') : 'não';
    if (typeof v[it.id] !== 'number') return 'não avaliado';
    var o = it.opts[v[it.id]];
    var label = o.l || ('nível ' + o.p);
    return label + (it.noPts ? '' : ' (' + signed(o.p) + ')');
  }

  function lowerFirst(s) { return /^[A-ZÀ-Ý][a-zà-ÿ]/.test(s) ? s.charAt(0).toLowerCase() + s.slice(1) : s; }
  function buildText(def, v, fmt) {
    var R = evaluate(def, v);
    var items = realItems(def).filter(function (it) { return visible(it, v); });
    if (def.kind === 'parkland') {
      var f = def.items.filter(function (i) { return i.id === 'form'; })[0].opts[v.form || 0].l;
      var regs = items.filter(function (it) { return it.type === 'check' && v[it.id]; }).map(function (it) { return it.s; });
      var head = def.title;
      if (!R.complete) return head + '\nIncompleto: falta ' + R.missing.map(function (m) { return m.t.toLowerCase(); }).join(' e ') + '.';
      var body = 'Peso ' + num(v.peso) + ' kg; SCQ ' + num(R.scq) + '% ' + R.scqFrom + (regs.length && R.scqFrom !== 'informada' ? ' (' + regs.join(', ') + ')' : '') + '; ' + f
        + (typeof v.horas === 'number' ? '; ' + num(v.horas) + ' h desde a queimadura' : '') + (typeof v.feito === 'number' ? '; já infundidos ' + fmtML(v.feito) + ' mL' : '') + '.';
      var res = 'Volume em 24 h: ' + R.valueText + ' de Ringer lactato. ' + R.band.text;
      return fmt === 'linha' ? head + ': ' + body + ' ' + res : head + '\n' + body + '\n' + res;
    }
    var unit = def.kind === 'rule' ? '' : ' pontos';
    var resLine = def.kind === 'rule'
      ? (R.band ? R.band.label : '')
      : R.valueText + unit + (R.band ? ' - ' + lowerFirst(R.band.label) : ' - incompleto') + (R.extra ? ' (' + R.extra + ')' : '') + (R.altLabel ? '; ' + R.altLabel + ' no modelo de três níveis' : '');
    if (def.kind === 'glasgow' && R.complete) {
      var parts = ['o', 'v', 'm'].map(function (id) { var it = def.items.filter(function (i) { return i.id === id; })[0]; return it.s + it.opts[v[id]].p; }).join(' ');
      resLine = 'ECG ' + R.value + ' (' + parts + ')' + (R.ecgp !== null ? ', ECG-P ' + R.ecgp : '') + ' - ' + lowerFirst(R.band.label);
      if (fmt === 'linha') {
        var pup = typeof v.pup === 'number' ? '. Pupilas: ' + lowerFirst(def.items.filter(function (i) { return i.id === 'pup'; })[0].opts[v.pup].l) : '';
        return def.title + ': ' + resLine + pup + '.';
      }
    }
    if (fmt === 'linha') {
      var bits = [];
      items.forEach(function (it) {
        if (it.type === 'check') { if (v[it.id]) bits.push(it.s); }
        else if (typeof v[it.id] === 'number') bits.push(it.s + ' ' + (it.opts[v[it.id]].l || it.opts[v[it.id]].p) + (it.noPts ? '' : ' (' + signed(it.opts[v[it.id]].p) + ')'));
      });
      var hasChecks = items.some(function (it) { return it.type === 'check'; });
      var tail = bits.length ? bits.join('; ') : (hasChecks ? 'nenhum critério presente' : '');
      if (hasChecks && bits.length && items.some(function (it) { return it.type === 'check' && !v[it.id]; })) tail += '; demais critérios ausentes';
      return def.title + ': ' + resLine + (tail ? '. ' + tail.charAt(0).toUpperCase() + tail.slice(1) : '') + '.';
    }
    var lines = [];
    var group = null;
    def.items.forEach(function (it) {
      if (it.type === 'group') { group = it.t; return; }
      if (!visible(it, v)) return;
      if (group) { lines.push(''); lines.push(group + ':'); group = null; }
      lines.push('- ' + it.t + ': ' + answerText(it, v));
    });
    return def.title + '\n'
      + 'Resultado: ' + resLine
      + (R.complete ? '' : '\nItens sem resposta: ' + R.missing.map(function (it) { return it.t; }).join(', '))
      + '\n\n' + lines.join('\n').replace(/^\n/, '');
  }

  /* Ficha para impressão: retorna HTML de uma página */
  function fichaHTML(def, v, blank) {
    var R = blank ? null : evaluate(def, v);
    var S = stampNow();
    var filled = R && (R.complete || def.kind === 'rule');
    var rows = '';
    def.items.forEach(function (it) {
      if (it.type === 'group') { rows += '<tr class="fg"><td colspan="3">' + esc(it.t) + '</td></tr>'; return; }
      if (!blank && !visible(it, v)) return;
      var opts = '';
      if (it.type === 'num') {
        opts = '<span class="fo">' + (!blank && typeof v[it.id] === 'number' ? '<b>' + esc(num(v[it.id])) + '</b>' : '__________') + ' ' + esc(it.unit) + '</span>';
      } else if (it.type === 'check') {
        var yes = !blank && v[it.id];
        opts = '<span class="fo' + (yes ? ' on' : '') + '"><i></i>Sim' + (it.pts ? ' (' + signed(it.pts) + ')' : '') + '</span>'
          + '<span class="fo' + (!blank && !v[it.id] ? ' on' : '') + '"><i></i>Não</span>';
      } else {
        it.opts.forEach(function (o, i) {
          var on = !blank && v[it.id] === i;
          opts += '<span class="fo' + (on ? ' on' : '') + '"><i></i>' + (o.l ? esc(o.l) : '') + (it.noPts ? '' : ' <b>(' + signed(o.p) + ')</b>') + '</span>';
        });
      }
      var pts = blank || it.type === 'num' ? '' : (it.type === 'check' || typeof v[it.id] === 'number') && !it.noPts && def.kind !== 'rule' ? signed(itemPts(it, v)) : '';
      rows += '<tr><td class="fd"><b>' + esc(it.t) + '</b>' + (it.h ? '<small>' + esc(it.h) + '</small>' : '') + '</td><td class="fopts">' + opts + '</td><td class="fp">' + pts + '</td></tr>';
    });
    var bands = def.bands.map(function (b, i) {
      var on = filled && R.bandIdx === i;
      return '<div class="fb' + (on ? ' on' : '') + '"><b>' + esc(b.r) + '</b> ' + esc(b.label) + '</div>';
    }).join('');
    var resultBox = '';
    if (filled && R.band) {
      resultBox = '<div class="fres"><span>RESULTADO · ' + S.date + ' ' + S.time + '<b>' + esc(R.band.label) + '</b></span><strong>' + esc(def.kind === 'rule' ? R.valueText : R.valueText) + '</strong></div>';
    }
    return '<div class="fpage">'
      + '<div class="fhead"><div><div class="fbrand">Ficha Vermelha</div><h1>' + esc(def.title) + '</h1>'
      + '<p>' + esc(def.kicker) + (def.range ? ' · pontuação de ' + esc(def.range) : '') + '</p></div>' + resultBox + '</div>'
      + '<div class="ffields"><div>PACIENTE</div><div>IDADE</div><div>PRONTUÁRIO</div><div>DATA E HORA</div></div>'
      + '<table class="ftable"><thead><tr><th>Critério</th><th>Resposta</th><th>' + (def.kind === 'rule' ? '' : 'Pontos') + '</th></tr></thead><tbody>' + rows
      + (def.kind === 'rule' ? '' : '<tr class="ftot"><td>Total</td><td></td><td class="fp">' + (filled ? esc(R.valueText) : '') + '</td></tr>')
      + '</tbody></table>'
      + '<div class="fbands"><div class="fbt">Interpretação</div>' + bands + '</div>'
      + (filled && R.band ? '<p class="fconduta"><b>Conduta sugerida:</b> ' + esc(R.band.text) + '</p>' : '')
      + '<div class="fsign"><div>MÉDICO(A)</div><div>CRM</div><div>ASSINATURA</div></div>'
      + '<div class="ffoot"><span>' + esc(def.note || '') + '</span><span>Fonte: ' + esc(def.ref) + '</span></div>'
      + '</div>';
  }
  /* --- fim: cópia byte a byte --- */
  return { evaluate: evaluate, buildText: buildText, fichaHTML: fichaHTML, LEVELS: LEVELS, num: num, signed: signed,
           realItems: realItems, visible: visible, initState: initState };
})();
