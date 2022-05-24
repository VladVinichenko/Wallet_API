const { addTransaction } = require('../../repository/transactions');

const addTransactionService = (id, data) => {
  return addTransaction(id, data);
};

module.exports = {
  addTransactionService,
};
