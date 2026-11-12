import { Router } from "express";
import { AuthController } from "./auth.controller";
import { AuthValidation } from "./auth.validation";
import { authenticate } from "../../middlewares/auth.middleware";
import { validateRequest } from "../../middlewares/validate.middleware";

const router = Router();

router.post("/login", validateRequest(AuthValidation.login), AuthController.login);
router.get("/me", authenticate, AuthController.me);
router.post(
  "/change-password",
  authenticate,
  validateRequest(AuthValidation.changePassword),
  AuthController.changePassword
);
router.post("/logout", AuthController.logout);

export const authRoutes = router;

