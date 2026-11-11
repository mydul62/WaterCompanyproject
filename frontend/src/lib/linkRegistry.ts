export interface RegisteredLinkItem {
  id?: string;
  slug?: string;
  key?: string;
  title?: string;
  label?: string;
  destinationUrl?: string;
  url?: string;
}

/** Normalize a backend Prisma LinkItem or fallback link entry into unique option fields. */
export function normalizeRegisteredLink(link: RegisteredLinkItem, index: number) {
  const url = link.destinationUrl || link.url || "";
  const title = link.title || link.label || link.slug || link.key || url || `Link ${index + 1}`;
  const optionKey = link.id || link.slug || link.key || `${url || "link"}-${index}`;
  return { optionKey, title, url };
}

