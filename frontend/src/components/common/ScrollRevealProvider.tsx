"use client";

import React, { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollRevealProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;

    let observer: IntersectionObserver | null = null;
    let mutationObserver: MutationObserver | null = null;
    let rafId = 0;
    const observed = new WeakSet<Element>();

    const revealElement = (el: Element) => {
      el.classList.add("is-revealed");
      observer?.unobserve(el);
    };

    const isNearOrAboveViewport = (el: Element) => {
      const rect = el.getBoundingClientRect();
      return rect.top <= window.innerHeight + 80;
    };

    const scanAndObserve = () => {
      const elements = document.querySelectorAll("[data-reveal]:not(.is-revealed)");
      if (!elements.length) return;

      if (!("IntersectionObserver" in window)) {
        elements.forEach(revealElement);
        return;
      }

      if (!observer) {
        observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting || isNearOrAboveViewport(entry.target)) {
                revealElement(entry.target);
              }
            });
          },
          { rootMargin: "80px 0px 80px 0px", threshold: 0.01 }
        );
      }

      elements.forEach((el) => {
        if (isNearOrAboveViewport(el)) {
          revealElement(el);
        } else if (!observed.has(el)) {
          observed.add(el);
          observer?.observe(el);
        }
      });
    };

    const scheduleScan = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = 0;
        scanAndObserve();
      });
    };

    scanAndObserve();
    const timerFast = window.setTimeout(scanAndObserve, 150);
    const timerSettled = window.setTimeout(scanAndObserve, 600);

    if ("MutationObserver" in window && document.body) {
      mutationObserver = new MutationObserver(() => {
        scheduleScan();
      });
      mutationObserver.observe(document.body, {
        childList: true,
        subtree: true,
      });
    }

    window.addEventListener("scroll", scheduleScan, { passive: true });
    window.addEventListener("resize", scheduleScan, { passive: true });

    return () => {
      window.clearTimeout(timerFast);
      window.clearTimeout(timerSettled);
      if (rafId) window.cancelAnimationFrame(rafId);
      observer?.disconnect();
      mutationObserver?.disconnect();
      window.removeEventListener("scroll", scheduleScan);
      window.removeEventListener("resize", scheduleScan);
    };
  }, [pathname]);

  return <>{children}</>;
}
