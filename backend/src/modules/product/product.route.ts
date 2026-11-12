import { Router } from "express";
import { ProductController } from "./product.controller";
import { ProductValidation } from "./product.validation";
import { categoryRoutes } from "../category/category.route";
import { authenticate, authorize } from "../../middlewares/auth.middleware";
import { validateRequest } from "../../middlewares/validate.middleware";

const router = Router();
const requireCmsEditor = [authenticate, authorize("SUPER_ADMIN", "ADMIN", "EDITOR")];

// Nested category routes (/api/v1/products/categories/*)
router.use("/categories", categoryRoutes);

// Public product routes
router.get("/", validateRequest(ProductValidation.list), ProductController.getAll);
router.get("/admin", ...requireCmsEditor, ProductController.getAllAdmin);
router.get("/slug/:slug", ProductController.getBySlug);
router.get("/:id", ProductController.getById);

// Admin product routes
router.post("/", ...requireCmsEditor, validateRequest(ProductValidation.create), ProductController.create);
router.put("/:id", ...requireCmsEditor, validateRequest(ProductValidation.update), ProductController.update);
router.delete("/:id", ...requireCmsEditor, ProductController.delete);

export const productRoutes = router;
