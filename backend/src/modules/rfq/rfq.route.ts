import { Router } from "express";
import { RFQController } from "./rfq.controller";
import { authenticate, authorize } from "../../middlewares/auth.middleware";

const router = Router();
const requireSalesOrAdmin = [
  authenticate,
  authorize("SUPER_ADMIN", "ADMIN", "SALES_MANAGER", "EDITOR"),
];

// Public B2B inquiry submission
router.post("/", RFQController.create);

// Protected admin/sales inquiry management
router.get("/", ...requireSalesOrAdmin, RFQController.getAll);
router.get("/:id", ...requireSalesOrAdmin, RFQController.getById);
router.patch("/:id/status", ...requireSalesOrAdmin, RFQController.updateStatus);
router.put("/:id/status", ...requireSalesOrAdmin, RFQController.updateStatus);
router.delete("/:id", ...requireSalesOrAdmin, RFQController.delete);

export const rfqRoutes = router;

