# NabooPay Node.js SDK Workshop

Hey there! Welcome to this fun and practical workshop on using the NabooPay Node.js SDK. This guide will walk you through installing the SDK, setting up the client, and performing cool operations like retrieving account details, managing transactions, and handling cashouts—all with a sprinkle of humor to keep things light. Since Node.js loves async, all our examples use `async/await`. Let’s dive in!

## Table of Contents

1. [Installation](#installation)
2. [Client Initialization](#client-initialization)
   - 2.1 [Token Loading](#token-loading)
   - 2.2 [Client Setup](#client-setup)
3. [Operations](#operations)
   - 3.1 [Retrieve Account Details](#retrieve-account-details)
   - 3.2 [Transactions](#transactions)
     - 3.2.1 [Create Transaction](#create-transaction)
     - 3.2.2 [Delete Transaction](#delete-transaction)
     - 3.2.3 [Get Transactions](#get-transactions)
   - 3.3 [Cashout](#cashout)
     - 3.3.1 [Cashout with Wave](#cashout-with-wave)
     - 3.3.2 [Cashout with Orange Money](#cashout-with-orange-money)

---

## Installation

Kick things off by installing the NabooPay Node.js SDK. Clone the repo and install dependencies with these commands:

```bash
npm install git+https://github.com/naboopay/naboopay-nodejs-sdk.git

```

---

## Client Initialization

Before we get fancy, we need to set up our client. This involves loading the API token and initializing the SDK.

### Token Loading

Grab your API token from a `.env` file it’s the safest way to keep secrets! Get one from the NabooPay dashboard if you don’t have it yet.

```javascript
require('dotenv').config();
const token = process.env.NABOOPAY_API_KEY;
// Alternatively: const token = "your_token_here"; (but shh, that’s not safe!)

// You wanna know my phone number 😂, no bro you can't 🙃 let's load them as env var
const phone_number_1 = process.env.PHONE_NUMBER_1
const phone_number_2 = process.env.PHONE_NUMBER_2
```

### Client Setup

Set up the client with your token. All methods are async, so get ready to `await`!

```javascript
const { NabooPay } = require('naboopay');

const naboopayClient = new NabooPay(token);
```

---

## Operations

Now for the fun part—let’s do stuff with the NabooPay API! We’ll cover account details, transactions, and cashouts, all async style.

### Retrieve Account Details

Peek at your account info with this simple call:

```javascript
async function getAccountInfo() {
  const accountInfo = await naboopayClient.account.getInfo();
  console.log(accountInfo);
}

getAccountInfo();
```

---

### Transactions

Time to play with transactions create, delete, and fetch them!

#### Create Transaction

Whip up a transaction with payment methods and a snazzy T-shirt product. Add more items if you’re feeling fancy!

```javascript
const { TransactionRequest, ProductModel, Wallet } = require('naboopay');

const request = new TransactionRequest({
  method_of_payment: [Wallet.WAVE, Wallet.ORANGE_MONEY, Wallet.FREE_MONEY],
  products: [
    new ProductModel({
      name: 'T-shirt',
      category: 'clothing',
      amount: 10000,
      quantity: 1,
      description: 'test description',
    }),
    // Add more products here if you’re feeling fancy!
  ],
});

async function createTransaction() {
  const response = await naboopayClient.transaction.create(request);
  console.log(response);
  return response;
}

createTransaction().then(response => {
  // Save response for later use
  global.response = response;
});
```

#### Delete Transaction

Got a transaction to ditch? Use the `order_id` from the creation step:

```javascript
const { DeleteTransactionRequest } = require('naboopay');

async function deleteTransaction() {
  const request = new DeleteTransactionRequest({ order_id: global.response.order_id });
  const response = await naboopayClient.transaction.delete(request);
  console.log(response);
}

deleteTransaction();
```

#### Get Transactions

Fetch all transactions or just one:

**All Transactions**

```javascript
async function getAllTransactions() {
  const allTransactions = await naboopayClient.transaction.getAll();
  console.log(allTransactions);
  return allTransactions;
}

getAllTransactions().then(all => {
  global.allTransactions = all;
});
```

**One Transaction**

Use the first transaction’s `order_id` from the list:

```javascript
async function getOneTransaction() {
  const transactionId = global.allTransactions.transactions[0].order_id;
  const oneTransaction = await naboopayClient.transaction.getOne(transactionId);
  console.log(oneTransaction);
}

getOneTransaction();
```

---

### Cashout

Move some money with Wave and Orange Money. Use your own phone number for testing unless you want to surprise sudoping01!

#### Cashout with Wave

Set up your cashout request:

```javascript
const { CashOutRequest } = require('naboopay');

const requestWave = new CashOutRequest({
  full_name: 'sudoping01',
  amount: 10000,
  phone_number: phone_number_1, // Don’t change unless testing sudoping01 likes it this way! 😂
});

async function cashoutWave() {
  try {
    const response = await naboopayClient.cashout.wave(requestWave);
    console.log(response);
  } catch (e) {
    console.log(`Exception: ${e.message}`);
  }
}

cashoutWave();
```

#### Cashout with Orange Money

Another cashout, this time with Orange Money:

```javascript
const requestOrange = new CashOutRequest({
  full_name: 'Djim Patrick Lo', // Hi Patrick! 😂
  amount: 100,
  phone_number: phone_number_2, // Swap this for testing, or Patrick might cash in!
});

async function cashoutOrangeMoney() {
  try {
    const response = await naboopayClient.cashout.orangeMoney(requestOrange);
    console.log(response);
  } catch (e) {
    console.log(`Exception: ${e.message}`);
  }
}

cashoutOrangeMoney();
```

---

## Wrapping Up

And there you have it a full workshop on using the NabooPay Node.js SDK! You’ve installed it, set up the client, and mastered account details, transactions, and cashouts, all with async flair. Pretty cool, right? Tweak the code, explore more features, and keep the good vibes going. Good integration 🫂!