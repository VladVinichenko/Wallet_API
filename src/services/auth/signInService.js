const bcrypt = require('bcrypt');
const { generateAccessToken, generateRefreshToken } = require('../../helpers');

// const { Unauthorized } = require('http-errors');
const { unauthorizedSwitch } = require('../../helpers');

const { findUserByEmail, updateTokens } = require('../../repository/auth');

const signInService = async (email, password) => {
  const user = await findUserByEmail(email);
  if (!user) {
    // throw Unauthorized(`Email ${email} not found`);
    throw unauthorizedSwitch('emailNotFound', email);
  }

  if (user.verify === false) {
    // throw Unauthorized(`Email ${email} not verified`);
    throw unauthorizedSwitch('emailNotVerified', email);
  }

  const passCompare = bcrypt.compareSync(password, user.password);

  if (!passCompare) {
    throw unauthorizedSwitch('wrongPass');
    // throw Unauthorized(`Password wrong`);
  }

  const accessToken = generateAccessToken(user._id);
  const refreshToken = generateRefreshToken();

  await updateTokens(user._id, accessToken, refreshToken);

  return { user, accessToken, refreshToken };
};

module.exports = { signInService };
