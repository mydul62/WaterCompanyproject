import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { ENV } from "../config/env";
import { ApiError } from "../utils/apiError";
export type Role = "SUPER_ADMIN" | "ADMIN" | "EDITOR" | "SALES_MANAGER";

export interface AuthUser {
  userId: string;
  role: Role;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
    }
  }
}

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  let token: string | undefined;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
  } else if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return next(new ApiError(401, "Authentication required. Please sign in."));
  }

  try {
    const decoded = jwt.verify(token, ENV.JWT_SECRET) as AuthUser;
    req.user = decoded;
    return next();
  } catch (err) {
    return next(new ApiError(401, "Invalid or expired session. Please sign in again."));
  }
};

export const authorize = (...allowedRoles: Role[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
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

