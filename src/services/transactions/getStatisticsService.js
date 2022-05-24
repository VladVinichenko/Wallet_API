const { getStatistics } = require('../../repository/transactions');

const getStatisticsService = async (_id, year, month) => {
  const { incomeStatistics, outlayStatistics, statisticsByDate } =
    await getStatistics(_id, year, month);

  return {
    incomeStatistics,
    outlayStatistics,
    statisticsByDate,
  };
};

module.exports = {
  getStatisticsService,
};
