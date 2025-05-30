const axios = require('axios');
const retry = require('async-retry');
const Auth = require('./auth');
const { apiException, generalException } = require('./utils/errors');
const Account = require('./services/account');
const Cashout = require('./services/cashout');
const Transaction = require('./services/transaction');

class NabooPay {
  constructor(token = process.env.NABOOPAY_API_KEY, baseUrl = 'https://api.naboopay.com/api/v1') {
    this.auth = new Auth(token);
    this.baseUrl = baseUrl;
    this.account = new Account(this);
    this.cashout = new Cashout(this);
    this.transaction = new Transaction(this);
  }

  async _makeRequest(method, endpoint, options = {}) {
    const headers = this.auth.getHeaders();
    const config = {
      method,
      url: endpoint,
      headers,
      ...options,
    };

    try {
      const response = await retry(async () => {
        const res = await axios(config);
        return res.data;
      }, {
        retries: 3,
        minTimeout: 1000,
        factor: 2,
      });
      return response;
    } catch (error) {
      if (error.response) {
        throw apiException(error.response.status, error);
      } else {
        throw generalException(error);
      }
    }
  }
}

module.exports = NabooPay;