import { z } from "zod";
import { ValidationSchemas } from "../../middlewares/validate.middleware";

const createRfqBodySchema = z
  .object({
    email: z.string({ required_error: "Email address is required." }).trim().email("Please enter a valid email address."),
    companyName: z.string().trim().optional(),
    contactPerson: z.string().trim().optional(),
    name: z.string().trim().optional(),
    phone: z.string().trim().optional(),
    category: z.string().trim().optional(),
    subject: z.string().trim().optional(),
    volume: z.string().trim().optional(),
    capacity: z.string().trim().optional(),
    notes: z.string().optional(),
    message: z.string().optional(),
  })
  .passthrough();

const updateRfqStatusBodySchema = z
  .object({
    status: z.string({ required_error: "RFQ status is required." }).trim().min(1, "RFQ status is required."),
  })
  .passthrough();

const listRfqQuerySchema = z
  .object({
    status: z.string().optional(),
    search: z.string().optional(),
    page: z.coerce.number().int().positive().optional(),
    limit: z.coerce.number().int().positive().max(500).optional(),
  })
  .passthrough();

export const RFQValidation = {
  create: { body: createRfqBodySchema } satisfies ValidationSchemas,
  updateStatus: { body: updateRfqStatusBodySchema } satisfies ValidationSchemas,
  list: { query: listRfqQuerySchema } satisfies ValidationSchemas,
};

