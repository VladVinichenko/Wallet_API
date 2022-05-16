const validationMiddleware = schema => async (req, res, next) => {
  try {
    await schema.validateAsync(req.body);
    next();
  } catch (error) {
    res.status(400).json({
      status: error.details,
      code: 400,
    });
    console.log(error);
  }

  // return (req, res, next) => {
  //   const { error } = schema.validate(req.body);
  //   if (error) {
  //     res.status(400).json({
  //       status: error.details,
  //       code: 400,
  //     });
  //   }
  //   next();
  // };
};

module.exports = validationMiddleware;
