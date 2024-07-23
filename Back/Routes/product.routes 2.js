import express from "express";
import productController from "../Controllers/product.controller";
const router = express.Router();

// GET'S
router.get("/getAll", productController.getAll);
router.get("/:id", productController.getById);

// POST
router.post("/add", productController.add);

// DELETE
router.delete("/:id", productController.deletebyId);

export default router;
