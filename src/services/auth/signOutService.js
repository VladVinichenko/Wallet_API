// const { Unauthorized } = require('http-errors');
const { unauthorizedSwitch } = require('../../helpers');

const { findUserByToken, clearTokens } = require('../../repository/auth');

const signOutService = async refreshToken => {
  if (!refreshToken) {
    // throw Unauthorized('Not authorized');
    throw unauthorizedSwitch('basic');
  }

  const user = await findUserByToken(refreshToken);

  if (!user) {
    // throw Unauthorized('Not authorized');
    throw unauthorizedSwitch('basic');
  }
  await clearTokens(refreshToken);
};

module.exports = { signOutService };
