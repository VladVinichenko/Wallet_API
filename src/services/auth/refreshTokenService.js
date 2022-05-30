const { generateAccessToken, generateRefreshToken } = require('../../helpers');
// const { Unauthorized } = require('http-errors');
const { unauthorizedSwitch } = require('../../helpers');
const { JWT_SECRET_KEY } = process.env;
const jwt = require('jsonwebtoken');

const { findUserByToken, updateTokens } = require('../../repository/auth');

const refreshTokenService = async refreshToken => {
  if (!refreshToken) {
    // throw Unauthorized('Not authorized');
    throw unauthorizedSwitch('basic');
  }

  try {
    jwt.verify(refreshToken, JWT_SECRET_KEY);
  } catch (error) {
    throw new Error(error.message);
  }

  const user = await findUserByToken(refreshToken);

  if (!user) {
    // throw Unauthorized('Not authorized');
    throw unauthorizedSwitch('basic');
  }

  const newAccessToken = generateAccessToken(user._id);
  const newRefreshToken = generateRefreshToken();

  await updateTokens(user._id, newAccessToken, newRefreshToken);

  return { newAccessToken, newRefreshToken };
};

module.exports = { refreshTokenService };
