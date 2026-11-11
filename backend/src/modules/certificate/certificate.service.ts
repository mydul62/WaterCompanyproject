import { prisma } from "../../config/prisma";
import { ApiError } from "../../utils/apiError";
import { DEFAULT_CERTIFICATES } from "../../data/cmsDefaults";
import {
  CrudServiceContract,
  ensureUniqueSlug,
  parseJsonValue,
  serializeJsonValue,
  toBoolean,
  toInt,
} from "../../utils/contentHelpers";

let seededOnce = false;

function serializeCertificate(row: any) {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    code: row.code,
    category: row.category,
    image: row.image,
    aspect: (row.aspect || "portrait") as "portrait" | "landscape" | "square",
    bullets: parseJsonValue<string[]>(row.bullets, []),
    accreditation: row.accreditation,
    sortOrder: row.sortOrder ?? 0,
    isActive: row.isActive ?? true,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
  };
}

function normalizeCertificatePayload(payload: any, existing?: any) {
  return {
    title: String(payload.title ?? existing?.title ?? "").trim(),
    code: String(payload.code ?? existing?.code ?? "").trim(),
    category: String(payload.category ?? existing?.category ?? "Quality Management").trim(),
    image: String(payload.image ?? existing?.image ?? "/images/cert-iso-9001.jpg").trim(),
    aspect: String(payload.aspect ?? existing?.aspect ?? "portrait").trim(),
    bullets:
      payload.bullets !== undefined
        ? serializeJsonValue(payload.bullets, [])
        : existing?.bullets ?? "[]",
    accreditation: String(payload.accreditation ?? existing?.accreditation ?? "").trim(),
    sortOrder:
      payload.sortOrder !== undefined
        ? toInt(payload.sortOrder, 0)
        : existing?.sortOrder ?? 0,
    isActive:
      payload.isActive !== undefined
        ? toBoolean(payload.isActive, true)
        : existing?.isActive ?? true,
  };
}

export class CertificateServiceImpl implements CrudServiceContract {
  private async ensureSeededIfEmpty() {
    if (seededOnce) return;
    seededOnce = true;
    const count = await prisma.certificate.count();
    if (count === 0) {
      for (const item of DEFAULT_CERTIFICATES) {
        await prisma.certificate.create({ data: item });
      }
    }
  }

  async getAll(includeInactive = false) {
    await this.ensureSeededIfEmpty();
    const rows = await prisma.certificate.findMany({
      where: includeInactive ? undefined : { isActive: true },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    });
    return rows.map(serializeCertificate);
  }

  async getById(id: string) {
    const row = await prisma.certificate.findUnique({ where: { id } });
    if (!row) throw new ApiError(404, "Certificate not found.");
    return serializeCertificate(row);
  }

  async getBySlug(slug: string) {
    const row = await prisma.certificate.findUnique({ where: { slug } });
    if (!row) throw new ApiError(404, "Certificate not found.");
    return serializeCertificate(row);
  }

  async create(payload: any) {
    if (!payload.title) {
      throw new ApiError(400, "Certificate title is required.");
    }
    const slug = await ensureUniqueSlug(
      payload.slug || payload.title,
      (s) => prisma.certificate.findUnique({ where: { slug: s }, select: { id: true } })
    );
    const total = await prisma.certificate.count();
    const data = normalizeCertificatePayload({ ...payload, sortOrder: payload.sortOrder ?? total + 1 });
    const created = await prisma.certificate.create({
      data: { ...data, slug },
    });
    return serializeCertificate(created);
  }

  async update(id: string, payload: any) {
    const existing = await prisma.certificate.findUnique({ where: { id } });
    if (!existing) throw new ApiError(404, "Certificate not found.");

    const slug = payload.slug
      ? await ensureUniqueSlug(
          payload.slug,
          (s) => prisma.certificate.findUnique({ where: { slug: s }, select: { id: true } }),
          id
        )
      : existing.slug;

    const data = normalizeCertificatePayload(payload, existing);
    const updated = await prisma.certificate.update({
      where: { id },
      data: { ...data, slug },
    });
    return serializeCertificate(updated);
  }

  async delete(id: string) {
    const existing = await prisma.certificate.findUnique({ where: { id } });
    if (!existing) throw new ApiError(404, "Certificate not found.");
    return prisma.certificate.delete({ where: { id } });
  }

  async resetDefaults() {
    await prisma.$transaction([
      prisma.certificate.deleteMany({}),
      ...DEFAULT_CERTIFICATES.map((item) => prisma.certificate.create({ data: item })),
    ]);
    return this.getAll(true);
  }
}

export const CertificateService = new CertificateServiceImpl();

