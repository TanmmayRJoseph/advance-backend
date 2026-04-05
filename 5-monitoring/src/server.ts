import express, { Request, Response } from "express";
import { getRandomValue } from "./utils/random";
import { collectDefaultMetrics } from "prom-client"; //prometheus client
import { register } from "prom-client"; //prometheus client
import morgan from "morgan";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(morgan("dev"));
const PORT = process.env.PORT || 3000;

// calling the function to collect default metrics
collectDefaultMetrics({ register: register }); //register is the default registry where all metrics are registered

app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "Hello from Express + TypeScript 🚀",
    error: false,
    date: new Date().toISOString(),
  });
});

app.get("/slow", async (req: Request, res: Response) => {
  try {
    const { value, success,latency } = await getRandomValue();
    res.json({ value, success, latency });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to fetch random value" });
  }
});

// route to expose the metrics to prometheus [ this just gives the raw metrics ]
app.get("/metrics", async (req: Request, res: Response) => {
  try {
    res.setHeader("Content-Type", register.contentType);
    const metrics = await register.metrics();
    res.send(metrics);
  } catch (error) {
    console.error("Error fetching metrics:", error);
    res.status(500).send("Error fetching metrics");
  }
});

app.listen(PORT, () => {
  console.log(`⚡ Server running at http://localhost:${PORT}`);
});
