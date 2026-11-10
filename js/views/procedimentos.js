/* views/procedimentos.js — aba Procedimentos: lista por área (#col-proc-lista) + procedimento aberto (#col-proc).
   Conteúdo em data/procedimentos.js (PROC_AREAS, PROC_CAMPOS, PROCS). Página "padrão primeiro": o registro já vem
   preenchido com o padrão do procedimento e um Copiar; embaixo do texto, a linha rápida dos brancos que nunca têm
   padrão (lado, achados, medidas); o resto (Ajustar, Material, Passo a passo…) fica em caixas fechadas.
   prTexto(p, vals) troca {id} pelo valor (vazio → ____) e apaga as linhas cujo {id?} ficou vazio. */
const prLista = $("#pr-lista"), prBody = $("#pr-body"), prTitulo = $("#pr-titulo"), prBarra = $("#pr-barra");
const PR_LACUNA = "____";
let prAberto = null;          // procedimento aberto
const prEstado = {};          // por procedimento: {vals, mat: Set(índices marcados), abertas: Set(caixas abertas)} — dura a sessão

/* ---- dados ---- */
const prProc = id => PROCS.find(p=> p.id===id) || null;
const prArea = k => PROC_AREAS.find(a=> a.key===k);
const prUp = s => String(s == null ? "" : s).trim().toLocaleUpperCase("pt-BR");
// opções que vêm da tabela de intubação da aba Calculadoras (só leitura): "IOT.ind" → nomes dos indutores
function prFonte(f){
  const [tab, lista] = f.split(".");
  const t = typeof CALC_DADOS!=="undefined" && CALC_DADOS[tab] && CALC_DADOS[tab][lista];
  return t ? t.map(d=> prUp(d.n)) : [];
}
// campos do registro já resolvidos: os referidos por id vêm de PROC_CAMPOS; "registro.padrao" sobrepõe o padrão
// do campo (null tira); "fonte" busca as opções na tabela da Calculadoras
const prCamposCache = new Map();
function prCampos(p){
  if(prCamposCache.has(p.id)) return prCamposCache.get(p.id);
  const pad = p.registro.padrao || {};
  const cs = p.registro.campos.map(c=>{
    const o = typeof c==="string" ? {id: c, ...PROC_CAMPOS[c]} : {...c};
    if(o.id in pad) o.padrao = pad[o.id];
    if(o.padrao == null) delete o.padrao;
    if(o.fonte) o.opcoes = prFonte(o.fonte);
    return o;
  });
  prCamposCache.set(p.id, cs);
  return cs;
}
const prTemPadrao = c => c.padrao != null;
// linha rápida: os campos que nunca têm padrão (lado, achados, medidas) — ficam ____ até a pessoa escolher
const prRapidos = p => prCampos(p).filter(c=> c.tipo!=="derivado" && !c.opcional && !prTemPadrao(c));
// caixa Ajustar: os campos com padrão e os opcionais (observação)
const prAjustes = p => prCampos(p).filter(c=> c.tipo!=="derivado" && (prTemPadrao(c) || c.opcional));
function prPadraoVals(p){ const v = {}; prCampos(p).forEach(c=>{ if(prTemPadrao(c)) v[c.id] = c.padrao; }); return v; }
function prEst(p){ return prEstado[p.id] || (prEstado[p.id] = {vals: prPadraoVals(p), mat: new Set(), abertas: new Set()}); }
const prVal = (p, id) => String(prEst(p).vals[id] || "").trim();

/* ---- drogas da intubação: calculadas pela tabela da aba Calculadoras (CALC_DADOS.IOT + CM.bolus), nunca escritas aqui.
   Indutor no início da faixa da tabela, bloqueador no fim (dose de SRI). Volume arredondado ao que se aspira: ao mL
   inteiro a partir de 5 mL, a 0,1 mL abaixo disso; empate (x,5) arredonda para baixo. A dose em mg sai do volume. */
const prNum = s => { const n = parseFloat(String(s == null ? "" : s).replace(/\s/g, "").replace(",", ".")); return Number.isFinite(n) ? n : NaN; };
const prFmt = n => (Math.round(n*10)/10).toLocaleString("pt-BR", {maximumFractionDigits: 1});
function prArredMl(ml){ const passo = ml >= 5 ? 1 : 0.1; return Math.ceil(ml/passo - 0.5 - 1e-9) * passo; }
function prDroga(lista, nome, ponto, kg){
  const it = (CALC_DADOS.IOT[lista] || []).find(d=> prUp(d.n)===prUp(nome));
  if(!it || !it.c) return "";
  const b = CM.bolus(it, kg, null, false);
  const ml = prArredMl(ponto==="fim" ? b.ml[1] : b.ml[0]);
  return `${prUp(it.n)} ${prFmt(ml*it.c)} MG (${prFmt(ml)} ML)`;
}
// campo derivado: "usa" = campos que o alimentam (não vão sozinhos para o texto)
const PR_DERIVADOS = {
  sri: {usa: ["peso", "indutor", "bloqueador"], fn(vals){
    const kg = prNum(vals.peso);
    if(!(kg > 0) || typeof CALC_DADOS==="undefined" || typeof CM==="undefined") return "";
    const partes = [prDroga("ind", vals.indutor, "inicio", kg), prDroga("bnm", vals.bloqueador, "fim", kg)].filter(Boolean);
    return partes.length ? `${partes.join(" + ")} — PESO ${prFmt(kg)} KG` : "";
  }}
};
const prUsados = p => new Set(prCampos(p).flatMap(c=> c.tipo==="derivado" && PR_DERIVADOS[c.de] ? PR_DERIVADOS[c.de].usa : []));
function prValores(p, vals){
  const v = {...(vals || prEst(p).vals)};
  prCampos(p).forEach(c=>{ if(c.tipo==="derivado") v[c.id] = PR_DERIVADOS[c.de] ? PR_DERIVADOS[c.de].fn(v) : ""; });
  return v;
}

/* ---- texto do registro (determinístico: mesmos valores → mesmo texto) ----
   {id}: valor em maiúsculas, ou ____ se vazio. {id?}: opcional — se vazio, a linha inteira sai. */
function prTexto(p, vals){
  const all = prValores(p, vals);
  const v = id => prUp(all[id]);
  const out = [];
  p.registro.modelo.forEach(l=>{
    const opc = [...l.matchAll(/\{([a-z_]+)\?\}/g)].map(m=> m[1]);
    if(opc.some(id=> !v(id))) return;
    out.push(l.replace(/\{([a-z_]+)(\?)?\}/g, (_, id)=> v(id) || PR_LACUNA));
  });
  return out.join("\n");
}
const prPadraoTexto = p => prTexto(p, prPadraoVals(p));
// campos obrigatórios ainda vazios (os da linha rápida, ou um ajuste apagado)
// (um campo que só alimenta um derivado não conta: quem aparece é o derivado, ex.: "Drogas")
function prFaltam(p){ const all = prValores(p), usa = prUsados(p); return prCampos(p).filter(c=> !c.opcional && !usa.has(c.id) && !String(all[c.id] || "").trim()); }
// o que difere do padrão (só os ajustes; a linha rápida não conta)
function prMudancas(p){ const st = prEst(p); return prAjustes(p).filter(c=> String(st.vals[c.id] || "").trim() !== String(c.padrao || "").trim()); }

/* ---- lista ---- */
function prBuscaTexto(p){ return [p.nm, p.sub, p.kw, prArea(p.area).nm].join(" "); }
function prRenderLista(filtro=""){
  const f = norm(filtro.trim());
  let h = "", n = 0;
  PROC_AREAS.forEach(a=>{
    const ps = PROCS.filter(p=> p.area===a.key && (!f || norm(prBuscaTexto(p)).includes(f)));
    if(!ps.length) return;
    h += `<div class="pr-gh"><span aria-hidden="true">${a.ic}</span> ${esc(a.nm)}</div>`;
    ps.forEach(p=>{
      n++;
      h += `<button type="button" class="pr-item${prAberto===p ? " active" : ""}" data-id="${esc(p.id)}" aria-pressed="${prAberto===p}">
        <span class="nm">${esc(p.nm)}</span><span class="sub">${esc(p.sub)}</span></button>`;
    });
  });
  prLista.innerHTML = h || `<div class="rx-empty">Nada encontrado.</div>`;
  $("#pr-count").textContent = f ? n : PROCS.length;
  prLista.querySelectorAll(".pr-item").forEach(b=> b.onclick = ()=>{ prAbrir(b.dataset.id, "click"); routeChanged(); });
}

/* ---- página do procedimento ---- */
const prLi = arr => arr.map(x=> `<li>${esc(x)}</li>`).join("");
const prPlural = (n, um, varios) => `${n} ${n===1 ? um : varios}`;
function prPassos(arr){
  return arr.map(s=>{
    const o = typeof s==="string" ? {t: s} : s;
    return `<li><span class="t">${esc(o.t)}</span>${o.cuidado ? `<span class="pr-call cuidado"><b>Cuidado</b> ${esc(o.cuidado)}</span>` : ""}${o.dica ? `<span class="pr-call dica"><b>Dica</b> ${esc(o.dica)}</span>` : ""}</li>`;
  }).join("");
}
function prMaterial(p){
  const st = prEst(p);
  return `<div class="pr-mat-tools"><span class="pr-mat-n" id="pr-mat-n" aria-live="polite"></span>
      <button type="button" class="btn" id="pr-mat-copiar"><span aria-hidden="true">📋</span> Copiar material</button>
      <button type="button" class="btn ghostb" id="pr-mat-limpar">Desmarcar</button></div>
    <ul class="pr-check">${p.material.map((m, i)=> `<li><label><input type="checkbox" data-m="${i}"${st.mat.has(i) ? " checked" : ""}> <span>${esc(m)}</span></label></li>`).join("")}</ul>`;
}
// rótulo do botão de opção: o valor (em maiúsculas, vai assim para o texto) em caixa de frase, sem estragar siglas
const PR_SIGLAS = new Set(["EIC", "PVPI", "US", "LCR", "TC", "RX", "NINO", "TV", "FA", "TSV", "ETE", "SF", "ECG"]);
function prRotulo(o){
  if(o.length<=4) return o;
  let first = true;
  return o.split(/(\s+|\(|\)|\/|,)/).map(w=>{
    if(!/[A-ZÀ-Ú]/.test(w)) return w;
    const keep = /\d/.test(w) || PR_SIGLAS.has(w);
    const low = keep ? w : w.toLocaleLowerCase("pt-BR");
    const out = first && !keep ? low.charAt(0).toLocaleUpperCase("pt-BR") + low.slice(1) : low;
    first = false;
    return out;
  }).join("");
}
// um campo (linha rápida ou Ajustar): opções viram botões; texto/número vira caixa
function prCampoHTML(p, c, cls){
  const v = prEst(p).vals[c.id] || "", lid = `pr-c-${c.id}`;
  if(c.tipo==="opcoes"){
    return `<div class="${cls}" data-campo="${c.id}"><span class="lbl" id="${lid}">${esc(c.rotulo)}</span>
      <div class="pr-opcoes" role="group" aria-labelledby="${lid}">${c.opcoes.map(o=>
        `<button type="button" class="pr-op" data-c="${c.id}" data-v="${esc(o)}" aria-pressed="${o===v}">${esc(prRotulo(o))}</button>`).join("")}</div></div>`;
  }
  return `<div class="${cls}" data-campo="${c.id}"><label class="lbl" for="${lid}">${esc(c.rotulo)}${c.opcional ? " <small>(opcional)</small>" : ""}</label>
    <span class="pr-in${c.tipo==="num" ? " num" : ""}"><input id="${lid}" data-c="${c.id}" type="text" autocomplete="off"${c.tipo==="num" ? ' inputmode="decimal"' : ""} placeholder="${esc(c.dica || "")}" value="${esc(v)}">${c.un ? `<span class="un">${esc(c.un)}</span>` : ""}</span></div>`;
}
function prCaixa(p, key, titulo, resumo, corpo){
  const open = prEst(p).abertas.has(key) ? " open" : "";
  return `<details class="pr-cx pr-cx-${key}" data-cx="${key}" id="pr-cx-${key}"${open}><summary><span class="t">${titulo}</span><span class="s" id="pr-cx-s-${key}">${esc(resumo)}</span></summary>
    <div class="pr-cx-corpo">${corpo}</div></details>`;
}
function prAjustarHTML(p){
  const sri = prCampos(p).some(c=> c.tipo==="derivado" && c.de==="sri");
  return `${sri ? `<p class="pr-nota-calc">Drogas calculadas pela tabela de intubação da aba Calculadoras: indutor no início da faixa, bloqueador no fim (dose de SRI). Volume arredondado ao que se aspira (mL inteiro; abaixo de 5 mL, 0,1 mL).</p>` : ""}
    <div class="pr-campos">${prAjustes(p).map(c=> prCampoHTML(p, c, "pr-campo")).join("")}</div>
    <div class="pr-fim"><button type="button" class="btn" id="pr-voltar2" hidden>↺ Voltar ao padrão</button></div>`;
}
function prPagina(p){
  const st = prEst(p), rap = prRapidos(p);
  const passos = p.preparo.length + p.tecnica.length + p.depois.length;
  const caixas = [
    prCaixa(p, "ajustar", "Ajustar", "", prAjustarHTML(p)),
    prCaixa(p, "material", "Material", "", prMaterial(p)),
    prCaixa(p, "passos", "Passo a passo", prPlural(passos, "passo", "passos"),
      `<div class="pr-passos-wrap"><h5>Preparo</h5><ol class="pr-passos">${prPassos(p.preparo)}</ol>
        <h5>Técnica</h5><ol class="pr-passos">${prPassos(p.tecnica)}</ol>
        <h5>Confirmação e cuidados depois</h5><ol class="pr-passos">${prPassos(p.depois)}</ol></div>`),
    prCaixa(p, "indicacoes", "Indicações e contraindicações",
      `${prPlural(p.indicacoes.length, "indicação", "indicações")} · contraindicações: ${prPlural(p.contra.absolutas.length, "absoluta", "absolutas")}, ${prPlural(p.contra.relativas.length, "relativa", "relativas")}`,
      `<h5>Indicações</h5><ul>${prLi(p.indicacoes)}</ul>
       <h5>Contraindicações</h5><div class="pr-ci"><div><b class="abs">Absolutas</b><ul>${prLi(p.contra.absolutas)}</ul></div>
         <div><b class="rel">Relativas</b><ul>${prLi(p.contra.relativas)}</ul></div></div>`),
    prCaixa(p, "complicacoes", "Complicações", p.complicacoes.join(" · "), `<ul class="pr-tags">${prLi(p.complicacoes)}</ul>`),
    (p.calc || []).length ? prCaixa(p, "doses", "Doses", p.calc.map(([, t])=> t).join(" · "),
      `<div class="pr-calc">${p.calc.map(([id, t])=> `<a class="cx-link" href="#/calculadoras/${esc(id)}" data-calc="${esc(id)}">${esc(t)} <span aria-hidden="true">→</span></a>`).join("")}</div>`) : "",
    p.draft && (p.pendencias || []).length ? prCaixa(p, "revisor", "Para o revisor",
      prPlural(p.pendencias.length, "ponto a decidir ou conferir", "pontos a decidir ou conferir"), `<ul>${prLi(p.pendencias)}</ul>`) : "",
    prCaixa(p, "fontes", "Fontes", `${prPlural(p.fontes.length, "fonte", "fontes")} · ${p.revisado ? `revisado em ${p.revisado}` : "ainda não revisado pelo médico"}`,
      `<ul>${prLi(p.fontes)}</ul><p class="pr-rev">${p.revisado ? `Revisado em ${esc(p.revisado)}` : "Ainda não revisado pelo médico responsável."}</p>`)
  ].join("");
  return `<div class="pr-pag">
    <h3 id="pr-h" tabindex="-1">${esc(p.nm)} <span class="cx-tag" title="Conteúdo gerado por IA, ainda não revisado pelo médico">rascunho</span></h3>
    <section class="pr-padrao" id="pr-padrao" aria-labelledby="pr-padrao-h">
      <div class="pr-padrao-top"><h4 id="pr-padrao-h">Registro <span class="pr-estado" id="pr-estado">padrão</span></h4>
        <button type="button" class="btn ghostb" id="pr-voltar" hidden>↺ Voltar ao padrão</button>
        <button type="button" class="btn primary pr-copiar" id="pr-copiar"><span aria-hidden="true">📋</span> Copiar</button></div>
      <pre class="pr-texto" id="pr-texto" aria-label="Texto do registro"></pre>
      ${rap.length ? `<div class="pr-rapido" id="pr-rapido" role="group" aria-label="Preencher os brancos">${rap.map(c=> prCampoHTML(p, c, "pr-q")).join("")}</div>` : ""}
      <p class="pr-faltam" id="pr-faltam" aria-live="polite"></p>
    </section>
    <div class="pr-caixas">${caixas}</div>
  </div>`;
}

/* ---- ações ---- */
function prAtualizaNota(){
  const p = prAberto; if(!p) return;
  const txt = prTexto(p), falta = prFaltam(p), muda = prMudancas(p), aj = muda.length > 0;
  $("#pr-texto").innerHTML = esc(txt).split(PR_LACUNA).join(`<mark>${PR_LACUNA}</mark>`);
  const f = $("#pr-faltam");
  f.textContent = falta.length ? `Em branco: ${falta.map(c=> c.rotulo).join(", ")}` : "Sem brancos.";
  f.className = "pr-faltam" + (falta.length ? "" : " ok");
  const e = $("#pr-estado"); e.textContent = aj ? "ajustado" : "padrão"; e.classList.toggle("aj", aj);
  $("#pr-voltar").hidden = !aj; $("#pr-voltar2").hidden = !aj;
  const kg = prCampos(p).some(c=> c.id==="peso") ? `${prVal(p, "peso") || "—"} kg · ` : "";
  $("#pr-cx-s-ajustar").textContent = kg + (aj ? `ajustado · ${prPlural(muda.length, "mudança", "mudanças")}` : `padrão · ${prPlural(prAjustes(p).length, "campo", "campos")}`);
  $("#pr-cx-ajustar").classList.toggle("aj", aj);
}
async function prCopiarNota(){
  const p = prAberto; if(!p) return;
  const falta = prFaltam(p);
  const ok = await copyText(prTexto(p));
  if(!ok){ toast("Não foi possível copiar", false); return; }
  toast(falta.length ? `Copiado — em branco: ${falta.map(c=> c.rotulo).join(", ")}` : "Registro copiado!", !falta.length);
}
function prMatContador(){
  const p = prAberto, n = prEst(p).mat.size;
  $("#pr-mat-n").textContent = `${n}/${p.material.length} separados`;
  $("#pr-cx-s-material").textContent = prPlural(p.material.length, "item", "itens") + (n ? ` · ${n} separados` : "");
}
function prSincCampo(id){
  const v = prEst(prAberto).vals[id] || "";
  prBody.querySelectorAll(`.pr-op[data-c="${id}"]`).forEach(x=> x.setAttribute("aria-pressed", String(x.dataset.v===v)));
  const i = prBody.querySelector(`input[data-c="${id}"]`); if(i && i.value!==v) i.value = v;
}
function prVoltarPadrao(){
  const p = prAberto, st = prEst(p);
  prAjustes(p).forEach(c=>{ st.vals[c.id] = prTemPadrao(c) ? c.padrao : ""; prSincCampo(c.id); });
  prAtualizaNota(); toast("Padrão restaurado");
}
function prBind(){
  const p = prAberto, st = prEst(p);
  const pag = prBody.querySelector(".pr-pag");
  // caixas: lembra quais estão abertas (volta igual depois de trocar de aba ou ir à Calculadoras)
  prBody.querySelectorAll(".pr-cx").forEach(d=> d.addEventListener("toggle", ()=>{ d.open ? st.abertas.add(d.dataset.cx) : st.abertas.delete(d.dataset.cx); }));
  // checklist do material
  prBody.querySelectorAll(".pr-check input").forEach(i=> i.onchange = ()=>{ i.checked ? st.mat.add(+i.dataset.m) : st.mat.delete(+i.dataset.m); prMatContador(); });
  $("#pr-mat-copiar").onclick = async ()=>{
    const ok = await copyText(`MATERIAL — ${p.nm.toLocaleUpperCase("pt-BR")}\n` + p.material.map(m=> "- " + m).join("\n"));
    toast(ok ? "Material copiado!" : "Não foi possível copiar", ok);
  };
  $("#pr-mat-limpar").onclick = ()=>{ st.mat.clear(); prBody.querySelectorAll(".pr-check input").forEach(i=> i.checked = false); prMatContador(); };
  prMatContador();
  // opções: na linha rápida, clicar de novo desmarca; nos ajustes, a escolha fica (o caminho de volta é "Voltar ao padrão")
  prBody.querySelectorAll(".pr-op").forEach(b=> b.onclick = ()=>{
    const id = b.dataset.c, rapida = !!b.closest(".pr-q"), on = st.vals[id]===b.dataset.v;
    if(on && !rapida) return;
    st.vals[id] = on ? "" : b.dataset.v;
    prSincCampo(id);
    prAtualizaNota();
  });
  prBody.querySelectorAll("input[data-c]").forEach(i=> i.oninput = ()=>{ st.vals[i.dataset.c] = i.value; prAtualizaNota(); });
  $("#pr-copiar").onclick = prCopiarNota;
  $("#pr-voltar").onclick = prVoltarPadrao;
  $("#pr-voltar2").onclick = prVoltarPadrao;
  // teclado: Ctrl/Cmd+Enter copia de qualquer lugar da página; Enter num campo de texto vai para o próximo campo
  pag.onkeydown = e=>{
    if(e.key!=="Enter") return;
    if(e.ctrlKey || e.metaKey){ e.preventDefault(); prCopiarNota(); return; }
    if(e.target.matches("input[data-c]")){
      e.preventDefault();
      const caixa = e.target.closest(".pr-rapido, .pr-campos");
      const all = [...caixa.querySelectorAll("input[data-c], .pr-op")];
      const camp = e.target.closest("[data-campo]");
      const prox = all.find(x=> !camp.contains(x) && (camp.compareDocumentPosition(x) & Node.DOCUMENT_POSITION_FOLLOWING));
      (prox || $("#pr-copiar")).focus();
    }
  };
  prBody.querySelectorAll("[data-calc]").forEach(a=> a.onclick = e=>{ e.preventDefault(); navigate("calculadoras", a.dataset.calc, "click"); });
  prAtualizaNota();
}

function prAbrir(id, how){
  const p = prProc(id);
  if(!p) return false;
  prAberto = p;
  prLista.querySelectorAll(".pr-item").forEach(b=>{ const on = b.dataset.id===id; b.classList.toggle("active", on); b.setAttribute("aria-pressed", String(on)); });
  prTitulo.textContent = prArea(p.area).nm;
  prBody.innerHTML = prPagina(p);
  prBind();
  prBody.scrollTop = 0;
  if(pageScrolls() && (how==="click" || how==="search" || how==="load")) scrollIntoPlace($("#col-proc"));
  if(how!=="route" && !pageScrolls()) $("#pr-h").focus({preventScroll: true});
  prObservarCopiar();
  return true;
}
function prFechar(){
  prAberto = null;
  prLista.querySelectorAll(".pr-item.active").forEach(b=>{ b.classList.remove("active"); b.setAttribute("aria-pressed", "false"); });
  prTitulo.textContent = "Procedimento";
  prBody.innerHTML = `<div class="empty"><div class="big" aria-hidden="true">🩺</div><div class="ttl">Escolha um procedimento</div>
    <div class="sub">O registro padrão pronto para colar no prontuário, com material e passo a passo.</div></div>`;
  prObservarCopiar();
}

/* ---- celular: barra fixa com Copiar quando o Copiar do registro sai da tela ---- */
let prObs = null, prCopiarVisivel = false;
function prBarraEstado(){
  const mostrar = !!prAberto && currentView==="procedimentos" && pageScrolls() && !prCopiarVisivel;
  prBarra.hidden = !mostrar;
  document.body.classList.toggle("pr-com-barra", mostrar);
}
// "na tela" = inteiro e fora do header grudado no topo (no celular o header cobre o alto da página)
function prObservarCopiar(){
  if(prObs){ prObs.disconnect(); prObs = null; }
  prCopiarVisivel = false;
  const n = $("#pr-copiar"), hdr = document.querySelector("header.top");
  if(n && "IntersectionObserver" in window){
    const topo = pageScrolls() && hdr ? hdr.offsetHeight : 0;
    prObs = new IntersectionObserver(es=>{ prCopiarVisivel = es[0].isIntersecting && es[0].intersectionRatio > 0.99; prBarraEstado(); },
      {threshold: [0, 1], rootMargin: `-${topo}px 0px 0px 0px`});
    prObs.observe(n);
  }
  prBarraEstado();
}
// o foco nunca fica escondido: nem atrás da barra (a página sobe) nem atrás do header grudado no topo (a página desce)
$("#col-proc").addEventListener("focusin", e=>{
  if(!pageScrolls()) return;
  const r = e.target.getBoundingClientRect(), hdr = document.querySelector("header.top");
  const alto = hdr ? hdr.getBoundingClientRect().bottom : 0;
  if(r.top < alto + 4){ window.scrollBy(0, r.top - alto - 12); return; }
  if(prBarra.hidden) return;
  const topo = prBarra.getBoundingClientRect().top;
  if(r.bottom > topo - 8) window.scrollBy(0, r.bottom - topo + 16);
});
$("#pr-barra-copiar").onclick = prCopiarNota;
window.addEventListener("resize", ()=>{ if(prAberto) prObservarCopiar(); else prBarraEstado(); });
window.addEventListener("hashchange", ()=> setTimeout(prBarraEstado, 0));
$("#top-tabs").addEventListener("click", ()=> setTimeout(prBarraEstado, 0));
$("#pr-filtro").oninput = e=> prRenderLista(e.target.value);

/* ---- registro da aba ----
   rx:false = esta aba não usa a coluna da receita. */
prRenderLista();
prFechar();
registerView({
  key: "procedimentos", label: "Procedimentos", icon: "🩺",
  cols: ["col-proc-lista", "col-proc"], layout: "lista", rx: false,
  itemId: () => prAberto ? prAberto.id : null,
  open: prAbrir,
  close: prFechar,
  search: () => PROCS.map(p=> ({id: p.id, ic: prArea(p.area).ic, title: p.nm, sub: `${prArea(p.area).nm} · ${p.sub}`, kw: p.kw}))
});
