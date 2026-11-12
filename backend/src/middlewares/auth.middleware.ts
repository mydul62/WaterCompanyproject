import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { ENV } from "../config/env";
import { prisma } from "../config/prisma";
import { ApiError } from "../utils/apiError";
export type Role = "SUPER_ADMIN" | "ADMIN" | "EDITOR" | "SALES_MANAGER";

export interface AuthUser {
  id: string;
  userId: string;
  role: Role;
  email: string;
  name?: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
    }
  }
}

export function extractAuthToken(req: Request): string | undefined {
  const authHeader = req.headers.authorization;
  let token: string | undefined;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.slice(7).trim();
  } else if (req.cookies && (req.cookies.xcl_token || req.cookies.token)) {
    token = req.cookies.xcl_token || req.cookies.token;
  }

  if (
    !token ||
    token === "null" ||
    token === "undefined" ||
    token === "demo_jwt_token_super_admin"
  ) {
    return undefined;
  }

  return token;
}

export const authenticate = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const token = extractAuthToken(req);

  if (!token) {
    return next(new ApiError(401, "Authentication required. Please sign in."));
  }

  if (!ENV.JWT_SECRET) {
    return next(new ApiError(500, "Authentication service is not configured."));
  }

  try {
    const decoded = jwt.verify(token, ENV.JWT_SECRET) as Partial<AuthUser>;
    const userId = decoded?.userId || decoded?.id;
    if (!userId) {
      return next(new ApiError(401, "Invalid session token. Please sign in again."));
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true, name: true, role: true },
    });

    if (!user) {
      return next(new ApiError(401, "User session is no longer valid. Please sign in again."));
    }

    req.user = {
      id: user.id,
      userId: user.id,
      email: user.email,
      name: user.name,
      role: user.role as Role,
    };
    return next();
  } catch {
    return next(new ApiError(401, "Invalid or expired session. Please sign in again."));
  }
};

export const authenticateIfAllQuery = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.query.all === "true") {
    return authenticate(req, res, next);
  }
  return next();
};

export const authorize = (...allowedRoles: Role[]) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new ApiError(401, "Unauthorized access."));
    }

    if (allowedRoles.length && !allowedRoles.includes(req.user.role)) {
      return next(
        new ApiError(403, "Forbidden. You do not have permission for this resource.")
      );
    }

    return next();
  };
};

