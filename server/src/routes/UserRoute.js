const express = require('express')
const UserController = require('../controllers/UserController')

const router = express.Router()

router.get('/', UserController.getUsers)

router.post('/signup', UserController.signup)

router.post('/signin', UserController.signin)

router.post('/request-reset-password', UserController.requestResetPassword)

router.post('/reset-password', UserController.resetPassword)

module.exports = router
