import axios from "axios";
import { NabooPay, Wallet, TransactionRequest, CashOutRequest } from "../src";

// Create mock function
const mockAxios = axios as jest.MockedFunction<typeof axios>;

describe("Services", () => {
  let client: NabooPay;

  beforeEach(() => {
    jest.clearAllMocks();
    client = new NabooPay("test-token");
  });

  describe("Account Service", () => {
    it("should get account info", async () => {
      const mockResponse = {
        data: {
          account_number: "123456789",
          balance: 75000,
          account_is_activate: true,
          method_of_payment: [Wallet.WAVE],
          loyalty_credit: 2500,
        },
      };

      mockAxios.mockResolvedValueOnce(mockResponse);

      const accountInfo = await client.account.getInfo();

      expect(accountInfo.account_number).toBe("123456789");
      expect(accountInfo.balance).toBe(75000);
      expect(mockAxios).toHaveBeenCalledTimes(1);
    });
  });

  describe("Transaction Service", () => {
    it("should create transaction", async () => {
      const mockResponse = {
        data: {
          order_id: "order-12345",
          method_of_payment: [Wallet.WAVE],
          amount: 10000,
          amount_to_pay: 10500,
          created_at: "2024-01-15T10:30:00Z",
          checkout_url: "https://checkout.naboopay.com/pay/order-12345",
        },
      };

      mockAxios.mockResolvedValueOnce(mockResponse);

      const request = new TransactionRequest({
        method_of_payment: [Wallet.WAVE],
      });

      const response = await client.transaction.create(request);

      expect(response.order_id).toBe("order-12345");
      expect(response.amount).toBe(10000);
      expect(mockAxios).toHaveBeenCalledTimes(1);
    });
  });

  describe("Cashout Service", () => {
    it("should perform Wave cashout", async () => {
      const mockResponse = {
        data: {
          phone_number: "+221701234567",
          amount: 15000,
          full_name: "John Doe",
          status: "pending",
        },
      };

      mockAxios.mockResolvedValueOnce(mockResponse);

      const request = new CashOutRequest({
        full_name: "John Doe",
        amount: 15000,
        phone_number: "+221701234567",
      });

      const response = await client.cashout.wave(request);

      expect(response.phone_number).toBe("+221701234567");
      expect(response.amount).toBe(15000);
      expect(mockAxios).toHaveBeenCalledTimes(1);
    });
  });
});
