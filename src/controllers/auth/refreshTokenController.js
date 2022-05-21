const {
  generateAccessToken,
  generateRefreshToken,
} = require('../../helpers/jwt/authHelper');

const { User } = require('../../models/index');

const refreshTokenController = async (req, res, next) => {
  console.log('refreshTokenController:', req.body);
  const { refreshToken } = req.body;

  const user = await User.findOne({ refreshToken });
  if (!user) {
    return res.status(401).json({
      message: 'Invalid Signature',
    });
  }

  if (refreshToken) {
    const newAccessToken = generateAccessToken(user._id);
    // const newRefreshToken = generateRefreshToken();

    await User.findByIdAndUpdate(user._id, {
      accessToken: newAccessToken,
      // refreshToken: newRefreshToken,
    });

    res.json({
      status: 'success',
      code: 200,
      data: {
        accessToken: newAccessToken,
        // refreshToken: newRefreshToken,
      },
    });
  }
};

module.exports = refreshTokenController;
