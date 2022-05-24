// const { User } = require('../../models/index');

const { findUserByVerif, verifyUser } = require('../../repository/auth');

const getVerifyService = async verificationToken => {
  //   const { verificationToken } = req.params;

  //   const user = await User.findOne({ verificationToken });
  const user = await findUserByVerif(verificationToken);
  if (!user) {
    throw new Error('User not found');
    // return res.status(404).json({
    //   status: 'error',
    //   code: 404,
    //   message: `User not found`,
    // });
  }

  await verifyUser(verificationToken);
  //   await User.findOneAndUpdate(
  //     { verificationToken },
  //     {
  //       verificationToken: null,
  //       verify: true,
  //     },
  //   );
};

module.exports = { getVerifyService };
