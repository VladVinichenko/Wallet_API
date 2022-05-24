const { getTotalValue } = require('../../repository/transactions');

const getStatisticsService = user => {
  getTotalValue(user);
};

module.exports = {
  getStatisticsService,
};
