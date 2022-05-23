const {
  generateAccessToken,
  generateRefreshToken,
} = require('../../helpers/jwt/authHelper');
const { Unauthorized } = require('http-errors');

const {
  addRefreshTokenCookies,
} = require('../../helpers/cookies/refreshTokenCookies');

const { User } = require('../../models/index');

const refreshTokenController = async (req, res, next) => {
  const { refreshToken } = req.signedCookies;

  if (!refreshToken) {
    return res.status(401).json(Unauthorized('Not authorized'));
  }

  const user = await User.findOne({ refreshToken });
  if (!user) {
    return res.status(401).json(Unauthorized('Not authorized'));
  }

  const newAccessToken = generateAccessToken(user._id);
  const newRefreshToken = generateRefreshToken();

  await User.findByIdAndUpdate(user._id, {
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
  });

  addRefreshTokenCookies(res, newRefreshToken);

  return res.json({
    status: 'success',
    code: 200,
    data: {
      accessToken: newAccessToken,
    },
  });
};

module.exports = refreshTokenController;
