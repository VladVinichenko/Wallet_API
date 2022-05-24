const { findUserByVerif, verifyUser } = require('../../repository/auth');

const getVerifyService = async verificationToken => {
  const user = await findUserByVerif(verificationToken);
  if (!user) {
    throw new Error('User not found');
  }

  await verifyUser(verificationToken);
};

module.exports = { getVerifyService };
