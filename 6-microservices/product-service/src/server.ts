import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { connectDB } from "./configs/db";
import productRoutes from "./routes/product.route";

dotenv.config();

connectDB(); // Connect to MongoDB

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send("Hello from product service!");
});

app.get("/health", (req: Request, res: Response) => {
  res.json({ status: "OK" });
});

app.use("/api/products", productRoutes);

app.listen(PORT, () => {
  console.log(`⚡ Server running at http://localhost:${PORT}`);
});
