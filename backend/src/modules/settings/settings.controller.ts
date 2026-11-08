import { Request, Response, NextFunction } from "express";
import { SettingsService } from "./settings.service";
import { sendResponse } from "../../utils/response";

export class SettingsController {
  static async getAll(_req: Request, res: Response, next: NextFunction) {
    try {
      const data = await SettingsService.getAll();
      return sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Settings retrieved.",
        data,
      });
    } catch (err) {
      return next(err);
    }
  }

  static async getPublic(_req: Request, res: Response, next: NextFunction) {
    try {
      const data = await SettingsService.getPublic();
      return sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Public settings retrieved.",
        data,
      });
    } catch (err) {
      return next(err);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const updated = await SettingsService.updateBatch(req.body);
      return sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Settings saved successfully.",
        data: updated,
      });
    } catch (err) {
      return next(err);
    }
  }
}
