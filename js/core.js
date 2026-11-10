/* core.js — helpers compartilhados por todas as abas. */
const $ = s => document.querySelector(s);
const esc = s => String(s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));

/* ---- toast ---- */
let toastT;
function toast(msg, ok=true){
  const t=$("#toast"); t.textContent=msg; t.className = "show"+(ok?"":" warn");
  clearTimeout(toastT); toastT=setTimeout(()=>{ t.className=""; }, 1500);
}

async function copyText(txt){
  try{ await navigator.clipboard.writeText(txt); return true; }
  catch(e){
    // fallback: textarea temporário + execCommand
    const ta = document.createElement("textarea");
    ta.value = txt; ta.setAttribute("readonly",""); ta.style.position = "fixed"; ta.style.opacity = "0";
    document.body.appendChild(ta); ta.select();
    let ok = false; try{ ok = document.execCommand("copy"); }catch(_){ ok = false; }
    ta.remove();
    return ok;
  }
}

/* ---- rolagem ----
   Até 820px a página rola inteira (header grudado no topo); acima disso cada coluna rola sozinha. */
const pageScrolls = () => window.matchMedia("(max-width:820px)").matches;
// rola até el ficar no topo da área visível: da página (descontando o header) ou da coluna (.scroll) que o contém
function scrollIntoPlace(el, gap=12){
  if(pageScrolls()){
    const hdr = document.querySelector("header.top");
    window.scrollTo(0, Math.max(0, el.getBoundingClientRect().top + window.scrollY - hdr.offsetHeight - gap));
  } else {
    const sc = el.closest(".scroll");
    if(sc) sc.scrollTop += el.getBoundingClientRect().top - sc.getBoundingClientRect().top - gap;
  }
}

/* ---- registro das abas do topo (views) ----
   Cada js/views/<aba>.js chama registerView({...}) uma vez; a ordem de registro (ordem dos <script>) é a ordem
   das abas. O registro alimenta as abas do topo (app.js), os endereços #/<aba>/<item> (router.js) e a busca
   única (busca.js). Campos:
     key      id da aba: vai no endereço (#/key) e em body[data-view]
     label    texto da aba; icon: emoji antes do texto
     cols     ids das colunas de .grid que a aba mostra (a receita, #col-rx, aparece sempre)
     layout   "lista" (coluna estreita + coluna larga + receita) | "texto" (coluna larga + receita)
     itemId() opcional: id do item aberto agora (vai no endereço #/key/<id>), ou null
     open(id, how) opcional: abre o item id; devolve false se ele não existe.
              how = "route" (endereço / voltar-avançar) | "load" (endereço ao abrir a página) | "search" (busca)
     close()  opcional: volta a aba ao estado "nenhum item aberto"
     search() opcional: itens da busca única, [{id, title, sub, text, ic?}] — lido uma vez, na primeira busca */
const VIEWS = [];
function registerView(v){
  if(VIEWS.some(x=> x.key===v.key)) throw new Error("aba repetida: " + v.key);
  VIEWS.push(v);
}
const viewOf = key => VIEWS.find(v=> v.key===key) || null;
