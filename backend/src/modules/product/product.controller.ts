import { Request, Response, NextFunction } from "express";
import { ProductService } from "./product.service";
import { sendResponse } from "../../utils/response";

export class ProductController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const products = await ProductService.getAll(req.query as any);
      return sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Products retrieved successfully.",
        data: products,
      });
    } catch (err) {
      return next(err);
    }
  }

  static async getAllAdmin(_req: Request, res: Response, next: NextFunction) {
    try {
      const products = await ProductService.getAllAdmin();
      return sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Admin products retrieved.",
        data: products,
      });
    } catch (err) {
      return next(err);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const product = await ProductService.getById(req.params.id);
      return sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Product retrieved successfully.",
        data: product,
      });
    } catch (err) {
      return next(err);
    }
  }

  static async getBySlug(req: Request, res: Response, next: NextFunction) {
    try {
      const product = await ProductService.getBySlug(req.params.slug);
      return sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Product retrieved successfully.",
        data: product,
      });
    } catch (err) {
      return next(err);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const product = await ProductService.create(req.body);
      return sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Product created successfully.",
        data: product,
      });
    } catch (err) {
      return next(err);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const product = await ProductService.update(req.params.id, req.body);
      return sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Product updated successfully.",
        data: product,
      });
    } catch (err) {
      return next(err);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await ProductService.delete(req.params.id);
      return sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Product deleted successfully.",
        data: null,
      });
    } catch (err) {
      return next(err);
    }
  }

  // Category endpoints
  static async getCategories(_req: Request, res: Response, next: NextFunction) {
    try {
      const categories = await ProductService.getCategories();
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

  static async createCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const category = await ProductService.createCategory(req.body);
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

  static async updateCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const category = await ProductService.updateCategory(req.params.id, req.body);
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

  static async deleteCategory(req: Request, res: Response, next: NextFunction) {
    try {
      await ProductService.deleteCategory(req.params.id);
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
