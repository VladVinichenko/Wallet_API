const dayjs = require('dayjs');

const addRefreshTokenCookies = (res, refreshToken) => {
  return res.cookie('refreshToken', refreshToken, {
    expires: dayjs().add(1, 'days').toDate(),
    httpOnly: true,
    signed: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: process.env.NODE_ENV !== 'development' && 'None',
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
