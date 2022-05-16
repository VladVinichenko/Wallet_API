const validationMiddleware = schema => (req, res, next) => {
  try {
    schema.validate(req.body);
    next();
  } catch (error) {
    res.status(400).json({
      status: error.details,
      code: 400,
    });
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
