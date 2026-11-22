import { useEffect, useState } from "react";
import { RiArrowDownLine, RiArrowRightUpLine } from "@remixicon/react";
import { ButtonLink } from "@/components/base/buttons/button";
import { Reveal } from "@/components/animations/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProjectCard } from "@/components/projects/project-card";
import { ProjectModal } from "@/components/projects/project-modal";
import {
  featuredProjects,
  getProjectBySlug,
  projects,
  secondaryProjects,
} from "@/data/projects";
import type { Project, ProjectStatus } from "@/types/portfolio";
import { projectStatusLabels, projectStatusOrder } from "@/data/project-status";
import { cx } from "@/utils/cx";

type Filter = ProjectStatus | "todos";

/** Reads `#projeto-<slug>` so a shared link opens the case directly. */
function projectFromHash(): Project | null {
  const match = window.location.hash.match(/^#projeto-(.+)$/);
  const slug = match?.[1];
  if (!slug) return null;
  return getProjectBySlug(decodeURIComponent(slug)) ?? null;
}

const FILTERS: { id: Filter; label: string }[] = [
  { id: "todos", label: "Todos" },
  ...projectStatusOrder.map((id) => ({ id, label: projectStatusLabels[id] })),
];

export function Projects() {
  const [selected, setSelected] = useState<Project | null>(projectFromHash);
  const [open, setOpen] = useState(() => projectFromHash() !== null);
  const [filter, setFilter] = useState<Filter>("todos");

  const matches = (project: Project) => filter === "todos" || project.status === filter;

  const visibleFeatured = featuredProjects.filter(matches);
  const visibleSecondary = secondaryProjects.filter(matches);
  const visibleCount = visibleFeatured.length + visibleSecondary.length;

  const openProject = (project: Project) => {
    setSelected(project);
    setOpen(true);
    const url = new URL(window.location.href);
    url.hash = `projeto-${project.slug}`;
    window.history.replaceState(null, "", url);
  };

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);
    if (!nextOpen && window.location.hash.startsWith("#projeto-")) {
      const url = new URL(window.location.href);
      url.hash = "projetos";
      window.history.replaceState(null, "", url);
    }
  };

  // A shared link pasted into the same tab fires `hashchange` without a reload,
  // so keep the open case in sync with the URL.
  useEffect(() => {
    const sync = () => {
      const project = projectFromHash();
      if (!project) return;
      setSelected(project);
      setOpen(true);
    };

    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  return (
    <section
      id="projetos"
      aria-labelledby="projetos-title"
      className="relative scroll-mt-24 py-20 sm:py-24"
    >
      <div className="container-page">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <Reveal>
            <SectionHeading
              eyebrow="Projetos"
              title="O que eu construí"
              accent={"até\u00a0agora."}
              titleId="projetos-title"
              className="[&>h2]:max-w-none"
            />
          </Reveal>
          <Reveal delay={100}>
            <p className="text-body-regular text-text-secondary" data-reveal-item>
              Cada projeto corresponde a um repositório meu. O status mostra o que já está publicado
              hoje, e cada caso descreve também o que ainda não existe.
            </p>
            <p className="mt-3 text-body-regular text-text-tertiary" data-reveal-item>
              Abra um projeto para ver problema, decisões técnicas, stack e limites.
            </p>
          </Reveal>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-2">
          <span className="font-mono text-caption-1-regular tracking-[0.12em] text-text-tertiary uppercase">
            Filtrar
          </span>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar projetos por status">
            {FILTERS.map((item) => {
              const count =
                item.id === "todos"
                  ? projects.length
                  : projects.filter((project) => project.status === item.id).length;
              const active = filter === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setFilter(item.id)}
                  className={cx(
                    "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-body-2-medium transition-colors",
                    "focus-visible:ring-2 focus-visible:ring-border-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background-full focus-visible:outline-none",
                    active
                      ? "border-electric-400/60 bg-electric-500/15 text-text-primary"
                      : "border-separator-border bg-background-secondary-default/50 text-text-secondary hover:border-border-button-hover hover:text-text-primary",
                  )}
                >
                  {item.label}
                  <span
                    className={cx(
                      "font-mono text-[0.625rem] tabular-nums",
                      active ? "text-electric-300" : "text-text-tertiary",
                    )}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
          <span role="status" aria-live="polite" className="text-caption-1-regular text-text-tertiary">
            {visibleCount} de {projects.length}
          </span>
        </div>

        {visibleFeatured.length > 0 ? (
          <div className="mt-10 flex flex-col gap-8">
            {visibleFeatured.map((project, index) => (
              <Reveal key={project.slug} delay={index * 60}>
                <div data-reveal-item>
                  <ProjectCard
                    project={project}
                    onOpen={openProject}
                    variant="featured"
                    flip={index % 2 === 1}
                  />
                </div>
              </Reveal>
            ))}
          </div>
        ) : null}

        {visibleSecondary.length > 0 ? (
          <div className="mt-24">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="font-mono text-caption-1-semibold tracking-[0.16em] text-text-tertiary uppercase">
                  também no portfólio
                </p>
                <h3 id="outros-projetos" className="mt-3 text-title-1-semibold text-text-primary">
                  Outros trabalhos
                </h3>
                <p className="mt-2 max-w-xl text-body-regular text-text-secondary">
                  Produtos publicados, interfaces de estudo e exercícios de fidelidade visual, cada
                  um com o escopo descrito.
                </p>
              </div>
              <span className="inline-flex items-center gap-2 font-mono text-caption-1-regular text-text-tertiary">
                <RiArrowDownLine className="size-3.5" aria-hidden />
                {visibleSecondary.length} {visibleSecondary.length === 1 ? "projeto" : "projetos"}
              </span>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {visibleSecondary.map((project, index) => (
                <Reveal key={project.slug} delay={index * 50}>
                  <div data-reveal-item className="h-full">
                    <ProjectCard project={project} onOpen={openProject} variant="compact" />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        ) : null}

        <Reveal className="mt-14">
          <div
            data-reveal-item
            className="flex flex-col items-start justify-between gap-5 rounded-3xl border border-separator-border bg-background-secondary-default/40 p-6 sm:flex-row sm:items-center sm:p-8"
          >
            <div>
              <p className="text-title-3-semibold text-text-primary">
                Os repositórios públicos estão no GitHub.
              </p>
              <p className="mt-1.5 text-body-regular text-text-secondary">
                Projetos com repositório privado aparecem aqui com o motivo indicado.
              </p>
            </div>
            <ButtonLink
              href="https://github.com/pauloaraujodeveloper"
              target="_blank"
              rel="noreferrer noopener"
              variant="secondary"
              trailingIcon={RiArrowRightUpLine}
            >
              Abrir GitHub
              <span className="sr-only"> (abre em nova aba)</span>
            </ButtonLink>
          </div>
        </Reveal>
      </div>

      <ProjectModal project={selected} isOpen={open} onOpenChange={handleOpenChange} />
    </section>
  );
}
