const express = require('express')
const router = express.Router()
const AdminController = require('../controllers/AdminController.js')
const { authenticateAdmin } = require('../middleware/authenticateAdmin.js')
const { verifyToken } = require('../middleware/verifyToken.js')

router.get(
  '/users',
  verifyToken,
  authenticateAdmin,
  AdminController.getUsersAdmin,
)

router.put(
  '/users/:id',
  verifyToken,
  authenticateAdmin,
  AdminController.updateUser,
)

router.patch(
  '/users/:id/profilePic',
  verifyToken,
  authenticateAdmin,
  AdminController.updateUserProfilePic,
)

module.exports = router
