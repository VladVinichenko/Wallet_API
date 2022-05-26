const { putTransactionService } = require('../../services/transactions');

const putTransactionCtrl = async (req, res) => {
  const { id } = req.params;
  const { _id } = req.user;
  const data = req.body;

  const updateTransaction = await putTransactionService(_id, id, data);

  res.status(200).json({
    status: 'OK',
    code: 200,
    message: 'Transaction updated',
    data: updateTransaction,
  });
};

module.exports = {
  putTransactionCtrl,
};
