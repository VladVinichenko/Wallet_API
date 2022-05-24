const fetch = require('node-fetch');

const getCoursesService = async () => {
  const courses = await fetch(
    'https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11',
  ).then(res => res.text());

  return courses;
};

module.exports = {
  getCoursesService,
};
