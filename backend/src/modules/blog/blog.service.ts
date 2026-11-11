import { prisma } from "../../config/prisma";
import { ApiError } from "../../utils/apiError";
import { DEFAULT_BLOG_POSTS } from "../../data/cmsDefaults";
import {
  CrudServiceContract,
  ensureUniqueSlug,
  parseJsonValue,
  serializeJsonValue,
  toBoolean,
  toInt,
} from "../../utils/contentHelpers";

let seededOnce = false;

function serializeBlog(row: any) {
  const sections = parseJsonValue<any[]>(row.sections, []);
  const tags = parseJsonValue<string[]>(row.tags, []);
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    category: row.category,
    author: {
      name: row.authorName,
      role: row.authorRole,
      avatar: row.authorAvatar,
    },
    date: row.dateLabel,
    dateLabel: row.dateLabel,
    readTime: row.readTime,
    coverImage: row.coverImage,
    featured: Boolean(row.featured),
    content: {
      intro: row.intro,
      sections,
      quote: row.quote || undefined,
      conclusion: row.conclusion,
    },
    tags,
    sortOrder: row.sortOrder ?? 0,
    isActive: row.isActive ?? true,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
  };
}

function normalizeBlogPayload(payload: any, existing?: any) {
  const authorName =
    payload.author?.name ?? payload.authorName ?? existing?.authorName ?? "Engr. Tanvir Ahmed";
  const authorRole =
    payload.author?.role ?? payload.authorRole ?? existing?.authorRole ?? "Polymer & Packaging R&D";
  const authorAvatar =
    payload.author?.avatar ?? payload.authorAvatar ?? existing?.authorAvatar ?? "/images/rnd/rnd-cad-design.jpg";
  const intro = payload.content?.intro ?? payload.intro ?? existing?.intro ?? "";
  const sectionsSource = payload.content?.sections ?? payload.sections;
  const quote =
    payload.content?.quote !== undefined
      ? payload.content.quote || null
      : payload.quote !== undefined
      ? payload.quote || null
      : existing?.quote ?? null;
  const conclusion =
    payload.content?.conclusion ?? payload.conclusion ?? existing?.conclusion ?? "";

  return {
    title: String(payload.title ?? existing?.title ?? "").trim(),
    excerpt: String(payload.excerpt ?? existing?.excerpt ?? "").trim(),
    category: String(payload.category ?? existing?.category ?? "Sustainability & PCR").trim(),
    authorName: String(authorName).trim(),
    authorRole: String(authorRole).trim(),
    authorAvatar: String(authorAvatar).trim() || "/images/rnd/rnd-cad-design.jpg",
    dateLabel: String(payload.date ?? payload.dateLabel ?? existing?.dateLabel ?? new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })).trim(),
    readTime: String(payload.readTime ?? existing?.readTime ?? "5 min read").trim(),
    coverImage: String(payload.coverImage ?? existing?.coverImage ?? "/images/rnd/rnd-hero-banner.jpg").trim(),
    featured:
      payload.featured !== undefined
        ? toBoolean(payload.featured, false)
        : existing?.featured ?? false,
    intro: String(intro).trim(),
    sections:
      sectionsSource !== undefined
        ? serializeJsonValue(sectionsSource, [])
        : existing?.sections ?? "[]",
    quote,
    conclusion: String(conclusion).trim(),
    tags:
      payload.tags !== undefined
        ? serializeJsonValue(payload.tags, [])
        : existing?.tags ?? "[]",
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

export class BlogServiceImpl implements CrudServiceContract {
  private async ensureSeededIfEmpty() {
    if (seededOnce) return;
    seededOnce = true;
    const count = await prisma.blogPost.count();
    if (count === 0) {
      for (const item of DEFAULT_BLOG_POSTS) {
        await prisma.blogPost.create({ data: item });
      }
    }
  }

  async getAll(includeInactive = false) {
    await this.ensureSeededIfEmpty();
    const rows = await prisma.blogPost.findMany({
      where: includeInactive ? undefined : { isActive: true },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    });
    return rows.map(serializeBlog);
  }

  async getById(id: string) {
    const row = await prisma.blogPost.findUnique({ where: { id } });
    if (!row) throw new ApiError(404, "Blog post not found.");
    return serializeBlog(row);
  }

  async getBySlug(slug: string) {
    const row = await prisma.blogPost.findUnique({ where: { slug } });
    if (!row) throw new ApiError(404, "Blog post not found.");
    return serializeBlog(row);
  }

  async create(payload: any) {
    if (!payload.title) {
      throw new ApiError(400, "Blog post title is required.");
    }
    const slug = await ensureUniqueSlug(
      payload.slug || payload.title,
      (s) => prisma.blogPost.findUnique({ where: { slug: s }, select: { id: true } })
    );
    const total = await prisma.blogPost.count();
    const data = normalizeBlogPayload({ ...payload, sortOrder: payload.sortOrder ?? total + 1 });
    const created = await prisma.blogPost.create({
      data: { ...data, slug },
    });
    return serializeBlog(created);
  }

  async update(id: string, payload: any) {
    const existing = await prisma.blogPost.findUnique({ where: { id } });
    if (!existing) throw new ApiError(404, "Blog post not found.");

    const slug = payload.slug
      ? await ensureUniqueSlug(
          payload.slug,
          (s) => prisma.blogPost.findUnique({ where: { slug: s }, select: { id: true } }),
          id
        )
      : existing.slug;

    const data = normalizeBlogPayload(payload, existing);
    const updated = await prisma.blogPost.update({
      where: { id },
      data: { ...data, slug },
    });
    return serializeBlog(updated);
  }

  async delete(id: string) {
    const existing = await prisma.blogPost.findUnique({ where: { id } });
    if (!existing) throw new ApiError(404, "Blog post not found.");
    return prisma.blogPost.delete({ where: { id } });
  }

  async resetDefaults() {
    await prisma.$transaction([
      prisma.blogPost.deleteMany({}),
      ...DEFAULT_BLOG_POSTS.map((item) => prisma.blogPost.create({ data: item })),
    ]);
    return this.getAll(true);
  }
}

export const BlogService = new BlogServiceImpl();

