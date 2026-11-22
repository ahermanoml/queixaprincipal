"""Aba Guias (data/guias.js + js/views/guias.js): estrutura do conteúdo, comportamento e layout.

- estrutura: ids únicos e válidos, tipo conhecido, "cond" existe em DATA (e cada condição tem no máximo um resumo),
  campos obrigatórios, seções com itens, fontes, rascunho com "revisado" nulo, nada de chave "{" perdida no texto;
- comportamento: abrir cada guia pelo endereço, Copiar tudo = guTudo, Copiar de uma seção e do texto pronto, filtro da
  lista, busca única, atalho "Resumo da condição" em Prescrições e "Abrir prescrição" de volta;
- layout: 1366x768 e 390/320 px sem rolagem lateral na página."""
import re
from lib import Page, Report

TIPOS = {"condicao", "exame", "referencia"}


def estrutura(pg, rep):
    d = pg.evaluate("""() => ({itens: GUIA_ITENS, tipos: GUIA_TIPOS.map(t => t.key), conds: DATA.map(c => c.id)})""")
    itens, conds = d["itens"], set(d["conds"])
    rep.check(set(d["tipos"]) == TIPOS, f"GUIA_TIPOS: {d['tipos']}")
    ids = [g.get("id") for g in itens]
    rep.check(len(ids) == len(set(ids)), "ids repetidos: " + str(sorted({i for i in ids if ids.count(i) > 1})))
    por_cond = {}
    for g in itens:
        gid = g.get("id", "?")
        rep.check(bool(re.fullmatch(r"[a-z0-9_-]+", gid or "")), f"{gid}: id inválido")
        rep.check(g.get("tipo") in TIPOS, f"{gid}: tipo {g.get('tipo')!r}")
        for k in ("nm", "sub", "kw", "resumo"):
            rep.check(isinstance(g.get(k), str) and g[k].strip(), f"{gid}: falta {k}")
        rep.check(isinstance(g.get("secoes"), list) and g["secoes"], f"{gid}: sem seções")
        for s in g.get("secoes") or []:
            rep.check(isinstance(s.get("t"), str) and s["t"].strip() and isinstance(s.get("itens"), list) and s["itens"]
                      and all(isinstance(x, str) and x.strip() for x in s["itens"]), f"{gid}: seção vazia ou malformada {s.get('t')!r}")
        rep.check(isinstance(g.get("fontes"), list) and g["fontes"], f"{gid}: sem fontes")
        if g.get("draft"):
            rep.check(g.get("revisado") is None, f"{gid}: rascunho com 'revisado' preenchido")
        if g.get("pronto") is not None:
            rep.check(isinstance(g["pronto"], list) and g["pronto"] and all(isinstance(x, str) for x in g["pronto"]), f"{gid}: pronto malformado")
        if g.get("cond") is not None:
            rep.check(g["cond"] in conds, f"{gid}: cond {g['cond']!r} não existe em DATA")
            if g.get("tipo") == "condicao":
                por_cond.setdefault(g["cond"], []).append(gid)
        txt = " ".join([g.get("nm", ""), g.get("resumo", "")] + [x for s in g.get("secoes") or [] for x in s.get("itens", [])])
        rep.check("{" not in txt and "}" not in txt, f"{gid}: chave perdida no texto")
    dup = {c: v for c, v in por_cond.items() if len(v) > 1}
    rep.check(not dup, f"condição com mais de um resumo: {dup}")
    n = {t: sum(1 for g in itens if g.get("tipo") == t) for t in TIPOS}
    rep.note(f"estrutura: {len(itens)} guias ({n['exame']} exame físico, {n['condicao']} condições, {n['referencia']} referências); "
             f"{len(por_cond)} de {len(conds)} condições de Prescrições com resumo")
    return itens


def comportamento(browser, base, itens, rep):
    p = Page(browser, base + "#/guias")
    pg = p.page
    st = pg.evaluate("() => ({view: document.body.dataset.view, rx: document.querySelector('#col-rx').hidden, n: document.querySelectorAll('#gu-lista .gu-row').length})")
    rep.check(st["view"] == "guias" and st["rx"] and st["n"] == len(itens), f"#/guias: aba aberta, receita escondida, lista completa: {st}")
    ruins = []
    for g in itens:
        pg.evaluate(f"location.hash = '#/guias/{g['id']}'")
        pg.wait_for_function("id => location.hash === '#/guias/' + id && guAberto && guAberto.id === id", arg=g["id"], timeout=3000)
        pg.evaluate("window.__clip = null")
        pg.click("#gu-tudo")
        pg.wait_for_function("() => window.__clip !== null", timeout=2000)
        r = pg.evaluate("""id => { const g = guItem(id);
            const secs = document.querySelectorAll('#gu-body .gu-sec:not(.gu-pronto)').length;
            return {clip: window.__clip, want: guTudo(g), secs, nsec: g.secoes.length,
                    ativo: [...document.querySelectorAll('#gu-lista .gu-row.active')].map(b => b.dataset.id),
                    rx: !!document.querySelector('#gu-body .gu-rx'), pronto: !!document.querySelector('#gu-body .gu-pronto')}; }""", g["id"])
        ok = (r["clip"] == r["want"] and r["secs"] == r["nsec"] and r["ativo"] == [g["id"]]
              and r["rx"] == bool(g.get("cond")) and r["pronto"] == bool(g.get("pronto")))
        if not ok:
            ruins.append(f"{g['id']}: {dict((k, v) for k, v in r.items() if k not in ('clip', 'want'))} clip_ok={r['clip'] == r['want']}")
    rep.check(not ruins, "guias que não abrem/copiam certo: " + "; ".join(ruins[:5]))
    # Copiar de uma seção e do texto pronto
    com_pronto = next((g for g in itens if g.get("pronto")), None)
    if com_pronto:
        pg.evaluate(f"location.hash = '#/guias/{com_pronto['id']}'"); pg.wait_for_timeout(60)
        pg.evaluate("window.__clip = null"); pg.click('.gu-cp[data-pronto]'); pg.wait_for_timeout(60)
        rep.check(pg.evaluate("window.__clip") == "\n".join(com_pronto["pronto"]), "Copiar do texto pronto copia as linhas como estão")
        pg.evaluate("window.__clip = null"); pg.click('.gu-cp[data-s="0"]'); pg.wait_for_timeout(60)
        s0 = com_pronto["secoes"][0]
        rep.check(pg.evaluate("window.__clip") == s0["t"].upper() + ":\n" + "\n".join("- " + x for x in s0["itens"]),
                  "Copiar de uma seção: título em maiúsculas + itens com '- '")
    # filtro da lista (sem acento)
    pg.fill("#gu-filtro", "neurologico")
    vis = pg.evaluate("() => [...document.querySelectorAll('#gu-lista .gu-row')].map(b => b.dataset.id)")
    rep.check("exame-neurologico" in vis and len(vis) < len(itens), f"filtro 'neurologico': {vis[:5]}")
    pg.fill("#gu-filtro", "zzzzqx")
    rep.check(pg.evaluate("() => !!document.querySelector('#gu-lista .gu-nada')"), "filtro sem resultado mostra 'Nada encontrado'")
    pg.fill("#gu-filtro", "")
    # busca única: acha um roteiro de exame e abre
    pg.keyboard.press("Control+k"); pg.keyboard.type("lasegue"); pg.wait_for_timeout(120)
    ids = pg.evaluate("() => buscaRes.map(r => r.v.key + ':' + r.e.id)")
    rep.check("guias:exame-osteomuscular" in ids, f"busca 'lasegue' acha o roteiro da coluna: {ids[:6]}")
    if "guias:exame-osteomuscular" in ids:
        for _ in range(ids.index("guias:exame-osteomuscular")):
            pg.keyboard.press("ArrowDown")
        pg.keyboard.press("Enter"); pg.wait_for_timeout(100)
        rep.check(pg.evaluate("location.hash") == "#/guias/exame-osteomuscular", "Enter na busca abre o guia")
    # atalho de Prescrições ↔ Guias
    cg = next((g for g in itens if g.get("tipo") == "condicao" and g.get("cond")), None)
    if cg:
        pg.evaluate(f"location.hash = '#/prescricoes/{cg['cond']}'"); pg.wait_for_timeout(100)
        rep.check(pg.locator("#mid-body .guia-link").count() == 1, f"{cg['cond']}: botão 'Resumo clínico' no painel")
        # layout minimalista (2026-11-21): o botão abre o painel lateral com o resumo; o link dele leva ao guia completo
        pg.click("#mid-body .guia-link"); pg.wait_for_timeout(300)
        painel = pg.evaluate("""() => ({aberto: !document.querySelector('#resumo').hidden, titulo: document.querySelector('#resumo-titulo').textContent,
            alarme: !!document.querySelector('#resumo .resumo-alerta li'), foco: document.activeElement.id})""")
        rep.check(painel["aberto"] and painel["alarme"] and painel["foco"] == "resumo-fechar" and painel["titulo"],
                  f"o botão abre o painel do resumo clínico, com sinais de alarme e o foco no ✕: {painel}")
        pg.keyboard.press("Escape"); pg.wait_for_timeout(300)
        rep.check(pg.evaluate("document.querySelector('#resumo').hidden") and pg.evaluate("document.activeElement.classList.contains('guia-link')"),
                  "Esc fecha o painel e o foco volta ao botão")
        pg.click("#mid-body .guia-link"); pg.wait_for_timeout(300)
        pg.click("#resumo .resumo-guia"); pg.wait_for_timeout(300)
        rep.check(pg.evaluate("location.hash") == f"#/guias/{cg['id']}" and pg.evaluate("document.querySelector('#resumo').hidden"),
                  "'Abrir o guia completo' abre o resumo da condição na aba Guias e fecha o painel")
        pg.click("#gu-body .gu-rx"); pg.wait_for_timeout(100)
        rep.check(pg.evaluate("location.hash") == f"#/prescricoes/{cg['cond']}" and pg.evaluate("curCond && curCond.id") == cg["cond"],
                  "'Abrir prescrição' volta para a condição")
        sem = pg.evaluate("ids => DATA.map(c => c.id).find(id => !ids.includes(id)) || null", [g["cond"] for g in itens if g.get("cond")])
        if sem:
            pg.evaluate(f"location.hash = '#/prescricoes/{sem}'"); pg.wait_for_timeout(100)
            rep.check(pg.locator("#mid-body .guia-link").count() == 0, f"{sem}: sem resumo, sem atalho")
    # endereço de guia que não existe
    pg.evaluate("location.hash = '#/guias/naoexiste'"); pg.wait_for_timeout(100)
    rep.check(pg.evaluate("location.hash") == "#/guias" and pg.evaluate("guAberto") is None, "guia inexistente → #/guias sem nada aberto")
    rep.check(not p.problems, "problemas no console/rede: " + "; ".join(p.problems[:5]))
    p.close()


def layout(browser, base, rep):
    alvo = "exame-neurologico"
    for w, h in ((1366, 768), (390, 844), (320, 640)):
        p = Page(browser, base + f"#/guias/{alvo}", w, h)
        r = p.page.evaluate("""() => ({px: document.documentElement.scrollWidth > innerWidth,
            tudo: (() => { const b = document.querySelector('#gu-tudo').getBoundingClientRect(); return b.width > 0 && b.right <= innerWidth; })()})""")
        rep.check(not r["px"] and r["tudo"], f"{w}px: sem rolagem lateral e Copiar tudo visível: {r}")
        p.close()


def run(browser, url):
    rep = Report("guias")
    base = url.split("#")[0]
    p = Page(browser, base + "#/guias")
    itens = estrutura(p.page, rep)
    p.close()
    comportamento(browser, base, itens, rep)
    layout(browser, base, rep)
    return rep.done()
