import type { Project } from "@/types/portfolio";
import { ShotCarousel } from "@/components/projects/shot-carousel";
import { cx } from "@/utils/cx";

const ACCENT: Record<Project["accent"], string> = {
  electric: "from-electric-500/25 via-electric-600/5 to-signal-cyan/15",
  cyan: "from-signal-cyan/20 via-electric-500/5 to-electric-400/15",
  violet: "from-signal-violet/22 via-electric-500/5 to-electric-400/12",
};

/**
 * Card header visual. Real screenshots when the project has one (with fixed
 * dimensions to avoid layout shift); otherwise a drawn stack panel — never a
 * fake UI screenshot.
 */
export function ProjectVisual({
  project,
  className,
  rotate = false,
}: {
  project: Project;
  className?: string;
  /** Cycles through every screenshot automatically (main projects only). */
  rotate?: boolean;
}) {
  const shot = project.shots?.[0];

  if (rotate && project.shots && project.shots.length > 1) {
    return <ShotCarousel shots={project.shots} label={project.name} className={className} />;
  }

  if (shot) {
    return (
      <div className={cx("relative overflow-hidden bg-ink-950", className)}>
        <img
          src={shot.src}
          alt={shot.alt}
          width={shot.width}
          height={shot.height}
          loading="lazy"
          decoding="async"
          className="size-full object-contain object-center"
        />
      </div>
    );
  }

  const stack = project.stack.slice(0, 6);

  return (
    <div
      className={cx(
        "relative overflow-hidden border-b border-separator-border bg-ink-900",
        className,
      )}
    >
      <div aria-hidden className={cx("absolute inset-0 bg-gradient-to-br", ACCENT[project.accent])} />
      <div aria-hidden className="surface-grid absolute inset-0 opacity-25" />
      <div className="relative flex h-full flex-col justify-between gap-6 p-6 sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <span className="grid size-11 place-items-center rounded-2xl border border-ink-600 bg-ink-850/80 font-sans text-body-semibold text-text-primary">
            {project.name.slice(0, 2).toUpperCase()}
          </span>
          <span className="rounded-md border border-separator-border bg-ink-950/50 px-2 py-1 font-mono text-[0.625rem] tracking-[0.1em] text-text-tertiary uppercase">
            {project.status === "publicado" ? "live" : "build"}
          </span>
        </div>

        <div>
          <p className="font-mono text-[0.625rem] tracking-[0.16em] text-text-tertiary uppercase">
            stack
          </p>
          <ul className="mt-3 flex flex-wrap gap-1.5">
            {stack.map((item) => (
              <li
                key={item}
                className="rounded-md border border-ink-600/80 bg-ink-950/40 px-2 py-1 font-mono text-[0.6875rem] text-text-secondary"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
