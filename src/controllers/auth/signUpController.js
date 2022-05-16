const bcrypt = require('bcrypt');

const { v4 } = require('uuid');
const { Conflict } = require('http-errors');
const { SendMsg } = require('../../services/index');
const { User } = require('../../models/index');

const HOST = process.env.HOST;

const signUpController = async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    res.status(409).json(Conflict(`User with ${email} already exist`));
    next();
  }

  const verificationToken = v4();
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

  await User.create({
    name,
    email,
    password: hashPassword,
    verificationToken,
  });

  const msg = {
    to: email,
    subject: 'Mail Auth',
    text: `Перейди по ссылке ${HOST}/api/auth/verify/${verificationToken} для верификации`,
    html: `Перейди по <a href="${HOST}/api/auth/verify/${verificationToken}">ссылке</a> для верификации`,
  };

  SendMsg(msg);

  res.status(201).json({
    status: 'success',
    code: 201,
    data: {
      user: {
        email,
      },
    },
  });
};

module.exports = signUpController;
