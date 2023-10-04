const express = require('express')
const controller = require('../controllers/musicController.js')

const router = express.Router()

// playlists
router.get('/api/music/playlists/:access_token', controller.playlists_get)
router.post('/api/music/playlists/:access_token', controller.playlists_id_get)

// albums
router.get('/api/music/albums/:access_token', controller.albums_get)
router.post('/api/music/albums/:access_token', controller.albums_id_get)

module.exports = router
