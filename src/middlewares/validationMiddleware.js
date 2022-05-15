const validationMiddleware = schema => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      res.status(400).json({
        status: error.details,
        code: 400,
      });
    }
    next();
  };
};

module.exports = validationMiddleware;
