const { deleteTransaction } = require('../../repository/transactions');
const { NotFound } = require('http-errors');

const deleteTransactionService = async (uid, ObjectID) => {
  const deleteTrans = await deleteTransaction(uid, ObjectID);

  if (!deleteTrans) {
    throw NotFound(`Transaction with id=${ObjectID} not found`);
  }

  return deleteTrans;
};

module.exports = {
  deleteTransactionService,
};
