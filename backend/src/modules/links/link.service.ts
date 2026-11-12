import { prisma } from "../../config/prisma";
import { ApiError } from "../../utils/apiError";
import { LinkCreatePayload, LinkUpdatePayload } from "./link.interface";

export class LinkService {
  static async getAll(category?: string, search?: string) {
    const where: any = {};
    if (category && category !== "all") where.category = category;
    if (search) {
      where.OR = [
        { title: { contains: search } },
        { slug: { contains: search } },
        { destinationUrl: { contains: search } },
      ];
    }
    return prisma.linkItem.findMany({
      where,
      orderBy: { updatedAt: "desc" },
    });
  }

  static async createLink(payload: LinkCreatePayload) {
    if (!payload.title || !payload.destinationUrl) {
      throw new ApiError(400, "Title and Destination URL are required.");
    }

    const slug =
      payload.slug?.toLowerCase().trim().replace(/[^a-z0-9-]/g, "-") ||
      payload.title.toLowerCase().trim().replace(/[^a-z0-9-]/g, "-");

    const existing = await prisma.linkItem.findUnique({ where: { slug } });
    if (existing) {
      throw new ApiError(409, `Link slug '${slug}' already exists.`);
    }

    return prisma.linkItem.create({
      data: {
        title: payload.title,
        slug,
        destinationUrl: payload.destinationUrl,
        target: payload.target || "_self",
        category: payload.category || "GENERAL",
        notes: payload.notes,
        isActive: true,
      },
    });
  }

  static async updateLink(id: string, payload: LinkUpdatePayload) {
    const existing = await prisma.linkItem.findUnique({ where: { id } });
    if (!existing) throw new ApiError(404, "Link not found.");

    if (payload.slug && payload.slug !== existing.slug) {
      const cleanSlug = payload.slug.toLowerCase().trim().replace(/[^a-z0-9-]/g, "-");
      const clash = await prisma.linkItem.findUnique({ where: { slug: cleanSlug } });
      if (clash && clash.id !== id) {
        throw new ApiError(409, `Link slug '${cleanSlug}' already in use.`);
      }
      payload.slug = cleanSlug;
    }

    return prisma.linkItem.update({
      where: { id },
      data: payload,
    });
  }

  static async trackClick(slug: string) {
    const link = await prisma.linkItem.findUnique({ where: { slug } });
    if (!link) return null;
    return prisma.linkItem.update({
      where: { id: link.id },
      data: { clickCount: link.clickCount + 1 },
    });
  }

  static async deleteLink(id: string) {
    return prisma.linkItem.delete({ where: { id } });
  }
}

