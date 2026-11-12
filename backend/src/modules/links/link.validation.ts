import { z } from "zod";
import { ValidationSchemas } from "../../middlewares/validate.middleware";

const listLinksQuerySchema = z
  .object({
    category: z.string().optional(),
    search: z.string().optional(),
  })
  .passthrough();

const createLinkBodySchema = z
  .object({
    title: z.string({ required_error: "Link title is required." }).trim().min(1, "Link title is required."),
    destinationUrl: z
      .string({ required_error: "Destination URL is required." })
      .trim()
      .min(1, "Destination URL is required."),
    slug: z.string().trim().optional(),
    target: z.string().trim().optional(),
    category: z.string().trim().optional(),
    notes: z.string().optional(),
    isActive: z.boolean().optional(),
  })
  .passthrough();

const updateLinkBodySchema = createLinkBodySchema.partial().passthrough();

export const LinkValidation = {
  list: { query: listLinksQuerySchema } satisfies ValidationSchemas,
  create: { body: createLinkBodySchema } satisfies ValidationSchemas,
  update: { body: updateLinkBodySchema } satisfies ValidationSchemas,
};

