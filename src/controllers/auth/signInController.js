const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { Unauthorized } = require('http-errors');
const { User } = require('../../models/index');
const { JWT_SECRET_KEY } = process.env;

const signInController = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json(Unauthorized(`Email ${email} not found`));
  }

  if (user.verify === false) {
    return res.status(401).json(Unauthorized(`Email ${email} not verified`));
  }

  const passCompare = bcrypt.compareSync(password, user.password);

  /* if (!passCompare) {
    return res.status(401).json(Unauthorized(`Password wrong`));
  } */

  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: 300 });
  const refreshToken = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: '1h' });

  await User.findByIdAndUpdate(user._id, { token, refreshToken });

  res.json({
    status: 'success',
    code: 200,
    data: {
      token,
      user: {
        name: user.name,
        email: user.email,
      },
    },
  });
};

module.exports = signInController;
