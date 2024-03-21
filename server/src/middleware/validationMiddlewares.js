const { body, validationResult } = require('express-validator')

// basic input validation for login route
const loginValidation = [
  body('email')
    .trim()
    .toLowerCase()
    .isEmail()
    .withMessage('Invalid email format'),
  body('password').isLength({ min: 6 }).withMessage('Invalid password format'),
]

// Basic input validation for sign up route.
const signupValidation = [
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

const emailValidation = [
  body('email')
    .trim()
    .toLowerCase()
    .isEmail()
    .withMessage('Invalid email format'),
]

const handleValidationResult = (req, res, next) => {
  // Get validation errors from request body
  const result = validationResult(req)

  // If there are validation errors, return 422 response
  if (!result.isEmpty()) {
    return res.status(422).json({ error: result.array(), status: 'ERROR' })
  }

  next()
}

module.exports = {
  loginValidation,
  signupValidation,
  emailValidation,
  handleValidationResult,
}
