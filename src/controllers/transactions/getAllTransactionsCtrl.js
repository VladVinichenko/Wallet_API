const { getAllTransactionService } = require('../../services/transactions');

const getAllTransactionsCtrl = async (req, res) => {
  const { limit = 10, page = 1 } = req.query;
  const user = req.user;
  const listTransaction = await getAllTransactionService(user, limit, page);
  res.status(200).json({
    status: 'OK',
    code: 200,
    message: 'All Transaction',
    data: listTransaction,
  });
};

module.exports = {
  getAllTransactionsCtrl,
};
