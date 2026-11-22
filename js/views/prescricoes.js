/* views/prescricoes.js — aba Prescrições: lista de condições (#col-cond) e painel do meio (#col-mid). */
let activeCond = null;
let currentPac = "adulto";  // aba da condição (opção): "adulto" | "ped"
let currentSet = "amb";     // subopção dentro da aba: "amb" (ambulatorial) | "internacao"
let curCond = null;         // condição aberta no painel do meio
let curRecs = [];           // linhas de "Recomendações e instruções" da condição aberta (índice = data-o)
const PACS = [
  {key:"adulto", ic:"user", label:"Adulto"},       // ic = ícone de linha (css/icones.css)
  {key:"ped",    ic:"baby", label:"Pediátrico"}
];
const SETS = [
  {key:"amb",        ic:"house",    label:"Ambulatorial"},
  {key:"internacao", ic:"hospital", label:"Internação"}
];
// "mode" do bloco no DATA = paciente × subopção: "amb" (padrão) | "internacao" | "ped" (pediátrico ambulatorial) | "ped_internacao"
const MODE_OF = {adulto:{amb:"amb", internacao:"internacao"}, ped:{amb:"ped", internacao:"ped_internacao"}};
const modeOf = b => b.mode || "amb";
// seções do painel do meio, nesta ordem: "padrao" e "rec" abrem expandidas; "offlabel" (outras opções) fica recolhida.
// (os modelos do médico não entram aqui: ficam na aba "Meu rascunho" do topo)
const SECS = [
  {key:"padrao",   cls:"sec-pad",   label:"Padrão",                     none:"Nenhuma prescrição padrão cadastrada para esta condição ainda."},
  {key:"offlabel", cls:"sec-off",   label:"Outras opções",              none:"Nenhuma outra opção cadastrada para esta condição ainda."},
  {key:"rec",      cls:"sec-rec",   label:"Recomendações e instruções", none:"Nenhuma recomendação cadastrada para esta condição ainda."}
];
const condList = $("#cond-list"), midBody = $("#mid-body"), midTitle = $("#mid-title");

/* ---- lista de condições ---- */
function condBtn(id, ic, nm, sub, open){
  const el = document.createElement("button");
  el.type = "button";
  el.className = "cond" + (activeCond===id ? " active":"");
  el.dataset.id = id;
  el.setAttribute("aria-pressed", activeCond===id ? "true":"false");
  el.innerHTML = `<span class="ic" aria-hidden="true">${ic}</span>
    <span><span class="nm">${esc(nm)}</span><br><span class="sub">${esc(sub)}</span></span>`;
  el.onclick = ()=>{
    activeCond = id;
    condList.querySelectorAll(".cond.active").forEach(x=>{ x.classList.remove("active"); x.setAttribute("aria-pressed","false"); });
    el.classList.add("active"); el.setAttribute("aria-pressed","true");
    open();
    routeChanged();   // grava #/prescricoes/<id> (nova entrada no histórico)
  };
  condList.appendChild(el);
}
function renderConds(filter=""){
  const f = norm(filter.trim());   // sem diferenciar maiúsculas nem acentos ("infeccao" acha "infecção")
  condList.innerHTML = "";
  let n = 0;
  DATA.forEach(c=>{
    if(f && !norm(c.nm+" "+(c.sub||"")+" "+(KW[c.id]||"")).includes(f)) return;
    n++;
    // toda condição abre em Adulto › Ambulatorial
    condBtn(c.id, c.ic, c.nm, c.sub||"", ()=>{ currentPac = "adulto"; currentSet = "amb"; renderMid(c); });
  });
  $("#cond-count").textContent = f ? n : DATA.length;
  if(!condList.children.length) condList.innerHTML = `<div class="rx-empty">Nada encontrado.</div>`;
}

/* ---- painel do meio ---- */
function blockHTML({b,bi}){
  const isMenu = !!b.menu;
  // bloco que só vale para uma faixa de peso ("peso" no DATA): some quando o peso digitado está fora dela
  let h = `<div class="block${b.draft?' draft':''}"${b.peso?` data-pb="${bi}"`:''}${fits(b.peso)?'':' hidden'}>
      <div class="block-head">
        <button type="button" class="bl-toggle" aria-expanded="true" aria-controls="blk-${bi}"><span class="chev i i-chevron" aria-hidden="true"></span><span class="bl">${esc(b.label)}</span></button>
        ${b.draft?`<span class="tag draft" title="Rascunho gerado por IA — revise as doses antes de prescrever">rascunho</span>`:``}
        ${isMenu ? `<span class="tag menu">escolha 1</span>`
                 : `<button type="button" class="addall" data-b="${bi}"><span class="i i-plus" aria-hidden="true"></span><span class="al">Adicionar receita</span><span class="al-ok" aria-hidden="true">Bloco adicionado</span></button>`}
      </div><div class="items" id="blk-${bi}">`;
  b.items.forEach((it,ii)=>{
    const med=it[0], qty=it[1], pos=it[2]||"", route=it[3]||ORAL, spec=it[4];
    const rlab = route!==ORAL ? ` · <span class="qty">${cxHTML(route)}</span>`:"";
    // dose por peso: "{DOSE}" vira o valor calculado e "{FAIXA}" só a faixa do peso digitado (atualizados ao digitar o peso)
    const ptxt = spec ? posHTML(pos, spec, bi, ii) : cxHTML(pos);
    // opção que só vale para uma faixa de peso (spec.peso): some quando o peso digitado está fora dela
    const pf = spec && spec.peso;
    h += `<button type="button" class="item" data-b="${bi}" data-i="${ii}"${isMenu?' data-menu="1"':''}${pf?' data-pf="1"':''}${fits(pf)?'':' hidden'} aria-label="Adicionar ${esc(med)}">
        <span class="plus" aria-hidden="true"><span class="i i-plus"></span></span>
        <span class="txt"><span class="med cx">${cxHTML(med)} <span class="qty">— ${cxHTML(qty)}</span></span>
        <span class="pos cx">${ptxt}${rlab}</span></span></button>`;
  });
  return h + `</div></div>`;   // fecha .items e .block (antes os blocos ficavam aninhados)
}

// posologia no painel do meio: os trechos calculados viram <b class="dose"> / <span class="faixa">, atualizados por applyPeso()
function posHTML(pos, spec, bi, ii){
  return pos.split(/(\{DOSE\}|\{FAIXA\})/).map(p=>
    p==="{DOSE}" ? `<b class="dose${peso>0?'':' vazio'}" data-b="${bi}" data-i="${ii}">${cxHTML(doseTxt(spec))}</b>`
    : p==="{FAIXA}" ? `<span class="faixa${pickFaixa(spec)?' on':''}" data-b="${bi}" data-i="${ii}">${cxHTML(faixaTxt(spec))}</span>`
    : cxHTML(p)).join("");
}
function pesoHint(){
  return peso>0 ? `doses calculadas para ${num(peso,1)} kg` : "digite o peso para calcular as doses por kg";
}
// aplica o peso atual ao painel do meio sem redesenhar (o foco fica no campo de peso): doses, faixas,
// opções/blocos de outras faixas de peso (ocultos) e o aviso de quantos ficaram ocultos em cada seção
function applyPeso(){
  if(!curCond) return;
  const specOf = el => curCond.blocks[+el.dataset.b].items[+el.dataset.i][4];
  midBody.querySelectorAll(".dose").forEach(el=>{ el.innerHTML = cxHTML(doseTxt(specOf(el))); el.classList.toggle("vazio", !(peso>0)); });
  midBody.querySelectorAll(".faixa").forEach(el=>{ const sp = specOf(el); el.innerHTML = cxHTML(faixaTxt(sp)); el.classList.toggle("on", !!pickFaixa(sp)); });
  midBody.querySelectorAll(".item[data-pf]").forEach(el=>{ el.hidden = !fits(specOf(el).peso); });
  midBody.querySelectorAll(".block[data-pb]").forEach(el=>{ el.hidden = !fits(curCond.blocks[+el.dataset.pb].peso); });
  midBody.querySelectorAll(".sec").forEach(sec=>{
    const nota = sec.querySelector(".faixa-nota");
    if(!nota) return;
    const n = sec.querySelectorAll(".block[data-pb][hidden]").length + sec.querySelectorAll(".block:not([hidden]) .item[data-pf][hidden]").length;
    nota.hidden = !n;
    if(n) nota.textContent = `Mostrando só o que vale para ${num(peso,1)} kg — ${n} ${n>1?"opções":"opção"} de outra faixa de peso ${n>1?"ocultas":"oculta"}.`;
  });
  const hint = midBody.querySelector(".peso-hint");
  if(hint) hint.textContent = pesoHint();
  marcaSel();   // uma opção que saiu da faixa de peso muda o "Bloco adicionado"
}
// marca no painel do meio o que já está na receita (layout minimalista): a opção ganha o círculo cheio com ✓ e o fundo
// rosado (.sel); o bloco com todas as opções da faixa de peso na receita mostra "Bloco adicionado" (.tudo). Só classes:
// o texto e os atributos não mudam. Chamada por syncRx() (js/receita.js), por renderMid e a cada peso digitado.
function marcaSel(){
  const n = selected.length + orientSet.length, badge = $("#paineis-n");   // contador do botão "Receita" no celular
  badge.textContent = n; badge.hidden = !n;
  if(!curCond) return;
  const tem = new Set(selected.map(s=> keyOf(s.med, s.qty, s.route)));
  const naRx = it => tem.has(keyOf(it[0], it[1], it[3]||ORAL));
  midBody.querySelectorAll(".item[data-b]").forEach(el=> el.classList.toggle("sel", naRx(curCond.blocks[+el.dataset.b].items[+el.dataset.i])));
  midBody.querySelectorAll(".addall[data-b]").forEach(btn=>{
    const its = curCond.blocks[+btn.dataset.b].items.filter(it=> fits(it[4] && it[4].peso));
    btn.classList.toggle("tudo", its.length>0 && its.every(naRx));
  });
  midBody.querySelectorAll(".oitem[data-o]").forEach(el=>{ const r = curRecs[+el.dataset.o]; el.classList.toggle("sel", !!r && orientSet.includes(r.txt)); });
}
// peso mudou: atualiza o painel do meio e a receita
function refreshDoses(){ applyPeso(); syncRx(); }

// bind comum ao painel do meio: recolher seção / bloco
function bindBlocks(){
  midBody.querySelectorAll(".sec-head, .bl-toggle").forEach(t=>{
    t.onclick = ()=>{
      const collapsed = t.closest(t.classList.contains("sec-head") ? ".sec" : ".block").classList.toggle("collapsed");
      t.setAttribute("aria-expanded", collapsed ? "false" : "true");
    };
  });
}

function renderMid(c){
  painel("mid");   // celular: abrir (ou tocar de novo) uma condição mostra a Prescrição
  curCond = c;
  midTitle.textContent = c.nm;
  // contagem de blocos por "mode"; a aba mostra o total do paciente e a subopção, o do ambiente
  const counts = {};
  c.blocks.forEach(b=>{ counts[modeOf(b)] = (counts[modeOf(b)]||0)+1; });
  const nOf = (pac, set) => counts[MODE_OF[pac][set]]||0;
  const pacTabs = PACS.map(p=>{
    const n = nOf(p.key,"amb") + nOf(p.key,"internacao"), on = p.key===currentPac;
    return `<button type="button" role="tab" aria-selected="${on}" class="pac-tab${on?' active':''}${n?'':' empty'}" data-pac="${p.key}"><span class="i i-${p.ic}" aria-hidden="true"></span>${p.label}<span class="n">${n}</span></button>`;
  }).join("");
  const setBtns = SETS.map(st=>{
    const n = nOf(currentPac, st.key), on = st.key===currentSet;
    return `<button type="button" role="tab" aria-selected="${on}" class="set-btn${on?' active':''}${n?'':' empty'}" data-set="${st.key}"><span class="si i i-${st.ic}" aria-hidden="true"></span>${st.label}<span class="n">${n}</span></button>`;
  }).join("");
  const mode = MODE_OF[currentPac][currentSet], ped = currentPac==="ped";
  const shown = c.blocks.map((b,bi)=>({b,bi})).filter(x=> modeOf(x.b)===mode);
  // calculadora de peso: sempre no Pediátrico; no Adulto só se algum bloco/item depender do peso (dose, faixa ou opção por faixa)
  const pesoBox = ped || shown.some(x=> x.b.peso || x.b.items.some(it=> it[4]))
    ? `<div class="peso-box"><label for="peso"><span class="i i-scale" aria-hidden="true"></span> Peso ${ped?"da criança":"do paciente"}</label>
        <input id="peso" type="text" inputmode="decimal" autocomplete="off" placeholder="0" value="${peso>0?num(peso,1):""}"><span class="un">kg</span>
        <span class="peso-hint">${pesoHint()}</span></div>` : "";
  // ordem: título → abas Adulto | Pediátrico → subopção Ambulatorial | Internação → (peso) → seções
  let h = `<div class="mid-head pac-${currentPac}"><h3><span class="ic" aria-hidden="true">${c.ic}</span> ${esc(c.nm)}</h3><div class="desc">Clique em uma medicação para adicionar à receita ao lado.</div>${typeof guiaDaCond==="function" && guiaDaCond(c.id) ? `<button type="button" class="guia-link" data-guia="${esc(guiaDaCond(c.id).id)}" aria-haspopup="dialog" aria-controls="resumo"><span class="i i-book" aria-hidden="true"></span>Resumo clínico</button>` : ""}
    <div class="modo"><div class="pac-tabs" role="tablist" aria-label="Paciente">${pacTabs}</div>
    <div class="set-box" role="tablist" aria-label="Ambulatorial ou internação">${setBtns}</div></div>${pesoBox}</div>`;
  // recomendações e instruções: orientações de todos os blocos do modo, sem repetir — primeiro as do padrão,
  // depois as que só aparecem em blocos "offlabel" (outras opções). "rascunho" só se todas as origens forem rascunho;
  // a origem aparece quando a linha vem de um único bloco.
  const recs = curRecs = [];
  shown.forEach(({b})=> (b.orient||[]).forEach(o=>{
    const pad = b.sec!=="offlabel";
    const r = recs.find(x=> x.txt===o);
    if(r){ r.draft = r.draft && !!b.draft; r.pad = r.pad || pad; r.src.push(b); }
    else recs.push({txt:o, draft:!!b.draft, pad, src:[b]});
  }));
  if(shown.length===0){
    const p = PACS.find(x=>x.key===currentPac), st = SETS.find(x=>x.key===currentSet);
    h += `<div class="mode-empty"><span class="i i-${st.ic}" aria-hidden="true"></span> Sem prescrição <b>${esc(p.label.toLowerCase())} · ${esc(st.label.toLowerCase())}</b> cadastrada para esta condição ainda.</div>`;
  } else SECS.forEach(s=>{
    let n, body;
    if(s.key==="rec"){
      n = recs.length;
      const nPad = recs.filter(r=> r.pad).length;
      body = `<div class="orient-box"><div class="ohd"><span class="i i-info" aria-hidden="true"></span> Clique numa linha para adicionar
        <button type="button" class="orient-all"><span class="i i-plus" aria-hidden="true"></span>Adicionar todas${nPad && nPad<n ? ' do padrão' : ''}</button></div>`;
      const line = (r,ri)=>{
        const src = r.src.length===1 ? `<span class="src">${esc(r.src[0].label)}</span>` : "";
        return `<button type="button" class="oitem" data-o="${ri}"><span class="plus" aria-hidden="true"><span class="i i-plus"></span></span><span class="txt"><span class="ot cx">${cxHTML(r.txt)}</span>${src}</span>${r.draft?`<span class="tag" title="Rascunho gerado por IA — revise antes de usar">rascunho</span>`:``}</button>`;
      };
      recs.forEach((r,ri)=>{ if(r.pad) body += line(r,ri); });
      if(nPad < n){
        if(nPad) body += `<div class="osub">Das outras opções</div>`;
        recs.forEach((r,ri)=>{ if(!r.pad) body += line(r,ri); });
      }
      body += `</div>`;
    } else {
      const bl = shown.filter(x=> (x.b.sec||"padrao")===s.key);
      n = bl.length;
      body = bl.map(blockHTML).join("");
    }
    if(!n) body = `<div class="sec-empty">${s.none}</div>`;
    const open = s.key!=="offlabel";
    h += `<div class="sec ${s.cls}${open?'':' collapsed'}${n?'':' none'}">
      <button type="button" class="sec-head" aria-expanded="${open}" aria-controls="sec-${s.key}"><span class="chev i i-chevron" aria-hidden="true"></span>${s.label}<span class="sc">${n}</span></button>
      <div class="sec-body" id="sec-${s.key}">${body}${s.key!=="rec"?'<div class="faixa-nota" hidden></div>':''}</div></div>`;
  });
  midBody.innerHTML = h;
  applyPeso();   // avisos de opções ocultas por faixa de peso (e marca o que já está na receita)

  // bind: trocar Adulto | Pediátrico (mantém a subopção) e Ambulatorial | Internação; o foco volta para o botão clicado
  const pick = (sel, key, val)=>{ renderMid(c); const b = midBody.querySelector(`${sel}[data-${key}="${val}"]`); if(b) b.focus({preventScroll:true}); };
  midBody.querySelectorAll(".pac-tab").forEach(btn=>{
    btn.onclick = ()=>{ if(btn.dataset.pac!==currentPac){ currentPac = btn.dataset.pac; pick(".pac-tab", "pac", currentPac); } };
  });
  midBody.querySelectorAll(".set-btn").forEach(btn=>{
    btn.onclick = ()=>{ if(btn.dataset.set!==currentSet){ currentSet = btn.dataset.set; pick(".set-btn", "set", currentSet); } };
  });
  // bind: "Resumo clínico" abre o painel lateral com o resumo da condição (aba Guias)
  const gl = midBody.querySelector(".guia-link[data-guia]");
  if(gl) gl.onclick = ()=> resumoAbrir(gl.dataset.guia, gl);
  // bind: recolher seções / blocos
  bindBlocks();
  // bind: calculadora de peso (aceita vírgula; vazio ou 0 = sem peso)
  const pin = midBody.querySelector("#peso");
  if(pin) pin.oninput = ()=>{
    const v = parseFloat(pin.value.replace(",", "."));
    peso = v>0 && v<=250 ? v : null;
    refreshDoses();
  };
  // bind: adicionar bloco inteiro — só as medicações; as orientações são adicionadas à parte,
  // em "Recomendações e instruções"
  midBody.querySelectorAll(".addall[data-b]").forEach(btn=>{
    btn.onclick = ()=>{
      const b = c.blocks[+btn.dataset.b];
      let added=0;
      b.items.forEach(it=>{ if(fits(it[4] && it[4].peso)) added += addItem(it); });   // pula opções de outra faixa de peso
      toast(added ? `Bloco adicionado (${added} ${added>1?"itens":"item"})` : "Itens já estavam na receita", added>0);
    };
  });
  // bind: adicionar item individual (a linha inteira é o botão)
  midBody.querySelectorAll(".item").forEach(row=>{
    row.onclick = ()=>{
      const b = c.blocks[+row.dataset.b];
      const ii = +row.dataset.i;
      const it = b.items[ii];
      // bloco "escolha 1": mantém apenas uma opção por vez
      if(row.dataset.menu){
        b.items.forEach((other,oi)=>{
          if(oi===ii) return;
          const k = keyOf(other[0], other[1], other[3]||ORAL);
          const idx = selected.findIndex(s=> keyOf(s.med,s.qty,s.route)===k);
          if(idx>-1) selected.splice(idx,1);
        });
      }
      const ok = addItem(it);
      if(row.dataset.menu) refreshRx();
      toast(ok ? "Adicionado à receita" : "Esse item já está na receita", ok);
    };
  });
  // bind: adicionar recomendação individual / todas
  midBody.querySelectorAll(".oitem").forEach(row=>{
    row.onclick = ()=>{
      const ok = addOrient(recs[+row.dataset.o].txt);
      toast(ok ? "Orientação adicionada" : "Essa orientação já está na receita", ok);
    };
  });
  const all = midBody.querySelector(".orient-all");
  if(all) all.onclick = ()=>{
    // com linhas do padrão, "todas" = as do padrão; as das outras opções vão uma a uma
    const pick = recs.some(r=> r.pad) ? recs.filter(r=> r.pad) : recs;
    let a=0; pick.forEach(r=> a += addOrient(r.txt)?1:0 );
    toast(a>0?"Orientações adicionadas":"Já estavam na receita", a>0);
  };
}

$("#cond-search").oninput = e=> renderConds(e.target.value);
$("#cond-search").placeholder = `Filtrar ${DATA.length} condições...`;

/* ---- celular: um painel por vez (layout minimalista, 2026-11-21) ----
   Até 820px a aba Prescrições mostra só um dos três — Condições, Prescrição ou Receita — escolhido na barra #paineis do
   cabeçalho (body[data-painel], o CSS esconde os outros). Abrir uma condição vai para Prescrição; fechar, para Condições.
   No computador o atributo não faz nada (as três colunas aparecem lado a lado). */
function painel(p){
  document.body.dataset.painel = p;
  document.querySelectorAll("#paineis [data-painel]").forEach(b=> b.setAttribute("aria-pressed", b.dataset.painel===p ? "true" : "false"));
}
document.querySelectorAll("#paineis [data-painel]").forEach(b=> b.onclick = ()=>{
  painel(b.dataset.painel);
  if(pageScrolls()) window.scrollTo(0, 0);
});
painel("cond");

/* ---- "Resumo clínico": painel que desliza da direita (layout minimalista, 2026-11-21) ----
   Mostra o guia da condição (data/guias.js): o resumo, a conduta como pontos-chave, os sinais de alarme e o link para o
   guia completo na aba Guias (onde cada parte tem o seu Copiar). Esc, o ✕, um clique fora ou trocar de endereço fecham;
   o foco fica preso no painel enquanto ele está aberto e volta para o botão ao fechar. */
const resumoEl = $("#resumo"), resumoFundo = $("#resumo-fundo");
let resumoVolta = null, resumoTimer = null;
function resumoAbrir(gid, btn){
  const g = GUIA_ITENS.find(x=> x.id===gid);
  if(!g) return;
  const lista = s => `<ul>${(s.itens||[]).map(x=> `<li>${esc(x)}</li>`).join("")}</ul>`;
  const conduta = (g.secoes||[]).find(s=> /^conduta/i.test(s.t)) || (g.secoes||[]).find(s=> !s.alerta && !s.offlabel);
  const alerta = (g.secoes||[]).filter(s=> s.alerta);
  $("#resumo-titulo").textContent = curCond ? curCond.nm : g.nm;
  $("#resumo-corpo").innerHTML =
    (g.resumo ? `<p class="resumo-p">${esc(g.resumo)}</p>` : "") +
    (conduta ? `<section><h4>Pontos-chave</h4>${lista(conduta)}</section>` : "") +
    (alerta.length ? `<section class="resumo-alerta"><h4>Sinais de alarme</h4>${alerta.map(lista).join("")}</section>` : "") +
    `<a class="resumo-guia" href="#/guias/${esc(g.id)}">Abrir o guia completo<span class="i i-arrow-right" aria-hidden="true"></span></a>` +
    (g.draft ? `<p class="resumo-rasc"><span class="tag draft">rascunho</span> Texto gerado por IA a partir dos protocolos citados no guia, ainda não revisado.</p>` : "");
  $("#resumo-corpo").querySelector(".resumo-guia").onclick = ()=> resumoFechar(false);
  resumoVolta = btn || null;
  clearTimeout(resumoTimer);
  resumoEl.hidden = false; resumoFundo.hidden = false;
  $("#resumo-corpo").scrollTop = 0;
  requestAnimationFrame(()=> requestAnimationFrame(()=>{ resumoEl.classList.add("aberto"); resumoFundo.classList.add("aberto"); }));
  $("#resumo-fechar").focus({preventScroll:true});
}
function resumoFechar(volta = true){
  if(resumoEl.hidden) return;
  resumoEl.classList.remove("aberto"); resumoFundo.classList.remove("aberto");
  resumoTimer = setTimeout(()=>{ resumoEl.hidden = true; resumoFundo.hidden = true; }, 200);
  if(volta && resumoVolta && resumoVolta.isConnected) resumoVolta.focus({preventScroll:true});
  resumoVolta = null;
}
$("#resumo-fechar").onclick = ()=> resumoFechar();
resumoFundo.onclick = ()=> resumoFechar();
window.addEventListener("hashchange", ()=> resumoFechar(false));
document.addEventListener("keydown", e=>{
  if(resumoEl.hidden) return;
  if(e.key==="Escape"){ e.preventDefault(); e.stopPropagation(); resumoFechar(); return; }
  if(e.key==="Tab"){   // foco preso no painel
    const f = [...resumoEl.querySelectorAll("button, a[href]")];
    if(!f.length) return;
    const i = f.indexOf(document.activeElement);
    if(e.shiftKey && i<=0){ e.preventDefault(); f[f.length-1].focus(); }
    else if(!e.shiftKey && i===f.length-1){ e.preventDefault(); f[0].focus(); }
    else if(i<0){ e.preventDefault(); f[0].focus(); }
  }
}, true);

/* ---- abrir / fechar condição pelo id (endereço #/prescricoes/<id>, voltar/avançar, busca única) ---- */
const MID_EMPTY = midBody.innerHTML, MID_TITLE = midTitle.textContent;   // painel do meio sem condição aberta
// igual a clicar na condição na lista (Adulto › Ambulatorial); false se o id não existe
function openCond(id, how){
  const c = DATA.find(x=> x.id===id);
  if(!c) return false;
  activeCond = id;
  condList.querySelectorAll(".cond").forEach(x=>{
    const on = x.dataset.id===id;
    x.classList.toggle("active", on); x.setAttribute("aria-pressed", on ? "true" : "false");
  });
  currentPac = "adulto"; currentSet = "amb";
  renderMid(c);
  if(how==="search" || how==="load") revealCond();
  return true;
}
// mostra a condição aberta: no celular rola a página até o painel do meio; no computador, rola só a lista até ela
function revealCond(){
  if(pageScrolls()){ scrollIntoPlace($("#col-mid")); return; }
  const b = condList.querySelector(".cond.active");
  if(b){
    const top = b.offsetTop - condList.offsetTop, bot = top + b.offsetHeight;
    if(top < condList.scrollTop || bot > condList.scrollTop + condList.clientHeight) condList.scrollTop = top - condList.clientHeight/3;
  }
  midBody.scrollTop = 0;
}
// volta ao estado inicial (nenhuma condição aberta); a receita, o peso e o modo não mudam
function closeCond(){
  activeCond = null; curCond = null; painel("cond");
  condList.querySelectorAll(".cond.active").forEach(x=>{ x.classList.remove("active"); x.setAttribute("aria-pressed","false"); });
  midTitle.textContent = MID_TITLE;
  midBody.innerHTML = MID_EMPTY;
}

/* ---- registro da aba ---- */
registerView({
  key: "prescricoes", label: "Prescrições", icon: "💊",
  desc: "Escolha a queixa e monte a receita pronta para colar",
  cols: ["col-cond", "col-mid"], layout: "lista",
  itemId: () => curCond ? curCond.id : null,
  open: openCond,
  close: closeCond,
  // busca única: os mesmos campos do filtro da coluna (nome + subtítulo + KW)
  search: () => DATA.map(c=> ({id: c.id, ic: c.ic, title: c.nm, sub: c.sub||"", kw: KW[c.id]||""}))
});
