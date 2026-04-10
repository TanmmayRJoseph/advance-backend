import express from "express";
import {
  createOrderController,
  getAllOrdersController,
  getMyOrdersController,
  getOrdersByUserIdController,
  updateOrderStatusController,
} from "../controllers/order.controller";

import { verifyJwt, isAdmin } from "../middleware/auth.middleware";

const router = express.Router();

// 🛒 Create Order (User)
router.post("/create-order", verifyJwt, createOrderController);

// 📦 Get All Orders (Admin)
router.get("/admin-all-orders", verifyJwt, isAdmin, getAllOrdersController);

// 👤 Get Logged-in User Orders
router.get("/my-orders", verifyJwt, getMyOrdersController);

// 👤 Get Orders by userId (Admin)
router.get("/user/:userId", verifyJwt, isAdmin, getOrdersByUserIdController);

// 🔄 Update Order Status (Admin)
router.put("/:id/status", verifyJwt, isAdmin, updateOrderStatusController);

export default router;
