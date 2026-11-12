import { Request, Response, NextFunction, Router } from "express";
import { sendResponse } from "./response";
import { authenticate, authenticateIfAllQuery, authorize } from "../middlewares/auth.middleware";
import { validateRequest, ValidationSchemas } from "../middlewares/validate.middleware";

/** Generate a URL-safe ASCII slug with fallback for non-Latin titles (e.g. Bangla). */
export function slugify(input: string, fallbackPrefix = "item"): string {
  const cleaned = String(input || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return cleaned || `${fallbackPrefix}-${Date.now()}`;
}

/** Ensure slug uniqueness against a Prisma delegate lookup, suffixing on collision. */
export async function ensureUniqueSlug(
  desired: string,
  findBySlug: (slug: string) => Promise<{ id: string } | null>,
  excludeId?: string
): Promise<string> {
  const base = slugify(desired);
  let candidate = base;
  let counter = 2;

  while (true) {
    const existing = await findBySlug(candidate);
    if (!existing || (excludeId && existing.id === excludeId)) {
      return candidate;
    }
    candidate = `${base}-${counter}`;
    counter += 1;
  }
}

/** Safely parse stored JSON fields (returns array/object directly if already parsed). */
export function parseJsonValue<T>(raw: unknown, fallback: T): T {
  if (raw === null || raw === undefined || raw === "") return fallback;
  if (typeof raw !== "string") return raw as T;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

/** Serialize an array/object payload into a JSON string for database storage. */
export function serializeJsonValue(value: unknown, fallback: unknown = []): string {
  if (typeof value === "string") {
    try {
      JSON.parse(value);
      return value;
    } catch {
      const lines = value
        .split(/\r?\n/)
        .map((s) => s.trim())
        .filter(Boolean);
      return JSON.stringify(lines);
    }
  }
  if (value === undefined || value === null) {
    return JSON.stringify(fallback);
  }
  return JSON.stringify(value);
}

export function toBoolean(value: unknown, fallback = true): boolean {
  if (typeof value === "boolean") return value;
  if (typeof value === "string") {
    if (value.toLowerCase() === "true") return true;
    if (value.toLowerCase() === "false") return false;
  }
  return fallback;
}

export function toInt(value: unknown, fallback = 0): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? Math.trunc(parsed) : fallback;
}

export interface CrudServiceContract<T = any> {
  getAll(includeInactive?: boolean): Promise<T[]>;
  getById(id: string): Promise<T>;
  getBySlug?(slug: string): Promise<T>;
  create(payload: any): Promise<T>;
  update(id: string, payload: any): Promise<T>;
  delete(id: string): Promise<any>;
  resetDefaults?(): Promise<T[]>;
}

/** Build standard Express controller methods backed by a CrudServiceContract. */
export function createCrudController<T>(
  service: CrudServiceContract<T>,
  entityLabel: string
) {
  return {
    getAll: async (req: Request, res: Response, next: NextFunction) => {
      try {
        const includeInactive = req.query.all === "true";
        const items = await service.getAll(includeInactive);
        return sendResponse(res, {
          statusCode: 200,
          success: true,
          message: `${entityLabel} list retrieved successfully.`,
          data: items,
        });
      } catch (err) {
        return next(err);
      }
    },

    getById: async (req: Request, res: Response, next: NextFunction) => {
      try {
        const item = await service.getById(req.params.id);
        return sendResponse(res, {
          statusCode: 200,
          success: true,
          message: `${entityLabel} retrieved successfully.`,
          data: item,
        });
      } catch (err) {
        return next(err);
      }
    },

    getBySlug: async (req: Request, res: Response, next: NextFunction) => {
      try {
        if (!service.getBySlug) {
          return res.status(404).json({ success: false, message: "Slug lookup unsupported." });
        }
        const item = await service.getBySlug(req.params.slug);
        return sendResponse(res, {
          statusCode: 200,
          success: true,
          message: `${entityLabel} retrieved successfully.`,
          data: item,
        });
      } catch (err) {
        return next(err);
      }
    },

    create: async (req: Request, res: Response, next: NextFunction) => {
      try {
        const item = await service.create(req.body);
        return sendResponse(res, {
          statusCode: 201,
          success: true,
          message: `${entityLabel} created successfully.`,
          data: item,
        });
      } catch (err) {
        return next(err);
      }
    },

    update: async (req: Request, res: Response, next: NextFunction) => {
      try {
        const item = await service.update(req.params.id, req.body);
        return sendResponse(res, {
          statusCode: 200,
          success: true,
          message: `${entityLabel} updated successfully.`,
          data: item,
        });
      } catch (err) {
        return next(err);
      }
    },

    delete: async (req: Request, res: Response, next: NextFunction) => {
      try {
        await service.delete(req.params.id);
        return sendResponse(res, {
          statusCode: 200,
          success: true,
          message: `${entityLabel} deleted successfully.`,
          data: null,
        });
      } catch (err) {
        return next(err);
      }
    },

    resetDefaults: async (_req: Request, res: Response, next: NextFunction) => {
      try {
        if (!service.resetDefaults) {
          return res.status(404).json({ success: false, message: "Reset unsupported." });
        }
        const items = await service.resetDefaults();
        return sendResponse(res, {
          statusCode: 200,
          success: true,
          message: `${entityLabel} reset to defaults.`,
          data: items,
        });
      } catch (err) {
        return next(err);
      }
    },
  };
}

/** Build a standard Express REST router for an ordered CMS collection. */
export function createCrudRouter(
  controller: ReturnType<typeof createCrudController>,
  options: {
    hasSlugRoute?: boolean;
    hasResetRoute?: boolean;
    publicRead?: boolean;
    createSchema?: ValidationSchemas;
    updateSchema?: ValidationSchemas;
    querySchema?: ValidationSchemas;
  } = {}
): Router {
  const router = Router();
  const cmsWriteGuard = [authenticate, authorize("SUPER_ADMIN", "ADMIN", "EDITOR")];
  const queryGuard = options.querySchema ? [validateRequest(options.querySchema)] : [];
  const createGuard = options.createSchema ? [validateRequest(options.createSchema)] : [];
  const updateGuard = options.updateSchema ? [validateRequest(options.updateSchema)] : [];

  if (options.publicRead === false) {
    router.get("/", ...cmsWriteGuard, ...queryGuard, controller.getAll);
  } else {
    router.get("/", authenticateIfAllQuery, ...queryGuard, controller.getAll);
  }

  if (options.hasSlugRoute) {
    router.get("/slug/:slug", controller.getBySlug);
  }
  router.get("/:id", controller.getById);
  router.post("/", ...cmsWriteGuard, ...createGuard, controller.create);
  if (options.hasResetRoute) {
    router.post("/reset", ...cmsWriteGuard, controller.resetDefaults);
  }
  router.put("/:id", ...cmsWriteGuard, ...updateGuard, controller.update);
  router.patch("/:id", ...cmsWriteGuard, ...updateGuard, controller.update);
  router.delete("/:id", ...cmsWriteGuard, controller.delete);
  return router;
}

