/* router.js — endereços por hash, gerados pelo registro VIEWS:
     #/<aba>            ex.: #/prescricoes, #/rascunho
     #/<aba>/<item>     ex.: #/prescricoes/itu   (só para abas com itemId/open)
   Sem hash = aba padrão (a primeira registrada, sem item aberto). Hash inválido (aba ou item desconhecido,
   formato estranho) = aba padrão, e o endereço é corrigido sem criar entrada no histórico.
   Cada ação do usuário (trocar de aba, abrir uma condição, escolher na busca) cria uma entrada no histórico,
   então voltar/avançar do navegador refaz o caminho. Funciona em file:// (não usa pushState). */

function parseHash(h){
  if(!h || h==="#") return {view: VIEWS[0].key, item: null, empty: true};
  const m = /^#\/([a-z0-9_-]+)(?:\/([^/?#]+))?\/?$/.exec(h);
  if(!m || !viewOf(m[1])) return null;
  let item = null;
  if(m[2]){ try{ item = decodeURIComponent(m[2]); }catch(e){ return null; } }
  return {view: m[1], item};
}
const hashOf = (key, item) => "#/" + key + (item!=null ? "/" + encodeURIComponent(item) : "");
// endereço que descreve o estado atual (aba aberta + item aberto nela, se a aba tiver itens)
function stateHash(){
  const v = viewOf(currentView);
  return hashOf(v.key, v.itemId ? v.itemId() : null);
}

/* leva a página ao estado {view, item}. Devolve false se o item não existe.
   force: abre o item mesmo que já esteja aberto (a busca usa: escolher de novo = rolar até ele). */
function applyRoute(r, how, force){
  const v = viewOf(r.view);
  if(currentView!==v.key) showView(v.key);
  if(r.item!=null){
    if(!v.open) return false;
    if(force || !v.itemId || v.itemId()!==r.item) return v.open(r.item, how)!==false;
    return true;
  }
  if(v.itemId && v.itemId()!=null && v.close) v.close();
  return true;
}
// corrige o endereço sem criar entrada no histórico (só muda o hash: não recarrega a página)
function replaceHash(h){ if(location.hash!==h) location.replace(h); }

function onRoute(how){
  const r = parseHash(location.hash);
  if(!r){ applyRoute({view: VIEWS[0].key, item: null}, how); replaceHash(stateHash()); return; }
  const ok = applyRoute(r, how);
  if(!ok) applyRoute({view: r.view, item: null}, how);
  if(!r.empty) replaceHash(stateHash());   // ex.: item desconhecido, ou aba sem itens no endereço
}
window.addEventListener("hashchange", ()=> onRoute("route"));

/* ações do usuário: aplicam o estado e gravam o endereço (nova entrada no histórico). O hashchange que vem em
   seguida encontra o estado já aplicado e não faz nada. */
function navigate(key, item, how, force){
  const ok = applyRoute({view: key, item: item==null ? null : item}, how, force);
  routeChanged();
  return ok;
}
// o estado mudou por um clique dentro da aba (ex.: abrir condição na lista): grava o endereço
function routeChanged(){ const h = stateHash(); if(location.hash!==h) location.hash = h; }
// abre um item de qualquer aba (busca): abas com itemId levam o item no endereço; as outras só mostram a aba e abrem
function goTo(key, id, how){
  const v = viewOf(key);
  if(v.itemId) return navigate(key, id, how, true);
  navigate(key, null, how);
  return v.open ? v.open(id, how)!==false : true;
}
