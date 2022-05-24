const getVerifyService = require('../../services/auth');

const getVerifyCtrl = async (req, res, next) => {
  const { verificationToken } = req.params;

  getVerifyService(verificationToken);

  return res.status(200).json({
    status: 'success',
    code: 200,
  });
};

module.exports = { getVerifyCtrl };
