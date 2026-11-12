export interface BannerSlidePayload {
  num?: string;
  line1?: string;
  line2?: string;
  line3?: string;
  lines?: [string, string?, string?];
  title?: string;
  description?: string;
  tagline?: string;
  readMoreLabel?: string;
  readMoreHref?: string;
  watchVideoLabel?: string;
  watchVideoSub?: string;
  videoUrl?: string;
  showOfferBadge?: boolean;
  offerEyebrow1?: string;
  offerEyebrow2?: string;
  offerPrice?: string;
  offerUnit?: string;
  visualLayout?: "duo" | "trio" | "custom" | string;
  foregroundImage?: string;
  secondaryImage?: string;
  platformImage?: string;
  backgroundImage?: string;
  sortOrder?: number;
  order?: number;
  isActive?: boolean;
}

export interface ReorderBannerSlidesPayload {
  orderedIds: string[];
}

