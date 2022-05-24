const { signInService } = require('../../services/auth');

const { addRefreshTokenCookies } = require('../../helpers');

const signInCtrl = async (req, res, next) => {
  const { email, password } = req.body;

  const { accessToken, refreshToken, user } = await signInService(
    email,
    password,
  );

  await addRefreshTokenCookies(res, refreshToken);

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

module.exports = { signInCtrl };
