const { addTransaction } = require('../../repository/transactions');

const addTransactionService = async (id, data) => {
  const newTransaction = await addTransaction(id, data);
  return newTransaction;
};

module.exports = {
  addTransactionService,
};
