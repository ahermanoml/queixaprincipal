# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

`qprincipal.com.br` — a Brazilian-Portuguese clinical decision-support tool ("Prescritor — Queixa Principal") that lets a clinician pick a chief complaint / condition, assemble a prescription from prebuilt medication blocks, and copy out plain text formatted to match the source plantão/UBS PDF prescriptions.

It is a **single self-contained file**: `index.html` (~5650 lines). No build step, no dependencies, no framework, no tests, no package manager. Everything — CSS, HTML, the entire dataset, and the app logic — is inline. `CNAME` pins the GitHub Pages custom domain.

## Development & deploy

- **Run/preview:** open `index.html` directly in a browser, or `python3 -m http.server` and visit it. There is nothing to build, lint, or test.
- **Deploy:** GitHub Pages serves `main`. Pushing to `main` publishes to `qprincipal.com.br`. Do not rename `CNAME` or `index.html`.
- Everything is client-side; there is no backend, storage, or network call (clipboard API only).

## File layout inside `index.html`

Line numbers drift whenever the dataset is edited (it dominates the file). Re-grep the landmarks (`const DATA`, `const KW`, `function buildText`) rather than trusting these.

| Lines | Contents |
|-------|----------|
| `<style>` (~7–178) | All CSS. Theme via CSS custom properties in `:root` (`--accent`, `--ink`, etc.). |
| `<body>` (~180–228) | Three-column grid (`.grid`): `#col-cond` (conditions) → `#col-mid` (blocks/meds) → `#col-rx` (receita). |
| `const DATA` (~237–5344) | The dataset: 64 condition objects, authored as **pretty-printed JSON** (quoted keys, one value per line). This is the bulk of the file. |
| `const KW` (~5346–5424) | Search index — one quoted string of keywords per condition `id`. |
| state + logic (~5427–end) | Vanilla-JS app: `renderConds`, `renderMid`, `addItem`, `buildText`, `syncRx`. |

## Data model (the part that matters)

`DATA` and `KW` are authored as **pretty-printed JSON** (double-quoted keys and string values, one element per line) — match that style; don't revert to compact unquoted JS object literals.

Each entry in `DATA` is a condition:

```js
{
  "id": "itu",                 // unique key; MUST also appear in KW
  "ic": "💊",                  // emoji shown in the list
  "nm": "ITU / Cistite",       // display name
  "sub": "sulfametoxazol · fosfomicina · ...",  // subtitle (also searched)
  "blocks": [ ...Block ]
}
```

A **Block** is one prescription variant / section:

```js
{
  "label": "Padrão — Ibuprofeno",
  "items": [ Item, ... ],
  "orient": ["texto de orientação", ...],  // optional patient-guidance bullets
  "menu": true,                             // optional; see below
  "mode": "internacao",                     // optional; "amb" (default) | "internacao" | "ped"
  "draft": true                             // optional; AI-drafted → shows a "rascunho" tag, needs clinical sign-off
}
```

- `"menu": true` marks a "choose one of these" block — the UI shows an `escolha` tag instead of the **Adicionar receita** (add-whole-block) button, so items must be added individually. By convention these blocks also carry an `— escolha 1` suffix in their `label`.
- `orient` strings render in a side box and, when added, appear under an `ORIENTAÇÕES:` heading in the output.
- `"mode"` assigns the block to a **prescription mode**: `"amb"` (ambulatorial / outpatient — the default when the key is absent), `"internacao"` (inpatient), or `"ped"` (pediátrica). The middle column shows a mode selector and `renderMid` only renders blocks matching the active `currentMode`. See *Prescription modes & collapsible blocks*.
- `"draft": true` flags AI-generated content awaiting the clinician's review — it renders a `rascunho` tag on a tinted block. Drop the flag once a block is signed off.

An **Item** is a positional array (tuple), **not** an object — in the file each element sits on its own line:

```js
[ "IBUPROFENO 300 MG", "40 COMPRIMIDOS", "TOMAR 02 COMPRIMIDOS DE 6/6H POR 05 DIAS", route? ]
//   [0] med + dose       [1] quantity      [2] posologia (instructions)            [3] route?
```

- The 4th element (route) is optional and defaults to `ORAL`. Route constants are defined once at the top of the script: `ORAL, TOP, INAL, NASAL, AUD, SL, EV, IM, SC` (e.g. `"USO ORAL"`, `"USO TÓPICO"`, `"USO ENDOVENOSO"`, `"USO INTRAMUSCULAR"`). In the JSON `DATA` the route is written as the **literal string** (e.g. `"USO ENDOVENOSO"`), not the JS constant — the constants are only used in the script logic (`buildText`, `keyOf`, defaults).
- Drug names and doses are written in **UPPERCASE** by convention — match it.

## Conventions that are easy to break

- **Adding a condition requires two edits.** Add the object to `DATA` *and* add a matching key to `KW` (same `id`). Search only works through `KW[id]` (plus `nm` + `sub`); a condition with no `KW` entry is unfindable by keyword. The `KW` value should be a flat lowercase string mixing the display name, lay synonyms, symptom words, and every drug name in the block.
- **Output format mirrors the source PDFs — don't casually change it.** `buildText()` groups selected items by route (`groupByRoute()`), prints the route header, then numbered lines `NN- MED ______ qty` followed by the posologia, then an `ORIENTAÇÕES:` section with `# `-prefixed lines. `pad()` pads each med name with underscores out to the `RX_COL_WIDTH` (46) column, with a `RX_MIN_DASHES` (3) floor. Changing those constants, the `NN- ` numbering, route grouping, or the `# ` prefix changes what clinicians paste into their systems.
- **Dedup key is `(med + "|" + qty + "|" + route).toUpperCase()`** (`keyOf`, route defaults to `ORAL`). The same drug at a *different quantity or route* is treated as a distinct item and will not be deduped — keep that in mind when authoring near-duplicate items.
- **"Edição livre" (free-edit) toggle** stops `syncRx()` from overwriting the `<textarea>`, so manual edits survive. Logic that writes to `#rx` must respect the `freeEdit` flag.

## App logic flow

`renderConds(filter)` builds the left list (filter matches `nm + sub + KW[id]`) → clicking a condition resets `currentMode = "amb"` and calls `renderMid(c)` → clicking an item / **Adicionar receita** calls `addItem` / `addOrient`, which mutate the module-level `selected[]` / `orientSet[]` and call `syncRx()` → `syncRx()` re-renders the right-hand chips and regenerates the textarea via `buildText()`. Copy uses `navigator.clipboard` with an `execCommand("copy")` fallback.

## Prescription modes & collapsible blocks

`renderMid` is mode-aware (state: module-level `currentMode`, one of `"amb" | "internacao" | "ped"`; the `MODES` array holds the labels/icons):

- It counts blocks per mode, renders a **mode selector** (`.mode-box` pills) in the `.mid-head`, then renders only the blocks whose `(b.mode || "amb")` equals `currentMode`. Clicking a pill sets `currentMode` and re-renders the same condition; opening a different condition resets to `"amb"`. A mode with no blocks renders a `.mode-empty` placeholder (the pill is dimmed via `.empty`).
- **Block indices must stay stable.** `data-b` carries the block's *original* index into `c.blocks`; `renderMid` filters with `c.blocks.map((b,bi)=>({b,bi})).filter(...)` so the index survives filtering. The `addall`/item/orient handlers do `c.blocks[+dataset.b]`, so never renumber.
- **Collapsible blocks:** each `.block-head` has a `.bl-toggle` button (chevron + label) that toggles `.block.collapsed` (CSS hides `.items` + `.orient-box`). When a mode shows **more than one** block they all start collapsed; a lone block starts expanded. The whole-block **Adicionar receita** button works even while collapsed.
- Each `.block` is now explicitly closed in the template string (`h += '</div>'` after the orient box). The earlier code left it open, so blocks rendered nested — don't reintroduce that.
