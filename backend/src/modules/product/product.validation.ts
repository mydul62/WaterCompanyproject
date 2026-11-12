import { z } from "zod";
import { ValidationSchemas } from "../../middlewares/validate.middleware";

const stringArrayOrText = z.union([z.array(z.string()), z.string()]);

const listProductsQuerySchema = z
  .object({
    category: z.string().optional(),
    material: z.string().optional(),
    isFeatured: z.union([z.boolean(), z.string()]).optional(),
    search: z.string().optional(),
    sort: z.string().optional(),
  })
  .passthrough();

const createProductBodySchema = z
  .object({
    name: z.string({ required_error: "Product name is required." }).trim().min(1, "Product name is required."),
    slug: z.string().trim().optional(),
    sku: z.string().trim().optional(),
    description: z.string().optional(),
    categoryId: z.string().trim().optional(),
    category: z.string().trim().optional(),
    material: z.string().trim().optional(),
    capacityRange: z.string().trim().optional(),
    neckSize: z.string().nullable().optional(),
    factory: z.string().trim().optional(),
    applications: stringArrayOrText.optional(),
    features: stringArrayOrText.optional(),
    specifications: z.union([z.record(z.any()), z.string()]).optional(),
    imageUrl: z.string().trim().optional(),
    image: z.string().trim().optional(),
    galleryUrls: stringArrayOrText.optional(),
    tdsPdfUrl: z.string().nullable().optional(),
    isFeatured: z.boolean().optional(),
    isActive: z.boolean().optional(),
    order: z.union([z.number(), z.string()]).optional(),
    seoTitle: z.string().nullable().optional(),
    seoDescription: z.string().nullable().optional(),
  })
  .passthrough();

const updateProductBodySchema = createProductBodySchema.partial().passthrough();

export const ProductValidation = {
  list: { query: listProductsQuerySchema } satisfies ValidationSchemas,
  create: { body: createProductBodySchema } satisfies ValidationSchemas,
  update: { body: updateProductBodySchema } satisfies ValidationSchemas,
};

