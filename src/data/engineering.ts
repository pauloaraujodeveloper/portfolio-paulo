import type { EngineeringPrinciple } from "@/types/portfolio";

/**
 * Engineering practices are only listed when a repository backs them up.
 * `evidence` names the concrete artefact, `projects` where to look.
 */
export const engineeringPrinciples: EngineeringPrinciple[] = [
  {
    id: "modelagem",
    title: "A regra crítica fica no banco",
    description:
      "Regra que não pode falhar não fica só na tela. Quando o dado é crítico, a restrição desce para o schema, onde nenhuma requisição concorrente consegue contornar.",
    evidence:
      "Constraint EXCLUDE com btree_gist impede dois agendamentos no mesmo profissional ou sala.",
    projects: ["AgendFy"],
  },
  {
    id: "fronteiras",
    title: "Separação de responsabilidades",
    description:
      "Conteúdo, apresentação e integração vivem em camadas distintas. O núcleo de um sistema não precisa saber qual fornecedor está do outro lado.",
    evidence:
      "O agente conversacional fala com a interface SchedulingProvider; o AgendFy é só um conector entre outros.",
    projects: ["AgendFy Chatbot", "DataQore"],
  },
  {
    id: "validacao",
    title: "Validação nas fronteiras",
    description:
      "Toda entrada externa é tratada como suspeita: tipada, validada e rejeitada quando não corresponde ao contrato.",
    evidence:
      "Schemas Zod nas rotas da API, validação de variáveis de mensagem no painel e checagem de permissão por papel em cada operação.",
    projects: ["AgendFy", "AgendFy Chatbot"],
  },
  {
    id: "seguranca",
    title: "Segurança por padrão",
    description:
      "Senha forte, dado pessoal cifrado, sessão protegida e superfície mínima. O caminho seguro precisa ser o padrão, não a exceção.",
    evidence:
      "Argon2id, MFA TOTP, cookies httpOnly + SameSite=Strict, CSP restritiva, rate limit e PII em AES-256-GCM com índice cego.",
    projects: ["AgendFy", "EstoquePro"],
  },
  {
    id: "design-system",
    title: "Design system como base",
    description:
      "Cor, tipografia, espaçamento e estados vêm de tokens. Isso mantém as telas consistentes e deixa tema e acessibilidade como decisão de base.",
    evidence:
      "BoardUI como base de tokens; zero hex avulso no tema do OmniTask; estados hover, focus, active e disabled definidos por componente.",
    projects: ["OmniTask", "Nexora", "DataQore", "este portfólio"],
  },
  {
    id: "movimento",
    title: "Movimento com função",
    description:
      "Animação serve para orientar a atenção. Toda animação respeita a preferência de movimento do usuário e limpa o que criou.",
    evidence:
      "Anime.js com timelines canceladas no unmount, animações que nunca escondem conteúdo e `prefers-reduced-motion` tratado como primeiro caso.",
    projects: ["OmniTask", "DataQore", "AgendFy Site"],
  },
  {
    id: "testes",
    title: "Verificar antes de publicar",
    description:
      "Tipo, teste e build fazem parte do fluxo. Quando o sistema é crítico, o teste não para no caminho feliz.",
    evidence:
      "Suíte de testes contra PostgreSQL real, teste de contrato dos conectores, verificação de restauração de backup e build que falha em erro de tipo.",
    projects: ["AgendFy", "AgendFy Chatbot", "AgendFy Site"],
  },
  {
    id: "documentacao",
    title: "Documentação como parte do produto",
    description:
      "Decisão técnica registrada é decisão que sobrevive à próxima pessoa. Segurança, LGPD e operação também precisam estar documentadas.",
    evidence:
      "Mais de 15 documentos no AgendFy (segurança, LGPD, permissões, implantação), PRD e guias de homologação no chatbot.",
    projects: ["AgendFy", "AgendFy Chatbot", "EstoquePro"],
  },
];
