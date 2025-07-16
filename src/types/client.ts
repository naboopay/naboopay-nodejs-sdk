import { HttpMethod, RequestOptions } from "./api";

/**
 * Interface for the NabooPay client that services can depend on
 */
export interface INabooPayClient {
  _makeRequest(
    method: HttpMethod,
    endpoint: string,
    options?: RequestOptions
  ): Promise<any>;
}
