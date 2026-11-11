export type HeroVisualLayout = "duo" | "trio" | "custom";

export interface HeroSlide {
  id: string;
  num: string;
  lines: [string, string, string];
  description: string;
  readMoreLabel: string;
  readMoreHref: string;
  watchVideoLabel: string;
  watchVideoSub: string;
  videoUrl: string;
  showOfferBadge: boolean;
  offerEyebrow1: string;
  offerEyebrow2: string;
  offerPrice: string;
  offerUnit: string;
  visualLayout: HeroVisualLayout;
  foregroundImage: string;
  secondaryImage: string;
  platformImage: string;
  backgroundImage: string;
  sortOrder: number;
  isActive: boolean;
}

export const DEFAULT_HERO_BANNERS: HeroSlide[] = [
  {
    id: "slide-1",
    num: "01",
    lines: ["Delivered Right", "To Your Home &", "Office Door."],
    description:
      "Duty obligations of business will frequently occur pleasures be repudiated and annoyances accepted.",
    readMoreLabel: "READ MORE",
    readMoreHref: "/products",
    watchVideoLabel: "WATCH VIDEO",
    watchVideoSub: "Production to Delivery",
    videoUrl: "",
    showOfferBadge: true,
    offerEyebrow1: "Limited",
    offerEyebrow2: "Time Offer",
    offerPrice: "$15.50",
    offerUnit: "Per bottle",
    visualLayout: "duo",
    foregroundImage: "/images/hero/bottle-vertical.png",
    secondaryImage: "/images/hero/bottle-horizontal.png",
    platformImage: "/images/hero/hero-splash-platform.jpg",
    backgroundImage: "/images/hero/hero-bubbles-bg.jpg",
    sortOrder: 1,
    isActive: true,
  },
  {
    id: "slide-2",
    num: "02",
    lines: ["Noor Plastic", "Is Closer Than", "You Think"],
    description:
      "Direct factory plastic container supply, pure water dispenser jugs, and express delivery across Kaliakoir, Gazipur & Dhaka.",
    readMoreLabel: "READ MORE",
    readMoreHref: "/our-business",
    watchVideoLabel: "WATCH VIDEO",
    watchVideoSub: "Production to Delivery",
    videoUrl: "",
    showOfferBadge: true,
    offerEyebrow1: "Limited",
    offerEyebrow2: "Time Offer",
    offerPrice: "$15.50",
    offerUnit: "Per bottle",
    visualLayout: "duo",
    foregroundImage: "/images/hero/bottle-vertical.png",
    secondaryImage: "/images/hero/bottle-horizontal.png",
    platformImage: "/images/hero/hero-splash-platform.jpg",
    backgroundImage: "/images/hero/hero-bubbles-bg.jpg",
    sortOrder: 2,
    isActive: true,
  },
  {
    id: "slide-3",
    num: "03",
    lines: ["100% Pure Water", "Sealed Fresh For", "Every Occasion."],
    description:
      "Precision multi-stage filtration and certified cleanroom bottling engineered for daily home and office hydration.",
    readMoreLabel: "READ MORE",
    readMoreHref: "/certificates",
    watchVideoLabel: "WATCH VIDEO",
    watchVideoSub: "Production to Delivery",
    videoUrl: "",
    showOfferBadge: true,
    offerEyebrow1: "Special",
    offerEyebrow2: "Bulk Offer",
    offerPrice: "$14.00",
    offerUnit: "Per bottle",
    visualLayout: "duo",
    foregroundImage: "/images/hero/bottle-vertical.png",
    secondaryImage: "/images/hero/bottle-horizontal.png",
    platformImage: "/images/hero/hero-splash-platform.jpg",
    backgroundImage: "/images/hero/hero-bubbles-bg.jpg",
    sortOrder: 3,
    isActive: true,
  },
  {
    id: "slide-4",
    num: "04",
    lines: ["Bulk 3-Bottle", "Family & Office", "Water Packs."],
    description:
      "Triple-bottle 5-gallon purified mineral water bundles delivered straight to your home or workplace.",
    readMoreLabel: "READ MORE",
    readMoreHref: "/products",
    watchVideoLabel: "WATCH VIDEO",
    watchVideoSub: "Production to Delivery",
    videoUrl: "",
    showOfferBadge: true,
    offerEyebrow1: "Special",
    offerEyebrow2: "Bulk Offer",
    offerPrice: "$39.00",
    offerUnit: "3 Bottles",
    visualLayout: "trio",
    foregroundImage: "/images/hero/bottles-trio.png",
    secondaryImage: "/images/hero/bottle-horizontal.png",
    platformImage: "/images/hero/hero-splash-platform.jpg",
    backgroundImage: "/images/hero/hero-bubbles-bg.jpg",
    sortOrder: 4,
    isActive: true,
  },
];

export const HERO_PRESET_IMAGES = [
  {
    label: "Standing 5-Gallon Bottle",
    url: "/images/hero/bottle-vertical.png",
    layoutHint: "duo" as HeroVisualLayout,
  },
  {
    label: "Horizontal 5-Gallon Bottle",
    url: "/images/hero/bottle-horizontal.png",
    layoutHint: "duo" as HeroVisualLayout,
  },
  {
    label: "3-Bottle Family Pack Trio",
    url: "/images/hero/bottles-trio.png",
    layoutHint: "trio" as HeroVisualLayout,
  },
  {
    label: "Sky Pure Bottle Banner",
    url: "/images/hero-bottle-sky.jpg",
    layoutHint: "custom" as HeroVisualLayout,
  },
  {
    label: "Water Splash Bottle",
    url: "/images/hero-bottle-splash.jpg",
    layoutHint: "custom" as HeroVisualLayout,
  },
  {
    label: "Water Glass Clean",
    url: "/images/hero-water-glass.jpg",
    layoutHint: "custom" as HeroVisualLayout,
  },
  {
    label: "Catalog Bottle Series",
    url: "/images/catalog/cat-prod-2.png",
    layoutHint: "custom" as HeroVisualLayout,
  },
  {
    label: "Industrial Drum & Container",
    url: "/images/catalog/cat-prod-1.png",
    layoutHint: "custom" as HeroVisualLayout,
  },
];

export const LOCAL_BANNER_STORAGE_KEY = "noor_plastic_hero_banners_local_v1";
export const BANNERS_UPDATED_EVENT = "noor-banners-updated";

export function normalizeHeroSlide(raw: any, index = 0): HeroSlide {
  const layout: HeroVisualLayout =
    raw?.visualLayout === "trio" || raw?.visualLayout === "custom"
      ? raw.visualLayout
      : "duo";

  const line1 = String(raw?.lines?.[0] ?? raw?.line1 ?? "Delivered Right");
  const line2 = String(raw?.lines?.[1] ?? raw?.line2 ?? "");
  const line3 = String(raw?.lines?.[2] ?? raw?.line3 ?? "");

  return {
    id: String(raw?.id || `slide-${index + 1}`),
    num: String(raw?.num || String(index + 1).padStart(2, "0")),
    lines: [line1, line2, line3],
    description: String(raw?.description || ""),
    readMoreLabel: String(raw?.readMoreLabel || "READ MORE"),
    readMoreHref: String(raw?.readMoreHref || "/products"),
    watchVideoLabel: String(raw?.watchVideoLabel || "WATCH VIDEO"),
    watchVideoSub: String(raw?.watchVideoSub || "Production to Delivery"),
    videoUrl: String(raw?.videoUrl || ""),
    showOfferBadge:
      raw?.showOfferBadge !== undefined ? Boolean(raw.showOfferBadge) : true,
    offerEyebrow1: String(raw?.offerEyebrow1 ?? "Limited"),
    offerEyebrow2: String(raw?.offerEyebrow2 ?? "Time Offer"),
    offerPrice: String(raw?.offerPrice ?? "$15.50"),
    offerUnit: String(raw?.offerUnit ?? "Per bottle"),
    visualLayout: layout,
    foregroundImage: String(
      raw?.foregroundImage ||
        (layout === "trio"
          ? "/images/hero/bottles-trio.png"
          : "/images/hero/bottle-vertical.png")
    ),
    secondaryImage: String(
      raw?.secondaryImage || "/images/hero/bottle-horizontal.png"
    ),
    platformImage: String(
      raw?.platformImage || "/images/hero/hero-splash-platform.jpg"
    ),
    backgroundImage: String(
      raw?.backgroundImage || "/images/hero/hero-bubbles-bg.jpg"
    ),
    sortOrder: typeof raw?.sortOrder === "number" ? raw.sortOrder : index + 1,
    isActive: raw?.isActive !== undefined ? Boolean(raw.isActive) : true,
  };
}

export function resolveBannerMediaUrl(url?: string): string {
  const clean = String(url || "").trim();
  if (!clean) return "/images/hero/bottle-vertical.png";
  if (clean.startsWith("/uploads/")) {
    const apiBase =
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";
    const origin = apiBase.replace(/\/api\/v1\/?$/, "");
    return `${origin}${clean}`;
  }
  return clean;
}

export function getLocalBanners(): HeroSlide[] | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(LOCAL_BANNER_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return null;
    return parsed
      .map((item, idx) => normalizeHeroSlide(item, idx))
      .sort((a, b) => a.sortOrder - b.sortOrder);
  } catch {
    return null;
  }
}

export function saveLocalBanners(slides: HeroSlide[]) {
  if (typeof window === "undefined") return;
  try {
    const normalized = slides.map((s, idx) =>
      normalizeHeroSlide(
        {
          ...s,
          sortOrder: idx + 1,
          num: String(idx + 1).padStart(2, "0"),
        },
        idx
      )
    );
    window.localStorage.setItem(
      LOCAL_BANNER_STORAGE_KEY,
      JSON.stringify(normalized)
    );
    window.dispatchEvent(new CustomEvent(BANNERS_UPDATED_EVENT));
  } catch (err) {
    console.warn("Could not write banner local storage:", err);
  }
}

export function clearLocalBanners() {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(LOCAL_BANNER_STORAGE_KEY);
    window.dispatchEvent(new CustomEvent(BANNERS_UPDATED_EVENT));
  } catch {}
}

export function emitBannersUpdated() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(BANNERS_UPDATED_EVENT));
}

