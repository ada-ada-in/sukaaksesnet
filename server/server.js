import express from "express";
import usersRouter from "./routes/users.routes.js";

const app = express();

app.use(express.json());

// Route
app.use(usersRouter);

export default app;
