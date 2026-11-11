/* conta.js — o link pessoal (qprincipal.com.br/<nome>), a página de oferta e a tela de senha.
   - Cada pessoa tem um endereço; para entrar basta a senha (o nome é o próprio endereço).
   - O rascunho é criptografado AQUI, no navegador: PBKDF2-SHA256 (310 mil voltas) da senha + sal gera 512 bits —
     256 viram a chave AES-GCM (nunca sai do navegador) e 256 viram a "prova de senha" mandada ao servidor, que guarda só o
     SHA-256 dela. O servidor (Cloudflare Worker, cloudflare/worker.js) só vê texto cifrado. Esqueceu a senha = sem volta.
   - Sessão: a chave e a prova ficam em sessionStorage (some ao fechar a aba) ou, se a pessoa marcar "manter conectado",
     em localStorage. "Sair" apaga as duas.
   - Telas (html[data-tela], postas primeiro pelo <script> do <head>): "oferta" | "senha" | "app". */

// endereço do Worker da Cloudflare (sem barra no fim). Vazio = contas ainda não ativadas.
const QP_API = "https://qprincipal-api.mascarenhasluz.workers.dev";

const contaNome = window.QP_NOME || null;          // nome do endereço (null na raiz)
let conta = null;                                    // {nome, chave (hex), raw (base64 da chave AES), aes (CryptoKey)}
let contaSal = null;                                 // sal do link (GET /u/<nome>)
const NOME_OK = /^[a-z0-9](?:[a-z0-9-]{0,28}[a-z0-9])?$/;
const NOME_RESERVADO = new Set(["api","u","css","js","data","img","tests","cloudflare","index","admin","www","app","inicio","oferta",
  "entrar","sair","conta","login","cadastro","rascunho","prescricoes","escores","calculadoras","procedimentos","ajuda","sobre",
  "termos","privacidade","suporte","contato"]);
const noDominio = /(^|\.)qprincipal\.com\.br$/.test(location.hostname);
// endereços: no domínio, /<nome> e /; fora dele (file://, localhost) o próprio index.html com ?u=<nome>
const raizUrl = () => noDominio ? "/" : location.pathname;
const linkUrl = n => noDominio ? "/" + n : location.pathname + "?u=" + encodeURIComponent(n);
const contaNomeAtual = () => conta ? conta.nome : null;

function telaSet(t){ document.documentElement.dataset.tela = t; }

/* ---- cripto (WebCrypto) ---- */
const contaTE = new TextEncoder(), contaTD = new TextDecoder();
function b64(buf){
  const a = new Uint8Array(buf); let s = "";
  for(let i = 0; i < a.length; i += 0x8000) s += String.fromCharCode.apply(null, a.subarray(i, i + 0x8000));
  return btoa(s);
}
const unb64 = s => Uint8Array.from(atob(s), c=> c.charCodeAt(0));
const hex = a => [...a].map(x=> x.toString(16).padStart(2, "0")).join("");
async function derivar(senha, sal){
  const base = await crypto.subtle.importKey("raw", contaTE.encode(senha), "PBKDF2", false, ["deriveBits"]);
  const bits = new Uint8Array(await crypto.subtle.deriveBits({name: "PBKDF2", salt: unb64(sal), iterations: 310000, hash: "SHA-256"}, base, 512));
  return {raw: b64(bits.slice(0, 32)), chave: hex(bits.slice(32))};
}
const chaveAES = raw => crypto.subtle.importKey("raw", unb64(raw), "AES-GCM", false, ["encrypt", "decrypt"]);
async function cifrar(c, texto){
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const d = await crypto.subtle.encrypt({name: "AES-GCM", iv, additionalData: contaTE.encode(c.nome)}, c.aes, contaTE.encode(texto));
  return {dados: b64(d), iv: b64(iv)};
}
async function decifrar(c, dados, iv){
  const t = await crypto.subtle.decrypt({name: "AES-GCM", iv: unb64(iv), additionalData: contaTE.encode(c.nome)}, c.aes, unb64(dados));
  return contaTD.decode(t);
}

/* ---- servidor ---- */
async function api(metodo, rota, corpo){
  const r = await fetch(QP_API + "/u/" + encodeURIComponent(contaNome) + rota, {method: metodo,
    headers: corpo ? {"Content-Type": "application/json"} : undefined, body: corpo ? JSON.stringify(corpo) : undefined, cache: "no-store"});
  let j = {}; try{ j = await r.json() || {}; }catch(e){}
  return {status: r.status, j};
}

/* ---- sessão ---- */
function sessaoGuardar(c, lembrar){
  const s = JSON.stringify({nome: c.nome, chave: c.chave, raw: c.raw});
  try{ sessionStorage.setItem("qp-sessao", s); }catch(e){}
  try{ if(lembrar) localStorage.setItem("qp-sessao", s); else localStorage.removeItem("qp-sessao"); }catch(e){}
}
function sessaoApagar(){
  try{ sessionStorage.removeItem("qp-sessao"); }catch(e){}
  try{ localStorage.removeItem("qp-sessao"); }catch(e){}
}

/* ---- qual tela mostrar para o endereço (chamado pelo router a cada mudança de hash) ----
   devolve true quando as ferramentas devem abrir o endereço */
function contaTelaRota(r){
  if(contaNome){
    if(!conta){ telaSet("senha"); return false; }
    telaSet("app"); return true;
  }
  if(r && r.empty){ telaSet("oferta"); window.scrollTo(0, 0); return false; }
  telaSet("app"); return true;
}

/* ---- cabeçalho: nome + Sair, ou "Criar meu link" ---- */
function contaCabecalho(){
  const el = $("#conta");
  if(conta){
    el.innerHTML = `<span class="conta-nome" title="qprincipal.com.br/${esc(conta.nome)}"><span class="i i-user" aria-hidden="true"></span><span class="conta-n">${esc(conta.nome)}</span></span>
      <button type="button" class="conta-sair" id="conta-sair" aria-label="Sair" title="Sair"><span class="i i-logout" aria-hidden="true"></span></button>`;
    $("#conta-sair").onclick = contaSair;
  } else {
    el.innerHTML = `<a class="conta-criar" href="${esc(raizUrl())}"><span class="i i-link" aria-hidden="true"></span><span class="conta-n">Criar meu link</span></a>`;
  }
}
async function contaSair(){
  if(contaPendente || contaSalvando){ await contaSalvarAgora(); }
  sessaoApagar();
  conta = null;
  location.reload();
}

/* ---- salvar o rascunho (sozinho, depois de uma pausa na digitação) ---- */
let contaPendente = false, contaSalvando = false, contaT = null, contaTentarT = null, contaUltimo = null, contaBuscado = 0;
const hora = iso => { const d = iso ? new Date(iso) : new Date(); return d.toLocaleTimeString("pt-BR", {hour: "2-digit", minute: "2-digit"}); };
function contaMudou(){
  contaPendente = true;
  rascStatus("Alterações não salvas", "pendente");
  clearTimeout(contaT);
  contaT = setTimeout(contaSalvarAgora, 1200);
}
async function contaSalvarAgora(){
  clearTimeout(contaT); clearTimeout(contaTentarT);
  if(!conta || !contaPendente) return;
  if(contaSalvando){ contaT = setTimeout(contaSalvarAgora, 400); return; }
  contaSalvando = true; contaPendente = false;
  const texto = rascTa.value;
  rascStatus("Salvando…", "salvando");
  try{
    const c = await cifrar(conta, texto);
    const r = await api("PUT", "", {chave: conta.chave, ...c});
    if(r.status===200){ contaUltimo = texto; contaBuscado = Date.now(); rascStatus("Salvo às " + hora(r.j.atualizado), "ok"); }
    else if(r.status===401 || r.status===404){ contaPendente = true; rascStatus("Sessão expirada — entre de novo para salvar", "erro"); }
    else throw new Error("status " + r.status);
  }catch(e){
    contaPendente = true;
    rascStatus("Sem conexão — não salvo. Tentando de novo…", "erro");
    contaTentarT = setTimeout(contaSalvarAgora, 8000);
  }finally{ contaSalvando = false; }
}
window.addEventListener("beforeunload", e=>{ if(conta && (contaPendente || contaSalvando)){ e.preventDefault(); e.returnValue = ""; } });

// abre o texto do servidor; usado ao entrar e ao voltar para a aba (pega o que foi escrito em outro aparelho)
async function contaBuscar(primeira){
  const r = await api("POST", "/entrar", {chave: conta.chave});
  if(r.status!==200) return r;
  const texto = await decifrar(conta, r.j.dados, r.j.iv);
  contaBuscado = Date.now();
  if(primeira || (!contaPendente && !contaSalvando && rascTa.value!==texto && document.activeElement!==rascTa)){
    contaUltimo = texto;
    rascDefinir(texto, "conta");
    rascStatus("Salvo às " + hora(r.j.atualizado), "ok");
    if(!primeira) toast("Rascunho atualizado com o que você escreveu em outro aparelho");
  }
  return r;
}
document.addEventListener("visibilitychange", ()=>{
  if(document.visibilityState==="visible" && conta && Date.now() - contaBuscado > 20000) contaBuscar(false).catch(()=>{});
});

/* ---- tela de senha ---- */
const snForm = $("#sn-form"), snSenha = $("#sn-senha"), snConf = $("#sn-conf"), snErro = $("#sn-erro"), snOk = $("#sn-ok");
let snModo = "entrar";   // "entrar" | "criar" | "espera"
function snMostrar(modo, titulo, txt){
  snModo = modo;
  $("#sn-titulo").textContent = titulo;
  $("#sn-txt").innerHTML = txt || "";
  $("#sn-campos").hidden = modo==="espera";
  $("#sn-conf-box").hidden = modo!=="criar";
  snSenha.autocomplete = modo==="criar" ? "new-password" : "current-password";
  snOk.textContent = modo==="criar" ? "Criar meu link" : "Entrar";
  snErro.textContent = "";
  if(modo!=="espera") setTimeout(()=> snSenha.focus(), 30);
}
async function snPreparar(){
  $("#sn-nome").textContent = contaNome;
  $("#sn-usuario").value = contaNome;   // para o gerenciador de senhas do navegador guardar "nome + senha"
  document.title = "qprincipal.com.br/" + contaNome + " — Queixa Principal";
  $("#sn-sem").href = raizUrl() + "#/inicio";
  $("#sn-outro").href = raizUrl();
  if(!NOME_OK.test(contaNome) || NOME_RESERVADO.has(contaNome)){
    snMostrar("espera", "Endereço inválido", "Use só letras minúsculas, números e hífen (2 a 30). <a href=\"" + esc(raizUrl()) + "\">Escolher outro</a>.");
    return;
  }
  if(!QP_API){ snMostrar("espera", "Quase lá", "Os links pessoais estão sendo ativados. Enquanto isso, use as ferramentas sem conta."); return; }
  snMostrar("espera", "Abrindo…", "");
  try{
    const r = await api("GET", "");
    if(r.status!==200) throw new Error("status " + r.status);
    if(r.j.existe){ contaSal = r.j.sal; snMostrar("entrar", "Entrar", "Digite a senha deste link."); }
    else snMostrar("criar", "Este link está livre", "Crie uma senha e ele passa a ser seu. <b>Guarde a senha:</b> o rascunho é criptografado com ela e não há como recuperá-la.");
  }catch(e){
    snMostrar("espera", "Sem conexão", "Não consegui falar com o servidor. <a href=\"#\" id=\"sn-denovo\">Tentar de novo</a>.");
    const d = $("#sn-denovo"); if(d) d.onclick = ev=>{ ev.preventDefault(); snPreparar(); };
  }
}
snForm.addEventListener("submit", async e=>{
  e.preventDefault();
  if(snModo==="espera" || snOk.disabled) return;
  const senha = snSenha.value;
  snErro.textContent = "";
  if(snModo==="criar"){
    if(senha.length < 6){ snErro.textContent = "A senha precisa ter pelo menos 6 caracteres."; snSenha.focus(); return; }
    if(senha!==snConf.value){ snErro.textContent = "As duas senhas não são iguais."; snConf.focus(); return; }
  } else if(!senha){ snSenha.focus(); return; }
  snOk.disabled = true; const rot = snOk.textContent; snOk.textContent = snModo==="criar" ? "Criando…" : "Entrando…";
  try{
    const lembrar = $("#sn-lembrar").checked;
    if(snModo==="criar"){
      const sal = b64(crypto.getRandomValues(new Uint8Array(16)));
      const d = await derivar(senha, sal);
      const c = {nome: contaNome, chave: d.chave, raw: d.raw, aes: await chaveAES(d.raw)};
      const texto = $("#sn-exemplo").checked ? RASC_EXEMPLO : "";
      const r = await api("POST", "/criar", {sal, chave: c.chave, ...(await cifrar(c, texto))});
      if(r.status===409){ contaSal = null; await snPreparar(); snErro.textContent = "Alguém acabou de criar este link. Se for seu, entre com a senha."; return; }
      if(r.status===429){ snErro.textContent = "Muitos links criados daqui agora. Tente mais tarde."; return; }
      if(r.status!==200) throw new Error("status " + r.status);
      conta = c; contaUltimo = texto; contaBuscado = Date.now();
      sessaoGuardar(c, lembrar);
      rascDefinir(texto, "conta"); rascStatus("Salvo às " + hora(r.j.atualizado), "ok");
      contaEntrou(true);
    } else {
      const d = await derivar(senha, contaSal);
      const c = {nome: contaNome, chave: d.chave, raw: d.raw, aes: await chaveAES(d.raw)};
      conta = c;
      const r = await contaBuscar(true);
      if(r.status!==200){
        conta = null;
        snErro.textContent = r.status===401 ? "Senha errada." + (r.j.restam!=null && r.j.restam < 5 ? ` Restam ${r.j.restam} tentativas.` : "")
          : r.status===429 ? "Muitas tentativas erradas. Espere 15 minutos e tente de novo." : "Não consegui entrar agora. Tente de novo.";
        snSenha.select();
        return;
      }
      sessaoGuardar(c, lembrar);
      contaEntrou(false);
    }
  }catch(err){
    if(snModo!=="criar") conta = null;
    snErro.textContent = "Não consegui falar com o servidor. Confira a internet e tente de novo.";
  }finally{ snOk.disabled = false; snOk.textContent = rot; snSenha.value = ""; snConf.value = ""; }
});
function contaEntrou(nova){
  contaCabecalho();
  telaSet("app");
  onRoute("load");
  if(nova) toast("Pronto! Este link agora é seu.");
}

/* ---- página de oferta ---- */
$("#of-form").addEventListener("submit", e=>{
  e.preventDefault();
  const inp = $("#of-nome"), n = inp.value.trim().toLowerCase().replace(/^.*qprincipal\.com\.br\//, "").replace(/\/+$/, "");
  const dica = $("#of-dica");
  if(!NOME_OK.test(n)){ dica.textContent = "Use só letras minúsculas, números e hífen (2 a 30 caracteres)."; dica.classList.add("erro"); inp.focus(); return; }
  if(NOME_RESERVADO.has(n)){ dica.textContent = "Esse nome é reservado. Escolha outro."; dica.classList.add("erro"); inp.focus(); return; }
  location.href = linkUrl(n);
});
$("#of-nome").addEventListener("input", e=>{
  const v = e.target.value, limpo = v.toLowerCase().replace(/\s+/g, "-");
  if(v!==limpo) e.target.value = limpo;
  $("#of-dica").classList.remove("erro");
});

/* ---- início ---- */
function contaIniciar(){
  if(contaNome && window.QP_SESSAO && QP_API){
    const s = window.QP_SESSAO;
    conta = {nome: s.nome, chave: s.chave, raw: s.raw, aes: null};
    rascDefinir("", "carregando");
    rascStatus("Abrindo…", "salvando");
    chaveAES(s.raw).then(k=>{ conta.aes = k; return contaBuscar(true); }).then(r=>{
      if(r.status===401 || r.status===404){ sessaoApagar(); conta = null; contaCabecalho(); snPreparar(); telaSet("senha"); }
      else if(r.status!==200) throw new Error("status " + r.status);
    }).catch(()=>{
      rascStatus("Sem conexão — não consegui abrir o rascunho.", "erro");
      rascAviso.innerHTML = `<span class="i i-alert" aria-hidden="true"></span><span>Não consegui abrir o seu rascunho agora. <a href="#" id="rasc-denovo">Tentar de novo</a></span>`;
      rascAviso.hidden = false;
      const d = $("#rasc-denovo"); if(d) d.onclick = ev=>{ ev.preventDefault(); rascAviso.hidden = true; contaIniciar(); };
    });
  } else if(contaNome){
    window.QP_SESSAO = null;
    snPreparar();
  }
  contaCabecalho();
  const sem = $(".of-sem"); if(sem) sem.href = raizUrl() + "#/inicio";
}
