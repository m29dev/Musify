const express = require('express')
const controller = require('../controllers/musicController.js')

const router = express.Router()

router.get('/api/music/playlists/:access_token', controller.playlists_get)
router.get(
    '/api/music/playlists/:access_token/:id',
    controller.playlists_id_get
)

module.exports = router
