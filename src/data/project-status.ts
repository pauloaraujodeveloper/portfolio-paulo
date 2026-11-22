import type { ProjectStatus } from "@/types/portfolio";

/** Filter order in the projects section. */
export const projectStatusOrder: ProjectStatus[] = [
  "publicado",
  "mvp",
  "em-desenvolvimento",
  "conceito",
  "estudo",
];

/** Single source for the status wording used by badges and filters. */
export const projectStatusLabels: Record<ProjectStatus, string> = {
  publicado: "Publicado",
  "em-desenvolvimento": "Em desenvolvimento",
  mvp: "MVP",
  conceito: "Conceito",
  estudo: "Estudo",
};
