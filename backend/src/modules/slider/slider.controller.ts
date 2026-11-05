import { Request, Response, NextFunction } from "express";
import { SliderService } from "./slider.service";
import { sendResponse } from "../../utils/response";

export class SliderController {
  static async getAll(_req: Request, res: Response, next: NextFunction) {
    try {
      const slides = await SliderService.getAll();
      return sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Slider items retrieved successfully.",
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
        message: "Slide retrieved successfully.",
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
        message: "Slide created successfully.",
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
        message: "Slide updated successfully.",
        data: slide,
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
        message: "Slide deleted successfully.",
        data: slide,
      });
    } catch (err) {
      return next(err);
    }
  }
}

