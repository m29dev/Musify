import { useSelector } from 'react-redux'
import YoutubePlayer from './youtubePlayer'

const Rightbar = () => {
    const { songInfo } = useSelector((state) => state.auth)

    return (
        <>
            <div className="bar-box rightbar">
                <div className="rightbar-img-box">
                    <YoutubePlayer></YoutubePlayer>
                </div>

                <h1>{songInfo?.spotify_song?.name}</h1>
                <h4>{songInfo?.spotify_song?.artists[0]?.name}</h4>
                <h5></h5>
            </div>
        </>
    )
}

export default Rightbar
