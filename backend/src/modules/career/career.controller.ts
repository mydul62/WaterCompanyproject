import { Request, Response, NextFunction } from "express";
import { CareerService } from "./career.service";
import { sendResponse } from "../../utils/response";

export class CareerController {
  static async getAll(_req: Request, res: Response, next: NextFunction) {
    try {
      const candidates = await CareerService.getAll();
      return sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Candidate applications retrieved successfully.",
        data: candidates,
      });
    } catch (err) {
      return next(err);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const candidate = await CareerService.getById(req.params.id);
      return sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Candidate application retrieved successfully.",
        data: candidate,
      });
    } catch (err) {
      return next(err);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const candidate = await CareerService.create(req.body);
      return sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Job application submitted successfully.",
        data: candidate,
      });
    } catch (err) {
      return next(err);
    }
  }

  static async updateStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const { status } = req.body;
      const candidate = await CareerService.updateStatus(req.params.id, status);
      return sendResponse(res, {
        statusCode: 200,
        success: true,
        message: `Candidate status updated to ${status}.`,
        data: candidate,
      });
    } catch (err) {
      return next(err);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const candidate = await CareerService.delete(req.params.id);
      return sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Candidate application deleted successfully.",
        data: candidate,
      });
    } catch (err) {
      return next(err);
    }
  }
}
