export interface RFQItem {
  id: string;
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  category: string;
  volume: string;
  capacity?: string;
  status: string;
  notes?: string;
  createdAt: string;
}

export interface RFQFilterQuery {
  status?: string;
  search?: string;
  page?: number;
  limit?: number;
}

export interface CreateRFQPayload {
  companyName?: string;
  contactPerson?: string;
  name?: string;
  email: string;
  phone?: string;
  category?: string;
  subject?: string;
  volume?: string;
  capacity?: string;
  notes?: string;
  message?: string;
}

export interface UpdateRFQStatusPayload {
  status: string;
}

