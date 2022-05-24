const { getStatisticsService } = require('../../services/transactions');
const getStatisticsCtrl = async (req, res) => {
  const { _id } = req.user;
  const { month, year } = req.query;
  const { incomeStatistics, outlayStatistics, statisticsByDate } =
    await getStatisticsService(_id, year, month);

  res.json({
    status: 'success',
    code: 200,
    data: {
      incomeStatistics,
      outlayStatistics,
      statisticsByDate,
    },
  });
};

module.exports = {
  getStatisticsCtrl,
};
