import { Router } from "express";
import { PageController } from "./page.controller";
import { authenticate, authorize } from "../../middlewares/auth.middleware";

const router = Router();
const requireCmsEditor = [authenticate, authorize("SUPER_ADMIN", "ADMIN", "EDITOR")];

// Public page fetch by slug
router.get("/slug/:slug", PageController.getBySlug);

// Admin CMS endpoints
router.get("/", ...requireCmsEditor, PageController.getAll);
router.post("/", ...requireCmsEditor, PageController.create);
router.get("/:id", ...requireCmsEditor, PageController.getById);
router.get("/:id/editor", ...requireCmsEditor, PageController.getEditorData);
router.put("/:id", ...requireCmsEditor, PageController.update);
router.post("/:id/draft", ...requireCmsEditor, PageController.saveDraft);
router.post("/:id/publish", ...requireCmsEditor, PageController.publish);
router.put("/:id/sections", ...requireCmsEditor, PageController.saveSections);
router.put("/:id/reorder", ...requireCmsEditor, PageController.reorderSections);
router.get("/:id/revisions", ...requireCmsEditor, PageController.getRevisions);
router.post("/:id/revisions", ...requireCmsEditor, PageController.createRevision);
router.post("/:id/revisions/:revId/restore", ...requireCmsEditor, PageController.restoreRevision);
router.delete("/:id", ...requireCmsEditor, PageController.delete);

export const pageRoutes = router;
