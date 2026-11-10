/* views/prescricoes.js — aba Prescrições: lista de condições (#col-cond) e painel do meio (#col-mid). */
let activeCond = null;
let currentPac = "adulto";  // aba da condição (opção): "adulto" | "ped"
let currentSet = "amb";     // subopção dentro da aba: "amb" (ambulatorial) | "internacao"
let curCond = null;         // condição aberta no painel do meio
const PACS = [
  {key:"adulto", ic:"🧑", label:"Adulto"},
  {key:"ped",    ic:"👶", label:"Pediátrico"}
];
const SETS = [
  {key:"amb",        ic:"🏠", label:"Ambulatorial"},
  {key:"internacao", ic:"🏥", label:"Internação"}
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
        <button type="button" class="bl-toggle" aria-expanded="true" aria-controls="blk-${bi}"><span class="chev" aria-hidden="true">▸</span><span class="bl">${esc(b.label)}</span></button>
        ${b.draft?`<span class="tag draft" title="Rascunho gerado por IA — revise as doses antes de prescrever">rascunho</span>`:``}
        ${isMenu ? `<span class="tag menu">escolha 1</span>`
                 : `<button type="button" class="addall" data-b="${bi}">＋ Adicionar receita</button>`}
      </div><div class="items" id="blk-${bi}">`;
  b.items.forEach((it,ii)=>{
    const med=it[0], qty=it[1], pos=it[2]||"", route=it[3]||ORAL, spec=it[4];
    const rlab = route!==ORAL ? ` · <span class="qty">${esc(route)}</span>`:"";
    // dose por peso: "{DOSE}" vira o valor calculado e "{FAIXA}" só a faixa do peso digitado (atualizados ao digitar o peso)
    const ptxt = spec ? posHTML(pos, spec, bi, ii) : esc(pos);
    // opção que só vale para uma faixa de peso (spec.peso): some quando o peso digitado está fora dela
    const pf = spec && spec.peso;
    h += `<button type="button" class="item" data-b="${bi}" data-i="${ii}"${isMenu?' data-menu="1"':''}${pf?' data-pf="1"':''}${fits(pf)?'':' hidden'} aria-label="Adicionar ${esc(med)}">
        <span class="plus" aria-hidden="true">＋</span>
        <span class="txt"><span class="med">${esc(med)} <span class="qty">— ${esc(qty)}</span></span>
        <span class="pos">${ptxt}${rlab}</span></span></button>`;
  });
  return h + `</div></div>`;   // fecha .items e .block (antes os blocos ficavam aninhados)
}

// posologia no painel do meio: os trechos calculados viram <b class="dose"> / <span class="faixa">, atualizados por applyPeso()
function posHTML(pos, spec, bi, ii){
  return pos.split(/(\{DOSE\}|\{FAIXA\})/).map(p=>
    p==="{DOSE}" ? `<b class="dose${peso>0?'':' vazio'}" data-b="${bi}" data-i="${ii}">${esc(doseTxt(spec))}</b>`
    : p==="{FAIXA}" ? `<span class="faixa${pickFaixa(spec)?' on':''}" data-b="${bi}" data-i="${ii}">${esc(faixaTxt(spec))}</span>`
    : esc(p)).join("");
}
function pesoHint(){
  return peso>0 ? `doses calculadas para ${num(peso,1)} kg` : "digite o peso para calcular as doses por kg";
}
// aplica o peso atual ao painel do meio sem redesenhar (o foco fica no campo de peso): doses, faixas,
// opções/blocos de outras faixas de peso (ocultos) e o aviso de quantos ficaram ocultos em cada seção
function applyPeso(){
  if(!curCond) return;
  const specOf = el => curCond.blocks[+el.dataset.b].items[+el.dataset.i][4];
  midBody.querySelectorAll(".dose").forEach(el=>{ el.textContent = doseTxt(specOf(el)); el.classList.toggle("vazio", !(peso>0)); });
  midBody.querySelectorAll(".faixa").forEach(el=>{ const sp = specOf(el); el.textContent = faixaTxt(sp); el.classList.toggle("on", !!pickFaixa(sp)); });
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
  curCond = c;
  midTitle.textContent = c.nm;
  // contagem de blocos por "mode"; a aba mostra o total do paciente e a subopção, o do ambiente
  const counts = {};
  c.blocks.forEach(b=>{ counts[modeOf(b)] = (counts[modeOf(b)]||0)+1; });
  const nOf = (pac, set) => counts[MODE_OF[pac][set]]||0;
  const pacTabs = PACS.map(p=>{
    const n = nOf(p.key,"amb") + nOf(p.key,"internacao"), on = p.key===currentPac;
    return `<button type="button" role="tab" aria-selected="${on}" class="pac-tab${on?' active':''}${n?'':' empty'}" data-pac="${p.key}"><span aria-hidden="true">${p.ic}</span>${p.label}<span class="n">${n}</span></button>`;
  }).join("");
  const setBtns = SETS.map(st=>{
    const n = nOf(currentPac, st.key), on = st.key===currentSet;
    return `<button type="button" role="tab" aria-selected="${on}" class="set-btn${on?' active':''}${n?'':' empty'}" data-set="${st.key}"><span class="si" aria-hidden="true">${st.ic}</span>${st.label}<span class="n">${n}</span></button>`;
  }).join("");
  const mode = MODE_OF[currentPac][currentSet], ped = currentPac==="ped";
  const shown = c.blocks.map((b,bi)=>({b,bi})).filter(x=> modeOf(x.b)===mode);
  // calculadora de peso: sempre no Pediátrico; no Adulto só se algum bloco/item depender do peso (dose, faixa ou opção por faixa)
  const pesoBox = ped || shown.some(x=> x.b.peso || x.b.items.some(it=> it[4]))
    ? `<div class="peso-box"><label for="peso"><span aria-hidden="true">⚖️</span> Peso ${ped?"da criança":"do paciente"}</label>
        <input id="peso" type="text" inputmode="decimal" autocomplete="off" placeholder="0" value="${peso>0?num(peso,1):""}"><span class="un">kg</span>
        <span class="peso-hint">${pesoHint()}</span></div>` : "";
  // ordem: título → abas Adulto | Pediátrico → subopção Ambulatorial | Internação → (peso) → seções
  let h = `<div class="mid-head pac-${currentPac}"><h3><span aria-hidden="true">${c.ic}</span> ${esc(c.nm)}</h3><div class="desc">${esc(c.sub||"")} · clique num item, ou em <b>Adicionar receita</b> num bloco inteiro.</div>
    <div class="pac-tabs" role="tablist" aria-label="Paciente">${pacTabs}</div>
    <div class="set-box" role="tablist" aria-label="Ambulatorial ou internação">${setBtns}</div>${pesoBox}</div>`;
  // recomendações e instruções: orientações de todos os blocos do modo, sem repetir — primeiro as do padrão,
  // depois as que só aparecem em blocos "offlabel" (outras opções). "rascunho" só se todas as origens forem rascunho;
  // a origem aparece quando a linha vem de um único bloco.
  const recs = [];
  shown.forEach(({b})=> (b.orient||[]).forEach(o=>{
    const pad = b.sec!=="offlabel";
    const r = recs.find(x=> x.txt===o);
    if(r){ r.draft = r.draft && !!b.draft; r.pad = r.pad || pad; r.src.push(b); }
    else recs.push({txt:o, draft:!!b.draft, pad, src:[b]});
  }));
  if(shown.length===0){
    const p = PACS.find(x=>x.key===currentPac), st = SETS.find(x=>x.key===currentSet);
    h += `<div class="mode-empty"><span aria-hidden="true">${st.ic}</span> Sem prescrição <b>${esc(p.label.toLowerCase())} · ${esc(st.label.toLowerCase())}</b> cadastrada para esta condição ainda.</div>`;
  } else SECS.forEach(s=>{
    let n, body;
    if(s.key==="rec"){
      n = recs.length;
      const nPad = recs.filter(r=> r.pad).length;
      body = `<div class="orient-box"><div class="ohd"><span aria-hidden="true">🛈</span> Clique numa linha para adicionar
        <button type="button" class="orient-all">＋ Adicionar todas${nPad && nPad<n ? ' do padrão' : ''}</button></div>`;
      const line = (r,ri)=>{
        const src = r.src.length===1 ? `<span class="src">${esc(r.src[0].label)}</span>` : "";
        return `<button type="button" class="oitem" data-o="${ri}"><span class="plus" aria-hidden="true">＋</span><span class="txt">${esc(r.txt)}${src}</span>${r.draft?`<span class="tag" title="Rascunho gerado por IA — revise antes de usar">rascunho</span>`:``}</button>`;
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
      <button type="button" class="sec-head" aria-expanded="${open}" aria-controls="sec-${s.key}"><span class="chev" aria-hidden="true">▸</span>${s.label}<span class="sc">${n}</span></button>
      <div class="sec-body" id="sec-${s.key}">${body}${s.key!=="rec"?'<div class="faixa-nota" hidden></div>':''}</div></div>`;
  });
  midBody.innerHTML = h;
  applyPeso();   // avisos de opções ocultas por faixa de peso

  // bind: trocar Adulto | Pediátrico (mantém a subopção) e Ambulatorial | Internação; o foco volta para o botão clicado
  const pick = (sel, key, val)=>{ renderMid(c); const b = midBody.querySelector(`${sel}[data-${key}="${val}"]`); if(b) b.focus({preventScroll:true}); };
  midBody.querySelectorAll(".pac-tab").forEach(btn=>{
    btn.onclick = ()=>{ if(btn.dataset.pac!==currentPac){ currentPac = btn.dataset.pac; pick(".pac-tab", "pac", currentPac); } };
  });
  midBody.querySelectorAll(".set-btn").forEach(btn=>{
    btn.onclick = ()=>{ if(btn.dataset.set!==currentSet){ currentSet = btn.dataset.set; pick(".set-btn", "set", currentSet); } };
  });
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
  activeCond = null; curCond = null;
  condList.querySelectorAll(".cond.active").forEach(x=>{ x.classList.remove("active"); x.setAttribute("aria-pressed","false"); });
  midTitle.textContent = MID_TITLE;
  midBody.innerHTML = MID_EMPTY;
}

/* ---- registro da aba ---- */
registerView({
  key: "prescricoes", label: "Prescrições", icon: "💊",
  cols: ["col-cond", "col-mid"], layout: "lista",
  itemId: () => curCond ? curCond.id : null,
  open: openCond,
  close: closeCond,
  // busca única: os mesmos campos do filtro da coluna (nome + subtítulo + KW)
  search: () => DATA.map(c=> ({id: c.id, ic: c.ic, title: c.nm, sub: c.sub||"", kw: KW[c.id]||""}))
});
