const authMiddleware = require('./authMiddleware');
const validationMiddleware = require('./validationMiddleware');
const ctrlWrapper = require('./ctrlWrapper');
// const { getStatisticsValidate } = require('./validationStatisticsQuery');
// const { getTransactionValidate } = require('./validationParamsMiddleware');

module.exports = {
  authMiddleware,
  validationMiddleware,
  ctrlWrapper,
  // getStatisticsValidate,
  // getTransactionValidate,
};
