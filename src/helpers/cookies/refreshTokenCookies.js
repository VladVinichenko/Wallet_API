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

module.exports = {
  addRefreshTokenCookies,
};
