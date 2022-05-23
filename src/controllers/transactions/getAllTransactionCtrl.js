const FinanceService = require('../../services/finance');

const getAllTransactionsCtrl = async (req, res) => {
  const listTransaction = await FinanceService.getAllTransaction(
    req.query,
    req.user,
  );
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
