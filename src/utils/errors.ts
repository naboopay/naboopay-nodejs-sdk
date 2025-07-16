import { AuthenticationError, APIError, NabooPayError } from "./exceptions";

/**
 * Predefined error messages for specific HTTP status codes
 */
const exceptionMessages: Record<number, string> = {
  401: "Invalid or expired token",
  403: "Forbidden: You do not have permission to access this resource",
  404: "Resource not found",
};

/**
 * Default error message template
 */
const defaultMessage = "API error: {}";

/**
 * Creates appropriate exception based on HTTP status code
 * @param code - HTTP status code
 * @param error - Original error object
 * @returns Appropriate exception instance
 */
export function apiException(code: number, error: Error): NabooPayError {
  const message =
    exceptionMessages[code] || defaultMessage.replace("{}", error.message);

  if (code === 401) {
    return new AuthenticationError(message);
  } else if ([403, 404].includes(code)) {
    return new APIError(message);
  } else {
    return new NabooPayError(message);
  }
}

/**
 * Creates a general exception for network or other errors
 * @param error - Original error object
 * @returns NabooPayError instance
 */
export function generalException(error: Error): NabooPayError {
  return new NabooPayError(`Request failed: ${error.message}`);
}
