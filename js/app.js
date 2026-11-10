/* app.js — abas do topo (geradas do registro VIEWS) e inicialização. Carregado por último. */
let currentView = VIEWS[0].key; // aba do topo aberta (key de uma view registrada)
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
    if(t.dataset.view===currentView) return;
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
    const on = t.dataset.view===currentView;
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
renderConds();
renderEscList();
renderRascunho();
syncRx();
onRoute("load");   // abre a aba / condição do endereço (#/prescricoes/itu); sem hash = Meu rascunho (a primeira aba)
