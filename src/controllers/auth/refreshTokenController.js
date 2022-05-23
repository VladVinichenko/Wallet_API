const {
  generateAccessToken,
  generateRefreshToken,
} = require('../../helpers/jwt/authHelper');
const { Unauthorized } = require('http-errors');
const { JWT_SECRET_KEY } = process.env;
const jwt = require('jsonwebtoken');

const { User } = require('../../models/index');

const refreshTokenController = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      return res.status(401).json(Unauthorized('Not authorized'));
    }

    jwt.verify(refreshToken, JWT_SECRET_KEY);

    const user = await User.findOne({ refreshToken });
    if (!user) {
      return res.status(401).json(Unauthorized('Not authorized'));
    }

    const newAccessToken = generateAccessToken(user._id);
    const newRefreshToken = generateRefreshToken();

    await User.findByIdAndUpdate(user._id, {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });

    res.cookie('refreshToken', newRefreshToken, {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
    });

    return res.json({
      status: 'success',
      code: 200,
      data: {
        accessToken: newAccessToken,
      },
    });
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ message: 'rToken expired!' });
    }
    res.status(401).json(Unauthorized('Not authorized'));
    next(error);
  }
};

module.exports = refreshTokenController;
