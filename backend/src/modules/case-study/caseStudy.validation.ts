import { z } from "zod";
import { ValidationSchemas } from "../../middlewares/validate.middleware";

const booleanOrString = z.union([z.boolean(), z.string()]);
const numberOrString = z.union([z.number(), z.string()]);

const createCaseStudyBodySchema = z
  .object({
    client: z.string({ required_error: "Client name is required." }).trim().min(1, "Client name is required."),
    title: z.string({ required_error: "Case study title is required." }).trim().min(1, "Case study title is required."),
    slug: z.string().trim().optional(),
    industry: z.string().trim().optional(),
    subtitle: z.string().optional(),
    coverImage: z.string().trim().optional(),
    stats: z.any().optional(),
    challenge: z.string().optional(),
    solution: z.string().optional(),
    results: z.any().optional(),
    specs: z.any().optional(),
    quote: z.union([z.record(z.any()), z.string()]).optional(),
    quoteText: z.string().optional(),
    quoteAuthor: z.string().trim().optional(),
    quoteRole: z.string().trim().optional(),
    sortOrder: numberOrString.optional(),
    isActive: booleanOrString.optional(),
  })
  .passthrough();

const updateCaseStudyBodySchema = createCaseStudyBodySchema.partial().passthrough();

export const CaseStudyValidation = {
  create: { body: createCaseStudyBodySchema } satisfies ValidationSchemas,
  update: { body: updateCaseStudyBodySchema } satisfies ValidationSchemas,
};

