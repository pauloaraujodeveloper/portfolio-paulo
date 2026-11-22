import { animate } from "animejs";
import { useLayoutEffect, useRef } from "react";
import { projects } from "@/data/projects";
import { stackGroups } from "@/data/stack";
import { prefersReducedMotion } from "@/hooks/use-reduced-motion";

/** Every figure is derived from the data files, never typed by hand. */
const STATS = [
  { label: "projetos documentados", value: projects.length },
  {
    label: "publicados no ar",
    value: projects.filter((project) => project.status === "publicado").length,
  },
  {
    label: "tecnologias em uso real",
    value: new Set(stackGroups.flatMap((group) => group.items)).size,
  },
] as const;

export function HeroStats() {
  const root = useRef<HTMLDListElement | null>(null);

  useLayoutEffect(() => {
    const element = root.current;
    if (!element || prefersReducedMotion()) return;

    const targets = Array.from(element.querySelectorAll<HTMLElement>("[data-count]"));
    const counter = { progress: 0 };

    const render = () => {
      for (const target of targets) {
        const end = Number(target.dataset.count);
        target.textContent = String(Math.round(end * counter.progress));
      }
    };
    render();

    const animation = animate(counter, {
      progress: 1,
      duration: 1200,
      delay: 500,
      ease: "out(3)",
      onUpdate: render,
      onComplete: render,
    });

    return () => {
      animation.revert();
      counter.progress = 1;
      render();
    };
  }, []);

  return (
    <dl
      ref={root}
      className="grid grid-cols-3 divide-x divide-separator-border rounded-2xl border border-separator-border bg-background-secondary-default/40 rtl:divide-x-reverse"
    >
      {STATS.map((stat) => (
        <div key={stat.label} className="px-4 py-4 sm:px-6">
          <dd
            data-count={stat.value}
            className="font-mono text-title-2-semibold text-text-primary tabular-nums"
          >
            {stat.value}
          </dd>
          <dt className="mt-1 text-caption-1-regular text-text-tertiary">{stat.label}</dt>
        </div>
      ))}
    </dl>
  );
}
