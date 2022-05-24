const signUpService = require('../../services/auth');

const signUpCtrl = async (req, res, next) => {
  const { name, email, password } = req.body;

  signUpService(name, email, password);

  res.status(201).json({
    status: 'success',
    code: 201,
    data: {
      user: {
        email,
      },
    },
  });
};

module.exports = { signUpCtrl };
