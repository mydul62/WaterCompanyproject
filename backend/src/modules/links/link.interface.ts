export interface LinkFilterQuery {
  category?: string;
  search?: string;
}

export interface LinkCreatePayload {
  title: string;
  slug?: string;
  destinationUrl: string;
  target?: string;
  category?: string;
  notes?: string;
  isActive?: boolean;
}

export interface LinkUpdatePayload extends Partial<LinkCreatePayload> {}

