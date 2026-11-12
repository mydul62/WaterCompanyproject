import { Request, Response, NextFunction, CookieOptions } from "express";
import { AuthService } from "./auth.service";
import { sendResponse } from "../../utils/response";
import { ENV } from "../../config/env";

function buildAuthCookieOptions(): CookieOptions {
  const isProd = ENV.NODE_ENV === "production";
  return {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? "none" : "lax",
    path: "/",
  };
}

export class AuthController {
  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const data = await AuthService.login(email, password);

      res.cookie("xcl_token", data.token, {
        ...buildAuthCookieOptions(),
        maxAge: ENV.AUTH_COOKIE_MAX_AGE_MS,
      });

      return sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Authenticated successfully.",
        data,
      });
    } catch (err) {
      return next(err);
    }
  }

  static async me(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.id || req.user?.userId || "";
      const user = await AuthService.getMe(userId);
      return sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "User session retrieved.",
        data: user,
      });
    } catch (err) {
      return next(err);
    }
  }

  static async changePassword(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.id || req.user?.userId || "";
      const { currentPassword, newPassword } = req.body || {};
      await AuthService.changePassword(userId, currentPassword, newPassword);
      return sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Password updated successfully.",
        data: null,
      });
    } catch (err) {
      return next(err);
    }
  }

  static async logout(_req: Request, res: Response) {
    const cookieOpts = buildAuthCookieOptions();
    res.clearCookie("xcl_token", cookieOpts);
    res.clearCookie("token", cookieOpts);
    return sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Logged out successfully.",
      data: null,
    });
  }
}

