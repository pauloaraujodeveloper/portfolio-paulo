import { useEffect, useRef, useState } from "react";
import type { ProjectShot } from "@/types/portfolio";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cx } from "@/utils/cx";

const INTERVAL_MS = 3000;

/**
 * Auto-advancing crossfade between a project's real screenshots.
 *
 * - Advances every 3s, but only while the card is on screen, the tab is
 *   visible, and the visitor is not hovering or focusing inside it.
 * - With reduced motion it never auto-advances: the visitor drives it with the
 *   indicator buttons and the swap is instant.
 * - All images stay mounted, so switching never fetches or shifts layout; only
 *   the first one loads eagerly-ish, the rest are lazy.
 */
export function ShotCarousel({
  shots,
  label,
  className,
}: {
  shots: ProjectShot[];
  label: string;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [onScreen, setOnScreen] = useState(false);
  const [interacting, setInteracting] = useState(false);
  const [tabVisible, setTabVisible] = useState(
    () => typeof document === "undefined" || document.visibilityState === "visible",
  );
  const root = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const element = root.current;
    if (!element || !("IntersectionObserver" in window)) {
      setOnScreen(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => setOnScreen(entries[0]?.isIntersecting ?? false),
      { threshold: 0.35 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onChange = () => setTabVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", onChange);
    return () => document.removeEventListener("visibilitychange", onChange);
  }, []);

  const playing = !reduced && onScreen && tabVisible && !interacting && shots.length > 1;

  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % shots.length);
    }, INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [playing, shots.length]);

  return (
    <div
      ref={root}
      role="group"
      aria-roledescription="carrossel"
      aria-label={`Capturas de tela de ${label}`}
      onMouseEnter={() => setInteracting(true)}
      onMouseLeave={() => setInteracting(false)}
      onFocus={() => setInteracting(true)}
      onBlur={() => setInteracting(false)}
      className={cx("relative overflow-hidden bg-ink-950", className)}
    >
      <div aria-live={playing ? "off" : "polite"}>
        {shots.map((shot, position) => (
          <img
            key={shot.src}
            src={shot.src}
            alt={shot.alt}
            width={shot.width}
            height={shot.height}
            loading="lazy"
            decoding="async"
            aria-hidden={position !== index}
            className={cx(
              "absolute inset-0 size-full object-contain object-center",
              reduced ? "" : "transition-opacity duration-700 ease-out",
              position === index ? "opacity-100" : "opacity-0",
            )}
          />
        ))}
      </div>

      <div className="absolute inset-x-0 bottom-2.5 z-10 flex justify-center gap-1.5">
        {shots.map((shot, position) => (
          <button
            key={shot.src}
            type="button"
            aria-label={`Mostrar imagem ${position + 1} de ${shots.length}`}
            aria-current={position === index ? "true" : undefined}
            onClick={() => setIndex(position)}
            className="group grid h-5 w-6 place-items-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-border-focus-ring"
          >
            <span
              className={cx(
                "h-1 rounded-full transition-all duration-300",
                position === index
                  ? "w-5 bg-electric-400"
                  : "w-2.5 bg-mist-400/50 group-hover:bg-mist-400",
              )}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
