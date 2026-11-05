import { Router } from "express";
import { CareerController } from "./career.controller";

const router = Router();

router.get("/", CareerController.getAll);
router.get("/:id", CareerController.getById);
router.post("/", CareerController.create);
router.patch("/:id/status", CareerController.updateStatus);
router.put("/:id/status", CareerController.updateStatus);
router.delete("/:id", CareerController.delete);

export const careerRoutes = router;

