import { prisma } from "../../config/prisma";
import { ApiError } from "../../utils/apiError";
import { DEFAULT_CASE_STUDIES } from "../../data/cmsDefaults";
import {
  CrudServiceContract,
  ensureUniqueSlug,
  parseJsonValue,
  serializeJsonValue,
  toBoolean,
  toInt,
} from "../../utils/contentHelpers";

let seededOnce = false;

function serializeCaseStudy(row: any) {
  return {
    id: row.id,
    slug: row.slug,
    client: row.client,
    industry: row.industry,
    title: row.title,
    subtitle: row.subtitle,
    coverImage: row.coverImage,
    stats: parseJsonValue<{ label: string; value: string }[]>(row.stats, []),
    challenge: row.challenge,
    solution: row.solution,
    results: parseJsonValue<string[]>(row.results, []),
    specs: parseJsonValue<{ key: string; value: string }[]>(row.specs, []),
    quote: {
      text: row.quoteText,
      author: row.quoteAuthor,
      role: row.quoteRole,
    },
    sortOrder: row.sortOrder ?? 0,
    isActive: row.isActive ?? true,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
  };
}

function normalizeCaseStudyPayload(payload: any, existing?: any) {
  const quoteText = payload.quote?.text ?? payload.quoteText ?? existing?.quoteText ?? "";
  const quoteAuthor = payload.quote?.author ?? payload.quoteAuthor ?? existing?.quoteAuthor ?? "";
  const quoteRole = payload.quote?.role ?? payload.quoteRole ?? existing?.quoteRole ?? "";

  return {
    client: String(payload.client ?? existing?.client ?? "").trim(),
    industry: String(payload.industry ?? existing?.industry ?? "Paints & Coatings").trim(),
    title: String(payload.title ?? existing?.title ?? "").trim(),
    subtitle: String(payload.subtitle ?? existing?.subtitle ?? "").trim(),
    coverImage: String(payload.coverImage ?? existing?.coverImage ?? "/images/business-banner.jpg").trim(),
    stats:
      payload.stats !== undefined
        ? serializeJsonValue(payload.stats, [])
        : existing?.stats ?? "[]",
    challenge: String(payload.challenge ?? existing?.challenge ?? "").trim(),
    solution: String(payload.solution ?? existing?.solution ?? "").trim(),
    results:
      payload.results !== undefined
        ? serializeJsonValue(payload.results, [])
        : existing?.results ?? "[]",
    specs:
      payload.specs !== undefined
        ? serializeJsonValue(payload.specs, [])
        : existing?.specs ?? "[]",
    quoteText: String(quoteText).trim(),
    quoteAuthor: String(quoteAuthor).trim(),
    quoteRole: String(quoteRole).trim(),
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

export class CaseStudyServiceImpl implements CrudServiceContract {
  private async ensureSeededIfEmpty() {
    if (seededOnce) return;
    seededOnce = true;
    const count = await prisma.caseStudy.count();
    if (count === 0) {
      for (const item of DEFAULT_CASE_STUDIES) {
        await prisma.caseStudy.create({ data: item });
      }
    }
  }

  async getAll(includeInactive = false) {
    await this.ensureSeededIfEmpty();
    const rows = await prisma.caseStudy.findMany({
      where: includeInactive ? undefined : { isActive: true },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    });
    return rows.map(serializeCaseStudy);
  }

  async getById(id: string) {
    const row = await prisma.caseStudy.findUnique({ where: { id } });
    if (!row) throw new ApiError(404, "Case study not found.");
    return serializeCaseStudy(row);
  }

  async getBySlug(slug: string) {
    const row = await prisma.caseStudy.findUnique({ where: { slug } });
    if (!row) throw new ApiError(404, "Case study not found.");
    return serializeCaseStudy(row);
  }

  async create(payload: any) {
    if (!payload.title || !payload.client) {
      throw new ApiError(400, "Client name and case study title are required.");
    }
    const slug = await ensureUniqueSlug(
      payload.slug || `${payload.client}-${payload.title}`,
      (s) => prisma.caseStudy.findUnique({ where: { slug: s }, select: { id: true } })
    );
    const total = await prisma.caseStudy.count();
    const data = normalizeCaseStudyPayload({ ...payload, sortOrder: payload.sortOrder ?? total + 1 });
    const created = await prisma.caseStudy.create({
      data: { ...data, slug },
    });
    return serializeCaseStudy(created);
  }

  async update(id: string, payload: any) {
    const existing = await prisma.caseStudy.findUnique({ where: { id } });
    if (!existing) throw new ApiError(404, "Case study not found.");

    const slug = payload.slug
      ? await ensureUniqueSlug(
          payload.slug,
          (s) => prisma.caseStudy.findUnique({ where: { slug: s }, select: { id: true } }),
          id
        )
      : existing.slug;

    const data = normalizeCaseStudyPayload(payload, existing);
    const updated = await prisma.caseStudy.update({
      where: { id },
      data: { ...data, slug },
    });
    return serializeCaseStudy(updated);
  }

  async delete(id: string) {
    const existing = await prisma.caseStudy.findUnique({ where: { id } });
    if (!existing) throw new ApiError(404, "Case study not found.");
    return prisma.caseStudy.delete({ where: { id } });
  }

  async resetDefaults() {
    await prisma.$transaction([
      prisma.caseStudy.deleteMany({}),
      ...DEFAULT_CASE_STUDIES.map((item) => prisma.caseStudy.create({ data: item })),
    ]);
    return this.getAll(true);
  }
}

export const CaseStudyService = new CaseStudyServiceImpl();

