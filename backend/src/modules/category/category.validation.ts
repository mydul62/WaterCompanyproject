import { z } from "zod";
import { ValidationSchemas } from "../../middlewares/validate.middleware";

const createCategoryBodySchema = z
  .object({
    name: z.string({ required_error: "Category name is required." }).trim().min(1, "Category name is required."),
    slug: z.string().trim().optional(),
    description: z.string().nullable().optional(),
    material: z.string().trim().optional(),
    order: z.union([z.number(), z.string()]).optional(),
    image: z.string().nullable().optional(),
    isActive: z.boolean().optional(),
  })
  .passthrough();

const updateCategoryBodySchema = createCategoryBodySchema.partial().passthrough();

export const CategoryValidation = {
  create: { body: createCategoryBodySchema } satisfies ValidationSchemas,
  update: { body: updateCategoryBodySchema } satisfies ValidationSchemas,
};

