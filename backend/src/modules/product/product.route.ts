import { Router } from "express";
import { ProductController } from "./product.controller";
import { authenticate, authorize } from "../../middlewares/auth.middleware";

const router = Router();
const requireCmsEditor = [authenticate, authorize("SUPER_ADMIN", "ADMIN", "EDITOR")];

// Category routes
router.get("/categories", ProductController.getCategories);
router.get("/categories/all", ProductController.getCategories);
router.post("/categories", ...requireCmsEditor, ProductController.createCategory);
router.put("/categories/:id", ...requireCmsEditor, ProductController.updateCategory);
router.delete("/categories/:id", ...requireCmsEditor, ProductController.deleteCategory);

// Public product routes
router.get("/", ProductController.getAll);
router.get("/admin", ...requireCmsEditor, ProductController.getAllAdmin);
router.get("/slug/:slug", ProductController.getBySlug);
router.get("/:id", ProductController.getById);

// Admin product routes
router.post("/", ...requireCmsEditor, ProductController.create);
router.put("/:id", ...requireCmsEditor, ProductController.update);
router.delete("/:id", ...requireCmsEditor, ProductController.delete);

export const productRoutes = router;
