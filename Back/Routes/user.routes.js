import express from "express";
import userController from "../Controllers/user.controller.js";

const router = express.Router();

// GET'S
router.get("/getAll", userController.getAll);

// POST's
router.post("/login", userController.login);
router.post("/register", userController.register);

export default router;
