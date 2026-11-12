import { prisma } from "../../config/prisma";
import { ApiError } from "../../utils/apiError";
import {
  CreatePagePayload,
  PublishPageOptions,
  ReorderSectionItem,
  SaveDraftPayload,
  SectionPayload,
  UpdatePagePayload,
} from "./page.interface";

export type { SectionPayload };

export class PageService {
  static async findPage(idOrSlug: string) {
    if (!idOrSlug) return null;
    let page = await prisma.page.findUnique({ where: { id: idOrSlug } });
    if (!page) {
      const cleanSlug =
        idOrSlug === "/" || idOrSlug === "" || idOrSlug === "index"
          ? "home"
          : idOrSlug.toLowerCase().trim().replace(/^\/+/, "");
      page = await prisma.page.findUnique({ where: { slug: cleanSlug } });
    }
    if (!page) {
      page = await prisma.page.findFirst({
        where: {
          OR: [
            { slug: idOrSlug },
            { slug: idOrSlug.replace(/^\/+/, "") },
            { id: idOrSlug },
          ],
        },
      });
    }
    return page;
  }

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

  static async getBySlug(rawSlug: string) {
    const slug =
      !rawSlug || rawSlug === "/" || rawSlug === "index"
        ? "home"
        : rawSlug.toLowerCase().trim().replace(/^\/+/, "");

    let page = await prisma.page.findUnique({
      where: { slug },
      include: {
        sections: {
          where: { isVisible: true },
          orderBy: { order: "asc" },
        },
      },
    });

    if (!page) {
      page = await prisma.page.findFirst({
        where: {
          OR: [
            { slug: slug },
            { slug: `/${slug}` },
            { slug: slug.replace(/-/g, "") },
          ],
        },
        include: {
          sections: {
            where: { isVisible: true },
            orderBy: { order: "asc" },
          },
        },
      });
    }

    if (!page) {
      throw new ApiError(404, `Page with slug '${rawSlug}' not found.`);
    }

    return page;
  }

  static async getEditorData(idOrSlug: string) {
    const existing = await this.findPage(idOrSlug);
    if (!existing) {
      throw new ApiError(404, `Page '${idOrSlug}' not found.`);
    }

    const page = await prisma.page.findUnique({
      where: { id: existing.id },
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

  static async createPage(payload: CreatePagePayload) {
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
        draftContent: "{}",
        publishedContent: "{}",
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

  static async updatePage(idOrSlug: string, payload: UpdatePagePayload) {
    const existing = await this.findPage(idOrSlug);
    if (!existing) throw new ApiError(404, "Page not found.");

    if (payload.slug && payload.slug !== existing.slug) {
      const cleanSlug = payload.slug.toLowerCase().trim().replace(/[^a-z0-9-]/g, "-");
      const clash = await prisma.page.findUnique({ where: { slug: cleanSlug } });
      if (clash && clash.id !== existing.id) {
        throw new ApiError(409, `Page slug '${cleanSlug}' is already taken.`);
      }
      payload.slug = cleanSlug;
    }

    const updateData: any = {
      title: payload.title ?? existing.title,
      slug: payload.slug ?? existing.slug,
      description: payload.description ?? existing.description,
      status: payload.status ?? existing.status,
      template: payload.template ?? existing.template,
      seoTitle: payload.seoTitle ?? existing.seoTitle,
      seoDescription: payload.seoDescription ?? existing.seoDescription,
      seoKeywords: payload.seoKeywords ?? existing.seoKeywords,
      ogImage: payload.ogImage ?? existing.ogImage,
    };

    if (payload.draftContent !== undefined) {
      updateData.draftContent =
        typeof payload.draftContent === "object"
          ? JSON.stringify(payload.draftContent)
          : payload.draftContent;
    }

    if (payload.publishedContent !== undefined) {
      updateData.publishedContent =
        typeof payload.publishedContent === "object"
          ? JSON.stringify(payload.publishedContent)
          : payload.publishedContent;
    }

    if (payload.status === "PUBLISHED" && !payload.publishedContent && payload.draftContent) {
      updateData.publishedContent = updateData.draftContent;
      updateData.publishedAt = new Date();
    }

    await prisma.page.update({
      where: { id: existing.id },
      data: updateData,
    });

    if (payload.sections && Array.isArray(payload.sections)) {
      await this.saveSections(existing.id, payload.sections);
    }

    return this.getEditorData(existing.id);
  }

  static async saveDraft(idOrSlug: string, payload: SaveDraftPayload) {
    const existing = await this.findPage(idOrSlug);
    if (!existing) throw new ApiError(404, "Page not found.");

    const updateData: any = {
      updatedAt: new Date(),
    };

    if (payload.draftContent !== undefined) {
      updateData.draftContent =
        typeof payload.draftContent === "object"
          ? JSON.stringify(payload.draftContent)
          : payload.draftContent;
    } else if (payload.overrides !== undefined) {
      updateData.draftContent =
        typeof payload.overrides === "object"
          ? JSON.stringify(payload.overrides)
          : payload.overrides;
    } else if (payload.sections && !Array.isArray(payload.sections)) {
      updateData.draftContent = JSON.stringify(payload.sections);
    }

    if (payload.sections && Array.isArray(payload.sections)) {
      await this.saveSections(existing.id, payload.sections);
    }

    await prisma.page.update({
      where: { id: existing.id },
      data: updateData,
    });

    return this.getEditorData(existing.id);
  }

  static async saveSections(idOrSlug: string, sections: SectionPayload[]) {
    const existing = await this.findPage(idOrSlug);
    if (!existing) throw new ApiError(404, "Page not found.");
    const pageId = existing.id;

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

  static async reorderSections(idOrSlug: string, sectionOrders: ReorderSectionItem[]) {
    const existing = await this.findPage(idOrSlug);
    if (!existing) throw new ApiError(404, "Page not found.");
    const pageId = existing.id;

    for (const item of sectionOrders) {
      if (item.id) {
        await prisma.pageSection.updateMany({
          where: { id: item.id, pageId },
          data: { order: item.sortOrder },
        });
      }
    }
    return this.getEditorData(pageId);
  }

  static async publishPage(idOrSlug: string, options?: PublishPageOptions) {
    const existing = await this.findPage(idOrSlug);
    if (!existing) throw new ApiError(404, "Page not found.");
    const id = existing.id;

    const updateData: any = {
      status: "PUBLISHED",
      publishedAt: new Date(),
    };

    if (options?.publishedContent !== undefined) {
      const pubStr =
        typeof options.publishedContent === "object"
          ? JSON.stringify(options.publishedContent)
          : options.publishedContent;
      updateData.publishedContent = pubStr;
      updateData.draftContent = pubStr;
    } else if (existing.draftContent && existing.draftContent !== "{}") {
      updateData.publishedContent = existing.draftContent;
    }

    if (options?.draftContent !== undefined) {
      updateData.draftContent =
        typeof options.draftContent === "object"
          ? JSON.stringify(options.draftContent)
          : options.draftContent;
    }

    await prisma.page.update({
      where: { id },
      data: updateData,
    });

    const pageWithData = await this.getEditorData(id);

    // Count revisions
    const revisionCount = await prisma.pageRevision.count({ where: { pageId: id } });

    // Create snapshot
    await prisma.pageRevision.create({
      data: {
        pageId: id,
        versionNumber: revisionCount + 1,
        title: `v${revisionCount + 1} - Published Snapshot`,
        notes: options?.notes || "Published via Visual Page Builder",
        createdBy: options?.author || "Admin",
        snapshot: JSON.stringify(pageWithData),
      },
    });

    return pageWithData;
  }

  static async createRevision(idOrSlug: string, note?: string, author?: string) {
    const existing = await this.findPage(idOrSlug);
    if (!existing) throw new ApiError(404, "Page not found.");
    const pageId = existing.id;

    const pageWithData = await this.getEditorData(pageId);
    const revisionCount = await prisma.pageRevision.count({ where: { pageId } });

    return prisma.pageRevision.create({
      data: {
        pageId,
        versionNumber: revisionCount + 1,
        title: `v${revisionCount + 1} - ${note || "Manual Checkpoint"}`,
        notes: note || "Manual Checkpoint Saved",
        createdBy: author || "Admin",
        snapshot: JSON.stringify(pageWithData),
      },
    });
  }

  static async getRevisions(idOrSlug: string) {
    const existing = await this.findPage(idOrSlug);
    if (!existing) throw new ApiError(404, "Page not found.");
    const pageId = existing.id;

    return prisma.pageRevision.findMany({
      where: { pageId },
      orderBy: { createdAt: "desc" },
    });
  }

  static async restoreRevision(idOrSlug: string, revisionId: string) {
    const existing = await this.findPage(idOrSlug);
    if (!existing) throw new ApiError(404, "Page not found.");
    const pageId = existing.id;

    const rev = await prisma.pageRevision.findUnique({
      where: { id: revisionId },
    });
    if (!rev || rev.pageId !== pageId) {
      throw new ApiError(404, "Revision snapshot not found.");
    }

    const snapshot = JSON.parse(rev.snapshot);
    if (!snapshot) {
      throw new ApiError(400, "Corrupted revision snapshot.");
    }

    // Restore page fields and content
    await prisma.page.update({
      where: { id: pageId },
      data: {
        title: snapshot.title,
        seoTitle: snapshot.seoTitle,
        seoDescription: snapshot.seoDescription,
        draftContent: snapshot.draftContent || snapshot.publishedContent || "{}",
        publishedContent: snapshot.publishedContent || "{}",
      },
    });

    // Replace sections if present in snapshot
    if (Array.isArray(snapshot.sections)) {
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
    }

    return this.getEditorData(pageId);
  }

  static async deletePage(idOrSlug: string) {
    const existing = await this.findPage(idOrSlug);
    if (!existing) throw new ApiError(404, "Page not found.");
    return prisma.page.delete({ where: { id: existing.id } });
  }
}
