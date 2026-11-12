export interface SectionPayload {
  id?: string;
  sectionType: string;
  name: string;
  order: number;
  isVisible: boolean;
  settings: string | object;
  content: string | object;
}

export interface CreatePagePayload {
  title: string;
  slug: string;
  description?: string;
  template?: string;
}

export interface UpdatePagePayload {
  title?: string;
  slug?: string;
  description?: string | null;
  status?: string;
  template?: string;
  seoTitle?: string | null;
  seoDescription?: string | null;
  seoKeywords?: string | null;
  ogImage?: string | null;
  draftContent?: unknown;
  publishedContent?: unknown;
  sections?: SectionPayload[];
}

export interface SaveDraftPayload {
  draftContent?: unknown;
  overrides?: unknown;
  sections?: SectionPayload[] | Record<string, unknown>;
}

export interface PublishPageOptions {
  notes?: string;
  author?: string;
  publishedContent?: unknown;
  draftContent?: unknown;
}

export interface ReorderSectionItem {
  id: string;
  sortOrder: number;
}

