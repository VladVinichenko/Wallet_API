const express = require('express');

const {
  ctrlWrapper,
  validationMiddleware,
} = require('../../middlewares/index');
const { getCategoriesCtrl } = require('../../controllers/transaction');
// const { getStatisticsValidate } = require('../../middlewares');
// const { getTransactionValidate } = require('../../middlewares');

const { joiSchema } = require('../../models/categories');

const router = express.Router();

router.get(
  '/',
  // getCategories.getCategories,
  validationMiddleware(joiSchema),
  ctrlWrapper(getCategoriesCtrl),
);

module.exports = router;
