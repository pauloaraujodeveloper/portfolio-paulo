# Relatório de testes

Data da execução: **15/11/2026** · atualizado em **18/11/2026**
Escopo: build de produção, tipagem, lint, dependências, Lighthouse, links
externos, console do navegador e verificação manual em desktop e mobile.

## Veredito

O projeto **passa** em todas as verificações obrigatórias:

| Verificação | Resultado |
|-------------|-----------|
| `npm run build` (`tsc -b` + Vite) | ✅ sem erros |
| `npm run lint` (oxlint) | ✅ 0 erros, 5 avisos (código do BoardUI) |
| `npm audit --omit=dev` | ✅ 0 vulnerabilidades |
| Lighthouse — acessibilidade | ✅ 100 |
| Lighthouse — boas práticas | ✅ 100 |
| Lighthouse — SEO | ✅ 100 |
| Lighthouse — performance (desktop) | ⚠️ 91 |
| Console do navegador | ✅ sem erros nem avisos |
| Links externos (8 URLs) | ✅ todos HTTP 200 |

Nenhum defeito bloqueante permanece aberto. Os itens de atenção estão em
[Pendências conhecidas](#pendências-conhecidas).

Build, tipagem, lint e console foram reexecutados em **18/11/2026**. As linhas de
Lighthouse e de links externos são da execução de **15/11/2026** e não foram
repetidas nesta rodada.

## Ambiente

- Windows 11, Chromium via Lighthouse headless
- Node.js **v24.21.0**, npm **11.19.0**
- Build servido por `vite preview` em `http://localhost:4173`
- Resolução de referência desktop: 800 px de largura (viewport da ferramenta de
  navegação); mobile: iframe de 390 × 844 px

## Verificações automáticas

### Tipagem

`tsc -b` roda no modo `strict` com `noUncheckedIndexedAccess` e `noUnusedLocals`.
Não há `any` explícito, `@ts-ignore` ou `@ts-expect-error` no código do site.

### Build de produção

```
dist/index.html                       4,40 kB │ gzip:   1,55 kB
dist/assets/index-*.css             155,67 kB │ gzip:  28,23 kB
dist/assets/index-*.js              456,55 kB │ gzip: 144,53 kB
dist/assets/*.woff2 (12 arquivos)     303 kB │ —
public/images/projects (15 WebP)      694 kB │ —
```

Build concluído em menos de 1 s. O JS concentra React 19, React Aria (base do
BoardUI) e Anime.js. As capturas de projeto eram PNG/JPEG (1.359 kB) e foram
convertidas para WebP sem perda visível (694 kB), mantendo as dimensões
declaradas no modelo.

### Lint

5 avisos, todos em arquivos instalados do BoardUI
(`only-export-components`, regra de Fast Refresh), nenhum no código do site:

```
components/foundations/direction/direction.tsx
components/foundations/scroll-fade/scroll-fade.tsx
components/base/badges/chip.tsx
components/base/buttons/button.tsx
components/base/modal/modal.tsx
```

São arquivos source-owned: corrigi-los significaria divergir do upstream sem
ganho funcional. Ficam registrados, não silenciados.

### Dependências

`npm audit --omit=dev` → **0 vulnerabilidades**. O `sharp` está em
`devDependencies` e só é usado por `scripts/make-icons.mjs`.

## Lighthouse

Execução desktop em build de produção (`--preset=desktop`, headless):

| Categoria | Nota |
|-----------|------|
| Performance | 91 |
| Acessibilidade | 100 |
| Boas práticas | 100 |
| SEO | 100 |

Métricas:

| Métrica | Valor |
|---------|-------|
| First Contentful Paint | 0,3 s |
| Largest Contentful Paint | 0,6 s |
| Total Blocking Time | 250 ms |
| Cumulative Layout Shift | 0 |
| Speed Index | 0,7 s |

O TBT (250 ms, score 0,69) é o único audit abaixo de 0,9: é o custo de parse e
hidratação do React + React Aria + Anime.js. Para uma página com modal
acessível e animações, o valor é aceitável; reduzir exigiria renderização no
servidor ou cortar o React Aria, decisões registradas em
[`ARCHITECTURE.md`](./ARCHITECTURE.md#limites-conhecidos).

CLS 0 confirma que imagens com `width`/`height` e fontes self-hosted não
deslocam layout.

## Rede e links

Verificação com `HEAD` (redirecionamentos seguidos, timeout de 15 s):

| URL | Status |
|-----|--------|
| https://agendfy-site.vercel.app | 200 |
| https://dataqore.vercel.app | 200 |
| https://controle-estoque-gilt-ten.vercel.app | 200 |
| https://github.com/pauloaraujodeveloper | 200 |
| https://github.com/pauloaraujodeveloper/omnitask | 200 |
| https://github.com/pauloaraujodeveloper/estoque-pro | 200 |
| https://github.com/pauloaraujodeveloper/nexora | 200 |
| https://github.com/pauloaraujodeveloper/tiamate | 200 |
| https://www.linkedin.com/in/pauloaraujo-dev/ | perfil aberto no navegador¹ |

¹ O LinkedIn responde 405 a `HEAD` automatizado. A URL foi conferida no
navegador com sessão autenticada e consta no currículo do próprio autor.

Todos os links abrem em nova aba com `rel="noreferrer noopener"`. Links
externos têm aviso textual "(abre em nova aba)" para leitores de tela.

## Console do navegador

Página carregada, seções percorridas e modal aberto/fechado: nenhuma mensagem
de erro ou aviso. O único 404 identificado durante o desenvolvimento foi um
arquivo de preview temporário, já removido de `public/`.

## Verificação manual

### Desktop (1440 px e 800 px)

- Header fixo, item ativo acompanha a rolagem (`aria-current="true"`).
- Hero entra em timeline única; conteúdo visível ao final.
- Projetos em destaque ocupam a largura toda: captura 16:9 no topo e conteúdo
  em duas colunas abaixo; os demais ficam em grade de duas colunas.
- Nenhuma captura é cortada: `object-contain` mantém a tela inteira dentro do
  quadro, com o fundo escuro preenchendo a sobra.
- Modal de caso abre por teclado e mouse, recebe foco, `Esc` fecha e o foco
  volta ao botão de origem.
- Layout sem overflow horizontal em 800 px e em 390 px.

### Mobile (390 × 844, em iframe)

- Menu abre com `aria-expanded="true"`, fecha ao clicar em um link.
- Nenhum overflow horizontal; cards em coluna única.
- Texto do hero e botões permanecem legíveis e com alvo de toque adequado.

### Modal

- `role="dialog"` com nome acessível (`aria-label="Detalhes do projeto …"`) e
  `aria-describedby` apontando para o subtítulo.
- Foco preso dentro do diálogo; conteúdo de fundo inacessível enquanto aberto.
- As capturas do caso aparecem com altura natural e `object-contain`: a primeira
  ocupa a largura toda e as demais formam pares; nenhuma é recortada.
- Animação de saída mantém o conteúdo montado por ~1 s; depois o diálogo é
  removido e o foco retorna ao gatilho. Verificado.

### Filtros de status e links diretos

- Filtros "Todos", "Publicado", "MVP", "Em desenvolvimento", "Conceito" e
  "Estudo" exibem a contagem real e filtram os cards sem recarregar a página.
  Verificado via DOM: Todos = 9, Publicado = 2, MVP = 3, Em desenvolvimento = 2,
  Conceito = 1, Estudo = 1.
- O contador (`role="status"`, `aria-live="polite"`) anuncia "3 de 9" ao
  filtrar, e `aria-pressed` marca o filtro ativo.
- `/#projeto-agendfy` abre o caso direto; ao fechar, o hash volta para
  `#projetos`.
- "Copiar link" copia a URL com `#projeto-<slug>` e muda o rótulo para
  "Link copiado" (região `aria-live`). O caminho de sucesso foi verificado por
  clique automatizado; a leitura do clipboard não pôde ser confirmada no Chrome
  headless porque o documento não recebe foco.

### Copiar email

- Caminho de sucesso altera o rótulo para "Email copiado" por 2,4 s (região
  `aria-live="polite"`).
- No Chrome headless a permissão de clipboard é negada; o código cai no
  `catch`, não quebra e o link `mailto:` ao lado continua funcional. O caminho
  de sucesso não pôde ser reproduzido no ambiente automatizado, apenas
  inspecionado.

### Preferência por movimento reduzido

Implementada em duas camadas: o hook `useReducedMotion` (hero e revelação por
scroll) e o bloco `@media (prefers-reduced-motion: reduce)` no CSS (pacote do
console, transições). **Verificada por inspeção de código e de CSS**, não por
emulação de sistema operacional — o ambiente de teste não expõe esse controle.
Recomenda-se uma passada manual com a opção "Efeitos de animação" desligada no
Windows antes de publicar.

## Acessibilidade estrutural

Verificada no DOM renderizado:

- Um `h1`; um `h2` por seção; `h3` nos cards e blocos do modal. Sem saltos.
- Marcos: `header`, três `nav` rotulados, `main#conteudo`, `footer`.
- Skip link "Pular para o conteúdo" como primeiro elemento focável.
- Todas as seções têm `aria-labelledby` apontando para um `id` existente
  (defeito encontrado e corrigido nesta rodada: `#sobre` apontava para
  `sobre-title`, que não existia).
- Imagens com `alt` descritivo, `width`/`height` e `loading="lazy"`; o avatar
  do header é decorativo (`alt=""`) e usa `loading="eager"` por estar acima da
  dobra.
- Nenhum link vazio; botões têm texto ou `aria-label`.
- Estados de status usam rótulo textual além da cor.

## Defeitos encontrados e corrigidos durante a auditoria

| Defeito | Correção |
|---------|----------|
| `#sobre` referenciava `sobre-title` inexistente | `titleId="sobre-title"` no `SectionHeading` |
| Link GitHub do menu móvel sem aviso de nova aba | `<span class="sr-only"> (abre em nova aba)</span>` |
| Botão primário com contraste < 4,5:1 | gradiente escurecido para `#2f62f2 → #1b44b8` |
| CSS de entrada separado quebrava `@theme` | CSS importado por `globals.css` |
| Copy "semtransformar" | "sem transformar" |
| `alt` do OmniTask descrevia kanban inexistente | descrição do banner real |
| Arquivos de preview em `public/` | removidos (`mobile-preview.html`, `og-preview.html`) |

## Pendências conhecidas

1. **Performance 91 (desktop)**: TBT de 250 ms. Sem ação prevista.
2. **SPA sem pré-renderização**: o HTML inicial não contém o texto dos
   projetos. Meta tags de compartilhamento são estáticas e corretas.
3. **URL de produção fixa** em `index.html`, `robots.txt` e `sitemap.xml`.
   Trocar o domínio exige editar os três.
4. **CSP não aplicada**: depende do host. Snippet pronto em
   [`SECURITY.md`](./SECURITY.md).
6. **Clipboard e movimento reduzido**: caminhos verificados por inspeção, não
   por emulação (ver acima).

## O que não foi testado

- Safari, Firefox e dispositivos físicos (iOS/Android).
- Leitor de tela real (NVDA, VoiceOver). A estrutura ARIA foi inspecionada no
  DOM e o Lighthouse não aponta violações.
- Formulários e envio de dados: não existem.
- Performance em rede 3G/4G real; o Lighthouse desktop mede CPU/rede locais.
