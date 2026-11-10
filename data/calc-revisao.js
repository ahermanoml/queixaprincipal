/* data/calc-revisao.js — caixa "Para o revisor" da aba Calculadoras (só aparece enquanto o conteúdo é rascunho).
   Separado das tabelas de doses (data/calculadoras.js). Chave = id da página (CX_PAGS: "nora", "iot", "emg-parada"…);
   "_bomba" entra em todas as páginas de bomba de infusão. Para cada página:
     "mudancas":   o que foi corrigido em relação ao dilui na revisão clínica de 2026-11 (antigo → novo), uma linha cada;
     "pendencias": decisões em aberto que o médico precisa tomar ou conferir.
   Quando o médico decidir um item, tire-o daqui (e, se mudar dose, recongele o gabarito — ver CLAUDE.md). */
const CALC_REVISAO = {
 "_bomba": {
  "mudancas": [
   "Leitura dos campos (ampolas, diluente, ampola do hospital, dose, vazão): \"25.000\" era lido como 25 → agora 25000 (ponto de milhar); o campo mostra \"entendido: …\" quando isso acontece"
  ]
 },
 "nipride": {
  "mudancas": [
   "Nota da dose máxima: \"Máximo pela bula brasileira: 8 mcg/kg/min (literatura: 10 por até 10 min)\" → \"Máx (bula): 8 mcg/kg/min no adulto, por no máximo 10 min — se a PA não controlar, suspender. Uso prolongado: média ≤ 2,5 mcg/kg/min\""
  ]
 },
 "vaso": {
  "pendencias": [
   "Faixa usual e dose máxima são ambas 0,04 UI/min (acima da faixa já vira vermelho); sugestão do revisor: faixa 0,01–0,03 e máx 0,04"
  ]
 },
 "mgso4": {
  "pendencias": [
   "Ataque de 4 g: aqui em 10–20 min; outras referências usam 20–30 min — escolher"
  ]
 },
 "propo": {
  "pendencias": [
   "Propofol 2% em frasco de 20 mL (diluição \"Puro 2%\"): confirmar se ainda é comercializado no Brasil"
  ]
 },
 "iot": {
  "mudancas": [
   "Kit SRI copiado: listava os dois indutores e os dois bloqueadores, como se fossem para dar os quatro → agora traz um de cada: padrão etomidato + succinilcolina (escolha do médico), com cetamina, propofol, midazolam e rocurônio a um clique",
   "Criança: \"Atropina\" no kit → \"Atropina (se indicada)\""
  ],
  "pendencias": [
   "Seu padrão (70 kg): etomidato 20 mg = 10 mL, succinilcolina 1,5 mg/kg, tubo 7,5. A tabela calcula etomidato 0,3 mg/kg (70 kg → 21 mg = 10,5 mL), succinilcolina 1–1,5 mg/kg (70–105 mg) e mostra tubo ♂ 7,5–8,5 / ♀ 7,0–8,0 — alinhar as doses ao padrão?",
   "Succinilcolina sem teto absoluto (sugestão opcional: máx 200 mg)",
   "Obesidade: fentanil, propofol e etomidato calculados pelo peso real — considerar \"obeso: usar peso magro/ideal\""
  ]
 },
 "emg-anticoagulacao": {
  "mudancas": [
   "Enoxaparina (IAM com fibrinólise, ≥ 75 anos): a nota prometia máx 75 mg, mas a conta não limitava (120 kg → 90 mg) → teto de 75 mg aplicado; nota reescrita (ClCr < 30: 1 mg/kg 1×/dia)"
  ],
  "pendencias": [
   "Heparina — bolus TEP/TVP sem teto (sugestão opcional: máx 10.000 UI)"
  ]
 },
 "emg-analgesia": {
  "mudancas": [
   "Morfina: volume calculado na ampola pura de 10 mg/mL (70 kg → 0,35–0,7 mL) embora dissesse \"diluir\" → agora diluída a 1 mg/mL (70 kg → 3,5–7 mL), igual à pediátrica"
  ],
  "pendencias": [
   "Morfina sem teto (sugestão opcional: máx 10 mg)",
   "Furosemida sem teto (sugestão opcional: máx 40 mg + \"virgem de diurético\")"
  ]
 },
 "emg-convulsao": {
  "pendencias": [
   "Fenobarbital sem teto absoluto (sugestão opcional: máx 1.500 mg)"
  ]
 },
 "emg-hemorragia": {
  "mudancas": [
   "Ácido tranexâmico (HPP): nota sem janela → \"Até 3 h do parto. Repetir 1 g se sangramento persistir após 30 min\" (WOMAN / OMS 2017)"
  ]
 },
 "emg-antidotos": {
  "mudancas": [
   "Flumazenil: \"0,2 mg em 30 s, repetir 0,2 mg/min até 1 mg\" → \"0,2 mg IV em 15 s; se preciso, 0,1 mg a cada 60 s (máx 1 mg)\" (bula brasileira)"
  ],
  "pendencias": [
   "A bula tem outro esquema para intoxicação / UTI (0,3 mg inicial, até 2 mg no total): decidir se entra"
  ]
 },
 "emg-trombolise": {
  "mudancas": [
   "Alteplase (TEP): nota \"PCR por TEP: 0,6 mg/kg (máx 50 mg) em 15 min\" → \"Regime acelerado: 0,6 mg/kg (máx 50 mg) em 15 min. PCR por TEP: 50 mg em bolus; pode repetir após 15 min\" (ESC 2019; ERC 2021)",
   "Rodapé: \"AHA/ASA 2019 (AVC)\" → \"AHA/ASA 2026 (AVC isquêmico agudo)\" (doses sem mudança)"
  ],
  "pendencias": [
   "Estreptoquinase: confirmar se ainda é comercializada no Brasil"
  ]
 },
 "emg-obstetricia": {
  "pendencias": [
   "Sulfato de magnésio — ataque em 10–20 min aqui; outras referências usam 20–30 min — escolher"
  ]
 },
 "ped-parada": {
  "pendencias": [
   "Amiodarona: \"150 mg nas seguintes\" é número do adulto; o PALS limita cada dose a 300 mg (5 mg/kg) — decidir o texto",
   "Nota da adrenalina via tubo (\"removida dos algoritmos AHA 2025\"): o revisor não conseguiu confirmar"
  ]
 },
 "ped-respiratorio": {
  "mudancas": [
   "Salbutamol spray: via impressa \"IN\" (a mesma tabela usa IN para intranasal) → \"INAL\"",
   "Adrenalina IM (anafilaxia): sem idade digitada o teto era 0,5 mg (35 kg → 0,35 mg) → teto padrão 0,3 mg; 0,5 mg só com idade ≥ 12 anos"
  ]
 },
 "ped-convulsao": {
  "mudancas": [
   "Diazepam retal: nota reescrita — bula ≥ 2 anos (< 2 anos fora da bula); usar a solução injetável 5 mg/mL por via retal"
  ],
  "pendencias": [
   "Midazolam IM 0,2 mg/kg (máx 10 mg) vs doses fixas por peso da AES (5 mg 13–40 kg, 10 mg > 40 kg) — escolher"
  ]
 },
 "ped-analgesia": {
  "mudancas": [
   "Midazolam (ansiólise): nota ganhou \"< 6 meses: sem dose estabelecida em bula — titular em pequenos incrementos, com monitorização\""
  ]
 }
};
