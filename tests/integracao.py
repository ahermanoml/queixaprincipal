"""Cross-tab checks of the five tabs: receita column per tab, the shared weight, Limpar, busca única landing on a
score, a drug row and a procedure, the procedures' "Doses:" links to Calculadoras (and Back), and the tab bar."""
import json
from lib import Page, Report

STATE = """() => ({rxHidden: document.querySelector('#col-rx').hidden, rx: document.querySelector('#rx').value,
  peso: typeof peso === 'number' ? peso : null, cxPeso: (document.querySelector('#cx-peso') || {}).value,
  midPeso: (document.querySelector('#mid-body #peso') || {}).value, view: document.body.dataset.view, hash: location.hash})"""


def run(browser, url):
    rep = Report("integração das abas")
    base = url.split("#")[0]
    n = 0
    p = Page(browser, base)
    pg = p.page
    st = lambda: pg.evaluate(STATE)
    # receita filled on Prescrições, with a weight typed there
    pg.goto("about:blank"); pg.goto(base + "#/prescricoes/dengue"); pg.wait_for_timeout(60)
    pg.click('.pac-tab[data-pac="ped"]')
    pg.fill("#peso", "18")
    pg.locator(".addall:visible").first.click()
    s0 = st()
    rep.check(s0["peso"] == 18 and s0["rx"].startswith("PESO: 18 KG"), f"weight and receita on Prescrições: {s0['peso']} {s0['rx'][:20]!r}")
    for key in ("escores", "procedimentos"):
        pg.click(f"#tab-{key}")
        s = st()
        rep.check(s["rxHidden"] and s["peso"] == 18, f"{key}: receita hidden, weight kept: {s['rxHidden']} {s['peso']}")
    pg.click("#tab-rascunho")
    s = st()
    rep.check(not s["rxHidden"] and s["rx"] == s0["rx"], f"Meu rascunho: receita visible with its content: {s['rxHidden']}")
    pg.click("#tab-prescricoes")
    s = st()
    rep.check(not s["rxHidden"] and s["rx"] == s0["rx"] and s["midPeso"] in ("18", "18,0"), f"Prescrições: receita and weight back: {s['rxHidden']} {s['midPeso']!r}")
    pg.click("#tab-calculadoras")
    s = st()
    rep.check(not s["rxHidden"] and s["rx"] == s0["rx"] and s["peso"] == 18, f"Calculadoras: receita visible with its content, weight kept: {s['rxHidden']} {s['peso']}")
    pg.goto(base + "#/calculadoras/nora"); pg.wait_for_timeout(80)
    s = st()
    rep.check(s["cxPeso"] in ("18", "18,0"), f"Calculadoras shows the shared weight: {s['cxPeso']!r}")
    # weight typed in Calculadoras survives Escores and reaches Prescrições
    pg.fill("#cx-peso", "70")
    pg.click("#tab-escores"); pg.click("#tab-procedimentos"); pg.click("#tab-prescricoes")
    s = st()
    rep.check(s["peso"] == 70 and s["midPeso"] in ("70", "70,0") and s["rx"].startswith("PESO: 70 KG"),
              f"weight typed in Calculadoras, after Escores, on Prescrições: {s['peso']} {s['midPeso']!r} {s['rx'][:12]!r}")
    # Limpar clears it everywhere
    pg.click("#btn-clear")
    pg.click("#tab-calculadoras")
    s = st()
    rep.check(s["peso"] is None and not s["rx"] and (s["cxPeso"] or "") == "", f"Limpar clears receita and weight (Calculadoras too): {s}")
    n += 6
    # busca única: groups in tab order, lands on a score and on a drug row
    groups = pg.evaluate("""() => { const i = document.querySelector('#busca-input'); i.value = 'dor'; i.dispatchEvent(new Event('input'));
        return [...document.querySelectorAll('#busca-list [role=group]')].map(g => document.getElementById(g.getAttribute('aria-labelledby')).textContent.replace(/\\s*\\d+$/, '').trim()); }""")
    order = ["⭐ Meu rascunho", "💊 Prescrições", "📊 Escores", "🧮 Calculadoras", "🩺 Procedimentos"]
    rep.check(len(groups) >= 3 and groups == [g for g in order if g in groups], f"search groups in tab order: {groups}")
    pg.keyboard.press("Escape"); pg.keyboard.press("Escape")
    pg.keyboard.press("Control+k"); pg.keyboard.type("heart"); pg.keyboard.press("Enter"); pg.wait_for_timeout(80)
    s = st()
    rep.check(s["view"] == "escores" and s["hash"] == "#/escores/heart" and s["rxHidden"], f"search lands on the HEART score: {s['view']} {s['hash']}")
    entry = pg.evaluate("""() => { const i = document.querySelector('#busca-input'); i.value = 'adenosina'; i.dispatchEvent(new Event('input'));
        const r = buscaRes.find(r => r.v.key === 'calculadoras' && r.e.id.includes('.')); return r ? r.e.id : null; }""")
    rep.check(entry is not None, f"search finds a drug row inside a calculator: {entry}")
    if entry:
        idx = pg.evaluate("id => buscaRes.findIndex(r => r.e.id === id)", entry)
        pg.evaluate("i => buscaChoose(i)", idx)
        pg.wait_for_timeout(120)
        r = pg.evaluate(f"""() => {{ const el = document.querySelector('#cx-body [data-row="{entry.split('.', 1)[1]}"]') || document.querySelector('#cx-body .hl');
            const b = document.querySelector('#cx-body').getBoundingClientRect(), e = el && el.getBoundingClientRect();
            return [document.body.dataset.view, location.hash, !!el && el.classList.contains('hl'), !!e && e.top >= b.top - 1 && e.bottom <= b.bottom + 1]; }}""")
        rep.check(r[0] == "calculadoras" and r[1] == "#/calculadoras/" + entry.split(".")[0] and r[2] and r[3],
                  f"lands on the drug row, highlighted and on screen: {r}")
    n += 4
    # procedures by abbreviation
    for q, pid in (("IOT", "iot"), ("dreno", "dreno"), ("CVC", "cvc")):
        pg.keyboard.press("Control+k"); pg.keyboard.type(q); pg.wait_for_timeout(60)
        ids = pg.evaluate("() => buscaRes.map(r => r.v.key + ':' + r.e.id)")
        k = ids.index("procedimentos:" + pid) if "procedimentos:" + pid in ids else -1
        rep.check(k >= 0, f"search {q!r} lists procedure {pid}: {[x for x in ids if x.startswith('procedimentos')]}")
        if k >= 0:
            pg.evaluate("i => buscaChoose(i)", k); pg.wait_for_timeout(80)
            s = st()
            rep.check(s["view"] == "procedimentos" and s["hash"] == "#/procedimentos/" + pid and s["rxHidden"],
                      f"search {q!r} opens #/procedimentos/{pid}: {s['view']} {s['hash']}")
        n += 2
    # "Doses:" links: each opens the right calculator; Back returns to the procedure with ticks and note values intact
    links = pg.evaluate("() => PROCS.filter(p => (p.calc || []).length).map(p => [p.id, p.calc.map(c => c[0])])")
    total = 0
    for pid, calcs in links:
        for cid in calcs:
            pg.goto("about:blank"); pg.goto(base + "#/procedimentos/" + pid); pg.wait_for_timeout(60)
            pg.evaluate("() => { const c = document.querySelectorAll('#pr-body .pr-check input'); [0, 2].forEach(i => c[i] && !c[i].checked && c[i].click()); }")
            field = pg.evaluate("""() => { const i = [...document.querySelectorAll('#pr-body input[id^="pr-c-"]')].find(x => x.type !== 'checkbox');
                if (!i) return null; i.value = 'teste 123'; i.dispatchEvent(new Event('input', {bubbles: true})); return i.id; }""")
            opt = pg.evaluate("""() => { const b = document.querySelector('#pr-body .pr-op'); if (!b) return null; if (b.getAttribute('aria-pressed') !== 'true') b.click(); return [b.dataset.c, b.dataset.v]; }""")
            before = pg.evaluate("() => prTexto(prAberto)")
            pg.click("#pr-guia-como"); pg.click("#pr-cx-doses > summary")   # the links live in the "Doses" box of the "Como fazer" tab
            pg.click(f'#pr-body [data-calc="{cid}"]'); pg.wait_for_timeout(80)
            s = st()
            open_id = pg.evaluate("() => viewOf('calculadoras').itemId()")
            rep.check(s["view"] == "calculadoras" and s["hash"] == "#/calculadoras/" + cid and open_id == cid and not s["rxHidden"],
                      f"{pid} → Doses {cid}: {s['view']} {s['hash']} open={open_id}")
            pg.evaluate("history.back()"); pg.wait_for_function(f"location.hash === '#/procedimentos/{pid}'"); pg.wait_for_timeout(80)
            after = pg.evaluate(f"""() => ({{view: document.body.dataset.view, ticks: [...document.querySelectorAll('#pr-body .pr-check input')].filter(c => c.checked).length,
                field: {json.dumps(field)} ? (document.getElementById({json.dumps(field)}) || {{}}).value : null,
                opt: {json.dumps(opt)} ? (document.querySelector('#pr-body .pr-op[data-c="' + {json.dumps(opt)}[0] + '"][data-v="' + {json.dumps(opt)}[1] + '"]') || {{}}).getAttribute?.('aria-pressed') : null,
                text: prTexto(prAberto), doses: document.querySelector('#pr-cx-doses').open}})""")
            good = (after["view"] == "procedimentos" and after["ticks"] >= 2 and (field is None or after["field"] == "teste 123")
                    and (opt is None or after["opt"] == "true") and after["text"] == before and after["doses"])
            rep.check(good, f"{pid} ← Back from {cid}: {after['view']} ticks={after['ticks']} field={after['field']!r} opt={after['opt']} same note={after['text'] == before} doses box open={after['doses']}")
            total += 1
            n += 2
    rep.note(f"{total} 'Doses:' links followed and returned with Back")
    # the owner's RSI standard comes from ONE place (CM.KIT_PADRAO): Procedimentos' default pair = Calculadoras' kit pair
    pg.goto("about:blank"); pg.goto(base + "#/procedimentos/iot"); pg.wait_for_timeout(60)
    par = pg.evaluate("""() => { const k = CM.KIT_PADRAO, v = prPadraoVals(prAberto);
        return {kit: [CALC_DADOS.IOT.ind[k.ind].n.toUpperCase(), CALC_DADOS.IOT.bnm[k.bnm].n.toUpperCase()], proc: [v.indutor, v.bloqueador],
                linha: document.querySelector('#pr-texto').textContent.split('\\n').find(l => l.startsWith('DROGAS'))}; }""")
    rep.check(par["kit"] == par["proc"] == ["ETOMIDATO", "SUCCINILCOLINA"]
              and par["linha"] == "DROGAS: ETOMIDATO 20 MG (10 ML) + SUCCINILCOLINA 100 MG (10 ML) — PESO 70 KG.",
              f"standard RSI pair: kit={par['kit']} procedure={par['proc']} line={par['linha']!r}")
    pg.click("#pr-guia-como"); pg.click("#pr-cx-doses > summary"); pg.click('#pr-body [data-calc="iot"]'); pg.wait_for_timeout(100)
    sel = pg.evaluate("""() => ({hash: location.hash, ind: [...document.querySelectorAll('[data-kit="ind"][aria-pressed="true"]')].map(b => b.textContent.trim().toUpperCase()),
        bnm: [...document.querySelectorAll('[data-kit="bnm"][aria-pressed="true"]')].map(b => b.textContent.trim().toUpperCase())})""")
    rep.check(sel["hash"] == "#/calculadoras/iot" and [sel["ind"], sel["bnm"]] == [[par["proc"][0]], [par["proc"][1]]],
              f"Doses link lands on the Calculadoras intubation page with the same pair selected: {sel}")
    # changing the standard in one place changes the Procedimentos default too
    alt = pg.evaluate("""() => { const k = CM.KIT_PADRAO, old = {...k};
        k.ind = CALC_DADOS.IOT.ind.findIndex(d => d.n === 'Cetamina'); k.bnm = CALC_DADOS.IOT.bnm.findIndex(d => d.n === 'Rocurônio');
        prCamposCache.clear(); const p = PROCS.find(x => x.id === 'iot'); const v = prPadraoVals(p);
        Object.assign(k, old); prCamposCache.clear(); return [v.indutor, v.bloqueador]; }""")
    rep.check(alt == ["CETAMINA", "ROCURÔNIO"], f"Procedimentos follows CM.KIT_PADRAO: {alt}")
    n += 3
    rep.check(not p.problems, "problems: " + "; ".join(p.problems[:5]))
    p.close()
    # 5 tabs: one row, nothing clipped, active tab in view, no page-level horizontal scroll
    for w, h in ((1366, 768), (1024, 768), (390, 844), (320, 640)):
        # 2026-11: the root is the offer page and #/inicio the home tiles; neither may scroll sideways
        p = Page(browser, base, w, h)
        pg = p.page
        for h0 in ("", "#/inicio"):
            if h0:
                pg.evaluate(f"location.hash = '{h0}'"); pg.wait_for_timeout(80)
            px = pg.evaluate("() => document.documentElement.scrollWidth > innerWidth")
            rep.check(not px, f"{w}px {h0 or 'offer page'}: no page-level horizontal scroll")
            n += 1
        p.close()
        p = Page(browser, base + "#/rascunho", w, h)
        pg = p.page
        # Meu rascunho open: it is active, it is the first tab and sits at the left edge of the bar
        home = pg.evaluate("""() => { const n = document.querySelector('#top-tabs'), f = n.children[0], a = n.querySelector('.active');
            return {hash: location.hash, view: document.body.dataset.view, first: f.dataset.view, active: a.dataset.view, scrollLeft: n.scrollLeft,
                    leftEdge: Math.round(f.getBoundingClientRect().left - n.getBoundingClientRect().left) <= 24, pageX: document.documentElement.scrollWidth > innerWidth,
                    rows: new Set([...n.children].map(x => x.offsetTop)).size}; }""")
        rep.check(home == {"hash": "#/rascunho", "view": "rascunho", "first": "rascunho", "active": "rascunho", "scrollLeft": 0, "leftEdge": True, "pageX": False, "rows": 1},
                  f"{w}px home: {home}")
        n += 1
        for key in ("procedimentos", "rascunho", "calculadoras", "escores", "prescricoes"):
            pg.click(f"#tab-{key}")
            pg.wait_for_timeout(60)
            b = pg.evaluate("""() => { const n = document.querySelector('#top-tabs'), t = [...n.children], a = n.querySelector('.active').getBoundingClientRect(), r = n.getBoundingClientRect();
                return {n: t.length, rows: new Set(t.map(x => x.offsetTop)).size, clipped: t.filter(x => x.scrollWidth > x.clientWidth).length,
                        pageX: document.documentElement.scrollWidth > innerWidth, activeInView: a.left >= r.left - 1 && a.right <= r.right + 1}; }""")
            rep.check(b == {"n": 5, "rows": 1, "clipped": 0, "pageX": False, "activeInView": True}, f"{w}px, {key} active: {b}")
            n += 1
        rep.check(not p.problems, f"{w}px problems: " + "; ".join(p.problems[:3]))
        p.close()
    rep.note(f"{n} checks")
    return rep.done()
