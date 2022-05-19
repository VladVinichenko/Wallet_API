const Joi = require('joi');

module.exports = {
  getTransactionValidate: (req, res, next) => {
    const { page, limit } = req.query;
    const schema = Joi.object({
      page: Joi.number().greater(0),
      limit: Joi.number().greater(0),
    });
    const validationResult = schema.validate({
      page: page,
      limit: limit,
    });
    if (validationResult.error) {
      return res.status(400).json({
        status: 'Bad Request',
        code: 400,
        message: `missing required ${validationResult.error.details[0].context.label} field`,
      });
    }
    next();
  },
};
