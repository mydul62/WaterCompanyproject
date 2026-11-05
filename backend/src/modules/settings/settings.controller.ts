import { Request, Response, NextFunction } from "express";
import { SettingsService } from "./settings.service";
import { sendResponse } from "../../utils/response";

export class SettingsController {
  static async getSettings(_req: Request, res: Response, next: NextFunction) {
    try {
      const settings = await SettingsService.getSettings();
      return sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Settings retrieved successfully.",
        data: settings,
      });
    } catch (err) {
      return next(err);
    }
  }

  static async updateSettings(req: Request, res: Response, next: NextFunction) {
    try {
      const settings = await SettingsService.updateSettings(req.body);
      return sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Settings updated successfully.",
        data: settings,
      });
    } catch (err) {
      return next(err);
    }
  }
}

