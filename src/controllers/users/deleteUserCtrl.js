const { deleteUserService } = require('../../services/users');

const deleteUserCtrl = async (req, res) => {
  const { _id } = req.user;
  await deleteUserService(_id);

  res.status(204).json();
};

module.exports = {
  deleteUserCtrl,
};
