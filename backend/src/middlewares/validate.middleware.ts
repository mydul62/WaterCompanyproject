import { NextFunction, Request, RequestHandler, Response } from "express";
import { ZodError, ZodSchema } from "zod";
import { ApiError } from "../utils/apiError";

/**
 * Zod schemas targeting individual parts of an Express request.
 */
export interface ValidationSchemas {
  body?: ZodSchema;
  query?: ZodSchema;
  params?: ZodSchema;
}

/**
 * Format a Zod validation failure into a concise human-readable error message.
 */
export function formatZodError(error: ZodError): string {
  const issues = error.issues.map((issue) => {
    const fieldPath = issue.path.length > 0 ? `${issue.path.join(".")}: ` : "";
    return `${fieldPath}${issue.message}`;
  });
  return issues.join("; ") || "Invalid request payload.";
}

/**
 * Express middleware that validates request body, query, and/or route params
 * against Zod schemas and forwards a 400 ApiError on validation failure.
 */
export function validateRequest(schemas: ValidationSchemas): RequestHandler {
  return async (req: Request, _res: Response, next: NextFunction) => {
    try {
      if (schemas.params) {
        req.params = (await schemas.params.parseAsync(req.params)) as any;
      }
      if (schemas.query) {
        req.query = (await schemas.query.parseAsync(req.query)) as any;
      }
      if (schemas.body) {
        req.body = await schemas.body.parseAsync(req.body ?? {});
      }
      return next();
    } catch (err) {
      if (err instanceof ZodError) {
        return next(new ApiError(400, formatZodError(err)));
      }
      return next(err);
    }
  };
}

