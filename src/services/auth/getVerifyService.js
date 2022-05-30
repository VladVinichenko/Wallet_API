const { findUserByVerif, verifyUser } = require('../../repository/auth');
// const { NotFound } = require('http-errors');
const { notFoundSwitch } = require('../../helpers');

const getVerifyService = async verificationToken => {
  const user = await findUserByVerif(verificationToken);
  if (!user) {
    // throw NotFound('User not found');
    throw notFoundSwitch('emailNotFound');
  }

  await verifyUser(verificationToken);
};

module.exports = { getVerifyService };
