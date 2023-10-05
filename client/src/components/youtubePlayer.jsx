import ReactPlayer from 'react-player'
import { useDispatch, useSelector } from 'react-redux'
import { setDurationVideo } from '../redux/authSlice'

const YoutubePlayer = () => {
    const { songInfo } = useSelector((state) => state.auth)
    const { controlPanelInfo } = useSelector((state) => state.auth)

    const dispatch = useDispatch()

    let countProgress = controlPanelInfo?.durationVideo
    function fancyTimeFormat(duration) {
        const mins = ~~((duration % 3600) / 60)
        const secs = ~~duration % 60
        let ret = ''
        ret += '' + mins + ':' + (secs < 10 ? '0' : '')
        ret += '' + secs

        dispatch(setDurationVideo(ret))
    }

    const durationProgress = (e) => {
        countProgress = Math.trunc(e.playedSeconds)
        fancyTimeFormat(countProgress)
    }

    return (
        <>
            {/* YOUTUBE PLAYER */}
            <ReactPlayer
                url={`https://www.youtube.com/embed/${songInfo?.res?.id?.videoId}`}
                playing={controlPanelInfo?.playVideo}
                onProgress={durationProgress}
                width={`100%`}
                height={`100%`}
            ></ReactPlayer>
        </>
    )
}

export default YoutubePlayer
