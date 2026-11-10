"""Tests for the phase-1 features: hash routing (#/view/item, back/forward) and the global search ("busca única")."""
from lib import Page, Report

STATE = """() => ({
  hash: location.hash, view: document.body.dataset.view,
  tab: (document.querySelector('.top-tab.active') || {}).dataset?.view,
  cond: curCond ? curCond.id : null,
  listActive: [...document.querySelectorAll('#cond-list .cond.active')].map(b => b.dataset.id),
  midTitle: document.querySelector('#mid-title').textContent,
  colsHidden: ['col-cond', 'col-mid', 'col-rascunho', 'col-rx'].map(id => document.getElementById(id).hidden),
  pac: (document.querySelector('.pac-tab.active') || {}).dataset?.pac || null,
  set: (document.querySelector('.set-btn.active') || {}).dataset?.set || null,
})"""


def routing(browser, url, rep):
    base = url.split("#")[0]
    p = Page(browser, base)
    pg = p.page
    ids = pg.evaluate("() => DATA.map(c => c.id)")
    nm = dict(pg.evaluate("() => DATA.map(c => [c.id, c.nm])"))
    a, b, c = ids[3], ids[20], ids[40]

    def st():
        return pg.evaluate(STATE)

    def wait_hash(h):
        pg.wait_for_function("h => location.hash === h", arg=h, timeout=3000)
        pg.wait_for_timeout(30)

    s = st()
    rep.check(s["hash"] == "" and s["view"] == "prescricoes" and s["tab"] == "prescricoes" and s["cond"] is None
              and s["colsHidden"] == [False, False, True, False], f"no hash -> default: {s}")
    n = 1

    def load(h):
        pg.goto("about:blank")
        pg.goto(base + h)
        pg.wait_for_timeout(60)
        return st()

    s = load("#/prescricoes")
    rep.check(s["view"] == "prescricoes" and s["cond"] is None and s["hash"] == "#/prescricoes", f"#/prescricoes: {s}")
    s = load(f"#/prescricoes/{a}")
    rep.check(s["cond"] == a and s["listActive"] == [a] and s["midTitle"] == nm[a] and s["pac"] == "adulto" and s["set"] == "amb"
              and s["hash"] == f"#/prescricoes/{a}", f"#/prescricoes/<id>: {s}")
    s = load("#/rascunho")
    rep.check(s["view"] == "rascunho" and s["tab"] == "rascunho" and s["colsHidden"] == [True, True, False, False], f"#/rascunho: {s}")
    n += 3
    for bad in ["#/foo", "#/prescricoes/naoexiste", "#garbage", "#/prescricoes/%E0%A4%A", "#/rascunho/x/y", "#//",
                "#/PRESCRICOES", "#/prescricoes/" + a + "/extra", "#/__proto__", "#/constructor/x"]:
        s = load(bad)
        rep.check(s["view"] == "prescricoes" and s["cond"] is None and s["hash"] == "#/prescricoes", f"invalid {bad!r} -> default: {s}")
        n += 1
    s = load(f"#/prescricoes/{a}/")   # trailing slash tolerated
    rep.check(s["cond"] == a and s["hash"] == f"#/prescricoes/{a}", f"trailing slash: {s}")
    n += 1

    # clicks + back/forward
    load("")
    pg.click(f'#cond-list .cond[data-id="{a}"]'); wait_hash(f"#/prescricoes/{a}")
    pg.click(f'#cond-list .cond[data-id="{b}"]'); wait_hash(f"#/prescricoes/{b}")
    pg.click("#tab-rascunho"); wait_hash("#/rascunho")
    s = st()
    rep.check(s["view"] == "rascunho" and s["cond"] == b, f"tab click keeps condition: {s}")
    pg.click("#tab-prescricoes"); wait_hash(f"#/prescricoes/{b}")
    rep.check(st()["cond"] == b, "tab back to Prescrições shows the same condition")
    expect = [("#/rascunho", "rascunho", b), (f"#/prescricoes/{b}", "prescricoes", b), (f"#/prescricoes/{a}", "prescricoes", a),
              ("", "prescricoes", None)]
    for h, view, cond in expect:
        pg.evaluate("history.back()"); wait_hash(h)
        s = st()
        rep.check(s["view"] == view and s["cond"] == cond and s["listActive"] == ([cond] if cond else []), f"back -> {h!r}: {s}")
        n += 1
    rep.check(st()["midTitle"] == "Medicações", "back to no hash restores the empty middle panel")
    for h, view, cond in reversed(expect[:-1]):
        pg.evaluate("history.forward()"); wait_hash(h)
        s = st()
        rep.check(s["view"] == view and s["cond"] == cond, f"forward -> {h!r}: {s}")
        n += 1
    # typing an address
    pg.evaluate(f"location.hash = '#/prescricoes/{c}'"); wait_hash(f"#/prescricoes/{c}")
    rep.check(st()["cond"] == c, "typed address opens the condition")
    n += 1

    # switching tabs keeps condition, patient/setting, weight and receita
    d = pg.evaluate("() => DATA.find(c => c.blocks.some(b => b.mode === 'ped_internacao' && !b.menu)).id")
    load(f"#/prescricoes/{d}")
    pg.click('.pac-tab[data-pac="ped"]')
    pg.click('.set-btn[data-set="internacao"]')
    if pg.locator("#peso").count():
        pg.fill("#peso", "12")
    pg.locator(".addall:visible").first.click()
    before = pg.evaluate("() => [document.querySelector('#rx').value, (document.querySelector('#peso')||{}).value]")
    pg.click("#tab-rascunho"); pg.click("#tab-prescricoes")
    s = st()
    after = pg.evaluate("() => [document.querySelector('#rx').value, (document.querySelector('#peso')||{}).value]")
    rep.check(s["cond"] == d and s["pac"] == "ped" and s["set"] == "internacao" and before == after and before[0],
              f"tab round-trip keeps state: {s} {before} {after}")
    n += 1
    rep.note(f"routing: {n} checks")
    rep.check(not p.problems, "routing console problems: " + "; ".join(p.problems[:5]))
    p.close()


def run(browser, url):
    rep = Report("features")
    routing(browser, url, rep)
    if "search" in globals():
        search(browser, url, rep)
    return rep.done()
