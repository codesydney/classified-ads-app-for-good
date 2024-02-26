const { body, validationResult } = require('express-validator')

// basic input validation for sign in route
exports.signinValidation = [
  body('email')
    .trim()
    .toLowerCase()
    .isEmail()
    .withMessage('Invalid email format'),
  body('password').isLength({ min: 6 }).withMessage('Invalid password format'),
]

// Basic input validation for sign up route.
exports.signupValidation = [
  body('email')
    .trim()
    .toLowerCase()
    .isEmail()
    .withMessage('Invalid email format'),
  body('password').isLength({ min: 6 }).withMessage('Invalid password format'),
  body('passwordConfirm').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Passwords do not match')
    }
    return true
  }),
]

exports.emailValidation = [
  body('email')
    .trim()
    .toLowerCase()
    .isEmail()
    .withMessage('Invalid email format'),
]
