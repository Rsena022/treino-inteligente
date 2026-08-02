# 🧠 MEMÓRIA DO PROJETO — PACK TREINO INTELIGENTE
*Documento de registro e atualização de todas as tarefas finalizadas, integrações e estruturas.*

---

## 📂 1. LOCALIZAÇÃO DOS PROJETOS NO COMPUTADOR

- **1. Área de Membros (Portal dos Alunos + Webhook Cakto)**:
  - 📂 Pasta: `C:\Users\senar\.gemini\antigravity-ide\scratch\treino-inteligente\`
  - 🌐 Link Produção Vercel: **[treino-inteligente.vercel.app](https://treino-inteligente.vercel.app)**
  - 🐙 Repositório GitHub: `Rsena022/treino-inteligente`

- **2. Página de Vendas (Landing Page CRO R$ 14,90)**:
  - 📂 Pasta: `C:\Users\senar\.gemini\antigravity-ide\scratch\landing-page-treino-inteligente\`
  - 💻 Servidor Local de Preview: **[http://localhost:3000](http://localhost:3000)**
  - 🌐 Domínio Alvo Vercel: **[pack-treino-inteligente.vercel.app](https://pack-treino-inteligente.vercel.app)**
  - 🐙 Repositório GitHub: `Rsena022/landing-page-treino-inteligente`

---

## 🚀 2. REGISTRO COMPLETO DAS IMPLEMENTAÇÕES E MELHORIAS (01/08 - 02/08):

### A. Integração de Liberação Automática de Acesso (Cakto + Supabase + Webhook):
1. **Webhook da Cakto (`api/webhooks/cakto.js`)**:
   - Endpoint ativo e implantado na Vercel: `https://treino-inteligente.vercel.app/api/webhooks/cakto`.
   - Adicionada a chave de Administrador **`SUPABASE_SERVICE_ROLE_KEY`** no servidor backend para salvar novos alunos ignorando travas de RLS (Row Level Security).
   - Suporte completo a **CORS**, requisições preflight `OPTIONS` e varredura por **Regex** para identificar e-mails em 14 estruturas de payload da Cakto (`buyer.email`, `customer.email`, `payer.email`, `client.email`, etc.).
   - **Validação de Teste Concluída:** Teste de compra aprovada realizado no painel da Cakto com gravação imediata do e-mail `john.doe@example.com` como `ativo` no Supabase.

2. **Fluxo de Autenticação no Front-end (`main.js`)**:
   - Conectado com a tabela `treino_alunos` no Supabase (`https://yizccvmpfuwccvxcbgwa.supabase.co`).
   - O aluno digita o mesmo e-mail do checkout da Cakto no site e o acesso é liberado instantaneamente.
   - E-mails reembolsados ou cancelados são bloqueados automaticamente.

---

### B. Player de Vídeo e Experiência do Aluno (Área de Membros):
1. **Ajuste Fino do Player do Google Drive**:
   - Corrigida a posição do iframe com corte preciso da barra superior do Drive (`top: -40px`, `height: calc(100% + 40px)`), mantendo os controles inferiores (volume, velocidade, barra de tempo e tela cheia) visíveis e funcionais.
   - Otimizado o tempo de carregamento da tela preta (`videoLoader`) para sumir em no máximo **800ms** com transição de fade-out rápida de **150ms**.
2. **Organização das 4 Semanas + Biblioteca**:
   - Liberada a exibição completa de todos os 5 treinos guiados (Dia 1 ao Dia 5) em grid de 2 colunas com rolagem livre no celular.
3. **Categorização dos 379 Exercícios da Biblioteca**:
   - Mapeados e renomeados todos os 379 vídeos da biblioteca com **nomes reais e descritivos de exercícios funcionais em português** (*Agachamento Búlgaro, Abdominal Remador, Burpee Completo, Flexão de Braço, Prancha Frontal, Stiff RDL, Elevação Pélvica, Kettlebell Swing*, etc.).
   - Barra de pesquisa em tempo real filtrando instantaneamente por tipo de treino (*Agachamento, Abdominal, Burpee, Flexão, HIIT, Cardio, Tríceps, Perna, etc.*).

---

### C. Página de Vendas (Landing Page de Alta Conversão):
1. **Checkout Oficial Conectado**:
   - Link oficial da Cakto (`https://pay.cakto.com.br/v6wexsg_1016190`) integrado em **todos** os botões CTA da página (Navbar, Hero, Cartão de Oferta de R$ 14,90 e Barra Flutuante Mobile).
2. **Suporte no WhatsApp**:
   - Link oficial do WhatsApp de atendimento (`https://wa.me/559392332026`) atualizado na seção de dúvidas do FAQ.
3. **Prova Social ao Vivo (Social Proof Toast)**:
   - Fila ampliada para **35 compradores únicos** de diferentes cidades e estados do Brasil com algoritmo de embaralhamento em fila (*Shuffle Queue*) sem repetição.
4. **Identidade Visual, Logo & Favicon**:
   - Criada logo oficial futurista em Ciano Neon com símbolo de haltere metálico e raio.
   - Aplicados **Favicon (`favicon.png`)**, imagens no cabeçalho/footer e meta tags **Open Graph (`og:image`)** para exibição de capa ao compartilhar o link no WhatsApp e redes sociais.

---

## 📌 3. RESUMO DOS LINKS E RECURSOS DO PROJETO

- **Área de Membros (Vercel):** `https://treino-inteligente.vercel.app`
- **Endpoint do Webhook Cakto:** `https://treino-inteligente.vercel.app/api/webhooks/cakto`
- **Checkout Oficial Cakto:** `https://pay.cakto.com.br/v6wexsg_1016190`
- **Suporte WhatsApp:** `https://wa.me/559392332026`
- **Banco de Dados Supabase:** Projeto `yizccvmpfuwccvxcbgwa` (`treino_alunos`)

---
*Documento atualizado em 02/08/2026 — Projeto Treino Inteligente*
