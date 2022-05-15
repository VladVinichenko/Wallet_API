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
  googleAuth,
  googleRedirect,
  facebookAuth,
  facebookRedirect,
} = require('../../controllers/auth/index');

const { joiSchema } = require('../../models/user');

const router = express.Router();

router.post('/signup', validationMiddleware(joiSchema), signUpController);

router.get('/verify/:verificationToken', getVerifyController);

router.post('/signin', validationMiddleware(joiSchema), signInController);

router.get('/signout', authMiddleware, signOutController);

router.get("/google", googleAuth);
router.get("/google-redirect", googleRedirect);

router.get("/facebook", facebookAuth);
router.get("/facebook-redirect", facebookRedirect);

module.exports = router;
