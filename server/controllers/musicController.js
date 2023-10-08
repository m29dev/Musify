// GET
// user's playlists
const playlists_get = async (req, res) => {
    try {
        const { access_token } = req.params

        const url = 'https://api.spotify.com/v1/me/playlists'
        const headers = {
            Authorization: 'Bearer ' + access_token,
        }

        const playlists = await fetch(url, { headers })
        const data = await playlists.json()

        if (!data) return res.status(400).json({ message: 'err' })

        res.status(200).json(data)
    } catch (err) {
        console.log(err)
    }
}

// GET
// ID playlist
const playlists_id_get = async (req, res) => {
    try {
        const { access_token } = req.params
        const { id } = req.body

        const url = `https://api.spotify.com/v1/playlists/${id}`
        const headers = {
            Authorization: 'Bearer ' + access_token,
        }

        const playlists = await fetch(url, { headers })
        const data = await playlists.json()

        if (!data) return res.status(400).json({ message: 'err' })

        res.status(200).json(data)
    } catch (err) {
        console.log(err)
    }
}

// GET
// user's albums
const albums_get = async (req, res) => {
    try {
        const { access_token } = req.params

        const url = 'https://api.spotify.com/v1/me/albums'
        const headers = {
            Authorization: 'Bearer ' + access_token,
        }

        const albums = await fetch(url, { headers })
        const data = await albums.json()

        if (!data) return res.status(400).json({ message: 'err' })

        res.status(200).json(data)
    } catch (err) {
        console.log(err)
    }
}

// GET
// ID album
const albums_id_get = async (req, res) => {
    try {
        const { access_token } = req.params
        const { id } = req.body

        const url = `https://api.spotify.com/v1/albums/${id}`
        const headers = {
            Authorization: 'Bearer ' + access_token,
        }

        const album = await fetch(url, { headers })
        const data = await album.json()

        if (!data) return res.status(400).json({ message: 'err' })

        res.status(200).json(data)
    } catch (err) {
        console.log(err)
    }
}

// GET
// saved fav songs
const songs_saved_get = async (req, res) => {
    try {
        const { access_token } = req.params

        const url = 'https://api.spotify.com/v1/me/tracks'
        const headers = {
            Authorization: 'Bearer ' + access_token,
        }

        const albums = await fetch(url, { headers })
        const data = await albums.json()

        if (!data) return res.status(400).json({ message: 'err' })

        res.status(200).json(data)
    } catch (err) {
        console.log(err)
    }
}

// GET
// search for songs / artists / albums / playlists
const search_query_get = async (req, res) => {
    try {
        const { access_token, query } = req.params

        const url = `https://api.spotify.com/v1/search?q=${query}&type=track,playlist,album,artist`
        const headers = {
            Authorization: 'Bearer ' + access_token,
        }

        const searchResults = await fetch(url, { headers })
        const searchData = await searchResults.json()

        if (!searchData) return res.status(400).json({ message: 'err' })

        res.status(200).json(searchData)
    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    playlists_get,
    playlists_id_get,
    albums_get,
    albums_id_get,
    songs_saved_get,
    search_query_get,
}
