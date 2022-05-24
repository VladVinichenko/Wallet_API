const { getTotalValue } = require('../../repository/transactions');

const getBalanceService = async user => {
  return await getTotalValue(user);
};

module.exports = {
  getBalanceService,
};
