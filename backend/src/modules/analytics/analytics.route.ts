import { Router } from "express";
import { AnalyticsController } from "./analytics.controller";

const router = Router();

router.get("/", AnalyticsController.getOverview);

export const analyticsRoutes = router;

