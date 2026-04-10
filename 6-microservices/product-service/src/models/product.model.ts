import mongoose, { Document, Model } from "mongoose";

// 1. Interface
export interface IProduct extends Document {
  name: string;
  description?: string;
  price: number;
  stock: number;
  category?: string;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}

// 2. Schema
const productSchema = new mongoose.Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
    },
    description: String,
    price: {
      type: Number,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    category: String,
    image: String,
  },
  { timestamps: true }
);

// 3. Model
const Product: Model<IProduct> = mongoose.model<IProduct>(
  "Product",
  productSchema
) || mongoose.models.Product;

export default Product;