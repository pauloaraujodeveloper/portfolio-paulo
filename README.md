# Portfólio — Paulo Araújo

Página única que apresenta nove sistemas que construí, com o problema, as
decisões técnicas e os limites de cada um. Sem mockups inventados, sem métricas
fabricadas, sem depoimentos fictícios.

**Produção:** https://portfolio-paulo.vercel.app

## O que é

Uma SPA estática feita com Vite + React. Não há backend, banco de dados,
autenticação, formulário ou analytics. Todo o conteúdo é versionado em
TypeScript e compilado para arquivos estáticos.

O que a página faz:

- apresenta o perfil e a forma de trabalho;
- lista os projetos com status real (publicado, MVP, em desenvolvimento,
  conceito ou estudo);
- abre um estudo de caso por projeto (problema, solução, arquitetura, segurança,
  desafios) sem sair da página;
- agrupa a stack que aparece de fato nos repositórios;
- liga para os sites publicados, repositórios públicos e email.

## Como foi feito

Eu analiso, estruturo e oriento: defino o posicionamento, o conteúdo, a
arquitetura e os critérios de qualidade, e reviso o resultado. A IA atua como
ferramenta de execução, escrevendo e ajustando o código sob essa direção. O
projeto é uma colaboração, não um produto gerado automaticamente.

## Stack

| Camada | Tecnologia |
|--------|------------|
| Build | Vite 8 |
| UI | React 19 + TypeScript 7 (`strict`) |
| Estilo | Tailwind CSS 4 (tokens em CSS, sem config JS) |
| Componentes | BoardUI (source-owned, sobre React Aria) |
| Animação | Anime.js 4 |
| Ícones | Remixicon |
| Fontes | Inter Variable e JetBrains Mono Variable, self-hosted |

Detalhes e justificativas em [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md).

## Como rodar

Requisitos: Node.js **22 ou superior** e npm.

```bash
npm install
npm run dev        # http://localhost:5173
```

Outros scripts:

```bash
npm run build      # tsc -b && vite build → dist/
npm run preview    # serve o build em http://localhost:4173
npm run lint       # oxlint
```

O build exige tipagem estrita: um campo ausente ou um `status` inválido em
`src/data` quebra a compilação.

## Estrutura

```
index.html                  meta tags, Open Graph, JSON-LD, noscript
public/                     favicons, og.png, robots.txt, sitemap.xml, imagens
scripts/                    geração do card OG e dos ícones
src/
├── main.tsx                fontes, CSS global, DirectionProvider (pt-BR)
├── App.tsx                 skip link, header, main, footer
├── components/
│   ├── animations/         revelação por scroll
│   ├── base/               BoardUI (botões, modal, chips…)
│   ├── foundations/        BoardUI (direção, scroll fade)
│   ├── layout/             header e footer
│   ├── projects/           card, visual, modal de caso
│   ├── sections/           hero, sobre, projetos, stack, engenharia, contato
│   └── ui/                 avatar, status, título de seção
├── data/                   conteúdo, navegação e rótulos de status
├── hooks/                  seção ativa, scroll, movimento reduzido
├── styles/                 tokens do portfólio + CSS global
└── types/                  contratos do conteúdo
docs/                       inventário, arquitetura, design, segurança, testes
```

## Adicionar ou editar um projeto

Todo o conteúdo de projetos está em `src/data/projects.ts`, tipado por
`src/types/portfolio.ts`. Para adicionar:

1. copie um objeto existente e ajuste `slug`, `name`, `tagline`, `summary`;
2. defina `status` como `publicado`, `em-desenvolvimento`, `mvp`, `conceito` ou
   `estudo` — o badge, a cor e o texto derivam desse campo;
3. preencha `problem`, `solution`, `highlights`, `details` e `stack` com o que
   existe no repositório;
4. em `links`, use apenas URLs verificadas (demo publicada ou repositório
   público);
5. se houver captura real, adicione em `shots` com `src`, `alt`, `width` e
   `height`; sem captura, o card desenha a stack — nunca um mockup falso;
6. marque `featured: true` apenas se o projeto deve ocupar a grade principal.

Nenhum componente precisa mudar.

## Foto de perfil

A foto fica em `public/images/profile/paulo-araujo.jpg` (240 × 240, ~7 kB) e
aparece no header e no rodapé, ao lado do nome. Para trocar, substitua o
arquivo mantendo o recorte quadrado ou ajuste o `src` em
`src/components/ui/profile-avatar.tsx`. A imagem é decorativa (`alt=""`),
porque o nome já está no texto ao lado.

## Trocar o domínio

A URL de produção aparece em três arquivos:

- `index.html` — canonical, `og:url` e `og:image`
- `public/robots.txt` — linha `Sitemap:`
- `public/sitemap.xml` — `<loc>` e `<lastmod>`

## Documentação

| Documento | Conteúdo |
|-----------|----------|
| [`docs/PROJECT_INVENTORY.md`](docs/PROJECT_INVENTORY.md) | auditoria dos repositórios e critérios de inclusão/exclusão |
| [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) | decisões, fluxo de dados, build e limites |
| [`docs/DESIGN_SYSTEM.md`](docs/DESIGN_SYSTEM.md) | paleta, tokens, tipografia e contraste medido |
| [`docs/SECURITY.md`](docs/SECURITY.md) | modelo de ameaças, checklist e headers sugeridos |
| [`docs/TEST_REPORT.md`](docs/TEST_REPORT.md) | build, lint, Lighthouse, links e testes manuais |

## Acessibilidade e SEO

- Alvo WCAG 2.2 AA. Contraste medido: nenhum texto abaixo de 4,5:1.
- Navegação completa por teclado, skip link, foco visível, modal com foco preso
  e `Esc` para fechar.
- `prefers-reduced-motion` desliga as animações de entrada e revelação.
- Título, descrição, canonical, Open Graph, Twitter Card e JSON-LD
  (`ProfilePage` → `Person`) estáticos no `index.html`.
- `robots.txt` e `sitemap.xml` versionados; `og.png` em 1200 × 630.

Lighthouse (build de produção, desktop): acessibilidade 100, boas práticas 100,
SEO 100, performance 91.

## Política de conteúdo

- Só entram fatos verificáveis em repositório, README, `package.json` ou site
  publicado.
- Status é explícito: nada em desenvolvimento é apresentado como publicado.
- Nenhuma captura de tela é gerada ou simulada.
- Nenhum cliente, certificação, métrica de uso ou depoimento é inventado.
- Nenhum segredo, `.env`, chave ou token é lido ou publicado.

## Deploy

Qualquer host estático serve. Configuração genérica:

```
Build command:  npm run build
Output dir:     dist
```

Não há rotas no servidor, então não é necessário rewrite para SPA.

## Segurança

O site não coleta dados, não usa cookies e não carrega scripts de terceiros.
Headers recomendados e checklist de revisão estão em
[`docs/SECURITY.md`](docs/SECURITY.md).

Não há variáveis de ambiente: veja [`.env.example`](.env.example).

## Contato

- Email: pauloaraujodeveloper@gmail.com
- LinkedIn: https://www.linkedin.com/in/pauloaraujo-dev/
- GitHub: https://github.com/pauloaraujodeveloper
