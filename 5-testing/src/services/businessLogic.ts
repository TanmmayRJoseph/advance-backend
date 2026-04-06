export const calculateDiscount = (price: number, userType: string) => {
  if (price <= 0) throw new Error("Invalid price");

  let discount = 0;

  if (userType === "premium") discount = 0.2;
  else if (userType === "regular") discount = 0.1;

  return price - price * discount;
};

export const validateLogin = (email: string, password: string) => {
  if (!email || !password) {
    throw new Error("Missing credentials");
  }

  if (!email.includes("@")) {
    return false;
  }

  if (password.length < 6) {
    return false;
  }

  return true;
};

export const calculateOrderTotal = (items: {
  price: number;
  quantity: number;
}[]) => {
  if (!Array.isArray(items)) throw new Error("Invalid items");

  return items.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);
};
