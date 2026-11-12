import { Request, Response, NextFunction } from "express";
import { CategoryService } from "./category.service";
import { sendResponse } from "../../utils/response";

export class CategoryController {
  static async getAll(_req: Request, res: Response, next: NextFunction) {
    try {
      const categories = await CategoryService.getAll();
      return sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Categories retrieved.",
        data: categories,
      });
    } catch (err) {
      return next(err);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const category = await CategoryService.create(req.body);
      return sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Category created.",
        data: category,
      });
    } catch (err) {
      return next(err);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const category = await CategoryService.update(req.params.id, req.body);
      return sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Category updated.",
        data: category,
      });
    } catch (err) {
      return next(err);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await CategoryService.delete(req.params.id);
      return sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Category deleted.",
        data: null,
      });
    } catch (err) {
      return next(err);
    }
  }
}

