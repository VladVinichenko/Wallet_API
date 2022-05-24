const dayjs = require('dayjs');

const addRefreshTokenCookies = (res, refreshToken) => {
  return res.cookie('refreshToken', refreshToken, {
    expires: dayjs().add(1, 'days').toDate(),
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    signed: true,
    sameSite: 'None',
  });
};

const clearRefreshTokenCookies = res => {
  return res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'None',
  });
};

module.exports = {
  addRefreshTokenCookies,
  clearRefreshTokenCookies,
};
