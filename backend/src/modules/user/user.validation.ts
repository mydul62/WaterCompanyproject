import { z } from "zod";
import { ValidationSchemas } from "../../middlewares/validate.middleware";

const userRoleEnum = z.enum(["SUPER_ADMIN", "ADMIN", "EDITOR", "SALES_MANAGER"]);

const createUserBodySchema = z
  .object({
    email: z
      .string({ required_error: "Email is required." })
      .trim()
      .email("Please enter a valid email address."),
    name: z
      .string({ required_error: "Name is required." })
      .trim()
      .min(1, "Name is required."),
    password: z
      .string({ required_error: "Password is required." })
      .min(8, "Password must be at least 8 characters long."),
    role: userRoleEnum.optional(),
    avatar: z.string().nullable().optional(),
  })
  .passthrough();

const updateUserBodySchema = z
  .object({
    name: z.string().trim().min(1, "Name cannot be empty.").optional(),
    role: userRoleEnum.optional(),
    avatar: z.string().nullable().optional(),
    password: z
      .union([z.literal(""), z.string().min(8, "Password must be at least 8 characters long.")])
      .optional(),
  })
  .passthrough();

export const UserValidation = {
  create: { body: createUserBodySchema } satisfies ValidationSchemas,
  update: { body: updateUserBodySchema } satisfies ValidationSchemas,
};

