import {
  TransactionRequest,
  TransactionResponse,
  DeleteTransactionRequest,
  DeleteTransactionResponse,
  GetAllTransaction,
  GetOneTransaction,
} from "../models";
import { NabooRequest } from "../config";
import { GetAllTransactionsParams } from "../types";
import { INabooPayClient } from "../types/client";

/**
 * Transaction service for managing payment transactions
 */
export class Transaction {
  constructor(private readonly client: INabooPayClient) {}

  /**
   * Create a new payment transaction
   * @param request Transaction creation request
   * @returns Promise resolving to transaction response
   */
  async create(request: TransactionRequest): Promise<TransactionResponse> {
    const data = request.toJSON();
    const { method, endpoint } = NabooRequest.createTransaction;
    const response = await this.client._makeRequest(method, endpoint, { data });
    return new TransactionResponse(response);
  }

  /**
   * Delete an existing transaction
   * @param request Transaction deletion request
   * @returns Promise resolving to deletion confirmation
   */
  async delete(
    request: DeleteTransactionRequest
  ): Promise<DeleteTransactionResponse> {
    const data = request.toJSON();
    const { method, endpoint } = NabooRequest.deleteTransaction;
    const response = await this.client._makeRequest(method, endpoint, { data });
    return new DeleteTransactionResponse(response);
  }

  /**
   * Retrieve all transactions with optional filtering
   * @param params Optional filter parameters
   * @returns Promise resolving to list of transactions
   */
  async getAll(
    params: GetAllTransactionsParams = {}
  ): Promise<GetAllTransaction> {
    const {
      limit = 50,
      amount = null,
      transactionStatus = null,
      createdAtStart = null,
      createdAtEnd = null,
    } = params;

    const queryParams: Record<string, any> = {
      limit,
      amount,
      transaction_status: transactionStatus,
      created_at_start: createdAtStart,
      created_at_end: createdAtEnd,
    };

    // Remove null/undefined values
    Object.keys(queryParams).forEach((key) => {
      if (queryParams[key] == null) {
        delete queryParams[key];
      }
    });

    const { method, endpoint } = NabooRequest.getTransactions;
    const response = await this.client._makeRequest(method, endpoint, {
      params: queryParams,
    });
    return new GetAllTransaction(response);
  }

  /**
   * Retrieve a specific transaction by order ID
   * @param orderId Unique order identifier
   * @returns Promise resolving to transaction details
   */
  async getOne(orderId: string): Promise<GetOneTransaction> {
    const params = { order_id: orderId };
    const { method, endpoint } = NabooRequest.getOneTransaction;
    const response = await this.client._makeRequest(method, endpoint, {
      params,
    });
    return new GetOneTransaction(response);
  }
}
