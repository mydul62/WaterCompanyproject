export interface ProductFilterParams {
  category?: string;
  material?: string;
  isFeatured?: boolean | string;
  search?: string;
  sort?: string;
}

export interface ProductCreatePayload {
  name: string;
  slug?: string;
  sku?: string;
  description?: string;
  categoryId?: string;
  category?: string;
  material?: string;
  capacityRange?: string;
  neckSize?: string | null;
  factory?: string;
  applications?: string[] | string;
  features?: string[] | string;
  specifications?: Record<string, unknown> | string;
  imageUrl?: string;
  image?: string;
  galleryUrls?: string[] | string;
  tdsPdfUrl?: string | null;
  isFeatured?: boolean;
  isActive?: boolean;
  order?: number;
  seoTitle?: string | null;
  seoDescription?: string | null;
}

export interface ProductUpdatePayload extends Partial<ProductCreatePayload> {}

