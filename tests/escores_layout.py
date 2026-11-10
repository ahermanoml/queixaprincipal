"""Escores layout on desktop monitors: for every score, right after opening it and after answering every item
(with real clicks, which scroll the page as a user would), the result (value + band) and "Copiar para o prontuário"
must be fully on screen and clickable (elementFromPoint at the button's centre is the button), the sticky side panel
must never be taller than the visible area, and it must never cover an answer button."""
from lib import Page, Report

SIZES = [(1366, 768), (1280, 720), (1024, 768), (1440, 900)]

MEASURE = r"""
() => {
  const body = document.querySelector('#esc-body'), vb = body.getBoundingClientRect();
  const H = innerHeight, W = innerWidth;
  const box = s => { const r = document.querySelector(s).getBoundingClientRect(); return {top: r.top, bottom: r.bottom, left: r.left, right: r.right}; };
  const inView = r => r.top >= Math.max(0, vb.top) - 0.5 && r.bottom <= Math.min(H, vb.bottom) + 0.5 && r.left >= 0 && r.right <= W && r.bottom > r.top;
  const v = box('#esc-value'), b = box('#esc-band'), c = box('#esc-copy');
  const btn = document.querySelector('#esc-copy');
  const hit = document.elementFromPoint((c.left + c.right) / 2, (c.top + c.bottom) / 2);
  const side = document.querySelector('.esc-side'), sr = side.getBoundingClientRect();
  const sticky = getComputedStyle(side).position === 'sticky';
  // answer buttons under the side panel?
  const covered = [...document.querySelectorAll('#esc-body [data-item] button, #esc-body [data-item] input')].filter(e => {
    const r = e.getBoundingClientRect();
    if (r.bottom < vb.top || r.top > vb.bottom || !r.width) return false;
    return r.right > sr.left && r.left < sr.right && r.bottom > sr.top && r.top < sr.bottom;
  }).length;
  return {value: inView(v), band: inView(b), copy: inView(c), hit: !!hit && (hit === btn || btn.contains(hit)),
          sideH: Math.round(sr.height), areaH: Math.round(body.clientHeight), tallSticky: sticky && sr.height > body.clientHeight + 0.5,
          covered, copyTop: Math.round(c.top), copyBottom: Math.round(c.bottom), H};
}
"""


def answer(pg, slug):
    """Answer every visible item with real clicks: last option / 'Sim' / a valid number (NIHSS: option 1 or 0)."""
    rows = pg.evaluate("() => [...document.querySelectorAll('#esc-body [data-item]')].map(r => r.dataset.item)")
    for rid in rows:
        row = pg.locator(f'#esc-body [data-item="{rid}"]')
        if row.is_hidden():
            continue
        inp = row.locator("input[data-num]")
        if inp.count():
            inp.click()
            inp.fill("70")
            continue
        btns = row.locator("button[data-val]")
        n = btns.count()
        if not n:
            continue
        k = 1 if slug == "nihss" else n - 1
        btns.nth(min(k, n - 1)).click()


def run(browser, url):
    rep = Report("escores layout")
    base = url.split("#")[0]
    summary = []
    for w, h in SIZES:
        p = Page(browser, base, w, h)
        pg = p.page
        slugs = pg.evaluate("() => ESC_ALL.map(s => s.slug)")
        worst_top = worst_bottom = 0
        ok = 0
        for slug in slugs:
            pg.goto("about:blank")
            pg.goto(base + "#/escores/" + slug)
            pg.wait_for_timeout(40)
            for phase in ("aberto", "respondido"):
                if phase == "respondido":
                    answer(pg, slug)
                    pg.wait_for_timeout(30)
                m = pg.evaluate(MEASURE)
                good = m["value"] and m["band"] and m["copy"] and m["hit"] and not m["tallSticky"] and m["covered"] == 0
                ok += good
                worst_bottom = max(worst_bottom, m["copyBottom"])
                rep.check(good, f"{w}x{h} {slug} {phase}: {m}")
        summary.append(f"{w}x{h}: {ok}/{2 * len(slugs)} ok, Copiar bottom at most {worst_bottom}px of {h}")
        rep.check(not p.problems, f"{w}x{h} problems: " + "; ".join(p.problems[:3]))
        p.close()
    for s in summary:
        rep.note(s)
    return rep.done()
