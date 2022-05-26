const express = require('express');

const {
  authMiddleware,
  validationMiddleware,
  ctrlWrapper,
} = require('../../middlewares');
const {
  getAllTransactionsCtrl,
  getBalanceCtrl,
  getStatisticsCtrl,
  addTransactionCtrl,
  deleteTransactionCtrl,
  putTransactionCtrl,
} = require('../../controllers/transactions');

const {
  joiPostSchema,
  joiPaginateSchema,
  joiStatisticsSchema,
} = require('../../models/transaction');

const router = express.Router();

router.get(
  '/',
  authMiddleware,
  validationMiddleware(joiPaginateSchema, 'query'),
  ctrlWrapper(getAllTransactionsCtrl),
);

router.get('/balance', authMiddleware, ctrlWrapper(getBalanceCtrl));

router.get(
  '/statistics',
  authMiddleware,
  validationMiddleware(joiStatisticsSchema, 'query'),
  ctrlWrapper(getStatisticsCtrl),
);

router.post(
  '/',
  authMiddleware,
  validationMiddleware(joiPostSchema, 'body'),
  ctrlWrapper(addTransactionCtrl),
);

router.delete('/:id', authMiddleware, ctrlWrapper(deleteTransactionCtrl));

router.put(
  '/:id',
  authMiddleware,
  validationMiddleware(joiPostSchema, 'body'),
  ctrlWrapper(putTransactionCtrl),
);

module.exports = router;
