const { GetAccountResponse } = require('../models/models');
const { NabooRequest } = require('../config');

class Account {
  constructor(client) {
    this.client = client;
  }

  async getInfo() {
    const { method, endpoint } = NabooRequest.account;
    const response = await this.client._makeRequest(method, endpoint);
    return new GetAccountResponse(response);
  }
}

module.exports = Account;