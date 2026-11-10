"""Cross-tab checks after merging Escores and Calculadoras: receita column per tab, the shared weight, Limpar,
busca única landing on a score and on a drug row, and the 4-tab bar on phones."""
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
    pg.click("#tab-escores")
    s = st()
    rep.check(s["rxHidden"] and s["peso"] == 18, f"Escores: receita hidden, weight kept: {s['rxHidden']} {s['peso']}")
    pg.click("#tab-calculadoras")
    s = st()
    rep.check(not s["rxHidden"] and s["rx"] == s0["rx"] and s["peso"] == 18, f"Calculadoras: receita visible with its content, weight kept: {s['rxHidden']} {s['peso']}")
    pg.goto(base + "#/calculadoras/nora"); pg.wait_for_timeout(80)
    s = st()
    rep.check(s["cxPeso"] in ("18", "18,0"), f"Calculadoras shows the shared weight: {s['cxPeso']!r}")
    # weight typed in Calculadoras survives Escores and reaches Prescrições
    pg.fill("#cx-peso", "70")
    pg.click("#tab-escores"); pg.click("#tab-prescricoes")
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
    order = ["💊 Prescrições", "📊 Escores", "🧮 Calculadoras", "⭐ Meu rascunho"]
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
    rep.check(not p.problems, "problems: " + "; ".join(p.problems[:5]))
    p.close()
    # 4 tabs on phones: one row, nothing clipped, active tab in view
    for w, h in ((390, 844), (320, 640)):
        p = Page(browser, base, w, h)
        pg = p.page
        for key in ("calculadoras", "rascunho", "escores", "prescricoes"):
            pg.click(f"#tab-{key}")
            pg.wait_for_timeout(60)
            b = pg.evaluate("""() => { const n = document.querySelector('#top-tabs'), t = [...n.children], a = n.querySelector('.active').getBoundingClientRect(), r = n.getBoundingClientRect();
                return {n: t.length, rows: new Set(t.map(x => x.offsetTop)).size, clipped: t.filter(x => x.scrollWidth > x.clientWidth).length,
                        pageX: document.documentElement.scrollWidth > innerWidth, activeInView: a.left >= r.left - 1 && a.right <= r.right + 1}; }""")
            rep.check(b == {"n": 4, "rows": 1, "clipped": 0, "pageX": False, "activeInView": True}, f"{w}px, {key} active: {b}")
            n += 1
        rep.check(not p.problems, f"{w}px problems: " + "; ".join(p.problems[:3]))
        p.close()
    rep.note(f"{n} checks")
    return rep.done()
