import { z } from "zod";
import { ValidationSchemas } from "../../middlewares/validate.middleware";

const navItemSchema = z
  .object({
    label: z.string({ required_error: "Menu item label is required." }).trim().min(1, "Menu item label is required."),
    url: z.string({ required_error: "Menu item URL is required." }).trim(),
    target: z.string().optional(),
    iconName: z.string().nullable().optional(),
    badgeText: z.string().nullable().optional(),
    badgeColor: z.string().nullable().optional(),
    description: z.string().nullable().optional(),
    isVisible: z.boolean().optional(),
    children: z.array(z.any()).optional(),
  })
  .passthrough();

const createMenuBodySchema = z
  .object({
    name: z.string({ required_error: "Menu name is required." }).trim().min(1, "Menu name is required."),
    location: z.string({ required_error: "Menu location is required." }).trim().min(1, "Menu location is required."),
  })
  .passthrough();

const updateMenuBodySchema = z
  .object({
    name: z.string().trim().min(1, "Menu name cannot be empty.").optional(),
    isPublished: z.boolean().optional(),
  })
  .passthrough();

const saveMenuItemsBodySchema = z
  .object({
    items: z.array(navItemSchema).default([]),
  })
  .passthrough();

export const NavigationValidation = {
  create: { body: createMenuBodySchema } satisfies ValidationSchemas,
  update: { body: updateMenuBodySchema } satisfies ValidationSchemas,
  saveItems: { body: saveMenuItemsBodySchema } satisfies ValidationSchemas,
};

