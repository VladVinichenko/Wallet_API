const express = require('express');

const { authMiddleware } = require('../../middlewares/index');

const { getCurrentUserController } = require('../../controllers/users/index');

const router = express.Router();

router.get('/current', authMiddleware, getCurrentUserController);

module.exports = router;
