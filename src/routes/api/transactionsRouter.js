const express = require('express');

const {
  authMiddleware,
  validationMiddleware,
} = require('../../middlewares/index');
const {
  getAllTransactionsCtrl,
  getBalanceCtrl,
  getStatisticsCtrl,
  getCategoriesCtrl,
  addTransactionCtrl,
} = require('../../controllers/transaction');
const { ctrlWrapper } = require('../../middlewares');
// const { getStatisticsValidate } = require('../../middlewares');
// const { getTransactionValidate } = require('../../middlewares');

const { joiSchema } = require('../../models/transaction');

const router = express.Router();

router.get(
  '/',
  authMiddleware,
  // getTransactionValidate
  validationMiddleware(joiSchema),
  ctrlWrapper(getAllTransactionsCtrl),
);

router.get('/total-finance', authMiddleware, ctrlWrapper(getBalanceCtrl));

router.get(
  '/statistics',
  authMiddleware,
  validationMiddleware(joiSchema),
  // getStatisticsValidate,
  ctrlWrapper(getStatisticsCtrl),
);

router.get(
  '/categories',
  // getCategories.getCategories,
  ctrlWrapper(getCategoriesCtrl),
);

router.post(
  '/',
  authMiddleware,
  validationMiddleware(joiSchema),
  // validationMiddleware(schemaCreateTrasaction),
  ctrlWrapper(addTransactionCtrl),
);

module.exports = router;
