const { User } = require('../models/index');
const { Unauthorized } = require('http-errors');
const { JWT_SECRET_KEY } = process.env;
const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
  try {
    const accessToken = req.get('Authorization')?.split(' ')[1];
    if (accessToken === undefined) {
      return res.status(401).json(Unauthorized('Not authorized'));
    }
    const { id } = jwt.verify(accessToken, JWT_SECRET_KEY);
    const user = await User.findById(id);
    if (!user || !user.accessToken) {
      return res.status(401).json(Unauthorized('Not authorized'));
    }
    req.user = user;
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ message: 'aToken expired!' });
    }
    res.status(401).json(Unauthorized('Not authorized'));
    next(error);
  }
};

module.exports = { authMiddleware };
