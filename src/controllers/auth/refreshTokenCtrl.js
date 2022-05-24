const { refreshTokenService } = require('../../services/auth');

const { addRefreshTokenCookies } = require('../../helpers');

const refreshTokenCtrl = async (req, res, next) => {
  const { refreshToken } = req.signedCookies;

  const { newAccessToken, newRefreshToken } = await refreshTokenService(
    refreshToken,
  );

  await addRefreshTokenCookies(res, newRefreshToken);

  res.json({
    status: 'success',
    code: 200,
    data: {
      accessToken: newAccessToken,
    },
  });
};

module.exports = { refreshTokenCtrl };
