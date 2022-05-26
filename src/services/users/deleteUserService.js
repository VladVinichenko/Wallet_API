const { Unauthorized } = require('http-errors');
const { deleteUser } = require('../../repository/users');
const { JWT_SECRET_KEY } = process.env;
const jwt = require('jsonwebtoken');

const deleteUserService = async (uid, refreshToken) => {
  if (!refreshToken) {
    throw Unauthorized('Not authorized');
  }

  try {
    jwt.verify(refreshToken, JWT_SECRET_KEY);
  } catch (error) {
    throw new Error(error.message);
  }

  await deleteUser(uid, refreshToken);
};

module.exports = {
  deleteUserService,
};
