import express from "express";
import categoryController from "../Controllers/category.controller.js";

const router = express.Router();

// GET'S
router.get("/getAll", categoryController.getAll);
router.get("/getOne", categoryController.getOne);
router.get("/:id", categoryController.getById);

// POST
router.post("/add", categoryController.add);

// PUT
router.put("/:id", categoryController.updateById);

// DELETE
router.delete("/:id", categoryController.deletebyId);

export default router;
