import express from "express";
import { sendMail } from "../Controllers/contact.controller.js";

const router = express.Router();

// GET'S
// http://localhost:3001/contact/post
router.post("/post", sendMail);

export default router;
