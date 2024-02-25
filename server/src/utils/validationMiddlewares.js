const { body, validationResult } = require('express-validator')

exports.signinValidation = [
  body('email')
    .trim()
    .toLowerCase()
    .isEmail()
    .withMessage('Invalid email format'),
  body('password').isLength({ min: 6 }).withMessage('Invalid password format'),
]

exports.signupValidation = [
  body('email')
    .trim()
    .toLowerCase()
    .isEmail()
    .withMessage('Invalid email format'),
  body('password').isLength({ min: 6 }).withMessage('Invalid password format'),
]
