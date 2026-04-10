import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { connectDB } from "./configs/db";
import orderRoutes from "./routes/order.routes";

dotenv.config();

connectDB(); // Connect to MongoDB

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello from Order Service" });
});

app.get("/api/health", (req: Request, res: Response) => {
  res.json({ status: "OK", timestamp: new Date() });
});

app.use("/api/orders", orderRoutes);

app.listen(PORT, () => {
  console.log(`⚡ Server running at http://localhost:${PORT}`);
});
