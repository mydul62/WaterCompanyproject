import { Router } from "express";
import { MediaController } from "./media.controller";

const router = Router();

router.get("/", MediaController.getAll);
router.get("/:id", MediaController.getById);
router.post("/", MediaController.create);
router.put("/:id", MediaController.update);
router.patch("/:id", MediaController.update);
router.delete("/:id", MediaController.delete);

export const mediaRoutes = router;
