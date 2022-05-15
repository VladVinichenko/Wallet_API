const signUpController = require('./signUpController');
const signInController = require('./signInController');
const signOutController = require('./signOutController');
const getVerifyController = require('./getVerifyController');
const {googleAuth, googleRedirect, facebookAuth, facebookRedirect} = require('./oAuth2Controller')

module.exports = {
  signUpController,
  signInController,
  signOutController,
  getVerifyController,
  googleAuth,
  googleRedirect,
  facebookAuth,
  facebookRedirect
};
