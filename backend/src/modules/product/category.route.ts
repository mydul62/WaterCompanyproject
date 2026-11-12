import { Router } from "express";
import { ProductController } from "./product.controller";
import { authenticate, authorize } from "../../middlewares/auth.middleware";

const router = Router();
const requireCmsEditor = [authenticate, authorize("SUPER_ADMIN", "ADMIN", "EDITOR")];

router.get("/", ProductController.getCategories);
router.get("/all", ProductController.getCategories);
router.post("/", ...requireCmsEditor, ProductController.createCategory);
router.put("/:id", ...requireCmsEditor, ProductController.updateCategory);
router.delete("/:id", ...requireCmsEditor, ProductController.deleteCategory);

export const categoryRoutes = router;

