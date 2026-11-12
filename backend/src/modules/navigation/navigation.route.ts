import { Router } from "express";
import { NavigationController } from "./navigation.controller";
import { NavigationValidation } from "./navigation.validation";
import { authenticate, authorize } from "../../middlewares/auth.middleware";
import { validateRequest } from "../../middlewares/validate.middleware";

const router = Router();
const requireCmsEditor = [authenticate, authorize("SUPER_ADMIN", "ADMIN", "EDITOR")];

// Public menu retrieval
router.get("/location/:location", NavigationController.getByLocation);

// Admin CMS endpoints
router.get("/", ...requireCmsEditor, NavigationController.getAll);
router.post("/", ...requireCmsEditor, validateRequest(NavigationValidation.create), NavigationController.create);
router.put("/:id", ...requireCmsEditor, validateRequest(NavigationValidation.update), NavigationController.update);
router.put("/:id/items", ...requireCmsEditor, validateRequest(NavigationValidation.saveItems), NavigationController.saveItems);
router.delete("/:id", ...requireCmsEditor, NavigationController.delete);

export const navigationRoutes = router;

