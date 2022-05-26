const { updateTransaction } = require('../../repository/transactions');
const { NotFound } = require('http-errors');

const putTransactionService = async (uid, ObjectID, body) => {
  const updateTrans = await updateTransaction(uid, ObjectID, body);

  if (!updateTrans) {
    throw NotFound(`Transaction with id=${ObjectID} not found`);
  }

  return updateTrans;
};

module.exports = {
  putTransactionService,
};
