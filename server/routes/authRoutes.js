const express = require('express')
const controller = require('../controllers/authController.js')

const router = express.Router()

router.get('/api/auth/signin', controller.sign_in)
router.get('/api/signedin', controller.signed_in)

module.exports = router
