import { Router } from "express";
import { CareerController } from "./career.controller";
import { CareerJobService } from "./career.service";
import { createCrudController, createCrudRouter } from "../../utils/contentHelpers";

const router = Router();
const jobController = createCrudController(CareerJobService, "Job opening");

// Mount /jobs BEFORE /:id so Express resolves /careers/jobs cleanly
router.use("/jobs", createCrudRouter(jobController, { hasResetRoute: true }));

// Candidate applications
router.get("/", CareerController.getAll);
router.get("/:id", CareerController.getById);
router.post("/", CareerController.create);
router.patch("/:id/status", CareerController.updateStatus);
router.put("/:id/status", CareerController.updateStatus);
router.delete("/:id", CareerController.delete);

export const careerRoutes = router;
