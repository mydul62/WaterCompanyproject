import { Request, Response, NextFunction } from "express";
import { SliderService } from "./slider.service";
import { sendResponse } from "../../utils/response";

export class SliderController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const includeInactive =
        req.query.all === "true" || req.path.endsWith("/admin");
      const slides = await SliderService.getAll(includeInactive);
      return sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Banner slides retrieved successfully.",
        data: slides,
      });
    } catch (err) {
      return next(err);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const slide = await SliderService.getById(req.params.id);
      return sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Banner slide retrieved successfully.",
        data: slide,
      });
    } catch (err) {
      return next(err);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const slide = await SliderService.create(req.body);
      return sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Banner slide created successfully.",
        data: slide,
      });
    } catch (err) {
      return next(err);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const slide = await SliderService.update(req.params.id, req.body);
      return sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Banner slide updated successfully.",
        data: slide,
      });
    } catch (err) {
      return next(err);
    }
  }

  static async reorder(req: Request, res: Response, next: NextFunction) {
    try {
      const slides = await SliderService.reorder(req.body.orderedIds || []);
      return sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Banner slides reordered successfully.",
        data: slides,
      });
    } catch (err) {
      return next(err);
    }
  }

  static async resetDefaults(_req: Request, res: Response, next: NextFunction) {
    try {
      const slides = await SliderService.resetDefaults();
      return sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Default banner slides restored successfully.",
        data: slides,
      });
    } catch (err) {
      return next(err);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const slide = await SliderService.delete(req.params.id);
      return sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Banner slide deleted successfully.",
        data: slide,
      });
    } catch (err) {
      return next(err);
    }
  }
}
