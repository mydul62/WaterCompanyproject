import { Router } from "express";
import { CareerController } from "./career.controller";
import { CareerJobService } from "./career.service";
import { createCrudController, createCrudRouter } from "../../utils/contentHelpers";
import { authenticate, authorize } from "../../middlewares/auth.middleware";

const router = Router();
const jobController = createCrudController(CareerJobService, "Job opening");
const requireHrOrAdmin = [authenticate, authorize("SUPER_ADMIN", "ADMIN", "EDITOR")];

// Mount /jobs BEFORE /:id so Express resolves /careers/jobs cleanly
router.use("/jobs", createCrudRouter(jobController, { hasResetRoute: true }));

// Public job application submission
router.post("/", CareerController.create);

// Protected admin candidate application management
router.get("/", ...requireHrOrAdmin, CareerController.getAll);
router.get("/:id", ...requireHrOrAdmin, CareerController.getById);
router.patch("/:id/status", ...requireHrOrAdmin, CareerController.updateStatus);
router.put("/:id/status", ...requireHrOrAdmin, CareerController.updateStatus);
router.delete("/:id", ...requireHrOrAdmin, CareerController.delete);

export const careerRoutes = router;
