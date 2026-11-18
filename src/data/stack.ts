import type { StackGroup } from "@/types/portfolio";

/**
 * Only technologies that appear in the audited repositories are listed here.
 * Items studied but not used in a shipped project stay out.
 */
export const stackGroups: StackGroup[] = [
  {
    id: "linguagens",
    label: "Linguagens",
    note: "A base de tudo que está nos repositórios.",
    items: ["TypeScript", "JavaScript (ES6+)", "SQL", "HTML5", "CSS3"],
  },
  {
    id: "frontend",
    label: "Frontend",
    note: "Interfaces com estado, acessibilidade e design system.",
    items: [
      "React 19",
      "Next.js 15/16",
      "Vite",
      "Tailwind CSS 4",
      "React Aria",
      "React Router",
      "TanStack Table",
      "TanStack Query",
      "Chart.js",
      "Recharts",
      "Zustand",
    ],
  },
  {
    id: "backend",
    label: "Backend",
    note: "APIs tipadas, validação de entrada e regras no servidor.",
    items: ["Node.js 22+", "Fastify 5", "Express", "Zod", "REST", "JWT", "BullMQ"],
  },
  {
    id: "dados",
    label: "Banco de dados",
    note: "Modelagem, isolamento e integridade onde importa.",
    items: [
      "PostgreSQL",
      "Row Level Security",
      "Constraints de exclusão",
      "SQLite (node:sqlite)",
      "Migrations versionadas",
      "Neon",
    ],
  },
  {
    id: "infra",
    label: "Infra e deploy",
    note: "Publicação, observabilidade e entrega contínua.",
    items: ["Vercel", "Render", "Neon", "S3 / R2 / B2", "Git", "GitHub"],
  },
  {
    id: "seguranca",
    label: "Segurança",
    note: "Práticas aplicadas em produtos que tratam dado pessoal.",
    items: [
      "Argon2id",
      "bcrypt",
      "AES-256-GCM",
      "PBKDF2 (WebCrypto)",
      "MFA / TOTP",
      "OAuth 2.1 + PKCE",
      "CSP",
      "Rate limiting",
    ],
  },
  {
    id: "ia",
    label: "IA e automação",
    note: "Integração com modelos sem abrir mão de controle.",
    items: ["Model Context Protocol", "Anthropic API", "Automações por webhook", "Google Identity Services"],
  },
  {
    id: "qualidade",
    label: "Qualidade",
    note: "Como o código é verificado antes de publicar.",
    items: ["Vitest", "node:test", "oxlint", "ESLint", "TypeScript strict", "Testes de contrato"],
  },
];
