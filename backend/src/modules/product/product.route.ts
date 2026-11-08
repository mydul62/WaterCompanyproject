import { Router } from "express";
import { ProductController } from "./product.controller";

const router = Router();

// Category routes
router.get("/categories", ProductController.getCategories);
router.post("/categories", ProductController.createCategory);
router.put("/categories/:id", ProductController.updateCategory);
router.delete("/categories/:id", ProductController.deleteCategory);

// Public product routes
router.get("/", ProductController.getAll);
router.get("/admin", ProductController.getAllAdmin);
router.get("/slug/:slug", ProductController.getBySlug);
router.get("/:id", ProductController.getById);

// Admin product routes
router.post("/", ProductController.create);
router.put("/:id", ProductController.update);
router.delete("/:id", ProductController.delete);

export const productRoutes = router;
