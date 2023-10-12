require('dotenv').config()
const querystring = require('querystring')

const sign_in = async (req, res) => {
    try {
        const scope = `user-modify-playback-state
            user-read-playback-state
            user-read-currently-playing
            user-library-modify
            user-library-read
            user-top-read
            playlist-read-private
            playlist-modify-public`

        const obj = {
            client_id: process.env.SPOTIFY_CLIENT_ID,
            redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
        }

        res.json(obj)

        // res.redirect(
        //     'https://accounts.spotify.com/authorize?' +
        //         querystring.stringify({
        //             response_type: 'code',
        //             client_id: process.env.SPOTIFY_CLIENT_ID,
        //             scope: scope,
        //             redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
        //             state: 1234567890123456,
        //         })
        // )
    } catch (err) {
        console.log(err)
    }
}

const signed_in = async (req, res) => {
    try {
        const encodeFormData = (data) => {
            return Object.keys(data)
                .map(
                    (key) =>
                        encodeURIComponent(key) +
                        '=' +
                        encodeURIComponent(data[key])
                )
                .join('&')
        }

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

const request = require('request')
const refresh_token = async (req, res) => {
    try {
        const { refresh_token } = req.params

        const authOptions = {
            url: 'https://accounts.spotify.com/api/token',
            headers: {
                Authorization:
                    'Basic ' +
                    new Buffer.from(
                        process.env.SPOTIFY_CLIENT_ID +
                            ':' +
                            process.env.SPOTIFY_CLIENT_SECRET
                    ).toString('base64'),
            },
            form: {
                grant_type: 'refresh_token',
                refresh_token: refresh_token,
            },
            json: true,
        }

        request.post(authOptions, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                const access_token = body.access_token
                res.status(200).json({
                    access_token: access_token,
                })
            }
        })
    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    sign_in,
    signed_in,
    refresh_token,
}
