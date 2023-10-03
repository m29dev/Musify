const express = require('express')
const controller = require('../controllers/authController.js')

const router = express.Router()

router.get('/api/auth/signin', controller.sign_in)
router.get('/api/signedin', controller.signed_in)
router.get('/api/auth/refresh/:refresh_token', controller.refresh_token)

module.exports = router
