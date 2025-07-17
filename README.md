# NabooPay Node.js SDK

[![CI](https://github.com/naboopay/naboopay-nodejs-sdk/workflows/CI/badge.svg)](https://github.com/naboopay/naboopay-nodejs-sdk/actions)
[![npm version](https://badge.fury.io/js/naboopay.svg)](https://badge.fury.io/js/naboopay)

Node.js SDK for NabooPay payment gateway. Built with TypeScript for Senegal mobile money payments.

## Features

- TypeScript support with type definitions
- Mobile money payments (Wave, Orange Money, Free Money)
- Transaction management
- Cashout operations
- Automatic retry with error handling

## Installation

```bash
npm install naboopay
```

## Setup

Get your API token from the NabooPay dashboard and set it as an environment variable:

```bash
export NABOOPAY_API_KEY="your_api_token_here"
```

## Quick Start

```typescript
import { NabooPay, Wallet, ProductModel, TransactionRequest } from 'naboopay';

const client = new NabooPay();

// Create a transaction
const transaction = new TransactionRequest({
  method_of_payment: [Wallet.WAVE, Wallet.ORANGE_MONEY],
  products: [
    new ProductModel({
      name: 'T-shirt',
      category: 'clothing',
      amount: 10000,
      quantity: 1,
      description: 'Cotton T-shirt',
    }),
  ],
});

const response = await client.transaction.create(transaction);
console.log('Checkout URL:', response.checkout_url);
```

## Usage Examples

### Account Information

```typescript
const accountInfo = await client.account.getInfo();
console.log('Balance:', accountInfo.balance);
```

### Get Transactions

```typescript
// Get all transactions
const transactions = await client.transaction.getAll();

// Get specific transaction
const transaction = await client.transaction.getOne('order_id');
```

### Cashout

```typescript
import { CashOutRequest } from 'naboopay';

// Wave cashout
const request = new CashOutRequest({
  full_name: 'John Doe',
  amount: 10000,
  phone_number: '+221701234567',
});
await client.cashout.wave(request);
```

## Example

Run the complete usage example:

```bash
# Copy environment template
cp examples/.env.example examples/.env

# Add your credentials to examples/.env
# Then run the example
npm run example
```

## Error Handling

```typescript
import { AuthenticationError, APIError } from 'naboopay';

try {
  const response = await client.transaction.create(request);
} catch (error) {
  if (error instanceof AuthenticationError) {
    console.error('Invalid API token');
  } else if (error instanceof APIError) {
    console.error('API error:', error.message);
  }
}
```

## Development

```bash
# Install dependencies
npm install

# Build TypeScript
npm run build

# Run tests
npm test

# Run example
npm run example
```

## License

MIT

## Support

- Email: support@naboopay.com
- Documentation: https://docs.naboopay.com
- Issues: GitHub Issues

## Contributors

- @sudoping01 - Original Creator
- @jmndao - Contributor