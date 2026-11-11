/* views/rascunho.js — aba Meu rascunho (#col-rascunho).
   Um texto só, grande, sem subtítulos (#rasc-ta). Dois modos:
     "exemplo"  sem link pessoal: o rascunho de exemplo (as linhas de MINHA, uma após a outra), só para ler;
     "conta"    no link pessoal (js/conta.js): o texto da pessoa, editável e salvo sozinho (criptografado).
   Copiar tudo copia o texto inteiro; ＋ Receita leva só o trecho selecionado. */
const rascTa = $("#rasc-ta"), rascScroll = $("#rasc-scroll"), rascAviso = $("#rasc-aviso"), rascStatusEl = $("#rasc-status");
// exemplo: os modelos do arquivo MINHA, como o médico escreveu, separados por uma linha em branco (sem grupos nem títulos)
const RASC_EXEMPLO = MINHA.map(m=> m.linhas.join("\n")).join("\n\n");
let rascModo = "exemplo";

function rascText(){ return rascTa.value.replace(/\s+$/, ""); }

// o campo cresce com o texto: quem rola é a coluna (desktop) ou a página (celular)
// (no desktop ocupa pelo menos a coluna inteira, para escrever em qualquer lugar)
function rascAltura(){
  if(!rascTa.offsetWidth) return;   // aba escondida: mede quando aparecer (ResizeObserver abaixo)
  const sc = pageScrolls() ? 0 : rascScroll.clientHeight - 40, top = rascScroll.scrollTop, wy = window.scrollY;
  rascTa.style.height = "auto";   // encolhe para medir — isso zera a rolagem da coluna, então ela é devolvida logo abaixo
  rascTa.style.height = Math.max(rascTa.scrollHeight + 2, 240, sc) + "px";
  rascScroll.scrollTop = top;
  if(window.scrollY!==wy) window.scrollTo(0, wy);
}
let rascLarg = 0;
if(window.ResizeObserver) new ResizeObserver(()=>{
  const l = rascScroll.clientWidth + "x" + (pageScrolls() ? 0 : rascScroll.clientHeight);
  if(l!==rascLarg){ rascLarg = l; rascAltura(); }
}).observe(rascScroll);
function rascStatus(txt, tipo){
  rascStatusEl.textContent = txt || "";
  rascStatusEl.dataset.tipo = tipo || "";
}
/* troca o conteúdo: modo "exemplo" (só leitura, com convite para criar o link), "conta" (editável) ou
   "carregando" (só leitura, vazio, enquanto o link pessoal busca o texto) */
function rascDefinir(texto, modo){
  rascModo = modo;
  rascTa.value = texto;
  rascTa.readOnly = modo!=="conta";
  rascTa.placeholder = modo==="conta" ? "Escreva aqui o seu rascunho: evolução, exame físico, modelos… Ele salva sozinho." : modo==="carregando" ? "Abrindo o seu rascunho…" : "";
  document.body.dataset.rasc = modo;
  if(modo==="exemplo"){
    rascAviso.innerHTML = `<span class="i i-info" aria-hidden="true"></span><span>Este é um <b>rascunho de exemplo</b>, só para ler. <a href="${esc(typeof raizUrl==="function" ? raizUrl() : "./")}" class="rasc-criar">Crie o seu link</a> para ter o seu, editável e salvo.</span>`;
    rascAviso.hidden = false;
    rascStatus("exemplo");
  } else rascAviso.hidden = true;
  rascAltura();
  if(typeof buscaInvalidar==="function") buscaInvalidar();
}
function renderRascunho(){ if(rascModo==="exemplo") rascDefinir(RASC_EXEMPLO, "exemplo"); }

// digitou: avisa o link pessoal (salva depois de uma pausa) e a busca passa a ver o texto novo
rascTa.addEventListener("input", ()=>{
  rascAltura();
  if(rascModo!=="conta") return;
  if(typeof contaMudou==="function") contaMudou();
  if(typeof buscaInvalidar==="function") buscaInvalidar();
});

// trecho selecionado no texto ("" se não houver)
function rascSelection(){
  const a = rascTa.selectionStart, b = rascTa.selectionEnd;
  if(a==null || a===b) return "";
  return rascTa.value.slice(a, b).replace(/^\s*\n/, "").replace(/\s+$/, "");
}
$("#rasc-send").onclick = ()=>{
  const t = rascSelection();
  if(!t){ toast("Selecione um trecho do texto para levar à receita", false); return; }
  sendToRx(t);
};
$("#rasc-copy").onclick = async ()=>{
  const t = rascText();
  if(!t){ toast("Rascunho vazio", false); return; }
  const ok = await copyText(t);
  toast(ok ? "Rascunho inteiro copiado!" : "Não foi possível copiar", ok);
};

/* ---- busca única: cada trecho entre linhas em branco é um resultado; abrir = rolar até ele e selecioná-lo ---- */
function rascTrechos(){
  const v = rascTa.value, out = [], re = /\n[ \t]*\n/g;
  let ini = 0, m;
  const add = fim=>{
    const t = v.slice(ini, fim);
    const s = ini + (t.length - t.replace(/^\s+/, "").length), e = ini + t.replace(/\s+$/, "").length;
    if(e > s) out.push({s, e, t: v.slice(s, e)});
  };
  while((m = re.exec(v))){ add(m.index); ini = m.index + m[0].length; }
  add(v.length);
  return out;
}
// altura (px) do texto até o caractere i: espelho com as mesmas medidas do campo
function rascTopoDe(i){
  const cs = getComputedStyle(rascTa), m = document.createElement("div");
  ["fontFamily","fontSize","lineHeight","letterSpacing","paddingTop","paddingLeft","paddingRight","borderLeftWidth","borderRightWidth","whiteSpace","wordBreak","overflowWrap","tabSize"]
    .forEach(k=> m.style[k] = cs[k]);
  m.style.cssText += ";position:absolute;visibility:hidden;left:-9999px;top:0;box-sizing:border-box;width:" + rascTa.offsetWidth + "px";
  m.textContent = rascTa.value.slice(0, i) + "​";
  document.body.appendChild(m);
  const h = m.offsetHeight - parseFloat(cs.lineHeight || 20);
  m.remove();
  return Math.max(0, h);
}
function openCard(id){
  const mm = /^(\d+)-(\d+)$/.exec(String(id));
  if(!mm) return false;
  const s = +mm[1], e = +mm[2];
  if(e > rascTa.value.length || s >= e) return false;
  rascAltura();   // a aba acabou de aparecer: mede antes de calcular a posição
  const y = rascTopoDe(s);
  if(pageScrolls()){
    const hdr = document.querySelector("header.top");
    window.scrollTo(0, Math.max(0, rascTa.getBoundingClientRect().top + window.scrollY + y - hdr.offsetHeight - 16));
  } else rascScroll.scrollTop = Math.max(0, rascTa.offsetTop + y - 16);
  rascTa.focus({preventScroll: true});
  rascTa.setSelectionRange(s, e);
  return true;
}

/* ---- registro da aba ----
   Sem itemId: o endereço fica #/rascunho; a busca abre um trecho com open("<início>-<fim>"). */
registerView({
  key: "rascunho", label: "Meu rascunho", icon: "⭐",
  desc: "O seu texto de plantão, num lugar só",
  cols: ["col-rascunho"], layout: "texto",
  open: openCard,
  search: () => rascTrechos().map(t=>{
    const l = t.t.split("\n").map(x=> x.trim()).filter(Boolean);
    const tit = l[0] || "Trecho";
    return {id: t.s + "-" + t.e, title: tit.length > 70 ? tit.slice(0, 68) + "…" : tit, sub: "Meu rascunho", text: l.slice(1).join("\n")};
  })
});
