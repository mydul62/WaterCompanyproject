import { Request, Response, NextFunction } from "express";
import { MediaService } from "./media.service";
import { sendResponse } from "../../utils/response";
import { ENV, getUploadsDir } from "../../config/env";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import multer from "multer";
import path from "path";
import fs from "fs";

const hasCloudinaryConfig = Boolean(
  ENV.CLOUDINARY_CLOUD_NAME && ENV.CLOUDINARY_API_KEY && ENV.CLOUDINARY_API_SECRET
);

if (hasCloudinaryConfig) {
  cloudinary.config({
    cloud_name: ENV.CLOUDINARY_CLOUD_NAME,
    api_key: ENV.CLOUDINARY_API_KEY,
    api_secret: ENV.CLOUDINARY_API_SECRET,
  });
}

function buildSafeFilename(originalname: string): string {
  const ext = path.extname(originalname) || ".png";
  const cleanBase =
    path
      .basename(originalname, ext)
      .replace(/[^a-zA-Z0-9_-]/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-+|-+$/g, "") || "media";
  const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e5)}`;
  return `${cleanBase}-${uniqueSuffix}${ext}`;
}

async function uploadBufferToCloudinary(
  buffer: Buffer,
  options: { folder: string; publicId: string }
): Promise<UploadApiResponse> {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: options.folder,
        public_id: options.publicId,
        resource_type: "auto",
      },
      (error, result) => {
        if (error || !result) {
          return reject(error || new Error("Cloudinary upload returned no result."));
        }
        resolve(result);
      }
    );
    stream.end(buffer);
  });
}

async function persistAndRegisterFile(
  file: Express.Multer.File,
  meta: { altText?: string; category?: string }
) {
  const filename = buildSafeFilename(file.originalname);
  const category = (meta.category || "GENERAL").trim().toUpperCase();

  let resolvedUrl: string | undefined;
  let width: number | null = null;
  let height: number | null = null;

  if (hasCloudinaryConfig && file.buffer) {
    try {
      const publicId = path.basename(filename, path.extname(filename));
      const cloudRes = await uploadBufferToCloudinary(file.buffer, {
        folder: `${ENV.CLOUDINARY_FOLDER}/${category.toLowerCase()}`,
        publicId,
      });
      resolvedUrl = cloudRes.secure_url || cloudRes.url;
      width = typeof cloudRes.width === "number" ? cloudRes.width : null;
      height = typeof cloudRes.height === "number" ? cloudRes.height : null;
    } catch (cloudErr: any) {
      console.warn(
        "[MediaController] Cloudinary upload failed, falling back to local /uploads:",
        cloudErr?.message || cloudErr
      );
    }
  }

  if (!resolvedUrl) {
    const uploadsDir = getUploadsDir();
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }
    fs.writeFileSync(path.join(uploadsDir, filename), file.buffer);
    resolvedUrl = `/uploads/${filename}`;
  }

  return MediaService.registerUploadedAsset(
    {
      filename,
      originalname: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
    },
    {
      altText: meta.altText,
      category,
      url: resolvedUrl,
      width,
      height,
    }
  );
}

// Configure Multer in-memory storage so uploads work on both Cloudinary and local disk
export const uploadMiddleware = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 15 * 1024 * 1024 }, // 15MB limit
});

export class MediaController {
  // Single Image Upload Handler
  static async upload(req: Request, res: Response, next: NextFunction) {
    try {
      const file = req.file;
      if (!file) {
        return res.status(400).json({ success: false, message: "No file uploaded." });
      }

      const altText = typeof req.body?.altText === "string" ? req.body.altText : undefined;
      const category = typeof req.body?.category === "string" ? req.body.category : undefined;
      const asset = await persistAndRegisterFile(file, { altText, category });

      return sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "File uploaded successfully.",
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

      const category = typeof req.body?.category === "string" ? req.body.category : undefined;
      const results = [];
      for (const file of files) {
        const asset = await persistAndRegisterFile(file, { category });
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
      const { search, type, category } = req.query;
      const assets = await MediaService.getAllAssets(
        search as string | undefined,
        type as string | undefined,
        category as string | undefined
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
  static async getAllStories(req: Request, res: Response, next: NextFunction) {
    try {
      const includeInactive = req.query.all === "true";
      const stories = await MediaService.getAllStories(includeInactive);
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

  static async getStoryBySlug(req: Request, res: Response, next: NextFunction) {
    try {
      const story = await MediaService.getStoryBySlug(req.params.slug);
      return sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Press story retrieved.",
        data: story,
      });
    } catch (err) {
      return next(err);
    }
  }

  static async getStoryById(req: Request, res: Response, next: NextFunction) {
    try {
      const story = await MediaService.getStoryById(req.params.id);
      return sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Press story retrieved.",
        data: story,
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

  static async resetStories(_req: Request, res: Response, next: NextFunction) {
    try {
      const stories = await MediaService.resetStories();
      return sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Press stories reset to defaults.",
        data: stories,
      });
    } catch (err) {
      return next(err);
    }
  }
}
