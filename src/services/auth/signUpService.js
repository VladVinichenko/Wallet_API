const bcrypt = require('bcrypt');
const { Conflict } = require('http-errors');
const { SendMsg } = require('../mailer');
// const { User } = require('../../models/index');
const { findUser, createUser } = require('../../repository/auth');

const { randomUUID } = require('crypto');

const CLIENT_URL = process.env.CLIENT_URL;

const signUpService = async (name, email, password) => {
  // const user = await User.findOne({ email });
  const user = await findUser(email);
  if (user) {
    throw Conflict(`User with ${email} already exist`);
    // return res.status(409).json(Conflict(`User with ${email} already exist`));
  }

  const verificationToken = randomUUID();
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

  createUser(name, email, hashPassword, verificationToken);
  // try {
  //   await User.create({
  //     name,
  //     email,
  //     password: hashPassword,
  //     verificationToken,
  //   });
  // } catch (error) {
  //   throw new Error(error.message);
  // }

  const msg = {
    to: email,
    subject: 'Mail Auth',
    text: `Перейди по ссылке ${CLIENT_URL}/verify/${verificationToken} для верификации`,
    html: `Перейди по <a href="${CLIENT_URL}/verify/${verificationToken}">ссылке</a> для верификации`,
  };

  SendMsg(msg);
};

module.exports = { signUpService };
