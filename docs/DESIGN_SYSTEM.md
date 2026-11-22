# Design system

O site tem uma identidade só: **azul-marinho profundo + azul elétrico**. Nada de
gradiente arco-íris, nada de cor decorativa sem função. O sistema vem do BoardUI
(tokens semânticos + utilitários tipográficos compostos) e é re-apontado para a
paleta do portfólio em `src/styles/portfolio.css`.

## Princípios

1. **Token ou nada.** Componente não escreve `#hex`, `text-gray-500` ou
   `bg-white`. Toda cor vem de um token semântico.
2. **Uma cor de ação.** Azul elétrico é o único preenchimento de CTA. Ciano e
   violeta aparecem só como sinal em dados, ícones e detalhes.
3. **Superfície antes de sombra.** Hierarquia vem de quatro níveis de tinta
   (`ink-950` → `ink-800`) e de hairlines, não de `box-shadow` em tudo.
4. **Tipografia composta.** `text-title-2-semibold` define tamanho, peso,
   entrelinha e tracking juntos. Nunca `text-sm font-medium leading-5`.
5. **Movimento discreto.** 300–860ms, `transform`/`opacity`, cancelável, nunca
   escondendo conteúdo.

## Paleta

### Superfícies (`ink-*`)

| Token | Hex | Uso |
|-------|-----|-----|
| `ink-950` | `#04060d` | fundo da página (`background-full`) |
| `ink-925` | `#060912` | reserva para gradientes |
| `ink-900` | `#080c17` | cartões internos, `background-secondary` |
| `ink-850` | `#0a0f1c` | superfície primária de cartões |
| `ink-800` | `#0d1322` | hover e terciária |
| `ink-750` | `#111829` | ativo |
| `ink-700` | `#161e33` | bordas e separadores |
| `ink-600` | `#1d2740` | bordas em hover / cards |
| `ink-500` | `#27334f` | borda ativa |

### Texto (`mist-*`)

| Token | Hex | Uso | Contraste em `ink-950` |
|-------|-----|-----|------------------------|
| `mist-50` | `#eef2fb` | texto primário | 18,06:1 |
| `mist-200` | `#c6cfe4` | texto em blocos de destaque | 12,97:1 |
| `mist-400` | `#93a0bd` | texto secundário | 7,72:1 |
| `mist-500` | `#74829f` | texto terciário / legendas | 5,24:1 |
| `mist-600` | `#566179` | placeholder e desabilitado | 3,26:1 (não usado em texto essencial) |

### Ação e sinal

| Token | Hex | Uso |
|-------|-----|-----|
| `electric-300` | `#8fb0ff` | links e destaques sobre fundo escuro (9,47:1) |
| `electric-400` | `#5b8cff` | ícones, marcadores, anel de foco |
| `electric-500` | `#3b6fff` | referência da marca |
| `electric-600` | `#2557e0` | base do CTA |
| `electric-700` | `#1b44b8` | fim do gradiente do CTA |
| `signal-cyan` | `#3adfe4` | "publicado", pacote de dados, fim do gradiente de texto (12,4:1) |
| `signal-violet` | `#9b8cff` | status MVP, palavras-chave de código |

### Gradientes de CTA (contraste com texto branco)

| Estado | Gradiente | Contraste mínimo |
|--------|-----------|------------------|
| default | `#2f62f2 → #1b44b8` | 5,06:1 |
| hover | `#2a5ce8 → #2557e0` | 5,53:1 |
| active | `#2557e0 → #16317f` | 5,97:1 |

> O gradiente original do BoardUI (`electric-400 → electric-600`) dava 4,28:1 no
> topo — abaixo de AA para texto de 14px. Foi substituído.

## Mapa de tokens semânticos

| Token BoardUI | Aponta para | Onde aparece |
|---------------|-------------|--------------|
| `background-full` | `ink-950` | página, header fixo, footer |
| `background-primary-default` | `ink-850` | cartões, superfície do modal |
| `background-secondary-default` | `ink-900` | sub-cartões, console do hero |
| `background-tertiary-default` | `ink-800` | chips, ícones em caixa |
| `text-primary` | `mist-50` | títulos e texto principal |
| `text-secondary` | `mist-400` | parágrafos |
| `text-tertiary` | `mist-500` | legendas mono, metadados |
| `separator-border` | `ink-700` | hairlines, bordas de card |
| `border-button-hover` | `ink-600` | borda em hover |
| `border-focus-ring` | `electric-400` | anel de foco |
| `foreground-icon-secondary` | `mist-400` | ícones neutros |
| `accent-300…700` | `electric-300…700` | ramp de seleção e CTA |

## Tipografia

Duas famílias, ambas self-hosted:

- **Inter Variable** (`--font-sans`) — interface e texto.
- **JetBrains Mono Variable** (`--font-mono`) — rótulos técnicos, números,
  trechos de código. Usada em caixa alta com `tracking` de 0.1–0.2em.

Escala em uso (utilitários compostos do BoardUI):

| Utilitário | Tamanho / linha | Uso |
|------------|-----------------|-----|
| `display-1-semibold` | 56/72 | `h1` em ≥640px |
| `display-2-semibold` | 48/64 | `h1` no mobile, `h2` em ≥640px |
| `display-3-semibold` | 40/52 | `h2` no mobile |
| `title-1-semibold` | 28/36 | títulos de subseção |
| `title-2-semibold` | 24/32 | nome do projeto no card |
| `title-3-semibold` | 20/28 | títulos de blocos |
| `headline-regular` | 16/24 | parágrafos de destaque |
| `body-regular` / `body-medium` | 14/20 | texto corrente |
| `caption-1-regular` / `-semibold` | 12/16 | metadados, labels mono |

O `h1` do hero tem entrelinha ajustada para `1.04–1.08`, porque a entrelinha
padrão do display (1.29) abre demais três linhas de manchete.

## Espaçamento e forma

- Container: `container-page` (`max-width: 76rem`, padding 20 → 32 → 40px).
- Ritmo vertical: `py-20 sm:py-24` por seção; hero com `pt-28` a `pt-40`.
- Grid: 1 coluna no mobile, 2 a 4 no desktop. Nunca mais de 4 colunas de cartão.
- Raios: `rounded-3xl` em cartões e no modal, `rounded-2xl` em sub-blocos,
  `rounded-xl` em ícones, `rounded-md` em chips, `rounded-full` em pílulas.
- Espaçamento sempre na escala do Tailwind; `gap` em vez de margens por filho.

## Componentes

### Do BoardUI (código no repositório, `src/components/base`)

| Componente | Uso no site |
|------------|-------------|
| `Button` / `ButtonLink` | CTAs do hero, contato, rodapé, modal |
| `Modal`, `ModalHeader`, `ModalBody`, `ModalFooter` | caso completo do projeto |
| `Chip` | stack no card expandido, tags do modal |
| `CloseButton` | fechar o modal |
| `ScrollFade` | topo do corpo rolável do modal |
| `DirectionProvider` | locale e direção do app |

### Próprios (`src/components`)

| Componente | Responsabilidade |
|------------|------------------|
| `layout/header` | navegação fixa, menu móvel, seção ativa |
| `layout/footer` | assinatura, links, voltar ao topo |
| `sections/hero` | manchete, fatos, CTAs |
| `sections/hero-console` | diagrama de camadas + SQL real do AgendFy |
| `sections/about` | texto e ficha técnica |
| `sections/projects` | grid principal + secundário + estado do modal |
| `sections/stack` | 8 grupos de tecnologia |
| `sections/engineering` | 8 princípios com evidência |
| `sections/contact` | CTA de email e copiar endereço |
| `projects/project-card` | card featured e compacto |
| `projects/project-visual` | screenshot real **ou** painel de stack |
| `projects/project-modal` | caso completo |
| `ui/section-heading` | eyebrow + `h2` + descrição |
| `ui/status-badge` | status do projeto com rótulo textual |
| `ui/profile-avatar` | retrato do perfil (240 px, decorativo) |
| `animations/reveal` | revelação por scroll |
| `hooks/*` | seção ativa, scroll, movimento reduzido |

## Utilitários próprios (`portfolio.css`)

| Utilitário | O que faz |
|------------|-----------|
| `container-page` | largura máxima + padding responsivo |
| `surface-grid` | grid técnica de 64px, opacidade baixa |
| `glow-soft` | uma fonte de luz radial por seção |
| `ring-gradient` | borda hairline em gradiente nos cartões de destaque |
| `text-gradient` | gradiente de texto usado **uma vez por seção** |
| `packet-run` | pacote percorrendo o trilho do console |

## Movimento

| Elemento | Duração | Easing | Reduced motion |
|----------|---------|--------|----------------|
| Entrada do hero | 860ms, stagger 90ms | `out(3)` | conteúdo já visível |
| Revelação por scroll | 720ms, stagger 55ms | `out(3)` | conteúdo já visível |
| Hover de card | 300ms | padrão | mantém cor, sem translate |
| Modal | 300ms | `cubic-bezier(0.32,0.72,0,1)` | fade sem escala/blur |
| Pacote do console | 7,5s em loop | `cubic-bezier(0.6,0,0.4,1)` | animação removida |

## Regras de contribuição

- Cor nova só entra como token em `portfolio.css`, com nome semântico.
- Texto novo usa utilitário composto do BoardUI.
- Estado novo de componente (hover, focus, disabled) precisa existir no
  componente, não no ponto de uso.
- Toda imagem precisa de `width`/`height` e `alt` descritivo.
- Ícone decorativo leva `aria-hidden`; ícone com significado leva rótulo.
