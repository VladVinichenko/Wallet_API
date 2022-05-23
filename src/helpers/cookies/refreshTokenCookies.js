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

module.exports = {
  addRefreshTokenCookies,
};
