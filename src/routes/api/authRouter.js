const express = require('express');

const {
  authMiddleware,
  validationMiddleware,
} = require('../../middlewares/index');

const {
  signUpController,
  getVerifyController,
  signInController,
  signOutController,
} = require('../../controllers/auth/index');

const { joiSchema } = require('../../models/user');

const router = express.Router();

router.post('/signup', validationMiddleware(joiSchema), signUpController);

router.get('/verify/:verificationToken', getVerifyController);

router.post('/signin', validationMiddleware(joiSchema), signInController);

router.get('/signout', authMiddleware, signOutController);

module.exports = router;
