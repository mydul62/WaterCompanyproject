import { Router } from "express";
import { SettingsController } from "./settings.controller";

const router = Router();

router.get("/public", SettingsController.getPublic);
router.get("/", SettingsController.getAll);
router.put("/", SettingsController.update);

export const settingsRoutes = router;
