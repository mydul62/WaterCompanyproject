export interface LockedSectionRule {
  id: string;
  /** Page keys from AVAILABLE_PAGES / ROUTE_TO_PAGE_KEY where this selector applies, or "*" for all pages */
  pages: string[] | "*";
  /** CSS selector matching the locked root container */
  selector: string;
  /** Human-readable Dashboard module name */
  moduleName: string;
  /** Dashboard management route */
  dashboardHref: string;
  /** Optional secondary Dashboard route (e.g. Product Categories) */
  secondaryHref?: string;
  secondaryLabel?: string;
  /** Explanation shown in the visual editor when selected */
  reason: string;
}

export const LOCKED_SECTION_RULES: LockedSectionRule[] = [
  {
    id: "banner-slider",
    pages: ["home"],
    selector: "#hero",
    moduleName: "Banner Slider",
    dashboardHref: "/admin/banner",
    reason:
      "Homepage hero banner slides, headlines, offer badges, and CTA media are dynamically managed in Dashboard -> Banner Slider.",
  },
  {
    id: "home-products",
    pages: ["home"],
    selector: "#products",
    moduleName: "Product Catalog",
    dashboardHref: "/admin/products",
    secondaryHref: "/admin/categories",
    secondaryLabel: "Manage Categories",
    reason:
      "Product showcase cards, categories, specifications, and imagery are dynamically managed in Dashboard -> Product Catalog.",
  },
  {
    id: "products-catalog-grid",
    pages: ["products"],
    selector: "#product-content",
    moduleName: "Product Catalog",
    dashboardHref: "/admin/products",
    secondaryHref: "/admin/categories",
    secondaryLabel: "Manage Categories",
    reason:
      "Live product directory, category filters, and product specs are dynamically managed in Dashboard -> Product Catalog & Product Categories.",
  },
  {
    id: "home-press-media",
    pages: ["home"],
    selector: "#media",
    moduleName: "Press & Media",
    dashboardHref: "/admin/media",
    reason:
      "National newspaper stories, clippings, and press headlines are dynamically managed in Dashboard -> Press & Media.",
  },
  {
    id: "media-press-grid",
    pages: ["media"],
    selector: "#press-stories",
    moduleName: "Press & Media",
    dashboardHref: "/admin/media",
    reason:
      "Press coverage archive items, outlet filters, and full articles are dynamically managed in Dashboard -> Press & Media.",
  },
  {
    id: "blog-posts-feed",
    pages: ["blog"],
    selector: "#blog-content, #blog-articles",
    moduleName: "Blog & Insights",
    dashboardHref: "/admin/blog",
    reason:
      "Featured whitepaper and blog articles are dynamically managed in Dashboard -> Blog & Insights.",
  },
  {
    id: "case-studies-grid",
    pages: ["case-studies"],
    selector: "#case-content",
    moduleName: "Case Studies",
    dashboardHref: "/admin/case-studies",
    reason:
      "Industry deployment case studies and performance metrics are dynamically managed in Dashboard -> Case Studies.",
  },
  {
    id: "certificates-grid",
    pages: ["certificates"],
    selector: "#certificates-grid",
    moduleName: "Certificates",
    dashboardHref: "/admin/certificates",
    reason:
      "ISO, HACCP, GMP, LEED, and regulatory accreditations are dynamically managed in Dashboard -> Certificates.",
  },
  {
    id: "sustainability-cms",
    pages: ["sustainability"],
    selector:
      "#hero, #sustainability-intro, #sustainability-highlights, #environmental-practices-section, #sustainability-pillars",
    moduleName: "Sustainability Page",
    dashboardHref: "/admin/sustainability",
    reason:
      "All Sustainability sections (Hero, Intro, Highlights, Environmental Practices, Natural Resources & Vision Pillars) are dynamically managed in Dashboard -> Sustainability Page.",
  },
  {
    id: "tv-news-cms",
    pages: ["tv-news"],
    selector: "#tv-news-hero, #tv-news-grid",
    moduleName: "TV News Videos",
    dashboardHref: "/admin/tv-news",
    reason:
      "All YouTube broadcast embeds, video titles, channels & TV News hero banner are dynamically managed in Dashboard -> TV News Videos.",
  },
  {
    id: "careers-job-board",
    pages: ["careers"],
    selector: "#open-positions",
    moduleName: "Careers & Jobs",
    dashboardHref: "/admin/careers",
    reason:
      "Open job vacancies, responsibilities, and hiring workflows are dynamically managed in Dashboard -> Careers & Jobs.",
  },
  {
    id: "global-navbar",
    pages: "*",
    selector: "header",
    moduleName: "Navigation Menus",
    dashboardHref: "/admin/navigation",
    reason:
      "Top navigation links, dropdown menus, and header actions are managed globally in Dashboard -> Navigation Menus.",
  },
  {
    id: "global-footer",
    pages: "*",
    selector: "footer, #footer",
    moduleName: "Footer Management",
    dashboardHref: "/admin/footer",
    reason:
      "Global footer columns, links, company address, and copyright text are managed in Dashboard -> Footer Management.",
  },
];

function ruleAppliesToPage(rule: LockedSectionRule, pageKey: string): boolean {
  if (rule.pages === "*") return true;
  return rule.pages.includes(pageKey);
}

/**
 * Given any DOM element, returns the matching Lock Rule and its locked container element
 * if it resides inside a Dashboard-managed dynamic section.
 */
export function findLockedSectionRule(
  el: HTMLElement | null,
  pageKey: string
): { rule: LockedSectionRule; container: HTMLElement } | null {
  if (!el) return null;

  for (const rule of LOCKED_SECTION_RULES) {
    if (!ruleAppliesToPage(rule, pageKey)) continue;
    try {
      const container = el.closest(rule.selector) as HTMLElement | null;
      if (container) {
        return { rule, container };
      }
    } catch {
      // ignore invalid selector edge cases
    }
  }

  return null;
}

/**
 * Quick boolean guard used when applying or persisting Page Builder DOM overrides.
 */
export function isElementInLockedSection(
  el: HTMLElement | null,
  pageKey: string
): boolean {
  return findLockedSectionRule(el, pageKey) !== null;
}

/**
 * Resolves a Navigator section selector to its lock rule (if locked on that page).
 */
export function getSectionLockInfo(
  sectionSelector: string,
  pageKey: string
): LockedSectionRule | null {
  const normalized = sectionSelector.trim();
  for (const rule of LOCKED_SECTION_RULES) {
    if (!ruleAppliesToPage(rule, pageKey)) continue;
    const ruleSelectors = rule.selector.split(",").map((s) => s.trim());
    if (
      ruleSelectors.some(
        (rs) => normalized === rs || normalized.startsWith(`${rs} `) || normalized.startsWith(`${rs}>`)
      )
    ) {
      return rule;
    }
  }
  return null;
}

