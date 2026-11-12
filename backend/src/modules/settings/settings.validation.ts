import { z } from "zod";
import { ValidationSchemas } from "../../middlewares/validate.middleware";

const settingValueSchema = z.union([z.string(), z.number(), z.boolean(), z.null()]);

const updateSettingsBodySchema = z.union([
  z
    .object({
      settings: z.array(
        z.object({
          key: z.string().trim().min(1, "Setting key is required."),
          value: settingValueSchema.optional(),
        })
      ),
    })
    .passthrough(),
  z.record(settingValueSchema),
]);

export const SettingsValidation = {
  update: { body: updateSettingsBodySchema } satisfies ValidationSchemas,
};

