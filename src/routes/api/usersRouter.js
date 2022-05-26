const express = require('express');

const { authMiddleware, ctrlWrapper } = require('../../middlewares');

const {
  getCurrentUserController,
  deleteUserCtrl,
} = require('../../controllers/users');

const router = express.Router();

router.get('/current', authMiddleware, ctrlWrapper(getCurrentUserController));

router.delete('/delete', authMiddleware, ctrlWrapper(deleteUserCtrl));

module.exports = router;
