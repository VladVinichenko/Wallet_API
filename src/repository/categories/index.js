const { Category } = require('../../models');

const findAllCategories = async () => {
  return await Category.find();
};

module.exports = { findAllCategories };
