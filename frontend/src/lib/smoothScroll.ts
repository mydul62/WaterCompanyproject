import type Lenis from "lenis";

let activeLenis: Lenis | null = null;

/**
 * Registers or clears the active desktop Lenis instance managed by SmoothScroll.
 */
export function setLenisInstance(instance: Lenis | null): void {
  activeLenis = instance;
}

/**
 * Returns the active Lenis instance when desktop smooth scrolling is enabled.
 */
export function getLenisInstance(): Lenis | null {
  return activeLenis;
}

/**
 * Smoothly scrolls to the top of the page through Lenis (when active) to avoid
 * fighting native browser smooth scroll animations.
 */
export function smoothScrollToTop(duration = 0.85): void {
  if (typeof window === "undefined") return;

  if (activeLenis && !activeLenis.isStopped) {
    activeLenis.scrollTo(0, { duration });
    return;
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
}

/**
 * Smoothly scrolls to a target element (or element ID) via Lenis when active,
 * falling back cleanly to native scrollIntoView on touch/mobile/admin views.
 */
export function smoothScrollToElement(
  target: string | HTMLElement | null,
  options?: { offset?: number; duration?: number }
): void {
  if (typeof window === "undefined" || !target) return;

  const el =
    typeof target === "string"
      ? document.getElementById(target.replace(/^#/, ""))
      : target;

  if (!el) return;

  if (activeLenis && !activeLenis.isStopped) {
    activeLenis.scrollTo(el, {
      offset: options?.offset ?? 0,
      duration: options?.duration ?? 0.9,
    });
    return;
  }

  el.scrollIntoView({ behavior: "smooth" });
}

