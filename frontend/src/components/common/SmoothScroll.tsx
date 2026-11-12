"use client";

import React, { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { setLenisInstance } from "@/lib/smoothScroll";

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
      setLenisInstance(null);
      return;
    }

    // 2. Disable Lenis on phones/tablets and coarse-pointer devices.
    // Touch-capable laptops (>= 1024px with mouse/trackpad) still get smoothWheel
    // while touch input keeps native scrolling via syncTouch: false & touchMultiplier: 0.
    const isMobileOrCoarse =
      window.innerWidth < 1024 ||
      window.matchMedia("(pointer: coarse)").matches;

    if (isMobileOrCoarse) {
      setLenisInstance(null);
      return;
    }

    // 3. Use frame-rate-independent lerp damping (instead of fixed duration tweens)
    // so rapid mouse wheel / trackpad ticks glide smoothly without resetting velocity.
    try {
      const lenis = new Lenis({
        lerp: 0.095,
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        syncTouch: false,
        allowNestedScroll: true,
        stopInertiaOnNavigate: true,
        wheelMultiplier: 0.95,
        touchMultiplier: 0,
        autoRaf: true,
      });

      lenisRef.current = lenis;
      setLenisInstance(lenis);

      return () => {
        setLenisInstance(null);
        lenis.destroy();
        lenisRef.current = null;
      };
    } catch {
      setLenisInstance(null);
    }
  }, [isAdminRoute]);

  // Keep Lenis scroll bounds synced when navigating between public pages
  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;

    lenis.scrollTo(window.scrollY, { immediate: true, force: true });
    lenis.resize();
  }, [pathname]);

  return <>{children}</>;
}
