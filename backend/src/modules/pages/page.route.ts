import { Router } from "express";
import { PageController } from "./page.controller";
import { PageValidation } from "./page.validation";
import { authenticate, authorize } from "../../middlewares/auth.middleware";
import { validateRequest } from "../../middlewares/validate.middleware";

const router = Router();
const requireCmsEditor = [authenticate, authorize("SUPER_ADMIN", "ADMIN", "EDITOR")];

// Public page fetch by slug
router.get("/slug/:slug", PageController.getBySlug);

// Admin CMS endpoints
router.get("/", ...requireCmsEditor, PageController.getAll);
router.post("/", ...requireCmsEditor, validateRequest(PageValidation.create), PageController.create);
router.get("/:id", ...requireCmsEditor, PageController.getById);
router.get("/:id/editor", ...requireCmsEditor, PageController.getEditorData);
router.put("/:id", ...requireCmsEditor, validateRequest(PageValidation.update), PageController.update);
router.post("/:id/draft", ...requireCmsEditor, validateRequest(PageValidation.saveDraft), PageController.saveDraft);
router.post("/:id/publish", ...requireCmsEditor, validateRequest(PageValidation.publish), PageController.publish);
router.put("/:id/sections", ...requireCmsEditor, validateRequest(PageValidation.saveSections), PageController.saveSections);
router.put("/:id/reorder", ...requireCmsEditor, validateRequest(PageValidation.reorderSections), PageController.reorderSections);
router.get("/:id/revisions", ...requireCmsEditor, PageController.getRevisions);
router.post("/:id/revisions", ...requireCmsEditor, validateRequest(PageValidation.createRevision), PageController.createRevision);
router.post("/:id/revisions/:revId/restore", ...requireCmsEditor, PageController.restoreRevision);
router.delete("/:id", ...requireCmsEditor, PageController.delete);

export const pageRoutes = router;
