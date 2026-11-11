/* app.js — abas do topo (geradas do registro VIEWS) e inicialização. Carregado por último. */
let currentView = VIEWS[0].key; // aba do topo aberta (key de uma view registrada)
let naInicio = false;           // true = tela inicial (#/inicio): os quadrados grandes no lugar das abas
const topTabs = $("#top-tabs");

/* ---- abas do topo ----
   Uma aba por view registrada. Em telas estreitas (ou com muitas abas) a barra rola na horizontal,
   sem quebrar em duas linhas; a aba ativa é rolada para dentro da tela. */
function renderTabs(){
  topTabs.innerHTML = VIEWS.map(v=>
    `<button type="button" role="tab" class="top-tab" id="tab-${esc(v.key)}" data-view="${esc(v.key)}" aria-selected="false"${(v.cols||[]).length?` aria-controls="${esc(v.cols.join(" "))}"`:""}>${viewIcon(v)} ${esc(v.label)}</button>`
  ).join("");
  // trocar de aba grava o endereço (#/aba ou #/aba/<item aberto nela>), então voltar/avançar funcionam
  topTabs.querySelectorAll(".top-tab").forEach(t=> t.onclick = ()=>{
    if(t.dataset.view===currentView && !naInicio) return;
    const v = viewOf(t.dataset.view);
    navigate(v.key, v.itemId ? v.itemId() : null, "tab");   // a aba volta com o item que estava aberto nela
  });
  VIEWS.forEach(v=> (v.cols||[]).forEach(id=>{
    const col = document.getElementById(id);
    if(col){ col.setAttribute("role", "tabpanel"); col.setAttribute("aria-labelledby", "tab-" + v.key); }
  }));
  markTabs();
}
function markTabs(){
  topTabs.querySelectorAll(".top-tab").forEach(t=>{
    const on = !naInicio && t.dataset.view===currentView;
    t.classList.toggle("active", on);
    t.setAttribute("aria-selected", on ? "true" : "false");
  });
  tabsOverflow();
}
// rola a barra de abas (só ela, não a página) até a aba ativa aparecer inteira
function scrollActiveTab(){
  const t = topTabs.querySelector(".top-tab.active");
  if(!t) return;
  const l = t.offsetLeft - topTabs.offsetLeft, r = l + t.offsetWidth, pad = 24;
  if(l < topTabs.scrollLeft + pad) topTabs.scrollLeft = Math.max(0, l - pad);
  else if(r > topTabs.scrollLeft + topTabs.clientWidth - pad) topTabs.scrollLeft = r - topTabs.clientWidth + pad;
}
// esmaece a borda da barra quando há abas escondidas daquele lado
function tabsOverflow(){
  scrollActiveTab();
  fadeTabs();
}
function fadeTabs(){
  const max = topTabs.scrollWidth - topTabs.clientWidth;
  topTabs.classList.toggle("more-l", topTabs.scrollLeft > 1);
  topTabs.classList.toggle("more-r", topTabs.scrollLeft < max - 1);
}
topTabs.addEventListener("scroll", fadeTabs, {passive:true});
// mouse sem rolagem horizontal: a roda vertical rola a barra quando ela transborda
topTabs.addEventListener("wheel", e=>{
  if(topTabs.scrollWidth <= topTabs.clientWidth || Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
  topTabs.scrollLeft += e.deltaY;
  e.preventDefault();
}, {passive:false});
window.addEventListener("resize", tabsOverflow);

/* troca a aba do topo: body[data-view] / body[data-layout] / body[data-rx] para o CSS e `hidden` nas colunas das outras abas.
   A receita (#col-rx) é a mesma em todas as abas, e o estado de cada aba (condição aberta, modo, peso) fica. */
function showView(key){
  const v = viewOf(key) || VIEWS[0];
  currentView = v.key;
  naInicio = false;
  document.body.dataset.inicio = "";
  document.body.dataset.view = v.key;
  document.body.dataset.layout = v.layout || "lista";
  const mine = v.cols || [];
  VIEWS.forEach(x=> (x.cols||[]).forEach(id=>{
    const col = document.getElementById(id);
    if(col) col.hidden = !mine.includes(id);
  }));
  // rx: false = a aba não mostra a receita; ela só fica escondida (conteúdo, peso e condição continuam)
  document.body.dataset.rx = v.rx===false ? "off" : "on";
  $("#col-rx").hidden = v.rx===false;
  markTabs();
  window.scrollTo(0, 0);   // no celular a página rola inteira: começa a aba nova do topo
}

/* ---- tela inicial (#/inicio) ----
   Um quadrado grande e colorido por aba registrada (rótulo, ícone e o campo desc da view). Ao escolher um, os quadrados
   "sobem" e viram as abas do topo (animação com cópias fixas que voam de cada quadrado até a sua aba). */
function renderInicio(){
  $("#inicio-grade").innerHTML = VIEWS.map((v, i)=>
    `<button type="button" class="tile" data-v="${esc(v.key)}" style="--n:${i}"><span class="tile-ic">${viewIcon(v)}</span>
      <span class="tile-t">${esc(v.label)}</span>${v.desc ? `<span class="tile-d">${esc(v.desc)}</span>` : ""}
      <span class="tile-seta"><span class="i i-arrow-right" aria-hidden="true"></span></span></button>`).join("");
  document.querySelectorAll("#inicio-grade .tile").forEach(t=> t.onclick = ()=> inicioAbrir(t.dataset.view || t.dataset.v));
}
function inicioOla(){
  const n = typeof contaNomeAtual==="function" ? contaNomeAtual() : null, h = new Date().getHours();
  const sd = h < 5 ? "Bom plantão" : h < 12 ? "Bom dia" : h < 18 ? "Boa tarde" : "Boa noite";
  $("#inicio-ola").innerHTML = `<h2>${sd}${n ? `, <span>${esc(n)}</span>` : ""}.</h2><p>O que você precisa agora?</p>`;
}
function showInicio(){
  naInicio = true;
  document.body.dataset.inicio = "1";
  VIEWS.forEach(x=> (x.cols||[]).forEach(id=>{ const c = document.getElementById(id); if(c) c.hidden = true; }));
  $("#col-rx").hidden = true;
  inicioOla();
  markTabs();
  window.scrollTo(0, 0);
}
function inicioAbrir(key){
  const v = viewOf(key);
  if(!v) return;
  const tiles = [...document.querySelectorAll("#inicio-grade .tile")].map(t=> ({t, r: t.getBoundingClientRect()}));
  navigate(v.key, v.itemId ? v.itemId() : null, "tab");
  const calmo = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  if(calmo || !document.body.animate) return;
  document.body.classList.add("voando");
  let vivos = 0;
  tiles.forEach(({t, r}, i)=>{
    const aba = document.getElementById("tab-" + t.dataset.v);
    if(!aba || !r.width) return;
    const a = aba.getBoundingClientRect(), g = document.createElement("div");
    g.className = "tile-voo"; g.dataset.v = t.dataset.v;
    g.innerHTML = `<span class="tile-ic">${t.querySelector(".tile-ic").innerHTML}</span>`;
    g.style.cssText = `left:${r.left}px;top:${r.top}px;width:${r.width}px;height:${r.height}px`;
    document.body.appendChild(g); vivos++;
    const anim = g.animate([
      {left: r.left + "px", top: r.top + "px", width: r.width + "px", height: r.height + "px", borderRadius: "22px", opacity: 1},
      {left: a.left + "px", top: a.top + "px", width: a.width + "px", height: a.height + "px", borderRadius: "12px", opacity: t.dataset.v===v.key ? .9 : .55, offset: .85},
      {left: a.left + "px", top: a.top + "px", width: a.width + "px", height: a.height + "px", borderRadius: "12px", opacity: 0}
    ], {duration: 460, delay: i * 18, easing: "cubic-bezier(.3,.7,.2,1)", fill: "both"});
    const fim = ()=>{ g.remove(); if(--vivos===0) document.body.classList.remove("voando"); };
    anim.onfinish = fim; anim.oncancel = fim;
  });
  if(!vivos) document.body.classList.remove("voando");
}
$("#marca").addEventListener("click", e=>{
  if(document.documentElement.dataset.tela!=="app") return;
  e.preventDefault();
  if(!naInicio){ location.hash = "#/inicio"; }
});

/* ---- tema claro / escuro ----
   html[data-theme] = escolha do médico ("light" | "dark"), guardada em localStorage "qp-tema"; sem escolha, segue o sistema.
   html[data-tema-efetivo] = o tema em uso (o CSS troca o ícone do botão por ele). O <script> do <head> já aplicou a
   escolha antes da primeira pintura; aqui só o botão e a troca do sistema enquanto a página está aberta. */
const temaBtn = $("#tema"), temaMq = window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : null;
function temaEfetivo(){
  const t = document.documentElement.getAttribute("data-theme");
  return t==="dark" || t==="light" ? t : (temaMq && temaMq.matches ? "dark" : "light");
}
function temaAplicar(){
  const e = temaEfetivo(), lbl = e==="dark" ? "Tema claro" : "Tema escuro";
  document.documentElement.setAttribute("data-tema-efetivo", e);
  temaBtn.setAttribute("aria-pressed", e==="dark" ? "true" : "false");
  temaBtn.setAttribute("aria-label", lbl); temaBtn.title = lbl;
}
temaBtn.onclick = ()=>{
  const novo = temaEfetivo()==="dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", novo);
  try{ localStorage.setItem("qp-tema", novo); }catch(e){ /* sem armazenamento: vale só nesta visita */ }
  temaAplicar();
};
if(temaMq){
  const mudou = ()=> temaAplicar();
  if(temaMq.addEventListener) temaMq.addEventListener("change", mudou); else if(temaMq.addListener) temaMq.addListener(mudou);
}
temaAplicar();

/* ---- init ---- */
renderTabs();
renderInicio();
renderConds();
renderEscList();
renderRascunho();
syncRx();
contaIniciar();
onRoute("load");   // abre a aba / condição do endereço (#/prescricoes/itu); sem hash = oferta ou início (js/conta.js)
