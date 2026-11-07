"use client";

import React, { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollRevealProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const revealElements = () => {
      const elements = document.querySelectorAll("[data-reveal]");
      const windowHeight = window.innerHeight;
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        // Element is in or near viewport
        if (rect.top <= windowHeight - 40 && rect.bottom >= 20) {
          el.classList.add("is-revealed");
        } else if (rect.top > windowHeight + 100 || rect.bottom < -100) {
          // Reset when scrolled completely out of view for lively in-out re-triggering
          el.classList.remove("is-revealed");
        }
      });
    };

    // Run immediately and after hydration to ensure no initial hidden states
    revealElements();
    const t1 = setTimeout(revealElements, 60);
    const t2 = setTimeout(revealElements, 250);
    const t3 = setTimeout(revealElements, 600);

    // High performance scroll & resize listener
    window.addEventListener("scroll", revealElements, { passive: true });
    window.addEventListener("resize", revealElements, { passive: true });

    // Hardware-accelerated IntersectionObserver
    let observer: IntersectionObserver | null = null;
    if ("IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-revealed");
            } else {
              const rect = entry.target.getBoundingClientRect();
              if (rect.top > window.innerHeight + 100 || rect.bottom < -100) {
                entry.target.classList.remove("is-revealed");
              }
            }
          });
        },
        { rootMargin: "0px 0px -40px 0px", threshold: 0.05 }
      );

      const allReveal = document.querySelectorAll("[data-reveal]");
      allReveal.forEach((el) => observer?.observe(el));
    }

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      window.removeEventListener("scroll", revealElements);
      window.removeEventListener("resize", revealElements);
      observer?.disconnect();
    };
  }, [pathname]);

  return <>{children}</>;
}
