import express from "express";
import usersRouter from "./routes/users.routes.js";
import authRouter from "./routes/auth.route.js";
import paymentRouter from "./routes/payment.route.js";
import {errorHandler} from "./middleware/errorHandler.middleware.js";
import {globalLimiter} from "./middleware/rateLimiter.middleware.js";

const app = express();

app.set('trust proxy', 1);
app.use(express.json());
app.use(globalLimiter);
app.use(express.json({
  verify: (req, res, buf) => {
    req.rawBody = buf && buf.length ? buf.toString('utf8') : '';
  }
}));

// Route
app.use('/api/v1', usersRouter);
app.use('/api/v1', authRouter);
app.use('/api/v1', paymentRouter)



// Error Handling Middleware
app.use(errorHandler);

export default app;
