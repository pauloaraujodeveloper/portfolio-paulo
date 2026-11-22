import { RiArrowRightLine, RiExternalLinkLine, RiGithubFill } from "@remixicon/react";
import type { Project } from "@/types/portfolio";
import { StatusBadge } from "@/components/ui/status-badge";
import { ProjectVisual } from "@/components/projects/project-visual";
import { cx } from "@/utils/cx";

function ProjectLinks({ project }: { project: Project }) {
  if (project.links.length === 0) return null;

  return (
    <ul className="flex flex-wrap items-center gap-4">
      {project.links.map((link) => (
        <li key={link.href}>
          <a
            href={link.href}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-1.5 text-body-medium text-text-secondary transition-colors hover:text-text-primary"
          >
            {link.kind === "repo" ? (
              <RiGithubFill className="size-4" aria-hidden />
            ) : (
              <RiExternalLinkLine className="size-4" aria-hidden />
            )}
            {link.label}
            <span className="sr-only"> (abre em nova aba)</span>
          </a>
        </li>
      ))}
    </ul>
  );
}

export function ProjectCard({
  project,
  onOpen,
  variant = "featured",
  flip = false,
}: {
  project: Project;
  onOpen: (project: Project) => void;
  variant?: "featured" | "compact";
  /** Puts the visual on the right on wide screens, for rhythm between cards. */
  flip?: boolean;
}) {
  const titleId = `projeto-${project.slug}-titulo`;
  const hasShot = Boolean(project.shots?.length);

  if (variant === "compact") {
    return (
      <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-separator-border bg-background-primary-default/60 transition-colors hover:border-border-button-hover">
        {hasShot ? (
          <ProjectVisual project={project} className="aspect-[16/9] shrink-0 border-b border-separator-border" />
        ) : null}

        <div className="flex flex-1 flex-col gap-5 p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 id={titleId} className="text-title-3-semibold text-text-primary">
                {project.name}
              </h3>
              <p className="mt-1.5 text-body-regular text-text-secondary">{project.summary}</p>
            </div>
            <StatusBadge status={project.status} className="shrink-0" />
          </div>

          <ul className="flex flex-wrap gap-1.5">
            {project.stack.slice(0, 4).map((item) => (
              <li
                key={item}
                className="rounded-md border border-separator-border px-2 py-1 font-mono text-[0.6875rem] text-text-tertiary"
              >
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-auto flex items-center justify-between gap-4 border-t border-separator-border pt-4">
            <button
              type="button"
              onClick={() => onOpen(project)}
              className="inline-flex items-center gap-1.5 rounded-md text-body-medium text-text-primary transition-colors hover:text-electric-300 focus-visible:ring-2 focus-visible:ring-border-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background-full focus-visible:outline-none"
            >
              Ver detalhes
              <RiArrowRightLine className="size-4" aria-hidden />
            </button>
            <ProjectLinks project={project} />
          </div>
        </div>
      </article>
    );
  }

  return (
    <article
      aria-labelledby={titleId}
      className="group relative grid overflow-hidden rounded-3xl border border-separator-border bg-background-primary-default/60 transition-[border-color,box-shadow] duration-300 hover:border-border-button-hover hover:shadow-2xl lg:grid-cols-[0.95fr_1.05fr]"
    >
      <ProjectVisual
        project={project}
        rotate
        className={cx(
          "w-full border-b border-separator-border lg:border-b-0",
          flip ? "lg:order-2 lg:border-s" : "lg:border-e",
          hasShot ? "aspect-[16/9] lg:aspect-auto lg:min-h-[24rem]" : "min-h-[14rem] lg:min-h-[24rem]",
        )}
      />

      <div className="flex flex-col gap-5 p-6 sm:p-8">
        <div className="flex flex-wrap items-center gap-3">
          <StatusBadge status={project.status} />
          <span className="font-mono text-caption-1-regular text-text-tertiary">
            {project.stack[0]}
          </span>
        </div>

        <div>
          <h3 id={titleId} className="text-title-2-semibold text-text-primary sm:text-title-1-semibold">
            {project.name}
          </h3>
          <p className="mt-1 text-body-medium text-electric-300">{project.tagline}</p>
          <p className="mt-4 text-body-regular text-text-secondary">{project.summary}</p>
        </div>

        <ul className="flex flex-col gap-2.5">
          {project.highlights.slice(0, 2).map((highlight) => (
            <li key={highlight.title} className="flex gap-3 text-body-regular text-text-secondary">
              <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-electric-400" />
              <span>
                <span className="text-text-primary">{highlight.title}.</span> {highlight.description}
              </span>
            </li>
          ))}
        </ul>

        <ul className="flex flex-wrap gap-1.5">
          {project.stack.slice(0, 5).map((item) => (
            <li
              key={item}
              className="rounded-md border border-separator-border bg-background-secondary-default/50 px-2 py-1 font-mono text-[0.6875rem] text-text-tertiary"
            >
              {item}
            </li>
          ))}
          {project.stack.length > 5 ? (
            <li className="rounded-md px-2 py-1 font-mono text-[0.6875rem] text-text-tertiary">
              +{project.stack.length - 5}
            </li>
          ) : null}
        </ul>

        <div className="mt-auto flex flex-wrap items-center justify-between gap-4 border-t border-separator-border pt-5">
          <button
            type="button"
            onClick={() => onOpen(project)}
            className={cx(
              "inline-flex items-center gap-1.5 rounded-md text-body-medium text-text-primary transition-colors",
              "hover:text-electric-300 focus-visible:ring-2 focus-visible:ring-border-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background-full focus-visible:outline-none",
            )}
          >
            Detalhes do projeto
            <RiArrowRightLine className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden />
          </button>
          <ProjectLinks project={project} />
        </div>
      </div>
    </article>
  );
}
