require('dotenv').config()
const querystring = require('querystring')

const sign_in = async (req, res) => {
    try {
        console.log('reached sign in')
        console.log(process.env.SPOTIFY_REDIRECT_URI)

        const scope = `user-modify-playback-state
            user-read-playback-state
            user-read-currently-playing
            user-library-modify
            user-library-read
            user-top-read
            playlist-read-private
            playlist-modify-public`

        res.redirect(
            'https://accounts.spotify.com/authorize?' +
                querystring.stringify({
                    response_type: 'code',
                    client_id: process.env.SPOTIFY_CLIENT_ID,
                    scope: scope,
                    redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
                    state: 1234567890123456,
                })
        )
    } catch (err) {
        console.log(err)
    }
}

// this can be used as a seperate module
const encodeFormData = (data) => {
    return Object.keys(data)
        .map(
            (key) =>
                encodeURIComponent(key) + '=' + encodeURIComponent(data[key])
        )
        .join('&')
}

const signed_in = async (req, res) => {
    try {
        console.log('reached signED in')

        const body = {
            grant_type: 'authorization_code',
            code: req.query.code,
            redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
            client_id: process.env.SPOTIFY_CLIENT_ID,
            client_secret: process.env.SPOTIFY_CLIENT_SECRET,
        }

        await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Accept: 'application/json',
            },
            body: encodeFormData(body),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('success_1: ', data)
                const query = querystring.stringify(data)
                res.redirect(
                    `${process.env.SPOTIFY_CLIENT_REDIRECT_URI}?${query}`
                )
            })
    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    sign_in,
    signed_in,
}
