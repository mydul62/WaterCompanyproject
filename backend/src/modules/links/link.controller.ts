import { Request, Response, NextFunction } from "express";
import { LinkService } from "./link.service";
import { sendResponse } from "../../utils/response";

export class LinkController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const { category, search } = req.query;
      const links = await LinkService.getAll(
        category as string | undefined,
        search as string | undefined
      );
      return sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Links retrieved.",
        data: links,
      });
    } catch (err) {
      return next(err);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const link = await LinkService.createLink(req.body);
      return sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Link created successfully.",
        data: link,
      });
    } catch (err) {
      return next(err);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const link = await LinkService.updateLink(req.params.id, req.body);
      return sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Link updated successfully.",
        data: link,
      });
    } catch (err) {
      return next(err);
    }
  }

  static async track(req: Request, res: Response, next: NextFunction) {
    try {
      const link = await LinkService.trackClick(req.params.slug);
      return sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Click tracked.",
        data: link,
      });
    } catch (err) {
      return next(err);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await LinkService.deleteLink(req.params.id);
      return sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Link deleted successfully.",
        data: null,
      });
    } catch (err) {
      return next(err);
    }
  }
}

