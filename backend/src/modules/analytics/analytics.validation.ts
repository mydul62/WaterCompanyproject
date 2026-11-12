import { z } from "zod";
import { ValidationSchemas } from "../../middlewares/validate.middleware";

const overviewQuerySchema = z
  .object({
    range: z.string().trim().optional(),
    period: z.string().trim().optional(),
  })
  .passthrough();

export const AnalyticsValidation = {
  overview: { query: overviewQuerySchema } satisfies ValidationSchemas,
};

