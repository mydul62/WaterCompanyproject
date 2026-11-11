import { prisma } from "../../config/prisma";
import { ApiError } from "../../utils/apiError";
import { DEFAULT_TV_NEWS_VIDEOS } from "../../data/cmsDefaults";
import {
  CrudServiceContract,
  ensureUniqueSlug,
  toBoolean,
  toInt,
} from "../../utils/contentHelpers";

let seededOnce = false;

/**
 * Extract an 11-character YouTube video ID from watch URLs, share links, shorts, live links,
 * embed URLs, or full <iframe> HTML snippets.
 */
export function extractYouTubeVideoId(rawInput: string): string {
  const raw = String(rawInput || "").trim();
  if (!raw) return "";

  let candidate = raw;
  const iframeSrcMatch = raw.match(/src=["']([^"']+)["']/i);
  if (iframeSrcMatch?.[1]) {
    candidate = iframeSrcMatch[1].trim();
  }

  if (/^[a-zA-Z0-9_-]{11}$/.test(candidate)) {
    return candidate;
  }

  try {
    const normalizedUrl = /^https?:\/\//i.test(candidate)
      ? candidate
      : `https://${candidate.replace(/^\/\//, "")}`;
    const url = new URL(normalizedUrl);
    const host = url.hostname.toLowerCase();

    if (host.includes("youtu.be")) {
      const id = url.pathname.split("/").filter(Boolean)[0] || "";
      if (/^[a-zA-Z0-9_-]{11}$/.test(id)) return id;
    }

    if (host.includes("youtube.com") || host.includes("youtube-nocookie.com")) {
      const vParam = url.searchParams.get("v");
      if (vParam && /^[a-zA-Z0-9_-]{11}$/.test(vParam)) return vParam;

      const segments = url.pathname.split("/").filter(Boolean);
      const markerIdx = segments.findIndex((seg) =>
        ["embed", "shorts", "live", "v"].includes(seg.toLowerCase())
      );
      if (markerIdx !== -1 && segments[markerIdx + 1]) {
        const id = segments[markerIdx + 1];
        if (/^[a-zA-Z0-9_-]{11}$/.test(id)) return id;
      }
    }
  } catch {
    // Fall back to regex extraction below
  }

  const fallbackMatch = candidate.match(
    /(?:youtube(?:-nocookie)?\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/|v\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/i
  );
  return fallbackMatch?.[1] || "";
}

function serializeTvNewsVideo(row: any) {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    youtubeUrl: row.youtubeUrl,
    videoId: row.videoId,
    embedUrl: row.embedUrl,
    thumbnailUrl: row.thumbnailUrl || "",
    channel: row.channel || "TV News",
    category: row.category || "TV Broadcast",
    publishedLabel: row.publishedLabel || "",
    description: row.description || "",
    sortOrder: row.sortOrder ?? 0,
    isActive: row.isActive ?? true,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
  };
}

function normalizeTvNewsPayload(payload: any, existing?: any) {
  const hasUrlUpdate =
    payload.youtubeUrl !== undefined || payload.embedUrl !== undefined;

  let videoId = existing?.videoId || "";
  let youtubeUrl = existing?.youtubeUrl || "";
  let embedUrl = existing?.embedUrl || "";

  if (hasUrlUpdate) {
    const rawUrl = String(payload.youtubeUrl ?? payload.embedUrl ?? "").trim();
    const extractedId = extractYouTubeVideoId(rawUrl);
    if (!extractedId) {
      throw new ApiError(
        400,
        "Please provide a valid YouTube link, video ID, or YouTube <iframe> embed code."
      );
    }
    videoId = extractedId;
    youtubeUrl = `https://www.youtube.com/watch?v=${extractedId}`;
    embedUrl = `https://www.youtube.com/embed/${extractedId}`;
  }

  return {
    title: String(payload.title ?? existing?.title ?? "").trim(),
    youtubeUrl,
    videoId,
    embedUrl,
    thumbnailUrl: String(payload.thumbnailUrl ?? existing?.thumbnailUrl ?? "").trim(),
    channel: String(payload.channel ?? existing?.channel ?? "TV News").trim() || "TV News",
    category:
      String(payload.category ?? existing?.category ?? "TV Broadcast").trim() ||
      "TV Broadcast",
    publishedLabel: String(
      payload.publishedLabel ?? existing?.publishedLabel ?? ""
    ).trim(),
    description: String(payload.description ?? existing?.description ?? "").trim(),
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

export class TvNewsServiceImpl implements CrudServiceContract {
  private async ensureSeededIfEmpty() {
    if (seededOnce) return;
    seededOnce = true;
    const count = await prisma.tvNewsVideo.count();
    if (count === 0) {
      for (const item of DEFAULT_TV_NEWS_VIDEOS) {
        await prisma.tvNewsVideo.create({ data: item });
      }
    }
  }

  async getAll(includeInactive = false) {
    await this.ensureSeededIfEmpty();
    const rows = await prisma.tvNewsVideo.findMany({
      where: includeInactive ? undefined : { isActive: true },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    });
    return rows.map(serializeTvNewsVideo);
  }

  async getById(id: string) {
    const row = await prisma.tvNewsVideo.findUnique({ where: { id } });
    if (!row) throw new ApiError(404, "TV News video not found.");
    return serializeTvNewsVideo(row);
  }

  async getBySlug(slug: string) {
    const row = await prisma.tvNewsVideo.findUnique({ where: { slug } });
    if (!row) throw new ApiError(404, "TV News video not found.");
    return serializeTvNewsVideo(row);
  }

  async create(payload: any) {
    if (!payload.title || !String(payload.title).trim()) {
      throw new ApiError(400, "TV News video title is required.");
    }
    if (!payload.youtubeUrl && !payload.embedUrl) {
      throw new ApiError(400, "A YouTube URL or embed link is required.");
    }

    const total = await prisma.tvNewsVideo.count();
    const data = normalizeTvNewsPayload({
      ...payload,
      sortOrder: payload.sortOrder ?? total + 1,
    });
    const slug = await ensureUniqueSlug(
      payload.slug || `${payload.title}-${data.videoId}`,
      (s) => prisma.tvNewsVideo.findUnique({ where: { slug: s }, select: { id: true } })
    );

    const created = await prisma.tvNewsVideo.create({
      data: { ...data, slug },
    });
    return serializeTvNewsVideo(created);
  }

  async update(id: string, payload: any) {
    const existing = await prisma.tvNewsVideo.findUnique({ where: { id } });
    if (!existing) throw new ApiError(404, "TV News video not found.");

    const slug = payload.slug
      ? await ensureUniqueSlug(
          payload.slug,
          (s) => prisma.tvNewsVideo.findUnique({ where: { slug: s }, select: { id: true } }),
          id
        )
      : existing.slug;

    const data = normalizeTvNewsPayload(payload, existing);
    const updated = await prisma.tvNewsVideo.update({
      where: { id },
      data: { ...data, slug },
    });
    return serializeTvNewsVideo(updated);
  }

  async delete(id: string) {
    const existing = await prisma.tvNewsVideo.findUnique({ where: { id } });
    if (!existing) throw new ApiError(404, "TV News video not found.");
    return prisma.tvNewsVideo.delete({ where: { id } });
  }

  async resetDefaults() {
    await prisma.$transaction([
      prisma.tvNewsVideo.deleteMany({}),
      ...DEFAULT_TV_NEWS_VIDEOS.map((item) =>
        prisma.tvNewsVideo.create({ data: item })
      ),
    ]);
    return this.getAll(true);
  }
}

export const TvNewsService = new TvNewsServiceImpl();

