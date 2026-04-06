// src/routes/productRoutes.ts
import express from "express";
import { Product } from "../models/Product";

const router = express.Router();

// CREATE PRODUCT
router.post("/create", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: "Error creating product" });
  }
});

export default router;