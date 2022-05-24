// const { Category } = require('../../models');
const { findAllCategories } = require('../../repository/categories');

const getCategoriesService = async () => {
  // const result = await Category.find();
  const res = await findAllCategories();
  // console.log(res);
  // res.status(200).json({
  //   status: 'OK',
  //   code: 200,
  //   message: 'All Categories',
  //   data: result,
  // });
  return res;
};

module.exports = { getCategoriesService };
