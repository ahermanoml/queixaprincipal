/* core.js — helpers compartilhados por todas as abas. */
const $ = s => document.querySelector(s);
const esc = s => String(s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
// texto para comparar em buscas: minúsculo e sem acento ("Infecção" → "infeccao")
const norm = s => String(s).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

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
     label    texto da aba; icon: emoji de reserva (a aba mostra o ícone de linha da key, css/icones.css)
     cols     ids das colunas de .grid que a aba mostra (a receita, #col-rx, aparece sempre)
     layout   "lista" (coluna estreita + coluna larga + receita) | "texto" (coluna larga + receita)
     rx       opcional: false = a aba não mostra a coluna da receita (#col-rx fica escondida, sem perder o conteúdo)
     itemId() opcional: id do item aberto agora (vai no endereço #/key/<id>), ou null
     open(id, how) opcional: abre o item id; devolve false se ele não existe.
              how = "route" (endereço / voltar-avançar) | "load" (endereço ao abrir a página) | "search" (busca)
     close()  opcional: volta a aba ao estado "nenhum item aberto"
     search() opcional: itens da busca única, [{id, title, sub?, kw?, text?, ic?}] — lido uma vez, na primeira busca.
              Busca em title + sub + kw + text. kw = palavras-chave (procuradas, nunca mostradas); text = texto do item
              (procurado; a linha que bateu aparece como trecho no resultado). ic padrão = icon da aba. */
const VIEWS = [];
function registerView(v){
  if(VIEWS.some(x=> x.key===v.key)) throw new Error("aba repetida: " + v.key);
  VIEWS.push(v);
}
const viewOf = key => VIEWS.find(v=> v.key===key) || null;
// ícone de linha da aba (css/icones.css, por key); o emoji do registro fica dentro, invisível, como reserva
const viewIcon = v => `<span class="i" data-v="${esc(v.key)}" aria-hidden="true">${esc(v.icon||"")}</span>`;

/* ---- caixa da tela (layout minimalista, 2026-11-21) ----
   Os remédios, posologias e orientações estão em MAIÚSCULAS nos dados, e o texto copiado para o sistema do hospital
   continua assim. Só na TELA eles aparecem em caixa normal ("Nitrofurantoína 100 mg"): o CSS da classe .cx põe tudo em
   minúsculas e a primeira letra em maiúscula; cxHTML() embrulha em <span class="sg"> as letras que devem continuar
   maiúsculas (siglas, unidades como mL/mEq/mmHg, nomes próprios). O texto do HTML não muda — só ganha <span> —, então
   o que se seleciona, copia ou lê no leitor de tela é o original. Palavra fora das listas aparece em minúsculas. */
const CX_FORMAS = (()=>{
  const f = {};
  // siglas que ficam inteiras em maiúsculas
  ("EV IM SC SF SG VO PA FR FC TC MS RX PS RM IC US RN UV ES UTI UBS AAS USG ECG PAS PAD PAC HIV PCR ITU SCQ BAV PEP AVC SRO OMA "+
   "IST PFE TGO TGP TEV VNI IAM SCA TFG HAS TCE DIU PEG IOT DTP ORL ITB HPV SAE AIT FDA EVA BRA AUC FPS SGB CVF SBP CTA AZT LDH "+
   "NS1 INR GDH SUS TEP SSJ EAP AHS IMC CAD EHH NPH VHS PAM OMS AAO HNS DIP AINE AINES MRSA ESBL CIWA SAMU IMAO PCDT IECA SRAG "+
   "CCIH VPPB IGIV ISRS IRSN LABA VEF1 CPAP CPRE HTLV AMIU COVID FLACC SINAN SAESC SALOX SALON SAAR SAA SAR IGHAR IGHAT IGHAHB "+
   "CRIE DPOC QT RT AD CAPS GINA HINTS DRESS SIADH EAACI O2 CO2 B6 B12 C3 III VII IX XII IR3535 L K U UI")
    .split(" ").forEach(s=> f[s] = s);
  // formas mistas (unidades e siglas com minúsculas)
  Object.assign(f, {ML:"mL", DL:"dL", MEQ:"mEq", MMHG:"mmHg", CMH2O:"cmH2O", PH:"pH", QTC:"QTc", HCG:"hCG", HIB:"Hib", KCL:"KCl",
    NACL:"NaCl", SPO2:"SpO2", SATO2:"SatO2", SAT:"Sat", FIO2:"FiO2", PAO2:"PaO2", PACO2:"PaCO2", CLCR:"ClCr", HBSAG:"HBsAg",
    BIPAP:"BiPAP", HBA1C:"HbA1c", "PIMÁX":"PImáx", "PEMÁX":"PEmáx", ISGLT2:"iSGLT2", MCISAAC:"McIsaac", DT:"dT"});
  // nomes próprios: só a inicial
  ("GUILLAIN BARRÉ WILLEBRAND LUND BROWDER PRITCHARD HOLLIDAY SEGAR GLASGOW CENTOR DIX HALLPIKE RAMSAY BRASIL GRAM RINGER "+
   "HARTMANN EPLEY REYE HUNT POTT UNNA PADUA CAINE TRIDIL CEFALIV CEFALIUM LÁCRIMA PLUS")
    .split(" ").forEach(s=> f[s] = s[0] + s.slice(1).toLowerCase());
  return f;
})();
// letras soltas que são sigla pelo contexto: "HEPATITE(S) B E C", "VITAMINA K", "GRUPO D", "URINA TIPO I", "NA, K, MG".
// Cada regra devolve [posição dentro do trecho achado, forma na tela].
const CX_CONTEXTO = [
  [/\b(?:HEPATITES?|VITAMINA|GRUPO|TIPO|INFLUENZA|NÍVEL|FATOR|PLANO|PLANOS) (?:[A-E]|I{1,3})\b/g, t=> [[t.lastIndexOf(" ")+1, t.slice(t.lastIndexOf(" ")+1)]]],
  [/\bHEPATITES B E C\b/g, t=> [[t.length-1, "C"]]],
  [/\bNA, K, MG\b/g, t=> [[0, "Na"], [t.length-2, "Mg"]]],
  [/\bK E MG\b/g, t=> [[t.length-2, "Mg"]]]
];
function cxHTML(s){
  s = String(s);
  const up = new Array(s.length).fill(false);   // true = a letra fica maiúscula na tela
  const marca = (ini, forma) => { for(let i=0;i<forma.length;i++) if(forma[i]!==forma[i].toLowerCase()) up[ini+i] = true; };
  const re = /[A-Za-zÀ-ÖØ-Ýà-öø-ý0-9]+/g;
  let m;
  while((m = re.exec(s))){ const forma = CX_FORMAS[m[0]]; if(forma) marca(m.index, forma); }
  // começo de frase depois de ". " / "! " / "? ": letra maiúscula, como na primeira palavra
  const frase = /[.!?]\s+(?=[A-ZÀ-Ý])/g;
  while((m = frase.exec(s))) up[m.index + m[0].length] = true;
  CX_CONTEXTO.forEach(([rx, pos])=>{
    rx.lastIndex = 0;
    while((m = rx.exec(s))) pos(m[0]).forEach(([d, forma])=> marca(m.index + d, forma));
  });
  let h = "", aberto = false;
  for(let i=0;i<s.length;i++){
    if(up[i] && !aberto){ h += '<span class="sg">'; aberto = true; }
    if(!up[i] && aberto){ h += "</span>"; aberto = false; }
    h += esc(s[i]);
  }
  return aberto ? h + "</span>" : h;
}
