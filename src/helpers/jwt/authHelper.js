const jwt = require('jsonwebtoken');
const { v4 } = require('uuid');
const { JWT_SECRET_KEY } = process.env;

const generateAccessToken = userId => {
  const payload = {
    id: userId,
  };
  const options = { expiresIn: '900s' };

  return jwt.sign(payload, JWT_SECRET_KEY, options);
};

const generateRefreshToken = () => {
  const payload = {
    id: v4(),
  };
  const options = { expiresIn: '24h' };

  return jwt.sign(payload, JWT_SECRET_KEY, options);
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
};
