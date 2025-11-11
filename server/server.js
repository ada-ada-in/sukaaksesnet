import express from "express";
import usersRouter from "./routes/users.routes.js";
import {errorHandler} from "./middleware/errorHandler.middleware.js";
import {globalLimiter} from "./middleware/rateLimiter.middleware.js";

const app = express();

app.use(express.json());
app.use(globalLimiter);

// Route
app.use('/api',usersRouter);



// Error Handling Middleware
app.use(errorHandler);

export default app;
