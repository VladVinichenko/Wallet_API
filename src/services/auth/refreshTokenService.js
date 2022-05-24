const { generateAccessToken, generateRefreshToken } = require('../../helpers');
const { Unauthorized } = require('http-errors');
const { JWT_SECRET_KEY } = process.env;
const jwt = require('jsonwebtoken');

// const {
//   addRefreshTokenCookies,
// } = require('../../helpers/cookies/refreshTokenCookies');

// const { User } = require('../../models/index');

const { findUserByToken, updateTokens } = require('../../repository/auth');

const refreshTokenService = async refreshToken => {
  if (!refreshToken) {
    throw Unauthorized('Not authorized');
    // return res.status(401).json(Unauthorized('Not authorized'));
  }

  try {
    jwt.verify(refreshToken, JWT_SECRET_KEY);
  } catch (error) {
    throw new Error(error.message);
  }
  //   const user = await User.findOne({ refreshToken });
  const user = await findUserByToken(refreshToken);

  if (!user) {
    throw Unauthorized('Not authorized');
    // return res.status(401).json(Unauthorized('Not authorized'));
  }

  const newAccessToken = generateAccessToken(user._id);
  const newRefreshToken = generateRefreshToken();

  //   console.log(user._id, newAccessToken, newRefreshToken);

  await updateTokens(user._id, newAccessToken, newRefreshToken);
  //   await User.findByIdAndUpdate(user._id, {
  //     accessToken: newAccessToken,
  //     refreshToken: newRefreshToken,
  //   });

  //   addRefreshTokenCookies(res, newRefreshToken);

  return { newAccessToken, newRefreshToken };
};

module.exports = { refreshTokenService };
