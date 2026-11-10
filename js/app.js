/* app.js — abas do topo e inicialização. Carregado por último. */
let currentView = "padrao"; // aba do topo: "padrao" (prescritor) | "rascunho" (todos os modelos do médico num texto só)

/* ---- abas do topo: Padrão (prescritor) | Meu rascunho ----
   O CSS usa body[data-view] para trocar as colunas; a receita (#col-rx) é a mesma nas duas abas. */
function showView(v){
  currentView = v;
  document.body.dataset.view = v;
  document.querySelectorAll(".top-tab").forEach(t=>{
    const on = t.dataset.view===v;
    t.classList.toggle("active", on);
    t.setAttribute("aria-selected", on ? "true" : "false");
  });
  window.scrollTo(0, 0);   // no celular a página rola inteira: começa a aba nova do topo
}
document.querySelectorAll(".top-tab").forEach(t=> t.onclick = ()=>{ if(t.dataset.view!==currentView) showView(t.dataset.view); });

/* ---- init ---- */
renderConds();
renderRascunho();
syncRx();
