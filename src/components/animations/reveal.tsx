import { animate, stagger } from "animejs";
import { useLayoutEffect, useRef } from "react";
import type { ReactNode } from "react";
import { cx } from "@/utils/cx";
import { prefersReducedMotion } from "@/hooks/use-reduced-motion";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Milliseconds before the group starts. */
  delay?: number;
  /** Distance in px the elements travel up while fading in. */
  distance?: number;
  /** Per-child delay when the group contains `[data-reveal-item]` nodes. */
  staggerMs?: number;
}

/**
 * Scroll-triggered entrance built on Anime.js.
 *
 * The initial hidden state is applied in a layout effect — after React has
 * mounted but before paint — so crawlers and no-JS visitors always get visible
 * content, and there is no flash of a visible element snapping to hidden.
 * The animation runs once per element; the observer disconnects immediately.
 * Nothing is left running after the entrance, and with reduced motion the
 * elements are never hidden at all.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  distance = 22,
  staggerMs = 55,
}: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const root = ref.current;
    if (!root) return;
    if (prefersReducedMotion() || !("IntersectionObserver" in window)) return;

    const items = Array.from(root.querySelectorAll<HTMLElement>("[data-reveal-item]"));
    const targets: HTMLElement[] = items.length > 0 ? items : [root];

    for (const target of targets) {
      target.style.opacity = "0";
      target.style.transform = `translateY(${distance}px)`;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting) return;

        observer.disconnect();
        const params = {
          opacity: [0, 1],
          translateY: [distance, 0],
          duration: 720,
          ease: "out(3)",
        };

        if (items.length > 0) {
          animate(targets, { ...params, delay: stagger(staggerMs, { start: delay }) });
        } else {
          animate(targets, { ...params, delay });
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.12 },
    );

    observer.observe(root);
    return () => observer.disconnect();
  }, [delay, distance, staggerMs]);

  return (
    <div ref={ref} className={cx(className)}>
      {children}
    </div>
  );
}
