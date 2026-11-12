import { Router } from "express";
import { AuthController } from "./auth.controller";
import { authenticate } from "../../middlewares/auth.middleware";

const router = Router();

router.post("/login", AuthController.login);
router.get("/me", authenticate, AuthController.me);
router.post("/change-password", authenticate, AuthController.changePassword);
router.post("/logout", AuthController.logout);

export const authRoutes = router;

