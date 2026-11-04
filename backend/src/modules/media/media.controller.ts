import { Request, Response, NextFunction } from "express";
import { MediaService } from "./media.service";
import { sendResponse } from "../../utils/response";

export class MediaController {
  static async getAll(_req: Request, res: Response, next: NextFunction) {
    try {
      const stories = await MediaService.getAll();
      return sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Press stories retrieved successfully.",
        data: stories,
      });
    } catch (err) {
      return next(err);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const story = await MediaService.getById(req.params.id);
      return sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Press story retrieved successfully.",
        data: story,
      });
    } catch (err) {
      return next(err);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const story = await MediaService.create(req.body);
      return sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Press story published successfully.",
        data: story,
      });
    } catch (err) {
      return next(err);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const story = await MediaService.update(req.params.id, req.body);
      return sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Press story updated successfully.",
        data: story,
      });
    } catch (err) {
      return next(err);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const story = await MediaService.delete(req.params.id);
      return sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Press story deleted successfully.",
        data: story,
      });
    } catch (err) {
      return next(err);
    }
  }
}
