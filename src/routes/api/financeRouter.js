const express = require("express");

// const {
//   authMiddleware,
//   validationMiddleware,
// } = require("../../middlewares/index");

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
