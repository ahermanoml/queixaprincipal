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
    MINHA.forEach(m=>{
      if(m.grupo!==g) return;
      h += `<div class="rt">${esc(m.titulo)}</div>${m.nota?`<div class="rn">${esc(m.nota)}</div>`:""}<div class="rl">${esc(m.linhas.join("\n"))}</div>`;
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

