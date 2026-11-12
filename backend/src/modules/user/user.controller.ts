import { Request, Response, NextFunction } from "express";
import { UserService } from "./user.service";
import { sendResponse } from "../../utils/response";

export class UserController {
  static async getAll(_req: Request, res: Response, next: NextFunction) {
    try {
      const users = await UserService.getAll();
      return sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Users retrieved.",
        data: users,
      });
    } catch (err) {
      return next(err);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await UserService.create(req.body, req.user?.role);
      return sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "User created.",
        data: user,
      });
    } catch (err) {
      return next(err);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await UserService.update(
        req.params.id,
        req.body,
        req.user ? { userId: req.user.userId, role: req.user.role } : undefined
      );
      return sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "User updated.",
        data: user,
      });
    } catch (err) {
      return next(err);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await UserService.delete(
        req.params.id,
        req.user ? { userId: req.user.userId, role: req.user.role } : undefined
      );
      return sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "User deleted.",
        data: null,
      });
    } catch (err) {
      return next(err);
    }
  }
}

