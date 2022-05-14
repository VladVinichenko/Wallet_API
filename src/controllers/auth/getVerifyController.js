const { User } = require('../../models/index');

const { nodemailerSendMsg } = require('../../services/index');
const VerificationEmail = process.env.EMAIL;

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
      from: VerificationEmail,
      to: user.email,
      subject: 'Nodemailer Test',
      text: 'Ваша почта успешно подтверждена. Регистрация завершена!',
    };
    nodemailerSendMsg(msg);

    res.status(200).json({
      status: 'success',
      code: 200,
      message: 'Verification successful',
    });
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
