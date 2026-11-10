"""Procedimentos ("padrão primeiro"): estrutura do conteúdo e do padrão, comportamento da aba (padrão, linha rápida,
Ajustar, Voltar ao padrão, doses da IOT, estado), layout (padrão inteiro + Copiar + linha rápida na primeira tela) e,
com --shots, as capturas."""
import os, re
from lib import Page, Report, REPO

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
    // o padrão foi aprovado pelo dono (10/11/2026): sai das pendências e fica em registro.resumo + registro.aprovado
    if ((p.pendencias || []).some(x => x.startsWith('Padrão do registro'))) e('"Padrão do registro" ainda nas pendências');
    if (!/^Padrão do registro/.test(p.registro.resumo || '') || p.registro.aprovado !== '2026-11-10') e('registro sem resumo/aprovação do padrão');
    // variação principal: 1–2 por procedimento, campos de opções do registro, rótulos curtos só de opções existentes
    const vars = p.registro.variacoes || [];
    if (vars.length < 1 || vars.length > 2) e('variações principais: ' + vars.length + ' (1 a 2)');
    vars.forEach(v => { const c = prCampo(p, v.campo);
      if (!c || c.tipo !== 'opcoes' || !prTemPadrao(c)) e('variação inválida: ' + v.campo);
      else Object.keys(v.curtos || {}).forEach(o => { if (!c.opcoes.includes(o)) e('rótulo curto de opção inexistente: ' + v.campo + ' ' + o); }); });
    // figuras: passo existente, arquivo .svg em img/procedimentos/ (a existência no disco é conferida pelo Python)
    const passos = new Set(['preparo', 'tecnica', 'depois'].flatMap(s => p[s].map((_, i) => s + '.' + (i + 1))));
    prFiguras(p).forEach(f => { if (!/^[a-z0-9-]+\.svg$/.test(f.arquivo) || !f.titulo || !f.legenda || !passos.has(f.passo)) e('figura mal descrita: ' + JSON.stringify(f)); });
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
    if (/CONSENTIMENTO/.test(pad)) e('consentimento no padrão (nunca é atestado por padrão)');
    const cons = campos.find(c => c.id === 'consentimento');
    if (cons && (!cons.opcional || prTemPadrao(cons) || !opc.has('consentimento'))) e('consentimento deve ser opcional, sem padrão, {consentimento?}');
    if (!(p.pendencias || []).some(x => x.startsWith('Consentimento:'))) e('pendências sem a linha sobre consentimento');
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
  if (typeof PROC_FIGURAS !== 'undefined') Object.keys(PROC_FIGURAS).forEach(k => { if (!PROCS.some(p => p.id === k)) erros.push('figuras de procedimento inexistente: ' + k); });
  return {erros, n: PROCS.length, resumo, figs: PROCS.flatMap(p => prFiguras(p).map(f => f.arquivo))};
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
    faltam = [f for f in r["figs"] if not os.path.isfile(os.path.join(REPO, "img", "procedimentos", f))]
    rep.check(not faltam, f"figuras listadas sem arquivo em img/procedimentos/: {faltam}")
    rep.note(f"figuras: {len(r['figs'])} listadas, todas com arquivo")

    # abas e endereços
    tabs = pg.evaluate("() => [...document.querySelectorAll('.top-tab')].map(t => t.dataset.view)")
    rep.check(tabs.index("rascunho") < tabs.index("calculadoras") < tabs.index("procedimentos"), f"ordem das abas: {tabs}")
    ids = pg.evaluate("() => PROCS.map(p => p.id)")
    for pid in ids:
        ir(pg, base, "#/procedimentos/" + pid)
        s = st()
        tag = pg.evaluate("() => !!document.querySelector('#pr-h .cx-tag')")
        rep.check(s["aberto"] == pid and s["hash"] == "#/procedimentos/" + pid and tag, f"endereço {pid}: {s} rascunho={tag}")
    for bad in ["#/procedimentos/naoexiste", "#/procedimentos/IOT", "#/procedimentos/iot/x"]:
        ir(pg, base, bad)
        s = st()
        rep.check(s["aberto"] is None and s["hash"] in ("#/procedimentos", "#/rascunho"), f"inválido {bad}: {s}")
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
        voltar: !document.querySelector('#pr-voltar').hidden})""")

    def opcao(c, v):   # clica no trecho do campo c no texto e escolhe v no menu
        pg.click(f'#pr-texto .pr-tk[data-c="{c}"]')
        pg.click(f'#pr-pop .pr-pop-op[data-v="{v}"]')

    def escreve(c, v):   # clica no trecho de texto livre c: vira campo no lugar; Enter confirma
        pg.click(f'#pr-texto .pr-tk[data-c="{c}"]')
        pg.fill("#pr-texto .pr-tk-in", v)
        pg.keyboard.press("Enter")

    # ao abrir (cada procedimento, página nova): guia Registro, sem caixa "Ajustar", padrão na tela, Copiar copia o padrão;
    # cada campo ajustável tem um trecho clicável no texto padrão; a variação principal aparece como escolha de um clique
    for pid in pg.evaluate("() => PROCS.map(p => p.id)"):
        ir(pg, base, "#/procedimentos/" + pid)
        s = pg.evaluate("""() => ({guia: document.querySelector('.pr-guia[aria-selected="true"]').dataset.guia, como: document.querySelector('#pr-g-como').hidden,
            ajustar: !!document.querySelector('#pr-cx-ajustar'), cx: [...document.querySelectorAll('#pr-body details.pr-cx')].map(d => d.dataset.cx + ':' + d.open),
            igual: document.querySelector('#pr-texto').textContent === prPadraoTexto(prAberto), estado: document.querySelector('#pr-estado').textContent,
            voltar: document.querySelector('#pr-voltar').hidden, rap: document.querySelectorAll('#pr-rapido .pr-q').length, nrap: prRapidos(prAberto).length,
            doses: (prAberto.calc || []).length, antes: [...document.querySelectorAll('#pr-body .pr-pag > *')].map(x => x.id || x.className).join(),
            semTrecho: prAjustes(prAberto).filter(c => !c.opcional && !document.querySelector(`#pr-texto .pr-tk[data-c="${c.id}"]`)).map(c => c.id),
            brancos: [...document.querySelectorAll('#pr-texto .pr-tk.vazio')].map(t => t.dataset.c).sort().join(),
            rapIds: prRapidos(prAberto).map(c => c.id).sort().join(),
            vars: [...document.querySelectorAll('.pr-var')].map(v => v.dataset.campo + ':' + [...v.querySelectorAll('.pr-op')].filter(b => b.getAttribute('aria-pressed') === 'true').length).join(),
            mais: [...document.querySelectorAll('#pr-mais [data-add]')].map(b => b.dataset.add).join(),
            opc: prOpcionais(prAberto).map(c => c.id).join()})""")
        esperada = ",".join(k for k in ["material", "indicacoes", "complicacoes", "doses", "revisor", "fontes"] if k != "doses" or s["doses"])
        ordem = ",".join(x.split(":")[0] for x in s["cx"])
        rep.check(s["guia"] == "registro" and s["como"] and not s["ajustar"] and all(x.endswith(":false") for x in s["cx"]) and ordem == esperada
                  and s["igual"] and s["estado"] == "padrão" and s["voltar"] and s["rap"] == s["nrap"] and s["antes"] == "pr-cab,pr-g-registro,pr-g-como"
                  and not s["semTrecho"] and s["brancos"] == s["rapIds"] and s["vars"] and all(x.endswith(":1") for x in s["vars"].split(","))
                  and s["mais"] == s["opc"], f"{pid} ao abrir: {s}")
        pg.evaluate("window.__clip = null"); pg.click("#pr-copiar"); pg.wait_for_timeout(30)
        c = clip()
        toast_ = pg.evaluate("() => document.querySelector('#toast').textContent")
        rotulos = pg.evaluate("() => prRapidos(prAberto).map(c => c.rotulo)")
        rep.check(c == pg.evaluate("prPadraoTexto(prAberto)") and all(x in toast_ for x in rotulos) and ("em branco" in toast_) == bool(rotulos),
                  f"{pid}: Copiar ao abrir copia o padrão e o aviso diz o que falta: {toast_!r}")

    # toracocentese: padrão por referências anatômicas; ultrassom a um clique (variação)
    ir(pg, base, "#/procedimentos/toracocentese")
    t = txt()
    rep.check("POR REFERÊNCIAS ANATÔMICAS, SEM ULTRASSOM. LOCAL: LINHA ESCAPULAR OU AXILAR POSTERIOR" in t and "GUIADA" not in t and "MARCAÇÃO" not in t,
              f"toracocentese padrão sem ultrassom: {t!r}")
    pg.click('.pr-var .pr-op[data-c="guia"][data-v="GUIADA POR ULTRASSOM"]')
    rep.check("\nGUIADA POR ULTRASSOM. LOCAL:" in txt() and estado()["estado"].startswith("ajustado"), "variação: guiada por US em um clique")
    pg.click('.pr-var .pr-op[data-c="guia"][data-v="GUIADA POR ULTRASSOM"]')
    rep.check(pg.evaluate("prEst(prAberto).vals.guia") == "GUIADA POR ULTRASSOM", "variação: clicar de novo não apaga a escolha")
    pg.click('.pr-var .pr-op[data-c="guia"][data-v="COM MARCAÇÃO PRÉVIA POR ULTRASSOM"]')
    rep.check("\nCOM MARCAÇÃO PRÉVIA POR ULTRASSOM. LOCAL:" in txt(), "variação: marcação prévia por US")
    rep.check(pg.evaluate("""() => document.querySelector('#pr-texto .pr-tk[data-c="guia"]').textContent""") == "COM MARCAÇÃO PRÉVIA POR ULTRASSOM",
              "variação e trecho do texto são o mesmo campo")
    pg.click("#pr-voltar")
    rep.check(txt() == pg.evaluate("prPadraoTexto(prAberto)"), "Voltar ao padrão (toracocentese)")

    # IOT: o padrão do dono (70 kg) e o recálculo pelo peso, tudo pelo próprio texto
    ir(pg, base, "#/procedimentos/iot")
    t = txt()
    rep.check(IOT_DOSES["70"] in t and "TUBO OROTRAQUEAL Nº 7,5 COM CUFF, FIXADO EM 22 CM" in t and "TENTATIVAS: 1." in t and "SEM INTERCORRÊNCIAS IMEDIATAS." in t
              and "CORMACK-LEHANE ____" in t and "INDICAÇÃO: ____." in t, f"IOT padrão 70 kg: {t!r}")
    for kg, linha in IOT_DOSES.items():
        escreve("peso", kg)
        rep.check(linha in txt(), f"IOT peso {kg}: {[l for l in txt().splitlines() if l.startswith('DROGAS')]}")
    rep.check(estado()["estado"] == "ajustado · 1 mudança" and estado()["voltar"], f"IOT ajustado pelo peso: {estado()}")
    escreve("peso", "70")
    opcao("bloqueador", "ROCURÔNIO")
    rep.check("DROGAS: ETOMIDATO 20 MG (10 ML) + ROCURÔNIO 80 MG (8 ML) — PESO 70 KG." in txt(), "IOT: rocurônio 1,2 mg/kg a 70 kg")
    opcao("indutor", "CETAMINA")
    rep.check("DROGAS: CETAMINA 70 MG (1,4 ML) + ROCURÔNIO 80 MG (8 ML) — PESO 70 KG." in txt(), "IOT: cetamina 1 mg/kg a 70 kg")
    escreve("tubo", "8,0")
    rep.check("TUBO OROTRAQUEAL Nº 8,0 COM CUFF" in txt(), "IOT: tubo trocado no próprio texto")
    escreve("peso", "")
    rep.check("DROGAS: ____." in txt() and pg.evaluate("""() => !!document.querySelector('#pr-texto .pr-tk.vazio[data-c="peso"]')""")
              and "Drogas" in pg.evaluate("() => document.querySelector('#pr-faltam').title"), "IOT sem peso: drogas em branco, clicável (abre o peso)")
    escreve("peso", "70")
    pg.click("#pr-voltar")
    rep.check(txt() == pg.evaluate("prPadraoTexto(prAberto)") and estado()["estado"] == "padrão" and not estado()["voltar"],
              "IOT: Voltar ao padrão restaura 70 kg, etomidato, succinilcolina e tubo 7,5")

    # cada campo ajustável, em todos os procedimentos: o clique no trecho troca o texto, "ajustado" aparece e Voltar ao padrão
    # restaura exatamente o padrão; as linhas opcionais entram pelo "＋" e saem pelo menu
    tot = 0
    for pid in pg.evaluate("() => PROCS.map(p => p.id)"):
        ir(pg, base, "#/procedimentos/" + pid)
        res = pg.evaluate("""() => { const p = prAberto, pad = prPadraoTexto(p), ruins = [];
          const enter = el => el.dispatchEvent(new KeyboardEvent('keydown', {key: 'Enter', bubbles: true}));
          for (const c of prAjustes(p)){
            const antes = document.querySelector('#pr-texto').textContent;
            if (c.opcional){
              const b = document.querySelector(`#pr-mais [data-add="${c.id}"]`); if (!b){ ruins.push(c.id + ': sem ＋'); continue; }
              b.click();
              if (c.tipo === 'opcoes') document.querySelector('#pr-pop .pr-pop-op').click();
              else { const i = document.querySelector('#pr-pop-in'); i.value = 'teste ' + c.id; enter(i); }
            } else {
              const tk = document.querySelector(`#pr-texto .pr-tk[data-c="${c.id}"]`); if (!tk){ ruins.push(c.id + ': sem trecho'); continue; }
              tk.click();
              if (c.tipo === 'opcoes'){ const b = [...document.querySelectorAll('#pr-pop .pr-pop-op')].find(x => x.getAttribute('aria-selected') !== 'true' && x.dataset.v);
                if (!b){ document.querySelector('#pr-pop').hidden = true; if (c.opcoes.length > 1) ruins.push(c.id + ': menu sem outra opção'); continue; } b.click(); }
              else { const i = document.querySelector('#pr-texto .pr-tk-in'); if (!i){ ruins.push(c.id + ': sem campo no lugar'); continue; } i.value = c.tipo === 'num' ? '33' : 'teste ' + c.id; enter(i); }
            }
            const depois = document.querySelector('#pr-texto').textContent;
            if (depois === antes) ruins.push(c.id + ': texto não mudou');
            if (!document.querySelector('#pr-estado').textContent.startsWith('ajustado') || document.querySelector('#pr-voltar').hidden) ruins.push(c.id + ': sem "ajustado"');
            document.querySelector('#pr-voltar').click();
            if (document.querySelector('#pr-texto').textContent !== pad) ruins.push(c.id + ': Voltar não restaurou');
          }
          return {n: prAjustes(p).length, ruins}; }""")
        tot += res["n"]
        rep.check(not res["ruins"], f"{pid} trechos: {res['ruins']}")
    rep.note(f"ajuste no texto: {tot} campos, cada um muda o texto pelo clique e Voltar ao padrão restaura")

    # linha rápida e brancos clicáveis (dreno); consentimento pelo "＋"; editar texto
    ir(pg, base, "#/procedimentos/dreno")
    pad = pg.evaluate("prPadraoTexto(prAberto)")
    pg.click('#pr-rapido .pr-op[data-c="lado"][data-v="ESQUERDO"]')
    rep.check(txt().splitlines()[0].endswith("— ESQUERDO"), f"linha rápida entra no texto: {txt().splitlines()[0]}")
    pg.click('#pr-rapido .pr-op[data-c="lado"][data-v="ESQUERDO"]')
    rep.check(txt() == pad, "linha rápida: clicar de novo desmarca")
    opcao("lado", "DIREITO")   # o branco no texto também abre o menu
    rep.check(txt().splitlines()[0].endswith("— DIREITO") and pg.evaluate("""document.querySelector('#pr-rapido .pr-op[data-c="lado"][data-v="DIREITO"]').getAttribute('aria-pressed')""") == "true",
              "branco clicado no texto preenche e a linha rápida acompanha")
    pg.click('#pr-texto .pr-tk[data-c="lado"]'); pg.click('#pr-pop .pr-pop-op.tirar')
    rep.check(txt() == pad, "menu de um branco preenchido: Deixar em branco")
    opcao("lado", "DIREITO")
    opcao("indicacao", "HEMOTÓRAX"); opcao("saida", "SANGUE"); opcao("selo", "OSCILANTE, SEM BORBULHAMENTO")
    escreve("volume", "300")
    pg.fill("#pr-c-fixacao", "12")
    t = txt()
    rep.check("____" not in t and "DÉBITO INICIAL 300 ML" in t and "FIXADO EM 12 CM" in t
              and pg.evaluate("() => document.querySelector('#pr-faltam').textContent") == "Sem brancos.", f"brancos preenchidos: {t!r}")
    rep.check(estado()["estado"] == "padrão", "os brancos não contam como ajuste")
    rep.check("CONSENTIMENTO" not in pad, "dreno: padrão sem frase de consentimento")
    pg.click('#pr-mais [data-add="consentimento"]'); pg.click('#pr-pop .pr-pop-op[data-v="PROCEDIMENTO DE EMERGÊNCIA, SEM CONDIÇÕES DE OBTER CONSENTIMENTO"]')
    rep.check("PROCEDIMENTO DE EMERGÊNCIA, SEM CONDIÇÕES DE OBTER CONSENTIMENTO." in txt().splitlines() and estado()["estado"].startswith("ajustado")
              and not pg.evaluate("""() => !!document.querySelector('#pr-mais [data-add="consentimento"]')"""),
              f"＋ Consentimento acrescenta a linha (ajustado) e o ＋ some: {estado()}")
    pg.click('#pr-texto .pr-tk[data-c="consentimento"]'); pg.click('#pr-pop .pr-pop-op.tirar')
    rep.check("CONSENTIMENTO" not in txt() and estado()["estado"] == "padrão", "Tirar esta linha remove o consentimento")
    pg.click('#pr-mais [data-add="consentimento"]'); pg.click('#pr-pop .pr-pop-op[data-v="CONSENTIMENTO OBTIDO COM FAMILIAR/RESPONSÁVEL"]')
    pg.click('#pr-mais [data-add="obs"]'); pg.fill("#pr-pop-in", "sangramento discreto, compressão"); pg.keyboard.press("Enter")
    escreve("calibre", "32"); opcao("tecnica", "SELDINGER")
    t2 = txt()
    rep.check("DRENO 32 FR" in t2 and "SELDINGER PELA BORDA" in t2 and t2.splitlines()[-1] == "SANGRAMENTO DISCRETO, COMPRESSÃO"
              and "CONSENTIMENTO OBTIDO COM FAMILIAR/RESPONSÁVEL." in t2 and estado()["estado"] == "ajustado · 4 mudanças", f"ajustes no dreno: {estado()}")
    rep.check(pg.evaluate("""document.querySelector('.pr-var .pr-op[data-v="SELDINGER"]').getAttribute('aria-pressed')""") == "true", "trecho e variação mostram a mesma escolha")
    # estado mantido ao trocar de aba (texto, guia, caixas abertas, checklist)
    pg.click("#pr-guia-como"); pg.click("#pr-cx-material > summary"); pg.click('.pr-check input[data-m="0"]'); pg.click('.pr-check input[data-m="3"]')
    rep.check(pg.evaluate("() => document.querySelector('#pr-cx-s-material').textContent").startswith(f"{pg.evaluate('prAberto.material.length')} itens · 2 separados"), "resumo do Material")
    pg.click("#tab-prescricoes"); pg.click("#tab-procedimentos")
    s = pg.evaluate("""() => ({t: document.querySelector('#pr-texto').textContent, guia: document.querySelector('.pr-guia[aria-selected="true"]').dataset.guia,
        mat: document.querySelector('#pr-cx-material').open, ticks: document.querySelectorAll('.pr-check input:checked').length,
        reg: document.querySelector('#pr-g-registro').hidden})""")
    rep.check(s["t"] == t2 and s["guia"] == "como" and s["reg"] and s["mat"] and s["ticks"] == 2, f"estado mantido ao trocar de aba: {s}")
    pg.click("#pr-guia-registro")
    pg.click("#pr-voltar")
    t3 = txt()
    rep.check("DRENO 28 FR" in t3 and "DISSECÇÃO ROMBA" in t3 and "— DIREITO" in t3 and "DÉBITO INICIAL 300 ML" in t3 and "SANGRAMENTO" not in t3 and "CONSENTIMENTO" not in t3,
              "Voltar ao padrão desfaz os ajustes e mantém os brancos preenchidos")
    pg.click("#pr-copiar"); pg.wait_for_timeout(30)
    rep.check(clip() == t3 and pg.evaluate("() => document.querySelector('#toast').textContent") == "Registro copiado!", "Copiar sem brancos")
    # editar texto: vira texto livre; Copiar copia o editado; "Voltar aos campos" descarta; Voltar ao padrão também sai
    pg.click("#pr-editar")
    rep.check(pg.evaluate("() => [document.querySelector('#pr-texto').hidden, document.querySelector('#pr-livre').hidden, document.querySelector('#pr-livre').value, document.activeElement.id]")
              == [True, False, t3, "pr-livre"], "Editar texto mostra o texto atual numa caixa editável")
    pg.fill("#pr-livre", t3 + "\nPACIENTE ORIENTADO.")
    pg.click("#pr-copiar"); pg.wait_for_timeout(30)
    rep.check(clip() == t3 + "\nPACIENTE ORIENTADO." and estado()["estado"] == "editado", "Copiar copia o texto editado à mão")
    pg.click("#tab-escores"); pg.click("#tab-procedimentos")
    rep.check(pg.evaluate("() => document.querySelector('#pr-livre').value").endswith("PACIENTE ORIENTADO."), "texto editado sobrevive à troca de aba")
    pg.click("#pr-editar")
    rep.check(txt() == t3 and estado()["estado"] == "padrão", "Voltar aos campos descarta a edição")
    # material
    pg.click("#pr-guia-como")
    pg.click("#pr-mat-copiar"); pg.wait_for_timeout(30)
    nmat = pg.evaluate("prAberto.material.length")
    rep.check(clip().startswith("MATERIAL — DRENAGEM DE TÓRAX\n- ") and clip().count("\n- ") == nmat, f"Copiar material: {clip()[:60]!r}")
    pg.click("#pr-mat-limpar")
    rep.check(pg.evaluate("() => document.querySelectorAll('.pr-check input:checked').length") == 0, "Desmarcar")
    # passo a passo: uma numeração só, avisos e figuras no passo que ilustram
    pz = pg.evaluate("""() => ({n: document.querySelectorAll('.pr-passos li').length, esp: prAberto.preparo.length + prAberto.tecnica.length + prAberto.depois.length,
        call: document.querySelectorAll('.pr-passos .pr-call').length, figs: [...document.querySelectorAll('.pr-passos li .pr-fig img')].map(i => i.getAttribute('src')),
        ok: [...document.querySelectorAll('.pr-passos li .pr-fig img')].every(i => i.complete && i.naturalWidth > 0),
        lista: prFiguras(prAberto).map(f => 'img/procedimentos/' + f.arquivo)})""")
    rep.check(pz["n"] == pz["esp"] and pz["call"] > 0 and pz["figs"] == pz["lista"] and len(pz["figs"]) == 3, f"Passo a passo do dreno: {pz}")
    pg.wait_for_function("() => [...document.querySelectorAll('.pr-fig img')].every(i => i.complete && i.naturalWidth > 0)", timeout=5000)
    # figura sob o passo certo; procedimento sem figura não mostra nenhuma
    onde = pg.evaluate("""() => { const li = [...document.querySelectorAll('.pr-passos')][1].children[6]; return !!li.querySelector('img[src$="dreno-3.svg"]'); }""")
    rep.check(onde, "dreno-3 (selo d'água) logo abaixo do passo técnica.7")
    # todos os procedimentos: cada figura da lista sob o seu passo, carregada
    for pid in pg.evaluate("() => PROCS.map(p => p.id)"):
        ir(pg, base, "#/procedimentos/" + pid)
        pg.click("#pr-guia-como")
        pg.wait_for_function("() => [...document.querySelectorAll('.pr-fig img')].every(i => i.complete)", timeout=5000)
        fz = pg.evaluate("""() => { const secs = ['preparo', 'tecnica', 'depois'], ols = [...document.querySelectorAll('.pr-passos')];
            return prFiguras(prAberto).filter(f => { const [s, n] = f.passo.split('.'); const li = ols[secs.indexOf(s)].children[+n - 1];
              const img = li && li.querySelector(`img[src$="${f.arquivo}"]`); return !(img && img.naturalWidth > 0); }).map(f => f.arquivo); }""")
        rep.check(not fz, f"{pid}: figuras fora do passo ou sem carregar: {fz}")
    # procedimento sem figura (lista vazia): passo a passo normal, nenhuma figura
    ir(pg, base, "#/procedimentos/pl")
    pg.evaluate("() => { window.__f = PROC_FIGURAS.pl; PROC_FIGURAS.pl = []; prAbrir('pl', 'route'); prGuia('como'); }")
    rep.check(pg.evaluate("() => document.querySelectorAll('.pr-fig').length") == 0 and pg.evaluate("() => document.querySelectorAll('.pr-passos li').length") > 0,
              "procedimento sem figura: passo a passo normal")
    pg.evaluate("() => { PROC_FIGURAS.pl = window.__f; }")
    # Para o revisor: só em rascunho, fechada, com todas as pendências; nenhuma pendência "Padrão do registro"
    ir(pg, base, "#/procedimentos/dreno")
    rv = pg.evaluate("() => { const d = document.querySelector('#pr-cx-revisor'); return d && [d.open, d.querySelectorAll('li').length, prAberto.pendencias.length, d.textContent.includes('Padrão do registro')]; }")
    rep.check(rv and rv[0] is False and rv[1] == rv[2] > 0 and not rv[3], f"caixa Para o revisor: {rv}")
    ap = pg.evaluate("() => document.querySelector('#pr-cx-fontes').textContent")
    rep.check("Aprovado pelo médico em 10/11/2026" in ap and "Padrão do registro" in ap, "aprovação do padrão registrada nas Fontes")
    sem = pg.evaluate("() => { const p = PROCS.find(x => x.id === 'pl'); p.draft = false; prAbrir('pl', 'route'); const n = !!document.querySelector('#pr-cx-revisor'); p.draft = true; prAbrir('dreno', 'route'); return n; }")
    rep.check(sem is False, "sem draft, a caixa do revisor some")
    ir(pg, base, "#/procedimentos/paracentese")
    rep.check(pg.evaluate("() => !document.querySelector('#pr-cx-doses')"), "paracentese: sem caixa Doses")

    # teclado: Tab chega aos trechos; Enter abre; ↓/Enter troca; Esc fecha e volta ao trecho; Enter na linha rápida avança;
    # ← → entre as guias; Ctrl+Enter copia de qualquer lugar
    ir(pg, base, "#/procedimentos/toracocentese")
    pg.focus("#pr-copiar"); pg.keyboard.press("Tab")
    rep.check(pg.evaluate("() => document.activeElement.classList.contains('pr-tk')"), f"Tab a partir do Copiar chega ao primeiro trecho: {st()['foco']}")
    pg.focus('#pr-texto .pr-tk[data-c="antissepsia"]'); pg.keyboard.press("Enter")
    rep.check(pg.evaluate("() => document.activeElement.getAttribute('aria-selected')") == "true", "Enter abre o menu com a opção atual em foco")
    pg.keyboard.press("Escape")
    rep.check(pg.evaluate("() => [document.querySelector('#pr-pop').hidden, document.activeElement.dataset.c]") == [True, "antissepsia"], "Esc fecha e volta ao trecho")
    pg.keyboard.press("Enter"); pg.keyboard.press("ArrowDown"); pg.keyboard.press("Enter")
    rep.check("ANTISSEPSIA: CLOREXIDINA DEGERMANTE + ALCOÓLICA E CAMPOS ESTÉREIS." in txt() and st()["foco"] == "antissepsia", "↓ + Enter troca e o foco volta ao trecho")
    pg.keyboard.press("Enter")   # trecho de opção: abre o menu de novo; Esc
    pg.keyboard.press("Escape")
    pg.focus('#pr-texto .pr-tk[data-c="dispositivo"]'); pg.keyboard.press("Enter")
    rep.check(pg.evaluate("() => document.activeElement.classList.contains('pr-tk-in')"), "Enter num trecho de texto livre abre o campo no lugar")
    pg.keyboard.press("Control+a"); pg.keyboard.type("cateter 16G"); pg.keyboard.press("Enter")
    rep.check("DISPOSITIVO: CATETER 16G." in txt() and st()["foco"] == "dispositivo", "Enter confirma o campo no lugar e o foco volta ao trecho")
    pg.focus('#pr-texto .pr-tk[data-c="dispositivo"]'); pg.keyboard.press("Enter"); pg.keyboard.type("xxx"); pg.keyboard.press("Escape")
    rep.check("DISPOSITIVO: CATETER 16G." in txt(), "Esc no campo no lugar desiste")
    pg.focus("#pr-c-volume"); pg.keyboard.type("800"); pg.keyboard.press("Enter")
    rep.check(st()["foco"] == "aspecto", f"Enter na linha rápida avança: {st()['foco']}")
    pg.evaluate("window.__clip = null"); pg.focus('#pr-texto .pr-tk[data-c="dispositivo"]'); pg.keyboard.press("Control+Enter"); pg.wait_for_timeout(30)
    rep.check(clip() == pg.evaluate("prTexto(prAberto)") and "RETIRADOS 800 ML" in clip(), "Ctrl+Enter copia o registro")
    pg.focus("#pr-guia-registro"); pg.keyboard.press("ArrowRight")
    rep.check(pg.evaluate("() => [document.activeElement.id, document.querySelector('#pr-g-como').hidden]") == ["pr-guia-como", False], "→ nas guias abre Como fazer")
    pg.keyboard.press("ArrowLeft")

    # ida e volta pela Calculadora (Doses, na guia Como fazer): valores, guia e caixa aberta continuam
    ir(pg, base, "#/procedimentos/iot")
    pg.click('#pr-rapido .pr-op[data-c="cormack"][data-v="II"]'); escreve("indicacao", "rebaixamento"); escreve("peso", "80")
    antes = txt()
    pg.click("#pr-guia-como"); pg.click("#pr-cx-doses > summary"); pg.click('#pr-cx-doses [data-calc="iot"]'); pg.wait_for_timeout(80)
    rep.check(pg.evaluate("location.hash") == "#/calculadoras/iot", "link de doses abre a Calculadora")
    pg.evaluate("history.back()"); pg.wait_for_function("location.hash === '#/procedimentos/iot'"); pg.wait_for_timeout(80)
    s = pg.evaluate("""() => ({t: document.querySelector('#pr-texto').textContent, doses: document.querySelector('#pr-cx-doses').open,
        guia: document.querySelector('.pr-guia[aria-selected="true"]').dataset.guia})""")
    rep.check(s["t"] == antes and IOT_DOSES["80"] in s["t"] and "INDICAÇÃO: REBAIXAMENTO." in s["t"] and s["doses"] and s["guia"] == "como", f"volta da Calculadora: {s}")
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
  const els = [...document.querySelectorAll('#pr-body button, #pr-body input, #pr-body a, #pr-body summary, #pr-body [tabindex="0"]')].filter(el => el.getClientRects().length && !el.closest('[hidden]'));
  let ruins = [];
  for (const el of els){
    el.focus(); await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));
    el.scrollIntoView({block: 'nearest'});
    await new Promise(r => requestAnimationFrame(r));
    const b = document.querySelector('#pr-barra');
    if (!b.hidden){ const t = b.getBoundingClientRect().top, r = el.getBoundingClientRect(); if (r.bottom > t - 8) window.scrollBy(0, r.bottom - t + 16); }
    const r = el.getClientRects()[0];   // trecho do texto que quebra linha: o primeiro pedaço
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
            r = pg.evaluate(VIS_JS, [".pr-guias", "#pr-texto", "#pr-copiar", "#pr-rapido", "#pr-rapido .pr-q", ".pr-var", "#pr-faltam", "#pr-mais"])
            rolapre = pg.evaluate("() => { const t = document.querySelector('#pr-texto'); return t.scrollHeight > t.clientHeight + 1; }")
            bad = {k: v for k, v in r.items() if v != "ok"}
            tot += 1
            ok += not bad and not rolapre
            rep.check(not bad and not rolapre, f"{w}x{h} {pid}: primeira tela {bad} texto-rola={rolapre}")
        # o menu de um trecho cabe na tela e não fica atrás de nada
        pg.evaluate("() => navigate('procedimentos', 'cvc', 'click')"); pg.wait_for_timeout(30)
        pg.click('#pr-texto .pr-tk[data-c="barreira"]')
        m = pg.evaluate(VIS_JS, ["#pr-pop .pr-pop-op"])
        dentro = pg.evaluate("() => { const r = document.querySelector('#pr-pop').getBoundingClientRect(), a = document.querySelector('#pr-body').getBoundingClientRect(); return r.top >= a.top && r.bottom <= a.bottom && r.right <= a.right; }")
        rep.check(all(v == "ok" for v in m.values()) and dentro, f"{w}x{h}: menu de um trecho visível: {m} dentro={dentro}")
        pg.keyboard.press("Escape")
        f = pg.evaluate(FOCO_JS)
        pg.evaluate("() => prGuia('como')")
        f2 = pg.evaluate(FOCO_JS)
        pg.evaluate("() => prGuia('registro')")
        rep.check(not f["nruins"] and not f2["nruins"], f"{w}x{h} cvc: controles escondidos ao focar {f['ruins']} {f2['ruins']}")
        rep.note(f"layout {w}x{h}: {ok}/{tot} com guias + registro inteiro + Copiar + linha rápida na primeira tela; {f['n']}+{f2['n']} controles focáveis visíveis")
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
            # o registro vem primeiro e o Copiar está à mão: o do registro na tela, ou a barra fixa
            ordem = pg.evaluate("() => document.querySelector('.pr-guia[aria-selected=\"true\"]').dataset.guia === 'registro' && !document.querySelector('#pr-texto').hidden")
            r = pg.evaluate(VIS_JS, ["#pr-copiar"])
            barra = pg.evaluate("document.querySelector('#pr-barra').hidden")
            topo_ok = r["#pr-copiar"] == "ok" and barra
            pg.evaluate("() => { document.querySelector('#pr-faltam').scrollIntoView({block: 'end'}); scrollBy(0, 80); }")
            pg.wait_for_timeout(150)
            vis = pg.evaluate(VIS_JS, ["#pr-copiar"])["#pr-copiar"] == "ok"
            bar = pg.evaluate(VIS_JS, ["#pr-barra-copiar"])["#pr-barra-copiar"] == "ok"
            pg.evaluate("window.__clip = null")
            pg.click("#pr-barra-copiar" if bar else "#pr-copiar"); pg.wait_for_timeout(30)
            copia = pg.evaluate("window.__clip") == pg.evaluate("prTexto(prAberto)")
            good = ordem and topo_ok and (vis or bar) and copia
            ok += good
            rep.check(good, f"{w}px {pid}: registro primeiro={ordem} Copiar ao abrir={r} barra escondida={barra} Copiar ao descer={vis}/{bar} copia={copia}")
        # opções de um trecho fáceis de tocar (≥ 40 px de altura), dentro da tela
        pg.evaluate("() => scrollTo(0, 0)")
        pg.click('#pr-lista .pr-item[data-id="toracocentese"]'); pg.wait_for_timeout(150)
        pg.click('#pr-texto .pr-tk[data-c="antissepsia"]')
        alt = pg.evaluate("() => [...document.querySelectorAll('#pr-pop .pr-pop-op')].map(b => { const r = b.getBoundingClientRect(); return [Math.round(r.height), r.left >= 0 && r.right <= innerWidth]; })")
        rep.check(alt and all(hh >= 40 and dentro for hh, dentro in alt), f"{w}px: opções do menu fáceis de tocar: {alt}")
        pg.keyboard.press("Escape")
        pg.evaluate("() => prGuia('como')"); pg.wait_for_timeout(80)
        rep.check(pg.evaluate("document.querySelector('#pr-barra').hidden"), f"{w}px: na guia Como fazer a barra de Copiar some")
        pg.evaluate("() => prGuia('registro')")
        f = pg.evaluate(FOCO_JS)
        rep.check(not f["nruins"], f"{w}px: controles escondidos ao focar {f['ruins']}")
        sx = pg.evaluate("() => document.documentElement.scrollWidth > innerWidth")
        rep.check(not sx, f"{w}px: rolagem horizontal")
        rep.note(f"layout {w}x{h}: {ok}/{len(ids)} com o registro primeiro e o Copiar à mão; {f['n']} controles focáveis visíveis")
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
        for pid in ("toracocentese", "iot", "dreno", "cvc"):
            pg.evaluate("() => scrollTo(0, 0)")
            pg.evaluate(f"() => navigate('procedimentos', {pid!r}, 'load')"); pg.wait_for_timeout(150)
            pg.screenshot(path=f"{out_dir}/proc-{pid}-registro-{tag}.png")
            tk = {"toracocentese": "guia", "iot": "dispositivo", "dreno": "antissepsia", "cvc": "barreira"}[pid]
            pg.click(f'#pr-texto .pr-tk[data-c="{tk}"]'); pg.wait_for_timeout(80)
            pg.screenshot(path=f"{out_dir}/proc-{pid}-opcoes-{tag}.png")
            pg.keyboard.press("Escape")
            pg.evaluate("() => prGuia('como')"); pg.wait_for_timeout(60)
            pg.evaluate("() => { scrollTo(0, 0); document.querySelector('#pr-body').scrollTop = 0; }")
            if phone:
                pg.evaluate("() => scrollIntoPlace(document.querySelector('#col-proc'), 0)")
            pg.wait_for_timeout(200)
            pg.screenshot(path=f"{out_dir}/proc-{pid}-como-{tag}.png")
            pg.evaluate("() => prGuia('registro')")
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
