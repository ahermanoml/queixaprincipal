/* peso.js — calculadora de peso (dose por kg e faixas de peso). Usada pela receita e pelas Prescrições. */
let peso = null;            // kg digitado na calculadora de peso (null = vazio)

/* ---- calculadora de peso ----
   item com dose por peso = [med, qty, posologia com "{DOSE}" e/ou "{FAIXA}", rota, spec]
   spec = {kg | kgdia+vezes | fixo, max, conc, un: "ML"|"GOTAS"|"MG"|"MCG"|"UI", gotas,
           sem_peso + faixas: [{de|acima|ate|menor, txt, dose?}], peso?: {de|acima|ate|menor}} — ver CLAUDE.md */
const num = (x, d) => String(+x.toFixed(d)).replace(".", ",");
// faixa de peso {de: ≥, acima: >, ate: ≤, menor: <}: vale se todos os limites dados batem; sem peso digitado, vale sempre
function fits(r){
  if(!r || !(peso>0)) return true;
  return (r.de==null || peso>=r.de) && (r.acima==null || peso>r.acima) && (r.ate==null || peso<=r.ate) && (r.menor==null || peso<r.menor);
}
// faixa da posologia que vale para o peso digitado (null sem peso ou se o peso cai fora de todas)
function pickFaixa(spec){ return peso>0 && spec && spec.faixas ? spec.faixas.find(f=> fits(f)) || null : null; }
// conta dentro do texto da faixa: "{=P*100/3}" (P = peso em kg; só números, P, + - * / ( ), min e max)
function calc(expr){
  if(!/^(?:[\d.\sP+\-*/(),]|min|max)+$/.test(expr)) return "?";
  const v = Function("P", "min", "max", `return (${expr});`)(peso, Math.min, Math.max);
  return isFinite(v) ? num(v, Math.abs(v)<10 ? 1 : 0) : "?";
}
// texto que entra no lugar de "{FAIXA}": só a faixa do peso digitado, com as contas feitas; sem peso (ou fora das faixas), a tabela inteira
function faixaTxt(spec){
  const f = pickFaixa(spec);
  return f ? f.txt.replace(/\{=([^}]+)\}/g, (_, e)=> calc(e)) : spec.sem_peso;
}
function doseTxt(spec){
  const f = pickFaixa(spec), s = f && f.dose ? {...spec, ...f.dose} : spec;   // a faixa pode trocar a dose (ex.: mg/kg diferente)
  if(!(peso>0)) return "__ " + s.un;
  let v;
  if(s.fixo!=null) v = s.fixo;
  else if(s.kg!=null) v = s.kg*peso;
  else if(s.kgdia!=null) v = s.kgdia*peso/s.vezes;
  else return "__ " + s.un;   // peso fora das faixas que definem a dose
  const capped = s.max!=null && v > s.max;
  if(capped) v = s.max;
  let out;
  if(s.un==="GOTAS"){ const g = Math.max(1, Math.round(v/s.conc*s.gotas)); out = g + (g===1 ? " GOTA" : " GOTAS"); }
  else if(s.conc){ const ml = v/s.conc; out = num(ml, ml<1 ? 2 : 1) + " " + s.un; }
  else if(s.un==="MG" && v>=1000) out = num(v/1000, 2) + " G";   // 2000 MG → 2 G
  else out = num(v, v<10 ? 1 : 0) + " " + s.un;
  return out + (capped ? " (DOSE MÁXIMA)" : "");
}
// posologia em texto puro (receita): resolve "{DOSE}" e "{FAIXA}" com o peso atual
function fillDose(pos, spec){
  if(!spec) return pos;
  if(pos.includes("{DOSE}")) pos = pos.split("{DOSE}").join(doseTxt(spec));
  if(pos.includes("{FAIXA}")) pos = pos.split("{FAIXA}").join(faixaTxt(spec));
  return pos;
}
