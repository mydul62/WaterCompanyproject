import { Router } from "express";
import { UserController } from "./user.controller";
import { authenticate, authorize } from "../../middlewares/auth.middleware";

const router = Router();

router.use(authenticate, authorize("SUPER_ADMIN", "ADMIN"));

router.get("/", UserController.getAll);
router.post("/", UserController.create);
router.put("/:id", UserController.update);
router.delete("/:id", UserController.delete);

export const userRoutes = router;

