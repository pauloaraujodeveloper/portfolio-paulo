import { useEffect, useState } from "react";

/**
 * Tracks which section is currently in view. Uses a root margin that biases
 * the middle of the viewport, so the nav highlights what the reader is looking
 * at rather than whatever touches the top edge.
 */
export function useActiveSection(sectionIds: readonly string[]) {
  const [active, setActive] = useState<string>(sectionIds[0] ?? "");

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;

    const visible = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          visible.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
        }

        let best = "";
        let bestRatio = 0;
        for (const [id, ratio] of visible) {
          if (ratio > bestRatio) {
            best = id;
            bestRatio = ratio;
          }
        }

        if (best) setActive(best);
      },
      { rootMargin: "-20% 0px -55% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );

    const nodes = sectionIds
      .map((id) => document.getElementById(id))
      .filter((node): node is HTMLElement => node !== null);

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [sectionIds]);

  return active;
}
