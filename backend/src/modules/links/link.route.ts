import { Router } from "express";
import { LinkController } from "./link.controller";
import { authenticate, authorize } from "../../middlewares/auth.middleware";

const router = Router();
const requireCmsEditor = [authenticate, authorize("SUPER_ADMIN", "ADMIN", "EDITOR")];

router.get("/", LinkController.getAll);
router.get("/track/:slug", LinkController.track);
router.post("/", ...requireCmsEditor, LinkController.create);
router.put("/:id", ...requireCmsEditor, LinkController.update);
router.delete("/:id", ...requireCmsEditor, LinkController.delete);

export const linkRoutes = router;

