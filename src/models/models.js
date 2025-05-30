const { Wallet, TransactionStatusEnum } = require('./enums');

class ProductModel {
  constructor({ name, category, amount, quantity, description }) {
    this.name = name;
    this.category = category;
    this.amount = amount;
    this.quantity = quantity;
    this.description = description;
  }

  toJSON() {
    return {
      name: this.name,
      category: this.category,
      amount: this.amount,
      quantity: this.quantity,
      description: this.description,
    };
  }
}

class TransactionRequest {
  constructor({
    method_of_payment,
    products = null,
    success_url = 'https://checkout.naboopay.com/success',
    error_url = 'https://checkout.naboopay.com/error',
    fees_customer_side = true,
    is_escrow = false,
    is_merchant = false,
  }) {
    this.method_of_payment = method_of_payment;
    this.products = products;
    this.success_url = success_url;
    this.error_url = error_url;
    this.fees_customer_side = fees_customer_side;
    this.is_escrow = is_escrow;
    this.is_merchant = is_merchant;
  }

  toJSON() {
    return {
      method_of_payment: this.method_of_payment,
      products: this.products ? this.products.map(p => p.toJSON()) : undefined,
      success_url: this.success_url,
      error_url: this.error_url,
      fees_customer_side: this.fees_customer_side,
      is_escrow: this.is_escrow,
      is_merchant: this.is_merchant,
    };
  }
}

class TransactionResponse {
  constructor(data) {
    this.order_id = data.order_id;
    this.method_of_payment = data.method_of_payment;
    this.amount = data.amount || 0;
    this.amount_to_pay = data.amount_to_pay || 0;
    this.currency = data.currency;
    this.created_at = new Date(data.created_at);
    this.transaction_status = data.transaction_status || 'pending';
    this.is_escrow = data.is_escrow || false;
    this.is_merchant = data.is_merchant || false;
    this.checkout_url = data.checkout_url;
  }
}

class DeleteTransactionRequest {
  constructor({ order_id }) {
    this.order_id = order_id;
  }

  toJSON() {
    return { order_id: this.order_id };
  }
}

class DeleteTransactionResponse {
  constructor(data) {
    this.order_id = data.order_id;
    this.message = data.message;
  }
}

class GetOneTransaction {
  constructor(data) {
    this.order_id = data.order_id;
    this.method_of_payment = data.method_of_payment;
    this.amount = data.amount;
    this.amount_to_pay = data.amount_to_pay;
    this.currency = data.currency;
    this.created_at = new Date(data.created_at);
    this.transaction_status = data.transaction_status;
    this.products = data.products ? data.products.map(p => new ProductModel(p)) : null;
    this.is_done = data.is_done;
    this.is_escrow = data.is_escrow;
    this.is_merchant = data.is_merchant;
    this.checkout_url = data.checkout_url;
  }
}

class GetAllTransaction {
  constructor(data) {
    this.transactions = data.transactions.map(t => new GetOneTransaction(t));
  }
}

class GetAccountResponse {
  constructor(data) {
    this.account_number = data.account_number;
    this.balance = data.balance;
    this.account_is_activate = data.account_is_activate;
    this.method_of_payment = data.method_of_payment;
    this.loyalty_credit = data.loyalty_credit;
  }
}

class CashOutRequest {
  constructor({ full_name, amount, phone_number }) {
    this.full_name = full_name;
    this.amount = amount;
    this.phone_number = phone_number;
  }

  toJSON() {
    return {
      full_name: this.full_name,
      amount: this.amount,
      phone_number: this.phone_number,
    };
  }
}

class CashOutResponse {
  constructor(data) {
    this.phone_number = data.phone_number;
    this.amount = data.amount;
    this.full_name = data.full_name;
    this.status = data.status;
  }
}

module.exports = {
  ProductModel,
  TransactionRequest,
  TransactionResponse,
  DeleteTransactionRequest,
  DeleteTransactionResponse,
  GetOneTransaction,
  GetAllTransaction,
  GetAccountResponse,
  CashOutRequest,
  CashOutResponse,
};
