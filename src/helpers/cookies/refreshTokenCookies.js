const dayjs = require('dayjs');

const addRefreshTokenCookies = (res, refreshToken) => {
  console.log(process.env.NODE_ENV);
  return res.cookie('refreshToken', refreshToken, {
    expires: dayjs().add(1, 'days').toDate(),
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    signed: true,
  });
};

module.exports = {
  addRefreshTokenCookies,
};
