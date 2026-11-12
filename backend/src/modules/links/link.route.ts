import { Router } from "express";
import { LinkController } from "./link.controller";
import { LinkValidation } from "./link.validation";
import { authenticate, authorize } from "../../middlewares/auth.middleware";
import { validateRequest } from "../../middlewares/validate.middleware";

const router = Router();
const requireCmsEditor = [authenticate, authorize("SUPER_ADMIN", "ADMIN", "EDITOR")];

router.get("/", validateRequest(LinkValidation.list), LinkController.getAll);
router.get("/track/:slug", LinkController.track);
router.post("/", ...requireCmsEditor, validateRequest(LinkValidation.create), LinkController.create);
router.put("/:id", ...requireCmsEditor, validateRequest(LinkValidation.update), LinkController.update);
router.delete("/:id", ...requireCmsEditor, LinkController.delete);

export const linkRoutes = router;

