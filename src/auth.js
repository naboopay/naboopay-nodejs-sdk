class Auth {
  constructor(token) {
    if (!token) {
      throw new Error('API token must be provided via parameter or NABOOPAY_API_KEY environment variable');
    }
    this.token = token;
  }

  getHeaders() {
    return { Authorization: `Bearer ${this.token}` };
  }
}

module.exports = Auth;

