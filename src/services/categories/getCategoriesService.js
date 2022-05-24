const { findAllCategories } = require('../../repository/categories');

const getCategoriesService = async () => {
  const res = await findAllCategories();

  return res;
};

module.exports = { getCategoriesService };
