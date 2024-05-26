const express = require('express')
const router = express.Router()
const AdminController = require('../controllers/AdminController.js')
const { authenticateAdmin } = require('../middleware/authenticateAdmin.js')
const { verifyToken } = require('../middleware/verifyToken.js')
const multer = require('multer')
const upload = multer({ storage: multer.memoryStorage() })

router.get(
  '/users',
  verifyToken,
  authenticateAdmin,
  AdminController.getUsersAdmin,
)

router.patch(
  '/users/:id/profilePicture',
  verifyToken,
  authenticateAdmin,
  upload.single('image'),
  AdminController.updateUserProfilePic,
)

router.delete(
  '/users/:id/profilePicture',
  verifyToken,
  authenticateAdmin,
  AdminController.deleteUserProfilePic,
)

router.patch(
  '/users/:id',
  verifyToken,
  authenticateAdmin,
  AdminController.updateUser,
)

router.delete(
  '/users/:id',
  verifyToken,
  authenticateAdmin,
  AdminController.deleteUser,
)

module.exports = router
