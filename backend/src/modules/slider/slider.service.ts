import { prisma } from "../../config/prisma";
import { ApiError } from "../../utils/apiError";
import { BannerSlidePayload } from "./slider.interface";

export type { BannerSlidePayload };

export const DEFAULT_SEED_BANNERS = [
  {
    num: "01",
    line1: "Delivered Right",
    line2: "To Your Home &",
    line3: "Office Door.",
    description:
      "Duty obligations of business will frequently occur pleasures be repudiated and annoyances accepted.",
    readMoreLabel: "READ MORE",
    readMoreHref: "/products",
    watchVideoLabel: "WATCH VIDEO",
    watchVideoSub: "Production to Delivery",
    videoUrl: "",
    showOfferBadge: true,
    offerEyebrow1: "Limited",
    offerEyebrow2: "Time Offer",
    offerPrice: "$15.50",
    offerUnit: "Per bottle",
    visualLayout: "duo",
    foregroundImage: "/images/hero/bottle-vertical.png",
    secondaryImage: "/images/hero/bottle-horizontal.png",
    platformImage: "/images/hero/hero-splash-platform.jpg",
    backgroundImage: "/images/hero/hero-bubbles-bg.jpg",
    sortOrder: 1,
    isActive: true,
  },
  {
    num: "02",
    line1: "Noor Plastic",
    line2: "Is Closer Than",
    line3: "You Think",
    description:
      "Direct factory plastic container supply, pure water dispenser jugs, and express delivery across Kaliakoir, Gazipur & Dhaka.",
    readMoreLabel: "READ MORE",
    readMoreHref: "/our-business",
    watchVideoLabel: "WATCH VIDEO",
    watchVideoSub: "Production to Delivery",
    videoUrl: "",
    showOfferBadge: true,
    offerEyebrow1: "Limited",
    offerEyebrow2: "Time Offer",
    offerPrice: "$15.50",
    offerUnit: "Per bottle",
    visualLayout: "duo",
    foregroundImage: "/images/hero/bottle-vertical.png",
    secondaryImage: "/images/hero/bottle-horizontal.png",
    platformImage: "/images/hero/hero-splash-platform.jpg",
    backgroundImage: "/images/hero/hero-bubbles-bg.jpg",
    sortOrder: 2,
    isActive: true,
  },
  {
    num: "03",
    line1: "100% Pure Water",
    line2: "Sealed Fresh For",
    line3: "Every Occasion.",
    description:
      "Precision multi-stage filtration and certified cleanroom bottling engineered for daily home and office hydration.",
    readMoreLabel: "READ MORE",
    readMoreHref: "/certificates",
    watchVideoLabel: "WATCH VIDEO",
    watchVideoSub: "Production to Delivery",
    videoUrl: "",
    showOfferBadge: true,
    offerEyebrow1: "Special",
    offerEyebrow2: "Bulk Offer",
    offerPrice: "$14.00",
    offerUnit: "Per bottle",
    visualLayout: "duo",
    foregroundImage: "/images/hero/bottle-vertical.png",
    secondaryImage: "/images/hero/bottle-horizontal.png",
    platformImage: "/images/hero/hero-splash-platform.jpg",
    backgroundImage: "/images/hero/hero-bubbles-bg.jpg",
    sortOrder: 3,
    isActive: true,
  },
  {
    num: "04",
    line1: "Bulk 3-Bottle",
    line2: "Family & Office",
    line3: "Water Packs.",
    description:
      "Triple-bottle 5-gallon purified mineral water bundles delivered straight to your home or workplace.",
    readMoreLabel: "READ MORE",
    readMoreHref: "/products",
    watchVideoLabel: "WATCH VIDEO",
    watchVideoSub: "Production to Delivery",
    videoUrl: "",
    showOfferBadge: true,
    offerEyebrow1: "Special",
    offerEyebrow2: "Bulk Offer",
    offerPrice: "$39.00",
    offerUnit: "3 Bottles",
    visualLayout: "trio",
    foregroundImage: "/images/hero/bottles-trio.png",
    secondaryImage: "/images/hero/bottle-horizontal.png",
    platformImage: "/images/hero/hero-splash-platform.jpg",
    backgroundImage: "/images/hero/hero-bubbles-bg.jpg",
    sortOrder: 4,
    isActive: true,
  },
];

function serializeBanner(row: any) {
  return {
    ...row,
    lines: [row.line1, row.line2, row.line3] as [string, string, string],
  };
}

function formatSlideNum(index: number): string {
  return String(index + 1).padStart(2, "0");
}

function normalizePayload(payload: BannerSlidePayload, fallbackOrder = 1) {
  const line1 =
    payload.lines?.[0] ?? payload.line1 ?? payload.title ?? "";
  const line2 = payload.lines?.[1] ?? payload.line2 ?? "";
  const line3 = payload.lines?.[2] ?? payload.line3 ?? "";
  const layout =
    payload.visualLayout === "trio" || payload.visualLayout === "custom"
      ? payload.visualLayout
      : "duo";

  return {
    line1: String(line1).trim(),
    line2: String(line2).trim(),
    line3: String(line3).trim(),
    description: String(payload.description ?? payload.tagline ?? "").trim(),
    readMoreLabel: String(payload.readMoreLabel || "READ MORE").trim(),
    readMoreHref: String(payload.readMoreHref || "/products").trim(),
    watchVideoLabel: String(payload.watchVideoLabel || "WATCH VIDEO").trim(),
    watchVideoSub: String(
      payload.watchVideoSub || "Production to Delivery"
    ).trim(),
    videoUrl: String(payload.videoUrl || "").trim(),
    showOfferBadge:
      payload.showOfferBadge !== undefined ? Boolean(payload.showOfferBadge) : true,
    offerEyebrow1: String(payload.offerEyebrow1 ?? "Limited").trim(),
    offerEyebrow2: String(payload.offerEyebrow2 ?? "Time Offer").trim(),
    offerPrice: String(payload.offerPrice ?? "$15.50").trim(),
    offerUnit: String(payload.offerUnit ?? "Per bottle").trim(),
    visualLayout: layout,
    foregroundImage: String(
      payload.foregroundImage ||
        (layout === "trio"
          ? "/images/hero/bottles-trio.png"
          : "/images/hero/bottle-vertical.png")
    ).trim(),
    secondaryImage: String(
      payload.secondaryImage || "/images/hero/bottle-horizontal.png"
    ).trim(),
    platformImage: String(
      payload.platformImage || "/images/hero/hero-splash-platform.jpg"
    ).trim(),
    backgroundImage: String(
      payload.backgroundImage || "/images/hero/hero-bubbles-bg.jpg"
    ).trim(),
    sortOrder:
      typeof payload.sortOrder === "number"
        ? payload.sortOrder
        : typeof payload.order === "number"
        ? payload.order
        : fallbackOrder,
    isActive: payload.isActive !== undefined ? Boolean(payload.isActive) : true,
  };
}

export class SliderService {
  static async ensureSeededIfEmpty() {
    const count = await prisma.bannerSlide.count();
    if (count === 0) {
      for (const slide of DEFAULT_SEED_BANNERS) {
        await prisma.bannerSlide.create({ data: slide });
      }
    }
  }

  static async renumberAll() {
    const slides = await prisma.bannerSlide.findMany({
      orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
    });
    for (let i = 0; i < slides.length; i++) {
      const nextNum = formatSlideNum(i);
      const nextOrder = i + 1;
      if (slides[i].num !== nextNum || slides[i].sortOrder !== nextOrder) {
        await prisma.bannerSlide.update({
          where: { id: slides[i].id },
          data: { num: nextNum, sortOrder: nextOrder },
        });
      }
    }
  }

  static async getAll(includeInactive = false) {
    const slides = await prisma.bannerSlide.findMany({
      where: includeInactive ? undefined : { isActive: true },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
    });
    return slides.map(serializeBanner);
  }

  static async getById(id: string) {
    const slide = await prisma.bannerSlide.findUnique({ where: { id } });
    if (!slide) {
      throw new ApiError(404, "Banner slide not found.");
    }
    return serializeBanner(slide);
  }

  static async create(payload: BannerSlidePayload) {
    const total = await prisma.bannerSlide.count();
    const data = normalizePayload(payload, total + 1);
    if (!data.line1) {
      throw new ApiError(400, "Headline Line 1 is required.");
    }

    const created = await prisma.bannerSlide.create({
      data: {
        ...data,
        num: payload.num?.trim() || formatSlideNum(total),
      },
    });

    await this.renumberAll();
    const fresh = await prisma.bannerSlide.findUnique({
      where: { id: created.id },
    });
    return serializeBanner(fresh || created);
  }

  static async update(id: string, payload: BannerSlidePayload) {
    const existing = await prisma.bannerSlide.findUnique({ where: { id } });
    if (!existing) {
      throw new ApiError(404, "Banner slide not found to update.");
    }

    const merged = normalizePayload(
      {
        ...existing,
        ...payload,
        lines: payload.lines || [
          payload.line1 ?? existing.line1,
          payload.line2 ?? existing.line2,
          payload.line3 ?? existing.line3,
        ],
      },
      existing.sortOrder
    );

    if (!merged.line1) {
      throw new ApiError(400, "Headline Line 1 is required.");
    }

    const updated = await prisma.bannerSlide.update({
      where: { id },
      data: {
        ...merged,
        num: payload.num?.trim() || existing.num,
      },
    });

    if (payload.sortOrder !== undefined || payload.order !== undefined) {
      await this.renumberAll();
    }

    const fresh = await prisma.bannerSlide.findUnique({ where: { id } });
    return serializeBanner(fresh || updated);
  }

  static async reorder(orderedIds: string[]) {
    if (!Array.isArray(orderedIds) || orderedIds.length === 0) {
      throw new ApiError(400, "orderedIds array is required.");
    }

    await prisma.$transaction(
      orderedIds.map((id, index) =>
        prisma.bannerSlide.update({
          where: { id },
          data: {
            sortOrder: index + 1,
            num: formatSlideNum(index),
          },
        })
      )
    );

    return this.getAll(true);
  }

  static async resetDefaults() {
    await prisma.$transaction([
      prisma.bannerSlide.deleteMany({}),
      ...DEFAULT_SEED_BANNERS.map((slide) =>
        prisma.bannerSlide.create({ data: slide })
      ),
    ]);
    return this.getAll(true);
  }

  static async delete(id: string) {
    const existing = await prisma.bannerSlide.findUnique({ where: { id } });
    if (!existing) {
      throw new ApiError(404, "Banner slide not found to delete.");
    }

    const deleted = await prisma.bannerSlide.delete({ where: { id } });
    await this.renumberAll();
    return serializeBanner(deleted);
  }
}
