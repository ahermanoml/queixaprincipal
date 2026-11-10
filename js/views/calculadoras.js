/* views/calculadoras.js — aba Calculadoras: lista filtrável (#col-calc-lista) + calculadora aberta (#col-calc).
   Conteúdo: data/calculadoras.js (tabelas do dilui). Contas e textos: js/calc-motor.js (objeto CM). Aqui só a tela.
   Peso: o MESMO peso global das Prescrições (`peso`, js/peso.js) — começa vazio; nada é calculado com peso suposto. */
const cxLista = $("#cx-lista"), cxBody = $("#cx-body"), cxTitulo = $("#cx-titulo");
const cxS = CM.S;

/* ---- organização da lista: o que o médico procura, não a ferramenta ---- */
const CX_GRUPOS = [
  {key:"bomba", nm:"Bomba de infusão", ic:"💉"},
  {key:"iot",   nm:"Intubação",        ic:"🫁"},
  {key:"emg",   nm:"Emergência adulto", ic:"🚑"},
  {key:"ped",   nm:"Pediatria",        ic:"👶"}
];
// endereço de cada situação: #/calculadoras/emg-parada, #/calculadoras/ped-convulsao…
const CX_SLUG = {"Parada cardíaca":"parada", "Bradicardia e taquicardia":"arritmias", "Anafilaxia":"anafilaxia",
  "Convulsão (estado de mal)":"convulsao", "Trombólise":"trombolise", "Anticoagulação":"anticoagulacao", "Hemorragia":"hemorragia",
  "Hipercalemia e hipoglicemia":"hipercalemia", "Antídotos":"antidotos", "Obstetrícia":"obstetricia", "Analgesia, sedação e outros":"analgesia",
  "Parada e arritmias":"parada", "Volume e glicose":"volume", "Convulsão":"convulsao", "Respiratório e anafilaxia":"respiratorio",
  "Analgesia, sedação e sintomáticos":"analgesia"};
const cxSlug = s => CX_SLUG[s] || norm(s).replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
// palavras extras da busca (sinônimos de situação; nunca doses)
const CX_KW = {"emg-parada":"pcr parada cardiorrespiratoria rcp fv tv sem pulso assistolia", "emg-arritmias":"tsv fibrilacao atrial flutter bradiarritmia",
  "emg-convulsao":"crise convulsiva epileptico", "emg-trombolise":"avc iam trombolitico fibrinolise", "emg-anticoagulacao":"tep tvp sca",
  "emg-hemorragia":"sangramento hda varizes", "emg-hipercalemia":"potassio hipoglicemia", "emg-antidotos":"intoxicacao opioide benzodiazepinico",
  "emg-obstetricia":"pre-eclampsia eclampsia gestante", "ped-parada":"pcr crianca pals arritmia", "ped-volume":"hidratacao soro crianca",
  "ped-convulsao":"crise convulsiva crianca", "ped-respiratorio":"asma crupe bronquiolite crianca", "ped-analgesia":"crianca sedacao sintomaticos",
  "iot":"iot intubacao orotraqueal via aerea tubo sri"};
// "Copiar tudo" só onde a página é um protocolo em sequência (como o kit SRI); onde as linhas são alternativas, não
const CX_TUDO = new Set(["emg-parada", "emg-convulsao", "emg-hipercalemia", "ped-parada", "ped-convulsao"]);
// ligações entre calculadoras (as "abas" que as notas do dilui citam)
const CX_LINK_PAG = {
  adre:[["emg-anafilaxia","Adrenalina IM na anafilaxia"]], amio:[["emg-parada","Parada cardíaca"],["emg-arritmias","Arritmias"]],
  hnf:[["emg-anticoagulacao","Bolus de heparina"]], mgso4:[["emg-obstetricia","Ataque de MgSO₄"]], octreo:[["emg-hemorragia","Terlipressina"]],
  fenta:[["iot","Intubação"]], mida:[["iot","Intubação"]], propo:[["iot","Intubação"]], keta:[["iot","Intubação"]],
  "emg-anafilaxia":[["adre","Infusão de adrenalina"]], "emg-obstetricia":[["mgso4","Manutenção do MgSO₄ (1 g/h)"]],
  "emg-anticoagulacao":[["hnf","Infusão de heparina"]], "emg-hemorragia":[["octreo","Octreotida (infusão)"]],
  "emg-parada":[["amio","Amiodarona em infusão"]], "emg-arritmias":[["amio","Amiodarona em infusão"]]
};
const CX_POS_IOT = [["fenta","Fentanil"],["mida","Midazolam"],["propo","Propofol"],["keta","Cetamina"],["dex","Dexmedetomidina"],["nora","Noradrenalina"]];
const CX_PESOS = [50, 60, 70, 80, 100];   // pesos estimados de um clique (adulto)

// páginas: 19 infusões, a intubação e uma por situação
const CX_PAGS = [
  ...CM.INF.map(D=> ({id: D.id, grupo: "bomba", sub: D.g, nm: D.n, tipo: "inf", D})),
  {id: "iot", grupo: "iot", nm: "Sequência rápida (SRI)", tipo: "iot"},
  ...CM.EMG.map(sec=> ({id: "emg-" + cxSlug(sec.sec), grupo: "emg", nm: sec.sec, tipo: "sit", sec, ped: false})),
  ...CM.PED.map(sec=> ({id: "ped-" + cxSlug(sec.sec), grupo: "ped", nm: sec.sec, tipo: "sit", sec, ped: true}))
];
const cxPag = id => CX_PAGS.find(p=> p.id===id) || null;
const cxGrupo = k => CX_GRUPOS.find(g=> g.key===k);
// linhas da intubação, na ordem da tela (chave estável: grupo + índice)
const CX_IOT_GR = [["pre","Pré-tratamento"],["ped","Pediatria"],["ind","Indução"],["bnm","Bloqueio neuromuscular"],["rev","Reversão"]];
// nome de uma linha (CALC.* só tem nome quando calculado: lido com peso vazio = nome do "informe o peso" do dilui, ou com 1 kg)
const cxNomeLinha = it => it.calc ? CM.CALC[it.calc](1, null).n : it.n;
const cxDoPeso = it => !!(it.calc || it.d);   // a linha depende do peso?
function cxPrecisaPeso(p){
  if(p.tipo==="inf") return CM.byKg(p.D.un);
  if(p.tipo==="iot") return true;
  return p.sec.itens.some(cxDoPeso);
}
const cxUsaIdade = p => p.tipo==="iot" || p.grupo==="ped" || p.id==="emg-trombolise";

/* ---- estado da tela ---- */
let cxAberta = null;        // página aberta
let cxPesoEst = null;       // como o peso atual foi escolhido aqui: null (digitado) | "chip" | "idade"
let cxIdade = {txt: "", un: "a"};   // campo de idade (o valor em anos fica em cxS.age)
let cxHlT;

/* ---- lista ---- */
function cxRenderLista(filtro=""){
  const f = norm(filtro.trim());
  let h = "", n = 0;
  CX_GRUPOS.forEach(g=>{
    const pags = CX_PAGS.filter(p=> p.grupo===g.key && (!f || norm(cxBuscaTexto(p)).includes(f)));
    if(!pags.length) return;
    h += `<div class="cx-gh"><span aria-hidden="true">${g.ic}</span> ${esc(g.nm)}</div>`;
    let sub = null;
    pags.forEach(p=>{
      if(p.grupo==="bomba" && p.sub!==sub){ sub = p.sub; h += `<div class="cx-gsh">${esc(sub)}</div>`; }
      n++;
      h += `<button type="button" class="cx-item${cxAberta===p ? " active" : ""}" data-id="${esc(p.id)}" aria-pressed="${cxAberta===p}">
        <span class="nm">${esc(p.nm)}</span><span class="sub">${esc(cxSubLista(p))}</span></button>`;
    });
  });
  cxLista.innerHTML = h || `<div class="rx-empty">Nada encontrado.</div>`;
  $("#cx-count").textContent = f ? n : CX_PAGS.length;
  cxLista.querySelectorAll(".cx-item").forEach(b=> b.onclick = ()=>{
    cxAbrir(b.dataset.id, "click");
    routeChanged();
  });
}
function cxSubLista(p){
  if(p.tipo==="inf") return p.D.un;
  if(p.tipo==="iot") return "indução · bloqueio · kit para copiar";
  const nomes = [...new Set(p.sec.itens.map(it=> cxNomeLinha(it).replace(/\s*[(—].*$/, "")))];
  return nomes.slice(0, 4).join(" · ") + (nomes.length > 4 ? " …" : "");
}
function cxLinhasPag(p){
  if(p.tipo==="sit") return p.sec.itens.map((it, i)=> ({key: p.id + "." + i, it}));
  if(p.tipo==="iot"){
    const out = [];
    CX_IOT_GR.forEach(([g, t])=> { if(g!=="ped") CM.IOT[g].forEach((it, i)=> out.push({key: "iot." + g + i, it, gl: t})); });
    CM.IOT.push.forEach((it, i)=> out.push({key: "iot.push" + i, it, gl: "Hipotensão peri-intubação"}));
    return out;
  }
  return [];
}
function cxBuscaTexto(p){
  if(p.tipo==="inf") return [p.nm, p.sub, p.D.apres, p.D.id].join(" ");
  return [p.nm, cxGrupo(p.grupo).nm, CX_KW[p.id] || "", ...cxLinhasPag(p).map(l=> cxNomeLinha(l.it))].join(" ");
}

/* ---- peso, idade (barra do paciente no topo de cada calculadora) ---- */
const cxPesoOk = () => peso>0;
function cxSyncKg(){ cxS.kg = peso>0 ? peso : NaN; }
// o peso mudou aqui: atualiza o global, o campo das Prescrições e a receita (mesma função que o campo de lá usa)
function cxSetPeso(v, est){
  peso = v>0 && v<=250 ? v : null;
  cxPesoEst = peso ? est : null;
  const pin = midBody.querySelector("#peso"); if(pin) pin.value = peso>0 ? num(peso,1) : "";
  refreshDoses();
  cxPesoMudou(true);
}
function cxPesoMudou(fromHere){
  cxSyncKg();
  if(!cxAberta) return;
  const inp = $("#cx-peso");
  if(inp && !fromHere) inp.value = peso>0 ? num(peso,1) : "";
  if(inp && fromHere && document.activeElement!==inp) inp.value = peso>0 ? num(peso,1) : "";
  cxPacEstado();
  cxRenderConteudo();
}
function cxPacHTML(p){
  const precisa = cxPrecisaPeso(p), idade = cxUsaIdade(p), ped = p.grupo==="ped";
  if(!precisa && !idade) return "";
  let h = `<div class="cx-pac${ped ? " ped" : ""}">`;
  if(precisa){
    h += `<div class="cx-pac-l"><label for="cx-peso"><span aria-hidden="true">⚖️</span> Peso ${ped ? "da criança" : "do paciente"}</label>
      <span class="cx-peso-in"><input id="cx-peso" type="text" inputmode="decimal" autocomplete="off" placeholder="—" value="${peso>0 ? num(peso,1) : ""}" aria-describedby="cx-peso-st"><span class="un">kg</span></span>
      <span class="cx-est" id="cx-peso-st" role="status"></span></div>`;
    if(!ped) h += `<div class="cx-pesos" role="group" aria-label="Peso estimado em um clique"><span class="lbl">sem balança?</span>${CX_PESOS.map(k=>
      `<button type="button" class="cx-pchip" data-kg="${k}" aria-pressed="false">${k} kg</button>`).join("")}</div>`;
  }
  if(idade){
    h += `<div class="cx-pac-l cx-idade"><label for="cx-idade">Idade</label>
      <input id="cx-idade" type="text" inputmode="decimal" autocomplete="off" placeholder="${ped ? "—" : "adulto"}" value="${esc(cxIdade.txt)}">
      <select id="cx-idade-un" aria-label="Unidade da idade"><option value="a"${cxIdade.un==="a" ? " selected" : ""}>anos</option><option value="m"${cxIdade.un==="m" ? " selected" : ""}>meses</option></select>
      <span class="cx-idade-dica">${p.id==="emg-trombolise" ? "≥ 75 anos muda a tenecteplase" : p.tipo==="iot" ? "< 14 anos = doses pediátricas" : ""}</span></div>`;
    if(ped || p.tipo==="iot") h += `<div class="cx-estimar" id="cx-estimar"></div>`;
  }
  return h + `</div>`;
}
// partes da barra que mudam com o peso/idade sem redesenhar (o foco fica no campo)
function cxPacEstado(){
  const st = $("#cx-peso-st");
  if(st){
    st.className = "cx-est" + (peso>0 && cxPesoEst ? " on" : "") + (peso>0 ? "" : " falta");
    st.textContent = !(peso>0) ? "digite o peso" : cxPesoEst==="idade" ? "peso estimado pela idade" : cxPesoEst ? "peso estimado" : "";
  }
  cxBody.querySelectorAll(".cx-pchip").forEach(b=> b.setAttribute("aria-pressed", String(cxPesoEst==="chip" && peso===+b.dataset.kg)));
  const est = $("#cx-estimar");
  if(est){
    const pe = CM.pesoEst(cxS.age), age = cxS.age;
    if(pe==null){ est.hidden = true; est.innerHTML = ""; }
    else {
      const m = age*12, f = m < 12 ? "0,5 × meses + 4" : Math.floor(age) <= 5 ? "2 × anos + 8" : "3 × anos + 7";
      const usando = cxPesoEst==="idade" && Math.abs(peso - pe) < 1e-9;
      est.hidden = false;
      est.innerHTML = `<span>Peso estimado para ${esc(CM.idadeTxt(age))}: <b>${CM.fmt(pe,1)} kg</b> <small>(APLS: ${f})</small></span>
        ${usando ? `<span class="cx-usando">em uso</span>` : `<button type="button" class="btn" id="cx-usar-est">Usar ${CM.fmt(pe,1)} kg</button>`}`;
      const u = $("#cx-usar-est"); if(u) u.onclick = ()=>{ cxSetPeso(pe, "idade"); const i = $("#cx-peso"); if(i) i.value = num(pe,1); };
    }
  }
}
function cxBindPac(){
  const pin = $("#cx-peso");
  if(pin){
    pin.oninput = ()=>{ const v = parseFloat(pin.value.replace(",", ".")); cxSetPeso(v, null); };
    pin.onkeydown = e=>{ if(e.key==="Enter"){ e.preventDefault(); cxFocoProximo(); } };
  }
  cxBody.querySelectorAll(".cx-pchip").forEach(b=> b.onclick = ()=>{ cxSetPeso(+b.dataset.kg, "chip"); const i = $("#cx-peso"); if(i) i.value = b.dataset.kg; });
  const ii = $("#cx-idade"), iu = $("#cx-idade-un");
  if(ii){
    const lerIdade = ()=>{
      cxIdade = {txt: ii.value, un: iu.value};
      const a = CM.num(ii.value);
      cxS.age = Number.isFinite(a) && a >= 0 ? (iu.value==="m" ? a/12 : a) : null;   // mesma leitura do dilui (readPt)
      cxPacEstado(); cxRenderConteudo();
    };
    ii.oninput = lerIdade; iu.onchange = lerIdade;
  }
  cxPacEstado();
}

/* ---- página aberta ---- */
function cxRascunhoTag(){ return `<span class="cx-tag" title="Conteúdo gerado por IA, ainda não revisado pelo médico: confira as doses">rascunho</span>`; }
function cxCabecalho(p){
  const g = cxGrupo(p.grupo);
  const eyebrow = p.tipo==="inf" ? p.sub : g.nm;   // o grupo já está no título da coluna; na bomba, o subgrupo
  const apres = p.tipo==="inf" ? `<div class="cx-apres">${esc(p.D.apres)}</div>` : "";
  return `<div class="cx-head"><div class="cx-eyebrow"><span aria-hidden="true">${g.ic}</span> ${esc(eyebrow)}</div>
    <h3 id="cx-h" tabindex="-1">${esc(p.tipo==="iot" ? "Intubação — sequência rápida" : p.nm)} ${cxRascunhoTag()}</h3>${apres}</div>`;
}
function cxRodape(){
  return `<div class="cx-rodape">${CM.RODAPE.map(t=> `<p>${t}</p>`).join("")}</div>`;
}
function cxLinks(lista, titulo="Ver também"){
  if(!lista || !lista.length) return "";
  return `<div class="cx-links">${titulo ? `<span class="lbl">${esc(titulo)}</span>` : ""}${lista.map(([id, t])=>
    `<a class="cx-link" href="#/calculadoras/${esc(id)}" data-go="${esc(id)}">${esc(t)} <span aria-hidden="true">→</span></a>`).join("")}</div>`;
}
function cxAbrir(id, how){
  // id = página ("nora", "emg-parada") ou linha dentro dela ("emg-arritmias.1", "iot.ind0"): abre a página e destaca a linha
  const sid = String(id), dot = sid.indexOf(".");
  const pid = dot > -1 ? sid.slice(0, dot) : sid, row = dot > -1 ? sid : null;
  const p = cxPag(pid);
  if(!p) return false;
  if(row && !cxLinhasPag(p).some(l=> l.key===row)) return false;
  cxAberta = p;
  cxSyncKg();
  if(p.tipo==="inf") CM.selectDrug(p.id);
  cxLista.querySelectorAll(".cx-item").forEach(b=>{ const on = b.dataset.id===p.id; b.classList.toggle("active", on); b.setAttribute("aria-pressed", String(on)); });
  cxTitulo.textContent = cxGrupo(p.grupo).nm;
  cxBody.innerHTML = cxCabecalho(p) + cxPacHTML(p) + `<div id="cx-conteudo"></div>` + cxRodape();
  cxBindPac();
  cxRenderConteudo();
  cxBody.scrollTop = 0;
  if(how==="click" || how==="search" || how==="load") cxMostrar(how);
  if(row) cxDestacar(row);
  else if(how!=="route") cxFocoInicial();
  return true;
}
function cxFechar(){
  cxAberta = null;
  cxLista.querySelectorAll(".cx-item.active").forEach(b=>{ b.classList.remove("active"); b.setAttribute("aria-pressed", "false"); });
  cxTitulo.textContent = "Calculadora";
  cxBody.innerHTML = CX_VAZIO;
  cxBindVazio();
}
// mostra a calculadora: no celular rola a página até ela; no computador rola só a lista até o item
function cxMostrar(how){
  if(pageScrolls()){ scrollIntoPlace($("#col-calc")); return; }
  const b = cxLista.querySelector(".cx-item.active");
  if(b && how!=="click"){
    const top = b.offsetTop - cxLista.offsetTop, bot = top + b.offsetHeight;
    if(top < cxLista.scrollTop || bot > cxLista.scrollTop + cxLista.clientHeight) cxLista.scrollTop = top - cxLista.clientHeight/3;
  }
}
// foco onde o médico digita em seguida: o peso (se falta e a página depende dele) ou a dose (bomba); senão, o título
function cxFocoInicial(){
  if(pageScrolls()) return;   // no celular, focar um campo abre o teclado por cima da tela
  const p = cxAberta;
  let el = null;
  if(cxPrecisaPeso(p) && !(peso>0)) el = $("#cx-peso");
  else if(p.tipo==="inf") el = $("#cx-dose");
  (el || $("#cx-h")).focus({preventScroll: true});
  if(el && el.select) el.select();
}
function cxFocoProximo(){
  const el = $("#cx-dose") || $("#cx-idade") || $("#cx-h");
  if(el){ el.focus(); if(el.select) el.select(); }
}
function cxDestacar(key){
  const el = cxBody.querySelector(`[data-row="${CSS.escape(key)}"]`);
  if(!el) return;
  cxBody.querySelectorAll(".cx-row.hl").forEach(x=> x.classList.remove("hl"));
  void el.offsetWidth;
  el.classList.add("hl");
  scrollIntoPlace(el, 16);
  const b = el.querySelector(".cx-cp:not(:disabled)") || el;
  if(!pageScrolls()) b.focus({preventScroll: true});
  clearTimeout(cxHlT);
  cxHlT = setTimeout(()=> el.classList.remove("hl"), 2400);
}
function cxRenderConteudo(){
  const c = $("#cx-conteudo");
  if(!c || !cxAberta) return;
  const p = cxAberta;
  if(p.tipo==="inf") cxRenderInf(c, p);
  else if(p.tipo==="iot") cxRenderIot(c, p);
  else cxRenderSit(c, p);
  c.querySelectorAll("[data-go]").forEach(a=> a.onclick = e=>{ e.preventDefault(); navigate("calculadoras", a.dataset.go, "click"); });
}

/* ---- bomba de infusão: ① preparo → ② dose ⇄ vazão → ③ texto pronto ---- */
function cxRenderInf(c, p){
  const D = p.D, S = cxS, dils = CM.dilOptions(D), wk = CM.byKg(D.un);
  const edit = c.dataset.prepAberto==="1";
  c.innerHTML = `
  <section class="cx-step" aria-labelledby="cx-s1"><h4 id="cx-s1"><span class="n" aria-hidden="true">1</span> Preparo</h4>
    <div class="cx-presets" role="group" aria-label="Diluição pronta">${D.pre.map((x, i)=>
      `<button type="button" class="cx-chip" data-pre="${i}" aria-pressed="${i===S.preset}">${esc(x.n)}</button>`).join("")}</div>
    <div class="cx-prep"><div class="cx-frase" id="cx-frase"></div>
      <div class="cx-conc"><span>concentração</span><b id="cx-conc"></b></div></div>
    <button type="button" class="cx-edita" id="cx-edita" aria-expanded="${edit}" aria-controls="cx-prep-ed"><span aria-hidden="true">✎</span> Mudar ampolas, diluente ou a ampola do hospital</button>
    <div class="cx-prep-ed" id="cx-prep-ed"${edit ? "" : " hidden"}>
      <label class="cx-fld"><span>${esc(D.ampLabel || "Ampolas")}</span><input id="cx-a" inputmode="decimal" autocomplete="off" value="${CM.fIn(S.a,2)}"></label>
      <span class="op" aria-hidden="true">+</span>
      <label class="cx-fld"><span>Diluente (mL)</span><input id="cx-d" inputmode="decimal" autocomplete="off" value="${CM.fIn(S.d,1)}"></label>
      ${dils.length ? `<label class="cx-fld"><span>Diluir em</span><select id="cx-dil">${dils.map(o=> `<option${o===S.dil ? " selected" : ""}>${esc(o)}</option>`).join("")}</select></label>` : ""}
      <div class="cx-amp"><span class="t">A ampola do seu hospital é diferente?</span>
        <span>Cada unidade tem <input id="cx-q" inputmode="decimal" autocomplete="off" value="${CM.fIn(S.ampQ,3)}" aria-label="Quantidade por ampola (${esc(D.amp.u)})"> ${esc(D.amp.u)}
        em <input id="cx-ml" inputmode="decimal" autocomplete="off" value="${CM.fIn(S.ampMl,2)}" aria-label="Volume por ampola (mL)"> mL</span></div>
    </div>
  </section>
  <section class="cx-step" aria-labelledby="cx-s2"><h4 id="cx-s2"><span class="n" aria-hidden="true">2</span> Dose <span aria-hidden="true">⇄</span><span class="sr-only">e</span> vazão</h4>
    ${D.reg ? `<div class="cx-presets" role="group" aria-label="Esquema"><span class="lbl">Esquema</span>${D.reg.map((r, i)=>
      `<button type="button" class="cx-chip" data-reg="${i}" aria-pressed="${i===S.reg}">${esc(r.n)} · ${CM.fmt(r.dose,3)}${r.capH ? " (máx " + CM.fmt(r.capH,0) + " " + esc(r.capU) + ")" : ""}</button>`).join("")}</div>` : ""}
    <div class="cx-dv">
      <div class="cx-campo"><label for="cx-dose">Quero esta dose</label>
        <div class="iv"><button type="button" class="cx-step-b" id="cx-menos" aria-label="Diminuir para a dose anterior da tabela">−</button>
          <input id="cx-dose" inputmode="decimal" autocomplete="off" value="${CM.fIn(S.dose, S.dose < 0.1 ? 4 : 3)}" aria-describedby="cx-dose-un cx-dose-dica">
          <button type="button" class="cx-step-b" id="cx-mais" aria-label="Aumentar para a próxima dose da tabela">+</button></div>
        <span class="un"><b id="cx-dose-un">${esc(D.un)}</b> <small id="cx-dose-dica">→ calcula a vazão · Enter copia</small></span></div>
      <div class="cx-seta" aria-hidden="true">⇄</div>
      <div class="cx-campo"><label for="cx-vazao">Está correndo a</label>
        <div class="iv"><input id="cx-vazao" inputmode="decimal" autocomplete="off" aria-describedby="cx-vazao-un cx-vazao-dica"></div>
        <span class="un"><b id="cx-vazao-un">mL/h</b> <small id="cx-vazao-dica">→ calcula a dose</small></span></div>
    </div>
    <div class="cx-falta" id="cx-falta" hidden><span>Falta o peso para calcular a vazão.</span><button type="button" class="btn" id="cx-ir-peso">Digitar o peso</button></div>
    <div class="cx-meta" id="cx-meta"></div>
    <div class="cx-escala" id="cx-escala"></div>
    <div class="cx-aviso" id="cx-aviso" role="status" hidden></div>
  </section>
  <section class="cx-step cx-pronto" aria-labelledby="cx-s3"><h4 id="cx-s3"><span class="n" aria-hidden="true">3</span> Texto pronto</h4>
    <div class="cx-aviso3" id="cx-aviso3" aria-hidden="true" hidden></div>
    <p class="cx-rx" id="cx-rx"></p>
    <div class="cx-acts"><button type="button" class="btn primary" id="cx-copiar"><span aria-hidden="true">📋</span> Copiar</button>
      <button type="button" class="btn" id="cx-receita">＋ Receita</button></div>
  </section>
  <details class="cx-step cx-tt" open><summary>Tabela de titulação <small>clique numa linha para usar a dose</small></summary>
    <table><thead><tr><th scope="col">Dose (${esc(D.un)})</th><th scope="col">mL/h</th>${wk ? `<th scope="col">${esc(D.un.replace("/kg", ""))}</th>` : ""}</tr></thead><tbody id="cx-tt"></tbody></table></details>
  <section class="cx-obs" aria-label="Observações"><ul>${D.obs.map(o=> `<li>${esc(o)}</li>`).join("")}</ul>${cxLinks(CX_LINK_PAG[p.id])}</section>`;
  cxBindInf(c, p);
  cxAtualizaInf("dose");
}
function cxBindInf(c, p){
  const D = p.D, S = cxS, on = (id, fn)=>{ const el = $("#" + id); if(el) el.addEventListener("input", fn); };
  const markPre = ()=> c.querySelectorAll("[data-pre]").forEach(b=> b.setAttribute("aria-pressed", String(+b.dataset.pre===S.preset)));
  on("cx-a", e=>{ S.a = CM.num(e.target.value); S.preset = -1; markPre(); cxAtualizaInf("dose"); });
  on("cx-d", e=>{ S.d = CM.num(e.target.value); S.preset = -1; markPre(); cxAtualizaInf("dose"); });
  on("cx-q", e=>{ S.ampQ = CM.num(e.target.value); cxAtualizaInf("dose"); });
  on("cx-ml", e=>{ S.ampMl = CM.num(e.target.value); cxAtualizaInf("dose"); });
  on("cx-dose", e=>{ S.dose = CM.num(e.target.value); cxAtualizaInf("dose"); });
  on("cx-vazao", ()=> cxAtualizaInf("rate"));
  const dl = $("#cx-dil"); if(dl) dl.onchange = e=>{ S.dil = e.target.value; cxAtualizaInf("dose"); };
  c.querySelectorAll("[data-pre]").forEach(b=> b.onclick = ()=>{
    CM.setPreset(+b.dataset.pre);
    const sel = $("#cx-dil"); if(sel && D.pre[+b.dataset.pre].dil) sel.value = S.dil;
    $("#cx-a").value = CM.fIn(S.a,2); $("#cx-d").value = CM.fIn(S.d,1); $("#cx-q").value = CM.fIn(S.ampQ,3); $("#cx-ml").value = CM.fIn(S.ampMl,2);
    markPre(); cxAtualizaInf("dose");
  });
  c.querySelectorAll("[data-reg]").forEach(b=> b.onclick = ()=>{
    $("#cx-dose").value = CM.setReg(+b.dataset.reg);
    c.querySelectorAll("[data-reg]").forEach(x=> x.setAttribute("aria-pressed", String(x===b)));
    cxAtualizaInf("dose");
  });
  $("#cx-edita").onclick = e=>{
    const ed = $("#cx-prep-ed"), abre = ed.hidden;
    ed.hidden = !abre; c.dataset.prepAberto = abre ? "1" : "";
    e.currentTarget.setAttribute("aria-expanded", String(abre));
    if(abre) $("#cx-a").focus();
  };
  // − / + andam pela tabela de titulação do dilui (nenhum passo inventado)
  const passo = dir=>{
    const ps = D.passos, cur = S.dose;
    const alvo = dir > 0 ? ps.find(x=> !(x <= cur + 1e-9)) : [...ps].reverse().find(x=> !(x >= cur - 1e-9));
    if(alvo==null) return;
    S.dose = alvo; $("#cx-dose").value = CM.fIn(S.dose,3); cxAtualizaInf("dose");
  };
  $("#cx-menos").onclick = ()=> passo(-1);
  $("#cx-mais").onclick = ()=> passo(1);
  const enterCopia = e=>{ if(e.key==="Enter"){ e.preventDefault(); cxCopiarInf(); } };
  $("#cx-dose").onkeydown = enterCopia;
  $("#cx-vazao").onkeydown = enterCopia;
  $("#cx-copiar").onclick = cxCopiarInf;
  $("#cx-receita").onclick = ()=>{ const r = CM.infusao("dose"); if(r.pronto) sendToRx(r.rx); };
  $("#cx-ir-peso").onclick = ()=>{ const i = $("#cx-peso"); if(i){ i.focus(); scrollIntoPlace(i.closest(".cx-pac"), 16); } };
}
async function cxCopiarInf(){
  const r = CM.infusao("dose");
  if(!r.pronto){ toast(r.wk && !r.kgOk ? "Digite o peso para gerar o texto" : "Confira a diluição e a dose", false); return; }
  const ok = await copyText(r.rx);
  toast(ok ? "Prescrição copiada!" : "Não foi possível copiar", ok);
}
function cxAtualizaInf(from){
  const S = cxS, D = cxAberta.D;
  const vz = $("#cx-vazao"), ds = $("#cx-dose");
  const r = CM.infusao(from, from==="rate" ? vz.value : null);
  if(r.doseIn!=null) ds.value = r.doseIn;
  if(r.rateIn!=null && document.activeElement!==vz) vz.value = r.rateIn;
  // ① frase do preparo
  const f = (v, d)=> Number.isFinite(v) ? CM.fmt(v, d) : "—";
  const amp = D.ampLabel ? `${f(S.a,2)} ${D.ampLabel} (${f(S.a*S.ampQ,0)} ${D.amp.u})` : `${f(S.a,2)} ${S.a===1 ? "ampola" : "ampolas"}`;
  const ampD = (D.pre[S.preset] && D.pre[S.preset].amp) || D.amp;
  const difere = S.ampQ!==ampD.q || S.ampMl!==ampD.ml;
  const cada = D.ampLabel ? "" : ` <span class="cada${difere ? " dif" : ""}">(${f(S.ampQ,3)} ${esc(D.amp.u)} em ${f(S.ampMl,2)} mL cada${difere ? " — ampola do hospital" : ""})</span>`;
  const dil = (S.d > 0 && S.dil!=="puro") ? ` + <b>${f(S.d,1)} mL</b> de ${esc(S.dil)}` : ", puro";
  $("#cx-frase").innerHTML = `<b>${esc(amp)}</b>${cada}${dil} = <b>${esc(r.totTxt)}</b>`;
  $("#cx-conc").textContent = r.concTxt;
  // ② sem peso: a dose por kg continua editável, mas nada vira mL/h
  const semPeso = r.wk && !r.kgOk;
  vz.disabled = semPeso; vz.placeholder = semPeso ? "peso?" : "";
  if(semPeso) vz.value = "";
  $("#cx-falta").hidden = !semPeso;
  const m = r.m, meta = [];
  if(m.eq) meta.push(`<span>= <b>${esc(m.eq)}</b></span>`);
  if(m.semPeso) meta.push(`<span>não depende do peso</span>`);
  if(m.gotas!=null) meta.push(`<span>sem bomba: <b>${esc(m.gotas)}</b> gotas/min · <b>${esc(m.micro)}</b> microgotas/min</span>`);
  if(m.dura) meta.push(`<span>a solução dura <b>${esc(m.dura)}</b></span>`);
  $("#cx-meta").innerHTML = meta.join("");
  cxEscala(D, S.dose, r.nivel);
  const av = $("#cx-aviso");
  const msg = semPeso ? "" : r.msg;
  av.hidden = !msg; av.textContent = msg; av.className = "cx-aviso" + (r.red ? " red" : "");
  // o mesmo alerta, curto, junto do texto pronto (que fica grudado no pé da coluna e pode cobrir o alerta de cima)
  const a3 = $("#cx-aviso3"); a3.hidden = !msg; a3.textContent = msg ? "⚠ " + msg : ""; a3.className = "cx-aviso3" + (r.red ? " red" : "");
  // ③ texto pronto
  const rx = $("#cx-rx");
  rx.classList.toggle("vazio", !r.pronto);
  rx.textContent = r.pronto ? r.rx : semPeso ? "O texto aparece quando o peso for digitado." : "Confira a diluição e a dose.";
  $("#cx-copiar").disabled = !r.pronto; $("#cx-receita").disabled = !r.pronto;
  // tabela
  $("#cx-tt").innerHTML = r.tabela.map(t=>
    `<tr data-dose="${t.p}" class="${t.on ? "on" : ""}${t.fora ? " fora" : ""}"><td><button type="button" class="cx-tt-b" aria-label="Usar ${esc(t.dose)} ${esc(D.un)}"${t.on ? ' aria-current="true"' : ""}>${esc(t.dose)}</button></td><td>${esc(t.rate)}</td>${t.eq!=null ? `<td>${esc(t.eq)}</td>` : ""}</tr>`).join("");
  $("#cx-tt").querySelectorAll("tr").forEach(tr=> tr.onclick = ()=>{
    S.dose = +tr.dataset.dose; ds.value = CM.fIn(S.dose,3); cxAtualizaInf("dose");
    const b = $("#cx-tt").querySelector(`tr[data-dose="${tr.dataset.dose}"] .cx-tt-b`); if(b) b.focus({preventScroll: true});
  });
  $("#cx-menos").disabled = !D.passos.some(x=> x < S.dose - 1e-9);
  $("#cx-mais").disabled = !D.passos.some(x=> !(x <= S.dose + 1e-9));
}
// régua da faixa usual (verde-azulado), da dose máxima (vermelho) e da dose atual (marcador)
function cxEscala(D, dose, nivel){
  const el = $("#cx-escala");
  const [lo, hi] = D.faixa, mx = D.max;
  let top = (mx!=null ? mx : hi) * 1.25;
  if(Number.isFinite(dose) && dose > top) top = dose * 1.08;
  const pc = v=> Math.max(0, Math.min(100, v / top * 100));
  const F = v=> CM.fmt(v, 3);
  const temDose = Number.isFinite(dose) && dose >= 0;
  el.innerHTML = `<div class="trk" aria-hidden="true"><div class="faixa" style="left:${pc(lo)}%;width:${pc(hi) - pc(lo)}%"></div>
    ${mx!=null ? `<div class="acima" style="left:${pc(mx)}%"></div>` : ""}
    ${temDose ? `<div class="mk ${nivel || "ok"}" style="left:${pc(dose)}%"></div>` : ""}</div>
    <div class="lbls"><span>faixa usual <b>${F(lo)}–${F(hi)}</b> ${esc(D.un)}</span>${mx!=null ? `<span class="mx">máx <b>${F(mx)}</b></span>` : ""}</div>`;
}

/* ---- linhas de dose (situações, intubação) ---- */
function cxLinhaHTML(key, it, l, ped, ctx){
  const lk = !ped && ctx==="emg" ? CX_LINK_LINHA[it.n] : null;
  const via = l.via ? `<span class="cx-via">${esc(l.via)}</span>` : "";
  let dz = "", info = "";
  if(l.tipo==="semPeso"){
    dz = `<span class="v semp">${esc(l.perKg || "por peso")}</span><small class="falta">falta o peso</small>`;
    info = (l.apres ? `<div class="sub">${esc(l.apres)}</div>` : "") + (l.nota ? `<div class="sub">${esc(l.nota)}</div>` : "");
  } else if(l.tipo==="fixo"){
    info = `<div class="fx">${esc(l.fixo)}</div>${l.nota ? `<div class="sub">${esc(l.nota)}</div>` : ""}`;
  } else if(l.tipo==="bolus"){
    dz = `<span class="v">${esc(l.main)}</span>${l.small ? `<small>${esc(l.small)}</small>` : ""}`;
    info = l.caps.map(t=> `<span class="cap">${esc(t)}</span>`).join("") + `<div class="sub">${esc(l.sub)}</div>` + (l.nota ? `<div class="sub">${esc(l.nota)}</div>` : "");
  } else {   // cálculo especial (CALC): textos/HTML do próprio dilui
    dz = l.main ? `<span class="v">${l.main}</span>${l.small ? `<small>${l.small}</small>` : ""}` : "";
    info = l.sub;
  }
  const pode = !!l.copy;
  const nome = esc(l.n);
  return `<div class="cx-row${dz ? "" : " sem-dz"}" data-row="${esc(key)}">
    <div class="nm">${nome}${via}</div>
    ${dz ? `<div class="dz">${dz}</div>` : ""}
    <div class="acts">${pode ? `<button type="button" class="btn cx-cp" data-k="${esc(key)}" aria-label="Copiar ${nome}"><span aria-hidden="true">📋</span><span class="t"> Copiar</span></button>
      <button type="button" class="btn cx-rxb" data-k="${esc(key)}" aria-label="Levar ${nome} à receita"><span aria-hidden="true">＋</span><span class="t"> Receita</span></button>` : ""}</div>
    <div class="info">${info}${lk ? cxLinks([lk], "") : ""}</div></div>`;
}
const CX_LINK_LINHA = {
  "Adrenalina IM": ["adre", "Infusão de adrenalina (refratária)"],
  "Heparina — bolus TEP/TVP": ["hnf", "Infusão de heparina"],
  "Heparina — bolus SCA": ["hnf", "Infusão de heparina"],
  "Sulfato de magnésio — ataque": ["mgso4", "Manutenção 1 g/h"]
};
// liga Copiar / ＋ Receita de cada linha ao texto da linha (guardado em cxCopias ao desenhar)
let cxCopias = {};
function cxBindLinhas(c){
  c.querySelectorAll(".cx-cp").forEach(b=> b.onclick = async ()=>{
    const ok = await copyText(cxCopias[b.dataset.k]);
    toast(ok ? "Copiado!" : "Não foi possível copiar", ok);
  });
  c.querySelectorAll(".cx-rxb").forEach(b=> b.onclick = ()=> sendToRx(cxCopias[b.dataset.k]));
}
function cxCopiarTudoBtn(id, txt, rotulo){
  return `<div class="cx-tudo"><button type="button" class="btn primary" id="cx-tudo"${txt ? "" : " disabled"}><span aria-hidden="true">📋</span> ${esc(rotulo)}</button>
    <button type="button" class="btn" id="cx-tudo-rx"${txt ? "" : " disabled"}>＋ Receita</button>${txt ? "" : `<span class="dica">digite o peso para copiar tudo</span>`}</div>`;
}
function cxBindTudo(txt, msg){
  const a = $("#cx-tudo"), b = $("#cx-tudo-rx");
  if(a) a.onclick = async ()=>{ const ok = await copyText(txt); toast(ok ? msg : "Não foi possível copiar", ok); };
  if(b) b.onclick = ()=> sendToRx(txt);
}

/* ---- situação (emergência adulto / pediatria) ---- */
function cxRenderSit(c, p){
  const kg = cxS.kg, age = cxS.age;
  cxCopias = {};
  const ls = p.sec.itens.map((it, i)=>{ const key = p.id + "." + i, l = CM.linha(it, kg, age, p.ped); if(l.copy) cxCopias[key] = l.copy; return {key, it, l}; });
  let h = "";
  if(p.ped) h += cxCriancaHTML();
  if(CX_TUDO.has(p.id)){
    const faltaPeso = ls.some(x=> x.l.tipo==="semPeso");
    const txt = faltaPeso ? "" : p.nm + (ls.some(x=> cxDoPeso(x.it)) ? ` — peso ${CM.fmt(kg,1)} kg` : "") + "\n" + ls.filter(x=> x.l.copy).map(x=> "• " + x.l.copy).join("\n");
    h += cxCopiarTudoBtn(p.id, txt, "Copiar tudo");
    c.dataset.tudo = txt;
  }
  h += `<div class="cx-rows">${ls.map(x=> cxLinhaHTML(x.key, x.it, x.l, p.ped, p.grupo)).join("")}</div>`;
  h += cxLinks(CX_LINK_PAG[p.id]);
  c.innerHTML = h;
  cxBindLinhas(c);
  if(CX_TUDO.has(p.id)) cxBindTudo(c.dataset.tudo, "Situação inteira copiada!");
}
// criança: idade → PAS mínima, tubo, lâmina, máscara laríngea (cabeçalho da Pediatria do dilui)
function cxCriancaHTML(){
  const age = cxS.age, kg = cxS.kg;
  if(age==null) return `<p class="cx-nota-ped">Digite a <b>idade</b> para ver o peso estimado, a PA sistólica mínima, o tubo e a lâmina.</p>`;
  const pas = CM.pasMin(age), v = CM.viaPed(age);
  return `<dl class="cx-kv cx-crianca">${pas!=null ? `<div><dt>PAS mínima</dt><dd>${pas} mmHg</dd></div>` : ""}
    <div><dt>Tubo com cuff</dt><dd>${CM.fmt(v.cuff,1)} (sem cuff ${CM.fmt(v.unc,1)})</dd></div>
    <div><dt>Fixação</dt><dd>${CM.fmt(v.depth,1)} cm na rima labial</dd></div><div><dt>Lâmina</dt><dd>${esc(v.blade)}</dd></div>
    ${CM.okKg(kg) ? `<div><dt>Máscara laríngea</dt><dd>nº ${CM.lma(kg)}</dd></div>` : ""}</dl>
    ${age < 1 ? '<p class="cx-nota-ped">Recém-nascido: tubo e fixação pelo peso (NRP). i-gel tem numeração própria.</p>' : ""}`;
}

/* ---- intubação ---- */
const CX_7P = [["Preparo","material, aspirador, drogas, plano B"],["Pré-oxigenação","3–5 min, FiO₂ 100%"],["Pré-tratamento","opcional, 3 min antes"],
  ["Paralisia + indução","em sequência, rápido"],["Posição","coxim, rampa"],["Passagem","confirmar com capnografia"],["Pós-intubação","sedação contínua, RX, VM"]];
function cxRenderIot(c, p){
  const kg = cxS.kg, age = cxS.age, ped = CM.isPed();
  cxCopias = {};
  const linha = (key, it)=>{ const l = CM.linha(it, kg, age, ped); if(l.copy) cxCopias[key] = l.copy; return cxLinhaHTML(key, it, l, ped, "iot"); };
  const kit = CM.okKg(kg) ? CM.kitText() : "";
  let h = `<section class="cx-bloco" aria-labelledby="cx-iot-d"><h4 id="cx-iot-d">Doses${CM.okKg(kg) ? ` <small>para ${CM.fmt(kg,1)} kg${ped ? " · pediátrico" : ""}</small>` : ped ? " <small>pediátrico</small>" : ""}</h4>`;
  h += cxCopiarTudoBtn("iot", kit, "Copiar kit SRI");
  CX_IOT_GR.forEach(([g, t])=>{
    if(g==="ped" && !ped) return;
    h += `<div class="cx-sub">${t}</div><div class="cx-rows">${CM.IOT[g].map((it, i)=> linha("iot." + g + i, it)).join("")}</div>`;
  });
  h += `</section>`;
  h += `<section class="cx-bloco" aria-labelledby="cx-iot-7"><h4 id="cx-iot-7">Sequência rápida <small>os 7 Ps</small></h4>
    <ol class="cx-7p">${CX_7P.map(([t, s])=> `<li><b>${t}</b><span>${s}</span></li>`).join("")}</ol></section>`;
  // via aérea
  h += `<section class="cx-bloco" aria-labelledby="cx-iot-v">`;
  if(ped){
    const v = CM.viaPed(age);
    h += `<h4 id="cx-iot-v">Via aérea <small>${esc(CM.idadeTxt(age))}</small></h4><dl class="cx-kv">
      <div><dt>Tubo com cuff</dt><dd>${CM.fmt(v.cuff,1)}</dd></div><div><dt>Tubo sem cuff</dt><dd>${CM.fmt(v.unc,1)}</dd></div>
      <div><dt>Fixação (rima labial)</dt><dd>${CM.fmt(v.depth,1)} cm</dd></div><div><dt>Lâmina</dt><dd>${esc(v.blade)}</dd></div>
      ${CM.okKg(kg) ? `<div><dt>Máscara laríngea</dt><dd>nº ${CM.lma(kg)}</dd></div>` : ""}</dl>
      <p class="cx-nota-ped">Separe também um tubo 0,5 acima e 0,5 abaixo. Fixação ≈ 3 × diâmetro interno.${age < 1 ? " Recém-nascido: tubo e fixação pelo peso (NRP)." : ""}</p>`;
  } else {
    h += `<h4 id="cx-iot-v">Via aérea e ventilação</h4>
      <dl class="cx-kv"><div><dt>Tubo</dt><dd>♀ 7,0–8,0 · ♂ 7,5–8,5</dd></div><div><dt>Fixação</dt><dd>♀ ~21 cm · ♂ ~23 cm</dd></div></dl>
      <div class="cx-vent"><label class="cx-fld"><span>Altura (cm)</span><input id="cx-alt" inputmode="decimal" autocomplete="off" placeholder="—" value="${CM.fIn(cxS.altura,0)}"></label>
        <div class="cx-fld"><span id="cx-sexo-l">Sexo</span><div class="cx-seg" role="group" aria-labelledby="cx-sexo-l">
          <button type="button" data-sexo="M" aria-pressed="${cxS.sexo==="M"}">Masc.</button><button type="button" data-sexo="F" aria-pressed="${cxS.sexo==="F"}">Fem.</button></div></div></div>
      <div id="cx-vc"></div>
      <p class="cx-nota-ped">Início: PEEP 5 · FR 14–20 (maior na acidose metabólica) · FiO₂ 100% e reduzir para SpO₂ 92–96% · Pplatô &lt; 30 cmH₂O.</p>`;
  }
  h += `</section>`;
  h += `<section class="cx-bloco" aria-labelledby="cx-iot-h"><h4 id="cx-iot-h">Hipotensão peri-intubação <small>bolus</small></h4>
    <div class="cx-rows">${CM.IOT.push.map((it, i)=> linha("iot.push" + i, it)).join("")}</div></section>`;
  h += `<section class="cx-bloco" aria-labelledby="cx-iot-p"><h4 id="cx-iot-p">Depois de intubar</h4>
    ${cxLinks(CX_POS_IOT, "Inicie a analgossedação contínua:")}</section>`;
  c.innerHTML = h;
  cxBindLinhas(c);
  cxBindTudo(kit, "Kit SRI copiado!");
  if(!ped){
    const upd = ()=>{
      const v = cxS.sexo ? CM.ventilacao() : null;
      $("#cx-vc").innerHTML = v ? `<dl class="cx-kv"><div><dt>Peso predito</dt><dd>${v.pp}</dd></div><div><dt>Volume corrente</dt><dd>${v.vc}</dd></div></dl>`
        : `<p class="cx-nota-ped">${Number.isFinite(cxS.altura) ? "Escolha o sexo" : "Informe a altura e o sexo"} para ver o peso predito e o volume corrente.</p>`;
    };
    $("#cx-alt").oninput = e=>{ cxS.altura = CM.num(e.target.value); upd(); };
    c.querySelectorAll("[data-sexo]").forEach(b=> b.onclick = ()=>{ cxS.sexo = b.dataset.sexo; c.querySelectorAll("[data-sexo]").forEach(x=> x.setAttribute("aria-pressed", String(x===b))); upd(); });
    upd();
  }
}

/* ---- nada aberto ---- */
const CX_VAZIO = `<div class="empty"><div class="big" aria-hidden="true">🧮</div><div class="ttl">Escolha uma calculadora</div>
  <div class="sub">Bomba de infusão, intubação e doses de emergência — adulto e pediatria.</div>
  <div class="cx-atalhos">${[["nora","Noradrenalina"],["iot","Intubação"],["emg-parada","Parada cardíaca"],["ped-parada","Parada pediátrica"]].map(([id, t])=>
    `<button type="button" class="btn" data-go="${id}">${t}</button>`).join("")}</div></div>`;
function cxBindVazio(){ cxBody.querySelectorAll("[data-go]").forEach(b=> b.onclick = ()=> navigate("calculadoras", b.dataset.go, "click")); }

/* ---- o peso é global: mudanças vindas das Prescrições e o "Limpar" da receita chegam aqui ---- */
document.addEventListener("input", e=>{ if(e.target && e.target.id==="peso"){ cxPesoEst = null; cxPesoMudou(false); } });
$("#btn-clear").addEventListener("click", ()=>{
  // receita nova = paciente novo: peso (o handler da receita já zerou), idade e altura/sexo também
  cxPesoEst = null; cxIdade = {txt: "", un: "a"}; cxS.age = null; cxS.altura = NaN; cxS.sexo = null;
  if(cxAberta) cxAbrirMesmo();
});
// redesenha a página aberta mantendo a droga, a diluição e a dose (só peso/idade mudaram)
function cxAbrirMesmo(){
  cxSyncKg();
  const p = cxAberta;
  cxBody.innerHTML = cxCabecalho(p) + cxPacHTML(p) + `<div id="cx-conteudo"></div>` + cxRodape();
  cxBindPac(); cxRenderConteudo();
}
$("#cx-filtro").oninput = e=> cxRenderLista(e.target.value);

/* ---- busca única: cada calculadora e cada remédio dentro das situações ---- */
function cxBuscaItens(){
  const out = [];
  CX_PAGS.forEach(p=>{
    const g = cxGrupo(p.grupo);
    if(p.tipo==="inf"){ out.push({id: p.id, ic: g.ic, title: p.nm, sub: `${g.nm} · ${p.sub} · ${p.D.un}`, kw: [p.D.apres, p.D.dil, p.id].join(" ")}); return; }
    out.push({id: p.id, ic: g.ic, title: p.tipo==="iot" ? "Intubação — sequência rápida" : p.nm, sub: g.nm, kw: CX_KW[p.id] || ""});
    cxLinhasPag(p).forEach(({key, it, gl})=> out.push({id: key, ic: g.ic, title: cxNomeLinha(it), sub: `${g.nm} · ${gl || p.nm}`,
      kw: [it.via, it.apres].filter(Boolean).join(" ")}));
  });
  return out;
}

/* ---- registro da aba ---- */
cxRenderLista();
cxFechar();
registerView({
  key: "calculadoras", label: "Calculadoras", icon: "🧮",
  cols: ["col-calc-lista", "col-calc"], layout: "lista",
  itemId: () => cxAberta ? cxAberta.id : null,
  open: cxAbrir,
  close: cxFechar,
  search: cxBuscaItens
});
