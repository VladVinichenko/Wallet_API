const {
  addRefreshTokenCookies,
  clearRefreshTokenCookies,
} = require('./cookies/tokenCookiesHelper');
const { cookiesSave } = require('./cookies/cookiesSave');
const {
  generateAccessToken,
  generateRefreshToken,
} = require('./jwt/tokenGenerateHelper');
const {
  conflictSwitch,
  unauthorizedSwitch,
  notFoundSwitch,
} = require('./httpErrors/httpErrors');

module.exports = {
  addRefreshTokenCookies,
  clearRefreshTokenCookies,
  cookiesSave,
  generateAccessToken,
  generateRefreshToken,
  conflictSwitch,
  unauthorizedSwitch,
  notFoundSwitch,
};
