"""Tests for the phase-1 features: hash routing (#/view/item, back/forward) and the global search ("busca única")."""
import re, unicodedata
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


def jsnorm(s):
    return "".join(ch for ch in unicodedata.normalize("NFD", s) if not 0x300 <= ord(ch) <= 0x36F).lower()


SEARCH_STATE = """() => ({
  open: !document.querySelector('#busca-pop').hidden,
  expanded: document.querySelector('#busca-input').getAttribute('aria-expanded'),
  focused: document.activeElement && document.activeElement.id,
  value: document.querySelector('#busca-input').value,
  active: document.querySelector('#busca-input').getAttribute('aria-activedescendant'),
  groups: [...document.querySelectorAll('#busca-list [role=group]')].map(g => [document.getElementById(g.getAttribute('aria-labelledby')).textContent.trim(), g.querySelectorAll('[role=option]').length]),
  ids: buscaRes.map(r => r.v.key + ':' + r.e.id),
  empty: document.querySelector('#busca-vazio').hidden ? null : document.querySelector('#busca-vazio').textContent,
  status: document.querySelector('#busca-status').textContent,
  inputVisible: document.querySelector('#busca-input').offsetParent !== null,
})"""


def search(browser, url, rep):
    base = url.split("#")[0]
    p = Page(browser, base)
    pg = p.page
    n = 0
    data = pg.evaluate("() => ({DATA: DATA.map(c => ({id: c.id, nm: c.nm, sub: c.sub || '', kw: KW[c.id] || ''})), MINHA})")

    def expected(q):
        toks = jsnorm(q).split()
        conds = [c["id"] for c in data["DATA"] if all(t in jsnorm(c["nm"] + " " + c["sub"] + " " + c["kw"]) for t in toks)]
        cards = [str(i) for i, m in enumerate(data["MINHA"]) if all(t in jsnorm(m["titulo"] + " " + m["grupo"] + " " + "\n".join(m["linhas"])) for t in toks)]
        return conds, cards

    def st():
        return pg.evaluate(SEARCH_STATE)

    # ARIA wiring
    aria = pg.evaluate("""() => { const i = document.querySelector('#busca-input'), l = document.getElementById(i.getAttribute('aria-controls'));
        return [i.getAttribute('role'), i.getAttribute('aria-autocomplete'), l && l.getAttribute('role'), !!i.getAttribute('aria-label')]; }""")
    rep.check(aria == ["combobox", "list", "listbox", True], f"ARIA combobox wiring: {aria}")
    # shortcut: Ctrl+K
    pg.keyboard.press("Control+k")
    s = st()
    rep.check(s["focused"] == "busca-input" and s["open"] and s["expanded"] == "true" and s["empty"] and "Prescrições" in s["empty"],
              f"Ctrl+K opens the search with a hint: {s}")
    pg.keyboard.press("Escape")
    s = st()
    rep.check(not s["open"] and s["expanded"] == "false" and s["focused"] != "busca-input", f"Esc closes: {s}")
    pg.keyboard.press("Meta+k")
    rep.check(st()["focused"] == "busca-input", "Cmd+K opens the search")
    pg.keyboard.press("Escape")
    # "/" from the page opens it; "/" typed inside another field does not
    pg.click("#mid-title")
    pg.keyboard.press("/")
    s = st()
    rep.check(s["focused"] == "busca-input" and s["value"] == "", f"'/' opens the search without typing a slash: {s}")
    pg.keyboard.press("Escape")
    pg.click("#cond-search")
    pg.keyboard.type("a/")
    rep.check(st()["focused"] == "cond-search" and pg.input_value("#cond-search") == "a/", "'/' inside the column filter is just a character")
    pg.fill("#cond-search", "")
    n += 6

    # accent/case-insensitive matching, against an independent count
    for q in ["infeccao", "INFECÇÃO", "Infecção urinária", "dor", "amoxicilina", "febre crianca", "evolucao", "cefaleia", "PNEUMONIA", "zzzzqx"]:
        pg.click("#mid-title")
        pg.keyboard.press("Control+k")
        pg.keyboard.type(q)
        s = st()
        conds, cards = expected(q)
        got_c = sorted(x.split(":", 1)[1] for x in s["ids"] if x.startswith("prescricoes:"))
        got_r = sorted(x.split(":", 1)[1] for x in s["ids"] if x.startswith("rascunho:"))
        rep.check(got_c == sorted(conds) and got_r == sorted(cards), f"search {q!r}: got {len(got_c)}+{len(got_r)}, expected {len(conds)}+{len(cards)}")
        if conds or cards:
            names = [re.sub(r"\s+\d+$", "", g[0]) for g in s["groups"]]
            rep.check(names == [x for x, ok in (("💊 Prescrições", conds), ("⭐ Meu rascunho", cards)) if ok]
                      and s["active"] == "bo-0", f"search {q!r}: groups/active {s['groups']} {s['active']}")
        else:
            rep.check(s["empty"] and "Nada encontrado" in s["empty"] and s["status"] == "Nenhum resultado" and s["open"],
                      f"empty state for {q!r}: {s}")
        rep.note(f"search {q!r}: {len(got_c)} conditions + {len(got_r)} rascunho cards")
        n += 1
        pg.keyboard.press("Escape"); pg.keyboard.press("Escape")
    same = pg.evaluate("() => { const f = q => { const i = document.querySelector('#busca-input'); i.value = q; i.dispatchEvent(new Event('input')); return buscaRes.map(r => r.e.id).join(); }; return [f('infeccao'), f('INFECÇÃO'), f('Infecção')]; }")
    rep.check(same[0] == same[1] == same[2] and same[0], "accented, unaccented and uppercase queries give the same results")
    pg.keyboard.press("Escape"); pg.keyboard.press("Escape")
    n += 1

    # keyboard navigation + Enter opens a condition
    pg.click("#mid-title")
    pg.keyboard.press("/")
    pg.keyboard.type("pneumonia")
    s0 = st()
    pg.keyboard.press("ArrowDown")
    s1 = st()
    pg.keyboard.press("ArrowUp"); pg.keyboard.press("ArrowUp")
    s2 = st()
    rep.check(s0["active"] == "bo-0" and s1["active"] == "bo-1" and s2["active"] == f"bo-{len(s2['ids']) - 1}",
              f"arrows move the active option and wrap: {s0['active']} {s1['active']} {s2['active']}")
    pg.keyboard.press("ArrowDown")    # wraps back to the first
    target = st()["ids"][0]
    pg.keyboard.press("Enter")
    pg.wait_for_timeout(80)
    rs = pg.evaluate(STATE)
    s = st()
    rep.check(target.startswith("prescricoes:") and rs["cond"] == target.split(":")[1] and rs["hash"] == "#/prescricoes/" + rs["cond"]
              and rs["listActive"] == [rs["cond"]] and not s["open"] and s["value"] == "", f"Enter opens the condition: {target} {rs} {s}")
    n += 2

    # choosing a rascunho card: switches tab, scrolls to the card, highlights it
    k = 7
    title = data["MINHA"][k]["titulo"]
    pg.keyboard.press("Control+k")
    pg.keyboard.type(title)
    ids = st()["ids"]
    want = f"rascunho:{k}"
    rep.check(want in ids, f"rascunho card {title!r} found: {ids}")
    if want in ids:
        for _ in range(ids.index(want)):
            pg.keyboard.press("ArrowDown")
        pg.keyboard.press("Enter")
        pg.wait_for_timeout(80)
        r = pg.evaluate(f"""() => {{ const el = document.querySelector('#rasc-doc .rt[data-card="{k}"]'), sc = el.closest('.scroll');
            const a = el.getBoundingClientRect(), b = sc.getBoundingClientRect();
            return {{view: document.body.dataset.view, hash: location.hash, hl: el.classList.contains('hl'),
                     inView: a.top >= b.top - 1 && a.top < b.top + 80, cond: curCond && curCond.id}}; }}""")
        rep.check(r["view"] == "rascunho" and r["hash"] == "#/rascunho" and r["hl"] and r["inView"] and r["cond"] == rs["cond"],
                  f"rascunho card opened, scrolled and highlighted (condition kept): {r}")
        pg.wait_for_timeout(2600)
        rep.check(not pg.evaluate(f"() => document.querySelector('#rasc-doc .rt[data-card=\"{k}\"]').classList.contains('hl')"), "highlight fades")
    n += 2

    # mouse click on an option
    pg.keyboard.press("Control+k")
    pg.keyboard.type("otite")
    first = st()["ids"][0]
    pg.click("#busca-list .bo >> nth=0")
    pg.wait_for_timeout(80)
    rep.check(pg.evaluate(STATE)["cond"] == first.split(":")[1] and pg.evaluate("document.body.dataset.view") == "prescricoes", f"click opens {first}")
    n += 1

    # column filter: accent-insensitive now
    pg.fill("#cond-search", "infeccao")
    nf = pg.evaluate("() => document.querySelectorAll('#cond-list .cond').length")
    rep.check(nf > 0 and nf == len(expected("infeccao")[0]), f"column filter 'infeccao' finds {nf}")
    n += 1
    rep.check(not p.problems, "search console problems: " + "; ".join(p.problems[:5]))
    p.close()

    # phone: the field is a button that expands
    p = Page(browser, base, 390, 844)
    pg = p.page
    s = st()
    rep.check(not s["inputVisible"], "phone: search field collapsed to an icon")
    pg.click("#busca-abrir")
    s = st()
    rep.check(s["inputVisible"] and s["focused"] == "busca-input", f"phone: icon opens and focuses the field: {s}")
    pg.keyboard.type("asma")
    pg.keyboard.press("Enter")
    pg.wait_for_timeout(120)
    vis = pg.evaluate("() => { const r = document.querySelector('#col-mid').getBoundingClientRect(); return [curCond && curCond.id, r.top > 0 && r.top < 300]; }")
    s = st()
    rep.check(vis[0] and vis[1] and not s["inputVisible"], f"phone: condition opened and scrolled into view, search collapsed: {vis} {s}")
    pg.keyboard.press("/")
    rep.check(st()["inputVisible"], "phone: '/' expands the search too")
    pg.keyboard.press("Escape")
    rep.check(not st()["inputVisible"] and pg.evaluate("document.activeElement.id") == "busca-abrir", "phone: Esc collapses and returns focus to the icon")
    n += 5
    rep.check(not p.problems, "phone search console problems: " + "; ".join(p.problems[:5]))
    p.close()
    rep.note(f"search: {n} check groups")


def run(browser, url):
    rep = Report("features")
    routing(browser, url, rep)
    search(browser, url, rep)
    return rep.done()
