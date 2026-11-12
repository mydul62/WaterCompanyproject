export interface BlogAuthorPayload {
  name?: string;
  role?: string;
  avatar?: string;
}

export interface BlogSectionItem {
  heading?: string;
  body?: string;
  title?: string;
  content?: string;
  paragraphs?: string[];
  bullets?: string[];
}

export interface BlogContentPayload {
  intro?: string;
  sections?: BlogSectionItem[];
  quote?: string;
  conclusion?: string;
}

export interface BlogPostPayload {
  title: string;
  slug?: string;
  excerpt?: string;
  category?: string;
  author?: BlogAuthorPayload | string;
  authorName?: string;
  authorRole?: string;
  authorAvatar?: string;
  date?: string;
  dateLabel?: string;
  content?: BlogContentPayload | string;
  intro?: string;
  sections?: BlogSectionItem[] | string;
  quote?: string;
  conclusion?: string;
  image?: string;
  tags?: string[] | string;
  featured?: boolean | string;
  sortOrder?: number | string;
  isActive?: boolean | string;
}

export interface BlogPostUpdatePayload extends Partial<BlogPostPayload> {}

