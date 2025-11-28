import { UserController } from "../app/controllers/user.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { globalLimiter } from "../middleware/rateLimiter.middleware.js";
import express from "express";

const router = express.Router();
const userController = new UserController();

router.get("/users", authMiddleware, globalLimiter, userController.getAllUsers);
router.get("/users/me", authMiddleware, globalLimiter, userController.getUserByMe);
router.get("/users/:id", authMiddleware, globalLimiter, userController.getUserById);
router.delete("/users/:id", authMiddleware, globalLimiter, userController.deleteUser);

export default router;