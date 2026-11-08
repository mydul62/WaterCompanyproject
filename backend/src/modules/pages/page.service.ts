import { prisma } from "../../config/prisma";
import { ApiError } from "../../utils/apiError";

export interface SectionPayload {
  id?: string;
  sectionType: string;
  name: string;
  order: number;
  isVisible: boolean;
  settings: string | object;
  content: string | object;
}

export class PageService {
  static async getAll() {
    return prisma.page.findMany({
      orderBy: { updatedAt: "desc" },
      include: {
        _count: {
          select: { sections: true, revisions: true },
        },
      },
    });
  }

  static async getBySlug(slug: string) {
    const page = await prisma.page.findUnique({
      where: { slug },
      include: {
        sections: {
          where: { isVisible: true },
          orderBy: { order: "asc" },
        },
      },
    });

    if (!page) {
      throw new ApiError(404, `Page with slug '${slug}' not found.`);
    }

    return page;
  }

  static async getEditorData(id: string) {
    const page = await prisma.page.findUnique({
      where: { id },
      include: {
        sections: {
          orderBy: { order: "asc" },
        },
        revisions: {
          orderBy: { createdAt: "desc" },
          take: 10,
        },
      },
    });

    if (!page) {
      throw new ApiError(404, "Page not found.");
    }

    return page;
  }

  static async createPage(payload: {
    title: string;
    slug: string;
    description?: string;
    template?: string;
  }) {
    if (!payload.title || !payload.slug) {
      throw new ApiError(400, "Page title and slug are required.");
    }

    const cleanSlug = payload.slug.toLowerCase().trim().replace(/[^a-z0-9-]/g, "-");

    const existing = await prisma.page.findUnique({ where: { slug: cleanSlug } });
    if (existing) {
      throw new ApiError(409, `Page slug '${cleanSlug}' already exists.`);
    }

    const newPage = await prisma.page.create({
      data: {
        title: payload.title,
        slug: cleanSlug,
        description: payload.description,
        template: payload.template || "default",
        status: "DRAFT",
      },
    });

    // Add default Hero section
    await prisma.pageSection.create({
      data: {
        pageId: newPage.id,
        sectionType: "hero",
        name: `${payload.title} Hero Section`,
        order: 1,
        isVisible: true,
        settings: JSON.stringify({ background: "#0f172a", minHeight: "60vh" }),
        content: JSON.stringify({
          title: payload.title,
          subtitle: payload.description || "Welcome to this page.",
        }),
      },
    });

    return this.getEditorData(newPage.id);
  }

  static async updatePage(id: string, payload: any) {
    const existing = await prisma.page.findUnique({ where: { id } });
    if (!existing) throw new ApiError(404, "Page not found.");

    if (payload.slug && payload.slug !== existing.slug) {
      const cleanSlug = payload.slug.toLowerCase().trim().replace(/[^a-z0-9-]/g, "-");
      const clash = await prisma.page.findUnique({ where: { slug: cleanSlug } });
      if (clash && clash.id !== id) {
        throw new ApiError(409, `Page slug '${cleanSlug}' is already taken.`);
      }
      payload.slug = cleanSlug;
    }

    return prisma.page.update({
      where: { id },
      data: {
        title: payload.title ?? existing.title,
        slug: payload.slug ?? existing.slug,
        description: payload.description ?? existing.description,
        status: payload.status ?? existing.status,
        template: payload.template ?? existing.template,
        seoTitle: payload.seoTitle ?? existing.seoTitle,
        seoDescription: payload.seoDescription ?? existing.seoDescription,
        seoKeywords: payload.seoKeywords ?? existing.seoKeywords,
        ogImage: payload.ogImage ?? existing.ogImage,
      },
    });
  }

  static async saveSections(pageId: string, sections: SectionPayload[]) {
    const page = await prisma.page.findUnique({ where: { id: pageId } });
    if (!page) throw new ApiError(404, "Page not found.");

    // Delete existing sections not present in current payload
    const incomingIds = sections.filter((s) => s.id).map((s) => s.id as string);
    await prisma.pageSection.deleteMany({
      where: {
        pageId,
        id: { notIn: incomingIds },
      },
    });

    // Upsert sections
    for (let i = 0; i < sections.length; i++) {
      const sec = sections[i];
      const settingsStr = typeof sec.settings === "object" ? JSON.stringify(sec.settings) : sec.settings || "{}";
      const contentStr = typeof sec.content === "object" ? JSON.stringify(sec.content) : sec.content || "{}";

      if (sec.id && !sec.id.startsWith("temp-")) {
        await prisma.pageSection.upsert({
          where: { id: sec.id },
          update: {
            name: sec.name,
            sectionType: sec.sectionType,
            order: i + 1,
            isVisible: sec.isVisible !== false,
            settings: settingsStr,
            content: contentStr,
          },
          create: {
            id: sec.id,
            pageId,
            name: sec.name,
            sectionType: sec.sectionType,
            order: i + 1,
            isVisible: sec.isVisible !== false,
            settings: settingsStr,
            content: contentStr,
          },
        });
      } else {
        await prisma.pageSection.create({
          data: {
            pageId,
            name: sec.name || `Section ${i + 1}`,
            sectionType: sec.sectionType || "custom",
            order: i + 1,
            isVisible: sec.isVisible !== false,
            settings: settingsStr,
            content: contentStr,
          },
        });
      }
    }

    // Touch page update timestamp
    await prisma.page.update({
      where: { id: pageId },
      data: { updatedAt: new Date() },
    });

    return this.getEditorData(pageId);
  }

  static async publishPage(id: string, notes?: string, author?: string) {
    const page = await this.getEditorData(id);

    // Count revisions
    const revisionCount = await prisma.pageRevision.count({ where: { pageId: id } });

    // Create snapshot
    await prisma.pageRevision.create({
      data: {
        pageId: id,
        versionNumber: revisionCount + 1,
        title: `v${revisionCount + 1} - Published Snapshot`,
        notes: notes || "Published via Visual Page Builder",
        createdBy: author || "Admin",
        snapshot: JSON.stringify(page),
      },
    });

    // Update page to PUBLISHED
    const updated = await prisma.page.update({
      where: { id },
      data: {
        status: "PUBLISHED",
        publishedAt: new Date(),
      },
    });

    return updated;
  }

  static async getRevisions(pageId: string) {
    return prisma.pageRevision.findMany({
      where: { pageId },
      orderBy: { createdAt: "desc" },
    });
  }

  static async restoreRevision(pageId: string, revisionId: string) {
    const rev = await prisma.pageRevision.findUnique({
      where: { id: revisionId },
    });
    if (!rev || rev.pageId !== pageId) {
      throw new ApiError(404, "Revision snapshot not found.");
    }

    const snapshot = JSON.parse(rev.snapshot);
    if (!snapshot || !Array.isArray(snapshot.sections)) {
      throw new ApiError(400, "Corrupted revision snapshot.");
    }

    // Replace sections from snapshot
    await prisma.pageSection.deleteMany({ where: { pageId } });
    for (const sec of snapshot.sections) {
      await prisma.pageSection.create({
        data: {
          pageId,
          sectionType: sec.sectionType,
          name: sec.name,
          order: sec.order,
          isVisible: sec.isVisible,
          settings: typeof sec.settings === "object" ? JSON.stringify(sec.settings) : sec.settings,
          content: typeof sec.content === "object" ? JSON.stringify(sec.content) : sec.content,
        },
      });
    }

    return this.getEditorData(pageId);
  }

  static async deletePage(id: string) {
    return prisma.page.delete({ where: { id } });
  }
}

