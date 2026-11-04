import { Router } from "express";
import { RFQController } from "./rfq.controller";

const router = Router();

router.get("/", RFQController.getAll);
router.get("/:id", RFQController.getById);
router.post("/", RFQController.create);
router.patch("/:id/status", RFQController.updateStatus);
router.put("/:id/status", RFQController.updateStatus);
router.delete("/:id", RFQController.delete);

export const rfqRoutes = router;
