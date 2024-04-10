const express = require('express')
const multer = require('multer')
const UserController = require('../controllers/UserController')
const {
  signupValidation,
  loginValidation,
  emailValidation,
  changePasswordValidation,
  handleValidationResult,
} = require('../middleware/validationMiddlewares')
const { verifyToken } = require('../middleware/verifyToken')
const { authenticationStatus } = require('../middleware/authenticationStatus')

const router = express.Router()
const upload = multer({ storage: multer.memoryStorage() })

router.get('/', authenticationStatus, UserController.getUsers)

router.delete('/me', verifyToken, UserController.deleteMe)

router.get('/me', verifyToken, UserController.me)

router.get(
  '/profile/:userId',
  authenticationStatus,
  UserController.getUserProfile,
)

router.patch('/profile/me', verifyToken, UserController.updateAlumniProfile)

router.patch(
  '/profile/image',
  verifyToken,
  upload.single('image'),
  UserController.updateProfileImage,
)

router.delete('/profile/image', verifyToken, UserController.deleteProfileImage)

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

router.patch(
  '/profile/password',
  changePasswordValidation,
  handleValidationResult,
  verifyToken,
  UserController.updatePassword,
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
