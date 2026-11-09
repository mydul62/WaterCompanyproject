import { Request, Response, NextFunction } from "express";
import { PageService } from "./page.service";
import { sendResponse } from "../../utils/response";

export class PageController {
  static async getAll(_req: Request, res: Response, next: NextFunction) {
    try {
      const pages = await PageService.getAll();
      return sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Pages retrieved successfully.",
        data: pages,
      });
    } catch (err) {
      return next(err);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const page = await PageService.getEditorData(req.params.id);
      return sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Page retrieved successfully.",
        data: page,
      });
    } catch (err) {
      return next(err);
    }
  }

  static async getBySlug(req: Request, res: Response, next: NextFunction) {
    try {
      const page = await PageService.getBySlug(req.params.slug);
      return sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Page data retrieved successfully.",
        data: page,
      });
    } catch (err) {
      return next(err);
    }
  }

  static async getEditorData(req: Request, res: Response, next: NextFunction) {
    try {
      const page = await PageService.getEditorData(req.params.id);
      return sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Page editor data retrieved.",
        data: page,
      });
    } catch (err) {
      return next(err);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const page = await PageService.createPage(req.body);
      return sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Page created successfully.",
        data: page,
      });
    } catch (err) {
      return next(err);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const page = await PageService.updatePage(req.params.id, req.body);
      return sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Page settings updated.",
        data: page,
      });
    } catch (err) {
      return next(err);
    }
  }

  static async saveDraft(req: Request, res: Response, next: NextFunction) {
    try {
      const page = await PageService.saveDraft(req.params.id, req.body);
      return sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Draft saved successfully.",
        data: page,
      });
    } catch (err) {
      return next(err);
    }
  }

  static async saveSections(req: Request, res: Response, next: NextFunction) {
    try {
      const { sections } = req.body;
      const updated = await PageService.saveSections(req.params.id, sections || []);
      return sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Sections updated successfully.",
        data: updated,
      });
    } catch (err) {
      return next(err);
    }
  }

  static async reorderSections(req: Request, res: Response, next: NextFunction) {
    try {
      const { sections } = req.body;
      const updated = await PageService.reorderSections(req.params.id, sections || []);
      return sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Sections reordered successfully.",
        data: updated,
      });
    } catch (err) {
      return next(err);
    }
  }

  static async publish(req: any, res: Response, next: NextFunction) {
    try {
      const { notes, publishedContent, draftContent } = req.body;
      const published = await PageService.publishPage(req.params.id, {
        notes,
        author: req.user?.name || "Administrator",
        publishedContent,
        draftContent,
      });
      return sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Page published successfully.",
        data: published,
      });
    } catch (err) {
      return next(err);
    }
  }

  static async createRevision(req: any, res: Response, next: NextFunction) {
    try {
      const { note } = req.body;
      const revision = await PageService.createRevision(req.params.id, note, req.user?.name);
      return sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Revision created successfully.",
        data: revision,
      });
    } catch (err) {
      return next(err);
    }
  }

  static async getRevisions(req: Request, res: Response, next: NextFunction) {
    try {
      const revisions = await PageService.getRevisions(req.params.id);
      return sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Revisions retrieved.",
        data: revisions,
      });
    } catch (err) {
      return next(err);
    }
  }

  static async restoreRevision(req: Request, res: Response, next: NextFunction) {
    try {
      const restored = await PageService.restoreRevision(req.params.id, req.params.revId);
      return sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Revision restored successfully.",
        data: restored,
      });
    } catch (err) {
      return next(err);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await PageService.deletePage(req.params.id);
      return sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Page deleted successfully.",
        data: null,
      });
    } catch (err) {
      return next(err);
    }
  }
}
