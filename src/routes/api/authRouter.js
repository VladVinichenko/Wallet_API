const express = require('express');

const { validationMiddleware } = require('../../middlewares/index');

const {
  signUpController,
  getVerifyController,
  signInController,
  signOutController,
  refreshTokenController,
} = require('../../controllers/auth/index');

const { ctrlWrapper } = require('../../helpers/ctrlWrapper');

const { joiSchema } = require('../../models/user');

const router = express.Router();

router.post(
  '/signup',
  validationMiddleware(joiSchema),
  ctrlWrapper(signUpController),
);

router.get('/verify/:verificationToken', ctrlWrapper(getVerifyController));

router.post(
  '/signin',
  validationMiddleware(joiSchema),
  ctrlWrapper(signInController),
);

router.get('/refresh', ctrlWrapper(refreshTokenController));

router.get('/signout', ctrlWrapper(signOutController));

module.exports = router;
