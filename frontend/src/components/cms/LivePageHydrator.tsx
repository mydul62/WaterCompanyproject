"use client";

import React, { useEffect } from "react";
import { usePathname } from "next/navigation";
import { api } from "@/lib/api";
import { isElementInLockedSection } from "@/lib/editorLocks";

// Pathname to Page Key Mapping
const ROUTE_TO_PAGE_KEY: Record<string, string> = {
  "/": "home",
  "/our-story": "story",
  "/our-business": "business",
  "/sustainability": "sustainability",
  "/products": "products",
  "/certificates": "certificates",
  "/careers": "careers",
  "/brands-we-work-with": "brands",
  "/media": "media",
  "/rnd": "rnd",
  "/tool-room": "tool-room",
  "/faqs": "faqs",
  "/case-studies": "case-studies",
  "/blog": "blog",
  "/tv-news": "tv-news",
  "/request-quote": "request-quote",
};

// Route to Slug Mapping for API Queries
const ROUTE_TO_SLUG: Record<string, string> = {
  "/": "home",
  "/our-story": "our-story",
  "/our-business": "our-business",
  "/sustainability": "sustainability",
  "/products": "products",
  "/certificates": "certificates",
  "/careers": "careers",
  "/brands-we-work-with": "brands-we-work-with",
  "/media": "media",
  "/rnd": "rnd",
  "/tool-room": "tool-room",
  "/faqs": "faqs",
  "/case-studies": "case-studies",
  "/blog": "blog",
  "/tv-news": "tv-news",
  "/request-quote": "request-quote",
};

/**
 * Universal Visual Override Applier
 * Applies text, image src, links, and inline CSS overrides directly to DOM elements.
 */
function applyOverridesToDom(pageOverrides: Record<string, any>, pageKey: string) {
  if (!pageOverrides || typeof pageOverrides !== "object") return;

  for (const [selector, data] of Object.entries(pageOverrides)) {
    if (!selector || !data || typeof data !== "object") continue;

    try {
      const el = document.querySelector(selector) as HTMLElement | null;
      if (!el || isElementInLockedSection(el, pageKey)) continue;

      // Text override
      if (typeof data.text === "string" && data.text.trim().length > 0) {
        // Prevent wiping nested SVGs or interactive child structures if el has them
        if (el.children.length === 0 || ["H1", "H2", "H3", "H4", "H5", "H6", "P", "SPAN", "BUTTON", "A"].includes(el.tagName)) {
          el.innerText = data.text;
        }
      }

      // Image source and alt overrides
      if (el.tagName === "IMG") {
        const img = el as HTMLImageElement;
        if (data.src && img.src !== data.src) {
          img.src = data.src;
          img.removeAttribute("srcset"); // Clear Next.js responsive srcset so custom src loads cleanly
        }
        if (data.alt) {
          img.alt = data.alt;
        }
      } else if (data.src) {
        // Look for nested img
        const nestedImg = el.querySelector("img") as HTMLImageElement | null;
        if (nestedImg) {
          nestedImg.src = data.src;
          nestedImg.removeAttribute("srcset");
          if (data.alt) nestedImg.alt = data.alt;
        }
      }

      // Link href and target overrides
      if (el.tagName === "A" && data.href) {
        (el as HTMLAnchorElement).href = data.href;
        if (data.target) (el as HTMLAnchorElement).target = data.target;
      }

      // Style overrides
      if (data.styles && typeof data.styles === "object") {
        for (const [prop, val] of Object.entries(data.styles)) {
          if (val && typeof val === "string") {
            (el.style as any)[prop] = val;
          }
        }
      }
    } catch (e) {
      // Graceful error isolation per element
    }
  }
}

export default function LivePageHydrator() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined" || !pathname) return;

    // Never hydrate or query CMS page overrides on Admin/API/internal routes or
    // routes that are not registered CMS pages (prevents 404s like /pages/slug/admin/...).
    if (
      pathname.startsWith("/admin") ||
      pathname.startsWith("/api") ||
      pathname.startsWith("/_next") ||
      pathname.startsWith("/products/") ||
      pathname.startsWith("/media/")
    ) {
      return;
    }

    const mappedSlug = ROUTE_TO_SLUG[pathname];
    if (!mappedSlug) return;

    // Skip inside builder canvas itself while actively editing
    // The builder manages its own iframe preview
    const isEditorActive =
      window.location.search.includes("editor=true") &&
      window.self === window.top;
    if (isEditorActive) return;

    const pageKey = ROUTE_TO_PAGE_KEY[pathname] || pathname.replace(/^\//, "");
    const slug = mappedSlug;

    let currentOverrides: Record<string, any> | null = null;
    const applyLatestOverrides = () => {
      if (currentOverrides && typeof currentOverrides === "object") {
        applyOverridesToDom(currentOverrides, pageKey);
      }
    };

    // Database Synchronization: Fetch latest published overrides from backend PostgreSQL API
    let isCancelled = false;
    api.pages
      .getBySlug(slug)
      .then((res) => {
        if (isCancelled || !res?.data) return;
        const page = res.data;

        // Apply published SEO Title if present
        if (page.seoTitle) {
          document.title = page.seoTitle;
        }

        const pubContentStr = page.publishedContent;
        if (pubContentStr && pubContentStr !== "{}") {
          try {
            const parsed =
              typeof pubContentStr === "string"
                ? JSON.parse(pubContentStr)
                : pubContentStr;

            const pageOverrides =
              parsed[pageKey] ||
              (parsed.home && pageKey === "home" ? parsed.home : parsed);

            if (pageOverrides && typeof pageOverrides === "object") {
              currentOverrides = pageOverrides;
              applyOverridesToDom(pageOverrides, pageKey);
            }
          } catch {
            // ignore malformed JSON
          }
        }
      })
      .catch(() => {
        // Keep base React DOM when offline instead of stale localStorage overrides
      });

    // 3. Real-Time Broadcast Sync: Instant reflection when Editor clicks 'Publish'
    const handlePublishedBroadcast = (e: any) => {
      const data = e.detail || e;
      if (data?.overrides) {
        const targetOverrides = data.overrides[pageKey] || data.overrides;
        if (targetOverrides && typeof targetOverrides === "object") {
          currentOverrides = targetOverrides;
          applyOverridesToDom(targetOverrides, pageKey);
        }
      }
    };

    window.addEventListener("cms-page-published", handlePublishedBroadcast);

    let bc: BroadcastChannel | null = null;
    try {
      bc = new BroadcastChannel("waterweb_cms_sync");
      bc.onmessage = (msg) => {
        if (msg.data?.type === "PAGE_PUBLISHED" && msg.data?.overrides) {
          const targetOverrides = msg.data.overrides[pageKey] || msg.data.overrides;
          if (targetOverrides && typeof targetOverrides === "object") {
            currentOverrides = targetOverrides;
            applyOverridesToDom(targetOverrides, pageKey);
          }
        }
      };
    } catch {
      // BroadcastChannel unsupported
    }

    // 4. Mutation Observer: Ensure database overrides persist through React client re-renders
    const observer = new MutationObserver(() => {
      applyLatestOverrides();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: false,
    });

    return () => {
      isCancelled = true;
      window.removeEventListener("cms-page-published", handlePublishedBroadcast);
      observer.disconnect();
      if (bc) bc.close();
    };
  }, [pathname]);

  return null;
}

