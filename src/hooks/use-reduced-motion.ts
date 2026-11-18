import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(callback: () => void) {
  const media = window.matchMedia(QUERY);
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}

function getSnapshot() {
  return window.matchMedia(QUERY).matches;
}

/** True when the visitor asked the OS to reduce motion. SSR-safe. */
export function useReducedMotion() {
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}

/** Non-hook read for code that runs outside render (event handlers, effects). */
export function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia(QUERY).matches;
}
