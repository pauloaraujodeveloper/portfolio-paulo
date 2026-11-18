import type { ProjectStatus } from "@/types/portfolio";
import { cx } from "@/utils/cx";

const config: Record<ProjectStatus, { label: string; dot: string }> = {
  publicado: { label: "Publicado", dot: "bg-signal-cyan" },
  "em-desenvolvimento": { label: "Em desenvolvimento", dot: "bg-electric-400" },
  mvp: { label: "MVP", dot: "bg-signal-violet" },
  conceito: { label: "Conceito", dot: "bg-mist-500" },
  estudo: { label: "Estudo", dot: "bg-mist-500" },
};

export function StatusBadge({
  status,
  className,
}: {
  status: ProjectStatus;
  className?: string;
}) {
  const { label, dot } = config[status];

  return (
    <span
      className={cx(
        "inline-flex items-center gap-2 rounded-full border border-separator-border bg-background-secondary-default/80 px-2.5 py-1",
        "font-mono text-[0.6875rem] font-medium tracking-[0.08em] text-text-secondary uppercase",
        className,
      )}
    >
      <span aria-hidden className={cx("size-1.5 rounded-full", dot)} />
      {label}
    </span>
  );
}
