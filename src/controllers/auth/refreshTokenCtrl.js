const refreshTokenService = require('../../services/auth');

const {
  addRefreshTokenCookies,
} = require('../../helpers/cookies/refreshTokenCookies');

const refreshTokenCtrl = async (req, res, next) => {
  const { refreshToken } = req.signedCookies;

  const newAccessToken = refreshTokenService(refreshToken);

  addRefreshTokenCookies(res, newRefreshToken);

  res.json({
    status: 'success',
    code: 200,
    data: {
      accessToken: newAccessToken,
    },
  });
};

module.exports = refreshTokenCtrl;
