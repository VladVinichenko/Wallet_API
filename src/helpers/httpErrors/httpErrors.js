const { Unauthorized, Conflict, NotFound } = require('http-errors');

const conflictSwitch = (type, email) => {
  switch (type) {
    case 'emailExist':
      Conflict(`User with ${email} already exist`);
      break;

    default:
      break;
  }
};
// Conflict(`User with ${email} already exist`);

const unauthorizedSwitch = (type, email) => {
  switch (type) {
    case 'base':
      Unauthorized('Not authorized');
      break;
    case 'emailNotFound':
      Unauthorized(`Email ${email} not found`);
      break;
    case 'emailNotVerified':
      Unauthorized(`Email ${email} not verified`);
      break;
    case 'wrongPass':
      Unauthorized(`Password wrong`);
      break;

    default:
      break;
  }
};
// const notAuthorized = Unauthorized('Not authorized');
// Unauthorized(`Email ${email} not found`);
// Unauthorized(`Email ${email} not verified`);
// Unauthorized(`Password wrong`);

const notFoundSwitch = type => {
  switch (type) {
    case 'emailNotFound':
      NotFound('User not found');
      break;

    default:
      break;
  }
};
// NotFound('User not found');

module.exports = { conflictSwitch, unauthorizedSwitch, notFoundSwitch };
