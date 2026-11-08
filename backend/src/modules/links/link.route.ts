import { Router } from "express";
import { LinkController } from "./link.controller";

const router = Router();

router.get("/", LinkController.getAll);
router.post("/", LinkController.create);
router.get("/track/:slug", LinkController.track);
router.put("/:id", LinkController.update);
router.delete("/:id", LinkController.delete);

export const linkRoutes = router;

