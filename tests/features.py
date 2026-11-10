"""Tests for the phase-1 features: hash routing (#/view/item, back/forward) and the global search ("busca única")."""
import re, unicodedata
from lib import REPO, Page, Report

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
    first_tab = pg.evaluate("() => document.querySelector('.top-tab').dataset.view")
    rep.check(s["hash"] == "" and s["view"] == "rascunho" and s["tab"] == "rascunho" and s["cond"] is None and first_tab == "rascunho"
              and s["colsHidden"] == [True, True, False, False], f"no hash -> default (Meu rascunho, first tab): {s} first={first_tab}")
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
    # an unknown item under a valid tab opens that tab with nothing open (router behaviour unchanged since phase 1)
    s = load("#/prescricoes/naoexiste")
    rep.check(s["view"] == "prescricoes" and s["cond"] is None and s["hash"] == "#/prescricoes", f"unknown condition -> #/prescricoes: {s}")
    n += 1
    for bad in ["#/foo", "#garbage", "#/prescricoes/%E0%A4%A", "#/rascunho/x/y", "#//",
                "#/PRESCRICOES", "#/prescricoes/" + a + "/extra", "#/__proto__", "#/constructor/x"]:
        s = load(bad)
        rep.check(s["view"] == "rascunho" and s["cond"] is None and s["hash"] == "#/rascunho", f"invalid {bad!r} -> default: {s}")
        n += 1
    s = load(f"#/prescricoes/{a}/")   # trailing slash tolerated
    rep.check(s["cond"] == a and s["hash"] == f"#/prescricoes/{a}", f"trailing slash: {s}")
    n += 1

    # clicks + back/forward
    load("")
    pg.click("#tab-prescricoes"); wait_hash("#/prescricoes")
    rep.check(pg.evaluate("() => document.querySelectorAll('#cond-list .cond').length") == len(ids), "first click on Prescrições: condition list ready")
    n += 1
    pg.click(f'#cond-list .cond[data-id="{a}"]'); wait_hash(f"#/prescricoes/{a}")
    pg.click(f'#cond-list .cond[data-id="{b}"]'); wait_hash(f"#/prescricoes/{b}")
    pg.click("#tab-rascunho"); wait_hash("#/rascunho")
    s = st()
    rep.check(s["view"] == "rascunho" and s["cond"] == b, f"tab click keeps condition: {s}")
    pg.click("#tab-prescricoes"); wait_hash(f"#/prescricoes/{b}")
    rep.check(st()["cond"] == b, "tab back to Prescrições shows the same condition")
    expect = [("#/rascunho", "rascunho", b), (f"#/prescricoes/{b}", "prescricoes", b), (f"#/prescricoes/{a}", "prescricoes", a),
              ("#/prescricoes", "prescricoes", None), ("", "rascunho", None)]
    for h, view, cond in expect:
        pg.evaluate("history.back()"); wait_hash(h)
        s = st()
        rep.check(s["view"] == view and s["cond"] == cond and s["listActive"] == ([cond] if cond else []), f"back -> {h!r}: {s}")
        n += 1
    rep.check(st()["midTitle"] == "Medicações" and st()["tab"] == "rascunho", "back to the no-hash entry returns to Meu rascunho (empty middle panel kept)")
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
    p = Page(browser, base + "#/prescricoes")   # Meu rascunho is the home screen; this flow starts on Prescrições
    pg = p.page
    n = 0
    data = pg.evaluate("() => ({DATA: DATA.map(c => ({id: c.id, nm: c.nm, sub: c.sub || '', kw: KW[c.id] || ''})), MINHA, "
                       "ESC: ESC_ALL.map(s => ({id: s.slug, hay: s.name + ' ' + s.kicker + ' ' + escKw(s)}))})")

    def expected(q):
        toks = jsnorm(q).split()
        conds = [c["id"] for c in data["DATA"] if all(t in jsnorm(c["nm"] + " " + c["sub"] + " " + c["kw"]) for t in toks)]
        cards = [str(i) for i, m in enumerate(data["MINHA"]) if all(t in jsnorm(m["titulo"] + " " + m["grupo"] + " " + "\n".join(m["linhas"])) for t in toks)]
        scores = [s["id"] for s in data["ESC"] if all(t in jsnorm(s["hay"]) for t in toks)]
        return conds, cards, scores

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
    for q in ["infeccao", "INFECÇÃO", "Infecção urinária", "dor", "amoxicilina", "febre crianca", "evolucao", "cefaleia", "PNEUMONIA", "zzzzqx",
              "nihss", "wells", "avc", "tep", "cha2ds2", "glasgow"]:
        pg.click("#mid-title")
        pg.keyboard.press("Control+k")
        pg.keyboard.type(q)
        s = st()
        conds, cards, scores = expected(q)
        got_c = sorted(x.split(":", 1)[1] for x in s["ids"] if x.startswith("prescricoes:"))
        got_r = sorted(x.split(":", 1)[1] for x in s["ids"] if x.startswith("rascunho:"))
        got_e = sorted(x.split(":", 1)[1] for x in s["ids"] if x.startswith("escores:"))
        rep.check(got_c == sorted(conds) and got_r == sorted(cards) and got_e == sorted(scores),
                  f"search {q!r}: got {len(got_c)}+{len(got_e)}+{len(got_r)}, expected {len(conds)}+{len(scores)}+{len(cards)}")
        if conds or cards or scores:
            names = [re.sub(r"\s+\d+$", "", g[0]) for g in s["groups"]]
            calc = [x for x in s["ids"] if x.startswith("calculadoras:")]   # counted by calc_features.py; here only the group order
            proc = [x for x in s["ids"] if x.startswith("procedimentos:")]   # counted by proc_features.py
            rep.check(names == [x for x, ok in (("⭐ Meu rascunho", cards), ("💊 Prescrições", conds), ("📊 Escores", scores), ("🧮 Calculadoras", calc), ("🩺 Procedimentos", proc)) if ok]
                      and s["active"] == "bo-0", f"search {q!r}: groups/active {s['groups']} {s['active']}")
        else:
            rep.check(s["empty"] and "Nada encontrado" in s["empty"] and s["status"] == "Nenhum resultado" and s["open"],
                      f"empty state for {q!r}: {s}")
        rep.note(f"search {q!r}: {len(got_c)} conditions + {len(got_e)} scores + {len(got_r)} rascunho cards")
        n += 1
        pg.keyboard.press("Escape"); pg.keyboard.press("Escape")
    same = pg.evaluate("() => { const f = q => { const i = document.querySelector('#busca-input'); i.value = q; i.dispatchEvent(new Event('input')); return buscaRes.map(r => r.e.id).join(); }; const r = [f('infeccao'), f('INFECÇÃO'), f('Infecção')]; document.querySelector('#busca-input').value = ''; buscaClose(false); return r; }")
    # (the input events above open the list without focusing the field, so the Esc presses below cannot close it; it is closed
    #  here instead — since phase 6 the search is centred and its list covers #mid-title, which the next step clicks)
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
    pg.fill("#cond-search", "infecção urinária")
    rep.check("itu" in pg.evaluate("() => [...document.querySelectorAll('#cond-list .cond')].map(b => b.dataset.id)"),
              "column filter 'infecção urinária' finds ITU / Cistite (KW synonym)")
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
    for _ in range(next(i for i, x in enumerate(st()["ids"]) if x.startswith("prescricoes:"))):   # Meu rascunho's group comes first now
        pg.keyboard.press("ArrowDown")
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


def escores(browser, url, rep):
    base = url.split("#")[0]
    n = 0
    p = Page(browser, base)
    pg = p.page
    slugs = pg.evaluate("() => ESC_ALL.map(s => s.slug)")
    rep.check(len(slugs) == 26 and slugs[0] == "nihss", f"26 entries, NIHSS first: {slugs[:3]}")
    rep.check(pg.evaluate("() => [...document.querySelectorAll('.top-tab')].map(t => t.dataset.view).join()") == "rascunho,prescricoes,escores,calculadoras,procedimentos",
              "tab order Meu rascunho, Prescrições, Escores, Calculadoras, Procedimentos")
    order = pg.evaluate("() => [...document.querySelectorAll('#esc-list .esc-lgrp')].map(e => e.textContent)")
    rep.check(order[0] == "Mais usados" and order[1:] == sorted(order[1:], key=lambda s: jsnorm(s)), f"list groups: {order}")
    n += 3
    # receita: fill it, go to Escores (hidden), come back (same content)
    pg.click("#tab-prescricoes")
    pg.click('#cond-list .cond >> nth=0')
    pg.locator(".addall:visible").first.click()
    rx = pg.input_value("#rx")
    pg.click("#tab-escores")
    s = pg.evaluate("() => [document.querySelector('#col-rx').hidden, document.body.dataset.rx, location.hash, getComputedStyle(document.querySelector('.grid')).gridTemplateColumns.split(' ').length]")
    rep.check(s[0] and s[1] == "off" and s[2] == "#/escores" and s[3] == 2, f"Escores hides the receita column: {s}")
    pg.click('#esc-list .esc-row[data-slug="heart"]')
    pg.wait_for_timeout(50)
    rep.check(pg.evaluate("location.hash") == "#/escores/heart", "clicking a score sets #/escores/<slug>")
    pg.click("#tab-prescricoes")
    s = pg.evaluate("() => [document.querySelector('#col-rx').hidden, document.querySelector('#rx').value, curCond && curCond.id]")
    rep.check(not s[0] and s[1] == rx and rx and s[2], f"receita back on Prescrições with its content: {s[:1]} same={s[1] == rx}")
    pg.click("#tab-escores")
    rep.check(pg.evaluate("() => curEsc && curEsc.slug") == "heart" and pg.evaluate("location.hash") == "#/escores/heart", "Escores keeps the open score")
    n += 5
    # addresses
    for h, want in [("#/escores/nihss", "nihss"), ("#/escores/wells-tep", "wells-tep"), ("#/escores/cha2ds2-va", "cha2ds2-va"),
                    ("#/escores", None), ("#/escores/naoexiste", None)]:
        pg.goto("about:blank"); pg.goto(base + h); pg.wait_for_timeout(60)
        s = pg.evaluate("() => [document.body.dataset.view, curEsc && curEsc.slug, location.hash, document.querySelector('#esc-title').textContent]")
        exp_hash = h if want or h == "#/escores" else "#/escores"
        rep.check(s[0] == "escores" and s[1] == want and s[2] == exp_hash, f"address {h}: {s}")
        n += 1
    pg.goto("about:blank"); pg.goto(base + "#/escores/heart"); pg.wait_for_timeout(50)
    pg.click('#esc-list .esc-row[data-slug="glasgow"]'); pg.wait_for_timeout(50)
    pg.evaluate("history.back()"); pg.wait_for_function("location.hash === '#/escores/heart'"); pg.wait_for_timeout(50)
    rep.check(pg.evaluate("() => curEsc.slug") == "heart", "back returns to the previous score")
    n += 1
    # keyboard flow: open from the search with the keyboard, answer with Enter, focus walks item to item
    pg.keyboard.press("Control+k"); pg.keyboard.type("heart"); pg.keyboard.press("Enter"); pg.wait_for_timeout(60)
    f = pg.evaluate("() => document.activeElement.closest('[data-item]') && document.activeElement.closest('[data-item]').dataset.item")
    rep.check(f == "h", f"search + Enter puts focus on the first item: {f}")
    for _ in range(5):          # first option of each item, then the focus moves on by itself
        pg.keyboard.press("ArrowRight"); pg.keyboard.press("Enter")
    s = pg.evaluate("() => [document.querySelector('#esc-value').textContent, document.querySelector('#esc-band').textContent, document.activeElement.id]")
    rep.check(s == ["5", "Risco moderado", "esc-copy"], f"keyboard: 5 answers, total 5, focus on Copiar: {s}")
    pg.keyboard.press("Enter"); pg.wait_for_timeout(30)
    clip = pg.evaluate("window.__clip")
    rep.check(clip and clip.startswith("Escore HEART\nResultado: 5 pontos - risco moderado"), f"Enter copies: {clip and clip[:60]!r}")
    n += 3
    # NIHSS quick entry from the keyboard
    pg.keyboard.press("Control+k"); pg.keyboard.type("nihss"); pg.keyboard.press("Enter"); pg.wait_for_timeout(60)
    rep.check(pg.evaluate("document.activeElement.id") == "nihss-rapida", "NIHSS: the quick-entry field gets the focus")
    pg.keyboard.type("102130000001001")
    s = pg.evaluate("() => [document.querySelector('#esc-value').textContent, document.querySelector('#nihss-answered').textContent, document.querySelector('#esc-band').textContent]")
    rep.check(s == ["9", "15 de 15 itens", "Moderado"], f"NIHSS quick entry: {s}")
    n += 2
    # blank form for printing (window.print stubbed): generic score and NIHSS (with its two images, loaded only now)
    for slug, sel in (("heart", "#ficha .fpage .ftable"), ("nihss", "#ficha #fBody tr")):
        pg.goto("about:blank"); pg.goto(base + "#/escores/" + slug); pg.wait_for_timeout(60)
        rep.check(pg.evaluate("() => document.querySelectorAll('img').length") == 0, f"{slug}: no image loaded before printing")
        pg.evaluate("() => { window.print = () => { window.__printed = (window.__printed || 0) + 1; }; }")
        pg.click("#esc-print"); pg.wait_for_timeout(400)
        s = pg.evaluate(f"""() => [window.__printed, document.body.classList.contains('imprimindo'), !!document.querySelector('{sel}'),
            document.querySelector('#ficha').textContent.includes('Queixa Principal'), document.querySelector('#ficha').textContent.includes('Ficha Vermelha'),
            [...document.querySelectorAll('#ficha img')].map(i => i.complete && i.naturalWidth > 0).join()]""")
        rep.check(s[:5] == [1, True, True, True, False] and s[5] == ("true,true" if slug == "nihss" else ""), f"{slug}: blank form ready to print: {s}")
        n += 2
    pg.goto("about:blank"); pg.goto(base + "#/escores/nihss"); pg.wait_for_timeout(60)
    # search entries
    for q, slug in [("nihss", "nihss"), ("wells", "wells-tep"), ("avc", "nihss"), ("tep", "wells-tep"), ("cha2ds2", "cha2ds2-va"), ("pneumonia", "curb-65")]:
        ids = pg.evaluate("q => { const i = document.querySelector('#busca-input'); i.value = q; i.dispatchEvent(new Event('input')); return buscaRes.map(r => r.v.key + ':' + r.e.id); }", q)
        rep.check(f"escores:{slug}" in ids, f"search {q!r} finds {slug}: {[x for x in ids if x.startswith('escores')]}")
        n += 1
    rep.check(not p.problems, "escores problems: " + "; ".join(p.problems[:5]))
    p.close()
    # phones: all tabs at 320 px, result bar visible while answering
    p = Page(browser, base + "#/escores/heart", 320, 640)
    pg = p.page
    bar = pg.evaluate("""() => { const n = document.querySelector('#top-tabs'), t = [...n.children];
        return {n: t.length, rows: new Set(t.map(x => x.offsetTop)).size, clipped: t.filter(x => x.scrollWidth > x.clientWidth).length,
                pageX: document.documentElement.scrollWidth > innerWidth}; }""")
    rep.check(bar == {"n": 5, "rows": 1, "clipped": 0, "pageX": False}, f"320 px: 5 tabs in one row, no clipping: {bar}")
    pg.click('[data-item="t"] button[data-val="2"]')
    s = pg.evaluate("""() => { const b = document.querySelector('#esc-bar'), r = b.getBoundingClientRect();
        return [getComputedStyle(b).position, r.bottom <= innerHeight + 1 && r.top < innerHeight, document.querySelector('#esc-bar-v').textContent]; }""")
    rep.check(s == ["fixed", True, "2"], f"320 px: result bar fixed at the bottom: {s}")
    pg.click("#tab-prescricoes")
    rep.check(pg.evaluate("getComputedStyle(document.querySelector('#esc-bar')).display") == "none", "result bar hidden outside Escores")
    n += 3
    rep.check(not p.problems, "escores phone problems: " + "; ".join(p.problems[:5]))
    p.close()
    rep.note(f"escores: {n} checks")


def nihss_padrao(browser, url, rep):
    """The NIHSS opens with every item at 0 (normal exam), ready to copy; 'Zerar tudo' returns there; the other scores open blank.
    The expected texts come from the frozen 'tudo-0' case (every item marked 0 by hand, from nothing), so the new start state
    must give exactly the text the original gives for the same answers."""
    import json, os
    import escores_lib as E
    fx = json.load(open(os.path.join(REPO, "tests/fixtures/escores.json"), encoding="utf-8"))
    z = E.unpack(next(c for c in fx["nihss"] if c["case"] == "tudo-0")["expect"])
    base = url.split("#")[0]
    n = 0
    STATE = """() => [document.querySelector('#esc-value').textContent, document.querySelector('#esc-band').textContent,
        document.querySelector('#nihss-answered').textContent, document.querySelector('#nihss-rapida').value,
        [...document.querySelectorAll('#esc-body [data-item] button[aria-pressed="true"]')].map(b => b.closest('[data-item]').dataset.item + '=' + b.dataset.val).join(),
        document.querySelector('#esc-preview').textContent]"""
    zeros = ",".join(f"{i}=0" for i in ["1a", "1b", "1c", "2", "3", "4", "5a", "5b", "6a", "6b", "7", "8", "9", "10", "11"])
    want = [z["value"], z["band"], z["answered"], z["quick"], zeros, z["texts"]["Admissão|lista"]]

    def copied(pg, sel="#esc-copy"):
        pg.evaluate("window.__clip = null"); pg.click(sel); pg.wait_for_timeout(30)
        return pg.evaluate("window.__clip")

    p = Page(browser, base)
    pg = p.page
    rep.check(want[:4] == ["0", "Sem déficit", "15 de 15 itens", "000000000000000"], f"frozen tudo-0 case is the normal exam: {want[:4]}")
    # three ways in: address (fresh load), the list, the busca única
    pg.goto("about:blank"); pg.goto(base + "#/escores/nihss"); pg.wait_for_timeout(60)
    rep.check(pg.evaluate(STATE) == want, f"address: opens with every item at 0: {pg.evaluate(STATE)[:5]}")
    rep.check(copied(pg) == z["copy"], "address: Copiar copies the all-0 text with no click before")
    pg.goto("about:blank"); pg.goto(base + "#/escores/heart"); pg.wait_for_timeout(50)
    pg.click('#esc-list .esc-row[data-slug="nihss"]'); pg.wait_for_timeout(50)
    rep.check(pg.evaluate(STATE) == want and copied(pg) == z["copy"], "list: opens at 0 and copies")
    pg.goto("about:blank"); pg.goto(base + "#/escores/heart"); pg.wait_for_timeout(50)
    pg.keyboard.press("Control+k"); pg.keyboard.type("nihss"); pg.keyboard.press("Enter"); pg.wait_for_timeout(60)
    rep.check(pg.evaluate(STATE) == want, "search: opens at 0")
    sel = pg.evaluate("() => { const i = document.activeElement; return [i.id, i.selectionStart, i.selectionEnd]; }")
    rep.check(sel == ["nihss-rapida", 0, 15], f"search: focus on Entrada rápida with the 15 zeros selected: {sel}")
    n += 6
    # quick entry: typing replaces everything (same rule as the original: digits typed = items answered, in order)
    pg.keyboard.type("1")
    s = pg.evaluate(STATE)
    rep.check(s[:5] == ["1", "Leve", "1 de 15 itens", "1", "1a=1"], f"quick entry replaces the whole exam: {s[:5]}")
    pg.fill("#nihss-rapida", "000000000000000")
    pg.evaluate("() => { const i = document.querySelector('#nihss-rapida'); i.focus(); i.setSelectionRange(3, 4); }")
    pg.keyboard.type("2")
    s = pg.evaluate(STATE)
    rep.check(s[:4] == ["2", "Leve", "15 de 15 itens", "000200000000000"] and ",2=2," in s[4], f"quick entry: overwrite one digit (4th = item 2): {s[:5]}")
    pg.fill("#nihss-rapida", "")
    s = pg.evaluate(STATE)
    rep.check(s[2] == "0 de 15 itens" and s[4] == "" and copied(pg) is None, f"quick entry emptied: nothing marked, nothing copied: {s[:5]}")
    pg.click("#esc-reset"); pg.wait_for_timeout(30)
    rep.check(pg.evaluate(STATE) == want and copied(pg) == z["copy"], "Zerar tudo after the quick entry: back to every item at 0")
    n += 4
    # change one item, Zerar tudo; unmark by clicking again; moments and formats from the default
    pg.click('[data-item="4"] button[data-val="2"]'); pg.wait_for_timeout(20)
    s = pg.evaluate(STATE)
    rep.check(s[:3] == ["2", "Leve", "15 de 15 itens"] and "4=2" in s[4] and copied(pg) == s[5], f"changing one item updates everything: {s[:4]}")
    pg.click('[data-item="4"] button[data-val="2"]'); pg.wait_for_timeout(20)
    s = pg.evaluate(STATE)
    rep.check(s[:3] == ["0", "Sem déficit", "14 de 15 itens"] and "4=" not in s[4] and "4. " in s[5] and "não avaliado" in s[5], f"clicking the marked option again unmarks it: {s[:3]}")
    pg.click("#esc-reset"); pg.wait_for_timeout(20)
    rep.check(pg.evaluate(STATE) == want, "Zerar tudo returns to every item at 0")
    texts = pg.evaluate("""() => { const o = {};
        for (const m of ['Admissão', 'Pós-trombólise', '24 h', 'Alta']) for (const f of ['lista', 'descritivo', 'linha']) {
          document.querySelector(`#esc-body [data-mom="${m}"]`).click(); document.querySelector(`#esc-body [data-fmt="${f}"]`).click();
          window.__clip = null; document.querySelector('#esc-copy').click(); o[m + '|' + f] = document.querySelector('#esc-preview').textContent; }
        document.querySelector('#esc-body [data-mom="Admissão"]').click(); document.querySelector('#esc-body [data-fmt="lista"]').click();
        return o; }""")
    rep.check(texts == z["texts"], f"every moment x format of the default = the frozen all-0 texts: {[k for k in texts if texts[k] != z['texts'].get(k)]}")
    n += 4
    # state kept across tab switches; a fresh load starts again from the default
    pg.click('[data-item="5a"] button[data-val="3"]'); pg.wait_for_timeout(20)
    pg.click("#tab-prescricoes"); pg.click("#tab-escores"); pg.wait_for_timeout(30)
    s = pg.evaluate(STATE)
    rep.check(s[0] == "3" and "5a=3" in s[4], f"tab switch keeps the NIHSS answers: {s[:1]}")
    pg.goto("about:blank"); pg.goto(base + "#/escores/nihss"); pg.wait_for_timeout(60)
    rep.check(pg.evaluate(STATE) == want, "fresh load: back to the default")
    # the blank form stays blank with the default answers
    pg.evaluate("() => { window.print = () => {}; }")
    pg.click("#esc-print"); pg.wait_for_timeout(400)
    s = pg.evaluate("() => [document.querySelector('#fScore').style.display, document.querySelectorAll('#fBody td.on').length, [...document.querySelectorAll('#fBody td.c')].filter(t => !t.classList.contains('dt') && t.textContent).length]")
    rep.check(s == ["none", 0, 0], f"blank form printed blank: {s}")
    pg.evaluate("() => window.dispatchEvent(new Event('afterprint'))")
    n += 3
    # the other 25 scores still open blank
    slugs = pg.evaluate("() => ESC_ALL.map(s => s.slug).filter(s => s !== 'nihss')")
    bad = []
    for slug in slugs:
        pg.goto("about:blank"); pg.goto(base + "#/escores/" + slug); pg.wait_for_timeout(30)
        ok = pg.evaluate(f"() => {{ const d = ESC_DEFS.find(x => x.slug === '{slug}'); return JSON.stringify(escV) === JSON.stringify(FV.initState(d)); }}")
        if not ok:
            bad.append(slug)
    rep.check(len(slugs) == 25 and not bad, f"the other 25 scores open in the original's start state (FV.initState: checks at 'Não', no choice marked): {bad}")
    n += 1
    rep.check(not p.problems, "nihss default problems: " + "; ".join(p.problems[:5]))
    p.close()
    # phone: the bottom bar shows 0 and copies right away
    p = Page(browser, base + "#/escores/nihss", 390, 844)
    pg = p.page
    pg.wait_for_timeout(60)
    s = pg.evaluate("() => [document.querySelector('#esc-bar').hidden, document.querySelector('#esc-bar-v').textContent, document.querySelector('#esc-bar-b').textContent]")
    rep.check(s == [False, "0", "Sem déficit"], f"phone: result bar shows 0 / Sem déficit: {s}")
    rep.check(copied(pg, "#esc-bar-copy") == z["copy"], "phone: the bar's Copiar copies the all-0 text with no click before")
    n += 2
    rep.check(not p.problems, "nihss phone problems: " + "; ".join(p.problems[:5]))
    p.close()
    rep.note(f"nihss default: {n} checks")


def run(browser, url):
    rep = Report("features")
    routing(browser, url, rep)
    search(browser, url, rep)
    escores(browser, url, rep)
    nihss_padrao(browser, url, rep)
    return rep.done()
