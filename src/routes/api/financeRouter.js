const express = require('express');

// const {
//   authMiddleware,
//   validationMiddleware,
// } = require("../../middlewares/index");
const {
  authMiddleware,
  validationMiddleware,
} = require('../../middlewares/index');
const {
  getAllTransaction,
  getTotal,
  getStatisticsCtrl,
  getCategories,
  //   addContactController,
  //   removeContactByIdController,
  //   putContactController,
  //   patchContactController,
} = require('../../controllers/finance');
const { ctrlWrapper } = require('../../helpers/ctrlWrapper');
const { addTransaction } = require('../../controllers/finance/addTransaction');
const { getStatisticsValidate } = require('../../middlewares');
// const { joiSchema } = require("../../models/contact");
const { getTransactionValidate } = require('../../middlewares');

const router = express.Router();

router.get(
  '/',
  authMiddleware,
  getTransactionValidate,
  getAllTransaction.getAllTransaction,
);
router.get('/total-finance', authMiddleware, getTotal.getTotal);
router.get(
  '/statistics',
  authMiddleware,
  getStatisticsValidate,
  ctrlWrapper(getStatisticsCtrl),
);
router.get('/categories', getCategories.getCategories);
// router.get("/:id", getContactByIdController);

router.post(
  '/',
  authMiddleware,
  // validationMiddleware(schemaCreateTrasaction),
  ctrlWrapper(addTransaction),
);

module.exports = router;
