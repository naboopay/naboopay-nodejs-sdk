const BASE_URL = 'https://api.naboopay.com/api/v1';

const NabooRequest = {
  account: { endpoint: `${BASE_URL}/account/`, method: 'GET' },
  cashoutOrangeMoney: { endpoint: `${BASE_URL}/cashout/orange-money`, method: 'POST' },
  cashoutWave: { endpoint: `${BASE_URL}/cashout/wave`, method: 'POST' },
  createTransaction: { endpoint: `${BASE_URL}/transaction/create-transaction`, method: 'POST' },
  deleteTransaction: { endpoint: `${BASE_URL}/transaction/delete-transaction`, method: 'DELETE' },
  getOneTransaction: { endpoint: `${BASE_URL}/transaction/get-one-transaction`, method: 'GET' },
  getTransactions: { endpoint: `${BASE_URL}/transaction/get-transactions`, method: 'GET' },
};

module.exports = { BASE_URL, NabooRequest };