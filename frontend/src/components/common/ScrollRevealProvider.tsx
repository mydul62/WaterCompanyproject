"use client";

import React, { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollRevealProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Direct hardware-accelerated IntersectionObserver (Zero layout thrashing, 60/120 FPS buttery smooth)
    let observer: IntersectionObserver | null = null;

    const initObserver = () => {
      const elements = document.querySelectorAll("[data-reveal]");
      if (!elements.length) return;

      if ("IntersectionObserver" in window) {
        observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                entry.target.classList.add("is-revealed");
                // Once revealed, keep it revealed smoothly without jitter
                observer?.unobserve(entry.target);
              }
            });
          },
          { rootMargin: "0px 0px -30px 0px", threshold: 0.08 }
        );

        elements.forEach((el) => {
          // If already in viewport on load, reveal immediately
          const rect = el.getBoundingClientRect();
          if (rect.top < window.innerHeight && rect.bottom > 0) {
            el.classList.add("is-revealed");
          } else {
            observer?.observe(el);
          }
        });
      } else {
        // Fallback for older browsers
        elements.forEach((el) => el.classList.add("is-revealed"));
      }
    };

    initObserver();
    const timer = setTimeout(initObserver, 150);

    return () => {
      clearTimeout(timer);
      observer?.disconnect();
    };
  }, [pathname]);

  return <>{children}</>;
}
