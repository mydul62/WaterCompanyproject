import type { CatalogProduct } from "@/data/catalogData";

const MATERIAL_LABELS: Record<string, string> = {
  HDPE_PLASTIC: "HDPE Plastic",
  PP_PLASTIC: "Polypropylene (PP)",
  PET_PLASTIC: "PET Plastic",
  LDPE_PLASTIC: "LDPE Plastic",
  TINPLATE: "Tinplate Metal",
  ALUMINUM: "Aluminum",
  STEEL: "Industrial Steel",
};

export function parseJsonArray(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.map((item) => String(item).trim()).filter(Boolean);
  }
  if (typeof value === "string") {
    const trimmed = value.trim();
    if (!trimmed) return [];
    if (trimmed.startsWith("[")) {
      try {
        const parsed = JSON.parse(trimmed);
        if (Array.isArray(parsed)) {
          return parsed.map((item) => String(item).trim()).filter(Boolean);
        }
      } catch {
        // Fall through to delimiter split
      }
    }
    return trimmed
      .split(/\r?\n|,/)
      .map((s) => s.trim())
      .filter(Boolean);
  }
  return [];
}

export function parseJsonObject(value: unknown): Record<string, string> {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    const out: Record<string, string> = {};
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      if (v !== undefined && v !== null && String(v).trim() !== "") {
        out[k] = String(v).trim();
      }
    }
    return out;
  }
  if (typeof value === "string") {
    const trimmed = value.trim();
    if (trimmed.startsWith("{")) {
      try {
        const parsed = JSON.parse(trimmed);
        if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
          return parseJsonObject(parsed);
        }
      } catch {
        return {};
      }
    }
  }
  return {};
}

export function formatMaterialLabel(raw?: string | null): string {
  if (!raw) return "Industrial Grade";
  const key = raw.trim().toUpperCase();
  if (MATERIAL_LABELS[key]) return MATERIAL_LABELS[key];
  return raw.replace(/_/g, " ");
}

export function detectProductGenre(raw: any): "Plastic" | "Metal" {
  const haystack = [
    raw?.material,
    raw?.category?.material,
    raw?.category?.slug,
    raw?.category?.name,
    raw?.name,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  if (/(tin|tinplate|metal|aerosol|alum|steel|can\b)/.test(haystack)) {
    return "Metal";
  }
  return "Plastic";
}

function normalizeShape(rawShape?: string): CatalogProduct["shape"] {
  const s = (rawShape || "").trim().toLowerCase();
  if (s === "square") return "Square";
  if (s === "oblong") return "Oblong";
  if (s === "oval") return "Oval";
  if (s === "rectangular") return "Rectangular";
  return "Circular";
}

export interface NormalizedProduct extends CatalogProduct {
  sku?: string;
  isFeatured: boolean;
  isActive: boolean;
  categoryId?: string;
  categorySlug?: string;
  featuresList: string[];
  applicationsList: string[];
  specsMap: Record<string, string>;
}

export function normalizeApiProduct(raw: any): NormalizedProduct {
  const specsMap = parseJsonObject(raw?.specifications ?? raw?.specs);
  const featuresList = parseJsonArray(raw?.features);
  const applicationsList = parseJsonArray(raw?.applications);
  const galleryParsed = parseJsonArray(raw?.galleryUrls ?? raw?.images);
  const primaryImage = String(raw?.imageUrl || galleryParsed[0] || "").trim();

  const gallery = Array.from(
    new Set([primaryImage, ...galleryParsed].filter(Boolean))
  );

  const specEntries = Object.entries(specsMap).map(
    ([k, v]) => `${k.replace(/([A-Z])/g, " $1").trim()}: ${v}`
  );
  const specificationText =
    raw?.specification ||
    [...featuresList, ...specEntries].filter(Boolean).join(" • ") ||
    undefined;

  const usageText =
    raw?.usage ||
    (applicationsList.length > 0 ? applicationsList.join(", ") : undefined);

  return {
    id: String(raw?.id || raw?.slug || ""),
    slug: String(raw?.slug || raw?.id || ""),
    sku: raw?.sku ? String(raw.sku) : undefined,
    name: String(raw?.name || "Industrial Container"),
    description: String(raw?.description || ""),
    specification: specificationText,
    usage: usageText,
    image: primaryImage,
    gallery,
    factory: (raw?.factory || "Noor Plastic Industries") as CatalogProduct["factory"],
    genre: detectProductGenre(raw),
    subCategory: String(raw?.category?.name || raw?.subCategory || "Industrial Packaging"),
    shape: normalizeShape(specsMap.shape || raw?.shape),
    material: formatMaterialLabel(raw?.material),
    capacity: String(specsMap.capacity || raw?.capacityRange || raw?.capacity || "Custom"),
    isFeatured: Boolean(raw?.isFeatured),
    isActive: raw?.isActive !== false,
    categoryId: raw?.categoryId ? String(raw.categoryId) : undefined,
    categorySlug: raw?.category?.slug ? String(raw.category.slug) : undefined,
    featuresList,
    applicationsList,
    specsMap,
  };
}

