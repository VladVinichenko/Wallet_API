const bcrypt = require('bcrypt');

const { v4 } = require('uuid');
const { Conflict } = require('http-errors');
const { nodemailerSendMsg } = require('../../services/index');
const { User } = require('../../models/index');

const HOST = process.env.HOST;
const VerificationEmail = process.env.EMAIL;

const signUpController = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    res.status(409).json(Conflict(`User with ${email} already exist`));
  }

  const verificationToken = v4();
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

  await User.create({
    email,
    password: hashPassword,
    verificationToken,
  });

  const msg = {
    from: VerificationEmail,
    to: email,
    subject: 'Nodemailer Test',
    text: `Перейди по ссылке ${HOST}/api/auth/verify/${verificationToken} для верификации`,
    html: `Перейди по <a href="${HOST}/api/auth/verify/${verificationToken}">ссылке</a> для верификации`,
  };

  //   nodemailerSendMsg(msg);

  res.status(201).json({
    status: 'success',
    code: 201,
    data: {
      user: {
        email,
        verificationLink: `${HOST}/api/auth/verify/${verificationToken}`, // Временная ссылка пока не сделаем нормально
      },
    },
  });
};

module.exports = signUpController;
