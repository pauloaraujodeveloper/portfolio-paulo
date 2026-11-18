# Arquitetura

## Visão geral

O portfólio é uma **SPA estática** construída com Vite 8 e React 19. Não há
servidor de aplicação, banco de dados, autenticação ou API. Todo o conteúdo é
versionado em TypeScript e compilado para arquivos estáticos.

```
index.html                 metadados, OG, JSON-LD, noscript
└── src/main.tsx           fontes + CSS global + DirectionProvider
    └── src/App.tsx        skip link, Header, main, Footer
        ├── sections/hero          hero + console de arquitetura
        ├── sections/about         texto + ficha técnica
        ├── sections/projects      grid + modal de caso
        ├── sections/stack         grupos de tecnologia
        ├── sections/engineering   princípios + evidências
        └── sections/contact       CTA de email e links
```

## Stack e por que cada peça está aqui

| Camada | Escolha | Motivo |
|--------|---------|--------|
| Build | **Vite 8** | saída estática, HMR rápido, configuração mínima |
| UI | **React 19.3** | exigido no briefing; sem framework de rotas porque a página é única |
| Tipos | **TypeScript 7** (`strict`, `noUncheckedIndexedAccess`) | conteúdo tipado de ponta a ponta; erro de dado quebra o build |
| Estilo | **Tailwind CSS 4** via `@tailwindcss/vite` | tokens em CSS, sem arquivo de configuração JS |
| Componentes | **BoardUI** (código no repositório) | botões, modal, chips, scroll fade, direção; base acessível em React Aria |
| Animação | **Anime.js 4** | entrada do hero e revelação por scroll; API pequena e cancelável |
| Fontes | **Inter Variable** e **JetBrains Mono Variable** (`@fontsource-variable`) | self-hosted: sem CDN, sem requisição a terceiros, sem FOUT de rede externa |

### O que foi deliberadamente recusado

- **Next.js / SSR**: uma página com nove projetos não precisa de servidor. O
  ganho de SEO não paga a complexidade operacional; o custo real (HTML sem
  conteúdo) está registrado em "Limites" abaixo.
- **Biblioteca de animação maior**: Anime.js cobre o necessário e é usada nos
  outros projetos do portfólio.
- **CDN de fontes e de ícones**: remixicon é um pacote npm; as fontes são
  servidas pelo próprio bundle.

## Modelo de conteúdo

Todo o texto vive em `src/data`, tipado por `src/types/portfolio.ts`:

```
src/data/projects.ts     Project[]   (9 projetos, featured → grid principal)
src/data/profile.ts      perfil, socials, mensagem de contato
src/data/stack.ts        StackGroup[] (8 grupos)
src/data/engineering.ts  EngineeringPrinciple[] (8 princípios + evidência)
```

Regras do modelo:

- `Project.status` é um union de cinco estados (`publicado`,
  `em-desenvolvimento`, `mvp`, `conceito`, `estudo`). O badge, o texto e o
  visual do card derivam desse campo — não há status escrito à mão em JSX.
- `Project.links` só aceita `demo`, `repo` ou `site`. O ícone e o rótulo de
  acessibilidade vêm do tipo do link.
- `Project.shots` é opcional. Quando existe, o card e o modal usam a captura real
  em WebP com `width`/`height` declarados e `object-contain`, então nenhuma tela
  é recortada para caber no quadro; quando não existe, `ProjectVisual` desenha um
  painel com a stack. **Nunca há mockup falso.**
- `details` é uma lista de blocos (`body` em prosa ou `items` em lista), o que
  permite casos com formatos diferentes sem componentes ad hoc.

Adicionar um projeto = adicionar um objeto em `projects.ts`. Nenhum componente
precisa mudar.

## Renderização e fluxo de estado

- A página é renderizada uma vez; não há rotas. A navegação usa âncoras
  (`#projetos`, `#contato`) e `scroll-mt-24` compensa o header fixo.
- `useActiveSection` observa as seções e marca o item atual do menu com
  `aria-current="true"`. `useScrolled` liga o fundo do header depois de 16px.
- O modal de projeto é controlado por estado local em `sections/projects.tsx`:
  `selected` guarda o projeto e `open` controla a visibilidade. O conteúdo
  permanece montado durante a animação de saída do React Aria.
- Os filtros de status são estado local (`todos` + os cinco status) com
  contagem por estado, `aria-pressed` e uma região `aria-live` anunciando
  quantos projetos continuam visíveis.
- Abrir um caso grava `#projeto-<slug>` na URL com `replaceState`; ao carregar
  com esse hash (ou ao recebê-lo por `hashchange`), o caso abre direto. Fechar
  devolve o hash para `#projetos`.
- O modal usa o `Modal` do BoardUI (React Aria): foco preso, `Esc` fecha, clique
  no backdrop fecha, foco volta ao gatilho, `aria-describedby` ligado ao
  subtítulo.
- "Copiar link" copia a URL do caso com o hash, com fallback por
  `document.execCommand` e anúncio em `aria-live`. "Copiar email" usa
  `navigator.clipboard` com falha silenciosa: se a permissão for negada, o link
  `mailto:` ao lado continua funcionando.

## Direção e idioma

`DirectionProvider` (BoardUI, sobre `I18nProvider` do React Aria) envolve o app
com `locale="pt-BR"`. O `<html>` declara `lang="pt-BR"`. Todos os estilos
espaciais usam propriedades lógicas (`ms`, `me`, `start`, `end`), então uma
eventual versão em árabe ou hebraico não exigiria reescrever layout.

## Animação

Duas camadas, ambas desligadas por `prefers-reduced-motion`:

1. **Entrada do hero** (`sections/hero.tsx`): uma timeline única de 860ms com
   stagger de 90ms sobre `[data-hero-step]`. `useLayoutEffect` aplica o estado
   inicial antes da pintura — sem flash — e o cleanup chama `animation.revert()`.
2. **Revelação por scroll** (`components/animations/reveal.tsx`): um
   `IntersectionObserver` por bloco, que se desconecta na primeira interseção.
   O estado inicial é aplicado em `useLayoutEffect`, então crawlers e visitantes
   sem JS sempre recebem conteúdo visível.

O pacote de dados do console (`packet-run`) é uma animação CSS de 7.5s em
`transform`/`opacity`, desligada em `prefers-reduced-motion`. Nenhuma animação
esconde conteúdo de forma permanente.

## SEO

- `index.html` traz título, descrição, canonical, Open Graph, Twitter Card,
  `theme-color` e JSON-LD (`ProfilePage` → `Person`).
- `public/robots.txt` e `public/sitemap.xml` são estáticos.
- `public/og.png` é uma imagem 1200×630 gerada a partir de
  `scripts/og-card.html` (captura de navegador + recorte com `sharp`).
- O texto completo dos projetos **não** está no HTML inicial: ele é renderizado
  pelo React. Para um buscador que executa JavaScript, isso é indexável; para
  pré-visualizações de rede social, o que importa são as meta tags do `<head>`,
  que são estáticas.
- O `<noscript>` oferece email e GitHub para quem chega sem JS.

## Build e entrega

```
npm run dev       Vite em http://localhost:5173
npm run build     tsc -b (strict) && vite build → dist/
npm run preview   serve dist/ localmente
npm run lint      oxlint
```

Saída de referência (18/11/2026):

| Arquivo | Tamanho | Gzip |
|---------|---------|------|
| `index.html` | 4,40 kB | 1,55 kB |
| CSS | 155,67 kB | 28,23 kB |
| JS | 456,55 kB | 144,53 kB |
| Fontes (woff2, 12 arquivos) | 303 kB | — |
| Capturas de projeto (15 WebP) | 694 kB | — |

O JS concentra React 19, React Aria (base do BoardUI) e Anime.js. As fontes são
os únicos assets grandes; o subconjunto latino do Inter é o que a página usa.
As capturas são servidas em WebP (eram 1.359 kB em PNG/JPEG) e cada card declara
`width`/`height`, então a grade não muda de altura enquanto as imagens chegam.

## Acessibilidade

- Marcos semânticos: `header`, `nav` (com `aria-label`), `main`, `section`
  (cada uma com `aria-labelledby` apontando para o `h2`), `footer`.
- Skip link visível ao receber foco, apontando para `#conteudo`.
- Hierarquia de headings: um `h1` (hero) e um `h2` por seção; `h3` nos cards e
  blocos do modal.
- Foco visível com `focus-visible:ring-2 ring-border-focus-ring` em todos os
  controles interativos; o menu móvel fecha com `Esc` e ao redimensionar.
- Estados nunca dependem só de cor: status tem rótulo textual e ponto colorido.
- Contraste medido (ver `docs/DESIGN_SYSTEM.md`): nenhum par de texto abaixo de
  4,5:1.
- `prefers-reduced-motion` tratado como primeiro caso, não como exceção.

## Limites conhecidos

1. **SPA sem pré-renderização**: o HTML inicial tem só o shell e as meta tags. Um
   portfólio pode se beneficiar de pré-render; não foi feito porque o custo
   (segundo build + script de rotas) não se justifica para uma página.
2. **URL de produção fixa** em `index.html`, `robots.txt` e `sitemap.xml`. Trocar
   o domínio exige editar os três arquivos (documentado no README).
3. **Sem backend**: nenhum formulário é enviado; o contato é `mailto:`.
4. **Sem analytics**: decisão de privacidade, não esquecimento.
