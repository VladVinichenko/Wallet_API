const express = require('express');

const { ctrlWrapper } = require('../../middlewares/index');
const { getCategoriesCtrl } = require('../../controllers/categories');

const router = express.Router();

router.get('/', ctrlWrapper(getCategoriesCtrl));

module.exports = router;
