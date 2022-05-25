const { getCoursesService } = require('../../services/finances');
// const { cookiesSave } = require('../../helpers');

const getCoursesCtrl = async (req, res) => {
  const courses = await getCoursesService();
  // await cookiesSave(res, 'courses', courses);

  return res.status(200).json({ status: 'success', code: 200, data: courses });
};

module.exports = {
  getCoursesCtrl,
};
