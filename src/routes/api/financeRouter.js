const express = require("express");

 const {authMiddleware,validationMiddleware,} = require("../../middlewares/index");
const { ctrlWrapper } = require('../../helpers');
const {getTransactionsCtrl, addTransactionCtrl,  getStatisticsCtrl }=require('../../controllers/finance')
// const {
//   getContactsController,
//   getContactByIdController,
//   addContactController,
//   removeContactByIdController,
//   putContactController,
//   patchContactController,
// } = require("../../controllers/contacts/index");

// const { joiSchema } = require("../../models/contact");

const router = express.Router();

router.post('/add', authMiddleware, ctrlWrapper(addTransactionCtrl))
router.get('/', authMiddleware, ctrlWrapper(getTransactionsCtrl))
router.get('/statistics', authMiddleware, ctrlWrapper(getStatisticsCtrl))
// router.get("/", authMiddleware, getContactsController);

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
