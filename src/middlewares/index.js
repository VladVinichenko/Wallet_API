const { authMiddleware } = require('./authMiddleware');
const { validationMiddleware } = require('./validationMiddleware');
const { ctrlWrapper } = require('./ctrlWrapper');

module.exports = {
  authMiddleware,
  validationMiddleware,
  ctrlWrapper,
};
