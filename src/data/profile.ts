/** Profile copy and contact links. Nothing here is generated at runtime. */

export interface SocialLink {
  id: "github" | "linkedin" | "email" | "whatsapp";
  label: string;
  href: string;
  /** Short line used under the label in the contact section. */
  hint: string;
}

export const profile = {
  name: "Paulo Araújo",
  role: "Desenvolvedor Full Stack em formação",
  headline: "Sistemas que resolvem problemas reais — do modelo de dados à interface.",
  intro:
    "Construo aplicações web full stack com foco no que sustenta o produto depois do deploy: modelo de dados consistente, regras de negócio no lugar certo, interface acessível e operação que não depende de sorte.",
  location: "Fortaleza, CE · presencial, híbrido ou remoto",
  availability: "Primeira vaga como dev júnior",
  /** Anchored to verified facts, not vanity numbers. */
  facts: [
    "React 19 + TypeScript no frontend",
    "Node.js, Fastify e PostgreSQL no backend",
    "Segurança, LGPD e acessibilidade como requisito",
  ],
  about: [
    "Minha trajetória começou pelo lado da operação: implantando sistemas, acompanhando usuários e vendo de perto onde o software quebra quando encontra o dia a dia de uma clínica, de uma marmitaria ou de uma recepção.",
    "Isso mudou a forma como eu programo. Antes de escolher uma biblioteca, eu pergunto qual regra não pode falhar. No AgendFy, essa regra é o horário: dois agendamentos não podem ocupar o mesmo slot, e isso é garantido por uma constraint no PostgreSQL — não por uma checagem na tela. No EstoquePro, é o custo: cada venda precisa baixar produto, insumo, financeiro e auditoria na mesma transação.",
    "Estou em formação: curso Tecnologia em Análise e Desenvolvimento de Sistemas na Faculdade Facint (2026–2028) e complemento com desenvolvimento full stack na Digital College e no Discover da Rocketseat. Hoje atuo como Analista de Customer Success na Dataqore, apoiando empresas na adoção de agentes de IA, automações e relatórios; antes disso, passei por suporte técnico N1/N2, implantação de ERP/SaaS e Customer Success em empresas B2B.",
    "É essa rotina que me faz perguntar quem usa o sistema e o que quebra antes de escolher a stack. Trato design e código como a mesma disciplina: decisões com justificativa, documentadas e testáveis.",
  ],
  /** Only real, verified links. */
  socials: [
    {
      id: "github",
      label: "GitHub",
      href: "https://github.com/pauloaraujodeveloper",
      hint: "Código, repositórios e experimentos",
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/pauloaraujo-dev/",
      hint: "Trajetória profissional e contato",
    },
    {
      id: "email",
      label: "Email",
      href: "mailto:pauloaraujodeveloper@gmail.com",
      hint: "pauloaraujodeveloper@gmail.com",
    },
  ] satisfies SocialLink[],
  email: "pauloaraujodeveloper@gmail.com",
} as const;

export const contactMessage = {
  title: "Vamos conversar sobre o próximo sistema.",
  body: "Estou disponível para posições júnior de desenvolvimento full stack, projetos freelance e conversas técnicas. Respondo por email, LinkedIn ou GitHub.",
};
