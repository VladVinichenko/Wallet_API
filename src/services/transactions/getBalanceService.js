const { getTotalValue } = require('../../repository/transactions');

const getBalanceService = user => {
  return getTotalValue(user);
};

module.exports = {
  getBalanceService,
};
