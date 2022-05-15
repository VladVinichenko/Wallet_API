const { User } = require('../models/index');
const { Unauthorized } = require('http-errors');
const { JWT_SECRET_KEY } = process.env;
const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
  if (req.headers.authorization === undefined) {
    res.status(401).json(Unauthorized('No authorization token'));
  }

  const [, token] = req.headers.authorization.split(' ');

  try {
    const { id } = jwt.verify(token, JWT_SECRET_KEY);
    const user = await User.findById(id);
    if (!user || !user.token) {
      res.status(401).json(Unauthorized('Not authorized'));
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.message === 'Invalid signature') {
      error.status = 401;
    }
    next(error);
  }
};

module.exports = authMiddleware;
