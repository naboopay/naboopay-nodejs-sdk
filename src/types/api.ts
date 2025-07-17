import { Wallet, TransactionStatusEnum } from './enums';

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export interface ApiRequestConfig {
  method: HttpMethod;
  endpoint: string;
}

export interface ApiResponse<T = any> {
  data?: T;
  message?: string;
  status?: string;
}

export interface ProductData {
  name: string;
  category: string;
  amount: number;
  quantity: number;
  description: string;
}

export interface RawTransactionData {
  order_id: string;
  method_of_payment: Wallet[];
  amount?: number;
  amount_to_pay?: number;
  currency?: string;
  created_at: string;
  transaction_status?: TransactionStatusEnum;
  is_escrow?: boolean;
  is_merchant?: boolean;
  checkout_url?: string;
  products?: ProductData[];
  is_done?: boolean;
}

export interface RawAccountData {
  account_number: string;
  balance: number;
  account_is_activate: boolean;
  method_of_payment: Wallet[];
  loyalty_credit: number;
}

export interface RawCashoutData {
  phone_number: string;
  amount: number;
  full_name: string;
  status: string;
}

export interface RawDeleteTransactionData {
  order_id: string;
  message: string;
}

export interface RawGetAllTransactionsData {
  transactions: RawTransactionData[];
}

export interface RequestOptions {
  params?: Record<string, any>;
  data?: Record<string, any>;
  headers?: Record<string, string>;
}