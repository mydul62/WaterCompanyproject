import { Router } from "express";
import { ProductController } from "./product.controller";

const router = Router();

router.get("/", ProductController.getCategories);
router.get("/all", ProductController.getCategories);
router.post("/", ProductController.createCategory);
router.put("/:id", ProductController.updateCategory);
router.delete("/:id", ProductController.deleteCategory);

export const categoryRoutes = router;

