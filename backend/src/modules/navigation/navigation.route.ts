import { Router } from "express";
import { NavigationController } from "./navigation.controller";
import { authenticate, authorize } from "../../middlewares/auth.middleware";

const router = Router();
const requireCmsEditor = [authenticate, authorize("SUPER_ADMIN", "ADMIN", "EDITOR")];

// Public menu retrieval
router.get("/location/:location", NavigationController.getByLocation);

// Admin CMS endpoints
router.get("/", ...requireCmsEditor, NavigationController.getAll);
router.post("/", ...requireCmsEditor, NavigationController.create);
router.put("/:id", ...requireCmsEditor, NavigationController.update);
router.put("/:id/items", ...requireCmsEditor, NavigationController.saveItems);
router.delete("/:id", ...requireCmsEditor, NavigationController.delete);

export const navigationRoutes = router;

