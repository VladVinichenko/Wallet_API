const dayjs = require('dayjs');

const addRefreshTokenCookies = async (res, refreshToken) => {
  return await res.cookie('refreshToken', refreshToken, {
    expires: dayjs().add(1, 'days').toDate(),
    httpOnly: true,
    signed: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: process.env.NODE_ENV !== 'development' && 'None',
  });
};

const clearRefreshTokenCookies = async res => {
  return await res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: process.env.NODE_ENV !== 'development' && 'None',
  });
};

module.exports = {
  addRefreshTokenCookies,
  clearRefreshTokenCookies,
};
