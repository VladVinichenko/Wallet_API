const { User } = require('../../models/index');

const { SendMsg } = require('../../services/index');

const defaultVerificationLink = process.env.defaultVerificationLink;

const getVerifyController = async (req, res, next) => {
  const { verificationToken } = req.params;

  const user = await User.findOne({ verificationToken });
  if (user) {
    await User.findOneAndUpdate(
      { verificationToken },
      {
        verificationToken: null,
        verify: true,
      },
    );
    const msg = {
      to: user.email,
      subject: 'Mail Auth',
      text: 'Ваша почта успешно подтверждена. Регистрация завершена!',
    };
    SendMsg(msg);

    res.redirect(defaultVerificationLink, 302);
  }

  if (!user) {
    res.status(404).json({
      status: 'error',
      code: 404,
      message: `User not found`,
    });
  }
};

module.exports = getVerifyController;
