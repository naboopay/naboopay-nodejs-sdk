import { NabooPay } from "../src";

describe("NabooPay Client", () => {
  describe("Initialization", () => {
    it("should create client with token", () => {
      const client = new NabooPay("test-token");

      expect(client).toBeDefined();
      expect(client.account).toBeDefined();
      expect(client.transaction).toBeDefined();
      expect(client.cashout).toBeDefined();
    });

    it("should use environment variable token", () => {
      const client = new NabooPay();
      expect(client).toBeDefined();
    });

    it("should throw error for missing token", () => {
      delete process.env.NABOOPAY_API_KEY;
      expect(() => new NabooPay("")).toThrow("API token must be provided");

      // Restore env var
      process.env.NABOOPAY_API_KEY = "test-api-key";
    });

    it("should accept custom base URL", () => {
      const client = new NabooPay("test-token", "https://custom.api.com");
      expect(client).toBeDefined();
    });
  });
});
