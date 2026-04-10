import express from "express";
import {
  createProductController,
  deleteProductController,
  getAllProductsController,
  getProductByIdController,
  updateProductController,
} from "../controllers/product.controller";
import { verifyJwt, isAdmin } from "../middleware/auth.middleware";


const router = express.Router();

router.get("/get-products", getAllProductsController);

router.get("/get-product/:id", getProductByIdController);

router.post("/create-product",verifyJwt, isAdmin, createProductController);

router.put("/update-product/:id",verifyJwt, isAdmin, updateProductController);

router.delete("/delete-product/:id",verifyJwt, isAdmin, deleteProductController);

export default router;