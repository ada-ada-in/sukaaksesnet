import { AuthController } from "../app/controllers/auth.contoller.js";
import { validateLogin } from "../middleware/validate.middleware.js";
import { loginLimiter } from "../middleware/rateLimiter.middleware.js";
import express from "express";


const authRouter = express.Router();
const authController = new AuthController();

authRouter.post("/login", validateLogin, loginLimiter, (req, res) => authController.login(req, res));

export default authRouter;