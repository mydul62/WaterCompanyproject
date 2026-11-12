import { Router } from "express";
import { SettingsController } from "./settings.controller";
import { authenticate, authorize } from "../../middlewares/auth.middleware";

const router = Router();
const requireCmsEditor = [authenticate, authorize("SUPER_ADMIN", "ADMIN", "EDITOR")];

router.get("/public", SettingsController.getPublic);
router.get("/map", SettingsController.getPublic);
router.get("/", ...requireCmsEditor, SettingsController.getAll);
router.put("/", ...requireCmsEditor, SettingsController.update);
router.post("/batch", ...requireCmsEditor, SettingsController.update);

export const settingsRoutes = router;
