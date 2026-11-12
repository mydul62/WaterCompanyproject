import { z } from "zod";
import { ValidationSchemas } from "../../middlewares/validate.middleware";

const booleanOrString = z.union([z.boolean(), z.string()]);
const numberOrString = z.union([z.number(), z.string()]);
const stringArrayOrText = z.union([z.array(z.string()), z.string()]);

const listAssetsQuerySchema = z
  .object({
    search: z.string().optional(),
    type: z.string().optional(),
    category: z.string().optional(),
  })
  .passthrough();

const updateAssetBodySchema = z
  .object({
    altText: z.string().optional(),
    caption: z.string().optional(),
    category: z.string().trim().optional(),
  })
  .passthrough();

const createStoryBodySchema = z
  .object({
    title: z.string({ required_error: "Story title is required." }).trim().min(1, "Story title is required."),
    slug: z.string().trim().optional(),
    newspaper: z.string().trim().optional(),
    outlet: z.string().trim().optional(),
    banglaTitle: z.string().optional(),
    englishTitle: z.string().optional(),
    outletColor: z.string().trim().optional(),
    dateLabel: z.string().trim().optional(),
    date: z.string().trim().optional(),
    category: z.string().trim().optional(),
    readTime: z.string().trim().optional(),
    clippingUrl: z.string().trim().optional(),
    image: z.string().trim().optional(),
    summary: z.string().optional(),
    fullArticle: stringArrayOrText.optional(),
    keyHighlights: stringArrayOrText.optional(),
    quote: z
      .object({
        text: z.string().optional(),
        author: z.string().optional(),
        role: z.string().optional(),
      })
      .passthrough()
      .optional(),
    highlightQuote: z.string().optional(),
    quoteAuthor: z.string().optional(),
    quoteRole: z.string().optional(),
    originalSourceUrl: z.string().optional(),
    tag: z.string().optional(),
    sortOrder: numberOrString.optional(),
    isActive: booleanOrString.optional(),
  })
  .passthrough()
  .refine(
    (data) => Boolean((data.newspaper && data.newspaper.trim()) || (data.outlet && data.outlet.trim())),
    { message: "Newspaper or outlet name is required.", path: ["newspaper"] }
  );

const updateStoryBodySchema = z
  .object({
    title: z.string().trim().min(1, "Story title cannot be empty.").optional(),
    slug: z.string().trim().optional(),
    newspaper: z.string().trim().optional(),
    outlet: z.string().trim().optional(),
    banglaTitle: z.string().optional(),
    englishTitle: z.string().optional(),
    outletColor: z.string().trim().optional(),
    dateLabel: z.string().trim().optional(),
    date: z.string().trim().optional(),
    category: z.string().trim().optional(),
    readTime: z.string().trim().optional(),
    clippingUrl: z.string().trim().optional(),
    image: z.string().trim().optional(),
    summary: z.string().optional(),
    fullArticle: stringArrayOrText.optional(),
    keyHighlights: stringArrayOrText.optional(),
    quote: z
      .object({
        text: z.string().optional(),
        author: z.string().optional(),
        role: z.string().optional(),
      })
      .passthrough()
      .optional(),
    highlightQuote: z.string().optional(),
    quoteAuthor: z.string().optional(),
    quoteRole: z.string().optional(),
    originalSourceUrl: z.string().optional(),
    tag: z.string().optional(),
    sortOrder: numberOrString.optional(),
    isActive: booleanOrString.optional(),
  })
  .passthrough();

export const MediaValidation = {
  listAssets: { query: listAssetsQuerySchema } satisfies ValidationSchemas,
  updateAsset: { body: updateAssetBodySchema } satisfies ValidationSchemas,
  createStory: { body: createStoryBodySchema } satisfies ValidationSchemas,
  updateStory: { body: updateStoryBodySchema } satisfies ValidationSchemas,
};

