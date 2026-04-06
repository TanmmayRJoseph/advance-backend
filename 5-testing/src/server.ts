import express, { Request, Response } from "express";
import productRoutes from "./routes/productRoutes";

export const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send("Hello from Express + TypeScript 🚀");
});

app.use("/api/products", productRoutes);

app.listen(PORT, () => {
  console.log(`⚡ Server running at http://localhost:${PORT}`);
});
