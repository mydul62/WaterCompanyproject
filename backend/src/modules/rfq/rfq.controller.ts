import { Request, Response, NextFunction } from "express";
import { RFQService } from "./rfq.service";
import { sendResponse } from "../../utils/response";

export class RFQController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await RFQService.getAll(req.query as any);
      return sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "RFQ inquiries retrieved successfully.",
        data: result.rfqs,
        meta: result.meta,
      });
    } catch (err) {
      return next(err);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const rfq = await RFQService.getById(req.params.id);
      return sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "RFQ inquiry retrieved successfully.",
        data: rfq,
      });
    } catch (err) {
      return next(err);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const rfq = await RFQService.create(req.body);
      return sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Request for Quotation registered successfully.",
        data: rfq,
      });
    } catch (err) {
      return next(err);
    }
  }

  static async updateStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const { status } = req.body;
      const rfq = await RFQService.updateStatus(req.params.id, status);
      return sendResponse(res, {
        statusCode: 200,
        success: true,
        message: `RFQ status updated to ${status}.`,
        data: rfq,
      });
    } catch (err) {
      return next(err);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const rfq = await RFQService.delete(req.params.id);
      return sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "RFQ record deleted successfully.",
        data: rfq,
      });
    } catch (err) {
      return next(err);
    }
  }
}

