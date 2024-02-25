const UserService = require('../services/UserService')
const { validationResult } = require('express-validator')
const { signupValidation } = require('../utils/validationMiddlewares')
const { createToken } = require('../utils/handleJwt')

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

      return res.status(201).json({ message: 'User created', token })
    } catch (error) {
      console.error(error)
      return res.status(500).json({ message: 'Internal server error' })
    }
  },
]
