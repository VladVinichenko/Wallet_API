const express = require('express');

const { validationMiddleware } = require('../../middlewares/index');

const {
  signUpController,
  getVerifyController,
  signInController,
  signOutController,
  refreshTokenController,
} = require('../../controllers/auth/index');

const { joiSchema } = require('../../models/user');

const router = express.Router();

router.post('/signup', validationMiddleware(joiSchema), signUpController);

router.get('/verify/:verificationToken', getVerifyController);

router.post('/signin', validationMiddleware(joiSchema), signInController);

router.get('/refresh-tokens', refreshTokenController);

router.get('/signout', signOutController);

module.exports = router;
