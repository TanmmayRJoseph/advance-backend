import {
  calculateDiscount,
  calculateOrderTotal,
  validateLogin,
} from "../src/services/businessLogic";

/*
AAA - Arrange, Act, Assert

1.Arrange-> setup the data
2.act-> call the function
3.assert-> check the result
*/

test("should apply 20% discount for premium users", () => {
  // Arrange
  const price = 1000;
  const userType = "premium";

  // Act
  const discountedPrice = calculateDiscount(price, userType);

  // Assert
  expect(discountedPrice).toBe(800);
});

test("should return true for valid login", () => {
  // Arrange
  const email = "test@mail.com";
  const password = "123456";

  // Act
  const result = validateLogin(email, password);

  // Assert
  expect(result).toBe(true);
});

test("should calculate total correctly", () => {
  // Arrange
  const items = [
    { price: 100, quantity: 2 },
    { price: 50, quantity: 3 }
  ];

  // Act
  const total = calculateOrderTotal(items);

  // Assert
  expect(total).toBe(350);
});


describe("calculateDiscount", () => {
  test("premium user", () => {
    expect(calculateDiscount(1000, "premium")).toBe(800);
  });

  test("regular user", () => {
    expect(calculateDiscount(1000, "regular")).toBe(900);
  });
});