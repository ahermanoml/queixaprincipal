/* nihss.js — conteúdo da NIHSS (itens, opções, frases do texto, momentos, formatos, faixas).
   O bloco entre as marcas abaixo é cópia byte a byte do script da página nihss/ do Ficha Vermelha
   (fichavermelha.pages.dev/nihss/); não reescreva nem reformate. */
const NIHSS = (function () {
  /* --- início: cópia byte a byte --- */
  var ARM = ['Sem queda', 'Queda antes de 10 s', 'Algum esforço contra gravidade', 'Sem esforço contra gravidade', 'Sem movimento'];
  var LEG = ['Sem queda', 'Queda antes de 5 s', 'Algum esforço contra gravidade', 'Sem esforço contra gravidade', 'Sem movimento'];
  var FARM = '0 sem queda · 1 queda · 2 algum esforço · 3 sem esforço · 4 sem movimento';
  var ITEMS = [
    { id: '1a', s: 'NC', t: 'Nível de consciência', h: 'Resposta ao estímulo.', o: ['Alerta', 'Sonolento', 'Torporoso', 'Coma'],
      p: ['alerta', 'sonolento', 'torporoso', 'comatoso'], f: '0 alerta · 1 sonolento · 2 torporoso · 3 coma' },
    { id: '1b', s: 'perguntas', t: 'Perguntas', h: 'Mês atual e idade.', o: ['Ambas certas', 'Uma certa', 'Nenhuma'],
      p: ['responde corretamente mês e idade', 'responde corretamente uma das perguntas', 'não responde corretamente às perguntas'], f: '0 ambas certas · 1 uma certa · 2 nenhuma' },
    { id: '1c', s: 'comandos', t: 'Comandos', h: 'Abrir e fechar os olhos; abrir e fechar a mão não parética.', o: ['Faz os dois', 'Faz um', 'Nenhum'],
      p: ['obedece aos dois comandos', 'obedece a um dos comandos', 'não obedece a comandos'], f: '0 faz os dois · 1 faz um · 2 nenhum' },
    { id: '2', s: 'olhar', t: 'Melhor olhar conjugado', h: 'Só movimentos horizontais.', o: ['Normal', 'Paralisia parcial', 'Desvio forçado'],
      p: ['olhar conjugado normal', 'paralisia parcial do olhar conjugado', 'desvio forçado do olhar'], f: '0 normal · 1 paralisia parcial · 2 desvio forçado' },
    { id: '3', s: 'campos visuais', t: 'Campos visuais', h: 'Confrontação nos quatro quadrantes.', o: ['Sem perda', 'Hemianopsia parcial', 'Hemianopsia completa', 'Bilateral ou cegueira'],
      p: ['sem perda de campo visual', 'hemianopsia parcial', 'hemianopsia completa', 'hemianopsia bilateral ou cegueira'], f: '0 sem perda · 1 hemianopsia parcial · 2 completa · 3 bilateral' },
    { id: '4', s: 'face', t: 'Paralisia facial', h: 'Mostrar os dentes, erguer as sobrancelhas, fechar os olhos.', o: ['Normal', 'Leve', 'Parcial', 'Completa'],
      p: ['sem paralisia facial', 'paralisia facial leve', 'paralisia facial parcial', 'paralisia facial completa'], f: '0 normal · 1 leve · 2 parcial · 3 completa' },
    { id: '5a', s: 'MSE', t: 'Motor — braço esquerdo', h: 'Braço a 90° sentado ou 45° deitado, por 10 s.', o: ARM, limb: 'MSE', arm: true, f: FARM },
    { id: '5b', s: 'MSD', t: 'Motor — braço direito', h: 'Braço a 90° sentado ou 45° deitado, por 10 s.', o: ARM, limb: 'MSD', arm: true, f: FARM },
    { id: '6a', s: 'MIE', t: 'Motor — perna esquerda', h: 'Perna a 30°, deitado, por 5 s.', o: LEG, limb: 'MIE', arm: false, f: FARM },
    { id: '6b', s: 'MID', t: 'Motor — perna direita', h: 'Perna a 30°, deitado, por 5 s.', o: LEG, limb: 'MID', arm: false, f: FARM },
    { id: '7', s: 'ataxia', t: 'Ataxia de membros', h: 'Índex-nariz e calcanhar-joelho.', o: ['Ausente', 'Em um membro', 'Em dois membros'],
      p: ['sem ataxia', 'ataxia em um membro', 'ataxia em dois membros'], f: '0 ausente · 1 em um membro · 2 em dois membros' },
    { id: '8', s: 'sensibilidade', t: 'Sensibilidade', h: 'Picada de agulha, comparando os lados.', o: ['Normal', 'Perda leve a moderada', 'Perda grave ou total'],
      p: ['sensibilidade preservada', 'hipoestesia leve a moderada', 'hipoestesia grave ou anestesia'], f: '0 normal · 1 perda leve a moderada · 2 perda grave' },
    { id: '9', s: 'linguagem', t: 'Melhor linguagem', h: 'Descrever a figura, nomear objetos, ler frases.', x: 'Material nas págs. 2 a 4 · nomeação: balde, bicicleta, nuvem, semáforo, folha, rato, ponte', o: ['Normal', 'Afasia leve a moderada', 'Afasia grave', 'Mudo ou afasia global'],
      p: ['linguagem normal', 'afasia leve a moderada', 'afasia grave', 'mutismo ou afasia global'], f: '0 normal · 1 afasia leve a moderada · 2 grave · 3 global ou mudo' },
    { id: '10', s: 'disartria', t: 'Disartria', h: 'Ler ou repetir a lista de palavras.', x: 'Palavras na pág. 4', o: ['Normal', 'Leve a moderada', 'Grave'],
      p: ['sem disartria', 'disartria leve a moderada', 'disartria grave'], f: '0 normal · 1 leve a moderada · 2 grave' },
    { id: '11', s: 'extinção', t: 'Extinção e negligência', h: 'Estímulo bilateral simultâneo.', o: ['Normal', 'Em uma modalidade', 'Profunda'],
      p: ['sem extinção ou negligência', 'extinção em uma modalidade', 'negligência profunda'], f: '0 normal · 1 em uma modalidade · 2 profunda' }
  ];
  var MOMENTS = ['Admissão', 'Pós-trombólise', '24 h', 'Alta'];
  var MOM_TXT = { 'Admissão': 'de admissão', 'Pós-trombólise': 'pós-trombólise', '24 h': 'de 24 h', 'Alta': 'de alta' };
  var FMTS = [
    { id: 'lista', label: 'Lista', hint: 'Um item por linha, com o achado entre parênteses.' },
    { id: 'descritivo', label: 'Descritivo', hint: 'Texto corrido, no jeito de uma evolução.' },
    { id: 'linha', label: 'Uma linha', hint: 'Para prontuários que juntam tudo numa linha só.' }
  ];
  var BANDS = {
    none: { label: 'Clique nas respostas', bg: '#EEF2F3', fg: '#33454D' },
    zero: { label: 'Sem déficit', bg: '#E3E8EA', fg: '#12212B' },
    leve: { label: 'Leve', bg: '#F6D58B', fg: '#12212B' },
    mod: { label: 'Moderado', bg: '#F2A65A', fg: '#12212B' },
    modg: { label: 'Moderado a grave', bg: '#E07A4F', fg: '#12212B' },
    grave: { label: 'Grave', bg: '#C2413A', fg: '#FFFFFF' }
  };
  /* --- fim: cópia byte a byte --- */
  return { ARM: ARM, LEG: LEG, FARM: FARM, ITEMS: ITEMS, MOMENTS: MOMENTS, MOM_TXT: MOM_TXT, FMTS: FMTS, BANDS: BANDS };
})();
