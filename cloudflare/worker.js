/* Queixa Principal — API das contas (Cloudflare Worker + KV).
   Guarda, para cada link qprincipal.com.br/<nome>, o rascunho CRIPTOGRAFADO no navegador da pessoa.
   O servidor nunca recebe a senha nem o texto: recebe só
     - "sal"   (aleatório, público: o navegador precisa dele para derivar as chaves da senha)
     - "chave" (prova de senha derivada por PBKDF2 — aqui guardamos só o SHA-256 dela)
     - "dados" + "iv" (o rascunho cifrado com AES-GCM por uma chave que nunca sai do navegador)
   Esqueceu a senha = o rascunho não pode ser recuperado (nem por nós).

   Configuração no painel da Cloudflare: um namespace KV ligado a este Worker com o nome de variável RASCUNHOS.

   Rotas (JSON):
     GET  /u/<nome>          → {existe:false} | {existe:true, sal}
     POST /u/<nome>/criar    {sal, chave, dados, iv}  → {ok, atualizado}       (409 se o nome já existe)
     POST /u/<nome>/entrar   {chave}                  → {dados, iv, atualizado} (401 senha errada, 429 muitas tentativas)
     PUT  /u/<nome>          {chave, dados, iv}       → {ok, atualizado}
*/
const ORIGENS = new Set(["https://qprincipal.com.br", "https://www.qprincipal.com.br"]);
const ORIGEM_DEV = /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/;
const NOME = /^[a-z0-9](?:[a-z0-9-]{0,28}[a-z0-9])?$/;
const RESERVADOS = new Set(["api", "u", "css", "js", "data", "img", "tests", "cloudflare", "index", "admin", "www", "app",
  "inicio", "oferta", "entrar", "sair", "conta", "login", "cadastro", "rascunho", "prescricoes", "escores", "calculadoras",
  "procedimentos", "ajuda", "sobre", "termos", "privacidade", "suporte", "contato"]);
const MAX_DADOS = 400000;          // ~300 KB de texto depois de cifrado em base64
const MAX_FALHAS = 10;             // senhas erradas seguidas por nome...
const JANELA_FALHAS = 15 * 60;     // ...em 15 minutos → bloqueia até a janela passar
const MAX_CRIAR_IP = 10;           // contas novas por IP por hora

function cors(origem){
  const ok = origem && (ORIGENS.has(origem) || ORIGEM_DEV.test(origem));
  return ok ? {"Access-Control-Allow-Origin": origem, "Access-Control-Allow-Methods": "GET, POST, PUT, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type", "Access-Control-Max-Age": "86400", "Vary": "Origin"} : {"Vary": "Origin"};
}
const resp = (h, status, corpo) => new Response(JSON.stringify(corpo), {status,
  headers: {...h, "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store"}});

async function sha256hex(s){
  const b = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s));
  return [...new Uint8Array(b)].map(x => x.toString(16).padStart(2, "0")).join("");
}
function igual(a, b){   // comparação em tempo constante
  if(typeof a!=="string" || typeof b!=="string" || a.length!==b.length) return false;
  let d = 0; for(let i = 0; i < a.length; i++) d |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return d===0;
}
const b64ok = (s, max) => typeof s==="string" && s.length > 0 && s.length <= max && /^[A-Za-z0-9+/=]+$/.test(s);
const hexok = s => typeof s==="string" && /^[0-9a-f]{64}$/.test(s);

async function corpo(req){
  const t = await req.text();
  if(t.length > MAX_DADOS + 2000) return null;
  try{ const j = JSON.parse(t); return j && typeof j==="object" ? j : null; }catch(e){ return null; }
}

export default {
  async fetch(req, env){
    const h = cors(req.headers.get("Origin"));
    if(req.method==="OPTIONS") return new Response(null, {status: 204, headers: h});
    const url = new URL(req.url);
    const m = /^\/u\/([^/]+)(?:\/(criar|entrar))?\/?$/.exec(url.pathname);
    if(!m) return resp(h, 404, {erro: "rota"});
    const nome = decodeURIComponent(m[1]).toLowerCase(), acao = m[2] || "";
    if(!NOME.test(nome) || RESERVADOS.has(nome)) return resp(h, 400, {erro: "nome"});
    const kv = env.RASCUNHOS, chaveKV = "u:" + nome;

    if(req.method==="GET" && !acao){
      const u = await kv.get(chaveKV, "json");
      return resp(h, 200, u ? {existe: true, sal: u.sal} : {existe: false});
    }

    const j = await corpo(req);
    if(!j) return resp(h, 400, {erro: "corpo"});

    if(req.method==="POST" && acao==="criar"){
      if(!b64ok(j.sal, 64) || !hexok(j.chave) || !b64ok(j.dados, MAX_DADOS) || !b64ok(j.iv, 32)) return resp(h, 400, {erro: "dados"});
      const ip = req.headers.get("CF-Connecting-IP") || "?", kIp = "criar:" + ip;
      const n = Number(await kv.get(kIp)) || 0;
      if(n >= MAX_CRIAR_IP) return resp(h, 429, {erro: "muitas"});
      if(await kv.get(chaveKV)) return resp(h, 409, {erro: "existe"});
      const agora = new Date().toISOString();
      await kv.put(chaveKV, JSON.stringify({sal: j.sal, hash: await sha256hex(j.chave), dados: j.dados, iv: j.iv, criado: agora, atualizado: agora}));
      await kv.put(kIp, String(n + 1), {expirationTtl: 3600});
      return resp(h, 200, {ok: true, atualizado: agora});
    }

    // entrar / salvar: exigem a prova de senha
    if(!hexok(j.chave)) return resp(h, 400, {erro: "dados"});
    const u = await kv.get(chaveKV, "json");
    if(!u) return resp(h, 404, {erro: "nao-existe"});
    const kF = "falhas:" + nome, falhas = Number(await kv.get(kF)) || 0;
    if(falhas >= MAX_FALHAS) return resp(h, 429, {erro: "bloqueado"});
    if(!igual(await sha256hex(j.chave), u.hash)){
      await kv.put(kF, String(falhas + 1), {expirationTtl: JANELA_FALHAS});
      return resp(h, 401, {erro: "senha", restam: Math.max(0, MAX_FALHAS - falhas - 1)});
    }
    if(falhas) await kv.delete(kF);

    if(req.method==="POST" && acao==="entrar") return resp(h, 200, {dados: u.dados, iv: u.iv, atualizado: u.atualizado});

    if(req.method==="PUT" && !acao){
      if(!b64ok(j.dados, MAX_DADOS) || !b64ok(j.iv, 32)) return resp(h, 400, {erro: "dados"});
      u.dados = j.dados; u.iv = j.iv; u.atualizado = new Date().toISOString();
      await kv.put(chaveKV, JSON.stringify(u));
      return resp(h, 200, {ok: true, atualizado: u.atualizado});
    }
    return resp(h, 405, {erro: "metodo"});
  }
};
