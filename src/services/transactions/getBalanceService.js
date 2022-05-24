const { getTotalValue } = require('../../repository/finance');

const getBalanceService = user => {
  return getTotalValue(user);
};

module.exports = {
  getBalanceService,
};
