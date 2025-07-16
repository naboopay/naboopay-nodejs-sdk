import { CashOutRequest, CashOutResponse } from '../models';
import { NabooRequest } from '../config';
import { INabooPayClient } from '../types/client';

/**
 * Cashout service for handling money transfers
 */
export class Cashout {
  constructor(private readonly client: INabooPayClient) {}

  /**
   * Perform cashout using Wave mobile money
   * @param request Cashout request details
   * @returns Promise resolving to cashout response
   */
  async wave(request: CashOutRequest): Promise<CashOutResponse> {
    const data = request.toJSON();
    const { method, endpoint } = NabooRequest.cashoutWave;
    const response = await this.client._makeRequest(method, endpoint, { data });
    return new CashOutResponse(response);
  }

  /**
   * Perform cashout using Orange Money mobile wallet
   * @param request Cashout request details
   * @returns Promise resolving to cashout response
   */
  async orangeMoney(request: CashOutRequest): Promise<CashOutResponse> {
    const data = request.toJSON();
    const { method, endpoint } = NabooRequest.cashoutOrangeMoney;
    const response = await this.client._makeRequest(method, endpoint, { data });
    return new CashOutResponse(response);
  }
}