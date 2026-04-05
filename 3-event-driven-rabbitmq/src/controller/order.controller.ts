import { publishOrderCreated } from "../events/publisher/order.publisher";
import { Request, Response } from "express";

export async function createOrder(req: Request, res: Response) {
  try {
    const order = req.body;

    console.log("Order saved ", order); // Simulate saving the order to the database
    await publishOrderCreated(order); // Publish the order created event to RabbitMQ
    return res.status(201).json({ message: "Order created successfully" }); // Send a response back to the client
  } catch (error) {
    console.error("Error creating order:", error);
    return res.status(500).json({ message: "Server error" });
  }
}
