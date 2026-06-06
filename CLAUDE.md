# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

`qprincipal.com.br` — a Brazilian-Portuguese clinical decision-support tool ("Prescritor — Queixa Principal") that lets a clinician pick a chief complaint / condition, assemble a prescription from prebuilt medication blocks, and copy out plain text formatted to match the source plantão/UBS PDF prescriptions.

It is a **single self-contained file**: `index.html` (~4600 lines). No build step, no dependencies, no framework, no tests, no package manager. Everything — CSS, HTML, the entire dataset, and the app logic — is inline. `CNAME` pins the GitHub Pages custom domain.

## Development & deploy

- **Run/preview:** open `index.html` directly in a browser, or `python3 -m http.server` and visit it. There is nothing to build, lint, or test.
- **Deploy:** GitHub Pages serves `main`. Pushing to `main` publishes to `qprincipal.com.br`. Do not rename `CNAME` or `index.html`.
- Everything is client-side; there is no backend, storage, or network call (clipboard API only).

## File layout inside `index.html`

| Lines | Contents |
|-------|----------|
| `<style>` (~6–151) | All CSS. Theme via CSS custom properties in `:root` (`--accent`, `--ink`, etc.). |
| `<body>` (~153–197) | Three-column grid: `#col-cond` (conditions) → `#col-mid` (blocks/meds) → `#col-rx` (receita). |
| `const DATA` (~207–4315) | The dataset: 64 condition objects. This is the bulk of the file. |
| `const KW` (~4317–4382) | Search index — one string of keywords per condition `id`. |
| state + logic (~4387–end) | Vanilla-JS app: `renderConds`, `renderMid`, `addItem`, `buildText`, `syncRx`. |

## Data model (the part that matters)

Each entry in `DATA` is a condition:

```js
{
  id: "itu",                 // unique key; MUST also appear in KW
  ic: "💊",                  // emoji shown in the list
  nm: "ITU / Cistite",       // display name
  sub: "sulfametoxazol · fosfomicina · ...",  // subtitle (also searched)
  blocks: [ ...Block ]
}
```

A **Block** is one prescription variant / section:

```js
{
  label: "Padrão — Ibuprofeno",
  items: [ Item, ... ],
  orient: ["texto de orientação", ...],  // optional patient-guidance bullets
  menu: true                              // optional; see below
}
```

- `menu: true` marks a "choose one of these" block — the UI shows a `escolha` tag instead of the **Adicionar receita** (add-whole-block) button, so items must be added individually.
- `orient` strings render in a side box and, when added, appear under an `ORIENTAÇÕES:` heading in the output.

An **Item** is a positional tuple, **not** an object:

```js
[ "IBUPROFENO 300 MG", "40 COMPRIMIDOS", "TOMAR 02 COMPRIMIDOS DE 6/6H POR 05 DIAS", route? ]
//   [0] med + dose       [1] quantity      [2] posologia (instructions)            [3] route?
```

- The 4th element (route) is optional and defaults to `ORAL`. Route constants are defined once at the top of the script: `ORAL, TOP, INAL, NASAL, AUD, SL` (e.g. `"USO ORAL"`, `"USO TÓPICO"`).
- Drug names and doses are written in **UPPERCASE** by convention — match it.

## Conventions that are easy to break

- **Adding a condition requires two edits.** Add the object to `DATA` *and* add a matching key to `KW` (same `id`). Search only works through `KW[id]` (plus `nm` + `sub`); a condition with no `KW` entry is unfindable by keyword. The `KW` value should be a flat lowercase string mixing the display name, lay synonyms, symptom words, and every drug name in the block.
- **Output format mirrors the source PDFs — don't casually change it.** `buildText()` groups selected items by route, prints the route header, then numbered lines `NN- MED ______ qty` followed by the posologia, then an `ORIENTAÇÕES:` section with `# `-prefixed lines. `pad()` pads each med name with underscores to a 46-char column for alignment. Changing the padding width, the `NN- ` numbering, route grouping, or the `# ` prefix changes what clinicians paste into their systems.
- **Dedup key is `(med + "|" + qty).toUpperCase()`** (`keyOf`). The same drug at a *different quantity* is treated as a distinct item and will not be deduped — keep that in mind when authoring near-duplicate items.
- **"Edição livre" (free-edit) toggle** stops `syncRx()` from overwriting the `<textarea>`, so manual edits survive. Logic that writes to `#rx` must respect the `freeEdit` flag.

## App logic flow

`renderConds(filter)` builds the left list (filter matches `nm + sub + KW[id]`) → clicking a condition calls `renderMid(c)` → clicking an item / **Adicionar receita** calls `addItem` / `addOrient`, which mutate the module-level `selected[]` / `orientSet[]` and call `syncRx()` → `syncRx()` re-renders the right-hand chips and regenerates the textarea via `buildText()`. Copy uses `navigator.clipboard` with an `execCommand("copy")` fallback.
