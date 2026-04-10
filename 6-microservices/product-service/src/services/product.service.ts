import Product, { IProduct } from "../models/product.model";

// ✅ Create Product
export const createProductService = async (data: Partial<IProduct>) => {
  const product = await Product.create(data);
  return product;
};

// ✅ Get All Products
export const getAllProductsService = async () => {
  return Product.find();
};

// ✅ Get Product By ID
export const getProductByIdService = async (id: string) => {
  const product = await Product.findById(id);
  if (!product) {
    throw new Error("Product not found");
  }
  return product;
};

// ✅ Update Product
export const updateProductService = async (
  id: string,
  data: Partial<IProduct>
) => {
  const product = await Product.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });

  if (!product) {
    throw new Error("Product not found");
  }

  return product;
};

// ✅ Delete Product
export const deleteProductService = async (id: string) => {
  const product = await Product.findByIdAndDelete(id);

  if (!product) {
    throw new Error("Product not found");
  }

  return { message: "Product deleted successfully" };
};