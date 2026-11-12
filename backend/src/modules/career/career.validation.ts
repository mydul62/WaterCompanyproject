import { z } from "zod";
import { ValidationSchemas } from "../../middlewares/validate.middleware";

const stringArrayOrText = z.union([z.array(z.string()), z.string()]);
const booleanOrString = z.union([z.boolean(), z.string()]);
const numberOrString = z.union([z.number(), z.string()]);

const createJobBodySchema = z
  .object({
    title: z.string({ required_error: "Job title is required." }).trim().min(1, "Job title is required."),
    department: z
      .string({ required_error: "Department is required." })
      .trim()
      .min(1, "Department is required."),
    location: z.string().trim().optional(),
    type: z.string().trim().optional(),
    experience: z.string().trim().optional(),
    description: z.string().optional(),
    responsibilities: stringArrayOrText.optional(),
    requirements: stringArrayOrText.optional(),
    isActive: booleanOrString.optional(),
    sortOrder: numberOrString.optional(),
  })
  .passthrough();

const updateJobBodySchema = createJobBodySchema.partial().passthrough();

const createApplicationBodySchema = z
  .object({
    name: z.string({ required_error: "Applicant name is required." }).trim().min(1, "Applicant name is required."),
    email: z.string({ required_error: "Email is required." }).trim().email("Please enter a valid email address."),
    position: z.string({ required_error: "Position is required." }).trim().min(1, "Position is required."),
    phone: z.string().trim().optional(),
    department: z.string().trim().optional(),
    experience: z.string().trim().optional(),
    resumeUrl: z.string().trim().optional(),
    coverLetter: z.string().optional(),
  })
  .passthrough();

const updateStatusBodySchema = z
  .object({
    status: z.string({ required_error: "Status is required." }).trim().min(1, "Status is required."),
    notes: z.string().optional(),
  })
  .passthrough();

const applicationQuerySchema = z
  .object({
    status: z.string().optional(),
    department: z.string().optional(),
    search: z.string().optional(),
  })
  .passthrough();

export const CareerValidation = {
  createJob: { body: createJobBodySchema } satisfies ValidationSchemas,
  updateJob: { body: updateJobBodySchema } satisfies ValidationSchemas,
  createApplication: { body: createApplicationBodySchema } satisfies ValidationSchemas,
  updateApplicationStatus: { body: updateStatusBodySchema } satisfies ValidationSchemas,
  listApplications: { query: applicationQuerySchema } satisfies ValidationSchemas,
};

