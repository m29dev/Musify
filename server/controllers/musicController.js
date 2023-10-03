const playlists_get = async (req, res) => {
    try {
        const { access_token } = req.params

        const url = 'https://api.spotify.com/v1/me/playlists'
        const headers = {
            Authorization: 'Bearer ' + access_token,
        }

        const playlists = await fetch(url, { headers })
        const data = await playlists.json()
        console.log(data)

        if (!data) return res.status(400).json({ message: 'err' })

        res.status(200).json(data)
    } catch (err) {
        console.log(err)
    }
}

const playlists_id_get = async (req, res) => {
    try {
        console.log('playlists_id_get')
    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    playlists_get,
    playlists_id_get,
}
