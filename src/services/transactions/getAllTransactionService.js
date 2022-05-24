const { getAllTransactions } = require('../../repository/transactions');

const getAllTransactionService = async (user, limit, page) => {
  return await getAllTransactions(user, limit, page);
};

module.exports = {
  getAllTransactionService,
};
