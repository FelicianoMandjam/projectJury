import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
// Routes
import userRoutes from "./Routes/user.routes.js";
import categoryRoutes from "./Routes/category.routes.js";
import postRoutes from "./Routes/post.routes.js";
import commentRoutes from "./Routes/comments.routes.js";
import productRoutes from "./Routes/product.routes.js";
import contactRoutes from "./Routes/contact.routes.js";
import stripeRoutes from "./Routes/stripe.routes.js";

// APP
dotenv.config();

import "./Models/index.js";

const app = express();

// MiddleWare
app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", true);
  return next();
});

// Prefixes
app.use("/user", userRoutes);
app.use("/category", categoryRoutes);
app.use("/post", postRoutes);
app.use("/comment", commentRoutes);
app.use("/product", productRoutes);
app.use("/contact", contactRoutes);
app.use("/stripe", stripeRoutes);

export default app;
