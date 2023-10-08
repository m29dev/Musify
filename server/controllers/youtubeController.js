require('dotenv').config()
const baseYoutubeUrl = `https://www.googleapis.com/youtube/v3`
let api_key = process.env.YOUTUBE_API_KEY

const youtube_get = async (req, res) => {
    try {
        const { query } = req.params

        const yt = await fetch(
            `${baseYoutubeUrl}/search?key=${api_key}&type=video&q=${query}`
        )
        const ytData = await yt.json()

        if (!ytData.item)
            return res
                .status(403)
                .json({ message: 'daily limit has been reached' })

        res.json(ytData.items[0])
    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    youtube_get,
}
