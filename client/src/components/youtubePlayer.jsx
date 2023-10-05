import ReactPlayer from 'react-player'
import { useSelector } from 'react-redux'

const YoutubePlayer = () => {
    const { controlPanelInfo } = useSelector((state) => state.auth)
    const durationProgress = () => {
        console.log('progress')
    }

    return (
        <>
            {/* YOUTUBE PLAYER */}
            <ReactPlayer
                url={`https://www.youtube.com/embed/${songInfo?.res?.id?.videoId}`}
                playing={controlPanelInfo.playVideo}
                onProgress={durationProgress}
            ></ReactPlayer>
        </>
    )
}

export default YoutubePlayer
