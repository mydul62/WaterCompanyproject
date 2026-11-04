import { Router } from "express";
import { productRoutes } from "./modules/product/product.route";
import { rfqRoutes } from "./modules/rfq/rfq.route";
import { mediaRoutes } from "./modules/media/media.route";
import { careerRoutes } from "./modules/career/career.route";
import { analyticsRoutes } from "./modules/analytics/analytics.route";
import { settingsRoutes } from "./modules/settings/settings.route";
import { sliderRoutes } from "./modules/slider/slider.route";

const router = Router();

// Modular Domain Routes
router.use("/products", productRoutes);
router.use("/rfq", rfqRoutes);
router.use("/inquiries", rfqRoutes); // alias for parity with shiopikkabbo
router.use("/media", mediaRoutes);
router.use("/careers", careerRoutes);
router.use("/analytics", analyticsRoutes);
router.use("/settings", settingsRoutes);
router.use("/slider", sliderRoutes);
router.use("/banners", sliderRoutes);

export const appRouter = router;
export default router;
