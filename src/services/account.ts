import { GetAccountResponse } from '../models';
import { NabooRequest } from '../config';
import { INabooPayClient } from '../types/client';

/**
 * Account service for managing account operations
 */
export class Account {
  constructor(private readonly client: INabooPayClient) {}

  /**
   * Retrieve account information including balance and payment methods
   * @returns Promise resolving to account information
   */
  async getInfo(): Promise<GetAccountResponse> {
    const { method, endpoint } = NabooRequest.account;
    const response = await this.client._makeRequest(method, endpoint);
    return new GetAccountResponse(response);
  }
}