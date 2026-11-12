import { Router } from "express";
import { SliderController } from "./slider.controller";
import { SliderValidation } from "./slider.validation";
import { authenticate, authenticateIfAllQuery, authorize } from "../../middlewares/auth.middleware";
import { validateRequest } from "../../middlewares/validate.middleware";

const router = Router();
const requireCmsEditor = [authenticate, authorize("SUPER_ADMIN", "ADMIN", "EDITOR")];

router.get("/admin", ...requireCmsEditor, SliderController.getAll);
router.get("/", authenticateIfAllQuery, SliderController.getAll);
router.put("/reorder", ...requireCmsEditor, validateRequest(SliderValidation.reorder), SliderController.reorder);
router.post("/reset", ...requireCmsEditor, SliderController.resetDefaults);
router.get("/:id", SliderController.getById);
router.post("/", ...requireCmsEditor, validateRequest(SliderValidation.create), SliderController.create);
router.put("/:id", ...requireCmsEditor, validateRequest(SliderValidation.update), SliderController.update);
router.patch("/:id", ...requireCmsEditor, validateRequest(SliderValidation.update), SliderController.update);
router.delete("/:id", ...requireCmsEditor, SliderController.delete);

export const sliderRoutes = router;
