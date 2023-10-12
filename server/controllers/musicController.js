// GET
// user's playlists
const playlists_get = async (req, res) => {
    try {
        const { access_token } = req.params

        const url = 'https://api.spotify.com/v1/me/player/recently-played'
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
        let { access_token, query } = req.params

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

// GET
// saved fav artists
const artists_saved_get = async (req, res) => {
    try {
        const { access_token } = req.params

        const url = 'https://api.spotify.com/v1/me/following?type=artist'
        const headers = {
            Authorization: 'Bearer ' + access_token,
        }

        const artists = await fetch(url, { headers })
        const data = await artists.json()

        if (!data) return res.status(400).json({ message: 'err' })

        res.status(200).json(data)
    } catch (err) {
        console.log(err)
    }
}

// GET
// artists id
const artists_id_get = async (req, res) => {
    try {
        const { access_token } = req.params
        const { id } = req.body

        // artist info
        const url = `https://api.spotify.com/v1/artists/${id}`
        const headers = {
            Authorization: 'Bearer ' + access_token,
        }
        const artist = await fetch(url, { headers })
        const data = await artist.json()
        if (!data) return res.status(400).json({ message: 'err' })

        // artist albums
        const urlAlbums = `https://api.spotify.com/v1/artists/${id}/albums`
        const artistAlbums = await fetch(urlAlbums, { headers })
        const dataAlbums = await artistAlbums.json()
        if (!dataAlbums) return res.status(400).json({ message: 'err' })

        // artist albums
        const urlTracks = `https://api.spotify.com/v1/artists/${id}/top-tracks?market=PL`
        const artistTracks = await fetch(urlTracks, { headers })
        const dataTracks = await artistTracks.json()
        if (!dataTracks) return res.status(400).json({ message: 'err' })

        const dataObject = {
            id: data?.id,
            name: data?.name,
            images: data?.images,
            type: data?.type,
            albums: dataAlbums?.items,
            tracks: dataTracks?.tracks,
        }

        res.status(200).json(dataObject)
    } catch (err) {
        console.log(err)
    }
}

// GET
// top song
const user_top_song_get = async (req, res) => {
    try {
        const { access_token } = req.params

        // artist info
        const url = `https://api.spotify.com/v1/me/top/artists`
        const headers = {
            Authorization: 'Bearer ' + access_token,
        }
        const artist = await fetch(url, { headers })
        const data = await artist.json()
        console.log(data)

        res.status(200).json({ message: 'top_song_api', data })
        // if (!data) return res.status(400).json({ message: 'err' })

        // res.status(200).json(dataObject)
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
    artists_saved_get,
    artists_id_get,
    user_top_song_get,
}
