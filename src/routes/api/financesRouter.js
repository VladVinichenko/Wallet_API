const express = require('express');

const { ctrlWrapper } = require('../../middlewares/index');

const { getCoursesCtrl } = require('../../controllers/finances');

const router = express.Router();

router.get('/courses', ctrlWrapper(getCoursesCtrl));

module.exports = router;
