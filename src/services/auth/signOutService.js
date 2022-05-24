const { Unauthorized } = require('http-errors');

const { findUserByToken, clearTokens } = require('../../repository/auth');

const signOutService = async refreshToken => {
  if (!refreshToken) {
    throw Unauthorized('Not authorized');
  }

  const user = await findUserByToken(refreshToken);

  if (!user) {
    throw Unauthorized('Not authorized');
  }
  await clearTokens(refreshToken);
};

module.exports = { signOutService };
