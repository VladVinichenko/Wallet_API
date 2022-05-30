const { getStatistics } = require('../../repository/transactions');

const getStatisticsService = async (_id, year, month, day) => {
  const { incomeStatistics, outlayStatistics, statisticsByCategory } =
    await getStatistics(_id, year, month, day);

  return {
    incomeStatistics,
    outlayStatistics,
    statisticsByCategory,
  };
};

module.exports = {
  getStatisticsService,
};
