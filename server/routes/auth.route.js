import { AuthController } from "../app/controllers/auth.controller.js";
import { validateForgetPassword, validateLogin, validateResetPassword, validateUser } from "../middleware/validate.middleware.js";
import { verifyResetTokenMiddleware, authMiddleware } from "../middleware/auth.middleware.js";
import { forgetPasswordLimiter, loginLimiter, logoutLimiter, registerLimiter, resetPasswordLimiter } from "../middleware/rateLimiter.middleware.js";
import express from "express";


const authRouter = express.Router();
const authController = new AuthController();

authRouter.post("/login", validateLogin, loginLimiter, authController.login);
authRouter.post("/register", validateUser, registerLimiter, authController.register);
authRouter.post("/logout", logoutLimiter, authMiddleware, authController.logout);
authRouter.post("/forget-password", validateForgetPassword, forgetPasswordLimiter, authController.forgetPassword);
authRouter.post("/reset-password/:token",validateResetPassword, resetPasswordLimiter, verifyResetTokenMiddleware, authController.resetPassword);

export default authRouter;