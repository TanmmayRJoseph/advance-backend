// tests/product.test.ts
import request from "supertest";
import { app } from "../src/server";
import { Product } from "../src/models/Product";

describe("Product API", () => {
  test("should create a product", async () => {
    // Arrange
    const productData = {
      name: "Laptop",
      price: 50000,
    };

    // Act
    const res = await request(app).post("/api/products/create").send(productData);

    // Assert
    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe("Laptop");

    // Verify DB (VERY IMPORTANT 🔥)
    const productInDb = await Product.findOne({ name: "Laptop" });
    expect(productInDb).not.toBeNull();
  });
});
