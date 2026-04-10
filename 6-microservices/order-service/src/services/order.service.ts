import Order, { IOrder } from "../models/order.model";

// ✅ Create Order
export const createOrderService = async (
  userId: string,
  data: Partial<IOrder>
) => {
  const order = await Order.create({
    userId,
    products: data.products,
    totalAmount: 30000
  });

  return order;
};

// ✅ Get All Orders (Admin)
export const getAllOrdersService = async () => {
  return Order.find().sort({ createdAt: -1 });
};

// ✅ Get Orders by User
export const getUserOrdersService = async (userId: string) => {
  return Order.find({ userId }).sort({ createdAt: -1 });
};

// ✅ Update Order Status (Admin)
export const updateOrderStatusService = async (
  orderId: string,
  status: "pending" | "completed" | "cancelled"
) => {
  const order = await Order.findByIdAndUpdate(
    orderId,
    { status },
    { new: true }
  );

  if (!order) {
    throw new Error("Order not found");
  }

  return order;
};