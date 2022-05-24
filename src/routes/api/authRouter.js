const express = require('express');

const { validationMiddleware } = require('../../middlewares/index');

const {
  signUpCtrl,
  getVerifyCtrl,
  signInCtrl,
  signOutCtrl,
  refreshTokenCtrl,
} = require('../../controllers/auth/index');

const { ctrlWrapper } = require('../../middlewares');

const { joiSchema } = require('../../models/user');

const router = express.Router();

router.post(
  '/signup',
  validationMiddleware(joiSchema),
  ctrlWrapper(signUpCtrl),
);

router.get('/verify/:verificationToken', ctrlWrapper(getVerifyCtrl));

router.post(
  '/signin',
  validationMiddleware(joiSchema),
  ctrlWrapper(signInCtrl),
);

router.get('/refresh', ctrlWrapper(refreshTokenCtrl));

router.get('/signout', ctrlWrapper(signOutCtrl));

module.exports = router;
