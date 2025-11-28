import express from "express";
import { edge } from "../utils/edge.js";

const viewRouter = express.Router();

viewRouter.get("/", async (req, res) => {
  const html = await edge.render("pages/main/index");
  res.send(html);
});

viewRouter.get("/auth/login", async (req, res) => {
  const html = await edge.render("pages/auth/login", { title: "Login" });
  res.send(html);
});

viewRouter.get("/auth/register", async (req, res) => {
  const html = await edge.render("pages/auth/register", { title: "Register" });
  res.send(html);
});

viewRouter.get("/auth/forget-password", async (req, res) => {
  const html = await edge.render("pages/auth/forget-password", { title: "Forgot Password" });
  res.send(html);
});

viewRouter.get("/missing-role", async (req, res) => {
  const html = await edge.render("pages/error/missing-role");
  res.status(404).send(html);
});

viewRouter.get("*", async (req, res) => {
  const html = await edge.render("pages/error/404");
  res.status(404).send(html);
});



export default viewRouter;
