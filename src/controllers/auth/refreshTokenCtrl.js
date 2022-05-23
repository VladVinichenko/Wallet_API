const {
  generateAccessToken,
  generateRefreshToken,
} = require('../../helpers/jwt/authHelper');
const { Unauthorized } = require('http-errors');
const { JWT_SECRET_KEY } = process.env;
const jwt = require('jsonwebtoken');

const {
  addRefreshTokenCookies,
} = require('../../helpers/cookies/refreshTokenCookies');

const { User } = require('../../models/index');

const refreshTokenCtrl = async (req, res, next) => {
  const { refreshToken } = req.signedCookies;

  if (!refreshToken) {
    return res.status(401).json(Unauthorized('Not authorized'));
  }

  try {
    jwt.verify(refreshToken, JWT_SECRET_KEY);
  } catch (error) {
    throw new Error(error.message);
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

  res.json({
    status: 'success',
    code: 200,
    data: {
      accessToken: newAccessToken,
    },
  });
};

module.exports = refreshTokenCtrl;
