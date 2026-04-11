import express from "express";
import { authProxy } from "./routes/auth.proxy";
import { orderProxy } from "./routes/order.proxy";
import { notificationProxy } from "./routes/notification.proxy";
import { productProxy } from "./routes/product.proxy";


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api/auth", authProxy);
app.use("/api/product", productProxy);
app.use("/api/order", orderProxy);


app.get("/", (req, res) => {
  res.json({ message: "Welcome to the API Gateway!" });
});

app.listen(8080, () => {
  console.log("🚀 API Gateway running on 8080");
});
