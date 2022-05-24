const signOutService = require('../../services/auth');

const {
  clearRefreshTokenCookies,
} = require('../../helpers/cookies/refreshTokenCookies');

const signOutCtrl = async (req, res, next) => {
  const { refreshToken } = req.signedCookies;

  signOutService(refreshToken);

  clearRefreshTokenCookies(res);

  return res.status(204).json();
};

module.exports = signOutCtrl;
