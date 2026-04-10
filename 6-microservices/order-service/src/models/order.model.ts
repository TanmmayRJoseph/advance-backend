import mongoose, { Document, Model } from "mongoose";

// 1. Subdocument interface
export interface IOrderProduct {
  productId: string;
  quantity: number;
  price: number;
}

// 2. Main interface
export interface IOrder extends Document {
  userId: string;
  products: IOrderProduct[];
  totalAmount: number;
  status: "pending" | "completed" | "cancelled";
  createdAt: Date;
  updatedAt: Date;
}

// 3. Schema
const orderSchema = new mongoose.Schema<IOrder>(
  {
    userId: {
      type: String, // from auth service
      required: true,
    },
    products: [
      {
        productId: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "completed", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true },
);

// 4. Model
const Order: Model<IOrder> = mongoose.model<IOrder>("Order", orderSchema);

export default Order;
