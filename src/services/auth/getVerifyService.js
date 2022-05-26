const { findUserByVerif, verifyUser } = require('../../repository/auth');
const { NotFound } = require('http-errors');

const getVerifyService = async verificationToken => {
  const user = await findUserByVerif(verificationToken);
  if (!user) {
    throw NotFound('User not found');
  }

  await verifyUser(verificationToken);
};

module.exports = { getVerifyService };
