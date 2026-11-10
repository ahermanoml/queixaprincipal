/* ============================================================
   MEU RASCUNHO (const MINHA) — modelos do próprio médico, em texto livre
   card = {titulo, grupo, conds: [ids de DATA onde o card aparece], linhas: [uma linha por elemento], nota?}
   ============================================================ */
const MINHA = [
 {
  "titulo": "Evolução — modelo PS",
  "grupo": "Evolução e exame físico",
  "conds": [],
  "linhas": [
   "VIDE EVOLUÇAOOOOOOOOO",
   "",
   "",
   "# TRIAGEM",
   "",
   "",
   "# SUBJETIVO",
   "",
   "# COM:",
   "# MEU:",
   "# ALERGIA:",
   "",
   "# AO EXAME",
   "BEG, LOTE, CORADO, HIDRATADO",
   "ACV: RR EM 2T SS",
   "AR: MVF SEM RA",
   "ABD: SEMIGLOBOSO, SEM SINAIS DE DOR",
   "NEU: GLASGOW 15, PIFR, SEM DEFICITS, SEM SINAIS MENINGEOS",
   "",
   "# H. DIAGNÓSTICA",
   "",
   "# CONDUTA"
  ]
 },
 {
  "titulo": "Exame físico — com sinais vitais",
  "grupo": "Evolução e exame físico",
  "conds": [],
  "linhas": [
   "BEG, normocorado, mucosas úmidas e normocoradas, TEC<3seg, eutônico, eutrófico, ausência de linfonodomegalias, sem edemas",
   "-PA:",
   "-FC:",
   "-FR:",
   "-Sat:",
   "-Temp:",
   "- ACV: RCR em 2T, BNF, sem SS.",
   "- AR: MV+ em AHT, sem RA. Eupneico, sem sinais de desconforto.",
   "- ABD: Semigloboso, flácido, RHA+, indolor à palpação superficial ou profunda, DB (-), Murphy (-), Giordano (-), sem VMG ou MP",
   "- NEU: Glasgow 15, PIFR, sem décifits motores ou sensitivos, sem sinais de irritação meníngea, nistagmo ou ataxia",
   "- EXT: Aquecidas, sem edemas, com pulsos periféricos cheios e simétricos, tempo de reenchimento capilar < 2 s"
  ]
 },
 {
  "titulo": "Exame físico completo",
  "grupo": "Evolução e exame físico",
  "conds": [],
  "linhas": [
   "PA: 110 x 70 mmHg, FC:77bpm, SpO2: 98% em ar ambiente",
   "Paciente em bom estado geral, acianótico, anictérico, afebril, com boa perfusão periférica, normocorado, hidratado, consciente e orientado em tempo e espaço.",
   "Cabeça e pescoço: Ausência de linfadenomegalias palpáveis. Tireóide palpável sem nódulos.",
   "Otoscopia:",
   "Ouvido Direito: Canal auditivo externo sem alterações, membrana timpânica translúcida e brilhante.",
   "Ouvido Esquerdo: Canal auditivo externo sem alterações, membrana timpânica translúcida e brilhante.",
   "Oroscopia: Ausência de lesões gengivais e em palato. Tonsilas sem alterações.",
   "ACV: BRNF em 2T. Não ausculto sopros.",
   "AR: Sem sinais de desconforto respiratório. MV fisiológico. Não ausculto ruídos adventícios.",
   "Abdome: plano, RHA+, normotenso, normotimpânico. Indolor à palpação superficial e profunda. Não palpo massas ou visceromegalias. Hepatimetria normal, Traube livre.",
   "SN: Pupilas isocóricas e fotorreagentes. Pares cranianos íntegros. Provas cerebelares sem alterações. Sem sinais de meningismo. Ausência de sinais neurológicos focais. Marcha preservada. ECG: 15."
  ]
 },
 {
  "titulo": "Modelo trauma",
  "grupo": "Evolução e exame físico",
  "conds": [
   "tce",
   "trauma_toracico"
  ],
  "linhas": [
   "Cabeça: Palpação para identificar hematomas, depressões e lesões.",
   "Boca e Face: Exame detalhado das estruturas bucomaxilofaciais.",
   "Pescoço e Coluna Cervical: Avaliação das estruturas do pescoço e a manutenção da imobilização cervical.",
   "Tórax: Exame do tórax, incluindo ausculta cardíaca.",
   "Abdome e Pelve: Verificação do abdome e da pelve.",
   "Períneo, Reto e Vagina: Exame das áreas genitais e retais.",
   "Sistema Musculoesquelético: Exame de todos os membros e sistema musculoesquelético para identificar fraturas ou lesões.",
   "Sistema Neurológico: Avaliação do estado neurológico usando o método AVDI (Acordado, responde a estímulos Verbais, responde a Dor, Irresponsivo), e verificação das pupilas."
  ]
 },
 {
  "titulo": "Evolução diária — sala de emergência",
  "grupo": "Evolução e exame físico",
  "conds": [],
  "linhas": [
   "# EVOLUCAO DIARIA SALA DE EMERGENCIA - __/__/____",
   "# NOME, __ ANOS",
   "DIH __/__/____",
   "== LISTA DE PROBLEMAS ==",
   "",
   "1 -",
   "",
   "== ANTECEDENTES ==",
   "#CMB:",
   "",
   "#MEU:",
   "#ALERGIA:",
   "",
   "== ANTIBIOTICOTERAPIA EM USO ==",
   "",
   "== HISTORIA DA ADMISSAO ==",
   "",
   "##NOTA DE INTERCORRENCIAS (__/__):",
   "",
   "== AVALIACAO DIARIA ==",
   "",
   "== CONDUTAS ==",
   "-"
  ],
  "nota": "Estrutura da sua evolução da sala de emergência, sem os dados do paciente (nome, idade, datas e história clínica foram retirados)."
 },
 {
  "titulo": "GECA",
  "grupo": "Receitas",
  "conds": [
   "diarreia"
  ],
  "linhas": [
   "BUSCOPAM COMPOSTO 1 AMP + ONDANSETRONA 1 AMP + 250ML SF 0,9% EV",
   "",
   "250ML SF 0,9% EV — CORRER PURO APÓS SORO COM MEDICAÇÕES ACIMA",
   "",
   "SORO REIDRATAÇÃO ORAL ----------- 6 SACHES",
   "DILUIR 1 SACHE EM 1 LITRO DE AGUA. TOMAR 100 ML DESTE SORO APOS DIARREIA. TOMAR 1L MÍNIMO AO LONGO DO DIA",
   "",
   "BUSCOPAN COMPOSTO ----------- 1 CX",
   "TOMAR 1 COMPRIMIDO DE 8 EM 8 HORAS, SE DOR ABDOMINAL",
   "",
   "ONDANSETRONA 8 MG ---------------- 1 CX",
   "TOMAR 1 COMPRIMIDO DE 8 EM 8 HORAS, SE NAUSEAS OU VOMITOS",
   "",
   "RETORNAR PS:",
   "- MAIS 5 DIAS SINTOMAS",
   "- FEBRE > 38,5",
   "- SANGUE OU MUCO NAS FEZES",
   "- NÃO CONSEGUIR HIDRATAR DE FORMA ADEQUADA EM CASA"
  ]
 },
 {
  "titulo": "Dengue",
  "grupo": "Receitas",
  "conds": [
   "dengue"
  ],
  "linhas": [
   "DIPIRONA 500 MG -------------- 1 CX",
   "2 CP DE 6 EM 6 HORAS, SE DOR OU FEBRE",
   "OU",
   "PARACETAMOL 500MG --------------- 1 CX",
   "1 CP DE 6 EM 6 HORAS, SE DOR OU FEBRE",
   "",
   "ONDANSETRONA 8 MG -------------- 1 CX",
   "1 CP DE 8 EM 8 HORAS, SE NAUSEAS OU VOMITOS",
   "",
   "SORO DE REIDRATAÇÃO ORAL ---------------- 5 SACHES",
   "DILUIR 1 SACHE EM 1 LITRO DE AGUA E MANTER EM GELADEIRA. TOMAR AO MENOS 1 A 1,5  LITROS AO LONGO DO DIA. TOMAR 3 LITROS DE ÁGUA, SUCO, GATORATES E OUTROS LÍQUIDOS EM GERAL",
   "",
   "LORATADINA 10 MG ----------- 1 CX",
   "1 CP AO DIA, SE COCEIRA",
   "",
   "SINAIS DE ALARME - VOLTAR IMEDIATAMENTE AO PRONTO SOCORRO:",
   "- dor abdominal intensa e contínua;",
   "- vômitos persistentes;",
   "- sangramentos importantes;",
   "- parar de urinar;",
   "- letargia"
  ]
 },
 {
  "titulo": "Dengue criança",
  "grupo": "Receitas",
  "conds": [
   "dengue"
  ],
  "linhas": [
   "DIPIRONA XAROPE 50MG/ML --- 01 FR",
   "DAR __ML A CADA 06H, SE DOR OU FEBRE",
   "",
   "DRAMIN GOTAS --- 01 FR",
   "DAR  __ GOTAS A CADA 06H, SE NAUSEAS, ENJOO OU VOMITO",
   "",
   "SORO REIDRATAÇÃO ORAL ----------- 6 SACHES",
   " DILUIR 1 SACHE EM 1 LITRO DE AGUA. DAR 500ML A 1 LITRO AO LONGO DO DIA. OFERECER 2 LITROS PELO MENOS DE OUTROS LIQUIDOS: AGUA, SUCO, GATORADE, ETC."
  ]
 },
 {
  "titulo": "Gripe",
  "grupo": "Receitas",
  "conds": [
   "h1n1",
   "resfriado",
   "nasofaringite"
  ],
  "linhas": [
   "DIPIRONA 500 MG -------------- 1 CX (ANALGÉSICO)",
   "2 CP DE 6 EM 6 HORAS, SE DOR OU FEBRE",
   "",
   "LORATADINA 10 MG ----------- 1 CX (ALERGIA, TOSSE, CORIZA, ESPIRROS)",
   "1 CP AO DIA, POR 05 DIAS",
   "",
   "IBUPROFENO 600 MG ------------ 1 CX (ANTI-INFLAMATÓRIO)",
   "1 CP DE 8 EM 8 HORAS, POR 3 DIAS",
   "",
   "PREDNISONA 20 MG ------------- 10 CPS (CORTICOIDE, PROPRIEDADES ANTI-INFLAMATÓRIAS)",
   "2 CP AO DIA, POR 5 DIAS",
   "",
   "",
   "MEL COM LIMÃO (ALÍVIO TOSSE)",
   "1 COLHER SOPA A NOITE",
   "",
   "SORO FISIOLÓGICO 0,9% ------------------ 1 FR",
   "FAZER LAVAGEM NASAL COM AUXÍLIO DE SERINGA OU EQUIPAMENTO ESPECÍFICO (EX.: NASOAR), SE PRESENÇA DE GRANDE SECREÇÃO NO NARIZ",
   "",
   "",
   "VOLTAR PRONTO SOCORRO:",
   "- MAIS DE 10 DIAS DE SINTOMAS",
   "- PIORA SÚBITA DOS SINTOMAS",
   "- FALTA DE AR IMPORTANTE"
  ]
 },
 {
  "titulo": "Tosse pós IVAS",
  "grupo": "Receitas",
  "conds": [
   "resfriado",
   "nasofaringite"
  ],
  "linhas": [
   "USO ORAL",
   "",
   "1-LORATADINA 10MG --- 01 CX",
   "TOMAR 01 CP DE MANHA E OUTRO A NOITE, POR 05 DIAS",
   "",
   "USO INALATÓRIO",
   "",
   "2-BUDESONID 32MCG ---- 01 CX",
   "FAZER 01 JATO EM CADA NARINA, A CADA 12H, ENQUANTO PERSISTIREM OS SINTOMAS"
  ]
 },
 {
  "titulo": "Dor muscular",
  "grupo": "Receitas",
  "conds": [
   "lombalgia",
   "torcicolo"
  ],
  "linhas": [
   "IBUPROFENO 600 MG ----------- 1 CX",
   "1 CP DE 8 EM 8 HORAS, POR 3 DIAS",
   "",
   "DIPIRONA 500 MG ----------- 1 CX",
   "2 CPS DE 6 EM 6 HORAS, SE DOR",
   "",
   "CICLOBENZAPRINA 10 MG ------- 1 CX",
   "1 CP ANTES DE DORMIR, POR 5 DIAS",
   "",
   "PACO 500/30 MG ---------- 1 CX",
   "1 CP DE 6 EM 6 HORAS, SE DOR INTENSA"
  ]
 },
 {
  "titulo": "Enxaqueca",
  "grupo": "Receitas",
  "conds": [
   "enxaqueca",
   "cefaleia"
  ],
  "linhas": [
   "DIPIRONA 500MG — 01 CX",
   "TOMAR 02 COMPRIMIDOS SE CRISE. PODE REPETIR A CADA 06H",
   "",
   "IBUPROFENO 600MG — 01 CX",
   "TOMAR 01 COMPRIMIDO SE CRISE. PODE REPETIR A CADA 08H. NÃO TOMAR POR MAIS DE 07 DIAS SEGUIDOS",
   "",
   "PLASIL 10MG —- 01 CX",
   "TOMAR 01 COMPRIMIDO SE CRISE. PODE REPETIR A CADA 08H",
   "",
   "SUMATRIPTANO 50MG — 01 CX",
   "TOMAR 01 COMPRIMIDO NOS PRÓDROMOS. REPETIR EM 02H SE NECESSARIO (REPETIR UMA ÚNICA VEZ NO DIA)"
  ]
 },
 {
  "titulo": "Asma",
  "grupo": "Receitas",
  "conds": [
   "asma"
  ],
  "linhas": [
   "USO INALATORIO",
   "SALBUTAMOL 100MCG/JATO (AEROLIN) ------------1 FRASCO",
   "REALIZAR 4 PUFFS, 6 EM 6H, POR 5 DIAS. E APÓS, SE FALTA DE AR OU TOSSE PERSISTENTE.",
   "",
   "USO ORAL",
   "PREDNISONA 20 MG ---------------------------------------------- 01 CAIXA",
   "TOMAR  03 CP/ VO  1 X DIA, POR 5 DIAS."
  ]
 },
 {
  "titulo": "Constipação",
  "grupo": "Receitas",
  "conds": [
   "constipacao"
  ],
  "linhas": [
   "Uso Oral:",
   "",
   "",
   "1. Macrogol 3350 ----------------------- 1cx",
   "Tomar 1 sache diluido em agua ou suco, uma vez ao dia,",
   "",
   "2. Lactulose --------------------------- 1 un",
   "Tomar 20ml (1 colher de sopa) via oral 3 vezes ao dia",
   "",
   "3. Óleo Mineral —---------------------- 1 fr",
   "Tomar 1 colher de sopa de 1 a 3 vezes ao dia",
   "",
   "4. Bisacol 5mg --------------------------- 1 cx",
   "Tomar 2 cp a noite",
   "",
   "5. Simeticona gotas ----------------------- 1 vidro",
   "Tomar 16 gts de 6/6 horas, se gases",
   "",
   "6. Plasil 10mg ----------------------------- 1 cx",
   "Tomar 1 cp de 8/8 horas, se nauseas, enjoo ou vômito",
   "",
   "Uso Externo:",
   "",
   "1. Supositorio de glicerina --------------- 1 cx",
   "Aplicar 1 supositorio via retal 1 vez ao dia"
  ]
 },
 {
  "titulo": "Antibióticos",
  "grupo": "Receitas",
  "conds": [],
  "linhas": [
   "1) AMOXICILINA + CLAVULANATO 875/125 — 14 CPS",
   "TOMAR 01 CP A CAD 12H, POR 3 DIAS",
   "",
   "1) AMOXICILINA 500MG — 21 CPS",
   "TOMAR 01 CP A CADA 08H, 07 DIAS",
   "",
   "2) AZITROMICINA 500MG — 05 CPS",
   "TOMAR 01 CP AO DIA, POR 5 DIAS",
   "",
   "3) CIPROFLOXACINO 500MG — 14 CPS",
   "TOMAR 01 CP A CADA 12H DIA POR 7 DIAS",
   "",
   "4) BACTRIM 400+80 — 12 CPS",
   "TOMAR 02 CPS A CADA 12H, POR 3 DIAS"
  ]
 },
 {
  "titulo": "Analgésicos opioides",
  "grupo": "Receitas",
  "conds": [
   "analgesia"
  ],
  "linhas": [
   "1) PACO 500/30 —- 01 CX",
   "TOMAR 01 CP A CADA 06H, SE DOR INTENSA",
   "",
   "2) TRAMADOL 50MG — 01 CX",
   "TOMAR 01-02 CPS A CADA 06H, SE DOR INTENSA"
  ]
 },
 {
  "titulo": "Observação — Cólica renal",
  "grupo": "Observação e internação",
  "conds": [
   "colica_nefretica"
  ],
  "linhas": [
   "CETOPROFENO (PROFENID) 1AMP  + BUSCOPAN COMPOSTO 1AMP + + SF 0,9% 100- EV LENTO"
  ]
 },
 {
  "titulo": "Observação — Enxaqueca",
  "grupo": "Observação e internação",
  "conds": [
   "enxaqueca",
   "cefaleia"
  ],
  "linhas": [
   "DIPIRONA 1 AMP + CETOPROFENO 1 AMP + PLASIL 1 AMP + 150ML SF 0,9%"
  ]
 },
 {
  "titulo": "Observação — Dengue",
  "grupo": "Observação e internação",
  "conds": [
   "dengue"
  ],
  "linhas": [
   "SF 0,9% 500 ML + 1 AMP DE DIPIRONA + 1 AMP DE PLASIL EV"
  ]
 },
 {
  "titulo": "Observação — Soro",
  "grupo": "Observação e internação",
  "conds": [],
  "linhas": [
   "SF 0,9% 250 ML + 1 AMP DE COMPLEXO B + 1 AMP DE FRUTOVITAN EV"
  ]
 },
 {
  "titulo": "Observação — Cólica / GECA",
  "grupo": "Observação e internação",
  "conds": [
   "diarreia"
  ],
  "linhas": [
   "SF 0,9% 500 ML + 1 AMP DE BUSCOPAN COMPOSTO + 1 AMP DE ONDANSETRONA EV"
  ]
 },
 {
  "titulo": "Observação — Lombalgia mecânica",
  "grupo": "Observação e internação",
  "conds": [
   "lombalgia"
  ],
  "linhas": [
   "DIPIRONA 1 AMP IM + DICLOFENACO 1 AMP IM + DEXAMETASONA 1 AMP IM",
   "",
   "TRAMADOL 1 AMP SC"
  ]
 },
 {
  "titulo": "Prescrição de internação — modelo",
  "grupo": "Observação e internação",
  "conds": [],
  "linhas": [
   "-DIETA LIVRE",
   "",
   "-SF 0,9% 250ML EV ACM",
   "",
   "-CORRIGIR DXT CONFORME PROTOCOLO DA UNIDADE",
   "",
   "-GLICOSE 50% 3 AMP BOLUS",
   "SE DXT < 70",
   "",
   "-DIPIRONA 1 AMP EV",
   "ACM",
   "",
   "-ONDANSETRONA 1 AMP EV",
   "ACM",
   "",
   "-ENOXAPARINA 40MG SC",
   "24/24H",
   "",
   "-OMEPRAZOL 1 AMP EV BOLUS",
   "24/24H",
   "",
   "-CUIDADOS GERAIS",
   "PA, FC, SATO2, TEMP, DXT 06/06H"
  ]
 },
 {
  "titulo": "Raio-X tórax — normal",
  "grupo": "Laudos",
  "conds": [],
  "linhas": [
   "EXAME NORMOTRANSPARENTE, ESTRUTURAS ÓSSEAS VISUALIZADAS ÍNTEGRAS E SEM ALTERAÇÃO, INDICE CARDIOTORACICO NORMAL,",
   "PULMÃO SEM SINAIS DE CONSOLIDAÇÃO, SEM CONGESTAO PULMONAR, SEIOS COSTOFRENICOS LIVRES."
  ]
 },
 {
  "titulo": "Raio-X abdome — normal",
  "grupo": "Laudos",
  "conds": [],
  "linhas": [
   "EXAME NORMOTRANSPARENTE, ESTRUTURAS ÓSSEAS VISUALIZADAS ÍNTEGRAS E SEM ALTERAÇÃO.",
   "ABDOME COM DISTRIBUIÇÃO NORMAL DE GASES E FEZES PELAS ALÇAS INTESTINAIS, SEM DILATAÇÃO OU NÍVEL HIDROAEREO."
  ]
 },
 {
  "titulo": "ECG de entrada",
  "grupo": "Laudos",
  "conds": [],
  "linhas": [
   "RITMO SINUSAL,  BPM",
   "EIXO PRESERVADO",
   "ONDA P DE TAMANHO E ASPECTO HABITUAL",
   "INTERVALO PR DE TAMANHO HABITUAL",
   "QRS ESTREITO",
   "INTERVALO SEM SUPRA, INFRA OU OUTROS SINAIS DE ISQUEMIA",
   "ONDA T ASPECTO HABITUAL"
  ]
 }
];
