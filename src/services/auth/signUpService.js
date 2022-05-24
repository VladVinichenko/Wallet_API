const bcrypt = require('bcrypt');
const { Conflict } = require('http-errors');
const { SendMsg } = require('../mailer');
const { findUserByEmail, createUser } = require('../../repository/auth');

const { randomUUID } = require('crypto');

const CLIENT_URL = process.env.CLIENT_URL;

const signUpService = async (name, email, password) => {
  const user = await findUserByEmail(email);
  if (user) {
    throw Conflict(`User with ${email} already exist`);
  }

  const verificationToken = randomUUID();
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

  await createUser(name, email, hashPassword, verificationToken);

  const msg = {
    to: email,
    subject: 'Mail Auth',
    text: `Перейди по ссылке ${CLIENT_URL}/verify/${verificationToken} для верификации`,
    html: `Перейди по <a href="${CLIENT_URL}/verify/${verificationToken}">ссылке</a> для верификации`,
  };

  SendMsg(msg);
};

module.exports = { signUpService };
