const { Category } = require('../../models')

const getCategories = async (req, res, next) => {
    const result = await Category.find()
    
    res.status(200).json({
    status: 'OK',
    code: 200,
    message: 'All categories',
    data: result,
  });
}
 
module.exports = {getCategories}