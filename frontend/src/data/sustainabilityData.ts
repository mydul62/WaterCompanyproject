export interface HighlightSegment {
  text: string;
  emphasize?: boolean;
}

export interface SustainabilityHighlight {
  id: string;
  segments: HighlightSegment[];
  description: string;
  defaultExpanded?: boolean;
}

export interface EnvironmentalPractice {
  id: string;
  titleTop: string;
  titleBottom: string;
  fullTitle: string;
  icon: string;
  description: string;
}

export interface SustainabilityPillar {
  id: string;
  barLabel: string;
  description: string;
  metrics: string[];
}

export const SUSTAINABILITY_ASSETS = {
  heroBuilding: "/images/sustainability/hero-building.jpg",
  leafTextFill: "/images/sustainability/leaf-text-fill.jpg",
  darkStoneBg: "/images/sustainability/dark-stone-bg.jpg",
  foliageBanner: "/images/sustainability/building-foliage-banner.jpg",
} as const;

export const SUSTAINABILITY_HIGHLIGHTS: SustainabilityHighlight[] = [
  {
    id: "net-positive",
    segments: [
      { text: "Net " },
      { text: "+ve", emphasize: true },
      { text: " building image" },
    ],
    description:
      "Sustainability is described as the key for the survival of a building in this age, and our main purpose regarding sustainability is to create a net positive (+ve) building image. The energy savings from centralized utilities directly support this goal.",
    defaultExpanded: true,
  },
  {
    id: "fifth-ir",
    segments: [
      { text: "5th", emphasize: true },
      { text: " Industrial revolutionary Factory" },
    ],
    description:
      "Engineered around 5th Industrial Revolution principles at our Kaliakoir campus, pairing high-speed SCADA energy monitoring with human-centric biophilic architecture and low-impact polymer manufacturing.",
  },
  {
    id: "open-land",
    segments: [
      { text: "40%", emphasize: true },
      { text: " Open Land" },
    ],
    description:
      "At least 40% of our campus footprint is preserved as permeable green open space, native plantation corridors, and rainwater recharge zones to minimize heat island effects and replenish natural groundwater.",
  },
  {
    id: "sustainable-greater",
    segments: [
      { text: "Sustainable and " },
      { text: ">Greater", emphasize: true },
    ],
    description:
      "We go beyond minimum baseline targets by maintaining closed-loop cooling towers, virgin food-grade resin lightweighting, and zero-liquid-discharge (ZLD) utilities that continuously outpace regional standards.",
  },
  {
    id: "energy-savings",
    segments: [
      { text: "Save " },
      { text: "30 to 40%", emphasize: true },
      { text: " energy" },
    ],
    description:
      "Centralized chillers, variable frequency drives (VFDs), LED daylight harvesting, and waste-heat recovery trim facility power intensity by 30% to 40% compared with conventional molding plants.",
  },
  {
    id: "air-change-rate",
    segments: [
      { text: "Air change rate of " },
      { text: "2 to 3", emphasize: true },
      { text: " times per minute" },
    ],
    description:
      "High-efficiency ventilation delivers 2 to 3 fresh filtered air changes per minute across cleanroom production zones, ensuring low CO2 levels, thermal comfort, and superior occupational wellness.",
  },
];

export const ENVIRONMENTAL_PRACTICES: EnvironmentalPractice[] = [
  {
    id: "pioneering-innovation",
    titleTop: "Pioneering",
    titleBottom: "Innovation",
    fullTitle: "Pioneering Innovation",
    icon: "/images/sustainability/icon-innovation.png",
    description:
      "We consistently exceed LEED Platinum standards by adopting advanced green strategies that set new industry benchmarks. Our initiatives include waste-to-energy technologies, smart building controls, and advanced materials that surpass typical sustainability requirements. These actions reflect our commitment to continuous improvement and environmental leadership. By integrating new technologies and best practices, we position our factory as a model for sustainable manufacturing, showing that innovation and responsibility go hand in hand.",
  },
  {
    id: "interior-environmental-harmony",
    titleTop: "Interior Environmental",
    titleBottom: "Harmony",
    fullTitle: "Interior Environmental Harmony",
    icon: "/images/sustainability/icon-iaq.png",
    description:
      "Indoor Air Quality (IAQ) is engineered into every bay of our Kaliakoir plant. Multi-stage filtration, low-VOC architectural coatings, continuous particulate and CO2 monitoring, and natural daylighting create a clean, healthy, and productive atmosphere across our Class 100k cleanrooms and administrative spaces.",
  },
  {
    id: "green-building-elements",
    titleTop: "Green Building",
    titleBottom: "Elements",
    fullTitle: "Green Building Elements",
    icon: "/images/sustainability/icon-green-building.png",
    description:
      "From thermally insulated precast facades and living vertical greenery to regionally sourced low-carbon cement and recycled steel reinforcement, our plant minimizes embodied carbon throughout its lifecycle while closing material loops with 100% recyclable HDPE, PET, and PP recovery.",
  },
  {
    id: "sustainable-energy-environment",
    titleTop: "Sustainable Energy &",
    titleBottom: "Environment",
    fullTitle: "Sustainable Energy & Environment",
    icon: "/images/sustainability/icon-energy.png",
    description:
      "Rooftop solar photovoltaics, centralized high-efficiency chilled-water loops, rainwater harvesting cisterns, and closed-loop process cooling slash freshwater draw and grid fossil dependency—cutting operational emissions year over year.",
  },
  {
    id: "connectivity-routes",
    titleTop: "Connectivity,",
    titleBottom: "Routes",
    fullTitle: "Connectivity, Routes",
    icon: "/images/sustainability/icon-connectivity.png",
    description:
      "Thoughtful site planning in Latifpur-B, Kaliakoir integrates pedestrian walkways, staff shuttle drop-offs, covered bicycle racks, and consolidated freight loading bays—reducing commuter tailpipe emissions and streamlining regional distribution routes.",
  },
  {
    id: "environmentally-harmonized-location",
    titleTop: "Environmentally",
    titleBottom: "Harmonized Location",
    fullTitle: "Environmentally Harmonized Location",
    icon: "/images/sustainability/icon-location.png",
    description:
      "Our campus preserves native topsoil, restores local flora across 40% open landscaped land, captures stormwater runoff on site, and protects nearby ecosystems through noise attenuation, zero untreated effluent, and clean energy generation.",
  },
];

export const SUSTAINABILITY_PILLARS: SustainabilityPillar[] = [
  {
    id: "solution-optimization",
    barLabel: "Solution: Optimization & Performance Leadership",
    description:
      "Noor Plastic Industries combines high-precision CNC mold tooling, servo-driven blow molding, and real-time utility telemetry to eliminate polymer scrap and reduce kWh per thousand containers produced—delivering leaner, lighter, stronger packaging without sacrificing barrier integrity.",
    metrics: [
      "30–40% Lower Utility Energy Intensity",
      "Closed-Loop Cooling Water Recovery",
      "Precision CNC Tooling & Lightweighting",
    ],
  },
  {
    id: "vision-benchmark",
    barLabel: "Vision: The Sustainable Manufacturing Benchmark",
    description:
      "Guided by USGBC LEED Platinum architecture and ISO-aligned environmental stewardship, our vision is to pioneer net-positive industrial packaging in Bangladesh—proving that pharmaceutical-grade cleanrooms and heavy commercial containers operate in harmony with nature.",
    metrics: [
      "Net-Positive (+ve) Campus Roadmap",
      "100% Recyclable Food & Pharma Polymers",
      "5th Industrial Revolution Biophilic Design",
    ],
  },
  {
    id: "impact-stakeholder",
    barLabel: "Impact: Holistic Stakeholder Value",
    description:
      "Our sustainability investments create measurable shared value: healthier workspaces with 2–3 fresh air changes per minute for our engineers and operators, verified ESG supply-chain compliance for our pharmaceutical and FMCG partners, and cleaner air and water for our Kaliakoir community.",
    metrics: [
      "40% Permeable Green Open Land Preserved",
      "2–3 Clean Air Changes Per Minute",
      "ESG-Ready Supply Chain Traceability",
    ],
  },
];

export interface SustainabilityHeroContent {
  title: string;
  subtitle: string;
  scrollLabel: string;
  image: string;
}

export interface SustainabilityIntroContent {
  heading: string;
  description: string;
  leafTextureImage: string;
  showLeedSeal: boolean;
}

export interface SustainabilityPageContent {
  hero: SustainabilityHeroContent;
  intro: SustainabilityIntroContent;
  highlightsBgImage: string;
  highlights: SustainabilityHighlight[];
  practicesSectionTitle: string;
  practicesSectionSubtitle: string;
  practices: EnvironmentalPractice[];
  naturalResourcesHeading: string;
  naturalResourcesImage: string;
  visionHeading: string;
  pillars: SustainabilityPillar[];
}

export const SUSTAINABILITY_SETTING_KEY = "sustainability_content";
export const SUSTAINABILITY_LOCAL_CACHE_KEY = "waterweb_sustainability_content_v1";
export const SUSTAINABILITY_UPDATED_EVENT = "waterweb:sustainability-updated";

export const DEFAULT_SUSTAINABILITY_CONTENT: SustainabilityPageContent = {
  hero: {
    title: "Sustainability",
    subtitle: "Noor Plastic Industries • LEED Platinum Vision",
    scrollLabel: "Explore",
    image: SUSTAINABILITY_ASSETS.heroBuilding,
  },
  intro: {
    heading:
      "Taking steps towards better future for ourselves and for the planet.\nWe cultivate ways of working that add up to reduce the impact of our business on the environment everyday.",
    description:
      "Sustainable building is a comprehensive approach that encompasses seven essential areas, starting with thoughtful site selection that encourages walking and public transit and minimizes the immediate environmental impact on the site through managing runoff and heat. Additionally, it necessitates the careful use of materials, emphasizing low-waste construction and the sustainability of buildings in the long run.",
    leafTextureImage: SUSTAINABILITY_ASSETS.leafTextFill,
    showLeedSeal: true,
  },
  highlightsBgImage: SUSTAINABILITY_ASSETS.darkStoneBg,
  highlights: SUSTAINABILITY_HIGHLIGHTS,
  practicesSectionTitle: "Packaging the Future, sustainably....",
  practicesSectionSubtitle:
    "Select any practice below to explore how our Kaliakoir plant operates",
  practices: ENVIRONMENTAL_PRACTICES,
  naturalResourcesHeading: "Powering the Future\nwith\nNatural Resources",
  naturalResourcesImage: SUSTAINABILITY_ASSETS.foliageBanner,
  visionHeading: "Sustainability Vision for Noor Plastic Industries",
  pillars: SUSTAINABILITY_PILLARS,
};

export function cloneDefaultSustainabilityContent(): SustainabilityPageContent {
  return JSON.parse(JSON.stringify(DEFAULT_SUSTAINABILITY_CONTENT)) as SustainabilityPageContent;
}

function normalizeHighlight(
  item: Partial<SustainabilityHighlight>,
  idx: number
): SustainabilityHighlight {
  const segments =
    Array.isArray(item.segments) && item.segments.length > 0
      ? item.segments
          .filter((s) => s && typeof s.text === "string")
          .map((s) => ({ text: s.text, emphasize: Boolean(s.emphasize) }))
      : [{ text: "Metric Highlight", emphasize: true }];

  return {
    id: item.id || `highlight-${idx + 1}`,
    segments,
    description: typeof item.description === "string" ? item.description : "",
    defaultExpanded: Boolean(item.defaultExpanded),
  };
}

function normalizePractice(
  item: Partial<EnvironmentalPractice>,
  idx: number
): EnvironmentalPractice {
  const titleTop = typeof item.titleTop === "string" ? item.titleTop : "Sustainability";
  const titleBottom = typeof item.titleBottom === "string" ? item.titleBottom : "Practice";
  return {
    id: item.id || `practice-${idx + 1}`,
    titleTop,
    titleBottom,
    fullTitle:
      typeof item.fullTitle === "string" && item.fullTitle.trim()
        ? item.fullTitle
        : `${titleTop} ${titleBottom}`.trim(),
    icon:
      typeof item.icon === "string" && item.icon.trim()
        ? item.icon
        : "/images/sustainability/icon-innovation.png",
    description: typeof item.description === "string" ? item.description : "",
  };
}

function normalizePillar(item: Partial<SustainabilityPillar>, idx: number): SustainabilityPillar {
  return {
    id: item.id || `pillar-${idx + 1}`,
    barLabel: typeof item.barLabel === "string" ? item.barLabel : `Vision Pillar ${idx + 1}`,
    description: typeof item.description === "string" ? item.description : "",
    metrics: Array.isArray(item.metrics)
      ? item.metrics.filter((m): m is string => typeof m === "string" && m.trim().length > 0)
      : [],
  };
}

export function parseSustainabilityContent(raw?: string | null): SustainabilityPageContent {
  const fallback = cloneDefaultSustainabilityContent();
  if (!raw || typeof raw !== "string") return fallback;

  try {
    const parsed = JSON.parse(raw) as Partial<SustainabilityPageContent>;
    if (!parsed || typeof parsed !== "object") return fallback;

    return {
      hero: {
        title: parsed.hero?.title ?? fallback.hero.title,
        subtitle: parsed.hero?.subtitle ?? fallback.hero.subtitle,
        scrollLabel: parsed.hero?.scrollLabel ?? fallback.hero.scrollLabel,
        image: parsed.hero?.image || fallback.hero.image,
      },
      intro: {
        heading: parsed.intro?.heading ?? fallback.intro.heading,
        description: parsed.intro?.description ?? fallback.intro.description,
        leafTextureImage:
          parsed.intro?.leafTextureImage || fallback.intro.leafTextureImage,
        showLeedSeal:
          typeof parsed.intro?.showLeedSeal === "boolean"
            ? parsed.intro.showLeedSeal
            : fallback.intro.showLeedSeal,
      },
      highlightsBgImage: parsed.highlightsBgImage || fallback.highlightsBgImage,
      highlights:
        Array.isArray(parsed.highlights) && parsed.highlights.length > 0
          ? parsed.highlights.map(normalizeHighlight)
          : fallback.highlights,
      practicesSectionTitle:
        parsed.practicesSectionTitle ?? fallback.practicesSectionTitle,
      practicesSectionSubtitle:
        parsed.practicesSectionSubtitle ?? fallback.practicesSectionSubtitle,
      practices:
        Array.isArray(parsed.practices) && parsed.practices.length > 0
          ? parsed.practices.map(normalizePractice)
          : fallback.practices,
      naturalResourcesHeading:
        parsed.naturalResourcesHeading ?? fallback.naturalResourcesHeading,
      naturalResourcesImage:
        parsed.naturalResourcesImage || fallback.naturalResourcesImage,
      visionHeading: parsed.visionHeading ?? fallback.visionHeading,
      pillars:
        Array.isArray(parsed.pillars) && parsed.pillars.length > 0
          ? parsed.pillars.map(normalizePillar)
          : fallback.pillars,
    };
  } catch {
    return fallback;
  }
}
