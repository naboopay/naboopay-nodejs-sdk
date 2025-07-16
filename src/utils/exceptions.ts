/**
 * Base exception class for all NabooPay SDK errors
 */
export class NabooPayError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "NabooPayError";

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if ((Error as any).captureStackTrace) {
      (Error as any).captureStackTrace(this, NabooPayError);
    }
  }
}

/**
 * Exception thrown when authentication fails
 */
export class AuthenticationError extends NabooPayError {
  constructor(message: string) {
    super(message);
    this.name = "AuthenticationError";

    if ((Error as any).captureStackTrace) {
      (Error as any).captureStackTrace(this, AuthenticationError);
    }
  }
}

/**
 * Exception thrown when API request fails
 */
export class APIError extends NabooPayError {
  constructor(message: string) {
    super(message);
    this.name = "APIError";

    if ((Error as any).captureStackTrace) {
      (Error as any).captureStackTrace(this, APIError);
    }
  }
}
