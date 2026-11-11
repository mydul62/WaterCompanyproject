"use client";

import React, { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();
  const isAdminRoute = Boolean(pathname?.startsWith("/admin"));

  useEffect(() => {
    if (typeof window === "undefined") return;

    // 1. Always use native scrolling inside Admin Dashboard, iframes, or editor builder
    if (
      isAdminRoute ||
      window.self !== window.top ||
      window.location.search.includes("editor=true")
    ) {
      return;
    }

    // 2. Disable Lenis on touch screens and mobile devices (< 1024px)
    // Native mobile browsers have optimized hardware-accelerated momentum scrolling.
    // Overriding touch events on mobile causes jerky/stuttering behavior and scroll locks.
    const isMobileOrTouch =
      window.innerWidth < 1024 ||
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia("(pointer: coarse)").matches;

    if (isMobileOrTouch) {
      return;
    }

    // 3. Initialize Lenis for public desktop mouse wheel / trackpads while allowing nested scroll containers (modals/drawers/sidebars)
    try {
      const lenis = new Lenis({
        duration: 1.1,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        allowNestedScroll: true,
        stopInertiaOnNavigate: true,
        wheelMultiplier: 1.0,
        touchMultiplier: 0, // Never hijack touch
        autoRaf: true,
      });

      lenisRef.current = lenis;

      return () => {
        lenis.destroy();
        lenisRef.current = null;
      };
    } catch (e) {
      // Graceful fallback to native scrolling
    }
  }, [isAdminRoute]);

  return <>{children}</>;
}
