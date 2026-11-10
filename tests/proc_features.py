"""Procedimentos ("padrão primeiro"): estrutura do conteúdo e do padrão, comportamento da aba (padrão, linha rápida,
Ajustar, Voltar ao padrão, doses da IOT, estado), layout (padrão inteiro + Copiar + linha rápida na primeira tela) e,
com --shots, as capturas."""
import os, re
from lib import Page, Report

ESTRUTURA_JS = r"""() => {
  const erros = [], ids = new Set(), areas = new Set(PROC_AREAS.map(a => a.key));
  const calcIds = new Set(CX_PAGS.map(p => p.id));
  const lista = x => Array.isArray(x) && x.length > 0 && x.every(s => typeof s === 'string' && s.trim());
  const resumo = [];
  for (const p of PROCS){
    const e = m => erros.push(p.id + ': ' + m);
    if (!/^[a-z0-9_-]+$/.test(p.id)) e('id fora do padrão do endereço');
    if (ids.has(p.id)) e('id repetido'); ids.add(p.id);
    if (!areas.has(p.area)) e('área desconhecida');
    for (const k of ['nm', 'sub', 'kw']) if (!(typeof p[k] === 'string' && p[k].trim())) e('sem ' + k);
    if (p.draft !== true) e('sem draft:true');
    if (!('revisado' in p) || p.revisado !== null) e('revisado deve existir e ser null');
    if (p.draft && !lista(p.pendencias)) e('rascunho sem pendencias para o revisor');
    if (!(p.pendencias || []).some(x => x.startsWith('Padrão do registro'))) e('pendências sem a linha "Padrão do registro"');
    for (const k of ['fontes', 'indicacoes', 'material', 'preparo', 'depois', 'complicacoes']) if (!lista(p[k])) e('bloco vazio: ' + k);
    if (!p.contra || !lista(p.contra.absolutas) || !lista(p.contra.relativas)) e('contraindicações incompletas');
    if (!Array.isArray(p.tecnica) || !p.tecnica.length) e('sem técnica');
    (p.tecnica || []).forEach((s, i) => { const o = typeof s === 'string' ? {t: s} : s;
      if (!o.t || Object.keys(o).some(k => !['t', 'cuidado', 'dica'].includes(k))) e('passo ' + (i + 1) + ' mal formado'); });
    (p.calc || []).forEach(([id]) => { if (!calcIds.has(id)) e('link para calculadora inexistente: ' + id); });
    // registro: campos ↔ variáveis do modelo
    const campos = prCampos(p), cid = campos.map(c => c.id), usa = prUsados(p);
    if (new Set(cid).size !== cid.length) e('campo repetido no registro');
    p.registro.campos.forEach(c => { if (typeof c === 'string' && !PROC_CAMPOS[c]) e('campo comum inexistente: ' + c); });
    Object.keys(p.registro.padrao || {}).forEach(k => { if (!cid.includes(k)) e('padrão para campo inexistente: ' + k); });
    campos.forEach(c => {
      if (!['opcoes', 'texto', 'num', 'derivado'].includes(c.tipo)) e('tipo de campo inválido: ' + c.id);
      if (!c.rotulo) e('campo sem rótulo: ' + c.id);
      if (c.tipo === 'derivado' && !PR_DERIVADOS[c.de]) e('derivado sem cálculo: ' + c.id);
      if (c.tipo === 'opcoes' && (!lista(c.opcoes) || new Set(c.opcoes).size !== c.opcoes.length)) e('opções vazias/repetidas: ' + c.id);
      if (c.tipo === 'opcoes' && c.opcoes.some(o => o !== o.toLocaleUpperCase('pt-BR'))) e('opção fora de maiúsculas: ' + c.id);
      if (c.tipo === 'opcoes' && prTemPadrao(c) && !c.opcoes.includes(c.padrao)) e('padrão fora das opções: ' + c.id);
      if (prTemPadrao(c) && !String(c.padrao).trim()) e('padrão vazio: ' + c.id);
      if (c.opcional && prTemPadrao(c)) e('opcional com padrão: ' + c.id);
      if (!/^[a-z_]+$/.test(c.id)) e('id de campo inválido: ' + c.id);
    });
    const txt = p.registro.modelo.join('\n');
    const usados = [...txt.matchAll(/\{([a-z_]+)(\?)?\}/g)];
    const req = new Set(usados.filter(m => !m[2]).map(m => m[1])), opc = new Set(usados.filter(m => m[2]).map(m => m[1]));
    campos.forEach(c => {
      if (usa.has(c.id)){ if (req.has(c.id) || opc.has(c.id)) e('campo de derivado também no modelo: ' + c.id); return; }
      if (!req.has(c.id) && !opc.has(c.id)) e('campo sem variável no modelo: ' + c.id);
      if (c.opcional && req.has(c.id)) e('campo opcional usado como obrigatório: ' + c.id);
      if (!c.opcional && opc.has(c.id)) e('campo obrigatório usado como opcional: ' + c.id);
    });
    [...req, ...opc].forEach(v => { if (!cid.includes(v)) e('variável sem campo: ' + v); });
    if (/[{}]/.test(txt.replace(/\{[a-z_]+\??\}/g, ''))) e('chave solta no modelo');
    if (txt.includes(PR_LACUNA)) e('lacuna literal no modelo');
    // o padrão: determinístico; as únicas lacunas são os campos sem padrão (linha rápida), uma por campo
    const rap = prRapidos(p), pad = prPadraoTexto(p);
    if (pad !== prPadraoTexto(p) || pad !== prTexto(p, prPadraoVals(p))) e('padrão não determinístico');
    if ((pad.match(/____/g) || []).length !== rap.length) e(`lacunas no padrão (${(pad.match(/____/g) || []).length}) ≠ campos sem padrão (${rap.length})`);
    if (/[{}]/.test(pad)) e('chave solta no padrão');
    if (pad.replace(/____/g, '').includes('_')) e('marcador solto no padrão');
    rap.forEach(c => { const v = {...prPadraoVals(p), [c.id]: c.tipo === 'opcoes' ? c.opcoes[0] : '77'};
      if ((prTexto(p, v).match(/____/g) || []).length !== rap.length - 1) e('preencher ' + c.id + ' não tira exatamente uma lacuna'); });
    const todos = {...prPadraoVals(p)}; rap.forEach(c => { todos[c.id] = c.tipo === 'opcoes' ? c.opcoes[0] : '77'; });
    if (prTexto(p, todos).includes('____')) e('padrão + linha rápida preenchida ainda tem lacuna');
    if (pad.split('\n').length !== p.registro.modelo.length - opc.size) e('linha opcional aparece no padrão');
    if (rap.some(c => /^(lado)$/.test(c.id) && prTemPadrao(c))) e('lado com padrão');
    if (campos.some(c => c.id === 'lado' && prTemPadrao(c))) e('lado nunca tem padrão');
    // texto vazio (sem valor nenhum): lacunas = variáveis obrigatórias
    const vazio = prTexto(p, {});
    if ((vazio.match(/____/g) || []).length !== usados.filter(m => !m[2]).length) e('nº de lacunas ≠ variáveis obrigatórias');
    // tudo preenchido (valores diferentes do padrão) → sem lacuna; cada valor aparece; opcional some quando vazio
    const cheio = {};
    campos.forEach(c => { cheio[c.id] = c.tipo === 'opcoes' ? c.opcoes[c.opcoes.length - 1] : c.tipo === 'num' ? '80' : 'Valor ' + c.id; });
    const t = prTexto(p, cheio);
    if (t.includes('____')) e('lacuna com tudo preenchido');
    campos.forEach(c => { if (c.tipo !== 'derivado' && !usa.has(c.id) && !t.includes(String(cheio[c.id]).toLocaleUpperCase('pt-BR'))) e('valor não aparece no texto: ' + c.id); });
    if (t !== t.toLocaleUpperCase('pt-BR')) e('texto não está todo em maiúsculas');
    const semObs = {...cheio}; campos.filter(c => c.opcional).forEach(c => { semObs[c.id] = ''; });
    if (prTexto(p, semObs).split('\n').length !== t.split('\n').length - campos.filter(c => c.opcional).length) e('linha opcional não some quando vazia');
    resumo.push([p.id, rap.map(c => c.id), prAjustes(p).filter(c => prTemPadrao(c)).length]);
  }
  return {erros, n: PROCS.length, resumo};
}"""

PG = """() => ({hash: location.hash, view: document.body.dataset.view, aberto: prAberto && prAberto.id,
  foco: document.activeElement && (document.activeElement.id || document.activeElement.dataset.c || document.activeElement.className)})"""

# doses da IOT pelo peso (tabela da Calculadoras; volume ao mL inteiro a partir de 5 mL, a 0,1 mL abaixo; x,5 para baixo)
IOT_DOSES = {
    "70": "DROGAS: ETOMIDATO 20 MG (10 ML) + SUCCINILCOLINA 100 MG (10 ML) — PESO 70 KG.",
    "80": "DROGAS: ETOMIDATO 24 MG (12 ML) + SUCCINILCOLINA 120 MG (12 ML) — PESO 80 KG.",
    "50": "DROGAS: ETOMIDATO 14 MG (7 ML) + SUCCINILCOLINA 70 MG (7 ML) — PESO 50 KG.",
    "62,5": "DROGAS: ETOMIDATO 18 MG (9 ML) + SUCCINILCOLINA 90 MG (9 ML) — PESO 62,5 KG.",
    "12": "DROGAS: ETOMIDATO 3,6 MG (1,8 ML) + SUCCINILCOLINA 18 MG (1,8 ML) — PESO 12 KG.",
}


def ir(pg, base, h):
    pg.goto("about:blank")
    pg.goto(base + h)
    pg.wait_for_timeout(60)


def run(browser, url):
    rep = Report("procedimentos")
    base = url.split("#")[0]
    p = Page(browser, base + "#/procedimentos")
    pg = p.page
    st = lambda: pg.evaluate(PG)

    r = pg.evaluate(ESTRUTURA_JS)
    rep.check(not r["erros"], "estrutura: " + "; ".join(r["erros"][:12]))
    rep.note(f"estrutura: {r['n']} procedimentos, {len(r['erros'])} problemas; brancos do padrão: "
             + ", ".join(f"{pid}={'+'.join(rap) or '-'}" for pid, rap, _ in r["resumo"]))

    # abas e endereços
    tabs = pg.evaluate("() => [...document.querySelectorAll('.top-tab')].map(t => t.dataset.view)")
    rep.check(tabs.index("calculadoras") < tabs.index("procedimentos") < tabs.index("rascunho"), f"ordem das abas: {tabs}")
    ids = pg.evaluate("() => PROCS.map(p => p.id)")
    for pid in ids:
        ir(pg, base, "#/procedimentos/" + pid)
        s = st()
        tag = pg.evaluate("() => !!document.querySelector('#pr-h .cx-tag')")
        rep.check(s["aberto"] == pid and s["hash"] == "#/procedimentos/" + pid and tag, f"endereço {pid}: {s} rascunho={tag}")
    for bad in ["#/procedimentos/naoexiste", "#/procedimentos/IOT", "#/procedimentos/iot/x"]:
        ir(pg, base, bad)
        s = st()
        rep.check(s["aberto"] is None and s["hash"] in ("#/procedimentos", "#/prescricoes"), f"inválido {bad}: {s}")
    # clique na lista + voltar
    ir(pg, base, "#/procedimentos")
    pg.click('#pr-lista .pr-item[data-id="dreno"]'); pg.wait_for_function("location.hash === '#/procedimentos/dreno'")
    rep.check(st()["foco"] == "pr-h", f"abrir põe o foco no título: {st()['foco']}")
    pg.click('#pr-lista .pr-item[data-id="pl"]'); pg.wait_for_function("location.hash === '#/procedimentos/pl'")
    pg.evaluate("history.back()"); pg.wait_for_function("location.hash === '#/procedimentos/dreno'")
    rep.check(st()["aberto"] == "dreno", "voltar reabre o anterior")

    # filtro da lista e busca única por siglas
    for q, want in (("cvc", ["cvc"]), ("toracocentese", ["descompressao", "toracocentese"]), ("crico", ["crico"])):
        pg.fill("#pr-filtro", q)
        got = pg.evaluate("() => [...document.querySelectorAll('#pr-lista .pr-item')].map(b => b.dataset.id)")
        rep.check(got == want, f"filtro {q!r}: {got}")
    pg.fill("#pr-filtro", "")
    for q, want in (("IOT", "iot"), ("SRI", "iot"), ("crico", "crico"), ("dreno", "dreno"), ("CVC", "cvc"), ("IO", "io"),
                    ("PL", "pl"), ("paracentese", "paracentese"), ("cardioversao", "cardioversao"), ("pneumotorax hipertensivo", "descompressao")):
        pg.click("#pr-titulo")
        pg.keyboard.press("Control+k"); pg.keyboard.type(q)
        res = pg.evaluate("() => buscaRes.filter(r => r.v.key === 'procedimentos').map(r => r.e.id)")
        rep.check(res and res[0] == want, f"busca {q!r}: {res}")
        pg.keyboard.press("Escape"); pg.keyboard.press("Escape")
    pg.keyboard.press("Control+k"); pg.keyboard.type("dreno")
    todos = pg.evaluate("() => buscaRes.map(r => r.v.key + ':' + r.e.id)")
    for _ in range(todos.index("procedimentos:dreno") if "procedimentos:dreno" in todos else 0):
        pg.keyboard.press("ArrowDown")
    pg.keyboard.press("Enter"); pg.wait_for_timeout(80)
    rep.check(st()["aberto"] == "dreno" and st()["view"] == "procedimentos", f"Enter na busca abre: {st()}")

    txt = lambda: pg.evaluate("() => document.querySelector('#pr-texto').textContent")
    clip = lambda: pg.evaluate("window.__clip")
    estado = lambda: pg.evaluate("""() => ({estado: document.querySelector('#pr-estado').textContent,
        voltar: !document.querySelector('#pr-voltar').hidden, resumo: document.querySelector('#pr-cx-s-ajustar').textContent})""")

    # ao abrir (cada procedimento, página nova): caixas todas fechadas, o padrão na tela, Copiar copia exatamente o padrão
    for pid in pg.evaluate("() => PROCS.map(p => p.id)"):
        ir(pg, base, "#/procedimentos/" + pid)
        s = pg.evaluate("""() => ({cx: [...document.querySelectorAll('#pr-body details.pr-cx')].map(d => d.dataset.cx + ':' + d.open),
            igual: document.querySelector('#pr-texto').textContent === prPadraoTexto(prAberto), estado: document.querySelector('#pr-estado').textContent,
            voltar: document.querySelector('#pr-voltar').hidden, rap: document.querySelectorAll('#pr-rapido .pr-q').length, nrap: prRapidos(prAberto).length,
            ordem: [...document.querySelectorAll('#pr-body .pr-cx')].map(d => d.dataset.cx).join(), doses: (prAberto.calc || []).length,
            antes: [...document.querySelectorAll('#pr-body .pr-pag > *')].map(x => x.id || x.className).join()})""")
        fechadas = all(x.endswith(":false") for x in s["cx"])
        esperada = ",".join(k for k in ["ajustar", "material", "passos", "indicacoes", "complicacoes", "doses", "revisor", "fontes"]
                            if k != "doses" or s["doses"])
        rep.check(fechadas and s["igual"] and s["estado"] == "padrão" and s["voltar"] and s["rap"] == s["nrap"] and s["ordem"] == esperada
                  and s["antes"] == "pr-h,pr-padrao,pr-caixas", f"{pid} ao abrir: {s}")
        pg.evaluate("window.__clip = null"); pg.click("#pr-copiar"); pg.wait_for_timeout(30)
        c = clip()
        toast_ = pg.evaluate("() => document.querySelector('#toast').textContent")
        rotulos = pg.evaluate("() => prRapidos(prAberto).map(c => c.rotulo)")
        rep.check(c == pg.evaluate("prPadraoTexto(prAberto)") and all(x in toast_ for x in rotulos) and ("em branco" in toast_) == bool(rotulos),
                  f"{pid}: Copiar ao abrir copia o padrão e o aviso diz o que falta: {toast_!r}")

    # IOT: o padrão do dono (70 kg) e o recálculo pelo peso
    ir(pg, base, "#/procedimentos/iot")
    t = txt()
    rep.check(IOT_DOSES["70"] in t and "TUBO OROTRAQUEAL Nº 7,5 COM CUFF" in t and "TENTATIVAS: 1." in t and "SEM INTERCORRÊNCIAS IMEDIATAS." in t
              and "CORMACK-LEHANE ____" in t and "INDICAÇÃO: ____." in t, f"IOT padrão 70 kg: {t!r}")
    rep.check(estado()["resumo"].startswith("70 kg · padrão"), f"IOT: resumo do Ajustar {estado()}")
    pg.click("#pr-cx-ajustar > summary")
    for kg, linha in IOT_DOSES.items():
        pg.fill("#pr-c-peso", kg)
        rep.check(linha in txt(), f"IOT peso {kg}: {[l for l in txt().splitlines() if l.startswith('DROGAS')]}")
    e = estado()
    rep.check(e["estado"] == "ajustado" and e["voltar"] and e["resumo"].startswith("12 kg · ajustado · 1 mudança"), f"IOT ajustado pelo peso: {e}")
    pg.fill("#pr-c-peso", "70")
    pg.click('.pr-op[data-c="bloqueador"][data-v="ROCURÔNIO"]')
    rep.check("DROGAS: ETOMIDATO 20 MG (10 ML) + ROCURÔNIO 80 MG (8 ML) — PESO 70 KG." in txt(), "IOT: rocurônio 1,2 mg/kg a 70 kg")
    pg.click('.pr-op[data-c="indutor"][data-v="CETAMINA"]')
    rep.check("DROGAS: CETAMINA 70 MG (1,4 ML) + ROCURÔNIO 80 MG (8 ML) — PESO 70 KG." in txt(), "IOT: cetamina 1 mg/kg a 70 kg")
    pg.click('.pr-op[data-c="indutor"][data-v="CETAMINA"]')
    rep.check(pg.evaluate("prEst(prAberto).vals.indutor") == "CETAMINA", "nos ajustes, clicar de novo não apaga a escolha")
    pg.fill("#pr-c-peso", "")
    rep.check("DROGAS: ____." in txt() and "Drogas" in pg.evaluate("() => document.querySelector('#pr-faltam').textContent"), "IOT sem peso: drogas em branco")
    pg.click("#pr-voltar")
    rep.check(txt() == pg.evaluate("prPadraoTexto(prAberto)") and estado()["estado"] == "padrão" and not estado()["voltar"]
              and pg.evaluate("document.querySelector('#pr-c-peso').value") == "70"
              and pg.evaluate("""document.querySelector('.pr-op[data-c="indutor"][data-v="ETOMIDATO"]').getAttribute('aria-pressed')""") == "true",
              "IOT: Voltar ao padrão restaura 70 kg, etomidato e succinilcolina")

    # cada campo do Ajustar muda o texto; "ajustado" aparece; Voltar ao padrão restaura exatamente o padrão (em todos)
    tot = 0
    for pid in pg.evaluate("() => PROCS.map(p => p.id)"):
        ir(pg, base, "#/procedimentos/" + pid)
        res = pg.evaluate("""() => { const p = prAberto, pad = prPadraoTexto(p), ruins = [];
          document.querySelector('#pr-cx-ajustar').open = true;
          for (const c of prAjustes(p)){
            const antes = document.querySelector('#pr-texto').textContent;
            if (c.tipo === 'opcoes'){ const b = [...document.querySelectorAll(`.pr-op[data-c="${c.id}"]`)].find(x => x.getAttribute('aria-pressed') !== 'true'); if (!b){ ruins.push(c.id + ': só uma opção'); continue; } b.click(); }
            else { const i = document.querySelector('#pr-c-' + c.id); i.value = c.tipo === 'num' ? '33' : 'teste ' + c.id; i.dispatchEvent(new Event('input', {bubbles: true})); }
            const depois = document.querySelector('#pr-texto').textContent;
            if (depois === antes) ruins.push(c.id + ': texto não mudou');
            if (document.querySelector('#pr-estado').textContent !== 'ajustado' || document.querySelector('#pr-voltar').hidden) ruins.push(c.id + ': sem "ajustado"');
            document.querySelector('#pr-voltar2').click();
            if (document.querySelector('#pr-texto').textContent !== pad) ruins.push(c.id + ': Voltar não restaurou');
          }
          return {n: prAjustes(p).length, ruins}; }""")
        tot += res["n"]
        rep.check(not res["ruins"] or res["ruins"] == ["fio: só uma opção"], f"{pid} Ajustar: {res['ruins']}")
    rep.note(f"Ajustar: {tot} campos, cada um muda o texto e Voltar ao padrão restaura")

    # linha rápida (dreno): preenche os brancos; clicar de novo desmarca; Voltar ao padrão não apaga o que a pessoa escolheu
    ir(pg, base, "#/procedimentos/dreno")
    pad = pg.evaluate("prPadraoTexto(prAberto)")
    pg.click('#pr-rapido .pr-op[data-c="lado"][data-v="ESQUERDO"]')
    rep.check(txt().splitlines()[0].endswith("— ESQUERDO"), f"linha rápida entra no texto: {txt().splitlines()[0]}")
    pg.click('#pr-rapido .pr-op[data-c="lado"][data-v="ESQUERDO"]')
    rep.check(txt() == pad, "linha rápida: clicar de novo desmarca")
    pg.click('#pr-rapido .pr-op[data-c="lado"][data-v="DIREITO"]')
    pg.click('#pr-rapido .pr-op[data-c="indicacao"][data-v="HEMOTÓRAX"]')
    pg.click('#pr-rapido .pr-op[data-c="saida"][data-v="SANGUE"]')
    pg.fill("#pr-c-volume", "300"); pg.fill("#pr-c-fixacao", "12")
    pg.click('#pr-rapido .pr-op[data-c="selo"][data-v="OSCILANTE, SEM BORBULHAMENTO"]')
    t = txt()
    rep.check("____" not in t and "DÉBITO INICIAL 300 ML" in t and "FIXADO EM 12 CM" in t
              and pg.evaluate("() => document.querySelector('#pr-faltam').textContent") == "Sem brancos.", f"linha rápida completa: {t!r}")
    rep.check(estado()["estado"] == "padrão", "a linha rápida não conta como ajuste")
    pg.click("#pr-cx-ajustar > summary")
    pg.fill("#pr-c-calibre", "32"); pg.click('.pr-op[data-c="tecnica"][data-v="SELDINGER"]')
    pg.fill("#pr-c-obs", "sangramento discreto, compressão")
    t2 = txt()
    rep.check("DRENO 32 FR" in t2 and "SELDINGER PELA BORDA" in t2 and t2.splitlines()[-1] == "SANGRAMENTO DISCRETO, COMPRESSÃO"
              and estado()["resumo"] == "ajustado · 3 mudanças", f"ajustes no dreno: {estado()}")
    rep.check(pg.evaluate("document.querySelector('#pr-cx-ajustar').classList.contains('aj')"), "cabeçalho do Ajustar marcado como ajustado")
    # estado mantido ao trocar de aba (texto, caixas abertas, checklist)
    pg.click("#pr-cx-material > summary"); pg.click('.pr-check input[data-m="0"]'); pg.click('.pr-check input[data-m="3"]')
    rep.check(pg.evaluate("() => document.querySelector('#pr-cx-s-material').textContent") == f"{pg.evaluate('prAberto.material.length')} itens · 2 separados", "resumo do Material")
    pg.click("#tab-prescricoes"); pg.click("#tab-procedimentos")
    s = pg.evaluate("""() => ({t: document.querySelector('#pr-texto').textContent, aj: document.querySelector('#pr-cx-ajustar').open,
        mat: document.querySelector('#pr-cx-material').open, ticks: document.querySelectorAll('.pr-check input:checked').length,
        passos: document.querySelector('#pr-cx-passos').open})""")
    rep.check(s["t"] == t2 and s["aj"] and s["mat"] and s["ticks"] == 2 and not s["passos"], f"estado mantido ao trocar de aba: {s}")
    pg.click("#pr-voltar")
    t3 = txt()
    rep.check("DRENO 28 FR" in t3 and "DISSECÇÃO ROMBA" in t3 and "— DIREITO" in t3 and "DÉBITO INICIAL 300 ML" in t3 and "SANGRAMENTO" not in t3
              and pg.evaluate("document.querySelector('#pr-c-calibre').value") == "28" and pg.evaluate("document.querySelector('#pr-c-obs').value") == "",
              "Voltar ao padrão desfaz os ajustes e mantém a linha rápida")
    pg.click("#pr-copiar"); pg.wait_for_timeout(30)
    rep.check(clip() == t3 and pg.evaluate("() => document.querySelector('#toast').textContent") == "Registro copiado!", "Copiar sem brancos")
    # material
    pg.click("#pr-mat-copiar"); pg.wait_for_timeout(30)
    nmat = pg.evaluate("prAberto.material.length")
    rep.check(clip().startswith("MATERIAL — DRENAGEM DE TÓRAX\n- ") and clip().count("\n- ") == nmat, f"Copiar material: {clip()[:60]!r}")
    pg.click("#pr-mat-limpar")
    rep.check(pg.evaluate("() => document.querySelectorAll('.pr-check input:checked').length") == 0, "Desmarcar")
    # passo a passo: uma numeração só, com os avisos
    pz = pg.evaluate("""() => ({n: document.querySelectorAll('#pr-cx-passos .pr-passos li').length, s: document.querySelector('#pr-cx-s-passos').textContent,
        esp: prAberto.preparo.length + prAberto.tecnica.length + prAberto.depois.length, call: document.querySelectorAll('#pr-cx-passos .pr-call').length})""")
    rep.check(pz["n"] == pz["esp"] and pz["s"] == f"{pz['esp']} passos" and pz["call"] > 0, f"Passo a passo: {pz}")
    # Para o revisor: só em rascunho, fechada, com todas as pendências
    rv = pg.evaluate("() => { const d = document.querySelector('#pr-cx-revisor'); return d && [d.open, d.querySelectorAll('li').length, prAberto.pendencias.length]; }")
    rep.check(rv and rv[0] is False and rv[1] == rv[2] > 0, f"caixa Para o revisor: {rv}")
    sem = pg.evaluate("() => { const p = PROCS.find(x => x.id === 'pl'); p.draft = false; prAbrir('pl', 'route'); const n = !!document.querySelector('#pr-cx-revisor'); p.draft = true; prAbrir('dreno', 'route'); return n; }")
    rep.check(sem is False, "sem draft, a caixa do revisor some")
    rep.check(pg.evaluate("() => !document.querySelector('#pr-cx-doses') === !(prAberto.calc || []).length"), "caixa Doses só onde há calculadora")
    ir(pg, base, "#/procedimentos/paracentese")
    rep.check(pg.evaluate("() => !document.querySelector('#pr-cx-doses')"), "paracentese: sem caixa Doses")

    # teclado: Enter na linha rápida avança; Ctrl+Enter copia de qualquer campo
    ir(pg, base, "#/procedimentos/toracocentese")
    pg.focus("#pr-c-volume"); pg.keyboard.type("800"); pg.keyboard.press("Enter")
    rep.check(st()["foco"] == "aspecto", f"Enter na linha rápida avança: {st()['foco']}")
    pg.evaluate("window.__clip = null"); pg.focus("#pr-c-volume"); pg.keyboard.press("Control+Enter"); pg.wait_for_timeout(30)
    rep.check(clip() == pg.evaluate("prTexto(prAberto)") and "RETIRADOS 800 ML" in clip(), "Ctrl+Enter copia o registro")

    # ida e volta pela Calculadora (Doses): ajustes, linha rápida e caixa aberta continuam
    ir(pg, base, "#/procedimentos/iot")
    pg.fill("#pr-c-indicacao", "rebaixamento"); pg.click('#pr-rapido .pr-op[data-c="cormack"][data-v="II"]')
    pg.click("#pr-cx-ajustar > summary"); pg.fill("#pr-c-peso", "80")
    antes = txt()
    pg.click("#pr-cx-doses > summary"); pg.click('#pr-cx-doses [data-calc="iot"]'); pg.wait_for_timeout(80)
    rep.check(pg.evaluate("location.hash") == "#/calculadoras/iot", "link de doses abre a Calculadora")
    pg.evaluate("history.back()"); pg.wait_for_function("location.hash === '#/procedimentos/iot'"); pg.wait_for_timeout(80)
    s = pg.evaluate("""() => ({t: document.querySelector('#pr-texto').textContent, doses: document.querySelector('#pr-cx-doses').open,
        aj: document.querySelector('#pr-cx-ajustar').open, peso: document.querySelector('#pr-c-peso').value})""")
    rep.check(s["t"] == antes and IOT_DOSES["80"] in s["t"] and "INDICAÇÃO: REBAIXAMENTO." in s["t"] and s["doses"] and s["aj"] and s["peso"] == "80",
              f"volta da Calculadora: {s}")
    rep.check(not p.problems, "console: " + "; ".join(p.problems[:5]))
    p.close()

    layout(browser, url, rep)
    return rep.done()


TELAS = [(1366, 768), (1280, 720), (1024, 768), (1440, 900)]
CELULARES = [(390, 844), (320, 640)]

# visível por inteiro dentro da área que rola (coluna ou página), sem nada por cima (cantos e centro)
VIS_JS = """(sels) => {
  const area = document.querySelector('#pr-body').getBoundingClientRect(), pageSc = matchMedia('(max-width:820px)').matches;
  const barra = document.querySelector('#pr-barra');
  const res = {};
  for (const s of sels){
    const els = typeof s === 'string' ? [...document.querySelectorAll(s)] : [s];
    if (!els.length){ res[s] = 'ausente'; continue; }
    const ruins = [];
    for (const el of els){
      const r = el.getBoundingClientRect();
      const top = pageSc ? 0 : area.top;
      let bot = pageSc ? innerHeight : Math.min(area.bottom, innerHeight);
      if (!barra.hidden && !barra.contains(el)) bot = Math.min(bot, barra.getBoundingClientRect().top);
      const dentro = r.width > 0 && r.top >= top - 0.5 && r.bottom <= bot + 0.5 && r.left >= -0.5 && r.right <= innerWidth + 0.5;
      const pts = [[r.left + r.width / 2, r.top + r.height / 2], [r.left + 3, r.top + 3], [r.right - 3, r.bottom - 3]];
      const topo = pts.every(([x, y]) => { const c = document.elementFromPoint(x, y); return !!c && (c === el || el.contains(c)); });
      if (!(dentro && topo)) ruins.push(`${el.id || el.dataset.campo || el.className}: dentro=${dentro} topo=${topo} (${Math.round(r.top)}–${Math.round(r.bottom)} de ${Math.round(bot)})`);
    }
    res[s] = ruins.length ? ruins.join(' | ') : 'ok';
  }
  return res;
}"""

# todos os controles da página (com as caixas abertas): ao receber foco, nenhum pode ficar escondido
FOCO_JS = """async () => {
  document.querySelectorAll('#pr-body details.pr-cx').forEach(d => d.open = true);
  const els = [...document.querySelectorAll('#pr-body button, #pr-body input, #pr-body a, #pr-body summary')].filter(el => el.getClientRects().length);
  let ruins = [];
  for (const el of els){
    el.focus(); await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));
    el.scrollIntoView({block: 'nearest'});
    await new Promise(r => requestAnimationFrame(r));
    const b = document.querySelector('#pr-barra');
    if (!b.hidden){ const t = b.getBoundingClientRect().top, r = el.getBoundingClientRect(); if (r.bottom > t - 8) window.scrollBy(0, r.bottom - t + 16); }
    const r = el.getBoundingClientRect();
    const c = document.elementFromPoint(r.left + Math.min(r.width / 2, 20), r.top + r.height / 2);
    if (!(c && (c === el || el.contains(c)))) ruins.push((el.id || el.dataset.c || el.textContent.trim()).slice(0, 30) + '→' + (c ? (c.id || c.className) : 'nada'));
  }
  return {n: els.length, ruins: ruins.slice(0, 5), nruins: ruins.length};
}"""


def layout(browser, url, rep):
    base = url.split("#")[0]
    for w, h in TELAS:
        p = Page(browser, base + "#/procedimentos", w, h)
        pg = p.page
        ok = tot = 0
        for pid in pg.evaluate("() => PROCS.map(p => p.id)"):
            pg.evaluate(f"() => navigate('procedimentos', {pid!r}, 'click')")
            pg.wait_for_timeout(30)
            semrx = pg.evaluate("() => document.getElementById('col-rx').hidden && document.body.dataset.rx === 'off'")
            rep.check(semrx, f"{w}x{h} {pid}: receita escondida pelo registro (rx:false)")
            r = pg.evaluate(VIS_JS, ["#pr-texto", "#pr-copiar", "#pr-rapido", "#pr-rapido .pr-q", "#pr-faltam"])
            rolapre = pg.evaluate("() => { const t = document.querySelector('#pr-texto'); return t.scrollHeight > t.clientHeight + 1; }")
            bad = {k: v for k, v in r.items() if v != "ok"}
            tot += 1
            ok += not bad and not rolapre
            rep.check(not bad and not rolapre, f"{w}x{h} {pid}: primeira tela {bad} texto-rola={rolapre}")
        pg.evaluate("() => navigate('procedimentos', 'dreno', 'click')")
        f = pg.evaluate(FOCO_JS)
        rep.check(not f["nruins"], f"{w}x{h} dreno: controles escondidos ao focar {f['ruins']}")
        rep.note(f"layout {w}x{h}: {ok}/{tot} com padrão inteiro + Copiar + linha rápida na primeira tela; {f['n']} controles focáveis visíveis")
        rep.check(not p.problems, f"layout {w}x{h} console: " + "; ".join(p.problems[:3]))
        p.close()
    for w, h in CELULARES:
        p = Page(browser, base + "#/procedimentos", w, h)
        pg = p.page
        ok = 0
        ids = pg.evaluate("() => PROCS.map(p => p.id)")
        for pid in ids:
            pg.evaluate("() => scrollTo(0, 0)")
            pg.click(f'#pr-lista .pr-item[data-id="{pid}"]'); pg.wait_for_timeout(150)
            # o texto vem primeiro (antes das caixas) e o Copiar está à mão: o do registro na tela, ou a barra fixa
            ordem = pg.evaluate("() => document.querySelector('#pr-texto').getBoundingClientRect().bottom <= document.querySelector('.pr-caixas').getBoundingClientRect().top")
            r = pg.evaluate(VIS_JS, ["#pr-copiar"])
            barra = pg.evaluate("document.querySelector('#pr-barra').hidden")
            topo_ok = r["#pr-copiar"] == "ok" and barra
            # descendo até o fim da linha rápida: se o Copiar do registro saiu da tela, a barra aparece e copia
            pg.evaluate("() => { const q = [...document.querySelectorAll('#pr-faltam')].pop(); q.scrollIntoView({block: 'end'}); scrollBy(0, 80); }")
            pg.wait_for_timeout(150)
            vis = pg.evaluate(VIS_JS, ["#pr-copiar"])["#pr-copiar"] == "ok"
            bar = pg.evaluate(VIS_JS, ["#pr-barra-copiar"])["#pr-barra-copiar"] == "ok"
            alcance = vis or bar
            pg.evaluate("window.__clip = null")
            pg.click("#pr-barra-copiar" if bar else "#pr-copiar"); pg.wait_for_timeout(30)
            copia = pg.evaluate("window.__clip") == pg.evaluate("prTexto(prAberto)")
            good = ordem and topo_ok and alcance and copia
            ok += good
            rep.check(good, f"{w}px {pid}: texto primeiro={ordem} Copiar ao abrir={r} barra escondida={barra} Copiar ao descer={vis}/{bar} copia={copia}")
        f = pg.evaluate(FOCO_JS)
        rep.check(not f["nruins"], f"{w}px: controles escondidos ao focar {f['ruins']}")
        sx = pg.evaluate("() => document.documentElement.scrollWidth > innerWidth")
        rep.check(not sx, f"{w}px: rolagem horizontal")
        rep.note(f"layout {w}x{h}: {ok}/{len(ids)} com o texto primeiro e o Copiar à mão; {f['n']} controles focáveis visíveis")
        rep.check(not p.problems, f"{w}px console: " + "; ".join(p.problems[:3]))
        p.close()


SIZES = [(1366, 768), (390, 844), (1440, 900), (320, 640)]


def shots(browser, url, out_dir):
    rep = Report("procedimentos: capturas")
    os.makedirs(out_dir, exist_ok=True)
    base = url.split("#")[0]
    for w, h in SIZES:
        tag = f"{w}x{h}"
        phone = w <= 820
        p = Page(browser, base + "#/procedimentos", w, h)
        pg = p.page
        pg.screenshot(path=f"{out_dir}/proc-lista-{tag}.png")
        for pid in ("iot", "dreno", "cvc"):
            pg.evaluate("() => scrollTo(0, 0)")
            pg.evaluate(f"() => navigate('procedimentos', {pid!r}, 'load')"); pg.wait_for_timeout(150)
            pg.screenshot(path=f"{out_dir}/proc-{pid}-{tag}.png")
            pg.click("#pr-cx-ajustar > summary"); pg.wait_for_timeout(60)
            if phone:
                pg.evaluate("() => scrollIntoPlace(document.querySelector('#pr-cx-ajustar'), 8)")
            pg.wait_for_timeout(150)
            pg.screenshot(path=f"{out_dir}/proc-{pid}-ajustar-{tag}.png")
            pg.click("#pr-cx-ajustar > summary")   # fecha de novo (o estado da caixa dura a sessão)
        pg.evaluate("() => scrollTo(0, 0)")
        if phone:
            pg.click("#busca-abrir")
        else:
            pg.keyboard.press("Control+k")
        pg.keyboard.type("dreno"); pg.wait_for_timeout(120)
        pg.screenshot(path=f"{out_dir}/proc-busca-dreno-{tag}.png")
        rep.check(not p.problems, f"{tag}: " + "; ".join(p.problems[:3]))
        p.close()
    rep.note(f"capturas em {out_dir}")
    return rep.done()
