const { signOutService } = require('../../services/auth');

const { clearRefreshTokenCookies } = require('../../helpers');

const signOutCtrl = async (req, res, next) => {
  const { refreshToken } = req.signedCookies;

  await signOutService(refreshToken);

  await clearRefreshTokenCookies(res);

  return res.status(204).json();
};

module.exports = { signOutCtrl };
