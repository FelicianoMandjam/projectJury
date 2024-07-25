import express from "express";
import productController from "../Controllers/product.controller.js";
const router = express.Router();

// GET'S
router.get("/getAll", productController.getAll);
router.get("/getOne", productController.getOne);
router.get("/:id", productController.getById);

// POST
router.post("/add", productController.add);

// PUT
router.put("/:id", productController.updateById);

// DELETE
router.delete("/:id", productController.deletebyId);

export default router;
