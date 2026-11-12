/* views/procedimentos.js — aba Procedimentos: lista por área (#col-proc-lista) + procedimento aberto (#col-proc).
   Conteúdo em data/procedimentos.js (PROC_AREAS, PROC_CAMPOS, PROCS). Cada procedimento abre com duas guias:
   - Registro (padrão): o texto já preenchido com o padrão e um Copiar. Para mudar algo, clica-se na própria palavra do
     texto (opções num menu pequeno; texto livre vira um campo no lugar). Os brancos (lado, achados, medidas) também
     estão na linha rápida embaixo; a variação principal da técnica fica como escolha de um clique no topo; linhas
     opcionais (consentimento, observação) entram por "＋". "Editar texto" vira texto livre.
   - Como fazer: material, passo a passo (com figuras, quando houver) e o resto da referência em caixas fechadas.
   prTexto(p, vals) troca {id} pelo valor (vazio → ____) e apaga as linhas cujo {id?} ficou vazio. */
const prLista = $("#pr-lista"), prBody = $("#pr-body"), prTitulo = $("#pr-titulo"), prBarra = $("#pr-barra");
const PR_LACUNA = "____";
let PR_FIG_DIR = "img/procedimentos/";     // figuras do "Como fazer" (lista em PROC_FIGURAS, data/procedimentos.js); let: os testes trocam
const prFiguras = p => (typeof PROC_FIGURAS!=="undefined" && PROC_FIGURAS[p.id]) || [];
let prAberto = null;          // procedimento aberto
// por procedimento, durante a sessão: {vals, mat: Set(material marcado), abertas: Set(caixas abertas), guia, livre}
// (livre = texto editado à mão no modo "Editar texto"; null fora dele)
const prEstado = {};

/* ---- dados ---- */
const prProc = id => PROCS.find(p=> p.id===id) || null;
const prArea = k => PROC_AREAS.find(a=> a.key===k);
const prUp = s => String(s == null ? "" : s).trim().toLocaleUpperCase("pt-BR");
// opções que vêm da tabela de intubação da aba Calculadoras (só leitura): "IOT.ind" → nomes dos indutores
function prFonte(f){
  const [tab, lista] = f.split(".");
  const t = typeof CALC_DADOS!=="undefined" && CALC_DADOS[tab] && CALC_DADOS[tab][lista];
  return t ? t.map(d=> prUp(d.n)) : [];
}
// campos do registro já resolvidos: os referidos por id vêm de PROC_CAMPOS; "registro.padrao" sobrepõe o padrão
// do campo (null tira); "fonte" busca as opções na tabela da Calculadoras
const prCamposCache = new Map();
function prCampos(p){
  if(prCamposCache.has(p.id)) return prCamposCache.get(p.id);
  const pad = p.registro.padrao || {};
  const cs = p.registro.campos.map(c=>{
    const o = typeof c==="string" ? {id: c, ...PROC_CAMPOS[c]} : {...c};
    if(o.id in pad) o.padrao = pad[o.id];
    if(o.padrao == null) delete o.padrao;
    if(o.fonte){
      o.opcoes = prFonte(o.fonte);
      // indutor/bloqueador: o padrão é o do kit SRI da aba Calculadoras (CM.KIT_PADRAO) — um lugar só para as duas abas
      const [tab, lista] = o.fonte.split(".");
      if(o.padrao == null && tab==="IOT" && typeof CM!=="undefined" && CM.KIT_PADRAO && CM.KIT_PADRAO[lista] != null){
        const it = CALC_DADOS.IOT[lista][CM.KIT_PADRAO[lista]];
        if(it) o.padrao = prUp(it.n);
      }
    }
    return o;
  });
  prCamposCache.set(p.id, cs);
  return cs;
}
const prCampo = (p, id) => prCampos(p).find(c=> c.id===id);
const prTemPadrao = c => c.padrao != null;
// linha rápida: os campos que nunca têm padrão (lado, achados, medidas) — ficam ____ até a pessoa escolher
const prRapidos = p => prCampos(p).filter(c=> c.tipo!=="derivado" && !c.opcional && !prTemPadrao(c));
// o que se ajusta (clicando no texto): os campos com padrão e os opcionais (consentimento, observação)
const prAjustes = p => prCampos(p).filter(c=> c.tipo!=="derivado" && (prTemPadrao(c) || c.opcional));
const prOpcionais = p => prCampos(p).filter(c=> c.opcional);
const prVariacoes = p => (p.registro.variacoes || []).map(v=> ({...v, c: prCampo(p, v.campo)})).filter(v=> v.c);
function prPadraoVals(p){ const v = {}; prCampos(p).forEach(c=>{ if(prTemPadrao(c)) v[c.id] = c.padrao; }); return v; }
function prEst(p){ return prEstado[p.id] || (prEstado[p.id] = {vals: prPadraoVals(p), mat: new Set(), abertas: new Set(), guia: "registro", livre: null}); }
const prVal = (p, id) => String(prEst(p).vals[id] || "").trim();

/* ---- drogas da intubação: calculadas pela tabela da aba Calculadoras (CALC_DADOS.IOT + CM.bolus), nunca escritas aqui.
   Indutor no início da faixa da tabela, bloqueador no fim (dose de SRI). Volume arredondado ao que se aspira: ao mL
   inteiro a partir de 5 mL, a 0,1 mL abaixo disso; empate (x,5) arredonda para baixo. A dose em mg sai do volume. */
const prNum = s => { const n = parseFloat(String(s == null ? "" : s).replace(/\s/g, "").replace(",", ".")); return Number.isFinite(n) ? n : NaN; };
const prFmt = n => (Math.round(n*10)/10).toLocaleString("pt-BR", {maximumFractionDigits: 1});
function prArredMl(ml){ const passo = ml >= 5 ? 1 : 0.1; return Math.ceil(ml/passo - 0.5 - 1e-9) * passo; }
function prDroga(lista, nome, ponto, kg){
  const it = (CALC_DADOS.IOT[lista] || []).find(d=> prUp(d.n)===prUp(nome));
  if(!it || !it.c) return null;
  const b = CM.bolus(it, kg, null, false);
  const ml = prArredMl(ponto==="fim" ? b.ml[1] : b.ml[0]);
  return {nome: prUp(it.n), resto: `${prFmt(ml*it.c)} MG (${prFmt(ml)} ML)`};
}
// campo derivado: "usa" = campos que o alimentam (não vão sozinhos para o modelo); partes(vals) = o texto em pedaços,
// cada campo que o alimenta vira um trecho clicável ({c, t}); null = em branco
const PR_DERIVADOS = {
  sri: {usa: ["peso", "indutor", "bloqueador"], partes(vals){
    const kg = prNum(vals.peso);
    if(!(kg > 0) || typeof CALC_DADOS==="undefined" || typeof CM==="undefined") return null;
    const out = [];
    [["ind", "indutor", "inicio"], ["bnm", "bloqueador", "fim"]].forEach(([lista, id, ponto])=>{
      const d = prDroga(lista, vals[id], ponto, kg);
      if(!d) return;
      if(out.length) out.push(" + ");
      out.push({c: id, t: d.nome}, " " + d.resto);
    });
    if(!out.length) return null;
    out.push(" — PESO ", {c: "peso", t: prFmt(kg)}, " KG");
    return out;
  }}
};
const prUsados = p => new Set(prCampos(p).flatMap(c=> c.tipo==="derivado" && PR_DERIVADOS[c.de] ? PR_DERIVADOS[c.de].usa : []));
const prJunta = segs => segs.map(s=> typeof s==="string" ? s : s.t).join("");

/* ---- texto do registro em pedaços (determinístico: mesmos valores → mesmo texto) ----
   Cada linha é uma lista de pedaços: texto fixo (string) ou trecho de um campo {c, t, vazio?}. */
function prLinhas(p, vals){
  vals = vals || prEst(p).vals;
  const linhas = [];
  p.registro.modelo.forEach(l=>{
    const opc = [...l.matchAll(/\{([a-z_]+)\?\}/g)].map(m=> m[1]);
    if(opc.some(id=> !prUp(vals[id]))) return;
    const segs = [];
    let ult = 0;
    for(const m of l.matchAll(/\{([a-z_]+)(\?)?\}/g)){
      if(m.index > ult) segs.push(l.slice(ult, m.index));
      const id = m[1], c = prCampo(p, id);
      if(c && c.tipo==="derivado"){
        const d = PR_DERIVADOS[c.de], ps = d ? d.partes(vals) : null;
        if(ps) segs.push(...ps); else segs.push({c: d ? d.usa[0] : id, t: PR_LACUNA, vazio: true, deriv: id});
      } else {
        const v = prUp(vals[id]);
        segs.push(v ? {c: id, t: v} : {c: id, t: PR_LACUNA, vazio: true});
      }
      ult = m.index + m[0].length;
    }
    if(ult < l.length) segs.push(l.slice(ult));
    linhas.push(segs);
  });
  return linhas;
}
function prValores(p, vals){
  const v = {...(vals || prEst(p).vals)};
  prCampos(p).forEach(c=>{ if(c.tipo==="derivado"){ const d = PR_DERIVADOS[c.de], ps = d ? d.partes(v) : null; v[c.id] = ps ? prJunta(ps) : ""; } });
  return v;
}
function prTexto(p, vals){ return prLinhas(p, vals).map(prJunta).join("\n"); }
const prPadraoTexto = p => prTexto(p, prPadraoVals(p));
// o texto que vai para o prontuário: o editado à mão (modo "Editar texto") ou o dos campos
const prTextoFinal = p => prEst(p).livre != null ? prEst(p).livre : prTexto(p);
// campos obrigatórios ainda vazios (os da linha rápida, ou um ajuste apagado)
// (um campo que só alimenta um derivado não conta: quem aparece é o derivado, ex.: "Drogas")
function prFaltam(p){ const all = prValores(p), usa = prUsados(p); return prCampos(p).filter(c=> !c.opcional && !usa.has(c.id) && !String(all[c.id] || "").trim()); }
// o que difere do padrão (os ajustes; a linha rápida não conta)
function prMudancas(p){ const st = prEst(p); return prAjustes(p).filter(c=> String(st.vals[c.id] || "").trim() !== String(c.padrao || "").trim()); }

/* ---- lista ---- */
// desenho de cada procedimento no quadradinho da lista (só emoji até a versão 12 — Windows 10 dos hospitais); sem desenho = o da área
const PR_IC = {"iot": "😮", "crico": "🔪", "descompressao": "🎈", "toracocentese": "💧", "dreno": "🌊", "cvc": "💉", "io": "🦴",
  "paracentese": "🟡", "pl": "🧠", "cardioversao": "⚡"};
function prBuscaTexto(p){ return [p.nm, p.sub, p.kw, prArea(p.area).nm].join(" "); }
function prRenderLista(filtro=""){
  const f = norm(filtro.trim());
  let h = "", n = 0;
  PROC_AREAS.forEach(a=>{
    const ps = PROCS.filter(p=> p.area===a.key && (!f || norm(prBuscaTexto(p)).includes(f)));
    if(!ps.length) return;
    h += `<div class="pr-gh">${esc(a.nm)}</div>`;
    ps.forEach(p=>{
      n++;
      h += `<button type="button" class="pr-item${prAberto===p ? " active" : ""}" data-id="${esc(p.id)}" aria-pressed="${prAberto===p}">
        <span class="tic" aria-hidden="true">${PR_IC[p.id] || a.ic || "🩺"}</span><span class="eb">${esc(a.nm)}</span><span class="nm">${esc(p.nm)}</span><span class="sub">${esc(p.sub)}</span></button>`;
    });
  });
  prLista.innerHTML = h || `<div class="rx-empty">Nada encontrado.</div>`;
  $("#pr-count").textContent = f ? n : PROCS.length;
  prLista.querySelectorAll(".pr-item").forEach(b=> b.onclick = ()=>{ prAbrir(b.dataset.id, "click"); routeChanged(); });
}

/* ---- rótulos ---- */
const prLi = arr => arr.map(x=> `<li>${esc(x)}</li>`).join("");
const prPlural = (n, um, varios) => `${n} ${n===1 ? um : varios}`;
// rótulo de uma opção: o valor (em maiúsculas, vai assim para o texto) em caixa de frase, sem estragar siglas
const PR_SIGLAS = new Set(["EIC", "PVPI", "US", "LCR", "TC", "RX", "NINO", "TV", "FA", "TSV", "ETE", "SF", "ECG"]);
function prRotulo(o){
  if(o.length<=4) return o;
  let first = true;
  return o.split(/(\s+|\(|\)|\/|,)/).map(w=>{
    if(!/[A-ZÀ-Ú]/.test(w)) return w;
    const keep = /\d/.test(w) || PR_SIGLAS.has(w);
    const low = keep ? w : w.toLocaleLowerCase("pt-BR");
    const out = first && !keep ? low.charAt(0).toLocaleUpperCase("pt-BR") + low.slice(1) : low;
    first = false;
    return out;
  }).join("");
}

/* ---- guia Registro ---- */
// um campo da linha rápida: opções viram botões; texto/número vira caixa
function prCampoHTML(p, c){
  const v = prEst(p).vals[c.id] || "", lid = `pr-c-${c.id}`;
  if(c.tipo==="opcoes"){
    return `<div class="pr-q" data-campo="${c.id}"><span class="lbl" id="${lid}">${esc(c.rotulo)}</span>
      <div class="pr-opcoes" role="group" aria-labelledby="${lid}">${c.opcoes.map(o=>
        `<button type="button" class="pr-op" data-c="${c.id}" data-v="${esc(o)}" aria-pressed="${o===v}">${esc(prRotulo(o))}</button>`).join("")}</div></div>`;
  }
  return `<div class="pr-q" data-campo="${c.id}"><label class="lbl" for="${lid}">${esc(c.rotulo)}</label>
    <span class="pr-in${c.tipo==="num" ? " num" : ""}"><input id="${lid}" data-c="${c.id}" type="text" autocomplete="off"${c.tipo==="num" ? ' inputmode="decimal"' : ""} placeholder="${esc(c.dica || "")}" value="${esc(v)}">${c.un ? `<span class="un">${esc(c.un)}</span>` : ""}</span></div>`;
}
// variação principal da técnica (1–2 por procedimento): escolha de um clique, com rótulos curtos
function prVariacaoHTML(p, v){
  const val = prEst(p).vals[v.c.id] || "", lid = `pr-v-${v.c.id}`;
  return `<div class="pr-var" data-campo="${v.c.id}"><span class="lbl" id="${lid}">${esc(v.rotulo || v.c.rotulo)}</span>
    <div class="pr-seg" role="group" aria-labelledby="${lid}">${v.c.opcoes.map(o=>
      `<button type="button" class="pr-op pr-vop" data-c="${v.c.id}" data-v="${esc(o)}" aria-pressed="${o===val}" title="${esc(prRotulo(o))}">${esc((v.curtos || {})[o] || prRotulo(o))}</button>`).join("")}</div></div>`;
}
function prRegistroHTML(p){
  const rap = prRapidos(p), vars = prVariacoes(p);
  return `<section class="pr-padrao" id="pr-padrao" aria-label="Registro para o prontuário">
      <div class="pr-padrao-top"><span class="pr-estado" id="pr-estado">padrão</span>
        ${vars.map(v=> prVariacaoHTML(p, v)).join("")}
        <span class="pr-acoes">
          <button type="button" class="btn ghostb" id="pr-voltar" hidden>Voltar ao padrão</button>
          <button type="button" class="btn ghostb" id="pr-editar" aria-pressed="false">Editar texto</button>
          <button type="button" class="btn primary pr-copiar" id="pr-copiar"><span class="i i-copy" aria-hidden="true"></span>Copiar</button></span></div>
      <pre class="pr-texto" id="pr-texto" aria-label="Texto do registro: clique numa palavra sublinhada para trocar"></pre>
      <textarea class="pr-livre" id="pr-livre" aria-label="Texto do registro (edição livre)" spellcheck="false" hidden></textarea>
      ${rap.length ? `<div class="pr-rapido" id="pr-rapido" role="group" aria-label="Preencher os brancos">${rap.map(c=> prCampoHTML(p, c)).join("")}</div>` : ""}
      <div class="pr-pe"><span class="pr-mais-l" id="pr-mais"></span><span class="pr-faltam" id="pr-faltam" aria-live="polite"></span></div>
      <div class="pr-pop" id="pr-pop" role="dialog" hidden></div>
    </section>`;
}

/* ---- guia Como fazer ---- */
// figuras: {arquivo, titulo, legenda, passo: "tecnica.3" (1 = primeiro passo da seção), alt?}; sem passo → no fim
function prFiguraHTML(f){
  return `<figure class="pr-fig"><img src="${esc(PR_FIG_DIR + f.arquivo)}" alt="${esc(f.alt || f.titulo || "")}" loading="lazy" decoding="async">
    <figcaption>${f.titulo ? `<b>${esc(f.titulo)}</b> ` : ""}${esc(f.legenda || "")}</figcaption></figure>`;
}
function prPassos(p, secao){
  const figs = prFiguras(p);
  return p[secao].map((s, i)=>{
    const o = typeof s==="string" ? {t: s} : s;
    const fs = figs.filter(f=> f.passo===`${secao}.${i + 1}`);
    return `<li><span class="t">${esc(o.t)}</span>${o.cuidado ? `<span class="pr-call cuidado"><b>Cuidado</b> ${esc(o.cuidado)}</span>` : ""}${o.dica ? `<span class="pr-call dica"><b>Dica</b> ${esc(o.dica)}</span>` : ""}${fs.map(prFiguraHTML).join("")}</li>`;
  }).join("");
}
function prMaterial(p){
  const st = prEst(p);
  return `<div class="pr-mat-tools"><span class="pr-mat-n" id="pr-mat-n" aria-live="polite"></span>
      <button type="button" class="btn" id="pr-mat-copiar"><span class="i i-copy" aria-hidden="true"></span> Copiar material</button>
      <button type="button" class="btn ghostb" id="pr-mat-limpar">Desmarcar</button></div>
    <ul class="pr-check">${p.material.map((m, i)=> `<li><label><input type="checkbox" data-m="${i}"${st.mat.has(i) ? " checked" : ""}> <span>${esc(m)}</span></label></li>`).join("")}</ul>`;
}
function prCaixa(p, key, titulo, resumo, corpo){
  const open = prEst(p).abertas.has(key) ? " open" : "";
  return `<details class="pr-cx pr-cx-${key}" data-cx="${key}" id="pr-cx-${key}"${open}><summary><span class="t">${titulo}</span><span class="s" id="pr-cx-s-${key}">${esc(resumo)}</span></summary>
    <div class="pr-cx-corpo">${corpo}</div></details>`;
}
function prComoHTML(p){
  const secoes = [["preparo", "Preparo"], ["tecnica", "Técnica"], ["depois", "Confirmação e cuidados depois"]];
  const validos = new Set(secoes.flatMap(([s])=> p[s].map((_, i)=> `${s}.${i + 1}`)));
  const soltas = prFiguras(p).filter(f=> !validos.has(f.passo));
  const caixas = [
    prCaixa(p, "indicacoes", "Indicações e contraindicações",
      `${prPlural(p.indicacoes.length, "indicação", "indicações")} · contraindicações: ${prPlural(p.contra.absolutas.length, "absoluta", "absolutas")}, ${prPlural(p.contra.relativas.length, "relativa", "relativas")}`,
      `<h5>Indicações</h5><ul>${prLi(p.indicacoes)}</ul>
       <h5>Contraindicações</h5><div class="pr-ci"><div><b class="abs">Absolutas</b><ul>${prLi(p.contra.absolutas)}</ul></div>
         <div><b class="rel">Relativas</b><ul>${prLi(p.contra.relativas)}</ul></div></div>`),
    prCaixa(p, "complicacoes", "Complicações", p.complicacoes.join(" · "), `<ul class="pr-tags">${prLi(p.complicacoes)}</ul>`),
    (p.calc || []).length ? prCaixa(p, "doses", "Doses", p.calc.map(([, t])=> t).join(" · "),
      `<div class="pr-calc">${p.calc.map(([id, t])=> `<a class="cx-link" href="#/calculadoras/${esc(id)}" data-calc="${esc(id)}">${esc(t)} <span aria-hidden="true">→</span></a>`).join("")}</div>`) : "",
    p.draft && (p.pendencias || []).length ? prCaixa(p, "revisor", "Para o revisor",
      prPlural(p.pendencias.length, "ponto a decidir ou conferir", "pontos a decidir ou conferir"), `<ul>${prLi(p.pendencias)}</ul>`) : "",
    prCaixa(p, "fontes", "Fontes", `${prPlural(p.fontes.length, "fonte", "fontes")} · ${p.revisado ? `revisado em ${p.revisado}` : "ainda não revisado pelo médico"}`,
      `<ul>${prLi(p.fontes)}</ul>${p.registro.resumo ? `<p class="pr-aprov">${esc(p.registro.resumo)}${p.registro.aprovado ? ` <b>Aprovado pelo médico em ${esc(p.registro.aprovado.split("-").reverse().join("/"))}.</b>` : ""}</p>` : ""}
       <p class="pr-rev">${p.revisado ? `Revisado em ${esc(p.revisado)}` : "Ainda não revisado pelo médico responsável."}</p>`)
  ].join("");
  // material numa caixa (fechada até a pessoa abrir; lembra o estado), para o passo a passo ser a leitura principal
  return `<div class="pr-caixas pr-caixa-mat">${prCaixa(p, "material", "Material", "", prMaterial(p))}</div>
    <section class="pr-sec pr-passos-sec" aria-labelledby="pr-h-passos"><h4 id="pr-h-passos">Passo a passo</h4>
      <div class="pr-passos-wrap">${secoes.map(([s, t])=> `<h5>${t}</h5><ol class="pr-passos">${prPassos(p, s)}</ol>`).join("")}</div>
      ${soltas.length ? `<div class="pr-figs">${soltas.map(prFiguraHTML).join("")}</div>` : ""}</section>
    <div class="pr-caixas">${caixas}</div>`;
}

function prPagina(p){
  const g = prEst(p).guia;
  const aba = (k, t)=> `<button type="button" role="tab" class="pr-guia" id="pr-guia-${k}" data-guia="${k}" aria-controls="pr-g-${k}" aria-selected="${g===k}" tabindex="${g===k ? 0 : -1}">${t}</button>`;
  return `<div class="pr-pag">
    <div class="pr-cab"><h3 id="pr-h" tabindex="-1">${esc(p.nm)} <span class="cx-tag" title="Conteúdo gerado por IA, ainda não revisado pelo médico">rascunho</span></h3>
      <div class="pr-guias" role="tablist" aria-label="${esc(p.nm)}">${aba("registro", "Registro")}${aba("como", "Como fazer")}</div></div>
    <div class="pr-gpainel" id="pr-g-registro" role="tabpanel" aria-labelledby="pr-guia-registro"${g==="registro" ? "" : " hidden"}>${prRegistroHTML(p)}</div>
    <div class="pr-gpainel pr-como" id="pr-g-como" role="tabpanel" aria-labelledby="pr-guia-como"${g==="como" ? "" : " hidden"}>${prComoHTML(p)}</div>
  </div>`;
}

/* ---- registro: desenho do texto e do estado ---- */
function prTrechoHTML(p, s){
  if(typeof s==="string") return esc(s);
  const c = prCampo(p, s.c), rot = c ? c.rotulo : s.c;
  return `<span class="pr-tk${s.vazio ? " vazio" : ""}" role="button" tabindex="0" data-c="${esc(s.c)}" aria-haspopup="true" aria-label="${esc(rot)}: ${s.vazio ? "em branco" : esc(s.t)} — trocar">${esc(s.t)}</span>`;
}
function prSincCampo(id){
  const v = prEst(prAberto).vals[id] || "";
  prBody.querySelectorAll(`.pr-op[data-c="${id}"]`).forEach(x=> x.setAttribute("aria-pressed", String(x.dataset.v===v)));
  const i = prBody.querySelector(`.pr-rapido input[data-c="${id}"]`); if(i && i.value!==v) i.value = v;
}
function prAtualizaNota(){
  const p = prAberto; if(!p) return;
  const st = prEst(p), livre = st.livre != null;
  const falta = livre ? [] : prFaltam(p), muda = prMudancas(p), aj = muda.length > 0;
  $("#pr-texto").innerHTML = prLinhas(p).map(segs=> segs.map(s=> prTrechoHTML(p, s)).join("")).join("\n");
  $("#pr-texto").hidden = livre;
  const ta = $("#pr-livre"); ta.hidden = !livre;
  if(livre && ta.value!==st.livre) ta.value = st.livre;
  if(livre){ ta.style.height = "auto"; ta.style.height = ta.scrollHeight + 2 + "px"; }
  prCampos(p).forEach(c=> prSincCampo(c.id));
  const f = $("#pr-faltam");
  // curto (os brancos já aparecem marcados no texto e na linha rápida); os nomes ficam no title e no aviso do Copiar
  f.textContent = livre ? "Texto editado à mão." : falta.length ? `${falta.length} em branco` : "Sem brancos.";
  f.title = falta.length ? "Em branco: " + falta.map(c=> c.rotulo).join(", ") : "";
  f.className = "pr-faltam" + (falta.length || livre ? "" : " ok");
  const e = $("#pr-estado");
  e.textContent = livre ? "editado" : aj ? `ajustado · ${prPlural(muda.length, "mudança", "mudanças")}` : "padrão";
  e.title = aj ? "Diferente do padrão: " + muda.map(c=> c.rotulo).join(", ") : "";
  e.classList.toggle("aj", aj || livre);
  $("#pr-voltar").hidden = !(aj || livre);
  const ed = $("#pr-editar"); ed.textContent = livre ? "Voltar aos campos" : "Editar texto"; ed.setAttribute("aria-pressed", String(livre));
  // "＋" das linhas opcionais que ainda não estão no texto
  $("#pr-mais").innerHTML = livre ? "" : prOpcionais(p).filter(c=> !prVal(p, c.id)).map(c=>
    `<button type="button" class="pr-mais" data-add="${c.id}" aria-haspopup="true"><span class="i i-plus" aria-hidden="true"></span>${esc(c.id==="obs" ? "Observação" : c.rotulo)}</button>`).join("");
  ["pr-rapido"].forEach(id=>{ const el = document.getElementById(id); if(el) el.hidden = livre; });
  prBody.querySelectorAll(".pr-var").forEach(el=> el.hidden = livre);
}
function prMuda(id, v){ prEst(prAberto).vals[id] = v; prAtualizaNota(); }
function prFocaTrecho(id){
  const t = prBody.querySelector(`#pr-texto .pr-tk[data-c="${id}"]`);
  if(t) t.focus({preventScroll: true});
}

/* ---- menu pequeno de um trecho (opções) ou campo no lugar (texto livre) ---- */
let prPopAlvo = null;   // {id, el: elemento que abriu}
function prFechaPop(foco){
  const pop = $("#pr-pop"); if(!pop || pop.hidden) return;
  pop.hidden = true; pop.innerHTML = "";
  const a = prPopAlvo; prPopAlvo = null;
  if(foco && a){ if(document.body.contains(a.el)) a.el.focus({preventScroll: true}); else prFocaTrecho(a.id); }
}
function prPosicionaPop(el){
  const pop = $("#pr-pop"), card = $("#pr-padrao"), r = el.getBoundingClientRect(), c = card.getBoundingClientRect();
  pop.style.left = "0px"; pop.style.top = (r.bottom - c.top + 4) + "px";
  const w = pop.offsetWidth, max = c.width - 8;
  pop.style.left = Math.max(4, Math.min(r.left - c.left, max - w)) + "px";
}
function prAbrePop(el, id){
  const p = prAberto, c = prCampo(p, id), st = prEst(p), pop = $("#pr-pop");
  if(!c) return;
  prFechaPop(false);
  prPopAlvo = {id, el};
  const atual = st.vals[id] || "";
  let h = `<div class="pr-pop-t">${esc(c.rotulo)}</div>`;
  if(c.tipo==="opcoes"){
    h += `<div class="pr-pop-ops" role="listbox" aria-label="${esc(c.rotulo)}">${c.opcoes.map(o=>
      `<button type="button" class="pr-pop-op" role="option" data-v="${esc(o)}" aria-selected="${o===atual}">${esc(prRotulo(o))}</button>`).join("")}
      ${(c.opcional || !prTemPadrao(c)) && atual ? `<button type="button" class="pr-pop-op tirar" role="option" data-v="" aria-selected="false">${c.opcional ? "Tirar esta linha" : "Deixar em branco"}</button>` : ""}</div>`;
  } else {
    h += `<div class="pr-pop-in"><input type="text" id="pr-pop-in" autocomplete="off" value="${esc(atual)}" placeholder="${esc(c.dica || "")}"${c.tipo==="num" ? ' inputmode="decimal"' : ""}>
      <button type="button" class="btn primary" id="pr-pop-ok">${atual ? "OK" : "Adicionar"}</button></div>`;
  }
  pop.innerHTML = h; pop.hidden = false;
  pop.setAttribute("aria-label", c.rotulo);
  prPosicionaPop(el);
  const escolhe = v=>{ prFechaPop(false); prMuda(id, v); if(v) prFocaTrecho(id); else el.isConnected ? el.focus({preventScroll: true}) : $("#pr-copiar").focus({preventScroll: true}); };
  if(c.tipo==="opcoes"){
    const ops = [...pop.querySelectorAll(".pr-pop-op")];
    ops.forEach(b=> b.onclick = ()=> escolhe(b.dataset.v));
    (ops.find(b=> b.getAttribute("aria-selected")==="true") || ops[0]).focus({preventScroll: true});
  } else {
    const i = $("#pr-pop-in");
    const ok = ()=> escolhe(i.value.trim());
    $("#pr-pop-ok").onclick = ok;
    i.onkeydown = e=>{ if(e.key==="Enter" && !e.ctrlKey && !e.metaKey){ e.preventDefault(); ok(); } };
    i.focus(); i.select();
  }
}
// trecho de texto livre (ou número): vira um campo pequeno no próprio lugar do texto
function prEditaNoLugar(tk){
  const p = prAberto, id = tk.dataset.c, c = prCampo(p, id), st = prEst(p);
  const i = document.createElement("input");
  i.type = "text"; i.className = "pr-tk-in"; i.value = st.vals[id] || ""; i.placeholder = c.dica || c.rotulo;
  i.setAttribute("aria-label", c.rotulo); i.autocomplete = "off";
  if(c.tipo==="num") i.inputMode = "decimal";
  i.size = Math.max(4, Math.min(40, (i.value || i.placeholder).length + 1));
  tk.replaceWith(i);
  i.focus(); i.select();
  let feito = false;
  const fim = salva=>{ if(feito) return; feito = true; if(salva) st.vals[id] = i.value; prAtualizaNota(); prFocaTrecho(id); };
  i.oninput = ()=>{ i.size = Math.max(4, Math.min(40, i.value.length + 1)); };
  i.onkeydown = e=>{
    if(e.key==="Enter" && !e.ctrlKey && !e.metaKey){ e.preventDefault(); fim(true); }
    else if(e.key==="Escape"){ e.preventDefault(); e.stopPropagation(); fim(false); }
  };
  i.onblur = ()=> fim(true);
}
function prAtivaTrecho(tk){
  const c = prCampo(prAberto, tk.dataset.c);
  if(!c) return;
  if(c.tipo==="opcoes") prAbrePop(tk, c.id); else prEditaNoLugar(tk);
}

/* ---- ações ---- */
async function prCopiarNota(){
  const p = prAberto; if(!p) return;
  const livre = prEst(p).livre != null, falta = livre ? [] : prFaltam(p);
  const ok = await copyText(prTextoFinal(p));
  if(!ok){ toast("Não foi possível copiar", false); return; }
  toast(falta.length ? `Copiado — em branco: ${falta.map(c=> c.rotulo).join(", ")}` : "Registro copiado!", !falta.length);
}
function prMatContador(){
  const p = prAberto, n = prEst(p).mat.size;
  $("#pr-mat-n").textContent = `${n}/${p.material.length} separados`;
  $("#pr-cx-s-material").textContent = prPlural(p.material.length, "item", "itens") + (n ? ` · ${n} separados` : "") + " · checklist e Copiar material";
}
function prVoltarPadrao(){
  const p = prAberto, st = prEst(p);
  prAjustes(p).forEach(c=>{ st.vals[c.id] = prTemPadrao(c) ? c.padrao : ""; });
  st.livre = null;
  prFechaPop(false);
  prAtualizaNota(); toast("Padrão restaurado");
}
function prGuia(k, foco){
  const st = prEst(prAberto);
  st.guia = k;
  prFechaPop(false);
  prBody.querySelectorAll(".pr-guia").forEach(b=>{ const on = b.dataset.guia===k; b.setAttribute("aria-selected", String(on)); b.tabIndex = on ? 0 : -1; });
  $("#pr-g-registro").hidden = k!=="registro";
  $("#pr-g-como").hidden = k!=="como";
  if(foco) $("#pr-guia-" + k).focus();
  prObservarCopiar();
}
function prBind(){
  const p = prAberto, st = prEst(p);
  const pag = prBody.querySelector(".pr-pag");
  // guias Registro / Como fazer (← → trocam, como numa barra de abas)
  prBody.querySelectorAll(".pr-guia").forEach(b=>{
    b.onclick = ()=> prGuia(b.dataset.guia);
    b.onkeydown = e=>{ if(e.key==="ArrowRight" || e.key==="ArrowLeft"){ e.preventDefault(); prGuia(b.dataset.guia==="registro" ? "como" : "registro", true); } };
  });
  // caixas do Como fazer: lembra quais estão abertas (volta igual depois de trocar de aba ou ir à Calculadoras)
  prBody.querySelectorAll(".pr-cx").forEach(d=> d.addEventListener("toggle", ()=>{ d.open ? st.abertas.add(d.dataset.cx) : st.abertas.delete(d.dataset.cx); }));
  // checklist do material
  prBody.querySelectorAll(".pr-check input").forEach(i=> i.onchange = ()=>{ i.checked ? st.mat.add(+i.dataset.m) : st.mat.delete(+i.dataset.m); prMatContador(); });
  $("#pr-mat-copiar").onclick = async ()=>{
    const ok = await copyText(`MATERIAL — ${p.nm.toLocaleUpperCase("pt-BR")}\n` + p.material.map(m=> "- " + m).join("\n"));
    toast(ok ? "Material copiado!" : "Não foi possível copiar", ok);
  };
  $("#pr-mat-limpar").onclick = ()=>{ st.mat.clear(); prBody.querySelectorAll(".pr-check input").forEach(i=> i.checked = false); prMatContador(); };
  prMatContador();
  // botões de opção: na linha rápida, clicar de novo desmarca; na variação, a escolha fica (volta-se por "Voltar ao padrão")
  prBody.querySelectorAll(".pr-op").forEach(b=> b.onclick = ()=>{
    const id = b.dataset.c, on = st.vals[id]===b.dataset.v;
    if(on && b.classList.contains("pr-vop")) return;
    prMuda(id, on ? "" : b.dataset.v);
  });
  prBody.querySelectorAll(".pr-rapido input[data-c]").forEach(i=> i.oninput = ()=>{ st.vals[i.dataset.c] = i.value; prAtualizaNota(); });
  // trechos clicáveis do texto (delegado: o texto é redesenhado a cada mudança)
  const tx = $("#pr-texto");
  tx.onclick = e=>{ const tk = e.target.closest(".pr-tk"); if(tk) prAtivaTrecho(tk); };
  tx.onkeydown = e=>{ const tk = e.target.closest(".pr-tk"); if(tk && (e.key==="Enter" || e.key===" ") && !e.ctrlKey && !e.metaKey){ e.preventDefault(); prAtivaTrecho(tk); } };
  $("#pr-mais").onclick = e=>{ const b = e.target.closest("[data-add]"); if(b) prAbrePop(b, b.dataset.add); };
  // menu: ↑ ↓ entre as opções, Esc fecha e volta ao trecho; clique fora fecha
  $("#pr-pop").onkeydown = e=>{
    if(e.key==="Escape"){ e.preventDefault(); e.stopPropagation(); prFechaPop(true); return; }
    if(e.key==="ArrowDown" || e.key==="ArrowUp"){
      const ops = [...$("#pr-pop").querySelectorAll(".pr-pop-op")], k = ops.indexOf(document.activeElement);
      if(k < 0) return;
      e.preventDefault(); ops[(k + (e.key==="ArrowDown" ? 1 : -1) + ops.length) % ops.length].focus();
    }
  };
  // editar texto: o registro vira texto livre (como a "edição livre" da receita); "Voltar aos campos" descarta
  $("#pr-editar").onclick = ()=>{
    prFechaPop(false);
    if(st.livre == null){ st.livre = prTexto(p); prAtualizaNota(); $("#pr-livre").focus(); }
    else { st.livre = null; prAtualizaNota(); $("#pr-editar").focus(); }
  };
  $("#pr-livre").oninput = e=>{ st.livre = e.target.value; e.target.style.height = "auto"; e.target.style.height = e.target.scrollHeight + 2 + "px"; };
  $("#pr-copiar").onclick = prCopiarNota;
  $("#pr-voltar").onclick = prVoltarPadrao;
  // teclado: Ctrl/Cmd+Enter copia de qualquer lugar da página; Enter num campo da linha rápida vai para o próximo
  pag.onkeydown = e=>{
    if(e.key!=="Enter") return;
    if(e.ctrlKey || e.metaKey){ e.preventDefault(); prCopiarNota(); return; }
    if(e.target.matches(".pr-rapido input[data-c]")){
      e.preventDefault();
      const all = [...$("#pr-rapido").querySelectorAll("input[data-c], .pr-op")];
      const camp = e.target.closest("[data-campo]");
      const prox = all.find(x=> !camp.contains(x) && (camp.compareDocumentPosition(x) & Node.DOCUMENT_POSITION_FOLLOWING));
      (prox || $("#pr-copiar")).focus();
    }
  };
  prBody.querySelectorAll("[data-calc]").forEach(a=> a.onclick = e=>{ e.preventDefault(); navigate("calculadoras", a.dataset.calc, "click"); });
  prAtualizaNota();
}
// clique fora do menu fecha
document.addEventListener("pointerdown", e=>{
  const pop = $("#pr-pop");
  if(!pop || pop.hidden || pop.contains(e.target) || (prPopAlvo && prPopAlvo.el.contains(e.target))) return;
  prFechaPop(false);
});

function prAbrir(id, how){
  const p = prProc(id);
  if(!p) return false;
  prAberto = p;
  prLista.querySelectorAll(".pr-item").forEach(b=>{ const on = b.dataset.id===id; b.classList.toggle("active", on); b.setAttribute("aria-pressed", String(on)); });
  prTitulo.textContent = prArea(p.area).nm;
  prBody.innerHTML = prPagina(p);
  prBind();
  prBody.scrollTop = 0;
  if(pageScrolls() && (how==="click" || how==="search" || how==="load")) scrollIntoPlace($("#col-proc"));
  if(how!=="route" && !pageScrolls()) $("#pr-h").focus({preventScroll: true});
  prObservarCopiar();
  return true;
}
function prFechar(){
  prAberto = null;
  prLista.querySelectorAll(".pr-item.active").forEach(b=>{ b.classList.remove("active"); b.setAttribute("aria-pressed", "false"); });
  prTitulo.textContent = "Procedimento";
  prBody.innerHTML = `<div class="empty"><div class="big" aria-hidden="true">🩺</div><div class="ttl">Escolha um procedimento</div>
    <div class="sub">O registro padrão pronto para colar no prontuário, e o passo a passo para fazer.</div></div>`;
  prObservarCopiar();
}

/* ---- celular: barra fixa com Copiar quando o Copiar do registro sai da tela (só na guia Registro) ---- */
let prObs = null, prCopiarVisivel = false;
function prBarraEstado(){
  const mostrar = !!prAberto && currentView==="procedimentos" && pageScrolls() && !prCopiarVisivel && prEst(prAberto).guia==="registro";
  prBarra.hidden = !mostrar;
  document.body.classList.toggle("pr-com-barra", mostrar);
}
// "na tela" = inteiro e fora do header grudado no topo (no celular o header cobre o alto da página)
function prObservarCopiar(){
  if(prObs){ prObs.disconnect(); prObs = null; }
  prCopiarVisivel = false;
  const n = $("#pr-copiar"), hdr = document.querySelector("header.top");
  if(n && "IntersectionObserver" in window){
    const topo = pageScrolls() && hdr ? hdr.offsetHeight : 0;
    prObs = new IntersectionObserver(es=>{ prCopiarVisivel = es[0].isIntersecting && es[0].intersectionRatio > 0.99; prBarraEstado(); },
      {threshold: [0, 1], rootMargin: `-${topo}px 0px 0px 0px`});
    prObs.observe(n);
  }
  prBarraEstado();
}
// o foco nunca fica escondido: nem atrás da barra (a página sobe) nem atrás do header grudado no topo (a página desce)
$("#col-proc").addEventListener("focusin", e=>{
  if(!pageScrolls()) return;
  const r = e.target.getBoundingClientRect(), hdr = document.querySelector("header.top");
  const alto = hdr ? hdr.getBoundingClientRect().bottom : 0;
  if(r.top < alto + 4){ window.scrollBy(0, r.top - alto - 12); return; }
  if(prBarra.hidden) return;
  const topo = prBarra.getBoundingClientRect().top;
  if(r.bottom > topo - 8) window.scrollBy(0, r.bottom - topo + 16);
});
$("#pr-barra-copiar").onclick = prCopiarNota;
window.addEventListener("resize", ()=>{ if(prAberto) prObservarCopiar(); else prBarraEstado(); prFechaPop(false); });
window.addEventListener("hashchange", ()=> setTimeout(prBarraEstado, 0));
$("#top-tabs").addEventListener("click", ()=> setTimeout(prBarraEstado, 0));
$("#pr-filtro").oninput = e=> prRenderLista(e.target.value);

/* ---- registro da aba ----
   rx:false = esta aba não usa a coluna da receita. */
prRenderLista();
prFechar();
registerView({
  key: "procedimentos", label: "Procedimentos", icon: "🩺",
  desc: "Passo a passo e a descrição do procedimento",
  cols: ["col-proc-lista", "col-proc"], layout: "lista", rx: false,
  itemId: () => prAberto ? prAberto.id : null,
  open: prAbrir,
  close: prFechar,
  search: () => PROCS.map(p=> ({id: p.id, ic: prArea(p.area).ic, title: p.nm, sub: `${prArea(p.area).nm} · ${p.sub}`, kw: p.kw}))
});
