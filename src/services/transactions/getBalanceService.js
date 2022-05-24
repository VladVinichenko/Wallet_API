const { getBalance } = require('../../repository/transactions');

const getBalanceService = async user => {
  return await getBalance(user);
};

module.exports = {
  getBalanceService,
};
