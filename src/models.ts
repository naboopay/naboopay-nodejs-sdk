import {
  Wallet,
  TransactionStatusEnum,
  ProductModelParams,
  TransactionRequestParams,
  DeleteTransactionRequestParams,
  CashoutRequestParams,
  RawTransactionData,
  RawAccountData,
  RawCashoutData,
  RawDeleteTransactionData,
  RawGetAllTransactionsData,
  ProductData,
} from "./types";

/**
 * Product model for transaction items
 */
export class ProductModel {
  public readonly name: string;
  public readonly category: string;
  public readonly amount: number;
  public readonly quantity: number;
  public readonly description: string;

  constructor({
    name,
    category,
    amount,
    quantity,
    description,
  }: ProductModelParams) {
    this.name = name;
    this.category = category;
    this.amount = amount;
    this.quantity = quantity;
    this.description = description;
  }

  /**
   * Convert to JSON for API requests
   */
  public toJSON(): ProductData {
    return {
      name: this.name,
      category: this.category,
      amount: this.amount,
      quantity: this.quantity,
      description: this.description,
    };
  }
}

/**
 * Transaction request model
 */
export class TransactionRequest {
  public readonly method_of_payment: Wallet[];
  public readonly products: ProductModel[] | null;
  public readonly success_url: string;
  public readonly error_url: string;
  public readonly fees_customer_side: boolean;
  public readonly is_escrow: boolean;
  public readonly is_merchant: boolean;

  constructor({
    method_of_payment,
    products = null,
    success_url = "https://checkout.naboopay.com/success",
    error_url = "https://checkout.naboopay.com/error",
    fees_customer_side = true,
    is_escrow = false,
    is_merchant = false,
  }: TransactionRequestParams) {
    this.method_of_payment = method_of_payment;
    this.products = products ? products.map((p) => new ProductModel(p)) : null;
    this.success_url = success_url;
    this.error_url = error_url;
    this.fees_customer_side = fees_customer_side;
    this.is_escrow = is_escrow;
    this.is_merchant = is_merchant;
  }

  /**
   * Convert to JSON for API requests
   */
  public toJSON(): Record<string, any> {
    return {
      method_of_payment: this.method_of_payment,
      products: this.products
        ? this.products.map((p) => p.toJSON())
        : undefined,
      success_url: this.success_url,
      error_url: this.error_url,
      fees_customer_side: this.fees_customer_side,
      is_escrow: this.is_escrow,
      is_merchant: this.is_merchant,
    };
  }
}

/**
 * Transaction response model
 */
export class TransactionResponse {
  public readonly order_id: string;
  public readonly method_of_payment: Wallet[];
  public readonly amount: number;
  public readonly amount_to_pay: number;
  public readonly currency: string | undefined;
  public readonly created_at: Date;
  public readonly transaction_status: TransactionStatusEnum;
  public readonly is_escrow: boolean;
  public readonly is_merchant: boolean;
  public readonly checkout_url: string | undefined;

  constructor(data: RawTransactionData) {
    this.order_id = data.order_id;
    this.method_of_payment = data.method_of_payment;
    this.amount = data.amount || 0;
    this.amount_to_pay = data.amount_to_pay || 0;
    this.currency = data.currency;
    this.created_at = new Date(data.created_at);
    this.transaction_status =
      data.transaction_status || TransactionStatusEnum.PENDING;
    this.is_escrow = data.is_escrow || false;
    this.is_merchant = data.is_merchant || false;
    this.checkout_url = data.checkout_url;
  }
}

/**
 * Delete transaction request model
 */
export class DeleteTransactionRequest {
  public readonly order_id: string;

  constructor({ order_id }: DeleteTransactionRequestParams) {
    this.order_id = order_id;
  }

  /**
   * Convert to JSON for API requests
   */
  public toJSON(): Record<string, string> {
    return { order_id: this.order_id };
  }
}

/**
 * Delete transaction response model
 */
export class DeleteTransactionResponse {
  public readonly order_id: string;
  public readonly message: string;

  constructor(data: RawDeleteTransactionData) {
    this.order_id = data.order_id;
    this.message = data.message;
  }
}

/**
 * Single transaction details model
 */
export class GetOneTransaction {
  public readonly order_id: string;
  public readonly method_of_payment: Wallet[];
  public readonly amount: number;
  public readonly amount_to_pay: number;
  public readonly currency: string | undefined;
  public readonly created_at: Date;
  public readonly transaction_status: TransactionStatusEnum;
  public readonly products: ProductModel[] | null;
  public readonly is_done: boolean | undefined;
  public readonly is_escrow: boolean;
  public readonly is_merchant: boolean;
  public readonly checkout_url: string | undefined;

  constructor(data: RawTransactionData) {
    this.order_id = data.order_id;
    this.method_of_payment = data.method_of_payment;
    this.amount = data.amount || 0;
    this.amount_to_pay = data.amount_to_pay || 0;
    this.currency = data.currency;
    this.created_at = new Date(data.created_at);
    this.transaction_status =
      data.transaction_status || TransactionStatusEnum.PENDING;
    this.products = data.products
      ? data.products.map((p) => new ProductModel(p))
      : null;
    this.is_done = data.is_done;
    this.is_escrow = data.is_escrow || false;
    this.is_merchant = data.is_merchant || false;
    this.checkout_url = data.checkout_url;
  }
}

/**
 * All transactions response model
 */
export class GetAllTransaction {
  public readonly transactions: GetOneTransaction[];

  constructor(data: RawGetAllTransactionsData) {
    this.transactions = data.transactions.map((t) => new GetOneTransaction(t));
  }
}

/**
 * Account information response model
 */
export class GetAccountResponse {
  public readonly account_number: string;
  public readonly balance: number;
  public readonly account_is_activate: boolean;
  public readonly method_of_payment: Wallet[];
  public readonly loyalty_credit: number;

  constructor(data: RawAccountData) {
    this.account_number = data.account_number;
    this.balance = data.balance;
    this.account_is_activate = data.account_is_activate;
    this.method_of_payment = data.method_of_payment;
    this.loyalty_credit = data.loyalty_credit;
  }
}

/**
 * Cashout request model
 */
export class CashOutRequest {
  public readonly full_name: string;
  public readonly amount: number;
  public readonly phone_number: string;

  constructor({ full_name, amount, phone_number }: CashoutRequestParams) {
    this.full_name = full_name;
    this.amount = amount;
    this.phone_number = phone_number;
  }

  /**
   * Convert to JSON for API requests
   */
  public toJSON(): Record<string, string | number> {
    return {
      full_name: this.full_name,
      amount: this.amount,
      phone_number: this.phone_number,
    };
  }
}

/**
 * Cashout response model
 */
export class CashOutResponse {
  public readonly phone_number: string;
  public readonly amount: number;
  public readonly full_name: string;
  public readonly status: string;

  constructor(data: RawCashoutData) {
    this.phone_number = data.phone_number;
    this.amount = data.amount;
    this.full_name = data.full_name;
    this.status = data.status;
  }
}
