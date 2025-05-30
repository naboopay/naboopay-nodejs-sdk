class NabooPayError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NabooPayError';
  }
}

class AuthenticationError extends NabooPayError {
  constructor(message) {
    super(message);
    this.name = 'AuthenticationError';
  }
}

class APIError extends NabooPayError {
  constructor(message) {
    super(message);
    this.name = 'APIError';
  }
}

module.exports = { NabooPayError, AuthenticationError, APIError };
