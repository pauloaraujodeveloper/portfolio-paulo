import { useState } from "react";
import {
  RiArrowRightUpLine,
  RiCheckLine,
  RiExternalLinkLine,
  RiFileCopyLine,
  RiGithubFill,
  RiImageLine,
} from "@remixicon/react";
import type { Project, ProjectLink } from "@/types/portfolio";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "@/components/base/modal/modal";
import { Button, ButtonLink } from "@/components/base/buttons/button";
import { Chip } from "@/components/base/badges/chip";
import { StatusBadge } from "@/components/ui/status-badge";

const LINK_ICON = {
  repo: RiGithubFill,
  demo: RiExternalLinkLine,
  site: RiArrowRightUpLine,
} as const;

function linkIcon(link: ProjectLink) {
  return LINK_ICON[link.kind];
}

function ShotGallery({ project }: { project: Project }) {
  const shots = project.shots;

  if (!shots?.length) return null;

  return (
    <div className="flex flex-col gap-3">
      <p className="flex items-center gap-2 font-mono text-caption-1-semibold tracking-[0.14em] text-text-tertiary uppercase">
        <RiImageLine className="size-3.5" aria-hidden />
        Telas do projeto
      </p>
      <ul className="grid gap-3 sm:grid-cols-2">
        {shots.map((shot, index) => {
          const isWide = index === 0 || (shots.length % 2 === 1 && index === shots.length - 1);
          return (
            <li key={shot.src} className={isWide ? "sm:col-span-2" : undefined}>
              <a
                href={shot.src}
                target="_blank"
                rel="noreferrer noopener"
                className="group block overflow-hidden rounded-2xl border border-separator-border bg-ink-900 outline-none focus-visible:ring-2 focus-visible:ring-border-focus-ring"
              >
                <img
                  src={shot.src}
                  alt={shot.alt}
                  width={shot.width}
                  height={shot.height}
                  loading={index === 0 ? "eager" : "lazy"}
                  decoding="async"
                  className="w-full bg-ink-950 object-contain transition-opacity duration-500 group-hover:opacity-95"
                />
                <span className="flex items-center justify-between gap-3 border-t border-separator-border px-3 py-2 text-caption-1-regular text-text-tertiary">
                  Captura real do projeto
                  <span className="inline-flex items-center gap-1 text-text-secondary">
                    Ampliar
                    <RiExternalLinkLine className="size-3.5" aria-hidden />
                  </span>
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function DetailBlock({ block }: { block: Project["details"][number] }) {
  return (
    <section className="border-t border-separator-border pt-5 first:border-t-0 first:pt-0">
      <h3 className="text-title-3-semibold text-text-primary">{block.title}</h3>
      {block.body ? (
        <p className="mt-2.5 text-body-regular text-text-secondary">{block.body}</p>
      ) : null}
      {block.items ? (
        <ul className="mt-3 flex flex-col gap-2">
          {block.items.map((item) => (
            <li key={item} className="flex gap-2.5 text-body-regular text-text-secondary">
              <span aria-hidden className="mt-2 size-1 shrink-0 rounded-full bg-electric-400" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}

/**
 * Project case study. Content is rendered from the same `Project` record the
 * card uses, so the detail view can never contradict the card.
 */
export function ProjectModal({
  project,
  isOpen,
  onOpenChange,
}: {
  project: Project | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);
  const copied = copiedSlug !== null && copiedSlug === project?.slug;

  const copyLink = async () => {
    if (!project) return;
    const url = `${window.location.origin}${window.location.pathname}#projeto-${project.slug}`;

    try {
      await navigator.clipboard.writeText(url);
      setCopiedSlug(project.slug);
    } catch {
      const field = document.createElement("textarea");
      field.value = url;
      field.setAttribute("readonly", "");
      field.style.position = "fixed";
      field.style.opacity = "0";
      document.body.appendChild(field);
      field.select();
      document.execCommand("copy");
      field.remove();
      setCopiedSlug(project.slug);
    }
  };

  return (
    <Modal
      size="xl"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      aria-label={project ? `Detalhes do projeto ${project.name}` : "Detalhes do projeto"}
    >
      {({ close }) => (
        <>
          {project ? (
            <>
              <ModalHeader
                title={project.name}
                description={project.tagline}
                closeLabel="Fechar detalhes do projeto"
              />

              <ModalBody className="flex flex-col gap-7">
                <div className="flex flex-wrap items-center gap-3">
                  <StatusBadge status={project.status} />
                  <p className="text-body-regular text-text-tertiary">{project.statusNote}</p>
                </div>

                <ShotGallery project={project} />

                <div className="grid gap-5 sm:grid-cols-2">
                  <section className="rounded-2xl border border-separator-border bg-background-secondary-default/50 p-5">
                    <h3 className="font-mono text-caption-1-semibold tracking-[0.14em] text-text-tertiary uppercase">
                      O problema
                    </h3>
                    <p className="mt-2.5 text-body-regular text-text-secondary">{project.problem}</p>
                  </section>
                  <section className="rounded-2xl border border-separator-border bg-background-secondary-default/50 p-5">
                    <h3 className="font-mono text-caption-1-semibold tracking-[0.14em] text-text-tertiary uppercase">
                      A solução
                    </h3>
                    <p className="mt-2.5 text-body-regular text-text-secondary">{project.solution}</p>
                  </section>
                </div>

                <section>
                  <h3 className="font-mono text-caption-1-semibold tracking-[0.14em] text-text-tertiary uppercase">
                    Destaques
                  </h3>
                  <ul className="mt-3 grid gap-3 sm:grid-cols-2">
                    {project.highlights.map((highlight) => (
                      <li
                        key={highlight.title}
                        className="rounded-2xl border border-separator-border p-4"
                      >
                        <p className="text-body-medium text-text-primary">{highlight.title}</p>
                        <p className="mt-1.5 text-body-regular text-text-secondary">
                          {highlight.description}
                        </p>
                      </li>
                    ))}
                  </ul>
                </section>

                <div className="flex flex-col gap-5">
                  <h3 className="font-mono text-caption-1-semibold tracking-[0.14em] text-text-tertiary uppercase">
                    O caso completo
                  </h3>
                  {project.details.map((block) => (
                    <DetailBlock key={block.title} block={block} />
                  ))}
                </div>

                <section>
                  <h3 className="font-mono text-caption-1-semibold tracking-[0.14em] text-text-tertiary uppercase">
                    Stack
                  </h3>
                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {project.stack.map((item) => (
                      <li key={item}>
                        <Chip variant="caption" color="soft" className="border border-separator-border font-mono">
                          {item}
                        </Chip>
                      </li>
                    ))}
                  </ul>
                </section>
              </ModalBody>

              <ModalFooter className="sm:justify-between">
                <div className="flex flex-wrap items-center gap-2">
                  <Button variant="secondary" onClick={close}>
                    Fechar
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={copyLink}
                    leadingIcon={copied ? RiCheckLine : RiFileCopyLine}
                  >
                    {copied ? "Link copiado" : "Copiar link"}
                  </Button>
                  <span role="status" aria-live="polite" className="sr-only">
                    {copied ? "Link do projeto copiado para a área de transferência." : ""}
                  </span>
                </div>
                {project.links.length > 0 ? (
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                    {project.links.map((link) => (
                      <ButtonLink
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noreferrer noopener"
                        variant="primary"
                        size="medium"
                        trailingIcon={linkIcon(link)}
                      >
                        {link.label}
                        <span className="sr-only"> (abre em nova aba)</span>
                      </ButtonLink>
                    ))}
                  </div>
                ) : null}
              </ModalFooter>
            </>
          ) : null}
        </>
      )}
    </Modal>
  );
}
