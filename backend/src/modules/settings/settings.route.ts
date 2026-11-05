import { Router } from "express";
import { SettingsController } from "./settings.controller";

const router = Router();

router.get("/", SettingsController.getSettings);
router.put("/", SettingsController.updateSettings);
router.patch("/", SettingsController.updateSettings);

export const settingsRoutes = router;

