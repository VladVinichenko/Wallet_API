const bcrypt = require('bcrypt');

const { v4 } = require('uuid');
const { Conflict } = require('http-errors');
const { SendMsg } = require('../../services/index');
const { User } = require('../../models/index');

const CLIENT_URL = process.env.CLIENT_URL;

const signUpController = async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    return res.status(409).json(Conflict(`User with ${email} already exist`));
  }

  const verificationToken = v4();
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

  await User.create({
    name,
    email,
    password: hashPassword,
    verificationToken,
    balance: 0,
  });

  const msg = {
    to: email,
    subject: 'Mail Auth',
    text: `Перейди по ссылке ${CLIENT_URL}/verify/${verificationToken} для верификации`,
    html: `Перейди по <a href="${CLIENT_URL}/verify/${verificationToken}">ссылке</a> для верификации`,
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
