const bcrypt = require('bcrypt');
const { generateAccessToken, generateRefreshToken } = require('../../helpers');

const { Unauthorized } = require('http-errors');
// const { User } = require('../../models/index');

const { findUserByEmail, updateTokens } = require('../../repository/auth');

// const {
//   addRefreshTokenCookies,
// } = require('../../helpers/cookies/refreshTokenCookies');

const signInService = async (email, password) => {
  //   const { email, password } = req.body;
  //   const user = await User.findOne({ email });
  const user = await findUserByEmail(email);
  if (!user) {
    throw Unauthorized(`Email ${email} not found`);
    // return res.status(401).json(Unauthorized(`Email ${email} not found`));
  }

  if (user.verify === false) {
    throw Unauthorized(`Email ${email} not verified`);
    // return res.status(401).json(Unauthorized(`Email ${email} not verified`));
  }

  const passCompare = bcrypt.compareSync(password, user.password);

  if (!passCompare) {
    throw Unauthorized(`Password wrong`);
    // return res.status(401).json(Unauthorized(`Password wrong`));
  }

  const accessToken = generateAccessToken(user._id);
  const refreshToken = generateRefreshToken();

  await updateTokens(user._id, accessToken, refreshToken);
  //   await User.findByIdAndUpdate(user._id, { accessToken, refreshToken });

  //   addRefreshTokenCookies(res, refreshToken);

  return { user, accessToken, refreshToken };
};

module.exports = { signInService };
