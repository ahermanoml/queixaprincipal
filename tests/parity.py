"""Old-vs-new parity: the data and every receita the UI can produce must be identical to a git ref.

Drives both pages only through the DOM (clicks / input events), so it works whether the ref is the old
single-file site or a later multi-file one."""
import hashlib, json, os, re
from lib import Page, Report

WEIGHTS = [None, 8, 20, 40, 70]
PACS = ["adulto", "ped"]
SETS = ["amb", "internacao"]

# Runs one condition through every patient × setting × weight and returns the snapshots.
DRIVE_COND = r"""
async ({ci, pacs, sets, weights}) => {
  const $ = s => document.querySelector(s);
  const vis = el => !el.closest('[hidden]');
  const mid = $('#mid-body');
  const out = [];
  const snap = (tag) => out.push(tag + '\n' + $('#rx').value + '\n--chips--\n' + $('#rx-chips').textContent.replace(/\s+/g, ' '));
  const setW = (w) => { const pin = $('#peso'); if (!pin) return false; pin.value = w; pin.dispatchEvent(new Event('input', {bubbles: true})); return true; };
  for (const pac of pacs) for (const st of sets) for (const w of weights) {
    const clear = $('#btn-clear'); if (!clear.disabled) clear.click();
    document.querySelectorAll('#cond-list .cond')[ci].click();
    mid.querySelector(`.pac-tab[data-pac="${pac}"]`).click();
    mid.querySelector(`.set-btn[data-set="${st}"]`).click();
    const hasPeso = setW(w == null ? '' : String(w));
    const key = `${pac}/${st}/${w}`;
    out.push('### ' + key + ' peso=' + hasPeso + ' midhash=' + mid.innerHTML.length + ':' + [...mid.innerHTML].reduce((h, c) => (h * 31 + c.charCodeAt(0)) | 0, 0));
    mid.querySelectorAll('.addall').forEach((b, i) => { if (vis(b)) { b.click(); snap('addall ' + i); } });
    mid.querySelectorAll('.item[data-menu]').forEach((b, i) => { if (vis(b)) { b.click(); snap('menu ' + i); } });
    mid.querySelectorAll('.item:not([data-menu])').forEach((b, i) => { if (vis(b)) b.click(); });
    snap('items');
    const all = mid.querySelector('.orient-all'); if (all) { all.click(); snap('orient-all'); }
    mid.querySelectorAll('.oitem').forEach((b, i) => { b.click(); });
    snap('oitems');
    if (hasPeso) { setW('15'); snap('w15'); setW('2,5'); snap('w2.5'); setW(''); snap('w-empty'); }
    // remove the first chip (re-numbering / regrouping)
    const x = $('#rx-chips .x'); if (x) { x.click(); snap('remove1'); }
  }
  return out;
}
"""

RASC = r"""
async () => {
  const $ = s => document.querySelector(s);
  const out = {};
  const clear = $('#btn-clear'); if (!clear.disabled) clear.click();
  [...document.querySelectorAll('.top-tab')].find(t => t.dataset.view === 'rascunho').click();
  out.docText = $('#rasc-doc').textContent;
  window.__clip = null;
  $('#rasc-copy').click();
  await new Promise(r => setTimeout(r, 50));
  out.copyAll = window.__clip;
  const rl = [...document.querySelectorAll('#rasc-doc .rl')];
  const sel = window.getSelection();
  const steps = [];
  const send = () => {
    const b = $('#rasc-send');
    b.dispatchEvent(new PointerEvent('pointerdown', {bubbles: true}));
    b.click();
    steps.push($('#rx').value + '\n--free=' + $('#free-edit').checked);
  };
  const pick = (a, ao, b, bo) => {
    const r = document.createRange();
    const ta = rl[a].firstChild, tb = rl[b].firstChild;
    r.setStart(ta, Math.min(ao, ta.length)); r.setEnd(tb, Math.min(bo, tb.length));
    sel.removeAllRanges(); sel.addRange(r);
  };
  pick(0, 0, 0, 60); send();                                   // inside one card
  pick(2, 10, 3, 40); send();                                  // across two cards (crosses a title)
  pick(rl.length - 1, 0, rl.length - 1, 99999); send();        // whole last card
  const r = document.createRange(); r.selectNodeContents($('#rasc-doc')); sel.removeAllRanges(); sel.addRange(r); send();  // everything
  sel.removeAllRanges(); send();                               // nothing selected: unchanged
  // selection outside the doc (the hint text) must not be taken
  const h = document.createRange(); h.selectNodeContents(document.querySelector('.rasc-hint')); sel.removeAllRanges(); sel.addRange(h); send();
  out.steps = steps;
  window.__clip = null;
  $('#btn-copy').click();
  await new Promise(r => setTimeout(r, 50));
  out.copyRx = window.__clip;
  return out;
}
"""

FILTER = r"""
({queries}) => {
  const inp = document.querySelector('#cond-search');
  const res = [];
  for (const q of queries) {
    inp.value = q; inp.dispatchEvent(new Event('input', {bubbles: true}));
    res.push([...document.querySelectorAll('#cond-list .cond .nm')].map(e => e.textContent).join('|') + '#' + document.querySelector('#cond-count').textContent);
  }
  inp.value = ''; inp.dispatchEvent(new Event('input', {bubbles: true}));
  return res;
}
"""

LANDMARKS = [("DATA+KW", r"^const DATA = \[$", r"^\};$", r"^const KW = \{$"),
             ("MINHA", r"^const MINHA = \[$", r"^\];$", None)]


def data_regions(root):
    """Exact source text of DATA..KW and of MINHA, wherever they live in the tree."""
    out = {}
    for dp, _, fns in os.walk(root):
        if "/tests" in dp or "/.git" in dp:
            continue
        for fn in fns:
            if not fn.endswith((".html", ".js")):
                continue
            lines = open(os.path.join(dp, fn), encoding="utf-8").read().split("\n")
            for name, start, end, after in LANDMARKS:
                for i, l in enumerate(lines):
                    if re.match(start, l):
                        j = i
                        if after:
                            j = next(k for k in range(i, len(lines)) if re.match(after, lines[k]))
                        k = next(k for k in range(j, len(lines)) if re.match(end, lines[k]))
                        out[name] = "\n".join(lines[i:k + 1])
    return out


def run(browser, old_url, new_url, old_root, new_root, full=True):
    rep = Report("parity")
    # 1. data: source text and parsed values
    ro, rn = data_regions(old_root), data_regions(new_root)
    for name in ("DATA+KW", "MINHA"):
        ho = hashlib.sha256(ro.get(name, "").encode()).hexdigest()
        hn = hashlib.sha256(rn.get(name, "").encode()).hexdigest()
        rep.check(name in ro and name in rn and ho == hn, f"{name} source text differs")
        rep.note(f"{name} source region: {len(rn.get(name, '').encode())} bytes, sha256 old={ho[:16]} new={hn[:16]}")
    po, pn = Page(browser, old_url), Page(browser, new_url)
    get = "() => JSON.stringify({DATA, KW, MINHA})"
    do, dn = json.loads(po.page.evaluate(get)), json.loads(pn.page.evaluate(get))
    rep.check(do == dn, "parsed DATA/KW/MINHA differ")
    nblocks = sum(len(c["blocks"]) for c in dn["DATA"])
    rep.note(f"parsed data deep-equal: {do == dn} (DATA {len(dn['DATA'])} conditions / {nblocks} blocks, "
             f"KW {len(dn['KW'])} keys, MINHA {len(dn['MINHA'])} cards)")

    # 2. receita for every condition × mode × weight
    n_cond = po.page.evaluate("() => document.querySelectorAll('#cond-list .cond').length")
    rep.check(n_cond == pn.page.evaluate("() => document.querySelectorAll('#cond-list .cond').length"), "condition count differs")
    conds = range(n_cond) if full else [0, n_cond // 2, n_cond - 1]
    combos = diffs = snaps = 0
    args = {"pacs": PACS, "sets": SETS, "weights": WEIGHTS}
    for ci in conds:
        a = po.page.evaluate(DRIVE_COND, {**args, "ci": ci})
        b = pn.page.evaluate(DRIVE_COND, {**args, "ci": ci})
        combos += len(PACS) * len(SETS) * len(WEIGHTS)
        snaps += len(a)
        if a != b:
            cur, dif = None, set()
            for x, y in zip(a, b):
                if x.startswith("###"):
                    cur = x.split(" ")[1]
                if x != y:
                    dif.add(cur)
            if len(a) != len(b):
                dif.add("length")
            diffs += len(dif)
            rep.check(False, f"condition #{ci}: {len(dif)} combos differ, e.g. {sorted(dif)[:3]}")
    rep.note(f"receita: {combos} combinations ({len(conds)} conditions x 4 modes x {len(WEIGHTS)} weights), "
             f"{snaps} snapshots compared, {diffs} combinations differ")

    # 3. Meu rascunho
    a, b = po.page.evaluate(RASC), pn.page.evaluate(RASC)
    for k in ("docText", "copyAll", "steps", "copyRx"):
        rep.check(a[k] == b[k], f"Meu rascunho: {k} differs")
    rep.check(bool(b["copyAll"]) and len(b["steps"]) == 6, "Meu rascunho flow did not run")
    rep.note(f"Meu rascunho: Copiar tudo {len(b['copyAll'] or '')} chars equal={a['copyAll'] == b['copyAll']}; "
             f"+ Receita {len(b['steps'])} selection steps equal={a['steps'] == b['steps']}; Copiar receita equal={a['copyRx'] == b['copyRx']}")

    # 4. left-column filter: every query that matched before still matches (new may match more: accents)
    words = set()
    for c in dn["DATA"]:
        words.update(re.findall(r"\w+", (c["nm"] + " " + c.get("sub", "") + " " + dn["KW"].get(c["id"], "")).lower()))
    queries = sorted(words)
    queries += [w.upper() for w in queries[:200]] + ["dor de", "ITU / Cis", "  febre ", "infeccao", "INFECÇÃO", "xyz", "pneumonia ad", "é"]
    po.page.reload(); pn.page.reload()
    fa, fb = po.page.evaluate(FILTER, {"queries": queries}), pn.page.evaluate(FILTER, {"queries": queries})
    same = lost = 0
    for q, x, y in zip(queries, fa, fb):
        if x == y:
            same += 1
            continue
        old = set(x.split("#")[0].split("|")) - {""}
        new = set(y.split("#")[0].split("|")) - {""}
        if not old <= new:
            lost += 1
            rep.check(False, f"filter {q!r} lost matches: {sorted(old - new)[:3]}")
    rep.note(f"column filter: {len(queries)} queries, {same} identical, {len(queries) - same - lost} broader (accent-insensitive), {lost} lost a match")

    for p, label in ((po, "old"), (pn, "new")):
        if label == "new":
            rep.check(not p.problems, "new page console/network problems: " + "; ".join(p.problems[:5]))
        rep.note(f"{label} page console/network problems: {len(p.problems)}" + (f" {p.problems[:3]}" if p.problems else ""))
        p.close()
    return rep.done()
