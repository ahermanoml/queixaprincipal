/* js/calc-motor.js — contas da aba Calculadoras (porte do dilui). Expõe um objeto global: CM.
   Parte 1 (até "daqui para baixo"): funções do dilui copiadas SEM MUDANÇA, por script — formatação pt-BR (fmt, fAuto,
   fML, fRate, fIn, num), concentração/vazão/dose da bomba (concOf, rateOf, doseOf, perUnit, concLabel), bolus por peso
   (bolus, byAge, rangeStr), cálculos especiais (CALC), pediatria (viaPed, lma, pesoEst, pasMin, idadeTxt) e os textos
   prontos (rxText, kitText). Não "melhore" estas funções: os textos copiados e as doses têm de bater com o dilui
   (tests/calc_paridade.py confere contra tests/calc_gabarito.json). Tudo fica dentro de uma função para que os nomes
   do dilui (num, fmt, S...) não colidam com os do site (num em js/peso.js é outra função). */
const CM = (() => {
const { INF, IOT, PED, EMG, RODAPE } = CALC_DADOS;
// estado da calculadora (mesmos campos do dilui). kg e age vêm da tela; o peso começa VAZIO (o dilui começava em 70).
// altura e sexo (volume corrente na intubação) também começam vazios.
const S = { kg:NaN, age:null, drug:'nora', a:4, d:234, ampQ:4, ampMl:4, dose:0.1, dil:'SG 5%', preset:0, reg:-1, altura:NaN, sexo:null };

/* ===== copiado do dilui sem mudança ===== */
const num = s => { if (s == null) return NaN; let t = String(s).trim().replace(/\s/g,''); if (t.includes(',')) t = t.replace(/\./g,'').replace(',','.'); return t === '' ? NaN : Number(t); };
const fIn = (n, d) => Number.isFinite(n) ? n.toLocaleString('pt-BR', { maximumFractionDigits: d, useGrouping: false }) : '';
const fmt = (n, d) => Number.isFinite(n) ? n.toLocaleString('pt-BR', { maximumFractionDigits: d }) : '—';
const fAuto = n => { const a = Math.abs(n); return fmt(n, a >= 100 ? 0 : a >= 10 ? 1 : a >= 0.1 ? 2 : 3); };
const fML = n => { const a = Math.abs(n); return fmt(n, a >= 10 ? 1 : 2); };
const fRate = n => fmt(n, n >= 1 ? 1 : 2);
const fDose = n => { const a = Math.abs(n); return fmt(n, a >= 10 ? 1 : a >= 1 ? 2 : 3); };

const numer = un => un.split('/')[0];
function factor(u, to){ const m = { mcg:1, mg:1000, g:1e6 }; if (u === to) return 1; if (m[u] && m[to]) return m[u] / m[to]; return 1; }
function byKg(un){ return un.split('/').includes('kg'); }
function perUnit(un, kg){ const p = un.split('/'); const t = p[p.length-1]; return (byKg(un) ? kg : 1) * (t === 'min' ? 60 : 1); }
function concOf(D, a, d, q, ml){ const tot = a*ml + d; const amt = a*q*factor(D.amp.u, numer(D.un)); return { tot, amt, conc: tot > 0 ? amt/tot : NaN }; }
function rateOf(D, dose, conc, kg){ return dose * perUnit(D.un, kg) / conc; }
function doseOf(D, rate, conc, kg){ return rate * conc / perUnit(D.un, kg); }
function concLabel(D, conc){
  const n = numer(D.un);
  if (n === 'g') return fAuto(conc*1000) + ' mg/mL';
  return fAuto(conc) + ' ' + n + '/mL';
}
function dilOptions(D){ if (/^Puro/i.test(D.dil)) return []; return D.dil.split(' ou ').map(s => s.replace(/\s*\(.*\)\s*/,'').trim()); }

const byAge = (tbl, age) => { if (!tbl || age == null) return null; for (const [cut, v] of tbl){ if (age < cut) return v; } return null; };
function bolus(it, kg, age, ped){
  let d = (ped && it.dPed) ? it.dPed : it.d;
  const da = byAge(it.dAge, age); if (da) d = da;
  const unit = it.u.split('/')[0];
  let max = it.max; const ma = byAge(it.maxBy, age); if (ma != null) max = ma;
  let lo = d[0]*kg, hi = (d[1] ?? d[0])*kg, capped = false, floored = false;
  if (max != null){ if (hi > max){ hi = max; capped = true; } if (lo > max){ lo = max; } }
  if (it.min != null){ if (lo < it.min){ lo = it.min; floored = true; } if (hi < it.min){ hi = it.min; } }
  const ml = (unit === 'mL') ? null : (it.c ? [lo/it.c, hi/it.c] : null);
  return { d, unit, lo, hi, ml, capped, floored, max };
}
function rangeStr(lo, hi, f){ return Math.abs(hi - lo) < 1e-9 ? f(lo) : f(lo) + '–' + f(hi); }

const okKg = kg => Number.isFinite(kg) && kg > 0;

const CALC = {
  choque(kg){
    if (!okKg(kg)) return noKg('Choque elétrico');
    const cap = v => Math.min(v, 200);
    const d1 = cap(2*kg), d2 = cap(4*kg), dmax = Math.min(10*kg, 200);
    const c1 = cap(0.5*kg), c2 = cap(1*kg), c3 = cap(2*kg);
    const r = v => fmt(Math.round(v),0);
    const sub = `<div class="sub">Desfibrilação: 2 J/kg → 4 J/kg → ≥ 4 J/kg (máx 10 J/kg ou 200 J).</div><div class="fx">Desfibrilar: ${r(d1)} J → ${r(d2)} J → até ${r(dmax)} J</div><div class="fx">Cardioverter: ${r(c1)}–${r(c2)} J → ${r(c3)} J</div><div class="sub">Cardioversão sincronizada: 0,5–1 J/kg → 2 J/kg.</div>`;
    return rowCustom('Choque elétrico', '', 'choque desfibrilação cardioversão', '', '', sub, `Desfibrilação: ${r(d1)} J → ${r(d2)} J → até ${r(dmax)} J. Cardioversão: ${r(c1)}–${r(c2)} J → ${r(c3)} J (peso ${fmt(kg,1)} kg).`);
  },
  holliday(kg){
    if (!okKg(kg)) return noKg('Manutenção (Holliday-Segar)');
    const h = Math.min(100, kg <= 10 ? 4*kg : kg <= 20 ? 40 + 2*(kg-10) : 60 + (kg-20));
    const sub = `<div class="sub">Regra 4-2-1 (mL/kg/h), teto de ~100 mL/h. Solução isotônica com glicose conforme a idade.</div>`;
    return rowCustom('Hidratação de manutenção', 'IV', 'holliday manutenção soro hidratação', `${fRate(h)} mL/h`, `${fmt(Math.round(h*24),0)} mL/dia`, sub, `Manutenção (Holliday-Segar): ${fRate(h)} mL/h = ${fmt(Math.round(h*24),0)} mL/dia (peso ${fmt(kg,1)} kg).`);
  },
  salbutamol(kg){
    if (!okKg(kg)) return noKg('Salbutamol spray');
    let lo = Math.min(10, Math.max(2, Math.round(kg/3)));
    let hi = Math.min(10, Math.max(lo, Math.round(kg/2)));
    const main = lo === hi ? `${lo} jatos` : `${lo}–${hi} jatos`;
    const sub = `<div class="sub">100 mcg/jato com espaçador · 1 jato a cada 2–3 kg (máx 10).</div><div class="sub">A cada 20 min na 1ª hora, depois conforme resposta.</div>`;
    return rowCustom('Salbutamol spray', 'IN', 'salbutamol aerolin spray asma broncoespasmo', main, '', sub, `Salbutamol spray 100 mcg/jato com espaçador: ${main} a cada 20 min na 1ª hora (peso ${fmt(kg,1)} kg).`);
  },
  altepAVC(kg){
    if (!okKg(kg)) return noKg('Alteplase (AVC)');
    const tot = Math.min(0.9*kg, 90), bol = tot*0.1, inf = tot*0.9;
    const sub = `<div class="sub">0,9 mg/kg (máx 90 mg) · reconstituir a 1 mg/mL e desprezar o excesso do frasco.</div><div class="fx">Bolus ${fAuto(bol)} mg (${fML(bol)} mL) em 1 min</div><div class="fx">Infusão ${fAuto(inf)} mg em 60 min = ${fRate(inf)} mL/h</div>`;
    return rowCustom('Alteplase (AVC)', 'IV', 'alteplase rtpa trombólise avc actilyse', `${fAuto(tot)} mg`, `${fML(tot)} mL`, sub, `Alteplase AVC: total ${fAuto(tot)} mg (0,9 mg/kg, peso ${fmt(kg,1)} kg) — bolus ${fAuto(bol)} mg em 1 min + ${fAuto(inf)} mg em 60 min (${fRate(inf)} mL/h a 1 mg/mL).`);
  },
  tnkIAM(kg, age){
    if (!okKg(kg)) return noKg('Tenecteplase (IAM)');
    const mg = kg < 60 ? 30 : kg < 70 ? 35 : kg < 80 ? 40 : kg < 90 ? 45 : 50;
    const old = age != null && age >= 75;
    const use = old ? mg/2 : mg;
    const sub = `<div class="sub">Faixas: &lt; 60 kg 30 mg · 60–69 35 · 70–79 40 · 80–89 45 · ≥ 90 50 mg. Bolus em 5–10 s. Reconstituída 5 mg/mL.</div><div class="sub">≥ 75 anos: metade da dose (ESC 2023).${old ? ' <b>Aplicada pela idade informada.</b>' : ''}</div>`;
    return rowCustom('Tenecteplase (IAM)', 'IV', 'tenecteplase tnk metalyse iam trombólise', `${fmt(use,1)} mg`, `${fML(use/5)} mL`, sub, `Tenecteplase IAM: ${fmt(use,1)} mg (${fML(use/5)} mL a 5 mg/mL) em bolus — peso ${fmt(kg,1)} kg${old ? ', metade da dose por idade ≥ 75' : ''}.`);
  },
  altepIAM(kg){
    if (!okKg(kg)) return noKg('Alteplase (IAM, acelerado)');
    const f2 = Math.min(0.75*kg, 50), f3 = Math.min(0.5*kg, 35), tot = 15 + f2 + f3;
    const sub = `<div class="sub">15 mg bolus + 0,75 mg/kg em 30 min (máx 50) + 0,5 mg/kg em 60 min (máx 35). Solução 1 mg/mL.</div><div class="fx">Bolus 15 mg (15 mL)</div><div class="fx">${fAuto(f2)} mg em 30 min = ${fRate(f2*2)} mL/h</div><div class="fx">${fAuto(f3)} mg em 60 min = ${fRate(f3)} mL/h</div>`;
    return rowCustom('Alteplase (IAM, acelerado)', 'IV', 'alteplase rtpa iam trombólise', `${fAuto(tot)} mg`, 'total', sub, `Alteplase IAM acelerado (peso ${fmt(kg,1)} kg): 15 mg bolus + ${fAuto(f2)} mg em 30 min (${fRate(f2*2)} mL/h) + ${fAuto(f3)} mg em 60 min (${fRate(f3)} mL/h); total ${fAuto(tot)} mg.`);
  },
};

function viaPed(age){
  if (age == null) return null;
  let cuff, unc;
  if (age < 1){ cuff = 3.0; unc = 3.5; }
  else if (age < 2){ cuff = 3.5; unc = 4.0; }
  else { cuff = age/4 + 3.5; unc = age/4 + 4; }
  const r = x => Math.round(x*2)/2;
  cuff = Math.min(r(cuff), 7.5); unc = Math.min(r(unc), 8);
  const blade = age < 1 ? 'Miller 1 (prematuro: 0)' : age < 2 ? 'Miller 1–2' : age < 8 ? 'Miller ou Mac 2' : age < 12 ? 'Mac 2–3' : 'Mac 3';
  return { cuff, unc, depth: 3*cuff, blade };
}
const lma = kg => kg < 5 ? '1' : kg < 10 ? '1,5' : kg < 20 ? '2' : kg < 30 ? '2,5' : kg < 50 ? '3' : kg < 70 ? '4' : kg <= 100 ? '5' : '6';
function pesoEst(age){
  if (age == null) return null;
  const m = age*12;
  if (m < 12) return 0.5*Math.floor(m) + 4;
  const y = Math.floor(age);
  if (y <= 5) return 2*y + 8;
  if (y <= 12) return 3*y + 7;
  return null;
}
function pasMin(age){
  if (age == null) return null;
  if (age < 1/12) return 60;
  if (age < 1) return 70;
  if (age <= 10) return 70 + 2*Math.floor(age);
  return 90;
}
function idadeTxt(age){
  if (age == null) return '';
  if (age < 1) return `${fmt(Math.round(age*12),0)} meses`;
  return `${fmt(age, 1)} anos`;
}
const isPed = () => S.age != null && S.age < 14;

function rxText(D, tot, conc, rate){
  if (!Number.isFinite(conc) || !Number.isFinite(rate)) return 'Preencha peso, diluição e dose.';
  const ampTxt = D.ampLabel ? `${fmt(S.a,2)} mL (${fmt(S.a*S.ampQ,0)} ${D.amp.u})` : `${fmt(S.a,2)} amp (${fmt(S.ampQ,3)} ${D.amp.u}/${fmt(S.ampMl,2)} mL cada)`;
  const prep = (S.d > 0 && S.dil !== 'puro') ? `${ampTxt} + ${S.dil} ${fmt(S.d,1)} mL = ${fML(tot)} mL (${concLabel(D, conc)})` : `${ampTxt}, puro (${concLabel(D, conc)})`;
  const wk = byKg(D.un);
  const rg = (D.reg && S.reg >= 0) ? ' (' + D.reg[S.reg].n + ')' : '';
  return `${D.n}${rg}: ${prep}. Infundir em BIC a ${fRate(rate)} mL/h = ${fmt(S.dose, 3)} ${D.un}${wk ? ` (peso ${fmt(S.kg,1)} kg)` : ''}${D.alvo ? '; ' + D.alvo : ''}.`;
}

function kitText(){
  const kg = S.kg, age = S.age, ped = isPed();
  if (!okKg(kg)) return 'Informe o peso.';
  const pick = [IOT.pre[0], ...(ped ? IOT.ped : []), IOT.ind[0], IOT.ind[1], IOT.bnm[0], IOT.bnm[1]];
  return `Kit SRI — peso ${fmt(kg,1)} kg\n` + pick.map(it => {
    const b = bolus(it, kg, age, ped);
    return `• ${it.n}: ${rangeStr(b.lo, b.hi, fAuto)} ${b.unit}${b.ml ? ' = ' + rangeStr(b.ml[0], b.ml[1], fML) + ' mL' : ''} (${it.apres})`;
  }).join('\n');
}

/* ===== daqui para baixo: código do qprincipal =====
   O dilui desenhava HTML direto (rowFixo, rowBolus, rowCustom, updateCalc). Aqui as mesmas contas e os mesmos textos
   viram dados, e js/views/calculadoras.js desenha a tela. Cada texto abaixo reproduz o do dilui caractere a caractere
   (conferido por tests/calc_paridade.py contra os gabaritos em tests/calc_gabarito.json). */

// CALC.* chama rowCustom/noKg: devolvem dados no lugar do HTML do dilui (main/small/sub continuam os mesmos textos/HTML)
function rowCustom(name, via, s, main, small, sub, copy){ return { tipo:'calc', n:name, via, s, main, small, sub, copy }; }
const noKg = n => ({ tipo:'semPeso', n, perKg:'', via:'', apres:'', nota:'' });
const drug = () => INF.find(x => x.id === S.drug);

// uma linha de dose (bolus / dose fixa / cálculo especial) — mesma lógica de rowFixo + rowBolus do dilui
function linha(it, kg, age, ped){
  if (it.calc){ const r = CALC[it.calc](kg, age); r.calc = it.calc; return r; }
  if (it.fixo){
    const copy = `${it.n}${it.via ? ' ' + it.via : ''}: ${it.fixo}${it.nota ? '. ' + it.nota : ''}`;
    return { tipo:'fixo', n:it.n, via:it.via || '', fixo:it.fixo, nota:it.nota || '', copy };
  }
  const perKg = `${rangeStr(it.d[0], it.d[1] ?? it.d[0], fmt.bind(null)) } ${it.u}`;
  const notaPed = (ped && it.notaPed) ? ' ' + it.notaPed : '';
  if (!Number.isFinite(kg) || kg <= 0)
    return { tipo:'semPeso', n:it.n, via:it.via || '', perKg, apres:it.apres || '', nota:(it.nota || '') + notaPed };
  const b = bolus(it, kg, age, ped);
  const dUsed = b.d;
  const perKgTxt = `${rangeStr(dUsed[0], dUsed[1] ?? dUsed[0], v => fmt(v, 3))} ${it.u}`;
  const main = b.unit === 'mL' ? `${rangeStr(b.lo, b.hi, fML)} mL` : `${rangeStr(b.lo, b.hi, b.unit === 'UI' ? (v => fmt(v,0)) : fAuto)} ${b.unit}`;
  let small = '';
  if (b.ml) small = `${rangeStr(b.ml[0], b.ml[1], fML)} mL`;
  if (it.gotas && b.ml) small += ` · ${rangeStr(Math.round(b.ml[0]*it.gotas), Math.round(b.ml[1]*it.gotas), v => fmt(v,0))} gotas`;
  let extra = '';
  if (it.rate || it.ratePerKg){ const rm = it.ratePerKg ? Math.min(kg*it.ratePerKg, it.rate ?? Infinity) : it.rate; extra = ` · infundir em ≥ ${fmt(Math.ceil(b.hi / rm), 0)} min`; }
  const caps = [];
  if (b.capped) caps.push(`dose máxima ${fAuto(b.max)} ${b.unit}`);
  if (b.floored) caps.push(`dose mínima ${fAuto(it.min)} ${b.unit}`);
  const copy = `${it.n}${it.via ? ' ' + it.via : ''}: ${main}${small ? ' (' + small + ')' : ''} — ${perKgTxt}, peso ${fmt(kg,1)} kg${it.apres ? '; ' + it.apres : ''}`;
  return { tipo:'bolus', n:it.n, via:it.via || '', main, small, perKgTxt, sub:`${perKgTxt}${it.apres ? ' · ' + it.apres : ''}${extra}`,
           caps, nota:(it.nota || '') + notaPed, copy };
}

/* ---- bomba de infusão: o estado S e as contas de updateCalc do dilui ---- */
// troca de droga: 1ª diluição pronta e dose inicial (igual ao selectDrug do dilui)
function selectDrug(id, keepDose){
  const D = INF.find(x => x.id === id); if (!D) return false;
  S.drug = id; S.preset = 0;
  const p = D.pre[0];
  S.a = p.a; S.d = p.d; S.ampQ = (p.amp || D.amp).q; S.ampMl = (p.amp || D.amp).ml;
  S.dil = p.dil || dilOptions(D)[0] || 'puro';
  if (!keepDose) S.dose = D.ini;
  S.reg = D.reg ? D.reg.findIndex(r => r.dose === S.dose) : -1;
  return true;
}
function setPreset(i){
  const D = drug(), p = D.pre[i];
  S.preset = i; S.a = p.a; S.d = p.d; S.ampQ = (p.amp || D.amp).q; S.ampMl = (p.amp || D.amp).ml;
  if (p.dil) S.dil = p.dil;
}
// esquema (CAD/EHH, TEP/SCA): dose do esquema, limitada ao teto por hora quando há peso; devolve o texto do campo de dose
function setReg(i){
  const D = drug(), r = D.reg[i];
  S.reg = i; S.dose = r.dose;
  if (r.capH && okKg(S.kg)) S.dose = Math.min(r.dose, r.capH / perUnit(D.un, S.kg));
  return fIn(S.dose, S.dose < 0.1 ? 4 : 3);
}
// from = 'dose' (a dose manda, calcula a vazão) | 'rate' (a vazão digitada manda, calcula a dose)
function infusao(from, rateVal){
  const D = drug();
  const kg = S.kg, wk = byKg(D.un);
  const { tot, amt, conc } = concOf(D, S.a, S.d, S.ampQ, S.ampMl);
  const kgOk = !wk || okKg(kg);
  let rate = NaN, doseIn = null, rateIn = null;
  if (from === 'rate'){
    rate = num(rateVal);
    S.dose = (kgOk && conc > 0) ? doseOf(D, rate, conc, kg) : NaN;
    doseIn = Number.isFinite(S.dose) ? fIn(S.dose, S.dose < 0.1 ? 4 : 3) : '';
  } else {
    rate = (kgOk && conc > 0) ? rateOf(D, S.dose, conc, kg) : NaN;
    rateIn = Number.isFinite(rate) ? fIn(rate, rate >= 1 ? 1 : 2) : '';
  }
  // linha de apoio (o dilui juntava estes pedaços com "·")
  const m = { eq:null, semPeso:!wk, gotas:null, micro:null, dura:null };
  const meta = [];
  if (wk && kgOk && Number.isFinite(S.dose)){ m.eq = `${fAuto(S.dose * kg)} ${D.un.replace('/kg','')}`; meta.push(`= ${m.eq}`); }
  if (!wk) meta.push('não depende do peso');
  if (Number.isFinite(rate) && rate > 0){
    m.gotas = fmt(Math.round(rate/3),0); m.micro = fmt(Math.round(rate),0);
    meta.push(`sem bomba: ${m.gotas} gotas/min · ${m.micro} microgotas/min`);
    if (Number.isFinite(tot)){ m.dura = `${fAuto(tot/rate)} h`; meta.push(`a solução dura ${m.dura}`); }
  }
  // alertas (mesmos textos e mesma ordem de prioridade do dilui); nivel: '' | 'amber' | 'red'
  let msg = '', red = false, nivel = '';
  if (wk && !okKg(kg)) msg = 'Informe o peso no topo para calcular.';
  else if (!(conc > 0)) msg = 'Confira ampolas e diluente.';
  else if (Number.isFinite(S.dose)){
    if (D.max != null && S.dose > D.max + 1e-9){ msg = `Acima da dose máxima (${fmt(D.max,3)} ${D.un}).`; red = true; }
    else if (S.dose > D.faixa[1] + 1e-9) msg = `Acima da faixa usual (${fmt(D.faixa[0],3)}–${fmt(D.faixa[1],3)} ${D.un}).`;
    else if (S.dose < D.faixa[0] - 1e-9 && S.dose > 0) msg = `Abaixo da faixa usual (${fmt(D.faixa[0],3)}–${fmt(D.faixa[1],3)} ${D.un}).`;
    if (msg) nivel = red ? 'red' : 'amber';
    const rg = (D.reg && S.reg >= 0) ? D.reg[S.reg] : null;
    if (rg && rg.capH && okKg(kg)){
      const perH = S.dose * perUnit(D.un, kg);
      if (perH > rg.capH + 1e-6){ msg = `Acima do teto de ${fmt(rg.capH,0)} ${rg.capU} (${rg.n}).`; red = true; nivel = 'red'; }
      else if (S.dose < rg.dose - 1e-9 && Math.abs(perH - rg.capH) < 0.5){ msg = `Dose limitada ao teto de ${fmt(rg.capH,0)} ${rg.capU} (${rg.n}).`; if (!red) nivel = 'amber'; }
    }
    if (Number.isFinite(rate) && rate > 0 && rate < 1){ msg += (msg ? ' ' : '') + 'Vazão muito baixa: considere uma solução mais diluída.'; if (!nivel) nivel = 'amber'; }
    if (Number.isFinite(rate) && rate > 150){ msg += (msg ? ' ' : '') + 'Vazão alta: considere uma solução mais concentrada.'; if (!nivel) nivel = 'amber'; }
  }
  const tabela = D.passos.map(p => {
    const r = (kgOk && conc > 0) ? rateOf(D, p, conc, kg) : NaN;
    return { p, dose: fmt(p,3), rate: Number.isFinite(r) ? fRate(r) : '—', eq: wk ? (okKg(kg) ? fAuto(p*kg) : '—') : null,
             on: Number.isFinite(S.dose) && Math.abs(p - S.dose) < 1e-9, fora: p > D.faixa[1] + 1e-9 || p < D.faixa[0] - 1e-9 };
  });
  return { D, wk, kgOk, tot, conc, rate, doseIn, rateIn,
           totTxt: Number.isFinite(tot) ? fML(tot) + ' mL' : '—', concTxt: Number.isFinite(conc) ? concLabel(D, conc) : '—',
           m, metaTxt: meta.join('·'), msg, red, nivel, pronto: Number.isFinite(conc) && Number.isFinite(rate),
           rx: rxText(D, tot, conc, rate), tabela };
}

/* ---- via aérea do adulto (peso predito e volume corrente; mesma conta do renderIOT do dilui) ---- */
function ventilacao(){
  const h = S.altura; const pp = S.sexo === 'M' ? 50 + 0.91*(h - 152.4) : 45.5 + 0.91*(h - 152.4);
  return (Number.isFinite(pp) && pp > 20)
    ? { pp: `${fmt(pp,1)} kg`, vc: `6 mL/kg ${fmt(Math.round(pp*6),0)} · 7 mL/kg ${fmt(Math.round(pp*7),0)} · 8 mL/kg ${fmt(Math.round(pp*8),0)} mL` }
    : null;
}

return { INF, IOT, PED, EMG, RODAPE, S, CALC, num, fIn, fmt, fAuto, fML, fRate, byKg, perUnit, concOf, concLabel, dilOptions,
         bolus, rangeStr, okKg, viaPed, lma, pesoEst, pasMin, idadeTxt, isPed, rxText, kitText,
         drug, linha, selectDrug, setPreset, setReg, infusao, ventilacao };
})();
