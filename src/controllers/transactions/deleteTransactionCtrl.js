const { deleteTransactionService } = require('../../services/transactions');

const deleteTransactionCtrl = async (req, res) => {
  const { id } = req.params;
  const { _id } = req.user;
  const deleteTransaction = await deleteTransactionService(_id, id);

  res.status(200).json({
    status: 'OK',
    code: 200,
    message: 'Transaction deleted',
    data: deleteTransaction,
  });
};

module.exports = {
  deleteTransactionCtrl,
};
