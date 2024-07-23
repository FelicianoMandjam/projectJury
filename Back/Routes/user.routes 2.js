import express from "express";
import userController from "../Controllers/user.controller.js";

const router = express.Router();

// GET'S
router.get("/getAll", userController.getAll);
router.get("/getByUssername", userController.getByUsername);
router.get("/:id", userController.getById);

// POST's
router.post("/login", userController.login);
router.post("/register", userController.register);

// DELETE
router.delete("/:id", userController.deleteById);

// UPDATE
router.put("/:id", userController.updateById);

export default router;
