/**
 * Professional experience and education.
 *
 * Only facts already present in `profile.ts` (and so in the résumé) appear
 * here. Companies and periods that are not documented stay out rather than
 * being guessed: add them when they are confirmed.
 */

export interface ExperienceEntry {
  id: string;
  role: string;
  /** Company or context. Omitted when the employer is not documented. */
  organization?: string;
  /** Short label such as "Atual". */
  badge?: string;
  summary: string;
  /** What the experience brings to development work. */
  contribution: string;
  tags: string[];
}

export interface EducationEntry {
  id: string;
  title: string;
  institution: string;
  status: string;
  period?: string;
}

export const experience: ExperienceEntry[] = [
  {
    id: "customer-success",
    role: "Analista de Customer Success",
    organization: "Dataqore",
    badge: "Atual",
    summary:
      "Apoio empresas na adoção de agentes de IA, automações e relatórios.",
    contribution:
      "Convivo com IA e automações em uso real e com o que o cliente precisa delas.",
    tags: ["IA aplicada", "Automações", "Relatórios"],
  },
  {
    id: "implantacao",
    role: "Implantação de ERP e SaaS",
    summary:
      "Implantação de sistemas ERP e SaaS em empresas B2B, acompanhando os usuários na rotina.",
    contribution:
      "Aprendi a entender a operação antes de escolher a solução e a ver onde o software quebra.",
    tags: ["ERP", "SaaS", "Implantação"],
  },
  {
    id: "suporte",
    role: "Suporte técnico N1/N2",
    summary:
      "Atendimento técnico a clientes em empresas B2B: resolução de problemas e relacionamento.",
    contribution:
      "Resolver problemas a partir do relato de quem usa o sistema moldou como eu depuro.",
    tags: ["Atendimento técnico", "Resolução de problemas", "Clientes"],
  },
];

export const education: EducationEntry[] = [
  {
    id: "ads",
    title: "Tecnologia em Análise e Desenvolvimento de Sistemas",
    institution: "Faculdade Facint",
    status: "Cursando",
    period: "2026 a 2028",
  },
  {
    id: "digital-college",
    title: "Desenvolvimento Full Stack",
    institution: "Digital College",
    status: "Em andamento",
  },
  {
    id: "rocketseat",
    title: "Discover",
    institution: "Rocketseat",
    status: "Em andamento",
  },
];
