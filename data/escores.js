/* Ficha Vermelha — definições dos escores.
   Cada escore: itens (check = critério sim/não; choice = escolha única; group = título de bloco),
   pontos, faixas de interpretação (upTo = limite superior inclusivo) e referência. */
window.ESCORES = [
{
  slug: 'wells-tep', name: 'Wells TEP', title: 'Escore de Wells para TEP', cat: 'Pulmão', kicker: 'Pulmão · Embolia pulmonar',
  size: '7 critérios', featured: true, rank: 2,
  what: 'Probabilidade pré-teste de embolia pulmonar.',
  seo: 'Escore de Wells para TEP em português: some os critérios, veja se o TEP é provável ou improvável, copie para o prontuário e imprima a ficha.',
  kind: 'sum', range: '0 a 12,5',
  items: [
    { id: 'tvp', type: 'check', t: 'Sinais clínicos de TVP', h: 'Edema de perna e dor à palpação das veias profundas.', pts: 3, s: 'sinais de TVP' },
    { id: 'alt', type: 'check', t: 'TEP é o diagnóstico mais provável', h: 'Diagnósticos alternativos são menos prováveis que TEP.', pts: 3, s: 'TEP é o diagnóstico mais provável' },
    { id: 'fc', type: 'check', t: 'Frequência cardíaca > 100 bpm', pts: 1.5, s: 'FC > 100' },
    { id: 'imob', type: 'check', t: 'Imobilização ou cirurgia recente', h: 'Imobilização ≥ 3 dias ou cirurgia nas últimas 4 semanas.', pts: 1.5, s: 'imobilização ou cirurgia recente' },
    { id: 'prev', type: 'check', t: 'TVP ou TEP prévios', h: 'Com diagnóstico objetivo.', pts: 1.5, s: 'TVP/TEP prévios' },
    { id: 'hemop', type: 'check', t: 'Hemoptise', pts: 1, s: 'hemoptise' },
    { id: 'cancer', type: 'check', t: 'Câncer ativo', h: 'Em tratamento nos últimos 6 meses ou em cuidado paliativo.', pts: 1, s: 'câncer ativo' }
  ],
  bands: [
    { upTo: 4, r: '≤ 4', label: 'TEP improvável', level: 1, text: 'Dosar D-dímero. Se normal, TEP afastado. Na suspeita muito baixa, o PERC pode dispensar o D-dímero.' },
    { upTo: Infinity, r: '> 4', label: 'TEP provável', level: 3, text: 'Angiotomografia de tórax. Se contraindicada, cintilografia V/Q ou USG venoso de membros inferiores.' }
  ],
  alt: { title: 'Modelo de três níveis', bands: [
    { upTo: 1.5, r: '< 2', label: 'baixa probabilidade' },
    { upTo: 6, r: '2 a 6', label: 'probabilidade moderada' },
    { upTo: Infinity, r: '> 6', label: 'alta probabilidade' }
  ] },
  note: 'Use em pacientes com suspeita clínica de TEP.',
  ref: 'Wells PS et al. Thromb Haemost. 2000;83:416-20.'
},
{
  slug: 'wells-tvp', name: 'Wells TVP', title: 'Escore de Wells para TVP', cat: 'Vascular', kicker: 'Vascular · Trombose venosa profunda',
  size: '10 critérios', featured: true, rank: 3,
  what: 'Probabilidade de trombose venosa profunda.',
  seo: 'Escore de Wells para TVP em português: some os critérios, veja se a TVP é provável ou improvável, copie para o prontuário e imprima a ficha.',
  kind: 'sum', range: '−2 a 9',
  items: [
    { id: 'cancer', type: 'check', t: 'Câncer ativo', h: 'Em tratamento atual, nos últimos 6 meses ou paliativo.', pts: 1, s: 'câncer ativo' },
    { id: 'paresia', type: 'check', t: 'Paralisia, paresia ou imobilização gessada recente de membro inferior', pts: 1, s: 'paresia ou gesso em MI' },
    { id: 'acamado', type: 'check', t: 'Acamado ≥ 3 dias ou cirurgia maior recente', h: 'Cirurgia maior com anestesia geral ou regional nas últimas 12 semanas.', pts: 1, s: 'acamado ou cirurgia maior recente' },
    { id: 'dor', type: 'check', t: 'Dor à palpação no trajeto do sistema venoso profundo', pts: 1, s: 'dor no trajeto venoso profundo' },
    { id: 'perna', type: 'check', t: 'Edema de toda a perna', pts: 1, s: 'edema de toda a perna' },
    { id: 'pant', type: 'check', t: 'Panturrilha ≥ 3 cm maior que a do lado assintomático', h: 'Medida 10 cm abaixo da tuberosidade da tíbia.', pts: 1, s: 'panturrilha ≥ 3 cm maior' },
    { id: 'cacifo', type: 'check', t: 'Edema com cacifo restrito à perna sintomática', pts: 1, s: 'cacifo na perna sintomática' },
    { id: 'colat', type: 'check', t: 'Veias superficiais colaterais (não varicosas)', pts: 1, s: 'veias colaterais' },
    { id: 'previa', type: 'check', t: 'TVP prévia documentada', pts: 1, s: 'TVP prévia' },
    { id: 'altdx', type: 'check', t: 'Diagnóstico alternativo tão ou mais provável que TVP', pts: -2, s: 'diagnóstico alternativo provável' }
  ],
  bands: [
    { upTo: 1, r: '≤ 1', label: 'TVP improvável', level: 1, text: 'Dosar D-dímero. Se normal, TVP afastada; se elevado, USG venoso de membros inferiores.' },
    { upTo: Infinity, r: '≥ 2', label: 'TVP provável', level: 3, text: 'USG venoso (doppler) de membros inferiores. Se negativo, considerar D-dímero ou repetir o exame em 1 semana.' }
  ],
  alt: { title: 'Modelo de três níveis', bands: [
    { upTo: 0, r: '≤ 0', label: 'baixa probabilidade' },
    { upTo: 2, r: '1 a 2', label: 'probabilidade moderada' },
    { upTo: Infinity, r: '≥ 3', label: 'alta probabilidade' }
  ] },
  note: 'Na suspeita bilateral, avalie a perna mais sintomática.',
  ref: 'Wells PS et al. N Engl J Med. 2003;349:1227-35.'
},
{
  slug: 'glasgow-blatchford', name: 'Glasgow-Blatchford', title: 'Escore de Glasgow-Blatchford', cat: 'Digestivo', kicker: 'Digestivo · Hemorragia digestiva alta',
  size: '8 variáveis', featured: true, rank: 5,
  what: 'Hemorragia digestiva alta: risco e quem pode ir para casa.',
  seo: 'Escore de Glasgow-Blatchford em português, com ureia em mg/dL: veja o risco na hemorragia digestiva alta, copie para o prontuário e imprima a ficha.',
  kind: 'sum', range: '0 a 23',
  items: [
    { id: 'ureia', type: 'choice', t: 'Ureia sérica', h: 'Em mg/dL (ureia, não BUN).', s: 'ureia (mg/dL)', opts: [
      { l: '≤ 39', p: 0 }, { l: '40 a 48', p: 2 }, { l: '49 a 60', p: 3 }, { l: '61 a 150', p: 4 }, { l: '≥ 151', p: 6 } ] },
    { id: 'hb', type: 'choice', t: 'Hemoglobina', h: 'Em g/dL.', s: 'Hb (g/dL)', opts: [
      { l: 'Homem ≥ 13 ou mulher ≥ 12', p: 0 }, { l: 'Homem 12 a 12,9', p: 1 }, { l: 'Homem 10 a 11,9', p: 3 }, { l: 'Mulher 10 a 11,9', p: 1 }, { l: '< 10', p: 6 } ] },
    { id: 'pas', type: 'choice', t: 'Pressão arterial sistólica', h: 'Em mmHg.', s: 'PAS (mmHg)', opts: [
      { l: '≥ 110', p: 0 }, { l: '100 a 109', p: 1 }, { l: '90 a 99', p: 2 }, { l: '< 90', p: 3 } ] },
    { id: 'fc', type: 'check', t: 'Frequência cardíaca ≥ 100 bpm', pts: 1, s: 'FC ≥ 100' },
    { id: 'melena', type: 'check', t: 'Melena', pts: 1, s: 'melena' },
    { id: 'sincope', type: 'check', t: 'Síncope', pts: 2, s: 'síncope' },
    { id: 'hep', type: 'check', t: 'Doença hepática', h: 'Hepatopatia conhecida ou evidência clínica e laboratorial.', pts: 2, s: 'doença hepática' },
    { id: 'ic', type: 'check', t: 'Insuficiência cardíaca', h: 'Conhecida ou com evidência clínica e ecocardiográfica.', pts: 2, s: 'insuficiência cardíaca' }
  ],
  bands: [
    { upTo: 1, r: '0 a 1', label: 'Risco muito baixo', level: 1, text: 'Candidato a alta com endoscopia ambulatorial, se estável e com seguimento garantido.' },
    { upTo: Infinity, r: '≥ 2', label: 'Risco não baixo', level: 3, text: 'Internação e endoscopia digestiva alta. Quanto maior o escore, maior a chance de precisar de transfusão, endoscopia terapêutica ou cirurgia.' }
  ],
  note: 'Ureia convertida de mmol/L para mg/dL. A alta com escore 0 foi validada por Stanley et al. (2009); as diretrizes mais recentes aceitam até 1.',
  ref: 'Blatchford O et al. Lancet. 2000;356:1318-21. Stanley AJ et al. Lancet. 2009;373:42-7.'
},
{
  slug: 'oakland', name: 'Oakland', title: 'Escore de Oakland', cat: 'Digestivo', kicker: 'Digestivo · Hemorragia digestiva baixa',
  size: '7 variáveis', featured: true, rank: 6,
  what: 'Hemorragia digestiva baixa: quem pode ter alta com segurança.',
  seo: 'Escore de Oakland em português: veja se o paciente com hemorragia digestiva baixa pode ter alta com segurança, copie para o prontuário e imprima a ficha.',
  kind: 'sum', range: '0 a 35',
  items: [
    { id: 'idade', type: 'choice', t: 'Idade', s: 'idade', opts: [ { l: '< 40 anos', p: 0 }, { l: '40 a 69 anos', p: 1 }, { l: '≥ 70 anos', p: 2 } ] },
    { id: 'sexo', type: 'choice', t: 'Sexo', s: 'sexo', opts: [ { l: 'Feminino', p: 0 }, { l: 'Masculino', p: 1 } ] },
    { id: 'previa', type: 'check', t: 'Internação prévia por hemorragia digestiva baixa', pts: 1, s: 'internação prévia por HDB' },
    { id: 'toque', type: 'check', t: 'Sangue no toque retal', pts: 1, s: 'sangue no toque retal' },
    { id: 'fc', type: 'choice', t: 'Frequência cardíaca', h: 'Em bpm.', s: 'FC', opts: [ { l: '< 70', p: 0 }, { l: '70 a 89', p: 1 }, { l: '90 a 109', p: 2 }, { l: '≥ 110', p: 3 } ] },
    { id: 'pas', type: 'choice', t: 'Pressão arterial sistólica', h: 'Em mmHg.', s: 'PAS', opts: [ { l: '< 90', p: 5 }, { l: '90 a 119', p: 4 }, { l: '120 a 129', p: 3 }, { l: '130 a 159', p: 2 }, { l: '≥ 160', p: 0 } ] },
    { id: 'hb', type: 'choice', t: 'Hemoglobina', h: 'Em g/dL.', s: 'Hb', opts: [ { l: '< 7', p: 22 }, { l: '7 a 8,9', p: 17 }, { l: '9 a 10,9', p: 13 }, { l: '11 a 12,9', p: 8 }, { l: '13 a 15,9', p: 4 }, { l: '≥ 16', p: 0 } ] }
  ],
  bands: [
    { upTo: 8, r: '≤ 8', label: 'Alta segura provável', level: 1, text: 'Cerca de 95% de chance de alta segura: considerar alta com investigação ambulatorial.' },
    { upTo: Infinity, r: '> 8', label: 'Internar', level: 3, text: 'Internação para investigação e tratamento.' }
  ],
  note: 'Para hemorragia digestiva baixa aguda em adultos.',
  ref: 'Oakland K et al. Lancet Gastroenterol Hepatol. 2017;2:635-43.'
},
{
  slug: 'regra-canadense', name: 'Regra Canadense', title: 'Regra Canadense da TC de crânio', cat: 'Trauma', kicker: 'Trauma · TCE leve',
  size: '7 critérios', featured: true, rank: 7,
  what: 'Quando pedir TC de crânio no TCE leve.',
  seo: 'Regra Canadense da TC de crânio (Canadian CT Head Rule) em português: veja se o TCE leve precisa de tomografia, copie para o prontuário e imprima a ficha.',
  kind: 'rule',
  items: [
    { type: 'group', t: 'Alto risco (intervenção neurocirúrgica)' },
    { id: 'ecg2h', type: 'check', risk: 'alto', t: 'ECG < 15 duas horas após o trauma', s: 'ECG < 15 em 2 h' },
    { id: 'fx', type: 'check', risk: 'alto', t: 'Suspeita de fratura de crânio aberta ou com afundamento', s: 'suspeita de fratura aberta ou com afundamento' },
    { id: 'base', type: 'check', risk: 'alto', t: 'Sinal de fratura de base de crânio', h: 'Hemotímpano, olhos de guaxinim, otorreia ou rinorreia de líquor, sinal de Battle.', s: 'sinal de fratura de base de crânio' },
    { id: 'vom', type: 'check', risk: 'alto', t: 'Vômitos (2 ou mais episódios)', s: 'vômitos ≥ 2' },
    { id: 'idade', type: 'check', risk: 'alto', t: 'Idade ≥ 65 anos', s: 'idade ≥ 65' },
    { type: 'group', t: 'Médio risco (lesão na TC)' },
    { id: 'amn', type: 'check', risk: 'medio', t: 'Amnésia retrógrada ≥ 30 minutos', h: 'Esquecimento de eventos de antes do impacto.', s: 'amnésia retrógrada ≥ 30 min' },
    { id: 'mec', type: 'check', risk: 'medio', t: 'Mecanismo perigoso', h: 'Atropelamento, ejeção do veículo, queda de altura ≥ 0,9 m ou de 5 ou mais degraus.', s: 'mecanismo perigoso' }
  ],
  bands: [
    { key: 'alto', r: 'Algum critério de alto risco', label: 'TC indicada — alto risco', level: 4, text: 'Tomografia de crânio. Risco de lesão com necessidade de intervenção neurocirúrgica.' },
    { key: 'medio', r: 'Só critério de médio risco', label: 'TC indicada — médio risco', level: 3, text: 'Tomografia de crânio. Risco de lesão cerebral visível na TC.' },
    { key: 'nenhum', r: 'Nenhum critério', label: 'TC não indicada pela regra', level: 1, text: 'A regra dispensa a tomografia. Orientar sinais de alarme na alta.' }
  ],
  note: 'Vale para TCE leve (ECG 13 a 15) com perda de consciência, amnésia ou desorientação testemunhadas. Não se aplica a menores de 16 anos, uso de anticoagulante ou distúrbio de coagulação, convulsão após o trauma, fratura exposta evidente, déficit focal, instabilidade hemodinâmica ou gestação.',
  ref: 'Stiell IG et al. Lancet. 2001;357:1391-6.'
},
{
  slug: 'alvarado', name: 'Alvarado', title: 'Escore de Alvarado', cat: 'Abdome', kicker: 'Abdome · Apendicite aguda',
  size: '8 itens', featured: true, rank: 8,
  what: 'Probabilidade de apendicite aguda.',
  seo: 'Escore de Alvarado (MANTRELS) em português: veja a probabilidade de apendicite aguda, copie para o prontuário e imprima a ficha.',
  kind: 'sum', range: '0 a 10',
  items: [
    { type: 'group', t: 'Sintomas' },
    { id: 'migr', type: 'check', t: 'Dor migratória para a fossa ilíaca direita', pts: 1, s: 'dor migratória para FID' },
    { id: 'anorex', type: 'check', t: 'Anorexia', pts: 1, s: 'anorexia' },
    { id: 'nausea', type: 'check', t: 'Náuseas ou vômitos', pts: 1, s: 'náuseas ou vômitos' },
    { type: 'group', t: 'Sinais' },
    { id: 'dorfid', type: 'check', t: 'Dor à palpação na fossa ilíaca direita', pts: 2, s: 'dor à palpação em FID' },
    { id: 'blumb', type: 'check', t: 'Descompressão brusca dolorosa', h: 'Sinal de Blumberg.', pts: 1, s: 'descompressão brusca dolorosa' },
    { id: 'temp', type: 'check', t: 'Temperatura ≥ 37,3 °C', pts: 1, s: 'temperatura ≥ 37,3 °C' },
    { type: 'group', t: 'Laboratório' },
    { id: 'leuco', type: 'check', t: 'Leucocitose > 10.000/mm³', pts: 2, s: 'leucocitose > 10.000' },
    { id: 'desvio', type: 'check', t: 'Desvio à esquerda', h: 'Neutrófilos > 75%.', pts: 1, s: 'desvio à esquerda' }
  ],
  bands: [
    { upTo: 4, r: '0 a 4', label: 'Baixa probabilidade', level: 1, text: 'Apendicite improvável. Considerar outros diagnósticos e reavaliar.' },
    { upTo: 6, r: '5 a 6', label: 'Apendicite possível', level: 2, text: 'Observação e exame de imagem (USG ou TC).' },
    { upTo: 8, r: '7 a 8', label: 'Apendicite provável', level: 3, text: 'Avaliação cirúrgica.' },
    { upTo: Infinity, r: '9 a 10', label: 'Apendicite muito provável', level: 4, text: 'Avaliação cirúrgica.' }
  ],
  note: 'Sensibilidade boa para afastar apendicite com escore baixo; a especificidade é menor em mulheres e crianças.',
  ref: 'Alvarado A. Ann Emerg Med. 1986;15:557-64.'
},
{
  slug: 'glasgow', name: 'Glasgow', title: 'Escala de Coma de Glasgow', cat: 'Neuro', kicker: 'Neuro · Nível de consciência',
  size: '3 itens + pupilas',
  what: 'Nível de consciência, com resposta pupilar.',
  seo: 'Escala de Coma de Glasgow com resposta pupilar (ECG-P) em português: calcule, copie para o prontuário e imprima a ficha.',
  kind: 'glasgow', range: '3 a 15 (ECG-P: 1 a 15)',
  items: [
    { id: 'o', type: 'choice', t: 'Abertura ocular', s: 'O', opts: [ { l: 'Espontânea', p: 4 }, { l: 'Ao som', p: 3 }, { l: 'À pressão', p: 2 }, { l: 'Ausente', p: 1 } ] },
    { id: 'v', type: 'choice', t: 'Resposta verbal', s: 'V', opts: [ { l: 'Orientada', p: 5 }, { l: 'Confusa', p: 4 }, { l: 'Palavras', p: 3 }, { l: 'Sons', p: 2 }, { l: 'Ausente', p: 1 } ] },
    { id: 'm', type: 'choice', t: 'Resposta motora', s: 'M', opts: [ { l: 'Obedece a comandos', p: 6 }, { l: 'Localiza', p: 5 }, { l: 'Flexão normal', p: 4 }, { l: 'Flexão anormal', p: 3 }, { l: 'Extensão', p: 2 }, { l: 'Ausente', p: 1 } ] },
    { id: 'pup', type: 'choice', optional: true, t: 'Reatividade pupilar (opcional)', h: 'Para a ECG-P: subtrai do total.', s: 'pupilas', opts: [ { l: 'Ambas reagem', p: 0 }, { l: 'Uma não reage', p: -1 }, { l: 'Nenhuma reage', p: -2 } ] }
  ],
  bands: [
    { upTo: 8, r: '3 a 8', label: 'Grave', level: 4, text: 'Rebaixamento grave do nível de consciência. Avaliar proteção de via aérea.' },
    { upTo: 12, r: '9 a 12', label: 'Moderado', level: 3, text: 'Rebaixamento moderado. Monitorização neurológica frequente.' },
    { upTo: Infinity, r: '13 a 15', label: 'Leve', level: 1, text: 'Rebaixamento leve ou ausente. Reavaliar periodicamente.' }
  ],
  note: 'Se algum componente não puder ser testado (por exemplo, paciente intubado ou com edema palpebral), registre como NT e não some o total.',
  ref: 'Teasdale G, Jennett B. Lancet. 1974;2:81-4. Teasdale G et al. Lancet Neurol. 2014;13:844-54. ECG-P: Brennan PM et al. J Neurosurg. 2018;128:1612-20.'
},
{
  slug: 'heart', name: 'HEART', title: 'Escore HEART', cat: 'Cardio', kicker: 'Cardio · Dor torácica',
  size: '5 itens', featured: true, rank: 4,
  what: 'Risco de evento cardíaco na dor torácica.',
  seo: 'Escore HEART em português: veja o risco de evento cardíaco maior na dor torácica, copie para o prontuário e imprima a ficha.',
  kind: 'sum', range: '0 a 10',
  items: [
    { id: 'h', type: 'choice', t: 'História', s: 'história', opts: [ { l: 'Pouco suspeita', p: 0 }, { l: 'Moderadamente suspeita', p: 1 }, { l: 'Muito suspeita', p: 2 } ] },
    { id: 'e', type: 'choice', t: 'ECG', h: 'Inespecífico: bloqueio de ramo, sobrecarga ventricular, alterações de repolarização.', s: 'ECG', opts: [ { l: 'Normal', p: 0 }, { l: 'Alteração inespecífica', p: 1 }, { l: 'Desvio significativo do ST', p: 2 } ] },
    { id: 'a', type: 'choice', t: 'Idade', s: 'idade', opts: [ { l: '< 45 anos', p: 0 }, { l: '45 a 64 anos', p: 1 }, { l: '≥ 65 anos', p: 2 } ] },
    { id: 'r', type: 'choice', t: 'Fatores de risco', h: 'HAS, DM, dislipidemia, tabagismo, obesidade, história familiar de DAC precoce.', s: 'fatores de risco', opts: [ { l: 'Nenhum', p: 0 }, { l: '1 ou 2 fatores', p: 1 }, { l: '≥ 3 fatores ou aterosclerose conhecida', p: 2 } ] },
    { id: 't', type: 'choice', t: 'Troponina inicial', h: 'Em relação ao limite superior da normalidade.', s: 'troponina', opts: [ { l: '≤ limite normal', p: 0 }, { l: '1 a 3 × o limite', p: 1 }, { l: '> 3 × o limite', p: 2 } ] }
  ],
  bands: [
    { upTo: 3, r: '0 a 3', label: 'Baixo risco', level: 1, text: 'Risco de evento cardíaco maior em 6 semanas em torno de 1,7%. Candidato a alta precoce com seguimento.' },
    { upTo: 6, r: '4 a 6', label: 'Risco moderado', level: 2, text: 'Risco em torno de 17%. Observação, troponina seriada e investigação adicional.' },
    { upTo: Infinity, r: '7 a 10', label: 'Alto risco', level: 4, text: 'Risco em torno de 50%. Estratégia invasiva precoce.' }
  ],
  note: 'Aterosclerose conhecida: infarto prévio, revascularização, AVC ou doença arterial periférica.',
  ref: 'Six AJ, Backus BE, Kelder JC. Neth Heart J. 2008;16:191-6. Backus BE et al. Int J Cardiol. 2013;168:2153-8.'
},
{
  slug: 'perc', name: 'PERC', title: 'Regra PERC', cat: 'Pulmão', kicker: 'Pulmão · Embolia pulmonar',
  size: '8 critérios',
  what: 'Afastar TEP sem exames no baixo risco.',
  seo: 'Regra PERC em português: veja se dá para afastar TEP sem D-dímero no paciente de baixo risco, copie para o prontuário e imprima a ficha.',
  kind: 'rule',
  items: [
    { id: 'idade', type: 'check', t: 'Idade ≥ 50 anos', s: 'idade ≥ 50' },
    { id: 'fc', type: 'check', t: 'Frequência cardíaca ≥ 100 bpm', s: 'FC ≥ 100' },
    { id: 'sat', type: 'check', t: 'SpO₂ < 95% em ar ambiente', s: 'SpO₂ < 95%' },
    { id: 'hemop', type: 'check', t: 'Hemoptise', s: 'hemoptise' },
    { id: 'estrog', type: 'check', t: 'Uso de estrogênio', h: 'Anticoncepcional oral ou reposição hormonal.', s: 'uso de estrogênio' },
    { id: 'prev', type: 'check', t: 'TVP ou TEP prévios', s: 'TVP/TEP prévios' },
    { id: 'edema', type: 'check', t: 'Edema unilateral de perna', s: 'edema unilateral' },
    { id: 'cir', type: 'check', t: 'Cirurgia ou trauma com internação nas últimas 4 semanas', s: 'cirurgia ou trauma recente' }
  ],
  bands: [
    { key: 'neg', r: 'Nenhum critério', label: 'PERC negativo', level: 1, text: 'Com probabilidade clínica baixa, TEP pode ser afastado sem D-dímero.' },
    { key: 'pos', r: '1 ou mais critérios', label: 'PERC positivo', level: 3, text: 'Não afasta TEP. Seguir com Wells e D-dímero.' }
  ],
  note: 'Só use se a probabilidade clínica de TEP for baixa (menor que 15% pela impressão clínica).',
  ref: 'Kline JA et al. J Thromb Haemost. 2004;2:1247-55.'
},
{
  slug: 'curb-65', name: 'CURB-65', title: 'Escore CURB-65', cat: 'Pulmão', kicker: 'Pulmão · Pneumonia',
  size: '5 critérios',
  what: 'Gravidade da pneumonia e onde tratar.',
  seo: 'Escore CURB-65 em português: veja a gravidade da pneumonia adquirida na comunidade e onde tratar, copie para o prontuário e imprima a ficha.',
  kind: 'sum', range: '0 a 5',
  items: [
    { id: 'c', type: 'check', t: 'Confusão mental', h: 'De início recente.', pts: 1, s: 'confusão' },
    { id: 'u', type: 'check', t: 'Ureia > 50 mg/dL', h: 'Corte da diretriz brasileira. No original: > 7 mmol/L (cerca de 42 mg/dL).', pts: 1, s: 'ureia > 50' },
    { id: 'r', type: 'check', t: 'Frequência respiratória ≥ 30 irpm', pts: 1, s: 'FR ≥ 30' },
    { id: 'b', type: 'check', t: 'PAS < 90 ou PAD ≤ 60 mmHg', pts: 1, s: 'hipotensão' },
    { id: 'i', type: 'check', t: 'Idade ≥ 65 anos', pts: 1, s: 'idade ≥ 65' }
  ],
  bands: [
    { upTo: 1, r: '0 a 1', label: 'Baixa gravidade', level: 1, text: 'Candidato a tratamento ambulatorial.' },
    { upTo: 2, r: '2', label: 'Gravidade intermediária', level: 2, text: 'Considerar internação ou observação curta.' },
    { upTo: Infinity, r: '3 a 5', label: 'Pneumonia grave', level: 4, text: 'Internação. Com 4 ou 5 pontos, avaliar UTI.' }
  ],
  note: 'O julgamento clínico e fatores sociais podem justificar internar mesmo com escore baixo.',
  ref: 'Lim WS et al. Thorax. 2003;58:377-82.'
},
{
  slug: 'ottawa', name: 'Ottawa', title: 'Regras de Ottawa para tornozelo e pé', cat: 'Trauma', kicker: 'Trauma · Entorse de tornozelo',
  size: '7 critérios',
  what: 'Raio X de tornozelo e pé: quando pedir.',
  seo: 'Regras de Ottawa para tornozelo e pé em português: veja quando pedir raio X na entorse, copie para o prontuário e imprima a ficha.',
  kind: 'rule',
  items: [
    { type: 'group', t: 'Tornozelo' },
    { id: 'malzona', type: 'check', t: 'Dor na região maleolar', s: 'dor na região maleolar' },
    { id: 'lat', type: 'check', t: 'Dor óssea na borda posterior ou ponta do maléolo lateral', h: 'Nos 6 cm distais.', s: 'dor no maléolo lateral' },
    { id: 'med', type: 'check', t: 'Dor óssea na borda posterior ou ponta do maléolo medial', h: 'Nos 6 cm distais.', s: 'dor no maléolo medial' },
    { type: 'group', t: 'Pé' },
    { id: 'mediope', type: 'check', t: 'Dor no médio-pé', s: 'dor no médio-pé' },
    { id: 'meta5', type: 'check', t: 'Dor óssea na base do 5º metatarso', s: 'dor na base do 5º metatarso' },
    { id: 'navic', type: 'check', t: 'Dor óssea no navicular', s: 'dor no navicular' },
    { type: 'group', t: 'Vale para os dois' },
    { id: 'apoio', type: 'check', t: 'Incapaz de dar 4 passos', h: 'Logo após o trauma e na emergência.', s: 'incapaz de dar 4 passos' }
  ],
  bands: [
    { key: 'ambos', r: 'Critérios de tornozelo e de pé', label: 'RX de tornozelo e de pé', level: 3, text: 'Solicitar radiografia de tornozelo e de pé.' },
    { key: 'tornozelo', r: 'Dor maleolar + achado', label: 'RX de tornozelo', level: 3, text: 'Solicitar radiografia de tornozelo.' },
    { key: 'pe', r: 'Dor no médio-pé + achado', label: 'RX de pé', level: 3, text: 'Solicitar radiografia de pé.' },
    { key: 'nenhum', r: 'Nenhuma combinação', label: 'RX não indicado pela regra', level: 1, text: 'A regra dispensa a radiografia.' }
  ],
  note: 'Para trauma agudo de tornozelo em adultos. Não se aplica a intoxicação, lesão que desvia a atenção, alteração de sensibilidade ou trauma com mais de 10 dias.',
  ref: 'Stiell IG et al. JAMA. 1993;269:1127-32.'
},
{
  slug: 'nexus', name: 'NEXUS', title: 'Critérios NEXUS da coluna cervical', cat: 'Trauma', kicker: 'Trauma · Coluna cervical',
  size: '5 critérios',
  what: 'Quando pedir imagem da coluna cervical no trauma.',
  seo: 'Critérios NEXUS em português: veja se o paciente com trauma precisa de imagem da coluna cervical, copie para o prontuário e imprima a ficha.',
  kind: 'rule',
  items: [
    { id: 'dor', type: 'check', t: 'Dor à palpação na linha média posterior da coluna cervical', s: 'dor na linha média cervical' },
    { id: 'alerta', type: 'check', t: 'Alteração do nível de consciência', h: 'ECG < 15, desorientação, resposta lenta ou inadequada, dificuldade de memorizar.', s: 'alteração da consciência' },
    { id: 'intox', type: 'check', t: 'Sinais de intoxicação', h: 'Por álcool ou outras drogas, pela história ou pelo exame.', s: 'intoxicação' },
    { id: 'deficit', type: 'check', t: 'Déficit neurológico focal', s: 'déficit focal' },
    { id: 'distr', type: 'check', t: 'Lesão dolorosa que desvia a atenção', h: 'Por exemplo, fratura de osso longo, lesão visceral que exija avaliação cirúrgica, grande laceração ou queimadura extensa.', s: 'lesão que desvia a atenção' }
  ],
  bands: [
    { key: 'neg', r: 'Nenhum critério', label: 'Imagem dispensada pela regra', level: 1, text: 'Sem imagem da coluna cervical; a proteção cervical pode ser retirada após o exame clínico.' },
    { key: 'pos', r: '1 ou mais critérios', label: 'Imagem indicada', level: 3, text: 'Solicitar imagem da coluna cervical e manter a proteção cervical até a avaliação.' }
  ],
  note: 'Para trauma contuso. Em adultos alertas e estáveis, a Regra Canadense da coluna cervical teve melhor desempenho em estudo comparativo.',
  ref: 'Hoffman JR et al. N Engl J Med. 2000;343:94-9.'
},
{
  slug: 'canadense-cervical', name: 'Canadense cervical', title: 'Regra Canadense da coluna cervical', cat: 'Trauma', kicker: 'Trauma · Coluna cervical',
  size: '3 etapas',
  what: 'Imagem da coluna cervical no adulto alerta e estável.',
  seo: 'Regra Canadense da coluna cervical (Canadian C-Spine Rule) em português: veja se o adulto com trauma precisa de imagem cervical, copie para o prontuário e imprima a ficha.',
  kind: 'rule',
  items: [
    { type: 'group', t: '1. Algum fator de alto risco?' },
    { id: 'idade', type: 'check', risk: 'alto', t: 'Idade ≥ 65 anos', s: 'idade ≥ 65' },
    { id: 'mec', type: 'check', risk: 'alto', t: 'Mecanismo perigoso', h: 'Queda de ≥ 0,9 m ou 5 degraus; carga axial na cabeça (mergulho); colisão em alta velocidade (> 100 km/h), capotamento ou ejeção; veículo recreativo motorizado; colisão de bicicleta.', s: 'mecanismo perigoso' },
    { id: 'parest', type: 'check', risk: 'alto', t: 'Parestesias nas extremidades', s: 'parestesias' },
    { type: 'group', t: '2. Algum fator de baixo risco?' },
    { id: 'traseira', type: 'check', risk: 'baixo', t: 'Colisão traseira simples', h: 'Não conta se foi empurrado para o trânsito, atingido por ônibus ou caminhão grande, capotou ou foi atingido em alta velocidade.', s: 'colisão traseira simples' },
    { id: 'sentado', type: 'check', risk: 'baixo', t: 'Sentado na sala de emergência', s: 'sentado na emergência' },
    { id: 'deambula', type: 'check', risk: 'baixo', t: 'Deambulou em algum momento após o trauma', s: 'deambulou' },
    { id: 'tardia', type: 'check', risk: 'baixo', t: 'Dor cervical de início tardio', h: 'Não começou logo após o trauma.', s: 'dor de início tardio' },
    { id: 'semdor', type: 'check', risk: 'baixo', t: 'Sem dor à palpação na linha média cervical', s: 'sem dor na linha média' },
    { type: 'group', t: '3. Mobilidade (só se houver fator de baixo risco)' },
    { id: 'rotacao', type: 'check', risk: 'rot', t: 'Consegue rodar ativamente o pescoço 45° para os dois lados', s: 'roda o pescoço 45°' }
  ],
  bands: [
    { key: 'alto', r: 'Fator de alto risco', label: 'Imagem indicada — alto risco', level: 3, text: 'Solicitar imagem da coluna cervical e manter a proteção cervical.' },
    { key: 'semBaixo', r: 'Nenhum fator de baixo risco', label: 'Imagem indicada — sem fator de baixo risco', level: 3, text: 'Não é seguro testar a mobilidade: solicitar imagem da coluna cervical.' },
    { key: 'semRotacao', r: 'Não roda 45°', label: 'Imagem indicada — não roda o pescoço', level: 3, text: 'Solicitar imagem da coluna cervical.' },
    { key: 'dispensa', r: 'Baixo risco e roda 45°', label: 'Imagem dispensada pela regra', level: 1, text: 'Sem imagem da coluna cervical.' }
  ],
  note: 'Para adultos alertas (ECG 15) e estáveis com trauma contuso. Estável: PAS ≥ 90 mmHg e FR entre 10 e 24 irpm. Não se aplica a menores de 16 anos, paralisia aguda, doença vertebral conhecida, cirurgia cervical prévia, trauma penetrante, gestação, trauma com mais de 48 horas ou retorno para reavaliar a mesma lesão.',
  ref: 'Stiell IG et al. JAMA. 2001;286:1841-8.'
},
{
  slug: 'pecarn', name: 'PECARN', title: 'Regra PECARN para TCE na criança', cat: 'Trauma', kicker: 'Trauma · TCE pediátrico',
  size: 'Por idade',
  what: 'TC de crânio no TCE leve em criança.',
  seo: 'Regra PECARN em português: veja se a criança com TCE leve precisa de TC de crânio, nas faixas de menos de 2 anos e de 2 anos ou mais. Copie para o prontuário e imprima a ficha.',
  kind: 'rule',
  items: [
    { id: 'idade', type: 'choice', t: 'Idade', s: 'idade', noPts: true, opts: [ { l: 'Menos de 2 anos', p: 0 }, { l: '2 anos ou mais', p: 0 } ] },
    { type: 'group', t: 'Alto risco' },
    { id: 'ams', type: 'check', risk: 'alto', t: 'ECG 14 ou outro sinal de alteração do estado mental', h: 'Agitação, sonolência, perguntas repetitivas ou resposta verbal lenta.', s: 'ECG 14 ou alteração do estado mental' },
    { id: 'fxpalp', type: 'check', risk: 'alto', showIf: { idade: 0 }, t: 'Fratura de crânio palpável', s: 'fratura palpável' },
    { id: 'base', type: 'check', risk: 'alto', showIf: { idade: 1 }, t: 'Sinais de fratura de base de crânio', h: 'Hemotímpano, olhos de guaxinim, sinal de Battle, otorreia ou rinorreia de líquor.', s: 'sinais de fratura de base' },
    { type: 'group', t: 'Risco intermediário' },
    { id: 'hemat', type: 'check', risk: 'medio', showIf: { idade: 0 }, t: 'Hematoma de couro cabeludo occipital, parietal ou temporal', s: 'hematoma não frontal' },
    { id: 'loc5', type: 'check', risk: 'medio', showIf: { idade: 0 }, t: 'Perda de consciência por 5 segundos ou mais', s: 'perda de consciência ≥ 5 s' },
    { id: 'normal', type: 'check', risk: 'medio', showIf: { idade: 0 }, t: 'Não está agindo normalmente, segundo os pais', s: 'comportamento alterado segundo os pais' },
    { id: 'loc', type: 'check', risk: 'medio', showIf: { idade: 1 }, t: 'História de perda de consciência', s: 'perda de consciência' },
    { id: 'vom', type: 'check', risk: 'medio', showIf: { idade: 1 }, t: 'Vômitos', s: 'vômitos' },
    { id: 'cefaleia', type: 'check', risk: 'medio', showIf: { idade: 1 }, t: 'Cefaleia intensa', s: 'cefaleia intensa' },
    { id: 'mec', type: 'check', risk: 'medio', t: 'Mecanismo grave', h: 'Ejeção, capotamento ou morte de outro ocupante; pedestre ou ciclista sem capacete atingido por veículo; queda > 0,9 m (menos de 2 anos) ou > 1,5 m (2 anos ou mais); cabeça atingida por objeto em alta velocidade.', s: 'mecanismo grave' }
  ],
  bands: [
    { key: 'alto', r: 'Algum critério de alto risco', label: 'TC recomendada', level: 4, text: 'TC de crânio. Risco de lesão cerebral clinicamente importante em torno de 4%.' },
    { key: 'medio', r: 'Só critério intermediário', label: 'Observar ou TC', level: 2, text: 'Observação ou TC, conforme a experiência do médico, vários achados, piora durante a observação, idade menor que 3 meses e preferência dos pais. Risco em torno de 1%.' },
    { key: 'baixo', r: 'Nenhum critério', label: 'TC não recomendada', level: 1, text: 'Risco de lesão clinicamente importante menor que 0,02% (menos de 2 anos) ou 0,05% (2 anos ou mais). Orientar sinais de alarme na alta.' }
  ],
  note: 'Para menores de 18 anos com TCE nas últimas 24 horas e ECG 14 ou 15. Não se aplica a trauma trivial (queda da própria altura ou bater andando ou correndo em objeto parado, sem sinais além de escoriação ou laceração do couro cabeludo), trauma penetrante, tumor cerebral, doença neurológica prévia que dificulte a avaliação, derivação ventricular, distúrbio de coagulação ou TC feita antes da chegada.',
  ref: 'Kuppermann N et al. Lancet. 2009;374:1160-70.'
},
{
  slug: 'cha2ds2-va', name: 'CHA₂DS₂-VA', title: 'Escore CHA₂DS₂-VA', cat: 'Cardio', kicker: 'Cardio · Fibrilação atrial',
  size: '6 itens',
  what: 'Fibrilação atrial: anticoagular ou não.',
  seo: 'Escore CHA₂DS₂-VA em português (diretriz europeia de 2024): veja se o paciente com fibrilação atrial tem indicação de anticoagulação, copie para o prontuário e imprima a ficha.',
  kind: 'sum', range: '0 a 8',
  items: [
    { id: 'ic', type: 'check', t: 'Insuficiência cardíaca', h: 'Sinais ou sintomas de IC com qualquer fração de ejeção, ou FEVE ≤ 40% mesmo sem sintomas.', pts: 1, s: 'insuficiência cardíaca' },
    { id: 'has', type: 'check', t: 'Hipertensão arterial', pts: 1, s: 'hipertensão' },
    { id: 'idade', type: 'choice', t: 'Idade', s: 'idade', opts: [ { l: '< 65 anos', p: 0 }, { l: '65 a 74 anos', p: 1 }, { l: '≥ 75 anos', p: 2 } ] },
    { id: 'dm', type: 'check', t: 'Diabetes', pts: 1, s: 'diabetes' },
    { id: 'avc', type: 'check', t: 'AVC, AIT ou tromboembolismo arterial prévio', pts: 2, s: 'AVC/AIT/tromboembolismo arterial prévio' },
    { id: 'vasc', type: 'check', t: 'Doença vascular', h: 'Doença coronariana (infarto prévio, angina, revascularização ou DAC significativa em exame) ou doença arterial periférica (claudicação, revascularização periférica, intervenção na aorta abdominal, placa aórtica complexa).', pts: 1, s: 'doença vascular' }
  ],
  bands: [
    { upTo: 0, r: '0', label: 'Risco baixo', level: 1, text: 'Anticoagulação oral não indicada para prevenção de AVC, exceto em cardiomiopatia hipertrófica, amiloidose cardíaca ou nas 4 semanas após cardioversão.' },
    { upTo: 1, r: '1', label: 'Risco intermediário', level: 2, text: 'Considerar anticoagulação oral em decisão compartilhada com o paciente; corrigir fatores de risco de sangramento modificáveis.' },
    { upTo: Infinity, r: '≥ 2', label: 'Risco alto', level: 3, text: 'Anticoagulação oral indicada, de preferência com anticoagulante oral direto.' }
  ],
  note: 'Versão da diretriz europeia de 2024, sem o critério de sexo. Cardiomiopatia hipertrófica e amiloidose cardíaca: anticoagular independentemente do escore. Estenose mitral moderada a grave e prótese valvar mecânica: varfarina independentemente do escore (anticoagulantes diretos contraindicados).',
  ref: 'Van Gelder IC et al. Eur Heart J. 2024;45:3314-414.'
},
{
  slug: 'news2', name: 'NEWS2', title: 'Escore NEWS2', cat: 'Geral', kicker: 'Geral · Deterioração clínica',
  size: '7 parâmetros',
  what: 'Piora clínica pelos sinais vitais.',
  seo: 'Escore NEWS2 (National Early Warning Score 2) em português: some os sinais vitais, veja a resposta clínica, copie para o prontuário e imprima a ficha.',
  kind: 'news2', range: '0 a 20',
  items: [
    { id: 'fr', type: 'choice', t: 'Frequência respiratória', h: 'Em irpm.', s: 'FR', opts: [ { l: '≤ 8', p: 3 }, { l: '9 a 11', p: 1 }, { l: '12 a 20', p: 0 }, { l: '21 a 24', p: 2 }, { l: '≥ 25', p: 3 } ] },
    { id: 'escala', type: 'choice', t: 'Escala de SpO₂', h: 'A escala 2 só para insuficiência respiratória hipercápnica confirmada, com alvo de 88 a 92%.', s: 'escala', def: 0, opts: [ { l: 'Escala 1', p: 0 }, { l: 'Escala 2 (hipercapnia)', p: 0 } ], noPts: true },
    { id: 'spo1', type: 'choice', t: 'SpO₂ — escala 1', h: 'Em %.', s: 'SpO₂', showIf: { escala: 0 }, opts: [ { l: '≤ 91', p: 3 }, { l: '92 a 93', p: 2 }, { l: '94 a 95', p: 1 }, { l: '≥ 96', p: 0 } ] },
    { id: 'spo2', type: 'choice', t: 'SpO₂ — escala 2', h: 'Em %.', s: 'SpO₂ (escala 2)', showIf: { escala: 1 }, opts: [ { l: '≤ 83', p: 3 }, { l: '84 a 85', p: 2 }, { l: '86 a 87', p: 1 }, { l: '88 a 92 ou ≥ 93 em ar ambiente', p: 0 }, { l: '93 a 94 com O₂', p: 1 }, { l: '95 a 96 com O₂', p: 2 }, { l: '≥ 97 com O₂', p: 3 } ] },
    { id: 'o2', type: 'choice', t: 'Ar ambiente ou oxigênio', s: 'O₂', opts: [ { l: 'Ar ambiente', p: 0 }, { l: 'Oxigênio suplementar', p: 2 } ] },
    { id: 'pas', type: 'choice', t: 'Pressão arterial sistólica', h: 'Em mmHg.', s: 'PAS', opts: [ { l: '≤ 90', p: 3 }, { l: '91 a 100', p: 2 }, { l: '101 a 110', p: 1 }, { l: '111 a 219', p: 0 }, { l: '≥ 220', p: 3 } ] },
    { id: 'fc', type: 'choice', t: 'Frequência cardíaca', h: 'Em bpm.', s: 'FC', opts: [ { l: '≤ 40', p: 3 }, { l: '41 a 50', p: 1 }, { l: '51 a 90', p: 0 }, { l: '91 a 110', p: 1 }, { l: '111 a 130', p: 2 }, { l: '≥ 131', p: 3 } ] },
    { id: 'consc', type: 'choice', t: 'Nível de consciência', h: 'ACVPU: alerta; confusão nova, voz, dor ou sem resposta.', s: 'consciência', opts: [ { l: 'Alerta', p: 0 }, { l: 'Confusão nova, voz, dor ou sem resposta', p: 3 } ] },
    { id: 'temp', type: 'choice', t: 'Temperatura', h: 'Em °C.', s: 'Tax', opts: [ { l: '≤ 35,0', p: 3 }, { l: '35,1 a 36,0', p: 1 }, { l: '36,1 a 38,0', p: 0 }, { l: '38,1 a 39,0', p: 1 }, { l: '≥ 39,1', p: 2 } ] }
  ],
  bands: [
    { key: 'baixo', r: '0 a 4', label: 'Risco baixo', level: 1, text: 'Monitorização de rotina: escore 0, sinais vitais a cada 12 h; 1 a 4, a cada 4 a 6 h, com avaliação da enfermagem.' },
    { key: 'tres', r: '3 em um único parâmetro', label: 'Risco baixo a médio', level: 2, text: 'Sinais vitais de hora em hora e avaliação médica urgente na enfermaria.' },
    { key: 'medio', r: '5 a 6', label: 'Risco médio', level: 3, text: 'Sinais vitais de hora em hora e avaliação urgente por médico capacitado em paciente agudo.' },
    { key: 'alto', r: '≥ 7', label: 'Risco alto', level: 4, text: 'Monitorização contínua e resposta de emergência (equipe de cuidados críticos).' }
  ],
  note: 'Não validado para gestantes e menores de 16 anos.',
  ref: 'Royal College of Physicians. National Early Warning Score (NEWS) 2. Londres: RCP; 2017.'
},
{
  slug: 'ciwa-ar', name: 'CIWA-Ar', title: 'Escala CIWA-Ar', cat: 'Geral', kicker: 'Geral · Abstinência alcoólica',
  size: '10 itens', featured: true, rank: 9,
  what: 'Gravidade da abstinência alcoólica.',
  seo: 'Escala CIWA-Ar em português: avalie a gravidade da abstinência alcoólica, copie para o prontuário e imprima a ficha.',
  kind: 'sum', range: '0 a 67',
  items: [
    { id: 'nausea', type: 'choice', t: 'Náuseas e vômitos', s: 'náuseas', opts: [ { l: 'Sem náusea ou vômito', p: 0 }, { l: 'Náusea leve, sem vômito', p: 1 }, { l: '', p: 2 }, { l: '', p: 3 }, { l: 'Náusea intermitente com ânsia', p: 4 }, { l: '', p: 5 }, { l: '', p: 6 }, { l: 'Náusea constante, ânsia e vômitos', p: 7 } ] },
    { id: 'tremor', type: 'choice', t: 'Tremor', h: 'Braços estendidos e dedos afastados.', s: 'tremor', opts: [ { l: 'Sem tremor', p: 0 }, { l: 'Só sentido na ponta dos dedos', p: 1 }, { l: '', p: 2 }, { l: '', p: 3 }, { l: 'Moderado, com braços estendidos', p: 4 }, { l: '', p: 5 }, { l: '', p: 6 }, { l: 'Intenso, mesmo com braços recolhidos', p: 7 } ] },
    { id: 'suor', type: 'choice', t: 'Sudorese paroxística', s: 'sudorese', opts: [ { l: 'Sem suor visível', p: 0 }, { l: 'Pouco perceptível, palmas úmidas', p: 1 }, { l: '', p: 2 }, { l: '', p: 3 }, { l: 'Gotas de suor na testa', p: 4 }, { l: '', p: 5 }, { l: '', p: 6 }, { l: 'Sudorese profusa', p: 7 } ] },
    { id: 'ansied', type: 'choice', t: 'Ansiedade', s: 'ansiedade', opts: [ { l: 'Sem ansiedade, à vontade', p: 0 }, { l: 'Levemente ansioso', p: 1 }, { l: '', p: 2 }, { l: '', p: 3 }, { l: 'Moderadamente ansioso ou reservado', p: 4 }, { l: '', p: 5 }, { l: '', p: 6 }, { l: 'Equivalente a pânico agudo', p: 7 } ] },
    { id: 'agit', type: 'choice', t: 'Agitação', s: 'agitação', opts: [ { l: 'Atividade normal', p: 0 }, { l: 'Atividade um pouco aumentada', p: 1 }, { l: '', p: 2 }, { l: '', p: 3 }, { l: 'Moderadamente inquieto', p: 4 }, { l: '', p: 5 }, { l: '', p: 6 }, { l: 'Anda de um lado a outro ou se debate', p: 7 } ] },
    { id: 'tatil', type: 'choice', t: 'Distúrbios táteis', h: 'Coceira, formigamento, queimação, insetos andando na pele.', s: 'táteis', opts: [ { l: 'Nenhum', p: 0 }, { l: 'Muito leves', p: 1 }, { l: 'Leves', p: 2 }, { l: 'Moderados', p: 3 }, { l: 'Alucinações moderadamente intensas', p: 4 }, { l: 'Alucinações intensas', p: 5 }, { l: 'Alucinações extremamente intensas', p: 6 }, { l: 'Alucinações contínuas', p: 7 } ] },
    { id: 'audit', type: 'choice', t: 'Distúrbios auditivos', h: 'Sons ásperos ou assustadores, ouvir coisas que não existem.', s: 'auditivos', opts: [ { l: 'Nenhum', p: 0 }, { l: 'Muito leves', p: 1 }, { l: 'Leves', p: 2 }, { l: 'Moderados', p: 3 }, { l: 'Alucinações moderadamente intensas', p: 4 }, { l: 'Alucinações intensas', p: 5 }, { l: 'Alucinações extremamente intensas', p: 6 }, { l: 'Alucinações contínuas', p: 7 } ] },
    { id: 'visual', type: 'choice', t: 'Distúrbios visuais', h: 'Luz forte demais, cores diferentes, ver coisas que não existem.', s: 'visuais', opts: [ { l: 'Nenhum', p: 0 }, { l: 'Muito leves', p: 1 }, { l: 'Leves', p: 2 }, { l: 'Moderados', p: 3 }, { l: 'Alucinações moderadamente intensas', p: 4 }, { l: 'Alucinações intensas', p: 5 }, { l: 'Alucinações extremamente intensas', p: 6 }, { l: 'Alucinações contínuas', p: 7 } ] },
    { id: 'cefaleia', type: 'choice', t: 'Cefaleia ou peso na cabeça', h: 'Não avaliar tontura.', s: 'cefaleia', opts: [ { l: 'Ausente', p: 0 }, { l: 'Muito leve', p: 1 }, { l: 'Leve', p: 2 }, { l: 'Moderada', p: 3 }, { l: 'Moderadamente intensa', p: 4 }, { l: 'Intensa', p: 5 }, { l: 'Muito intensa', p: 6 }, { l: 'Extremamente intensa', p: 7 } ] },
    { id: 'orient', type: 'choice', t: 'Orientação e sensório', h: 'Que dia é hoje? Onde você está? Quem sou eu?', s: 'orientação', opts: [ { l: 'Orientado, faz contas em série', p: 0 }, { l: 'Não faz contas ou tem dúvida da data', p: 1 }, { l: 'Erra a data por até 2 dias', p: 2 }, { l: 'Erra a data por mais de 2 dias', p: 3 }, { l: 'Desorientado quanto a lugar ou pessoa', p: 4 } ] }
  ],
  bands: [
    { upTo: 9, r: '0 a 9', label: 'Abstinência leve', level: 1, text: 'Em geral sem necessidade de benzodiazepínico. Reavaliar periodicamente.' },
    { upTo: 18, r: '10 a 18', label: 'Abstinência moderada', level: 2, text: 'Tratamento farmacológico (benzodiazepínico) e reavaliação frequente.' },
    { upTo: Infinity, r: '≥ 19', label: 'Abstinência grave', level: 4, text: 'Alto risco de convulsão e delirium tremens. Tratamento imediato e monitorização.' }
  ],
  note: 'Faixas da diretriz ASAM 2020. Os níveis sem descrição ficam entre as descrições vizinhas.',
  ref: 'Sullivan JT et al. Br J Addict. 1989;84:1353-7. Faixas: ASAM. J Addict Med. 2020;14(3S Suppl 1):1-72.'
},
{
  slug: 'centor', name: 'Centor', title: 'Escore de Centor modificado (McIsaac)', cat: 'Geral', kicker: 'Geral · Faringite',
  size: '5 itens',
  what: 'Faringite: quando testar ou tratar.',
  seo: 'Escore de Centor modificado (McIsaac) em português: veja quando testar ou tratar a faringite estreptocócica, copie para o prontuário e imprima a ficha.',
  kind: 'sum', range: '−1 a 5',
  items: [
    { id: 'exsud', type: 'check', t: 'Exsudato ou aumento das amígdalas', pts: 1, s: 'exsudato ou aumento amigdaliano' },
    { id: 'linf', type: 'check', t: 'Linfonodos cervicais anteriores dolorosos ou aumentados', pts: 1, s: 'linfonodos cervicais anteriores' },
    { id: 'febre', type: 'check', t: 'Febre > 38 °C', pts: 1, s: 'febre > 38 °C' },
    { id: 'tosse', type: 'check', t: 'Ausência de tosse', pts: 1, s: 'ausência de tosse' },
    { id: 'idade', type: 'choice', t: 'Idade', s: 'idade', opts: [ { l: '3 a 14 anos', p: 1 }, { l: '15 a 44 anos', p: 0 }, { l: '≥ 45 anos', p: -1 } ] }
  ],
  bands: [
    { upTo: 1, r: '≤ 1', label: 'Risco baixo', level: 1, text: 'Risco de estreptococo de 1% a 10%. Sem teste e sem antibiótico.' },
    { upTo: 3, r: '2 a 3', label: 'Risco intermediário', level: 2, text: 'Risco de 11% a 35%. Teste rápido ou cultura; antibiótico só se positivo.' },
    { upTo: Infinity, r: '≥ 4', label: 'Risco alto', level: 3, text: 'Risco em torno de 51% a 53%. Testar e tratar se positivo; antibiótico empírico conforme o contexto.' }
  ],
  note: 'Para faringite aguda a partir de 3 anos.',
  ref: 'McIsaac WJ et al. CMAJ. 1998;158:75-83. McIsaac WJ et al. JAMA. 2004;291:1587-95.'
},
{
  slug: 'abcd2', name: 'ABCD²', title: 'Escore ABCD²', cat: 'Neuro', kicker: 'Neuro · Ataque isquêmico transitório',
  size: '5 itens', featured: true, rank: 1,
  what: 'Risco de AVC após um AIT.',
  seo: 'Escore ABCD² em português: veja o risco de AVC nos dias seguintes a um ataque isquêmico transitório, copie para o prontuário e imprima a ficha.',
  kind: 'sum', range: '0 a 7',
  items: [
    { id: 'idade', type: 'check', t: 'Idade ≥ 60 anos', pts: 1, s: 'idade ≥ 60' },
    { id: 'pa', type: 'check', t: 'PA ≥ 140/90 mmHg na primeira aferição', pts: 1, s: 'PA ≥ 140/90' },
    { id: 'clin', type: 'choice', t: 'Quadro clínico', s: 'clínica', opts: [ { l: 'Fraqueza unilateral', p: 2 }, { l: 'Alteração da fala sem fraqueza', p: 1 }, { l: 'Outros sintomas', p: 0 } ] },
    { id: 'dur', type: 'choice', t: 'Duração dos sintomas', s: 'duração', opts: [ { l: '≥ 60 minutos', p: 2 }, { l: '10 a 59 minutos', p: 1 }, { l: '< 10 minutos', p: 0 } ] },
    { id: 'dm', type: 'check', t: 'Diabetes', pts: 1, s: 'diabetes' }
  ],
  bands: [
    { upTo: 3, r: '0 a 3', label: 'Risco baixo', level: 1, text: 'Risco de AVC em 2 dias em torno de 1%.' },
    { upTo: 5, r: '4 a 5', label: 'Risco moderado', level: 2, text: 'Risco de AVC em 2 dias em torno de 4%.' },
    { upTo: Infinity, r: '6 a 7', label: 'Risco alto', level: 4, text: 'Risco de AVC em 2 dias em torno de 8%.' }
  ],
  note: 'As diretrizes atuais recomendam investigação urgente de todo AIT, independentemente do escore.',
  ref: 'Johnston SC et al. Lancet. 2007;369:283-92.'
},
{
  slug: 'child-pugh', name: 'Child-Pugh', title: 'Classificação de Child-Pugh', cat: 'Digestivo', kicker: 'Digestivo · Cirrose',
  size: '5 itens',
  what: 'Gravidade da cirrose.',
  seo: 'Classificação de Child-Pugh em português: calcule a classe A, B ou C da cirrose, copie para o prontuário e imprima a ficha.',
  kind: 'sum', range: '5 a 15',
  items: [
    { id: 'bili', type: 'choice', t: 'Bilirrubina total', h: 'Em mg/dL.', s: 'bilirrubina', opts: [ { l: '< 2', p: 1 }, { l: '2 a 3', p: 2 }, { l: '> 3', p: 3 } ] },
    { id: 'alb', type: 'choice', t: 'Albumina', h: 'Em g/dL.', s: 'albumina', opts: [ { l: '> 3,5', p: 1 }, { l: '2,8 a 3,5', p: 2 }, { l: '< 2,8', p: 3 } ] },
    { id: 'inr', type: 'choice', t: 'INR', s: 'INR', opts: [ { l: '< 1,7', p: 1 }, { l: '1,7 a 2,3', p: 2 }, { l: '> 2,3', p: 3 } ] },
    { id: 'ascite', type: 'choice', t: 'Ascite', s: 'ascite', opts: [ { l: 'Ausente', p: 1 }, { l: 'Leve ou controlada com diurético', p: 2 }, { l: 'Moderada a grave ou refratária', p: 3 } ] },
    { id: 'ence', type: 'choice', t: 'Encefalopatia', s: 'encefalopatia', opts: [ { l: 'Ausente', p: 1 }, { l: 'Grau I a II ou controlada', p: 2 }, { l: 'Grau III a IV ou refratária', p: 3 } ] }
  ],
  bands: [
    { upTo: 6, r: '5 a 6', label: 'Classe A', level: 1, text: 'Doença hepática bem compensada.' },
    { upTo: 9, r: '7 a 9', label: 'Classe B', level: 2, text: 'Comprometimento funcional significativo.' },
    { upTo: Infinity, r: '10 a 15', label: 'Classe C', level: 4, text: 'Doença hepática descompensada.' }
  ],
  note: 'O original usava o tempo de protrombina; o INR é a adaptação usada hoje.',
  ref: 'Pugh RN et al. Br J Surg. 1973;60:646-9.'
}
];

/* ---------- Escores novos (out/2026) ---------- */
window.ESCORES.push(
{
  slug: 'sao-francisco', name: 'São Francisco', title: 'Regra de São Francisco para síncope', cat: 'Cardio', kicker: 'Cardio · Síncope',
  size: '5 critérios', featured: true, rank: 100,
  what: 'Síncope: quem tem risco de evento grave em 7 dias.',
  seo: 'Regra de São Francisco para síncope (CHESS) em português: veja se o paciente com síncope é de alto risco, copie para o prontuário e imprima a ficha.',
  kind: 'rule',
  items: [
    { id: 'icc', type: 'check', t: 'História de insuficiência cardíaca', h: 'C (CHF): diagnóstico prévio de insuficiência cardíaca.', s: 'história de IC' },
    { id: 'ht', type: 'check', t: 'Hematócrito < 30%', h: 'H (Hematocrit).', s: 'Ht < 30%' },
    { id: 'ecg', type: 'check', t: 'ECG anormal', h: 'E (ECG): ritmo não sinusal ou alteração nova em relação a ECG prévio, inclusive na monitorização.', s: 'ECG anormal' },
    { id: 'disp', type: 'check', t: 'Dispneia', h: 'S (Shortness of breath): na história ou no exame.', s: 'dispneia' },
    { id: 'pas', type: 'check', t: 'PA sistólica < 90 mmHg na triagem', h: 'S (Systolic BP).', s: 'PAS < 90 na triagem' }
  ],
  bands: [
    { key: 'neg', r: 'Nenhum critério', label: 'Baixo risco pela regra', level: 1, text: 'Alta possível se a causa provável for benigna (vasovagal, ortostática) e o exame for normal. A regra não substitui o julgamento clínico.' },
    { key: 'pos', r: '1 ou mais critérios', label: 'Alto risco', level: 3, text: 'Não dar alta direto: monitorização cardíaca, ECG seriado, hemograma e eletrólitos, troponina se indicada, e considerar observação ou internação.' }
  ],
  note: 'Use em síncope ou pré-síncope sem causa grave já evidente. Mnemônico CHESS.',
  ref: 'Quinn JV et al. Ann Emerg Med. 2004;43:224-32. Quinn J et al. Ann Emerg Med. 2006;47:448-54. Saccilotto RT et al. CMAJ. 2011;183:E1116-26.'
},
{
  slug: 'hints', name: 'HINTS', title: 'HINTS e HINTS plus para tontura', cat: 'Neuro', kicker: 'Neuro · Tontura',
  size: '4 itens', featured: true, rank: 101,
  what: 'Tontura aguda: neurite vestibular ou AVC de fossa posterior.',
  seo: 'HINTS e HINTS plus em português: diferencie neurite vestibular de AVC na síndrome vestibular aguda, copie para o prontuário e imprima a ficha.',
  kind: 'rule',
  items: [
    { id: 'imp', type: 'choice', t: 'Impulso cefálico (head impulse)', h: 'Giro rápido e curto da cabeça com o olhar fixo no nariz do examinador.', s: 'impulso cefálico', noPts: true, opts: [ { l: 'Anormal de um lado (sacada corretiva)', p: 0 }, { l: 'Normal dos dois lados', p: 1, central: true } ] },
    { id: 'nis', type: 'choice', t: 'Nistagmo', h: 'Observe no olhar para a direita, para a esquerda e em frente.', s: 'nistagmo', noPts: true, opts: [ { l: 'Horizontal, bate sempre para o mesmo lado', p: 0 }, { l: 'Muda de direção, vertical ou torcional puro', p: 1, central: true } ] },
    { id: 'skew', type: 'choice', t: 'Teste de skew (cobertura alternada)', h: 'Cubra um olho e depois o outro; observe se o olho descoberto corrige na vertical.', s: 'skew', noPts: true, opts: [ { l: 'Sem desvio vertical', p: 0 }, { l: 'Refixação vertical', p: 1, central: true } ] },
    { id: 'aud', type: 'choice', t: 'Perda auditiva aguda (HINTS plus)', h: 'Atrito de dedos ou diapasão. Opcional, mas aumenta a sensibilidade.', s: 'perda auditiva aguda', noPts: true, optional: true, opts: [ { l: 'Ausente', p: 0 }, { l: 'Presente', p: 1, central: true } ] }
  ],
  bands: [
    { key: 'periferico', r: 'Os três achados periféricos', label: 'Padrão periférico', level: 1, text: 'Compatível com neurite vestibular, se o exame foi bem feito e não há outro déficit. Sintomáticos por pouco tempo e reabilitação vestibular precoce.' },
    { key: 'central', r: 'Qualquer sinal central', label: 'Sinal central: suspeitar de AVC', level: 4, text: 'Tratar como AVC de fossa posterior: protocolo de AVC, RM com difusão e angiografia de vasos. TC normal não afasta.' }
  ],
  note: 'Só vale na síndrome vestibular aguda contínua (tontura constante há horas ou dias, com náusea e marcha instável) e com nistagmo presente na hora do exame. Não use na VPPB nem na tontura sem nistagmo.',
  ref: 'Kattah JC et al. Stroke. 2009;40:3504-10. Newman-Toker DE et al. Acad Emerg Med. 2013;20:986-96. Ohle R et al. Acad Emerg Med. 2020;27:887-96.'
}
);

/* ---------- Guia: o que cada resultado significa e o que fazer depois ---------- */
/* [faixa, o que significa, o que fazer] */
window.GUIAS = {
  'nihss': { rows: [
    ['0', 'Sem déficit medido pela escala. Não afasta AVC, sobretudo de circulação posterior.', 'Se a suspeita continua (tontura, ataxia, disartria), investigar com imagem. Não descartar AVC só pelo NIHSS 0.'],
    ['1 a 4', 'AVC leve.', 'Trombólise se o déficit for incapacitante (afasia, hemianopsia, fraqueza que impede a função). Se não incapacitante, após a TC sem sangramento: AAS + clopidogrel por 21 dias.'],
    ['5 a 15', 'AVC moderado. Com 6 ou mais, pensar em oclusão de grande vaso.', 'Protocolo de AVC: TC sem contraste já, trombólise se elegível na janela, angioTC e contato com centro de trombectomia.'],
    ['16 a 20', 'AVC moderado a grave. Alta chance de oclusão de grande vaso.', 'Trombólise se elegível, angioTC e transferência para trombectomia. Vigiar via aérea, deglutição e PA.'],
    ['21 a 42', 'AVC grave. Alto risco de edema, transformação hemorrágica e óbito.', 'Mesmo fluxo de reperfusão se elegível. Proteger via aérea se rebaixar e pedir leito de UTI ou unidade de AVC.']
  ], obs: 'As faixas são descritivas. A indicação de trombólise depende do déficit ser incapacitante, não de um número.' },

  'abcd2': { rows: [
    ['0 a 3', 'Risco baixo: AVC em 2 dias em torno de 1%.', 'Mesmo assim, investigar em até 24 a 48 h (ECG, imagem do crânio e dos vasos do pescoço) e iniciar antiagregação. Alta só com a investigação garantida.'],
    ['4 a 5', 'Risco moderado: AVC em 2 dias em torno de 4%.', 'Investigação completa no PS ou internação curta. Dupla antiagregação por 21 dias, se não houver contraindicação.'],
    ['6 a 7', 'Risco alto: AVC em 2 dias em torno de 8%.', 'Internar ou observar, com imagem vascular urgente, monitorização cardíaca e dupla antiagregação.']
  ], obs: 'AIT com déficit motor ou de fala, FA ou estenose carotídea é de alto risco qualquer que seja o escore.' },

  'wells-tep': { rows: [
    ['< 2', 'Probabilidade baixa no modelo de três níveis: TEP em torno de 1 a 4%.', 'Aplicar o PERC. Se negativo, não precisa de D-dímero. Se positivo, D-dímero (ajustado à idade acima de 50 anos).'],
    ['2 a 4', 'Probabilidade moderada, mas ainda "TEP improvável" no modelo de dois níveis.', 'D-dímero. Se normal, TEP afastado. Se elevado, angioTC de tórax.'],
    ['4,5 a 6', '"TEP provável": em torno de 1 em cada 3 tem TEP.', 'AngioTC direto (D-dímero normal não afasta). Anticoagular enquanto espera se a imagem demorar e o risco de sangramento for baixo.'],
    ['> 6', 'Probabilidade alta: TEP em torno de 40%.', 'AngioTC e anticoagulação empírica se não houver contraindicação. Instável: ecocardiograma à beira-leito ou USG de compressão.']
  ] },

  'wells-tvp': { rows: [
    ['≤ 0', 'Probabilidade baixa: TVP em torno de 5%.', 'D-dímero. Se normal, TVP afastada. Se elevado, USG de compressão.'],
    ['1', 'Probabilidade moderada (em torno de 17%), mas ainda "TVP improvável".', 'D-dímero. Se normal, TVP afastada. Se elevado, USG de compressão.'],
    ['≥ 2', '"TVP provável": de 17% (2 pontos) a cerca de 50% (3 ou mais).', 'USG de compressão direto. Se o exame demorar mais de 4 h e o risco de sangramento for baixo, anticoagular. USG negativo com suspeita alta: D-dímero ou repetir em 1 semana.']
  ] },

  'heart': { rows: [
    ['0 a 3', 'Risco baixo: evento cardíaco maior em 6 semanas de 1 a 2%.', 'Com troponina seriada negativa, alta com seguimento ambulatorial.'],
    ['4 a 6', 'Risco intermediário: em torno de 12 a 17%.', 'Observar ou internar, troponina seriada, cardiologia e estratificação (teste funcional, angioTC de coronárias ou cateterismo).'],
    ['7 a 10', 'Risco alto: em torno de 50%.', 'Tratar como SCA provável: antiagregação, anticoagulação e discutir estratégia invasiva precoce.']
  ], obs: 'Supradesnivelamento do ST não entra no HEART: é IAM com supra e vai direto para reperfusão.' },

  'glasgow-blatchford': { rows: [
    ['0 a 1', 'Risco muito baixo de precisar de transfusão, endoscopia terapêutica ou cirurgia, ou de morrer.', 'Alta com endoscopia ambulatorial, se estável e com seguimento garantido.'],
    ['2 a 6', 'Risco não baixo. A chance de intervenção sobe com o escore.', 'Internar, IBP EV, transfusão restritiva (Hb < 7, ou < 8 se cardiopata) e EDA em até 24 h.'],
    ['≥ 7', 'Maior chance de precisar de terapia endoscópica.', 'Ressuscitação, IBP EV e EDA precoce (em até 24 h; antes se instável). Considerar UTI.']
  ] },

  'oakland': { rows: [
    ['≤ 8', 'Em torno de 95% de chance de alta segura (sem ressangramento, transfusão, intervenção, readmissão ou morte).', 'Se estável e sem outro motivo para internar: alta com colonoscopia ambulatorial.'],
    ['> 8', 'Risco não baixo de desfecho adverso.', 'Internar, ressuscitar, transfusão restritiva. Se instável, pensar em fonte alta (EDA) e angioTC.']
  ] },

  'regra-canadense': { rows: [
    ['Alto risco', 'Glasgow < 15 em 2 h, suspeita de fratura aberta ou com afundamento, sinal de fratura de base, 2 ou mais vômitos ou idade ≥ 65. Sensibilidade de 100% para lesão com necessidade de neurocirurgia.', 'TC de crânio sem contraste.'],
    ['Médio risco', 'Só amnésia retrógrada ≥ 30 min ou mecanismo perigoso. Risco de lesão cerebral visível na TC.', 'TC de crânio. Sem TC disponível: observação com reavaliação neurológica seriada.'],
    ['Nenhum critério', 'Risco muito baixo de lesão importante.', 'Sem TC. Alta com acompanhante e orientação de sinais de alarme.']
  ], obs: 'Não se aplica a anticoagulados, convulsão pós-trauma, menores de 16 anos ou TCE sem perda de consciência, amnésia ou desorientação.' },

  'alvarado': { rows: [
    ['0 a 4', 'Apendicite pouco provável. Abaixo de 5 a regra exclui bem.', 'Pensar em outros diagnósticos. Alta com reavaliação em 12 a 24 h e sinais de alarme, se o quadro permitir.'],
    ['5 a 6', 'Apendicite possível.', 'Imagem (USG; TC se o USG for inconclusivo no adulto) e/ou observação com reavaliação seriada.'],
    ['7 a 8', 'Apendicite provável.', 'Avaliação cirúrgica. Imagem se houver dúvida, sobretudo em mulher em idade fértil.'],
    ['9 a 10', 'Apendicite muito provável.', 'Cirurgia: jejum, analgesia, hidratação e antibiótico pré-operatório.']
  ] },

  'ciwa-ar': { rows: [
    ['0 a 9', 'Abstinência ausente ou leve.', 'Sem benzodiazepínico de rotina. Tiamina, hidratação e repetir o CIWA a cada 4 a 8 h (mais vezes se já teve convulsão ou delirium).'],
    ['10 a 18', 'Abstinência moderada.', 'Benzodiazepínico guiado por sintomas (ex.: diazepam 10 a 20 mg VO) e repetir o CIWA a cada 1 h até ficar abaixo de 10.'],
    ['≥ 19', 'Abstinência grave: maior risco de convulsão e delirium tremens.', 'Benzodiazepínico em doses repetidas (EV se preciso) e monitorização. Refratário a doses altas: UTI e considerar fenobarbital.']
  ], obs: 'Tiamina antes da glicose. Os cortes variam entre protocolos (alguns tratam a partir de 8 e chamam de grave a partir de 16 ou 20).' },

  'glasgow': { rows: [
    ['13 a 15', 'Rebaixamento leve ou ausente.', 'Investigar a causa (glicemia capilar sempre). No trauma, aplicar a Regra Canadense para TC de crânio. Reavaliar o Glasgow.'],
    ['9 a 12', 'Rebaixamento moderado.', 'TC de crânio, glicemia, monitorização e Glasgow seriado. Preparar a via aérea se piorar.'],
    ['3 a 8', 'Rebaixamento grave (coma).', 'Proteger a via aérea (IOT), evitar hipóxia e hipotensão, TC de crânio e neurocirurgia se trauma.']
  ], obs: 'Queda de 2 ou mais pontos é piora significativa, qualquer que seja a faixa.' },

  'perc': { rows: [
    ['Nenhum critério', 'Com probabilidade clínica baixa (< 15%), o risco de TEP fica abaixo de 2%: menor que o risco de investigar.', 'Não pedir D-dímero nem imagem para TEP. Buscar outro diagnóstico.'],
    ['1 ou mais', 'O PERC não afasta TEP.', 'Seguir com Wells e D-dímero (ajustado à idade). AngioTC se D-dímero elevado ou TEP provável.']
  ] },

  'curb-65': { rows: [
    ['0 a 1', 'Gravidade baixa: mortalidade em 30 dias em torno de 1,5%.', 'Tratamento ambulatorial, se SpO₂ ≥ 92%, sem comorbidade descompensada e com condição social adequada.'],
    ['2', 'Gravidade intermediária: mortalidade em torno de 9%.', 'Internação curta ou tratamento supervisionado. Antibiótico conforme diretriz de PAC moderada.'],
    ['3 a 5', 'Pneumonia grave: mortalidade em torno de 22%.', 'Internar. Com 4 a 5 pontos ou critérios de gravidade (ATS/IDSA), avaliar UTI. Na sepse, antibiótico EV na primeira hora.']
  ] },

  'ottawa': { rows: [
    ['RX indicado', 'Possível fratura. A especificidade é baixa: a maioria ainda não terá fratura.', 'Radiografia do tornozelo (dor maleolar) e/ou do pé (dor no médio-pé).'],
    ['RX não indicado', 'Fratura significativa muito improvável (sensibilidade em torno de 98%).', 'Sem radiografia. Analgesia, gelo, elevação, apoio conforme tolerância e retorno se não melhorar em 5 a 7 dias.']
  ] },

  'nexus': { rows: [
    ['Nenhum critério', 'Baixo risco: sensibilidade de 99,6% para lesão cervical importante.', 'Retirar o colar sem imagem.'],
    ['1 ou mais', 'Não dá para excluir lesão pela clínica.', 'Manter a restrição de movimento e pedir TC de coluna cervical.']
  ], obs: 'Em idosos (≥ 65) a Regra Canadense é mais segura.' },

  'canadense-cervical': { rows: [
    ['Alto risco', 'Idade ≥ 65, mecanismo perigoso ou parestesia nas extremidades.', 'TC de coluna cervical e manter a restrição de movimento.'],
    ['Sem fator de baixo risco', 'Não é seguro testar a mobilidade.', 'TC de coluna cervical.'],
    ['Não roda 45°', 'Falhou no teste de mobilidade.', 'TC de coluna cervical.'],
    ['Roda 45°', 'Lesão importante afastada (sensibilidade de 100% na derivação).', 'Sem imagem. Retirar o colar.']
  ], obs: 'Não se aplica a Glasgow < 15, instáveis, menores de 16 anos ou paralisia aguda.' },

  'pecarn': { rows: [
    ['Alto risco', 'Lesão cerebral importante em torno de 4%.', 'TC de crânio.'],
    ['Intermediário', 'Lesão importante em torno de 1%.', 'Observar 4 a 6 h ou TC. Pesam a favor da TC: vários achados, piora na observação, idade < 3 meses, experiência do médico e preferência dos pais.'],
    ['Nenhum critério', 'Lesão importante < 0,02% (< 2 anos) ou < 0,05% (≥ 2 anos).', 'Sem TC. Alta com orientação de sinais de alarme.']
  ] },

  'cha2ds2-va': { rows: [
    ['0', 'Risco baixo de AVC pela FA.', 'Sem anticoagulação, salvo cardiomiopatia hipertrófica, amiloidose cardíaca ou até 4 semanas após cardioversão. Reavaliar os fatores de risco periodicamente.'],
    ['1', 'Risco intermediário.', 'Considerar anticoagulação oral (DOAC preferível) em decisão compartilhada com o paciente.'],
    ['≥ 2', 'Risco alto de AVC e embolia.', 'Anticoagulação oral: DOAC preferível; varfarina se prótese mecânica ou estenose mitral moderada a grave. Corrigir fatores de sangramento modificáveis.']
  ] },

  'news2': { rows: [
    ['0 a 4', 'Risco baixo.', 'Sinais vitais a cada 12 h (escore 0) ou a cada 4 a 6 h (1 a 4). A enfermagem avalia se muda a conduta.'],
    ['3 em um parâmetro', 'Risco baixo a médio: um sinal vital muito alterado.', 'Avaliação médica urgente e sinais vitais no mínimo de hora em hora.'],
    ['5 a 6', 'Risco médio: gatilho para resposta urgente.', 'Avaliação urgente por médico, pensar em sepse e sinais vitais no mínimo de hora em hora.'],
    ['≥ 7', 'Risco alto de deterioração.', 'Resposta de emergência: monitorização contínua, médico experiente ou time de resposta rápida e avaliar UTI.']
  ] },

  'centor': { rows: [
    ['≤ 1', 'Estreptococo em torno de 1 a 10%.', 'Sem teste e sem antibiótico. Sintomáticos e orientação de retorno.'],
    ['2 a 3', 'Estreptococo em torno de 11 a 35%.', 'Teste rápido ou cultura. Antibiótico só se positivo.'],
    ['≥ 4', 'Estreptococo em torno de 51 a 53%.', 'Testar e tratar se positivo. Sem teste: antibiótico empírico (amoxicilina por 10 dias ou penicilina benzatina em dose única).']
  ], obs: 'Abscesso periamigdaliano, trismo ou voz abafada: avaliar complicação, independentemente do escore.' },

  'child-pugh': { rows: [
    ['5 a 6 · A', 'Doença compensada. Sobrevida em 1 ano em torno de 100% e em 2 anos de 85% (estimativas clássicas).', 'Seguimento com hepatologia. Ajustar doses de fármacos de metabolismo hepático.'],
    ['7 a 9 · B', 'Comprometimento significativo. Sobrevida em 1 ano em torno de 80% e em 2 anos de 60%.', 'Procurar descompensação (PBE, sangramento, encefalopatia), evitar hepatotóxicos e sedativos e encaminhar para avaliação de transplante.'],
    ['10 a 15 · C', 'Doença descompensada. Sobrevida em 1 ano em torno de 45% e em 2 anos de 35%.', 'Internar se descompensado, tratar o fator precipitante e encaminhar ao centro de transplante. Cirurgia eletiva em geral contraindicada.']
  ] },

  'sao-francisco': { rows: [
    ['Nenhum critério', 'Baixo risco de evento grave em 7 dias (morte, IAM, arritmia, TEP, AVC, hemorragia, retorno ao hospital).', 'Alta possível se a causa provável for benigna e o exame for normal, com orientação de retorno.'],
    ['1 ou mais', 'Alto risco: a regra não autoriza a alta.', 'Monitorização cardíaca, ECG seriado, hemograma, eletrólitos, troponina se indicada. Considerar observação ou internação.']
  ], obs: 'Na derivação, sensibilidade de 96% e especificidade de 62%. Nas validações externas foi pior (sensibilidade em torno de 87%), por isso não use sozinha.' },

  'hints': { rows: [
    ['Padrão periférico', 'Impulso anormal + nistagmo unidirecional + skew ausente (+ audição normal). Compatível com neurite vestibular.', 'Sintomáticos por curto período, reabilitação vestibular precoce e retorno se surgir sintoma novo. Se não consegue ficar de pé ou andar, manter suspeita central.'],
    ['Qualquer sinal central', 'Impulso normal, nistagmo que muda de direção, skew presente ou perda auditiva nova: AVC de fossa posterior até prova em contrário.', 'Protocolo de AVC: RM com difusão e angiografia de vasos. RM nas primeiras 24 a 48 h pode ser falso-negativa: repetir se a suspeita continuar. TC tem baixa sensibilidade.']
  ], obs: 'Feito por neuro-oftalmologistas, sensibilidade de 100% e especificidade de 96%. Nas mãos de quem não treinou, a acurácia cai muito: treine o exame antes de confiar nele.' }
};

/* ---------- Lote 2 (out/2026): ADD-RS, Parkland, Ottawa HSA ---------- */
window.ESCORES.push(
{
  slug: 'add-rs', name: 'ADD-RS', title: 'ADD-RS para dissecção de aorta', cat: 'Vascular', kicker: 'Vascular · Dissecção de aorta',
  size: '3 categorias',
  what: 'Probabilidade de dissecção aguda de aorta.',
  seo: 'ADD-RS (Aortic Dissection Detection Risk Score) em português: veja a probabilidade de dissecção de aorta, quando o D-dímero basta e quando pedir angioTC.',
  kind: 'addrs', range: '0 a 3',
  items: [
    { type: 'group', t: 'Condição de alto risco' },
    { id: 'marfan', grp: 'cond', type: 'check', noPts: true, t: 'Marfan ou outra doença do tecido conjuntivo', s: 'doença do tecido conjuntivo' },
    { id: 'fam', grp: 'cond', type: 'check', noPts: true, t: 'História familiar de doença da aorta', s: 'história familiar de doença aórtica' },
    { id: 'valva', grp: 'cond', type: 'check', noPts: true, t: 'Doença da valva aórtica conhecida', s: 'valvopatia aórtica' },
    { id: 'manip', grp: 'cond', type: 'check', noPts: true, t: 'Manipulação recente da aorta', h: 'Cirurgia ou cateterismo.', s: 'manipulação aórtica recente' },
    { id: 'aneur', grp: 'cond', type: 'check', noPts: true, t: 'Aneurisma de aorta torácica conhecido', s: 'aneurisma torácico conhecido' },
    { type: 'group', t: 'Características da dor' },
    { id: 'subita', grp: 'dor', type: 'check', noPts: true, t: 'Início súbito', s: 'dor de início súbito' },
    { id: 'intensa', grp: 'dor', type: 'check', noPts: true, t: 'Intensidade forte', s: 'dor intensa' },
    { id: 'rasga', grp: 'dor', type: 'check', noPts: true, t: 'Dor em rasgo ou facada', s: 'dor em rasgo' },
    { type: 'group', t: 'Achados do exame' },
    { id: 'pulso', grp: 'exame', type: 'check', noPts: true, t: 'Déficit de pulso ou PA sistólica diferente entre os braços', h: 'Diferença > 20 mmHg.', s: 'déficit de pulso ou PA assimétrica' },
    { id: 'neuro', grp: 'exame', type: 'check', noPts: true, t: 'Déficit neurológico focal junto com a dor', s: 'déficit focal com dor' },
    { id: 'sopro', grp: 'exame', type: 'check', noPts: true, t: 'Sopro diastólico aórtico novo junto com a dor', s: 'sopro aórtico novo' },
    { id: 'choque', grp: 'exame', type: 'check', noPts: true, t: 'Hipotensão ou choque', s: 'hipotensão/choque' }
  ],
  bands: [
    { upTo: 0, r: '0', label: 'Baixa probabilidade', level: 1, text: 'Pensar em outros diagnósticos. Se a dissecção continuar na lista, D-dímero: abaixo de 500 ng/mL praticamente afasta.' },
    { upTo: 1, r: '1', label: 'Probabilidade intermediária', level: 2, text: 'D-dímero. Abaixo de 500 ng/mL afasta (risco residual em torno de 0,3%); elevado, angioTC de aorta.' },
    { upTo: Infinity, r: '2 ou 3', label: 'Alta probabilidade', level: 4, text: 'AngioTC de aorta imediata, sem esperar D-dímero. Controlar dor, FC (< 60) e PAS (100 a 120) e acionar a cirurgia vascular ou cardíaca.' }
  ],
  note: 'Cada categoria vale 1 ponto, com um ou vários achados.',
  ref: 'Rogers AM et al. Circulation. 2011;123:2213-8. Nazerian P et al. Circulation. 2018;137:250-8 (ADvISED).'
},
{
  slug: 'parkland', name: 'Parkland', title: 'Fórmula de Parkland para queimados', cat: 'Trauma', kicker: 'Trauma · Queimadura',
  size: '3 dados',
  what: 'Volume de cristaloide nas primeiras 24 h do grande queimado.',
  seo: 'Fórmula de Parkland em português: calcule o volume de Ringer lactato do queimado, quanto correr nas primeiras 8 h e nas 16 h seguintes, com regra dos 9.',
  kind: 'parkland',
  items: [
    { id: 'form', type: 'choice', t: 'Fórmula', s: 'fórmula', def: 0, noPts: true, opts: [ { l: 'Parkland (4 mL)', p: 4 }, { l: 'Adulto ATLS 10ª ed. (2 mL)', p: 2 }, { l: 'Criança (3 mL)', p: 3, kid: true }, { l: 'Queimadura elétrica (4 mL)', p: 4, elec: true } ] },
    { id: 'peso', type: 'num', t: 'Peso', unit: 'kg', ph: 'ex.: 70', s: 'peso', min: 1, max: 300 },
    { id: 'scq', type: 'num', t: 'Superfície corporal queimada', h: 'Só 2º e 3º grau. A palma da mão do paciente vale cerca de 1%.', unit: '%', ph: 'ex.: 30', s: 'SCQ', min: 1, max: 100, optional: true },
    { type: 'group', t: 'Regra dos 9 (se ainda não tem a SCQ)' },
    { id: 'r_cab', type: 'check', noPts: true, t: 'Cabeça e pescoço', pts: 9, s: 'cabeça e pescoço' },
    { id: 'r_msd', type: 'check', noPts: true, t: 'Membro superior direito', pts: 9, s: 'MSD' },
    { id: 'r_mse', type: 'check', noPts: true, t: 'Membro superior esquerdo', pts: 9, s: 'MSE' },
    { id: 'r_ant', type: 'check', noPts: true, t: 'Tronco anterior', pts: 18, s: 'tronco anterior' },
    { id: 'r_post', type: 'check', noPts: true, t: 'Tronco posterior', pts: 18, s: 'tronco posterior' },
    { id: 'r_mid', type: 'check', noPts: true, t: 'Membro inferior direito', pts: 18, s: 'MID' },
    { id: 'r_mie', type: 'check', noPts: true, t: 'Membro inferior esquerdo', pts: 18, s: 'MIE' },
    { id: 'r_per', type: 'check', noPts: true, t: 'Períneo', pts: 1, s: 'períneo' },
    { type: 'group', t: 'Opcional' },
    { id: 'horas', type: 'num', t: 'Horas desde a queimadura', unit: 'h', ph: 'ex.: 2', s: 'horas desde a queimadura', min: 0, max: 24, optional: true },
    { id: 'feito', type: 'num', t: 'Volume já infundido', h: 'Desde a queimadura, inclusive no transporte.', unit: 'mL', ph: 'ex.: 1000', s: 'volume já infundido', min: 0, max: 50000, optional: true }
  ],
  bands: [
    { key: 'h8', r: 'Primeiras 8 h', label: 'Metade do volume', level: 2, text: '' },
    { key: 'h16', r: '16 h seguintes', label: 'A outra metade', level: 2, text: '' }
  ],
  note: 'As 8 h contam a partir da hora da queimadura, não da chegada. Na criança, a regra dos 9 subestima a cabeça: prefira Lund-Browder.',
  ref: 'Baxter CR, Shires T. Ann N Y Acad Sci. 1968;150:874-94. ATLS, 10ª ed. (2018).'
},
{
  slug: 'ottawa-hsa', name: 'Ottawa HSA', title: 'Regra de Ottawa para hemorragia subaracnoide', cat: 'Neuro', kicker: 'Neuro · Cefaleia súbita',
  size: '6 critérios',
  what: 'Cefaleia súbita: quem precisa investigar HSA.',
  seo: 'Regra de Ottawa para hemorragia subaracnoide em português: veja se a cefaleia súbita precisa de investigação para HSA, copie para o prontuário e imprima a ficha.',
  kind: 'rule', anyRule: true,
  items: [
    { id: 'idade', type: 'check', t: 'Idade ≥ 40 anos', s: 'idade ≥ 40' },
    { id: 'cerv', type: 'check', t: 'Dor ou rigidez no pescoço', h: 'Queixa do paciente.', s: 'dor ou rigidez cervical' },
    { id: 'pc', type: 'check', t: 'Perda de consciência testemunhada', s: 'perda de consciência testemunhada' },
    { id: 'esforco', type: 'check', t: 'Início durante esforço', s: 'início ao esforço' },
    { id: 'trovao', type: 'check', t: 'Cefaleia em trovoada', h: 'Pico de intensidade instantâneo.', s: 'cefaleia em trovoada' },
    { id: 'flexao', type: 'check', t: 'Flexão do pescoço limitada no exame', h: 'Não encosta o queixo no peito ou não ergue a cabeça do leito em decúbito.', s: 'flexão cervical limitada' }
  ],
  bands: [
    { key: 'neg', r: 'Nenhum critério', label: 'HSA afastada pela regra', level: 1, text: 'Sem investigação para HSA. Tratar a cefaleia e orientar retorno.' },
    { key: 'pos', r: '1 ou mais critérios', label: 'Investigar HSA', level: 4, text: 'TC de crânio sem contraste. Feita em até 6 h do início e normal, afasta. Depois de 6 h e normal: punção lombar ou angioTC.' }
  ],
  note: 'Só para pacientes alertas, ≥ 15 anos, com cefaleia nova, forte, não traumática e com pico em até 1 h. Não use se houver déficit neurológico novo, HSA ou aneurisma prévios, tumor cerebral ou cefaleias recorrentes iguais.',
  ref: 'Perry JJ et al. JAMA. 2013;310:1248-55. Perry JJ et al. CMAJ. 2017;189:E1379-85.'
}
);
Object.assign(window.GUIAS, {
  'add-rs': { rows: [
    ['0', 'Baixa probabilidade de dissecção.', 'Buscar outra causa. Se a dissecção ainda for uma hipótese, D-dímero: abaixo de 500 ng/mL afasta.'],
    ['1', 'Probabilidade intermediária.', 'D-dímero. Abaixo de 500 ng/mL afasta (falha em torno de 0,3% no ADvISED). Elevado: angioTC de aorta.'],
    ['2 ou 3', 'Alta probabilidade.', 'AngioTC de aorta já (ou eco transesofágico se instável). Analgesia com opioide, betabloqueador EV para FC < 60 e depois PAS 100 a 120, e acionar a cirurgia. Não anticoagular nem antiagregar até afastar.']
  ], obs: 'D-dímero não serve para afastar dissecção com ADD-RS 2 ou 3. Radiografia de tórax normal não afasta.' },
  'parkland': { rows: [
    ['Primeiras 8 h', 'Metade do volume calculado, contadas desde a hora da queimadura.', 'Ringer lactato aquecido. Se chegou atrasado, a metade restante corre no tempo que falta para fechar 8 h.'],
    ['16 h seguintes', 'A outra metade.', 'Manter Ringer lactato e ajustar a velocidade pela diurese, não pela fórmula.'],
    ['Diurese', 'É o alvo que manda na reposição.', 'Adulto: 0,5 mL/kg/h. Criança < 30 kg: 1 mL/kg/h. Elétrica com mioglobinúria: 1 a 1,5 mL/kg/h. Acima do alvo, reduzir em 1/3; abaixo, aumentar.']
  ], obs: 'Indicado para SCQ ≥ 20% no adulto (≥ 10 a 15% na criança). A fórmula é só o ponto de partida: excesso de volume causa síndrome compartimental e edema pulmonar. Criança < 30 kg: somar soro de manutenção com glicose.' },
  'ottawa-hsa': { rows: [
    ['Nenhum critério', 'HSA afastada pela regra (sensibilidade de 100% na derivação e na validação).', 'Sem TC nem punção para HSA. Analgesia, buscar outra causa e orientar retorno.'],
    ['1 ou mais', 'Não afasta HSA. A especificidade é baixa: a maioria não terá HSA.', 'TC sem contraste. Em até 6 h do início e normal (tomógrafo moderno, laudo experiente): HSA afastada. Depois de 6 h e normal: punção lombar (xantocromia, hemácias) ou angioTC.']
  ], obs: 'HSA confirmada: neurocirurgia, PAS < 160, nimodipino, reverter anticoagulação e cabeceira a 30°.' }
});
