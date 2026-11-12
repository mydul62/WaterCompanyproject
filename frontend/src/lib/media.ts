export interface NormalizedMediaAsset {
  id: string;
  title: string;
  url: string;
  altText?: string;
  category: string;
  size?: number;
  width?: number | null;
  height?: number | null;
  mimeType?: string;
  createdAt?: string;
  filename?: string;
  originalName?: string;
  folder?: string;
}

export const MEDIA_CATEGORIES = [
  "ALL",
  "GENERAL",
  "PRODUCTS",
  "HERO",
  "FACTORY",
  "STORY",
  "CERTIFICATES",
  "CLIENT_LOGOS",
] as const;

const KNOWN_CATEGORY_SET = new Set<string>(
  MEDIA_CATEGORIES.filter((cat) => cat !== "ALL")
);

export function normalizeMediaAsset(raw: Record<string, any>): NormalizedMediaAsset {
  const filename = typeof raw?.filename === "string" ? raw.filename : "";
  const originalName = typeof raw?.originalName === "string" ? raw.originalName : "";
  const url = typeof raw?.url === "string" ? raw.url : "";
  const altText = typeof raw?.altText === "string" ? raw.altText : undefined;

  const title =
    (typeof raw?.title === "string" && raw.title.trim()) ||
    originalName.trim() ||
    filename.trim() ||
    altText?.trim() ||
    url.split("/").pop() ||
    "Untitled Media";

  const rawCategory = (
    (typeof raw?.category === "string" && raw.category) ||
    (typeof raw?.folder === "string" && raw.folder) ||
    ""
  )
    .trim()
    .toUpperCase();

  let category = "GENERAL";
  if (KNOWN_CATEGORY_SET.has(rawCategory)) {
    category = rawCategory;
  } else if (rawCategory === "TOOL-ROOM") {
    category = "FACTORY";
  } else {
    const haystack = `${title} ${url} ${altText || ""}`.toLowerCase();
    if (haystack.includes("logo") || haystack.includes("berger") || haystack.includes("brand")) {
      category = haystack.includes("hero") ? "HERO" : "CLIENT_LOGOS";
    } else if (haystack.includes("hero") || haystack.includes("banner") || haystack.includes("slider")) {
      category = "HERO";
    } else if (haystack.includes("certificate") || haystack.includes("award") || haystack.includes("leed")) {
      category = "CERTIFICATES";
    } else if (
      haystack.includes("product") ||
      haystack.includes("bottle") ||
      haystack.includes("pail") ||
      haystack.includes("drum")
    ) {
      category = "PRODUCTS";
    } else if (
      haystack.includes("factory") ||
      haystack.includes("plant") ||
      haystack.includes("office") ||
      haystack.includes("tool-room")
    ) {
      category = "FACTORY";
    }
  }

  return {
    id: String(raw?.id || url || title),
    title,
    url,
    altText,
    category,
    size: typeof raw?.size === "number" ? raw.size : undefined,
    width: typeof raw?.width === "number" ? raw.width : null,
    height: typeof raw?.height === "number" ? raw.height : null,
    mimeType: typeof raw?.mimeType === "string" ? raw.mimeType : undefined,
    createdAt: typeof raw?.createdAt === "string" ? raw.createdAt : undefined,
    filename,
    originalName,
    folder: typeof raw?.folder === "string" ? raw.folder : undefined,
  };
}

export function filterMediaAssets(
  assets: Array<NormalizedMediaAsset | Record<string, any>>,
  searchQuery: string,
  selectedCategory: string
): NormalizedMediaAsset[] {
  const query = searchQuery.trim().toLowerCase();
  const targetCategory = (selectedCategory || "ALL").toUpperCase();

  return assets
    .map((raw) =>
      raw?.title && raw?.category
        ? (raw as NormalizedMediaAsset)
        : normalizeMediaAsset(raw || {})
    )
    .filter((asset) => {
      const matchesSearch =
        !query ||
        asset.title.toLowerCase().includes(query) ||
        (asset.altText || "").toLowerCase().includes(query) ||
        (asset.url || "").toLowerCase().includes(query);
      const matchesCategory =
        targetCategory === "ALL" || asset.category.toUpperCase() === targetCategory;
      return matchesSearch && matchesCategory;
    });
}
