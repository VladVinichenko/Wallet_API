const { Category } = require('../../models');

const getCategories = async (req, res, next) => {
  const result = await Category.find();
  return result;
};

module.exports = getCategories;
