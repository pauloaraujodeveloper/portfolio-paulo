import type { Project } from "@/types/portfolio";

/**
 * Single source of truth for the projects section.
 *
 * Every claim here was checked against the repository on disk (README,
 * package.json, source tree and docs). Nothing is inferred from a name or a
 * screenshot: features that are planned but not built live in `statusNote` or
 * are absent. See docs/PROJECT_INVENTORY.md for the audit trail.
 */
export const projects: Project[] = [
  {
    slug: "agendfy",
    name: "AgendFy",
    tagline: "Gestão de clínicas com agenda sem conflito e dados sensíveis protegidos",
    summary:
      "Sistema de agenda para clínicas: recepção, profissionais e pacientes no mesmo fluxo, com conflito de horário impedido pelo banco e dados pessoais criptografados.",
    problem:
      "Clínicas pequenas e médias administram horários em planilhas e agendas paralelas. O resultado é horário vendido duas vezes, informação de paciente espalhada e nenhuma trilha de quem acessou o quê. É o tipo de operação que a LGPD cobra.",
    solution:
      "Um serviço Fastify que entrega interface e API, com PostgreSQL como fonte da verdade. O conflito de agenda é impedido por uma constraint EXCLUDE do Postgres (profissional e sala), não por validação de tela. Dados pessoais são cifrados com AES-256-GCM e chave por clínica, com índice cego para busca por CPF e telefone.",
    highlights: [
      {
        title: "Conflito barrado no banco",
        description:
          "Constraint EXCLUDE com btree_gist em profissional e sala: dois agendamentos não podem ocupar o mesmo horário, mesmo em requisições simultâneas.",
      },
      {
        title: "Prontuário e faturamento",
        description:
          "Prontuário com anamnese e CID, convênios, tabela de preços por profissional, assinatura eletrônica e relatório de faturamento.",
      },
      {
        title: "Assistentes via MCP",
        description:
          "Servidor MCP remoto com OAuth 2.1 + PKCE. Escritas viram propostas pendentes de aprovação humana na aba Aprovações.",
      },
      {
        title: "Multiempresa com RLS",
        description:
          "Uma instalação, várias clínicas, isolamento por linha (RLS) e papel de banco dedicado em produção.",
      },
    ],
    stack: [
      "TypeScript",
      "React 19",
      "Vite",
      "Tailwind CSS 4",
      "React Aria",
      "Fastify 5",
      "PostgreSQL",
      "Zod",
      "Argon2id",
      "MCP",
      "Neon",
      "Render",
    ],
    status: "em-desenvolvimento",
    statusNote:
      "Produto em desenvolvimento, com migrations versionadas e documentação por módulo. Repositório privado.",
    links: [
      {
        kind: "site",
        label: "Site do produto",
        href: "https://agendfy-site.vercel.app",
      },
    ],
    shots: [
      {
        src: "/images/projects/agendfy-hoje.webp",
        alt: "Tela inicial do AgendFy com pacientes atrasados, agendamentos ainda sem confirmação e o resumo da agenda do dia por status.",
        width: 1090,
        height: 681,
      },
      {
        src: "/images/projects/agendfy-pacientes.webp",
        alt: "Lista de pacientes do AgendFy com CPF e telefone mascarados e o aviso de que revelar um cadastro fica registrado.",
        width: 1090,
        height: 681,
      },
    ],
    accent: "electric",
    featured: true,
    details: [
      {
        title: "Contexto",
        body: "A agenda é o coração da clínica e, ao mesmo tempo, o ponto mais frágil: dois recepcionistas, um profissional e um paciente podem disputar o mesmo horário. Planilha compartilhada não impõe regra, e erro de agenda custa tempo, receita e confiança.",
      },
      {
        title: "Como foi construído",
        body: "A aplicação trata a agenda como restrição de banco de dados. Profissional e sala têm faixas de tempo protegidas por EXCLUDE; escalas, bloqueios e regras de paciente entram como camadas acima desse invariante. A interface é React 19 com React Aria; a API é Fastify 5 com validação Zod.",
      },
      {
        title: "O que está pronto",
        items: [
          "Cadastro de pacientes, profissionais, salas e serviços",
          "Agendamento, remarcação, cancelamento e lista de espera",
          "Escalas por profissional, bloqueios e duração por serviço",
          "Prontuário eletrônico, anamnese, atestado e diagnósticos CID-10",
          "Convênios, carteirinhas e tabela de preços por profissional",
          "Faturamento, indicadores operacionais e relatórios",
          "Assinatura eletrônica com verificação pública de documento",
          "Central de comunicação (email; SMS em simulação)",
          "Automações de lembrete e recuperação de faltosos",
          "API REST para chatbot com chave por clínica",
        ],
      },
      {
        title: "Arquitetura",
        items: [
          "Um serviço no Render entrega a SPA e a API, com menos superfície para operar",
          "Interface e servidor em workspaces separados (`web/` e `server/`)",
          "Migrations versionadas com rollback em `server/migrations/`",
          "Conflito de agenda resolvido por constraint, não por código de tela",
          "Isolamento por clínica com RLS e papel de banco restrito",
          "Backup automático criptografado para S3/R2/B2, com teste de restauração",
        ],
      },
      {
        title: "Banco de dados e integrações",
        body: "PostgreSQL no Neon com string pooled para a aplicação e direta para migrations. Extensões btree_gist (exclusão de horário) e índices cegos para busca sobre campos cifrados. Integrações: ViaCEP, EmailJS (redefinição de senha), Resend, webhooks para o chatbot e armazenamento S3 para backups.",
      },
      {
        title: "Segurança",
        items: [
          "Senhas com Argon2id e bloqueio progressivo de tentativas",
          "MFA TOTP obrigatório para administradores em produção",
          "Cookies httpOnly + SameSite=Strict, proteção CSRF e CSP restritiva",
          "CPF, telefone, email, nascimento e observações cifrados (AES-256-GCM)",
          "Auditoria encadeada por hash: o banco recusa alteração, exclusão e truncamento",
          "Exportação e anonimização de paciente para atender a LGPD",
        ],
      },
      {
        title: "O que foi difícil",
        body: "Fazer o Postgres recusar sobreposição de horário sem travar operações legítimas exigiu desenhar a constraint junto com escalas e bloqueios. Criptografar PII e ainda permitir busca por CPF levou a um índice cego. Por fim, expor escrita para LLMs com segurança significou transformar toda ação em proposta auditável, aprovada por uma pessoa.",
      },
    ],
  },
  {
    slug: "agendfy-chatbot",
    name: "AgendFy Chatbot",
    tagline: "Atendimento por WhatsApp desacoplado do sistema de agenda",
    summary:
      "Monorepo com API conversacional e painel de configuração por clínica. O núcleo fala com uma interface de agendamento, então atende qualquer sistema. O AgendFy é apenas um conector.",
    problem:
      "A recepção responde as mesmas perguntas o dia inteiro e perde contato fora do horário. Acoplar o agente ao sistema de agenda de cada clínica transformaria cada integração em um projeto novo.",
    solution:
      "O núcleo do agente conhece apenas a interface `SchedulingProvider`. Cada clínica aponta para um conector descrito em JSON (REST) ou implementado como classe (SOAP, banco, GraphQL). Regras de segurança ficam nas ferramentas, não no prompt.",
    highlights: [
      {
        title: "Conectores plugáveis",
        description:
          "Um arquivo JSON descreve métodos, caminhos e campos do sistema de agenda. Clínicas com sistemas diferentes convivem na mesma instalação.",
      },
      {
        title: "Painel por clínica",
        description:
          "Identidade do assistente, mensagens com variáveis validadas, horários, setores de transferência e menu inicial configurável.",
      },
      {
        title: "Regras fora do prompt",
        description:
          "Confirmação explícita antes de agendar, prioridade para urgência e transferência humana quando o caso escapa do fluxo.",
      },
      {
        title: "Sandbox e homologação",
        description:
          "Clínica de teste, suíte de contrato com respostas simuladas e checklist de homologação antes de liberar produção.",
      },
    ],
    stack: [
      "TypeScript",
      "Node.js",
      "Fastify 5",
      "Next.js 16",
      "React 19",
      "PostgreSQL",
      "Redis",
      "BullMQ",
      "Zod",
      "Anthropic API",
      "Vitest",
    ],
    status: "em-desenvolvimento",
    statusNote:
      "Etapa 1 do painel concluída e documentada; fluxo de atendimento em construção. Repositório privado.",
    links: [],
    shots: [
      {
        src: "/images/projects/agendfy-chatbot-painel.webp",
        alt: "Painel do AgendFy Chatbot na visão de super admin: cartões com total de empresas, ativas, suspensas e convites pendentes, e a lista das clínicas cadastradas com plano, status do WhatsApp e assistente.",
        width: 1440,
        height: 810,
      },
    ],
    accent: "cyan",
    featured: true,
    details: [
      {
        title: "Contexto",
        body: "Paciente quer marcar consulta às 22h, pelo celular. A clínica quer responder isso sem colocar alguém de plantão e sem dar ao modelo acesso livre à agenda.",
      },
      {
        title: "Como foi construído",
        body: "Um monorepo com API e painel. A API concentra o agente, as ferramentas, as regras e os conectores; o painel Next.js permite que cada clínica ajuste linguagem e fluxo sem depender de deploy. Filas em BullMQ/Redis isolam o trabalho de longa duração.",
      },
      {
        title: "O que está pronto",
        items: [
          "Perfis super admin, admin da clínica e atendente",
          "MFA obrigatório para super admin e administrador",
          "Configuração de identidade, tom e mensagens com variáveis validadas",
          "Menu inicial numerado, configurável por clínica",
          "Setores de transferência e resposta fora do horário",
          "Conector REST declarativo + conector próprio por classe",
          "Sandbox de clínica e teste de contrato do conector",
          "Chave de API cifrada por clínica",
        ],
      },
      {
        title: "Arquitetura",
        items: [
          "Monorepo com workspaces `apps/api` e `apps/panel`",
          "Núcleo isolado atrás de `SchedulingProvider` (porta e adaptador)",
          "Conectores como configuração, não como código no núcleo",
          "Processamento assíncrono com BullMQ sobre Redis",
          "Validação de entrada com Zod em toda fronteira",
          "Testes de contrato independentes do sistema de agenda real",
        ],
      },
      {
        title: "Banco de dados e integrações",
        body: "PostgreSQL para configuração, tenants e histórico; Redis para filas. A integração com o sistema de agenda é sempre via conector, e os testes usam PGlite para rodar o schema sem servidor.",
      },
      {
        title: "Segurança",
        items: [
          "Segredos de integração cifrados por clínica",
          "MFA para perfis administrativos",
          "Ferramentas limitadas ao escopo da clínica autenticada",
          "Nenhuma escrita direta: ações passam por confirmação explícita",
          "Variáveis de ambiente fora do versionamento",
        ],
      },
      {
        title: "O que foi difícil",
        body: "O difícil é manter o agente previsível quando o sistema do outro lado responde mal. Por isso o conector tem teste de contrato, a operação ausente responde \"não disponível nesta clínica\" e a confirmação de agendamento é regra de ferramenta, não instrução de prompt.",
      },
    ],
  },
  {
    slug: "omnitask",
    name: "OmniTask",
    tagline: "Kanban completo que roda inteiro no navegador",
    summary:
      "Gerenciador de tarefas em HTML, CSS e JavaScript puro: contas locais, quadro com arrastar e soltar, planejador de prazos, filtros combináveis e painel administrativo.",
    problem:
      "Quem organiza trabalho, estudo e vida pessoal acaba com três ferramentas e nenhuma visão do todo. Ferramentas de tarefa costumam exigir conta, backend e conexão para algo que é, essencialmente, dado local.",
    solution:
      "Uma aplicação estática sem dependências em runtime. Cada conta guarda suas tarefas no localStorage, isoladas por dono; a senha passa por PBKDF2 com 120.000 iterações via WebCrypto. O quadro, o planejador e os indicadores compartilham o mesmo modelo.",
    highlights: [
      {
        title: "Kanban com arrastar e soltar",
        description:
          "Três colunas, menu de ações por tarefa com navegação por teclado, ordenação por prazo, prioridade ou edição e paginação por coluna.",
      },
      {
        title: "Planejador mensal e semanal",
        description:
          "Alternância entre quadro e calendário, destaque do dia atual, tarefas sem prazo e abertura da edição direto no chip.",
      },
      {
        title: "Contas e administração",
        description:
          "Login local com PBKDF2, sessão de 7 dias e painel administrativo para criar, suspender, promover e redefinir contas.",
      },
      {
        title: "Zero dependências em runtime",
        description:
          "Anime.js e a fonte Inter servidos do próprio projeto. Nenhum CDN, funciona offline depois do primeiro carregamento.",
      },
    ],
    stack: [
      "HTML5",
      "CSS3",
      "JavaScript ES6+",
      "WebCrypto",
      "Anime.js 4",
      "BoardUI",
      "localStorage",
    ],
    status: "mvp",
    statusNote:
      "MVP 1.2 concluído e publicado no GitHub (MIT). Autenticação local de demonstração, sem backend.",
    links: [
      {
        kind: "repo",
        label: "Repositório",
        href: "https://github.com/pauloaraujodeveloper/omnitask",
      },
    ],
    shots: [
      {
        src: "/images/projects/omnitask-quadro.webp",
        alt: "Quadro do OmniTask em tema claro, com a faixa de indicadores (11 tarefas, 27% concluído) e as colunas A fazer, Em andamento e Concluídas com cartões de prioridade, categoria e prazo.",
        width: 1090,
        height: 681,
      },
      {
        src: "/images/projects/omnitask-planejador.webp",
        alt: "Planejador do OmniTask em tema escuro, com o calendário mensal de novembro e as tarefas distribuídas pelos dias de prazo.",
        width: 1440,
        height: 900,
      },
      {
        src: "/images/projects/omnitask-nova-tarefa.webp",
        alt: "Diálogo Nova tarefa do OmniTask em tema escuro, com título, descrição, prioridade, categoria, prazo e status.",
        width: 1090,
        height: 681,
      },
    ],
    accent: "violet",
    featured: true,
    details: [
      {
        title: "Contexto",
        body: "Sistemas de tarefa resolvem o quadro, mas cobram infraestrutura por algo que cabe no navegador. Para uso individual e demonstração pública, um app estático entrega a mesma experiência sem servidor.",
      },
      {
        title: "Como foi construído",
        body: "Uma SPA em JavaScript puro organizada em módulos IIFE: estado, autenticação, renderização e indicadores separados. Os tokens do BoardUI foram portados para CSS puro, então a interface mantém espaçamento, tipografia e estados consistentes sem build.",
      },
      {
        title: "O que está pronto",
        items: [
          "Cadastro, edição e exclusão de tarefas com confirmação",
          "Prioridade, categoria, prazo e status; atrasadas em destaque",
          "Quadro com drag & drop e avanço por clique",
          "Planejador mensal e semanal + lista de tarefas sem prazo",
          "Filtros combináveis (status, prioridade, categoria, prazo) e busca sem acento",
          "Dashboard com seis indicadores e barra de progresso",
          "Tema claro, escuro e automático por preferência do sistema",
          "Painel administrativo de contas com suspensão e redefinição",
        ],
      },
      {
        title: "Arquitetura",
        items: [
          "Separação entre dados, autenticação, renderização e animação",
          "Estado único por conta, persistido com chave `owner`",
          "Tokens de design centralizados em `css/theme-boardui.css`",
          "Animações isoladas em `js/animations.js`, com desligamento por preferência",
          "Sem framework e sem bundler: funciona abrindo o arquivo",
        ],
      },
      {
        title: "Banco de dados e integrações",
        body: "localStorage como persistência, com sessão de 7 dias. O login com Google usa o Google Identity Services quando um Client ID é configurado; sem ele, entra em modo demonstração explicitamente rotulado.",
      },
      {
        title: "Segurança",
        items: [
          "Senhas com PBKDF2 (WebCrypto) + salt, nunca em texto puro",
          "Contas isoladas por dono; papéis verificados em cada operação",
          "Escapes de texto na renderização, sem `innerHTML` de conteúdo do usuário",
          "Nenhuma credencial no repositório; Client ID é público por natureza",
        ],
      },
      {
        title: "O que foi difícil",
        body: "O desafio foi manter o quadro fluido sem framework: renderizações por coluna, drag & drop com alvo destacado e paginação independente. As animações nunca escondem conteúdo, e há um temporizador de segurança para o caso de a aba ficar oculta.",
      },
    ],
  },
  {
    slug: "estoquepro",
    name: "EstoquePro",
    tagline: "Estoque e PDV multiempresa com banco isolado por cliente",
    summary:
      "SaaS de controle de estoque para negócios de alimento e varejo: custo médio, margem, ficha técnica, lotes com validade, financeiro e auditoria, com dados separados por empresa.",
    problem:
      "Marmitarias, salões, mercados e peixarias controlam estoque em planilha. Quando compram um sistema, descobrem que os dados de todas as empresas dividem as mesmas tabelas e que o cálculo de custo não corresponde à operação real.",
    solution:
      "Cada empresa recebe um banco próprio: `data/tenant_<id>.sqlite` no modo local ou um schema `tenant_<id>` no PostgreSQL. A camada de acesso recebe o tenant por requisição, e toda regra de negócio (custo médio, margem, baixa por ficha técnica) roda nesse escopo.",
    highlights: [
      {
        title: "Isolamento real por empresa",
        description:
          "Um banco (ou schema) por tenant, selecionado por requisição. Nenhuma consulta atravessa empresas por acidente.",
      },
      {
        title: "Custo médio e margem",
        description:
          "Entradas, saídas, perdas e ajustes recalculam custo médio ponderado; preço por margem usa C ÷ (1 − m), não markup.",
      },
      {
        title: "Venda em cascata",
        description:
          "PDV baixa o produto e os insumos da ficha técnica, lança no financeiro, grava o Kardex e registra auditoria.",
      },
      {
        title: "Caminho para PostgreSQL",
        description:
          "Sem DATABASE_URL roda em SQLite nativo, sem compilação. Com ela, migra para schemas isolados no Postgres.",
      },
    ],
    stack: [
      "Node.js 22",
      "Express",
      "SQLite",
      "PostgreSQL",
      "JWT",
      "bcryptjs",
      "Resend",
      "QR Code",
    ],
    status: "mvp",
    statusNote:
      "MVP fases 1–8 com demo pública. Autenticação por JWT e dados de demonstração por empresa.",
    links: [
      {
        kind: "demo",
        label: "Demonstração",
        href: "https://controle-estoque-gilt-ten.vercel.app",
      },
      {
        kind: "repo",
        label: "Repositório",
        href: "https://github.com/pauloaraujodeveloper/estoque-pro",
      },
    ],
    shots: [
      {
        src: "/images/projects/estoquepro-dashboard.webp",
        alt: "Dashboard do EstoquePro com vendas do dia, lucro total, faturamento, ticket médio, gráfico de vendas dos últimos 7 dias e ranking dos produtos mais vendidos.",
        width: 1440,
        height: 900,
      },
      {
        src: "/images/projects/estoquepro-pdv.webp",
        alt: "PDV do EstoquePro com os produtos em cartões, o carrinho com três itens, o total e as formas de pagamento Dinheiro, Pix, Crédito, Débito e Fiado.",
        width: 1440,
        height: 900,
      },
      {
        src: "/images/projects/estoquepro-produtos.webp",
        alt: "Lista de produtos do EstoquePro com estoque, custo, preço de venda e margem calculada por item.",
        width: 1440,
        height: 900,
      },
    ],
    accent: "cyan",
    featured: true,
    details: [
      {
        title: "Contexto",
        body: "Negócio pequeno não tem margem para erro de estoque. O sistema precisa responder três perguntas: quanto tenho, quanto custou de verdade e quanto sobra se eu vender por este preço.",
      },
      {
        title: "Como foi construído",
        body: "Backend Express com SQLite nativo (node:sqlite) ou PostgreSQL, frontend SPA sem framework e uma API que resolve o tenant em cada requisição (`req.tdb`). O banco mestre guarda empresas e usuários; o banco do tenant guarda a operação.",
      },
      {
        title: "O que está pronto",
        items: [
          "Produtos, entradas, saídas, perdas e ajustes de estoque",
          "PDV com baixa de insumos por ficha técnica",
          "Compras com recebimento, custo médio e contas a pagar",
          "Lotes com PVPS, validade e alertas de 30/15/7 dias",
          "Financeiro, relatórios, CSV e auditoria por operação",
          "Cadastro de empresa com banco próprio e logo personalizada",
          "Painel do desenvolvedor para gerenciar clientes SaaS",
          "Layout responsivo com gaveta, tabelas roláveis e alvos de 44px",
        ],
      },
      {
        title: "Arquitetura",
        items: [
          "Isolamento multiempresa por banco/schema, não por coluna",
          "Regras de negócio em módulo único e testável (`src/db.js` como fronteira)",
          "API stateless com JWT e `company_id` no token",
          "Migração SQLite → PostgreSQL sem reescrever as rotas",
          "Testes de regra executados com `npm test`",
        ],
      },
      {
        title: "Banco de dados e integrações",
        body: "SQLite para instalação sem configuração; PostgreSQL para produção, com conversão automática de string pooled para endpoint direto. Resend para email transacional e QR Code para etiquetas.",
      },
      {
        title: "Segurança",
        items: [
          "Senhas com bcrypt e JWT assinado por segredo de ambiente",
          "Toda consulta do tenant filtrada pelo `company_id` do token",
          "Desenvolvedor com acesso global separado do admin da empresa",
          "Auditoria de operações por tenant",
        ],
      },
      {
        title: "O que foi difícil",
        body: "O cálculo de custo médio precisa sobreviver a compras, perdas e devoluções na ordem certa. A solução foi concentrar a escrita em uma única camada transacional que sempre grava Kardex e auditoria junto com o saldo.",
      },
    ],
  },
  {
    slug: "dataqore",
    name: "DataQore",
    tagline: "Mapa interativo que explica uma arquitetura de dados em nove camadas",
    summary:
      "Página única que transforma uma especificação técnica em tour navegável: trilhos de dados animados, alternador entre linguagem de negócio e de engenharia e nove demonstrações.",
    problem:
      "Explicar arquitetura de dados para uma plateia mista é o pior cenário de slide: engenharia acha raso, negócio acha abstrato. E slide estático não mostra o dado circulando.",
    solution:
      "Um mapa em trilhos onde cada bolinha é uma etapa e cada pacote mostra o dado em trânsito. O mesmo conteúdo alterna entre negócio e engenharia; clicar abre um painel com explicação e uma mini-demonstração daquela camada.",
    highlights: [
      {
        title: "Duas linguagens, um mapa",
        description:
          "O alternador troca os rótulos entre negócio e engenharia sem perder o contexto; cada painel mostra as duas leituras.",
      },
      {
        title: "Nove demonstrações",
        description:
          "Cada painel monta uma demo com contrato próprio (`mount`, `play`, `reset`, `pause`, `onAction`) e timers canceláveis.",
      },
      {
        title: "Navegação por teclado",
        description:
          "Setas percorrem o tour, Esc volta ao mapa e F alterna tela cheia. O estado fica no hash da URL.",
      },
      {
        title: "Movimento sob controle",
        description:
          "Com preferência por movimento reduzido, o mapa mostra uma imagem parada e permite um ciclo único sob demanda.",
      },
    ],
    stack: ["Next.js 15", "React 19", "TypeScript", "Tailwind CSS 4", "React Aria", "Remixicon"],
    status: "publicado",
    statusNote:
      "Publicado e acessível. Exportação estática; o conteúdo técnico descreve a arquitetura ilustrativa da marca.",
    links: [
      { kind: "demo", label: "Ver publicado", href: "https://dataqore.vercel.app" },
    ],
    shots: [
      {
        src: "/images/projects/dataqore-mapa.webp",
        alt: "Mapa interativo da DataQore no modo Negócio, ligando as fontes de dados às etapas Conectar, Organizar, Significado e Executar.",
        width: 1440,
        height: 900,
      },
      {
        src: "/images/projects/dataqore-slide.webp",
        alt: "Slide Resolução de entidades da DataQore, mostrando como cadastros de sistemas diferentes viram uma ficha única de cliente.",
        width: 1440,
        height: 900,
      },
      {
        src: "/images/projects/dataqore-engenharia.webp",
        alt: "Mapa da DataQore no modo Engenharia, com os detalhes técnicos de cada etapa, como camadas bruta, limpa e pronta, e servidor MCP.",
        width: 1440,
        height: 900,
      },
    ],
    accent: "electric",
    featured: true,
    details: [
      {
        title: "Contexto",
        body: "A arquitetura existia em um documento técnico e em um deck. Nenhum dos dois convencia quem não era da área, e os dois envelheciam a cada release.",
      },
      {
        title: "Como foi construído",
        body: "Uma one-page Next.js com export estático. O mapa é renderizado em SVG a partir de uma estrutura de dados única (`lib/mapa.ts`), então textos, cores, velocidades e origens mudam em um lugar só.",
      },
      {
        title: "O que está pronto",
        items: [
          "Mapa com quatro trilhos de etapa e a faixa de governança",
          "Pacotes de dados animados com rótulo de origem",
          "Alternador Negócio / Engenharia",
          "Nove painéis com demo isolada e botão de repetir",
          "Estado em hash, atalhos de teclado e tela cheia",
          "Respeito a `prefers-reduced-motion` com ciclo único",
          "Versão em lista abaixo de 1024px",
        ],
      },
      {
        title: "Arquitetura",
        items: [
          "Conteúdo separado da apresentação (`lib/mapa.ts` → `components/mapa`)",
          "Contrato único para todas as demos, com limpeza de timers",
          "Estilo do mapa isolado em `styles/mapa.css`",
          "SEO e JSON-LD definidos no layout, tema aplicado antes da primeira pintura",
        ],
      },
      {
        title: "Banco de dados e integrações",
        body: "Não há banco: o conteúdo é estático e versionado. A publicação é uma pasta exportada, servível por qualquer host estático.",
      },
      {
        title: "Segurança e qualidade",
        items: [
          "Sem HTML injetado: todo conteúdo é JSX tipado",
          "Nenhum segredo ou endpoint privado no cliente",
          "Navegação completa por teclado com foco visível",
          "Demos canceláveis, sem vazamento entre painéis",
        ],
      },
      {
        title: "O que foi difícil",
        body: "Coordenar nove animações independentes sem que uma interfira na outra exigiu um contrato de ciclo de vida comum e um registro de timers por painel. O modo de movimento reduzido foi tratado como primeiro caso, não como exceção.",
      },
    ],
  },
  {
    slug: "nexora",
    name: "Nexora",
    tagline: "Frontend de Customer Intelligence para carteira, saúde e renovações",
    summary:
      "SPA de inteligência de clientes com dashboard, carteira, tabelas ordenáveis, gráficos e painel administrativo multiempresa, usando dados de demonstração.",
    problem:
      "Times de sucesso do cliente acompanham conta em planilha, CRM e planilha de renovações ao mesmo tempo. Sem uma visão única, risco de churn aparece tarde.",
    solution:
      "Uma SPA React 19 com estado local persistido. A camada de dados é tipada e substituível: hoje lê `seed.ts` e localStorage, amanhã aponta para uma API sem reescrever as telas.",
    highlights: [
      {
        title: "Componentes BoardUI",
        description:
          "Base visual construída sobre React Aria (acessível por teclado) com os tokens e padrões do BoardUI.",
      },
      {
        title: "Tabelas e gráficos",
        description:
          "TanStack Table para ordenação e paginação; Chart.js para séries de receita e saúde da carteira.",
      },
      {
        title: "Login com Google",
        description:
          "Google Identity Services carregado sob demanda apenas na tela de login, sem biblioteca extra.",
      },
      {
        title: "Painel administrativo",
        description:
          "Visão de todas as organizações, planos e contas, com troca de contexto para inspeção.",
      },
    ],
    stack: [
      "React 19",
      "TypeScript",
      "Vite",
      "Tailwind CSS 4",
      "React Aria",
      "TanStack Table",
      "Chart.js",
      "Anime.js",
    ],
    status: "conceito",
    statusNote:
      "Frontend de portfólio: sem backend, autorização apenas de interface e dados de demonstração. Repositório público.",
    links: [
      {
        kind: "repo",
        label: "Repositório",
        href: "https://github.com/pauloaraujodeveloper/nexora",
      },
    ],
    accent: "violet",
    featured: false,
    details: [
      {
        title: "Contexto",
        body: "Ferramentas de CS chegam caras e genéricas. Este projeto investiga a interface: como mostrar carteira, saúde e risco sem transformar a tela em uma parede de números.",
      },
      {
        title: "Como foi construído",
        body: "SPA com store tipada, persistência local e componentes de base reutilizáveis. O painel administrativo é carregado com React.lazy para não pesar a rota principal.",
      },
      {
        title: "O que está pronto",
        items: [
          "Dashboard com indicadores e séries",
          "Carteira de clientes com tabela ordenável e paginada",
          "Perfil 360° com histórico e atividades",
          "Painel administrativo com organizações e usuários",
          "Login por formulário e Google, com sessão persistida",
          "Tema salvo no navegador e restauração dos dados de demonstração",
        ],
      },
      {
        title: "Arquitetura",
        items: [
          "Camada de componentes de base separada dos componentes de domínio",
          "Estado global com persistência e ações tipadas",
          "Rotas administrativas com carregamento sob demanda",
          "Dataset de demonstração isolado em `lib/seed.ts`",
        ],
      },
      {
        title: "Banco de dados e integrações",
        body: "Sem banco: estado em localStorage (`nexora:state:v1`). Integração única com o Google Identity Services para autenticação.",
      },
      {
        title: "Limites do projeto",
        body: "Sem servidor, o token do Google não é validado e a checagem de administrador é apenas de interface. O próprio README registra que a autorização definitiva precisa acontecer no backend. É um projeto de frontend, apresentado como tal.",
      },
    ],
    shots: [
      {
        src: "/images/projects/nexora-dashboard.webp",
        alt: "Dashboard do Nexora com a saudação ao usuário, MRR ativo, contas ativas, saúde média da carteira, receita em risco e o gráfico de receita e risco ao longo do tempo.",
        width: 1070,
        height: 668,
      },
      {
        src: "/images/projects/nexora-clientes.webp",
        alt: "Tela de clientes do Nexora com os totais da carteira, busca, ordenação e a lista de contas com status, saúde, MRR e responsável.",
        width: 1070,
        height: 668,
      },
    ],
  },
  {
    slug: "agendfy-site",
    name: "AgendFy Site",
    tagline: "Site institucional com páginas renderizadas no build, SEO técnico e formulário sem servidor",
    summary:
      "Site de marketing do AgendFy em Vite + React 19, com cada página renderizada em HTML no build, sitemap, dados estruturados e formulário que cai para WhatsApp quando não há endpoint.",
    problem:
      "O produto não tinha presença digital e as páginas precisavam indexar sem depender de um servidor Node em produção.",
    solution:
      "Um build em duas passadas: Vite gera o cliente, um segundo build SSR produz a casca e um script escreve uma pasta por rota em `dist/`, já com sitemap, robots, canonical e Open Graph.",
    highlights: [
      {
        title: "HTML por rota",
        description:
          "Cada página é renderizada no build, sem framework SSR rodando em produção. Encaixa em hospedagem estática.",
      },
      {
        title: "SEO por página",
        description:
          "Metadados, canonical, Open Graph, Twitter Cards, JSON-LD e sitemap gerados a partir de uma fonte de conteúdo.",
      },
      {
        title: "Formulário resiliente",
        description:
          "Com endpoint configurado, envia JSON; sem ele, abre o WhatsApp com a mensagem preenchida. Inclui consentimento de contato.",
      },
      {
        title: "Revisão de conteúdo",
        description:
          "O build gera `copy.md` com todos os textos e um checklist de SEO, desempenho e acessibilidade.",
      },
    ],
    stack: ["React 19", "TypeScript", "Vite", "Tailwind CSS 4", "Anime.js", "Vercel"],
    status: "publicado",
    statusNote: "Publicado na Vercel. Repositório privado.",
    links: [
      {
        kind: "demo",
        label: "Ver site",
        href: "https://agendfy-site.vercel.app",
      },
    ],
    shots: [
      {
        src: "/images/projects/agendfy-site-home.webp",
        alt: "Página inicial do site do AgendFy com título sobre agenda sem conflito, navegação e chamada para demonstração.",
        width: 1424,
        height: 800,
      },
      {
        src: "/images/projects/agendfy-site-recursos.webp",
        alt: "Seção de recursos do site do AgendFy apresentando módulos do sistema.",
        width: 1424,
        height: 800,
      },
      {
        src: "/images/projects/agendfy-site-seguranca.webp",
        alt: "Seção de segurança do site do AgendFy descrevendo criptografia, auditoria e LGPD.",
        width: 1424,
        height: 800,
      },
      {
        src: "/images/projects/agendfy-site-mobile.webp",
        alt: "Versão móvel do site do AgendFy, com menu compacto e blocos empilhados.",
        width: 1400,
        height: 1800,
      },
    ],
    accent: "electric",
    featured: false,
    details: [
      {
        title: "Contexto",
        body: "Marketing precisa publicar rápido, mas cada página nova não pode virar um arquivo HTML mantido à mão, e muito menos exigir um servidor para renderizar três páginas institucionais.",
      },
      {
        title: "Como foi construído",
        body: "Conteúdo tipado em `src/content`, páginas geradas a partir dele, build com pré-render e metadados derivados da mesma fonte. O `vercel.json` define build, saída, URLs limpas e cabeçalhos de segurança.",
      },
      {
        title: "O que está pronto",
        items: [
          "Renderização de todas as rotas no build",
          "Sitemap, robots e página 404 gerados",
          "Open Graph e Twitter Cards por página",
          "Dados estruturados Schema.org",
          "Formulário com consentimento, validação e fallback para WhatsApp",
          "Build falha em erro de tipo (checagem antes de publicar)",
        ],
      },
      {
        title: "Arquitetura",
        items: [
          "Conteúdo separado da apresentação",
          "Metadados e JSON-LD centralizados em `src/seo.ts`",
          "Pré-render sem framework: cliente + SSR + script de escrita",
          "Cabeçalhos de segurança declarados na hospedagem",
        ],
      },
      {
        title: "Segurança",
        items: [
          "Somente variáveis públicas (`VITE_*`) no cliente",
          "Nenhum segredo, chave ou arquivo interno no bundle",
          "Cabeçalhos de segurança configurados na Vercel",
          "Formulário sem armazenamento local de dados pessoais",
        ],
      },
      {
        title: "O que foi difícil",
        body: "Renderizar tudo no build sem Next.js exigiu um segundo build SSR e um script que resolve rotas, links e canonical. O conteúdo precisou de um formato que servisse à página, ao sitemap e ao `copy.md` ao mesmo tempo.",
      },
    ],
  },
  {
    slug: "escale",
    name: "Escale",
    tagline: "MVP de fase 1 para a rotina de Customer Success",
    summary:
      "Aplicação Next.js para acompanhar carteira, 360° do cliente, timeline, tarefas em Kanban, implantações em Gantt, health score e relatórios.",
    problem:
      "Operações de CS vivem em planilhas e reuniões. Sem registro único, a renovação vira surpresa e o histórico do cliente se perde.",
    solution:
      "Um MVP com dados de demonstração para validar o fluxo de trabalho antes de investir em backend: estado persistido no cliente, componentes de timeline e Kanban próprios e uma camada de dados desenhada para virar API.",
    highlights: [
      {
        title: "Carteira e 360°",
        description:
          "Lista de clientes com contexto consolidado, contatos, atividades e histórico em uma única tela.",
      },
      {
        title: "Kanban e Gantt",
        description:
          "Tarefas por status e implantações com marcos e datas, lendo o mesmo modelo de dados.",
      },
      {
        title: "Health score",
        description:
          "Indicadores de risco e renovação em gráficos Recharts, com filtros por carteira.",
      },
      {
        title: "Atalhos de operação",
        description:
          "Ctrl+K para busca, Ctrl+N para nova ação e Esc para fechar modais.",
      },
    ],
    stack: ["Next.js 14", "React 18", "TypeScript", "Tailwind CSS", "Zustand", "Recharts", "xlsx"],
    status: "mvp",
    statusNote:
      "Fase 1 com dados de demonstração. Backend previsto para a fase 2 no próprio roadmap. Repositório privado.",
    links: [],
    accent: "cyan",
    featured: false,
    details: [
      {
        title: "Contexto",
        body: "Antes de construir integrações, era preciso saber se o fluxo de CS fazia sentido para quem usa: carteira, próximo passo e risco no mesmo lugar.",
      },
      {
        title: "Como foi construído",
        body: "Next.js com App Router, estado global persistido em Zustand e componentes de domínio para timeline, Kanban e Gantt. Dados de demonstração realistas para exercitar os fluxos.",
      },
      {
        title: "O que está pronto",
        items: [
          "Carteira com clientes de demonstração",
          "Tela 360° com timeline de interações",
          "Tarefas em Kanban e implantações em Gantt",
          "Health score e gráficos de acompanhamento",
          "Relatórios com exportação via xlsx",
          "Busca global e atalhos de teclado",
        ],
      },
      {
        title: "Arquitetura",
        items: [
          "Estado com persistência no cliente (Zustand)",
          "Componentes de domínio separados dos primitivos de UI",
          "Camada de dados preparada para trocar demo por API",
          "Modelo multiempresa previsto (`orgId`) no roadmap",
        ],
      },
      {
        title: "Limites do projeto",
        body: "Autenticação é simulada e não existe backend nesta fase. O README registra a fase 2 com NestJS, PostgreSQL e Prisma, mas nada disso está implementado.",
      },
    ],
    shots: [
      {
        src: "/images/projects/escale-dashboard.webp",
        alt: "Dashboard do Escale com contadores de clientes, implantações em andamento, clientes em risco e tarefas atrasadas, além do progresso das implantações.",
        width: 1078,
        height: 673,
      },
      {
        src: "/images/projects/escale-saude.webp",
        alt: "Tela de saúde do cliente do Escale com a fórmula do score e os cartões de cada conta com pontuação e faixa de atenção.",
        width: 1090,
        height: 681,
      },
    ],
  },
  {
    slug: "tiamate",
    name: "Tiamate Coffee",
    tagline: "Reconstrução de um site de cafeteria a partir da especificação do Figma",
    summary:
      "Estudo de fidelidade visual: a especificação foi extraída do Figma com tokens, SVGs 1:1 e previews, e o site foi implementado em HTML e CSS.",
    problem:
      "Traduzir um layout de Figma sem Dev Mode costuma virar tentativa e erro de espaçamento, cor e tipografia.",
    solution:
      "Extrair a fonte da verdade para arquivos versionados: SVGs por frame, previews em PNG, tokens de cor e tabela tipográfica. Só então implementar, comparando com os previews.",
    highlights: [
      {
        title: "Especificação como artefato",
        description:
          "Tokens de cor, escala tipográfica, coordenadas e assets exportados e documentados antes do código.",
      },
      {
        title: "Fidelidade verificável",
        description:
          "Previews de cada frame permitem comparar a implementação com o desenho, não com a memória.",
      },
      {
        title: "Tailwind configurado",
        description:
          "Configuração própria para paleta e fontes do projeto, sem valores soltos no markup.",
      },
    ],
    stack: ["HTML", "CSS", "Tailwind CSS", "Figma"],
    status: "estudo",
    statusNote:
      "Estudo de implementação a partir de layout existente. Feito para desktop, sem versão mobile no arquivo original.",
    links: [
      {
        kind: "repo",
        label: "Repositório",
        href: "https://github.com/pauloaraujodeveloper/tiamate",
      },
    ],
    shots: [
      {
        src: "/images/projects/tiamate-home.webp",
        alt: "Página inicial do site da Tiamate Coffee com o menu, a chamada “Um café quentinho aqui na Tiamate muda o dia” e a foto de copos de café sobre grãos.",
        width: 1200,
        height: 750,
      },
    ],
    accent: "violet",
    featured: false,
    details: [
      {
        title: "Contexto",
        body: "Sem Dev Mode, medidas, camadas e cores vivem espalhadas em um arquivo visual. Implementar sem documentar gera retrabalho e divergência.",
      },
      {
        title: "Como foi construído",
        body: "Um pacote de especificação com SVGs de cada frame (texto real, não vetorizado), previews e assets deduplicados, seguido da implementação em HTML e CSS com Tailwind.",
      },
      {
        title: "O que foi entregue",
        items: [
          "Especificação completa com tokens de cor e escala tipográfica",
          "SVGs 1:1 por frame e previews para comparação",
          "Página implementada em HTML/CSS",
          "Configuração de Tailwind com a paleta do projeto",
        ],
      },
      {
        title: "Limites do projeto",
        body: "É um exercício de implementação visual a partir de um layout pronto, não um produto. O arquivo original é apenas desktop (1440px) e o site acompanha essa limitação.",
      },
    ],
  },
];

export const featuredProjects = projects.filter((project) => project.featured);
export const secondaryProjects = projects.filter((project) => !project.featured);

export const getProjectBySlug = (slug: string) =>
  projects.find((project) => project.slug === slug);
