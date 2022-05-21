const { User } = require('../../models/index');

const getVerifyController = async (req, res, next) => {
  const { verificationToken } = req.params;

  const user = await User.findOne({ verificationToken });
  if (!user) {
    return res.status(404).json({
      status: 'error',
      code: 404,
      message: `User not found`,
    });
  }

  if (user) {
    await User.findOneAndUpdate(
      { verificationToken },
      {
        verificationToken: null,
        verify: true,
      },
    );
  }
};

module.exports = getVerifyController;
