const { User } = require('../../models/index');

const signOutController = async (req, res, next) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { accessToken: null, refreshToken: null });

  res.status(204).json();
};

module.exports = signOutController;
