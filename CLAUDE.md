# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

`qprincipal.com.br` — a Brazilian-Portuguese clinical decision-support tool ("Prescritor — Queixa Principal") that lets a clinician pick a chief complaint / condition, assemble a prescription from prebuilt medication blocks, and copy out plain text formatted to match the source plantão/UBS PDF prescriptions.

It is a **single self-contained file**: `index.html` (~13k lines, almost all of it data). No build step, no dependencies, no framework, no tests, no package manager. Everything — CSS, HTML, the entire dataset, and the app logic — is inline. `CNAME` pins the GitHub Pages custom domain.

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
| `const MINHA` (after `KW`) | **Minha prescrição** — the clinician's own free-text templates (evolução, exame físico, receitas, observação, laudos). See *Minha prescrição*. |
| state + logic (~5427–end) | Vanilla-JS app: `renderConds`, `renderMid`, `renderMinha`, `addItem`, `buildText`, `syncRx`. |

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
  "sec": "offlabel",                        // optional; "padrao" (default) | "offlabel"
  "draft": true                             // optional; AI-drafted → shows a "rascunho" tag, needs clinical sign-off
}
```

- `"menu": true` marks a "choose one of these" block — the UI shows an `escolha` tag instead of the **Adicionar receita** (add-whole-block) button, so items must be added individually. By convention these blocks also carry an `— escolha 1` suffix in their `label`.
- `orient` strings are not shown inside the block: `renderMid` gathers the `orient` of every block in the active mode (deduped) into the **Recomendações e instruções** section, where each line can be added on its own (or all at once). **Adicionar receita** on a block still adds that block's `orient` too. Added lines appear under an `ORIENTAÇÕES:` heading in the output.
- `"sec"` picks the **section** of the middle column the block belongs to (see *Sections*): `"padrao"` (default when absent) or `"offlabel"`. In the ambulatorial mode, **Padrão** is the guideline-based standard prescription (AI-drafted from current guidelines, so it carries `"draft": true` until signed off) and **Off label** holds every older ambulatorial block that the new padrão did not already cover — "off label" here is the owner's name for "alternatives", not the regulatory sense. Internação and pediátrica were rebuilt the same way: each mode has its own guideline-based padrão blocks plus `"offlabel"` alternatives, all `"draft": true`; pediatric weight-based doses use the PESO spec.
- `"mode"` assigns the block to a **prescription mode**: `"amb"` (ambulatorial / outpatient — the default when the key is absent), `"internacao"` (inpatient), or `"ped"` (pediátrica). The middle column shows a mode selector and `renderMid` only renders blocks matching the active `currentMode`. See *Prescription modes & collapsible blocks*.
- `"draft": true` flags AI-generated content awaiting the clinician's review — it renders a `rascunho` tag on a tinted block (and on its lines in **Recomendações e instruções**, unless a non-draft block carries the same line). Drop the flag once a block is signed off.

An **Item** is a positional array (tuple), **not** an object — in the file each element sits on its own line:

```js
[ "IBUPROFENO 300 MG", "01 CAIXA", "TOMAR 02 COMPRIMIDOS DE 6/6H POR 05 DIAS", route? ]
//   [0] med + dose       [1] quantity      [2] posologia (instructions)            [3] route?
```

- The 4th element (route) is optional and defaults to `ORAL`. Route constants are defined once at the top of the script: `ORAL, TOP, INAL, NASAL, AUD, SL, EV, IM, SC` (e.g. `"USO ORAL"`, `"USO TÓPICO"`, `"USO ENDOVENOSO"`, `"USO INTRAMUSCULAR"`). In the JSON `DATA` the route is written as the **literal string** (e.g. `"USO ENDOVENOSO"`), not the JS constant — the constants are only used in the script logic (`buildText`, `keyOf`, defaults).
- Drug names and doses are written in **UPPERCASE** by convention — match it.
- **Weight-based doses** use a 5th element, the PESO spec — then the route `[3]` is mandatory and the posologia contains the literal `{DOSE}` exactly once. See *Calculadora de peso*.

```js
[ "DIPIRONA 500 MG/ML SOLUÇÃO ORAL (GOTAS)", "01 FRASCO", "DAR {DOSE} VIA ORAL DE 6/6H SE DOR OU FEBRE (25 MG/KG/DOSE)", "USO ORAL",
  {"kg": 25, "conc": 500, "gotas": 20, "un": "GOTAS", "max": 1000} ]
```

## Conventions that are easy to break

- **Adding a condition requires two edits.** Add the object to `DATA` *and* add a matching key to `KW` (same `id`). Search only works through `KW[id]` (plus `nm` + `sub`); a condition with no `KW` entry is unfindable by keyword. The `KW` value should be a flat lowercase string mixing the display name, lay synonyms, symptom words, and every drug name in the block.
- **Output format mirrors the source PDFs — don't casually change it.** `buildText()` groups selected items by route (`groupByRoute()`), prints the route header, then numbered lines `NN- MED ______ qty` followed by the posologia, then an `ORIENTAÇÕES:` section with `# `-prefixed lines. `pad()` pads each med name with underscores out to the `RX_COL_WIDTH` (46) column, with a `RX_MIN_DASHES` (3) floor. Changing those constants, the `NN- ` numbering, route grouping, or the `# ` prefix changes what clinicians paste into their systems.
- **Dedup key is `(med + "|" + qty + "|" + route).toUpperCase()`** (`keyOf`, route defaults to `ORAL`). The same drug at a *different quantity or route* is treated as a distinct item and will not be deduped — keep that in mind when authoring near-duplicate items.
- **"Edição livre" (free-edit) toggle** stops `syncRx()` from overwriting the `<textarea>`, so manual edits survive. Logic that writes to `#rx` must respect the `freeEdit` flag.

## App logic flow

`renderConds(filter)` builds the left list (filter matches `nm + sub + KW[id]`; the pinned **⭐ Minha prescrição** entry sits on top and also matches its card titles) → clicking a condition resets `currentMode = "amb"` and calls `renderMid(c)` → clicking an item / **Adicionar receita** calls `addItem` / `addOrient`, which mutate the module-level `selected[]` / `orientSet[]` and call `syncRx()` → `syncRx()` re-renders the right-hand chips and regenerates the textarea via `buildText()`. Copy uses `navigator.clipboard` with an `execCommand("copy")` fallback.

## Prescription modes, sections & collapsible blocks

`renderMid` is mode-aware (state: module-level `currentMode`, one of `"amb" | "internacao" | "ped"`; the `MODES` array holds the labels/icons):

- It counts blocks per mode, renders a **mode selector** (`.mode-box` pills) in the `.mid-head`, then renders only the blocks whose `(b.mode || "amb")` equals `currentMode`. Clicking a pill sets `currentMode` and re-renders the same condition; opening a different condition resets to `"amb"`. A mode with no blocks renders a `.mode-empty` placeholder (the pill is dimmed via `.empty`).
- **Block indices must stay stable.** `data-b` carries the block's *original* index into `c.blocks`; `renderMid` filters with `c.blocks.map((b,bi)=>({b,bi})).filter(...)` so the index survives filtering. The `addall`/item handlers do `c.blocks[+dataset.b]`, so never renumber.
- **Sections (`SECS`):** inside the active mode the middle column has four stacked, collapsible `.sec` sections, always in this order: **Padrão** (blocks with `sec` absent/`"padrao"`, starts **open**), **Minha prescrição** (the `MINHA` cards whose `conds` include this condition, regardless of mode), **Off label** (`"offlabel"` blocks) and **Recomendações e instruções** (the deduped `orient` lines). All but Padrão start collapsed. Each `.sec-head` shows a count; an empty section is dimmed (`.none`) and shows a `.sec-empty` placeholder when opened. Choosing a condition or switching mode re-renders, so Padrão is open again.
- **Collapsible blocks:** each `.block-head` has a `.bl-toggle` button (chevron + label) that toggles `.block.collapsed` (CSS hides `.items`). Blocks start expanded. The whole-block **Adicionar receita** button works even while collapsed.
- Block markup comes from `blockHTML()`, which closes both `.items` and `.block`. The earlier code left `.block` open, so blocks rendered nested — don't reintroduce that.
- `bindBlocks()` wires the section/block toggles and the Minha card buttons; it is shared by `renderMid` and `renderMinha`. The whole-block handler selects `.addall[data-b]` because the Minha cards reuse the `.addall` style with `data-send`.

## Calculadora de peso

- PESO spec fields: `kg` (amount per kg **per dose**, in the drug unit) **or** `kgdia` + `vezes` (per kg per day ÷ doses/day); `max` (cap per dose, in the drug unit — always set it); `conc` (drug unit per mL of the presentation; omit when the output is the drug unit itself, e.g. EV dose in MG or fluids in ML); `un` (`"ML" | "GOTAS" | "MG" | "MCG" | "UI"`, printed in place of `{DOSE}`); `gotas` (drops per mL, required for `"GOTAS"`).
- `doseTxt(spec)` computes from the module-level `peso`: amount = min(kg × peso, max); ML = amount ÷ conc (2 decimals under 1 mL, else 1); GOTAS = round(amount ÷ conc × gotas); without `conc` the amount itself. Capped doses get "(DOSE MÁXIMA)". With no weight it prints `__ ML` / `__ GOTAS`.
- The weight box (`.peso-box`, `#peso`) shows in the **Pediátrica** mode, and in any other mode whose blocks contain a PESO item. Typing updates the `.dose` spans in place (`refreshDoses()`, no re-render, so focus stays) and the receita. The weight persists across conditions/modes and is cleared by **Limpar**.
- Selected items keep their `spec`, and `buildText()` fills `{DOSE}` at build time — changing the weight updates items already in the receita. When any selected item has a spec and a weight is set, the text starts with `PESO: N KG`.

## Minha prescrição

`MINHA` is a pretty-printed JSON array of cards: `{"titulo", "grupo", "conds": [DATA ids], "linhas": [one string per line], "nota"?}`.

- The text is the clinician's own, kept **as they wrote it** (their spacing, dashes, abbreviations and typos) — don't reformat it into `Item` tuples or "fix" it; it is copied verbatim. Only trailing spaces and leading/trailing blank lines are trimmed.
- Clicking **⭐ Minha prescrição** (`MINHA_ID`, pinned at the top of the list) calls `renderMinha()`, which shows every card grouped by `grupo`, collapsed. Inside a condition, the **Minha prescrição** section shows the cards whose `conds` include its `id`, expanded.
- **Copiar** copies the card text (`copyText`, clipboard API with a hidden-textarea fallback). **＋ Receita** (`sendToRx`) appends the text to the receita textarea and switches on **edição livre**, so it is not overwritten.
- `"nota"` marks a card that was adapted from what the clinician pasted (shows an `adaptado` tag). The "Evolução diária — sala de emergência" card is the structure of a real evolution note with **all patient data removed** — never put identifiable patient data in this public file.
