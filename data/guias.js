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
 {
  "key": "exame",
  "label": "Exame físico",
  "rotulo": "Roteiro de exame físico",
  "ic": "🩺"
 },
 {
  "key": "condicao",
  "label": "Condições",
  "rotulo": "Resumo da condição",
  "ic": "📄"
 },
 {
  "key": "referencia",
  "label": "Referências rápidas",
  "rotulo": "Referência rápida",
  "ic": "📋"
 }
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
   {
    "t": "Roteiro",
    "itens": [
     "Impressão geral: estado geral (BEG / REG / MEG), fácies, postura, se fala frases inteiras, se está confortável ou com dor.",
     "Consciência e orientação (LOTE = lúcido e orientado no tempo e no espaço); se alterado, aplicar a escala de Glasgow.",
     "Pele e mucosas: coloração (palidez, icterícia, cianose), hidratação (mucosas, turgor), sudorese.",
     "Perfusão: tempo de enchimento capilar (normal < 3 s), temperatura das extremidades, pulsos.",
     "Sinais vitais completos: PA, FC, FR, temperatura axilar, SpO2 (dizer se em ar ambiente ou com O2) e glicemia capilar quando indicado.",
     "Peso (e altura, quando o caso pedir dose por peso ou IMC)."
    ]
   },
   {
    "t": "Valores de referência no adulto",
    "itens": [
     "FC: 60–100 bpm. FR: 12–20 irpm. SpO2 ≥ 94% (na DPOC, alvo 88–92%).",
     "PA no consultório: < 120/80 ótima; 120–129/80–84 normal; 130–139/85–89 pré-hipertensão; ≥ 140/90 hipertensão.",
     "Temperatura axilar: febre a partir de 37,8 °C; hipotermia < 35 °C.",
     "Glicemia capilar: hipoglicemia < 70 mg/dL (< 54 mg/dL = clinicamente importante)."
    ]
   },
   {
    "t": "Sinais de gravidade",
    "alerta": true,
    "itens": [
     "Rebaixamento de consciência, confusão aguda ou agitação.",
     "PAS < 90 mmHg (ou queda > 40 mmHg do habitual), FC > 130 bpm, FR ≥ 22–25 irpm, SpO2 < 90%.",
     "Pele fria, moteada ou TEC > 3 s (hipoperfusão).",
     "qSOFA ≥ 2 (FR ≥ 22, PAS ≤ 100, alteração mental) ou NEWS2 ≥ 5: avaliar sepse e chamar ajuda (ver Escores)."
    ]
   }
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
   {
    "t": "Roteiro",
    "itens": [
     "Inspeção: turgência jugular a 45°, edema, cianose, cicatrizes (esternotomia), abaulamentos.",
     "Palpação: ictus (localização e extensão; desviado para baixo e para a esquerda sugere cardiomegalia), frêmitos.",
     "Ausculta nos focos aórtico, pulmonar, tricúspide e mitral: ritmo, B1 e B2, B3/B4, sopros, atrito.",
     "Pulsos: radiais, femorais, pediosos e tibiais posteriores — amplitude e simetria; PA nos dois braços se dor torácica com suspeita de dissecção.",
     "Edema de membros: cacifo, extensão, simetria (assimétrico e doloroso: pensar em TVP — ver Wells)."
    ]
   },
   {
    "t": "Como descrever",
    "itens": [
     "Sopro: fase (sistólico/diastólico), foco, irradiação e intensidade de Levine 1 a 6 (4/6 em diante tem frêmito).",
     "Edema: cacifo 1+ a 4+ (pela profundidade e pelo tempo de retorno), até onde sobe (tornozelo, terço médio da perna, joelho).",
     "Pulsos: 0 ausente, 1+ diminuído, 2+ normal, 3+ amplo."
    ]
   },
   {
    "t": "Achados que mudam a conduta",
    "alerta": true,
    "itens": [
     "Dor torácica + assimetria de pulsos ou de PA entre os braços (> 20 mmHg): pensar em dissecção de aorta.",
     "B3, estase jugular, estertores e edema: congestão (IC descompensada).",
     "Hipotensão com bulhas abafadas e estase jugular: tamponamento.",
     "Sopro novo com febre: endocardite até prova em contrário.",
     "Membro frio, pálido, sem pulso e doloroso: oclusão arterial aguda."
    ]
   }
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
   {
    "t": "Roteiro",
    "itens": [
     "Inspeção: FR, padrão, uso de musculatura acessória, tiragem, batimento de asa de nariz, se completa frases.",
     "Palpação: expansibilidade (simétrica?), frêmito toracovocal (aumentado na consolidação, diminuído no derrame e no pneumotórax).",
     "Percussão: maciça no derrame/consolidação; timpânica/hipersonora no pneumotórax.",
     "Ausculta comparando os dois lados: murmúrio vesicular, ruídos adventícios, ausculta da voz.",
     "SpO2 em ar ambiente (anotar se com O2 e quantos L/min)."
    ]
   },
   {
    "t": "Ruídos adventícios",
    "itens": [
     "Estertores finos (crepitantes): fim da inspiração, não mudam com a tosse — pneumonia, congestão, fibrose.",
     "Estertores grossos (bolhosos): início da inspiração e expiração, mudam com a tosse — secreção em vias aéreas.",
     "Sibilos: expiratórios, musicais — broncoespasmo (asma, DPOC, congestão).",
     "Roncos: graves, mudam com a tosse — secreção em brônquios maiores.",
     "Estridor: inspiratório, alto, ouvido sem estetoscópio — obstrução de via aérea alta (emergência).",
     "Atrito pleural: 'couro', nas duas fases, localizado — pleurite."
    ]
   },
   {
    "t": "Sinais de gravidade",
    "alerta": true,
    "itens": [
     "Não completa frases, tiragem, respiração paradoxal, cianose, exaustão.",
     "Tórax silencioso na crise de asma (pouco ou nenhum sibilo com muito esforço): risco de parada.",
     "SpO2 < 90% apesar de O2, FR > 30 irpm, confusão ou sonolência (hipercapnia).",
     "Ausência de MV de um lado com hipotensão e desvio de traqueia: pneumotórax hipertensivo (descomprimir — ver Procedimentos)."
    ]
   }
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
   {
    "t": "Roteiro",
    "itens": [
     "Inspeção: forma (plano, globoso, distendido), cicatrizes, hérnias (pedir para tossir), equimoses.",
     "Ausculta: ruídos hidroaéreos (ausentes no íleo/peritonite; metálicos na obstrução).",
     "Percussão: timpanismo, macicez móvel (ascite), dor à percussão (irritação peritoneal).",
     "Palpação superficial e profunda pelos quadrantes, deixando o ponto doloroso por último; fígado e baço.",
     "Punho-percussão lombar (Giordano) e, quando indicado, exame da região inguinal e toque retal."
    ]
   },
   {
    "t": "Sinais",
    "itens": [
     "Blumberg (descompressão brusca dolorosa em FID): irritação peritoneal — apendicite.",
     "Rovsing (dor em FID ao comprimir a FIE), psoas e obturador positivos: apendicite (retrocecal/pélvica).",
     "Murphy (parada da inspiração à palpação do hipocôndrio direito): colecistite.",
     "Giordano positivo: pielonefrite ou cólica renal.",
     "Piparote / macicez móvel: ascite.",
     "Defesa voluntária × involuntária (abdome em tábua = peritonite generalizada)."
    ]
   },
   {
    "t": "Sinais de alarme",
    "alerta": true,
    "itens": [
     "Abdome em tábua, descompressão dolorosa difusa, dor desproporcional ao exame (isquemia mesentérica).",
     "Distensão com vômitos e parada de eliminação de gases e fezes: obstrução.",
     "Massa pulsátil dolorosa com hipotensão: aneurisma de aorta roto.",
     "Mulher em idade fértil com dor abdominal: beta-hCG (gravidez ectópica).",
     "Idoso, imunossuprimido e gestante podem ter peritonite com exame pobre."
    ]
   }
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
   {
    "t": "Roteiro",
    "itens": [
     "Consciência: Glasgow (abertura ocular, resposta verbal, resposta motora) — ver Escores.",
     "Pupilas: tamanho, simetria e reflexo fotomotor; movimentação ocular (nistagmo, paralisias).",
     "Pares cranianos rápido: mímica facial (paralisia central poupa a testa; periférica pega a testa), palato e língua, fala (disartria, afasia).",
     "Força por grupo muscular de 0 a 5 e manobras deficitárias (Mingazzini, braços estendidos).",
     "Sensibilidade tátil e dolorosa comparando os lados; nível sensitivo se suspeita medular.",
     "Reflexos (patelar, aquileu, bicipital) e cutâneo-plantar (Babinski = extensão do hálux).",
     "Coordenação (índex-nariz, calcanhar-joelho), Romberg e marcha.",
     "Sinais meníngeos: rigidez de nuca, Kernig, Brudzinski."
    ]
   },
   {
    "t": "Como graduar",
    "itens": [
     "Força: 0 sem contração; 1 contração sem movimento; 2 move sem vencer a gravidade; 3 vence a gravidade; 4 vence alguma resistência; 5 normal.",
     "Reflexos: 0 ausente; 1+ diminuído; 2+ normal; 3+ vivo; 4+ com clônus.",
     "Vertigem aguda contínua: HINTS (impulso cefálico, nistagmo, skew) — impulso cefálico normal, nistagmo que muda de direção ou skew presente sugerem causa central (AVC de fossa posterior)."
    ]
   },
   {
    "t": "Sinais de alarme",
    "alerta": true,
    "itens": [
     "Déficit focal súbito, desvio de rima, disartria ou afasia: AVC — horário do último momento visto bem e NIHSS.",
     "Anisocoria com rebaixamento: herniação — via aérea, cabeceira elevada, TC urgente.",
     "Febre + rigidez de nuca/alteração mental: meningite — antibiótico sem esperar a punção quando houver atraso.",
     "Cefaleia súbita e explosiva (pior da vida): hemorragia subaracnoide.",
     "Fraqueza ascendente com arreflexia (Guillain-Barré) ou nível sensitivo com retenção urinária (compressão medular)."
    ]
   }
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
   {
    "t": "Coluna lombar — roteiro",
    "itens": [
     "Inspeção (postura, escoliose antálgica) e palpação (processos espinhosos × musculatura paravertebral).",
     "Mobilidade: flexão, extensão, inclinação lateral.",
     "Lasègue: dor irradiada abaixo do joelho entre 30° e 70° de elevação da perna estendida = radiculopatia; Lasègue cruzado é mais específico para hérnia de disco.",
     "Raízes: L4 — extensão do joelho e reflexo patelar; L5 — dorsiflexão do hálux e marcha nos calcanhares; S1 — flexão plantar, marcha na ponta dos pés e reflexo aquileu."
    ]
   },
   {
    "t": "Joelho e tornozelo",
    "itens": [
     "Joelho: derrame (choque da patela), Lachman e gaveta anterior (LCA), estresse em varo/valgo (colaterais), McMurray (menisco).",
     "Tornozelo/pé após trauma: aplicar as regras de Ottawa para decidir a radiografia (ver Escores).",
     "Articulação quente, vermelha e dolorosa com febre: artrite séptica até prova em contrário (puncionar)."
    ]
   },
   {
    "t": "Sinais de alerta na lombalgia",
    "alerta": true,
    "itens": [
     "Anestesia em sela, retenção ou incontinência urinária/fecal, fraqueza progressiva: síndrome da cauda equina (RM urgente).",
     "Febre, uso de droga EV, imunossupressão: infecção (espondilodiscite, abscesso epidural).",
     "Câncer prévio, perda de peso, dor noturna que não melhora em repouso: metástase.",
     "Trauma importante ou osteoporose: fratura.",
     "Dor lombar súbita com hipotensão em idoso: aneurisma de aorta."
    ]
   }
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
   {
    "t": "Roteiro",
    "itens": [
     "Orofaringe: hiperemia, exsudato, petéquias no palato, simetria das amígdalas e posição da úvula.",
     "Ouvidos: conduto (edema, secreção — otite externa; dor ao tracionar o pavilhão), membrana timpânica (cor, abaulamento, perfuração, nível líquido).",
     "Nariz e seios: secreção, edema de cornetos, dor à palpação dos seios maxilares e frontais.",
     "Pescoço: linfonodos (tamanho, dor, consistência, mobilidade), tireoide, rigidez."
    ]
   },
   {
    "t": "Como interpretar",
    "itens": [
     "Faringite: escore de Centor/McIsaac orienta teste rápido/antibiótico (ver Escores) — tosse e coriza falam a favor de vírus.",
     "Otite média aguda: membrana timpânica abaulada (ou otorreia recente) é o achado que fecha o diagnóstico; só hiperemia não basta.",
     "Linfonodo > 2 cm, endurecido, aderido, ou que persiste > 4–6 semanas: investigar."
    ]
   },
   {
    "t": "Sinais de alarme",
    "alerta": true,
    "itens": [
     "Trismo, voz abafada ('batata quente'), abaulamento de uma amígdala com desvio da úvula: abscesso periamigdaliano.",
     "Salivação, estridor, posição em tripé, dificuldade para engolir a saliva: epiglotite/obstrução de via aérea — não examinar a orofaringe à força.",
     "Edema e dor retroauricular com deslocamento do pavilhão: mastoidite.",
     "Edema periorbitário com dor à movimentação ocular ou proptose: celulite orbitária."
    ]
   }
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
   {
    "t": "Lesões elementares",
    "itens": [
     "Mácula: mancha plana (< 1 cm; acima disso, mancha). Pápula: elevada, sólida, < 1 cm. Placa: elevada, > 1 cm. Nódulo: sólido, profundo.",
     "Vesícula: líquido claro, < 1 cm; bolha: > 1 cm. Pústula: conteúdo purulento.",
     "Crosta, escama, erosão e úlcera (perda até a derme ou mais).",
     "Petéquias e púrpura não desaparecem à vitropressão (pressionar com lâmina ou copo)."
    ]
   },
   {
    "t": "Infecções de pele",
    "itens": [
     "Erisipela: placa vermelha brilhante, bordas nítidas e elevadas. Celulite: bordas mal definidas, mais profunda.",
     "Abscesso: área flutuante — drenar (a drenagem é o tratamento principal).",
     "Marcar a borda do eritema com caneta e anotar a hora, para comparar a evolução."
    ]
   },
   {
    "t": "Sinais de gravidade",
    "alerta": true,
    "itens": [
     "Dor desproporcional, bolhas hemorrágicas, crepitação, necrose, toxemia: fasciíte necrotizante — cirurgia urgente.",
     "Febre + petéquias/púrpura que se espalham: meningococcemia — antibiótico imediato.",
     "Descolamento da pele à fricção (Nikolsky) ou lesões em mucosas: Stevens-Johnson / NET (suspender o fármaco suspeito).",
     "Urticária com hipotensão, broncoespasmo ou edema de glote: anafilaxia — adrenalina IM."
    ]
   }
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
   {
    "t": "Triângulo de avaliação pediátrica",
    "itens": [
     "Aparência: tônus, interação, consolabilidade, olhar, fala/choro.",
     "Trabalho respiratório: ruídos (estridor, gemência, sibilo), tiragem, batimento de asa de nariz, posição.",
     "Circulação da pele: palidez, pele moteada, cianose.",
     "Um lado alterado já pede atenção; aparência alterada = criança grave."
    ]
   },
   {
    "t": "Sinais vitais acordado (faixas de referência PALS 2020)",
    "itens": [
     "Lactente (1–12 meses): FC 100–180; FR 30–53; PAS 72–104.",
     "1–2 anos: FC 98–140; FR 22–37; PAS 86–106.",
     "3–5 anos: FC 80–120; FR 20–28; PAS 89–112.",
     "6–11 anos: FC 75–118; FR 18–25; PAS 97–115.",
     "12–15 anos: FC 60–100; FR 12–20; PAS 110–131.",
     "Hipotensão de 1 a 10 anos: PAS < 70 + (2 × idade em anos)."
    ]
   },
   {
    "t": "Hidratação (manejo da diarreia, Ministério da Saúde)",
    "itens": [
     "Sem desidratação (plano A): alerta, olhos normais, bebe normalmente, prega desaparece rápido.",
     "Desidratação (plano B): dois ou mais de — irritada, olhos fundos, bebe com avidez, prega desaparece lentamente, TEC 3–5 s.",
     "Desidratação grave (plano C): dois ou mais de — letárgica ou inconsciente, olhos muito fundos, bebe mal ou não consegue, prega desaparece muito lentamente, pulso fraco, TEC > 5 s.",
     "Ver a condição Diarreia em Prescrições para os volumes de cada plano."
    ]
   },
   {
    "t": "Sinais de alarme",
    "alerta": true,
    "itens": [
     "Letargia, choro fraco ou inconsolável, não reconhece os pais, fontanela abaulada.",
     "Gemência, tiragem importante, apneia, SpO2 < 92%.",
     "Lactente < 3 meses com febre ≥ 38 °C: avaliação completa (risco de infecção bacteriana grave).",
     "Petéquias com febre, convulsão, sinais de desidratação grave."
    ]
   }
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
 },
 {
  "id": "faringo_inesp",
  "tipo": "condicao",
  "cond": "faringo_inesp",
  "nm": "Faringoamigdalite inespecífica (viral)",
  "sub": "dor de garganta · viral · Centor · sintomáticos · sem antibiótico",
  "kw": "faringoamigdalite inespecifica faringite viral amigdalite viral dor de garganta odinofagia garganta inflamada centor mcisaac feverpain teste rapido estreptococo mononucleose herpangina abscesso periamigdaliano dipirona paracetamol ibuprofeno flurbiprofeno pastilha dexametasona",
  "draft": true,
  "revisado": null,
  "resumo": "Dor de garganta aguda, na maioria das vezes viral: coriza, tosse, rouquidão, aftas ou conjuntivite falam a favor de vírus. A decisão no PS/UBS é separar quem tem baixa probabilidade de estreptococo (só sintomáticos) de quem precisa de teste ou antibiótico, e reconhecer as complicações supurativas.",
  "secoes": [
   {
    "t": "Quando pensar / diagnóstico",
    "itens": [
     "Dor de garganta com coriza, tosse, rouquidão, aftas ou conjuntivite: quadro viral provável, mesmo com exsudato.",
     "Aplicar Centor/McIsaac (ver Escores) antes de pedir teste: escore baixo dispensa teste e antibiótico (IDSA 2025).",
     "Menores de 3 anos: estreptococo é raro; não testar de rotina, salvo contato domiciliar com caso confirmado.",
     "Mononucleose: adolescente ou adulto jovem com exsudato exuberante, linfonodos cervicais posteriores, esplenomegalia e fadiga.",
     "Pensar também em síndrome gripal ou COVID-19 (febre súbita, mialgia), herpangina e gengivoestomatite herpética na criança."
    ]
   },
   {
    "t": "Exame físico: o que procurar",
    "itens": [
     "Orofaringe com boa luz: hiperemia, exsudato, vesículas ou úlceras, petéquias no palato, simetria das amígdalas e posição da úvula.",
     "Linfonodos cervicais anteriores e posteriores; baço palpável sugere mononucleose.",
     "Trismo, voz abafada e abaulamento periamigdaliano com desvio da úvula: abscesso.",
     "Hidratação, capacidade de engolir a saliva, estridor e sinais de toxemia."
    ]
   },
   {
    "t": "Exames complementares",
    "itens": [
     "Escore baixo (Centor/McIsaac 0–1): nenhum exame.",
     "Escore intermediário ou alto: teste rápido para estreptococo, se disponível (ver Faringoamigdalite estreptocócica).",
     "Suspeita de mononucleose: hemograma (linfócitos atípicos) e teste para EBV; evitar amoxicilina enquanto houver dúvida.",
     "Suspeita de abscesso ou infecção cervical profunda: TC cervical com contraste e otorrinolaringologia."
    ]
   },
   {
    "t": "Conduta",
    "itens": [
     "Sintomáticos: dipirona ou paracetamol; ibuprofeno é alternativa para dor intensa (evitar se dengue, desidratação, doença renal ou úlcera).",
     "Pastilhas com anestésico ou anti-inflamatório aliviam a dor por algumas horas, sem encurtar a doença.",
     "Antibiótico não está indicado com teste negativo ou baixa probabilidade de estreptococo.",
     "Dexametasona em dose única reduz a dor em quem não consegue engolir: reservar para odinofagia intensa (bloco de internação).",
     "Sem aceitação oral ou desidratado: hidratação venosa, analgesia EV e reavaliação da deglutição antes da alta."
    ]
   },
   {
    "t": "Sinais de alarme e quando internar/encaminhar",
    "itens": [
     "Baba, estridor, posição em tripé ou incapacidade de engolir a saliva: via aérea em risco (epiglotite, abscesso).",
     "Trismo, voz abafada, desvio da úvula ou edema cervical: abscesso periamigdaliano ou profundo — TC e otorrino.",
     "Desidratação, recusa total de líquidos ou toxemia: observação e hidratação venosa.",
     "Febre por mais de 3 dias, piora após melhora inicial ou dor unilateral intensa: reavaliar.",
     "Membrana acinzentada aderente em criança não vacinada: pensar em difteria e notificar."
    ],
    "alerta": true
   },
   {
    "t": "Orientações ao paciente",
    "itens": [
     "A dor de garganta costuma melhorar em até 7 dias; antibiótico não ajuda em infecção por vírus.",
     "Beba líquidos com frequência e prefira alimentos frios, pastosos ou mornos.",
     "Use o remédio para dor nos horários orientados enquanto houver dor.",
     "Em criança, não dar AAS (ácido acetilsalicílico).",
     "Volte se tiver dificuldade para engolir a saliva, abrir a boca ou respirar, voz abafada ou febre por mais de 3 dias."
    ]
   }
  ],
  "pendencias": [
   "O adulto ambulatorial não tem AINE no Padrão (o KW cita ibuprofeno e cetoprofeno) — decidir se acrescenta ibuprofeno.",
   "Material do Drive cita nimesulida, diclofenaco e meloxicam como AINE na amigdalite; preferi ibuprofeno no texto — decidir se algum entra em Outras opções.",
   "Centor do site (Ficha Vermelha) usa cortes ≤ 1 / 2–3 / ≥ 4; o guia HC-FMUSP 2024 usa 0–2 não tratar, 3 considerar, ≥ 4 tratar — o escore fica como está; decidir qual corte citar nas orientações.",
   "Bloco pediátrico de antibiótico usa corte de 27 kg para a penicilina benzatina (IDSA/AHA); o guia HC-FMUSP 2024 usa 30 kg — decidir.",
   "Orientação pediátrica diz volta à escola após 24 h de antibiótico; Faringoamigdalite estreptocócica diz 12 h — uniformizar.",
   "Spray de hexamidina com anestésico e pastilha anestésica dos PDFs não foram propostos (o Padrão já tem pastilhas)."
  ],
  "fontes": [
   "Barshak MB, Watson ME Jr, Wessels MR et al. Clinical Practice Guideline Update by the Infectious Diseases Society of America on Group A Streptococcal Pharyngitis (parte 1: avaliação de risco e testes). IDSA; 2025.",
   "Shulman ST et al. Clinical Practice Guideline for the Diagnosis and Management of Group A Streptococcal Pharyngitis: 2012 Update by the IDSA. Clin Infect Dis. 2012;55(10):e86-102.",
   "National Institute for Health and Care Excellence (NICE). Sore throat (acute): antimicrobial prescribing (NG84). 2018.",
   "Hospital das Clínicas da FMUSP (Levin AS, Costa SF, coord.). Antimicrobianos na prática clínica: um guia para profissionais da atenção primária. 1ª ed. São Paulo: HC-FMUSP; 2024."
  ]
 },
 {
  "id": "faringo_estrep",
  "tipo": "condicao",
  "cond": "faringo_estrep",
  "nm": "Faringoamigdalite estreptocócica",
  "sub": "estreptococo · Centor · amoxicilina · penicilina benzatina · febre reumática",
  "kw": "faringoamigdalite estreptococica amigdalite bacteriana faringite estreptococica estreptococo do grupo a dor de garganta pus na garganta placa na garganta centor mcisaac teste rapido febre reumatica escarlatina abscesso periamigdaliano amoxicilina penicilina benzatina benzetacil cefalexina cefadroxila cefuroxima azitromicina clindamicina ampicilina ibuprofeno dipirona",
  "draft": true,
  "revisado": null,
  "resumo": "Infecção da orofaringe pelo estreptococo do grupo A, mais comum entre 5 e 15 anos. Tratar com teste rápido positivo ou alta probabilidade clínica quando não houver teste; o antibiótico previne febre reumática e complicações supurativas, por isso o tratamento vai até o fim.",
  "secoes": [
   {
    "t": "Quando pensar / diagnóstico",
    "itens": [
     "Febre e dor de garganta de início súbito, exsudato amigdaliano, linfonodos cervicais anteriores dolorosos e ausência de tosse.",
     "Petéquias no palato, úvula edemaciada e exantema áspero (escarlatina) reforçam a suspeita.",
     "Coriza, tosse, rouquidão, aftas e conjuntivite falam contra: tratar como viral (ver Faringoamigdalite inespecífica).",
     "Centor/McIsaac (ver Escores) decide quem testar; não testar de rotina menores de 3 anos (IDSA 2025).",
     "Testar independentemente do escore se contato domiciliar com caso confirmado ou febre reumática prévia."
    ]
   },
   {
    "t": "Exame físico: o que procurar",
    "itens": [
     "Amígdalas aumentadas com exsudato, hiperemia intensa e petéquias no palato.",
     "Linfonodos cervicais anteriores aumentados e dolorosos.",
     "Simetria das amígdalas, posição da úvula, trismo e voz abafada (abscesso).",
     "Pele: exantema em lixa, palidez perioral e língua em framboesa na escarlatina."
    ]
   },
   {
    "t": "Exames complementares",
    "itens": [
     "Teste rápido de antígeno estreptocócico na orofaringe: positivo autoriza tratar.",
     "Criança ou adolescente com teste rápido negativo: cultura de orofaringe quando disponível; no adulto não é necessária.",
     "Sem teste no serviço: decidir pela clínica (McIsaac alto) e registrar a justificativa no prontuário.",
     "ASLO na fase aguda não diagnostica faringite: não pedir."
    ]
   },
   {
    "t": "Conduta",
    "itens": [
     "1ª escolha: amoxicilina por 10 dias ou penicilina benzatina IM em dose única (garante a adesão; observar 30 min após aplicar).",
     "Benzatina na criança: 600.000 UI se < 27 kg; 1.200.000 UI a partir de 27 kg.",
     "Alergia não grave à penicilina: cefalexina por 10 dias. Anafilaxia: azitromicina por 5 dias ou clindamicina.",
     "Amoxicilina-clavulanato não é necessária na faringite não complicada.",
     "Dor: dipirona ou paracetamol; ibuprofeno se não houver contraindicação.",
     "Sem via oral, desidratado ou toxêmico: benzatina IM ou ampicilina EV, hidratação e analgesia EV (bloco de internação).",
     "Febre sem melhora em 72 h: reavaliar adesão, abscesso ou outro diagnóstico (mononucleose)."
    ]
   },
   {
    "t": "Sinais de alarme e quando internar/encaminhar",
    "itens": [
     "Trismo, voz abafada, abaulamento periamigdaliano com desvio da úvula: abscesso — drenagem pela otorrino.",
     "Edema ou rigidez cervical, torcicolo doloroso e febre alta: infecção cervical profunda — TC com contraste.",
     "Estridor, baba ou incapacidade de engolir a saliva: via aérea em risco.",
     "1 a 5 semanas depois: artrite migratória, cardite ou coreia (febre reumática); urina escura com edema e hipertensão (glomerulonefrite)."
    ],
    "alerta": true
   },
   {
    "t": "Orientações ao paciente",
    "itens": [
     "Tome o antibiótico até o último dia, mesmo melhorando: isso previne a febre reumática.",
     "Pode voltar à escola ou ao trabalho após pelo menos 12 horas de antibiótico e sem febre.",
     "Não divida copos e talheres e lave as mãos com frequência enquanto estiver doente.",
     "Prefira alimentos pastosos e frios e beba bastante líquido.",
     "Volte se a febre continuar após 72 horas de antibiótico, ou na hora se não conseguir engolir a saliva, abrir a boca ou respirar bem."
    ]
   },
   {
    "t": "Outras opções (material do médico)",
    "itens": [
     "Ibuprofeno 600 mg de 8/8h por 5 dias — esquema da orientação de amigdalite do próprio médico; evitar se dengue, doença renal, úlcera ou gestação.",
     "Cefuroxima 250 mg de 12/12h por 10 dias — alergia não grave à penicilina (guia HC-FMUSP 2024); não usar se anafilaxia.",
     "Cefadroxila 30 mg/kg 1x/dia por 10 dias na criança — alergia não anafilática (IDSA 2012); a dose única diária ajuda a adesão."
    ],
    "offlabel": true
   }
  ],
  "pendencias": [
   "Corte de peso da benzatina: DATA e IDSA/AHA usam 27 kg; o guia HC-FMUSP 2024 usa 30 kg — decidir.",
   "Afastamento escolar: aqui o DATA diz 12 h de antibiótico; no bloco de antibiótico de Faringoamigdalite inespecífica diz 24 h — uniformizar.",
   "Penicilina V oral (1ª linha na IDSA 2012 e no guia HC-FMUSP 2024) não está no DATA; a apresentação nacional é em UI e a disponibilidade é irregular — decidir se entra.",
   "Outras opções antigas ('Opção 1' e 'Opção 2') associam omeprazol ao antibiótico sem indicação — considerar retirar.",
   "PDFs do Drive usam amoxicilina por 7 dias e azitromicina por 3 dias; diretrizes mantêm 10 dias e azitromicina por 5 dias — não aproveitados.",
   "A IDSA publicou em 2025 só a parte 1 (avaliação de risco e testes); a parte de tratamento ainda segue a diretriz de 2012 — revisar quando sair."
  ],
  "fontes": [
   "Shulman ST et al. Clinical Practice Guideline for the Diagnosis and Management of Group A Streptococcal Pharyngitis: 2012 Update by the IDSA. Clin Infect Dis. 2012;55(10):e86-102.",
   "Barshak MB, Watson ME Jr, Wessels MR et al. Clinical Practice Guideline Update by the Infectious Diseases Society of America on Group A Streptococcal Pharyngitis (parte 1: avaliação de risco e testes). IDSA; 2025.",
   "Gerber MA et al. Prevention of rheumatic fever and diagnosis and treatment of acute Streptococcal pharyngitis (AHA). Circulation. 2009;119(11):1541-51.",
   "Hospital das Clínicas da FMUSP (Levin AS, Costa SF, coord.). Antimicrobianos na prática clínica: um guia para profissionais da atenção primária. 1ª ed. São Paulo: HC-FMUSP; 2024."
  ]
 },
 {
  "id": "nasofaringite",
  "tipo": "condicao",
  "cond": "nasofaringite",
  "nm": "Nasofaringite / Resfriado",
  "sub": "IVAS · coriza · lavagem nasal · sintomáticos · criança",
  "kw": "nasofaringite rinofaringite resfriado ivas infeccao de vias aereas superiores virose coriza nariz entupido obstrucao nasal espirro tosse febre crianca lactente bebe soro fisiologico lavagem nasal mel dipirona paracetamol ibuprofeno sindrome gripal",
  "draft": true,
  "revisado": null,
  "resumo": "Infecção viral das vias aéreas superiores, autolimitada (7 a 10 dias; a tosse pode durar 3 semanas), muito frequente na criança. O trabalho no PS/UBS é aliviar sintomas sem antibiótico, reconhecer síndrome gripal em quem tem fator de risco e identificar complicações: otite, sinusite, pneumonia e, no lactente, desconforto respiratório.",
  "secoes": [
   {
    "t": "Quando pensar / diagnóstico",
    "itens": [
     "Coriza, obstrução nasal, espirros, dor de garganta leve e tosse, com febre baixa nos primeiros 2 a 3 dias.",
     "Secreção nasal amarelada ou esverdeada é comum no curso viral e não indica antibiótico.",
     "Febre súbita com tosse ou dor de garganta e cefaleia, mialgia ou artralgia: síndrome gripal (ver H1N1).",
     "Criança pequena tem 6 a 8 resfriados por ano, mais quando frequenta creche.",
     "Diferenciar de rinite alérgica (prurido, espirros em salva, sem febre) e de corpo estranho nasal (secreção fétida unilateral)."
    ]
   },
   {
    "t": "Exame físico: o que procurar",
    "itens": [
     "Estado geral, hidratação e FR contada por 1 minuto na criança.",
     "Taquipneia (OMS): ≥ 60 irpm abaixo de 2 meses; ≥ 50 de 2 a 11 meses; ≥ 40 de 1 a 4 anos — pensar em pneumonia.",
     "Tiragem, gemência, batimento de asa de nariz e SpO2 (≤ 94% é sinal de gravidade).",
     "Otoscopia (otite média é a complicação mais comum na criança) e orofaringe.",
     "Ausculta pulmonar: sibilos ou estertores mudam o diagnóstico."
    ]
   },
   {
    "t": "Exames complementares",
    "itens": [
     "Não precisa de exame no quadro típico.",
     "Síndrome gripal com fator de risco ou sinais de gravidade: teste para influenza e COVID-19 quando disponível, sem atrasar o antiviral.",
     "RX de tórax só se taquipneia, hipoxemia ou ausculta alterada."
    ]
   },
   {
    "t": "Conduta",
    "itens": [
     "Lavagem nasal com soro fisiológico várias vezes ao dia, principalmente antes das mamadas e de dormir.",
     "Antitérmico pelo peso se febre com desconforto: dipirona (a partir de 3 meses e 5 kg), paracetamol ou ibuprofeno (a partir de 6 meses).",
     "Mel para a tosse só acima de 1 ano.",
     "Não usar descongestionante, anti-histamínico, antitussígeno ou mucolítico em menores de 6 anos; nunca AAS.",
     "Antibiótico não está indicado; reavaliar se surgir otite, sinusite ou pneumonia.",
     "Síndrome gripal em criança menor de 5 anos ou com comorbidade: oseltamivir sem esperar o teste (MS 2023)."
    ]
   },
   {
    "t": "Sinais de alarme e quando internar/encaminhar",
    "itens": [
     "Respiração rápida ou com esforço, gemência, apneia, cianose ou SpO2 ≤ 94%.",
     "Lactente menor de 3 meses com febre: avaliação completa no mesmo dia.",
     "Recusa de líquidos ou mamadas, pouca urina, sonolência ou irritabilidade intensa.",
     "Febre por mais de 3 dias, febre que volta após 48 h sem febre ou piora após melhora inicial.",
     "Dor de ouvido, dor facial ou secreção purulenta por mais de 10 dias: otite ou sinusite."
    ],
    "alerta": true
   },
   {
    "t": "Orientações ao paciente",
    "itens": [
     "É uma virose: melhora sozinha em 7 a 10 dias; a tosse pode durar até 3 semanas.",
     "Lave o nariz com soro fisiológico antes das mamadas, das refeições e de dormir.",
     "Ofereça líquidos com frequência e mantenha o aleitamento materno.",
     "Maiores de 1 ano: 1 colher de chá de mel antes de dormir alivia a tosse; nunca dar mel a menores de 1 ano.",
     "Lave as mãos e cubra boca e nariz ao tossir.",
     "Volte se a criança respirar rápido ou com esforço, ficar roxa, sonolenta, recusar líquidos ou tiver febre por mais de 3 dias."
    ]
   }
  ],
  "pendencias": [
   "Nasofaringite e Resfriado comum são a mesma doença no DATA, com blocos quase iguais — considerar unificar ou ligar as duas.",
   "Ambroxol xarope em Outras opções ('Opção 2'): mucolítico sem benefício comprovado; o material do Drive cita contraindicação de mucolíticos abaixo de 2 anos pela Anvisa — confirmar e decidir se mantém.",
   "Card 'Gripe' do senhor tem loratadina, ibuprofeno 600 mg e prednisona 40 mg: anti-histamínico isolado quase não ajuda no resfriado (Cochrane 2015) e corticoide não tem respaldo — prednisona e loratadina não propostas (ibuprofeno proposto em Resfriado comum).",
   "PDFs do Drive citam xaropes antitussígenos combinados e descongestionantes em criança — contraindicados abaixo de 6 anos; não aproveitados."
  ],
  "fontes": [
   "Brasil. Ministério da Saúde. Secretaria de Vigilância em Saúde e Ambiente. Guia de manejo e tratamento de influenza 2023. Brasília; 2023.",
   "National Institute for Health and Care Excellence (NICE). Cough (acute): antimicrobial prescribing (NG120). 2019.",
   "Oduwole O et al. Honey for acute cough in children. Cochrane Database Syst Rev. 2018;4:CD007094.",
   "Kenealy T, Arroll B. Antibiotics for the common cold and acute purulent rhinitis. Cochrane Database Syst Rev. 2013;(6):CD000247."
  ]
 },
 {
  "id": "resfriado",
  "tipo": "condicao",
  "cond": "resfriado",
  "nm": "Resfriado comum",
  "sub": "virose · coriza · soro nasal · sintomáticos · sem antibiótico",
  "kw": "resfriado comum gripe leve virose coriza nariz escorrendo nariz entupido espirro dor de garganta tosse mal estar soro fisiologico spray nasal lavagem nasal dipirona paracetamol ibuprofeno oximetazolina descongestionante mel",
  "draft": true,
  "revisado": null,
  "resumo": "Infecção viral leve das vias aéreas superiores que melhora sozinha em 7 a 10 dias. A conduta é sintomática: antibiótico, anti-histamínico isolado e corticoide não mudam a evolução. O que importa no atendimento é separar síndrome gripal com fator de risco (antiviral) e reconhecer sinusite ou pneumonia.",
  "secoes": [
   {
    "t": "Quando pensar / diagnóstico",
    "itens": [
     "Início gradual com dor de garganta leve, coriza, obstrução nasal e espirros; febre ausente ou baixa.",
     "Gripe: febre alta súbita, mialgia, cefaleia e prostração — com fator de risco, oseltamivir (ver H1N1).",
     "COVID-19 não se distingue pela clínica: testar quando o resultado mudar a conduta (grupo de risco, isolamento).",
     "Sinusite bacteriana só após 10 dias sem melhora, piora depois de melhorar ou febre alta com secreção purulenta por 3 dias.",
     "Rinite alérgica: prurido, espirros em salva, sem febre, sintomas recorrentes ou sazonais."
    ]
   },
   {
    "t": "Exame físico: o que procurar",
    "itens": [
     "Sinais vitais com SpO2 e FR: febre alta ou taquipneia afastam o diagnóstico simples.",
     "Orofaringe, otoscopia e palpação dos seios da face.",
     "Ausculta pulmonar: estertores localizados ou sibilos pedem outra hipótese."
    ]
   },
   {
    "t": "Exames complementares",
    "itens": [
     "Não precisa de exame.",
     "Teste para influenza ou COVID-19 só em grupo de risco, gestante ou quando o resultado mudar a conduta."
    ]
   },
   {
    "t": "Conduta",
    "itens": [
     "Soro fisiológico nasal (spray ou lavagem com seringa) e hidratação.",
     "Dipirona ou paracetamol para dor e febre; ibuprofeno alivia dor e mal-estar, sem efeito na coriza.",
     "Descongestionante nasal tópico por no máximo 3 dias no adulto (rebote se prolongado); evitar em hipertenso não controlado.",
     "Antibiótico, anti-histamínico isolado, corticoide nasal ou oral e mucolítico não mudam a evolução.",
     "Mel e bebidas mornas aliviam a tosse.",
     "Síndrome gripal com fator de risco (≥ 60 anos, gestante, doença crônica, imunossupressão): oseltamivir e retorno precoce."
    ]
   },
   {
    "t": "Sinais de alarme e quando internar/encaminhar",
    "itens": [
     "Falta de ar, dor no peito, SpO2 ≤ 94% ou FR ≥ 20 irpm: sinais de agravamento (MS 2023).",
     "Febre por mais de 3 dias ou que volta após 48 h sem febre: pensar em pneumonia ou sinusite.",
     "Confusão, sonolência, hipotensão ou desidratação.",
     "Piora da doença de base (asma, DPOC, insuficiência cardíaca)."
    ],
    "alerta": true
   },
   {
    "t": "Orientações ao paciente",
    "itens": [
     "Resfriado é virose: melhora sozinho em 7 a 10 dias e a tosse pode durar até 3 semanas.",
     "Use o soro fisiológico no nariz várias vezes ao dia e beba bastante líquido.",
     "Antibiótico não ajuda no resfriado e pode causar efeitos colaterais.",
     "Não use descongestionante nasal por mais de 3 dias seguidos.",
     "Lave as mãos, cubra boca e nariz ao tossir e use máscara perto de idosos, gestantes e imunossuprimidos.",
     "Volte se tiver falta de ar, dor no peito, febre por mais de 3 dias ou piora depois de melhorar."
    ]
   },
   {
    "t": "Outras opções (material do médico)",
    "itens": [
     "Ibuprofeno 600 mg de 8/8h por até 3 dias — card 'Gripe' do próprio médico; para dor e mal-estar; evitar se dengue, doença renal, úlcera ou gestação.",
     "Oximetazolina nasal de 12/12h por no máximo 3 dias — citada nos PDFs; alivia a obstrução no adulto; risco de rinite medicamentosa se prolongada."
    ],
    "offlabel": true
   }
  ],
  "pendencias": [
   "Outras opções 'Opção 1' a 'Opção 3' usam nomes comerciais de spray de soro — trocar pelo nome genérico.",
   "PDFs do Drive: antigripais combinados, nafazolina, budesonida nasal e 'cromoglicato' (na verdade soro fisiológico) — não propostos: sem benefício no resfriado ou risco em hipertenso e cardiopata.",
   "Card 'Tosse pós-IVAS' do senhor: loratadina de 12/12h (a bula é 1x/dia) e budesonida nasal — anti-histamínico isolado e corticoide nasal não ajudam no resfriado agudo; decidir se o card continua assim.",
   "Nasofaringite e Resfriado comum duplicam a mesma doença — considerar unificar."
  ],
  "fontes": [
   "National Institute for Health and Care Excellence (NICE). Cough (acute): antimicrobial prescribing (NG120). 2019.",
   "Kenealy T, Arroll B. Antibiotics for the common cold and acute purulent rhinitis. Cochrane Database Syst Rev. 2013;(6):CD000247.",
   "De Sutter AI et al. Antihistamines for the common cold. Cochrane Database Syst Rev. 2015;(11):CD009345.",
   "Deckx L et al. Nasal decongestants in monotherapy for the common cold. Cochrane Database Syst Rev. 2016;10:CD009612.",
   "Brasil. Ministério da Saúde. Secretaria de Vigilância em Saúde e Ambiente. Guia de manejo e tratamento de influenza 2023. Brasília; 2023."
  ]
 },
 {
  "id": "h1n1",
  "tipo": "condicao",
  "cond": "h1n1",
  "nm": "Influenza (H1N1): profilaxia e tratamento",
  "sub": "gripe · oseltamivir · grupo de risco · SRAG · quimioprofilaxia",
  "kw": "h1n1 influenza gripe gripe a sindrome gripal srag sindrome respiratoria aguda grave oseltamivir tamiflu antiviral quimioprofilaxia profilaxia contato grupo de risco gestante puerpera idoso crianca vacina da gripe febre tosse mialgia",
  "draft": true,
  "revisado": null,
  "resumo": "A influenza (inclusive A/H1N1) causa síndrome gripal e pode evoluir para SRAG. Pelo protocolo do Ministério da Saúde, oseltamivir vai para toda SRAG e para toda síndrome gripal com fator de risco, independentemente da vacina; a quimioprofilaxia é exceção (imunossupressão grave após contato ou surto em instituição de longa permanência), em até 48 h do contato.",
  "secoes": [
   {
    "t": "Quando pensar / diagnóstico",
    "itens": [
     "Síndrome gripal: febre súbita (mesmo referida) com tosse ou dor de garganta e ao menos cefaleia, mialgia ou artralgia.",
     "Menor de 2 anos: febre súbita com tosse, coriza ou obstrução nasal já é síndrome gripal.",
     "SRAG: síndrome gripal com dispneia, SpO2 ≤ 94% em ar ambiente, desconforto respiratório, hipotensão ou piora da doença de base.",
     "Fatores de risco: gestante e puérpera até 2 semanas, ≥ 60 anos, < 5 anos, indígena aldeado, obesidade com IMC ≥ 40.",
     "Também: doença pulmonar (inclusive asma), cardíaca, renal, hepática, hematológica, diabetes, neurológica, imunossupressão, tuberculose e < 19 anos em uso de AAS.",
     "Influenza e COVID-19 não se distinguem pela clínica."
    ]
   },
   {
    "t": "Exame físico: o que procurar",
    "itens": [
     "SpO2 em ar ambiente, FR, PA, temperatura e nível de consciência.",
     "Criança: batimento de asa de nariz, tiragem, gemência, cianose, desidratação e inapetência.",
     "Estertores localizados ou piora após melhora inicial sugerem pneumonia bacteriana secundária."
    ]
   },
   {
    "t": "Exames complementares",
    "itens": [
     "Síndrome gripal sem gravidade: exame não é necessário para tratar.",
     "SRAG: coletar RT-PCR (de preferência antes do antiviral, sem atrasá-lo) e notificar.",
     "Internado: RX de tórax, hemograma, função renal, eletrólitos e gasometria se hipoxemia."
    ]
   },
   {
    "t": "Conduta",
    "itens": [
     "Síndrome gripal com fator de risco: oseltamivir 75 mg de 12/12h por 5 dias, mesmo vacinado e mesmo no ambulatório.",
     "Sem fator de risco: oseltamivir por julgamento clínico, de preferência nas primeiras 48 h.",
     "SRAG: internar e iniciar oseltamivir na hora, mesmo após 48 h de sintomas.",
     "Quimioprofilaxia (75 mg 1x/dia por 10 dias) só até 48 h do último contato: imunossupressão grave, ou surto em instituição de longa permanência com comorbidade.",
     "Ajustar a dose pela função renal (tratamento com ClCr 30–60: 30 mg de 12/12h) e, na criança, pelo peso.",
     "Corticoide não é recomendado para influenza, salvo outra indicação (choque séptico, asma, DPOC).",
     "Pneumonia secundária (piora após melhora, novo infiltrado): ceftriaxona + macrolídeo; se necrotizante, pensar em S. aureus."
    ]
   },
   {
    "t": "Sinais de alarme e quando internar/encaminhar",
    "itens": [
     "Dispneia, FR ≥ 20 irpm no adulto, SpO2 ≤ 94% ou cianose.",
     "Febre por mais de 3 dias ou que volta após 48 h sem febre.",
     "Confusão, sonolência, hipotensão (PAS < 90), diurese < 400 mL em 24 h ou desidratação.",
     "Piora de doença de base ou miosite (CPK alta).",
     "UTI: hipoxemia apesar de O2, choque sem resposta a 30 mL/kg ou outras disfunções orgânicas."
    ],
    "alerta": true
   },
   {
    "t": "Orientações ao paciente",
    "itens": [
     "Tome o antiviral de 12 em 12 horas, depois de uma refeição, por 5 dias completos.",
     "Fique afastado do trabalho ou da escola até 24 horas sem febre.",
     "Lave as mãos, use máscara e cubra boca e nariz ao tossir.",
     "Volte se tiver falta de ar, lábios roxos, febre por mais de 3 dias, confusão ou piora depois de melhorar.",
     "Vacine-se todo ano contra a gripe."
    ]
   }
  ],
  "pendencias": [
   "DATA indica quimioprofilaxia para grupo de risco não vacinado (ou vacinado há menos de 2 semanas) e profissional de saúde sem EPI; o Guia MS 2023 restringiu a imunossupressão grave após contato e a surto em instituição de longa permanência — atualizar.",
   "Tratamento ambulatorial da síndrome gripal com fator de risco (75 mg de 12/12h por 5 dias) está só em Outras opções ('Receita'); pelo MS 2023 é conduta-padrão — considerar um Padrão próprio ou uma condição nova 'Síndrome gripal'.",
   "Bloco 'Receita' diz '10 COMPRIMIDOS': oseltamivir é cápsula — corrigir.",
   "Material do Drive cita zanamivir; o Guia MS 2023 deixou de recomendá-lo — não proposto.",
   "Guia HC-FMUSP 2024 traz nirmatrelvir/ritonavir para COVID-19 em grupo de risco — fora desta condição; decidir se cria 'Síndrome gripal / COVID-19'.",
   "O nome da condição ('H1N1 — profilaxia') não cobre o tratamento de SRAG que ela já contém — considerar renomear sem mudar o id."
  ],
  "fontes": [
   "Brasil. Ministério da Saúde. Secretaria de Vigilância em Saúde e Ambiente. Guia de manejo e tratamento de influenza 2023. Brasília; 2023.",
   "Uyeki TM et al. Clinical Practice Guidelines by the IDSA: 2018 Update on Diagnosis, Treatment, Chemoprophylaxis, and Institutional Outbreak Management of Seasonal Influenza. Clin Infect Dis. 2019;68(6):e1-e47.",
   "Hospital das Clínicas da FMUSP (Levin AS, Costa SF, coord.). Antimicrobianos na prática clínica: um guia para profissionais da atenção primária. 1ª ed. São Paulo: HC-FMUSP; 2024."
  ]
 },
 {
  "id": "rinite",
  "tipo": "condicao",
  "cond": "rinite",
  "nm": "Rinite alérgica",
  "sub": "espirros · prurido nasal · corticoide nasal · anti-histamínico · controle ambiental",
  "kw": "rinite alergica alergia nasal espirro espirros em salva coceira no nariz prurido nasal coriza nariz entupido obstrucao nasal fluticasona mometasona budesonida corticoide nasal spray nasal loratadina desloratadina cetirizina fexofenadina dexclorfeniramina antialergico soro fisiologico lavagem nasal acaro poeira",
  "draft": true,
  "revisado": null,
  "resumo": "Inflamação nasal mediada por IgE, com espirros, prurido, coriza e obstrução, muitas vezes junto com asma e conjuntivite. O tratamento de base é o corticoide nasal diário com lavagem nasal; o anti-histamínico oral de 2ª geração complementa. Corticoide sistêmico e descongestionante não são rotina.",
  "secoes": [
   {
    "t": "Quando pensar / diagnóstico",
    "itens": [
     "Espirros em salva, prurido nasal e ocular, coriza clara e obstrução, recorrentes ou sazonais, sem febre.",
     "Gatilhos: ácaros, mofo, pelos de animais, pólen; história pessoal ou familiar de asma, eczema ou conjuntivite.",
     "Classificar: intermitente ou persistente (mais de 4 dias por semana por mais de 4 semanas); leve ou moderada-grave (atrapalha sono, trabalho ou escola).",
     "Sintoma unilateral, sangramento, secreção purulenta ou fétida, dor facial ou perda do olfato: pensar em outro diagnóstico.",
     "Perguntar sempre por sintomas de asma (tosse noturna, chiado)."
    ]
   },
   {
    "t": "Exame físico: o que procurar",
    "itens": [
     "Mucosa nasal pálida e edemaciada, cornetos aumentados, secreção clara.",
     "Olheiras, prega nasal transversa (saudação alérgica) e respiração oral na criança.",
     "Desvio de septo, pólipos e sinais de sinusite.",
     "Ausculta pulmonar (asma associada)."
    ]
   },
   {
    "t": "Exames complementares",
    "itens": [
     "Diagnóstico clínico: no PS não precisa de exame.",
     "Testes alérgicos (cutâneo ou IgE específica) no seguimento, se dúvida ou candidato a imunoterapia."
    ]
   },
   {
    "t": "Conduta",
    "itens": [
     "Corticoide nasal diário (fluticasona, mometasona, budesonida) é o tratamento mais eficaz; efeito pleno em 1 a 2 semanas.",
     "Lavagem nasal com soro fisiológico antes do corticoide.",
     "Anti-histamínico oral de 2ª geração (loratadina, desloratadina, cetirizina, fexofenadina) para prurido, espirros e sintomas oculares.",
     "Sem controle com o corticoide nasal: associar anti-histamínico nasal ou usar a combinação nasal (ARIA-EAACI 2024–2025).",
     "Descongestionante oral só por poucos dias em adulto sem hipertensão; tópico no máximo 3 a 5 dias.",
     "Evitar corticoide injetável ou oral de rotina e anti-histamínico de 1ª geração (sedação).",
     "Controle ambiental; encaminhar ao especialista se não controlar ou se candidato a imunoterapia."
    ]
   },
   {
    "t": "Sinais de alarme e quando internar/encaminhar",
    "itens": [
     "Chiado, falta de ar ou tosse noturna: avaliar asma.",
     "Febre com dor facial e secreção purulenta por mais de 10 dias: rinossinusite bacteriana.",
     "Obstrução unilateral persistente, sangramento nasal repetido ou massa nasal: otorrinolaringologia.",
     "Criança com ronco e pausas respiratórias: hipertrofia de adenoide — encaminhar."
    ],
    "alerta": true
   },
   {
    "t": "Orientações ao paciente",
    "itens": [
     "Use o corticoide nasal todos os dias, mesmo sem sintomas; o efeito completo aparece em 1 a 2 semanas.",
     "Aplique o jato em direção à orelha do mesmo lado, longe do septo, depois de lavar o nariz com soro.",
     "Lave a roupa de cama toda semana; evite tapetes, cortinas, bichos de pelúcia, fumaça e perfumes.",
     "Não use descongestionante nasal por conta própria: causa rebote e dependência.",
     "Volte se tiver chiado no peito, falta de ar ou febre com dor na face."
    ]
   },
   {
    "t": "Outras opções (material do médico)",
    "itens": [
     "Budesonida nasal 50 mcg, 2 jatos em cada narina 1x/dia — outro corticoide nasal, citado nos PDFs (lá por só 5 dias, curto demais: o uso é contínuo)."
    ],
    "offlabel": true
   }
  ],
  "pendencias": [
   "ARIA-EAACI 2024–2025 sugere a combinação nasal anti-histamínico + corticoide (ex.: azelastina + fluticasona) acima do corticoide nasal isolado; não há no DATA nem no Drive — decidir se acrescenta.",
   "PDFs do Drive: dexametasona IM, betametasona + dexclorfeniramina e prednisolona oral — corticoide sistêmico não é rotina na rinite; não propostos.",
   "Fenilefrina + bromofeniramina (PDFs): fenilefrina oral tem eficácia questionada como descongestionante; não proposta.",
   "Loratadina + pseudoefedrina (PDFs) não proposta: o DATA já tem fexofenadina + pseudoefedrina em Outras opções.",
   "Outras opções 'Opção 1' usa dexclorfeniramina de 8/8h por 7 dias (1ª geração, sedativa) e spray de soro com nome comercial — considerar sinalizar ou trocar."
  ],
  "fontes": [
   "Sakano E et al. IV Brazilian Consensus on Rhinitis — an update on allergic rhinitis (ASBAI, ABORL-CCF, SBP). Braz J Otorhinolaryngol. 2018;84(1):3-14.",
   "Sousa-Pinto B et al. Allergic Rhinitis and its Impact on Asthma (ARIA)-EAACI Guidelines — 2024–2025 Revision, Part I: intranasal treatments. Allergy. 2025.",
   "Dykewicz MS et al. Rhinitis 2020: A practice parameter update. J Allergy Clin Immunol. 2020;146(4):721-767."
  ]
 },
 {
  "id": "rinossinusite",
  "tipo": "condicao",
  "cond": "rinossinusite",
  "nm": "Rinossinusite aguda",
  "sub": "sinusite · 10 dias · piora bifásica · amoxicilina · complicação orbitária",
  "kw": "rinossinusite sinusite sinusite aguda sinusite bacteriana dor na face dor nos seios da face pressao na face secrecao purulenta catarro amarelo nariz entupido cefaleia frontal febre lavagem nasal soro fisiologico corticoide nasal fluticasona amoxicilina clavulanato doxiciclina cefuroxima ceftriaxona metronidazol celulite orbitaria periorbitaria",
  "draft": true,
  "revisado": null,
  "resumo": "Quase sempre viral ou pós-viral. A bacteriana é suspeitada pela duração (mais de 10 dias sem melhora), pela piora bifásica ou por quadro grave (febre alta com secreção purulenta por 3 dias). Mesmo na bacteriana não complicada do adulto, observar sem antibiótico é aceitável com retorno garantido; complicação orbitária ou intracraniana é emergência.",
  "secoes": [
   {
    "t": "Quando pensar / diagnóstico",
    "itens": [
     "Obstrução nasal e secreção purulenta (anterior ou posterior) com dor ou pressão facial, perda do olfato ou tosse.",
     "Viral: melhora em até 10 dias. Pós-viral: piora depois do 5º dia ou persiste além de 10 dias com melhora lenta.",
     "Bacteriana provável: mais de 10 dias sem melhora, piora após melhora inicial ou febre ≥ 39 °C com secreção purulenta por 3 dias seguidos.",
     "Criança: secreção nasal ou tosse diurna por mais de 10 dias, piora bifásica ou início grave (AAP 2013).",
     "Dor facial isolada, sem sintomas nasais, raramente é sinusite: pensar em cefaleia ou dor dentária."
    ]
   },
   {
    "t": "Exame físico: o que procurar",
    "itens": [
     "Secreção purulenta na cavidade nasal ou na parede posterior da orofaringe; edema de cornetos.",
     "Dor à palpação dos seios maxilares e frontais (pouco específica).",
     "Olhos: edema ou eritema palpebral, proptose, dor à movimentação ocular, diplopia e acuidade visual.",
     "Sinais meníngeos, nível de consciência e edema frontal (tumor de Pott).",
     "Dentes superiores (sinusite odontogênica) e otoscopia."
    ]
   },
   {
    "t": "Exames complementares",
    "itens": [
     "Diagnóstico clínico: RX de seios da face não ajuda e não deve ser pedido.",
     "TC de seios da face e órbitas com contraste (± crânio) só se suspeita de complicação, falha de tratamento ou quadro atípico."
    ]
   },
   {
    "t": "Conduta",
    "itens": [
     "Para todos: lavagem nasal com soro fisiológico e analgésico; corticoide nasal alivia sintomas, sobretudo no quadro pós-viral.",
     "Adulto com bacteriana não complicada: observar sem antibiótico é opção se o retorno for garantido (AAO-HNS 2025).",
     "Se antibiótico: amoxicilina (com ou sem clavulanato) por 5 a 7 dias no adulto; na criança, 10 dias.",
     "Amoxicilina-clavulanato se antibiótico recente, quadro moderado ou grave, menor de 2 anos, creche ou falha em 72 h.",
     "Alergia à penicilina: doxiciclina no adulto; cefuroxima se a alergia não for grave.",
     "Evitar macrolídeo e sulfametoxazol-trimetoprima: alta resistência do pneumococo no Brasil.",
     "Sem melhora em 72 h de antibiótico: reavaliar e trocar."
    ]
   },
   {
    "t": "Sinais de alarme e quando internar/encaminhar",
    "itens": [
     "Edema ou vermelhidão ao redor do olho, proptose, dor ao mover o olho, diplopia ou baixa visual: complicação orbitária.",
     "Cefaleia intensa, rigidez de nuca, vômitos, confusão, convulsão ou déficit focal: complicação intracraniana.",
     "Edema frontal (tumor de Pott), toxemia ou imunossupressão.",
     "Nesses casos: internar, TC com contraste, hemoculturas, ceftriaxona + metronidazol EV (± vancomicina) e otorrino e oftalmo urgentes."
    ],
    "alerta": true
   },
   {
    "t": "Orientações ao paciente",
    "itens": [
     "A maioria das sinusites é causada por vírus e melhora em 7 a 10 dias sem antibiótico.",
     "Lave o nariz com soro fisiológico 3 a 4 vezes ao dia; é normal engolir um pouco ou sair pelo outro lado.",
     "Use o spray nasal todos os dias pelo tempo orientado.",
     "Volte se piorar depois do 5º dia, se passar de 10 dias ou se não melhorar com 3 dias de antibiótico.",
     "Procure atendimento na hora se houver inchaço ao redor dos olhos, visão dupla, dor de cabeça forte ou rigidez na nuca."
    ]
   },
   {
    "t": "Outras opções (material do médico)",
    "itens": [
     "Cefuroxima 500 mg de 12/12h por 7 dias no adulto — alergia não grave à penicilina (guia HC-FMUSP 2024); não usar se anafilaxia."
    ],
    "offlabel": true
   }
  ],
  "pendencias": [
   "AAO-HNS 2025 recomenda oferecer observação sem antibiótico na bacteriana não complicada do adulto com retorno garantido; o Padrão do DATA vai direto ao antibiótico — decidir se acrescenta essa orientação.",
   "Outras opções antigas: 'RSBA' com amoxicilina por 14 dias e 'Opção 2' com azitromicina por 10 dias + omeprazol — contra as diretrizes atuais (5–7 dias; macrolídeo não recomendado); considerar retirar.",
   "'Opção 1' traz codeína 30 mg e levodropropizina para tosse: codeína não é recomendada para tosse e é contraindicada abaixo de 12 anos — revisar.",
   "Duração na criança: o guia HC-FMUSP 2024 usa 5–7 dias; DATA e AAP 2013 usam 10 dias — decidir.",
   "PDFs do Drive (Tigers) sugerem claritromicina ou azitromicina pediátrica e 14–21 dias de tratamento — desatualizado; não proposto.",
   "Guia HC-FMUSP 2024 cita doxiciclina 2–4 mg/kg/dia na criança alérgica; o DATA usa cefuroxima — decidir se entra."
  ],
  "fontes": [
   "Payne SC et al. Clinical Practice Guideline: Adult Sinusitis Update (AAO-HNSF). Otolaryngol Head Neck Surg. 2025;173(S1).",
   "Fokkens WJ et al. European Position Paper on Rhinosinusitis and Nasal Polyps 2020 (EPOS 2020). Rhinology. 2020;58(Suppl S29):1-464.",
   "Wald ER et al. Clinical practice guideline for the diagnosis and management of acute bacterial sinusitis in children aged 1 to 18 years (AAP). Pediatrics. 2013;132(1):e262-80.",
   "Hospital das Clínicas da FMUSP (Levin AS, Costa SF, coord.). Antimicrobianos na prática clínica: um guia para profissionais da atenção primária. 1ª ed. São Paulo: HC-FMUSP; 2024."
  ]
 },
 {
  "id": "otite_media",
  "tipo": "condicao",
  "cond": "otite_media",
  "nm": "Otite média aguda",
  "sub": "dor de ouvido · membrana abaulada · amoxicilina · observação · mastoidite",
  "kw": "otite media aguda oma dor de ouvido otalgia ouvido inflamado membrana timpanica abaulada otorreia secrecao no ouvido crianca febre mastoidite amoxicilina clavulanato cefuroxima claritromicina azitromicina ceftriaxona dipirona paracetamol ibuprofeno",
  "draft": true,
  "revisado": null,
  "resumo": "Infecção da orelha média, mais comum entre 6 meses e 3 anos, geralmente depois de um resfriado. O diagnóstico exige membrana timpânica abaulada (ou otorreia recente). A decisão principal é quem recebe antibiótico logo e quem pode ser observado por 48–72 h só com analgesia.",
  "secoes": [
   {
    "t": "Quando pensar / diagnóstico",
    "itens": [
     "Otalgia de início agudo (na criança: irritabilidade, puxar a orelha, choro ao deitar) e febre, depois de quadro viral.",
     "Confirmar na otoscopia: abaulamento moderado ou grave da membrana, ou otorreia nova sem otite externa.",
     "Só hiperemia, ou líquido atrás da membrana sem abaulamento, não é OMA (otite com efusão não pede antibiótico).",
     "OMA grave: otalgia moderada a intensa, otalgia há mais de 48 h ou febre ≥ 39 °C.",
     "Adulto com OMA recorrente ou efusão unilateral persistente: examinar a rinofaringe (encaminhar)."
    ]
   },
   {
    "t": "Exame físico: o que procurar",
    "itens": [
     "Otoscopia dos dois lados, começando pelo sem queixa; remover cerume se impedir a visão.",
     "Membrana: abaulamento, opacidade, perfuração, otorreia.",
     "Região retroauricular: edema, dor, eritema e pavilhão deslocado para frente (mastoidite).",
     "Face (paralisia facial), sinais meníngeos e conjuntiva (otite com conjuntivite purulenta sugere H. influenzae)."
    ]
   },
   {
    "t": "Exames complementares",
    "itens": [
     "Diagnóstico clínico: não precisa de exame no caso não complicado.",
     "Suspeita de mastoidite ou complicação intracraniana: TC de ossos temporais e crânio com contraste."
    ]
   },
   {
    "t": "Conduta",
    "itens": [
     "Analgesia em todos: dipirona, paracetamol ou ibuprofeno nos horários nas primeiras 48–72 h.",
     "Antibiótico logo: menores de 6 meses, OMA grave, otorreia, e 6 a 23 meses com OMA bilateral.",
     "Observar 48–72 h com analgesia é opção: 6–23 meses unilateral não grave e a partir de 2 anos não grave, com retorno garantido.",
     "1ª escolha: amoxicilina. Amoxicilina-clavulanato se antibiótico nos últimos 30 dias, otite com conjuntivite ou falha em 48–72 h.",
     "Duração: 10 dias se menor de 2 anos ou grave; 7 dias de 2 a 5 anos; 5 a 7 dias depois dos 6 anos e no adulto.",
     "Alergia: cefuroxima se reação não grave; claritromicina se anafilaxia. Vômitos ou falha: ceftriaxona IM 50 mg/kg por 1 a 3 dias.",
     "Gotas otológicas e descongestionantes não tratam OMA."
    ]
   },
   {
    "t": "Sinais de alarme e quando internar/encaminhar",
    "itens": [
     "Dor, edema ou vermelhidão atrás da orelha com pavilhão deslocado: mastoidite — internar, ceftriaxona EV e otorrino.",
     "Cefaleia intensa, rigidez de nuca, sonolência, convulsão ou vômitos repetidos: complicação intracraniana.",
     "Paralisia facial, vertigem intensa ou perda auditiva súbita.",
     "Febre ou dor sem melhora após 48–72 h de antibiótico: reavaliar e trocar.",
     "Lactente menor de 3 meses com febre: avaliação completa."
    ],
    "alerta": true
   },
   {
    "t": "Orientações ao paciente",
    "itens": [
     "Dê o remédio para dor nos horários nos primeiros 2 a 3 dias; a dor costuma melhorar em 24 a 72 horas.",
     "Se o médico optar por observar sem antibiótico, volte em 48 a 72 horas se a dor ou a febre não melhorarem.",
     "Não coloque cotonete, gotas caseiras ou objetos no ouvido; se houver secreção, evite entrar água.",
     "A sensação de ouvido tampado pode durar semanas; se passar de 3 meses, procure a UBS.",
     "Volte na hora se aparecer inchaço atrás da orelha, rigidez de nuca, sonolência ou paralisia do rosto."
    ]
   },
   {
    "t": "Outras opções (material do médico)",
    "itens": [
     "Azitromicina 500 mg 1x/dia por 5 dias no adulto — anafilaxia à penicilina (guia HC-FMUSP 2024); pneumococo muito resistente: não usar de rotina."
    ],
    "offlabel": true
   }
  ],
  "pendencias": [
   "Criança: o DATA usa amoxicilina 50 mg/kg/dia como padrão e 90 mg/kg/dia só em creche ou OMA grave; a AAP 2013 recomenda 80–90 mg/kg/dia para todos — decidir.",
   "O guia HC-FMUSP 2024 limita a amoxicilina a 500 mg por dose na criança; a dose alta do DATA não tem esse teto — decidir.",
   "Claritromicina pediátrica: DATA 10 dias; guia HC-FMUSP 2024 5 dias — decidir.",
   "PDFs do Drive citam sulfametoxazol-trimetoprima na OMA: alta resistência no Brasil — não proposto.",
   "Azitromicina pediátrica: o guia HC-FMUSP 2024 usa 12 mg/kg/dia por 5 dias, diferente da bula (10 mg/kg no 1º dia e 5 mg/kg do 2º ao 5º) — não proposta; decidir.",
   "Outras opções antigas ('Opção 1' e 'Opção 2') usam 10 dias no adulto; o atual é 5–7 dias — considerar ajustar."
  ],
  "fontes": [
   "Lieberthal AS et al. The diagnosis and management of acute otitis media (AAP). Pediatrics. 2013;131(3):e964-99.",
   "Hospital das Clínicas da FMUSP (Levin AS, Costa SF, coord.). Antimicrobianos na prática clínica: um guia para profissionais da atenção primária. 1ª ed. São Paulo: HC-FMUSP; 2024."
  ]
 },
 {
  "id": "otite_externa",
  "tipo": "condicao",
  "cond": "otite_externa",
  "nm": "Otite externa aguda",
  "sub": "ouvido de nadador · dor ao tracionar · gota otológica · ouvido seco · necrotizante",
  "kw": "otite externa aguda ouvido de nadador dor de ouvido otalgia coceira no ouvido conduto auditivo inchado secrecao no ouvido otorreia tracao do pavilhao tragus piscina cotonete gota otologica ciprofloxacino hidrocortisona dexametasona neomicina polimixina otite externa necrotizante maligna diabetico pseudomonas otomicose",
  "draft": true,
  "revisado": null,
  "resumo": "Inflamação ou infecção difusa do conduto auditivo externo (Pseudomonas e S. aureus), ligada a umidade, cotonete e trauma. O tratamento é tópico: gota com antibiótico com ou sem corticoide, analgesia e ouvido seco; antibiótico oral só se a infecção passar do conduto ou em hospedeiro de risco. Em diabético ou idoso com dor desproporcional, pensar em otite externa necrotizante.",
  "secoes": [
   {
    "t": "Quando pensar / diagnóstico",
    "itens": [
     "Otalgia de início rápido (até 48 h), prurido, plenitude, otorreia e hipoacusia, muitas vezes após piscina, mar ou cotonete.",
     "Dor ao tracionar o pavilhão ou pressionar o trágus é o sinal típico.",
     "Diferenciar de OMA com perfuração, furúnculo do conduto, otomicose (prurido, detritos brancos ou pretos) e herpes zoster (vesículas, paralisia facial).",
     "Diabético, idoso ou imunossuprimido com dor intensa e noturna, otorreia persistente e granulação no conduto: otite externa necrotizante."
    ]
   },
   {
    "t": "Exame físico: o que procurar",
    "itens": [
     "Conduto edemaciado e hiperemiado, com secreção e detritos; às vezes não se vê a membrana.",
     "Avaliar se a membrana timpânica está íntegra: isso define a gota que pode ser usada.",
     "Linfonodos pré e retroauriculares; celulite do pavilhão ou da face.",
     "Pares cranianos (VII, IX a XII) se suspeita de forma necrotizante."
    ]
   },
   {
    "t": "Exames complementares",
    "itens": [
     "Não precisa de exame no caso típico.",
     "Suspeita de necrotizante: glicemia, PCR e VHS, cultura da secreção (bactérias e fungos), TC e/ou RM de ossos temporais."
    ]
   },
   {
    "t": "Conduta",
    "itens": [
     "Gota otológica com antibiótico (quinolona, ou aminoglicosídeo + polimixina) com ou sem corticoide, por 7 dias.",
     "Membrana perfurada ou tubo de ventilação: só gota não ototóxica (quinolona); nunca neomicina.",
     "Conduto muito edemaciado: limpeza (aspiração) e, se disponível, mecha para a gota chegar ao fundo.",
     "Analgesia proporcional à dor: dipirona ou paracetamol; AINE por poucos dias.",
     "Antibiótico oral só se celulite além do conduto, diabetes mal controlado, imunossupressão ou falha do tópico.",
     "Sem melhora em 48–72 h: rever a aplicação da gota, procurar fungo, corpo estranho ou outro diagnóstico."
    ]
   },
   {
    "t": "Sinais de alarme e quando internar/encaminhar",
    "itens": [
     "Dor desproporcional e noturna em diabético, idoso ou imunossuprimido, com granulação no conduto: necrotizante — internar.",
     "Paralisia facial ou de outros pares cranianos: doença avançada na base do crânio.",
     "Febre, celulite do pavilhão ou da face, linfadenite.",
     "Na necrotizante: antibiótico anti-Pseudomonas EV, controle glicêmico, otorrino e infectologia; tratamento por semanas."
    ],
    "alerta": true
   },
   {
    "t": "Orientações ao paciente",
    "itens": [
     "Mantenha o ouvido seco: no banho, proteja com algodão com vaselina; não nade até melhorar.",
     "Para pingar: aqueça o frasco na mão, deite de lado com o ouvido doente para cima e fique assim por 3 a 5 minutos.",
     "Use a gota pelo tempo indicado, mesmo se a dor melhorar antes.",
     "Não use cotonete nem coloque objetos no ouvido.",
     "Volte se não melhorar em 2 a 3 dias, ou na hora se tiver febre, inchaço ao redor da orelha ou paralisia no rosto."
    ]
   }
  ],
  "pendencias": [
   "PDFs do Drive prescrevem antibiótico oral (cefalexina, amoxicilina, claritromicina) na otite externa: não indicado no caso não complicado e a cefalexina não cobre Pseudomonas — não proposto.",
   "PDFs do Drive citam uma gota otológica de betametasona com composição a confirmar — não proposta.",
   "Padrão tem 'CIPROFLOXACINO-DEXAMETASONA SOLUÇÃO TÓPICA' sem concentração, e há itens com nome comercial (gotas otológicas e colírio) — padronizar pelo nome genérico.",
   "Gota neomicina + polimixina + hidrocortisona no Padrão: neomicina é ototóxica e sensibilizante; manter a ressalva da membrana íntegra e considerar a quinolona como 1ª escolha.",
   "Otomicose não tem bloco no DATA — decidir se acrescenta."
  ],
  "fontes": [
   "Rosenfeld RM et al. Clinical practice guideline: acute otitis externa (AAO-HNSF). Otolaryngol Head Neck Surg. 2014;150(1 Suppl):S1-S24.",
   "Kaushik V, Malik T, Saeed SR. Interventions for acute otitis externa. Cochrane Database Syst Rev. 2010;(1):CD004740."
  ]
 },
 {
  "id": "pneumonia",
  "tipo": "condicao",
  "cond": "pneumonia",
  "nm": "Pneumonia adquirida na comunidade",
  "sub": "PAC · CURB-65 · amoxicilina · ceftriaxona + macrolídeo · criança",
  "kw": "pneumonia pneumonia adquirida na comunidade pac broncopneumonia infeccao pulmonar tosse febre catarro dor no peito falta de ar estertores crepitantes condensacao curb-65 curb psi taquipneia tiragem amoxicilina clavulanato azitromicina claritromicina doxiciclina levofloxacino ceftriaxona ampicilina sulbactam piperacilina tazobactam vancomicina cefepima gentamicina oxacilina penicilina cristalina hidrocortisona oxigenio",
  "draft": true,
  "revisado": null,
  "resumo": "Infecção aguda do parênquima pulmonar adquirida fora do hospital. As decisões no PS/UBS são: confirmar (clínica e, quando preciso, RX), estratificar a gravidade (CURB-65 e critérios de PAC grave no adulto; taquipneia, tiragem e SpO2 na criança), escolher entre casa, enfermaria ou UTI e começar o antibiótico sem atraso.",
  "secoes": [
   {
    "t": "Quando pensar / diagnóstico",
    "itens": [
     "Tosse, febre, dispneia ou dor pleurítica, com estertores localizados ou sinais de consolidação.",
     "Idoso pode ter só confusão, queda do estado geral ou descompensação de doença crônica, sem febre.",
     "Criança: febre com taquipneia (≥ 50 irpm de 2 a 11 meses; ≥ 40 de 1 a 4 anos) e/ou tiragem subcostal.",
     "Criança pequena com sibilância difusa: pensar antes em bronquiolite ou asma viral.",
     "Tosse há mais de 2–3 semanas, perda de peso, sudorese noturna ou falha do tratamento: pensar em tuberculose."
    ]
   },
   {
    "t": "Exame físico: o que procurar",
    "itens": [
     "FR, SpO2 em ar ambiente, PA, FC, temperatura e nível de consciência (base do CURB-65).",
     "Ausculta: estertores crepitantes localizados, sopro tubário, murmúrio diminuído (derrame).",
     "Percussão maciça; frêmito aumentado na consolidação e diminuído no derrame.",
     "Criança: tiragem, gemência, batimento de asa de nariz, cianose, hidratação e capacidade de beber."
    ]
   },
   {
    "t": "Exames complementares",
    "itens": [
     "RX de tórax PA e perfil confirma e mostra derrame ou cavitação; na criança ambulatorial sem gravidade pode ser dispensado.",
     "Ambulatorial sem comorbidade: em geral não precisa de exame laboratorial.",
     "Internado: hemograma, ureia, creatinina, eletrólitos, glicemia e gasometria se SpO2 baixa.",
     "PAC grave ou risco de MRSA/Pseudomonas: hemoculturas e escarro antes do antibiótico, antígenos urinários e painel viral.",
     "Derrame pleural: ultrassom e toracocentese se volume significativo."
    ]
   },
   {
    "t": "Conduta",
    "itens": [
     "CURB-65 (ver Escores): 0–1 em casa; 2 considerar internação; ≥ 3 internar e avaliar UTI. SpO2 < 92% também interna.",
     "Adulto sem comorbidade: amoxicilina 1 g de 8/8h; alérgico: doxiciclina.",
     "Com comorbidade ou antibiótico nos últimos 3 meses: amoxicilina-clavulanato + macrolídeo, ou quinolona respiratória isolada.",
     "Duração: 5 dias se estável; a ATS 2025 aceita 3–4 dias no ambulatorial estável sem doença pulmonar.",
     "Enfermaria: ceftriaxona + azitromicina; passar para via oral quando afebril, estável e aceitando dieta.",
     "PAC grave não causada por influenza: hidrocortisona EV nas primeiras 24 h (ATS 2025, recomendação condicional).",
     "Criança: amoxicilina VO por 5 dias; internada, ampicilina ou penicilina cristalina EV; grave ou complicada, ceftriaxona ± oxacilina.",
     "Período de influenza ou SRAG: associar oseltamivir sem esperar o resultado."
    ]
   },
   {
    "t": "Sinais de alarme e quando internar/encaminhar",
    "itens": [
     "Confusão, FR ≥ 30, PAS < 90 ou PAD ≤ 60, SpO2 < 92% ou ureia elevada: internar.",
     "UTI: choque com vasopressor, ventilação mecânica ou ≥ 3 critérios menores (FR ≥ 30, PaO2/FiO2 ≤ 250, multilobar, confusão, ureia alta, leucopenia, plaquetopenia, hipotermia, hipotensão).",
     "Criança: SpO2 < 92%, tiragem subcostal, gemência, apneia, não consegue beber, letargia, menor de 3 meses ou derrame.",
     "Febre ou piora após 72 h de antibiótico: derrame ou empiema, abscesso, germe resistente ou tuberculose."
    ],
    "alerta": true
   },
   {
    "t": "Orientações ao paciente",
    "itens": [
     "Tome o antibiótico nos horários e até o fim; volte para reavaliação em 48 a 72 horas.",
     "A febre costuma ceder em até 1 semana; dor no peito e catarro diminuem em 4 semanas; tosse e falta de ar, em até 6 semanas.",
     "A maioria dos sintomas some em 3 meses; o cansaço pode durar mais.",
     "Beba bastante líquido, descanse e não fume.",
     "Volte na hora se tiver falta de ar, lábios roxos, confusão, dor forte no peito ou vômitos que impeçam o remédio.",
     "Mantenha as vacinas em dia: gripe, COVID-19 e pneumocócica."
    ]
   },
   {
    "t": "Outras opções (material do médico)",
    "itens": [
     "Cefepima 2 g EV de 8/8h (manter azitromicina) — alternativa à piperacilina-tazobactam no risco de Pseudomonas, citada nos PDFs; descalonar pelas culturas.",
     "Ampicilina + gentamicina EV no lactente menor de 2 meses internado — esquema dos PDFs de pediatria; doses pela idade, com a neonatologia."
    ],
    "offlabel": true
   }
  ],
  "pendencias": [
   "Criança: o DATA usa amoxicilina 50 mg/kg/dia de 8/8h; a OMS 2024 usa 80 mg/kg/dia de 12/12h e a IDSA/PIDS 2011, 90 mg/kg/dia — decidir.",
   "O guia HC-FMUSP 2024 usa amoxicilina 500 mg de 8/8h no adulto; o DATA (ATS/IDSA 2019) usa 1 g — confirmar 1 g.",
   "ATS 2025: curso ambulatorial de 3–4 dias no estável de baixo risco e possibilidade de não dar antibiótico na pneumonia viral de baixo risco (a IDSA não endossou essa diretriz) — decidir a duração do Padrão.",
   "Hidrocortisona na PAC grave: a ATS 2025 sugere (condicional), mas dois de três ensaios recentes foram negativos — manter com a ressalva atual?",
   "Outras opções antigas ('Baixo risco' e 'Opção 1' a 'Opção 7'): 7–10 dias, azitromicina por 7–10 dias e omeprazol sem indicação — considerar retirar ou ajustar para 5 dias.",
   "PDFs do Drive: levofloxacino 500 mg de 12/12h, ceftriaxona 1 g de 12/12h e ciprofloxacino EV associado ao betalactâmico — doses ou esquemas fora do padrão; não aproveitados.",
   "Ampicilina + gentamicina no menor de 2 meses: confirmar as doses por idade gestacional e pós-natal com a neonatologia antes de publicar.",
   "A cronologia de melhora nas orientações vem de um informativo do Drive (slide de terceiros, baseado no NICE) — confirmar se entra nas Recomendações."
  ],
  "fontes": [
   "Jones BE, Ramirez JA, Oren E et al. Diagnosis and Management of Community-acquired Pneumonia: An Official American Thoracic Society Clinical Practice Guideline. Am J Respir Crit Care Med. 2026;212(1):24-44 (online 2025).",
   "Metlay JP et al. Diagnosis and Treatment of Adults with Community-acquired Pneumonia: An Official Clinical Practice Guideline of the ATS and IDSA. Am J Respir Crit Care Med. 2019;200(7):e45-e67.",
   "Corrêa RA et al. Recomendações para o manejo da pneumonia adquirida na comunidade 2018 (SBPT). J Bras Pneumol. 2018;44(5):405-423.",
   "World Health Organization. Guideline on management of pneumonia and diarrhoea in children up to 10 years of age. Genebra: WHO; 2024.",
   "Bradley JS et al. The management of community-acquired pneumonia in infants and children older than 3 months of age (PIDS/IDSA). Clin Infect Dis. 2011;53(7):e25-76."
  ]
 },
 {
  "id": "asma",
  "tipo": "condicao",
  "cond": "asma",
  "nm": "Asma — crise e alta",
  "sub": "crise · salbutamol com espaçador · corticoide · ICS-formoterol · alta",
  "kw": "asma crise asmatica broncoespasmo bronquite asmatica chiado sibilancia falta de ar dispneia tosse noturna aperto no peito bombinha espacador salbutamol fenoterol ipratropio budesonida formoterol beclometasona prednisona prednisolona hidrocortisona metilprednisolona sulfato de magnesio oxigenio pico de fluxo pfe",
  "draft": true,
  "revisado": null,
  "resumo": "Doença inflamatória crônica das vias aéreas com crises de sibilância e dispneia. No PS: classificar a gravidade, dar broncodilatador com espaçador, oxigênio controlado e corticoide sistêmico na 1ª hora, e reavaliar em 1 h. Na alta ninguém sai só com broncodilatador de resgate: todo asmático precisa de corticoide inalatório.",
  "secoes": [
   {
    "t": "Quando pensar / diagnóstico",
    "itens": [
     "Dispneia, sibilância, tosse e aperto no peito, piores à noite ou com gatilhos (vírus, alérgenos, exercício, frio, fumaça).",
     "Antes de tratar como asma: pensar em anafilaxia, pneumotórax, pneumonia, IC aguda, TEP e corpo estranho.",
     "Leve: fala frases, consegue deitar, FR pouco aumentada, SpO2 ≥ 94%, PFE > 70%.",
     "Moderada: fala frases curtas, prefere sentar, FR ≤ 30, musculatura acessória, SpO2 ≥ 92%, PFE 50–70%.",
     "Grave: fala palavras ou não fala, FR > 30, SpO2 < 92%, PFE < 50%, tórax silencioso; sonolência, confusão ou cianose = risco de vida.",
     "Risco de morte: intubação ou UTI prévia, internação ou PS no último ano, uso frequente de resgate, sem corticoide inalatório."
    ]
   },
   {
    "t": "Exame físico: o que procurar",
    "itens": [
     "Fala, posição, FR, FC, musculatura acessória, SpO2 e PFE na chegada e 1 h após o tratamento.",
     "Sibilos expiratórios; pouco ou nenhum sibilo com muito esforço (tórax silencioso) é sinal de gravidade.",
     "Criança: tiragem, batimento de asa de nariz, capacidade de mamar ou falar; usar escore clínico validado (ex.: PRAM).",
     "Urticária, angioedema ou hipotensão: anafilaxia — adrenalina IM antes de tudo."
    ]
   },
   {
    "t": "Exames complementares",
    "itens": [
     "RX de tórax e gasometria não são rotina: pedir se suspeita de pneumotórax ou pneumonia, ou crise grave sem resposta.",
     "PaCO2 normal ou alta na crise grave indica fadiga e falência respiratória iminente.",
     "PFE (ou VEF1) na chegada e após 1 h orienta a gravidade e a alta."
    ]
   },
   {
    "t": "Conduta",
    "itens": [
     "Salbutamol spray com espaçador, 1 jato por vez: leve 4 jatos; moderada 4–6 jatos até 3 vezes a cada 20–30 min; grave 6–10 jatos ou nebulização.",
     "Budesonida-formoterol em dose alta é tão eficaz quanto o salbutamol na crise leve a moderada.",
     "Ipratrópio junto com o salbutamol na crise moderada sem resposta e na grave, só na 1ª hora.",
     "Oxigênio se SpO2 < 92%, com alvo de 92–95% (GINA 2026).",
     "Corticoide oral na 1ª hora em toda crise que não seja leve: prednisona/prednisolona 40–50 mg por 5–7 dias; criança 1–2 mg/kg/dia (máx 40 mg) por 3–5 dias.",
     "Via EV só se não puder engolir; não somar dois corticoides sistêmicos.",
     "Crise grave sem resposta na 1ª hora: sulfato de magnésio EV e UTI. Aminofilina, sedativos e antibiótico de rotina, não.",
     "Alta: sintomas leves por 1–2 h após o último salbutamol, SpO2 ≥ 92% em ar ambiente e PFE > 70% (GINA 2026).",
     "Na alta: corticoide inalatório (de preferência budesonida-formoterol como manutenção e resgate a partir de 12 anos), técnica revisada, retorno em 2–7 dias (criança 2–5 dias)."
    ]
   },
   {
    "t": "Sinais de alarme e quando internar/encaminhar",
    "itens": [
     "Sonolência, confusão, cianose, tórax silencioso ou exaustão: chamar ajuda e preparar a via aérea.",
     "SpO2 < 92% apesar de O2, PFE < 50% após o tratamento ou PaCO2 normal ou alta.",
     "Sem melhora após 1 h de tratamento intensivo: internação ou UTI.",
     "Intubação por profissional experiente; cetamina é boa opção de indutor (broncodilatadora)."
    ],
    "alerta": true
   },
   {
    "t": "Orientações ao paciente",
    "itens": [
     "Use a bombinha sempre com espaçador e enxágue a boca depois do corticoide inalatório.",
     "O corticoide inalatório é o tratamento da asma: use todos os dias, mesmo sem sintomas.",
     "Use o resgate só quando precisar; se precisar de novo antes de 3 a 4 horas, procure atendimento.",
     "Tome o corticoide em comprimido pela manhã, pelos dias indicados.",
     "Consulta na UBS em até 7 dias para revisar a técnica e o tratamento.",
     "Volte na hora se tiver falta de ar forte, dificuldade para falar, lábios roxos ou sonolência."
    ]
   },
   {
    "t": "Outras opções (material do médico)",
    "itens": [
     "Ipratrópio spray 20 mcg/jato, 4 jatos com espaçador junto de cada dose de salbutamol (até 3 vezes) na crise moderada — Plantãozinho e GINA 2026.",
     "Nebulização com fenoterol 10 gotas + ipratrópio 40 gotas de 20/20 min (até 3 vezes) — onde não houver salbutamol em solução (PDFs); causa mais taquicardia e tremor."
    ],
    "offlabel": true
   }
  ],
  "pendencias": [
   "Alvo de SpO2: o DATA usa 93–95% no adulto e 94–98% na criança; a GINA 2026 baixou para 92–95% (a partir de 6 anos), com O2 só se SpO2 < 92% — atualizar.",
   "Critérios de alta: o DATA usa PFE ≥ 60% e SpO2 ≥ 94%; a GINA 2026 usa PFE > 70%, SpO2 ≥ 92% e sintomas leves por 1–2 h — decidir.",
   "A GINA 2026 acrescenta ipratrópio já na crise moderada; o DATA só o usa na grave — decidir.",
   "Após a crise, a GINA 2026 prefere budesonida-formoterol em manutenção e resgate no step 4 (2 inalações de 12/12h); o Padrão de alta usa 1 inalação de 12/12h (step 3) — decidir.",
   "Card 'Asma' do senhor: salbutamol 4 jatos de 6/6h fixo por 5 dias e prednisona 60 mg — a GINA orienta resgate só se necessário e prednisolona 40–50 mg; decidir.",
   "Outras opções antigas: 'Prescrição para a alta' com salbutamol isolado e 'Step 2' com beclometasona 50 mcg — resgate isolado não é mais aceito e a dose é baixa para pós-crise; revisar.",
   "PDFs do Drive: terbutalina SC, adrenalina IM sem anafilaxia, nebulização domiciliar e prednisona 40 mg por 14 dias — não aproveitados.",
   "Não há bloco pediátrico ambulatorial (alta pós-crise da criança) — decidir se cria.",
   "PCDT da asma (Portaria Conjunta nº 32/2023) pode ter sido atualizado em 2026 — conferir a versão vigente."
  ],
  "fontes": [
   "Global Initiative for Asthma (GINA). Global Strategy for Asthma Management and Prevention, 2026 update (e Summary Guide 2026).",
   "Pizzichini MMM et al. Recomendações para o manejo da asma da Sociedade Brasileira de Pneumologia e Tisiologia — 2020. J Bras Pneumol. 2020;46(1):e20190307.",
   "Brasil. Ministério da Saúde. Protocolo Clínico e Diretrizes Terapêuticas da Asma (Portaria Conjunta nº 32, de 20/12/2023). Brasília; 2023."
  ]
 },
 {
  "id": "dpoc",
  "tipo": "condicao",
  "cond": "dpoc",
  "nm": "DPOC — exacerbação",
  "sub": "exacerbação · O2 88–92% · prednisona 40 mg · antibiótico se escarro purulento · VNI",
  "kw": "dpoc doenca pulmonar obstrutiva cronica exacerbacao dpoc descompensada enfisema bronquite cronica tabagista falta de ar piora do catarro escarro purulento chiado retencao de co2 hipercapnia vni bipap salbutamol fenoterol ipratropio prednisona metilprednisolona amoxicilina clavulanato doxiciclina azitromicina levofloxacino ceftriaxona cefepima oxigenio venturi",
  "draft": true,
  "revisado": null,
  "resumo": "Piora aguda da dispneia, da tosse ou do escarro em quem tem DPOC, quase sempre por infecção viral ou bacteriana. No PS: broncodilatador de curta ação, prednisona 40 mg por 5 dias, antibiótico se escarro purulento, oxigênio controlado (SpO2 88–92%) e VNI na acidose respiratória — sempre procurando as doenças que imitam exacerbação.",
  "secoes": [
   {
    "t": "Quando pensar / diagnóstico",
    "itens": [
     "Piora da dispneia, aumento do volume do escarro e mudança para purulento, em até 14 dias.",
     "Afastar o que imita exacerbação: pneumonia, IC descompensada, TEP, pneumotórax, arritmia e síndrome coronariana.",
     "Gravidade: leve (só broncodilatador), moderada (corticoide e/ou antibiótico), grave (PS ou internação).",
     "Perguntar exacerbações e internações no último ano, O2 domiciliar, inaladores em uso e tabagismo."
    ]
   },
   {
    "t": "Exame físico: o que procurar",
    "itens": [
     "FR, SpO2, musculatura acessória, respiração paradoxal, cianose e nível de consciência.",
     "Sonolência, cefaleia ou tremor em flapping sugerem hipercapnia.",
     "Ausculta: sibilos e roncos; estertores localizados (pneumonia) ou difusos (congestão).",
     "Edema de membros e turgência jugular: cor pulmonale ou IC."
    ]
   },
   {
    "t": "Exames complementares",
    "itens": [
     "Gasometria arterial na exacerbação grave e 30–60 min após ajustar o O2.",
     "RX de tórax, ECG, hemograma, eletrólitos, função renal e glicemia no paciente do PS.",
     "BNP e troponina se dúvida com IC ou isquemia; angio-TC se suspeita de TEP.",
     "Cultura de escarro se internação, ventilação, falha de antibiótico ou risco de Pseudomonas."
    ]
   },
   {
    "t": "Conduta",
    "itens": [
     "Broncodilatador de curta ação (salbutamol ou fenoterol) ± ipratrópio, por spray com espaçador ou nebulização com ar comprimido se hipercapnia.",
     "Prednisona 40 mg por 5 dias; EV só se não puder via oral.",
     "Antibiótico por 5 dias se escarro purulento com piora da dispneia ou do volume, ou se precisar de VNI ou IOT.",
     "Ambulatorial: amoxicilina-clavulanato ou doxiciclina. Internado: amoxicilina-clavulanato EV ou ceftriaxona; anti-Pseudomonas se fator de risco.",
     "Oxigênio por Venturi 24–28% ou cateter 1–2 L/min, alvo de SpO2 88–92%.",
     "VNI se pH ≤ 7,35 com PaCO2 ≥ 45 mmHg, dispneia grave com fadiga ou hipoxemia persistente.",
     "No internado: profilaxia de TEV e controle da glicemia durante o corticoide.",
     "Na alta: broncodilatador de longa ação (LAMA/LABA), técnica inalatória, cessar tabagismo, vacinas, reabilitação; reavaliar em até 2 semanas."
    ]
   },
   {
    "t": "Sinais de alarme e quando internar/encaminhar",
    "itens": [
     "Rebaixamento de consciência, confusão ou sonolência.",
     "pH < 7,25 ou acidose que piora apesar da VNI; falha ou intolerância à VNI.",
     "Instabilidade hemodinâmica, arritmia grave ou parada respiratória iminente.",
     "O2 em excesso (SpO2 > 92%) pode piorar a hipercapnia: titular."
    ],
    "alerta": true
   },
   {
    "t": "Orientações ao paciente",
    "itens": [
     "Tome a prednisona pela manhã por 5 dias e o antibiótico até o fim, se receitado.",
     "Use a bombinha de resgate com espaçador quando tiver falta de ar; se precisar com intervalo menor que 4 horas, volte.",
     "Pare de fumar: o SUS oferece tratamento gratuito.",
     "Mantenha em dia as vacinas da gripe, pneumocócica e COVID-19.",
     "Consulta na UBS em até 2 semanas para ajustar a bombinha de uso diário.",
     "Volte na hora se tiver muita falta de ar, lábios roxos, sonolência, confusão ou dor no peito."
    ]
   },
   {
    "t": "Outras opções (material do médico)",
    "itens": [
     "Amoxicilina-clavulanato 875/125 mg de 12/12h por 5 dias — esquema de 2 tomadas ao dia citado nos PDFs.",
     "Levofloxacino 750 mg 1x/dia por 5 dias — risco de Pseudomonas ou alergia grave a betalactâmico (PDFs, guia HC-FMUSP); risco de tendinopatia, QT longo, delirium."
    ],
    "offlabel": true
   }
  ],
  "pendencias": [
   "O guia HC-FMUSP 2024 associa sempre macrolídeo à amoxicilina-clavulanato na exacerbação; o DATA e o GOLD usam monoterapia — decidir.",
   "Outras opções 'Receita': amoxicilina 10 dias + azitromicina 7 dias + prednisona 20 mg + omeprazol — fora do GOLD (prednisona 40 mg; antibiótico 5 dias); considerar retirar.",
   "PDFs do Drive usam prednisona 20 mg por 5 dias (subdose) e nebulização domiciliar — não aproveitados.",
   "O relatório GOLD 2027 sai em 18/11/2026 — conferir se muda algo na exacerbação.",
   "O PCDT de DPOC foi atualizado (Portaria Conjunta SAES/SCTIE nº 29, de 27/11/2025) — conferir os inaladores disponíveis no SUS para a orientação de alta."
  ],
  "fontes": [
   "Global Initiative for Chronic Obstructive Lung Disease (GOLD). Global Strategy for the Diagnosis, Management, and Prevention of COPD — 2026 Report.",
   "Brasil. Ministério da Saúde. Protocolo Clínico e Diretrizes Terapêuticas da Doença Pulmonar Obstrutiva Crônica (Portaria Conjunta SAES/SCTIE nº 29, de 27/11/2025). Brasília; 2025.",
   "Hospital das Clínicas da FMUSP (Levin AS, Costa SF, coord.). Antimicrobianos na prática clínica: um guia para profissionais da atenção primária. 1ª ed. São Paulo: HC-FMUSP; 2024."
  ]
 },
 {
  "id": "edema_agudo_pulmao",
  "tipo": "condicao",
  "cond": "edema_agudo_pulmao",
  "nm": "Edema agudo de pulmão / IC descompensada",
  "sub": "congestão · furosemida EV · nitrato · VNI · perfil hemodinâmico",
  "kw": "edema agudo de pulmao eap insuficiencia cardiaca descompensada icc ic descompensada congestao falta de ar ortopneia dispneia paroxistica noturna escarro rosado espumoso estertores inchaco nas pernas edema b3 bnp furosemida lasix diuretico nitroglicerina isossorbida nitroprussiato vni cpap bipap dobutamina noradrenalina acetazolamida isglt2 dapagliflozina empagliflozina",
  "draft": true,
  "revisado": null,
  "resumo": "Congestão pulmonar aguda por insuficiência cardíaca nova ou crônica descompensada, muitas vezes hipertensiva. Conduta imediata: sentar o paciente, O2 ou VNI se desconforto ou hipoxemia, furosemida EV com meta de diurese e natriurese, vasodilatador se PA alta e tratar o fator precipitante. Hipoperfusão (perfil frio) é outro cenário: inotrópico ou vasopressor.",
  "secoes": [
   {
    "t": "Quando pensar / diagnóstico",
    "itens": [
     "Dispneia súbita ou progressiva, ortopneia, dispneia paroxística noturna, tosse com escarro rosado e espumoso.",
     "Perfis: quente-úmido (congesto e perfundido, o mais comum), frio-úmido (congesto e hipoperfundido), frio-seco e quente-seco.",
     "Precipitantes: crise hipertensiva, SCA, arritmia (FA), infecção, má adesão a remédio ou dieta, AINE, piora renal, TEP, valvopatia aguda.",
     "Diferenciais: DPOC ou asma, pneumonia, TEP, SDRA, tamponamento."
    ]
   },
   {
    "t": "Exame físico: o que procurar",
    "itens": [
     "PA, FC, FR, SpO2, temperatura das extremidades, TEC e nível de consciência (definem o perfil).",
     "Estertores crepitantes bilaterais, sibilos (asma cardíaca), B3, sopros novos.",
     "Turgência jugular, refluxo hepatojugular, edema de membros, ascite.",
     "Hipoperfusão: extremidades frias, pulso fino, oligúria, confusão, pressão de pulso estreita."
    ]
   },
   {
    "t": "Exames complementares",
    "itens": [
     "ECG imediato (isquemia, arritmia) e troponina.",
     "RX de tórax e ultrassom à beira-leito (linhas B bilaterais, derrame, veia cava).",
     "BNP ou NT-proBNP se dúvida diagnóstica: valor normal praticamente exclui IC.",
     "Hemograma, creatinina, ureia, sódio, potássio, glicemia; gasometria se hipoxemia; ecocardiograma na internação.",
     "Sódio urinário 2 h após o diurético e diurese em 6 h avaliam a resposta."
    ]
   },
   {
    "t": "Conduta",
    "itens": [
     "Sentar com as pernas pendentes, monitorizar e obter acesso venoso.",
     "O2 se SpO2 < 90%; VNI (CPAP ou BiPAP) precoce se FR > 25, SpO2 < 90% ou esforço respiratório.",
     "Furosemida EV em bolus: sem uso prévio 20–40 mg; se já usa, 1 a 2 vezes a dose oral diária.",
     "Resposta insuficiente (sódio urinário < 50–70 mEq/L em 2 h ou diurese < 100–150 mL/h em 6 h): dobrar a dose.",
     "PAS > 110 mmHg: nitrato sublingual enquanto prepara a nitroglicerina EV; EAP hipertensivo grave pode exigir nitroprussiato.",
     "Congestão refratária: associar acetazolamida EV ou tiazídico (bloqueio sequencial do néfron), conforme diretrizes de 2026.",
     "Perfil frio com PAS < 90 e hipoperfusão: noradrenalina; baixo débito com PAS ≥ 90: dobutamina (ver Calculadoras).",
     "Morfina não é rotina: associada a pior desfecho.",
     "Após estabilizar: iniciar ou manter os remédios da IC (iSGLT2, betabloqueador, IECA/BRA ou sacubitril-valsartana, espironolactona) antes da alta; retorno em 7–14 dias."
    ]
   },
   {
    "t": "Sinais de alarme e quando internar/encaminhar",
    "itens": [
     "PAS < 90 com hipoperfusão (extremidades frias, lactato alto, oligúria, confusão): choque cardiogênico — UTI.",
     "Falha da VNI, rebaixamento de consciência ou exaustão: intubação.",
     "Supra de ST ou SCA de alto risco: hemodinâmica.",
     "Arritmia instável (FA de alta resposta com hipotensão, TV): cardioversão.",
     "Não usar nitrato se PAS < 90, infarto de VD ou inibidor de fosfodiesterase-5 recente."
    ],
    "alerta": true
   },
   {
    "t": "Orientações ao paciente",
    "itens": [
     "Pese-se todos os dias pela manhã; ganho de mais de 2 kg em 3 dias pede consulta.",
     "Diminua o sal e siga a quantidade de líquido orientada.",
     "Não pare os remédios do coração por conta própria e evite anti-inflamatórios.",
     "Marque consulta na UBS ou com o cardiologista em 7 a 14 dias.",
     "Ligue 192 ou volte na hora se a falta de ar piorar, não conseguir deitar, tiver escarro rosado, dor no peito ou desmaio."
    ]
   },
   {
    "t": "Outras opções (material do médico)",
    "itens": [
     "Nitroprussiato em bomba no EAP hipertensivo grave ou sem resposta ao nitrato — citado nos PDFs e admitido pela diretriz brasileira 2026; exige PA monitorizada."
    ],
    "offlabel": true
   }
  ],
  "pendencias": [
   "A Diretriz Brasileira de IC 2026 e a ESC 2026 incluem acetazolamida EV (ou tiazídico) na congestão refratária e diurese guiada pelo sódio urinário — não há no DATA; decidir se acrescenta.",
   "PDFs do Drive citam morfina 1–3 mg no EAP: associada a pior desfecho — não proposta (o DATA acerta ao não incluir).",
   "Bloco ambulatorial: furosemida 40 mg, 30 comprimidos — conferir o esquema e se cabe orientar iSGLT2 e demais remédios da IC na alta.",
   "Nitroprussiato exige monitorização contínua da PA (idealmente invasiva) e UTI — confirmar se o serviço tem essa condição antes de publicar.",
   "Referência completa da Diretriz Brasileira de IC 2026 (Arq Bras Cardiol) a confirmar."
  ],
  "fontes": [
   "Sociedade Brasileira de Cardiologia (Departamento de Insuficiência Cardíaca). Diretriz Brasileira de Insuficiência Cardíaca 2026. Arq Bras Cardiol. 2026.",
   "European Society of Cardiology. 2026 ESC Guidelines for the management of heart failure. Eur Heart J. 2026 (doi:10.1093/eurheartj/ehag100).",
   "McDonagh TA et al. 2021 ESC Guidelines for the diagnosis and treatment of acute and chronic heart failure. Eur Heart J. 2021;42(36):3599-3726.",
   "Mullens W et al. The use of diuretics in heart failure with congestion — a position statement from the Heart Failure Association of the ESC. Eur J Heart Fail. 2019;21(2):137-155."
  ]
 },
 {
  "id": "dor_toracica",
  "tipo": "condicao",
  "cond": "dor_toracica",
  "nm": "Dor torácica / síndrome coronariana aguda",
  "sub": "SCA · ECG em 10 min · troponina · HEART · reperfusão",
  "kw": "dor toracica dor no peito aperto no peito precordialgia angina infarto iam sca iamcsst iamssst supra de st troponina ecg heart aas clopidogrel ticagrelor nitrato isossorbida nitroglicerina enoxaparina atorvastatina metoprolol trombolise angioplastia disseccao de aorta tep pneumotorax tamponamento pericardite",
  "draft": true,
  "revisado": null,
  "resumo": "Toda dor torácica não traumática é síndrome coronariana aguda até prova em contrário: ECG em até 10 minutos e troponina. A decisão é separar IAM com supra (reperfusão imediata), SCA sem supra (antiagregação, anticoagulação e estratificação) e causas graves não coronarianas (dissecção, TEP, pneumotórax, tamponamento).",
  "secoes": [
   {
    "t": "Quando pensar / diagnóstico",
    "itens": [
     "Dor em aperto, peso ou queimação retroesternal, irradiada para braço, pescoço ou mandíbula, em repouso ou ao esforço, com sudorese ou náusea.",
     "Idoso, mulher e diabético têm apresentação atípica com frequência: dispneia, epigastralgia, fadiga, síncope ou confusão.",
     "ECG em até 10 minutos da chegada; repetir em 15–30 min se o primeiro for normal e a dor persistir ou voltar.",
     "Supra de ST novo em 2 derivações contíguas (ou BRE novo com quadro típico) = IAM com supra: acionar reperfusão sem esperar troponina.",
     "IAM inferior: fazer V3R–V4R (ventrículo direito) e V7–V9; infra de ST em V1–V3 pode ser IAM posterior.",
     "Diferenciais que matam: dissecção de aorta, TEP, pneumotórax hipertensivo, tamponamento e ruptura de esôfago."
    ]
   },
   {
    "t": "Exame físico: o que procurar",
    "itens": [
     "PA nos dois braços e pulsos dos quatro membros: diferença > 20 mmHg ou déficit de pulso sugere dissecção (ADD-RS em Escores).",
     "Sinais de IC e choque: estertores, B3, estase jugular, hipotensão, extremidades frias (classificação de Killip).",
     "Sopro novo (insuficiência mitral, CIV), atrito pericárdico, enfisema subcutâneo ou murmúrio abolido de um lado.",
     "Dor reproduzida à palpação não exclui SCA; dor e edema de panturrilha fazem pensar em TEP."
    ]
   },
   {
    "t": "Exames complementares",
    "itens": [
     "Troponina na chegada e repetida: ultrassensível em 0/1 h ou 0/2 h; convencional em 0 e 3–6 h.",
     "Escore HEART (em Escores) na dor com ECG não diagnóstico: 0–3 baixo risco, 4–6 intermediário, 7–10 alto.",
     "RX de tórax (pneumotórax, mediastino alargado, congestão), hemograma, eletrólitos, creatinina e coagulograma.",
     "Suspeita de TEP: Wells/PERC e D-dímero; suspeita de dissecção: angio-TC antes de antiagregar e anticoagular."
    ]
   },
   {
    "t": "Conduta",
    "itens": [
     "Monitor e acesso venoso; oxigênio só se SpO2 < 90%; AAS 150–300 mg mastigado se não houver alergia ou sangramento ativo.",
     "IAM com supra: angioplastia primária se possível em até 120 min do diagnóstico; senão, trombólise em até 30 min (Calculadoras › Trombólise).",
     "Segundo antiagregante: clopidogrel com trombólise e em idosos; as diretrizes preferem ticagrelor quando a estratégia é angioplastia.",
     "Anticoagular toda SCA confirmada (enoxaparina; esquema da trombólise em Calculadoras › Anticoagulação).",
     "Nitrato SL ou EV para dor, hipertensão ou congestão; não usar se PAS < 90, IAM de VD ou inibidor de PDE5 recente.",
     "Morfina só se dor refratária ao nitrato; estatina de alta potência desde a admissão; betabloqueador oral em 24 h se sem IC, choque ou BAV.",
     "Alta só na dor de baixo risco: ECG e troponinas seriadas normais, HEART baixo e consulta de seguimento garantida."
    ]
   },
   {
    "t": "Sinais de alarme e quando internar/encaminhar",
    "itens": [
     "Choque, edema agudo de pulmão, arritmia ventricular, BAV avançado ou dor refratária: transferência imediata para hemodinâmica/UTI.",
     "SCA sem supra de muito alto risco (instabilidade, dor refratária, arritmia, IC aguda): cateterismo em menos de 2 h.",
     "Dor súbita e lancinante irradiada para o dorso: dissecção — não trombolisar nem anticoagular; angio-TC e cirurgia vascular.",
     "Dispneia súbita com taquicardia e hipoxemia: TEP; hipotensão com turgência jugular e bulhas abafadas: tamponamento."
    ],
    "alerta": true
   },
   {
    "t": "Orientações ao paciente",
    "itens": [
     "Os exames de hoje não mostraram infarto; mesmo assim, procure a unidade de saúde em poucos dias para completar a avaliação.",
     "Ligue 192 (SAMU) se a dor voltar em aperto ou peso, irradiar para braço ou mandíbula, ou vier com suor frio, falta de ar ou desmaio.",
     "Controle pressão, diabetes e colesterol, pare de fumar e não use remédio para ereção junto com nitrato."
    ]
   },
   {
    "t": "Outras opções (material do médico)",
    "itens": [
     "Ticagrelor 180 mg de ataque — no lugar do clopidogrel quando houver angioplastia; não usar após trombólise nem com AVC hemorrágico prévio.",
     "Metoprolol oral em dose baixa nas primeiras 24 h — se sem IC, baixo débito, BAV ou broncoespasmo; o EV precoce de rotina aumenta choque."
    ],
    "offlabel": true
   }
  ],
  "pendencias": [
   "Material do Drive (Tigers, Principais condutas) dá O2 se SpO2 < 94% ou de rotina; diretrizes atuais: só se SpO2 < 90% — não aproveitar o corte antigo.",
   "DATA só tem clopidogrel; ACC/AHA 2025 e ESC 2023 preferem ticagrelor ou prasugrel na angioplastia — decidir se entra (proposta enviada).",
   "ESC 2023 não recomenda pré-tratamento rotineiro com inibidor de P2Y12 na SCA sem supra com cateterismo precoce; com transferência demorada pela regulação, decidir a regra do site.",
   "Principais condutas: alteplase incompleto (falta 0,5 mg/kg em 60 min), 'angina instável = só sintomáticos' e metoprolol 25 mg EV em bolus — não aproveitar.",
   "Tigers/Principais condutas usam sinvastatina 40 mg; DATA usa atorvastatina 80 mg (alta potência, correto) — manter.",
   "Confirmar se o serviço tem troponina ultrassensível (protocolo 0/1 h) ou só convencional (0 e 3–6 h)."
  ],
  "fontes": [
   "Rao SV et al. 2025 ACC/AHA/ACEP/NAEMSP/SCAI Guideline for the Management of Patients With Acute Coronary Syndromes. J Am Coll Cardiol. 2025;85(22):2135-2237.",
   "Byrne RA et al. 2023 ESC Guidelines for the management of acute coronary syndromes. Eur Heart J. 2023;44(38):3720-3826.",
   "Nicolau JC et al. Diretrizes da Sociedade Brasileira de Cardiologia sobre Angina Instável e Infarto Agudo do Miocárdio sem Supradesnível do Segmento ST – 2021. Arq Bras Cardiol. 2021;117(1):181-264.",
   "Gulati M et al. 2021 AHA/ACC/ASE/CHEST/SAEM/SCCT/SCMR Guideline for the Evaluation and Diagnosis of Chest Pain. Circulation. 2021;144(22):e368-e454."
  ]
 },
 {
  "id": "crise_hipertensiva",
  "tipo": "condicao",
  "cond": "crise_hipertensiva",
  "nm": "Crise hipertensiva (urgência e emergência)",
  "sub": "emergência hipertensiva · lesão de órgão-alvo · nitroprussiato · captopril",
  "kw": "crise hipertensiva pressao alta pico hipertensivo urgencia hipertensiva emergencia hipertensiva pseudocrise has pa elevada pressao 18 por 11 encefalopatia hipertensiva disseccao de aorta edema agudo de pulmao eclampsia avc lesao de orgao alvo captopril clonidina nitroprussiato nitroglicerina metoprolol hidralazina losartana anlodipino hidroclorotiazida",
  "draft": true,
  "revisado": null,
  "resumo": "O número da PA não define a gravidade: emergência é PA muito elevada com lesão aguda e progressiva de órgão-alvo (droga EV e UTI). Sem lesão, a conduta é repouso, tratar dor ou ansiedade, ajuste oral e retorno em até 7 dias — a decisão depende da procura ativa de lesão de órgão-alvo.",
  "secoes": [
   {
    "t": "Quando pensar / diagnóstico",
    "itens": [
     "Diretriz Brasileira 2025: PA ≥ 180/110 mmHg orienta a avaliação; emergência = PA muito elevada com lesão aguda e progressiva de órgão-alvo.",
     "Sem lesão de órgão-alvo: 'elevação importante da PA' (o termo urgência hipertensiva foi abandonado); a maioria é dor, ansiedade ou falta do remédio.",
     "Pseudocrise: PA alta por dor, ansiedade, retenção urinária ou abstinência — tratar a causa, não o número.",
     "Emergências: encefalopatia, AVC, hemorragia intracraniana, SCA, edema agudo de pulmão, dissecção de aorta, pré-eclâmpsia/eclâmpsia, lesão renal aguda, hipertensão maligna."
    ]
   },
   {
    "t": "Exame físico: o que procurar",
    "itens": [
     "PA nos dois braços com manguito adequado, repetida após 15–30 min de repouso.",
     "Neurológico: nível de consciência, déficit focal, cefaleia intensa, convulsão, alteração visual.",
     "Cardiopulmonar e vascular: dor torácica, estertores, B3, assimetria de pulsos, massa abdominal pulsátil, edema.",
     "Fundo de olho quando possível: hemorragias, exsudatos e papiledema indicam hipertensão maligna."
    ]
   },
   {
    "t": "Exames complementares",
    "itens": [
     "Se suspeita de lesão de órgão-alvo: ECG, troponina, creatinina, potássio, urina I (proteinúria, hematúria) e hemograma.",
     "TC de crânio se sintoma neurológico; RX ou US de tórax se dispneia; angio-TC se suspeita de dissecção; beta-hCG na mulher em idade fértil.",
     "PA alta assintomática sem sinal de lesão não precisa de exames no PS: encaminhar para investigação ambulatorial."
    ]
   },
   {
    "t": "Conduta",
    "itens": [
     "Sem lesão de órgão-alvo: repouso por 30 min em ambiente calmo e tratar dor; se não baixar, captopril VO (ou clonidina VO) e reavaliar.",
     "Meta sem lesão: reduzir aos poucos (PAS < 160 e PAD < 100 em horas a dias) e retorno em 1 a 7 dias; não internar nem usar droga EV.",
     "Nunca nifedipina de liberação rápida (sublingual ou oral): a queda brusca pode causar AVC e infarto.",
     "Emergência: monitorização, droga EV em bomba e UTI; reduzir a PA média até 25% na 1ª hora, ~160/100–110 em 2–6 h e normalizar em 24–48 h.",
     "Nitroprussiato na maioria; nitroglicerina na SCA e no edema agudo de pulmão (diluição e vazão em Calculadoras).",
     "Dissecção de aorta: betabloqueador EV primeiro (FC < 60 e PAS ≤ 120 em até 20 min), depois o vasodilatador.",
     "AVC isquêmico: só tratar se PA > 220/120 (ou > 185/110 se trombólise); hemorragia intracraniana e eclâmpsia têm metas e drogas próprias."
    ]
   },
   {
    "t": "Sinais de alarme e quando internar/encaminhar",
    "itens": [
     "Cefaleia intensa com confusão, convulsão ou alteração visual: encefalopatia hipertensiva.",
     "Dor torácica ou dorsal súbita e intensa: dissecção de aorta ou SCA.",
     "Dispneia com estertores e hipoxemia: edema agudo de pulmão.",
     "Gestante ≥ 20 semanas ou puérpera com PA ≥ 160/110: pré-eclâmpsia grave — sulfato de magnésio e obstetrícia."
    ],
    "alerta": true
   },
   {
    "t": "Orientações ao paciente",
    "itens": [
     "Sua pressão estava alta, mas não houve dano ao coração, ao cérebro ou aos rins; marque consulta na unidade de saúde em até 7 dias.",
     "Não pare os remédios de pressão por conta própria; diminua o sal e evite bebida alcoólica e cigarro.",
     "Procure a emergência se dor no peito, falta de ar, dor de cabeça muito forte, confusão, fraqueza em um lado do corpo ou dificuldade para falar ou enxergar."
    ]
   },
   {
    "t": "Outras opções (material do médico)",
    "itens": [
     "Metoprolol EV (5 mg, repetir até 15 mg) — dissecção de aorta ou SCA com hipertensão; não usar com IC descompensada, BAV, broncoespasmo ou cocaína."
    ],
    "offlabel": true
   }
  ],
  "pendencias": [
   "Bloco do DATA diz que crise hipertensiva 'não tem indicação de clonidina'; a Diretriz Brasileira 2025 cita clonidina ou captopril VO na elevação sem lesão que persiste após repouso — decidir.",
   "Informativo do Drive (Urgência e Emergência Hipertensiva) usa PAD ≥ 120 (JNC V, 1993); a Diretriz 2025 usa ≥ 180/110 com ou sem lesão — não aproveitar o corte antigo.",
   "Tigers e 'prescrição - pronto atendimento' trazem nifedipino 10–20 mg e doses de nitroprussiato/nitroglicerina em mg (erro: mcg) — não aproveitar.",
   "Hidralazina EV (Drive, 10–20 mg) é droga da eclâmpsia, e as doses máximas divergem entre protocolos (20 a 45 mg) — confirmar no protocolo da FEBRASGO antes de incluir.",
   "DATA não tem betabloqueador EV para dissecção/SCA (proposta de metoprolol enviada); esmolol não aparece no material do Drive."
  ],
  "fontes": [
   "Sociedade Brasileira de Cardiologia, Sociedade Brasileira de Hipertensão e Sociedade Brasileira de Nefrologia. Diretriz Brasileira de Hipertensão Arterial – 2025. Arq Bras Cardiol. 2025;122(9):e20250624.",
   "McEvoy JW et al. 2024 ESC Guidelines for the management of elevated blood pressure and hypertension. Eur Heart J. 2024;45(38):3912-4018.",
   "van den Born BJH et al. ESC Council on hypertension position document on the management of hypertensive emergencies. Eur Heart J Cardiovasc Pharmacother. 2019;5(1):37-46."
  ]
 },
 {
  "id": "cefaleia",
  "tipo": "condicao",
  "cond": "cefaleia",
  "nm": "Cefaleia",
  "sub": "sinais de alarme · HSA · tensional · salvas · analgesia no PS",
  "kw": "cefaleia dor de cabeca cefaleia tensional enxaqueca migranea salvas cluster hemorragia subaracnoidea hsa pior dor da vida trovoada meningite sinais de alarme ottawa hsa dipirona paracetamol naproxeno ibuprofeno cetoprofeno tenoxicam metoclopramida dexametasona clorpromazina sumatriptana oxigenio",
  "draft": true,
  "revisado": null,
  "resumo": "A pergunta do PS é se a cefaleia é primária ou secundária: procure sinais de alarme antes de tratar. Cefaleia primária trata-se com analgésico ou AINE e antiemético, evitando opioide; sinal de alarme indica TC e, quando preciso, punção lombar.",
  "secoes": [
   {
    "t": "Quando pensar / diagnóstico",
    "itens": [
     "Tensional: pressão bilateral, leve a moderada, sem náusea importante, não piora com atividade física.",
     "Enxaqueca: unilateral, pulsátil, moderada a forte, piora com esforço, com náusea ou foto/fonofobia (ver Enxaqueca).",
     "Salvas: dor orbitária unilateral muito forte por 15–180 min, com lacrimejamento, rinorreia, ptose ou miose do mesmo lado e inquietação.",
     "Sinais de alarme: início súbito (pico em < 1 h), pior da vida, febre, déficit focal, papiledema, início após 50 anos, câncer, imunossupressão, gestação, anticoagulante, trauma.",
     "Também alarme: piora progressiva, dor que acorda, piora com Valsalva ou ao deitar, mudança do padrão habitual, convulsão."
    ]
   },
   {
    "t": "Exame físico: o que procurar",
    "itens": [
     "PA, temperatura e nível de consciência; rigidez de nuca e outros sinais meníngeos.",
     "Exame neurológico completo: pupilas, campos visuais, força, reflexos e marcha; fundo de olho (papiledema).",
     "Artéria temporal endurecida ou dolorosa no idoso (arterite); olho vermelho com pupila em média midríase (glaucoma agudo)."
    ]
   },
   {
    "t": "Exames complementares",
    "itens": [
     "Cefaleia primária típica com exame normal não precisa de exame.",
     "Regra de Ottawa para HSA (em Escores) na cefaleia súbita com exame neurológico normal.",
     "TC sem contraste nas primeiras 6 h do início, com exame neurológico normal, praticamente afasta HSA; depois de 6 h com TC normal, punção lombar ou angio-TC.",
     "Febre com rigidez de nuca: hemoculturas e antibiótico sem esperar TC ou punção; VHS/PCR se suspeita de arterite temporal."
    ]
   },
   {
    "t": "Conduta",
    "itens": [
     "Ambiente escuro e silencioso; 1ª etapa no PS: dipirona EV + metoclopramida EV em infusão lenta.",
     "Sem melhora em 1 h: AINE EV (cetoprofeno), clorpromazina EV com hidratação prévia ou sumatriptana SC (sem contraindicação vascular).",
     "Dexametasona 10 mg EV reduz a recorrência da enxaqueca nas 72 h seguintes.",
     "Evitar opioides (tramadol, morfina): menos eficazes, mais retorno ao PS e mais cronificação.",
     "Salvas: O2 a 100% 12–15 L/min por 15–20 min e/ou sumatriptana 6 mg SC; o primeiro episódio pede neuroimagem.",
     "Gestante: paracetamol e metoclopramida; evitar AINE após 20 semanas e dipirona no 3º trimestre; afastar pré-eclâmpsia.",
     "Criança: ibuprofeno VO é a 1ª escolha; no PS, dipirona EV, ondansetrona e hidratação se vômitos."
    ]
   },
   {
    "t": "Sinais de alarme e quando internar/encaminhar",
    "itens": [
     "Cefaleia em trovoada, rebaixamento, déficit focal ou convulsão: TC urgente e neurologia (HSA, AVC, trombose venosa cerebral).",
     "Febre com rigidez de nuca ou petéquias: meningite — antibiótico imediato.",
     "Cefaleia nova na gestação ou no puerpério com PA ≥ 140/90: pré-eclâmpsia até prova em contrário.",
     "Dor refratária às duas etapas ou com mais de 72 h: internar, rever causa secundária e discutir com a neurologia."
    ],
    "alerta": true
   },
   {
    "t": "Orientações ao paciente",
    "itens": [
     "Tome o remédio logo no início da dor e não use analgésico mais de 10 dias por mês: o excesso deixa a dor crônica.",
     "Durma bem, beba água, não pule refeições, faça exercício regular e procure reduzir o estresse; anote as crises num diário.",
     "Volte imediatamente se a dor for súbita e muito forte, vier com febre e nuca dura, confusão, convulsão, fraqueza ou alteração da fala ou da visão."
    ]
   },
   {
    "t": "Outras opções (material do médico)",
    "itens": [
     "Tenoxicam 20 mg EV ou IM — AINE alternativo quando não há cetoprofeno; a evidência específica na cefaleia é escassa e valem as contraindicações dos AINEs."
    ],
    "offlabel": true
   }
  ],
  "pendencias": [
   "DATA é incoerente: Cefaleia pediátrica diz 'não usar metoclopramida em menores de 18 anos', mas Enxaqueca pediátrica usa metoclopramida acima de 1 ano — unificar a regra.",
   "Tigers e Principais condutas põem dimenidrinato EV e tramadol EV no 'coquetel'; dimenidrinato não trata cefaleia e opioide não é recomendado — não aproveitar.",
   "Principais condutas usam dexametasona 4 mg; a dose com evidência é 10 mg (DATA correto); 'prescrição - pronto atendimento' cita 10–25 mg.",
   "Informativo próprio do médico (Cefaleia) acrescenta exercício regular e redução do estresse — incluído nas orientações; confirmar.",
   "Dipirona + isometepteno + cafeína (Principais condutas) tem pouca evidência — não proposta."
  ],
  "fontes": [
   "Godwin SA et al. Clinical Policy: Critical Issues in the Evaluation and Management of Adult Patients Presenting to the Emergency Department With Acute Headache. Ann Emerg Med. 2019;74(4):e41-e74.",
   "Orr SL et al. Management of Adults With Acute Migraine in the Emergency Department: The American Headache Society Evidence Assessment of Parenteral Pharmacotherapies. Headache. 2016;56(6):911-940.",
   "Comitê ad hoc da Sociedade Brasileira de Cefaleia. Recommendations for the treatment of migraine attacks – a Brazilian consensus. Arq Neuropsiquiatr. 2016;74(3):262-271.",
   "Robbins MS et al. Treatment of Cluster Headache: The American Headache Society Evidence-Based Guidelines. Headache. 2016;56(7):1093-1106.",
   "Perry JJ et al. Clinical decision rules to rule out subarachnoid hemorrhage for acute headache. JAMA. 2013;310(12):1248-1255."
  ]
 },
 {
  "id": "enxaqueca",
  "tipo": "condicao",
  "cond": "enxaqueca",
  "nm": "Enxaqueca",
  "sub": "migrânea · triptano · AINE · crise no PS · prevenção",
  "kw": "enxaqueca migranea migrania aura dor de cabeca latejante fotofobia fonofobia triptano sumatriptano naratriptano rizatriptano naproxeno ibuprofeno dipirona paracetamol metoclopramida ondansetrona cetoprofeno dexametasona clorpromazina sulfato de magnesio ergotamina di-hidroergotamina estado de mal enxaquecoso cefaleia por uso excessivo",
  "draft": true,
  "revisado": null,
  "resumo": "Crise de enxaqueca: tratar cedo e por gravidade — AINE ou dipirona na leve a moderada, triptano na moderada a forte, antiemético se náusea. No PS, dipirona e metoclopramida EV com dexametasona; evitar opioides e encaminhar para prevenção quem tem crises frequentes.",
  "secoes": [
   {
    "t": "Quando pensar / diagnóstico",
    "itens": [
     "Pelo menos 5 crises de 4–72 h com 2 de: unilateral, pulsátil, moderada/forte, piora com esforço; mais náusea/vômito ou foto e fonofobia.",
     "Aura: sintomas visuais, sensitivos ou de fala que duram 5–60 min e somem por completo, antes ou durante a dor.",
     "Primeira aura, aura motora, aura > 60 min ou início após 50 anos: investigar como AIT/AVC, não como enxaqueca.",
     "Dor em mais de 15 dias por mês com analgésico em 10–15 dias ou mais: pensar em cefaleia por uso excessivo de medicamentos."
    ]
   },
   {
    "t": "Exame físico: o que procurar",
    "itens": [
     "Exame neurológico e fundo de olho normais na crise típica.",
     "PA, temperatura e sinais meníngeos sempre; qualquer achado focal muda o diagnóstico (ver Cefaleia)."
    ]
   },
   {
    "t": "Exames complementares",
    "itens": [
     "Enxaqueca típica com exame normal não precisa de imagem nem de laboratório.",
     "Neuroimagem se sinal de alarme, aura atípica ou crise muito diferente das habituais."
    ]
   },
   {
    "t": "Conduta",
    "itens": [
     "Leve a moderada: AINE (naproxeno, ibuprofeno) ou dipirona/paracetamol no início da dor, com metoclopramida se náusea.",
     "Moderada a forte ou sem resposta ao AINE: triptano no início da dor; pode associar ao naproxeno.",
     "Triptano é contraindicado em doença coronariana, AVC/AIT, doença vascular periférica, HAS não controlada e enxaqueca hemiplégica ou de tronco.",
     "PS: dipirona 1 g EV + metoclopramida 10 mg EV lenta; cetoprofeno EV se sem contraindicação; dexametasona 10 mg EV contra a recorrência.",
     "Sem melhora em 1 h: sumatriptana 6 mg SC (se não usou triptano ou ergotamina em 24 h) ou clorpromazina EV após 500 mL de SF.",
     "Sulfato de magnésio EV: evidência modesta, mais útil na enxaqueca com aura; não usar opioides.",
     "Criança: ibuprofeno 10 mg/kg é a 1ª escolha; rizatriptano para ≥ 12 anos e ≥ 40 kg sem resposta (fora da bula brasileira).",
     "Gestante: paracetamol ± metoclopramida; evitar AINE após 20 semanas, ergotamina e valproato."
    ]
   },
   {
    "t": "Sinais de alarme e quando internar/encaminhar",
    "itens": [
     "Dor súbita e explosiva, febre com rigidez de nuca, déficit focal persistente, convulsão ou confusão: tratar como cefaleia secundária.",
     "Crise com mais de 72 h (estado de mal enxaquecoso) ou refratária no PS: internar e discutir com a neurologia.",
     "4 ou mais crises por mês, crises incapacitantes ou uso excessivo de analgésico: encaminhar para tratamento preventivo."
    ],
    "alerta": true
   },
   {
    "t": "Orientações ao paciente",
    "itens": [
     "Tome o remédio logo no começo da dor e descanse em lugar calmo e escuro.",
     "Não use remédio para dor de cabeça mais de 10 dias por mês e não junte sumatriptano com ergotamina.",
     "Evite jejum prolongado, falta de sono, álcool e excesso de cafeína; anote as crises num diário para levar à consulta.",
     "Volte imediatamente se a dor for súbita e a pior da vida, vier com febre e nuca dura, fraqueza, alteração da fala ou da visão, confusão ou convulsão."
    ]
   },
   {
    "t": "Outras opções (material do médico)",
    "itens": [
     "Ibuprofeno 600 mg na crise, até de 8/8 h por no máximo 7 dias (receita do próprio médico) — alternativa ao naproxeno; cuidado com estômago e rins.",
     "Combinações com di-hidroergotamina — já em Outras opções; menos eficazes que o triptano e não podem ser usadas em até 24 h do triptano."
    ],
    "offlabel": true
   }
  ],
  "pendencias": [
   "Material do Drive: naratriptano '1 cp/dia por 3 dias' (não é uso de crise) e repetição após 6 h; bula: repetir após ≥ 4 h, máximo 5 mg/dia (DATA correto).",
   "DATA Ambulatorial: ibuprofeno 300 mg 2 cp de 6/6 h por 5 dias (2,4 g/dia fixo); a receita do médico usa 600 mg de 8/8 h só na crise — decidir qual fica no Padrão (proposta enviada).",
   "DATA Outras opções 'Opção 2' a 'Opção 5' não dizem quando usar — rotular (ex.: 'sem triptano disponível', 'ergotamínico').",
   "Metoclopramida em criança: Enxaqueca pediátrica usa acima de 1 ano e Cefaleia pediátrica proíbe abaixo de 18 — unificar.",
   "'Migrânea na gestação' (Outras opções) usa paracetamol + codeína; opioide favorece cefaleia por uso excessivo — confirmar se mantém."
  ],
  "fontes": [
   "Ailani J et al. The American Headache Society Consensus Statement: Update on integrating new migraine treatments into clinical practice. Headache. 2021;61(7):1021-1039.",
   "Orr SL et al. Management of Adults With Acute Migraine in the Emergency Department: The American Headache Society Evidence Assessment of Parenteral Pharmacotherapies. Headache. 2016;56(6):911-940.",
   "Comitê ad hoc da Sociedade Brasileira de Cefaleia. Recommendations for the treatment of migraine attacks – a Brazilian consensus. Arq Neuropsiquiatr. 2016;74(3):262-271.",
   "Oskoui M et al. Practice guideline update summary: Acute treatment of migraine in children and adolescents. Neurology. 2019;93(11):487-499."
  ]
 },
 {
  "id": "crise_convulsiva",
  "tipo": "condicao",
  "cond": "crise_convulsiva",
  "nm": "Crise convulsiva",
  "sub": "estado de mal · benzodiazepínico · 2ª droga · glicemia · convulsão febril",
  "kw": "crise convulsiva convulsao crise epileptica epilepsia ataque estado de mal epileptico eme crise tonico clonica convulsao febril primeira crise pos ictal diazepam midazolam fenitoina levetiracetam fenobarbital valproato glicose tiamina hipoglicemia eclampsia",
  "draft": true,
  "revisado": null,
  "resumo": "Crise que dura 5 minutos ou mais, ou crises seguidas sem recuperar a consciência, é estado de mal: benzodiazepínico já, segunda droga EV se não parar e via aérea se refratária. Sempre medir a glicemia e procurar a causa; primeira crise exige investigação.",
  "secoes": [
   {
    "t": "Quando pensar / diagnóstico",
    "itens": [
     "Crise tônico-clônica por mais de 5 min, ou 2 crises sem recuperar a consciência entre elas = estado de mal epiléptico.",
     "Diferenciar de síncope convulsiva (curta, com palidez, recuperação rápida), crise psicogênica e hipoglicemia.",
     "Mordedura lateral da língua, perda de urina e confusão pós-ictal prolongada falam a favor de crise epiléptica.",
     "Causas: hipoglicemia, hiponatremia, abstinência de álcool ou de anticonvulsivante, intoxicação, TCE, AVC, infecção do SNC, eclâmpsia."
    ]
   },
   {
    "t": "Exame físico: o que procurar",
    "itens": [
     "Via aérea, SpO2, glicemia capilar imediata, temperatura e PA.",
     "Déficit focal após a crise (paresia de Todd), rigidez de nuca, sinais de trauma, mordedura de língua.",
     "Gestante ≥ 20 semanas ou puérpera: PA e proteinúria (eclâmpsia trata-se com sulfato de magnésio)."
    ]
   },
   {
    "t": "Exames complementares",
    "itens": [
     "Glicemia, sódio, cálcio, magnésio, função renal, hemograma e beta-hCG; nível sérico do anticonvulsivante se em uso.",
     "TC de crânio na primeira crise, crise com trauma, déficit focal, anticoagulante, febre, imunossupressão ou recuperação incompleta.",
     "Punção lombar se febre ou suspeita de infecção do SNC; EEG ambulatorial após a primeira crise."
    ]
   },
   {
    "t": "Conduta",
    "itens": [
     "Proteger de trauma, decúbito lateral, O2 e aspiração; não colocar nada na boca.",
     "Glicemia < 70: tiamina 100 mg EV (etilista ou desnutrido) e glicose 50% sem atrasar.",
     "Crise ≥ 5 min: diazepam 10 mg EV (0,2 mg/kg na criança) ou, sem acesso, midazolam IM; pode repetir 1 vez após 5 min.",
     "Persistiu: 2ª droga EV — levetiracetam 60 mg/kg ou fenitoína 20 mg/kg (máx. 1.500 mg); eficácia semelhante no estudo ESETT.",
     "Fenitoína só em SF, com monitor cardíaco, até 50 mg/min (idoso ou cardiopata 25 mg/min); evitar em bradicardia e BAV.",
     "Refratária à 2ª droga: fenobarbital EV ou intubação com midazolam ou propofol contínuo em UTI.",
     "Primeira crise única, recuperada, exames normais e sem causa aguda: alta com acompanhante e neurologia, sem anticonvulsivante de rotina.",
     "Convulsão febril simples (6 meses a 5 anos): tratar a febre e a causa; não precisa de exames de rotina nem de anticonvulsivante."
    ]
   },
   {
    "t": "Sinais de alarme e quando internar/encaminhar",
    "itens": [
     "Crise que não para com benzodiazepínico + 2ª droga, ou sem recuperar a consciência: UTI e via aérea definitiva.",
     "Febre com rigidez de nuca, petéquias ou rebaixamento: meningite/encefalite — antibiótico e aciclovir sem esperar exames.",
     "Déficit focal novo, TCE, uso de anticoagulante ou primeira crise após os 40 anos: TC urgente.",
     "Convulsão febril complexa (focal, > 15 min ou repetida em 24 h) ou criança < 6 meses: investigar e observar."
    ],
    "alerta": true
   },
   {
    "t": "Orientações ao paciente",
    "itens": [
     "Não dirija, não nade sozinho e evite altura e máquinas perigosas até a liberação do neurologista.",
     "Tome o anticonvulsivante todo dia no horário; não pare por conta própria e evite álcool e noites sem dormir.",
     "Durante uma crise: deite a pessoa de lado, afaste objetos, não coloque nada na boca e ligue 192 se passar de 5 minutos.",
     "Na convulsão febril, o antitérmico dá conforto mas não evita nova crise; a maioria das crianças não terá epilepsia."
    ]
   },
   {
    "t": "Outras opções (material do médico)",
    "itens": [
     "Fenitoína 1 g (4 ampolas em 80 mL de SF a 300 mL/h) — prescrição própria do médico; equivale a 15–20 mg/kg só entre 50 e 65 kg.",
     "Fenobarbital EV 15–20 mg/kg (criança 20 mg/kg, máx. 1.000 mg) — 3ª droga ou alternativa sem levetiracetam; depressão respiratória e hipotensão.",
     "Diazepam por via retal 0,5 mg/kg — criança sem acesso venoso e sem midazolam; usa a ampola injetável e é fora da bula abaixo de 2 anos."
    ],
    "offlabel": true
   }
  ],
  "pendencias": [
   "Principais condutas: 'diazepam 20 mg/kg' (erro grosseiro; é 0,2 mg/kg), diazepam IM, fenobarbital 10 mg/kg e bloqueador neuromuscular 'para convulsão' — não aproveitar.",
   "Tigers e Medicações Pediatria: ataque de fenitoína pediátrica de 5–10 mg/kg; o atual é 20 mg/kg — não aproveitar.",
   "Tigers propõe diazepam intermitente durante a febre na convulsão febril; a AAP não recomenda de rotina — não aproveitar.",
   "Valproato EV (opção da ACEP 2024) é pouco disponível no Brasil e não está no site — confirmar disponibilidade local.",
   "Diazepam retal: não há constante 'USO RETAL' entre as vias do site — decidir como prescrever antes de incluir.",
   "TCE do DATA usa fenitoína com teto de 2.000 mg; Crise convulsiva e Calculadoras usam 1.500 mg — unificar.",
   "DATA não tem modo Ambulatorial (alta após primeira crise ou convulsão febril) — decidir se cria orientações."
  ],
  "fontes": [
   "Glauser T et al. Evidence-Based Guideline: Treatment of Convulsive Status Epilepticus in Children and Adults: Report of the Guideline Committee of the American Epilepsy Society. Epilepsy Curr. 2016;16(1):48-61.",
   "American College of Emergency Physicians. Clinical Policy: Critical Issues in the Evaluation and Management of Adult Patients Presenting to the Emergency Department With Seizures. Ann Emerg Med. 2024;84(1).",
   "Kapur J et al. Randomized Trial of Three Anticonvulsant Medications for Status Epilepticus (ESETT). N Engl J Med. 2019;381(22):2103-2113.",
   "American Academy of Pediatrics, Subcommittee on Febrile Seizures. Febrile seizures: guideline for the neurodiagnostic evaluation of the child with a simple febrile seizure. Pediatrics. 2011;127(2):389-394."
  ]
 },
 {
  "id": "vertigem",
  "tipo": "condicao",
  "cond": "vertigem",
  "nm": "Vertigem e tontura",
  "sub": "VPPB · neurite vestibular · HINTS · AVC de fossa posterior · Epley",
  "kw": "vertigem tontura labirintite labirinto tontura rotatoria desequilibrio vppb vertigem posicional dix hallpike epley neurite vestibular meniere hints nistagmo avc de fossa posterior cerebelo dimenidrinato meclizina betaistina cinarizina flunarizina prometazina ondansetrona prednisona",
  "draft": true,
  "revisado": null,
  "resumo": "A tarefa no PS é separar a causa periférica benigna (VPPB, neurite, Ménière) do AVC de fossa posterior, que pode se apresentar só com tontura. O padrão de tempo e gatilho orienta o exame; a VPPB se trata com manobra, não com remédio, e o supressor vestibular é só por poucos dias.",
  "secoes": [
   {
    "t": "Quando pensar / diagnóstico",
    "itens": [
     "Classificar pelo tempo e pelo gatilho, não pela palavra 'tontura': contínua (síndrome vestibular aguda), episódica espontânea ou episódica desencadeada.",
     "Episódios de segundos ao virar na cama ou olhar para cima: VPPB, a causa mais comum de vertigem.",
     "Vertigem contínua por dias, com náusea e nistagmo, sem outro déficit: neurite vestibular — ou AVC de fossa posterior.",
     "Crises de horas com zumbido, plenitude e perda auditiva flutuante: Ménière; perda auditiva súbita é urgência otológica.",
     "Pré-síncope ou desequilíbrio sem rotação: pensar em hipotensão ortostática, arritmia, anemia, desidratação e remédios."
    ]
   },
   {
    "t": "Exame físico: o que procurar",
    "itens": [
     "Nistagmo espontâneo e do olhar: o periférico é horizontal-torcional, bate para um só lado e diminui ao fixar o olhar.",
     "HINTS (em Escores), só por quem é treinado e só com nistagmo: impulso cefálico normal, nistagmo que muda de direção ou skew = central.",
     "Marcha: não conseguir ficar de pé ou andar sem apoio sugere causa central; testar a audição (fricção dos dedos).",
     "Dix-Hallpike na tontura desencadeada pela posição; pares cranianos, dismetria, disartria, diplopia e síndrome de Horner."
    ]
   },
   {
    "t": "Exames complementares",
    "itens": [
     "VPPB e neurite típicas não precisam de exame.",
     "TC de crânio não exclui AVC de fossa posterior; se HINTS central ou duvidoso, RM com difusão.",
     "ECG, glicemia e hemograma na tontura não vertiginosa ou com síncope; PA deitado e em pé."
    ]
   },
   {
    "t": "Conduta",
    "itens": [
     "VPPB de canal posterior: manobra de Epley (pode ensinar o paciente a repetir); remédio não trata VPPB.",
     "Supressor vestibular ou antiemético (dimenidrinato, meclizina) só nas crises e por no máximo 3 dias.",
     "No PS, se vômitos ou crise intensa: dimenidrinato EV e/ou ondansetrona EV; hidratar se desidratado.",
     "Neurite vestibular: corticoide curto pode ser oferecido nos 3 primeiros dias (evidência muito baixa); decidir junto com o paciente.",
     "Ménière: antiemético na crise; betaistina e restrição de sal ficam para o seguimento com otorrino.",
     "Reabilitação vestibular se a tontura persistir após 2 semanas."
    ]
   },
   {
    "t": "Sinais de alarme e quando internar/encaminhar",
    "itens": [
     "Déficit focal, disartria, diplopia, ataxia de tronco, cefaleia súbita ou dor cervical intensa: AVC ou dissecção — neuroimagem urgente.",
     "HINTS central, incapacidade de andar ou fatores de risco vascular com vertigem contínua: RM e neurologia.",
     "Perda auditiva súbita: otorrino em 24–72 h (corticoide precoce).",
     "Tontura com síncope, dor torácica ou palpitação: investigar causa cardíaca."
    ],
    "alerta": true
   },
   {
    "t": "Orientações ao paciente",
    "itens": [
     "Use o remédio para tontura só nas crises e por até 3 dias: o uso prolongado atrasa a recuperação do equilíbrio.",
     "Movimente a cabeça aos poucos assim que conseguir; não dirija nem suba em lugares altos enquanto estiver tonto.",
     "Volte imediatamente se fraqueza ou dormência no rosto, braço ou perna, fala enrolada, visão dupla, dificuldade para andar ou dor de cabeça súbita."
    ]
   },
   {
    "t": "Outras opções (material do médico)",
    "itens": [
     "Dimenidrinato EV (ampola de 30 mg) ± ondansetrona EV — crise com vômitos no PS; dá sonolência; dimenidrinato é contraindicado na intolerância à frutose.",
     "Prometazina 25–50 mg IM — crise intensa que não melhora; muito sedativa, evitar em idoso."
    ],
    "offlabel": true
   }
  ],
  "pendencias": [
   "Plantão Rápido diz que a neurite vestibular é a causa mais comum de vertigem; a mais comum é a VPPB — não aproveitar a frase.",
   "Tigers e Principais condutas usam cinarizina e flunarizina por 30 dias e betaistina 8 mg; as diretrizes limitam o supressor a poucos dias — não aproveitar.",
   "DATA Outras opções 'Opção 1' (esquema de Ménière) e 'Opção 2' (neurite, com prednisona 40 mg/dia) não dizem a indicação — rotular.",
   "Prednisona 20 mg 12/12 h por 5 dias (Plantão Rápido, neurite) é dose menor que a dos estudos — decidir dose ou retirar.",
   "Vertigem não tem modo Internação no DATA — propostas de dimenidrinato EV, ondansetrona EV e prometazina IM enviadas.",
   "HINTS só é confiável com treinamento (GRACE-3); confirmar se o serviço tem RM para os casos duvidosos."
  ],
  "fontes": [
   "Edlow JA et al. Guidelines for reasonable and appropriate care in the emergency department 3 (GRACE-3): Acute dizziness and vertigo in the emergency department. Acad Emerg Med. 2023;30(5):442-486.",
   "Bhattacharyya N et al. Clinical Practice Guideline: Benign Paroxysmal Positional Vertigo (Update). Otolaryngol Head Neck Surg. 2017;156(3_suppl):S1-S47.",
   "Kattah JC et al. HINTS to diagnose stroke in the acute vestibular syndrome. Stroke. 2009;40(11):3504-3510."
  ]
 },
 {
  "id": "paralisia_facial",
  "tipo": "condicao",
  "cond": "paralisia_facial",
  "nm": "Paralisia facial periférica (Bell)",
  "sub": "Bell · corticoide em 72 h · proteção ocular · Ramsay Hunt",
  "kw": "paralisia facial periferica paralisia de bell boca torta rosto torto desvio de rima nervo facial ramsay hunt herpes zoster otico prednisona prednisolona valaciclovir aciclovir lagrima artificial carmelose dexpantenol oclusao ocular avc",
  "draft": true,
  "revisado": null,
  "resumo": "Paralisia de toda a hemiface (inclusive a testa), instalada em até 72 h e sem outro déficit, é paralisia de Bell. Corticoide nas primeiras 72 h e proteção do olho são a conduta; antes, afastar AVC (que poupa a testa) e outras causas.",
  "secoes": [
   {
    "t": "Quando pensar / diagnóstico",
    "itens": [
     "Fraqueza de toda a hemiface (não franze a testa, não fecha o olho), instalada em horas até 72 h.",
     "Pode haver dor atrás da orelha, alteração do paladar e sensibilidade a sons do mesmo lado.",
     "Testa poupada (consegue franzir) = paralisia central: avaliar como AVC.",
     "Vesículas no pavilhão ou no conduto, dor intensa, vertigem ou perda auditiva: síndrome de Ramsay Hunt (zoster).",
     "Bilateral, recorrente, progressiva por mais de 3 semanas ou com outros nervos: não é Bell — investigar (Guillain-Barré, tumor, Lyme, sarcoidose)."
    ]
   },
   {
    "t": "Exame físico: o que procurar",
    "itens": [
     "Testar testa, fechamento do olho (sinal de Bell), sorriso e assobio; graduar a paralisia (House-Brackmann).",
     "Otoscopia e pavilhão (vesículas, otite, colesteatoma) e palpação da parótida (massa).",
     "Exame neurológico completo: outros pares cranianos, força, sensibilidade e marcha.",
     "Córnea: olho que não fecha, vermelho ou doloroso tem risco de úlcera de exposição."
    ]
   },
   {
    "t": "Exames complementares",
    "itens": [
     "Bell típico não precisa de laboratório nem de imagem no PS.",
     "Glicemia se diabetes provável (vai usar corticoide); imagem se quadro atípico, outros déficits ou sem melhora em 3 meses."
    ]
   },
   {
    "t": "Conduta",
    "itens": [
     "Prednisona 60 mg/dia por 5 dias com redução em 5 dias (ou prednisolona 50 mg/dia por 10 dias), iniciada em até 72 h.",
     "Antiviral sozinho não; associar valaciclovir ao corticoide é opção na paralisia grave ou completa.",
     "Ramsay Hunt: aciclovir ou valaciclovir em dose de zoster junto com o corticoide.",
     "Proteger o olho sempre que não fecha: lágrima artificial de dia, gel ou pomada e oclusão à noite, óculos.",
     "Diabético: monitorizar a glicemia; gestante: o corticoide pode ser usado, decidir com o obstetra.",
     "Criança: a recuperação espontânea é a regra; o estudo controlado não mostrou benefício significativo da prednisolona.",
     "Reavaliar em 1–2 semanas; sem recuperação completa em 3 meses, encaminhar à neurologia ou otorrino."
    ]
   },
   {
    "t": "Sinais de alarme e quando internar/encaminhar",
    "itens": [
     "Testa poupada, outro déficit focal, disartria ou ataxia: AVC — protocolo de AVC.",
     "Olho vermelho, doloroso ou com baixa da visão: oftalmologia (úlcera de córnea).",
     "Paralisia bilateral, progressiva ou com fraqueza nos membros: investigar internado.",
     "Massa na parótida, otorreia ou colesteatoma: otorrino (causa secundária)."
    ],
    "alerta": true
   },
   {
    "t": "Orientações ao paciente",
    "itens": [
     "Comece o corticoide hoje; a maioria das pessoas recupera o movimento do rosto em semanas a poucos meses.",
     "Proteja o olho: colírio lubrificante várias vezes ao dia, óculos de dia e pálpebra fechada com fita à noite.",
     "Faça exercícios do rosto (caretas, biquinho, assoprar, fechar os olhos com força); procure fisioterapia ou fono se tiver dificuldade.",
     "Volte imediatamente se fraqueza no braço ou na perna, fala enrolada, visão dupla, bolhas na orelha, dor ou vermelhidão no olho."
    ]
   }
  ],
  "pendencias": [
   "Plantãozinho e Plantão Rápido usam prednisona 40 mg/dia (20 mg 12/12 h por 5 dias); a diretriz usa 60 mg/dia por 5 dias + redução (Padrão do DATA correto); as Outras opções do DATA ainda têm a dose menor — revisar.",
   "DATA Outras opções 'Opção 2' (aciclovir 800 mg 5x/dia) é o esquema da Ramsay Hunt — renomear para deixar a indicação clara.",
   "Lágrima artificial 'de 30/30 min' (Plantão Rápido) × 'de 2/2 h' (Padrão) — escolher uma.",
   "DATA não tem bloco pediátrico; a diretriz da AAO-HNS vale a partir de 16 anos e o ensaio pediátrico (Babl 2022) não mostrou benefício significativo — decidir se cria orientação pediátrica."
  ],
  "fontes": [
   "Baugh RF et al. Clinical Practice Guideline: Bell's Palsy. Otolaryngol Head Neck Surg. 2013;149(3 Suppl):S1-S27.",
   "Gronseth GS, Paduga R. Evidence-based guideline update: steroids and antivirals for Bell palsy. Neurology. 2012;79(22):2209-2213.",
   "Babl FE et al. Efficacy of Prednisolone for Bell Palsy in Children: A Randomized, Double-Blind, Placebo-Controlled, Multicenter Trial. Neurology. 2022;99(20)."
  ]
 },
 {
  "id": "tce",
  "tipo": "condicao",
  "cond": "tce",
  "nm": "TCE — traumatismo cranioencefálico",
  "sub": "Glasgow · regra canadense · PECARN · anticoagulante · observação",
  "kw": "tce traumatismo cranioencefalico trauma craniano trauma de cranio pancada na cabeca batida na cabeca queda concussao glasgow regra canadense tc de cranio pecarn anticoagulante antiagregante hematoma epidural subdural observacao neurologica vomitos amnesia convulsao fenitoina levetiracetam manitol salina hipertonica maus tratos",
  "draft": true,
  "revisado": null,
  "resumo": "TCE leve (Glasgow 13–15) é a maioria: a decisão é quem precisa de TC (regra canadense no adulto, PECARN na criança) e quem vai para casa com orientação e acompanhante. Moderado e grave exigem via aérea, evitar hipóxia e hipotensão, TC urgente e neurocirurgia.",
  "secoes": [
   {
    "t": "Quando pensar / diagnóstico",
    "itens": [
     "Classificar pelo Glasgow após a reanimação: leve 13–15, moderado 9–12, grave 3–8 (Glasgow em Escores).",
     "Perguntar mecanismo, perda de consciência, amnésia, cefaleia, vômitos, convulsão, álcool ou drogas e uso de anticoagulante ou antiagregante.",
     "Idoso e anticoagulado sangram com trauma pequeno; o hematoma subdural pode piorar em horas a dias.",
     "Lactente com hematoma não frontal, mecanismo incompatível ou demora para procurar atendimento: suspeitar de maus-tratos."
    ]
   },
   {
    "t": "Exame físico: o que procurar",
    "itens": [
     "xABCDE e coluna cervical (NEXUS e canadense cervical em Escores) antes do crânio.",
     "Glasgow, pupilas (tamanho e reação) e força nos 4 membros, repetidos de forma seriada.",
     "Sinais de fratura de base: olhos de guaxinim, sinal de Battle, otorragia, rinorreia ou otorreia clara, hemotímpano.",
     "Couro cabeludo: ferimento, afundamento; no lactente, fontanela abaulada."
    ]
   },
   {
    "t": "Exames complementares",
    "itens": [
     "Adulto com Glasgow 13–15, regra canadense (em Escores) de alto risco: Glasgow < 15 em 2 h, suspeita de fratura, 2 ou mais vômitos, 65 anos ou mais.",
     "Regra canadense de médio risco: amnésia de mais de 30 min antes do trauma ou mecanismo perigoso — também indica TC.",
     "Criança: PECARN (em Escores); no risco intermediário, observar 4–6 h é alternativa à TC.",
     "Anticoagulante ou antiagregante (exceto AAS isolado) sem outra indicação: considerar TC em até 8 h do trauma (NICE 2023).",
     "Moderado ou grave: TC de crânio e coluna cervical urgentes, glicemia, hemograma, coagulograma e tipagem."
    ]
   },
   {
    "t": "Conduta",
    "itens": [
     "Leve com TC normal ou sem indicação de TC: alta com adulto responsável por 24 h e orientação escrita.",
     "Em observação: Glasgow, pupilas e sinais vitais seriados; cabeceira a 30°; evitar sedativos e opioides.",
     "Anticoagulado com sangramento intracraniano: reverter a anticoagulação e acionar a neurocirurgia.",
     "Grave: intubar se Glasgow ≤ 8; manter SpO2 ≥ 94%, PAS ≥ 100–110 e normocapnia — hipóxia e hipotensão dobram a mortalidade.",
     "Sinais de herniação: cabeceira a 30°, salina hipertônica ou manitol até a neurocirurgia; hiperventilação só como ponte breve.",
     "Profilaxia de crise por 7 dias no TCE moderado ou grave com lesão na TC (fenitoína ou levetiracetam).",
     "Ferimento: limpeza, sutura e vacina antitetânica conforme o histórico vacinal."
    ]
   },
   {
    "t": "Sinais de alarme e quando internar/encaminhar",
    "itens": [
     "Queda de 1 ponto ou mais no Glasgow, anisocoria, déficit focal novo, convulsão ou bradicardia com hipertensão: TC urgente e neurocirurgia.",
     "Cefaleia que piora, vômitos repetidos, sonolência ou agitação crescente durante a observação.",
     "Rinorreia ou otorreia clara (fístula liquórica), afundamento de crânio ou ferimento penetrante."
    ],
    "alerta": true
   },
   {
    "t": "Orientações ao paciente",
    "itens": [
     "Fique com um adulto responsável nas primeiras 24 horas; não beba álcool, não tome calmante e não dirija até melhorar.",
     "Dor de cabeça leve, tontura, cansaço e dificuldade de concentração podem durar semanas; volte às atividades aos poucos e evite esporte de contato até a liberação.",
     "Volte imediatamente se sonolência ou dificuldade para acordar, confusão, dor de cabeça que piora ou vômitos repetidos.",
     "Volte também se convulsão, fraqueza, alteração da fala ou da visão, ou saída de líquido ou sangue pelo nariz ou ouvido."
    ]
   }
  ],
  "pendencias": [
   "DATA diz 'em uso de anticoagulante: TC em até 8 h mesmo sem outros fatores'; o NICE 2023 passou a 'considerar' TC em 8 h e incluiu antiagregantes (exceto AAS isolado) — decidir a regra.",
   "TCE do DATA usa fenitoína com teto de 2.000 mg; Crise convulsiva e Calculadoras usam 1.500 mg — unificar.",
   "Folha de orientações pós-TCE do Plantão Rápido (17 sinais) cita um hospital de outro estado e manda acordar o paciente 2–3 vezes à noite — adaptar ao serviço e decidir se mantém o despertar.",
   "Tigers (protocolo do trauma) usa o ABCDE do ATLS antigo; o ATLS 11 (2025) usa xABCDE.",
   "DATA Outras opções 'Receita' (clorexidina spray) tem orientação cortada ('RETORNAR À EMERGÊNCIA EM CASO DE:') — completar ou retirar."
  ],
  "fontes": [
   "National Institute for Health and Care Excellence (NICE). Head injury: assessment and early management (NG232). 2023.",
   "Stiell IG et al. The Canadian CT Head Rule for patients with minor head injury. Lancet. 2001;357(9266):1391-1396.",
   "Kuppermann N et al. Identification of children at very low risk of clinically-important brain injuries after head trauma: a prospective cohort study. Lancet. 2009;374(9696):1160-1170.",
   "Carney N et al. Guidelines for the Management of Severe Traumatic Brain Injury, Fourth Edition. Neurosurgery. 2017;80(1):6-15."
  ]
 },
 {
  "id": "agitacao_psicomotora",
  "tipo": "condicao",
  "cond": "agitacao_psicomotora",
  "nm": "Agitação psicomotora / intoxicação alcoólica aguda",
  "sub": "desescalada · causa orgânica · haloperidol + prometazina · contenção",
  "kw": "agitacao psicomotora paciente agitado agressivo violento surto psicotico mania delirium contencao quimica contencao mecanica desescalada verbal intoxicacao alcoolica embriaguez bebado alcoolizado coma alcoolico cocaina estimulante haloperidol prometazina midazolam risperidona cetamina tiamina glicose",
  "draft": true,
  "revisado": null,
  "resumo": "Agitação é sintoma: primeiro segurança da equipe e desescalada verbal, depois procurar causa orgânica (hipoglicemia, hipóxia, intoxicação, abstinência, delirium). Medicar de preferência por via oral; IM quando não colabora; contenção mecânica é o último recurso, sempre com monitorização.",
  "secoes": [
   {
    "t": "Quando pensar / diagnóstico",
    "itens": [
     "Graduar: inquieto e colaborativo (oferecer VO), agitado sem colaborar (IM), violento com risco iminente (contenção + IM).",
     "Agitação nova tem causa orgânica até prova em contrário: hipoglicemia, hipóxia, sepse, TCE, AVC, intoxicação ou abstinência.",
     "Delirium: início agudo, desatenção e flutuação ao longo do dia; comum em idoso com infecção ou remédio novo.",
     "Intoxicação alcoólica: hálito, ataxia e fala arrastada — mas não atribuir rebaixamento ao álcool sem afastar TCE e hipoglicemia."
    ]
   },
   {
    "t": "Exame físico: o que procurar",
    "itens": [
     "Sinais vitais, SpO2, glicemia capilar e temperatura assim que for seguro.",
     "Pupilas (miose: opioide; midríase: estimulante ou anticolinérgico), sudorese, tremor e sinais de trauma.",
     "Rigidez de nuca, déficit focal e Glasgow; reexaminar depois que o paciente acalmar."
    ]
   },
   {
    "t": "Exames complementares",
    "itens": [
     "Glicemia sempre; eletrólitos, função renal, CK, ECG (QTc) e exame toxicológico conforme o caso.",
     "TC de crânio se trauma, déficit focal, primeiro episódio no idoso ou rebaixamento que não melhora.",
     "Etilista: lembrar hipoglicemia, encefalopatia de Wernicke, TCE oculto e hemorragia digestiva."
    ]
   },
   {
    "t": "Conduta",
    "itens": [
     "Desescalada verbal: ambiente calmo, uma só pessoa falando, tom baixo, oferecer escolhas, água e comida; equipe suficiente por perto.",
     "Colaborativo: haloperidol 5 mg VO ou risperidona 2 mg VO.",
     "Sem colaboração: haloperidol 5 mg + prometazina 50 mg IM (idoso: haloperidol 2,5 mg); midazolam IM se estimulante ou abstinência.",
     "Evitar benzodiazepínico se intoxicação por álcool ou outro depressor (soma depressão respiratória).",
     "Contenção mecânica só como último recurso, por equipe treinada, com registro, revisão frequente e monitorização.",
     "Monitorizar SpO2, FR, PA e nível de consciência após cada dose; ECG se cardiopatia ou várias doses de antipsicótico.",
     "Intoxicação alcoólica: decúbito lateral, glicemia e tiamina antes da glicose; soro EV não acelera a eliminação do álcool."
    ]
   },
   {
    "t": "Sinais de alarme e quando internar/encaminhar",
    "itens": [
     "Febre, rigidez muscular e rebaixamento após antipsicótico: síndrome neuroléptica maligna.",
     "Hipertermia, taquicardia e agitação extrema (estimulante, delirium hiperativo): risco de morte súbita — sedação, resfriamento e sala de emergência.",
     "Rebaixamento que não melhora em poucas horas no paciente alcoolizado: TC e procurar outra causa.",
     "Distonia aguda ou acatisia após haloperidol: biperideno ou difenidramina."
    ],
    "alerta": true
   },
   {
    "t": "Orientações ao paciente",
    "itens": [
     "Ao acompanhante: não deixe o paciente sozinho nas próximas horas e afaste álcool e drogas.",
     "Procure o CAPS ou a unidade de saúde para acompanhar o uso de álcool ou o problema de saúde mental.",
     "Volte se houver nova agitação, confusão, febre, rigidez do corpo ou sonolência excessiva."
    ]
   }
  ],
  "pendencias": [
   "Principais condutas: haloperidol 5 mg IM 'a cada 5 minutos até 80 mg' e haloperidol 5 mg EV dobrando no idoso — inseguros, não aproveitar.",
   "Plantão Rápido traz cetamina 4–5 mg/kg IM; a política da ACEP 2024 não faz recomendação formal (evidência fraca) — decidir se entra só para sala de emergência.",
   "Faixa de midazolam IM: DATA 7,5–15 mg; Plantão Rápido 2,5–5 mg — definir dose por idade e por intoxicação associada.",
   "Plantãozinho: glicose 50% '6–10 ampolas' e soro glicosado antes da tiamina na intoxicação alcoólica — não aproveitar.",
   "Complexo B IM e SG 5% + metoclopramida EV de rotina (Drive) não têm benefício demonstrado — não propostos."
  ],
  "fontes": [
   "Baldaçara L et al. Brazilian guidelines for the management of psychomotor agitation. Part 1. Non-pharmacological approach. Braz J Psychiatry. 2019;41(2):153-167.",
   "Baldaçara L et al. Brazilian guidelines for the management of psychomotor agitation. Part 2. Pharmacological approach. Braz J Psychiatry. 2019;41(4):324-335.",
   "American College of Emergency Physicians. Clinical Policy: Critical Issues in the Evaluation and Management of Adult Out-of-Hospital or Emergency Department Patients Presenting With Severe Agitation. Ann Emerg Med. 2024;83(1):e1-e30.",
   "TREC Collaborative Group. Rapid tranquillisation for agitated patients in emergency psychiatric rooms: a randomised trial of midazolam versus haloperidol plus promethazine. BMJ. 2003;327(7417):708-713."
  ]
 },
 {
  "id": "abstinencia",
  "tipo": "condicao",
  "cond": "abstinencia",
  "nm": "Abstinência alcoólica",
  "sub": "CIWA-Ar · benzodiazepínico · tiamina · delirium tremens · Wernicke",
  "kw": "abstinencia alcoolica sindrome de abstinencia alcoolica saa alcool etilismo parou de beber tremor alucinose delirium tremens convulsao alcoolica wernicke ciwa ar diazepam lorazepam fenobarbital tiamina acido folico magnesio glicose carbamazepina caps ad naltrexona acamprosato",
  "draft": true,
  "revisado": null,
  "resumo": "Começa 6–24 h após a última dose e pode evoluir para convulsão e delirium tremens. Gradue pela CIWA-Ar e pelos fatores de risco: casos leves sem risco podem ser tratados em casa com acompanhante; em todos, benzodiazepínico guiado por sintomas e tiamina antes da glicose.",
  "secoes": [
   {
    "t": "Quando pensar / diagnóstico",
    "itens": [
     "Tremor, sudorese, taquicardia, ansiedade, náusea e insônia 6–24 h após parar ou reduzir o álcool.",
     "Convulsões em 12–48 h; alucinose com consciência preservada; delirium tremens em 48–96 h (confusão, agitação, febre, instabilidade autonômica).",
     "CIWA-Ar (em Escores): < 10 leve, 10–18 moderada, ≥ 19 grave.",
     "Wernicke (critérios de Caine, 2 de 4): desnutrição, alteração oculomotora, ataxia e confusão — tratar na suspeita."
    ]
   },
   {
    "t": "Exame físico: o que procurar",
    "itens": [
     "Sinais vitais, temperatura, glicemia capilar, hidratação, nível de consciência e orientação.",
     "Nistagmo, oftalmoparesia e ataxia (Wernicke); sinais de hepatopatia, sangramento digestivo e trauma.",
     "Procurar infecção (pneumonia, peritonite bacteriana espontânea) e TCE, que precipitam ou imitam a abstinência."
    ]
   },
   {
    "t": "Exames complementares",
    "itens": [
     "Glicemia, sódio, potássio, magnésio, fósforo, função renal e hepática e hemograma; CK se agitação intensa.",
     "TC de crânio se convulsão nova, focal ou com trauma; ECG se arritmia ou antes de haloperidol."
    ]
   },
   {
    "t": "Conduta",
    "itens": [
     "Tiamina antes ou junto da glicose em todos; na suspeita de Wernicke, dose alta EV (500 mg de 8/8 h).",
     "Benzodiazepínico é o tratamento: diazepam guiado pela CIWA-Ar (≥ 10), reavaliando de hora em hora.",
     "Hepatopatia grave, idoso ou DPOC grave: lorazepam VO (não há forma injetável no Brasil).",
     "Ambulatorial se CIWA-Ar < 10 (ou 10–18 sem fatores de risco), com acompanhante e retorno em 24–48 h; diazepam em doses decrescentes por poucos dias.",
     "Internar se CIWA-Ar ≥ 19, convulsão ou delirium tremens prévios, comorbidade grave, sem acompanhante ou sem via oral.",
     "Delirium tremens refratário: fenobarbital EV em UTI; haloperidol só como adjuvante, nunca no lugar do benzodiazepínico.",
     "Fenitoína não trata convulsão de abstinência; corrigir magnésio e potássio.",
     "Encaminhar ao CAPS AD; o tratamento do uso de álcool (naltrexona, acamprosato) é feito no seguimento."
    ]
   },
   {
    "t": "Sinais de alarme e quando internar/encaminhar",
    "itens": [
     "Delirium tremens, convulsões repetidas, hipertermia ou instabilidade hemodinâmica: UTI.",
     "Necessidade de diazepam > 50 mg na 1ª hora ou > 200 mg em 3 h: abstinência grave e refratária.",
     "Confusão com ataxia ou alteração dos movimentos oculares: Wernicke — tiamina EV imediata.",
     "Rebaixamento ou depressão respiratória com o benzodiazepínico: suspender as doses e monitorizar."
    ],
    "alerta": true
   },
   {
    "t": "Orientações ao paciente",
    "itens": [
     "Não beba junto com o calmante (risco de parar de respirar) e não dirija durante o tratamento.",
     "O remédio deve ficar com um familiar, que deve acompanhar o paciente nos primeiros dias.",
     "Volte imediatamente se tremor forte, confusão, alucinações, convulsão, febre ou sonolência excessiva.",
     "Procure o CAPS AD ou a unidade de saúde para tratar o uso de álcool."
    ]
   },
   {
    "t": "Outras opções (material do médico)",
    "itens": [
     "Ácido fólico 5 mg/dia por 30 dias — etilista desnutrido (o Plantão Rápido associa tiamina, complexo B e ácido fólico).",
     "Carbamazepina VO — alternativa na abstinência leve a moderada ambulatorial (já em Outras opções); a dose do material é menor que a dos estudos."
    ],
    "offlabel": true
   }
  ],
  "pendencias": [
   "Plantão Rápido usa CIWA-Ar < 15 em casa e > 15 internar; ASAM 2020 usa < 10 leve, 10–18 moderada e fatores de risco — decidir o corte.",
   "DATA Outras opções 'Conduta ideal', 'Opção 1' e 'Opção 2' mantêm diazepam por 20 dias + antidepressivo; benzodiazepínico prolongado não é recomendado e antidepressivo não trata o uso de álcool — revisar.",
   "Plantão Rápido diz 'não fazer haloperidol'; o DATA o usa só como adjuvante no delirium tremens (compatível com a ASAM) — confirmar.",
   "Principais condutas: diazepam '1/1 h' fixo sem guia de sintomas — o DATA já usa a CIWA-Ar (manter).",
   "Carbamazepina 200 mg 12/12 h (Plantão Rápido) é dose baixa; a ASAM usa doses maiores em esquema decrescente — decidir."
  ],
  "fontes": [
   "American Society of Addiction Medicine. The ASAM Clinical Practice Guideline on Alcohol Withdrawal Management. J Addict Med. 2020;14(3S Suppl 1):1-72.",
   "Sullivan JT et al. Assessment of alcohol withdrawal: the revised Clinical Institute Withdrawal Assessment for Alcohol scale (CIWA-Ar). Br J Addict. 1989;84(11):1353-1357.",
   "Caine D et al. Operational criteria for the classification of chronic alcoholics: identification of Wernicke's encephalopathy. J Neurol Neurosurg Psychiatry. 1997;62(1):51-60.",
   "National Institute for Health and Care Excellence (NICE). Alcohol-use disorders: diagnosis and management of physical complications (CG100). 2010, atualizada em 2017."
  ]
 },
 {
  "id": "hiperglicemia",
  "tipo": "condicao",
  "cond": "hiperglicemia",
  "nm": "Hiperglicemia e hipoglicemia",
  "sub": "hipoglicemia · cetoacidose · estado hiperosmolar · potássio · insulina",
  "kw": "hiperglicemia hipoglicemia glicose alta glicose baixa acucar alto acucar baixo diabetes descompensado cetoacidose diabetica cad estado hiperosmolar ehh cetonas kussmaul poliuria polidipsia glicose 50 glucagon insulina regular insulina nph potassio soro fisiologico bicarbonato metformina sulfonilureia isglt2",
  "draft": true,
  "revisado": null,
  "resumo": "Hipoglicemia (< 70 mg/dL) trata-se na hora: VO se acordado, glicose EV ou glucagon se não. Na hiperglicemia, a pergunta é se há crise (cetoacidose ou estado hiperosmolar): hidratação, potássio antes da insulina e insulina EV em bomba; hiperglicemia assintomática não se trata com insulina no PS.",
  "secoes": [
   {
    "t": "Quando pensar / diagnóstico",
    "itens": [
     "Hipoglicemia: < 70 mg/dL (nível 1), < 54 mg/dL (nível 2) ou alteração mental que exige ajuda (grave); tremor, sudorese, fome, confusão, convulsão.",
     "Cetoacidose (ADA 2024): glicemia ≥ 200 ou diabetes conhecido, cetonemia ≥ 3 mmol/L ou cetonúria ≥ 2+, pH < 7,3 e/ou bicarbonato < 18.",
     "Estado hiperosmolar: glicemia ≥ 600, osmolalidade efetiva > 300, pH ≥ 7,3, bicarbonato ≥ 15 e pouca cetose; idoso desidratado e confuso.",
     "Cetoacidose euglicêmica: glicemia normal ou pouco alta em quem usa iSGLT2 (dapagliflozina, empagliflozina), na gestante ou no jejum.",
     "Precipitantes: infecção, falta da insulina, IAM, AVC, pancreatite, corticoide e álcool."
    ]
   },
   {
    "t": "Exame físico: o que procurar",
    "itens": [
     "Desidratação, respiração de Kussmaul, hálito cetônico e dor abdominal (a cetoacidose pode imitar abdome agudo).",
     "Nível de consciência, sinais focais e convulsão (estado hiperosmolar); procurar o foco infeccioso."
    ]
   },
   {
    "t": "Exames complementares",
    "itens": [
     "Glicemia, gasometria venosa, cetonemia (ou cetonúria), sódio, potássio, cloro, ureia, creatinina, fósforo, hemograma e ECG.",
     "Calcular ânion gap, sódio corrigido e osmolalidade efetiva (2 × Na + glicose/18).",
     "Procurar o precipitante: urina I, RX de tórax, troponina, culturas e beta-hCG."
    ]
   },
   {
    "t": "Conduta",
    "itens": [
     "Hipoglicemia acordado: 15–20 g de açúcar VO, medir de novo em 15 min e repetir se preciso; depois um lanche.",
     "Sem via oral: glicose 50% 20–25 g EV (tiamina antes ou junto no etilista) ou glucagon 1 mg IM se sem acesso.",
     "Hipoglicemia por sulfonilureia ou insulina de ação longa: observar 12–24 h com soro glicosado e glicemias seriadas.",
     "Crise hiperglicêmica: SF 0,9% 1.000 mL (15–20 mL/kg) na 1ª hora; depois conforme sódio corrigido, diurese e volemia.",
     "Potássio antes da insulina: < 3,5 repor e segurar a insulina; 3,5–5,0 repor no soro; > 5,0 não repor.",
     "Insulina regular EV em bomba (Calculadoras); acrescentar soro glicosado quando a glicemia chegar a 250 e manter até fechar o ânion gap.",
     "Transição: insulina SC basal 1–2 h antes de desligar a bomba, com a crise resolvida e o paciente comendo.",
     "Hiperglicemia sem crise: ajustar o remédio oral, metformina no DM2 recente e retorno à UBS em até 7 dias; não fazer insulina 'avulsa'."
    ]
   },
   {
    "t": "Sinais de alarme e quando internar/encaminhar",
    "itens": [
     "Cetoacidose moderada ou grave (pH < 7,25), estado hiperosmolar, rebaixamento ou potássio < 3,5 ou > 6: sala de emergência ou UTI.",
     "Hipoglicemia que não corrige ou volta, ou causada por sulfonilureia: não dar alta.",
     "Criança com cetoacidose: protocolo pediátrico próprio (volume mais lento, sem bolus de insulina); cefaleia, bradicardia ou queda da consciência = edema cerebral."
    ],
    "alerta": true
   },
   {
    "t": "Orientações ao paciente",
    "itens": [
     "Se tremor, suor frio, fome ou confusão e estiver acordado: tome 1 copo de suco ou refrigerante comum (não diet) e meça de novo em 15 minutos.",
     "Não pule refeições enquanto usa insulina ou remédio que baixa o açúcar; leve sempre um doce consigo.",
     "Marque consulta na unidade de saúde em até 7 dias para ajustar o tratamento do diabetes.",
     "Volte imediatamente se glicose acima de 300 com vômitos, dor na barriga, respiração rápida, muita sede, sonolência ou confusão."
    ]
   }
  ],
  "pendencias": [
   "Plantãozinho e Principais condutas trazem escala de insulina SC (Repick) e insulina regular 10 U 'avulsa' SC ou IM; escala isolada é desaconselhada — não aproveitar.",
   "Guia de Bolso Trabiju segura a insulina com K < 3,3 (ADA 2009); o DATA usa 3,5 (consenso ADA 2024) — manter 3,5.",
   "Bicarbonato: Guia de Bolso e Plantão Rápido usam pH < 6,9; confirmar o corte do consenso ADA 2024 (6,9 ou 7,0) antes de incluir.",
   "Glicose 50% na hipoglicemia: DATA 20 g (40 mL), Calculadoras 25 g (50 mL), Drive 3–4 ampolas — unificar.",
   "DATA não tem bloco pediátrico de cetoacidose (ISPAD 2022) nem a transição para insulina SC (NPH no Plantãozinho) — decidir se cria."
  ],
  "fontes": [
   "Umpierrez GE et al. Hyperglycemic Crises in Adults With Diabetes: A Consensus Report. Diabetes Care. 2024;47(8):1257-1275.",
   "American Diabetes Association Professional Practice Committee. Standards of Care in Diabetes—2025. Diabetes Care. 2025;48(Suppl 1).",
   "Glaser N et al. ISPAD Clinical Practice Consensus Guidelines 2022: Diabetic ketoacidosis and hyperglycemic hyperosmolar state. Pediatr Diabetes. 2022;23(7):835-856."
  ]
 },
 {
  "id": "anafilaxia",
  "tipo": "condicao",
  "cond": "anafilaxia",
  "nm": "Anafilaxia",
  "sub": "adrenalina IM · reconhecimento · refratária · observação · kit de alta",
  "kw": "anafilaxia choque anafilatico reacao alergica grave alergia grave edema de glote angioedema urticaria broncoespasmo picada de abelha alergia alimentar alergia a medicamento adrenalina epinefrina im vasto lateral soro salbutamol glucagon betabloqueador anti histaminico loratadina corticoide triptase autoinjetor",
  "draft": true,
  "revisado": null,
  "resumo": "Reação alérgica aguda com comprometimento respiratório, cardiovascular ou gastrointestinal importante: adrenalina IM na coxa imediatamente, repetida a cada 5–15 min. Anti-histamínico e corticoide não salvam vida nem substituem a adrenalina; na alta, kit de adrenalina, plano escrito e alergista.",
  "secoes": [
   {
    "t": "Quando pensar / diagnóstico",
    "itens": [
     "Início em minutos a poucas horas após o alérgeno: pele ou mucosa (urticária, angioedema) + respiratório, hipotensão ou sintomas gastrointestinais intensos.",
     "Hipotensão, broncoespasmo ou edema de laringe logo após alérgeno conhecido já é anafilaxia, mesmo sem lesão de pele.",
     "Cerca de 10–20% não têm lesão de pele: não esperar urticária para tratar.",
     "Gatilhos comuns: medicamentos (AINE, antibióticos), alimentos, picada de inseto, contraste e látex."
    ]
   },
   {
    "t": "Exame físico: o que procurar",
    "itens": [
     "Via aérea: estridor, rouquidão, edema de língua ou úvula, dificuldade para engolir.",
     "Respiração (sibilos, tiragem, SpO2) e circulação (PA, FC, perfusão; na criança, taquicardia e enchimento lento vêm antes da hipotensão).",
     "Pele e mucosas: urticária, rubor, angioedema; nível de consciência."
    ]
   },
   {
    "t": "Exames complementares",
    "itens": [
     "O diagnóstico é clínico: não atrasar o tratamento por exame.",
     "Triptase sérica 1–2 h após o início (até 4 h) ajuda a confirmar depois; ECG se idoso ou cardiopata."
    ]
   },
   {
    "t": "Conduta",
    "itens": [
     "Adrenalina 1 mg/mL IM no vasto lateral da coxa: 0,01 mg/kg, máximo 0,5 mg no adulto; repetir a cada 5–15 min se não melhorar.",
     "Deitar com pernas elevadas (sentado se só dispneia; decúbito lateral esquerdo na gestante); nunca colocar de pé.",
     "O2 em alto fluxo, 2 acessos calibrosos e cristaloide em bolus se hipotensão (adulto 0,5–1 L; criança 20 mL/kg).",
     "Broncoespasmo que persiste após a adrenalina: salbutamol inalatório.",
     "Refratária (2 doses IM + volume sem resposta): adrenalina EV contínua em bomba e UTI; bolus EV só na parada cardíaca.",
     "Em uso de betabloqueador com hipotensão refratária: glucagon EV.",
     "Anti-H1 (loratadina VO) só para sintomas de pele após estabilizar; corticoide só se broncoespasmo persistente, asma ou reação refratária.",
     "Observar por no mínimo 6 h após a resolução; mais tempo se reação grave, mais de 1 dose de adrenalina ou asma."
    ]
   },
   {
    "t": "Sinais de alarme e quando internar/encaminhar",
    "itens": [
     "Estridor, edema de glote progressivo ou voz abafada: via aérea difícil — equipe experiente e material de via aérea cirúrgica.",
     "Hipotensão que não responde a 2 doses IM e volume: adrenalina EV contínua e UTI.",
     "Reação bifásica pode surgir horas depois: orientar retorno imediato."
    ],
    "alerta": true
   },
   {
    "t": "Orientações ao paciente",
    "itens": [
     "Ande sempre com a adrenalina (ampolas e seringas, ou autoinjetor) e ensine a família a aplicar na coxa.",
     "Se falta de ar, chiado, rouquidão, inchaço na boca ou garganta, tontura ou desmaio: aplique a adrenalina e ligue 192.",
     "Evite o que causou a reação até a consulta com o alergista; use pulseira ou cartão de alergia."
    ]
   }
  ],
  "pendencias": [
   "Anafilaxia pediátrica do DATA usa adrenalina com máximo de 0,5 mg; Calculadoras (divergência 6) usa 0,3 mg e 0,5 mg só a partir de 12 anos — unificar.",
   "DATA Outras opções 'Receita' (prednisona 5 dias + hidroxizina + ranitidina): a ranitidina saiu do mercado e o corticoide não previne reação bifásica — revisar ou retirar.",
   "Principais condutas: hidrocortisona 500 mg EV e prometazina IM; Plantãozinho: hidrocortisona 300 mg 6/6 h — não aproveitar como resgate.",
   "Kit de alta do adulto usa 0,5 mg da ampola; autoinjetores de adulto costumam ser de 0,3 mg — confirmar a dose do kit e o tempo de observação usado no serviço."
  ],
  "fontes": [
   "Golden DBK et al. Anaphylaxis: A 2023 practice parameter update. Ann Allergy Asthma Immunol. 2024;132(2):124-176.",
   "Cardona V et al. World Allergy Organization Anaphylaxis Guidance 2020. World Allergy Organ J. 2020;13(10):100472.",
   "Muraro A et al. EAACI guidelines: Anaphylaxis (2021 update). Allergy. 2022;77(2):357-377."
  ]
 },
 {
  "id": "trauma_toracico",
  "tipo": "condicao",
  "cond": "trauma_toracico",
  "nm": "Trauma torácico",
  "sub": "fratura de costela · pneumotórax · hemotórax · contusão · analgesia",
  "kw": "trauma toracico trauma de torax contusao toracica fratura de costela arco costal torax instavel pneumotorax hipertensivo hemotorax tamponamento contusao pulmonar dreno de torax toracostomia efast dipirona naproxeno ibuprofeno codeina morfina cetoprofeno bloqueio do serratil enoxaparina cefazolina",
  "draft": true,
  "revisado": null,
  "resumo": "Primeiro, excluir as lesões que matam em minutos (pneumotórax hipertensivo, hemotórax maciço, tamponamento, tórax instável). Depois, a decisão é analgesia suficiente para respirar fundo e tossir e quem precisa ficar em observação — idoso com várias costelas fraturadas é de alto risco.",
  "secoes": [
   {
    "t": "Quando pensar / diagnóstico",
    "itens": [
     "Mecanismo: colisão, queda ou agressão; dor que piora ao respirar, dispneia, hemoptise.",
     "Pneumotórax hipertensivo: dispneia, hipotensão, murmúrio abolido e turgência jugular — descomprimir antes da imagem.",
     "Tamponamento: hipotensão, turgência jugular e bulhas abafadas, sobretudo em ferimento precordial.",
     "Fratura das costelas 1–3, do esterno ou da escápula indica alta energia: procurar lesão de grandes vasos e de vias aéreas.",
     "Fraturas das costelas baixas (9–12): pensar em lesão de fígado, baço e rim."
    ]
   },
   {
    "t": "Exame físico: o que procurar",
    "itens": [
     "xABCDE: controle de hemorragia exsanguinante, via aérea, FR, SpO2, simetria do murmúrio e percussão.",
     "Movimento paradoxal (tórax instável), enfisema subcutâneo, crepitação de costelas e desvio da traqueia.",
     "Pulsos, PA, perfusão e turgência jugular; examinar também abdome e coluna."
    ]
   },
   {
    "t": "Exames complementares",
    "itens": [
     "eFAST à beira do leito: pneumotórax, hemotórax, derrame pericárdico e líquido livre no abdome.",
     "RX de tórax no paciente estável; TC de tórax se alta energia, mediastino alargado ou dúvida.",
     "Fratura simples isolada em jovem com RX normal não precisa de mais imagem; ECG e troponina se suspeita de contusão cardíaca."
    ]
   },
   {
    "t": "Conduta",
    "itens": [
     "Instável com pneumotórax hipertensivo: descompressão por agulha ou digital e depois dreno de tórax (ver Procedimentos).",
     "Hemotórax ou pneumotórax relevante: dreno de tórax; antibiótico só em dose única na inserção.",
     "Analgesia multimodal em horário fixo: dipirona ± AINE (se sem sangramento, lesão renal ou TCE) e opioide para dor forte.",
     "Fisioterapia respiratória: inspirar fundo e tossir abraçando um travesseiro; não enfaixar o tórax.",
     "Dor refratária, idoso com ≥ 3 costelas fraturadas, tórax instável ou queda da SpO2: analgesia regional (serrátil, paravertebral, peridural) e UTI.",
     "Profilaxia de TEV quando internado, adiada se sangramento ativo ou TCE com hemorragia.",
     "Criança: lesão intratorácica pode ocorrer sem fratura; fratura de costela antes dos 3 anos sem mecanismo compatível sugere maus-tratos."
    ]
   },
   {
    "t": "Sinais de alarme e quando internar/encaminhar",
    "itens": [
     "Drenagem inicial ≥ 1.500 mL ou ≥ 200 mL/h por 2–4 h: indicação de toracotomia — cirurgia torácica.",
     "Idoso ≥ 65 anos, ≥ 3 costelas fraturadas, DPOC, anticoagulante ou dor que não cede com analgesia oral: observar ou internar.",
     "Dispneia progressiva, enfisema subcutâneo crescente, hemoptise ou hipotensão: reavaliar com eFAST/RX e chamar a cirurgia.",
     "Contusão pulmonar e pneumotórax podem aparecer ou piorar em 24–72 h."
    ],
    "alerta": true
   },
   {
    "t": "Orientações ao paciente",
    "itens": [
     "Faça 10 respirações profundas por hora enquanto acordado e tussa quando precisar, abraçando um travesseiro contra o peito.",
     "Tome o analgésico em horário fixo nos primeiros dias; caminhe, evite ficar deitado o dia todo e não fume.",
     "Evite esforço intenso e esporte de contato por 4 a 6 semanas.",
     "Volte imediatamente se falta de ar, piora da dor, tosse com sangue, febre, tontura, desmaio ou dor na barriga."
    ]
   }
  ],
  "pendencias": [
   "DATA Outras opções 'Opção 2' (levodropropizina + codeína para tosse) contraria o objetivo de tosse eficaz na fratura de costela — avaliar retirar.",
   "DATA 'Opção 1' (ciclobenzaprina + carisoprodol/paracetamol/cafeína + codeína) soma sedativos sem evidência na fratura de costela, com risco no idoso — avaliar.",
   "Nimesulida (Outras opções) tem risco hepático e foi retirada em vários países — decidir se mantém.",
   "Tigers (protocolo do trauma) usa o ABCDE do ATLS antigo; o ATLS 11 (2025) usa xABCDE."
  ],
  "fontes": [
   "American College of Surgeons. Advanced Trauma Life Support (ATLS) Student Course Manual. 11ª ed. Chicago: ACS; 2025.",
   "Galvagno SM Jr et al. Pain management for blunt thoracic trauma: A joint practice management guideline from the Eastern Association for the Surgery of Trauma and Trauma Anesthesiology Society. J Trauma Acute Care Surg. 2016;81(5):936-951.",
   "Brasel KJ et al. Western Trauma Association Critical Decisions in Trauma: Management of rib fractures. J Trauma Acute Care Surg. 2017;82(1):200-203."
  ]
 },
 {
  "id": "sincope",
  "tipo": "condicao",
  "ic": "🌀",
  "nm": "Síncope",
  "sub": "vasovagal · ortostática · cardíaca · estratificação de risco · ECG",
  "kw": "sincope desmaio desmaiou apagou perda de consciencia transitoria vasovagal sincope reflexa lipotimia pre sincope hipotensao ortostatica sincope cardiaca arritmia bradicardia bav estenose aortica canadian syncope risk score regra de sao francisco ecg manobras de contrapressao",
  "draft": true,
  "revisado": null,
  "resumo": "Perda transitória da consciência por hipoperfusão cerebral, com recuperação espontânea e completa. A tarefa do PS é achar a síncope cardíaca (risco de morte súbita) entre as reflexas e ortostáticas, que são a maioria: história, exame com PA em pé e ECG para todos; quem é de baixo risco vai para casa.",
  "secoes": [
   {
    "t": "Quando pensar / diagnóstico",
    "itens": [
     "Confirmar que foi síncope: perda breve e completa da consciência e do tônus, com recuperação espontânea em segundos a poucos minutos.",
     "Diferenciar de crise epiléptica (confusão pós-ictal longa, mordedura lateral da língua), hipoglicemia, AVC/AIT e queda sem perda de consciência.",
     "Reflexa (vasovagal): pródromo de calor, náusea, suor e visão escura; em pé por muito tempo, calor, dor, susto, ao urinar, tossir ou evacuar.",
     "Ortostática: ao se levantar; desidratação, sangramento, diuréticos, anti-hipertensivos, álcool, disautonomia.",
     "Cardíaca: durante esforço ou deitado, palpitação logo antes, sem pródromo, cardiopatia ou história familiar de morte súbita."
    ]
   },
   {
    "t": "Exame físico: o que procurar",
    "itens": [
     "PA e FC deitado e após 1 e 3 minutos em pé: queda da PAS ≥ 20 ou PAD ≥ 10 mmHg (ou PAS < 90) = hipotensão ortostática.",
     "Ausculta (sopro de estenose aórtica ou de cardiomiopatia hipertrófica), sinais de IC e PA nos dois braços.",
     "Sinais de sangramento (toque retal se suspeita), trauma da queda e exame neurológico."
    ]
   },
   {
    "t": "Exames complementares",
    "itens": [
     "ECG de 12 derivações em todos: FC < 40, BAV Mobitz II ou total, pausas, QT longo, padrão de Brugada, pré-excitação, sinais de cardiopatia.",
     "Glicemia capilar; hemoglobina se suspeita de sangramento; beta-hCG na mulher em idade fértil.",
     "Troponina, BNP, ecocardiograma e monitorização só se suspeita cardíaca; TC de crânio e EEG não são de rotina."
    ]
   },
   {
    "t": "Conduta",
    "itens": [
     "Baixo risco (pródromo típico de reflexa, exame e ECG normais): alta sem exames adicionais.",
     "Canadian Syncope Risk Score (predisposição vasovagal, cardiopatia, PAS < 90 ou > 180, troponina, QRS, QTc, impressão diagnóstica) ajuda a decidir a observação.",
     "Regra de São Francisco (em Escores) e o escore canadense apoiam, mas não substituem o julgamento clínico.",
     "Risco intermediário: monitorização no PS e reavaliação; alto risco: internar com monitor cardíaco.",
     "Reflexa: explicar que é benigna, ensinar manobras de contrapressão e hidratação; rever o anti-hipertensivo se a PA permitir.",
     "Ortostática: hidratar, suspender ou reduzir o remédio causador e orientar a levantar devagar."
    ]
   },
   {
    "t": "Sinais de alarme e quando internar/encaminhar",
    "itens": [
     "Síncope ao esforço ou deitado, palpitação logo antes, dor torácica, dispneia ou cefaleia súbita associadas.",
     "Cardiopatia estrutural, IC, história familiar de morte súbita em jovem ou ECG alterado.",
     "Hipotensão persistente, sangramento, anemia importante ou trauma grave pela queda.",
     "Idoso com quedas ou síncopes repetidas, ou síncope sem pródromo: investigar arritmia."
    ],
    "alerta": true
   },
   {
    "t": "Orientações ao paciente",
    "itens": [
     "Este desmaio foi do tipo reflexo, que não é doença do coração; ele pode se repetir em situações parecidas.",
     "Evite os gatilhos: calor, lugares lotados e abafados, ficar muito tempo em pé, jejum prolongado e desidratação.",
     "Beba bastante água e não reduza o sal por conta própria (se tiver pressão alta, combine com seu médico).",
     "Ao sentir que vai desmaiar: deite ou sente; cruze as pernas apertando com força, contraia a barriga ou agache.",
     "Não mude os remédios de pressão sozinho; o médico pode precisar ajustá-los.",
     "Volte se desmaiar durante esforço ou deitado, se tiver dor no peito, palpitação, falta de ar ou se se machucar ao cair."
    ]
   }
  ],
  "pendencias": [
   "Condição nova: não há id nem palavra-chave 'síncope' no DATA; as orientações vêm de 2 documentos próprios do médico ('Síncope Reflexa').",
   "O texto do médico manda 'restringir condução de veículos'; a ESC 2018 só restringe o motorista particular na síncope reflexa recorrente e grave (regras mais estritas para profissionais) — decidir a redação.",
   "Canadian Syncope Risk Score não está em Escores (entraria primeiro na Ficha Vermelha) — conferir os pontos de cada item na publicação original antes.",
   "Confirmar se o serviço tem monitorização prolongada/Holter para o risco intermediário ou se o fluxo é encaminhar à cardiologia."
  ],
  "fontes": [
   "Brignole M et al. 2018 ESC Guidelines for the diagnosis and management of syncope. Eur Heart J. 2018;39(21):1883-1948.",
   "Shen WK et al. 2017 ACC/AHA/HRS Guideline for the Evaluation and Management of Patients With Syncope. Circulation. 2017;136(5):e60-e122.",
   "Thiruganasambandamoorthy V et al. Development of the Canadian Syncope Risk Score to predict serious adverse events after emergency department assessment of syncope. CMAJ. 2016;188(12):E289-E298."
  ]
 },
 {
  "id": "sepse",
  "tipo": "condicao",
  "ic": "🦠",
  "nm": "Sepse no PS",
  "sub": "triagem · pacote da 1ª hora · lactato · antibiótico · noradrenalina",
  "kw": "sepse septicemia choque septico infeccao grave disfuncao organica sirs qsofa news2 lactato hemocultura antibiotico na primeira hora cristaloide ringer lactato 30 ml/kg noradrenalina vasopressina hidrocortisona pam 65 tempo de enchimento capilar ilas surviving sepsis foco infeccioso",
  "draft": true,
  "revisado": null,
  "resumo": "Sepse é disfunção orgânica ameaçadora à vida causada por infecção. No PS, triar com critérios sensíveis (SIRS, NEWS2, disfunção orgânica), não com qSOFA isolado, e executar o pacote da 1ª hora: lactato, hemoculturas, antibiótico EV de amplo espectro e cristaloide se hipoperfusão, com noradrenalina se PAM < 65.",
  "secoes": [
   {
    "t": "Quando pensar / diagnóstico",
    "itens": [
     "Suspeita de infecção + disfunção orgânica = sepse; choque séptico = hipotensão que exige vasopressor apesar do volume.",
     "Disfunções (ILAS): PAS < 90 ou PAM < 65, oligúria ou creatinina > 2, SpO2 < 90% ou necessidade de O2.",
     "Também são disfunção: plaquetas < 100 mil, lactato > 2 mmol/L, confusão ou agitação e bilirrubina > 2× o normal.",
     "SIRS serve para triar, não para definir sepse: 2 de Tax > 37,8 ou < 35, FC > 90, FR > 20, leucócitos > 12 mil ou < 4 mil.",
     "qSOFA não deve ser usado sozinho na triagem (pouco sensível); NEWS2 (em Escores) ou SIRS são melhores.",
     "Idoso, imunossuprimido e quem usa betabloqueador podem ter sepse sem febre ou sem taquicardia."
    ]
   },
   {
    "t": "Exame físico: o que procurar",
    "itens": [
     "PA, PAM, FC, FR, SpO2, temperatura, nível de consciência e diurese.",
     "Perfusão: tempo de enchimento capilar > 3 s, pele moteada (livedo), extremidades frias.",
     "Procurar o foco: pulmão, urina, abdome, pele e partes moles, cateteres e meninges."
    ]
   },
   {
    "t": "Exames complementares",
    "itens": [
     "Lactato (resultado em até 30 min), gasometria, hemograma, creatinina, bilirrubina e coagulograma.",
     "Hemoculturas (pelo menos 2 amostras, ≥ 20 mL no total) antes do antibiótico, sem atrasá-lo; culturas do foco.",
     "Imagem do foco provável (RX, US, TC); repetir o lactato em até 4 h se o inicial estava alto."
    ]
   },
   {
    "t": "Conduta",
    "itens": [
     "Antibiótico EV de amplo espectro na 1ª hora no choque ou na sepse provável; sepse só possível, sem choque: investigar e decidir em até 3 h.",
     "Escolher pelo foco e pelo guia da CCIH; 1ª dose cheia, sem ajuste renal (ver Pneumonia, Pielonefrite e Erisipela em Prescrições).",
     "Hipotensão ou hipoperfusão (lactato alto, TEC > 3 s): cristaloide até 30 mL/kg nas primeiras 3 h, em alíquotas, reavaliando após cada uma.",
     "Preferir Ringer lactato a SF 0,9% (exceto no TCE); não usar amido nem gelatina.",
     "PAM < 65 apesar do volume: noradrenalina, que pode começar em veia periférica sem esperar o fim do volume.",
     "Dose de noradrenalina subindo: associar vasopressina; no choque, considerar hidrocortisona 200 mg/dia (50 mg de 6/6 h).",
     "Controle do foco (drenar, desbridar, retirar cateter) idealmente em até 6 h; reavaliar volemia e perfusão em 6 h.",
     "Criança: antibiótico em 1 h no choque; bolus de 10–20 mL/kg reavaliando, até 40–60 mL/kg na 1ª hora onde houver UTI."
    ]
   },
   {
    "t": "Sinais de alarme e quando internar/encaminhar",
    "itens": [
     "Choque séptico, lactato ≥ 4 mmol/L, necessidade de vasopressor, O2 em alto fluxo ou ventilação: UTI.",
     "Rebaixamento, petéquias que se espalham ou dor desproporcional em partes moles (fasciíte): antibiótico imediato e cirurgia.",
     "Piora da oxigenação ou estertores durante o volume: parar o volume e iniciar vasopressor.",
     "UBS ou UPA sem estrutura: antibiótico e volume antes da transferência pela regulação."
    ],
    "alerta": true
   },
   {
    "t": "Orientações ao paciente",
    "itens": [
     "Ao familiar: a infecção afetou o funcionamento de órgãos e o tratamento nas primeiras horas é decisivo.",
     "Depois da alta, cansaço, fraqueza e dificuldade de memória e de sono podem durar semanas; procure a unidade de saúde para acompanhamento.",
     "Volte imediatamente se febre persistente, confusão, falta de ar, pouca urina ou pele manchada ou fria."
    ]
   }
  ],
  "pendencias": [
   "Plantão Rápido orienta triar por qSOFA, com cortes errados ('PAS < 100', 'FR > 22', '> 2'; o certo é ≤ 100, ≥ 22 e ≥ 2) e SOFA '> 2' (o certo é aumento ≥ 2) — SSC 2026 e ILAS não recomendam qSOFA isolado.",
   "Guia HC-FMUSP de antimicrobianos (APS) chama de sepse ≥ 2 critérios de SIRS mesmo sem disfunção (definição antiga) e dá 30 mL/kg com lactato > 20 mg/dL; o ILAS usa hipotensão ou lactato > 2× o normal e TEC > 3 s — decidir o gatilho do site.",
   "Documento 'ESCORE NEWS SEPSE' do Drive é o NEWS original; o site tem NEWS2 (faixas diferentes) — usar NEWS2.",
   "Não há condição Sepse no DATA nem prescrição pronta (cristaloide, noradrenalina, hidrocortisona) — decidir se cria uma condição com Padrão de internação.",
   "Antibiótico empírico sem foco depende do guia local da CCIH; o ILAS tem guia prático de antimicrobianos (2024) — escolher a referência."
  ],
  "fontes": [
   "Prescott HC et al. Surviving Sepsis Campaign: International Guidelines for Management of Sepsis and Septic Shock 2026. Crit Care Med. 2026. doi:10.1097/CCM.0000000000007075.",
   "Instituto Latino Americano de Sepse (ILAS). Implementação de protocolo gerenciado de sepse – protocolo clínico: atendimento ao paciente adulto com sepse/choque séptico. Revisado em julho de 2026.",
   "Singer M et al. The Third International Consensus Definitions for Sepsis and Septic Shock (Sepsis-3). JAMA. 2016;315(8):801-810.",
   "Weiss SL et al. Surviving Sepsis Campaign International Guidelines for the Management of Septic Shock and Sepsis-Associated Organ Dysfunction in Children. Pediatr Crit Care Med. 2020;21(2):e52-e106."
  ]
 },
 {
  "id": "dor_abdominal",
  "tipo": "condicao",
  "cond": "dor_abdominal",
  "nm": "Dor abdominal, cólica biliar e dispepsia",
  "sub": "abdome agudo · cólica biliar · colecistite · dispepsia · analgesia",
  "kw": "dor abdominal dor de barriga dor na barriga abdome agudo colica biliar colica de vesicula pedra na vesicula colelitiase colecistite apendicite pancreatite dispepsia epigastralgia azia queimacao gastrite murphy blumberg peritonite escopolamina dipirona diclofenaco cetoprofeno tramadol morfina omeprazol beta hcg ultrassom tomografia",
  "draft": true,
  "revisado": null,
  "resumo": "Dor abdominal aguda é comum e nem sempre benigna: a tarefa no PS é separar quem tem abdome cirúrgico (apendicite, colecistite, obstrução, isquemia, gravidez ectópica) de quem pode ir para casa. Analgesia precoce não atrapalha o diagnóstico; na cólica biliar, o AINE é a primeira escolha.",
  "secoes": [
   {
    "t": "Quando pensar / diagnóstico",
    "itens": [
     "Localize a dor e veja como evoluiu: periumbilical que migra para a FID sugere apendicite; epigástrica em faixa, pancreatite.",
     "Cólica biliar: dor contínua em HCD ou epigástrio, de 30 min a poucas horas, sem febre; mais de 6 h ou febre, pensar em colecistite.",
     "Dispepsia: dor ou queimação epigástrica, empachamento ou saciedade precoce, sem sinais de alarme.",
     "Mulher em idade fértil: toda dor abdominal ou pélvica pede beta-hCG (gravidez ectópica).",
     "Idoso, diabético, imunossuprimido e gestante podem ter doença grave com pouca dor e exame pobre.",
     "Lembre causas fora do abdome: IAM inferior, pneumonia de base, cetoacidose, cólica renal, herpes-zóster antes das vesículas."
    ]
   },
   {
    "t": "Exame físico: o que procurar",
    "itens": [
     "Sinais vitais completos: febre, taquicardia e hipotensão mudam a prioridade.",
     "Defesa involuntária, descompressão brusca dolorosa e abdome em tábua indicam peritonite.",
     "Murphy positivo sugere colecistite; Blumberg, Rovsing, psoas e obturador, apendicite.",
     "Dor desproporcional ao exame em quem tem FA ou doença vascular: isquemia mesentérica.",
     "Examine regiões herniárias; toque retal se suspeita de sangramento ou obstrução; na mulher, considere o exame pélvico."
    ]
   },
   {
    "t": "Exames complementares",
    "itens": [
     "Dispepsia típica em jovem, sem alarme: não precisa de exame no PS.",
     "Dor importante ou dúvida: hemograma, PCR, lipase, função hepática com bilirrubinas, função renal, eletrólitos, urina tipo I e beta-hCG.",
     "Ultrassom é o exame inicial na dor em HCD (colelitíase, colecistite) e na gestante e na criança.",
     "TC de abdome com contraste é o exame de escolha na dor aguda indefinida do adulto; RX simples só para pneumoperitônio ou obstrução sem TC.",
     "ECG na dor epigástrica de quem tem fatores de risco cardiovascular."
    ]
   },
   {
    "t": "Conduta",
    "itens": [
     "Trate a dor logo: analgesia, inclusive opioide, não mascara o diagnóstico nem atrasa a decisão cirúrgica.",
     "Cólica biliar: AINE (diclofenaco ou cetoprofeno) é a primeira escolha; alivia mais que o antiespasmódico e pode reduzir complicações.",
     "Opioide na cólica biliar se AINE contraindicado ou insuficiente; escopolamina é coadjuvante, não primeira escolha.",
     "Dor intensa no PS: dipirona EV e, se preciso, tramadol ou morfina titulada; antiemético se náuseas.",
     "Dispepsia sem alarme: IBP por 4 a 8 semanas e pesquisa de H. pylori na UBS.",
     "Colelitíase sintomática confirmada: encaminhar para colecistectomia eletiva.",
     "Alta só com dor controlada, sem peritonite, tolerando líquidos e com reavaliação em 12 a 24 h se a dor persistir."
    ]
   },
   {
    "t": "Sinais de alarme e quando internar/encaminhar",
    "itens": [
     "Peritonite; distensão com vômitos e parada de gases e fezes (obstrução).",
     "Febre com dor em HCD, icterícia ou colúria: colecistite ou colangite — internar e chamar a cirurgia.",
     "Hipotensão, taquicardia, síncope ou massa pulsátil: aneurisma roto, ectópica rota, perfuração.",
     "Hematêmese, melena ou anemia nova.",
     "Beta-hCG positivo com dor ou sangramento, sem gestação intrauterina confirmada.",
     "Dor que não cede com analgesia adequada ou piora na reavaliação."
    ],
    "alerta": true
   },
   {
    "t": "Orientações ao paciente",
    "itens": [
     "A causa da dor pode ficar clara só depois de algumas horas: volte se ela mudar de lugar, aumentar ou não melhorar em 24 horas.",
     "Evite comida gordurosa, frituras e bebida alcoólica até melhorar.",
     "Volte imediatamente se tiver febre, vômitos que não param, olhos amarelados, urina escura, barriga dura ou fezes pretas.",
     "Não tome anti-inflamatório por conta própria se tiver úlcera, doença dos rins ou usar anticoagulante."
    ]
   }
  ],
  "pendencias": [
   "DATA (ambulatorial) tem comprimido combinado de escopolamina + dipirona citado pelo nome comercial; Cochrane 2016 mostra AINE superior ao antiespasmódico na cólica biliar — manter como opção?",
   "Material do Drive (Principais condutas e Tigers) pede RX de tórax e de abdome no abdome agudo; hoje USG e TC são preferidos, RX só se não houver TC — decidir o texto.",
   "Drive faz tramadol 100 mg + metoclopramida EV em 20 min; DATA dilui o tramadol em 30 min (menos náusea) — manter o DATA.",
   "Confirmar se o PS tem TC disponível; se não tiver, ajustar a seção de exames para USG e critérios de transferência."
  ],
  "fontes": [
   "Manterola C, Vial M, Moraga J, Astudillo P. Analgesia in patients with acute abdominal pain. Cochrane Database Syst Rev. 2011;(1):CD005660.",
   "Fraquelli M, Casazza G, Conte D, Colli A. Non-steroid anti-inflammatory drugs for biliary colic. Cochrane Database Syst Rev. 2016;(9):CD006390.",
   "Pisano M et al. 2020 World Society of Emergency Surgery updated guidelines for the diagnosis and treatment of acute calculus cholecystitis. World J Emerg Surg. 2020;15:61.",
   "Di Saverio S et al. Diagnosis and treatment of acute appendicitis: 2020 update of the WSES Jerusalem guidelines. World J Emerg Surg. 2020;15:27.",
   "Moayyedi PM et al. ACG and CAG Clinical Guideline: Management of Dyspepsia. Am J Gastroenterol. 2017;112(7):988-1013."
  ]
 },
 {
  "id": "gastrite",
  "tipo": "condicao",
  "cond": "gastrite",
  "nm": "Gastrite / DRGE",
  "sub": "dispepsia · refluxo · IBP · H. pylori · endoscopia",
  "kw": "gastrite drge refluxo refluxo gastroesofagico azia queimacao pirose regurgitacao dispepsia epigastralgia ma digestao empachamento h pylori helicobacter ulcera omeprazol pantoprazol esomeprazol lansoprazol inibidor de bomba ibp hidroxido de aluminio antiacido domperidona endoscopia eda",
  "draft": true,
  "revisado": null,
  "resumo": "Azia e regurgitação típicas, sem sinais de alarme, permitem tratar sem exame: IBP uma vez ao dia antes do café por 8 semanas e mudanças de hábito. Dor epigástrica (dispepsia) pede pesquisa de H. pylori; sinais de alarme, falha do IBP ou idade indicam endoscopia.",
  "secoes": [
   {
    "t": "Quando pensar / diagnóstico",
    "itens": [
     "DRGE: queimação retroesternal que sobe (pirose) e regurgitação ácida, piores após refeições e ao deitar.",
     "Dispepsia: dor ou queimação epigástrica, plenitude pós-prandial ou saciedade precoce.",
     "Refluxo pode dar tosse crônica, rouquidão, pigarro e dor torácica não cardíaca.",
     "Dor epigástrica ou torácica 'em queimação' com fatores de risco: afaste síndrome coronariana antes de chamar de gastrite.",
     "Pergunte por AINE, AAS, anticoagulante, álcool e tabagismo."
    ]
   },
   {
    "t": "Exame físico: o que procurar",
    "itens": [
     "Em geral normal; dor leve à palpação do epigástrio é comum.",
     "Procure palidez, emagrecimento, massa epigástrica, linfonodo supraclavicular e icterícia.",
     "Descompressão dolorosa ou abdome em tábua: pensar em úlcera perfurada."
    ]
   },
   {
    "t": "Exames complementares",
    "itens": [
     "Sintomas típicos sem alarme: não precisa de exame para começar o IBP.",
     "Dispepsia: pesquisar e tratar H. pylori (teste respiratório, antígeno fecal ou biópsia na endoscopia).",
     "Endoscopia se sinais de alarme, falha após 8 semanas de IBP ou idade acima do limiar adotado pelo serviço.",
     "Hemograma se suspeita de anemia; ECG se dor torácica."
    ]
   },
   {
    "t": "Conduta",
    "itens": [
     "IBP em dose padrão, uma vez ao dia, 30 a 60 min antes do café, por 8 semanas (omeprazol 20 mg ou pantoprazol 40 mg).",
     "Resposta parcial: dobrar a dose (antes do café e do jantar) ou trocar de IBP; sem resposta, endoscopia.",
     "Respondeu: tentar suspender ao fim do tratamento ou manter a menor dose eficaz, sob demanda.",
     "Antiácido (hidróxido de alumínio) só para alívio pontual, 2 horas longe de outros remédios.",
     "Suspender AINE sempre que possível; se indispensável, associar IBP.",
     "Procinético não trata refluxo; domperidona só para náusea, por até 7 dias.",
     "H. pylori positivo: erradicar com esquema do consenso brasileiro e confirmar a cura depois."
    ]
   },
   {
    "t": "Sinais de alarme e quando internar/encaminhar",
    "itens": [
     "Hematêmese, melena ou anemia: hemorragia digestiva — avaliação imediata.",
     "Disfagia, dor ao engolir, vômitos persistentes ou perda de peso sem causa.",
     "Massa abdominal, icterícia ou linfonodo supraclavicular.",
     "Sintomas novos em idade mais avançada ou história familiar de câncer gástrico: endoscopia.",
     "Dor súbita e intensa com abdome em tábua: perfuração."
    ],
    "alerta": true
   },
   {
    "t": "Orientações ao paciente",
    "itens": [
     "Tome o remédio do estômago em jejum, 30 minutos antes do café da manhã, todos os dias durante o tratamento.",
     "Não se deite nas 2 a 3 horas depois das refeições; se tiver sintomas à noite, eleve a cabeceira da cama.",
     "Perca peso se estiver acima do peso, pare de fumar e diminua o álcool.",
     "Evite anti-inflamatórios e AAS sem orientação médica.",
     "Volte se vomitar sangue, tiver fezes pretas, dificuldade para engolir ou perda de peso."
    ]
   },
   {
    "t": "Outras opções (material do médico)",
    "itens": [
     "Lansoprazol 30 mg — outro IBP para as 8 semanas, quando omeprazol ou pantoprazol faltarem ou não forem tolerados; eficácia equivalente em dose padrão.",
     "Esomeprazol 40 mg — alternativa para cicatrizar esofagite erosiva (4 a 8 semanas); sem esofagite, 20 mg bastam; custo maior."
    ],
    "offlabel": true
   }
  ],
  "pendencias": [
   "DATA (Outras opções, 'Receita') começa com omeprazol 40 mg (2 cápsulas) por 8 semanas; ACG 2022 recomenda dose padrão 1x/dia e dobrar só se resposta parcial — decidir.",
   "DATA ('Receita') tem domperidona sem prazo, antes do almoço; EMA 2014 restringe a náusea/vômito, máx. 30 mg/dia por até 1 semana (risco de arritmia) — rotular ou retirar.",
   "DATA manda endoscopia a partir de 40 anos; ACG/CAG 2017 usa 60 anos; no Brasil, com mais câncer gástrico, é comum usar 40–45 — decidir o limiar.",
   "Material do Drive traz ranitidina (retirada do mercado em 2020) e bromoprida por 30 dias como procinético na DRGE — não propostos.",
   "Esquema de erradicação do H. pylori não está no DATA; incluir bloco (consenso brasileiro) ou só encaminhar à UBS?"
  ],
  "fontes": [
   "Katz PO et al. ACG Clinical Guideline for the Diagnosis and Management of Gastroesophageal Reflux Disease. Am J Gastroenterol. 2022;117(1):27-56.",
   "Moayyedi PM et al. ACG and CAG Clinical Guideline: Management of Dyspepsia. Am J Gastroenterol. 2017;112(7):988-1013.",
   "Coelho LGV et al. IVth Brazilian Consensus Conference on Helicobacter pylori infection. Arq Gastroenterol. 2018;55(2):97-121.",
   "European Medicines Agency (CMDh). Restrictions on the use of domperidone-containing medicines. 2014."
  ]
 },
 {
  "id": "nauseas_vomitos",
  "tipo": "condicao",
  "cond": "nauseas_vomitos",
  "nm": "Náuseas e vômitos",
  "sub": "gastroenterite · desidratação · antiemético · gestação · criança",
  "kw": "nauseas vomitos enjoo enjoado ansia de vomito vomitando estomago embrulhado gastroenterite virose desidratacao hiperemese gravidica nausea da gravidez metoclopramida ondansetrona dimenidrinato piridoxina bromoprida domperidona soro de reidratacao oral sro",
  "draft": true,
  "revisado": null,
  "resumo": "Na maioria das vezes é gastroenterite viral, que melhora com hidratação oral e um antiemético por poucos dias. O papel do plantão é medir a desidratação e não deixar passar causa grave: obstrução, abdome agudo, gestação, cetoacidose, hipertensão intracraniana e intoxicação.",
  "secoes": [
   {
    "t": "Quando pensar / diagnóstico",
    "itens": [
     "Vômitos com diarreia e contato com doentes: gastroenterite viral, que dura 1 a 3 dias.",
     "Vômitos biliosos ou fecaloides, distensão e parada de gases: obstrução intestinal.",
     "Mulher em idade fértil: beta-hCG (náusea da gravidez e hiperêmese).",
     "Cefaleia intensa, alteração neurológica ou vômitos em jato pela manhã: causa intracraniana.",
     "Diabético com vômitos: glicemia e cetonas; idoso: lembrar IAM inferior, sepse e distúrbio eletrolítico.",
     "Reveja remédios e tóxicos: opioides, digoxina, quimioterapia, álcool, uso crônico de cannabis."
    ]
   },
   {
    "t": "Exame físico: o que procurar",
    "itens": [
     "Hidratação: mucosas, turgor, enchimento capilar, FC, PA deitado e em pé, diurese.",
     "Abdome: distensão, ruídos metálicos ou ausentes, peritonite, hérnia encarcerada.",
     "Neurológico e rigidez de nuca quando houver cefaleia, febre ou confusão.",
     "Criança: estado geral, olhos fundos, lágrimas, sede, fontanela e peso (planos A, B e C)."
    ]
   },
   {
    "t": "Exames complementares",
    "itens": [
     "Gastroenterite com boa hidratação: não precisa de exame.",
     "Desidratação moderada a grave, vômitos prolongados ou comorbidade: eletrólitos, função renal e glicemia; gasometria se grave.",
     "Beta-hCG em mulher em idade fértil; glicemia capilar e cetonas no diabético.",
     "Imagem só se suspeita de obstrução ou abdome agudo."
    ]
   },
   {
    "t": "Conduta",
    "itens": [
     "Hidratação oral em pequenos goles frequentes é a base; SRO se houver diarreia.",
     "Adulto: ondansetrona, metoclopramida ou dimenidrinato por curto prazo; a ondansetrona causa menos reação extrapiramidal.",
     "Metoclopramida: no máximo 30 mg/dia por até 5 dias; risco de acatisia e distonia, maior em jovens.",
     "Criança a partir de 6 meses com vômitos persistentes: ondansetrona oral, dose única, antes de reiniciar a SRO; evitar metoclopramida e bromoprida.",
     "Intolerância oral ou desidratação: SF 0,9% EV em alíquotas e antiemético EV; reavaliar e voltar à via oral.",
     "Gestante: piridoxina com ou sem doxilamina é a primeira linha; dimenidrinato e, se preciso, ondansetrona depois.",
     "Ondansetrona prolonga o QT: cuidado com hipocalemia, cardiopatia e outros remédios que prolongam o QT."
    ]
   },
   {
    "t": "Sinais de alarme e quando internar/encaminhar",
    "itens": [
     "Desidratação grave, choque, rebaixamento ou criança letárgica.",
     "Vômito com sangue, em borra de café ou verde (bilioso).",
     "Dor abdominal intensa, distensão ou peritonite.",
     "Cefaleia intensa, déficit neurológico ou rigidez de nuca.",
     "Cetoacidose, hiperêmese com perda de peso e cetonúria, ou incapacidade de manter a hidratação oral."
    ],
    "alerta": true
   },
   {
    "t": "Orientações ao paciente",
    "itens": [
     "Beba líquidos em pequenos goles, várias vezes por hora; volte a comer aos poucos, com comida leve.",
     "Se a metoclopramida der inquietação ou movimentos involuntários no pescoço, olhos ou língua, pare o remédio e procure atendimento.",
     "Na criança, ofereça o soro de colher em colher; se vomitar, espere 10 minutos e recomece mais devagar.",
     "Volte se não conseguir beber, urinar pouco, ficar tonto ao levantar, vomitar sangue ou tiver dor forte na barriga."
    ]
   },
   {
    "t": "Outras opções (material do médico)",
    "itens": [
     "Domperidona 10 mg — alternativa à metoclopramida, até 3x/dia por no máximo 7 dias; evitar em cardiopatas e com remédios que prolongam o QT.",
     "Bromoprida 10 mg oral — alternativa nacional à metoclopramida, com o mesmo risco extrapiramidal; não usar em criança.",
     "Dimenidrinato + piridoxina EV (ampola de 30 mg) — antiemético no PS sem efeito antidopaminérgico; contraindicado na intolerância à frutose e abaixo de 2 anos."
    ],
    "offlabel": true
   }
  ],
  "pendencias": [
   "Não há bloco para gestante no DATA; ACOG 2018 coloca piridoxina com ou sem doxilamina como 1ª linha — criar bloco ou remeter à obstetrícia?",
   "Material do Drive diz 'metoclopramida: evitar em jovens' e traz dimenidrinato 100 mg 6/6h e ondansetrona 8 mg 12/12h por 5 dias; DATA usa dimenidrinato 50 mg + piridoxina e ondansetrona SN — manter o DATA.",
   "Drive pediátrico (Medicações Pediatria 2) usa metoclopramida e bromoprida em criança; EMA 2013 contraindica metoclopramida abaixo de 1 ano e restringe em crianças — não proposto.",
   "Dimenidrinato em gotas para criança aparece no material do médico (dengue criança); evidência fraca na gastroenterite e risco de sedação — não proposto; decidir."
  ],
  "fontes": [
   "European Medicines Agency. European Medicines Agency recommends changes to the use of metoclopramide. 2013.",
   "American College of Obstetricians and Gynecologists. Practice Bulletin No. 189: Nausea and Vomiting of Pregnancy. Obstet Gynecol. 2018;131(1):e15-e30.",
   "Guarino A et al. ESPGHAN/ESPID evidence-based guidelines for the management of acute gastroenteritis in children in Europe: update 2014. J Pediatr Gastroenterol Nutr. 2014;59(1):132-152.",
   "European Medicines Agency (CMDh). Restrictions on the use of domperidone-containing medicines. 2014."
  ]
 },
 {
  "id": "diarreia",
  "tipo": "condicao",
  "cond": "diarreia",
  "nm": "Diarreia aguda",
  "sub": "gastroenterite · desidratação · SRO · disenteria · planos A B C",
  "kw": "diarreia aguda gastroenterite geca virose intestinal disenteria sangue nas fezes fezes liquidas desidratacao reidratacao soro de reidratacao oral sro soro caseiro plano a plano b plano c zinco loperamida saccharomyces probiotico racecadotrila ondansetrona azitromicina ciprofloxacino ceftriaxona c difficile coprocultura escopolamina",
  "draft": true,
  "revisado": null,
  "resumo": "Quase sempre viral e autolimitada: o tratamento é reidratar e manter a alimentação. A decisão do plantão é o grau de desidratação (planos A, B ou C) e quem precisa de antibiótico — disenteria com comprometimento do estado geral, febre alta, sepse ou imunossupressão.",
  "secoes": [
   {
    "t": "Quando pensar / diagnóstico",
    "itens": [
     "Diarreia aguda: 3 ou mais evacuações líquidas ou amolecidas em 24 h, por até 14 dias.",
     "Aquosa, com vômitos e sem febre alta: viral (norovírus, rotavírus) — a maioria.",
     "Disenteria (sangue ou muco, febre, cólica): Shigella, Campylobacter, Salmonella, ameba.",
     "Antibiótico ou internação nos últimos 3 meses: pesquisar C. difficile.",
     "Mais de 14 dias: pensar em giárdia e outras causas e investigar.",
     "Alto risco: 70 anos ou mais, gestante, imunossuprimido, doença inflamatória intestinal, comorbidade grave."
    ]
   },
   {
    "t": "Exame físico: o que procurar",
    "itens": [
     "Classificar a hidratação: estado geral, olhos, sede, lágrimas, mucosas, prega cutânea, enchimento capilar e pulso.",
     "Sinais vitais com PA em pé no adulto: hipotensão postural indica desidratação importante.",
     "Abdome: dor localizada, distensão ou peritonite sugerem outra causa (apendicite, isquemia, megacólon).",
     "Pesar a criança: a perda de peso orienta o plano e os volumes."
    ]
   },
   {
    "t": "Exames complementares",
    "itens": [
     "Diarreia aquosa sem desidratação grave: não precisa de exame.",
     "Coprocultura (e antibiótico empírico) só se grave: febre alta persistente, sangue nas fezes, desidratação, 8 ou mais evacuações/dia, alto risco ou mais de 7 dias.",
     "Plano C ou comorbidade: Na, K, função renal, glicemia e gasometria.",
     "Toxina de C. difficile se antibiótico ou internação recente; parasitológico se mais de 14 dias."
    ]
   },
   {
    "t": "Conduta",
    "itens": [
     "Plano A (hidratado): SRO após cada evacuação, alimentação habitual e, abaixo de 5 anos, zinco por 10 a 14 dias.",
     "Plano B (desidratado): SRO na unidade, 50 a 100 mL/kg em 4 a 6 h, reavaliando a cada hora.",
     "Plano C (desidratação grave): SF 0,9% ou Ringer lactato EV em fase rápida e reavaliação; SRO assim que conseguir beber.",
     "Antibiótico só na disenteria com estado geral comprometido, febre alta, sepse ou imunossupressão; azitromicina é a primeira escolha.",
     "Nunca dar antibiótico se suspeita de E. coli produtora de toxina Shiga (sangue sem febre, surto): risco de síndrome hemolítico-urêmica.",
     "Loperamida só no adulto com diarreia aquosa, sem febre e sem sangue; nunca em criança.",
     "Antiemético se os vômitos atrapalham a reidratação: ondansetrona (criança a partir de 6 meses)."
    ]
   },
   {
    "t": "Sinais de alarme e quando internar/encaminhar",
    "itens": [
     "Desidratação grave, choque, rebaixamento ou criança letárgica.",
     "Sangue nas fezes com febre alta, toxemia ou sepse.",
     "Vômitos que impedem a reidratação oral; diurese ausente.",
     "Dor abdominal intensa, distensão ou peritonite.",
     "Lactente pequeno, desnutrido grave, idoso frágil ou imunossuprimido.",
     "Pouca urina, palidez e petéquias depois de diarreia com sangue: síndrome hemolítico-urêmica."
    ],
    "alerta": true
   },
   {
    "t": "Orientações ao paciente",
    "itens": [
     "Prepare 1 sachê de soro em 1 litro de água filtrada ou fervida, use em até 24 horas e tome um copo após cada evacuação.",
     "Continue comendo normalmente, em porções menores; evite refrigerantes, sucos adoçados e bebidas alcoólicas.",
     "Lave as mãos depois de usar o banheiro e antes de preparar ou comer alimentos.",
     "Volte se tiver muita sede, boca seca, pouca urina, tontura ao levantar, sangue nas fezes, febre persistente ou se não melhorar no prazo combinado."
    ]
   },
   {
    "t": "Outras opções (material do médico)",
    "itens": [
     "Escopolamina + dipirona EV (ampola combinada) — cólica intensa na observação, junto com ondansetrona e soro, como no modelo do médico; não somar outra dipirona.",
     "Racecadotrila (criança a partir de 3 meses) — antissecretor adjuvante à SRO, aceito pela ESPGHAN 2014; nunca substitui a reidratação."
    ],
    "offlabel": true
   }
  ],
  "pendencias": [
   "Loperamida está no Padrão do DATA; o guia HC-FMUSP 2024 (material do médico) manda evitar; ACG 2016 aceita no adulto sem febre e sem sangue — decidir se fica no Padrão.",
   "Prazo de retorno diverge nos textos do médico: 5 dias (Meu rascunho), 7 dias (Meu modelo padrão) e 10 dias (orientações) — escolher um.",
   "Azitromicina pediátrica: DATA 5 dias (10 mg/kg e depois 5 mg/kg); guia HC-FMUSP 3 dias no total — padronizar.",
   "Saccharomyces está no Padrão adulto; ACG 2016 considera a evidência insuficiente para probiótico na diarreia aguda do adulto — decidir.",
   "Outras opções do DATA têm blocos 'Opção N' sem rótulo, inclusive SMX-TMP por 14 dias, metronidazol 10 dias, secnidazol e albendazol — rotular por indicação ou retirar.",
   "Material do Drive usa SMX-TMP 800/160 e ácido nalidíxico na disenteria — desatualizados pela resistência; não propostos.",
   "C. difficile: metronidazol oral (guia HC) só se não houver vancomicina oral (IDSA/SHEA 2021) — conferir o rótulo do bloco de vancomicina."
  ],
  "fontes": [
   "Brasil. Ministério da Saúde. Manejo do paciente com diarreia (cartaz). Brasília; 2023.",
   "Riddle MS, DuPont HL, Connor BA. ACG Clinical Guideline: Diagnosis, Treatment, and Prevention of Acute Diarrheal Infections in Adults. Am J Gastroenterol. 2016;111(5):602-622.",
   "Shane AL et al. 2017 Infectious Diseases Society of America Clinical Practice Guidelines for the Diagnosis and Management of Infectious Diarrhea. Clin Infect Dis. 2017;65(12):e45-e80.",
   "Guarino A et al. ESPGHAN/ESPID evidence-based guidelines for the management of acute gastroenteritis in children in Europe: update 2014. J Pediatr Gastroenterol Nutr. 2014;59(1):132-152.",
   "Hospital das Clínicas da FMUSP (Levin AS, Costa SF, coord.). Antimicrobianos na prática clínica: um guia para profissionais da atenção primária. 1ª ed. São Paulo; 2024."
  ]
 },
 {
  "id": "constipacao",
  "tipo": "condicao",
  "cond": "constipacao",
  "nm": "Constipação",
  "sub": "intestino preso · laxante osmótico · fecaloma · criança",
  "kw": "constipacao constipacao intestinal intestino preso prisao de ventre fezes duras fecaloma impactacao fecal escape fecal encoprese laxante laxativo macrogol polietilenoglicol peg lactulose fibra psyllium bisacodil senna oleo mineral supositorio de glicerina enema clister glicerinado",
  "draft": true,
  "revisado": null,
  "resumo": "Constipação funcional é muito comum e se trata com fibra, água, hábito intestinal e laxante osmótico — o polietilenoglicol tem a melhor evidência em adultos e crianças. No plantão, procure sinais de alarme e de obstrução, desfaça o fecaloma e não suspenda o laxante cedo demais.",
  "secoes": [
   {
    "t": "Quando pensar / diagnóstico",
    "itens": [
     "Menos de 3 evacuações por semana, fezes duras, esforço, sensação de evacuação incompleta ou manobras manuais.",
     "Revise remédios constipantes: opioides, anticolinérgicos, ferro, cálcio, verapamil, antiácidos com alumínio.",
     "Causas secundárias: hipotireoidismo, hipercalcemia, diabetes, gestação, imobilidade, doença neurológica.",
     "Idoso acamado com diarreia paradoxal ou incontinência: pensar em fecaloma.",
     "Criança: retenção voluntária (dor ao evacuar, desfralde, escola); escape de fezes na roupa costuma ser por retenção."
    ]
   },
   {
    "t": "Exame físico: o que procurar",
    "itens": [
     "Abdome: distensão, massa fecal palpável, timpanismo, peritonite.",
     "Inspeção anal e toque retal: fissura, hemorroida, fecaloma, tônus, sangue.",
     "Criança: peso e crescimento, região lombossacra (fosseta, tufo de pelos) e exame neurológico das pernas."
    ]
   },
   {
    "t": "Exames complementares",
    "itens": [
     "Constipação funcional sem alarme: não precisa de exame.",
     "RX de abdome só se dúvida de obstrução ou para ver fecaloma quando o toque não for possível.",
     "Sinais de alarme no adulto: hemograma e encaminhar para colonoscopia.",
     "Constipação recente sem causa aparente: considerar TSH, cálcio e glicemia."
    ]
   },
   {
    "t": "Conduta",
    "itens": [
     "Medidas gerais: fibra, 1,5 a 2 litros de água por dia, atividade física e ir ao banheiro após o café, com os pés apoiados.",
     "Adulto: polietilenoglicol (macrogol) é a primeira escolha; lactulose é a alternativa do SUS, com mais gases.",
     "Fibra solúvel (psyllium) ajuda na constipação leve; aumentar aos poucos e com água.",
     "Bisacodil ou senna como resgate ou por curto prazo (até cerca de 4 semanas).",
     "Fecaloma: desimpactar primeiro (enema ou PEG em dose alta) e depois manter laxante diário.",
     "Criança: PEG é o único laxante com recomendação forte; desimpactação com dose alta por 3 a 6 dias e manutenção por pelo menos 2 meses.",
     "Lactulose fica para lactentes pequenos ou quando não houver PEG."
    ]
   },
   {
    "t": "Sinais de alarme e quando internar/encaminhar",
    "itens": [
     "Dor intensa, vômitos, distensão e parada de eliminação de gases: obstrução — avaliar com a cirurgia.",
     "Sangue nas fezes, anemia, perda de peso, início após 45–50 anos ou história familiar de câncer colorretal: colonoscopia.",
     "Criança: início no 1º mês, mecônio após 48 h, fezes em fita, distensão importante, vômitos biliosos, falha de crescimento ou alteração neurológica.",
     "Fecaloma em idoso com confusão, retenção urinária ou febre."
    ],
    "alerta": true
   },
   {
    "t": "Orientações ao paciente",
    "itens": [
     "Coma frutas, verduras, feijão e alimentos integrais e beba água ao longo do dia.",
     "Aproveite a vontade depois do café da manhã, não adie a evacuação e apoie os pés num banquinho no vaso.",
     "Não pare o laxante por conta própria quando melhorar: a retirada é gradual, combinada com o médico.",
     "Volte se tiver dor forte, barriga muito inchada, vômitos, se não eliminar gases ou se sangrar pelo ânus."
    ]
   },
   {
    "t": "Outras opções (material do médico)",
    "itens": [
     "Óleo mineral — lubrificante por curto prazo no adulto (modelo do médico); risco de pneumonia lipoídica: não usar ao deitar, em acamado, idoso frágil, gestante ou disfagia.",
     "Supositório de glicerina — resgate retal quando passa de 3 dias sem evacuar.",
     "Enema glicerinado (clister) — desimpactação do fecaloma no PS após toque retal; não usar se suspeita de obstrução ou perfuração."
    ],
    "offlabel": true
   }
  ],
  "pendencias": [
   "Material do médico (Meu rascunho) usa lactulose 20 mL 3x/dia, óleo mineral e supositório de glicerina; DATA usa lactulose 15 mL 1x/dia e não tem os outros dois — decidir doses.",
   "DATA ('Opção 2' e 'Opção 3') usa macrogol por só 3 dias com simeticona; constipação crônica pede uso contínuo e simeticona não trata constipação — revisar.",
   "Constipação não tem modo Internação no DATA; o Drive faz enema glicerinado de 500 mL 6/6h ou 1.000 mL 8/8h — proposto 500 mL com reavaliação; decidir.",
   "Não existe rota 'USO RETAL' no site; supositório e enema foram propostos como USO TÓPICO com 'via retal' na posologia — decidir se cria a rota.",
   "Drive cita docusato + bisacodil e Saccharomyces na constipação — sem ganho comprovado; não propostos.",
   "ESPGHAN/NASPGHAN 2026 não faz recomendação formal para lactulose; o DATA pediátrico a mantém como alternativa — ok?"
  ],
  "fontes": [
   "Chang L et al. American Gastroenterological Association–American College of Gastroenterology Clinical Practice Guideline: Pharmacological Management of Chronic Idiopathic Constipation. Am J Gastroenterol. 2023;118(6):936-954.",
   "Gordon M et al. ESPGHAN/NASPGHAN guidelines for treatment of functional constipation in children aged 0–18 years. J Pediatr Gastroenterol Nutr. 2026;83:335-366."
  ]
 },
 {
  "id": "meteorismo",
  "tipo": "condicao",
  "cond": "meteorismo",
  "nm": "Meteorismo (gases)",
  "sub": "gases · distensão · flatulência · simeticona · dieta",
  "kw": "meteorismo gases flatulencia distensao abdominal estufamento barriga inchada arroto eructacao aerofagia colica de gases intolerancia a lactose fodmap intestino irritavel simeticona dimeticona escopolamina butilbrometo",
  "draft": true,
  "revisado": null,
  "resumo": "Gases e distensão costumam ser funcionais: ar engolido, fermentação de alimentos, constipação ou intestino irritável. No plantão, confirme que não há obstrução nem abdome agudo; o tratamento é sintomático e de dieta, com investigação ambulatorial se houver sinais de alarme.",
  "secoes": [
   {
    "t": "Quando pensar / diagnóstico",
    "itens": [
     "Distensão que piora ao longo do dia e melhora à noite, com arrotos ou flatos: causa funcional.",
     "Aerofagia: comer rápido, chiclete, bebida gasosa, ansiedade.",
     "Fermentação: feijão, repolho, cebola, adoçantes (sorbitol, xilitol) e leite em quem tem intolerância à lactose.",
     "Com constipação ou dor que alivia ao evacuar: intestino irritável.",
     "Distensão progressiva e persistente, perda de peso ou ascite: não é só gases — investigar."
    ]
   },
   {
    "t": "Exame físico: o que procurar",
    "itens": [
     "Abdome timpânico, flácido e pouco doloroso é o esperado.",
     "Distensão tensa, ruídos metálicos ou ausentes, peritonite: obstrução ou íleo.",
     "Procure macicez móvel (ascite), massas, hérnias e sinais de anemia."
    ]
   },
   {
    "t": "Exames complementares",
    "itens": [
     "Quadro típico sem alarme: não precisa de exame.",
     "RX de abdome só se suspeita de obstrução ou volvo.",
     "Sintomas persistentes, na UBS: hemograma, TSH e sorologia para doença celíaca; colonoscopia se alarme."
    ]
   },
   {
    "t": "Conduta",
    "itens": [
     "Simeticona alivia sintomas pontuais; associar escopolamina se houver cólica.",
     "Ajustar a dieta: menos alimentos fermentáveis; testar 2 semanas sem leite se suspeita de intolerância à lactose.",
     "Tratar a constipação quando presente.",
     "Dieta pobre em FODMAP por tempo limitado, com orientação, ajuda no intestino irritável.",
     "Probiótico não é recomendado para distensão (AGA 2023).",
     "Metoclopramida e outros procinéticos não têm papel nos gases."
    ]
   },
   {
    "t": "Sinais de alarme e quando internar/encaminhar",
    "itens": [
     "Dor intensa ou contínua, vômitos, parada de gases e fezes: obstrução.",
     "Febre, sangue nas fezes ou peritonite.",
     "Perda de peso, anemia, mudança recente do hábito intestinal ou início após os 50 anos: investigar.",
     "Distensão progressiva com ascite ou massa."
    ],
    "alerta": true
   },
   {
    "t": "Orientações ao paciente",
    "itens": [
     "Coma devagar e mastigue bem; evite chiclete, balas, canudo, refrigerante e cigarro.",
     "Diminua feijão, repolho, brócolis, cebola e adoçantes como sorbitol e xilitol.",
     "Mantenha atividade física, beba água e cuide para o intestino funcionar todo dia.",
     "Volte se tiver dor forte, barriga dura e inchada, vômitos, febre ou sangue nas fezes."
    ]
   },
   {
    "t": "Outras opções (material do médico)",
    "itens": [
     "Simeticona em gotas (75 mg/mL) — mesma substância do comprimido, na forma que o médico usa; cerca de 80 mg após as refeições e ao deitar."
    ],
    "offlabel": true
   }
  ],
  "pendencias": [
   "DATA ('Receita' em Outras opções) associa metoclopramida e dipirona à simeticona; metoclopramida não tem indicação nos gases (EMA 2013 restringe a náusea, até 5 dias) — retirar ou rotular.",
   "Material do Drive usa simeticona em gotas 16 gotas 8/8h por 3 dias; o médico usa 16 gotas 6/6h — escolher a frequência.",
   "A evidência da simeticona é fraca; manter como sintomático, sem promessa de grande efeito."
  ],
  "fontes": [
   "Moshiree B, Drossman D, Shaukat A. AGA Clinical Practice Update on Evaluation and Management of Belching, Abdominal Bloating, and Distention: Expert Review. Gastroenterology. 2023;165(3):791-800.",
   "Lacy BE et al. ACG Clinical Guideline: Management of Irritable Bowel Syndrome. Am J Gastroenterol. 2021;116(1):17-44.",
   "European Medicines Agency. European Medicines Agency recommends changes to the use of metoclopramide. 2013."
  ]
 },
 {
  "id": "hemorroida",
  "tipo": "condicao",
  "cond": "hemorroida",
  "nm": "Doença hemorroidária trombosada",
  "sub": "hemorroida · trombose hemorroidária · banho de assento · fibras",
  "kw": "hemorroida hemorroidas doenca hemorroidaria crise hemorroidaria trombose hemorroidaria hemorroida externa trombosada mamilo hemorroidario dor anal sangramento anal sangue vivo fissura anal prolapso abscesso perianal banho de assento psyllium fibra diosmina hesperidina flavonoide lidocaina pomada anestesica excisao",
  "draft": true,
  "revisado": null,
  "resumo": "Hemorroida externa trombosada causa dor anal súbita com nódulo arroxeado e endurecido. Nas primeiras 72 horas, com dor forte, a retirada do trombo sob anestesia local alivia mais rápido; depois disso, o tratamento clínico (fibras, banho de assento, analgesia) resolve em 1 a 2 semanas.",
  "secoes": [
   {
    "t": "Quando pensar / diagnóstico",
    "itens": [
     "Dor anal súbita e contínua com nódulo azulado endurecido na borda do ânus, muitas vezes após esforço para evacuar.",
     "Hemorroida interna: sangue vermelho vivo ao evacuar, sem dor, com ou sem prolapso.",
     "Dor forte ao evacuar com pouco sangue e fissura visível: fissura anal (tratamento diferente).",
     "Dor com febre e abaulamento quente e flutuante: abscesso perianal — drenar.",
     "Sangramento com mudança do hábito intestinal, anemia ou idade de rastreamento: investigar câncer colorretal."
    ]
   },
   {
    "t": "Exame físico: o que procurar",
    "itens": [
     "Inspeção com boa luz, afastando as nádegas: trombo externo, prolapso, fissura, abscesso, fístula.",
     "Toque retal quando tolerado; pode ser adiado se o trombo é evidente e a dor muito forte.",
     "Hemorroida interna prolapsada, encarcerada e escura: urgência cirúrgica.",
     "Anotar quando a dor começou (antes ou depois de 72 horas)."
    ]
   },
   {
    "t": "Exames complementares",
    "itens": [
     "Diagnóstico clínico; não precisa de exame no PS.",
     "Hemograma se sangramento volumoso ou suspeita de anemia.",
     "Colonoscopia ambulatorial se sangramento com sinais de alarme ou idade de rastreamento."
    ]
   },
   {
    "t": "Conduta",
    "itens": [
     "Trombose com até cerca de 72 horas e dor intensa: retirada do trombo sob anestesia local (excisão, pela ASCRS), com cirurgia ou coloproctologia.",
     "Depois de 72 horas ou dor tolerável: tratamento clínico; regride em 7 a 14 dias.",
     "Fibra (psyllium) e água para fezes macias; nada de esforço nem tempo longo no vaso.",
     "Banho de assento morno várias vezes ao dia e após evacuar.",
     "Analgesia com dipirona e AINE por poucos dias; anestésico tópico alivia por curto prazo.",
     "Flavonoides (diosmina + hesperidina) podem reduzir dor e sangramento na crise.",
     "Pomada com corticoide só por poucos dias (afina a pele)."
    ]
   },
   {
    "t": "Sinais de alarme e quando internar/encaminhar",
    "itens": [
     "Sangramento volumoso, anemia ou instabilidade.",
     "Febre, pus ou dor que piora apesar do remédio: abscesso ou infecção.",
     "Hemorroida interna encarcerada, escura ou necrótica.",
     "Retenção urinária.",
     "Sangramento em anticoagulado, cirrótico ou imunossuprimido."
    ],
    "alerta": true
   },
   {
    "t": "Orientações ao paciente",
    "itens": [
     "Faça banho de assento com água morna (teste a temperatura) por 10 a 15 minutos, 3 a 4 vezes ao dia e após evacuar.",
     "Coma fibras e beba 8 a 10 copos de água por dia; não faça força nem fique mais de 5 minutos sentado no vaso.",
     "Depois de evacuar, lave com água em vez de usar papel higiênico.",
     "Volte se tiver sangramento grande, febre, pus, dor que não melhora ou dificuldade para urinar."
    ]
   }
  ],
  "pendencias": [
   "ASCRS 2024 sugere excisão precoce do trombo (até cerca de 72 h); a atualização da AGA de 2026 prefere incisão e drenagem — decidir qual técnica o site recomenda (e se vira procedimento).",
   "O nome da condição diz 'trombosada', mas o Padrão serve para toda crise hemorroidária — renomear para 'Doença hemorroidária / crise hemorroidária'?",
   "Diosmina + hesperidina no DATA: 6 cp/dia por 4 dias e 4 cp/dia por 3 dias (esquema de crise) — conferir com a bula da apresentação disponível.",
   "Outras opções ('Receita') tem pomada de policresuleno + cinchocaína pelo nome comercial e 'até melhora' — limitar a 7 dias? O material do Drive não traz opção nova."
  ],
  "fontes": [
   "Hawkins AT et al. The American Society of Colon and Rectal Surgeons Clinical Practice Guidelines for the Management of Hemorrhoids. Dis Colon Rectum. 2024;67(5):614-623.",
   "van Tol RR et al. European Society of ColoProctology: guideline for haemorrhoidal disease. Colorectal Dis. 2020;22(6):650-662.",
   "American Gastroenterological Association (Qureshi W et al.). Clinical Practice Update sobre diagnóstico e tratamento da doença hemorroidária (revisão de especialistas). Clin Gastroenterol Hepatol. 2026."
  ]
 },
 {
  "id": "parasitoses",
  "tipo": "condicao",
  "cond": "parasitoses",
  "nm": "Parasitoses intestinais",
  "sub": "verminose · albendazol · giardíase · estrongiloidíase · oxiúros",
  "kw": "parasitoses intestinais verminose vermes lombriga ascaris ascaridiase ancilostomo amarelao tricuriase oxiuros oxiuriase coceira anal estrongiloides estrongiloidiase giardia giardiase ameba amebiase teniase solitaria cisticercose neurocisticercose esquistossomose albendazol mebendazol ivermectina secnidazol tinidazol metronidazol nitazoxanida praziquantel teclozana parasitologico de fezes",
  "draft": true,
  "revisado": null,
  "resumo": "Verminoses são comuns onde falta saneamento; o albendazol por 3 dias cobre a maioria dos helmintos e giardíase/amebíase intestinal respondem a nitroimidazol em dose única ou curta. Dois cenários graves: suboclusão por áscaris na criança e estrongiloidíase disseminada em quem vai usar corticoide.",
  "secoes": [
   {
    "t": "Quando pensar / diagnóstico",
    "itens": [
     "Dor abdominal, diarreia, náuseas, falta de apetite, perda de peso ou anemia em criança de área sem saneamento.",
     "Coceira anal à noite, sobretudo em crianças da mesma casa: oxiúros.",
     "Diarreia persistente, gordurosa e com gases: giardíase.",
     "Diarreia com sangue e cólica: amebíase (diferenciar de disenteria bacteriana).",
     "Eosinofilia, lesão de pele serpiginosa ou sintomas pulmonares: estrongiloidíase e outros helmintos.",
     "Pedaços brancos (proglotes) nas fezes: teníase."
    ]
   },
   {
    "t": "Exame físico: o que procurar",
    "itens": [
     "Estado nutricional, palidez e hidratação.",
     "Abdome: distensão, massa palpável (bolo de áscaris), sinais de obstrução.",
     "Região perianal (escoriações) quando houver coceira.",
     "Imunossuprimido ou em corticoide com febre, dor abdominal e falta de ar: pensar em hiperinfecção por estrongiloides."
    ]
   },
   {
    "t": "Exames complementares",
    "itens": [
     "Tratamento empírico sem exame é aceitável no quadro típico.",
     "Parasitológico de fezes em 3 amostras se os sintomas persistirem após o tratamento.",
     "Oxiúros: fita adesiva perianal pela manhã (o parasitológico comum costuma ser negativo).",
     "Hemograma (anemia, eosinofilia); sorologia para estrongiloides antes de imunossupressão, se disponível.",
     "Suspeita de suboclusão: RX e USG de abdome; neurocisticercose: TC ou RM de crânio."
    ]
   },
   {
    "t": "Conduta",
    "itens": [
     "Helmintíases (empírico): albendazol 400 mg por 3 dias; dose única basta para áscaris, mas cobre menos ancilóstomo e tricuríase.",
     "Oxiúros: albendazol dose única, repetida em 2 semanas, tratando todos da casa.",
     "Estrongiloidíase, ou risco antes de corticoide e imunossupressão: ivermectina 200 mcg/kg (não usar abaixo de 15 kg).",
     "Giardíase e amebíase intestinal: secnidazol 2 g dose única (criança 30 mg/kg); alternativas tinidazol, metronidazol ou nitazoxanida.",
     "Amebíase invasiva (colite grave, abscesso hepático): metronidazol EV seguido de agente luminal, internado.",
     "Criança de 1 a 2 anos: albendazol 200 mg; abaixo de 1 ano, só com orientação especializada.",
     "Neurocisticercose não se trata no PS: neuroimagem, fundoscopia e neurologia antes do antiparasitário; corticoide antes do albendazol."
    ]
   },
   {
    "t": "Sinais de alarme e quando internar/encaminhar",
    "itens": [
     "Vômitos, distensão, cólica forte e parada de fezes na criança: suboclusão por áscaris — dieta zero e cirurgia.",
     "Icterícia ou dor em HCD com febre: áscaris na via biliar ou abscesso hepático amebiano.",
     "Febre, sepse por gram-negativo ou insuficiência respiratória em imunossuprimido: hiperinfecção por estrongiloides.",
     "Diarreia com sangue, febre alta ou desidratação.",
     "Convulsão, cefaleia nova ou déficit focal: neurocisticercose."
    ],
    "alerta": true
   },
   {
    "t": "Orientações ao paciente",
    "itens": [
     "Lave as mãos com água e sabão antes de comer e depois de usar o banheiro; mantenha as unhas curtas.",
     "Beba água filtrada ou fervida, lave bem frutas e verduras e não ande descalço.",
     "Se houver coceira no ânus à noite, trate todos da casa e lave roupas de cama e toalhas.",
     "Não beba álcool durante o tratamento com secnidazol, tinidazol ou metronidazol e por alguns dias depois.",
     "Volte se tiver vômitos repetidos, barriga inchada, dor forte, sangue nas fezes ou febre alta."
    ]
   },
   {
    "t": "Outras opções (material do médico)",
    "itens": [
     "Tinidazol 2 g dose única — alternativa ao secnidazol na giardíase, de primeira linha em diretrizes internacionais; mesmo cuidado com álcool.",
     "Metronidazol 250 mg de 8/8h por 5 a 7 dias — giardíase no adulto (guia HC-FMUSP 2024); mais dias e mais efeitos gastrointestinais.",
     "Mebendazol 100 mg de 12/12h por 3 dias — alternativa ao albendazol em comprimido para o adulto; oxiúros: dose única repetida em 2 semanas."
    ],
    "offlabel": true
   }
  ],
  "pendencias": [
   "Ivermectina no DATA (adulto): dose fixa de 12 mg repetida após 7 dias; CDC usa 200 mcg/kg por 1 a 2 dias, sem repetir em 7 dias — ajustar pelo peso e definir o esquema.",
   "Outras opções do DATA têm 'Cisticercose' e 'Neurocisticercose' ambulatoriais com praziquantel + prednisona; IDSA/ASTMH 2017 exige neuroimagem e prefere albendazol com corticoide — retirar do ambulatorial ou rotular 'só com neurologia'.",
   "Albendazol nas 'Opção 2/3' do DATA repete após 10 dias; para oxiúros o intervalo usual é 2 semanas — rotular por indicação.",
   "Teclozana (agente luminal no bloco de amebíase invasiva) tem disponibilidade irregular no Brasil — confirmar ou trocar.",
   "Material do Drive (Medicações Pediatria) cita pirvínio para oxiúros — não proposto (albendazol e mebendazol já cobrem)."
  ],
  "fontes": [
   "World Health Organization. Guideline: preventive chemotherapy to control soil-transmitted helminth infections in at-risk population groups. Geneva: WHO; 2017.",
   "Centers for Disease Control and Prevention. Clinical Care of Strongyloides (página para profissionais de saúde). Consultado em 2026.",
   "White AC Jr et al. Diagnosis and Treatment of Neurocysticercosis: 2017 Clinical Practice Guidelines by the IDSA and the ASTMH. Clin Infect Dis. 2018;66(8):e49-e75.",
   "Hospital das Clínicas da FMUSP (Levin AS, Costa SF, coord.). Antimicrobianos na prática clínica: um guia para profissionais da atenção primária. 1ª ed. São Paulo; 2024."
  ]
 },
 {
  "id": "colica_nefretica",
  "tipo": "condicao",
  "cond": "colica_nefretica",
  "nm": "Cólica nefrética",
  "sub": "cálculo renal · ureterolitíase · AINE · tansulosina · obstrução infectada",
  "kw": "colica nefretica colica renal calculo renal pedra no rim litiase nefrolitiase urolitiase ureterolitiase dor lombar irradiada para virilha hematuria giordano obstrucao infectada hidronefrose tansulosina terapia expulsiva diclofenaco cetoprofeno tenoxicam ibuprofeno dipirona tramadol morfina tomografia sem contraste ultrassom",
  "draft": true,
  "revisado": null,
  "resumo": "Dor lombar em cólica, intensa, irradiada para a virilha, com hematúria: em geral um cálculo que sai sozinho com analgesia (AINE primeiro) e, se distal e maior que 5 mm, tansulosina. A decisão crítica é reconhecer obstrução com infecção, rim único ou dor refratária, que exigem desobstrução urgente.",
  "secoes": [
   {
    "t": "Quando pensar / diagnóstico",
    "itens": [
     "Dor lombar ou no flanco súbita, em cólica, irradiando para virilha, testículo ou grande lábio, com inquietação, náuseas e vômitos.",
     "Hematúria (macro ou micro) aparece na maioria, mas sua ausência não exclui.",
     "Primeiro episódio depois dos 50–60 anos: afastar aneurisma de aorta antes de fechar cólica renal.",
     "Diferenciais: pielonefrite, apendicite, gravidez ectópica, torção de ovário ou de testículo, dissecção de aorta, colecistite."
    ]
   },
   {
    "t": "Exame físico: o que procurar",
    "itens": [
     "Sinais vitais: febre ou hipotensão mudam tudo (obstrução infectada, sepse).",
     "Punho-percussão lombar (Giordano) dolorosa com abdome sem peritonite.",
     "No idoso, palpar pulsos e procurar massa pulsátil; no homem, examinar os testículos."
    ]
   },
   {
    "t": "Exames complementares",
    "itens": [
     "Urina tipo I (hematúria, leucócitos, nitrito) e urocultura se sinais de infecção.",
     "Creatinina; hemograma e PCR se febre; beta-hCG em mulher em idade fértil.",
     "TC de abdome sem contraste em baixa dose é o padrão para confirmar o cálculo, o tamanho e o local.",
     "USG é a primeira escolha na gestante e na criança e serve de triagem (hidronefrose); o POCUS ajuda no PS.",
     "Primeiro episódio típico com dor controlada: a imagem pode ser feita ambulatorialmente, em poucos dias."
    ]
   },
   {
    "t": "Conduta",
    "itens": [
     "AINE é a primeira escolha (diclofenaco, cetoprofeno, ibuprofeno, tenoxicam), salvo doença renal, úlcera, gestação ou risco cardiovascular alto.",
     "Dipirona associada ou como alternativa ao AINE; opioide (tramadol, morfina) só para dor refratária.",
     "Antiespasmódico não acrescenta analgesia ao AINE; não há evidência de que hidratação EV forçada acelere a saída do cálculo.",
     "Tansulosina 0,4 mg por até 4 semanas no cálculo ureteral distal maior que 5 mm (off-label, recomendado pela EAU).",
     "Cálculo de até 10 mm sem complicação: conduta expectante com analgesia; maior que 10 mm ou que não progride: urologia.",
     "Coar a urina e guardar o cálculo para análise; consulta com urologia em até 4 semanas."
    ]
   },
   {
    "t": "Sinais de alarme e quando internar/encaminhar",
    "itens": [
     "Febre ou sinais de infecção com obstrução: desobstrução urgente (cateter duplo J ou nefrostomia) e antibiótico.",
     "Rim único, rim transplantado ou obstrução bilateral; anúria ou piora da creatinina.",
     "Dor refratária à analgesia EV ou vômitos incoercíveis.",
     "Gestante com cólica renal.",
     "Idoso com dor lombar e hipotensão: aneurisma de aorta até prova em contrário."
    ],
    "alerta": true
   },
   {
    "t": "Orientações ao paciente",
    "itens": [
     "Beba água ao longo do dia até a urina ficar clara; diminua sal, excesso de carne e refrigerantes.",
     "Coe a urina e guarde a pedra, se sair, para levar à consulta.",
     "A tansulosina pode dar tontura ao levantar: levante devagar.",
     "Volte imediatamente se tiver febre, calafrios, dor que não melhora com o remédio, vômitos que não param ou se urinar muito pouco."
    ]
   },
   {
    "t": "Outras opções (material do médico)",
    "itens": [
     "Cetoprofeno 100 mg EV, diclofenaco 75 mg IM ou tenoxicam 20 mg EV/IM — AINE parenteral no PS (modelo do médico e PDFs); evitar em doença renal, úlcera e gestação.",
     "Dipirona EV com metoclopramida — junto com o AINE, ou sozinha se o AINE for contraindicado.",
     "Tramadol EV ou morfina titulada — dor refratária ao AINE e à dipirona; associar antiemético.",
     "Tramadol 50 mg oral por até 3 dias — resgate em casa se o AINE não bastar; náusea, tontura e constipação são comuns."
    ],
    "offlabel": true
   }
  ],
  "pendencias": [
   "Cólica nefrética não tem modo Internação no DATA; o médico usa cetoprofeno + escopolamina + dipirona EV na observação (Meu rascunho) e os PDFs trazem tenoxicam, diclofenaco IM, tramadol e morfina — propostos como Outras opções; decidir se viram Padrão de Internação.",
   "Escopolamina no esquema EV do médico: Cochrane 2015 não mostra ganho de analgesia ao somar antiespasmódico ao AINE — manter só AINE + dipirona?",
   "Drive (Tigers e Principais condutas) traz associação de carisoprodol + cafeína + paracetamol + diclofenaco — não proposta (sem evidência na cólica renal).",
   "No DATA o cetoprofeno 150 mg do Padrão está 'se dor', e diclofenaco/ibuprofeno em horário fixo — padronizar a forma de uso.",
   "Prescrição de pronto atendimento (Drive) faz SF 500 mL de rotina; hidratação EV só se desidratado ou vomitando — decidir."
  ],
  "fontes": [
   "Skolarikos A et al. European Association of Urology Guidelines on the Diagnosis and Treatment of Urolithiasis. Eur Urol. 2025;88(1):64-75.",
   "Pathan SA et al. Delivering safe and effective analgesia for management of renal colic in the emergency department: a double-blind, multigroup, randomised controlled trial. Lancet. 2016;387(10032):1999-2007.",
   "Afshar K, Jafari S, Marks AJ, Eftekhari A, MacNeily AE. Nonsteroidal anti-inflammatory drugs (NSAIDs) and non-opioids for acute renal colic. Cochrane Database Syst Rev. 2015;(6):CD006027."
  ]
 },
 {
  "id": "itu",
  "tipo": "condicao",
  "cond": "itu",
  "nm": "ITU / Cistite",
  "sub": "cistite · disúria · fosfomicina · nitrofurantoína · gestante · criança",
  "kw": "itu infeccao urinaria infeccao do trato urinario cistite disuria ardencia para urinar ardor polaciuria urgencia urinaria urina turva hematuria bacteriuria assintomatica gestante homem crianca urocultura antibiograma fita urinaria nitrito nitrofurantoina fosfomicina cefalexina amoxicilina sulfametoxazol trimetoprima norfloxacino ciprofloxacino cefuroxima fenazopiridina",
  "draft": true,
  "revisado": null,
  "resumo": "Cistite na mulher não gestante é diagnóstico clínico (disúria e polaciúria sem corrimento) e se trata sem exame, com fosfomicina dose única ou nitrofurantoína por 5 dias. Gestante, homem, criança, recorrência ou falha pedem urocultura; febre ou dor lombar indicam pielonefrite.",
  "secoes": [
   {
    "t": "Quando pensar / diagnóstico",
    "itens": [
     "Disúria, polaciúria, urgência e dor suprapúbica, sem corrimento vaginal: probabilidade alta de cistite.",
     "Corrimento ou coceira vaginal: pensar em vaginite ou IST; no homem, corrimento uretral sugere uretrite.",
     "Febre, calafrios, dor lombar ou Giordano positivo: pielonefrite.",
     "Homem com sintomas urinários e febre ou dor perineal: prostatite.",
     "Idoso confuso sem sintomas urinários: urina alterada isolada não confirma ITU (bacteriúria assintomática é comum).",
     "Criança: febre sem foco abaixo de 2 anos, choro ao urinar, perda de urina nova, urina com cheiro forte."
    ]
   },
   {
    "t": "Exame físico: o que procurar",
    "itens": [
     "Temperatura, dor suprapúbica e punho-percussão lombar.",
     "Mulher com corrimento ou dor pélvica: exame ginecológico.",
     "Homem: genitália, epidídimo e próstata (toque suave, sem massagem).",
     "Criança: estado geral, hidratação e genitália (fimose, sinéquia)."
    ]
   },
   {
    "t": "Exames complementares",
    "itens": [
     "Mulher não gestante com cistite típica: não precisa de exame.",
     "Urocultura com antibiograma, antes do antibiótico, em gestante, homem, criança, recorrência, falha ou ITU no último mês.",
     "Fita urinária: nitrito positivo é específico; leucócitos e nitrito negativos tornam ITU menos provável.",
     "Criança sem controle esfincteriano: urina por sondagem ou punção suprapúbica; saco coletor só vale se negativo.",
     "Gestante: rastrear e tratar bacteriúria assintomática no pré-natal."
    ]
   },
   {
    "t": "Conduta",
    "itens": [
     "Mulher não gestante: fosfomicina 3 g dose única ou nitrofurantoína 100 mg de 6/6h por 5 dias.",
     "SMX-TMP e quinolonas não são primeira escolha empírica (resistência alta e alertas de segurança das quinolonas).",
     "Nitrofurantoína: evitar se ClCr menor que 30 mL/min, no termo da gestação e se suspeita de pielonefrite.",
     "Gestante: cefalexina, amoxicilina ou fosfomicina por 5 a 7 dias, ajustadas pela urocultura, com urocultura de controle.",
     "Homem: tratar por 7 dias e pensar em prostatite se febre ou dor perineal.",
     "Criança com cistite sem febre: cefalexina ou nitrofurantoína por 5 dias; ITU febril é conduzida como pielonefrite.",
     "Fenazopiridina por até 2 dias alivia a ardência; colher a urina antes, porque altera a fita."
    ]
   },
   {
    "t": "Sinais de alarme e quando internar/encaminhar",
    "itens": [
     "Febre, calafrios, dor lombar ou vômitos: pielonefrite.",
     "Sepse, hipotensão ou confusão.",
     "Gestante com febre ou dor lombar: internar.",
     "Criança abaixo de 3 meses com ITU, toxemiada ou desidratada: internar para antibiótico EV.",
     "Sem melhora em 48 a 72 horas: urocultura e rever o diagnóstico."
    ],
    "alerta": true
   },
   {
    "t": "Orientações ao paciente",
    "itens": [
     "Beba bastante água, não segure a urina e urine depois das relações sexuais.",
     "Tome o antibiótico até o fim, mesmo que melhore antes.",
     "A fenazopiridina deixa a urina alaranjada; isso é esperado.",
     "Volte imediatamente se tiver febre, calafrios, dor nas costas, vômitos ou se não melhorar em 2 a 3 dias."
    ]
   },
   {
    "t": "Outras opções (material do médico)",
    "itens": [
     "Cefalexina, amoxicilina ou fosfomicina na gestante — cistite ou bacteriúria na gravidez por 5 a 7 dias, ajustando pela urocultura (guia HC-FMUSP 2024).",
     "SMX-TMP ou nitrofurantoína por 7 dias no homem — cistite masculina sem sinais de prostatite, sempre com urocultura (guia HC-FMUSP 2024)."
    ],
    "offlabel": true
   }
  ],
  "pendencias": [
   "Guia HC-FMUSP 2024 (material do médico) põe SMX-TMP 3 dias e norfloxacino 3 dias como 1ª linha, junto com fosfomicina e nitrofurantoína; DATA os deixa em Outras opções por resistência maior que 20% — confirmar com dados locais.",
   "Ajuste renal da nitrofurantoína: guia HC diz evitar se ClCr menor que 60; DATA e Beers 2023 usam menor que 30 — decidir.",
   "Duração da nitrofurantoína: guia HC 3 a 5 dias; DATA 5 dias — manter 5?",
   "Material do Drive cita levofloxacino e ciprofloxacino 250 mg na cistite; quinolona deve ficar restrita (EMA 2018) e o DATA já tem cipro e norflox em Outras opções — não proposto.",
   "Não há bloco de gestante nem de homem no DATA (só uma orientação) — propostos em Outras opções; decidir se entram no Padrão.",
   "Tigers usa aminoglicosídeo IM na ITU grave da gestante; evitar (ototoxicidade fetal) — não proposto."
  ],
  "fontes": [
   "Gupta K et al. International clinical practice guidelines for the treatment of acute uncomplicated cystitis and pyelonephritis in women: a 2010 update by IDSA and ESCMID. Clin Infect Dis. 2011;52(5):e103-e120.",
   "Hospital das Clínicas da FMUSP (Levin AS, Costa SF, coord.). Antimicrobianos na prática clínica: um guia para profissionais da atenção primária. 1ª ed. São Paulo; 2024.",
   "European Association of Urology. EAU Guidelines on Urological Infections. Edição 2025.",
   "Sociedade Brasileira de Pediatria, Departamento Científico de Nefrologia. Infecção do trato urinário em pediatria: existe consenso entre os consensos? Documento científico. 2021.",
   "American Geriatrics Society Beers Criteria Update Expert Panel. American Geriatrics Society 2023 updated AGS Beers Criteria for potentially inappropriate medication use in older adults. J Am Geriatr Soc. 2023;71(7):2052-2081."
  ]
 },
 {
  "id": "pielonefrite",
  "tipo": "condicao",
  "cond": "pielonefrite",
  "nm": "Pielonefrite",
  "sub": "ITU febril · dor lombar · ceftriaxona · ciprofloxacino · urossepse",
  "kw": "pielonefrite infeccao urinaria alta itu febril febre dor lombar giordano punho percussao calafrios urossepse sepse urinaria obstrucao abscesso renal gestante crianca lactente urocultura hemocultura ceftriaxona ciprofloxacino levofloxacino gentamicina amicacina piperacilina tazobactam meropenem cefuroxima cefalexina sulfametoxazol trimetoprima",
  "draft": true,
  "revisado": null,
  "resumo": "Febre com dor lombar e sintomas urinários: colher urocultura e tratar já. Paciente estável, que tolera via oral, vai para casa com dose inicial parenteral e quinolona por 7 dias; sepse, gestação, vômitos, obstrução ou falha indicam internação — e obstrução com infecção exige desobstrução urgente.",
  "secoes": [
   {
    "t": "Quando pensar / diagnóstico",
    "itens": [
     "Febre ou calafrios com dor lombar ou no flanco e Giordano positivo, com ou sem disúria.",
     "Náuseas e vômitos são comuns; os sintomas de cistite podem faltar.",
     "Idoso: confusão, queda ou hipotensão podem ser a única manifestação.",
     "Criança: febre sem foco no lactente, vômitos, irritabilidade e recusa alimentar.",
     "Diferenciais: cálculo com infecção, apendicite, colecistite, DIP, pneumonia de base."
    ]
   },
   {
    "t": "Exame físico: o que procurar",
    "itens": [
     "Sinais vitais completos e triagem de sepse (qSOFA ou NEWS2 em Escores).",
     "Punho-percussão lombar; abdome para excluir outro foco.",
     "Homem: toque retal suave — próstata dolorosa indica prostatite; não massagear.",
     "Hidratação e capacidade de tomar remédio pela boca."
    ]
   },
   {
    "t": "Exames complementares",
    "itens": [
     "Urina tipo I e urocultura com antibiograma antes da primeira dose — sempre.",
     "Hemograma, creatinina e PCR; hemoculturas e lactato se internação ou sinais de sepse.",
     "Beta-hCG em mulher em idade fértil.",
     "USG (ou TC) de urgência se sepse, suspeita de cálculo ou obstrução, rim único ou sem melhora em 48 a 72 horas.",
     "Criança: urina por sondagem; USG de rins e vias urinárias após o 1º episódio febril abaixo de 2 anos."
    ]
   },
   {
    "t": "Conduta",
    "itens": [
     "Ambulatorial (estável, sem vômitos): ceftriaxona 1 g dose inicial e ciprofloxacino 500 mg de 12/12h por 7 dias, ou levofloxacino 750 mg por 5 dias.",
     "Dose inicial parenteral é recomendada quando a resistência local à quinolona passa de 10% ou não se conhece.",
     "Internação: ceftriaxona EV; sepse ou risco de ESBL: piperacilina-tazobactam ou carbapenêmico, ajustando pela cultura.",
     "Passar para via oral quando afebril, estável e aceitando dieta, guiado pelo antibiograma.",
     "Duração (IDSA 2025): quinolona 5 a 7 dias; outros antibióticos 7 dias; homem com suspeita de prostatite, 10 a 14 dias.",
     "Gestante: sempre internar; ceftriaxona EV; evitar quinolona e aminoglicosídeo.",
     "Criança de 3 meses ou mais em bom estado: cefuroxima oral por 7 a 10 dias; abaixo de 3 meses ou toxemiada: ceftriaxona EV internada."
    ]
   },
   {
    "t": "Sinais de alarme e quando internar/encaminhar",
    "itens": [
     "Sepse ou choque: hemoculturas, cristaloide 30 mL/kg e antibiótico de amplo espectro na primeira hora.",
     "Obstrução urinária com febre: desobstrução urgente pela urologia.",
     "Febre que persiste após 72 horas: imagem para abscesso ou obstrução.",
     "Vômitos que impedem o antibiótico oral, gestação, imunossupressão ou rim único.",
     "Lactente abaixo de 3 meses."
    ],
    "alerta": true
   },
   {
    "t": "Orientações ao paciente",
    "itens": [
     "Tome o antibiótico nos horários certos e até o fim, mesmo sem febre.",
     "Beba bastante líquido.",
     "Volte em 48 a 72 horas com o resultado da urocultura para ajustar o antibiótico.",
     "Volte imediatamente se a febre passar de 3 dias, se vomitar o remédio, se a dor piorar, se ficar tonto ou confuso ou urinar pouco."
    ]
   },
   {
    "t": "Outras opções (material do médico)",
    "itens": [
     "Gentamicina 5 mg/kg EV dose única — substitui a ceftriaxona inicial na alergia grave a betalactâmico, antes da quinolona oral; evitar em doença renal, idoso e gestante."
    ],
    "offlabel": true
   }
  ],
  "pendencias": [
   "Material do Drive usa ciprofloxacino por 14 dias e ceftriaxona por 14 dias; IDSA 2025 recomenda 5 a 7 dias de quinolona e 7 dias dos demais — manter o DATA (7 dias).",
   "Guia HC-FMUSP 2024: ceftriaxona 1 g de 12/12h ou 2 g/dia; DATA usa 1 g/dia (2 g se grave ou acima de 100 kg) — decidir.",
   "Drive ('prescrição pronto atendimento') manda internar todo paciente acima de 60 anos; as diretrizes decidem pela gravidade, não só pela idade — decidir.",
   "No DATA ambulatorial, 'Opção 1' e 'Opção 2' são idênticas (levofloxacino 750 mg por 7 dias); para levofloxacino 750 mg bastam 5 dias — corrigir e remover a duplicata.",
   "Não existe Pediátrico › Ambulatorial em Pielonefrite; a ITU febril ambulatorial da criança está em ITU / Cistite — conferir se as duas condições se apontam."
  ],
  "fontes": [
   "Trautner BW et al. 2025 Clinical Practice Guideline by the Infectious Diseases Society of America (IDSA): Management and Treatment of Complicated Urinary Tract Infections. Clin Infect Dis. 2025.",
   "Gupta K et al. International clinical practice guidelines for the treatment of acute uncomplicated cystitis and pyelonephritis in women: a 2010 update by IDSA and ESCMID. Clin Infect Dis. 2011;52(5):e103-e120.",
   "Hospital das Clínicas da FMUSP (Levin AS, Costa SF, coord.). Antimicrobianos na prática clínica: um guia para profissionais da atenção primária. 1ª ed. São Paulo; 2024.",
   "Subcommittee on Urinary Tract Infection (AAP); Roberts KB. Urinary tract infection: clinical practice guideline for the diagnosis and management of the initial UTI in febrile infants and children 2 to 24 months. Pediatrics. 2011;128(3):595-610.",
   "Sociedade Brasileira de Pediatria, Departamento Científico de Nefrologia. Infecção do trato urinário em pediatria: existe consenso entre os consensos? Documento científico. 2021."
  ]
 },
 {
  "id": "prostatite",
  "tipo": "condicao",
  "cond": "prostatite",
  "nm": "Prostatite",
  "sub": "prostatite aguda · febre · disúria · ciprofloxacino · retenção urinária",
  "kw": "prostatite prostatite aguda prostatite bacteriana infeccao da prostata dor perineal dor no perineo febre calafrios disuria retencao urinaria jato fraco abscesso prostatico homem itu masculina itu febril no homem ciprofloxacino levofloxacino sulfametoxazol trimetoprima ceftriaxona doxiciclina dipirona",
  "draft": true,
  "revisado": null,
  "resumo": "Homem com febre, sintomas urinários e dor perineal, ou próstata muito dolorosa ao toque: prostatite bacteriana aguda. Colha urocultura, não massageie a próstata e trate por tempo prolongado (cerca de 2 semanas ou mais); sepse, retenção urinária ou abscesso indicam internação.",
  "secoes": [
   {
    "t": "Quando pensar / diagnóstico",
    "itens": [
     "Febre, calafrios, disúria, polaciúria, jato fraco ou retenção, com dor perineal, retal ou suprapúbica.",
     "Pode surgir após biópsia de próstata, sondagem ou manipulação urinária.",
     "Homem jovem sexualmente ativo: considerar gonococo e clamídia.",
     "Todo homem com ITU febril pode ter envolvimento da próstata.",
     "Diferenciais: pielonefrite, epididimite, uretrite, abscesso perianal."
    ]
   },
   {
    "t": "Exame físico: o que procurar",
    "itens": [
     "Sinais vitais e triagem de sepse.",
     "Toque retal suave: próstata aumentada, quente e muito dolorosa; flutuação sugere abscesso. Nunca massagear.",
     "Globo vesical (retenção) e bolsa escrotal (epididimite associada)."
    ]
   },
   {
    "t": "Exames complementares",
    "itens": [
     "Urina tipo I e urocultura com antibiograma antes do antibiótico.",
     "Hemograma, creatinina e PCR; hemoculturas se febre alta ou sepse.",
     "Pesquisa de gonococo e clamídia se risco de IST; testes para HIV e sífilis.",
     "PSA não ajuda na fase aguda (sobe com a inflamação).",
     "USG transretal ou TC se não melhorar em 48 a 72 horas (abscesso)."
    ]
   },
   {
    "t": "Conduta",
    "itens": [
     "Ambulatorial se estável: ciprofloxacino 500 mg de 12/12h ou levofloxacino 500 mg/dia, por pelo menos 14 dias, reavaliando a duração.",
     "Alternativa, se sensível no antibiograma: SMX-TMP 800/160 mg de 12/12h.",
     "Abaixo de 35 anos com risco de IST: ceftriaxona 500 mg IM dose única + doxiciclina 100 mg de 12/12h por 10 dias.",
     "Internação: ceftriaxona EV; se sepse ou risco de multirresistência, piperacilina-tazobactam; ajustar pela cultura.",
     "Retenção urinária: drenar a bexiga (sonda fina por pouco tempo ou cistostomia, conforme a urologia).",
     "Analgesia com dipirona ou AINE e boa hidratação."
    ]
   },
   {
    "t": "Sinais de alarme e quando internar/encaminhar",
    "itens": [
     "Sepse, hipotensão ou confusão.",
     "Retenção urinária.",
     "Sem melhora em 48 a 72 horas: suspeitar de abscesso prostático (drenagem).",
     "Imunossuprimido, diabético descompensado ou que não tolera a via oral."
    ],
    "alerta": true
   },
   {
    "t": "Orientações ao paciente",
    "itens": [
     "Tome o antibiótico até o fim, mesmo melhorando; o tratamento é longo para a infecção não voltar.",
     "Beba bastante líquido e evite fazer força para evacuar.",
     "Se a causa for IST, as parcerias precisam ser avisadas e tratadas; evite relações até terminar o tratamento.",
     "Volte imediatamente se tiver febre alta com calafrios, não conseguir urinar ou piorar."
    ]
   }
  ],
  "pendencias": [
   "DATA usa ciprofloxacino por 21 dias; NICE NG110 recomenda 14 dias com reavaliação e IDSA 2025 cita 10 a 14 dias no homem com suspeita de prostatite — decidir a duração padrão.",
   "Prostatite não tem modo Internação no DATA; criar com ceftriaxona EV e esquema de sepse, como em Pielonefrite?",
   "A orientação do DATA para risco de IST usa doxiciclina por 10 dias, que é o esquema da epididimite (CDC 2021) — confirmar que o médico quer o mesmo na prostatite.",
   "O material do Drive não traz conteúdo de prostatite (o guia HC-FMUSP não cobre) — sem propostas."
  ],
  "fontes": [
   "National Institute for Health and Care Excellence. Prostatitis (acute): antimicrobial prescribing (NG110). 2018.",
   "European Association of Urology. EAU Guidelines on Urological Infections. Edição 2025.",
   "Trautner BW et al. 2025 Clinical Practice Guideline by the Infectious Diseases Society of America (IDSA): Management and Treatment of Complicated Urinary Tract Infections. Clin Infect Dis. 2025.",
   "Workowski KA et al. Sexually Transmitted Infections Treatment Guidelines, 2021. MMWR Recomm Rep. 2021;70(4):1-187."
  ]
 },
 {
  "id": "epididimite",
  "tipo": "condicao",
  "cond": "epididimite",
  "nm": "Epididimite / Orquite",
  "sub": "dor escrotal · epididimite · torção testicular · ceftriaxona · doxiciclina",
  "kw": "epididimite orquite orquiepididimite dor no testiculo dor testicular dor escrotal bolsa escrotal inchada testiculo inchado torcao testicular caxumba ist gonorreia clamidia ceftriaxona doxiciclina levofloxacino ciprofloxacino ibuprofeno suspensorio escrotal doppler",
  "draft": true,
  "revisado": null,
  "resumo": "Dor escrotal de instalação gradual com epidídimo doloroso sugere epididimite, mas a primeira tarefa é excluir torção testicular (dor súbita, sobretudo em jovens), que precisa de cirurgia em poucas horas. Até 35 anos ou com risco de IST, trate gonococo e clamídia; acima disso, germes entéricos.",
  "secoes": [
   {
    "t": "Quando pensar / diagnóstico",
    "itens": [
     "Dor e inchaço escrotal de um lado, gradual (horas a dias), com ou sem disúria, corrimento ou febre.",
     "Risco de IST (em geral abaixo de 35 anos, parceria nova ou várias parcerias): gonococo e clamídia.",
     "Acima de 35 anos, HPB, sondagem ou procedimento urológico, sexo anal insertivo: germes entéricos.",
     "Orquite isolada com parotidite: caxumba (viral, sem antibiótico).",
     "Criança antes da puberdade: torção é mais provável; epididimite costuma ser pós-infecciosa ou por anomalia urinária."
    ]
   },
   {
    "t": "Exame físico: o que procurar",
    "itens": [
     "Dor súbita e intensa, testículo alto e horizontal, reflexo cremastérico ausente: torção até prova em contrário.",
     "Epidídimo endurecido e doloroso atrás do testículo; alívio ao elevar o testículo sugere, mas não confirma.",
     "Procure corrimento uretral, hérnia, abscesso e sinais de gangrena de Fournier.",
     "Sinais vitais: febre alta ou sepse."
    ]
   },
   {
    "t": "Exames complementares",
    "itens": [
     "Dúvida com torção: USG com Doppler de urgência, sem atrasar a avaliação cirúrgica se a suspeita for alta.",
     "Urina tipo I e urocultura; pesquisa de gonococo e clamídia por biologia molecular na urina ou secreção.",
     "Testes para HIV, sífilis e hepatites B e C quando a causa for IST."
    ]
   },
   {
    "t": "Conduta",
    "itens": [
     "Risco de IST: ceftriaxona 500 mg IM dose única + doxiciclina 100 mg de 12/12h por 10 dias.",
     "Sexo anal insertivo: ceftriaxona 500 mg IM + levofloxacino 500 mg/dia por 10 dias.",
     "Só germes entéricos (sem risco de IST): levofloxacino 500 mg/dia por 10 dias.",
     "Peso de 150 kg ou mais: ceftriaxona 1 g.",
     "Sintomáticos: AINE, repouso, elevação da bolsa e gelo nos primeiros dias.",
     "IST: tratar as parcerias dos últimos 60 dias e evitar relações até terminar o tratamento.",
     "Sem melhora em 72 horas: reavaliar (abscesso, infarto testicular, tumor, tuberculose)."
    ]
   },
   {
    "t": "Sinais de alarme e quando internar/encaminhar",
    "itens": [
     "Dor súbita intensa, vômitos, testículo alto: torção — urologia imediata (melhor salvamento nas primeiras 6 horas).",
     "Febre alta, toxemia ou sepse: internar.",
     "Abscesso, flutuação, crepitação ou necrose da bolsa (Fournier).",
     "Massa testicular endurecida que não regride com o tratamento: afastar tumor."
    ],
    "alerta": true
   },
   {
    "t": "Orientações ao paciente",
    "itens": [
     "Fique em repouso, use cueca justa ou suspensório para elevar a bolsa e faça compressas frias nos primeiros dias.",
     "Tome todo o antibiótico e avise suas parcerias sexuais para também se tratarem.",
     "Não tenha relações sexuais até terminar o tratamento e os sintomas passarem.",
     "Volte em 72 horas se não melhorar, ou na hora se a dor piorar muito, tiver febre alta, vômitos ou vermelhidão com pus."
    ]
   }
  ],
  "pendencias": [
   "DATA ('Receita' em Outras opções) usa ciprofloxacino 500 mg de 12/12h por 10 dias; CDC 2021 usa levofloxacino para germes entéricos — rotular como 'baixo risco de IST' ou retirar.",
   "Confirmar se o PCDT-IST 2022 do Ministério da Saúde traz esquema próprio de orquiepididimite; o DATA segue o CDC 2021.",
   "Não há bloco pediátrico; criança com dor escrotal vai para avaliação cirúrgica — incluir só uma orientação?",
   "O material do Drive não traz esquema próprio para epididimite — sem propostas."
  ],
  "fontes": [
   "Workowski KA et al. Sexually Transmitted Infections Treatment Guidelines, 2021. MMWR Recomm Rep. 2021;70(4):1-187.",
   "Brasil. Ministério da Saúde. Protocolo Clínico e Diretrizes Terapêuticas para Atenção Integral às Pessoas com Infecções Sexualmente Transmissíveis (IST). Brasília; 2022.",
   "European Association of Urology. EAU Guidelines on Urological Infections. Edição 2025."
  ]
 },
 {
  "id": "abscesso_cutaneo",
  "tipo": "condicao",
  "cond": "abscesso_cutaneo",
  "nm": "Abscesso cutâneo / furúnculo",
  "sub": "drenagem · furúnculo · carbúnculo · antibiótico · MRSA",
  "kw": "abscesso cutaneo furunculo carbunculo antraz tumor com pus caroco inflamado pus na pele foliculite flutuacao drenagem incisao ultrassom pocus mrsa estafilococo cefalexina cefadroxila sulfametoxazol trimetoprima bactrim clindamicina mupirocina descolonizacao clorexidina hidradenite cisto sebaceo infectado",
  "draft": true,
  "revisado": null,
  "resumo": "Coleção de pus na derme ou no subcutâneo, quase sempre por S. aureus. O tratamento principal é a incisão e drenagem; antibiótico só quando há celulite ao redor, sinais sistêmicos, imunossupressão, lesões múltiplas ou local de risco.",
  "secoes": [
   {
    "t": "Quando pensar / diagnóstico",
    "itens": [
     "Nódulo doloroso, quente e vermelho que evolui com ponto amolecido ou flutuação; furúnculo nasce de um folículo, carbúnculo é a junção de vários.",
     "Na dúvida entre celulite e abscesso, o ultrassom à beira do leito mostra a coleção e ajuda a decidir a drenagem.",
     "Abscessos de repetição: pensar em portador de S. aureus, hidradenite supurativa (axilas, virilhas), diabetes ou contato da casa com lesões.",
     "Diferenciais: cisto epidérmico inflamado, picada de inseto, corpo estranho, abscesso por uso de droga injetável."
    ]
   },
   {
    "t": "Exame físico: o que procurar",
    "itens": [
     "Medir a área endurecida e a celulite ao redor; marcar a borda do eritema com caneta e anotar a hora.",
     "Flutuação, drenagem espontânea, linfangite (estrias vermelhas) e linfonodo regional doloroso.",
     "Locais de risco: triângulo central da face, mão, região perianal ou perirretal, mama em lactante, região sacral e pilonidal.",
     "Febre, taquicardia ou hipotensão mudam a conduta (antibiótico e, se sepse, internação)."
    ]
   },
   {
    "t": "Exames complementares",
    "itens": [
     "Abscesso simples em paciente sem comorbidade: não precisa de exame.",
     "Cultura da secreção drenada se for usar antibiótico, se recorrente, se falha ou imunossupressão.",
     "Glicemia capilar nos abscessos extensos ou de repetição; hemograma e hemocultura só com sinais sistêmicos."
    ]
   },
   {
    "t": "Conduta",
    "itens": [
     "Drenar toda área flutuante: anestesia local, incisão no maior eixo, romper as loculações e irrigar com SF.",
     "Tamponamento com gaze não é obrigatório no abscesso pequeno; reservar para cavidades grandes.",
     "Antibiótico após drenar se celulite ao redor, febre, lesões múltiplas, imunossupressão, extremos de idade, face ou mão, ou drenagem incompleta.",
     "Escolha oral: cefalexina se baixo risco de MRSA; SMX-TMP se suspeita de MRSA comunitário ou falha; 5 a 7 dias.",
     "Ensaios grandes mostraram pequeno ganho de cura com antibiótico mesmo no abscesso simples drenado; individualizar.",
     "Lesão ainda endurecida, sem flutuação: compressa morna e reavaliar em 24 a 48 h.",
     "Criança: mesma lógica, drenagem com boa analgesia e antibiótico pelo peso quando indicado (ver Prescrições)."
    ]
   },
   {
    "t": "Sinais de alarme e quando internar/encaminhar",
    "itens": [
     "Sepse, celulite que progride apesar do antibiótico ou dor desproporcional: internar e pensar em fasciíte necrotizante.",
     "Abscesso no triângulo central da face, perianal profundo, de mão ou de mama: discutir com a cirurgia.",
     "Lactente pequeno, imunossuprimido ou diabético descompensado: limiar baixo para observação.",
     "Recorrência frequente: UBS para investigar hidradenite e diabetes e discutir descolonização."
    ],
    "alerta": true
   },
   {
    "t": "Orientações ao paciente",
    "itens": [
     "Não espremer nem furar o caroço em casa.",
     "Trocar o curativo 1 a 2 vezes ao dia, lavando com água e sabão.",
     "Lavar bem as mãos e não compartilhar toalhas, lâminas ou roupas.",
     "Voltar se a vermelhidão aumentar, se tiver febre, se a dor piorar ou se voltar a juntar pus."
    ]
   },
   {
    "t": "Outras opções (material do médico)",
    "itens": [
     "Cefadroxila 500 mg 12/12h por 7 dias — alternativa à cefalexina com 2 tomadas ao dia; mesma cobertura, não cobre MRSA."
    ],
    "offlabel": true
   }
  ],
  "pendencias": [
   "Plantãozinho traz cefadroxila 500 mg 12/12h; proposta em Outras opções (equivale à cefalexina) — decidir.",
   "Tigers e Principais condutas usam neomicina tópica 4x/dia na furunculose: sem papel no abscesso e sensibiliza — não importar.",
   "Talan 2016 e Daum 2017 mostram benefício modesto do antibiótico após drenar abscesso simples; o DATA restringe a celulite, febre, múltiplas lesões e imunossupressão — decidir se amplia.",
   "DATA não tem descolonização para furunculose de repetição (mupirocina nasal + banho com clorexidina, sugerida pela IDSA 2014) — avaliar bloco.",
   "Duração: DATA usa 7 dias; as diretrizes aceitam 5 a 7 — manter ou encurtar."
  ],
  "fontes": [
   "Stevens DL et al. Practice Guidelines for the Diagnosis and Management of Skin and Soft Tissue Infections: 2014 Update by the IDSA. Clin Infect Dis. 2014;59(2):e10-52.",
   "Sartelli M et al. WSES/GAIS/WSIS/SIS-E/AAST global clinical pathways for patients with skin and soft tissue infections. World J Emerg Surg. 2022;17:3.",
   "Talan DA et al. Trimethoprim-Sulfamethoxazole versus Placebo for Uncomplicated Skin Abscess. N Engl J Med. 2016;374:823-32.",
   "Daum RS et al. A Placebo-Controlled Trial of Antibiotics for Smaller Skin Abscesses. N Engl J Med. 2017;376:2545-55."
  ]
 },
 {
  "id": "erisipela",
  "tipo": "condicao",
  "cond": "erisipela",
  "nm": "Erisipela e celulite",
  "sub": "estreptococo · perna · cefalexina · porta de entrada · internação",
  "kw": "erisipela celulite infeccao de pele perna vermelha inchada quente vermelhidao na perna febre estreptococo estafilococo porta de entrada frieira tinea pedis intertrigo linfedema cefalexina clindamicina amoxicilina clavulanato penicilina v fenoximetilpenicilina benzatina profilaxia cefazolina ceftriaxona oxacilina vancomicina piperacilina tazobactam fasciite necrotizante celulite periorbitaria orbitaria",
  "draft": true,
  "revisado": null,
  "resumo": "Infecção aguda da derme (erisipela, borda nítida e elevada) ou da derme profunda e subcutâneo (celulite, borda mal definida), em geral estreptocócica e unilateral no membro inferior. A maioria trata por via oral em casa; internar se sinais sistêmicos graves, falha do oral ou suspeita de infecção necrotizante.",
  "secoes": [
   {
    "t": "Quando pensar / diagnóstico",
    "itens": [
     "Placa vermelha, quente, dolorosa e edemaciada, que se instala em horas a poucos dias, às vezes com febre e calafrios antes da lesão.",
     "Erisipela: borda elevada e bem demarcada, às vezes com bolhas; celulite: limites imprecisos. Na dúvida, tratar como celulite.",
     "Quadro bilateral e simétrico raramente é infecção: pensar em dermatite de estase, eczema de contato, lipodermatosclerose ou edema cardíaco.",
     "Diferenciais que importam: TVP (aplicar Wells — ver Escores), gota, bursite, picada de inseto e herpes-zóster inicial."
    ]
   },
   {
    "t": "Exame físico: o que procurar",
    "itens": [
     "Marcar a borda do eritema com caneta e anotar data e hora; fotografar se possível.",
     "Procurar a porta de entrada: micose entre os dedos, fissuras no calcanhar, úlceras, picadas e feridas.",
     "Linfangite, linfonodo inguinal doloroso e flutuação (abscesso associado: drenar).",
     "Sinais de gravidade: hipotensão, taquicardia, confusão, bolhas hemorrágicas, necrose, crepitação, anestesia da pele."
    ]
   },
   {
    "t": "Exames complementares",
    "itens": [
     "Quadro típico sem sinais sistêmicos: não precisa de exame.",
     "Febre alta, sepse ou internação: hemograma, PCR, creatinina e lactato; hemocultura se sepse, imunossupressão, neutropenia, mordedura ou imersão em água.",
     "Ultrassom se dúvida de abscesso; Doppler venoso se o Wells sugerir TVP."
    ]
   },
   {
    "t": "Conduta",
    "itens": [
     "Ambulatorial: cefalexina por 5 a 7 dias (estender se melhora lenta); clindamicina se alergia grave a betalactâmico.",
     "Sem resposta em 48 a 72 h: rever diagnóstico, abscesso oculto, adesão e cobertura de S. aureus resistente.",
     "Elevar o membro, tratar a porta de entrada e o edema crônico; analgesia simples.",
     "Internação: cefazolina EV, passando para oral após 24 a 48 h afebril e melhorando (ver Prescrições).",
     "Suspeita de fasciíte necrotizante ou choque: vancomicina + piperacilina-tazobactam + clindamicina e cirurgia de urgência, sem esperar imagem.",
     "Erisipela recorrente (3 a 4 episódios por ano apesar de tratar os fatores): discutir profilaxia com penicilina na UBS.",
     "Criança: cefalexina oral pelo peso; internar se toxemia, menor de 3 meses, face, órbita ou mão, ou falha do oral."
    ]
   },
   {
    "t": "Sinais de alarme e quando internar/encaminhar",
    "itens": [
     "Dor desproporcional, bolhas hemorrágicas, necrose, crepitação, anestesia ou progressão em horas: fasciíte necrotizante.",
     "Hipotensão, lactato elevado, confusão ou disfunção orgânica: protocolo de sepse.",
     "Falha após 48 a 72 h de oral, vômitos que impedem a via oral, imunossupressão ou comorbidade descompensada: internar.",
     "Celulite periorbitária com dor ao mover o olho, proptose ou baixa visual: celulite orbitária — TC e internação."
    ],
    "alerta": true
   },
   {
    "t": "Orientações ao paciente",
    "itens": [
     "Manter a perna elevada a maior parte do dia.",
     "A vermelhidão pode aumentar um pouco nas primeiras 24 horas; a melhora costuma aparecer em 48 a 72 horas.",
     "Tratar a micose entre os dedos e hidratar a pele para evitar novas crises.",
     "Voltar se febre alta, bolhas com sangue, manchas roxas ou pretas, dor muito forte ou se não melhorar em 48 a 72 horas."
    ]
   },
   {
    "t": "Outras opções (material do médico)",
    "itens": [
     "Amoxicilina-clavulanato 500/125 mg 8/8h por 5 a 7 dias — opção oral do guia HC-FMUSP 2024; criança 50 mg/kg/dia de amoxicilina 8/8h.",
     "Penicilina V 500.000 UI 6/6h — erisipela clássica estreptocócica leve; não cobre S. aureus, evitar na celulite purulenta.",
     "Ceftriaxona 1 g EV 1 vez ao dia — alternativa à cefazolina na observação ou internação, com dose única diária.",
     "Oxacilina 2 g EV 4/4h — celulite grave com S. aureus sensível provável; 6 doses ao dia, preferir cefazolina se houver."
    ],
    "offlabel": true
   }
  ],
  "pendencias": [
   "Guia HC-FMUSP 2024 usa cefalexina 1 g 6/6h no adulto e 100 mg/kg/dia na criança; o DATA usa 500 mg 6/6h e 50 mg/kg/dia — decidir a dose.",
   "Tigers e Principais condutas tratam por 10 a 14 dias; NICE 2019 e HC-FMUSP 2024 indicam 5 a 7 dias — DATA usa 7.",
   "Apostilas escrevem penicilina procaína, penicilina V e eritromicina como EV (erro: IM e VO); procaína IM 12/12h não foi proposta (dolorosa e pouco disponível).",
   "Eritromicina para alérgicos (apostilas) não foi proposta: a clindamicina já cobre a alergia, com melhor tolerância.",
   "Penicilina V: a bula indica 500.000 UI 6/6 ou 8/8h por 10 dias na erisipela; proposta com 7 dias — confirmar.",
   "DATA não tem profilaxia da erisipela recorrente (penicilina benzatina a cada 2 a 4 semanas ou penicilina V, IDSA 2014) — avaliar bloco."
  ],
  "fontes": [
   "Stevens DL et al. Practice Guidelines for the Diagnosis and Management of Skin and Soft Tissue Infections: 2014 Update by the IDSA. Clin Infect Dis. 2014;59(2):e10-52.",
   "National Institute for Health and Care Excellence (NICE). Cellulitis and erysipelas: antimicrobial prescribing (NG141). 2019.",
   "Levin ASS, Costa SF (coord.). Antimicrobianos na prática clínica: um guia para profissionais da atenção primária. 1ª ed. São Paulo: Hospital das Clínicas da FMUSP; 2024.",
   "Sartelli M et al. WSES/GAIS/WSIS/SIS-E/AAST global clinical pathways for patients with skin and soft tissue infections. World J Emerg Surg. 2022;17:3."
  ]
 },
 {
  "id": "impetigo",
  "tipo": "condicao",
  "cond": "impetigo",
  "nm": "Impetigo",
  "sub": "crostas melicéricas · bolhoso · ectima · mupirocina · cefalexina",
  "kw": "impetigo crostoso bolhoso ectima piodermite crosta amarelada crosta melicerica ferida no nariz ferida na boca crianca creche estafilococo estreptococo mupirocina acido fusidico cefalexina clindamicina sulfametoxazol trimetoprima amoxicilina clavulanato cefazolina glomerulonefrite pos estreptococica urina escura pele escaldada",
  "draft": true,
  "revisado": null,
  "resumo": "Infecção bacteriana superficial e contagiosa (S. aureus e/ou S. pyogenes), comum em crianças. Poucas lesões: limpeza e antibiótico tópico por 5 dias; lesões numerosas, bolhoso extenso, ectima ou surto: antibiótico oral.",
  "secoes": [
   {
    "t": "Quando pensar / diagnóstico",
    "itens": [
     "Não bolhoso: vesícula ou pústula que rompe e forma crosta amarelada (melicérica), em volta do nariz e da boca ou em áreas expostas.",
     "Bolhoso: bolhas flácidas que deixam erosão com colarete, típico de lactentes (S. aureus).",
     "Ectima: úlcera rasa com crosta aderente e halo vermelho, nas pernas; atinge a derme e deixa cicatriz.",
     "Costuma complicar picadas, escabiose, eczema e varicela: tratar também a doença de base."
    ]
   },
   {
    "t": "Exame físico: o que procurar",
    "itens": [
     "Contar e mapear as lesões (localizadas ou disseminadas) e palpar linfonodos regionais.",
     "Febre, celulite ou abscesso ao redor mudam a conduta para tratamento sistêmico.",
     "Procurar escabiose (túneis, prurido noturno, contatos com coceira) e pediculose.",
     "Edema palpebral, hipertensão ou urina escura: glomerulonefrite pós-estreptocócica."
    ]
   },
   {
    "t": "Exames complementares",
    "itens": [
     "Diagnóstico clínico; não precisa de exame no caso típico.",
     "Cultura da secreção se falha, recorrência, surto ou suspeita de MRSA.",
     "Urina tipo I, creatinina e C3 se edema, hipertensão ou urina escura."
    ]
   },
   {
    "t": "Conduta",
    "itens": [
     "Remover as crostas com água e sabão (amolecer antes com óleo ou vaselina morna) antes do tópico.",
     "Poucas lesões: mupirocina 3 vezes ao dia por 5 dias.",
     "Oral por 7 dias se lesões numerosas, bolhoso extenso, ectima, surto familiar ou escolar, ou falha do tópico: cefalexina (criança pelo peso).",
     "Alergia a betalactâmico ou suspeita de MRSA: SMX-TMP (adulto e criança) ou clindamicina (adulto).",
     "Internar se sinais sistêmicos, celulite extensa, imunossupressão ou lactente pequeno com lesões disseminadas.",
     "O antibiótico não previne a glomerulonefrite, mas encurta o contágio."
    ]
   },
   {
    "t": "Sinais de alarme e quando internar/encaminhar",
    "itens": [
     "Febre alta, toxemia, celulite ou abscesso associados.",
     "Lactente com febre e descolamento extenso da pele: síndrome da pele escaldada estafilocócica — internar.",
     "Edema, hipertensão, urina escura ou pouca urina nas semanas seguintes: glomerulonefrite.",
     "Sem melhora em 5 dias de tratamento correto ou recidivas: cultura e revisão do caso."
    ],
    "alerta": true
   },
   {
    "t": "Orientações ao paciente",
    "itens": [
     "Lavar as feridas com água morna e sabão 2 a 3 vezes ao dia e tirar as crostas antes da pomada.",
     "Manter as unhas curtas, não coçar e não compartilhar toalhas e roupas.",
     "Afastar da escola ou creche até 24 a 48 horas depois de começar o antibiótico ou até as feridas secarem.",
     "Voltar se febre, vermelhidão em volta das feridas, inchaço no rosto ou urina escura."
    ]
   },
   {
    "t": "Outras opções (material do médico)",
    "itens": [
     "Ácido fusídico 2% creme 3 vezes ao dia por 5 dias — alternativa tópica à mupirocina (HC-FMUSP 2024, NICE 2020); evitar usos repetidos.",
     "Clindamicina 300 mg 8/8h ou SMX-TMP 800/160 mg 12/12h por 7 dias — adulto alérgico a betalactâmico ou com suspeita de MRSA.",
     "Amoxicilina-clavulanato 875/125 mg 12/12h por 7 dias — adulto, se falha da cefalexina."
    ],
    "offlabel": true
   }
  ],
  "pendencias": [
   "Tigers e Principais condutas tratam por 10 dias; HC-FMUSP 2024 indica 7 dias e NICE 2020, 5 dias — DATA usa 7.",
   "Guia pediátrico do Drive sugere penicilina benzatina 50.000 UI/kg + neomicina-bacitracina: penicilina não cobre S. aureus e a pomada é menos eficaz — não proposto.",
   "NICE 2020 põe o creme de peróxido de hidrogênio 1% como 1ª linha tópica; pouco disponível no Brasil — manter mupirocina.",
   "Volta à escola: DATA diz 48 h após o antibiótico; HC-FMUSP 2024 diz 24 h — uniformizar.",
   "Clindamicina oral pediátrica (HC-FMUSP: 30 a 40 mg/kg/dia) não foi proposta: conferir se há apresentação líquida na rede."
  ],
  "fontes": [
   "Stevens DL et al. Practice Guidelines for the Diagnosis and Management of Skin and Soft Tissue Infections: 2014 Update by the IDSA. Clin Infect Dis. 2014;59(2):e10-52.",
   "National Institute for Health and Care Excellence (NICE). Impetigo: antimicrobial prescribing (NG153). 2020.",
   "Levin ASS, Costa SF (coord.). Antimicrobianos na prática clínica: um guia para profissionais da atenção primária. 1ª ed. São Paulo: Hospital das Clínicas da FMUSP; 2024."
  ]
 },
 {
  "id": "escabiose",
  "tipo": "condicao",
  "cond": "escabiose",
  "nm": "Escabiose (sarna)",
  "sub": "prurido noturno · túneis · permetrina · ivermectina · contatos",
  "kw": "escabiose sarna coceira a noite prurido noturno tuneis sulcos entre os dedos nodulos genitais coceira na familia sarcoptes acaro permetrina ivermectina benzoato de benzila enxofre hidroxizina dexclorfeniramina sarna crostosa norueguesa contatos domiciliares surto asilo",
  "draft": true,
  "revisado": null,
  "resumo": "Infestação pelo ácaro Sarcoptes scabiei, transmitida por contato pele a pele prolongado. Tratar todos os contatos ao mesmo tempo, com permetrina 5% ou ivermectina oral repetidas após 7 dias, junto com a higiene das roupas.",
  "secoes": [
   {
    "t": "Quando pensar / diagnóstico",
    "itens": [
     "Prurido intenso que piora à noite, com outras pessoas da casa coçando também.",
     "Pápulas escoriadas e túneis finos entre os dedos, punhos, cotovelos, axilas, cintura, nádegas, aréolas e genitais.",
     "Nódulos no pênis e no escroto são muito sugestivos; lactentes têm lesões também em palmas, plantas, couro cabeludo e face.",
     "Sarna crostosa: crostas espessas e pouco prurido em idoso, imunossuprimido, institucionalizado ou com HTLV-1/HIV — muito contagiosa."
    ]
   },
   {
    "t": "Exame físico: o que procurar",
    "itens": [
     "Procurar o túnel (linha fina e sinuosa) com boa luz ou dermatoscópio (sinal da asa-delta).",
     "Infecção secundária: crostas amareladas, pústulas, celulite.",
     "Examinar os contatos que estiverem presentes."
    ]
   },
   {
    "t": "Exames complementares",
    "itens": [
     "Diagnóstico clínico (critérios IACS 2020); o raspado com microscopia confirma, mas não é preciso para tratar.",
     "Sarna crostosa ou falha repetida: raspado e investigação de imunossupressão."
    ]
   },
   {
    "t": "Conduta",
    "itens": [
     "Permetrina 5% do pescoço aos pés (couro cabeludo e face também abaixo de 2 anos), retirar após 8 a 14 h e repetir em 7 dias.",
     "Ivermectina 200 mcg/kg em 2 doses, com 7 dias de intervalo; adulto até 64 kg: 2 comprimidos de 6 mg por dose.",
     "Adulto mais pesado: 2 e meio comprimidos de 65 a 79 kg e 3 comprimidos a partir de 80 kg.",
     "Ivermectina não na gestação nem abaixo de 15 kg; gestante, lactante e lactente a partir de 2 meses: permetrina.",
     "Menores de 2 meses: enxofre precipitado em vaselina e discutir com a dermatologia.",
     "Tratar contatos da casa e parceiros no mesmo dia, mesmo sem coceira.",
     "Coceira: anti-histamínico e emoliente; tratar o impetigo secundário junto.",
     "Sarna crostosa: ivermectina nos dias 1, 2 e 8 (graves também 9 e 15) com escabicida tópico repetido; precaução de contato."
    ]
   },
   {
    "t": "Sinais de alarme e quando internar/encaminhar",
    "itens": [
     "Sarna crostosa, lesões extensas infectadas ou celulite: discutir internação e dermatologia.",
     "Surto em instituição (asilo, abrigo, presídio): tratar todos ao mesmo tempo e avisar a vigilância.",
     "Lesões novas 2 a 4 semanas após o fim do tratamento: falha ou reinfestação — rever adesão e contatos."
    ],
    "alerta": true
   },
   {
    "t": "Orientações ao paciente",
    "itens": [
     "Toda a família e quem dorme junto deve tratar no mesmo dia, mesmo sem coceira.",
     "Lavar roupas, toalhas e roupa de cama dos últimos 3 dias em água quente ou guardar em saco fechado por 3 dias.",
     "A coceira pode durar 2 a 4 semanas depois do tratamento; isso não quer dizer que falhou.",
     "Repetir o remédio depois de 7 dias, porque ele não mata os ovos."
    ]
   },
   {
    "t": "Outras opções (material do médico)",
    "itens": [
     "Benzoato de benzila 25% emulsão — 2 a 3 noites seguidas e repetir em 7 dias; alternativa à permetrina, irrita; na criança diluir conforme a bula.",
     "Ivermectina pelo peso no adulto acima de 65 kg — 2 e meio a 3 comprimidos de 6 mg, repetindo em 7 dias (tabela do material).",
     "Enxofre precipitado 10% em vaselina — 3 noites seguidas; gestante ou intolerância à permetrina; cheiro forte, mancha a roupa.",
     "Dexclorfeniramina 2 mg à noite ou até 8/8h — antipruriginoso alternativo à hidroxizina; dá sonolência."
    ],
    "offlabel": true
   }
  ],
  "pendencias": [
   "Tigers e Principais condutas usam permetrina 5% por 3 a 5 noites seguidas; o Plantãozinho, por 10 minutos: ambos errados (uma aplicação de 8 a 14 h, repetida em 7 dias).",
   "Padrão adulto do DATA usa ivermectina 12 mg fixa: acima de 65 kg é subdose para 200 mcg/kg — decidir se a posologia passa a ser por faixa de peso.",
   "Bloco 'Receita' do DATA repete a ivermectina após 21 dias; a diretriz europeia (2017) repete em 7 dias (até 14) — corrigir.",
   "Deltametrina loção (Drive): registrada no Brasil, mas fora das diretrizes internacionais e com posologias divergentes nos materiais (4 a 10 dias) — não proposta.",
   "Fórmula manipulada do Drive associa enxofre 10% a hidrocortisona, lactato de amônio e alantoína; o corticoide não tem papel no escabicida — proposto só enxofre em vaselina.",
   "Benzoato de benzila: o Plantãozinho cita sabonete; proposta a emulsão 25% (diretriz: 2 noites; bula brasileira: 3 noites) — escolher o esquema.",
   "Diretriz europeia orienta ivermectina com alimento; conferir a orientação da bula brasileira antes de escrever na receita."
  ],
  "fontes": [
   "Salavastru CM, Chosidow O, Boffa MJ, Janier M, Tiplica GS. European guideline for the management of scabies. J Eur Acad Dermatol Venereol. 2017;31(8):1248-1253.",
   "Engelman D et al. The 2020 International Alliance for the Control of Scabies Consensus Criteria for the Diagnosis of Scabies. Br J Dermatol. 2020;183(5):808-820."
  ]
 },
 {
  "id": "eczema",
  "tipo": "condicao",
  "cond": "eczema",
  "nm": "Eczema de contato (dermatite de contato)",
  "sub": "irritativa · alérgica · corticoide tópico · teste de contato · desmame",
  "kw": "eczema de contato dermatite de contato alergica irritativa alergia de pele no local niquel bijuteria brinco cosmetico tintura de cabelo esmalte luva latex borracha cimento planta limao fitofotodermatite henna preta coceira vermelhidao bolhinhas betametasona hidrocortisona clobetasol prednisona prednisolona loratadina cetirizina hidroxizina dexclorfeniramina patch test teste de contato eczema de maos",
  "draft": true,
  "revisado": null,
  "resumo": "Inflamação da pele no local de contato com um irritante (sabões, água, solventes) ou com um alérgeno (níquel, cosméticos, borracha, plantas). Afastar o agente e usar corticoide tópico de potência adequada ao local; corticoide oral com desmame só nos quadros extensos ou graves.",
  "secoes": [
   {
    "t": "Quando pensar / diagnóstico",
    "itens": [
     "Placas vermelhas e pruriginosas, com vesículas e exsudação na fase aguda, ou secas e espessadas na crônica, no local do contato.",
     "O desenho denuncia a causa: lóbulo da orelha e umbigo (níquel), pálpebras (esmalte, cosméticos), mãos (luvas, trabalho úmido), pés (calçados).",
     "Irritativa: arde mais do que coça e fica na área exposta; alérgica: coça, pode passar da área e surge 1 a 3 dias após o contato.",
     "Manchas e bolhas em áreas expostas ao sol depois de mexer com limão: fitofotodermatite."
    ]
   },
   {
    "t": "Exame físico: o que procurar",
    "itens": [
     "Distribuição, extensão (porcentagem da pele) e acometimento de face, pálpebras, genitais e mucosas.",
     "Infecção secundária: crostas amareladas, pústulas, dor e calor.",
     "Vesículas umbilicadas agrupadas sobre o eczema, com febre: eczema herpético (urgência)."
    ]
   },
   {
    "t": "Exames complementares",
    "itens": [
     "Diagnóstico clínico no PS; não precisa de exame.",
     "Quadros repetidos, crônicos ou ocupacionais: encaminhar para teste de contato (patch test) na dermatologia."
    ]
   },
   {
    "t": "Conduta",
    "itens": [
     "Identificar e afastar o agente; limpeza suave e emoliente sem perfume várias vezes ao dia.",
     "Corticoide tópico por 1 a 2 semanas: média potência (betametasona) no corpo; baixa potência (hidrocortisona) em face, pálpebras, dobras e fralda.",
     "Mãos e plantas com lesão espessa podem precisar de alta potência (clobetasol) por curto período, nunca na face.",
     "Lesão exsudativa: compressas frias com SF antes do creme.",
     "Extensa (mais de 20% da pele) ou grave em face e genitais: prednisona 0,5 a 1 mg/kg/dia, desmame em 2 a 3 semanas (curso curto dá rebote).",
     "Anti-histamínico ajuda na coceira e no sono, mas não trata o eczema.",
     "Criança: hidrocortisona em face e fralda; betametasona só no corpo e acima de 2 anos; prednisolona pelo peso se extensa."
    ]
   },
   {
    "t": "Sinais de alarme e quando internar/encaminhar",
    "itens": [
     "Febre, bolhas com descolamento, lesões em mucosas ou em alvo, eritrodermia: afastar farmacodermia grave (SSJ/NET, DRESS).",
     "Edema de face com dificuldade para respirar ou engolir: angioedema ou anafilaxia.",
     "Infecção secundária extensa ou celulite: antibiótico e reavaliação."
    ],
    "alerta": true
   },
   {
    "t": "Orientações ao paciente",
    "itens": [
     "Evitar o produto suspeito e ler os rótulos (níquel, perfumes, conservantes, tinturas).",
     "Lavar só com água e sabonete neutro e passar hidratante sem perfume várias vezes ao dia.",
     "Usar o creme de corticoide em camada fina, só pelo tempo receitado, e não passar no rosto o creme do corpo.",
     "Voltar se febre, pus, bolhas grandes, lesões na boca ou nos olhos, ou se não melhorar em 14 dias."
    ]
   }
  ],
  "pendencias": [
   "Catálogo do Plantão Rápido traz betametasona + gentamicina creme e o guia pediátrico traz associações de corticoide com antibiótico e antifúngico: sensibilizam e geram resistência — não propostas.",
   "O clobetasol do Drive já está no DATA (Outras opções, 'Opção 2'), escrito 'CLOBETAZOL' — corrigir a grafia e limitar a 2 semanas, fora da face.",
   "'Opção 1' do DATA diz 'BETAMETASONA 0,1%' sem o sal (valerato e dipropionato têm potências diferentes) — especificar.",
   "Prednisona ambulatorial do DATA dura 14 dias; o bloco de internação e a literatura falam em desmame de 2 a 3 semanas — uniformizar."
  ],
  "fontes": [
   "Fonacier L et al. Contact dermatitis: a practice parameter-update 2015. J Allergy Clin Immunol Pract. 2015;3(3 Suppl):S1-39.",
   "Johansen JD et al. European Society of Contact Dermatitis guideline for diagnostic patch testing – recommendations on best practice. Contact Dermatitis. 2015;73(4):195-221.",
   "Thyssen JP et al. Guidelines for diagnosis, prevention, and treatment of hand eczema. Contact Dermatitis. 2022;86(5):357-378."
  ]
 },
 {
  "id": "intertrigo",
  "tipo": "condicao",
  "cond": "intertrigo",
  "nm": "Intertrigo / candidíase cutânea",
  "sub": "dobras · Candida · fralda · antifúngico tópico · fluconazol",
  "kw": "intertrigo candidiase cutanea candida moniliase assadura dermatite de fralda dobras virilha axila sob as mamas prega abdominal obesidade diabetes lesoes satelites miconazol clotrimazol nistatina oxido de zinco fluconazol itraconazol hidrocortisona eritrasma tinha cruris balanopostite",
  "draft": true,
  "revisado": null,
  "resumo": "Inflamação das dobras por atrito e umidade, muitas vezes colonizada por Candida. Manter a dobra seca e usar antifúngico tópico até 1 semana depois da cura; oral só se extenso, refratário ou imunossupressão.",
  "secoes": [
   {
    "t": "Quando pensar / diagnóstico",
    "itens": [
     "Placa vermelha, úmida e brilhante nas dobras (virilha, axilas, sob as mamas, prega abdominal, entre os dedos), com ardor e coceira.",
     "Pápulas e pústulas satélites além da borda sugerem Candida.",
     "Borda ativa descamativa com centro mais claro: tinha crural; placa marrom-avermelhada sem satélites: eritrasma.",
     "Favorecem: obesidade, diabetes, calor, suor, incontinência, fralda, antibiótico ou corticoide recentes."
    ]
   },
   {
    "t": "Exame físico: o que procurar",
    "itens": [
     "Ver todas as dobras, a boca (placas brancas) e, no homem, a glande (balanopostite).",
     "Fissuras, maceração, mau cheiro ou secreção purulenta sugerem infecção bacteriana associada.",
     "Na fralda: dermatite irritativa poupa o fundo das dobras; a candidíase o acomete e tem satélites."
    ]
   },
   {
    "t": "Exames complementares",
    "itens": [
     "Clínico na maioria; exame micológico direto se dúvida ou falha.",
     "Glicemia ou HbA1c se recorrente, extenso ou em adulto sem fator óbvio.",
     "Lâmpada de Wood: fluorescência vermelho-coral no eritrasma."
    ]
   },
   {
    "t": "Conduta",
    "itens": [
     "Lavar, secar muito bem e manter a dobra arejada (tecido de algodão ou gaze entre as dobras).",
     "Antifúngico tópico 2 vezes ao dia (miconazol ou clotrimazol); na fralda, nistatina com óxido de zinco a cada troca.",
     "Manter até 1 semana depois da cura, em geral 2 a 4 semanas.",
     "Muito inflamado: hidrocortisona 1% por no máximo 7 dias junto com o antifúngico; evitar corticoide potente nas dobras.",
     "Extenso, refratário ou imunossupressão: associar fluconazol oral.",
     "Eritrasma: eritromicina ou clindamicina; infecção estreptocócica (dobra vermelho-vivo e dolorosa): antibiótico."
    ]
   },
   {
    "t": "Sinais de alarme e quando internar/encaminhar",
    "itens": [
     "Dor intensa, pus, febre ou celulite ao redor.",
     "Sem melhora em 2 semanas de tratamento correto: rever diagnóstico (psoríase invertida, dermatite seborreica, contato).",
     "Candidíase extensa e recorrente em adulto: investigar diabetes e imunossupressão, incluindo HIV."
    ],
    "alerta": true
   },
   {
    "t": "Orientações ao paciente",
    "itens": [
     "Lavar a região com água e sabão e secar muito bem, sem esfregar.",
     "Usar roupas leves de algodão e evitar roupas justas e sintéticas.",
     "Não usar talco, amido ou pomadas com corticoide por conta própria.",
     "Voltar se não melhorar em 2 semanas, se espalhar ou se surgir pus, dor forte ou febre."
    ]
   }
  ],
  "pendencias": [
   "'Opção 1' e 'Opção 2' do DATA usam creme de cetoconazol + betametasona + neomicina: corticoide potente na dobra causa atrofia e estrias, e a neomicina sensibiliza — decidir se mantém.",
   "Esses blocos orientam evitar calçados fechados (frase da tinha dos pés), sem relação com o intertrigo — revisar.",
   "Drive traz balanopostite (nistatina creme + fluconazol 150 mg dose única); imidazólico tópico é a 1ª linha — condição nova ou palavras-chave aqui.",
   "Fluconazol 150 mg semanal por 4 semanas (DATA) para candidíase cutânea extensa não tem esquema padronizado nas diretrizes — confirmar.",
   "Material do Drive não tem nada específico de intertrigo para Outras opções."
  ],
  "fontes": [
   "Kalra MG, Higgins KE, Kinney BS. Intertrigo and secondary skin infections. Am Fam Physician. 2014;89(7):569-573.",
   "Azulay RD, Azulay DR, Azulay-Abulafia L. Dermatologia. 8ª ed. Guanabara Koogan; 2022."
  ]
 },
 {
  "id": "micose_ungueal",
  "tipo": "condicao",
  "cond": "micose_ungueal",
  "nm": "Onicomicose (micose de unha)",
  "sub": "dermatófito · exame micológico · terbinafina · amorolfina · itraconazol",
  "kw": "onicomicose micose de unha micose subungueal unha grossa unha amarela unha descolando fungo na unha tinea unguium dermatofito trichophyton rubrum candida terbinafina itraconazol fluconazol amorolfina ciclopirox tioconazol ureia esmalte antifungico psoriase ungueal",
  "draft": true,
  "revisado": null,
  "resumo": "Infecção fúngica da unha, quase sempre por dermatófito e mais nos pés. Confirmar com exame micológico antes de tratar; tópico se leve e distal, terbinafina oral nas formas moderadas a graves ou com a matriz acometida.",
  "secoes": [
   {
    "t": "Quando pensar / diagnóstico",
    "itens": [
     "Unha espessa, amarelada ou esbranquiçada, quebradiça, com descolamento distal e restos embaixo; costuma vir com frieira.",
     "Metade das unhas distróficas não é micose: psoríase, trauma de calçado ou esporte, líquen plano, envelhecimento.",
     "Paroníquia e unhas das mãos de quem trabalha com água sugerem Candida.",
     "Faixa escura longitudinal em uma só unha: excluir melanoma, não tratar como micose."
    ]
   },
   {
    "t": "Exame físico: o que procurar",
    "itens": [
     "Quantas unhas, porcentagem da lâmina acometida e se chega à matriz (parte proximal).",
     "Pés (frieira), mãos e pele; sinais de psoríase (depressões puntiformes, placas).",
     "Diabético: examinar o pé (úlceras, neuropatia, pulsos), porque a micose abre porta para celulite."
    ]
   },
   {
    "t": "Exames complementares",
    "itens": [
     "Exame micológico direto e cultura do raspado antes do tratamento oral (de preferência também antes do tópico).",
     "TGO/TGP antes da terbinafina se hepatopatia, etilismo ou outros hepatotóxicos; repetir se sintomas."
    ]
   },
   {
    "t": "Conduta",
    "itens": [
     "Leve (até 50% da unha, sem matriz, até 3 a 4 unhas): tópico — amorolfina esmalte por 6 meses (mãos) a 12 meses (pés).",
     "Moderada a grave, matriz acometida ou muitas unhas: terbinafina 250 mg/dia por 6 semanas (mãos) ou 12 semanas (pés).",
     "Alternativas orais: itraconazol contínuo ou em pulsos (muitas interações; não usar na insuficiência cardíaca) ou fluconazol semanal.",
     "Candida: itraconazol ou fluconazol (terbinafina é menos eficaz).",
     "Tratar a frieira junto, manter unhas curtas e lixar a superfície antes do esmalte.",
     "A unha nova leva 6 meses nas mãos e 12 a 18 meses nos pés; recidiva é comum.",
     "Criança: rara; confirmar e discutir com a dermatologia antes de oral."
    ]
   },
   {
    "t": "Sinais de alarme e quando internar/encaminhar",
    "itens": [
     "Celulite ou erisipela partindo do pé com micose: tratar primeiro a infecção bacteriana.",
     "Icterícia, urina escura, perda do paladar ou lesões de pele durante a terbinafina: suspender e avaliar.",
     "Lesão pigmentada, sangramento ou destruição da unha sem fungo confirmado: dermatologia."
    ],
    "alerta": true
   },
   {
    "t": "Orientações ao paciente",
    "itens": [
     "O tratamento é longo e a unha só melhora quando cresce nova; não desistir antes do prazo.",
     "Secar bem entre os dedos, trocar as meias todo dia e não compartilhar alicates, lixas e calçados.",
     "Usar chinelo em vestiários e piscinas.",
     "Parar o remédio e voltar se pele ou olhos amarelados, urina escura ou perda do paladar."
    ]
   },
   {
    "t": "Outras opções (material do médico)",
    "itens": [
     "Itraconazol 200 mg/dia por 6 a 12 semanas ou pulsos de 400 mg/dia 1 semana por mês — alternativa à terbinafina e na Candida.",
     "Fluconazol 150 mg 1 vez por semana por 3 meses (mãos) a 6 meses ou mais (pés) — se intolerância a terbinafina e itraconazol.",
     "Ciclopirox 8% esmalte ou tioconazol 28% solução — tópicos alternativos à amorolfina nas formas leves e distais."
    ],
    "offlabel": true
   }
  ],
  "pendencias": [
   "Tigers e Principais condutas mandam sempre associar tratamento sistêmico ao tópico: a BAD indica tópico isolado na forma leve e distal — não seguir.",
   "Bloco 'Receita' do DATA usa ureia 40% + oxiconazol solução por 1 a 2 semanas: prazo incompatível com onicomicose (meses); a ureia 40% serve para amolecer a unha — rever.",
   "Nova diretriz da BAD (2026) está em publicação no British Journal of Dermatology — conferir se muda doses ou durações.",
   "Ciclopirox esmalte: a bula brasileira usa esquema decrescente (dias alternados no 1º mês, depois 2 e 1 vez por semana); a BAD 2014 cita uso diário — confirmar.",
   "Fluconazol semanal na onicomicose: as bulas brasileiras listam tinea unguium, mas a posologia semanal não foi conferida — confirmar."
  ],
  "fontes": [
   "Ameen M et al. British Association of Dermatologists' guidelines for the management of onychomycosis 2014. Br J Dermatol. 2014;171(5):937-958.",
   "Caplan AS, Gold JAW, Smith DJ, Ely JW. Diagnosis and management of tinea infections. Am Fam Physician. 2025;112(4):382-392."
  ]
 },
 {
  "id": "pitiriase",
  "tipo": "condicao",
  "cond": "pitiriase",
  "nm": "Pitiríase versicolor",
  "sub": "pano branco · Malassezia · cetoconazol xampu · itraconazol · recidiva",
  "kw": "pitiriase versicolor pano branco micose de praia manchas brancas manchas claras manchas marrons malassezia pityrosporum descamacao furfuracea sinal de zileri lampada de wood cetoconazol xampu shampoo sulfeto de selenio isoconazol ciclopirox fenticonazol itraconazol fluconazol hanseniase",
  "draft": true,
  "revisado": null,
  "resumo": "Micose superficial pela levedura Malassezia: manchas claras, rosadas ou acastanhadas com descamação fina no tronco e ombros, piores no calor. O tópico resolve a maioria; oral se extensa, recidivante ou sem resposta. Recidiva é a regra e as manchas claras demoram meses para repigmentar.",
  "secoes": [
   {
    "t": "Quando pensar / diagnóstico",
    "itens": [
     "Manchas ovais que confluem, claras ou escuras, com descamação fina que aparece ao esticar a pele (sinal de Zileri), em tronco, pescoço e ombros.",
     "Adolescentes e adultos jovens, calor, suor, uso de óleos e cremes.",
     "Diferenciais: vitiligo (sem descamação, branco nacarado), pitiríase alba (criança, face), pitiríase rósea, dermatite seborreica.",
     "Mancha clara com alteração de sensibilidade: hanseníase — na dúvida, testar sempre."
    ]
   },
   {
    "t": "Exame físico: o que procurar",
    "itens": [
     "Extensão das lesões e descamação ao estirar a pele; a lâmpada de Wood mostra fluorescência amarelo-esverdeada.",
     "Testar sensibilidade térmica, dolorosa e tátil nas manchas claras duvidosas e palpar nervos periféricos."
    ]
   },
   {
    "t": "Exames complementares",
    "itens": [
     "Diagnóstico clínico; exame micológico direto se dúvida.",
     "Antes do oral: perguntar por hepatopatia, gestação e interações (itraconazol)."
    ]
   },
   {
    "t": "Conduta",
    "itens": [
     "Tópico primeiro: cetoconazol xampu nas lesões por 5 minutos, 1 vez ao dia por 5 dias, ou creme azólico por 2 a 3 semanas.",
     "Oral se extensa, recidivante ou sem resposta: itraconazol 200 mg/dia por 5 dias ou fluconazol 300 mg por semana por 2 semanas.",
     "Não usar cetoconazol oral (hepatotoxicidade, alerta da Anvisa de 2013) nem terbinafina oral (não funciona nessa micose).",
     "Gestante: só tópico.",
     "Prevenção nos meses quentes: xampu nas áreas 1 vez a cada 1 a 4 semanas."
    ]
   },
   {
    "t": "Sinais de alarme e quando internar/encaminhar",
    "itens": [
     "Mancha com perda de sensibilidade, nervo espessado ou dor neural: investigar hanseníase.",
     "Lesões muito extensas ou recidivas frequentes em imunossuprimido: reavaliar e considerar oral.",
     "Sem melhora da descamação em 4 semanas: rever o diagnóstico."
    ],
    "alerta": true
   },
   {
    "t": "Orientações ao paciente",
    "itens": [
     "As manchas claras podem levar meses para sumir depois da cura; isso não é falha do tratamento.",
     "Evitar óleos, bronzeadores e cremes oleosos e secar bem a pele depois de suar.",
     "A micose costuma voltar no calor; usar o xampu de prevenção como orientado.",
     "Voltar se a mancha ficar dormente ou se não melhorar em 4 semanas."
    ]
   },
   {
    "t": "Outras opções (material do médico)",
    "itens": [
     "Isoconazol 1% creme 1 vez ao dia por 2 a 3 semanas ou ciclopirox 1% creme 2 vezes ao dia — tópicos alternativos, bons para poucas lesões."
    ],
    "offlabel": true
   }
  ],
  "pendencias": [
   "Tigers e Principais condutas citam cetoconazol oral 200 mg/dia por 28 dias: contraindicado em micose de pele (alerta Anvisa 2013) — não importar.",
   "O itraconazol do material (200 mg/dia por 5 dias) equivale ao do DATA (100 mg 12/12h por 5 dias) — nada a mudar.",
   "Esfregar com bucha no banho (apostilas) não tem evidência e irrita — não incluir.",
   "Ciclopirox creme: a posologia proposta (2 vezes ao dia por 2 semanas) não foi conferida na bula brasileira — confirmar."
  ],
  "fontes": [
   "Hald M et al. Evidence-based Danish guidelines for the treatment of Malassezia-related skin diseases. Acta Derm Venereol. 2015;95(1):12-19.",
   "Gupta AK, Foley KA. Antifungal treatment for pityriasis versicolor. J Fungi (Basel). 2015;1(1):13-29."
  ]
 },
 {
  "id": "tinha_capitis",
  "tipo": "condicao",
  "cond": "tinha_capitis",
  "nm": "Tinha do couro cabeludo (tinea capitis)",
  "sub": "criança · falha com descamação · quérion · griseofulvina · terbinafina",
  "kw": "tinha capitis tinea capitis tinha do couro cabeludo micose do couro cabeludo falha no cabelo queda de cabelo em placa caspa com falha querion kerion pontos pretos favo microsporum canis trichophyton tonsurans gato cachorro griseofulvina terbinafina cetoconazol xampu shampoo sulfeto de selenio reacao id",
  "draft": true,
  "revisado": null,
  "resumo": "Dermatofitose do couro cabeludo e dos cabelos, quase só em crianças. O tratamento é sempre oral (griseofulvina ou terbinafina, conforme o fungo), com xampu antifúngico só como adjuvante para reduzir o contágio.",
  "secoes": [
   {
    "t": "Quando pensar / diagnóstico",
    "itens": [
     "Placa de alopecia com descamação e cabelos quebrados rente ao couro (pontos pretos), com ou sem coceira, em criança.",
     "Quérion: placa inflamada, dolorosa, com pústulas e secreção, às vezes com linfonodo e febre — não é abscesso.",
     "Fonte: gato ou cão com falhas no pelo (Microsporum) ou outra criança (Trichophyton).",
     "Diferenciais: dermatite seborreica, psoríase, alopecia areata (sem descamação), tricotilomania, impetigo."
    ]
   },
   {
    "t": "Exame físico: o que procurar",
    "itens": [
     "Tamanho e número das placas, cabelos tonsurados, pústulas e linfonodos occipitais e cervicais.",
     "Pele do corpo (tinha associada) e contatos da casa.",
     "Lâmpada de Wood: fluorescência verde sugere Microsporum; Trichophyton geralmente não fluoresce."
    ]
   },
   {
    "t": "Exames complementares",
    "itens": [
     "Exame micológico direto e cultura de cabelos arrancados e escamas, de preferência antes de iniciar.",
     "Hemograma e TGO/TGP antes do oral se tratamento prolongado, hepatopatia ou outros hepatotóxicos."
    ]
   },
   {
    "t": "Conduta",
    "itens": [
     "Tratamento oral obrigatório; creme ou xampu sozinho não cura.",
     "Microsporum ou fungo ainda desconhecido: griseofulvina 20 a 25 mg/kg/dia com alimento gorduroso por 6 a 8 semanas (máximo 1 g/dia).",
     "Trichophyton na cultura: terbinafina pelo peso por 4 semanas.",
     "Xampu de cetoconazol 2 a 3 vezes por semana para a criança e os contatos, para reduzir a transmissão.",
     "Quérion: não drenar; antifúngico oral, analgesia e antibiótico só se infecção bacteriana evidente.",
     "Pápulas pelo corpo logo após iniciar o remédio (reação id) não são alergia ao antifúngico.",
     "Adulto: raro; pensar em imunossupressão, mesma lógica de tratamento."
    ]
   },
   {
    "t": "Sinais de alarme e quando internar/encaminhar",
    "itens": [
     "Quérion extenso, febre ou celulite: reavaliar em 24 a 48 h e discutir com a dermatologia.",
     "Sem cura clínica e micológica no fim do tratamento: prolongar e repetir a cultura.",
     "Icterícia, vômitos persistentes ou bolhas na pele durante o tratamento: suspender e avaliar."
    ],
    "alerta": true
   },
   {
    "t": "Orientações ao paciente",
    "itens": [
     "O remédio pela boca é o tratamento principal; o xampu só ajuda a não passar para os outros.",
     "Dar a griseofulvina junto com alimento gorduroso, como leite.",
     "Não compartilhar pentes, escovas, bonés, toalhas e travesseiros; levar o animal com falhas no pelo ao veterinário.",
     "A criança pode ir à escola depois de começar o tratamento."
    ]
   }
  ],
  "pendencias": [
   "Material do Drive não traz tinha capitis; nada a importar.",
   "AAFP 2025 prefere terbinafina (cursos mais curtos); a BAD 2014 escolhe pelo fungo (Microsporum responde melhor à griseofulvina). DATA usa griseofulvina como padrão — decidir pelo agente mais comum na região.",
   "Bloco 'Receita' do DATA: griseofulvina 500 mg 1 vez ao dia com 50 comprimidos para 8 semanas (faltam 6) e 500 mg/dia no adulto, metade do Padrão — corrigir.",
   "Conferir na bula brasileira a idade mínima de griseofulvina e terbinafina oral (o DATA usa 2 anos)."
  ],
  "fontes": [
   "Fuller LC et al. British Association of Dermatologists' guidelines for the management of tinea capitis 2014. Br J Dermatol. 2014;171(3):454-463.",
   "Kakourou T, Uksal U. Guidelines for the management of tinea capitis in children. Pediatr Dermatol. 2010;27(3):226-228.",
   "Caplan AS, Gold JAW, Smith DJ, Ely JW. Diagnosis and management of tinea infections. Am Fam Physician. 2025;112(4):382-392."
  ]
 },
 {
  "id": "tinha_corporis",
  "tipo": "condicao",
  "cond": "tinha_corporis",
  "nm": "Tinha do corpo (tinea corporis) e crural",
  "sub": "impingem · borda ativa · antifúngico tópico · terbinafina · sem corticoide",
  "kw": "tinha corporis tinea corporis tinha do corpo impingem impinge micose de pele roda vermelha que coca tinha cruris tinha crural micose da virilha frieira pe de atleta tinea pedis dermatofito trichophyton indotineae resistente terbinafina miconazol clotrimazol isoconazol itraconazol fluconazol tinha incognita",
  "draft": true,
  "revisado": null,
  "resumo": "Dermatofitose da pele sem pelos: placa arredondada com borda ativa descamativa e centro mais claro, que coça. Antifúngico tópico sem corticoide por 2 a 4 semanas resolve a maioria; oral se extensa, folicular, imunossupressão ou falha.",
  "secoes": [
   {
    "t": "Quando pensar / diagnóstico",
    "itens": [
     "Placa anular de borda elevada e descamativa, que cresce para fora e clareia no centro; pode haver várias.",
     "Fontes: gato, cão, outras pessoas, esporte de contato e a própria frieira ou micose de unha.",
     "Creme com corticoide mascara a micose (tinha incógnita): lesão extensa, pouco descamativa, de borda apagada.",
     "Diferenciais: eczema numular, psoríase, pitiríase rósea (placa-mãe), granuloma anular, hanseníase."
    ]
   },
   {
    "t": "Exame físico: o que procurar",
    "itens": [
     "Medir e contar as placas; examinar pés, virilha, unhas e, na criança, o couro cabeludo.",
     "Pústulas e nódulos na placa sugerem acometimento folicular, que pede tratamento oral.",
     "Lesões extensas, muito inflamadas, genitais ou que não respondem: pensar em fungo resistente."
    ]
   },
   {
    "t": "Exames complementares",
    "itens": [
     "Clínico no caso típico; exame micológico direto e cultura se atípico, extenso ou sem resposta.",
     "Antes de terbinafina oral: TGO/TGP se hepatopatia, etilismo ou outros hepatotóxicos."
    ]
   },
   {
    "t": "Conduta",
    "itens": [
     "Tópico 2 vezes ao dia na lesão e 2 cm ao redor: terbinafina creme por 2 semanas ou azólico (miconazol, clotrimazol) por 2 a 4 semanas.",
     "Com azólico, manter 1 a 2 semanas depois de sumir; nunca associar corticoide.",
     "Oral se muitas placas, área extensa, folicular, imunossupressão ou falha: terbinafina 250 mg/dia por 2 a 4 semanas.",
     "Tratar junto a frieira e a micose de unha, que reinfectam.",
     "Criança: miconazol ou clotrimazol; terbinafina creme só a partir de 12 anos (bula); oral pelo peso se extensa.",
     "Sem resposta à terbinafina bem usada: cultura; T. indotineae resistente já foi descrito no Brasil — discutir itraconazol com a dermatologia."
    ]
   },
   {
    "t": "Sinais de alarme e quando internar/encaminhar",
    "itens": [
     "Lesões que pioram ou se espalham apesar do tratamento correto: rever diagnóstico e pensar em resistência.",
     "Dor, calor, pus ou febre: infecção bacteriana associada.",
     "Imunossuprimido com lesões extensas ou profundas: encaminhar."
    ],
    "alerta": true
   },
   {
    "t": "Orientações ao paciente",
    "itens": [
     "Passar o creme na mancha e um pouco além da borda, 2 vezes ao dia, pelo tempo receitado, mesmo que melhore antes.",
     "Não usar cremes com corticoide nem misturas que tenham corticoide.",
     "Secar bem as dobras e entre os dedos e não compartilhar toalhas e roupas.",
     "Levar ao veterinário o animal com falhas no pelo."
    ]
   },
   {
    "t": "Outras opções (material do médico)",
    "itens": [
     "Fluconazol 150 mg 1 vez por semana por 2 a 4 semanas — alternativa oral quando a terbinafina não pode ser usada; esquema pouco padronizado."
    ],
    "offlabel": true
   }
  ],
  "pendencias": [
   "Tigers e Principais condutas usam cremes de antifúngico + corticoide (isoconazol + diflucortolona; cetoconazol + betametasona): a AAFP 2025 manda evitar — não importar.",
   "Apostilas citam cetoconazol oral 200 mg/dia por 4 semanas: contraindicado em micose de pele (Anvisa 2013) — não importar.",
   "Fluconazol semanal (apostilas) proposto em Outras opções; 150 mg/semana por 2 a 4 semanas consta em bula europeia, não conferida na brasileira — confirmar.",
   "O KW da condição não tem frieira, pé de atleta e crural; o Drive sugere tinha dos pés e crural como condições novas — decidir.",
   "T. indotineae resistente à terbinafina foi descrito no Brasil (2024–2025): avaliar uma linha de alerta no Padrão."
  ],
  "fontes": [
   "Caplan AS, Gold JAW, Smith DJ, Ely JW. Diagnosis and management of tinea infections. Am Fam Physician. 2025;112(4):382-392.",
   "Veasey JV et al. First case of Trichophyton indotineae in Brazil: clinical and mycological criteria and genetic identification of terbinafine resistance. An Bras Dermatol. 2025;100(3):557-560.",
   "Nobrega de Almeida J Jr et al. Trichophyton indotineae infection, São Paulo, Brazil, 2024. Emerg Infect Dis. 2025;31(5):1049-1051."
  ]
 },
 {
  "id": "herpes_zoster",
  "tipo": "condicao",
  "cond": "herpes_zoster",
  "nm": "Herpes-zóster (cobreiro)",
  "sub": "dermátomo · antiviral até 72 h · oftálmico · neuralgia · imunossuprimido",
  "kw": "herpes zoster cobreiro cobrero zona dor em faixa bolhas em faixa dermatomo varicela zoster neuralgia pos herpetica herpes oftalmico sinal de hutchinson ramsay hunt paralisia facial aciclovir valaciclovir fanciclovir dipirona paracetamol gabapentina pregabalina amitriptilina vacina recombinante",
  "draft": true,
  "revisado": null,
  "resumo": "Reativação do vírus varicela-zóster: dor em queimação seguida de vesículas agrupadas em um dermátomo, sem cruzar a linha média. Antiviral oral iniciado até 72 h encurta o quadro; zóster oftálmico, disseminado ou em imunossuprimido pede avaliação urgente e, muitas vezes, aciclovir EV.",
  "secoes": [
   {
    "t": "Quando pensar / diagnóstico",
    "itens": [
     "Dor, ardor ou formigamento em faixa de um lado 1 a 5 dias antes; depois vesículas agrupadas sobre base vermelha no mesmo dermátomo.",
     "Mais comum acima de 50 anos e em imunossuprimidos (HIV, câncer, corticoide, biológicos, transplante).",
     "Antes das lesões, confunde com angina, cólica renal, colecistite ou radiculopatia.",
     "Zóster em adulto jovem sem causa aparente: oferecer teste de HIV."
    ]
   },
   {
    "t": "Exame físico: o que procurar",
    "itens": [
     "Dermátomo acometido, quantos dermátomos e lesões fora dele (mais de 20 vesículas à distância = disseminado).",
     "Ramo oftálmico: testa, pálpebra, ponta do nariz (sinal de Hutchinson), olho vermelho, dor ocular, baixa visual.",
     "Orelha com paralisia facial, zumbido ou vertigem: síndrome de Ramsay Hunt.",
     "Infecção bacteriana secundária e fraqueza no segmento acometido."
    ]
   },
   {
    "t": "Exames complementares",
    "itens": [
     "Diagnóstico clínico; não precisa de exame no quadro típico.",
     "Atípico ou imunossuprimido: PCR do líquido da vesícula, se disponível; creatinina antes de aciclovir EV."
    ]
   },
   {
    "t": "Conduta",
    "itens": [
     "Antiviral por 7 dias, de preferência até 72 h das lesões: valaciclovir 1 g 8/8h ou aciclovir 800 mg 5 vezes ao dia.",
     "Depois de 72 h, tratar mesmo assim se ainda há vesículas novas, acima de 50 anos, cabeça e pescoço, dor intensa ou imunossupressão.",
     "Ajustar a dose à função renal e manter boa hidratação.",
     "Dor em horário fixo com analgésico ou AINE; dor neuropática intensa: considerar gabapentina, pregabalina ou amitriptilina em dose baixa.",
     "Corticoide oral não é recomendado de rotina (não previne a neuralgia pós-herpética).",
     "Lesões: água e sabão e compressas frias; sem pomada de corticoide ou de antibiótico.",
     "Criança saudável costuma ter quadro leve; tratar se oftálmico, extenso ou imunossuprimida (grave: aciclovir EV 10 mg/kg 8/8h)."
    ]
   },
   {
    "t": "Sinais de alarme e quando internar/encaminhar",
    "itens": [
     "Zóster oftálmico ou sinal de Hutchinson: antiviral já e oftalmologia no mesmo dia.",
     "Disseminado, imunossupressão grave, acometimento visceral ou do SNC (confusão, rigidez de nuca, déficit): internar para aciclovir EV 10 mg/kg 8/8h.",
     "Ramsay Hunt: antiviral e avaliação com otorrino; corticoide pode entrar pela paralisia facial.",
     "Imunossuprimido com zóster localizado: antiviral oral sempre e reavaliar em 24 a 48 h, com limiar baixo para EV."
    ],
    "alerta": true
   },
   {
    "t": "Orientações ao paciente",
    "itens": [
     "Começar o remédio hoje e tomar até o fim, bebendo bastante água.",
     "Manter as bolhas cobertas, não furar e lavar com água e sabão.",
     "Até tudo virar casca, evitar contato com gestantes, recém-nascidos e imunossuprimidos que nunca tiveram catapora.",
     "Voltar na hora se lesão perto do olho ou na ponta do nariz, alteração da visão, bolhas pelo corpo, febre alta, confusão ou fraqueza no rosto.",
     "Depois de curar, conversar na UBS sobre a vacina contra herpes-zóster."
    ]
   }
  ],
  "pendencias": [
   "'Opção 1' e 'Opção 2' do DATA trazem creme de betametasona + gentamicina, mas a orientação do Padrão proíbe pomada de corticoide ou antibiótico — retirar ou justificar.",
   "'Opção 2' do DATA usa prednisona 20 mg 12/12h por 5 dias; a diretriz europeia (2017) não recomenda corticoide de rotina — decidir.",
   "DATA não tem bloco de internação (aciclovir EV 10 mg/kg 8/8h no oftálmico grave, disseminado ou imunossuprimido) nem bloco pediátrico — avaliar.",
   "DATA não tem opção para dor neuropática aguda (gabapentina, pregabalina, amitriptilina) — avaliar bloco em Outras opções.",
   "Material do Drive não traz herpes-zóster (só herpes labial, condição nova); nada a importar.",
   "Vacina recombinante contra zóster: a Conitec recomendou não incorporar ao SUS (relatório nº 1.073, 2026) — confirmar a situação antes de orientar onde vacinar."
  ],
  "fontes": [
   "Werner RN et al. European consensus-based (S2k) Guideline on the Management of Herpes Zoster – guided by the EDF in cooperation with the EADV, Part 2: Treatment. J Eur Acad Dermatol Venereol. 2017;31(1).",
   "Cohen JI. Clinical practice: Herpes zoster. N Engl J Med. 2013;369(3):255-263.",
   "Brasil. Conitec. Relatório de Recomendação nº 1.073: vacina recombinante adjuvada para a prevenção do herpes-zóster. 2026."
  ]
 },
 {
  "id": "queimaduras",
  "tipo": "condicao",
  "cond": "queimaduras",
  "nm": "Queimaduras",
  "sub": "profundidade · % SCQ · reposição volêmica · via aérea · curativo",
  "kw": "queimadura queimado agua quente escaldadura oleo fogo choque eletrico queimadura quimica queimadura solar primeiro grau segundo grau terceiro grau bolha sulfadiazina de prata curativo regra dos nove lund browder scq superficie corporal queimada parkland ringer lactato ressuscitacao volemica diurese lesao inalatoria monoxido de carbono carboxi hemoglobina cianeto escarotomia antitetanica vacina dt imunoglobulina antitetanica morfina dipirona paracetamol maus tratos centro de queimados",
  "draft": true,
  "revisado": null,
  "resumo": "Lesão térmica, elétrica ou química classificada pela profundidade e pela superfície corporal queimada (SCQ). Queimadura pequena e superficial trata em casa com resfriamento, curativo e analgesia; grande queimado, via aérea, áreas nobres, elétrica ou química vão para estabilização, reposição volêmica e regulação para centro de queimados.",
  "secoes": [
   {
    "t": "Quando pensar / diagnóstico",
    "itens": [
     "1º grau: só vermelhidão e dor, sem bolha (como a solar); não entra no cálculo da SCQ.",
     "2º grau superficial: bolhas, leito rosado e úmido, muito doloroso; 2º grau profundo: leito pálido ou mosqueado, menos dor.",
     "3º grau: pele branca, acinzentada ou escura, endurecida e indolor.",
     "SCQ: regra dos nove no adulto; na criança, Lund-Browder (cabeça proporcionalmente maior); a palma da mão com dedos vale cerca de 1%."
    ]
   },
   {
    "t": "Exame físico: o que procurar",
    "itens": [
     "Começar pelo ABCDE, com prevenção de hipotermia.",
     "Lesão inalatória: queimadura de face, vibrissas queimadas, escarro com fuligem, rouquidão, estridor, incêndio em ambiente fechado.",
     "Queimadura circunferencial de tórax ou membro: vigiar ventilação, pulsos e síndrome compartimental.",
     "Criança: história incompatível, padrão em luva ou meia, bordas nítidas ou marcas de cigarro sugerem maus-tratos."
    ]
   },
   {
    "t": "Exames complementares",
    "itens": [
     "Queimadura pequena: não precisa de exame.",
     "Grande queimado: gasometria com carboxi-hemoglobina e lactato, hemograma, eletrólitos, função renal, glicemia e tipagem.",
     "Elétrica: ECG, CPK e urina (mioglobinúria); monitorizar se alta voltagem, arritmia ou perda de consciência.",
     "A oximetria de pulso não detecta carboxi-hemoglobina: saturação normal não afasta intoxicação por CO."
    ]
   },
   {
    "t": "Conduta",
    "itens": [
     "Resfriar com água corrente fria (não gelada) por 20 min nas primeiras 3 h; tirar anéis e roupas não aderidas.",
     "Química: retirar o pó seco e irrigar com muita água por tempo prolongado antes de qualquer outra coisa.",
     "1º grau: hidratante, analgesia e proteção solar; não precisa de pomada.",
     "2º grau pequeno: limpar, desbridar bolhas rotas, curativo (sulfadiazina de prata ou curativo não aderente) e reavaliar em 48 a 72 h.",
     "Volume se 2º/3º grau acima de 20% SCQ no adulto ou 10% na criança: Ringer lactato 2 mL/kg/%SCQ (criança 3, elétrica 4), metade em 8 h.",
     "Titular pela diurese: 0,5 mL/kg/h no adulto e 1 mL/kg/h na criança até 30 kg; evitar excesso de volume (ver Parkland em Escores).",
     "Analgesia potente (opioide EV no grande queimado e antes dos curativos) e profilaxia do tétano pelo cartão vacinal.",
     "Antibiótico profilático não é indicado; tratar só infecção evidente (celulite, pus, sinais sistêmicos)."
    ]
   },
   {
    "t": "Sinais de alarme e quando internar/encaminhar",
    "itens": [
     "Sinais de lesão inalatória, estridor ou rebaixamento: intubação precoce por quem tem mais experiência.",
     "2º grau extenso, qualquer 3º grau significativo, ou face, mãos, pés, genitais, períneo e grandes articulações: regular para centro de queimados.",
     "Queimadura elétrica, química ou com trauma associado; comorbidade grave; extremos de idade.",
     "Incêndio fechado com lactato alto, hipotensão ou coma: suspeitar de cianeto."
    ],
    "alerta": true
   },
   {
    "t": "Orientações ao paciente",
    "itens": [
     "Lavar a queimadura com água corrente e sabão neutro antes de trocar o curativo.",
     "Não furar bolhas inteiras e não passar pasta de dente, manteiga, pó de café ou receitas caseiras.",
     "Proteger do sol a pele queimada por pelo menos 1 ano para não manchar.",
     "Voltar se febre, pus, mau cheiro, vermelhidão que se espalha ou piora da dor."
    ]
   }
  ],
  "pendencias": [
   "Tigers e Principais condutas prescrevem cefalexina profilática por 10 dias: não indicada — corretamente fora do DATA.",
   "Plantãozinho e a calculadora Parkland de Escores (Ficha Vermelha) abrem em 4 mL/kg/%SCQ; ABA 2023 e o DATA usam 2 mL/kg no adulto — só sinalizar, Escores não muda aqui.",
   "Sulfadiazina de prata pode atrasar a epitelização da queimadura superficial; curativos não aderentes, hidrocoloide ou com prata são alternativas onde houver — decidir a redação do Padrão.",
   "Limiares de transferência variam entre fontes (ABA 2022, cartilha do MS 2012) — confirmar com a regulação local e ajustar o texto.",
   "Pediátrico ambulatorial do DATA só tem analgesia; falta bloco de curativo (sulfadiazina contraindicada abaixo de 2 meses) — avaliar.",
   "Queimadura solar com calamina + difenidramina tópica (apostilas) seria condição nova; difenidramina tópica sensibiliza — não importar."
  ],
  "fontes": [
   "Cartotto R et al. American Burn Association Clinical Practice Guidelines on Burn Shock Resuscitation. J Burn Care Res. 2024;45(3):565-589.",
   "ISBI Practice Guidelines Committee. ISBI Practice Guidelines for Burn Care. Burns. 2016;42(5):953-1021.",
   "Brasil. Ministério da Saúde. Cartilha para tratamento de emergência das queimaduras. Brasília; 2012.",
   "American Burn Association. Guidelines for Burn Patient Referral. 2022."
  ]
 },
 {
  "id": "alergia",
  "tipo": "condicao",
  "cond": "alergia",
  "nm": "Alergia / urticária / prurido",
  "sub": "urticária · angioedema · anti-histamínico · anafilaxia · prurido",
  "kw": "alergia urticaria vergoes placas que cocam empolamento coceira prurido angioedema inchaco de labio inchaco no olho reacao alergica picada de inseto alergia a remedio alergia alimentar loratadina cetirizina levocetirizina desloratadina fexofenadina hidroxizina dexclorfeniramina prometazina prednisona prednisolona adrenalina anafilaxia ieca enalapril angioedema hereditario dermografismo",
  "draft": true,
  "revisado": null,
  "resumo": "Urticária aguda (vergões que somem em menos de 24 h cada, com ou sem angioedema) é a forma mais comum de alergia no PS. Trata-se com anti-histamínico de 2ª geração em horário fixo; o essencial é reconhecer anafilaxia, que exige adrenalina IM imediata.",
  "secoes": [
   {
    "t": "Quando pensar / diagnóstico",
    "itens": [
     "Urticária: placas elevadas que coçam, mudam de lugar e somem sem marca em menos de 24 h; aguda se menos de 6 semanas.",
     "Gatilhos: infecções virais (principal causa na criança), AINE, antibióticos, alimentos e picadas; muitas vezes não se acha a causa.",
     "Angioedema sem urticária: pensar em IECA (bradicinina) ou angioedema hereditário — não responde a anti-histamínico nem a corticoide.",
     "Lesão fixa por mais de 24 h, dolorosa, com púrpura ou mancha residual: pensar em vasculite urticariforme.",
     "Prurido generalizado sem lesão: xerose do idoso, escabiose, colestase, uremia, tireoide, ferropenia, linfoma e medicamentos."
    ]
   },
   {
    "t": "Exame físico: o que procurar",
    "itens": [
     "Sinais vitais, voz, estridor, sibilos, edema de língua e úvula e perfusão: anafilaxia é diagnóstico clínico.",
     "Anafilaxia provável: início súbito com pele ou mucosa mais falta de ar, hipotensão ou sintomas gastrointestinais intensos; ou hipotensão/broncoespasmo após alérgeno conhecido, mesmo sem pele.",
     "No prurido sem lesão: procurar escabiose, dermografismo, icterícia e linfonodos."
    ]
   },
   {
    "t": "Exames complementares",
    "itens": [
     "Urticária aguda: não precisa de exame.",
     "Prurido generalizado persistente sem lesão: hemograma, ferritina, função hepática e renal, TSH e glicemia na UBS.",
     "Urticária por mais de 6 semanas: encaminhar para investigação de urticária crônica."
    ]
   },
   {
    "t": "Conduta",
    "itens": [
     "Anti-histamínico H1 de 2ª geração 1 vez ao dia em horário fixo (loratadina, cetirizina, desloratadina, fexofenadina) até alguns dias depois de sumir.",
     "Sem controle: a diretriz internacional permite subir até 4 vezes a dose padrão (fora da bula).",
     "Evitar anti-histamínico de 1ª geração de rotina (sedação, quedas, risco ao dirigir); se usar, à noite e por pouco tempo.",
     "Quadro intenso ou extenso: prednisona 40 mg/dia por 3 a 5 dias (no máximo 10).",
     "Suspender o provável desencadeante e evitar AINE e AAS durante o quadro.",
     "Anafilaxia: adrenalina IM 0,01 mg/kg na coxa (máximo 0,5 mg no adulto e 0,3 mg na criança) — ver Anafilaxia em Prescrições.",
     "Criança: desloratadina a partir de 6 meses, loratadina e cetirizina a partir de 2 anos; prednisolona 1 mg/kg/dia se intensa."
    ]
   },
   {
    "t": "Sinais de alarme e quando internar/encaminhar",
    "itens": [
     "Rouquidão, estridor, dificuldade para engolir, chiado, hipotensão, desmaio ou vômitos repetidos: anafilaxia — adrenalina IM já.",
     "Angioedema de língua ou laringe sem urticária (IECA ou hereditário): observar a via aérea; anti-histamínico não basta.",
     "Febre, lesões em alvo, bolhas ou lesões em mucosas: farmacodermia grave, não urticária.",
     "Depois de anafilaxia: observar pelo menos 6 h (mais se grave ou com mais de 1 dose de adrenalina) e encaminhar ao alergista."
    ],
    "alerta": true
   },
   {
    "t": "Orientações ao paciente",
    "itens": [
     "Tomar o antialérgico todos os dias no mesmo horário, mesmo melhorando, pelo tempo receitado.",
     "Evitar o que pode ter causado e não usar AAS ou anti-inflamatórios enquanto durar a alergia.",
     "Banho morno ou frio, compressas frias e hidratante sem perfume aliviam a coceira.",
     "Procurar o PS na hora se falta de ar, chiado, inchaço de lábios, língua ou garganta, tontura ou desmaio."
    ]
   },
   {
    "t": "Outras opções (material do médico)",
    "itens": [
     "Loratadina 10 mg 12/12h (dose dobrada) — urticária sem controle com a dose padrão; apoiada pela diretriz EAACI 2022, fora da bula.",
     "Dexclorfeniramina 2 mg à noite ou até 8/8h — coceira que atrapalha o sono; 1ª geração, sedativa, evitar em idosos e motoristas."
    ],
    "offlabel": true
   }
  ],
  "pendencias": [
   "Pediátrico de internação do DATA usa adrenalina IM com máximo de 0,5 mg; as Calculadoras foram corrigidas para 0,3 mg abaixo de 12 anos (WAO 2020) — alinhar.",
   "O Padrão do DATA põe hidroxizina (1ª geração) no mesmo menu dos de 2ª geração; a diretriz EAACI 2022 desaconselha 1ª geração de rotina — decidir se vai para Outras opções.",
   "Tigers e Principais condutas: hidrocortisona 500 mg EV em bolus (dose excessiva, sem efeito imediato) e 'meia ampola' de adrenalina sem via — não importar; DATA já usa 200 mg e 0,5 mg IM.",
   "Tigers traz loratadina 12/12h e o levantamento do Drive mandou não aproveitar, mas a EAACI 2022 permite até 4 vezes a dose — proposta em Outras opções, decidir.",
   "Plantãozinho: prometazina 50 mg VO 8/8h (o comprimido é de 25 mg) e hidroxizina 10 mg — não importar.",
   "Posologia do DATA (5 dias e depois se coceira) difere da diretriz (horário fixo até a remissão) — revisar a redação."
  ],
  "fontes": [
   "Zuberbier T et al. The international EAACI/GA²LEN/EuroGuiDerm/APAAACI guideline for the definition, classification, diagnosis, and management of urticaria. Allergy. 2022;77(3):734-766.",
   "Cardona V et al. World Allergy Organization anaphylaxis guidance 2020. World Allergy Organ J. 2020;13(10):100472."
  ]
 },
 {
  "id": "dengue",
  "tipo": "condicao",
  "cond": "dengue",
  "nm": "Dengue",
  "sub": "arbovirose · grupos A a D · sinais de alarme · hidratação · hematócrito",
  "kw": "dengue arbovirose aedes aegypti febre exantema manchas dor retro-orbitaria dor atras dos olhos mialgia dor no corpo prova do laco petequias plaquetas plaquetopenia hematocrito ns1 sinais de alarme choque grupo a grupo b grupo c grupo d hidratacao oral soro de reidratacao oral sro soro fisiologico expansao volemica dipirona paracetamol cartao de acompanhamento gestante lactente idoso notificacao",
  "draft": true,
  "revisado": null,
  "resumo": "Arbovirose com febre de 2 a 7 dias, mialgia, cefaleia, dor retro-orbitária e exantema; a fase crítica começa quando a febre cai. No PS/UBS a decisão é classificar em A, B, C ou D (sinais de alarme, choque, sangramento, condições especiais) e hidratar conforme o grupo.",
  "secoes": [
   {
    "t": "Quando pensar / diagnóstico",
    "itens": [
     "Febre de 2 a 7 dias com dois ou mais: náusea ou vômitos, exantema, mialgia/artralgia, cefaleia ou dor retro-orbitária, petéquias ou prova do laço positiva.",
     "Fase crítica entre o 3º e o 7º dia, em geral na queda da febre: é quando surgem os sinais de alarme e o choque.",
     "Grupo A: sem alarme, sangramento de pele, condição especial, comorbidade ou risco social. Grupo B: sem alarme, mas com algum desses.",
     "Condições especiais: lactente < 24 meses, gestante, > 65 anos, HAS/cardiopatia, diabetes, asma/DPOC, obesidade, doença renal, hepática, hematológica, ácido-péptica ou autoimune.",
     "Grupo C: qualquer sinal de alarme. Grupo D: choque, sangramento grave ou disfunção grave de órgão.",
     "Diferenciais: chikungunya (artrite intensa), zika (exantema pruriginoso precoce), leptospirose, influenza e malária em quem viajou."
    ]
   },
   {
    "t": "Exame físico: o que procurar",
    "itens": [
     "PA deitado e em pé (hipotensão postural), FC, FR, enchimento capilar, diurese referida e peso.",
     "Abdome (dor intensa e contínua, hepatomegalia > 2 cm, ascite), derrame pleural, sangramento de mucosas, letargia ou irritabilidade.",
     "Prova do laço sem sangramento espontâneo: manguito na PA média (PAS + PAD)/2 por 5 min no adulto e 3 min na criança.",
     "Prova positiva: 20 ou mais petéquias (adulto) ou 10 ou mais (criança) num quadrado de 2,5 cm no antebraço.",
     "Choque: taquicardia, extremidades frias, enchimento capilar > 2 s, PA convergente (< 20 mmHg), taquipneia, oligúria; hipotensão é tardia."
    ]
   },
   {
    "t": "Exames complementares",
    "itens": [
     "Grupo A: exames a critério médico. Grupo B: hemograma obrigatório, resultado em 2–4 h, em observação e hidratando por via oral.",
     "Grupos C e D: hemograma, albumina e transaminases; RX de tórax (PA, perfil e Laurell) e USG de abdome para derrames; renal, eletrólitos e coagulograma conforme o caso.",
     "Hematócrito em elevação progressiva é sinal de alarme; comparar com valor anterior ou com a referência para idade e sexo."
    ]
   },
   {
    "t": "Conduta",
    "itens": [
     "Grupos A e B: hidratação oral de 60 mL/kg/dia no adulto, 1/3 em SRO e 2/3 em líquidos caseiros, até 24–48 h após o fim da febre.",
     "Criança: 130 mL/kg/dia até 10 kg; 100 mL/kg/dia de 10 a 20 kg; 80 mL/kg/dia acima de 20 kg; 1/3 nas primeiras 4–6 h; manter o aleitamento.",
     "Dipirona ou paracetamol para dor e febre (criança 10 mg/kg/dose até 6/6 h); nunca AAS, AINE, corticoide ou injeção IM.",
     "Grupo B com hematócrito normal: tratamento em casa com reavaliação clínica e hemograma diários até 48 h após o fim da febre.",
     "Grupo C: SF 0,9% 10 mL/kg/h por 2 h (fase de expansão), reavaliando a cada hora e com Ht ao fim; repetir até 3 fases.",
     "Melhorou: manutenção com SF 25 mL/kg em 6 h e depois 25 mL/kg em 8 h. Sem melhora após 3 fases: conduzir como grupo D.",
     "Grupo D: SF 20 mL/kg em até 20 min, até 3 vezes, e UTI; Ht subindo após 3 expansões: albumina; Ht caindo: procurar sangramento e transfundir.",
     "Idoso, cardiopata e renal: auscultar a cada etapa — risco de congestão, sobretudo na fase de reabsorção. Notificar o caso e preencher o cartão de acompanhamento."
    ]
   },
   {
    "t": "Sinais de alarme e quando internar/encaminhar",
    "itens": [
     "Sinais de alarme: dor abdominal intensa e contínua, vômitos persistentes, ascite ou derrames, hipotensão postural, hepatomegalia > 2 cm, sangramento de mucosa, letargia, Ht subindo.",
     "Qualquer sinal de alarme = grupo C: iniciar SF já, mesmo antes dos exames ou durante a transferência; internar por no mínimo 48 h.",
     "Gestante é no mínimo grupo B; com sinal de alarme, mesmo volume dos demais (evitar hiper-hidratação), deitada em decúbito lateral esquerdo.",
     "Alta hospitalar só com 48 h de estabilidade, 24 h sem febre, melhora clínica, Ht normal e estável por 24 h e plaquetas subindo."
    ],
    "alerta": true
   },
   {
    "t": "Orientações ao paciente",
    "itens": [
     "Beba bastante líquido todos os dias, na quantidade escrita na receita, incluindo soro de reidratação oral, mesmo sem sede.",
     "Não tome AAS, ibuprofeno, diclofenaco, nimesulida nem outros anti-inflamatórios ou corticoides.",
     "Volte no dia em que a febre passar: é quando a doença pode piorar.",
     "Volte na hora se dor forte na barriga, vômitos repetidos, sangramento, tontura ao levantar, desmaio, sonolência ou pouca urina.",
     "Use repelente enquanto estiver com febre, para o mosquito não pegar o vírus de você, e elimine água parada."
    ]
   },
   {
    "t": "Outras opções (material do médico)",
    "itens": [
     "Loratadina 10 mg 1 vez ao dia se prurido (modelo do próprio médico) — sintomático da convalescença; o manual do MS 2024 não cita antipruriginoso.",
     "Criança ≥ 2 anos com náuseas: dimenidrinato + piridoxina gotas, 1 gota/kg (1,25 mg/kg) a cada 6–8 h — sedação; contraindicado < 2 anos.",
     "Dipirona solução oral 50 mg/mL, 0,2 mL/kg (10 mg/kg/dose) — alternativa às gotas, apresentação listada no manual do MS."
    ],
    "offlabel": true
   }
  ],
  "pendencias": [
   "Blocos antigos 'Grupo A' e 'Grupo B' (Outras opções) orientam volume fixo (1 L de soro caseiro + 2 L de líquidos) e retorno em 48 h; o MS 2024 usa 60 mL/kg/dia e reavaliação diária no grupo B — remover ou atualizar?",
   "Paracetamol gotas: o DATA calcula com 15 gotas/mL; o Apêndice H do MS 2024 diz 1 mL = 20 gotas. Varia por fabricante — conferir e padronizar o cálculo.",
   "O MS 2024 cita dipirona 500 mg até 6/6 h no adulto; o DATA usa 1 g (dentro da bula) — confirmar.",
   "Material do Drive (Tigers, Principais condutas) usa volumes antigos (grupo A 80 mL/kg/dia; grupo C 20 mL/kg/h) e o 'prescrição - pronto atendimento' manda Ht > 44% para observação com 1/3 SF + 2/3 SG — desatualizados, não usados.",
   "Prova do laço: o PDF do Drive insufla o manguito a 100 mmHg; o MS manda insuflar na PA média — o resumo segue o MS (que também lembra o baixo valor preditivo da prova).",
   "Dose pediátrica de dipirona/paracetamol difere entre arboviroses no DATA (dengue 10 mg/kg; chikungunya e zika 15 mg/kg). Padronizar enquanto dengue não estiver afastada?",
   "Antieméticos (metoclopramida, ondansetrona) e antipruriginoso não constam do manual de dengue 2024 — são prática clínica; confirmar."
  ],
  "fontes": [
   "Brasil. Ministério da Saúde. Dengue: diagnóstico e manejo clínico – adulto e criança. 6ª ed. Brasília: MS; 2024.",
   "Organização Pan-Americana da Saúde (OPAS). Guidelines for the clinical diagnosis and treatment of dengue, chikungunya, and Zika. Washington, DC: OPAS; 2022.",
   "World Health Organization. Dengue: guidelines for diagnosis, treatment, prevention and control. Geneva: WHO; 2009."
  ]
 },
 {
  "id": "chikungunya",
  "tipo": "condicao",
  "cond": "chikungunya",
  "nm": "Chikungunya",
  "sub": "artralgia · febre · analgesia em horário fixo · fase subaguda · fase crônica",
  "kw": "chikungunya chicungunha chikungunha chicungunya arbovirose aedes febre alta artralgia artrite dor nas juntas dor nas articulacoes poliartralgia inchaco nas juntas tenossinovite exantema fase aguda subaguda cronica eva escala de dor dipirona paracetamol codeina tramadol morfina prednisona corticoide hidroxicloroquina metotrexato amitriptilina gabapentina compressa fria recem-nascido gestante notificacao",
  "draft": true,
  "revisado": null,
  "resumo": "Arbovirose com febre alta súbita e artralgia intensa, simétrica e incapacitante, que pode durar meses. No PS/UBS: afastar dengue, procurar sinais de gravidade e tratar a dor em horários fixos, escalonada pela EVA, sem AINE nem corticoide na fase aguda.",
  "secoes": [
   {
    "t": "Quando pensar / diagnóstico",
    "itens": [
     "Febre de início súbito (até 7 dias) com artralgia ou artrite intensa, em geral simétrica e distal (mãos, punhos, tornozelos); cefaleia, mialgia e exantema.",
     "Fases: aguda até 14 dias; subaguda de 15 dias a 3 meses; crônica após 3 meses.",
     "Grupos de risco: gestante, > 65 anos, < 2 anos (neonato: internar) e comorbidades — reavaliação diária até o fim da febre.",
     "Pensar sempre em dengue concomitante: plaquetopenia, sinais de alarme e sangramento mudam a conduta."
    ]
   },
   {
    "t": "Exame físico: o que procurar",
    "itens": [
     "Articulações com dor, edema ou tenossinovite e limitação funcional; registrar a EVA (0 a 10) em toda consulta.",
     "Sinais vitais, perfusão, hidratação; exantema e lesões bolhosas (sobretudo em lactentes).",
     "Neurológico (sonolência, convulsão, fraqueza), cardíaco (dor torácica, arritmia) e diurese."
    ]
   },
   {
    "t": "Exames complementares",
    "itens": [
     "Hemograma obrigatório nos grupos de risco e para afastar dengue; função renal, transaminases e eletrólitos se gravidade ou internação.",
     "Antes de AINE ou corticoide na fase subaguda: ureia, creatinina, transaminases e glicemia.",
     "RT-PCR nos primeiros dias e sorologia IgM após o 5º dia servem à vigilância, não à decisão da analgesia."
    ]
   },
   {
    "t": "Conduta",
    "itens": [
     "EVA 1–3: dipirona 1 g ou paracetamol 500–750 mg em horários fixos de 6/6 h — nunca só 'se dor'.",
     "EVA 4–6: dipirona e paracetamol juntos, intercalados (uma dose a cada 3 h).",
     "EVA ≥ 7: associar opioide (codeína 30 mg 6/6 h ou tramadol 50–100 mg 6/6 h); dor refratária: analgesia EV no PS.",
     "Fase aguda: sem AINE, AAS ou corticoide (sangramento, lesão renal, possível dengue); compressas frias 20 min de 4/4 h e repouso articular.",
     "Subaguda com dor moderada/intensa: AINE ou prednisona 0,5 mg/kg/dia pela manhã até a dor sumir, mais 3–5 dias, depois retirada lenta.",
     "Evitar corticoide em diabetes, HAS de difícil controle, osteoporose com fratura, transtorno bipolar, diálise, obesidade grau III, arritmia e coronariopatia.",
     "Crônica (> 3 meses): hidroxicloroquina 6 mg/kg/dia (máximo 600 mg) ou metotrexato, com reumatologia ou serviço de referência.",
     "Componente neuropático: amitriptilina (evitar em idoso e arritmia) ou gabapentina.",
     "Criança: dipirona e paracetamol pelo peso em horários fixos; codeína e tramadol contraindicados abaixo de 12 anos."
    ]
   },
   {
    "t": "Sinais de alarme e quando internar/encaminhar",
    "itens": [
     "Acometimento neurológico, dispneia, dor torácica, palpitações ou arritmia, vômitos persistentes.",
     "Sinais de choque, sangramento de mucosa, queda da diurese ou alta de ureia/creatinina, descompensação de doença de base.",
     "Neonato, sobretudo filho de mãe com chikungunya no periparto: internar.",
     "Dor refratária à analgesia oral escalonada: observação e analgesia EV."
    ],
    "alerta": true
   },
   {
    "t": "Orientações ao paciente",
    "itens": [
     "Tome os remédios nos horários marcados, mesmo sem dor, pelo tempo da receita.",
     "Faça compressas frias (não quentes) nas juntas por 20 minutos, até de 4 em 4 horas, e tire anéis e alianças.",
     "Não use anti-inflamatórios, AAS nem corticoide por conta própria.",
     "Beba pelo menos 2 litros de líquidos por dia e use repelente enquanto tiver febre.",
     "Volte se a febre passar de 5 dias, se a dor nas juntas não melhorar ou se tiver falta de ar, dor no peito, sonolência ou pouca urina."
    ]
   }
  ],
  "pendencias": [
   "O DATA não tem blocos para a fase subaguda (AINE, prednisona 0,5 mg/kg/dia) nem para a crônica (hidroxicloroquina) — criar ou deixar só no resumo?",
   "O guia do MS (Chikungunya: manejo clínico) é de 2017 e há PCDT de chikungunya em elaboração na Conitec — revisar quando for publicado.",
   "O guia do MS 2017 escreve dipirona '30 a 50 mg/kg/dose' (provável erro de texto); o DATA usa 15 mg/kg/dose na criança e 1 g no adulto — manter.",
   "O MS 2017 associa bromoprida EV ao tramadol EV; o DATA usa metoclopramida — equivalente na prática; confirmar.",
   "O material do Drive não traz conduta própria para chikungunya (só repelentes na gestação — ver zika)."
  ],
  "fontes": [
   "Brasil. Ministério da Saúde. Chikungunya: manejo clínico. Brasília: MS; 2017.",
   "Organização Pan-Americana da Saúde (OPAS). Guidelines for the clinical diagnosis and treatment of dengue, chikungunya, and Zika. Washington, DC: OPAS; 2022.",
   "Marques CDL et al. Recomendações da Sociedade Brasileira de Reumatologia para diagnóstico e tratamento da febre chikungunya. Parte 2 – Tratamento. Rev Bras Reumatol. 2017;57(Supl 2):438-451."
  ]
 },
 {
  "id": "zika",
  "tipo": "condicao",
  "cond": "zika",
  "nm": "Zika vírus",
  "sub": "exantema pruriginoso · gestante · Guillain-Barré · transmissão sexual · arbovirose",
  "kw": "zika zica zika virus arbovirose aedes exantema manchas vermelhas coceira prurido olho vermelho conjuntivite febre baixa artralgia gestante gravidez microcefalia sindrome congenita guillain barre sgb fraqueza ascendente paralisia transmissao sexual preservativo camisinha repelente dipirona paracetamol loratadina hidroxizina desloratadina imunoglobulina notificacao",
  "draft": true,
  "revisado": null,
  "resumo": "Arbovirose geralmente leve: exantema pruriginoso precoce, febre baixa ou ausente, conjuntivite sem secreção e artralgia leve. No PS/UBS o que importa é afastar dengue, identificar gestante (risco de síndrome congênita) e reconhecer Guillain-Barré e outras complicações neurológicas.",
  "secoes": [
   {
    "t": "Quando pensar / diagnóstico",
    "itens": [
     "Exantema maculopapular pruriginoso desde o 1º–2º dia, febre baixa ou ausente, hiperemia conjuntival sem secreção, artralgia leve e edema periarticular; dura 3–7 dias.",
     "Muitos casos são assintomáticos e o quadro se confunde com dengue e chikungunya — havendo sinal de alarme, conduzir como dengue.",
     "Complicações: Guillain-Barré (dias a semanas depois), encefalite e mielite; na gestação, síndrome congênita (microcefalia, calcificações, alterações oculares e auditivas)."
    ]
   },
   {
    "t": "Exame físico: o que procurar",
    "itens": [
     "Pele (exantema, petéquias), conjuntivas e articulações; sinais vitais e sinais de alarme de dengue.",
     "Neurológico: força e reflexos nos quatro membros, parestesia ascendente, paralisia facial, disfagia.",
     "Gestante: idade gestacional e data de início dos sintomas."
    ]
   },
   {
    "t": "Exames complementares",
    "itens": [
     "Hemograma se dúvida com dengue, grupo de risco ou sinal de alarme.",
     "Gestante: RT-PCR (sangue e urina) na fase aguda e sorologia conforme a vigilância local; USG obstétrica seriada no pré-natal.",
     "Suspeita de Guillain-Barré: líquor, eletroneuromiografia e CVF; colher sorologias antes da imunoglobulina."
    ]
   },
   {
    "t": "Conduta",
    "itens": [
     "Sintomático: repouso, líquidos, dipirona ou paracetamol; anti-histamínico para o prurido (loratadina; hidroxizina se precisar de sedação).",
     "Não usar AAS nem AINE até afastar dengue.",
     "Gestante: notificar de imediato (até 24 h) e encaminhar ao pré-natal de alto risco para seguimento ultrassonográfico.",
     "Guillain-Barré: internar; imunoglobulina EV 0,4 g/kg/dia por 5 dias se não anda sem apoio e até 2 semanas do início (plasmaférese até 4 semanas), com neurologia.",
     "Criança com prurido: desloratadina a partir de 6 meses; loratadina a partir de 2 anos.",
     "Recém-nascido com microcefalia ou sinais de síndrome congênita: notificar, investigar e encaminhar à estimulação precoce."
    ]
   },
   {
    "t": "Sinais de alarme e quando internar/encaminhar",
    "itens": [
     "Fraqueza ou formigamento que sobe pelas pernas, dificuldade para andar, engolir ou respirar: internar (UTI pela regra 20/30/40).",
     "Sonolência, confusão, convulsão ou cefaleia intensa (encefalite).",
     "Sinais de alarme de dengue: seguir o protocolo de dengue.",
     "Gestante com quadro compatível: sempre notificar e encaminhar, mesmo se leve."
    ],
    "alerta": true
   },
   {
    "t": "Orientações ao paciente",
    "itens": [
     "Use repelente, roupas compridas e mosquiteiro enquanto estiver doente, para não passar o vírus ao mosquito.",
     "O vírus passa pelo sexo: homens, preservativo ou abstinência por 3 meses; mulheres, por 2 meses após os sintomas.",
     "Parceiro de gestante: preservativo em todas as relações durante toda a gravidez.",
     "Não tome AAS nem anti-inflamatórios sem orientação médica.",
     "Volte se fraqueza ou formigamento nas pernas, falta de ar, sonolência, sangramento ou dor forte na barriga."
    ]
   },
   {
    "t": "Outras opções (material do médico)",
    "itens": [
     "Repelente à base de icaridina, DEET ou IR3535, liberados na gestação (Plantão Rápido) — reaplicar conforme o rótulo, que muda com a concentração."
    ],
    "offlabel": true
   }
  ],
  "pendencias": [
   "O material do Drive traz intervalos fixos de repelente (icaridina 10 h, DEET 6 h, IR3535 2 h); dependem da concentração do produto — conferir o rótulo antes de padronizar.",
   "Dose pediátrica de dipirona/paracetamol a 15 mg/kg no DATA × 10 mg/kg no manual de dengue — padronizar entre arboviroses?",
   "Confirmar o fluxo local de coleta na gestante (RT-PCR em sangue/urina e janela da sorologia) — varia por estado/Lacen.",
   "Bloco de Guillain-Barré: enoxaparina profilática e IGIV dependem de protocolo do serviço e da neurologia — confirmar.",
   "O material do Drive não traz conduta própria para zika além dos repelentes."
  ],
  "fontes": [
   "Brasil. Ministério da Saúde. Guia de Vigilância em Saúde. 6ª ed. rev. Brasília: MS; 2024.",
   "Organização Pan-Americana da Saúde (OPAS). Guidelines for the clinical diagnosis and treatment of dengue, chikungunya, and Zika. Washington, DC: OPAS; 2022.",
   "World Health Organization. WHO guidelines for the prevention of sexual transmission of Zika virus: executive summary. Geneva: WHO; 2019 (WHO/RHR/19.4).",
   "Brasil. Ministério da Saúde. Orientações integradas de vigilância e atenção à saúde no âmbito da Emergência de Saúde Pública de Importância Nacional. Brasília: MS; 2017."
  ]
 },
 {
  "id": "vaginites",
  "tipo": "condicao",
  "cond": "vaginites",
  "nm": "Vaginites / Vaginoses / ISTs",
  "sub": "corrimento vaginal · vaginose · candidíase · tricomoníase · DIP · úlcera genital",
  "kw": "vaginite vaginose bacteriana gardnerella candidiase candida monilia moniliase tricomoniase trichomonas corrimento vaginal coceira vaginal ardor cheiro ruim odor de peixe ist dst cervicite gonorreia clamidia doenca inflamatoria pelvica dip mipa dor pelvica ulcera genital ferida genital sifilis cancro mole cancroide herpes genital linfogranuloma donovanose metronidazol clindamicina miconazol nistatina fluconazol itraconazol ceftriaxona azitromicina doxiciclina ciprofloxacino aciclovir penicilina benzatina criterios de amsel ph vaginal",
  "draft": true,
  "revisado": null,
  "resumo": "Corrimento vaginal: separar vaginose bacteriana, candidíase e tricomoníase pela clínica (e pelo pH, se possível) e pensar em cervicite e DIP quando há mucopus ou dor pélvica. Toda IST pede testes rápidos (HIV, sífilis, hepatites) e tratamento da parceria quando indicado.",
  "secoes": [
   {
    "t": "Quando pensar / diagnóstico",
    "itens": [
     "Vaginose bacteriana: corrimento fino, acinzentado, com odor de peixe que piora após a relação ou a menstruação; pouco prurido.",
     "Critérios de Amsel (3 de 4): corrimento homogêneo, pH > 4,5, teste das aminas positivo, clue cells na microscopia.",
     "Candidíase: prurido, ardor, corrimento branco grumoso, edema e fissuras vulvares; pH ≤ 4,5. Recorrente: 4 ou mais episódios por ano.",
     "Tricomoníase (IST): corrimento amarelo-esverdeado, bolhoso, com odor, colo 'em framboesa', disúria; pH > 5.",
     "Cervicite (gonococo/clamídia): mucopus endocervical, colo friável, sangramento pós-coito — muitas vezes sem sintomas.",
     "DIP: dor pélvica com dor à mobilização do colo ou anexial; febre, corrimento e PCR alta reforçam.",
     "Úlcera genital: sífilis (indolor, única, base limpa), herpes (vesículas dolorosas agrupadas), cancroide (dolorosa, múltipla, purulenta)."
    ]
   },
   {
    "t": "Exame físico: o que procurar",
    "itens": [
     "Especular: aspecto do corrimento, colo (mucopus, friabilidade), lesões; pH vaginal com fita, se houver.",
     "Toque bimanual se dor pélvica: mobilização do colo, anexos, massas.",
     "Vulva e região inguinal: úlceras, adenomegalia, fístulas."
    ]
   },
   {
    "t": "Exames complementares",
    "itens": [
     "Testes rápidos de HIV, sífilis e hepatites B e C em toda suspeita de IST; beta-hCG se atraso menstrual ou dor pélvica.",
     "Microscopia quando disponível; pesquisa de gonococo e clamídia (biologia molecular) na cervicite.",
     "DIP: hemograma, PCR, EAS e USG transvaginal se dúvida diagnóstica ou suspeita de abscesso."
    ]
   },
   {
    "t": "Conduta",
    "itens": [
     "Vaginose: metronidazol 500 mg 12/12 h por 7 dias ou gel vaginal por 5 noites; alternativa clindamicina 300 mg 12/12 h por 7 dias. Parceria não trata.",
     "Candidíase: miconazol creme 7 noites, nistatina 14 noites, fluconazol 150 mg dose única ou itraconazol 200 mg 12/12 h por 1 dia; gestante só via vaginal.",
     "Tricomoníase: metronidazol 2 g dose única ou 500 mg 12/12 h por 7 dias; tratar a parceria com o mesmo esquema.",
     "Cervicite: ceftriaxona 500 mg IM + azitromicina 1 g VO, doses únicas; tratar as parcerias.",
     "DIP leve/moderada: ceftriaxona 500 mg IM + doxiciclina 100 mg 12/12 h + metronidazol 500 mg 12/12 h por 14 dias; reavaliar em 72 h.",
     "Sífilis recente: penicilina benzatina 2,4 milhões UI dose única; tardia ou de duração ignorada: 2,4 milhões UI por semana, 3 semanas.",
     "Herpes genital: aciclovir 400 mg 8/8 h por 7–10 dias (1º episódio) ou 5 dias (recorrência). Cancroide: azitromicina 1 g dose única.",
     "Sem álcool até 24 h após o metronidazol; sem relações até o fim do tratamento, inclusive da parceria."
    ]
   },
   {
    "t": "Sinais de alarme e quando internar/encaminhar",
    "itens": [
     "DIP com febre alta, vômitos, peritonite, suspeita de abscesso tubo-ovariano, gestação ou falha em 72 h: internar para tratamento EV.",
     "Dor pélvica com beta-hCG positivo: gravidez ectópica até prova em contrário.",
     "Gestante com sífilis: tratar no mesmo dia e notificar; se alérgica à penicilina, dessensibilização (única opção eficaz).",
     "Candidíase recorrente ou grave: investigar diabetes, HIV e uso de imunossupressor."
    ],
    "alerta": true
   },
   {
    "t": "Orientações ao paciente",
    "itens": [
     "Use o remédio até o fim, mesmo melhorando; nas IST e na tricomoníase a parceria também trata, e o casal evita relações até terminar.",
     "Não beba álcool durante o metronidazol e até 1 dia depois.",
     "Evite duchas vaginais e produtos perfumados na vulva.",
     "Use preservativo e faça os testes de HIV, sífilis e hepatites que foram pedidos."
    ]
   },
   {
    "t": "Outras opções (material do médico)",
    "itens": [
     "Clindamicina 300 mg 12/12 h por 7 dias — alternativa na vaginose (guia HC-FMUSP 2024, PCDT).",
     "Itraconazol 200 mg 12/12 h por 1 dia — alternativa ao fluconazol na candidíase; não usar na gestação.",
     "Aciclovir 400 mg (2 comprimidos de 200 mg) 8/8 h — dose do PCDT; supressão 400 mg 12/12 h se 6 ou mais recorrências/ano.",
     "Doxiciclina 100 mg 12/12 h por 15 dias — sífilis recente em não gestante alérgica à penicilina.",
     "Ciprofloxacino 500 mg 12/12 h por 3 dias — alternativa no cancroide (CDC 2021); evitar na gestação.",
     "DIP com azitromicina 1 g por semana, 2 semanas, no lugar da doxiciclina (guia HC-FMUSP) — evidência mais limitada."
    ],
    "offlabel": true
   }
  ],
  "pendencias": [
   "Itens sem via no DATA saem como USO ORAL na receita: nistatina creme vaginal (Padrão) e metronidazol geleia vaginal (Outras opções) — acrescentar USO TÓPICO.",
   "Metronidazol geleia por 14 noites (e 7 noites junto com o oral) em Outras opções; PCDT e guia HC-FMUSP usam 5 noites isolado — decidir.",
   "'Opção 3' (azitromicina + ciprofloxacino dose única) e 'Opção 4' (ceftriaxona isolada): ciprofloxacino não serve mais para gonococo e ceftriaxona sozinha não cobre clamídia — trocar pelo esquema de cervicite (proposta enviada).",
   "'Moléstia inflamatória pélvica aguda' (Outras opções) não tem ceftriaxona: esquema sem cobertura de gonococo — remover ou completar.",
   "Aciclovir 200 mg 5x/dia por 10 dias e 200 mg 12/12 h (supressão, sem quantidade): o PCDT usa 400 mg 8/8 h e supressão de 400 mg 12/12 h.",
   "Doxiciclina por 28 dias ('Opção 7'): PCDT e HC-FMUSP usam 15 dias (sífilis recente) ou 30 dias (tardia).",
   "Tricomoníase: o PCDT põe a dose única de 2 g como 1ª opção ao lado dos 7 dias; o CDC 2021 prefere 7 dias na mulher; o Padrão usa 7 dias — confirmar.",
   "Blocos 'Opção 1' a 'Opção 7' não dizem a indicação — renomear pela doença ('Opção 5', azitromicina semanal, serve para donovanose/LGV).",
   "Orientações 'opte por sabonetes íntimos' e 'dormir sem calcinha para a vagina respirar' não têm base em diretriz — revisar.",
   "Fluconazol no Padrão sem aviso: na gestante, candidíase só com tratamento vaginal."
  ],
  "fontes": [
   "Brasil. Ministério da Saúde. Protocolo Clínico e Diretrizes Terapêuticas para Atenção Integral às Pessoas com Infecções Sexualmente Transmissíveis (IST). Brasília: MS; 2022.",
   "Carvalho NS et al. Protocolo Brasileiro para Infecções Sexualmente Transmissíveis 2020: infecções que causam corrimento vaginal. Epidemiol Serv Saude. 2021;30(Esp1):e2020593.",
   "Ramos MC et al. Brazilian Protocol for Sexually Transmitted Infections 2020: infections that cause genital ulcers. Rev Soc Bras Med Trop. 2021;54(Suppl 1):e2020663.",
   "Workowski KA et al. Sexually Transmitted Infections Treatment Guidelines, 2021. MMWR Recomm Rep. 2021;70(4):1-187.",
   "Levin ASS, Costa SF (coord.). Antimicrobianos na prática clínica: um guia para profissionais da atenção primária. 1ª ed. São Paulo: HC-FMUSP; 2024."
  ]
 },
 {
  "id": "abuso_sexual",
  "tipo": "condicao",
  "cond": "abuso_sexual",
  "nm": "Violência sexual — profilaxias",
  "sub": "PEP-HIV · IST · hepatite B · contracepção de emergência · notificação",
  "kw": "abuso sexual violencia sexual estupro estupro de vulneravel agressao sexual pep profilaxia pos exposicao hiv tenofovir lamivudina dolutegravir zidovudina ist sifilis gonorreia clamidia tricomoniase penicilina benzatina ceftriaxona azitromicina metronidazol hepatite b vacina imunoglobulina ighahb hpv contracepcao de emergencia pilula do dia seguinte levonorgestrel notificacao sinan conselho tutelar lei do minuto seguinte aborto legal crianca adolescente",
  "draft": true,
  "revisado": null,
  "resumo": "Atendimento de urgência e sem exigir boletim de ocorrência: acolher, oferecer PEP-HIV em até 72 h, profilaxia de sífilis, gonorreia, clamídia e tricomoníase, hepatite B, HPV e contracepção de emergência, notificar e acionar a rede de proteção.",
  "secoes": [
   {
    "t": "Quando pensar / diagnóstico",
    "itens": [
     "Qualquer violência sexual relatada ou suspeita, mesmo sem penetração confirmada; menor de 14 anos é estupro de vulnerável.",
     "O tempo decide: PEP-HIV até 72 h; contracepção de emergência até 5 dias; IST e hepatite B o mais cedo possível.",
     "Registrar tipo de exposição (vaginal, anal, oral), preservativo, número de agressores, agressor conhecido e situação vacinal.",
     "Em criança, suspeitar diante de IST, sangramento genital, mudança de comportamento ou relato incoerente; adolescente tem direito a sigilo."
    ]
   },
   {
    "t": "Exame físico: o que procurar",
    "itens": [
     "Exame completo com consentimento, procurando lesões genitais, anais e extragenitais; descrever em detalhe no prontuário.",
     "Coletar vestígios quando possível, sem atrasar as profilaxias; encaminhar ao serviço de referência após o atendimento inicial.",
     "Gravidez prévia: atraso menstrual, sinais clínicos; sangramento ativo ou dor abdominal."
    ]
   },
   {
    "t": "Exames complementares",
    "itens": [
     "Testes rápidos de HIV, sífilis e hepatites B e C antes da PEP (não atrasam o início); beta-hCG em idade fértil.",
     "Creatinina e transaminases se doença renal ou hepática; hemograma se o esquema tiver zidovudina.",
     "Seguimento: HIV na 4ª e na 12ª semana; sífilis, gonococo e clamídia em 4–6 semanas; hepatites conforme o caso."
    ]
   },
   {
    "t": "Conduta",
    "itens": [
     "PEP-HIV: tenofovir/lamivudina 300/300 mg + dolutegravir 50 mg 1 vez ao dia por 28 dias, o quanto antes (até 72 h); entregar os 28 dias de uma vez.",
     "Sem tenofovir (doença renal): zidovudina/lamivudina; sem dolutegravir: darunavir + ritonavir.",
     "IST: penicilina benzatina 2,4 milhões UI IM + ceftriaxona 500 mg IM + azitromicina 1 g VO, doses únicas.",
     "Tricomoníase: metronidazol 2 g dose única, adiado para depois da PEP e da contracepção de emergência; não usar no 1º trimestre.",
     "Hepatite B: vacinar se não vacinado ou esquema incompleto e IGHAHB 0,06 mL/kg (CRIE) até 14 dias; dispensável com esquema completo documentado.",
     "HPV: vacinar vítimas de 9 a 45 anos ainda não vacinadas.",
     "Contracepção de emergência: levonorgestrel 1,5 mg dose única até 5 dias — quanto antes, melhor.",
     "Criança/adolescente < 45 kg: benzatina 50.000 UI/kg, ceftriaxona 125 mg IM, azitromicina 20 mg/kg; PEP por idade e peso (ver Prescrições).",
     "Notificar no Sinan (violência sexual: notificação imediata), comunicar o Conselho Tutelar se < 18 anos e acionar assistência social e rede."
    ]
   },
   {
    "t": "Sinais de alarme e quando internar/encaminhar",
    "itens": [
     "Lesão grave, sangramento ativo, suspeita de lesão anorretal ou intoxicação associada: tratar primeiro (cirurgia/clínica).",
     "Risco de nova violência (agressor no domicílio) ou ideação suicida: rede de proteção e saúde mental no mesmo atendimento.",
     "Gravidez decorrente de estupro: informar o direito à interrupção legal e encaminhar ao serviço de referência — não exige boletim de ocorrência.",
     "Vômitos que impedem os remédios, icterícia, exantema ou febre durante a PEP: reavaliar."
    ],
    "alerta": true
   },
   {
    "t": "Orientações ao paciente",
    "itens": [
     "Tome a PEP todos os dias, no mesmo horário, pelos 28 dias, sem parar.",
     "Tome o metronidazol só depois de terminar a PEP e a pílula de emergência.",
     "Use preservativo em todas as relações até o fim do acompanhamento e volte para os exames marcados.",
     "Você não precisa de boletim de ocorrência para receber atendimento e remédios."
    ]
   },
   {
    "t": "Outras opções (material do médico)",
    "itens": [
     "Método de Yuzpe (anticoncepcional combinado em 2 doses) — só se faltar levonorgestrel; menos eficaz e mais náusea (proposta em Anticoncepção de emergência)."
    ],
    "offlabel": true
   }
  ],
  "pendencias": [
   "No Padrão adulto, penicilina benzatina e ceftriaxona estão sem via no DATA — saem como USO ORAL na receita; acrescentar USO INTRAMUSCULAR.",
   "Material do Drive (Principais condutas, Tigers) usa PEP com zidovudina + lamivudina + lopinavir/ritonavir e ceftriaxona 250 mg — desatualizado (PCDT 2024: TDF/3TC + DTG; ceftriaxona 500 mg); não importado.",
   "O Padrão adulto não tem as linhas 'vacina HPV de 9 a 45 anos' e 'metronidazol não no 1º trimestre' — acrescentar às orientações?",
   "A NT MS 222/2025 desaconselha dispensar a PEP de forma fracionada — confirmar se o serviço entrega os 28 dias de uma vez.",
   "PCDT 2024: dolutegravir 5 mg 'acima de 4 semanas' na tabela e 'a partir do 2º mês' na nota; o DATA usa ≥ 4 semanas — confirmar com infectologia pediátrica.",
   "Confirmar o fluxo local de coleta de vestígios e o serviço de referência para interrupção legal."
  ],
  "fontes": [
   "Brasil. Ministério da Saúde. Protocolo Clínico e Diretrizes Terapêuticas para Profilaxia Pós-Exposição (PEP) de Risco à Infecção pelo HIV, IST e Hepatites Virais (Portaria SECTICS/MS nº 14, de 8 de abril de 2024).",
   "Brasil. Ministério da Saúde. Protocolo Clínico e Diretrizes Terapêuticas para Atenção Integral às Pessoas com Infecções Sexualmente Transmissíveis (IST). Brasília: MS; 2022.",
   "Brasil. Lei nº 12.845, de 1º de agosto de 2013. Dispõe sobre o atendimento obrigatório e integral de pessoas em situação de violência sexual.",
   "Brasil. Ministério da Saúde. Nota Técnica nº 222/2025-CGHA/DATHI/SVSA/MS: reforço das recomendações de PEP para sobreviventes de violência sexual. 2025."
  ]
 },
 {
  "id": "anticoncepcao",
  "tipo": "condicao",
  "cond": "anticoncepcao",
  "nm": "Anticoncepção de emergência",
  "sub": "pílula do dia seguinte · levonorgestrel · até 5 dias · DIU de cobre",
  "kw": "anticoncepcao de emergencia contracepcao de emergencia pilula do dia seguinte levonorgestrel ulipristal yuzpe diu de cobre camisinha estourou preservativo rompeu esqueceu a pilula relacao desprotegida falha do metodo atraso da injecao adolescente gravidez indesejada",
  "draft": true,
  "revisado": null,
  "resumo": "Levonorgestrel 1,5 mg em dose única, o mais cedo possível, até 5 dias após relação desprotegida ou falha do método; não é abortivo e não exige teste de gravidez. Aproveitar para iniciar um método regular, oferecer testes de IST e, se houve violência, seguir o fluxo de violência sexual.",
  "secoes": [
   {
    "t": "Quando pensar / diagnóstico",
    "itens": [
     "Relação sem método, preservativo que rompeu ou saiu, 2 ou mais pílulas combinadas esquecidas na 1ª semana, atraso da injeção, expulsão de DIU, violência sexual.",
     "Eficácia maior quanto mais cedo: ideal nas primeiras 72 h, ainda indicada até 120 h.",
     "Não interrompe gravidez já implantada nem prejudica o embrião; não há contraindicação médica absoluta ao levonorgestrel.",
     "Menor de 14 anos ou relato de coerção: conduzir como violência sexual (PEP, IST, notificação)."
    ]
   },
   {
    "t": "Exame físico: o que procurar",
    "itens": [
     "Não é preciso exame ginecológico para prescrever.",
     "Perguntar data da última menstruação, hora da relação, outras relações desprotegidas no ciclo, remédios em uso e peso."
    ]
   },
   {
    "t": "Exames complementares",
    "itens": [
     "Beta-hCG só se atraso menstrual ou suspeita de gravidez anterior ao episódio — não atrasar a dose.",
     "Oferecer testes rápidos de HIV, sífilis e hepatites B e C; avaliar PEP-HIV se exposição de risco nas últimas 72 h."
    ]
   },
   {
    "t": "Conduta",
    "itens": [
     "Levonorgestrel 1,5 mg (ou 2 comprimidos de 0,75 mg juntos) em dose única; repetir se vomitar em até 3 h.",
     "DIU de cobre é o método mais eficaz (até 5 dias) e já fica como contracepção — encaminhar se houver no serviço.",
     "Ulipristal 30 mg (fora do SUS) é mais eficaz entre 72 e 120 h; depois dele, esperar 5 dias para iniciar método hormonal.",
     "Indutores enzimáticos (carbamazepina, fenitoína, rifampicina, efavirenz) e peso alto podem reduzir a eficácia do levonorgestrel — preferir DIU.",
     "Iniciar ou retomar o método regular no mesmo dia e usar preservativo por 7 dias.",
     "Pode ser repetido no mesmo ciclo se houver nova exposição, mas não substitui método regular.",
     "Adolescente pode receber orientação e o medicamento sem a presença dos pais, com sigilo."
    ]
   },
   {
    "t": "Sinais de alarme e quando internar/encaminhar",
    "itens": [
     "Atraso menstrual de mais de 7 dias ou menstruação diferente do habitual: teste de gravidez.",
     "Dor abdominal intensa ou sangramento volumoso depois do uso: avaliar gravidez ectópica.",
     "Exposição por violência sexual: seguir o fluxo completo de violência sexual."
    ],
    "alerta": true
   },
   {
    "t": "Orientações ao paciente",
    "itens": [
     "Tome o comprimido o quanto antes; se vomitar em até 3 horas, procure a unidade para repetir.",
     "A próxima menstruação pode adiantar ou atrasar alguns dias, e pequenos sangramentos são comuns.",
     "A pílula de emergência não protege das próximas relações nem de IST: use preservativo.",
     "Procure a UBS para escolher um método contínuo (pílula, injeção, DIU ou implante)."
    ]
   },
   {
    "t": "Outras opções (material do médico)",
    "itens": [
     "Método de Yuzpe: levonorgestrel 0,15 mg + etinilestradiol 0,03 mg, 4 comprimidos e mais 4 após 12 h — só se faltar levonorgestrel; menos eficaz e mais náusea."
    ],
    "offlabel": true
   }
  ],
  "pendencias": [
   "Peso > 70 kg ou IMC > 26: a FSRH sugere levonorgestrel 3 mg (off-label) ou preferir ulipristal/DIU; MS e OMS não ajustam a dose — decidir se entra no texto.",
   "Indutores enzimáticos: a FSRH recomenda dobrar o levonorgestrel (3 mg) ou usar DIU de cobre — decidir.",
   "Ulipristal 30 mg tem registro no Brasil (fora do SUS) e não está no DATA — incluir como opção?",
   "O material do Drive cita levonorgestrel 0,75 mg de 12/12 h: é a 2ª opção do PCDT; a dose única (já no Padrão) é preferida.",
   "'Opção 1' (Outras opções) associa dimenidrinato e escopolamina de rotina: antiemético profilático não é necessário com levonorgestrel e o antiespasmódico pode mascarar dor de ectópica — revisar."
  ],
  "fontes": [
   "Brasil. Ministério da Saúde. Protocolo Clínico e Diretrizes Terapêuticas para Profilaxia Pós-Exposição (PEP) de Risco à Infecção pelo HIV, IST e Hepatites Virais (Portaria SECTICS/MS nº 14, de 8 de abril de 2024).",
   "Faculty of Sexual and Reproductive Healthcare (FSRH). FSRH Clinical Guideline: Emergency Contraception. March 2017 (amended July 2023).",
   "World Health Organization; Johns Hopkins CCP. Family Planning: A Global Handbook for Providers. 2022 update."
  ]
 },
 {
  "id": "dismenorreia",
  "tipo": "condicao",
  "cond": "dismenorreia",
  "nm": "Dismenorreia",
  "sub": "cólica menstrual · AINE · primária × secundária · endometriose",
  "kw": "dismenorreia colica menstrual dor menstrual menstruacao dolorosa dor no pe da barriga tpm endometriose adenomiose mioma ibuprofeno naproxeno diclofenaco piroxicam meloxicam nimesulida paracetamol escopolamina butilbrometo anticoncepcional diu hormonal adolescente",
  "draft": true,
  "revisado": null,
  "resumo": "Cólica no baixo ventre que acompanha a menstruação. Na primária, a 1ª escolha é AINE em horário fixo desde o início do fluxo; no plantão, o papel é afastar gravidez, DIP e abdome agudo e reconhecer sinais de causa secundária (endometriose, adenomiose, mioma).",
  "secoes": [
   {
    "t": "Quando pensar / diagnóstico",
    "itens": [
     "Primária: começa 6–24 meses após a menarca; cólica no hipogástrio desde horas antes até 2–3 dias do fluxo, podendo irradiar para lombar e coxas.",
     "Pode vir com náusea, diarreia, cefaleia e mal-estar; exame pélvico normal.",
     "Pensar em secundária: início após os 25 anos, piora progressiva, dor fora da menstruação, dispareunia, sangramento anormal, infertilidade ou falha de AINE + hormônio.",
     "Diferenciais no PS: gravidez ectópica, abortamento, DIP, torção ou cisto ovariano roto, apendicite, ITU."
    ]
   },
   {
    "t": "Exame físico: o que procurar",
    "itens": [
     "Sinais vitais; abdome (defesa, descompressão dolorosa, massa).",
     "Exame pélvico se sexualmente ativa e com sinal de alarme: dor à mobilização do colo, massa anexial, nódulos em fundo de saco."
    ]
   },
   {
    "t": "Exames complementares",
    "itens": [
     "Dismenorreia primária típica: não precisa de exame.",
     "Beta-hCG se atraso ou qualquer possibilidade de gravidez; EAS se sintomas urinários.",
     "USG pélvica ou transvaginal se suspeita de causa secundária ou exame alterado."
    ]
   },
   {
    "t": "Conduta",
    "itens": [
     "AINE é a 1ª escolha: iniciar 1–2 dias antes ou no 1º dia do fluxo e manter em horário fixo por 2–3 dias.",
     "Opções: ibuprofeno 400–600 mg 8/8 h, naproxeno 500 mg 12/12 h ou diclofenaco 50 mg 8/8 h; se um falhar após 2–3 ciclos, trocar de AINE.",
     "Contraindicação a AINE (úlcera, doença renal, asma induzida por AINE): paracetamol; antiespasmódico tem efeito pequeno.",
     "Sem melhora em 3 ciclos ou desejo de contracepção: anticoncepcional hormonal (combinado contínuo, progestágeno ou DIU hormonal) pela UBS.",
     "Dor intensa no PS: AINE parenteral com analgésico; se não melhorar, reavaliar o diagnóstico.",
     "Calor local e atividade física regular ajudam."
    ]
   },
   {
    "t": "Sinais de alarme e quando internar/encaminhar",
    "itens": [
     "Dor súbita e intensa fora do padrão habitual, febre, sinais de peritonite ou instabilidade.",
     "Beta-hCG positivo com dor: afastar gravidez ectópica (USG).",
     "Massa anexial dolorosa (torção) ou corrimento com dor à mobilização do colo (DIP).",
     "Dor que não cede com AINE + hormônio: investigar endometriose com ginecologia."
    ],
    "alerta": true
   },
   {
    "t": "Orientações ao paciente",
    "itens": [
     "Comece o anti-inflamatório no primeiro sinal da menstruação (ou 1 dia antes) e tome nos horários, não só quando a dor apertar.",
     "Tome depois das refeições; pare e procure atendimento se dor no estômago, fezes pretas ou vômito com sangue.",
     "Bolsa de água morna no pé da barriga e exercício regular aliviam a cólica.",
     "Se não melhorar após 3 meses de tratamento, procure a UBS para investigar e considerar anticoncepcional."
    ]
   }
  ],
  "pendencias": [
   "O material do Drive não traz conduta própria para dismenorreia.",
   "Butilescopolamina no Padrão: evidência fraca na dismenorreia (efeito pequeno) — manter no Padrão ou levar para Outras opções?",
   "Nimesulida e piroxicam em Outras opções têm mais risco hepático/gastrointestinal que ibuprofeno e naproxeno — manter?",
   "Naproxeno está 'se dor' e diclofenaco por 5 dias seguidos; as diretrizes favorecem horário fixo por 2–3 dias desde o início do fluxo — uniformizar.",
   "Ácido mefenâmico (AINE clássico da dismenorreia, em bula) não está no DATA — incluir?"
  ],
  "fontes": [
   "Burnett M, Lemyre M. No. 345 – Primary Dysmenorrhea Consensus Guideline. J Obstet Gynaecol Can. 2017;39(7):585-595.",
   "American College of Obstetricians and Gynecologists. Committee Opinion No. 760: Dysmenorrhea and Endometriosis in the Adolescent. Obstet Gynecol. 2018;132(6):e249-e258.",
   "Marjoribanks J et al. Nonsteroidal anti-inflammatory drugs for dysmenorrhoea. Cochrane Database Syst Rev. 2015;(7):CD001751."
  ]
 },
 {
  "id": "sua",
  "tipo": "condicao",
  "cond": "sua",
  "nm": "Sangramento uterino anormal",
  "sub": "PALM-COEIN · beta-hCG · ácido tranexâmico · hormonal · anemia",
  "kw": "sangramento uterino anormal sua menorragia metrorragia hipermenorragia sangramento vaginal menstruacao excessiva menstruacao prolongada hemorragia uterina anemia mioma polipo adenomiose anovulacao sop coagulopatia von willebrand pos-menopausa acido tranexamico ibuprofeno naproxeno acido mefenamico anticoncepcional levonorgestrel etinilestradiol medroxiprogesterona sulfato ferroso beta hcg",
  "draft": true,
  "revisado": null,
  "resumo": "Sangramento fora do padrão em volume, duração ou frequência. No PS: primeiro estabilidade hemodinâmica e beta-hCG; depois controlar o sangramento agudo (hormonal ou ácido tranexâmico), tratar a anemia e encaminhar para investigar a causa pelo PALM-COEIN.",
  "secoes": [
   {
    "t": "Quando pensar / diagnóstico",
    "itens": [
     "Em idade fértil, excluir gravidez antes de tudo (abortamento, ectópica, mola).",
     "PALM (estrutural): pólipo, adenomiose, leiomioma, malignidade/hiperplasia. COEIN: coagulopatia, ovulatória, endometrial, iatrogênica, não classificada.",
     "Adolescente: anovulação é o mais comum; sangramento intenso desde a menarca sugere coagulopatia (von Willebrand).",
     "Pós-menopausa: câncer de endométrio até prova em contrário.",
     "Agudo: volume que exige intervenção imediata. Crônico: alteração na maioria dos ciclos por 6 meses ou mais."
    ]
   },
   {
    "t": "Exame físico: o que procurar",
    "itens": [
     "Sinais vitais, palidez, sinais de choque; quantificar (absorventes encharcados por hora, coágulos).",
     "Especular: confirmar origem uterina, ver colo, pólipo, lesões, corpo estranho. Toque: volume uterino, miomas.",
     "Equimoses e gengivorragia (coagulopatia); tireoide, hirsutismo e acantose (SOP)."
    ]
   },
   {
    "t": "Exames complementares",
    "itens": [
     "Beta-hCG e hemograma sempre; tipagem e prova cruzada se instável ou Hb baixa.",
     "Coagulograma (TP, TTPa, fibrinogênio) se sangramento agudo intenso ou suspeita de coagulopatia; TSH e ferritina conforme o caso.",
     "USG transvaginal ambulatorial (urgente se massa, dor ou gravidez); endométrio > 4 mm na pós-menopausa: biópsia."
    ]
   },
   {
    "t": "Conduta",
    "itens": [
     "Instável ou Hb muito baixa: acesso calibroso, cristaloide, transfusão e ginecologia (curetagem/AMIU, balão intrauterino).",
     "Hormonal: anticoncepcional combinado 30–35 mcg de etinilestradiol 8/8 h por 7 dias e depois 1 vez ao dia; ou medroxiprogesterona 20 mg 8/8 h por 7 dias.",
     "Contraindicação a estrogênio (fumante ≥ 35 anos, enxaqueca com aura, trombose, HAS descontrolada, câncer de mama, hepatopatia): usar progestágeno.",
     "Não hormonal: ácido tranexâmico 1 g 8/8 h por até 5 dias e/ou AINE durante o fluxo; evitar tranexâmico se trombose prévia.",
     "Ferro oral se anemia ou ferritina baixa.",
     "Encaminhar à UBS/ginecologia para investigar e manter o tratamento (DIU hormonal é 1ª linha no sangramento menstrual intenso)."
    ]
   },
   {
    "t": "Sinais de alarme e quando internar/encaminhar",
    "itens": [
     "Instabilidade hemodinâmica, síncope, Hb < 7 g/dL ou queda rápida.",
     "Encharcar 1 absorvente por hora por 2 horas seguidas ou coágulos grandes persistentes.",
     "Beta-hCG positivo com sangramento ou dor: conduzir como gestação de 1º trimestre/ectópica.",
     "Sangramento pós-menopausa, lesão suspeita no colo ou falha do tratamento em 24–48 h: ginecologia."
    ],
    "alerta": true
   },
   {
    "t": "Orientações ao paciente",
    "itens": [
     "Volte na hora se encharcar 1 absorvente por hora por 2 horas, tontura, desmaio, falta de ar ou palpitação.",
     "Tome o ferro longe do almoço (1 h antes ou 2 h depois), de preferência com suco de laranja; as fezes podem ficar escuras.",
     "Faça os exames pedidos (ultrassom, hemograma) e leve à consulta na UBS ou na ginecologia.",
     "Não use o ácido tranexâmico junto com anticoncepcional combinado sem orientação médica."
    ]
   },
   {
    "t": "Outras opções (material do médico)",
    "itens": [
     "Ácido mefenâmico 500 mg 8/8 h durante o fluxo, até 5 dias (Principais condutas, Tigers) — AINE alternativo; mesmas contraindicações dos AINE.",
     "Ácido tranexâmico EV no PS (10 mg/kg, máximo 600 mg 8/8 h — ACOG) no sangramento agudo intenso; SUA ainda não tem modo Internação."
    ],
    "offlabel": true
   }
  ],
  "pendencias": [
   "SUA não tem modo Internação no DATA; o Drive traz ácido tranexâmico EV no PS (proposta enviada). Decidir a dose EV: 10 mg/kg, máximo 600 mg (ACOG) × 1 g usado em protocolos locais.",
   "O material do Drive usa vitamina K IM no SUA — sem indicação sem coagulopatia; não importado.",
   "O material do Drive não cita beta-hCG nem estabilidade hemodinâmica — o resumo inclui.",
   "Bloco 'Receita' (Outras opções): anticoncepcional 6/6 h → 8/8 h → 12/12 h e depois 1 vez ao dia por 2 meses (4 caixas) é esquema antigo de alta dose; ACOG usa 8/8 h por 7 dias — manter?",
   "Meloxicam (Drive) não proposto: pouca evidência específica no sangramento uterino.",
   "Orientação 'não associar tranexâmico ao anticoncepcional combinado': a bula alerta para risco trombótico, mas o ACOG não proíbe — confirmar a redação."
  ],
  "fontes": [
   "Munro MG, Critchley HOD, Fraser IS; FIGO Menstrual Disorders Committee. The two FIGO systems for normal and abnormal uterine bleeding symptoms and classification of causes of abnormal uterine bleeding in the reproductive years: 2018 revisions. Int J Gynaecol Obstet. 2018;143(3):393-408.",
   "American College of Obstetricians and Gynecologists. Committee Opinion No. 557: Management of acute abnormal uterine bleeding in nonpregnant reproductive-aged women. Obstet Gynecol. 2013;121(4):891-896.",
   "National Institute for Health and Care Excellence (NICE). Heavy menstrual bleeding: assessment and management (NG88). 2018."
  ]
 },
 {
  "id": "mordedura",
  "tipo": "condicao",
  "cond": "mordedura",
  "nm": "Mordedura de cão ou gato",
  "sub": "raiva · tétano · amoxicilina-clavulanato · ferida · observação do animal",
  "kw": "mordedura mordida de cachorro mordida de cao mordida de gato arranhadura arranhao lambedura acidente com animal raiva profilaxia antirrabica vacina antirrabica soro antirrabico sar imunoglobulina antirrabica ighar morcego animal silvestre macaco tetano antitetanica dupla adulto dt dtp ighat amoxicilina clavulanato doxiciclina clindamicina pasteurella observacao do animal 10 dias notificacao",
  "draft": true,
  "revisado": null,
  "resumo": "Três decisões em toda mordedura: cuidado da ferida (lavar muito, suturar só quando indicado), antibiótico profilático nas feridas de risco e profilaxia de raiva e tétano. A raiva depende do animal (observável por 10 dias ou não) e da gravidade da exposição.",
  "secoes": [
   {
    "t": "Quando pensar / diagnóstico",
    "itens": [
     "Classificar a exposição: contato indireto (sem profilaxia), leve ou grave.",
     "Leve: ferimento superficial, pouco extenso, único, em tronco ou membros (exceto mãos, pés e polpas digitais); lambedura de pele com lesão superficial.",
     "Grave: cabeça, face, pescoço, mãos, polpas digitais ou planta do pé; ferimento profundo, múltiplo ou extenso; lambedura de mucosa; arranhão profundo.",
     "Animal: cão ou gato observável por 10 dias × não observável, suspeito, morto ou desaparecido × morcego e silvestres (sempre grave)."
    ]
   },
   {
    "t": "Exame físico: o que procurar",
    "itens": [
     "Profundidade, tecido desvitalizado, dente ou corpo estranho, tendão, nervo, articulação ou osso.",
     "Na mão: função de tendões e sensibilidade; ferida sobre articulação (soco em boca) é de alto risco.",
     "Sinais de infecção: celulite, secreção, linfangite, febre — Pasteurella pode infectar em 12–24 h."
    ]
   },
   {
    "t": "Exames complementares",
    "itens": [
     "Em geral, nenhum; RX se suspeita de fratura, corpo estranho ou penetração articular.",
     "Ferida infectada: cultura da secreção antes do antibiótico, se possível."
    ]
   },
   {
    "t": "Conduta",
    "itens": [
     "Lavar com água corrente e sabão em abundância e irrigar; desbridar tecido morto; evitar suturar mãos e pés; a face pode ser suturada.",
     "Se indicado soro ou imunoglobulina antirrábica, infiltrar antes de suturar.",
     "Antibiótico profilático (ferida profunda, de gato, em mão, face ou genital, perto de articulação, imunossuprimido): amoxicilina-clavulanato por 3–5 dias.",
     "Ferida superficial de cão em pessoa saudável: sem antibiótico. Ferida já infectada: tratar por 5–7 dias ou mais.",
     "Raiva, cão ou gato observável: não vacinar, observar 10 dias; se adoecer, sumir ou morrer, iniciar o esquema.",
     "Não observável ou suspeito: leve = vacina (dias 0, 3, 7, 14); grave = vacina + soro 40 UI/kg ou IGHAR 20 UI/kg. Morcego/silvestre: sempre vacina + soro.",
     "Soro/IGHAR até 7 dias após a 1ª dose da vacina: infiltrar o máximo na lesão e o restante IM no grupo muscular mais próximo.",
     "Tétano (mordedura = alto risco): menos de 3 doses ou incerto = vacina + IGHAT 250 UI; 3 ou mais doses, última há > 5 anos = reforço.",
     "Notificar o atendimento antirrábico humano (Sinan)."
    ]
   },
   {
    "t": "Sinais de alarme e quando internar/encaminhar",
    "itens": [
     "Febre, celulite que progride, linfangite ou infecção em mão ou articulação (artrite séptica, tenossinovite): internar para antibiótico EV.",
     "Lesão de tendão, nervo, vaso, fratura ou penetração articular: cirurgia/ortopedia.",
     "Ferimentos extensos de face e couro cabeludo ou criança pequena: cirurgia; avaliar negligência.",
     "Asplênico, cirrótico ou imunossuprimido (risco de Capnocytophaga): antibiótico sempre e reavaliação precoce."
    ],
    "alerta": true
   },
   {
    "t": "Orientações ao paciente",
    "itens": [
     "Lave a ferida com água e sabão e mantenha limpa; volte em 24–48 h se a ferida for de risco.",
     "Observe o cão ou gato por 10 dias: se ele adoecer, sumir ou morrer, avise a unidade na hora.",
     "Tome todas as doses da vacina antirrábica nas datas marcadas, mesmo que a ferida já tenha sarado.",
     "Volte se vermelhidão, inchaço, pus, febre ou dor que aumenta."
    ]
   },
   {
    "t": "Outras opções (material do médico)",
    "itens": [
     "Amoxicilina-clavulanato 500/125 mg 8/8 h por 3 dias (profilaxia curta) ou 5–7 dias (ferida já infectada) — guia HC-FMUSP 2024.",
     "Alergia à penicilina (adulto): clindamicina 300 mg 8/8 h + ciprofloxacino 500 mg 12/12 h ou + SMX-TMP 800/160 mg 12/12 h; quinolona não na gestação."
    ],
    "offlabel": true
   }
  ],
  "pendencias": [
   "Duração da profilaxia: DATA 5 dias; guia HC-FMUSP 3 dias; IDSA 3–5 dias — decidir.",
   "Alergia à penicilina: o DATA usa doxiciclina isolada; o HC-FMUSP prefere clindamicina + ciprofloxacino ou + SMX-TMP (melhor cobertura de anaeróbios) — decidir (propostas enviadas).",
   "Criança alérgica: o DATA não tem alternativa; o HC-FMUSP sugere clindamicina 30–40 mg/kg/dia + SMX-TMP 8–12 mg/kg/dia de TMP, mas clindamicina líquida tem pouca disponibilidade — decidir.",
   "O DATA não tem bloco para mordedura já infectada (5–7 dias ou mais) — proposta enviada.",
   "Material do Drive (Principais condutas): SMX-TMP ou cefalexina isolados (cobrem mal Pasteurella/anaeróbios) e vacina em 5 doses (0, 3, 7, 14, 28) — desatualizado; não importado.",
   "A NT 8/2022 permite vacina antirrábica intradérmica (dias 0, 3, 7 e 14); o DATA só tem IM — incluir se o serviço usar?"
  ],
  "fontes": [
   "Brasil. Ministério da Saúde. Nota Técnica nº 8/2022-CGZV/DEIDT/SVS/MS: atualização do protocolo de profilaxia pré, pós e reexposição da raiva humana no Brasil. 2022.",
   "Brasil. Ministério da Saúde. Guia de Vigilância em Saúde. 6ª ed. rev. Brasília: MS; 2024.",
   "Stevens DL et al. Practice guidelines for the diagnosis and management of skin and soft tissue infections: 2014 update by the Infectious Diseases Society of America. Clin Infect Dis. 2014;59(2):e10-e52.",
   "Levin ASS, Costa SF (coord.). Antimicrobianos na prática clínica: um guia para profissionais da atenção primária. 1ª ed. São Paulo: HC-FMUSP; 2024."
  ]
 },
 {
  "id": "peconhentos",
  "tipo": "condicao",
  "cond": "peconhentos",
  "nm": "Acidentes por animais peçonhentos (escorpião e serpente)",
  "sub": "escorpião · serpente · soro antiveneno · tempo de coagulação · observação",
  "kw": "animal peconhento picada escorpiao escorpionismo tityus cobra picada de cobra serpente ofidismo jararaca bothrops cascavel crotalus surucucu lachesis coral micrurus aranha armadeira aranha marrom loxosceles phoneutria lagarta taturana lonomia soro antiescorpionico saesc soro antiaracnidico soro antibotropico soro anticrotalico soro antilaquetico soro antielapidico tempo de coagulacao lidocaina dipirona ciatox disque intoxicacao",
  "draft": true,
  "revisado": null,
  "resumo": "Escorpião: a maioria é leve (só dor) e se resolve com analgesia, lidocaína local e observação; vômitos e outras manifestações sistêmicas indicam soro, sobretudo em crianças. Serpente: identificar o gênero pela clínica, colher tempo de coagulação e dar o soro específico em dose única conforme a gravidade, em hospital de referência.",
  "secoes": [
   {
    "t": "Quando pensar / diagnóstico",
    "itens": [
     "Escorpião leve: dor local intensa, parestesia, eritema, sudorese local; náusea, vômito e taquicardia discretos ligados à dor.",
     "Escorpião moderado: sistêmico discreto (sudorese, alguns vômitos, taqui ou bradicardia, hipertensão, agitação). Grave: vômitos repetidos, sialorreia, sudorese profusa, sonolência, taquidispneia, EAP, choque.",
     "Crianças até 10 anos (sobretudo < 7) têm mais risco de forma grave; vômitos repetidos são o sinal mais sensível de gravidade.",
     "Botrópico (jararaca): dor, edema e equimose locais, sangramentos, coagulopatia. Laquético (surucucu): o mesmo + sintomas vagais (bradicardia, diarreia, hipotensão).",
     "Crotálico (cascavel): pouca lesão local, ptose, visão turva, mialgia, urina escura, lesão renal. Elapídico (coral): ptose, fraqueza, disfagia, paralisia respiratória."
    ]
   },
   {
    "t": "Exame físico: o que procurar",
    "itens": [
     "Local da picada, extensão do edema (segmentos), sangramentos, sinais de síndrome compartimental.",
     "Sinais vitais, perfusão, ausculta pulmonar (EAP no escorpionismo grave), consciência, ptose e força."
    ]
   },
   {
    "t": "Exames complementares",
    "itens": [
     "Serpente: tempo de coagulação à beira do leito (normal < 10 min; incoagulável > 30 min), hemograma, CK, ureia, creatinina, eletrólitos e urina.",
     "Escorpião moderado/grave: glicemia, potássio, ECG, troponina/CK-MB e RX de tórax se dispneia."
    ]
   },
   {
    "t": "Conduta",
    "itens": [
     "Escorpião: dipirona VO (dor leve) ou EV (moderada); dor intensa: lidocaína 2% sem vasoconstritor no local, adulto 3–4 mL, criança 1–2 mL, até 3 vezes.",
     "Observação do escorpionismo: sem sintomas 4 h; leve 6–12 h; após soro, no mínimo 24 h.",
     "Soro antiescorpiônico (ou antiaracnídico): moderado 3 ampolas, grave 6 (máximo 6), mesma dose na criança, EV diluído em 10–15 min.",
     "Serpente: soro pelo gênero e gravidade (botrópico 3/6/12; crotálico 5/10/20; laquético 10/20; elapídico 5/10), tudo de uma vez, EV, sem pré-medicação.",
     "Serpente: lavar, elevar o membro, hidratar e tirar anéis; sem torniquete, incisão, sucção, injeção IM ou bloqueio no local; sem AINE.",
     "Antibiótico só se infecção estabelecida; profilaxia antitetânica pela caderneta.",
     "Dúvida na identificação ou na conduta: Disque-Intoxicação 0800 722 6001 (CIATox). Notificar todo acidente."
    ]
   },
   {
    "t": "Sinais de alarme e quando internar/encaminhar",
    "itens": [
     "Qualquer manifestação sistêmica no escorpionismo, sobretudo em criança: soro em hospital de referência, com monitorização.",
     "Picada de serpente com sinais de envenenamento: transferir para unidade com soro; não esperar exame para indicar.",
     "Choque, EAP, arritmia, insuficiência respiratória ou rebaixamento: UTI (no escorpionismo grave, dobutamina é a amina preferida).",
     "Reação ao soro (urticária, broncoespasmo, hipotensão): interromper a infusão, tratar como anafilaxia e retomar com cautela após o controle."
    ],
    "alerta": true
   },
   {
    "t": "Orientações ao paciente",
    "itens": [
     "Não amarre, não corte, não fure e não chupe o local da picada.",
     "Volte na hora se vômitos, suor excessivo, salivação, agitação ou sonolência, tremores, falta de ar ou coração acelerado.",
     "Para evitar novos acidentes: sacuda roupas e sapatos, vede ralos e frestas e mantenha o quintal sem entulho."
    ]
   }
  ],
  "pendencias": [
   "O DATA cobre escorpião e serpente; aranhas (armadeira, marrom) e lagarta (Lonomia) aparecem só nas palavras-chave — criar blocos ou um texto curto?",
   "O PCDT dos acidentes ofídicos (relatório Conitec nº 1048, 2025) mantém as doses de soro do DATA; confirmar se já saiu a versão final publicada.",
   "Escorpiões da Amazônia: o PCDT registra incerteza sobre a lidocaína (pode intensificar a sensação de choque) e cita diazepam — acrescentar ressalva regional?",
   "O PCDT do escorpionismo não recomenda dexametasona — conferir se ainda é usada na rotina local.",
   "O material do Drive não traz conduta para animais peçonhentos."
  ],
  "fontes": [
   "Brasil. Ministério da Saúde. Protocolo Clínico e Diretrizes Terapêuticas dos Acidentes Escorpiônicos. Brasília: MS; 2026 (aprovado pela Portaria SECTICS/MS nº 59, de 1º de agosto de 2025).",
   "Brasil. Ministério da Saúde/Conitec. Protocolo Clínico e Diretrizes Terapêuticas: Acidentes Ofídicos. Relatório de Recomendação nº 1048. Brasília; 2025.",
   "Brasil. Ministério da Saúde. Guia de Animais Peçonhentos do Brasil. Brasília: MS; 2024.",
   "Brasil. Fundação Nacional de Saúde. Manual de Diagnóstico e Tratamento de Acidentes por Animais Peçonhentos. 2ª ed. Brasília: Funasa; 2001."
  ]
 },
 {
  "id": "sutura",
  "tipo": "condicao",
  "cond": "sutura",
  "nm": "Sutura — ferimentos e profilaxia",
  "sub": "laceração · tétano · antibiótico · retirada de pontos · curativo",
  "kw": "sutura ponto pontos ferimento corte laceracao ferida corto-contusa ferida cortante cola cirurgica adesivo tecidual fita adesiva retirada de pontos tetano antitetanica dupla adulto dt dtp ighat soro antitetanico cefalexina amoxicilina clavulanato dipirona paracetamol vaselina lidocaina anestesia local irrigacao corpo estranho tendao curativo cicatriz",
  "draft": true,
  "revisado": null,
  "resumo": "A maioria das lacerações limpas fecha bem com boa irrigação, sutura sem tensão e sem antibiótico. O que o plantão não pode esquecer: explorar tendão, nervo e corpo estranho, decidir o tétano pelo tipo de ferimento e pela caderneta, e orientar curativo e retirada dos pontos.",
  "secoes": [
   {
    "t": "Quando pensar / diagnóstico",
    "itens": [
     "Registrar mecanismo (corte limpo, esmagamento, mordedura, perfurante), tempo desde o trauma, contaminação, local e tensão da pele.",
     "Não há 'hora de ouro' rígida: muitas feridas podem ser fechadas com 18 h ou mais; face e couro cabeludo até 24 h.",
     "Mais risco de infecção: contaminação grosseira, esmagamento, ferida > 5 cm, membro inferior, diabetes, imunossupressão.",
     "Alto risco para tétano: ferimento profundo ou sujo, corpo estranho, tecido desvitalizado, perfurante, esmagamento, mordedura, queimadura, fratura exposta."
    ]
   },
   {
    "t": "Exame físico: o que procurar",
    "itens": [
     "Antes de anestesiar: pulso, enchimento capilar, sensibilidade distal e função de cada tendão contra resistência.",
     "Explorar o fundo da ferida com boa luz e hemostasia: corpo estranho, tendão, cápsula articular, osso.",
     "Vidro ou metal: RX para corpo estranho; madeira ou plástico: USG."
    ]
   },
   {
    "t": "Conduta",
    "itens": [
     "Irrigar com bastante soro ou água potável sob pressão; desbridar tecido desvitalizado; remover corpo estranho.",
     "Anestesia com lidocaína; com vasoconstritor pode ser usada em dedos, nariz e orelha quando não há comprometimento vascular.",
     "Fechar sem tensão; em área de baixa tensão e bordas regulares, cola tecidual ou fita adesiva são alternativas (ótimas em criança).",
     "Ferida limpa: sem antibiótico. Considerar se muito contaminada, esmagamento, mordedura, lesão profunda de mão, fratura exposta ou imunossupressão.",
     "Tétano com menos de 3 doses ou esquema incerto: vacinar; se ferimento de alto risco, acrescentar IGHAT 250 UI.",
     "Com 3 ou mais doses: última há < 5 anos, nada; 5–10 anos, reforço só se alto risco; > 10 anos, reforço.",
     "Imunodeprimido, desnutrido grave ou idoso com ferimento de alto risco: reforço e também IGHAT.",
     "Criança menor de 7 anos: vacina com componente pertussis (DTP) conforme a caderneta; a partir de 7 anos: dT.",
     "Retirada: face 5 dias; couro cabeludo e braços 7–10 dias; tronco, pernas, mãos, pés e sobre articulações 10–14 dias."
    ]
   },
   {
    "t": "Sinais de alarme e quando internar/encaminhar",
    "itens": [
     "Lesão de tendão, nervo ou artéria, penetração articular ou fratura exposta: ortopedia/cirurgia.",
     "Pálpebra, borda livre do lábio, cartilagem de orelha ou nariz, perda de substância ou ferida complexa de face: especialista.",
     "Injeção de alta pressão (tinta, graxa) na mão: cirurgia de urgência, mesmo com ferida pequena.",
     "Infecção após a sutura: abrir pontos, drenar e dar antibiótico. Criança com ferimentos repetidos ou incompatíveis com o relato: avaliar maus-tratos."
    ],
    "alerta": true
   },
   {
    "t": "Orientações ao paciente",
    "itens": [
     "Mantenha o curativo limpo e seco por 24–48 h; depois lave com água e sabão neutro 1 a 2 vezes ao dia e seque bem.",
     "Passe uma camada fina de vaselina sobre os pontos após a limpeza; não precisa de pomada com antibiótico.",
     "Retire os pontos na UBS no dia marcado e leve a caderneta de vacinação.",
     "Volte se febre, vermelhidão ou inchaço que aumenta, pus, mau cheiro ou abertura dos pontos.",
     "Proteja a cicatriz do sol por pelo menos 6 meses."
    ]
   }
  ],
  "pendencias": [
   "Outras opções 1–3 trazem neomicina tópica e cefalexina por 7 dias de rotina: antibiótico tópico sensibiliza (dermatite de contato) sem superar a vaselina, e o sistêmico não é indicado em ferida limpa — revisar.",
   "Nomes comerciais no DATA ('Contractubex', 'Tetanogamma') — trocar por genéricos (extrato de cebola + heparina + alantoína; imunoglobulina humana antitetânica).",
   "Para cicatriz, gel de silicone tem mais evidência que extrato de cebola — considerar trocar.",
   "O material do Drive (Principais condutas) aplica dT se a última dose foi há mais de 5 anos em qualquer ferimento; o MS reserva o reforço de 5–10 anos ao ferimento de alto risco — o DATA já segue o MS.",
   "Diclofenaco por 5 dias de rotina na 'Opção 3': AINE só se dor; dipirona ou paracetamol bastam na maioria."
  ],
  "fontes": [
   "Forsch RT, Little SH, Williams C. Laceration Repair: A Practical Approach. Am Fam Physician. 2017;95(10):628-636.",
   "Brasil. Ministério da Saúde. Guia de Vigilância em Saúde. 6ª ed. rev. Brasília: MS; 2024.",
   "World Health Organization. Tetanus vaccines: WHO position paper – February 2017. Wkly Epidemiol Rec. 2017;92(6):53-76."
  ]
 },
 {
  "id": "ulceras",
  "tipo": "condicao",
  "cond": "ulceras",
  "nm": "Úlceras de perna e pé (causas variadas)",
  "sub": "úlcera venosa · arterial · pé diabético · lesão por pressão · curativo · compressão",
  "kw": "ulcera ulcera venosa ulcera varicosa ulcera de perna ferida cronica ferida que nao cicatriza ferida que nao sara escara lesao por pressao ulcera de decubito pe diabetico mal perfurante ulcera arterial isquemia itb indice tornozelo braco compressao bota de unna meia elastica curativo desbridamento colagenase soro fisiologico diosmina hesperidina cefalexina celulite osteomielite",
  "draft": true,
  "revisado": null,
  "resumo": "Ferida que não cicatriza em 4–6 semanas. A causa define o tratamento: compressão na venosa, revascularização na arterial, descarga de peso no pé diabético e alívio de pressão na lesão por pressão. No plantão: tratar infecção quando houver, não comprimir sem afastar isquemia e encaminhar com plano de curativo.",
  "secoes": [
   {
    "t": "Quando pensar / diagnóstico",
    "itens": [
     "Venosa (a mais comum): região maleolar medial, rasa, exsudativa, bordas irregulares, com edema, varizes, dermatite ocre e lipodermatoesclerose.",
     "Arterial: dolorosa (piora ao elevar a perna), em dedos, maléolo lateral ou região pré-tibial, bordas regulares, leito pálido, pele fria sem pelos, pulsos fracos.",
     "Neuropática (pé diabético): plantar, em pontos de apoio, indolor, com calo ao redor e perda da sensibilidade protetora.",
     "Lesão por pressão: sobre proeminência óssea (sacro, calcâneo, trocânter) em acamado ou cadeirante.",
     "Atípica (pioderma, vasculite, câncer): aspecto incomum, borda vegetante ou sem melhora em 3 meses — biopsiar."
    ]
   },
   {
    "t": "Exame físico: o que procurar",
    "itens": [
     "Medir a ferida (comprimento × largura) e descrever leito (granulação, esfacelo, necrose), exsudato, odor e pele ao redor.",
     "Pulsos pedioso e tibial posterior; ITB com Doppler portátil antes de qualquer compressão.",
     "Pé diabético: monofilamento e deformidades; tocar osso com estilete sugere osteomielite.",
     "Infecção: calor, eritema > 2 cm ao redor, dor crescente, secreção purulenta, crepitação, febre."
    ]
   },
   {
    "t": "Exames complementares",
    "itens": [
     "Glicemia/HbA1c; hemograma e PCR se infecção; RX do pé se suspeita de osteomielite ou gás.",
     "Cultura só com infecção clínica, de tecido após limpeza ou desbridamento (swab superficial não serve)."
    ]
   },
   {
    "t": "Conduta",
    "itens": [
     "Limpeza com SF em jato a cada troca; desbridar esfacelo (colagenase ou instrumental na UBS); cobertura que mantenha a ferida úmida e proteja a pele ao redor.",
     "Venosa: compressão é o tratamento principal (bota de Unna ou ataduras, depois meia 30–40 mmHg) se ITB ≥ 0,8; pernas elevadas no repouso.",
     "ITB 0,5–0,8: compressão reduzida com especialista; < 0,5 ou dor isquêmica: não comprimir e encaminhar à vascular.",
     "Diosmina + hesperidina (fração flavonoide micronizada) ajuda a cicatrizar a úlcera venosa como adjuvante da compressão.",
     "Antibiótico sistêmico só com infecção clínica (celulite: cefalexina); não usar antibiótico tópico.",
     "Pé diabético: descarga de peso, controle glicêmico e classificação da infecção; necrose seca em pé isquêmico não se desbrida no PS.",
     "Lesão por pressão: mudar de decúbito a cada 2 h, colchão de redistribuição, nutrição e controle de umidade."
    ]
   },
   {
    "t": "Sinais de alarme e quando internar/encaminhar",
    "itens": [
     "Celulite extensa, febre ou sepse, crepitação, necrose úmida ou cheiro pútrido: internar.",
     "Isquemia crítica (dor em repouso, pé frio, pálido ou escurecido, gangrena): vascular de urgência.",
     "Pé diabético com infecção moderada ou grave, ou osteomielite: internação e antibiótico EV.",
     "Sem melhora em 4–6 semanas de tratamento correto: rever a causa e encaminhar."
    ],
    "alerta": true
   },
   {
    "t": "Orientações ao paciente",
    "itens": [
     "Troque o curativo 1 vez ao dia ou quando molhar ou sujar: lave com soro em jato, seque a pele ao redor e cubra com gaze limpa.",
     "Não coloque açúcar, pó de café, pomada com antibiótico ou outros produtos caseiros na ferida.",
     "Na úlcera venosa, use a compressão como orientado e deixe as pernas elevadas ao descansar.",
     "Diabético: examine os pés todos os dias e nunca ande descalço.",
     "Volte se febre, vermelhidão que se espalha, pus, mau cheiro forte, dor intensa ou pé frio e escuro."
    ]
   }
  ],
  "pendencias": [
   "Outras opções com cloranfenicol + colagenase e 'Iruxol' (nome comercial): antibiótico tópico não é recomendado (sensibilização, resistência) — retirar ou deixar só a colagenase.",
   "O DATA não tem conduta para pé diabético infectado (amoxicilina-clavulanato na infecção leve, IWGDF) nem para lesão por pressão — criar blocos?",
   "Cefalexina 500 mg 6/6 h por 7 dias: horário sugerido incompleto no DATA ('00' em vez de '00:00').",
   "O material do Drive não traz conduta para úlceras (só varizes, com flebotônicos que não entram aqui).",
   "Limite de ITB para compressão (0,8 no DATA; algumas diretrizes aceitam compressão modificada a partir de 0,6) — decidir com a vascular."
  ],
  "fontes": [
   "De Maeseneer MG et al. European Society for Vascular Surgery (ESVS) 2022 Clinical Practice Guidelines on the Management of Chronic Venous Disease of the Lower Limbs. Eur J Vasc Endovasc Surg. 2022;63(2):184-267.",
   "European Pressure Ulcer Advisory Panel, National Pressure Injury Advisory Panel, Pan Pacific Pressure Injury Alliance. Prevention and Treatment of Pressure Ulcers/Injuries: Clinical Practice Guideline. The International Guideline. 3rd ed. 2019.",
   "Schaper NC et al. Practical guidelines on the prevention and management of diabetes-related foot disease (IWGDF 2023 update). Diabetes Metab Res Rev. 2024;40(3):e3657."
  ]
 },
 {
  "id": "analgesia",
  "tipo": "condicao",
  "cond": "analgesia",
  "nm": "Analgesia / Dor",
  "sub": "dor aguda · escada analgésica · AINE · opioide · criança",
  "kw": "analgesia dor aguda dor forte analgesico antitermico dipirona metamizol paracetamol acetaminofeno ibuprofeno diclofenaco naproxeno nimesulida cetoprofeno tenoxicam codeina paco tramadol morfina fentanil intranasal naloxona escala de dor flacc opioide aine",
  "draft": true,
  "revisado": null,
  "resumo": "Dor aguda no PS/UBS: medir a intensidade, procurar a causa e escalonar — analgésico simples, AINE por poucos dias se não houver contraindicação, opioide só para dor intensa e pelo menor tempo. Criança: dose pelo peso, sem codeína nem tramadol abaixo de 12 anos.",
  "secoes": [
   {
    "t": "Quando pensar / diagnóstico",
    "itens": [
     "Dor é sintoma: antes de mascarar com analgesia potente, pensar em abdome agudo, SCA, dissecção de aorta, fratura e síndrome compartimental.",
     "Medir a dor: escala numérica 0–10 no adulto; FLACC abaixo de 4 anos; escala de faces de 4 a 12 anos.",
     "Leve 1–3, moderada 4–6, intensa 7–10: intensidade e função orientam o degrau do tratamento.",
     "Perguntar: alergias, úlcera ou sangramento digestivo, doença renal, insuficiência cardíaca, anticoagulante, gestação, hepatopatia, etilismo e uso prévio de opioide."
    ]
   },
   {
    "t": "Exame físico: o que procurar",
    "itens": [
     "Sinais vitais completos: taquicardia ou hipotensão com dor pedem procurar causa grave antes de liberar.",
     "Dor desproporcional ao exame: isquemia mesentérica, síndrome compartimental, fasceíte necrotizante.",
     "Antes de opioide: anotar nível de consciência, FR e SpO2 basais para comparar depois."
    ]
   },
   {
    "t": "Exames complementares",
    "itens": [
     "A dor em si não pede exame; solicitar conforme a causa suspeita.",
     "Antes de AINE de horário em idoso ou doente renal: creatinina recente, se disponível."
    ]
   },
   {
    "t": "Conduta",
    "itens": [
     "Leve a moderada: dipirona ou paracetamol em horário fixo nas primeiras 24–48 h, depois se dor.",
     "Componente inflamatório (trauma, musculoesquelético, cólica renal, dor de dente): AINE na menor dose eficaz por 3–5 dias, nunca dois AINEs juntos.",
     "Contraindicação a AINE (idoso frágil, ClCr < 60, úlcera, IC, anticoagulação, gestação): dipirona + paracetamol.",
     "Dor intensa ambulatorial: paracetamol + codeína por até 3 dias, no lugar do paracetamol isolado.",
     "Dor intensa no PS: morfina EV titulada em pequenas doses, com monitorização e naloxona à beira do leito.",
     "Tramadol: alternativa na dor moderada refratária; risco de síndrome serotoninérgica com ISRS/IRSN, convulsão, hiponatremia e hipoglicemia no idoso.",
     "Associar medidas não farmacológicas: imobilizar fratura, gelo, elevação, explicar o que está acontecendo.",
     "Criança: dose sempre pelo peso, um analgésico por vez (SBP desaconselha alternar de rotina); ibuprofeno só a partir de 6 meses.",
     "Criança com dor intensa sem acesso venoso: fentanil intranasal 1,5 mcg/kg, com a mesma vigilância dos opioides EV."
    ]
   },
   {
    "t": "Sinais de alarme e quando internar/encaminhar",
    "itens": [
     "Dor torácica, abdominal ou cefaleia súbita e intensa: investigar a causa antes de dar alta com analgésico.",
     "Dor que não cede com morfina titulada: reavaliar causa cirúrgica ou vascular.",
     "Após opioide: sonolência crescente, FR < 10 irpm ou SpO2 < 90% — suspender, estimular, O2 e naloxona.",
     "Fezes escuras, vômito com sangue ou queda da diurese em uso de AINE: suspender e avaliar.",
     "Criança com prostração, recusa alimentar ou sinais de desidratação: reavaliar no mesmo dia."
    ],
    "alerta": true
   },
   {
    "t": "Orientações ao paciente",
    "itens": [
     "Tome o analgésico nos horários combinados nos primeiros dias; depois, só se tiver dor.",
     "Não tome dois anti-inflamatórios juntos nem por mais dias que o receitado; tome após as refeições.",
     "Remédio com codeína ou tramadol dá sono e prisão de ventre: não dirija e não beba álcool.",
     "Não some antigripais ou outros remédios com paracetamol ao paracetamol da receita.",
     "Volte se a dor piorar ou se aparecer febre, vômitos, fezes pretas ou falta de ar."
    ]
   },
   {
    "t": "Outras opções (material do médico)",
    "itens": [
     "Tramadol 50 mg, 1–2 cápsulas até 6/6 h por até 3 dias (modelo do médico) — dor intensa sem resposta à codeína; náusea e tontura.",
     "Tenoxicam 20 mg EV ou IM 1 vez ao dia no PS (Plantão Rápido, PA pdf) — AINE de dose única diária; contraindicações dos AINEs."
    ],
    "offlabel": true
   }
  ],
  "pendencias": [
   "Condutas e Tigers trazem a associação dipirona + adifenina + prometazina — sedativo sem ganho analgésico; não proposta.",
   "Tabela 'Prescrevendo morfina' do material de terceiros afirma 'pouca adicção' — falso; não reproduzir.",
   "Nimesulida (Outras opções): a EMA limitou o uso a 15 dias por hepatotoxicidade — manter só como alternativa por até 5 dias?",
   "Cetoprofeno 150 mg 12/12h (Outras opções) já é a dose máxima diária (300 mg) — confirmar que é a apresentação de liberação prolongada.",
   "Plantãozinho usa tramadol 100 mg 8/8h: o comprimido de 100 mg é de liberação prolongada (12/12h); a proposta usa 50 mg de liberação imediata.",
   "Etoricoxibe 60 mg 12/12h do catálogo do Plantão Rápido não segue a bula (dose única diária) — não proposto.",
   "Modo Internação limita paracetamol a 3 g/dia; a bula permite 4 g/dia no adulto sem fator de risco — decidir o padrão.",
   "Fentanil intranasal: via off label no Brasil e exige atomizador — confirmar disponibilidade no serviço."
  ],
  "fontes": [
   "Hachimi-Idrissi S et al. Approaching acute pain in emergency settings: European Society for Emergency Medicine (EUSEM) guidelines — part 2: management and recommendations. Intern Emerg Med. 2020;15(7):1141-1155.",
   "Dowell D et al. CDC Clinical Practice Guideline for Prescribing Opioids for Pain — United States, 2022. MMWR Recomm Rep. 2022;71(3):1-95.",
   "Qaseem A et al. Nonpharmacologic and Pharmacologic Management of Acute Pain From Non-Low Back, Musculoskeletal Injuries in Adults: A Clinical Guideline From the ACP and AAFP. Ann Intern Med. 2020;173(9):739-748.",
   "Sociedade Brasileira de Pediatria. Manejo da febre aguda (Documento Científico). 2021."
  ]
 },
 {
  "id": "lombalgia",
  "tipo": "condicao",
  "cond": "lombalgia",
  "nm": "Lombalgia mecânica",
  "sub": "dor lombar · sinais de alerta · AINE · manter-se ativo · ciática",
  "kw": "lombalgia lumbago dor lombar dor nas costas dor na coluna travou as costas mau jeito ciatica ciatalgia hernia de disco lasegue bandeira vermelha cauda equina aine ibuprofeno diclofenaco naproxeno meloxicam ciclobenzaprina relaxante muscular dipirona paracetamol codeina calor local fisioterapia",
  "draft": true,
  "revisado": null,
  "resumo": "Dor lombar aguda sem sinais de alerta é benigna e melhora em semanas na maioria: sem exame de imagem, manter-se ativo, calor local e AINE por poucos dias. O trabalho do PS é excluir cauda equina, infecção, fratura, câncer e aneurisma de aorta.",
  "secoes": [
   {
    "t": "Quando pensar / diagnóstico",
    "itens": [
     "Dor entre as costelas e as pregas glúteas, pior ao movimento e melhor em repouso, sem irradiação abaixo do joelho: lombalgia mecânica.",
     "Dor irradiada abaixo do joelho em trajeto de raiz, pior na perna que nas costas: ciática (radiculopatia).",
     "Aguda < 4 semanas; subaguda 4–12 semanas; crônica > 12 semanas.",
     "Pesquisar sinais de alerta em todos e fatores de cronificação: medo de se mexer, afastamento do trabalho, depressão."
    ]
   },
   {
    "t": "Exame físico: o que procurar",
    "itens": [
     "Palpação: dor localizada em processo espinhoso sugere fratura ou infecção; dor paravertebral difusa é muscular.",
     "Lasègue (dor abaixo do joelho entre 30° e 70°) e Lasègue cruzado; força, sensibilidade e reflexos de L4, L5 e S1.",
     "Sensibilidade perineal e, se suspeita de cauda equina, tônus anal e resíduo pós-miccional.",
     "Febre, abdome (massa pulsátil), pulsos femorais e punho-percussão lombar para causas não mecânicas."
    ]
   },
   {
    "t": "Exames complementares",
    "itens": [
     "Sem sinais de alerta: não pedir radiografia nem RM — não muda a conduta.",
     "Suspeita de cauda equina ou compressão medular: RM urgente.",
     "Suspeita de infecção ou câncer: hemograma, VHS/PCR e imagem; trauma ou osteoporose: radiografia.",
     "Idoso com dor lombar súbita e hipotensão: US à beira do leito ou angiotomografia de aorta."
    ]
   },
   {
    "t": "Conduta",
    "itens": [
     "Explicar o bom prognóstico e orientar manter-se ativo; repouso no leito atrasa a recuperação.",
     "Calor local superficial tem benefício na lombalgia aguda (ACP 2017).",
     "AINE oral na menor dose e pelo menor tempo (3–5 dias), se sem contraindicação.",
     "Paracetamol isolado não é recomendado (NICE NG59); dipirona e paracetamol entram como complemento do AINE.",
     "Relaxante muscular à noite (ciclobenzaprina 5 mg) por até 5–7 dias se espasmo; dá menos sonolência que 10 mg.",
     "Opioide fraco (codeína) só se AINE contraindicado, não tolerado ou ineficaz, por poucos dias (NICE NG59).",
     "Corticoide sistêmico, IM ou oral, não tem efeito na lombalgia aguda (ACP 2017) — não usar de rotina.",
     "Ciática: mesma base; encaminhar se déficit motor ou dor intensa que persiste por mais de 6 semanas."
    ]
   },
   {
    "t": "Sinais de alarme e quando internar/encaminhar",
    "itens": [
     "Anestesia em sela, retenção ou incontinência urinária/fecal, fraqueza progressiva: cauda equina — RM e neurocirurgia urgentes.",
     "Febre, droga injetável, imunossupressão ou infecção recente: espondilodiscite ou abscesso epidural.",
     "Câncer prévio, perda de peso, dor noturna que não melhora em repouso: metástase.",
     "Trauma importante, osteoporose ou corticoide crônico: fratura.",
     "Dor lombar súbita com hipotensão ou massa pulsátil: aneurisma de aorta.",
     "Sem melhora em 4–6 semanas: UBS para reavaliação e fisioterapia."
    ],
    "alerta": true
   },
   {
    "t": "Orientações ao paciente",
    "itens": [
     "Sua dor é da musculatura da coluna e costuma melhorar em poucas semanas; continue andando e retome as atividades aos poucos.",
     "Evite ficar deitado o dia todo; use compressa morna por 15 a 20 minutos, três vezes ao dia.",
     "Tome o anti-inflamatório após as refeições e só pelos dias receitados.",
     "O relaxante muscular dá sono: não dirija e não beba álcool.",
     "Procure o pronto-socorro já se tiver dormência na região genital ou anal, perder o controle da urina ou das fezes, fraqueza nas pernas ou febre."
    ]
   },
   {
    "t": "Outras opções (material do médico)",
    "itens": [
     "Paracetamol + codeína 500/30 mg até 6/6 h, até 3 dias (modelo 'Dor muscular' do médico, Tigers) — se AINE contraindicado ou ineficaz.",
     "Meloxicam 15 mg 1 vez ao dia por 5 dias (Tigers, Condutas) — AINE de tomada única; mesmas contraindicações.",
     "No PS, dor intensa: dipirona + diclofenaco IM ou tramadol SC (modelo de observação do médico) — proposto sem a dexametasona do modelo."
    ],
    "offlabel": true
   }
  ],
  "pendencias": [
   "O modelo de observação do médico associa dexametasona IM a dipirona e diclofenaco; ACP 2017 e NICE NG59 não recomendam corticoide na lombalgia — decidir.",
   "Lombalgia não tem modo Internação; o modelo do médico (dipirona + diclofenaco IM, tramadol SC) foi proposto nesse modo, sem corticoide.",
   "Padrão traz menu dipirona/paracetamol; NICE NG59 é contra paracetamol isolado — deixar claro que é complemento do AINE?",
   "Outras opções com carisoprodol (Opção 1, Opção 2 e Opção 5): a EMA recomendou suspender o carisoprodol em 2007 por abuso e dependência — manter?",
   "Modelo 'Dor muscular' do médico usa ibuprofeno 600 mg 8/8h por 3 dias e ciclobenzaprina 10 mg; o Padrão usa ibuprofeno 300 mg 2 cp 6/6h e ciclobenzaprina 5 mg — escolher.",
   "Etoricoxibe 60 mg 12/12h (Plantão Rápido) não segue a bula (dose diária única) — não proposto.",
   "Diclofenaco + vitaminas do complexo B (Opção 4): as vitaminas não têm benefício demonstrado na lombalgia aguda."
  ],
  "fontes": [
   "Qaseem A et al. Noninvasive Treatments for Acute, Subacute, and Chronic Low Back Pain: A Clinical Practice Guideline From the American College of Physicians. Ann Intern Med. 2017;166(7):514-530.",
   "National Institute for Health and Care Excellence (NICE). Low back pain and sciatica in over 16s: assessment and management (NG59). 2016, atualizada 2020.",
   "Qaseem A et al. Nonpharmacologic and Pharmacologic Management of Acute Pain From Non-Low Back, Musculoskeletal Injuries in Adults: A Clinical Guideline From the ACP and AAFP. Ann Intern Med. 2020;173(9):739-748."
  ]
 },
 {
  "id": "torcicolo",
  "tipo": "condicao",
  "cond": "torcicolo",
  "nm": "Torcicolo espasmódico",
  "sub": "cervicalgia aguda · espasmo · AINE · relaxante muscular · distonia",
  "kw": "torcicolo torcicolo agudo pescoco travado pescoco duro dor no pescoco cervicalgia espasmo muscular contratura dormiu de mau jeito aine naproxeno ibuprofeno diclofenaco ciclobenzaprina relaxante muscular calor local distonia aguda metoclopramida biperideno grisel abscesso retrofaringeo",
  "draft": true,
  "revisado": null,
  "resumo": "Dor cervical aguda com espasmo e rotação limitada, geralmente ao acordar, sem trauma nem febre: benigna, melhora em dias com calor, movimento suave e AINE curto. Antes, excluir infecção profunda, meningite, trauma, déficit neurológico e distonia por medicamento.",
  "secoes": [
   {
    "t": "Quando pensar / diagnóstico",
    "itens": [
     "Início súbito, muitas vezes ao acordar ou após postura forçada; cabeça inclinada para um lado com espasmo do esternocleidomastoideo ou do trapézio.",
     "Perguntar sobre trauma, febre, dor de garganta, dificuldade para engolir e uso recente de metoclopramida, bromoprida ou antipsicótico.",
     "Movimentos involuntários, desvio do olhar ou trismo após antiemético ou antipsicótico: reação distônica aguda, não torcicolo muscular.",
     "Criança: pensar em abscesso retrofaríngeo, subluxação atlantoaxial após infecção de garganta (Grisel), trauma e tumor de fossa posterior."
    ]
   },
   {
    "t": "Exame físico: o que procurar",
    "itens": [
     "Amplitude de movimento, pontos dolorosos musculares e dor à palpação de processo espinhoso.",
     "Força, sensibilidade e reflexos dos membros superiores; Spurling se dor irradiada para o braço.",
     "Orofaringe, linfonodos e temperatura; dor à flexão do pescoço com febre ou cefaleia sugere meningite."
    ]
   },
   {
    "t": "Exames complementares",
    "itens": [
     "Sem trauma, febre ou déficit: nenhum exame.",
     "Trauma: regra canadense ou NEXUS para decidir a imagem (ver Escores).",
     "Febre com disfagia ou odinofagia: hemograma, PCR e tomografia cervical com contraste."
    ]
   },
   {
    "t": "Conduta",
    "itens": [
     "Calor local e movimentação suave dentro do limite da dor; não usar colar cervical.",
     "AINE por curto prazo (naproxeno, ibuprofeno ou diclofenaco), até 5 dias, após as refeições.",
     "Relaxante muscular à noite (ciclobenzaprina 5 mg) por até 5 dias; analgésico simples se necessário.",
     "Opioide, inclusive tramadol, não é recomendado de rotina na dor musculoesquelética aguda (ACP/AAFP 2020).",
     "Reação distônica aguda: suspender o fármaco causador e dar anticolinérgico parenteral (biperideno) ou difenidramina."
    ]
   },
   {
    "t": "Sinais de alarme e quando internar/encaminhar",
    "itens": [
     "Febre, disfagia, voz abafada, trismo ou edema cervical: abscesso profundo — tomografia e otorrino urgente.",
     "Febre com cefaleia, rigidez de nuca e alteração mental: meningite.",
     "Trauma, fraqueza ou formigamento nos braços: imagem e avaliação especializada.",
     "Torcicolo que persiste por mais de 1–2 semanas ou volta com frequência: reavaliar (distonia cervical, lesão estrutural).",
     "Criança com torcicolo e febre ou sinais neurológicos: avaliação no mesmo dia."
    ],
    "alerta": true
   },
   {
    "t": "Orientações ao paciente",
    "itens": [
     "O torcicolo costuma melhorar em poucos dias e sumir em até uma semana.",
     "Use compressa morna por 15 a 20 minutos, 3 a 4 vezes ao dia, e mexa o pescoço devagar, sem forçar.",
     "Não use colar cervical; durma com travesseiro baixo.",
     "O relaxante muscular dá sono: não dirija e não beba álcool.",
     "Volte se tiver febre, dor de cabeça forte, dificuldade para engolir, fraqueza ou formigamento nos braços."
    ]
   },
   {
    "t": "Outras opções (material do médico)",
    "itens": [
     "No PS, dor intensa: dipirona + diclofenaco IM em dose única (modelo de observação do médico) — seguir com via oral; sem corticoide.",
     "Tramadol SC no PS (mesmo modelo) — só se dor intensa refratária ou AINE contraindicado; ACP/AAFP 2020 sugere evitar opioide."
    ],
    "offlabel": true
   }
  ],
  "pendencias": [
   "Outras opções com carisoprodol (Opções 1, 3 e 4) e orfenadrina (Opção 2): a EMA recomendou suspender o carisoprodol em 2007 por abuso — manter?",
   "Ciclobenzaprina 10 mg nas Opções 5 a 7; o Padrão usa 5 mg (menos sonolência) — padronizar?",
   "Modelo de observação do médico usa dexametasona IM com dipirona e diclofenaco — corticoide sem evidência; proposto sem ele.",
   "DATA não tem conduta para reação distônica aguda (só manda procurar reavaliação) — criar bloco com biperideno parenteral? Conferir a dose na bula.",
   "Nimesulida betaciclodextrina 400 mg 12/12h (Opção 7): conferir na bula a equivalência em nimesulida e o limite de dias."
  ],
  "fontes": [
   "Blanpied PR et al. Neck Pain: Revision 2017. Clinical Practice Guidelines Linked to the ICF From the Orthopaedic Section of the APTA. J Orthop Sports Phys Ther. 2017;47(7):A1-A83.",
   "Qaseem A et al. Nonpharmacologic and Pharmacologic Management of Acute Pain From Non-Low Back, Musculoskeletal Injuries in Adults: A Clinical Guideline From the ACP and AAFP. Ann Intern Med. 2020;173(9):739-748."
  ]
 },
 {
  "id": "bursites",
  "tipo": "condicao",
  "cond": "bursites",
  "nm": "Bursites",
  "sub": "olécrano · pré-patelar · subacromial · trocantérica · bursite séptica",
  "kw": "bursite bursite do cotovelo olecrano bursite do joelho pre patelar joelho de lavadeira subacromial ombro trocanterica quadril anserina inchaco no cotovelo bolsa no cotovelo bursite septica aine ibuprofeno diclofenaco gel topico gelo puncao infiltracao corticoide cefalexina",
  "draft": true,
  "revisado": null,
  "resumo": "Inflamação da bursa por microtrauma repetido, trauma, gota ou infecção. A decisão principal no PS é separar a bursite séptica (superficial, quente, com ferida ou febre: puncionar e cobrir estafilococo) da asséptica (proteção, gelo e AINE tópico ou oral).",
  "secoes": [
   {
    "t": "Quando pensar / diagnóstico",
    "itens": [
     "Superficiais (olécrano, pré-patelar): edema flutuante sobre a proeminência óssea, muitas vezes após apoio repetido ou trauma.",
     "Profundas (subacromial, trocantérica, anserina): dor à palpação ou ao movimento, sem edema visível.",
     "Séptica: quase sempre superficial; calor, eritema, dor intensa, escoriação ou ferida no local; febre falta em boa parte dos casos.",
     "Diferenciais: artrite séptica, gota ou pseudogota, celulite e fratura."
    ]
   },
   {
    "t": "Exame físico: o que procurar",
    "itens": [
     "Bursite superficial preserva a amplitude articular; dor a toda mobilização passiva sugere artrite.",
     "Procurar porta de entrada, celulite ao redor, linfangite e tofos.",
     "Ombro: arco doloroso e testes do manguito rotador; quadril: dor à palpação do trocânter maior."
    ]
   },
   {
    "t": "Exames complementares",
    "itens": [
     "Asséptica típica: nenhum exame.",
     "Suspeita de infecção: punção da bursa com Gram, cultura, celularidade e pesquisa de cristais, antes do antibiótico.",
     "Trauma ou dor óssea: radiografia; hemograma e PCR se toxemia."
    ]
   },
   {
    "t": "Conduta",
    "itens": [
     "Asséptica: acolchoar e evitar apoio e movimentos repetitivos; gelo nos primeiros dias.",
     "AINE tópico é primeira linha na dor musculoesquelética aguda e a melhor escolha no idoso (ACP/AAFP 2020); AINE oral por 7–10 dias se preciso.",
     "Não puncionar de rotina a bursite por microtrauma: risco de infecção iatrogênica e fístula.",
     "Infiltração com corticoide: só na asséptica profunda (subacromial, trocantérica) e após excluir infecção; evitar no olécrano.",
     "Séptica leve em imunocompetente: punção, antibiótico oral antiestafilocócico (cefalexina; SMX-TMP se risco de MRSA) e reavaliação em 48 h.",
     "Séptica com toxemia, celulite extensa, imunossupressão ou falha do antibiótico oral: internar para antibiótico EV e avaliação ortopédica."
    ]
   },
   {
    "t": "Sinais de alarme e quando internar/encaminhar",
    "itens": [
     "Febre, eritema que se espalha, linfangite ou saída de pus: bursite séptica.",
     "Dor a toda mobilização passiva ou derrame articular: artrite séptica — punção articular urgente.",
     "Diabetes, imunossupressão, etilismo ou piora com antibiótico oral: internar.",
     "Sem melhora em 2–4 semanas: ortopedia ou reumatologia."
    ],
    "alerta": true
   },
   {
    "t": "Orientações ao paciente",
    "itens": [
     "Evite apoiar o cotovelo ou ajoelhar sobre a região; use proteção acolchoada.",
     "Gelo envolto em pano por 15 a 20 minutos, 3 a 4 vezes ao dia, nos primeiros dias.",
     "Passe o gel anti-inflamatório em camada fina, massageando de leve, 3 a 4 vezes ao dia.",
     "Volte se aparecer febre, vermelhidão que aumenta, pus ou piora da dor e do inchaço."
    ]
   }
  ],
  "pendencias": [
   "Padrão não tem antibiótico para bursite séptica (só a orientação) — incluir cefalexina e SMX-TMP em Outras opções?",
   "Outras opções com carisoprodol, orfenadrina e cafeína: sem evidência específica na bursite; carisoprodol teve suspensão recomendada pela EMA em 2007.",
   "Opção 8: cetorolaco sublingual 10 mg 8/8h por 3 dias com ciclobenzaprina — cetorolaco tem maior risco digestivo; conferir dose e duração na bula.",
   "Material do Drive (Plantão Rápido) não traz punção nem antibiótico; a parte de bursite séptica foi escrita a partir de revisão (AAFP 2017), não de diretriz formal."
  ],
  "fontes": [
   "Khodaee M. Common Superficial Bursitis. Am Fam Physician. 2017;95(4):224-231.",
   "Qaseem A et al. Nonpharmacologic and Pharmacologic Management of Acute Pain From Non-Low Back, Musculoskeletal Injuries in Adults: A Clinical Guideline From the ACP and AAFP. Ann Intern Med. 2020;173(9):739-748."
  ]
 },
 {
  "id": "gota",
  "tipo": "condicao",
  "cond": "gota",
  "nm": "Gota — crise",
  "sub": "monoartrite · colchicina · AINE · prednisona · alopurinol",
  "kw": "gota crise de gota artrite gotosa podagra acido urico hiperuricemia dedao inchado dor no dedao do pe monoartrite colchicina naproxeno indometacina diclofenaco prednisona corticoide alopurinol febuxostate tofo cristais de urato",
  "draft": true,
  "revisado": null,
  "resumo": "Monoartrite aguda muito dolorosa, de instalação em horas (a podagra é a clássica). Tratar cedo com colchicina em baixa dose, AINE ou corticoide oral, conforme as contraindicações, e pensar sempre em artrite séptica se houver febre ou dúvida.",
  "secoes": [
   {
    "t": "Quando pensar / diagnóstico",
    "itens": [
     "Dor, edema, calor e eritema intensos, pico em 12–24 h, na 1ª metatarsofalângica, tornozelo, joelho ou dorso do pé.",
     "Fatores: homem, pós-menopausa, álcool (cerveja), carne e frutos do mar, bebidas açucaradas, diuréticos, doença renal, obesidade.",
     "Crises prévias semelhantes, tofos ou cálculo renal reforçam o diagnóstico.",
     "Ácido úrico normal na crise não exclui gota; o padrão-ouro é o cristal no líquido sinovial."
    ]
   },
   {
    "t": "Exame físico: o que procurar",
    "itens": [
     "Articulação quente, vermelha e muito dolorosa ao toque; descamação da pele depois da crise.",
     "Procurar tofos (orelha, cotovelo, dedos), febre e porta de entrada na pele.",
     "Várias articulações ou sinais sistêmicos: considerar artrite séptica e outras artrites."
    ]
   },
   {
    "t": "Exames complementares",
    "itens": [
     "Crise típica sem febre em quem já teve gota: pode tratar clinicamente; idealmente puncionar (cristais, Gram e cultura).",
     "Febre, imunossupressão, prótese articular ou dúvida: punção articular obrigatória antes de antibiótico.",
     "Creatinina para escolher o fármaco; ácido úrico de controle 2–4 semanas após a crise."
    ]
   },
   {
    "t": "Conduta",
    "itens": [
     "Começar o mais cedo possível; colchicina, AINE e corticoide têm eficácia parecida — escolher pelas contraindicações.",
     "Colchicina em baixa dose (1 mg + 0,5 mg após 1 h, depois 0,5 mg 1–2 vezes ao dia), de preferência nas primeiras 12–36 h.",
     "Colchicina: reduzir ou evitar na doença renal e com claritromicina, azóis, ritonavir, ciclosporina, verapamil ou diltiazem.",
     "AINE em dose plena por 5–7 dias, se sem doença renal, úlcera, insuficiência cardíaca ou anticoagulação.",
     "Prednisona 30–35 mg/dia por 5 dias: boa opção no doente renal, no idoso e com contraindicação a AINE ou colchicina.",
     "Gelo, repouso e membro elevado.",
     "Não suspender o alopurinol na crise; começar alopurinol durante a crise é aceitável quando indicado (ACR 2020).",
     "Alopurinol se ≥ 2 crises/ano, tofo ou dano radiológico: iniciar até 100 mg/dia, meta de ácido úrico < 6 mg/dL e profilaxia por 3–6 meses."
    ]
   },
   {
    "t": "Sinais de alarme e quando internar/encaminhar",
    "itens": [
     "Febre, calafrios, toxemia ou articulação com prótese: artrite séptica até prova em contrário.",
     "Diarreia intensa, vômitos ou fraqueza muscular em uso de colchicina: toxicidade — suspender.",
     "Poliartrite, falha do tratamento em 48–72 h ou doença renal avançada: reavaliar e discutir com reumatologia."
    ],
    "alerta": true
   },
   {
    "t": "Orientações ao paciente",
    "itens": [
     "Comece o remédio logo: quanto antes, melhor o efeito.",
     "Gelo envolto em pano por 15 a 20 minutos várias vezes ao dia e repouso com o pé elevado.",
     "Se tiver diarreia com a colchicina, pare de tomar e avise o médico.",
     "Evite cerveja, destilados, refrigerantes e sucos adoçados e excesso de carne vermelha, vísceras e frutos do mar; beba bastante água.",
     "Se já usa alopurinol, não pare durante a crise; marque consulta na UBS para dosar o ácido úrico."
    ]
   },
   {
    "t": "Outras opções (material do médico)",
    "itens": [
     "Indometacina 50 mg 8/8 h por 5 dias (Condutas, Tigers) — AINE alternativo; mais efeitos no sistema nervoso e digestivos, evitar em idosos.",
     "Diclofenaco 75 mg IM em dose única no PS (Condutas, Tigers) — alívio inicial; depois tratamento oral, sem outro AINE nas 12 h seguintes."
    ],
    "offlabel": true
   }
  ],
  "pendencias": [
   "Opção 1 (Outras opções): colchicina 0,5 mg 8/8h por 3 meses (1,5 mg/dia) — acima da profilaxia usual de 0,5–1 mg/dia e só faz sentido junto com alopurinol; revisar.",
   "Opção 2 (Outras opções): prednisona 60 mg/dia por 7 dias com desmame até o 14º dia — mais que os 30–35 mg por 5 dias das diretrizes; revisar.",
   "Condutas e Tigers usam colchicina 0,5 mg de 2/2h até 16 comprimidos — esquema de alta dose, tóxico e abandonado; não aproveitado.",
   "Condutas e Tigers associam tramadol IM e dipirona + adifenina + prometazina na crise — não são primeira linha; não propostos.",
   "Gota não tem modo Internação; o diclofenaco IM foi proposto como Internação (tratamento no PS) — confirmar o modo.",
   "Não há bloco para iniciar alopurinol (só orientação de UBS) — decidir se entra, com profilaxia de colchicina 0,5 mg 1–2 vezes ao dia."
  ],
  "fontes": [
   "FitzGerald JD et al. 2020 American College of Rheumatology Guideline for the Management of Gout. Arthritis Care Res (Hoboken). 2020;72(6):744-760.",
   "Richette P et al. 2016 updated EULAR evidence-based recommendations for the management of gout. Ann Rheum Dis. 2017;76(1):29-42."
  ]
 },
 {
  "id": "odontalgia",
  "tipo": "condicao",
  "cond": "odontalgia",
  "nm": "Odontalgia / abscesso dentário",
  "sub": "dor de dente · pulpite · abscesso · AINE · dentista",
  "kw": "odontalgia dor de dente dente doendo dente inflamado carie pulpite abscesso dentario abscesso dental periapical gengiva inchada rosto inchado face inchada dentista angina de ludwig trismo ibuprofeno naproxeno dipirona paracetamol amoxicilina clindamicina azitromicina cefalexina profilaxia de endocardite",
  "draft": true,
  "revisado": null,
  "resumo": "Dor de dente se trata com AINE (com ou sem paracetamol ou dipirona) e encaminhamento ao dentista: o tratamento definitivo é feito no dente. Antibiótico só para abscesso — com sinais sistêmicos, que se espalha ou sem dentista disponível logo; o PS precisa reconhecer a infecção cervical profunda.",
  "secoes": [
   {
    "t": "Quando pensar / diagnóstico",
    "itens": [
     "Pulpite: dor provocada por frio ou doce que vira espontânea, pulsátil e noturna; dente com cárie ou restauração grande.",
     "Periodontite apical ou abscesso: dor ao mastigar e à percussão do dente, edema gengival, às vezes fístula com pus.",
     "Sinais sistêmicos: febre, mal-estar, linfonodos aumentados, edema facial que progride.",
     "Diferenciais: sinusite maxilar, disfunção temporomandibular, neuralgia do trigêmeo, pericoronarite do siso e dor mandibular de origem cardíaca."
    ]
   },
   {
    "t": "Exame físico: o que procurar",
    "itens": [
     "Localizar o dente (percussão, palpação gengival), flutuação e fístula.",
     "Abertura da boca (trismo), assoalho da boca, posição da língua, voz e capacidade de engolir a saliva.",
     "Edema facial: extensão, cruzamento da linha média, região submandibular e pescoço; temperatura, FC e PA."
    ]
   },
   {
    "t": "Exames complementares",
    "itens": [
     "Dor dentária sem complicação: nenhum exame.",
     "Suspeita de infecção de espaço profundo (trismo, disfagia, edema do assoalho ou do pescoço): tomografia com contraste e hemograma."
    ]
   },
   {
    "t": "Conduta",
    "itens": [
     "AINE é a primeira escolha (ibuprofeno ou naproxeno), com ou sem paracetamol ou dipirona; opioide só se insuficiente ou AINE contraindicado (ADA 2024).",
     "Pulpite e periodontite apical sem abscesso: sem antibiótico — analgesia e dentista.",
     "Abscesso localizado sem sinais sistêmicos: o tratamento é no dente; sem dentista disponível logo, amoxicilina e encaminhamento urgente (ADA 2019).",
     "Abscesso com sinais sistêmicos ou edema que se espalha: amoxicilina por 3–7 dias, reavaliar em 3 dias e parar 24 h após a resolução.",
     "Alergia à penicilina sem anafilaxia: cefalexina; com anafilaxia: azitromicina ou clindamicina (mais risco de colite por C. difficile).",
     "Criança: AINE, paracetamol ou dipirona pelo peso; codeína e tramadol são contraindicados abaixo de 12 anos.",
     "Profilaxia de endocardite é só para cardiopatia de alto risco antes de procedimento dentário invasivo — não trata a dor."
    ]
   },
   {
    "t": "Sinais de alarme e quando internar/encaminhar",
    "itens": [
     "Trismo, disfagia, saliva escorrendo, voz abafada, língua elevada ou edema do assoalho da boca: angina de Ludwig — via aérea, antibiótico EV e cirurgia.",
     "Edema que cruza a linha média ou atinge pescoço ou órbita: infecção profunda — internar.",
     "Febre alta, toxemia, diabetes descompensado ou imunossupressão: antibiótico EV.",
     "Dor na mandíbula aos esforços ou com sudorese, sem dente doente: pensar em síndrome coronariana."
    ],
    "alerta": true
   },
   {
    "t": "Orientações ao paciente",
    "itens": [
     "O remédio alivia, mas não resolve: procure o dentista da unidade de saúde o quanto antes.",
     "Tome o anti-inflamatório após as refeições e só pelos dias receitados.",
     "Antibiótico não cura dor de dente sem infecção espalhada; use só se foi receitado.",
     "Volte imediatamente se o inchaço aumentar ou se tiver dificuldade para abrir a boca, engolir ou respirar, ou febre alta."
    ]
   },
   {
    "t": "Outras opções (material do médico)",
    "itens": [
     "Profilaxia de endocardite: amoxicilina 2 g VO 30–60 min antes de procedimento odontológico invasivo em cardiopatia de alto risco (guia HC-FMUSP 2024); alérgico: azitromicina."
    ],
    "offlabel": true
   }
  ],
  "pendencias": [
   "ADA 2019 indica antibiótico também no abscesso localizado sem sinais sistêmicos quando não há dentista disponível de imediato; o Padrão só cita edema facial, febre ou mal-estar — decidir.",
   "Padrão: amoxicilina 500 mg 8/8h e clindamicina 300 mg 6/6h por 7 dias; ADA 2019 usa 3–7 dias com reavaliação em 3 dias — encurtar?",
   "Clindamicina é a única alternativa do Padrão; ADA 2019 prefere cefalexina se a alergia não for anafilaxia e aceita azitromicina — acrescentar?",
   "HC-FMUSP 2024 cita cefazolina 2 g EV e azitromicina 12 mg/kg na criança; AHA 2021 usa 1 g IM/EV e 15 mg/kg — conferir antes de usar.",
   "Profilaxia de endocardite é rara no PS (o dentista costuma prescrever); proposta só como Outras opções."
  ],
  "fontes": [
   "Lockhart PB et al. Evidence-based clinical practice guideline on antibiotic use for the urgent management of pulpal- and periapical-related dental pain and intraoral swelling. J Am Dent Assoc. 2019;150(11):906-921.",
   "Carrasco-Labra A et al. Evidence-based clinical practice guideline for the pharmacologic management of acute dental pain in adolescents, adults, and older adults. J Am Dent Assoc. 2024;155(2):102-117.",
   "Wilson WR et al. Prevention of Viridans Group Streptococcal Infective Endocarditis: A Scientific Statement From the American Heart Association. Circulation. 2021;143(20):e963-e978.",
   "Hospital das Clínicas da FMUSP. Antimicrobianos na prática clínica: um guia para profissionais da atenção primária. 1ª ed. São Paulo; 2024."
  ]
 },
 {
  "id": "aftas",
  "tipo": "condicao",
  "cond": "aftas",
  "nm": "Aftas orais (estomatite)",
  "sub": "afta · úlcera oral · triancinolona orobase · clorexidina · benzidamina",
  "kw": "afta aftas estomatite aftosa ulcera na boca ferida na boca machucado na lingua ferida na gengiva estomatite triancinolona orobase clorexidina benzidamina anestesico topico behcet doenca celiaca herpes labial gengivoestomatite herpetica herpangina mao pe boca",
  "draft": true,
  "revisado": null,
  "resumo": "Úlceras rasas, dolorosas, redondas, com halo vermelho, em mucosa não queratinizada, que cicatrizam sozinhas em 1–2 semanas. O tratamento é sintomático (corticoide tópico, bochecho antisséptico ou anestésico); o essencial é reconhecer o que não é afta: úlcera que não cicatriza, herpes e doença sistêmica.",
  "secoes": [
   {
    "t": "Quando pensar / diagnóstico",
    "itens": [
     "Afta menor: menos de 1 cm, poucas lesões, em lábio, bochecha ou ventre da língua; cicatriza em 7–14 dias sem cicatriz.",
     "Afta maior (mais de 1 cm, profunda, dura semanas) ou herpetiforme (dezenas de lesões pequenas): investigar e considerar especialista.",
     "Herpes: vesículas agrupadas que se rompem, em gengiva e palato duro; febre na primoinfecção.",
     "Criança: gengivoestomatite herpética (febre, gengiva sangrante), herpangina e mão-pé-boca (palato mole, mãos e pés).",
     "Crises frequentes: falta de ferro, B12 ou folato, doença celíaca, doença inflamatória intestinal, HIV, Behçet, neutropenia cíclica e medicamentos."
    ]
   },
   {
    "t": "Exame físico: o que procurar",
    "itens": [
     "Número, tamanho, bordas e local das úlceras; endurecimento à palpação sugere neoplasia.",
     "Úlceras genitais, olho vermelho doloroso ou lesões de pele: pensar em Behçet ou Stevens-Johnson.",
     "Hidratação e aceitação de líquidos, sobretudo na criança."
    ]
   },
   {
    "t": "Exames complementares",
    "itens": [
     "Episódio isolado típico: nenhum exame.",
     "Crises frequentes: hemograma, ferritina, B12, folato, anticorpos para doença celíaca e anti-HIV.",
     "Úlcera que não cicatriza em 3 semanas: encaminhar para biópsia (excluir câncer de boca)."
    ]
   },
   {
    "t": "Conduta",
    "itens": [
     "Corticoide tópico (triancinolona orobase) na lesão seca, até 4 vezes ao dia: reduz dor e duração.",
     "Clorexidina 0,12% em bochecho reduz a duração; usar longe da escovação, porque o creme dental a inativa.",
     "Dor: benzidamina em bochecho ou anestésico tópico antes das refeições; analgésico oral se preciso.",
     "Herpes oral no início: antiviral (aciclovir); não usar corticoide tópico.",
     "Nistatina não trata afta (é para candidíase).",
     "Formas maiores ou recorrências graves: encaminhar a estomatologia ou dermatologia (pode exigir tratamento sistêmico)."
    ]
   },
   {
    "t": "Sinais de alarme e quando internar/encaminhar",
    "itens": [
     "Úlcera há mais de 3 semanas, endurecida ou indolor, sobretudo em fumante ou etilista: suspeita de câncer — encaminhamento rápido.",
     "Lesões na boca com olho vermelho, feridas genitais ou de pele, ou descolamento de mucosa: Stevens-Johnson ou Behçet — avaliação urgente.",
     "Criança que não aceita líquidos ou tem sinais de desidratação: hidratação venosa.",
     "Febre persistente, perda de peso ou diarreia crônica junto: investigar doença sistêmica."
    ],
    "alerta": true
   },
   {
    "t": "Orientações ao paciente",
    "itens": [
     "A afta melhora sozinha em 1 a 2 semanas; o remédio alivia a dor e ajuda a fechar mais rápido.",
     "Seque a ferida com gaze, aplique a pomada sem esfregar e não coma nem beba por 30 minutos.",
     "Evite comida ácida, apimentada, salgada ou dura; use escova macia e creme dental sem lauril sulfato de sódio.",
     "Faça o bochecho de clorexidina pelo menos 30 minutos depois de escovar os dentes; ele pode manchar os dentes por um tempo.",
     "Volte se a ferida não fechar em 2 semanas, se for maior que 1 cm, ou se tiver febre ou feridas nos olhos ou genitais."
    ]
   },
   {
    "t": "Outras opções (material do médico)",
    "itens": [
     "Suspensão bucal de bismuto + procaína + neomicina, 1–2 gotas na lesão 3–6 vezes ao dia (Condutas, Tigers) — alívio pela procaína; antibiótico sem papel."
    ],
    "offlabel": true
   }
  ],
  "pendencias": [
   "Condutas e Tigers indicam nistatina em bochecho para afta — sem indicação (só candidíase); não aproveitado.",
   "Guia pediátrico do Drive (Medicações Pediatria 2) prescreve azitromicina na estomatite — sem indicação (causa viral); não aproveitado.",
   "Opção 1 (triancinolona tópica sem concentração) e Opção 2 (nome comercial) duplicam o Padrão — padronizar ou remover?",
   "A suspensão com bismuto/procaína/neomicina foi proposta só pelo anestésico; lidocaína gel seria alternativa sem antibiótico — decidir.",
   "A condição não tem bloco pediátrico; doses de triancinolona e benzidamina em criança não estão no DATA."
  ],
  "fontes": [
   "Tarakji B et al. Guideline for the diagnosis and treatment of recurrent aphthous stomatitis for dental practitioners. J Int Oral Health. 2015;7(5):74-80.",
   "National Institute for Health and Care Excellence (NICE). Suspected cancer: recognition and referral (NG12). 2015."
  ]
 },
 {
  "id": "ceratite",
  "tipo": "condicao",
  "cond": "ceratite",
  "nm": "Ceratite fotoelétrica",
  "sub": "olho de soldador · luz ultravioleta · fotoceratite · lubrificante · pomada",
  "kw": "ceratite fotoeletrica ceratoconjuntivite actinica fotoceratite olho de soldador solda queimadura por solda luz ultravioleta uv lampada germicida bronzeamento artificial neve olho ardendo areia nos olhos fotofobia lacrimejamento carmelose lagrima artificial pomada oftalmica retinol cloranfenicol dipirona",
  "draft": true,
  "revisado": null,
  "resumo": "Lesão do epitélio da córnea por radiação ultravioleta (solda sem proteção, lâmpada germicida, bronzeamento, reflexo na neve): dor intensa, fotofobia e lacrimejamento nos dois olhos, 6–12 h após a exposição. Melhora em 24–72 h com lubrificação, pomada e analgesia oral; nunca colírio anestésico para casa.",
  "secoes": [
   {
    "t": "Quando pensar / diagnóstico",
    "itens": [
     "Exposição a solda (inclusive o ajudante), lâmpada UV ou sol refletido; sintomas começam horas depois, muitas vezes à noite.",
     "Dor intensa, sensação de areia, fotofobia, lacrimejamento e blefaroespasmo, em geral nos dois olhos.",
     "Diferenciais: corpo estranho (um olho, trabalho com esmeril), queimadura química, conjuntivite e ceratite infecciosa em usuário de lente."
    ]
   },
   {
    "t": "Exame físico: o que procurar",
    "itens": [
     "Acuidade visual de cada olho, anotada.",
     "Colírio anestésico só para examinar: o alívio imediato confirma a origem na córnea.",
     "Fluoresceína com luz azul: pontos corados difusos na fenda palpebral.",
     "Everter a pálpebra superior para excluir corpo estranho; pupila e câmara anterior normais."
    ]
   },
   {
    "t": "Exames complementares",
    "itens": [
     "Diagnóstico clínico; não precisa de exame complementar."
    ]
   },
   {
    "t": "Conduta",
    "itens": [
     "Lágrima artificial frequente e pomada oftálmica lubrificante ou antibiótica, de 6/6 h ou à noite.",
     "Antibiótico tópico previne infecção do epitélio lesado — prática corrente, com evidência fraca.",
     "Analgesia oral (dipirona, paracetamol ou AINE), compressas frias e óculos escuros.",
     "Não prescrever colírio anestésico nem corticoide; não ocluir o olho.",
     "Suspender lente de contato até a cura completa.",
     "Melhora esperada em 24–48 h; sem melhora em 48 h ou com baixa visual: oftalmologista."
    ]
   },
   {
    "t": "Sinais de alarme e quando internar/encaminhar",
    "itens": [
     "Baixa visual que não melhora, mancha branca na córnea ou secreção purulenta: ceratite infecciosa.",
     "Usuário de lente de contato com olho vermelho e doloroso: tratar como ceratite infecciosa e encaminhar.",
     "Exposição química junto: irrigação abundante imediata e oftalmologia.",
     "Dor que piora depois de 48 h: reavaliar."
    ],
    "alerta": true
   },
   {
    "t": "Orientações ao paciente",
    "itens": [
     "A dor costuma melhorar em 1 a 2 dias e o olho volta ao normal, sem sequela.",
     "Pingue a lágrima artificial e use a pomada nos horários; compressa fria e óculos escuros aliviam.",
     "Não coce, não tampe o olho e não use colírio anestésico em casa: ele atrasa a cicatrização.",
     "Não use lente de contato até melhorar totalmente.",
     "Use sempre máscara de solda com filtro adequado, inclusive quem ajuda perto da solda.",
     "Volte se a visão piorar, a dor aumentar, aparecer secreção amarelada ou mancha branca no olho."
    ]
   },
   {
    "t": "Outras opções (material do médico)",
    "itens": [
     "Cetorolaco 0,5% colírio de 6/6 h por 2–3 dias (PA pdf) — reduz a necessidade de analgésico oral; uso curto, evidência de baixa certeza."
    ],
    "offlabel": true
   }
  ],
  "pendencias": [
   "ACEP 2024 (consenso) considera seguro colírio anestésico por até 24 h na abrasão simples (não em criança); oftalmologistas discordam e o DATA proíbe — manter a proibição?",
   "Itens com nome comercial no Padrão e em Outras opções (pomada de retinol + aminoácidos + cloranfenicol; lubrificante) — padronizar pelo princípio ativo.",
   "Outras opções 'Receita' repete o Padrão com outra posologia (pomada 2 vezes ao dia, colírio 6 vezes ao dia) — decidir qual fica.",
   "Tigers e Condutas indicam colírio anestésico de 4/4h por 3 dias e tampão no trauma ocular — contraindicados; não aproveitados.",
   "Duração da pomada (5 dias) e do lubrificante (7 dias) maior que a evolução usual (24–72 h) — encurtar?"
  ],
  "fontes": [
   "College of Optometrists (UK). Clinical Management Guidelines: Photokeratitis (UV burn, arc eye, snow blindness). Versão 15. 2025.",
   "Wipperman JL, Dorsch JN. Evaluation and Management of Corneal Abrasions. Am Fam Physician. 2013;87(2):114-120.",
   "American College of Emergency Physicians (Green et al.). Use of Topical Anesthetics in the Management of Patients With Simple Corneal Abrasions: consensus guideline. Ann Emerg Med. 2024;83(5):477-489.",
   "Wakai A et al. Topical non-steroidal anti-inflammatory drugs for analgesia in traumatic corneal abrasions. Cochrane Database Syst Rev. 2017;(5):CD009781."
  ]
 },
 {
  "id": "conjuntivite",
  "tipo": "condicao",
  "cond": "conjuntivite",
  "nm": "Conjuntivite",
  "sub": "olho vermelho · viral · bacteriana · alérgica · gonocócica",
  "kw": "conjuntivite olho vermelho olho grudando remela secrecao no olho coceira no olho conjuntivite viral adenovirus bacteriana alergica gonococica clamidia oftalmia neonatal tracoma lente de contato tobramicina ofloxacino ciprofloxacino olopatadina epinastina soro fisiologico carmelose ceftriaxona azitromicina doxiciclina",
  "draft": true,
  "revisado": null,
  "resumo": "A maioria é viral e autolimitada (1–3 semanas): higiene, compressas frias e lubrificante, sem antibiótico. Colírio antibiótico se secreção purulenta; antialérgico se coceira bilateral. Secreção hiperaguda, recém-nascido, lente de contato, dor intensa, fotofobia ou baixa visual mudam a conduta.",
  "secoes": [
   {
    "t": "Quando pensar / diagnóstico",
    "itens": [
     "Viral: secreção aquosa, sensação de areia, começa num olho e passa ao outro; linfonodo pré-auricular, resfriado ou contato doente.",
     "Bacteriana: secreção purulenta e pálpebras coladas ao acordar; na criança, pode vir com otite.",
     "Alérgica: coceira intensa, bilateral, edema palpebral, rinite ou atopia associada.",
     "Hiperaguda: secreção purulenta abundante que volta logo após limpar, edema intenso — gonococo.",
     "Recém-nascido: nos primeiros 2–5 dias pensar em gonococo; entre 5 e 14 dias, em clamídia."
    ]
   },
   {
    "t": "Exame físico: o que procurar",
    "itens": [
     "Acuidade visual sempre: baixa visual não é conjuntivite simples.",
     "Hiperemia difusa (conjuntivite) × concentrada ao redor da córnea com dor e fotofobia (ceratite, uveíte, glaucoma agudo).",
     "Pupila, córnea com fluoresceína (úlcera, dendrito), pálpebras e linfonodo pré-auricular.",
     "Lente de contato, vesículas na pálpebra ou na ponta do nariz (herpes) e sinais de celulite orbitária."
    ]
   },
   {
    "t": "Exames complementares",
    "itens": [
     "Casos típicos: nenhum exame.",
     "Hiperaguda ou neonatal: secreção para Gram, cultura e PCR para gonococo e clamídia antes do antibiótico, sem atrasar o tratamento."
    ]
   },
   {
    "t": "Conduta",
    "itens": [
     "Viral: soro gelado, compressas frias e lubrificante; antibiótico não ajuda.",
     "Bacteriana: colírio antibiótico encurta a doença (Cochrane 2023) e nenhum é superior — tobramicina de 6/6 h por 5–7 dias.",
     "Usuário de lente de contato: suspender a lente e usar fluoroquinolona (cobre Pseudomonas); com dor ou baixa visual, oftalmologista.",
     "Alérgica: anti-histamínico/estabilizador de mastócito tópico (olopatadina), compressas frias, afastar o alérgeno.",
     "Não prescrever colírio com corticoide sem exame em lâmpada de fenda.",
     "Gonocócica no adulto: ceftriaxona 1 g IM em dose única + cobertura para clamídia, irrigação e oftalmologia urgente; tratar parcerias.",
     "Criança: conjuntivite com otite trata-se com antibiótico oral; recém-nascido com secreção purulenta precisa de avaliação urgente e tratamento sistêmico."
    ]
   },
   {
    "t": "Sinais de alarme e quando internar/encaminhar",
    "itens": [
     "Dor ocular intensa, fotofobia, baixa visual, halos ou pupila alterada: ceratite, uveíte ou glaucoma agudo — oftalmologia urgente.",
     "Secreção purulenta hiperaguda: gonococo, com risco de perfuração da córnea.",
     "Edema e vermelhidão ao redor do olho com febre, dor ao mover o olho ou olho saltado: celulite orbitária.",
     "Recém-nascido com secreção purulenta: avaliação no mesmo dia.",
     "Sem melhora em 7–10 dias, ou em 48–72 h com antibiótico: reavaliar."
    ],
    "alerta": true
   },
   {
    "t": "Orientações ao paciente",
    "itens": [
     "A conjuntivite viral é contagiosa e melhora sozinha em 1 a 3 semanas, sem antibiótico.",
     "Lave as mãos com frequência, não coce os olhos e não divida toalhas, fronhas e maquiagem.",
     "Lave os olhos com soro gelado e faça compressas frias; limpe a secreção com gaze, de dentro para fora.",
     "Não use lente de contato até sarar e não use colírio com corticoide sem oftalmologista.",
     "Procure atendimento já se tiver dor forte, piora da visão ou muita sensibilidade à luz."
    ]
   },
   {
    "t": "Outras opções (material do médico)",
    "itens": [
     "Ofloxacino 0,3% ou ciprofloxacino colírio de 6/6 h por 7 dias (Condutas, Tigers) — para usuário de lente de contato; nunca a versão com dexametasona.",
     "Epinastina 0,05% colírio de 12/12 h (PA pdf) — alternativa à olopatadina na conjuntivite alérgica, a partir de 3 anos."
    ],
    "offlabel": true
   }
  ],
  "pendencias": [
   "Condutas e Tigers citam ciprofloxacino + dexametasona, e o PA pdf tobramicina + dexametasona — corticoide sem lâmpada de fenda; não aproveitados.",
   "DATA orienta volta à creche após 24 h de colírio; a AAP não exige afastamento na conjuntivite sem febre — seguir a regra local?",
   "Cobertura de clamídia: o DATA usa azitromicina 1 g (PCDT-IST); o CDC 2021 prefere doxiciclina por 7 dias — decidir o padrão.",
   "O bloco de ceftriaxona IM em dose única está no modo Internação; pela regra do site (dose IM única e alta) seria Ambulatorial — confirmar.",
   "Condutas e Tigers mandam ao oftalmologista se a viral não melhorar em 4 dias; o DATA usa 7–10 dias — alinhar.",
   "Azelastina colírio, citada no PA pdf, não teve disponibilidade no Brasil confirmada — não proposta."
  ],
  "fontes": [
   "American Academy of Ophthalmology (Cornea/External Disease Panel). Conjunctivitis Preferred Practice Pattern. Ophthalmology. 2024;131(4):P134-P204.",
   "Chen YY et al. Antibiotics versus placebo for acute bacterial conjunctivitis. Cochrane Database Syst Rev. 2023;(3):CD001211.",
   "Workowski KA et al. Sexually Transmitted Infections Treatment Guidelines, 2021. MMWR Recomm Rep. 2021;70(4):1-187.",
   "Brasil. Ministério da Saúde. Protocolo Clínico e Diretrizes Terapêuticas para Atenção Integral às Pessoas com Infecções Sexualmente Transmissíveis (IST). Brasília; 2022."
  ]
 },
 {
  "id": "hordeolo",
  "tipo": "condicao",
  "cond": "hordeolo",
  "nm": "Hordéolo / Blefarite",
  "sub": "terçol · calázio · blefarite · compressas mornas · celulite pré-septal",
  "kw": "hordeolo tercol tersol calazio blefarite palpebra inchada caroco na palpebra olho inchado borda da palpebra vermelha crostas nos cilios compressa morna higiene palpebral xampu infantil tobramicina pomada celulite periorbitaria pre septal orbitaria",
  "draft": true,
  "revisado": null,
  "resumo": "Hordéolo é a infecção aguda e dolorosa de uma glândula da pálpebra; calázio, um nódulo crônico indolor; blefarite, a inflamação crônica da borda palpebral. A base do tratamento é compressa morna e higiene palpebral; a decisão crítica é separar celulite pré-septal de orbitária.",
  "secoes": [
   {
    "t": "Quando pensar / diagnóstico",
    "itens": [
     "Hordéolo externo: nódulo doloroso e vermelho na borda, com ponto de pus na base de um cílio.",
     "Hordéolo interno: nódulo doloroso mais profundo, que aponta para a face interna da pálpebra.",
     "Calázio: nódulo firme e indolor, de semanas, no meio da pálpebra.",
     "Blefarite: ardor, coceira, crostas nos cílios e borda vermelha, crônica e recorrente; associada a rosácea e dermatite seborreica.",
     "Celulite pré-septal: edema e vermelhidão de toda a pálpebra, com movimentos oculares e visão normais."
    ]
   },
   {
    "t": "Exame físico: o que procurar",
    "itens": [
     "Acuidade visual e movimentação ocular: dor, limitação ou visão dupla sugerem celulite orbitária.",
     "Olho saltado, edema da conjuntiva e febre: celulite orbitária.",
     "Everter a pálpebra para ver o hordéolo interno; observar crostas e glândulas obstruídas na borda."
    ]
   },
   {
    "t": "Exames complementares",
    "itens": [
     "Hordéolo, calázio e blefarite: diagnóstico clínico.",
     "Suspeita de celulite orbitária: tomografia de órbitas com contraste e hemograma.",
     "Calázio que volta no mesmo lugar em adulto: biópsia (carcinoma sebáceo)."
    ]
   },
   {
    "t": "Conduta",
    "itens": [
     "Compressas mornas 10–15 min, 3–4 vezes ao dia, com massagem suave; a maioria drena sozinha em 1–2 semanas.",
     "Não espremer; suspender maquiagem e lente de contato até resolver.",
     "Antibiótico tópico não tem benefício comprovado no hordéolo (Cochrane 2017); reservar para blefarite com crostas ou lesão drenando.",
     "Blefarite: higiene diária da borda com xampu infantil diluído, mantida mesmo após melhorar; antibiótico tópico se não responder.",
     "Celulite pré-septal leve: antibiótico oral antiestafilocócico e reavaliação em 24–48 h.",
     "Calázio que persiste por mais de 4 semanas ou hordéolo grande que não drena: oftalmologista para drenagem."
    ]
   },
   {
    "t": "Sinais de alarme e quando internar/encaminhar",
    "itens": [
     "Dor ao mover o olho, olho saltado, visão dupla, baixa visual ou febre alta: celulite orbitária — internar, antibiótico EV e tomografia.",
     "Edema que se espalha para toda a pálpebra ou face: celulite pré-septal — tratar e reavaliar em 24–48 h.",
     "Criança pequena com edema ao redor do olho e febre: avaliação no mesmo dia.",
     "Lesão que volta no mesmo local, perda de cílios ou ferida na borda: excluir tumor."
    ],
    "alerta": true
   },
   {
    "t": "Orientações ao paciente",
    "itens": [
     "Faça compressas mornas (não quentes) por 10 a 15 minutos, 3 a 4 vezes ao dia, com massagem suave.",
     "Não esprema o terçol; ele costuma drenar sozinho.",
     "Limpe a borda das pálpebras com xampu infantil diluído em água morna, duas vezes ao dia.",
     "Evite maquiagem e lente de contato até sarar.",
     "Volte se o inchaço se espalhar, se tiver febre, dor ao mexer o olho ou piora da visão."
    ]
   }
  ],
  "pendencias": [
   "Padrão inclui tobramicina pomada no hordéolo; a Cochrane 2017 não achou evidência a favor de antibiótico tópico — deixar como opcional?",
   "Outras opções: ciprofloxacino + dexametasona pomada 3 vezes ao dia por 15 dias — corticoide prolongado sem oftalmologista (pressão intraocular, catarata, herpes); revisar ou retirar.",
   "Não há esquema para celulite pré-septal no DATA (o guia pediátrico do Drive trata a celulite periorbitária com internação) — criar bloco oral, por exemplo amoxicilina-clavulanato?",
   "Condutas e Tigers: compressa 15 min de 3/3h; Padrão: 10–15 min 3–4 vezes ao dia — equivalentes; nenhum fármaco novo no Drive."
  ],
  "fontes": [
   "Lindsley K, Nichols JJ, Dickersin K. Non-surgical interventions for acute internal hordeolum. Cochrane Database Syst Rev. 2017;(1):CD007742.",
   "Lin A et al. Blepharitis Preferred Practice Pattern. American Academy of Ophthalmology. Ophthalmology. 2024;131(4).",
   "Carlisle RT, Digiovanni J. Differential Diagnosis of the Swollen Red Eyelid. Am Fam Physician. 2015;92(2):106-112."
  ]
 },
 {
  "id": "corpo_estranho",
  "tipo": "condicao",
  "cond": "corpo_estranho",
  "nm": "Corpo estranho ocular",
  "sub": "cisco no olho · abrasão de córnea · anel de ferrugem · lente de contato",
  "kw": "corpo estranho ocular cisco no olho limalha esmeril ferrugem anel de ferrugem abrasao de cornea arranhao no olho trauma ocular olho perfurado fluoresceina eversao da palpebra ofloxacino tobramicina colirio antibiotico dipirona paracetamol codeina lente de contato",
  "draft": true,
  "revisado": null,
  "resumo": "Corpo estranho na córnea ou sob a pálpebra causa dor, sensação de areia e lacrimejamento. Lavar, everter a pálpebra, corar com fluoresceína e remover o corpo superficial; depois antibiótico tópico e analgesia oral. Nunca deixar passar perfuração ou corpo estranho intraocular.",
  "secoes": [
   {
    "t": "Quando pensar / diagnóstico",
    "itens": [
     "Esmeril, solda, martelo, corte de metal ou madeira, vento e poeira; sintomas imediatos, em geral em um olho.",
     "Martelar metal contra metal ou projétil em alta velocidade: suspeitar de corpo estranho intraocular, mesmo com pouca dor.",
     "Lente de contato aumenta o risco de ceratite infecciosa (Pseudomonas).",
     "Queimadura química é outra urgência: irrigar antes de qualquer exame."
    ]
   },
   {
    "t": "Exame físico: o que procurar",
    "itens": [
     "Acuidade visual de cada olho antes de tudo.",
     "Colírio anestésico só para examinar; everter a pálpebra superior — riscos verticais na córnea indicam corpo estranho embaixo dela.",
     "Fluoresceína: área corada (abrasão) e teste de Seidel (escape de humor aquoso indica perfuração).",
     "Pupila irregular, câmara anterior rasa, sangue na câmara anterior ou saída de conteúdo: perfuração — não pressionar."
    ]
   },
   {
    "t": "Exames complementares",
    "itens": [
     "Corpo estranho superficial removido: nenhum exame.",
     "Suspeita de corpo estranho intraocular: tomografia de órbitas (nunca RM se metal)."
    ]
   },
   {
    "t": "Conduta",
    "itens": [
     "Irrigar com SF; se não sair, remover com cotonete úmido sob anestesia tópica; agulha 25G só com magnificação e experiência.",
     "Anel de ferrugem ou corpo estranho que não sai: oftalmologista em 24–48 h.",
     "Antibiótico tópico após a remoção (prevenção, evidência fraca); usuário de lente: fluoroquinolona e nenhuma oclusão.",
     "Não ocluir o olho: não alivia a dor e atrasa a cicatrização.",
     "Não prescrever colírio anestésico nem colírio com corticoide para casa.",
     "Analgesia oral com dipirona, paracetamol ou AINE; opioide por pouco tempo se a dor for intensa.",
     "Antitetânica não é rotina; atualizar se ferimento penetrante, material contaminado ou queimadura química (AAFP 2013).",
     "Abrasão pequena, visão normal e melhorando: retorno só se piorar; demais casos, reavaliar em 24 h."
    ]
   },
   {
    "t": "Sinais de alarme e quando internar/encaminhar",
    "itens": [
     "Suspeita de perfuração ou corpo estranho intraocular: protetor rígido sem compressão, jejum e oftalmologia de urgência.",
     "Queimadura química: irrigação abundante imediata e oftalmologia.",
     "Baixa visual, sangue na câmara anterior, infiltrado ou úlcera de córnea: oftalmologia urgente.",
     "Abrasão que aumenta em 24 h ou não cicatriza em 3–4 dias: reavaliar."
    ],
    "alerta": true
   },
   {
    "t": "Orientações ao paciente",
    "itens": [
     "Não coce nem esfregue o olho; não é preciso tampar.",
     "Pingue o colírio antibiótico nos horários e lave as mãos antes e depois.",
     "Não use colírio anestésico nem colírio com corticoide: atrasam a cicatrização e aumentam o risco de infecção.",
     "Use óculos de proteção ao esmerilhar, soldar, martelar ou cortar metal e madeira.",
     "Volte já se a dor piorar, a visão baixar, aparecer secreção ou mancha branca no olho."
    ]
   },
   {
    "t": "Outras opções (material do médico)",
    "itens": [
     "Paracetamol + codeína 500/30 mg até 6/6 h por até 3 dias (Tigers, Condutas) — dor intensa que não cede com analgésico comum.",
     "Cetorolaco 0,5% colírio de 6/6 h por 2–3 dias (PA pdf) — dor na abrasão sem complicação; uso curto, evidência de baixa certeza."
    ],
    "offlabel": true
   }
  ],
  "pendencias": [
   "Outras opções: tobramicina + dexametasona colírio por 7 dias — corticoide após abrasão atrasa a cicatrização e favorece infecção (fúngica se material vegetal); a nota 'só sem glaucoma' não basta — retirar?",
   "Tigers e Condutas mandam colírio anestésico de 4/4h por 3 dias e tampão — contraindicados; não aproveitados.",
   "ACEP 2024 aceita anestésico tópico por até 24 h na abrasão simples (não em criança); o DATA proíbe — manter?",
   "Padrão adulto usa ofloxacino para todos; AAFP 2013 reserva a fluoroquinolona para usuário de lente — usar tobramicina como padrão e ofloxacino para lente?"
  ],
  "fontes": [
   "Wipperman JL, Dorsch JN. Evaluation and Management of Corneal Abrasions. Am Fam Physician. 2013;87(2):114-120.",
   "American College of Emergency Physicians (Green et al.). Use of Topical Anesthetics in the Management of Patients With Simple Corneal Abrasions: consensus guideline. Ann Emerg Med. 2024;83(5):477-489.",
   "Wakai A et al. Topical non-steroidal anti-inflammatory drugs for analgesia in traumatic corneal abrasions. Cochrane Database Syst Rev. 2017;(5):CD009781."
  ]
 },
 {
  "id": "calmantes",
  "tipo": "condicao",
  "cond": "calmantes",
  "nm": "Calmantes fitoterápicos",
  "sub": "ansiedade leve · insônia · passiflora · valeriana · higiene do sono",
  "kw": "calmante calmantes fitoterapicos fitoterapico remedio natural passiflora maracuja passiflora incarnata valeriana valeriana officinalis ansiedade nervosismo estresse insonia dificuldade para dormir higiene do sono",
  "draft": true,
  "revisado": null,
  "resumo": "Passiflora e valeriana são fitoterápicos de uso tradicional para ansiedade leve e insônia leve, com evidência fraca de eficácia. Servem para sintomas leves e passageiros, junto com higiene do sono e acompanhamento na UBS; ansiedade ou insônia persistentes pedem diagnóstico e tratamento próprios.",
  "secoes": [
   {
    "t": "Quando pensar / diagnóstico",
    "itens": [
     "Nervosismo, estresse ou dificuldade para dormir leves e recentes, sem prejuízo importante da rotina.",
     "Excluir causa clínica: hipertireoidismo, arritmia, hipoglicemia, abstinência de álcool ou benzodiazepínico, cafeína, estimulantes, corticoide.",
     "Rastrear depressão, ansiedade generalizada, pânico, uso de álcool e risco de suicídio.",
     "Crise com dor no peito, falta de ar ou palpitação: excluir causa orgânica antes de chamar de ansiedade."
    ]
   },
   {
    "t": "Exame físico: o que procurar",
    "itens": [
     "Sinais vitais, tireoide, tremor e sinais de intoxicação ou abstinência.",
     "Estado mental: humor, ideação suicida e sintomas psicóticos."
    ]
   },
   {
    "t": "Exames complementares",
    "itens": [
     "Em geral nenhum; TSH, glicemia ou ECG se a clínica sugerir causa orgânica."
    ]
   },
   {
    "t": "Conduta",
    "itens": [
     "Sintoma leve e recente: higiene do sono, menos cafeína e álcool, atividade física; o fitoterápico é opcional.",
     "Valeriana tem efeito gradual: a monografia da EMA recomenda 2–4 semanas de uso, com a dose 30–60 min antes de deitar.",
     "Passiflora: uso tradicional para estresse leve e sono; procurar o médico se não melhorar em 2 semanas (EMA).",
     "Insônia crônica: terapia cognitivo-comportamental é a primeira linha; a AASM 2017 sugere não usar valeriana.",
     "Não usar abaixo de 12 anos, na gestação nem na amamentação (sem dados de segurança).",
     "Somam efeito com sedativos e álcool: evitar junto de benzodiazepínico, hipnótico ou antidepressivo sedativo.",
     "Transtorno de ansiedade ou depressão: tratamento próprio (psicoterapia, antidepressivo) na UBS ou CAPS; benzodiazepínico só por pouco tempo."
    ]
   },
   {
    "t": "Sinais de alarme e quando internar/encaminhar",
    "itens": [
     "Ideação suicida, plano ou tentativa: avaliação psiquiátrica no mesmo dia, sem liberar sozinho.",
     "Sintomas psicóticos, agitação intensa ou sinais de abstinência: tratar como emergência.",
     "Palpitação, dor torácica ou falta de ar: excluir causa clínica.",
     "Sem melhora em 2–4 semanas: rever o diagnóstico na UBS."
    ],
    "alerta": true
   },
   {
    "t": "Orientações ao paciente",
    "itens": [
     "Este remédio natural é para sintomas leves; o efeito aparece aos poucos, em dias a semanas.",
     "Pode dar sono: não dirija, não opere máquinas e não tome álcool ou outros calmantes junto.",
     "Durma e acorde sempre no mesmo horário, evite café, energético e telas à noite e faça atividade física.",
     "Não use na gravidez, na amamentação ou em menores de 12 anos.",
     "Procure atendimento imediatamente se tiver pensamentos de morte ou de se machucar."
    ]
   }
  ],
  "pendencias": [
   "Valeriana do Padrão: 200 mg à noite; a monografia da EMA (uso bem estabelecido) usa 450–600 mg de extrato seco por dose — conferir a concentração e o extrato do produto dispensado.",
   "Passiflora: as doses do DATA (260–500 mg, 1–2 vezes ao dia, 10–30 dias) variam por produto — confirmar na bula e no Memento Fitoterápico da ANVISA.",
   "Condutas traz diazepam 10 mg VO na crise de ansiedade e zolpidem, flunitrazepam, ciclobenzaprina e amitriptilina na insônia — não cabem em fitoterápicos; criar condição 'Crise de ansiedade / insônia'?",
   "A tabela de psiquiatria do material de terceiros usa linguagem pejorativa e afirma 'zolpidem pouca adicção' — não reproduzir.",
   "AASM 2017 é contra valeriana na insônia crônica; manter o bloco só para insônia leve e passageira?",
   "Outras opções 1 a 4 são variações de passiflora com doses e durações diferentes — consolidar em uma."
  ],
  "fontes": [
   "European Medicines Agency (HMPC). European Union herbal monograph on Valeriana officinalis L., radix (EMA/HMPC/150848/2015). 2016.",
   "European Medicines Agency (HMPC). European Union herbal monograph on Passiflora incarnata L., herba (EMA/HMPC/669740/2013). 2014.",
   "Sateia MJ et al. Clinical Practice Guideline for the Pharmacologic Treatment of Chronic Insomnia in Adults: An American Academy of Sleep Medicine Clinical Practice Guideline. J Clin Sleep Med. 2017;13(2):307-349.",
   "Brasil. ANVISA. Memento Fitoterápico da Farmacopeia Brasileira. 1ª ed. Brasília; 2016."
  ]
 }
];
