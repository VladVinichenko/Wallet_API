const { getStatisticsCtrl } = require('./getStatisticsCtrl');
const getAllTransaction = require('./getAllTransaction');
const getTotal = require('./getTotal');
const getCategories = require('./getCategories')
module.exports = {
  getAllTransaction,
  getTotal,
  getStatisticsCtrl,
  getCategories
};
