import { Router } from "express";
import { UserController } from "./user.controller";
import { UserValidation } from "./user.validation";
import { authenticate, authorize } from "../../middlewares/auth.middleware";
import { validateRequest } from "../../middlewares/validate.middleware";

const router = Router();

router.use(authenticate, authorize("SUPER_ADMIN", "ADMIN"));

router.get("/", UserController.getAll);
router.post("/", validateRequest(UserValidation.create), UserController.create);
router.put("/:id", validateRequest(UserValidation.update), UserController.update);
router.delete("/:id", UserController.delete);

export const userRoutes = router;

