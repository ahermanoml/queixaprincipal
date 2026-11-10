/* views/procedimentos.js — aba Procedimentos: lista por área (#col-proc-lista) + procedimento aberto (#col-proc).
   Conteúdo em data/procedimentos.js (PROC_AREAS, PROC_CAMPOS, PROCS). O "Registro para o prontuário" é montado aqui:
   prTexto(p, vals) troca {id} pelo valor (vazio → ____) e apaga as linhas cujo {id?} ficou vazio. */
const prLista = $("#pr-lista"), prBody = $("#pr-body"), prTitulo = $("#pr-titulo"), prBarra = $("#pr-barra");
const PR_LACUNA = "____";
const PR_SECOES = [["indicacoes", "Indicações"], ["contra", "Contraindicações"], ["material", "Material"], ["preparo", "Preparo"],
  ["tecnica", "Técnica"], ["depois", "Depois"], ["complicacoes", "Complicações"]];
let prAberto = null;          // procedimento aberto
const prEstado = {};          // por procedimento: {vals: {campo: texto}, mat: Set(índices marcados)} — dura a sessão

/* ---- dados ---- */
const prProc = id => PROCS.find(p=> p.id===id) || null;
const prArea = k => PROC_AREAS.find(a=> a.key===k);
// campos do registro já resolvidos (os referidos por id vêm de PROC_CAMPOS)
const prCampos = p => p.registro.campos.map(c=> typeof c==="string" ? {id: c, ...PROC_CAMPOS[c]} : c);
function prEst(p){ return prEstado[p.id] || (prEstado[p.id] = {vals: {}, mat: new Set()}); }
const prVal = (p, id) => String(prEst(p).vals[id] || "").trim();

/* ---- texto do registro (determinístico: mesmo valores → mesmo texto) ----
   {id}: valor em maiúsculas, ou ____ se vazio. {id?}: opcional — se vazio, a linha inteira sai. */
function prTexto(p, vals){
  const v = id => String((vals || prEst(p).vals)[id] || "").trim().toLocaleUpperCase("pt-BR");
  const out = [];
  p.registro.modelo.forEach(l=>{
    const opc = [...l.matchAll(/\{([a-z_]+)\?\}/g)].map(m=> m[1]);
    if(opc.some(id=> !v(id))) return;
    out.push(l.replace(/\{([a-z_]+)(\?)?\}/g, (_, id)=> v(id) || PR_LACUNA));
  });
  return out.join("\n");
}
// campos obrigatórios ainda vazios
const prFaltam = p => prCampos(p).filter(c=> !c.opcional && !prVal(p, c.id));

/* ---- lista ---- */
function prBuscaTexto(p){ return [p.nm, p.sub, p.kw, prArea(p.area).nm].join(" "); }
function prRenderLista(filtro=""){
  const f = norm(filtro.trim());
  let h = "", n = 0;
  PROC_AREAS.forEach(a=>{
    const ps = PROCS.filter(p=> p.area===a.key && (!f || norm(prBuscaTexto(p)).includes(f)));
    if(!ps.length) return;
    h += `<div class="pr-gh"><span aria-hidden="true">${a.ic}</span> ${esc(a.nm)}</div>`;
    ps.forEach(p=>{
      n++;
      h += `<button type="button" class="pr-item${prAberto===p ? " active" : ""}" data-id="${esc(p.id)}" aria-pressed="${prAberto===p}">
        <span class="nm">${esc(p.nm)}</span><span class="sub">${esc(p.sub)}</span></button>`;
    });
  });
  prLista.innerHTML = h || `<div class="rx-empty">Nada encontrado.</div>`;
  $("#pr-count").textContent = f ? n : PROCS.length;
  prLista.querySelectorAll(".pr-item").forEach(b=> b.onclick = ()=>{ prAbrir(b.dataset.id, "click"); routeChanged(); });
}

/* ---- página do procedimento ---- */
const prLi = arr => arr.map(x=> `<li>${esc(x)}</li>`).join("");
function prSecao(key, titulo, corpo, extra=""){
  return `<section class="pr-sec pr-${key}" id="pr-s-${key}" aria-labelledby="pr-h-${key}"><h4 id="pr-h-${key}">${titulo}${extra}</h4>${corpo}</section>`;
}
function prTecnica(p){
  return `<ol class="pr-passos">${p.tecnica.map(s=>{
    const o = typeof s==="string" ? {t: s} : s;
    return `<li><span class="t">${esc(o.t)}</span>${o.cuidado ? `<span class="pr-call cuidado"><b>Cuidado</b> ${esc(o.cuidado)}</span>` : ""}${o.dica ? `<span class="pr-call dica"><b>Dica</b> ${esc(o.dica)}</span>` : ""}</li>`;
  }).join("")}</ol>`;
}
function prMaterial(p){
  const st = prEst(p);
  return `<div class="pr-mat-tools"><span class="pr-mat-n" id="pr-mat-n" aria-live="polite"></span>
      <button type="button" class="btn" id="pr-mat-copiar"><span aria-hidden="true">📋</span> Copiar material</button>
      <button type="button" class="btn ghostb" id="pr-mat-limpar">Desmarcar</button></div>
    <ul class="pr-check">${p.material.map((m, i)=> `<li><label><input type="checkbox" data-m="${i}"${st.mat.has(i) ? " checked" : ""}> <span>${esc(m)}</span></label></li>`).join("")}</ul>`;
}
// rótulo do botão de opção: o valor (em maiúsculas, vai assim para o texto) em caixa de frase, sem estragar siglas
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
function prCampoHTML(p, c){
  const v = prEst(p).vals[c.id] || "", lid = `pr-c-${c.id}`;
  if(c.tipo==="opcoes"){
    return `<div class="pr-campo" data-campo="${c.id}"><span class="lbl" id="${lid}">${esc(c.rotulo)}</span>
      <div class="pr-opcoes" role="group" aria-labelledby="${lid}">${c.opcoes.map(o=>
        `<button type="button" class="pr-op" data-c="${c.id}" data-v="${esc(o)}" aria-pressed="${o===v}">${esc(prRotulo(o))}</button>`).join("")}</div></div>`;
  }
  return `<div class="pr-campo" data-campo="${c.id}"><label class="lbl" for="${lid}">${esc(c.rotulo)}${c.opcional ? " <small>(opcional)</small>" : ""}</label>
    <span class="pr-in"><input id="${lid}" data-c="${c.id}" type="text" autocomplete="off"${c.tipo==="num" ? ' inputmode="decimal"' : ""} placeholder="${esc(c.dica || "")}" value="${esc(v)}">${c.un ? `<span class="un">${esc(c.un)}</span>` : ""}</span></div>`;
}
function prNotaHTML(p){
  return `<aside class="pr-nota" id="pr-nota" aria-labelledby="pr-nota-h">
    <div class="pr-nota-head"><h4 id="pr-nota-h"><span aria-hidden="true">📝</span> Registro para o prontuário</h4>
      <span class="pr-faltam" id="pr-faltam" aria-live="polite"></span></div>
    <div class="pr-nota-acts"><button type="button" class="btn primary" id="pr-copiar"><span aria-hidden="true">📋</span> Copiar registro</button>
      <button type="button" class="btn ghostb" id="pr-limpar">Limpar</button></div>
    <pre class="pr-texto" id="pr-texto" aria-label="Texto do registro"></pre>
    <div class="pr-campos">${prCampos(p).map(c=> prCampoHTML(p, c)).join("")}
      <div class="pr-fim"><button type="button" class="btn primary" id="pr-copiar2"><span aria-hidden="true">📋</span> Copiar registro</button>
        <span class="pr-atalho">Ctrl+Enter copia de qualquer campo</span></div></div>
  </aside>`;
}
function prPagina(p){
  const a = prArea(p.area);
  const calc = (p.calc || []).length ? `<div class="pr-calc"><span class="lbl">Doses:</span>${p.calc.map(([id, t])=>
    `<a class="cx-link" href="#/calculadoras/${esc(id)}" data-calc="${esc(id)}">${esc(t)} <span aria-hidden="true">→</span></a>`).join("")}</div>` : "";
  const contra = `<div class="pr-ci"><div><b class="abs">Absolutas</b><ul>${prLi(p.contra.absolutas)}</ul></div>
    <div><b class="rel">Relativas</b><ul>${prLi(p.contra.relativas)}</ul></div></div>`;
  return `<div class="pr-wrap"><article class="pr-main">
    <div class="pr-head"><div class="cx-eyebrow"><span aria-hidden="true">${a.ic}</span> ${esc(a.nm)}</div>
      <h3 id="pr-h" tabindex="-1">${esc(p.nm)} <span class="cx-tag" title="Conteúdo gerado por IA, ainda não revisado pelo médico">rascunho</span></h3>
      <div class="pr-sub">${esc(p.sub)}</div>
      <div class="pr-acoes"><button type="button" class="btn primary" id="pr-ir-nota"><span aria-hidden="true">📝</span> Registro para o prontuário</button>${calc}</div>
      <nav class="pr-nav" aria-label="Seções">${PR_SECOES.map(([k, t])=> `<a href="#pr-s-${k}" data-sec="${k}">${t}</a>`).join("")}</nav></div>
    ${p.draft && (p.pendencias || []).length ? `<details class="pr-revisor"><summary><span aria-hidden="true">🔎</span> Para o revisor <small>${p.pendencias.length} ${p.pendencias.length>1 ? "pontos a decidir ou conferir" : "ponto a decidir ou conferir"}</small></summary>
      <ul>${prLi(p.pendencias)}</ul></details>` : ""}
    ${prSecao("indicacoes", "Indicações", `<ul>${prLi(p.indicacoes)}</ul>`)}
    ${prSecao("contra", "Contraindicações", contra)}
    ${prSecao("material", "Material", prMaterial(p))}
    ${prSecao("preparo", "Preparo", `<ul>${prLi(p.preparo)}</ul>`)}
    ${prSecao("tecnica", "Técnica passo a passo", prTecnica(p))}
    ${prSecao("depois", "Confirmação e cuidados depois", `<ul>${prLi(p.depois)}</ul>`)}
    ${prSecao("complicacoes", "Complicações", `<ul class="pr-tags">${prLi(p.complicacoes)}</ul>`)}
    <div class="pr-fontes"><b>Fontes</b><ul>${prLi(p.fontes)}</ul>
      <p class="pr-rev">${p.revisado ? `Revisado em ${esc(p.revisado)}` : "Ainda não revisado pelo médico responsável."}</p></div>
  </article>${prNotaHTML(p)}</div>`;
}

/* ---- ações ---- */
function prAtualizaNota(){
  const p = prAberto; if(!p) return;
  const txt = prTexto(p), falta = prFaltam(p).length;
  $("#pr-texto").innerHTML = esc(txt).split(PR_LACUNA).join(`<mark>${PR_LACUNA}</mark>`);
  const f = $("#pr-faltam");
  f.textContent = falta ? `faltam ${falta} ${falta>1 ? "campos" : "campo"}` : "completo";
  f.className = "pr-faltam" + (falta ? "" : " ok");
  const b = $("#pr-barra-n"); if(b) b.textContent = falta ? `faltam ${falta}` : "completo";
}
async function prCopiarNota(){
  const p = prAberto; if(!p) return;
  const falta = prFaltam(p).length;
  const ok = await copyText(prTexto(p));
  if(!ok){ toast("Não foi possível copiar", false); return; }
  toast(falta ? `Registro copiado — ${falta} ${falta>1 ? "campos" : "campo"} em branco (____)` : "Registro copiado!", !falta);
}
function prMatContador(){
  const p = prAberto, n = prEst(p).mat.size;
  $("#pr-mat-n").textContent = `${n}/${p.material.length} separados`;
}
function prBind(){
  const p = prAberto, st = prEst(p);
  // checklist do material
  prBody.querySelectorAll(".pr-check input").forEach(i=> i.onchange = ()=>{ i.checked ? st.mat.add(+i.dataset.m) : st.mat.delete(+i.dataset.m); prMatContador(); });
  $("#pr-mat-copiar").onclick = async ()=>{
    const ok = await copyText(`MATERIAL — ${p.nm.toLocaleUpperCase("pt-BR")}\n` + p.material.map(m=> "- " + m).join("\n"));
    toast(ok ? "Material copiado!" : "Não foi possível copiar", ok);
  };
  $("#pr-mat-limpar").onclick = ()=>{ st.mat.clear(); prBody.querySelectorAll(".pr-check input").forEach(i=> i.checked = false); prMatContador(); };
  prMatContador();
  // registro: opções (clicar de novo desmarca) e campos de texto
  prBody.querySelectorAll(".pr-op").forEach(b=> b.onclick = ()=>{
    const id = b.dataset.c, on = st.vals[id]===b.dataset.v;
    st.vals[id] = on ? "" : b.dataset.v;
    prBody.querySelectorAll(`.pr-op[data-c="${id}"]`).forEach(x=> x.setAttribute("aria-pressed", String(!on && x===b)));
    prAtualizaNota();
  });
  prBody.querySelectorAll(".pr-campos input").forEach(i=> i.oninput = ()=>{ st.vals[i.dataset.c] = i.value; prAtualizaNota(); });
  $("#pr-copiar").onclick = prCopiarNota;
  $("#pr-copiar2").onclick = prCopiarNota;
  // teclado no registro: Ctrl/Cmd+Enter copia; Enter num campo de texto vai para o próximo campo
  $("#pr-nota").onkeydown = e=>{
    if(e.key!=="Enter") return;
    if(e.ctrlKey || e.metaKey){ e.preventDefault(); prCopiarNota(); return; }
    if(e.target.matches(".pr-campos input")){
      e.preventDefault();
      const all = [...prBody.querySelectorAll(".pr-campos input, .pr-campos .pr-op")];
      const camp = e.target.closest(".pr-campo");
      const prox = all.find(x=> !camp.contains(x) && (camp.compareDocumentPosition(x) & Node.DOCUMENT_POSITION_FOLLOWING));
      (prox || $("#pr-copiar")).focus();
    }
  };
  $("#pr-limpar").onclick = ()=>{
    st.vals = {};
    prBody.querySelectorAll(".pr-op").forEach(x=> x.setAttribute("aria-pressed", "false"));
    prBody.querySelectorAll(".pr-campos input").forEach(i=> i.value = "");
    prAtualizaNota(); toast("Registro limpo");
  };
  $("#pr-ir-nota").onclick = prIrNota;
  prBody.querySelectorAll("[data-sec]").forEach(a=> a.onclick = e=>{ e.preventDefault(); const s = $("#pr-s-" + a.dataset.sec); scrollIntoPlace(s, 8); });
  prBody.querySelectorAll("[data-calc]").forEach(a=> a.onclick = e=>{ e.preventDefault(); navigate("calculadoras", a.dataset.calc, "click"); });
  prAtualizaNota();
}
// leva ao registro: o topo do registro (título, Copiar, texto) fica à vista e o foco vai para o 1º campo vazio
// (coluna ao lado: os campos rolam por dentro do registro; registro embaixo: se o 1º vazio não couber na tela, vai o 1º campo)
function prIrNota(){
  const p = prAberto; if(!p) return;
  const nota = $("#pr-nota");
  const campoEl = c => prBody.querySelector(`[data-campo="${c.id}"] input, [data-campo="${c.id}"] .pr-op`);
  const alvo = prFaltam(p)[0] || prCampos(p)[0];
  if(prNotaLado()){
    const el = campoEl(alvo);
    el.focus({preventScroll: true});
    el.closest(".pr-campo").scrollIntoView({block: "nearest"});
    return;
  }
  scrollIntoPlace(nota, 8);
  const vis = el => { const r = el.getBoundingClientRect(), b = $("#pr-barra"); const fundo = b.hidden ? innerHeight : b.getBoundingClientRect().top;
    const sc = pageScrolls() ? {top: 0, bottom: fundo} : prBody.getBoundingClientRect(); return r.top >= sc.top && r.bottom <= Math.min(sc.bottom, fundo); };
  const el = campoEl(alvo);
  (vis(el) ? el : campoEl(prCampos(p)[0])).focus({preventScroll: true});
}
// o registro está na coluna ao lado (coluna larga) ou embaixo do texto?
function prNotaLado(){ const n = $("#pr-nota"); return !!n && getComputedStyle(n).position==="sticky"; }   // coluna larga (container query)

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
  prObservarNota();
  return true;
}
function prFechar(){
  prAberto = null;
  prLista.querySelectorAll(".pr-item.active").forEach(b=>{ b.classList.remove("active"); b.setAttribute("aria-pressed", "false"); });
  prTitulo.textContent = "Procedimento";
  prBody.innerHTML = `<div class="empty"><div class="big" aria-hidden="true">🩺</div><div class="ttl">Escolha um procedimento</div>
    <div class="sub">Passo a passo, material e o registro pronto para colar no prontuário.</div></div>`;
  prObservarNota();
}

/* ---- celular: barra fixa com atalho para o registro e Copiar; some quando o registro está na tela ---- */
let prObs = null, prNotaVisivel = false;
function prBarraEstado(){
  const mostrar = !!prAberto && currentView==="procedimentos" && pageScrolls() && !prNotaVisivel;
  prBarra.hidden = !mostrar;
  document.body.classList.toggle("pr-com-barra", mostrar);
}
function prObservarNota(){
  if(prObs){ prObs.disconnect(); prObs = null; }
  prNotaVisivel = false;
  const n = $("#pr-nota");
  if(n && "IntersectionObserver" in window){
    prObs = new IntersectionObserver(es=>{ prNotaVisivel = es[0].isIntersecting; prBarraEstado(); }, {threshold: 0});
    prObs.observe(n);
  }
  prBarraEstado();
}
// o foco nunca fica escondido atrás da barra: se o campo/botão focado cai embaixo dela, a página sobe
$("#col-proc").addEventListener("focusin", e=>{
  if(prBarra.hidden) return;
  const r = e.target.getBoundingClientRect(), topo = prBarra.getBoundingClientRect().top;
  if(r.bottom > topo - 8) window.scrollBy(0, r.bottom - topo + 16);
});
$("#pr-barra-ir").onclick = prIrNota;
$("#pr-barra-copiar").onclick = prCopiarNota;
window.addEventListener("resize", prBarraEstado);
window.addEventListener("hashchange", ()=> setTimeout(prBarraEstado, 0));
$("#top-tabs").addEventListener("click", ()=> setTimeout(prBarraEstado, 0));
$("#pr-filtro").oninput = e=> prRenderLista(e.target.value);

/* ---- registro da aba ----
   rx:false = esta aba não usa a coluna da receita (a opção chega com a aba Escores; sem ela, a receita continua visível
   e o layout funciona dos dois jeitos). */
prRenderLista();
prFechar();
registerView({
  key: "procedimentos", label: "Procedimentos", icon: "🩺",
  cols: ["col-proc-lista", "col-proc"], layout: "lista", rx: false,
  itemId: () => prAberto ? prAberto.id : null,
  open: prAbrir,
  close: prFechar,
  search: () => PROCS.map(p=> ({id: p.id, ic: prArea(p.area).ic, title: p.nm, sub: `${prArea(p.area).nm} · ${p.sub}`, kw: p.kw}))
});
