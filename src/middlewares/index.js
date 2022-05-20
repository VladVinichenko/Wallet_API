const authMiddleware = require("./authMiddleware");
const validationMiddleware = require("./validationMiddleware");
const { getStatisticsValidate} = require('./validationStatisticsQuery') 

module.exports = { authMiddleware, validationMiddleware , getStatisticsValidate};
