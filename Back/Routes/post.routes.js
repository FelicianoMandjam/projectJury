import express from "express";
import postController from "../Controllers/post.controller.js";

const router = express.Router();

// GET'S
router.get("/getAll", postController.getAll);
router.get("/getOne", postController.getOne);
router.get("/:id", postController.getById);

// POST
router.post("/add", postController.add);

// PUT
router.put("/:id", postController.updateById);

// DELETE
router.delete("/:id", postController.deletebyId);

export default router;
