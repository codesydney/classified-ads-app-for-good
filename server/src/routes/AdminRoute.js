const express = require('express')
const router = express.Router()
const adminController = require('../controllers/AdminController.js')
const { authenticateAdmin } = require('../middleware/authenticateAdmin.js')
const { verifyToken } = require('../middleware/verifyToken.js')

router.get('/users', verifyToken, authenticateAdmin, (req, res) => {
  res.send('route is working')
})

module.exports = router
