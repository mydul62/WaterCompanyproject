import { prisma } from "../../config/prisma";
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

export class RFQService {
  static async getAll(query: {
    status?: string;
    search?: string;
    page?: number;
    limit?: number;
  } = {}) {
    const where: any = {};

    if (query.status && query.status !== "all" && query.status !== "ALL") {
      where.status = query.status;
    }

    if (query.search) {
      where.OR = [
        { companyName: { contains: query.search } },
        { contactPerson: { contains: query.search } },
        { quoteNumber: { contains: query.search } },
        { email: { contains: query.search } },
      ];
    }

    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 50;
    const skip = (page - 1) * limit;

    const [total, records] = await Promise.all([
      prisma.quoteRequest.count({ where }),
      prisma.quoteRequest.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
    ]);

    const rfqs: RFQItem[] = records.map((r) => ({
      id: r.quoteNumber,
      companyName: r.companyName,
      contactPerson: r.contactPerson,
      email: r.email,
      phone: r.phone,
      category: r.category,
      volume: r.volume,
      capacity: r.capacity || "Standard",
      status: r.status,
      notes: r.notes || "",
      createdAt: r.createdAt.toISOString(),
    }));

    return {
      rfqs,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit) || 1,
      },
    };
  }

  static async getById(idOrQuoteNumber: string) {
    const record = await prisma.quoteRequest.findFirst({
      where: {
        OR: [{ id: idOrQuoteNumber }, { quoteNumber: idOrQuoteNumber }],
      },
    });

    if (!record) {
      throw new ApiError(404, "RFQ record not found.");
    }

    return {
      id: record.quoteNumber,
      companyName: record.companyName,
      contactPerson: record.contactPerson,
      email: record.email,
      phone: record.phone,
      category: record.category,
      volume: record.volume,
      capacity: record.capacity || "Standard",
      status: record.status,
      notes: record.notes || "",
      createdAt: record.createdAt.toISOString(),
    };
  }

  static async create(payload: Partial<RFQItem> & { name?: string; message?: string; subject?: string }) {
    const company = payload.companyName || payload.name || "Enterprise Inquirer";
    const contact = payload.contactPerson || payload.name || company;
    const email = payload.email;
    const phone = payload.phone || "Not provided";

    if (!email) {
      throw new ApiError(400, "Email address is required.");
    }

    const quoteNumber = `RFQ-2026-XCL-${Math.floor(1000 + Math.random() * 9000)}`;

    const created = await prisma.quoteRequest.create({
      data: {
        quoteNumber,
        companyName: company,
        contactPerson: contact,
        email,
        phone,
        category: payload.category || payload.subject || "General Inquiry",
        volume: payload.volume || "Standard Volume",
        capacity: payload.capacity || "Standard",
        notes: payload.notes || payload.message || "",
        status: "PENDING",
      },
    });

    return {
      id: created.quoteNumber,
      companyName: created.companyName,
      contactPerson: created.contactPerson,
      email: created.email,
      phone: created.phone,
      category: created.category,
      volume: created.volume,
      capacity: created.capacity || "Standard",
      status: created.status,
      notes: created.notes || "",
      createdAt: created.createdAt.toISOString(),
    };
  }

  static async updateStatus(idOrQuoteNumber: string, status: string) {
    const existing = await prisma.quoteRequest.findFirst({
      where: {
        OR: [{ id: idOrQuoteNumber }, { quoteNumber: idOrQuoteNumber }],
      },
    });

    if (!existing) {
      throw new ApiError(404, "RFQ record not found.");
    }

    const updated = await prisma.quoteRequest.update({
      where: { id: existing.id },
      data: { status },
    });

    return {
      id: updated.quoteNumber,
      companyName: updated.companyName,
      contactPerson: updated.contactPerson,
      email: updated.email,
      phone: updated.phone,
      category: updated.category,
      volume: updated.volume,
      capacity: updated.capacity || "Standard",
      status: updated.status,
      notes: updated.notes || "",
      createdAt: updated.createdAt.toISOString(),
    };
  }

  static async delete(idOrQuoteNumber: string) {
    const existing = await prisma.quoteRequest.findFirst({
      where: {
        OR: [{ id: idOrQuoteNumber }, { quoteNumber: idOrQuoteNumber }],
      },
    });

    if (!existing) {
      throw new ApiError(404, "RFQ record not found.");
    }

    await prisma.quoteRequest.delete({
      where: { id: existing.id },
    });

    return { success: true };
  }
}
