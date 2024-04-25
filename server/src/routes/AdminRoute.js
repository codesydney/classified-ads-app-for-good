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

module.exports = router
