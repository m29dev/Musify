require('dotenv').config()
const baseYoutubeUrl = `https://www.googleapis.com/youtube/v3`

const youtube_get = async (req, res) => {
    try {
        const { query } = req.params

        const yt = await fetch(
            `${baseYoutubeUrl}/search?key=${process.env.YOUTUBE_API_KEY}&type=video&q=${query}`
        )
        const ytData = await yt.json()
        console.log(ytData.items[0])
        res.json(ytData.items[0])
    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    youtube_get,
}
