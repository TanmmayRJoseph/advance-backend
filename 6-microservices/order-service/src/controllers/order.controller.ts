import { Response } from "express";
import {
  createOrderService,
  getAllOrdersService,
  getUserOrdersService,
  updateOrderStatusService,
} from "../services/order.service";
import { AuthRequest } from "../middleware/auth.middleware";

// ✅ Create Order (User)
export const createOrderController = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const order = await createOrderService(userId, req.body);

    res.status(201).json(order);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// ✅ Get All Orders (Admin)
export const getAllOrdersController = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const orders = await getAllOrdersService();
    res.json(orders);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get Logged-in User Orders
export const getMyOrdersController = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const userId = req.user?.id;

    const orders = await getUserOrdersService(userId!);
    res.json(orders);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get Orders by userId (Admin)
export const getOrdersByUserIdController = async (
  req: AuthRequest & { params: { userId: string } },
  res: Response
) => {
  try {
    const orders = await getUserOrdersService(req.params.userId);
    res.json(orders);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Update Order Status (Admin)
export const updateOrderStatusController = async (
  req: AuthRequest & { params: { id: string } },
  res: Response
) => {
  try {
    const order = await updateOrderStatusService(
      req.params.id,
      req.body.status
    );

    res.json(order);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};