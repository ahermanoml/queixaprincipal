# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

`qprincipal.com.br` — a Brazilian-Portuguese clinical decision-support tool ("Prescritor — Queixa Principal") that lets a clinician pick a chief complaint / condition, assemble a prescription from prebuilt medication blocks, and copy out plain text formatted to match the source plantão/UBS PDF prescriptions. Product rule: every piece of content can be copied as plain text ready to paste into the hospital system. Used mostly on the hospital desktop during shifts, but must work on a phone too.

A **static site with no build step**: plain HTML + CSS + classic `<script src>` files. No framework, no npm dependencies, no ES modules, no `fetch` — so `index.html` works opened via `file://` as well as on GitHub Pages. `CNAME` pins the GitHub Pages custom domain. The dev-only browser checks live in `tests/` (Python + Playwright + Chrome).

## Development & deploy

- **Run/preview:** open `index.html` directly in a browser, or `python3 -m http.server` and visit it. Nothing to build.
- **Test:** `python3 tests/run.py` (see *Tests*). Run it before every push.
- **Deploy:** GitHub Pages serves `main`. Pushing to `main` publishes to `qprincipal.com.br` — a live medical site. Do not rename `CNAME` or `index.html`.
- Everything is client-side; there is no backend, storage, analytics or network call (clipboard API only). No third-party assets. The repo is public: never commit identifiable patient data.

## File map

| File | Contents |
|------|----------|
| `index.html` | Markup shell only: `header.top` (title row with the **busca única** field, then the tab bar `#top-tabs`, filled from the registry) above `.grid`, whose columns follow the tab order: `#col-cond` (conditions) → `#col-mid` (blocks/meds) → `#col-esc-lista` / `#col-esc` (Escores list / calculator, with the phone result bar `#esc-bar`) → `#col-calc-lista` / `#col-calc` (Calculadoras) → `#col-rascunho` (Meu rascunho text) → `#col-rx` (receita, shared by the tabs that show it). Then `#ficha` (print-only blank form) and `<template id="tpl-ficha-nihss">`, then the `<script>` tags, **in load order**. |
| `css/app.css` | Site-wide CSS (each tab may add its own `css/<tab>.css`). Theme via CSS custom properties in `:root` (`--accent`, `--ink`, `--muted`, `--muted-aa`…). |
| `css/escores.css` | Escores tab, the `rx:false` grid rules, the phone result bar and the print CSS of the blank forms. |
| `css/calculadoras.css` | Styles of the Calculadoras tab only (`cx-` prefix; container query `calc` on `#col-calc`). |
| `data/prescricoes.js` | Route constants (`ORAL`, `EV`…), `DATA` (64 conditions, pretty-printed JSON) and `KW` (search keywords). The bulk of the repo. |
| `data/escores.js` | `window.ESCORES` (25 scores) and `window.GUIAS` (interpretation + conduta tables, 26 incl. NIHSS) — **byte-for-byte copy** of Ficha Vermelha's `assets/escores-data.js`. See *Escores*. |
| `data/nihss.js` | `NIHSS` — the NIHSS content (items, options, phrases, moments, formats, bands): a byte-for-byte block of Ficha Vermelha's `nihss/` page script, wrapped in a function. |
| `data/calculadoras.js` | `CALC_DADOS` — clinical content of the **Calculadoras** tab (`INF`, `IOT`, `PED`, `EMG` + the dilui footer `RODAPE`), copied **byte for byte** from dilui by script. See *Calculadoras*. |
| `img/nihss/` | `figura.jpg`, `nomeacao.jpg` (official NIHSS figures, item 9) — used only by the NIHSS blank form, loaded only when printing. |
| `data/rascunho.js` | `MINHA` — the clinician's own templates (**Meu rascunho**). |
| `js/core.js` | Shared helpers: `$`, `esc`, `norm` (lowercase, no accents — use it for every text search), toast, `copyText`, `pageScrolls` / `scrollIntoPlace`, and the **view registry** (`VIEWS`, `registerView`, `viewOf`). |
| `js/peso.js` | Weight calculator: `peso`, `fits`, `pickFaixa`, `doseTxt`, `faixaTxt`, `fillDose` (used by the receita and by Prescrições). |
| `js/receita.js` | The receita column: `selected[]`, `orientSet[]`, `freeEdit`, `addItem`, `addOrient`, `buildText`, `syncRx`, `sendToRx`, Copiar / Limpar / edição livre. |
| `js/escores-motor.js` | `FV` — the score engine (`evaluate`, `buildText`, `fichaHTML`, `LEVELS`…): a byte-for-byte block of Ficha Vermelha's `assets/escore.js`. Never edit the marked block. |
| `js/escores-nihss.js` | `NIHSSM` — NIHSS totals / band / text / quick entry / print form: byte-for-byte blocks of the `nihss/` page script around a shared `state`. |
| `js/views/prescricoes.js` | **Prescrições** tab: `renderConds`, `renderMid`, `blockHTML`, `applyPeso`, `openCond` / `closeCond`; registers the view. |
| `js/calc-motor.js` | `CM` — the Calculadoras math: dilui's formatting/infusion/bolus/`CALC`/pediatric functions copied unchanged, plus `linha`, `infusao`, `selectDrug`, `setPreset`, `setReg`, `ventilacao` (same texts, returned as data). |
| `js/views/escores.js` | **Escores** tab: list (`renderEscList`), calculator (`renderEsc` / `escUpdate`, `renderNihss` / `nihssUpdate`), copy, keyboard flow, blank form printing (`escPrint`); registers the view with `rx: false`. |
| `js/views/calculadoras.js` | **Calculadoras** tab: list, patient bar (global weight, age), infusion page (① ② ③), situation pages, intubation; registers the view. |
| `js/views/rascunho.js` | **Meu rascunho** tab: `renderRascunho`, `rascText`, ＋ Receita, `openCard`; registers the view. |
| `js/router.js` | Hash routing (`#/<view>/<item>`), derived from the registry. |
| `js/busca.js` | Global search, fed by each view's `search()`. |
| `js/app.js` | Renders the tabs (`renderTabs`), `showView`, start-up (`renderConds`, `renderEscList`, `renderRascunho`, `syncRx`, `onRoute("load")`; Calculadoras renders itself when its script loads). Loaded last. |
| `tests/` | Dev-only checks (not loaded by the site): `run.py` (entry point), `parity.py`, `features.py`, `shots.py`, `lib.py`; Escores: `escores_lib.py`, `escores_golden.py`, `escores_parity.py`, `escores_layout.py`, `fixtures/escores.json` (golden results frozen from the original Ficha Vermelha site); Calculadoras: `calc_paridade.py` + `calc_gabarito.json.gz`, `calc_features.py`. |

All scripts are classic scripts sharing one global scope: top-level `const`/`let`/`function` of one file are visible to the files after it. Load order matters only for code that **runs at load** (each file may use, at top level, only what earlier files declared; handlers can call anything). Order: `data/*` (prescricoes, escores, nihss, calculadoras, rascunho) → `core` → `peso` → `receita` → `escores-motor` → `escores-nihss` → `calc-motor` → `views/*` (prescricoes, escores, calculadoras, rascunho — this is also the tab order) → `router` → `busca` → `app`.

### Cache busting (`?v=`)

GitHub Pages caches assets, so a browser could combine a new `index.html` with an old JS/CSS file. Every local asset URL in `index.html` carries the same version token, e.g. `js/core.js?v=20261110e`. **Whenever any file under `css/`, `data/` or `js/` changes in a push, bump the token in every URL of `index.html`** (one search-and-replace; format `YYYYMMDD` + a letter for several releases on one day). New asset → add it with the current token.

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
  "mode": "internacao",                     // optional; "amb" (default) | "internacao" | "ped" | "ped_internacao"
  "sec": "offlabel",                        // optional; "padrao" (default) | "offlabel" (shown as "Outras opções")
  "peso": {"de": 3, "menor": 35},           // optional; block only applies to this weight range (see *Calculadora de peso*)
  "draft": true                             // optional; AI-drafted → shows a "rascunho" tag, needs clinical sign-off (unrelated to the "Meu rascunho" tab)
}
```

- `"menu": true` marks a "choose one of these" block — the UI shows an `escolha` tag instead of the **Adicionar receita** (add-whole-block) button, so items must be added individually. By convention these blocks also carry an `— escolha 1` suffix in their `label`.
- `orient` strings are not shown inside the block: `renderMid` gathers the `orient` of every block in the active mode (deduped) into the **Recomendações e instruções** section, where each line can be added on its own (or all at once). **Adicionar receita** on a block adds **only its medications** — orientations are always added separately, from that section (every condition, every mode). Added lines appear under an `ORIENTAÇÕES:` heading in the output.
- `"sec"` picks the **section** of the middle column the block belongs to (see *Prescription modes & sections*): `"padrao"` (default when absent) or `"offlabel"`. In the ambulatorial mode, **Padrão** is the guideline-based standard prescription (AI-drafted from current guidelines, so it carries `"draft": true` until signed off) and the `"offlabel"` blocks — displayed as **Outras opções** — hold every older ambulatorial block that the new padrão did not already cover ("alternatives", not the regulatory off-label sense). The UI label was renamed from "Off label" to "Outras opções", but the data key stays `"sec": "offlabel"` — **don't rename the key**. `orient` text that points the clinician to those blocks says "(VER OUTRAS OPÇÕES)"; the remaining "OFF LABEL" mentions in `DATA` are the regulatory sense (bula / via não aprovada) and stay as written. Internação and pediátrica were rebuilt the same way: each mode has its own guideline-based padrão blocks plus `"offlabel"` alternatives, all `"draft": true`; pediatric weight-based doses use the PESO spec.
- `"mode"` puts the block in one of **four combinations** of patient × setting, picked in the middle column by the **Adulto | Pediátrico** tabs and the **Ambulatorial | Internação** sub-option (see *Prescription modes & sections*):

  | `"mode"` | Shown in |
  |----------|----------|
  | `"amb"` (default when the key is absent) | Adulto › Ambulatorial |
  | `"internacao"` | Adulto › Internação |
  | `"ped"` | Pediátrico › Ambulatorial |
  | `"ped_internacao"` | Pediátrico › Internação |

  The `MODE_OF[pac][set]` table in the script maps the UI choice to these values. **Ambulatorial vs Internação follows one rule for adults and children:** *Internação* = care given in the hospital — PS/observação/enfermaria/UTI: EV or continuous drugs, crisis treatment in the PS, observação (e.g. anafilaxia, crise de asma no PS, dengue grupos C/D, plano C, pielonefrite EV, pneumonia internada, grande queimado, TCE em observação); *Ambulatorial* = what the patient takes home, including single IM doses given at the unit before going home (penicilina benzatina, ceftriaxona IM na otite, profilaxias, antitetânica). The pediatric blocks were split with this rule in 2026-11 (97 `"ped"`, 36 `"ped_internacao"`); keep new blocks consistent with it.
- `"draft": true` flags AI-generated content awaiting the clinician's review — it renders a `rascunho` tag on a tinted block (and on its lines in **Recomendações e instruções**, unless a non-draft block carries the same line). Drop the flag once a block is signed off. This `rascunho` tag has **nothing to do** with the **Meu rascunho** header tab (the clinician's own `MINHA` templates) — keep the two separate.

An **Item** is a positional array (tuple), **not** an object — in the file each element sits on its own line:

```js
[ "IBUPROFENO 300 MG", "01 CAIXA", "TOMAR 02 COMPRIMIDOS DE 6/6H POR 05 DIAS", route? ]
//   [0] med + dose       [1] quantity      [2] posologia (instructions)            [3] route?
```

- The 4th element (route) is optional and defaults to `ORAL`. Route constants are defined once at the top of the script: `ORAL, TOP, INAL, NASAL, AUD, SL, EV, IM, SC` (e.g. `"USO ORAL"`, `"USO TÓPICO"`, `"USO ENDOVENOSO"`, `"USO INTRAMUSCULAR"`). In the JSON `DATA` the route is written as the **literal string** (e.g. `"USO ENDOVENOSO"`), not the JS constant — the constants are only used in the script logic (`buildText`, `keyOf`, defaults).
- Drug names and doses are written in **UPPERCASE** by convention — match it.
- **Weight-based doses** use a 5th element, the PESO spec — then the route `[3]` is mandatory and the posologia contains the literal `{DOSE}` and/or `{FAIXA}` exactly once each. See *Calculadora de peso*.

```js
[ "DIPIRONA 500 MG/ML SOLUÇÃO ORAL (GOTAS)", "01 FRASCO", "DAR {DOSE} VIA ORAL DE 6/6H SE DOR OU FEBRE (25 MG/KG/DOSE)", "USO ORAL",
  {"kg": 25, "conc": 500, "gotas": 20, "un": "GOTAS", "max": 1000} ]
```

## Conventions that are easy to break

- **Adding a condition requires two edits** (both in `data/prescricoes.js`). Add the object to `DATA` *and* add a matching key to `KW` (same `id`). Search — the column filter and the busca única — only works through `KW[id]` (plus `nm` + `sub`); a condition with no `KW` entry is unfindable by keyword. The `id` also becomes the address `#/prescricoes/<id>`, so keep ids lowercase `[a-z0-9_-]` and never rename one that people may have bookmarked. The `KW` value should be a flat lowercase string mixing the display name, lay synonyms, symptom words, and every drug name in the block.
- **Output format mirrors the source PDFs — don't casually change it.** `buildText()` groups selected items by route (`groupByRoute()`), prints the route header, then numbered lines `NN- MED ______ qty` followed by the posologia, then an `ORIENTAÇÕES:` section with `# `-prefixed lines. `pad()` pads each med name with underscores out to the `RX_COL_WIDTH` (46) column, with a `RX_MIN_DASHES` (3) floor. Changing those constants, the `NN- ` numbering, route grouping, or the `# ` prefix changes what clinicians paste into their systems.
- **Dedup key is `(med + "|" + qty + "|" + route).toUpperCase()`** (`keyOf`, route defaults to `ORAL`). The same drug at a *different quantity or route* is treated as a distinct item and will not be deduped — keep that in mind when authoring near-duplicate items.
- **"Edição livre" (free-edit) toggle** stops `syncRx()` from overwriting the `<textarea>`, so manual edits survive. Logic that writes to `#rx` must respect the `freeEdit` flag.

## App logic flow

`renderConds(filter)` (`js/views/prescricoes.js`) builds the left list (filter matches `norm(nm + sub + KW[id])`; only conditions — there is no pinned entry any more) → clicking a condition (or `openCond(id)` from an address / the search) resets `currentPac = "adulto"` and `currentSet = "amb"` and calls `renderMid(c)` → clicking an item / **Adicionar receita** calls `addItem`, and clicking a line in **Recomendações e instruções** calls `addOrient`; they mutate the global `selected[]` / `orientSet[]` (`js/receita.js`) and call `syncRx()` → `syncRx()` re-renders the right-hand chips and regenerates the textarea via `buildText()`. Copy uses `navigator.clipboard` with an `execCommand("copy")` fallback.

## Header tabs, view registry, routing and search

The header tabs, the addresses and the global search all come from **one registry**. Each `js/views/<tab>.js` calls `registerView({...})` once (fields also documented above `registerView` in `js/core.js`):

| Field | Meaning |
|-------|---------|
| `key` | id of the tab: used in the address (`#/key`), in `body[data-view]` and as the tab's `id="tab-<key>"` |
| `label`, `icon` | tab text and emoji |
| `cols` | ids of the `.grid` columns the tab shows (`#col-rx`, the receita, is shown too unless `rx: false`) |
| `rx` | optional: `false` = the tab hides the receita column. `showView` sets `#col-rx` `hidden` and `body[data-rx="off"]` (grid `248px 1fr` / `1fr`); the receita keeps its content, weight and open condition, and comes back on the other tabs |
| `layout` | `"lista"` (narrow column + wide column + receita: `248px 1fr 380px`) or `"texto"` (wide column + receita: `1fr 380px`); matching rules at the 1100px / 820px breakpoints, via `body[data-layout]` |
| `itemId()` | optional: id of the item open now; makes the item part of the address `#/key/<id>` |
| `open(id, how)` | optional: open item `id`, return `false` if it doesn't exist. `how` = `"load"` (address on page load), `"route"` (back/forward or a typed address), `"search"` (busca única) |
| `close()` | optional: back to "nothing open" |
| `search()` | optional: entries for the busca única, `[{id, title, sub?, kw?, text?, ic?}]`, read once on the first search. `kw` is searched but never shown; `text` is searched and the matching line is shown as a snippet |

Registered today, in this order: `prescricoes` (**💊 Prescrições** — formerly the "Padrão" tab; `cols: col-cond, col-mid`, `layout: lista`, `itemId/open/close` = the open condition, `search` = the 64 conditions with `nm` + `sub` + `KW`), `escores` (**📊 Escores**; `cols: col-esc-lista, col-esc`, `layout: lista`, `rx: false`, `itemId/open/close` = the open score, `search` = the 26 scores — see *Escores*), `calculadoras` (**🧮 Calculadoras**; `cols: col-calc-lista, col-calc`, `layout: lista`, `itemId/open/close` = the open calculator, `search` = every calculator and every drug row — see *Calculadoras*) and `rascunho` (**⭐ Meu rascunho**; `cols: col-rascunho`, `layout: texto`, no `itemId` so the address stays `#/rascunho`, `open` = scroll to a card and highlight it, `search` = the 26 cards' `titulo` + `grupo` + `linhas`). Only the header tab was renamed: the **Padrão** section inside a condition (`SECS`) keeps its name.

### Adding a tab (later phases)

1. `data/<tab>.js` — the content, as pretty-printed JSON like `DATA`.
2. `js/views/<tab>.js` — the column markup it needs (add a `<section class="col" id="col-<tab>" hidden>` to `index.html`), its render/copy logic, and one `registerView({...})` at the end. Every piece of content needs a **copy** button that produces plain text.
3. Two `<script>` tags in `index.html` (data before the views, the view before `router.js`; the position among the views is the tab position), with the current `?v=` token — then bump the token.
4. If the tab doesn't need the receita, register it with `rx: false`.

Nothing else: the tab, `#/<tab>/<item>` and the global search follow from the registry. Don't add placeholder / "em breve" tabs.

### Tabs (`js/app.js`)

`renderTabs()` writes one `.top-tab` button (`role="tab"`, `aria-controls` = its `cols`) per view into `#top-tabs`, in registry order, and marks each view column `role="tabpanel"`. `showView(key)` sets `currentView`, `body[data-view]` / `body[data-layout]`, puts `hidden` on the columns of the other views, marks the active tab and scrolls the page to the top. The receita column is shared, and **switching tabs keeps each tab's state** (open condition, mode, weight, receita — nothing is re-rendered).

- The tab bar never wraps: it scrolls horizontally (scrollbar hidden), fades the edge on the side with hidden tabs (`.more-l` / `.more-r`), turns the vertical mouse wheel into horizontal scroll, and keeps the active tab scrolled into view. It was checked with 7 tabs at 1440 / 1024 / 390 / 320 px (`tests/shots.py` registers 5 dummy tabs at runtime). At ≤600px the tabs grow to share the width (`flex:1 0 auto`) while they fit; at ≤360px the tab font drops to 14px. With four tabs the bar scrolls on phones (390/320px): the tabs past the edge are half-visible under the fade (the hint that there is more) and the active tab is always scrolled into view (checked by `features.py`).
- **Layout:** `body` is a flex column — the header has free height and `.grid` is `flex:1; min-height:0`, so the columns fill the rest of the screen. At ≤820px the page scrolls as a whole (`html, body {height:auto}`, `body {display:block}`) so the sticky header stays pinned. The global `[hidden]{display:none !important}` utility rule sits at the top of the CSS.
- **Header at small widths:** the hint ("Modelos de receita prontos…") hides at ≤1180px to make room for the search (the receita disclaimer says the same); at ≤820px the search becomes an icon; at ≤600px the subtitle hides and the logo/title shrink; at ≤360px logo, title (14.5px) and search icon still fit one line on a 320px phone.

### Addresses (`js/router.js`)

- `#/prescricoes`, `#/prescricoes/<conditionId>`, `#/rascunho` — and in general `#/<view>` and, for views with `itemId`/`open`, `#/<view>/<itemId>`.
- **No hash** = default: the first registered view (Prescrições) with nothing open; the URL is left without a hash. **Invalid hash** (unknown view or item, bad format, bad `%`-escape) = the default, and the hash is corrected in place with `location.replace` (no history entry).
- **User actions push a history entry:** clicking a tab (`navigate`), opening a condition in the list (`routeChanged()` in `condBtn`), choosing a search result (`goTo`). Back/forward retrace them (`hashchange` → `onRoute("route")`); going back to the no-hash entry closes the condition (`close()`). Re-applying a state that is already shown is a no-op, so the `hashchange` that follows our own hash write does nothing.
- Uses only `location.hash` / `location.replace` (no `pushState`), so it works over `file://`.
- Opening a condition from the address on load or from the search **reveals** it (`revealCond`): on phones the page scrolls to the middle column; on desktop only the condition list scrolls to the active row. Back/forward don't scroll.

### Global search — busca única (`js/busca.js`)

- One field in the header (`#busca-input`, ARIA combobox + `#busca-list` listbox with one `role="group"` per view, `aria-activedescendant`, live status). Shortcuts: `/` (when not typing in a field) and Ctrl/Cmd+K. Keyboard: ↑ ↓ (wrap), Enter opens, Esc closes the list (a second Esc clears and leaves). Clicking outside closes.
- Matching: `norm()` on both sides (case- and accent-insensitive: "infeccao" finds "infecção"); every typed word must appear in `title + sub + kw + text`. Order inside a group: title starts with the first word → every word starts a word of the title → title contains every word → title/subtitle → elsewhere; ties keep registry order. Matches are highlighted with `<mark>`. Groups follow registry order and show the view name and count. Empty query shows which sections are searched; no match shows "Nada encontrado para …".
- Choosing: `goTo(view, id, "search")` — views with `itemId` get `#/<view>/<id>` (Prescrições opens the condition as a click in the list would: Adulto › Ambulatorial); others get `#/<view>` plus `open(id)` (Meu rascunho scrolls to the card and highlights its title, nota and lines for ~2.4s via `.hl`).
- **Phones (≤820px):** the field collapses into a search icon (`#busca-abrir`) at the right of the title row; opening it lays the field over the title row (with a ✕ to close) and the results under it, full width. Esc / ✕ / choosing collapses it again.
- The **Buscar condição** filter in the left column is separate (it only filters that list) but uses the same `norm()`, so it is accent-insensitive too (every query that matched before still matches — checked by `tests/parity.py`).
- New UI text uses `--muted-aa` (#56707b, ≥ 4.5:1 on white and on `--accent-soft`) instead of `--muted`.

## Escores (`data/escores.js`, `js/views/escores.js`)

Ported from the owner's other site, **Ficha Vermelha** (fichavermelha.pages.dev, no repository: the published site was the source). **The clinical content is the owner's, already published, and must stay identical to Ficha Vermelha**: items, points, bands, labels, interpretation, conduta, notes, references and the text copied to the prontuário. If something needs adapting, adapt `js/views/escores.js`, never the data or the engine blocks. `tests/escores_golden.py` (always) and `tests/escores_parity.py` (with `--fv`) enforce it.

- **Data model** (`window.ESCORES`, unquoted JS object literals as in the original — keep that style there): `{slug, name, title, cat, kicker, size, what, seo, kind, range?, featured?, rank?, items, bands, alt?, note, ref, anyRule?}`. `kind` = `"sum"` (12 scores) | `"rule"` (9) | `"glasgow"` | `"news2"` | `"addrs"` | `"parkland"`. Items: `{id, type: "check"|"choice"|"group"|"num", t (label), h? (hint), s (short form for the one-line text), pts? (check), opts?: [{l, p, central?, kid?, elec?}], def? (default option), optional?, noPts?, showIf?: {id: value}, risk?, grp?, unit?, ph?, min?, max?}`. Bands: `{upTo (inclusive upper limit; Infinity on the last), r (range as shown), label, level 0–4 (colour, FV.LEVELS), text (conduta)}`; `rule`/`news2` bands use `key` instead of `upTo`. `alt` = second band model shown as a hint (Wells). Several rules have slug-specific logic inside `FV.evaluate` (hints, regra-canadense, perc, ottawa, nexus/sao-francisco/`anyRule`, canadense-cervical, pecarn). `window.GUIAS[slug] = {rows: [[resultado, o que significa, o que fazer]], obs?}` is the table at the end of each score.
- **NIHSS** is not in `ESCORES` (a special page in the original): content in `data/nihss.js` (`NIHSS`), logic in `js/escores-nihss.js` (`NIHSSM`), plus **Entrada rápida** (one digit per item, 1a → 11; that is Ficha Vermelha's "feito para o teclado"), moments (Admissão / Pós-trombólise / 24 h / Alta) and three formats (Lista / Descritivo / Uma linha).
- **Addresses** `#/escores/<slug>` with Ficha Vermelha's slugs (plus `nihss`). **Search**: every score goes into the busca única (`name`, `kicker` as subtitle; `title`, `cat`, `what`, `size`, slug words, subscripts as digits — "cha2ds2" — and Ficha Vermelha's alias list `ESC_ALIAS`, e.g. "avc", "tep", "fa", as keywords). The left list filter uses the same words.
- **Layout**: left = list (filter; **Mais usados** = NIHSS + `featured` by `rank`, as in the original; then the others grouped by `cat`, categories alphabetical). Middle = calculator: kicker / title / `what`, **Imprimir ficha em branco**, the items (`[data-item]` rows with `button[data-val]` / `input[data-num]`, same markup contract as the original — the parity driver relies on it), the note; on the right (≥ 760px of column, sticky) the result card — value, band chip in the level colour, **Copiar para o prontuário** right under them, then the conduta text and extra line — then **Para o prontuário** (NIHSS: Momento; a collapsed *Opções do texto* disclosure whose summary shows the current choice, e.g. "Lista · Normal", holding Formato and Letras; the preview, scrolling inside; Zerar tudo) and Interpretação; then the GUIAS table, `Fonte:` and the disclaimer "Ferramenta de apoio à decisão. Não substitui o julgamento clínico." **Hospital desktops are the target:** at 1366×768, 1280×720, 1024×768 and 1440×900 the value, band and Copiar must be on screen right after opening any score and after answering it (`tests/escores_layout.py`). The sticky panel never exceeds the visible area: on desktop `#esc-body` is a size container and `.esc-side` has `max-height: calc(100cqh - 12px)` with its own scroll. Phones: list, then the calculator (opening a score scrolls to it), and a fixed bottom bar `#esc-bar` with value, band and **Copiar**.
- **Behaviour kept from the original**: clicking the marked option again unmarks it (except items with `def`); incomplete scores show "Responda todos os itens" / "Faltam: …"; the copied text is `comCaixa(FV.buildText(def, v, fmt))` (NIHSS: `NIHSSM.buildText()`, nothing copied with no item marked). Format and letters are kept **in memory only** (the original used localStorage; this site stores nothing).
- **Keyboard**: a score opened from the busca única or with Enter in the list starts with the focus on the first item (NIHSS: on Entrada rápida); ← → move between the options of an item; choosing an option with the keyboard (Enter/Space) moves the focus to the next item, and after the last one to **Copiar para o prontuário**; Enter in a number field moves on too.
- **Print**: **Imprimir ficha em branco** fills `#ficha` (generic: `FV.fichaHTML(def, v, true)`; NIHSS: the `#tpl-ficha-nihss` template + `NIHSSM.renderFicha(true)`, images set from `data-src` and awaited with `whenFigs`), adds `body.imprimindo` and calls `window.print()`; `afterprint` cleans up. The print CSS only applies while `body.imprimindo`, so Ctrl+P elsewhere prints the page as before. The brand line of the forms reads "Queixa Principal" (replaced in the view, not in the engine). The print **kit** page was not ported.
- **Adding a score**: append its object to `ESCORES` (and its `GUIAS` entry) **in Ficha Vermelha first** and copy the new `assets/escores-data.js` over `data/escores.js` unchanged; new kinds or slug-specific rules need the matching engine version (copy the new `assets/escore.js` block into `js/escores-motor.js` between the marks). Add aliases to `ESC_ALIAS` if useful. Then run `python3 tests/run.py --fv <local copy of the site> --write-fixtures` to refreeze the golden results, review the fixture diff, and bump `?v=`.

## Prescription modes & sections

Top-to-bottom, the middle column of a condition is: **title** (`h3` + `.desc`) → **tabs `🧑 Adulto | 👶 Pediátrico`** (`.pac-tabs`, the option) → **`🏠 Ambulatorial | 🏥 Internação`** (`.set-box`, the sub-option inside the tab) → (weight box, when applicable) → **sections**. All of that header lives in `.mid-head`. There are no other per-condition tabs: the clinician's templates live only in the **Meu rascunho** header tab.

`renderMid` state: globals in `js/views/prescricoes.js` — `currentPac` (`"adulto" | "ped"`; `PACS` holds labels/icons) and `currentSet` (`"amb" | "internacao"`; `SETS`). The active `"mode"` is `MODE_OF[currentPac][currentSet]`; `modeOf(b)` is `b.mode || "amb"`.

- **Tabs (patient).** `.pac-tab` buttons — large, tinted and underlined when active — each show the total block count for that patient (both settings). Switching the patient **keeps the sub-option** (Adulto › Internação → Pediátrico › Internação).
- **Sub-option (setting).** `.set-btn` buttons in a segmented control (tinted track, active one **filled** with the patient colour, white text) show the count for the *current* patient.
- **Colour = patient.** CSS custom properties `--pc` / `--pc-d` / `--pc-soft` / `--pc-track` are set per patient: **Adulto = the site teal** (`--accent`), **Pediátrico = rose** (`#c2255c`). `renderMid` adds `pac-adulto` / `pac-ped` to `.mid-head`, so the sub-option follows the open tab; each `.pac-tab[data-pac]` carries its own colour for hover/active. Text on these colours meets WCAG AA (≥ 4.5:1) — keep that if you change them. The weight box stays blue in both. Both controls re-render the condition and put focus back on the clicked button. Opening a different condition resets to **Adulto › Ambulatorial**.
- A combination with no blocks renders a `.mode-empty` placeholder ("Sem prescrição pediátrico · ambulatorial…"); its tab/button is dimmed via `.empty` but stays clickable.
- **Responsive sizing** uses a **container query** on `#col-mid` (`container: mid / inline-size`), because the middle column's width doesn't track the viewport (it is narrow both on phones and on ~900–1200px screens): tabs 17px / sub-option 15.5px; under 560px 16 / 15px; under 400px 15 / 14px; under 340px the tab font drops to 14px and the sub-option icons (`.si`) hide, so everything fits a 320px phone.
- **Block indices must stay stable.** `data-b` carries the block's *original* index into `c.blocks`; `renderMid` filters with `c.blocks.map((b,bi)=>({b,bi})).filter(...)` so the index survives filtering. The `addall`/item handlers do `c.blocks[+dataset.b]`, so never renumber.
- **Sections (`SECS`)** — below the mode selector, three stacked, collapsible `.sec` sections, always in this order: **Padrão** (blocks with `sec` absent/`"padrao"`, starts **open**), **Outras opções** (`"sec": "offlabel"` blocks) and **Recomendações e instruções** (the deduped `orient` lines; lines that only come from Outras opções are listed under a "Das outras opções" sub-heading). Padrão and Recomendações e instruções start **open**; only Outras opções starts collapsed. Each `.sec-head` shows a count; an empty section is dimmed (`.none`) and shows a `.sec-empty` placeholder when opened. Choosing a condition, patient or setting re-renders, so the sections go back to that default. The clinician's templates are **not** a section — they are the Meu rascunho header tab.
- **Block header layout:** with the middle column ≥ 560px, title, tags and **Adicionar receita** sit on one line. Narrower (phones, ~900–1200px screens), a container query wraps `.block-head`: the title (`.bl-toggle`) takes the whole first line and the tags + button drop to a second line (button right-aligned), so long labels are never squeezed or covered by the `rascunho` tag.
- **Collapsible blocks:** each `.block-head` has a `.bl-toggle` button (chevron + label) that toggles `.block.collapsed` (CSS hides `.items`). Blocks start expanded. The whole-block **Adicionar receita** button works even while collapsed.
- Block markup comes from `blockHTML()`, which closes both `.items` and `.block`. The earlier code left `.block` open, so blocks rendered nested — don't reintroduce that.
- `bindBlocks()` wires the section/block toggles of the middle column.

## Calculadora de peso

- PESO spec fields (5th element of an Item): `kg` (amount per kg **per dose**, in the drug unit) **or** `kgdia` + `vezes` (per kg per day ÷ doses/day) **or** `fixo` (fixed amount); `max` (cap per dose, in the drug unit — always set it with `kg`/`kgdia`); `conc` (drug unit per mL of the presentation; omit when the output is the drug unit itself, e.g. EV dose in MG or fluids in ML); `un` (`"ML" | "GOTAS" | "MG" | "MCG" | "UI"`, printed in place of `{DOSE}`); `gotas` (drops per mL, required for `"GOTAS"`).
- `doseTxt(spec)` computes from the global `peso` (`js/peso.js`): amount = min(kg × peso, max) (or `fixo`); ML = amount ÷ conc (2 decimals under 1 mL, else 1); GOTAS = round(amount ÷ conc × gotas); without `conc` the amount itself. Capped doses get "(DOSE MÁXIMA)". With no weight (or no dose for that weight) it prints `__ ML` / `__ GOTAS`.

### Weight bands — show only the band that applies

Many posologias used to list a table of weight bands ("ATÉ 10 KG …; DE 10 A 20 KG …; ACIMA DE 20 KG …"). With a weight typed, the site now shows **only the band for that weight**, with the arithmetic done; with no weight it shows the table exactly as before. Three mechanisms, all using the same range object `{de: ≥, acima: >, ate: ≤, menor: <}` (any subset; `fits(r)` is true when every given bound holds, and always true with no weight):

1. **Band table inside one posologia** — the table part of the posologia is replaced by the literal `{FAIXA}`, and the spec gets:
   - `"sem_peso"`: the **exact original text** of that part (no weight → the posologia reads exactly as before; keep this invariant),
   - `"faixas"`: `[{<range>, "txt": "...", "dose"?: {...}}, ...]` — first band whose range fits wins; `txt` replaces `{FAIXA}`; inside `txt`, `{=expr}` is arithmetic with `P` = weight in kg (only numbers, `P`, `+ - * / ( )`, `min`, `max`; results ≥ 10 are rounded to integers, smaller ones get 1 decimal), e.g. `"{=P*100} ML (100 ML/KG)"`, `"{=min(1500+20*(P-20),2000)} ML"`. A band's `dose` overrides the dose fields for `{DOSE}` (e.g. zidovudina 12 mg/kg for 4–9 kg, 9 mg/kg for 9–30 kg, `fixo` 300 mg from 30 kg). A weight outside every band falls back to `sem_peso` (and `__` for the dose) — never guess a band. Bands must not overlap.
   - Used in 23 items (2026-11): pediatric SRO/dengue, maintenance EV fluids (diarreia plano C, queimaduras — Holliday-Segar), zidovudina, dolutegravir, nebulized salbutamol, benzatina, loratadina (5 conditions), ondansetrona, ivermectina (escabiose, parasitoses), terbinafina (2); adult SG 4:1, ivermectina, cefazolina (3) and ceftriaxona dose by weight.
2. **One option per band in an "escolha 1" menu** — the item's spec has `"peso": {<range>}` (no dose fields needed; the route `[3]` is then mandatory). Out-of-range options are hidden when a weight is typed (oseltamivir 15/23/40 kg, benzatina 27 kg). Age-defined options (e.g. oseltamivir for < 1 year) have no `peso` and always show.
3. **Whole block for one band** — the block gets `"peso": {<range>}` right after `"label"` (the range is also written in the label): PEP-HIV < 35 / ≥ 35 kg, IST profilaxia < 45 kg, triptano ≥ 40 kg, codeína ≥ 40 kg, ivermectina ≥ 15 kg. Hidden when the typed weight is outside.

Rendering: `posHTML()` turns `{DOSE}` into `<b class="dose">` and `{FAIXA}` into `<span class="faixa">` (highlighted `.on` when a band applies); `fillDose()` resolves both for the receita text, at build time, so changing the weight updates items already in the receita. `applyPeso()` (called by `renderMid` and on every weight keystroke via `refreshDoses()`, no re-render so focus stays) updates doses and bands, toggles `hidden` on `.item[data-pf]` / `.block[data-pb]`, and fills each section's `.faixa-nota` ("Mostrando só o que vale para N kg — X opções de outra faixa de peso ocultas"). **Adicionar receita** skips out-of-range options; a receita chip whose option no longer fits the weight gets a red "⚠ fora da faixa do peso digitado".

- The weight box (`.peso-box`, `#peso`) shows on the **Pediátrico** tab (both sub-options, labelled "Peso da criança"), and on Adulto whenever a shown block has `peso` or an item has a spec ("Peso do paciente"). The weight persists across conditions/tabs and is cleared by **Limpar**. When any selected item has a spec and a weight is set, the receita starts with `PESO: N KG`.
- Single **eligibility** thresholds inside a posologia ("NÃO USAR COM MENOS DE 5 KG", "ACIMA DE 10 ANOS OU MAIS DE 30 KG") are not bands and stay as text; so does the diurese target line in the queimaduras orientations.

## Calculadoras (`#/calculadoras`)

Port of the owner's **dilui** shift calculator (infusion pumps, RSI doses, pediatric and adult emergency bolus doses), redesigned around what the doctor is looking for. Content and math are dilui's, unchanged; only the experience is new.

- **Content is frozen.** `data/calculadoras.js` is generated by a script from dilui's `index.html` (the region from the `DILUI — banco de drogas` comment to the `];` closing `EMG`), wrapped in `const CALC_DADOS = (() => { … return {INF, IOT, PED, EMG, RODAPE}; })();` so the dilui names don't become globals. Don't reformat or "fix" doses there: list suspected problems for the owner instead. All of it is AI-drafted: every calculator header shows the `rascunho` tag (same meaning as `"draft": true`), and dilui's disclaimer/references (`RODAPE`) close every page.
- **Math is frozen.** The top of `js/calc-motor.js` is dilui's code copied unchanged (`num`, `fIn`, `fmt`, `fAuto`, `fML`, `fRate`, `concOf`, `rateOf`, `doseOf`, `perUnit`, `concLabel`, `dilOptions`, `bolus`, `byAge`, `rangeStr`, `CALC`, `viaPed`, `lma`, `pesoEst`, `pasMin`, `idadeTxt`, `isPed`, `rxText`, `kitText`), inside `CM = (() => {…})()` because dilui's `num`/`esc`/`$` differ from the site's. The bottom part turns dilui's HTML-building code into data with the same strings: `CM.linha(it, kg, age, ped)` → `{tipo: "fixo"|"bolus"|"calc"|"semPeso", main, small, sub, caps, nota, copy}`; `CM.infusao("dose"|"rate", rate)` → concentration, mL/h, the support line (dose/min, drops, duration), the alert (`msg`, `red`, `nivel`), `rx` (dilui's prescription text) and the titration table. State lives in `CM.S` (dilui's `S`).
- **Pages** (`CX_PAGS`): the 18 infusions (`#/calculadoras/<dilui id>`, e.g. `nora`), `iot`, one page per `EMG` section (`emg-<slug>`) and per `PED` section (`ped-<slug>`); slugs in `CX_SLUG`. A row inside a page is `<page>.<index>` (`emg-arritmias.1`, `iot.ind0`): the busca única lists every drug row, and opening one highlights the row (`.hl`, ~2.4 s); the address then shows the page.
- **Weight = the global `peso`** (`js/peso.js`), starts empty. Typing it here updates `peso`, the Prescrições field and the receita (`refreshDoses()`); a `document` `input` listener picks up changes typed in Prescrições, and a second listener on `#btn-clear` resets weight, age and height/sex (no edits to core/peso/receita). With no weight nothing is computed from an assumed weight: infusion rate is disabled, step ③ shows a prompt, weight-based rows show the per-kg dose and "falta o peso" with no copy button. One-click chips (50–100 kg) and, for children, "Usar N kg" from the age (APLS formula shown) are explicit and label the weight "peso estimado" until a weight is typed.
- **Infusion page**: ① Preparo (preset chips, the recipe sentence, concentration; "Mudar ampolas…" opens amps/diluent/diluent type/ampoule-of-your-hospital fields), ② Dose ⇄ vazão (either input drives the other; −/+ step through dilui's `passos`; scale with `faixa` and `max`, marker amber outside the usual range and red above max; dilui's alert texts), ③ Texto pronto (**Copiar** and **＋ Receita** = `sendToRx`). The page is dense on purpose: with a weight, ② (both inputs, with the unit beside each number, and the range bar) and ③ (text + buttons) fit without scrolling at 1366×768, 1280×720, 1024×768 and 1440×900 — nothing is pinned over the inputs (checked by `layout()` in `tests/calc_features.py`). Keep it that way when adding content above step ③. Enter in the dose or rate field copies. Then the titration table (rows clickable) and dilui's notes.
- **Situation pages / intubation**: rows in dilui's order, dose in large type, per-row Copiar / ＋ Receita (icons on narrow columns, with aria-labels). "Copiar tudo" only where the page is a sequence (`CX_TUDO`); intubation has "Copiar kit SRI" = dilui's `kitText()`. Cross-links between calculators: `CX_LINK_PAG`, `CX_LINK_LINHA`, `CX_POS_IOT`.
- **Tests**: `tests/calc_paridade.py` compares the site with `tests/calc_gabarito.json.gz` (outputs of the original dilui for ~10 400 cases: every infusion × preset × weight × dose/rate, custom ampoule/diluent cases, every bolus row × weight × age, RSI kit, pediatric helpers, tidal volume). Rows are compared as the site renders them (`cxLinhaHTML`). To regenerate after an approved content change: `python3 tests/calc_paridade.py --dilui path/to/dilui/index.html`. `tests/calc_features.py` covers the behaviour (no-weight state on all 35 pages, ②/③ visible and unobstructed on the four hospital monitor sizes, weight sync, chips, age estimate, addresses, search, Copiar / ＋ Receita, keyboard, alerts, phone widths) and, with `--shots`, the screenshots.

## Meu rascunho (`MINHA`)

`MINHA` is a pretty-printed JSON array of cards: `{"titulo", "grupo", "conds": [DATA ids], "linhas": [one string per line], "nota"?}`.

- The text is the clinician's own, kept **as they wrote it** (their spacing, dashes, abbreviations and typos) — don't reformat it into `Item` tuples or "fix" it; it is copied verbatim. Only trailing spaces and leading/trailing blank lines are trimmed.
- Shown as **Meu rascunho** (it was called "Minha prescrição" before; the data name `MINHA` was kept). It is **one continuous text, not split by condition**: `renderRascunho()` (run once at start-up) fills `#rasc-doc` with every card in file order, grouped by `grupo` — a `.rg` group heading, then each card's `.rt` title, optional `.rn` nota and its `.rl` lines (monospace, `pre-wrap`). No per-card cards or buttons. Each of those three elements carries `data-card="<index in MINHA>"`, which the busca única uses to scroll to a card and highlight it (`openCard`); it doesn't change the copied or selected text.
- The cards' `"conds"` field is **no longer used by the UI** (cards used to be listed per condition). It is kept in the data; leave it as is.
- **📋 Copiar tudo** copies `rascText()`: each group name in uppercase, then each card as `titulo` + its lines, with a blank line between pieces (copied via `copyText`, clipboard API with a hidden-textarea fallback).
- **＋ Receita** (`sendToRx`) appends **only the selected passage** of the text (`rascSelection()`, which must be inside `#rasc-doc`) to the receita textarea and switches on **edição livre**, so it is not overwritten. The selection is captured on `pointerdown` too, because on phones the tap can clear it before `click`. With nothing selected it shows a warning toast and leaves the receita alone.
- `"nota"` marks a card that was adapted from what the clinician pasted (shown as a small italic `.rn` line under its title, not included in **Copiar tudo**). The "Evolução diária — sala de emergência" card is the structure of a real evolution note with **all patient data removed** — never put identifiable patient data in this public file.

## Tests

Dev-only (the site never loads them). Requires Python 3, Playwright (`pip install playwright`; no browser download needed) and Chrome at `/usr/bin/google-chrome` (or `CHROME=/path`). No npm.

```sh
python3 tests/run.py                  # everything, compared against main (about 2 minutes)
python3 tests/run.py --ref <git-ref>  # compare against another ref (e.g. origin/main, HEAD~1)
python3 tests/run.py --quick          # parity on 3 conditions instead of 64
python3 tests/run.py --shots DIR      # also save screenshots (1440, 1366, 1280, 1024, 390, 320 px) into DIR
python3 tests/run.py --fv DIR         # also compare Escores with a local copy of fichavermelha.pages.dev (~3 min more)
python3 tests/run.py --fv DIR --write-fixtures   # ... and refreeze tests/fixtures/escores.json from the original
```

- `parity.py` exports the ref with `git archive` and drives **old and new pages in headless Chrome, over `file://` and over `http.server`**, only through the DOM: (1) `DATA`/`KW`/`MINHA` source text (sha256 of the region from `const DATA = [` to the end of `KW`, and of `MINHA`) and parsed values must be identical; (2) for every condition × Adulto/Pediátrico × Ambulatorial/Internação × weight {none, 8, 20, 40, 70 kg} it clicks every **Adicionar receita**, every "escolha 1" option, every item, **Adicionar todas** and every orientation line, then changes the weight (15, 2,5, empty) and removes a chip, comparing the receita textarea and the chips after each step, plus the middle-column HTML; (3) Meu rascunho: rendered text, **Copiar tudo**, **＋ Receita** with several selections (inside a card, across cards, everything, nothing, outside the text), **Copiar**; (4) the left-column filter for ~970 queries: every query that matched before must still match. Any console error/warning, page error, failed or external request fails the run. When the data is meant to change, parity against `main` will (correctly) fail on the data check — review the diff instead.
- `features.py`: routing (each address form, 10 invalid hashes, clicks + back/forward, typed address, state kept across tab switches) and search (ARIA wiring, `/`, Ctrl/Cmd+K, accent-insensitive results checked against an independent count, keyboard navigation, Enter/click opening a condition, opening a rascunho card, empty state, phone layout).
- `shots.py` (with `--shots`): screenshots of Prescrições with a condition open, Meu rascunho, the search with results, Escores (list, HEART, a rule, NIHSS, NEWS2, search with score results) and the 7-tab proof (dummy tabs registered at runtime, skipping those that already exist, up to 7); also asserts the tab bar stays one row with no clipped labels and no page-level horizontal scroll.
- `escores_golden.py` (always, `file://` and `http://`): replays the 1,982 cases frozen in `tests/fixtures/escores.json` (25 scores + NIHSS: nothing / everything / each item and option alone / numeric edges / band limits / seeded random; NIHSS also every quick-entry case) on the Escores tab and compares value, band label and colour, conduta text, extra line, highlighted band, hidden items, pressed buttons, preview in Lista, Uma linha, MAIÚSCULAS and minúsculas, and the copied text (NIHSS: 4 moments × 3 formats + upper case, answered count, quick-entry value and warning).
- `escores_parity.py` (with `--fv DIR`, a local copy of fichavermelha.pages.dev with every `/<slug>/index.html`): byte equality of `data/escores.js`, the engine and NIHSS blocks and the images; parsed `ESCORES`/`GUIAS` deep-equal keeping `Infinity`; then the same driver on the original pages and on the tab for ~6,000 combinations (the fixture cases plus "every option over a full answer", more band-limit cases and 120 random per score). `--write-fixtures` refreezes the fixtures from the original (only when everything matched).
- `features.py` also covers Escores: tab order, list grouping, receita hidden on Escores and back with its content on Prescrições, addresses (`#/escores/<slug>`, invalid slug, back), the keyboard flow (search → Enter → arrows/Enter through HEART → Copiar), NIHSS quick entry, score search ("nihss", "wells", "avc", "tep", "cha2ds2", "pneumonia"), the blank forms (print stubbed) and the 320px tab bar / result bar.
- `escores_layout.py` (always): for all 26 scores at 1366×768, 1280×720, 1024×768 and 1440×900, right after opening and after answering every item with real clicks: value, band and Copiar fully inside the visible area, `elementFromPoint` at the button's centre is the button, the sticky panel no taller than the visible area and covering no answer button.
- `integracao.py` (always, `file://` and `http://`): the tabs together — receita hidden on Escores and back with its content on Calculadoras; a weight typed in Prescrições or Calculadoras survives a visit to Escores and reaches the other tab; **Limpar** clears receita and weight everywhere; busca única groups in tab order, landing on a score and on a highlighted drug row inside a calculator; 4-tab bar at 390/320px (one row, no clipping, active tab in view). With `--shots`, `shots.abas()` saves one screenshot per tab with something open plus two multi-group searches.
- `parity.py` treats `KW` as append-only (phase 2 appended name synonyms to 34 entries): every old value must be a prefix of the new one; `DATA` and `MINHA` must stay byte-identical.
