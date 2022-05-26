const { deleteUserService } = require('../../services/users');

const deleteUserCtrl = async (req, res) => {
  const { refreshToken } = req.signedCookies;
  const { _id } = req.user;

  await deleteUserService(_id, refreshToken);

  res.status(204).json();
};

module.exports = {
  deleteUserCtrl,
};
