const {
  getStatisticsByType,
  getStatisticsByDate,
} = require('../../repository/transactions');

const getStatisticsService = async (_id, month, year) => {
  // const res = await getTotalValue(_id);
  const incomeStatistics = await getStatisticsByType(_id, 'income');
  const outlayStatistics = await getStatisticsByType(_id, 'outlay');
  const statisticsByDate = await getStatisticsByDate(_id, month, year);

  return {
    incomeStatistics,
    outlayStatistics,
    statisticsByDate,
  };
};

module.exports = {
  getStatisticsService,
};
