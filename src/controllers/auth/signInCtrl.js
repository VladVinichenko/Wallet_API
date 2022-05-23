const bcrypt = require('bcrypt');
const {
  generateAccessToken,
  generateRefreshToken,
} = require('../../helpers/jwt/authHelper');

const { Unauthorized } = require('http-errors');
const { User } = require('../../models/index');

const {
  addRefreshTokenCookies,
} = require('../../helpers/cookies/refreshTokenCookies');

const signInCtrl = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json(Unauthorized(`Email ${email} not found`));
  }

  if (user.verify === false) {
    return res.status(401).json(Unauthorized(`Email ${email} not verified`));
  }

  const passCompare = bcrypt.compareSync(password, user.password);

  if (!passCompare) {
    return res.status(401).json(Unauthorized(`Password wrong`));
  }

  const accessToken = generateAccessToken(user._id);
  const refreshToken = generateRefreshToken();

  await User.findByIdAndUpdate(user._id, { accessToken, refreshToken });

  addRefreshTokenCookies(res, refreshToken);

  return res.json({
    status: 'success',
    code: 200,
    data: {
      accessToken,
      user: {
        name: user.name,
        email: user.email,
      },
    },
  });
};

module.exports = signInCtrl;
