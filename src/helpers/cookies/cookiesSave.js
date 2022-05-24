const dayjs = require('dayjs');

const cookiesSave = async (res, key, data) => {
  return await res.cookie(key, data, {
    expires: dayjs().add(1, 'h').toDate(),
    // httpOnly: true,
    // signed: true,
    // secure: process.env.NODE_ENV !== 'development',
    // sameSite: process.env.NODE_ENV !== 'development' && 'None',
  });
};

module.exports = {
  cookiesSave,
};
