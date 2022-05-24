const { User } = require('../../models');

const findUserByEmail = async email => {
  const user = await User.findOne({ email });
  return user;
};

const findUserByToken = async refreshToken => {
  const user = await User.findOne({ refreshToken });
  return user;
};

const findUserByVerif = async verificationToken => {
  const user = await User.findOne({ verificationToken });
  return user;
};

const updateTokens = async (_id, accessToken, refreshToken) => {
  await User.findByIdAndUpdate(_id, {
    accessToken,
    refreshToken,
  });
};

const verifyUser = async verificationToken => {
  await User.findOneAndUpdate(
    { verificationToken },
    {
      verificationToken: null,
      verify: true,
    },
  );
};

const clearTokens = async refreshToken => {
  await User.findOneAndUpdate(
    { refreshToken },
    {
      accessToken: null,
      refreshToken: null,
    },
  );
};

const createUser = async (name, email, hashPassword, verificationToken) => {
  await User.create({
    name,
    email,
    password: hashPassword,
    verificationToken,
  });
};

module.exports = {
  findUserByEmail,
  findUserByToken,
  findUserByVerif,
  updateTokens,
  verifyUser,
  clearTokens,
  createUser,
};
