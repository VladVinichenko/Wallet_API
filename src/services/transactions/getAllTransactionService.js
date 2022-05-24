const { getAllTransactionData } = require('../../repository/transactions');

const getAllTransactionService = (query, user) => {
  const { limit = 10, page = 1 } = query;

  return getAllTransactionData({ limit, page }, user);
};

module.exports = {
  getAllTransactionService,
};
