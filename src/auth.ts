/**
 * Authentication handler for NabooPay API requests
 */
export class Auth {
  private readonly token: string;

  /**
   * Creates a new Auth instance
   * @param token - API token for authentication
   * @throws {Error} When no token is provided
   */
  constructor(token: string) {
    if (!token) {
      throw new Error(
        "API token must be provided via parameter or NABOOPAY_API_KEY environment variable"
      );
    }
    this.token = token;
  }

  /**
   * Generates authorization headers for API requests
   * @returns Headers object with authorization token
   */
  public getHeaders(): Record<string, string> {
    return {
      Authorization: `Bearer ${this.token}`,
    };
  }
}
