import { Router } from "express";
import { SliderController } from "./slider.controller";

const router = Router();

router.get("/admin", SliderController.getAll);
router.get("/", SliderController.getAll);
router.put("/reorder", SliderController.reorder);
router.post("/reset", SliderController.resetDefaults);
router.get("/:id", SliderController.getById);
router.post("/", SliderController.create);
router.put("/:id", SliderController.update);
router.patch("/:id", SliderController.update);
router.delete("/:id", SliderController.delete);

export const sliderRoutes = router;
