/** Section anchors shared by the header and footer navigation. */
export const navItems = [
  { id: "inicio", label: "Início" },
  { id: "sobre", label: "Sobre" },
  { id: "trajetoria", label: "Trajetória" },
  { id: "projetos", label: "Projetos" },
  { id: "tecnologias", label: "Tecnologias" },
  { id: "engenharia", label: "Engenharia" },
  { id: "contato", label: "Contato" },
] as const;

/** The footer repeats the menu without the hero anchor. */
export const footerNavItems = navItems.filter((item) => item.id !== "inicio");
