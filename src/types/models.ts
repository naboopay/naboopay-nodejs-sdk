import { Wallet, TransactionStatusEnum } from "./enums";

export interface ProductModelParams {
  name: string;
  category: string;
  amount: number;
  quantity: number;
  description: string;
}

export interface TransactionRequestParams {
  method_of_payment: Wallet[];
  products?: ProductModelParams[] | null;
  success_url?: string;
  error_url?: string;
  fees_customer_side?: boolean;
  is_escrow?: boolean;
  is_merchant?: boolean;
}

export interface DeleteTransactionRequestParams {
  order_id: string;
}

export interface CashoutRequestParams {
  full_name: string;
  amount: number;
  phone_number: string;
}

export interface GetAllTransactionsParams {
  limit?: number;
  amount?: number;
  transactionStatus?: TransactionStatusEnum;
  createdAtStart?: string;
  createdAtEnd?: string;
}
