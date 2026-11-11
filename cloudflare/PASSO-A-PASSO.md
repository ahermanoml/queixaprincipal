# Ligar as contas do Queixa Principal na Cloudflare (≈ 5 minutos)

Você vai criar duas coisas no painel da Cloudflare: um **KV** (onde ficam os rascunhos, já criptografados)
e um **Worker** (o programinha que atende o site). No fim, me mande o endereço do Worker.

## 1. Criar o KV (o "armário" dos rascunhos)
1. Entre em **dash.cloudflare.com**.
2. No menu da esquerda: **Storage & Databases → KV** (em português: *Armazenamento e bancos de dados → KV*).
3. Clique em **Create** (*Criar*).
4. Nome: `qprincipal-rascunhos` → **Add** / **Create**.

## 2. Criar o Worker
1. Menu da esquerda: **Compute (Workers) → Workers & Pages**.
2. **Create** → aba **Workers** → **Start with Hello World!** (ou "Create Worker").
3. Nome: `qprincipal-api` → **Deploy**.
4. Na tela seguinte, clique em **Edit code** (*Editar código*).
5. Apague tudo o que estiver no arquivo `worker.js` da esquerda e **cole o conteúdo inteiro** de
   `cloudflare/worker.js` (deste repositório).
6. Clique em **Deploy** (canto superior direito) e confirme.

## 3. Ligar o KV ao Worker
1. Volte para a página do Worker `qprincipal-api` (seta "voltar" ou Workers & Pages → qprincipal-api).
2. Aba **Settings** (*Configurações*) → **Bindings** (*Vinculações*) → **Add** (*Adicionar*).
3. Escolha **KV namespace**.
4. **Variable name:** `RASCUNHOS` (exatamente assim, em maiúsculas).
5. **KV namespace:** `qprincipal-rascunhos` → **Save / Deploy**.

## 4. Me mandar o endereço
Na página do Worker aparece um endereço do tipo
`https://qprincipal-api.SEU-SUBDOMINIO.workers.dev` (em **Domains & Routes** / *Domínios e rotas*).
Copie e me mande — eu coloco no site e testo criar uma conta.

Teste rápido (opcional): abra no navegador `https://qprincipal-api.SEU-SUBDOMINIO.workers.dev/u/teste`.
Deve aparecer `{"existe":false}`. Se aparecer erro falando de `RASCUNHOS`, o passo 3 ficou faltando.
