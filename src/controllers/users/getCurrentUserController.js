const getCurrentUserController = async (req, res, next) => {
  // console.log(req.user);
  const { name, email } = req.user;
  res.json({
    status: 'success',
    code: 200,
    data: {
      user: {
        name,
        email,
      },
    },
  });
};

module.exports = getCurrentUserController;
