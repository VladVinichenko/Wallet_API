// const { User } = require('../../models/index');

const { findUser, verifyUser } = require('../../repository/auth');

const getVerifyService = async verificationToken => {
  //   const { verificationToken } = req.params;

  //   const user = await User.findOne({ verificationToken });
  const user = findUser(verificationToken);
  if (!user) {
    throw new Error('User not found');
    // return res.status(404).json({
    //   status: 'error',
    //   code: 404,
    //   message: `User not found`,
    // });
  }

  verifyUser(verificationToken);
  //   await User.findOneAndUpdate(
  //     { verificationToken },
  //     {
  //       verificationToken: null,
  //       verify: true,
  //     },
  //   );
};

module.exports = getVerifyService;
