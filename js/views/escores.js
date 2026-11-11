/* views/escores.js — aba Escores: lista de escores (#col-esc-lista) e a calculadora (#col-esc).
   Dados: data/escores.js (window.ESCORES / window.GUIAS, cópia do Ficha Vermelha) e data/nihss.js.
   Cálculo e texto: js/escores-motor.js (FV) e js/escores-nihss.js (NIHSSM) — não reimplemente aqui.
   Esta aba não mostra a receita (registerView com rx: false). */
const ESC_DEFS = window.ESCORES || [];
const ESC_GUIAS = window.GUIAS || {};
// a NIHSS não está em ESCORES (no original ela tem página própria); mesma ficha que o Ficha Vermelha usa na lista
const ESC_NIHSS = {slug: "nihss", name: "NIHSS", title: "NIHSS", cat: "Neuro", kicker: "Neuro · AVC agudo", size: "15 itens",
                   what: "Gravidade do AVC agudo, item a item."};
// "Mais usados": NIHSS e os escores com featured, por rank (como no Ficha Vermelha); depois os outros, por categoria
const ESC_FEATURED = [ESC_NIHSS].concat(ESC_DEFS.filter(d=> d.featured).sort((a, b)=> (a.rank||99) - (b.rank||99)));
const ESC_OTHERS = ESC_DEFS.filter(d=> !d.featured);
const ESC_ALL = ESC_FEATURED.concat(ESC_OTHERS);
// apelidos do plantão para a busca (os mesmos do Ficha Vermelha, assets/nav.js)
const ESC_ALIAS = {
  "nihss": "avc derrame acidente vascular deficit",
  "abcd2": "ait avc transitorio",
  "wells-tep": "tep embolia tromboembolismo",
  "wells-tvp": "tvp trombose perna",
  "heart": "dor toracica sca iam infarto",
  "glasgow-blatchford": "hda hemorragia alta sangramento melena hematemese",
  "oakland": "hdb hemorragia baixa sangramento hematoquezia",
  "regra-canadense": "tce tc cranio trauma cabeca",
  "alvarado": "apendicite abdome dor",
  "ciwa-ar": "alcool abstinencia etilismo",
  "glasgow": "coma consciencia ecg",
  "perc": "tep embolia",
  "curb-65": "pneumonia pac",
  "ottawa": "tornozelo pe entorse raio x",
  "nexus": "cervical coluna pescoco trauma",
  "canadense-cervical": "cervical coluna pescoco trauma",
  "pecarn": "tce crianca pediatria cranio",
  "cha2ds2-va": "fa fibrilacao anticoagulacao chads chads2",
  "news2": "sepse deterioracao sinais vitais",
  "centor": "faringite amigdalite garganta mcisaac",
  "child-pugh": "cirrose figado hepatopatia",
  "sao-francisco": "sincope desmaio chess san francisco",
  "hints": "tontura vertigem nistagmo avc posterior neurite vestibular",
  "add-rs": "aorta dissecao addrs dor toracica d-dimero",
  "parkland": "queimadura queimado reposicao volemica regra dos 9 ringer",
  "ottawa-hsa": "hsa hemorragia subaracnoide cefaleia dor de cabeca trovoada aneurisma"
};
// índices e subscritos viram dígitos ("CHA₂DS₂" → "cha2ds2"), para buscar como se digita
const escDigits = s => String(s||"").replace(/[₀-₉]/g, c=> String(c.charCodeAt(0) - 8320)).replace(/²/g, "2");
const escKw = s => [s.title, s.cat, s.kicker, s.what, s.size, ESC_ALIAS[s.slug], s.slug.replace(/-/g, " "), escDigits(s.name), escDigits(s.title)].join(" ");

const escList = $("#esc-list"), escBody = $("#esc-body"), escTitle = $("#esc-title"), escBar = $("#esc-bar");
const ESC_EMPTY = escBody.innerHTML, ESC_TITLE = escTitle.textContent;
let curEsc = null;          // escore aberto: um item de ESC_ALL
let escV = {};              // respostas do escore aberto ({id: valor}), como o "v" do Ficha Vermelha
// formato e letras do texto para o prontuário (só na memória: valem para todos os escores até recarregar a página)
let escFmt = "lista", escCaixa = "normal";
const ESC_CAIXAS = [{id: "normal", label: "Normal"}, {id: "maiusculas", label: "MAIÚSCULAS"}, {id: "minusculas", label: "minúsculas"}];
const escComCaixa = t => escCaixa==="maiusculas" ? t.toLocaleUpperCase("pt-BR") : escCaixa==="minusculas" ? t.toLocaleLowerCase("pt-BR") : t;
const ESC_DISCLAIMER = "Ferramenta de apoio à decisão. Não substitui o julgamento clínico.";

/* ---- lista ---- */
function escRow(s){
  return `<button type="button" class="cond esc-row${curEsc && curEsc.slug===s.slug ? " active" : ""}" data-slug="${esc(s.slug)}" aria-pressed="${curEsc && curEsc.slug===s.slug}">
    <span><span class="nm">${esc(s.name)}</span><br><span class="sub">${esc(s.what)}</span></span></button>`;
}
function renderEscList(filter=""){
  const words = norm(filter).trim().split(/\s+/).filter(Boolean);
  const ok = s => words.every(w=> norm(s.name + " " + escKw(s)).includes(w));
  let h = "", n = 0;
  const group = (title, list)=>{
    const hits = list.filter(ok);
    if(!hits.length) return;
    n += hits.length;
    h += `<div class="esc-lgrp">${esc(title)}</div>` + hits.map(escRow).join("");
  };
  group("Mais usados", ESC_FEATURED);
  [...new Set(ESC_OTHERS.map(d=> d.cat))].sort((a, b)=> a.localeCompare(b, "pt-BR"))
    .forEach(cat=> group(cat, ESC_OTHERS.filter(d=> d.cat===cat)));
  escList.innerHTML = h || `<div class="rx-empty">Nenhum escore com esse nome.</div>`;
  $("#esc-count").textContent = words.length ? n : ESC_ALL.length;
  escList.querySelectorAll(".esc-row").forEach(b=> b.onclick = e=>{
    openEsc(b.dataset.slug, e.detail===0 ? "keyboard" : "click");
    routeChanged();
  });
}
$("#esc-search").oninput = e=> renderEscList(e.target.value);

/* ---- abrir / fechar ---- */
// abre o escore pelo slug (lista, endereço #/escores/<slug>, busca); false se não existe
function openEsc(slug, how){
  const s = ESC_ALL.find(x=> x.slug===slug);
  if(!s) return false;
  curEsc = s;
  escList.querySelectorAll(".esc-row").forEach(b=>{ const on = b.dataset.slug===slug; b.classList.toggle("active", on); b.setAttribute("aria-pressed", on ? "true" : "false"); });
  escTitle.textContent = s.name;
  if(slug==="nihss") renderNihss(); else renderEsc(s);
  escBody.scrollTop = 0;
  // no celular a calculadora fica embaixo da lista: rola até ela; no computador rola só a lista até o escore
  if(how!=="route"){
    if(pageScrolls()) scrollIntoPlace($("#col-esc"));
    else {
      const b = escList.querySelector(".esc-row.active");
      if(b){
        const top = b.offsetTop - escList.offsetTop, bot = top + b.offsetHeight;
        if(top < escList.scrollTop || bot > escList.scrollTop + escList.clientHeight) escList.scrollTop = top - escList.clientHeight/3;
      }
    }
  }
  // teclado: quem chegou pelo teclado (busca, Enter na lista) já começa no primeiro item
  if(how==="search" || how==="keyboard"){
    const first = escBody.querySelector("#nihss-rapida") || escBody.querySelector(".esc-item:not([hidden]) button, .esc-item:not([hidden]) input");
    if(first) first.focus({preventScroll: true});
    // NIHSS: a Entrada rápida já vem com os 15 zeros do padrão; selecionada, o que for digitado substitui tudo
    if(first && first.id==="nihss-rapida") first.select();
  }
  return true;
}
function closeEsc(){
  curEsc = null; escV = {};
  escList.querySelectorAll(".esc-row.active").forEach(b=>{ b.classList.remove("active"); b.setAttribute("aria-pressed", "false"); });
  escTitle.textContent = ESC_TITLE;
  escBody.innerHTML = ESC_EMPTY;
  escBar.hidden = true;
}

/* ---- pedaços comuns ---- */
const escSeg = (name, list, on) => `<div class="esc-seg" role="group" aria-label="${esc(name)}">` +
  list.map(x=> `<button type="button" data-${name==="Letras" ? "caixa" : name==="Momento" ? "mom" : "fmt"}="${esc(x.id)}" aria-pressed="${x.id===on}">${esc(x.label)}</button>`).join("") + `</div>`;
function escGuia(slug){
  const G = ESC_GUIAS[slug];
  if(!G) return "";
  return `<section class="esc-guia" aria-labelledby="esc-guia-t"><h4 id="esc-guia-t">O que cada resultado significa e o que fazer</h4>
    <div class="esc-guia-head" aria-hidden="true"><span>Resultado</span><span>O que significa</span><span>O que fazer depois</span></div>` +
    G.rows.map(r=> `<div class="esc-guia-row"><b class="g-r">${esc(r[0])}</b><p class="g-s"><span class="g-k">O que significa</span>${esc(r[1])}</p><p class="g-f"><span class="g-k">O que fazer</span>${esc(r[2])}</p></div>`).join("") +
    (G.obs ? `<p class="esc-guia-obs">${esc(G.obs)}</p>` : "") + `</section>`;
}
const ESC_PRINT_ICON = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 4h8v4H8z"/><path d="M6 8h12a2 2 0 0 1 2 2v6H4v-6a2 2 0 0 1 2-2z"/><path d="M7 16h10v4H7z"/></svg>`;
function escHead(s, extra){
  return `<div class="esc-head"><div><span class="esc-kicker">${esc(s.kicker)}</span><h3>${esc(s.title)}</h3><p class="esc-what">${esc(s.what)}</p>${extra||""}</div>
    <button type="button" class="btn esc-print" id="esc-print" title="Ficha para preencher à caneta">${ESC_PRINT_ICON} Imprimir ficha em branco</button></div>`;
}
// "Copiar para o prontuário" fica no cartão do resultado, logo abaixo do valor e da faixa: em 1366×768 e 1280×720
// o resultado e o botão aparecem sem rolar. As opções do texto (formato, letras) ficam recolhidas, com a escolha à vista.
const ESC_COPY_BTN = `<button type="button" class="btn primary esc-copy" id="esc-copy">Copiar para o prontuário</button>`;
const escCopyPanel = (visible, opts) => `<div class="esc-panel esc-pront"><h4>Para o prontuário</h4>${visible}
  <details class="esc-opcoes"><summary>Opções do texto: <span id="esc-opc-sum"></span></summary>${opts}</details>
  <pre class="esc-preview" id="esc-preview"></pre>
  <button type="button" class="btn ghost esc-reset" id="esc-reset">Zerar tudo</button></div>`;
const escOpcSum = (fmt, fmts) => (fmts.find(f=> f.id===fmt) || fmts[0]).label + " · " + (ESC_CAIXAS.find(c=> c.id===escCaixa) || ESC_CAIXAS[0]).label;
const ESC_FMTS = [{id: "lista", label: "Lista"}, {id: "linha", label: "Uma linha"}];
// barra fixa no celular: resultado e "Copiar" sempre à vista enquanto se preenche
function escBarSet(value, label, bg, fg){
  escBar.hidden = false;
  $("#esc-bar-v").textContent = value;
  const b = $("#esc-bar-b"); b.textContent = label; b.style.background = bg; b.style.color = fg;
}
// copiar: o texto exato do Ficha Vermelha (com o formato e as letras escolhidos)
async function escCopy(txt){
  const ok = await copyText(txt);
  const btn = $("#esc-copy");
  if(btn) btn.textContent = ok ? "Copiado — é só colar" : "Não deu para copiar — selecione o texto acima";
  $("#esc-bar-copy").textContent = ok ? "Copiado" : "Copiar";
  toast(ok ? "Copiado para o prontuário" : "Não foi possível copiar", ok);
  clearTimeout(escCopy.t);
  escCopy.t = setTimeout(()=>{ const b = $("#esc-copy"); if(b) b.textContent = "Copiar para o prontuário"; $("#esc-bar-copy").textContent = "Copiar"; }, 2500);
}
// teclado: escolher uma opção pelo teclado (Enter/Espaço) leva o foco ao próximo item; setas andam entre as opções
function escKeyNav(){
  escBody.querySelectorAll(".esc-opts").forEach(g=>{
    g.addEventListener("keydown", e=>{
      if(e.key!=="ArrowRight" && e.key!=="ArrowLeft") return;
      const bs = [...g.querySelectorAll("button")], i = bs.indexOf(document.activeElement);
      if(i<0) return;
      e.preventDefault();
      bs[(i + (e.key==="ArrowRight" ? 1 : -1) + bs.length) % bs.length].focus();
    });
  });
}
function escNext(row){
  const rows = [...escBody.querySelectorAll(".esc-item")].filter(r=> !r.hidden);
  const nx = rows[rows.indexOf(row) + 1];
  const t = nx ? nx.querySelector("button, input") : $("#esc-copy");
  if(t) t.focus();
}

/* ---- escores do motor comum ---- */
function escOptHTML(def, it){
  const pts = def.kind!=="rule" && def.kind!=="parkland";   // como as páginas do Ficha Vermelha: regras e Parkland sem pontos
  if(it.type==="num") return `<div class="esc-opts num"><input class="esc-num" type="text" inputmode="decimal" autocomplete="off" data-num aria-label="${esc(it.t)}"${it.ph?` placeholder="${esc(it.ph)}"`:""}><span class="unit">${esc(it.unit||"")}</span></div>`;
  if(it.type==="check") return `<div class="esc-opts yn" role="group" aria-label="${esc(it.t)}"><button type="button" class="esc-opt" data-val="0" aria-pressed="false">Não</button><button type="button" class="esc-opt" data-val="1" aria-pressed="false">Sim${pts && it.pts ? ` <b>${esc(FV.signed(it.pts))}</b>` : ""}</button></div>`;
  return `<div class="esc-opts" role="group" aria-label="${esc(it.t)}">` + it.opts.map((o, i)=>
    `<button type="button" class="esc-opt" data-val="${i}" aria-pressed="false">${pts && !it.noPts ? `<b>${o.p<0 ? "−" + FV.num(-o.p) : FV.num(o.p)}</b>` : ""}${esc(o.l||"")}</button>`).join("") + `</div>`;
}
function renderEsc(def){
  escV = FV.initState(def);
  let items = "";
  def.items.forEach(it=>{
    if(it.type==="group"){ items += `<h4 class="esc-grp">${esc(it.t)}</h4>`; return; }
    items += `<div class="esc-item" data-item="${esc(it.id)}"><div class="esc-lbl"><b>${esc(it.t)}</b>${it.h?`<small>${esc(it.h)}</small>`:""}</div>${escOptHTML(def, it)}</div>`;
  });
  const bands = def.bands.map((b, i)=> `<div class="esc-bandrow" data-band="${i}"><b>${esc(b.r)}</b><span>${esc(b.label)}</span></div>`).join("");
  const alt = def.alt ? `<p class="esc-hint">${esc(def.alt.title + ": " + def.alt.bands.map(b=> b.r + " " + b.label).join(" · ") + ".")}</p>` : "";
  escBody.innerHTML = `<div class="esc" data-slug="${esc(def.slug)}">${escHead(def)}
    <div class="esc-layout">
      <div class="esc-items">${items}${def.note?`<p class="esc-note">${esc(def.note)}</p>`:""}</div>
      <aside class="esc-side">
        <div class="esc-panel esc-res" aria-live="polite"><span class="esc-meta">Resultado${def.range ? " · " + esc(def.range) : ""}</span>
          <div class="esc-total-row"><span class="esc-total${def.kind==="rule" || def.kind==="parkland" ? " txt" : ""}" id="esc-value"></span><span class="esc-band" id="esc-band"></span></div>
          ${ESC_COPY_BTN}
          <p class="esc-rtext" id="esc-text"></p><p class="esc-rextra" id="esc-extra" hidden></p></div>
        ${escCopyPanel("", `<span class="esc-seg-l">Formato</span>${escSeg("Formato", ESC_FMTS, escFmt)}<span class="esc-hint" id="esc-fmt-hint"></span>
          <span class="esc-seg-l">Letras</span>${escSeg("Letras", ESC_CAIXAS, escCaixa)}`)}
        <div class="esc-panel"><h4>Interpretação</h4><div class="esc-bands">${bands}</div>${alt}</div>
      </aside>
      <div class="esc-foot">${escGuia(def.slug)}<p class="esc-ref">Fonte: ${esc(def.ref)}</p><p class="esc-disc">${ESC_DISCLAIMER}</p></div>
    </div></div>`;
  const itOf = id => FV.realItems(def).find(i=> i.id===id);
  // botões: a mesma regra do Ficha Vermelha (clicar de novo na opção marcada desmarca, exceto itens com valor padrão)
  escBody.querySelectorAll("[data-item]").forEach(row=>{
    const id = row.dataset.item, it = itOf(id);
    row.querySelectorAll("button[data-val]").forEach(b=> b.addEventListener("click", e=>{
      const val = b.dataset.val;
      if(it.type==="check") escV[id] = val==="1";
      else { const n = parseInt(val, 10); if(escV[id]===n && typeof it.def!=="number") delete escV[id]; else escV[id] = n; }
      escUpdate(def);
      if(e.detail===0) escNext(row);
    }));
    const inp = row.querySelector("input[data-num]");
    if(inp) inp.addEventListener("input", ()=>{
      const n = parseFloat(inp.value.replace(/\./g, "").replace(",", "."));
      if(isNaN(n) || n < (it.min || 0) || (it.max && n > it.max)) delete escV[id]; else escV[id] = n;
      inp.classList.toggle("bad", inp.value.trim()!=="" && typeof escV[id]!=="number");
      escUpdate(def);
    });
    if(inp) inp.addEventListener("keydown", e=>{ if(e.key==="Enter"){ e.preventDefault(); escNext(row); } });
  });
  escBody.querySelectorAll("[data-fmt]").forEach(b=> b.onclick = ()=>{ escFmt = b.dataset.fmt; escUpdate(def); });
  escBody.querySelectorAll("[data-caixa]").forEach(b=> b.onclick = ()=>{ escCaixa = b.dataset.caixa; escUpdate(def); });
  $("#esc-copy").onclick = ()=> escCopy(escComCaixa(FV.buildText(def, escV, escFmt)));
  $("#esc-reset").onclick = ()=>{
    escV = FV.initState(def);
    escBody.querySelectorAll("input[data-num]").forEach(i=>{ i.value = ""; i.classList.remove("bad"); });
    escUpdate(def);
  };
  $("#esc-print").onclick = ()=> escPrint(()=>{ $("#ficha").innerHTML = FV.fichaHTML(def, escV, true).replace('<div class="fbrand">Ficha Vermelha</div>', '<div class="fbrand">Queixa Principal</div>'); });
  escKeyNav();
  escUpdate(def);
}
// redesenha o estado (mesma lógica do update() do Ficha Vermelha)
function escUpdate(def){
  const R = FV.evaluate(def, escV);
  escBody.querySelectorAll("[data-item]").forEach(row=>{
    const id = row.dataset.item, it = FV.realItems(def).find(i=> i.id===id);
    row.hidden = !FV.visible(it, escV);
    row.classList.toggle("done", it.type==="check" ? !!escV[id] : typeof escV[id]==="number");
    row.querySelectorAll("button[data-val]").forEach(b=>{
      const val = b.dataset.val;
      const on = it.type==="check" ? (val==="1")===!!escV[id] : parseInt(val, 10)===escV[id];
      b.setAttribute("aria-pressed", on ? "true" : "false");
    });
  });
  const lv = R.band ? FV.LEVELS[R.band.level] : FV.LEVELS[0];
  const label = R.band ? R.band.label : "Responda todos os itens";
  $("#esc-value").textContent = R.valueText;
  const band = $("#esc-band");
  band.textContent = label; band.style.background = lv.bg; band.style.color = lv.fg;
  $("#esc-text").textContent = R.band ? R.band.text : "Faltam: " + R.missing.map(it=> it.t.toLowerCase()).join(", ") + ".";
  const ex = $("#esc-extra");
  ex.textContent = R.extra || (R.altLabel ? "Modelo de três níveis: " + R.altLabel + "." : "");
  ex.hidden = !ex.textContent;
  escBody.querySelectorAll("[data-band]").forEach(el=> el.classList.toggle("on", !!(R.band && parseInt(el.dataset.band, 10)===R.bandIdx)));
  escBody.querySelectorAll("[data-fmt]").forEach(b=> b.setAttribute("aria-pressed", b.dataset.fmt===escFmt ? "true" : "false"));
  escBody.querySelectorAll("[data-caixa]").forEach(b=> b.setAttribute("aria-pressed", b.dataset.caixa===escCaixa ? "true" : "false"));
  $("#esc-fmt-hint").textContent = escFmt==="linha" ? "Tudo numa linha, para prontuários que juntam as linhas." : "Um item por linha, com a resposta e os pontos.";
  $("#esc-opc-sum").textContent = escOpcSum(escFmt, ESC_FMTS);
  $("#esc-preview").textContent = escComCaixa(FV.buildText(def, escV, escFmt));
  escBarSet(R.valueText, label, lv.bg, lv.fg);
}

/* ---- NIHSS (página própria no original) ---- */
// padrão do Queixa Principal (pedido do dono): a NIHSS abre com os 15 itens em 0 (exame normal), pronta para copiar;
// o médico muda só o que está alterado. O cálculo e o texto continuam os do original (NIHSSM), só o estado inicial muda.
const nihssPadrao = () => Object.fromEntries(NIHSS.ITEMS.map(it=> [it.id, 0]));
function renderNihss(){
  const S = NIHSSM.state;
  S.v = nihssPadrao();
  if(!NIHSS.FMTS.some(f=> f.id===S.fmt)) S.fmt = "lista";
  const items = NIHSS.ITEMS.map(it=>
    `<div class="esc-item" data-item="${esc(it.id)}"><div class="esc-lbl"><span class="esc-chip">${esc(it.id)}</span><div><b>${esc(it.t)}</b><small>${esc(it.h)}</small></div></div>
     <div class="esc-opts" role="group" aria-label="${esc(it.t)}">${it.o.map((l, n)=> `<button type="button" class="esc-opt" data-val="${n}" aria-pressed="false"><b>${n}</b>${esc(l)}</button>`).join("")}</div></div>`).join("");
  escBody.innerHTML = `<div class="esc esc-nihss" data-slug="nihss">${escHead(ESC_NIHSS, `<span class="esc-credit">Versão brasileira: Pontes-Neto (HCFMRP-USP)</span>`)}
    <div class="esc-layout">
      <div class="esc-items">${items}<p class="esc-note">Pontuar o que o paciente faz, não o que se acha que ele consegue. Registrar a 1ª resposta. Começa com tudo em 0 (exame normal): marque só o que estiver alterado. Clique de novo para desmarcar (item não avaliado).</p></div>
      <aside class="esc-side">
        <div class="esc-panel esc-res" aria-live="polite"><div class="esc-meta esc-meta2"><span>Total · 0 a 42</span><span id="nihss-answered">0 de 15 itens</span></div>
          <div class="esc-total-row"><span class="esc-total" id="esc-value">0</span><span class="esc-band" id="esc-band">Clique nas respostas</span></div>
          ${ESC_COPY_BTN}
          <div class="esc-scale"><div class="esc-scale-bar"><i style="flex:1;background:#E3E8EA"></i><i style="flex:4;background:#F6D58B"></i><i style="flex:11;background:#F2A65A"></i><i style="flex:5;background:#E07A4F"></i><i style="flex:22;background:#C2413A"></i></div><div class="esc-marker" id="nihss-marker"></div></div></div>
        <div class="esc-panel"><label class="esc-seg-l" for="nihss-rapida">Entrada rápida</label>
          <input id="nihss-rapida" class="esc-rapida" type="text" inputmode="numeric" maxlength="15" autocomplete="off" placeholder="Digite os 15 escores em ordem">
          <span class="esc-warn" id="nihss-warn" hidden></span>
          <span class="esc-hint">Um dígito por item, de 1a até 11. Os botões ao lado acompanham.</span></div>
        ${escCopyPanel(`<span class="esc-seg-l">Momento</span>${escSeg("Momento", NIHSS.MOMENTS.map(m=> ({id: m, label: m})), S.moment)}`,
          `<span class="esc-seg-l">Formato</span>${escSeg("Formato", NIHSS.FMTS, S.fmt)}<span class="esc-hint" id="esc-fmt-hint"></span>
          <span class="esc-seg-l">Letras</span>${escSeg("Letras", ESC_CAIXAS, escCaixa)}`)}
      </aside>
      <div class="esc-foot">${escGuia("nihss")}<p class="esc-disc">${ESC_DISCLAIMER}</p></div>
    </div></div>`;
  escBody.querySelectorAll("[data-item]").forEach(row=>{
    const id = row.dataset.item;
    row.querySelectorAll("button[data-val]").forEach(b=> b.addEventListener("click", e=>{
      const n = +b.dataset.val;
      if(S.v[id]===n) delete S.v[id]; else S.v[id] = n;
      $("#nihss-warn").hidden = true;
      nihssUpdate(true);
      if(e.detail===0) escNext(row);
    }));
  });
  const rap = $("#nihss-rapida");
  rap.addEventListener("input", ()=>{
    const r = NIHSSM.parseQuick(rap.value);
    S.v = r.v;
    $("#nihss-warn").textContent = r.warn;
    $("#nihss-warn").hidden = !r.warn;
    nihssUpdate(false);
    rap.value = NIHSSM.quickString();
  });
  escBody.querySelectorAll("[data-mom]").forEach(b=> b.onclick = ()=>{ S.moment = b.dataset.mom; nihssUpdate(false); });
  escBody.querySelectorAll("[data-fmt]").forEach(b=> b.onclick = ()=>{ S.fmt = b.dataset.fmt; nihssUpdate(false); });
  escBody.querySelectorAll("[data-caixa]").forEach(b=> b.onclick = ()=>{ escCaixa = b.dataset.caixa; nihssUpdate(false); });
  // como no original: sem nenhum item marcado (só desmarcando tudo à mão, ou apagando a Entrada rápida) não há o que copiar
  $("#esc-copy").onclick = ()=>{ if(NIHSSM.totals().answered===0) return; escCopy(escComCaixa(NIHSSM.buildText())); };
  // "Zerar tudo" volta ao padrão: todos os itens em 0
  $("#esc-reset").onclick = ()=>{ S.v = nihssPadrao(); $("#nihss-warn").hidden = true; nihssUpdate(true); };
  $("#esc-print").onclick = ()=> escPrint(()=>{
    $("#ficha").innerHTML = $("#tpl-ficha-nihss").innerHTML;
    $("#ficha").querySelectorAll("img[data-src]").forEach(i=> i.src = i.dataset.src);
    NIHSSM.renderFicha(true);
  }, NIHSSM.whenFigs);
  escKeyNav();
  nihssUpdate(true);
}
function nihssUpdate(syncQuick){
  const S = NIHSSM.state, T = NIHSSM.totals();
  escBody.querySelectorAll("[data-item]").forEach(row=>{
    const id = row.dataset.item;
    row.classList.toggle("done", NIHSSM.has(id));
    row.querySelectorAll("button[data-val]").forEach(b=> b.setAttribute("aria-pressed", S.v[id]===+b.dataset.val ? "true" : "false"));
  });
  $("#esc-value").textContent = T.total;
  const band = $("#esc-band");
  band.textContent = T.band.label; band.style.background = T.band.bg; band.style.color = T.band.fg;
  $("#nihss-answered").textContent = T.answered + " de 15 itens";
  $("#nihss-marker").style.left = Math.min(100, Math.max(0, T.total / 42 * 100)).toFixed(1) + "%";
  if(syncQuick) $("#nihss-rapida").value = NIHSSM.quickString();
  escBody.querySelectorAll("[data-mom]").forEach(b=> b.setAttribute("aria-pressed", b.dataset.mom===S.moment ? "true" : "false"));
  escBody.querySelectorAll("[data-fmt]").forEach(b=> b.setAttribute("aria-pressed", b.dataset.fmt===S.fmt ? "true" : "false"));
  escBody.querySelectorAll("[data-caixa]").forEach(b=> b.setAttribute("aria-pressed", b.dataset.caixa===escCaixa ? "true" : "false"));
  $("#esc-fmt-hint").textContent = (NIHSS.FMTS.find(f=> f.id===S.fmt) || NIHSS.FMTS[0]).hint;
  $("#esc-opc-sum").textContent = escOpcSum(S.fmt, NIHSS.FMTS);
  $("#esc-preview").textContent = escComCaixa(NIHSSM.buildText());
  escBarSet(T.total, T.band.label, T.band.bg, T.band.fg);
}

/* ---- ficha em branco para imprimir (como o botão "Imprimir ficha em branco" do Ficha Vermelha) ---- */
function escPrint(fill, wait){
  fill();
  document.body.classList.add("imprimindo");
  const go = ()=> window.print();
  if(wait) wait(go); else go();
}
window.addEventListener("afterprint", ()=>{ document.body.classList.remove("imprimindo"); $("#ficha").innerHTML = ""; });
$("#esc-bar-copy").onclick = ()=>{ const b = $("#esc-copy"); if(b) b.click(); };

/* ---- registro da aba ---- */
registerView({
  key: "escores", label: "Escores", icon: "📊",
  desc: "HEART, Wells, NIHSS e mais, com o texto para o prontuário",
  cols: ["col-esc-lista", "col-esc"], layout: "lista", rx: false,
  itemId: () => curEsc ? curEsc.slug : null,
  open: openEsc,
  close: closeEsc,
  search: () => ESC_ALL.map(s=> ({id: s.slug, title: s.name, sub: s.kicker, kw: escKw(s)}))
});
