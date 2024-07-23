import express from "express";
import commentsController from "../Controllers/comments.controller.js";
const router = express.Router();

// GET'S
router.get("/getAll", commentsController.getAll);
router.get("/:id", commentsController.getById);

// POST
router.post("/add", commentsController.add);

// DELETE
router.delete("/:id", commentsController.deletebyId);

export default router;
