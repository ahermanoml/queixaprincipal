/* app.js — abas do topo (geradas do registro VIEWS) e inicialização. Carregado por último. */
let currentView = VIEWS[0].key; // aba do topo aberta (key de uma view registrada)
const topTabs = $("#top-tabs");

/* ---- abas do topo ----
   Uma aba por view registrada. Em telas estreitas (ou com muitas abas) a barra rola na horizontal,
   sem quebrar em duas linhas; a aba ativa é rolada para dentro da tela. */
function renderTabs(){
  topTabs.innerHTML = VIEWS.map(v=>
    `<button type="button" role="tab" class="top-tab" id="tab-${esc(v.key)}" data-view="${esc(v.key)}" aria-selected="false"${(v.cols||[]).length?` aria-controls="${esc(v.cols.join(" "))}"`:""}><span aria-hidden="true">${v.icon}</span> ${esc(v.label)}</button>`
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

/* ---- init ---- */
renderTabs();
renderConds();
renderEscList();
renderRascunho();
syncRx();
onRoute("load");   // abre a aba / condição do endereço (#/prescricoes/itu); sem hash = Prescrições sem condição
