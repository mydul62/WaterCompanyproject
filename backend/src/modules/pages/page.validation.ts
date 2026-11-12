import { z } from "zod";
import { ValidationSchemas } from "../../middlewares/validate.middleware";

const sectionItemSchema = z
  .object({
    id: z.string().optional(),
    sectionType: z.string().optional(),
    name: z.string().optional(),
    order: z.number().optional(),
    isVisible: z.boolean().optional(),
    settings: z.union([z.string(), z.record(z.any())]).optional(),
    content: z.union([z.string(), z.record(z.any()), z.array(z.any())]).optional(),
  })
  .passthrough();

const createPageBodySchema = z
  .object({
    title: z.string({ required_error: "Page title is required." }).trim().min(1, "Page title is required."),
    slug: z.string({ required_error: "Page slug is required." }).trim().min(1, "Page slug is required."),
    description: z.string().optional(),
    template: z.string().trim().optional(),
  })
  .passthrough();

const updatePageBodySchema = z
  .object({
    title: z.string().trim().min(1, "Page title cannot be empty.").optional(),
    slug: z.string().trim().min(1, "Page slug cannot be empty.").optional(),
    description: z.string().nullable().optional(),
    status: z.string().trim().optional(),
    template: z.string().trim().optional(),
    seoTitle: z.string().nullable().optional(),
    seoDescription: z.string().nullable().optional(),
    seoKeywords: z.string().nullable().optional(),
    ogImage: z.string().nullable().optional(),
    draftContent: z.any().optional(),
    publishedContent: z.any().optional(),
    sections: z.array(sectionItemSchema).optional(),
  })
  .passthrough();

const saveDraftBodySchema = z
  .object({
    draftContent: z.any().optional(),
    overrides: z.any().optional(),
    sections: z.union([z.array(sectionItemSchema), z.record(z.any())]).optional(),
  })
  .passthrough();

const publishPageBodySchema = z
  .object({
    notes: z.string().optional(),
    publishedContent: z.any().optional(),
    draftContent: z.any().optional(),
  })
  .passthrough();

const saveSectionsBodySchema = z
  .object({
    sections: z.array(sectionItemSchema).default([]),
  })
  .passthrough();

const reorderSectionsBodySchema = z
  .object({
    sections: z.array(
      z
        .object({
          id: z.string().min(1),
          sortOrder: z.number(),
        })
        .passthrough()
    ),
  })
  .passthrough();

const createRevisionBodySchema = z
  .object({
    note: z.string().optional(),
  })
  .passthrough();

export const PageValidation = {
  create: { body: createPageBodySchema } satisfies ValidationSchemas,
  update: { body: updatePageBodySchema } satisfies ValidationSchemas,
  saveDraft: { body: saveDraftBodySchema } satisfies ValidationSchemas,
  publish: { body: publishPageBodySchema } satisfies ValidationSchemas,
  saveSections: { body: saveSectionsBodySchema } satisfies ValidationSchemas,
  reorderSections: { body: reorderSectionsBodySchema } satisfies ValidationSchemas,
  createRevision: { body: createRevisionBodySchema } satisfies ValidationSchemas,
};

