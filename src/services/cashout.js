const { CashOutRequest, CashOutResponse } = require('../models/models');
const { NabooRequest } = require('../config');

class Cashout {
  constructor(client) {
    this.client = client;
  }

  async wave(request) {
    const data = request.toJSON();
    const { method, endpoint } = NabooRequest.cashoutWave;
    const response = await this.client._makeRequest(method, endpoint, { data });
    return new CashOutResponse(response);
  }

  async orangeMoney(request) {
    const data = request.toJSON();
    const { method, endpoint } = NabooRequest.cashoutOrangeMoney;
    const response = await this.client._makeRequest(method, endpoint, { data });
    return new CashOutResponse(response);
  }
}

module.exports = Cashout;