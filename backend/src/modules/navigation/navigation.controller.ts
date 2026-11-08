import { Request, Response, NextFunction } from "express";
import { NavigationService } from "./navigation.service";
import { sendResponse } from "../../utils/response";

export class NavigationController {
  static async getByLocation(req: Request, res: Response, next: NextFunction) {
    try {
      const menu = await NavigationService.getByLocation(req.params.location);
      return sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Menu retrieved.",
        data: menu,
      });
    } catch (err) {
      return next(err);
    }
  }

  static async getAll(_req: Request, res: Response, next: NextFunction) {
    try {
      const menus = await NavigationService.getAllMenus();
      return sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "All navigation menus retrieved.",
        data: menus,
      });
    } catch (err) {
      return next(err);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, location } = req.body;
      const menu = await NavigationService.createMenu(name, location);
      return sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Menu created.",
        data: menu,
      });
    } catch (err) {
      return next(err);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const menu = await NavigationService.updateMenu(req.params.id, req.body);
      return sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Menu updated.",
        data: menu,
      });
    } catch (err) {
      return next(err);
    }
  }

  static async saveItems(req: Request, res: Response, next: NextFunction) {
    try {
      const { items } = req.body;
      const updated = await NavigationService.saveMenuItems(req.params.id, items || []);
      return sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Menu items saved successfully.",
        data: updated,
      });
    } catch (err) {
      return next(err);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await NavigationService.deleteMenu(req.params.id);
      return sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Menu deleted.",
        data: null,
      });
    } catch (err) {
      return next(err);
    }
  }
}

