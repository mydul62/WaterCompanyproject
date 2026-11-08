import { Router } from "express";
import { NavigationController } from "./navigation.controller";

const router = Router();

// Public menu retrieval
router.get("/location/:location", NavigationController.getByLocation);

// Admin CMS endpoints
router.get("/", NavigationController.getAll);
router.post("/", NavigationController.create);
router.put("/:id", NavigationController.update);
router.put("/:id/items", NavigationController.saveItems);
router.delete("/:id", NavigationController.delete);

export const navigationRoutes = router;

