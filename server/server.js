import express from "express";
import usersRouter from "./routes/users.routes.js";
import {errorHandler} from "./middleware/errorHandler.middleware.js";

const app = express();

app.use(express.json());

// Route
app.use('/api',usersRouter);



// Error Handling Middleware
app.use(errorHandler);

export default app;
