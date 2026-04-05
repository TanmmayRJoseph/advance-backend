import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config();


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const PORT = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "Hello from Express + TypeScript 🚀",
    error: false,
    date: new Date().toISOString(),
  });
});


app.listen(PORT, () => {
  console.log(`⚡ Server running at http://localhost:${PORT}`);
});
