"""Calculadoras: comportamento da aba (peso vazio, peso global, pesos estimados, endereços, busca, ＋ Receita, Copiar,
teclado, alertas de faixa/máximo) e, com --shots, as capturas de tela. As contas ficam em calc_paridade.py."""
import os
from lib import Page, Report

PG = """() => ({hash: location.hash, view: document.body.dataset.view, aberta: cxAberta && cxAberta.id,
  titulo: (document.querySelector('#cx-h') || {}).textContent || null, foco: document.activeElement && document.activeElement.id,
  peso: peso, pin: (document.querySelector('#cx-peso') || {}).value ?? null})"""


def ir(pg, base, h):
    pg.goto("about:blank")
    pg.goto(base + h)
    pg.wait_for_timeout(60)


def limpar(pg):
    """Limpar da receita (= paciente novo). O botão só liga com algo na receita: põe um item antes, se preciso."""
    pg.evaluate("() => { if (document.querySelector('#btn-clear').disabled) addItem(['TESTE', '1', 'x']); }")
    pg.click("#btn-clear")


def sem_peso(pg, rep):
    """Sem peso: nenhum número calculado com peso suposto em nenhuma página; doses fixas continuam funcionando."""
    pags = pg.evaluate("() => CX_PAGS.map(p => [p.id, p.tipo, p.tipo === 'inf' ? CM.byKg(p.D.un) : null])")
    n = 0
    for pid, tipo, wk in pags:
        pg.evaluate(f"() => navigate('calculadoras', {pid!r}, 'click')")
        r = pg.evaluate("""() => {
          const q = s => document.querySelector(s), rows = [...document.querySelectorAll('.cx-row')];
          const its = cxLinhasPag(cxAberta).map(l => l.it);
          return { vz: q('#cx-vazao') && [q('#cx-vazao').value, q('#cx-vazao').disabled], rx: q('#cx-rx') && [q('#cx-rx').className, q('#cx-rx').textContent],
            copiar: q('#cx-copiar') && q('#cx-copiar').disabled, meta: q('#cx-meta') && q('#cx-meta').textContent,
            tt: [...document.querySelectorAll('#cx-tt tr')].map(tr => tr.children[1].textContent),
            linhas: rows.map(r => ({k: r.dataset.row, falta: !!r.querySelector('.dz .falta'), cp: !!r.querySelector('.cx-cp')})),
            peso: its.map(it => !!(it.calc || it.d)), tudo: q('#cx-tudo') ? q('#cx-tudo').disabled : null,
            txt: q('#cx-conteudo').innerText };
        }""")
        if tipo == "inf" and wk:
            ok = (r["vz"] == ["", True] and "vazio" in r["rx"][0] and r["copiar"] and set(r["tt"]) == {"—"} and "=" not in r["meta"]
                  and "gotas/min" not in r["meta"])
            rep.check(ok, f"sem peso {pid}: {r['vz']} {r['rx']} {r['copiar']} {r['tt']} {r['meta']!r}")
        elif tipo == "inf":
            rep.check(r["vz"][0] not in ("", None) and not r["vz"][1] and "vazio" not in r["rx"][0], f"{pid} não depende do peso e calcula sem peso: {r['vz']} {r['rx']}")
        else:
            rows = {x["k"]: x for x in r["linhas"]}
            keys = [k for k in rows]
            if tipo == "sit":
                for k, dep in zip(keys, r["peso"]):
                    x = rows[k]
                    rep.check(x["falta"] == dep and x["cp"] == (not dep), f"sem peso {k}: depende={dep} {x}")
            else:   # intubação: só as linhas por peso (as de bolus fixo têm cópia)
                rep.check(all(x["falta"] and not x["cp"] for k, x in rows.items() if not k.startswith("iot.push")) and r["tudo"] is True,
                          f"sem peso iot: {r['linhas']} tudo={r['tudo']}")
            if r["tudo"] is not None and any(r["peso"]):
                rep.check(r["tudo"] is True, f"{pid}: Copiar tudo desligado sem peso")
        rep.check(" kg (" not in r["txt"] and "peso 70" not in r["txt"], f"{pid}: texto com peso sem peso digitado")
        n += 1
    rep.note(f"sem peso: {n} páginas conferidas")


def run(browser, url):
    rep = Report("calculadoras: comportamento")
    base = url.split("#")[0]
    p = Page(browser, base + "#/calculadoras")
    pg = p.page
    st = lambda: pg.evaluate(PG)

    # --- aba, lista, endereços
    s = st()
    rep.check(s["view"] == "calculadoras" and s["aberta"] is None and s["hash"] == "#/calculadoras", f"#/calculadoras: {s}")
    tabs = pg.evaluate("() => [...document.querySelectorAll('.top-tab')].map(t => t.dataset.view)")
    rep.check(tabs.index("prescricoes") < tabs.index("calculadoras") < tabs.index("rascunho"), f"ordem das abas: {tabs}")
    ids = pg.evaluate("() => CX_PAGS.map(p => p.id)")
    rep.check(len(ids) == len(set(ids)) == pg.evaluate("() => document.querySelectorAll('#cx-lista .cx-item').length"), f"lista: {len(ids)} páginas")
    for pid in ids:
        ir(pg, base, "#/calculadoras/" + pid)
        s = st()
        rep.check(s["aberta"] == pid and s["hash"] == "#/calculadoras/" + pid and s["titulo"] and "rascunho" in s["titulo"],
                  f"endereço {pid}: {s}")
    for bad in ["#/calculadoras/naoexiste", "#/calculadoras/nora.3", "#/calculadoras/emg-parada.99", "#/calculadoras/.1"]:
        ir(pg, base, bad)
        s = st()
        rep.check(s["view"] == "calculadoras" and s["aberta"] is None and s["hash"] == "#/calculadoras", f"inválido {bad}: {s}")
    ir(pg, base, "#/calculadoras/emg-arritmias.1")
    s = st()
    hl = pg.evaluate("() => { const r = document.querySelector('[data-row=\"emg-arritmias.1\"]'); return r && r.classList.contains('hl'); }")
    rep.check(s["aberta"] == "emg-arritmias" and s["hash"] == "#/calculadoras/emg-arritmias" and hl, f"endereço de uma linha: {s} hl={hl}")
    # cliques + voltar/avançar
    ir(pg, base, "#/calculadoras")
    pg.click('#cx-lista .cx-item[data-id="nora"]'); pg.wait_for_function("location.hash === '#/calculadoras/nora'")
    pg.click('#cx-lista .cx-item[data-id="iot"]'); pg.wait_for_function("location.hash === '#/calculadoras/iot'")
    pg.click("#tab-prescricoes"); pg.wait_for_function("location.hash === '#/prescricoes'")
    pg.click("#tab-calculadoras"); pg.wait_for_function("location.hash === '#/calculadoras/iot'")
    rep.check(st()["aberta"] == "iot", "voltar à aba mantém a calculadora aberta")
    pg.evaluate("history.back()"); pg.wait_for_function("location.hash === '#/prescricoes'")
    pg.evaluate("history.back()"); pg.wait_for_function("location.hash === '#/calculadoras/iot'")
    pg.evaluate("history.back()"); pg.wait_for_function("location.hash === '#/calculadoras/nora'")
    rep.check(st()["aberta"] == "nora", "voltar refaz o caminho")
    pg.evaluate("history.back()"); pg.wait_for_function("location.hash === '#/calculadoras'")
    rep.check(st()["aberta"] is None, "voltar até a lista fecha a calculadora")
    # filtro da lista (sem acento)
    pg.fill("#cx-filtro", "fenitoina")
    got = pg.evaluate("() => [...document.querySelectorAll('#cx-lista .cx-item')].map(b => b.dataset.id)")
    rep.check(got == ["emg-convulsao", "ped-convulsao"], f"filtro 'fenitoina': {got}")
    pg.fill("#cx-filtro", "")

    # --- sem peso: nada calculado com peso suposto
    sem_peso(pg, rep)

    # --- peso global: Prescrições → Calculadoras → Prescrições, e Limpar
    ir(pg, base, "")
    cid = pg.evaluate("() => DATA.find(c => c.blocks.some(b => b.mode === 'ped' && b.items.some(it => it[4]))).id")
    ir(pg, base, "#/prescricoes/" + cid)
    pg.click('.pac-tab[data-pac="ped"]')
    pg.fill("#peso", "12")
    pg.click("#tab-calculadoras")
    pg.evaluate("() => navigate('calculadoras', 'ped-parada', 'click')")
    s = st()
    rep.check(s["pin"] == "12" and s["peso"] == 12 and pg.evaluate("CM.S.kg") == 12, f"peso das Prescrições aparece nas Calculadoras: {s}")
    pg.fill("#cx-peso", "18,5")
    pg.click("#tab-prescricoes")
    v = pg.evaluate("() => [document.querySelector('#peso').value, peso, document.querySelector('.peso-hint').textContent]")
    rep.check(v[0] == "18,5" and v[1] == 18.5 and "18,5" in v[2], f"peso das Calculadoras aparece nas Prescrições: {v}")
    pg.locator("#mid-body .item:visible").first.click()
    pg.click("#tab-calculadoras")
    limpar(pg)
    s = st()
    rep.check(s["peso"] is None and s["pin"] == "" and pg.evaluate("Number.isNaN(CM.S.kg)"), f"Limpar zera o peso aqui também: {s}")
    pg.click("#tab-prescricoes")
    rep.check(pg.evaluate("() => document.querySelector('#peso').value") == "", "Limpar zera o campo das Prescrições")

    # --- pesos estimados (um clique) e etiqueta "peso estimado"
    ir(pg, base, "#/calculadoras/nora")
    pg.click('.cx-pchip[data-kg="70"]')
    r = pg.evaluate("() => [peso, document.querySelector('#cx-peso').value, document.querySelector('#cx-peso-st').textContent, document.querySelector('.cx-pchip[data-kg=\"70\"]').getAttribute('aria-pressed'), document.querySelector('#cx-rx').textContent]")
    rep.check(r[0] == 70 and r[1] == "70" and r[2] == "peso estimado" and r[3] == "true" and "(peso 70 kg)" in r[4], f"chip 70 kg: {r}")
    pg.fill("#cx-peso", "72")
    r = pg.evaluate("() => [peso, document.querySelector('#cx-peso-st').textContent, document.querySelector('.cx-pchip[data-kg=\"70\"]').getAttribute('aria-pressed')]")
    rep.check(r == [72, "", "false"], f"peso digitado tira a etiqueta: {r}")
    # criança: idade → peso estimado (explícito, com a fórmula)
    limpar(pg)
    ir(pg, base, "#/calculadoras/ped-parada")
    rep.check(pg.evaluate("() => document.querySelector('#cx-estimar').hidden"), "sem idade, nenhum peso estimado aparece")
    pg.fill("#cx-idade", "4")
    t = pg.evaluate("() => document.querySelector('#cx-estimar').innerText")
    rep.check("16 kg" in t and "2 × anos + 8" in t and pg.evaluate("peso") is None, f"idade 4 → estimativa mostrada, não aplicada: {t!r}")
    pg.click("#cx-usar-est")
    r = pg.evaluate("() => [peso, document.querySelector('#cx-peso').value, document.querySelector('#cx-peso-st').textContent]")
    rep.check(r == [16, "16", "peso estimado pela idade"], f"Usar 16 kg: {r}")
    pg.select_option("#cx-idade-un", "m"); pg.fill("#cx-idade", "6")
    t = pg.evaluate("() => document.querySelector('#cx-estimar').innerText")
    rep.check("7 kg" in t and "0,5 × meses + 4" in t, f"6 meses: {t!r}")
    limpar(pg)

    # --- ＋ Receita e Copiar (bomba)
    ir(pg, base, "#/calculadoras/nora")
    pg.fill("#cx-peso", "70")
    rx = pg.evaluate("() => CM.infusao('dose').rx")
    pg.click("#cx-copiar")
    pg.wait_for_timeout(50)
    rep.check(pg.evaluate("window.__clip") == rx and rx.startswith("Noradrenalina: 4 amp"), f"Copiar copia o texto pronto: {pg.evaluate('window.__clip')!r}")
    pg.click("#cx-receita")
    r = pg.evaluate("() => [document.querySelector('#rx').value, document.querySelector('#free-edit').checked]")
    rep.check(r[0].endswith(rx) and r[1], f"＋ Receita leva o texto à receita em edição livre: {r}")
    # linhas: Copiar, ＋ Receita, Copiar tudo
    pg.evaluate("() => navigate('calculadoras', 'emg-parada', 'click')")
    k = "emg-parada.2"
    pg.click(f'.cx-cp[data-k="{k}"]'); pg.wait_for_timeout(50)
    exp = pg.evaluate("() => CM.linha(CM.EMG[0].itens[2], 70, null, false).copy")
    rep.check(pg.evaluate("window.__clip") == exp and "70–105 mg" in exp, f"Copiar da linha: {pg.evaluate('window.__clip')!r}")
    pg.click(f'.cx-rxb[data-k="{k}"]')
    rep.check(pg.evaluate("document.querySelector('#rx').value").endswith(exp), "＋ Receita da linha")
    pg.click("#cx-tudo"); pg.wait_for_timeout(50)
    tudo = pg.evaluate("window.__clip")
    rep.check(tudo.startswith("Parada cardíaca — peso 70 kg\n• Adrenalina IV/IO: 1 mg") and tudo.count("\n• ") == 5, f"Copiar tudo: {tudo!r}")
    pg.evaluate("() => navigate('calculadoras', 'iot', 'click')")
    pg.click("#cx-tudo"); pg.wait_for_timeout(50)
    rep.check(pg.evaluate("window.__clip") == pg.evaluate("CM.kitText()") and pg.evaluate("window.__clip").startswith("Kit SRI — peso 70 kg"), "Copiar kit SRI = kitText (sem escolha)")
    limpar(pg)

    # --- teclado: foco ao abrir, Enter no peso, Enter na dose copia, ordem do Tab segue os passos
    ir(pg, base, "#/calculadoras")
    pg.click('#cx-lista .cx-item[data-id="dobu"]')
    rep.check(st()["foco"] == "cx-peso", f"sem peso, abrir põe o foco no peso: {st()['foco']}")
    pg.keyboard.type("80"); pg.keyboard.press("Enter")
    rep.check(st()["foco"] == "cx-dose", f"Enter no peso leva à dose: {st()['foco']}")
    pg.keyboard.type("10"); pg.keyboard.press("Enter"); pg.wait_for_timeout(60)
    clip = pg.evaluate("window.__clip")
    toast_ = pg.evaluate("() => document.querySelector('#toast').className.includes('show') && document.querySelector('#toast').textContent")
    rep.check(clip and "= 10 mcg/kg/min (peso 80 kg)" in clip and toast_ == "Prescrição copiada!", f"Enter na dose copia: {clip!r} {toast_!r}")
    pg.click('#cx-lista .cx-item[data-id="nora"]')
    rep.check(st()["foco"] == "cx-dose", f"com peso, abrir põe o foco na dose: {st()['foco']}")
    pg.focus("#cx-peso")
    seq = []
    for _ in range(40):
        pg.keyboard.press("Tab")
        seq.append(pg.evaluate("() => { const a = document.activeElement; return a.id || a.dataset.pre && 'pre' + a.dataset.pre || a.dataset.kg && 'kg' || a.className; }"))
    want = ["pre0", "cx-edita", "cx-menos", "cx-dose", "cx-mais", "cx-vazao", "cx-copiar", "cx-receita"]
    pos = [seq.index(w) if w in seq else -1 for w in want]
    rep.check(-1 not in pos and pos == sorted(pos), f"ordem do Tab segue ① ② ③: {list(zip(want, pos))}")
    # "/" e Ctrl+K continuam funcionando; "/" dentro de um campo é só um caractere
    pg.focus("#cx-dose"); pg.keyboard.press("/")
    rep.check(st()["foco"] == "cx-dose", "'/' dentro do campo da dose não abre a busca")
    pg.click("#cx-h"); pg.keyboard.press("/")
    rep.check(st()["foco"] == "busca-input", "'/' fora de campos abre a busca")
    pg.keyboard.press("Escape"); pg.keyboard.press("Control+k")
    rep.check(st()["foco"] == "busca-input", "Ctrl+K abre a busca")
    pg.keyboard.press("Escape"); pg.keyboard.press("Escape")

    # --- faixa usual e dose máxima (nitroprussiato: faixa 0,3–3, máx 8)
    pg.evaluate("() => navigate('calculadoras', 'nipride', 'click')")
    for dose, aviso, mk in (("1", "", "ok"), ("5", "Acima da faixa usual", "amber"), ("9", "Acima da dose máxima", "red"), ("0,1", "Abaixo da faixa usual", "amber")):
        pg.fill("#cx-dose", dose)
        r = pg.evaluate("() => { const a = document.querySelector('#cx-aviso'); return [a.hidden ? '' : a.textContent, a.classList.contains('red'), document.querySelector('#cx-escala .mk').className]; }")
        rep.check(r[0].startswith(aviso) and (aviso != "" or r[0] == "") and r[2] == "mk " + mk and r[1] == (mk == "red"), f"nipride {dose}: {r}")
    # − / + andam pela tabela de titulação
    pg.fill("#cx-dose", "1"); pg.click("#cx-mais")
    rep.check(pg.input_value("#cx-dose") == "2", f"+ vai para a próxima dose da tabela: {pg.input_value('#cx-dose')}")
    pg.click("#cx-menos"); pg.click("#cx-menos")
    rep.check(pg.input_value("#cx-dose") == "0,5", f"− volta: {pg.input_value('#cx-dose')}")
    # a vazão digitada calcula a dose
    pg.fill("#cx-vazao", "10,5")
    r = pg.evaluate("() => [document.querySelector('#cx-dose').value, CM.infusao('rate', '10,5').doseIn]")
    rep.check(r[0] == r[1] and r[0], f"vazão → dose: {r}")
    # o que a tela mostra = o que o motor calcula (todas as infusões, 70 kg)
    bad = pg.evaluate("""() => CX_PAGS.filter(p => p.tipo === 'inf').filter(p => {
        navigate('calculadoras', p.id, 'click');
        const r = CM.infusao('dose');
        return document.querySelector('#cx-rx').textContent !== r.rx || document.querySelector('#cx-conc').textContent !== r.concTxt
          || document.querySelector('#cx-vazao').value !== r.rateIn; }).map(p => p.id)""")
    rep.check(not bad, f"tela = motor nas infusões: {bad}")
    # esquema com teto (heparina SCA: máx 1.000 UI/h): 100 kg → 10 UI/kg/h
    pg.evaluate("() => navigate('calculadoras', 'hnf', 'click')")
    pg.fill("#cx-peso", "100")
    pg.click('[data-reg="1"]')
    r = pg.evaluate("() => [document.querySelector('#cx-dose').value, document.querySelector('#cx-vazao').value, document.querySelector('#cx-aviso').textContent]")
    rep.check(r[0] == "10" and r[2].startswith("Dose limitada ao teto de 1.000 UI/h"), f"heparina SCA 100 kg: {r}")
    limpar(pg)

    # --- busca única: um remédio dentro de uma situação abre a página certa com a linha destacada
    pg.click("#cx-h") if pg.locator("#cx-h").count() else None
    pg.keyboard.press("Control+k"); pg.keyboard.type("adenosina")
    res = pg.evaluate("() => buscaRes.map(r => r.v.key + ':' + r.e.id)")
    rep.check({"calculadoras:emg-arritmias.1", "calculadoras:ped-parada.4", "calculadoras:ped-parada.5"} <= set(res), f"busca 'adenosina': {res}")
    i = res.index("calculadoras:emg-arritmias.1") if "calculadoras:emg-arritmias.1" in res else 0
    for _ in range(i):
        pg.keyboard.press("ArrowDown")
    pg.keyboard.press("Enter"); pg.wait_for_timeout(80)
    r = pg.evaluate("""() => { const el = document.querySelector('[data-row="emg-arritmias.1"]'), sc = el.closest('.scroll');
        const a = el.getBoundingClientRect(), b = sc.getBoundingClientRect();
        return [location.hash, el.classList.contains('hl'), a.top >= b.top - 1 && a.bottom <= b.bottom + 1]; }""")
    rep.check(r == ["#/calculadoras/emg-arritmias", True, True], f"escolher Adenosina abre Arritmias com a linha destacada: {r}")
    pg.keyboard.press("Control+k"); pg.keyboard.type("noradrenalina")
    res = pg.evaluate("() => buscaRes.filter(r => r.v.key === 'calculadoras').map(r => r.e.id)")
    rep.check(res and res[0] == "nora", f"busca 'noradrenalina': {res}")
    pg.keyboard.press("Escape"); pg.keyboard.press("Escape")
    rep.check(not p.problems, "console: " + "; ".join(p.problems[:5]))
    p.close()

    revisao(browser, url, rep)
    layout(browser, url, rep)
    # foco por programa no título: sem moldura
    p = Page(browser, base + "#/calculadoras/emg-arritmias")   # página sem peso: o foco vai para o título
    o = p.page.evaluate("() => { const h = document.querySelector('#cx-h'); return [document.activeElement === h, getComputedStyle(h).outlineStyle]; }")
    rep.check(o == [True, "none"], f"título focado sem moldura: {o}")
    p.close()

    # --- celular: sem rolagem horizontal; abrir pela lista rola até a calculadora
    for w, h in ((390, 844), (320, 640)):
        p = Page(browser, base + "#/calculadoras", w, h)
        pg = p.page
        pg.click('#cx-lista .cx-item[data-id="nora"]'); pg.wait_for_timeout(80)
        top = pg.evaluate("() => document.querySelector('#col-calc').getBoundingClientRect().top")
        rep.check(0 <= top < 200, f"{w}px: abrir pela lista rola até a calculadora (top={top})")
        for pid in ("nora", "insu", "iot", "emg-parada", "ped-respiratorio", "emg-trombolise"):
            pg.evaluate(f"() => navigate('calculadoras', {pid!r}, 'click')")
            pg.fill("#cx-peso", "70") if pg.locator("#cx-peso").count() else None
            sx = pg.evaluate("() => document.documentElement.scrollWidth > innerWidth")
            rep.check(not sx, f"{w}px {pid}: rolagem horizontal")
        rep.check(not p.problems, f"{w}px console: " + "; ".join(p.problems[:3]))
        p.close()
    return rep.done()


# --- revisão clínica de 2026-11 (itens 1–13; ver CLAUDE.md, "Divergências em relação ao dilui")
NUM_CASOS = [("25.000", 25000, True), ("5.000", 5000, True), ("1.000", 1000, True), ("1.5", 1.5, False), ("0.5", 0.5, False),
             ("0,5", 0.5, False), ("1.250,5", 1250.5, True), ("70.5", 70.5, False), ("1,000", 1.0, False), ("12.345.678", 12345678, True),
             ("0.500", 0.5, False), ("25.00", 25.0, False), (" 25.000 ", 25000, True), ("abc", None, False), ("", None, False),
             ("1.2.3", None, False), ("1,2,3", None, False), ("--5", None, False)]
CAMPOS = [   # (página, preparo, campo, unidade mostrada)
    ("hnf", "", "#cx-peso", "kg"), ("ped-parada", "", "#cx-idade", "anos"), ("iot", "", "#cx-alt", "cm"),
    ("hnf", "", "#cx-dose", "UI/kg/h"), ("hnf", "", "#cx-vazao", "mL/h"),
    ("hnf", "#cx-edita", "#cx-a", None), ("hnf", "#cx-edita", "#cx-d", "mL"),
    ("hnf", "#cx-edita", "#cx-q", None), ("hnf", "#cx-edita", "#cx-ml", "mL")]
ACHA_JS = """([T, nome]) => { for (const s of CM[T]) for (const it of s.itens) if (it.n === nome || it.calc === nome) return it; return null; }"""


def revisao(browser, url, rep):
    base = url.split("#")[0]
    p = Page(browser, base + "#/calculadoras")
    pg = p.page
    # 1. leitura dos números: ponto de milhar só em "1.000", "25.000"…; vírgula decimal; ponto decimal fora disso
    for txt, v, mil in NUM_CASOS:
        r = pg.evaluate("(t) => { const i = CM.numInfo(t); return [Number.isFinite(i.v) ? i.v : null, i.milhar, Number.isFinite(CM.num(t)) ? CM.num(t) : null]; }", txt)
        rep.check(r[0] == v and r[2] == v and (r[1] == mil or v is None), f"num({txt!r}) = {r}, esperado {v} milhar={mil}")
    # cada campo: "25.000"-like vira milhar e o campo diz como entendeu; "1,5"/"70.5" não mostram nada
    for pag, prep, campo, un in CAMPOS:
        ir(pg, base, "#/calculadoras/" + pag)
        if campo not in ("#cx-peso",) and pg.locator("#cx-peso").count():
            pg.fill("#cx-peso", "70")
        if prep:
            pg.click(prep)
        if un is None:
            un = pg.evaluate("(c) => c === '#cx-q' ? cxAberta.D.amp.u : (cxAberta.D.ampLabel ? 'mL' : 'ampolas')", campo)
        ent = lambda: pg.evaluate("(c) => { const s = document.querySelector(`.cx-ent[data-for=\"${c.slice(1)}\"]`); return s && !s.hidden ? s.textContent : ''; }", campo)
        for txt, esperado in (("1.000", f"entendido: 1.000 {un}"), ("1,5", ""), ("70.5", ""), ("abc", "")):
            pg.fill(campo, txt)
            rep.check(ent() == esperado, f"{pag} {campo} {txt!r}: {ent()!r} (esperado {esperado!r})")
        pg.fill(campo, "1.000")
        limpar(pg)
    # o número entendido entra na conta: heparina 25.000 UI em 250 mL → 100 UI/mL; peso "1.000" = 1000 kg é recusado
    ir(pg, base, "#/calculadoras/hnf")
    pg.fill("#cx-peso", "70"); pg.click("#cx-edita")
    pg.fill("#cx-a", "1"); pg.fill("#cx-q", "25.000"); pg.fill("#cx-ml", "5"); pg.fill("#cx-d", "245")
    conc = pg.evaluate("() => document.querySelector('#cx-conc').textContent")
    rep.check(conc.startswith("100 UI/mL"), f"heparina 1 amp de 25.000 UI + 245 mL → 100 UI/mL: {conc!r}")
    pg.fill("#cx-peso", "1.000")
    rep.check(pg.evaluate("peso") is None, f"peso '1.000' (= 1000 kg) recusado: {pg.evaluate('peso')}")
    limpar(pg)

    lin = lambda T, nome, kg, idade, ped: pg.evaluate("([T, n, kg, a, ped]) => { const f = " + ACHA_JS + "; return CM.linha(f([T, n]), kg, a, ped); }", [T, nome, kg, idade, ped])
    # 2. enoxaparina ≥ 75 anos: 120 kg → 75 mg com a etiqueta do teto
    r = lin("EMG", "Enoxaparina (IAM com fibrinólise, ≥ 75 anos)", 120, None, False)
    rep.check(r["main"] == "75 mg" and r["caps"] == ["dose máxima 75 mg"] and "ClCr < 30: 1 mg/kg SC 1×/dia" in r["nota"], f"enoxaparina ≥ 75 a, 120 kg: {r['main']} {r['caps']}")
    ir(pg, base, "#/calculadoras/emg-anticoagulacao")
    pg.fill("#cx-peso", "120")
    t = pg.evaluate("() => [...document.querySelectorAll('.cx-row')].find(r => r.textContent.includes('≥ 75 anos')).textContent")
    rep.check("75 mg" in t and "dose máxima 75 mg" in t, f"tela da enoxaparina 120 kg: {t!r}")
    # 3. morfina adulto diluída a 1 mg/mL: 70 kg → 3,5–7 mL
    r = lin("EMG", "Morfina", 70, None, False)
    rep.check(r["main"] == "3,5–7 mg" and r["small"] == "3,5–7 mL" and "Diluir para 1 mg/mL" in r["sub"], f"morfina 70 kg: {r['main']} {r['small']} {r['sub']}")
    # 4. kit SRI: começa no padrão do médico (etomidato + succinilcolina), um de cada; alternativas a um clique
    ir(pg, base, "#/calculadoras/iot")
    pg.fill("#cx-peso", "70")
    nomes = lambda k: pg.evaluate(f"() => [...document.querySelectorAll('.cx-kit [data-kit=\"{k}\"][aria-pressed=\"true\"]')].map(b => b.textContent)")
    rep.check(nomes("ind") == ["Etomidato"] and nomes("bnm") == ["Succinilcolina"], f"kit pré-escolhido: {nomes('ind')} {nomes('bnm')}")
    def kit_ok(kit, ind, bnm):
        todos = ["Etomidato", "Cetamina", "Propofol", "Midazolam", "Succinilcolina", "Rocurônio"]
        return (f"• Indução: {ind}:" in kit and f"• Bloqueador: {bnm}:" in kit and "escolher" not in kit and " | " not in kit
                and all(n not in kit for n in todos if n not in (ind, bnm)) and kit.count("\n• ") == 3)
    pg.click("#cx-tudo"); pg.wait_for_timeout(50)
    kit = pg.evaluate("window.__clip")
    rep.check(kit == pg.evaluate("CM.kitText()") and kit_ok(kit, "Etomidato", "Succinilcolina") and "Etomidato: 21 mg = 10,5 mL" in kit, f"kit padrão: {kit!r}")
    pg.click('.cx-kit [data-kit="ind"][data-i="1"]'); pg.click('.cx-kit [data-kit="bnm"][data-i="1"]')
    rep.check(pg.evaluate("[document.activeElement.dataset.kit, document.activeElement.dataset.i]") == ["bnm", "1"], "o foco volta ao botão clicado")
    pg.click("#cx-tudo"); pg.wait_for_timeout(50)
    kit = pg.evaluate("window.__clip")
    rep.check(kit == pg.evaluate("CM.kitText(1, 1)") and kit_ok(kit, "Cetamina", "Rocurônio"), f"kit Cetamina + Rocurônio: {kit!r}")
    pg.click('.cx-kit [data-kit="bnm"][data-i="1"]')
    rep.check(nomes("bnm") == ["Rocurônio"], f"clicar no já escolhido não desmarca: {nomes('bnm')}")
    pg.click('.cx-kit [data-kit="ind"][data-i="2"]'); pg.click("#cx-tudo"); pg.wait_for_timeout(50)
    rep.check(kit_ok(pg.evaluate("window.__clip"), "Propofol", "Rocurônio"), "kit Propofol + Rocurônio")
    limpar(pg)
    rep.check(pg.evaluate("() => cxKit.ind === CM.KIT_PADRAO.ind && cxKit.bnm === CM.KIT_PADRAO.bnm"), "Limpar volta ao padrão do kit")
    ped = pg.evaluate("() => { CM.S.age = 3; const kg = CM.S.kg; CM.S.kg = 14; const t = CM.kitText(); CM.S.kg = kg; CM.S.age = null; return t; }")
    rep.check("Atropina (se indicada):" in ped and kit_ok(ped.replace("\n• Atropina", " Atropina"), "Etomidato", "Succinilcolina"), f"kit pediátrico: {ped!r}")
    # 5. salbutamol: via INAL
    r = lin("PED", "salbutamol", 20, None, True)
    rep.check(r["via"] == "INAL", f"salbutamol via: {r['via']}")
    # 6. adrenalina IM pediátrica: 35 kg sem idade → 0,3 mg (teto); com 13 anos → 0,35 mg
    a, b = lin("PED", "Adrenalina IM (anafilaxia)", 35, None, True), lin("PED", "Adrenalina IM (anafilaxia)", 35, 13, True)
    rep.check(a["main"] == "0,3 mg" and a["caps"] == ["dose máxima 0,3 mg"] and b["main"] == "0,35 mg" and not b["caps"], f"adrenalina IM 35 kg: {a['main']} {a['caps']} / 13 a: {b['main']} {b['caps']}")
    c = lin("PED", "Adrenalina IM (anafilaxia)", 60, 13, True)
    rep.check(c["main"] == "0,5 mg", f"adrenalina IM 60 kg, 13 anos: {c['main']}")
    # 7–13. notas e textos
    notas = [("EMG", "Ácido tranexâmico (HPP)", "Até 3 h do parto. Repetir 1 g se sangramento persistir após 30 min."),
             ("PED", "Diazepam retal", "< 2 anos: uso fora da bula. Usar a solução injetável 5 mg/mL por via retal."),
             ("PED", "Midazolam (ansiólise)", "< 6 meses: sem dose estabelecida em bula"),
             ("EMG", "Alteplase (TEP)", "PCR por TEP: 50 mg em bolus; pode repetir após 15 min.")]
    for T, nome, frase in notas:
        r = lin(T, nome, 20 if T == "PED" else 70, None, T == "PED")
        rep.check(frase in (r.get("nota") or ""), f"nota de {nome}: {r.get('nota')!r}")
    r = lin("EMG", "Flumazenil", 70, None, False)
    rep.check(r.get("fixo") == "0,2 mg IV em 15 s; se preciso, 0,1 mg a cada 60 s (máx 1 mg)" and r["fixo"] in r["copy"], f"flumazenil: {r.get('fixo')!r}")
    obs = pg.evaluate("() => CX_PAGS.find(p => p.id === 'nipride').D.obs.join(' ')")
    rep.check("Máx (bula): 8 mcg/kg/min no adulto, por no máximo 10 min" in obs and "média ≤ 2,5 mcg/kg/min" in obs, f"nipride obs: {obs!r}")
    ir(pg, base, "#/calculadoras/emg-trombolise")
    rod = pg.evaluate("() => document.querySelector('.cx-rodape').textContent")
    rep.check("AHA/ASA 2026 (AVC isquêmico agudo)" in rod and "AHA/ASA 2019" not in rod, "rodapé AHA/ASA 2026")

    # caixa "Para o revisor": fechada, nas páginas certas, com o que mudou e o que falta decidir
    esperado = {"iot": ["etomidato + succinilcolina", "Atropina (se indicada)", "Seu padrão", "Succinilcolina", "Obesidade"],
                "emg-anticoagulacao": ["Enoxaparina", "Heparina"], "emg-analgesia": ["Morfina", "Furosemida"],
                "emg-hemorragia": ["Ácido tranexâmico"], "emg-antidotos": ["Flumazenil", "0,3 mg"],
                "emg-trombolise": ["Alteplase", "AHA/ASA 2026", "Estreptoquinase"], "emg-convulsao": ["Fenobarbital"],
                "emg-obstetricia": ["magnésio"], "ped-parada": ["Amiodarona", "via tubo"], "ped-respiratorio": ["INAL", "0,3 mg"],
                "ped-convulsao": ["Diazepam retal", "Midazolam IM"], "ped-analgesia": ["< 6 meses"],
                "nora": ["25.000"], "nipride": ["25.000", "2,5 mcg/kg/min"], "vaso": ["0,01–0,03"], "mgso4": ["20–30 min"], "propo": ["Propofol 2%"]}
    for pid in pg.evaluate("() => CX_PAGS.map(p => p.id)"):
        ir(pg, base, "#/calculadoras/" + pid)
        r = pg.evaluate("""() => { const d = document.querySelectorAll('.cx-revisor');
            return d.length ? {n: d.length, open: d[0].open, txt: d[0].textContent, mud: d[0].querySelectorAll('.mud li').length, pend: d[0].querySelectorAll('.pend li').length,
              alvo: cxRevisorItens(cxAberta)} : {n: 0, alvo: cxRevisorItens(cxAberta)}; }""")
        tem = bool(r["alvo"]["mud"] or r["alvo"]["pend"])
        rep.check(r["n"] == (1 if tem else 0), f"{pid}: caixa do revisor aparece {r['n']}× (itens: {tem})")
        if r["n"]:
            rep.check(r["open"] is False and r["mud"] == len(r["alvo"]["mud"]) and r["pend"] == len(r["alvo"]["pend"]), f"{pid}: caixa fechada e completa {r}")
        for frase in esperado.get(pid, []):
            rep.check(r["n"] and frase in r["txt"], f"{pid}: caixa do revisor sem {frase!r}")
    rep.check(set(esperado) - {"nora", "nipride", "vaso", "mgso4", "propo"} <= set(k for k in pg.evaluate("Object.keys(CALC_REVISAO)")), "páginas com itens")
    rep.check(not p.problems, "console (revisão): " + "; ".join(p.problems[:5]))
    p.close()


SIZES = [(1440, 900), (1366, 768), (1280, 720), (1024, 768), (390, 844), (320, 640)]
TELAS = [(1366, 768), (1280, 720), (1024, 768), (1440, 900)]   # monitores do hospital

VISIVEL_JS = """(sels) => {
  const area = document.querySelector('#cx-body').getBoundingClientRect();
  const pronto = document.querySelector('.cx-pronto');
  // nada grudado/fixo dentro da coluna da calculadora pode cobrir um campo
  const fixos = [...document.querySelectorAll('#col-calc *')].filter(e => ['sticky', 'fixed'].includes(getComputedStyle(e).position));
  const res = {};
  for (const s of sels){
    const el = document.querySelector(s);
    if (!el){ res[s] = 'ausente'; continue; }
    const r = el.getBoundingClientRect();
    const dentro = r.width > 0 && r.height > 0 && r.top >= area.top - 0.5 && r.bottom <= area.bottom + 0.5 && r.left >= area.left - 0.5 && r.right <= area.right + 0.5
                   && r.bottom <= innerHeight && r.right <= innerWidth;
    const cobre = [...fixos, ...(pronto && !pronto.contains(el) ? [pronto] : [])].filter(f => {
      const q = f.getBoundingClientRect(); return q.left < r.right && q.right > r.left && q.top < r.bottom && q.bottom > r.top; }).length;
    const c = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2);
    const topo = !!c && (c === el || el.contains(c));
    res[s] = dentro && !cobre && topo ? 'ok' : `dentro=${dentro} cobre=${cobre} topo=${topo} (${Math.round(r.top)}–${Math.round(r.bottom)} de ${Math.round(area.top)}–${Math.round(area.bottom)})`;
  }
  res.fixos = fixos.length;
  return res;
}"""


def layout(browser, url, rep):
    """② (campos, unidades, régua) e ③ (texto + botões) visíveis sem rolar, sem nada por cima, nos monitores do hospital."""
    base = url.split("#")[0]
    campos = ["#cx-dose", "#cx-vazao", "#cx-dose-un", "#cx-vazao-un", "#cx-escala .trk"]
    for w, h in TELAS:
        p = Page(browser, base + "#/calculadoras", w, h)
        pg = p.page
        ok = tot = 0
        for d in ("nora", "insu", "hnf", "vaso", "dobu", "propo"):
            for kg in (None, "70"):
                pg.evaluate(f"() => {{ navigate('calculadoras', {d!r}, 'click'); }}")
                if pg.locator("#cx-peso").count():
                    pg.fill("#cx-peso", kg or "")
                pg.evaluate("() => { document.querySelector('#cx-body').scrollTop = 0; }")
                sels = campos + (["#cx-rx", "#cx-copiar", "#cx-receita"] if kg or d == "vaso" else [])
                r = pg.evaluate(VISIVEL_JS, sels)
                bad = {k: v for k, v in r.items() if k != "fixos" and v != "ok"}
                tot += 1
                ok += not bad and r["fixos"] == 0
                rep.check(not bad and r["fixos"] == 0, f"{w}x{h} {d} peso={kg}: {bad} fixos={r['fixos']}")
                # a unidade fica ao lado do número (mesma linha do campo)
                lado = pg.evaluate("""() => [['#cx-dose', '#cx-dose-un'], ['#cx-vazao', '#cx-vazao-un']].every(([a, b]) => {
                    const x = document.querySelector(a).getBoundingClientRect(), y = document.querySelector(b).getBoundingClientRect();
                    return y.left >= x.right - 1 && y.top < x.bottom && y.bottom > x.top; })""")
                rep.check(lado, f"{w}x{h} {d}: unidade não está ao lado do número")
        rep.note(f"layout {w}x{h}: {ok}/{tot} telas com ② e ③ visíveis e nada por cima")
        rep.check(not p.problems, f"layout {w}x{h} console: " + "; ".join(p.problems[:3]))
        p.close()


def shots(browser, url, out_dir):
    """Capturas para revisão visual (não comparadas automaticamente)."""
    rep = Report("calculadoras: capturas")
    os.makedirs(out_dir, exist_ok=True)
    base = url.split("#")[0]
    for w, h in SIZES:
        tag = f"{w}x{h}"
        p = Page(browser, base + "#/calculadoras", w, h)
        pg = p.page
        phone = w <= 820

        def snap(nome):
            pg.wait_for_timeout(120)
            if phone:
                pg.evaluate("() => scrollIntoPlace(document.querySelector('#col-calc'))")
                pg.wait_for_timeout(60)
            pg.screenshot(path=f"{out_dir}/calc-{nome}-{tag}.png")
            if phone:
                pg.screenshot(path=f"{out_dir}/calc-{nome}-{tag}-inteira.png", full_page=True)

        pg.screenshot(path=f"{out_dir}/calc-lista-{tag}.png")
        pg.evaluate("() => navigate('calculadoras', 'nora', 'load')")
        snap("nora-sem-peso")
        pg.fill("#cx-peso", "70"); pg.fill("#cx-dose", "1,5")
        snap("nora-acima-da-faixa")
        pg.evaluate("() => navigate('calculadoras', 'insu', 'load')")
        snap("insulina")
        pg.evaluate("() => navigate('calculadoras', 'iot', 'load')")
        snap("intubacao")
        pg.evaluate("() => navigate('calculadoras', 'emg-parada', 'load')")
        snap("parada-adulto")
        limpar(pg)
        pg.evaluate("() => navigate('calculadoras', 'ped-convulsao', 'load')")
        pg.fill("#cx-idade", "4"); pg.click("#cx-usar-est")
        snap("ped-convulsao")
        pg.evaluate("() => navigate('calculadoras', 'nora', 'load')")
        pg.evaluate("() => scrollTo(0, 0)")
        if phone:
            pg.click("#busca-abrir")
        else:
            pg.keyboard.press("Control+k")
        pg.keyboard.type("midazolam")
        pg.wait_for_timeout(120)
        pg.screenshot(path=f"{out_dir}/calc-busca-{tag}.png")
        rep.check(not p.problems, f"{tag}: " + "; ".join(p.problems[:3]))
        p.close()
    rep.note(f"capturas em {out_dir}")
    return rep.done()
