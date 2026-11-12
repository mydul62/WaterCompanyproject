import { Router } from "express";
import { MediaController, uploadMiddleware } from "./media.controller";
import { authenticate, authenticateIfAllQuery, authorize } from "../../middlewares/auth.middleware";

const router = Router();
const requireCmsEditor = [authenticate, authorize("SUPER_ADMIN", "ADMIN", "EDITOR")];

// Image Uploader & Media Library endpoints (Admin CMS)
router.post("/upload", ...requireCmsEditor, uploadMiddleware.single("file"), MediaController.upload);
router.post("/upload-multiple", ...requireCmsEditor, uploadMiddleware.array("files", 10), MediaController.uploadMultiple);
router.get("/assets", ...requireCmsEditor, MediaController.getAllAssets);
router.put("/assets/:id", ...requireCmsEditor, MediaController.updateAsset);
router.delete("/assets/:id", ...requireCmsEditor, MediaController.deleteAsset);

// Press stories endpoints
router.get("/stories", authenticateIfAllQuery, MediaController.getAllStories);
router.get("/stories/slug/:slug", MediaController.getStoryBySlug);
router.get("/stories/:id", MediaController.getStoryById);
router.post("/stories", ...requireCmsEditor, MediaController.createStory);
router.post("/stories/reset", ...requireCmsEditor, MediaController.resetStories);
router.put("/stories/:id", ...requireCmsEditor, MediaController.updateStory);
router.patch("/stories/:id", ...requireCmsEditor, MediaController.updateStory);
router.delete("/stories/:id", ...requireCmsEditor, MediaController.deleteStory);

// Backwards compatibility aliases
router.get("/", authenticateIfAllQuery, MediaController.getAllStories);
router.post("/", ...requireCmsEditor, MediaController.createStory);

export const mediaRoutes = router;
