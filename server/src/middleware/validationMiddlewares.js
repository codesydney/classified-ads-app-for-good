const { body, validationResult } = require('express-validator')

// basic input validation for login route
exports.loginValidation = [
  body('email')
    .trim()
    .toLowerCase()
    .isEmail()
    .withMessage('Invalid email format'),
  body('password').isLength({ min: 6 }).withMessage('Invalid password format'),
]

// Basic input validation for sign up route.
exports.signupValidation = [
  body('firstName').isLength({ min: 2 }).withMessage('Invalid first name'),
  body('lastName').isLength({ min: 2 }).withMessage('Invalid last name'),
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

exports.handleValidationResult = (req, res, next) => {
  // Get validation errors from request body
  const result = validationResult(req)

  // If there are validation errors, return 422 response
  if (!result.isEmpty()) {
    return res.status(422).json({ error: result.array(), status: 'ERROR' })
  }

  next()
}
