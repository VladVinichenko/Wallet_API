const { getStatistics } = require('../../repository/transactions');

const getStatisticsService = async (_id, year, month) => {
  const { incomeStatistics, outlayStatistics, statisticsByCategory } =
    await getStatistics(_id, year, month);

  return {
    incomeStatistics,
    outlayStatistics,
    statisticsByCategory,
  };
};

module.exports = {
  getStatisticsService,
};
