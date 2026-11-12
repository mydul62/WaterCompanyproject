import { Router } from "express";
import { AnalyticsController } from "./analytics.controller";
import { authenticate } from "../../middlewares/auth.middleware";

const router = Router();

router.get("/", authenticate, AnalyticsController.getOverview);
router.get("/overview", authenticate, AnalyticsController.getOverview);

export const analyticsRoutes = router;

