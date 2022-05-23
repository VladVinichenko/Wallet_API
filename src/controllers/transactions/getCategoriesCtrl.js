const { Category } = require('../../models');

const getCategoriesCtrl = async (req, res, next) => {
  const result = await Category.find();

  res.status(200).json({
    status: 'OK',
    code: 200,
    message: 'All Categories',
    data: result,
  });
};

module.exports = { getCategoriesCtrl };
