export interface CategoryCreatePayload {
  name: string;
  slug?: string;
  description?: string | null;
  material?: string;
  order?: number;
  image?: string | null;
  isActive?: boolean;
}

export interface CategoryUpdatePayload extends Partial<CategoryCreatePayload> {}

