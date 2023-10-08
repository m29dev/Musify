import { useSelector } from 'react-redux'
import YoutubePlayer from './youtubePlayer'

const Rightbar = () => {
    const { songInfo, fullScreenMode } = useSelector((state) => state.auth)

    return (
        <>
            <div className="bar-box rightbar">
                {/* YouTube player box */}
                <div
                    className={
                        fullScreenMode
                            ? 'rightbar-img-box-absolute'
                            : 'rightbar-img-box'
                    }
                >
                    <YoutubePlayer></YoutubePlayer>
                </div>

                {fullScreenMode && (
                    <div
                        className="rightbar-img-box"
                        style={{
                            border: 'solid 1px gray',
                            borderRadius: '18px',
                        }}
                    >
                        <img
                            src={songInfo?.spotify_playlist?.images?.[0]?.url}
                            style={{
                                height: '100%',
                                width: '100%',
                                borderRadius: '18px',
                            }}
                        />
                    </div>
                )}

                <h1>{songInfo?.spotify_song?.name}</h1>
                <h4>{songInfo?.spotify_song?.artists[0]?.name}</h4>
                <h5></h5>
            </div>
        </>
    )
}

export default Rightbar
