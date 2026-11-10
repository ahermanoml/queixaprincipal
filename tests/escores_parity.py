"""Escores vs the original Ficha Vermelha site, side by side in headless Chrome.

Needs a copy of the published site (fichavermelha.pages.dev) in a local folder, served by a local http server:
  python3 tests/run.py --fv DIR                 # also runs this check
  python3 tests/run.py --fv DIR --write-fixtures   # and refreezes tests/fixtures/escores.json from the original
Without --fv, tests/escores_golden.py checks the same things against the frozen fixtures."""
import hashlib, json, os, random, re
from lib import REPO, Page, Report
import escores_lib as E

PICK = r"""
({slug, states}) => {
  const def = ESCORES.find(d => d.slug === slug);
  return states.map(st => {
    const v = FV.initState ? FV.initState(def) : (() => { const o = {}; def.items.forEach(it => { if (it.type === 'check') o[it.id] = false; else if (typeof it.def === 'number') o[it.id] = it.def; }); return o; })();
    for (const [id, val] of st) {
      const it = def.items.find(i => i.id === id);
      if (typeof val === 'string') { const n = parseFloat(val.replace(/\./g, '').replace(',', '.')); if (isNaN(n) || n < (it.min || 0) || (it.max && n > it.max)) delete v[id]; else v[id] = n; }
      else v[id] = val;
    }
    const R = FV.evaluate(def, v);
    return [R.value, R.bandIdx === undefined ? -9 : R.bandIdx, R.complete];
  });
}
"""


def regions_ok(fv_dir, rep):
    """Source text moved byte for byte: data file, engine body, NIHSS content and code blocks, images."""
    def sha(b):
        return hashlib.sha256(b if isinstance(b, bytes) else b.encode()).hexdigest()
    a = open(os.path.join(fv_dir, "assets/escores-data.js"), "rb").read()
    b = open(os.path.join(REPO, "data/escores.js"), "rb").read()
    rep.check(a == b, "data/escores.js differs from assets/escores-data.js")
    rep.note(f"ESCORES+GUIAS source: {len(b)} bytes, sha256 original={sha(a)[:16]} new={sha(b)[:16]}")

    def between(text, start, end):
        i = text.index(start) + len(start)
        return text[i:text.index(end, i)]
    eng = open(os.path.join(fv_dir, "assets/escore.js"), encoding="utf-8").read()
    eng_body = eng[eng.index("  var LEVELS = {"):eng.index("  window.FV = {")].rstrip("\n") + "\n"
    mine = between(open(os.path.join(REPO, "js/escores-motor.js"), encoding="utf-8").read(), "/* --- início: cópia byte a byte --- */\n", "  /* --- fim")
    rep.check(eng_body == mine, "engine body differs from assets/escore.js")
    page = open(os.path.join(fv_dir, "nihss/index.html"), encoding="utf-8").read()
    nd = page[page.index("  var ARM = ["):]
    nd = nd[:nd.index("\n  };\n", nd.index("  var BANDS = {")) + len("\n  };\n")]
    mine_nd = between(open(os.path.join(REPO, "data/nihss.js"), encoding="utf-8").read(), "/* --- início: cópia byte a byte --- */\n", "  /* --- fim")
    rep.check(nd == mine_nd, "NIHSS content differs from the nihss/ page")
    nm = open(os.path.join(REPO, "js/escores-nihss.js"), encoding="utf-8").read()
    calc = page[page.index("  function totals()"):page.index("  function update(")].rstrip("\n") + "\n"
    fic = page[page.index("  function renderFicha("):page.index("  function printFicha(")].rstrip("\n") + "\n"
    rep.check(calc == between(nm, "(cálculo e texto) --- */\n", "  /* --- fim"), "NIHSS calc block differs")
    rep.check(fic == between(nm, "(ficha impressa) --- */\n", "  /* --- fim"), "NIHSS print block differs")
    for n in ("figura.jpg", "nomeacao.jpg"):
        rep.check(open(os.path.join(fv_dir, "nihss", n), "rb").read() == open(os.path.join(REPO, "img/nihss", n), "rb").read(), f"{n} differs")
    rep.note(f"engine body {len(mine.encode())} B sha256 {sha(mine)[:16]}, NIHSS content {len(mine_nd.encode())} B sha256 {sha(mine_nd)[:16]}: "
             f"identical={eng_body == mine and nd == mine_nd}; NIHSS calc/print blocks identical={calc in nm and fic in nm}; images identical")


def build_cases(defs, po, fv_url):
    """All input combinations per score (deterministic, seeded)."""
    cases = {}
    for d in defs:
        rng = random.Random("fv-" + d["slug"])
        base = E.base_states(d)
        po.page.goto(fv_url + d["slug"] + "/")
        # band limits: among 4000 random answers, keep two per distinct (value, band, complete) — every limit gets covered
        pool = [E.random_state(d, rng) for _ in range(4000)]
        res = po.page.evaluate(PICK, {"slug": d["slug"], "states": pool})
        seen, lim = {}, []
        for st, r in zip(pool, res):
            k = json.dumps(r)
            if seen.get(k, 0) < 2:
                seen[k] = seen.get(k, 0) + 1
                lim.append((f"limite {r[0]}/{r[1]}", st))
        rnd = [(f"aleatorio#{i}", E.random_state(d, rng)) for i in range(120)]
        cases[d["slug"]] = base + lim + rnd
    return cases


def run(browser, fv_url, fv_dir, new_url, write_fixtures=None):
    rep = Report("escores vs Ficha Vermelha")
    regions_ok(fv_dir, rep)
    po = Page(browser, fv_url + "heart/")
    # data: evaluate the original file alone (no nav.js, which adds _h) and the Escores tab; compare keeping Infinity
    po.page.goto(fv_url + "kit/")
    po.page.set_content(f'<script src="{fv_url}assets/escores-data.js"></script>')
    orig = po.page.evaluate("() => (" + E.DUMP + ")({ESCORES: window.ESCORES, GUIAS: window.GUIAS})")
    pn = Page(browser, new_url)
    new = pn.page.evaluate("() => (" + E.DUMP + ")({ESCORES: window.ESCORES, GUIAS: window.GUIAS})")
    rep.check(orig == new, "parsed ESCORES/GUIAS differ")
    defs = E.load_defs(new)["ESCORES"]
    rep.note(f"parsed ESCORES/GUIAS deep-equal (Infinity kept): {orig == new} — {len(defs)} scores, {len(json.loads(new)['GUIAS'])} GUIAS")

    cases = build_cases(defs, po, fv_url)
    fixtures = {"scores": {}, "nihss": None}
    total = diffs = 0
    for d in defs:
        slug = d["slug"]
        states = [st for _, st in cases[slug]]
        po.page.goto(fv_url + slug + "/")
        a = po.page.evaluate(E.DRIVE, {"states": states, "A": E.ORIG})
        pn.page.goto("about:blank")
        pn.page.goto(new_url.split("#")[0] + "#/escores/" + slug)
        b = pn.page.evaluate(E.DRIVE, {"states": states, "A": E.NEW})
        bad = [i for i, (x, y) in enumerate(zip(a, b)) if x != y]
        total += len(states)
        diffs += len(bad)
        for i in bad[:3]:
            x, y = a[i], b[i]
            k = next(k for k in x if x[k] != y.get(k))
            rep.check(False, f"{slug} [{cases[slug][i][0]}] {k}: original={x[k]!r} new={y.get(k)!r}")
        rep.note(f"{slug}: {len(states)} combinations, {len(bad)} differ")
        # fixtures: every deterministic case + the band-limit cases + 30 random ones
        # fixtures: the deterministic cases (except "tudo+…"), up to 40 band-limit cases (evenly spread) and 20 random ones
        lim = [i for i, (name, _) in enumerate(cases[slug]) if name.startswith("limite")]
        lim = set(lim[::max(1, len(lim) // 40)][:40])
        keep = [i for i, (name, _) in enumerate(cases[slug])
                if i in lim or (name.startswith("aleatorio") and int(name.split("#")[1]) < 20)
                or not name.startswith(("limite", "aleatorio", "tudo+"))]   # "tudo+…" (every option over a full answer) only live
        fixtures["scores"][slug] = [{"case": cases[slug][i][0], "state": states[i], "expect": E.pack(a[i])} for i in keep]

    # NIHSS
    rng = random.Random("fv-nihss")
    items = pn.page.evaluate("() => NIHSS.ITEMS.map(it => [it.id, it.o.length])")
    ns = E.nihss_states([tuple(x) for x in items], rng)
    states = [st for _, st in ns]
    po.page.goto(fv_url + "nihss/")
    a = po.page.evaluate(E.NIHSS_DRIVE, {"states": states, "quick": E.NIHSS_QUICK, "A": E.NIHSS_ORIG, "moments": E.NIHSS_MOMENTS, "fmts": E.NIHSS_FMTS})
    pn.page.goto("about:blank")
    pn.page.goto(new_url.split("#")[0] + "#/escores/nihss")
    b = pn.page.evaluate(E.NIHSS_DRIVE, {"states": states, "quick": E.NIHSS_QUICK, "A": E.NIHSS_NEW, "moments": E.NIHSS_MOMENTS, "fmts": E.NIHSS_FMTS})
    names = [n for n, _ in ns] + [f"rapida '{s}'" for s in E.NIHSS_QUICK]
    bad = [i for i, (x, y) in enumerate(zip(a, b)) if x != y]
    for i in bad[:3]:
        k = next(k for k in a[i] if a[i][k] != b[i].get(k))
        rep.check(False, f"nihss [{names[i]}] {k}: original={a[i][k]!r} new={b[i].get(k)!r}")
    n_texts = len(states + E.NIHSS_QUICK) * (len(E.NIHSS_MOMENTS) * len(E.NIHSS_FMTS) + 1)
    rep.note(f"nihss: {len(a)} combinations ({len(states)} answer sets + {len(E.NIHSS_QUICK)} quick-entry strings), "
             f"{n_texts} texts compared (4 moments x 3 formats + upper case each), {len(bad)} differ")
    total += len(a)
    diffs += len(bad)
    keep = [i for i, n in enumerate(names) if not n.startswith("aleatorio") or int(n.split("#")[1]) < 25]
    fixtures["nihss"] = [{"case": names[i], "state": states[i] if i < len(states) else None,
                          "quick": None if i < len(states) else E.NIHSS_QUICK[i - len(states)], "expect": E.pack(a[i])} for i in keep]
    rep.note(f"TOTAL: {total} combinations compared, {diffs} differ")
    rep.check(not pn.problems, "Escores page problems: " + "; ".join(pn.problems[:5]))
    if write_fixtures and not rep.fails:
        os.makedirs(os.path.dirname(write_fixtures), exist_ok=True)
        with open(write_fixtures, "w", encoding="utf-8") as f:
            json.dump(fixtures, f, ensure_ascii=False, separators=(",", ":"))
            f.write("\n")
        n = sum(len(v) for v in fixtures["scores"].values()) + len(fixtures["nihss"])
        rep.note(f"fixtures written: {write_fixtures} ({n} cases, {os.path.getsize(write_fixtures)} bytes)")
    po.close()
    pn.close()
    return rep.done()
