/** Profile copy and contact links. Nothing here is generated at runtime. */

export interface SocialLink {
  id: "github" | "linkedin" | "email";
  label: string;
  href: string;
  /** Short line used under the label in the contact section. */
  hint: string;
}

export const profile = {
  name: "Paulo Araújo",
  role: "Desenvolvedor Full Stack em formação",
  intro:
    "Trabalho com React, TypeScript, Node.js e PostgreSQL, com atenção ao que sustenta o produto depois do deploy: modelo de dados consistente, regras de negócio no servidor, interface acessível e operação previsível.",
  location: "Fortaleza, CE · presencial, híbrido ou remoto",
  availability: "Primeira vaga como dev júnior",
  /** Anchored to verified facts, not vanity numbers. */
  facts: [
    "React 19 e TypeScript no frontend",
    "Node.js, Fastify e PostgreSQL no backend",
    "Segurança, LGPD e acessibilidade como requisito",
  ],
  about: [
    "Minha trajetória começou na operação: implantando sistemas, acompanhando usuários e vendo de perto onde o software quebra no dia a dia de uma clínica, de uma marmitaria ou de uma recepção.",
    "Isso mudou a forma como eu programo. Antes de escolher uma biblioteca, pergunto qual regra não pode falhar. No AgendFy, essa regra é o horário: dois agendamentos não podem ocupar o mesmo slot, e isso é garantido por uma constraint no PostgreSQL, não por uma checagem na tela. No EstoquePro, é o custo: cada venda precisa baixar produto, insumo, financeiro e auditoria na mesma transação.",
    "Hoje atuo como Analista de Customer Success na Dataqore e estudo Análise e Desenvolvimento de Sistemas. Experiência e formação completas estão na seção Trajetória.",
    "Essa rotina me faz perguntar quem usa o sistema e o que costuma quebrar antes de escolher a stack. Trato design e código como parte do mesmo trabalho: decisões justificadas, documentadas e testáveis.",
  ],
  /** Quick facts rendered in the "ficha técnica" panel. */
  sheet: [
    {
      label: "Atuação",
      value: "Desenvolvimento full stack, sistemas, automação e IA aplicada.",
    },
    {
      label: "Idiomas",
      value: "Português nativo · Inglês básico · Espanhol básico.",
    },
    {
      label: "Foco atual",
      value: "APIs tipadas, modelagem de dados, segurança de aplicação e IA aplicada a produto.",
    },
    {
      label: "Como trabalho",
      value:
        "Entendo a operação antes de escrever código, documento as decisões e verifico antes de publicar.",
    },
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
  title: "Vamos conversar.",
  body: "Estou disponível para vagas júnior de desenvolvimento full stack e para projetos freelance. Respondo por email, LinkedIn ou GitHub.",
};
