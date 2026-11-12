export interface CaseStudyQuotePayload {
  text?: string;
  author?: string;
  role?: string;
}

export interface CaseStudyPayload {
  client: string;
  title: string;
  slug?: string;
  industry?: string;
  subtitle?: string;
  coverImage?: string;
  stats?: unknown;
  challenge?: string;
  solution?: string;
  results?: unknown;
  specs?: unknown;
  quote?: CaseStudyQuotePayload | string;
  quoteText?: string;
  quoteAuthor?: string;
  quoteRole?: string;
  sortOrder?: number | string;
  isActive?: boolean | string;
}

export interface CaseStudyUpdatePayload extends Partial<CaseStudyPayload> {}

