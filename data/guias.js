/* ============================================================
   GUIAS (aba Guias — js/views/guias.js)
   GUIA_TIPOS = grupos da lista, na ordem. GUIA_ITENS = um objeto por guia:
   {
     "id": "itu",                  // endereço #/guias/<id> — minúsculo [a-z0-9_-], nunca renomear
     "tipo": "condicao" | "exame" | "referencia",
     "cond": "itu",                // opcional: id da condição em DATA (Prescrições) — atalho nos dois sentidos
     "nm": "...", "sub": "...", "kw": "...",   // kw: procurado (filtro + busca única), nunca mostrado
     "ic": "🩺",                   // opcional: emoji da lista quando não há "cond" (com "cond" vale o emoji da condição)
     "draft": true, "revisado": null,          // revisado: "AAAA-MM-DD" quando o médico assinar (aí tira o draft)
     "resumo": "duas ou três frases",
     "prontoTitulo": "Exame normal", "pronto": ["LINHA PRONTA PARA COLAR", ...],   // opcional (roteiros de exame)
     "secoes": [{"t": "Título", "itens": ["…"], "alerta"?: true, "offlabel"?: true}],
     "pendencias": ["…"],          // o que o médico precisa decidir/confirmar (caixa "Para o revisor", só com draft)
     "fontes": ["…"]
   }
   Texto original (não copiado de livros/apostilas); doses só onde ajudam a decidir — a prescrição fica em Prescrições.
   Todo o conteúdo é rascunho de IA até a revisão do médico.
   ============================================================ */
const GUIA_TIPOS = [
 {"key": "exame", "label": "Exame físico", "rotulo": "Roteiro de exame físico", "ic": "🩺"},
 {"key": "condicao", "label": "Condições", "rotulo": "Resumo da condição", "ic": "📄"},
 {"key": "referencia", "label": "Referências rápidas", "rotulo": "Referência rápida", "ic": "📋"}
];

const GUIA_ITENS = [
 {
  "id": "exame-geral",
  "tipo": "exame",
  "ic": "🧍",
  "nm": "Exame geral e sinais vitais",
  "sub": "ectoscopia · hidratação · perfusão · sinais vitais",
  "kw": "ectoscopia estado geral beg reg meg hidratacao perfusao tec enchimento capilar sinais vitais pa fc fr temperatura febre saturacao glicemia capilar hgt",
  "draft": true,
  "revisado": null,
  "resumo": "Primeira impressão em segundos (está grave ou não?), depois a ectoscopia e os sinais vitais completos — incluindo saturação e glicemia capilar quando houver qualquer alteração de consciência.",
  "prontoTitulo": "Exame geral normal",
  "pronto": [
   "BEG, LOTE, CORADO, HIDRATADO, ACIANÓTICO, ANICTÉRICO, AFEBRIL AO TOQUE, EUPNEICO EM AR AMBIENTE.",
   "TEC < 3 S. EXTREMIDADES AQUECIDAS.",
   "PA: ___ MMHG | FC: ___ BPM | FR: ___ IRPM | TAX: ___ °C | SATO2: ___% (AA) | HGT: ___ MG/DL"
  ],
  "secoes": [
   {"t": "Roteiro", "itens": [
    "Impressão geral: estado geral (BEG / REG / MEG), fácies, postura, se fala frases inteiras, se está confortável ou com dor.",
    "Consciência e orientação (LOTE = lúcido e orientado no tempo e no espaço); se alterado, aplicar a escala de Glasgow.",
    "Pele e mucosas: coloração (palidez, icterícia, cianose), hidratação (mucosas, turgor), sudorese.",
    "Perfusão: tempo de enchimento capilar (normal < 3 s), temperatura das extremidades, pulsos.",
    "Sinais vitais completos: PA, FC, FR, temperatura axilar, SpO2 (dizer se em ar ambiente ou com O2) e glicemia capilar quando indicado.",
    "Peso (e altura, quando o caso pedir dose por peso ou IMC)."
   ]},
   {"t": "Valores de referência no adulto", "itens": [
    "FC: 60–100 bpm. FR: 12–20 irpm. SpO2 ≥ 94% (na DPOC, alvo 88–92%).",
    "PA no consultório: < 120/80 ótima; 120–129/80–84 normal; 130–139/85–89 pré-hipertensão; ≥ 140/90 hipertensão.",
    "Temperatura axilar: febre a partir de 37,8 °C; hipotermia < 35 °C.",
    "Glicemia capilar: hipoglicemia < 70 mg/dL (< 54 mg/dL = clinicamente importante)."
   ]},
   {"t": "Sinais de gravidade", "alerta": true, "itens": [
    "Rebaixamento de consciência, confusão aguda ou agitação.",
    "PAS < 90 mmHg (ou queda > 40 mmHg do habitual), FC > 130 bpm, FR ≥ 22–25 irpm, SpO2 < 90%.",
    "Pele fria, moteada ou TEC > 3 s (hipoperfusão).",
    "qSOFA ≥ 2 (FR ≥ 22, PAS ≤ 100, alteração mental) ou NEWS2 ≥ 5: avaliar sepse e chamar ajuda (ver Escores)."
   ]}
  ],
  "pendencias": [
   "Confirmar o ponto de corte de febre usado no serviço (37,5 °C ou 37,8 °C axilar).",
   "Ajustar o texto pronto às abreviações que o senhor usa na evolução."
  ],
  "fontes": [
   "Porto CC, Porto AL. Semiologia Médica. 8ª ed. Guanabara Koogan; 2019.",
   "Bickley LS. Bates' Guide to Physical Examination and History Taking. 13ª ed. Wolters Kluwer; 2021.",
   "Barroso WKS et al. Diretrizes Brasileiras de Hipertensão Arterial – 2020. Arq Bras Cardiol. 2021;116(3):516-658.",
   "Royal College of Physicians. National Early Warning Score (NEWS) 2. 2017."
  ]
 },
 {
  "id": "exame-cardiovascular",
  "tipo": "exame",
  "ic": "❤️",
  "nm": "Exame cardiovascular",
  "sub": "ausculta · sopros · pulsos · edema · congestão",
  "kw": "acv cardiovascular coracao ausculta bulhas sopro levine ictus pulsos edema cacifo turgencia jugular estase insuficiencia cardiaca congestao b3",
  "draft": true,
  "revisado": null,
  "resumo": "Ausculta dos quatro focos com o paciente em decúbito a 30–45°, pulsos comparados dos dois lados e procura ativa de sinais de congestão (estase jugular, estertores, edema) e de baixo débito.",
  "prontoTitulo": "Exame cardiovascular normal",
  "pronto": [
   "ACV: RCR EM 2T, BNF, SEM SOPROS.",
   "PULSOS PERIFÉRICOS PALPÁVEIS E SIMÉTRICOS. TEC < 3 S.",
   "SEM TURGÊNCIA JUGULAR A 45°. SEM EDEMA DE MMII."
  ],
  "secoes": [
   {"t": "Roteiro", "itens": [
    "Inspeção: turgência jugular a 45°, edema, cianose, cicatrizes (esternotomia), abaulamentos.",
    "Palpação: ictus (localização e extensão; desviado para baixo e para a esquerda sugere cardiomegalia), frêmitos.",
    "Ausculta nos focos aórtico, pulmonar, tricúspide e mitral: ritmo, B1 e B2, B3/B4, sopros, atrito.",
    "Pulsos: radiais, femorais, pediosos e tibiais posteriores — amplitude e simetria; PA nos dois braços se dor torácica com suspeita de dissecção.",
    "Edema de membros: cacifo, extensão, simetria (assimétrico e doloroso: pensar em TVP — ver Wells)."
   ]},
   {"t": "Como descrever", "itens": [
    "Sopro: fase (sistólico/diastólico), foco, irradiação e intensidade de Levine 1 a 6 (4/6 em diante tem frêmito).",
    "Edema: cacifo 1+ a 4+ (pela profundidade e pelo tempo de retorno), até onde sobe (tornozelo, terço médio da perna, joelho).",
    "Pulsos: 0 ausente, 1+ diminuído, 2+ normal, 3+ amplo."
   ]},
   {"t": "Achados que mudam a conduta", "alerta": true, "itens": [
    "Dor torácica + assimetria de pulsos ou de PA entre os braços (> 20 mmHg): pensar em dissecção de aorta.",
    "B3, estase jugular, estertores e edema: congestão (IC descompensada).",
    "Hipotensão com bulhas abafadas e estase jugular: tamponamento.",
    "Sopro novo com febre: endocardite até prova em contrário.",
    "Membro frio, pálido, sem pulso e doloroso: oclusão arterial aguda."
   ]}
  ],
  "pendencias": [],
  "fontes": [
   "Porto CC, Porto AL. Semiologia Médica. 8ª ed. Guanabara Koogan; 2019.",
   "Bickley LS. Bates' Guide to Physical Examination and History Taking. 13ª ed. Wolters Kluwer; 2021.",
   "Marcondes-Braga FG et al. Atualização de Tópicos Emergentes da Diretriz Brasileira de Insuficiência Cardíaca – 2021. Arq Bras Cardiol. 2021;116(6):1174-1212."
  ]
 },
 {
  "id": "exame-respiratorio",
  "tipo": "exame",
  "ic": "🫁",
  "nm": "Exame respiratório",
  "sub": "inspeção · ausculta · ruídos adventícios · desconforto",
  "kw": "ar aparelho respiratorio pulmao ausculta murmurio vesicular mv estertores crepitantes sibilos roncos estridor atrito pleural tiragem desconforto respiratorio saturacao fremito percussao",
  "draft": true,
  "revisado": null,
  "resumo": "Contar a FR por 30–60 s, olhar o trabalho respiratório antes de auscultar e auscultar comparando os dois lados, de cima para baixo, na frente e atrás.",
  "prontoTitulo": "Exame respiratório normal",
  "pronto": [
   "AR: EUPNEICO, SEM USO DE MUSCULATURA ACESSÓRIA.",
   "MV PRESENTE E SIMÉTRICO, SEM RUÍDOS ADVENTÍCIOS.",
   "SATO2 ___% EM AR AMBIENTE."
  ],
  "secoes": [
   {"t": "Roteiro", "itens": [
    "Inspeção: FR, padrão, uso de musculatura acessória, tiragem, batimento de asa de nariz, se completa frases.",
    "Palpação: expansibilidade (simétrica?), frêmito toracovocal (aumentado na consolidação, diminuído no derrame e no pneumotórax).",
    "Percussão: maciça no derrame/consolidação; timpânica/hipersonora no pneumotórax.",
    "Ausculta comparando os dois lados: murmúrio vesicular, ruídos adventícios, ausculta da voz.",
    "SpO2 em ar ambiente (anotar se com O2 e quantos L/min)."
   ]},
   {"t": "Ruídos adventícios", "itens": [
    "Estertores finos (crepitantes): fim da inspiração, não mudam com a tosse — pneumonia, congestão, fibrose.",
    "Estertores grossos (bolhosos): início da inspiração e expiração, mudam com a tosse — secreção em vias aéreas.",
    "Sibilos: expiratórios, musicais — broncoespasmo (asma, DPOC, congestão).",
    "Roncos: graves, mudam com a tosse — secreção em brônquios maiores.",
    "Estridor: inspiratório, alto, ouvido sem estetoscópio — obstrução de via aérea alta (emergência).",
    "Atrito pleural: 'couro', nas duas fases, localizado — pleurite."
   ]},
   {"t": "Sinais de gravidade", "alerta": true, "itens": [
    "Não completa frases, tiragem, respiração paradoxal, cianose, exaustão.",
    "Tórax silencioso na crise de asma (pouco ou nenhum sibilo com muito esforço): risco de parada.",
    "SpO2 < 90% apesar de O2, FR > 30 irpm, confusão ou sonolência (hipercapnia).",
    "Ausência de MV de um lado com hipotensão e desvio de traqueia: pneumotórax hipertensivo (descomprimir — ver Procedimentos)."
   ]}
  ],
  "pendencias": [],
  "fontes": [
   "Porto CC, Porto AL. Semiologia Médica. 8ª ed. Guanabara Koogan; 2019.",
   "Bickley LS. Bates' Guide to Physical Examination and History Taking. 13ª ed. Wolters Kluwer; 2021.",
   "Global Initiative for Asthma (GINA). Global Strategy for Asthma Management and Prevention, 2025."
  ]
 },
 {
  "id": "exame-abdome",
  "tipo": "exame",
  "ic": "🫃",
  "nm": "Exame do abdome",
  "sub": "inspeção · ausculta · percussão · palpação · sinais",
  "kw": "abdome abd abdominal palpacao blumberg descompressao brusca murphy rovsing psoas obturador giordano piparote ascite hernia defesa peritonite apendicite colecistite",
  "draft": true,
  "revisado": null,
  "resumo": "Ordem: inspeção, ausculta, percussão e palpação (superficial, depois profunda), começando longe do ponto de dor. A pergunta principal no PS: tem peritonite ou não?",
  "prontoTitulo": "Exame do abdome normal",
  "pronto": [
   "ABD: PLANO, RHA PRESENTES, FLÁCIDO, INDOLOR À PALPAÇÃO SUPERFICIAL E PROFUNDA.",
   "SEM MASSAS OU VISCEROMEGALIAS PALPÁVEIS. DESCOMPRESSÃO BRUSCA NEGATIVA.",
   "MURPHY NEGATIVO. GIORDANO NEGATIVO BILATERALMENTE."
  ],
  "secoes": [
   {"t": "Roteiro", "itens": [
    "Inspeção: forma (plano, globoso, distendido), cicatrizes, hérnias (pedir para tossir), equimoses.",
    "Ausculta: ruídos hidroaéreos (ausentes no íleo/peritonite; metálicos na obstrução).",
    "Percussão: timpanismo, macicez móvel (ascite), dor à percussão (irritação peritoneal).",
    "Palpação superficial e profunda pelos quadrantes, deixando o ponto doloroso por último; fígado e baço.",
    "Punho-percussão lombar (Giordano) e, quando indicado, exame da região inguinal e toque retal."
   ]},
   {"t": "Sinais", "itens": [
    "Blumberg (descompressão brusca dolorosa em FID): irritação peritoneal — apendicite.",
    "Rovsing (dor em FID ao comprimir a FIE), psoas e obturador positivos: apendicite (retrocecal/pélvica).",
    "Murphy (parada da inspiração à palpação do hipocôndrio direito): colecistite.",
    "Giordano positivo: pielonefrite ou cólica renal.",
    "Piparote / macicez móvel: ascite.",
    "Defesa voluntária × involuntária (abdome em tábua = peritonite generalizada)."
   ]},
   {"t": "Sinais de alarme", "alerta": true, "itens": [
    "Abdome em tábua, descompressão dolorosa difusa, dor desproporcional ao exame (isquemia mesentérica).",
    "Distensão com vômitos e parada de eliminação de gases e fezes: obstrução.",
    "Massa pulsátil dolorosa com hipotensão: aneurisma de aorta roto.",
    "Mulher em idade fértil com dor abdominal: beta-hCG (gravidez ectópica).",
    "Idoso, imunossuprimido e gestante podem ter peritonite com exame pobre."
   ]}
  ],
  "pendencias": [],
  "fontes": [
   "Porto CC, Porto AL. Semiologia Médica. 8ª ed. Guanabara Koogan; 2019.",
   "Bickley LS. Bates' Guide to Physical Examination and History Taking. 13ª ed. Wolters Kluwer; 2021.",
   "Di Saverio S et al. Diagnosis and treatment of acute appendicitis: 2020 update of the WSES Jerusalem guidelines. World J Emerg Surg. 2020;15:27."
  ]
 },
 {
  "id": "exame-neurologico",
  "tipo": "exame",
  "ic": "🧠",
  "nm": "Exame neurológico",
  "sub": "Glasgow · pupilas · força · reflexos · meníngeos · marcha",
  "kw": "neuro neurologico glasgow pupilas nervos cranianos forca grau reflexos babinski sensibilidade coordenacao marcha romberg rigidez de nuca kernig brudzinski meningite hints vertigem avc deficit focal",
  "draft": true,
  "revisado": null,
  "resumo": "Roteiro curto para o PS: nível de consciência, pupilas, nervos cranianos, força e sensibilidade nos quatro membros, reflexos, coordenação, marcha e sinais meníngeos. Déficit focal de início súbito = protocolo de AVC (NIHSS em Escores).",
  "prontoTitulo": "Exame neurológico normal",
  "pronto": [
   "NEURO: GLASGOW 15 (O4 V5 M6). PUPILAS ISOCÓRICAS E FOTORREAGENTES.",
   "PARES CRANIANOS SEM ALTERAÇÕES. FORÇA GRAU 5 E SENSIBILIDADE PRESERVADA NOS 4 MEMBROS.",
   "REFLEXOS SIMÉTRICOS, CUTÂNEO-PLANTAR EM FLEXÃO. COORDENAÇÃO E MARCHA SEM ALTERAÇÕES.",
   "SEM SINAIS MENÍNGEOS."
  ],
  "secoes": [
   {"t": "Roteiro", "itens": [
    "Consciência: Glasgow (abertura ocular, resposta verbal, resposta motora) — ver Escores.",
    "Pupilas: tamanho, simetria e reflexo fotomotor; movimentação ocular (nistagmo, paralisias).",
    "Pares cranianos rápido: mímica facial (paralisia central poupa a testa; periférica pega a testa), palato e língua, fala (disartria, afasia).",
    "Força por grupo muscular de 0 a 5 e manobras deficitárias (Mingazzini, braços estendidos).",
    "Sensibilidade tátil e dolorosa comparando os lados; nível sensitivo se suspeita medular.",
    "Reflexos (patelar, aquileu, bicipital) e cutâneo-plantar (Babinski = extensão do hálux).",
    "Coordenação (índex-nariz, calcanhar-joelho), Romberg e marcha.",
    "Sinais meníngeos: rigidez de nuca, Kernig, Brudzinski."
   ]},
   {"t": "Como graduar", "itens": [
    "Força: 0 sem contração; 1 contração sem movimento; 2 move sem vencer a gravidade; 3 vence a gravidade; 4 vence alguma resistência; 5 normal.",
    "Reflexos: 0 ausente; 1+ diminuído; 2+ normal; 3+ vivo; 4+ com clônus.",
    "Vertigem aguda contínua: HINTS (impulso cefálico, nistagmo, skew) — impulso cefálico normal, nistagmo que muda de direção ou skew presente sugerem causa central (AVC de fossa posterior)."
   ]},
   {"t": "Sinais de alarme", "alerta": true, "itens": [
    "Déficit focal súbito, desvio de rima, disartria ou afasia: AVC — horário do último momento visto bem e NIHSS.",
    "Anisocoria com rebaixamento: herniação — via aérea, cabeceira elevada, TC urgente.",
    "Febre + rigidez de nuca/alteração mental: meningite — antibiótico sem esperar a punção quando houver atraso.",
    "Cefaleia súbita e explosiva (pior da vida): hemorragia subaracnoide.",
    "Fraqueza ascendente com arreflexia (Guillain-Barré) ou nível sensitivo com retenção urinária (compressão medular)."
   ]}
  ],
  "pendencias": [],
  "fontes": [
   "Porto CC, Porto AL. Semiologia Médica. 8ª ed. Guanabara Koogan; 2019.",
   "Campbell WW, Barohn RJ. DeJong's The Neurologic Examination. 8ª ed. Wolters Kluwer; 2019.",
   "Kattah JC et al. HINTS to diagnose stroke in the acute vestibular syndrome. Stroke. 2009;40(11):3504-10.",
   "Powers WJ et al. Guidelines for the Early Management of Patients With Acute Ischemic Stroke: 2019 Update. Stroke. 2019;50:e344-e418."
  ]
 },
 {
  "id": "exame-osteomuscular",
  "tipo": "exame",
  "ic": "🦴",
  "nm": "Exame osteomuscular e da coluna",
  "sub": "lombalgia · Lasègue · raízes · joelho · tornozelo",
  "kw": "osteomuscular ortopedico coluna lombar lombalgia lasegue ciatalgia radiculopatia raiz l4 l5 s1 joelho lachman gaveta mcmurray tornozelo ottawa entorse ombro artrite",
  "draft": true,
  "revisado": null,
  "resumo": "Inspeção, palpação, mobilidade ativa e passiva e testes específicos da articulação; na coluna, testes de tensão radicular e exame neurológico dos membros inferiores por raiz, sempre procurando sinais de alerta.",
  "prontoTitulo": "Coluna lombar sem alterações",
  "pronto": [
   "COLUNA LOMBAR: SEM DEFORMIDADES. DOR À PALPAÇÃO DA MUSCULATURA PARAVERTEBRAL ___.",
   "LASÈGUE NEGATIVO BILATERALMENTE.",
   "FORÇA, SENSIBILIDADE E REFLEXOS DOS MMII PRESERVADOS E SIMÉTRICOS."
  ],
  "secoes": [
   {"t": "Coluna lombar — roteiro", "itens": [
    "Inspeção (postura, escoliose antálgica) e palpação (processos espinhosos × musculatura paravertebral).",
    "Mobilidade: flexão, extensão, inclinação lateral.",
    "Lasègue: dor irradiada abaixo do joelho entre 30° e 70° de elevação da perna estendida = radiculopatia; Lasègue cruzado é mais específico para hérnia de disco.",
    "Raízes: L4 — extensão do joelho e reflexo patelar; L5 — dorsiflexão do hálux e marcha nos calcanhares; S1 — flexão plantar, marcha na ponta dos pés e reflexo aquileu."
   ]},
   {"t": "Joelho e tornozelo", "itens": [
    "Joelho: derrame (choque da patela), Lachman e gaveta anterior (LCA), estresse em varo/valgo (colaterais), McMurray (menisco).",
    "Tornozelo/pé após trauma: aplicar as regras de Ottawa para decidir a radiografia (ver Escores).",
    "Articulação quente, vermelha e dolorosa com febre: artrite séptica até prova em contrário (puncionar)."
   ]},
   {"t": "Sinais de alerta na lombalgia", "alerta": true, "itens": [
    "Anestesia em sela, retenção ou incontinência urinária/fecal, fraqueza progressiva: síndrome da cauda equina (RM urgente).",
    "Febre, uso de droga EV, imunossupressão: infecção (espondilodiscite, abscesso epidural).",
    "Câncer prévio, perda de peso, dor noturna que não melhora em repouso: metástase.",
    "Trauma importante ou osteoporose: fratura.",
    "Dor lombar súbita com hipotensão em idoso: aneurisma de aorta."
   ]}
  ],
  "pendencias": [],
  "fontes": [
   "Hebert S et al. Ortopedia e Traumatologia: Princípios e Prática. 5ª ed. Artmed; 2017.",
   "Bickley LS. Bates' Guide to Physical Examination and History Taking. 13ª ed. Wolters Kluwer; 2021.",
   "National Institute for Health and Care Excellence (NICE). Low back pain and sciatica in over 16s: assessment and management (NG59). Atualizado 2020.",
   "Stiell IG et al. Decision rules for the use of radiography in acute ankle injuries. JAMA. 1993;269(9):1127-32."
  ]
 },
 {
  "id": "exame-orl",
  "tipo": "exame",
  "ic": "👂",
  "nm": "Cabeça e pescoço: oroscopia, otoscopia e linfonodos",
  "sub": "orofaringe · ouvido · seios da face · linfonodos",
  "kw": "orl otorrino oroscopia orofaringe amigdala faringite exsudato abscesso periamigdaliano otoscopia otite membrana timpanica rinoscopia sinusite seios da face linfonodos pescoco tireoide centor mcisaac",
  "draft": true,
  "revisado": null,
  "resumo": "Boa luz e abaixador de língua para a orofaringe, otoscópio para os dois ouvidos (o sem queixa primeiro) e palpação das cadeias linfonodais do pescoço.",
  "prontoTitulo": "Exame normal",
  "pronto": [
   "OROSCOPIA: OROFARINGE SEM HIPEREMIA, AMÍGDALAS NORMOTRÓFICAS SEM EXSUDATO.",
   "OTOSCOPIA: CONDUTOS LIVRES, MEMBRANAS TIMPÂNICAS ÍNTEGRAS E TRANSLÚCIDAS BILATERALMENTE.",
   "SEM LINFONODOMEGALIAS CERVICAIS PALPÁVEIS."
  ],
  "secoes": [
   {"t": "Roteiro", "itens": [
    "Orofaringe: hiperemia, exsudato, petéquias no palato, simetria das amígdalas e posição da úvula.",
    "Ouvidos: conduto (edema, secreção — otite externa; dor ao tracionar o pavilhão), membrana timpânica (cor, abaulamento, perfuração, nível líquido).",
    "Nariz e seios: secreção, edema de cornetos, dor à palpação dos seios maxilares e frontais.",
    "Pescoço: linfonodos (tamanho, dor, consistência, mobilidade), tireoide, rigidez."
   ]},
   {"t": "Como interpretar", "itens": [
    "Faringite: escore de Centor/McIsaac orienta teste rápido/antibiótico (ver Escores) — tosse e coriza falam a favor de vírus.",
    "Otite média aguda: membrana timpânica abaulada (ou otorreia recente) é o achado que fecha o diagnóstico; só hiperemia não basta.",
    "Linfonodo > 2 cm, endurecido, aderido, ou que persiste > 4–6 semanas: investigar."
   ]},
   {"t": "Sinais de alarme", "alerta": true, "itens": [
    "Trismo, voz abafada ('batata quente'), abaulamento de uma amígdala com desvio da úvula: abscesso periamigdaliano.",
    "Salivação, estridor, posição em tripé, dificuldade para engolir a saliva: epiglotite/obstrução de via aérea — não examinar a orofaringe à força.",
    "Edema e dor retroauricular com deslocamento do pavilhão: mastoidite.",
    "Edema periorbitário com dor à movimentação ocular ou proptose: celulite orbitária."
   ]}
  ],
  "pendencias": [],
  "fontes": [
   "Porto CC, Porto AL. Semiologia Médica. 8ª ed. Guanabara Koogan; 2019.",
   "Lieberthal AS et al. The diagnosis and management of acute otitis media. Pediatrics. 2013;131(3):e964-99 (AAP).",
   "McIsaac WJ et al. Empirical validation of guidelines for the management of pharyngitis in children and adults. JAMA. 2004;291(13):1587-95."
  ]
 },
 {
  "id": "exame-pele",
  "tipo": "exame",
  "ic": "🧴",
  "nm": "Exame da pele",
  "sub": "lesões elementares · descrição · sinais de gravidade",
  "kw": "pele dermatologico lesao elementar macula papula placa nodulo vesicula bolha pustula crosta ulcera exantema petequias purpura celulite erisipela abscesso fasciite necrotizante nikolsky",
  "draft": true,
  "revisado": null,
  "resumo": "Descrever a lesão elementar, o tamanho, a cor, a distribuição e a evolução; procurar sinais de infecção profunda e de doença sistêmica grave.",
  "prontoTitulo": "Modelo de descrição",
  "pronto": [
   "PELE: LESÃO ___ (MÁCULA / PÁPULA / PLACA / VESÍCULA / PÚSTULA / ÚLCERA) EM ___, MEDINDO ___ CM,",
   "DE COR ___, BORDAS ___, COM / SEM CALOR, FLUTUAÇÃO OU SECREÇÃO. SEM LINFANGITE."
  ],
  "secoes": [
   {"t": "Lesões elementares", "itens": [
    "Mácula: mancha plana (< 1 cm; acima disso, mancha). Pápula: elevada, sólida, < 1 cm. Placa: elevada, > 1 cm. Nódulo: sólido, profundo.",
    "Vesícula: líquido claro, < 1 cm; bolha: > 1 cm. Pústula: conteúdo purulento.",
    "Crosta, escama, erosão e úlcera (perda até a derme ou mais).",
    "Petéquias e púrpura não desaparecem à vitropressão (pressionar com lâmina ou copo)."
   ]},
   {"t": "Infecções de pele", "itens": [
    "Erisipela: placa vermelha brilhante, bordas nítidas e elevadas. Celulite: bordas mal definidas, mais profunda.",
    "Abscesso: área flutuante — drenar (a drenagem é o tratamento principal).",
    "Marcar a borda do eritema com caneta e anotar a hora, para comparar a evolução."
   ]},
   {"t": "Sinais de gravidade", "alerta": true, "itens": [
    "Dor desproporcional, bolhas hemorrágicas, crepitação, necrose, toxemia: fasciíte necrotizante — cirurgia urgente.",
    "Febre + petéquias/púrpura que se espalham: meningococcemia — antibiótico imediato.",
    "Descolamento da pele à fricção (Nikolsky) ou lesões em mucosas: Stevens-Johnson / NET (suspender o fármaco suspeito).",
    "Urticária com hipotensão, broncoespasmo ou edema de glote: anafilaxia — adrenalina IM."
   ]}
  ],
  "pendencias": [],
  "fontes": [
   "Azulay RD, Azulay DR, Azulay-Abulafia L. Dermatologia. 8ª ed. Guanabara Koogan; 2022.",
   "Stevens DL et al. Practice Guidelines for the Diagnosis and Management of Skin and Soft Tissue Infections: 2014 Update by the IDSA. Clin Infect Dis. 2014;59(2):e10-52."
  ]
 },
 {
  "id": "exame-pediatrico",
  "tipo": "exame",
  "ic": "👶",
  "nm": "Exame pediátrico no PS",
  "sub": "triângulo de avaliação · sinais vitais por idade · desidratação",
  "kw": "pediatria crianca lactente triangulo de avaliacao pediatrica tep aparencia sinais vitais por idade frequencia cardiaca respiratoria pressao arterial desidratacao plano a b c fontanela prega",
  "draft": true,
  "revisado": null,
  "resumo": "Antes de tocar na criança, o triângulo de avaliação pediátrica (aparência, trabalho respiratório, circulação da pele) diz se ela está grave. Depois, sinais vitais comparados com a faixa da idade e avaliação de hidratação.",
  "prontoTitulo": "Exame pediátrico normal",
  "pronto": [
   "BEG, ATIVO E REATIVO, CORADO, HIDRATADO, ACIANÓTICO, ANICTÉRICO, EUPNEICO.",
   "FONTANELA ANTERIOR NORMOTENSA (SE LACTENTE). TEC < 2 S.",
   "FC: ___ BPM | FR: ___ IRPM | TAX: ___ °C | SATO2: ___% | PESO: ___ KG"
  ],
  "secoes": [
   {"t": "Triângulo de avaliação pediátrica", "itens": [
    "Aparência: tônus, interação, consolabilidade, olhar, fala/choro.",
    "Trabalho respiratório: ruídos (estridor, gemência, sibilo), tiragem, batimento de asa de nariz, posição.",
    "Circulação da pele: palidez, pele moteada, cianose.",
    "Um lado alterado já pede atenção; aparência alterada = criança grave."
   ]},
   {"t": "Sinais vitais acordado (faixas de referência PALS 2020)", "itens": [
    "Lactente (1–12 meses): FC 100–180; FR 30–53; PAS 72–104.",
    "1–2 anos: FC 98–140; FR 22–37; PAS 86–106.",
    "3–5 anos: FC 80–120; FR 20–28; PAS 89–112.",
    "6–11 anos: FC 75–118; FR 18–25; PAS 97–115.",
    "12–15 anos: FC 60–100; FR 12–20; PAS 110–131.",
    "Hipotensão de 1 a 10 anos: PAS < 70 + (2 × idade em anos)."
   ]},
   {"t": "Hidratação (manejo da diarreia, Ministério da Saúde)", "itens": [
    "Sem desidratação (plano A): alerta, olhos normais, bebe normalmente, prega desaparece rápido.",
    "Desidratação (plano B): dois ou mais de — irritada, olhos fundos, bebe com avidez, prega desaparece lentamente, TEC 3–5 s.",
    "Desidratação grave (plano C): dois ou mais de — letárgica ou inconsciente, olhos muito fundos, bebe mal ou não consegue, prega desaparece muito lentamente, pulso fraco, TEC > 5 s.",
    "Ver a condição Diarreia em Prescrições para os volumes de cada plano."
   ]},
   {"t": "Sinais de alarme", "alerta": true, "itens": [
    "Letargia, choro fraco ou inconsolável, não reconhece os pais, fontanela abaulada.",
    "Gemência, tiragem importante, apneia, SpO2 < 92%.",
    "Lactente < 3 meses com febre ≥ 38 °C: avaliação completa (risco de infecção bacteriana grave).",
    "Petéquias com febre, convulsão, sinais de desidratação grave."
   ]}
  ],
  "pendencias": [
   "Confirmar se o serviço usa as faixas do PALS 2020 ou outra tabela de sinais vitais pediátricos."
  ],
  "fontes": [
   "American Heart Association. Pediatric Advanced Life Support (PALS) Provider Manual. 2020.",
   "Dieckmann RA, Brownstein D, Gausche-Hill M. The pediatric assessment triangle. Pediatr Emerg Care. 2010;26(4):312-5.",
   "Brasil. Ministério da Saúde. Manejo do paciente com diarreia (cartaz). Brasília; 2023.",
   "Sociedade Brasileira de Pediatria. Tratado de Pediatria. 5ª ed. Manole; 2022."
  ]
 }
];
