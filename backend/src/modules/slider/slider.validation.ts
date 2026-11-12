import { z } from "zod";
import { ValidationSchemas } from "../../middlewares/validate.middleware";

const baseBannerBodySchema = z
  .object({
    num: z.string().optional(),
    line1: z.string().optional(),
    line2: z.string().optional(),
    line3: z.string().optional(),
    lines: z.array(z.string()).optional(),
    title: z.string().optional(),
    description: z.string().optional(),
    tagline: z.string().optional(),
    readMoreLabel: z.string().optional(),
    readMoreHref: z.string().optional(),
    watchVideoLabel: z.string().optional(),
    watchVideoSub: z.string().optional(),
    videoUrl: z.string().optional(),
    showOfferBadge: z.boolean().optional(),
    offerEyebrow1: z.string().optional(),
    offerEyebrow2: z.string().optional(),
    offerPrice: z.string().optional(),
    offerUnit: z.string().optional(),
    visualLayout: z.string().optional(),
    foregroundImage: z.string().optional(),
    secondaryImage: z.string().optional(),
    platformImage: z.string().optional(),
    backgroundImage: z.string().optional(),
    sortOrder: z.number().optional(),
    order: z.number().optional(),
    isActive: z.boolean().optional(),
  })
  .passthrough();

const createBannerBodySchema = baseBannerBodySchema.refine(
  (data) => {
    const firstLine = data.lines?.[0] ?? data.line1 ?? data.title ?? "";
    return String(firstLine).trim().length > 0;
  },
  { message: "Headline Line 1 is required.", path: ["line1"] }
);

const reorderBannersBodySchema = z
  .object({
    orderedIds: z.array(z.string().min(1)).min(1, "orderedIds array is required."),
  })
  .passthrough();

export const SliderValidation = {
  create: { body: createBannerBodySchema } satisfies ValidationSchemas,
  update: { body: baseBannerBodySchema } satisfies ValidationSchemas,
  reorder: { body: reorderBannersBodySchema } satisfies ValidationSchemas,
};

