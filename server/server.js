import express from "express";
import usersRouter from "./routes/users.routes.js";
import authRouter from "./routes/auth.route.js";
import {errorHandler} from "./middleware/errorHandler.middleware.js";
import {globalLimiter} from "./middleware/rateLimiter.middleware.js";

const app = express();

app.use(express.json());
app.use(globalLimiter);

// Route
app.use('/api', usersRouter);
app.use('/api', authRouter);



// Error Handling Middleware
app.use(errorHandler);

export default app;
