const FinanceService = require('../../services/finance');

const getTotal = async (req, res) => {
  const balance = await FinanceService.getTotal(req.user);
  console.log(balance);

  res.status(200).json({
    status: 'OK',
    code: 200,
    message: 'Total Finance',
    totalFinance: balance,
  });
};

module.exports = {
  getTotal,
};
