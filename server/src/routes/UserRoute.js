const express = require('express')
const UserController = require('../controllers/UserController')
const {
  signupValidation,
  loginValidation,
  emailValidation,
  handleValidationResult,
} = require('../middleware/validationMiddlewares')
const { verifyToken } = require('../middleware/verifyToken')
const { authenticationStatus } = require('../middleware/authenticationStatus')

const router = express.Router()

router.get('/', authenticationStatus, UserController.getUsers)

router.get('/me', verifyToken, UserController.me)

router.get(
  '/profile/:userId',
  authenticationStatus,
  UserController.getUserProfile,
)

router.patch('/profile/me', verifyToken, UserController.updateAlumniProfile)

router.patch(
  '/profile/general',
  verifyToken,
  UserController.updateAlumniProfile,
)

router.patch(
  '/profile/service',
  verifyToken,
  UserController.updateServiceInformation,
)

router.patch(
  '/profile/education',
  verifyToken,
  UserController.updateEducationInformation,
)

router.post(
  '/signup',
  signupValidation,
  handleValidationResult,
  UserController.signup,
)

router.post(
  '/login',
  loginValidation,
  handleValidationResult,
  UserController.login,
)

router.post(
  '/request-reset-password',
  emailValidation,
  handleValidationResult,
  UserController.requestResetPassword,
)

router.post(
  '/reset-password',
  signupValidation,
  handleValidationResult,
  UserController.resetPassword,
)

module.exports = router
