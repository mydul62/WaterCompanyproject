import { ApiError } from "../../utils/apiError";

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

let rfqStore: RFQItem[] = [
  {
    id: "RFQ-2026-XCL-8841",
    companyName: "Berger Paints Bangladesh Ltd.",
    contactPerson: "Engr. Shamimur Rahman",
    email: "shamim.rahman@bergerbd.com",
    phone: "+880 1711-234567",
    category: "Q Pail Industrial Buckets",
    volume: "120,000 units/year",
    capacity: "20 Liters & 4 Liters",
    status: "New Inquiry",
    notes: "Requires UN certification for export-grade solvent-based emulsion paint.",
    createdAt: "2026-11-04T14:30:00.000Z",
  },
  {
    id: "RFQ-2026-XCL-8839",
    companyName: "Square Pharmaceuticals Ltd.",
    contactPerson: "Dr. Farhana Yasmin",
    email: "f.yasmin@squarepharma.com.bd",
    phone: "+880 1819-876543",
    category: "Pharma Droppers & Jars",
    volume: "250,000 units/year",
    capacity: "10ml Calibrated Dropper",
    status: "Technical Review",
    notes: "Cleanroom Class 100,000 protocol required.",
    createdAt: "2026-11-04T11:15:00.000Z",
  },
  {
    id: "RFQ-2026-XCL-8835",
    companyName: "Akij Food & Beverage Ltd.",
    contactPerson: "Zahid Hasan",
    email: "zahid.hasan@akij.net",
    phone: "+880 1912-345678",
    category: "PET Beverage Bottles",
    volume: "500,000 units/year",
    capacity: "500ml Crystal PET",
    status: "Sample Dispatched",
    notes: "Sample batch of 50 preforms sent via Gazipur express courier.",
    createdAt: "2026-11-03T16:45:00.000Z",
  },
  {
    id: "RFQ-2026-XCL-8828",
    companyName: "Dulux / AkzoNobel Bangladesh",
    contactPerson: "Kamrul Islam",
    email: "kamrul.islam@akzonobel.com",
    phone: "+880 1680-112233",
    category: "Tin Cans & Aerosols",
    volume: "80,000 units/year",
    capacity: "1 Liter Paint Tin",
    status: "Quotation Sent",
    notes: "Price breakdown provided.",
    createdAt: "2026-11-02T10:20:00.000Z",
  },
];

export class RFQService {
  static async getAll(query: {
    status?: string;
    search?: string;
    page?: number;
    limit?: number;
  } = {}) {
    let list = [...rfqStore];

    if (query.status && query.status !== "all" && query.status !== "ALL") {
      list = list.filter((r) => r.status.toLowerCase() === query.status?.toLowerCase());
    }

    if (query.search) {
      const q = query.search.toLowerCase();
      list = list.filter(
        (r) =>
          r.companyName.toLowerCase().includes(q) ||
          r.contactPerson.toLowerCase().includes(q) ||
          r.id.toLowerCase().includes(q) ||
          r.email.toLowerCase().includes(q)
      );
    }

    const total = list.length;
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 50;
    const totalPages = Math.ceil(total / limit) || 1;
    const startIndex = (page - 1) * limit;
    const paginated = list.slice(startIndex, startIndex + limit);

    return {
      rfqs: paginated,
      meta: {
        page,
        limit,
        total,
        totalPages,
      },
    };
  }

  static async getById(id: string) {
    const item = rfqStore.find((r) => r.id === id);
    if (!item) {
      throw new ApiError(404, "RFQ record not found.");
    }
    return item;
  }

  static async create(payload: Partial<RFQItem>) {
    if (!payload.companyName || !payload.email || !payload.phone) {
      throw new ApiError(400, "Company name, email, and phone number are required.");
    }

    const quoteNumber = `RFQ-2026-XCL-${Math.floor(1000 + Math.random() * 9000)}`;
    const newRfq: RFQItem = {
      id: quoteNumber,
      companyName: payload.companyName,
      contactPerson: payload.contactPerson || payload.companyName,
      email: payload.email,
      phone: payload.phone,
      category: payload.category || "General Packaging",
      volume: payload.volume || "Standard Production Batch",
      capacity: payload.capacity || "Standard",
      status: "New Inquiry",
      notes: payload.notes || "",
      createdAt: new Date().toISOString(),
    };

    rfqStore.unshift(newRfq);
    return newRfq;
  }

  static async updateStatus(id: string, status: string) {
    const item = await this.getById(id);
    item.status = status;
    return item;
  }

  static async delete(id: string) {
    const index = rfqStore.findIndex((r) => r.id === id);
    if (index === -1) {
      throw new ApiError(404, "RFQ record not found.");
    }
    return rfqStore.splice(index, 1)[0];
  }
}
