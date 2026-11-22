import type { ProjectStatus } from "@/types/portfolio";
import { projectStatusLabels } from "@/data/project-status";
import { cx } from "@/utils/cx";

const DOT: Record<ProjectStatus, string> = {
  publicado: "bg-signal-cyan",
  "em-desenvolvimento": "bg-electric-400",
  mvp: "bg-signal-violet",
  conceito: "bg-mist-500",
  estudo: "bg-mist-500",
};

export function StatusBadge({
  status,
  className,
}: {
  status: ProjectStatus;
  className?: string;
}) {
  return (
    <span
      className={cx(
        "inline-flex items-center gap-2 rounded-full border border-separator-border bg-background-secondary-default/80 px-2.5 py-1",
        "font-mono text-[0.6875rem] font-medium tracking-[0.08em] text-text-secondary uppercase",
        className,
      )}
    >
      <span aria-hidden className={cx("size-1.5 rounded-full", DOT[status])} />
      {projectStatusLabels[status]}
    </span>
  );
}
