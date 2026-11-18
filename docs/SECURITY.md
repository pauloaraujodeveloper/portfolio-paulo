# Segurança

## Resumo

O site é **estático e sem backend**. Não existe formulário, login, banco de
dados, cookie, analytics ou qualquer coleta de dado pessoal. A superfície de
ataque é a de um conjunto de arquivos HTML/CSS/JS servidos por um host estático.

Ainda assim, as decisões abaixo foram tomadas de forma explícita — segurança por
ausência de recurso não deve ser acidental.

## Dados e privacidade

| Item | Situação |
|------|----------|
| Dados pessoais coletados | Nenhum |
| Cookies | Nenhum |
| Armazenamento local | Nenhum (o site não usa `localStorage`/`sessionStorage`) |
| Analytics / pixels | Nenhum |
| Requisições a terceiros | Nenhuma em tempo de execução |
| Email | Exposto como `mailto:` — já é público no README do OmniTask |
| Formulários | Não existem |
| Clipboard | Escrita sob ação explícita do usuário ("Copiar email"), sem leitura |

O único dado que sai do navegador é o que o visitante decide enviar por email ou
abrir no GitHub.

## Segredos

- **Nenhuma variável de ambiente é usada.** Não há `.env`, chave de API, token ou
  credencial no projeto. `.env.example` existe para registrar essa decisão.
- O conteúdo do site não referencia nenhuma API privada.
- O histórico de auditoria não abriu arquivos `.env` dos projetos de origem; as
  informações usadas são de README, código e documentação pública.

## Cadeia de suprimentos

- Dependências declaradas com versão e `package-lock.json` versionado.
- `npm audit --omit=dev` em 15/11/2026: **0 vulnerabilidades**.
- Nenhum CDN: fontes (`@fontsource-variable/*`), ícones (`@remixicon/react`) e
  animação (`animejs`) vêm do bundle.
- BoardUI é **source-owned**: os componentes vivem em `src/components/base` e
  podem ser revisados linha por linha, sem pacote opaco em runtime.

## Superfície de aplicação

| Vetor | Tratamento |
|-------|------------|
| XSS | React escapa todo conteúdo; não há `dangerouslySetInnerHTML` em nenhum arquivo do site. O conteúdo é estático e tipado. |
| Links externos | `target="_blank"` sempre com `rel="noreferrer noopener"` |
| Injeção em `href` | Links vêm de `data/*.ts` com valores literais; não há entrada de usuário |
| Clickjacking | Recomendado `frame-ancestors 'none'` via cabeçalho (ver abaixo) |
| Dependências maliciosas | lockfile + revisão manual; sem script de pós-instalação próprio |
| Vazamento por imagem | Capturas feitas de telas reais; nenhuma contém dado de paciente, cliente ou credencial |

`<a href>` dinâmico não existe: `ProjectLink.href` é escrito no código-fonte.

## Cabeçalhos recomendados

A hospedagem deve enviar os cabeçalhos abaixo. Exemplo para Vercel
(`vercel.json`), ainda **não aplicado** porque o deploy não foi autorizado:

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "Content-Security-Policy", "value": "default-src 'self'; img-src 'self' data:; style-src 'self' 'unsafe-inline'; font-src 'self'; script-src 'self'; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'none'; object-src 'none'" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "Permissions-Policy", "value": "camera=(), microphone=(), geolocation=()" },
        { "key": "Strict-Transport-Security", "value": "max-age=31536000; includeSubDomains" }
      ]
    }
  ]
}
```

Observação: `style-src 'unsafe-inline'` é necessário porque o React Aria aplica
estilos inline em elementos posicionados. O JSON-LD exige `script-src` com hash
ou `'unsafe-inline'`; a política acima mantém `script-src 'self'` e deve ser
ajustada com o hash do bloco JSON-LD antes de entrar em produção.

## Revisão feita neste projeto

- [x] Nenhum `dangerouslySetInnerHTML`
- [x] Nenhuma chamada `fetch`/XHR no cliente
- [x] Nenhuma dependência adicionada sem uso
- [x] Nenhum segredo em código, HTML ou assets
- [x] Links externos com `noopener noreferrer`
- [x] Imagens servidas do próprio domínio
- [x] Conteúdo de projeto conferido contra repositório (sem feature inventada)
- [x] `npm audit --omit=dev` limpo
- [ ] Cabeçalhos de segurança aplicados no host (depende do deploy)
- [ ] CSP com hash do JSON-LD validada em produção

## Como reportar um problema

Envie um email para **pauloaraujodeveloper@gmail.com** com a descrição e, se
possível, os passos para reproduzir. Não abra uma issue pública para algo
explorável.
