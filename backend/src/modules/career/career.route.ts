import { Router } from "express";
import { CareerController, CareerJobController } from "./career.controller";
import { CareerValidation } from "./career.validation";
import { createCrudRouter } from "../../utils/contentHelpers";
import { authenticate, authorize } from "../../middlewares/auth.middleware";
import { validateRequest } from "../../middlewares/validate.middleware";

const router = Router();
const requireHrOrAdmin = [authenticate, authorize("SUPER_ADMIN", "ADMIN", "EDITOR")];

// Mount /jobs BEFORE /:id so Express resolves /careers/jobs cleanly
router.use(
  "/jobs",
  createCrudRouter(CareerJobController, {
    hasResetRoute: true,
    createSchema: CareerValidation.createJob,
    updateSchema: CareerValidation.updateJob,
  })
);

// Public job application submission
router.post("/", validateRequest(CareerValidation.createApplication), CareerController.create);

// Protected admin candidate application management
router.get("/", ...requireHrOrAdmin, validateRequest(CareerValidation.listApplications), CareerController.getAll);
router.get("/:id", ...requireHrOrAdmin, CareerController.getById);
router.patch(
  "/:id/status",
  ...requireHrOrAdmin,
  validateRequest(CareerValidation.updateApplicationStatus),
  CareerController.updateStatus
);
router.put(
  "/:id/status",
  ...requireHrOrAdmin,
  validateRequest(CareerValidation.updateApplicationStatus),
  CareerController.updateStatus
);
router.delete("/:id", ...requireHrOrAdmin, CareerController.delete);

export const careerRoutes = router;
