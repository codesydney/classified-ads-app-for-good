const express = require('express')
const router = express.Router()
const userController = require('../controllers/UserController')

router.post('/signup', userController.signup)

router.post('/signin', userController.signin)

router.post('/request-reset-password', userController.requestResetPassword)

router.post('/reset-password', userController.resetPassword)
module.exports = router
