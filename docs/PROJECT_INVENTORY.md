# Inventário de projetos

Registro da auditoria feita antes de escrever qualquer linha do portfólio. A regra
foi simples: **nada entra na página sem um artefato verificável** — README,
`package.json`, código, documentação interna, repositório público ou URL
publicada.

Data da auditoria: **15 de novembro de 2026**.

## Como a auditoria foi feita

1. Leitura das pastas em `C:\Users\paulo\OneDrive\Documentos`, um projeto por vez.
2. Leitura de `README.md`, `package.json`, estrutura de `src/`, `docs/` e
   migrations — sem abrir `.env`, chaves, tokens ou arquivos de credencial.
3. Conferência de `git remote` para identificar o repositório de origem.
4. Consulta à API do GitHub para confirmar quais repositórios são públicos.
5. `HEAD`/`GET` nas URLs de produção para confirmar o que está no ar.
6. Captura de tela apenas de interfaces reais: app rodando localmente ou site
   publicado. Onde não havia captura possível, o card usa um painel desenhado com
   a stack — nunca uma interface inventada.

## Projetos publicados no portfólio

| # | Projeto | Repositório | Visibilidade | Status declarado | Evidência principal |
|---|---------|-------------|--------------|------------------|---------------------|
| 1 | **AgendFy** | `agendfy-agendamento` → `pauloaraujodeveloper/agendfy` | privado | Em desenvolvimento | README, `server/migrations/`, docs de segurança/LGPD, constraint `no_professional_overlap` |
| 2 | **AgendFy Chatbot** | `agendfy-chatbot` | privado | Em desenvolvimento | README, `docs/` de arquitetura e conectores, PRD, testes de contrato |
| 3 | **OmniTask** | `portifolio` → `pauloaraujodeveloper/omnitask` | público (MIT) | MVP | README, `js/` (auth, storage, tasks), `css/theme-boardui.css`, demo local |
| 4 | **EstoquePro** | `controle-de-estoque` → `pauloaraujodeveloper/estoque-pro` | público | MVP | README, rotas Express, isolamento por tenant, demo pública |
| 5 | **DataQore** | `dataqore` | privado | Publicado | README, `lib/mapa.ts`, site em produção |
| 6 | **Nexora** | `nexora` → `pauloaraujodeveloper/nexora` | público | Conceito | README (com limites declarados), `lib/seed.ts`, store local |
| 7 | **AgendFy Site** | `agendfy-site` | privado | Publicado | README, `src/content`, `src/seo.ts`, build SSR, site em produção |
| 8 | **Escale** | `Escale` → `pauloaraujodeveloper/customer-success-pro` | privado | MVP (fase 1) | README com roadmap da fase 2, componentes de Kanban/Gantt, Zustand |
| 9 | **Tiamate Coffee** | `tiamate` → `pauloaraujodeveloper/tiamate` | público | Estudo | README, pacote de especificação do Figma, HTML/CSS implementado |

### URLs verificadas

| URL | Resultado em 15/11/2026 | Uso no site |
|-----|--------------------------|-------------|
| `https://dataqore.vercel.app` | 200 | link "Ver publicado" |
| `https://agendfy-site.vercel.app` | 200 | link "Ver site" |
| `https://controle-estoque-gilt-ten.vercel.app` | 200 | link "Demonstração" |
| `https://site-fashion-ia.vercel.app` | 404 | **não usado** (projeto fora do portfólio) |
| `https://agendfy.vercel.app` | tela de login da Vercel | **não usado** (não é uma demo pública) |

`nexora.vercel.app` e `omnitask.vercel.app` pertencem a outros projetos e por
isso não foram usados.

### Capturas de tela

| Arquivo | Origem | O que mostra |
|---------|--------|--------------|
| `dataqore-mapa`, `dataqore-slide`, `dataqore-engenharia` | site publicado (dataqore.vercel.app) | mapa nos modos Negócio e Engenharia e um slide aberto |
| `estoquepro-dashboard`, `estoquepro-pdv`, `estoquepro-produtos` | app rodando localmente, banco SQLite novo e vendas de exemplo feitas pelo PDV | dashboard, PDV com carrinho e lista de produtos |
| `omnitask-quadro`, `omnitask-planejador`, `omnitask-nova-tarefa` | app rodando localmente, conta de demonstração e tarefas de exemplo | quadro, planejador mensal e diálogo de nova tarefa |
| `agendfy-site-home.png` | site publicado | página inicial |
| `agendfy-site-recursos.png` | site publicado | seção de recursos |
| `agendfy-site-seguranca.png` | site publicado | seção de segurança |
| `agendfy-site-mobile.png` | site publicado | versão móvel |

AgendFy, AgendFy Chatbot, Nexora, Escale e Tiamate não têm captura: são produtos
privados ou exercícios sem interface publicada. Nesses casos o card mostra um
painel tipográfico com a stack real.

## Pastas auditadas e descartadas

| Pasta | Motivo do descarte |
|-------|--------------------|
| `linktree` | exercício curto de página de links, sem sistema por trás |
| `projeto-rocketseat` | repositório vazio |
| `atividade-lista-tarefa`, `new-atividade`, `html-css-intrucao` | exercícios de curso, superados pelo OmniTask |
| `agente-atendimento-agendfy` | repositório sem código de aplicação (apenas `.git` na pasta local) |
| `arquitetura`, `assets`, `Backup`, `Default Project`, `Clientes`, `Pessoal`, `Faculdade`, `GTA`, `deepseek-harness` | documentação, material de apoio ou trabalho não relacionado a produto de software |
| `site-fashion-ia` | repositório público, mas a URL publicada responde 404 e o projeto não faz parte do posicionamento atual |

## O que foi deliberadamente omitido

- Métricas de uso, número de usuários ou clientes: não há dado verificável.
- Certificações e prêmios: não existem.
- Tecnologias estudadas sem projeto: ficaram fora da seção de stack.
- Funcionalidades planejadas: aparecem apenas como "limites declarados" ou no
  roadmap descrito no README de origem, nunca como recurso pronto.
- Credenciais, chaves e conteúdo de `.env`: não foram lidos nem citados.

## Divergências encontradas (e como foram tratadas)

1. **Nexora** é frontend com autorização apenas de interface. O site declara isso
   no bloco "Limites declarados".
2. **Escale** tem autenticação simulada e nenhum backend. O card diz "MVP de fase
   1" e o modal repete que NestJS/PostgreSQL/Prisma são roadmap.
3. **OmniTask** usa autenticação local de demonstração. O texto diz "MVP ...
   autenticação local de demonstração — sem backend".
4. **Tiamate** é apenas desktop por causa do arquivo original. O estudo declara a
   limitação em vez de fingir responsividade.
5. **AgendFy Chatbot** tem a etapa 1 do painel concluída, não o fluxo inteiro. O
   status diz "em desenvolvimento" e a nota explica o que está pronto.
