/* receita.js — coluna da receita (#col-rx), a mesma em todas as abas. */
let selected = [];          // {med, qty, pos, route, spec}
let orientSet = [];         // strings (mantém ordem, sem duplicar)
let freeEdit = false;
const rxChips = $("#rx-chips"), rxArea = $("#rx"), rxCount = $("#rx-count");

/* ---- adicionar / remover ---- */
function keyOf(med,qty,route){ return (med+"|"+qty+"|"+(route||ORAL)).toUpperCase(); }
function addItem(it){
  const med=it[0], qty=it[1], pos=it[2]||"", route=it[3]||ORAL, spec=it[4]||null;
  if(selected.some(s=> keyOf(s.med,s.qty,s.route)===keyOf(med,qty,route))) return 0;
  selected.push({med,qty,pos,route,spec});
  syncRx();
  return 1;
}
function addOrient(o){
  if(orientSet.includes(o)) return false;
  orientSet.push(o); syncRx(); return true;
}
function removeItem(i){ selected.splice(i,1); refreshRx(); }
function removeOrient(i){ orientSet.splice(i,1); refreshRx(); }
// remover/alterar sempre reflete no texto, mesmo em edição livre (evita chips e texto divergirem)
function refreshRx(){ if(freeEdit) rxArea.value = buildText(); syncRx(); }

// agrupa selected[] por rota, preservando a ordem de inserção
function groupByRoute(project = it => it){
  const groups = [];
  selected.forEach((it, idx) => {
    let g = groups.find(x => x.route === it.route);
    if(!g){ g = {route: it.route, items: []}; groups.push(g); }
    g.items.push(project(it, idx));
  });
  return groups;
}

/* ---- formatação do texto ---- */
const RX_COL_WIDTH = 46;   // largura (em caracteres) até a coluna de quantidade
const RX_MIN_DASHES = 3;   // mínimo de "_" no preenchimento
function pad(med){
  const left = med + " ";
  const dashes = Math.max(RX_MIN_DASHES, RX_COL_WIDTH - left.length);
  return left + "_".repeat(dashes) + " ";
}
function buildText(){
  if(selected.length===0 && orientSet.length===0) return "";
  const out=[];
  // com dose calculada por peso, o peso abre a receita (conferência pela farmácia)
  if(peso>0 && selected.some(it=> it.spec)) out.push(`PESO: ${num(peso,1)} KG`);
  groupByRoute().forEach(g=>{
    const block=[g.route, ""];
    g.items.forEach((it,i)=>{
      const n=String(i+1).padStart(2,"0");
      block.push(`${n}- ${pad(it.med)}${it.qty}`);
      if(it.pos) block.push(fillDose(it.pos, it.spec));
      block.push("");
    });
    out.push(block.join("\n").trim());
  });
  if(orientSet.length){
    out.push("ORIENTAÇÕES:\n\n" + orientSet.map(o=> "# "+o).join("\n"));
  }
  return out.join("\n\n").trim();
}

/* ---- sincroniza painel direito ---- */
function syncRx(){
  rxCount.textContent = selected.length;
  // chips
  if(selected.length===0 && orientSet.length===0){
    rxChips.innerHTML = `<div class="rx-empty">Nenhum item adicionado ainda.<br>Clique nas medicações ao centro.</div>`;
  } else {
    let h="";
    groupByRoute((it,idx)=>({it,idx})).forEach(g=>{
      h += `<div class="grp-h">${esc(g.route)}</div>`;
      g.items.forEach(({it,idx})=>{
        // opção de uma faixa de peso que não bate mais com o peso digitado (o peso mudou depois de adicionar)
        const fora = it.spec && it.spec.peso && !fits(it.spec.peso);
        h += `<div class="chip${fora?' fora':''}"><div class="cn">${esc(it.med)}<small>${esc(it.qty)}</small>${fora?'<small class="fora-txt">⚠ fora da faixa do peso digitado</small>':''}</div>
          <button type="button" class="x" data-i="${idx}" aria-label="Remover ${esc(it.med)}"><span aria-hidden="true">✕</span></button></div>`;
      });
    });
    if(orientSet.length){
      h += `<div class="grp-h">Orientações</div>`;
      orientSet.forEach((o,i)=>{
        h += `<div class="chip"><div class="cn" style="font-weight:500">${esc(o.length>70?o.slice(0,70)+"…":o)}</div>
          <button type="button" class="x" data-o="${i}" aria-label="Remover orientação"><span aria-hidden="true">✕</span></button></div>`;
      });
    }
    rxChips.innerHTML = h;
    rxChips.querySelectorAll(".x[data-i]").forEach(b=> b.onclick=()=>removeItem(+b.dataset.i));
    rxChips.querySelectorAll(".x[data-o]").forEach(b=> b.onclick=()=>removeOrient(+b.dataset.o));
  }
  // textarea (só sobrescreve se não estiver em edição livre)
  if(!freeEdit) rxArea.value = buildText();
  // habilita/desabilita as ações conforme o estado
  const empty = selected.length===0 && orientSet.length===0 && !rxArea.value.trim();
  $("#btn-copy").disabled = empty; $("#btn-clear").disabled = empty;
}

/* ---- ações ---- */
// leva um texto livre (trecho de "Meu rascunho") para a receita, sem apagar o que já está lá
function sendToRx(txt){
  freeEdit = true; $("#free-edit").checked = true;
  const cur = rxArea.value.replace(/\s+$/,"");
  rxArea.value = cur ? cur + "\n\n" + txt : txt;
  syncRx();
  toast("Texto levado para a receita (edição livre)");
}
$("#btn-copy").onclick = async ()=>{
  const txt = rxArea.value.trim();
  if(!txt){ toast("Receita vazia", false); return; }
  const ok = await copyText(txt);
  toast(ok ? "Receita copiada!" : "Não foi possível copiar", ok);
};
$("#btn-clear").onclick = ()=>{
  if(selected.length===0 && orientSet.length===0 && !rxArea.value.trim()) return;
  selected=[]; orientSet=[]; freeEdit=false; $("#free-edit").checked=false; rxArea.value="";
  // receita nova = paciente novo: zera também o peso
  peso = null; const pin = midBody.querySelector("#peso"); if(pin) pin.value = "";
  refreshDoses(); toast("Receita limpa");
};
$("#free-edit").onchange = e=>{
  freeEdit = e.target.checked;
  if(!freeEdit){
    if(rxArea.value.trim() && rxArea.value!==buildText() && !confirm("Descartar as edições manuais e regenerar a receita?")){
      e.target.checked = true; freeEdit = true; return;
    }
    syncRx();
  } else {
    toast("Edição livre: o texto não será sobrescrito");
  }
};
