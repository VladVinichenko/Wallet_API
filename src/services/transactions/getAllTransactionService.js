const { getAllTransactionData } = require('../../repository/transactions');

const getAllTransactionService = (user, limit, page) => {
  return getAllTransactionData(user, limit, page);
};

module.exports = {
  getAllTransactionService,
};
