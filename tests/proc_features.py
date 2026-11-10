"""Procedimentos: estrutura do conteúdo, comportamento da aba, layout (registro alcançável, nada fixo por cima de campos)
e, com --shots, as capturas."""
import os, re
from lib import Page, Report

ESTRUTURA_JS = r"""() => {
  const erros = [], ids = new Set(), areas = new Set(PROC_AREAS.map(a => a.key));
  const calcIds = new Set(CX_PAGS.map(p => p.id));
  const lista = x => Array.isArray(x) && x.length > 0 && x.every(s => typeof s === 'string' && s.trim());
  for (const p of PROCS){
    const e = m => erros.push(p.id + ': ' + m);
    if (!/^[a-z0-9_-]+$/.test(p.id)) e('id fora do padrão do endereço');
    if (ids.has(p.id)) e('id repetido'); ids.add(p.id);
    if (!areas.has(p.area)) e('área desconhecida');
    for (const k of ['nm', 'sub', 'kw']) if (!(typeof p[k] === 'string' && p[k].trim())) e('sem ' + k);
    if (p.draft !== true) e('sem draft:true');
    if (!('revisado' in p) || p.revisado !== null) e('revisado deve existir e ser null');
    if (p.draft && !lista(p.pendencias)) e('rascunho sem pendencias para o revisor');
    for (const k of ['fontes', 'indicacoes', 'material', 'preparo', 'depois', 'complicacoes']) if (!lista(p[k])) e('bloco vazio: ' + k);
    if (!p.contra || !lista(p.contra.absolutas) || !lista(p.contra.relativas)) e('contraindicações incompletas');
    if (!Array.isArray(p.tecnica) || !p.tecnica.length) e('sem técnica');
    (p.tecnica || []).forEach((s, i) => { const o = typeof s === 'string' ? {t: s} : s;
      if (!o.t || Object.keys(o).some(k => !['t', 'cuidado', 'dica'].includes(k))) e('passo ' + (i + 1) + ' mal formado'); });
    (p.calc || []).forEach(([id]) => { if (!calcIds.has(id)) e('link para calculadora inexistente: ' + id); });
    // registro: campos ↔ variáveis do modelo
    const campos = prCampos(p), cid = campos.map(c => c.id);
    if (new Set(cid).size !== cid.length) e('campo repetido no registro');
    p.registro.campos.forEach(c => { if (typeof c === 'string' && !PROC_CAMPOS[c]) e('campo comum inexistente: ' + c); });
    campos.forEach(c => {
      if (!['opcoes', 'texto', 'num'].includes(c.tipo)) e('tipo de campo inválido: ' + c.id);
      if (!c.rotulo) e('campo sem rótulo: ' + c.id);
      if (c.tipo === 'opcoes' && (!lista(c.opcoes) || new Set(c.opcoes).size !== c.opcoes.length)) e('opções vazias/repetidas: ' + c.id);
      if (c.tipo === 'opcoes' && c.opcoes.some(o => o !== o.toLocaleUpperCase('pt-BR'))) e('opção fora de maiúsculas: ' + c.id);
      if (!/^[a-z_]+$/.test(c.id)) e('id de campo inválido: ' + c.id);
    });
    const txt = p.registro.modelo.join('\n');
    const usados = [...txt.matchAll(/\{([a-z_]+)(\?)?\}/g)];
    const req = new Set(usados.filter(m => !m[2]).map(m => m[1])), opc = new Set(usados.filter(m => m[2]).map(m => m[1]));
    campos.forEach(c => {
      if (!req.has(c.id) && !opc.has(c.id)) e('campo sem variável no modelo: ' + c.id);
      if (c.opcional && req.has(c.id)) e('campo opcional usado como obrigatório: ' + c.id);
      if (!c.opcional && opc.has(c.id)) e('campo obrigatório usado como opcional: ' + c.id);
    });
    [...req, ...opc].forEach(v => { if (!cid.includes(v)) e('variável sem campo: ' + v); });
    if (/[{}]/.test(txt.replace(/\{[a-z_]+\??\}/g, ''))) e('chave solta no modelo');
    if (txt.includes(PR_LACUNA)) e('lacuna literal no modelo');
    // texto determinístico; lacunas = obrigatórios vazios; tudo preenchido = nenhuma lacuna
    const vazio = prTexto(p, {}), vazio2 = prTexto(p, {});
    if (vazio !== vazio2) e('texto não determinístico');
    const nReq = usados.filter(m => !m[2]).length;
    if ((vazio.match(/____/g) || []).length !== nReq) e('nº de lacunas ≠ variáveis obrigatórias');
    const cheio = {};
    campos.forEach(c => { cheio[c.id] = c.tipo === 'opcoes' ? c.opcoes[c.opcoes.length - 1] : 'Valor ' + c.id; });
    const t = prTexto(p, cheio);
    if (t.includes('____')) e('lacuna com tudo preenchido');
    campos.forEach(c => { if (!t.includes(String(cheio[c.id]).toLocaleUpperCase('pt-BR'))) e('valor não aparece no texto: ' + c.id); });
    if (t !== t.toLocaleUpperCase('pt-BR')) e('texto não está todo em maiúsculas');
    const semObs = {...cheio}; campos.filter(c => c.opcional).forEach(c => { semObs[c.id] = ''; });
    if (prTexto(p, semObs).split('\n').length !== t.split('\n').length - campos.filter(c => c.opcional).length) e('linha opcional não some quando vazia');
  }
  return {erros, n: PROCS.length};
}"""

PG = """() => ({hash: location.hash, view: document.body.dataset.view, aberto: prAberto && prAberto.id,
  foco: document.activeElement && (document.activeElement.id || document.activeElement.dataset.c || document.activeElement.className)})"""


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
    rep.note(f"estrutura: {r['n']} procedimentos, {len(r['erros'])} problemas")

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

    # caixa "Para o revisor": só em rascunho, fechada, com todas as pendências
    ir(pg, base, "#/procedimentos/dreno")
    rv = pg.evaluate("() => { const d = document.querySelector('details.pr-revisor'); return d && [d.open, d.querySelectorAll('li').length, prAberto.pendencias.length]; }")
    rep.check(rv and rv[0] is False and rv[1] == rv[2] > 0, f"caixa Para o revisor: {rv}")
    sem = pg.evaluate("() => { const p = PROCS.find(x => x.id === 'pl'); p.draft = false; prAbrir('pl', 'route'); const n = !!document.querySelector('details.pr-revisor'); p.draft = true; prAbrir('dreno', 'route'); return n; }")
    rep.check(sem is False, "sem draft, a caixa do revisor some")
    # checklist e Copiar material
    ir(pg, base, "#/procedimentos/dreno")
    pg.click('.pr-check input[data-m="0"]'); pg.click('.pr-check input[data-m="3"]')
    n = pg.evaluate("() => document.querySelector('#pr-mat-n').textContent")
    rep.check(n.startswith("2/"), f"contador do material: {n}")
    pg.click("#pr-mat-copiar"); pg.wait_for_timeout(40)
    clip = pg.evaluate("window.__clip")
    nmat = pg.evaluate("prAberto.material.length")
    rep.check(clip.startswith("MATERIAL — DRENAGEM DE TÓRAX\n- ") and clip.count("\n- ") == nmat, f"Copiar material: {clip[:80]!r}")
    pg.click("#tab-calculadoras"); pg.click("#tab-procedimentos")
    rep.check(pg.evaluate("() => document.querySelectorAll('.pr-check input:checked').length") == 2, "checklist mantida ao trocar de aba")
    pg.click("#pr-mat-limpar")
    rep.check(pg.evaluate("() => document.querySelectorAll('.pr-check input:checked').length") == 0, "Desmarcar")

    # registro ao vivo: lacunas, opções, texto, opcional, Copiar
    txt = lambda: pg.evaluate("() => document.querySelector('#pr-texto').textContent")
    t0 = txt()
    falt0 = pg.evaluate("prFaltam(prAberto).length")
    rep.check(t0.count("____") >= falt0 > 0 and "OBS" not in t0, f"vazio: {falt0} campos faltando")
    pg.click('.pr-op[data-c="lado"][data-v="ESQUERDO"]')
    rep.check(txt().splitlines()[0].endswith("— ESQUERDO"), f"opção entra no texto: {txt().splitlines()[0]}")
    pg.click('.pr-op[data-c="lado"][data-v="ESQUERDO"]')
    rep.check(txt().splitlines()[0].endswith("— ____"), "clicar de novo desmarca")
    pg.click('.pr-op[data-c="lado"][data-v="DIREITO"]')
    pg.fill("#pr-c-calibre", "28")
    rep.check("DRENO 28 FR" in txt(), "campo numérico entra no texto")
    pg.fill("#pr-c-anestesia", "lidocaína 2% 10 mL")
    rep.check("ANESTESIA: LIDOCAÍNA 2% 10 ML." in txt(), "texto livre em maiúsculas")
    falt = pg.evaluate("() => document.querySelector('#pr-faltam').textContent")
    rep.check(falt == f"faltam {falt0 - 3} campos", f"contador de campos: {falt}")
    pg.click("#pr-copiar"); pg.wait_for_timeout(40)
    rep.check(pg.evaluate("window.__clip") == pg.evaluate("prTexto(prAberto)") and "____" in pg.evaluate("window.__clip"), "Copiar registro (incompleto, com lacunas)")
    toast_ = pg.evaluate("() => document.querySelector('#toast').textContent")
    rep.check("em branco" in toast_, f"aviso de campos em branco ao copiar: {toast_!r}")
    rep.check(not any(l.startswith("OBS") for l in txt().splitlines()) and txt().splitlines()[-1] != "", "linha opcional ausente quando vazia")
    pg.fill("#pr-c-obs", "sangramento discreto, compressão")
    rep.check(txt().splitlines()[-1] == "SANGRAMENTO DISCRETO, COMPRESSÃO", f"linha opcional aparece: {txt().splitlines()[-1]}")
    # preencher tudo → completo, sem lacunas
    pg.evaluate("""() => { prCampos(prAberto).forEach(c => { if (c.tipo === 'opcoes') { const b = document.querySelector(`.pr-op[data-c="${c.id}"]`);
        if (b.getAttribute('aria-pressed') !== 'true' && !prEst(prAberto).vals[c.id]) b.click(); }
      else if (!prEst(prAberto).vals[c.id]) { const i = document.querySelector('#pr-c-' + c.id); i.value = '10'; i.dispatchEvent(new Event('input')); } }); }""")
    rep.check("____" not in txt() and pg.evaluate("() => document.querySelector('#pr-faltam').textContent") == "completo", "tudo preenchido: sem lacunas")
    pg.click("#tab-prescricoes"); pg.click("#tab-procedimentos")
    rep.check("____" not in txt(), "registro mantido ao trocar de aba")
    pg.click("#pr-limpar")
    rep.check(txt() == t0, "Limpar volta ao texto vazio")

    # teclado: botão do topo → 1º campo vazio; Enter avança; Ctrl+Enter copia
    pg.click("#pr-ir-nota")
    rep.check(st()["foco"] == "lado" or st()["foco"].startswith("pr-op"), f"Registro leva ao 1º campo vazio: {st()['foco']}")
    pg.focus("#pr-c-anestesia"); pg.keyboard.type("lido"); pg.keyboard.press("Enter")
    rep.check(st()["foco"] != "pr-c-anestesia", f"Enter no campo avança: {st()['foco']}")
    pg.evaluate("window.__clip = null"); pg.focus("#pr-c-calibre"); pg.keyboard.press("Control+Enter"); pg.wait_for_timeout(40)
    rep.check(pg.evaluate("window.__clip") == pg.evaluate("prTexto(prAberto)"), "Ctrl+Enter copia o registro")
    # link para a calculadora
    pg.click('[data-calc="emg-analgesia"]'); pg.wait_for_timeout(60)
    rep.check(pg.evaluate("location.hash") == "#/calculadoras/emg-analgesia", "link de doses abre a Calculadora")
    rep.check(not p.problems, "console: " + "; ".join(p.problems[:5]))
    p.close()

    layout(browser, url, rep)
    return rep.done()


TELAS = [(1366, 768), (1280, 720), (1024, 768), (1440, 900)]
CELULARES = [(390, 844), (320, 640)]

VIS_JS = """(sels) => {
  const area = document.querySelector('#pr-body').getBoundingClientRect(), pageSc = matchMedia('(max-width:820px)').matches;
  const barra = document.querySelector('#pr-barra'), barraOn = !barra.hidden;
  const res = {};
  for (const s of sels){
    const el = typeof s === 'string' ? document.querySelector(s) : s;
    if (!el){ res[s] = 'ausente'; continue; }
    const r = el.getBoundingClientRect();
    const top = pageSc ? 0 : area.top, bot = pageSc ? innerHeight : area.bottom;
    const dentro = r.width > 0 && r.top >= top - 0.5 && r.bottom <= Math.min(bot, innerHeight) + 0.5 && r.right <= innerWidth + 0.5;
    const c = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2);
    const topo = !!c && (c === el || el.contains(c));
    res[typeof s === 'string' ? s : (s.id || s.dataset.c || 'el')] = dentro && topo ? 'ok' : `dentro=${dentro} topo=${topo} (${Math.round(r.top)}–${Math.round(r.bottom)})`;
  }
  return res;
}"""

# todos os controles da página: ao receber foco, nenhum pode ficar escondido (atrás da barra do celular ou de algo fixo)
FOCO_JS = """async () => {
  const els = [...document.querySelectorAll('#pr-body button, #pr-body input, #pr-body a')];
  let ruins = [];
  for (const el of els){
    el.focus(); await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));
    if (!el.closest('.pr-nota') || getComputedStyle(document.querySelector('.pr-nota')).position !== 'sticky') el.scrollIntoView({block: 'nearest'});
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
    procs = ["iot", "dreno", "cvc", "cardioversao", "pl"]
    for modo in ("integrado",):   # receita escondida de verdade pelo registro (rx:false), sem emulação
        for w, h in TELAS:
            p = Page(browser, base + "#/procedimentos", w, h)
            pg = p.page
            ok = tot = 0
            for pid in procs:
                pg.evaluate(f"() => navigate('procedimentos', {pid!r}, 'click')")
                pg.wait_for_timeout(30)
                semrx = pg.evaluate("() => document.getElementById('col-rx').hidden && document.body.dataset.rx === 'off'")
                rep.check(semrx, f"{w}x{h} {pid}: receita escondida pelo registro (rx:false)")
                pg.evaluate("() => { document.querySelector('#pr-body').scrollTop = 0; }")
                lado = pg.evaluate("prNotaLado()")
                if w >= 1280:   # 1280×720, 1366×768, 1440×900: o registro fica numa coluna à direita do texto
                    rep.check(lado, f"{w}x{h} {pid}: registro ao lado do texto")
                r = pg.evaluate(VIS_JS, ["#pr-ir-nota"] + (["#pr-copiar", "#pr-texto"] if lado else []))
                # com os primeiros campos preenchidos o 1º vazio fica mais embaixo: o Copiar tem de continuar à vista
                pg.evaluate("() => { prCampos(prAberto).filter(c => c.tipo === 'opcoes').slice(0, 4).forEach(c => { const b = document.querySelector(`.pr-op[data-c=\"${c.id}\"]`); if (b.getAttribute('aria-pressed') !== 'true') b.click(); }); document.querySelector('#pr-body').scrollTop = 0; }")
                pg.click("#pr-ir-nota"); pg.wait_for_timeout(60)
                r2 = pg.evaluate("() => document.activeElement")
                r2 = pg.evaluate(VIS_JS, ["#pr-copiar", "#pr-nota-h"])
                foco = pg.evaluate("() => { const a = document.activeElement; const r = a.getBoundingClientRect(); const c = document.elementFromPoint(r.left + 10, r.top + r.height / 2); return !!a.closest('.pr-nota') && !!c && (c === a || a.contains(c)); }")
                bad = {k: v for k, v in {**r, **r2}.items() if v != "ok"}
                tot += 1
                ok += not bad and foco
                rep.check(not bad and foco, f"{modo} {w}x{h} {pid}: {bad} foco-visível={foco}")
            f = pg.evaluate(FOCO_JS)
            rep.check(not f["nruins"], f"{modo} {w}x{h} dreno: controles escondidos ao focar {f['ruins']}")
            rep.note(f"layout {modo} {w}x{h}: {ok}/{tot} com o registro alcançável (lado={pg.evaluate('prNotaLado()')}), {f['n']} controles focáveis visíveis")
            rep.check(not p.problems, f"layout {w}x{h} console: " + "; ".join(p.problems[:3]))
            p.close()
    for w, h in CELULARES:
        p = Page(browser, base + "#/procedimentos", w, h)
        pg = p.page
        pg.click('#pr-lista .pr-item[data-id="dreno"]'); pg.wait_for_timeout(120)
        r = pg.evaluate(VIS_JS, ["#pr-barra-copiar", "#pr-barra-ir"])
        rep.check(all(v == "ok" for v in r.values()), f"{w}px: barra fixa visível ao abrir: {r}")
        pg.click("#pr-barra-copiar"); pg.wait_for_timeout(40)
        rep.check(pg.evaluate("window.__clip") == pg.evaluate("prTexto(prAberto)"), f"{w}px: Copiar da barra")
        pg.click("#pr-barra-ir"); pg.wait_for_timeout(250)
        r = pg.evaluate(VIS_JS, ["#pr-copiar"])
        rep.check(pg.evaluate("document.querySelector('#pr-barra').hidden") and r["#pr-copiar"] == "ok",
                  f"{w}px: com o registro na tela a barra some e o Copiar do registro aparece: {r}")
        f = pg.evaluate(FOCO_JS)
        rep.check(not f["nruins"], f"{w}px: controles escondidos ao focar {f['ruins']}")
        sx = pg.evaluate("() => document.documentElement.scrollWidth > innerWidth")
        rep.check(not sx, f"{w}px: rolagem horizontal")
        rep.note(f"layout {w}x{h}: barra ok, {f['n']} controles focáveis visíveis")
        rep.check(not p.problems, f"{w}px console: " + "; ".join(p.problems[:3]))
        p.close()


SIZES = [(1366, 768), (1440, 900), (390, 844), (320, 640)]


def shots(browser, url, out_dir):
    rep = Report("procedimentos: capturas")
    os.makedirs(out_dir, exist_ok=True)
    base = url.split("#")[0]
    for w, h in SIZES:
        tag = f"{w}x{h}"
        phone = w <= 820
        for modo in [""]:   # a receita já some de verdade nesta aba (rx:false)
            p = Page(browser, base + "#/procedimentos", w, h)
            pg = p.page
            pg.screenshot(path=f"{out_dir}/proc-lista{modo}-{tag}.png")
            pg.evaluate("() => navigate('procedimentos', 'iot', 'load')"); pg.wait_for_timeout(120)
            pg.screenshot(path=f"{out_dir}/proc-iot{modo}-{tag}.png")
            pg.evaluate("() => navigate('procedimentos', 'dreno', 'load')"); pg.wait_for_timeout(80)
            pg.click('.pr-op[data-c="lado"][data-v="DIREITO"]')
            pg.click('.pr-op[data-c="indicacao"][data-v="HEMOTÓRAX"]')
            pg.fill("#pr-c-calibre", "28")
            pg.evaluate("prIrNota()"); pg.wait_for_timeout(250)
            pg.screenshot(path=f"{out_dir}/proc-dreno-parcial{modo}-{tag}.png")
            pg.evaluate("""() => { prCampos(prAberto).forEach(c => { if (c.opcional || prEst(prAberto).vals[c.id]) return;
                if (c.tipo === 'opcoes') document.querySelector(`.pr-op[data-c="${c.id}"]`).click();
                else { const i = document.querySelector('#pr-c-' + c.id); i.value = {anestesia: 'lidocaína 2% 10 mL', fixacao: '12', volume: '400'}[c.id] || 'x'; i.dispatchEvent(new Event('input')); } }); }""")
            pg.evaluate("() => document.querySelector('#pr-texto').scrollIntoView({block: 'nearest'})"); pg.wait_for_timeout(60)
            pg.screenshot(path=f"{out_dir}/proc-dreno-completo{modo}-{tag}.png")
            pg.evaluate("() => scrollTo(0, 0)")
            if phone:
                pg.click("#busca-abrir")
            else:
                pg.keyboard.press("Control+k")
            pg.keyboard.type("dreno"); pg.wait_for_timeout(120)
            pg.screenshot(path=f"{out_dir}/proc-busca-dreno{modo}-{tag}.png")
            rep.check(not p.problems, f"{tag}{modo}: " + "; ".join(p.problems[:3]))
            p.close()
    rep.note(f"capturas em {out_dir}")
    return rep.done()
