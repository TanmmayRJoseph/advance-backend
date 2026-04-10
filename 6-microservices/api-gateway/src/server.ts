import express from "express";
import { authProxy } from "./routes/auth.proxy";
import { orderProxy } from "./routes/order.proxy";
import { notificationProxy } from "./routes/notification.proxy";
import { productProxy } from "./routes/product.proxy";

const app = express();

app.use("/api/auth", authProxy);
app.use("/api/product", productProxy);
app.use("/api/order", orderProxy);
app.use("/api/notification", notificationProxy);

app.get("/home", (req, res) => {
  res.json({ message: "Welcome to the API Gateway!" });
});

app.listen(5000, () => {
  console.log("🚀 API Gateway running on 5000");
});
