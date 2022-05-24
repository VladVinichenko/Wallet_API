const express = require('express');

const { authMiddleware, ctrlWrapper } = require('../../middlewares/index');

const { getCoursesCtrl } = require('../../controllers/finances');

const router = express.Router();

router.get('/courses', authMiddleware, ctrlWrapper(getCoursesCtrl));

module.exports = router;
