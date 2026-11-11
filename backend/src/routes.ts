import { Router } from "express";
import { authRoutes } from "./modules/auth/auth.route";
import { pageRoutes } from "./modules/pages/page.route";
import { navigationRoutes } from "./modules/navigation/navigation.route";
import { linkRoutes } from "./modules/links/link.route";
import { productRoutes } from "./modules/product/product.route";
import { categoryRoutes } from "./modules/product/category.route";
import { mediaRoutes } from "./modules/media/media.route";
import { settingsRoutes } from "./modules/settings/settings.route";
import { userRoutes } from "./modules/user/user.route";
import { careerRoutes } from "./modules/career/career.route";
import { rfqRoutes } from "./modules/rfq/rfq.route";
import { analyticsRoutes } from "./modules/analytics/analytics.route";
import { sliderRoutes } from "./modules/slider/slider.route";
import { blogRoutes } from "./modules/blog/blog.route";
import { caseStudyRoutes } from "./modules/case-study/caseStudy.route";
import { certificateRoutes } from "./modules/certificate/certificate.route";

const router = Router();

// Modular Domain Routes
router.use("/auth", authRoutes);
router.use("/pages", pageRoutes);
router.use("/navigation", navigationRoutes);
router.use("/links", linkRoutes);
router.use("/products", productRoutes);
router.use("/categories", categoryRoutes);
router.use("/media", mediaRoutes);
router.use("/settings", settingsRoutes);
router.use("/users", userRoutes);
router.use("/careers", careerRoutes);
router.use("/rfq", rfqRoutes);
router.use("/inquiries", rfqRoutes); // alias
router.use("/analytics", analyticsRoutes);
router.use("/slider", sliderRoutes);
router.use("/banners", sliderRoutes);
router.use("/blogs", blogRoutes);
router.use("/case-studies", caseStudyRoutes);
router.use("/certificates", certificateRoutes);

export const appRouter = router;
export default router;
