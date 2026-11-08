import { Router } from "express";
import { PageController } from "./page.controller";

const router = Router();

// Public page fetch by slug
router.get("/slug/:slug", PageController.getBySlug);

// Admin CMS endpoints
router.get("/", PageController.getAll);
router.post("/", PageController.create);
router.get("/:id/editor", PageController.getEditorData);
router.put("/:id", PageController.update);
router.put("/:id/sections", PageController.saveSections);
router.post("/:id/publish", PageController.publish);
router.get("/:id/revisions", PageController.getRevisions);
router.post("/:id/revisions/:revId/restore", PageController.restoreRevision);
router.delete("/:id", PageController.delete);

export const pageRoutes = router;

