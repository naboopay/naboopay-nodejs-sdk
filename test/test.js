require('dotenv').config();
const { NabooPay, Wallet, ProductModel, TransactionRequest, DeleteTransactionRequest, CashOutRequest } = require('../index');

// Load API token from environment variables
const token = process.env.NABOOPAY_API_KEY;
const phone_number_1 = process.env.TEST_NUMBER_1
const phone_number_2 = process.env.TEST_NUMBER_2

// Initialize the NabooPay client
const naboopayClient = new NabooPay(token);

// Immediately invoked async function to run all operations sequentially
(async () => {
  // ================================================
  //                  Retrieve account details
  // ================================================
  const accountInfo = await naboopayClient.account.getInfo();
  console.log(accountInfo);

  // ================================================
  //                  Transactions
  // ================================================

  // --------------------|
  // Create Transaction  |
  // --------------------|

  // Prepare a transaction request with multiple payment methods and a product
  const request = new TransactionRequest({
    method_of_payment: [Wallet.WAVE, Wallet.ORANGE_MONEY, Wallet.FREE_MONEY],
    products: [
      new ProductModel({
        name: "T-shirt",
        category: "clothing",
        amount: 10000,
        quantity: 1,
        description: "test description",
      }),
    ],
  });

  // Create the transaction and store the response
  const response = await naboopayClient.transaction.create(request);
  console.log(response);
  const orderId = response.order_id;

  // ------------------------------
  // Delete Transaction
  // ------------------------------

  // Prepare and execute delete request for the created transaction
  const deleteRequest = new DeleteTransactionRequest({ order_id: orderId });
  const deleteResponse = await naboopayClient.transaction.delete(deleteRequest);
  console.log(deleteResponse);

  // ------------------------------
  // Get Transactions
  // ------------------------------

  // Retrieve all transactions
  const allTransactions = await naboopayClient.transaction.getAll();
  console.log(allTransactions);

  // Get one transaction using the first transaction's ID from the list
  if (allTransactions.transactions.length > 0) {
    const transactionId = allTransactions.transactions[0].order_id;
    const oneTransaction = await naboopayClient.transaction.getOne(transactionId);
    console.log(oneTransaction);
  }

  // ================================================
  //               Cashout
  // ================================================

  // ------------------------------
  // Cashout with Wave
  // ------------------------------

  const requestWave = new CashOutRequest({
    full_name: "sudoping01",
    amount: 100,
    phone_number: phone_number_1,  // please when testing don't change this number 😂
  });

  try {
    const responseWave = await naboopayClient.cashout.wave(requestWave);
    console.log(responseWave);
  } catch (e) {
    console.log(`Exception: ${e.message}`);
  }

  // ------------------------------
  // Cashout with Orange Money
  // ------------------------------

  const requestOrange = new CashOutRequest({
    full_name: "Djim Patrick Lo",  // 😂 Patrick
    amount: 100,
    phone_number: phone_number_2,  // please don't forget to change this num to the first one 😂
  });

  try {
    const responseOrange = await naboopayClient.cashout.orangeMoney(requestOrange);
    console.log(responseOrange);
  } catch (e) {
    console.log(`Exception: ${e.message}`);
  }
})();