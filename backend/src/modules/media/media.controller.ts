import { Request, Response, NextFunction } from "express";
import { MediaService } from "./media.service";
import { sendResponse } from "../../utils/response";
import multer from "multer";
import path from "path";
import fs from "fs";

// Configure Multer Storage for Imaple Uploader
const uploadsDir = path.join(process.cwd(), "public", "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname);
    const cleanBase = path.basename(file.originalname, ext).replace(/[^a-zA-Z0-9_-]/g, "");
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e5)}`;
    cb(null, `${cleanBase}-${uniqueSuffix}${ext}`);
  },
});

export const uploadMiddleware = multer({
  storage,
  limits: { fileSize: 15 * 1024 * 1024 }, // 15MB limit
});

export class MediaController {
  // Imaple Media Upload Handler
  static async upload(req: Request, res: Response, next: NextFunction) {
    try {
      const file = req.file;
      if (!file) {
        return res.status(400).json({ success: false, message: "No file uploaded." });
      }

      const altText = req.body.altText;
      const asset = await MediaService.registerUploadedAsset(file, altText);

      return sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "File uploaded successfully via Imaple Uploader.",
        data: asset,
      });
    } catch (err) {
      return next(err);
    }
  }

  // Multi-file upload
  static async uploadMultiple(req: Request, res: Response, next: NextFunction) {
    try {
      const files = req.files as Express.Multer.File[];
      if (!files || files.length === 0) {
        return res.status(400).json({ success: false, message: "No files uploaded." });
      }

      const results = [];
      for (const file of files) {
        const asset = await MediaService.registerUploadedAsset(file);
        results.push(asset);
      }

      return sendResponse(res, {
        statusCode: 201,
        success: true,
        message: `${results.length} files uploaded successfully.`,
        data: results,
      });
    } catch (err) {
      return next(err);
    }
  }

  static async getAllAssets(req: Request, res: Response, next: NextFunction) {
    try {
      const { search, type } = req.query;
      const assets = await MediaService.getAllAssets(
        search as string | undefined,
        type as string | undefined
      );
      return sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Media assets retrieved.",
        data: assets,
      });
    } catch (err) {
      return next(err);
    }
  }

  static async updateAsset(req: Request, res: Response, next: NextFunction) {
    try {
      const asset = await MediaService.updateAsset(req.params.id, req.body);
      return sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Asset updated successfully.",
        data: asset,
      });
    } catch (err) {
      return next(err);
    }
  }

  static async deleteAsset(req: Request, res: Response, next: NextFunction) {
    try {
      await MediaService.deleteAsset(req.params.id);
      return sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Asset deleted.",
        data: null,
      });
    } catch (err) {
      return next(err);
    }
  }

  // Press Stories
  static async getAllStories(_req: Request, res: Response, next: NextFunction) {
    try {
      const stories = await MediaService.getAllStories();
      return sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Press stories retrieved.",
        data: stories,
      });
    } catch (err) {
      return next(err);
    }
  }

  static async createStory(req: Request, res: Response, next: NextFunction) {
    try {
      const story = await MediaService.createStory(req.body);
      return sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Press story created.",
        data: story,
      });
    } catch (err) {
      return next(err);
    }
  }

  static async updateStory(req: Request, res: Response, next: NextFunction) {
    try {
      const story = await MediaService.updateStory(req.params.id, req.body);
      return sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Press story updated.",
        data: story,
      });
    } catch (err) {
      return next(err);
    }
  }

  static async deleteStory(req: Request, res: Response, next: NextFunction) {
    try {
      await MediaService.deleteStory(req.params.id);
      return sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Story deleted.",
        data: null,
      });
    } catch (err) {
      return next(err);
    }
  }
}
