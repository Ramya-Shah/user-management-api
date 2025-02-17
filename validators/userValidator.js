const { check } = require('express-validator');

createUserValidation = [
  check('name', 'Name is required').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('role', 'Role is required and must be either user or admin').isIn(['user', 'admin'])
];

updateUserValidation = [
  check('name', 'Name is required').optional().not().isEmpty(),
  check('email', 'Please include a valid email').optional().isEmail(),
  check('role', 'Role must be either user or admin').optional().isIn(['user', 'admin'])
];

module.exports = { createUserValidation, updateUserValidation };