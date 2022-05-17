const { getStatisticsCtrl } = require('./getStatisticsCtrl');
const getAllTransaction = require('./getAllTransaction');
const getTotal = require('./getTotal');
const getCategories = require('./getCategories');
const addTransaction = require('./addTransaction');
module.exports = {
  getAllTransaction,
  getTotal,
  getCategories,
  getStatisticsCtrl,
  addTransaction,
};
