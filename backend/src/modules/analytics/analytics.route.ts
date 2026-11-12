import { Router } from "express";
import { AnalyticsController } from "./analytics.controller";
import { AnalyticsValidation } from "./analytics.validation";
import { authenticate } from "../../middlewares/auth.middleware";
import { validateRequest } from "../../middlewares/validate.middleware";

const router = Router();

router.get(
  "/",
  authenticate,
  validateRequest(AnalyticsValidation.overview),
  AnalyticsController.getOverview
);
router.get(
  "/overview",
  authenticate,
  validateRequest(AnalyticsValidation.overview),
  AnalyticsController.getOverview
);

export const analyticsRoutes = router;

