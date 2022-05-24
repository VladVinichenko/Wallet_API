const express = require('express');

const { validationMiddleware, ctrlWrapper } = require('../../middlewares');

const {
  signUpCtrl,
  getVerifyCtrl,
  signInCtrl,
  signOutCtrl,
  refreshTokenCtrl,
} = require('../../controllers/auth/index');

const { joiSchema } = require('../../models/user');

const router = express.Router();

router.post(
  '/signup',
  validationMiddleware(joiSchema, 'body'),
  ctrlWrapper(signUpCtrl),
);

router.get('/verify/:verificationToken', ctrlWrapper(getVerifyCtrl));

router.post(
  '/signin',
  validationMiddleware(joiSchema, 'body'),
  ctrlWrapper(signInCtrl),
);

router.get('/refresh', ctrlWrapper(refreshTokenCtrl));

router.get('/signout', ctrlWrapper(signOutCtrl));

module.exports = router;
