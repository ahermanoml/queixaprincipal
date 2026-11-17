/* ============================================================
   DADOS — condições, blocos e medicações
   item = [medicamento+dose, quantidade, posologia, (rota opcional)]
   rota padrão = "USO ORAL"
   ============================================================ */
const ORAL="USO ORAL", TOP="USO TÓPICO", INAL="USO INALATÓRIO", NASAL="USO INTRANASAL", AUD="USO TÓPICO AUDITIVO", SL="USO SUBLINGUAL", EV="USO ENDOVENOSO", IM="USO INTRAMUSCULAR", SC="USO SUBCUTÂNEO";

const DATA = [
 {
  "id": "analgesia",
  "ic": "💊",
  "nm": "Analgesia / Dor",
  "sub": "dipirona · paracetamol · ibuprofeno · paracetamol + codeína",
  "blocks": [
   {
    "label": "Padrão — Analgésico / antitérmico",
    "draft": true,
    "items": [
     [
      "DIPIRONA 500 MG",
      "01 CAIXA",
      "TOMAR 02 COMPRIMIDOS SE DOR OU FEBRE, PODENDO REPETIR DE 6/6H"
     ],
     [
      "PARACETAMOL 750 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO SE DOR OU FEBRE, PODENDO REPETIR DE 6/6H. INTERCALAR COM DIPIRONA, SE NECESSÁRIO."
     ]
    ],
    "orient": [
     "USAR O ANTI-INFLAMATÓRIO PELO MENOR TEMPO POSSÍVEL E NÃO ASSOCIAR OUTROS ANTI-INFLAMATÓRIOS (DICLOFENACO, NIMESULIDA, CETOPROFENO ETC.)",
     "EVITAR AINE SE GESTAÇÃO, DOENÇA RENAL, ÚLCERA OU SANGRAMENTO DIGESTIVO PRÉVIO, INSUFICIÊNCIA CARDÍACA, USO DE ANTICOAGULANTE OU IDOSO COM COMORBIDADES — USAR O ESQUEMA SEM AINE",
     "OPIOIDE (CODEÍNA, TRAMADOL) APENAS SE DOR INTENSA QUE NÃO MELHORA COM OS ANALGÉSICOS COMUNS, NA MENOR DOSE E POR NO MÁXIMO 03 DIAS; NÃO USAR DURANTE A AMAMENTAÇÃO",
     "RETORNAR IMEDIATAMENTE SE DOR INTENSA SEM MELHORA COM AS MEDICAÇÕES, FEBRE PERSISTENTE, VÔMITOS, FEZES ESCURAS (COMO BORRA DE CAFÉ) OU FALTA DE AR"
    ]
   },
   {
    "label": "Padrão — AINE (anti-inflamatório) por curto prazo — escolha 1",
    "draft": true,
    "menu": true,
    "items": [
     [
      "IBUPROFENO 600 MG",
      "15 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO DE 8/8H, APÓS AS REFEIÇÕES, POR 05 DIAS"
     ],
     [
      "IBUPROFENO 300 MG",
      "01 CAIXA",
      "TOMAR 02 COMPRIMIDOS DE 6/6H POR 05 DIAS"
     ],
     [
      "DICLOFENACO 50 MG",
      "15 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO DE 8/8H, POR 05 DIAS SEGUIDOS HORÁRIO SUGERIDO (8/8h): 06:00 / 14:00 / 22:00"
     ]
    ]
   },
   {
    "label": "Padrão — Dor intensa: paracetamol + codeína (Paco)",
    "draft": true,
    "items": [
     [
      "PARACETAMOL 500 MG + CODEÍNA 30 MG",
      "12 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO SE DOR INTENSA, PODENDO REPETIR DE 6/6H, POR NO MÁXIMO 03 DIAS. NÃO TOMAR JUNTO COM O PARACETAMOL (USAR NO LUGAR DELE)"
     ]
    ]
   },
   {
    "label": "Combinação pronta — Dipirona + ibuprofeno (AINE por curto prazo)",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "DIPIRONA 500 MG",
      "01 CAIXA",
      "TOMAR 02 COMPRIMIDOS SE DOR OU FEBRE, PODENDO REPETIR DE 6/6H"
     ],
     [
      "IBUPROFENO 600 MG",
      "15 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO DE 8/8H, APÓS AS REFEIÇÕES, POR 05 DIAS"
     ]
    ]
   },
   {
    "label": "Combinação pronta — Contraindicação a AINE: dipirona + paracetamol",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "DIPIRONA 500 MG",
      "01 CAIXA",
      "TOMAR 02 COMPRIMIDOS SE DOR OU FEBRE, PODENDO REPETIR DE 6/6H"
     ],
     [
      "PARACETAMOL 750 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO SE DOR OU FEBRE, PODENDO REPETIR DE 6/6H. INTERCALAR COM DIPIRONA, SE NECESSÁRIO."
     ]
    ]
   },
   {
    "label": "Padrão — Ibuprofeno",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "IBUPROFENO 300 MG",
      "01 CAIXA",
      "TOMAR 02 COMPRIMIDOS DE 6/6H POR 05 DIAS"
     ],
     [
      "DIPIRONA 500 MG",
      "01 CAIXA",
      "TOMAR 02 COMPRIMIDOS SE DOR OU FEBRE, PODENDO REPETIR DE 6/6H"
     ],
     [
      "PARACETAMOL 500 MG + CODEÍNA 30 MG",
      "12 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO SE DOR INTENSA, PODENDO REPETIR DE 6/6H, POR NO MÁXIMO 03 DIAS. NÃO TOMAR JUNTO COM O PARACETAMOL (USAR NO LUGAR DELE)"
     ]
    ]
   },
   {
    "label": "Padrão — Diclofenaco",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "DICLOFENACO 50 MG",
      "15 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO DE 8/8H POR 05 DIAS HORÁRIO SUGERIDO (8/8h): 06:00 / 14:00 / 22:00"
     ],
     [
      "DIPIRONA 500 MG",
      "01 CAIXA",
      "TOMAR 02 COMPRIMIDOS SE DOR OU FEBRE, PODENDO REPETIR DE 6/6H"
     ],
     [
      "PARACETAMOL 500 MG + CODEÍNA 30 MG",
      "12 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO SE DOR INTENSA, PODENDO REPETIR DE 6/6H, POR NO MÁXIMO 03 DIAS. NÃO TOMAR JUNTO COM O PARACETAMOL (USAR NO LUGAR DELE)"
     ]
    ]
   },
   {
    "label": "Trauma — Nimesulida",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "NIMESULIDA 100 MG",
      "10 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO DE 12/12H, APÓS AS REFEIÇÕES, POR NO MÁXIMO 05 DIAS. NÃO USAR SE DOENÇA DO FÍGADO OU USO FREQUENTE DE ÁLCOOL"
     ],
     [
      "DIPIRONA 500 MG",
      "01 CAIXA",
      "TOMAR 02 COMPRIMIDOS SE DOR OU FEBRE, PODENDO REPETIR DE 6/6H"
     ],
     [
      "PARACETAMOL 500 MG + CODEÍNA 30 MG",
      "12 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO SE DOR INTENSA, PODENDO REPETIR DE 6/6H, POR NO MÁXIMO 03 DIAS. NÃO TOMAR JUNTO COM O PARACETAMOL (USAR NO LUGAR DELE)"
     ]
    ]
   },
   {
    "label": "Potente — Cetoprofeno",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "CETOPROFENO 150 MG COMPRIMIDO DE LIBERAÇÃO PROLONGADA",
      "10 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO DE 12/12H, APÓS AS REFEIÇÕES, POR 05 DIAS (JÁ É A DOSE MÁXIMA DE 300 MG/DIA). IDOSO: NO MÁXIMO 200 MG/DIA — PREFERIR OUTRA OPÇÃO"
     ],
     [
      "DIPIRONA 500 MG",
      "01 CAIXA",
      "TOMAR 02 COMPRIMIDOS SE DOR OU FEBRE, PODENDO REPETIR DE 6/6H"
     ],
     [
      "PARACETAMOL 500 MG + CODEÍNA 30 MG",
      "12 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO SE DOR INTENSA, PODENDO REPETIR DE 6/6H, POR NO MÁXIMO 03 DIAS. NÃO TOMAR JUNTO COM O PARACETAMOL (USAR NO LUGAR DELE)"
     ]
    ]
   },
   {
    "label": "Dor abdominal",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "DIPIRONA 500 MG",
      "01 CAIXA",
      "TOMAR 02 COMPRIMIDOS VO SE FEBRE OU DOR, PODENDO REPETIR DE 6/6H"
     ],
     [
      "BUTILBROMETO DE ESCOPOLAMINA 10 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO SE DOR ABDOMINAL, PODENDO REPETIR DE 8/8H"
     ],
     [
      "METOCLOPRAMIDA 10 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO SE NÁUSEAS OU VÔMITOS, PODENDO REPETIR DE 8/8H, POR NO MÁXIMO 05 DIAS"
     ]
    ]
   },
   {
    "label": "AINE (anti-inflamatório) — escolha 1",
    "sec": "offlabel",
    "draft": true,
    "menu": true,
    "items": [
     [
      "IBUPROFENO 300 MG",
      "01 CAIXA",
      "TOMAR 02 COMPRIMIDOS DE 6/6H POR 05 DIAS"
     ],
     [
      "DICLOFENACO 50 MG",
      "15 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO DE 8/8H, POR 05 DIAS SEGUIDOS HORÁRIO SUGERIDO (8/8h): 06:00 / 14:00 / 22:00"
     ],
     [
      "NIMESULIDA 100 MG",
      "10 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO DE 12/12H, APÓS AS REFEIÇÕES, POR NO MÁXIMO 05 DIAS. NÃO USAR SE DOENÇA DO FÍGADO OU USO FREQUENTE DE ÁLCOOL"
     ],
     [
      "NAPROXENO SÓDICO 500 MG",
      "10 COMPRIMIDOS",
      "TOMAR UM COMPRIMIDO SE DOR, PODENDO REPETIR DE 12/12H POR ATÉ 05 DIAS SEGUIDOS"
     ]
    ]
   },
   {
    "label": "Antiemético — escolha 1",
    "sec": "offlabel",
    "draft": true,
    "menu": true,
    "items": [
     [
      "METOCLOPRAMIDA 10 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO SE NÁUSEAS OU VÔMITOS, PODENDO REPETIR DE 8/8H, POR NO MÁXIMO 05 DIAS"
     ],
     [
      "ONDANSETRONA 8 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO SE NÁUSEAS OU VÔMITOS, PODENDO REPETIR DE 8/8H"
     ],
     [
      "DIMENIDRINATO 50 MG + PIRIDOXINA 10MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO SE VERTIGEM, NÁUSEAS OU VÔMITOS, PODENDO REPETIR DE 6/6H"
     ]
    ]
   },
   {
    "label": "Padrão — analgesia de horário: dipirona EV + AINE (se sem contraindicação)",
    "mode": "internacao",
    "draft": true,
    "items": [
     [
      "DIPIRONA 500 MG/ML SOLUÇÃO INJETÁVEL",
      "01 AMPOLA 2 ML",
      "ADMINISTRAR 01 G (02 ML) EV DILUÍDO EM 100 ML DE SF 0,9% EM 15 MINUTOS, DE 6/6H (HORÁRIO FIXO ENQUANTO DOR MODERADA A INTENSA)",
      "USO ENDOVENOSO"
     ],
     [
      "CETOPROFENO 100 MG PÓ LIÓFILO PARA SOLUÇÃO INJETÁVEL",
      "01 FRASCO-AMPOLA",
      "SE SEM CONTRAINDICAÇÃO A AINE: ADMINISTRAR 100 MG EV DILUÍDO EM 100 ML DE SF 0,9% EM 20 MINUTOS, DE 12/12H, POR NO MÁXIMO 03 DIAS",
      "USO ENDOVENOSO"
     ]
    ],
    "orient": [
     "AVALIAR DOR (ESCALA NUMÉRICA 0-10) A CADA 4-6 H E 30-60 MIN APÓS CADA RESGATE; META: DOR ≤ 3 OU TOLERÁVEL COM FUNÇÃO PRESERVADA",
     "NÃO USAR AINE SE IDOSO FRÁGIL, CLCR < 60 ML/MIN OU LESÃO RENAL AGUDA, HIPOVOLEMIA, ÚLCERA OU SANGRAMENTO DIGESTIVO, INSUFICIÊNCIA CARDÍACA, GESTAÇÃO OU ANTICOAGULAÇÃO — USAR O ESQUEMA SEM AINE",
     "SE AINE EM PACIENTE ≥ 65 ANOS, COM ÚLCERA PRÉVIA OU EM USO DE ANTIAGREGANTE/CORTICOIDE: ASSOCIAR OMEPRAZOL 20 MG VO 01 VEZ AO DIA",
     "DIPIRONA EV DEVE SER INFUNDIDA LENTAMENTE (RISCO DE HIPOTENSÃO); TRATAR A CAUSA DA DOR E PASSAR PARA VIA ORAL ASSIM QUE TOLERAR"
    ]
   },
   {
    "label": "Padrão — dor intensa (≥ 7/10): morfina EV titulada, associada à analgesia de horário",
    "mode": "internacao",
    "draft": true,
    "items": [
     [
      "MORFINA 10 MG/ML SOLUÇÃO INJETÁVEL",
      "01 AMPOLA 1 ML",
      "DILUIR 01 AMPOLA EM 9 ML DE SF 0,9% (1 MG/ML). ADMINISTRAR 2 A 3 MG EV LENTO A CADA 05-10 MIN ATÉ DOR ≤ 4 OU SONOLÊNCIA (MÁXIMO 15 MG NA TITULAÇÃO); DEPOIS 2 A 4 MG EV ATÉ DE 4/4H SE DOR. IDOSO OU DOENÇA RENAL: 1 A 2 MG POR DOSE",
      "USO ENDOVENOSO"
     ],
     [
      "ONDANSETRONA 2 MG/ML SOLUÇÃO INJETÁVEL",
      "01 AMPOLA 2 ML",
      "ADMINISTRAR 4 MG (02 ML) EV LENTO ATÉ DE 8/8H SE NÁUSEAS OU VÔMITOS",
      "USO ENDOVENOSO"
     ],
     [
      "NALOXONA 0,4 MG/ML SOLUÇÃO INJETÁVEL",
      "01 AMPOLA 1 ML",
      "SE FR < 8 IRPM, SATO2 < 90% OU SEDAÇÃO PROFUNDA: DILUIR 01 AMPOLA EM 9 ML DE SF 0,9% (0,04 MG/ML) E ADMINISTRAR 0,04 A 0,1 MG (01 A 2,5 ML) EV A CADA 2-3 MIN ATÉ FR ≥ 10 IRPM; REPETIR SE RECORRER (AÇÃO MAIS CURTA QUE A DA MORFINA)",
      "USO ENDOVENOSO"
     ]
    ],
    "orient": [
     "DURANTE A TITULAÇÃO: FR, SATO2, PA E NÍVEL DE SEDAÇÃO A CADA 15 MIN; DEPOIS A CADA 1-2 H NAS PRIMEIRAS 24 H. SONOLÊNCIA CRESCENTE PRECEDE A DEPRESSÃO RESPIRATÓRIA — SUSPENDER A PRÓXIMA DOSE",
     "MANTER NALOXONA, O2 E MATERIAL DE VIA AÉREA À BEIRA DO LEITO; EVITAR ASSOCIAR BENZODIAZEPÍNICOS OU OUTROS SEDATIVOS",
     "REDUZIR DOSE E AUMENTAR INTERVALO EM IDOSOS, HEPATOPATAS, DOENÇA RENAL (CLCR < 30: DISCUTIR OUTRO OPIOIDE) E APNEIA DO SONO",
     "SE USO POR MAIS DE 48 H: PRESCREVER LAXATIVO (EX.: LACTULOSE) E PLANEJAR A TRANSIÇÃO PARA VIA ORAL"
    ]
   },
   {
    "label": "Contraindicação a AINE (idoso, doença renal, sangramento, anticoagulação): dipirona EV + paracetamol VO",
    "mode": "internacao",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "DIPIRONA 500 MG/ML SOLUÇÃO INJETÁVEL",
      "01 AMPOLA 2 ML",
      "ADMINISTRAR 01 G (02 ML) EV DILUÍDO EM 100 ML DE SF 0,9% EM 15 MINUTOS, DE 6/6H (HORÁRIO FIXO ENQUANTO DOR MODERADA A INTENSA)",
      "USO ENDOVENOSO"
     ],
     [
      "PARACETAMOL 750 MG",
      "01 COMPRIMIDO",
      "TOMAR 01 COMPRIMIDO VIA ORAL DE 6/6H (3 G/DIA), INTERCALADO COM A DIPIRONA. NÃO ULTRAPASSAR 4 G/DIA SOMANDO TODOS OS PRODUTOS COM PARACETAMOL; MÁXIMO 2 G/DIA SE HEPATOPATIA, ETILISMO OU DESNUTRIÇÃO",
      "USO ORAL"
     ]
    ]
   },
   {
    "label": "Dor moderada sem resposta à analgesia de horário: tramadol EV",
    "mode": "internacao",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "TRAMADOL 50 MG/ML SOLUÇÃO INJETÁVEL",
      "01 AMPOLA 2 ML",
      "ADMINISTRAR 50 A 100 MG EV DILUÍDO EM 100 ML DE SF 0,9% EM 30 MINUTOS, ATÉ DE 6/6H SE DOR (MÁXIMO 400 MG/DIA; ACIMA DE 75 ANOS MÁXIMO 300 MG/DIA; CLCR < 30: DE 12/12H, MÁXIMO 200 MG/DIA)",
      "USO ENDOVENOSO"
     ]
    ],
    "orient": [
     "CONTRAINDICADO COM IMAO E EPILEPSIA NÃO CONTROLADA; RISCO DE SÍNDROME SEROTONINÉRGICA COM ISRS/IRSN/TRICÍCLICOS E DE HIPOGLICEMIA E HIPONATREMIA EM IDOSOS",
     "NÁUSEA E TONTURA SÃO FREQUENTES — INFUNDIR LENTAMENTE; MESMA VIGILÂNCIA RESPIRATÓRIA DOS DEMAIS OPIOIDES"
    ]
   },
   {
    "label": "Padrão — analgésico/antitérmico VO pelo peso — escolha 1",
    "mode": "ped",
    "draft": true,
    "menu": true,
    "items": [
     [
      "DIPIRONA 500 MG/ML SOLUÇÃO ORAL (GOTAS)",
      "01 FRASCO",
      "DAR {DOSE} VIA ORAL ATÉ DE 6/6H SE DOR OU FEBRE (15 MG/KG/DOSE; NÃO USAR EM MENORES DE 3 MESES OU COM MENOS DE 5 KG)",
      "USO ORAL",
      {
       "kg": 15,
       "conc": 500,
       "gotas": 20,
       "un": "GOTAS",
       "max": 1000
      }
     ],
     [
      "PARACETAMOL 200 MG/ML SOLUÇÃO ORAL (GOTAS)",
      "01 FRASCO",
      "DAR {DOSE} VIA ORAL ATÉ DE 6/6H SE DOR OU FEBRE (15 MG/KG/DOSE; MÁXIMO 75 MG/KG/DIA)",
      "USO ORAL",
      {
       "kg": 15,
       "conc": 200,
       "gotas": 15,
       "un": "GOTAS",
       "max": 750
      }
     ],
     [
      "IBUPROFENO 100 MG/ML SUSPENSÃO ORAL (GOTAS)",
      "01 FRASCO",
      "DAR {DOSE} VIA ORAL ATÉ DE 8/8H SE DOR OU FEBRE, APÓS ALIMENTAÇÃO (10 MG/KG/DOSE; SOMENTE A PARTIR DE 6 MESES; NÃO USAR SE SUSPEITA DE DENGUE, VARICELA, DESIDRATAÇÃO OU VÔMITOS)",
      "USO ORAL",
      {
       "kg": 10,
       "conc": 100,
       "gotas": 10,
       "un": "GOTAS",
       "max": 400
      }
     ]
    ],
    "orient": [
     "DOSE PELO PESO, NUNCA PELA IDADE; CONFERIR A CONCENTRAÇÃO E AS GOTAS/ML NA BULA DO FRASCO DISPENSADO — NA DÚVIDA, MEDIR EM ML COM SERINGA DOSADORA",
     "USAR UM ÚNICO ANALGÉSICO NA DOSE CORRETA; NÃO ALTERNAR ANTITÉRMICOS DE ROTINA (SBP)",
     "NÃO USAR AAS, CODEÍNA OU TRAMADOL EM MENORES DE 12 ANOS",
     "RETORNAR SE DOR INTENSA SEM MELHORA, FEBRE POR MAIS DE 72 H, PROSTRAÇÃO, RECUSA ALIMENTAR, VÔMITOS PERSISTENTES OU SINAIS DE DESIDRATAÇÃO"
    ]
   },
   {
    "label": "Padrão — dor intensa no PS (fratura, queimadura, pós-procedimento): dipirona EV + morfina EV titulada",
    "mode": "ped_internacao",
    "draft": true,
    "items": [
     [
      "DIPIRONA 500 MG/ML SOLUÇÃO INJETÁVEL",
      "01 AMPOLA 2 ML",
      "ADMINISTRAR {DOSE} EV LENTO, DILUÍDO EM ÁGUA DESTILADA OU SF 0,9%, ATÉ DE 6/6H SE DOR (15 MG/KG/DOSE; NÃO USAR EM MENORES DE 3 MESES OU COM MENOS DE 5 KG)",
      "USO ENDOVENOSO",
      {
       "kg": 15,
       "conc": 500,
       "un": "ML",
       "max": 1000
      }
     ],
     [
      "MORFINA 10 MG/ML SOLUÇÃO INJETÁVEL",
      "01 AMPOLA 1 ML",
      "DILUIR 01 AMPOLA EM 9 ML DE SF 0,9% (1 MG/ML) E ADMINISTRAR {DOSE} EV LENTO EM 05 MIN; SE DOR PERSISTENTE APÓS 15 MIN, REPETIR METADE DA DOSE; DEPOIS ATÉ DE 4/4H SE DOR (0,1 MG/KG/DOSE; MÁXIMO 5 MG; MENORES DE 6 MESES: 0,05 MG/KG COM MONITORIZAÇÃO)",
      "USO ENDOVENOSO",
      {
       "kg": 0.1,
       "un": "MG",
       "max": 5
      }
     ],
     [
      "ONDANSETRONA 2 MG/ML SOLUÇÃO INJETÁVEL",
      "01 AMPOLA 2 ML",
      "ADMINISTRAR {DOSE} EV LENTO ATÉ DE 8/8H SE NÁUSEAS OU VÔMITOS (0,15 MG/KG/DOSE; MÁXIMO 4 MG; A PARTIR DE 6 MESES)",
      "USO ENDOVENOSO",
      {
       "kg": 0.15,
       "un": "MG",
       "max": 4
      }
     ],
     [
      "NALOXONA 0,4 MG/ML SOLUÇÃO INJETÁVEL",
      "01 AMPOLA 1 ML",
      "SE DEPRESSÃO RESPIRATÓRIA OU SEDAÇÃO EXCESSIVA POR OPIOIDE: ADMINISTRAR {DOSE} EV, REPETIR A CADA 2-3 MIN ATÉ RESPOSTA (0,01 MG/KG/DOSE; MÁXIMO 0,4 MG). SE APNEIA: 0,1 MG/KG (MÁXIMO 2 MG)",
      "USO ENDOVENOSO",
      {
       "kg": 0.01,
       "un": "MG",
       "max": 0.4
      }
     ]
    ],
    "orient": [
     "AVALIAR DOR COM ESCALA ADEQUADA À IDADE (FLACC < 4 ANOS; FACES 4-12 ANOS; NUMÉRICA > 8 ANOS) ANTES E 15-30 MIN APÓS CADA DOSE",
     "APÓS OPIOIDE: OXIMETRIA CONTÍNUA, FR E NÍVEL DE SEDAÇÃO A CADA 15 MIN NA 1ª HORA; NALOXONA, O2 E BOLSA-VÁLVULA-MÁSCARA À BEIRA DO LEITO",
     "ASSOCIAR MEDIDAS NÃO FARMACOLÓGICAS: IMOBILIZAR FRATURAS, GELO, PRESENÇA DOS PAIS, DISTRAÇÃO; ANESTÉSICO TÓPICO ANTES DE PUNÇÕES",
     "ACIONAR UTI SE FR BAIXA PARA A IDADE, SATO2 < 92% OU SEDAÇÃO PROFUNDA APESAR DA NALOXONA"
    ]
   },
   {
    "label": "Sem acesso venoso (a partir de 1 ano): fentanil intranasal",
    "mode": "ped_internacao",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "FENTANIL 50 MCG/ML SOLUÇÃO INJETÁVEL",
      "01 AMPOLA 2 ML",
      "INSTILAR {DOSE} SEM DILUIR, DIVIDIDO ENTRE AS NARINAS, COM ATOMIZADOR NASAL; PODE REPETIR 0,5 MCG/KG APÓS 10-15 MIN SE DOR PERSISTENTE (1,5 MCG/KG/DOSE; MÁXIMO 100 MCG)",
      "USO INTRANASAL",
      {
       "kg": 1.5,
       "conc": 50,
       "un": "ML",
       "max": 100
      }
     ]
    ],
    "orient": [
     "MESMA MONITORIZAÇÃO DOS OPIOIDES EV (OXIMETRIA, FR E SEDAÇÃO) E NALOXONA DISPONÍVEL; A VIA INTRANASAL É OFF LABEL NO BRASIL"
    ]
   },
   {
    "label": "Do material do Drive — Dor intensa sem resposta à codeína: tramadol 50 mg VO por até 03 dias",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "TRAMADOL 50 MG",
      "20 CÁPSULAS",
      "TOMAR 01 A 02 CÁPSULAS SE DOR INTENSA, PODENDO REPETIR DE 6/6H, POR NO MÁXIMO 03 DIAS (MÁXIMO 08 CÁPSULAS POR DIA). NÃO TOMAR JUNTO COM PARACETAMOL + CODEÍNA",
      "USO ORAL"
     ]
    ]
   },
   {
    "label": "Do material do Drive — AINE parenteral de dose única diária: tenoxicam 20 mg EV ou IM",
    "mode": "internacao",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "TENOXICAM 20 MG PÓ LIÓFILO PARA SOLUÇÃO INJETÁVEL",
      "01 FRASCO-AMPOLA",
      "SE SEM CONTRAINDICAÇÃO A AINE: RECONSTITUIR COM O DILUENTE QUE ACOMPANHA E ADMINISTRAR 20 MG EV LENTO (OU IM), 01 VEZ AO DIA, POR NO MÁXIMO 03 DIAS. NÃO ASSOCIAR OUTRO AINE",
      "USO ENDOVENOSO"
     ]
    ]
   }
  ]
 },
 {
  "id": "abscesso_cutaneo",
  "ic": "🩹",
  "nm": "Abscesso cutâneo / furúnculo",
  "sub": "drenagem · dipirona · cefalexina · sulfametoxazol-trimetoprima",
  "blocks": [
   {
    "label": "Padrão — Após a drenagem: analgésico — escolha 1",
    "draft": true,
    "menu": true,
    "items": [
     [
      "DIPIRONA 500 MG",
      "01 CAIXA",
      "TOMAR 02 COMPRIMIDOS SE DOR OU FEBRE, PODENDO REPETIR DE 6/6H"
     ],
     [
      "PARACETAMOL 750 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO SE DOR OU FEBRE, PODENDO REPETIR DE 6/6H. INTERCALAR COM DIPIRONA, SE NECESSÁRIO."
     ],
     [
      "IBUPROFENO 300 MG",
      "01 CAIXA",
      "TOMAR 02 COMPRIMIDOS DE 6/6H POR 05 DIAS"
     ]
    ],
    "orient": [
     "TROCAR O CURATIVO 01 A 02 VEZES AO DIA, LAVANDO COM ÁGUA E SABÃO",
     "COMPRESSAS MORNAS 3 A 4 VEZES AO DIA AJUDAM A DRENAR; NÃO ESPREMER",
     "LAVAR BEM AS MÃOS E NÃO COMPARTILHAR TOALHAS, LÂMINAS OU ROUPAS",
     "RETORNAR SE A VERMELHIDÃO AUMENTAR, FEBRE, A DOR PIORAR OU VOLTAR A JUNTAR PUS"
    ]
   },
   {
    "label": "Padrão — Antibiótico se celulite ao redor, febre, lesões múltiplas, imunossupressão, extremos de idade, face/mão/genitais ou drenagem incompleta — escolha 1",
    "draft": true,
    "menu": true,
    "items": [
     [
      "CEFALEXINA 500MG",
      "28 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO DE 6/6H POR 07 DIAS HORÁRIO SUGERIDO: 06:00 / 12:00 / 18:00 / 00:00"
     ],
     [
      "SULFAMETOXAZOL + TRIMETOPRIMA 800/160 MG",
      "14 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO DE 12/12H POR 07 DIAS (SE SUSPEITA DE ESTAFILOCOCO RESISTENTE OU FALHA)",
      "USO ORAL"
     ]
    ]
   },
   {
    "label": "Padrão — Após a drenagem: analgésico pelo peso — escolha 1",
    "mode": "ped",
    "draft": true,
    "menu": true,
    "items": [
     [
      "DIPIRONA 500 MG/ML SOLUÇÃO ORAL (GOTAS)",
      "01 FRASCO",
      "DAR {DOSE} VIA ORAL ATÉ DE 6/6H SE DOR OU FEBRE (15 MG/KG/DOSE; NÃO USAR EM MENORES DE 3 MESES OU COM MENOS DE 5 KG)",
      "USO ORAL",
      {
       "kg": 15,
       "conc": 500,
       "gotas": 20,
       "un": "GOTAS",
       "max": 1000
      }
     ],
     [
      "PARACETAMOL 200 MG/ML SOLUÇÃO ORAL (GOTAS)",
      "01 FRASCO",
      "DAR {DOSE} VIA ORAL ATÉ DE 6/6H SE DOR OU FEBRE (15 MG/KG/DOSE)",
      "USO ORAL",
      {
       "kg": 15,
       "conc": 200,
       "gotas": 15,
       "un": "GOTAS",
       "max": 750
      }
     ],
     [
      "IBUPROFENO 100 MG/ML SUSPENSÃO ORAL (GOTAS)",
      "01 FRASCO",
      "DAR {DOSE} VIA ORAL ATÉ DE 8/8H SE DOR OU FEBRE, APÓS ALIMENTAÇÃO (10 MG/KG/DOSE; SOMENTE A PARTIR DE 6 MESES; NÃO USAR SE SUSPEITA DE DENGUE, DESIDRATAÇÃO OU VÔMITOS)",
      "USO ORAL",
      {
       "kg": 10,
       "conc": 100,
       "gotas": 10,
       "un": "GOTAS",
       "max": 400
      }
     ]
    ],
    "orient": [
     "TROCAR O CURATIVO 01 A 02 VEZES AO DIA, LAVANDO COM ÁGUA E SABÃO",
     "COMPRESSAS MORNAS 3 A 4 VEZES AO DIA AJUDAM A DRENAR; NÃO ESPREMER",
     "RETORNAR SE A VERMELHIDÃO AUMENTAR, FEBRE, A DOR PIORAR OU VOLTAR A JUNTAR PUS"
    ]
   },
   {
    "label": "Padrão — Antibiótico pelo peso se celulite ao redor, febre, lesões múltiplas, lactente pequeno, face/mão/genitais ou drenagem incompleta — escolha 1",
    "mode": "ped",
    "draft": true,
    "menu": true,
    "items": [
     [
      "CEFALEXINA 250 MG/5 ML SUSPENSÃO ORAL",
      "01 FRASCO",
      "DAR {DOSE} VIA ORAL DE 6/6H POR 07 DIAS (50 MG/KG/DIA)",
      "USO ORAL",
      {
       "kgdia": 50,
       "vezes": 4,
       "conc": 50,
       "un": "ML",
       "max": 500
      }
     ],
     [
      "SULFAMETOXAZOL + TRIMETOPRIMA 200 MG + 40 MG/5 ML SUSPENSÃO ORAL",
      "01 FRASCO",
      "DAR {DOSE} VIA ORAL DE 12/12H POR 07 DIAS (8 MG/KG/DIA DE TRIMETOPRIMA). ALERGIA GRAVE A BETALACTÂMICOS OU SUSPEITA DE MRSA; NÃO USAR EM MENORES DE 2 MESES",
      "USO ORAL",
      {
       "kgdia": 8,
       "vezes": 2,
       "conc": 8,
       "un": "ML",
       "max": 160
      }
     ]
    ]
   },
   {
    "label": "Do material do Drive — Cefadroxila 12/12h (alternativa à cefalexina)",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "CEFADROXILA 500 MG",
      "14 CÁPSULAS",
      "TOMAR 01 CÁPSULA DE 12/12H POR 07 DIAS HORÁRIO SUGERIDO: 08:00 / 20:00",
      "USO ORAL"
     ]
    ]
   },
   {
    "label": "Furunculose de repetição — descolonização por 05 dias",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "MUPIROCINA POMADA 2%",
      "01 BISNAGA",
      "APLICAR UMA PEQUENA QUANTIDADE NO INTERIOR DE CADA NARINA, COM COTONETE, DE 12/12H POR 05 DIAS",
      "USO INTRANASAL"
     ],
     [
      "DIGLUCONATO DE CLOREXIDINA 2% SOLUÇÃO DEGERMANTE",
      "01 FRASCO",
      "USAR NO BANHO 01 VEZ AO DIA POR 05 DIAS: ESPALHAR NO CORPO DO PESCOÇO PARA BAIXO, DEIXAR AGIR 01 A 02 MINUTOS E ENXAGUAR. NÃO USAR NO ROSTO, OLHOS, OUVIDOS OU MUCOSA GENITAL",
      "USO TÓPICO"
     ]
    ],
    "orient": [
     "DURANTE OS 05 DIAS, LAVAR TOALHAS, LENÇÓIS E ROUPAS EM ÁGUA QUENTE E NÃO COMPARTILHAR OBJETOS DE USO PESSOAL",
     "SE OUTRAS PESSOAS DA CASA TÊM FURÚNCULOS, TRATAR TODOS AO MESMO TEMPO; INVESTIGAR DIABETES E HIDRADENITE SE AS LESÕES CONTINUAREM VOLTANDO"
    ]
   }
  ]
 },
 {
  "id": "abstinencia",
  "ic": "🍺",
  "nm": "Abstinência alcoólica",
  "sub": "tiamina · diazepam · lorazepam",
  "blocks": [
   {
    "label": "Padrão — Tiamina",
    "draft": true,
    "items": [
     [
      "TIAMINA 300 MG",
      "60 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO DE 12/12H POR 7 DIAS, DEPOIS 01 COMPRIMIDO AO DIA HORÁRIO SUGERIDO (12/12h): 08:00 / 20:00"
     ]
    ],
    "orient": [
     "ABSTINÊNCIA TOTAL DE BEBIDA ALCOÓLICA. NÃO BEBER JUNTO COM O DIAZEPAM (RISCO DE PARADA RESPIRATÓRIA). NÃO DIRIGIR OU OPERAR MÁQUINAS DURANTE O TRATAMENTO",
     "A MEDICAÇÃO DEVE FICAR SOB A GUARDA DE UM FAMILIAR OU ACOMPANHANTE RESPONSÁVEL, QUE DEVE PERMANECER COM O PACIENTE NOS PRIMEIROS DIAS. MANTER BOA HIDRATAÇÃO E ALIMENTAÇÃO",
     "RETORNAR À UBS EM 24 A 48H PARA REAVALIAÇÃO DOS SINTOMAS (CIWA-AR) E AJUSTE DA DOSE. ENCAMINHAMENTO AO CAPS AD PARA TRATAMENTO DO USO DE ÁLCOOL",
     "RETORNAR IMEDIATAMENTE SE TREMORES INTENSOS, AGITAÇÃO, CONFUSÃO MENTAL, ALUCINAÇÕES, CONVULSÃO, FEBRE, VÔMITOS PERSISTENTES, ANDAR CAMBALEANTE, VISÃO DUPLA OU SONOLÊNCIA EXCESSIVA"
    ]
   },
   {
    "label": "Padrão — Benzodiazepínico em doses decrescentes (lorazepam se hepatopatia grave ou idoso) — escolha 1",
    "draft": true,
    "menu": true,
    "items": [
     [
      "DIAZEPAM 10 MG",
      "15 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO DE 8/8H POR 03 DIAS, DEPOIS 01 COMPRIMIDO DE 12/12H POR 02 DIAS, DEPOIS 01 COMPRIMIDO À NOITE POR 02 DIAS E SUSPENDER. NÃO TOMAR A DOSE SE ESTIVER MUITO SONOLENTO"
     ],
     [
      "LORAZEPAM 1 MG",
      "15 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO DE 8/8H POR 03 DIAS, DEPOIS 01 COMPRIMIDO DE 12/12H POR 02 DIAS, DEPOIS 01 COMPRIMIDO À NOITE POR 02 DIAS E SUSPENDER. NÃO TOMAR A DOSE SE ESTIVER MUITO SONOLENTO"
     ]
    ]
   },
   {
    "label": "Combinação pronta — tiamina + diazepam em doses decrescentes",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "TIAMINA 300 MG",
      "60 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO DE 12/12H POR 7 DIAS, DEPOIS 01 COMPRIMIDO AO DIA HORÁRIO SUGERIDO (12/12h): 08:00 / 20:00"
     ],
     [
      "DIAZEPAM 10 MG",
      "15 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO DE 8/8H POR 03 DIAS, DEPOIS 01 COMPRIMIDO DE 12/12H POR 02 DIAS, DEPOIS 01 COMPRIMIDO À NOITE POR 02 DIAS E SUSPENDER. NÃO TOMAR A DOSE SE ESTIVER MUITO SONOLENTO"
     ]
    ]
   },
   {
    "label": "Combinação pronta — hepatopatia grave ou idoso (lorazepam)",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "TIAMINA 300 MG",
      "60 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO DE 12/12H POR 7 DIAS, DEPOIS 01 COMPRIMIDO AO DIA HORÁRIO SUGERIDO (12/12h): 08:00 / 20:00"
     ],
     [
      "LORAZEPAM 1 MG",
      "15 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO DE 8/8H POR 03 DIAS, DEPOIS 01 COMPRIMIDO DE 12/12H POR 02 DIAS, DEPOIS 01 COMPRIMIDO À NOITE POR 02 DIAS E SUSPENDER. NÃO TOMAR A DOSE SE ESTIVER MUITO SONOLENTO"
     ]
    ]
   },
   {
    "label": "Alternativa sem benzodiazepínico (abstinência leve a moderada, sem convulsão ou delirium prévios): tiamina + carbamazepina em doses decrescentes",
    "sec": "offlabel",
    "items": [
     [
      "TIAMINA 300 MG",
      "60 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO DE 12/12H POR 7 DIAS, DEPOIS 01 COMPRIMIDO AO DIA HORÁRIO SUGERIDO (12/12h): 08:00 / 20:00"
     ],
     [
      "CARBAMAZEPINA 200 MG",
      "12 COMPRIMIDOS",
      "DIA 1: 01 COMPRIMIDO DE 6/6H; DIA 2: 01 COMPRIMIDO DE 8/8H; DIAS 3 E 4: 01 COMPRIMIDO DE 12/12H; DIA 5: 01 COMPRIMIDO À NOITE E SUSPENDER. NÃO USAR SE HEPATOPATIA GRAVE, GESTAÇÃO, DOENÇA DO SANGUE OU BAV; PODE CAUSAR TONTURA E SONOLÊNCIA",
      "USO ORAL"
     ]
    ]
   },
   {
    "label": "Padrão — tiamina EV + diazepam guiado por sintomas (CIWA-Ar)",
    "mode": "internacao",
    "draft": true,
    "items": [
     [
      "TIAMINA (CLORIDRATO) 100 MG/ML SOLUÇÃO INJETÁVEL",
      "03 AMPOLAS 1 ML",
      "ADMINISTRAR 300 MG (3 ML) EV, DILUÍDO EM 100 ML DE SF 0,9%, EM 30 MINUTOS, 01 VEZ AO DIA POR 03 A 05 DIAS, ANTES DE SOLUÇÕES GLICOSADAS; DEPOIS MANTER TIAMINA 300 MG VIA ORAL AO DIA",
      "USO ENDOVENOSO"
     ],
     [
      "DIAZEPAM 10 MG",
      "01 A 02 COMPRIMIDOS",
      "TOMAR 10 A 20 MG VIA ORAL SE CIWA-AR ≥ 10, REAVALIANDO DE 1/1H E REPETINDO ENQUANTO CIWA-AR ≥ 10; NÃO ADMINISTRAR SE SONOLENTO",
      "USO ORAL"
     ],
     [
      "GLICOSE 50% SOLUÇÃO INJETÁVEL",
      "10 AMPOLAS 10 ML",
      "SE GLICEMIA CAPILAR < 70 MG/DL E NÃO CONSEGUE INGERIR POR VIA ORAL: ADMINISTRAR 50 ML (25 G) EV EM VEIA CALIBROSA; REPETIR A GLICEMIA EM 15 MINUTOS E REPETIR A DOSE SE AINDA < 70 MG/DL. ETILISTA OU DESNUTRIDO: TIAMINA 100 MG EV ANTES OU JUNTO, SEM ATRASAR A GLICOSE. NÃO DAR ALTA SE A HIPOGLICEMIA FOR POR SULFONILUREIA OU INSULINA DE AÇÃO LONGA: OBSERVAR DE 12 A 24 H COM SORO GLICOSADO E GLICEMIAS SERIADAS",
      "USO ENDOVENOSO"
     ],
     [
      "SULFATO DE MAGNÉSIO 50% (500 MG/ML) SOLUÇÃO INJETÁVEL",
      "01 AMPOLA 10 ML",
      "SE MAGNÉSIO SÉRICO < 1,7 MG/DL: ADMINISTRAR 2 G (4 ML) EV, DILUÍDO EM 100 ML DE SF 0,9%, EM 1 HORA; REPETIR CONFORME DOSAGEM (CAUTELA NA INSUFICIÊNCIA RENAL)",
      "USO ENDOVENOSO"
     ]
    ],
    "orient": [
     "APLICAR A CIWA-AR DE 1/1H ATÉ < 10 EM 2 AVALIAÇÕES SEGUIDAS, DEPOIS DE 4/4H; MEDICAR SOMENTE POR SINTOMAS E NÃO MEDICAR PACIENTE SONOLENTO",
     "MONITORIZAR SINAIS VITAIS, SATURAÇÃO, GLICEMIA CAPILAR E NÍVEL DE CONSCIÊNCIA; DOSAR NA, K, MG, FÓSFORO, FUNÇÃO HEPÁTICA E RENAL; HIDRATAÇÃO EV CONFORME A VOLEMIA",
     "AMBIENTE CALMO E ILUMINADO, ACOMPANHANTE, PRECAUÇÃO DE QUEDA E DE CONVULSÃO; PESQUISAR INFECÇÃO, TCE, HEMORRAGIA DIGESTIVA, PANCREATITE E HEPATOPATIA DESCOMPENSADA",
     "UTI SE DELIRIUM TREMENS, CONVULSÕES REPETIDAS, NECESSIDADE DE DIAZEPAM > 50 MG NA 1ª HORA OU > 200 MG EM 3 HORAS, INSTABILIDADE HEMODINÂMICA OU DEPRESSÃO RESPIRATÓRIA",
     "NA ALTA: ESQUEMA DE BENZODIAZEPÍNICO DO PADRÃO AMBULATORIAL, TIAMINA VIA ORAL E ENCAMINHAMENTO AO CAPS AD"
    ]
   },
   {
    "label": "Padrão — hepatopatia grave, idoso ou doença pulmonar grave (lorazepam)",
    "mode": "internacao",
    "draft": true,
    "items": [
     [
      "TIAMINA (CLORIDRATO) 100 MG/ML SOLUÇÃO INJETÁVEL",
      "03 AMPOLAS 1 ML",
      "ADMINISTRAR 300 MG (3 ML) EV, DILUÍDO EM 100 ML DE SF 0,9%, EM 30 MINUTOS, 01 VEZ AO DIA POR 03 A 05 DIAS, ANTES DE SOLUÇÕES GLICOSADAS; DEPOIS MANTER TIAMINA 300 MG VIA ORAL AO DIA",
      "USO ENDOVENOSO"
     ],
     [
      "LORAZEPAM 1 MG",
      "01 A 02 COMPRIMIDOS",
      "TOMAR 1 A 2 MG VIA ORAL SE CIWA-AR ≥ 10, REAVALIANDO DE 1/1H E REPETINDO ENQUANTO CIWA-AR ≥ 10; NÃO ADMINISTRAR SE SONOLENTO",
      "USO ORAL"
     ]
    ],
    "orient": [
     "LORAZEPAM NÃO TEM APRESENTAÇÃO INJETÁVEL NO BRASIL; SEM VIA ORAL, USAR DIAZEPAM EV EM DOSES MENORES (5 MG) COM VIGILÂNCIA RESPIRATÓRIA"
    ]
   },
   {
    "label": "Abstinência grave ou delirium tremens (CIWA-Ar ≥ 20 ou sem via oral)",
    "mode": "internacao",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "DIAZEPAM 5 MG/ML SOLUÇÃO INJETÁVEL",
      "01 AMPOLA 2 ML",
      "ADMINISTRAR 10 MG (2 ML) EV LENTO (NO MÁXIMO 5 MG/MIN), SEM DILUIR; REPETIR A CADA 5-10 MIN ATÉ SEDAÇÃO LEVE (CALMO E DESPERTÁVEL). NÃO USAR VIA IM",
      "USO ENDOVENOSO"
     ],
     [
      "FENOBARBITAL 100 MG/ML SOLUÇÃO INJETÁVEL",
      "01 AMPOLA 2 ML",
      "SE REFRATÁRIO AO BENZODIAZEPÍNICO: ADMINISTRAR 130 MG (1,3 ML) EV LENTO (NO MÁXIMO 50 MG/MIN), PODENDO REPETIR A CADA 15-30 MIN ATÉ CONTROLE, EM UTI COM SUPORTE VENTILATÓRIO DISPONÍVEL",
      "USO ENDOVENOSO"
     ],
     [
      "HALOPERIDOL 5 MG/ML SOLUÇÃO INJETÁVEL",
      "01 AMPOLA 1 ML",
      "SE ALUCINAÇÕES OU AGITAÇÃO NÃO CONTROLADAS APESAR DO BENZODIAZEPÍNICO: ADMINISTRAR 2,5 A 5 MG (0,5 A 1 ML) IM, ATÉ DE 8/8H, SEMPRE ASSOCIADO AO BENZODIAZEPÍNICO",
      "USO INTRAMUSCULAR"
     ]
    ],
    "orient": [
     "MONITORIZAÇÃO CONTÍNUA (SATURAÇÃO, FR, CAPNOGRAFIA SE DISPONÍVEL) E MATERIAL DE VIA AÉREA À BEIRA DO LEITO; SOLICITAR VAGA DE UTI",
     "HALOPERIDOL NÃO SUBSTITUI O BENZODIAZEPÍNICO (REDUZ O LIMIAR CONVULSIVO); ECG PARA QTC E CORRIGIR K E MG ANTES",
     "REFRATÁRIO A BENZODIAZEPÍNICO E FENOBARBITAL: INTUBAÇÃO E PROPOFOL EM UTI"
    ]
   },
   {
    "label": "Suspeita de encefalopatia de Wernicke",
    "mode": "internacao",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "TIAMINA (CLORIDRATO) 100 MG/ML SOLUÇÃO INJETÁVEL",
      "05 AMPOLAS 1 ML",
      "ADMINISTRAR 500 MG (5 ML) EV, DILUÍDO EM 100 ML DE SF 0,9%, EM 30 MINUTOS, DE 8/8H POR 03 DIAS; SE HOUVER RESPOSTA, 250 MG EV 01 VEZ AO DIA POR MAIS 05 DIAS",
      "USO ENDOVENOSO"
     ]
    ],
    "orient": [
     "CRITÉRIOS DE CAINE (2 DE 4): DEFICIÊNCIA NUTRICIONAL, ALTERAÇÃO OCULOMOTORA (NISTAGMO, OFTALMOPARESIA), ATAXIA E CONFUSÃO OU ALTERAÇÃO DE MEMÓRIA — TRATAR NA SUSPEITA, SEM AGUARDAR EXAMES",
     "CORRIGIR HIPOMAGNESEMIA (COFATOR DA TIAMINA); SUBSTITUI A DOSE PROFILÁTICA DO PADRÃO"
    ]
   },
   {
    "label": "Do material do Drive — Etilista desnutrido: ácido fólico",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "ÁCIDO FÓLICO 5 MG",
      "30 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO AO DIA POR 30 DIAS",
      "USO ORAL"
     ]
    ]
   }
  ]
 },
 {
  "id": "abuso_sexual",
  "ic": "🛡",
  "nm": "Abuso sexual — profilaxia",
  "sub": "tenofovir/lamivudina · dolutegravir · ceftriaxona",
  "blocks": [
   {
    "label": "Padrão — PEP HIV + profilaxia de IST não virais",
    "draft": true,
    "items": [
     [
      "TENOFOVIR 300 MG + LAMIVUDINA 300 MG",
      "28 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO 01 VEZ AO DIA, SEMPRE NO MESMO HORÁRIO, POR 28 DIAS"
     ],
     [
      "DOLUTEGRAVIR 50 MG",
      "28 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO 01 VEZ AO DIA, JUNTO COM O TENOFOVIR + LAMIVUDINA, POR 28 DIAS"
     ],
     [
      "PENICILINA BENZATINA 1.200.000 UI",
      "02 AMPOLAS",
      "APLICAR UMA AMPOLA EM CADA GLÚTEO MÉDIO",
      "USO INTRAMUSCULAR"
     ],
     [
      "CEFTRIAXONA 500 MG",
      "01 AMPOLA",
      "APLICAR EM GLÚTEO MÉDIO",
      "USO INTRAMUSCULAR"
     ],
     [
      "AZITROMICINA 500 MG",
      "02 COMPRIMIDOS",
      "TOMAR OS 02 COMPRIMIDOS EM DOSE ÚNICA"
     ],
     [
      "METRONIDAZOL 250 MG",
      "08 COMPRIMIDOS",
      "TOMAR OS 08 COMPRIMIDOS EM DOSE ÚNICA SOMENTE APÓS TERMINAR A PEP (NÃO TOMAR JUNTO COM A PEP NEM COM A PÍLULA DO DIA SEGUINTE). NÃO USAR NO 1º TRIMESTRE DA GESTAÇÃO",
      "USO ORAL"
     ]
    ],
    "orient": [
     "INICIAR A PEP O MAIS CEDO POSSÍVEL (IDEALMENTE EM ATÉ 02 HORAS; MÁXIMO 72 HORAS APÓS A EXPOSIÇÃO) E NÃO INTERROMPER OS 28 DIAS; ENTREGAR TODO O TRATAMENTO DE UMA VEZ (O PCDT NÃO RECOMENDA DISPENSAÇÃO FRACIONADA)",
     "ANTES DA PROFILAXIA: TESTES RÁPIDOS PARA HIV, SÍFILIS, HEPATITES B E C E BETA-HCG; VACINAR CONTRA HEPATITE B SE NÃO VACINADA/ESQUEMA INCOMPLETO E AVALIAR IMUNOGLOBULINA ANTI-HEPATITE B (CRIE) EM ATÉ 14 DIAS",
     "VACINAR CONTRA HPV SE 9 A 45 ANOS E AINDA NÃO VACINADA(O) (EXCETO GESTANTE)",
     "REALIZAR NOTIFICAÇÃO COMPULSÓRIA (SINAN) E ACIONAR A REDE DE PROTEÇÃO (ASSISTÊNCIA SOCIAL; CONSELHO TUTELAR SE MENOR DE 18 ANOS)",
     "SEGUIMENTO NO SAE/CTA: REPETIR TESTES PARA HIV, SÍFILIS E HEPATITES EM 30 E 90 DIAS; USAR PRESERVATIVO EM TODAS AS RELAÇÕES ATÉ O FIM DO SEGUIMENTO",
     "RETORNAR SE: VÔMITOS QUE IMPEDEM TOMAR A MEDICAÇÃO, MANCHAS NA PELE, OLHOS AMARELADOS, FEBRE, FERIDAS OU CORRIMENTO GENITAL"
    ]
   },
   {
    "label": "Padrão — contracepção de emergência (mulheres em idade fértil)",
    "draft": true,
    "items": [
     [
      "LEVONORGESTREL 0,75 MG",
      "02 COMPRIMIDOS",
      "TOMAR OS DOIS COMPRIMIDOS EM DOSE ÚNICA"
     ]
    ]
   },
   {
    "label": "Padrão — profilaxia de IST não virais (criança ou adolescente < 45 kg)",
    "peso": {
     "menor": 45
    },
    "mode": "ped",
    "draft": true,
    "items": [
     [
      "PENICILINA BENZATINA 1.200.000 UI",
      "01 A 02 FRASCOS-AMPOLA",
      "APLICAR {DOSE} IM PROFUNDO (VASTO LATERAL DA COXA OU GLÚTEO) EM DOSE ÚNICA — SÍFILIS (50.000 UI/KG; MÁXIMO 2.400.000 UI)",
      "USO INTRAMUSCULAR",
      {
       "kg": 50000,
       "un": "UI",
       "max": 2400000
      }
     ],
     [
      "CEFTRIAXONA 500 MG",
      "01 FRASCO-AMPOLA",
      "APLICAR 125 MG IM EM DOSE ÚNICA — GONORREIA (RECONSTITUIR O FRASCO DE 500 MG E APLICAR 1/4 DO VOLUME)",
      "USO INTRAMUSCULAR"
     ],
     [
      "AZITROMICINA 200 MG/5 ML SUSPENSÃO ORAL",
      "01 FRASCO",
      "DAR {DOSE} VIA ORAL EM DOSE ÚNICA — CLAMÍDIA (20 MG/KG; MÁXIMO 1 G)",
      "USO ORAL",
      {
       "kg": 20,
       "conc": 40,
       "un": "ML",
       "max": 1000
      }
     ],
     [
      "METRONIDAZOL 200 MG/5 ML SUSPENSÃO ORAL",
      "01 FRASCO",
      "DAR {DOSE} VIA ORAL DE 8/8H POR 07 DIAS — TRICOMONÍASE; INICIAR SÓ APÓS TERMINAR A PEP E A CONTRACEPÇÃO DE EMERGÊNCIA; NÃO USAR NO 1º TRIMESTRE DA GESTAÇÃO (15 MG/KG/DIA; MÁXIMO 2 G/DIA)",
      "USO ORAL",
      {
       "kgdia": 15,
       "vezes": 3,
       "conc": 40,
       "un": "ML",
       "max": 500
      }
     ]
    ],
    "orient": [
     "PROFILAXIA DE IST O MAIS CEDO POSSÍVEL; PEP-HIV ATÉ 72 H (IDEALMENTE NAS PRIMEIRAS 2 H) — VER BLOCOS DE PEP. ADOLESCENTE ≥ 45 KG: USAR AS DOSES DE ADULTO",
     "NOTIFICAÇÃO COMPULSÓRIA IMEDIATA (SINAN) E COMUNICAÇÃO AO CONSELHO TUTELAR SÃO OBRIGATÓRIAS; ACIONAR A REDE DE PROTEÇÃO E COLETAR VESTÍGIOS QUANDO POSSÍVEL, SEM ATRASAR A PROFILAXIA",
     "TESTES RÁPIDOS PARA HIV, SÍFILIS E HEPATITES B E C NO ATENDIMENTO, EM 4-6 SEMANAS E EM 3 MESES; BETA-HCG SE APÓS A MENARCA",
     "HEPATITE B: VACINAR SE NÃO VACINADO OU ESQUEMA INCOMPLETO E SOLICITAR IGHAHB AO CRIE (ATÉ 14 DIAS)",
     "HPV: VACINAR SE 9 A 45 ANOS E NÃO VACINADO; DE 2 A 8 ANOS, 01 DOSE (NOTA TÉCNICA MS 96/2026 — NÃO CONTA PARA O ESQUEMA DE ROTINA, QUE DEVE SER FEITO A PARTIR DOS 9 ANOS)",
     "RETORNAR SE VÔMITOS QUE IMPEÇAM A MEDICAÇÃO, MANCHAS NA PELE, OLHOS AMARELADOS, FEBRE, FERIDAS OU CORRIMENTO GENITAL"
    ]
   },
   {
    "label": "Padrão — PEP-HIV (≥ 4 semanas de vida, ≥ 3 kg e < 35 kg): zidovudina + lamivudina + dolutegravir por 28 dias",
    "peso": {
     "de": 3,
     "menor": 35
    },
    "mode": "ped",
    "draft": true,
    "items": [
     [
      "ZIDOVUDINA 10 MG/ML SOLUÇÃO ORAL",
      "QUANTIDADE PARA 28 DIAS",
      "DAR {DOSE} VIA ORAL DE 12/12H POR 28 DIAS ({FAIXA})",
      "USO ORAL",
      {
       "conc": 10,
       "un": "ML",
       "sem_peso": "9 MG/KG/DOSE NA FAIXA DE 9 A < 30 KG; SE 4 A < 9 KG: 12 MG/KG/DOSE; A PARTIR DE 30 KG: 300 MG/DOSE",
       "faixas": [
        {
         "de": 4,
         "menor": 9,
         "txt": "12 MG/KG/DOSE",
         "dose": {
          "kg": 12
         }
        },
        {
         "de": 9,
         "menor": 30,
         "txt": "9 MG/KG/DOSE",
         "dose": {
          "kg": 9
         }
        },
        {
         "de": 30,
         "txt": "300 MG/DOSE",
         "dose": {
          "fixo": 300
         }
        }
       ]
      }
     ],
     [
      "LAMIVUDINA 10 MG/ML SOLUÇÃO ORAL",
      "QUANTIDADE PARA 28 DIAS",
      "DAR {DOSE} VIA ORAL DE 12/12H POR 28 DIAS (4 MG/KG/DOSE; MÁXIMO 150 MG/DOSE)",
      "USO ORAL",
      {
       "kg": 4,
       "conc": 10,
       "un": "ML",
       "max": 150
      }
     ],
     [
      "DOLUTEGRAVIR 5 MG COMPRIMIDO DISPERSÍVEL",
      "QUANTIDADE PARA 28 DIAS",
      "DISPERSAR EM PEQUENA QUANTIDADE DE ÁGUA POTÁVEL E DAR VIA ORAL 01 VEZ AO DIA POR 28 DIAS, CONFORME O PESO: {FAIXA}",
      "USO ORAL",
      {
       "sem_peso": "3 A < 6 KG = 5 MG (01 COMP); 6 A < 10 KG = 10 MG (02 COMP) ATÉ 6 MESES OU 15 MG (03 COMP) ACIMA DE 6 MESES; 10 A < 14 KG = 20 MG (04 COMP); 14 A < 20 KG = 25 MG (05 COMP); 20 KG OU MAIS = 30 MG (06 COMP). ACIMA DE 6 ANOS E > 20 KG QUE ENGOLE COMPRIMIDO: DOLUTEGRAVIR 50 MG 01 COMPRIMIDO 01 VEZ AO DIA",
       "faixas": [
        {
         "de": 3,
         "menor": 6,
         "txt": "5 MG (01 COMP)"
        },
        {
         "de": 6,
         "menor": 10,
         "txt": "10 MG (02 COMP) ATÉ 6 MESES DE IDADE OU 15 MG (03 COMP) ACIMA DE 6 MESES"
        },
        {
         "de": 10,
         "menor": 14,
         "txt": "20 MG (04 COMP)"
        },
        {
         "de": 14,
         "menor": 20,
         "txt": "25 MG (05 COMP)"
        },
        {
         "de": 20,
         "ate": 20,
         "txt": "30 MG (06 COMP)"
        },
        {
         "acima": 20,
         "txt": "30 MG (06 COMP). ACIMA DE 6 ANOS QUE ENGOLE COMPRIMIDO: DOLUTEGRAVIR 50 MG 01 COMPRIMIDO 01 VEZ AO DIA"
        }
       ]
      }
     ]
    ],
    "orient": [
     "INICIAR O MAIS CEDO POSSÍVEL (IDEALMENTE EM ATÉ 2 H; NO MÁXIMO 72 H) E MANTER POR 28 DIAS SEM INTERRUPÇÃO",
     "MENORES DE 4 SEMANAS OU < 3 KG: ESQUEMA NEONATAL ESPECÍFICO DO PCDT — DISCUTIR COM INFECTOLOGIA PEDIÁTRICA; ABACAVIR É CONTRAINDICADO NA PEP",
     "SEM POSSIBILIDADE DE DOLUTEGRAVIR: LOPINAVIR/RITONAVIR (230/57,5 MG/M² DE 12/12H, A PARTIR DE 1 ANO) OU DARUNAVIR/RITONAVIR (≥ 3 ANOS E ≥ 15 KG) — PRESCREVER COM O INFECTOLOGISTA",
     "SOLICITAR HEMOGRAMA (AZT PODE CAUSAR ANEMIA E NEUTROPENIA), FUNÇÃO RENAL E HEPÁTICA; RETORNO NO SAE/SERVIÇO DE REFERÊNCIA EM ATÉ 7 DIAS PARA ADESÃO E EFEITOS ADVERSOS"
    ]
   },
   {
    "label": "Padrão — PEP-HIV (≥ 35 kg): tenofovir + lamivudina + dolutegravir por 28 dias",
    "peso": {
     "de": 35
    },
    "mode": "ped",
    "draft": true,
    "items": [
     [
      "TENOFOVIR 300 MG + LAMIVUDINA 300 MG",
      "28 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO 01 VEZ AO DIA, SEMPRE NO MESMO HORÁRIO, POR 28 DIAS",
      "USO ORAL"
     ],
     [
      "DOLUTEGRAVIR 50 MG",
      "28 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO 01 VEZ AO DIA, JUNTO COM O TENOFOVIR + LAMIVUDINA, POR 28 DIAS",
      "USO ORAL"
     ]
    ],
    "orient": [
     "TENOFOVIR SÓ A PARTIR DE 35 KG; SE CONTRAINDICADO (DOENÇA RENAL), TROCAR POR ZIDOVUDINA/LAMIVUDINA 300/150 MG 01 COMPRIMIDO DE 12/12H",
     "NÃO TOMAR O DOLUTEGRAVIR JUNTO COM ANTIÁCIDOS, FERRO, CÁLCIO OU ZINCO (TOMAR 2 H ANTES OU 6 H DEPOIS)"
    ]
   },
   {
    "label": "Hepatite B — não vacinado ou esquema incompleto: vacina + IGHAHB",
    "mode": "ped",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "VACINA HEPATITE B (RECOMBINANTE)",
      "01 DOSE",
      "APLICAR 0,5 ML IM (MENORES DE 20 ANOS) E INICIAR OU COMPLETAR O ESQUEMA DE 03 DOSES (0, 1 E 6 MESES)",
      "USO INTRAMUSCULAR"
     ],
     [
      "IMUNOGLOBULINA HUMANA ANTI-HEPATITE B (IGHAHB)",
      "01 FRASCO-AMPOLA",
      "APLICAR {DOSE} IM EM DOSE ÚNICA, EM MEMBRO DIFERENTE DA VACINA, IDEALMENTE NAS PRIMEIRAS 24 H E ATÉ 14 DIAS DA EXPOSIÇÃO — SOLICITAR AO CRIE (0,06 ML/KG; MÁXIMO 5 ML)",
      "USO INTRAMUSCULAR",
      {
       "kg": 0.06,
       "un": "ML",
       "max": 5
      }
     ]
    ],
    "orient": [
     "DISPENSÁVEL SE ESQUEMA VACINAL COMPLETO DOCUMENTADO; COLETAR HBSAG ANTES, SEM ATRASAR A PROFILAXIA PELO RESULTADO"
    ]
   },
   {
    "label": "Contracepção de emergência — adolescente após a menarca",
    "mode": "ped",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "LEVONORGESTREL 0,75 MG",
      "02 COMPRIMIDOS",
      "TOMAR OS 02 COMPRIMIDOS EM DOSE ÚNICA, O MAIS CEDO POSSÍVEL (ATÉ 5 DIAS APÓS A VIOLÊNCIA)",
      "USO ORAL"
     ]
    ],
    "orient": [
     "NÃO INDICADA NA PRÉ-PÚBERE; NÃO TOMAR JUNTO COM O METRONIDAZOL. EM CASO DE GRAVIDEZ DECORRENTE DE VIOLÊNCIA SEXUAL, ORIENTAR SOBRE O DIREITO À INTERRUPÇÃO LEGAL E ENCAMINHAR AO SERVIÇO DE REFERÊNCIA"
    ]
   }
  ]
 },
 {
  "id": "peconhentos",
  "ic": "🦂",
  "nm": "Acidentes por animais peçonhentos (escorpião, serpente, aranha e lagarta)",
  "sub": "lidocaína local · dipirona · soro antiescorpiônico · soro antiofídico",
  "blocks": [
   {
    "label": "Padrão — Dor local (escorpião): anestesia local + analgesia",
    "mode": "internacao",
    "draft": true,
    "items": [
     [
      "LIDOCAÍNA 2% SEM VASOCONSTRITOR",
      "01 FRASCO-AMPOLA",
      "INFILTRAR NO LOCAL DA PICADA 3 A 4 ML (CRIANÇA: 1 A 2 ML, SEM PASSAR DE 0,2 ML/KG = 4 MG/KG POR APLICAÇÃO); PODE REPETIR ATÉ 3 VEZES COM INTERVALO DE 40 A 60 MINUTOS SE A DOR VOLTAR",
      "USO SUBCUTÂNEO"
     ],
     [
      "DIPIRONA 500 MG/ML SOLUÇÃO INJETÁVEL",
      "01 AMPOLA 2 ML",
      "ADMINISTRAR 01 G (02 ML) EV DILUÍDO EM 100 ML DE SF 0,9% EM 15 MINUTOS, DE 6/6H (HORÁRIO FIXO ENQUANTO DOR MODERADA A INTENSA)",
      "USO ENDOVENOSO"
     ]
    ],
    "orient": [
     "ESCORPIÃO — DOR: DIPIRONA VO (LEVE), DIPIRONA EV (MODERADA), INFILTRAÇÃO DE LIDOCAÍNA SEM VASOCONSTRITOR (INTENSA) E OPIOIDE FRACO SE A DOR VOLTAR; COMPRESSA MORNA AJUDA",
     "REGIÃO AMAZÔNICA (TITYUS OBSCURUS): HÁ INCERTEZA SOBRE O BLOQUEIO ANESTÉSICO; MANIFESTAÇÕES NEUROMUSCULARES PODEM PEDIR BENZODIAZEPÍNICO",
     "DEXAMETASONA, CORTICOIDE OU ANTI-HISTAMÍNICO PROFILÁTICOS ANTES DO SORO NÃO SÃO RECOMENDADOS; ANTIBIÓTICO PROFILÁTICO NÃO É INDICADO; TÉTANO CONFORME O CALENDÁRIO VACINAL",
     "OBSERVAÇÃO: SEM SINTOMAS 4 H; LEVE 6 A 12 H; APÓS O SORO, NO MÍNIMO 24 H. DÚVIDA: DISQUE-INTOXICAÇÃO 0800 722 6001; NOTIFICAR"
    ]
   },
   {
    "label": "Padrão — Escorpião moderado ou grave: soro (em hospital de referência)",
    "mode": "internacao",
    "draft": true,
    "items": [
     [
      "SORO ANTIESCORPIÔNICO (SAESC)",
      "AMPOLAS CONFORME GRAVIDADE",
      "LEVE (SÓ DOR LOCAL): SEM SORO. MODERADO (MANIFESTAÇÕES SISTÊMICAS DISCRETAS NÃO EXPLICADAS SÓ PELA DOR): 3 AMPOLAS. GRAVE: 6 AMPOLAS (MÁXIMO 6, EM QUALQUER IDADE). EV, DILUÍDO 1:2 A 1:5 EM SF 0,9% OU SG 5%, EM 10 A 15 MINUTOS (SORO ANTIARACNÍDICO: 20 A 60 MINUTOS), EM HOSPITAL DE REFERÊNCIA, COM MONITORIZAÇÃO E MATERIAL PARA ANAFILAXIA; SEM PRÉ-MEDICAÇÃO. CRIANÇA: MESMA DOSE, COM CUIDADO NO VOLUME DA DILUIÇÃO. NA FALTA, SORO ANTIARACNÍDICO (SAA) NAS MESMAS DOSES",
      "USO ENDOVENOSO"
     ]
    ]
   },
   {
    "label": "Padrão — Serpente (botrópico, crotálico, laquético ou elapídico): soro específico pelo gênero e gravidade",
    "mode": "internacao",
    "draft": true,
    "items": [
     [
      "SORO ANTIOFÍDICO ESPECÍFICO (ANTIBOTRÓPICO, ANTICROTÁLICO, ANTIBOTRÓPICO-LAQUÉTICO OU ANTIELAPÍDICO)",
      "AMPOLAS CONFORME GÊNERO E GRAVIDADE",
      "AMPOLAS CONFORME O GÊNERO E A GRAVIDADE (MESMA DOSE EM CRIANÇAS) — BOTRÓPICO: LEVE 3, MODERADO 6, GRAVE 12; LAQUÉTICO: MODERADO 10, GRAVE 20; CROTÁLICO: LEVE 5, MODERADO 10, GRAVE 20; ELAPÍDICO: LEVE SEM SORO (OBSERVAR NO MÍNIMO 24 H), MODERADO 5, GRAVE 10. DOSE INTEIRA DE UMA VEZ, EV, DILUÍDA EM SF 0,9% OU SG 5% (ANTIELAPÍDICO 1:2 A 1:5), A 8–12 ML/MIN, EM HOSPITAL DE REFERÊNCIA, COM MONITORIZAÇÃO E MATERIAL PARA ANAFILAXIA; SEM PRÉ-MEDICAÇÃO. COLHER TEMPO DE COAGULAÇÃO ANTES. NÃO FAZER TORNIQUETE, INCISÃO, SUCÇÃO, BLOQUEIO ANESTÉSICO NO LOCAL NEM INJEÇÕES IM; ELEVAR O MEMBRO E HIDRATAR; SEM AINE",
      "USO ENDOVENOSO"
     ]
    ]
   },
   {
    "label": "Padrão — Escorpião, quadro leve (só dor local), após observação: analgésico — escolha 1",
    "draft": true,
    "menu": true,
    "items": [
     [
      "DIPIRONA 500 MG",
      "01 CAIXA",
      "TOMAR 02 COMPRIMIDOS SE DOR OU FEBRE, PODENDO REPETIR DE 6/6H"
     ],
     [
      "PARACETAMOL 750 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO SE DOR OU FEBRE, PODENDO REPETIR DE 6/6H. INTERCALAR COM DIPIRONA, SE NECESSÁRIO."
     ]
    ],
    "orient": [
     "LAVAR O LOCAL COM ÁGUA E SABÃO; COMPRESSA MORNA PODE ALIVIAR A DOR",
     "NÃO FAZER TORNIQUETE (GARROTE), NÃO CORTAR, NÃO FURAR NEM CHUPAR O LOCAL DA PICADA",
     "RETORNAR IMEDIATAMENTE SE VÔMITOS, SUOR EXCESSIVO, SALIVAÇÃO, AGITAÇÃO OU SONOLÊNCIA, TREMORES, FALTA DE AR OU CORAÇÃO ACELERADO (SINAIS DE ENVENENAMENTO)",
     "PARA EVITAR NOVOS ACIDENTES: SACUDIR ROUPAS E SAPATOS ANTES DE USAR, VEDAR RALOS E FRESTAS E MANTER O QUINTAL LIMPO, SEM ENTULHO"
    ]
   },
   {
    "label": "Padrão — Dor local (escorpião): anestesia local + analgesia pelo peso",
    "mode": "ped_internacao",
    "draft": true,
    "items": [
     [
      "LIDOCAÍNA 2% SEM VASOCONSTRITOR",
      "01 FRASCO-AMPOLA",
      "INFILTRAR NO LOCAL DA PICADA 3 A 4 ML (CRIANÇA: 1 A 2 ML, SEM PASSAR DE 0,2 ML/KG = 4 MG/KG POR APLICAÇÃO); PODE REPETIR ATÉ 3 VEZES COM INTERVALO DE 40 A 60 MINUTOS SE A DOR VOLTAR",
      "USO SUBCUTÂNEO"
     ],
     [
      "DIPIRONA 500 MG/ML SOLUÇÃO INJETÁVEL",
      "01 AMPOLA 2 ML",
      "ADMINISTRAR {DOSE} EV LENTO, DILUÍDO EM ÁGUA DESTILADA OU SF 0,9%, ATÉ DE 6/6H SE DOR (15 MG/KG/DOSE; NÃO USAR EM MENORES DE 3 MESES OU COM MENOS DE 5 KG)",
      "USO ENDOVENOSO",
      {
       "kg": 15,
       "conc": 500,
       "un": "ML",
       "max": 1000
      }
     ]
    ],
    "orient": [
     "ESCORPIÃO — DOR: DIPIRONA VO (LEVE), DIPIRONA EV (MODERADA), INFILTRAÇÃO DE LIDOCAÍNA SEM VASOCONSTRITOR (INTENSA) E OPIOIDE FRACO SE A DOR VOLTAR; COMPRESSA MORNA AJUDA",
     "REGIÃO AMAZÔNICA (TITYUS OBSCURUS): HÁ INCERTEZA SOBRE O BLOQUEIO ANESTÉSICO; MANIFESTAÇÕES NEUROMUSCULARES PODEM PEDIR BENZODIAZEPÍNICO",
     "DEXAMETASONA, CORTICOIDE OU ANTI-HISTAMÍNICO PROFILÁTICOS ANTES DO SORO NÃO SÃO RECOMENDADOS; ANTIBIÓTICO PROFILÁTICO NÃO É INDICADO; TÉTANO CONFORME O CALENDÁRIO VACINAL",
     "OBSERVAÇÃO: SEM SINTOMAS 4 H; LEVE 6 A 12 H; APÓS O SORO, NO MÍNIMO 24 H. DÚVIDA: DISQUE-INTOXICAÇÃO 0800 722 6001; NOTIFICAR"
    ]
   },
   {
    "label": "Padrão — Escorpião moderado ou grave: soro (mesma dose do adulto)",
    "mode": "ped_internacao",
    "draft": true,
    "items": [
     [
      "SORO ANTIESCORPIÔNICO (SAESC)",
      "AMPOLAS CONFORME GRAVIDADE",
      "LEVE (SÓ DOR LOCAL): SEM SORO. MODERADO (MANIFESTAÇÕES SISTÊMICAS DISCRETAS NÃO EXPLICADAS SÓ PELA DOR): 3 AMPOLAS. GRAVE: 6 AMPOLAS (MÁXIMO 6, EM QUALQUER IDADE). EV, DILUÍDO 1:2 A 1:5 EM SF 0,9% OU SG 5%, EM 10 A 15 MINUTOS (SORO ANTIARACNÍDICO: 20 A 60 MINUTOS), EM HOSPITAL DE REFERÊNCIA, COM MONITORIZAÇÃO E MATERIAL PARA ANAFILAXIA; SEM PRÉ-MEDICAÇÃO. CRIANÇA: MESMA DOSE, COM CUIDADO NO VOLUME DA DILUIÇÃO. NA FALTA, SORO ANTIARACNÍDICO (SAA) NAS MESMAS DOSES",
      "USO ENDOVENOSO"
     ]
    ]
   },
   {
    "label": "Padrão — Escorpião leve (só dor local), após observação: analgésico pelo peso — escolha 1",
    "mode": "ped",
    "draft": true,
    "menu": true,
    "items": [
     [
      "DIPIRONA 500 MG/ML SOLUÇÃO ORAL (GOTAS)",
      "01 FRASCO",
      "DAR {DOSE} VIA ORAL ATÉ DE 6/6H SE DOR OU FEBRE (15 MG/KG/DOSE; NÃO USAR EM MENORES DE 3 MESES OU COM MENOS DE 5 KG)",
      "USO ORAL",
      {
       "kg": 15,
       "conc": 500,
       "gotas": 20,
       "un": "GOTAS",
       "max": 1000
      }
     ],
     [
      "PARACETAMOL 200 MG/ML SOLUÇÃO ORAL (GOTAS)",
      "01 FRASCO",
      "DAR {DOSE} VIA ORAL ATÉ DE 6/6H SE DOR OU FEBRE (15 MG/KG/DOSE)",
      "USO ORAL",
      {
       "kg": 15,
       "conc": 200,
       "gotas": 15,
       "un": "GOTAS",
       "max": 750
      }
     ]
    ],
    "orient": [
     "LAVAR O LOCAL COM ÁGUA E SABÃO; COMPRESSA MORNA PODE ALIVIAR A DOR",
     "NÃO FAZER TORNIQUETE (GARROTE), NÃO CORTAR, NÃO FURAR NEM CHUPAR O LOCAL DA PICADA",
     "RETORNAR IMEDIATAMENTE SE A CRIANÇA VOMITAR, SUAR MUITO, BABAR, FICAR AGITADA OU SONOLENTA, TIVER TREMORES, FALTA DE AR OU CORAÇÃO ACELERADO"
    ]
   },
   {
    "label": "Padrão — Aranha armadeira (foneutrismo) ou marrom (loxoscelismo): soro conforme a gravidade + prednisona no loxoscelismo",
    "mode": "internacao",
    "draft": true,
    "items": [
     [
      "SORO ANTIARACNÍDICO (SAAR) OU ANTILOXOSCÉLICO (SALOX)",
      "AMPOLAS CONFORME TIPO E GRAVIDADE",
      "ARMADEIRA (FONEUTRISMO) — LEVE (DOR, EDEMA E SUDORESE LOCAIS): SEM SORO, TRATAR A DOR (LIDOCAÍNA LOCAL + ANALGÉSICO); MODERADO (DOR INTENSA, VÔMITOS OCASIONAIS, AGITAÇÃO, HIPERTENSÃO): 2 A 4 AMPOLAS DE SAAR; GRAVE (SUDORESE PROFUSA, SIALORREIA, VÔMITOS PROFUSOS, PRIAPISMO, CHOQUE, EDEMA PULMONAR): 5 A 10 AMPOLAS. MARROM (LOXOSCELISMO) — LEVE (ARANHA IDENTIFICADA, LESÃO INCARACTERÍSTICA, SEM SINTOMAS SISTÊMICOS): SEM SORO, REAVALIAR EM 24 A 72 H; MODERADO (LESÃO SUGESTIVA OU CARACTERÍSTICA, SEM HEMÓLISE): 5 AMPOLAS; GRAVE (HEMÓLISE): 10 AMPOLAS — PREFERIR SALOX (SAAR NA FALTA). MESMA DOSE EM CRIANÇAS. EV, DOSE INTEIRA DE UMA VEZ, EM HOSPITAL DE REFERÊNCIA, COM MATERIAL PARA ANAFILAXIA; OBSERVAR NO MÍNIMO 24 H APÓS O SORO",
      "USO ENDOVENOSO"
     ],
     [
      "PREDNISONA 20 MG",
      "10 COMPRIMIDOS",
      "LOXOSCELISMO MODERADO OU GRAVE (JUNTO COM O SORO): TOMAR 02 COMPRIMIDOS (40 MG) 01 VEZ AO DIA, PELA MANHÃ, POR 05 DIAS",
      "USO ORAL"
     ]
    ],
    "orient": [
     "LOXOSCELISMO: QUANTO MAIS CEDO O SORO, MELHOR; COM A NECROSE JÁ DELIMITADA, CURATIVOS, LIMPEZA E AVALIAÇÃO CIRÚRGICA",
     "FONEUTRISMO COM DOR QUE NÃO CEDE À INFILTRAÇÃO (PODE REPETIR EM 60 MIN): OPIOIDE (O GUIA DE VIGILÂNCIA CITA MEPERIDINA 50 A 100 MG IM NO ADULTO; 1 MG/KG NA CRIANÇA)",
     "VIÚVA-NEGRA (LATRODECTISMO): TRATAMENTO SINTOMÁTICO (DIAZEPAM, GLUCONATO DE CÁLCIO, ANALGÉSICO) E OBSERVAÇÃO POR NO MÍNIMO 24 H",
     "DÚVIDA NA IDENTIFICAÇÃO OU NA CONDUTA: DISQUE-INTOXICAÇÃO 0800 722 6001; NOTIFICAR O ACIDENTE"
    ]
   },
   {
    "label": "Padrão — Aranha armadeira (foneutrismo) ou marrom (loxoscelismo): soro conforme a gravidade + prednisolona pelo peso no loxoscelismo",
    "mode": "ped_internacao",
    "draft": true,
    "items": [
     [
      "SORO ANTIARACNÍDICO (SAAR) OU ANTILOXOSCÉLICO (SALOX)",
      "AMPOLAS CONFORME TIPO E GRAVIDADE",
      "ARMADEIRA (FONEUTRISMO) — LEVE (DOR, EDEMA E SUDORESE LOCAIS): SEM SORO, TRATAR A DOR (LIDOCAÍNA LOCAL + ANALGÉSICO); MODERADO (DOR INTENSA, VÔMITOS OCASIONAIS, AGITAÇÃO, HIPERTENSÃO): 2 A 4 AMPOLAS DE SAAR; GRAVE (SUDORESE PROFUSA, SIALORREIA, VÔMITOS PROFUSOS, PRIAPISMO, CHOQUE, EDEMA PULMONAR): 5 A 10 AMPOLAS. MARROM (LOXOSCELISMO) — LEVE (ARANHA IDENTIFICADA, LESÃO INCARACTERÍSTICA, SEM SINTOMAS SISTÊMICOS): SEM SORO, REAVALIAR EM 24 A 72 H; MODERADO (LESÃO SUGESTIVA OU CARACTERÍSTICA, SEM HEMÓLISE): 5 AMPOLAS; GRAVE (HEMÓLISE): 10 AMPOLAS — PREFERIR SALOX (SAAR NA FALTA). MESMA DOSE EM CRIANÇAS. EV, DOSE INTEIRA DE UMA VEZ, EM HOSPITAL DE REFERÊNCIA, COM MATERIAL PARA ANAFILAXIA; OBSERVAR NO MÍNIMO 24 H APÓS O SORO",
      "USO ENDOVENOSO"
     ],
     [
      "PREDNISOLONA 3 MG/ML SOLUÇÃO ORAL",
      "01 FRASCO",
      "LOXOSCELISMO MODERADO OU GRAVE (JUNTO COM O SORO): DAR {DOSE} VIA ORAL 01 VEZ AO DIA, PELA MANHÃ, POR 05 DIAS (1 MG/KG/DIA; MÁXIMO 40 MG/DIA)",
      "USO ORAL",
      {
       "kg": 1,
       "conc": 3,
       "un": "ML",
       "max": 40
      }
     ]
    ],
    "orient": [
     "LOXOSCELISMO: QUANTO MAIS CEDO O SORO, MELHOR; COM A NECROSE JÁ DELIMITADA, CURATIVOS, LIMPEZA E AVALIAÇÃO CIRÚRGICA",
     "FONEUTRISMO COM DOR QUE NÃO CEDE À INFILTRAÇÃO (PODE REPETIR EM 60 MIN): OPIOIDE (O GUIA DE VIGILÂNCIA CITA MEPERIDINA 50 A 100 MG IM NO ADULTO; 1 MG/KG NA CRIANÇA)",
     "VIÚVA-NEGRA (LATRODECTISMO): TRATAMENTO SINTOMÁTICO (DIAZEPAM, GLUCONATO DE CÁLCIO, ANALGÉSICO) E OBSERVAÇÃO POR NO MÍNIMO 24 H",
     "DÚVIDA NA IDENTIFICAÇÃO OU NA CONDUTA: DISQUE-INTOXICAÇÃO 0800 722 6001; NOTIFICAR O ACIDENTE"
    ]
   },
   {
    "label": "Padrão — Lagarta Lonomia (taturana) com alteração da coagulação: soro antilonômico",
    "mode": "internacao",
    "draft": true,
    "items": [
     [
      "SORO ANTILONÔMICO (SALON)",
      "AMPOLAS CONFORME GRAVIDADE",
      "LEVE (SÓ QUADRO LOCAL, SEM SANGRAMENTO E COM COAGULAÇÃO NORMAL): SEM SORO — OBSERVAR E REPETIR O TEMPO DE COAGULAÇÃO NAS PRIMEIRAS 24 H. MODERADO (TEMPO DE COAGULAÇÃO ALTERADO, SEM SANGRAMENTO OU SÓ EM PELE E MUCOSAS): 5 AMPOLAS. GRAVE (TEMPO DE COAGULAÇÃO ALTERADO E SANGRAMENTO EM VÍSCERAS — RISCO DE MORTE): 10 AMPOLAS. MESMA DOSE EM CRIANÇAS; EV, EM HOSPITAL DE REFERÊNCIA, COM MATERIAL PARA ANAFILAXIA",
      "USO ENDOVENOSO"
     ]
    ],
    "orient": [
     "QUADRO LOCAL (QUEIMAÇÃO): LAVAR E FAZER COMPRESSAS FRIAS OU GELADAS, ANALGÉSICO, ANTI-HISTAMÍNICO E INFILTRAÇÃO DE LIDOCAÍNA 2% SEM VASOCONSTRITOR",
     "COM SANGRAMENTO OU COAGULOPATIA: REPOUSO E NADA DE INJEÇÃO IM, PUNÇÕES OU CIRURGIA ATÉ NORMALIZAR A COAGULAÇÃO; CONTROLAR FUNÇÃO RENAL E COAGULAÇÃO EM 24 H",
     "DÚVIDA NA IDENTIFICAÇÃO OU NA CONDUTA: DISQUE-INTOXICAÇÃO 0800 722 6001; NOTIFICAR O ACIDENTE"
    ]
   },
   {
    "label": "Padrão — Lagarta Lonomia (taturana) com alteração da coagulação: soro antilonômico (mesma dose do adulto)",
    "mode": "ped_internacao",
    "draft": true,
    "items": [
     [
      "SORO ANTILONÔMICO (SALON)",
      "AMPOLAS CONFORME GRAVIDADE",
      "LEVE (SÓ QUADRO LOCAL, SEM SANGRAMENTO E COM COAGULAÇÃO NORMAL): SEM SORO — OBSERVAR E REPETIR O TEMPO DE COAGULAÇÃO NAS PRIMEIRAS 24 H. MODERADO (TEMPO DE COAGULAÇÃO ALTERADO, SEM SANGRAMENTO OU SÓ EM PELE E MUCOSAS): 5 AMPOLAS. GRAVE (TEMPO DE COAGULAÇÃO ALTERADO E SANGRAMENTO EM VÍSCERAS — RISCO DE MORTE): 10 AMPOLAS. MESMA DOSE EM CRIANÇAS; EV, EM HOSPITAL DE REFERÊNCIA, COM MATERIAL PARA ANAFILAXIA",
      "USO ENDOVENOSO"
     ]
    ],
    "orient": [
     "QUADRO LOCAL (QUEIMAÇÃO): LAVAR E FAZER COMPRESSAS FRIAS OU GELADAS, ANALGÉSICO, ANTI-HISTAMÍNICO E INFILTRAÇÃO DE LIDOCAÍNA 2% SEM VASOCONSTRITOR",
     "COM SANGRAMENTO OU COAGULOPATIA: REPOUSO E NADA DE INJEÇÃO IM, PUNÇÕES OU CIRURGIA ATÉ NORMALIZAR A COAGULAÇÃO; CONTROLAR FUNÇÃO RENAL E COAGULAÇÃO EM 24 H",
     "DÚVIDA NA IDENTIFICAÇÃO OU NA CONDUTA: DISQUE-INTOXICAÇÃO 0800 722 6001; NOTIFICAR O ACIDENTE"
    ]
   }
  ]
 },
 {
  "id": "aftas",
  "ic": "👄",
  "nm": "Aftas orais (estomatite)",
  "sub": "triancinolona · clorexidina · benzidamina",
  "blocks": [
   {
    "label": "Padrão — corticoide tópico + bochechos",
    "draft": true,
    "items": [
     [
      "TRIANCINOLONA ACETONIDA 1 MG/G POMADA OROBASE",
      "01 BISNAGA",
      "APLICAR UMA FINA CAMADA SOBRE A LESÃO SECA, SEM ESFREGAR, 02 A 03 VEZES AO DIA (APÓS AS REFEIÇÕES E AO DEITAR), ATÉ A CICATRIZAÇÃO (MÁXIMO 07 DIAS). NÃO USAR SE HERPES OU OUTRA INFECÇÃO NA BOCA",
      "USO TÓPICO"
     ],
     [
      "DIGLUCONATO DE CLOREXIDINA 0,12% SOLUÇÃO BUCAL",
      "01 FRASCO",
      "BOCHECHAR 15 ML (SEM DILUIR) POR 30 SEGUNDOS E CUSPIR, DE 12/12H POR 07 DIAS. NÃO ENGOLIR. AGUARDAR 30 MINUTOS APÓS ESCOVAR OS DENTES",
      "USO TÓPICO"
     ],
     [
      "BENZIDAMINA 1,5 MG/ML COLUTÓRIO",
      "01 FRASCO",
      "BOCHECHAR 15 ML POR 30 SEGUNDOS E CUSPIR, SE DOR, ATÉ 03 VEZES AO DIA (DE PREFERÊNCIA ANTES DAS REFEIÇÕES)",
      "USO TÓPICO"
     ]
    ],
    "orient": [
     "APLICAR A POMADA COM A MUCOSA SECA, APÓS AS REFEIÇÕES E A HIGIENE BUCAL, E EVITAR COMER OU BEBER NOS 30 MINUTOS SEGUINTES",
     "EVITAR ALIMENTOS ÁCIDOS, APIMENTADOS, SALGADOS OU DUROS/CROCANTES ENQUANTO HOUVER LESÕES; USAR ESCOVA DE DENTES MACIA E CREME DENTAL SEM LAURIL SULFATO DE SÓDIO",
     "RETORNAR SE A FERIDA NÃO CICATRIZAR EM 02 SEMANAS, FOR MAIOR QUE 01 CM, OU SE HOUVER FEBRE, DIFICULDADE PARA ENGOLIR OU BEBER LÍQUIDOS, OU FERIDAS NOS OLHOS, GENITAIS OU PELE",
     "CRISES FREQUENTES: SOLICITAR HEMOGRAMA, FERRITINA, VITAMINA B12, ÁCIDO FÓLICO, ANTICORPOS PARA DOENÇA CELÍACA E ANTI-HIV. ÚLCERA ORAL HÁ MAIS DE 03 SEMANAS: ENCAMINHAR PARA BIÓPSIA (EXCLUIR NEOPLASIA)"
    ]
   },
   {
    "label": "Alívio da dor antes das refeições: lidocaína pomada sobre a afta (sem antibiótico)",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "LIDOCAÍNA 50 MG/G POMADA (USO EM MUCOSA ORAL)",
      "01 BISNAGA",
      "APLICAR PEQUENA QUANTIDADE SOBRE A AFTA COM COTONETE, ANTES DAS REFEIÇÕES, ATÉ 04 VEZES AO DIA. ESPERAR A DORMÊNCIA PASSAR PARA COMER OU BEBER QUENTE (RISCO DE QUEIMAR OU MORDER A BOCA). NÃO USAR EM MENORES DE 5 ANOS",
      "USO TÓPICO"
     ]
    ]
   },
   {
    "label": "Padrão — Feridas na boca na criança (afta, herpes, mão-pé-boca): alívio da dor pelo peso e hidratação — escolha 1",
    "mode": "ped",
    "draft": true,
    "menu": true,
    "items": [
     [
      "DIPIRONA 500 MG/ML SOLUÇÃO ORAL (GOTAS)",
      "01 FRASCO",
      "DAR {DOSE} VIA ORAL ATÉ DE 6/6H SE DOR OU FEBRE (15 MG/KG/DOSE; NÃO USAR EM MENORES DE 3 MESES OU COM MENOS DE 5 KG)",
      "USO ORAL",
      {
       "kg": 15,
       "conc": 500,
       "gotas": 20,
       "un": "GOTAS",
       "max": 1000
      }
     ],
     [
      "PARACETAMOL 200 MG/ML SOLUÇÃO ORAL (GOTAS)",
      "01 FRASCO",
      "DAR {DOSE} VIA ORAL ATÉ DE 6/6H SE DOR OU FEBRE (15 MG/KG/DOSE; MÁXIMO 75 MG/KG/DIA)",
      "USO ORAL",
      {
       "kg": 15,
       "conc": 200,
       "gotas": 15,
       "un": "GOTAS",
       "max": 750
      }
     ],
     [
      "IBUPROFENO 100 MG/ML SUSPENSÃO ORAL (GOTAS)",
      "01 FRASCO",
      "DAR {DOSE} VIA ORAL ATÉ DE 8/8H SE DOR OU FEBRE, APÓS ALIMENTAÇÃO (10 MG/KG/DOSE; SOMENTE A PARTIR DE 6 MESES; NÃO USAR SE SUSPEITA DE DENGUE, VARICELA, DESIDRATAÇÃO OU VÔMITOS)",
      "USO ORAL",
      {
       "kg": 10,
       "conc": 100,
       "gotas": 10,
       "un": "GOTAS",
       "max": 400
      }
     ]
    ],
    "orient": [
     "NA CRIANÇA, A MAIORIA DAS FERIDAS NA BOCA É CAUSADA POR VÍRUS (HERPES, MÃO-PÉ-BOCA, HERPANGINA) E MELHORA EM 07 A 10 DIAS",
     "OFERECER LÍQUIDOS E ALIMENTOS FRIOS E PASTOSOS, EM POUCA QUANTIDADE E VÁRIAS VEZES AO DIA; EVITAR ALIMENTOS ÁCIDOS, SALGADOS OU QUENTES",
     "DAR O ANALGÉSICO CERCA DE 30 MINUTOS ANTES DAS REFEIÇÕES AJUDA A CRIANÇA A ACEITAR LÍQUIDOS",
     "RETORNAR IMEDIATAMENTE SE A CRIANÇA NÃO CONSEGUIR BEBER, URINAR POUCO, ESTIVER MUITO SONOLENTA, TIVER FEBRE ALTA POR MAIS DE 03 DIAS OU SE A FERIDA NÃO CICATRIZAR EM 02 SEMANAS"
    ]
   }
  ]
 },
 {
  "id": "agitacao_psicomotora",
  "ic": "😵",
  "nm": "Agitação psicomotora / intoxicação alcoólica aguda",
  "sub": "haloperidol · prometazina · midazolam · risperidona · tiamina",
  "blocks": [
   {
    "label": "Padrão — Agitação leve a moderada, aceita via oral — escolha 1",
    "mode": "internacao",
    "draft": true,
    "menu": true,
    "items": [
     [
      "HALOPERIDOL 5 MG",
      "01 COMPRIMIDO",
      "ADMINISTRAR 01 COMPRIMIDO (5 MG) VIA ORAL; SE NECESSÁRIO, REPETIR SÓ APÓS 8 HORAS (MÁXIMO 15 MG EM 24 H)",
      "USO ORAL"
     ],
     [
      "RISPERIDONA 2 MG",
      "01 COMPRIMIDO",
      "ADMINISTRAR 01 COMPRIMIDO (2 MG) VIA ORAL; PODE REPETIR APÓS 60 MINUTOS SE NECESSÁRIO (MÁXIMO 8 MG EM 24 H)",
      "USO ORAL"
     ]
    ]
   },
   {
    "label": "Padrão — Agitação grave, sem colaboração: haloperidol + prometazina IM",
    "mode": "internacao",
    "draft": true,
    "items": [
     [
      "HALOPERIDOL 5 MG/ML SOLUÇÃO INJETÁVEL",
      "01 AMPOLA 1 ML",
      "APLICAR 5 MG (1 ML) IM (IDOSO: 2,5 MG); PODE REPETIR APÓS 30 MINUTOS SE NECESSÁRIO (MÁXIMO 30 MG EM 24 H). MONITORIZAR SINAIS VITAIS; ECG SE CARDIOPATIA, DISTÚRBIO ELETROLÍTICO OU HISTÓRIA DESCONHECIDA",
      "USO INTRAMUSCULAR"
     ],
     [
      "PROMETAZINA 25 MG/ML SOLUÇÃO INJETÁVEL",
      "01 AMPOLA 2 ML",
      "APLICAR 50 MG (2 ML) IM PROFUNDO, JUNTO COM O HALOPERIDOL (REDUZ REAÇÕES EXTRAPIRAMIDAIS); MÁXIMO 100 MG EM 24 H. NÃO APLICAR EV",
      "USO INTRAMUSCULAR"
     ]
    ]
   },
   {
    "label": "Padrão — Intoxicação alcoólica aguda: tiamina antes da glicose; glicemia capilar",
    "mode": "internacao",
    "draft": true,
    "items": [
     [
      "TIAMINA (CLORIDRATO) 100 MG/ML SOLUÇÃO INJETÁVEL",
      "01 AMPOLA 1 ML",
      "ADMINISTRAR 100 MG (1 ML) IM OU EV, ANTES DE QUALQUER SOLUÇÃO GLICOSADA",
      "USO INTRAMUSCULAR"
     ],
     [
      "GLICOSE 50% SOLUÇÃO INJETÁVEL",
      "10 AMPOLAS 10 ML",
      "SE GLICEMIA CAPILAR < 70 MG/DL E NÃO CONSEGUE INGERIR POR VIA ORAL: ADMINISTRAR 50 ML (25 G) EV EM VEIA CALIBROSA; REPETIR A GLICEMIA EM 15 MINUTOS E REPETIR A DOSE SE AINDA < 70 MG/DL. ETILISTA OU DESNUTRIDO: TIAMINA 100 MG EV ANTES OU JUNTO, SEM ATRASAR A GLICOSE. NÃO DAR ALTA SE A HIPOGLICEMIA FOR POR SULFONILUREIA OU INSULINA DE AÇÃO LONGA: OBSERVAR DE 12 A 24 H COM SORO GLICOSADO E GLICEMIAS SERIADAS",
      "USO ENDOVENOSO"
     ]
    ]
   },
   {
    "label": "Alternativa: midazolam IM (agitação por estimulante ou abstinência; evitar se intoxicação alcoólica ou por outro depressor)",
    "mode": "internacao",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "MIDAZOLAM 5 MG/ML SOLUÇÃO INJETÁVEL",
      "01 AMPOLA 3 ML",
      "ADULTO: APLICAR 7,5 A 15 MG (1,5 A 3 ML) IM; IDOSO, FRÁGIL, BAIXO PESO OU DOENÇA PULMONAR: 2,5 A 5 MG (0,5 A 1 ML). PODE REPETIR APÓS 20-30 MIN SE NECESSÁRIO. NÃO USAR SE INTOXICAÇÃO POR ÁLCOOL OU OUTRO DEPRESSOR. MONITORIZAR SATURAÇÃO, FREQUÊNCIA RESPIRATÓRIA E NÍVEL DE CONSCIÊNCIA, COM MATERIAL DE VIA AÉREA",
      "USO INTRAMUSCULAR"
     ]
    ]
   }
  ]
 },
 {
  "id": "alergia",
  "ic": "🌿",
  "nm": "Alergia / Prurido",
  "sub": "loratadina · cetirizina · hidroxizina · prednisona",
  "blocks": [
   {
    "label": "Padrão — Anti-histamínico — escolha 1",
    "draft": true,
    "menu": true,
    "items": [
     [
      "LORATADINA 10 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO AO DIA, NO MESMO HORÁRIO, TODOS OS DIAS ENQUANTO HOUVER LESÕES, COCEIRA OU ESPIRROS E POR MAIS 03 A 05 DIAS DEPOIS QUE MELHORAR"
     ],
     [
      "CETIRIZINA 10MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO AO DIA, NO MESMO HORÁRIO, TODOS OS DIAS ENQUANTO HOUVER LESÕES, COCEIRA OU ESPIRROS E POR MAIS 03 A 05 DIAS DEPOIS QUE MELHORAR"
     ],
     [
      "LEVOCETIRIZINA 5MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO AO DIA, NO MESMO HORÁRIO, TODOS OS DIAS ENQUANTO HOUVER LESÕES, COCEIRA OU ESPIRROS E POR MAIS 03 A 05 DIAS DEPOIS QUE MELHORAR"
     ]
    ],
    "orient": [
     "EVITAR O PROVÁVEL DESENCADEANTE (ALIMENTO, MEDICAMENTO, PRODUTO DE CONTATO) E EVITAR AAS E ANTI-INFLAMATÓRIOS, QUE PODEM PIORAR A URTICÁRIA",
     "PREFERIR BANHOS MORNOS OU FRIOS, COMPRESSAS FRIAS E HIDRATANTE SEM PERFUME NA PELE; EVITAR COÇAR, ÁGUA QUENTE E ROUPAS APERTADAS",
     "SE AS LESÕES PERSISTIREM OU REAPARECEREM POR MAIS DE 06 SEMANAS, PROCURAR A UBS PARA INVESTIGAÇÃO DE URTICÁRIA CRÔNICA",
     "RETORNAR IMEDIATAMENTE (OU PROCURAR O PRONTO-SOCORRO) SE FALTA DE AR, CHIADO NO PEITO, INCHAÇO DE LÁBIOS, LÍNGUA OU GARGANTA, ROUQUIDÃO, VÔMITOS, TONTURA OU DESMAIO"
    ]
   },
   {
    "label": "Padrão — quadro intenso/extenso: associar corticoide oral por 05 dias",
    "draft": true,
    "items": [
     [
      "PREDNISONA 20 MG",
      "10 COMPRIMIDOS",
      "TOMAR 02 COMPRIMIDOS PELA MANHÃ, APÓS O CAFÉ, POR 05 DIAS"
     ]
    ]
   },
   {
    "label": "Combinação pronta — anti-histamínico H1 de 2ª geração",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "LORATADINA 10 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO AO DIA, NO MESMO HORÁRIO, TODOS OS DIAS ENQUANTO HOUVER LESÕES, COCEIRA OU ESPIRROS E POR MAIS 03 A 05 DIAS DEPOIS QUE MELHORAR"
     ]
    ]
   },
   {
    "label": "Menor custo — hidroxizina + prednisona 20 mg (1ª geração: dá sono, evitar em idosos e motoristas)",
    "sec": "offlabel",
    "items": [
     [
      "HIDROXIZINA 25MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO DE 12/12H POR 05 DIAS"
     ],
     [
      "PREDNISONA 20MG",
      "10 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO ÀS 08:00 DA MANHÃ POR 05 DIAS"
     ]
    ]
   },
   {
    "label": "Urticária intensa — loratadina + prednisona 20 mg por 05 dias",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "LORATADINA 10 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO AO DIA, NO MESMO HORÁRIO, TODOS OS DIAS ENQUANTO HOUVER LESÕES, COCEIRA OU ESPIRROS E POR MAIS 03 A 05 DIAS DEPOIS QUE MELHORAR"
     ],
     [
      "PREDNISONA 20MG",
      "10 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO ÀS 08:00 DA MANHÃ POR 05 DIAS"
     ]
    ]
   },
   {
    "label": "Urticária intensa — cetirizina + prednisona 20 mg por 05 dias",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "CETIRIZINA 10MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO AO DIA, NO MESMO HORÁRIO, TODOS OS DIAS ENQUANTO HOUVER LESÕES, COCEIRA OU ESPIRROS E POR MAIS 03 A 05 DIAS DEPOIS QUE MELHORAR"
     ],
     [
      "PREDNISONA 20MG",
      "10 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO ÀS 08:00 DA MANHÃ POR 05 DIAS"
     ]
    ]
   },
   {
    "label": "Urticária intensa — levocetirizina + prednisona 20 mg por 05 dias",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "LEVOCETIRIZINA 5MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO AO DIA, NO MESMO HORÁRIO, TODOS OS DIAS ENQUANTO HOUVER LESÕES, COCEIRA OU ESPIRROS E POR MAIS 03 A 05 DIAS DEPOIS QUE MELHORAR"
     ],
     [
      "PREDNISONA 20MG",
      "10 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO ÀS 08:00 DA MANHÃ POR 05 DIAS"
     ]
    ]
   },
   {
    "label": "Rinite com nariz entupido (adulto) — fexofenadina + pseudoefedrina por até 07 dias",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "FEXOFENADINA 60MG + PSEUDOEFEDRINA 120MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO DE 12/12H SE ESPIRROS, CORIZA E NARIZ ENTUPIDO, POR NO MÁXIMO 05 A 07 DIAS. NÃO USAR SE HIPERTENSÃO GRAVE OU NÃO CONTROLADA, DOENÇA CORONARIANA, GLAUCOMA DE ÂNGULO FECHADO, RETENÇÃO URINÁRIA OU USO DE IMAO"
     ]
    ]
   },
   {
    "label": "Anti-histamínico — escolha 1",
    "sec": "offlabel",
    "draft": true,
    "menu": true,
    "items": [
     [
      "LORATADINA 10 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO AO DIA, NO MESMO HORÁRIO, TODOS OS DIAS ENQUANTO HOUVER LESÕES, COCEIRA OU ESPIRROS E POR MAIS 03 A 05 DIAS DEPOIS QUE MELHORAR"
     ],
     [
      "CETIRIZINA 10MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO AO DIA, NO MESMO HORÁRIO, TODOS OS DIAS ENQUANTO HOUVER LESÕES, COCEIRA OU ESPIRROS E POR MAIS 03 A 05 DIAS DEPOIS QUE MELHORAR"
     ]
    ]
   },
   {
    "label": "Padrão — urticária aguda extensa / angioedema sem anafilaxia (observação)",
    "mode": "internacao",
    "draft": true,
    "items": [
     [
      "LORATADINA 10 MG",
      "01 COMPRIMIDO",
      "ADMINISTRAR 01 COMPRIMIDO VIA ORAL AGORA E MANTER 01 VEZ AO DIA",
      "USO ORAL"
     ],
     [
      "PREDNISONA 20 MG",
      "02 COMPRIMIDOS",
      "ADMINISTRAR 40 MG (02 COMPRIMIDOS) VIA ORAL 01 VEZ AO DIA, PELA MANHÃ (CURSO CURTO DE 03 A 05 DIAS)",
      "USO ORAL"
     ],
     [
      "HIDROCORTISONA (SUCCINATO SÓDICO) 100 MG PÓ PARA SOLUÇÃO INJETÁVEL",
      "02 FRASCOS-AMPOLA",
      "SOMENTE SE ANGIOEDEMA EXTENSO OU IMPOSSIBILIDADE DE VIA ORAL (NO LUGAR DA PREDNISONA): ADMINISTRAR 200 MG EV LENTO EM DOSE ÚNICA E REAVALIAR",
      "USO ENDOVENOSO"
     ],
     [
      "PROMETAZINA 25 MG/ML SOLUÇÃO INJETÁVEL",
      "01 AMPOLA 2 ML",
      "SE PRURIDO INTENSO REFRATÁRIO OU IMPOSSIBILIDADE DE VIA ORAL: ADMINISTRAR 25 MG (01 ML) IM PROFUNDO, PODENDO REPETIR APÓS 12H (CAUSA SONOLÊNCIA; NÃO APLICAR EV)",
      "USO INTRAMUSCULAR"
     ]
    ],
    "orient": [
     "SUSPENDER O PROVÁVEL DESENCADEANTE (MEDICAMENTO, ALIMENTO, LÁTEX) E REGISTRAR A ALERGIA NO PRONTUÁRIO; EVITAR AAS E ANTI-INFLAMATÓRIOS",
     "VIGIAR ACOMETIMENTO DE VIA AÉREA OU SISTÊMICO (ROUQUIDÃO, ESTRIDOR, DISFAGIA, EDEMA DE LÍNGUA OU ÚVULA, SIBILÂNCIA, VÔMITOS, HIPOTENSÃO): TRATAR COMO ANAFILAXIA COM ADRENALINA IM IMEDIATA",
     "ANGIOEDEMA SEM URTICÁRIA EM USUÁRIO DE IECA (ENALAPRIL, CAPTOPRIL) OU COM HISTÓRIA FAMILIAR: SUSPEITAR DE ANGIOEDEMA POR BRADICININA, QUE NÃO RESPONDE A ANTI-HISTAMÍNICO/CORTICOIDE — SUSPENDER O IECA E MONITORAR VIA AÉREA",
     "ALTA COM ANTI-HISTAMÍNICO DE 2ª GERAÇÃO (ESQUEMA AMBULATORIAL) E ORIENTAÇÃO DE SINAIS DE ALARME"
    ]
   },
   {
    "label": "Padrão — anafilaxia: adrenalina IM imediata + suporte",
    "mode": "internacao",
    "draft": true,
    "items": [
     [
      "ADRENALINA (EPINEFRINA) 1 MG/ML SOLUÇÃO INJETÁVEL",
      "01 AMPOLA",
      "ADMINISTRAR 0,5 MG (0,5 ML) IM, SEM DILUIR, NA FACE ANTEROLATERAL DA COXA; REPETIR A CADA 05 MINUTOS SE NÃO HOUVER MELHORA",
      "USO INTRAMUSCULAR"
     ],
     [
      "CLORETO DE SÓDIO 0,9% (SORO FISIOLÓGICO)",
      "01 BOLSA 1000 ML",
      "SE HIPOTENSÃO OU MÁ PERFUSÃO: INFUNDIR 500 A 1.000 ML EV EM BOLUS RÁPIDO E REAVALIAR; REPETIR CONFORME RESPOSTA HEMODINÂMICA",
      "USO ENDOVENOSO"
     ],
     [
      "OXIGÊNIO (O2) SOB MÁSCARA NÃO REINALANTE",
      "CONFORME NECESSIDADE",
      "OFERTAR 10 A 15 L/MIN E TITULAR PARA MANTER SPO2 ≥ 94%",
      "USO INALATÓRIO"
     ],
     [
      "SALBUTAMOL SPRAY AEROSSOL 100 MCG",
      "01 FRASCO",
      "SE BRONCOESPASMO PERSISTENTE APÓS ADRENALINA: INALAR 04 A 08 JATOS COM ESPAÇADOR A CADA 20 MINUTOS",
      "USO INALATÓRIO"
     ],
     [
      "DIFENIDRAMINA 50 MG/ML SOLUÇÃO INJETÁVEL",
      "01 AMPOLA",
      "APÓS ESTABILIZAÇÃO, SE URTICÁRIA OU PRURIDO: ADMINISTRAR 50 MG (01 ML) EV LENTO, DILUÍDO EM 10 ML DE SF 0,9% (ADJUVANTE — NÃO SUBSTITUI A ADRENALINA)",
      "USO ENDOVENOSO"
     ],
     [
      "HIDROCORTISONA (SUCCINATO SÓDICO) 100 MG PÓ PARA SOLUÇÃO INJETÁVEL",
      "02 FRASCOS-AMPOLA",
      "ADJUVANTE OPCIONAL (ASMA OU CHOQUE PERSISTENTE): ADMINISTRAR 200 MG EV LENTO EM DOSE ÚNICA",
      "USO ENDOVENOSO"
     ]
    ],
    "orient": [
     "ADRENALINA IM É O TRATAMENTO DE PRIMEIRA LINHA E NÃO DEVE SER ADIADA; ANTI-HISTAMÍNICO E CORTICOIDE SÃO APENAS ADJUVANTES",
     "POSIÇÃO SUPINA COM MEMBROS INFERIORES ELEVADOS (SENTADO SE DISPNEIA; DECÚBITO LATERAL ESQUERDO SE GESTANTE); NÃO LEVANTAR O PACIENTE BRUSCAMENTE",
     "MONITORIZAÇÃO CONTÍNUA (PA, FC, SPO2, NÍVEL DE CONSCIÊNCIA) E MATERIAL DE VIA AÉREA AVANÇADA À BEIRA DO LEITO; SEM RESPOSTA APÓS 02 DOSES IM: ANAFILAXIA REFRATÁRIA — ADRENALINA EM INFUSÃO E UTI",
     "OBSERVAR NO MÍNIMO 06 HORAS APÓS A RESOLUÇÃO (12 HORAS OU MAIS SE REAÇÃO GRAVE, MAIS DE 01 DOSE DE ADRENALINA OU ASMA); NA ALTA, PLANO DE AÇÃO, ENCAMINHAR AO ALERGISTA E AVALIAR ADRENALINA AUTOINJETÁVEL"
    ]
   },
   {
    "label": "Anafilaxia refratária (sem resposta a 02 doses de adrenalina IM) — adrenalina em infusão contínua",
    "mode": "internacao",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "ADRENALINA (EPINEFRINA) 1 MG/ML SOLUÇÃO INJETÁVEL",
      "01 AMPOLA",
      "DILUIR 01 MG (01 ML) EM 100 ML DE SF 0,9% (10 MCG/ML) E INFUNDIR EV EM BOMBA DE INFUSÃO A 0,5 A 1 ML/KG/H (≈ 0,1 MCG/KG/MIN), TITULANDO CONFORME PA E FC",
      "USO ENDOVENOSO"
     ],
     [
      "GLUCAGON 1 MG PÓ LIÓFILO PARA SOLUÇÃO INJETÁVEL",
      "01 A 05 FRASCOS-AMPOLA",
      "SE USUÁRIO DE BETABLOQUEADOR SEM RESPOSTA À ADRENALINA: ADMINISTRAR 1 A 5 MG EV LENTO EM 05 MINUTOS, SEGUIDO DE INFUSÃO DE 5 A 15 MCG/MIN SE NECESSÁRIO (CAUSA VÔMITOS — PROTEGER A VIA AÉREA)",
      "USO ENDOVENOSO"
     ]
    ],
    "orient": [
     "ACIONAR UTI; ACESSO VENOSO CALIBROSO E MONITORIZAÇÃO CONTÍNUA; MANTER REPOSIÇÃO VOLÊMICA",
     "HIPOTENSÃO PERSISTENTE APESAR DA ADRENALINA EM INFUSÃO: ASSOCIAR NORADRENALINA OU VASOPRESSINA"
    ]
   },
   {
    "label": "Padrão — anti-histamínico H1 de 2ª geração — escolha 1",
    "mode": "ped",
    "draft": true,
    "menu": true,
    "items": [
     [
      "DESLORATADINA 0,5 MG/ML XAROPE",
      "01 FRASCO",
      "DAR 01 VEZ AO DIA, NO MESMO HORÁRIO, TODOS OS DIAS ENQUANTO HOUVER LESÕES OU COCEIRA E POR MAIS 03 A 05 DIAS DEPOIS QUE MELHORAR: 06 A 11 MESES: 02 ML (1 MG); 01 A 05 ANOS: 2,5 ML (1,25 MG); 06 A 11 ANOS: 05 ML (2,5 MG); 12 ANOS OU MAIS: 10 ML (5 MG)",
      "USO ORAL"
     ],
     [
      "LORATADINA 1 MG/ML XAROPE",
      "01 FRASCO",
      "A PARTIR DE 02 ANOS — DAR 01 VEZ AO DIA, NO MESMO HORÁRIO, TODOS OS DIAS ENQUANTO HOUVER LESÕES OU COCEIRA E POR MAIS 03 A 05 DIAS DEPOIS QUE MELHORAR: {FAIXA}",
      "USO ORAL",
      {
       "sem_peso": "ATÉ 30 KG: 05 ML (5 MG); ACIMA DE 30 KG: 10 ML (10 MG)",
       "faixas": [
        {
         "ate": 30,
         "txt": "05 ML (5 MG)"
        },
        {
         "acima": 30,
         "txt": "10 ML (10 MG)"
        }
       ]
      }
     ],
     [
      "DICLORIDRATO DE CETIRIZINA 1 MG/ML SOLUÇÃO ORAL",
      "01 FRASCO",
      "A PARTIR DE 02 ANOS, TODOS OS DIAS ENQUANTO HOUVER LESÕES OU COCEIRA E POR MAIS 03 A 05 DIAS DEPOIS QUE MELHORAR: 02 A 05 ANOS: 2,5 ML (2,5 MG) DE 12/12H; 06 A 11 ANOS: 05 ML DE 12/12H OU 10 ML 01 VEZ AO DIA; 12 ANOS OU MAIS: 10 ML (10 MG) 01 VEZ AO DIA",
      "USO ORAL"
     ]
    ],
    "orient": [
     "EVITAR O PROVÁVEL DESENCADEANTE (ALIMENTO, MEDICAMENTO, PRODUTO DE CONTATO) E NÃO USAR AAS OU ANTI-INFLAMATÓRIOS",
     "BANHOS MORNOS, COMPRESSAS FRIAS, HIDRATANTE SEM PERFUME E UNHAS CURTAS; MEDIR A DOSE COM SERINGA DOSADORA",
     "EVITAR ANTI-HISTAMÍNICOS DE 1ª GERAÇÃO (DEXCLORFENIRAMINA, HIDROXIZINA, PROMETAZINA), QUE CAUSAM SEDAÇÃO; DEXCLORFENIRAMINA E PROMETAZINA SÃO CONTRAINDICADAS EM MENORES DE 02 ANOS",
     "RETORNAR IMEDIATAMENTE SE FALTA DE AR, CHIADO, INCHAÇO DE LÁBIOS, LÍNGUA OU GARGANTA, ROUQUIDÃO, VÔMITOS REPETIDOS, PALIDEZ, MOLEZA OU SONOLÊNCIA"
    ]
   },
   {
    "label": "Padrão — quadro intenso/extenso: associar prednisolona oral por 03 a 05 dias",
    "mode": "ped",
    "draft": true,
    "items": [
     [
      "PREDNISOLONA 3 MG/ML SOLUÇÃO ORAL",
      "01 FRASCO",
      "DAR {DOSE} VIA ORAL 01 VEZ AO DIA, PELA MANHÃ, POR 03 A 05 DIAS (1 MG/KG/DIA; MÁXIMO 40 MG)",
      "USO ORAL",
      {
       "kg": 1,
       "conc": 3,
       "un": "ML",
       "max": 40
      }
     ]
    ]
   },
   {
    "label": "Padrão — anafilaxia: adrenalina IM imediata + suporte",
    "mode": "ped_internacao",
    "draft": true,
    "items": [
     [
      "ADRENALINA (EPINEFRINA) 1 MG/ML SOLUÇÃO INJETÁVEL",
      "01 AMPOLA",
      "ADMINISTRAR {DOSE} IM, SEM DILUIR, NA FACE ANTEROLATERAL DA COXA (0,01 MG/KG = 0,01 ML/KG; MÁXIMO 0,3 MG ABAIXO DE 12 ANOS E 0,5 MG A PARTIR DE 12 ANOS); REPETIR A CADA 05 MINUTOS SE NÃO HOUVER MELHORA",
      "USO INTRAMUSCULAR",
      {
       "kg": 0.01,
       "conc": 1,
       "un": "ML",
       "max": 0.3
      }
     ],
     [
      "CLORETO DE SÓDIO 0,9% (SORO FISIOLÓGICO)",
      "01 BOLSA 500 ML",
      "SE HIPOTENSÃO OU MÁ PERFUSÃO: INFUNDIR {DOSE} EV EM BOLUS EM 05 A 10 MINUTOS (10 ML/KG); REAVALIAR E REPETIR CONFORME RESPOSTA",
      "USO ENDOVENOSO",
      {
       "kg": 10,
       "un": "ML",
       "max": 500
      }
     ],
     [
      "OXIGÊNIO (O2) SOB MÁSCARA NÃO REINALANTE",
      "CONFORME NECESSIDADE",
      "OFERTAR 10 A 15 L/MIN E TITULAR PARA MANTER SPO2 ≥ 94%",
      "USO INALATÓRIO"
     ],
     [
      "DIFENIDRAMINA 50 MG/ML SOLUÇÃO INJETÁVEL",
      "01 AMPOLA",
      "APÓS ESTABILIZAÇÃO, SE URTICÁRIA OU PRURIDO: ADMINISTRAR {DOSE} EV LENTO (DILUÍDO EM SF 0,9%) OU IM (1 MG/KG; MÁXIMO 50 MG) — ADJUVANTE, NÃO SUBSTITUI A ADRENALINA",
      "USO ENDOVENOSO",
      {
       "kg": 1,
       "conc": 50,
       "un": "ML",
       "max": 50
      }
     ],
     [
      "HIDROCORTISONA (SUCCINATO SÓDICO) 100 MG PÓ PARA SOLUÇÃO INJETÁVEL",
      "01 FRASCO-AMPOLA",
      "ADJUVANTE OPCIONAL (ASMA OU CHOQUE PERSISTENTE): ADMINISTRAR {DOSE} EV LENTO EM DOSE ÚNICA (5 MG/KG; MÁXIMO 200 MG)",
      "USO ENDOVENOSO",
      {
       "kg": 5,
       "un": "MG",
       "max": 200
      }
     ]
    ],
    "orient": [
     "ADRENALINA IM É A PRIMEIRA LINHA E NÃO DEVE SER ADIADA; SE BRONCOESPASMO PERSISTENTE, ASSOCIAR SALBUTAMOL INALATÓRIO",
     "MONITORIZAÇÃO CONTÍNUA (FC, PA, SPO2, PERFUSÃO, NÍVEL DE CONSCIÊNCIA); SEM RESPOSTA APÓS 02 DOSES IM: ANAFILAXIA REFRATÁRIA — ADRENALINA EM INFUSÃO E UTI PEDIÁTRICA",
     "OBSERVAR NO MÍNIMO 06 A 12 HORAS APÓS A RESOLUÇÃO; NA ALTA, PLANO DE AÇÃO ESCRITO, ENCAMINHAR AO ALERGISTA E AVALIAR ADRENALINA AUTOINJETÁVEL",
     "NÃO USAR PROMETAZINA EM MENORES DE 02 ANOS"
    ]
   },
   {
    "label": "Do material do Drive — Urticária sem controle: loratadina em dose dobrada",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "LORATADINA 10 MG",
      "02 CAIXAS",
      "TOMAR 01 COMPRIMIDO DE 12/12H, EM HORÁRIO FIXO, ENQUANTO HOUVER LESÕES E POR MAIS 03 A 05 DIAS APÓS SUMIREM (DOSE DOBRADA, USO FORA DA BULA)",
      "USO ORAL"
     ]
    ]
   },
   {
    "label": "Do material do Drive — Coceira que atrapalha o sono: dexclorfeniramina",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "DEXCLORFENIRAMINA 2 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO À NOITE, PODENDO REPETIR ATÉ DE 8/8H SE COCEIRA INTENSA (CAUSA SONOLÊNCIA; EVITAR EM IDOSOS E AO DIRIGIR)",
      "USO ORAL"
     ]
    ]
   }
  ]
 },
 {
  "id": "anafilaxia",
  "ic": "🚨",
  "nm": "Anafilaxia",
  "sub": "adrenalina · loratadina",
  "blocks": [
   {
    "label": "Padrão — kit de adrenalina IM + anti-H1 não sedativo",
    "draft": true,
    "items": [
     [
      "ADRENALINA (EPINEFRINA) 1 MG/ML (1:1000)",
      "02 AMPOLAS",
      "MANTER SEMPRE CONSIGO 02 AMPOLAS + 02 SERINGAS DE 1 ML COM AGULHA 25X7 (OU AUTOINJETOR, SE DISPONÍVEL). SE NOVA REAÇÃO GRAVE (FALTA DE AR, CHIADO, INCHAÇO NA BOCA OU GARGANTA, TONTURA OU DESMAIO): ASPIRAR 0,5 ML (0,5 MG) E APLICAR NO MÚSCULO DA FACE LATERAL DA COXA (AUTOINJETOR: DOSE DE 0,3 MG) E PROCURAR A EMERGÊNCIA IMEDIATAMENTE. PODE REPETIR APÓS 05 A 15 MINUTOS SE NÃO HOUVER MELHORA",
      "USO INTRAMUSCULAR"
     ],
     [
      "LORATADINA 10 MG",
      "05 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO UMA VEZ AO DIA POR 05 DIAS"
     ]
    ],
    "orient": [
     "RETORNAR IMEDIATAMENTE OU LIGAR 192 SE FALTA DE AR, CHIADO, ROUQUIDÃO, INCHAÇO DE LÁBIOS, LÍNGUA OU GARGANTA, VÔMITOS, TONTURA OU DESMAIO — APLICAR A ADRENALINA ANTES DE SAIR DE CASA",
     "EVITAR RIGOROSAMENTE O AGENTE SUSPEITO (ALIMENTO, MEDICAMENTO OU PICADA DE INSETO) ATÉ AVALIAÇÃO COM ALERGISTA",
     "ENCAMINHO AO ALERGISTA/IMUNOLOGISTA PARA INVESTIGAÇÃO DO DESENCADEANTE E PLANO DE AÇÃO POR ESCRITO",
     "PORTAR IDENTIFICAÇÃO DE ALERGIA (CARTÃO OU PULSEIRA) E ENSINAR FAMILIARES A APLICAR A ADRENALINA"
    ]
   },
   {
    "label": "Padrão — adrenalina IM imediata + oxigênio, volume e broncodilatador",
    "mode": "internacao",
    "draft": true,
    "items": [
     [
      "ADRENALINA (EPINEFRINA) 1 MG/ML (1:1000)",
      "01 AMPOLA",
      "ADMINISTRAR 0,5 MG (0,5 ML) IM NA FACE ÂNTERO-LATERAL DA COXA (VASTO LATERAL) IMEDIATAMENTE, SEM DILUIR. REPETIR A CADA 05 A 15 MINUTOS SE NÃO HOUVER MELHORA",
      "USO INTRAMUSCULAR"
     ],
     [
      "OXIGÊNIO SUPLEMENTAR",
      "01 UNIDADE",
      "ADMINISTRAR O2 EM ALTO FLUXO (10-15 L/MIN) POR MÁSCARA COM RESERVATÓRIO; APÓS ESTABILIZAÇÃO, TITULAR PARA SATO2 94-98%",
      "USO INALATÓRIO"
     ],
     [
      "CLORETO DE SÓDIO 0,9% (SORO FISIOLÓGICO)",
      "01 BOLSA 1000 ML",
      "SE HIPOTENSÃO OU MÁ PERFUSÃO: INFUNDIR 500 A 1000 ML EV EM BOLUS RÁPIDO E REAVALIAR PA; REPETIR CONFORME RESPOSTA",
      "USO ENDOVENOSO"
     ],
     [
      "SALBUTAMOL SPRAY AEROSSOL 100 MCG",
      "01 FRASCO",
      "SE BRONCOESPASMO PERSISTENTE APÓS A ADRENALINA: INALAR 04 A 08 JATOS COM ESPAÇADOR A CADA 20 MINUTOS NA 1ª HORA",
      "USO INALATÓRIO"
     ]
    ],
    "orient": [
     "ADRENALINA IM É O TRATAMENTO DE PRIMEIRA LINHA E NÃO DEVE SER ATRASADA — ANTI-HISTAMÍNICO E CORTICOIDE NÃO SUBSTITUEM A ADRENALINA",
     "DECÚBITO DORSAL COM MEMBROS INFERIORES ELEVADOS (SENTADO SE DISPNEIA SEM HIPOTENSÃO; DECÚBITO LATERAL ESQUERDO SE GESTANTE); NÃO LEVANTAR O PACIENTE",
     "MONITORIZAÇÃO CONTÍNUA DE PA, FC, FR, OXIMETRIA E ECG; 02 ACESSOS VENOSOS CALIBROSOS; DOSAR TRIPTASE SÉRICA (IDEALMENTE 1-2 H APÓS O INÍCIO)",
     "SEM RESPOSTA APÓS 02 DOSES DE ADRENALINA IM + VOLUME = ANAFILAXIA REFRATÁRIA: ADRENALINA EV CONTÍNUA E UTI; ESTRIDOR OU EDEMA DE GLOTE PROGRESSIVO = VIA AÉREA DIFÍCIL, CHAMAR EQUIPE EXPERIENTE",
     "OBSERVAR NO MÍNIMO 06 H APÓS A RESOLUÇÃO (12 H SE REAÇÃO GRAVE, MAIS DE 01 DOSE DE ADRENALINA OU ASMA GRAVE); NA ALTA: KIT DE ADRENALINA, PLANO DE AÇÃO E ENCAMINHAMENTO AO ALERGISTA"
    ]
   },
   {
    "label": "Padrão — anafilaxia refratária (sem resposta a 02 doses IM + volume): adrenalina EV contínua",
    "mode": "internacao",
    "draft": true,
    "items": [
     [
      "ADRENALINA (EPINEFRINA) 1 MG/ML (1:1000)",
      "01 AMPOLA",
      "DILUIR 01 AMPOLA (1 MG) EM 100 ML DE SF 0,9% (10 MCG/ML), EM BOMBA DE INFUSÃO E VIA EXCLUSIVA. INICIAR A {DOSE} POR HORA (5 MCG/KG/H = 0,5 ML/KG/H ≈ 0,08 MCG/KG/MIN) E TITULAR A CADA 2-5 MIN CONFORME PA, FC E SINTOMAS",
      "USO ENDOVENOSO",
      {
       "kg": 5,
       "conc": 10,
       "un": "ML",
       "max": 500
      }
     ],
     [
      "CLORETO DE SÓDIO 0,9% (SORO FISIOLÓGICO)",
      "01 BOLSA 1000 ML",
      "INFUNDIR 1000 ML EV RÁPIDO E REPETIR CONFORME PA E PERFUSÃO (PODEM SER NECESSÁRIOS VÁRIOS LITROS); REAVALIAR SINAIS DE CONGESTÃO ENTRE OS BOLUS",
      "USO ENDOVENOSO"
     ]
    ],
    "orient": [
     "MANTER ADRENALINA IM A CADA 05 MIN ATÉ A INFUSÃO COMEÇAR; NÃO FAZER ADRENALINA EV EM BOLUS FORA DE PCR (RISCO DE ARRITMIA E ISQUEMIA)",
     "MONITORIZAÇÃO CONTÍNUA COM ECG E PA (IDEALMENTE INVASIVA) E TRANSFERÊNCIA PARA UTI",
     "HIPOTENSÃO PERSISTENTE APESAR DA ADRENALINA: ASSOCIAR NORADRENALINA OU VASOPRESSINA; EM USO DE BETABLOQUEADOR, CONSIDERAR GLUCAGON"
    ]
   },
   {
    "label": "Adjuvantes após estabilização — anti-histamínico (pele) e corticoide (só broncoespasmo persistente ou refratária)",
    "mode": "internacao",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "LORATADINA 10 MG",
      "01 COMPRIMIDO",
      "TOMAR 01 COMPRIMIDO VIA ORAL 01 VEZ AO DIA SE URTICÁRIA OU PRURIDO, APÓS ESTABILIZAÇÃO",
      "USO ORAL"
     ],
     [
      "HIDROCORTISONA 100 MG PÓ PARA SOLUÇÃO INJETÁVEL",
      "02 FRASCOS-AMPOLA",
      "SOMENTE SE BRONCOESPASMO PERSISTENTE OU ANAFILAXIA REFRATÁRIA: ADMINISTRAR 200 MG EV LENTO; SE NECESSÁRIO, MANTER 100 MG EV DE 6/6H POR ATÉ 24-48H",
      "USO ENDOVENOSO"
     ]
    ],
    "orient": [
     "NÃO SÃO DROGAS DE RESGATE: NÃO REVERTEM OBSTRUÇÃO DE VIA AÉREA NEM CHOQUE E NÃO PREVINEM COMPROVADAMENTE A REAÇÃO BIFÁSICA",
     "EVITAR ANTI-HISTAMÍNICO SEDATIVO PARENTERAL (PROMETAZINA): PODE CAUSAR HIPOTENSÃO E SEDAÇÃO"
    ]
   },
   {
    "label": "Em uso de betabloqueador com hipotensão refratária — glucagon",
    "mode": "internacao",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "GLUCAGON 1 MG PÓ LIÓFILO PARA SOLUÇÃO INJETÁVEL",
      "05 FRASCOS-AMPOLA",
      "ADMINISTRAR 1 A 5 MG EV LENTO EM 05 MINUTOS; SE HOUVER RESPOSTA, MANTER 5 A 15 MCG/MIN EM BOMBA DE INFUSÃO CONFORME PA",
      "USO ENDOVENOSO"
     ]
    ],
    "orient": [
     "VÔMITOS SÃO FREQUENTES — PROTEGER VIA AÉREA (DECÚBITO LATERAL SE REBAIXAMENTO) E MONITORAR GLICEMIA"
    ]
   },
   {
    "label": "Padrão — adrenalina IM pelo peso + oxigênio, volume e broncodilatador",
    "mode": "ped_internacao",
    "draft": true,
    "items": [
     [
      "ADRENALINA (EPINEFRINA) 1 MG/ML (1:1000)",
      "01 AMPOLA",
      "ADMINISTRAR {DOSE} IM NA FACE ÂNTERO-LATERAL DA COXA (VASTO LATERAL) IMEDIATAMENTE, SEM DILUIR, COM SERINGA DE 1 ML. REPETIR A CADA 05 A 15 MINUTOS SE NÃO HOUVER MELHORA (0,01 MG/KG/DOSE = 0,01 ML/KG; MÁXIMO 0,3 MG/DOSE ATÉ 12 ANOS — A PARTIR DE 12 ANOS, MÁXIMO 0,5 MG)",
      "USO INTRAMUSCULAR",
      {
       "kg": 0.01,
       "conc": 1,
       "un": "ML",
       "max": 0.3
      }
     ],
     [
      "OXIGÊNIO SUPLEMENTAR",
      "01 UNIDADE",
      "ADMINISTRAR O2 EM ALTO FLUXO (10-15 L/MIN) POR MÁSCARA COM RESERVATÓRIO; APÓS ESTABILIZAÇÃO, TITULAR PARA SATO2 ≥ 94%",
      "USO INALATÓRIO"
     ],
     [
      "CLORETO DE SÓDIO 0,9% (SORO FISIOLÓGICO)",
      "01 BOLSA 500 ML",
      "SE HIPOTENSÃO OU MÁ PERFUSÃO: INFUNDIR {DOSE} EV EM 10-20 MINUTOS (20 ML/KG); REAVALIAR APÓS CADA ETAPA E REPETIR CONFORME RESPOSTA",
      "USO ENDOVENOSO",
      {
       "kg": 20,
       "un": "ML",
       "max": 1000
      }
     ],
     [
      "SALBUTAMOL SPRAY AEROSSOL 100 MCG",
      "01 FRASCO",
      "SE BRONCOESPASMO PERSISTENTE APÓS A ADRENALINA: INALAR COM ESPAÇADOR (E MÁSCARA SE MENOR DE 4 ANOS) A CADA 20 MINUTOS NA 1ª HORA — MENORES DE 6 ANOS: 02 A 06 JATOS; 6 ANOS OU MAIS: 04 A 10 JATOS",
      "USO INALATÓRIO"
     ]
    ],
    "orient": [
     "ADRENALINA IM É A PRIMEIRA MEDIDA E NÃO DEVE SER ATRASADA POR ANTI-HISTAMÍNICO OU CORTICOIDE; PESAR OU ESTIMAR O PESO PARA O CÁLCULO",
     "DEITAR COM MEMBROS INFERIORES ELEVADOS (SENTADA SE DIFICULDADE RESPIRATÓRIA); NÃO COLOCAR A CRIANÇA DE PÉ NEM CARREGÁ-LA NA VERTICAL",
     "MONITORIZAÇÃO CONTÍNUA DE FC, PA, FR E OXIMETRIA; HIPOTENSÃO NA CRIANÇA É SINAL TARDIO — VALORIZAR TAQUICARDIA E ENCHIMENTO CAPILAR > 2 SEGUNDOS",
     "SEM RESPOSTA A 02 DOSES IM + VOLUME: ADRENALINA EV CONTÍNUA E CONTATO COM UTI PEDIÁTRICA",
     "OBSERVAR NO MÍNIMO 06 H APÓS A RESOLUÇÃO (12 H SE REAÇÃO GRAVE OU MAIS DE 01 DOSE DE ADRENALINA); NA ALTA: KIT DE ADRENALINA COM DOSE PELO PESO, PLANO DE AÇÃO E ALERGISTA PEDIÁTRICO"
    ]
   },
   {
    "label": "Padrão — anafilaxia refratária: adrenalina EV contínua",
    "mode": "ped_internacao",
    "draft": true,
    "items": [
     [
      "ADRENALINA (EPINEFRINA) 1 MG/ML (1:1000)",
      "01 AMPOLA",
      "DILUIR 01 AMPOLA (1 MG) EM 100 ML DE SF 0,9% (10 MCG/ML), EM BOMBA DE INFUSÃO E VIA EXCLUSIVA. INICIAR A {DOSE} POR HORA (5 MCG/KG/H = 0,5 ML/KG/H ≈ 0,08 MCG/KG/MIN) E TITULAR CONFORME PA, FC E SINTOMAS",
      "USO ENDOVENOSO",
      {
       "kg": 5,
       "conc": 10,
       "un": "ML",
       "max": 500
      }
     ]
    ],
    "orient": [
     "MANTER ADRENALINA IM A CADA 05 MIN ATÉ A INFUSÃO COMEÇAR; NÃO FAZER ADRENALINA EV EM BOLUS FORA DE PCR",
     "MONITORIZAÇÃO CONTÍNUA COM ECG NA SALA DE EMERGÊNCIA E TRANSFERÊNCIA PARA UTI PEDIÁTRICA; REPETIR SF 0,9% 20 ML/KG CONFORME PERFUSÃO"
    ]
   },
   {
    "label": "Anti-histamínico após estabilização (sintomas cutâneos) — escolha 1",
    "mode": "ped_internacao",
    "sec": "offlabel",
    "draft": true,
    "menu": true,
    "items": [
     [
      "LORATADINA 1 MG/ML XAROPE",
      "01 FRASCO",
      "DAR VIA ORAL 01 VEZ AO DIA SE URTICÁRIA OU PRURIDO: {FAIXA}. NÃO USAR EM MENORES DE 2 ANOS",
      "USO ORAL",
      {
       "sem_peso": "2 A 12 ANOS COM ATÉ 30 KG = 05 ML (5 MG); ACIMA DE 30 KG = 10 ML (10 MG)",
       "faixas": [
        {
         "ate": 30,
         "txt": "05 ML (5 MG) (2 A 12 ANOS)"
        },
        {
         "acima": 30,
         "txt": "10 ML (10 MG)"
        }
       ]
      }
     ],
     [
      "DIFENIDRAMINA 50 MG/ML SOLUÇÃO INJETÁVEL",
      "01 AMPOLA 1 ML",
      "SE VIA ORAL IMPOSSÍVEL: ADMINISTRAR {DOSE} EV LENTO, ATÉ DE 6/6H (1 MG/KG/DOSE; MÁXIMO 50 MG). NÃO USAR EM RECÉM-NASCIDOS",
      "USO ENDOVENOSO",
      {
       "kg": 1,
       "un": "MG",
       "max": 50
      }
     ]
    ],
    "orient": [
     "NÃO TRATAM OBSTRUÇÃO DE VIA AÉREA NEM CHOQUE — NUNCA USAR NO LUGAR DA ADRENALINA",
     "PROMETAZINA NÃO É RECOMENDADA (SEDAÇÃO E HIPOTENSÃO; CONTRAINDICADA EM MENORES DE 2 ANOS)"
    ]
   },
   {
    "label": "Corticoide — só broncoespasmo persistente ou anafilaxia refratária — escolha 1",
    "mode": "ped_internacao",
    "sec": "offlabel",
    "draft": true,
    "menu": true,
    "items": [
     [
      "PREDNISOLONA 3 MG/ML SOLUÇÃO ORAL",
      "01 FRASCO",
      "DAR {DOSE} VIA ORAL 01 VEZ AO DIA POR 03 A 05 DIAS (1 MG/KG/DIA; MÁXIMO 40 MG)",
      "USO ORAL",
      {
       "kg": 1,
       "conc": 3,
       "un": "ML",
       "max": 40
      }
     ],
     [
      "METILPREDNISOLONA 125 MG PÓ PARA SOLUÇÃO INJETÁVEL",
      "01 FRASCO-AMPOLA",
      "SE VIA ORAL IMPOSSÍVEL: ADMINISTRAR {DOSE} EV LENTO DE 12/12H (1 MG/KG/DOSE; MÁXIMO 30 MG/DOSE)",
      "USO ENDOVENOSO",
      {
       "kg": 1,
       "un": "MG",
       "max": 30
      }
     ]
    ],
    "orient": [
     "CORTICOIDE NÃO É DROGA DE RESGATE E NÃO PREVINE COMPROVADAMENTE A REAÇÃO BIFÁSICA — RESERVAR PARA ASMA/BRONCOESPASMO ASSOCIADO OU REAÇÃO REFRATÁRIA"
    ]
   },
   {
    "label": "Padrão — kit de adrenalina IM pelo peso para casa + anti-H1 não sedativo",
    "mode": "ped",
    "draft": true,
    "items": [
     [
      "ADRENALINA (EPINEFRINA) 1 MG/ML (1:1000)",
      "02 AMPOLAS",
      "MANTER SEMPRE COM A CRIANÇA 02 AMPOLAS + 02 SERINGAS DE 1 ML COM AGULHA (OU AUTOINJETOR PEDIÁTRICO, SE DISPONÍVEL). SE NOVA REAÇÃO GRAVE (FALTA DE AR, CHIADO, INCHAÇO NA BOCA OU GARGANTA, VÔMITOS REPETIDOS, MOLEZA OU DESMAIO): ASPIRAR {DOSE}, APLICAR NO MÚSCULO DA FACE LATERAL DA COXA E PROCURAR A EMERGÊNCIA IMEDIATAMENTE; PODE REPETIR APÓS 05 A 15 MINUTOS SE NÃO MELHORAR (0,01 ML/KG; MÁXIMO 0,3 ML ATÉ 12 ANOS — A PARTIR DE 12 ANOS, 0,5 ML)",
      "USO INTRAMUSCULAR",
      {
       "kg": 0.01,
       "conc": 1,
       "un": "ML",
       "max": 0.3
      }
     ],
     [
      "LORATADINA 1 MG/ML XAROPE",
      "01 FRASCO",
      "DAR VIA ORAL 01 VEZ AO DIA POR 05 DIAS SE URTICÁRIA OU COCEIRA: {FAIXA}. NÃO USAR EM MENORES DE 2 ANOS",
      "USO ORAL",
      {
       "sem_peso": "2 A 12 ANOS COM ATÉ 30 KG = 05 ML (5 MG); ACIMA DE 30 KG = 10 ML (10 MG)",
       "faixas": [
        {
         "ate": 30,
         "txt": "05 ML (5 MG) (2 A 12 ANOS)"
        },
        {
         "acima": 30,
         "txt": "10 ML (10 MG)"
        }
       ]
      }
     ]
    ],
    "orient": [
     "SE FALTA DE AR, CHIADO, ROUQUIDÃO, INCHAÇO DE LÁBIOS, LÍNGUA OU GARGANTA, VÔMITOS REPETIDOS, MOLEZA OU DESMAIO: APLICAR A ADRENALINA ANTES DE SAIR DE CASA E LIGAR 192 (SAMU)",
     "EVITAR RIGOROSAMENTE O AGENTE SUSPEITO (ALIMENTO, MEDICAMENTO OU PICADA DE INSETO) ATÉ A AVALIAÇÃO COM O ALERGISTA PEDIÁTRICO",
     "AVISAR A ESCOLA OU CRECHE, DEIXAR UM PLANO DE AÇÃO ESCRITO COM A DOSE DA ADRENALINA E USAR IDENTIFICAÇÃO DE ALERGIA",
     "PESAR A CRIANÇA NAS CONSULTAS E ATUALIZAR A DOSE DO KIT CONFORME O PESO"
    ]
   }
  ]
 },
 {
  "id": "anticoncepcao",
  "ic": "💊",
  "nm": "Anticoncepção de emergência",
  "sub": "levonorgestrel",
  "blocks": [
   {
    "label": "Padrão — levonorgestrel 1,5 mg dose única",
    "draft": true,
    "items": [
     [
      "LEVONORGESTREL 1,5 MG",
      "01 COMPRIMIDO",
      "TOMAR UM COMPRIMIDO EM DOSE ÚNICA"
     ]
    ],
    "orient": [
     "TOMAR O COMPRIMIDO O MAIS RÁPIDO POSSÍVEL APÓS A RELAÇÃO (IDEALMENTE EM ATÉ 72H; EFICÁCIA MENOR ATÉ 120H)",
     "SE VOMITAR EM ATÉ 03 HORAS APÓS TOMAR O COMPRIMIDO, É NECESSÁRIO REPETIR A DOSE — PROCURAR A UNIDADE",
     "INICIAR OU RETOMAR O MÉTODO ANTICONCEPCIONAL HABITUAL JÁ NO DIA SEGUINTE E USAR PRESERVATIVO NOS PRÓXIMOS 07 DIAS. A PÍLULA DE EMERGÊNCIA NÃO PROTEGE CONTRA IST NEM CONTRA NOVAS RELAÇÕES",
     "FAZER TESTE DE GRAVIDEZ SE A MENSTRUAÇÃO ATRASAR MAIS DE 07 DIAS OU VIER DIFERENTE DO HABITUAL. RETORNAR IMEDIATAMENTE SE DOR ABDOMINAL INTENSA OU SANGRAMENTO VOLUMOSO",
     "PROCURAR A UBS PARA PLANEJAMENTO REPRODUTIVO (MÉTODO REGULAR) E TESTES RÁPIDOS DE HIV, SÍFILIS E HEPATITES B E C"
    ]
   },
   {
    "label": "Levonorgestrel 0,75 mg — 02 comprimidos juntos (dose única)",
    "sec": "offlabel",
    "items": [
     [
      "LEVONORGESTREL 0,75 MG",
      "02 COMPRIMIDOS",
      "TOMAR OS DOIS COMPRIMIDOS EM DOSE ÚNICA"
     ]
    ]
   },
   {
    "label": "Antiemético só se náusea (mais comum no método de Yuzpe) — escolha 1",
    "sec": "offlabel",
    "menu": true,
    "items": [
     [
      "METOCLOPRAMIDA 10 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO SE NÁUSEAS OU VÔMITOS, PODENDO REPETIR DE 8/8H"
     ],
     [
      "ONDANSETRONA 8 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO SE NÁUSEAS OU VÔMITOS, PODENDO REPETIR DE 8/8H"
     ],
     [
      "DIMENIDRINATO 50 MG + PIRIDOXINA 10MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO SE VERTIGEM, NÁUSEAS OU VÔMITOS, PODENDO REPETIR DE 6/6H"
     ]
    ]
   },
   {
    "label": "Do material do Drive — Método de Yuzpe (só na falta de levonorgestrel)",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "LEVONORGESTREL 0,15 MG + ETINILESTRADIOL 0,03 MG",
      "01 CARTELA",
      "TOMAR 04 COMPRIMIDOS JUNTOS O MAIS CEDO POSSÍVEL E MAIS 04 COMPRIMIDOS 12 HORAS DEPOIS (ATÉ 5 DIAS APÓS A RELAÇÃO). USAR SOMENTE SE NÃO HOUVER LEVONORGESTREL ISOLADO",
      "USO ORAL"
     ]
    ]
   },
   {
    "label": "Usou indutor enzimático nas últimas 4 semanas e sem DIU de cobre: levonorgestrel 3 mg (dose dobrada)",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "LEVONORGESTREL 1,5 MG",
      "02 COMPRIMIDOS",
      "TOMAR OS 02 COMPRIMIDOS JUNTOS (3 MG) EM DOSE ÚNICA, O MAIS CEDO POSSÍVEL (ATÉ 5 DIAS APÓS A RELAÇÃO) — SOMENTE SE USOU CARBAMAZEPINA, OXCARBAZEPINA, FENITOÍNA, FENOBARBITAL, PRIMIDONA, RIFAMPICINA, RIFABUTINA, EFAVIRENZ, ERVA-DE-SÃO-JOÃO OU OUTRO INDUTOR ENZIMÁTICO NAS ÚLTIMAS 4 SEMANAS E NÃO HÁ DIU DE COBRE",
      "USO ORAL"
     ]
    ],
    "orient": [
     "O DIU DE COBRE, INSERIDO EM ATÉ 5 DIAS, É O MÉTODO DE EMERGÊNCIA MAIS EFICAZ E NÃO SOFRE INTERFERÊNCIA DE OUTROS REMÉDIOS"
    ]
   }
  ]
 },
 {
  "id": "asma",
  "ic": "🫁",
  "nm": "Asma",
  "sub": "prednisona · budesonida/formoterol · beclometasona · salbutamol",
  "blocks": [
   {
    "label": "Padrão — Corticoide oral (alta pós-crise)",
    "draft": true,
    "items": [
     [
      "PREDNISONA 20 MG",
      "10 COMPRIMIDOS",
      "TOMAR 02 COMPRIMIDOS PELA MANHÃ, APÓS O CAFÉ, POR 05 DIAS SEGUIDOS"
     ]
    ],
    "orient": [
     "USAR ESPAÇADOR COM O SPRAY AEROSSOL E ENXAGUAR A BOCA COM ÁGUA APÓS INALAR O CORTICOIDE (NÃO ENGOLIR)",
     "NÃO SUSPENDER A BOMBINHA DE MANUTENÇÃO POR CONTA PRÓPRIA, MESMO COM MELHORA",
     "CONSULTA NA UBS EM ATÉ 07 DIAS PARA REAVALIAR A ASMA, A TÉCNICA INALATÓRIA E AJUSTAR O TRATAMENTO DE MANUTENÇÃO",
     "EVITAR CIGARRO, FUMAÇA, POEIRA E OUTROS GATILHOS CONHECIDOS",
     "RETORNAR IMEDIATAMENTE SE FALTA DE AR INTENSA, DIFICULDADE PARA FALAR, LÁBIOS ROXOS, SONOLÊNCIA OU NECESSIDADE DE RESGATE REPETIDO SEM MELHORA"
    ]
   },
   {
    "label": "Padrão — Corticoide inalatório (budesonida/formoterol serve de manutenção e resgate; beclometasona = SUS/Farmácia Popular) — escolha 1",
    "draft": true,
    "menu": true,
    "items": [
     [
      "BUDESONIDA + FORMOTEROL 200/6MCG",
      "01 FRASCO",
      "INALAR 01 DOSE DE 12/12H, DIARIAMENTE (02 DOSES DE 12/12H SE JÁ USAVA CORTICOIDE INALATÓRIO ANTES DA CRISE OU SE A ASMA NÃO ESTAVA CONTROLADA) HORÁRIO SUGERIDO: 08:00 – 20:00. SE FALTA DE AR OU CHIADO, INALAR 01 DOSE EXTRA, PODENDO REPETIR APÓS ALGUNS MINUTOS. NÃO ULTRAPASSAR 12 DOSES AO DIA",
      "USO INALATÓRIO"
     ],
     [
      "BECLOMETASONA AEROSSOL 250 MCG",
      "01 FRASCO",
      "INALAR 02 JATOS COM ESPAÇADOR DE 12/12H, DIARIAMENTE HORÁRIO SUGERIDO: 08:00 – 20:00",
      "USO INALATÓRIO"
     ]
    ]
   },
   {
    "label": "Padrão — Resgate (se não usar budesonida/formoterol como resgate)",
    "draft": true,
    "items": [
     [
      "SALBUTAMOL SPRAY AEROSSOL 100 MCG",
      "01 FRASCO",
      "INALAR 01 PUFF NO MEIO DA RESPIRAÇÃO PROFUNDA E SEGURAR A RESPIRAÇÃO POR 10 SEG. PODE REPETIR UMA VEZ APÓS UM MINUTO. SE NECESSÁRIO, PODE REPETIR AS DUAS INALAÇÕES APÓS 6H DA ÚLTIMA DOSE. NA AUSÊNCIA DE MELHORA, RETORNAR À EMERGÊNCIA IMEDIATAMENTE",
      "USO INALATÓRIO"
     ]
    ]
   },
   {
    "label": "Combinação pronta — alta pós-crise: prednisona + budesonida/formoterol (manutenção e resgate)",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "PREDNISONA 20 MG",
      "10 COMPRIMIDOS",
      "TOMAR 02 COMPRIMIDOS PELA MANHÃ, APÓS O CAFÉ, POR 05 DIAS SEGUIDOS"
     ],
     [
      "BUDESONIDA + FORMOTEROL 200/6MCG",
      "01 FRASCO",
      "INALAR 01 DOSE DE 12/12H, DIARIAMENTE (02 DOSES DE 12/12H SE JÁ USAVA CORTICOIDE INALATÓRIO ANTES DA CRISE OU SE A ASMA NÃO ESTAVA CONTROLADA) HORÁRIO SUGERIDO: 08:00 – 20:00. SE FALTA DE AR OU CHIADO, INALAR 01 DOSE EXTRA, PODENDO REPETIR APÓS ALGUNS MINUTOS. NÃO ULTRAPASSAR 12 DOSES AO DIA",
      "USO INALATÓRIO"
     ]
    ]
   },
   {
    "label": "Combinação pronta — alternativa SUS/Farmácia Popular: prednisona + beclometasona + salbutamol",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "PREDNISONA 20 MG",
      "10 COMPRIMIDOS",
      "TOMAR 02 COMPRIMIDOS PELA MANHÃ, APÓS O CAFÉ, POR 05 DIAS SEGUIDOS"
     ],
     [
      "BECLOMETASONA AEROSSOL 250 MCG",
      "01 FRASCO",
      "INALAR 02 JATOS COM ESPAÇADOR DE 12/12H, DIARIAMENTE HORÁRIO SUGERIDO: 08:00 – 20:00",
      "USO INALATÓRIO"
     ],
     [
      "SALBUTAMOL SPRAY AEROSSOL 100 MCG",
      "01 FRASCO",
      "INALAR 01 PUFF NO MEIO DA RESPIRAÇÃO PROFUNDA E SEGURAR A RESPIRAÇÃO POR 10 SEG. PODE REPETIR UMA VEZ APÓS UM MINUTO. SE NECESSÁRIO, PODE REPETIR AS DUAS INALAÇÕES APÓS 6H DA ÚLTIMA DOSE. NA AUSÊNCIA DE MELHORA, RETORNAR À EMERGÊNCIA IMEDIATAMENTE",
      "USO INALATÓRIO"
     ]
    ]
   },
   {
    "label": "Asma – Step 2 (manutenção de asma leve, fora de crise; não serve como alta pós-crise) — beclometasona 50 mcg + salbutamol",
    "sec": "offlabel",
    "items": [
     [
      "BECLOMETASONA AEROSSOL 50 MCG",
      "01 FRASCO",
      "INALAR 02 JATOS DE 12/12H, DIARIAMENTE HORÁRIO SUGERIDO: 08:00 – 20:00",
      "USO INALATÓRIO"
     ],
     [
      "SALBUTAMOL SPRAY AEROSSOL 100 MCG",
      "01 FRASCO",
      "INALAR 01 PUFF NO MEIO DA RESPIRAÇÃO PROFUNDA E SEGURAR A RESPIRAÇÃO POR 10 SEG. PODE REPETIR UMA VEZ APÓS UM MINUTO. SE NECESSÁRIO, PODE REPETIR AS DUAS INALAÇÕES APÓS 6H DA ÚLTIMA DOSE. NA AUSÊNCIA DE MELHORA, RETORNAR À EMERGÊNCIA IMEDIATAMENTE",
      "USO INALATÓRIO"
     ]
    ]
   },
   {
    "label": "Asma – Step 3 (manutenção, track 2) — budesonida/formoterol 100/6 + salbutamol de resgate",
    "sec": "offlabel",
    "items": [
     [
      "BUDESONIDA + FORMOTEROL 100/6MCG",
      "01 FRASCO",
      "INALAR 01 CÁPSULA DE 12/12H, DIARIAMENTE HORÁRIO SUGERIDO: 08:00 – 20:00",
      "USO INALATÓRIO"
     ],
     [
      "SALBUTAMOL SPRAY AEROSSOL 100 MCG",
      "01 FRASCO",
      "INALAR 01 PUFF NO MEIO DA RESPIRAÇÃO PROFUNDA E SEGURAR A RESPIRAÇÃO POR 10 SEG. PODE REPETIR UMA VEZ APÓS UM MINUTO. SE NECESSÁRIO, PODE REPETIR AS DUAS INALAÇÕES APÓS 6H DA ÚLTIMA DOSE. NA AUSÊNCIA DE MELHORA, RETORNAR À EMERGÊNCIA IMEDIATAMENTE",
      "USO INALATÓRIO"
     ]
    ]
   },
   {
    "label": "Opção 2 — Step 4 (manutenção, track 2): budesonida/formoterol 400/6 + salbutamol de resgate",
    "sec": "offlabel",
    "items": [
     [
      "BUDESONIDA + FORMOTEROL 400/6MCG",
      "01 FRASCO",
      "INALAR 01 CÁPSULA DE 12/12H, DIARIAMENTE HORÁRIO SUGERIDO: 08:00 – 20:00",
      "USO INALATÓRIO"
     ],
     [
      "SALBUTAMOL SPRAY AEROSSOL 100 MCG",
      "01 FRASCO",
      "INALAR 01 PUFF NO MEIO DA RESPIRAÇÃO PROFUNDA E SEGURAR A RESPIRAÇÃO POR 10 SEG. PODE REPETIR UMA VEZ APÓS UM MINUTO. SE NECESSÁRIO, PODE REPETIR AS DUAS INALAÇÕES APÓS 6H DA ÚLTIMA DOSE. NA AUSÊNCIA DE MELHORA, RETORNAR À EMERGÊNCIA IMEDIATAMENTE",
      "USO INALATÓRIO"
     ]
    ]
   },
   {
    "label": "Padrão — Crise leve a moderada: salbutamol spray com espaçador + prednisona (GINA 2026)",
    "mode": "internacao",
    "draft": true,
    "items": [
     [
      "OXIGÊNIO SUPLEMENTAR (CATETER NASAL OU MÁSCARA)",
      "CONFORME NECESSIDADE",
      "INICIAR SE SATURAÇÃO DE O2 < 92% E TITULAR PARA MANTER ENTRE 92% E 95% (EVITAR HIPEROXIA)",
      "USO INALATÓRIO"
     ],
     [
      "SALBUTAMOL SPRAY AEROSSOL 100 MCG",
      "01 FRASCO",
      "INALAR 04 A 10 JATOS COM ESPAÇADOR (01 JATO POR VEZ, SEGUIDO DE 04 A 06 RESPIRAÇÕES) DE 20/20 MIN NA PRIMEIRA HORA; DEPOIS 04 A 10 JATOS DE 1/1H A 4/4H CONFORME A RESPOSTA",
      "USO INALATÓRIO"
     ],
     [
      "PREDNISONA 20 MG",
      "02 COMPRIMIDOS",
      "TOMAR 02 COMPRIMIDOS (40 MG) VIA ORAL 01 VEZ AO DIA, PELA MANHÃ — 1ª DOSE NA PRIMEIRA HORA DO ATENDIMENTO; MANTER POR 05 A 07 DIAS NO TOTAL",
      "USO ORAL"
     ]
    ],
    "orient": [
     "AVALIAR NA CHEGADA E 1H APÓS O TRATAMENTO: FALA, FR, FC, MUSCULATURA ACESSÓRIA, SATURAÇÃO E PICO DE FLUXO (PFE). CRISE GRAVE (FALA SÓ PALAVRAS, AGITAÇÃO, FR > 30, FC > 120, SAT < 90%, PFE ≤ 50%) → BLOCO DE CRISE GRAVE",
     "CRISE MODERADA: ASSOCIAR IPRATRÓPIO AO SALBUTAMOL NA 1ª HORA (BLOCO PRÓPRIO); SEM BENEFÍCIO EM MANTER APÓS 1 A 2 HORAS",
     "CORTICOIDE SISTÊMICO NA PRIMEIRA HORA EM TODA CRISE MODERADA OU GRAVE; A VIA ORAL É TÃO EFICAZ QUANTO A EV — NÃO ASSOCIAR DOIS CORTICOIDES SISTÊMICOS",
     "UTI E VIA AÉREA AVANÇADA SE SONOLÊNCIA, CONFUSÃO, TÓRAX SILENCIOSO, CIANOSE, EXAUSTÃO, SAT < 90% APESAR DE O2 OU PACO2 NORMAL/ELEVADA NA GASOMETRIA",
     "NÃO USAR AMINOFILINA, SEDATIVOS NEM ANTIBIÓTICO DE ROTINA (SÓ SE PNEUMONIA OU INFECÇÃO BACTERIANA EVIDENTE)",
     "ALTA SE SINTOMAS LEVES E ESTÁVEIS 1 A 2H APÓS O ÚLTIMO BRONCODILATADOR, SAT ≥ 92% EM AR AMBIENTE E PFE > 70% DO PREDITO/MELHOR PESSOAL (PFE PÓS-TRATAMENTO DE 40% A 70%: SÓ COM BAIXO RISCO E RETORNO GARANTIDO; < 40%: INTERNAR): COMPLETAR A PREDNISONA, INICIAR/AJUSTAR CORTICOIDE INALATÓRIO (DE PREFERÊNCIA BUDESONIDA-FORMOTEROL EM MANUTENÇÃO E RESGATE; NUNCA SÓ SALBUTAMOL), REVISAR A TÉCNICA INALATÓRIA E RETORNO NA UBS EM 2 A 7 DIAS"
    ]
   },
   {
    "label": "Padrão — Crise grave: nebulização salbutamol + ipratrópio e hidrocortisona EV",
    "mode": "internacao",
    "draft": true,
    "items": [
     [
      "SALBUTAMOL SOLUÇÃO PARA NEBULIZAÇÃO 5 MG/ML (GOTAS)",
      "01 FRASCO",
      "NEBULIZAR 1 ML (5 MG ≈ 20 GOTAS) EM 3 ML DE SF 0,9%, COM O2 A 6–8 L/MIN, DE 20/20 MIN NA PRIMEIRA HORA (03 DOSES); DEPOIS DE 1/1H A 4/4H CONFORME A RESPOSTA",
      "USO INALATÓRIO"
     ],
     [
      "BROMETO DE IPRATRÓPIO SOLUÇÃO PARA NEBULIZAÇÃO 0,25 MG/ML (GOTAS)",
      "01 FRASCO",
      "NEBULIZAR 2 ML (0,5 MG = 40 GOTAS) JUNTO COM O SALBUTAMOL DE 20/20 MIN NA PRIMEIRA HORA (03 DOSES); DEPOIS SUSPENDER (SEM BENEFÍCIO ADICIONAL APÓS A FASE INICIAL)",
      "USO INALATÓRIO"
     ],
     [
      "HIDROCORTISONA 100 MG PÓ PARA SOLUÇÃO INJETÁVEL",
      "01 FRASCO-AMPOLA",
      "RECONSTITUIR E ADMINISTRAR 100 MG EV DE 6/6H SOMENTE SE INCAPAZ DE USAR A VIA ORAL (DISPNEIA INTENSA, VÔMITOS, VENTILAÇÃO); TROCAR PARA PREDNISONA 40 MG VO ASSIM QUE POSSÍVEL — NÃO ASSOCIAR À PREDNISONA",
      "USO ENDOVENOSO"
     ]
    ],
    "orient": [
     "MONITORIZAÇÃO CONTÍNUA (SATURAÇÃO, FC, PA), ACESSO VENOSO E REAVALIAÇÃO A CADA 20 MIN; SEM RESPOSTA NA 1ª HORA → CONSIDERAR SULFATO DE MAGNÉSIO E ACIONAR A UTI",
     "INTUBAÇÃO POR PROFISSIONAL EXPERIENTE SE EXAUSTÃO, REBAIXAMENTO, TÓRAX SILENCIOSO OU PARADA RESPIRATÓRIA IMINENTE"
    ]
   },
   {
    "label": "Crise grave sem resposta na 1ª hora: sulfato de magnésio EV",
    "mode": "internacao",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "SULFATO DE MAGNÉSIO 50% (500 MG/ML)",
      "01 AMPOLA 10 ML",
      "ASPIRAR 4 ML (2 G), DILUIR EM 100 ML DE SF 0,9% E ADMINISTRAR EV EM 20 MINUTOS, DOSE ÚNICA",
      "USO ENDOVENOSO"
     ],
     [
      "CLORETO DE SÓDIO 0,9% (SORO FISIOLÓGICO)",
      "01 BOLSA 100 ML",
      "DILUENTE DO SULFATO DE MAGNÉSIO — INFUNDIR EM 20 MINUTOS",
      "USO ENDOVENOSO"
     ]
    ],
    "orient": [
     "INDICADO SE PFE/VEF1 < 25–30% NA ADMISSÃO OU SEM RESPOSTA AO TRATAMENTO INICIAL NA 1ª HORA (NÃO É ROTINA)",
     "MONITORAR PA, FC, FR E REFLEXOS PATELARES DURANTE A INFUSÃO; INTERROMPER SE HIPOTENSÃO, BRADICARDIA OU ARREFLEXIA"
    ]
   },
   {
    "label": "Corticoide EV alternativo: metilprednisolona",
    "mode": "internacao",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "METILPREDNISOLONA 40 MG PÓ PARA SOLUÇÃO INJETÁVEL",
      "01 FRASCO-AMPOLA",
      "RECONSTITUIR E ADMINISTRAR 40 MG EV DE 12/12H QUANDO A VIA ORAL NÃO FOR POSSÍVEL (ALTERNATIVA À HIDROCORTISONA) — NÃO ASSOCIAR A OUTRO CORTICOIDE SISTÊMICO; TROCAR PARA PREDNISONA VO ASSIM QUE POSSÍVEL",
      "USO ENDOVENOSO"
     ]
    ]
   },
   {
    "label": "Padrão — Crise leve a moderada: salbutamol spray com espaçador + prednisolona",
    "mode": "ped_internacao",
    "draft": true,
    "items": [
     [
      "OXIGÊNIO SUPLEMENTAR (CATETER NASAL OU MÁSCARA)",
      "CONFORME NECESSIDADE",
      "INICIAR SE SATURAÇÃO DE O2 < 92% E TITULAR PARA MANTER ENTRE 92% E 95% (EVITAR HIPEROXIA)",
      "USO INALATÓRIO"
     ],
     [
      "SALBUTAMOL SPRAY AEROSSOL 100 MCG",
      "01 FRASCO",
      "INALAR COM ESPAÇADOR (COM MÁSCARA SE < 4 ANOS), 01 JATO POR VEZ SEGUIDO DE 05 A 06 RESPIRAÇÕES — < 06 ANOS: 02 A 06 JATOS; ≥ 06 ANOS: 04 A 10 JATOS — DE 20/20 MIN NA PRIMEIRA HORA; DEPOIS DE 1/1H A 4/4H CONFORME A RESPOSTA",
      "USO INALATÓRIO"
     ],
     [
      "PREDNISOLONA 3 MG/ML SOLUÇÃO ORAL",
      "01 FRASCO",
      "DAR {DOSE} VIA ORAL 01 VEZ AO DIA, PELA MANHÃ, POR 03 A 05 DIAS — 1ª DOSE NA PRIMEIRA HORA DO ATENDIMENTO; SE VOMITAR EM ATÉ 30 MIN, REPETIR (1 MG/KG/DIA, MÁXIMO 40 MG)",
      "USO ORAL",
      {
       "kg": 1,
       "conc": 3,
       "un": "ML",
       "max": 40
      }
     ]
    ],
    "orient": [
     "AVALIAR NA CHEGADA E 1H APÓS O TRATAMENTO: FALA/CHORO, FR, FC, TIRAGEM, SATURAÇÃO E NÍVEL DE CONSCIÊNCIA. SAT < 92% EM AR AMBIENTE, INCAPAZ DE FALAR OU MAMAR, AGITAÇÃO OU SONOLÊNCIA = CRISE GRAVE → BLOCO DE CRISE GRAVE",
     "CRISE MODERADA SEM RESPOSTA AO 1º CICLO DE SALBUTAMOL: ASSOCIAR IPRATRÓPIO NA 1ª HORA (DOSES NO BLOCO DE CRISE GRAVE)",
     "SINAIS DE RISCO DE VIDA → SALA DE EMERGÊNCIA/UTI PEDIÁTRICA: CIANOSE, TÓRAX SILENCIOSO, BRADICARDIA, EXAUSTÃO, CONFUSÃO OU AUSÊNCIA DE RESPOSTA APÓS 1–2H DE TRATAMENTO",
     "PREFERIR O CORTICOIDE ORAL À VIA EV. NÃO USAR ANTIBIÓTICO, MUCOLÍTICO, ANTI-HISTAMÍNICO, SEDATIVO OU AMINOFILINA DE ROTINA",
     "ALTA SE SAT ≥ 92% EM AR AMBIENTE E BOA RESPOSTA MANTIDA 3–4H APÓS O ÚLTIMO SALBUTAMOL: CORTICOIDE ORAL ATÉ COMPLETAR 3–5 DIAS, CORTICOIDE INALATÓRIO DIÁRIO E SALBUTAMOL COM ESPAÇADOR SE NECESSÁRIO (BLOCOS DE ALTA EM PEDIÁTRICO › AMBULATORIAL), REVISAR A TÉCNICA E RETORNO NA UBS EM 2–5 DIAS (≤ 5 ANOS: EM 1–2 DIAS)",
     "RETORNAR IMEDIATAMENTE SE CANSAÇO FORTE, DIFICULDADE PARA FALAR OU MAMAR, LÁBIOS ROXOS, SONOLÊNCIA OU NECESSIDADE DE SALBUTAMOL ANTES DE 3–4H"
    ]
   },
   {
    "label": "Padrão — Crise grave: nebulização salbutamol + ipratrópio e hidrocortisona EV",
    "mode": "ped_internacao",
    "draft": true,
    "items": [
     [
      "SALBUTAMOL SOLUÇÃO PARA NEBULIZAÇÃO 5 MG/ML (GOTAS)",
      "01 FRASCO",
      "NEBULIZAR EM 3 ML DE SF 0,9%, COM O2 A 6–8 L/MIN, DE 20/20 MIN NA PRIMEIRA HORA (03 DOSES) — {FAIXA}; DEPOIS DE 1/1H A 4/4H CONFORME A RESPOSTA",
      "USO INALATÓRIO",
      {
       "sem_peso": "< 06 ANOS (OU < 20 KG): 0,5 ML (2,5 MG ≈ 10 GOTAS); ≥ 06 ANOS (OU ≥ 20 KG): 1 ML (5 MG ≈ 20 GOTAS)",
       "faixas": [
        {
         "menor": 20,
         "txt": "0,5 ML (2,5 MG ≈ 10 GOTAS) POR NEBULIZAÇÃO"
        },
        {
         "de": 20,
         "txt": "1 ML (5 MG ≈ 20 GOTAS) POR NEBULIZAÇÃO"
        }
       ]
      }
     ],
     [
      "BROMETO DE IPRATRÓPIO SOLUÇÃO PARA NEBULIZAÇÃO 0,25 MG/ML (GOTAS)",
      "01 FRASCO",
      "NEBULIZAR JUNTO COM O SALBUTAMOL DE 20/20 MIN NA PRIMEIRA HORA (03 DOSES) — < 12 ANOS: 1 ML (0,25 MG = 20 GOTAS); ≥ 12 ANOS: 2 ML (0,5 MG = 40 GOTAS); DEPOIS SUSPENDER",
      "USO INALATÓRIO"
     ],
     [
      "HIDROCORTISONA 100 MG PÓ PARA SOLUÇÃO INJETÁVEL",
      "01 FRASCO-AMPOLA",
      "RECONSTITUIR E ADMINISTRAR {DOSE} EV DE 6/6H SOMENTE SE INCAPAZ DE USAR A VIA ORAL (VÔMITOS, DISPNEIA INTENSA); TROCAR PARA PREDNISOLONA VO ASSIM QUE POSSÍVEL — NÃO ASSOCIAR (4 MG/KG/DOSE)",
      "USO ENDOVENOSO",
      {
       "kg": 4,
       "un": "MG",
       "max": 100
      }
     ]
    ],
    "orient": [
     "MONITORIZAÇÃO CONTÍNUA (SATURAÇÃO, FC, FR), ACESSO VENOSO E REAVALIAÇÃO A CADA 20 MIN; SEM RESPOSTA NA 1ª HORA → CONSIDERAR SULFATO DE MAGNÉSIO E ACIONAR A UTI PEDIÁTRICA",
     "GASOMETRIA SE SATURAÇÃO BAIXA PERSISTENTE OU SINAIS DE FADIGA (PACO2 NORMAL OU ELEVADA NA CRISE GRAVE = FALÊNCIA RESPIRATÓRIA IMINENTE)"
    ]
   },
   {
    "label": "Crise grave sem resposta na 1ª hora: sulfato de magnésio EV",
    "mode": "ped_internacao",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "SULFATO DE MAGNÉSIO 10% (100 MG/ML) SOLUÇÃO INJETÁVEL",
      "01 A 02 AMPOLAS 10 ML",
      "ADMINISTRAR {DOSE} EV EM BOMBA DE INFUSÃO EM 20 MINUTOS, DOSE ÚNICA (50 MG/KG = 0,5 ML/KG; MÁXIMO 2 G = 20 ML)",
      "USO ENDOVENOSO",
      {
       "kg": 50,
       "conc": 100,
       "un": "ML",
       "max": 2000
      }
     ]
    ],
    "orient": [
     "CONSIDERAR EM CRIANÇA ≥ 2 ANOS COM CRISE GRAVE SEM RESPOSTA A SALBUTAMOL + IPRATRÓPIO E CORTICOIDE NA 1ª HORA (NÃO É ROTINA; EVIDÊNCIA LIMITADA EM < 2 ANOS)",
     "MONITORAR PA, FC, FR E REFLEXOS DURANTE A INFUSÃO; INTERROMPER SE HIPOTENSÃO, BRADICARDIA OU ARREFLEXIA"
    ]
   },
   {
    "label": "Padrão — Crise moderada (não leve): associar ipratrópio spray com espaçador na 1ª hora",
    "mode": "internacao",
    "draft": true,
    "items": [
     [
      "BROMETO DE IPRATRÓPIO 20 MCG/JATO AEROSSOL",
      "01 FRASCO",
      "INALAR 04 A 08 JATOS COM ESPAÇADOR JUNTO COM CADA DOSE DE SALBUTAMOL, DE 20/20 MIN, ATÉ 03 VEZES NA PRIMEIRA HORA; DEPOIS SUSPENDER (SEM BENEFÍCIO APÓS 1 A 2 HORAS)",
      "USO INALATÓRIO"
     ]
    ]
   },
   {
    "label": "Do material do Drive — Sem salbutamol em solução: nebulização com fenoterol + ipratrópio",
    "mode": "internacao",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "BROMIDRATO DE FENOTEROL 5 MG/ML SOLUÇÃO PARA INALAÇÃO (GOTAS)",
      "01 FRASCO",
      "NEBULIZAR 10 GOTAS (2,5 MG) JUNTO COM BROMETO DE IPRATRÓPIO 40 GOTAS (0,5 MG) EM 3 A 5 ML DE SF 0,9%, COM O2 A 6-8 L/MIN, DE 20/20 MIN NA PRIMEIRA HORA (ATÉ 03 VEZES); DEPOIS CONFORME A RESPOSTA. VIGIAR TAQUICARDIA, TREMOR E HIPOCALEMIA",
      "USO INALATÓRIO"
     ]
    ]
   },
   {
    "label": "Padrão — Alta pós-crise: corticoide oral (prednisolona) até completar 03 a 05 dias",
    "mode": "ped",
    "draft": true,
    "items": [
     [
      "PREDNISOLONA 3 MG/ML SOLUÇÃO ORAL",
      "01 FRASCO",
      "DAR {DOSE} VIA ORAL 01 VEZ AO DIA, PELA MANHÃ, ATÉ COMPLETAR 03 A 05 DIAS DE CORTICOIDE, CONTANDO A DOSE DADA NO PRONTO-SOCORRO (1 MG/KG/DIA; MÁXIMO 20 MG SE MENOR DE 2 ANOS, 30 MG DE 2 A 5 ANOS E 40 MG A PARTIR DE 6 ANOS)",
      "USO ORAL",
      {
       "kg": 1,
       "conc": 3,
       "un": "ML",
       "max": 40
      }
     ]
    ],
    "orient": [
     "DAR O CORTICOIDE PELA MANHÃ, APÓS ALIMENTAÇÃO, PELOS DIAS INDICADOS; SE VOMITAR EM ATÉ 30 MINUTOS, REPETIR A DOSE"
    ]
   },
   {
    "label": "Padrão — Alta pós-crise: corticoide inalatório diário + salbutamol de resgate, com espaçador",
    "mode": "ped",
    "draft": true,
    "items": [
     [
      "BECLOMETASONA 50 MCG/JATO AEROSSOL",
      "01 FRASCO",
      "INALAR COM ESPAÇADOR DE 12/12H, TODOS OS DIAS, MESMO SEM SINTOMAS — ATÉ 5 ANOS: 01 JATO; 6 A 11 ANOS: 01 A 02 JATOS. ENXAGUAR OU LIMPAR A BOCA APÓS O USO",
      "USO INALATÓRIO"
     ],
     [
      "SALBUTAMOL 100 MCG/JATO AEROSSOL",
      "01 FRASCO",
      "SE FALTA DE AR, TOSSE OU CHIADO: INALAR COM ESPAÇADOR, 01 JATO POR VEZ SEGUIDO DE 05 A 06 RESPIRAÇÕES — ATÉ 5 ANOS: 02 JATOS; 6 A 11 ANOS: 02 A 04 JATOS — PODENDO REPETIR A CADA 04 HORAS. SE PRECISAR ANTES DE 04 HORAS OU NÃO MELHORAR, PROCURAR ATENDIMENTO",
      "USO INALATÓRIO"
     ],
     [
      "ESPAÇADOR VALVULADO (COM MÁSCARA FACIAL SE MENOR DE 4 ANOS)",
      "01 UNIDADE",
      "USAR EM TODAS AS INALAÇÕES COM SPRAY; LAVAR COM ÁGUA E DETERGENTE NEUTRO E DEIXAR SECAR AO AR, SEM ENXUGAR",
      "USO INALATÓRIO"
     ]
    ],
    "orient": [
     "O CORTICOIDE INALATÓRIO É O TRATAMENTO DA ASMA: USAR TODOS OS DIAS, MESMO SEM CHIADO; O SALBUTAMOL É SÓ PARA A CRISE",
     "CONSULTA NA UBS EM 1 A 2 DIAS (ATÉ 5 ANOS) OU EM 2 A 5 DIAS (6 A 11 ANOS) PARA REVISAR A TÉCNICA COM O ESPAÇADOR E AJUSTAR O TRATAMENTO",
     "A PARTIR DE 12 ANOS: USAR OS BLOCOS DE ADULTO (BUDESONIDA-FORMOTEROL EM MANUTENÇÃO E RESGATE)",
     "RETORNAR IMEDIATAMENTE SE CANSAÇO FORTE, DIFICULDADE PARA FALAR OU MAMAR, LÁBIOS ROXOS, SONOLÊNCIA OU NECESSIDADE DE SALBUTAMOL ANTES DE 04 HORAS"
    ]
   }
  ]
 },
 {
  "id": "bursites",
  "ic": "🦵",
  "nm": "Bursites",
  "sub": "ibuprofeno · diclofenaco gel · dipirona",
  "blocks": [
   {
    "label": "Padrão — AINE oral ou tópico (tópico se idoso ou risco com AINE oral) — escolha 1",
    "draft": true,
    "menu": true,
    "items": [
     [
      "IBUPROFENO 600 MG",
      "21 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO DE 8/8H, APÓS AS REFEIÇÕES, POR 07 DIAS"
     ],
     [
      "DICLOFENACO 50 MG",
      "15 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO DE 8/8H, POR 05 DIAS SEGUIDOS HORÁRIO SUGERIDO (8/8h): 06:00 / 14:00 / 22:00"
     ],
     [
      "DICLOFENACO DIETILAMÔNIO 11,6 MG/G GEL",
      "01 BISNAGA",
      "APLICAR UMA FINA CAMADA SOBRE A REGIÃO DOLORIDA, MASSAGEANDO LEVEMENTE, 03 A 04 VEZES AO DIA POR ATÉ 14 DIAS",
      "USO TÓPICO"
     ]
    ],
    "orient": [
     "REPOUSO RELATIVO DA ARTICULAÇÃO, EVITAR APOIAR OU FAZER PRESSÃO SOBRE A REGIÃO (USAR ACOLCHOAMENTO) E EVITAR MOVIMENTOS REPETITIVOS. GELO ENVOLTO EM PANO POR 15 A 20 MINUTOS, 3 A 4 VEZES AO DIA, NOS PRIMEIROS DIAS",
     "BURSITE SUPERFICIAL (OLÉCRANO/PRÉ-PATELAR) QUENTE E VERMELHA, COM FEBRE OU FERIMENTO NO LOCAL: SUSPEITAR DE BURSITE SÉPTICA — PUNÇÃO DO LÍQUIDO (GRAM E CULTURA) E ANTIBIÓTICO ANTIESTAFILOCÓCICO",
     "SEM MELHORA EM 2 A 4 SEMANAS: FISIOTERAPIA E AVALIAR INFILTRAÇÃO COM CORTICOIDE NA BURSITE NÃO SÉPTICA (SUBACROMIAL/TROCANTÉRICA) — ORTOPEDIA OU REUMATOLOGIA",
     "RETORNAR IMEDIATAMENTE SE FEBRE, VERMELHIDÃO OU CALOR QUE SE ESPALHA, SAÍDA DE PUS OU PIORA PROGRESSIVA DA DOR E DO INCHAÇO"
    ]
   },
   {
    "label": "Padrão — Analgésico / antitérmico",
    "draft": true,
    "items": [
     [
      "DIPIRONA 500 MG",
      "01 CAIXA",
      "TOMAR 02 COMPRIMIDOS SE DOR OU FEBRE, PODENDO REPETIR DE 6/6H"
     ],
     [
      "PARACETAMOL 750 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO SE DOR OU FEBRE, PODENDO REPETIR DE 6/6H. INTERCALAR COM DIPIRONA, SE NECESSÁRIO."
     ]
    ]
   },
   {
    "label": "Combinação pronta — AINE oral por curto prazo + analgésico",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "IBUPROFENO 600 MG",
      "21 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO DE 8/8H, APÓS AS REFEIÇÕES, POR 07 DIAS"
     ],
     [
      "DIPIRONA 500 MG",
      "01 CAIXA",
      "TOMAR 02 COMPRIMIDOS SE DOR OU FEBRE, PODENDO REPETIR DE 6/6H"
     ]
    ]
   },
   {
    "label": "Combinação pronta — Idoso ou risco com AINE oral: AINE tópico + dipirona",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "DICLOFENACO DIETILAMÔNIO 11,6 MG/G GEL",
      "01 BISNAGA",
      "APLICAR UMA FINA CAMADA SOBRE A REGIÃO DOLORIDA, MASSAGEANDO LEVEMENTE, 03 A 04 VEZES AO DIA POR ATÉ 14 DIAS",
      "USO TÓPICO"
     ],
     [
      "DIPIRONA 500 MG",
      "01 CAIXA",
      "TOMAR 02 COMPRIMIDOS SE DOR OU FEBRE, PODENDO REPETIR DE 6/6H"
     ]
    ]
   },
   {
    "label": "Nimesulida betaciclodextrina (AINE de 2ª linha, até 03 dias)",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "NIMESULIDA BETACICLODEXTRINA 400 MG",
      "06 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO DE 12/12H, APÓS AS REFEIÇÕES, POR ATÉ 03 DIAS (EQUIVALE A 100 MG DE NIMESULIDA). NÃO USAR SE DOENÇA DO FÍGADO OU USO FREQUENTE DE ÁLCOOL"
     ]
    ]
   },
   {
    "label": "AINE em tomada única diária: diclofenaco 100 mg de liberação prolongada",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "DICLOFENACO SÓDICO 100 MG COMPRIMIDO DE LIBERAÇÃO PROLONGADA",
      "05 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO 01 VEZ AO DIA, APÓS UMA REFEIÇÃO, POR 05 DIAS",
      "USO ORAL"
     ]
    ]
   },
   {
    "label": "AINE sublingual para dor intensa: cetorolaco por até 03 dias",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "CETOROLACO TROMETAMINA 10MG",
      "06 COMPRIMIDOS",
      "COLOCAR 01 COMPRIMIDO EMBAIXO DA LÍNGUA E ESPERAR DISSOLVER, PODENDO REPETIR DE 8/8H SE DOR, POR NO MÁXIMO 03 DIAS. NÃO USAR SE DOENÇA RENAL, ÚLCERA OU SANGRAMENTO DIGESTIVO, GESTAÇÃO OU USO DE OUTRO ANTI-INFLAMATÓRIO",
      "USO SUBLINGUAL"
     ]
    ]
   },
   {
    "label": "AINE (anti-inflamatório) — escolha 1",
    "sec": "offlabel",
    "draft": true,
    "menu": true,
    "items": [
     [
      "IBUPROFENO 300 MG",
      "01 CAIXA",
      "TOMAR 02 COMPRIMIDOS DE 6/6H POR 05 DIAS"
     ],
     [
      "DICLOFENACO 50 MG",
      "15 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO DE 8/8H, POR 05 DIAS SEGUIDOS HORÁRIO SUGERIDO (8/8h): 06:00 / 14:00 / 22:00"
     ],
     [
      "NIMESULIDA 100 MG",
      "10 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO DE 12/12H, APÓS AS REFEIÇÕES, POR NO MÁXIMO 05 DIAS. NÃO USAR SE DOENÇA DO FÍGADO OU USO FREQUENTE DE ÁLCOOL"
     ],
     [
      "NAPROXENO SÓDICO 500 MG",
      "10 COMPRIMIDOS",
      "TOMAR UM COMPRIMIDO SE DOR, PODENDO REPETIR DE 12/12H POR ATÉ 05 DIAS SEGUIDOS"
     ]
    ]
   },
   {
    "label": "Padrão — Bursite séptica superficial leve (após punção, sem febre, sem imunossupressão): antibiótico oral por 10 a 14 dias e reavaliação diária — escolha 1",
    "draft": true,
    "menu": true,
    "items": [
     [
      "CEFALEXINA 500 MG",
      "40 CÁPSULAS",
      "TOMAR 01 CÁPSULA DE 6/6H POR 10 DIAS (PODE SER ESTENDIDO ATÉ 14 DIAS CONFORME A EVOLUÇÃO)",
      "USO ORAL"
     ],
     [
      "CLINDAMICINA 300 MG",
      "40 CÁPSULAS",
      "ALERGIA À PENICILINA: TOMAR 01 CÁPSULA DE 6/6H POR 10 DIAS (PODE SER ESTENDIDO ATÉ 14 DIAS)",
      "USO ORAL"
     ],
     [
      "SULFAMETOXAZOL + TRIMETOPRIMA 800 MG + 160 MG",
      "40 COMPRIMIDOS",
      "ALERGIA À PENICILINA OU RISCO DE MRSA: TOMAR 01 A 02 COMPRIMIDOS DE 12/12H POR 10 DIAS (AJUSTAR SE DOENÇA RENAL)",
      "USO ORAL"
     ]
    ],
    "orient": [
     "BURSITE INFECCIOSA: VOLTAR PARA REAVALIAÇÃO TODOS OS DIAS ATÉ MELHORAR; A PUNÇÃO PODE PRECISAR SER REPETIDA SE O LÍQUIDO VOLTAR A ACUMULAR",
     "TOMAR O ANTIBIÓTICO ATÉ O FIM, MESMO QUE MELHORE ANTES; ELE PODE SER TROCADO PELO RESULTADO DA CULTURA DO LÍQUIDO",
     "FEBRE, VERMELHIDÃO QUE SE ESPALHA, PIORA EM 48 HORAS, DIABETES DESCOMPENSADO OU IMUNOSSUPRESSÃO: INTERNAR PARA ANTIBIÓTICO ENDOVENOSO"
    ]
   },
   {
    "label": "Padrão — Bursite séptica com febre, celulite extensa, imunossupressão ou falha do antibiótico oral: antibiótico EV + ortopedia — escolha 1",
    "mode": "internacao",
    "draft": true,
    "menu": true,
    "items": [
     [
      "CEFAZOLINA 1 G PÓ PARA SOLUÇÃO INJETÁVEL",
      "01 FRASCO-AMPOLA",
      "ADMINISTRAR 1 G EV DE 8/8H, DILUÍDO EM 100 ML DE SF 0,9%, EM 30 MINUTOS; APÓS MELHORA CLÍNICA, TROCAR POR CEFALEXINA 500 MG VO DE 6/6H (TOTAL 10 A 14 DIAS). AJUSTAR SE DOENÇA RENAL",
      "USO ENDOVENOSO"
     ],
     [
      "VANCOMICINA 500 MG PÓ PARA SOLUÇÃO INJETÁVEL",
      "FRASCOS-AMPOLA CONFORME DOSE",
      "SE RISCO DE MRSA (MRSA PRÉVIO, HEMODIÁLISE, INTERNAÇÃO RECENTE, DROGA INJETÁVEL) OU ALERGIA GRAVE A BETALACTÂMICO: ADMINISTRAR {DOSE} EV DE 12/12H (15 MG/KG/DOSE, PESO REAL), DILUÍDO EM SF 0,9% (ATÉ 5 MG/ML), EM NO MÍNIMO 60 MINUTOS. AJUSTAR PELA FUNÇÃO RENAL E NÍVEL SÉRICO",
      "USO ENDOVENOSO",
      {
       "kg": 15,
       "un": "MG",
       "max": 2000
      }
     ]
    ],
    "orient": [
     "COLHER HEMOCULTURAS E LÍQUIDO DA BURSA (GRAM, CULTURA E CRISTAIS) ANTES DA 1ª DOSE, SEM ATRASAR O ANTIBIÓTICO",
     "AVALIAÇÃO DA ORTOPEDIA: DRENAGEM OU BURSECTOMIA SE NÃO MELHORAR EM 48 A 72 HORAS OU SE COLEÇÃO LOCULADA",
     "AJUSTAR O ANTIBIÓTICO PELA CULTURA E COMPLETAR 10 A 14 DIAS NO TOTAL, PASSANDO PARA VIA ORAL APÓS A MELHORA"
    ]
   }
  ]
 },
 {
  "id": "calmantes",
  "ic": "🌼",
  "nm": "Calmantes fitoterápicos",
  "sub": "passíflora · valeriana",
  "blocks": [
   {
    "label": "Padrão — ansiedade leve (passíflora)",
    "draft": true,
    "items": [
     [
      "PASSÍFLORA INCARNATA 500 MG",
      "30 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO DE 12/12H POR 15 DIAS"
     ]
    ],
    "orient": [
     "USO INDICADO APENAS PARA SINTOMAS LEVES E PASSAGEIROS DE ANSIEDADE, NERVOSISMO OU INSÔNIA, POR POUCAS SEMANAS (NÃO É PARA USO PROLONGADO). REAVALIAR NA UBS EM 2 A 4 SEMANAS",
     "PODE CAUSAR SONOLÊNCIA: NÃO DIRIGIR OU OPERAR MÁQUINAS E NÃO INGERIR BEBIDA ALCOÓLICA OU OUTROS CALMANTES JUNTO",
     "NÃO USAR NA GRAVIDEZ, NA AMAMENTAÇÃO OU EM MENORES DE 12 ANOS",
     "HIGIENE DO SONO: HORÁRIOS REGULARES PARA DORMIR E ACORDAR, EVITAR CAFÉ, ENERGÉTICOS E TELAS À NOITE, PRATICAR ATIVIDADE FÍSICA REGULAR",
     "PROCURAR ATENDIMENTO IMEDIATAMENTE SE PENSAMENTOS DE MORTE OU SUICÍDIO, CRISES DE PÂNICO FREQUENTES OU PIORA IMPORTANTE DOS SINTOMAS"
    ]
   },
   {
    "label": "Padrão — insônia leve e passageira (valeriana)",
    "draft": true,
    "items": [
     [
      "VALERIANA OFFICINALIS 100 MG",
      "30 COMPRIMIDOS",
      "TOMAR 02 COMPRIMIDOS 01 VEZ AO DIA, DE 30 MINUTOS A 2 HORAS ANTES DE DORMIR, POR 15 DIAS"
     ]
    ]
   },
   {
    "label": "Passiflora em dose única à noite (insônia leve), por 10 dias",
    "sec": "offlabel",
    "items": [
     [
      "PASSÍFLORA INCARNATA 500 MG",
      "10 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO 01 VEZ À NOITE POR 10 DIAS"
     ]
    ]
   }
  ]
 },
 {
  "id": "cefaleia",
  "ic": "🤕",
  "nm": "Cefaleia",
  "sub": "dipirona · paracetamol · naproxeno · metoclopramida · sumatriptana",
  "blocks": [
   {
    "label": "Padrão — Analgésico / antitérmico",
    "draft": true,
    "items": [
     [
      "DIPIRONA 500 MG",
      "01 CAIXA",
      "TOMAR 02 COMPRIMIDOS SE DOR OU FEBRE, PODENDO REPETIR DE 6/6H"
     ],
     [
      "PARACETAMOL 750 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO SE DOR OU FEBRE, PODENDO REPETIR DE 6/6H. INTERCALAR COM DIPIRONA, SE NECESSÁRIO."
     ]
    ],
    "orient": [
     "TOMAR A MEDICAÇÃO LOGO NO INÍCIO DA DOR; EVITAR ANALGÉSICOS POR MAIS DE 10 DIAS NO MÊS (RISCO DE CEFALEIA POR USO EXCESSIVO DE MEDICAMENTOS)",
     "MANTER SONO REGULAR, BOA HIDRATAÇÃO E REFEIÇÕES EM HORÁRIOS REGULARES; ANOTAR AS CRISES EM UM DIÁRIO DE DOR DE CABEÇA",
     "PROCURAR A UBS PARA AVALIAR TRATAMENTO PREVENTIVO SE 04 OU MAIS CRISES POR MÊS OU CRISES INCAPACITANTES",
     "RETORNAR IMEDIATAMENTE SE: DOR SÚBITA E MUITO FORTE (PIOR DA VIDA), FEBRE COM RIGIDEZ DE NUCA, CONFUSÃO, CONVULSÃO, FRAQUEZA OU FORMIGAMENTO, ALTERAÇÃO DA FALA OU DA VISÃO, OU DOR QUE PIORA PROGRESSIVAMENTE"
    ]
   },
   {
    "label": "Padrão — AINE (anti-inflamatório) — escolha 1",
    "draft": true,
    "menu": true,
    "items": [
     [
      "NAPROXENO SÓDICO 500 MG",
      "10 COMPRIMIDOS",
      "TOMAR UM COMPRIMIDO SE DOR, PODENDO REPETIR DE 12/12H POR ATÉ 05 DIAS SEGUIDOS"
     ],
     [
      "IBUPROFENO 300 MG",
      "01 CAIXA",
      "TOMAR 02 COMPRIMIDOS DE 6/6H POR 05 DIAS"
     ],
     [
      "DICLOFENACO 50 MG",
      "15 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO DE 8/8H, POR 05 DIAS SEGUIDOS HORÁRIO SUGERIDO (8/8h): 06:00 / 14:00 / 22:00"
     ]
    ]
   },
   {
    "label": "Padrão — Antiemético se náuseas — escolha 1",
    "draft": true,
    "menu": true,
    "items": [
     [
      "METOCLOPRAMIDA 10 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO SE NÁUSEAS OU VÔMITOS, PODENDO REPETIR DE 8/8H"
     ],
     [
      "ONDANSETRONA 8 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO SE NÁUSEAS OU VÔMITOS, PODENDO REPETIR DE 8/8H"
     ]
    ]
   },
   {
    "label": "Padrão — enxaqueca moderada a grave (triptano)",
    "draft": true,
    "items": [
     [
      "SUMATRIPTANA 50 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO NO INÍCIO DA CRISE DE ENXAQUECA. SE A DOR MELHORAR E DEPOIS VOLTAR, PODE REPETIR APÓS NO MÍNIMO 02 HORAS; SE NÃO MELHORAR COM A 1ª DOSE, NÃO REPETIR NA MESMA CRISE. MÁXIMO DE 04 COMPRIMIDOS EM 24 HORAS. NÃO USAR SE DOENÇA CORONARIANA, AVC, HIPERTENSÃO NÃO CONTROLADA, GESTAÇÃO OU ERGOTAMINA NAS ÚLTIMAS 24 H"
     ]
    ]
   },
   {
    "label": "Combinação pronta — analgésico simples + AINE + antiemético",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "DIPIRONA 500 MG",
      "01 CAIXA",
      "TOMAR 02 COMPRIMIDOS SE DOR OU FEBRE, PODENDO REPETIR DE 6/6H"
     ],
     [
      "NAPROXENO SÓDICO 500 MG",
      "10 COMPRIMIDOS",
      "TOMAR UM COMPRIMIDO SE DOR, PODENDO REPETIR DE 12/12H POR ATÉ 05 DIAS SEGUIDOS"
     ],
     [
      "METOCLOPRAMIDA 10 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO SE NÁUSEAS OU VÔMITOS, PODENDO REPETIR DE 8/8H"
     ]
    ]
   },
   {
    "label": "Analgésico/antitérmico — escolha 1",
    "sec": "offlabel",
    "menu": true,
    "items": [
     [
      "DIPIRONA 500 MG",
      "01 CAIXA",
      "TOMAR 02 COMPRIMIDOS SE DOR OU FEBRE, PODENDO REPETIR DE 6/6H"
     ],
     [
      "PARACETAMOL 750 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO SE DOR OU FEBRE, PODENDO REPETIR DE 6/6H. INTERCALAR COM DIPIRONA, SE NECESSÁRIO."
     ]
    ]
   },
   {
    "label": "AINE (anti-inflamatório) — escolha 1",
    "sec": "offlabel",
    "menu": true,
    "items": [
     [
      "NAPROXENO SÓDICO 500 MG",
      "10 COMPRIMIDOS",
      "TOMAR UM COMPRIMIDO SE DOR, PODENDO REPETIR DE 12/12H POR ATÉ 05 DIAS SEGUIDOS"
     ],
     [
      "IBUPROFENO 300 MG",
      "01 CAIXA",
      "TOMAR 02 COMPRIMIDOS DE 6/6H POR 05 DIAS"
     ],
     [
      "DICLOFENACO 50 MG",
      "15 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO DE 8/8H, POR 05 DIAS SEGUIDOS HORÁRIO SUGERIDO (8/8h): 06:00 / 14:00 / 22:00"
     ]
    ]
   },
   {
    "label": "Antiemético — escolha 1",
    "sec": "offlabel",
    "menu": true,
    "items": [
     [
      "METOCLOPRAMIDA 10 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO SE NÁUSEAS OU VÔMITOS, PODENDO REPETIR DE 8/8H"
     ],
     [
      "ONDANSETRONA 8 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO SE NÁUSEAS OU VÔMITOS, PODENDO REPETIR DE 8/8H"
     ],
     [
      "DIMENIDRINATO 50 MG + PIRIDOXINA 10MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO SE VERTIGEM, NÁUSEAS OU VÔMITOS, PODENDO REPETIR DE 6/6H"
     ]
    ]
   },
   {
    "label": "Padrão — crise de enxaqueca/cefaleia primária no PS: dipirona + metoclopramida + dexametasona",
    "mode": "internacao",
    "draft": true,
    "items": [
     [
      "DIPIRONA 500 MG/ML SOLUÇÃO INJETÁVEL",
      "01 AMPOLA 2 ML",
      "ADMINISTRAR 1 G (2 ML) EV, DILUÍDO EM 100 ML DE SF 0,9%, EM 15 MINUTOS; PODE REPETIR ATÉ DE 6/6H SE DOR",
      "USO ENDOVENOSO"
     ],
     [
      "METOCLOPRAMIDA 5 MG/ML SOLUÇÃO INJETÁVEL",
      "01 AMPOLA 2 ML",
      "ADMINISTRAR 10 MG (2 ML) EV, DILUÍDO EM 100 ML DE SF 0,9%, EM 15 MINUTOS (INFUSÃO LENTA REDUZ ACATISIA); PODE REPETIR ATÉ DE 8/8H (MÁXIMO 30 MG/DIA)",
      "USO ENDOVENOSO"
     ],
     [
      "DEXAMETASONA 4 MG/ML SOLUÇÃO INJETÁVEL",
      "01 AMPOLA 2,5 ML",
      "SE ENXAQUECA: ADMINISTRAR 10 MG (2,5 ML) EV, DOSE ÚNICA, PARA REDUZIR A RECORRÊNCIA DA DOR NAS 72 HORAS SEGUINTES",
      "USO ENDOVENOSO"
     ]
    ],
    "orient": [
     "ANTES DE TRATAR COMO PRIMÁRIA, PESQUISAR SINAIS DE ALARME: INÍCIO SÚBITO (PIOR DA VIDA), DÉFICIT NEUROLÓGICO, FEBRE OU RIGIDEZ DE NUCA, PAPILEDEMA, CEFALEIA NOVA APÓS 50 ANOS, IMUNOSSUPRESSÃO, GESTAÇÃO/PUERPÉRIO, TRAUMA OU ANTICOAGULANTE — SE PRESENTES, TC DE CRÂNIO E/OU PUNÇÃO LOMBAR",
     "REAVALIAR DOR (ESCALA 0-10), PA E FC EM 60 MINUTOS; SE DOR PERSISTENTE, SEGUIR PARA A 2ª ETAPA",
     "SE ACATISIA OU DISTONIA PELA METOCLOPRAMIDA: BIPERIDENO 2,5-5 MG IM OU EV LENTO, OU DIFENIDRAMINA 25-50 MG EV",
     "EVITAR OPIOIDES (MAIOR RECORRÊNCIA E RISCO DE CEFALEIA POR USO EXCESSIVO DE MEDICAMENTOS); HIDRATAÇÃO EV SOMENTE SE DESIDRATAÇÃO OU VÔMITOS",
     "ALTA COM O ANALGÉSICO ORAL DO PADRÃO AMBULATORIAL E ORIENTAÇÃO DE RETORNO; ENCAMINHAR À UBS PARA PROFILAXIA SE 4 OU MAIS CRISES/MÊS OU CRISES INCAPACITANTES"
    ]
   },
   {
    "label": "Padrão — dor persistente após 1 hora (2ª etapa) — escolha 1",
    "mode": "internacao",
    "draft": true,
    "menu": true,
    "items": [
     [
      "CETOPROFENO 100 MG PÓ PARA SOLUÇÃO INJETÁVEL",
      "01 FRASCO-AMPOLA",
      "ADMINISTRAR 100 MG EV, DILUÍDO EM 100 ML DE SF 0,9%, EM 20 MINUTOS, DOSE ÚNICA. EVITAR SE DOENÇA RENAL, ÚLCERA PÉPTICA, SANGRAMENTO, GESTAÇÃO OU SUSPEITA DE DENGUE",
      "USO ENDOVENOSO"
     ],
     [
      "CLORPROMAZINA 5 MG/ML SOLUÇÃO INJETÁVEL",
      "01 AMPOLA 5 ML",
      "ADMINISTRAR {DOSE} EV (0,1 MG/KG), DILUÍDO EM 100 ML DE SF 0,9%, EM 20 A 30 MINUTOS; PODE REPETIR ATÉ 02 VEZES COM INTERVALO DE 15 MINUTOS. INFUNDIR 500 ML DE SF 0,9% ANTES E MANTER DEITADO (RISCO DE HIPOTENSÃO)",
      "USO ENDOVENOSO",
      {
       "kg": 0.1,
       "un": "MG",
       "max": 25
      }
     ],
     [
      "SUMATRIPTANA 6 MG/0,5 ML SOLUÇÃO INJETÁVEL (SERINGA PREENCHIDA)",
      "01 SERINGA PREENCHIDA",
      "ADMINISTRAR 6 MG SC; PODE REPETIR APÓS 1 HORA (MÁXIMO 12 MG EM 24H). NÃO USAR SE DOENÇA CORONARIANA, AVC/AIT, HIPERTENSÃO NÃO CONTROLADA, GESTAÇÃO OU ERGOTAMINA/OUTRO TRIPTANO NAS ÚLTIMAS 24H",
      "USO SUBCUTÂNEO"
     ]
    ],
    "orient": [
     "CLORPROMAZINA: MONITORIZAR PA (HIPOTENSÃO ORTOSTÁTICA), SONOLÊNCIA E SINTOMAS EXTRAPIRAMIDAIS; LEVANTAR SOMENTE COM AUXÍLIO",
     "DOR REFRATÁRIA À 2ª ETAPA OU DURAÇÃO MAIOR QUE 72 HORAS (ESTADO DE MAL ENXAQUECOSO): REAVALIAR CAUSA SECUNDÁRIA E DISCUTIR COM A NEUROLOGIA"
    ]
   },
   {
    "label": "Cefaleia em salvas (crise aguda)",
    "mode": "internacao",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "OXIGÊNIO 100%",
      "12 A 15 L/MIN",
      "ADMINISTRAR O2 A 100% POR MÁSCARA NÃO REINALANTE COM RESERVATÓRIO, 12 A 15 L/MIN, POR 15 A 20 MINUTOS, COM O PACIENTE SENTADO",
      "USO INALATÓRIO"
     ],
     [
      "SUMATRIPTANA 6 MG/0,5 ML SOLUÇÃO INJETÁVEL (SERINGA PREENCHIDA)",
      "01 SERINGA PREENCHIDA",
      "ADMINISTRAR 6 MG SC NO INÍCIO DA CRISE (INTERVALO MÍNIMO DE 1 HORA; MÁXIMO 12 MG EM 24H). MESMAS CONTRAINDICAÇÕES CARDIOVASCULARES DO TRIPTANO",
      "USO SUBCUTÂNEO"
     ]
    ],
    "orient": [
     "DOR ORBITÁRIA/TEMPORAL UNILATERAL MUITO INTENSA DE 15 A 180 MIN, COM LACRIMEJAMENTO, CONGESTÃO NASAL, PTOSE OU MIOSE DO MESMO LADO E INQUIETAÇÃO",
     "CAUTELA COM O2 A 100% EM PORTADOR DE DPOC RETENTOR DE CO2",
     "PRIMEIRO EPISÓDIO EXIGE NEUROIMAGEM; ENCAMINHAR À NEUROLOGIA PARA TRATAMENTO DE TRANSIÇÃO E PREVENTIVO (VERAPAMIL)"
    ]
   },
   {
    "label": "Gestante (crise de enxaqueca)",
    "mode": "internacao",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "PARACETAMOL 500 MG",
      "02 COMPRIMIDOS",
      "TOMAR 02 COMPRIMIDOS (1 G) VIA ORAL, PODENDO REPETIR DE 6/6H SE DOR (MÁXIMO 4 G/DIA)",
      "USO ORAL"
     ],
     [
      "METOCLOPRAMIDA 5 MG/ML SOLUÇÃO INJETÁVEL",
      "01 AMPOLA 2 ML",
      "ADMINISTRAR 10 MG (2 ML) EV, DILUÍDO EM 100 ML DE SF 0,9%, EM 15 MINUTOS; PODE REPETIR ATÉ DE 8/8H",
      "USO ENDOVENOSO"
     ]
    ],
    "orient": [
     "EVITAR AINE APÓS 20 SEMANAS, DIPIRONA NO 3º TRIMESTRE, ERGOTAMINA E VALPROATO; TRIPTANO SOMENTE SE O BENEFÍCIO SUPERAR O RISCO",
     "CEFALEIA NOVA OU DIFERENTE NA GESTAÇÃO/PUERPÉRIO: AFERIR PA E AFASTAR PRÉ-ECLÂMPSIA, TROMBOSE VENOSA CEREBRAL E SÍNDROME DE VASOCONSTRIÇÃO CEREBRAL REVERSÍVEL"
    ]
   },
   {
    "label": "Padrão — analgésico oral na crise leve a moderada — escolha 1",
    "mode": "ped",
    "draft": true,
    "menu": true,
    "items": [
     [
      "IBUPROFENO 50 MG/ML SUSPENSÃO ORAL (GOTAS)",
      "01 FRASCO",
      "DAR {DOSE} VIA ORAL NO INÍCIO DA DOR, PODENDO REPETIR DE 8/8H (10 MG/KG/DOSE). ACIMA DE 6 MESES; NÃO USAR SE DESIDRATAÇÃO OU SUSPEITA DE DENGUE",
      "USO ORAL",
      {
       "kg": 10,
       "conc": 50,
       "gotas": 10,
       "un": "GOTAS",
       "max": 200
      }
     ],
     [
      "PARACETAMOL 200 MG/ML SOLUÇÃO ORAL (GOTAS)",
      "01 FRASCO",
      "DAR {DOSE} VIA ORAL DE 6/6H SE DOR OU FEBRE (15 MG/KG/DOSE)",
      "USO ORAL",
      {
       "kg": 15,
       "conc": 200,
       "gotas": 15,
       "un": "GOTAS",
       "max": 750
      }
     ],
     [
      "DIPIRONA 500 MG/ML SOLUÇÃO ORAL (GOTAS)",
      "01 FRASCO",
      "DAR {DOSE} VIA ORAL DE 6/6H SE DOR OU FEBRE (15 MG/KG/DOSE). ACIMA DE 3 MESES OU 5 KG",
      "USO ORAL",
      {
       "kg": 15,
       "conc": 500,
       "gotas": 20,
       "un": "GOTAS",
       "max": 1000
      }
     ]
    ],
    "orient": [
     "PESAR A CRIANÇA; DAR O ANALGÉSICO LOGO NO INÍCIO DA DOR E MANTER EM AMBIENTE ESCURO E SILENCIOSO, ESTIMULANDO O SONO E A HIDRATAÇÃO",
     "LIMITAR ANALGÉSICOS A NO MÁXIMO 2-3 DIAS POR SEMANA (RISCO DE CEFALEIA POR USO EXCESSIVO); NÃO USAR AAS (SÍNDROME DE REYE)",
     "SINAIS DE ALARME (NEUROIMAGEM): DOR QUE ACORDA A CRIANÇA OU COM VÔMITOS AO ACORDAR, PIORA PROGRESSIVA, DÉFICIT NEUROLÓGICO, ATAXIA, MUDANÇA DE COMPORTAMENTO, FEBRE COM RIGIDEZ DE NUCA, TRAUMA OU CRIANÇA MENOR DE 6 ANOS SEM HISTÓRIA FAMILIAR DE ENXAQUECA",
     "RETORNAR SE PIORA, VÔMITOS PERSISTENTES, SONOLÊNCIA, CONVULSÃO OU FRAQUEZA; ENCAMINHAR À NEUROPEDIATRIA SE CRISES FREQUENTES OU INCAPACITANTES"
    ]
   },
   {
    "label": "Padrão — crise intensa ou com vômitos no PS (parenteral)",
    "mode": "ped_internacao",
    "draft": true,
    "items": [
     [
      "DIPIRONA 500 MG/ML SOLUÇÃO INJETÁVEL",
      "01 AMPOLA 2 ML",
      "ADMINISTRAR {DOSE} EV, DILUÍDO EM 10 ML DE SF 0,9%, LENTAMENTE, ATÉ DE 6/6H SE DOR (15 MG/KG/DOSE). ACIMA DE 1 ANO",
      "USO ENDOVENOSO",
      {
       "kg": 15,
       "un": "MG",
       "max": 1000
      }
     ],
     [
      "ONDANSETRONA 2 MG/ML SOLUÇÃO INJETÁVEL",
      "01 AMPOLA 2 ML",
      "ADMINISTRAR {DOSE} EV LENTO (EM 5 MINUTOS) SE NÁUSEAS OU VÔMITOS, ATÉ DE 8/8H (0,15 MG/KG/DOSE). ACIMA DE 6 MESES",
      "USO ENDOVENOSO",
      {
       "kg": 0.15,
       "un": "MG",
       "max": 4
      }
     ],
     [
      "CLORETO DE SÓDIO 0,9% (SORO FISIOLÓGICO)",
      "01 BOLSA 500 ML",
      "SE DESIDRATAÇÃO OU VÔMITOS: INFUNDIR {DOSE} EV EM 30 A 60 MINUTOS (20 ML/KG)",
      "USO ENDOVENOSO",
      {
       "kg": 20,
       "un": "ML",
       "max": 1000
      }
     ]
    ],
    "orient": [
     "PREFERIR IBUPROFENO VIA ORAL QUANDO NÃO HOUVER VÔMITOS; MONITORIZAR FC, PA, SATURAÇÃO, DOR E NÍVEL DE CONSCIÊNCIA",
     "METOCLOPRAMIDA: CONTRAINDICADA EM MENORES DE 1 ANO E NÃO RECOMENDADA PELA BULA DE 1 A 18 ANOS (RISCO EXTRAPIRAMIDAL) — USAR ONDANSETRONA COMO ANTIEMÉTICO",
     "DOR REFRATÁRIA, ALTERAÇÃO NEUROLÓGICA OU SINAIS DE ALARME: NEUROIMAGEM E AVALIAÇÃO DA NEUROPEDIATRIA"
    ]
   },
   {
    "label": "Adolescente com enxaqueca e peso ≥ 40 kg (triptano)",
    "peso": {
     "de": 40
    },
    "mode": "ped",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "RIZATRIPTANA 10 MG",
      "01 CAIXA",
      "6 A 17 ANOS COM PESO ≥ 40 KG: TOMAR 01 COMPRIMIDO NO INÍCIO DA CRISE; NO MÁXIMO 01 COMPRIMIDO EM 24 HORAS. NÃO USAR JUNTO COM PROPRANOLOL",
      "USO ORAL"
     ]
    ],
    "orient": [
     "USO FORA DA BULA BRASILEIRA (INDICAÇÃO PEDIÁTRICA APROVADA PELO FDA DE 6 A 17 ANOS)",
     "CONTRAINDICADO EM ENXAQUECA HEMIPLÉGICA OU DE TRONCO, CARDIOPATIA OU HIPERTENSÃO NÃO CONTROLADA"
    ]
   },
   {
    "label": "Do material do Drive — AINE parenteral alternativo ao cetoprofeno: tenoxicam",
    "mode": "internacao",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "TENOXICAM 20 MG PÓ LIÓFILO PARA SOLUÇÃO INJETÁVEL",
      "01 FRASCO-AMPOLA",
      "RECONSTITUIR E ADMINISTRAR 20 MG EV LENTO OU IM, DOSE ÚNICA (NO MÁXIMO 01 VEZ AO DIA). NÃO ASSOCIAR A OUTRO AINE. EVITAR SE DOENÇA RENAL, ÚLCERA PÉPTICA, SANGRAMENTO, GESTAÇÃO OU SUSPEITA DE DENGUE",
      "USO ENDOVENOSO"
     ]
    ]
   }
  ]
 },
 {
  "id": "ceratite",
  "ic": "👁",
  "nm": "Ceratite fotoelétrica",
  "sub": "retinol + cloranfenicol · carmelose · dipirona",
  "blocks": [
   {
    "label": "Padrão — lubrificação + pomada antibiótica + analgesia",
    "draft": true,
    "items": [
     [
      "ACETATO DE RETINOL 10.000 UI/G + AMINOÁCIDOS + METIONINA + CLORANFENICOL 5 MG/G POMADA OFTÁLMICA",
      "01 BISNAGA",
      "APLICAR 01 CM DA POMADA DENTRO DA PÁLPEBRA INFERIOR DO(S) OLHO(S) AFETADO(S) DE 6/6H POR 03 DIAS",
      "USO TÓPICO"
     ],
     [
      "CARMELOSE SÓDICA 5 MG/ML COLÍRIO (LÁGRIMA ARTIFICIAL)",
      "01 FRASCO",
      "PINGAR 01 GOTA NO(S) OLHO(S) AFETADO(S) DE 3/3H, NOS INTERVALOS DA POMADA, POR 03 DIAS; DEPOIS, SÓ SE ARDÊNCIA OU SENSAÇÃO DE AREIA",
      "USO TÓPICO"
     ],
     [
      "DIPIRONA 500 MG",
      "01 CAIXA",
      "TOMAR 02 COMPRIMIDOS SE DOR, PODENDO REPETIR DE 6/6H SE NECESSÁRIO"
     ]
    ],
    "orient": [
     "NÃO USAR COLÍRIO ANESTÉSICO EM CASA (RETARDA A CICATRIZAÇÃO E PODE CAUSAR ÚLCERA DE CÓRNEA). NÃO COÇAR NEM TAMPAR O OLHO COM CURATIVO",
     "COMPRESSAS FRIAS SOBRE AS PÁLPEBRAS FECHADAS, ÓCULOS ESCUROS E REPOUSO EM AMBIENTE COM POUCA LUZ ALIVIAM OS SINTOMAS. NÃO USAR LENTES DE CONTATO ATÉ A MELHORA COMPLETA",
     "MELHORA ESPERADA EM 24 A 72H. RETORNAR IMEDIATAMENTE OU PROCURAR OFTALMOLOGISTA SE PIORA DA VISÃO, DOR QUE AUMENTA, SECREÇÃO AMARELADA, MANCHA BRANCA NO OLHO OU AUSÊNCIA DE MELHORA EM 48H",
     "USAR SEMPRE MÁSCARA DE SOLDA OU ÓCULOS COM FILTRO UV ADEQUADO (INCLUSIVE AJUDANTES PRÓXIMOS À SOLDA) E NÃO SE EXPOR A LÂMPADAS UV SEM PROTEÇÃO"
    ]
   },
   {
    "label": "Do material do Drive — Dor importante: cetorolaco colírio por 02 a 03 dias",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "CETOROLACO DE TROMETAMOL 0,5% COLÍRIO",
      "01 FRASCO",
      "PINGAR 01 GOTA NO(S) OLHO(S) AFETADO(S) DE 6/6H POR 02 A 03 DIAS. NÃO USAR POR MAIS TEMPO SEM AVALIAÇÃO DO OFTALMOLOGISTA",
      "USO TÓPICO"
     ]
    ]
   }
  ]
 },
 {
  "id": "chikungunya",
  "ic": "🦟",
  "nm": "Chikungunya",
  "sub": "dipirona · paracetamol · codeína",
  "blocks": [
   {
    "label": "Padrão — Dipirona em horários fixos",
    "draft": true,
    "items": [
     [
      "DIPIRONA 500 MG",
      "56 COMPRIMIDOS",
      "TOMAR 02 COMPRIMIDOS DE 6/6H, EM HORÁRIOS FIXOS (MESMO SEM DOR), POR 07 DIAS. HORÁRIO SUGERIDO: 06:00 / 12:00 / 18:00 / 00:00"
     ]
    ],
    "orient": [
     "BEBER PELO MENOS 02 LITROS DE LÍQUIDOS POR DIA (ÁGUA, SUCOS, SORO DE REIDRATAÇÃO ORAL)",
     "REPOUSO; APLICAR COMPRESSAS FRIAS NAS ARTICULAÇÕES DOLORIDAS POR 20 MINUTOS A CADA 04 HORAS; NÃO USAR CALOR NAS ARTICULAÇÕES; RETIRAR ANÉIS E ALIANÇAS",
     "NÃO USAR ANTI-INFLAMATÓRIOS (IBUPROFENO, DICLOFENACO, NIMESULIDA, NAPROXENO), AAS OU CORTICOIDES NESTA FASE DA DOENÇA E EVITAR AUTOMEDICAÇÃO",
     "RETORNAR SE A FEBRE DURAR MAIS DE 05 DIAS OU SE A DOR PERSISTIR APÓS O TRATAMENTO (GESTANTES, IDOSOS E PORTADORES DE DOENÇAS CRÔNICAS: REAVALIAÇÃO DIÁRIA ATÉ O FIM DA FEBRE)",
     "RETORNAR IMEDIATAMENTE SE VÔMITOS PERSISTENTES, DOR ABDOMINAL INTENSA, SANGRAMENTOS, FALTA DE AR, DOR NO PEITO OU PALPITAÇÕES, DIMINUIÇÃO DA URINA, TONTURA OU DESMAIO, SONOLÊNCIA, CONVULSÃO, DOR DE CABEÇA FORTE OU FRAQUEZA NOS BRAÇOS OU PERNAS"
    ]
   },
   {
    "label": "Padrão — Intercalar com a dipirona (paracetamol + codeína se dor intensa, EVA ≥ 7) — escolha 1",
    "draft": true,
    "menu": true,
    "items": [
     [
      "PARACETAMOL 750 MG",
      "28 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO DE 6/6H, EM HORÁRIOS FIXOS, INTERCALANDO COM A DIPIRONA (03 HORAS APÓS CADA DOSE DE DIPIRONA), POR 07 DIAS. HORÁRIO SUGERIDO: 09:00 / 15:00 / 21:00 / 03:00"
     ],
     [
      "PARACETAMOL 500 MG + CODEÍNA 30 MG",
      "20 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO DE 6/6H, EM HORÁRIOS FIXOS, INTERCALANDO COM A DIPIRONA (03 HORAS APÓS CADA DOSE DE DIPIRONA), POR 05 DIAS. HORÁRIO SUGERIDO: 09:00 / 15:00 / 21:00 / 03:00"
     ]
    ]
   },
   {
    "label": "Combinação pronta — fase aguda (dor leve a moderada): dipirona + paracetamol em horários fixos",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "DIPIRONA 500 MG",
      "56 COMPRIMIDOS",
      "TOMAR 02 COMPRIMIDOS DE 6/6H, EM HORÁRIOS FIXOS (MESMO SEM DOR), POR 07 DIAS. HORÁRIO SUGERIDO: 06:00 / 12:00 / 18:00 / 00:00"
     ],
     [
      "PARACETAMOL 750 MG",
      "28 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO DE 6/6H, EM HORÁRIOS FIXOS, INTERCALANDO COM A DIPIRONA (03 HORAS APÓS CADA DOSE DE DIPIRONA), POR 07 DIAS. HORÁRIO SUGERIDO: 09:00 / 15:00 / 21:00 / 03:00"
     ]
    ]
   },
   {
    "label": "Combinação pronta — dor intensa (EVA ≥ 7): dipirona + paracetamol/codeína em horários fixos",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "DIPIRONA 500 MG",
      "56 COMPRIMIDOS",
      "TOMAR 02 COMPRIMIDOS DE 6/6H, EM HORÁRIOS FIXOS (MESMO SEM DOR), POR 07 DIAS. HORÁRIO SUGERIDO: 06:00 / 12:00 / 18:00 / 00:00"
     ],
     [
      "PARACETAMOL 500 MG + CODEÍNA 30 MG",
      "20 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO DE 6/6H, EM HORÁRIOS FIXOS, INTERCALANDO COM A DIPIRONA (03 HORAS APÓS CADA DOSE DE DIPIRONA), POR 05 DIAS. HORÁRIO SUGERIDO: 09:00 / 15:00 / 21:00 / 03:00"
     ]
    ]
   },
   {
    "label": "Padrão — Fase aguda: analgesia em horários fixos + hidratação",
    "mode": "internacao",
    "draft": true,
    "items": [
     [
      "CLORETO DE SÓDIO 0,9% (SORO FISIOLÓGICO)",
      "01 BOLSA 500 ML",
      "SE DESIDRATAÇÃO OU BAIXA ACEITAÇÃO ORAL: INFUNDIR 500 ML EV EM 1 HORA E REAVALIAR; DEPOIS MANTER HIDRATAÇÃO CONFORME ACEITAÇÃO ORAL, DIURESE E ESTADO VOLÊMICO (CAUTELA EM IDOSOS, CARDIOPATAS E NEFROPATAS)",
      "USO ENDOVENOSO"
     ],
     [
      "DIPIRONA 500 MG/ML SOLUÇÃO INJETÁVEL",
      "01 AMPOLA 2 ML",
      "ADMINISTRAR 1 G (2 ML) DILUÍDO EM 100 ML DE SF 0,9% EV DE 6/6H EM HORÁRIOS FIXOS (06-12-18-24H), MESMO SEM DOR",
      "USO ENDOVENOSO"
     ],
     [
      "PARACETAMOL 750 MG",
      "01 COMPRIMIDO",
      "TOMAR 01 COMPRIMIDO VIA ORAL DE 6/6H EM HORÁRIOS FIXOS, INTERCALANDO COM A DIPIRONA (03-09-15-21H); REDUZIR OU SUSPENDER SE HEPATOPATIA OU ELEVAÇÃO IMPORTANTE DE TRANSAMINASES",
      "USO ORAL"
     ],
     [
      "METOCLOPRAMIDA 5 MG/ML SOLUÇÃO INJETÁVEL",
      "01 AMPOLA 2 ML",
      "ADMINISTRAR 10 MG (2 ML) EV LENTO ATÉ DE 8/8H SE NÁUSEA OU VÔMITO",
      "USO ENDOVENOSO"
     ]
    ],
    "orient": [
     "INTERNAR SE INSTABILIDADE HEMODINÂMICA, DESIDRATAÇÃO, DOR REFRATÁRIA, FORMA ATÍPICA/GRAVE (ENCEFALITE, GUILLAIN-BARRÉ, MIOCARDITE, HEPATITE, LESÃO RENAL, DERMATOSE BOLHOSA) OU COMORBIDADE DESCOMPENSADA; GESTANTE NO PERIPARTO E IDOSO TÊM MAIOR RISCO",
     "ANALGESIA EM HORÁRIOS FIXOS, NÃO 'SE DOR'; REAVALIAR A DOR (EVA) A CADA TURNO: EVA ≥ 7 OU DOR REFRATÁRIA → ASSOCIAR OPIOIDE (BLOCO SEGUINTE)",
     "NÃO USAR AINE, AAS NEM CORTICOIDE NA FASE AGUDA (ATÉ 14 DIAS) — RISCO DE SANGRAMENTO SE DENGUE CONCOMITANTE E DE LESÃO RENAL; AFASTAR DENGUE (HEMOGRAMA) E SEGUIR O PROTOCOLO DE DENGUE SE SINAIS DE ALARME",
     "MONITORAR SINAIS VITAIS, DIURESE, FUNÇÃO RENAL, TRANSAMINASES E NÍVEL DE CONSCIÊNCIA; DOR TORÁCICA, DISPNEIA OU ARRITMIA → ECG E TROPONINA (MIOCARDITE)",
     "COMPRESSAS FRIAS NAS ARTICULAÇÕES POR 20 MIN ATÉ DE 4/4H, REPOUSO ARTICULAR E RETIRADA DE ANÉIS; NOTIFICAÇÃO COMPULSÓRIA (ÓBITO: IMEDIATA)"
    ]
   },
   {
    "label": "Padrão — Dor intensa (EVA ≥ 7) ou refratária: opioide EV associado — escolha 1",
    "mode": "internacao",
    "draft": true,
    "menu": true,
    "items": [
     [
      "TRAMADOL 50 MG/ML SOLUÇÃO INJETÁVEL",
      "01 AMPOLA 2 ML",
      "DILUIR 50 A 100 MG (1 A 2 ML) EM 100 ML DE SF 0,9% E ADMINISTRAR EV EM 30 MIN DE 6/6H (MÁXIMO 400 MG/DIA; > 75 ANOS: MÁXIMO 300 MG/DIA; CLCR < 30 ML/MIN: 12/12H, MÁXIMO 200 MG/DIA)",
      "USO ENDOVENOSO"
     ],
     [
      "MORFINA 10 MG/ML SOLUÇÃO INJETÁVEL",
      "01 AMPOLA 1 ML",
      "DILUIR 01 AMPOLA EM 9 ML DE SF 0,9% (1 MG/ML) E ADMINISTRAR 2 A 4 MG (2 A 4 ML) EV LENTO ATÉ DE 4/4H SE DOR INTENSA REFRATÁRIA (IDOSO OU DOENÇA RENAL: INICIAR COM 1 A 2 MG)",
      "USO ENDOVENOSO"
     ]
    ],
    "orient": [
     "MANTER DIPIRONA E PARACETAMOL EM HORÁRIOS FIXOS — O OPIOIDE É ASSOCIADO, NÃO SUBSTITUTO",
     "MONITORAR FR, SEDAÇÃO E PA; PRESCREVER LAXATIVO SE USO > 48H; TRAMADOL: EVITAR SE EPILEPSIA OU USO DE ANTIDEPRESSIVOS SEROTONINÉRGICOS (CONVULSÃO, SÍNDROME SEROTONINÉRGICA)"
    ]
   },
   {
    "label": "Padrão — Analgesia por peso em horários fixos: dipirona + paracetamol intercalados",
    "mode": "ped",
    "draft": true,
    "items": [
     [
      "DIPIRONA 500 MG/ML SOLUÇÃO ORAL (GOTAS)",
      "01 FRASCO",
      "DAR {DOSE} VIA ORAL DE 6/6H EM HORÁRIOS FIXOS (06-12-18-24H) ENQUANTO HOUVER DOR (15 MG/KG/DOSE). NÃO USAR EM < 3 MESES OU < 5 KG",
      "USO ORAL",
      {
       "kg": 15,
       "conc": 500,
       "gotas": 20,
       "un": "GOTAS",
       "max": 1000
      }
     ],
     [
      "PARACETAMOL 200 MG/ML SOLUÇÃO ORAL (GOTAS)",
      "01 FRASCO",
      "DAR {DOSE} VIA ORAL DE 6/6H EM HORÁRIOS FIXOS, INTERCALANDO COM A DIPIRONA (03-09-15-21H), ENQUANTO HOUVER DOR (15 MG/KG/DOSE; CALCULADO PARA 15 GOTAS/ML — CONFERIR NA BULA DO FABRICANTE)",
      "USO ORAL",
      {
       "kg": 15,
       "conc": 200,
       "gotas": 15,
       "un": "GOTAS",
       "max": 750
      }
     ]
    ],
    "orient": [
     "OFERECER LÍQUIDOS COM FREQUÊNCIA (ÁGUA, LEITE MATERNO, SORO DE REIDRATAÇÃO ORAL) E OBSERVAR A DIURESE; COMPRESSAS FRIAS NAS ARTICULAÇÕES DOLORIDAS POR 20 MIN, ATÉ DE 4/4H",
     "NÃO USAR AAS, IBUPROFENO OU OUTROS ANTI-INFLAMATÓRIOS NEM CORTICOIDE NA FASE AGUDA; CODEÍNA E TRAMADOL SÃO CONTRAINDICADOS EM < 12 ANOS",
     "RECÉM-NASCIDO DE MÃE COM CHIKUNGUNYA NO PERIPARTO E CRIANÇA < 2 ANOS TÊM MAIOR RISCO DE FORMA GRAVE (ENCEFALITE, LESÕES BOLHOSAS, MIOCARDITE): REAVALIAÇÃO DIÁRIA E BAIXO LIMIAR PARA INTERNAÇÃO",
     "AFASTAR DENGUE (HEMOGRAMA); SE SINAIS DE ALARME, SEGUIR O PROTOCOLO DE DENGUE. NOTIFICAR O CASO",
     "RETORNAR IMEDIATAMENTE SE VÔMITOS PERSISTENTES, RECUSA ALIMENTAR, SONOLÊNCIA OU IRRITABILIDADE, CONVULSÃO, MANCHAS ROXAS OU BOLHAS NA PELE, SANGRAMENTOS, DIFICULDADE PARA RESPIRAR OU DIMINUIÇÃO DA URINA"
    ]
   },
   {
    "label": "Dor intensa (EVA ≥ 7) em ≥ 12 anos: paracetamol + codeína no lugar do paracetamol",
    "peso": {
     "de": 40
    },
    "mode": "ped",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "PARACETAMOL 500 MG + CODEÍNA 30 MG",
      "12 COMPRIMIDOS",
      "SOMENTE ≥ 12 ANOS E ≥ 40 KG: TOMAR 01 COMPRIMIDO DE 6/6H EM HORÁRIOS FIXOS, NO LUGAR DO PARACETAMOL GOTAS, INTERCALANDO COM A DIPIRONA, POR ATÉ 03 DIAS E REAVALIAR",
      "USO ORAL"
     ]
    ],
    "orient": [
     "CONTRAINDICADO EM < 12 ANOS E APÓS AMIGDALECTOMIA/ADENOIDECTOMIA; EVITAR EM 12–18 ANOS COM OBESIDADE, APNEIA DO SONO OU DOENÇA PULMONAR (RISCO DE DEPRESSÃO RESPIRATÓRIA)",
     "< 12 ANOS COM DOR REFRATÁRIA À DIPIRONA + PARACETAMOL EM HORÁRIOS FIXOS: AVALIAR INTERNAÇÃO PARA ANALGESIA EV E MONITORIZAÇÃO"
    ]
   },
   {
    "label": "Padrão — Fase subaguda (15 dias a 3 meses): ibuprofeno se dor moderada (EVA 4 a 6) ou prednisona se intensa (EVA ≥ 7) — escolha 1",
    "draft": true,
    "menu": true,
    "items": [
     [
      "IBUPROFENO 600 MG",
      "30 COMPRIMIDOS",
      "SOMENTE APÓS 14 DIAS DE DOENÇA (DENGUE AFASTADA): TOMAR 01 COMPRIMIDO DE 8/8H, APÓS AS REFEIÇÕES, ATÉ A DOR MELHORAR, POR NO MÁXIMO 10 DIAS. HORÁRIO SUGERIDO: 06:00 / 14:00 / 22:00",
      "USO ORAL"
     ],
     [
      "PREDNISONA 5 MG",
      "QUANTIDADE PARA O TRATAMENTO E O DESMAME",
      "SOMENTE APÓS 14 DIAS DE DOENÇA, SE DOR INTENSA OU SEM MELHORA COM ANTI-INFLAMATÓRIO: TOMAR {DOSE} (EM COMPRIMIDOS DE 5 MG) 01 VEZ AO DIA, PELA MANHÃ, ATÉ A DOR ARTICULAR SUMIR (NO MÁXIMO 21 DIAS); DEPOIS MANTER A MESMA DOSE POR MAIS 3 A 5 DIAS E REDUZIR 5 MG A CADA 7 DIAS ATÉ PARAR (0,5 MG/KG/DIA; MÁXIMO 40 MG/DIA). NÃO USAR SE DIABETES, HIPERTENSÃO DE DIFÍCIL CONTROLE, FRATURA POR OSTEOPOROSE, TRANSTORNO BIPOLAR, DIÁLISE, OBESIDADE GRAU III, ARRITMIA OU DOENÇA CORONARIANA",
      "USO ORAL",
      {
       "kg": 0.5,
       "un": "MG",
       "max": 40
      }
     ]
    ],
    "orient": [
     "FASE SUBAGUDA: ANTES DO ANTI-INFLAMATÓRIO OU DO CORTICOIDE, COLHER UREIA, CREATININA, TGO, TGP E GLICEMIA; REAVALIAR A DOR EM 07 DIAS",
     "NÃO PARAR O CORTICOIDE DE REPENTE: SEGUIR A REDUÇÃO ORIENTADA; SE A DOR VOLTAR NA REDUÇÃO, VOLTAR À DOSE ANTERIOR E PROCURAR A UNIDADE",
     "DOR ARTICULAR HÁ MAIS DE 3 MESES (FASE CRÔNICA): ENCAMINHAR À REUMATOLOGIA/SERVIÇO DE REFERÊNCIA (HIDROXICLOROQUINA OU METOTREXATO)"
    ]
   }
  ]
 },
 {
  "id": "colica_nefretica",
  "ic": "🪨",
  "nm": "Cólica nefrética",
  "sub": "ibuprofeno · diclofenaco · dipirona · tansulosina",
  "blocks": [
   {
    "label": "Padrão — AINE (anti-inflamatório) — escolha 1",
    "draft": true,
    "menu": true,
    "items": [
     [
      "IBUPROFENO 300 MG",
      "01 CAIXA",
      "TOMAR 02 COMPRIMIDOS DE 6/6H POR 05 DIAS"
     ],
     [
      "DICLOFENACO 50 MG",
      "15 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO DE 8/8H, POR 05 DIAS SEGUIDOS HORÁRIO SUGERIDO (8/8h): 06:00 / 14:00 / 22:00"
     ],
     [
      "CETOPROFENO 150 MG",
      "10 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO DE 12/12H, DURANTE AS REFEIÇÕES, POR 05 DIAS (MÁXIMO 02 COMPRIMIDOS POR DIA)"
     ]
    ],
    "orient": [
     "BEBER BASTANTE ÁGUA E DIMINUIR A INGESTA DE SÓDIO E PROTEÍNAS (EX: EVITAR CARNES, SAL E REFRIGERANTES)",
     "COAR A URINA E GUARDAR O CÁLCULO, SE ELIMINADO, PARA LEVAR À CONSULTA",
     "SOLICITO: USG DE RINS E VIAS URINÁRIAS (OU TC DE ABDOME SEM CONTRASTE, BAIXA DOSE) E CONSULTA COM UROLOGISTA EM ATÉ 04 SEMANAS",
     "A TANSULOSINA PODE CAUSAR TONTURA AO LEVANTAR-SE: LEVANTAR DEVAGAR",
     "RETORNAR IMEDIATAMENTE SE FEBRE OU CALAFRIOS, DOR QUE NÃO MELHORA COM A MEDICAÇÃO, VÔMITOS PERSISTENTES OU DIMINUIÇÃO/AUSÊNCIA DE URINA"
    ]
   },
   {
    "label": "Padrão — Analgésico",
    "draft": true,
    "items": [
     [
      "DIPIRONA 500 MG",
      "01 CAIXA",
      "TOMAR 02 COMPRIMIDOS SE DOR, PODENDO REPETIR DE 6/6H"
     ]
    ]
   },
   {
    "label": "Padrão — Antiemético se náuseas — escolha 1",
    "draft": true,
    "menu": true,
    "items": [
     [
      "METOCLOPRAMIDA 10 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO SE NÁUSEAS OU VÔMITOS, PODENDO REPETIR DE 8/8H, POR NO MÁXIMO 05 DIAS"
     ],
     [
      "ONDANSETRONA 8 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO SE NÁUSEAS OU VÔMITOS, PODENDO REPETIR DE 8/8H"
     ]
    ]
   },
   {
    "label": "Padrão — Terapia expulsiva (cálculo ureteral distal > 5 mm e ≤ 10 mm)",
    "draft": true,
    "items": [
     [
      "TANSULOSINA 0,4 MG",
      "28 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO APÓS O CAFÉ DA MANHÃ, POR 04 SEMANAS"
     ]
    ]
   },
   {
    "label": "Combinação pronta — AINE + dipirona + tansulosina (terapia expulsiva)",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "IBUPROFENO 300 MG",
      "01 CAIXA",
      "TOMAR 02 COMPRIMIDOS DE 6/6H POR 05 DIAS"
     ],
     [
      "DIPIRONA 500 MG",
      "01 CAIXA",
      "TOMAR 02 COMPRIMIDOS SE DOR, PODENDO REPETIR DE 6/6H"
     ],
     [
      "METOCLOPRAMIDA 10 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO SE NÁUSEAS OU VÔMITOS, PODENDO REPETIR DE 8/8H"
     ],
     [
      "TANSULOSINA 0,4 MG",
      "28 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO APÓS O CAFÉ DA MANHÃ, POR 04 SEMANAS"
     ]
    ]
   },
   {
    "label": "Opção 1 — AINE (cetoprofeno) se dor + antiemético",
    "sec": "offlabel",
    "items": [
     [
      "CETOPROFENO 150 MG",
      "10 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO SE DOR, PODENDO REPETIR DE 12/12H POR ATÉ 05 DIAS SEGUIDO"
     ],
     [
      "METOCLOPRAMIDA 10 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO SE NÁUSEAS OU VÔMITOS, PODENDO REPETIR DE 8/8H"
     ]
    ],
    "orient": [
     "BEBER BASTANTE ÁGUA E DIMINUIR A INGESTA DE SÓDIO E PROTEÍNAS (EX: EVITAR CARNES, SAL E REFRIGERANTES)"
    ]
   },
   {
    "label": "Opção 2 — AINE sublingual (cetorolaco) + antiemético",
    "sec": "offlabel",
    "items": [
     [
      "CETOROLACO 10 MG",
      "10 COMPRIMIDOS",
      "DISSOLVER 01 COMPRIMIDO SUBLINGUAL, PODENDO REPETIR DE 6/6H POR ATÉ 05 DIAS SEGUIDOS"
     ],
     [
      "METOCLOPRAMIDA 10 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO SE NÁUSEAS OU VÔMITOS, PODENDO REPETIR DE 8/8H"
     ]
    ],
    "orient": [
     "BEBER BASTANTE ÁGUA E DIMINUIR A INGESTA DE SÓDIO E PROTEÍNAS (EX: EVITAR CARNES, SAL E REFRIGERANTES)"
    ]
   },
   {
    "label": "Opção 3 — dor intensa: diclofenaco + paracetamol com codeína + antiemético + tansulosina",
    "sec": "offlabel",
    "items": [
     [
      "PARACETAMOL 500 MG + FOSFATO DE CODEÍNA 30 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO JUNTO COM O DICLOFENACO SE DOR INTENSA, PODENDO REPETIR DE 8/8H, POR NO MÁXIMO 03 DIAS. TOMAR O MÍNIMO POSSÍVEL, PARA EVITAR DEPENDÊNCIA E CONSTIPAÇÃO"
     ],
     [
      "DICLOFENACO 50 MG",
      "15 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO DE 8/8H POR 05 DIAS (JUNTO COM O PARACETAMOL + CODEÍNA SE DOR INTENSA)"
     ],
     [
      "METOCLOPRAMIDA 10 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO SE NÁUSEAS OU VÔMITOS, PODENDO REPETIR DE 8/8H"
     ],
     [
      "TANSULOSINA 0,4 MG",
      "28 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO APÓS O CAFÉ DA MANHÃ, POR 04 SEMANAS"
     ]
    ],
    "orient": [
     "BEBER BASTANTE ÁGUA E DIMINUIR A INGESTA DE SÓDIO E PROTEÍNAS (EX: EVITAR CARNES, SAL E REFRIGERANTES)",
     "SOLICITO: USG DE RINS E VIAS URINÁRIAS + FÍGADO E VIAS BILIARES",
     "JUSTIF: NEFROLITÍASE? URETEROLITÍASE? COLELITÍASE?"
    ]
   },
   {
    "label": "AINE (anti-inflamatório) — escolha 1",
    "sec": "offlabel",
    "menu": true,
    "items": [
     [
      "IBUPROFENO 300 MG",
      "01 CAIXA",
      "TOMAR 02 COMPRIMIDOS DE 6/6H POR 05 DIAS"
     ],
     [
      "DICLOFENACO 50 MG",
      "15 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO DE 8/8H, POR 05 DIAS SEGUIDOS HORÁRIO SUGERIDO (8/8h): 06:00 / 14:00 / 22:00"
     ],
     [
      "NIMESULIDA 100 MG",
      "10 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO DE 12/12H POR 05 DIAS"
     ],
     [
      "NAPROXENO SÓDICO 500 MG",
      "10 COMPRIMIDOS",
      "TOMAR UM COMPRIMIDO SE DOR, PODENDO REPETIR DE 12/12H POR ATÉ 05 DIAS SEGUIDOS"
     ]
    ]
   },
   {
    "label": "Antiemético — escolha 1",
    "sec": "offlabel",
    "menu": true,
    "items": [
     [
      "METOCLOPRAMIDA 10 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO SE NÁUSEAS OU VÔMITOS, PODENDO REPETIR DE 8/8H"
     ],
     [
      "ONDANSETRONA 8 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO SE NÁUSEAS OU VÔMITOS, PODENDO REPETIR DE 8/8H"
     ]
    ]
   },
   {
    "label": "Padrão — AINE parenteral (primeira escolha; evitar se doença renal, úlcera, gestação ou risco cardiovascular alto) — escolha 1",
    "mode": "internacao",
    "draft": true,
    "menu": true,
    "items": [
     [
      "CETOPROFENO 100 MG PÓ LIÓFILO PARA SOLUÇÃO INJETÁVEL",
      "01 FRASCO-AMPOLA",
      "SE SEM CONTRAINDICAÇÃO A AINE: ADMINISTRAR 100 MG EV DILUÍDO EM 100 ML DE SF 0,9% EM 20 MINUTOS; PODE REPETIR APÓS 12H, POR NO MÁXIMO 48 HORAS (MÁXIMO 300 MG/DIA)",
      "USO ENDOVENOSO"
     ],
     [
      "DICLOFENACO SÓDICO 25 MG/ML SOLUÇÃO INJETÁVEL",
      "01 AMPOLA 3 ML",
      "SE SEM CONTRAINDICAÇÃO A AINE: APLICAR 75 MG (01 AMPOLA) IM PROFUNDO NO GLÚTEO, DOSE ÚNICA",
      "USO INTRAMUSCULAR"
     ],
     [
      "TENOXICAM 20 MG PÓ LIÓFILO PARA SOLUÇÃO INJETÁVEL",
      "01 FRASCO-AMPOLA",
      "SE SEM CONTRAINDICAÇÃO A AINE: RECONSTITUIR E ADMINISTRAR 20 MG EV LENTO OU IM, NO MÁXIMO 01 VEZ AO DIA",
      "USO ENDOVENOSO"
     ]
    ],
    "orient": [
     "NÃO FAZER HIDRATAÇÃO EV DE ROTINA (NÃO ACELERA A SAÍDA DO CÁLCULO): SORO SOMENTE SE DESIDRATAÇÃO OU VÔMITOS",
     "NÃO ASSOCIAR ANTIESPASMÓDICO (ESCOPOLAMINA): NÃO MELHORA A DOR ALÉM DO AINE",
     "FEBRE OU SINAIS DE INFECÇÃO COM CÁLCULO OBSTRUTIVO, RIM ÚNICO, ANÚRIA OU DOR REFRATÁRIA: UROLOGIA DE URGÊNCIA (DESOBSTRUÇÃO)"
    ]
   },
   {
    "label": "Padrão — Dipirona EV + antiemético se náuseas (com o AINE, ou isolada se AINE contraindicado)",
    "mode": "internacao",
    "draft": true,
    "items": [
     [
      "DIPIRONA 500 MG/ML SOLUÇÃO INJETÁVEL",
      "01 AMPOLA 2 ML",
      "ADMINISTRAR 01 G (02 ML) EV DILUÍDO EM 100 ML DE SF 0,9% EM 15 MINUTOS; PODE REPETIR ATÉ DE 6/6H SE DOR",
      "USO ENDOVENOSO"
     ],
     [
      "METOCLOPRAMIDA 5 MG/ML SOLUÇÃO INJETÁVEL",
      "01 AMPOLA 2 ML",
      "SE NÁUSEAS OU VÔMITOS: ADMINISTRAR 10 MG (02 ML) EV DILUÍDO EM 100 ML DE SF 0,9% EM 15 MINUTOS; PODE REPETIR ATÉ DE 8/8H (MÁXIMO 30 MG/DIA)",
      "USO ENDOVENOSO"
     ]
    ]
   },
   {
    "label": "Padrão — Dor refratária ao AINE e à dipirona: opioide EV — escolha 1",
    "mode": "internacao",
    "draft": true,
    "menu": true,
    "items": [
     [
      "TRAMADOL 50 MG/ML SOLUÇÃO INJETÁVEL",
      "01 AMPOLA 2 ML",
      "ADMINISTRAR 50 A 100 MG EV DILUÍDO EM 100 ML DE SF 0,9% EM 30 MINUTOS, ATÉ DE 6/6H SE DOR (MÁXIMO 400 MG/DIA; ACIMA DE 75 ANOS MÁXIMO 300 MG/DIA; CLCR < 30: DE 12/12H, MÁXIMO 200 MG/DIA)",
      "USO ENDOVENOSO"
     ],
     [
      "MORFINA 10 MG/ML SOLUÇÃO INJETÁVEL",
      "01 AMPOLA 1 ML",
      "DILUIR 01 AMPOLA EM 9 ML DE SF 0,9% (1 MG/ML). ADMINISTRAR 2 A 3 MG EV LENTO A CADA 05-10 MIN ATÉ DOR ≤ 4 OU SONOLÊNCIA (MÁXIMO 15 MG NA TITULAÇÃO); DEPOIS 2 A 4 MG EV ATÉ DE 4/4H SE DOR. IDOSO OU DOENÇA RENAL: 1 A 2 MG POR DOSE",
      "USO ENDOVENOSO"
     ]
    ]
   },
   {
    "label": "Do material do Drive — Dor intensa em casa: tramadol oral por curto prazo",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "TRAMADOL 50 MG",
      "10 CÁPSULAS",
      "TOMAR 01 CÁPSULA ATÉ DE 6/6H SE DOR INTENSA QUE NÃO MELHORA COM O ANTI-INFLAMATÓRIO E A DIPIRONA, POR NO MÁXIMO 03 DIAS (MÁXIMO 400 MG/DIA). PODE CAUSAR NÁUSEA, TONTURA E SONOLÊNCIA: NÃO DIRIGIR",
      "USO ORAL"
     ]
    ]
   }
  ]
 },
 {
  "id": "conjuntivite",
  "ic": "👁",
  "nm": "Conjuntivite",
  "sub": "carmelose · tobramicina · olopatadina",
  "blocks": [
   {
    "label": "Padrão — viral (mais comum): sintomático, sem antibiótico",
    "draft": true,
    "items": [
     [
      "SOLUÇÃO FISIOLÓGICA 0,9%",
      "01 FRASCO",
      "LAVAR OS OLHOS AFETADOS COM SORO GELADO QUATRO VEZES AO DIA. GUARDAR O SORO NA GELADEIRA.",
      "USO TÓPICO"
     ],
     [
      "CARMELOSE SÓDICA 5 MG/ML COLÍRIO (LÁGRIMA ARTIFICIAL)",
      "01 FRASCO",
      "PINGAR 01 GOTA EM CADA OLHO AFETADO ATÉ 04 VEZES AO DIA, SE ARDÊNCIA OU SENSAÇÃO DE AREIA NOS OLHOS",
      "USO TÓPICO"
     ]
    ],
    "orient": [
     "LAVAR AS MÃOS COM FREQUÊNCIA, EVITAR COÇAR OS OLHOS E NÃO COMPARTILHAR TOALHAS, FRONHAS, MAQUIAGEM E OBJETOS PESSOAIS (A CONJUNTIVITE É CONTAGIOSA)",
     "APLICAR COMPRESSAS FRIAS SOBRE AS PÁLPEBRAS E LIMPAR AS SECREÇÕES COM GAZE UMEDECIDA EM SORO",
     "NÃO USAR LENTES DE CONTATO ATÉ A CURA E NÃO USAR COLÍRIOS COM CORTICOIDE SEM AVALIAÇÃO DO OFTALMOLOGISTA",
     "A CONJUNTIVITE VIRAL MELHORA SOZINHA EM 01 A 03 SEMANAS E NÃO PRECISA DE ANTIBIÓTICO",
     "RETORNAR IMEDIATAMENTE SE DOR OCULAR INTENSA, PIORA DA VISÃO, SENSIBILIDADE FORTE À LUZ, INCHAÇO OU VERMELHIDÃO AO REDOR DO OLHO, OU SE NÃO HOUVER MELHORA EM 07 A 10 DIAS"
    ]
   },
   {
    "label": "Padrão — se bacteriana (secreção purulenta, pálpebras coladas): acrescentar antibiótico",
    "draft": true,
    "items": [
     [
      "TOBRAMICINA 3MG/ML COLÍRIO",
      "01 FRASCO",
      "PINGAR 1 GOTA EM CADA OLHO, DE 6/6H POR 07 DIAS HORÁRIO SUGERIDO: 06:00 / 12:00 / 18:00 / 00:00",
      "USO TÓPICO"
     ]
    ],
    "orient": [
     "COM O COLÍRIO ANTIBIÓTICO A MELHORA COMEÇA EM 02 A 03 DIAS; SE NÃO MELHORAR EM 03 A 04 DIAS DE USO, RETORNAR PARA REAVALIAÇÃO"
    ]
   },
   {
    "label": "Padrão — se alérgica (coceira intensa, bilateral): acrescentar antialérgico",
    "draft": true,
    "items": [
     [
      "OLOPATADINA 1 MG/ML COLÍRIO",
      "01 FRASCO",
      "PINGAR 01 GOTA EM CADA OLHO DE 12/12H ENQUANTO HOUVER COCEIRA",
      "USO TÓPICO"
     ]
    ]
   },
   {
    "label": "Bacteriana: tobramicina + lavagem com soro gelado (modelo do médico)",
    "sec": "offlabel",
    "items": [
     [
      "TOBRAMICINA 3MG/ML COLÍRIO",
      "01 FRASCO",
      "PINGAR 1 GOTA EM CADA OLHO, DE 6/6H POR 07 DIAS HORÁRIO SUGERIDO: 06:00 / 12:00 / 18:00 / 00:00",
      "USO TÓPICO"
     ],
     [
      "SOLUÇÃO FISIOLÓGICA 0,9%",
      "01 FRASCO",
      "LAVAR OS OLHOS AFETADOS COM SORO GELADO QUATRO VEZES AO DIA. GUARDAR O SORO NA GELADEIRA.",
      "USO TÓPICO"
     ]
    ],
    "orient": [
     "EVITAR COÇAR OS OLHOS",
     "LAVAR AS MÃOS COM FREQUÊNCIA",
     "NÃO COMPARTILHAR TOALHAS E OBJETOS PESSOAIS"
    ]
   },
   {
    "label": "Padrão — bacteriana (secreção purulenta, pálpebras coladas): higiene ocular + colírio antibiótico (a partir de 02 meses)",
    "mode": "ped",
    "draft": true,
    "items": [
     [
      "SOLUÇÃO FISIOLÓGICA 0,9%",
      "01 FRASCO",
      "LIMPAR AS SECREÇÕES DOS OLHOS COM GAZE UMEDECIDA EM SORO, DE DENTRO PARA FORA, 04 VEZES AO DIA E SEMPRE QUE NECESSÁRIO",
      "USO TÓPICO"
     ],
     [
      "TOBRAMICINA 3MG/ML COLÍRIO",
      "01 FRASCO",
      "PINGAR 01 GOTA NO(S) OLHO(S) AFETADO(S) DE 6/6H POR 07 DIAS",
      "USO TÓPICO"
     ]
    ],
    "orient": [
     "A MAIORIA DAS CONJUNTIVITES É VIRAL E MELHORA SOZINHA EM 01 A 03 SEMANAS: SEM SECREÇÃO PURULENTA, MANTER APENAS LIMPEZA COM SORO E COMPRESSAS FRIAS",
     "LAVAR AS MÃOS APÓS LIMPAR OS OLHOS DA CRIANÇA E NÃO COMPARTILHAR TOALHAS E FRONHAS. NÃO É PRECISO AFASTAR DA CRECHE/ESCOLA SE A CRIANÇA ESTIVER BEM E SEM FEBRE; O COLÍRIO NÃO É CONDIÇÃO PARA VOLTAR",
     "RECÉM-NASCIDO (ATÉ 28 DIAS) COM SECREÇÃO PURULENTA: AVALIAÇÃO URGENTE NO MESMO DIA (RISCO DE GONOCOCO/CLAMÍDIA) — NÃO TRATAR APENAS COM COLÍRIO",
     "OTITE ASSOCIADA (SÍNDROME CONJUNTIVITE-OTITE): TRATAR COM ANTIBIÓTICO ORAL CONFORME PROTOCOLO DE OTITE",
     "RETORNAR IMEDIATAMENTE SE INCHAÇO OU VERMELHIDÃO DA PÁLPEBRA E AO REDOR DO OLHO, FEBRE, DOR AO MOVER O OLHO, PIORA DA VISÃO, SENSIBILIDADE FORTE À LUZ OU SEM MELHORA EM 48 A 72 HORAS"
    ]
   },
   {
    "label": "Padrão — se alérgica (coceira intensa, bilateral, a partir de 03 anos): acrescentar olopatadina colírio",
    "mode": "ped",
    "draft": true,
    "items": [
     [
      "OLOPATADINA 1 MG/ML COLÍRIO",
      "01 FRASCO",
      "PINGAR 01 GOTA EM CADA OLHO DE 12/12H ENQUANTO HOUVER COCEIRA",
      "USO TÓPICO"
     ]
    ]
   },
   {
    "label": "Conjuntivite por clamídia (neonatal ou tracoma) — azitromicina — escolha 1",
    "mode": "ped",
    "sec": "offlabel",
    "draft": true,
    "menu": true,
    "items": [
     [
      "AZITROMICINA 200 MG/5 ML SUSPENSÃO ORAL",
      "01 FRASCO",
      "CONJUNTIVITE NEONATAL/LACTENTE POR CLAMÍDIA: DAR {DOSE} VIA ORAL 01 VEZ AO DIA POR 03 DIAS (20 MG/KG/DIA)",
      "USO ORAL",
      {
       "kg": 20,
       "conc": 40,
       "un": "ML",
       "max": 500
      }
     ],
     [
      "AZITROMICINA 200 MG/5 ML SUSPENSÃO ORAL",
      "01 FRASCO",
      "TRACOMA (CRIANÇA): DAR {DOSE} VIA ORAL EM DOSE ÚNICA (20 MG/KG; MÁXIMO 1 G)",
      "USO ORAL",
      {
       "kg": 20,
       "conc": 40,
       "un": "ML",
       "max": 1000
      }
     ]
    ],
    "orient": [
     "CONJUNTIVITE NEONATAL POR CLAMÍDIA: TRATAMENTO TÓPICO ISOLADO É INSUFICIENTE; TRATAR A MÃE E A PARCERIA; REAVALIAR PNEUMONIA (TOSSE, RESPIRAÇÃO RÁPIDA)",
     "MACROLÍDEO EM MENORES DE 06 SEMANAS: ORIENTAR SOBRE VÔMITOS EM JATO (RISCO DE ESTENOSE HIPERTRÓFICA DE PILORO)",
     "TRACOMA: EXAMINAR E TRATAR OS CONTATOS DOMICILIARES E NOTIFICAR CONFORME O PROGRAMA DE VIGILÂNCIA DO TRACOMA"
    ]
   },
   {
    "label": "Do material do Drive — Usuário de lente de contato: colírio de fluoroquinolona — escolha 1",
    "sec": "offlabel",
    "draft": true,
    "menu": true,
    "items": [
     [
      "OFLOXACINO COLÍRIO 0,3%",
      "01 FRASCO",
      "PINGAR 01 GOTA NO(S) OLHO(S) AFETADO(S) DE 6/6H POR 07 DIAS. SUSPENDER A LENTE DE CONTATO ATÉ A CURA",
      "USO TÓPICO"
     ],
     [
      "CIPROFLOXACINO 3,5 MG/ML COLÍRIO",
      "01 FRASCO",
      "PINGAR 01 GOTA NO(S) OLHO(S) AFETADO(S) DE 6/6H POR 07 DIAS. SUSPENDER A LENTE DE CONTATO ATÉ A CURA",
      "USO TÓPICO"
     ]
    ]
   },
   {
    "label": "Do material do Drive — Alérgica: epinastina colírio (alternativa à olopatadina)",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "EPINASTINA 0,5 MG/ML COLÍRIO",
      "01 FRASCO",
      "PINGAR 01 GOTA EM CADA OLHO DE 12/12H ENQUANTO HOUVER COCEIRA (A PARTIR DE 03 ANOS)",
      "USO TÓPICO"
     ]
    ]
   },
   {
    "label": "Padrão — conjuntivite hiperaguda (suspeita gonocócica): ceftriaxona 1 g IM dose única + cobertura para clamídia",
    "draft": true,
    "items": [
     [
      "CEFTRIAXONA 1 G PÓ PARA SOLUÇÃO INJETÁVEL (IM, COM DILUENTE DE LIDOCAÍNA 1%)",
      "01 FRASCO-AMPOLA",
      "ADMINISTRAR 1 G IM PROFUNDO NO GLÚTEO EM DOSE ÚNICA, RECONSTITUÍDO COM O DILUENTE DE LIDOCAÍNA 1% QUE ACOMPANHA O FRASCO",
      "USO INTRAMUSCULAR"
     ],
     [
      "AZITROMICINA 500 MG",
      "02 COMPRIMIDOS",
      "TOMAR 02 COMPRIMIDOS (1 G) VIA ORAL EM DOSE ÚNICA (COBERTURA PARA CLAMÍDIA)",
      "USO ORAL"
     ],
     [
      "SOLUÇÃO FISIOLÓGICA 0,9%",
      "01 FRASCO 500 ML",
      "IRRIGAR ABUNDANTEMENTE O OLHO ACOMETIDO PARA REMOVER A SECREÇÃO; REPETIR SEMPRE QUE HOUVER ACÚMULO DE SECREÇÃO",
      "USO TÓPICO"
     ]
    ],
    "orient": [
     "AVALIAÇÃO OFTALMOLÓGICA URGENTE (LÂMPADA DE FENDA) — RISCO DE ÚLCERA E PERFURAÇÃO DE CÓRNEA; SE ACOMETIMENTO CORNEANO, INTERNAR E MANTER CEFTRIAXONA EV CONFORME OFTALMOLOGIA",
     "COLHER SECREÇÃO PARA GRAM, CULTURA E PCR PARA GONOCOCO/CLAMÍDIA ANTES DO ANTIBIÓTICO, SEM ATRASAR O TRATAMENTO",
     "OFERTAR TESTAGEM PARA HIV, SÍFILIS E HEPATITES B E C; CONVOCAR E TRATAR PARCERIAS SEXUAIS; NOTIFICAR CONFORME PROTOCOLO DE IST",
     "PRECAUÇÃO DE CONTATO E HIGIENE DAS MÃOS APÓS MANIPULAR O OLHO; NÃO USAR COLÍRIO COM CORTICOIDE",
     "RETORNAR IMEDIATAMENTE SE PIORA DA VISÃO, DOR OCULAR INTENSA OU FOTOFOBIA"
    ]
   },
   {
    "label": "Alternativa à azitromicina para cobertura de clamídia — doxiciclina por 07 dias",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "DOXICICLINA 100 MG",
      "14 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO VIA ORAL DE 12/12H POR 07 DIAS, COM ÁGUA E SEM DEITAR LOGO APÓS (NÃO USAR NA GESTAÇÃO)",
      "USO ORAL"
     ]
    ]
   },
   {
    "label": "Conjuntivite hiperaguda gonocócica (após 28 dias de vida) — ceftriaxona dose única + irrigação",
    "mode": "ped",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "CEFTRIAXONA 1 G PÓ PARA SOLUÇÃO INJETÁVEL (IM, COM DILUENTE DE LIDOCAÍNA 1%)",
      "01 FRASCO-AMPOLA",
      "ADMINISTRAR {DOSE} IM PROFUNDO EM DOSE ÚNICA (50 MG/KG; MÁXIMO 1 G)",
      "USO INTRAMUSCULAR",
      {
       "kg": 50,
       "un": "MG",
       "max": 1000
      }
     ],
     [
      "SOLUÇÃO FISIOLÓGICA 0,9%",
      "01 FRASCO 500 ML",
      "IRRIGAR ABUNDANTEMENTE O OLHO ACOMETIDO PARA REMOVER A SECREÇÃO; REPETIR SEMPRE QUE HOUVER ACÚMULO DE SECREÇÃO",
      "USO TÓPICO"
     ]
    ],
    "orient": [
     "AVALIAÇÃO OFTALMOLÓGICA URGENTE — RISCO DE PERFURAÇÃO DE CÓRNEA; COLHER SECREÇÃO PARA GRAM, CULTURA E PCR ANTES DO ANTIBIÓTICO",
     "INFECÇÃO GONOCÓCICA FORA DO PERÍODO NEONATAL EM CRIANÇA PRÉ-PÚBERE: INVESTIGAR ABUSO SEXUAL E NOTIFICAR O CONSELHO TUTELAR",
     "RECÉM-NASCIDO (ATÉ 28 DIAS): INTERNAR COM A NEONATOLOGIA — CEFTRIAXONA 25 A 50 MG/KG (MÁXIMO 250 MG) EM DOSE ÚNICA, OU CEFOTAXIMA SE HIPERBILIRRUBINEMIA"
    ]
   }
  ]
 },
 {
  "id": "corpo_estranho",
  "ic": "👁",
  "nm": "Corpo estranho ocular",
  "sub": "tobramicina · ofloxacino · dipirona",
  "blocks": [
   {
    "label": "Padrão — após remoção: colírio antibiótico + analgesia (lente de contato ou material vegetal: ofloxacino em Outras opções)",
    "draft": true,
    "items": [
     [
      "TOBRAMICINA 3 MG/ML COLÍRIO",
      "01 FRASCO",
      "PINGAR 01 GOTA NO OLHO AFETADO DE 6/6H POR 05 DIAS. HORÁRIO SUGERIDO: 06:00 / 12:00 / 18:00 / 00:00",
      "USO TÓPICO"
     ],
     [
      "DIPIRONA 500 MG",
      "01 CAIXA",
      "TOMAR 02 COMPRIMIDOS SE DOR OU FEBRE, PODENDO REPETIR DE 6/6H"
     ]
    ],
    "orient": [
     "NÃO COÇAR NEM ESFREGAR O OLHO; NÃO USAR LENTES DE CONTATO ATÉ A CICATRIZAÇÃO E O FIM DO COLÍRIO",
     "NÃO USAR COLÍRIO ANESTÉSICO NEM COLÍRIO COM CORTICOIDE (RETARDAM A CICATRIZAÇÃO E AUMENTAM O RISCO DE INFECÇÃO)",
     "USAR ÓCULOS DE PROTEÇÃO EM ATIVIDADES DE RISCO (ESMERILHAR, SOLDAR, MARTELAR, CORTAR METAL OU MADEIRA)",
     "PROCURAR OFTALMOLOGISTA EM 24–48H SE PERSISTIR SENSAÇÃO DE CORPO ESTRANHO, ANEL DE FERRUGEM RESIDUAL OU USUÁRIO DE LENTE DE CONTATO",
     "RETORNAR IMEDIATAMENTE SE PIORA DA DOR, BAIXA DA VISÃO, SECREÇÃO PURULENTA OU MANCHA BRANCA NO OLHO"
    ]
   },
   {
    "label": "Usuário de lente de contato ou corpo estranho vegetal: ofloxacino colírio + lavagem com soro (modelo do médico)",
    "sec": "offlabel",
    "items": [
     [
      "SOLUÇÃO FISIOLÓGICA 0,9%",
      "01 FRASCO",
      "LAVAR OS OLHOS AFETADOS COM SORO GELADO QUATRO VEZES AO DIA. GUARDAR O SORO NA GELADEIRA.",
      "USO TÓPICO"
     ],
     [
      "OFLOXACINO COLÍRIO 0,3%",
      "01 FRASCO",
      "PINGAR UMA GOTA NO OLHO AFETADO DE 6/6H POR 05 DIAS HORÁRIO SUGERIDO: 06:00 / 12:00 / 18:00 / 00:00",
      "USO TÓPICO"
     ]
    ],
    "orient": [
     "EVITAR COÇAR OS OLHOS",
     "LAVAR AS MÃOS COM FREQUÊNCIA"
    ]
   },
   {
    "label": "Padrão — Após remoção: colírio antibiótico",
    "mode": "ped",
    "draft": true,
    "items": [
     [
      "TOBRAMICINA 3 MG/ML COLÍRIO",
      "01 FRASCO",
      "PINGAR 01 GOTA NO OLHO AFETADO DE 6/6H POR 05 DIAS. HORÁRIO SUGERIDO: 06:00 / 12:00 / 18:00 / 00:00",
      "USO TÓPICO"
     ]
    ],
    "orient": [
     "NÃO COÇAR NEM ESFREGAR O OLHO; NÃO É NECESSÁRIO TAMPÃO (A OCLUSÃO NÃO ACELERA A CICATRIZAÇÃO)",
     "NÃO USAR COLÍRIO ANESTÉSICO NEM COLÍRIO COM CORTICOIDE; LAVAR AS MÃOS ANTES E DEPOIS DE PINGAR O COLÍRIO",
     "ENCAMINHAR AO OFTALMOLOGISTA EM 24 A 48H SE ANEL DE FERRUGEM, CORPO ESTRANHO NÃO REMOVIDO, ABRASÃO EXTENSA, USO DE LENTE DE CONTATO OU SINTOMAS PERSISTENTES",
     "SUSPEITA DE PERFURAÇÃO OU CORPO ESTRANHO INTRAOCULAR (MARTELAR METAL, PROJÉTIL, PUPILA IRREGULAR): NÃO REMOVER NEM PRESSIONAR, PROTETOR OCULAR RÍGIDO E OFTALMOLOGIA DE URGÊNCIA",
     "RETORNAR IMEDIATAMENTE SE PIORA DA DOR, BAIXA DA VISÃO, VERMELHIDÃO INTENSA, SECREÇÃO PURULENTA OU MANCHA BRANCA NO OLHO"
    ]
   },
   {
    "label": "Padrão — Analgésico pelo peso — escolha 1",
    "mode": "ped",
    "draft": true,
    "menu": true,
    "items": [
     [
      "DIPIRONA 500 MG/ML SOLUÇÃO ORAL (GOTAS)",
      "01 FRASCO",
      "DAR {DOSE} VIA ORAL DE 6/6H SE DOR (15 MG/KG/DOSE; NÃO USAR EM MENORES DE 3 MESES OU COM MENOS DE 5 KG)",
      "USO ORAL",
      {
       "kg": 15,
       "conc": 500,
       "gotas": 20,
       "un": "GOTAS",
       "max": 1000
      }
     ],
     [
      "PARACETAMOL 200 MG/ML SOLUÇÃO ORAL (GOTAS)",
      "01 FRASCO",
      "DAR {DOSE} VIA ORAL DE 6/6H SE DOR (15 MG/KG/DOSE)",
      "USO ORAL",
      {
       "kg": 15,
       "conc": 200,
       "gotas": 15,
       "un": "GOTAS",
       "max": 750
      }
     ],
     [
      "IBUPROFENO 50 MG/ML SUSPENSÃO ORAL (GOTAS)",
      "01 FRASCO",
      "DAR {DOSE} VIA ORAL DE 8/8H SE DOR, APÓS ALIMENTAÇÃO, POR ATÉ 05 DIAS (10 MG/KG/DOSE). SOMENTE ≥ 06 MESES",
      "USO ORAL",
      {
       "kg": 10,
       "conc": 50,
       "gotas": 10,
       "un": "GOTAS",
       "max": 200
      }
     ]
    ]
   },
   {
    "label": "Combinação pronta — após remoção: colírio antibiótico + analgesia VO",
    "mode": "ped",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "TOBRAMICINA 3 MG/ML COLÍRIO",
      "01 FRASCO",
      "PINGAR 01 GOTA NO OLHO AFETADO DE 6/6H POR 05 DIAS. HORÁRIO SUGERIDO: 06:00 / 12:00 / 18:00 / 00:00",
      "USO TÓPICO"
     ],
     [
      "DIPIRONA 500 MG/ML SOLUÇÃO ORAL (GOTAS)",
      "01 FRASCO",
      "DAR {DOSE} VIA ORAL DE 6/6H SE DOR (15 MG/KG/DOSE; NÃO USAR EM MENORES DE 3 MESES OU COM MENOS DE 5 KG)",
      "USO ORAL",
      {
       "kg": 15,
       "conc": 500,
       "gotas": 20,
       "un": "GOTAS",
       "max": 1000
      }
     ]
    ]
   },
   {
    "label": "Antibiótico tópico alternativo — escolha 1",
    "mode": "ped",
    "sec": "offlabel",
    "draft": true,
    "menu": true,
    "items": [
     [
      "TOBRAMICINA 3 MG/G POMADA OFTÁLMICA",
      "01 BISNAGA",
      "APLICAR 01 CM DA POMADA NA PÁLPEBRA INFERIOR DO OLHO AFETADO DE 8/8H POR 05 DIAS (CRIANÇA QUE NÃO COLABORA COM COLÍRIO)",
      "USO TÓPICO"
     ],
     [
      "OFLOXACINO COLÍRIO 0,3%",
      "01 FRASCO",
      "PINGAR 01 GOTA NO OLHO AFETADO DE 6/6H POR 05 DIAS (USUÁRIO DE LENTE DE CONTATO OU CORPO ESTRANHO VEGETAL; ≥ 01 ANO)",
      "USO TÓPICO"
     ]
    ]
   },
   {
    "label": "Analgesia alternativa — escolha 1",
    "mode": "ped",
    "sec": "offlabel",
    "draft": true,
    "menu": true,
    "items": [
     [
      "PARACETAMOL 200 MG/ML SOLUÇÃO ORAL (GOTAS)",
      "01 FRASCO",
      "DAR {DOSE} VIA ORAL DE 6/6H SE DOR (15 MG/KG/DOSE)",
      "USO ORAL",
      {
       "kg": 15,
       "conc": 200,
       "gotas": 15,
       "un": "GOTAS",
       "max": 750
      }
     ],
     [
      "IBUPROFENO 50 MG/ML SUSPENSÃO ORAL (GOTAS)",
      "01 FRASCO",
      "DAR {DOSE} VIA ORAL DE 8/8H SE DOR, APÓS ALIMENTAÇÃO, POR ATÉ 05 DIAS (10 MG/KG/DOSE). SOMENTE ≥ 06 MESES",
      "USO ORAL",
      {
       "kg": 10,
       "conc": 50,
       "gotas": 10,
       "un": "GOTAS",
       "max": 200
      }
     ]
    ]
   },
   {
    "label": "Do material do Drive — Dor intensa após a remoção: paracetamol + codeína por até 03 dias",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "PARACETAMOL 500 MG + CODEÍNA 30 MG",
      "12 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO SE DOR INTENSA, PODENDO REPETIR DE 6/6H, POR NO MÁXIMO 03 DIAS. NÃO TOMAR JUNTO COM O PARACETAMOL (USAR NO LUGAR DELE)",
      "USO ORAL"
     ]
    ]
   },
   {
    "label": "Do material do Drive — Dor na abrasão sem complicação: cetorolaco colírio por 02 a 03 dias",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "CETOROLACO DE TROMETAMOL 0,5% COLÍRIO",
      "01 FRASCO",
      "PINGAR 01 GOTA NO(S) OLHO(S) AFETADO(S) DE 6/6H POR 02 A 03 DIAS. NÃO USAR POR MAIS TEMPO SEM AVALIAÇÃO DO OFTALMOLOGISTA",
      "USO TÓPICO"
     ]
    ]
   }
  ]
 },
 {
  "id": "constipacao",
  "ic": "🚽",
  "nm": "Constipação",
  "sub": "macrogol · lactulose · fibra · bisacodil",
  "blocks": [
   {
    "label": "Padrão — Laxativo osmótico (lactulose = alternativa SUS) — escolha 1",
    "draft": true,
    "menu": true,
    "items": [
     [
      "MACROGOL 3350 + ELETRÓLITOS (MUVINLAX ®)",
      "01 CAIXA",
      "DISSOLVER 01 SACHÊ EM 01 COPO (125 ML) DE ÁGUA E TOMAR 01 VEZ AO DIA, PELA MANHÃ. SE NÃO EVACUAR EM 02 A 03 DIAS, AUMENTAR PARA 02 SACHÊS AO DIA; SE FEZES AMOLECIDAS, REDUZIR. USAR POR 14 DIAS E REAVALIAR"
     ],
     [
      "LACTULOSE 667 MG/ML XAROPE",
      "01 FRASCO",
      "TOMAR 15 ML 01 VEZ AO DIA, PELA MANHÃ. PODE AUMENTAR ATÉ 15 ML DE 12/12H OU REDUZIR CONFORME O FUNCIONAMENTO DO INTESTINO"
     ]
    ],
    "orient": [
     "INGERIR BASTANTE LÍQUIDO (8 A 10 COPOS DE 200 ML POR DIA), DIETA RICA EM FIBRAS (FRUTAS, VERDURAS CRUAS, ALIMENTOS INTEGRAIS...), EXERCÍCIO FÍSICO E PROCURAR EVACUAR DIARIAMENTE SEMPRE NO MESMO HORÁRIO",
     "APROVEITAR A VONTADE APÓS O CAFÉ DA MANHÃ, NÃO ADIAR A EVACUAÇÃO E APOIAR OS PÉS EM UM BANQUINHO AO USAR O VASO SANITÁRIO",
     "REVISAR MEDICAMENTOS CONSTIPANTES (OPIOIDES, ANTICOLINÉRGICOS, SAIS DE FERRO E CÁLCIO, VERAPAMIL). SINAIS DE ALARME (INÍCIO RECENTE APÓS 45-50 ANOS, SANGUE NAS FEZES, ANEMIA, PERDA DE PESO, HISTÓRIA FAMILIAR DE CÂNCER COLORRETAL): ENCAMINHAR PARA COLONOSCOPIA",
     "RETORNAR IMEDIATAMENTE SE DOR ABDOMINAL INTENSA, BARRIGA MUITO DISTENDIDA, VÔMITOS, PARADA DE ELIMINAÇÃO DE GASES OU SANGRAMENTO PELO ÂNUS"
    ]
   },
   {
    "label": "Padrão — Fibra solúvel",
    "draft": true,
    "items": [
     [
      "BENEFIBER ®",
      "01 CAIXA",
      "DISSOLVER 01 SACHÊ EM 01 COPO DE ÁGUA OU SUCO E TOMAR AO ALMOÇO POR 28 DIAS"
     ]
    ]
   },
   {
    "label": "Padrão — Resgate",
    "draft": true,
    "items": [
     [
      "BISACODIL 5 MG",
      "01 CAIXA",
      "TOMAR 01 A 02 COMPRIMIDOS À NOITE SE NÃO EVACUAR POR 03 DIAS SEGUIDOS (RESGATE)"
     ]
    ]
   },
   {
    "label": "Combinação pronta — Macrogol (PEG 3350) + fibra solúvel",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "MACROGOL 3350 + ELETRÓLITOS (MUVINLAX ®)",
      "01 CAIXA",
      "DISSOLVER 01 SACHÊ EM 01 COPO (125 ML) DE ÁGUA E TOMAR 01 VEZ AO DIA, PELA MANHÃ. SE NÃO EVACUAR EM 02 A 03 DIAS, AUMENTAR PARA 02 SACHÊS AO DIA; SE FEZES AMOLECIDAS, REDUZIR. USAR POR 14 DIAS E REAVALIAR"
     ],
     [
      "BENEFIBER ®",
      "01 CAIXA",
      "DISSOLVER 01 SACHÊ EM 01 COPO DE ÁGUA OU SUCO E TOMAR AO ALMOÇO POR 28 DIAS"
     ],
     [
      "BISACODIL 5 MG",
      "01 CAIXA",
      "TOMAR 01 A 02 COMPRIMIDOS À NOITE SE NÃO EVACUAR POR 03 DIAS SEGUIDOS (RESGATE)"
     ]
    ]
   },
   {
    "label": "Combinação pronta — Alternativa SUS: lactulose",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "LACTULOSE 667 MG/ML XAROPE",
      "01 FRASCO",
      "TOMAR 15 ML 01 VEZ AO DIA, PELA MANHÃ. PODE AUMENTAR ATÉ 15 ML DE 12/12H OU REDUZIR CONFORME O FUNCIONAMENTO DO INTESTINO"
     ]
    ]
   },
   {
    "label": "Opção 1 — constipação leve: fibra solúvel (+ simeticona se gases)",
    "sec": "offlabel",
    "items": [
     [
      "BENEFIBER ®",
      "01 CAIXA",
      "DISSOLVER 01 SACHÊ EM 01 COPO DE ÁGUA OU SUCO E TOMAR AO ALMOÇO POR 28 DIAS"
     ],
     [
      "SIMETICONA 40 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO SE DOR (GASES), PODENDO REPETIR DE 6/6H"
     ]
    ],
    "orient": [
     "INGERIR BASTANTE LÍQUIDO (8 A 10 COPOS DE 200 ML POR DIA), DIETA RICA EM FIBRAS (FRUTAS, VERDURAS CRUAS, ALIMENTOS INTEGRAIS...), EXERCÍCIO FÍSICO E PROCURAR EVACUAR DIARIAMENTE SEMPRE NO MESMO HORÁRIO"
    ]
   },
   {
    "label": "Opção 2 — constipação ocasional (curto prazo): macrogol (+ simeticona se gases)",
    "sec": "offlabel",
    "items": [
     [
      "MACROGOL 3350 + ELETRÓLITOS (MUVINLAX ®)",
      "01 CAIXA",
      "DISSOLVER 01 SACHÊ EM 01 COPO (125 ML) DE ÁGUA E TOMAR 01 VEZ AO DIA, APÓS O CAFÉ DA MANHÃ, POR 03 A 07 DIAS (CONSTIPAÇÃO OCASIONAL). SE A CONSTIPAÇÃO FOR CRÔNICA, USAR TODOS OS DIAS POR 14 DIAS E REAVALIAR"
     ],
     [
      "SIMETICONA 40 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO SE DOR (GASES), PODENDO REPETIR DE 6/6H"
     ]
    ],
    "orient": [
     "INGERIR BASTANTE LÍQUIDO (8 A 10 COPOS DE 200 ML POR DIA), DIETA RICA EM FIBRAS (FRUTAS, VERDURAS CRUAS, ALIMENTOS INTEGRAIS...), EXERCÍCIO FÍSICO E PROCURAR EVACUAR DIARIAMENTE SEMPRE NO MESMO HORÁRIO"
    ]
   },
   {
    "label": "Opção 3 — constipação ocasional: macrogol + fibra solúvel (+ simeticona se gases)",
    "sec": "offlabel",
    "items": [
     [
      "MACROGOL 3350 + ELETRÓLITOS (MUVINLAX ®)",
      "01 CAIXA",
      "DISSOLVER 01 SACHÊ EM 01 COPO (125 ML) DE ÁGUA E TOMAR 01 VEZ AO DIA, APÓS O CAFÉ DA MANHÃ, POR 03 A 07 DIAS (CONSTIPAÇÃO OCASIONAL). SE A CONSTIPAÇÃO FOR CRÔNICA, USAR TODOS OS DIAS POR 14 DIAS E REAVALIAR"
     ],
     [
      "BENEFIBER ®",
      "01 CAIXA",
      "DISSOLVER 01 SACHÊ EM 01 COPO DE ÁGUA OU SUCO E TOMAR AO ALMOÇO POR 28 DIAS"
     ],
     [
      "SIMETICONA 40 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO SE DOR (GASES), PODENDO REPETIR DE 6/6H"
     ]
    ],
    "orient": [
     "INGERIR BASTANTE LÍQUIDO (8 A 10 COPOS DE 200 ML POR DIA), DIETA RICA EM FIBRAS (FRUTAS, VERDURAS CRUAS, ALIMENTOS INTEGRAIS...), EXERCÍCIO FÍSICO E PROCURAR EVACUAR DIARIAMENTE SEMPRE NO MESMO HORÁRIO"
    ]
   },
   {
    "label": "Padrão — manutenção: polietilenoglicol (PEG 4000)",
    "mode": "ped",
    "draft": true,
    "items": [
     [
      "POLIETILENOGLICOL 4000 (PEG 4000) PÓ PARA SOLUÇÃO ORAL — MANIPULADO",
      "30 SACHÊS",
      "DISSOLVER 01 SACHÊ ({DOSE}) EM 100 A 200 ML DE ÁGUA OU SUCO E DAR VIA ORAL 01 VEZ AO DIA. AJUSTAR A DOSE ATÉ 01 A 02 EVACUAÇÕES PASTOSAS POR DIA E MANTER POR NO MÍNIMO 02 MESES (0,4 G/KG/DIA; ≥ 06 MESES)",
      "USO ORAL",
      {
       "kg": 400,
       "un": "MG",
       "max": 17000
      }
     ]
    ],
    "orient": [
     "DIETA NORMAL COM FRUTAS, VERDURAS E CEREAIS INTEGRAIS E BOA OFERTA DE ÁGUA; NÃO HÁ NECESSIDADE DE SUPLEMENTO DE FIBRAS OU PROBIÓTICOS",
     "SENTAR NO VASO POR 05 A 10 MINUTOS APÓS AS REFEIÇÕES, COM OS PÉS APOIADOS EM UM BANQUINHO; ELOGIAR AS TENTATIVAS E MANTER UM DIÁRIO DAS EVACUAÇÕES",
     "NÃO SUSPENDER O LAXANTE POR CONTA PRÓPRIA: RETIRAR GRADUALMENTE APÓS NO MÍNIMO 02 MESES DE USO E 01 MÊS SEM SINTOMAS. ESCAPE DE FEZES NA ROUPA COSTUMA SER POR RETENÇÃO, NÃO DE PROPÓSITO",
     "INVESTIGAR SE HÁ SINAIS DE ALARME: INÍCIO NO 1º MÊS, MECÔNIO APÓS 48H DE VIDA, FEZES EM FITA, DISTENSÃO IMPORTANTE, VÔMITOS BILIOSOS, SANGUE NAS FEZES SEM FISSURA, FALHA DE CRESCIMENTO OU ALTERAÇÃO NEUROLÓGICA/LOMBOSSACRA",
     "RETORNAR SE DOR ABDOMINAL INTENSA, VÔMITOS, BARRIGA MUITO DISTENDIDA OU AUSÊNCIA DE EVACUAÇÃO COM PIORA DO ESTADO GERAL"
    ]
   },
   {
    "label": "Padrão — desimpactação (fecaloma): PEG 4000 por 03 a 06 dias, depois manutenção",
    "mode": "ped",
    "draft": true,
    "items": [
     [
      "POLIETILENOGLICOL 4000 (PEG 4000) PÓ PARA SOLUÇÃO ORAL — MANIPULADO",
      "12 SACHÊS",
      "DISSOLVER 01 SACHÊ ({DOSE}) EM 150 A 250 ML DE ÁGUA OU SUCO E DAR VIA ORAL DE 12/12H POR 03 A 06 DIAS, ATÉ SAÍREM FEZES LÍQUIDAS; DEPOIS INICIAR A MANUTENÇÃO (1,5 G/KG/DIA; MÁXIMO 100 G/DIA)",
      "USO ORAL",
      {
       "kgdia": 1500,
       "vezes": 2,
       "un": "MG",
       "max": 50000
      }
     ]
    ],
    "orient": [
     "ESPERADO AUMENTO DAS EVACUAÇÕES, FEZES LÍQUIDAS E CÓLICAS NOS PRIMEIROS DIAS; MANTER BOA OFERTA DE LÍQUIDOS",
     "SE NÃO TOLERAR O PEG ORAL OU SEM RESPOSTA: ENEMA RETAL SOB ORIENTAÇÃO MÉDICA (FOSFATO CONTRAINDICADO EM < 02 ANOS)"
    ]
   },
   {
    "label": "Alternativa: lactulose (lactentes < 06 meses ou PEG indisponível)",
    "mode": "ped",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "LACTULOSE 667 MG/ML XAROPE",
      "01 FRASCO",
      "DAR {DOSE} VIA ORAL DE 12/12H, AJUSTANDO PARA FEZES PASTOSAS DIÁRIAS (1 ML/KG/DIA ≈ 0,7 G/KG/DIA; PODE AUMENTAR ATÉ 2 ML/KG/DIA)",
      "USO ORAL",
      {
       "kgdia": 667,
       "vezes": 2,
       "conc": 667,
       "un": "ML",
       "max": 10000
      }
     ]
    ],
    "orient": [
     "PODE CAUSAR GASES E CÓLICAS; PODE SER USADA EM LACTENTES"
    ]
   },
   {
    "label": "Resgate (≥ 04 anos) se 03 dias sem evacuar apesar da manutenção: bisacodil",
    "mode": "ped",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "BISACODIL 5 MG",
      "01 CAIXA",
      "DAR 01 COMPRIMIDO (5 MG) VIA ORAL À NOITE, ENGOLIDO INTEIRO, SE NÃO EVACUAR POR 03 DIAS SEGUIDOS (> 10 ANOS: 01 A 02 COMPRIMIDOS)",
      "USO ORAL"
     ]
    ]
   },
   {
    "label": "Do material do Drive — Lubrificante e resgate retal (modelo do médico)",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "ÓLEO MINERAL",
      "01 FRASCO",
      "TOMAR 01 COLHER DE SOPA (15 ML) 01 A 02 VEZES AO DIA, LONGE DAS REFEIÇÕES E NUNCA LOGO ANTES DE DEITAR, POR ATÉ 02 SEMANAS. NÃO USAR EM ACAMADOS, IDOSOS FRÁGEIS, GESTANTES OU SE HOUVER DIFICULDADE PARA ENGOLIR",
      "USO ORAL"
     ],
     [
      "SUPOSITÓRIO DE GLICERINA (ADULTO)",
      "01 CAIXA",
      "INTRODUZIR 01 SUPOSITÓRIO VIA RETAL 01 VEZ AO DIA SE NÃO EVACUAR POR 03 DIAS SEGUIDOS (RESGATE)",
      "USO TÓPICO"
     ]
    ]
   },
   {
    "label": "Padrão — Fecaloma no PS: toque retal, desimpactação e enema glicerinado",
    "mode": "internacao",
    "draft": true,
    "items": [
     [
      "GLICERINA 12% SOLUÇÃO PARA ENEMA (CLISTER GLICERINADO)",
      "01 FRASCO 500 ML",
      "APLICAR 500 ML VIA RETAL, LENTAMENTE, COM O PACIENTE DEITADO DO LADO ESQUERDO; REAVALIAR E REPETIR APÓS 06 A 08H SE NECESSÁRIO. NÃO USAR SE SUSPEITA DE OBSTRUÇÃO, PERFURAÇÃO OU COLITE GRAVE",
      "USO TÓPICO"
     ]
    ],
    "orient": [
     "TOQUE RETAL ANTES DO ENEMA; FECALOMA BAIXO E ENDURECIDO: DESIMPACTAÇÃO DIGITAL COM LUBRIFICANTE E ANALGESIA",
     "APÓS RESOLVER O FECALOMA, MANTER LAXANTE OSMÓTICO DIÁRIO (MACROGOL OU LACTULOSE) PARA EVITAR NOVA IMPACTAÇÃO",
     "DOR INTENSA, VÔMITOS, DISTENSÃO, FEBRE OU SANGRAMENTO: RX DE ABDOME E AVALIAÇÃO DA CIRURGIA ANTES DO ENEMA (OBSTRUÇÃO, PERFURAÇÃO, VOLVO)"
    ]
   }
  ]
 },
 {
  "id": "crise_convulsiva",
  "ic": "⚡",
  "nm": "Crise convulsiva",
  "sub": "diazepam · midazolam · fenitoína · levetiracetam",
  "blocks": [
   {
    "label": "Padrão — Crise ≥ 5 minutos: benzodiazepínico (doses pelo peso em Calculadoras › Emergência › Convulsão) — escolha 1",
    "mode": "internacao",
    "draft": true,
    "menu": true,
    "items": [
     [
      "DIAZEPAM 5 MG/ML SOLUÇÃO INJETÁVEL",
      "01 AMPOLA 2 ML",
      "CRISE ≥ 5 MINUTOS: ADMINISTRAR 10 MG (2 ML) EV LENTO (ATÉ 5 MG/MIN), SEM DILUIR; PODE REPETIR 01 VEZ APÓS 5 MINUTOS SE A CRISE CONTINUAR. RISCO DE DEPRESSÃO RESPIRATÓRIA: MONITORIZAR SATO2 E TER MATERIAL DE VIA AÉREA",
      "USO ENDOVENOSO"
     ],
     [
      "MIDAZOLAM 5 MG/ML SOLUÇÃO INJETÁVEL",
      "01 AMPOLA 3 ML",
      "SEM ACESSO VENOSO: APLICAR 10 MG (2 ML) IM EM DOSE ÚNICA (PESO > 40 KG; 13 A 40 KG: 5 MG). RISCO DE DEPRESSÃO RESPIRATÓRIA: MONITORIZAR SATO2 E TER MATERIAL DE VIA AÉREA",
      "USO INTRAMUSCULAR"
     ]
    ]
   },
   {
    "label": "Padrão — Crise que persiste após o benzodiazepínico: 2ª droga EV — escolha 1",
    "mode": "internacao",
    "draft": true,
    "menu": true,
    "items": [
     [
      "FENITOÍNA 50 MG/ML SOLUÇÃO INJETÁVEL",
      "AMPOLAS DE 5 ML CONFORME DOSE",
      "ATAQUE: {DOSE} EV DILUÍDO EM SF 0,9% ATÉ CONCENTRAÇÃO FINAL ≥ 5 MG/ML (ADULTO: EM 100 ML), NUNCA EM SORO GLICOSADO, COM FILTRO DE LINHA SE DISPONÍVEL, EM VEIA CALIBROSA; NO MÁXIMO 50 MG/MIN (IDOSO OU CARDIOPATA: 25 MG/MIN), COM MONITORIZAÇÃO DE ECG E PA. NÃO USAR SE BRADICARDIA OU BAV DE 2º OU 3º GRAU (20 MG/KG; MÁXIMO 1.500 MG)",
      "USO ENDOVENOSO",
      {
       "kg": 20,
       "un": "MG",
       "max": 1500
      }
     ],
     [
      "LEVETIRACETAM 100 MG/ML SOLUÇÃO INJETÁVEL",
      "AMPOLAS DE 5 ML CONFORME DOSE",
      "ATAQUE: {DOSE} EV DILUÍDO EM 100 ML DE SF 0,9%, EM 15 MINUTOS (60 MG/KG; MÁXIMO 4.500 MG)",
      "USO ENDOVENOSO",
      {
       "kg": 60,
       "un": "MG",
       "max": 4500
      }
     ]
    ]
   },
   {
    "label": "Padrão — Glicemia capilar < 70 mg/dL (tiamina antes da glicose se etilista ou desnutrido)",
    "mode": "internacao",
    "draft": true,
    "items": [
     [
      "TIAMINA (CLORIDRATO) 100 MG/ML SOLUÇÃO INJETÁVEL",
      "01 AMPOLA 1 ML",
      "ETILISTA OU DESNUTRIDO: ADMINISTRAR 100 MG (1 ML) EV ANTES DA GLICOSE, SEM ATRASÁ-LA",
      "USO ENDOVENOSO"
     ],
     [
      "GLICOSE 50% SOLUÇÃO INJETÁVEL",
      "10 AMPOLAS 10 ML",
      "SE GLICEMIA CAPILAR < 70 MG/DL E NÃO CONSEGUE INGERIR POR VIA ORAL: ADMINISTRAR 50 ML (25 G) EV EM VEIA CALIBROSA; REPETIR A GLICEMIA EM 15 MINUTOS E REPETIR A DOSE SE AINDA < 70 MG/DL. ETILISTA OU DESNUTRIDO: TIAMINA 100 MG EV ANTES OU JUNTO, SEM ATRASAR A GLICOSE. NÃO DAR ALTA SE A HIPOGLICEMIA FOR POR SULFONILUREIA OU INSULINA DE AÇÃO LONGA: OBSERVAR DE 12 A 24 H COM SORO GLICOSADO E GLICEMIAS SERIADAS",
      "USO ENDOVENOSO"
     ]
    ]
   },
   {
    "label": "Padrão — Crise ≥ 5 minutos: benzodiazepínico pelo peso (tabela completa em Calculadoras › Pediatria › Convulsão) — escolha 1",
    "mode": "ped_internacao",
    "draft": true,
    "menu": true,
    "items": [
     [
      "DIAZEPAM 5 MG/ML SOLUÇÃO INJETÁVEL",
      "01 AMPOLA 2 ML",
      "ADMINISTRAR {DOSE} EV LENTO (ATÉ 5 MG/MIN), SEM DILUIR (0,2 MG/KG; MÁXIMO 10 MG); PODE REPETIR 01 VEZ APÓS 5 MINUTOS SE A CRISE CONTINUAR. RISCO DE DEPRESSÃO RESPIRATÓRIA: MONITORIZAR SATO2 E TER MATERIAL DE VIA AÉREA",
      "USO ENDOVENOSO",
      {
       "kg": 0.2,
       "un": "MG",
       "max": 10
      }
     ],
     [
      "MIDAZOLAM 5 MG/ML SOLUÇÃO INJETÁVEL",
      "01 AMPOLA 3 ML",
      "SEM ACESSO VENOSO: APLICAR {DOSE} IM EM DOSE ÚNICA (0,2 MG/KG; MÁXIMO 10 MG). RISCO DE DEPRESSÃO RESPIRATÓRIA: MONITORIZAR SATO2 E TER MATERIAL DE VIA AÉREA",
      "USO INTRAMUSCULAR",
      {
       "kg": 0.2,
       "un": "MG",
       "max": 10
      }
     ]
    ]
   },
   {
    "label": "Padrão — Crise que persiste após o benzodiazepínico: 2ª droga EV pelo peso — escolha 1",
    "mode": "ped_internacao",
    "draft": true,
    "menu": true,
    "items": [
     [
      "FENITOÍNA 50 MG/ML SOLUÇÃO INJETÁVEL",
      "AMPOLAS DE 5 ML CONFORME DOSE",
      "ATAQUE: {DOSE} EV DILUÍDO EM SF 0,9% ATÉ CONCENTRAÇÃO FINAL ≥ 5 MG/ML, NUNCA EM SORO GLICOSADO, COM FILTRO DE LINHA SE DISPONÍVEL, EM VEIA CALIBROSA; NO MÁXIMO 1 MG/KG/MIN (ATÉ 50 MG/MIN), COM MONITORIZAÇÃO DE ECG E PA. NÃO USAR SE BRADICARDIA OU BAV DE 2º OU 3º GRAU (20 MG/KG; MÁXIMO 1.500 MG)",
      "USO ENDOVENOSO",
      {
       "kg": 20,
       "un": "MG",
       "max": 1500
      }
     ],
     [
      "LEVETIRACETAM 100 MG/ML SOLUÇÃO INJETÁVEL",
      "AMPOLAS DE 5 ML CONFORME DOSE",
      "ATAQUE: {DOSE} EV DILUÍDO EM SF 0,9%, EM 15 MINUTOS (60 MG/KG; MÁXIMO 4.500 MG)",
      "USO ENDOVENOSO",
      {
       "kg": 60,
       "un": "MG",
       "max": 4500
      }
     ]
    ]
   },
   {
    "label": "Do material do Drive — Fenitoína 1 g em dose prática (prescrição do médico; vale só para 45 a 55 kg)",
    "mode": "internacao",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "FENITOÍNA 50 MG/ML SOLUÇÃO INJETÁVEL",
      "04 AMPOLAS 5 ML",
      "DILUIR 04 AMPOLAS (1.000 MG = 20 ML) EM 80 ML DE SF 0,9% E CORRER EM BOMBA A 300 ML/H (20 MINUTOS = 50 MG/MIN); IDOSO OU CARDIOPATA: 150 ML/H (40 MINUTOS). EQUIVALE A 18-22 MG/KG SÓ ENTRE 45 E 55 KG — FORA DESSA FAIXA, USAR OS 20 MG/KG (MÁXIMO 1.500 MG) DO PADRÃO. NUNCA EM SORO GLICOSADO; MONITORIZAR ECG E PA; NÃO USAR SE BRADICARDIA OU BAV",
      "USO ENDOVENOSO"
     ]
    ]
   },
   {
    "label": "Do material do Drive — Crise refratária à 2ª droga (ou sem levetiracetam/fenitoína): fenobarbital EV",
    "mode": "internacao",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "FENOBARBITAL 100 MG/ML SOLUÇÃO INJETÁVEL",
      "AMPOLAS DE 2 ML CONFORME DOSE",
      "ADMINISTRAR 15 A 20 MG/KG EV, DILUÍDO EM 100 ML DE SF 0,9%, EM VELOCIDADE MENOR QUE 60 MG/MIN (DOSE PELO PESO EM CALCULADORAS › EMERGÊNCIA › CONVULSÃO). ALTO RISCO DE DEPRESSÃO RESPIRATÓRIA E HIPOTENSÃO: MONITORIZAÇÃO CONTÍNUA E MATERIAL DE VIA AÉREA À BEIRA DO LEITO",
      "USO ENDOVENOSO"
     ]
    ]
   },
   {
    "label": "Do material do Drive — Crise refratária à 2ª droga: fenobarbital EV pelo peso",
    "mode": "ped_internacao",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "FENOBARBITAL 100 MG/ML SOLUÇÃO INJETÁVEL",
      "AMPOLAS DE 2 ML CONFORME DOSE",
      "ADMINISTRAR 20 MG/KG EV (MÁXIMO 1.000 MG), DILUÍDO EM SF 0,9%, A NO MÁXIMO 1 MG/KG/MIN (MÍNIMO 20 MINUTOS; MÁXIMO 60 MG/MIN). ALTO RISCO DE DEPRESSÃO RESPIRATÓRIA E HIPOTENSÃO: MONITORIZAÇÃO CONTÍNUA E MATERIAL DE VIA AÉREA PEDIÁTRICO À BEIRA DO LEITO",
      "USO ENDOVENOSO"
     ]
    ]
   },
   {
    "label": "Padrão — Convulsão febril simples (6 meses a 5 anos), já recuperada: antitérmico só para conforto — escolha 1",
    "mode": "ped",
    "draft": true,
    "menu": true,
    "items": [
     [
      "PARACETAMOL 200 MG/ML SOLUÇÃO ORAL (GOTAS)",
      "01 FRASCO",
      "DAR {DOSE} VIA ORAL DE 6/6H SE FEBRE OU DESCONFORTO (15 MG/KG/DOSE)",
      "USO ORAL",
      {
       "kg": 15,
       "conc": 200,
       "gotas": 15,
       "un": "GOTAS",
       "max": 750
      }
     ],
     [
      "DIPIRONA 500 MG/ML SOLUÇÃO ORAL (GOTAS)",
      "01 FRASCO",
      "DAR {DOSE} VIA ORAL DE 6/6H SE FEBRE OU DESCONFORTO (15 MG/KG/DOSE). ACIMA DE 3 MESES OU 5 KG",
      "USO ORAL",
      {
       "kg": 15,
       "conc": 500,
       "gotas": 20,
       "un": "GOTAS",
       "max": 1000
      }
     ]
    ],
    "orient": [
     "O ANTITÉRMICO DÁ CONFORTO, MAS NÃO EVITA NOVA CONVULSÃO; NÃO HÁ INDICAÇÃO DE ANTICONVULSIVANTE CONTÍNUO NEM INTERMITENTE NA CONVULSÃO FEBRIL SIMPLES",
     "DURANTE UMA CRISE: DEITAR A CRIANÇA DE LADO, AFASTAR OBJETOS, NÃO COLOCAR NADA NA BOCA E MARCAR O TEMPO; LIGAR 192 (SAMU) SE PASSAR DE 5 MINUTOS",
     "CERCA DE 1 EM CADA 3 CRIANÇAS TEM NOVA CONVULSÃO COM FEBRE; A GRANDE MAIORIA NÃO TERÁ EPILEPSIA",
     "PROCURAR A UNIDADE DE SAÚDE PARA ACOMPANHAR A CAUSA DA FEBRE",
     "RETORNAR IMEDIATAMENTE SE NOVA CRISE, CRISE COM MAIS DE 5 MINUTOS, SONOLÊNCIA QUE NÃO PASSA, VÔMITOS REPETIDOS, NUCA DURA, MANCHAS NA PELE OU DIFICULDADE PARA RESPIRAR"
    ]
   }
  ]
 },
 {
  "id": "crise_hipertensiva",
  "ic": "📈",
  "nm": "Crise hipertensiva (urgência e emergência)",
  "sub": "captopril · nitroprussiato · nitroglicerina · losartana · anlodipino",
  "blocks": [
   {
    "label": "Padrão — Elevação importante da PA sem lesão aguda de órgão-alvo: repouso por 30 min e reavaliar; se não baixar, anti-hipertensivo oral, reduzindo aos poucos (fora da gestação, nifedipina de liberação rápida é proscrita)",
    "mode": "internacao",
    "draft": true,
    "items": [
     [
      "CAPTOPRIL 25 MG",
      "02 COMPRIMIDOS",
      "ADMINISTRAR 25 MG VIA ORAL (NÃO SUBLINGUAL); REAVALIAR A PA EM 01 HORA E, SE NECESSÁRIO, REPETIR 25 MG. NÃO USAR NA GESTAÇÃO",
      "USO ORAL"
     ]
    ],
    "orient": [
     "PA ≥ 180/110 SEM LESÃO DE ÓRGÃO-ALVO: TRATAR DOR, ANSIEDADE, RETENÇÃO URINÁRIA E ABSTINÊNCIA ANTES DE TRATAR O NÚMERO; NÃO USAR DROGA EV NEM INTERNAR SÓ PELA PA",
     "META SEM LESÃO DE ÓRGÃO-ALVO: REDUZIR AOS POUCOS, PAS < 160 E PAD < 100 EM HORAS A DIAS",
     "ALTA COM O ANTI-HIPERTENSIVO DO PADRÃO AMBULATORIAL E RETORNO À UNIDADE DE SAÚDE EM 1 A 7 DIAS"
    ]
   },
   {
    "label": "Alternativa ao captopril — clonidina VO (elevação importante da PA sem lesão de órgão-alvo que persiste após repouso)",
    "mode": "internacao",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "CLONIDINA 0,100 MG",
      "06 COMPRIMIDOS",
      "ADMINISTRAR 0,100 A 0,200 MG VIA ORAL; SE NECESSÁRIO, REPETIR 0,100 MG A CADA HORA ATÉ O MÁXIMO DE 0,600 MG. CAUSA SONOLÊNCIA E BOCA SECA; EVITAR SE BRADICARDIA, BAV OU IDOSO FRÁGIL. SE O PACIENTE JÁ USA CLONIDINA, NÃO SUSPENDER DE REPENTE (REBOTE)",
      "USO ORAL"
     ]
    ]
   },
   {
    "label": "Padrão — Emergência hipertensiva (com lesão aguda de órgão-alvo): vasodilatador EV em bomba — escolha 1",
    "mode": "internacao",
    "draft": true,
    "menu": true,
    "items": [
     [
      "NITROPRUSSIATO DE SÓDIO 50 MG/2 ML SOLUÇÃO INJETÁVEL",
      "01 AMPOLA",
      "INFUNDIR EM BOMBA, PROTEGIDO DA LUZ — DILUIÇÃO, DOSE E VAZÃO PELA ABA CALCULADORAS › NITROPRUSSIATO. META: REDUZIR A PA MÉDIA EM ATÉ 25% NA 1ª HORA (DISSECÇÃO DE AORTA, AVC E ECLÂMPSIA TÊM METAS E DROGAS PRÓPRIAS)",
      "USO ENDOVENOSO"
     ],
     [
      "NITROGLICERINA 5 MG/ML (TRIDIL®) SOLUÇÃO INJETÁVEL",
      "01 AMPOLA 10 ML",
      "SE DOR PERSISTENTE, HIPERTENSÃO OU CONGESTÃO: INFUNDIR EM BOMBA — DILUIÇÃO, DOSE E VAZÃO PELA ABA CALCULADORAS › NITROGLICERINA. NÃO USAR SE PAS < 90 MMHG, INFARTO DE VENTRÍCULO DIREITO, SILDENAFILA NAS ÚLTIMAS 24 H OU TADALAFILA NAS ÚLTIMAS 48 H",
      "USO ENDOVENOSO"
     ]
    ]
   },
   {
    "label": "Padrão — Início ou ajuste do anti-hipertensivo (retorno à unidade em 1 a 7 dias) — escolha 1",
    "draft": true,
    "menu": true,
    "items": [
     [
      "LOSARTANA 50 MG",
      "30 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO 01 VEZ AO DIA, NO MESMO HORÁRIO. NÃO USAR NA GESTAÇÃO",
      "USO ORAL"
     ],
     [
      "ANLODIPINO 5 MG",
      "30 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO 01 VEZ AO DIA, NO MESMO HORÁRIO",
      "USO ORAL"
     ],
     [
      "HIDROCLOROTIAZIDA 25 MG",
      "30 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO PELA MANHÃ",
      "USO ORAL"
     ]
    ],
    "orient": [
     "ESTA RECEITA É PARA COMEÇAR OU AJUSTAR O TRATAMENTO: MARCAR CONSULTA NA UNIDADE DE SAÚDE EM 1 A 7 DIAS PARA REAVALIAR A PRESSÃO",
     "NÃO PARAR OS REMÉDIOS DE PRESSÃO POR CONTA PRÓPRIA; DIMINUIR O SAL, EVITAR BEBIDA ALCOÓLICA E CIGARRO",
     "SE TIVER APARELHO, MEDIR A PRESSÃO SENTADO, EM REPOUSO, E ANOTAR PARA MOSTRAR NA CONSULTA",
     "RETORNAR IMEDIATAMENTE OU LIGAR 192 (SAMU) SE DOR NO PEITO, FALTA DE AR, DOR DE CABEÇA MUITO FORTE, CONFUSÃO, FRAQUEZA OU FORMIGAMENTO EM UM LADO DO CORPO, DIFICULDADE PARA FALAR OU ENXERGAR"
    ]
   },
   {
    "label": "Do material do Drive — Dissecção de aorta ou SCA com hipertensão: metoprolol EV",
    "mode": "internacao",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "METOPROLOL (TARTARATO) 1 MG/ML SOLUÇÃO INJETÁVEL",
      "03 AMPOLAS 5 ML",
      "ADMINISTRAR 5 MG (5 ML) EV EM 1 A 2 MINUTOS; REPETIR A CADA 5 MINUTOS ATÉ 15 MG, CONFORME FC E PA. NA DISSECÇÃO, DAR ANTES DO VASODILATADOR (ALVO FC < 60 BPM E PAS ≤ 120 MMHG). NÃO USAR SE IC DESCOMPENSADA, BAV, BRADICARDIA, BRONCOESPASMO OU INTOXICAÇÃO POR COCAÍNA",
      "USO ENDOVENOSO"
     ]
    ]
   },
   {
    "label": "Padrão — Gestante ≥ 20 semanas ou puérpera com PA ≥ 160/110 persistente por 15 min: anti-hipertensivo de ação rápida — escolha 1",
    "mode": "internacao",
    "draft": true,
    "menu": true,
    "items": [
     [
      "HIDRALAZINA 20 MG/ML SOLUÇÃO INJETÁVEL",
      "01 AMPOLA 1 ML",
      "DILUIR 01 AMPOLA (20 MG) EM 19 ML DE ÁGUA DESTILADA (1 MG/ML) E ADMINISTRAR 5 MG (5 ML) EV LENTO; REPETIR 5 MG A CADA 20 MINUTOS CONFORME A PA, ATÉ O MÁXIMO DE 30 MG. META: PAS 140-150 E PAD 90-100 MMHG, SEM QUEDA BRUSCA",
      "USO ENDOVENOSO"
     ],
     [
      "NIFEDIPINO 10 MG (LIBERAÇÃO RÁPIDA)",
      "03 COMPRIMIDOS",
      "SEM ACESSO VENOSO OU COMO ALTERNATIVA À HIDRALAZINA: 10 MG VIA ORAL, ENGOLIR SEM MASTIGAR (NUNCA SUBLINGUAL); REPETIR 10 MG A CADA 20 MINUTOS CONFORME A PA, ATÉ O MÁXIMO DE 30 MG. META: PAS 140-150 E PAD 90-100 MMHG. SÓ NA GESTANTE OU PUÉRPERA — FORA DA GESTAÇÃO É PROSCRITO",
      "USO ORAL"
     ]
    ],
    "orient": [
     "GESTANTE OU PUÉRPERA COM CRISE HIPERTENSIVA E PRÉ-ECLÂMPSIA: SULFATO DE MAGNÉSIO TAMBÉM (BLOCO SEGUINTE); NA EMERGÊNCIA HIPERTENSIVA COM SINTOMAS, O MAGNÉSIO VEM ANTES DO ANTI-HIPERTENSIVO",
     "ACIONAR A OBSTETRÍCIA OU A REGULAÇÃO; AVALIAR A VITALIDADE FETAL; HEMOGRAMA COM PLAQUETAS, TGO/TGP, LDH, CREATININA E PROTEINÚRIA",
     "NA GESTAÇÃO NÃO USAR IECA (CAPTOPRIL) NEM BRA (LOSARTANA); NITROPRUSSIATO SÓ NO EDEMA AGUDO DE PULMÃO REFRATÁRIO"
    ]
   },
   {
    "label": "Padrão — Pré-eclâmpsia com crise hipertensiva, sinais de gravidade, iminência de eclâmpsia ou eclâmpsia: sulfato de magnésio (esquema de Zuspan)",
    "mode": "internacao",
    "draft": true,
    "items": [
     [
      "SULFATO DE MAGNÉSIO 50% (500 MG/ML) SOLUÇÃO INJETÁVEL",
      "01 AMPOLA 10 ML",
      "ATAQUE: DILUIR 8 ML (4 G) EM 100 ML DE SF 0,9% E INFUNDIR EM 15 A 20 MINUTOS (BOMBA A 300 ML/H)",
      "USO ENDOVENOSO"
     ],
     [
      "SULFATO DE MAGNÉSIO 50% (500 MG/ML) SOLUÇÃO INJETÁVEL",
      "05 AMPOLAS 10 ML",
      "MANUTENÇÃO: DILUIR 10 ML (5 G) EM 490 ML DE SF 0,9% (1 G/100 ML) E INFUNDIR A 100 ML/H (1 G/H) EM BOMBA, ATÉ 24 H APÓS O PARTO OU A ÚLTIMA CRISE, CONFORME A OBSTETRÍCIA. REDUZIR OU PARAR E CHAMAR O MÉDICO SE REFLEXO PATELAR ABOLIDO, FR < 16 OU DIURESE < 25 ML/H",
      "USO ENDOVENOSO"
     ]
    ],
    "orient": [
     "TRANSFERÊNCIA PARA OUTRO SERVIÇO: PREFERIR O ESQUEMA DE PRITCHARD (4 G EV EM 15-20 MIN + 10 G IM, 5 G EM CADA NÁDEGA), MAIS SEGURO NO TRANSPORTE",
     "INTOXICAÇÃO POR MAGNÉSIO (DEPRESSÃO RESPIRATÓRIA): PARAR A INFUSÃO E FAZER GLUCONATO DE CÁLCIO 10% 10 ML EV LENTO",
     "INSUFICIÊNCIA RENAL: MANTER O ATAQUE E REDUZIR A MANUTENÇÃO, COM DOSAGEM DO MAGNÉSIO E DA CREATININA"
    ]
   }
  ]
 },
 {
  "id": "dengue",
  "ic": "🦟",
  "nm": "Dengue",
  "sub": "soro de reidratação oral · dipirona · paracetamol",
  "blocks": [
   {
    "label": "Padrão — Hidratação oral",
    "draft": true,
    "items": [
     [
      "SORO DE REIDRATAÇÃO ORAL",
      "01 CAIXA",
      "DILUIR 01 SACHÊ EM 1 LITRO DE ÁGUA FILTRADA OU FERVIDA E GUARDAR NA GELADEIRA. TOMAR 01 COPO AO MENOS 10 VEZES POR DIA, OU MAIS, CONFORME ACEITAÇÃO"
     ]
    ],
    "orient": [
     "HIDRATAÇÃO ORAL: 60 ML/KG/DIA (EX.: ADULTO DE 70 KG = 4,2 LITROS/DIA), SENDO 1/3 DE SORO DE REIDRATAÇÃO ORAL E 2/3 DE ÁGUA, SUCOS, CHÁS OU ÁGUA DE COCO. MANTER DURANTE TODA A FEBRE E ATÉ 48H APÓS A FEBRE PASSAR",
     "NÃO USAR AAS, IBUPROFENO, DICLOFENACO, NIMESULIDA OU OUTROS ANTI-INFLAMATÓRIOS, NEM CORTICOIDES. NÃO SE AUTOMEDICAR. REPOUSO E USO DE REPELENTE",
     "RETORNAR IMEDIATAMENTE EM CASO DE DOR DE BARRIGA INTENSA E SEM MELHORA, VÔMITOS PERSISTENTES, SANGRAMENTOS IMPORTANTES, AUSÊNCIA DE URINA POR UM DIA APESAR DA HIDRATAÇÃO, SONOLÊNCIA INTENSA OU IRRITABILIDADE, VONTADE DE DESMAIAR, DESMAIO, MAL ESTAR IMPORTANTE OU MESMO DÚVIDAS.",
     "GRUPO A: RETORNAR PARA REAVALIAÇÃO NO DIA EM QUE A FEBRE PASSAR (INÍCIO DA FASE CRÍTICA) OU NO 5º DIA DE DOENÇA SE A FEBRE PERSISTIR",
     "GRUPO B (HEMATÓCRITO NORMAL): REAVALIAÇÃO CLÍNICA E HEMOGRAMA DIÁRIOS ATÉ 48H APÓS O FIM DA FEBRE"
    ]
   },
   {
    "label": "Padrão — Analgésico / antitérmico — escolha 1",
    "draft": true,
    "menu": true,
    "items": [
     [
      "DIPIRONA 500 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO (500 MG) SE DOR OU FEBRE, PODENDO REPETIR DE 6/6H",
      "USO ORAL"
     ],
     [
      "PARACETAMOL 750 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO SE DOR OU FEBRE, PODENDO REPETIR DE 6/6H. INTERCALAR COM DIPIRONA, SE NECESSÁRIO."
     ]
    ]
   },
   {
    "label": "Padrão — Antiemético se náuseas — escolha 1",
    "draft": true,
    "menu": true,
    "items": [
     [
      "METOCLOPRAMIDA 10 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO SE NÁUSEAS OU VÔMITOS, PODENDO REPETIR DE 8/8H"
     ],
     [
      "ONDANSETRONA 8 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO SE NÁUSEAS OU VÔMITOS, PODENDO REPETIR DE 8/8H"
     ]
    ]
   },
   {
    "label": "Combinação pronta — grupos A e B (hidratação oral + sintomático)",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "DIPIRONA 500 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO (500 MG) SE DOR OU FEBRE, PODENDO REPETIR DE 6/6H",
      "USO ORAL"
     ],
     [
      "SORO DE REIDRATAÇÃO ORAL",
      "01 CAIXA",
      "DILUIR 01 SACHÊ EM 1 LITRO DE ÁGUA FILTRADA OU FERVIDA E GUARDAR NA GELADEIRA. TOMAR 01 COPO AO MENOS 10 VEZES POR DIA, OU MAIS, CONFORME ACEITAÇÃO"
     ]
    ]
   },
   {
    "label": "Grupo A — sintomáticos + hidratação oral (60 ML/KG/DIA)",
    "sec": "offlabel",
    "items": [
     [
      "DIPIRONA 500 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO (500 MG) SE DOR OU FEBRE, PODENDO REPETIR DE 6/6H",
      "USO ORAL"
     ],
     [
      "METOCLOPRAMIDA 10 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO SE NÁUSEAS OU VÔMITOS, PODENDO REPETIR DE 8/8H"
     ],
     [
      "SORO DE REIDRATAÇÃO ORAL",
      "01 CAIXA",
      "DILUIR 01 SACHÊ EM 1 LITRO DE ÁGUA FILTRADA OU FERVIDA E GUARDAR NA GELADEIRA. TOMAR 01 COPO AO MENOS 10 VEZES POR DIA, OU MAIS, CONFORME ACEITAÇÃO"
     ]
    ],
    "orient": [
     "HIDRATAÇÃO ORAL: 60 ML/KG/DIA (EX.: ADULTO DE 70 KG = 4,2 LITROS/DIA), SENDO 1/3 DE SORO DE REIDRATAÇÃO ORAL E 2/3 DE LÍQUIDOS CASEIROS (ÁGUA, SUCOS, SORO CASEIRO, CHÁS, ÁGUA DE COCO), DURANTE TODA A FEBRE E ATÉ 48H APÓS A FEBRE PASSAR",
     "NÃO TOMAR AAS, IBUPROFENO, DICLOFENACO, NIMESULIDA OU OUTRO ANTI-INFLAMATÓRIO, NEM CORTICOIDE; NÃO SE AUTOMEDICAR",
     "RETORNAR PARA REAVALIAÇÃO NO DIA EM QUE A FEBRE PASSAR (INÍCIO DA FASE CRÍTICA) OU NO 5º DIA DE DOENÇA SE A FEBRE CONTINUAR",
     "RETORNAR IMEDIATAMENTE EM CASO DE DOR DE BARRIGA INTENSA E SEM MELHORA, VÔMITOS PERSISTENTES, SANGRAMENTOS IMPORTANTES, AUSÊNCIA DE URINA POR UM DIA APESAR DA HIDRATAÇÃO, SONOLÊNCIA INTENSA OU IRRITABILIDADE, VONTADE DE DESMAIAR, DESMAIO, MAL ESTAR IMPORTANTE OU MESMO DÚVIDAS."
    ]
   },
   {
    "label": "Grupo B com hematócrito normal — sintomáticos + hidratação oral e reavaliação diária",
    "sec": "offlabel",
    "items": [
     [
      "DIPIRONA 500 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO (500 MG) SE DOR OU FEBRE, PODENDO REPETIR DE 6/6H",
      "USO ORAL"
     ],
     [
      "METOCLOPRAMIDA 10 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO SE NÁUSEAS OU VÔMITOS, PODENDO REPETIR DE 8/8H"
     ],
     [
      "SORO DE REIDRATAÇÃO ORAL",
      "01 CAIXA",
      "DILUIR 01 SACHÊ EM 1 LITRO DE ÁGUA FILTRADA OU FERVIDA E GUARDAR NA GELADEIRA. TOMAR 01 COPO AO MENOS 10 VEZES POR DIA, OU MAIS, CONFORME ACEITAÇÃO"
     ]
    ],
    "orient": [
     "HIDRATAÇÃO ORAL: 60 ML/KG/DIA (EX.: ADULTO DE 70 KG = 4,2 LITROS/DIA), SENDO 1/3 DE SORO DE REIDRATAÇÃO ORAL E 2/3 DE LÍQUIDOS CASEIROS (ÁGUA, SUCOS, SORO CASEIRO, CHÁS, ÁGUA DE COCO), DURANTE TODA A FEBRE E ATÉ 48H APÓS A FEBRE PASSAR",
     "NÃO TOMAR AAS, IBUPROFENO, DICLOFENACO, NIMESULIDA OU OUTRO ANTI-INFLAMATÓRIO, NEM CORTICOIDE; NÃO SE AUTOMEDICAR",
     "GRUPO B: VOLTAR TODOS OS DIAS PARA REAVALIAÇÃO CLÍNICA E HEMOGRAMA ATÉ 48H APÓS O FIM DA FEBRE",
     "RETORNAR IMEDIATAMENTE EM CASO DE DOR DE BARRIGA INTENSA E SEM MELHORA, VÔMITOS PERSISTENTES, SANGRAMENTOS IMPORTANTES, AUSÊNCIA DE URINA POR UM DIA APESAR DA HIDRATAÇÃO, SONOLÊNCIA INTENSA OU IRRITABILIDADE, VONTADE DE DESMAIAR, DESMAIO, MAL ESTAR IMPORTANTE OU MESMO DÚVIDAS."
    ]
   },
   {
    "label": "Analgésico/antitérmico — escolha 1",
    "sec": "offlabel",
    "menu": true,
    "items": [
     [
      "DIPIRONA 500 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO (500 MG) SE DOR OU FEBRE, PODENDO REPETIR DE 6/6H",
      "USO ORAL"
     ],
     [
      "PARACETAMOL 750 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO SE DOR OU FEBRE, PODENDO REPETIR DE 6/6H. INTERCALAR COM DIPIRONA, SE NECESSÁRIO."
     ]
    ]
   },
   {
    "label": "Antiemético — escolha 1",
    "sec": "offlabel",
    "menu": true,
    "items": [
     [
      "METOCLOPRAMIDA 10 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO SE NÁUSEAS OU VÔMITOS, PODENDO REPETIR DE 8/8H"
     ],
     [
      "ONDANSETRONA 8 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO SE NÁUSEAS OU VÔMITOS, PODENDO REPETIR DE 8/8H"
     ]
    ]
   },
   {
    "label": "Padrão — Grupo C (sinais de alarme): expansão e manutenção com SF 0,9%",
    "mode": "internacao",
    "draft": true,
    "items": [
     [
      "CLORETO DE SÓDIO 0,9% (SORO FISIOLÓGICO)",
      "01 BOLSA 1000 ML",
      "FASE DE EXPANSÃO: INFUNDIR {DOSE} EV NA 1ª HORA (10 ML/KG/H) E REPETIR O MESMO VOLUME NA 2ª HORA ATÉ O RESULTADO DO HEMATÓCRITO (MÁXIMO 20 ML/KG EM 2 HORAS). SEM MELHORA CLÍNICA OU DO HEMATÓCRITO, REPETIR A FASE ATÉ 3 VEZES",
      "USO ENDOVENOSO",
      {
       "kg": 10,
       "un": "ML",
       "max": 800
      }
     ],
     [
      "CLORETO DE SÓDIO 0,9% (SORO FISIOLÓGICO)",
      "01 BOLSA 1000 ML",
      "MANUTENÇÃO — 1ª FASE (APÓS MELHORA CLÍNICA E LABORATORIAL): INFUNDIR {DOSE} EV EM 6 HORAS (25 ML/KG)",
      "USO ENDOVENOSO",
      {
       "kg": 25,
       "un": "ML",
       "max": 2000
      }
     ],
     [
      "CLORETO DE SÓDIO 0,9% (SORO FISIOLÓGICO)",
      "01 BOLSA 1000 ML",
      "MANUTENÇÃO — 2ª FASE (SE MANTIVER MELHORA): INFUNDIR {DOSE} EV EM 8 HORAS (25 ML/KG)",
      "USO ENDOVENOSO",
      {
       "kg": 25,
       "un": "ML",
       "max": 2000
      }
     ],
     [
      "DIPIRONA 500 MG/ML SOLUÇÃO INJETÁVEL",
      "01 AMPOLA 2 ML",
      "ADMINISTRAR 1 G (2 ML) EV, DILUÍDO EM 10 ML DE ÁGUA PARA INJETÁVEIS, LENTAMENTE (NO MÁXIMO 1 ML/MIN), ATÉ DE 6/6H SE DOR OU FEBRE",
      "USO ENDOVENOSO"
     ],
     [
      "METOCLOPRAMIDA 5 MG/ML SOLUÇÃO INJETÁVEL",
      "01 AMPOLA 2 ML",
      "ADMINISTRAR 10 MG (2 ML) EV, DILUÍDO EM 10 ML DE SF 0,9%, LENTAMENTE (EM PELO MENOS 3 MINUTOS), ATÉ DE 8/8H SE NÁUSEAS OU VÔMITOS",
      "USO ENDOVENOSO"
     ]
    ],
    "orient": [
     "INTERNAR POR NO MÍNIMO 48 HORAS. REAVALIAR APÓS CADA HORA DE EXPANSÃO (PA, FC, PERFUSÃO E DIURESE — DESEJÁVEL 1 ML/KG/H) E HEMATÓCRITO 2 HORAS APÓS CADA ETAPA; SEM MELHORA APÓS 3 FASES, CONDUZIR COMO GRUPO D",
     "EXAMES OBRIGATÓRIOS: HEMOGRAMA, ALBUMINA E TRANSAMINASES; RX DE TÓRAX (PA, PERFIL E LAURELL) E USG DE ABDOME; GLICEMIA, UREIA, CREATININA E ELETRÓLITOS CONFORME O CASO. NOTIFICAR E COLHER NS1/RT-PCR OU SOROLOGIA",
     "IDOSOS, CARDIOPATAS E RENAIS TÊM MAIOR RISCO DE SOBRECARGA: AUSCULTA PULMONAR A CADA ETAPA E REDUZIR A INFUSÃO SE CREPITAÇÕES, DISPNEIA OU EDEMA",
     "NÃO USAR AAS, ANTI-INFLAMATÓRIOS, CORTICOIDES NEM MEDICAÇÕES INTRAMUSCULARES",
     "ALTA SOMENTE COM ESTABILIDADE HEMODINÂMICA POR 48 HORAS, SEM FEBRE HÁ 24 HORAS, MELHORA CLÍNICA, HEMATÓCRITO NORMAL E ESTÁVEL HÁ 24 HORAS E PLAQUETAS EM ELEVAÇÃO"
    ]
   },
   {
    "label": "Padrão — Grupo D (choque): expansão rápida",
    "mode": "internacao",
    "draft": true,
    "items": [
     [
      "CLORETO DE SÓDIO 0,9% (SORO FISIOLÓGICO)",
      "01 BOLSA 1000 ML",
      "INFUNDIR {DOSE} EV EM ATÉ 20 MINUTOS (20 ML/KG), EM ACESSO CALIBROSO; REPETIR ATÉ 3 VEZES CONFORME REAVALIAÇÃO. COM MELHORA, RETORNAR À FASE DE EXPANSÃO DO GRUPO C",
      "USO ENDOVENOSO",
      {
       "kg": 20,
       "un": "ML",
       "max": 1600
      }
     ]
    ],
    "orient": [
     "LEITO DE UTI ATÉ ESTABILIZAÇÃO (MÍNIMO 48 HORAS); MONITORIZAÇÃO CONTÍNUA, REAVALIAÇÃO CLÍNICA A CADA 15-30 MIN E HEMATÓCRITO A CADA 2 HORAS",
     "CHOQUE PERSISTENTE COM HEMATÓCRITO EM QUEDA: INVESTIGAR SANGRAMENTO E COAGULOPATIA — CONCENTRADO DE HEMÁCIAS 10-15 ML/KG, PLASMA FRESCO 10 ML/KG, VITAMINA K EV E CRIOPRECIPITADO CONFORME O CASO",
     "PLAQUETAS SOMENTE SE SANGRAMENTO PERSISTENTE APÓS CORREÇÃO DA COAGULAÇÃO E DO CHOQUE, COM TROMBOCITOPENIA E INR > 1,5",
     "FASE DE REABSORÇÃO (HEMATÓCRITO EM QUEDA SEM SANGRAMENTO, DESCONFORTO RESPIRATÓRIO OU CONGESTÃO): REDUZIR OU SUSPENDER A INFUSÃO E CONSIDERAR DIURÉTICO E INOTRÓPICO"
    ]
   },
   {
    "label": "Grupo D com choque persistente e hematócrito em ascensão (albumina)",
    "mode": "internacao",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "ALBUMINA HUMANA 20% SOLUÇÃO INJETÁVEL (FRASCO 50 ML)",
      "FRASCOS CONFORME DOSE",
      "ADMINISTRAR {DOSE} DE ALBUMINA 20% (0,5 G/KG; ATÉ 1 G/KG), DILUINDO CADA 25 ML EM 75 ML DE SF 0,9% (SOLUÇÃO A 5%) E INFUNDINDO A SOLUÇÃO DILUÍDA A 10 ML/KG/H",
      "USO ENDOVENOSO",
      {
       "kg": 500,
       "conc": 200,
       "un": "ML",
       "max": 40000
      }
     ]
    ],
    "orient": [
     "INDICADA APÓS 3 EXPANSÕES ADEQUADAS SEM SAÍDA DO CHOQUE E COM HEMATÓCRITO SUBINDO; NA FALTA DE ALBUMINA, COLOIDE SINTÉTICO 10 ML/KG/H",
     "PERSISTINDO O CHOQUE: AMINA VASOATIVA/INOTRÓPICO EM UTI (DOPAMINA, DOBUTAMINA OU MILRINONA SE DISFUNÇÃO MIOCÁRDICA)"
    ]
   },
   {
    "label": "Alergia à dipirona (paracetamol)",
    "mode": "internacao",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "PARACETAMOL 500 MG",
      "02 COMPRIMIDOS",
      "TOMAR 01 A 02 COMPRIMIDOS (500 MG A 1 G) VIA ORAL ATÉ DE 6/6H SE DOR OU FEBRE (MÁXIMO 4 G/DIA; REDUZIR SE TRANSAMINASES MUITO ELEVADAS)",
      "USO ORAL"
     ]
    ]
   },
   {
    "label": "Padrão — Hidratação oral (grupos A e B)",
    "mode": "ped",
    "draft": true,
    "items": [
     [
      "SORO DE REIDRATAÇÃO ORAL",
      "01 CAIXA",
      "DILUIR 01 SACHÊ EM 1 LITRO DE ÁGUA FILTRADA OU FERVIDA. VOLUME TOTAL DE LÍQUIDOS POR DIA: {FAIXA}",
      "USO ORAL",
      {
       "sem_peso": "ATÉ 10 KG 130 ML/KG; DE 10 A 20 KG 100 ML/KG; ACIMA DE 20 KG 80 ML/KG — 1/3 EM SORO DE REIDRATAÇÃO ORAL E O RESTANTE EM ÁGUA, SUCOS, CHÁS E LEITE (MANTER O ALEITAMENTO). NAS PRIMEIRAS 4 A 6 HORAS, OFERECER 1/3 DESSE VOLUME",
       "faixas": [
        {
         "ate": 10,
         "txt": "{=P*130} ML (130 ML/KG) — {=P*130/3} ML EM SORO DE REIDRATAÇÃO ORAL E {=P*130*2/3} ML EM ÁGUA, SUCOS, CHÁS E LEITE (MANTER O ALEITAMENTO). NAS PRIMEIRAS 4 A 6 HORAS, OFERECER {=P*130/3} ML"
        },
        {
         "acima": 10,
         "ate": 20,
         "txt": "{=P*100} ML (100 ML/KG) — {=P*100/3} ML EM SORO DE REIDRATAÇÃO ORAL E {=P*100*2/3} ML EM ÁGUA, SUCOS, CHÁS E LEITE (MANTER O ALEITAMENTO). NAS PRIMEIRAS 4 A 6 HORAS, OFERECER {=P*100/3} ML"
        },
        {
         "acima": 20,
         "txt": "{=P*80} ML (80 ML/KG) — {=P*80/3} ML EM SORO DE REIDRATAÇÃO ORAL E {=P*80*2/3} ML EM ÁGUA, SUCOS, CHÁS E LEITE (MANTER O ALEITAMENTO). NAS PRIMEIRAS 4 A 6 HORAS, OFERECER {=P*80/3} ML"
        }
       ]
      }
     ]
    ],
    "orient": [
     "NÃO USAR AAS, IBUPROFENO, DICLOFENACO, NIMESULIDA OU OUTRO ANTI-INFLAMATÓRIO, CORTICOIDE OU MEDICAÇÃO INTRAMUSCULAR",
     "GRUPO A: REAVALIAR NO DIA EM QUE A FEBRE PASSAR OU NO 5º DIA DE DOENÇA. GRUPO B: HEMOGRAMA E REAVALIAÇÃO DIÁRIOS ATÉ 48 HORAS APÓS O FIM DA FEBRE",
     "RETORNAR IMEDIATAMENTE SE: DOR ABDOMINAL INTENSA, VÔMITOS PERSISTENTES, SANGRAMENTOS, RECUSA DE LÍQUIDOS, POUCA URINA, SONOLÊNCIA OU IRRITABILIDADE, EXTREMIDADES FRIAS, DESMAIO OU PIORA QUANDO A FEBRE BAIXA",
     "REPOUSO, USO DE REPELENTE E ELIMINAÇÃO DE CRIADOUROS; ANOTAR O VOLUME INGERIDO NO CARTÃO DE ACOMPANHAMENTO DA DENGUE"
    ]
   },
   {
    "label": "Padrão — Antitérmico pelo peso (sem AINE na dengue) — escolha 1",
    "mode": "ped",
    "draft": true,
    "menu": true,
    "items": [
     [
      "DIPIRONA 500 MG/ML SOLUÇÃO ORAL (GOTAS)",
      "01 FRASCO",
      "DAR {DOSE} VIA ORAL ATÉ DE 6/6H SE DOR OU FEBRE (10 MG/KG/DOSE — MS 2024). ACIMA DE 3 MESES OU 5 KG",
      "USO ORAL",
      {
       "kg": 10,
       "conc": 500,
       "gotas": 20,
       "un": "GOTAS",
       "max": 1000
      }
     ],
     [
      "PARACETAMOL 200 MG/ML SOLUÇÃO ORAL (GOTAS)",
      "01 FRASCO",
      "DAR {DOSE} VIA ORAL ATÉ DE 6/6H SE DOR OU FEBRE (10 MG/KG/DOSE — MS 2024; NÃO PASSAR DESSA DOSE: DOSES ELEVADAS SÃO HEPATOTÓXICAS). CALCULADO PARA 15 GOTAS/ML — CONFERIR O GOTEJADOR DO FRASCO (HÁ FRASCOS COM 20 GOTAS/ML)",
      "USO ORAL",
      {
       "kg": 10,
       "conc": 200,
       "gotas": 15,
       "un": "GOTAS",
       "max": 750
      }
     ]
    ]
   },
   {
    "label": "Combinação pronta — grupos A e B: hidratação oral + antitérmico",
    "mode": "ped",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "SORO DE REIDRATAÇÃO ORAL",
      "01 CAIXA",
      "DILUIR 01 SACHÊ EM 1 LITRO DE ÁGUA FILTRADA OU FERVIDA. VOLUME TOTAL DE LÍQUIDOS POR DIA: {FAIXA}",
      "USO ORAL",
      {
       "sem_peso": "ATÉ 10 KG 130 ML/KG; DE 10 A 20 KG 100 ML/KG; ACIMA DE 20 KG 80 ML/KG — 1/3 EM SORO DE REIDRATAÇÃO ORAL E O RESTANTE EM ÁGUA, SUCOS, CHÁS E LEITE (MANTER O ALEITAMENTO). NAS PRIMEIRAS 4 A 6 HORAS, OFERECER 1/3 DESSE VOLUME",
       "faixas": [
        {
         "ate": 10,
         "txt": "{=P*130} ML (130 ML/KG) — {=P*130/3} ML EM SORO DE REIDRATAÇÃO ORAL E {=P*130*2/3} ML EM ÁGUA, SUCOS, CHÁS E LEITE (MANTER O ALEITAMENTO). NAS PRIMEIRAS 4 A 6 HORAS, OFERECER {=P*130/3} ML"
        },
        {
         "acima": 10,
         "ate": 20,
         "txt": "{=P*100} ML (100 ML/KG) — {=P*100/3} ML EM SORO DE REIDRATAÇÃO ORAL E {=P*100*2/3} ML EM ÁGUA, SUCOS, CHÁS E LEITE (MANTER O ALEITAMENTO). NAS PRIMEIRAS 4 A 6 HORAS, OFERECER {=P*100/3} ML"
        },
        {
         "acima": 20,
         "txt": "{=P*80} ML (80 ML/KG) — {=P*80/3} ML EM SORO DE REIDRATAÇÃO ORAL E {=P*80*2/3} ML EM ÁGUA, SUCOS, CHÁS E LEITE (MANTER O ALEITAMENTO). NAS PRIMEIRAS 4 A 6 HORAS, OFERECER {=P*80/3} ML"
        }
       ]
      }
     ],
     [
      "DIPIRONA 500 MG/ML SOLUÇÃO ORAL (GOTAS)",
      "01 FRASCO",
      "DAR {DOSE} VIA ORAL ATÉ DE 6/6H SE DOR OU FEBRE (10 MG/KG/DOSE — MS 2024). ACIMA DE 3 MESES OU 5 KG",
      "USO ORAL",
      {
       "kg": 10,
       "conc": 500,
       "gotas": 20,
       "un": "GOTAS",
       "max": 1000
      }
     ]
    ]
   },
   {
    "label": "Antitérmico alternativo (alergia à dipirona)",
    "mode": "ped",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "PARACETAMOL 200 MG/ML SOLUÇÃO ORAL (GOTAS)",
      "01 FRASCO",
      "DAR {DOSE} VIA ORAL ATÉ DE 6/6H SE DOR OU FEBRE (10 MG/KG/DOSE — MS 2024; NÃO PASSAR DESSA DOSE: DOSES ELEVADAS SÃO HEPATOTÓXICAS). CALCULADO PARA 15 GOTAS/ML — CONFERIR O GOTEJADOR DO FRASCO (HÁ FRASCOS COM 20 GOTAS/ML)",
      "USO ORAL",
      {
       "kg": 10,
       "conc": 200,
       "gotas": 15,
       "un": "GOTAS",
       "max": 750
      }
     ]
    ],
    "orient": [
     "CONFERIR NA BULA DO FRASCO O NÚMERO DE GOTAS POR ML (PARACETAMOL 200 MG/ML ≈ 15 GOTAS/ML)"
    ]
   },
   {
    "label": "Padrão — Grupo C (sinais de alarme): expansão e manutenção EV",
    "mode": "ped_internacao",
    "draft": true,
    "items": [
     [
      "CLORETO DE SÓDIO 0,9% (SORO FISIOLÓGICO)",
      "01 BOLSA 500 ML",
      "FASE DE EXPANSÃO: INFUNDIR {DOSE} EV NA 1ª HORA (10 ML/KG/H) E REPETIR O MESMO VOLUME NA 2ª HORA ATÉ O RESULTADO DO HEMATÓCRITO (MÁXIMO 20 ML/KG EM 2 HORAS). SEM MELHORA, REPETIR A FASE ATÉ 3 VEZES",
      "USO ENDOVENOSO",
      {
       "kg": 10,
       "un": "ML",
       "max": 500
      }
     ],
     [
      "CLORETO DE SÓDIO 0,9% (SORO FISIOLÓGICO)",
      "01 BOLSA 500 ML",
      "MANUTENÇÃO — 1ª FASE (APÓS MELHORA CLÍNICA E LABORATORIAL): INFUNDIR {DOSE} EV EM 6 HORAS (25 ML/KG)",
      "USO ENDOVENOSO",
      {
       "kg": 25,
       "un": "ML",
       "max": 1250
      }
     ],
     [
      "CLORETO DE SÓDIO 0,9% (SORO FISIOLÓGICO)",
      "01 BOLSA 500 ML",
      "MANUTENÇÃO — 2ª FASE (SE MANTIVER MELHORA): INFUNDIR {DOSE} EV EM 8 HORAS (25 ML/KG)",
      "USO ENDOVENOSO",
      {
       "kg": 25,
       "un": "ML",
       "max": 1250
      }
     ],
     [
      "DIPIRONA 500 MG/ML SOLUÇÃO INJETÁVEL",
      "01 AMPOLA 2 ML",
      "ADMINISTRAR {DOSE} EV, DILUÍDO EM 10 ML DE SF 0,9%, LENTAMENTE, ATÉ DE 6/6H SE DOR OU FEBRE (10 MG/KG/DOSE). ACIMA DE 1 ANO; MENORES DE 1 ANO, PREFERIR VIA ORAL",
      "USO ENDOVENOSO",
      {
       "kg": 10,
       "un": "MG",
       "max": 1000
      }
     ],
     [
      "ONDANSETRONA 2 MG/ML SOLUÇÃO INJETÁVEL",
      "01 AMPOLA 2 ML",
      "ADMINISTRAR {DOSE} EV LENTO (EM 5 MINUTOS) SE NÁUSEAS OU VÔMITOS, ATÉ DE 8/8H (0,15 MG/KG/DOSE). ACIMA DE 6 MESES",
      "USO ENDOVENOSO",
      {
       "kg": 0.15,
       "un": "MG",
       "max": 4
      }
     ]
    ],
    "orient": [
     "INTERNAR POR NO MÍNIMO 48 HORAS E PESAR NA ADMISSÃO; REAVALIAR APÓS CADA HORA (FC, PA PARA A IDADE, PERFUSÃO, DIURESE — DESEJÁVEL 1 ML/KG/H) E HEMATÓCRITO 2 HORAS APÓS CADA ETAPA",
     "SEM MELHORA APÓS 3 FASES DE EXPANSÃO OU SURGINDO SINAIS DE CHOQUE: CONDUZIR COMO GRUPO D",
     "EXAMES OBRIGATÓRIOS: HEMOGRAMA, ALBUMINA E TRANSAMINASES; RX DE TÓRAX E USG DE ABDOME PARA DERRAMES; GLICEMIA E ELETRÓLITOS CONFORME O CASO",
     "NÃO USAR AAS, ANTI-INFLAMATÓRIOS, CORTICOIDES OU MEDICAÇÃO IM; VIGIAR SOBRECARGA HÍDRICA (DESCONFORTO RESPIRATÓRIO, HEPATOMEGALIA, EDEMA) NA FASE DE REABSORÇÃO"
    ]
   },
   {
    "label": "Padrão — Grupo D (choque): expansão rápida",
    "mode": "ped_internacao",
    "draft": true,
    "items": [
     [
      "CLORETO DE SÓDIO 0,9% (SORO FISIOLÓGICO)",
      "01 BOLSA 500 ML",
      "INFUNDIR {DOSE} EV EM ATÉ 20 MINUTOS (20 ML/KG); REPETIR ATÉ 3 VEZES CONFORME REAVALIAÇÃO. COM MELHORA, RETORNAR À FASE DE EXPANSÃO DO GRUPO C",
      "USO ENDOVENOSO",
      {
       "kg": 20,
       "un": "ML",
       "max": 1000
      }
     ]
    ],
    "orient": [
     "LEITO DE UTI ATÉ ESTABILIZAÇÃO (MÍNIMO 48 HORAS); REAVALIAÇÃO CLÍNICA A CADA 15-30 MIN E HEMATÓCRITO A CADA 2 HORAS; VIA INTRAÓSSEA SE NÃO HOUVER ACESSO VENOSO RÁPIDO",
     "CHOQUE PERSISTENTE COM HEMATÓCRITO EM QUEDA: INVESTIGAR SANGRAMENTO — CONCENTRADO DE HEMÁCIAS 10-15 ML/KG, PLASMA FRESCO 10 ML/KG E VITAMINA K CONFORME COAGULOGRAMA",
     "FASE DE REABSORÇÃO COM DESCONFORTO RESPIRATÓRIO: REDUZIR OU SUSPENDER A INFUSÃO E CONSIDERAR DIURÉTICO"
    ]
   },
   {
    "label": "Grupo D com choque persistente e hematócrito em ascensão (albumina)",
    "mode": "ped_internacao",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "ALBUMINA HUMANA 20% SOLUÇÃO INJETÁVEL (FRASCO 50 ML)",
      "FRASCOS CONFORME DOSE",
      "ADMINISTRAR {DOSE} DE ALBUMINA 20% (0,5 G/KG; ATÉ 1 G/KG), DILUINDO CADA 25 ML EM 75 ML DE SF 0,9% (SOLUÇÃO A 5%) E INFUNDINDO A SOLUÇÃO DILUÍDA A 10 ML/KG/H",
      "USO ENDOVENOSO",
      {
       "kg": 500,
       "conc": 200,
       "un": "ML",
       "max": 25000
      }
     ]
    ],
    "orient": [
     "INDICADA APÓS 3 EXPANSÕES ADEQUADAS SEM SAÍDA DO CHOQUE E COM HEMATÓCRITO SUBINDO; NA FALTA DE ALBUMINA, COLOIDE SINTÉTICO 10 ML/KG/H"
    ]
   },
   {
    "label": "Do material do Drive — Prurido: loratadina",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "LORATADINA 10 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO 01 VEZ AO DIA SE COCEIRA",
      "USO ORAL"
     ]
    ]
   },
   {
    "label": "Do material do Drive — Antiemético (≥ 2 anos): dimenidrinato + piridoxina gotas",
    "mode": "ped",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "DIMENIDRINATO 25 MG/ML + PIRIDOXINA 5 MG/ML SOLUÇÃO ORAL (GOTAS)",
      "01 FRASCO",
      "DAR 01 GOTA POR KG DE PESO (1,25 MG/KG/DOSE) VIA ORAL DE 6/6H A 8/8H SE NÁUSEAS OU VÔMITOS. 2 A 6 ANOS: NO MÁXIMO 60 GOTAS POR DIA; 6 A 12 ANOS: NO MÁXIMO 120 GOTAS POR DIA. NÃO USAR EM MENORES DE 2 ANOS",
      "USO ORAL"
     ]
    ]
   },
   {
    "label": "Do material do Drive — Dipirona solução oral 50 mg/mL",
    "mode": "ped",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "DIPIRONA 50 MG/ML SOLUÇÃO ORAL",
      "01 FRASCO",
      "DAR 0,2 ML POR KG (10 MG/KG/DOSE) VIA ORAL ATÉ DE 6/6H SE DOR OU FEBRE. NÃO USAR EM MENORES DE 3 MESES OU COM MENOS DE 5 KG",
      "USO ORAL"
     ]
    ]
   }
  ]
 },
 {
  "id": "diarreia",
  "ic": "💩",
  "nm": "Diarreia aguda",
  "sub": "soro de reidratação oral · ondansetrona · azitromicina · ciprofloxacino",
  "blocks": [
   {
    "label": "Padrão — Reidratação oral",
    "draft": true,
    "items": [
     [
      "SORO DE REIDRATAÇÃO ORAL",
      "01 CAIXA",
      "DILUIR 01 SACHÊ EM 1 LITRO DE ÁGUA FILTRADA OU FERVIDA E GUARDAR NA GELADEIRA. TOMAR 01 COPO APÓS CADA EVACUAÇÃO DIARREICA"
     ]
    ],
    "orient": [
     "MANTER A ALIMENTAÇÃO HABITUAL EM PEQUENAS PORÇÕES E AUMENTAR A INGESTÃO DE LÍQUIDOS; EVITAR REFRIGERANTES, SUCOS ADOÇADOS E BEBIDAS ALCOÓLICAS",
     "NÃO USAR ANTIDIARREICOS (REMÉDIOS PARA PRENDER O INTESTINO, COMO A LOPERAMIDA): NÃO ENCURTAM A DIARREIA E PODEM PIORAR UMA INFECÇÃO",
     "LAVAR AS MÃOS APÓS USAR O BANHEIRO E ANTES DE PREPARAR OU INGERIR ALIMENTOS",
     "RETORNAR IMEDIATAMENTE SE: SINAIS DE DESIDRATAÇÃO (MUITA SEDE, BOCA SECA, POUCA URINA, TONTURA AO LEVANTAR), VÔMITOS QUE IMPEDEM A HIDRATAÇÃO, SANGUE NAS FEZES, FEBRE PERSISTENTE, DOR ABDOMINAL INTENSA OU DIARREIA POR MAIS DE 07 DIAS"
    ]
   },
   {
    "label": "Padrão — Antiemético somente se vômitos persistentes: ondansetrona",
    "draft": true,
    "items": [
     [
      "ONDANSETRONA 8 MG",
      "01 CAIXA",
      "SE VÔMITOS PERSISTENTES QUE IMPEDEM TOMAR O SORO: TOMAR 01 COMPRIMIDO, PODENDO REPETIR DE 8/8H. NÃO USAR EM GESTANTES"
     ]
    ]
   },
   {
    "label": "Padrão — disenteria (sangue nas fezes) com comprometimento do estado geral ou febre alta persistente: antibiótico — escolha 1",
    "draft": true,
    "menu": true,
    "items": [
     [
      "AZITROMICINA 500 MG",
      "03 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO AO DIA POR 03 DIAS HORÁRIO SUGERIDO: 08:00"
     ],
     [
      "CIPROFLOXACINO 500 MG",
      "06 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO DE 12/12H POR 03 DIAS"
     ]
    ],
    "orient": [
     "EM TRATAMENTO DE DISENTERIA: RETORNAR PARA REAVALIAÇÃO EM 02 DIAS (48 HORAS) DO INÍCIO DO ANTIBIÓTICO, OU ANTES SE PIORAR"
    ]
   },
   {
    "label": "Combinação pronta — reidratação oral + sintomáticos",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "SORO DE REIDRATAÇÃO ORAL",
      "01 CAIXA",
      "DILUIR 01 SACHÊ EM 1 LITRO DE ÁGUA FILTRADA OU FERVIDA E GUARDAR NA GELADEIRA. TOMAR 01 COPO APÓS CADA EVACUAÇÃO DIARREICA"
     ],
     [
      "ONDANSETRONA 8 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO SE NÁUSEAS OU VÔMITOS, PODENDO REPETIR DE 8/8H"
     ],
     [
      "DIPIRONA 500 MG",
      "01 CAIXA",
      "TOMAR 02 COMPRIMIDOS SE DOR OU FEBRE, PODENDO REPETIR DE 6/6H"
     ]
    ]
   },
   {
    "label": "Opção 3 — sintomáticos (diarreia aquosa com cólica): probiótico + escopolamina + antiemético + SRO",
    "sec": "offlabel",
    "items": [
     [
      "SACCHAROMYCES BOULARDII 200 MG",
      "10 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO DE 12/12H POR 05 DIAS HORÁRIO SUGERIDO: 08:00 / 20:00"
     ],
     [
      "BUTILBROMETO DE ESCOPOLAMINA 10 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO SE DOR ABDOMINAL, PODENDO REPETIR DE 8/8H"
     ],
     [
      "METOCLOPRAMIDA 10 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO SE NÁUSEAS OU VÔMITOS, PODENDO REPETIR DE 8/8H"
     ],
     [
      "SORO DE REIDRATAÇÃO ORAL",
      "01 CAIXA",
      "DILUIR 01 SACHÊ EM 1 LITRO DE ÁGUA FILTRADA OU FERVIDA E GUARDAR NA GELADEIRA. TOMAR 01 COPO 10 A 15 VEZES AO LONGO DO DIA"
     ]
    ]
   },
   {
    "label": "Opção 4 — sintomáticos (diarreia aquosa com dor ou febre): probiótico + dipirona + antiemético + SRO",
    "sec": "offlabel",
    "items": [
     [
      "SACCHAROMYCES BOULARDII 200 MG",
      "10 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO DE 12/12H POR 05 DIAS HORÁRIO SUGERIDO: 08:00 / 20:00"
     ],
     [
      "DIPIRONA 500 MG",
      "01 CAIXA",
      "TOMAR 02 COMPRIMIDOS SE DOR OU FEBRE, PODENDO REPETIR DE 6/6H"
     ],
     [
      "METOCLOPRAMIDA 10 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO SE NÁUSEAS OU VÔMITOS, PODENDO REPETIR DE 8/8H"
     ],
     [
      "SORO DE REIDRATAÇÃO ORAL",
      "01 CAIXA",
      "DILUIR 01 SACHÊ EM 1 LITRO DE ÁGUA FILTRADA OU FERVIDA E GUARDAR NA GELADEIRA. TOMAR 01 COPO 10 A 15 VEZES AO LONGO DO DIA"
     ]
    ]
   },
   {
    "label": "Opção 5 — sintomáticos (cólica): probiótico + escopolamina com dipirona + antiemético + SRO",
    "sec": "offlabel",
    "items": [
     [
      "SACCHAROMYCES BOULARDII 200 MG",
      "10 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO DE 12/12H POR 05 DIAS HORÁRIO SUGERIDO: 08:00 / 20:00"
     ],
     [
      "BUTILBROMETO DE ESCOPOLAMINA 10 MG + DIPIRONA 250 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO SE DOR ABDOMINAL, PODENDO REPETIR DE 8/8H. JÁ CONTÉM DIPIRONA — NÃO ASSOCIAR COM DIPIRONA"
     ],
     [
      "METOCLOPRAMIDA 10 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO SE NÁUSEAS OU VÔMITOS, PODENDO REPETIR DE 8/8H"
     ],
     [
      "SORO DE REIDRATAÇÃO ORAL",
      "01 CAIXA",
      "DILUIR 01 SACHÊ EM 1 LITRO DE ÁGUA FILTRADA OU FERVIDA E GUARDAR NA GELADEIRA. TOMAR 01 COPO 10 A 15 VEZES AO LONGO DO DIA"
     ]
    ]
   },
   {
    "label": "Opção 6 — sintomáticos (cólica, alergia à dipirona): probiótico + escopolamina com paracetamol + antiemético + SRO",
    "sec": "offlabel",
    "items": [
     [
      "SACCHAROMYCES BOULARDII 200 MG",
      "10 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO DE 12/12H POR 05 DIAS HORÁRIO SUGERIDO: 08:00 / 20:00"
     ],
     [
      "BUTILBROMETO DE ESCOPOLAMINA 10 MG + PARACETAMOL 500 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO SE DOR ABDOMINAL, PODENDO REPETIR DE 8/8H. JÁ CONTÉM PARACETAMOL — NÃO ASSOCIAR COM PARACETAMOL"
     ],
     [
      "METOCLOPRAMIDA 10 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO SE NÁUSEAS OU VÔMITOS, PODENDO REPETIR DE 8/8H"
     ],
     [
      "SORO DE REIDRATAÇÃO ORAL",
      "01 CAIXA",
      "DILUIR 01 SACHÊ EM 1 LITRO DE ÁGUA FILTRADA OU FERVIDA E GUARDAR NA GELADEIRA. TOMAR 01 COPO 10 A 15 VEZES AO LONGO DO DIA"
     ]
    ]
   },
   {
    "label": "Opção 7 — sintomáticos (dor, cólica e náuseas): probiótico + dipirona + escopolamina + antiemético + SRO",
    "sec": "offlabel",
    "items": [
     [
      "SACCHAROMYCES BOULARDII 200 MG",
      "10 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO DE 12/12H POR 05 DIAS HORÁRIO SUGERIDO: 08:00 / 20:00"
     ],
     [
      "DIPIRONA 500 MG",
      "01 CAIXA",
      "TOMAR 02 COMPRIMIDOS SE DOR OU FEBRE, PODENDO REPETIR DE 6/6H"
     ],
     [
      "BUTILBROMETO DE ESCOPOLAMINA 10 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO SE DOR ABDOMINAL, PODENDO REPETIR DE 8/8H"
     ],
     [
      "METOCLOPRAMIDA 10 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO SE NÁUSEAS OU VÔMITOS, PODENDO REPETIR DE 8/8H"
     ],
     [
      "SORO DE REIDRATAÇÃO ORAL",
      "01 CAIXA",
      "DILUIR 01 SACHÊ EM 1 LITRO DE ÁGUA FILTRADA OU FERVIDA E GUARDAR NA GELADEIRA. TOMAR 01 COPO 10 A 15 VEZES AO LONGO DO DIA"
     ]
    ]
   },
   {
    "label": "Opção 8 — disenteria com comprometimento do estado geral: ciprofloxacino 03 dias + sintomáticos",
    "sec": "offlabel",
    "items": [
     [
      "CIPROFLOXACINO 500 MG",
      "06 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO DE 12/12H POR 03 DIAS HORÁRIO SUGERIDO: 08:00 / 20:00"
     ],
     [
      "SACCHAROMYCES BOULARDII 200 MG",
      "10 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO DE 12/12H POR 05 DIAS HORÁRIO SUGERIDO: 08:00 / 20:00"
     ],
     [
      "DIPIRONA 500 MG",
      "01 CAIXA",
      "TOMAR 02 COMPRIMIDOS SE DOR OU FEBRE, PODENDO REPETIR DE 6/6H"
     ],
     [
      "BUTILBROMETO DE ESCOPOLAMINA 10 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO SE DOR ABDOMINAL, PODENDO REPETIR DE 8/8H"
     ],
     [
      "METOCLOPRAMIDA 10 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO SE NÁUSEAS OU VÔMITOS, PODENDO REPETIR DE 8/8H"
     ],
     [
      "SORO DE REIDRATAÇÃO ORAL",
      "01 CAIXA",
      "DILUIR 01 SACHÊ EM 1 LITRO DE ÁGUA FILTRADA OU FERVIDA E GUARDAR NA GELADEIRA. TOMAR 01 COPO 10 A 15 VEZES AO LONGO DO DIA"
     ]
    ]
   },
   {
    "label": "Opção 9 — disenteria com comprometimento do estado geral: azitromicina 03 dias + sintomáticos",
    "sec": "offlabel",
    "items": [
     [
      "AZITROMICINA 500 MG",
      "03 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO AO DIA POR 03 DIAS HORÁRIO SUGERIDO: 08:00"
     ],
     [
      "SACCHAROMYCES BOULARDII 200 MG",
      "10 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO DE 12/12H POR 05 DIAS HORÁRIO SUGERIDO: 08:00 / 20:00"
     ],
     [
      "DIPIRONA 500 MG",
      "01 CAIXA",
      "TOMAR 02 COMPRIMIDOS SE DOR OU FEBRE, PODENDO REPETIR DE 6/6H"
     ],
     [
      "BUTILBROMETO DE ESCOPOLAMINA 10 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO SE DOR ABDOMINAL, PODENDO REPETIR DE 8/8H"
     ],
     [
      "METOCLOPRAMIDA 10 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO SE NÁUSEAS OU VÔMITOS, PODENDO REPETIR DE 8/8H"
     ],
     [
      "SORO DE REIDRATAÇÃO ORAL",
      "01 CAIXA",
      "DILUIR 01 SACHÊ EM 1 LITRO DE ÁGUA FILTRADA OU FERVIDA E GUARDAR NA GELADEIRA. TOMAR 01 COPO 10 A 15 VEZES AO LONGO DO DIA"
     ]
    ]
   },
   {
    "label": "Opção 10 — amebíase intestinal (trofozoítos de E. histolytica com hemácias ou falha do tratamento da shigelose): metronidazol 10 dias",
    "sec": "offlabel",
    "items": [
     [
      "METRONIDAZOL 250 MG",
      "60 COMPRIMIDOS",
      "TOMAR 02 COMPRIMIDOS DE 8/8H POR 10 DIAS HORÁRIO SUGERIDO: 06:00 / 14:00 / 22:00"
     ],
     [
      "SACCHAROMYCES BOULARDII 200 MG",
      "10 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO DE 12/12H POR 05 DIAS HORÁRIO SUGERIDO: 08:00 / 20:00"
     ],
     [
      "DIPIRONA 500 MG",
      "01 CAIXA",
      "TOMAR 02 COMPRIMIDOS SE DOR OU FEBRE, PODENDO REPETIR DE 6/6H"
     ],
     [
      "BUTILBROMETO DE ESCOPOLAMINA 10 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO SE DOR ABDOMINAL, PODENDO REPETIR DE 8/8H"
     ],
     [
      "METOCLOPRAMIDA 10 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO SE NÁUSEAS OU VÔMITOS, PODENDO REPETIR DE 8/8H"
     ],
     [
      "SORO DE REIDRATAÇÃO ORAL",
      "01 CAIXA",
      "DILUIR 01 SACHÊ EM 1 LITRO DE ÁGUA FILTRADA OU FERVIDA E GUARDAR NA GELADEIRA. TOMAR 01 COPO APÓS CADA EVACUAÇÃO DIARREICA"
     ]
    ]
   },
   {
    "label": "Opção 12 — giardíase ou amebíase intestinal confirmada no parasitológico: secnidazol dose única",
    "sec": "offlabel",
    "items": [
     [
      "SECNIDAZOL 01 G",
      "02 COMPRIMIDOS",
      "TOMAR 02 COMPRIMIDOS EM DOSE ÚNICA"
     ],
     [
      "SACCHAROMYCES BOULARDII 200 MG",
      "10 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO DE 12/12H POR 05 DIAS"
     ],
     [
      "DIPIRONA 500 MG",
      "01 CAIXA",
      "TOMAR 02 COMPRIMIDOS SE DOR OU FEBRE, PODENDO REPETIR DE 6/6H"
     ],
     [
      "BUTILBROMETO DE ESCOPOLAMINA 10 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO SE DOR ABDOMINAL, PODENDO REPETIR DE 8/8H"
     ],
     [
      "METOCLOPRAMIDA 10 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO SE NÁUSEAS OU VÔMITOS, PODENDO REPETIR DE 8/8H"
     ],
     [
      "SORO DE REIDRATAÇÃO ORAL",
      "01 CAIXA",
      "DILUIR 01 SACHÊ EM 1 LITRO DE ÁGUA FILTRADA OU FERVIDA E GUARDAR NA GELADEIRA. TOMAR 01 COPO APÓS CADA EVACUAÇÃO DIARREICA"
     ]
    ]
   },
   {
    "label": "Opção 13 — giardíase, amebíase intestinal ou criptosporidiose confirmada: nitazoxanida 03 dias",
    "sec": "offlabel",
    "items": [
     [
      "NITAZOXANIDA 500 MG",
      "06 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO DE 12/12 HORAS POR 03 DIAS SEGUIDOS HORÁRIO SUGERIDO (12/12H): 08:00 / 20:00"
     ],
     [
      "SACCHAROMYCES BOULARDII 200 MG",
      "10 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO DE 12/12H POR 05 DIAS"
     ],
     [
      "DIPIRONA 500 MG",
      "01 CAIXA",
      "TOMAR 02 COMPRIMIDOS SE DOR OU FEBRE, PODENDO REPETIR DE 6/6H"
     ],
     [
      "BUTILBROMETO DE ESCOPOLAMINA 10 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO SE DOR ABDOMINAL, PODENDO REPETIR DE 8/8H"
     ],
     [
      "METOCLOPRAMIDA 10 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO SE NÁUSEAS OU VÔMITOS, PODENDO REPETIR DE 8/8H"
     ],
     [
      "SORO DE REIDRATAÇÃO ORAL",
      "01 CAIXA",
      "DILUIR 01 SACHÊ EM 1 LITRO DE ÁGUA FILTRADA OU FERVIDA E GUARDAR NA GELADEIRA. TOMAR 01 COPO APÓS CADA EVACUAÇÃO DIARREICA"
     ]
    ]
   },
   {
    "label": "Opção 14 — helmintíase (verminose) associada: albendazol 03 dias + sintomáticos",
    "sec": "offlabel",
    "items": [
     [
      "ALBENDAZOL 400 MG",
      "03 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO AO DIA POR 03 DIAS SEGUIDOS, NO MESMO HORÁRIO"
     ],
     [
      "SACCHAROMYCES BOULARDII 200 MG",
      "10 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO DE 12/12H POR 05 DIAS"
     ],
     [
      "DIPIRONA 500 MG",
      "01 CAIXA",
      "TOMAR 02 COMPRIMIDOS SE DOR OU FEBRE, PODENDO REPETIR DE 6/6H"
     ],
     [
      "BUTILBROMETO DE ESCOPOLAMINA 10 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO SE DOR ABDOMINAL, PODENDO REPETIR DE 8/8H"
     ],
     [
      "METOCLOPRAMIDA 10 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO SE NÁUSEAS OU VÔMITOS, PODENDO REPETIR DE 8/8H"
     ]
    ]
   },
   {
    "label": "Analgésico/antitérmico — escolha 1",
    "sec": "offlabel",
    "menu": true,
    "items": [
     [
      "DIPIRONA 500 MG",
      "01 CAIXA",
      "TOMAR 02 COMPRIMIDOS SE DOR OU FEBRE, PODENDO REPETIR DE 6/6H"
     ],
     [
      "PARACETAMOL 750 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO SE DOR OU FEBRE, PODENDO REPETIR DE 6/6H. INTERCALAR COM DIPIRONA, SE NECESSÁRIO."
     ]
    ]
   },
   {
    "label": "Antiemético — escolha 1",
    "sec": "offlabel",
    "menu": true,
    "items": [
     [
      "METOCLOPRAMIDA 10 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO SE NÁUSEAS OU VÔMITOS, PODENDO REPETIR DE 8/8H"
     ],
     [
      "ONDANSETRONA 8 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO SE NÁUSEAS OU VÔMITOS, PODENDO REPETIR DE 8/8H"
     ]
    ]
   },
   {
    "label": "Padrão — Plano C (desidratação grave): fase rápida EV + sintomáticos",
    "mode": "internacao",
    "draft": true,
    "items": [
     [
      "CLORETO DE SÓDIO 0,9% (SORO FISIOLÓGICO)",
      "BOLSAS DE 500 ML CONFORME VOLUME",
      "1ª ETAPA: INFUNDIR {DOSE} EV EM 30 MINUTOS, EM ACESSO CALIBROSO (30 ML/KG)",
      "USO ENDOVENOSO",
      {
       "kg": 30,
       "un": "ML",
       "max": 2400
      }
     ],
     [
      "RINGER COM LACTATO",
      "BOLSAS DE 500 ML CONFORME VOLUME",
      "2ª ETAPA: INFUNDIR {DOSE} EV EM 2 HORAS E 30 MINUTOS (70 ML/KG), REAVALIANDO A CADA HORA",
      "USO ENDOVENOSO",
      {
       "kg": 70,
       "un": "ML",
       "max": 5600
      }
     ],
     [
      "ONDANSETRONA 2 MG/ML SOLUÇÃO INJETÁVEL",
      "01 AMPOLA 4 ML",
      "ADMINISTRAR 8 MG (4 ML) EV, DILUÍDO EM 50 ML DE SF 0,9%, EM 15 MINUTOS, ATÉ DE 8/8H SE NÁUSEAS OU VÔMITOS",
      "USO ENDOVENOSO"
     ],
     [
      "DIPIRONA 500 MG/ML SOLUÇÃO INJETÁVEL",
      "01 AMPOLA 2 ML",
      "ADMINISTRAR 1 G (2 ML) EV, DILUÍDO EM 10 ML DE ÁGUA PARA INJETÁVEIS, LENTAMENTE (NO MÁXIMO 1 ML/MIN), ATÉ DE 6/6H SE DOR OU FEBRE",
      "USO ENDOVENOSO"
     ],
     [
      "SORO DE REIDRATAÇÃO ORAL",
      "01 SACHÊ",
      "DILUIR 01 SACHÊ EM 1 LITRO DE ÁGUA. OFERECER EM PEQUENOS VOLUMES FREQUENTES ASSIM QUE TOLERAR VIA ORAL (EM GERAL 2 A 3 HORAS APÓS O INÍCIO DA HIDRATAÇÃO EV) E 01 COPO APÓS CADA EVACUAÇÃO DIARREICA"
     ]
    ],
    "orient": [
     "REAVALIAR A CADA 30-60 MIN (PA, FC, PERFUSÃO, NÍVEL DE CONSCIÊNCIA E DIURESE — META > 0,5 ML/KG/H); SE PERSISTIREM SINAIS DE CHOQUE APÓS 2 HORAS, REPETIR A FASE RÁPIDA",
     "IDOSOS, CARDIOPATAS OU DOENÇA RENAL CRÔNICA: EXPANDIR EM ALÍQUOTAS DE 250-500 ML COM AUSCULTA PULMONAR A CADA ETAPA (RISCO DE CONGESTÃO)",
     "COLHER NA, K, MG, UREIA, CREATININA, GLICEMIA E GASOMETRIA VENOSA; COPROCULTURA E HEMOCULTURAS SE DISENTERIA, FEBRE ALTA OU SEPSE",
     "SUSPENDER A HIDRATAÇÃO EV QUANDO HIDRATADO, ACEITANDO SRO E SEM VÔMITOS (OBSERVAR POR PELO MENOS 6 HORAS); NÃO USAR ANTIDIARREICOS (LOPERAMIDA)",
     "UTI SE CHOQUE REFRATÁRIO À EXPANSÃO, ACIDOSE METABÓLICA GRAVE, LESÃO RENAL AGUDA OLIGÚRICA OU DISTÚRBIO ELETROLÍTICO GRAVE"
    ]
   },
   {
    "label": "Padrão — Plano C: manutenção e reposição EV (após a fase rápida)",
    "mode": "internacao",
    "draft": true,
    "items": [
     [
      "SORO GLICOSADO 5% + CLORETO DE SÓDIO 0,9% (4:1) — MANUTENÇÃO",
      "2000 ML EM 24 HORAS",
      "{FAIXA} SOMENTE COM DIURESE PRESENTE",
      "USO ENDOVENOSO",
      {
       "sem_peso": "INFUNDIR 1600 ML DE SG 5% + 400 ML DE SF 0,9% EV EM 24 HORAS (83 ML/H) — ADULTO ≥ 45 KG (ABAIXO DE 45 KG: 1500 ML + 20 ML/KG ACIMA DE 20 KG). ACRESCENTAR KCL 10% 2 ML PARA CADA 100 ML (40 ML)",
       "faixas": [
        {
         "acima": 20,
         "menor": 45,
         "txt": "INFUNDIR {=0.8*(1500+20*(P-20))} ML DE SG 5% + {=0.2*(1500+20*(P-20))} ML DE SF 0,9% EV EM 24 HORAS (≈ {=(1500+20*(P-20))/24} ML/H) — ABAIXO DE 45 KG: 1500 ML + 20 ML/KG ACIMA DE 20 KG = {=1500+20*(P-20)} ML. ACRESCENTAR KCL 10% 2 ML PARA CADA 100 ML ({=(1500+20*(P-20))*2/100} ML)"
        },
        {
         "de": 45,
         "txt": "INFUNDIR 1600 ML DE SG 5% + 400 ML DE SF 0,9% EV EM 24 HORAS (83 ML/H). ACRESCENTAR KCL 10% 2 ML PARA CADA 100 ML (40 ML)"
        }
       ]
      }
     ],
     [
      "SORO GLICOSADO 5% + CLORETO DE SÓDIO 0,9% (1:1) — REPOSIÇÃO",
      "BOLSAS DE 500 ML CONFORME VOLUME",
      "INFUNDIR {DOSE} EV EM 24 HORAS (50 ML/KG/DIA), JUNTO COM A MANUTENÇÃO; REAVALIAR O VOLUME A CADA 6-8 HORAS CONFORME AS PERDAS (EVACUAÇÕES E VÔMITOS)",
      "USO ENDOVENOSO",
      {
       "kg": 50,
       "un": "ML",
       "max": 4000
      }
     ]
    ],
    "orient": [
     "REDUZIR A HIDRATAÇÃO EV PROGRESSIVAMENTE CONFORME A ACEITAÇÃO DE SRO E DIETA; CONTROLAR DIURESE, PESO E ELETRÓLITOS A CADA 24 HORAS"
    ]
   },
   {
    "label": "Padrão — disenteria grave, sepse ou toxemia (antibiótico EV) — escolha 1",
    "mode": "internacao",
    "draft": true,
    "menu": true,
    "items": [
     [
      "CEFTRIAXONA 1 G PÓ PARA SOLUÇÃO INJETÁVEL",
      "02 FRASCOS-AMPOLA",
      "ADMINISTRAR 2 G EV 01 VEZ AO DIA, DILUÍDO EM 100 ML DE SF 0,9%, EM 30 MINUTOS, POR 03 A 05 DIAS",
      "USO ENDOVENOSO"
     ],
     [
      "CIPROFLOXACINO 2 MG/ML SOLUÇÃO INJETÁVEL (BOLSA 200 ML)",
      "01 BOLSA 200 ML",
      "ADMINISTRAR 400 MG EV DE 12/12H, EM 60 MINUTOS, POR 03 DIAS; PASSAR PARA 500 MG VIA ORAL DE 12/12H ASSIM QUE TOLERAR",
      "USO ENDOVENOSO"
     ],
     [
      "AZITROMICINA 500 MG PÓ PARA SOLUÇÃO INJETÁVEL",
      "01 FRASCO-AMPOLA",
      "ADMINISTRAR 500 MG EV 01 VEZ AO DIA, DILUÍDO EM 250 ML DE SF 0,9% (2 MG/ML), EM 60 MINUTOS, POR 03 DIAS",
      "USO ENDOVENOSO"
     ]
    ],
    "orient": [
     "SOMENTE EM DISENTERIA (SANGUE NAS FEZES) COM COMPROMETIMENTO DO ESTADO GERAL, SEPSE, IMUNOSSUPRESSÃO OU CÓLERA GRAVE; NÃO USAR NA DIARREIA AQUOSA NÃO COMPLICADA",
     "COLHER COPROCULTURA E HEMOCULTURAS ANTES DA 1ª DOSE E AJUSTAR PELO ANTIBIOGRAMA (RESISTÊNCIA CRESCENTE DE SHIGELLA AO CIPROFLOXACINO)",
     "PASSAR PARA VIA ORAL (AZITROMICINA OU CIPROFLOXACINO) ASSIM QUE TOLERAR, COMPLETANDO 03 A 05 DIAS"
    ]
   },
   {
    "label": "Suspeita de C. difficile (diarreia após antibiótico ou hospitalização)",
    "mode": "internacao",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "VANCOMICINA 500 MG PÓ PARA SOLUÇÃO INJETÁVEL (USO ORAL)",
      "01 FRASCO-AMPOLA AO DIA",
      "RECONSTITUIR 01 FRASCO-AMPOLA EM 10 ML DE ÁGUA PARA INJETÁVEIS (50 MG/ML), MANTER EM GELADEIRA E DAR 2,5 ML (125 MG) VIA ORAL DE 6/6H POR 10 DIAS. FORMA FULMINANTE: 10 ML (500 MG) DE 6/6H, VIA ORAL OU SONDA",
      "USO ORAL"
     ],
     [
      "METRONIDAZOL 5 MG/ML SOLUÇÃO INJETÁVEL (BOLSA 100 ML)",
      "01 BOLSA 100 ML",
      "SOMENTE NA FORMA FULMINANTE (HIPOTENSÃO, ÍLEO OU MEGACÓLON), ASSOCIADO À VANCOMICINA ORAL: ADMINISTRAR 500 MG EV DE 8/8H, EM 60 MINUTOS",
      "USO ENDOVENOSO"
     ]
    ],
    "orient": [
     "CONFIRMAR COM PESQUISA DE TOXINA/GDH DE C. DIFFICILE E SUSPENDER O ANTIBIÓTICO DESENCADEANTE SEMPRE QUE POSSÍVEL",
     "VANCOMICINA ORAL É A ESCOLHA (FIDAXOMICINA, SE DISPONÍVEL); METRONIDAZOL VO 500 MG DE 8/8H POR 10 DIAS SÓ SE NENHUMA DAS DUAS ESTIVER DISPONÍVEL E A FORMA NÃO FOR GRAVE",
     "NÃO USAR LOPERAMIDA OU OPIOIDES; PRECAUÇÃO DE CONTATO E HIGIENE DAS MÃOS COM ÁGUA E SABÃO (ÁLCOOL NÃO ELIMINA ESPOROS)",
     "FORMA FULMINANTE: UTI E AVALIAÇÃO DA CIRURGIA"
    ]
   },
   {
    "label": "Hipocalemia (K < 3,5 MEQ/L)",
    "mode": "internacao",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "CLORETO DE POTÁSSIO 6% XAROPE (0,8 MEQ/ML)",
      "01 FRASCO",
      "SE TOLERAR VIA ORAL: TOMAR 15 ML (12 MEQ) DE 8/8H, DILUÍDO EM ÁGUA OU SUCO, APÓS AS REFEIÇÕES, ATÉ NORMALIZAR O POTÁSSIO",
      "USO ORAL"
     ],
     [
      "CLORETO DE POTÁSSIO 19,1% SOLUÇÃO INJETÁVEL (2,56 MEQ/ML)",
      "01 AMPOLA 10 ML",
      "SE K < 3,0 MEQ/L, SINTOMAS OU SEM VIA ORAL: DILUIR 10 ML (25 MEQ) EM 500 ML DE SF 0,9% E INFUNDIR EV EM 3 HORAS; REPETIR CONFORME DOSAGEM. NUNCA EM BOLUS; MÁXIMO 10 MEQ/H EM VEIA PERIFÉRICA",
      "USO ENDOVENOSO"
     ]
    ],
    "orient": [
     "REPOR SOMENTE COM DIURESE PRESENTE; DOSAR K E MG A CADA 6-12 HORAS DURANTE A REPOSIÇÃO EV E CORRIGIR HIPOMAGNESEMIA",
     "K < 2,5 MEQ/L OU ALTERAÇÃO NO ECG: MONITORIZAÇÃO CARDÍACA CONTÍNUA"
    ]
   },
   {
    "label": "Padrão — Planos A e B: SRO + zinco",
    "mode": "ped",
    "draft": true,
    "items": [
     [
      "SORO DE REIDRATAÇÃO ORAL",
      "01 CAIXA",
      "DILUIR 01 SACHÊ EM 1 LITRO DE ÁGUA FILTRADA OU FERVIDA. PLANO B (NA UNIDADE): OFERECER {DOSE} EM 4 A 6 HORAS, EM PEQUENOS VOLUMES FREQUENTES, CONFORME A SEDE (75 ML/KG; FAIXA DE 50 A 100 ML/KG). PLANO A (HIDRATADA): APÓS CADA EVACUAÇÃO, MENOR DE 1 ANO 50-100 ML; 1 A 10 ANOS 100-200 ML; ACIMA DE 10 ANOS O VOLUME TOLERADO",
      "USO ORAL",
      {
       "kg": 75,
       "un": "ML",
       "max": 3750
      }
     ],
     [
      "SULFATO DE ZINCO SOLUÇÃO ORAL (4 MG/ML DE ZINCO ELEMENTAR)",
      "01 FRASCO",
      "MENORES DE 5 ANOS, 01 VEZ AO DIA POR 10 A 14 DIAS: ATÉ 6 MESES DAR 2,5 ML (10 MG); DE 6 MESES A 5 ANOS DAR 5 ML (20 MG)",
      "USO ORAL"
     ]
    ],
    "orient": [
     "PLANO B: PERMANECER NA UNIDADE ATÉ A REIDRATAÇÃO COMPLETA, REAVALIANDO A CADA HORA; SEM MELHORA EM 4-6 HORAS OU PIORA: SONDA NASOGÁSTRICA (GASTRÓCLISE) OU PLANO C (SORO PELA VEIA)",
     "MANTER O ALEITAMENTO MATERNO E A ALIMENTAÇÃO HABITUAL; NÃO OFERECER REFRIGERANTES, SUCOS INDUSTRIALIZADOS OU CHÁS ADOÇADOS",
     "NÃO USAR LOPERAMIDA NEM METOCLOPRAMIDA EM CRIANÇAS; ANTIBIÓTICO SOMENTE NA DISENTERIA COM COMPROMETIMENTO DO ESTADO GERAL OU CÓLERA GRAVE",
     "RETORNAR IMEDIATAMENTE SE: NÃO MELHORAR EM 2 DIAS, VÔMITOS REPETIDOS, MUITA SEDE, RECUSA ALIMENTAR, SANGUE NAS FEZES, POUCA URINA, SONOLÊNCIA OU IRRITABILIDADE"
    ]
   },
   {
    "label": "Padrão — Se vômitos persistentes",
    "mode": "ped",
    "draft": true,
    "items": [
     [
      "ONDANSETRONA 4 MG/5 ML SOLUÇÃO ORAL",
      "01 FRASCO",
      "SE VÔMITOS PERSISTENTES, DAR DOSE ÚNICA 15 MINUTOS ANTES DE REINICIAR A SRO: {FAIXA}",
      "USO ORAL",
      {
       "sem_peso": "6 MESES A 2 ANOS 2,5 ML (2 MG); MAIS DE 2 A 10 ANOS (ATÉ 30 KG) 5 ML (4 MG); ACIMA DE 10 ANOS (MAIS DE 30 KG) 10 ML (8 MG)",
       "faixas": [
        {
         "ate": 30,
         "txt": "6 MESES A 2 ANOS 2,5 ML (2 MG); MAIS DE 2 ANOS 5 ML (4 MG)"
        },
        {
         "acima": 30,
         "txt": "10 ML (8 MG)"
        }
       ]
      }
     ]
    ]
   },
   {
    "label": "Padrão — Antitérmico pelo peso — escolha 1",
    "mode": "ped",
    "draft": true,
    "menu": true,
    "items": [
     [
      "DIPIRONA 500 MG/ML SOLUÇÃO ORAL (GOTAS)",
      "01 FRASCO",
      "DAR {DOSE} VIA ORAL DE 6/6H SE DOR OU FEBRE (15 MG/KG/DOSE). ACIMA DE 3 MESES OU 5 KG",
      "USO ORAL",
      {
       "kg": 15,
       "conc": 500,
       "gotas": 20,
       "un": "GOTAS",
       "max": 1000
      }
     ],
     [
      "PARACETAMOL 200 MG/ML SOLUÇÃO ORAL (GOTAS)",
      "01 FRASCO",
      "DAR {DOSE} VIA ORAL DE 6/6H SE DOR OU FEBRE (15 MG/KG/DOSE)",
      "USO ORAL",
      {
       "kg": 15,
       "conc": 200,
       "gotas": 15,
       "un": "GOTAS",
       "max": 750
      }
     ]
    ]
   },
   {
    "label": "Padrão — disenteria com comprometimento do estado geral (antibiótico) — escolha 1",
    "mode": "ped",
    "draft": true,
    "menu": true,
    "items": [
     [
      "AZITROMICINA 200 MG/5 ML PÓ PARA SUSPENSÃO ORAL",
      "01 FRASCO",
      "DAR {DOSE} VIA ORAL 01 VEZ AO DIA NO 1º DIA (10 MG/KG) E METADE DESSA DOSE (5 MG/KG) 01 VEZ AO DIA DO 2º AO 5º DIA. A PARTIR DE 3 MESES E SEM IMUNODEFICIÊNCIA (MENOR DE 3 MESES OU IMUNODEFICIÊNCIA: CEFTRIAXONA EV)",
      "USO ORAL",
      {
       "kg": 10,
       "conc": 40,
       "un": "ML",
       "max": 500
      }
     ],
     [
      "CEFTRIAXONA 1 G PÓ PARA SOLUÇÃO INJETÁVEL",
      "01 FRASCO-AMPOLA",
      "ADMINISTRAR {DOSE} IM 01 VEZ AO DIA POR 03 A 05 DIAS (50 MG/KG/DIA; ATÉ 100 MG/KG/DIA NOS CASOS GRAVES). VIA EV SE INTERNADA COM ACESSO VENOSO, MENOR DE 3 MESES OU IMUNODEFICIÊNCIA",
      "USO INTRAMUSCULAR",
      {
       "kg": 50,
       "un": "MG",
       "max": 2000
      }
     ],
     [
      "CIPROFLOXACINO 500 MG",
      "06 COMPRIMIDOS",
      "ACIMA DE 10 ANOS OU MAIS DE 30 KG: TOMAR 01 COMPRIMIDO DE 12/12H POR 03 DIAS",
      "USO ORAL"
     ]
    ],
    "orient": [
     "INDICADO NA DISENTERIA (SANGUE NAS FEZES) COM COMPROMETIMENTO DO ESTADO GERAL, CÓLERA GRAVE, DESNUTRIÇÃO GRAVE OU IMUNOSSUPRESSÃO",
     "CEFTRIAXONA CONTRAINDICADA EM RECÉM-NASCIDO ICTÉRICO OU QUE RECEBE SOLUÇÃO COM CÁLCIO (RINGER) — USAR CEFOTAXIMA 100 MG/KG/DIA EV EM 4 DOSES; NAS DEMAIS IDADES NÃO INFUNDIR NA MESMA VIA DO RINGER",
     "REAVALIAR EM 48 HORAS; SEM MELHORA, COLHER COPROCULTURA E CONSIDERAR AMEBÍASE (METRONIDAZOL)"
    ]
   },
   {
    "label": "Combinação pronta — Planos A e B: SRO + zinco + sintomáticos",
    "mode": "ped",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "SORO DE REIDRATAÇÃO ORAL",
      "01 CAIXA",
      "DILUIR 01 SACHÊ EM 1 LITRO DE ÁGUA FILTRADA OU FERVIDA. PLANO B (NA UNIDADE): OFERECER {DOSE} EM 4 A 6 HORAS, EM PEQUENOS VOLUMES FREQUENTES, CONFORME A SEDE (75 ML/KG; FAIXA DE 50 A 100 ML/KG). PLANO A (HIDRATADA): APÓS CADA EVACUAÇÃO, MENOR DE 1 ANO 50-100 ML; 1 A 10 ANOS 100-200 ML; ACIMA DE 10 ANOS O VOLUME TOLERADO",
      "USO ORAL",
      {
       "kg": 75,
       "un": "ML",
       "max": 3750
      }
     ],
     [
      "SULFATO DE ZINCO SOLUÇÃO ORAL (4 MG/ML DE ZINCO ELEMENTAR)",
      "01 FRASCO",
      "MENORES DE 5 ANOS, 01 VEZ AO DIA POR 10 A 14 DIAS: ATÉ 6 MESES DAR 2,5 ML (10 MG); DE 6 MESES A 5 ANOS DAR 5 ML (20 MG)",
      "USO ORAL"
     ],
     [
      "ONDANSETRONA 4 MG/5 ML SOLUÇÃO ORAL",
      "01 FRASCO",
      "SE VÔMITOS PERSISTENTES, DAR DOSE ÚNICA 15 MINUTOS ANTES DE REINICIAR A SRO: {FAIXA}",
      "USO ORAL",
      {
       "sem_peso": "6 MESES A 2 ANOS 2,5 ML (2 MG); MAIS DE 2 A 10 ANOS (ATÉ 30 KG) 5 ML (4 MG); ACIMA DE 10 ANOS (MAIS DE 30 KG) 10 ML (8 MG)",
       "faixas": [
        {
         "ate": 30,
         "txt": "6 MESES A 2 ANOS 2,5 ML (2 MG); MAIS DE 2 ANOS 5 ML (4 MG)"
        },
        {
         "acima": 30,
         "txt": "10 ML (8 MG)"
        }
       ]
      }
     ],
     [
      "DIPIRONA 500 MG/ML SOLUÇÃO ORAL (GOTAS)",
      "01 FRASCO",
      "DAR {DOSE} VIA ORAL DE 6/6H SE DOR OU FEBRE (15 MG/KG/DOSE). ACIMA DE 3 MESES OU 5 KG",
      "USO ORAL",
      {
       "kg": 15,
       "conc": 500,
       "gotas": 20,
       "un": "GOTAS",
       "max": 1000
      }
     ]
    ]
   },
   {
    "label": "Antitérmico alternativo (alergia à dipirona ou menor de 3 meses)",
    "mode": "ped",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "PARACETAMOL 200 MG/ML SOLUÇÃO ORAL (GOTAS)",
      "01 FRASCO",
      "DAR {DOSE} VIA ORAL DE 6/6H SE DOR OU FEBRE (15 MG/KG/DOSE)",
      "USO ORAL",
      {
       "kg": 15,
       "conc": 200,
       "gotas": 15,
       "un": "GOTAS",
       "max": 750
      }
     ]
    ],
    "orient": [
     "CONFERIR NA BULA DO FRASCO O NÚMERO DE GOTAS POR ML (PARACETAMOL 200 MG/ML ≈ 15 GOTAS/ML)",
     "FEBRE EM MENOR DE 3 MESES EXIGE AVALIAÇÃO MÉDICA ANTES DO ANTITÉRMICO"
    ]
   },
   {
    "label": "Padrão — Plano C (desidratação grave): reidratação EV",
    "mode": "ped_internacao",
    "draft": true,
    "items": [
     [
      "CLORETO DE SÓDIO 0,9% (SORO FISIOLÓGICO)",
      "01 BOLSA 500 ML",
      "1ª ETAPA: INFUNDIR {DOSE} EV (30 ML/KG) — MENOR DE 1 ANO EM 1 HORA; A PARTIR DE 1 ANO EM 30 MINUTOS. RECÉM-NASCIDO OU CARDIOPATIA GRAVE (MENOR DE 5 ANOS): APENAS 10 ML/KG, REAVALIANDO",
      "USO ENDOVENOSO",
      {
       "kg": 30,
       "un": "ML",
       "max": 1500
      }
     ],
     [
      "RINGER COM LACTATO",
      "01 BOLSA 500 ML",
      "2ª ETAPA: INFUNDIR {DOSE} EV (70 ML/KG) — MENOR DE 1 ANO EM 5 HORAS; A PARTIR DE 1 ANO EM 2 HORAS E 30 MINUTOS",
      "USO ENDOVENOSO",
      {
       "kg": 70,
       "un": "ML",
       "max": 3500
      }
     ],
     [
      "SORO GLICOSADO 5% + CLORETO DE SÓDIO 0,9% (4:1) — MANUTENÇÃO",
      "01 BOLSA 500 ML",
      "APÓS A FASE RÁPIDA, INFUNDIR EV EM 24 HORAS: {FAIXA}. ACRESCENTAR KCL 10% 2 ML PARA CADA 100 ML SOMENTE COM DIURESE PRESENTE",
      "USO ENDOVENOSO",
      {
       "sem_peso": "ATÉ 10 KG 100 ML/KG; 10 A 20 KG 1000 ML + 50 ML/KG ACIMA DE 10 KG; ACIMA DE 20 KG 1500 ML + 20 ML/KG ACIMA DE 20 KG (MÁXIMO 2000 ML)",
       "faixas": [
        {
         "ate": 10,
         "txt": "{=P*100} ML (≈ {=P*100/24} ML/H) — 100 ML/KG"
        },
        {
         "acima": 10,
         "ate": 20,
         "txt": "{=1000+50*(P-10)} ML (≈ {=(1000+50*(P-10))/24} ML/H) — 1000 ML + 50 ML/KG ACIMA DE 10 KG"
        },
        {
         "acima": 20,
         "txt": "{=min(1500+20*(P-20),2000)} ML (≈ {=min(1500+20*(P-20),2000)/24} ML/H) — 1500 ML + 20 ML/KG ACIMA DE 20 KG, MÁXIMO 2000 ML"
        }
       ]
      }
     ],
     [
      "SORO GLICOSADO 5% + CLORETO DE SÓDIO 0,9% (1:1) — REPOSIÇÃO",
      "01 BOLSA 500 ML",
      "INFUNDIR {DOSE} EV EM 24 HORAS (50 ML/KG/DIA), JUNTO COM A MANUTENÇÃO; REAVALIAR CONFORME AS PERDAS",
      "USO ENDOVENOSO",
      {
       "kg": 50,
       "un": "ML",
       "max": 2500
      }
     ]
    ],
    "orient": [
     "PESAR NA ADMISSÃO; REAVALIAR A CADA HORA (FC, PERFUSÃO, DIURESE, NÍVEL DE CONSCIÊNCIA); SE PERSISTIREM SINAIS DE CHOQUE APÓS 2 HORAS, REPETIR A FASE RÁPIDA",
     "OFERECER SRO ASSIM QUE A CRIANÇA CONSEGUIR BEBER; SUSPENDER A HIDRATAÇÃO EV QUANDO HIDRATADA, ACEITANDO SRO E SEM VÔMITOS, E OBSERVAR POR PELO MENOS 6 HORAS",
     "DOSAR GLICEMIA, NA, K, UREIA, CREATININA E GASOMETRIA; DESNUTRIDO GRAVE: NÃO USAR ESTE ESQUEMA — SF 0,9% 10 ML/KG COM REAVALIAÇÃO A CADA HORA",
     "UTI SE CHOQUE REFRATÁRIO À EXPANSÃO, ACIDOSE GRAVE, DISTÚRBIO ELETROLÍTICO GRAVE OU REBAIXAMENTO PERSISTENTE"
    ]
   },
   {
    "label": "Do material do Drive — Cólica intensa na observação: escopolamina + dipirona EV",
    "mode": "internacao",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "BUTILBROMETO DE ESCOPOLAMINA 4 MG/ML + DIPIRONA 500 MG/ML SOLUÇÃO INJETÁVEL",
      "01 AMPOLA 5 ML",
      "SE CÓLICA INTENSA: ADMINISTRAR 01 AMPOLA (20 MG + 2,5 G) EV LENTO, DILUÍDA EM 100 A 250 ML DE SF 0,9%; PODE REPETIR UMA VEZ APÓS 08H (MÁXIMO 02 AMPOLAS EM 24H). NÃO SOMAR OUTRA DIPIRONA. EVITAR SE HIPOTENSÃO OU ALERGIA À DIPIRONA",
      "USO ENDOVENOSO"
     ]
    ]
   }
  ]
 },
 {
  "id": "hemorroida",
  "ic": "🩸",
  "nm": "Doença hemorroidária (crise e trombose)",
  "sub": "diosmina · psyllium · lidocaína",
  "blocks": [
   {
    "label": "Padrão — flavonoide + fibras + analgesia tópica",
    "draft": true,
    "items": [
     [
      "DIOSMINA 450 MG + HESPERIDINA 50 MG",
      "36 COMPRIMIDOS",
      "TOMAR 02 COMPRIMIDOS DE 8/8H POR 04 DIAS; DEPOIS, 02 COMPRIMIDOS DE 12/12H POR MAIS 03 DIAS"
     ],
     [
      "PSYLLIUM (PLANTAGO OVATA) 3,5 G ENVELOPE",
      "01 CAIXA",
      "DISSOLVER 01 ENVELOPE EM 01 COPO DE ÁGUA (150 ML) E TOMAR LOGO EM SEGUIDA, 01 A 02 VEZES AO DIA, DE USO CONTÍNUO. BEBER 1,5 A 2 LITROS DE ÁGUA POR DIA"
     ],
     [
      "LIDOCAÍNA 50 MG/G POMADA",
      "01 BISNAGA",
      "APLICAR PEQUENA QUANTIDADE NA REGIÃO ANAL ATÉ 04 VEZES AO DIA, APÓS O BANHO DE ASSENTO E AS EVACUAÇÕES, POR ATÉ 07 DIAS",
      "USO TÓPICO"
     ],
     [
      "DIPIRONA 500 MG",
      "01 CAIXA",
      "TOMAR 02 COMPRIMIDOS SE DOR, PODENDO REPETIR DE 6/6H SE NECESSÁRIO"
     ]
    ],
    "orient": [
     "FAZER BANHO DE ASSENTO COM ÁGUA MORNA (NÃO QUENTE — TESTAR A TEMPERATURA) POR 10 A 15 MINUTOS, 03 A 04 VEZES AO DIA E APÓS AS EVACUAÇÕES",
     "DIETA RICA EM FIBRAS (FRUTAS, VERDURAS, ALIMENTOS INTEGRAIS) E 08 A 10 COPOS DE ÁGUA POR DIA. NÃO FAZER FORÇA PARA EVACUAR NEM PERMANECER SENTADO NO VASO POR MAIS DE 05 MINUTOS",
     "APÓS EVACUAR, LAVAR COM ÁGUA OU USAR LENÇOS UMEDECIDOS SEM ÁLCOOL/PERFUME, EVITANDO PAPEL HIGIÊNICO",
     "RETORNAR IMEDIATAMENTE SE SANGRAMENTO VOLUMOSO, FEBRE, SAÍDA DE PUS, DOR QUE PIORA APESAR DA MEDICAÇÃO OU DIFICULDADE PARA URINAR",
     "TROMBOSE COM MENOS DE 72H E DOR INTENSA: ENCAMINHAR À CIRURGIA/COLOPROCTOLOGIA PARA RETIRADA DO TROMBO SOB ANESTESIA LOCAL (INCISÃO E DRENAGEM OU EXCISÃO). APÓS 72H, MANTER TRATAMENTO CLÍNICO — REGRESSÃO ESPERADA EM 07 A 14 DIAS"
    ]
   },
   {
    "label": "Padrão — AINE (anti-inflamatório) por 05 dias — escolha 1",
    "draft": true,
    "menu": true,
    "items": [
     [
      "IBUPROFENO 300 MG",
      "01 CAIXA",
      "TOMAR 02 COMPRIMIDOS DE 6/6H POR 05 DIAS"
     ],
     [
      "NAPROXENO SÓDICO 500 MG",
      "10 COMPRIMIDOS",
      "TOMAR UM COMPRIMIDO SE DOR, PODENDO REPETIR DE 12/12H POR ATÉ 05 DIAS SEGUIDOS"
     ]
    ]
   },
   {
    "label": "Receita — crise hemorroidária: AINE + flavonoide (dose de manutenção) + fibra + pomada anestésica",
    "sec": "offlabel",
    "items": [
     [
      "DICLOFENACO 50 MG",
      "15 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO DE 8/8H POR 05 DIAS HORÁRIO SUGERIDO (8/8h): 06:00 / 14:00 / 22:00"
     ],
     [
      "DIOSMINA 450 MG + HESPERIDINA 50 MG",
      "14 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO DE 12/12H POR 07 DIAS HORÁRIO SUGERIDO: 08:00 / 20:00"
     ],
     [
      "BENEFIBER ®",
      "01 CAIXA",
      "DISSOLVER O CONTEÚDO DE UM ENVELOPE EM UM COPO DE ÁGUA E TOMAR ÀS REFEIÇÕES 02 VEZES AO DIA, DE USO CONTÍNUO (A FIBRA LEVA ALGUMAS SEMANAS PARA FAZER EFEITO)"
     ],
     [
      "POLICRESULENO 50 MG/G + CLORIDRATO DE CINCHOCAÍNA 10 MG/G POMADA",
      "01 BISNAGA",
      "APLICAR PEQUENA QUANTIDADE NA REGIÃO ANAL 02 A 03 VEZES AO DIA, APÓS EVACUAR E HIGIENIZAR, POR ATÉ 07 DIAS",
      "USO TÓPICO"
     ]
    ],
    "orient": [
     "NÃO USAR PAPEL HIGIÊNICO. APÓS EVACUAÇÃO, LAVAR OU USAR LENÇOS UMEDECIDOS",
     "FAZER BANHO DE ASSENTO (SENTAR NUMA BANHEIRA OU BACIA COM ÁGUA MORNA) VÁRIAS VEZES AO DIA - TESTE A ÁGUA PARA EVITAR QUEIMADURAS",
     "INGERIR BASTANTE LÍQUIDO (8 A 10 COPOS DE 200 ML POR DIA), DIETA RICA EM FIBRAS (FRUTAS, VERDURAS CRUAS, ALIMENTOS INTEGRAIS...), EXERCÍCIO FÍSICO E PROCURAR EVACUAR DIARIAMENTE SEMPRE NO MESMO HORÁRIO"
    ]
   },
   {
    "label": "AINE (anti-inflamatório) — escolha 1",
    "sec": "offlabel",
    "menu": true,
    "items": [
     [
      "IBUPROFENO 300 MG",
      "01 CAIXA",
      "TOMAR 02 COMPRIMIDOS DE 6/6H POR 05 DIAS"
     ],
     [
      "DICLOFENACO 50 MG",
      "15 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO DE 8/8H, POR 05 DIAS SEGUIDOS HORÁRIO SUGERIDO (8/8h): 06:00 / 14:00 / 22:00"
     ],
     [
      "NAPROXENO SÓDICO 500 MG",
      "10 COMPRIMIDOS",
      "TOMAR UM COMPRIMIDO SE DOR, PODENDO REPETIR DE 12/12H POR ATÉ 05 DIAS SEGUIDOS"
     ]
    ]
   }
  ]
 },
 {
  "id": "dismenorreia",
  "ic": "🩸",
  "nm": "Dismenorreia",
  "sub": "ibuprofeno · naproxeno · paracetamol · escopolamina",
  "blocks": [
   {
    "label": "Padrão — AINE no período menstrual — escolha 1",
    "draft": true,
    "menu": true,
    "items": [
     [
      "IBUPROFENO 600 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO DE 8/8H, APÓS AS REFEIÇÕES, INICIANDO 01 DIA ANTES OU NO PRIMEIRO DIA DA MENSTRUAÇÃO, POR 02 A 03 DIAS A CADA CICLO"
     ],
     [
      "NAPROXENO SÓDICO 500 MG",
      "10 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO DE 12/12H, APÓS AS REFEIÇÕES, INICIANDO 01 DIA ANTES OU NO PRIMEIRO DIA DA MENSTRUAÇÃO, POR 02 A 03 DIAS A CADA CICLO",
      "USO ORAL"
     ],
     [
      "DICLOFENACO 50 MG",
      "15 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO DE 8/8H, APÓS AS REFEIÇÕES, INICIANDO 01 DIA ANTES OU NO PRIMEIRO DIA DA MENSTRUAÇÃO, POR 02 A 03 DIAS A CADA CICLO. HORÁRIO SUGERIDO: 06:00 / 14:00 / 22:00",
      "USO ORAL"
     ],
     [
      "ÁCIDO MEFENÂMICO 500 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO DE 8/8H, APÓS AS REFEIÇÕES, INICIANDO NO PRIMEIRO DIA DA MENSTRUAÇÃO, POR 02 A 03 DIAS A CADA CICLO. HORÁRIO SUGERIDO: 06:00 / 14:00 / 22:00",
      "USO ORAL"
     ]
    ],
    "orient": [
     "CALOR LOCAL (BOLSA DE ÁGUA MORNA NO BAIXO VENTRE) E ATIVIDADE FÍSICA REGULAR AJUDAM A ALIVIAR A CÓLICA",
     "SUSPENDER O ANTI-INFLAMATÓRIO E PROCURAR ATENDIMENTO SE DOR NO ESTÔMAGO, FEZES ESCURAS OU VÔMITOS COM SANGUE",
     "SE NÃO HOUVER MELHORA APÓS 03 CICLOS, AGENDAR CONSULTA NA UBS/GINECOLOGIA PARA CONSIDERAR CONTRACEPTIVO HORMONAL E INVESTIGAR CAUSA SECUNDÁRIA (ENDOMETRIOSE, MIOMA) COM USG TRANSVAGINAL",
     "RETORNAR IMEDIATAMENTE SE FEBRE, DOR MUITO FORTE OU FORA DO PERÍODO MENSTRUAL, SANGRAMENTO INTENSO, DESMAIO, CORRIMENTO COM MAU CHEIRO OU ATRASO MENSTRUAL (POSSIBILIDADE DE GRAVIDEZ)"
    ]
   },
   {
    "label": "Padrão — contraindicação a AINE (asma induzida por AINE, úlcera péptica, doença renal)",
    "draft": true,
    "items": [
     [
      "PARACETAMOL 750 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO SE CÓLICA MENSTRUAL, PODENDO REPETIR DE 6/6H"
     ]
    ]
   },
   {
    "label": "Antiespasmódico (efeito pequeno na dismenorreia — só como adjuvante do AINE)",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "BUTILBROMETO DE ESCOPOLAMINA 10 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO SE DOR ABDOMINAL, PODENDO REPETIR DE 8/8H"
     ]
    ]
   },
   {
    "label": "Combinação pronta — AINE no período menstrual",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "IBUPROFENO 600 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO DE 8/8H, APÓS AS REFEIÇÕES, INICIANDO 01 DIA ANTES OU NO PRIMEIRO DIA DA MENSTRUAÇÃO, POR 02 A 03 DIAS A CADA CICLO"
     ]
    ]
   },
   {
    "label": "Antiespasmódico + antiemético se náusea (adjuvantes)",
    "sec": "offlabel",
    "items": [
     [
      "BUTILBROMETO DE ESCOPOLAMINA 10 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO SE DOR ABDOMINAL, PODENDO REPETIR DE 8/8H"
     ],
     [
      "METOCLOPRAMIDA 10 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO SE NÁUSEAS OU VÔMITOS, PODENDO REPETIR DE 8/8H"
     ]
    ]
   },
   {
    "label": "Meloxicam (AINE de 01 tomada ao dia) + antiemético se náusea",
    "sec": "offlabel",
    "items": [
     [
      "MELOXICAM 7,5 MG",
      "05 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO 01 VEZ AO DIA, APÓS UMA REFEIÇÃO, INICIANDO NO PRIMEIRO DIA DA MENSTRUAÇÃO, POR 02 A 03 DIAS A CADA CICLO",
      "USO ORAL"
     ],
     [
      "METOCLOPRAMIDA 10 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO SE NÁUSEAS OU VÔMITOS, PODENDO REPETIR DE 8/8H"
     ]
    ]
   },
   {
    "label": "AINE em horário fixo no período menstrual (outras opções; nimesulida só como 2ª linha) — escolha 1",
    "sec": "offlabel",
    "menu": true,
    "items": [
     [
      "IBUPROFENO 300 MG",
      "01 CAIXA",
      "TOMAR 02 COMPRIMIDOS (600 MG) DE 8/8H, APÓS AS REFEIÇÕES, INICIANDO 01 DIA ANTES OU NO PRIMEIRO DIA DA MENSTRUAÇÃO, POR 02 A 03 DIAS A CADA CICLO",
      "USO ORAL"
     ],
     [
      "DICLOFENACO 50 MG",
      "15 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO DE 8/8H, APÓS AS REFEIÇÕES, INICIANDO 01 DIA ANTES OU NO PRIMEIRO DIA DA MENSTRUAÇÃO, POR 02 A 03 DIAS A CADA CICLO. HORÁRIO SUGERIDO: 06:00 / 14:00 / 22:00",
      "USO ORAL"
     ],
     [
      "NIMESULIDA 100 MG",
      "10 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO DE 12/12H, APÓS AS REFEIÇÕES, INICIANDO NO PRIMEIRO DIA DA MENSTRUAÇÃO, POR 02 A 03 DIAS A CADA CICLO. NÃO USAR SE DOENÇA DO FÍGADO OU USO DE ÁLCOOL",
      "USO ORAL"
     ],
     [
      "NAPROXENO SÓDICO 500 MG",
      "10 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO DE 12/12H, APÓS AS REFEIÇÕES, INICIANDO 01 DIA ANTES OU NO PRIMEIRO DIA DA MENSTRUAÇÃO, POR 02 A 03 DIAS A CADA CICLO",
      "USO ORAL"
     ]
    ]
   },
   {
    "label": "Antiemético — escolha 1",
    "sec": "offlabel",
    "menu": true,
    "items": [
     [
      "METOCLOPRAMIDA 10 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO SE NÁUSEAS OU VÔMITOS, PODENDO REPETIR DE 8/8H"
     ],
     [
      "DIMENIDRINATO 50 MG + PIRIDOXINA 10MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO SE VERTIGEM, NÁUSEAS OU VÔMITOS, PODENDO REPETIR DE 6/6H"
     ]
    ]
   }
  ]
 },
 {
  "id": "dor_abdominal",
  "ic": "🩺",
  "nm": "Dor abdominal, cólica biliar e dispepsia",
  "sub": "escopolamina · dipirona · diclofenaco · omeprazol",
  "blocks": [
   {
    "label": "Padrão — Antiespasmódico se cólica (na cólica biliar, preferir o AINE) — escolha 1",
    "draft": true,
    "menu": true,
    "items": [
     [
      "BUTILBROMETO DE ESCOPOLAMINA 10 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO SE DOR ABDOMINAL, PODENDO REPETIR DE 8/8H"
     ],
     [
      "BUTILBROMETO DE ESCOPOLAMINA 10 MG + DIPIRONA 250 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO SE DOR ABDOMINAL, PODENDO REPETIR DE 8/8H. JÁ CONTÉM DIPIRONA — NÃO ASSOCIAR COM DIPIRONA",
      "USO ORAL"
     ]
    ],
    "orient": [
     "EVITAR ALIMENTOS GORDUROSOS, FRITURAS E BEBIDA ALCOÓLICA ATÉ MELHORAR",
     "A CAUSA DA DOR NA BARRIGA PODE FICAR MAIS CLARA COM AS HORAS (EX.: APENDICITE NO INÍCIO): SE A DOR MUDAR DE LUGAR, FICAR MAIS FORTE OU NÃO MELHORAR EM 24 HORAS, VOLTAR PARA SER REAVALIADO",
     "SE O ULTRASSOM MOSTRAR PEDRA NA VESÍCULA (COLELITÍASE), PROCURAR A UNIDADE DE SAÚDE PARA ENCAMINHAMENTO AO CIRURGIÃO",
     "RETORNAR IMEDIATAMENTE SE FEBRE, VÔMITOS QUE NÃO PARAM, PELE OU OLHOS AMARELADOS, URINA ESCURA OU FEZES CLARAS, BARRIGA DURA, SANGUE NO VÔMITO OU FEZES PRETAS"
    ]
   },
   {
    "label": "Padrão — Analgésico — escolha 1",
    "draft": true,
    "menu": true,
    "items": [
     [
      "DIPIRONA 500 MG",
      "01 CAIXA",
      "TOMAR 02 COMPRIMIDOS SE DOR OU FEBRE, PODENDO REPETIR DE 6/6H"
     ],
     [
      "PARACETAMOL 750 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO SE DOR OU FEBRE, PODENDO REPETIR DE 6/6H. INTERCALAR COM DIPIRONA, SE NECESSÁRIO."
     ]
    ]
   },
   {
    "label": "Padrão — Cólica biliar: AINE por curto prazo (evitar se doença renal, úlcera ou sangramento digestivo, gestação, IC ou uso de anticoagulante)",
    "draft": true,
    "items": [
     [
      "DICLOFENACO 50 MG",
      "15 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO DE 8/8H, POR 05 DIAS SEGUIDOS HORÁRIO SUGERIDO (8/8h): 06:00 / 14:00 / 22:00"
     ]
    ]
   },
   {
    "label": "Padrão — Dispepsia / epigastralgia",
    "draft": true,
    "items": [
     [
      "OMEPRAZOL 20 MG",
      "28 CÁPSULAS",
      "TOMAR 01 CÁPSULA PELA MANHÃ, EM JEJUM, 30 MINUTOS ANTES DO CAFÉ DA MANHÃ, POR 04 SEMANAS",
      "USO ORAL"
     ],
     [
      "HIDRÓXIDO DE ALUMÍNIO 61,5 MG/ML SUSPENSÃO ORAL",
      "01 FRASCO",
      "TOMAR 10 ML SE AZIA OU QUEIMAÇÃO, 01 HORA APÓS AS REFEIÇÕES E AO DEITAR, ATÉ 04 VEZES AO DIA. TOMAR COM INTERVALO DE 02 HORAS DE OUTROS MEDICAMENTOS"
     ]
    ]
   },
   {
    "label": "Padrão — Analgesia + antiespasmódico EV",
    "mode": "internacao",
    "draft": true,
    "items": [
     [
      "DIPIRONA 500 MG/ML SOLUÇÃO INJETÁVEL",
      "01 AMPOLA 2 ML",
      "ADMINISTRAR 01 G (02 ML) EV DILUÍDO EM 100 ML DE SF 0,9% EM 15 MINUTOS, DE 6/6H (HORÁRIO FIXO ENQUANTO DOR MODERADA A INTENSA)",
      "USO ENDOVENOSO"
     ],
     [
      "ESCOPOLAMINA (BUTILBROMETO) 20 MG/ML SOLUÇÃO INJETÁVEL",
      "01 AMPOLA",
      "ADMINISTRAR 20 MG (01 AMPOLA) EV LENTO, ATÉ DE 8/8H SE CÓLICA",
      "USO ENDOVENOSO"
     ]
    ]
   },
   {
    "label": "Padrão — Cólica biliar ou dor intensa — escolha 1",
    "mode": "internacao",
    "draft": true,
    "menu": true,
    "items": [
     [
      "CETOPROFENO 100 MG PÓ LIÓFILO PARA SOLUÇÃO INJETÁVEL",
      "01 FRASCO-AMPOLA",
      "SE SEM CONTRAINDICAÇÃO A AINE: ADMINISTRAR 100 MG EV DILUÍDO EM 100 ML DE SF 0,9% EM 20 MINUTOS, DE 12/12H, POR NO MÁXIMO 03 DIAS",
      "USO ENDOVENOSO"
     ],
     [
      "TRAMADOL 50 MG/ML SOLUÇÃO INJETÁVEL",
      "01 AMPOLA 2 ML",
      "ADMINISTRAR 50 A 100 MG EV DILUÍDO EM 100 ML DE SF 0,9% EM 30 MINUTOS, ATÉ DE 6/6H SE DOR (MÁXIMO 400 MG/DIA; ACIMA DE 75 ANOS MÁXIMO 300 MG/DIA; CLCR < 30: DE 12/12H, MÁXIMO 200 MG/DIA)",
      "USO ENDOVENOSO"
     ],
     [
      "MORFINA 10 MG/ML SOLUÇÃO INJETÁVEL",
      "01 AMPOLA 1 ML",
      "DILUIR 01 AMPOLA EM 9 ML DE SF 0,9% (1 MG/ML). ADMINISTRAR 2 A 3 MG EV LENTO A CADA 05-10 MIN ATÉ DOR ≤ 4 OU SONOLÊNCIA (MÁXIMO 15 MG NA TITULAÇÃO); DEPOIS 2 A 4 MG EV ATÉ DE 4/4H SE DOR. IDOSO OU DOENÇA RENAL: 1 A 2 MG POR DOSE",
      "USO ENDOVENOSO"
     ]
    ]
   },
   {
    "label": "Padrão — Antiemético EV — escolha 1",
    "mode": "internacao",
    "draft": true,
    "menu": true,
    "items": [
     [
      "METOCLOPRAMIDA 5 MG/ML SOLUÇÃO INJETÁVEL",
      "01 AMPOLA 2 ML",
      "ADMINISTRAR 10 MG (2 ML) EV, DILUÍDO EM 100 ML DE SF 0,9%, EM 15 MINUTOS; PODE REPETIR ATÉ DE 8/8H",
      "USO ENDOVENOSO"
     ],
     [
      "ONDANSETRONA 2 MG/ML SOLUÇÃO INJETÁVEL",
      "01 AMPOLA 2 ML",
      "ADMINISTRAR 4 MG (02 ML) EV LENTO ATÉ DE 8/8H SE NÁUSEAS OU VÔMITOS",
      "USO ENDOVENOSO"
     ]
    ]
   },
   {
    "label": "Padrão — Dispepsia / suspeita de doença péptica",
    "mode": "internacao",
    "draft": true,
    "items": [
     [
      "OMEPRAZOL 40 MG PÓ PARA SOLUÇÃO INJETÁVEL",
      "01 FRASCO-AMPOLA",
      "RECONSTITUIR E ADMINISTRAR 40 MG EV LENTO (EM 05 MINUTOS) OU DILUÍDO EM 100 ML DE SF 0,9% EM 20 A 30 MINUTOS, 01 VEZ AO DIA",
      "USO ENDOVENOSO"
     ]
    ]
   }
  ]
 },
 {
  "id": "dor_toracica",
  "ic": "❤️",
  "nm": "Dor torácica / síndrome coronariana aguda",
  "sub": "AAS · clopidogrel · isossorbida · nitroglicerina · enoxaparina · atorvastatina",
  "blocks": [
   {
    "label": "Padrão — Suspeita de SCA: AAS imediato (se sem contraindicação)",
    "mode": "internacao",
    "draft": true,
    "items": [
     [
      "ÁCIDO ACETILSALICÍLICO (AAS) 100 MG",
      "03 COMPRIMIDOS",
      "ATAQUE: MASTIGAR 03 COMPRIMIDOS (300 MG) EM DOSE ÚNICA — NÃO USAR COMPRIMIDO DE REVESTIMENTO ENTÉRICO NO ATAQUE; DEPOIS 100 MG VIA ORAL 01 VEZ AO DIA",
      "USO ORAL"
     ]
    ],
    "orient": [
     "ECG EM ATÉ 10 MINUTOS DA CHEGADA E REPETIR EM 15-30 MIN SE A DOR PERSISTIR OU VOLTAR; MONITOR CARDÍACO, ACESSO VENOSO E TROPONINA (ULTRASSENSÍVEL NO ALGORITMO 0/1 H OU 0/2 H; CONVENCIONAL EM 0 E 3-6 H)",
     "OXIGÊNIO SOMENTE SE SATO2 < 90% — NÃO USAR DE ROTINA",
     "SUSPEITA DE DISSECÇÃO DE AORTA (DOR LANCINANTE PARA O DORSO, ASSIMETRIA DE PULSOS OU DE PA): ANGIO-TC ANTES DE ANTIAGREGAR, ANTICOAGULAR OU TROMBOLISAR"
    ]
   },
   {
    "label": "Padrão — IAM com supra de ST: reperfusão",
    "mode": "internacao",
    "draft": true,
    "items": [
     [
      "REPERFUSÃO: ANGIOPLASTIA PRIMÁRIA OU TROMBÓLISE",
      "CONFORME PROTOCOLO",
      "IAM COM SUPRA E SINTOMAS HÁ MENOS DE 12 H: ACIONAR A REGULAÇÃO PARA ANGIOPLASTIA PRIMÁRIA SE PUDER SER FEITA EM ATÉ 120 MINUTOS DO DIAGNÓSTICO; SENÃO, TROMBÓLISE EM ATÉ 10 MINUTOS DO DIAGNÓSTICO, SE SEM CONTRAINDICAÇÃO — DROGA E DOSE PELA ABA CALCULADORAS › EMERGÊNCIA › TROMBÓLISE. APÓS A TROMBÓLISE, TRANSFERIR PARA CENTRO COM HEMODINÂMICA: CATETERISMO EM 2 A 24 H, OU IMEDIATO SE NÃO HOUVER CRITÉRIOS DE REPERFUSÃO EM 60-90 MIN, CHOQUE OU INSTABILIDADE",
      "USO ENDOVENOSO"
     ]
    ]
   },
   {
    "label": "Padrão — SCA confirmada: 2º antiagregante (ticagrelor de preferência; clopidogrel se trombólise ou anticoagulante oral) — escolha 1",
    "mode": "internacao",
    "draft": true,
    "menu": true,
    "items": [
     [
      "TICAGRELOR 90 MG",
      "02 COMPRIMIDOS",
      "PREFERIDO NA SCA COM ANGIOPLASTIA OU ESTRATÉGIA INVASIVA: ATAQUE DE 180 MG (02 COMPRIMIDOS) VIA ORAL; DEPOIS 90 MG DE 12/12H. IAM COM SUPRA: DAR NO DIAGNÓSTICO OU ATÉ A ANGIOPLASTIA PRIMÁRIA. SCA SEM SUPRA: SE O CATETERISMO FOR EM ATÉ 24 H, AGUARDAR A ANATOMIA; SE DEMORAR MAIS DE 24 H E SEM ALTO RISCO DE SANGRAMENTO, DAR O ATAQUE. NÃO USAR APÓS TROMBÓLISE, COM AVC HEMORRÁGICO PRÉVIO, SANGRAMENTO ATIVO OU ANTICOAGULANTE ORAL (USAR CLOPIDOGREL). PODE CAUSAR DISPNEIA E BRADICARDIA",
      "USO ORAL"
     ],
     [
      "CLOPIDOGREL 75 MG",
      "08 COMPRIMIDOS",
      "USAR SE TROMBÓLISE, ANTICOAGULANTE ORAL, AVC HEMORRÁGICO PRÉVIO OU SEM TICAGRELOR DISPONÍVEL: ATAQUE DE 300 MG (04 COMPRIMIDOS) VIA ORAL; SE ANGIOPLASTIA, 600 MG (08 COMPRIMIDOS); SE TROMBÓLISE EM MAIOR DE 75 ANOS, SÓ 75 MG (SEM ATAQUE). DEPOIS 75 MG 01 VEZ AO DIA. SCA SEM SUPRA COM CATETERISMO EM ATÉ 24 H: AGUARDAR A ANATOMIA",
      "USO ORAL"
     ]
    ]
   },
   {
    "label": "Padrão — Dor anginosa: nitrato — escolha 1",
    "mode": "internacao",
    "draft": true,
    "menu": true,
    "items": [
     [
      "DINITRATO DE ISOSSORBIDA 5 MG",
      "03 COMPRIMIDOS",
      "COLOCAR 01 COMPRIMIDO EMBAIXO DA LÍNGUA SE DOR; PODE REPETIR A CADA 5 MINUTOS ATÉ 03 DOSES, SE A PA PERMITIR. NÃO USAR SE PAS < 90 MMHG, INFARTO DE VENTRÍCULO DIREITO, SILDENAFILA NAS ÚLTIMAS 24 H OU TADALAFILA NAS ÚLTIMAS 48 H",
      "USO SUBLINGUAL"
     ],
     [
      "NITROGLICERINA 5 MG/ML (TRIDIL®) SOLUÇÃO INJETÁVEL",
      "01 AMPOLA 10 ML",
      "SE DOR PERSISTENTE, HIPERTENSÃO OU CONGESTÃO: INFUNDIR EM BOMBA — DILUIÇÃO, DOSE E VAZÃO PELA ABA CALCULADORAS › NITROGLICERINA. NÃO USAR SE PAS < 90 MMHG, INFARTO DE VENTRÍCULO DIREITO, SILDENAFILA NAS ÚLTIMAS 24 H OU TADALAFILA NAS ÚLTIMAS 48 H",
      "USO ENDOVENOSO"
     ]
    ]
   },
   {
    "label": "Padrão — Anticoagulação (SCA confirmada, conforme a estratégia)",
    "mode": "internacao",
    "draft": true,
    "items": [
     [
      "ENOXAPARINA SÓDICA (SERINGAS DE 40, 60, 80 E 100 MG)",
      "CONFORME A DOSE",
      "SCA SEM SUPRA: 1 MG/KG SC DE 12/12H (CLCR < 30: 1 MG/KG 01 VEZ AO DIA). DOSE PELO PESO E ESQUEMA DO IAM COM FIBRINÓLISE NA ABA CALCULADORAS › EMERGÊNCIA › ANTICOAGULAÇÃO",
      "USO SUBCUTÂNEO"
     ]
    ]
   },
   {
    "label": "Padrão — Estatina de alta potência",
    "mode": "internacao",
    "draft": true,
    "items": [
     [
      "ATORVASTATINA 80 MG",
      "01 COMPRIMIDO",
      "TOMAR 01 COMPRIMIDO VIA ORAL 01 VEZ AO DIA, INICIANDO NA ADMISSÃO",
      "USO ORAL"
     ]
    ]
   },
   {
    "label": "Padrão — Dor refratária aos nitratos",
    "mode": "internacao",
    "draft": true,
    "items": [
     [
      "MORFINA 10 MG/ML SOLUÇÃO INJETÁVEL",
      "01 AMPOLA 1 ML",
      "DILUIR 01 AMPOLA EM 9 ML DE SF 0,9% (1 MG/ML). ADMINISTRAR 2 A 3 MG EV LENTO A CADA 05-10 MIN ATÉ DOR ≤ 4 OU SONOLÊNCIA (MÁXIMO 15 MG NA TITULAÇÃO); DEPOIS 2 A 4 MG EV ATÉ DE 4/4H SE DOR. IDOSO OU DOENÇA RENAL: 1 A 2 MG POR DOSE",
      "USO ENDOVENOSO"
     ]
    ]
   },
   {
    "label": "Padrão — Dor torácica de baixo risco após avaliação (ECG e troponina normais), causa musculoesquelética: analgésico — escolha 1",
    "draft": true,
    "menu": true,
    "items": [
     [
      "DIPIRONA 500 MG",
      "01 CAIXA",
      "TOMAR 02 COMPRIMIDOS SE DOR OU FEBRE, PODENDO REPETIR DE 6/6H"
     ],
     [
      "PARACETAMOL 750 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO SE DOR OU FEBRE, PODENDO REPETIR DE 6/6H. INTERCALAR COM DIPIRONA, SE NECESSÁRIO."
     ],
     [
      "IBUPROFENO 300 MG",
      "01 CAIXA",
      "TOMAR 02 COMPRIMIDOS DE 6/6H POR 05 DIAS"
     ]
    ],
    "orient": [
     "ESTA RECEITA É PARA DOR DE ORIGEM MUSCULAR OU DAS COSTELAS, DEPOIS DE AFASTADO PROBLEMA DO CORAÇÃO NO ATENDIMENTO",
     "PROCURAR A UNIDADE DE SAÚDE PARA CONSULTA DE RETORNO E CONTROLE DOS FATORES DE RISCO (PRESSÃO, DIABETES, COLESTEROL, CIGARRO)",
     "LIGAR 192 (SAMU) OU RETORNAR IMEDIATAMENTE SE A DOR VOLTAR EM APERTO OU PESO NO PEITO, IRRADIAR PARA BRAÇO, PESCOÇO OU MANDÍBULA, VIER COM SUOR FRIO, FALTA DE AR, DESMAIO OU PALPITAÇÃO"
    ]
   },
   {
    "label": "Do material do Drive — Betabloqueador oral nas primeiras 24 h (sem IC, choque ou BAV)",
    "mode": "internacao",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "METOPROLOL (SUCCINATO) 25 MG COMPRIMIDO DE LIBERAÇÃO PROLONGADA",
      "01 COMPRIMIDO",
      "TOMAR 01 COMPRIMIDO VIA ORAL 01 VEZ AO DIA, INICIANDO NAS PRIMEIRAS 24 H SE ESTÁVEL; AJUSTAR PELA FC E PA. NÃO USAR SE SINAIS DE IC, BAIXO DÉBITO, RISCO DE CHOQUE, FC < 60, BAV, BRONCOESPASMO OU USO DE COCAÍNA",
      "USO ORAL"
     ]
    ]
   }
  ]
 },
 {
  "id": "dpoc",
  "ic": "🫁",
  "nm": "DPOC descompensada",
  "sub": "prednisona · salbutamol · amoxicilina-clavulanato · doxiciclina",
  "blocks": [
   {
    "label": "Padrão — Corticoide oral por 05 dias",
    "draft": true,
    "items": [
     [
      "PREDNISONA 20 MG",
      "10 COMPRIMIDOS",
      "TOMAR 02 COMPRIMIDOS PELA MANHÃ, APÓS O CAFÉ, POR 05 DIAS"
     ]
    ],
    "orient": [
     "CONSULTA NA UBS EM ATÉ 02 SEMANAS PARA REVISAR A TÉCNICA INALATÓRIA E INICIAR/AJUSTAR O BRONCODILATADOR DE MANUTENÇÃO (LAMA/LABA)",
     "PARAR DE FUMAR (O SUS OFERECE TRATAMENTO GRATUITO) E MANTER AS VACINAS EM DIA: INFLUENZA, PNEUMOCÓCICA E COVID-19",
     "RETORNAR IMEDIATAMENTE SE PIORA DA FALTA DE AR, DIFICULDADE PARA FALAR, LÁBIOS ROXOS, SONOLÊNCIA OU CONFUSÃO, DOR NO PEITO OU FEBRE PERSISTENTE"
    ]
   },
   {
    "label": "Padrão — Broncodilatador de resgate",
    "draft": true,
    "items": [
     [
      "SALBUTAMOL SPRAY AEROSSOL 100 MCG",
      "01 FRASCO",
      "INALAR 02 A 04 JATOS COM ESPAÇADOR SE FALTA DE AR OU CHIADO, PODENDO REPETIR DE 4/4H. SE PRECISAR EM INTERVALO MENOR OU NÃO MELHORAR, RETORNAR À EMERGÊNCIA",
      "USO INALATÓRIO"
     ]
    ]
   },
   {
    "label": "Padrão — Antibiótico se escarro purulento (doxiciclina se alergia à penicilina) — escolha 1",
    "draft": true,
    "menu": true,
    "items": [
     [
      "AMOXICILINA 500 MG + CLAVULANATO 125 MG",
      "15 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO DE 8/8H, APÓS AS REFEIÇÕES, POR 05 DIAS"
     ],
     [
      "DOXICICLINA 100 MG",
      "10 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO DE 12/12H POR 05 DIAS, COM UM COPO DE ÁGUA, SEM DEITAR NOS 30 MINUTOS SEGUINTES"
     ]
    ]
   },
   {
    "label": "Combinação pronta — prednisona 40 mg + SABA + amoxicilina-clavulanato",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "AMOXICILINA 500 MG + CLAVULANATO 125 MG",
      "15 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO DE 8/8H, APÓS AS REFEIÇÕES, POR 05 DIAS"
     ],
     [
      "PREDNISONA 20 MG",
      "10 COMPRIMIDOS",
      "TOMAR 02 COMPRIMIDOS PELA MANHÃ, APÓS O CAFÉ, POR 05 DIAS"
     ],
     [
      "SALBUTAMOL SPRAY AEROSSOL 100 MCG",
      "01 FRASCO",
      "INALAR 02 A 04 JATOS COM ESPAÇADOR SE FALTA DE AR OU CHIADO, PODENDO REPETIR DE 4/4H. SE PRECISAR EM INTERVALO MENOR OU NÃO MELHORAR, RETORNAR À EMERGÊNCIA",
      "USO INALATÓRIO"
     ]
    ]
   },
   {
    "label": "Combinação pronta — alergia à penicilina",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "DOXICICLINA 100 MG",
      "10 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO DE 12/12H POR 05 DIAS, COM UM COPO DE ÁGUA, SEM DEITAR NOS 30 MINUTOS SEGUINTES"
     ],
     [
      "PREDNISONA 20 MG",
      "10 COMPRIMIDOS",
      "TOMAR 02 COMPRIMIDOS PELA MANHÃ, APÓS O CAFÉ, POR 05 DIAS"
     ],
     [
      "SALBUTAMOL SPRAY AEROSSOL 100 MCG",
      "01 FRASCO",
      "INALAR 02 A 04 JATOS COM ESPAÇADOR SE FALTA DE AR OU CHIADO, PODENDO REPETIR DE 4/4H. SE PRECISAR EM INTERVALO MENOR OU NÃO MELHORAR, RETORNAR À EMERGÊNCIA",
      "USO INALATÓRIO"
     ]
    ]
   },
   {
    "label": "Analgésico/antitérmico — escolha 1",
    "sec": "offlabel",
    "menu": true,
    "items": [
     [
      "DIPIRONA 500 MG",
      "01 CAIXA",
      "TOMAR 02 COMPRIMIDOS SE DOR OU FEBRE, PODENDO REPETIR DE 6/6H"
     ],
     [
      "PARACETAMOL 750 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO SE DOR OU FEBRE, PODENDO REPETIR DE 6/6H. INTERCALAR COM DIPIRONA, SE NECESSÁRIO."
     ]
    ]
   },
   {
    "label": "Padrão — O2 controlado + broncodilatador + prednisona 40 mg + profilaxia de TEV",
    "mode": "internacao",
    "draft": true,
    "items": [
     [
      "OXIGÊNIO SUPLEMENTAR",
      "CONFORME NECESSIDADE",
      "ADMINISTRAR O2 POR MÁSCARA DE VENTURI 24-28% OU CATETER NASAL 1-2 L/MIN, TITULANDO PARA SATURAÇÃO DE 88-92%",
      "USO INALATÓRIO"
     ],
     [
      "BROMIDRATO DE FENOTEROL 5 MG/ML SOLUÇÃO PARA INALAÇÃO (GOTAS)",
      "10 GOTAS",
      "NEBULIZAR 10 GOTAS (2,5 MG) JUNTO COM O IPRATRÓPIO EM 3-5 ML DE SF 0,9%, DE 20/20 MIN NA 1ª HORA (ATÉ 3 VEZES), DEPOIS DE 4/4H E SE DISPNEIA. SE HIPERCAPNIA, NEBULIZAR COM AR COMPRIMIDO E MANTER O O2 POR CATETER",
      "USO INALATÓRIO"
     ],
     [
      "BROMETO DE IPRATRÓPIO 0,25 MG/ML SOLUÇÃO PARA INALAÇÃO (GOTAS)",
      "40 GOTAS",
      "NEBULIZAR 40 GOTAS (0,5 MG) JUNTO COM O FENOTEROL, DE 20/20 MIN NA 1ª HORA (ATÉ 3 VEZES), DEPOIS DE 6/6H",
      "USO INALATÓRIO"
     ],
     [
      "PREDNISONA 20 MG",
      "02 COMPRIMIDOS",
      "TOMAR 02 COMPRIMIDOS (40 MG) VIA ORAL 01 VEZ AO DIA, PELA MANHÃ, POR 05 DIAS",
      "USO ORAL"
     ],
     [
      "ENOXAPARINA SÓDICA 40 MG/0,4 ML SOLUÇÃO INJETÁVEL",
      "01 SERINGA PREENCHIDA",
      "APLICAR 40 MG SC 01 VEZ AO DIA DURANTE A INTERNAÇÃO (PROFILAXIA DE TEV); CLEARANCE DE CREATININA < 30 ML/MIN: 20 MG 01 VEZ AO DIA. NÃO USAR SE SANGRAMENTO ATIVO OU PLAQUETAS < 50.000",
      "USO SUBCUTÂNEO"
     ]
    ],
    "orient": [
     "MONITORIZAR SATURAÇÃO CONTÍNUA, FR, FC E NÍVEL DE CONSCIÊNCIA; GASOMETRIA ARTERIAL NA ADMISSÃO E 30-60 MIN APÓS AJUSTE DO O2 (EVITAR HIPEROXIA — RISCO DE HIPERCAPNIA)",
     "VNI SE PH ≤ 7,35 COM PACO2 ≥ 45 MMHG, DISPNEIA GRAVE COM FADIGA OU USO DE MUSCULATURA ACESSÓRIA, OU HIPOXEMIA PERSISTENTE APESAR DO O2",
     "UTI/IOT SE FALHA OU INTOLERÂNCIA À VNI, REBAIXAMENTO DO NÍVEL DE CONSCIÊNCIA, INSTABILIDADE HEMODINÂMICA, ARRITMIA GRAVE OU PARADA RESPIRATÓRIA",
     "INVESTIGAR PNEUMONIA, TEP, INSUFICIÊNCIA CARDÍACA E PNEUMOTÓRAX (RX DE TÓRAX, ECG, HEMOGRAMA, ELETRÓLITOS); CONTROLAR GLICEMIA DURANTE O CORTICOIDE",
     "CABECEIRA ELEVADA, FISIOTERAPIA E MOBILIZAÇÃO PRECOCE; NA ALTA: LAMA/LABA, REVISÃO DA TÉCNICA INALATÓRIA, CESSAÇÃO DO TABAGISMO, VACINAS E REABILITAÇÃO PULMONAR"
    ]
   },
   {
    "label": "Padrão — antibiótico (escarro purulento + piora da dispneia ou do volume, ou VNI/IOT) — escolha 1",
    "mode": "internacao",
    "draft": true,
    "menu": true,
    "items": [
     [
      "AMOXICILINA 1 G + CLAVULANATO DE POTÁSSIO 200 MG PÓ PARA SOLUÇÃO INJETÁVEL",
      "01 FRASCO-AMPOLA",
      "ADMINISTRAR 1 G + 200 MG EV DE 8/8H, DILUÍDO EM 100 ML DE SF 0,9%, EM 30 MINUTOS, POR 05 DIAS (PASSAR PARA VIA ORAL ASSIM QUE ESTÁVEL)",
      "USO ENDOVENOSO"
     ],
     [
      "CEFTRIAXONA 1 G PÓ PARA SOLUÇÃO INJETÁVEL",
      "01 FRASCO-AMPOLA",
      "ADMINISTRAR 1 G EV 01 VEZ AO DIA, DILUÍDO EM 100 ML DE SF 0,9%, EM 30 MINUTOS, POR 05 DIAS",
      "USO ENDOVENOSO"
     ],
     [
      "AMOXICILINA 500 MG + CLAVULANATO 125 MG",
      "01 COMPRIMIDO",
      "SE TOLERAR VIA ORAL: TOMAR 01 COMPRIMIDO DE 8/8H, APÓS AS REFEIÇÕES, POR 05 DIAS",
      "USO ORAL"
     ]
    ],
    "orient": [
     "INDICAR SE AUMENTO DA PURULÊNCIA DO ESCARRO COM AUMENTO DA DISPNEIA E/OU DO VOLUME, OU SE NECESSITAR DE VNI/IOT; DURAÇÃO DE 05 DIAS",
     "COLHER CULTURA DE ESCARRO (E HEMOCULTURAS SE FEBRE OU GRAVIDADE) ANTES DA 1ª DOSE; PNEUMONIA ASSOCIADA SEGUE O PROTOCOLO DE PAC"
    ]
   },
   {
    "label": "Risco de Pseudomonas (VEF1 < 30%, bronquiectasias, ATB ou internação recente, isolamento prévio) — escolha 1",
    "mode": "internacao",
    "sec": "offlabel",
    "draft": true,
    "menu": true,
    "items": [
     [
      "CEFEPIMA 1 G PÓ PARA SOLUÇÃO INJETÁVEL",
      "02 FRASCOS-AMPOLA",
      "ADMINISTRAR 2 G EV DE 8/8H, DILUÍDO EM 100 ML DE SF 0,9%, EM 30 MINUTOS, POR 05 A 07 DIAS (AJUSTAR À FUNÇÃO RENAL)",
      "USO ENDOVENOSO"
     ],
     [
      "PIPERACILINA 4 G + TAZOBACTAM 500 MG PÓ PARA SOLUÇÃO INJETÁVEL",
      "01 FRASCO-AMPOLA",
      "ADMINISTRAR 4,5 G EV DE 6/6H, DILUÍDO EM 100 ML DE SF 0,9%, EM 30 MINUTOS (OU INFUSÃO ESTENDIDA EM 4 HORAS), POR 05 A 07 DIAS (AJUSTAR À FUNÇÃO RENAL)",
      "USO ENDOVENOSO"
     ],
     [
      "LEVOFLOXACINO 5 MG/ML SOLUÇÃO INJETÁVEL (BOLSA 150 ML)",
      "01 BOLSA 150 ML",
      "ADMINISTRAR 750 MG EV 01 VEZ AO DIA, EM 90 MINUTOS, POR 05 DIAS (AJUSTAR À FUNÇÃO RENAL)",
      "USO ENDOVENOSO"
     ]
    ],
    "orient": [
     "COLHER CULTURA DE ESCARRO ANTES E DESCALONAR CONFORME O RESULTADO EM 48-72 HORAS"
    ]
   },
   {
    "label": "Alergia grave a betalactâmico — escolha 1",
    "mode": "internacao",
    "sec": "offlabel",
    "draft": true,
    "menu": true,
    "items": [
     [
      "LEVOFLOXACINO 500 MG",
      "01 COMPRIMIDO",
      "TOMAR 01 COMPRIMIDO VIA ORAL 01 VEZ AO DIA POR 05 DIAS (SEM VIA ORAL: 500 MG EV 01 VEZ AO DIA)",
      "USO ORAL"
     ],
     [
      "DOXICICLINA 100 MG",
      "01 COMPRIMIDO",
      "TOMAR 01 COMPRIMIDO DE 12/12H POR 05 DIAS, COM UM COPO DE ÁGUA, SEM DEITAR NOS 30 MINUTOS SEGUINTES",
      "USO ORAL"
     ]
    ],
    "orient": [
     "FLUOROQUINOLONA: RISCO DE TENDINOPATIA, ARRITMIA (QT LONGO) E DELIRIUM EM IDOSOS"
    ]
   },
   {
    "label": "Sem via oral (corticoide EV)",
    "mode": "internacao",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "METILPREDNISOLONA (SUCCINATO SÓDICO) 40 MG PÓ PARA SOLUÇÃO INJETÁVEL",
      "01 FRASCO-AMPOLA",
      "ADMINISTRAR 40 MG EV 01 VEZ AO DIA ATÉ TOLERAR VIA ORAL, COMPLETANDO 05 DIAS DE CORTICOIDE COM PREDNISONA 40 MG (SUBSTITUI A PREDNISONA; NÃO ASSOCIAR)",
      "USO ENDOVENOSO"
     ]
    ]
   },
   {
    "label": "Do material do Drive — Escarro purulento: amoxicilina-clavulanato 875/125 mg de 12/12h",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "AMOXICILINA 875 MG + CLAVULANATO 125 MG",
      "10 COMPRIMIDOS",
      "SE ESCARRO PURULENTO: TOMAR 01 COMPRIMIDO DE 12/12H, NO INÍCIO DAS REFEIÇÕES, POR 05 DIAS. HORÁRIO SUGERIDO: 08:00 / 20:00",
      "USO ORAL"
     ]
    ]
   },
   {
    "label": "Do material do Drive — Risco de Pseudomonas ou alergia grave a betalactâmico: levofloxacino 750 mg",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "LEVOFLOXACINO 750 MG",
      "05 COMPRIMIDOS",
      "SE RISCO DE PSEUDOMONAS OU ALERGIA GRAVE A BETALACTÂMICO: TOMAR 01 COMPRIMIDO AO DIA, NO MESMO HORÁRIO, POR 05 DIAS. AJUSTAR SE CLCR < 50 ML/MIN. RISCO DE TENDINITE, ARRITMIA E CONFUSÃO EM IDOSOS",
      "USO ORAL"
     ]
    ]
   }
  ]
 },
 {
  "id": "eczema",
  "ic": "🧴",
  "nm": "Eczema de contato",
  "sub": "betametasona · hidrocortisona · loratadina",
  "blocks": [
   {
    "label": "Padrão — Corticoide tópico (hidrocortisona no rosto, pálpebras e dobras) — escolha 1",
    "draft": true,
    "menu": true,
    "items": [
     [
      "VALERATO DE BETAMETASONA 1 MG/G CREME",
      "01 BISNAGA",
      "APLICAR UMA FINA CAMADA SOBRE A ÁREA AFETADA DE 12/12H POR 07 A 14 DIAS. NÃO APLICAR NO ROSTO, AXILAS OU VIRILHAS",
      "USO TÓPICO"
     ],
     [
      "ACETATO DE HIDROCORTISONA 10 MG/G CREME",
      "01 BISNAGA",
      "APLICAR UMA FINA CAMADA SOBRE A ÁREA AFETADA DE 12/12H POR ATÉ 07 DIAS",
      "USO TÓPICO"
     ]
    ],
    "orient": [
     "IDENTIFICAR E EVITAR O CONTATO COM A SUBSTÂNCIA SUSPEITA (BIJUTERIAS/NÍQUEL, COSMÉTICOS, PERFUMES, TINTURAS DE CABELO, PRODUTOS DE LIMPEZA, LUVAS DE BORRACHA, PLANTAS)",
     "LAVAR A PELE APENAS COM ÁGUA E SABONETE NEUTRO E HIDRATAR VÁRIAS VEZES AO DIA COM CREME OU VASELINA SEM PERFUME",
     "RETORNAR SE FEBRE, PUS, CROSTAS AMARELADAS, BOLHAS EXTENSAS, LESÕES EM OLHOS, BOCA OU GENITAIS, OU SE NÃO HOUVER MELHORA EM 14 DIAS",
     "SE CASOS REPETIDOS OU RELACIONADOS AO TRABALHO: ENCAMINHAR À DERMATOLOGIA PARA TESTE DE CONTATO (PATCH TEST)"
    ]
   },
   {
    "label": "Padrão — Anti-histamínico se coceira — escolha 1",
    "draft": true,
    "menu": true,
    "items": [
     [
      "LORATADINA 10 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO AO DIA, NO MESMO HORÁRIO, POR 05 DIAS APÓS ESTE PERÍODO, TOMAR 01 COMPRIMIDO SE COCEIRA, PODENDO REPETIR A DOSE 24/24H SE NECESSÁRIO"
     ],
     [
      "CETIRIZINA 10MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO AO DIA, NO MESMO HORÁRIO, POR 05 DIAS APÓS ESTE PERÍODO, TOMAR 01 COMPRIMIDO SE COCEIRA OU ESPIRROS, PODENDO REPETIR A DOSE 24/24H SE NECESSÁRIO"
     ]
    ]
   },
   {
    "label": "Padrão — extensa (>20% da pele) ou grave: corticoide oral com desmame",
    "draft": true,
    "items": [
     [
      "PREDNISONA 20 MG",
      "21 COMPRIMIDOS",
      "TOMAR 02 COMPRIMIDOS PELA MANHÃ, APÓS O CAFÉ, POR 07 DIAS. DEPOIS, 01 COMPRIMIDO PELA MANHÃ POR MAIS 07 DIAS"
     ]
    ]
   },
   {
    "label": "Combinação pronta — corticoide tópico de média/alta potência (corpo) + anti-histamínico",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "VALERATO DE BETAMETASONA 1 MG/G CREME",
      "01 BISNAGA",
      "APLICAR UMA FINA CAMADA SOBRE A ÁREA AFETADA DE 12/12H POR 07 A 14 DIAS. NÃO APLICAR NO ROSTO, AXILAS OU VIRILHAS",
      "USO TÓPICO"
     ],
     [
      "LORATADINA 10 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO AO DIA, NO MESMO HORÁRIO, POR 05 DIAS APÓS ESTE PERÍODO, TOMAR 01 COMPRIMIDO SE COCEIRA, PODENDO REPETIR A DOSE 24/24H SE NECESSÁRIO"
     ]
    ]
   },
   {
    "label": "Combinação pronta — rosto, pálpebras ou dobras: trocar por corticoide de baixa potência",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "ACETATO DE HIDROCORTISONA 10 MG/G CREME",
      "01 BISNAGA",
      "APLICAR UMA FINA CAMADA SOBRE A ÁREA AFETADA DE 12/12H POR ATÉ 07 DIAS",
      "USO TÓPICO"
     ]
    ]
   },
   {
    "label": "Eczema espesso de mãos ou pés — clobetasol (alta potência, até 02 semanas) + loratadina",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "PROPIONATO DE CLOBETASOL 0,5 MG/G (0,05%) CREME",
      "01 BISNAGA",
      "APLICAR UMA FINA CAMADA SOMENTE NAS LESÕES ESPESSAS DO CORPO, MÃOS OU PÉS, 01 A 02 VEZES AO DIA, POR NO MÁXIMO 02 SEMANAS. NÃO APLICAR NO ROSTO, AXILAS, VIRILHAS OU ÁREA DA FRALDA",
      "USO TÓPICO"
     ],
     [
      "LORATADINA 10 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO AO DIA, NO MESMO HORÁRIO, POR 05 DIAS APÓS ESTE PERÍODO, TOMAR 01 COMPRIMIDO SE COCEIRA, PODENDO REPETIR A DOSE 24/24H SE NECESSÁRIO"
     ]
    ]
   },
   {
    "label": "Anti-histamínico — escolha 1",
    "sec": "offlabel",
    "menu": true,
    "items": [
     [
      "LORATADINA 10 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO AO DIA, NO MESMO HORÁRIO, POR 05 DIAS APÓS ESTE PERÍODO, TOMAR 01 COMPRIMIDO SE COCEIRA OU ESPIRROS, PODENDO REPETIR A DOSE 24/24H SE NECESSÁRIO"
     ],
     [
      "CETIRIZINA 10MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO AO DIA, NO MESMO HORÁRIO, POR 05 DIAS APÓS ESTE PERÍODO, TOMAR 01 COMPRIMIDO SE COCEIRA OU ESPIRROS, PODENDO REPETIR A DOSE 24/24H SE NECESSÁRIO"
     ]
    ]
   },
   {
    "label": "Padrão — dermatite extensa/grave: corticoide sistêmico + tópico + antipruriginoso",
    "mode": "internacao",
    "draft": true,
    "items": [
     [
      "PREDNISONA 20 MG",
      "02 COMPRIMIDOS",
      "ADMINISTRAR 40 MG (02 COMPRIMIDOS) VO 01 VEZ AO DIA PELA MANHÃ (0,5 A 1 MG/KG/DIA, MÁXIMO 60 MG/DIA); NA ALTA, MANTER COM DESMAME GRADUAL ATÉ COMPLETAR 2 A 3 SEMANAS",
      "USO ORAL"
     ],
     [
      "VALERATO DE BETAMETASONA 1 MG/G CREME",
      "01 BISNAGA",
      "APLICAR UMA FINA CAMADA SOBRE AS LESÕES DO CORPO DE 12/12H. NÃO APLICAR NO ROSTO, AXILAS OU VIRILHAS (NESSAS ÁREAS, ACETATO DE HIDROCORTISONA 10 MG/G CREME)",
      "USO TÓPICO"
     ],
     [
      "HIDROXIZINA 25 MG",
      "01 COMPRIMIDO",
      "ADMINISTRAR 01 COMPRIMIDO VO À NOITE, PODENDO REPETIR ATÉ DE 8/8H SE PRURIDO INTENSO (CAUSA SONOLÊNCIA; CAUTELA EM IDOSOS)",
      "USO ORAL"
     ]
    ],
    "orient": [
     "AFASTAR O CONTACTANTE SUSPEITO; COMPRESSAS FRIAS COM SF 0,9% POR 15 MINUTOS, 3 A 4 VEZES AO DIA, NAS LESÕES EXSUDATIVAS E EMOLIENTE SEM PERFUME NAS ÁREAS SECAS",
     "MONITORAR GLICEMIA CAPILAR E PRESSÃO ARTERIAL DURANTE A CORTICOTERAPIA SISTÊMICA, ESPECIALMENTE EM DIABÉTICOS E HIPERTENSOS",
     "DESMAME DO CORTICOIDE EM 2 A 3 SEMANAS: CURSOS CURTOS (MENOS DE 7 DIAS) CAUSAM REBOTE DA DERMATITE",
     "VIGIAR INFECÇÃO SECUNDÁRIA: DOR, CALOR, PUS, CROSTAS AMARELADAS OU FEBRE",
     "FEBRE, ERITRODERMIA, BOLHAS COM DESCOLAMENTO DA PELE, LESÕES EM MUCOSAS OU EM ALVO, EDEMA FACIAL OU EOSINOFILIA: AFASTAR FARMACODERMIA GRAVE (SSJ/NET, DRESS) E ACIONAR DERMATOLOGIA"
    ]
   },
   {
    "label": "Eczema infectado / celulite associada — escolha 1",
    "mode": "internacao",
    "sec": "offlabel",
    "draft": true,
    "menu": true,
    "items": [
     [
      "CEFAZOLINA 1 G PÓ PARA SOLUÇÃO INJETÁVEL",
      "01 FRASCO-AMPOLA",
      "ADMINISTRAR 1 G EV DE 8/8H, DILUÍDO EM 100 ML DE SF 0,9%, EM 30 MINUTOS; APÓS 48-72H AFEBRIL E COM MELHORA, TROCAR POR CEFALEXINA VO DE 6/6H — 1 G SE CELULITE, 500 MG SE APENAS ECZEMA IMPETIGINIZADO (TOTAL 05 A 07 DIAS)",
      "USO ENDOVENOSO"
     ],
     [
      "CLINDAMICINA 150 MG/ML SOLUÇÃO INJETÁVEL",
      "01 AMPOLA 4 ML",
      "ADMINISTRAR 600 MG (4 ML) EV DE 8/8H, DILUÍDO EM 100 ML DE SF 0,9%, EM 30 MINUTOS (ALERGIA A BETALACTÂMICO OU SUSPEITA DE MRSA)",
      "USO ENDOVENOSO"
     ]
    ],
    "orient": [
     "DELIMITAR A ÁREA DE ERITEMA COM CANETA E REAVALIAR A PROGRESSÃO A CADA 24H; COLHER CULTURA DA SECREÇÃO SE LESÃO PURULENTA"
    ]
   },
   {
    "label": "Padrão — corticoide tópico conforme o local — escolha 1",
    "mode": "ped",
    "draft": true,
    "menu": true,
    "items": [
     [
      "VALERATO DE BETAMETASONA 1 MG/G CREME",
      "01 BISNAGA",
      "APLICAR UMA FINA CAMADA SOBRE A ÁREA AFETADA DO CORPO DE 12/12H POR ATÉ 07 DIAS (MAIORES DE 2 ANOS). NÃO APLICAR NO ROSTO, DOBRAS OU ÁREA DA FRALDA",
      "USO TÓPICO"
     ],
     [
      "ACETATO DE HIDROCORTISONA 10 MG/G CREME",
      "01 BISNAGA",
      "APLICAR UMA FINA CAMADA SOBRE A ÁREA AFETADA DE 12/12H POR ATÉ 07 DIAS (ROSTO, PÁLPEBRAS, DOBRAS, ÁREA DA FRALDA OU MENORES DE 2 ANOS)",
      "USO TÓPICO"
     ]
    ],
    "orient": [
     "IDENTIFICAR E AFASTAR O AGENTE SUSPEITO (BIJUTERIAS/NÍQUEL, COSMÉTICOS, PERFUMES, SABONETES, LENÇOS UMEDECIDOS, FRALDA, PLANTAS, TATUAGEM DE HENNA PRETA)",
     "BANHOS RÁPIDOS E MORNOS COM SABONETE NEUTRO E HIDRATANTE SEM PERFUME VÁRIAS VEZES AO DIA; MANTER AS UNHAS CURTAS",
     "NÃO USAR O CORTICOIDE POR MAIS DE 07 DIAS SEM REAVALIAÇÃO E NÃO COBRIR A ÁREA TRATADA",
     "RETORNAR SE FEBRE, PUS, CROSTAS AMARELADAS, BOLHAS EXTENSAS, LESÕES EM OLHOS, BOCA OU GENITAIS, OU SE NÃO HOUVER MELHORA EM 07 DIAS",
     "CASOS REPETIDOS: ENCAMINHAR À DERMATOLOGIA PARA TESTE DE CONTATO (PATCH TEST)"
    ]
   },
   {
    "label": "Padrão — anti-histamínico oral se coceira (maiores de 2 anos) — escolha 1",
    "mode": "ped",
    "draft": true,
    "menu": true,
    "items": [
     [
      "LORATADINA 1 MG/ML XAROPE",
      "01 FRASCO",
      "DAR {FAIXA}, ENQUANTO HOUVER COCEIRA (ATÉ 07 DIAS)",
      "USO ORAL",
      {
       "sem_peso": "5 ML (5 MG) VIA ORAL 01 VEZ AO DIA SE PESO ATÉ 30 KG, OU 10 ML (10 MG) SE PESO MAIOR QUE 30 KG",
       "faixas": [
        {
         "ate": 30,
         "txt": "5 ML (5 MG) VIA ORAL 01 VEZ AO DIA"
        },
        {
         "acima": 30,
         "txt": "10 ML (10 MG) VIA ORAL 01 VEZ AO DIA"
        }
       ]
      }
     ],
     [
      "DEXCLORFENIRAMINA 2 MG/5 ML XAROPE",
      "01 FRASCO",
      "DAR {DOSE} VIA ORAL DE 8/8H SE COCEIRA (0,15 MG/KG/DIA); PREFERIR À NOITE SE A COCEIRA ATRAPALHAR O SONO (CAUSA SONOLÊNCIA)",
      "USO ORAL",
      {
       "kgdia": 0.15,
       "vezes": 3,
       "conc": 0.4,
       "un": "ML",
       "max": 2
      }
     ]
    ]
   },
   {
    "label": "Padrão — extensa (> 20% da pele) ou grave: prednisolona oral com desmame",
    "mode": "ped",
    "draft": true,
    "items": [
     [
      "PREDNISOLONA 3 MG/ML SOLUÇÃO ORAL",
      "01 FRASCO",
      "DAR {DOSE} VIA ORAL 01 VEZ AO DIA PELA MANHÃ, APÓS O CAFÉ, POR 07 DIAS (1 MG/KG/DIA); DEPOIS, METADE DESSA DOSE POR MAIS 07 DIAS",
      "USO ORAL",
      {
       "kg": 1,
       "conc": 3,
       "un": "ML",
       "max": 40
      }
     ]
    ]
   }
  ]
 },
 {
  "id": "edema_agudo_pulmao",
  "ic": "🫁",
  "nm": "Edema agudo de pulmão / IC descompensada",
  "sub": "furosemida · isossorbida · nitroglicerina · ventilação não invasiva",
  "blocks": [
   {
    "label": "Padrão — Diurético EV",
    "mode": "internacao",
    "draft": true,
    "items": [
     [
      "FUROSEMIDA 10 MG/ML SOLUÇÃO INJETÁVEL",
      "02 AMPOLAS 2 ML",
      "SEM USO PRÉVIO DE DIURÉTICO: 20 A 40 MG (02 A 04 ML) EV EM BOLUS; SE JÁ USA FUROSEMIDA ORAL: 1 A 2 VEZES A DOSE ORAL DIÁRIA, EV. REAVALIAR DIURESE EM 2 A 6 HORAS E REPETIR OU DOBRAR SE RESPOSTA INSUFICIENTE",
      "USO ENDOVENOSO"
     ]
    ],
    "orient": [
     "AVALIAR A RESPOSTA AO DIURÉTICO: SÓDIO URINÁRIO 2H APÓS A DOSE (< 50–70 MEQ/L = RESPOSTA INSUFICIENTE) E/OU DIURESE NAS PRIMEIRAS 6H (< 100–150 ML/H = INSUFICIENTE) — SE INSUFICIENTE, DOBRAR A DOSE EV",
     "CONGESTÃO PERSISTENTE APESAR DA DOSE DOBRADA: BLOQUEIO SEQUENCIAL DO NÉFRON, ASSOCIANDO TIAZÍDICO OU ACETAZOLAMIDA À FUROSEMIDA (VER OUTRAS OPÇÕES)",
     "MONITORAR DIURESE, PESO DIÁRIO, CREATININA, SÓDIO E POTÁSSIO A CADA 12–24H NOS PRIMEIROS DIAS"
    ]
   },
   {
    "label": "Padrão — Vasodilatador se PAS > 110 mmHg — escolha 1",
    "mode": "internacao",
    "draft": true,
    "menu": true,
    "items": [
     [
      "DINITRATO DE ISOSSORBIDA 5 MG",
      "03 COMPRIMIDOS",
      "SE PAS > 110 MMHG: COLOCAR 01 COMPRIMIDO EMBAIXO DA LÍNGUA, PODENDO REPETIR A CADA 5 A 10 MINUTOS (ATÉ 03 DOSES) ENQUANTO PREPARA A INFUSÃO. NÃO USAR SE PAS < 90 MMHG, INFARTO DE VENTRÍCULO DIREITO, SILDENAFILA NAS ÚLTIMAS 24 H OU TADALAFILA NAS ÚLTIMAS 48 H",
      "USO SUBLINGUAL"
     ],
     [
      "NITROGLICERINA 5 MG/ML SOLUÇÃO INJETÁVEL",
      "01 AMPOLA 10 ML",
      "SE DOR PERSISTENTE, HIPERTENSÃO OU CONGESTÃO: INFUNDIR EM BOMBA — DILUIÇÃO, DOSE E VAZÃO PELA ABA CALCULADORAS › NITROGLICERINA. NÃO USAR SE PAS < 90 MMHG, INFARTO DE VENTRÍCULO DIREITO, SILDENAFILA NAS ÚLTIMAS 24 H OU TADALAFILA NAS ÚLTIMAS 48 H",
      "USO ENDOVENOSO"
     ]
    ]
   },
   {
    "label": "Padrão — Oxigênio e suporte ventilatório",
    "mode": "internacao",
    "draft": true,
    "items": [
     [
      "OXIGÊNIO / VENTILAÇÃO NÃO INVASIVA (CPAP OU BIPAP)",
      "CONFORME NECESSIDADE",
      "OFERECER O2 SE SATO2 < 90%; SE DESCONFORTO RESPIRATÓRIO (FR > 25, SATO2 < 90% OU USO DE MUSCULATURA ACESSÓRIA), INICIAR VNI PRECOCEMENTE",
      "USO INALATÓRIO"
     ]
    ]
   },
   {
    "label": "Choque cardiogênico ou baixo débito: droga vasoativa em bomba — escolha 1",
    "mode": "internacao",
    "sec": "offlabel",
    "draft": true,
    "menu": true,
    "items": [
     [
      "NORADRENALINA 4 MG/4 ML SOLUÇÃO INJETÁVEL",
      "01 AMPOLA",
      "SE PAS < 90 MMHG COM HIPOPERFUSÃO: INFUNDIR EM BOMBA — DILUIÇÃO, DOSE E VAZÃO PELA ABA CALCULADORAS › NORADRENALINA",
      "USO ENDOVENOSO"
     ],
     [
      "DOBUTAMINA 250 MG/20 ML SOLUÇÃO INJETÁVEL",
      "01 AMPOLA",
      "SE BAIXO DÉBITO (HIPOPERFUSÃO) COM PAS ≥ 90 MMHG: INFUNDIR EM BOMBA — DILUIÇÃO, DOSE E VAZÃO PELA ABA CALCULADORAS › DOBUTAMINA",
      "USO ENDOVENOSO"
     ]
    ]
   },
   {
    "label": "Padrão — IC descompensada leve, compensada no PS: diurético oral até o retorno",
    "draft": true,
    "items": [
     [
      "FUROSEMIDA 40 MG",
      "30 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO PELA MANHÃ (DOSE A AJUSTAR NA CONSULTA DE RETORNO PELO PESO DIÁRIO E PELO INCHAÇO)",
      "USO ORAL"
     ]
    ],
    "orient": [
     "PESAR-SE TODOS OS DIAS, PELA MANHÃ, APÓS URINAR E ANTES DO CAFÉ; SE GANHAR MAIS DE 2 KG EM 3 DIAS, PROCURAR A UNIDADE DE SAÚDE",
     "DIMINUIR O SAL E SEGUIR A QUANTIDADE DE LÍQUIDOS ORIENTADA PELO MÉDICO; NÃO PARAR OS REMÉDIOS DO CORAÇÃO POR CONTA PRÓPRIA",
     "QUEM JÁ USAVA FUROSEMIDA: AJUSTAR A DOSE ORAL HABITUAL CONFORME A RESPOSTA NO PS, EM VEZ DE SOMAR. NÃO SUSPENDER E, SE AINDA NÃO USA E NÃO HÁ CONTRAINDICAÇÃO, INICIAR ANTES DA ALTA OS REMÉDIOS QUE MUDAM O PROGNÓSTICO DA IC (ISGLT2, BETABLOQUEADOR, IECA/BRA OU SACUBITRIL-VALSARTANA, ESPIRONOLACTONA)",
     "MARCAR CONSULTA NA UNIDADE DE SAÚDE OU COM O CARDIOLOGISTA EM ATÉ 7 A 14 DIAS",
     "RETORNAR IMEDIATAMENTE OU LIGAR 192 (SAMU) SE A FALTA DE AR PIORAR, NÃO CONSEGUIR DEITAR, TOSSE COM ESPUMA ROSADA, DOR NO PEITO OU DESMAIO"
    ]
   },
   {
    "label": "Do material do Drive — EAP hipertensivo grave ou sem resposta ao nitrato: nitroprussiato em bomba",
    "mode": "internacao",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "NITROPRUSSIATO DE SÓDIO 50 MG PÓ PARA SOLUÇÃO INJETÁVEL",
      "01 FRASCO-AMPOLA",
      "SE EAP HIPERTENSIVO GRAVE OU SEM RESPOSTA À NITROGLICERINA: INFUNDIR EM BOMBA, PROTEGIDO DA LUZ, EM SALA DE EMERGÊNCIA OU UTI COM PA MONITORIZADA CONTINUAMENTE (DE PREFERÊNCIA INVASIVA) — DILUIÇÃO, DOSE E VAZÃO PELA ABA CALCULADORAS › NITROPRUSSIATO. NÃO USAR SE PAS < 90 MMHG",
      "USO ENDOVENOSO"
     ]
    ]
   },
   {
    "label": "Padrão — iSGLT2 se ainda não usa (IC com qualquer fração de ejeção): dapagliflozina antes da alta",
    "draft": true,
    "items": [
     [
      "DAPAGLIFLOZINA 10 MG",
      "30 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO AO DIA, PELA MANHÃ. NÃO INICIAR SE TFG < 25 ML/MIN/1,73 M², DIABETES TIPO 1, HIPOTENSÃO SINTOMÁTICA OU CETOACIDOSE PRÉVIA; SUSPENDER SE VÔMITOS, DIARREIA OU JEJUM PROLONGADO",
      "USO ORAL"
     ]
    ],
    "orient": [
     "MANTER BOA HIGIENE ÍNTIMA (RISCO DE INFECÇÃO GENITAL POR FUNGO); O VOLUME DE URINA PODE AUMENTAR NOS PRIMEIROS DIAS"
    ]
   },
   {
    "label": "Congestão refratária (resposta insuficiente após dobrar a furosemida EV): associar tiazídico — bloqueio sequencial do néfron",
    "mode": "internacao",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "HIDROCLOROTIAZIDA 25 MG",
      "01 A 02 COMPRIMIDOS",
      "TOMAR 25 MG (TFG > 50 ML/MIN) OU 50 MG (TFG 20–50 ML/MIN) VIA ORAL 01 VEZ AO DIA, ASSOCIADA À FUROSEMIDA EV, POR 01 A 03 DIAS CONFORME A RESPOSTA. DOSAR SÓDIO, POTÁSSIO, MAGNÉSIO E CREATININA DIARIAMENTE (RISCO DE HIPOCALEMIA, HIPONATREMIA E PIORA RENAL)",
      "USO ORAL"
     ]
    ],
    "orient": [
     "ACETAZOLAMIDA EV 500 MG 01 VEZ AO DIA POR 03 DIAS, ASSOCIADA À FUROSEMIDA, É ALTERNATIVA AO TIAZÍDICO ONDE HOUVER A APRESENTAÇÃO INJETÁVEL"
    ]
   }
  ]
 },
 {
  "id": "enxaqueca",
  "ic": "🧠",
  "nm": "Enxaqueca",
  "sub": "sumatriptano · naproxeno · dipirona · metoclopramida",
  "blocks": [
   {
    "label": "Padrão — Triptano no início da crise (moderada/intensa) — escolha 1",
    "draft": true,
    "menu": true,
    "items": [
     [
      "SUMATRIPTANO 50 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO NO INÍCIO DA CRISE DE ENXAQUECA. SE A DOR MELHORAR E DEPOIS VOLTAR, PODE REPETIR 01 COMPRIMIDO APÓS NO MÍNIMO 02 HORAS. MÁXIMO DE 04 COMPRIMIDOS EM 24 HORAS"
     ],
     [
      "NARATRIPTANO 2,5 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO NO INÍCIO DA CRISE DE ENXAQUECA. SE A DOR MELHORAR E DEPOIS VOLTAR, PODE REPETIR 01 COMPRIMIDO APÓS NO MÍNIMO 04 HORAS. MÁXIMO DE 02 COMPRIMIDOS EM 24 HORAS"
     ]
    ],
    "orient": [
     "TOMAR A MEDICAÇÃO LOGO NO INÍCIO DA DOR E REPOUSAR EM AMBIENTE CALMO E ESCURO",
     "NÃO USAR REMÉDIOS PARA DOR DE CABEÇA POR MAIS DE 10 DIAS NO MÊS (O EXCESSO TORNA A DOR CRÔNICA); NÃO ASSOCIAR SUMATRIPTANO A ERGOTAMINA (CEFALIV®, CEFALIUM)",
     "MANTER DIÁRIO DA DOR E AGENDAR CONSULTA NA UBS PARA AVALIAR TRATAMENTO PREVENTIVO SE 04 OU MAIS CRISES POR MÊS OU CRISES INCAPACITANTES",
     "EVITAR GATILHOS: JEJUM PROLONGADO, PRIVAÇÃO DE SONO, ÁLCOOL E EXCESSO DE CAFEÍNA",
     "RETORNAR IMEDIATAMENTE SE DOR SÚBITA E MUITO FORTE (A PIOR DA VIDA), FEBRE COM RIGIDEZ NA NUCA, FRAQUEZA OU DORMÊNCIA EM UM LADO DO CORPO, ALTERAÇÃO DA FALA OU DA VISÃO, CONFUSÃO OU CONVULSÃO"
    ]
   },
   {
    "label": "Padrão — AINE (anti-inflamatório) — escolha 1",
    "draft": true,
    "menu": true,
    "items": [
     [
      "NAPROXENO SÓDICO 500 MG",
      "10 COMPRIMIDOS",
      "TOMAR UM COMPRIMIDO SE DOR, PODENDO REPETIR DE 12/12H POR ATÉ 05 DIAS SEGUIDOS"
     ],
     [
      "IBUPROFENO 600 MG",
      "10 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO NO INÍCIO DA CRISE, APÓS ALIMENTAÇÃO; SE A DOR CONTINUAR, PODE REPETIR DE 8/8H (MÁXIMO 03 COMPRIMIDOS POR DIA). NÃO USAR SE ÚLCERA, DOENÇA RENAL, GESTAÇÃO OU SUSPEITA DE DENGUE",
      "USO ORAL"
     ],
     [
      "DICLOFENACO 50 MG",
      "15 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO NO INÍCIO DA CRISE; SE A DOR CONTINUAR, PODE REPETIR DE 8/8H (MÁXIMO 03 COMPRIMIDOS POR DIA)"
     ]
    ]
   },
   {
    "label": "Padrão — Analgésico (crise leve ou contraindicação a triptano) — escolha 1",
    "draft": true,
    "menu": true,
    "items": [
     [
      "DIPIRONA 500 MG",
      "01 CAIXA",
      "TOMAR 02 COMPRIMIDOS SE DOR OU FEBRE, PODENDO REPETIR DE 6/6H"
     ],
     [
      "PARACETAMOL 750 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO SE DOR OU FEBRE, PODENDO REPETIR DE 6/6H. INTERCALAR COM DIPIRONA, SE NECESSÁRIO."
     ]
    ]
   },
   {
    "label": "Padrão — Antiemético — escolha 1",
    "draft": true,
    "menu": true,
    "items": [
     [
      "METOCLOPRAMIDA 10 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO SE NÁUSEAS OU VÔMITOS, PODENDO REPETIR DE 8/8H"
     ],
     [
      "ONDANSETRONA 8 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO SE NÁUSEAS OU VÔMITOS, PODENDO REPETIR DE 8/8H"
     ],
     [
      "DIMENIDRINATO 50 MG + PIRIDOXINA 10MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO SE VERTIGEM, NÁUSEAS OU VÔMITOS, PODENDO REPETIR DE 6/6H"
     ]
    ]
   },
   {
    "label": "Combinação pronta — crise moderada/intensa: sumatriptano + naproxeno + metoclopramida",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "SUMATRIPTANO 50 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO NO INÍCIO DA CRISE DE ENXAQUECA, JUNTO COM O NAPROXENO. SE A DOR MELHORAR E DEPOIS VOLTAR, PODE REPETIR 01 COMPRIMIDO APÓS NO MÍNIMO 02 HORAS. MÁXIMO DE 04 COMPRIMIDOS EM 24 HORAS"
     ],
     [
      "NAPROXENO SÓDICO 500 MG",
      "10 COMPRIMIDOS",
      "TOMAR UM COMPRIMIDO SE DOR, PODENDO REPETIR DE 12/12H POR ATÉ 05 DIAS SEGUIDOS"
     ],
     [
      "METOCLOPRAMIDA 10 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO SE NÁUSEAS OU VÔMITOS, PODENDO REPETIR DE 8/8H"
     ]
    ]
   },
   {
    "label": "Combinação pronta — crise leve ou contraindicação a triptano: dipirona + metoclopramida",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "DIPIRONA 500 MG",
      "01 CAIXA",
      "TOMAR 02 COMPRIMIDOS SE DOR OU FEBRE, PODENDO REPETIR DE 6/6H"
     ],
     [
      "METOCLOPRAMIDA 10 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO SE NÁUSEAS OU VÔMITOS, PODENDO REPETIR DE 8/8H"
     ]
    ]
   },
   {
    "label": "Naratriptano (crises longas ou que voltam) + dipirona + metoclopramida",
    "sec": "offlabel",
    "items": [
     [
      "NARATRIPTANO 2,5 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO NO INÍCIO DA CRISE DE ENXAQUECA. SE A DOR MELHORAR E DEPOIS VOLTAR, PODE REPETIR 01 COMPRIMIDO APÓS NO MÍNIMO 04 HORAS. MÁXIMO DE 02 COMPRIMIDOS EM 24 HORAS"
     ],
     [
      "DIPIRONA 500 MG",
      "01 CAIXA",
      "TOMAR 02 COMPRIMIDOS SE DOR OU FEBRE, PODENDO REPETIR DE 6/6H"
     ],
     [
      "METOCLOPRAMIDA 10 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO SE NÁUSEAS OU VÔMITOS, PODENDO REPETIR DE 8/8H"
     ]
    ]
   },
   {
    "label": "Sumatriptano em comprimido de 25 mg (dose de 25 a 50 mg) + dipirona + metoclopramida",
    "sec": "offlabel",
    "items": [
     [
      "SUMATRIPTANO 25 MG",
      "02 CAIXAS",
      "TOMAR 02 COMPRIMIDOS (50 MG) NO INÍCIO DA CRISE (01 COMPRIMIDO = 25 MG SE CRISES LEVES OU EFEITOS COLATERAIS). SE A DOR MELHORAR E DEPOIS VOLTAR, PODE REPETIR APÓS NO MÍNIMO 02 HORAS; SE NÃO MELHORAR COM A 1ª DOSE, NÃO REPETIR NA MESMA CRISE. MÁXIMO DE 200 MG (08 COMPRIMIDOS) EM 24 HORAS"
     ],
     [
      "DIPIRONA 500 MG",
      "01 CAIXA",
      "TOMAR 02 COMPRIMIDOS SE DOR OU FEBRE, PODENDO REPETIR DE 6/6H"
     ],
     [
      "METOCLOPRAMIDA 10 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO SE NÁUSEAS OU VÔMITOS, PODENDO REPETIR DE 8/8H"
     ]
    ]
   },
   {
    "label": "Sem triptano disponível: ergotamínico (di-hidroergotamina + dipirona + cafeína) + metoclopramida",
    "sec": "offlabel",
    "items": [
     [
      "DI-HIDROERGOTAMINA 1 MG + DIPIRONA 350 MG + CAFEÍNA 100 MG (CEFALIV®)",
      "01 CAIXA",
      "TOMAR 01 A 02 COMPRIMIDOS AO PRIMEIRO SINAL DE ENXAQUECA. SE NÃO HOUVER MELHORA, PODE TOMAR 01 COMPRIMIDO A CADA 30 MIN, ATÉ O MÁXIMO DE 06 COMPRIMIDOS POR DIA; NÃO USAR POR MAIS DE 10 DIAS NO MÊS. NÃO USAR SE TOMOU TRIPTANO NAS ÚLTIMAS 24 H, NA GESTAÇÃO OU AMAMENTAÇÃO, EM MENORES DE 18 ANOS, COM DOENÇA CORONARIANA OU VASCULAR, HAS NÃO CONTROLADA, OU JUNTO COM ANTIBIÓTICO MACROLÍDEO, ANTIFÚNGICO AZÓLICO OU ANTIRRETROVIRAL"
     ],
     [
      "METOCLOPRAMIDA 10 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO SE NÁUSEAS OU VÔMITOS, PODENDO REPETIR DE 8/8H"
     ]
    ]
   },
   {
    "label": "Sem triptano disponível: ergotamínico com metoclopramida no mesmo comprimido (di-hidroergotamina + paracetamol + cafeína + metoclopramida)",
    "sec": "offlabel",
    "items": [
     [
      "DI-HIDROERGOTAMINA 1 MG + PARACETAMOL 450 MG + CAFEÍNA 75 MG + METOCLOPRAMIDA 10 MG (CEFALIUM®)",
      "01 CAIXA",
      "TOMAR 01 A 02 COMPRIMIDOS AO PRIMEIRO SINAL DE ENXAQUECA; SE NÃO HOUVER MELHORA, PODE TOMAR MAIS 01 COMPRIMIDO APÓS 30 MIN, ATÉ O MÁXIMO DE 03 COMPRIMIDOS POR DIA (CADA COMPRIMIDO TEM 10 MG DE METOCLOPRAMIDA — NÃO TOMAR OUTRA METOCLOPRAMIDA JUNTO). NÃO USAR POR MAIS DE 10 DIAS NO MÊS. NÃO USAR SE TOMOU TRIPTANO NAS ÚLTIMAS 24 H, NA GESTAÇÃO OU AMAMENTAÇÃO, EM MENORES DE 18 ANOS, COM DOENÇA CORONARIANA OU VASCULAR, HAS NÃO CONTROLADA, OU JUNTO COM MACROLÍDEO, ANTIFÚNGICO AZÓLICO OU ANTIRRETROVIRAL"
     ]
    ]
   },
   {
    "label": "Migrânea na gestação — paracetamol ± metoclopramida",
    "sec": "offlabel",
    "items": [
     [
      "PARACETAMOL 500 MG",
      "01 CAIXA",
      "TOMAR 02 COMPRIMIDOS SE DOR OU FEBRE, PODENDO REPETIR DE 6/6H"
     ],
     [
      "METOCLOPRAMIDA 10 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO SE NÁUSEAS OU VÔMITOS, PODENDO REPETIR DE 8/8H"
     ]
    ],
    "orient": [
     "GESTANTE: PARACETAMOL É A 1ª ESCOLHA, COM METOCLOPRAMIDA SE NÁUSEAS; EVITAR AINE APÓS 20 SEMANAS, DIPIRONA NO 3º TRIMESTRE, ERGOTAMÍNICO, VALPROATO E OPIOIDE",
     "DOR DE CABEÇA NOVA OU DIFERENTE NA GESTAÇÃO OU APÓS O PARTO: MEDIR A PRESSÃO E PROCURAR ATENDIMENTO NO MESMO DIA"
    ]
   },
   {
    "label": "Analgésico/antitérmico — escolha 1",
    "sec": "offlabel",
    "menu": true,
    "items": [
     [
      "DIPIRONA 500 MG",
      "01 CAIXA",
      "TOMAR 02 COMPRIMIDOS SE DOR OU FEBRE, PODENDO REPETIR DE 6/6H"
     ],
     [
      "PARACETAMOL 750 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO SE DOR OU FEBRE, PODENDO REPETIR DE 6/6H. INTERCALAR COM DIPIRONA, SE NECESSÁRIO."
     ]
    ]
   },
   {
    "label": "AINE (anti-inflamatório) — escolha 1",
    "sec": "offlabel",
    "menu": true,
    "items": [
     [
      "IBUPROFENO 300 MG",
      "01 CAIXA",
      "TOMAR 02 COMPRIMIDOS DE 6/6H POR 05 DIAS"
     ],
     [
      "DICLOFENACO 50 MG",
      "15 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO DE 8/8H, POR 05 DIAS SEGUIDOS HORÁRIO SUGERIDO (8/8h): 06:00 / 14:00 / 22:00"
     ],
     [
      "NAPROXENO SÓDICO 500 MG",
      "10 COMPRIMIDOS",
      "TOMAR UM COMPRIMIDO SE DOR, PODENDO REPETIR DE 12/12H POR ATÉ 05 DIAS SEGUIDOS"
     ]
    ]
   },
   {
    "label": "Antiemético — escolha 1",
    "sec": "offlabel",
    "menu": true,
    "items": [
     [
      "METOCLOPRAMIDA 10 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO SE NÁUSEAS OU VÔMITOS, PODENDO REPETIR DE 8/8H"
     ],
     [
      "ONDANSETRONA 8 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO SE NÁUSEAS OU VÔMITOS, PODENDO REPETIR DE 8/8H"
     ],
     [
      "DIMENIDRINATO 50 MG + PIRIDOXINA 10MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO SE VERTIGEM, NÁUSEAS OU VÔMITOS, PODENDO REPETIR DE 6/6H"
     ]
    ]
   },
   {
    "label": "Padrão — crise no PS: dipirona + metoclopramida EV ± cetoprofeno + dexametasona",
    "mode": "internacao",
    "draft": true,
    "items": [
     [
      "DIPIRONA 500 MG/ML SOLUÇÃO INJETÁVEL",
      "01 AMPOLA 2 ML",
      "ADMINISTRAR 01 G (02 ML) EV DILUÍDO EM 100 ML DE SF 0,9% EM 15 MINUTOS; PODE REPETIR DE 6/6H SE DOR",
      "USO ENDOVENOSO"
     ],
     [
      "METOCLOPRAMIDA 5 MG/ML SOLUÇÃO INJETÁVEL",
      "01 AMPOLA 2 ML",
      "ADMINISTRAR 10 MG (02 ML) EV DILUÍDO EM 100 ML DE SF 0,9% EM 15 MINUTOS (INFUSÃO LENTA REDUZ ACATISIA); PODE REPETIR DE 8/8H SE NÁUSEAS OU DOR",
      "USO ENDOVENOSO"
     ],
     [
      "CETOPROFENO 100 MG PÓ LIÓFILO PARA SOLUÇÃO INJETÁVEL",
      "01 FRASCO-AMPOLA",
      "SE SEM CONTRAINDICAÇÃO A AINE: ADMINISTRAR 100 MG EV DILUÍDO EM 100 ML DE SF 0,9% EM 20 MINUTOS, DOSE ÚNICA",
      "USO ENDOVENOSO"
     ],
     [
      "DEXAMETASONA 4 MG/ML SOLUÇÃO INJETÁVEL",
      "01 AMPOLA 2,5 ML",
      "ADMINISTRAR 10 MG (2,5 ML) EV EM DOSE ÚNICA PARA REDUZIR A RECORRÊNCIA NAS 72 H APÓS A ALTA",
      "USO ENDOVENOSO"
     ]
    ],
    "orient": [
     "AMBIENTE CALMO, COM POUCA LUZ E RUÍDO; HIDRATAR EV (SF 0,9% 500-1000 ML) SÓ SE VÔMITOS/DESIDRATAÇÃO OU ANTES DE CLORPROMAZINA",
     "REAVALIAR A DOR EM 1 H; SEM MELHORA: SUMATRIPTANO SC (SE NÃO USOU TRIPTANO/ERGOTAMINA NAS 24 H) OU CLORPROMAZINA EV",
     "NÃO USAR OPIOIDES (TRAMADOL, MORFINA): MENOR EFICÁCIA, MAIS RETORNO AO PS E RISCO DE CRONIFICAÇÃO",
     "SINAIS DE ALARME = INVESTIGAR (TC/PUNÇÃO LOMBAR): DOR SÚBITA EM TROVOADA OU A PIOR DA VIDA, FEBRE OU RIGIDEZ DE NUCA, DÉFICIT FOCAL, PAPILEDEMA, INÍCIO APÓS 50 ANOS, IMUNOSSUPRESSÃO OU MUDANÇA DO PADRÃO",
     "ACATISIA OU DISTONIA PELA METOCLOPRAMIDA: DIFENIDRAMINA 25-50 MG EV. NA ALTA: PRESCRIÇÃO AMBULATORIAL DA CRISE E ORIENTAR SOBRE CEFALEIA POR USO EXCESSIVO DE ANALGÉSICOS"
    ]
   },
   {
    "label": "Padrão — alternativa ou sem resposta (sem triptano/ergotamina nas 24 h): sumatriptano SC",
    "mode": "internacao",
    "draft": true,
    "items": [
     [
      "SUMATRIPTANO 6 MG/0,5 ML SOLUÇÃO INJETÁVEL",
      "01 SERINGA PREENCHIDA",
      "APLICAR 6 MG SC; SE A DOR MELHORAR E VOLTAR, PODE REPETIR 01 VEZ APÓS NO MÍNIMO 01 H (MÁXIMO 12 MG EM 24 H)",
      "USO SUBCUTÂNEO"
     ]
    ],
    "orient": [
     "CONTRAINDICADO EM DOENÇA CORONARIANA, AVC/AIT, DOENÇA VASCULAR PERIFÉRICA, HAS NÃO CONTROLADA E ENXAQUECA HEMIPLÉGICA OU COM AURA DE TRONCO",
     "NÃO USAR SE ERGOTAMÍNICO OU OUTRO TRIPTANO NAS ÚLTIMAS 24 H; CUIDADO COM ISRS/IRSN (SÍNDROME SEROTONINÉRGICA); BULA: 18 A 65 ANOS",
     "APERTO OU PESO NO TÓRAX E PESCOÇO É COMUM E TRANSITÓRIO, MAS DOR TORÁCICA TÍPICA EXIGE ECG"
    ]
   },
   {
    "label": "Crise refratária (sem resposta após 1 h): clorpromazina EV com hidratação prévia",
    "mode": "internacao",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "CLORETO DE SÓDIO 0,9% (SORO FISIOLÓGICO)",
      "01 BOLSA 500 ML",
      "INFUNDIR 500 ML EV EM 30 MINUTOS ANTES DA CLORPROMAZINA (PREVINE HIPOTENSÃO POSTURAL)",
      "USO ENDOVENOSO"
     ],
     [
      "CLORPROMAZINA 5 MG/ML SOLUÇÃO INJETÁVEL",
      "01 AMPOLA 5 ML",
      "ADMINISTRAR {DOSE} EV DILUÍDO EM 100 ML DE SF 0,9% EM 20-30 MINUTOS; SE DOR PERSISTENTE E PA ESTÁVEL, PODE REPETIR APÓS 15-30 MIN ATÉ O TOTAL DE 03 DOSES (0,1 MG/KG/DOSE; MÁXIMO 25 MG/DOSE)",
      "USO ENDOVENOSO",
      {
       "kg": 0.1,
       "un": "MG",
       "max": 25
      }
     ]
    ],
    "orient": [
     "MANTER EM DECÚBITO E AFERIR PA ANTES DE CADA DOSE E AO LEVANTAR (HIPOTENSÃO ORTOSTÁTICA); SONOLÊNCIA E ACATISIA SÃO COMUNS",
     "EVITAR EM IDOSOS COM DEMÊNCIA, QT LONGO, EPILEPSIA E DOENÇA DE PARKINSON"
    ]
   },
   {
    "label": "Enxaqueca com aura ou crise refratária: sulfato de magnésio EV",
    "mode": "internacao",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "SULFATO DE MAGNÉSIO 50% (500 MG/ML) SOLUÇÃO INJETÁVEL",
      "01 AMPOLA 10 ML",
      "ADMINISTRAR 1 A 2 G (02 A 04 ML) EV DILUÍDO EM 100 ML DE SF 0,9% EM 20 MINUTOS, DOSE ÚNICA",
      "USO ENDOVENOSO"
     ]
    ],
    "orient": [
     "EVIDÊNCIA MODESTA (AHS NÍVEL C), MAIOR BENEFÍCIO NA ENXAQUECA COM AURA; PODE CAUSAR RUBOR E HIPOTENSÃO TRANSITÓRIA — EVITAR NA DOENÇA RENAL GRAVE"
    ]
   },
   {
    "label": "Padrão — crise de enxaqueca: analgésico VO pelo peso (ibuprofeno é a 1ª opção) — escolha 1",
    "mode": "ped",
    "draft": true,
    "menu": true,
    "items": [
     [
      "IBUPROFENO 100 MG/ML SUSPENSÃO ORAL (GOTAS)",
      "01 FRASCO",
      "DAR {DOSE} VIA ORAL NO INÍCIO DA CRISE, PODENDO REPETIR ATÉ DE 8/8H, APÓS ALIMENTAÇÃO (10 MG/KG/DOSE; SOMENTE A PARTIR DE 6 MESES; NÃO USAR SE SUSPEITA DE DENGUE, DESIDRATAÇÃO OU VÔMITOS)",
      "USO ORAL",
      {
       "kg": 10,
       "conc": 100,
       "gotas": 10,
       "un": "GOTAS",
       "max": 400
      }
     ],
     [
      "PARACETAMOL 200 MG/ML SOLUÇÃO ORAL (GOTAS)",
      "01 FRASCO",
      "DAR {DOSE} VIA ORAL NO INÍCIO DA CRISE, PODENDO REPETIR ATÉ DE 6/6H (15 MG/KG/DOSE; MÁXIMO 75 MG/KG/DIA)",
      "USO ORAL",
      {
       "kg": 15,
       "conc": 200,
       "gotas": 15,
       "un": "GOTAS",
       "max": 750
      }
     ],
     [
      "DIPIRONA 500 MG/ML SOLUÇÃO ORAL (GOTAS)",
      "01 FRASCO",
      "DAR {DOSE} VIA ORAL NO INÍCIO DA CRISE, PODENDO REPETIR ATÉ DE 6/6H (15 MG/KG/DOSE; NÃO USAR EM MENORES DE 3 MESES OU COM MENOS DE 5 KG)",
      "USO ORAL",
      {
       "kg": 15,
       "conc": 500,
       "gotas": 20,
       "un": "GOTAS",
       "max": 1000
      }
     ]
    ],
    "orient": [
     "TRATAR LOGO NO INÍCIO DA DOR; REPOUSO EM AMBIENTE ESCURO E SILENCIOSO, OFERECER LÍQUIDOS E DEIXAR DORMIR",
     "LIMITAR ANALGÉSICOS A NO MÁXIMO 2-3 DIAS POR SEMANA (CEFALEIA POR USO EXCESSIVO); DIÁRIO DA DOR E ACOMPANHAMENTO SE CRISES FREQUENTES OU INCAPACITANTES",
     "NÃO USAR AAS (SÍNDROME DE REYE), CODEÍNA OU TRAMADOL EM MENORES DE 12 ANOS",
     "PROCURAR EMERGÊNCIA SE CEFALEIA SÚBITA E INTENSA, FEBRE COM RIGIDEZ DE NUCA, VÔMITOS PERSISTENTES, SONOLÊNCIA OU CONFUSÃO, FRAQUEZA OU ALTERAÇÃO DA FALA/VISÃO, DOR QUE ACORDA A CRIANÇA OU PIORA PROGRESSIVA"
    ]
   },
   {
    "label": "Padrão — crise intensa ou refratária no PS: hidratação + dipirona EV + ondansetrona EV",
    "mode": "ped_internacao",
    "draft": true,
    "items": [
     [
      "CLORETO DE SÓDIO 0,9% (SORO FISIOLÓGICO)",
      "01 BOLSA 500 ML",
      "INFUNDIR {DOSE} EV EM 30-60 MINUTOS (20 ML/KG), SOBRETUDO SE VÔMITOS OU DESIDRATAÇÃO",
      "USO ENDOVENOSO",
      {
       "kg": 20,
       "un": "ML",
       "max": 1000
      }
     ],
     [
      "DIPIRONA 500 MG/ML SOLUÇÃO INJETÁVEL",
      "01 AMPOLA 2 ML",
      "ADMINISTRAR {DOSE} EV LENTO, DILUÍDO EM ÁGUA DESTILADA OU SF 0,9%, ATÉ DE 6/6H SE DOR (15 MG/KG/DOSE; NÃO USAR EM MENORES DE 3 MESES OU COM MENOS DE 5 KG)",
      "USO ENDOVENOSO",
      {
       "kg": 15,
       "conc": 500,
       "un": "ML",
       "max": 1000
      }
     ],
     [
      "ONDANSETRONA 2 MG/ML SOLUÇÃO INJETÁVEL",
      "01 AMPOLA 2 ML",
      "ADMINISTRAR {DOSE} EV LENTO (EM 5 MINUTOS) SE NÁUSEAS OU VÔMITOS, ATÉ DE 8/8H (0,15 MG/KG/DOSE). ACIMA DE 6 MESES",
      "USO ENDOVENOSO",
      {
       "kg": 0.15,
       "un": "MG",
       "max": 4
      }
     ]
    ],
    "orient": [
     "REAVALIAR A DOR EM 1 H EM AMBIENTE ESCURO E SILENCIOSO; SEM MELHORA OU COM SINAIS DE ALARME, DISCUTIR COM NEUROPEDIATRIA E CONSIDERAR NEUROIMAGEM",
     "METOCLOPRAMIDA: CONTRAINDICADA EM MENORES DE 1 ANO E NÃO RECOMENDADA PELA BULA DE 1 A 18 ANOS (RISCO EXTRAPIRAMIDAL) — USAR ONDANSETRONA COMO ANTIEMÉTICO"
    ]
   },
   {
    "label": "Adolescente ≥ 12 anos e ≥ 40 kg sem resposta ao AINE: rizatriptano VO",
    "peso": {
     "de": 40
    },
    "mode": "ped",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "RIZATRIPTANO 10 MG",
      "02 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO VIA ORAL NO INÍCIO DA CRISE, PODENDO ASSOCIAR AO IBUPROFENO. NÃO REPETIR NA MESMA CRISE (NO MÁXIMO 01 COMPRIMIDO EM 24 H)",
      "USO ORAL"
     ]
    ],
    "orient": [
     "SÓ PARA ≥ 12 ANOS E ≥ 40 KG (NO BRASIL SÓ HÁ COMPRIMIDO DE 10 MG); APROVADO PELO FDA DE 6 A 17 ANOS, MAS PODE SER OFF LABEL NA BULA BRASILEIRA",
     "CONTRAINDICADO EM ENXAQUECA HEMIPLÉGICA OU COM AURA DE TRONCO, CARDIOPATIA E HAS NÃO CONTROLADA; NÃO ASSOCIAR A ERGOTAMINA; EVITAR SE USA PROPRANOLOL (EXIGE DOSE DE 5 MG)"
    ]
   }
  ]
 },
 {
  "id": "epididimite",
  "ic": "♂",
  "nm": "Epididimite / Orquite",
  "sub": "ceftriaxona · doxiciclina · levofloxacino",
  "blocks": [
   {
    "label": "Padrão — Risco de IST (geralmente < 35 anos): ceftriaxona + doxiciclina",
    "draft": true,
    "items": [
     [
      "CEFTRIAXONA 500 MG",
      "01 AMPOLA",
      "APLICAR EM GLÚTEO MÉDIO, DOSE ÚNICA",
      "USO INTRAMUSCULAR"
     ],
     [
      "DOXICICLINA 100 MG",
      "20 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO DE 12/12H POR 10 DIAS"
     ],
     [
      "IBUPROFENO 600 MG",
      "15 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO DE 8/8H, APÓS AS REFEIÇÕES, POR 05 DIAS"
     ],
     [
      "DIPIRONA 500 MG",
      "01 CAIXA",
      "TOMAR 02 COMPRIMIDOS SE DOR OU FEBRE, PODENDO REPETIR DE 6/6H"
     ]
    ],
    "orient": [
     "REPOUSO, ELEVAÇÃO DO ESCROTO (CUECA JUSTA OU SUSPENSÓRIO ESCROTAL) E COMPRESSAS FRIAS NOS PRIMEIROS DIAS",
     "COLHER URINA TIPO I, UROCULTURA E PESQUISA DE GONOCOCO/CLAMÍDIA (SE DISPONÍVEL) ANTES DO ANTIBIÓTICO. SE SEXO ANAL INSERTIVO: CEFTRIAXONA 500 MG IM DOSE ÚNICA + LEVOFLOXACINO 500 MG 01 VEZ AO DIA POR 10 DIAS",
     "ETIOLOGIA IST: OFERTAR TESTES PARA HIV, SÍFILIS E HEPATITES B/C; AVISAR AS PARCERIAS SEXUAIS DOS ÚLTIMOS 60 DIAS PARA TAMBÉM SE TRATAREM; EVITAR SEXO ATÉ O FIM DO TRATAMENTO E DOS SINTOMAS",
     "DOR TESTICULAR SÚBITA E INTENSA (PRINCIPALMENTE EM JOVENS): DESCARTAR TORÇÃO TESTICULAR — USG COM DOPPLER E AVALIAÇÃO UROLÓGICA DE URGÊNCIA",
     "RETORNAR EM 72H SE NÃO HOUVER MELHORA, OU IMEDIATAMENTE SE FEBRE ALTA, PIORA DA DOR OU DO INCHAÇO, VÔMITOS OU VERMELHIDÃO COM PUS NA BOLSA ESCROTAL"
    ]
   },
   {
    "label": "Padrão — Baixo risco de IST (> 35 anos, HPB ou manipulação urinária): levofloxacino",
    "draft": true,
    "items": [
     [
      "LEVOFLOXACINO 500 MG",
      "10 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO AO DIA, NO MESMO HORÁRIO, POR 10 DIAS SEGUIDOS"
     ],
     [
      "IBUPROFENO 600 MG",
      "15 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO DE 8/8H, APÓS AS REFEIÇÕES, POR 05 DIAS"
     ],
     [
      "DIPIRONA 500 MG",
      "01 CAIXA",
      "TOMAR 02 COMPRIMIDOS SE DOR OU FEBRE, PODENDO REPETIR DE 6/6H"
     ]
    ]
   },
   {
    "label": "Alternativa ao levofloxacino (sem risco de IST, germes entéricos): ciprofloxacino 10 dias",
    "sec": "offlabel",
    "items": [
     [
      "CIPROFLOXACINO 500MG",
      "20 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO DE 12/12H POR 10 DIAS HORÁRIO SUGERIDO: 08h00 – 20h00"
     ]
    ]
   },
   {
    "label": "Padrão — Criança: epididimite após excluir torção (analgesia; antibiótico só se ITU confirmada) — escolha 1",
    "mode": "ped",
    "draft": true,
    "menu": true,
    "items": [
     [
      "IBUPROFENO 100 MG/ML SUSPENSÃO ORAL (GOTAS)",
      "01 FRASCO",
      "DAR {DOSE} VIA ORAL ATÉ DE 8/8H SE DOR, APÓS ALIMENTAÇÃO, POR ATÉ 05 DIAS (10 MG/KG/DOSE; SOMENTE A PARTIR DE 6 MESES; NÃO USAR SE SUSPEITA DE DENGUE, DESIDRATAÇÃO OU VÔMITOS)",
      "USO ORAL",
      {
       "kg": 10,
       "conc": 100,
       "gotas": 10,
       "un": "GOTAS",
       "max": 400
      }
     ],
     [
      "DIPIRONA 500 MG/ML SOLUÇÃO ORAL (GOTAS)",
      "01 FRASCO",
      "DAR {DOSE} VIA ORAL DE 6/6H SE DOR OU FEBRE (15 MG/KG/DOSE). NÃO USAR EM MENORES DE 3 MESES",
      "USO ORAL",
      {
       "kg": 15,
       "conc": 500,
       "gotas": 20,
       "un": "GOTAS",
       "max": 1000
      }
     ]
    ],
    "orient": [
     "DOR ESCROTAL AGUDA NA CRIANÇA OU NO ADOLESCENTE: TORÇÃO TESTICULAR ATÉ PROVA EM CONTRÁRIO — CIRURGIA PEDIÁTRICA/UROLOGIA IMEDIATA, SEM ATRASAR A CIRURGIA POR EXAME",
     "EPIDIDIMITE ANTES DA PUBERDADE COSTUMA SER INFLAMATÓRIA (PÓS-VIRAL): REPOUSO, ELEVAÇÃO DA BOLSA E ANALGESIA; COLHER URINA TIPO I E UROCULTURA E USAR ANTIBIÓTICO SÓ SE HOUVER ITU (VER ITU / CISTITE)",
     "ADOLESCENTE SEXUALMENTE ATIVO: CONDUZIR COMO O ADULTO COM RISCO DE IST (VER ADULTO)",
     "RETORNAR IMEDIATAMENTE SE A DOR PIORAR, FEBRE, VÔMITOS OU BOLSA ESCROTAL VERMELHA E INCHADA"
    ]
   }
  ]
 },
 {
  "id": "erisipela",
  "ic": "🦠",
  "nm": "Erisipela e celulite",
  "sub": "cefalexina · clindamicina · dipirona",
  "blocks": [
   {
    "label": "Padrão — Antibiótico por 07 dias (clindamicina se alergia grave à penicilina) — escolha 1",
    "draft": true,
    "menu": true,
    "items": [
     [
      "CEFALEXINA 500MG",
      "56 COMPRIMIDOS",
      "TOMAR 02 COMPRIMIDOS (1 G) DE 6/6H POR 07 DIAS HORÁRIO SUGERIDO: 06:00 / 12:00 / 18:00 / 00:00"
     ],
     [
      "CLINDAMICINA 300MG",
      "42 CÁPSULAS",
      "TOMAR 02 CÁPSULAS DE 8/8 HORAS POR 07 DIAS HORÁRIO SUGERIDO: 06:00 / 14:00 / 22:00"
     ]
    ],
    "orient": [
     "MANTER O MEMBRO ELEVADO NA MAIOR PARTE DO TEMPO E APLICAR COMPRESSAS MORNAS",
     "MARCAR COM CANETA O LIMITE DA VERMELHIDÃO PARA ACOMPANHAR A EVOLUÇÃO. MELHORA ESPERADA EM 48 A 72H (A VERMELHIDÃO PODE AUMENTAR UM POUCO NAS PRIMEIRAS 24H)",
     "TRATAR A PORTA DE ENTRADA: MICOSE ENTRE OS DEDOS DOS PÉS, RACHADURAS E FERIDAS. CONTROLAR O INCHAÇO DAS PERNAS",
     "RETORNAR IMEDIATAMENTE SE FEBRE ALTA PERSISTENTE, AUMENTO RÁPIDO DA VERMELHIDÃO, BOLHAS COM SANGUE, MANCHAS ROXAS OU PRETAS NA PELE, DOR DESPROPORCIONAL, CONFUSÃO MENTAL OU SE NÃO HOUVER MELHORA EM 48 A 72H"
    ]
   },
   {
    "label": "Padrão — Analgésico / antitérmico — escolha 1",
    "draft": true,
    "menu": true,
    "items": [
     [
      "DIPIRONA 500 MG",
      "01 CAIXA",
      "TOMAR 02 COMPRIMIDOS SE DOR OU FEBRE, PODENDO REPETIR DE 6/6H"
     ],
     [
      "PARACETAMOL 750 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO SE DOR OU FEBRE, PODENDO REPETIR DE 6/6H. INTERCALAR COM DIPIRONA, SE NECESSÁRIO."
     ]
    ]
   },
   {
    "label": "Combinação pronta — cefalexina 07 dias",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "CEFALEXINA 500MG",
      "56 COMPRIMIDOS",
      "TOMAR 02 COMPRIMIDOS (1 G) DE 6/6H POR 07 DIAS HORÁRIO SUGERIDO: 06:00 / 12:00 / 18:00 / 00:00"
     ],
     [
      "DIPIRONA 500 MG",
      "01 CAIXA",
      "TOMAR 02 COMPRIMIDOS SE DOR OU FEBRE, PODENDO REPETIR DE 6/6H"
     ]
    ]
   },
   {
    "label": "Combinação pronta — alergia grave à penicilina (clindamicina)",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "CLINDAMICINA 300MG",
      "42 CÁPSULAS",
      "TOMAR 02 CÁPSULAS DE 8/8 HORAS POR 07 DIAS HORÁRIO SUGERIDO: 06:00 / 14:00 / 22:00"
     ],
     [
      "DIPIRONA 500 MG",
      "01 CAIXA",
      "TOMAR 02 COMPRIMIDOS SE DOR OU FEBRE, PODENDO REPETIR DE 6/6H"
     ]
    ]
   },
   {
    "label": "Melhora lenta na reavaliação — cefalexina estendida para 10 dias",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "CEFALEXINA 500MG",
      "80 COMPRIMIDOS",
      "TOMAR 02 COMPRIMIDOS (1 G) DE 6/6H POR 10 DIAS HORÁRIO SUGERIDO: 06:00 / 12:00 / 18:00 / 00:00"
     ]
    ],
    "orient": [
     "MANTER O MEMBRO ELEVADO NA MAIOR PARTE DO TEMPO E APLICAR COMPRESSAS MORNAS"
    ]
   },
   {
    "label": "Padrão — erisipela/celulite não purulenta (cefazolina EV)",
    "mode": "internacao",
    "draft": true,
    "items": [
     [
      "CEFAZOLINA 1 G PÓ PARA SOLUÇÃO INJETÁVEL",
      "01 FRASCO-AMPOLA",
      "ADMINISTRAR {FAIXA}, DILUÍDO EM 100 ML DE SF 0,9%, INFUNDIR EM 30 MINUTOS",
      "USO ENDOVENOSO",
      {
       "sem_peso": "1 G EV DE 8/8H (2 G DE 8/8H SE PESO > 100 KG)",
       "faixas": [
        {
         "ate": 100,
         "txt": "1 G EV DE 8/8H"
        },
        {
         "acima": 100,
         "txt": "2 G EV DE 8/8H (PESO > 100 KG)"
        }
       ]
      }
     ],
     [
      "DIPIRONA 500 MG/ML SOLUÇÃO INJETÁVEL",
      "01 AMPOLA",
      "ADMINISTRAR 1 G (2 ML) EV DILUÍDO EM 10 ML DE ÁGUA DESTILADA, LENTO, ATÉ DE 6/6H SE DOR OU FEBRE",
      "USO ENDOVENOSO"
     ],
     [
      "ENOXAPARINA SÓDICA 40 MG/0,4 ML SOLUÇÃO INJETÁVEL",
      "01 SERINGA PREENCHIDA",
      "APLICAR 40 MG SC 01 VEZ AO DIA (PROFILAXIA DE TEV SE PADUA ≥ 4 E SEM CONTRAINDICAÇÃO; AJUSTAR SE CLCR < 30 ML/MIN)",
      "USO SUBCUTÂNEO"
     ]
    ],
    "orient": [
     "MANTER O MEMBRO ACOMETIDO ELEVADO. DEMARCAR A BORDA DO ERITEMA COM CANETA E REAVALIAR A CADA 24H (PODE AUMENTAR NAS PRIMEIRAS 24–48H SEM SIGNIFICAR FALHA)",
     "MONITORAR SINAIS VITAIS DE 6/6H. DOR DESPROPORCIONAL, BOLHAS HEMORRÁGICAS, NECROSE, CREPITAÇÃO, ANESTESIA DA PELE OU INSTABILIDADE: SUSPEITAR DE FASCEÍTE NECROSANTE — AVALIAÇÃO CIRÚRGICA IMEDIATA E AMPLIAR ESQUEMA",
     "SE ABSCESSO OU PURULÊNCIA: DRENAGEM E CULTURA. HEMOCULTURAS SE SEPSE, NEUTROPENIA, IMUNOSSUPRESSÃO OU MORDEDURA",
     "TRATAR A PORTA DE ENTRADA (INTERTRIGO MICÓTICO, FISSURAS, ÚLCERAS) E O EDEMA. TRANSIÇÃO PARA CEFALEXINA ORAL APÓS 24–48H AFEBRIL E COM MELHORA, TOTAL DE 07 DIAS (ESTENDER SE MELHORA LENTA)"
    ]
   },
   {
    "label": "Erisipela clássica estreptocócica — penicilina cristalina EV",
    "mode": "internacao",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "BENZILPENICILINA POTÁSSICA (PENICILINA G CRISTALINA) 5.000.000 UI PÓ PARA SOLUÇÃO INJETÁVEL",
      "4 ML DO FRASCO RECONSTITUÍDO (2.000.000 UI)",
      "RECONSTITUIR O FRASCO COM 8 ML DE ÁGUA DESTILADA (500.000 UI/ML). ADMINISTRAR 2.000.000 UI (4 ML) EV DE 4/4H, DILUÍDO EM 100 ML DE SF 0,9%, EM 30 A 60 MINUTOS (AJUSTAR À FUNÇÃO RENAL)",
      "USO ENDOVENOSO"
     ]
    ]
   },
   {
    "label": "Alergia grave a betalactâmicos ou suspeita de MRSA — escolha 1",
    "mode": "internacao",
    "sec": "offlabel",
    "draft": true,
    "menu": true,
    "items": [
     [
      "CLINDAMICINA 600 MG/4 ML SOLUÇÃO INJETÁVEL",
      "01 AMPOLA",
      "ADMINISTRAR 600 MG EV DE 8/8H, DILUÍDO EM 100 ML DE SF 0,9%, INFUNDIR EM 30 MINUTOS",
      "USO ENDOVENOSO"
     ],
     [
      "VANCOMICINA 500 MG PÓ PARA SOLUÇÃO INJETÁVEL",
      "FRASCOS-AMPOLA CONFORME DOSE",
      "ADMINISTRAR {DOSE} EV DE 12/12H (15 MG/KG/DOSE, PESO REAL), DILUÍDO EM SF 0,9% OU SG 5% (ATÉ 5 MG/ML), EM NO MÍNIMO 60 MINUTOS (MÁXIMO 1 G/H). AJUSTAR PELA FUNÇÃO RENAL E NÍVEL SÉRICO",
      "USO ENDOVENOSO",
      {
       "kg": 15,
       "un": "MG",
       "max": 2000
      }
     ]
    ],
    "orient": [
     "VANCOMICINA: FUNÇÃO RENAL E NÍVEL SÉRICO (VALE ANTES DA 4ª DOSE OU AUC) PARA AJUSTE; DESCALONAR CONFORME CULTURA E ANTIBIOGRAMA"
    ]
   },
   {
    "label": "Grave — sepse, imunossupressão ou suspeita de fasceíte necrosante",
    "mode": "internacao",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "VANCOMICINA 500 MG PÓ PARA SOLUÇÃO INJETÁVEL",
      "FRASCOS-AMPOLA CONFORME DOSE",
      "ADMINISTRAR {DOSE} EV DE 12/12H (15 MG/KG/DOSE, PESO REAL), DILUÍDO EM SF 0,9% OU SG 5% (ATÉ 5 MG/ML), EM NO MÍNIMO 60 MINUTOS (MÁXIMO 1 G/H). AJUSTAR PELA FUNÇÃO RENAL E NÍVEL SÉRICO",
      "USO ENDOVENOSO",
      {
       "kg": 15,
       "un": "MG",
       "max": 2000
      }
     ],
     [
      "PIPERACILINA 4 G + TAZOBACTAM 500 MG PÓ PARA SOLUÇÃO INJETÁVEL",
      "01 FRASCO-AMPOLA",
      "ADMINISTRAR 4,5 G EV DE 6/6H, RECONSTITUIR E DILUIR EM 100 ML DE SF 0,9%, INFUNDIR EM 30 MINUTOS OU EM INFUSÃO ESTENDIDA DE 3 A 4H (AJUSTAR À FUNÇÃO RENAL)",
      "USO ENDOVENOSO"
     ],
     [
      "CLINDAMICINA 600 MG/4 ML SOLUÇÃO INJETÁVEL",
      "6 ML (900 MG)",
      "ADMINISTRAR 900 MG EV DE 8/8H, DILUÍDO EM 100 ML DE SF 0,9%, INFUNDIR EM 30 MINUTOS (INIBIÇÃO DE TOXINA SE SUSPEITA DE FASCEÍTE NECROSANTE OU CHOQUE TÓXICO)",
      "USO ENDOVENOSO"
     ]
    ],
    "orient": [
     "DESBRIDAMENTO CIRÚRGICO DE URGÊNCIA É O TRATAMENTO PRINCIPAL DA FASCEÍTE NECROSANTE — NÃO ATRASAR POR EXAMES DE IMAGEM",
     "HEMOCULTURAS ANTES DO ANTIBIÓTICO, LACTATO E AVALIAÇÃO DE UTI; DESCALONAR CONFORME CULTURAS"
    ]
   },
   {
    "label": "Padrão — Cefalexina oral por 07 dias",
    "mode": "ped",
    "draft": true,
    "items": [
     [
      "CEFALEXINA 250 MG/5 ML SUSPENSÃO ORAL",
      "01 FRASCO",
      "DAR {DOSE} VIA ORAL DE 6/6H POR 07 DIAS (100 MG/KG/DIA; MÁXIMO 500 MG POR DOSE)",
      "USO ORAL",
      {
       "kgdia": 100,
       "vezes": 4,
       "conc": 50,
       "un": "ML",
       "max": 500
      }
     ]
    ],
    "orient": [
     "MANTER O MEMBRO ELEVADO E APLICAR COMPRESSAS MORNAS. MARCAR COM CANETA O LIMITE DA VERMELHIDÃO; MELHORA ESPERADA EM 48 A 72H",
     "TRATAR A PORTA DE ENTRADA: FERIDAS, PICADAS, IMPETIGO, MICOSE ENTRE OS DEDOS",
     "INTERNAR SE TOXEMIA, FEBRE ALTA PERSISTENTE, MENOR DE 3 MESES, ACOMETIMENTO DE FACE/ÓRBITA OU MÃOS, FALHA APÓS 48–72H DE ANTIBIÓTICO ORAL OU INCAPACIDADE DE ACEITAR VIA ORAL",
     "RETORNAR IMEDIATAMENTE SE AUMENTO RÁPIDO DA VERMELHIDÃO, BOLHAS COM SANGUE, MANCHAS ROXAS OU PRETAS NA PELE, DOR MUITO FORTE, SONOLÊNCIA OU SE NÃO HOUVER MELHORA EM 48 A 72H"
    ]
   },
   {
    "label": "Padrão — Analgésico / antitérmico pelo peso — escolha 1",
    "mode": "ped",
    "draft": true,
    "menu": true,
    "items": [
     [
      "DIPIRONA 500 MG/ML SOLUÇÃO ORAL (GOTAS)",
      "01 FRASCO",
      "DAR {DOSE} VIA ORAL ATÉ DE 6/6H SE DOR OU FEBRE (15 MG/KG/DOSE; NÃO USAR EM MENORES DE 3 MESES OU COM MENOS DE 5 KG)",
      "USO ORAL",
      {
       "kg": 15,
       "conc": 500,
       "gotas": 20,
       "un": "GOTAS",
       "max": 1000
      }
     ],
     [
      "PARACETAMOL 200 MG/ML SOLUÇÃO ORAL (GOTAS)",
      "01 FRASCO",
      "DAR {DOSE} VIA ORAL ATÉ DE 6/6H SE DOR OU FEBRE (15 MG/KG/DOSE)",
      "USO ORAL",
      {
       "kg": 15,
       "conc": 200,
       "gotas": 15,
       "un": "GOTAS",
       "max": 750
      }
     ],
     [
      "IBUPROFENO 100 MG/ML SUSPENSÃO ORAL (GOTAS)",
      "01 FRASCO",
      "DAR {DOSE} VIA ORAL ATÉ DE 8/8H SE DOR OU FEBRE, APÓS ALIMENTAÇÃO (10 MG/KG/DOSE; SOMENTE A PARTIR DE 6 MESES; NÃO USAR SE SUSPEITA DE DENGUE, DESIDRATAÇÃO OU VÔMITOS)",
      "USO ORAL",
      {
       "kg": 10,
       "conc": 100,
       "gotas": 10,
       "un": "GOTAS",
       "max": 400
      }
     ]
    ]
   },
   {
    "label": "Combinação pronta — ambulatorial (cefalexina oral)",
    "mode": "ped",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "CEFALEXINA 250 MG/5 ML SUSPENSÃO ORAL",
      "01 FRASCO",
      "DAR {DOSE} VIA ORAL DE 6/6H POR 07 DIAS (100 MG/KG/DIA; MÁXIMO 500 MG POR DOSE)",
      "USO ORAL",
      {
       "kgdia": 100,
       "vezes": 4,
       "conc": 50,
       "un": "ML",
       "max": 500
      }
     ],
     [
      "DIPIRONA 500 MG/ML SOLUÇÃO ORAL (GOTAS)",
      "01 FRASCO",
      "DAR {DOSE} VIA ORAL ATÉ DE 6/6H SE DOR OU FEBRE (15 MG/KG/DOSE; NÃO USAR EM MENORES DE 3 MESES OU COM MENOS DE 5 KG)",
      "USO ORAL",
      {
       "kg": 15,
       "conc": 500,
       "gotas": 20,
       "un": "GOTAS",
       "max": 1000
      }
     ]
    ]
   },
   {
    "label": "Padrão — internação (cefazolina EV)",
    "mode": "ped_internacao",
    "draft": true,
    "items": [
     [
      "CEFAZOLINA 1 G PÓ PARA SOLUÇÃO INJETÁVEL",
      "01 FRASCO-AMPOLA",
      "ADMINISTRAR {DOSE} EV DE 8/8H, DILUÍDO EM SF 0,9%, EM 30 MINUTOS (100 MG/KG/DIA)",
      "USO ENDOVENOSO",
      {
       "kgdia": 100,
       "vezes": 3,
       "un": "MG",
       "max": 1000
      }
     ],
     [
      "DIPIRONA 500 MG/ML SOLUÇÃO INJETÁVEL",
      "01 AMPOLA",
      "ADMINISTRAR {DOSE} EV LENTO, DILUÍDO EM ÁGUA DESTILADA, ATÉ DE 6/6H SE DOR OU FEBRE (15 MG/KG/DOSE; NÃO USAR EM MENORES DE 3 MESES OU COM MENOS DE 5 KG)",
      "USO ENDOVENOSO",
      {
       "kg": 15,
       "conc": 500,
       "un": "ML",
       "max": 1000
      }
     ]
    ],
    "orient": [
     "MANTER O MEMBRO ELEVADO; DEMARCAR A BORDA DO ERITEMA E REAVALIAR A CADA 24H. MONITORAR SINAIS VITAIS DE 6/6H",
     "DOR DESPROPORCIONAL, BOLHAS HEMORRÁGICAS, NECROSE OU SINAIS DE SEPSE: AVALIAÇÃO CIRÚRGICA IMEDIATA E AMPLIAR ESQUEMA",
     "TRANSIÇÃO PARA CEFALEXINA ORAL APÓS 24–48H AFEBRIL E COM MELHORA, TOTAL DE 07 DIAS"
    ]
   },
   {
    "label": "Alergia grave a betalactâmicos ou suspeita de MRSA — clindamicina EV",
    "mode": "ped_internacao",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "CLINDAMICINA 600 MG/4 ML SOLUÇÃO INJETÁVEL",
      "01 AMPOLA",
      "ADMINISTRAR {DOSE} EV DE 8/8H, DILUÍDO EM SF 0,9%, EM 30 MINUTOS (40 MG/KG/DIA)",
      "USO ENDOVENOSO",
      {
       "kgdia": 40,
       "vezes": 3,
       "un": "MG",
       "max": 600
      }
     ]
    ],
    "orient": [
     "SE ABSCESSO: DRENAGEM E CULTURA; DESCALONAR CONFORME ANTIBIOGRAMA"
    ]
   },
   {
    "label": "Grave — sepse ou suspeita de fasceíte necrosante",
    "mode": "ped_internacao",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "VANCOMICINA 500 MG PÓ PARA SOLUÇÃO INJETÁVEL",
      "FRASCOS-AMPOLA CONFORME DOSE",
      "ADMINISTRAR {DOSE} EV DE 6/6H (15 MG/KG/DOSE), DILUÍDO EM SF 0,9% (ATÉ 5 MG/ML), EM NO MÍNIMO 60 MINUTOS. AJUSTAR PELA FUNÇÃO RENAL E NÍVEL SÉRICO",
      "USO ENDOVENOSO",
      {
       "kg": 15,
       "un": "MG",
       "max": 1000
      }
     ],
     [
      "PIPERACILINA 4 G + TAZOBACTAM 500 MG PÓ PARA SOLUÇÃO INJETÁVEL",
      "01 FRASCO-AMPOLA",
      "ADMINISTRAR {DOSE} DE PIPERACILINA EV DE 6/6H, DILUÍDO EM SF 0,9%, EM 30 MINUTOS (100 MG/KG/DOSE DO COMPONENTE PIPERACILINA)",
      "USO ENDOVENOSO",
      {
       "kg": 100,
       "un": "MG",
       "max": 4000
      }
     ],
     [
      "CLINDAMICINA 600 MG/4 ML SOLUÇÃO INJETÁVEL",
      "01 AMPOLA",
      "ADMINISTRAR {DOSE} EV DE 8/8H, DILUÍDO EM SF 0,9%, EM 30 MINUTOS (40 MG/KG/DIA — INIBIÇÃO DE TOXINA)",
      "USO ENDOVENOSO",
      {
       "kgdia": 40,
       "vezes": 3,
       "un": "MG",
       "max": 900
      }
     ]
    ],
    "orient": [
     "DESBRIDAMENTO CIRÚRGICO DE URGÊNCIA SE SUSPEITA DE FASCEÍTE NECROSANTE; HEMOCULTURAS, LACTATO E AVALIAÇÃO DE UTI PEDIÁTRICA"
    ]
   },
   {
    "label": "Do material do Drive — Amoxicilina-clavulanato 8/8h (guia HC-FMUSP)",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "AMOXICILINA + CLAVULANATO DE POTÁSSIO 500 MG + 125 MG",
      "21 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO DE 8/8H, NO INÍCIO DA REFEIÇÃO, POR 07 DIAS HORÁRIO SUGERIDO: 06:00 / 14:00 / 22:00",
      "USO ORAL"
     ]
    ]
   },
   {
    "label": "Do material do Drive — Amoxicilina-clavulanato pelo peso (guia HC-FMUSP)",
    "mode": "ped",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "AMOXICILINA + CLAVULANATO DE POTÁSSIO 250 MG + 62,5 MG/5 ML SUSPENSÃO ORAL",
      "01 FRASCO",
      "DAR 50 MG/KG/DIA DE AMOXICILINA, DIVIDIDO DE 8/8H, NO INÍCIO DA REFEIÇÃO, POR 07 DIAS (MÁXIMO 500 MG DE AMOXICILINA POR DOSE)",
      "USO ORAL"
     ]
    ]
   },
   {
    "label": "Do material do Drive — Penicilina V oral (erisipela estreptocócica leve)",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "FENOXIMETILPENICILINA POTÁSSICA 500.000 UI",
      "28 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO DE 6/6H POR 07 DIAS HORÁRIO SUGERIDO: 06:00 / 12:00 / 18:00 / 00:00",
      "USO ORAL"
     ]
    ]
   },
   {
    "label": "Do material do Drive — Ceftriaxona 1 vez ao dia (alternativa à cefazolina)",
    "mode": "internacao",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "CEFTRIAXONA 1 G PÓ PARA SOLUÇÃO INJETÁVEL",
      "01 FRASCO-AMPOLA",
      "ADMINISTRAR 1 G EV 01 VEZ AO DIA, DILUÍDO EM 100 ML DE SF 0,9%, EM 30 MINUTOS; APÓS 24–48H AFEBRIL E COM MELHORA, TROCAR POR CEFALEXINA ORAL (TOTAL 07 DIAS)",
      "USO ENDOVENOSO"
     ]
    ]
   },
   {
    "label": "Do material do Drive — Oxacilina (celulite grave por S. aureus sensível)",
    "mode": "internacao",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "OXACILINA 500 MG PÓ PARA SOLUÇÃO INJETÁVEL",
      "04 FRASCOS-AMPOLA POR DOSE",
      "ADMINISTRAR 2 G EV DE 4/4H, DILUÍDO EM 100 ML DE SF 0,9%, EM 30 A 60 MINUTOS",
      "USO ENDOVENOSO"
     ]
    ]
   },
   {
    "label": "Erisipela de repetição (3 ou mais episódios por ano) — profilaxia com penicilina — escolha 1",
    "sec": "offlabel",
    "draft": true,
    "menu": true,
    "items": [
     [
      "BENZILPENICILINA BENZATINA 1.200.000 UI",
      "01 FRASCO-AMPOLA (POR APLICAÇÃO)",
      "APLICAR 01 FRASCO-AMPOLA (1.200.000 UI) IM PROFUNDO NO GLÚTEO A CADA 21 DIAS, NA UNIDADE DE SAÚDE, POR 06 A 12 MESES (REAVALIAR)",
      "USO INTRAMUSCULAR"
     ],
     [
      "FENOXIMETILPENICILINA POTÁSSICA 500.000 UI",
      "60 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO DE 12/12H, TODOS OS DIAS, POR 06 A 12 MESES (PROFILAXIA; RENOVAR A RECEITA A CADA 30 DIAS) HORÁRIO SUGERIDO: 08:00 / 20:00",
      "USO ORAL"
     ]
    ],
    "orient": [
     "PROFILAXIA SÓ DEPOIS DE TRATAR A PORTA DE ENTRADA (MICOSE ENTRE OS DEDOS, FISSURAS) E O INCHAÇO CRÔNICO DAS PERNAS; ALÉRGICO À PENICILINA: ERITROMICINA 250 MG DE 12/12H"
    ]
   }
  ]
 },
 {
  "id": "escabiose",
  "ic": "🐛",
  "nm": "Escabiose",
  "sub": "permetrina · ivermectina · hidroxizina",
  "blocks": [
   {
    "label": "Padrão — Escabicida (ivermectina = alternativa oral) — escolha 1",
    "draft": true,
    "menu": true,
    "items": [
     [
      "PERMETRINA 5% LOÇÃO",
      "01 FRASCO",
      "APLICAR À NOITE EM TODO O CORPO, DO PESCOÇO AOS PÉS (INCLUSIVE ENTRE OS DEDOS, SOB AS UNHAS, AXILAS, UMBIGO E GENITAIS), COM A PELE SECA. RETIRAR NO BANHO APÓS 08 A 14 HORAS. REPETIR APÓS 07 DIAS",
      "USO TÓPICO"
     ],
     [
      "IVERMECTINA 6 MG",
      "03 A 08 COMPRIMIDOS (CONFORME O PESO)",
      "TOMAR COM ÁGUA, JUNTO COM UMA REFEIÇÃO, EM DOSE ÚNICA E REPETIR A MESMA DOSE APÓS 07 DIAS (200 MCG/KG POR DOSE) — EM COMPRIMIDOS DE 6 MG: {FAIXA}",
      "USO ORAL",
      {
       "sem_peso": "36 A 50 KG = 1 E 1/2 COMPRIMIDO; 51 A 65 KG = 02; 66 A 79 KG = 2 E 1/2; 80 A 94 KG = 03; 95 A 109 KG = 3 E 1/2; 110 KG OU MAIS = 200 MCG/KG",
       "faixas": [
        {
         "de": 15,
         "menor": 25,
         "txt": "1/2 COMPRIMIDO POR DOSE"
        },
        {
         "de": 25,
         "menor": 36,
         "txt": "01 COMPRIMIDO POR DOSE"
        },
        {
         "de": 36,
         "menor": 51,
         "txt": "1 E 1/2 COMPRIMIDO POR DOSE"
        },
        {
         "de": 51,
         "menor": 66,
         "txt": "02 COMPRIMIDOS POR DOSE"
        },
        {
         "de": 66,
         "menor": 80,
         "txt": "2 E 1/2 COMPRIMIDOS POR DOSE"
        },
        {
         "de": 80,
         "menor": 95,
         "txt": "03 COMPRIMIDOS POR DOSE"
        },
        {
         "de": 95,
         "menor": 110,
         "txt": "3 E 1/2 COMPRIMIDOS POR DOSE"
        },
        {
         "de": 110,
         "txt": "{=P*0.2} MG POR DOSE (200 MCG/KG), ARREDONDANDO PARA O MEIO COMPRIMIDO MAIS PRÓXIMO"
        }
       ]
      }
     ]
    ],
    "orient": [
     "TRATAR AO MESMO TEMPO TODOS OS CONTATOS DOMICILIARES E PARCEIROS SEXUAIS, MESMO SEM COCEIRA",
     "LAVAR ROUPAS, TOALHAS E ROUPAS DE CAMA USADAS NOS ÚLTIMOS 03 DIAS EM ÁGUA QUENTE (ACIMA DE 60 °C) OU GUARDÁ-LAS EM SACO PLÁSTICO FECHADO POR 72 HORAS",
     "A COCEIRA PODE PERSISTIR POR 02 A 04 SEMANAS APÓS O TRATAMENTO SEM SIGNIFICAR FALHA",
     "RETORNAR SE SURGIREM NOVAS LESÕES APÓS 04 SEMANAS OU SINAIS DE INFECÇÃO (PUS, CROSTAS AMARELADAS, DOR, FEBRE)"
    ]
   },
   {
    "label": "Padrão — Antipruriginoso",
    "draft": true,
    "items": [
     [
      "HIDROXIZINA 25 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO DE 8/8 HORAS"
     ]
    ]
   },
   {
    "label": "Combinação pronta — permetrina 5% + anti-histamínico",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "PERMETRINA 5% LOÇÃO",
      "01 FRASCO",
      "APLICAR À NOITE EM TODO O CORPO, DO PESCOÇO AOS PÉS (INCLUSIVE ENTRE OS DEDOS, SOB AS UNHAS, AXILAS, UMBIGO E GENITAIS), COM A PELE SECA. RETIRAR NO BANHO APÓS 08 A 14 HORAS. REPETIR APÓS 07 DIAS",
      "USO TÓPICO"
     ],
     [
      "HIDROXIZINA 25 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO DE 8/8 HORAS"
     ]
    ]
   },
   {
    "label": "Combinação pronta — ivermectina oral (alternativa à permetrina)",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "IVERMECTINA 6 MG",
      "03 A 08 COMPRIMIDOS (CONFORME O PESO)",
      "TOMAR COM ÁGUA, JUNTO COM UMA REFEIÇÃO, EM DOSE ÚNICA E REPETIR A MESMA DOSE APÓS 07 DIAS (200 MCG/KG POR DOSE) — EM COMPRIMIDOS DE 6 MG: {FAIXA}",
      "USO ORAL",
      {
       "sem_peso": "36 A 50 KG = 1 E 1/2 COMPRIMIDO; 51 A 65 KG = 02; 66 A 79 KG = 2 E 1/2; 80 A 94 KG = 03; 95 A 109 KG = 3 E 1/2; 110 KG OU MAIS = 200 MCG/KG",
       "faixas": [
        {
         "de": 15,
         "menor": 25,
         "txt": "1/2 COMPRIMIDO POR DOSE"
        },
        {
         "de": 25,
         "menor": 36,
         "txt": "01 COMPRIMIDO POR DOSE"
        },
        {
         "de": 36,
         "menor": 51,
         "txt": "1 E 1/2 COMPRIMIDO POR DOSE"
        },
        {
         "de": 51,
         "menor": 66,
         "txt": "02 COMPRIMIDOS POR DOSE"
        },
        {
         "de": 66,
         "menor": 80,
         "txt": "2 E 1/2 COMPRIMIDOS POR DOSE"
        },
        {
         "de": 80,
         "menor": 95,
         "txt": "03 COMPRIMIDOS POR DOSE"
        },
        {
         "de": 95,
         "menor": 110,
         "txt": "3 E 1/2 COMPRIMIDOS POR DOSE"
        },
        {
         "de": 110,
         "txt": "{=P*0.2} MG POR DOSE (200 MCG/KG), ARREDONDANDO PARA O MEIO COMPRIMIDO MAIS PRÓXIMO"
        }
       ]
      }
     ]
    ]
   },
   {
    "label": "Ivermectina pelo peso (02 doses) + hidroxizina",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "IVERMECTINA 6 MG",
      "03 A 08 COMPRIMIDOS (CONFORME O PESO)",
      "TOMAR COM ÁGUA, JUNTO COM UMA REFEIÇÃO, EM DOSE ÚNICA E REPETIR A MESMA DOSE APÓS 07 DIAS (200 MCG/KG POR DOSE) — EM COMPRIMIDOS DE 6 MG: {FAIXA}",
      "USO ORAL",
      {
       "sem_peso": "36 A 50 KG = 1 E 1/2 COMPRIMIDO; 51 A 65 KG = 02; 66 A 79 KG = 2 E 1/2; 80 A 94 KG = 03; 95 A 109 KG = 3 E 1/2; 110 KG OU MAIS = 200 MCG/KG",
       "faixas": [
        {
         "de": 15,
         "menor": 25,
         "txt": "1/2 COMPRIMIDO POR DOSE"
        },
        {
         "de": 25,
         "menor": 36,
         "txt": "01 COMPRIMIDO POR DOSE"
        },
        {
         "de": 36,
         "menor": 51,
         "txt": "1 E 1/2 COMPRIMIDO POR DOSE"
        },
        {
         "de": 51,
         "menor": 66,
         "txt": "02 COMPRIMIDOS POR DOSE"
        },
        {
         "de": 66,
         "menor": 80,
         "txt": "2 E 1/2 COMPRIMIDOS POR DOSE"
        },
        {
         "de": 80,
         "menor": 95,
         "txt": "03 COMPRIMIDOS POR DOSE"
        },
        {
         "de": 95,
         "menor": 110,
         "txt": "3 E 1/2 COMPRIMIDOS POR DOSE"
        },
        {
         "de": 110,
         "txt": "{=P*0.2} MG POR DOSE (200 MCG/KG), ARREDONDANDO PARA O MEIO COMPRIMIDO MAIS PRÓXIMO"
        }
       ]
      }
     ],
     [
      "HIDROXIZINA 25 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO DE 8/8 HORAS"
     ]
    ],
    "orient": [
     "TROCAR ROUPAS DE CAMA DIARIAMENTE DURANTE OS 3 PRIMEIROS DIAS DE TRATAMENTO"
    ]
   },
   {
    "label": "Padrão — permetrina 5% + anti-histamínico pelo peso",
    "mode": "ped",
    "draft": true,
    "items": [
     [
      "PERMETRINA 5% LOÇÃO",
      "01 FRASCO",
      "APLICAR À NOITE EM TODO O CORPO, DO PESCOÇO AOS PÉS (INCLUSIVE ENTRE OS DEDOS, SOB AS UNHAS, AXILAS, UMBIGO E GENITAIS), COM A PELE SECA; EM MENORES DE 2 ANOS INCLUIR COURO CABELUDO, FACE E ORELHAS, POUPANDO OLHOS E BOCA. RETIRAR NO BANHO APÓS 08 A 14 HORAS. REPETIR APÓS 07 DIAS",
      "USO TÓPICO"
     ],
     [
      "DEXCLORFENIRAMINA 0,4 MG/ML XAROPE",
      "01 FRASCO",
      "DAR {DOSE} VIA ORAL DE 8/8H SE COCEIRA (0,05 MG/KG/DOSE; MÁXIMO 2 MG/DOSE). NÃO USAR EM MENORES DE 2 ANOS",
      "USO ORAL",
      {
       "kg": 0.05,
       "conc": 0.4,
       "un": "ML",
       "max": 2
      }
     ]
    ],
    "orient": [
     "TRATAR AO MESMO TEMPO TODOS OS CONTATOS DOMICILIARES E CUIDADORES, MESMO SEM COCEIRA; PODE VOLTAR À CRECHE/ESCOLA 24 H APÓS A 1ª APLICAÇÃO",
     "LAVAR ROUPAS, TOALHAS E ROUPAS DE CAMA USADAS NOS ÚLTIMOS 03 DIAS EM ÁGUA QUENTE (ACIMA DE 60 °C) OU GUARDÁ-LAS EM SACO PLÁSTICO FECHADO POR 72 HORAS",
     "MANTER UNHAS CURTAS; A COCEIRA PODE PERSISTIR POR 02 A 04 SEMANAS APÓS O TRATAMENTO SEM SIGNIFICAR FALHA",
     "RETORNAR SE NOVAS LESÕES APÓS 04 SEMANAS, CROSTAS EXTENSAS (SARNA CROSTOSA) OU SINAIS DE INFECÇÃO (PUS, CROSTAS AMARELADAS, DOR, FEBRE)"
    ]
   },
   {
    "label": "Padrão — ivermectina oral pelo peso (≥ 15 kg e ≥ 5 anos; alternativa à permetrina ou surtos)",
    "peso": {
     "de": 15
    },
    "mode": "ped",
    "draft": true,
    "items": [
     [
      "IVERMECTINA 6 MG",
      "01 CAIXA",
      "TOMAR {DOSE} VIA ORAL, COM ÁGUA E JUNTO COM UMA REFEIÇÃO, EM DOSE ÚNICA E REPETIR A MESMA DOSE APÓS 07 DIAS (200 MCG/KG/DOSE; ARREDONDAR PARA MEIO COMPRIMIDO CONFORME A BULA: {FAIXA}). NÃO USAR EM MENORES DE 05 ANOS OU COM MENOS DE 15 KG",
      "USO ORAL",
      {
       "kg": 0.2,
       "un": "MG",
       "max": 12,
       "sem_peso": "15-24 KG = 1/2; 25-35 KG = 01; 36-50 KG = 1 E 1/2; 51-65 KG = 02 COMPRIMIDOS",
       "faixas": [
        {
         "de": 15,
         "menor": 25,
         "txt": "1/2 COMPRIMIDO"
        },
        {
         "de": 25,
         "menor": 36,
         "txt": "01 COMPRIMIDO"
        },
        {
         "de": 36,
         "menor": 51,
         "txt": "1 E 1/2 COMPRIMIDO"
        },
        {
         "de": 51,
         "menor": 66,
         "txt": "02 COMPRIMIDOS"
        }
       ]
      }
     ]
    ],
    "orient": [
     "NÃO USAR EM MENORES DE 05 ANOS OU COM MENOS DE 15 KG (BULA)",
     "SARNA CROSTOSA: IVERMECTINA NOS DIAS 1, 2, 8, 9 E 15 ASSOCIADA À PERMETRINA — DISCUTIR INTERNAÇÃO E DERMATOLOGIA"
    ]
   },
   {
    "label": "Menores de 2 meses ou intolerância à permetrina: enxofre precipitado em vaselina",
    "mode": "ped",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "ENXOFRE PRECIPITADO 5% EM VASELINA SÓLIDA (MANIPULADO)",
      "01 POTE",
      "APLICAR EM TODO O CORPO, INCLUSIVE COURO CABELUDO E FACE (POUPANDO OLHOS E BOCA), À NOITE POR 03 NOITES SEGUIDAS, RETIRANDO NO BANHO 24 H APÓS CADA APLICAÇÃO; REPETIR O CICLO APÓS 07 DIAS SE NECESSÁRIO",
      "USO TÓPICO"
     ]
    ],
    "orient": [
     "TEM CHEIRO FORTE E PODE MANCHAR ROUPAS; EM MENORES DE 2 MESES CONFIRMAR O DIAGNÓSTICO E ACOMPANHAR DE PERTO (DISCUTIR COM DERMATOLOGIA PEDIÁTRICA)"
    ]
   },
   {
    "label": "Do material do Drive — Benzoato de benzila 25% (alternativa à permetrina)",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "BENZOATO DE BENZILA 250 MG/ML (25%) EMULSÃO",
      "01 FRASCO",
      "APÓS O BANHO, COM A PELE SECA, APLICAR DO PESCOÇO AOS PÉS À NOITE E DEIXAR ATÉ O BANHO SEGUINTE; FAZER POR 03 NOITES SEGUIDAS E REPETIR O CICLO APÓS 07 DIAS. NÃO APLICAR NO ROSTO, MUCOSAS OU FERIDAS",
      "USO TÓPICO"
     ]
    ]
   },
   {
    "label": "Do material do Drive — Enxofre 10% em vaselina (gestante ou intolerância à permetrina)",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "ENXOFRE PRECIPITADO 10% EM VASELINA SÓLIDA (MANIPULADO)",
      "01 POTE",
      "APLICAR DO PESCOÇO AOS PÉS À NOITE POR 03 NOITES SEGUIDAS, RETIRANDO NO BANHO 24 H APÓS CADA APLICAÇÃO; REPETIR O CICLO APÓS 07 DIAS SE NECESSÁRIO",
      "USO TÓPICO"
     ]
    ]
   },
   {
    "label": "Do material do Drive — Antipruriginoso alternativo (dexclorfeniramina)",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "DEXCLORFENIRAMINA 2 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO À NOITE, PODENDO REPETIR ATÉ DE 8/8H SE COCEIRA INTENSA (CAUSA SONOLÊNCIA)",
      "USO ORAL"
     ]
    ]
   }
  ]
 },
 {
  "id": "faringo_inesp",
  "ic": "😷",
  "nm": "Faringoamigdalite inespecífica",
  "sub": "dipirona · paracetamol · flurbiprofeno",
  "blocks": [
   {
    "label": "Padrão — Analgésico / antitérmico — escolha 1",
    "draft": true,
    "menu": true,
    "items": [
     [
      "DIPIRONA 500 MG",
      "01 CAIXA",
      "TOMAR 02 COMPRIMIDOS SE DOR OU FEBRE, PODENDO REPETIR DE 6/6H"
     ],
     [
      "PARACETAMOL 750 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO SE DOR OU FEBRE, PODENDO REPETIR DE 6/6H. INTERCALAR COM DIPIRONA, SE NECESSÁRIO."
     ],
     [
      "IBUPROFENO 400 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO DE 8/8H SE DOR INTENSA, APÓS AS REFEIÇÕES, POR ATÉ 05 DIAS. NÃO USAR SE SUSPEITA DE DENGUE, DESIDRATAÇÃO, DOENÇA RENAL, ÚLCERA OU GESTAÇÃO",
      "USO ORAL"
     ]
    ],
    "orient": [
     "QUADRO PROVAVELMENTE VIRAL: ANTIBIÓTICO NÃO É NECESSÁRIO SE CENTOR/MCISAAC ≤ 1 OU TESTE RÁPIDO PARA ESTREPTOCOCO NEGATIVO (COM 2 A 3 PONTOS, ANTIBIÓTICO SÓ SE O TESTE FOR POSITIVO). A DOR DE GARGANTA COSTUMA MELHORAR EM ATÉ 07 DIAS",
     "MANTER BOA HIDRATAÇÃO E PREFERIR ALIMENTOS PASTOSOS, FRIOS OU MORNOS ENQUANTO HOUVER DOR",
     "RETORNAR IMEDIATAMENTE SE DIFICULDADE PARA ENGOLIR A PRÓPRIA SALIVA, PARA ABRIR A BOCA OU PARA RESPIRAR, VOZ ABAFADA, BABAR, INCHAÇO NO PESCOÇO, FEBRE POR MAIS DE 03 DIAS OU PIORA APÓS MELHORA INICIAL"
    ]
   },
   {
    "label": "Padrão — Pastilha para dor de garganta — escolha 1",
    "draft": true,
    "menu": true,
    "items": [
     [
      "FLURBIPROFENO 8,75 MG PASTILHA",
      "01 CAIXA",
      "DISSOLVER LENTAMENTE 01 PASTILHA NA BOCA SE DOR DE GARGANTA, PODENDO REPETIR A CADA 03 A 06H (MÁXIMO 05 PASTILHAS AO DIA), POR ATÉ 03 DIAS"
     ],
     [
      "DIFENIDRAMINA 5 MG + CLORETO DE AMÔNIO 50 MG + CITRATO DE SÓDIO 10 MG PASTILHA",
      "01 CAIXA",
      "DISSOLVER LENTAMENTE 01 PASTILHA NA BOCA SE IRRITAÇÃO OU DOR DE GARGANTA, PODENDO REPETIR (MÁXIMO 02 PASTILHAS POR HORA E 08 AO DIA). PODE CAUSAR SONOLÊNCIA; NÃO USAR EM MENORES DE 12 ANOS",
      "USO ORAL"
     ]
    ]
   },
   {
    "label": "Combinação pronta — sintomáticos, sem antibiótico",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "DIPIRONA 500 MG",
      "01 CAIXA",
      "TOMAR 02 COMPRIMIDOS SE DOR OU FEBRE, PODENDO REPETIR DE 6/6H"
     ],
     [
      "FLURBIPROFENO 8,75 MG PASTILHA",
      "01 CAIXA",
      "DISSOLVER LENTAMENTE 01 PASTILHA NA BOCA SE DOR DE GARGANTA, PODENDO REPETIR A CADA 03 A 06H (MÁXIMO 05 PASTILHAS AO DIA), POR ATÉ 03 DIAS"
     ]
    ]
   },
   {
    "label": "Receita — dipirona + pastilha para a garganta (difenidramina)",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "DIPIRONA 500MG",
      "01 CAIXA",
      "TOMAR 02 COMPRIMIDOS SE FEBRE OU DOR, PODENDO REPETIR DE 06/06H"
     ],
     [
      "DIFENIDRAMINA 5 MG + CLORETO DE AMÔNIO 50 MG + CITRATO DE SÓDIO 10 MG PASTILHA",
      "01 CAIXA",
      "DISSOLVER LENTAMENTE 01 PASTILHA NA BOCA SE IRRITAÇÃO OU DOR DE GARGANTA, PODENDO REPETIR (MÁXIMO 02 PASTILHAS POR HORA E 08 AO DIA). PODE CAUSAR SONOLÊNCIA; NÃO USAR EM MENORES DE 12 ANOS",
      "USO ORAL"
     ]
    ]
   },
   {
    "label": "Analgésico / antitérmico — escolha 1",
    "sec": "offlabel",
    "menu": true,
    "items": [
     [
      "DIPIRONA 500 MG",
      "01 CAIXA",
      "TOMAR 02 COMPRIMIDOS SE DOR OU FEBRE, PODENDO REPETIR DE 6/6H"
     ],
     [
      "PARACETAMOL 750 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO SE DOR OU FEBRE, PODENDO REPETIR DE 6/6H. INTERCALAR COM DIPIRONA, SE NECESSÁRIO."
     ]
    ]
   },
   {
    "label": "Padrão — analgesia EV, corticoide em dose única e hidratação (odinofagia intensa / baixa aceitação oral)",
    "mode": "internacao",
    "draft": true,
    "items": [
     [
      "DIPIRONA 500 MG/ML SOLUÇÃO INJETÁVEL",
      "01 AMPOLA",
      "ADMINISTRAR 1 G (02 ML) EV DILUÍDO, ATÉ DE 6/6H, SE DOR OU FEBRE",
      "USO ENDOVENOSO"
     ],
     [
      "CETOPROFENO 100 MG PÓ LIÓFILO PARA SOLUÇÃO INJETÁVEL",
      "01 FRASCO-AMPOLA",
      "SE DOR INTENSA APESAR DA DIPIRONA: ADMINISTRAR 100 MG EV DE 12/12H, DILUÍDO EM 100 ML DE SF 0,9%, EM 20 MINUTOS (EVITAR SE DOENÇA RENAL, ÚLCERA PÉPTICA, GESTAÇÃO OU SUSPEITA DE DENGUE)",
      "USO ENDOVENOSO"
     ],
     [
      "DEXAMETASONA 4 MG/ML SOLUÇÃO INJETÁVEL",
      "01 AMPOLA 2,5 ML",
      "ADMINISTRAR 10 MG (2,5 ML) EV EM DOSE ÚNICA SE ODINOFAGIA INTENSA OU INCAPACIDADE DE DEGLUTIR",
      "USO ENDOVENOSO"
     ],
     [
      "CLORETO DE SÓDIO 0,9% (SORO FISIOLÓGICO)",
      "01 BOLSA 500 ML",
      "SE DESIDRATAÇÃO OU BAIXA ACEITAÇÃO ORAL: INFUNDIR 500 ML EV EM 01 HORA E REAVALIAR; REPETIR CONFORME ESTADO DE HIDRATAÇÃO E DIURESE",
      "USO ENDOVENOSO"
     ]
    ],
    "orient": [
     "MONITORAR SINAIS VITAIS, CAPACIDADE DE DEGLUTIÇÃO, ACEITAÇÃO ORAL E DIURESE; PASSAR PARA DIETA E MEDICAÇÃO ORAL ASSIM QUE TOLERADO",
     "QUADRO PROVAVELMENTE VIRAL: ANTIBIÓTICO SOMENTE SE TESTE RÁPIDO PARA ESTREPTOCOCO POSITIVO OU CENTOR/MCISAAC ≥ 4 SEM TESTE DISPONÍVEL (VER OUTRAS OPÇÕES)",
     "SINAIS DE COMPLICAÇÃO SUPURATIVA (TRISMO, VOZ ABAFADA, ABAULAMENTO PERIAMIGDALIANO, DESVIO DA ÚVULA, SIALORREIA, EDEMA OU RIGIDEZ CERVICAL): SOLICITAR OTORRINOLARINGOLOGIA E TC CERVICAL COM CONTRASTE",
     "ESTRIDOR, DISPNEIA, INCAPACIDADE DE DEGLUTIR A SALIVA OU SEPSE: PRIORIZAR VIA AÉREA E AVALIAR UTI",
     "SUSPEITA DE MONONUCLEOSE (LINFONODOMEGALIA CERVICAL POSTERIOR, ESPLENOMEGALIA, EXSUDATO EXUBERANTE): NÃO USAR AMOXICILINA/AMPICILINA"
    ]
   },
   {
    "label": "Faringite estreptocócica confirmada ou provável, sem via oral — penicilina benzatina IM dose única",
    "mode": "internacao",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "PENICILINA G BENZATINA 1.200.000 UI PÓ PARA SUSPENSÃO INJETÁVEL",
      "01 FRASCO-AMPOLA",
      "ADMINISTRAR 1.200.000 UI IM PROFUNDO NO GLÚTEO EM DOSE ÚNICA, APÓS RECONSTITUIÇÃO; OBSERVAR O PACIENTE POR 30 MINUTOS APÓS A APLICAÇÃO",
      "USO INTRAMUSCULAR"
     ]
    ],
    "orient": [
     "EM ALERGIA À PENICILINA, PREFERIR ESQUEMA ORAL ASSIM QUE POSSÍVEL (CEFALEXINA SE ALERGIA NÃO GRAVE; AZITROMICINA OU CLINDAMICINA SE ANAFILAXIA)"
    ]
   },
   {
    "label": "Suspeita de abscesso periamigdaliano / infecção cervical profunda — ATB EV + otorrino — escolha 1",
    "mode": "internacao",
    "sec": "offlabel",
    "draft": true,
    "menu": true,
    "items": [
     [
      "AMPICILINA + SULBACTAM 3 G (2 G + 1 G) PÓ PARA SOLUÇÃO INJETÁVEL",
      "01 FRASCO-AMPOLA",
      "ADMINISTRAR 3 G EV DE 6/6H, DILUÍDO EM 100 ML DE SF 0,9%, EM 30 MINUTOS",
      "USO ENDOVENOSO"
     ],
     [
      "CLINDAMICINA 150 MG/ML SOLUÇÃO INJETÁVEL",
      "01 AMPOLA 4 ML",
      "SE ALERGIA À PENICILINA: ADMINISTRAR 600 MG (04 ML) EV DE 8/8H, DILUÍDO EM 100 ML DE SF 0,9%, EM 30 MINUTOS",
      "USO ENDOVENOSO"
     ]
    ],
    "orient": [
     "ABSCESSO CONFIRMADO EXIGE DRENAGEM (PUNÇÃO OU INCISÃO) PELA OTORRINOLARINGOLOGIA; O ANTIBIÓTICO ISOLADO NÃO SUBSTITUI A DRENAGEM"
    ]
   },
   {
    "label": "Padrão — sintomáticos (dor e febre) — escolha 1",
    "mode": "ped",
    "draft": true,
    "menu": true,
    "items": [
     [
      "DIPIRONA 500 MG/ML SOLUÇÃO ORAL (GOTAS)",
      "01 FRASCO",
      "DAR {DOSE} VIA ORAL DE 6/6H SE DOR OU FEBRE (15 MG/KG/DOSE). NÃO USAR EM MENORES DE 03 MESES OU COM MENOS DE 05 KG",
      "USO ORAL",
      {
       "kg": 15,
       "conc": 500,
       "gotas": 20,
       "un": "GOTAS",
       "max": 1000
      }
     ],
     [
      "PARACETAMOL 200 MG/ML SOLUÇÃO ORAL (GOTAS)",
      "01 FRASCO",
      "DAR {DOSE} VIA ORAL DE 6/6H SE DOR OU FEBRE (15 MG/KG/DOSE; 1 GOTA ≈ 13 MG). NÃO ULTRAPASSAR 05 DOSES EM 24H",
      "USO ORAL",
      {
       "kg": 15,
       "conc": 200,
       "gotas": 15,
       "un": "GOTAS",
       "max": 750
      }
     ],
     [
      "IBUPROFENO 50 MG/ML SUSPENSÃO ORAL (GOTAS)",
      "01 FRASCO",
      "DAR {DOSE} VIA ORAL DE 8/8H SE DOR OU FEBRE, APÓS ALIMENTAÇÃO (10 MG/KG/DOSE; 1 GOTA = 5 MG). NÃO USAR EM MENORES DE 06 MESES, SE DESIDRATAÇÃO OU SUSPEITA DE DENGUE",
      "USO ORAL",
      {
       "kg": 10,
       "conc": 50,
       "gotas": 10,
       "un": "GOTAS",
       "max": 200
      }
     ]
    ],
    "orient": [
     "QUADRO GERALMENTE VIRAL (ESPECIALMENTE EM MENORES DE 03 ANOS, QUE NÃO DEVEM SER TESTADOS DE ROTINA): ANTIBIÓTICO SÓ SE TESTE RÁPIDO PARA ESTREPTOCOCO POSITIVO OU CENTOR/MCISAAC ≥ 4 SEM TESTE DISPONÍVEL (VER OUTRAS OPÇÕES)",
     "OFERECER LÍQUIDOS COM FREQUÊNCIA E PREFERIR ALIMENTOS FRIOS E PASTOSOS; MEDIR AS GOTAS COM O CONTA-GOTAS DO PRÓPRIO FRASCO",
     "NÃO USAR ÁCIDO ACETILSALICÍLICO (AAS) EM CRIANÇAS COM QUADRO VIRAL (RISCO DE SÍNDROME DE REYE)",
     "RETORNAR IMEDIATAMENTE SE RECUSA DE LÍQUIDOS OU POUCA URINA, BABAR, DIFICULDADE PARA RESPIRAR OU PARA ABRIR A BOCA, VOZ ABAFADA, PESCOÇO INCHADO OU RÍGIDO, SONOLÊNCIA OU FEBRE POR MAIS DE 03 DIAS"
    ]
   },
   {
    "label": "Faringite estreptocócica (teste rápido positivo ou alta suspeita) — antibiótico — escolha 1",
    "mode": "ped",
    "sec": "offlabel",
    "draft": true,
    "menu": true,
    "items": [
     [
      "AMOXICILINA 250 MG/5 ML SUSPENSÃO ORAL",
      "01 A 02 FRASCOS (CONFORME O PESO, PARA 10 DIAS)",
      "DAR {DOSE} VIA ORAL DE 12/12H POR 10 DIAS (50 MG/KG/DIA; MÁXIMO 500 MG POR DOSE)",
      "USO ORAL",
      {
       "kgdia": 50,
       "vezes": 2,
       "conc": 50,
       "un": "ML",
       "max": 500
      }
     ],
     [
      "PENICILINA G BENZATINA 600.000 UI OU 1.200.000 UI PÓ PARA SUSPENSÃO INJETÁVEL",
      "01 FRASCO-AMPOLA",
      "ADMINISTRAR IM PROFUNDO EM DOSE ÚNICA: {FAIXA}. OBSERVAR A CRIANÇA POR 30 MINUTOS APÓS A APLICAÇÃO",
      "USO INTRAMUSCULAR",
      {
       "sem_peso": "PESO < 20 KG: 600.000 UI; PESO ≥ 20 KG: 1.200.000 UI",
       "faixas": [
        {
         "menor": 20,
         "txt": "600.000 UI"
        },
        {
         "de": 20,
         "txt": "1.200.000 UI"
        }
       ]
      }
     ],
     [
      "CEFALEXINA 250 MG/5 ML SUSPENSÃO ORAL",
      "01 A 02 FRASCOS (CONFORME O PESO, PARA 10 DIAS)",
      "SE ALERGIA NÃO GRAVE À PENICILINA: DAR {DOSE} VIA ORAL DE 12/12H POR 10 DIAS (20 MG/KG/DOSE; MÁXIMO 500 MG POR DOSE)",
      "USO ORAL",
      {
       "kg": 20,
       "conc": 50,
       "un": "ML",
       "max": 500
      }
     ],
     [
      "AZITROMICINA 200 MG/5 ML SUSPENSÃO ORAL",
      "01 A 02 FRASCOS (CONFORME O PESO)",
      "SE ALERGIA GRAVE (ANAFILÁTICA) À PENICILINA: DAR {DOSE} VIA ORAL 01 VEZ AO DIA POR 05 DIAS (12 MG/KG/DIA; MÁXIMO 500 MG)",
      "USO ORAL",
      {
       "kg": 12,
       "conc": 40,
       "un": "ML",
       "max": 500
      }
     ]
    ],
    "orient": [
     "COMPLETAR O TRATAMENTO (10 DIAS; AZITROMICINA 05 DIAS) MESMO COM MELHORA — PREVINE FEBRE REUMÁTICA",
     "PODE VOLTAR À ESCOLA APÓS 12 HORAS DE ANTIBIÓTICO E SEM FEBRE"
    ]
   }
  ]
 },
 {
  "id": "faringo_estrep",
  "ic": "😷",
  "nm": "Faringoamigdalite estreptocócica",
  "sub": "amoxicilina · penicilina benzatina · cefalexina · azitromicina",
  "blocks": [
   {
    "label": "Padrão — Antibiótico (penicilina benzatina IM = dose única na unidade) — escolha 1",
    "draft": true,
    "menu": true,
    "items": [
     [
      "AMOXICILINA 500MG",
      "30 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO DE 08/08H POR 10 DIAS HORÁRIO SUGERIDO: 06:00 / 14:00 / 22:00"
     ],
     [
      "BENZILPENICILINA BENZATINA 1.200.000 UI",
      "01 FRASCO-AMPOLA",
      "APLICAR 01 FRASCO-AMPOLA (1.200.000 UI) EM DOSE ÚNICA, NO GLÚTEO, NA UNIDADE DE SAÚDE",
      "USO INTRAMUSCULAR"
     ]
    ],
    "orient": [
     "TOMAR O ANTIBIÓTICO ATÉ O FIM (10 DIAS), MESMO COM MELHORA, PARA PREVENIR FEBRE REUMÁTICA",
     "PODE RETORNAR AO TRABALHO OU À ESCOLA APÓS PELO MENOS 12 HORAS DE ANTIBIÓTICO E SEM FEBRE",
     "PREFERIR ALIMENTOS PASTOSOS E FRIOS E MANTER BOA HIDRATAÇÃO",
     "RETORNAR SE A FEBRE PERSISTIR APÓS 72 HORAS DE ANTIBIÓTICO, OU IMEDIATAMENTE SE DIFICULDADE PARA ENGOLIR A SALIVA OU ABRIR A BOCA, VOZ ABAFADA, INCHAÇO NO PESCOÇO OU FALTA DE AR"
    ]
   },
   {
    "label": "Padrão — alergia à penicilina (cefalexina se reação não grave; azitromicina se anafilaxia) — escolha 1",
    "draft": true,
    "menu": true,
    "items": [
     [
      "CEFALEXINA 500 MG",
      "20 CÁPSULAS",
      "TOMAR 01 CÁPSULA DE 12/12H POR 10 DIAS. HORÁRIO SUGERIDO: 08:00 / 20:00"
     ],
     [
      "AZITROMICINA 500MG",
      "05 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO AO DIA, NO MESMO HORÁRIO, POR 05 DIAS HORÁRIO SUGERIDO: 08:00"
     ]
    ]
   },
   {
    "label": "Padrão — Analgésico / antitérmico — escolha 1",
    "draft": true,
    "menu": true,
    "items": [
     [
      "DIPIRONA 500 MG",
      "01 CAIXA",
      "TOMAR 02 COMPRIMIDOS SE DOR OU FEBRE, PODENDO REPETIR DE 6/6H"
     ],
     [
      "PARACETAMOL 750 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO SE DOR OU FEBRE, PODENDO REPETIR DE 6/6H. INTERCALAR COM DIPIRONA, SE NECESSÁRIO."
     ]
    ]
   },
   {
    "label": "Combinação pronta — amoxicilina VO por 10 dias",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "AMOXICILINA 500MG",
      "30 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO DE 08/08H POR 10 DIAS HORÁRIO SUGERIDO: 06:00 / 14:00 / 22:00"
     ],
     [
      "DIPIRONA 500 MG",
      "01 CAIXA",
      "TOMAR 02 COMPRIMIDOS SE DOR OU FEBRE, PODENDO REPETIR DE 6/6H"
     ]
    ]
   },
   {
    "label": "Combinação pronta — alternativa à amoxicilina: penicilina benzatina IM dose única",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "BENZILPENICILINA BENZATINA 1.200.000 UI",
      "01 FRASCO-AMPOLA",
      "APLICAR 01 FRASCO-AMPOLA (1.200.000 UI) EM DOSE ÚNICA, NO GLÚTEO, NA UNIDADE DE SAÚDE",
      "USO INTRAMUSCULAR"
     ],
     [
      "DIPIRONA 500 MG",
      "01 CAIXA",
      "TOMAR 02 COMPRIMIDOS SE DOR OU FEBRE, PODENDO REPETIR DE 6/6H"
     ]
    ]
   },
   {
    "label": "Opção 2 — anafilaxia à penicilina: azitromicina 05 dias + dipirona",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "AZITROMICINA 500MG",
      "05 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO AO DIA, NO MESMO HORÁRIO, POR 05 DIAS HORÁRIO SUGERIDO: 08:00"
     ],
     [
      "DIPIRONA 500MG",
      "01 CAIXA",
      "TOMAR 02 COMPRIMIDOS SE FEBRE OU DOR, PODENDO REPETIR DE 06/06H"
     ]
    ]
   },
   {
    "label": "Analgésico / antitérmico — escolha 1",
    "sec": "offlabel",
    "menu": true,
    "items": [
     [
      "DIPIRONA 500 MG",
      "01 CAIXA",
      "TOMAR 02 COMPRIMIDOS SE DOR OU FEBRE, PODENDO REPETIR DE 6/6H"
     ],
     [
      "PARACETAMOL 750 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO SE DOR OU FEBRE, PODENDO REPETIR DE 6/6H. INTERCALAR COM DIPIRONA, SE NECESSÁRIO."
     ]
    ]
   },
   {
    "label": "Padrão — antibiótico sem via oral — escolha 1",
    "mode": "internacao",
    "draft": true,
    "menu": true,
    "items": [
     [
      "BENZILPENICILINA BENZATINA 1.200.000 UI",
      "01 FRASCO-AMPOLA",
      "APLICAR 01 FRASCO-AMPOLA (1.200.000 UI) IM PROFUNDO NO GLÚTEO EM DOSE ÚNICA (TRATAMENTO COMPLETO)",
      "USO INTRAMUSCULAR"
     ],
     [
      "AMPICILINA 1 G PÓ PARA SOLUÇÃO INJETÁVEL",
      "01 FRASCO-AMPOLA",
      "ADMINISTRAR 1 G EV DE 6/6H, DILUÍDO EM 100 ML DE SF 0,9%, EM 30 MINUTOS, ATÉ TOLERAR VIA ORAL; DEPOIS AMOXICILINA 500 MG VO DE 8/8H ATÉ COMPLETAR 10 DIAS",
      "USO ENDOVENOSO"
     ]
    ],
    "orient": [
     "INDICAÇÕES DE OBSERVAÇÃO/INTERNAÇÃO: ODINOFAGIA QUE IMPEDE A INGESTÃO ORAL, DESIDRATAÇÃO, TOXEMIA OU SUSPEITA DE COMPLICAÇÃO SUPURATIVA",
     "CHECAR ALERGIA A PENICILINA ANTES DA PRIMEIRA DOSE E OBSERVAR O PACIENTE POR 30 MINUTOS APÓS A PENICILINA BENZATINA",
     "PROGREDIR DIETA PASTOSA E FRIA E PASSAR PARA VIA ORAL ASSIM QUE TOLERAR; ALTA COM ANTIBIÓTICO ATÉ COMPLETAR 10 DIAS (EXCETO SE PENICILINA BENZATINA)",
     "TRISMO, VOZ ABAFADA, ABAULAMENTO PERIAMIGDALIANO COM DESVIO DA ÚVULA OU EDEMA CERVICAL: SUSPEITAR DE ABSCESSO — TC CERVICAL COM CONTRASTE E OTORRINOLARINGOLOGIA",
     "ESTRIDOR, DISPNEIA OU INCAPACIDADE DE DEGLUTIR A PRÓPRIA SALIVA: VIA AÉREA EM RISCO — ACIONAR EQUIPE DE VIA AÉREA/UTI"
    ]
   },
   {
    "label": "Padrão — hidratação e analgesia EV",
    "mode": "internacao",
    "draft": true,
    "items": [
     [
      "CLORETO DE SÓDIO 0,9% (SORO FISIOLÓGICO)",
      "01 BOLSA 500 ML",
      "INFUNDIR 500 ML EV EM 1 HORA SE DESIDRATAÇÃO OU BAIXA INGESTÃO; REAVALIAR E REPETIR CONFORME DIURESE E ACEITAÇÃO ORAL",
      "USO ENDOVENOSO"
     ],
     [
      "DIPIRONA 500 MG/ML SOLUÇÃO INJETÁVEL",
      "01 AMPOLA 2 ML",
      "ADMINISTRAR 1 G (2 ML) EV, DILUÍDO EM 10 ML DE ÁGUA DESTILADA, LENTAMENTE, ATÉ DE 6/6H SE DOR OU FEBRE",
      "USO ENDOVENOSO"
     ],
     [
      "DEXAMETASONA 4 MG/ML SOLUÇÃO INJETÁVEL",
      "01 FRASCO-AMPOLA 2,5 ML",
      "ADMINISTRAR 10 MG (2,5 ML) EV EM DOSE ÚNICA SE ODINOFAGIA INTENSA (ADJUVANTE; NÃO SUBSTITUI O ANTIBIÓTICO)",
      "USO ENDOVENOSO"
     ]
    ]
   },
   {
    "label": "Alergia à penicilina — escolha 1",
    "mode": "internacao",
    "sec": "offlabel",
    "draft": true,
    "menu": true,
    "items": [
     [
      "CEFTRIAXONA 1 G PÓ PARA SOLUÇÃO INJETÁVEL",
      "01 FRASCO-AMPOLA",
      "ADMINISTRAR 1 G EV 01 VEZ AO DIA, DILUÍDO EM 100 ML DE SF 0,9%, EM 30 MINUTOS (ALERGIA NÃO GRAVE, SEM ANAFILAXIA); AO TOLERAR VO, TROCAR POR CEFALEXINA 500 MG DE 12/12H ATÉ COMPLETAR 10 DIAS",
      "USO ENDOVENOSO"
     ],
     [
      "CLINDAMICINA 150 MG/ML SOLUÇÃO INJETÁVEL",
      "01 AMPOLA 4 ML",
      "ADMINISTRAR 600 MG (4 ML) EV DE 8/8H, DILUÍDO EM 100 ML DE SF 0,9%, EM 30 MINUTOS (ANAFILAXIA OU ALERGIA GRAVE A BETALACTÂMICOS); AO TOLERAR VO, TROCAR POR CLINDAMICINA 300 MG DE 8/8H ATÉ COMPLETAR 10 DIAS",
      "USO ENDOVENOSO"
     ]
    ]
   },
   {
    "label": "Suspeita de abscesso periamigdaliano — escolha 1",
    "mode": "internacao",
    "sec": "offlabel",
    "draft": true,
    "menu": true,
    "items": [
     [
      "AMPICILINA + SULBACTAM 2 G + 1 G PÓ PARA SOLUÇÃO INJETÁVEL",
      "01 FRASCO-AMPOLA",
      "ADMINISTRAR 3 G EV DE 6/6H, DILUÍDO EM 100 ML DE SF 0,9%, EM 30 MINUTOS",
      "USO ENDOVENOSO"
     ],
     [
      "CLINDAMICINA 150 MG/ML SOLUÇÃO INJETÁVEL",
      "01 AMPOLA 4 ML",
      "ADMINISTRAR 600 MG (4 ML) EV DE 8/8H, DILUÍDO EM 100 ML DE SF 0,9%, EM 30 MINUTOS (ALERGIA A PENICILINA)",
      "USO ENDOVENOSO"
     ]
    ],
    "orient": [
     "DRENAGEM (PUNÇÃO-ASPIRAÇÃO OU INCISÃO) PELA OTORRINOLARINGOLOGIA É O TRATAMENTO PRINCIPAL; TC CERVICAL COM CONTRASTE SE DÚVIDA OU SUSPEITA DE ABSCESSO PROFUNDO (PARAFARÍNGEO/RETROFARÍNGEO)",
     "APÓS MELHORA CLÍNICA, TROCAR PARA AMOXICILINA + CLAVULANATO 875/125 MG VO DE 12/12H (OU CLINDAMICINA 300 MG VO DE 8/8H) ATÉ COMPLETAR 14 DIAS"
    ]
   },
   {
    "label": "Padrão — Amoxicilina VO por 10 dias",
    "mode": "ped",
    "draft": true,
    "items": [
     [
      "AMOXICILINA 250 MG/5 ML SUSPENSÃO ORAL",
      "01 A 02 FRASCOS (CONFORME O PESO, PARA 10 DIAS)",
      "DAR {DOSE} VIA ORAL DE 12/12H POR 10 DIAS (50 MG/KG/DIA; MÁXIMO 500 MG POR DOSE)",
      "USO ORAL",
      {
       "kgdia": 50,
       "vezes": 2,
       "conc": 50,
       "un": "ML",
       "max": 500
      }
     ]
    ],
    "orient": [
     "DAR O ANTIBIÓTICO ATÉ O FIM (10 DIAS), MESMO COM MELHORA, PARA PREVENIR FEBRE REUMÁTICA; AGITAR O FRASCO ANTES DE CADA DOSE E GUARDAR NA GELADEIRA",
     "PODE VOLTAR À ESCOLA OU CRECHE APÓS PELO MENOS 12 HORAS DE ANTIBIÓTICO E SEM FEBRE",
     "OFERECER LÍQUIDOS E ALIMENTOS PASTOSOS E FRIOS COM FREQUÊNCIA; NÃO DAR AAS (ÁCIDO ACETILSALICÍLICO)",
     "RETORNAR SE A FEBRE PERSISTIR APÓS 72 HORAS DE ANTIBIÓTICO, OU IMEDIATAMENTE SE DIFICULDADE PARA ENGOLIR A SALIVA OU ABRIR A BOCA, BABAR, VOZ ABAFADA, INCHAÇO NO PESCOÇO, RECUSA DE LÍQUIDOS OU FALTA DE AR"
    ]
   },
   {
    "label": "Padrão — alternativa: penicilina benzatina IM dose única, conforme o peso — escolha 1",
    "mode": "ped",
    "draft": true,
    "menu": true,
    "items": [
     [
      "BENZILPENICILINA BENZATINA 600.000 UI",
      "01 FRASCO-AMPOLA",
      "APLICAR 01 FRASCO-AMPOLA (600.000 UI) IM PROFUNDO EM DOSE ÚNICA, NA UNIDADE DE SAÚDE (CRIANÇA COM PESO < 20 KG)",
      "USO INTRAMUSCULAR",
      {
       "peso": {
        "menor": 20
       }
      }
     ],
     [
      "BENZILPENICILINA BENZATINA 1.200.000 UI",
      "01 FRASCO-AMPOLA",
      "APLICAR 01 FRASCO-AMPOLA (1.200.000 UI) IM PROFUNDO NO GLÚTEO EM DOSE ÚNICA, NA UNIDADE DE SAÚDE (PESO ≥ 20 KG)",
      "USO INTRAMUSCULAR",
      {
       "peso": {
        "de": 20
       }
      }
     ]
    ]
   },
   {
    "label": "Padrão — alergia à penicilina (cefalexina se reação não grave; azitromicina se anafilaxia) — escolha 1",
    "mode": "ped",
    "draft": true,
    "menu": true,
    "items": [
     [
      "CEFALEXINA 250 MG/5 ML SUSPENSÃO ORAL",
      "01 A 02 FRASCOS (CONFORME O PESO, PARA 10 DIAS)",
      "DAR {DOSE} VIA ORAL DE 12/12H POR 10 DIAS (20 MG/KG/DOSE; MÁXIMO 500 MG POR DOSE)",
      "USO ORAL",
      {
       "kg": 20,
       "conc": 50,
       "un": "ML",
       "max": 500
      }
     ],
     [
      "AZITROMICINA 200 MG/5 ML SUSPENSÃO ORAL",
      "01 A 02 FRASCOS (CONFORME O PESO)",
      "DAR {DOSE} VIA ORAL 01 VEZ AO DIA POR 05 DIAS (12 MG/KG/DIA; MÁXIMO 500 MG)",
      "USO ORAL",
      {
       "kg": 12,
       "conc": 40,
       "un": "ML",
       "max": 500
      }
     ]
    ]
   },
   {
    "label": "Padrão — Antitérmico / analgésico pelo peso — escolha 1",
    "mode": "ped",
    "draft": true,
    "menu": true,
    "items": [
     [
      "DIPIRONA 500 MG/ML SOLUÇÃO ORAL (GOTAS)",
      "01 FRASCO",
      "DAR {DOSE} VIA ORAL DE 6/6H SE DOR OU FEBRE (15 MG/KG/DOSE)",
      "USO ORAL",
      {
       "kg": 15,
       "conc": 500,
       "gotas": 20,
       "un": "GOTAS",
       "max": 1000
      }
     ],
     [
      "PARACETAMOL 200 MG/ML SOLUÇÃO ORAL (GOTAS)",
      "01 FRASCO",
      "DAR {DOSE} VIA ORAL DE 6/6H SE DOR OU FEBRE (15 MG/KG/DOSE)",
      "USO ORAL",
      {
       "kg": 15,
       "conc": 200,
       "gotas": 15,
       "un": "GOTAS",
       "max": 750
      }
     ],
     [
      "IBUPROFENO 50 MG/ML SUSPENSÃO ORAL (GOTAS)",
      "01 FRASCO",
      "DAR {DOSE} VIA ORAL DE 8/8H SE DOR OU FEBRE, APÓS ALIMENTAÇÃO (10 MG/KG/DOSE). SOMENTE ACIMA DE 6 MESES; NÃO USAR SE SUSPEITA DE DENGUE OU DESIDRATAÇÃO",
      "USO ORAL",
      {
       "kg": 10,
       "conc": 50,
       "gotas": 10,
       "un": "GOTAS",
       "max": 200
      }
     ]
    ]
   },
   {
    "label": "Combinação pronta — amoxicilina VO por 10 dias + antitérmico",
    "mode": "ped",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "AMOXICILINA 250 MG/5 ML SUSPENSÃO ORAL",
      "01 A 02 FRASCOS (CONFORME O PESO, PARA 10 DIAS)",
      "DAR {DOSE} VIA ORAL DE 12/12H POR 10 DIAS (50 MG/KG/DIA; MÁXIMO 500 MG POR DOSE)",
      "USO ORAL",
      {
       "kgdia": 50,
       "vezes": 2,
       "conc": 50,
       "un": "ML",
       "max": 500
      }
     ],
     [
      "DIPIRONA 500 MG/ML SOLUÇÃO ORAL (GOTAS)",
      "01 FRASCO",
      "DAR {DOSE} VIA ORAL DE 6/6H SE DOR OU FEBRE (15 MG/KG/DOSE)",
      "USO ORAL",
      {
       "kg": 15,
       "conc": 500,
       "gotas": 20,
       "un": "GOTAS",
       "max": 1000
      }
     ]
    ]
   },
   {
    "label": "Antitérmico/analgésico alternativo à dipirona — escolha 1",
    "mode": "ped",
    "sec": "offlabel",
    "draft": true,
    "menu": true,
    "items": [
     [
      "PARACETAMOL 200 MG/ML SOLUÇÃO ORAL (GOTAS)",
      "01 FRASCO",
      "DAR {DOSE} VIA ORAL DE 6/6H SE DOR OU FEBRE (15 MG/KG/DOSE)",
      "USO ORAL",
      {
       "kg": 15,
       "conc": 200,
       "gotas": 15,
       "un": "GOTAS",
       "max": 750
      }
     ],
     [
      "IBUPROFENO 50 MG/ML SUSPENSÃO ORAL (GOTAS)",
      "01 FRASCO",
      "DAR {DOSE} VIA ORAL DE 8/8H SE DOR OU FEBRE, APÓS ALIMENTAÇÃO (10 MG/KG/DOSE). SOMENTE ACIMA DE 6 MESES; NÃO USAR SE SUSPEITA DE DENGUE OU DESIDRATAÇÃO",
      "USO ORAL",
      {
       "kg": 10,
       "conc": 50,
       "gotas": 10,
       "un": "GOTAS",
       "max": 200
      }
     ]
    ]
   },
   {
    "label": "Do material do Drive — AINE: ibuprofeno 600 mg por 5 dias",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "IBUPROFENO 300 MG",
      "30 COMPRIMIDOS",
      "TOMAR 02 COMPRIMIDOS DE 8/8H, APÓS AS REFEIÇÕES, POR 05 DIAS. NÃO USAR SE SUSPEITA DE DENGUE, DOENÇA RENAL, ÚLCERA OU GESTAÇÃO",
      "USO ORAL"
     ]
    ]
   },
   {
    "label": "Do material do Drive — Alergia não grave à penicilina: cefuroxima por 10 dias",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "CEFUROXIMA 250 MG",
      "20 COMPRIMIDOS",
      "SE ALERGIA NÃO GRAVE (SEM ANAFILAXIA) À PENICILINA: TOMAR 01 COMPRIMIDO DE 12/12H, APÓS AS REFEIÇÕES, POR 10 DIAS. HORÁRIO SUGERIDO: 08:00 / 20:00",
      "USO ORAL"
     ]
    ]
   },
   {
    "label": "Do material do Drive — Alergia não anafilática: cefadroxila 1x/dia por 10 dias",
    "mode": "ped",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "CEFADROXILA 250 MG/5 ML SUSPENSÃO ORAL",
      "01 FRASCO",
      "SE ALERGIA NÃO ANAFILÁTICA À PENICILINA: DAR 30 MG/KG (0,6 ML/KG) VIA ORAL 01 VEZ AO DIA POR 10 DIAS (MÁXIMO 1 G POR DIA = 20 ML)",
      "USO ORAL"
     ]
    ]
   }
  ]
 },
 {
  "id": "gastrite",
  "ic": "🔥",
  "nm": "Gastrite / DRGE",
  "sub": "omeprazol · pantoprazol · hidróxido de alumínio",
  "blocks": [
   {
    "label": "Padrão — Inibidor de bomba de prótons por 08 semanas — escolha 1",
    "draft": true,
    "menu": true,
    "items": [
     [
      "OMEPRAZOL 20 MG",
      "56 CÁPSULAS",
      "TOMAR 01 CÁPSULA PELA MANHÃ, EM JEJUM, 30 MINUTOS ANTES DO CAFÉ DA MANHÃ, POR 08 SEMANAS"
     ],
     [
      "PANTOPRAZOL 40 MG",
      "56 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO PELA MANHÃ, EM JEJUM, 30 MINUTOS ANTES DO CAFÉ DA MANHÃ, POR 08 SEMANAS"
     ]
    ],
    "orient": [
     "EVITAR DEITAR-SE NAS DUAS HORAS APÓS AS REFEIÇÕES; SE SINTOMAS À NOITE, ELEVAR A CABECEIRA DA CAMA EM 15 A 20 CM (CALÇOS SOB OS PÉS DA CAMA)",
     "PERDER PESO SE SOBREPESO, PARAR DE FUMAR, REDUZIR ÁLCOOL E EVITAR ALIMENTOS QUE PIORAM OS SINTOMAS",
     "EVITAR ANTI-INFLAMATÓRIOS E AAS SEM ORIENTAÇÃO MÉDICA",
     "DISPEPSIA ATÉ 45 ANOS SEM SINAIS DE ALARME: PESQUISAR E TRATAR H. PYLORI NA UBS; ENDOSCOPIA DIGESTIVA ALTA SE IDADE ACIMA DE 45 ANOS, SINAIS DE ALARME OU FALHA DO TRATAMENTO",
     "RETORNAR IMEDIATAMENTE SE VÔMITOS COM SANGUE, FEZES PRETAS, DIFICULDADE OU DOR PARA ENGOLIR, VÔMITOS PERSISTENTES OU PERDA DE PESO SEM CAUSA"
    ]
   },
   {
    "label": "Padrão — Antiácido se azia (sintomático)",
    "draft": true,
    "items": [
     [
      "HIDRÓXIDO DE ALUMÍNIO 61,5 MG/ML SUSPENSÃO ORAL",
      "01 FRASCO",
      "TOMAR 10 ML SE AZIA OU QUEIMAÇÃO, 01 HORA APÓS AS REFEIÇÕES E AO DEITAR, ATÉ 04 VEZES AO DIA. TOMAR COM INTERVALO DE 02 HORAS DE OUTROS MEDICAMENTOS"
     ]
    ]
   },
   {
    "label": "Combinação pronta — IBP dose padrão por 08 semanas",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "OMEPRAZOL 20 MG",
      "56 CÁPSULAS",
      "TOMAR 01 CÁPSULA PELA MANHÃ, EM JEJUM, 30 MINUTOS ANTES DO CAFÉ DA MANHÃ, POR 08 SEMANAS"
     ],
     [
      "HIDRÓXIDO DE ALUMÍNIO 61,5 MG/ML SUSPENSÃO ORAL",
      "01 FRASCO",
      "TOMAR 10 ML SE AZIA OU QUEIMAÇÃO, 01 HORA APÓS AS REFEIÇÕES E AO DEITAR, ATÉ 04 VEZES AO DIA. TOMAR COM INTERVALO DE 02 HORAS DE OUTROS MEDICAMENTOS"
     ]
    ]
   },
   {
    "label": "Receita — resposta parcial à dose padrão: omeprazol 2 vezes ao dia por 08 semanas (+ simeticona se gases)",
    "sec": "offlabel",
    "items": [
     [
      "OMEPRAZOL 20 MG",
      "112 CÁPSULAS",
      "SOMENTE SE RESPOSTA PARCIAL APÓS 08 SEMANAS DE DOSE PADRÃO: TOMAR 01 CÁPSULA 30 MINUTOS ANTES DO CAFÉ DA MANHÃ E 01 CÁPSULA 30 MINUTOS ANTES DO JANTAR, POR 08 SEMANAS"
     ],
     [
      "SIMETICONA 40 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO SE DOR (GASES), PODENDO REPETIR DE 6/6H"
     ]
    ],
    "orient": [
     "ELEVAR A CABECEIRA DA CAMA (15 CM): USAR UM APOIO SOB OS PÉS DA CAMA OU TRAVESSEIROS",
     "EVITAR DEITAR-SE NAS DUAS HORAS APÓS AS REFEIÇÕES",
     "DIVIDIR AS REFEIÇÕES EM: CAFÉ DA MANHÃ – LANCHE DA MANHÃ – ALMOÇO – LANCHE DA TARDE – JANTAR"
    ]
   },
   {
    "label": "Do material do Drive — Outro IBP para as 08 semanas — escolha 1",
    "sec": "offlabel",
    "draft": true,
    "menu": true,
    "items": [
     [
      "LANSOPRAZOL 30 MG",
      "56 CÁPSULAS",
      "TOMAR 01 CÁPSULA PELA MANHÃ, EM JEJUM, 30 MINUTOS ANTES DO CAFÉ DA MANHÃ, POR 08 SEMANAS",
      "USO ORAL"
     ],
     [
      "ESOMEPRAZOL 40 MG",
      "28 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO PELA MANHÃ, EM JEJUM, 30 MINUTOS ANTES DO CAFÉ DA MANHÃ, POR 04 SEMANAS; SE ESOFAGITE AINDA NÃO CICATRIZADA, MAIS 04 SEMANAS",
      "USO ORAL"
     ]
    ]
   }
  ]
 },
 {
  "id": "gota",
  "ic": "🦶",
  "nm": "Gota — crise",
  "sub": "colchicina · naproxeno · prednisona",
  "blocks": [
   {
    "label": "Padrão — colchicina em baixa dose",
    "draft": true,
    "items": [
     [
      "COLCHICINA 0,5 MG",
      "15 COMPRIMIDOS",
      "NO 1º DIA: TOMAR 02 COMPRIMIDOS E, APÓS 01 HORA, MAIS 01 COMPRIMIDO. DO 2º AO 7º DIA: TOMAR 01 COMPRIMIDO DE 12/12H. SUSPENDER SE DIARREIA"
     ],
     [
      "DIPIRONA 500 MG",
      "01 CAIXA",
      "TOMAR 02 COMPRIMIDOS SE DOR OU FEBRE, PODENDO REPETIR DE 6/6H"
     ]
    ],
    "orient": [
     "APLICAR GELO ENVOLTO EM PANO NA ARTICULAÇÃO POR 15 A 20 MINUTOS, VÁRIAS VEZES AO DIA, E MANTER O MEMBRO EM REPOUSO E ELEVADO",
     "COLCHICINA: NÃO USAR SE DOENÇA RENAL OU HEPÁTICA GRAVE NEM COM CLARITROMICINA, CETOCONAZOL, ITRACONAZOL, RITONAVIR, CICLOSPORINA, VERAPAMIL OU DILTIAZEM — NESSES CASOS, USAR O CORTICOIDE (OU O AINE, SE PERMITIDO)",
     "SE JÁ USA ALOPURINOL, NÃO SUSPENDER DURANTE A CRISE",
     "EVITAR BEBIDAS ALCOÓLICAS (PRINCIPALMENTE CERVEJA E DESTILADOS), REFRIGERANTES E SUCOS ADOÇADOS E EXCESSO DE CARNES VERMELHAS, VÍSCERAS E FRUTOS DO MAR. MANTER BOA HIDRATAÇÃO",
     "AGENDAR CONSULTA NA UBS EM ATÉ 04 SEMANAS PARA DOSAR ÁCIDO ÚRICO E FUNÇÃO RENAL E AVALIAR TRATAMENTO PARA BAIXAR O ÁCIDO ÚRICO (ALOPURINOL)",
     "RETORNAR IMEDIATAMENTE SE FEBRE, CALAFRIOS, PIORA DA DOR APESAR DO TRATAMENTO, OUTRAS ARTICULAÇÕES ACOMETIDAS OU DIARREIA INTENSA"
    ]
   },
   {
    "label": "Padrão — alternativa à colchicina: AINE ou corticoide — escolha 1",
    "draft": true,
    "menu": true,
    "items": [
     [
      "NAPROXENO 500 MG",
      "10 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO DE 12/12H, APÓS AS REFEIÇÕES, POR 05 DIAS"
     ],
     [
      "PREDNISONA 20 MG",
      "08 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO E MEIO (30 MG) PELA MANHÃ, APÓS O CAFÉ, POR 05 DIAS"
     ]
    ]
   },
   {
    "label": "Primeira linha: AINE",
    "sec": "offlabel",
    "items": [
     [
      "NAPROXENO SÓDICO 250 MG",
      "30 COMPRIMIDOS",
      "TOMAR 02 COMPRIMIDOS DE 12/12H POR 3 DIAS HORÁRIO SUGERIDO: 08:00 / 20:00 DEPOIS 01 COMPRIMIDO DE 8/8H POR MAIS 5 DIAS HORÁRIO SUGERIDO: 06:00 / 14:00 / 22:00"
     ],
     [
      "DIPIRONA 500 MG",
      "01 CAIXA",
      "TOMAR 02 COMPRIMIDOS SE DOR OU FEBRE, PODENDO REPETIR DE 6/6H"
     ],
     [
      "OMEPRAZOL 20 MG",
      "10 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO PELA MANHÃ, EM JEJUM, POR 10 DIAS"
     ]
    ]
   },
   {
    "label": "Início do alopurinol (2 ou mais crises por ano, tofo ou dano articular): alopurinol em dose baixa + colchicina para prevenir crises",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "COLCHICINA 0,5 MG",
      "60 COMPRIMIDOS",
      "PARA PREVENIR CRISES AO INICIAR O ALOPURINOL: TOMAR 01 COMPRIMIDO DE 12/12H (01 VEZ AO DIA SE DOENÇA RENAL) POR 03 A 06 MESES. SUSPENDER SE DIARREIA"
     ],
     [
      "ALOPURINOL 100 MG",
      "30 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO 01 VEZ AO DIA, APÓS O CAFÉ (MEIO COMPRIMIDO SE DOENÇA RENAL CRÔNICA). A DOSE SERÁ AUMENTADA NA UBS A CADA 2 A 4 SEMANAS ATÉ O ÁCIDO ÚRICO FICAR ABAIXO DE 6 MG/DL",
      "USO ORAL"
     ]
    ],
    "orient": [
     "ALOPURINOL: PARAR E PROCURAR ATENDIMENTO IMEDIATAMENTE SE MANCHAS, BOLHAS OU DESCAMAÇÃO NA PELE, FEBRE OU FERIDAS NA BOCA (REAÇÃO GRAVE, MAIS COMUM NOS PRIMEIROS MESES)",
     "O ALOPURINOL É DE USO CONTÍNUO: NÃO SUSPENDER SE VIER UMA NOVA CRISE"
    ]
   },
   {
    "label": "Corticoide com redução gradual (crise poliarticular ou que volta ao parar o corticoide): prednisona por 11 dias",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "PREDNISONA 20 MG",
      "12 COMPRIMIDOS",
      "TOMAR 02 COMPRIMIDOS (40 MG) PELA MANHÃ, APÓS O CAFÉ, POR 03 DIAS; DEPOIS 01 COMPRIMIDO (20 MG) POR 04 DIAS E MEIO COMPRIMIDO (10 MG) POR MAIS 04 DIAS"
     ]
    ]
   },
   {
    "label": "Analgésico / antitérmico — escolha 1",
    "sec": "offlabel",
    "menu": true,
    "items": [
     [
      "DIPIRONA 500 MG",
      "01 CAIXA",
      "TOMAR 02 COMPRIMIDOS SE DOR OU FEBRE, PODENDO REPETIR DE 6/6H"
     ],
     [
      "PARACETAMOL 750 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO SE DOR OU FEBRE, PODENDO REPETIR DE 6/6H. INTERCALAR COM DIPIRONA, SE NECESSÁRIO."
     ]
    ]
   },
   {
    "label": "Do material do Drive — AINE alternativo na crise: indometacina 50 mg",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "INDOMETACINA 50 MG",
      "15 CÁPSULAS",
      "TOMAR 01 CÁPSULA DE 8/8H, APÓS AS REFEIÇÕES, POR 05 DIAS. EVITAR EM IDOSOS E SE DOENÇA RENAL, ÚLCERA OU INSUFICIÊNCIA CARDÍACA",
      "USO ORAL"
     ]
    ]
   },
   {
    "label": "Do material do Drive — Crise no PS: diclofenaco 75 mg IM em dose única",
    "mode": "internacao",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "DICLOFENACO SÓDICO 25 MG/ML SOLUÇÃO INJETÁVEL",
      "01 AMPOLA 3 ML",
      "SE SEM CONTRAINDICAÇÃO A AINE: ADMINISTRAR 75 MG (03 ML) IM PROFUNDO NO GLÚTEO, EM DOSE ÚNICA. NÃO INICIAR OUTRO AINE NAS 12 HORAS SEGUINTES",
      "USO INTRAMUSCULAR"
     ]
    ]
   }
  ]
 },
 {
  "id": "h1n1",
  "ic": "🤧",
  "nm": "H1N1 / Influenza — tratamento e profilaxia",
  "sub": "oseltamivir",
  "blocks": [
   {
    "label": "Padrão — quimioprofilaxia pós-exposição: oseltamivir 75 mg 1x/dia por 10 dias",
    "draft": true,
    "items": [
     [
      "OSELTAMIVIR 75 MG",
      "10 CÁPSULAS",
      "TOMAR 01 CÁPSULA AO DIA, APÓS UMA REFEIÇÃO, NO MESMO HORÁRIO, POR 10 DIAS SEGUIDOS"
     ]
    ],
    "orient": [
     "INICIAR EM ATÉ 48 HORAS APÓS O ÚLTIMO CONTATO COM CASO SUSPEITO OU CONFIRMADO DE INFLUENZA",
     "INDICAÇÃO RESTRITA (MS 2023): IMUNODEFICIÊNCIA GRAVE OU USO DE IMUNOSSUPRESSOR APÓS CONTATO COM CASO, OU RESIDENTE COM COMORBIDADE DE INSTITUIÇÃO DE LONGA PERMANÊNCIA EM SURTO. FORA DESSAS SITUAÇÕES, NÃO PRESCREVER: ORIENTAR E TRATAR SE SURGIREM SINTOMAS",
     "SE SURGIR FEBRE, TOSSE OU DOR DE GARGANTA, PROCURAR ATENDIMENTO: A DOSE PASSA A SER DE TRATAMENTO (75 MG DE 12/12H POR 05 DIAS)",
     "RETORNAR IMEDIATAMENTE SE FALTA DE AR, DOR NO PEITO, LÁBIOS ROXOS OU PIORA DO ESTADO GERAL; MANTER VACINAÇÃO ANUAL CONTRA INFLUENZA"
    ]
   },
   {
    "label": "Padrão — síndrome gripal com fator de risco: oseltamivir 75 mg de 12/12h por 05 dias",
    "draft": true,
    "items": [
     [
      "OSELTAMIVIR 75 MG CÁPSULA",
      "10 CÁPSULAS",
      "TOMAR 01 CÁPSULA DE 12/12H, APÓS UMA REFEIÇÃO, POR 05 DIAS SEGUIDOS. HORÁRIO SUGERIDO: 08:00 / 20:00",
      "USO ORAL"
     ]
    ],
    "orient": [
     "INDICADO EM TODA SÍNDROME GRIPAL COM FATOR DE RISCO, MESMO VACINADO E NO ATENDIMENTO AMBULATORIAL (MS 2023): GESTANTE OU PUÉRPERA ATÉ 2 SEMANAS, 60 ANOS OU MAIS, MENOR DE 5 ANOS, INDÍGENA ALDEADO, DOENÇA CRÔNICA (PULMONAR INCLUSIVE ASMA, CARDÍACA, RENAL, HEPÁTICA, HEMATOLÓGICA, DIABETES, NEUROLÓGICA), IMUNOSSUPRESSÃO, TUBERCULOSE OU OBESIDADE COM IMC ≥ 40",
     "INICIAR O MAIS CEDO POSSÍVEL, SEM ESPERAR O RESULTADO DO TESTE (MAIOR BENEFÍCIO NAS PRIMEIRAS 48H); SEM FATOR DE RISCO, PRESCREVER POR JULGAMENTO CLÍNICO",
     "AJUSTE RENAL DO TRATAMENTO: CLEARANCE 30-60 ML/MIN: 30 MG DE 12/12H; 10-30 ML/MIN: 30 MG 01 VEZ AO DIA; HEMODIÁLISE: 30 MG APÓS CADA SESSÃO",
     "AFASTAMENTO DO TRABALHO OU DA ESCOLA ATÉ 24 HORAS SEM FEBRE (SEM ANTITÉRMICO); LAVAR AS MÃOS, USAR MÁSCARA E COBRIR BOCA E NARIZ AO TOSSIR",
     "RETORNAR IMEDIATAMENTE SE FALTA DE AR, DOR NO PEITO, LÁBIOS ROXOS, FEBRE POR MAIS DE 3 DIAS OU QUE VOLTA APÓS MELHORAR, CONFUSÃO OU PIORA DO ESTADO GERAL"
    ]
   },
   {
    "label": "Padrão — quimioprofilaxia em paciente internado exposto: oseltamivir 75 mg 01 vez ao dia por 10 dias",
    "mode": "internacao",
    "draft": true,
    "items": [
     [
      "OSELTAMIVIR 75 MG CÁPSULA",
      "01 CÁPSULA",
      "ADMINISTRAR 01 CÁPSULA VIA ORAL (OU CONTEÚDO DILUÍDO EM ÁGUA PELA SONDA) 01 VEZ AO DIA POR 10 DIAS. AJUSTE RENAL: CLCR 30-60 ML/MIN: 30 MG 01 VEZ AO DIA; CLCR 10-30 ML/MIN: 30 MG EM DIAS ALTERNADOS; HEMODIÁLISE: 30 MG APÓS SESSÕES ALTERNADAS",
      "USO ORAL"
     ]
    ],
    "orient": [
     "INDICAR EM ATÉ 48 HORAS DO ÚLTIMO CONTATO COM CASO SUSPEITO OU CONFIRMADO, SOMENTE PARA PACIENTE COM IMUNODEFICIÊNCIA GRAVE OU EM USO DE IMUNOSSUPRESSOR (MS 2023)",
     "SURTO EM INSTITUIÇÃO DE LONGA PERMANÊNCIA OU ENFERMARIA QUE ATENDE PACIENTES COM FATORES DE RISCO (02 OU MAIS CASOS COM VÍNCULO EM ATÉ 72H): PROFILAXIA DOS EXPOSTOS COM COMORBIDADE POR NO MÍNIMO 02 SEMANAS E ATÉ 07 DIAS APÓS O ÚLTIMO CASO; ACIONAR A CCIH",
     "PRECAUÇÃO PARA GOTÍCULAS NOS CASOS E COORTE DOS EXPOSTOS; VACINAR CONTRA INFLUENZA PACIENTES E PROFISSIONAIS ELEGÍVEIS",
     "SE SURGIR FEBRE, TOSSE OU DOR DE GARGANTA: COLHER RT-PCR E PASSAR PARA DOSE DE TRATAMENTO (75 MG DE 12/12H POR 05 DIAS) SEM AGUARDAR O RESULTADO"
    ]
   },
   {
    "label": "Padrão — síndrome gripal com sinais de gravidade / SRAG: oseltamivir em dose de tratamento + suporte",
    "mode": "internacao",
    "draft": true,
    "items": [
     [
      "OSELTAMIVIR 75 MG CÁPSULA",
      "01 CÁPSULA",
      "ADMINISTRAR 01 CÁPSULA VIA ORAL OU PELA SONDA DE 12/12H POR 05 DIAS, INICIANDO O MAIS PRECOCE POSSÍVEL, INDEPENDENTEMENTE DO TEMPO DE SINTOMAS. AJUSTE RENAL: CLCR 30-60 ML/MIN: 30 MG DE 12/12H; CLCR 10-30 ML/MIN: 30 MG 01 VEZ AO DIA; HEMODIÁLISE: 30 MG APÓS CADA SESSÃO",
      "USO ORAL"
     ],
     [
      "OXIGÊNIO (O2) POR CATETER NASAL OU MÁSCARA",
      "CONFORME NECESSIDADE",
      "TITULAR PARA MANTER SPO2 ≥ 94% (88 A 92% SE DPOC OU RETENTOR DE CO2)",
      "USO INALATÓRIO"
     ],
     [
      "DIPIRONA 500 MG/ML SOLUÇÃO INJETÁVEL",
      "01 AMPOLA",
      "ADMINISTRAR 1 G (02 ML) EV DILUÍDO, ATÉ DE 6/6H, SE DOR OU FEBRE",
      "USO ENDOVENOSO"
     ],
     [
      "CLORETO DE SÓDIO 0,9% (SORO FISIOLÓGICO)",
      "01 BOLSA 500 ML",
      "SE DESIDRATAÇÃO OU HIPOTENSÃO: INFUNDIR 500 ML EV EM 30 MINUTOS E REAVALIAR; EVITAR HIDRATAÇÃO EXCESSIVA (PIORA RESPIRATÓRIA)",
      "USO ENDOVENOSO"
     ]
    ],
    "orient": [
     "SRAG: DISPNEIA OU DESCONFORTO RESPIRATÓRIO, SPO2 < 95% EM AR AMBIENTE, PRESSÃO PERSISTENTE NO TÓRAX OU CIANOSE — NOTIFICAR E COLHER RT-PCR, SEM AGUARDAR O RESULTADO PARA INICIAR O ANTIVIRAL",
     "MONITORIZAR SPO2, FR, FC, PA, DIURESE E NÍVEL DE CONSCIÊNCIA; SOLICITAR RX DE TÓRAX, HEMOGRAMA, FUNÇÃO RENAL E GASOMETRIA SE HIPOXEMIA",
     "CRITÉRIOS DE UTI: HIPOXEMIA PERSISTENTE APESAR DE O2, FR > 30 IRPM, CHOQUE, REBAIXAMENTO DO NÍVEL DE CONSCIÊNCIA OU NECESSIDADE DE SUPORTE VENTILATÓRIO",
     "CORTICOIDE NÃO É RECOMENDADO PARA INFLUENZA, SALVO OUTRA INDICAÇÃO (ASMA, DPOC, CHOQUE REFRATÁRIO)"
    ]
   },
   {
    "label": "Pneumonia bacteriana secundária (coinfecção) — ceftriaxona + azitromicina EV",
    "mode": "internacao",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "CEFTRIAXONA 1 G PÓ PARA SOLUÇÃO INJETÁVEL",
      "02 FRASCOS-AMPOLA",
      "ADMINISTRAR 2 G EV 01 VEZ AO DIA, DILUÍDO EM 100 ML DE SF 0,9%, EM 30 MINUTOS",
      "USO ENDOVENOSO"
     ],
     [
      "AZITROMICINA 500 MG PÓ PARA SOLUÇÃO INJETÁVEL",
      "01 FRASCO-AMPOLA",
      "ADMINISTRAR 500 MG EV 01 VEZ AO DIA, DILUÍDO EM 250 ML DE SF 0,9%, EM 01 HORA, POR 03 A 05 DIAS (PASSAR PARA VIA ORAL QUANDO ESTÁVEL)",
      "USO ENDOVENOSO"
     ]
    ],
    "orient": [
     "INDICAR SE PNEUMONIA BACTERIANA SECUNDÁRIA (NOVO INFILTRADO, PIORA APÓS MELHORA INICIAL, ESCARRO PURULENTO, LEUCOCITOSE OU PROCALCITONINA ELEVADA); COLHER HEMOCULTURAS E ESCARRO ANTES",
     "PNEUMONIA GRAVE OU NECROTIZANTE PÓS-INFLUENZA: CONSIDERAR S. AUREUS RESISTENTE (ASSOCIAR VANCOMICINA OU LINEZOLIDA CONFORME CCIH); DESCALONAR CONFORME CULTURAS"
    ]
   },
   {
    "label": "Padrão — quimioprofilaxia pós-exposição: oseltamivir 01 vez ao dia por 10 dias, conforme idade/peso — escolha 1",
    "mode": "ped",
    "draft": true,
    "menu": true,
    "items": [
     [
      "OSELTAMIVIR 75 MG CÁPSULA",
      "10 CÁPSULAS",
      "0 A 8 MESES (MENORES DE 03 MESES SOMENTE SE SITUAÇÃO CRÍTICA): ABRIR 01 CÁPSULA, DILUIR O CONTEÚDO EM 05 ML DE ÁGUA (15 MG/ML) E DAR {DOSE} VIA ORAL 01 VEZ AO DIA POR 10 DIAS (3 MG/KG/DOSE); DESPREZAR O RESTANTE E PREPARAR NOVA DILUIÇÃO A CADA DOSE",
      "USO ORAL",
      {
       "kg": 3,
       "conc": 15,
       "un": "ML",
       "max": 75
      }
     ],
     [
      "OSELTAMIVIR 75 MG CÁPSULA",
      "10 CÁPSULAS",
      "9 A 11 MESES: ABRIR 01 CÁPSULA, DILUIR O CONTEÚDO EM 05 ML DE ÁGUA (15 MG/ML) E DAR {DOSE} VIA ORAL 01 VEZ AO DIA POR 10 DIAS (3,5 MG/KG/DOSE); DESPREZAR O RESTANTE E PREPARAR NOVA DILUIÇÃO A CADA DOSE",
      "USO ORAL",
      {
       "kg": 3.5,
       "conc": 15,
       "un": "ML",
       "max": 75
      }
     ],
     [
      "OSELTAMIVIR 30 MG CÁPSULA",
      "10 CÁPSULAS",
      "01 ANO OU MAIS E ATÉ 15 KG: DAR 01 CÁPSULA (30 MG) VIA ORAL 01 VEZ AO DIA POR 10 DIAS (PODE ABRIR A CÁPSULA E MISTURAR O CONTEÚDO EM 02 ML DE ÁGUA COM UM POUCO DE ALIMENTO ADOCICADO)",
      "USO ORAL",
      {
       "peso": {
        "ate": 15
       }
      }
     ],
     [
      "OSELTAMIVIR 45 MG CÁPSULA",
      "10 CÁPSULAS",
      "ACIMA DE 15 KG ATÉ 23 KG: DAR 01 CÁPSULA (45 MG) VIA ORAL 01 VEZ AO DIA POR 10 DIAS (PODE ABRIR A CÁPSULA E MISTURAR O CONTEÚDO EM 02 ML DE ÁGUA COM UM POUCO DE ALIMENTO ADOCICADO)",
      "USO ORAL",
      {
       "peso": {
        "acima": 15,
        "ate": 23
       }
      }
     ],
     [
      "OSELTAMIVIR 30 MG CÁPSULA",
      "20 CÁPSULAS",
      "ACIMA DE 23 KG ATÉ 40 KG: DAR 02 CÁPSULAS (60 MG) VIA ORAL 01 VEZ AO DIA POR 10 DIAS (PODE ABRIR A CÁPSULA E MISTURAR O CONTEÚDO EM 02 ML DE ÁGUA COM UM POUCO DE ALIMENTO ADOCICADO)",
      "USO ORAL",
      {
       "peso": {
        "acima": 23,
        "ate": 40
       }
      }
     ],
     [
      "OSELTAMIVIR 75 MG CÁPSULA",
      "10 CÁPSULAS",
      "ACIMA DE 40 KG: DAR 01 CÁPSULA (75 MG) VIA ORAL 01 VEZ AO DIA POR 10 DIAS",
      "USO ORAL",
      {
       "peso": {
        "acima": 40
       }
      }
     ]
    ],
    "orient": [
     "INICIAR EM ATÉ 48 HORAS APÓS O ÚLTIMO CONTATO COM CASO SUSPEITO OU CONFIRMADO; APÓS ESSE PRAZO NÃO HÁ INDICAÇÃO",
     "INDICAÇÃO RESTRITA (MS 2023): CRIANÇA COM IMUNODEFICIÊNCIA GRAVE OU EM USO DE IMUNOSSUPRESSOR APÓS CONTATO COM CASO, OU RESIDENTE COM COMORBIDADE DE INSTITUIÇÃO DE LONGA PERMANÊNCIA EM SURTO",
     "SE SURGIR FEBRE, TOSSE OU DOR DE GARGANTA, REAVALIAR: A DOSE PASSA A SER DE TRATAMENTO (12/12H POR 05 DIAS)",
     "RETORNAR IMEDIATAMENTE SE RESPIRAÇÃO RÁPIDA OU DIFÍCIL, LÁBIOS ROXOS, RECUSA DE LÍQUIDOS, POUCA URINA, SONOLÊNCIA OU PIORA DO ESTADO GERAL; MANTER A VACINAÇÃO ANUAL CONTRA INFLUENZA"
    ]
   },
   {
    "label": "Padrão — síndrome gripal (menor de 5 anos ou com fator de risco): oseltamivir de 12/12h por 05 dias, conforme idade/peso — escolha 1",
    "mode": "ped",
    "draft": true,
    "menu": true,
    "items": [
     [
      "OSELTAMIVIR 75 MG CÁPSULA",
      "10 CÁPSULAS",
      "0 A 8 MESES: ABRIR 01 CÁPSULA, DILUIR O CONTEÚDO EM 05 ML DE ÁGUA (15 MG/ML) E DAR {DOSE} VIA ORAL DE 12/12H POR 05 DIAS (3 MG/KG/DOSE); DESPREZAR O RESTANTE E PREPARAR NOVA DILUIÇÃO A CADA DOSE",
      "USO ORAL",
      {
       "kg": 3,
       "conc": 15,
       "un": "ML",
       "max": 75
      }
     ],
     [
      "OSELTAMIVIR 75 MG CÁPSULA",
      "10 CÁPSULAS",
      "9 A 11 MESES: ABRIR 01 CÁPSULA, DILUIR O CONTEÚDO EM 05 ML DE ÁGUA (15 MG/ML) E DAR {DOSE} VIA ORAL DE 12/12H POR 05 DIAS (3,5 MG/KG/DOSE); DESPREZAR O RESTANTE E PREPARAR NOVA DILUIÇÃO A CADA DOSE",
      "USO ORAL",
      {
       "kg": 3.5,
       "conc": 15,
       "un": "ML",
       "max": 75
      }
     ],
     [
      "OSELTAMIVIR 30 MG CÁPSULA",
      "10 CÁPSULAS",
      "01 ANO OU MAIS E ATÉ 15 KG: DAR 01 CÁPSULA (30 MG) VIA ORAL DE 12/12H POR 05 DIAS (PODE ABRIR A CÁPSULA E MISTURAR O CONTEÚDO EM 02 ML DE ÁGUA COM UM POUCO DE ALIMENTO ADOCICADO)",
      "USO ORAL",
      {
       "peso": {
        "ate": 15
       }
      }
     ],
     [
      "OSELTAMIVIR 45 MG CÁPSULA",
      "10 CÁPSULAS",
      "ACIMA DE 15 KG ATÉ 23 KG: DAR 01 CÁPSULA (45 MG) VIA ORAL DE 12/12H POR 05 DIAS (PODE ABRIR A CÁPSULA E MISTURAR O CONTEÚDO EM 02 ML DE ÁGUA COM UM POUCO DE ALIMENTO ADOCICADO)",
      "USO ORAL",
      {
       "peso": {
        "acima": 15,
        "ate": 23
       }
      }
     ],
     [
      "OSELTAMIVIR 30 MG CÁPSULA",
      "20 CÁPSULAS",
      "ACIMA DE 23 KG ATÉ 40 KG: DAR 02 CÁPSULAS (60 MG) VIA ORAL DE 12/12H POR 05 DIAS (PODE ABRIR A CÁPSULA E MISTURAR O CONTEÚDO EM 02 ML DE ÁGUA COM UM POUCO DE ALIMENTO ADOCICADO)",
      "USO ORAL",
      {
       "peso": {
        "acima": 23,
        "ate": 40
       }
      }
     ],
     [
      "OSELTAMIVIR 75 MG CÁPSULA",
      "10 CÁPSULAS",
      "ACIMA DE 40 KG: DAR 01 CÁPSULA (75 MG) VIA ORAL DE 12/12H POR 05 DIAS",
      "USO ORAL",
      {
       "peso": {
        "acima": 40
       }
      }
     ]
    ],
    "orient": [
     "TRATAR TODA CRIANÇA MENOR DE 5 ANOS OU COM FATOR DE RISCO QUE TENHA SÍNDROME GRIPAL, MESMO VACINADA, O MAIS CEDO POSSÍVEL E SEM ESPERAR O TESTE (MS 2023); SRAG: INTERNAR E INICIAR NA HORA",
     "RECÉM-NASCIDO: 1 MG/KG/DOSE (< 38 SEMANAS), 1,5 MG/KG/DOSE (38-40 SEMANAS) OU 3 MG/KG/DOSE (> 40 SEMANAS DE IDADE GESTACIONAL) DE 12/12H — PRESCREVER COM A NEONATOLOGIA",
     "AFASTAR DA ESCOLA OU CRECHE ATÉ 24 HORAS SEM FEBRE (SEM ANTITÉRMICO)"
    ]
   }
  ]
 },
 {
  "id": "hiperglicemia",
  "ic": "🍬",
  "nm": "Hiperglicemia e hipoglicemia",
  "sub": "glicose 50% · glucagon · insulina regular · soro fisiológico · metformina",
  "blocks": [
   {
    "label": "Padrão — Hipoglicemia (glicemia < 70 mg/dL) — escolha 1",
    "mode": "internacao",
    "draft": true,
    "menu": true,
    "items": [
     [
      "GLICOSE 50% SOLUÇÃO INJETÁVEL",
      "10 AMPOLAS 10 ML",
      "SE GLICEMIA CAPILAR < 70 MG/DL E NÃO CONSEGUE INGERIR POR VIA ORAL: ADMINISTRAR 50 ML (25 G) EV EM VEIA CALIBROSA; REPETIR A GLICEMIA EM 15 MINUTOS E REPETIR A DOSE SE AINDA < 70 MG/DL. ETILISTA OU DESNUTRIDO: TIAMINA 100 MG EV ANTES OU JUNTO, SEM ATRASAR A GLICOSE. NÃO DAR ALTA SE A HIPOGLICEMIA FOR POR SULFONILUREIA OU INSULINA DE AÇÃO LONGA: OBSERVAR DE 12 A 24 H COM SORO GLICOSADO E GLICEMIAS SERIADAS",
      "USO ENDOVENOSO"
     ],
     [
      "GLUCAGON 1 MG PÓ LIÓFILO PARA SOLUÇÃO INJETÁVEL",
      "01 FRASCO-AMPOLA",
      "SEM ACESSO VENOSO: RECONSTITUIR E APLICAR 1 MG IM OU SC; QUANDO ACORDAR, OFERECER CARBOIDRATO VIA ORAL. POUCO EFICAZ EM ETILISTAS E DESNUTRIDOS",
      "USO INTRAMUSCULAR"
     ]
    ]
   },
   {
    "label": "Padrão — Cetoacidose / estado hiperosmolar: hidratação, potássio e insulina em bomba",
    "mode": "internacao",
    "draft": true,
    "items": [
     [
      "CLORETO DE SÓDIO 0,9% (SORO FISIOLÓGICO)",
      "01 BOLSA 1000 ML",
      "INFUNDIR 1.000 ML EV NA 1ª HORA (15 A 20 ML/KG); DEPOIS AJUSTAR VOLUME E TIPO DE SORO PELO SÓDIO CORRIGIDO, HIDRATAÇÃO E DIURESE (CAUTELA EM CARDIOPATAS E DOENTES RENAIS)",
      "USO ENDOVENOSO"
     ],
     [
      "CLORETO DE POTÁSSIO 19,1% SOLUÇÃO INJETÁVEL (2,56 MEQ/ML)",
      "01 AMPOLA 10 ML",
      "POTÁSSIO > 5,0 MEQ/L: NÃO REPOR. ENTRE 3,5 E 5,0: ACRESCENTAR 20 A 30 MEQ (08 A 12 ML) EM CADA LITRO DE SORO, PARA MANTER O POTÁSSIO ENTRE 4 E 5 — NÃO NO 1º LITRO DA 1ª HORA. < 3,5: REPOR ANTES DE INICIAR A INSULINA. MÁXIMO 10 MEQ/H EM VEIA PERIFÉRICA (20 MEQ/H SÓ COM MONITORIZAÇÃO CARDÍACA). NUNCA EM BOLUS",
      "USO ENDOVENOSO"
     ],
     [
      "INSULINA REGULAR HUMANA 100 UI/ML",
      "01 FRASCO-AMPOLA",
      "INICIAR SÓ COM POTÁSSIO ≥ 3,5 MEQ/L: INFUSÃO CONTÍNUA EM BOMBA — DILUIÇÃO, DOSE E VAZÃO PELA ABA CALCULADORAS › INSULINA REGULAR (CAD/EHH). GLICEMIA CAPILAR DE HORA EM HORA",
      "USO ENDOVENOSO"
     ]
    ],
    "orient": [
     "GLICEMIA CAPILAR DE 1/1H; POTÁSSIO, SÓDIO E GASOMETRIA VENOSA DE 2/2 A 4/4H; CALCULAR ÂNION GAP, SÓDIO CORRIGIDO E OSMOLALIDADE",
     "QUANDO A GLICEMIA CHEGAR A 250 MG/DL: ACRESCENTAR SORO GLICOSADO 5% E MANTER A INSULINA EV ATÉ RESOLVER A CETOACIDOSE (PH ≥ 7,3 OU BICARBONATO ≥ 18 E CETONEMIA < 0,6 MMOL/L)",
     "BICARBONATO SÓ SE PH < 7,0 (VER OUTRAS OPÇÕES)",
     "TRANSIÇÃO: INSULINA BASAL SC (NPH OU ANÁLOGO) 1 A 2 H ANTES DE DESLIGAR A BOMBA, COM A CRISE RESOLVIDA E O PACIENTE SE ALIMENTANDO",
     "PROCURAR E TRATAR O DESENCADEANTE (INFECÇÃO, FALTA DE INSULINA, IAM, PANCREATITE); SUSPENDER ISGLT2"
    ]
   },
   {
    "label": "Padrão — DM2 recém-diagnosticado, sem descompensação: metformina",
    "draft": true,
    "items": [
     [
      "METFORMINA 500 MG",
      "60 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO APÓS O JANTAR POR 07 DIAS; DEPOIS, 01 COMPRIMIDO APÓS O CAFÉ DA MANHÃ E 01 APÓS O JANTAR. NÃO USAR SE DOENÇA RENAL GRAVE (TFG < 30)",
      "USO ORAL"
     ]
    ],
    "orient": [
     "SE TREMOR, SUOR FRIO, FOME, CORAÇÃO ACELERADO OU CONFUSÃO (AÇÚCAR BAIXO) E ESTIVER ACORDADO: TOMAR 01 COPO DE SUCO DE LARANJA OU REFRIGERANTE COMUM (NÃO DIET) OU 01 COLHER DE SOPA DE AÇÚCAR EM MEIO COPO DE ÁGUA; MEDIR DE NOVO EM 15 MINUTOS E REPETIR SE CONTINUAR ABAIXO DE 70",
     "DEPOIS QUE A GLICOSE NORMALIZAR, FAZER UM LANCHE; NÃO PULAR REFEIÇÕES ENQUANTO USA INSULINA OU REMÉDIO QUE BAIXA O AÇÚCAR",
     "MARCAR CONSULTA NA UNIDADE DE SAÚDE EM ATÉ 7 DIAS PARA AJUSTAR O TRATAMENTO DO DIABETES",
     "RETORNAR IMEDIATAMENTE SE GLICOSE ACIMA DE 300 COM VÔMITOS, DOR NA BARRIGA, RESPIRAÇÃO RÁPIDA OU FUNDA, MUITA SEDE E MUITA URINA, SONOLÊNCIA OU CONFUSÃO; OU SE A GLICOSE BAIXA NÃO MELHORAR OU VOLTAR"
    ]
   },
   {
    "label": "Cetoacidose com pH < 7,0: bicarbonato de sódio",
    "mode": "internacao",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "BICARBONATO DE SÓDIO 8,4% (1 MEQ/ML) SOLUÇÃO INJETÁVEL",
      "100 ML",
      "SOMENTE SE PH < 7,0: DILUIR 100 ML (100 MEQ) EM 400 ML DE ÁGUA DESTILADA E INFUNDIR EM 2 HORAS; REPETIR A GASOMETRIA E REPETIR A CADA 2 H ATÉ PH ≥ 7,0. O POTÁSSIO CAI COM O BICARBONATO: REPOR E DOSAR",
      "USO ENDOVENOSO"
     ]
    ],
    "orient": [
     "NÃO USAR BICARBONATO COM PH ≥ 7,0 NEM NA CRIANÇA DE ROTINA (RISCO DE HIPOCALEMIA E EDEMA CEREBRAL)"
    ]
   },
   {
    "label": "Padrão — Cetoacidose na criança (ISPAD 2022): expansão, potássio e insulina EV sem bolus",
    "mode": "ped_internacao",
    "draft": true,
    "items": [
     [
      "CLORETO DE SÓDIO 0,9% (SORO FISIOLÓGICO)",
      "01 BOLSA 500 ML",
      "EXPANSÃO: INFUNDIR {DOSE} EV EM 20 A 30 MINUTOS (10 ML/KG); REPETIR SE A PERFUSÃO CONTINUAR RUIM. CHOQUE: 20 ML/KG O MAIS RÁPIDO POSSÍVEL",
      "USO ENDOVENOSO",
      {
       "kg": 10,
       "un": "ML",
       "max": 1000
      }
     ],
     [
      "CLORETO DE POTÁSSIO 19,1% SOLUÇÃO INJETÁVEL (2,56 MEQ/ML)",
      "01 AMPOLA 10 ML",
      "ACRESCENTAR 40 MEQ POR LITRO DO SORO DE REPOSIÇÃO (15,6 ML POR LITRO) A PARTIR DO FIM DA EXPANSÃO, JUNTO COM A INSULINA. K < 3,5: INICIAR JÁ NA EXPANSÃO E SÓ DEPOIS A INSULINA. K > 5,5: AGUARDAR A DIURESE. NUNCA EM BOLUS",
      "USO ENDOVENOSO"
     ],
     [
      "INSULINA REGULAR HUMANA 100 UI/ML",
      "01 FRASCO-AMPOLA",
      "INICIAR 1 H APÓS O INÍCIO DO SORO, SEM BOLUS: DILUIR 50 UI EM 50 ML DE SF 0,9% (1 UI/ML) E INFUNDIR {DOSE} POR HORA EM BOMBA (0,1 UI/KG/H; 0,05 UI/KG/H SE CRIANÇA PEQUENA OU PH > 7,15). NÃO PARAR A INSULINA ANTES DE RESOLVER A ACIDOSE",
      "USO ENDOVENOSO",
      {
       "kg": 0.1,
       "un": "UI",
       "max": 10
      }
     ]
    ],
    "orient": [
     "DEPOIS DA EXPANSÃO: REPOR O DÉFICIT (5 A 10% DO PESO) + MANUTENÇÃO EM 24 A 48 H COM SF 0,9% OU RINGER; ACRESCENTAR GLICOSE 5% QUANDO A GLICEMIA CAIR PARA 250-300 MG/DL OU CAIR MAIS DE 90 MG/DL POR HORA",
     "GLICEMIA DE 1/1H, ELETRÓLITOS E GASOMETRIA DE 2/2 A 4/4H E NÍVEL DE CONSCIÊNCIA DE 1/1H; DISCUTIR COM UTI PEDIÁTRICA",
     "EDEMA CEREBRAL (CEFALEIA, BRADICARDIA, HIPERTENSÃO, QUEDA DA CONSCIÊNCIA): REDUZIR O SORO E FAZER MANITOL 0,5 A 1 G/KG EV EM 10-15 MIN OU NACL 3% 2,5 A 5 ML/KG EV EM 10-15 MIN",
     "BICARBONATO NÃO É INDICADO DE ROTINA NA CRIANÇA"
    ]
   }
  ]
 },
 {
  "id": "hordeolo",
  "ic": "👁",
  "nm": "Hordéolo / Blefarite",
  "sub": "compressas mornas · tobramicina pomada",
  "blocks": [
   {
    "label": "Padrão — Compressas mornas + higiene palpebral (pomada antibiótica só na blefarite com crostas ou no hordéolo que drenou)",
    "draft": true,
    "items": [
     [
      "TOBRAMICINA 3 MG/G POMADA OFTÁLMICA",
      "01 BISNAGA",
      "SÓ SE BLEFARITE COM CROSTAS OU HORDÉOLO QUE DRENOU: APLICAR PEQUENA QUANTIDADE NA BORDA DOS CÍLIOS AFETADOS 02 VEZES AO DIA (MANHÃ E NOITE), APÓS A LIMPEZA DAS PÁLPEBRAS, POR 07 DIAS",
      "USO TÓPICO"
     ]
    ],
    "orient": [
     "APLICAR COMPRESSAS MORNAS (NÃO QUENTES) SOBRE AS PÁLPEBRAS POR 10 A 15 MINUTOS, 3 A 4 VEZES AO DIA, SEGUIDAS DE MASSAGEM SUAVE DA PÁLPEBRA",
     "LIMPAR A BORDA DAS PÁLPEBRAS 2 VEZES AO DIA COM XAMPU NEUTRO INFANTIL DILUÍDO EM ÁGUA MORNA (COTONETE OU GAZE); NA BLEFARITE (CRÔNICA), MANTER A HIGIENE DIARIAMENTE MESMO APÓS A MELHORA",
     "NÃO ESPREMER O TERÇOL; EVITAR MAQUIAGEM E LENTES DE CONTATO ATÉ A RESOLUÇÃO",
     "SEM MELHORA EM 2 A 4 SEMANAS, NÓDULO PERSISTENTE (CALÁZIO) OU LESÕES DE REPETIÇÃO: ENCAMINHAR AO OFTALMOLOGISTA",
     "RETORNAR IMEDIATAMENTE SE O INCHAÇO E A VERMELHIDÃO SE ESPALHAREM PARA TODA A PÁLPEBRA OU FACE, FEBRE, DOR AO MOVIMENTAR O OLHO OU PIORA DA VISÃO"
    ]
   },
   {
    "label": "Padrão — Celulite pré-septal leve (pálpebra inchada e vermelha, olho se move sem dor, visão normal, sem febre alta): antibiótico oral e reavaliar em 24 a 48 h — escolha 1",
    "draft": true,
    "menu": true,
    "items": [
     [
      "AMOXICILINA 875 MG + CLAVULANATO 125 MG",
      "14 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO DE 12/12H, NO INÍCIO DAS REFEIÇÕES, POR 07 DIAS",
      "USO ORAL"
     ],
     [
      "CEFALEXINA 500 MG",
      "28 CÁPSULAS",
      "SE A ORIGEM É A PELE DA PÁLPEBRA (TERÇOL, PICADA, FERIDA): TOMAR 01 CÁPSULA DE 6/6H POR 07 DIAS",
      "USO ORAL"
     ],
     [
      "CLINDAMICINA 300 MG",
      "28 CÁPSULAS",
      "ALERGIA À PENICILINA: TOMAR 01 CÁPSULA DE 6/6H POR 07 DIAS",
      "USO ORAL"
     ]
    ],
    "orient": [
     "RETORNAR EM 24 A 48 HORAS PARA REAVALIAÇÃO, MESMO QUE ESTEJA MELHORANDO",
     "PROCURAR O PRONTO-SOCORRO IMEDIATAMENTE SE DOR AO MEXER O OLHO, VISÃO DUPLA OU EMBAÇADA, OLHO SALTADO, FEBRE ALTA OU PIORA DO INCHAÇO (RISCO DE CELULITE ORBITÁRIA)"
    ]
   },
   {
    "label": "Padrão — Celulite pré-septal leve na criança (maior de 1 ano, bem, vacina Hib em dia, olho se move sem dor, visão normal): antibiótico oral pelo peso e reavaliar em 24 a 48 h — escolha 1",
    "mode": "ped",
    "draft": true,
    "menu": true,
    "items": [
     [
      "AMOXICILINA 400 MG + CLAVULANATO DE POTÁSSIO 57 MG/5 ML SUSPENSÃO ORAL",
      "01 FRASCO",
      "DAR {DOSE} VIA ORAL DE 12/12H, NO INÍCIO DAS REFEIÇÕES, POR 07 DIAS (45 MG/KG/DIA DE AMOXICILINA; MÁXIMO 875 MG POR DOSE)",
      "USO ORAL",
      {
       "kgdia": 45,
       "vezes": 2,
       "conc": 80,
       "un": "ML",
       "max": 875
      }
     ],
     [
      "CEFALEXINA 250 MG/5 ML SUSPENSÃO ORAL",
      "01 FRASCO",
      "SE A ORIGEM É A PELE DA PÁLPEBRA (TERÇOL, PICADA, FERIDA): DAR {DOSE} VIA ORAL DE 8/8H POR 07 DIAS (20 MG/KG/DOSE; MÁXIMO 750 MG)",
      "USO ORAL",
      {
       "kg": 20,
       "conc": 50,
       "un": "ML",
       "max": 750
      }
     ]
    ],
    "orient": [
     "RETORNAR EM 24 A 48 HORAS PARA REAVALIAÇÃO",
     "PROCURAR O PRONTO-SOCORRO IMEDIATAMENTE SE A CRIANÇA TIVER DOR AO MEXER O OLHO, OLHO SALTADO, VISÃO DUPLA, FEBRE ALTA, PROSTRAÇÃO OU PIORA DO INCHAÇO",
     "MENOR DE 1 ANO, VACINAÇÃO CONTRA HIB INCOMPLETA OU CRIANÇA COM APARÊNCIA DE DOENTE: INTERNAR PARA ANTIBIÓTICO ENDOVENOSO"
    ]
   }
  ]
 },
 {
  "id": "herpes_zoster",
  "ic": "🔴",
  "nm": "Herpes zóster",
  "sub": "aciclovir · valaciclovir · dipirona",
  "blocks": [
   {
    "label": "Padrão — Antiviral por 07 dias (iniciar até 72 h das lesões) — escolha 1",
    "draft": true,
    "menu": true,
    "items": [
     [
      "ACICLOVIR 400 MG",
      "70 COMPRIMIDOS",
      "TOMAR 02 COMPRIMIDOS DE 4/4H, EXCETUANDO-SE UMA DOSE NOTURNA, POR 07 DIAS SEGUIDOS HORÁRIO SUGERIDO: 06:00 – 10:00 – 14:00 – 18:00 – 22:00"
     ],
     [
      "VALACICLOVIR 500 MG",
      "42 COMPRIMIDOS",
      "TOMAR 02 COMPRIMIDOS DE 8/8H POR 07 DIAS SEGUIDOS HORÁRIO SUGERIDO: 06:00 / 14:00 / 22:00"
     ]
    ],
    "orient": [
     "INICIAR O ANTIVIRAL O QUANTO ANTES (IDEALMENTE NAS PRIMEIRAS 72H DO SURGIMENTO DAS LESÕES) E BEBER BASTANTE ÁGUA DURANTE O TRATAMENTO",
     "MANTER AS LESÕES LIMPAS E SECAS (LAVAR COM ÁGUA E SABÃO), USAR COMPRESSAS FRIAS PARA ALÍVIO E NÃO FURAR AS BOLHAS. NÃO APLICAR POMADAS COM CORTICOIDE OU ANTIBIÓTICO",
     "MANTER AS LESÕES COBERTAS E EVITAR CONTATO COM GESTANTES, RECÉM-NASCIDOS E IMUNOSSUPRIMIDOS ATÉ TODAS AS LESÕES VIRAREM CROSTA",
     "RETORNAR IMEDIATAMENTE SE LESÕES PRÓXIMAS AO OLHO OU NA PONTA DO NARIZ, ALTERAÇÃO DA VISÃO, LESÕES ESPALHADAS PELO CORPO, FEBRE ALTA, CONFUSÃO MENTAL, FRAQUEZA NA FACE OU NOS MEMBROS, OU PUS E VERMELHIDÃO CRESCENTE NAS LESÕES"
    ]
   },
   {
    "label": "Padrão — Analgésico / antitérmico — escolha 1",
    "draft": true,
    "menu": true,
    "items": [
     [
      "DIPIRONA 500 MG",
      "01 CAIXA",
      "TOMAR 02 COMPRIMIDOS SE DOR OU FEBRE, PODENDO REPETIR DE 6/6H"
     ],
     [
      "PARACETAMOL 750 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO SE DOR OU FEBRE, PODENDO REPETIR DE 6/6H. INTERCALAR COM DIPIRONA, SE NECESSÁRIO."
     ]
    ]
   },
   {
    "label": "Combinação pronta — aciclovir 07 dias + analgesia",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "ACICLOVIR 400 MG",
      "70 COMPRIMIDOS",
      "TOMAR 02 COMPRIMIDOS DE 4/4H, EXCETUANDO-SE UMA DOSE NOTURNA, POR 07 DIAS SEGUIDOS HORÁRIO SUGERIDO: 06:00 – 10:00 – 14:00 – 18:00 – 22:00"
     ],
     [
      "DIPIRONA 500 MG",
      "01 CAIXA",
      "TOMAR 02 COMPRIMIDOS SE DOR, PODENDO REPETIR DE 6/6H SE NECESSÁRIO"
     ]
    ]
   },
   {
    "label": "Combinação pronta — valaciclovir 07 dias (posologia 8/8h)",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "VALACICLOVIR 500 MG",
      "42 COMPRIMIDOS",
      "TOMAR 02 COMPRIMIDOS DE 8/8H POR 07 DIAS SEGUIDOS HORÁRIO SUGERIDO: 06:00 / 14:00 / 22:00"
     ],
     [
      "DIPIRONA 500 MG",
      "01 CAIXA",
      "TOMAR 02 COMPRIMIDOS SE DOR, PODENDO REPETIR DE 6/6H SE NECESSÁRIO"
     ]
    ]
   },
   {
    "label": "Aciclovir 07 dias + AINE + dipirona (dor moderada)",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "ACICLOVIR 400 MG",
      "70 COMPRIMIDOS",
      "TOMAR 02 COMPRIMIDOS DE 4/4H, EXCETUANDO-SE UMA DOSE NOTURNA, POR 07 DIAS SEGUIDOS HORÁRIO SUGERIDO: 06:00 – 10:00 – 14:00 – 18:00 – 22:00"
     ],
     [
      "DICLOFENACO 50 MG",
      "15 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO DE 8/8H POR 05 DIAS SEGUIDOS HORÁRIO SUGERIDO: 06:00 – 14:00 – 22:00"
     ],
     [
      "DIPIRONA 500 MG",
      "01 CAIXA",
      "TOMAR 02 COMPRIMIDOS SE DOR, PODENDO REPETIR DE 6/6H SE NECESSÁRIO"
     ]
    ]
   },
   {
    "label": "Analgésico/antitérmico — escolha 1",
    "sec": "offlabel",
    "menu": true,
    "items": [
     [
      "DIPIRONA 500 MG",
      "01 CAIXA",
      "TOMAR 02 COMPRIMIDOS SE DOR OU FEBRE, PODENDO REPETIR DE 6/6H"
     ],
     [
      "PARACETAMOL 750 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO SE DOR OU FEBRE, PODENDO REPETIR DE 6/6H. INTERCALAR COM DIPIRONA, SE NECESSÁRIO."
     ]
    ]
   },
   {
    "label": "AINE (anti-inflamatório) — escolha 1",
    "sec": "offlabel",
    "menu": true,
    "items": [
     [
      "DICLOFENACO 50 MG",
      "15 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO DE 8/8H, POR 05 DIAS SEGUIDOS HORÁRIO SUGERIDO (8/8h): 06:00 / 14:00 / 22:00"
     ],
     [
      "IBUPROFENO 300 MG",
      "01 CAIXA",
      "TOMAR 02 COMPRIMIDOS DE 6/6H POR 05 DIAS"
     ],
     [
      "NIMESULIDA 100 MG",
      "10 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO DE 12/12H POR 05 DIAS"
     ],
     [
      "NAPROXENO SÓDICO 500 MG",
      "10 COMPRIMIDOS",
      "TOMAR UM COMPRIMIDO SE DOR, PODENDO REPETIR DE 12/12H POR ATÉ 05 DIAS SEGUIDOS"
     ]
    ]
   },
   {
    "label": "Dor neuropática moderada a intensa — associar ao analgésico — escolha 1",
    "sec": "offlabel",
    "draft": true,
    "menu": true,
    "items": [
     [
      "GABAPENTINA 300 MG",
      "90 CÁPSULAS",
      "TOMAR 01 CÁPSULA À NOITE NO 1º DIA, 01 CÁPSULA DE 12/12H NO 2º DIA E 01 CÁPSULA DE 8/8H A PARTIR DO 3º DIA (CAUSA SONOLÊNCIA E TONTURA; REDUZIR A DOSE SE DOENÇA RENAL; NÃO PARAR DE UMA VEZ)",
      "USO ORAL"
     ],
     [
      "AMITRIPTILINA 25 MG",
      "30 COMPRIMIDOS",
      "TOMAR 1/2 COMPRIMIDO (12,5 MG) À NOITE POR 03 DIAS E DEPOIS 01 COMPRIMIDO À NOITE (EVITAR EM IDOSOS, CARDIOPATAS, GLAUCOMA OU DIFICULDADE PARA URINAR)",
      "USO ORAL"
     ]
    ],
    "orient": [
     "O EFEITO NA DOR NEUROPÁTICA COMEÇA EM ALGUNS DIAS: MANTER O ANALGÉSICO COMUM EM HORÁRIO FIXO; USO FORA DA BULA PARA A DOR AGUDA DO ZÓSTER"
    ]
   },
   {
    "label": "Padrão — zóster complicado (oftálmico grave, disseminado, imunossuprimido, SNC ou visceral): aciclovir EV",
    "mode": "internacao",
    "draft": true,
    "items": [
     [
      "ACICLOVIR 250 MG PÓ PARA SOLUÇÃO INJETÁVEL",
      "FRASCOS-AMPOLA CONFORME DOSE",
      "ADMINISTRAR {DOSE} EV DE 8/8H (10 MG/KG/DOSE; PESO IDEAL SE OBESIDADE), DILUÍDO EM SF 0,9% (CONCENTRAÇÃO MÁXIMA 7 MG/ML), EM 1 HORA. ATÉ 15 MG/KG/DOSE SE ENCEFALITE OU ACOMETIMENTO VISCERAL. AJUSTAR À FUNÇÃO RENAL",
      "USO ENDOVENOSO",
      {
       "kg": 10,
       "un": "MG",
       "max": 1000
      }
     ],
     [
      "DIPIRONA 500 MG/ML SOLUÇÃO INJETÁVEL",
      "01 AMPOLA",
      "ADMINISTRAR 1 G (2 ML) EV DILUÍDO EM 10 ML DE ÁGUA DESTILADA, LENTO, ATÉ DE 6/6H SE DOR OU FEBRE",
      "USO ENDOVENOSO"
     ]
    ],
    "orient": [
     "CREATININA ANTES E A CADA 48-72H; MANTER BOA HIDRATAÇÃO DURANTE O ACICLOVIR (RISCO DE LESÃO RENAL POR CRISTAIS); REDUZIR A DOSE SE CLCR < 50 ML/MIN",
     "ISOLAMENTO: PRECAUÇÃO DE CONTATO E POR AEROSSÓIS NO ZÓSTER DISSEMINADO OU NO IMUNOSSUPRIMIDO, ATÉ TODAS AS LESÕES VIRAREM CROSTA",
     "ZÓSTER OFTÁLMICO: OFTALMOLOGIA NO MESMO DIA. RAMSAY HUNT (PARALISIA FACIAL): OTORRINOLARINGOLOGIA; CORTICOIDE SÓ COMO ADJUVANTE DO ANTIVIRAL NESSES CASOS",
     "COM MELHORA E SEM LESÕES NOVAS, PASSAR PARA VALACICLOVIR 1 G DE 8/8H OU ACICLOVIR 800 MG 5 VEZES AO DIA, COMPLETANDO NO MÍNIMO 07 A 10 DIAS (IMUNOSSUPRIMIDO: ATÉ TODAS AS LESÕES VIRAREM CROSTA)"
    ]
   },
   {
    "label": "Padrão — criança saudável com zóster localizado: analgesia pelo peso — escolha 1",
    "mode": "ped",
    "draft": true,
    "menu": true,
    "items": [
     [
      "DIPIRONA 500 MG/ML SOLUÇÃO ORAL (GOTAS)",
      "01 FRASCO",
      "DAR {DOSE} VIA ORAL ATÉ DE 6/6H SE DOR OU FEBRE (15 MG/KG/DOSE; NÃO USAR EM MENORES DE 3 MESES OU COM MENOS DE 5 KG)",
      "USO ORAL",
      {
       "kg": 15,
       "conc": 500,
       "gotas": 20,
       "un": "GOTAS",
       "max": 1000
      }
     ],
     [
      "PARACETAMOL 200 MG/ML SOLUÇÃO ORAL (GOTAS)",
      "01 FRASCO",
      "DAR {DOSE} VIA ORAL ATÉ DE 6/6H SE DOR OU FEBRE (15 MG/KG/DOSE)",
      "USO ORAL",
      {
       "kg": 15,
       "conc": 200,
       "gotas": 15,
       "un": "GOTAS",
       "max": 750
      }
     ]
    ],
    "orient": [
     "CRIANÇA SAUDÁVEL COM ZÓSTER LOCALIZADO NÃO PRECISA DE ANTIVIRAL DE ROTINA; ANTIVIRAL SE OFTÁLMICO, EXTENSO, DOR INTENSA OU IMUNOSSUPRESSÃO. EVITAR IBUPROFENO",
     "MANTER AS LESÕES LIMPAS E COBERTAS, NÃO FURAR AS BOLHAS, CORTAR AS UNHAS E NÃO PASSAR POMADAS",
     "ATÉ TODAS AS LESÕES VIRAREM CROSTA, EVITAR CONTATO COM GESTANTES, RECÉM-NASCIDOS E IMUNOSSUPRIMIDOS QUE NUNCA TIVERAM CATAPORA",
     "RETORNAR IMEDIATAMENTE SE LESÕES PERTO DO OLHO OU NA PONTA DO NARIZ, BOLHAS PELO CORPO, FEBRE ALTA, SONOLÊNCIA, VÔMITOS OU FRAQUEZA NO ROSTO"
    ]
   },
   {
    "label": "Padrão — criança imunossuprimida, zóster disseminado ou oftálmico grave: aciclovir EV",
    "mode": "ped_internacao",
    "draft": true,
    "items": [
     [
      "ACICLOVIR 250 MG PÓ PARA SOLUÇÃO INJETÁVEL",
      "FRASCOS-AMPOLA CONFORME DOSE",
      "ADMINISTRAR {DOSE} EV DE 8/8H, EM 1 HORA, DILUÍDO EM SF 0,9% (CONCENTRAÇÃO MÁXIMA 7 MG/ML), POR 07 A 10 DIAS (10 MG/KG/DOSE; PESO IDEAL SE OBESIDADE). AJUSTAR À FUNÇÃO RENAL E MANTER BOA HIDRATAÇÃO",
      "USO ENDOVENOSO",
      {
       "kg": 10,
       "un": "MG",
       "max": 1000
      }
     ],
     [
      "DIPIRONA 500 MG/ML SOLUÇÃO INJETÁVEL",
      "01 AMPOLA",
      "ADMINISTRAR {DOSE} EV LENTO, DILUÍDO EM ÁGUA DESTILADA, ATÉ DE 6/6H SE DOR OU FEBRE (15 MG/KG/DOSE; NÃO USAR EM MENORES DE 3 MESES OU COM MENOS DE 5 KG)",
      "USO ENDOVENOSO",
      {
       "kg": 15,
       "conc": 500,
       "un": "ML",
       "max": 1000
      }
     ]
    ],
    "orient": [
     "CREATININA ANTES E DURANTE O ACICLOVIR; HIDRATAÇÃO ADEQUADA PARA EVITAR LESÃO RENAL",
     "PRECAUÇÃO DE CONTATO E POR AEROSSÓIS ATÉ TODAS AS LESÕES VIRAREM CROSTA",
     "ZÓSTER OFTÁLMICO: OFTALMOLOGIA NO MESMO DIA; SINAIS DE ENCEFALITE OU PNEUMONITE: UTI PEDIÁTRICA"
    ]
   }
  ]
 },
 {
  "id": "impetigo",
  "ic": "🟡",
  "nm": "Impetigo crostoso",
  "sub": "mupirocina · cefalexina",
  "blocks": [
   {
    "label": "Padrão — mupirocina tópica (lesões localizadas)",
    "draft": true,
    "items": [
     [
      "MUPIROCINA POMADA 2%",
      "01 BISNAGA",
      "APLICAR NAS LESÕES TRÊS VEZES AO DIA POR 05 DIAS",
      "USO TÓPICO"
     ]
    ],
    "orient": [
     "LAVAR COM ÁGUA MORNA E SABÃO DUAS A TRÊS VEZES AO DIA",
     "TENTAR REMOVER AS CROSTAS ANTES DE APLICAR A POMADA – SE HOUVER DIFICULDADE, PODE-SE AMOLECÊ-LAS APLICANDO PRIMEIRO ÓLEO OU VASELINA LIGEIRAMENTE AQUECIDA",
     "MANTER AS UNHAS CURTAS, NÃO COÇAR E NÃO COMPARTILHAR TOALHAS; AFASTAR-SE DA ESCOLA/TRABALHO ATÉ AS LESÕES SECAREM OU ATÉ 24 HORAS APÓS INICIAR O ANTIBIÓTICO",
     "RETORNAR SE NÃO MELHORAR EM 05 DIAS, SE AS LESÕES SE ESPALHAREM, FEBRE, VERMELHIDÃO E DOR AO REDOR DAS LESÕES, INCHAÇO NO ROSTO OU URINA ESCURA"
    ]
   },
   {
    "label": "Padrão — lesões numerosas ou extensas (antibiótico oral)",
    "draft": true,
    "items": [
     [
      "CEFALEXINA 500MG",
      "28 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO DE 6/6H POR 07 DIAS HORÁRIO SUGERIDO: 06:00 / 12:00 / 18:00 / 00:00"
     ]
    ]
   },
   {
    "label": "Padrão — impetigo extenso/ectima com sinais sistêmicos ou celulite: cefazolina EV",
    "mode": "internacao",
    "draft": true,
    "items": [
     [
      "CEFAZOLINA 1 G PÓ PARA SOLUÇÃO INJETÁVEL",
      "01 FRASCO-AMPOLA",
      "ADMINISTRAR 1 G EV DE 8/8H, DILUÍDO EM 100 ML DE SF 0,9%, EM 30 MINUTOS; APÓS 48-72H AFEBRIL E COM MELHORA, TROCAR POR CEFALEXINA VO DE 6/6H — 500 MG NO IMPETIGO/ECTIMA, 1 G SE CELULITE (TOTAL 07 DIAS, ESTENDER SE MELHORA LENTA)",
      "USO ENDOVENOSO"
     ],
     [
      "DIPIRONA 500 MG/ML SOLUÇÃO INJETÁVEL",
      "01 AMPOLA 2 ML",
      "ADMINISTRAR 1 G (2 ML) EV, DILUÍDO EM 10 ML DE ÁGUA DESTILADA, LENTAMENTE, ATÉ DE 6/6H SE DOR OU FEBRE",
      "USO ENDOVENOSO"
     ]
    ],
    "orient": [
     "INDICAÇÕES: LESÕES EXTENSAS COM FEBRE OU SINAIS SISTÊMICOS, CELULITE OU ABSCESSO ASSOCIADO, FALHA DO TRATAMENTO ORAL OU IMUNOSSUPRESSÃO; PRECAUÇÃO DE CONTATO",
     "LAVAR AS LESÕES COM ÁGUA E SABÃO E REMOVER AS CROSTAS 2 A 3 VEZES AO DIA; DELIMITAR A BORDA DO ERITEMA COM CANETA E REAVALIAR A CADA 24H",
     "ABSCESSO: DRENAGEM É O TRATAMENTO PRINCIPAL, COM CULTURA DA SECREÇÃO; HEMOCULTURAS SE FEBRE OU SINAIS SISTÊMICOS",
     "HIPOTENSÃO, LACTATO ELEVADO OU DISFUNÇÃO ORGÂNICA: PROTOCOLO DE SEPSE E UTI. DOR DESPROPORCIONAL, BOLHAS HEMORRÁGICAS OU CREPITAÇÃO: SUSPEITAR DE FASCIITE NECROSANTE E ACIONAR A CIRURGIA",
     "EDEMA, HIPERTENSÃO OU URINA ESCURA: PESQUISAR GLOMERULONEFRITE PÓS-ESTREPTOCÓCICA (URINA TIPO I, CREATININA, C3)"
    ]
   },
   {
    "label": "Alergia a betalactâmico ou suspeita de MRSA — escolha 1",
    "mode": "internacao",
    "sec": "offlabel",
    "draft": true,
    "menu": true,
    "items": [
     [
      "CLINDAMICINA 150 MG/ML SOLUÇÃO INJETÁVEL",
      "01 AMPOLA 4 ML",
      "ADMINISTRAR 600 MG (4 ML) EV DE 8/8H, DILUÍDO EM 100 ML DE SF 0,9%, EM 30 MINUTOS (ALERGIA A BETALACTÂMICO OU MRSA SEM SINAIS DE SEPSE)",
      "USO ENDOVENOSO"
     ],
     [
      "VANCOMICINA 500 MG PÓ PARA SOLUÇÃO INJETÁVEL",
      "FRASCOS-AMPOLA CONFORME DOSE",
      "ADMINISTRAR {DOSE} EV DE 12/12H (15 MG/KG/DOSE), DILUÍDO EM 250 ML DE SF 0,9%, EM NO MÍNIMO 1 HORA (2 HORAS SE DOSE > 1 G); AJUSTAR PELA FUNÇÃO RENAL E VANCOCINEMIA (SEPSE OU MRSA GRAVE)",
      "USO ENDOVENOSO",
      {
       "kg": 15,
       "un": "MG",
       "max": 2000
      }
     ]
    ],
    "orient": [
     "CONSIDERAR MRSA SE LESÃO PURULENTA, ABSCESSOS DE REPETIÇÃO, CONTATO COM PORTADOR, USO RECENTE DE ANTIBIÓTICO, INTERNAÇÃO RECENTE OU FALHA DA CEFAZOLINA EM 48-72H"
    ]
   },
   {
    "label": "Padrão — mupirocina tópica (lesões localizadas)",
    "mode": "ped",
    "draft": true,
    "items": [
     [
      "MUPIROCINA POMADA 2%",
      "01 BISNAGA",
      "APLICAR NAS LESÕES TRÊS VEZES AO DIA POR 05 DIAS",
      "USO TÓPICO"
     ]
    ],
    "orient": [
     "LAVAR COM ÁGUA MORNA E SABÃO DUAS A TRÊS VEZES AO DIA E REMOVER AS CROSTAS ANTES DE APLICAR A POMADA (SE DIFÍCIL, AMOLECER ANTES COM ÓLEO OU VASELINA LIGEIRAMENTE AQUECIDA)",
     "MANTER AS UNHAS DA CRIANÇA CURTAS, EVITAR COÇAR E NÃO COMPARTILHAR TOALHAS OU ROUPAS",
     "AFASTAR DA ESCOLA/CRECHE ATÉ AS LESÕES SECAREM OU ATÉ 24 HORAS APÓS INICIAR O ANTIBIÓTICO",
     "RETORNAR SE NÃO MELHORAR EM 05 DIAS, SE AS LESÕES SE ESPALHAREM, FEBRE, VERMELHIDÃO E DOR AO REDOR DAS LESÕES, INCHAÇO NO ROSTO OU URINA ESCURA"
    ]
   },
   {
    "label": "Padrão — lesões numerosas ou extensas: cefalexina oral",
    "mode": "ped",
    "draft": true,
    "items": [
     [
      "CEFALEXINA 250 MG/5 ML SUSPENSÃO ORAL",
      "01 FRASCO",
      "DAR {DOSE} VIA ORAL DE 6/6H POR 07 DIAS (50 MG/KG/DIA)",
      "USO ORAL",
      {
       "kgdia": 50,
       "vezes": 4,
       "conc": 50,
       "un": "ML",
       "max": 500
      }
     ]
    ]
   },
   {
    "label": "Alternativas (falha, alergia grave a betalactâmico ou suspeita de MRSA) — escolha 1",
    "mode": "ped",
    "sec": "offlabel",
    "draft": true,
    "menu": true,
    "items": [
     [
      "AMOXICILINA + CLAVULANATO DE POTÁSSIO 400 MG + 57 MG/5 ML SUSPENSÃO ORAL",
      "01 FRASCO",
      "DAR {DOSE} VIA ORAL DE 12/12H, NO INÍCIO DA REFEIÇÃO, POR 07 DIAS (25 MG/KG/DIA DE AMOXICILINA)",
      "USO ORAL",
      {
       "kgdia": 25,
       "vezes": 2,
       "conc": 80,
       "un": "ML",
       "max": 875
      }
     ],
     [
      "SULFAMETOXAZOL + TRIMETOPRIMA 200 MG + 40 MG/5 ML SUSPENSÃO ORAL",
      "01 FRASCO",
      "DAR {DOSE} VIA ORAL DE 12/12H POR 07 DIAS (8 MG/KG/DIA DE TRIMETOPRIMA). ALERGIA GRAVE A BETALACTÂMICOS OU SUSPEITA DE MRSA; NÃO USAR EM MENORES DE 2 MESES",
      "USO ORAL",
      {
       "kgdia": 8,
       "vezes": 2,
       "conc": 8,
       "un": "ML",
       "max": 160
      }
     ]
    ]
   },
   {
    "label": "Do material do Drive — Ácido fusídico creme (alternativa à mupirocina)",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "ÁCIDO FUSÍDICO 20 MG/G (2%) CREME",
      "01 BISNAGA",
      "APLICAR NAS LESÕES 03 VEZES AO DIA POR 05 DIAS, APÓS LAVAR E REMOVER AS CROSTAS",
      "USO TÓPICO"
     ]
    ]
   },
   {
    "label": "Do material do Drive — Ácido fusídico creme (alternativa à mupirocina)",
    "mode": "ped",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "ÁCIDO FUSÍDICO 20 MG/G (2%) CREME",
      "01 BISNAGA",
      "APLICAR NAS LESÕES 03 VEZES AO DIA POR 05 DIAS, APÓS LAVAR E REMOVER AS CROSTAS",
      "USO TÓPICO"
     ]
    ]
   },
   {
    "label": "Do material do Drive — Alergia a betalactâmico ou suspeita de MRSA — escolha 1",
    "sec": "offlabel",
    "draft": true,
    "menu": true,
    "items": [
     [
      "CLINDAMICINA 300 MG",
      "21 CÁPSULAS",
      "TOMAR 01 CÁPSULA DE 8/8H POR 07 DIAS HORÁRIO SUGERIDO: 06:00 / 14:00 / 22:00",
      "USO ORAL"
     ],
     [
      "SULFAMETOXAZOL + TRIMETOPRIMA 800/160 MG",
      "14 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO DE 12/12H POR 07 DIAS",
      "USO ORAL"
     ]
    ]
   },
   {
    "label": "Do material do Drive — Amoxicilina-clavulanato (falha da cefalexina)",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "AMOXICILINA + CLAVULANATO DE POTÁSSIO 875 MG + 125 MG",
      "14 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO DE 12/12H, NO INÍCIO DA REFEIÇÃO, POR 07 DIAS HORÁRIO SUGERIDO: 08:00 / 20:00",
      "USO ORAL"
     ]
    ]
   }
  ]
 },
 {
  "id": "itu",
  "ic": "🚽",
  "nm": "ITU / Cistite",
  "sub": "nitrofurantoína · fosfomicina · dipirona · fenazopiridina",
  "blocks": [
   {
    "label": "Padrão — cistite não complicada (mulher): antibiótico — escolha 1",
    "draft": true,
    "menu": true,
    "items": [
     [
      "NITROFURANTOÍNA 100 MG",
      "20 CÁPSULAS",
      "TOMAR 01 CÁPSULA DE 6/6H POR 05 DIAS HORÁRIO SUGERIDO: 06:00 / 12:00 / 18:00 / 00:00"
     ],
     [
      "FOSFOMICINA GRANULADO 3 G",
      "01 CAIXA",
      "DILUIR O ENVELOPE EM UM COPO D’ÁGUA E INGERIR EM DOSE ÚNICA"
     ]
    ],
    "orient": [
     "INGERIR BASTANTE LÍQUIDO (2 A 3 LITROS DE ÁGUA POR DIA), NÃO SEGURAR A URINA E URINAR APÓS AS RELAÇÕES SEXUAIS",
     "RETORNAR IMEDIATAMENTE SE FEBRE, CALAFRIOS, DOR NAS COSTAS (REGIÃO LOMBAR), VÔMITOS OU SE NÃO HOUVER MELHORA EM 48 A 72H",
     "GESTANTES, HOMENS, ITU RECORRENTE (≥ 03 POR ANO) OU FALHA DE TRATAMENTO: COLHER UROCULTURA COM ANTIBIOGRAMA (ESQUEMAS DE GESTANTE E HOMEM: VER OUTRAS OPÇÕES). SULFAMETOXAZOL-TRIMETOPRIMA E QUINOLONAS NÃO SÃO PRIMEIRA ESCOLHA (RESISTÊNCIA > 20% NO BRASIL)",
     "NITROFURANTOÍNA: NÃO USAR SE CLEARANCE DE CREATININA < 60 ML/MIN (BULA), NO FIM DA GESTAÇÃO (≥ 38 SEMANAS) OU SE SUSPEITA DE PIELONEFRITE — NESSES CASOS, FOSFOMICINA"
    ]
   },
   {
    "label": "Padrão — analgésico",
    "draft": true,
    "items": [
     [
      "DIPIRONA 500 MG",
      "01 CAIXA",
      "TOMAR 02 COMPRIMIDOS SE DOR OU ARDÊNCIA PARA URINAR, PODENDO REPETIR DE 6/6H SE NECESSÁRIO"
     ]
    ]
   },
   {
    "label": "Padrão — Analgésico urinário (opcional, até 02 dias; colher a urina antes; evitar se doença renal ou hepática grave ou deficiência de G6PD)",
    "draft": true,
    "items": [
     [
      "FENAZOPIRIDINA 200 MG",
      "06 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO DE 8/8H, APÓS AS REFEIÇÕES, POR ATÉ 02 DIAS. A URINA FICA ALARANJADA (EFEITO ESPERADO) E PODE MANCHAR ROUPAS E LENTES DE CONTATO"
     ]
    ]
   },
   {
    "label": "SMX-TMP 03 dias — somente se urocultura sensível (resistência > 20% no Brasil)",
    "sec": "offlabel",
    "items": [
     [
      "SULFAMETOXAZOL + TRIMETOPRIMA 400/80 MG",
      "12 COMPRIMIDOS",
      "TOMAR 02 COMPRIMIDOS DE 12/12H POR 03 DIAS"
     ]
    ]
   },
   {
    "label": "Quinolona: norfloxacino 03 dias — só se o Padrão não puder ser usado e urocultura sensível (EMA 2018)",
    "sec": "offlabel",
    "items": [
     [
      "NORFLOXACINO 400 MG",
      "06 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO DE 12/12H POR 03 DIAS"
     ]
    ]
   },
   {
    "label": "Quinolona: ciprofloxacino 03 dias — só se o Padrão não puder ser usado e urocultura sensível (EMA 2018)",
    "sec": "offlabel",
    "items": [
     [
      "CIPROFLOXACINO 500 MG",
      "06 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO DE 12/12H POR 03 DIAS"
     ]
    ]
   },
   {
    "label": "Ciprofloxacino 07 dias — cistite no homem ou ITU complicada sem febre, guiada pela urocultura",
    "sec": "offlabel",
    "items": [
     [
      "CIPROFLOXACINO 500 MG",
      "10 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO DE 12/12H POR 07 DIAS"
     ]
    ]
   },
   {
    "label": "Padrão — cistite sem febre — escolha 1",
    "mode": "ped",
    "draft": true,
    "menu": true,
    "items": [
     [
      "CEFALEXINA 250 MG/5 ML SUSPENSÃO ORAL",
      "01 FRASCO",
      "DAR {DOSE} VIA ORAL DE 6/6H POR 05 DIAS (50 MG/KG/DIA)",
      "USO ORAL",
      {
       "kgdia": 50,
       "vezes": 4,
       "conc": 50,
       "un": "ML",
       "max": 500
      }
     ],
     [
      "NITROFURANTOÍNA 5 MG/ML SUSPENSÃO ORAL",
      "01 FRASCO",
      "DAR {DOSE} VIA ORAL DE 6/6H, JUNTO COM ALIMENTO, POR 05 DIAS (6 MG/KG/DIA). SOMENTE CISTITE: NÃO USAR SE FEBRE/PIELONEFRITE, EM MENORES DE 3 MESES OU NA INSUFICIÊNCIA RENAL",
      "USO ORAL",
      {
       "kgdia": 6,
       "vezes": 4,
       "conc": 5,
       "un": "ML",
       "max": 100
      }
     ]
    ],
    "orient": [
     "COLHER URINA TIPO I E UROCULTURA ANTES DO ANTIBIÓTICO (JATO MÉDIO; SEM CONTROLE ESFINCTERIANO, SONDAGEM VESICAL — SACO COLETOR SÓ É ÚTIL SE NEGATIVO) E AJUSTAR PELO ANTIBIOGRAMA",
     "MENORES DE 3 MESES, TOXEMIA, VÔMITOS QUE IMPEDEM A VIA ORAL OU DESIDRATAÇÃO: INTERNAR PARA ANTIBIÓTICO EV",
     "OFERECER BASTANTE LÍQUIDO, NÃO SEGURAR A URINA, TRATAR A CONSTIPAÇÃO E FAZER A HIGIENE ÍNTIMA DE FRENTE PARA TRÁS",
     "RETORNAR SE A FEBRE PERSISTIR APÓS 48 HORAS DE ANTIBIÓTICO, VÔMITOS, DOR LOMBAR, RECUSA ALIMENTAR, SONOLÊNCIA OU PIORA DO ESTADO GERAL",
     "APÓS A PRIMEIRA ITU FEBRIL EM MENORES DE 2 ANOS OU ITU RECORRENTE: SOLICITAR USG DE RINS E VIAS URINÁRIAS"
    ]
   },
   {
    "label": "Padrão — ITU febril / pielonefrite (maior de 3 meses, bom estado, aceitando via oral)",
    "mode": "ped",
    "draft": true,
    "items": [
     [
      "CEFUROXIMA 250 MG/5 ML SUSPENSÃO ORAL",
      "01 FRASCO",
      "DAR {DOSE} VIA ORAL DE 12/12H, APÓS ALIMENTAÇÃO, POR 07 A 10 DIAS (30 MG/KG/DIA)",
      "USO ORAL",
      {
       "kgdia": 30,
       "vezes": 2,
       "conc": 50,
       "un": "ML",
       "max": 500
      }
     ]
    ]
   },
   {
    "label": "Padrão — antitérmico/analgésico se febre ou dor",
    "mode": "ped",
    "draft": true,
    "items": [
     [
      "DIPIRONA 500 MG/ML SOLUÇÃO ORAL (GOTAS)",
      "01 FRASCO",
      "DAR {DOSE} VIA ORAL DE 6/6H SE DOR OU FEBRE (15 MG/KG/DOSE). NÃO USAR EM MENORES DE 3 MESES",
      "USO ORAL",
      {
       "kg": 15,
       "conc": 500,
       "gotas": 20,
       "un": "GOTAS",
       "max": 1000
      }
     ]
    ]
   },
   {
    "label": "Vômitos ou sem aceitação oral (observação): ceftriaxona até tolerar via oral",
    "mode": "ped",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "CEFTRIAXONA 1 G PÓ PARA SOLUÇÃO INJETÁVEL",
      "01 FRASCO-AMPOLA",
      "APLICAR {DOSE} IM PROFUNDO (RECONSTITUÍDA COM LIDOCAÍNA 1% SEM VASOCONSTRITOR) OU EV, 01 VEZ AO DIA, ATÉ TOLERAR VIA ORAL (50 MG/KG/DIA); DEPOIS COMPLETAR 07 A 10 DIAS COM CEFUROXIMA VO",
      "USO INTRAMUSCULAR",
      {
       "kg": 50,
       "un": "MG",
       "max": 2000
      }
     ]
    ],
    "orient": [
     "NÃO USAR EM RECÉM-NASCIDOS (< 28 DIAS); LACTENTES MENORES DE 3 MESES COM ITU DEVEM SER INTERNADOS",
     "REAVALIAR DIARIAMENTE; SE TOXEMIA, PIORA OU FEBRE POR MAIS DE 48-72H, INTERNAR E AJUSTAR PELA UROCULTURA"
    ]
   },
   {
    "label": "Alternativas guiadas por urocultura/antibiograma — escolha 1",
    "mode": "ped",
    "sec": "offlabel",
    "draft": true,
    "menu": true,
    "items": [
     [
      "AMOXICILINA + CLAVULANATO DE POTÁSSIO 400 MG + 57 MG/5 ML SUSPENSÃO ORAL",
      "01 FRASCO",
      "DAR {DOSE} VIA ORAL DE 12/12H, NO INÍCIO DA REFEIÇÃO, POR 05 DIAS (CISTITE) OU 07 A 10 DIAS (ITU FEBRIL) (40 MG/KG/DIA DE AMOXICILINA)",
      "USO ORAL",
      {
       "kgdia": 40,
       "vezes": 2,
       "conc": 80,
       "un": "ML",
       "max": 875
      }
     ],
     [
      "SULFAMETOXAZOL + TRIMETOPRIMA 200 MG + 40 MG/5 ML SUSPENSÃO ORAL",
      "01 FRASCO",
      "DAR {DOSE} VIA ORAL DE 12/12H POR 05 DIAS (CISTITE) OU 07 A 10 DIAS (ITU FEBRIL) (8 MG/KG/DIA DE TRIMETOPRIMA). SOMENTE SE SENSÍVEL NO ANTIBIOGRAMA (RESISTÊNCIA > 20% NO BRASIL); NÃO USAR EM MENORES DE 2 MESES",
      "USO ORAL",
      {
       "kgdia": 8,
       "vezes": 2,
       "conc": 8,
       "un": "ML",
       "max": 160
      }
     ]
    ]
   },
   {
    "label": "Do material do Drive — Cistite na gestante (sempre com urocultura) — escolha 1",
    "sec": "offlabel",
    "draft": true,
    "menu": true,
    "items": [
     [
      "CEFALEXINA 500 MG",
      "28 CÁPSULAS",
      "TOMAR 01 CÁPSULA DE 6/6H POR 07 DIAS HORÁRIO SUGERIDO: 06:00 / 12:00 / 18:00 / 00:00",
      "USO ORAL"
     ],
     [
      "AMOXICILINA 500 MG",
      "21 CÁPSULAS",
      "TOMAR 01 CÁPSULA DE 8/8H POR 07 DIAS HORÁRIO SUGERIDO: 06:00 / 14:00 / 22:00. PREFERIR QUANDO A UROCULTURA MOSTRAR SENSIBILIDADE",
      "USO ORAL"
     ],
     [
      "FOSFOMICINA GRANULADO 3 G",
      "01 ENVELOPE",
      "DILUIR O ENVELOPE EM UM COPO D'ÁGUA E INGERIR EM DOSE ÚNICA, À NOITE, COM A BEXIGA VAZIA",
      "USO ORAL"
     ],
     [
      "NITROFURANTOÍNA 100 MG",
      "28 CÁPSULAS",
      "TOMAR 01 CÁPSULA DE 6/6H POR 07 DIAS, JUNTO COM ALIMENTO. NÃO USAR A PARTIR DE 38 SEMANAS DE GESTAÇÃO",
      "USO ORAL"
     ]
    ]
   },
   {
    "label": "Do material do Drive — Cistite no homem: 07 dias (colher urocultura) — escolha 1",
    "sec": "offlabel",
    "draft": true,
    "menu": true,
    "items": [
     [
      "SULFAMETOXAZOL + TRIMETOPRIMA 800/160 MG",
      "14 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO DE 12/12H POR 07 DIAS HORÁRIO SUGERIDO: 08:00 / 20:00",
      "USO ORAL"
     ],
     [
      "NITROFURANTOÍNA 100 MG",
      "28 CÁPSULAS",
      "TOMAR 01 CÁPSULA DE 6/6H POR 07 DIAS, JUNTO COM ALIMENTO. NÃO USAR SE FEBRE OU SUSPEITA DE PROSTATITE",
      "USO ORAL"
     ]
    ]
   }
  ]
 },
 {
  "id": "intertrigo",
  "ic": "🧴",
  "nm": "Intertrigo / Candidíase",
  "sub": "miconazol · fluconazol",
  "blocks": [
   {
    "label": "Padrão — antifúngico azólico tópico",
    "draft": true,
    "items": [
     [
      "NITRATO DE MICONAZOL 20 MG/G (2%) CREME DERMATOLÓGICO",
      "01 BISNAGA",
      "APÓS LAVAR E SECAR BEM A REGIÃO, APLICAR UMA FINA CAMADA NAS LESÕES 02 VEZES AO DIA, MANTENDO ATÉ 01 SEMANA APÓS O DESAPARECIMENTO DAS LESÕES (EM GERAL 02 A 04 SEMANAS)",
      "USO TÓPICO"
     ]
    ],
    "orient": [
     "LAVAR A REGIÃO AFETADA COM ÁGUA E SABÃO E SECAR BEM EM SEGUIDA",
     "MANTER AS DOBRAS SECAS E AREJADAS: USAR ROUPAS LEVES DE ALGODÃO E, SE NECESSÁRIO, COLOCAR GAZE OU TECIDO DE ALGODÃO ENTRE AS DOBRAS; EVITAR ROUPAS JUSTAS E SINTÉTICAS",
     "SE DIABETES OU OBESIDADE, MANTER O CONTROLE DA GLICEMIA E DO PESO, QUE FAVORECEM A VOLTA DAS LESÕES",
     "RETORNAR SE NÃO HOUVER MELHORA EM 02 SEMANAS, SE AS LESÕES SE ESPALHAREM OU SE SURGIR DOR INTENSA, PUS, MAU CHEIRO OU FEBRE"
    ]
   },
   {
    "label": "Padrão — lesões extensas ou refratárias ao tópico: associar fluconazol oral",
    "draft": true,
    "items": [
     [
      "FLUCONAZOL 150MG",
      "04 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO A CADA 07 DIAS ATE O TOTAL DE 04 DOSES"
     ]
    ]
   },
   {
    "label": "Candidíase cutânea extensa — fluconazol semanal + miconazol creme",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "FLUCONAZOL 150MG",
      "04 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO A CADA 07 DIAS ATE O TOTAL DE 04 DOSES"
     ],
     [
      "NITRATO DE MICONAZOL 20 MG/G (2%) CREME DERMATOLÓGICO",
      "01 BISNAGA",
      "APÓS LAVAR E SECAR BEM A REGIÃO, APLICAR UMA FINA CAMADA NAS LESÕES 02 VEZES AO DIA, MANTENDO ATÉ 01 SEMANA APÓS O DESAPARECIMENTO DAS LESÕES (EM GERAL 02 A 04 SEMANAS)",
      "USO TÓPICO"
     ]
    ],
    "orient": [
     "LAVAR A REGIÃO AFETADA COM ÁGUA E SABÃO E SECAR BEM EM SEGUIDA",
     "MANTER AS DOBRAS SECAS E AREJADAS: USAR ROUPAS LEVES DE ALGODÃO E, SE NECESSÁRIO, COLOCAR GAZE OU TECIDO DE ALGODÃO ENTRE AS DOBRAS; EVITAR ROUPAS JUSTAS E SINTÉTICAS"
    ]
   },
   {
    "label": "Lesões extensas na virilha ou dobras (tinha crural ou candidíase) — itraconazol 07 dias + miconazol creme",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "ITRACONAZOL 100MG",
      "14 CÁPSULAS",
      "TOMAR 02 CÁPSULAS (200 MG) 01 VEZ AO DIA, LOGO APÓS UMA REFEIÇÃO, POR 07 DIAS SEGUIDOS"
     ],
     [
      "NITRATO DE MICONAZOL 20 MG/G (2%) CREME DERMATOLÓGICO",
      "01 BISNAGA",
      "APÓS LAVAR E SECAR BEM A REGIÃO, APLICAR UMA FINA CAMADA NAS LESÕES 02 VEZES AO DIA, MANTENDO ATÉ 01 SEMANA APÓS O DESAPARECIMENTO DAS LESÕES (EM GERAL 02 A 04 SEMANAS)",
      "USO TÓPICO"
     ]
    ],
    "orient": [
     "LAVAR A REGIÃO AFETADA COM ÁGUA E SABÃO E SECAR BEM EM SEGUIDA",
     "MANTER AS DOBRAS SECAS E AREJADAS: USAR ROUPAS LEVES DE ALGODÃO E, SE NECESSÁRIO, COLOCAR GAZE OU TECIDO DE ALGODÃO ENTRE AS DOBRAS; EVITAR ROUPAS JUSTAS E SINTÉTICAS"
    ]
   },
   {
    "label": "Padrão — antifúngico tópico — escolha 1",
    "mode": "ped",
    "draft": true,
    "menu": true,
    "items": [
     [
      "NITRATO DE MICONAZOL 20 MG/G (2%) CREME DERMATOLÓGICO",
      "01 BISNAGA",
      "APÓS LAVAR E SECAR BEM A REGIÃO, APLICAR UMA FINA CAMADA NAS LESÕES 02 VEZES AO DIA, MANTENDO ATÉ 01 SEMANA APÓS O DESAPARECIMENTO DAS LESÕES (EM GERAL 02 A 04 SEMANAS)",
      "USO TÓPICO"
     ],
     [
      "NISTATINA 100.000 UI/G + ÓXIDO DE ZINCO 200 MG/G POMADA",
      "01 BISNAGA",
      "ÁREA DE FRALDA: APLICAR NAS LESÕES A CADA TROCA DE FRALDA (03 A 04 VEZES AO DIA), APÓS LIMPAR E SECAR BEM, MANTENDO ATÉ 01 SEMANA APÓS A CURA",
      "USO TÓPICO"
     ],
     [
      "CLOTRIMAZOL 10 MG/G (1%) CREME DERMATOLÓGICO",
      "01 BISNAGA",
      "APÓS LAVAR E SECAR BEM A REGIÃO, APLICAR UMA FINA CAMADA NAS LESÕES 02 A 03 VEZES AO DIA, MANTENDO ATÉ 01 SEMANA APÓS O DESAPARECIMENTO DAS LESÕES",
      "USO TÓPICO"
     ]
    ],
    "orient": [
     "LAVAR AS DOBRAS COM ÁGUA E SABONETE NEUTRO E SECAR MUITO BEM, SEM ESFREGAR",
     "MANTER A REGIÃO AREJADA E SECA: TROCAR AS FRALDAS COM FREQUÊNCIA, DEIXAR A ÁREA SEM FRALDA SEMPRE QUE POSSÍVEL E EVITAR LENÇOS UMEDECIDOS COM PERFUME OU ÁLCOOL E ROUPAS APERTADAS OU SINTÉTICAS",
     "NÃO USAR TALCO, AMIDO OU POMADAS COM CORTICOIDE POR CONTA PRÓPRIA",
     "OLHAR A BOCA DA CRIANÇA: SE HOUVER PLACAS BRANCAS (SAPINHO), TRATAR JUNTO",
     "RETORNAR SE NÃO MELHORAR EM 07 A 10 DIAS, SE AS LESÕES SE ESPALHAREM OU SE SURGIR PUS, BOLHAS, CROSTAS AMARELADAS OU FEBRE"
    ]
   },
   {
    "label": "Lesões muito inflamadas ou pruriginosas — associar hidrocortisona 1% por até 07 dias",
    "mode": "ped",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "ACETATO DE HIDROCORTISONA 10 MG/G (1%) CREME",
      "01 BISNAGA",
      "APLICAR UMA FINA CAMADA NAS LESÕES MAIS INFLAMADAS 01 A 02 VEZES AO DIA POR NO MÁXIMO 07 DIAS, EM HORÁRIO DIFERENTE DO ANTIFÚNGICO (QUE DEVE SER MANTIDO)",
      "USO TÓPICO"
     ]
    ]
   },
   {
    "label": "Candidíase oral (sapinho) associada — nistatina suspensão oral",
    "mode": "ped",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "NISTATINA 100.000 UI/ML SUSPENSÃO ORAL",
      "01 FRASCO",
      "APLICAR NA BOCA 04 VEZES AO DIA, APÓS AS MAMADAS/REFEIÇÕES, POR 07 A 14 DIAS (MANTER ATÉ 48 HORAS APÓS A CURA): LACTENTES: 01 A 02 ML (METADE EM CADA LADO DA BOCA); CRIANÇAS MAIORES: 04 A 06 ML, BOCHECHAR E ENGOLIR",
      "USO ORAL"
     ]
    ]
   },
   {
    "label": "Lesões extensas, refratárias ao tópico ou imunossupressão — associar fluconazol oral",
    "mode": "ped",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "FLUCONAZOL 10 MG/ML SUSPENSÃO ORAL (MANIPULADA)",
      "01 FRASCO",
      "DAR {DOSE} VIA ORAL 01 VEZ AO DIA POR 14 DIAS, MANTENDO O ANTIFÚNGICO TÓPICO (3 MG/KG/DIA; MÁXIMO 50 MG). A PARTIR DE 17 KG PODE-SE USAR A CÁPSULA DE 50 MG",
      "USO ORAL",
      {
       "kg": 3,
       "conc": 10,
       "un": "ML",
       "max": 50
      }
     ]
    ],
    "orient": [
     "SEM MELHORA APÓS 14 DIAS: REVER O DIAGNÓSTICO (DERMATITE DE CONTATO OU SEBORREICA, PSORÍASE INVERTIDA, INFECÇÃO BACTERIANA) E INVESTIGAR DIABETES OU IMUNOSSUPRESSÃO"
    ]
   },
   {
    "label": "Balanopostite por cândida — clotrimazol creme (fluconazol se intensa) — escolha 1",
    "sec": "offlabel",
    "draft": true,
    "menu": true,
    "items": [
     [
      "CLOTRIMAZOL 10 MG/G (1%) CREME DERMATOLÓGICO",
      "01 BISNAGA",
      "APÓS LAVAR E SECAR BEM, APLICAR UMA FINA CAMADA NA GLANDE E NO PREPÚCIO 02 VEZES AO DIA POR 07 A 14 DIAS",
      "USO TÓPICO"
     ],
     [
      "FLUCONAZOL 150MG",
      "01 COMPRIMIDO",
      "TOMAR 01 COMPRIMIDO EM DOSE ÚNICA (SINTOMAS INTENSOS)",
      "USO ORAL"
     ]
    ],
    "orient": [
     "LAVAR A GLANDE E O PREPÚCIO COM ÁGUA E SABONETE NEUTRO E SECAR BEM, 01 A 02 VEZES AO DIA; EVITAR SABONETES PERFUMADOS E DUCHAS FORTES",
     "PARCERIA COM SINTOMAS DEVE SER AVALIADA; SE AS CRISES SE REPETIREM, INVESTIGAR DIABETES"
    ]
   }
  ]
 },
 {
  "id": "lombalgia",
  "ic": "🦴",
  "nm": "Lombalgia mecânica",
  "sub": "ibuprofeno · diclofenaco · dipirona · ciclobenzaprina",
  "blocks": [
   {
    "label": "Padrão — AINE (anti-inflamatório) por curto prazo — escolha 1",
    "draft": true,
    "menu": true,
    "items": [
     [
      "IBUPROFENO 600 MG",
      "15 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO DE 8/8H, APÓS AS REFEIÇÕES, POR 05 DIAS"
     ],
     [
      "DICLOFENACO 50 MG",
      "15 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO DE 8/8H, POR 05 DIAS SEGUIDOS HORÁRIO SUGERIDO (8/8h): 06:00 / 14:00 / 22:00"
     ],
     [
      "NAPROXENO SÓDICO 500 MG",
      "10 COMPRIMIDOS",
      "TOMAR UM COMPRIMIDO SE DOR, PODENDO REPETIR DE 12/12H POR ATÉ 05 DIAS SEGUIDOS"
     ]
    ],
    "orient": [
     "MANTER-SE ATIVO E RETOMAR AS ATIVIDADES HABITUAIS CONFORME TOLERÂNCIA; EVITAR REPOUSO NA CAMA",
     "APLICAR COMPRESSAS DE ÁGUA MORNA TRÊS VEZES AO DIA",
     "A MAIORIA DOS CASOS MELHORA EM 04 A 06 SEMANAS; EXAMES DE IMAGEM NÃO SÃO NECESSÁRIOS SEM SINAIS DE ALARME",
     "SE A DOR PERSISTIR APÓS 04 SEMANAS, PROCURAR A UBS PARA REAVALIAÇÃO E FISIOTERAPIA/EXERCÍCIOS",
     "RETORNAR IMEDIATAMENTE SE PERDA DE FORÇA OU DORMÊNCIA PROGRESSIVA NAS PERNAS, DORMÊNCIA NA REGIÃO GENITAL/ÂNUS, PERDA DO CONTROLE DA URINA OU DAS FEZES, FEBRE OU DOR QUE PIORA À NOITE/EM REPOUSO"
    ]
   },
   {
    "label": "Padrão — Analgésico de resgate (junto com o AINE; paracetamol sozinho não trata a lombalgia) — escolha 1",
    "draft": true,
    "menu": true,
    "items": [
     [
      "DIPIRONA 500 MG",
      "01 CAIXA",
      "TOMAR 02 COMPRIMIDOS SE DOR OU FEBRE, PODENDO REPETIR DE 6/6H"
     ],
     [
      "PARACETAMOL 750 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO SE DOR OU FEBRE, PODENDO REPETIR DE 6/6H. INTERCALAR COM DIPIRONA, SE NECESSÁRIO."
     ]
    ]
   },
   {
    "label": "Padrão — Relaxante muscular à noite (se espasmo)",
    "draft": true,
    "items": [
     [
      "CICLOBENZAPRINA 5 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO À NOITE ANTES DE DORMIR, POR 05 DIAS SEGUIDOS"
     ]
    ],
    "orient": [
     "A CICLOBENZAPRINA PODE CAUSAR SONOLÊNCIA: NÃO DIRIGIR E NÃO INGERIR BEBIDAS ALCOÓLICAS DURANTE O USO"
    ]
   },
   {
    "label": "Combinação pronta — AINE + manter-se ativo",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "IBUPROFENO 600 MG",
      "15 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO DE 8/8H, APÓS AS REFEIÇÕES, POR 05 DIAS"
     ]
    ]
   },
   {
    "label": "Combinação pronta — AINE contraindicado: relaxante muscular + analgésico",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "CICLOBENZAPRINA 5 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO À NOITE ANTES DE DORMIR, POR 05 DIAS SEGUIDOS"
     ],
     [
      "DIPIRONA 500 MG",
      "01 CAIXA",
      "TOMAR 02 COMPRIMIDOS SE DOR, PODENDO REPETIR DE 6/6H"
     ]
    ]
   },
   {
    "label": "Diclofenaco + dipirona + ciclobenzaprina à noite (modelo do médico)",
    "sec": "offlabel",
    "items": [
     [
      "DICLOFENACO 50 MG",
      "15 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO DE 8/8H, POR 05 DIAS SEGUIDOS HORÁRIO SUGERIDO (8/8h): 06:00 / 14:00 / 22:00"
     ],
     [
      "DIPIRONA 500 MG",
      "01 CAIXA",
      "TOMAR 02 COMPRIMIDOS SE DOR OU FEBRE, PODENDO REPETIR DE 6/6H"
     ],
     [
      "CICLOBENZAPRINA 5 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO À NOITE ANTES DE DORMIR, POR 05 DIAS SEGUIDOS"
     ]
    ],
    "orient": [
     "APLICAR COMPRESSAS DE ÁGUA MORNA TRÊS VEZES AO DIA",
     "SE POSSÍVEL, REALIZAR FISIOTERAPIA COM FORTALECIMENTO DA MUSCULATURA ABDOMINAL E PARAVERTEBRAL"
    ]
   },
   {
    "label": "Celecoxibe (AINE COX-2: menor risco digestivo; evitar se doença cardiovascular)",
    "sec": "offlabel",
    "items": [
     [
      "CELECOXIBE 100 MG",
      "10 COMPRIMIDOS",
      "TOMAR UM COMPRIMIDO DE 12/12H POR 05 DIAS"
     ]
    ],
    "orient": [
     "APLICAR COMPRESSAS DE ÁGUA MORNA TRÊS VEZES AO DIA",
     "SE POSSÍVEL, REALIZAR FISIOTERAPIA COM FORTALECIMENTO DA MUSCULATURA ABDOMINAL E PARAVERTEBRAL"
    ]
   },
   {
    "label": "AINE (anti-inflamatório) — escolha 1",
    "sec": "offlabel",
    "draft": true,
    "menu": true,
    "items": [
     [
      "DICLOFENACO 50 MG",
      "15 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO DE 8/8H, POR 05 DIAS SEGUIDOS HORÁRIO SUGERIDO (8/8h): 06:00 / 14:00 / 22:00"
     ],
     [
      "IBUPROFENO 300 MG",
      "01 CAIXA",
      "TOMAR 02 COMPRIMIDOS DE 6/6H POR 05 DIAS"
     ],
     [
      "NIMESULIDA 100 MG",
      "10 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO DE 12/12H, APÓS AS REFEIÇÕES, POR NO MÁXIMO 05 DIAS. NÃO USAR SE DOENÇA DO FÍGADO OU USO FREQUENTE DE ÁLCOOL"
     ],
     [
      "NAPROXENO SÓDICO 500 MG",
      "10 COMPRIMIDOS",
      "TOMAR UM COMPRIMIDO SE DOR, PODENDO REPETIR DE 12/12H POR ATÉ 05 DIAS SEGUIDOS"
     ]
    ]
   },
   {
    "label": "Analgésico/antitérmico — escolha 1",
    "sec": "offlabel",
    "menu": true,
    "items": [
     [
      "DIPIRONA 500 MG",
      "01 CAIXA",
      "TOMAR 02 COMPRIMIDOS SE DOR OU FEBRE, PODENDO REPETIR DE 6/6H"
     ],
     [
      "PARACETAMOL 750 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO SE DOR OU FEBRE, PODENDO REPETIR DE 6/6H. INTERCALAR COM DIPIRONA, SE NECESSÁRIO."
     ]
    ]
   },
   {
    "label": "Do material do Drive — AINE contraindicado, não tolerado ou ineficaz: paracetamol + codeína por até 03 dias",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "PARACETAMOL 500 MG + CODEÍNA 30 MG",
      "12 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO SE DOR INTENSA, PODENDO REPETIR DE 6/6H, POR NO MÁXIMO 03 DIAS. NÃO TOMAR JUNTO COM O PARACETAMOL (USAR NO LUGAR DELE)",
      "USO ORAL"
     ]
    ]
   },
   {
    "label": "Do material do Drive — AINE de tomada única diária: meloxicam 15 mg",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "MELOXICAM 15 MG",
      "05 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO 01 VEZ AO DIA, APÓS O ALMOÇO, POR 05 DIAS",
      "USO ORAL"
     ]
    ]
   },
   {
    "label": "Do material do Drive — Dor intensa no PS: dipirona + diclofenaco IM em dose única (sem corticoide)",
    "mode": "internacao",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "DIPIRONA 500 MG/ML SOLUÇÃO INJETÁVEL",
      "01 AMPOLA 2 ML",
      "ADMINISTRAR 01 G (02 ML) IM PROFUNDO NO GLÚTEO, EM DOSE ÚNICA (NÃO MISTURAR NA MESMA SERINGA DO DICLOFENACO)",
      "USO INTRAMUSCULAR"
     ],
     [
      "DICLOFENACO SÓDICO 25 MG/ML SOLUÇÃO INJETÁVEL",
      "01 AMPOLA 3 ML",
      "SE SEM CONTRAINDICAÇÃO A AINE: ADMINISTRAR 75 MG (03 ML) IM PROFUNDO NO GLÚTEO, EM DOSE ÚNICA. NÃO INICIAR OUTRO AINE NAS 12 HORAS SEGUINTES",
      "USO INTRAMUSCULAR"
     ]
    ]
   },
   {
    "label": "Do material do Drive — Dor intensa refratária ou AINE contraindicado no PS: tramadol SC",
    "mode": "internacao",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "TRAMADOL 50 MG/ML SOLUÇÃO INJETÁVEL",
      "01 AMPOLA 2 ML",
      "ADMINISTRAR 50 A 100 MG (01 A 02 ML) SC EM DOSE ÚNICA NO PS, SE DOR INTENSA SEM RESPOSTA OU COM CONTRAINDICAÇÃO A AINE (MÁXIMO 400 MG/DIA; ACIMA DE 75 ANOS, 300 MG/DIA)",
      "USO SUBCUTÂNEO"
     ]
    ]
   }
  ]
 },
 {
  "id": "meteorismo",
  "ic": "💨",
  "nm": "Meteorismo (gases)",
  "sub": "simeticona · escopolamina",
  "blocks": [
   {
    "label": "Padrão — simeticona + antiespasmódico se cólica",
    "draft": true,
    "items": [
     [
      "SIMETICONA 40 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO SE DOR (GASES), PODENDO REPETIR DE 6/6H"
     ],
     [
      "BUTILBROMETO DE ESCOPOLAMINA 10 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO SE DOR ABDOMINAL, PODENDO REPETIR DE 8/8H"
     ]
    ],
    "orient": [
     "COMER DEVAGAR E MASTIGAR BEM; EVITAR CHICLETES, BALAS, CANUDOS, BEBIDAS GASOSAS E CIGARRO (AUMENTAM O AR ENGOLIDO)",
     "REDUZIR ALIMENTOS QUE FERMENTAM: FEIJÃO, REPOLHO, BRÓCOLIS, CEBOLA, ADOÇANTES COMO SORBITOL/XILITOL E, SE HOUVER INTOLERÂNCIA, LEITE E DERIVADOS",
     "MANTER ATIVIDADE FÍSICA, BOA HIDRATAÇÃO E EVACUAÇÃO REGULAR (TRATAR A PRISÃO DE VENTRE)",
     "RETORNAR IMEDIATAMENTE SE DOR ABDOMINAL INTENSA OU CONTÍNUA, BARRIGA MUITO DISTENDIDA E ENDURECIDA, VÔMITOS, PARADA DE ELIMINAÇÃO DE GASES E FEZES, FEBRE OU SANGUE NAS FEZES",
     "PROCURAR A UBS SE SINTOMAS PERSISTENTES, PERDA DE PESO, ANEMIA, MUDANÇA DO HÁBITO INTESTINAL OU INÍCIO APÓS OS 50 ANOS (INVESTIGAÇÃO)"
    ]
   },
   {
    "label": "Receita — simeticona + dipirona se dor",
    "sec": "offlabel",
    "items": [
     [
      "SIMETICONA 40 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO SE DOR (GASES), PODENDO REPETIR DE 6/6H"
     ],
     [
      "DIPIRONA 500 MG",
      "01 CAIXA",
      "TOMAR 02 COMPRIMIDOS SE DOR OU FEBRE, PODENDO REPETIR DE 6/6H"
     ]
    ]
   },
   {
    "label": "Do material do Drive — Simeticona em gotas",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "SIMETICONA 75 MG/ML EMULSÃO ORAL (GOTAS)",
      "01 FRASCO",
      "TOMAR 16 GOTAS (CERCA DE 80 MG) APÓS AS REFEIÇÕES E AO DEITAR SE GASES, ATÉ 04 VEZES AO DIA",
      "USO ORAL"
     ]
    ]
   }
  ]
 },
 {
  "id": "micose_ungueal",
  "ic": "🦶",
  "nm": "Micose subungueal",
  "sub": "terbinafina · amorolfina",
  "blocks": [
   {
    "label": "Padrão — oral (comprometimento moderado/grave ou da matriz): terbinafina",
    "draft": true,
    "items": [
     [
      "TERBINAFINA 250 MG",
      "84 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO AO DIA, NO MESMO HORÁRIO, POR 12 SEMANAS (UNHAS DOS PÉS). SE APENAS UNHAS DAS MÃOS: 06 SEMANAS"
     ]
    ],
    "orient": [
     "CONFIRMAR O DIAGNÓSTICO COM EXAME MICOLÓGICO DIRETO E CULTURA DO RASPADO DA UNHA ANTES DE INICIAR O TRATAMENTO",
     "SOLICITAR TGO/TGP ANTES DA TERBINAFINA; SUSPENDER E RETORNAR SE PELE OU OLHOS AMARELADOS, URINA ESCURA, NÁUSEAS PERSISTENTES, PERDA DO PALADAR OU LESÕES NA PELE",
     "MANTER UNHAS CURTAS E PÉS SECOS (ENXUGAR ENTRE OS DEDOS), NÃO COMPARTILHAR ALICATES, LIXAS OU CALÇADOS E TRATAR FRIEIRA (TINHA DOS PÉS) ASSOCIADA",
     "A MELHORA SÓ APARECE COM O CRESCIMENTO DA UNHA NOVA (06 MESES NAS MÃOS E 12 A 18 MESES NOS PÉS); REAVALIAR NA UBS AO FIM DO TRATAMENTO"
    ]
   },
   {
    "label": "Padrão — tópico (leve: < 50% da unha, sem matriz, até 3–4 unhas): amorolfina esmalte",
    "draft": true,
    "items": [
     [
      "AMOROLFINA 5% ESMALTE",
      "01 FRASCO",
      "APLICAR NAS UNHAS AFETADAS 01 A 02 VEZES POR SEMANA, APÓS LIXAR A SUPERFÍCIE E LIMPAR COM ÁLCOOL, POR 06 MESES (MÃOS) A 12 MESES (PÉS)",
      "USO TÓPICO"
     ]
    ]
   },
   {
    "label": "Unha muito espessa — ureia 40% para amolecer + amorolfina esmalte",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "UREIA MANIPULADA EM CREME 40%",
      "01 FRASCO",
      "APLICAR SOBRE A UNHA ESPESSADA À NOITE, COBRIR COM CURATIVO OU FILME PLÁSTICO E LAVAR PELA MANHÃ COM ÁGUA E SABÃO, POR ATÉ 02 SEMANAS, PARA AMOLECER A UNHA; DEPOIS LIXAR OU DESBASTAR A PARTE AMOLECIDA",
      "USO TÓPICO"
     ],
     [
      "AMOROLFINA 5% ESMALTE",
      "01 FRASCO",
      "APLICAR NAS UNHAS AFETADAS 01 A 02 VEZES POR SEMANA, APÓS LIXAR A SUPERFÍCIE E LIMPAR COM ÁLCOOL, POR 06 MESES (MÃOS) A 12 MESES (PÉS)",
      "USO TÓPICO"
     ]
    ]
   },
   {
    "label": "Do material do Drive — Itraconazol oral (contínuo ou pulsos) — escolha 1",
    "sec": "offlabel",
    "draft": true,
    "menu": true,
    "items": [
     [
      "ITRACONAZOL 100 MG",
      "168 CÁPSULAS",
      "TOMAR 02 CÁPSULAS 01 VEZ AO DIA, APÓS A REFEIÇÃO, POR 12 SEMANAS (UNHAS DOS PÉS); SE APENAS UNHAS DAS MÃOS, 06 SEMANAS",
      "USO ORAL"
     ],
     [
      "ITRACONAZOL 100 MG",
      "84 CÁPSULAS",
      "PULSOTERAPIA: TOMAR 02 CÁPSULAS DE 12/12H, APÓS A REFEIÇÃO, DURANTE 07 DIAS POR MÊS — 02 PULSOS (UNHAS DAS MÃOS) OU 03 PULSOS (UNHAS DOS PÉS)",
      "USO ORAL"
     ]
    ]
   },
   {
    "label": "Do material do Drive — Fluconazol semanal (intolerância a terbinafina e itraconazol)",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "FLUCONAZOL 150 MG",
      "26 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO 01 VEZ POR SEMANA, SEMPRE NO MESMO DIA, ATÉ A UNHA NOVA CRESCER POR COMPLETO: EM GERAL 03 A 06 MESES (MÃOS) E 06 A 12 MESES (PÉS). REAVALIAR A CADA 03 MESES",
      "USO ORAL"
     ]
    ]
   },
   {
    "label": "Do material do Drive — Tópico alternativo à amorolfina — escolha 1",
    "sec": "offlabel",
    "draft": true,
    "menu": true,
    "items": [
     [
      "CICLOPIROX 8% ESMALTE",
      "01 FRASCO",
      "APLICAR NAS UNHAS AFETADAS EM DIAS ALTERNADOS NO 1º MÊS, 02 VEZES POR SEMANA NO 2º MÊS E 01 VEZ POR SEMANA A PARTIR DO 3º MÊS, POR 06 MESES (MÃOS) A 12 MESES (PÉS)",
      "USO TÓPICO"
     ],
     [
      "TIOCONAZOL 28% SOLUÇÃO",
      "01 FRASCO",
      "APLICAR NAS UNHAS AFETADAS E AO REDOR 02 VEZES AO DIA POR 06 A 12 MESES",
      "USO TÓPICO"
     ]
    ]
   }
  ]
 },
 {
  "id": "mordedura",
  "ic": "🐕",
  "nm": "Mordedura de cão ou gato",
  "sub": "amoxicilina-clavulanato · vacina antirrábica · soro antirrábico · antitetânica",
  "blocks": [
   {
    "label": "Padrão — Antibiótico profilático (ferida profunda, na mão, de gato ou em imunossuprimido; doxiciclina se alergia à penicilina) — escolha 1",
    "draft": true,
    "menu": true,
    "items": [
     [
      "AMOXICILINA 875 MG + CLAVULANATO 125 MG",
      "10 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO DE 12/12H, NO INÍCIO DAS REFEIÇÕES, POR 05 DIAS",
      "USO ORAL"
     ],
     [
      "DOXICICLINA 100 MG",
      "10 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO DE 12/12H POR 05 DIAS, COM UM COPO DE ÁGUA, SEM DEITAR NOS 30 MINUTOS SEGUINTES. NÃO USAR EM GESTANTES",
      "USO ORAL"
     ]
    ],
    "orient": [
     "LAVAR A FERIDA COM BASTANTE ÁGUA CORRENTE E SABÃO, O QUANTO ANTES, E MANTER LIMPA",
     "OBSERVAR O CÃO OU O GATO POR 10 DIAS: SE O ANIMAL ADOECER, SUMIR OU MORRER, AVISAR A UNIDADE DE SAÚDE IMEDIATAMENTE",
     "TOMAR TODAS AS DOSES DA VACINA ANTIRRÁBICA NAS DATAS MARCADAS, MESMO QUE A FERIDA JÁ ESTEJA BOA",
     "RETORNAR SE VERMELHIDÃO, CALOR, INCHAÇO, PUS, FEBRE OU DOR QUE AUMENTA NO LOCAL"
    ]
   },
   {
    "label": "Padrão — Vacina antirrábica (cão ou gato saudável e observável: não vacinar, observar 10 dias)",
    "draft": true,
    "items": [
     [
      "VACINA ANTIRRÁBICA HUMANA (CULTIVO CELULAR)",
      "04 DOSES",
      "SÓ SE O ANIMAL NÃO PUDER SER OBSERVADO, FOR SUSPEITO DE RAIVA, MORRER OU DESAPARECER, OU SE MORCEGO OU ANIMAL SILVESTRE: 04 DOSES NOS DIAS 0, 3, 7 E 14 — IM (0,5 OU 1 ML CONFORME O FABRICANTE) NO DELTOIDE (MENORES DE 2 ANOS: VASTO LATERAL DA COXA; NUNCA NO GLÚTEO) OU, ONDE O SERVIÇO ADOTAR A VIA INTRADÉRMICA, 0,2 ML DIVIDIDO EM 2 APLICAÇÕES DE 0,1 ML (UMA EM CADA DELTOIDE). CÃO OU GATO SEM SINAIS DE RAIVA E QUE PODE SER OBSERVADO: NÃO VACINAR — OBSERVAR O ANIMAL POR 10 DIAS",
      "USO INTRAMUSCULAR"
     ]
    ]
   },
   {
    "label": "Padrão — Soro ou imunoglobulina antirrábica (só exposição grave com animal não observável/suspeito, ou morcego) — escolha 1",
    "draft": true,
    "menu": true,
    "items": [
     [
      "SORO ANTIRRÁBICO (SAR)",
      "CONFORME O PESO",
      "SÓ EM EXPOSIÇÃO GRAVE COM ANIMAL NÃO OBSERVÁVEL OU SUSPEITO, OU EM QUALQUER EXPOSIÇÃO A MORCEGO: APLICAR {DOSE} EM DOSE ÚNICA (40 UI/KG; MÁXIMO 3.000 UI), INFILTRANDO O MÁXIMO POSSÍVEL DENTRO E AO REDOR DA(S) LESÃO(ÕES). MORDEDURA SÓ DE CÃO: APENAS INFILTRAR NA LESÃO, SEM APLICAR O RESTANTE IM. GATO, MORCEGO OU SILVESTRE: O RESTANTE IM NO GRUPO MUSCULAR MAIS PRÓXIMO DA LESÃO, DIFERENTE DO DA VACINA. PODE SER FEITO ATÉ 7 DIAS APÓS A 1ª DOSE DA VACINA. TER MATERIAL PARA TRATAR ANAFILAXIA",
      "USO INTRAMUSCULAR",
      {
       "kg": 40,
       "un": "UI",
       "max": 3000
      }
     ],
     [
      "IMUNOGLOBULINA HUMANA ANTIRRÁBICA (IGHAR)",
      "CONFORME O PESO",
      "MESMAS INDICAÇÕES DO SORO (EXPOSIÇÃO GRAVE COM ANIMAL NÃO OBSERVÁVEL OU SUSPEITO, OU QUALQUER EXPOSIÇÃO A MORCEGO): APLICAR {DOSE} EM DOSE ÚNICA (20 UI/KG; MÁXIMO 1.500 UI), INFILTRANDO O MÁXIMO POSSÍVEL DENTRO E AO REDOR DA(S) LESÃO(ÕES). MORDEDURA SÓ DE CÃO: APENAS INFILTRAR NA LESÃO, SEM APLICAR O RESTANTE IM. GATO, MORCEGO OU SILVESTRE: O RESTANTE IM NO GRUPO MUSCULAR MAIS PRÓXIMO DA LESÃO, DIFERENTE DO DA VACINA. PODE SER FEITA ATÉ 7 DIAS APÓS A 1ª DOSE DA VACINA",
      "USO INTRAMUSCULAR",
      {
       "kg": 20,
       "un": "UI",
       "max": 1500
      }
     ]
    ]
   },
   {
    "label": "Padrão — Vacina antitetânica (conforme o cartão vacinal)",
    "draft": true,
    "items": [
     [
      "VACINA DUPLA ADULTO (DIFTERIA E TÉTANO) 0,5 ML",
      "01 DOSE",
      "APLICAR 0,5 ML NO DELTOIDE EM DOSE ÚNICA (REFORÇO OU INÍCIO/COMPLEMENTAÇÃO DO ESQUEMA, CONFORME CARTÃO VACINAL)",
      "USO INTRAMUSCULAR"
     ]
    ]
   },
   {
    "label": "Padrão — Imunoglobulina antitetânica (ferimento de alto risco com esquema incompleto ou desconhecido; junto com a vacina)",
    "draft": true,
    "items": [
     [
      "IMUNOGLOBULINA HUMANA ANTITETÂNICA 250 UI",
      "01 AMPOLA",
      "APLICAR 01 AMPOLA (250 UI) EM DOSE ÚNICA NO GLÚTEO, EM LOCAL DIFERENTE DA VACINA (SE FERIMENTO DE ALTO RISCO E ESQUEMA VACINAL INCOMPLETO OU DESCONHECIDO)",
      "USO INTRAMUSCULAR"
     ]
    ]
   },
   {
    "label": "Padrão — Analgésico — escolha 1",
    "draft": true,
    "menu": true,
    "items": [
     [
      "DIPIRONA 500 MG",
      "01 CAIXA",
      "TOMAR 02 COMPRIMIDOS SE DOR OU FEBRE, PODENDO REPETIR DE 6/6H"
     ],
     [
      "PARACETAMOL 750 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO SE DOR OU FEBRE, PODENDO REPETIR DE 6/6H. INTERCALAR COM DIPIRONA, SE NECESSÁRIO."
     ]
    ]
   },
   {
    "label": "Padrão — Antibiótico profilático pelo peso (ferida profunda, na mão, de gato ou imunossuprimido)",
    "mode": "ped",
    "draft": true,
    "items": [
     [
      "AMOXICILINA 400 MG + CLAVULANATO DE POTÁSSIO 57 MG/5 ML SUSPENSÃO ORAL",
      "01 FRASCO",
      "DAR {DOSE} VIA ORAL DE 12/12H, NO INÍCIO DAS REFEIÇÕES, POR 03 A 05 DIAS (45 MG/KG/DIA DE AMOXICILINA)",
      "USO ORAL",
      {
       "kgdia": 45,
       "vezes": 2,
       "conc": 80,
       "un": "ML",
       "max": 875
      }
     ]
    ],
    "orient": [
     "LAVAR A FERIDA COM BASTANTE ÁGUA CORRENTE E SABÃO, O QUANTO ANTES, E MANTER LIMPA",
     "OBSERVAR O CÃO OU O GATO POR 10 DIAS: SE O ANIMAL ADOECER, SUMIR OU MORRER, AVISAR A UNIDADE DE SAÚDE IMEDIATAMENTE",
     "LEVAR A CRIANÇA PARA TODAS AS DOSES DA VACINA ANTIRRÁBICA NAS DATAS MARCADAS",
     "RETORNAR SE VERMELHIDÃO, CALOR, INCHAÇO, PUS, FEBRE OU DOR QUE AUMENTA NO LOCAL"
    ]
   },
   {
    "label": "Padrão — Vacina antirrábica (cão ou gato saudável e observável: não vacinar, observar 10 dias)",
    "mode": "ped",
    "draft": true,
    "items": [
     [
      "VACINA ANTIRRÁBICA HUMANA (CULTIVO CELULAR)",
      "04 DOSES",
      "SÓ SE O ANIMAL NÃO PUDER SER OBSERVADO, FOR SUSPEITO DE RAIVA, MORRER OU DESAPARECER, OU SE MORCEGO OU ANIMAL SILVESTRE: 04 DOSES NOS DIAS 0, 3, 7 E 14 — IM (0,5 OU 1 ML CONFORME O FABRICANTE) NO DELTOIDE (MENORES DE 2 ANOS: VASTO LATERAL DA COXA; NUNCA NO GLÚTEO) OU, ONDE O SERVIÇO ADOTAR A VIA INTRADÉRMICA, 0,2 ML DIVIDIDO EM 2 APLICAÇÕES DE 0,1 ML (UMA EM CADA DELTOIDE). CÃO OU GATO SEM SINAIS DE RAIVA E QUE PODE SER OBSERVADO: NÃO VACINAR — OBSERVAR O ANIMAL POR 10 DIAS",
      "USO INTRAMUSCULAR"
     ]
    ]
   },
   {
    "label": "Padrão — Soro ou imunoglobulina antirrábica (só exposição grave com animal não observável/suspeito, ou morcego) — escolha 1",
    "mode": "ped",
    "draft": true,
    "menu": true,
    "items": [
     [
      "SORO ANTIRRÁBICO (SAR)",
      "CONFORME O PESO",
      "SÓ EM EXPOSIÇÃO GRAVE COM ANIMAL NÃO OBSERVÁVEL OU SUSPEITO, OU EM QUALQUER EXPOSIÇÃO A MORCEGO: APLICAR {DOSE} EM DOSE ÚNICA (40 UI/KG; MÁXIMO 3.000 UI), INFILTRANDO O MÁXIMO POSSÍVEL DENTRO E AO REDOR DA(S) LESÃO(ÕES). MORDEDURA SÓ DE CÃO: APENAS INFILTRAR NA LESÃO, SEM APLICAR O RESTANTE IM. GATO, MORCEGO OU SILVESTRE: O RESTANTE IM NO GRUPO MUSCULAR MAIS PRÓXIMO DA LESÃO, DIFERENTE DO DA VACINA. PODE SER FEITO ATÉ 7 DIAS APÓS A 1ª DOSE DA VACINA. TER MATERIAL PARA TRATAR ANAFILAXIA",
      "USO INTRAMUSCULAR",
      {
       "kg": 40,
       "un": "UI",
       "max": 3000
      }
     ],
     [
      "IMUNOGLOBULINA HUMANA ANTIRRÁBICA (IGHAR)",
      "CONFORME O PESO",
      "MESMAS INDICAÇÕES DO SORO (EXPOSIÇÃO GRAVE COM ANIMAL NÃO OBSERVÁVEL OU SUSPEITO, OU QUALQUER EXPOSIÇÃO A MORCEGO): APLICAR {DOSE} EM DOSE ÚNICA (20 UI/KG; MÁXIMO 1.500 UI), INFILTRANDO O MÁXIMO POSSÍVEL DENTRO E AO REDOR DA(S) LESÃO(ÕES). MORDEDURA SÓ DE CÃO: APENAS INFILTRAR NA LESÃO, SEM APLICAR O RESTANTE IM. GATO, MORCEGO OU SILVESTRE: O RESTANTE IM NO GRUPO MUSCULAR MAIS PRÓXIMO DA LESÃO, DIFERENTE DO DA VACINA. PODE SER FEITA ATÉ 7 DIAS APÓS A 1ª DOSE DA VACINA",
      "USO INTRAMUSCULAR",
      {
       "kg": 20,
       "un": "UI",
       "max": 1500
      }
     ]
    ]
   },
   {
    "label": "Padrão — Vacina antitetânica conforme a idade e a caderneta — escolha 1",
    "mode": "ped",
    "draft": true,
    "menu": true,
    "items": [
     [
      "VACINA ADSORVIDA DIFTERIA, TÉTANO E PERTUSSIS (DTP) 0,5 ML",
      "01 DOSE",
      "MENORES DE 07 ANOS: APLICAR 0,5 ML IM EM DOSE ÚNICA (VASTO LATERAL DA COXA SE < 02 ANOS; DELTOIDE NOS MAIORES), CONFORME CADERNETA VACINAL",
      "USO INTRAMUSCULAR"
     ],
     [
      "VACINA DUPLA ADULTO (DIFTERIA E TÉTANO) 0,5 ML",
      "01 DOSE",
      "A PARTIR DE 07 ANOS: APLICAR 0,5 ML NO DELTOIDE EM DOSE ÚNICA (REFORÇO OU INÍCIO/COMPLEMENTAÇÃO DO ESQUEMA, CONFORME CADERNETA VACINAL)",
      "USO INTRAMUSCULAR"
     ]
    ]
   },
   {
    "label": "Padrão — Imunoglobulina antitetânica (ferimento de alto risco com esquema incompleto ou desconhecido; junto com a vacina)",
    "mode": "ped",
    "draft": true,
    "items": [
     [
      "IMUNOGLOBULINA HUMANA ANTITETÂNICA 250 UI",
      "01 AMPOLA",
      "APLICAR 01 AMPOLA (250 UI) IM EM DOSE ÚNICA, EM MEMBRO DIFERENTE DA VACINA (SE FERIMENTO DE ALTO RISCO E ESQUEMA VACINAL INCOMPLETO OU DESCONHECIDO)",
      "USO INTRAMUSCULAR"
     ]
    ]
   },
   {
    "label": "Padrão — Analgésico pelo peso — escolha 1",
    "mode": "ped",
    "draft": true,
    "menu": true,
    "items": [
     [
      "DIPIRONA 500 MG/ML SOLUÇÃO ORAL (GOTAS)",
      "01 FRASCO",
      "DAR {DOSE} VIA ORAL ATÉ DE 6/6H SE DOR OU FEBRE (15 MG/KG/DOSE; NÃO USAR EM MENORES DE 3 MESES OU COM MENOS DE 5 KG)",
      "USO ORAL",
      {
       "kg": 15,
       "conc": 500,
       "gotas": 20,
       "un": "GOTAS",
       "max": 1000
      }
     ],
     [
      "PARACETAMOL 200 MG/ML SOLUÇÃO ORAL (GOTAS)",
      "01 FRASCO",
      "DAR {DOSE} VIA ORAL ATÉ DE 6/6H SE DOR OU FEBRE (15 MG/KG/DOSE)",
      "USO ORAL",
      {
       "kg": 15,
       "conc": 200,
       "gotas": 15,
       "un": "GOTAS",
       "max": 750
      }
     ]
    ]
   },
   {
    "label": "Do material do Drive — Profilaxia curta: amoxicilina-clavulanato 500/125 mg por 3 dias",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "AMOXICILINA 500 MG + CLAVULANATO 125 MG",
      "09 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO DE 8/8H, NO INÍCIO DAS REFEIÇÕES, POR 03 DIAS",
      "USO ORAL"
     ]
    ]
   },
   {
    "label": "Do material do Drive — Mordedura já infectada: amoxicilina-clavulanato por 7 dias",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "AMOXICILINA 500 MG + CLAVULANATO 125 MG",
      "21 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO DE 8/8H, NO INÍCIO DAS REFEIÇÕES, POR 07 DIAS. REAVALIAR EM 48H; PROLONGAR SE A INFECÇÃO NÃO RESOLVER",
      "USO ORAL"
     ]
    ]
   },
   {
    "label": "Do material do Drive — Alergia à penicilina: clindamicina + ciprofloxacino",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "CLINDAMICINA 300 MG",
      "15 CÁPSULAS",
      "TOMAR 01 CÁPSULA DE 8/8H POR 05 DIAS (PROFILAXIA: 03 A 05 DIAS; INFECÇÃO: 07 DIAS)",
      "USO ORAL"
     ],
     [
      "CIPROFLOXACINO 500 MG",
      "10 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO DE 12/12H POR 05 DIAS, JUNTO COM A CLINDAMICINA. NÃO USAR NA GESTAÇÃO",
      "USO ORAL"
     ]
    ]
   },
   {
    "label": "Do material do Drive — Alergia à penicilina: clindamicina + sulfametoxazol-trimetoprima",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "CLINDAMICINA 300 MG",
      "15 CÁPSULAS",
      "TOMAR 01 CÁPSULA DE 8/8H POR 05 DIAS (PROFILAXIA: 03 A 05 DIAS; INFECÇÃO: 07 DIAS)",
      "USO ORAL"
     ],
     [
      "SULFAMETOXAZOL + TRIMETOPRIMA 800 MG + 160 MG",
      "10 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO DE 12/12H POR 05 DIAS, JUNTO COM A CLINDAMICINA. EVITAR NO 1º E NO 3º TRIMESTRE DA GESTAÇÃO",
      "USO ORAL"
     ]
    ]
   },
   {
    "label": "Alergia à penicilina (criança): clindamicina + sulfametoxazol-trimetoprima por 03 a 05 dias",
    "mode": "ped",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "SULFAMETOXAZOL 200 MG + TRIMETOPRIMA 40 MG/5 ML SUSPENSÃO ORAL",
      "01 FRASCO",
      "DAR {DOSE} VIA ORAL DE 12/12H POR 03 A 05 DIAS, JUNTO COM A CLINDAMICINA (8 MG/KG/DIA DE TRIMETOPRIMA; MÁXIMO 160 MG DE TRIMETOPRIMA POR DOSE). NÃO USAR NAS PRIMEIRAS 6 SEMANAS DE VIDA",
      "USO ORAL",
      {
       "kgdia": 8,
       "vezes": 2,
       "conc": 8,
       "un": "ML",
       "max": 160
      }
     ],
     [
      "CLINDAMICINA 150 MG",
      "CÁPSULAS CONFORME A DOSE",
      "DAR {DOSE} VIA ORAL DE 8/8H POR 03 A 05 DIAS, JUNTO COM O SULFAMETOXAZOL-TRIMETOPRIMA (30 MG/KG/DIA; MÁXIMO 600 MG POR DOSE) — ARREDONDAR PARA CÁPSULAS DE 150 MG; SÓ PARA QUEM CONSEGUE ENGOLIR CÁPSULA",
      "USO ORAL",
      {
       "kgdia": 30,
       "vezes": 3,
       "un": "MG",
       "max": 600
      }
     ]
    ],
    "orient": [
     "CRIANÇA ALÉRGICA À PENICILINA QUE NÃO ENGOLE CÁPSULA: DISCUTIR A ALTERNATIVA COM A INFECTOLOGIA (CLINDAMICINA LÍQUIDA TEM POUCA DISPONIBILIDADE)"
    ]
   }
  ]
 },
 {
  "id": "nasofaringite",
  "ic": "🤧",
  "nm": "Nasofaringite / Resfriado",
  "sub": "soro fisiológico nasal · dipirona · paracetamol",
  "blocks": [
   {
    "label": "Padrão — Lavagem nasal com soro fisiológico",
    "draft": true,
    "items": [
     [
      "SERINGA DE 10 ML",
      "01 UNIDADE",
      "",
      "USO INTRANASAL"
     ],
     [
      "SOLUÇÃO FISIOLÓGICA 0,9%",
      "01 FRASCO",
      "",
      "USO INTRANASAL"
     ]
    ],
    "orient": [
     "ASPIRAR O SORO COM A SERINGA, RETIRAR A AGULHA E INJETAR EM CADA NARINA (SEM TAPAR A OUTRA), ESTANDO COM A BOCA ABERTA, TRÊS VEZES AO DIA",
     "HIDRATAÇÃO, REPOUSO E MEL (01 COLHER DE CHÁ) PARA ALIVIAR A TOSSE. INFECÇÃO VIRAL QUE MELHORA EM 7 A 10 DIAS — ANTIBIÓTICO NÃO É NECESSÁRIO. LAVAR AS MÃOS E COBRIR A BOCA AO TOSSIR",
     "SÍNDROME GRIPAL (FEBRE DE INÍCIO SÚBITO + TOSSE OU DOR DE GARGANTA) EM PACIENTE COM FATOR DE RISCO PARA COMPLICAÇÃO: TESTAR COVID-19/INFLUENZA E AVALIAR OSELTAMIVIR CONFORME PROTOCOLO DO MS",
     "RETORNAR SE FEBRE POR MAIS DE 3 DIAS, SINTOMAS POR MAIS DE 10 DIAS, PIORA APÓS MELHORA INICIAL, DOR DE OUVIDO OU DOR NA FACE",
     "RETORNAR IMEDIATAMENTE SE FALTA DE AR, DOR NO PEITO, LÁBIOS ROXOS, CONFUSÃO OU PROSTRAÇÃO INTENSA"
    ]
   },
   {
    "label": "Padrão — Analgésico / antitérmico — escolha 1",
    "draft": true,
    "menu": true,
    "items": [
     [
      "DIPIRONA 500MG",
      "01 CAIXA",
      "TOMAR 02 COMPRIMIDOS SE FEBRE OU DOR, PODENDO REPETIR DE 06/06H"
     ],
     [
      "PARACETAMOL 750 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO SE DOR OU FEBRE, PODENDO REPETIR DE 6/6H. INTERCALAR COM DIPIRONA, SE NECESSÁRIO."
     ]
    ]
   },
   {
    "label": "Combinação pronta — Sintomáticos + lavagem nasal com soro fisiológico",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "DIPIRONA 500MG",
      "01 CAIXA",
      "TOMAR 02 COMPRIMIDOS SE FEBRE OU DOR, PODENDO REPETIR DE 06/06H"
     ],
     [
      "SERINGA DE 10 ML",
      "01 UNIDADE",
      "",
      "USO INTRANASAL"
     ],
     [
      "SOLUÇÃO FISIOLÓGICA 0,9%",
      "01 FRASCO",
      "",
      "USO INTRANASAL"
     ]
    ]
   },
   {
    "label": "Opção 1 — dipirona + lavagem nasal com seringa",
    "sec": "offlabel",
    "items": [
     [
      "DIPIRONA 500MG",
      "01 CAIXA",
      "TOMAR 02 COMPRIMIDOS SE FEBRE OU DOR, PODENDO REPETIR DE 06/06H"
     ],
     [
      "SERINGA DE 10 ML",
      "01 UNIDADE",
      "",
      "USO INTRANASAL"
     ],
     [
      "SOLUÇÃO FISIOLÓGICA 0,9%",
      "01 FRASCO",
      "",
      "USO INTRANASAL"
     ]
    ],
    "orient": [
     "ASPIRAR O SORO COM A SERINGA, RETIRAR A AGULHA E INJETAR EM CADA NARINA (SEM TAPAR A OUTRA), ESTANDO COM A BOCA ABERTA, TRÊS VEZES AO DIA",
     "É NORMAL ENGOLIR OU A SECREÇÃO SAIR PELO OUTRO LADO",
     "GUARDAR O SORO NA GELADEIRA E LAVAR O MATERIAL COM ÁGUA E SABÃO"
    ]
   },
   {
    "label": "Analgésico/antitérmico — escolha 1",
    "sec": "offlabel",
    "menu": true,
    "items": [
     [
      "DIPIRONA 500MG",
      "01 CAIXA",
      "TOMAR 02 COMPRIMIDOS SE FEBRE OU DOR, PODENDO REPETIR DE 06/06H"
     ],
     [
      "PARACETAMOL 750 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO SE DOR OU FEBRE, PODENDO REPETIR DE 6/6H. INTERCALAR COM DIPIRONA, SE NECESSÁRIO."
     ]
    ]
   },
   {
    "label": "Padrão — Lavagem nasal com soro fisiológico",
    "mode": "ped",
    "draft": true,
    "items": [
     [
      "SOLUÇÃO FISIOLÓGICA 0,9%",
      "01 FRASCO",
      "INSTILAR EM CADA NARINA COM A SERINGA (SEM AGULHA), 3 A 4 VEZES AO DIA, ANTES DAS MAMADAS/REFEIÇÕES E DO SONO (LACTENTES: 2 A 5 ML; CRIANÇAS MAIORES: 5 A 10 ML POR NARINA)",
      "USO INTRANASAL"
     ],
     [
      "SERINGA DE 10 ML",
      "01 UNIDADE",
      "",
      "USO INTRANASAL"
     ]
    ],
    "orient": [
     "INFECÇÃO VIRAL QUE MELHORA EM 7 A 10 DIAS (A TOSSE PODE DURAR ATÉ 3 SEMANAS): ANTIBIÓTICO NÃO É NECESSÁRIO. OFERECER LÍQUIDOS COM FREQUÊNCIA E ELEVAR A CABECEIRA",
     "NÃO USAR DESCONGESTIONANTES, ANTI-HISTAMÍNICOS OU XAROPES PARA TOSSE EM MENORES DE 6 ANOS, NEM AAS. MAIORES DE 1 ANO: 01 COLHER (CHÁ) DE MEL ANTES DE DORMIR ALIVIA A TOSSE (NUNCA DAR MEL A MENORES DE 1 ANO)",
     "SÍNDROME GRIPAL EM MENOR DE 5 ANOS OU COM COMORBIDADE: AVALIAR OSELTAMIVIR CONFORME PROTOCOLO DO MS, SEM AGUARDAR O RESULTADO DO TESTE",
     "RETORNAR SE FEBRE POR MAIS DE 3 DIAS (OU QUALQUER FEBRE EM MENORES DE 3 MESES), DOR DE OUVIDO, SINTOMAS POR MAIS DE 10 DIAS OU PIORA APÓS MELHORA INICIAL",
     "RETORNAR IMEDIATAMENTE SE RESPIRAÇÃO RÁPIDA OU COM ESFORÇO, GEMÊNCIA, LÁBIOS ROXOS, RECUSA DE LÍQUIDOS OU MAMADAS, SONOLÊNCIA EXCESSIVA OU CONVULSÃO"
    ]
   },
   {
    "label": "Padrão — Antitérmico / analgésico se febre ou dor — escolha 1",
    "mode": "ped",
    "draft": true,
    "menu": true,
    "items": [
     [
      "DIPIRONA 500 MG/ML SOLUÇÃO ORAL (GOTAS)",
      "01 FRASCO",
      "DAR {DOSE} VIA ORAL DE 6/6H SE DOR OU FEBRE (15 MG/KG/DOSE). NÃO USAR EM MENORES DE 3 MESES",
      "USO ORAL",
      {
       "kg": 15,
       "conc": 500,
       "gotas": 20,
       "un": "GOTAS",
       "max": 1000
      }
     ],
     [
      "PARACETAMOL 200 MG/ML SOLUÇÃO ORAL (GOTAS)",
      "01 FRASCO",
      "DAR {DOSE} VIA ORAL DE 6/6H SE DOR OU FEBRE (15 MG/KG/DOSE)",
      "USO ORAL",
      {
       "kg": 15,
       "conc": 200,
       "gotas": 15,
       "un": "GOTAS",
       "max": 750
      }
     ],
     [
      "IBUPROFENO 50 MG/ML SUSPENSÃO ORAL (GOTAS)",
      "01 FRASCO",
      "DAR {DOSE} VIA ORAL DE 8/8H SE DOR OU FEBRE, APÓS ALIMENTAÇÃO (10 MG/KG/DOSE). SOMENTE ACIMA DE 6 MESES; NÃO USAR SE SUSPEITA DE DENGUE OU DESIDRATAÇÃO",
      "USO ORAL",
      {
       "kg": 10,
       "conc": 50,
       "gotas": 10,
       "un": "GOTAS",
       "max": 200
      }
     ]
    ]
   },
   {
    "label": "Combinação pronta — lavagem nasal com soro fisiológico + antitérmico se febre ou dor",
    "mode": "ped",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "SOLUÇÃO FISIOLÓGICA 0,9%",
      "01 FRASCO",
      "INSTILAR EM CADA NARINA COM A SERINGA (SEM AGULHA), 3 A 4 VEZES AO DIA, ANTES DAS MAMADAS/REFEIÇÕES E DO SONO (LACTENTES: 2 A 5 ML; CRIANÇAS MAIORES: 5 A 10 ML POR NARINA)",
      "USO INTRANASAL"
     ],
     [
      "SERINGA DE 10 ML",
      "01 UNIDADE",
      "",
      "USO INTRANASAL"
     ],
     [
      "DIPIRONA 500 MG/ML SOLUÇÃO ORAL (GOTAS)",
      "01 FRASCO",
      "DAR {DOSE} VIA ORAL DE 6/6H SE DOR OU FEBRE (15 MG/KG/DOSE). NÃO USAR EM MENORES DE 3 MESES",
      "USO ORAL",
      {
       "kg": 15,
       "conc": 500,
       "gotas": 20,
       "un": "GOTAS",
       "max": 1000
      }
     ]
    ]
   },
   {
    "label": "Antitérmico/analgésico alternativo à dipirona — escolha 1",
    "mode": "ped",
    "sec": "offlabel",
    "draft": true,
    "menu": true,
    "items": [
     [
      "PARACETAMOL 200 MG/ML SOLUÇÃO ORAL (GOTAS)",
      "01 FRASCO",
      "DAR {DOSE} VIA ORAL DE 6/6H SE DOR OU FEBRE (15 MG/KG/DOSE)",
      "USO ORAL",
      {
       "kg": 15,
       "conc": 200,
       "gotas": 15,
       "un": "GOTAS",
       "max": 750
      }
     ],
     [
      "IBUPROFENO 50 MG/ML SUSPENSÃO ORAL (GOTAS)",
      "01 FRASCO",
      "DAR {DOSE} VIA ORAL DE 8/8H SE DOR OU FEBRE, APÓS ALIMENTAÇÃO (10 MG/KG/DOSE). SOMENTE ACIMA DE 6 MESES; NÃO USAR SE SUSPEITA DE DENGUE OU DESIDRATAÇÃO",
      "USO ORAL",
      {
       "kg": 10,
       "conc": 50,
       "gotas": 10,
       "un": "GOTAS",
       "max": 200
      }
     ]
    ]
   }
  ]
 },
 {
  "id": "nauseas_vomitos",
  "ic": "🤢",
  "nm": "Náuseas e vômitos",
  "sub": "metoclopramida · ondansetrona · dimenidrinato · soro de reidratação oral",
  "blocks": [
   {
    "label": "Padrão — Antiemético — escolha 1",
    "draft": true,
    "menu": true,
    "items": [
     [
      "METOCLOPRAMIDA 10 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO SE NÁUSEAS OU VÔMITOS, PODENDO REPETIR DE 8/8H, POR NO MÁXIMO 05 DIAS"
     ],
     [
      "ONDANSETRONA 8 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO SE NÁUSEAS OU VÔMITOS, PODENDO REPETIR DE 8/8H. NÃO USAR EM GESTANTES (VER OUTRAS OPÇÕES)"
     ],
     [
      "DIMENIDRINATO 50 MG + PIRIDOXINA 10MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO SE VERTIGEM, NÁUSEAS OU VÔMITOS, PODENDO REPETIR DE 6/6H"
     ]
    ],
    "orient": [
     "TOMAR LÍQUIDOS EM PEQUENOS GOLES, VÁRIAS VEZES POR HORA; VOLTAR A COMER AOS POUCOS, COM ALIMENTOS LEVES",
     "A METOCLOPRAMIDA PODE CAUSAR INQUIETAÇÃO OU MOVIMENTOS INVOLUNTÁRIOS (PESCOÇO, OLHOS, LÍNGUA): SE ACONTECER, PARAR O REMÉDIO E PROCURAR ATENDIMENTO",
     "RETORNAR SE NÃO CONSEGUIR BEBER LÍQUIDOS, VÔMITO COM SANGUE OU ESCURO (BORRA DE CAFÉ), DOR FORTE NA BARRIGA, BARRIGA ESTUFADA E DURA, URINA MUITO ESCURA OU EM POUCA QUANTIDADE, TONTURA AO LEVANTAR OU SONOLÊNCIA"
    ]
   },
   {
    "label": "Padrão — Hidratação oral",
    "draft": true,
    "items": [
     [
      "SORO DE REIDRATAÇÃO ORAL",
      "01 CAIXA",
      "DILUIR 01 SACHÊ EM 1 LITRO DE ÁGUA FILTRADA OU FERVIDA. TOMAR EM PEQUENOS GOLES (01 A 02 COLHERES DE SOPA A CADA 5 MINUTOS), AUMENTANDO CONFORME A TOLERÂNCIA",
      "USO ORAL"
     ]
    ]
   },
   {
    "label": "Padrão — Antiemético EV — escolha 1",
    "mode": "internacao",
    "draft": true,
    "menu": true,
    "items": [
     [
      "METOCLOPRAMIDA 5 MG/ML SOLUÇÃO INJETÁVEL",
      "01 AMPOLA 2 ML",
      "ADMINISTRAR 10 MG (2 ML) EV, DILUÍDO EM 100 ML DE SF 0,9%, EM 15 MINUTOS; PODE REPETIR ATÉ DE 8/8H",
      "USO ENDOVENOSO"
     ],
     [
      "ONDANSETRONA 2 MG/ML SOLUÇÃO INJETÁVEL",
      "01 AMPOLA 2 ML",
      "ADMINISTRAR 4 MG (02 ML) EV LENTO ATÉ DE 8/8H SE NÁUSEAS OU VÔMITOS",
      "USO ENDOVENOSO"
     ],
     [
      "BROMOPRIDA 5 MG/ML SOLUÇÃO INJETÁVEL",
      "01 AMPOLA 2 ML",
      "ADMINISTRAR 10 MG (2 ML) EV LENTO, ATÉ DE 12/12H SE NÁUSEAS OU VÔMITOS (MÁXIMO 20 MG/DIA). PODE CAUSAR REAÇÃO EXTRAPIRAMIDAL, COMO A METOCLOPRAMIDA",
      "USO ENDOVENOSO"
     ]
    ]
   },
   {
    "label": "Padrão — Hidratação EV se desidratação ou intolerância oral",
    "mode": "internacao",
    "draft": true,
    "items": [
     [
      "CLORETO DE SÓDIO 0,9% (SORO FISIOLÓGICO)",
      "01 BOLSA 500 ML",
      "INFUNDIR 500 ML EV EM 30 A 60 MINUTOS; REAVALIAR E REPETIR CONFORME HIDRATAÇÃO, DIURESE E TOLERÂNCIA ORAL (CAUTELA EM CARDIOPATAS E DOENTES RENAIS CRÔNICOS)",
      "USO ENDOVENOSO"
     ]
    ]
   },
   {
    "label": "Padrão — Se vômitos persistentes (a partir de 6 meses): ondansetrona antes de reiniciar a SRO",
    "mode": "ped",
    "draft": true,
    "items": [
     [
      "ONDANSETRONA 4 MG/5 ML SOLUÇÃO ORAL",
      "01 FRASCO",
      "SE VÔMITOS PERSISTENTES, DAR DOSE ÚNICA 15 MINUTOS ANTES DE REINICIAR A SRO: {FAIXA}",
      "USO ORAL",
      {
       "sem_peso": "6 MESES A 2 ANOS 2,5 ML (2 MG); MAIS DE 2 A 10 ANOS (ATÉ 30 KG) 5 ML (4 MG); ACIMA DE 10 ANOS (MAIS DE 30 KG) 10 ML (8 MG)",
       "faixas": [
        {
         "ate": 30,
         "txt": "6 MESES A 2 ANOS 2,5 ML (2 MG); MAIS DE 2 ANOS 5 ML (4 MG)"
        },
        {
         "acima": 30,
         "txt": "10 ML (8 MG)"
        }
       ]
      }
     ]
    ],
    "orient": [
     "OFERECER O SORO EM POUCA QUANTIDADE E COM FREQUÊNCIA (01 COLHER A CADA 1 A 2 MINUTOS); SE VOMITAR, ESPERAR 10 MINUTOS E RECOMEÇAR MAIS DEVAGAR",
     "MANTER O ALEITAMENTO MATERNO E A ALIMENTAÇÃO HABITUAL ASSIM QUE PARAR DE VOMITAR",
     "RETORNAR SE A CRIANÇA NÃO CONSEGUIR BEBER, VOMITAR TUDO, FICAR MUITO SONOLENTA OU MUITO IRRITADA, BOCA SECA E CHORO SEM LÁGRIMAS, FRALDA SECA POR MAIS DE 6 HORAS, VÔMITO COM SANGUE OU VERDE, OU DOR FORTE NA BARRIGA"
    ]
   },
   {
    "label": "Padrão — Hidratação oral (planos A e B)",
    "mode": "ped",
    "draft": true,
    "items": [
     [
      "SORO DE REIDRATAÇÃO ORAL",
      "01 CAIXA",
      "DILUIR 01 SACHÊ EM 1 LITRO DE ÁGUA FILTRADA OU FERVIDA. PLANO B (NA UNIDADE): OFERECER {DOSE} EM 4 A 6 HORAS, EM PEQUENOS VOLUMES FREQUENTES, CONFORME A SEDE (75 ML/KG; FAIXA DE 50 A 100 ML/KG). PLANO A (HIDRATADA): APÓS CADA EVACUAÇÃO, MENOR DE 1 ANO 50-100 ML; 1 A 10 ANOS 100-200 ML; ACIMA DE 10 ANOS O VOLUME TOLERADO",
      "USO ORAL",
      {
       "kg": 75,
       "un": "ML",
       "max": 3750
      }
     ]
    ]
   },
   {
    "label": "Padrão — Antiemético EV pelo peso",
    "mode": "ped_internacao",
    "draft": true,
    "items": [
     [
      "ONDANSETRONA 2 MG/ML SOLUÇÃO INJETÁVEL",
      "01 AMPOLA 2 ML",
      "ADMINISTRAR {DOSE} EV LENTO ATÉ DE 8/8H SE NÁUSEAS OU VÔMITOS (0,15 MG/KG/DOSE; MÁXIMO 4 MG; A PARTIR DE 6 MESES)",
      "USO ENDOVENOSO",
      {
       "kg": 0.15,
       "un": "MG",
       "max": 4
      }
     ]
    ]
   },
   {
    "label": "Do material do Drive — Antiemético alternativo por poucos dias — escolha 1",
    "sec": "offlabel",
    "draft": true,
    "menu": true,
    "items": [
     [
      "DOMPERIDONA 10 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO 15 A 30 MINUTOS ANTES DAS REFEIÇÕES SE NÁUSEAS OU VÔMITOS, ATÉ 03 VEZES AO DIA (MÁXIMO 30 MG/DIA), POR NO MÁXIMO 07 DIAS. NÃO USAR SE DOENÇA DO CORAÇÃO OU USO DE REMÉDIOS QUE ALTERAM O RITMO CARDÍACO",
      "USO ORAL"
     ],
     [
      "BROMOPRIDA 10 MG",
      "01 CAIXA",
      "TOMAR 01 CÁPSULA SE NÁUSEAS OU VÔMITOS, ATÉ 03 VEZES AO DIA, POR NO MÁXIMO 05 DIAS. PODE CAUSAR INQUIETAÇÃO OU MOVIMENTOS INVOLUNTÁRIOS, COMO A METOCLOPRAMIDA: SE ACONTECER, PARAR E PROCURAR ATENDIMENTO",
      "USO ORAL"
     ]
    ]
   },
   {
    "label": "Do material do Drive — Dimenidrinato + piridoxina EV",
    "mode": "internacao",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "DIMENIDRINATO 3 MG/ML + PIRIDOXINA 5 MG/ML + GLICOSE + FRUTOSE SOLUÇÃO INJETÁVEL",
      "01 AMPOLA 10 ML",
      "ADMINISTRAR 01 AMPOLA (30 MG DE DIMENIDRINATO) EV, DILUÍDA EM 10 ML DE SF 0,9%, LENTAMENTE (NO MÍNIMO 02 MINUTOS); PODE REPETIR DE 4/4H A 6/6H SE NECESSÁRIO. CONTRAINDICADO NA INTOLERÂNCIA HEREDITÁRIA À FRUTOSE, NA PORFIRIA E EM MENORES DE 2 ANOS. CAUSA SONOLÊNCIA",
      "USO ENDOVENOSO"
     ]
    ]
   },
   {
    "label": "Gestante: náuseas e vômitos da gravidez (forma leve, PUQE ≤ 6) — escolha 1",
    "sec": "offlabel",
    "draft": true,
    "menu": true,
    "items": [
     [
      "PIRIDOXINA (VITAMINA B6) 25 MG CÁPSULA — MANIPULADO",
      "60 CÁPSULAS",
      "TOMAR 01 CÁPSULA DE 8/8H ENQUANTO HOUVER NÁUSEAS (PODE SER DE 6/6H SE NECESSÁRIO). PRIMEIRA ESCOLHA NA GESTAÇÃO, JUNTO COM AS MEDIDAS ALIMENTARES",
      "USO ORAL"
     ],
     [
      "DIMENIDRINATO 50 MG + PIRIDOXINA 10MG",
      "01 CAIXA",
      "SE A PIRIDOXINA NÃO BASTAR: TOMAR 01 COMPRIMIDO ATÉ DE 6/6H SE NÁUSEAS OU VÔMITOS (MÁXIMO 04 COMPRIMIDOS POR DIA). CAUSA SONOLÊNCIA",
      "USO ORAL"
     ]
    ],
    "orient": [
     "GESTANTE: FAZER REFEIÇÕES PEQUENAS E FREQUENTES, PREFERIR ALIMENTOS SECOS E FRIOS, EVITAR JEJUM PROLONGADO E CHEIROS FORTES; GENGIBRE PODE AJUDAR",
     "GESTANTE COM VÔMITOS QUE NÃO PARAM, PERDA DE PESO, URINA ESCURA OU EM POUCA QUANTIDADE OU TONTURA: PROCURAR A MATERNIDADE (RISCO DE HIPERÊMESE)"
    ]
   }
  ]
 },
 {
  "id": "odontalgia",
  "ic": "🦷",
  "nm": "Odontalgia / abscesso dentário",
  "sub": "ibuprofeno · dipirona · paracetamol · amoxicilina",
  "blocks": [
   {
    "label": "Padrão — AINE (1ª escolha na dor de dente) — escolha 1",
    "draft": true,
    "menu": true,
    "items": [
     [
      "IBUPROFENO 600 MG",
      "15 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO DE 8/8H, APÓS AS REFEIÇÕES, POR 05 DIAS"
     ],
     [
      "NAPROXENO SÓDICO 500 MG",
      "10 COMPRIMIDOS",
      "TOMAR UM COMPRIMIDO SE DOR, PODENDO REPETIR DE 12/12H POR ATÉ 05 DIAS SEGUIDOS"
     ]
    ],
    "orient": [
     "PROCURAR O DENTISTA (UNIDADE DE SAÚDE OU CENTRO DE ESPECIALIDADES ODONTOLÓGICAS) O QUANTO ANTES: O TRATAMENTO DEFINITIVO É FEITO NO DENTE",
     "ANTIBIÓTICO NÃO TRATA DOR DE DENTE SEM INFECÇÃO ESPALHADA; USE SÓ SE FOI RECEITADO",
     "RETORNAR IMEDIATAMENTE SE O INCHAÇO NO ROSTO OU NO PESCOÇO AUMENTAR, DIFICULDADE PARA ABRIR A BOCA, ENGOLIR OU RESPIRAR, OU FEBRE ALTA"
    ]
   },
   {
    "label": "Padrão — Analgésico (pode ser associado ao AINE) — escolha 1",
    "draft": true,
    "menu": true,
    "items": [
     [
      "DIPIRONA 500 MG",
      "01 CAIXA",
      "TOMAR 02 COMPRIMIDOS SE DOR OU FEBRE, PODENDO REPETIR DE 6/6H"
     ],
     [
      "PARACETAMOL 750 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO SE DOR OU FEBRE, PODENDO REPETIR DE 6/6H. INTERCALAR COM DIPIRONA, SE NECESSÁRIO."
     ]
    ]
   },
   {
    "label": "Padrão — Abscesso dentário com febre, mal-estar, inchaço no rosto ou trismo, ou abscesso localizado sem dentista disponível logo: antibiótico + dentista — escolha 1",
    "draft": true,
    "menu": true,
    "items": [
     [
      "AMOXICILINA 500 MG",
      "15 CÁPSULAS",
      "TOMAR 01 CÁPSULA DE 8/8H POR 05 DIAS"
     ],
     [
      "CEFALEXINA 500 MG",
      "20 CÁPSULAS",
      "ALERGIA À PENICILINA SEM ANAFILAXIA, ANGIOEDEMA OU URTICÁRIA: TOMAR 01 CÁPSULA DE 6/6H POR 05 DIAS",
      "USO ORAL"
     ],
     [
      "AZITROMICINA 500 MG",
      "03 COMPRIMIDOS",
      "ALERGIA À PENICILINA COM ANAFILAXIA, ANGIOEDEMA OU URTICÁRIA: TOMAR 01 COMPRIMIDO 01 VEZ AO DIA POR 03 DIAS",
      "USO ORAL"
     ],
     [
      "CLINDAMICINA 300 MG",
      "20 CÁPSULAS",
      "ALERGIA À PENICILINA COM ANAFILAXIA, ANGIOEDEMA OU URTICÁRIA: TOMAR 01 CÁPSULA DE 6/6H POR 05 DIAS (MAIOR RISCO DE DIARREIA POR C. DIFFICILE)",
      "USO ORAL"
     ]
    ],
    "orient": [
     "SE O ANTIBIÓTICO FOI RECEITADO PARA USAR SÓ SE PIORAR: COMEÇAR SOMENTE SE A DOR OU O INCHAÇO AUMENTAREM OU NÃO MELHORAREM EM 24 A 48 HORAS, E PROCURAR O DENTISTA",
     "EM USO DE ANTIBIÓTICO: RETORNAR PARA REAVALIAÇÃO EM 03 DIAS (OU ANTES, SE PIORAR)"
    ]
   },
   {
    "label": "Padrão — Analgésico pelo peso — escolha 1",
    "mode": "ped",
    "draft": true,
    "menu": true,
    "items": [
     [
      "IBUPROFENO 100 MG/ML SUSPENSÃO ORAL (GOTAS)",
      "01 FRASCO",
      "DAR {DOSE} VIA ORAL ATÉ DE 8/8H SE DOR OU FEBRE, APÓS ALIMENTAÇÃO (10 MG/KG/DOSE; SOMENTE A PARTIR DE 6 MESES; NÃO USAR SE SUSPEITA DE DENGUE, DESIDRATAÇÃO OU VÔMITOS)",
      "USO ORAL",
      {
       "kg": 10,
       "conc": 100,
       "gotas": 10,
       "un": "GOTAS",
       "max": 400
      }
     ],
     [
      "DIPIRONA 500 MG/ML SOLUÇÃO ORAL (GOTAS)",
      "01 FRASCO",
      "DAR {DOSE} VIA ORAL ATÉ DE 6/6H SE DOR OU FEBRE (15 MG/KG/DOSE; NÃO USAR EM MENORES DE 3 MESES OU COM MENOS DE 5 KG)",
      "USO ORAL",
      {
       "kg": 15,
       "conc": 500,
       "gotas": 20,
       "un": "GOTAS",
       "max": 1000
      }
     ],
     [
      "PARACETAMOL 200 MG/ML SOLUÇÃO ORAL (GOTAS)",
      "01 FRASCO",
      "DAR {DOSE} VIA ORAL ATÉ DE 6/6H SE DOR OU FEBRE (15 MG/KG/DOSE)",
      "USO ORAL",
      {
       "kg": 15,
       "conc": 200,
       "gotas": 15,
       "un": "GOTAS",
       "max": 750
      }
     ]
    ],
    "orient": [
     "LEVAR A CRIANÇA AO DENTISTA (UNIDADE DE SAÚDE) O QUANTO ANTES: O TRATAMENTO DEFINITIVO É FEITO NO DENTE",
     "RETORNAR IMEDIATAMENTE SE O INCHAÇO NO ROSTO AUMENTAR, FEBRE, DIFICULDADE PARA ABRIR A BOCA OU ENGOLIR"
    ]
   },
   {
    "label": "Padrão — Abscesso com febre ou inchaço no rosto: antibiótico pelo peso + encaminhar ao dentista (alergia: cefalexina se sem anafilaxia; azitromicina se anafilaxia) — escolha 1",
    "mode": "ped",
    "draft": true,
    "menu": true,
    "items": [
     [
      "AMOXICILINA 250 MG/5 ML SUSPENSÃO ORAL",
      "01 FRASCO",
      "DAR {DOSE} VIA ORAL DE 8/8H POR 05 DIAS (50 MG/KG/DIA; MÁXIMO 500 MG POR DOSE)",
      "USO ORAL",
      {
       "kgdia": 50,
       "vezes": 3,
       "conc": 50,
       "un": "ML",
       "max": 500
      }
     ],
     [
      "CEFALEXINA 250 MG/5 ML SUSPENSÃO ORAL",
      "01 FRASCO",
      "ALERGIA À PENICILINA SEM ANAFILAXIA: DAR {DOSE} VIA ORAL DE 6/6H POR 05 DIAS (50 MG/KG/DIA; MÁXIMO 500 MG POR DOSE)",
      "USO ORAL",
      {
       "kgdia": 50,
       "vezes": 4,
       "conc": 50,
       "un": "ML",
       "max": 500
      }
     ],
     [
      "AZITROMICINA 200 MG/5 ML SUSPENSÃO ORAL",
      "01 FRASCO",
      "ALERGIA À PENICILINA COM ANAFILAXIA: DAR {DOSE} VIA ORAL 01 VEZ AO DIA POR 03 DIAS (10 MG/KG/DIA; MÁXIMO 500 MG)",
      "USO ORAL",
      {
       "kg": 10,
       "conc": 40,
       "un": "ML",
       "max": 500
      }
     ]
    ]
   },
   {
    "label": "Do material do Drive — Profilaxia de endocardite antes de procedimento odontológico (cardiopatia de alto risco) — escolha 1",
    "sec": "offlabel",
    "draft": true,
    "menu": true,
    "items": [
     [
      "AMOXICILINA 500 MG",
      "04 CÁPSULAS",
      "TOMAR 04 CÁPSULAS (2 G) EM DOSE ÚNICA, 30 A 60 MINUTOS ANTES DO PROCEDIMENTO ODONTOLÓGICO",
      "USO ORAL"
     ],
     [
      "CEFALEXINA 500 MG",
      "04 CÁPSULAS",
      "ALERGIA À PENICILINA SEM ANAFILAXIA, ANGIOEDEMA OU URTICÁRIA: TOMAR 04 CÁPSULAS (2 G) EM DOSE ÚNICA, 30 A 60 MINUTOS ANTES DO PROCEDIMENTO ODONTOLÓGICO",
      "USO ORAL"
     ],
     [
      "AZITROMICINA 500 MG",
      "01 COMPRIMIDO",
      "ALERGIA À PENICILINA COM ANAFILAXIA, ANGIOEDEMA OU URTICÁRIA (OU QUALQUER ALERGIA, SE PREFERIR): TOMAR 01 COMPRIMIDO EM DOSE ÚNICA, 30 A 60 MINUTOS ANTES DO PROCEDIMENTO ODONTOLÓGICO",
      "USO ORAL"
     ]
    ]
   },
   {
    "label": "Do material do Drive — Profilaxia de endocardite antes de procedimento odontológico (criança com cardiopatia de alto risco) — escolha 1",
    "mode": "ped",
    "sec": "offlabel",
    "draft": true,
    "menu": true,
    "items": [
     [
      "AMOXICILINA 250 MG/5 ML SUSPENSÃO ORAL",
      "01 FRASCO",
      "DAR {DOSE} VIA ORAL EM DOSE ÚNICA, 30 A 60 MINUTOS ANTES DO PROCEDIMENTO ODONTOLÓGICO (50 MG/KG; MÁXIMO 2 G)",
      "USO ORAL",
      {
       "kg": 50,
       "conc": 50,
       "un": "ML",
       "max": 2000
      }
     ],
     [
      "AZITROMICINA 200 MG/5 ML SUSPENSÃO ORAL",
      "01 FRASCO",
      "ALERGIA À PENICILINA: DAR {DOSE} VIA ORAL EM DOSE ÚNICA, 30 A 60 MINUTOS ANTES DO PROCEDIMENTO ODONTOLÓGICO (15 MG/KG; MÁXIMO 500 MG)",
      "USO ORAL",
      {
       "kg": 15,
       "conc": 40,
       "un": "ML",
       "max": 500
      }
     ]
    ]
   }
  ]
 },
 {
  "id": "otite_externa",
  "ic": "👂",
  "nm": "Otite externa aguda",
  "sub": "ciprofloxacino-hidrocortisona · dipirona · diclofenaco",
  "blocks": [
   {
    "label": "Padrão — Gota otológica antibiótico + corticoide — escolha 1",
    "draft": true,
    "menu": true,
    "items": [
     [
      "CIPROFLOXACINO 2 MG/ML + HIDROCORTISONA 10 MG/ML SUSPENSÃO OTOLÓGICA",
      "01 FRASCO",
      "AGITAR ANTES DE USAR. PINGAR 03 GOTAS NO OUVIDO ACOMETIDO DE 12/12H POR 07 DIAS",
      "USO TÓPICO AUDITIVO"
     ],
     [
      "CIPROFLOXACINO 3 MG/ML + DEXAMETASONA 1 MG/ML SUSPENSÃO OTOLÓGICA",
      "01 FRASCO",
      "AGITAR ANTES DE USAR. PINGAR 04 GOTAS NO OUVIDO ACOMETIDO DE 12/12H POR 07 DIAS",
      "USO TÓPICO AUDITIVO"
     ],
     [
      "SULFATO DE NEOMICINA 5 MG/ML + SULFATO DE POLIMIXINA B 10.000 UI/ML + HIDROCORTISONA 10 MG/ML SOLUÇÃO OTOLÓGICA",
      "01 FRASCO",
      "PINGAR 04 GOTAS NO OUVIDO ACOMETIDO DE 06/06H POR 10 DIAS. SÓ COM MEMBRANA TIMPÂNICA ÍNTEGRA (NÃO USAR SE PERFURAÇÃO OU TUBO DE VENTILAÇÃO — NEOMICINA É OTOTÓXICA); SUSPENDER SE PIORAR A COCEIRA OU A VERMELHIDÃO (ALERGIA À NEOMICINA). HORÁRIO SUGERIDO: 05:00 - 11:00 - 17:00 - 23:00",
      "USO TÓPICO AUDITIVO"
     ]
    ],
    "orient": [
     "MANTER O OUVIDO SECO: NO BANHO, PROTEGER COM ALGODÃO UNTADO EM VASELINA. NÃO NADAR ATÉ A MELHORA",
     "NÃO USAR HASTES FLEXÍVEIS (COTONETES) NEM INTRODUZIR OBJETOS NO OUVIDO",
     "PARA PINGAR: AQUECER O FRASCO NA MÃO, DEITAR DE LADO COM O OUVIDO AFETADO PARA CIMA E PERMANECER NESSA POSIÇÃO POR 3 A 5 MINUTOS",
     "RETORNAR SE NÃO HOUVER MELHORA EM 48 A 72H, OU IMEDIATAMENTE SE FEBRE, INCHAÇO OU VERMELHIDÃO AO REDOR OU ATRÁS DA ORELHA, DOR MUITO INTENSA OU PARALISIA DA FACE (ATENÇÃO ESPECIAL EM DIABÉTICOS E IMUNOSSUPRIMIDOS)"
    ]
   },
   {
    "label": "Padrão — Analgésico / antitérmico — escolha 1",
    "draft": true,
    "menu": true,
    "items": [
     [
      "DIPIRONA 500 MG",
      "01 CAIXA",
      "TOMAR 02 COMPRIMIDOS SE DOR OU FEBRE, PODENDO REPETIR DE 6/6H"
     ],
     [
      "PARACETAMOL 750 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO SE DOR OU FEBRE, PODENDO REPETIR DE 6/6H. INTERCALAR COM DIPIRONA, SE NECESSÁRIO."
     ]
    ]
   },
   {
    "label": "Padrão — AINE (anti-inflamatório) — escolha 1",
    "draft": true,
    "menu": true,
    "items": [
     [
      "DICLOFENACO 50 MG",
      "15 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO DE 8/8H, POR 05 DIAS SEGUIDOS HORÁRIO SUGERIDO (8/8h): 06:00 / 14:00 / 22:00"
     ],
     [
      "IBUPROFENO 300 MG",
      "01 CAIXA",
      "TOMAR 02 COMPRIMIDOS DE 6/6H POR 05 DIAS"
     ]
    ]
   },
   {
    "label": "Combinação pronta — gota otológica quinolona + corticoide + analgesia",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "CIPROFLOXACINO 2 MG/ML + HIDROCORTISONA 10 MG/ML SUSPENSÃO OTOLÓGICA",
      "01 FRASCO",
      "AGITAR ANTES DE USAR. PINGAR 03 GOTAS NO OUVIDO ACOMETIDO DE 12/12H POR 07 DIAS",
      "USO TÓPICO AUDITIVO"
     ],
     [
      "DIPIRONA 500 MG",
      "01 CAIXA",
      "TOMAR 02 COMPRIMIDOS SE DOR OU FEBRE, PODENDO REPETIR DE 6/6H"
     ],
     [
      "DICLOFENACO 50 MG",
      "15 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO DE 8/8H, POR 05 DIAS SEGUIDOS HORÁRIO SUGERIDO (8/8h): 06:00 / 14:00 / 22:00"
     ]
    ]
   },
   {
    "label": "Opção 1 — gota de ciprofloxacino + dexametasona + AINE + dipirona",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "CIPROFLOXACINO 3 MG/ML + DEXAMETASONA 1 MG/ML SUSPENSÃO OTOLÓGICA",
      "01 FRASCO",
      "AGITAR ANTES DE USAR. PINGAR 04 GOTAS NO OUVIDO ACOMETIDO DE 12/12H POR 07 DIAS",
      "USO TÓPICO AUDITIVO"
     ],
     [
      "DICLOFENACO 50 MG",
      "15 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO DE 8/8H, POR 05 DIAS SEGUIDOS HORÁRIO SUGERIDO (8/8h): 06:00 / 14:00 / 22:00"
     ],
     [
      "DIPIRONA 500 MG",
      "01 CAIXA",
      "TOMAR 02 COMPRIMIDOS SE DOR OU FEBRE, PODENDO REPETIR DE 6/6H"
     ]
    ]
   },
   {
    "label": "Opção 2 — gota de neomicina + polimixina B + hidrocortisona (membrana íntegra) + AINE + dipirona",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "SULFATO DE NEOMICINA 5 MG/ML + SULFATO DE POLIMIXINA B 10.000 UI/ML + HIDROCORTISONA 10 MG/ML SOLUÇÃO OTOLÓGICA",
      "01 FRASCO",
      "PINGAR 04 GOTAS NO OUVIDO ACOMETIDO DE 06/06H POR 10 DIAS. SÓ COM MEMBRANA TIMPÂNICA ÍNTEGRA (NÃO USAR SE PERFURAÇÃO OU TUBO DE VENTILAÇÃO — NEOMICINA É OTOTÓXICA); SUSPENDER SE PIORAR A COCEIRA OU A VERMELHIDÃO (ALERGIA À NEOMICINA). HORÁRIO SUGERIDO: 05:00 - 11:00 - 17:00 - 23:00",
      "USO TÓPICO AUDITIVO"
     ],
     [
      "DICLOFENACO 50 MG",
      "15 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO DE 8/8H, POR 05 DIAS SEGUIDOS HORÁRIO SUGERIDO (8/8h): 06:00 / 14:00 / 22:00"
     ],
     [
      "DIPIRONA 500 MG",
      "01 CAIXA",
      "TOMAR 02 COMPRIMIDOS SE DOR OU FEBRE, PODENDO REPETIR DE 6/6H"
     ]
    ]
   },
   {
    "label": "Analgésico/antitérmico — escolha 1",
    "sec": "offlabel",
    "menu": true,
    "items": [
     [
      "DIPIRONA 500 MG",
      "01 CAIXA",
      "TOMAR 02 COMPRIMIDOS SE DOR OU FEBRE, PODENDO REPETIR DE 6/6H"
     ],
     [
      "PARACETAMOL 750 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO SE DOR OU FEBRE, PODENDO REPETIR DE 6/6H. INTERCALAR COM DIPIRONA, SE NECESSÁRIO."
     ]
    ]
   },
   {
    "label": "AINE (anti-inflamatório) — escolha 1",
    "sec": "offlabel",
    "menu": true,
    "items": [
     [
      "DICLOFENACO 50 MG",
      "15 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO DE 8/8H, POR 05 DIAS SEGUIDOS HORÁRIO SUGERIDO (8/8h): 06:00 / 14:00 / 22:00"
     ],
     [
      "IBUPROFENO 300 MG",
      "01 CAIXA",
      "TOMAR 02 COMPRIMIDOS DE 6/6H POR 05 DIAS"
     ],
     [
      "NIMESULIDA 100 MG",
      "10 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO DE 12/12H POR 05 DIAS"
     ],
     [
      "NAPROXENO SÓDICO 500 MG",
      "10 COMPRIMIDOS",
      "TOMAR UM COMPRIMIDO SE DOR, PODENDO REPETIR DE 12/12H POR ATÉ 05 DIAS SEGUIDOS"
     ]
    ]
   },
   {
    "label": "Padrão — otite externa necrotizante (betalactâmico anti-Pseudomonas EV) — escolha 1",
    "mode": "internacao",
    "draft": true,
    "menu": true,
    "items": [
     [
      "CEFTAZIDIMA 1 G PÓ PARA SOLUÇÃO INJETÁVEL",
      "02 FRASCOS-AMPOLA",
      "ADMINISTRAR 2 G EV DE 8/8H, RECONSTITUIR E DILUIR EM 100 ML DE SF 0,9%, INFUNDIR EM 30 MINUTOS (AJUSTAR À FUNÇÃO RENAL)",
      "USO ENDOVENOSO"
     ],
     [
      "CEFEPIMA 1 G PÓ PARA SOLUÇÃO INJETÁVEL",
      "02 FRASCOS-AMPOLA",
      "ADMINISTRAR 2 G EV DE 8/8H, RECONSTITUIR E DILUIR EM 100 ML DE SF 0,9%, INFUNDIR EM 30 MINUTOS (AJUSTAR À FUNÇÃO RENAL)",
      "USO ENDOVENOSO"
     ],
     [
      "PIPERACILINA 4 G + TAZOBACTAM 500 MG PÓ PARA SOLUÇÃO INJETÁVEL",
      "01 FRASCO-AMPOLA",
      "ADMINISTRAR 4,5 G EV DE 6/6H, RECONSTITUIR E DILUIR EM 100 ML DE SF 0,9%, INFUNDIR EM 30 MINUTOS OU EM INFUSÃO ESTENDIDA DE 3 A 4H (AJUSTAR À FUNÇÃO RENAL)",
      "USO ENDOVENOSO"
     ]
    ],
    "orient": [
     "SUSPEITAR EM DIABÉTICO, IDOSO OU IMUNOSSUPRIMIDO COM OTALGIA INTENSA E NOTURNA DESPROPORCIONAL, OTORREIA PERSISTENTE E TECIDO DE GRANULAÇÃO NO CONDUTO, SEM RESPOSTA AO TRATAMENTO TÓPICO",
     "ANTES DO ANTIBIÓTICO: CULTURA (BACTÉRIAS E FUNGOS) DA SECREÇÃO OU BIÓPSIA DO TECIDO DE GRANULAÇÃO (EXCLUIR NEOPLASIA), HEMOCULTURAS, PCR/VHS; TC E/OU RM DE OSSOS TEMPORAIS; AVALIAÇÃO DA ORL E INFECTOLOGIA",
     "CONTROLE GLICÊMICO RIGOROSO E LIMPEZA (ASPIRAÇÃO) DO CONDUTO PELA ORL",
     "AJUSTAR À CULTURA E À FUNÇÃO RENAL; TRATAMENTO PROLONGADO (MÍNIMO 6 SEMANAS), COM TRANSIÇÃO PARA CIPROFLOXACINO ORAL SE CEPA SENSÍVEL",
     "EXAMINAR DIARIAMENTE PARES CRANIANOS (VII, IX A XII) E NÍVEL DE CONSCIÊNCIA; NOVO DÉFICIT INDICA DOENÇA AVANÇADA (CONSIDERAR TROMBOSE DE SEIO VENOSO)"
    ]
   },
   {
    "label": "Padrão — analgesia EV",
    "mode": "internacao",
    "draft": true,
    "items": [
     [
      "DIPIRONA 500 MG/ML SOLUÇÃO INJETÁVEL",
      "01 AMPOLA",
      "ADMINISTRAR 1 G (2 ML) EV DILUÍDO EM 10 ML DE ÁGUA DESTILADA, LENTO, DE 6/6H",
      "USO ENDOVENOSO"
     ],
     [
      "CLORIDRATO DE TRAMADOL 50 MG/ML SOLUÇÃO INJETÁVEL",
      "01 AMPOLA",
      "ADMINISTRAR 50 MG (1 ML) EV DILUÍDO EM 100 ML DE SF 0,9%, EM 30 MINUTOS, ATÉ DE 6/6H SE DOR INTENSA APESAR DA DIPIRONA (IDOSOS: NO MÁXIMO DE 8/8H)",
      "USO ENDOVENOSO"
     ],
     [
      "CLORIDRATO DE ONDANSETRONA 2 MG/ML SOLUÇÃO INJETÁVEL",
      "01 AMPOLA",
      "ADMINISTRAR 4 MG (2 ML) EV LENTO DE 8/8H SE NÁUSEA OU VÔMITO",
      "USO ENDOVENOSO"
     ]
    ]
   },
   {
    "label": "Pseudomonas sensível a quinolona ou alergia grave a betalactâmicos — ciprofloxacino EV",
    "mode": "internacao",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "CIPROFLOXACINO 2 MG/ML SOLUÇÃO INJETÁVEL (BOLSA 200 ML)",
      "01 BOLSA",
      "ADMINISTRAR 400 MG EV DE 8/8H, INFUNDIR EM 60 MINUTOS (AJUSTAR À FUNÇÃO RENAL)",
      "USO ENDOVENOSO"
     ]
    ],
    "orient": [
     "RESISTÊNCIA CRESCENTE DE PSEUDOMONAS A QUINOLONAS: PREFERIR APÓS ANTIBIOGRAMA; RISCO DE TENDINOPATIA, PROLONGAMENTO DO QT E DISGLICEMIA EM IDOSOS"
    ]
   },
   {
    "label": "Padrão — Gota otológica (quinolona + corticoide)",
    "mode": "ped",
    "draft": true,
    "items": [
     [
      "CIPROFLOXACINO 2 MG/ML + HIDROCORTISONA 10 MG/ML SUSPENSÃO OTOLÓGICA",
      "01 FRASCO",
      "AGITAR ANTES DE USAR. PINGAR 03 GOTAS NO OUVIDO ACOMETIDO DE 12/12H POR 07 DIAS (A PARTIR DE 1 ANO; NÃO USAR SE PERFURAÇÃO DO TÍMPANO OU TUBO DE VENTILAÇÃO)",
      "USO TÓPICO AUDITIVO"
     ]
    ],
    "orient": [
     "MANTER O OUVIDO SECO: NO BANHO, PROTEGER COM ALGODÃO UNTADO EM VASELINA. NÃO NADAR ATÉ A MELHORA",
     "NÃO USAR COTONETES NEM INTRODUZIR OBJETOS NO OUVIDO",
     "PARA PINGAR: AQUECER O FRASCO NA MÃO, DEITAR A CRIANÇA DE LADO COM O OUVIDO AFETADO PARA CIMA E MANTER A POSIÇÃO POR 3 A 5 MINUTOS",
     "RETORNAR SE NÃO HOUVER MELHORA EM 48 A 72H, OU IMEDIATAMENTE SE FEBRE, INCHAÇO OU VERMELHIDÃO AO REDOR OU ATRÁS DA ORELHA, OU DOR MUITO INTENSA"
    ]
   },
   {
    "label": "Padrão — Analgésico pelo peso — escolha 1",
    "mode": "ped",
    "draft": true,
    "menu": true,
    "items": [
     [
      "DIPIRONA 500 MG/ML SOLUÇÃO ORAL (GOTAS)",
      "01 FRASCO",
      "DAR {DOSE} VIA ORAL ATÉ DE 6/6H SE DOR OU FEBRE (15 MG/KG/DOSE; NÃO USAR EM MENORES DE 3 MESES OU COM MENOS DE 5 KG)",
      "USO ORAL",
      {
       "kg": 15,
       "conc": 500,
       "gotas": 20,
       "un": "GOTAS",
       "max": 1000
      }
     ],
     [
      "PARACETAMOL 200 MG/ML SOLUÇÃO ORAL (GOTAS)",
      "01 FRASCO",
      "DAR {DOSE} VIA ORAL ATÉ DE 6/6H SE DOR OU FEBRE (15 MG/KG/DOSE)",
      "USO ORAL",
      {
       "kg": 15,
       "conc": 200,
       "gotas": 15,
       "un": "GOTAS",
       "max": 750
      }
     ],
     [
      "IBUPROFENO 100 MG/ML SUSPENSÃO ORAL (GOTAS)",
      "01 FRASCO",
      "DAR {DOSE} VIA ORAL ATÉ DE 8/8H SE DOR OU FEBRE, APÓS ALIMENTAÇÃO (10 MG/KG/DOSE; SOMENTE A PARTIR DE 6 MESES; NÃO USAR SE SUSPEITA DE DENGUE, DESIDRATAÇÃO OU VÔMITOS)",
      "USO ORAL",
      {
       "kg": 10,
       "conc": 100,
       "gotas": 10,
       "un": "GOTAS",
       "max": 400
      }
     ]
    ]
   },
   {
    "label": "Combinação pronta — gota otológica (quinolona + corticoide) + analgésico",
    "mode": "ped",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "CIPROFLOXACINO 2 MG/ML + HIDROCORTISONA 10 MG/ML SUSPENSÃO OTOLÓGICA",
      "01 FRASCO",
      "AGITAR ANTES DE USAR. PINGAR 03 GOTAS NO OUVIDO ACOMETIDO DE 12/12H POR 07 DIAS (A PARTIR DE 1 ANO; NÃO USAR SE PERFURAÇÃO DO TÍMPANO OU TUBO DE VENTILAÇÃO)",
      "USO TÓPICO AUDITIVO"
     ],
     [
      "DIPIRONA 500 MG/ML SOLUÇÃO ORAL (GOTAS)",
      "01 FRASCO",
      "DAR {DOSE} VIA ORAL ATÉ DE 6/6H SE DOR OU FEBRE (15 MG/KG/DOSE; NÃO USAR EM MENORES DE 3 MESES OU COM MENOS DE 5 KG)",
      "USO ORAL",
      {
       "kg": 15,
       "conc": 500,
       "gotas": 20,
       "un": "GOTAS",
       "max": 1000
      }
     ]
    ]
   },
   {
    "label": "Perfuração timpânica ou tubo de ventilação — ciprofloxacino otológico sem corticoide",
    "mode": "ped",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "CIPROFLOXACINO 3,5 MG/ML SOLUÇÃO OTOLÓGICA",
      "01 FRASCO",
      "PINGAR 03 A 04 GOTAS NO OUVIDO ACOMETIDO DE 12/12H POR 07 DIAS (A PARTIR DE 1 ANO)",
      "USO TÓPICO AUDITIVO"
     ]
    ]
   },
   {
    "label": "Analgésico/antitérmico alternativo — escolha 1",
    "mode": "ped",
    "sec": "offlabel",
    "draft": true,
    "menu": true,
    "items": [
     [
      "PARACETAMOL 200 MG/ML SOLUÇÃO ORAL (GOTAS)",
      "01 FRASCO",
      "DAR {DOSE} VIA ORAL ATÉ DE 6/6H SE DOR OU FEBRE (15 MG/KG/DOSE)",
      "USO ORAL",
      {
       "kg": 15,
       "conc": 200,
       "gotas": 15,
       "un": "GOTAS",
       "max": 750
      }
     ],
     [
      "IBUPROFENO 100 MG/ML SUSPENSÃO ORAL (GOTAS)",
      "01 FRASCO",
      "DAR {DOSE} VIA ORAL ATÉ DE 8/8H SE DOR OU FEBRE, APÓS ALIMENTAÇÃO (10 MG/KG/DOSE; SOMENTE A PARTIR DE 6 MESES; NÃO USAR SE SUSPEITA DE DENGUE, DESIDRATAÇÃO OU VÔMITOS)",
      "USO ORAL",
      {
       "kg": 10,
       "conc": 100,
       "gotas": 10,
       "un": "GOTAS",
       "max": 400
      }
     ]
    ]
   }
  ]
 },
 {
  "id": "otite_media",
  "ic": "👂",
  "nm": "Otite média aguda",
  "sub": "amoxicilina · amoxicilina-clavulanato · dipirona",
  "blocks": [
   {
    "label": "Padrão — Antibiótico (amoxicilina-clavulanato se falha em 48–72 h ou antibiótico nos últimos 30 dias) — escolha 1",
    "draft": true,
    "menu": true,
    "items": [
     [
      "AMOXICILINA 500 MG",
      "21 CÁPSULAS",
      "TOMAR 01 CÁPSULA DE 8/8H POR 07 DIAS"
     ],
     [
      "AMOXICILINA 875 MG + CLAVULANATO 125 MG",
      "14 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO DE 12/12H POR 07 DIAS, NO INÍCIO DAS REFEIÇÕES"
     ]
    ],
    "orient": [
     "NÃO INTRODUZIR COTONETES OU OBJETOS NO OUVIDO E EVITAR ENTRADA DE ÁGUA SE HOUVER SAÍDA DE SECREÇÃO",
     "SE NÃO HOUVER MELHORA DA DOR OU DA FEBRE EM 48 A 72 HORAS, RETORNAR PARA REAVALIAÇÃO",
     "SE PERSISTIR SENSAÇÃO DE OUVIDO TAMPADO OU PERDA AUDITIVA APÓS O TRATAMENTO, PROCURAR A UBS PARA AVALIAÇÃO COM OTORRINOLARINGOLOGISTA",
     "RETORNAR IMEDIATAMENTE SE: DOR, INCHAÇO OU VERMELHIDÃO ATRÁS DA ORELHA, DOR DE CABEÇA INTENSA, RIGIDEZ DE NUCA, CONFUSÃO, PARALISIA DO ROSTO OU TONTURA INTENSA"
    ]
   },
   {
    "label": "Padrão — alergia à penicilina — escolha 1",
    "draft": true,
    "menu": true,
    "items": [
     [
      "CEFUROXIMA 500 MG",
      "14 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO DE 12/12H POR 07 DIAS, APÓS AS REFEIÇÕES"
     ],
     [
      "CLARITROMICINA 500 MG",
      "14 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO DE 12/12H POR 07 DIAS"
     ]
    ]
   },
   {
    "label": "Padrão — Analgésico / antitérmico — escolha 1",
    "draft": true,
    "menu": true,
    "items": [
     [
      "DIPIRONA 500 MG",
      "01 CAIXA",
      "TOMAR 02 COMPRIMIDOS SE DOR OU FEBRE, PODENDO REPETIR DE 6/6H"
     ],
     [
      "PARACETAMOL 750 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO SE DOR OU FEBRE, PODENDO REPETIR DE 6/6H. INTERCALAR COM DIPIRONA, SE NECESSÁRIO."
     ]
    ]
   },
   {
    "label": "Combinação pronta — amoxicilina + analgésico",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "AMOXICILINA 500 MG",
      "21 CÁPSULAS",
      "TOMAR 01 CÁPSULA DE 8/8H POR 07 DIAS"
     ],
     [
      "DIPIRONA 500 MG",
      "01 CAIXA",
      "TOMAR 02 COMPRIMIDOS SE DOR OU FEBRE, PODENDO REPETIR DE 6/6H"
     ]
    ]
   },
   {
    "label": "Combinação pronta — falha em 48–72 h ou antibiótico nos últimos 30 dias",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "AMOXICILINA 875 MG + CLAVULANATO 125 MG",
      "14 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO DE 12/12H POR 07 DIAS, NO INÍCIO DAS REFEIÇÕES"
     ]
    ]
   },
   {
    "label": "Analgésico/antitérmico — escolha 1",
    "sec": "offlabel",
    "menu": true,
    "items": [
     [
      "DIPIRONA 500 MG",
      "01 CAIXA",
      "TOMAR 02 COMPRIMIDOS SE DOR OU FEBRE, PODENDO REPETIR DE 6/6H"
     ],
     [
      "PARACETAMOL 750 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO SE DOR OU FEBRE, PODENDO REPETIR DE 6/6H. INTERCALAR COM DIPIRONA, SE NECESSÁRIO."
     ]
    ]
   },
   {
    "label": "Padrão — OMA complicada / mastoidite aguda (ceftriaxona EV)",
    "mode": "internacao",
    "draft": true,
    "items": [
     [
      "CEFTRIAXONA 1 G PÓ PARA SOLUÇÃO INJETÁVEL",
      "02 FRASCOS-AMPOLA",
      "ADMINISTRAR 2 G EV 01 VEZ AO DIA, RECONSTITUIR E DILUIR EM 100 ML DE SF 0,9%, INFUNDIR EM 30 MINUTOS. NÃO DILUIR EM SOLUÇÕES COM CÁLCIO (RINGER/HARTMANN). SE SUSPEITA DE COMPLICAÇÃO INTRACRANIANA: 2 G DE 12/12H",
      "USO ENDOVENOSO"
     ],
     [
      "DIPIRONA 500 MG/ML SOLUÇÃO INJETÁVEL",
      "01 AMPOLA",
      "ADMINISTRAR 1 G (2 ML) EV DILUÍDO EM 10 ML DE ÁGUA DESTILADA, LENTO, ATÉ DE 6/6H SE DOR OU FEBRE",
      "USO ENDOVENOSO"
     ],
     [
      "CLORIDRATO DE ONDANSETRONA 2 MG/ML SOLUÇÃO INJETÁVEL",
      "01 AMPOLA",
      "ADMINISTRAR 4 MG (2 ML) EV LENTO DE 8/8H SE NÁUSEA OU VÔMITO",
      "USO ENDOVENOSO"
     ]
    ],
    "orient": [
     "MONITORAR SINAIS VITAIS E DOR DE 4/4H. AVALIAÇÃO DA OTORRINOLARINGOLOGIA NAS PRIMEIRAS 24H (TIMPANOCENTESE/MIRINGOTOMIA COM CULTURA DA SECREÇÃO; DRENAGEM OU MASTOIDECTOMIA SE ABSCESSO SUBPERIOSTEAL)",
     "TC DE OSSOS TEMPORAIS E CRÂNIO COM CONTRASTE SE SUSPEITA DE ABSCESSO, COMPLICAÇÃO OU AUSÊNCIA DE MELHORA EM 48H",
     "SINAIS DE COMPLICAÇÃO INTRACRANIANA (CEFALEIA INTENSA, RIGIDEZ DE NUCA, REBAIXAMENTO, CONVULSÃO, PARALISIA FACIAL, PAPILEDEMA): IMAGEM COM CONTRASTE URGENTE, CEFTRIAXONA 2 G 12/12H + VANCOMICINA E AVALIAÇÃO NEUROCIRÚRGICA",
     "HIDRATAÇÃO VENOSA SOMENTE SE ACEITAÇÃO ORAL INADEQUADA. TRANSIÇÃO PARA VIA ORAL (AMOXICILINA-CLAVULANATO) APÓS 48–72H AFEBRIL E COM MELHORA LOCAL; DURAÇÃO TOTAL DEFINIDA COM A ORL"
    ]
   },
   {
    "label": "Alternativa — ampicilina-sulbactam EV",
    "mode": "internacao",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "AMPICILINA 2 G + SULBACTAM 1 G PÓ PARA SOLUÇÃO INJETÁVEL",
      "01 FRASCO-AMPOLA",
      "ADMINISTRAR 3 G EV DE 6/6H, RECONSTITUIR E DILUIR EM 100 ML DE SF 0,9%, INFUNDIR EM 30 MINUTOS (AJUSTAR À FUNÇÃO RENAL)",
      "USO ENDOVENOSO"
     ]
    ]
   },
   {
    "label": "Alergia grave (anafilaxia) a betalactâmicos — levofloxacino EV",
    "mode": "internacao",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "LEVOFLOXACINO 5 MG/ML SOLUÇÃO INJETÁVEL",
      "150 ML (750 MG)",
      "ADMINISTRAR 750 MG EV 01 VEZ AO DIA, INFUNDIR EM 90 MINUTOS (AJUSTAR À FUNÇÃO RENAL)",
      "USO ENDOVENOSO"
     ]
    ]
   },
   {
    "label": "Otite crônica / colesteatoma / ATB recente ou imunossupressão (cobertura anti-Pseudomonas) — escolha 1",
    "mode": "internacao",
    "sec": "offlabel",
    "draft": true,
    "menu": true,
    "items": [
     [
      "CEFEPIMA 1 G PÓ PARA SOLUÇÃO INJETÁVEL",
      "02 FRASCOS-AMPOLA",
      "ADMINISTRAR 2 G EV DE 8/8H, RECONSTITUIR E DILUIR EM 100 ML DE SF 0,9%, INFUNDIR EM 30 MINUTOS (AJUSTAR À FUNÇÃO RENAL)",
      "USO ENDOVENOSO"
     ],
     [
      "PIPERACILINA 4 G + TAZOBACTAM 500 MG PÓ PARA SOLUÇÃO INJETÁVEL",
      "01 FRASCO-AMPOLA",
      "ADMINISTRAR 4,5 G EV DE 6/6H, RECONSTITUIR E DILUIR EM 100 ML DE SF 0,9%, INFUNDIR EM 30 MINUTOS OU EM INFUSÃO ESTENDIDA DE 3 A 4H (AJUSTAR À FUNÇÃO RENAL)",
      "USO ENDOVENOSO"
     ]
    ],
    "orient": [
     "COLHER CULTURA DA SECREÇÃO ANTES DO ANTIBIÓTICO E AJUSTAR CONFORME ANTIBIOGRAMA"
    ]
   },
   {
    "label": "Padrão — amoxicilina em dose alta (90 mg/kg/dia)",
    "mode": "ped",
    "draft": true,
    "items": [
     [
      "AMOXICILINA 400 MG/5 ML SUSPENSÃO ORAL",
      "01 A 02 FRASCOS (CONFORME O PESO)",
      "DAR {DOSE} VIA ORAL DE 12/12H (90 MG/KG/DIA; MÁXIMO 2 G POR DOSE) — MENORES DE 2 ANOS OU OMA GRAVE: 10 DIAS; 2 A 5 ANOS: 07 DIAS; 6 ANOS OU MAIS: 05 A 07 DIAS",
      "USO ORAL",
      {
       "kgdia": 90,
       "vezes": 2,
       "conc": 80,
       "un": "ML",
       "max": 2000
      }
     ]
    ],
    "orient": [
     "MAIORES DE 6 MESES SEM SINAIS DE GRAVIDADE (DOR LEVE, FEBRE < 39 °C, SEM OTORREIA) PODEM SER APENAS OBSERVADOS POR 48–72H COM ANALGESIA — SE OMA UNILATERAL (6 A 23 MESES) OU SE 2 ANOS OU MAIS — DESDE QUE O RETORNO SEJA GARANTIDO",
     "MANTER ANALGESIA REGULAR NAS PRIMEIRAS 48–72H, OFERECER LÍQUIDOS E MANTER O ALEITAMENTO. NÃO INTRODUZIR COTONETES OU OBJETOS NO OUVIDO E EVITAR ENTRADA DE ÁGUA SE HOUVER SECREÇÃO",
     "SE FEBRE OU DOR PERSISTIREM APÓS 48–72H DE ANTIBIÓTICO, RETORNAR PARA REAVALIAÇÃO",
     "RETORNAR IMEDIATAMENTE SE: INCHAÇO, VERMELHIDÃO OU DOR ATRÁS DA ORELHA, ORELHA DESLOCADA PARA FRENTE, RIGIDEZ DE NUCA, SONOLÊNCIA OU IRRITABILIDADE INTENSA, VÔMITOS REPETIDOS OU PARALISIA DO ROSTO"
    ]
   },
   {
    "label": "Padrão — analgésico/antitérmico — escolha 1",
    "mode": "ped",
    "draft": true,
    "menu": true,
    "items": [
     [
      "DIPIRONA 500 MG/ML SOLUÇÃO ORAL (GOTAS)",
      "01 FRASCO",
      "DAR {DOSE} VIA ORAL ATÉ DE 6/6H SE DOR OU FEBRE (15 MG/KG/DOSE; NÃO USAR EM MENORES DE 3 MESES OU COM MENOS DE 5 KG)",
      "USO ORAL",
      {
       "kg": 15,
       "conc": 500,
       "gotas": 20,
       "un": "GOTAS",
       "max": 1000
      }
     ],
     [
      "PARACETAMOL 200 MG/ML SOLUÇÃO ORAL (GOTAS)",
      "01 FRASCO",
      "DAR {DOSE} VIA ORAL ATÉ DE 6/6H SE DOR OU FEBRE (15 MG/KG/DOSE)",
      "USO ORAL",
      {
       "kg": 15,
       "conc": 200,
       "gotas": 15,
       "un": "GOTAS",
       "max": 750
      }
     ],
     [
      "IBUPROFENO 100 MG/ML SUSPENSÃO ORAL (GOTAS)",
      "01 FRASCO",
      "DAR {DOSE} VIA ORAL ATÉ DE 8/8H SE DOR OU FEBRE, APÓS ALIMENTAÇÃO (10 MG/KG/DOSE; SOMENTE A PARTIR DE 6 MESES; NÃO USAR SE SUSPEITA DE DENGUE, DESIDRATAÇÃO OU VÔMITOS)",
      "USO ORAL",
      {
       "kg": 10,
       "conc": 100,
       "gotas": 10,
       "un": "GOTAS",
       "max": 400
      }
     ]
    ]
   },
   {
    "label": "Padrão — falha em 48–72 h ou antibiótico nos últimos 30 dias",
    "mode": "ped",
    "draft": true,
    "items": [
     [
      "AMOXICILINA 600 MG + CLAVULANATO DE POTÁSSIO 42,9 MG/5 ML PÓ PARA SUSPENSÃO ORAL (ES)",
      "01 A 02 FRASCOS (CONFORME O PESO)",
      "DAR {DOSE} VIA ORAL DE 12/12H, NO INÍCIO DAS REFEIÇÕES (90 MG/KG/DIA DE AMOXICILINA; MÁXIMO 2 G POR DOSE) — MENORES DE 2 ANOS OU OMA GRAVE: 10 DIAS; 2 A 5 ANOS: 07 DIAS; 6 ANOS OU MAIS: 05 A 07 DIAS",
      "USO ORAL",
      {
       "kgdia": 90,
       "vezes": 2,
       "conc": 120,
       "un": "ML",
       "max": 2000
      }
     ]
    ],
    "orient": [
     "INDICADO TAMBÉM EM OMA COM CONJUNTIVITE PURULENTA OU OMA RECORRENTE. NÃO SUBSTITUIR POR SUSPENSÕES 7:1 (EX.: 400 + 57 MG/5 ML) NA DOSE DE 90 MG/KG/DIA (EXCESSO DE CLAVULANATO E DIARREIA)",
     "ACIMA DE 40 KG: USAR COMPRIMIDO ADULTO (875 + 125 MG DE 12/12H)"
    ]
   },
   {
    "label": "Alergia à penicilina — escolha 1",
    "mode": "ped",
    "sec": "offlabel",
    "draft": true,
    "menu": true,
    "items": [
     [
      "CEFUROXIMA 250 MG/5 ML SUSPENSÃO ORAL",
      "01 A 02 FRASCOS (CONFORME O PESO)",
      "DAR {DOSE} VIA ORAL DE 12/12H, APÓS AS REFEIÇÕES (30 MG/KG/DIA) — ALERGIA NÃO ANAFILÁTICA — MENORES DE 2 ANOS OU OMA GRAVE: 10 DIAS; 2 A 5 ANOS: 07 DIAS; 6 ANOS OU MAIS: 05 A 07 DIAS",
      "USO ORAL",
      {
       "kgdia": 30,
       "vezes": 2,
       "conc": 50,
       "un": "ML",
       "max": 500
      }
     ],
     [
      "CLARITROMICINA 250 MG/5 ML SUSPENSÃO ORAL",
      "01 A 02 FRASCOS (CONFORME O PESO)",
      "DAR {DOSE} VIA ORAL DE 12/12H (15 MG/KG/DIA) — ALERGIA GRAVE/ANAFILAXIA À PENICILINA — MENORES DE 2 ANOS OU OMA GRAVE: 10 DIAS; 2 A 5 ANOS: 07 DIAS; 6 ANOS OU MAIS: 05 A 07 DIAS",
      "USO ORAL",
      {
       "kgdia": 15,
       "vezes": 2,
       "conc": 50,
       "un": "ML",
       "max": 500
      }
     ]
    ]
   },
   {
    "label": "Vômitos ou intolerância à via oral — ceftriaxona IM",
    "mode": "ped",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "CEFTRIAXONA 1 G PÓ PARA SOLUÇÃO INJETÁVEL IM (COM DILUENTE LIDOCAÍNA 1%)",
      "01 FRASCO-AMPOLA",
      "APLICAR {DOSE} IM PROFUNDO EM DOSE ÚNICA (50 MG/KG); SE FALHA TERAPÊUTICA, 01 VEZ AO DIA POR 03 DIAS",
      "USO INTRAMUSCULAR",
      {
       "kg": 50,
       "un": "MG",
       "max": 1000
      }
     ]
    ],
    "orient": [
     "NÃO USAR EM RECÉM-NASCIDOS (HIPERBILIRRUBINEMIA E PRECIPITAÇÃO COM CÁLCIO); A FORMULAÇÃO COM LIDOCAÍNA É EXCLUSIVAMENTE INTRAMUSCULAR"
    ]
   },
   {
    "label": "Do material do Drive — Anafilaxia à penicilina: azitromicina por 5 dias",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "AZITROMICINA 500 MG",
      "05 COMPRIMIDOS",
      "SE ALERGIA GRAVE (ANAFILAXIA) À PENICILINA: TOMAR 01 COMPRIMIDO AO DIA, NO MESMO HORÁRIO, POR 05 DIAS",
      "USO ORAL"
     ]
    ]
   }
  ]
 },
 {
  "id": "paralisia_facial",
  "ic": "😐",
  "nm": "Paralisia facial (Bell)",
  "sub": "prednisona · valaciclovir",
  "blocks": [
   {
    "label": "Padrão — prednisona + proteção ocular",
    "draft": true,
    "items": [
     [
      "PREDNISONA 20 MG",
      "23 COMPRIMIDOS",
      "TOMAR 03 COMPRIMIDOS (60 MG) PELA MANHÃ, APÓS O CAFÉ, POR 05 DIAS; DEPOIS, 02 COMPRIMIDOS PELA MANHÃ POR 03 DIAS; DEPOIS, 01 COMPRIMIDO PELA MANHÃ POR 02 DIAS"
     ],
     [
      "CARMELOSE SÓDICA 5 MG/ML COLÍRIO (LÁGRIMA ARTIFICIAL)",
      "01 FRASCO",
      "PINGAR 01 GOTA NO OLHO DO LADO PARALISADO DE 2/2H DURANTE O DIA, ENQUANTO O OLHO NÃO FECHAR COMPLETAMENTE",
      "USO TÓPICO"
     ],
     [
      "DEXPANTENOL 50 MG/G GEL OFTÁLMICO",
      "01 BISNAGA",
      "APLICAR 01 GOTA DO GEL NO OLHO DO LADO PARALISADO À NOITE, ANTES DE DORMIR, E FECHAR A PÁLPEBRA COM FITA MICROPORE (SEM APERTAR O OLHO)",
      "USO TÓPICO"
     ]
    ],
    "orient": [
     "INICIAR O CORTICOIDE O QUANTO ANTES (IDEALMENTE NAS PRIMEIRAS 72H DO INÍCIO DOS SINTOMAS). DIABÉTICOS: MONITORAR A GLICEMIA DURANTE O USO",
     "PROTEGER O OLHO DO LADO PARALISADO: USAR ÓCULOS DE SOL OU DE PROTEÇÃO DURANTE O DIA E MANTER A PÁLPEBRA FECHADA COM FITA À NOITE",
     "PRATICAR FISIOTERAPIA FACIAL SEMPRE QUE POSSÍVEL: FAZER CARETAS, BIQUINHOS, ASSOPRAR, FECHAR OS OLHOS COM FORÇA, FALAR NORMALMENTE... – PROCURAR UM PROFISSIONAL DE FISIOTERAPIA OU DE FONOAUDIOLOGIA EM CASO DE DIFICULDADE",
     "RETORNAR IMEDIATAMENTE SE FRAQUEZA OU FORMIGAMENTO EM BRAÇO OU PERNA, FALA ENROLADA, VISÃO DUPLA, TONTURA INTENSA, BOLHAS NA ORELHA, DOR OU VERMELHIDÃO NO OLHO OU PIORA PROGRESSIVA DA PARALISIA",
     "REAVALIAR EM 01 A 02 SEMANAS. ENCAMINHAR À NEUROLOGIA OU OTORRINOLARINGOLOGIA SE NÃO HOUVER RECUPERAÇÃO COMPLETA EM 03 MESES"
    ]
   },
   {
    "label": "Padrão — paralisia grave/completa: associar antiviral (até 72h)",
    "draft": true,
    "items": [
     [
      "VALACICLOVIR 500 MG",
      "42 COMPRIMIDOS",
      "TOMAR 02 COMPRIMIDOS DE 8/8H, POR 07 DIAS SEGUIDOS HORÁRIO SUGERIDO: 06:00 – 14:00 – 22:00"
     ]
    ]
   },
   {
    "label": "Combinação pronta — valaciclovir + prednisona + proteção ocular (paralisia grave/completa ou Ramsay Hunt)",
    "sec": "offlabel",
    "items": [
     [
      "VALACICLOVIR 500 MG",
      "42 COMPRIMIDOS",
      "TOMAR 02 COMPRIMIDOS DE 8/8H, POR 07 DIAS SEGUIDOS HORÁRIO SUGERIDO: 06:00 – 14:00 – 22:00"
     ],
     [
      "PREDNISONA 20 MG",
      "23 COMPRIMIDOS",
      "TOMAR 03 COMPRIMIDOS (60 MG) PELA MANHÃ, APÓS O CAFÉ, POR 05 DIAS; DEPOIS, 02 COMPRIMIDOS PELA MANHÃ POR 03 DIAS; DEPOIS, 01 COMPRIMIDO PELA MANHÃ POR 02 DIAS"
     ],
     [
      "LÁCRIMA PLUS®",
      "01 FRASCO",
      "PINGAR 01 GOTA NO OLHO PARALISADO DE 2/2H DURANTE O DIA (MAIS VEZES SE ARDER), ENQUANTO O OLHO NÃO FECHAR COMPLETAMENTE",
      "USO TÓPICO"
     ],
     [
      "DEXPANTENOL 50 MG/G GEL OFTÁLMICO",
      "01 BISNAGA",
      "APLICAR 01 GOTA DO GEL NO OLHO DO LADO PARALISADO À NOITE, ANTES DE DORMIR, E FECHAR A PÁLPEBRA COM FITA MICROPORE (SEM APERTAR O OLHO)",
      "USO TÓPICO"
     ]
    ],
    "orient": [
     "PRATICAR FISIOTERAPIA FACIAL SEMPRE QUE POSSÍVEL: FAZER CARETAS, BIQUINHOS, ASSOPRAR, FECHAR OS OLHOS COM FORÇA, FALAR NORMALMENTE... – PROCURAR UM PROFISSIONAL DE FISIOTERAPIA OU DE FONOAUDIOLOGIA EM CASO DE DIFICULDADE"
    ]
   },
   {
    "label": "Síndrome de Ramsay Hunt (zoster ótico): aciclovir em dose de zoster + prednisona + proteção ocular",
    "sec": "offlabel",
    "items": [
     [
      "ACICLOVIR 400 MG",
      "70 COMPRIMIDOS",
      "TOMAR 02 COMPRIMIDOS DE 4/4H, EXCETUANDO-SE UMA DOSE NOTURNA, POR 07 DIAS SEGUIDOS HORÁRIO SUGERIDO: 06:00 – 10:00 – 14:00 – 18:00 – 22:00"
     ],
     [
      "PREDNISONA 20 MG",
      "23 COMPRIMIDOS",
      "TOMAR 03 COMPRIMIDOS (60 MG) PELA MANHÃ, APÓS O CAFÉ, POR 05 DIAS; DEPOIS, 02 COMPRIMIDOS PELA MANHÃ POR 03 DIAS; DEPOIS, 01 COMPRIMIDO PELA MANHÃ POR 02 DIAS"
     ],
     [
      "LÁCRIMA PLUS®",
      "01 FRASCO",
      "PINGAR 01 GOTA NO OLHO PARALISADO DE 2/2H DURANTE O DIA (MAIS VEZES SE ARDER), ENQUANTO O OLHO NÃO FECHAR COMPLETAMENTE",
      "USO TÓPICO"
     ],
     [
      "DEXPANTENOL 50 MG/G GEL OFTÁLMICO",
      "01 BISNAGA",
      "APLICAR 01 GOTA DO GEL NO OLHO DO LADO PARALISADO À NOITE, ANTES DE DORMIR, E FECHAR A PÁLPEBRA COM FITA MICROPORE (SEM APERTAR O OLHO)",
      "USO TÓPICO"
     ]
    ],
    "orient": [
     "PRATICAR FISIOTERAPIA FACIAL SEMPRE QUE POSSÍVEL: FAZER CARETAS, BIQUINHOS, ASSOPRAR, FECHAR OS OLHOS COM FORÇA, FALAR NORMALMENTE... – PROCURAR UM PROFISSIONAL DE FISIOTERAPIA OU DE FONOAUDIOLOGIA EM CASO DE DIFICULDADE"
    ]
   },
   {
    "label": "Padrão — criança (< 16 anos): proteção ocular; corticoide sem benefício comprovado",
    "mode": "ped",
    "draft": true,
    "items": [
     [
      "CARMELOSE SÓDICA 5 MG/ML COLÍRIO (LÁGRIMA ARTIFICIAL)",
      "01 FRASCO",
      "PINGAR 01 GOTA NO OLHO DO LADO PARALISADO DE 2/2H DURANTE O DIA, ENQUANTO O OLHO NÃO FECHAR COMPLETAMENTE",
      "USO TÓPICO"
     ],
     [
      "DEXPANTENOL 50 MG/G GEL OFTÁLMICO",
      "01 BISNAGA",
      "APLICAR 01 GOTA DO GEL NO OLHO DO LADO PARALISADO À NOITE, ANTES DE DORMIR, E FECHAR A PÁLPEBRA COM FITA MICROPORE (SEM APERTAR O OLHO)",
      "USO TÓPICO"
     ]
    ],
    "orient": [
     "NA CRIANÇA A RECUPERAÇÃO ESPONTÂNEA É A REGRA; O ESTUDO CONTROLADO NÃO MOSTROU BENEFÍCIO DA PREDNISOLONA — NÃO HÁ INDICAÇÃO DE CORTICOIDE OU ANTIVIRAL DE ROTINA",
     "PROTEGER O OLHO DO LADO PARALISADO: COLÍRIO LUBRIFICANTE DE DIA, GEL À NOITE E PÁLPEBRA FECHADA COM FITA AO DORMIR",
     "EXAMINAR O OUVIDO (OTITE MÉDIA AGUDA, VESÍCULAS) E PERGUNTAR POR PICADA DE CARRAPATO; OTITE COM PARALISIA FACIAL PEDE AVALIAÇÃO DO OTORRINO",
     "RETORNAR IMEDIATAMENTE SE FRAQUEZA EM BRAÇO OU PERNA, FALA ENROLADA, BOLHAS NA ORELHA, OLHO VERMELHO OU DOLORIDO OU PIORA DA PARALISIA; REAVALIAR EM 1 A 2 SEMANAS"
    ]
   }
  ]
 },
 {
  "id": "parasitoses",
  "ic": "🐛",
  "nm": "Parasitoses intestinais",
  "sub": "albendazol · ivermectina · secnidazol",
  "blocks": [
   {
    "label": "Padrão — helmintíases (tratamento empírico): albendazol 03 dias",
    "draft": true,
    "items": [
     [
      "ALBENDAZOL 400 MG",
      "03 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO AO DIA POR 03 DIAS SEGUIDOS, NO MESMO HORÁRIO"
     ]
    ],
    "orient": [
     "LAVAR AS MÃOS COM ÁGUA E SABÃO ANTES DAS REFEIÇÕES E APÓS USAR O BANHEIRO E MANTER AS UNHAS CURTAS; SE COCEIRA ANAL À NOITE (OXIURÍASE), TRATAR TODOS OS MORADORES DA CASA E LAVAR ROUPAS DE CAMA E TOALHAS",
     "BEBER ÁGUA FILTRADA OU FERVIDA, LAVAR BEM FRUTAS E VERDURAS (DEIXAR DE MOLHO EM ÁGUA COM HIPOCLORITO) E NÃO ANDAR DESCALÇO",
     "SE OS SINTOMAS PERSISTIREM, REALIZAR EXAME PARASITOLÓGICO DE FEZES (03 AMOSTRAS) E RETORNAR À UBS",
     "RETORNAR IMEDIATAMENTE SE DIARREIA COM SANGUE, FEBRE ALTA, VÔMITOS PERSISTENTES, SINAIS DE DESIDRATAÇÃO (BOCA SECA, POUCA URINA, TONTURA) OU DOR ABDOMINAL INTENSA"
    ]
   },
   {
    "label": "Padrão — estrongiloidíase ou risco (antes de corticoide/imunossupressão): associar ivermectina",
    "draft": true,
    "items": [
     [
      "IVERMECTINA 06 MG",
      "02 A 03 COMPRIMIDOS (CONFORME PESO)",
      "TOMAR EM DOSE ÚNICA, EM JEJUM (200 MCG/KG): {FAIXA}. IMUNOSSUPRIMIDO PODE PRECISAR REPETIR (FORMA GRAVE: VER INTERNAÇÃO)",
      "USO ORAL",
      {
       "sem_peso": "15 A 24 KG = 1/2 COMPRIMIDO; 25 A 35 KG = 01; 36 A 50 KG = 1 1/2; 51 A 65 KG = 02; 66 A 79 KG = 2 1/2; 80 A 89 KG = 03; ≥ 90 KG = 200 MCG/KG",
       "faixas": [
        {
         "de": 15,
         "menor": 25,
         "txt": "1/2 COMPRIMIDO"
        },
        {
         "de": 25,
         "menor": 36,
         "txt": "01 COMPRIMIDO"
        },
        {
         "de": 36,
         "menor": 51,
         "txt": "1 1/2 COMPRIMIDO"
        },
        {
         "de": 51,
         "menor": 66,
         "txt": "02 COMPRIMIDOS"
        },
        {
         "de": 66,
         "menor": 80,
         "txt": "2 1/2 COMPRIMIDOS"
        },
        {
         "de": 80,
         "menor": 90,
         "txt": "03 COMPRIMIDOS"
        },
        {
         "de": 90,
         "txt": "{=P*0.2/6} COMPRIMIDOS (200 MCG/KG — ARREDONDAR PARA MEIO COMPRIMIDO)"
        }
       ]
      }
     ]
    ]
   },
   {
    "label": "Padrão — giardíase / amebíase intestinal: secnidazol dose única",
    "draft": true,
    "items": [
     [
      "SECNIDAZOL 1000 MG",
      "02 COMPRIMIDOS",
      "TOMAR OS 02 COMPRIMIDOS EM DOSE ÚNICA"
     ]
    ],
    "orient": [
     "NÃO INGERIR BEBIDAS ALCOÓLICAS DURANTE O TRATAMENTO E ATÉ 04 DIAS APÓS O SECNIDAZOL"
    ]
   },
   {
    "label": "Opção 2 — oxiuríase: albendazol dose única, repetir após 02 semanas",
    "sec": "offlabel",
    "items": [
     [
      "ALBENDAZOL 400 MG",
      "02 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO EM DOSE ÚNICA E REPETIR APÓS 02 SEMANAS (14 DIAS). TRATAR TODOS OS MORADORES DA CASA"
     ]
    ]
   },
   {
    "label": "Opção 3 — helmintíase com oxiúros na casa: albendazol 03 dias e nova dose após 02 semanas",
    "sec": "offlabel",
    "items": [
     [
      "ALBENDAZOL 400 MG",
      "04 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO AO DIA POR 03 DIAS SEGUIDOS E, APÓS 02 SEMANAS, MAIS 01 COMPRIMIDO EM DOSE ÚNICA (OXIURÍASE)"
     ]
    ]
   },
   {
    "label": "Opção 4 — giardíase (alternativa ao nitroimidazol): albendazol 05 dias",
    "sec": "offlabel",
    "items": [
     [
      "ALBENDAZOL 400 MG",
      "05 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO AO DIA POR 05 DIAS SEGUIDOS, NO MESMO HORÁRIO"
     ]
    ]
   },
   {
    "label": "Opção 7 — giardíase, amebíase intestinal ou criptosporidiose: nitazoxanida 03 dias",
    "sec": "offlabel",
    "items": [
     [
      "NITAZOXANIDA 500 MG",
      "06 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO DE 12/12 HORAS POR 03 DIAS SEGUIDOS HORÁRIO SUGERIDO (12/12H): 08:00 / 20:00"
     ]
    ]
   },
   {
    "label": "Opção 8 — esquistossomose mansônica: praziquantel 50 mg/kg dose única",
    "sec": "offlabel",
    "items": [
     [
      "PRAZIQUANTEL 500 MG",
      "07 COMPRIMIDOS",
      "TOMAR OS 07 COMPRIMIDOS DE UMA VEZ (DOSE ÚNICA), APÓS UMA REFEIÇÃO — 50 MG/KG, CALCULADO PARA 70 KG; AJUSTAR AO PESO: 01 COMPRIMIDO PARA CADA 10 KG"
     ]
    ]
   },
   {
    "label": "Opção 9 — teníase: praziquantel dose única (5 a 10 mg/kg)",
    "sec": "offlabel",
    "items": [
     [
      "PRAZIQUANTEL 500 MG",
      "01 COMPRIMIDO",
      "TOMAR 01 COMPRIMIDO EM DOSE ÚNICA, APÓS UMA REFEIÇÃO (5 A 10 MG/KG — ADULTO DE 50 A 100 KG). SE CONVULSÃO OU DOR DE CABEÇA NOVA, INVESTIGAR NEUROCISTICERCOSE ANTES DE TRATAR"
     ]
    ]
   },
   {
    "label": "Analgésico/antitérmico se dor ou febre — escolha 1",
    "sec": "offlabel",
    "menu": true,
    "items": [
     [
      "DIPIRONA 500 MG",
      "01 CAIXA",
      "TOMAR 02 COMPRIMIDOS VO SE FEBRE OU DOR, PODENDO REPETIR DE 6/6H"
     ],
     [
      "PARACETAMOL 750 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO SE DOR OU FEBRE, PODENDO REPETIR DE 6/6H. INTERCALAR COM DIPIRONA, SE NECESSÁRIO."
     ]
    ]
   },
   {
    "label": "Antiemético se náuseas — escolha 1",
    "sec": "offlabel",
    "menu": true,
    "items": [
     [
      "METOCLOPRAMIDA 10 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO SE NÁUSEAS OU VÔMITOS, PODENDO REPETIR DE 8/8H"
     ],
     [
      "ONDANSETRONA 8 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO SE NÁUSEAS OU VÔMITOS, PODENDO REPETIR DE 8/8H"
     ]
    ]
   },
   {
    "label": "Padrão — ascaridíase complicada (suboclusão intestinal ou biliar): suporte clínico e anti-helmíntico após resolução",
    "mode": "internacao",
    "draft": true,
    "items": [
     [
      "CLORETO DE SÓDIO 0,9% (SORO FISIOLÓGICO)",
      "01 BOLSA 500 ML",
      "INFUNDIR 500 ML EV EM 30 MINUTOS SE DESIDRATAÇÃO OU HIPOPERFUSÃO E REAVALIAR; DEPOIS, MANUTENÇÃO EV ENQUANTO EM DIETA ZERO, CONFORME DIURESE E ELETRÓLITOS",
      "USO ENDOVENOSO"
     ],
     [
      "ESCOPOLAMINA (BUTILBROMETO) 20 MG/ML SOLUÇÃO INJETÁVEL",
      "01 AMPOLA",
      "ADMINISTRAR 20 MG (01 AMPOLA) EV LENTO, ATÉ DE 8/8H SE CÓLICA",
      "USO ENDOVENOSO"
     ],
     [
      "DIPIRONA 500 MG/ML SOLUÇÃO INJETÁVEL (AMPOLA 2 ML)",
      "01 AMPOLA",
      "ADMINISTRAR 1 G (2 ML) EV, DILUÍDO EM 10 ML DE ÁGUA PARA INJETÁVEIS, LENTAMENTE, ATÉ DE 6/6H SE DOR OU FEBRE",
      "USO ENDOVENOSO"
     ],
     [
      "ONDANSETRONA 2 MG/ML SOLUÇÃO INJETÁVEL (AMPOLA 2 ML)",
      "01 AMPOLA",
      "ADMINISTRAR 4 MG (2 ML) EV LENTO, ATÉ DE 8/8H SE NÁUSEAS OU VÔMITOS",
      "USO ENDOVENOSO"
     ],
     [
      "ALBENDAZOL 400 MG",
      "01 COMPRIMIDO",
      "SOMENTE APÓS RESOLUÇÃO DA SUBOCLUSÃO E REINÍCIO DA DIETA: TOMAR 01 COMPRIMIDO VO 01 VEZ AO DIA POR 03 DIAS",
      "USO ORAL"
     ]
    ],
    "orient": [
     "DIETA ZERO E SONDA NASOGÁSTRICA ABERTA SE VÔMITOS OU DISTENSÃO; RX DE ABDOME E USG (BOLO DE ÁSCARIS, VIAS BILIARES); HEMOGRAMA, ELETRÓLITOS, FUNÇÃO RENAL, AMILASE/LIPASE E BILIRRUBINAS",
     "NÃO USAR PROCINÉTICO (METOCLOPRAMIDA) NEM ANTI-HELMÍNTICO DURANTE A OBSTRUÇÃO; INICIAR ALBENDAZOL APÓS ELIMINAÇÃO DE FLATOS/FEZES E BOA ACEITAÇÃO DA DIETA",
     "AVALIAÇÃO DA CIRURGIA GERAL: PERITONITE, PNEUMOPERITÔNIO, VOLVO/INTUSSUSCEPÇÃO OU AUSÊNCIA DE MELHORA EM 24-48H DE TRATAMENTO CONSERVADOR INDICAM CIRURGIA",
     "ASCARIDÍASE BILIAR: ANALGESIA, HIDRATAÇÃO E ALBENDAZOL; CPRE SE VERME PERSISTIR NA VIA BILIAR, COLANGITE (ASSOCIAR ANTIBIÓTICO) OU PANCREATITE",
     "MONITORAR SINAIS VITAIS, DIURESE, DISTENSÃO E DOR ABDOMINAL A CADA 04-06H"
    ]
   },
   {
    "label": "Padrão — estrongiloidíase grave (hiperinfecção/disseminada) ou em imunossuprimido: ivermectina diária",
    "mode": "internacao",
    "draft": true,
    "items": [
     [
      "IVERMECTINA 06 MG",
      "02 A 03 COMPRIMIDOS (CONFORME PESO)",
      "TOMAR 200 MCG/KG VO (OU PELA SONDA) 01 VEZ AO DIA: {FAIXA} — MANTER ATÉ 02 SEMANAS DE PESQUISA DE LARVAS NEGATIVA (FEZES/ESCARRO)",
      "USO ORAL",
      {
       "sem_peso": "36 A 50 KG = 1 1/2 COMPRIMIDO; 51 A 65 KG = 02 COMPRIMIDOS; 66 A 79 KG = 2 1/2 COMPRIMIDOS; ≥ 80 KG = 03 COMPRIMIDOS",
       "faixas": [
        {
         "de": 36,
         "menor": 51,
         "txt": "1 1/2 COMPRIMIDO"
        },
        {
         "de": 51,
         "menor": 66,
         "txt": "02 COMPRIMIDOS"
        },
        {
         "de": 66,
         "menor": 80,
         "txt": "2 1/2 COMPRIMIDOS"
        },
        {
         "de": 80,
         "txt": "03 COMPRIMIDOS"
        }
       ]
      }
     ]
    ],
    "orient": [
     "SUSPENDER OU REDUZIR AO MÍNIMO CORTICOIDES E IMUNOSSUPRESSORES; SOLICITAR SOROLOGIA PARA HTLV-1",
     "COLHER HEMOCULTURAS: A HIPERINFECÇÃO CURSA COM BACTEREMIA E MENINGITE POR GRAM-NEGATIVOS ENTÉRICOS — ASSOCIAR ANTIBIÓTICO DE AMPLO ESPECTRO SE FEBRE OU SEPSE",
     "PRECAUÇÕES DE CONTATO; AVALIAR INFECTOLOGIA E UTI SE INSUFICIÊNCIA RESPIRATÓRIA, ÍLEO OU CHOQUE"
    ]
   },
   {
    "label": "Amebíase invasiva (colite grave ou abscesso hepático): metronidazol EV seguido de agente luminal",
    "mode": "internacao",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "METRONIDAZOL 500 MG/100 ML SOLUÇÃO INJETÁVEL (BOLSA)",
      "01 BOLSA 100 ML",
      "ADMINISTRAR 500 MG EV DE 6/6H, EM 60 MINUTOS; PASSAR PARA 750 MG VO DE 8/8H QUANDO TOLERAR, COMPLETANDO 07 A 10 DIAS",
      "USO ENDOVENOSO"
     ],
     [
      "TECLOZANA 500 MG",
      "03 COMPRIMIDOS",
      "APÓS TERMINAR O METRONIDAZOL: TOMAR 01 COMPRIMIDO VO DE 12/12H, ATÉ COMPLETAR 03 COMPRIMIDOS (AGENTE LUMINAL, ERRADICA OS CISTOS)",
      "USO ORAL"
     ]
    ],
    "orient": [
     "USG/TC DE ABDOME, HEMOCULTURAS E SOROLOGIA PARA E. HISTOLYTICA; SE DÚVIDA COM ABSCESSO PIOGÊNICO, ASSOCIAR CEFTRIAXONA ATÉ DEFINIÇÃO",
     "DRENAGEM PERCUTÂNEA SE ABSCESSO GRANDE (> 10 CM), EM LOBO ESQUERDO, COM RISCO DE RUPTURA OU SEM RESPOSTA EM 72H",
     "COLITE FULMINANTE (MEGACÓLON TÓXICO, PERITONITE): DIETA ZERO, ANTIBIÓTICO DE AMPLO ESPECTRO E AVALIAÇÃO CIRÚRGICA; NÃO USAR ANTIDIARREICOS NEM CORTICOIDE"
    ]
   },
   {
    "label": "Neurocisticercose parenquimatosa com cistos viáveis (após neuroimagem e neurologia): albendazol + corticoide",
    "mode": "internacao",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "DEXAMETASONA 4 MG/ML SOLUÇÃO INJETÁVEL",
      "01 AMPOLA",
      "ADMINISTRAR 4 MG (01 ML) EV DE 12/12H (≈ 0,1 MG/KG/DIA), INICIAR 24-48H ANTES DO ALBENDAZOL, MANTER DURANTE TODO O TRATAMENTO E DEPOIS DESMAMAR (PODE PASSAR PARA VO)",
      "USO ENDOVENOSO"
     ],
     [
      "ALBENDAZOL 400 MG",
      "01 COMPRIMIDO",
      "TOMAR 01 COMPRIMIDO VO DE 12/12H, COM REFEIÇÃO GORDUROSA, POR 10 A 14 DIAS (15 MG/KG/DIA, MÁXIMO 1.200 MG/DIA)",
      "USO ORAL"
     ]
    ],
    "orient": [
     "NÃO USAR ANTIPARASITÁRIO SE HIPERTENSÃO INTRACRANIANA, HIDROCEFALIA NÃO TRATADA OU ENCEFALITE CISTICERCÓTICA (CORTICOIDE E NEUROCIRURGIA); CALCIFICAÇÕES ISOLADAS NÃO TÊM INDICAÇÃO; FUNDOSCOPIA ANTES DE INICIAR",
     "MAIS DE 02 CISTOS VIÁVEIS: ASSOCIAR PRAZIQUANTEL 50 MG/KG/DIA VO DIVIDIDO DE 8/8H PELO MESMO PERÍODO",
     "CRISES EPILÉPTICAS: ANTICONVULSIVANTE CONFORME NEUROLOGIA; TRATAR ESTRONGILOIDÍASE EMPIRICAMENTE (IVERMECTINA) ANTES DE CORTICOIDE PROLONGADO"
    ]
   },
   {
    "label": "Padrão — helmintíases (tratamento empírico): albendazol 03 dias",
    "mode": "ped",
    "draft": true,
    "items": [
     [
      "ALBENDAZOL 400 MG/10 ML SUSPENSÃO ORAL",
      "03 FRASCOS",
      "MAIORES DE 02 ANOS: DAR 10 ML (400 MG) VIA ORAL 01 VEZ AO DIA POR 03 DIAS SEGUIDOS; DE 01 A 02 ANOS: 5 ML (200 MG) 01 VEZ AO DIA POR 03 DIAS. NÃO USAR EM MENORES DE 01 ANO",
      "USO ORAL"
     ]
    ],
    "orient": [
     "LAVAR AS MÃOS DA CRIANÇA COM ÁGUA E SABÃO ANTES DAS REFEIÇÕES E APÓS USAR O BANHEIRO, MANTER AS UNHAS CURTAS, BEBER ÁGUA FILTRADA OU FERVIDA, LAVAR BEM FRUTAS E VERDURAS E NÃO ANDAR DESCALÇO",
     "OXIURÍASE (COCEIRA ANAL À NOITE): REPETIR O ALBENDAZOL (DOSE ÚNICA) APÓS 02 SEMANAS, TRATAR TODOS OS MORADORES DA CASA E LAVAR ROUPAS DE CAMA E TOALHAS",
     "SE OS SINTOMAS PERSISTIREM, REALIZAR EXAME PARASITOLÓGICO DE FEZES (03 AMOSTRAS) E RETORNAR À UBS",
     "RETORNAR IMEDIATAMENTE SE VÔMITOS PERSISTENTES, BARRIGA DISTENDIDA OU DOR ABDOMINAL INTENSA (RISCO DE SUBOCLUSÃO POR ÁSCARIS), DIARREIA COM SANGUE, FEBRE ALTA OU SINAIS DE DESIDRATAÇÃO"
    ]
   },
   {
    "label": "Padrão — estrongiloidíase ou risco (≥ 15 kg; antes de corticoide/imunossupressão): associar ivermectina",
    "peso": {
     "de": 15
    },
    "mode": "ped",
    "draft": true,
    "items": [
     [
      "IVERMECTINA 06 MG",
      "01 A 02 COMPRIMIDOS (CONFORME PESO)",
      "DAR {DOSE} VIA ORAL EM DOSE ÚNICA, EM JEJUM (200 MCG/KG/DOSE) — EM COMPRIMIDOS DE 6 MG (BULA): {FAIXA}. NÃO USAR EM CRIANÇAS COM MENOS DE 15 KG",
      "USO ORAL",
      {
       "kg": 200,
       "un": "MCG",
       "sem_peso": "15 A 24 KG = 1/2; 25 A 35 KG = 01; 36 A 50 KG = 1 1/2; 51 A 65 KG = 02",
       "faixas": [
        {
         "de": 15,
         "menor": 25,
         "txt": "1/2 COMPRIMIDO"
        },
        {
         "de": 25,
         "menor": 36,
         "txt": "01 COMPRIMIDO"
        },
        {
         "de": 36,
         "menor": 51,
         "txt": "1 1/2 COMPRIMIDO"
        },
        {
         "de": 51,
         "menor": 66,
         "txt": "02 COMPRIMIDOS"
        }
       ]
      }
     ]
    ]
   },
   {
    "label": "Padrão — giardíase / amebíase intestinal: secnidazol dose única",
    "mode": "ped",
    "draft": true,
    "items": [
     [
      "SECNIDAZOL 30 MG/ML PÓ PARA SUSPENSÃO ORAL",
      "01 FRASCO",
      "DAR {DOSE} VIA ORAL EM DOSE ÚNICA, APÓS UMA REFEIÇÃO, DE PREFERÊNCIA À NOITE (30 MG/KG, MÁXIMO 2 G)",
      "USO ORAL",
      {
       "kg": 30,
       "conc": 30,
       "un": "ML",
       "max": 2000
      }
     ]
    ]
   },
   {
    "label": "Giardíase/amebíase intestinal — alternativas ao secnidazol — escolha 1",
    "mode": "ped",
    "sec": "offlabel",
    "draft": true,
    "menu": true,
    "items": [
     [
      "NITAZOXANIDA 20 MG/ML PÓ PARA SUSPENSÃO ORAL",
      "01 FRASCO",
      "DAR {DOSE} VIA ORAL DE 12/12H, JUNTO ÀS REFEIÇÕES, POR 03 DIAS (7,5 MG/KG/DOSE) — A PARTIR DE 01 ANO",
      "USO ORAL",
      {
       "kg": 7.5,
       "conc": 20,
       "un": "ML",
       "max": 500
      }
     ],
     [
      "METRONIDAZOL 40 MG/ML SUSPENSÃO ORAL",
      "01 FRASCO",
      "GIARDÍASE: DAR {DOSE} VIA ORAL DE 8/8H POR 05 A 07 DIAS (15 MG/KG/DIA)",
      "USO ORAL",
      {
       "kgdia": 15,
       "vezes": 3,
       "conc": 40,
       "un": "ML",
       "max": 250
      }
     ],
     [
      "METRONIDAZOL 40 MG/ML SUSPENSÃO ORAL",
      "01 FRASCO",
      "AMEBÍASE INTESTINAL SINTOMÁTICA: DAR {DOSE} VIA ORAL DE 8/8H POR 07 A 10 DIAS (35 MG/KG/DIA)",
      "USO ORAL",
      {
       "kgdia": 35,
       "vezes": 3,
       "conc": 40,
       "un": "ML",
       "max": 750
      }
     ]
    ],
    "orient": [
     "OFERECER SORO DE REIDRATAÇÃO ORAL SE DIARREIA; RETORNAR SE DIARREIA COM SANGUE, FEBRE ALTA, VÔMITOS INCOERCÍVEIS OU SINAIS DE DESIDRATAÇÃO"
    ]
   },
   {
    "label": "Alternativa ao albendazol: mebendazol 03 dias (a partir de 01 ano)",
    "mode": "ped",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "MEBENDAZOL 100 MG/5 ML SUSPENSÃO ORAL",
      "01 FRASCO",
      "DAR 5 ML (100 MG) VIA ORAL DE 12/12H POR 03 DIAS SEGUIDOS, INDEPENDENTE DO PESO; OXIURÍASE: 5 ML EM DOSE ÚNICA E REPETIR APÓS 02 SEMANAS",
      "USO ORAL"
     ]
    ]
   },
   {
    "label": "Do material do Drive — Giardíase: alternativas ao secnidazol — escolha 1",
    "sec": "offlabel",
    "draft": true,
    "menu": true,
    "items": [
     [
      "TINIDAZOL 500 MG",
      "04 COMPRIMIDOS",
      "TOMAR OS 04 COMPRIMIDOS (2 G) EM DOSE ÚNICA, DURANTE OU APÓS UMA REFEIÇÃO. NÃO INGERIR BEBIDA ALCOÓLICA DURANTE O TRATAMENTO E ATÉ 03 DIAS DEPOIS",
      "USO ORAL"
     ],
     [
      "METRONIDAZOL 250 MG",
      "21 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO DE 8/8H POR 07 DIAS (GIARDÍASE). NÃO INGERIR BEBIDA ALCOÓLICA DURANTE O TRATAMENTO E ATÉ 02 DIAS DEPOIS",
      "USO ORAL"
     ]
    ]
   },
   {
    "label": "Do material do Drive — Mebendazol comprimido (alternativa ao albendazol)",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "MEBENDAZOL 100 MG",
      "06 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO DE 12/12H POR 03 DIAS SEGUIDOS. OXIURÍASE: 01 COMPRIMIDO EM DOSE ÚNICA E REPETIR APÓS 02 SEMANAS",
      "USO ORAL"
     ]
    ]
   }
  ]
 },
 {
  "id": "pielonefrite",
  "ic": "🫘",
  "nm": "Pielonefrite",
  "sub": "ceftriaxona · ciprofloxacino",
  "blocks": [
   {
    "label": "Padrão — ceftriaxona dose única + ciprofloxacino 07 dias (homem: 14 dias, ver Outras opções)",
    "draft": true,
    "items": [
     [
      "CEFTRIAXONA 1 G",
      "01 FRASCO-AMPOLA",
      "ADMINISTRAR 1 G IM EM DOSE ÚNICA NA UNIDADE, ANTES DA ALTA (DILUIR EM LIDOCAÍNA 1% SEM VASOCONSTRITOR)",
      "USO INTRAMUSCULAR"
     ],
     [
      "CIPROFLOXACINO 500 MG",
      "14 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO DE 12/12H POR 07 DIAS SEGUIDOS HORÁRIO SUGERIDO: 08:00 / 20:00"
     ],
     [
      "DIPIRONA 500 MG",
      "01 CAIXA",
      "TOMAR 02 COMPRIMIDOS SE DOR OU FEBRE, PODENDO REPETIR DE 6/6H"
     ],
     [
      "METOCLOPRAMIDA 10 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO SE NÁUSEAS OU VÔMITOS, PODENDO REPETIR DE 8/8H, POR NO MÁXIMO 05 DIAS"
     ]
    ],
    "orient": [
     "SOLICITO: UROCULTURA COM ANTIBIOGRAMA (COLHER ANTES DA PRIMEIRA DOSE DO ANTIBIÓTICO)",
     "REAVALIAR EM 48 A 72 HORAS COM O RESULTADO DA UROCULTURA PARA AJUSTAR O ANTIBIÓTICO",
     "MANTER BOA HIDRATAÇÃO ORAL",
     "SE NÃO HOUVER MELHORA EM 72 HORAS: SOLICITAR USG DE RINS E VIAS URINÁRIAS",
     "RETORNAR IMEDIATAMENTE SE FEBRE PERSISTENTE APÓS 72 HORAS, VÔMITOS QUE IMPEÇAM TOMAR O REMÉDIO, PIORA DA DOR, TONTURA OU DESMAIO, CONFUSÃO OU DIMINUIÇÃO DA URINA"
    ]
   },
   {
    "label": "Opção 1 — alternativa ao ciprofloxacino (mulher): levofloxacino 750 mg por 05 dias",
    "sec": "offlabel",
    "items": [
     [
      "LEVOFLOXACINO 750 MG",
      "05 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO UMA VEZ AO DIA, NO MESMO HORÁRIO, POR 05 DIAS SEGUIDOS"
     ]
    ]
   },
   {
    "label": "Padrão — ceftriaxona 2 g EV 01 vez ao dia + sintomáticos",
    "mode": "internacao",
    "draft": true,
    "items": [
     [
      "CEFTRIAXONA 1 G PÓ PARA SOLUÇÃO INJETÁVEL",
      "02 FRASCOS-AMPOLA",
      "ADMINISTRAR 2 G EV 01 VEZ AO DIA, RECONSTITUINDO CADA FRASCO EM 10 ML DE ÁGUA PARA INJETÁVEIS E DILUINDO OS 2 G EM 100 ML DE SF 0,9%, EM 30 MINUTOS",
      "USO ENDOVENOSO"
     ],
     [
      "DIPIRONA 500 MG/ML SOLUÇÃO INJETÁVEL (AMPOLA 2 ML)",
      "01 AMPOLA",
      "ADMINISTRAR 1 G (2 ML) EV, DILUÍDO EM 10 ML DE ÁGUA PARA INJETÁVEIS, LENTAMENTE, ATÉ DE 6/6H SE DOR OU FEBRE",
      "USO ENDOVENOSO"
     ],
     [
      "ONDANSETRONA 2 MG/ML SOLUÇÃO INJETÁVEL (AMPOLA 2 ML)",
      "01 AMPOLA",
      "ADMINISTRAR 4 MG (2 ML) EV LENTO, ATÉ DE 8/8H SE NÁUSEAS OU VÔMITOS",
      "USO ENDOVENOSO"
     ],
     [
      "CLORETO DE SÓDIO 0,9% (SORO FISIOLÓGICO)",
      "01 BOLSA 500 ML",
      "INFUNDIR 500 ML EV EM 30 MINUTOS SE DESIDRATAÇÃO OU HIPOTENSÃO E REAVALIAR; DEPOIS, MANUTENÇÃO EV SOMENTE ENQUANTO A ACEITAÇÃO ORAL FOR INADEQUADA, CONFORME DIURESE",
      "USO ENDOVENOSO"
     ]
    ],
    "orient": [
     "COLHER UROCULTURA COM ANTIBIOGRAMA E 02 PARES DE HEMOCULTURAS ANTES DA 1ª DOSE; HEMOGRAMA, CREATININA, ELETRÓLITOS E PCR; LACTATO SE SINAIS DE SEPSE; BETA-HCG EM MULHER EM IDADE FÉRTIL",
     "USG DE RINS E VIAS URINÁRIAS (OU TC) EM ATÉ 24H SE SEPSE, SUSPEITA DE OBSTRUÇÃO/CÁLCULO, RIM ÚNICO OU SEM MELHORA EM 48-72H — OBSTRUÇÃO INFECTADA EXIGE DESOBSTRUÇÃO URGENTE (UROLOGIA)",
     "MONITORAR SINAIS VITAIS, CURVA TÉRMICA E DIURESE; SEPSE (PAS < 90 MMHG, LACTATO ≥ 2, CONFUSÃO, OLIGÚRIA): EXPANSÃO COM CRISTALOIDE 30 ML/KG, TROCAR PARA ESQUEMA DE AMPLO ESPECTRO E AVALIAR UTI",
     "TRANSIÇÃO PARA VIA ORAL QUANDO AFEBRIL, ESTÁVEL E ACEITANDO DIETA, GUIADA PELO ANTIBIOGRAMA; DURAÇÃO TOTAL DE 07 DIAS (FLUOROQUINOLONA 05 A 07 DIAS) SE BOA RESPOSTA — HOMEM: 14 DIAS",
     "AVALIAR PROFILAXIA DE TEV CONFORME RISCO (PADUA ≥ 4); GESTANTE: SEMPRE INTERNAR, EVITAR FLUOROQUINOLONA E AMINOGLICOSÍDEO"
    ]
   },
   {
    "label": "Sepse/choque séptico ou risco de germe multirresistente (ESBL) — escolha 1",
    "mode": "internacao",
    "sec": "offlabel",
    "draft": true,
    "menu": true,
    "items": [
     [
      "PIPERACILINA 4 G + TAZOBACTAM 500 MG PÓ PARA SOLUÇÃO INJETÁVEL",
      "01 FRASCO-AMPOLA",
      "ADMINISTRAR 4,5 G EV DE 6/6H, DILUÍDO EM 100 ML DE SF 0,9%, EM 30 MINUTOS (OU INFUSÃO ESTENDIDA EM 03 A 04H, CONFORME PROTOCOLO) — SEPSE SEM RISCO DE ESBL",
      "USO ENDOVENOSO"
     ],
     [
      "MEROPENEM 1 G PÓ PARA SOLUÇÃO INJETÁVEL",
      "01 FRASCO-AMPOLA",
      "ADMINISTRAR 1 G EV DE 8/8H, DILUÍDO EM 100 ML DE SF 0,9%, EM 30 MINUTOS (OU INFUSÃO ESTENDIDA EM 03H) — CHOQUE SÉPTICO OU RISCO DE ESBL",
      "USO ENDOVENOSO"
     ]
    ],
    "orient": [
     "RISCO DE ESBL: ANTIBIÓTICO OU INTERNAÇÃO NOS ÚLTIMOS 90 DIAS, UROCULTURA PRÉVIA COM ESBL, SONDA VESICAL OU PROCEDIMENTO UROLÓGICO RECENTE, INSTITUCIONALIZADO",
     "AJUSTAR DOSES PELA FUNÇÃO RENAL E DESCALONAR EM 48-72H CONFORME CULTURAS"
    ]
   },
   {
    "label": "Alergia grave (anafilaxia) a betalactâmicos — escolha 1",
    "mode": "internacao",
    "sec": "offlabel",
    "draft": true,
    "menu": true,
    "items": [
     [
      "CIPROFLOXACINO 400 MG/200 ML SOLUÇÃO INJETÁVEL (BOLSA)",
      "01 BOLSA 200 ML",
      "ADMINISTRAR 400 MG EV DE 12/12H, EM 60 MINUTOS",
      "USO ENDOVENOSO"
     ],
     [
      "AMICACINA 250 MG/ML SOLUÇÃO INJETÁVEL (AMPOLA 2 ML)",
      "01 A 03 AMPOLAS (CONFORME DOSE)",
      "ADMINISTRAR {DOSE} EV 01 VEZ AO DIA, DILUÍDO EM 100 ML DE SF 0,9%, EM 30 A 60 MINUTOS (15 MG/KG/DOSE; USAR PESO AJUSTADO SE OBESO) — AJUSTAR INTERVALO PELA FUNÇÃO RENAL",
      "USO ENDOVENOSO",
      {
       "kg": 15,
       "un": "MG",
       "max": 1500
      }
     ]
    ],
    "orient": [
     "CEFTRIAXONA PODE SER USADA NA MAIORIA DOS ALÉRGICOS À PENICILINA (CADEIA LATERAL DIFERENTE) — RESERVAR ESTE BLOCO PARA ANAFILAXIA A CEFALOSPORINA OU ALERGIA GRAVE NÃO ESCLARECIDA",
     "FLUOROQUINOLONA: EVITAR SE USO NOS ÚLTIMOS 12 MESES OU RESISTÊNCIA PRÉVIA; AMINOGLICOSÍDEO: EVITAR EM DOENÇA RENAL, IDOSOS E GESTANTES — MONITORAR CREATININA"
    ]
   },
   {
    "label": "Transição para via oral (afebril e estável, conforme antibiograma) — escolha 1",
    "mode": "internacao",
    "sec": "offlabel",
    "draft": true,
    "menu": true,
    "items": [
     [
      "CIPROFLOXACINO 500 MG",
      "01 COMPRIMIDO",
      "TOMAR 01 COMPRIMIDO VO DE 12/12H, COMPLETANDO 07 DIAS DE TRATAMENTO TOTAL (EV + VO)",
      "USO ORAL"
     ],
     [
      "SULFAMETOXAZOL + TRIMETOPRIMA 800 MG + 160 MG",
      "01 COMPRIMIDO",
      "TOMAR 01 COMPRIMIDO VO DE 12/12H, COMPLETANDO 07 DIAS DE TRATAMENTO TOTAL (EV + VO) — SOMENTE SE SENSÍVEL NO ANTIBIOGRAMA",
      "USO ORAL"
     ],
     [
      "CEFUROXIMA 500 MG",
      "01 COMPRIMIDO",
      "TOMAR 01 COMPRIMIDO VO DE 12/12H, APÓS AS REFEIÇÕES, COMPLETANDO 07 DIAS DE TRATAMENTO TOTAL (EV + VO) — SE SENSÍVEL",
      "USO ORAL"
     ]
    ]
   },
   {
    "label": "Padrão — ceftriaxona EV 01 vez ao dia (≥ 28 dias de vida)",
    "mode": "ped_internacao",
    "draft": true,
    "items": [
     [
      "CEFTRIAXONA 1 G PÓ PARA SOLUÇÃO INJETÁVEL",
      "01 FRASCO-AMPOLA",
      "ADMINISTRAR {DOSE} EV 01 VEZ AO DIA, DILUÍDO EM SF 0,9%, EM 30 MINUTOS (75 MG/KG/DIA) — SE SEM ACESSO VENOSO, PODE SER IM",
      "USO ENDOVENOSO",
      {
       "kg": 75,
       "un": "MG",
       "max": 2000
      }
     ]
    ],
    "orient": [
     "COLHER UROCULTURA POR CATETERISMO VESICAL OU PUNÇÃO SUPRAPÚBICA (NÃO USAR SACO COLETOR PARA CULTURA) ANTES DA 1ª DOSE; HEMOCULTURA SE < 03 MESES OU TOXEMIADO",
     "VIA EV/INTERNAÇÃO SE < 03 MESES, TOXEMIA OU SEPSE, VÔMITOS OU RECUSA ORAL, DESIDRATAÇÃO, UROPATIA CONHECIDA OU FALHA DO TRATAMENTO ORAL EM 48H; NÃO USAR CEFTRIAXONA EM < 28 DIAS COM ICTERÍCIA OU COM SOLUÇÃO EV CONTENDO CÁLCIO",
     "MONITORAR TEMPERATURA, DIURESE, HIDRATAÇÃO E ACEITAÇÃO; FEBRE PERSISTENTE APÓS 48H: REVER UROCULTURA E SOLICITAR USG (ABSCESSO/OBSTRUÇÃO)",
     "TRANSIÇÃO PARA VIA ORAL APÓS 24-48H AFEBRIL E ACEITANDO, CONFORME ANTIBIOGRAMA; DURAÇÃO TOTAL DE 07 A 10 DIAS (EV + VO)",
     "USG DE RINS E VIAS URINÁRIAS APÓS O 1º EPISÓDIO DE ITU FEBRIL EM < 02 ANOS; UROCISTOGRAFIA MICCIONAL SE USG ALTERADA OU ITU FEBRIL RECORRENTE"
    ]
   },
   {
    "label": "Padrão — antitérmico/analgésico — escolha 1",
    "mode": "ped_internacao",
    "draft": true,
    "menu": true,
    "items": [
     [
      "DIPIRONA 500 MG/ML SOLUÇÃO ORAL (GOTAS)",
      "01 FRASCO",
      "DAR {DOSE} VIA ORAL DE 6/6H SE DOR OU FEBRE (15 MG/KG/DOSE) — NÃO USAR EM MENORES DE 03 MESES OU COM MENOS DE 5 KG",
      "USO ORAL",
      {
       "kg": 15,
       "conc": 500,
       "gotas": 20,
       "un": "GOTAS",
       "max": 1000
      }
     ],
     [
      "PARACETAMOL 200 MG/ML SOLUÇÃO ORAL (GOTAS)",
      "01 FRASCO",
      "DAR {DOSE} VIA ORAL ATÉ DE 6/6H SE DOR OU FEBRE (15 MG/KG/DOSE) — CÁLCULO PARA 15 GOTAS/ML: CONFERIR O GOTEJADOR DO FABRICANTE",
      "USO ORAL",
      {
       "kg": 15,
       "conc": 200,
       "gotas": 15,
       "un": "GOTAS",
       "max": 750
      }
     ]
    ]
   },
   {
    "label": "Transição para via oral (afebril 24-48h, conforme antibiograma) — escolha 1",
    "mode": "ped_internacao",
    "sec": "offlabel",
    "draft": true,
    "menu": true,
    "items": [
     [
      "CEFALEXINA 250 MG/5 ML SUSPENSÃO ORAL",
      "01 FRASCO",
      "DAR {DOSE} VIA ORAL DE 6/6H, COMPLETANDO 07 A 10 DIAS DE TRATAMENTO TOTAL (100 MG/KG/DIA)",
      "USO ORAL",
      {
       "kgdia": 100,
       "vezes": 4,
       "conc": 50,
       "un": "ML",
       "max": 1000
      }
     ],
     [
      "CEFUROXIMA 250 MG/5 ML SUSPENSÃO ORAL",
      "01 FRASCO",
      "DAR {DOSE} VIA ORAL DE 12/12H, APÓS AS REFEIÇÕES, COMPLETANDO 07 A 10 DIAS DE TRATAMENTO TOTAL (30 MG/KG/DIA)",
      "USO ORAL",
      {
       "kgdia": 30,
       "vezes": 2,
       "conc": 50,
       "un": "ML",
       "max": 500
      }
     ],
     [
      "SULFAMETOXAZOL + TRIMETOPRIMA 200 MG + 40 MG/5 ML SUSPENSÃO ORAL",
      "01 FRASCO",
      "DAR {DOSE} VIA ORAL DE 12/12H, COMPLETANDO 07 A 10 DIAS DE TRATAMENTO TOTAL (8 MG/KG/DIA DE TRIMETOPRIMA) — SOMENTE SE SENSÍVEL; NÃO USAR EM < 02 MESES",
      "USO ORAL",
      {
       "kgdia": 8,
       "vezes": 2,
       "conc": 8,
       "un": "ML",
       "max": 160
      }
     ]
    ]
   },
   {
    "label": "Neonato (< 28 dias): ampicilina + gentamicina EV",
    "mode": "ped_internacao",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "AMPICILINA SÓDICA 500 MG PÓ PARA SOLUÇÃO INJETÁVEL",
      "01 FRASCO-AMPOLA",
      "ADMINISTRAR {DOSE} EV DE 8/8H SE ≤ 07 DIAS DE VIDA OU DE 6/6H SE 08 A 28 DIAS, EM 15 A 30 MINUTOS (50 MG/KG/DOSE)",
      "USO ENDOVENOSO",
      {
       "kg": 50,
       "un": "MG",
       "max": 2000
      }
     ],
     [
      "SULFATO DE GENTAMICINA 40 MG/ML SOLUÇÃO INJETÁVEL (AMPOLA 2 ML)",
      "01 AMPOLA",
      "ADMINISTRAR {DOSE} EV 01 VEZ AO DIA, DILUÍDO EM SF 0,9%, EM 30 MINUTOS (4 MG/KG/DOSE — RN ≥ 35 SEMANAS; PREMATURO: INTERVALO CONFORME IDADE GESTACIONAL E PÓS-NATAL)",
      "USO ENDOVENOSO",
      {
       "kg": 4,
       "un": "MG"
      }
     ]
    ],
    "orient": [
     "AVALIAR PUNÇÃO LOMBAR (RISCO DE MENINGITE); SE MENINGITE, USAR DOSES MENINGÍTICAS E CONDUZIR COM A NEONATOLOGIA",
     "AJUSTAR CONFORME CULTURAS E FUNÇÃO RENAL; DOSAR NÍVEL SÉRICO DA GENTAMICINA SE USO > 48H OU DISFUNÇÃO RENAL"
    ]
   },
   {
    "label": "Do material do Drive — Dose inicial parenteral se alergia grave a betalactâmico: gentamicina",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "SULFATO DE GENTAMICINA 40 MG/ML SOLUÇÃO INJETÁVEL (AMPOLA 2 ML)",
      "CONFORME PESO (AMPOLAS DE 80 MG)",
      "ADMINISTRAR 5 MG/KG EV, DILUÍDO EM 100 ML DE SF 0,9%, EM 30 MINUTOS, EM DOSE ÚNICA ANTES DA ALTA, SEGUIDA DA QUINOLONA ORAL (USAR PESO AJUSTADO SE OBESO). EVITAR SE DOENÇA RENAL, IDOSO OU GESTANTE",
      "USO ENDOVENOSO"
     ]
    ]
   },
   {
    "label": "Homem com pielonefrite ou ITU febril (próstata provavelmente envolvida): ciprofloxacino 14 dias",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "CIPROFLOXACINO 500 MG",
      "28 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO DE 12/12H POR 14 DIAS SEGUIDOS HORÁRIO SUGERIDO: 08:00 / 20:00",
      "USO ORAL"
     ]
    ]
   },
   {
    "label": "Padrão — ITU febril / pielonefrite (maior de 3 meses, bom estado, aceitando via oral): cefuroxima + antitérmico",
    "mode": "ped",
    "draft": true,
    "items": [
     [
      "CEFUROXIMA 250 MG/5 ML SUSPENSÃO ORAL",
      "01 FRASCO",
      "DAR {DOSE} VIA ORAL DE 12/12H, APÓS ALIMENTAÇÃO, POR 07 A 10 DIAS (30 MG/KG/DIA)",
      "USO ORAL",
      {
       "kgdia": 30,
       "vezes": 2,
       "conc": 50,
       "un": "ML",
       "max": 500
      }
     ],
     [
      "DIPIRONA 500 MG/ML SOLUÇÃO ORAL (GOTAS)",
      "01 FRASCO",
      "DAR {DOSE} VIA ORAL DE 6/6H SE DOR OU FEBRE (15 MG/KG/DOSE). NÃO USAR EM MENORES DE 3 MESES",
      "USO ORAL",
      {
       "kg": 15,
       "conc": 500,
       "gotas": 20,
       "un": "GOTAS",
       "max": 1000
      }
     ]
    ],
    "orient": [
     "COLHER URINA TIPO I E UROCULTURA ANTES DO ANTIBIÓTICO (SEM CONTROLE ESFINCTERIANO: SONDAGEM VESICAL; SACO COLETOR NÃO SERVE PARA CULTURA)",
     "MENORES DE 3 MESES, TOXEMIA, VÔMITOS, DESIDRATAÇÃO OU SEM ACEITAÇÃO ORAL: TRATAR INTERNADO COM CEFTRIAXONA EV (VER INTERNAÇÃO)",
     "RETORNAR EM 48 HORAS COM O RESULTADO DA UROCULTURA, OU ANTES SE A FEBRE CONTINUAR, VÔMITOS, SONOLÊNCIA OU PIORA DO ESTADO GERAL",
     "USG DE RINS E VIAS URINÁRIAS APÓS A PRIMEIRA ITU FEBRIL EM MENORES DE 2 ANOS"
    ]
   }
  ]
 },
 {
  "id": "pitiriase",
  "ic": "🧴",
  "nm": "Pitiríase versicolor",
  "sub": "cetoconazol · itraconazol · fluconazol",
  "blocks": [
   {
    "label": "Padrão — tópico: xampu de cetoconazol",
    "draft": true,
    "items": [
     [
      "CETOCONAZOL 20 MG/G XAMPU",
      "01 FRASCO",
      "APLICAR NAS MANCHAS E NO COURO CABELUDO DURANTE O BANHO, DEIXAR AGIR POR 05 MINUTOS E ENXAGUAR. USAR 01 VEZ AO DIA POR 05 DIAS",
      "USO TÓPICO"
     ]
    ],
    "orient": [
     "AS MANCHAS CLARAS PODEM DEMORAR MESES PARA SUMIR APÓS A CURA (A PELE PRECISA REPIGMENTAR COM O TEMPO) — ISSO NÃO SIGNIFICA FALHA DO TRATAMENTO",
     "EVITAR ÓLEOS, BRONZEADORES E CREMES OLEOSOS NA PELE; PREFERIR ROUPAS LEVES E SECAR BEM A PELE APÓS SUAR",
     "A RECIDIVA É COMUM, PRINCIPALMENTE NO CALOR: PARA PREVENIR, USAR O XAMPU NAS ÁREAS AFETADAS 01 VEZ A CADA 01 A 04 SEMANAS NOS MESES QUENTES",
     "RETORNAR À UBS SE A DESCAMAÇÃO NÃO MELHORAR EM 04 SEMANAS OU SE AS LESÕES FOREM MUITO EXTENSAS (AVALIAR TRATAMENTO ORAL)"
    ]
   },
   {
    "label": "Padrão — extensa, recidivante ou falha do tópico: antifúngico oral — escolha 1",
    "draft": true,
    "menu": true,
    "items": [
     [
      "ITRACONAZOL 100 MG",
      "10 CÁPSULAS",
      "TOMAR 01 CÁPSULA DE 12/12H POR 05 DIAS SEGUIDOS HORÁRIO SUGERIDO: 08h00 – 20h00"
     ],
     [
      "FLUCONAZOL 150 MG",
      "04 COMPRIMIDOS",
      "TOMAR 02 COMPRIMIDOS JUNTOS 01 VEZ POR SEMANA, POR 02 SEMANAS"
     ]
    ]
   },
   {
    "label": "Extensa — itraconazol 05 dias + fenticonazol spray",
    "sec": "offlabel",
    "items": [
     [
      "ITRACONAZOL 100 MG",
      "10 CÁPSULAS",
      "TOMAR 01 CÁPSULA DE 12/12H POR 05 DIAS SEGUIDOS HORÁRIO SUGERIDO: 08h00 – 20h00"
     ],
     [
      "FENTICONAZOL SPRAY 20MG/ML",
      "01 FRASCO",
      "APLICAR NAS MANCHAS À NOITE, ANTES DE DORMIR, POR 03 SEMANAS SEGUIDAS",
      "USO TÓPICO"
     ]
    ]
   },
   {
    "label": "Do material do Drive — Tópico alternativo (isoconazol ou ciclopirox) — escolha 1",
    "sec": "offlabel",
    "draft": true,
    "menu": true,
    "items": [
     [
      "NITRATO DE ISOCONAZOL 10 MG/G (1%) CREME",
      "01 BISNAGA",
      "APLICAR NAS MANCHAS 01 VEZ AO DIA POR 02 A 03 SEMANAS",
      "USO TÓPICO"
     ],
     [
      "CICLOPIROX OLAMINA 10 MG/G (1%) CREME",
      "01 BISNAGA",
      "APLICAR NAS MANCHAS 02 VEZES AO DIA POR 02 SEMANAS",
      "USO TÓPICO"
     ]
    ]
   }
  ]
 },
 {
  "id": "pneumonia",
  "ic": "🫁",
  "nm": "Pneumonia (comunidade)",
  "sub": "amoxicilina · amoxicilina-clavulanato · azitromicina",
  "blocks": [
   {
    "label": "Padrão — sem comorbidades: amoxicilina",
    "draft": true,
    "items": [
     [
      "AMOXICILINA 500 MG",
      "30 CÁPSULAS",
      "TOMAR 02 CÁPSULAS DE 8/8 HORAS POR 05 DIAS SEGUIDOS HORÁRIO SUGERIDO: 06:00 – 14:00 – 22:00"
     ],
     [
      "DIPIRONA 500 MG",
      "01 CAIXA",
      "TOMAR 02 COMPRIMIDOS SE DOR OU FEBRE, PODENDO REPETIR DE 06/06 HORAS SE NECESSÁRIO"
     ]
    ],
    "orient": [
     "REAVALIAÇÃO MÉDICA EM 48 A 72 HORAS (UBS OU RETORNO AO PRONTO-SOCORRO)",
     "RETORNAR IMEDIATAMENTE SE FALTA DE AR, CONFUSÃO MENTAL, LÁBIOS ROXOS, DOR NO PEITO, VÔMITOS QUE IMPEÇAM TOMAR O REMÉDIO OU FEBRE PERSISTENTE APÓS 72H DE ANTIBIÓTICO",
     "HIDRATAÇÃO ORAL ABUNDANTE, REPOUSO E NÃO FUMAR",
     "A FEBRE COSTUMA MELHORAR EM ATÉ 01 SEMANA; DOR NO PEITO E CATARRO DIMINUEM EM 04 SEMANAS; TOSSE E FALTA DE AR, EM ATÉ 06 SEMANAS; O CANSAÇO PODE DURAR ATÉ 03 MESES",
     "RX DE TÓRAX DE CONTROLE EM 06 A 08 SEMANAS SOMENTE SE SINTOMAS PERSISTENTES OU RISCO DE NEOPLASIA (TABAGISTA, > 50 ANOS)",
     "MANTER VACINAÇÃO EM DIA: INFLUENZA ANUAL, COVID-19 E PNEUMOCÓCICA CONFORME INDICAÇÃO"
    ]
   },
   {
    "label": "Padrão — com comorbidades ou antibiótico nos últimos 3 meses: amoxicilina-clavulanato + azitromicina",
    "draft": true,
    "items": [
     [
      "AMOXICILINA 875 MG + CLAVULANATO 125 MG",
      "10 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO DE 12/12 HORAS POR 05 DIAS SEGUIDOS HORÁRIO SUGERIDO: 08:00 – 20:00"
     ],
     [
      "AZITROMICINA 500 MG",
      "03 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO AO DIA, NO MESMO HORÁRIO, POR 03 DIAS SEGUIDOS"
     ],
     [
      "DIPIRONA 500 MG",
      "01 CAIXA",
      "TOMAR 02 COMPRIMIDOS SE DOR OU FEBRE, PODENDO REPETIR DE 06/06 HORAS SE NECESSÁRIO"
     ]
    ]
   },
   {
    "label": "Padrão — alergia à penicilina (doxiciclina se sem comorbidades; levofloxacino se com comorbidades) — escolha 1",
    "draft": true,
    "menu": true,
    "items": [
     [
      "DOXICICLINA 100 MG",
      "10 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO DE 12/12 HORAS POR 05 DIAS SEGUIDOS, COM UM COPO CHEIO DE ÁGUA, SEM DEITAR NOS 30 MINUTOS SEGUINTES"
     ],
     [
      "LEVOFLOXACINO 750 MG",
      "05 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO AO DIA, NO MESMO HORÁRIO, POR 05 DIAS SEGUIDOS"
     ]
    ]
   },
   {
    "label": "Opção 1 — sem comorbidades: macrolídeo isolado (azitromicina 03 dias) + dipirona",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "AZITROMICINA 500 MG",
      "03 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO AO DIA, NO MESMO HORÁRIO, POR 03 DIAS SEGUIDOS"
     ],
     [
      "DIPIRONA 500 MG",
      "01 CAIXA",
      "TOMAR 02 COMPRIMIDOS SE DOR OU FEBRE, PODENDO REPETIR DE 06/06 HORAS SE NECESSÁRIO"
     ]
    ]
   },
   {
    "label": "Opção 2 — sem comorbidades: macrolídeo isolado (claritromicina 05 dias) + dipirona",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "CLARITROMICINA 500 MG",
      "10 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO DE 12/12 HORAS POR 05 DIAS SEGUIDOS HORÁRIO SUGERIDO: 08:00 – 20:00"
     ],
     [
      "DIPIRONA 500 MG",
      "01 CAIXA",
      "TOMAR 02 COMPRIMIDOS SE DOR OU FEBRE, PODENDO REPETIR DE 06/06 HORAS SE NECESSÁRIO"
     ]
    ]
   },
   {
    "label": "Opção 3 — amoxicilina 1 g + azitromicina (cobertura de atípicos) + dipirona",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "AMOXICILINA 500 MG",
      "30 CÁPSULAS",
      "TOMAR 02 CÁPSULAS DE 8/8 HORAS POR 05 DIAS SEGUIDOS HORÁRIO SUGERIDO: 06:00 – 14:00 – 22:00"
     ],
     [
      "AZITROMICINA 500 MG",
      "03 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO AO DIA, NO MESMO HORÁRIO, POR 03 DIAS SEGUIDOS"
     ],
     [
      "DIPIRONA 500 MG",
      "01 CAIXA",
      "TOMAR 02 COMPRIMIDOS SE DOR OU FEBRE, PODENDO REPETIR DE 06/06 HORAS SE NECESSÁRIO"
     ]
    ]
   },
   {
    "label": "Opção 5 — com comorbidades: cefuroxima + azitromicina + dipirona",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "CEFUROXIMA 500 MG",
      "10 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO DE 12/12 HORAS, APÓS AS REFEIÇÕES, POR 05 DIAS SEGUIDOS HORÁRIO SUGERIDO: 08:00 – 20:00"
     ],
     [
      "AZITROMICINA 500 MG",
      "03 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO AO DIA, NO MESMO HORÁRIO, POR 03 DIAS SEGUIDOS"
     ],
     [
      "DIPIRONA 500 MG",
      "01 CAIXA",
      "TOMAR 02 COMPRIMIDOS SE DOR OU FEBRE, PODENDO REPETIR DE 06/06 HORAS SE NECESSÁRIO"
     ]
    ]
   },
   {
    "label": "Opção 6 — com comorbidades: quinolona respiratória isolada (levofloxacino 750 mg) + dipirona",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "LEVOFLOXACINO 750 MG",
      "05 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO AO DIA, NO MESMO HORÁRIO, POR 05 DIAS SEGUIDOS"
     ],
     [
      "DIPIRONA 500 MG",
      "01 CAIXA",
      "TOMAR 02 COMPRIMIDOS SE DOR OU FEBRE, PODENDO REPETIR DE 06/06 HORAS SE NECESSÁRIO"
     ]
    ]
   },
   {
    "label": "Opção 7 — com comorbidades: quinolona respiratória isolada (moxifloxacino 400 mg) + dipirona",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "MOXIFLOXACINO 400 MG",
      "05 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO AO DIA, NO MESMO HORÁRIO, POR 05 DIAS SEGUIDOS"
     ],
     [
      "DIPIRONA 500 MG",
      "01 CAIXA",
      "TOMAR 02 COMPRIMIDOS SE DOR OU FEBRE, PODENDO REPETIR DE 06/06 HORAS SE NECESSÁRIO"
     ]
    ]
   },
   {
    "label": "Analgésico/antitérmico — escolha 1",
    "sec": "offlabel",
    "menu": true,
    "items": [
     [
      "DIPIRONA 500 MG",
      "01 CAIXA",
      "TOMAR 02 COMPRIMIDOS SE DOR OU FEBRE, PODENDO REPETIR DE 6/6H"
     ],
     [
      "PARACETAMOL 750 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO SE DOR OU FEBRE, PODENDO REPETIR DE 6/6H. INTERCALAR COM DIPIRONA, SE NECESSÁRIO."
     ]
    ]
   },
   {
    "label": "Padrão — PAC em enfermaria: ceftriaxona + azitromicina",
    "mode": "internacao",
    "draft": true,
    "items": [
     [
      "CEFTRIAXONA 1 G PÓ PARA SOLUÇÃO INJETÁVEL",
      "02 FRASCOS-AMPOLA",
      "ADMINISTRAR 2 G EV 01 VEZ AO DIA, DILUÍDO EM 100 ML DE SF 0,9%, EM 30 MINUTOS. DURAÇÃO TOTAL DE 05 DIAS (MÍNIMO DE 03 DIAS SE ESTABILIDADE CLÍNICA PRECOCE), COM TROCA PARA VIA ORAL APÓS ESTABILIDADE",
      "USO ENDOVENOSO"
     ],
     [
      "AZITROMICINA 500 MG",
      "01 COMPRIMIDO",
      "TOMAR 01 COMPRIMIDO VIA ORAL 01 VEZ AO DIA POR 03 DIAS (SEM VIA ORAL: AZITROMICINA 500 MG EV)",
      "USO ORAL"
     ],
     [
      "DIPIRONA 500 MG/ML SOLUÇÃO INJETÁVEL",
      "01 AMPOLA 2 ML",
      "ADMINISTRAR 1 G (2 ML) EV DILUÍDO EM 100 ML DE SF 0,9%, EM 15 MIN, DE 6/6H SE DOR OU FEBRE",
      "USO ENDOVENOSO"
     ],
     [
      "OXIGÊNIO (CATETER NASAL OU MÁSCARA)",
      "CONFORME NECESSIDADE",
      "INICIAR SE SATO2 < 92% E TITULAR PARA SATO2 ENTRE 92% E 96% (88% A 92% SE DPOC OU RISCO DE RETENÇÃO DE CO2)",
      "USO INALATÓRIO"
     ],
     [
      "ENOXAPARINA 40 MG/0,4 ML SOLUÇÃO INJETÁVEL",
      "01 SERINGA PREENCHIDA",
      "ADMINISTRAR 40 MG SC 01 VEZ AO DIA PARA PROFILAXIA DE TEV (SE PADUA ≥ 4 E SEM SANGRAMENTO ATIVO; CLCR < 30 ML/MIN: 30 MG SC 01 VEZ AO DIA)",
      "USO SUBCUTÂNEO"
     ]
    ],
    "orient": [
     "MONITORIZAR FR, SATO2, FC, PA, TEMPERATURA E NÍVEL DE CONSCIÊNCIA DE 4/4H; HEMOCULTURAS E ESCARRO ANTES DO ANTIBIÓTICO SE PAC GRAVE OU RISCO DE MRSA/PSEUDOMONAS",
     "UTI SE CHOQUE COM VASOPRESSOR, VENTILAÇÃO MECÂNICA OU ≥ 3 CRITÉRIOS MENORES (FR ≥ 30, PAO2/FIO2 ≤ 250, MULTILOBAR, CONFUSÃO, UREIA ≥ 43 MG/DL, LEUCÓCITOS < 4.000, PLAQUETAS < 100.000, TEMPERATURA < 36 °C, HIPOTENSÃO QUE EXIGE VOLUME)",
     "TROCAR PARA VIA ORAL (AMOXICILINA-CLAVULANATO 875/125 MG DE 12/12H) QUANDO AFEBRIL, ESTÁVEL, ACEITANDO DIETA E COM SATO2 ADEQUADA; NÃO USAR CORTICOIDE NA PAC NÃO GRAVE",
     "SRAG OU PERÍODO DE INFLUENZA: COLETAR PAINEL VIRAL E INICIAR OSELTAMIVIR 75 MG VO DE 12/12H POR 05 DIAS SEM AGUARDAR O RESULTADO",
     "FEBRE OU PIORA APÓS 72H DE ANTIBIÓTICO: INVESTIGAR DERRAME PLEURAL/EMPIEMA, ABSCESSO, GERME RESISTENTE OU TUBERCULOSE"
    ]
   },
   {
    "label": "Padrão — PAC grave / UTI: ceftriaxona + azitromicina EV + hidrocortisona",
    "mode": "internacao",
    "draft": true,
    "items": [
     [
      "CEFTRIAXONA 1 G PÓ PARA SOLUÇÃO INJETÁVEL",
      "02 FRASCOS-AMPOLA",
      "ADMINISTRAR 2 G EV 01 VEZ AO DIA, DILUÍDO EM 100 ML DE SF 0,9%, EM 30 MINUTOS, POR NO MÍNIMO 05 DIAS (PAC GRAVE)",
      "USO ENDOVENOSO"
     ],
     [
      "AZITROMICINA 500 MG PÓ LIÓFILO PARA SOLUÇÃO INJETÁVEL",
      "01 FRASCO-AMPOLA",
      "ADMINISTRAR 500 MG EV 01 VEZ AO DIA, DILUÍDO EM 250 ML DE SF 0,9%, EM 60 MINUTOS, POR 03 A 05 DIAS",
      "USO ENDOVENOSO"
     ],
     [
      "HIDROCORTISONA (SUCCINATO SÓDICO) 100 MG PÓ PARA SOLUÇÃO INJETÁVEL",
      "01 FRASCO-AMPOLA",
      "ADMINISTRAR 50 MG EV DE 6/6H (200 MG/DIA), INICIANDO EM ATÉ 24H DO DIAGNÓSTICO DE PAC GRAVE, POR 04 A 07 DIAS COM REDUÇÃO GRADUAL. NÃO USAR SE INFLUENZA SUSPEITA OU CONFIRMADA",
      "USO ENDOVENOSO"
     ],
     [
      "RINGER COM LACTATO SOLUÇÃO INJETÁVEL",
      "01 BOLSA 500 ML",
      "SE HIPOTENSÃO OU LACTATO ≥ 4 MMOL/L: INFUNDIR {DOSE} EV NAS PRIMEIRAS 03 HORAS, EM ALÍQUOTAS DE 500 ML, REAVALIANDO PERFUSÃO E CONGESTÃO APÓS CADA UMA (30 ML/KG; PESO IDEAL SE OBESO)",
      "USO ENDOVENOSO",
      {
       "kg": 30,
       "un": "ML",
       "max": 3000
      }
     ]
    ],
    "orient": [
     "SEPSE: LACTATO E 02 PARES DE HEMOCULTURAS ANTES DO ANTIBIÓTICO, SEM ATRASAR A 1ª DOSE (IDEALMENTE NA 1ª HORA)",
     "NORADRENALINA SE PAM < 65 MMHG APESAR DO VOLUME; CATETER NASAL DE ALTO FLUXO, VNI OU IOT CONFORME TRABALHO RESPIRATÓRIO E PAO2/FIO2",
     "SOLICITAR ANTÍGENO URINÁRIO DE PNEUMOCOCO E LEGIONELLA E PAINEL VIRAL; SE INFLUENZA, OSELTAMIVIR 75 MG VO 12/12H E SUSPENDER HIDROCORTISONA; DESCALONAR CONFORME CULTURAS",
     "PROFILAXIA DE TEV EM TODOS, SALVO CONTRAINDICAÇÃO (ENOXAPARINA 40 MG SC/DIA; COMPRESSÃO PNEUMÁTICA SE SANGRAMENTO OU PLAQUETOPENIA GRAVE); PROFILAXIA DE ÚLCERA DE ESTRESSE APENAS SE VENTILAÇÃO MECÂNICA OU COAGULOPATIA"
    ]
   },
   {
    "label": "Betalactâmico alternativo à ceftriaxona (manter azitromicina) — escolha 1",
    "mode": "internacao",
    "sec": "offlabel",
    "draft": true,
    "menu": true,
    "items": [
     [
      "AMPICILINA 2 G + SULBACTAM 1 G PÓ PARA SOLUÇÃO INJETÁVEL",
      "01 FRASCO-AMPOLA",
      "ADMINISTRAR 3 G EV DE 6/6H, DILUÍDO EM 100 ML DE SF 0,9%, EM 30 MINUTOS (PREFERIR SE ASPIRAÇÃO COM ABSCESSO OU EMPIEMA)",
      "USO ENDOVENOSO"
     ],
     [
      "AMOXICILINA 1 G + CLAVULANATO DE POTÁSSIO 200 MG PÓ PARA SOLUÇÃO INJETÁVEL",
      "01 FRASCO-AMPOLA",
      "ADMINISTRAR 1,2 G EV DE 8/8H, DILUÍDO EM 100 ML DE SF 0,9% (NÃO DILUIR EM SORO GLICOSADO), EM 30 MINUTOS",
      "USO ENDOVENOSO"
     ]
    ]
   },
   {
    "label": "Alergia grave a betalactâmico: quinolona respiratória em monoterapia — escolha 1",
    "mode": "internacao",
    "sec": "offlabel",
    "draft": true,
    "menu": true,
    "items": [
     [
      "LEVOFLOXACINO 5 MG/ML SOLUÇÃO INJETÁVEL",
      "150 ML (750 MG)",
      "ADMINISTRAR 750 MG (150 ML) EV 01 VEZ AO DIA, EM 90 MINUTOS; TROCAR PARA 750 MG VO 01 VEZ AO DIA APÓS ESTABILIDADE (CLCR < 50 ML/MIN: 750 MG A CADA 48H)",
      "USO ENDOVENOSO"
     ],
     [
      "MOXIFLOXACINO 400 MG/250 ML SOLUÇÃO INJETÁVEL",
      "01 BOLSA 250 ML",
      "ADMINISTRAR 400 MG EV 01 VEZ AO DIA, EM 60 MINUTOS (SEM AJUSTE RENAL)",
      "USO ENDOVENOSO"
     ]
    ],
    "orient": [
     "AFASTAR TUBERCULOSE ANTES DE USAR QUINOLONA (PODE MASCARAR O DIAGNÓSTICO); ECG SE RISCO DE QT LONGO",
     "RISCO DE TENDINOPATIA, HIPOGLICEMIA E DELIRIUM EM IDOSOS"
    ]
   },
   {
    "label": "Risco de MRSA ou Pseudomonas (isolamento respiratório prévio ou internação com ATB EV em 90 dias): piperacilina-tazobactam + vancomicina",
    "mode": "internacao",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "PIPERACILINA 4 G + TAZOBACTAM 500 MG PÓ PARA SOLUÇÃO INJETÁVEL",
      "01 FRASCO-AMPOLA",
      "ADMINISTRAR 4,5 G EV DE 6/6H, DILUÍDO EM 100 ML DE SF 0,9%, EM 30 MINUTOS (OU INFUSÃO ESTENDIDA EM 04 HORAS)",
      "USO ENDOVENOSO"
     ],
     [
      "VANCOMICINA 500 MG PÓ PARA SOLUÇÃO INJETÁVEL",
      "FRASCOS-AMPOLA CONFORME DOSE",
      "ADMINISTRAR {DOSE} EV DE 12/12H, DILUÍDO EM SF 0,9% (ATÉ 5 MG/ML), EM NO MÍNIMO 60 MINUTOS (15 MG/KG/DOSE); AJUSTAR PELA FUNÇÃO RENAL E NÍVEL SÉRICO",
      "USO ENDOVENOSO",
      {
       "kg": 15,
       "un": "MG",
       "max": 2000
      }
     ]
    ],
    "orient": [
     "COLHER HEMOCULTURAS E ESCARRO/ASPIRADO ANTES; SWAB NASAL PARA MRSA SE DISPONÍVEL. SUSPENDER VANCOMICINA SE CULTURAS E SWAB NEGATIVOS EM 48H",
     "MANTER AZITROMICINA PARA COBERTURA DE ATÍPICOS; DURAÇÃO DE 07 DIAS SE MRSA OU PSEUDOMONAS CONFIRMADOS"
    ]
   },
   {
    "label": "Padrão — Amoxicilina VO em dose alta (PAC sem sinais de gravidade)",
    "mode": "ped",
    "draft": true,
    "items": [
     [
      "AMOXICILINA 400 MG/5 ML SUSPENSÃO ORAL",
      "01 A 02 FRASCOS (CONFORME O PESO)",
      "DAR {DOSE} VIA ORAL DE 12/12H POR 05 DIAS (90 MG/KG/DIA; MÁXIMO 2 G POR DOSE)",
      "USO ORAL",
      {
       "kgdia": 90,
       "vezes": 2,
       "conc": 80,
       "un": "ML",
       "max": 2000
      }
     ]
    ],
    "orient": [
     "INTERNAR SE: SATO2 < 92%, TIRAGEM SUBCOSTAL, GEMÊNCIA, APNEIA, INCAPACIDADE DE BEBER OU VÔMITOS, DESIDRATAÇÃO, LETARGIA, IDADE < 03 MESES, DERRAME PLEURAL OU FALHA DO TRATAMENTO ORAL",
     "REAVALIAR EM 48 A 72H; FEBRE PERSISTENTE OU PIORA APÓS 72H DE ANTIBIÓTICO: REAVALIAR (RX DE TÓRAX, DERRAME PLEURAL, ADESÃO)",
     "OFERECER LÍQUIDOS COM FREQUÊNCIA E MANTER A ALIMENTAÇÃO; LAVAGEM NASAL COM SORO FISIOLÓGICO; NÃO USAR XAROPES PARA TOSSE",
     "SUSPEITA DE INFLUENZA COM FATOR DE RISCO (< 05 ANOS, DOENÇA CRÔNICA) OU SRAG: OSELTAMIVIR CONFORME PESO (PROTOCOLO MS), SEM AGUARDAR EXAME",
     "DIPIRONA CONTRAINDICADA EM < 03 MESES OU < 05 KG; CONFIRMAR O PESO E MANTER VACINAÇÃO EM DIA (PNEUMOCÓCICA, HIB, INFLUENZA, COVID-19)"
    ]
   },
   {
    "label": "Padrão — Antitérmico pelo peso — escolha 1",
    "mode": "ped",
    "draft": true,
    "menu": true,
    "items": [
     [
      "DIPIRONA 500 MG/ML SOLUÇÃO ORAL (GOTAS)",
      "01 FRASCO",
      "DAR {DOSE} VIA ORAL DE 6/6H SE DOR OU FEBRE (15 MG/KG/DOSE)",
      "USO ORAL",
      {
       "kg": 15,
       "conc": 500,
       "gotas": 20,
       "un": "GOTAS",
       "max": 1000
      }
     ],
     [
      "PARACETAMOL 200 MG/ML SOLUÇÃO ORAL (GOTAS)",
      "01 FRASCO",
      "DAR {DOSE} VIA ORAL DE 6/6H SE DOR OU FEBRE (15 MG/KG/DOSE)",
      "USO ORAL",
      {
       "kg": 15,
       "conc": 200,
       "gotas": 15,
       "un": "GOTAS",
       "max": 750
      }
     ]
    ]
   },
   {
    "label": "Combinação pronta — PAC sem sinais de gravidade (tratamento domiciliar): amoxicilina VO",
    "mode": "ped",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "AMOXICILINA 400 MG/5 ML SUSPENSÃO ORAL",
      "01 A 02 FRASCOS (CONFORME O PESO)",
      "DAR {DOSE} VIA ORAL DE 12/12H POR 05 DIAS (90 MG/KG/DIA; MÁXIMO 2 G POR DOSE)",
      "USO ORAL",
      {
       "kgdia": 90,
       "vezes": 2,
       "conc": 80,
       "un": "ML",
       "max": 2000
      }
     ],
     [
      "DIPIRONA 500 MG/ML SOLUÇÃO ORAL (GOTAS)",
      "01 FRASCO",
      "DAR {DOSE} VIA ORAL DE 6/6H SE DOR OU FEBRE (15 MG/KG/DOSE)",
      "USO ORAL",
      {
       "kg": 15,
       "conc": 500,
       "gotas": 20,
       "un": "GOTAS",
       "max": 1000
      }
     ]
    ]
   },
   {
    "label": "Suspeita de pneumonia atípica (≥ 05 anos) ou alergia grave à penicilina: azitromicina VO",
    "mode": "ped",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "AZITROMICINA 200 MG/5 ML SUSPENSÃO ORAL",
      "01 FRASCO",
      "DAR {DOSE} VIA ORAL 01 VEZ AO DIA POR 03 DIAS (10 MG/KG/DIA)",
      "USO ORAL",
      {
       "kg": 10,
       "conc": 40,
       "un": "ML",
       "max": 500
      }
     ]
    ],
    "orient": [
     "EM ESCOLARES COM QUADRO SUGESTIVO DE MICOPLASMA PODE SER ASSOCIADA À AMOXICILINA; MACROLÍDEO ISOLADO NÃO COBRE BEM O PNEUMOCOCO"
    ]
   },
   {
    "label": "Padrão — PAC com internação (enfermaria): ampicilina EV",
    "mode": "ped_internacao",
    "draft": true,
    "items": [
     [
      "AMPICILINA 1 G PÓ PARA SOLUÇÃO INJETÁVEL",
      "01 FRASCO-AMPOLA",
      "ADMINISTRAR {DOSE} EV DE 6/6H, DILUÍDO EM SF 0,9%, EM 15 A 30 MINUTOS (200 MG/KG/DIA)",
      "USO ENDOVENOSO",
      {
       "kgdia": 200,
       "vezes": 4,
       "un": "MG",
       "max": 2000
      }
     ],
     [
      "DIPIRONA 500 MG/ML SOLUÇÃO INJETÁVEL",
      "01 AMPOLA 2 ML",
      "ADMINISTRAR {DOSE} EV DILUÍDO EM SF 0,9%, LENTAMENTE, DE 6/6H SE DOR OU FEBRE (25 MG/KG/DOSE). NÃO USAR EV EM < 01 ANO OU < 09 KG",
      "USO ENDOVENOSO",
      {
       "kg": 25,
       "un": "MG",
       "max": 1000
      }
     ],
     [
      "OXIGÊNIO POR CATETER NASAL",
      "CONFORME NECESSIDADE",
      "INICIAR SE SATO2 < 92% E TITULAR PARA MANTER SATO2 ENTRE 92% E 96%",
      "USO INALATÓRIO"
     ]
    ],
    "orient": [
     "MONITORIZAR FR, SATO2, ESFORÇO RESPIRATÓRIO E HIDRATAÇÃO; UTI SE SATO2 < 92% COM FIO2 ≥ 50%, FADIGA, APNEIA, CHOQUE OU ALTERAÇÃO DO SENSÓRIO",
     "TROCAR PARA AMOXICILINA VO APÓS 24 A 48H AFEBRIL E COM MELHORA, COMPLETANDO 05 A 07 DIAS DE TRATAMENTO",
     "SE NECESSÁRIO SORO DE MANUTENÇÃO, USAR SOLUÇÃO ISOTÔNICA E MONITORIZAR SÓDIO (RISCO DE SIADH)",
     "MENORES DE 2 MESES: NÃO USAR AS DOSES DESTE BLOCO — ESQUEMA NEONATAL DE AMPICILINA (OU PENICILINA CRISTALINA) + GENTAMICINA EV (OMS), COM DOSE E INTERVALO PELA IDADE GESTACIONAL E PÓS-NATAL (TABELA NEONATAL DO SERVIÇO)"
    ]
   },
   {
    "label": "Alternativa EV: penicilina cristalina ou ceftriaxona (vacinação incompleta, falha ou alergia não grave) — escolha 1",
    "mode": "ped_internacao",
    "sec": "offlabel",
    "draft": true,
    "menu": true,
    "items": [
     [
      "BENZILPENICILINA POTÁSSICA (PENICILINA G CRISTALINA) 5.000.000 UI PÓ PARA SOLUÇÃO INJETÁVEL",
      "01 FRASCO-AMPOLA",
      "ADMINISTRAR {DOSE} EV DE 6/6H, DILUÍDO EM SF 0,9%, EM 30 MINUTOS (200.000 UI/KG/DIA)",
      "USO ENDOVENOSO",
      {
       "kgdia": 200000,
       "vezes": 4,
       "un": "UI",
       "max": 4000000
      }
     ],
     [
      "CEFTRIAXONA 1 G PÓ PARA SOLUÇÃO INJETÁVEL",
      "01 FRASCO-AMPOLA",
      "ADMINISTRAR {DOSE} EV 01 VEZ AO DIA, DILUÍDO EM SF 0,9%, EM 30 MINUTOS (75 MG/KG/DIA). NÃO USAR EM < 28 DIAS DE VIDA",
      "USO ENDOVENOSO",
      {
       "kg": 75,
       "un": "MG",
       "max": 2000
      }
     ]
    ]
   },
   {
    "label": "PAC grave ou complicada (empiema, pneumatocele, necrose, pós-influenza): ceftriaxona + oxacilina",
    "mode": "ped_internacao",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "CEFTRIAXONA 1 G PÓ PARA SOLUÇÃO INJETÁVEL",
      "01 FRASCO-AMPOLA",
      "ADMINISTRAR {DOSE} EV DE 12/12H, DILUÍDO EM SF 0,9%, EM 30 MINUTOS (100 MG/KG/DIA). NÃO USAR EM < 28 DIAS DE VIDA",
      "USO ENDOVENOSO",
      {
       "kgdia": 100,
       "vezes": 2,
       "un": "MG",
       "max": 2000
      }
     ],
     [
      "OXACILINA 500 MG PÓ PARA SOLUÇÃO INJETÁVEL",
      "FRASCOS-AMPOLA CONFORME DOSE",
      "ADMINISTRAR {DOSE} EV DE 6/6H, DILUÍDO EM SF 0,9%, EM 30 MINUTOS (200 MG/KG/DIA)",
      "USO ENDOVENOSO",
      {
       "kgdia": 200,
       "vezes": 4,
       "un": "MG",
       "max": 2000
      }
     ]
    ],
    "orient": [
     "DERRAME PLEURAL: ULTRASSOM E AVALIAÇÃO DA CIRURGIA PEDIÁTRICA PARA DRENAGEM SE EMPIEMA OU DERRAME MODERADO/GRANDE",
     "SEM RESPOSTA EM 48 A 72H OU SUSPEITA DE MRSA COMUNITÁRIO: TROCAR OXACILINA POR VANCOMICINA OU CLINDAMICINA CONFORME PROTOCOLO"
    ]
   },
   {
    "label": "Do material do Drive — Risco de Pseudomonas: cefepima EV (manter azitromicina)",
    "mode": "internacao",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "CEFEPIMA 1 G PÓ PARA SOLUÇÃO INJETÁVEL",
      "02 FRASCOS-AMPOLA",
      "ADMINISTRAR 2 G EV DE 8/8H, DILUÍDO EM 100 ML DE SF 0,9%, EM 30 MINUTOS (AJUSTAR À FUNÇÃO RENAL); MANTER AZITROMICINA. COLHER HEMOCULTURAS E ESCARRO ANTES E DESCALONAR CONFORME CULTURAS EM 48-72H",
      "USO ENDOVENOSO"
     ]
    ]
   }
  ]
 },
 {
  "id": "prostatite",
  "ic": "♂",
  "nm": "Prostatite",
  "sub": "ciprofloxacino · dipirona",
  "blocks": [
   {
    "label": "Padrão — Prostatite bacteriana aguda (ambulatorial): ciprofloxacino 14 dias",
    "draft": true,
    "items": [
     [
      "CIPROFLOXACINO 500MG",
      "28 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO DE 12/12H POR 14 DIAS HORÁRIO SUGERIDO: 08h00 – 20h00. REAVALIAR NO FIM: SE AINDA HOUVER SINTOMAS, PROLONGAR (ATÉ 04 SEMANAS) CONFORME A UROCULTURA"
     ],
     [
      "DIPIRONA 500 MG",
      "01 CAIXA",
      "TOMAR 02 COMPRIMIDOS SE DOR OU FEBRE, PODENDO REPETIR DE 6/6H"
     ]
    ],
    "orient": [
     "COLHER URINA TIPO I E UROCULTURA COM ANTIBIOGRAMA ANTES DO ANTIBIÓTICO E AJUSTAR CONFORME O RESULTADO; NÃO REALIZAR MASSAGEM PROSTÁTICA NA FASE AGUDA",
     "HOMEM < 35 ANOS SEXUALMENTE ATIVO OU COM RISCO DE IST: TRATAR GONOCOCO E CLAMÍDIA (CEFTRIAXONA IM + DOXICICLINA, BLOCO PRÓPRIO); TESTAR HIV, SÍFILIS E HEPATITES E TRATAR AS PARCERIAS",
     "INTERNAR SE SEPSE, RETENÇÃO URINÁRIA, VÔMITOS/INTOLERÂNCIA À VIA ORAL OU IMUNOSSUPRESSÃO; SEM MELHORA EM 48-72H, INVESTIGAR ABSCESSO PROSTÁTICO (USG TRANSRETAL OU TC)",
     "INGERIR BASTANTE LÍQUIDO E EVITAR ESFORÇO PARA EVACUAR. COMPLETAR TODO O ANTIBIÓTICO MESMO COM MELHORA",
     "RETORNAR IMEDIATAMENTE SE FEBRE ALTA COM CALAFRIOS, DIFICULDADE OU IMPOSSIBILIDADE DE URINAR, DOR INTENSA OU PIORA DO ESTADO GERAL"
    ]
   },
   {
    "label": "Padrão — Risco de IST (homem < 35 anos sexualmente ativo): ceftriaxona IM + doxiciclina",
    "draft": true,
    "items": [
     [
      "CEFTRIAXONA 500 MG",
      "01 AMPOLA",
      "APLICAR EM GLÚTEO MÉDIO, DOSE ÚNICA (PESO ≥ 150 KG: 1 G)",
      "USO INTRAMUSCULAR"
     ],
     [
      "DOXICICLINA 100 MG",
      "20 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO DE 12/12H POR 10 DIAS"
     ]
    ]
   },
   {
    "label": "Alternativa se quinolona contraindicada e urocultura sensível: SMX-TMP 14 dias",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "SULFAMETOXAZOL + TRIMETOPRIMA 800 MG + 160 MG",
      "28 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO DE 12/12H POR 14 DIAS — SOMENTE SE SENSÍVEL NA UROCULTURA",
      "USO ORAL"
     ]
    ]
   },
   {
    "label": "Padrão — Prostatite com critério de internação: ceftriaxona 2 g EV + sintomáticos",
    "mode": "internacao",
    "draft": true,
    "items": [
     [
      "CEFTRIAXONA 1 G PÓ PARA SOLUÇÃO INJETÁVEL",
      "02 FRASCOS-AMPOLA",
      "ADMINISTRAR 2 G EV 01 VEZ AO DIA, RECONSTITUINDO CADA FRASCO EM 10 ML DE ÁGUA PARA INJETÁVEIS E DILUINDO OS 2 G EM 100 ML DE SF 0,9%, EM 30 MINUTOS",
      "USO ENDOVENOSO"
     ],
     [
      "DIPIRONA 500 MG/ML SOLUÇÃO INJETÁVEL (AMPOLA 2 ML)",
      "01 AMPOLA",
      "ADMINISTRAR 1 G (2 ML) EV, DILUÍDO EM 10 ML DE ÁGUA PARA INJETÁVEIS, LENTAMENTE, ATÉ DE 6/6H SE DOR OU FEBRE",
      "USO ENDOVENOSO"
     ],
     [
      "CLORETO DE SÓDIO 0,9% (SORO FISIOLÓGICO)",
      "01 BOLSA 500 ML",
      "INFUNDIR 500 ML EV EM 30 MINUTOS SE DESIDRATAÇÃO OU HIPOTENSÃO E REAVALIAR; DEPOIS, MANUTENÇÃO EV SOMENTE ENQUANTO A ACEITAÇÃO ORAL FOR INADEQUADA, CONFORME DIURESE",
      "USO ENDOVENOSO"
     ]
    ],
    "orient": [
     "COLHER UROCULTURA E 02 PARES DE HEMOCULTURAS ANTES DA 1ª DOSE; HEMOGRAMA, CREATININA E PCR; NÃO FAZER MASSAGEM PROSTÁTICA",
     "RETENÇÃO URINÁRIA: DRENAR A BEXIGA (SONDA URETRAL FINA POR CURTO PERÍODO OU CISTOSTOMIA SUPRAPÚBICA, CONFORME A UROLOGIA)",
     "SEM MELHORA EM 48-72H: USG TRANSRETAL OU TC PARA ABSCESSO PROSTÁTICO (DRENAGEM)",
     "PASSAR PARA VIA ORAL QUANDO AFEBRIL E ESTÁVEL, CONFORME O ANTIBIOGRAMA, COMPLETANDO 14 DIAS NO TOTAL",
     "SEPSE OU CHOQUE: CRISTALOIDE 30 ML/KG E ESQUEMA DE AMPLO ESPECTRO (VER OUTRAS OPÇÕES)"
    ]
   },
   {
    "label": "Sepse/choque séptico ou risco de germe multirresistente (ESBL) — escolha 1",
    "mode": "internacao",
    "sec": "offlabel",
    "draft": true,
    "menu": true,
    "items": [
     [
      "PIPERACILINA 4 G + TAZOBACTAM 500 MG PÓ PARA SOLUÇÃO INJETÁVEL",
      "01 FRASCO-AMPOLA",
      "ADMINISTRAR 4,5 G EV DE 6/6H, DILUÍDO EM 100 ML DE SF 0,9%, EM 30 MINUTOS (OU INFUSÃO ESTENDIDA EM 03 A 04H, CONFORME PROTOCOLO) — SEPSE SEM RISCO DE ESBL",
      "USO ENDOVENOSO"
     ],
     [
      "MEROPENEM 1 G PÓ PARA SOLUÇÃO INJETÁVEL",
      "01 FRASCO-AMPOLA",
      "ADMINISTRAR 1 G EV DE 8/8H, DILUÍDO EM 100 ML DE SF 0,9%, EM 30 MINUTOS (OU INFUSÃO ESTENDIDA EM 03H) — CHOQUE SÉPTICO OU RISCO DE ESBL",
      "USO ENDOVENOSO"
     ]
    ],
    "orient": [
     "RISCO DE ESBL: ANTIBIÓTICO OU INTERNAÇÃO NOS ÚLTIMOS 90 DIAS, UROCULTURA PRÉVIA COM ESBL, SONDA VESICAL, BIÓPSIA DE PRÓSTATA OU PROCEDIMENTO UROLÓGICO RECENTE",
     "AJUSTAR DOSES PELA FUNÇÃO RENAL E DESCALONAR EM 48-72H CONFORME CULTURAS"
    ]
   },
   {
    "label": "Transição para via oral (afebril e estável, conforme antibiograma) — escolha 1",
    "mode": "internacao",
    "sec": "offlabel",
    "draft": true,
    "menu": true,
    "items": [
     [
      "CIPROFLOXACINO 500 MG",
      "01 COMPRIMIDO",
      "TOMAR 01 COMPRIMIDO VO DE 12/12H, COMPLETANDO 14 DIAS DE TRATAMENTO TOTAL (EV + VO)",
      "USO ORAL"
     ],
     [
      "SULFAMETOXAZOL + TRIMETOPRIMA 800 MG + 160 MG",
      "01 COMPRIMIDO",
      "TOMAR 01 COMPRIMIDO VO DE 12/12H, COMPLETANDO 14 DIAS DE TRATAMENTO TOTAL (EV + VO) — SOMENTE SE SENSÍVEL NO ANTIBIOGRAMA",
      "USO ORAL"
     ]
    ]
   }
  ]
 },
 {
  "id": "queimaduras",
  "ic": "🔥",
  "nm": "Queimaduras",
  "sub": "sulfadiazina de prata · dipirona · paracetamol",
  "blocks": [
   {
    "label": "Padrão — Curativo",
    "draft": true,
    "items": [
     [
      "SULFADIAZINA DE PRATA 10MG/G",
      "01 BISNAGA",
      "APLICAR UMA CAMADA NA LESÃO E COBRIR COM CURATIVO COM GAZE, 01 A 02 VEZES AO DIA, APÓS LAVAR, ATÉ CICATRIZAR. NÃO USAR SE ALERGIA A SULFA OU GESTAÇÃO A TERMO",
      "USO TÓPICO"
     ]
    ],
    "orient": [
     "LAVAR A QUEIMADURA COM ÁGUA CORRENTE E SABÃO NEUTRO (OU SORO FISIOLÓGICO) ANTES DE CADA TROCA DE CURATIVO. NÃO FURAR BOLHAS ÍNTEGRAS. NÃO APLICAR PASTA DE DENTE, MANTEIGA, PÓ DE CAFÉ OU OUTRAS RECEITAS CASEIRAS",
     "QUEIMADURA SÓ DE 1º GRAU (APENAS VERMELHIDÃO, SEM BOLHAS): NÃO PRECISA DA POMADA — USAR HIDRATANTE E PROTEGER DO SOL",
     "AVALIAR PROFILAXIA DO TÉTANO (QUEIMADURA É FERIMENTO DE ALTO RISCO): REFORÇO DA VACINA DUPLA ADULTO (DT) SE A ÚLTIMA DOSE FOI HÁ MAIS DE 5 ANOS; ESQUEMA INCOMPLETO OU DESCONHECIDO: VACINAR E AVALIAR SORO/IMUNOGLOBULINA ANTITETÂNICA",
     "RETORNAR EM 48 A 72H PARA REAVALIAÇÃO DO CURATIVO, OU IMEDIATAMENTE SE FEBRE, PUS, MAU CHEIRO, VERMELHIDÃO QUE SE ESPALHA AO REDOR OU PIORA DA DOR",
     "QUEIMADURA DE 2º GRAU PROFUNDO OU 3º GRAU, EM FACE, MÃOS, PÉS, GENITAIS OU ARTICULAÇÕES, OU EXTENSA (>10% DA SUPERFÍCIE CORPORAL NO ADULTO): ENCAMINHAR AO CENTRO DE QUEIMADOS"
    ]
   },
   {
    "label": "Padrão — Analgésico / antitérmico — escolha 1",
    "draft": true,
    "menu": true,
    "items": [
     [
      "DIPIRONA 500 MG",
      "01 CAIXA",
      "TOMAR 02 COMPRIMIDOS SE DOR OU FEBRE, PODENDO REPETIR DE 6/6H"
     ],
     [
      "PARACETAMOL 750 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO SE DOR OU FEBRE, PODENDO REPETIR DE 6/6H. INTERCALAR COM DIPIRONA, SE NECESSÁRIO."
     ]
    ]
   },
   {
    "label": "Combinação pronta — 2º grau superficial pequena (curativo + analgesia)",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "SULFADIAZINA DE PRATA 10MG/G",
      "01 BISNAGA",
      "APLICAR UMA CAMADA NA LESÃO E COBRIR COM CURATIVO COM GAZE, 01 A 02 VEZES AO DIA, APÓS LAVAR, ATÉ CICATRIZAR. NÃO USAR SE ALERGIA A SULFA OU GESTAÇÃO A TERMO",
      "USO TÓPICO"
     ],
     [
      "DIPIRONA 500 MG",
      "01 CAIXA",
      "TOMAR 02 COMPRIMIDOS SE DOR OU FEBRE, PODENDO REPETIR DE 6/6H"
     ]
    ]
   },
   {
    "label": "Queimadura pequena de 2º grau — sulfadiazina + dipirona",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "SULFADIAZINA DE PRATA 10MG/G",
      "01 BISNAGA",
      "APLICAR UMA CAMADA NA LESÃO E COBRIR COM CURATIVO COM GAZE, 01 A 02 VEZES AO DIA, APÓS LAVAR, ATÉ CICATRIZAR. NÃO USAR SE ALERGIA A SULFA OU GESTAÇÃO A TERMO",
      "USO TÓPICO"
     ],
     [
      "DIPIRONA 500MG",
      "01 CAIXA",
      "TOMAR 02 COMPRIMIDOS SE FEBRE OU DOR, PODENDO REPETIR DE 06/06H"
     ]
    ]
   },
   {
    "label": "Analgésico/antitérmico — escolha 1",
    "sec": "offlabel",
    "menu": true,
    "items": [
     [
      "DIPIRONA 500 MG",
      "01 CAIXA",
      "TOMAR 02 COMPRIMIDOS SE DOR OU FEBRE, PODENDO REPETIR DE 6/6H"
     ],
     [
      "PARACETAMOL 750 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO SE DOR OU FEBRE, PODENDO REPETIR DE 6/6H. INTERCALAR COM DIPIRONA, SE NECESSÁRIO."
     ]
    ]
   },
   {
    "label": "Padrão — Grande queimado (2º/3º grau > 20% SCQ): ressuscitação volêmica (ABA)",
    "mode": "internacao",
    "draft": true,
    "items": [
     [
      "OXIGÊNIO 100% (MÁSCARA NÃO REINALANTE COM RESERVATÓRIO)",
      "10 A 15 L/MIN",
      "ADMINISTRAR DESDE A ADMISSÃO SE INCÊNDIO EM AMBIENTE FECHADO OU SUSPEITA DE LESÃO INALATÓRIA/INTOXICAÇÃO POR MONÓXIDO DE CARBONO, ATÉ AFASTAR A INTOXICAÇÃO (CARBOXI-HEMOGLOBINA NA GASOMETRIA) — A OXIMETRIA DE PULSO NÃO DETECTA CARBOXI-HEMOGLOBINA; DEPOIS TITULAR PARA SATURAÇÃO ≥ 94%",
      "USO INALATÓRIO"
     ],
     [
      "RINGER COM LACTATO 500 ML",
      "BOLSAS 500 ML CONFORME CÁLCULO",
      "VOLUME DAS PRIMEIRAS 24H = {DOSE} × %SCQ (2 ML/KG × %SCQ — ABA). INFUNDIR METADE NAS PRIMEIRAS 8H CONTADAS DA HORA DA QUEIMADURA (DESCONTAR O QUE JÁ FOI INFUNDIDO) E A OUTRA METADE NAS 16H SEGUINTES, EM BOMBA DE INFUSÃO; AJUSTAR A VAZÃO DE HORA EM HORA PELA DIURESE",
      "USO ENDOVENOSO",
      {
       "kg": 2,
       "un": "ML"
      }
     ]
    ],
    "orient": [
     "INDICAÇÃO: QUEIMADURA DE 2º/3º GRAU > 20% DA SCQ (REGRA DOS NOVE; NÃO CONTAR ÁREAS DE 1º GRAU). PESAR O PACIENTE, 02 ACESSOS VENOSOS CALIBROSOS, SONDA VESICAL DE DEMORA E DIURESE HORÁRIA",
     "ALVO DE DIURESE 0,5 ML/KG/H (30–50 ML/H): SE ABAIXO, AUMENTAR A VAZÃO EM 20–30%; SE ACIMA, REDUZIR — EVITAR HIPER-HIDRATAÇÃO (SÍNDROME COMPARTIMENTAL, EDEMA PULMONAR). QUEIMADURA ELÉTRICA: 4 ML/KG × %SCQ (O DOBRO DO CALCULADO) E DIURESE 1–1,5 ML/KG/H ATÉ CLAREAR A URINA",
     "VIA AÉREA: QUEIMADURA DE FACE/PESCOÇO, VIBRISSAS QUEIMADAS, ESCARRO CARBONÁCEO, ROUQUIDÃO, ESTRIDOR OU REBAIXAMENTO → INTUBAÇÃO PRECOCE (TUBO ≥ 7,5). INCÊNDIO FECHADO + LACTATO ELEVADO, HIPOTENSÃO OU COMA: SUSPEITAR DE CIANETO (HIDROXOCOBALAMINA 5 G EV SE DISPONÍVEL; DISQUE-INTOXICAÇÃO 0800 722 6001)",
     "PREVENIR HIPOTERMIA (MANTA, SOROS E AMBIENTE AQUECIDOS); CABECEIRA E MEMBROS ELEVADOS; QUEIMADURA CIRCUNFERENCIAL DE TÓRAX OU MEMBROS COM COMPROMETIMENTO VENTILATÓRIO OU CIRCULATÓRIO → ESCAROTOMIA",
     "SOLICITAR VAGA EM CENTRO DE QUEIMADOS (CENTRAL DE REGULAÇÃO) SE GRANDE QUEIMADO, 3º GRAU, FACE/MÃOS/PÉS/GENITAIS/PERÍNEO/GRANDES ARTICULAÇÕES, LESÃO INALATÓRIA, QUEIMADURA ELÉTRICA OU QUÍMICA, TRAUMA ASSOCIADO OU COMORBIDADE GRAVE"
    ]
   },
   {
    "label": "Padrão — Analgesia, profilaxias e curativo",
    "mode": "internacao",
    "draft": true,
    "items": [
     [
      "DIPIRONA 500 MG/ML SOLUÇÃO INJETÁVEL",
      "01 AMPOLA 2 ML",
      "ADMINISTRAR 1 G (2 ML) DILUÍDO EM 100 ML DE SF 0,9% EV DE 6/6H, EM HORÁRIOS FIXOS",
      "USO ENDOVENOSO"
     ],
     [
      "MORFINA 10 MG/ML SOLUÇÃO INJETÁVEL",
      "01 AMPOLA 1 ML",
      "DILUIR 01 AMPOLA EM 9 ML DE SF 0,9% (1 MG/ML) E ADMINISTRAR 2 A 4 MG (2 A 4 ML) EV LENTO, REPETINDO A CADA 5–10 MIN ATÉ CONTROLE DA DOR; DEPOIS 2 A 4 MG EV ATÉ DE 4/4H SE DOR E 20–30 MIN ANTES DOS CURATIVOS (IDOSO OU DOENÇA RENAL: INICIAR COM 1 A 2 MG)",
      "USO ENDOVENOSO"
     ],
     [
      "VACINA DUPLA ADULTO (DT) — TOXOIDES DIFTÉRICO E TETÂNICO",
      "01 DOSE (0,5 ML)",
      "ADMINISTRAR 0,5 ML IM SE ESQUEMA INCOMPLETO (< 03 DOSES) OU DESCONHECIDO (INICIAR/COMPLETAR O ESQUEMA) OU SE A ÚLTIMA DOSE FOI HÁ MAIS DE 05 ANOS (QUEIMADURA = FERIMENTO DE ALTO RISCO)",
      "USO INTRAMUSCULAR"
     ],
     [
      "IMUNOGLOBULINA HUMANA ANTITETÂNICA (IGHAT) 250 UI",
      "01 FRASCO-AMPOLA",
      "ADMINISTRAR 250 UI IM, DOSE ÚNICA, EM MÚSCULO DIFERENTE DO DA VACINA, SOMENTE SE ESQUEMA VACINAL INCOMPLETO (< 03 DOSES) OU DESCONHECIDO (NA FALTA: SORO ANTITETÂNICO 5.000 UI IM)",
      "USO INTRAMUSCULAR"
     ],
     [
      "OMEPRAZOL 40 MG PÓ PARA SOLUÇÃO INJETÁVEL",
      "01 FRASCO-AMPOLA",
      "RECONSTITUIR E ADMINISTRAR 40 MG EV 01 VEZ AO DIA — PROFILAXIA DE ÚLCERA DE ESTRESSE NO GRANDE QUEIMADO (SUSPENDER QUANDO EM DIETA ENTERAL PLENA E SEM OUTROS FATORES DE RISCO)",
      "USO ENDOVENOSO"
     ],
     [
      "ENOXAPARINA 40 MG/0,4 ML SOLUÇÃO INJETÁVEL (SERINGA PREENCHIDA)",
      "01 SERINGA",
      "ADMINISTRAR 40 MG SC 01 VEZ AO DIA (PROFILAXIA DE TROMBOEMBOLISMO VENOSO NO GRANDE QUEIMADO OU IMOBILIZADO), SE SEM SANGRAMENTO ATIVO OU PROCEDIMENTO PRÓXIMO; CLCR < 30 ML/MIN: 20 MG SC 01 VEZ AO DIA",
      "USO SUBCUTÂNEO"
     ],
     [
      "SULFADIAZINA DE PRATA 10MG/G",
      "01 BISNAGA",
      "APÓS LIMPEZA COM SF 0,9% E CLOREXIDINA DEGERMANTE 2% (OU SABÃO NEUTRO) E RETIRADA DE BOLHAS ROTAS, APLICAR CAMADA DE 2–3 MM NAS ÁREAS DE 2º/3º GRAU E COBRIR COM GAZE, TROCANDO 01 A 02 VEZES AO DIA. SE TRANSFERÊNCIA PARA CENTRO DE QUEIMADOS NAS PRÓXIMAS HORAS, APENAS COBRIR COM COMPRESSAS LIMPAS E SECAS",
      "USO TÓPICO"
     ]
    ],
    "orient": [
     "REAVALIAR A DOR A CADA 4H E ANTES DOS CURATIVOS; COM OPIOIDE, MONITORAR FR, SATURAÇÃO E SEDAÇÃO (NALOXONA DISPONÍVEL)",
     "OMEPRAZOL E ENOXAPARINA SÃO PARA O GRANDE QUEIMADO/IMOBILIZADO — NÃO SÃO ROTINA NA QUEIMADURA PEQUENA EM OBSERVAÇÃO",
     "INICIAR DIETA OU NUTRIÇÃO ENTERAL PRECOCE (PRIMEIRAS 24H) NO GRANDE QUEIMADO ESTÁVEL. SULFADIAZINA: NÃO USAR EM ALERGIA A SULFA, GESTANTE A TERMO OU RECÉM-NASCIDO < 2 MESES"
    ]
   },
   {
    "label": "ATB EV somente se infecção da queimadura/celulite — escolha 1",
    "mode": "internacao",
    "sec": "offlabel",
    "draft": true,
    "menu": true,
    "items": [
     [
      "CEFAZOLINA 1 G PÓ PARA SOLUÇÃO INJETÁVEL",
      "01 FRASCO-AMPOLA",
      "{FAIXA}",
      "USO ENDOVENOSO",
      {
       "sem_peso": "RECONSTITUIR E ADMINISTRAR 1 G EV DE 8/8H, DILUÍDO EM 100 ML DE SF 0,9%, EM 30 MIN (2 G POR DOSE SE PESO > 120 KG OU INFECÇÃO GRAVE)",
       "faixas": [
        {
         "ate": 120,
         "txt": "RECONSTITUIR E ADMINISTRAR 1 G EV DE 8/8H, DILUÍDO EM 100 ML DE SF 0,9%, EM 30 MIN (2 G POR DOSE SE INFECÇÃO GRAVE)"
        },
        {
         "acima": 120,
         "txt": "RECONSTITUIR E ADMINISTRAR 2 G EV DE 8/8H, DILUÍDO EM 100 ML DE SF 0,9%, EM 30 MIN (PESO > 120 KG)"
        }
       ]
      }
     ],
     [
      "CLINDAMICINA 600 MG/4 ML SOLUÇÃO INJETÁVEL",
      "01 AMPOLA",
      "DILUIR EM 100 ML DE SF 0,9% E ADMINISTRAR 600 MG EV EM 30 MIN DE 8/8H (ALERGIA GRAVE A BETALACTÂMICO)",
      "USO ENDOVENOSO"
     ]
    ],
    "orient": [
     "ANTIBIÓTICO PROFILÁTICO SISTÊMICO NÃO É INDICADO EM QUEIMADURAS — USAR SÓ SE CELULITE AO REDOR DA FERIDA, SECREÇÃO PURULENTA OU SINAIS SISTÊMICOS DE INFECÇÃO, APÓS COLHER HEMOCULTURAS E CULTURA DA FERIDA",
     "FEBRE E LEUCOCITOSE SÃO COMUNS NO GRANDE QUEIMADO (RESPOSTA INFLAMATÓRIA); SEPSE NO QUEIMADO INTERNADO HÁ > 48–72H: COBRIR GRAM-NEGATIVOS (INCLUSIVE PSEUDOMONAS) CONFORME A CCIH"
    ]
   },
   {
    "label": "Padrão — Queimadura > 10% SCQ: ressuscitação volêmica (ABA) + manutenção",
    "mode": "ped_internacao",
    "draft": true,
    "items": [
     [
      "RINGER COM LACTATO 500 ML",
      "BOLSAS 500 ML CONFORME CÁLCULO",
      "VOLUME DE RESSUSCITAÇÃO NAS PRIMEIRAS 24H = {DOSE} × %SCQ (3 ML/KG × %SCQ — ABA). INFUNDIR METADE NAS PRIMEIRAS 8H CONTADAS DA HORA DA QUEIMADURA E A OUTRA METADE NAS 16H SEGUINTES, EM BOMBA DE INFUSÃO, ALÉM DA MANUTENÇÃO; AJUSTAR A VAZÃO DE HORA EM HORA PELA DIURESE",
      "USO ENDOVENOSO",
      {
       "kg": 3,
       "un": "ML"
      }
     ],
     [
      "RINGER COM LACTATO 500 ML + GLICOSE 50% 50 ML (SOLUÇÃO DE MANUTENÇÃO COM GLICOSE ≈ 4,5%)",
      "01 BOLSA 500 ML + 05 AMPOLAS 10 ML",
      "{FAIXA}",
      "USO ENDOVENOSO",
      {
       "sem_peso": "CRIANÇA ≤ 30 KG: INFUNDIR EM BOMBA DE INFUSÃO, EM PARALELO À RESSUSCITAÇÃO, NA VAZÃO DE MANUTENÇÃO (HOLLIDAY-SEGAR): 4 ML/KG/H PARA OS PRIMEIROS 10 KG + 2 ML/KG/H DE 10 A 20 KG + 1 ML/KG/H ACIMA DE 20 KG",
       "faixas": [
        {
         "ate": 10,
         "txt": "INFUNDIR EM BOMBA DE INFUSÃO, EM PARALELO À RESSUSCITAÇÃO, NA VAZÃO DE MANUTENÇÃO (HOLLIDAY-SEGAR) DE {=4*P} ML/H (4 ML/KG/H)"
        },
        {
         "acima": 10,
         "ate": 20,
         "txt": "INFUNDIR EM BOMBA DE INFUSÃO, EM PARALELO À RESSUSCITAÇÃO, NA VAZÃO DE MANUTENÇÃO (HOLLIDAY-SEGAR) DE {=40+2*(P-10)} ML/H (40 ML/H + 2 ML/KG/H ACIMA DE 10 KG)"
        },
        {
         "acima": 20,
         "ate": 30,
         "txt": "INFUNDIR EM BOMBA DE INFUSÃO, EM PARALELO À RESSUSCITAÇÃO, NA VAZÃO DE MANUTENÇÃO (HOLLIDAY-SEGAR) DE {=60+(P-20)} ML/H (60 ML/H + 1 ML/KG/H ACIMA DE 20 KG)"
        },
        {
         "acima": 30,
         "txt": "SOLUÇÃO DE MANUTENÇÃO INDICADA SOMENTE PARA CRIANÇA ≤ 30 KG"
        }
       ]
      }
     ]
    ],
    "orient": [
     "INDICAÇÃO: QUEIMADURA DE 2º/3º GRAU > 10% DA SCQ NA CRIANÇA; CALCULAR A SCQ PELA TABELA DE LUND-BROWDER (CABEÇA PROPORCIONALMENTE MAIOR; PALMA DA MÃO DA CRIANÇA COM DEDOS ≈ 1%) E NÃO CONTAR ÁREAS DE 1º GRAU",
     "DIURESE HORÁRIA (SONDA VESICAL): ALVO 1 ML/KG/H SE ≤ 30 KG E 0,5 ML/KG/H SE > 30 KG; AUMENTAR OU REDUZIR A VAZÃO EM 20–30% CONFORME A DIURESE, EVITANDO HIPER-HIDRATAÇÃO",
     "GLICEMIA CAPILAR A CADA 4–6H (RISCO DE HIPOGLICEMIA); CONTROLE DE TEMPERATURA E PREVENÇÃO DE HIPOTERMIA (AMBIENTE E SOROS AQUECIDOS)",
     "VIA AÉREA: QUEIMADURA DE FACE, ROUQUIDÃO, ESTRIDOR, ESCARRO CARBONÁCEO OU INCÊNDIO EM AMBIENTE FECHADO → O2 100% E AVALIAR INTUBAÇÃO PRECOCE. HISTÓRIA INCOMPATÍVEL, PADRÃO DE IMERSÃO (LUVA/MEIA) OU QUEIMADURAS DE CIGARRO: SUSPEITAR DE MAUS-TRATOS E NOTIFICAR AO CONSELHO TUTELAR",
     "SOLICITAR VAGA EM CENTRO DE QUEIMADOS (CENTRAL DE REGULAÇÃO) SE > 10% SCQ, 3º GRAU, FACE/MÃOS/PÉS/GENITAIS/PERÍNEO/ARTICULAÇÕES, LESÃO INALATÓRIA, QUEIMADURA ELÉTRICA OU QUÍMICA"
    ]
   },
   {
    "label": "Padrão — Analgesia EV por peso e profilaxia do tétano",
    "mode": "ped_internacao",
    "draft": true,
    "items": [
     [
      "DIPIRONA 500 MG/ML SOLUÇÃO INJETÁVEL",
      "01 AMPOLA 2 ML",
      "ADMINISTRAR {DOSE} DILUÍDO EM 10 ML DE SF 0,9%, EV LENTO, DE 6/6H EM HORÁRIOS FIXOS (15 MG/KG/DOSE). CONTRAINDICADA EM < 3 MESES OU < 5 KG; EM < 1 ANO USAR SOMENTE IM (BULA)",
      "USO ENDOVENOSO",
      {
       "kg": 15,
       "un": "MG",
       "max": 1000
      }
     ],
     [
      "MORFINA 10 MG/ML SOLUÇÃO INJETÁVEL",
      "01 AMPOLA 1 ML",
      "DILUIR 01 AMPOLA EM 9 ML DE SF 0,9% (1 MG/ML) E ADMINISTRAR {DOSE} EV LENTO EM 5 MIN, ATÉ DE 4/4H SE DOR INTENSA E 20–30 MIN ANTES DOS CURATIVOS (0,1 MG/KG/DOSE; LACTENTE < 6 MESES: METADE DA DOSE, SOB MONITORIZAÇÃO)",
      "USO ENDOVENOSO",
      {
       "kg": 0.1,
       "un": "MG",
       "max": 4
      }
     ],
     [
      "VACINA COM COMPONENTE TETÂNICO CONFORME IDADE (< 07 ANOS: DTP/PENTAVALENTE; ≥ 07 ANOS: DT)",
      "01 DOSE (0,5 ML)",
      "ADMINISTRAR 0,5 ML IM SE ESQUEMA INCOMPLETO OU DESCONHECIDO (COMPLETAR CONFORME O CALENDÁRIO) OU SE A ÚLTIMA DOSE FOI HÁ MAIS DE 05 ANOS (QUEIMADURA = FERIMENTO DE ALTO RISCO) — CONFERIR A CADERNETA",
      "USO INTRAMUSCULAR"
     ],
     [
      "IMUNOGLOBULINA HUMANA ANTITETÂNICA (IGHAT) 250 UI",
      "01 FRASCO-AMPOLA",
      "ADMINISTRAR 250 UI IM, DOSE ÚNICA, EM MÚSCULO DIFERENTE DO DA VACINA, SOMENTE SE ESQUEMA VACINAL INCOMPLETO (< 03 DOSES) OU DESCONHECIDO (NA FALTA: SORO ANTITETÂNICO 5.000 UI IM)",
      "USO INTRAMUSCULAR"
     ]
    ],
    "orient": [
     "REAVALIAR A DOR COM ESCALA ADEQUADA À IDADE (FLACC/FACES) A CADA 4H E ANTES DOS CURATIVOS; COM OPIOIDE, MONITORAR FR, SATURAÇÃO E SEDAÇÃO (NALOXONA DISPONÍVEL)",
     "CURATIVO: LIMPEZA COM SF 0,9% E SULFADIAZINA DE PRATA 1% NAS ÁREAS DE 2º GRAU, TROCA 01–02 VEZES AO DIA (NÃO USAR EM < 2 MESES); SE TRANSFERÊNCIA IMEDIATA, APENAS COBRIR COM COMPRESSAS LIMPAS E SECAS",
     "NÃO USAR AAS; CODEÍNA E TRAMADOL SÃO CONTRAINDICADOS EM < 12 ANOS"
    ]
   },
   {
    "label": "Padrão — Analgesia via oral pelo peso (queimadura menor) — escolha 1",
    "mode": "ped",
    "draft": true,
    "menu": true,
    "items": [
     [
      "DIPIRONA 500 MG/ML SOLUÇÃO ORAL (GOTAS)",
      "01 FRASCO",
      "DAR {DOSE} VIA ORAL DE 6/6H SE DOR OU FEBRE (15 MG/KG/DOSE). NÃO USAR EM < 3 MESES OU < 5 KG",
      "USO ORAL",
      {
       "kg": 15,
       "conc": 500,
       "gotas": 20,
       "un": "GOTAS",
       "max": 1000
      }
     ],
     [
      "PARACETAMOL 200 MG/ML SOLUÇÃO ORAL (GOTAS)",
      "01 FRASCO",
      "DAR {DOSE} VIA ORAL DE 6/6H SE DOR OU FEBRE (15 MG/KG/DOSE; CALCULADO PARA 15 GOTAS/ML — CONFERIR NA BULA DO FABRICANTE)",
      "USO ORAL",
      {
       "kg": 15,
       "conc": 200,
       "gotas": 15,
       "un": "GOTAS",
       "max": 750
      }
     ]
    ]
   },
   {
    "label": "Analgesia via oral por peso (queimadura menor ou após estabilização) — escolha 1",
    "mode": "ped",
    "sec": "offlabel",
    "draft": true,
    "menu": true,
    "items": [
     [
      "DIPIRONA 500 MG/ML SOLUÇÃO ORAL (GOTAS)",
      "01 FRASCO",
      "DAR {DOSE} VIA ORAL DE 6/6H SE DOR OU FEBRE (15 MG/KG/DOSE). NÃO USAR EM < 3 MESES OU < 5 KG",
      "USO ORAL",
      {
       "kg": 15,
       "conc": 500,
       "gotas": 20,
       "un": "GOTAS",
       "max": 1000
      }
     ],
     [
      "PARACETAMOL 200 MG/ML SOLUÇÃO ORAL (GOTAS)",
      "01 FRASCO",
      "DAR {DOSE} VIA ORAL DE 6/6H SE DOR OU FEBRE (15 MG/KG/DOSE; CALCULADO PARA 15 GOTAS/ML — CONFERIR NA BULA DO FABRICANTE)",
      "USO ORAL",
      {
       "kg": 15,
       "conc": 200,
       "gotas": 15,
       "un": "GOTAS",
       "max": 750
      }
     ]
    ]
   },
   {
    "label": "ATB EV somente se infecção da queimadura/celulite — escolha 1",
    "mode": "ped_internacao",
    "sec": "offlabel",
    "draft": true,
    "menu": true,
    "items": [
     [
      "CEFAZOLINA 1 G PÓ PARA SOLUÇÃO INJETÁVEL",
      "01 FRASCO-AMPOLA",
      "RECONSTITUIR E ADMINISTRAR {DOSE} EV DE 8/8H, DILUÍDO EM SF 0,9%, EM 30 MIN (30 MG/KG/DOSE = 90 MG/KG/DIA)",
      "USO ENDOVENOSO",
      {
       "kg": 30,
       "un": "MG",
       "max": 2000
      }
     ],
     [
      "CLINDAMICINA 600 MG/4 ML SOLUÇÃO INJETÁVEL",
      "01 AMPOLA",
      "DILUIR EM SF 0,9% E ADMINISTRAR {DOSE} EV EM 30 MIN DE 6/6H — ALERGIA GRAVE A BETALACTÂMICO (10 MG/KG/DOSE = 40 MG/KG/DIA)",
      "USO ENDOVENOSO",
      {
       "kg": 10,
       "un": "MG",
       "max": 600
      }
     ]
    ],
    "orient": [
     "ANTIBIÓTICO PROFILÁTICO NÃO É INDICADO — USAR SÓ SE CELULITE PERILESIONAL, SECREÇÃO PURULENTA OU SINAIS SISTÊMICOS DE INFECÇÃO, APÓS COLHER CULTURAS",
     "FEBRE ALTA COM EXANTEMA, HIPOTENSÃO, VÔMITOS OU DIARREIA NOS PRIMEIROS DIAS, MESMO EM QUEIMADURA PEQUENA: SUSPEITAR DE SÍNDROME DO CHOQUE TÓXICO"
    ]
   },
   {
    "label": "2º grau superficial, pequena e limpa — curativo não aderente com petrolato (alternativa à sulfadiazina)",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "GAZE NÃO ADERENTE IMPREGNADA COM PETROLATO (TIPO RAYON OU GAZE VASELINADA)",
      "CONFORME O TAMANHO DA LESÃO",
      "APÓS LAVAR COM ÁGUA CORRENTE OU SF 0,9%, COBRIR A QUEIMADURA COM A GAZE NÃO ADERENTE E GAZE SECA POR CIMA; TROCAR A CADA 01 A 03 DIAS OU SE MOLHAR OU SUJAR, ATÉ CICATRIZAR",
      "USO TÓPICO"
     ]
    ],
    "orient": [
     "CURATIVO NÃO ADERENTE NÃO PRECISA DE POMADA; SE A FERIDA FICAR COM PUS, MAU CHEIRO OU VERMELHIDÃO AO REDOR, VOLTAR PARA REAVALIAR"
    ]
   },
   {
    "label": "Padrão — Curativo da queimadura de 2º grau pequena (criança) — escolha 1",
    "mode": "ped",
    "draft": true,
    "menu": true,
    "items": [
     [
      "SULFADIAZINA DE PRATA 10MG/G",
      "01 BISNAGA",
      "APLICAR UMA CAMADA FINA NA LESÃO E COBRIR COM GAZE, 01 A 02 VEZES AO DIA, APÓS LAVAR, ATÉ CICATRIZAR. NÃO USAR EM MENORES DE 2 MESES OU SE ALERGIA A SULFA",
      "USO TÓPICO"
     ],
     [
      "GAZE NÃO ADERENTE IMPREGNADA COM PETROLATO (TIPO RAYON OU GAZE VASELINADA)",
      "CONFORME O TAMANHO DA LESÃO",
      "APÓS LAVAR COM ÁGUA CORRENTE OU SF 0,9%, COBRIR A QUEIMADURA COM A GAZE NÃO ADERENTE E GAZE SECA POR CIMA; TROCAR A CADA 01 A 03 DIAS OU SE MOLHAR OU SUJAR, ATÉ CICATRIZAR (OPÇÃO PARA MENORES DE 2 MESES OU 2º GRAU SUPERFICIAL LIMPO)",
      "USO TÓPICO"
     ]
    ],
    "orient": [
     "LAVAR A QUEIMADURA COM ÁGUA CORRENTE E SABÃO NEUTRO (OU SORO FISIOLÓGICO) ANTES DE CADA TROCA DE CURATIVO. NÃO FURAR BOLHAS ÍNTEGRAS. NÃO APLICAR PASTA DE DENTE, MANTEIGA, PÓ DE CAFÉ OU OUTRAS RECEITAS CASEIRAS",
     "CONFERIR A CADERNETA: QUEIMADURA É FERIMENTO DE ALTO RISCO PARA TÉTANO — VACINAR SE ESQUEMA INCOMPLETO OU ÚLTIMA DOSE HÁ MAIS DE 05 ANOS",
     "RETORNAR EM 48 A 72H PARA REAVALIAÇÃO DO CURATIVO, OU IMEDIATAMENTE SE FEBRE, PUS, MAU CHEIRO, VERMELHIDÃO QUE SE ESPALHA AO REDOR OU PIORA DA DOR",
     "FEBRE ALTA COM MANCHAS VERMELHAS NO CORPO, VÔMITOS, DIARREIA OU MOLEZA NOS PRIMEIROS DIAS, MESMO COM QUEIMADURA PEQUENA: VOLTAR NA HORA",
     "QUEIMADURA DE 2º GRAU EM 10% OU MAIS DO CORPO, 3º GRAU, EM FACE, MÃOS, PÉS, GENITAIS OU ARTICULAÇÕES, ELÉTRICA OU QUÍMICA: ENCAMINHAR AO CENTRO DE QUEIMADOS"
    ]
   }
  ]
 },
 {
  "id": "resfriado",
  "ic": "🤧",
  "nm": "Resfriado comum",
  "sub": "soro fisiológico nasal · dipirona · paracetamol",
  "blocks": [
   {
    "label": "Padrão — Soro fisiológico nasal",
    "draft": true,
    "items": [
     [
      "CLORETO DE SÓDIO 0,9% SOLUÇÃO NASAL",
      "01 FRASCO",
      "APLICAR 02 JATOS EM CADA NARINA ATÉ 06 VEZES AO DIA, PARA LIMPEZA E DESOBSTRUÇÃO NASAL",
      "USO INTRANASAL"
     ]
    ],
    "orient": [
     "REPOUSO, BOA HIDRATAÇÃO E ALIMENTAÇÃO LEVE; OS SINTOMAS DURAM EM MÉDIA 07 A 10 DIAS E A TOSSE PODE PERSISTIR POR ATÉ 03 SEMANAS",
     "ANTIBIÓTICO NÃO É NECESSÁRIO (INFECÇÃO VIRAL); PARA A TOSSE, PODE USAR MEL (01 COLHER DE CHÁ ATÉ 03 VEZES AO DIA) E BEBIDAS MORNAS",
     "LAVAR AS MÃOS COM FREQUÊNCIA, COBRIR BOCA E NARIZ AO TOSSIR E USAR MÁSCARA PERTO DE IDOSOS, GESTANTES OU IMUNOSSUPRIMIDOS",
     "RETORNAR SE: FALTA DE AR, DOR NO PEITO, FEBRE POR MAIS DE 03 DIAS, PIORA APÓS MELHORA INICIAL, DOR FORTE NA FACE OU NO OUVIDO, OU SINTOMAS POR MAIS DE 10 DIAS"
    ]
   },
   {
    "label": "Padrão — Analgésico / antitérmico — escolha 1",
    "draft": true,
    "menu": true,
    "items": [
     [
      "DIPIRONA 500 MG",
      "01 CAIXA",
      "TOMAR 02 COMPRIMIDOS SE DOR OU FEBRE, PODENDO REPETIR DE 6/6H"
     ],
     [
      "PARACETAMOL 750 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO SE DOR OU FEBRE, PODENDO REPETIR DE 6/6H. INTERCALAR COM DIPIRONA, SE NECESSÁRIO."
     ]
    ]
   },
   {
    "label": "Combinação pronta — sintomáticos + lavagem nasal",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "DIPIRONA 500 MG",
      "01 CAIXA",
      "TOMAR 02 COMPRIMIDOS SE DOR OU FEBRE, PODENDO REPETIR DE 6/6H"
     ],
     [
      "CLORETO DE SÓDIO 0,9% SOLUÇÃO NASAL",
      "01 FRASCO",
      "APLICAR 02 JATOS EM CADA NARINA ATÉ 06 VEZES AO DIA, PARA LIMPEZA E DESOBSTRUÇÃO NASAL",
      "USO INTRANASAL"
     ]
    ]
   },
   {
    "label": "Opção 1 — dipirona + soro fisiológico nasal em spray",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "DIPIRONA 500MG",
      "01 CAIXA",
      "TOMAR 02 COMPRIMIDOS SE FEBRE OU DOR, PODENDO REPETIR DE 06/06H"
     ],
     [
      "CLORETO DE SÓDIO 0,9% SOLUÇÃO NASAL (SPRAY)",
      "01 FRASCO",
      "APLICAR 01 JATO EM CADA NARINA 05 VEZES AO DIA",
      "USO INTRANASAL"
     ]
    ]
   },
   {
    "label": "Opção 3 — soro fisiológico nasal em jato contínuo",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "CLORETO DE SÓDIO 0,9% SOLUÇÃO NASAL (JATO CONTÍNUO)",
      "01 FRASCO",
      "APLICAR 01 JATO EM CADA NARINA 05 VEZES AO DIA",
      "USO INTRANASAL"
     ]
    ]
   },
   {
    "label": "Opção 4 — lavagem nasal com seringa e soro fisiológico",
    "sec": "offlabel",
    "items": [
     [
      "SERINGA DE 10 ML",
      "01 UNIDADE",
      "",
      "USO INTRANASAL"
     ],
     [
      "SOLUÇÃO FISIOLÓGICA 0,9%",
      "01 FRASCO",
      "",
      "USO INTRANASAL"
     ]
    ],
    "orient": [
     "ASPIRAR A SOLUÇÃO FISIOLÓGICA COM A SERINGA E, COM O PACIENTE EM PÉ, INJETAR EM CADA NARINA (NÃO TAPAR A OUTRA), TRÊS VEZES SEGUIDAS, DUAS VEZES AO DIA. É NORMAL ENGOLIR OU A SECREÇÃO SAIR PELO OUTRO LADO",
     "PARA NÃO MACHUCAR O NARIZ, PODE COLOCAR NA PONTA DA SERINGA UMA OLIVA DE ESTETOSCÓPIO (VENDE EM CASAS DE MATERIAL MÉDICO) OU UMA BORRACHA LIMPA DE FONE DE OUVIDO",
     "GUARDAR O SORO NA GELADEIRA E LAVAR O MATERIAL COM ÁGUA E SABÃO"
    ]
   },
   {
    "label": "Analgésico/antitérmico — escolha 1",
    "sec": "offlabel",
    "menu": true,
    "items": [
     [
      "DIPIRONA 500 MG",
      "01 CAIXA",
      "TOMAR 02 COMPRIMIDOS SE DOR OU FEBRE, PODENDO REPETIR DE 6/6H"
     ],
     [
      "PARACETAMOL 750 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO SE DOR OU FEBRE, PODENDO REPETIR DE 6/6H. INTERCALAR COM DIPIRONA, SE NECESSÁRIO."
     ]
    ]
   },
   {
    "label": "Padrão — lavagem nasal",
    "mode": "ped",
    "draft": true,
    "items": [
     [
      "CLORETO DE SÓDIO 0,9% SOLUÇÃO NASAL",
      "01 FRASCO",
      "INSTILAR 01 A 03 ML EM CADA NARINA (COM SERINGA SEM AGULHA OU CONTA-GOTAS) ATÉ 06 VEZES AO DIA, PRINCIPALMENTE ANTES DAS MAMADAS E DE DORMIR",
      "USO INTRANASAL"
     ]
    ],
    "orient": [
     "OFERECER LÍQUIDOS COM FREQUÊNCIA E MANTER O ALEITAMENTO MATERNO. OS SINTOMAS DURAM 07 A 10 DIAS E A TOSSE PODE PERSISTIR POR ATÉ 03 SEMANAS",
     "ANTIBIÓTICO NÃO É NECESSÁRIO. NÃO USAR XAROPES PARA TOSSE, DESCONGESTIONANTES OU ANTI-HISTAMÍNICOS EM MENORES DE 6 ANOS. ACIMA DE 1 ANO, PODE USAR MEL (1/2 A 1 COLHER DE CHÁ) PARA A TOSSE; NUNCA DAR MEL A MENORES DE 1 ANO",
     "NÃO USAR AAS (RISCO DE SÍNDROME DE REYE). LAVAR AS MÃOS COM FREQUÊNCIA E COBRIR BOCA E NARIZ AO TOSSIR",
     "RETORNAR IMEDIATAMENTE SE: RESPIRAÇÃO RÁPIDA OU COM ESFORÇO, CHIADO, LÁBIOS ROXOS, FEBRE POR MAIS DE 03 DIAS OU QUALQUER FEBRE EM MENOR DE 3 MESES, SONOLÊNCIA, RECUSA ALIMENTAR, MENOS XIXI, DOR DE OUVIDO OU PIORA APÓS MELHORA INICIAL"
    ]
   },
   {
    "label": "Padrão — antitérmico/analgésico se febre ou desconforto — escolha 1",
    "mode": "ped",
    "draft": true,
    "menu": true,
    "items": [
     [
      "DIPIRONA 500 MG/ML SOLUÇÃO ORAL (GOTAS)",
      "01 FRASCO",
      "DAR {DOSE} VIA ORAL ATÉ DE 6/6H SE DOR OU FEBRE (15 MG/KG/DOSE; NÃO USAR EM MENORES DE 3 MESES OU COM MENOS DE 5 KG)",
      "USO ORAL",
      {
       "kg": 15,
       "conc": 500,
       "gotas": 20,
       "un": "GOTAS",
       "max": 1000
      }
     ],
     [
      "PARACETAMOL 200 MG/ML SOLUÇÃO ORAL (GOTAS)",
      "01 FRASCO",
      "DAR {DOSE} VIA ORAL ATÉ DE 6/6H SE DOR OU FEBRE (15 MG/KG/DOSE)",
      "USO ORAL",
      {
       "kg": 15,
       "conc": 200,
       "gotas": 15,
       "un": "GOTAS",
       "max": 750
      }
     ],
     [
      "IBUPROFENO 100 MG/ML SUSPENSÃO ORAL (GOTAS)",
      "01 FRASCO",
      "DAR {DOSE} VIA ORAL ATÉ DE 8/8H SE DOR OU FEBRE, APÓS ALIMENTAÇÃO (10 MG/KG/DOSE; SOMENTE A PARTIR DE 6 MESES; NÃO USAR SE SUSPEITA DE DENGUE, DESIDRATAÇÃO OU VÔMITOS)",
      "USO ORAL",
      {
       "kg": 10,
       "conc": 100,
       "gotas": 10,
       "un": "GOTAS",
       "max": 400
      }
     ]
    ],
    "orient": [
     "TRATAR O DESCONFORTO, NÃO O NÚMERO DO TERMÔMETRO; NÃO ALTERNAR ANTITÉRMICOS DE ROTINA",
     "NÃO USAR IBUPROFENO SE SUSPEITA DE DENGUE, DESIDRATAÇÃO OU VÔMITOS. CONFERIR A CONCENTRAÇÃO DO FRASCO ANTES DE PINGAR"
    ]
   },
   {
    "label": "Do material do Drive — AINE se dor ou mal-estar: ibuprofeno 600 mg por até 3 dias",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "IBUPROFENO 600 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO DE 8/8H, APÓS AS REFEIÇÕES, SE DOR OU MAL-ESTAR, POR ATÉ 03 DIAS. NÃO USAR SE SUSPEITA DE DENGUE, DOENÇA RENAL, ÚLCERA OU GESTAÇÃO",
      "USO ORAL"
     ]
    ]
   },
   {
    "label": "Do material do Drive — Nariz muito entupido (adulto): oximetazolina por no máximo 3 dias",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "OXIMETAZOLINA 0,05% SOLUÇÃO NASAL",
      "01 FRASCO",
      "APLICAR 02 A 03 GOTAS (OU JATOS) EM CADA NARINA DE 12/12H SE NARIZ MUITO ENTUPIDO, POR NO MÁXIMO 03 DIAS. NÃO USAR SE HIPERTENSÃO NÃO CONTROLADA, GLAUCOMA DE ÂNGULO FECHADO OU USO DE ANTIDEPRESSIVO IMAO; NÃO USAR EM CRIANÇAS",
      "USO INTRANASAL"
     ]
    ]
   }
  ]
 },
 {
  "id": "rinite",
  "ic": "👃",
  "nm": "Rinite alérgica",
  "sub": "fluticasona · soro fisiológico · loratadina · cetirizina",
  "blocks": [
   {
    "label": "Padrão — Corticoide nasal",
    "draft": true,
    "items": [
     [
      "FLUTICASONA SPRAY 50MCG/JATO",
      "01 FRASCO",
      "APLICAR 1 JATO EM CADA NARINA DE 12/12H POR 15 DIAS. APÓS ESTE PERÍODO, APLICAR UM JATO EM CADA NARINA PELA MANHÃ ATÉ COMPLETAR 90 DIAS",
      "USO INTRANASAL"
     ]
    ],
    "orient": [
     "USAR O CORTICOIDE NASAL TODOS OS DIAS, MESMO SEM SINTOMAS (EFEITO PLENO EM 01 A 02 SEMANAS), DIRECIONANDO O JATO PARA A LATERAL DA NARINA (EM DIREÇÃO À ORELHA), LONGE DO SEPTO",
     "CONTROLE AMBIENTAL: EVITAR POEIRA, MOFO, FUMAÇA DE CIGARRO, PERFUMES E PELOS DE ANIMAIS; LAVAR ROUPAS DE CAMA SEMANALMENTE E MANTER O QUARTO AREJADO, SEM TAPETES OU CORTINAS",
     "NÃO USAR DESCONGESTIONANTE NASAL (NAFAZOLINA, OXIMETAZOLINA) POR CONTA PRÓPRIA — CAUSA EFEITO REBOTE E DEPENDÊNCIA",
     "ACOMPANHAR NA UBS. PROCURAR ATENDIMENTO SE CHIADO NO PEITO OU FALTA DE AR, FEBRE COM DOR NA FACE E SECREÇÃO PURULENTA POR MAIS DE 10 DIAS OU SANGRAMENTO NASAL FREQUENTE"
    ]
   },
   {
    "label": "Padrão — Lavagem nasal",
    "draft": true,
    "items": [
     [
      "CLORETO DE SÓDIO 0,9% SOLUÇÃO NASAL (SORO FISIOLÓGICO)",
      "01 FRASCO",
      "LAVAR CADA NARINA COM 10 A 20 ML (COM SERINGA SEM AGULHA OU FRASCO LAVADOR) 02 A 03 VEZES AO DIA, ANTES DE APLICAR O CORTICOIDE NASAL",
      "USO INTRANASAL"
     ]
    ]
   },
   {
    "label": "Padrão — Anti-histamínico — escolha 1",
    "draft": true,
    "menu": true,
    "items": [
     [
      "LORATADINA 10 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO AO DIA, NO MESMO HORÁRIO, POR 05 DIAS APÓS ESTE PERÍODO, TOMAR 01 COMPRIMIDO SE COCEIRA OU ESPIRROS, PODENDO REPETIR A DOSE 24/24H SE NECESSÁRIO"
     ],
     [
      "CETIRIZINA 10MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO AO DIA, NO MESMO HORÁRIO, POR 05 DIAS APÓS ESTE PERÍODO, TOMAR 01 COMPRIMIDO SE COCEIRA OU ESPIRROS, PODENDO REPETIR A DOSE 24/24H SE NECESSÁRIO"
     ]
    ]
   },
   {
    "label": "Combinação pronta — corticoide nasal + lavagem nasal + anti-histamínico",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "FLUTICASONA SPRAY 50MCG/JATO",
      "01 FRASCO",
      "APLICAR 1 JATO EM CADA NARINA DE 12/12H POR 15 DIAS. APÓS ESTE PERÍODO, APLICAR UM JATO EM CADA NARINA PELA MANHÃ ATÉ COMPLETAR 90 DIAS",
      "USO INTRANASAL"
     ],
     [
      "CLORETO DE SÓDIO 0,9% SOLUÇÃO NASAL (SORO FISIOLÓGICO)",
      "01 FRASCO",
      "LAVAR CADA NARINA COM 10 A 20 ML (COM SERINGA SEM AGULHA OU FRASCO LAVADOR) 02 A 03 VEZES AO DIA, ANTES DE APLICAR O CORTICOIDE NASAL",
      "USO INTRANASAL"
     ],
     [
      "LORATADINA 10 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO AO DIA, NO MESMO HORÁRIO, POR 05 DIAS APÓS ESTE PERÍODO, TOMAR 01 COMPRIMIDO SE COCEIRA OU ESPIRROS, PODENDO REPETIR A DOSE 24/24H SE NECESSÁRIO"
     ]
    ]
   },
   {
    "label": "Opção 2 — obstrução nasal intensa (adulto sem hipertensão): fexofenadina + pseudoefedrina por até 07 dias",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "FEXOFENADINA 60MG + PSEUDOEFEDRINA 120MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO DE 12/12H POR ATÉ 07 DIAS, SE OBSTRUÇÃO NASAL INTENSA. NÃO USAR SE HIPERTENSÃO, DOENÇA CORONARIANA, ARRITMIA, GLAUCOMA, HIPERTIREOIDISMO, RETENÇÃO URINÁRIA, GESTAÇÃO OU USO DE IMAO; SOMENTE A PARTIR DE 12 ANOS",
      "USO ORAL"
     ]
    ]
   },
   {
    "label": "Anti-histamínico — escolha 1",
    "sec": "offlabel",
    "menu": true,
    "items": [
     [
      "LORATADINA 10 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO AO DIA, NO MESMO HORÁRIO, POR 05 DIAS APÓS ESTE PERÍODO, TOMAR 01 COMPRIMIDO SE COCEIRA OU ESPIRROS, PODENDO REPETIR A DOSE 24/24H SE NECESSÁRIO"
     ],
     [
      "CETIRIZINA 10MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO AO DIA, NO MESMO HORÁRIO, POR 05 DIAS APÓS ESTE PERÍODO, TOMAR 01 COMPRIMIDO SE COCEIRA OU ESPIRROS, PODENDO REPETIR A DOSE 24/24H SE NECESSÁRIO"
     ]
    ]
   },
   {
    "label": "Padrão — corticoide nasal + lavagem nasal",
    "mode": "ped",
    "draft": true,
    "items": [
     [
      "MOMETASONA SPRAY NASAL 50 MCG/JATO",
      "01 FRASCO",
      "2 A 11 ANOS: APLICAR 01 JATO EM CADA NARINA 01 VEZ AO DIA. 12 ANOS OU MAIS: 02 JATOS EM CADA NARINA 01 VEZ AO DIA. USO DIÁRIO POR 90 DIAS, DEPOIS REAVALIAR",
      "USO INTRANASAL"
     ],
     [
      "CLORETO DE SÓDIO 0,9% SOLUÇÃO NASAL (SORO FISIOLÓGICO)",
      "01 FRASCO",
      "LAVAR CADA NARINA COM 05 A 10 ML (SERINGA SEM AGULHA OU FRASCO LAVADOR) 02 A 03 VEZES AO DIA, ANTES DO CORTICOIDE NASAL (LACTENTES: 01 A 02 ML POR NARINA; MAIORES DE 6 ANOS: ATÉ 20 ML)",
      "USO INTRANASAL"
     ]
    ],
    "orient": [
     "USAR O CORTICOIDE NASAL TODOS OS DIAS, MESMO SEM SINTOMAS (EFEITO PLENO EM 01 A 02 SEMANAS), DIRECIONANDO O JATO PARA A LATERAL DA NARINA, LONGE DO SEPTO",
     "CONTROLE AMBIENTAL: EVITAR POEIRA, MOFO, FUMAÇA DE CIGARRO, PERFUMES E PELOS DE ANIMAIS; LAVAR ROUPAS DE CAMA SEMANALMENTE E MANTER O QUARTO AREJADO, SEM TAPETES, CORTINAS OU BICHOS DE PELÚCIA",
     "NÃO USAR DESCONGESTIONANTE NASAL (NAFAZOLINA, OXIMETAZOLINA): RISCO DE INTOXICAÇÃO GRAVE EM CRIANÇAS, EFEITO REBOTE E DEPENDÊNCIA",
     "ACOMPANHAR NA UBS (MEDIR A ALTURA EM USO PROLONGADO DE CORTICOIDE). PROCURAR ATENDIMENTO SE CHIADO NO PEITO OU FALTA DE AR, RONCO COM PAUSAS NA RESPIRAÇÃO, FEBRE COM SECREÇÃO PURULENTA POR MAIS DE 10 DIAS OU SANGRAMENTO NASAL FREQUENTE"
    ]
   },
   {
    "label": "Padrão — anti-histamínico oral de 2ª geração — escolha 1",
    "mode": "ped",
    "draft": true,
    "menu": true,
    "items": [
     [
      "DESLORATADINA 0,5 MG/ML XAROPE",
      "01 FRASCO",
      "TOMAR 01 VEZ AO DIA POR 14 DIAS, DEPOIS SE SINTOMAS: 6 A 11 MESES: 2 ML (1 MG); 1 A 5 ANOS: 2,5 ML (1,25 MG); 6 A 11 ANOS: 5 ML (2,5 MG); 12 ANOS OU MAIS: 10 ML (5 MG)",
      "USO ORAL"
     ],
     [
      "LORATADINA 1 MG/ML XAROPE",
      "01 FRASCO",
      "TOMAR 01 VEZ AO DIA POR 14 DIAS, DEPOIS SE SINTOMAS (A PARTIR DE 2 ANOS): {FAIXA}",
      "USO ORAL",
      {
       "sem_peso": "ATÉ 30 KG: 5 ML (5 MG); ACIMA DE 30 KG: 10 ML (10 MG)",
       "faixas": [
        {
         "ate": 30,
         "txt": "5 ML (5 MG)"
        },
        {
         "acima": 30,
         "txt": "10 ML (10 MG)"
        }
       ]
      }
     ],
     [
      "DICLORIDRATO DE CETIRIZINA 1 MG/ML SOLUÇÃO ORAL",
      "01 FRASCO",
      "TOMAR POR 14 DIAS, DEPOIS SE SINTOMAS (A PARTIR DE 2 ANOS): 2 A 5 ANOS: 2,5 ML (2,5 MG) DE 12/12H; 6 A 11 ANOS: 5 ML (5 MG) DE 12/12H; 12 ANOS OU MAIS: 10 ML (10 MG) 01 VEZ AO DIA",
      "USO ORAL"
     ]
    ],
    "orient": [
     "PODE CAUSAR SONOLÊNCIA LEVE (MAIS COM CETIRIZINA). CONFERIR A CONCENTRAÇÃO DO FRASCO ANTES DE MEDIR"
    ]
   },
   {
    "label": "Corticoide nasal alternativo — escolha 1",
    "mode": "ped",
    "sec": "offlabel",
    "draft": true,
    "menu": true,
    "items": [
     [
      "FUROATO DE FLUTICASONA 27,5 MCG/JATO SUSPENSÃO NASAL (SPRAY)",
      "01 FRASCO",
      "2 A 11 ANOS: APLICAR 01 JATO EM CADA NARINA 01 VEZ AO DIA. 12 ANOS OU MAIS: 02 JATOS EM CADA NARINA 01 VEZ AO DIA. USO DIÁRIO POR 90 DIAS, DEPOIS REAVALIAR",
      "USO INTRANASAL"
     ],
     [
      "PROPIONATO DE FLUTICASONA 50 MCG/JATO SUSPENSÃO NASAL (SPRAY)",
      "01 FRASCO",
      "4 A 11 ANOS: APLICAR 01 JATO EM CADA NARINA 01 VEZ AO DIA. 12 ANOS OU MAIS: 02 JATOS EM CADA NARINA 01 VEZ AO DIA. USO DIÁRIO POR 90 DIAS, DEPOIS REAVALIAR",
      "USO INTRANASAL"
     ]
    ]
   },
   {
    "label": "Do material do Drive — Corticoide nasal alternativo: budesonida",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "BUDESONIDA 50 MCG/DOSE SUSPENSÃO NASAL (SPRAY)",
      "01 FRASCO",
      "APLICAR 02 JATOS EM CADA NARINA 01 VEZ AO DIA, PELA MANHÃ, TODOS OS DIAS, MESMO SEM SINTOMAS; APÓS O CONTROLE, PODE REDUZIR PARA 01 JATO EM CADA NARINA AO DIA. REAVALIAR EM 90 DIAS",
      "USO INTRANASAL"
     ]
    ]
   },
   {
    "label": "Sem controle com o corticoide nasal isolado (moderada a grave, a partir de 12 anos): azelastina + fluticasona nasal",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "AZELASTINA 137 MCG + PROPIONATO DE FLUTICASONA 50 MCG/JATO SUSPENSÃO NASAL (SPRAY)",
      "01 FRASCO",
      "APLICAR 01 JATO EM CADA NARINA DE 12/12H, TODOS OS DIAS, NO LUGAR DO CORTICOIDE NASAL ISOLADO (A PARTIR DE 12 ANOS). PODE CAUSAR GOSTO AMARGO E SONOLÊNCIA LEVE",
      "USO INTRANASAL"
     ]
    ],
    "orient": [
     "SE O CORTICOIDE NASAL ISOLADO NÃO CONTROLAR OS SINTOMAS APÓS 02 A 04 SEMANAS DE USO CORRETO, A COMBINAÇÃO NASAL DE ANTI-HISTAMÍNICO + CORTICOIDE É A OPÇÃO SEGUINTE (ARIA-EAACI 2024–2025)"
    ]
   }
  ]
 },
 {
  "id": "rinossinusite",
  "ic": "👃",
  "nm": "Rinossinusite",
  "sub": "soro fisiológico · fluticasona · dipirona · amoxicilina",
  "blocks": [
   {
    "label": "Padrão — Lavagem nasal + corticoide nasal",
    "draft": true,
    "items": [
     [
      "SERINGA DE 10 ML",
      "01 UNIDADE",
      "",
      "USO INTRANASAL"
     ],
     [
      "SOLUÇÃO FISIOLÓGICA 0,9%",
      "01 FRASCO",
      "",
      "USO INTRANASAL"
     ],
     [
      "FLUTICASONA SPRAY 50MCG/JATO",
      "01 FRASCO",
      "APLICAR 1 JATO EM CADA NARINA DE 12/12H POR 15 DIAS",
      "USO INTRANASAL"
     ]
    ],
    "orient": [
     "ASPIRAR O SORO COM A SERINGA, RETIRAR A AGULHA E INJETAR EM CADA NARINA (SEM TAPAR A OUTRA), ESTANDO COM A BOCA ABERTA, TRÊS VEZES AO DIA",
     "É NORMAL ENGOLIR OU A SECREÇÃO SAIR PELO OUTRO LADO",
     "GUARDAR O SORO NA GELADEIRA E LAVAR O MATERIAL COM ÁGUA E SABÃO",
     "RETORNAR PARA REAVALIAÇÃO EM CASO DE PIORA APÓS O QUINTO DIA OU SE PERSISTIR POR MAIS DE 10 DIAS, OU ANTES EM CASO DE DÚVIDA",
     "RETORNAR IMEDIATAMENTE SE INCHAÇO OU VERMELHIDÃO AO REDOR DOS OLHOS, VISÃO DUPLA OU EMBAÇADA, DOR DE CABEÇA MUITO FORTE, RIGIDEZ NA NUCA, CONFUSÃO MENTAL OU FEBRE ALTA PERSISTENTE"
    ]
   },
   {
    "label": "Padrão — Analgésico / antitérmico — escolha 1",
    "draft": true,
    "menu": true,
    "items": [
     [
      "DIPIRONA 500MG",
      "01 CAIXA",
      "TOMAR 02 COMPRIMIDOS SE FEBRE OU DOR, PODENDO REPETIR DE 06/06H"
     ],
     [
      "PARACETAMOL 750 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO SE DOR OU FEBRE, PODENDO REPETIR DE 6/6H. INTERCALAR COM DIPIRONA, SE NECESSÁRIO."
     ]
    ]
   },
   {
    "label": "Padrão — se bacteriana (> 10 dias, piora bifásica ou quadro grave): antibiótico 07 dias — escolha 1",
    "draft": true,
    "menu": true,
    "items": [
     [
      "AMOXICILINA 500 MG",
      "21 CÁPSULAS",
      "TOMAR 01 CÁPSULA DE 8/8H POR 07 DIAS. HORÁRIO SUGERIDO: 06:00 / 14:00 / 22:00"
     ],
     [
      "AMOXICILINA 875 MG + CLAVULANATO DE POTÁSSIO 125 MG",
      "14 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO DE 12/12H, NO INÍCIO DAS REFEIÇÕES, POR 07 DIAS. HORÁRIO SUGERIDO: 08:00 / 20:00"
     ],
     [
      "DOXICICLINA 100 MG",
      "14 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO DE 12/12H POR 07 DIAS, COM 01 COPO CHEIO DE ÁGUA, SEM DEITAR NOS 30 MINUTOS SEGUINTES. HORÁRIO SUGERIDO: 08:00 / 20:00"
     ]
    ],
    "orient": [
     "ADULTO COM RINOSSINUSITE BACTERIANA NÃO COMPLICADA: PODE-SE OBSERVAR SEM ANTIBIÓTICO (LAVAGEM NASAL, CORTICOIDE NASAL E ANALGÉSICO) SE O RETORNO FOR GARANTIDO; INICIAR O ANTIBIÓTICO SE PIORAR OU NÃO MELHORAR EM 07 DIAS (AAO-HNS 2025)",
     "NÃO USAR MACROLÍDEO (AZITROMICINA, CLARITROMICINA) NEM SULFAMETOXAZOL + TRIMETOPRIMA: ALTA RESISTÊNCIA DO PNEUMOCOCO",
     "SEM MELHORA APÓS 72H DE ANTIBIÓTICO: REAVALIAR E TROCAR (AMOXICILINA → AMOXICILINA + CLAVULANATO; ALÉRGICO → DOXICICLINA OU CEFUROXIMA)"
    ]
   },
   {
    "label": "Combinação pronta — viral/pós-viral: lavagem nasal + corticoide nasal + analgésico (sem antibiótico)",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "DIPIRONA 500MG",
      "01 CAIXA",
      "TOMAR 02 COMPRIMIDOS SE FEBRE OU DOR, PODENDO REPETIR DE 06/06H"
     ],
     [
      "FLUTICASONA SPRAY 50MCG/JATO",
      "01 FRASCO",
      "APLICAR 1 JATO EM CADA NARINA DE 12/12H POR 15 DIAS",
      "USO INTRANASAL"
     ],
     [
      "SERINGA DE 10 ML",
      "01 UNIDADE",
      "",
      "USO INTRANASAL"
     ],
     [
      "SOLUÇÃO FISIOLÓGICA 0,9%",
      "01 FRASCO",
      "",
      "USO INTRANASAL"
     ]
    ]
   },
   {
    "label": "Opção 1 — sintomáticos + antitussígeno (levodropropizina) se tosse seca intensa",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "DIPIRONA 500MG",
      "01 CAIXA",
      "TOMAR 02 COMPRIMIDOS SE FEBRE OU DOR, PODENDO REPETIR DE 06/06H"
     ],
     [
      "FLUTICASONA SPRAY 50MCG/JATO",
      "01 FRASCO",
      "APLICAR 1 JATO EM CADA NARINA DE 12/12H POR 15 DIAS",
      "USO INTRANASAL"
     ],
     [
      "LEVODROPROPIZINA XAROPE 6MG/ML",
      "01 FRASCO",
      "TOMAR 10 ML (60 MG) SE TOSSE SECA, PODENDO REPETIR ATÉ DE 8/8 HORAS (MÁXIMO 03 VEZES AO DIA)",
      "USO ORAL"
     ]
    ]
   },
   {
    "label": "RSBA — rinossinusite bacteriana aguda: amoxicilina 07 dias + sintomáticos",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "AMOXICILINA 500 MG",
      "21 CÁPSULAS",
      "TOMAR 01 CÁPSULA DE 8/8H POR 07 DIAS. HORÁRIO SUGERIDO: 06:00 / 14:00 / 22:00"
     ],
     [
      "DIPIRONA 500MG",
      "01 CAIXA",
      "TOMAR 02 COMPRIMIDOS SE FEBRE OU DOR, PODENDO REPETIR DE 06/06H"
     ],
     [
      "FLUTICASONA SPRAY 50MCG/JATO",
      "01 FRASCO",
      "APLICAR 1 JATO EM CADA NARINA DE 12/12H POR 15 DIAS",
      "USO INTRANASAL"
     ],
     [
      "CLORETO DE SÓDIO 0,9% SOLUÇÃO NASAL (SPRAY)",
      "01 FRASCO",
      "APLICAR 01 JATO EM CADA NARINA CONFORME NECESSIDADE, PARA DESOBSTRUIR (CERCA DE 05 VEZES AO DIA)",
      "USO INTRANASAL"
     ]
    ]
   },
   {
    "label": "Analgésico/antitérmico — escolha 1",
    "sec": "offlabel",
    "menu": true,
    "items": [
     [
      "DIPIRONA 500 MG",
      "01 CAIXA",
      "TOMAR 02 COMPRIMIDOS SE DOR OU FEBRE, PODENDO REPETIR DE 6/6H"
     ],
     [
      "PARACETAMOL 750 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO SE DOR OU FEBRE, PODENDO REPETIR DE 6/6H. INTERCALAR COM DIPIRONA, SE NECESSÁRIO."
     ]
    ]
   },
   {
    "label": "Padrão — rinossinusite bacteriana complicada (orbitária/intracraniana) ou grave: ceftriaxona + metronidazol EV",
    "mode": "internacao",
    "draft": true,
    "items": [
     [
      "CEFTRIAXONA 1 G PÓ PARA SOLUÇÃO INJETÁVEL",
      "02 FRASCOS-AMPOLA",
      "ADMINISTRAR 2 G EV 01 VEZ AO DIA, DILUÍDO EM 100 ML DE SF 0,9%, EM 30 MINUTOS; SE COMPLICAÇÃO INTRACRANIANA SUSPEITA OU CONFIRMADA: 2 G EV DE 12/12H",
      "USO ENDOVENOSO"
     ],
     [
      "METRONIDAZOL 500 MG/100 ML SOLUÇÃO INJETÁVEL (BOLSA)",
      "01 BOLSA 100 ML",
      "ADMINISTRAR 500 MG EV DE 8/8H, EM 60 MINUTOS",
      "USO ENDOVENOSO"
     ],
     [
      "DIPIRONA 500 MG/ML SOLUÇÃO INJETÁVEL (AMPOLA 2 ML)",
      "01 AMPOLA",
      "ADMINISTRAR 1 G (2 ML) EV, DILUÍDO EM 10 ML DE ÁGUA PARA INJETÁVEIS, LENTAMENTE, ATÉ DE 6/6H SE DOR OU FEBRE",
      "USO ENDOVENOSO"
     ],
     [
      "SOLUÇÃO FISIOLÓGICA 0,9%",
      "01 FRASCO",
      "APLICAR 10 ML EM CADA NARINA COM SERINGA SEM AGULHA, PARA LAVAGEM NASAL, 03 A 04 VEZES AO DIA",
      "USO INTRANASAL"
     ]
    ],
    "orient": [
     "INDICAÇÃO DE INTERNAÇÃO: EDEMA/ERITEMA PERIORBITÁRIO, PROPTOSE, DOR À MOVIMENTAÇÃO OCULAR, OFTALMOPLEGIA, DIPLOPIA OU BAIXA VISUAL; CEFALEIA INTENSA, RIGIDEZ DE NUCA, ALTERAÇÃO DE CONSCIÊNCIA OU DÉFICIT FOCAL; TUMEFAÇÃO FRONTAL (TUMOR DE POTT); TOXEMIA OU IMUNOSSUPRESSÃO",
     "SOLICITAR TC DE SEIOS DA FACE E ÓRBITAS COM CONTRASTE (TC/RM DE CRÂNIO SE SINAIS NEUROLÓGICOS), HEMOCULTURAS ANTES DO ANTIBIÓTICO E AVALIAÇÃO URGENTE DA OTORRINOLARINGOLOGIA E OFTALMOLOGIA",
     "MONITORAR ACUIDADE VISUAL, REFLEXOS PUPILARES, MOTILIDADE OCULAR E NÍVEL DE CONSCIÊNCIA A CADA 04-06H; PIORA VISUAL OU NEUROLÓGICA, ABSCESSO ORBITÁRIO/SUBPERIOSTEAL OU INTRACRANIANO: DRENAGEM CIRÚRGICA URGENTE",
     "REAVALIAR EM 48H; APÓS MELHORA, TRANSIÇÃO PARA AMOXICILINA + CLAVULANATO 875/125 MG VO DE 12/12H, TOTAL DE 10 A 14 DIAS (COMPLICAÇÃO INTRACRANIANA: 04 A 08 SEMANAS, CONFORME NEUROCIRURGIA/INFECTOLOGIA)",
     "ELEVAR A CABECEIRA E MANTER HIDRATAÇÃO; RINOSSINUSITE NÃO COMPLICADA É TRATADA AMBULATORIALMENTE"
    ]
   },
   {
    "label": "Complicação intracraniana, sepse ou risco de MRSA: associar vancomicina",
    "mode": "internacao",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "VANCOMICINA 500 MG PÓ PARA SOLUÇÃO INJETÁVEL",
      "02 A 03 FRASCOS-AMPOLA (CONFORME DOSE)",
      "ADMINISTRAR {DOSE} EV DE 12/12H (15 MG/KG/DOSE; NA COMPLICAÇÃO INTRACRANIANA 15-20 MG/KG DE 8/8H A 12/12H), DILUÍDO EM SF 0,9% (ATÉ 5 MG/ML), EM NO MÍNIMO 60 MINUTOS — AJUSTAR POR NÍVEL SÉRICO E FUNÇÃO RENAL",
      "USO ENDOVENOSO",
      {
       "kg": 15,
       "un": "MG",
       "max": 2000
      }
     ]
    ],
    "orient": [
     "MANTER CEFTRIAXONA 2 G DE 12/12H + METRONIDAZOL; ABSCESSO CEREBRAL OU EMPIEMA: NEUROCIRURGIA",
     "COLHER NÍVEL SÉRICO (VALE OU AUC 400-600) ANTES DA 4ª DOSE E MONITORAR CREATININA"
    ]
   },
   {
    "label": "Alergia grave (anafilaxia) a betalactâmicos: levofloxacino EV",
    "mode": "internacao",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "LEVOFLOXACINO 500 MG/100 ML SOLUÇÃO INJETÁVEL (BOLSA)",
      "01 BOLSA 100 ML",
      "ADMINISTRAR 500 MG EV 01 VEZ AO DIA, EM 60 MINUTOS",
      "USO ENDOVENOSO"
     ]
    ],
    "orient": [
     "NA COMPLICAÇÃO ORBITÁRIA/INTRACRANIANA, ASSOCIAR METRONIDAZOL 500 MG EV DE 8/8H E VANCOMICINA (BLOCO PRÓPRIO)",
     "CEFALOSPORINA DE CADEIA LATERAL DIFERENTE (CEFTRIAXONA) PODE SER USADA NA MAIORIA DOS ALÉRGICOS À PENICILINA — AVALIAR CASO A CASO"
    ]
   },
   {
    "label": "Padrão — viral/pós-viral: lavagem nasal com soro fisiológico (sem antibiótico)",
    "mode": "ped",
    "draft": true,
    "items": [
     [
      "SOLUÇÃO FISIOLÓGICA 0,9%",
      "01 FRASCO",
      "APLICAR 02 A 05 ML (LACTENTES) OU 05 A 10 ML (CRIANÇAS MAIORES) EM CADA NARINA, 03 A 04 VEZES AO DIA, ANTES DAS MAMADAS E AO DEITAR",
      "USO INTRANASAL"
     ],
     [
      "SERINGA DE 10 ML",
      "01 UNIDADE",
      "UTILIZAR SEM AGULHA PARA A LAVAGEM NASAL COM A SOLUÇÃO FISIOLÓGICA",
      "USO INTRANASAL"
     ]
    ],
    "orient": [
     "OFERECER LÍQUIDOS COM FREQUÊNCIA E MANTER A CABECEIRA ELEVADA; GUARDAR O SORO NA GELADEIRA E LAVAR A SERINGA COM ÁGUA E SABÃO",
     "NÃO USAR ANTI-HISTAMÍNICOS, DESCONGESTIONANTES (ORAIS OU NASAIS), MUCOLÍTICOS NEM AAS EM CRIANÇAS",
     "ANTIBIÓTICO SÓ SE BACTERIANA: SINTOMAS POR MAIS DE 10 DIAS SEM MELHORA, PIORA APÓS MELHORA INICIAL OU QUADRO GRAVE (FEBRE ≥ 39 °C E SECREÇÃO PURULENTA POR 03 DIAS OU MAIS)",
     "RETORNAR IMEDIATAMENTE SE INCHAÇO OU VERMELHIDÃO AO REDOR DOS OLHOS, DOR AO MEXER OS OLHOS, VISÃO DUPLA, DOR DE CABEÇA FORTE, RIGIDEZ NA NUCA, VÔMITOS, SONOLÊNCIA OU FEBRE PERSISTENTE",
     "SE EM USO DE ANTIBIÓTICO E SEM MELHORA EM 72H, REAVALIAR (TROCAR PARA AMOXICILINA + CLAVULANATO EM DOSE ALTA)"
    ]
   },
   {
    "label": "Padrão — se bacteriana (> 10 dias, piora bifásica ou quadro grave): antibiótico 10 dias — escolha 1",
    "mode": "ped",
    "draft": true,
    "menu": true,
    "items": [
     [
      "AMOXICILINA 400 MG/5 ML SUSPENSÃO ORAL",
      "02 FRASCOS",
      "DAR {DOSE} VIA ORAL DE 12/12H POR 10 DIAS (45 MG/KG/DIA; MÁXIMO 875 MG POR DOSE)",
      "USO ORAL",
      {
       "kgdia": 45,
       "vezes": 2,
       "conc": 80,
       "un": "ML",
       "max": 875
      }
     ],
     [
      "AMOXICILINA 600 MG + CLAVULANATO DE POTÁSSIO 42,9 MG/5 ML SUSPENSÃO ORAL",
      "02 FRASCOS",
      "DAR {DOSE} VIA ORAL DE 12/12H, NO INÍCIO DAS REFEIÇÕES, POR 10 DIAS (90 MG/KG/DIA DE AMOXICILINA) — SE < 02 ANOS, CRECHE, ANTIBIÓTICO NOS ÚLTIMOS 30 DIAS, QUADRO MODERADO/GRAVE OU FALHA EM 72H",
      "USO ORAL",
      {
       "kgdia": 90,
       "vezes": 2,
       "conc": 120,
       "un": "ML",
       "max": 2000
      }
     ]
    ]
   },
   {
    "label": "Padrão — antitérmico/analgésico — escolha 1",
    "mode": "ped",
    "draft": true,
    "menu": true,
    "items": [
     [
      "DIPIRONA 500 MG/ML SOLUÇÃO ORAL (GOTAS)",
      "01 FRASCO",
      "DAR {DOSE} VIA ORAL DE 6/6H SE DOR OU FEBRE (15 MG/KG/DOSE) — NÃO USAR EM MENORES DE 03 MESES OU COM MENOS DE 5 KG",
      "USO ORAL",
      {
       "kg": 15,
       "conc": 500,
       "gotas": 20,
       "un": "GOTAS",
       "max": 1000
      }
     ],
     [
      "PARACETAMOL 200 MG/ML SOLUÇÃO ORAL (GOTAS)",
      "01 FRASCO",
      "DAR {DOSE} VIA ORAL ATÉ DE 6/6H SE DOR OU FEBRE (15 MG/KG/DOSE) — CÁLCULO PARA 15 GOTAS/ML: CONFERIR O GOTEJADOR DO FABRICANTE",
      "USO ORAL",
      {
       "kg": 15,
       "conc": 200,
       "gotas": 15,
       "un": "GOTAS",
       "max": 750
      }
     ]
    ]
   },
   {
    "label": "Alergia à penicilina: cefuroxima 10 dias",
    "mode": "ped",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "CEFUROXIMA 250 MG/5 ML SUSPENSÃO ORAL",
      "02 FRASCOS",
      "DAR {DOSE} VIA ORAL DE 12/12H, APÓS AS REFEIÇÕES, POR 10 DIAS (30 MG/KG/DIA)",
      "USO ORAL",
      {
       "kgdia": 30,
       "vezes": 2,
       "conc": 50,
       "un": "ML",
       "max": 500
      }
     ]
    ],
    "orient": [
     "CEFALOSPORINA COM CADEIA LATERAL DIFERENTE DA AMOXICILINA: BAIXO RISCO DE REAÇÃO CRUZADA, INCLUSIVE APÓS REAÇÃO GRAVE (AVALIAR CASO A CASO)",
     "NÃO USAR MACROLÍDEOS NEM SULFAMETOXAZOL + TRIMETOPRIMA (ALTA RESISTÊNCIA DO PNEUMOCOCO E DO H. INFLUENZAE)"
    ]
   },
   {
    "label": "Complicação orbitária ou intracraniana (internação): ceftriaxona + metronidazol EV",
    "mode": "ped_internacao",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "CEFTRIAXONA 1 G PÓ PARA SOLUÇÃO INJETÁVEL",
      "01 FRASCO-AMPOLA",
      "ADMINISTRAR {DOSE} EV DE 12/12H, DILUÍDO EM SF 0,9%, EM 30 MINUTOS (100 MG/KG/DIA)",
      "USO ENDOVENOSO",
      {
       "kg": 50,
       "un": "MG",
       "max": 2000
      }
     ],
     [
      "METRONIDAZOL 500 MG/100 ML SOLUÇÃO INJETÁVEL (BOLSA)",
      "01 BOLSA 100 ML",
      "ADMINISTRAR {DOSE} EV DE 8/8H, EM 60 MINUTOS (30 MG/KG/DIA)",
      "USO ENDOVENOSO",
      {
       "kgdia": 30,
       "vezes": 3,
       "un": "MG",
       "max": 500
      }
     ]
    ],
    "orient": [
     "TC DE SEIOS DA FACE E ÓRBITAS COM CONTRASTE E AVALIAÇÃO URGENTE DE OTORRINO E OFTALMOLOGIA (± NEUROCIRURGIA); MONITORAR ACUIDADE VISUAL, PUPILAS, MOTILIDADE OCULAR E NÍVEL DE CONSCIÊNCIA",
     "COMPLICAÇÃO INTRACRANIANA, SEPSE OU SUSPEITA DE S. AUREUS RESISTENTE: ASSOCIAR VANCOMICINA 15 MG/KG/DOSE EV DE 6/6H (MÁXIMO 1 G/DOSE)",
     "CELULITE PRÉ-SEPTAL LEVE EM CRIANÇA EM BOM ESTADO PODE SER TRATADA COM AMOXICILINA + CLAVULANATO VO E REAVALIAÇÃO EM 24-48H"
    ]
   },
   {
    "label": "Do material do Drive — Alergia não grave à penicilina: cefuroxima por 7 dias",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "CEFUROXIMA 500 MG",
      "14 COMPRIMIDOS",
      "SE ALERGIA NÃO GRAVE (SEM ANAFILAXIA) À PENICILINA: TOMAR 01 COMPRIMIDO DE 12/12H, APÓS AS REFEIÇÕES, POR 07 DIAS. HORÁRIO SUGERIDO: 08:00 / 20:00",
      "USO ORAL"
     ]
    ]
   }
  ]
 },
 {
  "id": "sua",
  "ic": "🩸",
  "nm": "Sangramento uterino anormal",
  "sub": "ácido tranexâmico · ibuprofeno · levonorgestrel + etinilestradiol",
  "blocks": [
   {
    "label": "Padrão — ácido tranexâmico + AINE (não hormonal)",
    "draft": true,
    "items": [
     [
      "ÁCIDO TRANEXÂMICO 250 MG",
      "60 COMPRIMIDOS",
      "TOMAR 04 COMPRIMIDOS (1 G) DE 8/8H POR ATÉ 05 DIAS, ENQUANTO HOUVER SANGRAMENTO INTENSO"
     ],
     [
      "IBUPROFENO 300 MG",
      "01 CAIXA",
      "TOMAR 02 COMPRIMIDOS DE 6/6H POR 05 DIAS"
     ],
     [
      "SULFATO FERROSO",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO UMA VEZ AO DIA, 01 HORA ANTES OU 02 HORAS DEPOIS DO ALMOÇO, DE PREFERÊNCIA COM SUCO DE LARANJA OU LIMÃO"
     ]
    ],
    "orient": [
     "SOLICITO: USG PÉLVICA TRANSABDOMINAL E TRANSVAGINAL",
     "JUSTIFICATIVA: SANGRAMENTO UTERINO ANORMAL",
     "SOLICITO: HEMOGRAMA, FERRITINA E BETA-HCG",
     "AGENDAR CONSULTA NA UBS/GINECOLOGIA PARA INVESTIGAR A CAUSA E DEFINIR O TRATAMENTO DE MANUTENÇÃO (EX: DIU HORMONAL OU ANTICONCEPCIONAL)",
     "RETORNAR IMEDIATAMENTE SE SANGRAMENTO MUITO INTENSO (ENCHARCAR 01 ABSORVENTE POR HORA POR 02 HORAS SEGUIDAS), TONTURA, DESMAIO, FALTA DE AR OU PALPITAÇÕES"
    ]
   },
   {
    "label": "Padrão — hormonal — escolha 1",
    "draft": true,
    "menu": true,
    "items": [
     [
      "LEVONORGESTREL + ETINILESTRADIOL 0,15MG + 0,03MG",
      "02 CARTELAS",
      "TOMAR 01 COMPRIMIDO DE 8/8H POR 07 DIAS (1ª CARTELA); A SEGUIR, 01 COMPRIMIDO AO DIA POR 21 DIAS (2ª CARTELA)"
     ],
     [
      "ACETATO DE MEDROXIPROGESTERONA 10 MG",
      "42 COMPRIMIDOS",
      "TOMAR 02 COMPRIMIDOS DE 8/8H POR 07 DIAS"
     ]
    ],
    "orient": [
     "NÃO USAR ANTICONCEPCIONAL COMBINADO SE FUMANTE COM 35 ANOS OU MAIS, ENXAQUECA COM AURA, TROMBOSE ATUAL OU PRÉVIA, PRESSÃO ALTA NÃO CONTROLADA OU DOENÇA GRAVE DO FÍGADO — NESSES CASOS, USAR MEDROXIPROGESTERONA",
     "CÂNCER DE MAMA ATUAL OU RECENTE: NÃO USAR HORMÔNIO (NEM COMBINADO, NEM PROGESTÁGENO) — PREFERIR ÁCIDO TRANEXÂMICO/AINE E ENCAMINHAR À GINECOLOGIA",
     "ÁCIDO TRANEXÂMICO JUNTO COM ANTICONCEPCIONAL COMBINADO SÓ COM ORIENTAÇÃO MÉDICA (A BULA PEDE CAUTELA PELO RISCO DE TROMBOSE)"
    ]
   },
   {
    "label": "AINE (anti-inflamatório não esteroidal) — escolha 1",
    "sec": "offlabel",
    "menu": true,
    "items": [
     [
      "NAPROXENO SÓDICO 500 MG",
      "10 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO DE 12/12H, APÓS AS REFEIÇÕES, DURANTE O SANGRAMENTO, POR ATÉ 05 DIAS",
      "USO ORAL"
     ],
     [
      "IBUPROFENO 300 MG",
      "01 CAIXA",
      "TOMAR 02 COMPRIMIDOS DE 6/6H POR 05 DIAS"
     ]
    ]
   },
   {
    "label": "Do material do Drive — AINE alternativo: ácido mefenâmico",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "ÁCIDO MEFENÂMICO 500 MG",
      "15 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO DE 8/8H, APÓS AS REFEIÇÕES, DURANTE O SANGRAMENTO, POR ATÉ 05 DIAS",
      "USO ORAL"
     ]
    ]
   },
   {
    "label": "Padrão — sangramento agudo intenso (estável): ácido tranexâmico EV",
    "mode": "internacao",
    "draft": true,
    "items": [
     [
      "ÁCIDO TRANEXÂMICO 50 MG/ML SOLUÇÃO INJETÁVEL (AMPOLA 5 ML = 250 MG)",
      "03 AMPOLAS POR DOSE",
      "ADMINISTRAR {DOSE} (10 MG/KG; MÁXIMO 600 MG = 12 ML) EV LENTO, NO MÁXIMO 1 ML/MIN, OU DILUÍDO EM 100 ML DE SF 0,9% EM 15 A 20 MINUTOS, DE 8/8H ENQUANTO O SANGRAMENTO FOR INTENSO; PASSAR PARA A VIA ORAL ASSIM QUE POSSÍVEL (ATÉ 5 DIAS NO TOTAL). NÃO USAR SE TROMBOSE ATIVA OU PRÉVIA",
      "USO ENDOVENOSO",
      {
       "kg": 10,
       "conc": 50,
       "un": "ML",
       "max": 600
      }
     ]
    ],
    "orient": [
     "BETA-HCG ANTES DE TUDO: GRAVIDEZ MUDA A CONDUTA (ABORTAMENTO, ECTÓPICA)",
     "INSTÁVEL: DOIS ACESSOS CALIBROSOS, CRISTALOIDE, TIPAGEM E TRANSFUSÃO; GINECOLOGIA DE URGÊNCIA (AMIU/CURETAGEM, BALÃO INTRAUTERINO)",
     "SE SEM CONTRAINDICAÇÃO, ASSOCIAR TRATAMENTO HORMONAL ORAL: ANTICONCEPCIONAL COMBINADO 30–35 MCG DE 8/8H POR 7 DIAS OU MEDROXIPROGESTERONA 20 MG DE 8/8H POR 7 DIAS (VER AMBULATORIAL)",
     "HEMOGRAMA, COAGULOGRAMA E FIBRINOGÊNIO; SUSPEITAR DE COAGULOPATIA (VON WILLEBRAND) EM ADOLESCENTE COM SANGRAMENTO INTENSO DESDE A MENARCA"
    ]
   }
  ]
 },
 {
  "id": "sutura",
  "ic": "🩹",
  "nm": "Sutura — profilaxia",
  "sub": "dipirona · vaselina sólida · vacina dupla adulto",
  "blocks": [
   {
    "label": "Padrão — ferida limpa suturada: analgesia + cuidados locais (sem antibiótico)",
    "draft": true,
    "items": [
     [
      "DIPIRONA 500 MG",
      "01 CAIXA",
      "TOMAR 02 COMPRIMIDOS SE DOR OU FEBRE, PODENDO REPETIR DE 6/6H"
     ],
     [
      "VASELINA SÓLIDA",
      "01 POTE",
      "APLICAR UMA FINA CAMADA SOBRE A SUTURA APÓS CADA LIMPEZA, ATÉ A RETIRADA DOS PONTOS",
      "USO TÓPICO"
     ]
    ],
    "orient": [
     "MANTER O CURATIVO LIMPO E SECO NAS PRIMEIRAS 24 A 48H; DEPOIS, LAVAR DELICADAMENTE COM ÁGUA E SABÃO NEUTRO 01 A 02 VEZES AO DIA (PODE SER NO BANHO), SECAR E REFAZER O CURATIVO",
     "RETIRAR OS PONTOS NA UBS: ROSTO EM 05 DIAS; COURO CABELUDO E BRAÇOS EM 07 A 10 DIAS; TRONCO, PERNAS, MÃOS, PÉS E SOBRE ARTICULAÇÕES EM 10 A 14 DIAS",
     "LEVAR O CARTÃO DE VACINAÇÃO À UBS PARA CONFERIR E ATUALIZAR A VACINA ANTITETÂNICA (DUPLA ADULTO)",
     "RETORNAR IMEDIATAMENTE SE FEBRE, VERMELHIDÃO OU INCHAÇO QUE AUMENTA, SAÍDA DE PUS OU SECREÇÃO COM MAU CHEIRO, DOR PROGRESSIVA OU ABERTURA DOS PONTOS",
     "PROTEGER A CICATRIZ DO SOL (PROTETOR SOLAR FPS 30 OU MAIS) POR PELO MENOS 06 MESES"
    ]
   },
   {
    "label": "Padrão — se ferida de alto risco (muito contaminada, esmagamento, imunossuprimido): acrescentar antibiótico",
    "draft": true,
    "items": [
     [
      "CEFALEXINA 500 MG",
      "20 CÁPSULAS",
      "TOMAR 01 CÁPSULA DE 6/6H POR 05 DIAS HORÁRIO SUGERIDO: 06:00 / 12:00 / 18:00 / 00:00"
     ]
    ]
   },
   {
    "label": "Padrão — profilaxia antitetânica (conforme cartão vacinal e tipo de ferimento)",
    "draft": true,
    "items": [
     [
      "VACINA DUPLA ADULTO (DIFTERIA E TÉTANO) 0,5 ML",
      "01 DOSE",
      "APLICAR 0,5 ML NO DELTOIDE EM DOSE ÚNICA (REFORÇO OU INÍCIO/COMPLEMENTAÇÃO DO ESQUEMA, CONFORME CARTÃO VACINAL)",
      "USO INTRAMUSCULAR"
     ],
     [
      "IMUNOGLOBULINA HUMANA ANTITETÂNICA 250 UI",
      "01 AMPOLA",
      "APLICAR 01 AMPOLA (250 UI) EM DOSE ÚNICA NO GLÚTEO, EM LOCAL DIFERENTE DA VACINA (SE FERIMENTO DE ALTO RISCO E ESQUEMA VACINAL INCOMPLETO OU DESCONHECIDO)",
      "USO INTRAMUSCULAR"
     ]
    ]
   },
   {
    "label": "Ferida de alto risco (muito contaminada, esmagamento, mão, imunossuprimido): cefalexina 05 dias + analgésico",
    "sec": "offlabel",
    "items": [
     [
      "CEFALEXINA 500MG",
      "20 COMPRIMIDOS",
      "SÓ SE FERIDA DE ALTO RISCO: TOMAR 01 COMPRIMIDO DE 6/6H POR 05 DIAS. HORÁRIO SUGERIDO: 06:00 / 12:00 / 18:00 / 00:00",
      "USO ORAL"
     ],
     [
      "DIPIRONA 500MG",
      "01 CAIXA",
      "TOMAR 02 COMPRIMIDOS SE FEBRE OU DOR, PODENDO REPETIR DE 6/6H"
     ]
    ]
   },
   {
    "label": "Cicatriz (após a retirada dos pontos): gel de silicone",
    "sec": "offlabel",
    "items": [
     [
      "GEL DE SILICONE PARA CICATRIZES",
      "01 BISNAGA",
      "DEPOIS DA RETIRADA DOS PONTOS, COM A FERIDA FECHADA, APLICAR UMA CAMADA FINA SOBRE A CICATRIZ 02 VEZES AO DIA POR PELO MENOS 02 A 03 MESES",
      "USO TÓPICO"
     ]
    ]
   },
   {
    "label": "Imunoglobulina antitetânica (ferimento de alto risco com esquema incompleto ou desconhecido) — sempre junto com a vacina",
    "sec": "offlabel",
    "items": [
     [
      "IMUNOGLOBULINA HUMANA ANTITETÂNICA 250 UI",
      "01 AMPOLA",
      "APLICAR 01 AMPOLA (250 UI) IM EM DOSE ÚNICA, EM LOCAL DIFERENTE DA VACINA (SE FERIMENTO DE ALTO RISCO E ESQUEMA VACINAL INCOMPLETO OU DESCONHECIDO)",
      "USO INTRAMUSCULAR"
     ]
    ],
    "orient": [
     "ENCAMINHO PARA AVALIAÇÃO DE SITUAÇÃO VACINAL, EM PARTICULAR, VACINA ANTITETÂNICA APÓS FERIMENTO DE RISCO"
    ]
   },
   {
    "label": "Analgésico/antitérmico — escolha 1",
    "sec": "offlabel",
    "menu": true,
    "items": [
     [
      "DIPIRONA 500 MG",
      "01 CAIXA",
      "TOMAR 02 COMPRIMIDOS SE DOR OU FEBRE, PODENDO REPETIR DE 6/6H"
     ],
     [
      "PARACETAMOL 750 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO SE DOR OU FEBRE, PODENDO REPETIR DE 6/6H. INTERCALAR COM DIPIRONA, SE NECESSÁRIO."
     ]
    ]
   },
   {
    "label": "AINE (anti-inflamatório) — escolha 1",
    "sec": "offlabel",
    "menu": true,
    "items": [
     [
      "DICLOFENACO 50 MG",
      "15 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO DE 8/8H, POR 05 DIAS SEGUIDOS HORÁRIO SUGERIDO (8/8h): 06:00 / 14:00 / 22:00"
     ],
     [
      "IBUPROFENO 300 MG",
      "01 CAIXA",
      "TOMAR 02 COMPRIMIDOS DE 6/6H POR 05 DIAS"
     ],
     [
      "NIMESULIDA 100 MG",
      "10 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO DE 12/12H POR 05 DIAS"
     ],
     [
      "NAPROXENO SÓDICO 500 MG",
      "10 COMPRIMIDOS",
      "TOMAR UM COMPRIMIDO SE DOR, PODENDO REPETIR DE 12/12H POR ATÉ 05 DIAS SEGUIDOS"
     ]
    ]
   },
   {
    "label": "Padrão — ferida limpa suturada: analgesia + cuidados locais (sem antibiótico)",
    "mode": "ped",
    "draft": true,
    "items": [
     [
      "DIPIRONA 500 MG/ML SOLUÇÃO ORAL (GOTAS)",
      "01 FRASCO",
      "DAR {DOSE} VIA ORAL DE 6/6H SE DOR OU FEBRE (15 MG/KG/DOSE) — NÃO USAR EM MENORES DE 03 MESES OU COM MENOS DE 5 KG",
      "USO ORAL",
      {
       "kg": 15,
       "conc": 500,
       "gotas": 20,
       "un": "GOTAS",
       "max": 1000
      }
     ],
     [
      "VASELINA SÓLIDA",
      "01 POTE",
      "APLICAR UMA FINA CAMADA SOBRE A SUTURA APÓS CADA LIMPEZA, ATÉ A RETIRADA DOS PONTOS",
      "USO TÓPICO"
     ]
    ],
    "orient": [
     "MANTER O CURATIVO LIMPO E SECO NAS PRIMEIRAS 24 A 48H; DEPOIS, LAVAR DELICADAMENTE COM ÁGUA E SABÃO NEUTRO 01 A 02 VEZES AO DIA (PODE SER NO BANHO), SECAR E REFAZER O CURATIVO",
     "RETIRAR OS PONTOS NA UBS: ROSTO EM 05 DIAS; COURO CABELUDO E BRAÇOS EM 07 A 10 DIAS; TRONCO, PERNAS, MÃOS, PÉS E SOBRE ARTICULAÇÕES EM 10 A 14 DIAS",
     "LEVAR A CADERNETA DE VACINAÇÃO DA CRIANÇA À UBS PARA CONFERIR A VACINA ANTITETÂNICA",
     "RETORNAR IMEDIATAMENTE SE FEBRE, VERMELHIDÃO OU INCHAÇO QUE AUMENTA, SAÍDA DE PUS OU SECREÇÃO COM MAU CHEIRO, DOR PROGRESSIVA OU ABERTURA DOS PONTOS",
     "PROTEGER A CICATRIZ DO SOL (ROUPA/SOMBRA; PROTETOR SOLAR FPS 30 OU MAIS A PARTIR DE 06 MESES DE IDADE) POR PELO MENOS 06 MESES"
    ]
   },
   {
    "label": "Padrão — se ferida de alto risco (muito contaminada, esmagamento, imunossuprimido): acrescentar antibiótico",
    "mode": "ped",
    "draft": true,
    "items": [
     [
      "CEFALEXINA 250 MG/5 ML SUSPENSÃO ORAL",
      "01 FRASCO",
      "DAR {DOSE} VIA ORAL DE 6/6H POR 05 DIAS (50 MG/KG/DIA)",
      "USO ORAL",
      {
       "kgdia": 50,
       "vezes": 4,
       "conc": 50,
       "un": "ML",
       "max": 500
      }
     ]
    ]
   },
   {
    "label": "Padrão — profilaxia antitetânica (conforme caderneta vacinal, idade e tipo de ferimento)",
    "mode": "ped",
    "draft": true,
    "items": [
     [
      "VACINA ADSORVIDA DIFTERIA, TÉTANO E PERTUSSIS (DTP) 0,5 ML",
      "01 DOSE",
      "MENORES DE 07 ANOS: APLICAR 0,5 ML IM EM DOSE ÚNICA (VASTO LATERAL DA COXA SE < 02 ANOS; DELTOIDE NOS MAIORES), CONFORME CADERNETA VACINAL",
      "USO INTRAMUSCULAR"
     ],
     [
      "VACINA DUPLA ADULTO (DIFTERIA E TÉTANO) 0,5 ML",
      "01 DOSE",
      "A PARTIR DE 07 ANOS: APLICAR 0,5 ML NO DELTOIDE EM DOSE ÚNICA (REFORÇO OU INÍCIO/COMPLEMENTAÇÃO DO ESQUEMA, CONFORME CADERNETA VACINAL)",
      "USO INTRAMUSCULAR"
     ],
     [
      "IMUNOGLOBULINA HUMANA ANTITETÂNICA 250 UI",
      "01 AMPOLA",
      "APLICAR 01 AMPOLA (250 UI) IM EM DOSE ÚNICA, EM MEMBRO DIFERENTE DA VACINA (SE FERIMENTO DE ALTO RISCO E ESQUEMA VACINAL INCOMPLETO OU DESCONHECIDO)",
      "USO INTRAMUSCULAR"
     ]
    ],
    "orient": [
     "ESQUEMA INCERTO OU < 03 DOSES: VACINAR (INICIAR/COMPLETAR); SE FERIMENTO DE ALTO RISCO, ASSOCIAR IMUNOGLOBULINA",
     "≥ 03 DOSES: ÚLTIMA HÁ < 05 ANOS, NÃO VACINAR; ENTRE 05 E 10 ANOS, REFORÇO SÓ SE FERIMENTO DE ALTO RISCO; HÁ > 10 ANOS, REFORÇO EM QUALQUER FERIMENTO",
     "ALTO RISCO: FERIMENTO PROFUNDO OU SUJO, COM CORPO ESTRANHO OU TECIDO DESVITALIZADO, ESMAGAMENTO, MORDEDURA OU QUEIMADURA; SEM IMUNOGLOBULINA HUMANA, USAR SORO ANTITETÂNICO 5.000 UI IM"
    ]
   },
   {
    "label": "Mordedura (cão, gato, humana) ou ferida de mão de alto risco: amoxicilina + clavulanato 03 a 05 dias",
    "mode": "ped",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "AMOXICILINA 400 MG + CLAVULANATO DE POTÁSSIO 57 MG/5 ML SUSPENSÃO ORAL",
      "01 FRASCO",
      "DAR {DOSE} VIA ORAL DE 12/12H, NO INÍCIO DAS REFEIÇÕES, POR 03 A 05 DIAS (45 MG/KG/DIA DE AMOXICILINA)",
      "USO ORAL",
      {
       "kgdia": 45,
       "vezes": 2,
       "conc": 80,
       "un": "ML",
       "max": 875
      }
     ]
    ],
    "orient": [
     "AVALIAR PROFILAXIA DA RAIVA (VACINA ± SORO/IMUNOGLOBULINA) CONFORME PROTOCOLO DO MINISTÉRIO DA SAÚDE E NOTIFICAR O ATENDIMENTO ANTIRRÁBICO",
     "EVITAR SUTURA PRIMÁRIA DE MORDEDURAS EM MÃOS E PÉS (EXCETO FACE); REAVALIAR EM 24-48H"
    ]
   },
   {
    "label": "Analgésico alternativo à dipirona — escolha 1",
    "mode": "ped",
    "sec": "offlabel",
    "draft": true,
    "menu": true,
    "items": [
     [
      "PARACETAMOL 200 MG/ML SOLUÇÃO ORAL (GOTAS)",
      "01 FRASCO",
      "DAR {DOSE} VIA ORAL ATÉ DE 6/6H SE DOR OU FEBRE (15 MG/KG/DOSE) — CÁLCULO PARA 15 GOTAS/ML: CONFERIR O GOTEJADOR DO FABRICANTE",
      "USO ORAL",
      {
       "kg": 15,
       "conc": 200,
       "gotas": 15,
       "un": "GOTAS",
       "max": 750
      }
     ],
     [
      "IBUPROFENO 100 MG/ML SUSPENSÃO ORAL (GOTAS)",
      "01 FRASCO",
      "DAR {DOSE} VIA ORAL DE 8/8H SE DOR, APÓS ALIMENTAÇÃO, POR ATÉ 03 DIAS (10 MG/KG/DOSE) — SOMENTE A PARTIR DE 06 MESES",
      "USO ORAL",
      {
       "kg": 10,
       "conc": 100,
       "gotas": 10,
       "un": "GOTAS",
       "max": 400
      }
     ]
    ],
    "orient": [
     "IBUPROFENO: EVITAR SE DESIDRATAÇÃO, DOENÇA RENAL, SUSPEITA DE DENGUE OU VARICELA"
    ]
   }
  ]
 },
 {
  "id": "tinha_capitis",
  "ic": "🧑",
  "nm": "Tinha capitis",
  "sub": "griseofulvina · cetoconazol shampoo",
  "blocks": [
   {
    "label": "Padrão — griseofulvina + xampu de cetoconazol",
    "draft": true,
    "items": [
     [
      "GRISEOFULVINA 500 MG",
      "112 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO DE 12/12H, APÓS AS REFEIÇÕES (DE PREFERÊNCIA COM ALIMENTO GORDUROSO, COMO LEITE), POR 08 SEMANAS"
     ],
     [
      "CETOCONAZOL SHAMPOO 2%",
      "01 FRASCO",
      "APLICAR NO COURO CABELUDO, DEIXAR AGIR POR 10 MINUTOS ANTES DE ENXAGUAR, 2 A 3 VEZES POR SEMANA, DURANTE 4 SEMANAS",
      "USO TÓPICO"
     ]
    ],
    "orient": [
     "COLHER EXAME MICOLÓGICO DIRETO E CULTURA (PELOS E ESCAMAS DO COURO CABELUDO), DE PREFERÊNCIA ANTES DE INICIAR O TRATAMENTO",
     "EXAMINAR CONTACTANTES DA CASA E LEVAR ANIMAIS DE ESTIMAÇÃO AO VETERINÁRIO; NÃO COMPARTILHAR PENTES, ESCOVAS, BONÉS, TOALHAS E TRAVESSEIROS",
     "DURANTE A GRISEOFULVINA: EVITAR ÁLCOOL E SOL EM EXCESSO; MULHERES DEVEM EVITAR GRAVIDEZ ATÉ 01 MÊS APÓS O FIM E HOMENS NÃO DEVEM ENGRAVIDAR A PARCEIRA ATÉ 06 MESES APÓS",
     "RETORNAR SE LESÃO MUITO INFLAMADA, DOLOROSA OU COM PUS (QUÉRION), FEBRE OU MANCHAS NA PELE; REAVALIAR AO FIM DO TRATAMENTO (MANTER ATÉ CURA CLÍNICA E MICOLÓGICA)"
    ]
   },
   {
    "label": "Padrão — Trichophyton na cultura ou intolerância à griseofulvina: terbinafina",
    "draft": true,
    "items": [
     [
      "TERBINAFINA 250 MG",
      "28 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO AO DIA, NO MESMO HORÁRIO, POR 04 SEMANAS"
     ],
     [
      "CETOCONAZOL SHAMPOO 2%",
      "01 FRASCO",
      "APLICAR NO COURO CABELUDO, DEIXAR AGIR POR 10 MINUTOS ANTES DE ENXAGUAR, 2 A 3 VEZES POR SEMANA, DURANTE 4 SEMANAS",
      "USO TÓPICO"
     ]
    ]
   },
   {
    "label": "Padrão — griseofulvina + xampu de cetoconazol (08 semanas)",
    "mode": "ped",
    "draft": true,
    "items": [
     [
      "GRISEOFULVINA 500 MG",
      "CONFORME O PESO (PARA 08 SEMANAS)",
      "DAR {DOSE} VIA ORAL DE 12/12H, APÓS REFEIÇÃO COM GORDURA (EX.: LEITE INTEGRAL), POR 08 SEMANAS (25 MG/KG/DIA, MÁXIMO 1 G/DIA) — COMPRIMIDO DE 500 MG: 1/4 = 125 MG; 1/2 = 250 MG (PODE SER TRITURADO E MISTURADO AO ALIMENTO). A PARTIR DE 02 ANOS",
      "USO ORAL",
      {
       "kgdia": 25,
       "vezes": 2,
       "un": "MG",
       "max": 500
      }
     ],
     [
      "CETOCONAZOL SHAMPOO 2%",
      "01 FRASCO",
      "APLICAR NO COURO CABELUDO, DEIXAR AGIR POR 10 MINUTOS ANTES DE ENXAGUAR, 2 A 3 VEZES POR SEMANA, DURANTE 4 SEMANAS",
      "USO TÓPICO"
     ]
    ],
    "orient": [
     "COLHER EXAME MICOLÓGICO DIRETO E CULTURA (PELOS E ESCAMAS DO COURO CABELUDO), DE PREFERÊNCIA ANTES DE INICIAR O TRATAMENTO",
     "O TRATAMENTO ORAL É OBRIGATÓRIO (O XAMPU SOZINHO NÃO CURA); MANTER ATÉ CURA CLÍNICA E MICOLÓGICA E REAVALIAR AO FIM DO TRATAMENTO; GRISEOFULVINA A PARTIR DE 02 ANOS",
     "EXAMINAR CONTACTANTES DA CASA E LEVAR ANIMAIS DE ESTIMAÇÃO AO VETERINÁRIO; NÃO COMPARTILHAR PENTES, ESCOVAS, BONÉS, TOALHAS E TRAVESSEIROS; A CRIANÇA PODE IR À ESCOLA APÓS INICIAR O TRATAMENTO",
     "RETORNAR SE LESÃO MUITO INFLAMADA, DOLOROSA OU COM PUS (QUÉRION — NÃO DRENAR), FEBRE, MANCHAS NA PELE OU PELE/OLHOS AMARELADOS"
    ]
   },
   {
    "label": "Padrão — Trichophyton na cultura ou intolerância à griseofulvina: terbinafina (≥ 2 anos)",
    "mode": "ped",
    "draft": true,
    "items": [
     [
      "TERBINAFINA 250 MG",
      "01 CAIXA",
      "DAR VIA ORAL 01 VEZ AO DIA, POR 04 SEMANAS, CONFORME O PESO: {FAIXA}",
      "USO ORAL",
      {
       "sem_peso": "10 A 20 KG = 62,5 MG (1/4 COMPRIMIDO); 20 A 40 KG = 125 MG (1/2 COMPRIMIDO); ACIMA DE 40 KG = 250 MG (01 COMPRIMIDO)",
       "faixas": [
        {
         "de": 10,
         "ate": 20,
         "txt": "62,5 MG (1/4 COMPRIMIDO)"
        },
        {
         "acima": 20,
         "ate": 40,
         "txt": "125 MG (1/2 COMPRIMIDO)"
        },
        {
         "acima": 40,
         "txt": "250 MG (01 COMPRIMIDO)"
        }
       ]
      }
     ],
     [
      "CETOCONAZOL SHAMPOO 2%",
      "01 FRASCO",
      "APLICAR NO COURO CABELUDO, DEIXAR AGIR POR 10 MINUTOS ANTES DE ENXAGUAR, 2 A 3 VEZES POR SEMANA, DURANTE 4 SEMANAS",
      "USO TÓPICO"
     ]
    ],
    "orient": [
     "MICROSPORUM (GERALMENTE TRANSMITIDO POR GATO/CÃO) RESPONDE MELHOR À GRISEOFULVINA"
    ]
   }
  ]
 },
 {
  "id": "tinha_corporis",
  "ic": "🧴",
  "nm": "Tinha corporis",
  "sub": "terbinafina creme · miconazol creme",
  "blocks": [
   {
    "label": "Padrão — Antifúngico tópico — escolha 1",
    "draft": true,
    "menu": true,
    "items": [
     [
      "TERBINAFINA CREME 1%",
      "01 BISNAGA",
      "APLICAR NAS LESÕES E EM 02 CM DE PELE SÃ AO REDOR DE 12/12H POR 02 SEMANAS, MESMO QUE AS LESÕES MELHOREM ANTES",
      "USO TÓPICO"
     ],
     [
      "MICONAZOL 2% CREME",
      "01 BISNAGA",
      "APLICAR NAS LESÕES E EM 02 CM DE PELE SÃ AO REDOR DE 12/12H, MANTENDO ATÉ 02 SEMANAS APÓS O DESAPARECIMENTO DAS LESÕES (EM MÉDIA 04 SEMANAS)",
      "USO TÓPICO"
     ]
    ],
    "orient": [
     "MANTER A PELE LIMPA E BEM SECA (SECAR BEM AS DOBRAS), USAR ROUPAS LEVES DE ALGODÃO E NÃO COMPARTILHAR TOALHAS OU ROUPAS",
     "EXAMINAR PÉS, VIRILHA E UNHAS E TRATAR FOCOS ASSOCIADOS; AVALIAR ANIMAIS DE ESTIMAÇÃO COM FALHAS NO PELO",
     "NÃO USAR CREMES COM CORTICOIDE OU ASSOCIAÇÕES (EX.: CETOCONAZOL + BETAMETASONA) — MASCARAM E PIORAM A MICOSE",
     "TERBINAFINA ORAL SÓ SE LESÕES EXTENSAS OU MÚLTIPLAS, ACOMETIMENTO DE PELOS/FOLÍCULOS, IMUNOSSUPRESSÃO OU FALHA DO TRATAMENTO TÓPICO (TGO/TGP ANTES SE HEPATOPATIA OU ETILISMO)",
     "RETORNAR SE NÃO HOUVER MELHORA EM 2 A 4 SEMANAS (CONSIDERAR EXAME MICOLÓGICO DIRETO E CULTURA) OU SE DOR, CALOR, PUS OU FEBRE"
    ]
   },
   {
    "label": "Padrão — Lesões extensas ou falha do tópico: terbinafina oral",
    "draft": true,
    "items": [
     [
      "TERBINAFINA 250MG",
      "28 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO AO DIA, NO MESMO HORÁRIO, POR 28 DIAS SEGUIDOS"
     ]
    ]
   },
   {
    "label": "Lesões extensas — terbinafina oral + creme (cetirizina se coceira)",
    "sec": "offlabel",
    "items": [
     [
      "TERBINAFINA 250MG",
      "28 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO AO DIA, NO MESMO HORÁRIO, POR 28 DIAS SEGUIDOS"
     ],
     [
      "CETIRIZINA 10 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO SE COCEIRA OU ALERGIA, PODENDO REPETIR DE 24/24 SE NECESSÁRIO"
     ],
     [
      "TERBINAFINA CREME 1%",
      "01 BISNAGA",
      "APLICAR NAS ÁREAS AFETADAS DE 12/12H ATÉ MELHORA (EM MÉDIA 28 DIAS)",
      "USO TÓPICO"
     ]
    ]
   },
   {
    "label": "Anti-histamínico (coceira/alergia) — escolha 1",
    "sec": "offlabel",
    "menu": true,
    "items": [
     [
      "CETIRIZINA 10 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO SE COCEIRA OU ALERGIA, PODENDO REPETIR DE 24/24 SE NECESSÁRIO"
     ],
     [
      "LORATADINA 10 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO AO DIA, NO MESMO HORÁRIO, POR 05 DIAS APÓS ESTE PERÍODO, TOMAR 01 COMPRIMIDO SE COCEIRA OU ESPIRROS, PODENDO REPETIR A DOSE 24/24H SE NECESSÁRIO"
     ]
    ]
   },
   {
    "label": "Padrão — Antifúngico tópico — escolha 1",
    "mode": "ped",
    "draft": true,
    "menu": true,
    "items": [
     [
      "MICONAZOL 2% CREME",
      "01 BISNAGA",
      "APLICAR NAS LESÕES E EM 02 CM DE PELE SÃ AO REDOR DE 12/12H, MANTENDO ATÉ 02 SEMANAS APÓS O DESAPARECIMENTO DAS LESÕES (EM MÉDIA 04 SEMANAS)",
      "USO TÓPICO"
     ],
     [
      "TERBINAFINA CREME 1%",
      "01 BISNAGA",
      "SOMENTE ≥ 12 ANOS (BULA): APLICAR NAS LESÕES E EM 02 CM DE PELE SÃ AO REDOR DE 12/12H POR 02 SEMANAS, MESMO QUE AS LESÕES MELHOREM ANTES",
      "USO TÓPICO"
     ]
    ],
    "orient": [
     "MANTER A PELE LIMPA E BEM SECA (SECAR BEM AS DOBRAS), ROUPAS LEVES DE ALGODÃO E UNHAS CURTAS; NÃO COMPARTILHAR TOALHAS, ROUPAS, PENTES OU BONÉS",
     "EXAMINAR COURO CABELUDO, PÉS, VIRILHA E UNHAS: TINHA DO COURO CABELUDO (QUEDA DE CABELO, DESCAMAÇÃO, QUÉRION) NÃO RESPONDE A CREME E EXIGE TRATAMENTO ORAL",
     "AVALIAR ANIMAIS DE ESTIMAÇÃO COM FALHAS NO PELO (VETERINÁRIO) E CONTATOS COM LESÕES; A CRIANÇA PODE IR À ESCOLA APÓS INICIAR O TRATAMENTO (COBRIR A LESÃO EM ESPORTES DE CONTATO)",
     "NÃO USAR CREMES COM CORTICOIDE OU ASSOCIAÇÕES (EX.: CETOCONAZOL + BETAMETASONA) — MASCARAM E PIORAM A MICOSE",
     "RETORNAR SE NÃO MELHORAR EM 2 A 4 SEMANAS (CONSIDERAR EXAME MICOLÓGICO DIRETO E CULTURA), SE SURGIREM NOVAS LESÕES OU SE DOR, CALOR, PUS OU FEBRE"
    ]
   },
   {
    "label": "Padrão — Lesões extensas/múltiplas ou falha do tópico: terbinafina oral (≥ 2 anos)",
    "mode": "ped",
    "draft": true,
    "items": [
     [
      "TERBINAFINA 250 MG",
      "14 COMPRIMIDOS",
      "DAR 01 VEZ AO DIA, NO MESMO HORÁRIO, POR 02 SEMANAS (ATÉ 04 SEMANAS SE RESPOSTA INCOMPLETA), CONFORME O PESO — {FAIXA}",
      "USO ORAL",
      {
       "sem_peso": "10 A 20 KG: 1/4 DE COMPRIMIDO (62,5 MG); 20 A 40 KG: 1/2 COMPRIMIDO (125 MG); > 40 KG: 01 COMPRIMIDO (250 MG)",
       "faixas": [
        {
         "de": 10,
         "ate": 20,
         "txt": "1/4 DE COMPRIMIDO (62,5 MG)"
        },
        {
         "acima": 20,
         "ate": 40,
         "txt": "1/2 COMPRIMIDO (125 MG)"
        },
        {
         "acima": 40,
         "txt": "01 COMPRIMIDO (250 MG)"
        }
       ]
      }
     ]
    ],
    "orient": [
     "TGO/TGP E HEMOGRAMA ANTES SE HEPATOPATIA, USO DE OUTROS MEDICAMENTOS HEPATOTÓXICOS OU TRATAMENTO > 4 SEMANAS",
     "SUSPENDER E RETORNAR SE ICTERÍCIA (PELE OU OLHOS AMARELADOS), URINA ESCURA, DOR ABDOMINAL, VÔMITOS PERSISTENTES, MANCHAS OU BOLHAS NA PELE OU PERDA DO PALADAR"
    ]
   },
   {
    "label": "Do material do Drive — Fluconazol semanal (quando a terbinafina oral não pode ser usada)",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "FLUCONAZOL 150 MG",
      "04 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO 01 VEZ POR SEMANA POR 02 A 04 SEMANAS, ATÉ A CURA DAS LESÕES",
      "USO ORAL"
     ]
    ]
   }
  ]
 },
 {
  "id": "torcicolo",
  "ic": "💢",
  "nm": "Torcicolo espasmódico",
  "sub": "naproxeno · ciclobenzaprina · dipirona",
  "blocks": [
   {
    "label": "Padrão — AINE (anti-inflamatório) por curto prazo — escolha 1",
    "draft": true,
    "menu": true,
    "items": [
     [
      "NAPROXENO SÓDICO 500 MG",
      "10 COMPRIMIDOS",
      "TOMAR UM COMPRIMIDO SE DOR, PODENDO REPETIR DE 12/12H POR ATÉ 05 DIAS SEGUIDOS"
     ],
     [
      "IBUPROFENO 600 MG",
      "15 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO DE 8/8H, APÓS AS REFEIÇÕES, POR 05 DIAS"
     ],
     [
      "DICLOFENACO 50 MG",
      "15 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO DE 8/8H, POR 05 DIAS SEGUIDOS HORÁRIO SUGERIDO (8/8h): 06:00 / 14:00 / 22:00"
     ]
    ],
    "orient": [
     "APLICAR CALOR LOCAL (COMPRESSA MORNA OU BOLSA DE ÁGUA QUENTE) POR 15 A 20 MINUTOS, 3 A 4 VEZES AO DIA",
     "MANTER-SE ATIVO E MOVIMENTAR O PESCOÇO SUAVEMENTE DENTRO DO LIMITE DA DOR. NÃO USAR COLAR CERVICAL. MELHORA ESPERADA EM POUCOS DIAS, COM RESOLUÇÃO EM ATÉ 01 SEMANA",
     "CICLOBENZAPRINA CAUSA SONOLÊNCIA: NÃO DIRIGIR, NÃO OPERAR MÁQUINAS E NÃO INGERIR BEBIDA ALCOÓLICA. TOMAR O ANTI-INFLAMATÓRIO APÓS AS REFEIÇÕES",
     "RETORNAR IMEDIATAMENTE SE FEBRE, DOR DE CABEÇA INTENSA COM RIGIDEZ DE NUCA, FRAQUEZA, FORMIGAMENTO OU DOR IRRADIADA PARA OS BRAÇOS, DIFICULDADE PARA ENGOLIR OU RESPIRAR, OU SE NÃO MELHORAR EM 07 DIAS",
     "MOVIMENTOS INVOLUNTÁRIOS DO PESCOÇO APÓS USO DE METOCLOPRAMIDA OU ANTIPSICÓTICOS (REAÇÃO DISTÔNICA AGUDA) OU TORCICOLO QUE PERSISTE OU VOLTA COM FREQUÊNCIA NÃO MELHORAM COM ESTE TRATAMENTO: PROCURAR REAVALIAÇÃO MÉDICA/NEUROLOGIA"
    ]
   },
   {
    "label": "Padrão — Relaxante muscular à noite",
    "draft": true,
    "items": [
     [
      "CICLOBENZAPRINA 5 MG",
      "05 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO À NOITE, ANTES DE DORMIR, POR 05 DIAS"
     ]
    ]
   },
   {
    "label": "Padrão — Analgésico — escolha 1",
    "draft": true,
    "menu": true,
    "items": [
     [
      "DIPIRONA 500 MG",
      "01 CAIXA",
      "TOMAR 02 COMPRIMIDOS SE DOR, PODENDO REPETIR DE 6/6H SE NECESSÁRIO"
     ],
     [
      "PARACETAMOL 750 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO SE DOR OU FEBRE, PODENDO REPETIR DE 6/6H. INTERCALAR COM DIPIRONA, SE NECESSÁRIO."
     ]
    ]
   },
   {
    "label": "Combinação pronta — AINE curto + relaxante muscular à noite",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "NAPROXENO SÓDICO 500 MG",
      "10 COMPRIMIDOS",
      "TOMAR UM COMPRIMIDO SE DOR, PODENDO REPETIR DE 12/12H POR ATÉ 05 DIAS SEGUIDOS"
     ],
     [
      "CICLOBENZAPRINA 5 MG",
      "05 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO À NOITE, ANTES DE DORMIR, POR 05 DIAS"
     ],
     [
      "DIPIRONA 500 MG",
      "01 CAIXA",
      "TOMAR 02 COMPRIMIDOS SE DOR, PODENDO REPETIR DE 6/6H SE NECESSÁRIO"
     ]
    ]
   },
   {
    "label": "Ciclobenzaprina com a 1ª dose na saída do PS (modelo do médico)",
    "sec": "offlabel",
    "items": [
     [
      "CICLOBENZAPRINA 5 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO AO SAIR DA EMERGÊNCIA EM SEGUIDA, TOMAR 01 COMPRIMIDO À NOITE ANTES DE DORMIR, POR 05 DIAS SEGUIDOS"
     ]
    ]
   },
   {
    "label": "Relaxante muscular alternativo: orfenadrina + dipirona + cafeína (evitar em idosos)",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "CAFEÍNA 35MG + DIPIRONA 300MG + ORFENADRINA 50MG",
      "01 CAIXA",
      "TOMAR 01 A 02 COMPRIMIDOS SE DOR, PODENDO REPETIR DE 6/6H, POR ATÉ 05 DIAS. JÁ CONTÉM DIPIRONA: NÃO TOMAR OUTRA DIPIRONA JUNTO. EVITAR EM IDOSOS, GLAUCOMA OU DIFICULDADE PARA URINAR"
     ]
    ]
   },
   {
    "label": "Diclofenaco + ciclobenzaprina à noite",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "DICLOFENACO 50 MG",
      "15 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO DE 08/08H POR ATÉ 05 DIAS"
     ],
     [
      "CICLOBENZAPRINA 5 MG",
      "05 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO À NOITE, ANTES DE DORMIR, POR 05 DIAS"
     ]
    ]
   },
   {
    "label": "Cetoprofeno 150 mg de liberação prolongada + ciclobenzaprina à noite",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "CETOPROFENO 150 MG COMPRIMIDO DE LIBERAÇÃO PROLONGADA",
      "10 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO DE 12/12H, APÓS AS REFEIÇÕES, POR 05 DIAS (JÁ É A DOSE MÁXIMA DE 300 MG/DIA). IDOSO: NO MÁXIMO 200 MG/DIA — PREFERIR OUTRA OPÇÃO"
     ],
     [
      "CICLOBENZAPRINA 5 MG",
      "05 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO À NOITE, ANTES DE DORMIR, POR 05 DIAS"
     ]
    ]
   },
   {
    "label": "Nimesulida betaciclodextrina (AINE de 2ª linha, até 03 dias) + ciclobenzaprina à noite",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "NIMESULIDA BETACICLODEXTRINA 400 MG",
      "06 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO DE 12/12H, APÓS AS REFEIÇÕES, POR ATÉ 03 DIAS (EQUIVALE A 100 MG DE NIMESULIDA). NÃO USAR SE DOENÇA DO FÍGADO OU USO FREQUENTE DE ÁLCOOL"
     ],
     [
      "CICLOBENZAPRINA 5 MG",
      "05 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO À NOITE, ANTES DE DORMIR, POR 05 DIAS"
     ]
    ]
   },
   {
    "label": "AINE (anti-inflamatório) — escolha 1",
    "sec": "offlabel",
    "draft": true,
    "menu": true,
    "items": [
     [
      "DICLOFENACO 50 MG",
      "15 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO DE 8/8H, POR 05 DIAS SEGUIDOS HORÁRIO SUGERIDO (8/8h): 06:00 / 14:00 / 22:00"
     ],
     [
      "NIMESULIDA 100 MG",
      "10 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO DE 12/12H, APÓS AS REFEIÇÕES, POR NO MÁXIMO 05 DIAS. NÃO USAR SE DOENÇA DO FÍGADO OU USO FREQUENTE DE ÁLCOOL"
     ],
     [
      "NAPROXENO SÓDICO 500 MG",
      "10 COMPRIMIDOS",
      "TOMAR UM COMPRIMIDO SE DOR, PODENDO REPETIR DE 12/12H POR ATÉ 05 DIAS SEGUIDOS"
     ]
    ]
   },
   {
    "label": "Do material do Drive — Dor intensa no PS: dipirona + diclofenaco IM em dose única (sem corticoide)",
    "mode": "internacao",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "DIPIRONA 500 MG/ML SOLUÇÃO INJETÁVEL",
      "01 AMPOLA 2 ML",
      "ADMINISTRAR 01 G (02 ML) IM PROFUNDO NO GLÚTEO, EM DOSE ÚNICA (NÃO MISTURAR NA MESMA SERINGA DO DICLOFENACO)",
      "USO INTRAMUSCULAR"
     ],
     [
      "DICLOFENACO SÓDICO 25 MG/ML SOLUÇÃO INJETÁVEL",
      "01 AMPOLA 3 ML",
      "SE SEM CONTRAINDICAÇÃO A AINE: ADMINISTRAR 75 MG (03 ML) IM PROFUNDO NO GLÚTEO, EM DOSE ÚNICA. NÃO INICIAR OUTRO AINE NAS 12 HORAS SEGUINTES",
      "USO INTRAMUSCULAR"
     ]
    ]
   },
   {
    "label": "Padrão — Reação distônica aguda (após metoclopramida, bromoprida ou antipsicótico): anticolinérgico IM ou EV — escolha 1",
    "mode": "internacao",
    "draft": true,
    "menu": true,
    "items": [
     [
      "BIPERIDENO 5 MG/ML SOLUÇÃO INJETÁVEL",
      "01 AMPOLA 1 ML",
      "ADMINISTRAR 2,5 A 5 MG (0,5 A 01 ML) IM OU EV LENTO; SE NÃO MELHORAR, REPETIR A MESMA DOSE APÓS 30 MINUTOS (MÁXIMO 10 A 20 MG/DIA)",
      "USO INTRAMUSCULAR"
     ],
     [
      "DIFENIDRAMINA 50 MG/ML SOLUÇÃO INJETÁVEL",
      "01 AMPOLA 1 ML",
      "ADMINISTRAR 25 A 50 MG (0,5 A 01 ML) EV LENTO OU IM; SE NÃO MELHORAR, REPETIR APÓS 30 MINUTOS",
      "USO ENDOVENOSO"
     ]
    ],
    "orient": [
     "SUSPENDER O REMÉDIO QUE CAUSOU A REAÇÃO E REGISTRAR NO PRONTUÁRIO COMO REAÇÃO ADVERSA, PARA NÃO SER PRESCRITO DE NOVO",
     "A MELHORA COSTUMA OCORRER EM 10 A 30 MINUTOS; SE NÃO MELHORAR, PENSAR EM OUTRA CAUSA (TÉTANO, MENINGITE, ABSCESSO CERVICAL, LESÃO ESTRUTURAL)",
     "ESTRIDOR OU DIFICULDADE PARA RESPIRAR (DISTONIA DE LARINGE): EMERGÊNCIA — VIA AÉREA E ANTICOLINÉRGICO EV IMEDIATO",
     "NA ALTA, MANTER BIPERIDENO VIA ORAL POR 02 A 03 DIAS PARA A REAÇÃO NÃO VOLTAR (VER OUTRAS OPÇÕES)"
    ]
   },
   {
    "label": "Após reação distônica aguda tratada no PS: biperideno via oral por 03 dias",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "BIPERIDENO 2 MG",
      "06 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO DE 12/12H POR 03 DIAS, PARA A REAÇÃO NÃO VOLTAR. NÃO TOMAR MAIS O REMÉDIO QUE CAUSOU A REAÇÃO",
      "USO ORAL"
     ]
    ],
    "orient": [
     "SE OS MOVIMENTOS INVOLUNTÁRIOS VOLTAREM OU HOUVER DIFICULDADE PARA RESPIRAR OU ENGOLIR, VOLTAR IMEDIATAMENTE AO PRONTO-SOCORRO"
    ]
   },
   {
    "label": "Padrão — Reação distônica aguda na criança (metoclopramida, bromoprida, antipsicótico): biperideno ou difenidramina — escolha 1",
    "mode": "ped_internacao",
    "draft": true,
    "menu": true,
    "items": [
     [
      "BIPERIDENO 5 MG/ML SOLUÇÃO INJETÁVEL",
      "01 AMPOLA 1 ML",
      "ADMINISTRAR IM OU EV LENTO CONFORME A IDADE: MENOR DE 1 ANO ATÉ 1 MG (0,2 ML); ATÉ 6 ANOS ATÉ 2 MG (0,4 ML); ATÉ 10 ANOS ATÉ 3 MG (0,6 ML); ACIMA DE 10 ANOS, DOSE DE ADULTO (2,5 A 5 MG). SE NECESSÁRIO, REPETIR APÓS 30 MINUTOS",
      "USO INTRAMUSCULAR"
     ],
     [
      "DIFENIDRAMINA 50 MG/ML SOLUÇÃO INJETÁVEL",
      "01 AMPOLA 1 ML",
      "ADMINISTRAR {DOSE} EV LENTO OU IM; SE NÃO MELHORAR, REPETIR APÓS 30 MINUTOS (1 MG/KG/DOSE; MÁXIMO 50 MG). NÃO USAR EM RECÉM-NASCIDOS",
      "USO ENDOVENOSO",
      {
       "kg": 1,
       "conc": 50,
       "un": "ML",
       "max": 50
      }
     ]
    ],
    "orient": [
     "SUSPENDER O REMÉDIO QUE CAUSOU A REAÇÃO E REGISTRAR COMO REAÇÃO ADVERSA; METOCLOPRAMIDA É CONTRAINDICADA EM MENORES DE 1 ANO",
     "ESTRIDOR OU DIFICULDADE PARA RESPIRAR: VIA AÉREA E ANTICOLINÉRGICO EV IMEDIATO",
     "OBSERVAR POR ALGUMAS HORAS APÓS A MELHORA: A REAÇÃO PODE VOLTAR ENQUANTO O REMÉDIO CAUSADOR AINDA AGE"
    ]
   }
  ]
 },
 {
  "id": "tce",
  "ic": "🤕",
  "nm": "TCE — analgesia e orientações",
  "sub": "dipirona · paracetamol",
  "blocks": [
   {
    "label": "Padrão — Analgésico / antitérmico — escolha 1",
    "draft": true,
    "menu": true,
    "items": [
     [
      "DIPIRONA 500 MG",
      "01 CAIXA",
      "TOMAR 02 COMPRIMIDOS SE DOR OU FEBRE, PODENDO REPETIR DE 6/6H"
     ],
     [
      "PARACETAMOL 750 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO SE DOR OU FEBRE, PODENDO REPETIR DE 6/6H. INTERCALAR COM DIPIRONA, SE NECESSÁRIO."
     ]
    ],
    "orient": [
     "PERMANECER ACOMPANHADO POR UM ADULTO RESPONSÁVEL NAS PRIMEIRAS 24 HORAS; NÃO INGERIR BEBIDAS ALCOÓLICAS, NÃO USAR CALMANTES OU REMÉDIOS PARA DORMIR E NÃO DIRIGIR ATÉ MELHORA COMPLETA",
     "REPOUSO RELATIVO NOS PRIMEIROS 02 DIAS COM RETORNO GRADUAL ÀS ATIVIDADES; EVITAR ESPORTES DE CONTATO ATÉ LIBERAÇÃO MÉDICA",
     "DOR DE CABEÇA LEVE, TONTURA, CANSAÇO E DIFICULDADE DE CONCENTRAÇÃO PODEM DURAR ALGUMAS SEMANAS; PROCURAR A UBS SE PERSISTIREM POR MAIS DE 02 SEMANAS",
     "SE FERIMENTO NO COURO CABELUDO: LAVAR DELICADAMENTE COM ÁGUA E SABÃO NEUTRO DURANTE O BANHO E RETIRAR OS PONTOS EM 07 A 10 DIAS NA UBS",
     "RETORNAR IMEDIATAMENTE SE: SONOLÊNCIA EXCESSIVA OU DIFICULDADE PARA ACORDAR, CONFUSÃO, DOR DE CABEÇA QUE PIORA, VÔMITOS REPETIDOS, CONVULSÃO, FRAQUEZA OU FORMIGAMENTO, ALTERAÇÃO DA FALA OU DA VISÃO, SAÍDA DE LÍQUIDO OU SANGUE PELO NARIZ OU OUVIDO"
    ]
   },
   {
    "label": "Combinação pronta — TCE leve: analgesia simples + vigilância domiciliar",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "DIPIRONA 500 MG",
      "01 CAIXA",
      "TOMAR 02 COMPRIMIDOS SE DOR OU FEBRE, PODENDO REPETIR DE 6/6H"
     ]
    ]
   },
   {
    "label": "Ferimento de couro cabeludo — analgesia e cuidados com a ferida",
    "sec": "offlabel",
    "items": [
     [
      "DIPIRONA 500MG",
      "01 CAIXA",
      "TOMAR 02 COMPRIMIDOS SE FEBRE OU DOR, PODENDO REPETIR DE 6/6H"
     ],
     [
      "CLOREXIDINA SPRAY",
      "01 FRASCO",
      "APLICAR 02 JATOS NA LESÃO, TRÊS VEZES AO DIA, ATÉ MELHORA",
      "USO TÓPICO"
     ]
    ],
    "orient": [
     "LAVAR DELICADAMENTE DURANTE O BANHO COM ÁGUA E SABÃO NEUTRO, PELA MANHÃ E À NOITE, E TROCAR O CURATIVO A CADA LAVAGEM; RETIRAR OS PONTOS EM 07 A 10 DIAS NA UBS",
     "RETORNAR À EMERGÊNCIA SE SONOLÊNCIA OU DIFICULDADE PARA ACORDAR, CONFUSÃO, DOR DE CABEÇA QUE PIORA, VÔMITOS REPETIDOS, CONVULSÃO, FRAQUEZA, ALTERAÇÃO DA FALA OU DA VISÃO, SAÍDA DE LÍQUIDO OU SANGUE PELO NARIZ OU OUVIDO, OU SE A FERIDA FICAR VERMELHA, QUENTE, COM PUS OU ABRIR"
    ]
   },
   {
    "label": "Analgésico/antitérmico — escolha 1",
    "sec": "offlabel",
    "menu": true,
    "items": [
     [
      "DIPIRONA 500 MG",
      "01 CAIXA",
      "TOMAR 02 COMPRIMIDOS SE DOR OU FEBRE, PODENDO REPETIR DE 6/6H"
     ],
     [
      "PARACETAMOL 750 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO SE DOR OU FEBRE, PODENDO REPETIR DE 6/6H. INTERCALAR COM DIPIRONA, SE NECESSÁRIO."
     ]
    ]
   },
   {
    "label": "Padrão — TCE leve em observação: vigilância neurológica + sintomáticos EV",
    "mode": "internacao",
    "draft": true,
    "items": [
     [
      "DIPIRONA 500 MG/ML SOLUÇÃO INJETÁVEL",
      "01 AMPOLA 2 ML",
      "ADMINISTRAR 1 G (2 ML) EV DILUÍDO EM 100 ML DE SF 0,9%, EM 15 MIN, DE 6/6H SE DOR OU FEBRE",
      "USO ENDOVENOSO"
     ],
     [
      "ONDANSETRONA 2 MG/ML SOLUÇÃO INJETÁVEL",
      "01 AMPOLA 2 ML",
      "ADMINISTRAR 4 MG (2 ML) EV LENTAMENTE ATÉ DE 8/8H SE NÁUSEAS OU VÔMITOS",
      "USO ENDOVENOSO"
     ],
     [
      "CLORETO DE SÓDIO 0,9% (SORO FISIOLÓGICO)",
      "01 BOLSA 500 ML",
      "SE JEJUM OU VÔMITOS: INFUNDIR 500 ML EV DE 8/8H (MANUTENÇÃO). EVITAR SOLUÇÕES HIPOTÔNICAS (SG 5%, SF 0,45%)",
      "USO ENDOVENOSO"
     ]
    ],
    "orient": [
     "GLASGOW, PUPILAS, FORÇA E SINAIS VITAIS DE 30/30 MIN ATÉ GLASGOW 15; DEPOIS DE 30/30 MIN POR 2H, DE 1/1H POR 4H E DE 2/2H A SEGUIR",
     "CABECEIRA A 30°; EVITAR SEDATIVOS, OPIOIDES E AINES (PODEM MASCARAR PIORA NEUROLÓGICA OU AUMENTAR SANGRAMENTO)",
     "CHAMAR O MÉDICO E REPETIR TC DE CRÂNIO SE QUEDA DE ≥ 1 PONTO NO GLASGOW, ANISOCORIA, DÉFICIT FOCAL NOVO, CEFALEIA PROGRESSIVA, VÔMITOS REPETIDOS, CONVULSÃO OU AGITAÇÃO",
     "EM USO DE ANTICOAGULANTE OU ANTIAGREGANTE (EXCETO AAS ISOLADO), SEM OUTRA INDICAÇÃO DE TC: CONSIDERAR TC DE CRÂNIO EM ATÉ 8H DO TRAUMA; SE SANGRAMENTO INTRACRANIANO, REVERTER A ANTICOAGULAÇÃO E ACIONAR NEUROCIRURGIA",
     "ALTA SE GLASGOW 15 SUSTENTADO, TC NORMAL OU SEM INDICAÇÃO, SEM VÔMITOS E COM ADULTO RESPONSÁVEL POR 24H; ATUALIZAR PROFILAXIA ANTITETÂNICA SE FERIMENTO"
    ]
   },
   {
    "label": "TCE moderado/grave: profilaxia de crise convulsiva precoce por 07 dias — escolha 1",
    "mode": "internacao",
    "sec": "offlabel",
    "draft": true,
    "menu": true,
    "items": [
     [
      "FENITOÍNA 50 MG/ML SOLUÇÃO INJETÁVEL",
      "AMPOLAS DE 5 ML CONFORME DOSE",
      "ATAQUE: {DOSE} EV DILUÍDO EM 100 A 250 ML DE SF 0,9% (NUNCA EM SORO GLICOSADO), NO MÁXIMO 50 MG/MIN (IDOSOS 25 MG/MIN), COM MONITORIZAÇÃO DE ECG E PA (20 MG/KG; MÁXIMO 1.500 MG). MANUTENÇÃO: 100 MG EV DE 8/8H POR 07 DIAS",
      "USO ENDOVENOSO",
      {
       "kg": 20,
       "un": "MG",
       "max": 1500
      }
     ],
     [
      "LEVETIRACETAM 100 MG/ML SOLUÇÃO INJETÁVEL",
      "01 FRASCO-AMPOLA 5 ML",
      "ADMINISTRAR 500 MG EV DE 12/12H, DILUÍDO EM 100 ML DE SF 0,9%, EM 15 MIN, POR 07 DIAS (CLCR < 50 ML/MIN: AJUSTAR DOSE)",
      "USO ENDOVENOSO"
     ]
    ],
    "orient": [
     "PROFILAXIA REDUZ CRISES PRECOCES (PRIMEIROS 07 DIAS), NÃO A EPILEPSIA TARDIA; SUSPENDER APÓS 07 DIAS SE NÃO HOUVE CRISE",
     "CRISE CONVULSIVA ESTABELECIDA SEGUE O PROTOCOLO DE ESTADO DE MAL EPILÉPTICO (DOSES DIFERENTES DAS DE PROFILAXIA)"
    ]
   },
   {
    "label": "TCE grave com sinais de herniação/hipertensão intracraniana: terapia hiperosmolar até neurocirurgia — escolha 1",
    "mode": "internacao",
    "sec": "offlabel",
    "draft": true,
    "menu": true,
    "items": [
     [
      "MANITOL 20% SOLUÇÃO INJETÁVEL",
      "FRASCOS DE 250 ML CONFORME DOSE",
      "INFUNDIR {DOSE} EV EM 15 A 20 MINUTOS (1 G/KG = 5 ML/KG). NÃO USAR SE HIPOTENSÃO OU HIPOVOLEMIA; SONDAGEM VESICAL E REPOR DIURESE COM SF 0,9%",
      "USO ENDOVENOSO",
      {
       "kg": 1000,
       "conc": 200,
       "un": "ML",
       "max": 100000
      }
     ],
     [
      "CLORETO DE SÓDIO 3% (PREPARO: NACL 20% 55 ML + SF 0,9% 445 ML)",
      "250 ML",
      "INFUNDIR 250 ML EV EM 15 A 20 MINUTOS, DE PREFERÊNCIA EM ACESSO CENTRAL OU PERIFÉRICO CALIBROSO; PODE REPETIR CONFORME SÓDIO SÉRICO (MANTER < 160 MEQ/L)",
      "USO ENDOVENOSO"
     ]
    ],
    "orient": [
     "CABECEIRA A 30°, PAS ≥ 110 MMHG, SATO2 ≥ 94%, NORMOCAPNIA (PACO2 35-45), NORMOTERMIA E GLICEMIA CONTROLADA; ACIONAR NEUROCIRURGIA E UTI",
     "NÃO INFUNDIR NACL 20% SEM DILUIR; MONITORIZAR SÓDIO, OSMOLARIDADE E DIURESE"
    ]
   },
   {
    "label": "Padrão — TCE leve em observação: analgesia VO",
    "mode": "ped_internacao",
    "draft": true,
    "items": [
     [
      "DIPIRONA 500 MG/ML SOLUÇÃO ORAL (GOTAS)",
      "01 FRASCO",
      "DAR {DOSE} VIA ORAL DE 6/6H SE DOR OU FEBRE (15 MG/KG/DOSE)",
      "USO ORAL",
      {
       "kg": 15,
       "conc": 500,
       "gotas": 20,
       "un": "GOTAS",
       "max": 1000
      }
     ]
    ],
    "orient": [
     "OBSERVAÇÃO POR 4 A 6H APÓS O TRAUMA COM GLASGOW PEDIÁTRICO, PUPILAS E SINAIS VITAIS DE 1/1H; INDICAR TC CONFORME PECARN (OBSERVAÇÃO É ALTERNATIVA À TC NO RISCO INTERMEDIÁRIO)",
     "CHAMAR O MÉDICO SE VÔMITOS REPETIDOS, SONOLÊNCIA OU IRRITABILIDADE PROGRESSIVA, ABAULAMENTO DE FONTANELA, CONVULSÃO, ANISOCORIA, DÉFICIT FOCAL OU QUEDA DO GLASGOW",
     "EVITAR OPIOIDES, SEDATIVOS E AINES DURANTE A OBSERVAÇÃO; DIPIRONA CONTRAINDICADA EM < 03 MESES OU < 05 KG",
     "LACTENTE COM HEMATOMA DE COURO CABELUDO NÃO FRONTAL, MECANISMO INCOMPATÍVEL OU DEMORA NA PROCURA: SUSPEITAR DE MAUS-TRATOS E NOTIFICAR",
     "ALTA COM ADULTO RESPONSÁVEL; RETORNAR SE VÔMITOS REPETIDOS, SONOLÊNCIA, DOR DE CABEÇA QUE PIORA, CONVULSÃO, FRAQUEZA, ALTERAÇÃO DA FALA OU DA MARCHA, OU SAÍDA DE LÍQUIDO PELO NARIZ OU OUVIDO"
    ]
   },
   {
    "label": "Padrão — sem aceitação oral ou com vômitos: sintomáticos EV",
    "mode": "ped_internacao",
    "draft": true,
    "items": [
     [
      "DIPIRONA 500 MG/ML SOLUÇÃO INJETÁVEL",
      "01 AMPOLA 2 ML",
      "ADMINISTRAR {DOSE} EV DILUÍDO EM SF 0,9%, LENTAMENTE, DE 6/6H SE DOR OU FEBRE (25 MG/KG/DOSE). NÃO USAR EV EM < 01 ANO OU < 09 KG",
      "USO ENDOVENOSO",
      {
       "kg": 25,
       "un": "MG",
       "max": 1000
      }
     ],
     [
      "ONDANSETRONA 2 MG/ML SOLUÇÃO INJETÁVEL",
      "01 AMPOLA 2 ML",
      "ADMINISTRAR {DOSE} EV LENTAMENTE (EM 05 MIN) ATÉ DE 8/8H SE NÁUSEAS OU VÔMITOS (0,15 MG/KG/DOSE)",
      "USO ENDOVENOSO",
      {
       "kg": 0.15,
       "un": "MG",
       "max": 4
      }
     ]
    ],
    "orient": [
     "SE JEJUM PROLONGADO: SORO DE MANUTENÇÃO ISOTÔNICO (SF 0,9% COM GLICOSE 5%) PELA REGRA DE HOLLIDAY-SEGAR; NÃO USAR SOLUÇÕES HIPOTÔNICAS"
    ]
   },
   {
    "label": "Alergia ou contraindicação à dipirona: paracetamol VO",
    "mode": "ped_internacao",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "PARACETAMOL 200 MG/ML SOLUÇÃO ORAL (GOTAS)",
      "01 FRASCO",
      "DAR {DOSE} VIA ORAL DE 6/6H SE DOR OU FEBRE (15 MG/KG/DOSE)",
      "USO ORAL",
      {
       "kg": 15,
       "conc": 200,
       "gotas": 15,
       "un": "GOTAS",
       "max": 750
      }
     ]
    ]
   }
  ]
 },
 {
  "id": "trauma_toracico",
  "ic": "🫁",
  "nm": "Trauma torácico",
  "sub": "dipirona · naproxeno · codeína",
  "blocks": [
   {
    "label": "Padrão — Dipirona em horários fixos",
    "draft": true,
    "items": [
     [
      "DIPIRONA 500 MG",
      "01 CAIXA",
      "TOMAR 02 COMPRIMIDOS DE 6/6H, EM HORÁRIOS FIXOS, POR 05 DIAS; DEPOIS, APENAS SE DOR"
     ]
    ],
    "orient": [
     "FAZER 10 RESPIRAÇÕES PROFUNDAS A CADA HORA ENQUANTO ACORDADO E TOSSIR QUANDO NECESSÁRIO, ABRAÇANDO UM TRAVESSEIRO CONTRA O PEITO. NÃO ENFAIXAR NEM APERTAR O TÓRAX",
     "MANTER-SE ATIVO E CAMINHAR, EVITANDO FICAR DEITADO O DIA TODO; EVITAR ESFORÇO FÍSICO INTENSO E ESPORTES DE CONTATO POR 04 A 06 SEMANAS. NÃO FUMAR",
     "CODEÍNA PODE CAUSAR SONOLÊNCIA E PRISÃO DE VENTRE: NÃO DIRIGIR NEM INGERIR BEBIDA ALCOÓLICA DURANTE O USO",
     "RETORNAR IMEDIATAMENTE SE FALTA DE AR, PIORA DA DOR, TOSSE COM SANGUE, FEBRE, TONTURA OU DESMAIO, PALPITAÇÕES OU DOR NA BARRIGA",
     "IDOSOS (≥ 65 ANOS), ≥ 03 ARCOS COSTAIS FRATURADOS, DOENÇA PULMONAR, USO DE ANTICOAGULANTE OU DOR NÃO CONTROLADA COM ANALGESIA ORAL: CONSIDERAR OBSERVAÇÃO OU INTERNAÇÃO"
    ]
   },
   {
    "label": "Padrão — AINE (anti-inflamatório) — escolha 1",
    "draft": true,
    "menu": true,
    "items": [
     [
      "NAPROXENO 500MG",
      "10 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO DE 12/12H POR 05 DIAS SEGUIDOS HORÁRIO SUGERIDO: 08:00 – 20:00"
     ],
     [
      "IBUPROFENO 300 MG",
      "01 CAIXA",
      "TOMAR 02 COMPRIMIDOS DE 6/6H POR 05 DIAS"
     ],
     [
      "DICLOFENACO 50 MG",
      "15 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO DE 8/8H, POR 05 DIAS SEGUIDOS HORÁRIO SUGERIDO (8/8h): 06:00 / 14:00 / 22:00"
     ]
    ]
   },
   {
    "label": "Padrão — Dor intensa que não melhora",
    "draft": true,
    "items": [
     [
      "CODEÍNA 30 MG",
      "12 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO SE DOR INTENSA QUE NÃO MELHORA COM OS DEMAIS REMÉDIOS, PODENDO REPETIR DE 6/6H, POR NO MÁXIMO 03 DIAS"
     ]
    ]
   },
   {
    "label": "Combinação pronta — analgesia multimodal (trauma torácico leve)",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "DIPIRONA 500 MG",
      "01 CAIXA",
      "TOMAR 02 COMPRIMIDOS DE 6/6H, EM HORÁRIOS FIXOS, POR 05 DIAS; DEPOIS, APENAS SE DOR"
     ],
     [
      "NAPROXENO 500MG",
      "10 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO DE 12/12H POR 05 DIAS SEGUIDOS HORÁRIO SUGERIDO: 08:00 – 20:00"
     ],
     [
      "CODEÍNA 30 MG",
      "12 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO SE DOR INTENSA QUE NÃO MELHORA COM OS DEMAIS REMÉDIOS, PODENDO REPETIR DE 6/6H, POR NO MÁXIMO 03 DIAS"
     ]
    ]
   },
   {
    "label": "AINE (anti-inflamatório) — escolha 1",
    "sec": "offlabel",
    "menu": true,
    "items": [
     [
      "NAPROXENO SÓDICO 500 MG",
      "10 COMPRIMIDOS",
      "TOMAR UM COMPRIMIDO SE DOR, PODENDO REPETIR DE 12/12H POR ATÉ 05 DIAS SEGUIDOS"
     ],
     [
      "IBUPROFENO 300 MG",
      "01 CAIXA",
      "TOMAR 02 COMPRIMIDOS DE 6/6H POR 05 DIAS"
     ],
     [
      "DICLOFENACO 50 MG",
      "15 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO DE 8/8H, POR 05 DIAS SEGUIDOS HORÁRIO SUGERIDO (8/8h): 06:00 / 14:00 / 22:00"
     ]
    ]
   },
   {
    "label": "Padrão — analgesia multimodal (fraturas de costelas / contusão torácica)",
    "mode": "internacao",
    "draft": true,
    "items": [
     [
      "DIPIRONA 500 MG/ML SOLUÇÃO INJETÁVEL",
      "01 AMPOLA 2 ML",
      "ADMINISTRAR 1 G (2 ML) EV DILUÍDO EM 100 ML DE SF 0,9%, EM 15 MIN, DE 6/6H EM HORÁRIO FIXO",
      "USO ENDOVENOSO"
     ],
     [
      "CETOPROFENO 100 MG PÓ LIÓFILO PARA SOLUÇÃO INJETÁVEL",
      "01 FRASCO-AMPOLA",
      "ADMINISTRAR 100 MG EV DILUÍDO EM 100 ML DE SF 0,9%, EM 20 MIN, DE 12/12H POR ATÉ 03 DIAS. NÃO USAR SE LESÃO RENAL, SANGRAMENTO ATIVO, HEMOTÓRAX, TCE, ÚLCERA PÉPTICA OU ANTICOAGULAÇÃO",
      "USO ENDOVENOSO"
     ],
     [
      "MORFINA 10 MG/ML SOLUÇÃO INJETÁVEL",
      "01 AMPOLA 1 ML",
      "DILUIR 01 AMPOLA EM 9 ML DE SF 0,9% (1 MG/ML) E ADMINISTRAR 2 A 4 MG (2 A 4 ML) EV LENTAMENTE ATÉ DE 4/4H SE DOR INTENSA (IDOSOS: 1 A 2 MG)",
      "USO ENDOVENOSO"
     ],
     [
      "ONDANSETRONA 2 MG/ML SOLUÇÃO INJETÁVEL",
      "01 AMPOLA 2 ML",
      "ADMINISTRAR 4 MG (2 ML) EV LENTAMENTE ATÉ DE 8/8H SE NÁUSEAS OU VÔMITOS",
      "USO ENDOVENOSO"
     ]
    ],
    "orient": [
     "ANALGESIA É PRIORIDADE: O OBJETIVO É TOSSE EFICAZ E INSPIRAÇÃO PROFUNDA. INSPIRÔMETRO DE INCENTIVO DE 1/1H ACORDADO, FISIOTERAPIA RESPIRATÓRIA E DEAMBULAÇÃO PRECOCE; NÃO ENFAIXAR O TÓRAX",
     "MONITORIZAR FR, SATO2, DOR E NÍVEL DE SEDAÇÃO; CONTUSÃO PULMONAR, PNEUMOTÓRAX E HEMOTÓRAX PODEM SURGIR OU PIORAR EM 24 A 72H: RX OU US DE TÓRAX SE PIORA",
     "DOR REFRATÁRIA, IDOSO COM ≥ 3 ARCOS FRATURADOS, TÓRAX INSTÁVEL OU QUEDA DA SATURAÇÃO: ANALGESIA REGIONAL (PERIDURAL, PARAVERTEBRAL OU BLOQUEIO DO SERRÁTIL) E AVALIAR UTI",
     "CHAMAR CIRURGIA TORÁCICA SE DISPNEIA PROGRESSIVA, ENFISEMA SUBCUTÂNEO, HIPOTENSÃO OU DRENAGEM ≥ 1.500 ML INICIAL OU ≥ 200 ML/H POR 2 A 4H",
     "OPIOIDE: CAUTELA EM IDOSOS, DPOC E APNEIA DO SONO; ASSOCIAR LAXATIVO SE USO REGULAR"
    ]
   },
   {
    "label": "Padrão — suporte respiratório e profilaxia de TEV",
    "mode": "internacao",
    "draft": true,
    "items": [
     [
      "OXIGÊNIO (CATETER NASAL OU MÁSCARA)",
      "CONFORME NECESSIDADE",
      "TITULAR PARA SATO2 ENTRE 94% E 98% (88% A 92% SE DPOC OU RISCO DE RETENÇÃO DE CO2)",
      "USO INALATÓRIO"
     ],
     [
      "ENOXAPARINA 40 MG/0,4 ML SOLUÇÃO INJETÁVEL",
      "01 SERINGA PREENCHIDA",
      "ADMINISTRAR 40 MG SC 01 VEZ AO DIA (POLITRAUMA DE ALTO RISCO: 30 MG SC DE 12/12H), INICIANDO EM 24 A 48H SE HEMOSTASIA ASSEGURADA; CLCR < 30 ML/MIN: 30 MG SC 01 VEZ AO DIA",
      "USO SUBCUTÂNEO"
     ]
    ],
    "orient": [
     "ADIAR ENOXAPARINA SE SANGRAMENTO ATIVO, TCE COM HEMORRAGIA OU LESÃO DE ÓRGÃO SÓLIDO EM TRATAMENTO NÃO OPERATÓRIO ATÉ LIBERAÇÃO DA EQUIPE; USAR COMPRESSÃO PNEUMÁTICA ENQUANTO ISSO"
    ]
   },
   {
    "label": "Toracostomia (dreno de tórax): antibiótico profilático na inserção, dose única — escolha 1",
    "mode": "internacao",
    "sec": "offlabel",
    "draft": true,
    "menu": true,
    "items": [
     [
      "CEFAZOLINA 1 G PÓ PARA SOLUÇÃO INJETÁVEL",
      "02 FRASCOS-AMPOLA",
      "ADMINISTRAR {FAIXA}, DILUÍDO EM 100 ML DE SF 0,9%, EM 30 MIN, DOSE ÚNICA NA INSERÇÃO DO DRENO",
      "USO ENDOVENOSO",
      {
       "sem_peso": "2 G EV (3 G SE PESO ≥ 120 KG)",
       "faixas": [
        {
         "menor": 120,
         "txt": "2 G EV"
        },
        {
         "de": 120,
         "txt": "3 G EV (PESO ≥ 120 KG)"
        }
       ]
      }
     ],
     [
      "CLINDAMICINA 150 MG/ML SOLUÇÃO INJETÁVEL",
      "01 AMPOLA 6 ML",
      "ADMINISTRAR 900 MG EV DILUÍDO EM 100 ML DE SF 0,9%, EM 30 MIN, DOSE ÚNICA NA INSERÇÃO DO DRENO (ALERGIA GRAVE A BETALACTÂMICO)",
      "USO ENDOVENOSO"
     ]
    ],
    "orient": [
     "ANTIBIÓTICO NÃO É INDICADO NO TRAUMA TORÁCICO SEM DRENO; NÃO MANTER ENQUANTO O DRENO ESTIVER LOCADO (NÃO REDUZ EMPIEMA ALÉM DE 24H)"
    ]
   },
   {
    "label": "Contraindicação a AINE (idoso, lesão renal, sangramento, TCE): paracetamol VO em horário fixo",
    "mode": "internacao",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "PARACETAMOL 750 MG",
      "01 COMPRIMIDO",
      "TOMAR 01 COMPRIMIDO VIA ORAL DE 6/6H EM HORÁRIO FIXO, ASSOCIADO À DIPIRONA (MÁXIMO 3 G/DIA; 2 G/DIA SE HEPATOPATIA OU ETILISMO)",
      "USO ORAL"
     ]
    ]
   },
   {
    "label": "Padrão — analgesia VO (dor leve a moderada)",
    "mode": "ped",
    "draft": true,
    "items": [
     [
      "DIPIRONA 500 MG/ML SOLUÇÃO ORAL (GOTAS)",
      "01 FRASCO",
      "DAR {DOSE} VIA ORAL DE 6/6H SE DOR OU FEBRE (15 MG/KG/DOSE)",
      "USO ORAL",
      {
       "kg": 15,
       "conc": 500,
       "gotas": 20,
       "un": "GOTAS",
       "max": 1000
      }
     ],
     [
      "IBUPROFENO 50 MG/ML SUSPENSÃO ORAL (GOTAS)",
      "01 FRASCO",
      "DAR {DOSE} VIA ORAL DE 8/8H, APÓS ALIMENTAÇÃO, POR ATÉ 05 DIAS (10 MG/KG/DOSE). SOMENTE ≥ 06 MESES; NÃO USAR SE SANGRAMENTO, HEMOTÓRAX, LESÃO RENAL OU DE ÓRGÃO SÓLIDO",
      "USO ORAL",
      {
       "kg": 10,
       "conc": 50,
       "gotas": 10,
       "un": "GOTAS",
       "max": 200
      }
     ]
    ],
    "orient": [
     "TÓRAX DA CRIANÇA É COMPLACENTE: CONTUSÃO PULMONAR E LESÃO INTRATORÁCICA PODEM OCORRER SEM FRATURA DE COSTELA; FRATURA DE COSTELA INDICA TRAUMA DE ALTA ENERGIA",
     "FRATURA DE COSTELA EM < 03 ANOS SEM MECANISMO COMPATÍVEL (PRINCIPALMENTE POSTERIOR): SUSPEITAR DE MAUS-TRATOS E NOTIFICAR",
     "NÃO USAR CODEÍNA OU TRAMADOL EM < 12 ANOS NEM AAS; DIPIRONA CONTRAINDICADA EM < 03 MESES OU < 05 KG",
     "ESTIMULAR RESPIRAÇÃO PROFUNDA E TOSSE (SOPRAR BOLHAS OU APITO); EVITAR ESPORTES DE CONTATO POR 04 A 06 SEMANAS",
     "RETORNAR SE FALTA DE AR, RESPIRAÇÃO RÁPIDA OU GEMENTE, LÁBIOS ROXOS, PIORA DA DOR, VÔMITOS, PALIDEZ, SONOLÊNCIA OU DOR NA BARRIGA"
    ]
   },
   {
    "label": "Padrão — em observação/internação: analgesia EV + O2 (dor intensa ou sem via oral)",
    "mode": "ped_internacao",
    "draft": true,
    "items": [
     [
      "DIPIRONA 500 MG/ML SOLUÇÃO INJETÁVEL",
      "01 AMPOLA 2 ML",
      "ADMINISTRAR {DOSE} EV DILUÍDO EM SF 0,9%, LENTAMENTE, DE 6/6H SE DOR OU FEBRE (25 MG/KG/DOSE). NÃO USAR EV EM < 01 ANO OU < 09 KG",
      "USO ENDOVENOSO",
      {
       "kg": 25,
       "un": "MG",
       "max": 1000
      }
     ],
     [
      "MORFINA 10 MG/ML SOLUÇÃO INJETÁVEL",
      "01 AMPOLA 1 ML",
      "DILUIR 01 AMPOLA EM 9 ML DE SF 0,9% (1 MG/ML) E ADMINISTRAR {DOSE} EV LENTAMENTE SE DOR INTENSA, ATÉ DE 4/4H, TITULANDO SOB OXIMETRIA (0,05 MG/KG/DOSE)",
      "USO ENDOVENOSO",
      {
       "kg": 0.05,
       "un": "MG",
       "max": 4
      }
     ],
     [
      "OXIGÊNIO POR CATETER NASAL",
      "CONFORME NECESSIDADE",
      "INICIAR SE SATO2 < 92% E TITULAR PARA MANTER SATO2 ENTRE 92% E 96%",
      "USO INALATÓRIO"
     ]
    ],
    "orient": [
     "MONITORIZAR SATO2, FR E NÍVEL DE SEDAÇÃO DURANTE O USO DE MORFINA; NALOXONA 0,1 MG/KG EV (MÁXIMO 2 MG) SE DEPRESSÃO RESPIRATÓRIA",
     "< 06 MESES: REDUZIR A DOSE DE MORFINA À METADE E MANTER MONITORIZAÇÃO CONTÍNUA"
    ]
   },
   {
    "label": "Analgesia alternativa: paracetamol VO (contraindicação à dipirona ou ao ibuprofeno)",
    "mode": "ped",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "PARACETAMOL 200 MG/ML SOLUÇÃO ORAL (GOTAS)",
      "01 FRASCO",
      "DAR {DOSE} VIA ORAL DE 6/6H SE DOR OU FEBRE (15 MG/KG/DOSE)",
      "USO ORAL",
      {
       "kg": 15,
       "conc": 200,
       "gotas": 15,
       "un": "GOTAS",
       "max": 750
      }
     ]
    ]
   },
   {
    "label": "Toracostomia (dreno de tórax): antibiótico profilático na inserção, dose única — escolha 1",
    "mode": "ped_internacao",
    "sec": "offlabel",
    "draft": true,
    "menu": true,
    "items": [
     [
      "CEFAZOLINA 1 G PÓ PARA SOLUÇÃO INJETÁVEL",
      "01 FRASCO-AMPOLA",
      "ADMINISTRAR {DOSE} EV DILUÍDO EM SF 0,9%, EM 30 MIN, DOSE ÚNICA NA INSERÇÃO DO DRENO (30 MG/KG)",
      "USO ENDOVENOSO",
      {
       "kg": 30,
       "un": "MG",
       "max": 2000
      }
     ],
     [
      "CLINDAMICINA 150 MG/ML SOLUÇÃO INJETÁVEL",
      "01 AMPOLA 6 ML",
      "ADMINISTRAR {DOSE} EV DILUÍDO EM SF 0,9%, EM 30 MIN, DOSE ÚNICA NA INSERÇÃO DO DRENO, SE ALERGIA GRAVE A BETALACTÂMICO (10 MG/KG)",
      "USO ENDOVENOSO",
      {
       "kg": 10,
       "un": "MG",
       "max": 900
      }
     ]
    ],
    "orient": [
     "ANTIBIÓTICO NÃO É INDICADO NO TRAUMA TORÁCICO SEM DRENO; NÃO MANTER ENQUANTO O DRENO ESTIVER LOCADO"
    ]
   }
  ]
 },
 {
  "id": "ulceras",
  "ic": "🩹",
  "nm": "Úlceras de causas variadas",
  "sub": "soro fisiológico · colagenase · diosmina",
  "blocks": [
   {
    "label": "Padrão — curativo: limpeza com SF 0,9% + desbridamento enzimático + analgesia",
    "draft": true,
    "items": [
     [
      "SOLUÇÃO FISIOLÓGICA 0,9%",
      "02 FRASCOS",
      "LAVAR A FERIDA COM O SORO EM JATO A CADA TROCA DE CURATIVO, SEM ESFREGAR",
      "USO TÓPICO"
     ],
     [
      "COLAGENASE 0,6 U/G POMADA",
      "01 BISNAGA",
      "APÓS A LIMPEZA, APLICAR UMA CAMADA FINA APENAS SOBRE O TECIDO DESVITALIZADO (AMARELADO OU ESCURO) DA FERIDA 01 VEZ AO DIA E COBRIR COM GAZE. SUSPENDER QUANDO A FERIDA ESTIVER LIMPA (VERMELHA E ÚMIDA)",
      "USO TÓPICO"
     ],
     [
      "DIPIRONA 500 MG",
      "01 CAIXA",
      "TOMAR 02 COMPRIMIDOS SE DOR, PODENDO REPETIR DE 6/6H"
     ]
    ],
    "orient": [
     "TROCAR O CURATIVO 01 VEZ AO DIA OU SEMPRE QUE ESTIVER MOLHADO OU SUJO: LAVAR COM SORO EM JATO, SECAR A PELE AO REDOR E COBRIR COM GAZE LIMPA",
     "NÃO COLOCAR NA FERIDA POMADAS COM ANTIBIÓTICO, AÇÚCAR, PÓ DE CAFÉ, ÁLCOOL OU OUTROS PRODUTOS CASEIROS",
     "SE ÚLCERA VENOSA: A COMPRESSÃO É O PRINCIPAL TRATAMENTO (BOTA DE UNNA OU ATADURA NA UBS E, APÓS CICATRIZAR, MEIA ELÁSTICA 30–40 MMHG); COMPRESSÃO PLENA SÓ COM ITB ≥ 0,8; MANTER AS PERNAS ELEVADAS AO REPOUSAR",
     "ITB ENTRE 0,6 E 0,8: SÓ COMPRESSÃO REDUZIDA, COM ACOMPANHAMENTO DA CIRURGIA VASCULAR; ITB < 0,6, PRESSÃO NO TORNOZELO < 60 MMHG OU DOR EM REPOUSO: NÃO COMPRIMIR E ENCAMINHAR À VASCULAR",
     "ACOMPANHAR NA UBS PARA CURATIVOS E INVESTIGAÇÃO DA CAUSA (PULSOS, ÍNDICE TORNOZELO-BRAÇO, GLICEMIA/HBA1C); ENCAMINHAR SE PÉ DIABÉTICO COM ÚLCERA OU SEM MELHORA EM 04 A 06 SEMANAS",
     "PÉ DIABÉTICO: TIRAR O PESO DA FERIDA (CALÇADO OU PALMILHA DE DESCARGA, MULETAS), CONTROLAR A GLICEMIA, EXAMINAR OS PÉS TODOS OS DIAS E NUNCA ANDAR DESCALÇO",
     "LESÃO POR PRESSÃO: MUDAR DE POSIÇÃO A CADA 02 HORAS, USAR COLCHÃO DE REDISTRIBUIÇÃO (PNEUMÁTICO OU DE ESPUMA), MANTER A PELE LIMPA E SECA E CUIDAR DA ALIMENTAÇÃO",
     "RETORNAR IMEDIATAMENTE SE FEBRE, VERMELHIDÃO QUENTE OU INCHAÇO QUE SE ESPALHA AO REDOR DA FERIDA, PUS, MAU CHEIRO FORTE, DOR INTENSA OU PÉ FRIO, PÁLIDO OU ESCURECIDO"
    ]
   },
   {
    "label": "Padrão — úlcera venosa (associada à compressão): diosmina + hesperidina (MPFF)",
    "draft": true,
    "items": [
     [
      "DIOSMINA 450 MG + HESPERIDINA 50 MG",
      "60 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO DE 12/12H POR 30 DIAS, MANTENDO ATÉ A CICATRIZAÇÃO CONFORME REAVALIAÇÃO. HORÁRIO SUGERIDO: 08:00 / 20:00"
     ]
    ]
   },
   {
    "label": "Padrão — infecção leve associada (celulite ao redor da úlcera ou pé diabético com infecção leve): cefalexina",
    "draft": true,
    "items": [
     [
      "CEFALEXINA 500 MG",
      "28 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO DE 6/6H POR 07 DIAS (REAVALIAR EM 48 A 72H; PÉ DIABÉTICO: 07 A 14 DIAS, CONFORME A RESPOSTA). HORÁRIO SUGERIDO: 06:00 / 12:00 / 18:00 / 00:00",
      "USO ORAL"
     ]
    ]
   },
   {
    "label": "Pé diabético com infecção leve — alternativas (antibiótico recente, isquemia ou alergia à penicilina) — escolha 1",
    "sec": "offlabel",
    "draft": true,
    "menu": true,
    "items": [
     [
      "AMOXICILINA 875 MG + CLAVULANATO 125 MG",
      "20 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO DE 12/12H, NO INÍCIO DAS REFEIÇÕES, POR 10 DIAS (07 A 14 DIAS CONFORME A RESPOSTA; REAVALIAR EM 48 A 72H)",
      "USO ORAL"
     ],
     [
      "CLINDAMICINA 300 MG",
      "30 CÁPSULAS",
      "SE ALERGIA À PENICILINA: TOMAR 01 CÁPSULA DE 8/8H POR 10 DIAS (07 A 14 DIAS CONFORME A RESPOSTA; REAVALIAR EM 48 A 72H)",
      "USO ORAL"
     ]
    ],
    "orient": [
     "INFECÇÃO MODERADA OU GRAVE NO PÉ DIABÉTICO (CELULITE > 2 CM, ABSCESSO, OSSO EXPOSTO OU TOCADO PELO ESTILETE, FEBRE OU SEPSE): INTERNAR PARA ANTIBIÓTICO EV E AVALIAÇÃO CIRÚRGICA"
    ]
   }
  ]
 },
 {
  "id": "vaginites",
  "ic": "🦠",
  "nm": "Vaginites / Vaginoses / ISTs",
  "sub": "metronidazol · miconazol · ceftriaxona",
  "blocks": [
   {
    "label": "Padrão — vaginose bacteriana / tricomoníase",
    "draft": true,
    "items": [
     [
      "METRONIDAZOL 250 MG",
      "28 COMPRIMIDOS",
      "TOMAR 02 COMPRIMIDOS DE 12/12h POR 07 DIAS"
     ]
    ],
    "orient": [
     "EVITAR BEBIDAS ALCOÓLICAS DURANTE O USO DO METRONIDAZOL E ATÉ 24 HORAS APÓS O TÉRMINO",
     "TRICOMONÍASE: A(S) PARCERIA(S) SEXUAL(IS) DEVE(M) SER TRATADA(S) COM O MESMO ESQUEMA; EVITAR RELAÇÕES SEXUAIS ATÉ O FIM DO TRATAMENTO DE AMBOS",
     "SOLICITO: TESTES RÁPIDOS PARA HIV, SÍFILIS E HEPATITES B E C",
     "EVITE DUCHAS VAGINAIS",
     "RETORNAR SE OS SINTOMAS PERSISTIREM APÓS O TRATAMENTO OU SE SURGIR DOR PÉLVICA, FEBRE OU DOR NA RELAÇÃO SEXUAL"
    ]
   },
   {
    "label": "Padrão — candidíase vulvovaginal — escolha 1",
    "draft": true,
    "menu": true,
    "items": [
     [
      "MICONAZOL CREME VAGINAL 20 MG/G",
      "01 BISNAGA",
      "APLICAR O CONTEÚDO DE UM APLICADOR CHEIO DENTRO DA VAGINA, À NOITE AO DEITAR, POR 07 NOITES",
      "USO TÓPICO"
     ],
     [
      "NISTATINA CREME VAGINAL 25.000 UI/G",
      "01 BISNAGA",
      "APLICAR O CONTEÚDO DE UM APLICADOR CHEIO DENTRO DA VAGINA, À NOITE AO DEITAR, POR 14 DIAS",
      "USO TÓPICO"
     ],
     [
      "FLUCONAZOL 150 MG",
      "01 COMPRIMIDO",
      "TOMAR 01 COMPRIMIDO EM DOSE ÚNICA. NÃO USAR NA GESTAÇÃO (GESTANTE: SOMENTE CREME VAGINAL)",
      "USO ORAL"
     ]
    ],
    "orient": [
     "EVITAR ROUPAS JUSTAS E DE MATERIAL SINTÉTICO (EX: CALCINHA DE RENDA)",
     "CANDIDÍASE: NÃO É NECESSÁRIO TRATAR A PARCERIA SEXUAL SEM SINTOMAS",
     "SE 04 OU MAIS EPISÓDIOS DE CANDIDÍASE POR ANO, PROCURAR A UBS PARA INVESTIGAÇÃO (EX: DIABETES) E TRATAMENTO DE MANUTENÇÃO"
    ]
   },
   {
    "label": "Padrão — DIP leve/moderada (ambulatorial)",
    "draft": true,
    "items": [
     [
      "CEFTRIAXONA 500 MG",
      "01 AMPOLA",
      "APLICAR EM GLÚTEO MÉDIO",
      "USO INTRAMUSCULAR"
     ],
     [
      "DOXICICLINA 100 MG",
      "28 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO DE 12/12 HORAS POR 14 DIAS"
     ],
     [
      "METRONIDAZOL 250 MG",
      "56 COMPRIMIDOS",
      "TOMAR 02 COMPRIMIDOS DE 12/12H POR 14 DIAS"
     ],
     [
      "DIPIRONA 500 MG",
      "01 CAIXA",
      "TOMAR 02 COMPRIMIDOS SE FEBRE OU DOR, PODENDO REPETIR DE 6/6H"
     ]
    ],
    "orient": [
     "RETORNAR À UNIDADE DE EMERGÊNCIA APÓS 03 DIAS DE TRATAMENTO PARA REAVALIAÇÃO, OU ANTES, EM CASO DE PIORA CLÍNICA.",
     "SOLICITO: USG PÉLVICA TRANSABDOMINAL E TRANSVAGINAL",
     "DIP: A(S) PARCERIA(S) SEXUAL(IS) DOS ÚLTIMOS 60 DIAS DEVE(M) SER AVALIADA(S) E TRATADA(S) PARA GONORREIA E CLAMÍDIA; EVITAR RELAÇÕES SEXUAIS ATÉ O FIM DO TRATAMENTO",
     "RETORNAR IMEDIATAMENTE SE FEBRE ALTA, VÔMITOS, PIORA DA DOR ABDOMINAL OU SE NÃO CONSEGUIR TOMAR OS REMÉDIOS"
    ]
   },
   {
    "label": "Vaginose bacteriana — metronidazol gel vaginal por 05 noites",
    "sec": "offlabel",
    "items": [
     [
      "METRONIDAZOL GELEIA VAGINAL 100MG/G",
      "01 BISNAGA",
      "APLICAR O CONTEÚDO DE UM APLICADOR CHEIO DENTRO DA VAGINA, À NOITE AO DEITAR, POR 05 NOITES",
      "USO TÓPICO"
     ]
    ],
    "orient": [
     "EVITAR ROUPAS JUSTAS E DE MATERIAL SINTÉTICO (EX: CALCINHA DE RENDA)",
     "NÃO UTILIZAR PERFUMES DE VULVA",
     "EVITE DUCHAS VAGINAIS",
     "LAVAR A VULVA APENAS POR FORA, COM ÁGUA E SABONETE NEUTRO SEM PERFUME"
    ]
   },
   {
    "label": "Candidíase — fluconazol 150 mg dose única (não usar na gestação)",
    "sec": "offlabel",
    "items": [
     [
      "FLUCONAZOL 150 MG",
      "01 COMPRIMIDO",
      "TOMAR 01 COMPRIMIDO EM DOSE ÚNICA. NÃO USAR NA GESTAÇÃO (GESTANTE: SOMENTE CREME VAGINAL)",
      "USO ORAL"
     ]
    ],
    "orient": [
     "EVITAR ROUPAS JUSTAS E DE MATERIAL SINTÉTICO (EX: CALCINHA DE RENDA)",
     "NÃO UTILIZAR PERFUMES DE VULVA",
     "EVITE DUCHAS VAGINAIS",
     "LAVAR A VULVA APENAS POR FORA, COM ÁGUA E SABONETE NEUTRO SEM PERFUME"
    ]
   },
   {
    "label": "Tricomoníase — metronidazol 2 g dose única (opção do PCDT; na mulher o Padrão usa 7 dias)",
    "sec": "offlabel",
    "items": [
     [
      "METRONIDAZOL 250 MG",
      "08 COMPRIMIDOS",
      "TOMAR 08 COMPRIMIDOS EM DOSE ÚNICA"
     ]
    ]
   },
   {
    "label": "Vaginose bacteriana ou tricomoníase — metronidazol oral por 07 dias",
    "sec": "offlabel",
    "items": [
     [
      "METRONIDAZOL 250 MG",
      "28 COMPRIMIDOS",
      "TOMAR 02 COMPRIMIDOS DE 12/12h POR 07 DIAS"
     ]
    ],
    "orient": [
     "EVITAR ROUPAS JUSTAS E DE MATERIAL SINTÉTICO (EX: CALCINHA DE RENDA)",
     "NÃO UTILIZAR PERFUMES DE VULVA",
     "EVITE DUCHAS VAGINAIS",
     "LAVAR A VULVA APENAS POR FORA, COM ÁGUA E SABONETE NEUTRO SEM PERFUME",
     "SOLICITO: TESTE RÁPIDO PARA HIV"
    ]
   },
   {
    "label": "Cancroide (cancro mole) — azitromicina 1 g dose única",
    "sec": "offlabel",
    "items": [
     [
      "AZITROMICINA 500 MG",
      "02 COMPRIMIDOS",
      "TOMAR 02 COMPRIMIDOS VO EM DOSE ÚNICA"
     ]
    ]
   },
   {
    "label": "Linfogranuloma venéreo",
    "sec": "offlabel",
    "items": [
     [
      "DOXICICLINA 100 MG",
      "42 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO DE 12/12H POR 21 DIAS"
     ]
    ]
   },
   {
    "label": "Donovanose (1ª opção) ou linfogranuloma venéreo (alternativa) — azitromicina 1 g por semana, 3 semanas",
    "sec": "offlabel",
    "items": [
     [
      "AZITROMICINA 500 MG",
      "06 COMPRIMIDOS",
      "TOMAR 02 COMPRIMIDOS (1 G) 01 VEZ POR SEMANA POR 03 SEMANAS (DONOVANOSE: MANTER ATÉ A CICATRIZAÇÃO COMPLETA DAS LESÕES)",
      "USO ORAL"
     ]
    ],
    "orient": [
     "SOLICITO: TESTES RÁPIDOS PARA HIV, SÍFILIS E HEPATITES B E C",
     "A(S) PARCERIA(S) SEXUAL(IS) DEVE(M) SER AVALIADA(S) E TRATADA(S); USAR PRESERVATIVO EM TODAS AS RELAÇÕES"
    ]
   },
   {
    "label": "Sífilis recente (primária, secundária ou latente < 1 ano) — penicilina benzatina 2,4 milhões UI dose única",
    "sec": "offlabel",
    "items": [
     [
      "PENICILINA G BENZATINA 1.200.000 UI",
      "02 AMPOLAS",
      "APLICAR UMA AMPOLA EM CADA GLÚTEO MÉDIO",
      "USO INTRAMUSCULAR"
     ]
    ]
   },
   {
    "label": "Sífilis tardia (latente > 1 ano ou de duração ignorada) — penicilina benzatina 2,4 milhões UI por semana, 3 semanas",
    "sec": "offlabel",
    "items": [
     [
      "PENICILINA G BENZATINA 1.200.000 UI",
      "06 AMPOLAS",
      "APLICAR UMA AMPOLA EM CADA GLÚTEO MÉDIO, A CADA 07 DIAS, ATÉ COMPLETAR TRÊS DOSES",
      "USO INTRAMUSCULAR"
     ]
    ]
   },
   {
    "label": "Sífilis tardia em não gestante alérgica à penicilina — doxiciclina 30 dias",
    "sec": "offlabel",
    "items": [
     [
      "DOXICICLINA 100 MG",
      "60 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO DE 12/12H POR 30 DIAS, COM UM COPO DE ÁGUA, SEM DEITAR NOS 30 MINUTOS SEGUINTES. NÃO USAR NA GESTAÇÃO",
      "USO ORAL"
     ]
    ],
    "orient": [
     "SOLICITO: TESTE RÁPIDO PARA HIV"
    ]
   },
   {
    "label": "Analgésico/antitérmico — escolha 1",
    "sec": "offlabel",
    "menu": true,
    "items": [
     [
      "DIPIRONA 500 MG",
      "01 CAIXA",
      "TOMAR 02 COMPRIMIDOS SE FEBRE OU DOR, PODENDO REPETIR DE 6/6H"
     ],
     [
      "PARACETAMOL 750 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO SE DOR OU FEBRE, PODENDO REPETIR DE 6/6H. INTERCALAR COM DIPIRONA, SE NECESSÁRIO."
     ]
    ]
   },
   {
    "label": "Antiemético — escolha 1",
    "sec": "offlabel",
    "menu": true,
    "items": [
     [
      "METOCLOPRAMIDA 10 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO SE NÁUSEAS OU VÔMITOS, PODENDO REPETIR DE 8/8H"
     ],
     [
      "ONDANSETRONA 8 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO SE NÁUSEAS OU VÔMITOS, PODENDO REPETIR DE 8/8H"
     ]
    ]
   },
   {
    "label": "Padrão — cervicite / uretrite (gonorreia + clamídia): ceftriaxona + azitromicina",
    "draft": true,
    "items": [
     [
      "CEFTRIAXONA 500 MG",
      "01 AMPOLA",
      "APLICAR EM GLÚTEO MÉDIO, DOSE ÚNICA",
      "USO INTRAMUSCULAR"
     ],
     [
      "AZITROMICINA 500 MG",
      "02 COMPRIMIDOS",
      "TOMAR 02 COMPRIMIDOS EM DOSE ÚNICA",
      "USO ORAL"
     ]
    ],
    "orient": [
     "CERVICITE/URETRITE: A(S) PARCERIA(S) SEXUAL(IS) DOS ÚLTIMOS 60 DIAS DEVE(M) SER TRATADA(S) COM O MESMO ESQUEMA; EVITAR RELAÇÕES SEXUAIS ATÉ 07 DIAS APÓS O TRATAMENTO DE AMBOS",
     "SOLICITO: TESTES RÁPIDOS PARA HIV, SÍFILIS E HEPATITES B E C"
    ]
   },
   {
    "label": "Do material do Drive — Vaginose bacteriana, alternativa: clindamicina",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "CLINDAMICINA 300 MG",
      "14 CÁPSULAS",
      "TOMAR 01 CÁPSULA DE 12/12H POR 07 DIAS",
      "USO ORAL"
     ]
    ]
   },
   {
    "label": "Do material do Drive — Candidíase, alternativa oral: itraconazol",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "ITRACONAZOL 100 MG",
      "04 CÁPSULAS",
      "TOMAR 02 CÁPSULAS DE 12/12H POR 01 DIA (TOTAL DE 400 MG). NÃO USAR NA GESTAÇÃO OU AMAMENTAÇÃO",
      "USO ORAL"
     ]
    ]
   },
   {
    "label": "Do material do Drive — Herpes genital, 1º episódio: aciclovir 400 mg 8/8h",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "ACICLOVIR 200 MG",
      "60 COMPRIMIDOS",
      "TOMAR 02 COMPRIMIDOS (400 MG) DE 8/8H POR 10 DIAS (PRIMEIRO EPISÓDIO; MÍNIMO DE 07 DIAS)",
      "USO ORAL"
     ]
    ]
   },
   {
    "label": "Do material do Drive — Herpes genital, recorrência: aciclovir por 5 dias",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "ACICLOVIR 200 MG",
      "30 COMPRIMIDOS",
      "TOMAR 02 COMPRIMIDOS (400 MG) DE 8/8H POR 05 DIAS, COMEÇANDO AOS PRIMEIROS SINTOMAS (FORMIGAMENTO OU ARDOR NO LOCAL)",
      "USO ORAL"
     ]
    ]
   },
   {
    "label": "Do material do Drive — Herpes genital, supressão (6 ou mais recorrências/ano)",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "ACICLOVIR 200 MG",
      "120 COMPRIMIDOS",
      "TOMAR 02 COMPRIMIDOS (400 MG) DE 12/12H, TODOS OS DIAS (RECEITA PARA 30 DIAS); MANTER POR ATÉ 06 MESES COM REAVALIAÇÃO NA UBS",
      "USO ORAL"
     ]
    ]
   },
   {
    "label": "Do material do Drive — Sífilis recente em não gestante alérgica à penicilina: doxiciclina 15 dias",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "DOXICICLINA 100 MG",
      "30 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO DE 12/12H POR 15 DIAS, COM UM COPO DE ÁGUA, SEM DEITAR NOS 30 MINUTOS SEGUINTES. NÃO USAR NA GESTAÇÃO",
      "USO ORAL"
     ]
    ]
   },
   {
    "label": "Do material do Drive — DIP, alternativa à doxiciclina: ceftriaxona + azitromicina semanal + metronidazol",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "CEFTRIAXONA 500 MG",
      "01 AMPOLA",
      "APLICAR EM GLÚTEO MÉDIO, DOSE ÚNICA",
      "USO INTRAMUSCULAR"
     ],
     [
      "AZITROMICINA 500 MG",
      "04 COMPRIMIDOS",
      "TOMAR 02 COMPRIMIDOS (1 G) 01 VEZ POR SEMANA, POR 02 SEMANAS",
      "USO ORAL"
     ],
     [
      "METRONIDAZOL 250 MG",
      "56 COMPRIMIDOS",
      "TOMAR 02 COMPRIMIDOS DE 12/12H POR 14 DIAS",
      "USO ORAL"
     ]
    ]
   },
   {
    "label": "Do material do Drive — Cancroide, alternativa: ciprofloxacino 3 dias",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "CIPROFLOXACINO 500 MG",
      "06 COMPRIMIDOS",
      "TOMAR 01 COMPRIMIDO DE 12/12H POR 03 DIAS. NÃO USAR NA GESTAÇÃO",
      "USO ORAL"
     ]
    ]
   }
  ]
 },
 {
  "id": "vertigem",
  "ic": "💫",
  "nm": "Vertigem e tontura",
  "sub": "dimenidrinato · meclizina · metoclopramida",
  "blocks": [
   {
    "label": "Padrão — Supressor vestibular / antiemético por até 03 dias — escolha 1",
    "draft": true,
    "menu": true,
    "items": [
     [
      "DIMENIDRINATO 50 MG + PIRIDOXINA 10MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO SE VERTIGEM, NÁUSEAS OU VÔMITOS, PODENDO REPETIR DE 6/6H"
     ],
     [
      "MECLIZINA 50MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO SE VERTIGEM, TONTURA OU VÔMITOS, PODENDO REPETIR DE 12/12h"
     ],
     [
      "METOCLOPRAMIDA 10 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO SE NÁUSEAS OU VÔMITOS, PODENDO REPETIR DE 8/8H"
     ]
    ],
    "orient": [
     "USAR O REMÉDIO PARA TONTURA SOMENTE NAS CRISES E POR NO MÁXIMO 03 DIAS — O USO PROLONGADO ATRASA A RECUPERAÇÃO DO EQUILÍBRIO. PODE CAUSAR SONOLÊNCIA",
     "RETOMAR AS ATIVIDADES E MOVIMENTAR A CABEÇA AOS POUCOS, ASSIM QUE TOLERAR; NÃO DIRIGIR, OPERAR MÁQUINAS OU SUBIR EM ALTURAS ENQUANTO HOUVER TONTURA",
     "VERTIGEM POSICIONAL (VPPB): O TRATAMENTO É A MANOBRA DE REPOSICIONAMENTO (EPLEY), SEM NECESSIDADE DE MEDICAÇÃO CONTÍNUA",
     "RETORNAR IMEDIATAMENTE SE FRAQUEZA OU DORMÊNCIA NO ROSTO, BRAÇO OU PERNA, FALA ENROLADA, VISÃO DUPLA, DIFICULDADE PARA ANDAR OU FICAR EM PÉ, DOR DE CABEÇA SÚBITA E FORTE, DESMAIO OU DOR NO PEITO",
     "PROCURAR ATENDIMENTO NO MESMO DIA SE PERDA SÚBITA DA AUDIÇÃO; AGENDAR UBS/OTORRINO SE CRISES REPETIDAS, ZUMBIDO OU TONTURA QUE PERSISTE APÓS 02 SEMANAS (REABILITAÇÃO VESTIBULAR)"
    ]
   },
   {
    "label": "Combinação pronta — supressor vestibular por curto prazo (até 03 dias)",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "DIMENIDRINATO 50 MG + PIRIDOXINA 10MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO SE VERTIGEM, NÁUSEAS OU VÔMITOS, PODENDO REPETIR DE 6/6H"
     ]
    ]
   },
   {
    "label": "Doença de Ménière (crise e manutenção até o otorrino): dimenidrinato na crise + betaistina",
    "sec": "offlabel",
    "items": [
     [
      "DIMENIDRINATO 50 MG + PIRIDOXINA 10MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO SE VERTIGEM, NÁUSEAS OU VÔMITOS, PODENDO REPETIR DE 6/6H"
     ],
     [
      "BETAISTINA 16 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO DE 8/8H, ATÉ A CONSULTA COM O OTORRINO"
     ]
    ],
    "orient": [
     "DIMINUIR O SAL, A CAFEÍNA E A BEBIDA ALCOÓLICA; BEBER ÁGUA AO LONGO DO DIA",
     "RETOMAR AS ATIVIDADES ASSIM QUE A CRISE PASSAR; NÃO DIRIGIR NEM SUBIR EM ALTURAS DURANTE A CRISE",
     "MARCAR CONSULTA COM OTORRINO PARA CONFIRMAR O DIAGNÓSTICO E SEGUIR O TRATAMENTO; PERDA SÚBITA DA AUDIÇÃO É URGÊNCIA"
    ]
   },
   {
    "label": "Neurite vestibular (até 3 dias do início): prednisona curta + supressor por até 3 dias",
    "sec": "offlabel",
    "items": [
     [
      "MECLIZINA 50MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO SE VERTIGEM, TONTURA OU VÔMITOS, PODENDO REPETIR DE 12/12h"
     ],
     [
      "DIPIRONA 500MG",
      "01 CAIXA",
      "TOMAR 02 COMPRIMIDOS SE FEBRE OU DOR, PODENDO REPETIR DE 06/06H"
     ],
     [
      "PREDNISONA 20 MG",
      "23 COMPRIMIDOS",
      "TOMAR 03 COMPRIMIDOS (60 MG) PELA MANHÃ, APÓS O CAFÉ, POR 05 DIAS; DEPOIS, 02 COMPRIMIDOS PELA MANHÃ POR 03 DIAS; DEPOIS, 01 COMPRIMIDO PELA MANHÃ POR 02 DIAS. INICIAR ATÉ 3 DIAS DO COMEÇO DA VERTIGEM"
     ]
    ],
    "orient": [
     "CORTICOIDE SÓ NOS 3 PRIMEIROS DIAS DA VERTIGEM, COM BENEFÍCIO INCERTO; DIABÉTICOS: MONITORAR A GLICEMIA",
     "USAR O REMÉDIO PARA TONTURA SÓ NAS CRISES E POR NO MÁXIMO 03 DIAS; RETOMAR AS ATIVIDADES E MOVIMENTAR A CABEÇA AOS POUCOS ASSIM QUE TOLERAR",
     "BEBER ÁGUA AO LONGO DO DIA; NÃO DIRIGIR ENQUANTO HOUVER TONTURA"
    ]
   },
   {
    "label": "Antiemético/antivertiginoso sintomático — escolha 1",
    "sec": "offlabel",
    "menu": true,
    "items": [
     [
      "DIMENIDRINATO 50 MG + PIRIDOXINA 10MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO SE VERTIGEM, NÁUSEAS OU VÔMITOS, PODENDO REPETIR DE 6/6H"
     ],
     [
      "METOCLOPRAMIDA 10 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO SE NÁUSEAS OU VÔMITOS, PODENDO REPETIR DE 8/8H"
     ],
     [
      "ONDANSETRONA 8 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO SE NÁUSEAS OU VÔMITOS, PODENDO REPETIR DE 8/8H"
     ]
    ]
   },
   {
    "label": "Analgésico/antitérmico — escolha 1",
    "sec": "offlabel",
    "menu": true,
    "items": [
     [
      "DIPIRONA 500 MG",
      "01 CAIXA",
      "TOMAR 02 COMPRIMIDOS SE FEBRE OU DOR, PODENDO REPETIR DE 6/6H"
     ],
     [
      "PARACETAMOL 750 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO SE DOR OU FEBRE, PODENDO REPETIR DE 6/6H. INTERCALAR COM DIPIRONA, SE NECESSÁRIO."
     ]
    ]
   },
   {
    "label": "Padrão — Crise de vertigem com vômitos no PS: dimenidrinato EV ± ondansetrona EV",
    "mode": "internacao",
    "draft": true,
    "items": [
     [
      "DIMENIDRINATO 3 MG/ML + PIRIDOXINA 5 MG/ML SOLUÇÃO INJETÁVEL (AMPOLA 10 ML, USO EXCLUSIVO EV)",
      "01 AMPOLA",
      "ADMINISTRAR 01 AMPOLA (30 MG DE DIMENIDRINATO) EV LENTO, EM NO MÍNIMO 2 MINUTOS, DILUÍDA EM 10 ML DE SF 0,9% (OU EM 100 ML DE SF 0,9% EM 15 MINUTOS); PODE REPETIR A CADA 4 A 6 H SE NECESSÁRIO. CAUSA SONOLÊNCIA. CONTRAINDICADO EM INTOLERÂNCIA HEREDITÁRIA À FRUTOSE E PORFIRIA",
      "USO ENDOVENOSO"
     ],
     [
      "ONDANSETRONA 2 MG/ML SOLUÇÃO INJETÁVEL",
      "01 AMPOLA 4 ML",
      "SE VÔMITOS PERSISTENTES: ADMINISTRAR 4 A 8 MG (2 A 4 ML) EV, DILUÍDO EM 100 ML DE SF 0,9%, EM 15 MINUTOS; PODE REPETIR ATÉ DE 8/8H. CAUTELA SE QT LONGO",
      "USO ENDOVENOSO"
     ]
    ],
    "orient": [
     "HINTS (EM ESCORES) SÓ COM NISTAGMO E POR EXAMINADOR TREINADO; DÉFICIT FOCAL, ATAXIA DE TRONCO, HINTS CENTRAL OU DUVIDOSO: RM COM DIFUSÃO (A TC NÃO EXCLUI AVC DE FOSSA POSTERIOR) — SEM RM NO SERVIÇO, DISCUTIR COM A NEUROLOGIA OU A REGULAÇÃO",
     "VPPB (DIX-HALLPIKE POSITIVO): MANOBRA DE EPLEY NO PRÓPRIO PS — REMÉDIO NÃO TRATA VPPB",
     "HIDRATAR SE DESIDRATADO; ALTA COM SUPRESSOR VESTIBULAR POR NO MÁXIMO 03 DIAS E ORIENTAÇÃO DE RETORNO"
    ]
   },
   {
    "label": "Do material do Drive — Vertigem intensa refratária: prometazina IM",
    "mode": "internacao",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "PROMETAZINA 25 MG/ML SOLUÇÃO INJETÁVEL",
      "01 AMPOLA 2 ML",
      "SE VERTIGEM INTENSA SEM MELHORA COM O DIMENIDRINATO: APLICAR 25 A 50 MG (1 A 2 ML) IM PROFUNDO, DOSE ÚNICA. CAUSA SONOLÊNCIA E HIPOTENSÃO — EVITAR EM IDOSOS E NÃO ASSOCIAR A OUTRO SEDATIVO. NÃO APLICAR EV NEM SC",
      "USO INTRAMUSCULAR"
     ]
    ]
   }
  ]
 },
 {
  "id": "zika",
  "ic": "🦟",
  "nm": "Zika vírus",
  "sub": "dipirona · paracetamol · loratadina · hidroxizina",
  "blocks": [
   {
    "label": "Padrão — Analgésico / antitérmico (podem ser intercalados)",
    "draft": true,
    "items": [
     [
      "DIPIRONA 500 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO (500 MG) SE DOR OU FEBRE, PODENDO REPETIR DE 6/6H. INTERCALAR COM PARACETAMOL, SE NECESSÁRIO",
      "USO ORAL"
     ],
     [
      "PARACETAMOL 750 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO SE DOR OU FEBRE, PODENDO REPETIR DE 6/6H. INTERCALAR COM DIPIRONA, SE NECESSÁRIO."
     ]
    ],
    "orient": [
     "TOMAR 01 COPO D’ÁGUA 10 VEZES AO DIA OU MAIS, CONFORME ACEITAÇÃO.",
     "NÃO TOMAR ASPIRINA, IBUPROFENO, DICLOFENACO NEM QUALQUER OUTRA MEDICAÇÃO SEM ORIENTAÇÃO MÉDICA.",
     "RETORNAR IMEDIATAMENTE SE DOR ABDOMINAL INTENSA, VÔMITOS PERSISTENTES, SANGRAMENTOS, TONTURA AO LEVANTAR, SONOLÊNCIA OU FRAQUEZA/FORMIGAMENTO NAS PERNAS QUE SOBE PELO CORPO",
     "USAR PRESERVATIVO OU EVITAR RELAÇÕES SEXUAIS POR 03 MESES (HOMENS) E 02 MESES (MULHERES) APÓS OS SINTOMAS; GESTANTES DEVEM AVISAR O PRÉ-NATAL PARA SEGUIMENTO COM ULTRASSONOGRAFIA",
     "USAR REPELENTE, ROUPAS COMPRIDAS E TELAS/MOSQUITEIRO PARA NÃO TRANSMITIR O VÍRUS AO MOSQUITO E A OUTRAS PESSOAS"
    ]
   },
   {
    "label": "Padrão — Anti-histamínico se coceira — escolha 1",
    "draft": true,
    "menu": true,
    "items": [
     [
      "LORATADINA 10 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO AO DIA SE COCEIRA OU MANCHAS VERMELHAS NA PELE"
     ],
     [
      "HIDROXIZINA 25 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO SE COCEIRA OU VERMELHIDÃO NA PELE, PODENDO REPETIR DE 08/08H"
     ]
    ]
   },
   {
    "label": "Combinação pronta — sintomático: dipirona/paracetamol + anti-histamínico",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "DIPIRONA 500 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO (500 MG) SE DOR OU FEBRE, PODENDO REPETIR DE 6/6H. INTERCALAR COM PARACETAMOL, SE NECESSÁRIO",
      "USO ORAL"
     ],
     [
      "PARACETAMOL 750 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO SE DOR OU FEBRE, PODENDO REPETIR DE 6/6H. INTERCALAR COM DIPIRONA, SE NECESSÁRIO."
     ],
     [
      "LORATADINA 10 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO AO DIA SE COCEIRA OU MANCHAS VERMELHAS NA PELE"
     ]
    ]
   },
   {
    "label": "Receita",
    "sec": "offlabel",
    "items": [
     [
      "DIPIRONA 500 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO (500 MG) SE DOR OU FEBRE, PODENDO REPETIR DE 6/6H. INTERCALAR COM PARACETAMOL, SE NECESSÁRIO",
      "USO ORAL"
     ],
     [
      "PARACETAMOL 750 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDOS SE DOR OU FEBRE, PODENDO REPETIR DE 6/6H."
     ],
     [
      "HIDROXIZINA 25 MG",
      "01 CAIXA",
      "TOMAR 01 COMPRIMIDO SE COCEIRA OU VERMELHIDÃO NA PELE, PODENDO REPETIR DE 08/08H"
     ]
    ],
    "orient": [
     "TOMAR 01 COPO D’ÁGUA 10 VEZES AO DIA OU MAIS, CONFORME ACEITAÇÃO.",
     "NÃO TOMAR ASPIRINA, IBUPROFENO, DICLOFENACO NEM QUALQUER OUTRA MEDICAÇÃO SEM ORIENTAÇÃO MÉDICA."
    ]
   },
   {
    "label": "Padrão — Suporte clínico: hidratação + sintomáticos",
    "mode": "internacao",
    "draft": true,
    "items": [
     [
      "CLORETO DE SÓDIO 0,9% (SORO FISIOLÓGICO)",
      "01 BOLSA 500 ML",
      "SE DESIDRATAÇÃO OU BAIXA ACEITAÇÃO ORAL: INFUNDIR 500 ML EV EM 1 HORA E REAVALIAR; DEPOIS MANTER CONFORME ACEITAÇÃO ORAL E DIURESE",
      "USO ENDOVENOSO"
     ],
     [
      "DIPIRONA 500 MG/ML SOLUÇÃO INJETÁVEL",
      "01 AMPOLA 2 ML",
      "ADMINISTRAR 1 G (2 ML) DILUÍDO EM 100 ML DE SF 0,9% EV ATÉ DE 6/6H SE DOR OU FEBRE",
      "USO ENDOVENOSO"
     ],
     [
      "PARACETAMOL 750 MG",
      "01 COMPRIMIDO",
      "TOMAR 01 COMPRIMIDO VIA ORAL ATÉ DE 6/6H SE DOR OU FEBRE, INTERCALANDO COM A DIPIRONA SE NECESSÁRIO",
      "USO ORAL"
     ],
     [
      "LORATADINA 10 MG",
      "01 COMPRIMIDO",
      "TOMAR 01 COMPRIMIDO VIA ORAL 01 VEZ AO DIA SE COCEIRA OU EXANTEMA",
      "USO ORAL"
     ],
     [
      "METOCLOPRAMIDA 5 MG/ML SOLUÇÃO INJETÁVEL",
      "01 AMPOLA 2 ML",
      "ADMINISTRAR 10 MG (2 ML) EV LENTO ATÉ DE 8/8H SE NÁUSEA OU VÔMITO",
      "USO ENDOVENOSO"
     ]
    ],
    "orient": [
     "MONITORIZAR SINAIS VITAIS, DIURESE E NÍVEL DE CONSCIÊNCIA; EXAME NEUROLÓGICO DIÁRIO (FORÇA, REFLEXOS, PARESTESIAS ASCENDENTES, PARES CRANIANOS) — RISCO DE SÍNDROME DE GUILLAIN-BARRÉ E OUTRAS COMPLICAÇÕES NEUROLÓGICAS",
     "NÃO USAR AAS NEM ANTI-INFLAMATÓRIOS ATÉ AFASTAR DENGUE (HEMOGRAMA/PLAQUETAS); SE SINAIS DE ALARME, SEGUIR O PROTOCOLO DE DENGUE",
     "GESTANTE: COLHER RT-PCR (SANGUE E URINA) E SOROLOGIA, NOTIFICAR DE IMEDIATO E ENCAMINHAR AO PRÉ-NATAL DE ALTO RISCO PARA ULTRASSONOGRAFIA SERIADA",
     "NOTIFICAÇÃO COMPULSÓRIA (GESTANTE E ÓBITO: IMEDIATA, EM ATÉ 24H); MOSQUITEIRO/REPELENTE DURANTE A INTERNAÇÃO E ORIENTAR PRESERVATIVO (TRANSMISSÃO SEXUAL)"
    ]
   },
   {
    "label": "Padrão — Síndrome de Guillain-Barré associada: imunoglobulina EV + profilaxia de TEV",
    "mode": "internacao",
    "draft": true,
    "items": [
     [
      "IMUNOGLOBULINA HUMANA INTRAVENOSA 5 G FRASCO-AMPOLA",
      "FRASCOS-AMPOLA CONFORME PESO",
      "ADMINISTRAR {DOSE} EV 01 VEZ AO DIA POR 05 DIAS (0,4 G/KG/DIA = 400 MG/KG/DIA; TOTAL 2 G/KG), CONVERTENDO EM FRASCOS DE 5 G; INICIAR EM VAZÃO LENTA E AUMENTAR CONFORME A BULA DO PRODUTO, COM HIDRATAÇÃO E MONITORIZAÇÃO DE REAÇÕES INFUSIONAIS",
      "USO ENDOVENOSO",
      {
       "kg": 400,
       "un": "MG"
      }
     ],
     [
      "ENOXAPARINA 40 MG/0,4 ML SOLUÇÃO INJETÁVEL (SERINGA PREENCHIDA)",
      "01 SERINGA",
      "ADMINISTRAR 40 MG SC 01 VEZ AO DIA ENQUANTO NÃO DEAMBULAR (PROFILAXIA DE TROMBOEMBOLISMO VENOSO), SE SEM CONTRAINDICAÇÃO; CLCR < 30 ML/MIN: 20 MG SC 01 VEZ AO DIA",
      "USO SUBCUTÂNEO"
     ]
    ],
    "orient": [
     "IGIV (PCDT SGB, PORTARIA CONJUNTA Nº 15/2020): DOENÇA MODERADA A GRAVE (HUGHES ≥ 3 — SÓ ANDA COM APOIO OU NÃO ANDA) E MENOS DE 8 SEMANAS DE EVOLUÇÃO, COM MAIOR BENEFÍCIO NAS 2 PRIMEIRAS SEMANAS; 2 G/KG EM 2 A 5 DIAS (ALTERNATIVA: PLASMAFÉRESE); DECIDIR COM A NEUROLOGIA. CORTICOIDE É CONTRAINDICADO",
     "COLHER LÍQUOR E RT-PCR/SOROLOGIAS PARA ZIKA, DENGUE E CHIKUNGUNYA ANTES DA IGIV (A IGIV INTERFERE NA SOROLOGIA)",
     "AVALIAR CVF, FORÇA CERVICAL, DEGLUTIÇÃO, PA E FC VÁRIAS VEZES AO DIA: UTI SE CVF < 20 ML/KG, PIMÁX < 30 CMH2O, PEMÁX < 40 CMH2O (REGRA 20/30/40), DISFAGIA, PROGRESSÃO RÁPIDA OU DISAUTONOMIA",
     "PREVENÇÃO DE TROMBOEMBOLISMO ENQUANTO NÃO DEAMBULAR (PCDT SGB: ITEM DO CUIDADO DE SUPORTE); DOR NEUROPÁTICA É FREQUENTE (DIPIRONA/PARACETAMOL; SE NECESSÁRIO GABAPENTINA OU CARBAMAZEPINA); FISIOTERAPIA MOTORA E RESPIRATÓRIA PRECOCE; NOTIFICAR COMO SÍNDROME NEUROLÓGICA PÓS-ARBOVIROSE"
    ]
   },
   {
    "label": "Padrão — Antitérmico/analgésico por peso — escolha 1",
    "mode": "ped",
    "draft": true,
    "menu": true,
    "items": [
     [
      "DIPIRONA 500 MG/ML SOLUÇÃO ORAL (GOTAS)",
      "01 FRASCO",
      "DAR {DOSE} VIA ORAL ATÉ DE 6/6H SE DOR OU FEBRE (10 MG/KG/DOSE — MESMA DOSE DO MANUAL DE DENGUE 2024, ENQUANTO DENGUE NÃO FOR AFASTADA). NÃO USAR EM < 3 MESES OU < 5 KG",
      "USO ORAL",
      {
       "kg": 10,
       "conc": 500,
       "gotas": 20,
       "un": "GOTAS",
       "max": 1000
      }
     ],
     [
      "PARACETAMOL 200 MG/ML SOLUÇÃO ORAL (GOTAS)",
      "01 FRASCO",
      "DAR {DOSE} VIA ORAL ATÉ DE 6/6H SE DOR OU FEBRE (10 MG/KG/DOSE — MESMA DOSE DO MANUAL DE DENGUE 2024). CALCULADO PARA 15 GOTAS/ML — CONFERIR O GOTEJADOR DO FRASCO (HÁ FRASCOS COM 20 GOTAS/ML)",
      "USO ORAL",
      {
       "kg": 10,
       "conc": 200,
       "gotas": 15,
       "un": "GOTAS",
       "max": 750
      }
     ]
    ],
    "orient": [
     "OFERECER LÍQUIDOS COM FREQUÊNCIA (ÁGUA, LEITE MATERNO, SORO DE REIDRATAÇÃO ORAL); MANTER O ALEITAMENTO MATERNO",
     "NÃO USAR AAS, IBUPROFENO OU OUTROS ANTI-INFLAMATÓRIOS ATÉ AFASTAR DENGUE",
     "RETORNAR IMEDIATAMENTE SE VÔMITOS PERSISTENTES, DOR ABDOMINAL, SANGRAMENTOS OU MANCHAS ROXAS, SONOLÊNCIA OU IRRITABILIDADE, CONVULSÃO, DIMINUIÇÃO DA URINA OU FRAQUEZA/DIFICULDADE PARA ANDAR",
     "USAR MOSQUITEIRO E REPELENTE ADEQUADO À IDADE (NÃO USAR REPELENTE EM < 6 MESES) PARA NÃO TRANSMITIR O VÍRUS",
     "LACTENTE COM MICROCEFALIA OU OUTROS SINAIS DE SÍNDROME CONGÊNITA (CALCIFICAÇÕES, ALTERAÇÕES OCULARES OU AUDITIVAS, ARTROGRIPOSE): NOTIFICAR E ENCAMINHAR À ESTIMULAÇÃO PRECOCE E SEGUIMENTO ESPECIALIZADO"
    ]
   },
   {
    "label": "Padrão — Prurido do exantema (≥ 2 anos): loratadina",
    "mode": "ped",
    "draft": true,
    "items": [
     [
      "LORATADINA 1 MG/ML XAROPE",
      "01 FRASCO",
      "DAR VIA ORAL 01 VEZ AO DIA ENQUANTO HOUVER COCEIRA — {FAIXA}. SOMENTE ≥ 2 ANOS",
      "USO ORAL",
      {
       "sem_peso": "PESO < 30 KG: 5 ML (5 MG); PESO ≥ 30 KG: 10 ML (10 MG)",
       "faixas": [
        {
         "menor": 30,
         "txt": "5 ML (5 MG)"
        },
        {
         "de": 30,
         "txt": "10 ML (10 MG)"
        }
       ]
      }
     ]
    ]
   },
   {
    "label": "Prurido em lactente de 6 meses a 2 anos: desloratadina",
    "mode": "ped",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "DESLORATADINA 0,5 MG/ML XAROPE",
      "01 FRASCO",
      "DAR VIA ORAL 01 VEZ AO DIA ENQUANTO HOUVER COCEIRA — 6 A 11 MESES: 2 ML (1 MG); 1 A 5 ANOS: 2,5 ML (1,25 MG)",
      "USO ORAL"
     ]
    ]
   },
   {
    "label": "Do material do Drive — Repelente (liberado na gestação)",
    "sec": "offlabel",
    "draft": true,
    "items": [
     [
      "REPELENTE TÓPICO À BASE DE ICARIDINA, DEET OU IR3535",
      "01 FRASCO",
      "APLICAR NA PELE EXPOSTA E REAPLICAR NO INTERVALO INDICADO NO RÓTULO (MAIS LONGO NA ICARIDINA, MAIS CURTO NO IR3535) E APÓS BANHO OU SUOR INTENSO; APLICAR DEPOIS DO PROTETOR SOLAR. PODE SER USADO NA GESTAÇÃO",
      "USO TÓPICO"
     ]
    ]
   }
  ]
 }
];

const KW = {
 "analgesia": "analgesia / dor ibuprofeno · diclofenaco · nimesulida dor febre trauma butilbrometo cetoprofeno codeína diclofenaco dipirona escopolamina ibuprofeno metoclopramida nimesulida paracetamol tramadol morfina naloxona ondansetrona analgesia endovenosa dor intensa opioide antidoto opioide antiemetico liófilo fentanil tenoxicam dimenidrinato naproxeno",
 "abstinencia": "abstinência alcoólica tiamina amitriptilina carbamazepina citalopram diazepam fluoxetina tiamina abstinencia abstinência alcoólica alcool etilismo wernicke benzodiazepinico ciwa haloperidol agitacao delirium tremens magnesio glicose hidratacao lorazepam sulfato magnésio fenobarbital sindrome de abstinencia alcoolica ácido fólico",
 "abuso_sexual": "abuso sexual — profilaxia penicilina azitromicina benzatina ceftriaxona levonorgestrel metronidazol penicilina lamivudina zidovudina dolutegravir lopinavir ritonavir pep hiv tenofovir imunoglobulina hepatite menarca gonorreia clamidia tricomoniase sifilis ist pediatrico crianca violencia tenofovir/lamivudina dispersível vacina humana anti violencia sexual estupro ighahb recombinante",
 "aftas": "aftas orais (estomatite) triancinolona · gingilone acetonida gingilone triancinolona tópica orobase digluconato clorexidina bucal benzidamina colutório afta estomatite aftosa tartarato bismuto dipirona ibuprofeno lidocaína paracetamol pomada",
 "alergia": "alergia / prurido hidroxizina · loratadina · cetirizina urticaria coceira prurido cetirizina fexofenadina hidroxizina levocetirizina loratadina prednisona pseudoefedrina adrenalina epinefrina anafilaxia anafilatico hidrocortisona prometazina famotidina difenidramina dexclorfeniramina prednisolona angioedema choque cloreto sódio oxigênio máscara reinalante salbutamol spray aerossol glucagon liófilo desloratadina dicloridrato succinato",
 "anafilaxia": "anafilaxia prednisona hidroxizina prednisona ranitidina anafilatico anafilática reação alérgica grave adrenalina epinefrina salbutamol hidrocortisona metilprednisolona prometazina famotidina choque broncoespasmo urticaria angioedema ringer cristaloide soro fisiologico oxigenio autoinjetor loratadina oxigênio suplementar cloreto sódio spray aerossol glucagon liófilo difenidramina prednisolona choque anafilatico kit crianca",
 "anticoncepcao": "anticoncepção de emergência levonorgestrel butilbrometo dimenidrinato escopolamina levonorgestrel piridoxina pilula do dia seguinte contracepcao de emergencia metoclopramida ondansetrona",
 "asma": "asma prednisona · salbutamol · beclometasona broncoespasmo falta de ar chiado sibilo respiratoria aerossol beclometasona budesonida formoterol prednisona salbutamol spray nebulizacao ipratropio brometo hidrocortisona metilprednisolona prednisolona sulfato magnesio oxigenio crise exacerbacao internacao oxigenoterapia budesonida/formoterol oxigênio suplementar nebulização ipratrópio magnésio cloreto sódio crise asmatica asmatico bronquite asmatica bromidrato fenoterol espaçador valvulado máscara facial menor cateter espacador",
 "bursites": "bursites cafeína · paracetamol · carisoprodol alginac betaciclodextrina cafeína carisoprodol cetorolaco ciclobenzaprina diclofenaco dipirona nimesulida orfenadrina paracetamol retard trometamina ibuprofeno dietilamônio cefalexina cefazolina clindamicina naproxeno sulfametoxazol trimetoprima vancomicina bursite séptica",
 "calmantes": "calmantes fitoterápicos passíflora incarnata passíflora valeriana officinalis",
 "cefaleia": "cefaleia dipirona dor de cabeca cabeça dipirona metoclopramida naproxeno sódico cetoprofeno dexametasona clorpromazina sumatriptano ondansetrona ibuprofeno triptano enxaqueca cocktail parenteral internacao pediatrico sumatriptana oxigênio paracetamol cloreto sódio rizatriptana tenoxicam diclofenaco dimenidrinato",
 "ceratite": "ceratite fotoelétrica regencel oftálmica optocare pomada regencel acetato retinol aminoácidos metionina cloranfenicol carmelose sódica colírio dipirona ceratoconjuntivite actinica queimadura ocular por solda cetorolaco trometamol",
 "chikungunya": "chikungunya paracetamol arbovirose artralgia codeína dipirona paracetamol metoclopramida tramadol morfina soro fisiologico dipirona injetavel paracetamol gotas dipirona gotas opioide analgesia endovenosa internacao pediatrico cloreto sódio chicungunha ibuprofeno prednisona",
 "colica_nefretica": "cólica nefrética cetoprofeno · cetorolaco · algicod rim renal calculo pedra litiase algicod cetoprofeno cetorolaco diclofenaco metoclopramida tansulosina ibuprofeno dipirona colica renal nefrolitiase urolitiase tenoxicam tramadol morfina naproxeno nimesulida ondansetrona paracetamol",
 "conjuntivite": "conjuntivite tobramicina colírio fisiológica solução tobramicina ceftriaxona azitromicina dipirona gonococica gonococo clamidia tracoma hiperaguda perfuracao oftalmologica ist secrecao purulenta irrigacao carmelose sódica olopatadina doxiciclina olho vermelho ofloxacino ciprofloxacino epinastina",
 "corpo_estranho": "corpo estranho ocular tobramicina colírio dexametasona fisiológica ofloxacino solução tobramicina olho colirio fisiologica solucao soro dipirona paracetamol ibuprofeno analgesia pediatrico oftálmica cisco no olho cetorolaco trometamol",
 "constipacao": "constipação benefiber · muvinlax intestino preso fezes benefiber muvinlax simeticona polietilenoglicol peg macrogol lactulose desimpactacao pediatrico constipacao intestino preso laxante laxativo prisao de ventre eletrólitos bisacodil manipulado fibra óleo mineral supositório glicerina adulto",
 "dengue": "dengue dipirona arbovirose dipirona metoclopramida oral reidratação soro fisiologico expansao volemica internacao endovenoso choque paracetamol ondansetrona gotas peso pediatrico hematocrito cloreto sódio albumina humana loratadina dimenidrinato",
 "diarreia": "diarreia aguda loperamida · saccharomyces · ciprofloxacino gastroenterite disenteria fezes albendazol azitromicina boulardii buscoduo buscopan butilbrometo ciprofloxacino composto dipirona escopolamina loperamida metoclopramida metronidazol nitazoxanida oral reidratação saccharomyces secnidazol soro sulfametoxazol trimetoprima diarreia aguda desidratacao reidratacao plano c internacao pediatrico ringer lactato ringer com lactato soro fisiologico sro soro de reidratacao oral ceftriaxona ondansetrona butilbrometo de escopolamina cloreto de potassio potassio kcl sulfato de zinco zinco paracetamol sódio glicosado manutenção reposição vancomicina potássio racecadotrila elementar",
 "hemorroida": "doença hemorroidária trombosada diclofenaco hemorroidas anal benefiber diclofenaco diosmina hesperidina proctyl psyllium envelope lidocaína dipirona ibuprofeno naproxeno sódico trombose hemorroidaria policresuleno plantago ovata doenca",
 "dismenorreia": "dismenorreia butilbrometo · piroxicam · meloxicam colica menstrual menstruacao tpm butilbrometo escopolamina meloxicam metoclopramida piroxicam ibuprofeno paracetamol naproxeno diclofenaco dimenidrinato nimesulida ácido mefenâmico",
 "dpoc": "dpoc descompensada amoxicilina pulmao respiratoria bronquite aerossol amoxicilina azitromicina dipirona omeprazol prednisona salbutamol spray exacerbacao hidrocortisona fenoterol ipratropio brometo nebulizacao oxigenio clavulanato ceftriaxona ventilacao vni gasometria endovenoso internacao broncodilatador corticoide pseudomonas escarro doxiciclina amoxicilina-clavulanato oxigênio suplementar bromidrato inalação ipratrópio enoxaparina sódica potássio cefepima piperacilina tazobactam levofloxacino metilprednisolona doenca pulmonar obstrutiva cronica enfisema bronquite cronica succinato paracetamol",
 "eczema": "eczema de contato betametasona · clobetazol betametasona clobetazol creme loratadina hidrocortisona dexclorfeniramina cefazolina prednisolona dipirona valerato acetato prednisona hidroxizina clindamicina dermatite de contato cetirizina propionato clobetasol",
 "enxaqueca": "enxaqueca naproxeno · naratripano · sumatriptano migranea migrânea aura triptano cefalium cefaliv codeína dipirona metoclopramida naproxeno naratripano paracetamol sumatriptano sódico cetoprofeno dexametasona cloreto clatonal status cocktail sumax imigran liófilo sódio clorpromazina sulfato magnésio ibuprofeno rizatriptano naratriptano naramig hidroergotamina diclofenaco dimenidrinato ondansetrona di-hidroergotamina",
 "epididimite": "epididimite / orquite ciprofloxacino ciprofloxacino ceftriaxona doxiciclina ibuprofeno dipirona levofloxacino orquiepididimite",
 "erisipela": "erisipela e celulite cefalexina · clindamicina cefalexina clindamicina ssti infeccao de pele cefazolina vancomicina ceftriaxona dipirona mrsa forma purulenta abscesso estreptococo internacao pediatrico enoxaparina sódica benzilpenicilina potássica piperacilina tazobactam amoxicilina clavulanato potássio fenoximetilpenicilina oxacilina benzatina cristalina ibuprofeno paracetamol",
 "escabiose": "escabiose ivermectina sarna hidroxizina ivermectina permetrina dexclorfeniramina prurido coceira lesoes escabicida loção enxofre precipitado vaselina sólida benzoato benzila",
 "faringo_inesp": "faringoamigdalite inespecífica dipirona garganta amigdalite faringite respiratoria benalet dipirona penicilina cristalina benzatina ampicilina sulbactam dexametasona amoxicilina cefalexina ibuprofeno paracetamol estreptococica odinofagia internacao pediatrico flurbiprofeno pastilha cetoprofeno liófilo cloreto sódio clindamicina azitromicina dor de garganta faringite viral difenidramina amonio",
 "faringo_estrep": "faringoamigdalite estreptocócica amoxicilina · azitromicina garganta amigdalite estreptococo respiratoria amoxicilina azitromicina dipirona omeprazol penicilina cristalina benzatina ampicilina ceftriaxona clindamicina dexametasona ibuprofeno paracetamol estreptococica internacao pediatrico benzilpenicilina cefalexina cloreto sódio sulbactam dor de garganta amigdalite bacteriana cefuroxima cefadroxila",
 "gastrite": "gastrite / drge omeprazol refluxo azia drge epigastralgia domperidona omeprazol simeticona hidróxido alumínio refluxo gastroesofagico dispepsia pantoprazol lansoprazol esomeprazol",
 "gota": "gota — crise naproxeno · colchicina · prednisona colchicina dipirona naproxeno omeprazol prednisona sódico artrite gotosa podagra indometacina diclofenaco alopurinol paracetamol",
 "h1n1": "h1n1 — profilaxia oseltamivir oseltamivir tamiflu influenza gripe gripe a srag sindrome respiratoria aguda grave virose ceftriaxona azitromicina dipirona paracetamol antiviral oxigenio pneumonia coinfeccao bacteriana febre internacao pediatrico cápsula oxigênio cateter nasal máscara cloreto sódio gripal tratamento",
 "hordeolo": "hordéolo / blefarite ciprofloxacino ciprofloxacino dexametasona estéril oftálmica pomada tobramicina compressas mornas tercol amoxicilina cefalexina clindamicina clavulanato celulite pré-septal",
 "herpes_zoster": "herpes zóster aciclovir cobreiro aciclovir diclofenaco dipirona diprogenta prednisona valaciclovir amitriptilina gabapentina ibuprofeno naproxeno nimesulida paracetamol",
 "impetigo": "impetigo crostoso mupirocina · cefalexina cefalexina mupirocina pomada bolhoso ectima celulite piodermite cefazolina amoxicilina clavulanato clavulin dipirona clindamicina vancomicina mrsa estafilococo estreptococo glomerulonefrite crostas suspensao gotas pediatrico crianca internacao endovenoso potássio sulfametoxazol trimetoprima ácido fusídico",
 "itu": "itu / cistite sulfametoxazol · fosfomicina · nitrofurantoína cistite urina urinaria bexiga disuria ciprofloxacino fosfomicina granulado nitrofurantoína norfloxacino sulfametoxazol trimetoprima cefalexina suspensão pediátrico criança infantil dipirona cefuroxima ceftriaxona amoxicilina clavulanato potássio infeccao urinaria infeccao do trato urinario fenazopiridina",
 "intertrigo": "intertrigo / candidíase fluconazol · itraconazol fluconazol itraconazol trok miconazol nistatina hidrocortisona candidiase candida dobras fralda assadura micose nitrato dermatológico óxido zinco clotrimazol acetato balanopostite balanite",
 "lombalgia": "lombalgia mecânica dorilax® · diclofenaco · alginac lombar coluna costas alginac cafeína carisoprodol celecoxibe ciclobenzaprina diclofenaco dipirona dorilax paracetamol ibuprofeno dor lombar dor nas costas lumbago meloxicam tramadol naproxeno nimesulida",
 "meteorismo": "meteorismo (gases) simeticona gases flatulencia dipirona metoclopramida simeticona butilbrometo escopolamina",
 "micose_ungueal": "micose subungueal ureia creme manipulada nitrato oxiconazol ureia terbinafina amorolfina esmalte onicomicose micose de unha itraconazol fluconazol ciclopirox tioconazol",
 "nasofaringite": "nasofaringite / resfriado dipirona resfriado gripe coriza nariz respiratoria sindrome ambroxol cloridrato dipirona fisiológica seringa solução xarope paracetamol gotas pediátrico infantil criança febre antitérmico dipirona gotas paracetamol gotas soro fisiológico nasal ibuprofeno",
 "otite_externa": "otite externa aguda ciprofloxacino-dexametasona · sulfato · otosporin ouvido nadador ciprofloxacino dexametasona diclofenaco dipirona hidrocortisona neomicina otosporin polimixina solução sulfato tópica ceftazidima cefepime piperacilina tazobactam cetoprofeno otologica necrotizante maligna pseudomonas skull base osteomielite diabetico imunossuprimido pediatrico crianca peso suspensao gotas xarope paracetamol ibuprofeno internacao endovenoso otológica ciprofloxacino-hidrocortisona cefepima cloridrato tramadol ondansetrona naproxeno nimesulida",
 "otite_media": "otite média aguda amoxicilina ouvido otalgia amoxicilina clavulanato dipirona otite media oma dor de ouvido mastoidite ampicilina sulbactam ceftriaxona ondansetrona paracetamol ibuprofeno pediatrico internacao cefuroxima claritromicina cloridrato levofloxacino cefepima piperacilina tazobactam potássio azitromicina",
 "paralisia_facial": "paralisia facial (bell) valaciclovir · aciclovir aciclovir lácrima plus prednisona regenom valaciclovir carmelose sódica colírio dexpantenol oftálmico paralisia facial periferica crianca",
 "parasitoses": "parasitoses intestinais ivermectina · albendazol · secnidazol albendazol dipirona ivermectina metoclopramida nitazoxanida praziquantel prednisona secnidazol dexametasona fenitoina escopolamina butilbrometo omeprazol mebendazol metronidazol cloreto sodio paracetamol neurocisticercose helmintos ascaris giardiase amebiase obstrucao pediatrico internacao suspensao gotas sódio ondansetrona teclozana verminose vermes tinidazol",
 "pielonefrite": "pielonefrite ciprofloxacino · levofloxacino ciprofloxacino levofloxacino internacao internado hospitalar pediatrico crianca infeccao urinaria alta urosepse sepse urinaria ceftriaxona aztreonam gentamicina cefotaxima cefepima piperacilina tazobactam meropenem cefuroxima sulfametoxazol trimetoprima dipirona ondansetrona paracetamol soro fisiologico agua destilada endovenoso urocultura hemocultura antibiograma febre dor lombar punho percussao metoclopramida cloreto sódio amicacina cefalexina ampicilina sódica sulfato",
 "pitiriase": "pitiríase versicolor fluconazol · itraconazol fenticonazol fluconazol itraconazol spray cetoconazol xampu pano branco nitrato isoconazol ciclopirox olamina",
 "pneumonia": "pneumonia (comunidade) amoxicilina · azitromicina · claritromicina pulmao respiratoria tosse pac amoxicilina azitromicina cefuroxima claritromicina clavulanato dipirona levofloxacino moxifloxacino omeprazol ceftriaxona ampicilina sulbactam penicilina cristalina paracetamol oxigenio cloreto sodio soro cefalosporina macrolideo beta-lactamico internacao enfermaria uti sepse switch curb psi pediatrico pediatrica atipica micoplasma holliday segar doxiciclina amoxicilina-clavulanato oxigênio enoxaparina liófilo hidrocortisona ringer lactato potássio piperacilina tazobactam vancomicina cateter nasal benzilpenicilina potássica oxacilina pneumonia adquirida na comunidade broncopneumonia cefepima succinato máscara gentamicina",
 "prostatite": "prostatite ciprofloxacino ciprofloxacino dipirona ceftriaxona cloreto doxiciclina meropenem piperacilina sulfametoxazol trimetoprima",
 "queimaduras": "queimaduras sulfadiazina queimadura dipirona prata sulfadiazina queimado grande queimado scq superficie corporal queimada parkland ressuscitacao volemica ringer ringer lactato lactato soro glicosado cloreto de sodio cristaloide morfina paracetamol omeprazol ulcera de estresse cefazolina oxacilina clindamicina antibiotico celulite tetanico toxoide dt dtpa vacina antitetanica sulfadiazina de prata analgesia holliday-segar lund-browder lesao inalatoria oxigênio dupla adulto toxoides diftérico tetânico imunoglobulina humana antitetânica enoxaparina glicose componente conforme idade gaze aderente impregnada petrolato tipo rayon vaselinada ighat",
 "resfriado": "resfriado comum dipirona · maresis® · rinosoro gripe coriza nariz respiratoria sindrome tosse dipirona fisiológica maresis rinosoro salsep seringa solução spray ibuprofeno paracetamol gotas pediatrico crianca febre cloreto sódio nasal soro fisiológico oximetazolina",
 "rinite": "rinite alérgica fluticasona · fexofenadina nariz espirro respiratoria dexclorfeniramina fexofenadina fluticasona jato pseudoefedrina rinosoro spray alergica alergia espirros coriza prurido mometasona desloratadina cetirizina loratadina pediatrico crianca lactente xarope gotas solucao oral soro fisiologico sorofisiologico lavagem nasal lavagemnasal corticoide nasal spray nasal intranasal cloreto sódio dicloridrato furoato propionato budesonida azelastina",
 "rinossinusite": "rinossinusite dipirona · amoxicilina · azitromicina sinusite seios da face respiratoria sindrome amoxicilina azitromicina codeína dipirona fisiológica fluticasona jato levodropropizina maresis omeprazol seringa solução spray xarope ceftriaxona metronidazol clavulanato internacao internação pediatrico pediátrico complicada celulite orbitaria abscesso intracraniana suspensao gotas potássio doxiciclina soro fisiológico vancomicina levofloxacino paracetamol cefuroxima cloreto",
 "sua": "sangramento uterino anormal ácido sangramento menstrual etinilestradiol ferroso levonorgestrel piroxicam sulfato tranexâmico ácido ibuprofeno acetato medroxiprogesterona sangramento vaginal metrorragia menorragia mefenâmico naproxeno",
 "sutura": "sutura — profilaxia sulfato · cefalexina · tetanogamma® ferida corte laceracao antitetanica cefalexina contractubex diclofenaco dipirona neomicina sulfato tetanogamma sulfato de neomicina paracetamol ibuprofeno suspensão gotas pediátrico crianca criança ferimento mordedura vaselina sólida vacina dupla adulto imunoglobulina humana antitetânica adsorvida difteria tétano pertussis amoxicilina clavulanato potássio silicone cicatrizes naproxeno nimesulida",
 "tinha_capitis": "tinha capitis griseofulvina cetoconazol griseofulvina shampoo terbinafina tinea kerion couro cabeludo micose fungo dermatofito microsporum trichophyton",
 "tinha_corporis": "tinha corporis terbinafina cetirizina creme terbinafina dexclorfeniramina loratadina pediatrico crianca micose impingem tinea corporis antifungico coceira prurido miconazol tinha do corpo fluconazol frieira pe de atleta pedis cruris da virilha",
 "torcicolo": "torcicolo espasmódico ciclobenzaprina · cafeína · paracetamol betaciclodextrina cafeína carisoprodol cetoprofeno ciclobenzaprina diclofenaco dipirona dorilax nimesulida orfenadrina paracetamol naproxeno sódico dor no pescoco cervicalgia biperideno difenidramina ibuprofeno distonia reação distônica",
 "tce": "tce — analgesia e orientações dipirona cabeca craniano clorexidina dipirona spray traumatismo cranioencefalico trauma craniano glasgow observacao neurologica fenitoina levetiracetam manitol salina hipertonica hipertonica hipertensao intracraniana intracraniana heriacao convulsao crise convulsiva ondansetrona metoclopramida pecarn fontanela tetano cloreto sódio fenitoína paracetamol trauma de cranio pancada na cabeca",
 "trauma_toracico": "trauma torácico naproxeno · levodropropizina cafeína carisoprodol ciclobenzaprina codeína levodropropizina naproxeno paracetamol xarope internação endovenoso tramadol ondansetrona omeprazol ringer lactato enoxaparina oxigênio cefazolina toracostomia dreno morfina profilaxia pediátrico dipirona analgesia fratura costela arco costal pneumotórax hemotórax contusão pulmonar trombose tvp antibiótico intercostal sf cetoprofeno liófilo clindamicina ibuprofeno cateter nasal trauma de torax contusao toracica diclofenaco máscara",
 "ulceras": "úlceras de causas variadas clorafenicol · iruxol cefalexina clorafenicol colagenase diosmina hesperidina iruxol pomada fisiológica dipirona soro fisiológico ferida cronica ulcera venosa ulcera de pressao escara amoxicilina clindamicina",
 "vaginites": "vaginites / vaginoses / ists metronidazol · nistatina · fluconazol corrimento candidiase ist dst aciclovir azitromicina benzatina ceftriaxona ciprofloxacino creme dipirona doxiciclina doxicilina fluconazol geleia metoclopramida metronidazol nistatina penicilina vaginal miconazol vaginose bacteriana candidiase vaginal tricomoniase clindamicina itraconazol ondansetrona paracetamol",
 "vertigem": "vertigem e tontura dimenidrinato · flunarizina tontura labirintite betaistina cinarizina dimenidrinato dipirona flunarizina meclizina piridoxina prednisona metoclopramida ondansetrona prometazina paracetamol",
 "zika": "zika vírus dipirona arbovirose dipirona hidroxizina paracetamol ondansetrona imunoglobulina imunoglobulina humana enoxaparina dexclorfeniramina guillain barre guillain-barre soro fisiologico hidratacao internacao exantema prurido loratadina cloreto sódio metoclopramida intravenosa desloratadina repelente tópico base icaridina deet",
 "nauseas_vomitos": "nauseas e vomitos nauseas e vomitos enjoo enjoado ansia de vomito vomito vomitando gastroenterite mal estar estomago embrulhado desidratacao hiperemese metoclopramida ondansetrona dimenidrinato piridoxina soro reidratacao bromoprida cloreto fisiologico domperidona vitamina reidratação",
 "dor_abdominal": "dor abdominal, colica biliar e dispepsia dor abdominal dor de barriga dor na barriga colica biliar colica de vesicula calculo na vesicula colelitiase dispepsia epigastralgia queimacao no estomago empachamento indigestao gastrite azia butilbrometo escopolamina buscopan composto dipirona paracetamol diclofenaco omeprazol hidroxido aluminio cetoprofeno tramadol morfina metoclopramida ondansetrona hidróxido alumínio",
 "crise_hipertensiva": "crise hipertensiva (urgencia e emergencia) crise hipertensiva pressao alta pico hipertensivo urgencia hipertensiva emergencia hipertensiva hipertensao has pa elevada pressao 20 por 12 nitroprussiato nipride tridil captopril clonidina nitroglicerina losartana anlodipino hidroclorotiazida metoprolol tartarato hidralazina nifedipino magnésio sulfato de magnesio pre eclampsia eclampsia gestante puerpera",
 "hiperglicemia": "hiperglicemia e hipoglicemia hiperglicemia hipoglicemia glicose alta glicose baixa acucar alto acucar baixo diabetes descompensado cetoacidose cad estado hiperosmolar ehh hipo glicemia baixa insulina metformina dm2 glucagon cloreto soro fisiologico potassio regular bicarbonato humana pediatrica crianca ispad",
 "crise_convulsiva": "crise convulsiva crise convulsiva convulsao ataque epileptico epilepsia estado de mal epileptico crise epileptica ataque crise tonico clonica desmaio com tremores diazepam midazolam fenitoina hidantal levetiracetam keppra glicose tiamina fenitoína fenobarbital dipirona paracetamol febril febre crianca",
 "dor_toracica": "dor toracica / sindrome coronariana aguda dor toracica dor no peito aperto no peito angina infarto iam sca sindrome coronariana aguda iamcsst iamssst coracao precordialgia aas aspirina clopidogrel isordil isossorbida tridil nitroglicerina enoxaparina atorvastatina acido acetilsalicilico angioplastia primaria trombolise dinitrato morfina dipirona paracetamol ibuprofeno ticagrelor metoprolol succinato sódica seringas reperfusão primária trombólise ácido acetilsalicílico",
 "edema_agudo_pulmao": "edema agudo de pulmao / ic descompensada edema agudo de pulmao eap insuficiencia cardiaca descompensada icc ic descompensada congestao pulmonar falta de ar cansaco inchaco nas pernas dispneia ortopneia furosemida lasix isordil isossorbida tridil nitroglicerina dobutamina noradrenalina vni cpap dinitrato oxigenio ventilacao invasiva bipap nitroprussiato dapagliflozina hidroclorotiazida oxigênio ventilação acetazolamida isglt2",
 "peconhentos": "acidentes por animais peconhentos (escorpiao, serpente, aranha) acidente por animal peconhento picada de escorpiao escorpiao escorpionismo cobra picada de cobra serpente ofidismo jararaca cascavel coral aranha armadeira aranha marrom loxosceles phoneutria picada veneno soro antiescorpionico soro antiofidico soro antiaracnidico lidocaina vasoconstritor dipirona saesc antibotropico anticrotalico antielapidico paracetamol (escorpiao e serpente) lidocaína prednisolona prednisona antiaracnídico saar antiloxoscélico salox antiescorpiônico antilonômico salon antiofídico específico antibotrópico anticrotálico laquético antielapídico viuva negra lagarta taturana lonomia",
 "mordedura": "mordedura de cao ou gato mordedura mordida de cachorro mordida de cao mordida de gato arranhadura acidente com animal raiva antirrabica profilaxia da raiva vacina antirrabica soro antirrabico imunoglobulina antirrabica tetano antitetanica amoxicilina clavulanato doxiciclina cultivo celular ighar dupla adulto difteria dipirona paracetamol potassio adsorvida pertussis clindamicina ciprofloxacino sulfametoxazol trimetoprima humana antirrábica antitetânica antirrábico tétano",
 "abscesso_cutaneo": "abscesso cutaneo / furunculo abscesso cutaneo abscesso de pele furunculo carbunculo antraz tumor com pus caroco inflamado pus na pele foliculite drenagem cefalexina sulfametoxazol trimetoprima bactrim dipirona paracetamol ibuprofeno cefadroxila digluconato clorexidina mupirocina",
 "odontalgia": "odontalgia / abscesso dentario odontalgia dor de dente dente doendo abscesso dentario abscesso dental carie inflamada pulpite rosto inchado por dente gengiva inchada dentista ibuprofeno amoxicilina clindamicina naproxeno sodico dipirona paracetamol azitromicina cefalexina",
 "agitacao_psicomotora": "agitacao psicomotora / intoxicacao alcoolica aguda agitacao psicomotora paciente agitado agressivo surto psicotico surto contencao quimica intoxicacao alcoolica embriaguez bebado alcoolizado coma alcoolico haloperidol haldol prometazina fenergan midazolam dormonid risperidona tiamina glicose"
};
