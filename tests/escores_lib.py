"""Shared pieces of the Escores checks: the input combinations and the in-page drivers.

The same driver runs on Ficha Vermelha's original pages and on the Escores tab: both mark answers with
[data-item] rows holding button[data-val] / input[data-num], so only the ids of the result fields differ."""
import json, random

# result fields on each side
ORIG = {"reset": "#btnReset", "value": "#rValue", "band": "#rBand", "text": "#rText", "extra": "#rExtra", "preview": "#preview",
        "copy": "#btnCopy", "fmt": '#formats [data-fmt="X"]', "caixa": '#caixas [data-caixa="X"]', "bandOn": ".bandrow.on"}
NEW = {"reset": "#esc-reset", "value": "#esc-value", "band": "#esc-band", "text": "#esc-text", "extra": "#esc-extra", "preview": "#esc-preview",
       "copy": "#esc-copy", "fmt": '#esc-body [data-fmt="X"]', "caixa": '#esc-body [data-caixa="X"]', "bandOn": "#esc-body .esc-bandrow.on"}

# serializer that keeps Infinity / NaN (JSON.stringify would turn them into null)
DUMP = """(x) => JSON.stringify(x, (k, v) => v === Infinity ? '__Infinity__' : v === -Infinity ? '__-Infinity__' : (typeof v === 'number' && isNaN(v)) ? '__NaN__' : v === undefined ? '__undefined__' : v)"""

DRIVE = r"""
async ({states, A}) => {
  const q = s => document.querySelector(s);
  const tick = () => new Promise(r => setTimeout(r, 0));
  const out = [];
  for (const st of states) {
    q(A.reset).click();
    for (const [id, val] of st) {
      const row = document.querySelector(`[data-item="${id}"]`);
      if (typeof val === 'string') { const i = row.querySelector('input[data-num]'); i.value = val; i.dispatchEvent(new Event('input', {bubbles: true})); }
      else if (val === true) row.querySelector('button[data-val="1"]').click();
      else if (val === false) row.querySelector('button[data-val="0"]').click();
      else row.querySelector(`button[data-val="${val}"]`).click();
    }
    const ex = q(A.extra);
    const r = {value: q(A.value).textContent, band: q(A.band).textContent, bandBg: q(A.band).style.background, text: q(A.text).textContent,
               extra: ex.hidden ? null : ex.textContent, on: [...document.querySelectorAll(A.bandOn)].map(e => e.dataset.band).join(),
               hidden: [...document.querySelectorAll('[data-item]')].filter(x => x.hidden).map(x => x.dataset.item).join(),
               pressed: [...document.querySelectorAll('[data-item] button[data-val][aria-pressed="true"]')].map(b => b.closest('[data-item]').dataset.item + '=' + b.dataset.val).join(),
               lista: q(A.preview).textContent};
    window.__clip = null; q(A.copy).click(); await tick(); r.copy = window.__clip;
    q(A.fmt.replace('X', 'linha')).click(); r.linha = q(A.preview).textContent;
    q(A.caixa.replace('X', 'maiusculas')).click(); r.linhaUp = q(A.preview).textContent;
    q(A.caixa.replace('X', 'minusculas')).click(); r.listaLow = (q(A.fmt.replace('X', 'lista')).click(), q(A.preview).textContent);
    q(A.caixa.replace('X', 'normal')).click();
    out.push(r);
  }
  return out;
}
"""

# NIHSS: original page ids vs Escores tab ids
NIHSS_ORIG = {"reset": "#btnReset", "value": "#total", "band": "#band", "answered": "#answered", "preview": "#preview", "copy": "#btnCopy",
              "quick": "#rapida", "warn": "#warn", "btn": "#item-ID .opt:nth-child(N)", "seg": "#SEG button", "orig": True}
NIHSS_NEW = {"reset": "#esc-reset", "value": "#esc-value", "band": "#esc-band", "answered": "#nihss-answered", "preview": "#esc-preview",
             "copy": "#esc-copy", "quick": "#nihss-rapida", "warn": "#nihss-warn", "btn": '[data-item="ID"] button[data-val="V"]', "orig": False}
NIHSS_MOMENTS = ["Admissão", "Pós-trombólise", "24 h", "Alta"]
NIHSS_FMTS = [("lista", "Lista"), ("descritivo", "Descritivo"), ("linha", "Uma linha")]

NIHSS_DRIVE = r"""
async ({states, quick, A, moments, fmts}) => {
  const q = s => document.querySelector(s);
  const tick = () => new Promise(r => setTimeout(r, 0));
  // segmented buttons: the original re-creates them on every update and has no data attributes, so pick by label
  const seg = (kind, id, label) => {
    if (A.orig) { const b = [...document.querySelectorAll(A.seg.replace('SEG', kind))].find(x => x.textContent === label); b.click(); }
    else q(`#esc-body [data-${kind === 'moments' ? 'mom' : kind === 'formats' ? 'fmt' : 'caixa'}="${id}"]`).click();
  };
  const read = () => {
    const r = {value: q(A.value).textContent, band: q(A.band).textContent, bandBg: q(A.band).style.background,
               answered: q(A.answered).textContent, quick: q(A.quick).value, warn: q(A.warn).hidden ? null : q(A.warn).textContent, texts: {}};
    for (const m of moments) { seg('moments', m, m); for (const [f, fl] of fmts) { seg('formats', f, fl); r.texts[m + '|' + f] = q(A.preview).textContent; } }
    seg('caixas', 'maiusculas', 'MAIÚSCULAS'); r.upper = q(A.preview).textContent; seg('caixas', 'normal', 'Normal');
    seg('moments', moments[0], moments[0]); seg('formats', fmts[0][0], fmts[0][1]);
    return r;
  };
  const out = [];
  for (const st of states) {
    q(A.reset).click();
    for (const [id, n] of st) q(A.orig ? A.btn.replace('ID', id).replace('N', n + 1) : A.btn.replace('ID', id).replace('V', n)).click();
    const r = read();
    window.__clip = null; q(A.copy).click(); await tick(); r.copy = window.__clip;
    out.push(r);
  }
  for (const s of quick) {
    q(A.reset).click();
    const i = q(A.quick); i.value = s; i.dispatchEvent(new Event('input', {bubbles: true}));
    out.push(read());
  }
  return out;
}
"""

NUM_VALUES = ["", "0", "1", "2,5", "5", "10", "15", "30", "45", "50", "70", "99", "100", "101", "150", "500", "1.000", "1000", "2500", "-1", "abc", "8", "24", "7,9"]


def load_defs(text):
    def fix(v):
        if isinstance(v, dict):
            return {k: fix(x) for k, x in v.items()}
        if isinstance(v, list):
            return [fix(x) for x in v]
        return {"__Infinity__": float("inf"), "__-Infinity__": float("-inf")}.get(v, v) if isinstance(v, str) else v
    return fix(json.loads(text))


def real_items(d):
    return [i for i in d["items"] if i["type"] != "group"]


def random_state(d, rng):
    st = []
    for it in real_items(d):
        t = it["type"]
        if t == "check":
            if rng.random() < 0.45:
                st.append([it["id"], True])
        elif t == "choice":
            if rng.random() < (0.9 if not it.get("optional") else 0.5):
                st.append([it["id"], rng.randrange(len(it["opts"]))])
        elif t == "num":
            st.append([it["id"], rng.choice(NUM_VALUES)])
    rng.shuffle(st)
    # controllers of showIf first, so the dependent rows are visible as a user would see them (order otherwise random)
    ctl = {k for it in real_items(d) for k in (it.get("showIf") or {})}
    st.sort(key=lambda p: 0 if p[0] in ctl else 1)
    return st


def base_states(d):
    """Deterministic cases: nothing, everything, each item alone, every option, numeric edges."""
    items = real_items(d)
    out = [("vazio", [])]
    allv = []
    for it in items:
        if it["type"] == "check":
            allv.append([it["id"], True])
        elif it["type"] == "choice":
            allv.append([it["id"], len(it["opts"]) - 1])
        else:
            allv.append([it["id"], "70"])
    out.append(("tudo", allv))
    out.append(("tudo-primeira-opcao", [[i["id"], 0 if i["type"] == "choice" else (True if i["type"] == "check" else "1")] for i in items]))
    for it in items:
        if it["type"] == "check":
            out.append((f"so-{it['id']}", [[it["id"], True]]))
            out.append((f"so-{it['id']}-nao", [[it["id"], False]]))
        elif it["type"] == "choice":
            for k in range(len(it["opts"])):
                out.append((f"{it['id']}={k}", [[it["id"], k]]))
                # every option on top of "everything else answered" (so complete results are covered too)
                out.append((f"tudo+{it['id']}={k}", [p for p in allv if p[0] != it["id"]] + [[it["id"], k]]))
        else:
            for v in NUM_VALUES + [str(it.get("min", 0)), str(it.get("max", "")), str((it.get("max") or 0) + 1)]:
                out.append((f"{it['id']}='{v}'", [p for p in allv if p[0] != it["id"]] + [[it["id"], v]]))
    return out


def nihss_states(items, rng):
    """items: [(id, n_options)]"""
    out = [("vazio", []), ("tudo-0", [[i, 0] for i, _ in items]), ("tudo-max", [[i, n - 1] for i, n in items])]
    for i, n in items:
        for k in range(n):
            out.append((f"{i}={k}", [[i, k]]))
    # complete scales whose total hits every band limit
    for target in (0, 1, 4, 5, 15, 16, 20, 21, 41, 42):
        for rep in range(3):
            vals = {i: 0 for i, _ in items}
            left = target
            order = items[:]
            rng.shuffle(order)
            for i, n in order:
                k = min(n - 1, left, rng.randrange(n))
                vals[i] = k
                left -= k
            for i, n in order:
                k = min(n - 1 - vals[i], left)
                vals[i] += k
                left -= k
            if left == 0:
                out.append((f"total={target}#{rep}", [[i, vals[i]] for i, _ in items]))
    for r in range(150):
        st = [[i, rng.randrange(n)] for i, n in items if rng.random() < 0.8]
        rng.shuffle(st)
        out.append((f"aleatorio#{r}", st))
    return out


NIHSS_QUICK = ["", "0", "000000000000000", "1021300", "333244444322222", "4", "1031", "222", "12a3", "999999999999999", "0123456789",
               "000000000000000000", "1 0 2", "010000000000003", "000000000000002"]


def pack(r):
    """Shrink a result for the fixtures file: a text equal to another field (or to its upper/lower case) is stored as a reference.
    References are only written when Python rebuilds exactly the same string, so unpack() is lossless."""
    r = dict(r)
    if "lista" in r:
        if r["copy"] is not None and r["copy"] == r["lista"]:
            r["copy"] = "=lista"
        if r["linhaUp"] == r["linha"].upper():
            r["linhaUp"] = "=UPPER(linha)"
        if r["listaLow"] == r["lista"].lower():
            r["listaLow"] = "=lower(lista)"
    if "texts" in r:
        k = "Admissão|lista"
        if r.get("copy") is not None and r["copy"] == r["texts"][k]:
            r["copy"] = "=" + k
        if r["upper"] == r["texts"][k].upper():
            r["upper"] = "=UPPER(" + k + ")"
    return r


def unpack(r):
    r = dict(r)
    if "lista" in r:
        if r["copy"] == "=lista":
            r["copy"] = r["lista"]
        if r["linhaUp"] == "=UPPER(linha)":
            r["linhaUp"] = r["linha"].upper()
        if r["listaLow"] == "=lower(lista)":
            r["listaLow"] = r["lista"].lower()
    if "texts" in r:
        k = "Admissão|lista"
        if r.get("copy") == "=" + k:
            r["copy"] = r["texts"][k]
        if r["upper"] == "=UPPER(" + k + ")":
            r["upper"] = r["texts"][k].upper()
    return r
