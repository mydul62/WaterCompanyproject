import { z } from "zod";
import { ValidationSchemas } from "../../middlewares/validate.middleware";

const booleanOrString = z.union([z.boolean(), z.string()]);
const numberOrString = z.union([z.number(), z.string()]);
const stringArrayOrText = z.union([z.array(z.string()), z.string()]);

const createBlogBodySchema = z
  .object({
    title: z.string({ required_error: "Blog title is required." }).trim().min(1, "Blog title is required."),
    slug: z.string().trim().optional(),
    excerpt: z.string().optional(),
    category: z.string().trim().optional(),
    author: z.union([z.record(z.any()), z.string()]).optional(),
    authorName: z.string().trim().optional(),
    authorRole: z.string().trim().optional(),
    authorAvatar: z.string().trim().optional(),
    date: z.string().trim().optional(),
    dateLabel: z.string().trim().optional(),
    content: z.union([z.record(z.any()), z.string()]).optional(),
    intro: z.string().optional(),
    sections: z.union([z.array(z.any()), z.string()]).optional(),
    quote: z.string().optional(),
    conclusion: z.string().optional(),
    image: z.string().trim().optional(),
    tags: stringArrayOrText.optional(),
    featured: booleanOrString.optional(),
    sortOrder: numberOrString.optional(),
    isActive: booleanOrString.optional(),
  })
  .passthrough();

const updateBlogBodySchema = createBlogBodySchema.partial().passthrough();

export const BlogValidation = {
  create: { body: createBlogBodySchema } satisfies ValidationSchemas,
  update: { body: updateBlogBodySchema } satisfies ValidationSchemas,
};

