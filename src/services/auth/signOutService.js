// const { User } = require('../../models/index');
const { Unauthorized } = require('http-errors');

// const {
//   clearRefreshTokenCookies,
// } = require('../../helpers/cookies/refreshTokenCookies');

const { findUser, clearTokens } = require('../../repository/auth');

const signOutService = async refreshToken => {
  if (!refreshToken) {
    throw Unauthorized('Not authorized');
    // return res.status(401).json(Unauthorized('Not authorized'));
  }
  //   const user = await User.findOne({ refreshToken });
  const user = findUser(refreshToken);

  if (!user) {
    throw Unauthorized('Not authorized');
    // return res.status(401).json(Unauthorized('Not authorized'));
  }
  clearTokens(refreshToken);
  //   await User.findOneAndUpdate(
  //     { refreshToken },
  //     {
  //       accessToken: null,
  //       refreshToken: null,
  //     },
  //   );
  //   clearRefreshTokenCookies(res);
  //   res.clearCookie('refreshToken', {
  //     httpOnly: true,
  //     secure: process.env.NODE_ENV !== 'development',
  //     sameSite: 'None',
  //   });
};

module.exports = signOutService;
