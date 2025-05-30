const { TransactionRequest, TransactionResponse, DeleteTransactionRequest, DeleteTransactionResponse, GetAllTransaction, GetOneTransaction } = require('../models/models');
const { NabooRequest } = require('../config');

class Transaction {
  constructor(client) {
    this.client = client;
  }

  async create(request) {
    const data = request.toJSON();
    const { method, endpoint } = NabooRequest.createTransaction;
    const response = await this.client._makeRequest(method, endpoint, { data });
    return new TransactionResponse(response);
  }

  async delete(request) {
    const data = request.toJSON();
    const { method, endpoint } = NabooRequest.deleteTransaction;
    const response = await this.client._makeRequest(method, endpoint, { data });
    return new DeleteTransactionResponse(response);
  }

  async getAll({ limit = 50, amount = null, transactionStatus = null, createdAtStart = null, createdAtEnd = null } = {}) {
    const params = {
      limit,
      amount,
      transaction_status: transactionStatus,
      created_at_start: createdAtStart,
      created_at_end: createdAtEnd,
    };
    Object.keys(params).forEach(key => params[key] == null && delete params[key]);
    const { method, endpoint } = NabooRequest.getTransactions;
    const response = await this.client._makeRequest(method, endpoint, { params });
    return new GetAllTransaction(response);
  }

  async getOne(orderId) {
    const params = { order_id: orderId };
    const { method, endpoint } = NabooRequest.getOneTransaction;
    const response = await this.client._makeRequest(method, endpoint, { params });
    return new GetOneTransaction(response);
  }
}

module.exports = Transaction;