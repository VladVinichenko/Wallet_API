const { signUpCtrl } = require('./signUpCtrl');
const { signInCtrl } = require('./signInCtrl');
const { signOutCtrl } = require('./signOutCtrl');
const { getVerifyCtrl } = require('./getVerifyCtrl');
const { refreshTokenCtrl } = require('./refreshTokenCtrl');

module.exports = {
  signUpCtrl,
  signInCtrl,
  signOutCtrl,
  getVerifyCtrl,
  refreshTokenCtrl,
};
