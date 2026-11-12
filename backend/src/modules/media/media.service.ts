import { prisma } from "../../config/prisma";
import { getUploadsDir } from "../../config/env";
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

const KNOWN_MEDIA_CATEGORIES = new Set([
  "GENERAL",
  "PRODUCTS",
  "HERO",
  "FACTORY",
  "STORY",
  "CERTIFICATES",
  "CLIENT_LOGOS",
]);

function inferAssetCategory(row: {
  folder?: string | null;
  filename?: string | null;
  url?: string | null;
  altText?: string | null;
}): string {
  const rawFolder = (row.folder || "").trim().toUpperCase();
  if (KNOWN_MEDIA_CATEGORIES.has(rawFolder)) return rawFolder;
  if (rawFolder === "TOOL-ROOM") return "FACTORY";

  const haystack = `${row.filename || ""} ${row.url || ""} ${row.altText || ""}`.toLowerCase();
  if (haystack.includes("logo") || haystack.includes("berger") || haystack.includes("brand")) {
    return haystack.includes("hero") ? "HERO" : "CLIENT_LOGOS";
  }
  if (haystack.includes("hero") || haystack.includes("banner") || haystack.includes("slider")) return "HERO";
  if (haystack.includes("certificate") || haystack.includes("award") || haystack.includes("leed")) return "CERTIFICATES";
  if (haystack.includes("product") || haystack.includes("bottle") || haystack.includes("pail") || haystack.includes("drum")) return "PRODUCTS";
  if (haystack.includes("factory") || haystack.includes("plant") || haystack.includes("office") || haystack.includes("building") || haystack.includes("tool-room")) return "FACTORY";
  if (haystack.includes("story") || haystack.includes("news") || haystack.includes("press")) return "STORY";
  return "GENERAL";
}

function serializeMediaAsset(row: any) {
  const title = row.originalName || row.filename || row.altText || "Media Asset";
  const category = inferAssetCategory(row);
  return {
    ...row,
    title,
    category,
  };
}

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

export interface RegisterUploadedAssetOptions {
  altText?: string;
  category?: string;
  url?: string;
  width?: number | null;
  height?: number | null;
}

export class MediaService {
  // ══════════════════════════════════════════════════════════════
  // MEDIA LIBRARY ASSET MANAGEMENT
  // ══════════════════════════════════════════════════════════════
  static async getAllAssets(search?: string, mimeCategory?: string, category?: string) {
    const where: any = {};
    if (search) {
      where.OR = [
        { filename: { contains: search } },
        { originalName: { contains: search } },
        { altText: { contains: search } },
        { url: { contains: search } },
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

    const rows = await prisma.mediaAsset.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    const serialized = rows.map(serializeMediaAsset);
    const normalizedCat = category?.trim().toUpperCase();
    if (normalizedCat && normalizedCat !== "ALL") {
      return serialized.filter((asset) => asset.category === normalizedCat);
    }
    return serialized;
  }

  static async registerUploadedAsset(
    file: UploadedFilePayload,
    options?: string | RegisterUploadedAssetOptions
  ) {
    const opts: RegisterUploadedAssetOptions =
      typeof options === "string" ? { altText: options } : options || {};
    const resolvedUrl = opts.url || `/uploads/${file.filename}`;
    const rawCategory = (opts.category || "GENERAL").trim().toUpperCase();
    const folderCategory = KNOWN_MEDIA_CATEGORIES.has(rawCategory) ? rawCategory : "GENERAL";
    const fallbackAlt = file.originalname.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");

    const created = await prisma.mediaAsset.create({
      data: {
        filename: file.filename,
        originalName: file.originalname,
        mimeType: file.mimetype,
        size: file.size,
        url: resolvedUrl,
        altText: opts.altText?.trim() || fallbackAlt,
        folder: folderCategory,
        width: opts.width ?? null,
        height: opts.height ?? null,
      },
    });

    return serializeMediaAsset(created);
  }

  static async updateAsset(id: string, payload: { altText?: string; caption?: string; category?: string }) {
    const data: { altText?: string; caption?: string; folder?: string } = {};
    if (payload.altText !== undefined) data.altText = payload.altText;
    if (payload.caption !== undefined) data.caption = payload.caption;
    if (payload.category !== undefined) {
      const normalizedCat = payload.category.trim().toUpperCase();
      if (KNOWN_MEDIA_CATEGORIES.has(normalizedCat)) {
        data.folder = normalizedCat;
      }
    }

    const updated = await prisma.mediaAsset.update({
      where: { id },
      data,
    });
    return serializeMediaAsset(updated);
  }

  static async deleteAsset(id: string) {
    const asset = await prisma.mediaAsset.findUnique({ where: { id } });
    if (!asset) throw new ApiError(404, "Media asset not found.");

    // Delete local file if it resides in /uploads
    if (asset.url.startsWith("/uploads/")) {
      const diskPath = path.join(getUploadsDir(), path.basename(asset.url));
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
