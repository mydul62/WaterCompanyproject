import { Router } from "express";
import { SettingsController } from "./settings.controller";
import { SettingsValidation } from "./settings.validation";
import { authenticate, authorize } from "../../middlewares/auth.middleware";
import { validateRequest } from "../../middlewares/validate.middleware";

const router = Router();
const requireCmsEditor = [authenticate, authorize("SUPER_ADMIN", "ADMIN", "EDITOR")];

router.get("/public", SettingsController.getPublic);
router.get("/map", SettingsController.getPublic);
router.get("/", ...requireCmsEditor, SettingsController.getAll);
router.put("/", ...requireCmsEditor, validateRequest(SettingsValidation.update), SettingsController.update);
router.post("/batch", ...requireCmsEditor, validateRequest(SettingsValidation.update), SettingsController.update);

export const settingsRoutes = router;
