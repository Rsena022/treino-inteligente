# 🧠 MEMÓRIA DO PROJETO — PACK TREINO INTELIGENTE
*Documento de registro e atualização de todas as tarefas finalizadas, integrações, estruturas e próximos passos.*

---

## 📂 1. LOCALIZAÇÃO DOS PROJETOS NO COMPUTADOR

- **1. Área de Membros (Portal dos Alunos + Webhook Cakto)**:
  - 📂 Pasta Local: `C:\Users\senar\.gemini\antigravity-ide\scratch\treino-inteligente\`
  - 🌐 Link Produção Vercel: **[treino-inteligente.vercel.app](https://treino-inteligente.vercel.app)**
  - 🐙 Repositório GitHub: **[Rsena022/treino-inteligente](https://github.com/Rsena022/treino-inteligente)**

- **2. Página de Vendas (Landing Page CRO R$ 14,90)**:
  - 📂 Pasta Local: `C:\Users\senar\.gemini\antigravity-ide\scratch\landing-page-treino-inteligente\`
  - 💻 Servidor Local de Preview: **[http://localhost:3000](http://localhost:3000)**
  - 🌐 Domínio Produção Vercel: **[pack-treino-inteligente.vercel.app](https://pack-treino-inteligente.vercel.app)**
  - 🐙 Repositório GitHub: **[Rsena022/landing-page-treino-inteligente](https://github.com/Rsena022/landing-page-treino-inteligente)**

---

## 🚀 2. REGISTRO COMPLETO DAS IMPLEMENTAÇÕES E MELHORIAS (01/08 - 04/08):

### A. Integração de Liberação Automática de Acesso (Cakto + Supabase + Webhook):
1. **Webhook da Cakto (`api/webhooks/cakto.js`)**:
   - Endpoint ativo e implantado na Vercel: `https://treino-inteligente.vercel.app/api/webhooks/cakto`.
   - Adicionada a chave de Administrador **`SUPABASE_SERVICE_ROLE_KEY`** no servidor backend para salvar novos alunos ignorando travas de RLS (Row Level Security).
   - Suporte completo a **CORS**, requisições preflight `OPTIONS` e varredura por **Regex** para identificar e-mails em 14 estruturas de payload da Cakto (`buyer.email`, `customer.email`, `payer.email`, `client.email`, etc.).
   - **Validação de Teste Concluída:** Teste de compra aprovada realizado no painel da Cakto com gravação imediata do e-mail no Supabase com status `ativo`.

2. **Fluxo de Autenticação no Front-end (`main.js`)**:
   - Conectado com a tabela `treino_alunos` no Supabase (`https://yizccvmpfuwccvxcbgwa.supabase.co`).
   - O aluno digita o mesmo e-mail do checkout da Cakto no site e o acesso é liberado instantaneamente.
   - E-mails reembolsados ou cancelados são bloqueados automaticamente.

---

### B. Área de Membros & Refatoração da Tela de Login:
1. **Refatoração da Tela de Login Glassmorphic (`index.html` e `styles.css`)**:
   - Corrigida a estrutura HTML adicionando o contêiner **`.login-card`** envolvente, eliminando o problema de quebra de layout horizontal no celular.
   - Design glassmorphic neon com *blur* de alta resolução (`backdrop-filter: blur(25px)`), borda fina ciano neon e efeito de profundidade.
   - Ícone de e-mail integrado dentro do campo de digitação, badge *"PORTAL DE MEMBROS"*, botão em largura total (100%) e regras responsivas para celulares (`@media max-width: 480px`).
2. **Ajuste Fino do Player do Google Drive**:
   - Corrigida a posição do iframe com corte preciso da barra superior do Drive (`top: -40px`, `height: calc(100% + 40px)`), mantendo os controles inferiores (volume, velocidade, barra de tempo e tela cheia) visíveis e funcionais.
   - Otimizado o tempo de carregamento da tela preta (`videoLoader`) para sumir em no máximo **800ms** com transição de fade-out rápida de **150ms**.
3. **Organização das 4 Semanas + 379 Exercícios**:
   - Mapeados e renomeados todos os 379 vídeos da biblioteca com **nomes reais e descritivos de exercícios funcionais em português** (*Agachamento Búlgaro, Abdominal Remador, Burpee Completo, Flexão de Braço, Prancha Frontal, Stiff RDL, Elevação Pélvica, Kettlebell Swing*, etc.).
   - Barra de pesquisa em tempo real filtrando instantaneamente por tipo de treino (*Agachamento, Abdominal, Burpee, Flexão, HIIT, Cardio, Tríceps, Perna, etc.*).

---

### C. Página de Vendas (Landing Page CRO R$ 14,90):
1. **Checkout Oficial & Pixel de Rastreamento (UTMify & Meta Pixel Hook)**:
   - Instalado o script oficial do **Pixel de Rastreio UTMify** (`pixelId: 6a6130d7d6b645b27cf1c514`) no `<head>` do `index.html` para rastreamento de campanhas, atribuição de UTMs e métricas de tráfego pago.
   - Link oficial da Cakto (`https://pay.cakto.com.br/v6wexsg_1016190`) integrado em **todos** os botões CTA da página (Navbar, Hero, Cartão de Oferta de R$ 14,90 e Barra Flutuante Mobile).
   - Hook do Meta Pixel (`InitiateCheckout`) configurado para rastrear cliques para o checkout da Cakto.
2. **Inclusão e Otimização do Vídeo VSL de Vendas (`vsl_treino_inteligente.mp4`)**:
   - Vídeo `Treino inteligente 2.mp4` otimizado e exportado em 720p / H.264 a 30fps.
   - Tamanho reduzido em **mais de 50%** (de 103 MB para **51 MB**), garantindo carregamento instantâneo e reprodução 100% fluida em conexões 4G/3G no celular.
   - Implementado player **HTML5 responsivo** na Hero Section com overlay interativo em néon (*"CLIQUE PARA ASSISTIR À APRESENTAÇÃO COMPLETA"*), botão com animação de pulso, suporte a retina/mobile (`playsinline`) e transição suave de fade-out ao dar play.
3. **Publicação no GitHub & Vercel**:
   - Repositório público no GitHub: `Rsena022/landing-page-treino-inteligente`.
   - URL oficial em produção: **`pack-treino-inteligente.vercel.app`**.

---

### D. Order Bump & Artes do Checkout da Cakto (CRO 10/10):
1. **Criado o Produto de Order Bump ("Protocolo Barriga Zero 21 Dias")**:
   - Produto adicional por **R$ 9,90** para aumentar o ticket médio por venda (AOV).
   - Gerado o material completo em Markdown ([protocolo_barriga_zero_21_dias.md](file:///C:/Users/senar/.gemini/antigravity-ide/scratch/treino-inteligente/assets/protocolo_barriga_zero_21_dias.md)) e a versão em HTML diagramada ([protocolo_barriga_zero_21_dias.html](file:///C:/Users/senar/.gemini/antigravity-ide/scratch/treino-inteligente/assets/protocolo_barriga_zero_21_dias.html)) pronta para exportação direta em PDF (Ctrl+P).
2. **Banners Panorâmicos 1200x300 (4:1) para a Cakto**:
   - Geradas artes retangulares no formato exato da Cakto (`cakto_banner_1200x300.png` e `cakto_banner_full_width.png`) cobrindo 100% da largura do topo de ponta a ponta.
   - Criada a capa do Order Bump (`order_bump_banner.png`).
3. **Prova Social Unissex com Avatares Realistas**:
   - Gerados **4 avatares de fotos de perfil ultra-realistas** de alunos (`aluno_juliana.png`, `aluno_carlos.png`, `aluno_patricia.png`, `aluno_lucas.png`).
   - Mapeados **10 depoimentos unissex validados** para uso na página e no checkout.

---

### E. Automações e Scripts Auxiliares (`scratch/`):
1. **Mapeamento e Extração de Vídeos (`extract_all_videos.js` / `videos_database.json`)**:
   - Scripts dedicados para raspagem, organização e montagem da base de dados dos 379+ vídeos hospedados no Google Drive, formatados em JSON e JS para carregamento rápido no front-end.
2. **Integração com n8n (`update_n8n.js` / `update_n8n.py`)**:
   - Scripts de sincronização de fluxos n8n para captura de webhooks da Cakto, automação de mensagem de boas-vindas no WhatsApp e envio de credenciais de acesso.

---

## 📌 3. RESUMO DOS LINKS E RECURSOS DO PROJETO

| Recurso | URL / Caminho |
| :--- | :--- |
| **Área de Membros (Vercel)** | `https://treino-inteligente.vercel.app` |
| **Página de Vendas (Vercel)** | `https://pack-treino-inteligente.vercel.app` |
| **Endpoint do Webhook Cakto** | `https://treino-inteligente.vercel.app/api/webhooks/cakto` |
| **Checkout Oficial Cakto** | `https://pay.cakto.com.br/v6wexsg_1016190` |
| **Suporte WhatsApp** | `https://wa.me/559392332026` |
| **Banco de Dados Supabase** | Projeto `yizccvmpfuwccvxcbgwa` (Tabela: `treino_alunos`) |

---

## 🎯 4. ROADMAP E PRÓXIMOS PASSOS OPERACIONAIS

- [ ] **1. Tráfego Pago & Meta Ads**:
  - Subir campanhas com foco direto no link da Landing Page (`pack-treino-inteligente.vercel.app`).
  - Monitorar taxa de conversão dos CTAs apontando para a Cakto.
  - Avaliar a taxa de conversão do Order Bump de R$ 9,90 no checkout.
- [ ] **2. Acompanhamento de Webhooks & Alunos**:
  - Validar no Supabase a inserção de e-mails de compradores reais em tempo real.
  - Garantir que usuários com status `ativo` conseguem efetuar o login sem fricção.
- [ ] **3. Expansão de Conteúdo**:
  - Adicionar materiais bônus adicionais (PDFs e guias de nutrição) diretamente no portal de membros.
  - Implementar sistema de marcação de "Exercício Concluído" (salvo via LocalStorage ou Supabase).

---

## 🛠️ 5. GUIA DE MANUTENÇÃO RÁPIDA E COMANDOS ÚTEIS

### Variáveis de Ambiente Necessárias (Vercel Backend):
- `SUPABASE_URL`: `https://yizccvmpfuwccvxcbgwa.supabase.co`
- `SUPABASE_SERVICE_ROLE_KEY`: *(Chave com permissão de escrita de admin)*

### Teste Local da Landing Page ou Área de Membros:
```bash
# Na pasta de qualquer um dos projetos:
npx serve -s . -l 3000
```

### Sincronização com o GitHub:
```bash
# Para a área de membros:
cd C:\Users\senar\.gemini\antigravity-ide\scratch\treino-inteligente
git add .
git commit -m "docs: atualiza memoria do projeto"
git push origin master

# Para a landing page:
cd C:\Users\senar\.gemini\antigravity-ide\scratch\landing-page-treino-inteligente
git add .
git commit -m "docs: atualiza memoria do projeto"
git push origin master
```

---

*Documento atualizado em 04/08/2026 — Projeto Treino Inteligente*
