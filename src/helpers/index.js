const {
  addRefreshTokenCookies,
  clearRefreshTokenCookies,
} = require('./cookies/tokenCookiesHelper');
const {
  generateAccessToken,
  generateRefreshToken,
} = require('./jwt/tokenGenerateHelper');

module.exports = {
  addRefreshTokenCookies,
  clearRefreshTokenCookies,
  generateAccessToken,
  generateRefreshToken,
};
