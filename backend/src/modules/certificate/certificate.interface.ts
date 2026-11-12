export interface CertificatePayload {
  title: string;
  slug?: string;
  code?: string;
  category?: string;
  image?: string;
  aspect?: string;
  bullets?: string[] | string;
  accreditation?: string;
  sortOrder?: number | string;
  isActive?: boolean | string;
}

export interface CertificateUpdatePayload extends Partial<CertificatePayload> {}

