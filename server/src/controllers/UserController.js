const UserService = require('../services/UserService')
const PasswordResetService = require('../services/PasswordResetService')
const {
  signupValidation,
  signinValidation,
  emailValidation,
  handleValidationResult,
} = require('../middleware/validationMiddlewares')
const { createToken } = require('../utils/handleJwt')
const passwordResetTokenUtils = require('../utils/resetTokens')
const { sendResetEmail } = require('../utils/mail')

// Signup controller
exports.signup = [
  signupValidation,
  handleValidationResult,
  async (req, res, next) => {
    try {
      const { email, password } = req.body

      // Check email not in use already.
      const existingUser = await UserService.findUserByEmail(email)

      // If email already in use, return 409 response (conflict)
      if (existingUser) {
        const error = new Error('Email already in use')
        error.statusCode = 409
        throw error
      }

      // create new user;
      const newUser = await UserService.createUser(email, password)

      // create token for user
      const token = createToken({ id: newUser._id })

      // return 201 response with token
      return res
        .status(201)
        .json({ message: 'User created', token, status: 'OK' })
    } catch (error) {
      next(error)
    }
  },
]

// Signin controller
exports.signin = [
  signinValidation,
  handleValidationResult,
  async (req, res, next) => {
    try {
      const { email, password } = req.body

      // find user by email;
      const user = await UserService.findUserByEmailWithPassword(email)

      // If no user with this email exists, return 404 response
      if (!user) {
        const error = new Error('Invalid credentials')
        error.statusCode = 401
        throw error
      }

      // Validate user password
      const passwordCorrect = await user.verifyPassword(password)
      // If password does not match, return 401 response
      if (!passwordCorrect) {
        const error = new Error('Invalid credentials')
        error.statusCode = 401
        throw error
      }

      // create token for user
      const token = createToken({ id: user._id })

      // return token
      return res
        .status(200)
        .json({ message: 'User signed in', token, status: 'OK' })
    } catch (error) {
      next(error)
    }
  },
]

// Request reset password controller (send reset email)
exports.requestResetPassword = [
  emailValidation,
  handleValidationResult,
  async (req, res, next) => {
    try {
      const { email } = req.body
      // Check there is an account associated with email
      const user = await UserService.findUserByEmail(email)

      // If no user with this email exists, send response with 200 status (security measure)
      if (!user) {
        return res
          .status(200)
          .json({ message: 'Reset email sent', status: 'OK' })
      }

      // create reset token for the user
      const { token, hashedToken } =
        await passwordResetTokenUtils.generateResetToken()

      // save token to the db, with expiry date
      await PasswordResetService.generatePasswordResetToken(
        user._id,
        hashedToken,
      )

      // send reset email
      await sendResetEmail(email, token)

      // return 200 response
      return res.status(200).json({ message: 'Reset email sent', status: 'OK' })
    } catch (error) {
      next(error)
    }
  },
]

// Reset Password controller (change password)
exports.resetPassword = [
  signupValidation,
  handleValidationResult,
  async (req, res, next) => {
    try {
      const { email, password } = req.body
      const { token } = req.query

      // Find user requesting reset
      const user = await UserService.findUserByEmail(email)

      if (!user) {
        const error = new Error('Not found.')
        error.statusCode = 404
        throw error
      }

      // Find token correlating to user requesting reset.
      const storedToken = await PasswordResetService.findTokenByUserId(user._id)

      if (!storedToken) {
        const error = new Error('Could not find resource.')
        error.statusCode = 404
        throw error
      }

      // compare token provided with token stored
      const isMatch = await passwordResetTokenUtils.compareToken(
        token,
        storedToken.token,
      )

      // Token has been found, is single use: delete.
      await PasswordResetService.findTokenAndDelete(user._id)

      if (!isMatch) {
        const error = new Error('Invalid Token')
        error.statusCode = 400
        throw error
      }

      // update the users password
      user.password = password
      await user.save()

      return res
        .status(200)
        .json({ message: 'Password successfully changed', status: 'OK' })
    } catch (error) {
      next(error)
    }
  },
]
exports.getUsers = (req, res, _next) => {
  return res.status(200).json({
    status: 'OK',
    users: [{ name: 'Joe Smith' }],
  })
}
