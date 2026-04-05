import express, { Request, Response } from "express";
import orderRoutes from "./routes/order.route";
import { connectRabbitMQ } from "./configs/rabbitmq";
import { startOrderConsumer } from "./events/consumer/order.consumer";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send("Hello from Express + TypeScript 🚀");
});

app.use("/api", orderRoutes);

async function startServer() {
  try {
    await connectRabbitMQ(); // Connect to RabbitMQ
    startOrderConsumer(); // Start the order consumer to listen for messages
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error starting the server:", error);
  }
}

startServer();
