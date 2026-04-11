import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { connectDB } from "./configs/db";
import userRoutes from "./routes/auth.routes";
import { connectRabbitMQ } from "./configs/rabbitmq";

dotenv.config();

connectDB(); // Connect to MongoDB

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.urlencoded({ extended: true }));

app.get("/home", (req: Request, res: Response) => {
  res.json({ message: "Welcome to the Auth Service!" });
});

app.get("/health", (req: Request, res: Response) => {
  res.json({ status: "OK" });
});

app.use("/", userRoutes);

const startServer = async () => {
  try {
    await connectRabbitMQ(); // 🔥 MUST await

    app.listen(PORT, () => {
      console.log(`⚡ Server running at http://localhost:${PORT}`);
      console.log("✅ RabbitMQ connected");
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
