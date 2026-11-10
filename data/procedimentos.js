/* data/procedimentos.js — conteúdo da aba Procedimentos (pretty-printed JSON, como DATA). Ver CLAUDE.md, seção Procedimentos.
   RASCUNHO gerado por IA: nenhum procedimento foi revisado pelo médico ("revisado": null). Texto original, baseado nas
   fontes listadas em cada procedimento; nada copiado de Whitebook/WeMEDS/livros. Doses de drogas não ficam aqui: o campo
   "calc" liga a página da aba Calculadoras.
   Registro para o prontuário: "registro.modelo" são linhas de texto com variáveis {id} (obrigatória: vazia vira ____) e
   {id?} (opcional: vazia apaga a linha). Cada variável tem um campo em "registro.campos" (objeto ou id de PROC_CAMPOS). */
const PROC_AREAS = [
 {"key": "via-aerea", "nm": "Via aérea", "ic": "🫁"},
 {"key": "torax", "nm": "Tórax", "ic": "🫀"},
 {"key": "vascular", "nm": "Acesso vascular", "ic": "💉"},
 {"key": "abdome", "nm": "Abdome", "ic": "🩺"},
 {"key": "neuro", "nm": "Neuro", "ic": "🧠"},
 {"key": "cardiaco", "nm": "Cardíaco", "ic": "⚡"}
];

/* campos repetidos em vários registros (referidos pelo id) */
const PROC_CAMPOS = {
 "lado": {"rotulo": "Lado", "tipo": "opcoes", "opcoes": ["DIREITO", "ESQUERDO"]},
 "consentimento": {"rotulo": "Consentimento", "tipo": "opcoes", "opcoes": [
  "CONSENTIMENTO OBTIDO COM O PACIENTE",
  "CONSENTIMENTO OBTIDO COM FAMILIAR/RESPONSÁVEL",
  "PROCEDIMENTO DE EMERGÊNCIA, SEM CONDIÇÕES DE OBTER CONSENTIMENTO"
 ]},
 "antissepsia": {"rotulo": "Antissepsia", "tipo": "opcoes", "opcoes": [
  "CLOREXIDINA ALCOÓLICA E CAMPOS ESTÉREIS",
  "CLOREXIDINA DEGERMANTE + ALCOÓLICA E CAMPOS ESTÉREIS",
  "PVPI E CAMPOS ESTÉREIS"
 ]},
 "anestesia": {"rotulo": "Anestesia local", "tipo": "texto", "dica": "ex.: lidocaína 2% sem vasoconstritor, 10 mL"},
 "tentativas": {"rotulo": "Tentativas", "tipo": "opcoes", "opcoes": ["1", "2", "3", "MAIS DE 3"]},
 "intercorrencias": {"rotulo": "Intercorrências", "tipo": "opcoes", "opcoes": [
  "SEM INTERCORRÊNCIAS IMEDIATAS",
  "COM INTERCORRÊNCIA (DESCRITA ABAIXO)"
 ]},
 "obs": {"rotulo": "Intercorrência / observação", "tipo": "texto", "opcional": true, "dica": "opcional — descreva se houve"}
};

const PROCS = [
 {
  "id": "iot",
  "area": "via-aerea",
  "nm": "Intubação orotraqueal — sequência rápida",
  "sub": "IOT · SRI · capnografia",
  "kw": "iot sri isr intubacao orotraqueal sequencia rapida tubo laringoscopia videolaringoscopio bougie via aerea definitiva",
  "draft": true,
  "revisado": null,
  "fontes": [
   "Difficult Airway Society — Guidelines for tracheal intubation in critically ill adults (Higgs et al., BJA 2018)",
   "Difficult Airway Society — Unanticipated difficult intubation in adults (Frerk et al., BJA 2015)",
   "AHA — Diretrizes de RCP e ACE 2020/2025 (capnografia em forma de onda)",
   "Walls & Murphy — Manual of Emergency Airway Management, 5ª ed.",
   "Medicina de Emergência — Abordagem Prática (HC-FMUSP)"
  ],
  "calc": [
   ["iot", "Doses da SRI e kit para copiar"],
   ["fenta", "Fentanil contínuo"],
   ["mida", "Midazolam contínuo"]
  ],
  "indicacoes": [
   "Não protege a via aérea (rebaixamento, perda de reflexos)",
   "Hipoxemia ou hipercapnia apesar de O₂/VNI otimizados",
   "Curso previsto: trauma grave, queimadura de via aérea, choque refratário, agitação que impede tratamento"
  ],
  "contra": {
   "absolutas": [
    "Obstrução supraglótica completa ou trauma facial que impede o acesso pela boca → via aérea cirúrgica"
   ],
   "relativas": [
    "Via aérea difícil prevista: planejar (acordado, videolaringoscópio, plano B pronto)",
    "Choque não corrigido: ressuscitar antes (risco de PCR peri-intubação)",
    "Contraindicação à succinilcolina (hipercalemia, queimado/esmagamento > 24–72 h): usar rocurônio"
   ]
  },
  "material": [
   "Monitor (ECG, PA, SpO₂) e capnógrafo de onda",
   "O₂: máscara com reservatório + cateter nasal para oxigenação apneica",
   "Bolsa-válvula-máscara com válvula de PEEP",
   "Aspirador ligado com ponta rígida",
   "Laringoscópio (lâminas 3 e 4) ou videolaringoscópio, testados",
   "Tubos 7,0 / 7,5 / 8,0 com cuff testado",
   "Fio-guia e bougie",
   "Seringa de 10 mL",
   "Cânula orofaríngea e máscara laríngea (plano B)",
   "Kit de cricotireoidostomia à mão (plano C)",
   "Drogas aspiradas e rotuladas: indutor, bloqueador, vasopressor em bolus",
   "Acesso venoso calibroso funcionando",
   "Fixador de tubo e ventilador montado"
  ],
  "preparo": [
   "Checklist em voz alta; anunciar plano A → B → C",
   "Posição: rampa / olfativa — meato acústico na altura do esterno; cabeceira 20–30°",
   "Pré-oxigenar 3 min com O₂ a 100% (ou 8 inspirações profundas); VNI se a SpO₂ não sobe",
   "Cateter nasal 15 L/min mantido durante a apneia",
   "Hemodinâmica antes do tubo: volume e vasopressor prontos",
   "Doses pelo peso: ver Calculadoras › Intubação"
  ],
  "tecnica": [
   "Monitor, capnógrafo e pré-oxigenação em curso",
   "Indutor em bolus, seguido logo do bloqueador neuromuscular",
   {"t": "Aguardar 45–60 s sem ventilar com bolsa", "dica": "Se dessaturar, ventilar com bolsa a baixa pressão, duas mãos, com PEEP."},
   {"t": "Laringoscopia: entrar pela direita, deslocar a língua, ponta na valécula", "cuidado": "Tracionar no eixo do cabo; não alavancar nos dentes."},
   "Sem visão das cordas: manipulação laríngea externa e bougie",
   "Passar o tubo até o cuff ficar 1–2 cm além das cordas",
   "Retirar o fio-guia e insuflar o cuff",
   {"t": "Confirmar com capnografia em onda (curva sustentada por vários ciclos)", "cuidado": "Sem curva = esôfago até prova em contrário: retirar e reoxigenar."},
   "Auscultar epigástrio e 4 pontos; expansão simétrica",
   "Fixar e anotar a marca na rima: ~21 cm (mulher), ~23 cm (homem)",
   {"t": "Máximo de 3 tentativas; oxigenar entre elas", "cuidado": "Falhou: máscara laríngea. Não intubo e não oxigeno: cricotireoidostomia."}
  ],
  "depois": [
   "Analgossedação contínua logo após (Calculadoras)",
   "Ventilador: VC 6–8 mL/kg do peso predito, PEEP 5, FiO₂ 100% e reduzir",
   "RX de tórax: ponta do tubo acima da carina; afastar seletiva",
   "Pressão do cuff 20–30 cmH₂O",
   "Capnografia contínua; sonda orogástrica",
   "Hipotensão pós-IOT é comum: vasopressor pronto"
  ],
  "complicacoes": [
   "Intubação esofágica",
   "Intubação seletiva (brônquio direito)",
   "Hipoxemia",
   "Hipotensão / PCR peri-intubação",
   "Broncoaspiração",
   "Trauma dentário ou de via aérea",
   "Pneumotórax"
  ],
  "registro": {
   "campos": [
    {"id": "indicacao", "rotulo": "Indicação", "tipo": "texto", "dica": "ex.: rebaixamento do nível de consciência"},
    {"id": "drogas", "rotulo": "Drogas (indução + bloqueio)", "tipo": "texto", "dica": "ex.: etomidato 20 mg + rocurônio 80 mg"},
    {"id": "dispositivo", "rotulo": "Laringoscopia", "tipo": "opcoes", "opcoes": ["LARINGOSCOPIA DIRETA", "VIDEOLARINGOSCOPIA"]},
    {"id": "cormack", "rotulo": "Cormack-Lehane", "tipo": "opcoes", "opcoes": ["I", "II", "III", "IV"]},
    {"id": "bougie", "rotulo": "Bougie", "tipo": "opcoes", "opcoes": ["SEM BOUGIE", "COM BOUGIE"]},
    "tentativas",
    {"id": "tubo", "rotulo": "Tubo nº", "tipo": "num", "dica": "ex.: 7,5"},
    {"id": "marca", "rotulo": "Fixação na rima", "tipo": "num", "un": "cm", "dica": "ex.: 22"},
    {"id": "confirmacao", "rotulo": "Confirmação", "tipo": "opcoes", "opcoes": [
     "CAPNOGRAFIA EM ONDA, AUSCULTA E EXPANSÃO SIMÉTRICA",
     "CAPNOMETRIA COLORIMÉTRICA E AUSCULTA",
     "AUSCULTA E EXPANSÃO (SEM CAPNOGRAFIA DISPONÍVEL)"
    ]},
    "intercorrencias",
    "obs"
   ],
   "modelo": [
    "# PROCEDIMENTO: INTUBAÇÃO OROTRAQUEAL EM SEQUÊNCIA RÁPIDA",
    "INDICAÇÃO: {indicacao}.",
    "DROGAS: {drogas}.",
    "{dispositivo}, CORMACK-LEHANE {cormack}, {bougie}. TENTATIVAS: {tentativas}.",
    "TUBO OROTRAQUEAL Nº {tubo} COM CUFF, FIXADO EM {marca} CM NA RIMA LABIAL.",
    "CONFIRMAÇÃO: {confirmacao}.",
    "{intercorrencias}.",
    "{obs?}"
   ]
  }
 },
 {
  "id": "crico",
  "area": "via-aerea",
  "nm": "Cricotireoidostomia",
  "sub": "bisturi–bougie–tubo · punção na criança",
  "kw": "crico cricotireoidostomia cricotomia via aerea cirurgica nino cico nao intubo nao oxigeno bisturi bougie puncao cricotireoidea",
  "draft": true,
  "revisado": null,
  "fontes": [
   "Difficult Airway Society — Unanticipated difficult intubation in adults (Frerk et al., BJA 2015): técnica bisturi–bougie–tubo",
   "ATLS — Advanced Trauma Life Support, 10ª ed. (ACS, 2018)",
   "Roberts & Hedges — Clinical Procedures in Emergency Medicine, 7ª ed.",
   "Walls & Murphy — Manual of Emergency Airway Management, 5ª ed."
  ],
  "calc": [
   ["iot", "Intubação (doses)"]
  ],
  "indicacoes": [
   "Não intubo, não oxigeno — mesmo com máscara laríngea e máscara facial otimizadas",
   "Trauma facial ou obstrução supraglótica que impede a intubação"
  ],
  "contra": {
   "absolutas": [
    "Criança menor de ~12 anos: fazer a técnica por punção, não a cirúrgica"
   ],
   "relativas": [
    "Fratura de laringe, massa ou hematoma cervical, coagulopatia — em situação de não oxigenar, nenhuma impede"
   ]
  },
  "material": [
   "Bisturi com lâmina 10 (larga)",
   "Bougie",
   "Tubo com cuff nº 6,0 (lubrificado)",
   "Seringa de 10 mL",
   "Clorexidina",
   "Bolsa-válvula e capnógrafo",
   "Fixador",
   "Criança: cateter 14G, seringa e sistema de O₂ com saída lateral"
  ],
  "preparo": [
   "Declarar em voz alta: “não intubo, não oxigeno — cricotireoidostomia”",
   "Manter tentativa de oxigenação por cima (máscara laríngea, O₂ nasal)",
   "Pescoço em extensão (alinhado se suspeita de lesão cervical)",
   "Localizar a membrana cricotireóidea: entre tireoide e cricoide, laringe estabilizada pela mão não dominante",
   "Membrana não palpável: planejar incisão vertical na linha média"
  ],
  "tecnica": [
   "Mão não dominante estabiliza a laringe",
   "Incisão transversa única, pela pele e pela membrana, com a lâmina 10",
   {"t": "Girar o bisturi 90°, lâmina para os pés, e tracionar lateralmente", "dica": "O bisturi vira a guia: o bougie desliza ao lado dele."},
   "Passar o bougie pela abertura até a traqueia",
   "Retirar o bisturi",
   {"t": "Passar o tubo 6,0 sobre o bougie, girando", "cuidado": "Parar quando o cuff passar a membrana: avançar demais causa seletiva."},
   "Retirar o bougie, insuflar o cuff, ventilar",
   "Confirmar com capnografia em onda e fixar",
   {"t": "Membrana não palpável: incisão vertical de 8–10 cm, dissecção romba com os dedos, depois o mesmo passo a passo", "dica": "Criança: punção com cateter 14G a 45° caudal, aspirando ar; O₂ intermitente pela saída lateral é ponte de curta duração."}
  ],
  "depois": [
   "Capnografia contínua e RX de tórax",
   "Checar sangramento e enfisema subcutâneo",
   "Combinar com a cirurgia a via aérea definitiva (traqueostomia)"
  ],
  "complicacoes": [
   "Falso trajeto (pré-traqueal)",
   "Sangramento",
   "Lesão de cartilagens ou cordas vocais",
   "Perfuração da parede posterior / esôfago",
   "Enfisema subcutâneo",
   "Estenose subglótica (tardia)"
  ],
  "registro": {
   "campos": [
    {"id": "indicacao", "rotulo": "Indicação", "tipo": "opcoes", "opcoes": [
     "SITUAÇÃO NÃO INTUBO, NÃO OXIGENO",
     "OBSTRUÇÃO OU TRAUMA DE VIA AÉREA SUPERIOR"
    ]},
    {"id": "tecnica", "rotulo": "Técnica", "tipo": "opcoes", "opcoes": [
     "CIRÚRGICA (BISTURI–BOUGIE–TUBO)",
     "CIRÚRGICA COM INCISÃO VERTICAL (BISTURI–BOUGIE–TUBO)",
     "POR PUNÇÃO COM CATETER 14G"
    ]},
    {"id": "dispositivo", "rotulo": "Dispositivo", "tipo": "texto", "dica": "ex.: tubo 6,0 com cuff"},
    "tentativas",
    {"id": "confirmacao", "rotulo": "Confirmação", "tipo": "opcoes", "opcoes": [
     "CAPNOGRAFIA EM ONDA E AUSCULTA",
     "AUSCULTA E EXPANSÃO (SEM CAPNOGRAFIA DISPONÍVEL)"
    ]},
    "intercorrencias",
    "obs"
   ],
   "modelo": [
    "# PROCEDIMENTO: CRICOTIREOIDOSTOMIA",
    "INDICAÇÃO: {indicacao}.",
    "TÉCNICA: {tecnica}, COM IDENTIFICAÇÃO DA MEMBRANA CRICOTIREÓIDEA.",
    "DISPOSITIVO: {dispositivo}. TENTATIVAS: {tentativas}.",
    "CONFIRMAÇÃO: {confirmacao}.",
    "{intercorrencias}.",
    "{obs?}"
   ]
  }
 },
 {
  "id": "descompressao",
  "area": "torax",
  "nm": "Descompressão torácica — agulha ou digital",
  "sub": "pneumotórax hipertensivo",
  "kw": "descompressao toracica agulha toracocentese de alivio puncao de alivio toracostomia digital finger thoracostomy pneumotorax hipertensivo trauma",
  "draft": true,
  "revisado": null,
  "fontes": [
   "ATLS — Advanced Trauma Life Support, 10ª ed. (ACS, 2018): local adulto 4º–5º EIC anterior à linha axilar média; 2º EIC na criança",
   "Laan DV et al. — Chest wall thickness and decompression failure (Injury, 2016)",
   "Roberts & Hedges — Clinical Procedures in Emergency Medicine, 7ª ed."
  ],
  "calc": [],
  "indicacoes": [
   "Pneumotórax hipertensivo clínico: choque ou hipoxemia + MV abolido de um lado (não esperar imagem)",
   "PCR traumática com suspeita de pneumotórax (descompressão bilateral; digital se intubado)"
  ],
  "contra": {
   "absolutas": [
    "Nenhuma diante de pneumotórax hipertensivo clínico"
   ],
   "relativas": [
    "Paciente estável com dúvida diagnóstica: confirmar antes com US ou RX"
   ]
  },
  "material": [
   "Cateter sobre agulha 14G de 8 cm (adulto)",
   "Clorexidina e luvas",
   "Para digital: bisturi lâmina 10 e pinça Kelly curva",
   "Material de dreno de tórax para a sequência"
  ],
  "preparo": [
   "Decúbito dorsal, braço do lado abduzido",
   "Adulto: 4º–5º espaço intercostal, logo anterior à linha axilar média",
   "Criança: 2º espaço intercostal, linha hemiclavicular",
   "Alternativa no adulto (lateral inacessível): 2º EIC na linha hemiclavicular — não medializar"
  ],
  "tecnica": [
   "Antissepsia rápida",
   {"t": "Agulha perpendicular à pele, rente à borda superior da costela de baixo", "dica": "O feixe vasculonervoso corre na borda inferior de cada costela."},
   "Avançar até perder resistência / sair ar",
   "Retirar a agulha e manter o cateter; fixar",
   {"t": "Reavaliar PA, SpO₂ e ventilação", "cuidado": "Cateter dobra e desloca com frequência: sem melhora, repetir ou fazer a digital."},
   "Digital: incisão de 3–4 cm no mesmo espaço (triângulo de segurança)",
   "Dissecção romba com Kelly sobre a borda superior da costela até a pleura",
   "Perfurar a pleura e entrar com o dedo; varrer a cavidade",
   "Seguir com o dreno de tórax pelo mesmo orifício"
  ],
  "depois": [
   "Dreno de tórax em seguida: a descompressão é ponte",
   "RX de tórax após o dreno",
   "Reavaliar ABC"
  ],
  "complicacoes": [
   "Falha (cateter curto ou dobrado) e recidiva",
   "Lesão de vasos intercostais ou da mamária interna",
   "Lesão pulmonar",
   "Pneumotórax iatrogênico se o diagnóstico estava errado"
  ],
  "registro": {
   "campos": [
    {"id": "tecnica", "rotulo": "Técnica", "tipo": "opcoes", "opcoes": ["DESCOMPRESSÃO POR AGULHA", "TORACOSTOMIA DIGITAL"]},
    {"id": "lado", "rotulo": "Lado", "tipo": "opcoes", "opcoes": ["DIREITO", "ESQUERDO", "BILATERAL"]},
    {"id": "local", "rotulo": "Local", "tipo": "opcoes", "opcoes": [
     "4º–5º EIC ANTERIOR À LINHA AXILAR MÉDIA",
     "2º EIC NA LINHA HEMICLAVICULAR"
    ]},
    {"id": "dispositivo", "rotulo": "Dispositivo", "tipo": "texto", "dica": "ex.: cateter 14G de 8 cm"},
    {"id": "achado", "rotulo": "Achado", "tipo": "opcoes", "opcoes": ["SAÍDA DE AR SOB PRESSÃO", "SEM SAÍDA DE AR"]},
    {"id": "resposta", "rotulo": "Resposta", "tipo": "texto", "dica": "ex.: PA 70x40 → 100x60; SpO₂ 82 → 95%"},
    {"id": "seguimento", "rotulo": "Sequência", "tipo": "opcoes", "opcoes": ["DRENAGEM DE TÓRAX EM SEGUIDA", "AGUARDA DRENAGEM DE TÓRAX"]},
    "intercorrencias",
    "obs"
   ],
   "modelo": [
    "# PROCEDIMENTO: {tecnica} — {lado}",
    "INDICAÇÃO: PNEUMOTÓRAX HIPERTENSIVO (DIAGNÓSTICO CLÍNICO).",
    "LOCAL: {local}, PELA BORDA SUPERIOR DA COSTELA. DISPOSITIVO: {dispositivo}.",
    "ACHADO: {achado}. RESPOSTA: {resposta}.",
    "{seguimento}.",
    "{intercorrencias}.",
    "{obs?}"
   ]
  }
 },
 {
  "id": "toracocentese",
  "area": "torax",
  "nm": "Toracocentese",
  "sub": "diagnóstica · de alívio",
  "kw": "toracocentese puncao pleural derrame pleural liquido pleural alivio diagnostica light",
  "draft": true,
  "revisado": null,
  "fontes": [
   "British Thoracic Society — Guideline for pleural disease (Roberts et al., Thorax 2023)",
   "Roberts & Hedges — Clinical Procedures in Emergency Medicine, 7ª ed.",
   "SBPT — Diretrizes brasileiras para derrame pleural"
  ],
  "calc": [],
  "indicacoes": [
   "Diagnóstica: derrame novo sem causa definida, ou suspeita de infecção / neoplasia",
   "Alívio: dispneia por derrame volumoso"
  ],
  "contra": {
   "absolutas": [
    "Infecção de pele no local (escolher outro ponto)"
   ],
   "relativas": [
    "Coagulopatia ou anticoagulação: pesar risco (sem corte rígido nas diretrizes)",
    "Derrame pequeno ao US (lâmina fina)",
    "Ventilação mecânica: mais pneumotórax, não impede",
    "Paciente que não colabora"
   ]
  },
  "material": [
   "Ultrassom",
   "Clorexidina, campo e luvas estéreis",
   "Lidocaína 1–2%, agulhas 25G e 21G",
   "Seringas de 10, 20 e 50 mL",
   "Agulha ou cateter 18–20G (ou kit com válvula)",
   "Torneira de 3 vias, equipo e frasco coletor",
   "Frascos: bioquímica, citologia, cultura (hemocultura), pH (seringa de gasometria)",
   "Curativo"
  ],
  "preparo": [
   "Sentado, inclinado à frente, braços apoiados (ou decúbito lateral)",
   "US para marcar: maior coluna de líquido, longe de diafragma, fígado e baço",
   "Ponto usual: linha escapular ou axilar posterior, 1–2 espaços abaixo do topo do derrame",
   "Não descer abaixo do 8º–9º espaço intercostal",
   "Antissepsia, campo, anestesia em planos até a pleura"
  ],
  "tecnica": [
   "Anestesiar pele → periósteo → pleura, rente à borda superior da costela",
   "Introduzir a agulha pela borda superior da costela, aspirando, até vir líquido",
   "Diagnóstica: colher 50–60 mL e distribuir nos frascos",
   "Alívio: avançar o cateter, retirar a agulha, conectar torneira e drenar",
   {"t": "Parar em 1,5 L ou antes se tosse, dor torácica ou dispneia", "cuidado": "Retirar volumes maiores de uma vez aumenta o risco de edema de reexpansão."},
   "Retirar com o paciente expirando; curativo"
  ],
  "depois": [
   "Imagem de controle se sintomas, ar aspirado, várias punções ou ventilação mecânica",
   "Critérios de Light: proteína e LDH no líquido e no sangue",
   "Líquido: pH, glicose, celularidade, Gram/cultura, citologia (ADA se suspeita de TB)",
   "Observar sinais vitais e dispneia nas primeiras horas"
  ],
  "complicacoes": [
   "Pneumotórax",
   "Sangramento / hemotórax",
   "Edema de reexpansão",
   "Reação vasovagal",
   "Punção de fígado ou baço",
   "Infecção"
  ],
  "registro": {
   "campos": [
    {"id": "finalidade", "rotulo": "Finalidade", "tipo": "opcoes", "opcoes": ["DIAGNÓSTICA", "DE ALÍVIO", "DIAGNÓSTICA E DE ALÍVIO"]},
    "lado",
    "consentimento",
    {"id": "guia", "rotulo": "Ultrassom", "tipo": "opcoes", "opcoes": ["GUIADA POR ULTRASSOM", "COM MARCAÇÃO PRÉVIA POR ULTRASSOM", "SEM ULTRASSOM"]},
    {"id": "local", "rotulo": "Local", "tipo": "texto", "dica": "ex.: 8º EIC, linha escapular"},
    "antissepsia",
    "anestesia",
    {"id": "dispositivo", "rotulo": "Agulha / cateter", "tipo": "texto", "dica": "ex.: cateter 18G"},
    {"id": "volume", "rotulo": "Volume retirado", "tipo": "num", "un": "mL", "dica": "ex.: 1200"},
    {"id": "aspecto", "rotulo": "Aspecto", "tipo": "opcoes", "opcoes": ["CITRINO", "SERO-HEMÁTICO", "HEMÁTICO", "TURVO / PURULENTO", "QUILOSO"]},
    {"id": "amostras", "rotulo": "Amostras", "tipo": "opcoes", "opcoes": ["AMOSTRAS ENVIADAS PARA ANÁLISE", "SEM ENVIO DE AMOSTRAS"]},
    "intercorrencias",
    "obs"
   ],
   "modelo": [
    "# PROCEDIMENTO: TORACOCENTESE {finalidade} — {lado}",
    "{consentimento}.",
    "{guia}. LOCAL: {local}, PELA BORDA SUPERIOR DA COSTELA.",
    "ANTISSEPSIA: {antissepsia}. ANESTESIA: {anestesia}.",
    "DISPOSITIVO: {dispositivo}. RETIRADOS {volume} ML DE LÍQUIDO {aspecto}.",
    "{amostras}.",
    "{intercorrencias}.",
    "{obs?}"
   ]
  }
 },
 {
  "id": "dreno",
  "area": "torax",
  "nm": "Drenagem de tórax",
  "sub": "dreno · selo d'água · triângulo de segurança",
  "kw": "dreno de torax drenagem toracica toracostomia fechada selo dagua hemotorax pneumotorax empiema derrame triangulo de seguranca",
  "draft": true,
  "revisado": null,
  "fontes": [
   "British Thoracic Society — Guideline for pleural disease (Roberts et al., Thorax 2023)",
   "ATLS — Advanced Trauma Life Support, 10ª ed. (ACS, 2018): dreno 28–32 Fr no trauma, limites de débito para toracotomia",
   "Roberts & Hedges — Clinical Procedures in Emergency Medicine, 7ª ed.",
   "Diretrizes de trauma maior do NHS Scotland — Chest drain insertion in adult trauma patients"
  ],
  "calc": [
   ["emg-analgesia", "Analgesia e sedação"]
  ],
  "indicacoes": [
   "Pneumotórax hipertensivo (após a descompressão)",
   "Pneumotórax traumático, grande ou sintomático, ou em paciente que vai ser ventilado",
   "Hemotórax",
   "Empiema / derrame parapneumônico complicado",
   "Derrame recidivante sintomático (paliação)"
  ],
  "contra": {
   "absolutas": [
    "Indicação de toracotomia imediata (não atrasar o centro cirúrgico)"
   ],
   "relativas": [
    "Coagulopatia",
    "Aderências pleurais conhecidas",
    "Bolha gigante (pode imitar pneumotórax)",
    "Pós-pneumonectomia (falar com a cirurgia)"
   ]
  },
  "material": [
   "Clorexidina, campos, avental e luvas estéreis",
   "Lidocaína 1–2% e agulhas",
   "Bisturi lâmina 10",
   "2 pinças Kelly curvas",
   "Dreno do calibre indicado",
   "Fio 0 ou 1-0 e porta-agulha",
   "Selo d'água montado (soro até a marca)",
   "Curativo",
   "Analgesia / sedação"
  ],
  "preparo": [
   "Decúbito dorsal, cabeceira 30–45°, braço do lado atrás da cabeça",
   "Triângulo de segurança: borda lateral do peitoral maior, borda anterior do grande dorsal, linha do 5º EIC (mamilo); ápice abaixo da axila",
   "Calibre: trauma (sangue) 28–32 Fr; pneumotórax e derrame/empiema 12–14 Fr",
   "US antes em derrame",
   "Anestesia generosa: pele, trajeto, periósteo e pleura"
  ],
  "tecnica": [
   "Incisão de 2–3 cm paralela à costela, sobre a costela abaixo do espaço escolhido",
   {"t": "Dissecção romba com Kelly pela borda superior da costela", "dica": "O feixe vasculonervoso corre na borda inferior."},
   "Perfurar a pleura com a Kelly fechada e abrir",
   {"t": "Dedo no trajeto: confirmar a cavidade e soltar aderências", "cuidado": "Nunca usar trocarte para introduzir o dreno."},
   "Introduzir o dreno com a Kelly: apical-anterior para ar, posterobasal para líquido",
   "Todos os orifícios dentro do tórax",
   "Conectar ao selo d'água: oscilação, borbulhamento ou saída de líquido",
   {"t": "Fixar com sutura e curativo", "dica": "Pequeno calibre (Seldinger): agulha → fio-guia → dilatador → dreno."}
  ],
  "depois": [
   "RX de tórax: posição do dreno e reexpansão",
   "Selo abaixo do nível do tórax; não clampear dreno que borbulha",
   "Derrame volumoso: drenar no máximo 1,5 L na 1ª hora",
   "Hemotórax: ≥ 1.500 mL na drenagem inicial ou > 200 mL/h por 2–4 h → cirurgia",
   "Analgesia regular"
  ],
  "complicacoes": [
   "Dreno mal posicionado (subcutâneo, parênquima, cissura)",
   "Lesão de pulmão, fígado, baço ou coração (mais com trocarte ou local baixo)",
   "Sangramento de intercostal",
   "Edema de reexpansão",
   "Empiema / infecção",
   "Enfisema subcutâneo",
   "Saída acidental"
  ],
  "registro": {
   "campos": [
    "lado",
    {"id": "indicacao", "rotulo": "Indicação", "tipo": "opcoes", "opcoes": ["PNEUMOTÓRAX", "HEMOTÓRAX", "HEMOPNEUMOTÓRAX", "DERRAME PLEURAL", "EMPIEMA"]},
    "consentimento",
    "antissepsia",
    "anestesia",
    {"id": "local", "rotulo": "Local", "tipo": "opcoes", "opcoes": [
     "5º EIC NA LINHA AXILAR MÉDIA (TRIÂNGULO DE SEGURANÇA)",
     "4º EIC NA LINHA AXILAR ANTERIOR"
    ]},
    {"id": "tecnica", "rotulo": "Técnica", "tipo": "opcoes", "opcoes": ["DISSECÇÃO ROMBA", "SELDINGER"]},
    {"id": "calibre", "rotulo": "Calibre", "tipo": "num", "un": "Fr", "dica": "ex.: 28"},
    {"id": "fixacao", "rotulo": "Marca na pele", "tipo": "num", "un": "cm", "dica": "ex.: 12"},
    {"id": "saida", "rotulo": "Saída inicial", "tipo": "opcoes", "opcoes": ["AR", "SANGUE", "LÍQUIDO SEROSO", "PUS"]},
    {"id": "volume", "rotulo": "Débito inicial", "tipo": "num", "un": "mL", "dica": "ex.: 300 (0 se só ar)"},
    {"id": "selo", "rotulo": "Selo d'água", "tipo": "opcoes", "opcoes": ["OSCILANTE E BORBULHANDO", "OSCILANTE, SEM BORBULHAMENTO", "SEM OSCILAÇÃO"]},
    {"id": "controle", "rotulo": "Controle", "tipo": "opcoes", "opcoes": ["RX DE TÓRAX DE CONTROLE SOLICITADO", "RX DE TÓRAX DE CONTROLE REALIZADO"]},
    "intercorrencias",
    "obs"
   ],
   "modelo": [
    "# PROCEDIMENTO: DRENAGEM TORÁCICA FECHADA — {lado}",
    "INDICAÇÃO: {indicacao}. {consentimento}.",
    "ANTISSEPSIA: {antissepsia}. ANESTESIA: {anestesia}.",
    "INCISÃO NO {local}; {tecnica} PELA BORDA SUPERIOR DA COSTELA.",
    "DRENO TUBULAR {calibre} FR, FIXADO EM {fixacao} CM NA PELE, CONECTADO A SELO D'ÁGUA.",
    "SAÍDA DE {saida}, DÉBITO INICIAL {volume} ML. SELO {selo}.",
    "{controle}.",
    "{intercorrencias}.",
    "{obs?}"
   ]
  }
 },
 {
  "id": "cvc",
  "area": "vascular",
  "nm": "Acesso venoso central (CVC)",
  "sub": "jugular interna · subclávia · femoral · guiado por US",
  "kw": "cvc cateter venoso central acesso central puncao central jugular subclavia femoral ultrassom seldinger duplo lumen triplo lumen",
  "draft": true,
  "revisado": null,
  "fontes": [
   "ASA — Practice Guidelines for Central Venous Access (Anesthesiology, 2020)",
   "CDC — Guidelines for the Prevention of Intravascular Catheter-Related Infections (2011, atualizado 2017)",
   "Brass P et al. — Ultrasound guidance for central venous catheterisation (Cochrane, 2015)",
   "Roberts & Hedges — Clinical Procedures in Emergency Medicine, 7ª ed."
  ],
  "calc": [
   ["nora", "Noradrenalina (bomba)"]
  ],
  "indicacoes": [
   "Vasopressor ou solução irritante (vasoativa em dose alta, NPT, eletrólitos concentrados)",
   "Acesso periférico impossível",
   "Monitorização (PVC, SvcO₂)",
   "Hemodiálise ou marca-passo transvenoso (cateter próprio)"
  ],
  "contra": {
   "absolutas": [
    "Infecção, queimadura ou trombose no local"
   ],
   "relativas": [
    "Coagulopatia: preferir sítio compressível (femoral ou jugular guiada); evitar subclávia",
    "Insuficiência respiratória grave: evitar subclávia (pneumotórax); puncionar do lado já drenado",
    "Anatomia distorcida (trauma, cirurgia, radioterapia)"
   ]
  },
  "material": [
   "US com sonda linear e capa estéril",
   "Kit de CVC (agulha, fio-guia em J, dilatador, bisturi, cateter)",
   "Clorexidina alcoólica",
   "Gorro, máscara, avental, luvas estéreis e campo grande",
   "Lidocaína 1–2%",
   "Soro para preencher as vias",
   "Fio de sutura ou fixador",
   "Curativo transparente",
   "Monitor de ECG"
  ],
  "preparo": [
   "Barreira máxima (gorro, máscara, avental, luvas, campo amplo) e checklist",
   "Jugular interna: Trendelenburg 10–15°, cabeça pouco rodada; veia lateral à carótida, compressível ao US",
   "Subclávia: Trendelenburg; abaixo da clavícula, na junção do terço médio com o lateral, rumo à fúrcula",
   "Femoral: veia medial à artéria, 1–2 cm abaixo do ligamento inguinal",
   "US em tempo real é o padrão (forte na jugular)",
   "Profundidade aproximada: JID 13–15 cm · JIE 16–18 · SCD 15–17 · SCE 17–20 · femoral: cateter inteiro"
  ],
  "tecnica": [
   "Preencher as vias com soro; preparar o fio-guia",
   "US: localizar a veia; anestesiar pele e trajeto",
   "Puncionar aspirando, vendo a agulha entrar na veia; sangue escuro, sem pulsação",
   {"t": "Ocluir a agulha e passar o fio-guia", "cuidado": "Nunca soltar o fio. Arritmia ao passar: recuar o fio."},
   {"t": "Confirmar o fio dentro da veia no US antes de dilatar", "cuidado": "Sangue claro ou pulsátil: parar. Dilatar artéria é a complicação grave."},
   "Pequena incisão na pele; dilatar só até a profundidade da veia",
   "Passar o cateter sobre o fio até a marca planejada; retirar o fio",
   "Aspirar e lavar todas as vias",
   "Fixar e fazer curativo transparente"
  ],
  "depois": [
   "Jugular / subclávia: RX de tórax (ponta na junção cava–átrio; afastar pneumotórax) ou confirmação por US",
   "Anotar a marca na pele",
   "Não usar antes de confirmar, salvo emergência",
   "Curativo revisado diariamente; retirar assim que não for mais necessário"
  ],
  "complicacoes": [
   "Punção ou canulação arterial",
   "Pneumotórax (subclávia > jugular)",
   "Hematoma",
   "Arritmia",
   "Embolia gasosa",
   "Perda do fio-guia",
   "Infecção de corrente sanguínea",
   "Trombose"
  ],
  "registro": {
   "campos": [
    {"id": "sitio", "rotulo": "Veia", "tipo": "opcoes", "opcoes": ["JUGULAR INTERNA", "SUBCLÁVIA", "FEMORAL"]},
    "lado",
    {"id": "indicacao", "rotulo": "Indicação", "tipo": "texto", "dica": "ex.: droga vasoativa"},
    "consentimento",
    {"id": "guia", "rotulo": "Ultrassom", "tipo": "opcoes", "opcoes": ["GUIADA POR ULTRASSOM EM TEMPO REAL", "COM MARCAÇÃO POR ULTRASSOM", "POR REPAROS ANATÔMICOS"]},
    {"id": "barreira", "rotulo": "Barreira", "tipo": "opcoes", "opcoes": ["PARAMENTAÇÃO COMPLETA (GORRO, MÁSCARA, AVENTAL, LUVAS) E CAMPO AMPLO"]},
    "antissepsia",
    "anestesia",
    {"id": "cateter", "rotulo": "Cateter", "tipo": "texto", "dica": "ex.: duplo lúmen 7 Fr 20 cm"},
    "tentativas",
    {"id": "fixacao", "rotulo": "Marca na pele", "tipo": "num", "un": "cm", "dica": "ex.: 15"},
    {"id": "refluxo", "rotulo": "Vias", "tipo": "opcoes", "opcoes": [
     "REFLUXO SANGUÍNEO E LAVAGEM SEM RESISTÊNCIA EM TODAS AS VIAS",
     "FALHA DE REFLUXO EM UMA DAS VIAS"
    ]},
    {"id": "controle", "rotulo": "Controle", "tipo": "opcoes", "opcoes": [
     "RX DE TÓRAX SOLICITADO PARA POSIÇÃO E PARA AFASTAR PNEUMOTÓRAX",
     "POSIÇÃO CONFIRMADA E PNEUMOTÓRAX AFASTADO POR ULTRASSOM",
     "ACESSO FEMORAL, SEM NECESSIDADE DE RX"
    ]},
    "intercorrencias",
    "obs"
   ],
   "modelo": [
    "# PROCEDIMENTO: ACESSO VENOSO CENTRAL — VEIA {sitio} {lado}",
    "INDICAÇÃO: {indicacao}. {consentimento}.",
    "{barreira}. ANTISSEPSIA: {antissepsia}. ANESTESIA: {anestesia}.",
    "PUNÇÃO {guia}, TÉCNICA DE SELDINGER. TENTATIVAS: {tentativas}.",
    "CATETER {cateter}, FIXADO EM {fixacao} CM NA PELE.",
    "{refluxo}.",
    "{controle}.",
    "{intercorrencias}.",
    "{obs?}"
   ]
  }
 },
 {
  "id": "io",
  "area": "vascular",
  "nm": "Acesso intraósseo (IO)",
  "sub": "tíbia · úmero · PCR e choque",
  "kw": "io intraosseo intraossea acesso intraosseo tibia umero ez-io furadeira agulha intraossea pcr",
  "draft": true,
  "revisado": null,
  "fontes": [
   "AHA — Diretrizes de RCP e ACE 2020/2025 (SAVC e PALS): via IO quando a IV não é obtida",
   "ERC — European Resuscitation Council Guidelines 2021",
   "Roberts & Hedges — Clinical Procedures in Emergency Medicine, 7ª ed.",
   "Instruções do fabricante do dispositivo IO em uso"
  ],
  "calc": [
   ["emg-parada", "Parada cardíaca (doses)"],
   ["ped-parada", "Parada pediátrica (doses)"]
  ],
  "indicacoes": [
   "PCR ou choque quando o acesso venoso não é obtido rapidamente",
   "Adulto: tentar IV primeiro; IO se a IV falhar",
   "Criança: IO precoce se a IV não sai logo"
  ],
  "contra": {
   "absolutas": [
    "Fratura no osso escolhido",
    "IO no mesmo osso nas últimas 24–48 h",
    "Infecção ou queimadura no local",
    "Prótese / cirurgia ortopédica no local"
   ],
   "relativas": [
    "Osteogênese imperfeita, osteoporose grave",
    "Referências não palpáveis (obesidade)"
   ]
  },
  "material": [
   "Perfurador e agulhas (ou agulha IO manual)",
   "Agulhas por tamanho: 15 mm (3–39 kg), 25 mm (≥ 40 kg), 45 mm (úmero / tecido espesso)",
   "Clorexidina",
   "Extensor preenchido com soro",
   "Seringa de 10 mL com SF",
   "Lidocaína sem vasoconstritor (paciente consciente)",
   "Bolsa pressurizadora",
   "Fixador"
  ],
  "preparo": [
   "Tíbia proximal: face medial plana, ~2 cm abaixo da tuberosidade (criança: 1–2 cm abaixo, medial)",
   "Úmero proximal (adulto): tubérculo maior; braço aduzido, mão sobre o umbigo — melhor fluxo",
   "Tíbia distal: 2–3 cm acima do maléolo medial",
   "Criança pequena: fêmur distal é alternativa",
   "Antissepsia"
  ],
  "tecnica": [
   {"t": "Agulha encostada no osso através da pele: deve sobrar ao menos 1 marca preta visível", "dica": "Sem marca visível, a agulha é curta: trocar pela maior."},
   "Tíbia: perpendicular ao osso. Úmero: ângulo indicado pelo fabricante",
   "Perfurar até a perda de resistência, sem forçar o perfurador",
   "Retirar o mandril; aspirar medula (pode não vir)",
   "Conectar o extensor e fazer flush de 10 mL de SF",
   "Consciente: lidocaína antes do flush (dose do protocolo do serviço)",
   {"t": "Infundir sob pressão", "cuidado": "Edema do membro = extravasamento: parar e trocar de osso."}
  ],
  "depois": [
   "Checar extravasamento repetidamente",
   "Pode colher gasometria e tipagem (avisar o laboratório)",
   "Retirar em até 24 h, assim que houver outro acesso",
   "Anotar a hora da inserção"
  ],
  "complicacoes": [
   "Extravasamento e síndrome compartimental",
   "Deslocamento da agulha",
   "Osteomielite (rara; maior com uso prolongado)",
   "Fratura (criança)",
   "Dor à infusão"
  ],
  "registro": {
   "campos": [
    {"id": "sitio", "rotulo": "Local", "tipo": "opcoes", "opcoes": ["TÍBIA PROXIMAL", "ÚMERO PROXIMAL", "TÍBIA DISTAL", "FÊMUR DISTAL"]},
    "lado",
    {"id": "indicacao", "rotulo": "Indicação", "tipo": "texto", "dica": "ex.: PCR, sem acesso venoso periférico"},
    {"id": "dispositivo", "rotulo": "Dispositivo", "tipo": "opcoes", "opcoes": ["PERFURADOR ELÉTRICO", "AGULHA MANUAL"]},
    {"id": "agulha", "rotulo": "Agulha", "tipo": "texto", "dica": "ex.: 15G 25 mm"},
    "antissepsia",
    "tentativas",
    {"id": "confirmacao", "rotulo": "Confirmação", "tipo": "opcoes", "opcoes": [
     "ASPIRADO DE MEDULA E FLUSH SEM RESISTÊNCIA OU EXTRAVASAMENTO",
     "FLUSH SEM RESISTÊNCIA OU EXTRAVASAMENTO (SEM ASPIRADO)"
    ]},
    {"id": "analgesia", "rotulo": "Analgesia", "tipo": "texto", "dica": "ex.: lidocaína … / paciente em PCR"},
    {"id": "hora", "rotulo": "Hora da inserção", "tipo": "texto", "dica": "ex.: 14:30"},
    "intercorrencias",
    "obs"
   ],
   "modelo": [
    "# PROCEDIMENTO: ACESSO INTRAÓSSEO — {sitio} {lado}",
    "INDICAÇÃO: {indicacao}.",
    "ANTISSEPSIA: {antissepsia}. {dispositivo}, AGULHA {agulha}. TENTATIVAS: {tentativas}.",
    "CONFIRMAÇÃO: {confirmacao}.",
    "ANALGESIA: {analgesia}. HORA DA INSERÇÃO: {hora}.",
    "{intercorrencias}.",
    "{obs?}"
   ]
  }
 },
 {
  "id": "paracentese",
  "area": "abdome",
  "nm": "Paracentese",
  "sub": "diagnóstica · de alívio · albumina",
  "kw": "paracentese puncao abdominal ascite pbe peritonite bacteriana espontanea albumina gasa cirrose alivio",
  "draft": true,
  "revisado": null,
  "fontes": [
   "AASLD — Practice Guidance: Diagnosis, evaluation and management of ascites, SBP and HRS (Biggins et al., Hepatology 2021)",
   "EASL — Clinical Practice Guidelines for decompensated cirrhosis (J Hepatol, 2018)",
   "Roberts & Hedges — Clinical Procedures in Emergency Medicine, 7ª ed."
  ],
  "calc": [],
  "indicacoes": [
   "Diagnóstica: ascite nova",
   "Diagnóstica: cirrótico com ascite internado ou com piora (febre, dor, encefalopatia, LRA, HDA) — afastar PBE",
   "Alívio: ascite tensa com desconforto ou dispneia"
  ],
  "contra": {
   "absolutas": [
    "Coagulação intravascular disseminada clinicamente evidente / fibrinólise"
   ],
   "relativas": [
    "INR alargado e plaquetopenia não contraindicam de rotina (não transfundir de rotina)",
    "Gestação, alças distendidas, aderências: guiar por US",
    "Infecção de pele no local"
   ]
  },
  "material": [
   "Ultrassom",
   "Clorexidina, campo e luvas estéreis",
   "Lidocaína 1–2%",
   "Agulha ou cateter 18–20G (diagnóstica: 21–22G)",
   "Seringas de 20 a 60 mL",
   "Tubos: celularidade (EDTA) e bioquímica (albumina, proteínas, glicose, LDH)",
   "2 frascos de hemocultura (inocular à beira do leito)",
   "Equipo e frascos de vácuo ou bolsa coletora",
   "Albumina 20% se for retirar mais de 5 L",
   "Curativo"
  ],
  "preparo": [
   "Decúbito dorsal, levemente inclinado para o lado da punção; bexiga vazia",
   "Local: fossa ilíaca esquerda, ~3 cm medial e cranial à espinha ilíaca anterossuperior",
   "Alternativa: linha média infraumbilical",
   "US: bolsão de líquido e vasos da parede (epigástrica inferior)"
  ],
  "tecnica": [
   "Anestesiar pele e trajeto até o peritônio",
   {"t": "Técnica em Z: tracionar a pele ~2 cm antes de puncionar", "dica": "O trajeto desalinhado reduz vazamento depois."},
   "Avançar aspirando até vir líquido",
   "Colher as amostras; inocular 10 mL em cada frasco de hemocultura na hora",
   "Alívio: conectar ao sistema de drenagem; se parar, mudar o decúbito",
   "Retirar e fazer curativo compressivo"
  ],
  "depois": [
   "Mais de 5 L retirados: albumina 6–8 g por litro retirado",
   "PMN ≥ 250/mm³ = PBE: tratar",
   "GASA ≥ 1,1 g/dL = hipertensão portal",
   "Observar PA e vazamento pelo orifício"
  ],
  "complicacoes": [
   "Vazamento de ascite",
   "Hematoma de parede / hemoperitônio",
   "Perfuração intestinal",
   "Infecção",
   "Hipotensão após grande volume sem albumina"
  ],
  "registro": {
   "campos": [
    {"id": "finalidade", "rotulo": "Finalidade", "tipo": "opcoes", "opcoes": ["DIAGNÓSTICA", "DE ALÍVIO", "DIAGNÓSTICA E DE ALÍVIO"]},
    "consentimento",
    {"id": "guia", "rotulo": "Ultrassom", "tipo": "opcoes", "opcoes": ["GUIADA POR ULTRASSOM", "COM MARCAÇÃO PRÉVIA POR ULTRASSOM", "SEM ULTRASSOM"]},
    {"id": "local", "rotulo": "Local", "tipo": "opcoes", "opcoes": ["FOSSA ILÍACA ESQUERDA", "FOSSA ILÍACA DIREITA", "LINHA MÉDIA INFRAUMBILICAL"]},
    "antissepsia",
    "anestesia",
    {"id": "dispositivo", "rotulo": "Agulha / cateter", "tipo": "texto", "dica": "ex.: cateter 18G"},
    {"id": "volume", "rotulo": "Volume retirado", "tipo": "num", "un": "mL", "dica": "ex.: 6000"},
    {"id": "aspecto", "rotulo": "Aspecto", "tipo": "opcoes", "opcoes": ["CITRINO", "TURVO", "HEMÁTICO", "QUILOSO"]},
    {"id": "amostras", "rotulo": "Amostras", "tipo": "opcoes", "opcoes": [
     "COLHIDAS AMOSTRAS PARA CELULARIDADE, BIOQUÍMICA E CULTURA EM FRASCOS DE HEMOCULTURA",
     "SEM COLETA DE AMOSTRAS"
    ]},
    {"id": "albumina", "rotulo": "Albumina", "tipo": "texto", "dica": "ex.: 40 g EV / não indicada"},
    "intercorrencias",
    "obs"
   ],
   "modelo": [
    "# PROCEDIMENTO: PARACENTESE {finalidade}",
    "{consentimento}.",
    "{guia}. PUNÇÃO EM {local}.",
    "ANTISSEPSIA: {antissepsia}. ANESTESIA: {anestesia}. DISPOSITIVO: {dispositivo}.",
    "RETIRADOS {volume} ML DE LÍQUIDO {aspecto}.",
    "{amostras}.",
    "ALBUMINA: {albumina}.",
    "{intercorrencias}.",
    "{obs?}"
   ]
  }
 },
 {
  "id": "pl",
  "area": "neuro",
  "nm": "Punção lombar (PL)",
  "sub": "LCR · meningite · HSA",
  "kw": "pl puncao lombar raquicentese lcr liquor liquido cefalorraquidiano meningite encefalite hsa hemorragia subaracnoidea pressao de abertura",
  "draft": true,
  "revisado": null,
  "fontes": [
   "IDSA — Practice Guidelines for the Management of Bacterial Meningitis (Tunkel et al., CID 2004): critérios de TC antes da PL",
   "ESCMID — Guideline: diagnosis and treatment of acute bacterial meningitis (CMI, 2016)",
   "ASRA — Regional anesthesia in the patient receiving antithrombotic therapy, 4ª ed. (2018)",
   "Roberts & Hedges — Clinical Procedures in Emergency Medicine, 7ª ed."
  ],
  "calc": [],
  "indicacoes": [
   "Suspeita de meningite ou encefalite",
   "Suspeita de HSA com TC sem sangue",
   "Outras: hipertensão intracraniana idiopática, Guillain-Barré, meningite carcinomatosa"
  ],
  "contra": {
   "absolutas": [
    "Infecção no local da punção",
    "Efeito de massa / sinais de herniação"
   ],
   "relativas": [
    "Coagulopatia, plaquetopenia ou anticoagulante (ver intervalos de suspensão)",
    "Instabilidade hemodinâmica ou respiratória",
    "Convulsão em curso"
   ]
  },
  "material": [
   "Clorexidina (esperar secar), campo, luvas estéreis e máscara",
   "Lidocaína 1–2%",
   "Agulha espinal 22G (atraumática se houver)",
   "Manômetro com torneira",
   "4 tubos estéreis numerados",
   "Curativo"
  ],
  "preparo": [
   "TC antes se: imunossupressão, doença prévia do SNC, convulsão nova (≤ 1 semana), papiledema, rebaixamento, déficit focal",
   "Se a TC vai atrasar: hemoculturas e antibiótico (± dexametasona) antes",
   "Decúbito lateral em posição fetal (para medir pressão) ou sentado",
   "Espaço L3–L4 ou L4–L5: a linha entre as cristas ilíacas cruza L4",
   "No adulto, sempre abaixo de L2 (cone medular)"
  ],
  "tecnica": [
   "Anestesiar pele e subcutâneo",
   {"t": "Agulha na linha média, levemente cefálica (rumo ao umbigo), bisel paralelo ao eixo da coluna", "dica": "Bisel paralelo às fibras da dura reduz cefaleia pós-punção."},
   "Avançar devagar; retirar o mandril a cada 2–3 mm depois do ligamento",
   "Com LCR: medir a pressão de abertura (decúbito lateral, pernas estendidas)",
   "Colher em 4 tubos numerados",
   {"t": "Recolocar o mandril antes de retirar a agulha", "dica": "Punção traumática: o sangue clareia do tubo 1 para o 4."},
   "Curativo"
  ],
  "depois": [
   "Repouso não previne cefaleia pós-punção",
   "LCR: celularidade, glicose (com glicemia simultânea), proteína, Gram, cultura",
   "Conforme o caso: PCR/painel viral, VDRL, criptococo, xantocromia (HSA)"
  ],
  "complicacoes": [
   "Cefaleia pós-punção",
   "Dor lombar ou radicular",
   "Punção traumática",
   "Hematoma espinal (coagulopatia)",
   "Infecção",
   "Herniação (rara; com efeito de massa)"
  ],
  "registro": {
   "campos": [
    {"id": "indicacao", "rotulo": "Indicação", "tipo": "texto", "dica": "ex.: suspeita de meningite"},
    {"id": "tc", "rotulo": "Imagem prévia", "tipo": "opcoes", "opcoes": [
     "TC DE CRÂNIO PRÉVIA SEM CONTRAINDICAÇÃO À PUNÇÃO",
     "SEM TC: SEM CRITÉRIOS PARA IMAGEM PRÉVIA"
    ]},
    "consentimento",
    {"id": "posicao", "rotulo": "Posição", "tipo": "opcoes", "opcoes": ["DECÚBITO LATERAL", "SENTADO"]},
    {"id": "espaco", "rotulo": "Espaço", "tipo": "opcoes", "opcoes": ["L3–L4", "L4–L5"]},
    "antissepsia",
    "anestesia",
    {"id": "agulha", "rotulo": "Agulha", "tipo": "texto", "dica": "ex.: espinal 22G"},
    "tentativas",
    {"id": "pressao", "rotulo": "Pressão de abertura", "tipo": "texto", "dica": "ex.: 18 cmH₂O / não medida"},
    {"id": "aspecto", "rotulo": "Aspecto", "tipo": "opcoes", "opcoes": ["LÍMPIDO E INCOLOR", "TURVO", "HEMORRÁGICO", "XANTOCRÔMICO"]},
    {"id": "volume", "rotulo": "Volume colhido", "tipo": "num", "un": "mL", "dica": "ex.: 10"},
    "intercorrencias",
    "obs"
   ],
   "modelo": [
    "# PROCEDIMENTO: PUNÇÃO LOMBAR",
    "INDICAÇÃO: {indicacao}. {tc}.",
    "{consentimento}.",
    "{posicao}. ANTISSEPSIA: {antissepsia}. ANESTESIA: {anestesia}.",
    "PUNÇÃO NO ESPAÇO {espaco} COM AGULHA {agulha}. TENTATIVAS: {tentativas}.",
    "PRESSÃO DE ABERTURA: {pressao}. LCR {aspecto}, {volume} ML EM 4 TUBOS.",
    "{intercorrencias}.",
    "{obs?}"
   ]
  }
 },
 {
  "id": "cardioversao",
  "area": "cardiaco",
  "nm": "Cardioversão elétrica sincronizada",
  "sub": "cargas por ritmo · desfibrilação",
  "kw": "cardioversao eletrica sincronizada cve choque sincronizado desfibrilacao fa flutter tsv tv taquiarritmia instavel joules",
  "draft": true,
  "revisado": null,
  "fontes": [
   "AHA — 2025 ACLS Electrical Cardioversion Algorithm (FA 200 J, flutter 200 J, outras TSV 100 J, TV monomórfica 100 J)",
   "AHA — 2025 Adult Tachyarrhythmia With a Pulse Algorithm",
   "ACC/AHA/ACCP/HRS — Guideline for atrial fibrillation (2023): anticoagulação na cardioversão",
   "Roberts & Hedges — Clinical Procedures in Emergency Medicine, 7ª ed."
  ],
  "calc": [
   ["emg-arritmias", "Arritmias (doses)"],
   ["emg-analgesia", "Sedação"]
  ],
  "indicacoes": [
   "Taquiarritmia com pulso e instabilidade: hipotensão, rebaixamento agudo, choque, dor isquêmica, IC aguda (FC em geral > 150)",
   "FA / flutter estáveis: eletiva, com anticoagulação adequada",
   "Desfibrilação (não sincronizada): FV, TV sem pulso e TV polimórfica"
  ],
  "contra": {
   "absolutas": [
    "Taquicardia sinusal",
    "Taquicardias por automatismo (atrial multifocal, juncional): o choque não resolve"
   ],
   "relativas": [
    "FA/flutter > 48 h ou duração incerta, sem anticoagulação ou ETE, em paciente estável",
    "Intoxicação digitálica",
    "Hipocalemia grave"
   ]
  },
  "material": [
   "Desfibrilador com modo SINC",
   "Pás adesivas",
   "Monitor, oxímetro e capnografia",
   "Acesso venoso",
   "O₂, bolsa-válvula-máscara e aspirador",
   "Material de intubação",
   "Sedação aspirada e antagonistas"
  ],
  "preparo": [
   "Pás anterolateral (infraclavicular direita + ápice) ou anteroposterior",
   "Sedar sempre que possível (Calculadoras › sedação)",
   "Eletiva: jejum e anticoagulação conforme o tempo de FA"
  ],
  "tecnica": [
   "Monitorizar pelas pás ou derivação com QRS bem visível",
   {"t": "Ligar SINC e conferir a marca sobre cada QRS", "cuidado": "Sem marca em cada QRS: trocar de derivação ou ajustar o ganho."},
   "Carga inicial (bifásico): FA 200 J · flutter 200 J · outras TSV 100 J · TV monomórfica 100 J",
   "Sedar",
   "“Afastem-se”, O₂ longe do tórax; apertar e SEGURAR o botão até o disparo",
   {"t": "Reavaliar ritmo e pulso; sem reversão, aumentar a carga", "cuidado": "Muitos aparelhos desligam o SINC após cada choque: religar antes do próximo."},
   {"t": "TV polimórfica ou FV: desfibrilar, sem sincronizar", "dica": "Desfibrilação: dose do fabricante (bifásico 120–200 J) ou máxima; monofásico 360 J."}
  ],
  "depois": [
   "ECG de 12 derivações",
   "Monitorizar até recuperar da sedação",
   "FA: anticoagulação após a cardioversão (≥ 4 semanas, conforme risco)",
   "Investigar e corrigir a causa (eletrólitos, isquemia, drogas)"
  ],
  "complicacoes": [
   "FV induzida (choque fora do QRS)",
   "Bradicardia / assistolia após o choque",
   "Embolia (FA sem anticoagulação)",
   "Queimadura de pele",
   "Depressão respiratória pela sedação"
  ],
  "registro": {
   "campos": [
    {"id": "ritmo", "rotulo": "Ritmo", "tipo": "texto", "dica": "ex.: FA de alta resposta, FC 170"},
    {"id": "indicacao", "rotulo": "Indicação", "tipo": "opcoes", "opcoes": ["INSTABILIDADE HEMODINÂMICA", "ELETIVA"]},
    "consentimento",
    {"id": "sedacao", "rotulo": "Sedação", "tipo": "texto", "dica": "ex.: etomidato 14 mg EV"},
    {"id": "pas", "rotulo": "Posição das pás", "tipo": "opcoes", "opcoes": ["ANTEROLATERAL", "ANTEROPOSTERIOR"]},
    {"id": "modo", "rotulo": "Modo", "tipo": "opcoes", "opcoes": ["SINCRONIZADO", "NÃO SINCRONIZADO (DESFIBRILAÇÃO)"]},
    {"id": "choques", "rotulo": "Choques", "tipo": "texto", "dica": "ex.: 200 J → 200 J (bifásico)"},
    {"id": "resultado", "rotulo": "Resultado", "tipo": "texto", "dica": "ex.: ritmo sinusal, FC 88"},
    "intercorrencias",
    "obs"
   ],
   "modelo": [
    "# PROCEDIMENTO: CARDIOVERSÃO ELÉTRICA",
    "RITMO: {ritmo}. INDICAÇÃO: {indicacao}. {consentimento}.",
    "SEDAÇÃO: {sedacao}.",
    "PÁS EM POSIÇÃO {pas}, MODO {modo}. CHOQUES: {choques}.",
    "RESULTADO: {resultado}.",
    "{intercorrencias}.",
    "{obs?}"
   ]
  }
 }
];
