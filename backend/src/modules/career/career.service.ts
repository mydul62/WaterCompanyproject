import { prisma } from "../../config/prisma";
import { ApiError } from "../../utils/apiError";
import { DEFAULT_CAREER_JOBS } from "../../data/cmsDefaults";
import {
  CrudServiceContract,
  parseJsonValue,
  serializeJsonValue,
  toBoolean,
  toInt,
} from "../../utils/contentHelpers";

let jobsSeededOnce = false;

function serializeJob(row: any) {
  return {
    id: row.id,
    title: row.title,
    department: row.department,
    facility: row.facility,
    location: row.location,
    type: row.type,
    experience: row.experience,
    summary: row.summary,
    responsibilities: parseJsonValue<string[]>(row.responsibilities, []),
    requirements: parseJsonValue<string[]>(row.requirements, []),
    benefits: parseJsonValue<string[]>(row.benefits, []),
    badgeColor: row.badgeColor || "bg-blue-50 text-blue-700 border-blue-200",
    isActive: row.isActive ?? true,
    order: row.order ?? 0,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
  };
}

function serializeApplication(row: any) {
  return {
    id: row.id,
    jobId: row.jobId || undefined,
    name: row.name,
    email: row.email,
    phone: row.phone,
    position: row.position,
    experience: row.experience,
    currentCompany: row.currentCompany || undefined,
    facility: row.facility,
    portfolioUrl: row.portfolioUrl || undefined,
    resumeUrl: row.resumeUrl || undefined,
    coverNote: row.coverNote || undefined,
    status: row.status,
    date: row.createdAt ? new Date(row.createdAt).toISOString().slice(0, 10) : "",
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
  };
}

function normalizeJobPayload(payload: any, existing?: any) {
  return {
    title: String(payload.title ?? existing?.title ?? "").trim(),
    department: String(payload.department ?? existing?.department ?? "Quality Assurance").trim(),
    facility: String(payload.facility ?? existing?.facility ?? "Kaliakoir Plant, Latifpur-B").trim(),
    location: String(payload.location ?? existing?.location ?? "Kaliakoir-1750, Gazipur").trim(),
    type: String(payload.type ?? existing?.type ?? "Full-Time").trim(),
    experience: String(payload.experience ?? existing?.experience ?? "2 - 5 Years").trim(),
    summary: String(payload.summary ?? existing?.summary ?? "").trim(),
    responsibilities:
      payload.responsibilities !== undefined
        ? serializeJsonValue(payload.responsibilities, [])
        : existing?.responsibilities ?? "[]",
    requirements:
      payload.requirements !== undefined
        ? serializeJsonValue(payload.requirements, [])
        : existing?.requirements ?? "[]",
    benefits:
      payload.benefits !== undefined
        ? serializeJsonValue(payload.benefits, [])
        : existing?.benefits ?? "[]",
    badgeColor: String(
      payload.badgeColor ??
        existing?.badgeColor ??
        "bg-blue-50 text-blue-700 border-blue-200"
    ).trim(),
    isActive:
      payload.isActive !== undefined
        ? toBoolean(payload.isActive, true)
        : existing?.isActive ?? true,
    order:
      payload.order !== undefined
        ? toInt(payload.order, 0)
        : existing?.order ?? 0,
  };
}

export class CareerJobServiceImpl implements CrudServiceContract {
  private async ensureSeededIfEmpty() {
    if (jobsSeededOnce) return;
    jobsSeededOnce = true;
    const count = await prisma.careerJob.count();
    if (count === 0) {
      for (const job of DEFAULT_CAREER_JOBS) {
        await prisma.careerJob.create({ data: job });
      }
    }
  }

  async getAll(includeInactive = false) {
    await this.ensureSeededIfEmpty();
    const rows = await prisma.careerJob.findMany({
      where: includeInactive ? undefined : { isActive: true },
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    });
    return rows.map(serializeJob);
  }

  async getById(id: string) {
    const row = await prisma.careerJob.findUnique({ where: { id } });
    if (!row) throw new ApiError(404, "Job opening not found.");
    return serializeJob(row);
  }

  async create(payload: any) {
    if (!payload.title || !payload.department) {
      throw new ApiError(400, "Job title and department are required.");
    }
    const total = await prisma.careerJob.count();
    const data = normalizeJobPayload({ ...payload, order: payload.order ?? total + 1 });
    const created = await prisma.careerJob.create({ data });
    return serializeJob(created);
  }

  async update(id: string, payload: any) {
    const existing = await prisma.careerJob.findUnique({ where: { id } });
    if (!existing) throw new ApiError(404, "Job opening not found.");
    const data = normalizeJobPayload(payload, existing);
    const updated = await prisma.careerJob.update({ where: { id }, data });
    return serializeJob(updated);
  }

  async delete(id: string) {
    const existing = await prisma.careerJob.findUnique({ where: { id } });
    if (!existing) throw new ApiError(404, "Job opening not found.");
    return prisma.careerJob.delete({ where: { id } });
  }

  async resetDefaults() {
    await prisma.$transaction([
      prisma.careerJob.deleteMany({}),
      ...DEFAULT_CAREER_JOBS.map((job) => prisma.careerJob.create({ data: job })),
    ]);
    return this.getAll(true);
  }
}

export const CareerJobService = new CareerJobServiceImpl();

export class CareerService {
  static async getAll() {
    const rows = await prisma.careerApplication.findMany({
      orderBy: { createdAt: "desc" },
    });
    return rows.map(serializeApplication);
  }

  static async getById(id: string) {
    const row = await prisma.careerApplication.findUnique({ where: { id } });
    if (!row) {
      throw new ApiError(404, "Candidate application not found.");
    }
    return serializeApplication(row);
  }

  static async create(payload: any) {
    if (!payload.name || !payload.email || !payload.position) {
      throw new ApiError(400, "Name, email, and position are required.");
    }

    const created = await prisma.careerApplication.create({
      data: {
        jobId: payload.jobId || null,
        name: String(payload.name).trim(),
        email: String(payload.email).trim(),
        phone: String(payload.phone || "Not Provided").trim(),
        position: String(payload.position).trim(),
        experience: String(payload.experience || "1-3 Years").trim(),
        currentCompany: payload.currentCompany ? String(payload.currentCompany).trim() : null,
        facility: String(payload.facility || "Kaliakoir Plant").trim(),
        portfolioUrl: payload.portfolioUrl ? String(payload.portfolioUrl).trim() : null,
        resumeUrl: payload.resumeUrl ? String(payload.resumeUrl).trim() : null,
        coverNote: payload.coverNote ? String(payload.coverNote).trim() : null,
        status: "New",
      },
    });
    return serializeApplication(created);
  }

  static async updateStatus(id: string, status: string) {
    const existing = await prisma.careerApplication.findUnique({ where: { id } });
    if (!existing) {
      throw new ApiError(404, "Candidate application not found.");
    }
    const updated = await prisma.careerApplication.update({
      where: { id },
      data: { status: String(status || "New").trim() },
    });
    return serializeApplication(updated);
  }

  static async delete(id: string) {
    const existing = await prisma.careerApplication.findUnique({ where: { id } });
    if (!existing) {
      throw new ApiError(404, "Candidate application not found.");
    }
    return prisma.careerApplication.delete({ where: { id } });
  }
}
