const express = require('express');

// const {
//   authMiddleware,
//   validationMiddleware,
// } = require("../../middlewares/index");
const { authMiddleware } = require('../../middlewares/index');
const {
  getAllTransaction,
  getTotal,
  getCategories,
  //   addContactController,
  //   removeContactByIdController,
  //   putContactController,
  //   patchContactController,
} = require('../../controllers/finance');

// const { joiSchema } = require("../../models/contact");

const router = express.Router();

router.get('/', authMiddleware, getAllTransaction.getAllTransaction);
router.get('/total-finance', authMiddleware, getTotal.getTotal);
router.get('/categories', getCategories.getCategories);
// router.get("/:id", getContactByIdController);

// router.post(
//   "/",
//   authMiddleware,
//   validationMiddleware(joiSchema),
//   addContactController,
// );

// router.delete("/:id", removeContactByIdController);

// router.put("/:id", validationMiddleware(joiSchema), putContactController);

// router.patch(
//   "/:id/favorite",
//   validationMiddleware(favoriteSchema),
//   patchContactController,
// );

module.exports = router;
