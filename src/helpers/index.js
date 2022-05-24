const {
  addRefreshTokenCookies,
  clearRefreshTokenCookies,
} = require('./cookies/tokenCookiesHelper');
const { cookiesSave } = require('./cookies/cookiesSave');
const {
  generateAccessToken,
  generateRefreshToken,
} = require('./jwt/tokenGenerateHelper');

module.exports = {
  addRefreshTokenCookies,
  clearRefreshTokenCookies,
  cookiesSave,
  generateAccessToken,
  generateRefreshToken,
};
