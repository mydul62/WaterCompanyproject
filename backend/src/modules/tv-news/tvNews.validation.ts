import { z } from "zod";
import { ValidationSchemas } from "../../middlewares/validate.middleware";

const booleanOrString = z.union([z.boolean(), z.string()]);
const numberOrString = z.union([z.number(), z.string()]);

const createTvNewsBodySchema = z
  .object({
    title: z.string({ required_error: "TV News video title is required." }).trim().min(1, "TV News video title is required."),
    slug: z.string().trim().optional(),
    youtubeUrl: z.string().trim().optional(),
    embedUrl: z.string().trim().optional(),
    thumbnailUrl: z.string().trim().optional(),
    channel: z.string().trim().optional(),
    category: z.string().trim().optional(),
    publishedLabel: z.string().trim().optional(),
    description: z.string().optional(),
    sortOrder: numberOrString.optional(),
    isActive: booleanOrString.optional(),
  })
  .passthrough()
  .refine(
    (data) => Boolean((data.youtubeUrl && data.youtubeUrl.trim()) || (data.embedUrl && data.embedUrl.trim())),
    { message: "A YouTube URL or embed link is required.", path: ["youtubeUrl"] }
  );

const updateTvNewsBodySchema = z
  .object({
    title: z.string().trim().min(1, "TV News video title cannot be empty.").optional(),
    slug: z.string().trim().optional(),
    youtubeUrl: z.string().trim().optional(),
    embedUrl: z.string().trim().optional(),
    thumbnailUrl: z.string().trim().optional(),
    channel: z.string().trim().optional(),
    category: z.string().trim().optional(),
    publishedLabel: z.string().trim().optional(),
    description: z.string().optional(),
    sortOrder: numberOrString.optional(),
    isActive: booleanOrString.optional(),
  })
  .passthrough();

export const TvNewsValidation = {
  create: { body: createTvNewsBodySchema } satisfies ValidationSchemas,
  update: { body: updateTvNewsBodySchema } satisfies ValidationSchemas,
};

