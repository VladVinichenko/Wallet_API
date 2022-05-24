const { addTransactionService } = require('../../services/transactions');

const addTransactionCtrl = async (req, res) => {
  const { _id } = req.user;
  // const newTransaction = await ctrl.addTransaction(_id, req.body);
  const newTransaction = await addTransactionService(_id, req.body);

  res.status(201).json({
    status: 'OK',
    code: 201,
    message: 'Transaction created',
    data: newTransaction,
  });
};

module.exports = {
  addTransactionCtrl,
};
