// const { Category } = require('../../models');
const { getCategories } = require('../../repository/categories');

const getCategoriesServise = async (req, res, next) => {
  // const result = await Category.find();
  const result = getCategories();
  res.status(200).json({
    status: 'OK',
    code: 200,
    message: 'All Categories',
    data: result,
  });
};

module.exports = { getCategoriesServise };
