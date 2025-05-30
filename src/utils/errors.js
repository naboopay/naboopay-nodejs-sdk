const { AuthenticationError, APIError, NabooPayError } = require('./exceptions');

const exceptionMessages = {
  401: 'Invalid or expired token',
  403: 'Forbidden: You do not have permission to access this resource',
  404: 'Resource not found',
};

const defaultMessage = 'API error: {}';

function apiException(code, error) {
  const message = exceptionMessages[code] || defaultMessage.replace('{}', error.message);
  if (code === 401) {
    return new AuthenticationError(message);
  } else if ([403, 404].includes(code)) {
    return new APIError(message);
  } else {
    return new NabooPayError(message);
  }
}

function generalException(error) {
  return new NabooPayError(`Request failed: ${error.message}`);
}

module.exports = { apiException, generalException };