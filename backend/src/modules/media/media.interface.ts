export interface UploadedFilePayload {
  filename: string;
  originalname: string;
  mimetype: string;
  size: number;
  path?: string;
}

export interface RegisterUploadedAssetOptions {
  altText?: string;
  category?: string;
  url?: string;
  width?: number | null;
  height?: number | null;
}

export interface MediaAssetFilterQuery {
  search?: string;
  type?: string;
  category?: string;
}

export interface UpdateMediaAssetPayload {
  altText?: string;
  caption?: string;
  category?: string;
}

export interface PressStoryQuotePayload {
  text?: string;
  author?: string;
  role?: string;
}

export interface PressStoryPayload {
  title: string;
  slug?: string;
  newspaper?: string;
  outlet?: string;
  banglaTitle?: string;
  englishTitle?: string;
  outletColor?: string;
  dateLabel?: string;
  date?: string;
  category?: string;
  readTime?: string;
  clippingUrl?: string;
  image?: string;
  summary?: string;
  fullArticle?: string[] | string;
  keyHighlights?: string[] | string;
  quote?: PressStoryQuotePayload;
  highlightQuote?: string;
  quoteAuthor?: string;
  quoteRole?: string;
  originalSourceUrl?: string;
  tag?: string;
  sortOrder?: number | string;
  isActive?: boolean | string;
}

export interface PressStoryUpdatePayload extends Partial<PressStoryPayload> {}

