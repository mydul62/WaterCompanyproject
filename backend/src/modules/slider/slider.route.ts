import { Router } from "express";
import { SliderController } from "./slider.controller";
import { authenticate, authenticateIfAllQuery, authorize } from "../../middlewares/auth.middleware";

const router = Router();
const requireCmsEditor = [authenticate, authorize("SUPER_ADMIN", "ADMIN", "EDITOR")];

router.get("/admin", ...requireCmsEditor, SliderController.getAll);
router.get("/", authenticateIfAllQuery, SliderController.getAll);
router.put("/reorder", ...requireCmsEditor, SliderController.reorder);
router.post("/reset", ...requireCmsEditor, SliderController.resetDefaults);
router.get("/:id", SliderController.getById);
router.post("/", ...requireCmsEditor, SliderController.create);
router.put("/:id", ...requireCmsEditor, SliderController.update);
router.patch("/:id", ...requireCmsEditor, SliderController.update);
router.delete("/:id", ...requireCmsEditor, SliderController.delete);

export const sliderRoutes = router;
