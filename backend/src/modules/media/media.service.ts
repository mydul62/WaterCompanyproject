import { prisma } from "../../config/prisma";
import { ApiError } from "../../utils/apiError";
import fs from "fs";
import path from "path";

export interface UploadedFilePayload {
  filename: string;
  originalname: string;
  mimetype: string;
  size: number;
  path?: string;
}

export class MediaService {
  // ══════════════════════════════════════════════════════════════
  // IMAPLE MEDIA LIBRARY ASSET MANAGEMENT
  // ══════════════════════════════════════════════════════════════
  static async getAllAssets(search?: string, mimeCategory?: string) {
    const where: any = {};
    if (search) {
      where.OR = [
        { filename: { contains: search } },
        { originalName: { contains: search } },
        { altText: { contains: search } },
      ];
    }

    if (mimeCategory && mimeCategory !== "all") {
      if (mimeCategory === "image") {
        where.mimeType = { startsWith: "image/" };
      } else if (mimeCategory === "document") {
        where.OR = [
          { mimeType: { contains: "pdf" } },
          { mimeType: { contains: "word" } },
          { mimeType: { contains: "text" } },
        ];
      }
    }

    return prisma.mediaAsset.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });
  }

  static async registerUploadedAsset(file: UploadedFilePayload, altText?: string) {
    // Generate public URL
    const relativeUrl = `/uploads/${file.filename}`;

    return prisma.mediaAsset.create({
      data: {
        filename: file.filename,
        originalName: file.originalname,
        mimeType: file.mimetype,
        size: file.size,
        url: relativeUrl,
        altText: altText || file.originalname.split(".")[0],
        folder: "uploads",
      },
    });
  }

  static async updateAsset(id: string, payload: { altText?: string; caption?: string }) {
    return prisma.mediaAsset.update({
      where: { id },
      data: payload,
    });
  }

  static async deleteAsset(id: string) {
    const asset = await prisma.mediaAsset.findUnique({ where: { id } });
    if (!asset) throw new ApiError(404, "Media asset not found.");

    // Delete local file if it resides in /uploads
    if (asset.url.startsWith("/uploads/")) {
      const diskPath = path.join(process.cwd(), "public", asset.url);
      if (fs.existsSync(diskPath)) {
        try {
          fs.unlinkSync(diskPath);
        } catch (e) {
          console.warn("Could not remove disk file:", e);
        }
      }
    }

    return prisma.mediaAsset.delete({ where: { id } });
  }

  // ══════════════════════════════════════════════════════════════
  // PRESS & MEDIA STORIES
  // ══════════════════════════════════════════════════════════════
  static async getAllStories() {
    return prisma.pressStory.findMany({
      orderBy: { publishDate: "desc" },
    });
  }

  static async getStoryBySlug(slug: string) {
    const story = await prisma.pressStory.findUnique({ where: { slug } });
    if (!story) throw new ApiError(404, "Press story not found.");
    return story;
  }

  static async createStory(payload: any) {
    if (!payload.title || !payload.newspaper) {
      throw new ApiError(400, "Title and Newspaper are required.");
    }

    const slug =
      payload.slug?.toLowerCase().trim().replace(/[^a-z0-9-]/g, "-") ||
      payload.title.toLowerCase().trim().replace(/[^a-z0-9-]/g, "-");

    return prisma.pressStory.create({
      data: {
        title: payload.title,
        banglaTitle: payload.banglaTitle || payload.title,
        slug,
        newspaper: payload.newspaper,
        summary: payload.summary || "",
        highlightQuote: payload.highlightQuote || null,
        clippingUrl: payload.clippingUrl || payload.image || "/Infoimages/Screenshot 2026-11-04 130333.png",
        tag: payload.tag || "Industrial Milestone",
      },
    });
  }

  static async updateStory(id: string, payload: any) {
    return prisma.pressStory.update({
      where: { id },
      data: payload,
    });
  }

  static async deleteStory(id: string) {
    return prisma.pressStory.delete({ where: { id } });
  }
}
