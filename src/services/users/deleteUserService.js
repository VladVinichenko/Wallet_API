const { deleteUser } = require('../../repository/users');

const deleteUserService = async uid => {
  await deleteUser(uid);
};

module.exports = {
  deleteUserService,
};
