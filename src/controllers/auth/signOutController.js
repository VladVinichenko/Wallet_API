const { User } = require('../../models/index');
const { Unauthorized } = require('http-errors');

const signOutController = async (req, res, next) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    return res.status(401).json(Unauthorized('Not authorized'));
  }

  const user = await User.findOne({ refreshToken });
  if (!user) {
    return res.status(401).json(Unauthorized('Not authorized'));
  }

  await User.findOneAndUpdate(refreshToken, {
    accessToken: null,
    refreshToken: null,
  });

  res.clearCookie('refreshToken');
  return res.status(204).json();
};

module.exports = signOutController;
