const express = require('express');

const {
  authMiddleware,
  validationMiddleware,
} = require('../../middlewares/index');
const {
  getAllTransactionsCtrl,
  getBalanceCtrl,
  getStatisticsCtrl,
  // getCategoriesCtrl,
  addTransactionCtrl,
} = require('../../controllers/transactions');
const { ctrlWrapper } = require('../../middlewares');
// const { getStatisticsValidate } = require('../../middlewares');
// const {
//   getTransactionValidate,
// } = require('../../middlewares/validationParamsMiddleware');

const {
  joiPostSchema,
  joiPaginateSchema,
  joiStatisticsSchema,
} = require('../../models/transaction');

const router = express.Router();

router.get(
  '/',
  authMiddleware,
  // getTransactionValidate,
  validationMiddleware(joiPaginateSchema, 'query'),
  ctrlWrapper(getAllTransactionsCtrl),
);

router.get('/balance', authMiddleware, ctrlWrapper(getBalanceCtrl));

router.get(
  '/statistics',
  authMiddleware,
  validationMiddleware(joiStatisticsSchema, 'query'),
  // getStatisticsValidate,
  ctrlWrapper(getStatisticsCtrl),
);

// router.get(
//   '/categories',
//   // getCategories.getCategories,
//   ctrlWrapper(getCategoriesCtrl),
// );

router.post(
  '/',
  authMiddleware,
  validationMiddleware(joiPostSchema, 'body'),
  // validationMiddleware(schemaCreateTrasaction),
  ctrlWrapper(addTransactionCtrl),
);

module.exports = router;
