const { User } = require('../../models/index');

const findUser = data => {
  const user = User.findOne({ data });
  return user;
};

const updateTokens = (user, accessToken, refreshToken) => {
  User.findByIdAndUpdate(user._id, {
    accessToken,
    refreshToken,
  });
};

const verifyUser = verificationToken => {
  User.findOneAndUpdate(
    { verificationToken },
    {
      verificationToken: null,
      verify: true,
    },
  );
};

const clearTokens = refreshToken => {
  User.findOneAndUpdate(
    { refreshToken },
    {
      accessToken: null,
      refreshToken: null,
    },
  );
};

const createUser = (name, email, hashPassword, verificationToken) => {
  User.create({
    name,
    email,
    password: hashPassword,
    verificationToken,
  });
};

module.exports = {
  findUser,
  updateTokens,
  verifyUser,
  clearTokens,
  createUser,
};
