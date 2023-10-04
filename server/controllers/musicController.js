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

module.exports = {
    playlists_get,
    playlists_id_get,
    albums_get,
    albums_id_get,
}
