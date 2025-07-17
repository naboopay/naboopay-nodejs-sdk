import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import retry from "async-retry";
import { Auth } from "./auth";
import { apiException, generalException } from "./utils/errors";
import { Account } from "./services/account";
import { Cashout } from "./services/cashout";
import { Transaction } from "./services/transaction";
import { HttpMethod, RequestOptions, INabooPayClient } from "./types";

/**
 * Main NabooPay SDK client
 */
export class NabooPay implements INabooPayClient {
  private readonly auth: Auth;

  public readonly account: Account;
  public readonly cashout: Cashout;
  public readonly transaction: Transaction;

  /**
   * Creates a new NabooPay client instance
   * @param token API authentication token (can also be set via NABOOPAY_API_KEY env var)
   * @param baseUrl Base URL for the NabooPay API (currently not used as endpoints are absolute)
   */
  constructor(
    token: string = process.env.NABOOPAY_API_KEY || "",
    _baseUrl: string = "https://api.naboopay.com/api/v1"
  ) {
    this.auth = new Auth(token);

    // Initialize service instances
    this.account = new Account(this);
    this.cashout = new Cashout(this);
    this.transaction = new Transaction(this);
  }

  /**
   * Internal method to make HTTP requests with retry logic and error handling
   * @param method HTTP method
   * @param endpoint API endpoint
   * @param options Request options (params, data, headers)
   * @returns Promise resolving to response data
   */
  async _makeRequest(
    method: HttpMethod,
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<any> {
    const headers = {
      ...this.auth.getHeaders(),
      ...options.headers,
    };

    const config: AxiosRequestConfig = {
      method,
      url: endpoint,
      headers,
      ...options,
    };

    try {
      const response = await retry(
        async () => {
          const res: AxiosResponse = await axios(config);
          return res.data;
        },
        {
          retries: 3,
          minTimeout: 1000,
          factor: 2,
        }
      );

      return response;
    } catch (error: any) {
      if (error.response) {
        throw apiException(error.response.status, error);
      } else {
        throw generalException(error);
      }
    }
  }
}
