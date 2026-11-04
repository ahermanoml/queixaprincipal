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
| `<body>` (~290–350) | `header.top` (title row + the **Padrão / Meu rascunho** tabs) above the grid (`.grid`): `#col-cond` (conditions) → `#col-mid` (blocks/meds) → `#col-rascunho` (Meu rascunho text, hidden on Padrão) → `#col-rx` (receita). |
| `const DATA` (~237–5344) | The dataset: 64 condition objects, authored as **pretty-printed JSON** (quoted keys, one value per line). This is the bulk of the file. |
| `const KW` (~5346–5424) | Search index — one quoted string of keywords per condition `id`. |
| `const MINHA` (after `KW`) | **Meu rascunho** (formerly "Minha prescrição") — the clinician's own free-text templates (evolução, exame físico, receitas, observação, laudos). See *Meu rascunho*. |
| state + logic (~5427–end) | Vanilla-JS app: `renderConds`, `renderMid`, `showView`, `renderRascunho`, `addItem`, `buildText`, `syncRx`. |

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
  "sec": "offlabel",                        // optional; "padrao" (default) | "offlabel" (shown as "Outras opções")
  "draft": true                             // optional; AI-drafted → shows a "rascunho" tag, needs clinical sign-off (unrelated to the "Meu rascunho" tab)
}
```

- `"menu": true` marks a "choose one of these" block — the UI shows an `escolha` tag instead of the **Adicionar receita** (add-whole-block) button, so items must be added individually. By convention these blocks also carry an `— escolha 1` suffix in their `label`.
- `orient` strings are not shown inside the block: `renderMid` gathers the `orient` of every block in the active mode (deduped) into the **Recomendações e instruções** section, where each line can be added on its own (or all at once). **Adicionar receita** on a block still adds that block's `orient` too. Added lines appear under an `ORIENTAÇÕES:` heading in the output.
- `"sec"` picks the **section** of the middle column the block belongs to (see *Prescription modes & sections*): `"padrao"` (default when absent) or `"offlabel"`. In the ambulatorial mode, **Padrão** is the guideline-based standard prescription (AI-drafted from current guidelines, so it carries `"draft": true` until signed off) and the `"offlabel"` blocks — displayed as **Outras opções** — hold every older ambulatorial block that the new padrão did not already cover ("alternatives", not the regulatory off-label sense). The UI label was renamed from "Off label" to "Outras opções", but the data key stays `"sec": "offlabel"` — **don't rename the key**. `orient` text that points the clinician to those blocks says "(VER OUTRAS OPÇÕES)"; the remaining "OFF LABEL" mentions in `DATA` are the regulatory sense (bula / via não aprovada) and stay as written. Internação and pediátrica were rebuilt the same way: each mode has its own guideline-based padrão blocks plus `"offlabel"` alternatives, all `"draft": true`; pediatric weight-based doses use the PESO spec.
- `"mode"` assigns the block to a **prescription mode**: `"amb"` (ambulatorial / outpatient — the default when the key is absent), `"internacao"` (inpatient), or `"ped"` (pediátrica). The middle column shows a mode selector and `renderMid` only renders blocks matching the active `currentMode`. See *Prescription modes & sections*.
- `"draft": true` flags AI-generated content awaiting the clinician's review — it renders a `rascunho` tag on a tinted block (and on its lines in **Recomendações e instruções**, unless a non-draft block carries the same line). Drop the flag once a block is signed off. This `rascunho` tag has **nothing to do** with the **Meu rascunho** header tab (the clinician's own `MINHA` templates) — keep the two separate.

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

`renderConds(filter)` builds the left list (filter matches `nm + sub + KW[id]`; only conditions — there is no pinned entry any more) → clicking a condition resets `currentMode = "amb"` and calls `renderMid(c)` → clicking an item / **Adicionar receita** calls `addItem` / `addOrient`, which mutate the module-level `selected[]` / `orientSet[]` and call `syncRx()` → `syncRx()` re-renders the right-hand chips and regenerates the textarea via `buildText()`. Copy uses `navigator.clipboard` with an `execCommand("copy")` fallback.

## Header tabs: Padrão | Meu rascunho

The header (`header.top`) has a title row (`.top-row`) and, under it, two big **folder-style tabs** (`.top-tabs` / `.top-tab`, `role="tab"`): **💊 Padrão** and **⭐ Meu rascunho**. They switch the whole page, not just the middle column. State: module-level `currentView` (`"padrao" | "rascunho"`); `showView(v)` sets `body[data-view]`, the tabs' `.active` / `aria-selected`, and scrolls to the top. CSS does the rest:

- **Padrão** (default on load): the prescriber — `#col-cond` → `#col-mid` → `#col-rx`.
- **Meu rascunho**: `#col-cond` and `#col-mid` are hidden and `#col-rascunho` takes their place (`grid-template-columns: 1fr 380px`, with matching rules at the 1100px / 820px breakpoints); the receita column stays, with the same content. The open condition, mode, weight and receita survive switching back and forth (nothing is re-rendered).
- **Layout:** `body` is a flex column — the header has free height (~125px desktop, ~104px phone) and `.grid` is `flex:1; min-height:0`, so the columns fill the rest of the screen without a hard-coded header height. At ≤820px the page scrolls as a whole (`html, body {height:auto}`, `body {display:block}`) so the sticky header stays pinned however far you scroll. At ≤600px the subtitle hides, the logo/title shrink and the two tabs split the width; at ≤360px the tab font drops to 14px so "⭐ Meu rascunho" fits a 320px phone.
- The global `[hidden]{display:none !important}` utility rule sits at the top of the CSS.

## Prescription modes & sections

Top-to-bottom, the middle column of a condition is: **title** (`h3` + `.desc`) → **mode selector** `Ambulatorial / Internação / Pediátrica` (`.mode-box`) → (weight box, when applicable) → **sections**. All of that header lives in `.mid-head`. There are no per-condition tabs: the clinician's templates live only in the **Meu rascunho** header tab.

`renderMid` state: module-level `currentMode` (`"amb" | "internacao" | "ped"`; the `MODES` array holds labels/icons).

- **Mode selector.** `renderMid` counts blocks per mode, renders three big equal-width `.mode-btn` buttons (`.mi` icon, `.ml` label, `.mc` count), then renders only the blocks whose `(b.mode || "amb")` equals `currentMode`. Clicking a button sets `currentMode` and re-renders the same condition; opening a different condition resets to `"amb"`. A mode with no blocks renders a `.mode-empty` placeholder (the button is dimmed via `.empty`).
- **Responsive sizing** uses a **container query** on `#col-mid` (`container: mid / inline-size`), because the middle column's width doesn't track the viewport (it is narrow both on phones and on ~900–1200px screens). Mode buttons: column ≥560px → icon + label + count in a row (54px tall, 16px); narrower → icon above label, count in the corner (70px tall, 15px; 14px under 400px); under 365px (375px phones and smaller, ~900px tablets) → the three stack full-width (52px tall, 16px). Browsers without container queries get the "icon above label" layout.
- **Block indices must stay stable.** `data-b` carries the block's *original* index into `c.blocks`; `renderMid` filters with `c.blocks.map((b,bi)=>({b,bi})).filter(...)` so the index survives filtering. The `addall`/item handlers do `c.blocks[+dataset.b]`, so never renumber.
- **Sections (`SECS`)** — below the mode selector, three stacked, collapsible `.sec` sections, always in this order: **Padrão** (blocks with `sec` absent/`"padrao"`, starts **open**), **Outras opções** (`"sec": "offlabel"` blocks) and **Recomendações e instruções** (the deduped `orient` lines; lines that only come from Outras opções are listed under a "Das outras opções" sub-heading). The latter two start collapsed. Each `.sec-head` shows a count; an empty section is dimmed (`.none`) and shows a `.sec-empty` placeholder when opened. Choosing a condition or switching mode re-renders, so Padrão is open again. The clinician's templates are **not** a section — they are the Meu rascunho header tab.
- **Collapsible blocks:** each `.block-head` has a `.bl-toggle` button (chevron + label) that toggles `.block.collapsed` (CSS hides `.items`). Blocks start expanded. The whole-block **Adicionar receita** button works even while collapsed.
- Block markup comes from `blockHTML()`, which closes both `.items` and `.block`. The earlier code left `.block` open, so blocks rendered nested — don't reintroduce that.
- `bindBlocks()` wires the section/block toggles of the middle column.

## Calculadora de peso

- PESO spec fields: `kg` (amount per kg **per dose**, in the drug unit) **or** `kgdia` + `vezes` (per kg per day ÷ doses/day); `max` (cap per dose, in the drug unit — always set it); `conc` (drug unit per mL of the presentation; omit when the output is the drug unit itself, e.g. EV dose in MG or fluids in ML); `un` (`"ML" | "GOTAS" | "MG" | "MCG" | "UI"`, printed in place of `{DOSE}`); `gotas` (drops per mL, required for `"GOTAS"`).
- `doseTxt(spec)` computes from the module-level `peso`: amount = min(kg × peso, max); ML = amount ÷ conc (2 decimals under 1 mL, else 1); GOTAS = round(amount ÷ conc × gotas); without `conc` the amount itself. Capped doses get "(DOSE MÁXIMA)". With no weight it prints `__ ML` / `__ GOTAS`.
- The weight box (`.peso-box`, `#peso`) shows in the **Pediátrica** mode, and in any other mode whose blocks contain a PESO item. Typing updates the `.dose` spans in place (`refreshDoses()`, no re-render, so focus stays) and the receita. The weight persists across conditions/modes and is cleared by **Limpar**.
- Selected items keep their `spec`, and `buildText()` fills `{DOSE}` at build time — changing the weight updates items already in the receita. When any selected item has a spec and a weight is set, the text starts with `PESO: N KG`.

## Meu rascunho (`MINHA`)

`MINHA` is a pretty-printed JSON array of cards: `{"titulo", "grupo", "conds": [DATA ids], "linhas": [one string per line], "nota"?}`.

- The text is the clinician's own, kept **as they wrote it** (their spacing, dashes, abbreviations and typos) — don't reformat it into `Item` tuples or "fix" it; it is copied verbatim. Only trailing spaces and leading/trailing blank lines are trimmed.
- Shown as **Meu rascunho** (it was called "Minha prescrição" before; the data name `MINHA` was kept). It is **one continuous text, not split by condition**: `renderRascunho()` (run once at start-up) fills `#rasc-doc` with every card in file order, grouped by `grupo` — a `.rg` group heading, then each card's `.rt` title, optional `.rn` nota and its `.rl` lines (monospace, `pre-wrap`). No per-card cards or buttons.
- The cards' `"conds"` field is **no longer used by the UI** (cards used to be listed per condition). It is kept in the data; leave it as is.
- **📋 Copiar tudo** copies `rascText()`: each group name in uppercase, then each card as `titulo` + its lines, with a blank line between pieces (copied via `copyText`, clipboard API with a hidden-textarea fallback).
- **＋ Receita** (`sendToRx`) appends **only the selected passage** of the text (`rascSelection()`, which must be inside `#rasc-doc`) to the receita textarea and switches on **edição livre**, so it is not overwritten. The selection is captured on `pointerdown` too, because on phones the tap can clear it before `click`. With nothing selected it shows a warning toast and leaves the receita alone.
- `"nota"` marks a card that was adapted from what the clinician pasted (shown as a small italic `.rn` line under its title, not included in **Copiar tudo**). The "Evolução diária — sala de emergência" card is the structure of a real evolution note with **all patient data removed** — never put identifiable patient data in this public file.
