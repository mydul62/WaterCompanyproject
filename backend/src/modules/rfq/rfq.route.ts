import { Router } from "express";
import { RFQController } from "./rfq.controller";
import { RFQValidation } from "./rfq.validation";
import { authenticate, authorize } from "../../middlewares/auth.middleware";
import { validateRequest } from "../../middlewares/validate.middleware";

const router = Router();
const requireSalesOrAdmin = [
  authenticate,
  authorize("SUPER_ADMIN", "ADMIN", "SALES_MANAGER", "EDITOR"),
];

// Public B2B inquiry submission
router.post("/", validateRequest(RFQValidation.create), RFQController.create);

// Protected admin/sales inquiry management
router.get("/", ...requireSalesOrAdmin, validateRequest(RFQValidation.list), RFQController.getAll);
router.get("/:id", ...requireSalesOrAdmin, RFQController.getById);
router.patch(
  "/:id/status",
  ...requireSalesOrAdmin,
  validateRequest(RFQValidation.updateStatus),
  RFQController.updateStatus
);
router.put(
  "/:id/status",
  ...requireSalesOrAdmin,
  validateRequest(RFQValidation.updateStatus),
  RFQController.updateStatus
);
router.delete("/:id", ...requireSalesOrAdmin, RFQController.delete);

export const rfqRoutes = router;

