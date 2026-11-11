import { prisma } from "../../config/prisma";
import { ApiError } from "../../utils/apiError";
import { DEFAULT_PRESS_STORIES } from "../../data/cmsDefaults";
import {
  ensureUniqueSlug,
  parseJsonValue,
  serializeJsonValue,
  toBoolean,
  toInt,
} from "../../utils/contentHelpers";
import fs from "fs";
import path from "path";

let storiesSeededOnce = false;

function serializeStory(row: any) {
  const fullArticle = parseJsonValue<string[]>(row.fullArticle, []);
  const keyHighlights = parseJsonValue<string[]>(row.keyHighlights, []);
  const dateLabel =
    row.dateLabel ||
    (row.publishDate
      ? new Date(row.publishDate).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })
      : "");

  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    englishTitle: row.banglaTitle || row.title,
    banglaTitle: row.banglaTitle || row.title,
    outlet: row.newspaper,
    newspaper: row.newspaper,
    outletColor: row.outletColor || "#0284c7",
    date: dateLabel,
    dateLabel,
    publishDate: row.publishDate,
    category: row.category || "শিল্প ও বাণিজ্য",
    readTime: row.readTime || "৩ মিনিট পাঠ",
    image: row.clippingUrl,
    clippingUrl: row.clippingUrl,
    summary: row.summary,
    fullArticle: fullArticle.length > 0 ? fullArticle : row.summary ? [row.summary] : [],
    keyHighlights,
    quote: {
      text: row.highlightQuote || "",
      author: row.quoteAuthor || "নূরুল ইসলাম",
      role: row.quoteRole || "স্বত্বাধিকারী, নূর প্লাস্টিক ইন্ডাস্ট্রিজ",
    },
    highlightQuote: row.highlightQuote || "",
    quoteAuthor: row.quoteAuthor || "",
    quoteRole: row.quoteRole || "",
    originalSourceUrl: row.originalSourceUrl || "",
    tag: row.tag || "Industrial Milestone",
    sortOrder: row.sortOrder ?? 0,
    isActive: row.isActive ?? true,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
  };
}

function normalizeStoryPayload(payload: any, existing?: any) {
  const newspaper =
    payload.newspaper ?? payload.outlet ?? existing?.newspaper ?? "Prothom Alo";
  const clippingUrl =
    payload.clippingUrl ??
    payload.image ??
    existing?.clippingUrl ??
    "/cropped/news-card-1.png";
  const banglaTitle =
    payload.banglaTitle ??
    payload.englishTitle ??
    payload.title ??
    existing?.banglaTitle ??
    "";
  const quoteText =
    payload.quote?.text ??
    payload.highlightQuote ??
    existing?.highlightQuote ??
    null;
  const quoteAuthor =
    payload.quote?.author ??
    payload.quoteAuthor ??
    existing?.quoteAuthor ??
    "নূরুল ইসলাম";
  const quoteRole =
    payload.quote?.role ??
    payload.quoteRole ??
    existing?.quoteRole ??
    "স্বত্বাধিকারী, নূর প্লাস্টিক ইন্ডাস্ট্রিজ";

  return {
    title: String(payload.title ?? existing?.title ?? "").trim(),
    banglaTitle: String(banglaTitle).trim(),
    newspaper: String(newspaper).trim(),
    outletColor: String(payload.outletColor ?? existing?.outletColor ?? "#0284c7").trim(),
    dateLabel: String(payload.dateLabel ?? payload.date ?? existing?.dateLabel ?? "").trim(),
    category: String(payload.category ?? existing?.category ?? "শিল্প ও বাণিজ্য").trim(),
    readTime: String(payload.readTime ?? existing?.readTime ?? "৩ মিনিট পাঠ").trim(),
    clippingUrl: String(clippingUrl).trim(),
    summary: String(payload.summary ?? existing?.summary ?? "").trim(),
    fullArticle:
      payload.fullArticle !== undefined
        ? serializeJsonValue(payload.fullArticle, [])
        : existing?.fullArticle ?? "[]",
    keyHighlights:
      payload.keyHighlights !== undefined
        ? serializeJsonValue(payload.keyHighlights, [])
        : existing?.keyHighlights ?? "[]",
    highlightQuote: quoteText ? String(quoteText).trim() : null,
    quoteAuthor: quoteAuthor ? String(quoteAuthor).trim() : null,
    quoteRole: quoteRole ? String(quoteRole).trim() : null,
    originalSourceUrl: String(
      payload.originalSourceUrl ?? existing?.originalSourceUrl ?? ""
    ).trim(),
    tag: String(payload.tag ?? existing?.tag ?? "Industrial Milestone").trim(),
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
  private static async ensureStoriesSeededIfEmpty() {
    if (storiesSeededOnce) return;
    storiesSeededOnce = true;
    const count = await prisma.pressStory.count();
    if (count === 0) {
      for (const story of DEFAULT_PRESS_STORIES) {
        await prisma.pressStory.create({ data: story });
      }
    }
  }

  static async getAllStories(includeInactive = false) {
    await this.ensureStoriesSeededIfEmpty();
    const stories = await prisma.pressStory.findMany({
      where: includeInactive ? undefined : { isActive: true },
      orderBy: [{ sortOrder: "asc" }, { publishDate: "desc" }],
    });
    return stories.map(serializeStory);
  }

  static async getStoryById(id: string) {
    const story = await prisma.pressStory.findUnique({ where: { id } });
    if (!story) throw new ApiError(404, "Press story not found.");
    return serializeStory(story);
  }

  static async getStoryBySlug(slug: string) {
    const story = await prisma.pressStory.findUnique({ where: { slug } });
    if (!story) throw new ApiError(404, "Press story not found.");
    return serializeStory(story);
  }

  static async createStory(payload: any) {
    if (!payload.title || !(payload.newspaper || payload.outlet)) {
      throw new ApiError(400, "Title and Newspaper/Outlet are required.");
    }

    const slug = await ensureUniqueSlug(
      payload.slug || payload.englishTitle || payload.title,
      (s) => prisma.pressStory.findUnique({ where: { slug: s }, select: { id: true } })
    );
    const total = await prisma.pressStory.count();
    const data = normalizeStoryPayload({
      ...payload,
      sortOrder: payload.sortOrder ?? total + 1,
    });

    const created = await prisma.pressStory.create({
      data: { ...data, slug },
    });
    return serializeStory(created);
  }

  static async updateStory(id: string, payload: any) {
    const existing = await prisma.pressStory.findUnique({ where: { id } });
    if (!existing) throw new ApiError(404, "Press story not found.");

    const slug = payload.slug
      ? await ensureUniqueSlug(
          payload.slug,
          (s) => prisma.pressStory.findUnique({ where: { slug: s }, select: { id: true } }),
          id
        )
      : existing.slug;

    const data = normalizeStoryPayload(payload, existing);
    const updated = await prisma.pressStory.update({
      where: { id },
      data: { ...data, slug },
    });
    return serializeStory(updated);
  }

  static async deleteStory(id: string) {
    const existing = await prisma.pressStory.findUnique({ where: { id } });
    if (!existing) throw new ApiError(404, "Press story not found.");
    return prisma.pressStory.delete({ where: { id } });
  }

  static async resetStories() {
    await prisma.$transaction([
      prisma.pressStory.deleteMany({}),
      ...DEFAULT_PRESS_STORIES.map((story) =>
        prisma.pressStory.create({ data: story })
      ),
    ]);
    return this.getAllStories(true);
  }
}
