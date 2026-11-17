/* views/guias.js — aba Guias: lista (#col-guia-lista) + guia aberto (#col-guia).
   Conteúdo em data/guias.js (GUIA_TIPOS, GUIA_ITENS): resumos das condições (tipo "condicao", ligados à condição de
   Prescrições pelo campo "cond"), roteiros de exame físico ("exame") e referências rápidas ("referencia").
   Cada seção tem o seu Copiar (texto puro, pronto para colar); "Copiar tudo" junta o guia inteiro; o "texto pronto" dos
   roteiros de exame (achados normais) vai como está. Tudo é rascunho de IA até o médico revisar (draft / revisado). */
const guLista = $("#gu-lista"), guBody = $("#gu-body"), guTitulo = $("#gu-titulo"), guFiltro = $("#gu-filtro");
let guAberto = null;

const guItem = id => GUIA_ITENS.find(g=> g.id===id) || null;
const guTipo = k => GUIA_TIPOS.find(t=> t.key===k) || {key: k, label: k, rotulo: k};
// condição de Prescrições ligada ao guia (para o atalho "Abrir prescrição" e o emoji da lista)
const guCond = g => g.cond && typeof DATA!=="undefined" ? DATA.find(c=> c.id===g.cond) || null : null;
// guia de uma condição de Prescrições (para o atalho "Resumo da condição" no painel do meio)
const guiaDaCond = id => GUIA_ITENS.find(g=> g.tipo==="condicao" && g.cond===id) || null;
const guTexto = g => [g.nm, g.sub, g.resumo, ...(g.secoes||[]).flatMap(s=> [s.t, ...(s.itens||[])]), ...(g.pronto||[])].join("\n");

/* ---- lista: Exame físico, Condições (alfabética, com o emoji da condição), Referências ---- */
function guListaHTML(filtro){
  const q = norm(filtro || "").trim().split(/\s+/).filter(Boolean);
  const bate = g => !q.length || q.every(t=> norm(g.nm + " " + (g.sub||"") + " " + (g.kw||"")).includes(t));
  let h = "", n = 0;
  GUIA_TIPOS.forEach(t=>{
    // condições em ordem alfabética; roteiros de exame e referências na ordem do arquivo (geral primeiro)
    const its = GUIA_ITENS.filter(g=> g.tipo===t.key && bate(g));
    if(t.key==="condicao") its.sort((a, b)=> a.nm.localeCompare(b.nm, "pt-BR"));
    if(!its.length) return;
    n += its.length;
    h += `<div class="gu-lgrp">${esc(t.label)} <span class="count">${its.length}</span></div>`;
    its.forEach(g=>{
      const c = guCond(g), ic = c ? esc(c.ic) : esc(g.ic || t.ic || "📄");
      h += `<button type="button" class="cond gu-row${guAberto && guAberto.id===g.id ? " active" : ""}" data-id="${esc(g.id)}"><span class="ic" aria-hidden="true">${ic}</span><span><span class="nm">${esc(g.nm)}</span><br><span class="sub">${esc(g.sub||"")}</span></span></button>`;
    });
  });
  return {h: h || `<div class="gu-nada">Nada encontrado para “${esc(filtro)}”.</div>`, n};
}
function renderGuLista(){
  const r = guListaHTML(guFiltro.value);
  guLista.innerHTML = r.h;
  $("#gu-count").textContent = GUIA_ITENS.length;
  guLista.querySelectorAll(".gu-row").forEach(b=> b.onclick = ()=>{ guAbrir(b.dataset.id); routeChanged(); guRevelar(); });
  guLista.querySelectorAll(".gu-row").forEach(b=> b.onkeydown = e=>{ if(e.key==="Enter"){ e.preventDefault(); b.click(); } });
}
guFiltro.addEventListener("input", renderGuLista);
// no celular a lista fica em cima: abrir um guia rola até ele
function guRevelar(){ if(pageScrolls()) scrollIntoPlace($("#col-guia"), 8); }

/* ---- texto para copiar ---- */
const guSecTexto = s => (s.t ? s.t.toLocaleUpperCase("pt-BR") + ":\n" : "") + (s.itens||[]).map(x=> "- " + x).join("\n");
function guTudo(g){
  const partes = [g.nm.toLocaleUpperCase("pt-BR") + (g.tipo==="condicao" ? " — RESUMO" : "")];
  if(g.resumo) partes.push(g.resumo);
  (g.secoes||[]).forEach(s=> partes.push(guSecTexto(s)));
  if(g.pronto && g.pronto.length) partes.push((g.prontoTitulo || "Texto pronto").toLocaleUpperCase("pt-BR") + ":\n" + g.pronto.join("\n"));
  return partes.join("\n\n");
}
async function guCopiar(txt, msg){
  const ok = await copyText(txt);
  toast(ok ? msg : "Não foi possível copiar", ok);
}

/* ---- guia aberto ---- */
function guPaginaHTML(g){
  const t = guTipo(g.tipo), c = guCond(g);
  const tag = g.draft ? `<span class="tag" title="Rascunho gerado por IA — revise antes de usar">rascunho</span>` : "";
  const rev = g.revisado ? `Revisado em ${esc(g.revisado.split("-").reverse().join("/"))}` : "Ainda não revisado";
  let h = `<div class="gu-head"><div class="cx-eyebrow">${esc(t.rotulo)}</div>
    <h3>${c ? `<span class="ic" aria-hidden="true">${esc(c.ic)}</span> ` : ""}${esc(g.nm)} ${tag}</h3>
    ${g.sub ? `<div class="gu-sub">${esc(g.sub)}</div>` : ""}
    <div class="gu-acoes"><button type="button" class="btn primary" id="gu-tudo"><span class="i i-copy" aria-hidden="true"></span> Copiar tudo</button>
    ${c ? `<a class="btn gu-rx" href="#/prescricoes/${esc(c.id)}"><span class="i" data-v="prescricoes" aria-hidden="true"></span> Abrir prescrição</a>` : ""}
    <span class="gu-rev">${rev}</span></div></div>`;
  if(g.resumo) h += `<p class="gu-resumo">${esc(g.resumo)}</p>`;
  if(g.pronto && g.pronto.length){
    h += `<section class="gu-sec gu-pronto"><div class="gu-sh"><h4>${esc(g.prontoTitulo || "Texto pronto")}</h4>
      <button type="button" class="btn gu-cp" data-pronto="1" aria-label="Copiar ${esc(g.prontoTitulo || "texto pronto")}"><span class="i i-copy" aria-hidden="true"></span><span class="gu-cpt">Copiar</span></button></div>
      <pre class="gu-pre">${esc(g.pronto.join("\n"))}</pre></section>`;
  }
  (g.secoes||[]).forEach((s, i)=>{
    h += `<section class="gu-sec${s.alerta ? " gu-alerta" : ""}${s.offlabel ? " gu-off" : ""}"><div class="gu-sh"><h4>${s.alerta ? `<span class="i i-alert" aria-hidden="true"></span> ` : ""}${esc(s.t)}</h4>
      <button type="button" class="btn gu-cp" data-s="${i}" aria-label="Copiar ${esc(s.t)}"><span class="i i-copy" aria-hidden="true"></span><span class="gu-cpt">Copiar</span></button></div>
      <ul>${(s.itens||[]).map(x=> `<li>${esc(x)}</li>`).join("")}</ul></section>`;
  });
  if(g.draft && g.pendencias && g.pendencias.length){
    h += `<details class="gu-caixa"><summary><span class="i i-clipboard-check" aria-hidden="true"></span> Para o revisor <span class="count">${g.pendencias.length}</span></summary>
      <ul>${g.pendencias.map(x=> `<li>${esc(x)}</li>`).join("")}</ul></details>`;
  }
  if(g.fontes && g.fontes.length){
    h += `<details class="gu-caixa"><summary><span class="i i-file" aria-hidden="true"></span> Fontes <span class="count">${g.fontes.length}</span></summary>
      <ul>${g.fontes.map(x=> `<li>${esc(x)}</li>`).join("")}</ul></details>`;
  }
  h += `<p class="gu-aviso"><span class="i i-alert" aria-hidden="true"></span> Ferramenta de apoio à decisão: confira com o protocolo do seu serviço. Não substitui o julgamento clínico.</p>`;
  return h;
}
function guAbrir(id){
  const g = guItem(id);
  if(!g) return false;
  guAberto = g;
  guTitulo.textContent = g.nm;
  guBody.innerHTML = `<div class="gu">${guPaginaHTML(g)}</div>`;
  guBody.scrollTop = 0;
  $("#gu-tudo").onclick = ()=> guCopiar(guTudo(g), "Guia inteiro copiado!");
  guBody.querySelectorAll(".gu-cp").forEach(b=> b.onclick = ()=>{
    if(b.dataset.pronto) guCopiar(g.pronto.join("\n"), "Texto pronto copiado!");
    else { const s = g.secoes[+b.dataset.s]; guCopiar(guSecTexto(s), `“${s.t}” copiado!`); }
  });
  guLista.querySelectorAll(".gu-row").forEach(b=> b.classList.toggle("active", b.dataset.id===id));
  return true;
}
function guFechar(){
  guAberto = null;
  guTitulo.textContent = "Guia";
  guBody.innerHTML = `<div class="empty"><div class="big" aria-hidden="true">👈</div><div class="ttl">Escolha um guia</div><div class="sub">Resumo da condição, roteiro de exame físico ou referência — cada parte copia em texto puro.</div></div>`;
  guLista.querySelectorAll(".gu-row.active").forEach(b=> b.classList.remove("active"));
}

renderGuLista();
guFechar();

/* ---- registro da aba ---- */
registerView({
  key: "guias", label: "Guias", icon: "📖",
  desc: "Resumo de cada condição e roteiros de exame físico",
  cols: ["col-guia-lista", "col-guia"], layout: "lista", rx: false,
  itemId: () => guAberto ? guAberto.id : null,
  open: (id, how)=>{ const ok = guAbrir(id); if(ok && how!=="route") guRevelar(); return ok; },
  close: guFechar,
  search: () => GUIA_ITENS.map(g=> ({id: g.id, title: g.nm, sub: guTipo(g.tipo).rotulo + (g.sub ? " · " + g.sub : ""), kw: g.kw || "", text: guTexto(g),
    ic: guCond(g) ? guCond(g).ic : undefined}))
});
