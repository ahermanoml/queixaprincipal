# Mudanças nas figuras do Procedimentos

## 14/11/2026 — Drenagem de tórax no estilo "manual de montagem" (branch `figuras-v2`, piloto)

Pedido do Antônio (14/11, 13h06): as orientações do Queixa Principal em vídeo no estilo de manual de montagem de móvel.
Piloto só no `dreno`. Ilustrações próprias em SVG (fundo creme, traço de manual, vermelho do QP nos destaques), as mesmas do vídeo
`video/manual-dreno.mp4`, que fica no topo da guia **Como fazer**. Geradas por script (`motores-de-video/manual/exemplos/dreno/figuras.py`).
Texto clínico, doses e passos de `data/procedimentos.js` não mudaram — só a lista de figuras do dreno (`PROC_FIGURAS`) e as legendas delas.

| Figura | Passo | O que mudou | Por quê |
|---|---|---|---|
| `dreno-4.svg` (nova) | preparo.1 | Posição: decúbito dorsal, cabeceira 30–45°, braço atrás da cabeça | ilustrar o passo 1 do vídeo |
| `dreno-1.svg` | preparo.2 | Redesenhada: tórax de perfil com o braço levantado, triângulo, linha axilar média, mamilo/5º EIC, alvo no 4º–5º EIC e a zona proibida (fígado/baço) abaixo do mamilo | **Legenda corrigida, para o Antônio confirmar:** a antiga dizia "inserção no 5º EIC, linha axilar média"; o ATLS 10 (citado nas fontes do dreno) fala em 4º ou 5º EIC, logo **à frente** da linha axilar média, e a BTS só pede que fique dentro do triângulo, acima da linha do 5º EIC. Nova legenda: "inserção no 4º–5º EIC, logo à frente da linha axilar média". Divergência: o MSD Manual cita 5º–6º EIC na axilar média. |
| `dreno-5.svg` (nova) | tecnica.1 | Anestesia por planos (pele, trajeto, periósteo, pleura) e incisão de 2–3 cm sobre a costela de baixo | o passo de anestesia (preparo.5) e o da incisão não tinham desenho |
| `dreno-2.svg` | tecnica.2 | Redesenhada como corte anatômico em camadas (pele, subcutâneo, músculo, costelas, intercostais, pleura, pulmão), feixe V-A-N na borda inferior da costela de cima com ✕, Kelly pela borda superior da costela de baixo com ✓ | mesmo conteúdo, anatomia mais clara; nada de errado na antiga |
| `dreno-6.svg` (nova) | tecnica.4 | Kelly fechada fura a pleura e abre; dedo no trajeto; "trocarte: nunca" | ilustrar o "cuidado" do passo |
| `dreno-7.svg` (nova) | tecnica.5 | Direção: ar para cima e para a frente, líquido para trás e para baixo; detalhe com todos os orifícios dentro | passos 5 e 6 da técnica |
| `dreno-3.svg` | tecnica.7 | Redesenhada no mesmo estilo: paciente na maca com cabeceira elevada, frasco no chão abaixo do nível do tórax, haste ~2 cm, respiro, oscila/borbulha | mesmo conteúdo; nada de errado na antiga |
| `dreno-8.svg` (nova) | tecnica.8 | Sutura no dreno, curativo e RX de controle (posição e reexpansão) | fechamento do passo a passo |
| `dreno-9.svg` (nova) | depois.4 | Não clampear dreno que borbulha; hemotórax ≥ 1.500 mL de saída ou > 200 mL/h por 2–4 h → cirurgia | os dois avisos de segurança do "depois" |

Para o Antônio decidir:
- Se a legenda da inserção fica "4º–5º EIC, logo à frente da linha axilar média" (ATLS 10) ou volta para "5º EIC, linha axilar média".
- Se 9 figuras no dreno é muito para a página (dá para ficar só com as do vídeo que mais ajudam: triângulo, corte, selo, atenção).
- O vídeo (voz, ritmo, piadas) antes de fazer os outros 9 procedimentos.

A página `previa-figuras.html` e a pasta `img/procedimentos/_antes/` (cópia das figuras antigas do dreno) existem só na branch `figuras-v2`, para a prévia: **não vão para a main**.
