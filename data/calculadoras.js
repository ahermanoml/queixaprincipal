/* data/calculadoras.js — conteúdo clínico da aba Calculadoras.
   GERADO POR SCRIPT a partir do dilui (index.html): o trecho entre os marcadores abaixo é uma cópia BYTE A BYTE do
   original, do comentário "DILUI — banco de drogas" até o "];" final de EMG (tabelas INF, IOT, PED, EMG).
   Não reformate nem "corrija" doses aqui: qualquer mudança clínica passa pela revisão do médico (ver CLAUDE.md,
   seção Calculadoras). O invólucro (função) só evita que INF/IOT/PED/EMG virem nomes globais soltos.
   Conteúdo gerado por IA, ainda não revisado: a aba mostra a etiqueta "rascunho" em todas as calculadoras. */
const CALC_DADOS = (() => {
// ===== início da cópia do dilui =====
/* ============ DILUI — banco de drogas ============
   Convenções
   INF (infusões): amp = conteúdo de 1 ampola {q, u, ml}; pre = diluições prontas {n, a: nº ampolas, d: mL de diluente, amp?: override};
   un = unidade da dose; faixa = faixa usual; max = dose máxima (opcional); passos = linhas da tabela de titulação.
   BOLUS: d = [lo, hi] por kg; u = unidade/kg; c = concentração para calcular mL (mesma unidade de massa por mL);
   max = dose máxima absoluta (na unidade de massa); fixo = dose fixa em texto (sem cálculo).
*/

const INF = [
  // ---------------- VASOATIVAS ----------------
  { id:'nora', n:'Noradrenalina', g:'Vasoativas', amp:{q:4,u:'mg',ml:4},
    apres:'Hemitartarato de norepinefrina 2 mg/mL — ampola 4 mL = 4 mg de norepinefrina base', dil:'SG 5%',
    pre:[{n:'Padrão',a:4,d:234},{n:'Dupla',a:8,d:218},{n:'Seringa 50 mL',a:4,d:34}],
    un:'mcg/kg/min', ini:0.1, faixa:[0.01,1], passos:[0.05,0.1,0.2,0.3,0.5,0.75,1],
    alvo:'titular para PAM ≥ 65 mmHg',
    obs:['Choque séptico: 1ª escolha. Alvo PAM ≥ 65 mmHg.',
         'Pode iniciar em veia periférica calibrosa por curto período (vigiar extravasamento) enquanto obtém acesso central.',
         'Doses da literatura são de norepinefrina base: a ampola de 4 mL tem 4 mg de base (8 mg do sal hemitartarato).'] },

  { id:'adre', n:'Adrenalina', g:'Vasoativas', amp:{q:1,u:'mg',ml:1},
    apres:'Epinefrina 1 mg/mL — ampola 1 mL', dil:'SF 0,9% ou SG 5%',
    pre:[{n:'Padrão 6 amp + 94 mL',a:6,d:94},{n:'Diluída 4 amp + 246 mL',a:4,d:246}],
    un:'mcg/kg/min', ini:0.05, faixa:[0.01,0.5], passos:[0.02,0.05,0.1,0.2,0.3,0.5],
    alvo:'titular para PAM ≥ 65 mmHg',
    obs:['Choque refratário/2ª droga, anafilaxia refratária, bradicardia.',
         'Bradicardia sintomática (AHA): 2–10 mcg/min.',
         'Hiperlactatemia e taquiarritmias são esperadas.'] },

  { id:'vaso', n:'Vasopressina', g:'Vasoativas', amp:{q:20,u:'UI',ml:1},
    apres:'Vasopressina 20 UI/mL — ampola 1 mL', dil:'SF 0,9% ou SG 5%',
    pre:[{n:'Padrão',a:1,d:99},{n:'Dupla',a:2,d:98}],
    un:'UI/min', ini:0.03, faixa:[0.01,0.04], max:0.04, passos:[0.01,0.02,0.03,0.04],
    alvo:'dose fixa (não titular como a noradrenalina)',
    obs:['Choque séptico: associar quando noradrenalina ≥ 0,25–0,5 mcg/kg/min (SSC 2021).',
         'Dose usual fixa de 0,03 UI/min. Não depende do peso.'] },

  { id:'dobu', n:'Dobutamina', g:'Vasoativas', amp:{q:250,u:'mg',ml:20},
    apres:'Dobutamina 12,5 mg/mL — ampola 20 mL = 250 mg', dil:'SG 5% ou SF 0,9%',
    pre:[{n:'Padrão',a:1,d:230},{n:'Concentrada',a:4,d:170}],
    un:'mcg/kg/min', ini:5, faixa:[2.5,20], passos:[2.5,5,7.5,10,15,20],
    alvo:'titular por perfusão/débito',
    obs:['Inotrópico: choque cardiogênico, baixo débito.',
         'Pode causar taquiarritmia e hipotensão (vasodilatação β2) — associar vasopressor se PAM baixa.'] },

  { id:'dopa', n:'Dopamina', g:'Vasoativas', amp:{q:50,u:'mg',ml:10},
    apres:'Dopamina 5 mg/mL — ampola 10 mL = 50 mg', dil:'SG 5% ou SF 0,9%',
    pre:[{n:'Padrão',a:5,d:200}],
    un:'mcg/kg/min', ini:5, faixa:[2,20], passos:[2,5,10,15,20],
    alvo:'titular por PA/FC',
    obs:['5–10 mcg/kg/min: efeito β (inotrópico/cronotrópico). > 10: efeito α (vasoconstrição).',
         'Bradicardia sintomática (AHA): 5–20 mcg/kg/min.',
         'Mais arritmia que noradrenalina — não é 1ª escolha no choque séptico.'] },

  { id:'milri', n:'Milrinona', g:'Vasoativas', amp:{q:20,u:'mg',ml:20},
    apres:'Milrinona 1 mg/mL — ampola 20 mL = 20 mg', dil:'SG 5% ou SF 0,9%',
    pre:[{n:'Padrão',a:1,d:80}],
    un:'mcg/kg/min', ini:0.375, faixa:[0.375,0.75], passos:[0.25,0.375,0.5,0.75],
    alvo:'titular por débito/PA',
    obs:['Inodilatador (inibidor da PDE-3). Hipotensão é comum.',
         'Ataque de 50 mcg/kg em 10 min geralmente omitido.',
         'Reduzir a dose na disfunção renal.'] },

  { id:'tridil', n:'Nitroglicerina', g:'Vasoativas', amp:{q:50,u:'mg',ml:10},
    apres:'Tridil 5 mg/mL — ampola 10 mL = 50 mg (existe ampola 5 mL = 25 mg)', dil:'SG 5% ou SF 0,9%',
    pre:[{n:'Padrão',a:1,d:240}],
    un:'mcg/min', ini:10, faixa:[5,200], passos:[5,10,20,40,60,100,150,200],
    alvo:'subir 5–10 mcg/min a cada 3–5 min conforme dor/PA',
    obs:['Iniciar 5–10 mcg/min; subir 5–10 mcg/min a cada 3–5 min.',
         'Frasco de vidro ou equipo próprio (PVC adsorve a droga).',
         'Evitar: PAS < 90, IAM de VD, sildenafila < 24 h ou tadalafila < 48 h.'] },

  { id:'nipride', n:'Nitroprussiato (Nipride)', g:'Vasoativas', amp:{q:50,u:'mg',ml:2},
    apres:'Nitroprussiato de sódio — frasco 50 mg (pó) + diluente 2 mL', dil:'SG 5% (somente)',
    pre:[{n:'Padrão',a:1,d:248}],
    un:'mcg/kg/min', ini:0.3, faixa:[0.3,3], max:8, passos:[0.3,0.5,1,2,3,5],
    alvo:'titular a cada 5 min pela PA',
    obs:['Somente SG 5%. Proteger da luz (frasco e equipo fotoprotetores).',
         'Máximo pela bula brasileira: 8 mcg/kg/min (literatura: 10 por até 10 min). Risco de cianeto/tiocianato com dose alta, uso > 48–72 h ou insuficiência renal/hepática.',
         'Emergência hipertensiva: reduzir no máximo 25% da PA na 1ª hora. Dissecção de aorta: betabloqueador antes; alvo PAS < 120 e FC < 60.'] },

  // ---------------- SEDAÇÃO / ANALGESIA ----------------
  { id:'mida', n:'Midazolam', g:'Sedação e analgesia', amp:{q:50,u:'mg',ml:10},
    apres:'Midazolam 5 mg/mL — ampola 10 mL = 50 mg (existe 3 mL = 15 mg)', dil:'SF 0,9% ou SG 5%',
    pre:[{n:'Padrão',a:3,d:120},{n:'Puro',a:1,d:0}],
    un:'mg/kg/h', ini:0.05, faixa:[0.02,0.1], max:0.2, passos:[0.02,0.05,0.1,0.15,0.2],
    alvo:'titular por escala RASS',
    obs:['PADIS: 0,02–0,1 mg/kg/h. Bolus de ajuste: 0,01–0,05 mg/kg.',
         'Acumula em idosos, obesos, IR e hepatopatas — despertar prolongado e delirium.'] },

  { id:'fenta', n:'Fentanil', g:'Sedação e analgesia', amp:{q:500,u:'mcg',ml:10},
    apres:'Fentanil 50 mcg/mL — ampola 10 mL = 500 mcg (existe 2 e 5 mL)', dil:'SF 0,9% ou SG 5%',
    pre:[{n:'Padrão',a:5,d:200},{n:'Puro',a:1,d:0}],
    un:'mcg/kg/h', ini:1, faixa:[0.7,3], max:10, passos:[0.5,1,1.5,2,3,4],
    alvo:'titular por dor (analgesia primeiro)',
    obs:['Analgosedação: tratar a dor primeiro. Bolus de ajuste: 1–2 mcg/kg.',
         'PADIS: 0,7–10 mcg/kg/h; o habitual fica em 1–3.',
         'Bolus rápido em dose alta pode causar rigidez torácica.'] },

  { id:'propo', n:'Propofol', g:'Sedação e analgesia', amp:{q:200,u:'mg',ml:20},
    apres:'Propofol 1% = 10 mg/mL — frasco 20 mL = 200 mg', dil:'Puro (não diluir)',
    pre:[{n:'Puro 1% — 4 amp',a:4,d:0},{n:'Puro 1% — 1 amp',a:1,d:0},{n:'Puro 2% — 4 amp',a:4,d:0,amp:{q:400,u:'mg',ml:20}}],
    un:'mg/kg/h', ini:1, faixa:[0.3,3], max:4, passos:[0.5,1,1.5,2,3,4],
    alvo:'titular por escala RASS',
    obs:['0,3–3 mg/kg/h equivale a 5–50 mcg/kg/min.',
         'Hipotensão frequente. Evitar > 4 mg/kg/h por > 48 h (síndrome de infusão do propofol).',
         'Trocar frasco e equipo a cada 12 h. Emulsão lipídica: 1,1 kcal/mL.'] },

  { id:'dex', n:'Dexmedetomidina', g:'Sedação e analgesia', amp:{q:200,u:'mcg',ml:2},
    apres:'Precedex 100 mcg/mL — ampola 2 mL = 200 mcg', dil:'SF 0,9%',
    pre:[{n:'Padrão 2 amp + 96 mL',a:2,d:96},{n:'Seringa 1 amp + 48 mL',a:1,d:48}],
    un:'mcg/kg/h', ini:0.4, faixa:[0.2,0.7], max:1.5, passos:[0.2,0.4,0.7,1,1.4],
    alvo:'titular por escala RASS (alvo leve)',
    obs:['Sem bolus de ataque (bradicardia e hipotensão).',
         'Sedação leve e cooperativa; não deprime o drive respiratório. Útil no delirium agitado e no desmame.'] },

  { id:'keta', n:'Cetamina', g:'Sedação e analgesia', amp:{q:500,u:'mg',ml:10},
    apres:'Cetamina 50 mg/mL — frasco 10 mL = 500 mg', dil:'SF 0,9% ou SG 5%',
    pre:[{n:'Padrão',a:1,d:240}],
    un:'mg/kg/h', ini:0.2, faixa:[0.1,2], passos:[0.1,0.2,0.3,0.5,1,1.5,2],
    alvo:'analgesia 0,1–0,3 · sedação 0,5–2 mg/kg/h',
    obs:['Analgesia (dose subdissociativa): 0,1–0,3 mg/kg/h (até 0,5).',
         'Sedação, broncoespasmo refratário: 0,5–2 mg/kg/h.',
         'Escetamina (Ketamin S+): usar cerca de metade da dose.'] },

  // ---------------- OUTRAS INFUSÕES ----------------
  { id:'amio', n:'Amiodarona', g:'Outras infusões', amp:{q:150,u:'mg',ml:3},
    apres:'Amiodarona 50 mg/mL — ampola 3 mL = 150 mg', dil:'SG 5% (somente)',
    pre:[{n:'Manutenção 24 h',a:6,d:482}],
    un:'mg/min', ini:1, faixa:[0.5,1], passos:[0.5,1],
    alvo:'1 mg/min por 6 h → 0,5 mg/min por 18 h',
    obs:['Ataque (TV com pulso / FA): 150 mg (1 amp) em SG 5% 100 mL em 10 min.',
         'Manutenção: 1 mg/min por 6 h, depois 0,5 mg/min por 18 h (≈ 1,05 g nas 24 h).',
         'Somente SG 5%. Flebite: concentração > 2 mg/mL pede acesso central.'] },

  { id:'insu', n:'Insulina regular (CAD/EHH)', g:'Outras infusões', amp:{q:100,u:'UI',ml:1}, ampLabel:'mL de insulina',
    apres:'Insulina regular 100 UI/mL — cada 1 mL = 100 UI', dil:'SF 0,9%',
    pre:[{n:'Padrão',a:1,d:99}],
    un:'UI/kg/h', ini:0.1, faixa:[0.05,0.14], passos:[0.05,0.1,0.14],
    reg:[{n:'CAD',dose:0.1},{n:'EHH',dose:0.05}],
    alvo:'CAD 0,1 UI/kg/h · EHH 0,05 UI/kg/h',
    obs:['Só iniciar com K ≥ 3,5 mEq/L (se menor, repor potássio antes).',
         'CAD: 0,1 UI/kg/h (bolus de 0,1 UI/kg opcional). EHH: 0,05 UI/kg/h, queda de glicemia ≤ 90–120 mg/dL por hora (ADA 2024).',
         'Glicemia < 250 mg/dL: associar SG 5–10% e reduzir para 0,05 UI/kg/h.',
         'Criança: seguir ISPAD (sem bolus, 0,05–0,1 UI/kg/h).',
         'Lavar o equipo com ~20 mL da solução (a insulina adsorve no plástico).'] },

  { id:'hnf', n:'Heparina não fracionada', g:'Outras infusões', amp:{q:25000,u:'UI',ml:5},
    apres:'Heparina 5.000 UI/mL — frasco 5 mL = 25.000 UI', dil:'SF 0,9% ou SG 5%',
    pre:[{n:'Padrão',a:1,d:245}],
    un:'UI/kg/h', ini:18, faixa:[12,18], passos:[12,15,18],
    reg:[{n:'TEP/TVP',dose:18},{n:'SCA',dose:12,capH:1000,capU:'UI/h'}],
    alvo:'ajustar por TTPa a cada 6 h (1,5–2,5× o controle)',
    obs:['TEP/TVP: bolus 80 UI/kg + 18 UI/kg/h.',
         'SCA: bolus 60 UI/kg (máx 4.000 UI) + 12 UI/kg/h (máx 1.000 UI/h).',
         'Bolus calculado na aba Emergência.'] },

  { id:'mgso4', n:'Sulfato de magnésio (pré-eclâmpsia)', g:'Outras infusões', amp:{q:5,u:'g',ml:10},
    apres:'MgSO₄ 50% — ampola 10 mL = 5 g', dil:'SG 5% ou SF 0,9%',
    pre:[{n:'Zuspan',a:1,d:490}],
    un:'g/h', ini:1, faixa:[1,2], passos:[1,2],
    alvo:'1 g/h por 24 h',
    obs:['Ataque: 4 g IV em 10–20 min (8 mL de MgSO₄ 50% + 12 mL de água destilada).',
         'Suspender se reflexo patelar abolido, FR < 16 irpm ou diurese < 25 mL/h.',
         'Antídoto: gluconato de cálcio 10% 10 mL IV lento.'] },

  { id:'octreo', n:'Octreotida', g:'Outras infusões', amp:{q:100,u:'mcg',ml:1},
    apres:'Octreotida 0,1 mg/mL — ampola 1 mL = 100 mcg', dil:'SF 0,9%',
    pre:[{n:'Padrão',a:5,d:95}],
    un:'mcg/h', ini:50, faixa:[25,50], passos:[25,50],
    alvo:'50 mcg/h por 2–5 dias',
    obs:['HDA varicosa: bolus 50 mcg IV + 50 mcg/h por 2–5 dias.',
         'Alternativa: terlipressina (aba Emergência).'] },
];

/* ============ IOT / SRI ============ */
const IOT = {
  pre: [
    { n:'Fentanil', via:'IV', d:[1,3], u:'mcg/kg', c:50, apres:'50 mcg/mL', nota:'2–3 min antes da indução. Reduzir ou omitir no choque.' },
    { n:'Lidocaína 2% sem vasoconstritor', via:'IV', d:[1.5], u:'mg/kg', c:20, apres:'20 mg/mL', nota:'Opcional (HIC, broncoespasmo). Benefício não comprovado.' },
  ],
  ind: [
    { n:'Etomidato', via:'IV', d:[0.3], u:'mg/kg', c:2, apres:'2 mg/mL · ampola 10 mL = 20 mg', nota:'Boa estabilidade hemodinâmica. Mioclonias; supressão adrenal transitória.' },
    { n:'Cetamina', via:'IV', d:[1,2], u:'mg/kg', c:50, apres:'50 mg/mL (racêmica) · frasco 10 mL', nota:'Choque: 0,5–1 mg/kg. Boa no broncoespasmo. Escetamina (S+): metade da dose.' },
    { n:'Propofol', via:'IV', d:[1.5,2.5], u:'mg/kg', c:10, apres:'1% = 10 mg/mL', nota:'Hipotensão importante. Idoso ou instável: 0,5–1 mg/kg.' },
    { n:'Midazolam', via:'IV', d:[0.1,0.3], u:'mg/kg', c:5, apres:'5 mg/mL', nota:'Início lento (2–3 min) e hipotensão — pior opção para SRI.' },
  ],
  bnm: [
    { n:'Succinilcolina', via:'IV', d:[1,1.5], dPed:[1,2], u:'mg/kg', c:10, apres:'Frasco 100 mg — reconstituir em 10 mL (10 mg/mL)',
      nota:'Usar peso real. Contraindicada: hipercalemia, queimadura/esmagamento/denervação após 24–72 h, doença neuromuscular, história de hipertermia maligna.', notaPed:'Lactentes: 2 mg/kg.' },
    { n:'Rocurônio', via:'IV', d:[1,1.2], u:'mg/kg', c:10, apres:'10 mg/mL · ampola 5 mL = 50 mg', nota:'Duração 45–70 min na dose de SRI. Revertido pelo sugamadex.' },
  ],
  rev: [
    { n:'Sugamadex', via:'IV', d:[16], u:'mg/kg', c:100, apres:'100 mg/mL · ampola 2 mL = 200 mg', nota:'16 mg/kg = reversão imediata após rocurônio de SRI. Rotina: 2 mg/kg (TOF ≥ 2) ou 4 mg/kg (bloqueio profundo).' },
  ],
  ped: [
    { n:'Atropina', via:'IV', d:[0.02], u:'mg/kg', c:0.25, max:0.5, apres:'0,25 mg/mL (se 0,5 mg/mL, metade do volume)', nota:'Pré-medicação: considerar se bradicardia ou alto risco (lactentes, succinilcolina). Sem dose mínima na IOT (PALS).' },
  ],
  push: [
    { n:'Adrenalina "push dose"', fixo:'10 mcg/mL → 5–20 mcg (0,5–2 mL) a cada 2–5 min',
      nota:'Preparo: 1 mL de adrenalina (1 mg) + 9 mL de SF = 100 mcg/mL. Pegue 1 mL dessa e complete com 9 mL de SF = 10 mcg/mL.' },
    { n:'Efedrina', fixo:'5 mg/mL → 5–10 mg (1–2 mL) a cada 3–5 min',
      nota:'Preparo: 1 ampola (50 mg/mL) + 9 mL de SF.' },
    { n:'Fenilefrina', fixo:'100 mcg/mL → 50–200 mcg (0,5–2 mL) a cada 2–5 min',
      nota:'Preparo: 1 ampola (10 mg/mL) em SF 100 mL.' },
  ],
};

/* ============ PEDIATRIA ============ */
const PED = [
  { sec:'Parada e arritmias', itens:[
    { n:'Adrenalina (PCR)', via:'IV/IO', d:[0.01], u:'mg/kg', c:0.1, max:1, apres:'Diluída 0,1 mg/mL (1 mL da ampola + 9 mL SF)', nota:'= 0,1 mL/kg da solução diluída. Repetir a cada 3–5 min.' },
    { n:'Adrenalina (via tubo) — último recurso', via:'TOT', d:[0.1], u:'mg/kg', c:1, max:2.5, apres:'Pura 1 mg/mL', nota:'Removida dos algoritmos AHA 2025. Só se impossível IV/IO; seguir com 5 mL de SF.' },
    { n:'Amiodarona', via:'IV/IO', d:[5], u:'mg/kg', c:50, max:300, apres:'50 mg/mL', nota:'PCR: bolus, até 3 doses (15 mg/kg). Máx 300 mg na 1ª dose e 150 mg nas seguintes. Com pulso: em 20–60 min.' },
    { n:'Lidocaína', via:'IV/IO', d:[1], u:'mg/kg', c:20, max:100, apres:'2% = 20 mg/mL', nota:'Alternativa à amiodarona na FV/TV sem pulso.' },
    { n:'Adenosina — 1ª dose', via:'IV', d:[0.1], u:'mg/kg', c:3, max:6, apres:'3 mg/mL', nota:'Push rápido + flush de 5–10 mL de SF.' },
    { n:'Adenosina — 2ª dose', via:'IV', d:[0.2], u:'mg/kg', c:3, max:12, apres:'3 mg/mL', nota:'Se a 1ª não reverter.' },
    { n:'Atropina', via:'IV/IO', d:[0.02], u:'mg/kg', c:0.25, min:0.1, max:0.5, apres:'0,25 mg/mL (se 0,5 mg/mL, metade do volume)', nota:'Bradicardia: mínimo 0,1 mg, máximo 0,5 mg por dose (PALS 2025). Pode repetir 1 vez.' },
    { n:'Bicarbonato de sódio 8,4%', via:'IV/IO', d:[1], u:'mEq/kg', c:1, max:50, apres:'1 mEq/mL', nota:'Não rotineiro. Neonatos e lactentes pequenos: diluir 1:1 (4,2%).' },
    { n:'Gluconato de cálcio 10%', via:'IV/IO', d:[60], u:'mg/kg', c:100, max:3000, apres:'100 mg/mL', nota:'= 0,6 mL/kg, lento. Hipocalcemia, hipercalemia, intoxicação por bloqueador de canal de cálcio.' },
    { calc:'choque' },
  ]},
  { sec:'Volume e glicose', itens:[
    { n:'Bolus de cristaloide', via:'IV/IO', d:[10,20], u:'mL/kg', max:1000, apres:'SF 0,9% ou RL', nota:'Reavaliar após cada bolus (hepatomegalia, estertores). RN e cardiopatas: 5–10 mL/kg.' },
    { n:'Glicose 10% (hipoglicemia)', via:'IV/IO', d:[2,5], u:'mL/kg', max:250, apres:'SG 10% = 0,1 g/mL', nota:'0,2–0,5 g/kg. Recém-nascido: 2 mL/kg. Rechecar glicemia em 15 min.' },
    { calc:'holliday' },
  ]},
  { sec:'Convulsão', itens:[
    { n:'Midazolam IM', via:'IM', d:[0.2], u:'mg/kg', c:5, max:10, apres:'5 mg/mL', nota:'1ª linha sem acesso venoso.' },
    { n:'Midazolam intranasal', via:'IN', d:[0.2], u:'mg/kg', c:5, max:10, apres:'5 mg/mL', nota:'Dividir entre as narinas, de preferência com atomizador.' },
    { n:'Midazolam IV', via:'IV', d:[0.1,0.2], u:'mg/kg', c:5, max:10, apres:'5 mg/mL', nota:'Pode repetir 1 vez em 5 min.' },
    { n:'Diazepam IV', via:'IV', d:[0.15,0.2], u:'mg/kg', c:5, max:10, apres:'5 mg/mL', nota:'Pode repetir 1 vez em 5 min.' },
    { n:'Diazepam retal', via:'VR', d:[0.2,0.5], dAge:[[6,[0.5]],[12,[0.3]],[999,[0.2]]], u:'mg/kg', c:5, max:20, apres:'5 mg/mL', nota:'≥ 2 anos. Por idade: 2–5 a 0,5 · 6–11 a 0,3 · ≥ 12 a 0,2 mg/kg. Informe a idade para ajustar.' },
    { n:'Fenitoína', via:'IV', d:[20], u:'mg/kg', c:50, max:1500, ratePerKg:1, rate:50, apres:'50 mg/mL', nota:'Diluir em SF. Infundir ≤ 1 mg/kg/min (máx 50 mg/min), com monitor.' },
    { n:'Levetiracetam', via:'IV', d:[60], u:'mg/kg', c:100, max:4500, apres:'100 mg/mL', nota:'Em 10–15 min. Menos efeito hemodinâmico.' },
    { n:'Fenobarbital', via:'IV', d:[20], u:'mg/kg', c:100, max:1000, ratePerKg:1, rate:60, apres:'100 mg/mL · ampola 2 mL', nota:'Infundir ≤ 1 mg/kg/min (mín 20 min; máx 60 mg/min). Depressão respiratória e hipotensão.' },
  ]},
  { sec:'Respiratório e anafilaxia', itens:[
    { n:'Adrenalina IM (anafilaxia)', via:'IM', d:[0.01], u:'mg/kg', c:1, max:0.5, maxBy:[[12,0.3],[999,0.5]], apres:'Pura 1 mg/mL', nota:'Vasto lateral da coxa. Repetir a cada 5–15 min. Máx 0,3 mg (< 12 anos) ou 0,5 mg (≥ 12 anos).' },
    { n:'Adrenalina inalatória (crupe)', via:'NBZ', d:[0.5], u:'mL/kg', max:5, apres:'Pura 1 mg/mL, sem diluir', nota:'Observar 2–4 h após (efeito rebote).' },
    { n:'Dexametasona (crupe)', via:'VO/IM/IV', d:[0.15,0.6], u:'mg/kg', c:4, max:10, apres:'Injetável 4 mg/mL', nota:'Crupe leve: 0,15 mg/kg. Moderado/grave: 0,6 mg/kg. Dose única.' },
    { n:'Prednisolona (asma)', via:'VO', d:[1,2], u:'mg/kg', c:3, max:40, maxBy:[[2,20],[6,30],[999,40]], apres:'Solução oral 3 mg/mL (existe 1 mg/mL)', nota:'Dose diária, 3–5 dias. Máx 20 mg (< 2 a), 30 mg (2–5 a), 40 mg (≥ 6 a).' },
    { n:'Sulfato de magnésio (asma grave)', via:'IV', d:[25,50], u:'mg/kg', c:500, max:2000, apres:'MgSO₄ 50% = 500 mg/mL', nota:'Diluir e infundir em 20 min. Monitorar PA.' },
    { calc:'salbutamol' },
  ]},
  { sec:'Analgesia, sedação e sintomáticos', itens:[
    { n:'Fentanil IV', via:'IV', d:[1,2], u:'mcg/kg', c:50, max:100, apres:'50 mcg/mL', nota:'Titular em doses de 0,5–1 mcg/kg.' },
    { n:'Fentanil intranasal', via:'IN', d:[1.5], u:'mcg/kg', c:50, max:100, apres:'50 mcg/mL', nota:'Dividir entre as narinas.' },
    { n:'Morfina', via:'IV', d:[0.05,0.1], u:'mg/kg', c:1, max:5, apres:'Diluir para 1 mg/mL (1 amp de 10 mg/mL + 9 mL SF)', nota:'Titular a cada 10–15 min.' },
    { n:'Cetamina (procedimento) IV', via:'IV', d:[1,1.5], u:'mg/kg', c:50, apres:'50 mg/mL (cetamina racêmica)', nota:'Sedação dissociativa. Repetir 0,5 mg/kg se preciso. Escetamina (Ketamin S+): metade da dose.' },
    { n:'Cetamina (procedimento) IM', via:'IM', d:[4,5], u:'mg/kg', c:50, apres:'50 mg/mL (cetamina racêmica)', nota:'Início em 3–5 min. Escetamina (Ketamin S+): metade da dose.' },
    { n:'Midazolam (ansiólise)', via:'IV', d:[0.025,0.05], dAge:[[6,[0.05,0.1]],[999,[0.025,0.05]]], u:'mg/kg', c:5, max:2, apres:'5 mg/mL (existe 1 mg/mL)', nota:'Dose inicial: 6 m–5 a 0,05–0,1 · 6–12 a 0,025–0,05 mg/kg (máx 2 mg por dose). Titular a cada 2–3 min.' },
    { n:'Dipirona', via:'VO', d:[15,25], u:'mg/kg', c:500, max:1000, gotas:20, apres:'500 mg/mL (gotas: 20 gotas = 1 mL)', nota:'Até 6/6 h. Evitar < 3 meses ou < 5 kg. Injetável: < 1 ano só IM (bula); IV pode causar hipotensão.' },
    { n:'Paracetamol', via:'VO', d:[10,15], u:'mg/kg', c:200, max:1000, apres:'Gotas 200 mg/mL', nota:'Até 6/6 h. Máx 75 mg/kg/dia (≤ 4 g).' },
    { n:'Ibuprofeno', via:'VO', d:[5,10], u:'mg/kg', c:50, max:400, maxBy:[[12,200],[999,400]], apres:'Gotas 50 mg/mL (existe 100 mg/mL)', nota:'≥ 6 meses. Até 6/6–8/8 h. Máx 200 mg/dose (< 12 a, bula) e 40 mg/kg/dia.' },
    { n:'Ondansetrona', via:'IV/VO', d:[0.15], u:'mg/kg', c:2, max:4, apres:'Injetável 2 mg/mL', nota:'≥ 6 meses.' },
  ]},
];

/* ============ EMERGÊNCIA ADULTO ============ */
const EMG = [
  { sec:'Parada cardíaca', itens:[
    { n:'Adrenalina', via:'IV/IO', fixo:'1 mg (1 mL da ampola 1 mg/mL) a cada 3–5 min', nota:'Seguir com flush de 20 mL de SF e elevar o membro.' },
    { n:'Amiodarona', via:'IV/IO', fixo:'300 mg (2 ampolas) em bolus → 2ª dose 150 mg (1 ampola)', nota:'FV/TV sem pulso refratária ao choque.' },
    { n:'Lidocaína (alternativa)', via:'IV/IO', d:[1,1.5], u:'mg/kg', c:20, apres:'2% = 20 mg/mL', nota:'Depois 0,5–0,75 mg/kg a cada 5–10 min (máx 3 mg/kg).' },
    { n:'Sulfato de magnésio (torsades)', via:'IV', fixo:'1–2 g (2–4 mL de MgSO₄ 50%) diluídos', nota:'Na PCR em bolus; com pulso em 5–20 min.' },
    { n:'Choque (desfibrilação)', fixo:'Bifásico 120–200 J (ou carga máxima do aparelho) · Monofásico 360 J' },
  ]},
  { sec:'Bradicardia e taquicardia', itens:[
    { n:'Atropina', via:'IV', fixo:'1 mg a cada 3–5 min (máx 3 mg)', nota:'Ampola 0,25 mg/mL = 4 mL; ampola 0,5 mg/mL = 2 mL. Sem resposta: adrenalina 2–10 mcg/min, dopamina 5–20 mcg/kg/min ou marca-passo.' },
    { n:'Adenosina', via:'IV', fixo:'6 mg (2 mL) em push rápido → 12 mg (4 mL)', nota:'Ampola 3 mg/mL. Flush rápido de 20 mL de SF.' },
    { n:'Cardioversão sincronizada', fixo:'TSV regular estreita 100 J · FA e flutter 200 J · TV monomórfica 100 J (bifásico)', nota:'AHA 2025. Escalonar a carga se falhar. Sedar antes.' },
    { n:'Metoprolol', via:'IV', fixo:'5 mg em 2–5 min, a cada 5 min (máx 15 mg)', nota:'Ampola 1 mg/mL (5 mL). Controle de FC na FA. Evitar na IC descompensada.' },
  ]},
  { sec:'Anafilaxia', itens:[
    { n:'Adrenalina IM', via:'IM', d:[0.01], u:'mg/kg', c:1, max:0.5, apres:'Pura 1 mg/mL', nota:'Vasto lateral da coxa. Repetir a cada 5–15 min. Refratária: infusão de adrenalina (aba Bomba).' },
  ]},
  { sec:'Convulsão (estado de mal)', itens:[
    { n:'Diazepam', via:'IV', d:[0.15,0.2], u:'mg/kg', c:5, max:10, apres:'5 mg/mL', nota:'Pode repetir 1 vez em 5 min.' },
    { n:'Midazolam IM', via:'IM', fixo:'10 mg (> 40 kg) · 5 mg (13–40 kg)', nota:'1ª linha sem acesso venoso.' },
    { n:'Fenitoína', via:'IV', d:[20], u:'mg/kg', c:50, max:1500, rate:50, apres:'50 mg/mL', nota:'Diluir em SF. Infundir ≤ 50 mg/min, com monitor.' },
    { n:'Levetiracetam', via:'IV', d:[60], u:'mg/kg', c:100, max:4500, apres:'100 mg/mL', nota:'Em 10–15 min.' },
    { n:'Fenobarbital', via:'IV', d:[15,20], u:'mg/kg', c:100, rate:60, apres:'100 mg/mL · ampola 2 mL', nota:'Bula: infundir < 60 mg/min. Depressão respiratória e hipotensão.' },
  ]},
  { sec:'Trombólise', itens:[
    { calc:'altepAVC' },
    { n:'Tenecteplase (AVC)', via:'IV', d:[0.25], u:'mg/kg', c:5, max:25, apres:'Reconstituída 5 mg/mL', nota:'Bolus único em 5–10 s.' },
    { calc:'tnkIAM' },
    { calc:'altepIAM' },
    { n:'Alteplase (TEP)', via:'IV', fixo:'100 mg em 2 h', nota:'PCR por TEP: 0,6 mg/kg (máx 50 mg) em 15 min.' },
    { n:'Estreptoquinase (IAM)', via:'IV', fixo:'1.500.000 UI em SF 100 mL em 30–60 min', nota:'Hipotensão: reduzir a velocidade.' },
  ]},
  { sec:'Anticoagulação', itens:[
    { n:'Enoxaparina (plena)', via:'SC', d:[1], u:'mg/kg', apres:'Seringas de 20 a 150 mg', nota:'12/12 h. ClCr < 30: 1 mg/kg 1×/dia. Profilaxia: 40 mg 1×/dia.' },
    { n:'Enoxaparina (IAM com fibrinólise, ≥ 75 anos)', via:'SC', d:[0.75], u:'mg/kg', apres:'Seringas de 20 a 150 mg', nota:'12/12 h, sem bolus IV (máx 75 mg nas 2 primeiras doses). < 75 anos com fibrinólise: 30 mg IV + 1 mg/kg SC 12/12 h (máx 100 mg nas 2 primeiras).' },
    { n:'Heparina — bolus TEP/TVP', via:'IV', d:[80], u:'UI/kg', c:5000, apres:'5.000 UI/mL', nota:'Depois 18 UI/kg/h (aba Bomba).' },
    { n:'Heparina — bolus SCA', via:'IV', d:[60], u:'UI/kg', c:5000, max:4000, apres:'5.000 UI/mL', nota:'Depois 12 UI/kg/h, máx 1.000 UI/h (aba Bomba).' },
  ]},
  { sec:'Hemorragia', itens:[
    { n:'Ácido tranexâmico (trauma)', via:'IV', fixo:'1 g em 10 min + 1 g em 8 h', nota:'Até 3 h do trauma. Ampola 250 mg/5 mL: 1 g = 4 ampolas.' },
    { n:'Ácido tranexâmico (HPP)', via:'IV', fixo:'1 g em 10 min', nota:'Repetir 1 g se sangramento persistir após 30 min.' },
    { n:'Terlipressina (HDA varicosa)', via:'IV', fixo:'2 mg a cada 4 h', nota:'Após controle, 1 mg a cada 4 h, por 2–5 dias.' },
  ]},
  { sec:'Hipercalemia e hipoglicemia', itens:[
    { n:'Gluconato de cálcio 10%', via:'IV', fixo:'10–30 mL (1–3 g) em 5–10 min', nota:'Estabiliza a membrana. UKKA 2023: 30 mL como 1ª dose. Repetir se o ECG não normalizar.' },
    { n:'Insulina regular + glicose', via:'IV', fixo:'10 UI + 25–50 g de glicose (SG 50% 50–100 mL)', nota:'Glicemia capilar de hora em hora por 6 h (hipoglicemia tardia).' },
    { n:'Salbutamol', via:'NBZ', fixo:'10–20 mg nebulizado (2–4 mL da solução 5 mg/mL)', nota:'Efeito em 30 min.' },
    { n:'Glicose 50% (hipoglicemia)', via:'IV', fixo:'25 g = 50 mL (5 ampolas de 10 mL)', nota:'Etilista/desnutrido: tiamina 100 mg IV junto, sem atrasar a glicose.' },
  ]},
  { sec:'Antídotos', itens:[
    { n:'Naloxona', via:'IV', fixo:'0,04–0,4 mg, titular a cada 2–3 min (até 2 mg; pode repetir)', nota:'Ampola 0,4 mg/mL. Usuário crônico: começar com 0,04 mg (1 amp em 10 mL = 0,04 mg/mL) para evitar abstinência.' },
    { n:'Flumazenil', via:'IV', fixo:'0,2 mg em 30 s, repetir 0,2 mg/min até 1 mg', nota:'Ampola 0,1 mg/mL. Evitar em uso crônico de BZD ou co-ingestão pró-convulsivante.' },
  ]},
  { sec:'Obstetrícia', itens:[
    { n:'Sulfato de magnésio — ataque', via:'IV', fixo:'4 g em 10–20 min (8 mL de MgSO₄ 50% + 12 mL de AD)', nota:'Manutenção 1 g/h na aba Bomba.' },
    { n:'Hidralazina', via:'IV', fixo:'5 mg a cada 20 min (máx 30 mg)', nota:'Ampola 20 mg/mL: diluir 1 amp em 19 mL de AD (1 mg/mL) e fazer 5 mL. Tratar se PA ≥ 160/110; alvo 140–150/90–100, sem quedas bruscas.' },
    { n:'Nifedipina', via:'VO', fixo:'10 mg a cada 20–30 min (máx 30 mg)', nota:'Comprimido de liberação imediata. Não usar sublingual.' },
  ]},
  { sec:'Analgesia, sedação e outros', itens:[
    { n:'Cetamina (analgesia)', via:'IV', d:[0.1,0.3], u:'mg/kg', c:50, apres:'50 mg/mL (cetamina racêmica)', nota:'Em 10–15 min (diluída em SF 100 mL) para evitar disforia. Escetamina (Ketamin S+): metade da dose.' },
    { n:'Cetamina (sedação dissociativa)', via:'IV', d:[1,1.5], u:'mg/kg', c:50, apres:'50 mg/mL (cetamina racêmica)', nota:'Repetir 0,5 mg/kg se preciso. Escetamina (Ketamin S+): metade da dose.' },
    { n:'Fentanil', via:'IV', d:[0.5,1], u:'mcg/kg', c:50, apres:'50 mcg/mL', nota:'Titular a cada 5 min.' },
    { n:'Morfina', via:'IV', d:[0.05,0.1], u:'mg/kg', c:10, apres:'10 mg/mL (diluir)', nota:'Titular a cada 5–10 min. Idoso: começar com 2 mg.' },
    { n:'Propofol (sedação)', via:'IV', d:[0.5,1], u:'mg/kg', c:10, apres:'10 mg/mL', nota:'Depois 0,25–0,5 mg/kg a cada 3–5 min.' },
    { n:'Furosemida (EAP)', via:'IV', d:[0.5,1], u:'mg/kg', c:10, apres:'10 mg/mL · ampola 2 mL = 20 mg', nota:'IV é ~2× mais potente que VO (biodisponibilidade oral ~50%): 40 mg VO ≈ 20 mg IV. Quem já usa: 1–2,5× a dose oral diária, IV.' },
  ]},
];
// ===== fim da cópia do dilui =====
// rodapé do dilui (aviso + apresentações parecidas + referências), HTML copiado como está
const RODAPE = [
  "<b>Ferramenta de apoio.</b> Confira a apresentação disponível no seu hospital, a dose e as contraindicações antes de administrar. Doses por peso usam o peso informado no topo.",
  "<b>Apresentações parecidas</b> mudam o volume: atropina 0,5 mg/mL, midazolam 1 mg/mL, MgSO₄ 10%, heparina SC 5.000 UI/0,25 mL, octreotida 0,5 mg/mL, ibuprofeno 100 mg/mL, succinilcolina 500 mg. Na Bomba, use “A ampola do seu hospital é diferente?”.",
  "Referências: AHA/ILCOR 2020–2025 (SAVC e PALS), Surviving Sepsis Campaign 2021, diretriz PADIS 2018, consenso ADA de crises hiperglicêmicas 2024, AES 2016 (estado de mal epiléptico), AHA/ASA 2019 (AVC), ESC 2023 (síndromes coronarianas), Ministério da Saúde/FEBRASGO (pré-eclâmpsia), bulas ANVISA."
];
return { INF, IOT, PED, EMG, RODAPE };
})();
