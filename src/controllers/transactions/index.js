const { getAllTransactionsCtrl } = require('./getAllTransactionsCtrl');
const { getBalanceCtrl } = require('./getBalanceCtrl');
const { getStatisticsCtrl } = require('./getStatisticsCtrl');
const { addTransactionCtrl } = require('./addTransactionCtrl');
const { deleteTransactionCtrl } = require('./deleteTransactionCtrl');
const { putTransactionCtrl } = require('./putTransactionCtrl');

module.exports = {
  getAllTransactionsCtrl,
  getBalanceCtrl,
  getStatisticsCtrl,
  addTransactionCtrl,
  deleteTransactionCtrl,
  putTransactionCtrl,
};
