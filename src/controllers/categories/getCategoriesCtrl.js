// const { Category } = require('../../models');
const { getCategoriesService } = require('../../services/categories');

const getCategoriesCtrl = async (req, res, next) => {
  // const result = await Category.find();
  const result = await getCategoriesService();

  res.status(200).json({
    status: 'OK',
    code: 200,
    message: 'All Categories',
    data: result,
  });
};

module.exports = { getCategoriesCtrl };
