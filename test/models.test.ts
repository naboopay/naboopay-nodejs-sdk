import {
  ProductModel,
  TransactionRequest,
  CashOutRequest,
  Wallet,
} from "../src";

describe("Models", () => {
  describe("ProductModel", () => {
    it("should create and convert to JSON", () => {
      const product = new ProductModel({
        name: "T-shirt",
        category: "clothing",
        amount: 10000,
        quantity: 1,
        description: "Cotton T-shirt",
      });

      expect(product.name).toBe("T-shirt");
      expect(product.amount).toBe(10000);
      expect(product.toJSON()).toEqual({
        name: "T-shirt",
        category: "clothing",
        amount: 10000,
        quantity: 1,
        description: "Cotton T-shirt",
      });
    });
  });

  describe("TransactionRequest", () => {
    it("should create transaction with products", () => {
      const request = new TransactionRequest({
        method_of_payment: [Wallet.WAVE],
        products: [
          {
            name: "Test Product",
            category: "test",
            amount: 5000,
            quantity: 1,
            description: "Test",
          },
        ],
      });

      expect(request.method_of_payment).toEqual([Wallet.WAVE]);
      expect(request.products).toHaveLength(1);
    });

    it("should create transaction without products", () => {
      const request = new TransactionRequest({
        method_of_payment: [Wallet.WAVE],
      });

      expect(request.products).toBeNull();
    });
  });

  describe("CashOutRequest", () => {
    it("should create cashout request", () => {
      const request = new CashOutRequest({
        full_name: "John Doe",
        amount: 25000,
        phone_number: "+221701234567",
      });

      expect(request.full_name).toBe("John Doe");
      expect(request.amount).toBe(25000);
      expect(request.toJSON()).toEqual({
        full_name: "John Doe",
        amount: 25000,
        phone_number: "+221701234567",
      });
    });
  });
});
