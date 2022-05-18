const { User } = require('../models/index');
const { Unauthorized } = require('http-errors');
const { JWT_SECRET_KEY } = process.env;
const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.get('Authorization')?.split(' ')[1];

    if (token === undefined) {
      return res.status(401).json(Unauthorized('Not authorized'));
    }

    const { id } = jwt.verify(token, JWT_SECRET_KEY);
    const user = await User.findById(id);

    if (!user || !user.token) {
      return res.status(401).json(Unauthorized('Not authorized'));
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json(Unauthorized('Not authorized'));
    next(error);
  }
};

module.exports = authMiddleware;
