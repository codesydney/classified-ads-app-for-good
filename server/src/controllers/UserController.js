const UserService = require('../services/UserService')
const PasswordResetService = require('../services/PasswordResetService')
const { validationResult } = require('express-validator')
const {
  signupValidation,
  signinValidation,
  emailValidation,
} = require('../utils/validationMiddlewares')
const { createToken } = require('../utils/handleJwt')
const { generateResetToken, compareToken } = require('../utils/resetTokens')
const { sendResetEmail } = require('../utils/mail')

// Signup controller
exports.signup = [
  signupValidation,
  async (req, res) => {
    try {
      // Get validation errors from request body
      const result = validationResult(req)

      // If there are validation errors, return 422 response
      if (!result.isEmpty()) {
        return res.status(422).json({ errors: result.array() })
      }

      const { email, password } = req.body

      // Check email not in use already.
      const existingUser = await UserService.findUserByEmail(email)

      // If email already in use, return 409 response (conflict)
      if (existingUser) {
        return res.status(409).json({ message: 'Email already in use' })
      }

      // create new user;
      const newUser = await UserService.createUser(email, password)

      // create token for user
      const token = createToken({ id: newUser._id })

      // return 201 response with token
      return res.status(201).json({ message: 'User created', token })
    } catch (error) {
      console.error(error)
      return res.status(500).json({ message: 'Internal server error' })
    }
  },
]

// Signin controller
exports.signin = [
  signinValidation,
  async (req, res) => {
    try {
      // Get validation errors from request body
      const result = validationResult(req)

      // If there are validation errors, return 422 response
      if (!result.isEmpty()) {
        return res.status(422).json({ errors: result.array() })
      }

      const { email, password } = req.body

      // find user by email;
      const user = await UserService.findUserByEmailWithPassword(email)

      // If no user with this email exists, return 404 response
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' })
      }

      // Validate user password
      const passwordCorrect = await user.verifyPassword(password)
      // If password does not match, return 401 response
      if (!passwordCorrect) {
        return res.status(401).json({ message: 'Invalid credentials' })
      }

      // create token for user
      const token = createToken({ id: user._id })

      // return token
      return res.status(200).json({ message: 'User signed in', token })
    } catch (error) {
      console.error(error)
      return res.status(500).json({ message: 'Internal server error' })
    }
  },
]

// Request reset password controller (send reset email)
exports.requestResetPassword = [
  emailValidation,
  async (req, res) => {
    try {
      // Get validation errors from request body
      const result = validationResult(req)

      // If there are validation errors, return 422 response
      if (!result.isEmpty()) {
        return res.status(422).json({ errors: result.array() })
      }

      const { email } = req.body
      // Check there is an account associated with email
      const user = await UserService.findUserByEmail(email)

      // If no user with this email exists, send response with 200 status (security measure)
      if (!user) {
        return res.status(200).json({ message: 'Reset email sent' })
      }

      // create reset token for the user
      const { token, hashedToken } = await generateResetToken()

      // save token to the db, with expiry date
      await PasswordResetService.generatePasswordResetToken(
        user._id,
        hashedToken,
      )

      // send reset email
      await sendResetEmail(email, token)

      // return 200 response
      return res.status(200).json({ message: 'Reset email sent' })
    } catch (error) {
      console.error(error)
      return res.status(500).json({ message: 'Internal server error' })
    }
  },
]

// Reset Password controller (change password)
exports.resetPassword = [
  signupValidation,
  async (req, res) => {
    try {
      const result = validationResult(req)

      // If there are validation errors, return 422 response
      if (!result.isEmpty()) {
        return res.status(422).json({ errors: result.array() })
      }

      const { email, password } = req.body
      const { token } = req.query

      // Find user requesting reset
      const user = await UserService.findUserByEmail(email)

      if (!user) {
        return res.status(404).json({ message: 'Could not find resource' })
      }

      // Find token correlating to user requesting reset.
      const storedToken = await PasswordResetService.findTokenByUserId(user._id)

      if (!storedToken) {
        return res.status(404).json({ message: 'Could not find resource' })
      }

      // compare token provided with token stored
      const isMatch = await compareToken(token, storedToken.token)

      // Token has been found, is single use: delete.
      await PasswordResetService.findTokenAndDelete(user._id)

      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid Token' })
      }

      // update the users password
      user.password = password
      await user.save()

      return res.status(200).json({ message: 'Password successfully changed' })
    } catch (error) {
      console.error(error)
      return res.status(500).json({ message: 'Internal server error' })
    }
  },
]
