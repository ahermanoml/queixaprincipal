/* views/rascunho.js — aba Meu rascunho (#col-rascunho). */
/* ---- meu rascunho: todos os modelos do médico num texto só, sem separar por condição (copiado como está) ---- */
const rascDoc = $("#rasc-doc");
const rascGroups = () => [...new Set(MINHA.map(m=>m.grupo))];
// texto de "Copiar tudo": grupo em maiúsculas, título do modelo e suas linhas, com linha em branco entre eles
function rascText(){
  const out = [];
  rascGroups().forEach(g=>{
    out.push(g.toUpperCase());
    MINHA.forEach(m=>{ if(m.grupo===g) out.push(m.titulo + "\n" + m.linhas.join("\n")); });
  });
  return out.join("\n\n");
}
function renderRascunho(){
  let h = "";
  rascGroups().forEach(g=>{
    h += `<div class="rg">${esc(g)}</div>`;
    MINHA.forEach((m,i)=>{
      if(m.grupo!==g) return;
      // data-card = índice no MINHA: a busca única rola até o modelo e o destaca
      h += `<div class="rt" data-card="${i}">${esc(m.titulo)}</div>${m.nota?`<div class="rn" data-card="${i}">${esc(m.nota)}</div>`:""}<div class="rl" data-card="${i}">${esc(m.linhas.join("\n"))}</div>`;
    });
  });
  rascDoc.innerHTML = h;
}
// trecho selecionado dentro do texto do rascunho ("" se não houver)
function rascSelection(){
  const s = window.getSelection();
  if(!s || s.isCollapsed || !s.rangeCount || !rascDoc.contains(s.getRangeAt(0).commonAncestorContainer)) return "";
  return s.toString().replace(/^\s*\n/, "").replace(/\s+$/, "");
}
// "＋ Receita" leva só o trecho selecionado. A seleção é lida já no pointerdown, porque no celular o toque no botão pode desfazê-la.
let rascSel = "";
$("#rasc-send").addEventListener("pointerdown", ()=>{ rascSel = rascSelection(); });
$("#rasc-send").onclick = ()=>{
  const t = rascSelection() || rascSel;
  rascSel = "";
  if(!t){ toast("Selecione um trecho do texto para levar à receita", false); return; }
  sendToRx(t);
};
$("#rasc-copy").onclick = async ()=>{
  const ok = await copyText(rascText());
  toast(ok ? "Rascunho inteiro copiado!" : "Não foi possível copiar", ok);
};


/* ---- busca única: rola até um modelo e o destaca por alguns segundos ---- */
let rascHlT;
function openCard(id){
  const i = Number(id);
  if(!Number.isInteger(i) || String(i)!==String(id) || !MINHA[i]) return false;
  rascDoc.querySelectorAll(".hl").forEach(e=> e.classList.remove("hl"));
  const els = rascDoc.querySelectorAll(`[data-card="${i}"]`);
  void rascDoc.offsetWidth;   // reinicia o destaque se o mesmo modelo for escolhido de novo
  els.forEach(e=> e.classList.add("hl"));
  scrollIntoPlace(els[0], 16);
  clearTimeout(rascHlT);
  rascHlT = setTimeout(()=> els.forEach(e=> e.classList.remove("hl")), 2400);
  return true;
}

/* ---- registro da aba ----
   Sem itemId: os modelos não têm endereço próprio (o endereço fica #/rascunho); a busca abre com open(). */
registerView({
  key: "rascunho", label: "Meu rascunho", icon: "⭐",
  cols: ["col-rascunho"], layout: "texto",
  open: openCard,
  search: () => MINHA.map((m,i)=> ({id: String(i), title: m.titulo, sub: m.grupo, text: m.linhas.join("\n")}))
});
