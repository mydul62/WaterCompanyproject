export interface TvNewsVideoItem {
  id: string;
  slug: string;
  title: string;
  youtubeUrl: string;
  videoId: string;
  embedUrl: string;
  thumbnailUrl?: string;
  channel?: string;
  category?: string;
  publishedLabel?: string;
  description?: string;
  sortOrder?: number;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export const TV_NEWS_HERO_IMAGE = "/images/tv-news/tv-news-hero.jpg";

export const TV_NEWS_CATEGORY_OPTIONS = [
  "TV Broadcast",
  "Green Factory",
  "LEED & Sustainability",
  "Factory Documentary",
  "Industrial Growth",
  "Corporate Event",
  "3D & Engineering",
  "R & D Engineering",
  "Quality Assurance",
  "Corporate Profile",
] as const;

/**
 * Extract an 11-character YouTube video ID from any watch URL, share link, shorts link,
 * live link, embed URL, bare video ID, or full <iframe> HTML snippet.
 */
export function extractYouTubeVideoId(rawInput: string): string {
  const raw = String(rawInput || "").trim();
  if (!raw) return "";

  let candidate = raw;
  const iframeSrcMatch = raw.match(/src=["']([^"']+)["']/i);
  if (iframeSrcMatch?.[1]) {
    candidate = iframeSrcMatch[1].trim();
  }

  if (/^[a-zA-Z0-9_-]{11}$/.test(candidate)) {
    return candidate;
  }

  try {
    const normalizedUrl = /^https?:\/\//i.test(candidate)
      ? candidate
      : `https://${candidate.replace(/^\/\//, "")}`;
    const url = new URL(normalizedUrl);
    const host = url.hostname.toLowerCase();

    if (host.includes("youtu.be")) {
      const id = url.pathname.split("/").filter(Boolean)[0] || "";
      if (/^[a-zA-Z0-9_-]{11}$/.test(id)) return id;
    }

    if (host.includes("youtube.com") || host.includes("youtube-nocookie.com")) {
      const vParam = url.searchParams.get("v");
      if (vParam && /^[a-zA-Z0-9_-]{11}$/.test(vParam)) return vParam;

      const segments = url.pathname.split("/").filter(Boolean);
      const markerIdx = segments.findIndex((seg) =>
        ["embed", "shorts", "live", "v"].includes(seg.toLowerCase())
      );
      if (markerIdx !== -1 && segments[markerIdx + 1]) {
        const id = segments[markerIdx + 1];
        if (/^[a-zA-Z0-9_-]{11}$/.test(id)) return id;
      }
    }
  } catch {
    // Fall back to regex extraction
  }

  const fallbackMatch = candidate.match(
    /(?:youtube(?:-nocookie)?\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/|v\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/i
  );
  return fallbackMatch?.[1] || "";
}

export function getYouTubeEmbedUrl(videoId: string, autoplay = false): string {
  if (!videoId) return "";
  const params = autoplay ? "?autoplay=1&rel=0" : "?rel=0";
  return `https://www.youtube.com/embed/${videoId}${params}`;
}

export function getYouTubeThumbnailUrl(
  videoId: string,
  quality: "hq" | "maxres" = "hq"
): string {
  if (!videoId) return "/images/tv-news/tv-news-hero.jpg";
  return quality === "maxres"
    ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
    : `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
}

export function normalizeTvNewsVideo(row: any, idx = 0): TvNewsVideoItem {
  const rawUrl = String(row?.youtubeUrl ?? row?.embedUrl ?? "").trim();
  const extracted =
    (row?.videoId && /^[a-zA-Z0-9_-]{11}$/.test(String(row.videoId))
      ? String(row.videoId)
      : extractYouTubeVideoId(rawUrl)) || "M7lc1UVf-VE";

  return {
    id: String(row?.id || `tv-news-${idx + 1}`),
    slug: String(row?.slug || `tv-news-${idx + 1}`),
    title: String(row?.title || "TV News Feature"),
    youtubeUrl: rawUrl || `https://www.youtube.com/watch?v=${extracted}`,
    videoId: extracted,
    embedUrl: row?.embedUrl || `https://www.youtube.com/embed/${extracted}`,
    thumbnailUrl: String(row?.thumbnailUrl || "").trim(),
    channel: String(row?.channel || "TV News"),
    category: String(row?.category || "TV Broadcast"),
    publishedLabel: String(row?.publishedLabel || ""),
    description: String(row?.description || ""),
    sortOrder: typeof row?.sortOrder === "number" ? row.sortOrder : idx + 1,
    isActive: row?.isActive !== false,
    createdAt: row?.createdAt,
    updatedAt: row?.updatedAt,
  };
}

export const DEFAULT_TV_NEWS_VIDEOS: TvNewsVideoItem[] = [
  {
    id: "tv-1",
    slug: "rooftop-green-farming-noor-plastic-channel-i",
    title: "Roof Top Green Farming & Biophilic Factory Campus - Channel I",
    youtubeUrl: "https://www.youtube.com/watch?v=M7lc1UVf-VE",
    videoId: "M7lc1UVf-VE",
    embedUrl: "https://www.youtube.com/embed/M7lc1UVf-VE",
    thumbnailUrl: "/images/sustainability/hero-building.jpg",
    channel: "Channel I",
    category: "Green Factory",
    publishedLabel: "2025",
    description:
      "Special broadcast coverage highlighting rooftop greenery, rainwater harvesting, and 40% open land conservation at our Kaliakoir campus.",
    sortOrder: 1,
    isActive: true,
  },
  {
    id: "tv-2",
    slug: "leed-platinum-green-manufacturing-independent-tv",
    title:
      "পরিবেশবান্ধব কারখানার জন্য আন্তর্জাতিক গ্রিন সনদ পেল নূর প্লাস্টিক ইন্ডাস্ট্রিজ [LEED Vision] Independent TV",
    youtubeUrl: "https://www.youtube.com/watch?v=M7lc1UVf-VE",
    videoId: "M7lc1UVf-VE",
    embedUrl: "https://www.youtube.com/embed/M7lc1UVf-VE",
    thumbnailUrl: "/images/cert-leed-green.jpg",
    channel: "Independent TV",
    category: "LEED & Sustainability",
    publishedLabel: "2025",
    description:
      "National television report on energy-efficient centralized utilities and net-positive environmental engineering in plastic manufacturing.",
    sortOrder: 2,
    isActive: true,
  },
  {
    id: "tv-3",
    slug: "food-grade-water-jar-cleanroom-production-feature",
    title: "Automated Food-Grade Water Jar & Dispenser Production Report",
    youtubeUrl: "https://www.youtube.com/watch?v=M7lc1UVf-VE",
    videoId: "M7lc1UVf-VE",
    embedUrl: "https://www.youtube.com/embed/M7lc1UVf-VE",
    thumbnailUrl: "/images/business-plant-1.jpg",
    channel: "Channel 24",
    category: "Factory Documentary",
    publishedLabel: "2025",
    description:
      "Inside look at computerized blow-molding, Class 100k hygiene controls, and automated leak inspection lines.",
    sortOrder: 3,
    isActive: true,
  },
  {
    id: "tv-4",
    slug: "gazipur-kaliakoir-industrial-plant-documentary",
    title: "গাজীপুরের কালিয়াকৈরে পরিবেশ-বান্ধব ও আধুনিক প্লাস্টিক প্যাকেজিং প্ল্যান্ট",
    youtubeUrl: "https://www.youtube.com/watch?v=M7lc1UVf-VE",
    videoId: "M7lc1UVf-VE",
    embedUrl: "https://www.youtube.com/embed/M7lc1UVf-VE",
    thumbnailUrl: "/images/business-plant-2.jpg",
    channel: "Somoy TV",
    category: "TV Broadcast",
    publishedLabel: "2025",
    description:
      "Television business spotlight covering automated packaging manufacturing at Latifpur-B, Kaliakoir, Gazipur.",
    sortOrder: 4,
    isActive: true,
  },
  {
    id: "tv-5",
    slug: "industrial-pail-blow-molding-innovation-tv-report",
    title: "পেইন্ট ও লুব্রিকেন্টের ইন্ডাস্ট্রিয়াল পেইল উৎপাদনে দেশীয় সাফল্য",
    youtubeUrl: "https://www.youtube.com/watch?v=M7lc1UVf-VE",
    videoId: "M7lc1UVf-VE",
    embedUrl: "https://www.youtube.com/embed/M7lc1UVf-VE",
    thumbnailUrl: "/images/qpail/qpail-facility.jpg",
    channel: "ATN News",
    category: "Industrial Growth",
    publishedLabel: "2025",
    description:
      "Coverage of precision heavy-duty HDPE/PP industrial pails and tamper-evident closures supplying national FMCG & paint brands.",
    sortOrder: 5,
    isActive: true,
  },
  {
    id: "tv-6",
    slug: "industry-delegation-visit-our-factory-kaliakoir",
    title: "Industry Leaders & Corporate Delegation Visit Our Factory",
    youtubeUrl: "https://www.youtube.com/watch?v=M7lc1UVf-VE",
    videoId: "M7lc1UVf-VE",
    embedUrl: "https://www.youtube.com/embed/M7lc1UVf-VE",
    thumbnailUrl: "/images/business-hero-office.jpg",
    channel: "DBC News",
    category: "Corporate Event",
    publishedLabel: "2025",
    description:
      "Highlights from regulatory and industry partner delegation inspecting quality assurance laboratories and high-speed tooling bays.",
    sortOrder: 6,
    isActive: true,
  },
  {
    id: "tv-7",
    slug: "architecture-3d-design-green-industrial-park",
    title: "Architecture 3D Design — Sustainable Industrial Campus Walkthrough",
    youtubeUrl: "https://www.youtube.com/watch?v=M7lc1UVf-VE",
    videoId: "M7lc1UVf-VE",
    embedUrl: "https://www.youtube.com/embed/M7lc1UVf-VE",
    thumbnailUrl: "/images/sustainability/building-foliage-banner.jpg",
    channel: "Noor Media Studio",
    category: "3D & Engineering",
    publishedLabel: "2025",
    description:
      "3D architectural visualization showcasing vertical foliage shading, natural daylighting, and energy-saving utility blocks.",
    sortOrder: 7,
    isActive: true,
  },
  {
    id: "tv-8",
    slug: "rnd-cad-tooling-precision-mold-laboratory",
    title: "In-House CNC Tool Room & Polymer Barrier Testing Lab Feature",
    youtubeUrl: "https://www.youtube.com/watch?v=M7lc1UVf-VE",
    videoId: "M7lc1UVf-VE",
    embedUrl: "https://www.youtube.com/embed/M7lc1UVf-VE",
    thumbnailUrl: "/images/rnd/rnd-lab-testing.jpg",
    channel: "Ekattor TV",
    category: "R & D Engineering",
    publishedLabel: "2026",
    description:
      "Engineering walkthrough of custom bottle neck finishing, CAD mold design, and drop-impact quality testing.",
    sortOrder: 8,
    isActive: true,
  },
  {
    id: "tv-9",
    slug: "3d-roof-top-gardening-zero-carbon-initiative",
    title: "3D Roof Top Gardening & Net-Positive Cooling Architecture",
    youtubeUrl: "https://www.youtube.com/watch?v=M7lc1UVf-VE",
    videoId: "M7lc1UVf-VE",
    embedUrl: "https://www.youtube.com/embed/M7lc1UVf-VE",
    thumbnailUrl: "/images/rnd/rnd-sustainable-facility.jpg",
    channel: "Green Tech TV",
    category: "LEED & Sustainability",
    publishedLabel: "2026",
    description:
      "Exploring passive solar cooling, rooftop botanical gardens, and 30–40% HVAC energy reduction at our manufacturing plant.",
    sortOrder: 9,
    isActive: true,
  },
  {
    id: "tv-10",
    slug: "noor-plastic-industries-corporate-profile-english",
    title: "Noor Plastic Industries Corporate Documentary (English)",
    youtubeUrl: "https://www.youtube.com/watch?v=M7lc1UVf-VE",
    videoId: "M7lc1UVf-VE",
    embedUrl: "https://www.youtube.com/embed/M7lc1UVf-VE",
    thumbnailUrl: "/images/story-hero-buildings.jpg",
    channel: "Noor Corporate Film",
    category: "Corporate Profile",
    publishedLabel: "2026",
    description:
      "Complete corporate overview of pure water dispenser containers, virgin resin molding, and nationwide B2B logistics.",
    sortOrder: 10,
    isActive: true,
  },
  {
    id: "tv-11",
    slug: "bsti-iso-quality-assurance-water-packaging",
    title: "ISO 9001:2015 & BSTI Food-Grade Packaging Compliance Spotlight",
    youtubeUrl: "https://www.youtube.com/watch?v=M7lc1UVf-VE",
    videoId: "M7lc1UVf-VE",
    embedUrl: "https://www.youtube.com/embed/M7lc1UVf-VE",
    thumbnailUrl: "/images/cert-iso-9001.jpg",
    channel: "Channel I",
    category: "Quality Assurance",
    publishedLabel: "2026",
    description:
      "Verification protocols ensuring BPA-free food-safe PET and polycarbonate containers for drinking water brands.",
    sortOrder: 11,
    isActive: true,
  },
  {
    id: "tv-12",
    slug: "cnc-mold-engineering-rapid-prototyping-tour",
    title: "Custom Bottle CAD Prototyping & Rapid Molding Showcase",
    youtubeUrl: "https://www.youtube.com/watch?v=M7lc1UVf-VE",
    videoId: "M7lc1UVf-VE",
    embedUrl: "https://www.youtube.com/embed/M7lc1UVf-VE",
    thumbnailUrl: "/images/rnd/rnd-cad-design.jpg",
    channel: "Tech & Industry",
    category: "3D & Engineering",
    publishedLabel: "2026",
    description:
      "From CAD concept to hardened steel cavity machining for bespoke beverage and industrial containers.",
    sortOrder: 12,
    isActive: true,
  },
];

