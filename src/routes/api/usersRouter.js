const express = require('express');

const { authMiddleware } = require('../../middlewares');

const { getCurrentUserController } = require('../../controllers/users');

const router = express.Router();

router.get('/current', authMiddleware, getCurrentUserController);

module.exports = router;
