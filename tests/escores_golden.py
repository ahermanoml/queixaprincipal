"""Escores vs the golden fixtures frozen from the original Ficha Vermelha site (tests/fixtures/escores.json).

Same drivers and comparisons as escores_parity.py, without needing the original site."""
import json, os
from lib import REPO, Page, Report
import escores_lib as E

FIXTURES = os.path.join(REPO, "tests/fixtures/escores.json")


def run(browser, url):
    rep = Report("escores golden")
    if not os.path.exists(FIXTURES):
        rep.check(False, f"missing {FIXTURES} (create it with: python3 tests/run.py --fv DIR --write-fixtures)")
        return rep.done()
    fx = json.load(open(FIXTURES, encoding="utf-8"))
    p = Page(browser, url)
    total = diffs = 0
    base = url.split("#")[0]
    for slug, cases in fx["scores"].items():
        p.page.goto("about:blank")
        p.page.goto(base + "#/escores/" + slug)
        got = p.page.evaluate(E.DRIVE, {"states": [c["state"] for c in cases], "A": E.NEW})
        for c in cases:
            c["expect"] = E.unpack(c["expect"])
        bad = [i for i, c in enumerate(cases) if got[i] != c["expect"]]
        total += len(cases)
        diffs += len(bad)
        for i in bad[:3]:
            k = next(k for k in cases[i]["expect"] if cases[i]["expect"][k] != got[i].get(k))
            rep.check(False, f"{slug} [{cases[i]['case']}] {k}: expected={cases[i]['expect'][k]!r} got={got[i].get(k)!r}")
    n = fx["nihss"]
    p.page.goto("about:blank")
    p.page.goto(base + "#/escores/nihss")
    st = [c for c in n if c["quick"] is None]
    qk = [c for c in n if c["quick"] is not None]
    got = p.page.evaluate(E.NIHSS_DRIVE, {"states": [c["state"] for c in st], "quick": [c["quick"] for c in qk], "A": E.NIHSS_NEW,
                                          "moments": E.NIHSS_MOMENTS, "fmts": E.NIHSS_FMTS})
    allc = st + qk
    for c in allc:
        c["expect"] = E.unpack(c["expect"])
    bad = [i for i, c in enumerate(allc) if got[i] != c["expect"]]
    for i in bad[:3]:
        k = next(k for k in allc[i]["expect"] if allc[i]["expect"][k] != got[i].get(k))
        rep.check(False, f"nihss [{allc[i]['case']}] {k}: expected={allc[i]['expect'][k]!r} got={got[i].get(k)!r}")
    total += len(allc)
    diffs += len(bad)
    rep.note(f"{len(fx['scores'])} scores + NIHSS: {total} frozen cases, {diffs} differ")
    rep.check(not p.problems, "problems: " + "; ".join(p.problems[:5]))
    p.close()
    return rep.done()
