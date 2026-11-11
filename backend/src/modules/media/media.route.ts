import { Router } from "express";
import { MediaController, uploadMiddleware } from "./media.controller";

const router = Router();

// Imaple Uploader & Media Library endpoints
router.post("/upload", uploadMiddleware.single("file"), MediaController.upload);
router.post("/upload-multiple", uploadMiddleware.array("files", 10), MediaController.uploadMultiple);
router.get("/assets", MediaController.getAllAssets);
router.put("/assets/:id", MediaController.updateAsset);
router.delete("/assets/:id", MediaController.deleteAsset);

// Press stories endpoints
router.get("/stories", MediaController.getAllStories);
router.get("/stories/slug/:slug", MediaController.getStoryBySlug);
router.get("/stories/:id", MediaController.getStoryById);
router.post("/stories", MediaController.createStory);
router.post("/stories/reset", MediaController.resetStories);
router.put("/stories/:id", MediaController.updateStory);
router.patch("/stories/:id", MediaController.updateStory);
router.delete("/stories/:id", MediaController.deleteStory);

// Backwards compatibility aliases
router.get("/", MediaController.getAllStories);
router.post("/", MediaController.createStory);

export const mediaRoutes = router;
