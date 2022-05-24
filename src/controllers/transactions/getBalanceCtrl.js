const { getBalanceService } = require('../../services/transactions');

const getBalanceCtrl = async (req, res) => {
  const balance = await getBalanceService(req.user);

  res.status(200).json({
    status: 'OK',
    code: 200,
    message: 'Total Finance',
    data: balance,
  });
};

module.exports = {
  getBalanceCtrl,
};
