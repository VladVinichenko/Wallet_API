
const Joi = require("joi") ;
const getStatisticsValidate = async (req, res, next) => { 
    const currentYear = new Date().getFullYear()
    const { month, year } = req.query;
    const schema = Joi.object({
        month: Joi.number().min(1).max(12),
        year: Joi.number().min(1970).max(currentYear)
    });
    const validationResult =await schema.validate({
        month: month,
        year: year,
    });
    if (validationResult.error) {
        return res.status(400).json({
            status: 'Bad Request',
            code: 400,
            message: `missing required ${validationResult.error.details[0].context.label} `
        })
    }
    next()
}
module.exports = {getStatisticsValidate}