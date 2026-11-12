import { z } from "zod";
import { ValidationSchemas } from "../../middlewares/validate.middleware";

const booleanOrString = z.union([z.boolean(), z.string()]);
const numberOrString = z.union([z.number(), z.string()]);
const stringArrayOrText = z.union([z.array(z.string()), z.string()]);

const createCertificateBodySchema = z
  .object({
    title: z.string({ required_error: "Certificate title is required." }).trim().min(1, "Certificate title is required."),
    slug: z.string().trim().optional(),
    code: z.string().trim().optional(),
    category: z.string().trim().optional(),
    image: z.string().trim().optional(),
    aspect: z.string().trim().optional(),
    bullets: stringArrayOrText.optional(),
    accreditation: z.string().trim().optional(),
    sortOrder: numberOrString.optional(),
    isActive: booleanOrString.optional(),
  })
  .passthrough();

const updateCertificateBodySchema = createCertificateBodySchema.partial().passthrough();

export const CertificateValidation = {
  create: { body: createCertificateBodySchema } satisfies ValidationSchemas,
  update: { body: updateCertificateBodySchema } satisfies ValidationSchemas,
};

