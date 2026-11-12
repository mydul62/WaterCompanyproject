import { z } from "zod";
import { ValidationSchemas } from "../../middlewares/validate.middleware";

const loginBodySchema = z
  .object({
    email: z
      .string({ required_error: "Email is required." })
      .trim()
      .email("Please enter a valid email address."),
    password: z
      .string({ required_error: "Password is required." })
      .min(1, "Password is required."),
  })
  .passthrough();

const changePasswordBodySchema = z
  .object({
    currentPassword: z
      .string({ required_error: "Current password is required." })
      .min(1, "Current password is required."),
    newPassword: z
      .string({ required_error: "New password is required." })
      .min(8, "New password must be at least 8 characters long."),
  })
  .passthrough();

export const AuthValidation = {
  login: { body: loginBodySchema } satisfies ValidationSchemas,
  changePassword: { body: changePasswordBodySchema } satisfies ValidationSchemas,
};

