"""Screenshots for visual review (not compared automatically).

Saves, for each viewport: Prescrições with a condition open, Meu rascunho, the global search with results, and the
7-tab proof (5 dummy views registered at runtime only — nothing is added to the site's code)."""
import os
from lib import Page, Report

SIZES = [(1440, 900), (1024, 768), (390, 844), (320, 640)]
DUMMIES = [("procedimentos", "Procedimentos", "🩺"), ("escores", "Escores", "📊"), ("calculadoras", "Calculadoras", "🧮"),
           ("documentos", "Documentos", "📄"), ("alta", "Alta", "🏠")]
COND = "pneumonia"   # condition opened in the screenshots (first one whose id contains this)
QUERY = "infeccao"


def run(browser, url, out_dir):
    rep = Report("screenshots")
    os.makedirs(out_dir, exist_ok=True)
    for w, h in SIZES:
        tag = f"{w}x{h}"
        p = Page(browser, url, w, h)
        pg = p.page
        cid = pg.evaluate(f"() => DATA.find(c => c.id.includes({COND!r})).id")
        pg.goto("about:blank")
        pg.goto(url.split("#")[0] + "#/prescricoes/" + cid)   # fresh load (a hash-only change does not reveal on phones)
        pg.wait_for_timeout(150)
        pg.screenshot(path=f"{out_dir}/prescricoes-{tag}.png")
        if w <= 820:   # phones: the condition panel sits below the list
            pg.screenshot(path=f"{out_dir}/prescricoes-{tag}-full.png", full_page=True)
        pg.click("#tab-rascunho")
        pg.wait_for_timeout(100)
        pg.screenshot(path=f"{out_dir}/rascunho-{tag}.png")
        pg.click("#tab-prescricoes")
        pg.keyboard.press("Control+k")
        pg.keyboard.type(QUERY)
        pg.keyboard.press("ArrowDown")
        pg.wait_for_timeout(150)
        pg.screenshot(path=f"{out_dir}/busca-{tag}.png")
        pg.keyboard.press("Escape")
        pg.keyboard.press("Escape")
        # 7 tabs: register 5 dummy views at runtime and re-render the tab bar
        # (pula as abas de mentira que já existem de verdade, para que o total continue 7)
        pg.evaluate("""(d) => { d.filter(([key]) => !viewOf(key)).slice(0, 7 - VIEWS.length).forEach(([key, label, icon]) => registerView({key, label, icon, cols: [], layout: "texto"})); renderTabs(); }""",
                    DUMMIES)
        pg.wait_for_timeout(100)
        pg.screenshot(path=f"{out_dir}/7abas-{tag}.png", clip={"x": 0, "y": 0, "width": w, "height": min(h, 260)})
        bar = pg.evaluate("""() => { const n = document.querySelector('#top-tabs'); const t = [...n.children];
            return {n: t.length, rows: new Set(t.map(x => x.offsetTop)).size, scrolls: n.scrollWidth > n.clientWidth,
                    clipped: t.filter(x => x.scrollWidth > x.clientWidth).length, pageScrollX: document.documentElement.scrollWidth > innerWidth}; }""")
        rep.check(bar["n"] == 7 and bar["rows"] == 1 and bar["clipped"] == 0 and not bar["pageScrollX"], f"{tag} tab bar: {bar}")
        pg.click("#tab-alta")
        pg.wait_for_timeout(100)
        vis = pg.evaluate("""() => { const n = document.querySelector('#top-tabs'), t = n.querySelector('.active').getBoundingClientRect(), r = n.getBoundingClientRect();
            return t.left >= r.left - 1 && t.right <= r.right + 1; }""")
        rep.check(vis, f"{tag}: active last tab not scrolled into view")
        pg.screenshot(path=f"{out_dir}/7abas-{tag}-ultima-ativa.png", clip={"x": 0, "y": 0, "width": w, "height": min(h, 260)})
        rep.note(f"{tag}: 7 tabs in {bar['rows']} row, bar scrolls={bar['scrolls']}, clipped labels={bar['clipped']}, last tab visible when active={vis}")
        rep.check(not p.problems, f"{tag}: " + "; ".join(p.problems[:3]))
        p.close()
    rep.note(f"saved in {out_dir}")
    return rep.done()
