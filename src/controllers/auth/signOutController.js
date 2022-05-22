const { User } = require('../../models/index');

const signOutController = async (req, res, next) => {
  const { refreshToken } = req.cookies;
  await User.findOneAndUpdate(refreshToken, {
    accessToken: null,
    refreshToken: null,
  });
  res.clearCookie('refreshToken');
  return res.status(204).json();
};

module.exports = signOutController;
