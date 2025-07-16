import { config } from "dotenv";
import {
  NabooPay,
  Wallet,
  ProductModel,
  TransactionRequest,
  CashOutRequest,
} from "../src";

// Load environment variables
config();

async function main() {
  try {
    // Initialize client
    const client = new NabooPay(process.env.NABOOPAY_API_KEY);
    console.log("NabooPay client initialized");

    // Get account info
    console.log("\nGetting account information...");
    const accountInfo = await client.account.getInfo();
    console.log(`Account: ${accountInfo.account_number}`);
    console.log(`Balance: ${accountInfo.balance} CFA`);
    console.log(
      `Status: ${accountInfo.account_is_activate ? "Active" : "Inactive"}`
    );

    // Create a simple transaction
    console.log("\nCreating transaction...");
    const transaction = new TransactionRequest({
      method_of_payment: [Wallet.WAVE, Wallet.ORANGE_MONEY],
      products: [
        new ProductModel({
          name: "Example Product",
          category: "electronics",
          amount: 15000,
          quantity: 1,
          description: "Sample product for testing",
        }),
      ],
    });

    const response = await client.transaction.create(transaction);
    console.log(`Transaction created: ${response.order_id}`);
    console.log(`Checkout URL: ${response.checkout_url}`);

    // Get all transactions
    console.log("\nRetrieving transactions...");
    const allTransactions = await client.transaction.getAll({ limit: 5 });
    console.log(`Found ${allTransactions.transactions.length} transactions`);

    // Perform a cashout (Wave)
    console.log("\nTesting Wave cashout...");
    const cashoutRequest = new CashOutRequest({
      full_name: "Test User",
      amount: 5000,
      phone_number: process.env.TEST_NUMBER_1 || "+221701234567",
    });

    const cashoutResponse = await client.cashout.wave(cashoutRequest);
    console.log(`Cashout status: ${cashoutResponse.status}`);
    console.log(`Amount: ${cashoutResponse.amount} CFA`);
  } catch (error: any) {
    console.error("Error:", error.message);
  }
}

// Run the example
main();
