import { Request, Response, NextFunction } from "express";
import { AuthService } from "./auth.service";
import { sendResponse } from "../../utils/response";

export class AuthController {
  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const data = await AuthService.login(email, password);

      res.cookie("xcl_token", data.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
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

  static async me(req: any, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.id;
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

  static async logout(_req: Request, res: Response) {
    res.clearCookie("xcl_token");
    return sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Logged out successfully.",
      data: null,
    });
  }
}

