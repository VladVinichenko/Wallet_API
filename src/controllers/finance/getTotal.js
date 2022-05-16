const FinanceService = require('../../services/finance');

const getTotal = async (req, res) => {
  const total = await FinanceService.getTotal(req.user);

  res.status(200).json({
    status: 'OK',
    code: 200,
    message: 'Total Finance',
    totalFinance: total,
  });
};

module.exports = {
  getTotal,
};
