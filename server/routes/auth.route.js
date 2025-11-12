import { AuthController } from "../app/controllers/auth.controller.js";
import { validateLogin, validateUser } from "../middleware/validate.middleware.js";
import { loginLimiter, registerLimiter } from "../middleware/rateLimiter.middleware.js";
import express from "express";


const authRouter = express.Router();
const authController = new AuthController();

authRouter.post("/login", validateLogin, loginLimiter, authController.login);
authRouter.post("/register", validateUser, registerLimiter, authController.register);
authRouter.post("/logout", authController.logout);

export default authRouter;