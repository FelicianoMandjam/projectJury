import express from "express";
import postController from "../Controllers/post.controller.js";
import upload from "../Services/upload.js";

const router = express.Router();

// GET'S
router.get("/getAll", postController.getAll);
router.get("/getOne", postController.getOne);
router.get("/:id", postController.getById);

// POST
// router.post(
//   "/add",
//   upload.single("avatar"),
//   (req, res, next) => {
//     console.log("Fichier reçu :", req.file);
//     console.log("Données reçues :", req.body);
//     next();
//   },
//   postController.add
// );

router.post("/add", upload.single("avatar"), postController.add);

// PUT
router.put("/:id", postController.updateById);

// DELETE
router.delete("/:id", postController.deletebyId);

export default router;
