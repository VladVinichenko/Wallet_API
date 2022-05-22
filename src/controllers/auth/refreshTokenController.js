const {
  generateAccessToken,
  generateRefreshToken,
} = require('../../helpers/jwt/authHelper');

const { User } = require('../../models/index');

const refreshTokenController = async (req, res, next) => {
  const { refreshToken } = req.cookies;
  const user = await User.findOne({ refreshToken });
  if (!user) {
    return res.status(401).json({
      message: 'Invalid Signature',
    });
  }
  if (refreshToken) {
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
  }
};

module.exports = refreshTokenController;
