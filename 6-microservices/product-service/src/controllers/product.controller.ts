import { Request, Response } from "express";
import {
  createProductService,
  deleteProductService,
  getAllProductsService,
  getProductByIdService,
  updateProductService,
} from "../services/product.service";

// ✅ Create Product
export const createProductController = async (req: Request, res: Response) => {
  try {
    const product = await createProductService(req.body);
    res.status(201).json(product);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// ✅ Get All Products
export const getAllProductsController = async (req: Request, res: Response) => {
  try {
    const products = await getAllProductsService();
    res.json(products);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get Product By ID
export const getProductByIdController = async (req: Request, res: Response) => {
  try {
    const product = await getProductByIdService(req.params.id as string);
    res.json(product);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

// ✅ Update Product
export const updateProductController = async (req: Request, res: Response) => {
  try {
    const product = await updateProductService(
      req.params.id as string,
      req.body,
    );
    res.json(product);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// ✅ Delete Product
export const deleteProductController = async (req: Request, res: Response) => {
  try {
    const result = await deleteProductService(req.params.id as string);
    res.json(result);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};
