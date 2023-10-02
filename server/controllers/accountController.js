const account_get = async (req, res) => {
    try {
        console.log('account_get')
        const { access_token } = req.params
        console.log(access_token)

        const url = 'https://api.spotify.com/v1/me'
        const headers = {
            Authorization: 'Bearer ' + access_token,
        }

        fetch(url, { headers })
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                // use data
            })
            .catch((error) => {
                // handle error
            })
    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    account_get,
}
