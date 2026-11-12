import { Router } from "express";
import { CategoryController } from "./category.controller";
import { CategoryValidation } from "./category.validation";
import { authenticate, authorize } from "../../middlewares/auth.middleware";
import { validateRequest } from "../../middlewares/validate.middleware";

const router = Router();
const requireCmsEditor = [authenticate, authorize("SUPER_ADMIN", "ADMIN", "EDITOR")];

router.get("/", CategoryController.getAll);
router.get("/all", CategoryController.getAll);
router.post("/", ...requireCmsEditor, validateRequest(CategoryValidation.create), CategoryController.create);
router.put("/:id", ...requireCmsEditor, validateRequest(CategoryValidation.update), CategoryController.update);
router.delete("/:id", ...requireCmsEditor, CategoryController.delete);

export const categoryRoutes = router;

