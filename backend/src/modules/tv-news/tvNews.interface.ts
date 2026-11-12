export interface TvNewsPayload {
  title: string;
  slug?: string;
  youtubeUrl?: string;
  embedUrl?: string;
  thumbnailUrl?: string;
  channel?: string;
  category?: string;
  publishedLabel?: string;
  description?: string;
  sortOrder?: number | string;
  isActive?: boolean | string;
}

export interface TvNewsUpdatePayload extends Partial<TvNewsPayload> {}

