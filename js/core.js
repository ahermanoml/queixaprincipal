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
