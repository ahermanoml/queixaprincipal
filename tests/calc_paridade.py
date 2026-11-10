"""Calculadoras: as contas e os textos têm de bater com o dilui, número por número.

Dois usos:
  python3 tests/calc_paridade.py --dilui CAMINHO/dilui/index.html   # (re)gera tests/calc_gabarito.json a partir do dilui
                                                                    # original e compara o site com ele na hora
  run(browser, url)  (chamado por tests/run.py)                     # compara o site com o gabarito já gravado

O gabarito guarda, para cada caso (droga × diluição × peso × dose/vazão; linha de dose × peso × idade; kit SRI; peso
estimado/PAS/tubo; volume corrente), o que o dilui mostrou: concentração, mL/h, linha de apoio (mcg/min, gotas, duração),
alertas, texto da prescrição, tabela de titulação, dose/volume de cada linha e o texto que cada botão copia.
Do lado do site, as linhas são desenhadas pela própria função da tela (cxLinhaHTML) e lidas do HTML — então o teste
confere o que aparece na tela, não só a conta. Diferença zero exigida."""
import argparse, gzip, json, os, sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from lib import REPO, Page, Report, browser, file_url

GABARITO = os.path.join(REPO, "tests", "calc_gabarito.json.gz")
PESOS = [None, 3, 10, 20, 40, 60, 70, 90, 120]
IDADES = [None, 2 / 12, 1, 4, 8, 13, 40, 80]          # anos (2 meses = 2/12)
RATES = ["0,5", "1", "5", "10", "33,3", "100", "200"]   # vazões digitadas (mL/h), sentido inverso

# ---------------------------------------------------------------- casos (gerados a partir das tabelas, lidas na página)
def casos(tab):
    """tab = {INF: [{id, pre, passos, faixa, max, ini, reg, dil}], PED: [n linhas], EMG: [...], IOT: {g: n}}"""
    inf = []
    for D in tab["INF"]:
        doses = sorted(set(D["passos"] + D["faixa"] + ([D["max"]] if D["max"] is not None else []) + [D["ini"]]))
        for kg in PESOS:
            for pre in range(len(D["pre"])):
                for d in doses:
                    inf.append({"drug": D["id"], "pre": pre, "kg": kg, "dose": d})
                for r in RATES:
                    inf.append({"drug": D["id"], "pre": pre, "kg": kg, "rate": r})
            for reg in range(D["nreg"]):
                inf.append({"drug": D["id"], "kg": kg, "reg": reg})
                inf.append({"drug": D["id"], "kg": kg, "reg": reg, "rate": "10"})
        # ampola diferente, ampolas/diluente editados, outro diluente, puro, campo inválido
        custom = [{"Q": D["q2"]}, {"Ml": D["ml2"]}, {"Q": D["q2"], "Ml": D["ml2"]}, {"A": "2,5"}, {"A": "1", "D": "100"},
                  {"D": "0"}, {"A": ""}, {"D": "1.000"}, {"A": "3", "D": "47,5"}]
        if len(D["dils"]) > 1:
            custom.append({"dil": D["dils"][1]})
            custom.append({"dil": D["dils"][1], "A": "2", "D": "48"})
        for kg in [None, 3, 70, 120]:
            for cu in custom:
                inf.append({"drug": D["id"], "kg": kg, "custom": cu, "dose": D["ini"]})
                inf.append({"drug": D["id"], "kg": kg, "custom": cu, "rate": "12,5"})
    linhas = []
    for src, secs in (("PED", tab["PED"]), ("EMG", tab["EMG"])):
        idades = IDADES if src == "PED" else [None, 40, 74.9, 75, 80]
        for s, n in enumerate(secs):
            for i in range(n):
                for kg in PESOS:
                    for age in idades:
                        linhas.append({"src": src, "s": s, "i": i, "kg": kg, "age": age})
    for g, n in tab["IOT"].items():
        for i in range(n):
            for kg in PESOS:
                for age in IDADES:
                    linhas.append({"src": "IOT", "g": g, "i": i, "kg": kg, "age": age})
    kit = [{"kg": kg, "age": age} for kg in PESOS for age in IDADES]
    ped = [{"age": m / 12} for m in range(0, 25)] + [{"age": y + f} for y in range(2, 16) for f in (0, 0.5)] + [{"age": None}]
    lma = [{"kg": k} for k in [1, 2.5, 4.9, 5, 9.9, 10, 19.9, 20, 29.9, 30, 49.9, 50, 69.9, 70, 100, 100.1, 130]]
    vent = [{"altura": h, "sexo": s} for h in [140, 152.4, 160, 170, 185, 200, None] for s in ("M", "F")]
    return {"inf": inf, "linhas": linhas, "kit": kit, "ped": ped, "lma": lma, "vent": vent}


TAB_JS = """(o) => ({
  INF: o.INF.map(D => ({id: D.id, pre: D.pre, passos: D.passos, faixa: D.faixa, max: D.max ?? null, ini: D.ini,
                        nreg: D.reg ? D.reg.length : 0, dils: o.dil(D),
                        q2: String(D.amp.q * 2).replace('.', ','), ml2: String(D.amp.ml + 1).replace('.', ',')})),
  PED: o.PED.map(s => s.itens.length), EMG: o.EMG.map(s => s.itens.length),
  IOT: Object.fromEntries(Object.entries(o.IOT).map(([g, l]) => [g, l.length]))
})"""

# leitura de uma linha desenhada (o mesmo para os dois lados; só os seletores mudam)
PARSE_JS = """
function parseLinha(html, sel, copy){
  const d = document.createElement('div'); d.innerHTML = html; const r = d.firstElementChild;
  const q = s => r.querySelector(s);
  const nmEl = q('.nm'), dz = q('.dz'), sm = dz && dz.querySelector('small');
  const rec = { nm: nmEl.childNodes[0].textContent, via: (q(sel.via) || {textContent: ''}).textContent,
    main: dz ? (dz.textContent.slice(0, dz.textContent.length - (sm ? sm.textContent.length : 0))).trim() : '',
    small: sm ? sm.textContent : '', copy: copy,
    subs: [...r.querySelectorAll('.sub')].map(e => e.textContent), fx: [...r.querySelectorAll('.fx')].map(e => e.textContent),
    caps: [...r.querySelectorAll('.cap')].map(e => e.textContent), info: (q('.info') || {innerHTML: ''}).innerHTML };
  return rec;
}
"""

# ---------------------------------------------------------------- lado dilui (o original)
DILUI_JS = "(C) => {\n" + PARSE_JS + """
  const setIn = (sel, v) => { const el = document.querySelector(sel); el.value = v; el.dispatchEvent(new Event('input')); };
  const res = {inf: [], linhas: [], kit: [], ped: [], lma: [], vent: []};
  for (const c of C.inf){
    S.kg = c.kg == null ? NaN : c.kg; S.age = null;
    selectDrug(c.drug);
    if (c.pre != null) document.querySelector(`#calc [data-pre="${c.pre}"]`).click();
    if (c.reg != null) document.querySelector(`#calc [data-reg="${c.reg}"]`).click();
    if (c.custom) for (const [k, v] of Object.entries(c.custom)){
      if (k === 'dil'){ const s = document.querySelector('#iDil'); s.value = v; s.dispatchEvent(new Event('change')); }
      else setIn('#i' + k, v);
    }
    if (c.dose != null){ S.dose = c.dose; updateCalc('dose'); }
    if (c.rate != null) setIn('#iRate', c.rate);
    const w = document.querySelector('#oWarn');
    const trs = [...document.querySelectorAll('#oTT tr')];
    res.inf.push({ tot: $('#oTot').textContent, conc: $('#oConc').textContent,
      dose: (c.rate != null || (c.reg != null && c.dose == null)) ? $('#iDose').value : null,
      rate: c.rate == null ? $('#iRate').value : null,
      meta: $('#oMeta').textContent, warn: w.hidden ? '' : w.textContent, red: w.classList.contains('red'),
      rx: $('#oRx').textContent, tt: trs.map(tr => [...tr.children].map(td => td.textContent)), on: trs.findIndex(tr => tr.classList.contains('on')) });
  }
  for (const c of C.linhas){
    const kg = c.kg == null ? NaN : c.kg, age = c.age;
    const it = c.src === 'PED' ? PED[c.s].itens[c.i] : c.src === 'EMG' ? EMG[c.s].itens[c.i] : IOT[c.g][c.i];
    const ped = c.src === 'PED' ? true : c.src === 'EMG' ? false : (age != null && age < 14);
    const html = rowBolus(it, kg, age, ped);
    const d = document.createElement('div'); d.innerHTML = html; const cp = d.querySelector('.cp');
    const rec = parseLinha(html, {via: '.via'}, cp ? cp.dataset.copy : null);
    rec.calc = !!it.calc;
    if (!cp){ rec.semPeso = true; rec.perKg = (rec.subs[0] || '').replace(/( · )?informe o peso$/, ''); }
    res.linhas.push(rec);
  }
  for (const c of C.kit){ S.kg = c.kg == null ? NaN : c.kg; S.age = c.age; res.kit.push(kitText()); }
  for (const c of C.ped) res.ped.push({est: pesoEst(c.age), pas: pasMin(c.age), via: viaPed(c.age), idade: idadeTxt(c.age)});
  for (const c of C.lma) res.lma.push(lma(c.kg));
  S.age = null;
  for (const c of C.vent){
    S.altura = c.altura == null ? NaN : c.altura; S.sexo = c.sexo; renderIOT();
    res.vent.push(document.querySelector('#vcOut').textContent);
  }
  return res;
}"""

# ---------------------------------------------------------------- lado site (qprincipal)
SITE_JS = "(C) => {\n" + PARSE_JS + """
  const S = CM.S, res = {inf: [], linhas: [], kit: [], ped: [], lma: [], vent: []};
  const K = {A: 'a', D: 'd', Q: 'ampQ', Ml: 'ampMl'};
  for (const c of C.inf){
    S.kg = c.kg == null ? NaN : c.kg; S.age = null;
    CM.selectDrug(c.drug);
    if (c.pre != null) CM.setPreset(c.pre);
    let regIn = null;
    if (c.reg != null) regIn = CM.setReg(c.reg);
    if (c.custom) for (const [k, v] of Object.entries(c.custom)){       // o mesmo que os campos da tela fazem
      if (k === 'dil') S.dil = v; else { S[K[k]] = CM.num(v); if (k === 'A' || k === 'D') S.preset = -1; }
    }
    if (c.dose != null) S.dose = c.dose;
    const r = c.rate != null ? CM.infusao('rate', c.rate) : CM.infusao('dose');
    res.inf.push({ tot: r.totTxt, conc: r.concTxt, dose: c.rate != null ? r.doseIn : (c.reg != null && c.dose == null ? regIn : null),
      rate: c.rate == null ? r.rateIn : null, meta: r.metaTxt, warn: r.msg, red: r.red, rx: r.rx,
      tt: r.tabela.map(t => [t.dose, t.rate].concat(t.eq != null ? [t.eq] : [])), on: r.tabela.findIndex(t => t.on) });
  }
  for (const c of C.linhas){
    const kg = c.kg == null ? NaN : c.kg, age = c.age;
    const it = c.src === 'PED' ? CM.PED[c.s].itens[c.i] : c.src === 'EMG' ? CM.EMG[c.s].itens[c.i] : CM.IOT[c.g][c.i];
    const ped = c.src === 'PED' ? true : c.src === 'EMG' ? false : (age != null && age < 14);
    const l = CM.linha(it, kg, age, ped);
    const rec = parseLinha(cxLinhaHTML('k', it, l, ped, c.src.toLowerCase()), {via: '.cx-via'}, l.copy || null);
    rec.calc = !!it.calc;
    if (l.tipo === 'semPeso'){ rec.semPeso = true; rec.perKg = l.perKg; }
    res.linhas.push(rec);
  }
  for (const c of C.kit){ S.kg = c.kg == null ? NaN : c.kg; S.age = c.age; res.kit.push(CM.kitText()); }
  for (const c of C.ped) res.ped.push({est: CM.pesoEst(c.age), pas: CM.pasMin(c.age), via: CM.viaPed(c.age), idade: CM.idadeTxt(c.age)});
  for (const c of C.lma) res.lma.push(CM.lma(c.kg));
  for (const c of C.vent){
    S.altura = c.altura == null ? NaN : c.altura; S.sexo = c.sexo;
    const v = CM.ventilacao();
    res.vent.push(v ? 'Peso predito' + v.pp + 'Volume corrente' + v.vc : 'Informe a altura.');
  }
  S.kg = NaN; S.age = null; S.altura = NaN; S.sexo = null;
  return res;
}"""

# campos comparados por linha (no lado site o semPeso mostra a dose por kg no lugar do "—": compara-se a dose por kg)
def chave_linha(r):
    if r.get("semPeso"):
        return {"semPeso": True, "nm": r["nm"], "via": r["via"], "perKg": r["perKg"]}
    k = {f: r[f] for f in ("nm", "via", "main", "small", "copy", "subs", "fx", "caps")}
    if r.get("calc"):          # cálculo especial: o HTML do dilui (sub/fx) é mostrado como está — compara-se o HTML
        k["info"] = r["info"]
    return k


def tabela_js(pg, site):
    o = "({INF: CM.INF, PED: CM.PED, EMG: CM.EMG, IOT: CM.IOT, dil: CM.dilOptions})" if site else \
        "({INF, PED, EMG, IOT, dil: dilOptions})"
    return pg.evaluate(f"() => ({TAB_JS})({o})")


def rodar(pg, js, C):
    # em lotes, para não estourar o tamanho de uma chamada
    out = {k: [] for k in C}
    for k in C:
        for a in range(0, len(C[k]), 2500):
            part = {kk: (C[k][a:a + 2500] if kk == k else []) for kk in C}
            r = pg.evaluate(js, part)
            out[k] += r[k]
    return out


def comparar(rep, C, esperado, obtido):
    n = {}
    for grupo in C:
        exp, got = esperado[grupo], obtido[grupo]
        rep.check(len(exp) == len(got) == len(C[grupo]), f"{grupo}: {len(got)} resultados para {len(C[grupo])} casos")
        bad = 0
        for c, e, g in zip(C[grupo], exp, got):
            if grupo == "linhas":
                e, g = chave_linha(e), chave_linha(g)
            if e != g:
                bad += 1
                if bad <= 6:
                    diffs = {k: (e.get(k), g.get(k)) for k in (e if isinstance(e, dict) else {"v": 0})
                             if isinstance(e, dict) and e.get(k) != g.get(k)} if isinstance(e, dict) else (e, g)
                    rep.check(False, f"{grupo} {json.dumps(c, ensure_ascii=False)}: {str(diffs)[:600]}")
        if bad > 6:
            rep.check(False, f"{grupo}: +{bad - 6} diferenças")
        n[grupo] = (len(C[grupo]), bad)
    return n


def contar_inf(C):
    d = {"dose": 0, "vazão": 0, "esquema": 0, "ampola/diluição editada": 0}
    for c in C["inf"]:
        if c.get("custom"):
            d["ampola/diluição editada"] += 1
        elif c.get("reg") is not None:
            d["esquema"] += 1
        elif c.get("rate") is not None:
            d["vazão"] += 1
        else:
            d["dose"] += 1
    return d


def run(browser, url):
    """Compara o site com o gabarito gravado (sem precisar do dilui)."""
    rep = Report("calculadoras: paridade com o dilui (gabarito)")
    with gzip.open(GABARITO, "rt", encoding="utf-8") as f:
        G = json.load(f)
    p = Page(browser, url.split("#")[0])
    tab = tabela_js(p.page, True)
    rep.check(tab == G["tabelas"], "as tabelas do site mudaram desde o gabarito (INF/PED/EMG/IOT): regenere com --dilui e revise")
    got = rodar(p.page, SITE_JS, G["casos"])
    n = comparar(rep, G["casos"], G["esperado"], got)
    for k, (tot, bad) in n.items():
        rep.note(f"{k}: {tot} casos, {bad} diferenças")
    rep.check(not p.problems, "console: " + "; ".join(p.problems[:3]))
    p.close()
    return rep.done()


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--dilui", required=True, help="caminho do index.html do dilui (o original)")
    a = ap.parse_args()
    rep = Report("calculadoras: paridade direta com o dilui")
    with browser() as b:
        d = Page(b, "file://" + os.path.abspath(a.dilui))     # o dilui pede Google Fonts: ignorado (sem rede)
        tab = tabela_js(d.page, False)
        C = casos(tab)
        esperado = rodar(d.page, DILUI_JS, C)
        d.close()
        s = Page(b, file_url(REPO))
        rep.check(tabela_js(s.page, True) == tab, "tabelas diferentes entre o dilui e o site")
        obtido = rodar(s.page, SITE_JS, C)
        rep.check(not s.problems, "console do site: " + "; ".join(s.problems[:3]))
        s.close()
    n = comparar(rep, C, esperado, obtido)
    for k, (tot, bad) in n.items():
        rep.note(f"{k}: {tot} casos, {bad} diferenças")
    rep.note("infusão por tipo: " + json.dumps(contar_inf(C), ensure_ascii=False))
    ok = rep.done()
    # o gabarito é sempre o que o dilui mostrou (mesmo que o site ainda difira)
    if True:
        with gzip.open(GABARITO, "wt", encoding="utf-8", compresslevel=9) as f:
            json.dump({"tabelas": tab, "casos": C, "esperado": esperado}, f, ensure_ascii=False, separators=(",", ":"))
        print(f"gabarito gravado: {GABARITO} ({os.path.getsize(GABARITO)} bytes)")
    return 0 if ok else 1


if __name__ == "__main__":
    sys.exit(main())
