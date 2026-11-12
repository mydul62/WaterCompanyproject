export interface CareerJobPayload {
  title: string;
  department: string;
  location?: string;
  type?: string;
  experience?: string;
  description?: string;
  responsibilities?: string[] | string;
  requirements?: string[] | string;
  isActive?: boolean | string;
  sortOrder?: number | string;
}

export interface CareerJobUpdatePayload extends Partial<CareerJobPayload> {}

export interface CareerApplicationPayload {
  name: string;
  email: string;
  phone?: string;
  position: string;
  department?: string;
  experience?: string;
  resumeUrl?: string;
  coverLetter?: string;
}

export interface CareerApplicationFilter {
  status?: string;
  department?: string;
  search?: string;
}

export interface UpdateCareerApplicationStatusPayload {
  status: string;
  notes?: string;
}

