import { ApiRequestConfig } from "./types/api";

/**
 * Base URL for the NabooPay API
 */
export const BASE_URL = "https://api.naboopay.com/api/v1";

/**
 * API endpoints and their corresponding HTTP methods
 */
export const NabooRequest: Record<string, ApiRequestConfig> = {
  /** Get account information */
  account: {
    endpoint: `${BASE_URL}/account/`,
    method: "GET",
  },

  /** Cashout via Orange Money */
  cashoutOrangeMoney: {
    endpoint: `${BASE_URL}/cashout/orange-money`,
    method: "POST",
  },

  /** Cashout via Wave */
  cashoutWave: {
    endpoint: `${BASE_URL}/cashout/wave`,
    method: "POST",
  },

  /** Create a new transaction */
  createTransaction: {
    endpoint: `${BASE_URL}/transaction/create-transaction`,
    method: "POST",
  },

  /** Delete an existing transaction */
  deleteTransaction: {
    endpoint: `${BASE_URL}/transaction/delete-transaction`,
    method: "DELETE",
  },

  /** Get a specific transaction */
  getOneTransaction: {
    endpoint: `${BASE_URL}/transaction/get-one-transaction`,
    method: "GET",
  },

  /** Get all transactions */
  getTransactions: {
    endpoint: `${BASE_URL}/transaction/get-transactions`,
    method: "GET",
  },
};
