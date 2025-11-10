import { UserController } from "../app/controllers/user.controller.js";
import express from "express";

const router = express.Router();
const userController = new UserController();

router.get("/users", (req, res) => userController.getAllUsers(req, res));
router.post("/users", (req, res) => userController.createUser(req, res));
router.get("/users/:id", (req, res) => userController.getUserById(req, res));
router.delete("/users/:id", (req, res) => userController.deleteUser(req, res));

export default router;