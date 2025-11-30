import { PaymentController } from "../app/controllers/payment.controller.js";
import { validatePayment } from "../middleware/validate.middleware.js";
import { paymentLimiter } from "../middleware/rateLimiter.middleware.js";
import { paymentMiddleware, authMiddleware } from "../middleware/auth.middleware.js";
import express from "express";


const paymentRouter = express.Router();
const paymentController = new PaymentController();

paymentRouter.post("/payment", authMiddleware, validatePayment, paymentLimiter, paymentController.postPayment);
paymentRouter.post("/payment/callback", paymentController.callbackPayment);

export default paymentRouter;