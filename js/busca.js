/* busca.js — busca única no header: procura em tudo o que as abas registradas expõem (campo search() de cada view).
   Atalhos: "/" (fora de campos de texto) e Ctrl/Cmd+K. Teclado: ↑ ↓ Enter Esc. Padrão ARIA combobox + listbox.
   Sem diferenciar maiúsculas nem acentos. Resultados agrupados por aba, na ordem do registro.
   Até 820px de largura o campo vira um botão (lupa) que abre a busca por cima do título. */
const busca = $("#busca"), buscaInput = $("#busca-input"), buscaPop = $("#busca-pop"),
      buscaList = $("#busca-list"), buscaVazio = $("#busca-vazio"), buscaStatus = $("#busca-status"),
      buscaAbrir = $("#busca-abrir");
let buscaIdx = null;     // [{v, items:[{id, title, sub, kw, text, ic, nt, ns, nx}]}] — montado na primeira busca
let buscaRes = [];       // resultados na ordem mostrada: [{v, e}]
let buscaAtivo = -1;     // índice em buscaRes da opção ativa (-1 = nenhuma)

function buscaIndex(){
  if(!buscaIdx) buscaIdx = VIEWS.filter(v=> v.search).map(v=> ({v, items: v.search().map(e=> ({...e,
    nt: norm(e.title), ns: norm(e.sub||""), nx: norm((e.kw||"") + "\n" + (e.text||""))}))}));
  return buscaIdx;
}
const buscaToks = q => norm(q).trim().split(/\s+/).filter(Boolean);
// todas as palavras digitadas precisam aparecer (título, subtítulo, palavras-chave ou texto); o título pesa mais na ordem
function buscaFind(q){
  const toks = buscaToks(q);
  if(!toks.length) return [];
  // palavra que começa com o termo (ex.: "dor" em "Dor lombar", não em "adormecimento")
  const wordStart = (s, t) => new RegExp("(^|[^a-z0-9])" + t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).test(s);
  return buscaIndex().map(({v, items})=>{
    const hits = [];
    items.forEach((e, order)=>{
      const all = e.nt + " " + e.ns + " " + e.nx;
      if(!toks.every(t=> all.includes(t))) return;
      const score = e.nt.startsWith(toks[0]) ? 0
        : toks.every(t=> wordStart(e.nt, t)) ? 1
        : toks.every(t=> e.nt.includes(t)) ? 2
        : toks.every(t=> (e.nt + " " + e.ns).includes(t)) ? 3 : 4;
      hits.push({e, score, order});
    });
    hits.sort((a, b)=> a.score - b.score || a.order - b.order);
    return {v, hits: hits.map(h=> h.e)};
  }).filter(g=> g.hits.length);
}
// destaca as palavras buscadas no texto original (com acento); se não der para alinhar, devolve só o texto
function buscaMark(s, toks){
  const ch = String(s).split(""), n = ch.map(c=> norm(c));
  if(n.some(x=> x.length!==1)) return esc(s);
  const ns = n.join(""), on = new Array(ch.length).fill(false);
  toks.forEach(t=>{ for(let i = ns.indexOf(t); i>-1; i = ns.indexOf(t, i + t.length)) for(let k = i; k < i + t.length; k++) on[k] = true; });
  let h = "", open = false;
  ch.forEach((c, i)=>{
    if(on[i] && !open){ h += "<mark>"; open = true; }
    if(!on[i] && open){ h += "</mark>"; open = false; }
    h += esc(c);
  });
  return h + (open ? "</mark>" : "");
}
// linha do texto (campo text, nunca kw) onde a busca bateu, quando não foi no título nem no subtítulo (ex.: trecho de um modelo)
function buscaTrecho(e, toks){
  if(toks.every(t=> (e.nt + " " + e.ns).includes(t)) || !e.text) return "";
  const t = toks.find(t=> !(e.nt + " " + e.ns).includes(t)) || toks[0];
  const line = String(e.text).split("\n").find(l=> norm(l).includes(t));
  if(!line) return "";
  const l = line.trim(), at = Math.max(0, norm(l).indexOf(t) - 12);   // o termo fica perto do começo (o fim é cortado)
  return (at > 0 ? "…" : "") + l.slice(at, at + 80) + (at + 80 < l.length ? "…" : "");
}

function buscaRender(){
  const q = buscaInput.value, toks = buscaToks(q);
  buscaRes = []; buscaAtivo = -1;
  buscaInput.removeAttribute("aria-activedescendant");
  if(!toks.length){
    buscaList.innerHTML = "";
    // lista natural: "A", "A e B", "A, B, C e D"
    const nomes = VIEWS.filter(v=> v.search).map(v=> `<b>${v.icon} ${esc(v.label)}</b>`);
    const lista = nomes.length > 1 ? nomes.slice(0, -1).join(", ") + " e " + nomes[nomes.length - 1] : nomes.join("");
    buscaVazio.innerHTML = `Busca em ${lista}: condição, sintoma, escore, remédio, dose, procedimento ou trecho de um modelo.`;
    buscaVazio.hidden = false;
    buscaStatus.textContent = "";
    return;
  }
  const groups = buscaFind(q);
  let h = "";
  groups.forEach(({v, hits}, gi)=>{
    h += `<div role="group" class="bg" aria-labelledby="bg-${gi}"><div role="presentation" class="bg-h" id="bg-${gi}"><span aria-hidden="true">${v.icon}</span> ${esc(v.label)} <span class="bg-n">${hits.length}</span></div>`;
    hits.forEach(e=>{
      const n = buscaRes.length, tr = buscaTrecho(e, toks);
      buscaRes.push({v, e});
      h += `<div role="option" class="bo" id="bo-${n}" data-n="${n}" aria-selected="false">
        <span class="bo-ic" aria-hidden="true">${e.ic || v.icon}</span>
        <span class="bo-t"><span class="bo-tt">${buscaMark(e.title, toks)}</span>
        <span class="bo-s">${buscaMark(e.sub||"", toks)}${tr ? `${e.sub ? " · " : ""}<span class="bo-tr">${buscaMark(tr, toks)}</span>` : ""}</span></span></div>`;
    });
    h += `</div>`;
  });
  buscaList.innerHTML = h;
  const n = buscaRes.length;
  buscaVazio.hidden = n > 0;
  if(!n) buscaVazio.innerHTML = `Nada encontrado para “${esc(q.trim())}”. Tente outra palavra: nome da doença, sintoma ou remédio.`;
  buscaStatus.textContent = n ? `${n} ${n>1 ? "resultados" : "resultado"}` : "Nenhum resultado";
  if(n) buscaMove(0);
}
function buscaMove(i){
  const opts = buscaList.querySelectorAll(".bo");
  if(!opts.length) return;
  buscaAtivo = (i + opts.length) % opts.length;
  opts.forEach((o, k)=>{ const on = k===buscaAtivo; o.classList.toggle("on", on); o.setAttribute("aria-selected", on ? "true" : "false"); });
  const o = opts[buscaAtivo];
  buscaInput.setAttribute("aria-activedescendant", o.id);
  // rola só a lista de resultados (não a página) até a opção ativa
  const top = o.offsetTop, bot = top + o.offsetHeight, head = 30;
  if(top - head < buscaList.scrollTop) buscaList.scrollTop = Math.max(0, top - head);
  else if(bot > buscaList.scrollTop + buscaList.clientHeight) buscaList.scrollTop = bot - buscaList.clientHeight;
}

function buscaShow(){
  buscaRender();
  buscaPop.hidden = false;
  buscaInput.setAttribute("aria-expanded", "true");
}
function buscaHide(){
  buscaPop.hidden = true;
  buscaInput.setAttribute("aria-expanded", "false");
  buscaInput.removeAttribute("aria-activedescendant");
  buscaAtivo = -1;
}
// abre a busca (atalho, lupa do celular) e põe o foco no campo
function buscaOpen(){
  busca.classList.add("aberta");
  buscaAbrir.setAttribute("aria-expanded", "true");
  buscaInput.focus();
  buscaInput.select();
  buscaShow();
}
// fecha tudo; no celular recolhe o campo de volta para a lupa
function buscaClose(focusBack){
  buscaHide();
  const wasOpen = busca.classList.contains("aberta");
  busca.classList.remove("aberta");
  buscaAbrir.setAttribute("aria-expanded", "false");
  if(focusBack && wasOpen && pageScrolls()) buscaAbrir.focus();
}
function buscaChoose(i){
  const r = buscaRes[i];
  if(!r) return;
  buscaInput.value = "";
  buscaClose(false);
  buscaInput.blur();
  goTo(r.v.key, r.e.id, "search");
}

buscaInput.addEventListener("input", buscaShow);
buscaInput.addEventListener("focus", ()=>{ if(buscaPop.hidden) buscaShow(); });
buscaInput.addEventListener("keydown", e=>{
  if(e.key==="ArrowDown" || e.key==="ArrowUp"){
    e.preventDefault();
    if(buscaPop.hidden){ buscaShow(); return; }
    buscaMove(buscaAtivo + (e.key==="ArrowDown" ? 1 : -1));
  } else if(e.key==="Enter"){
    e.preventDefault();
    if(buscaAtivo > -1) buscaChoose(buscaAtivo);
  } else if(e.key==="Escape"){
    e.preventDefault();
    // 1º Esc fecha a lista; o 2º (ou com a lista já fechada) limpa e sai da busca
    if(!buscaPop.hidden && buscaInput.value){ buscaHide(); return; }
    buscaInput.value = "";
    buscaClose(true);
    if(!pageScrolls()) buscaInput.blur();
  }
});
// clique numa opção (mousedown não tira o foco do campo)
buscaList.addEventListener("mousedown", e=>{ if(e.target.closest(".bo")) e.preventDefault(); });
buscaList.addEventListener("click", e=>{ const o = e.target.closest(".bo"); if(o) buscaChoose(+o.dataset.n); });
buscaList.addEventListener("mousemove", e=>{ const o = e.target.closest(".bo"); if(o && +o.dataset.n!==buscaAtivo) buscaMove(+o.dataset.n); });
buscaAbrir.addEventListener("click", buscaOpen);
$("#busca-fechar").addEventListener("click", ()=>{ buscaInput.value = ""; buscaClose(true); });
// clicar fora ou o foco sair da busca fecha a lista
document.addEventListener("pointerdown", e=>{ if(!busca.contains(e.target)) buscaClose(false); });
busca.addEventListener("focusout", e=>{ if(!e.relatedTarget || !busca.contains(e.relatedTarget)) setTimeout(()=>{ if(!busca.contains(document.activeElement)) buscaClose(false); }, 0); });
// atalhos globais: "/" fora de campos de texto; Ctrl+K / Cmd+K em qualquer lugar
document.addEventListener("keydown", e=>{
  const k = e.key.toLowerCase();
  if((e.ctrlKey || e.metaKey) && !e.altKey && k==="k"){ e.preventDefault(); buscaOpen(); return; }
  if(e.key!=="/" || e.ctrlKey || e.metaKey || e.altKey) return;
  const t = e.target, tag = t && t.tagName;
  if(tag==="INPUT" || tag==="TEXTAREA" || tag==="SELECT" || (t && t.isContentEditable)) return;
  e.preventDefault();
  buscaOpen();
});
