import { useDispatch, useSelector } from 'react-redux'
import { setPlayVideo } from '../redux/authSlice'

const ControlPanel = () => {
    const { songInfo } = useSelector((state) => state.auth)
    const { controlPanelInfo } = useSelector((state) => state.auth)
    const dispatch = useDispatch()

    const updatePlayVideo = (boolean) => {
        dispatch(setPlayVideo(boolean))
    }

    return (
        <>
            {/* CONTROL PANEL */}
            <div className="control-panel-box">
                {/* display song info */}

                {/* title */}
                <div className="column title">
                    {songInfo?.data && (
                        <>
                            <h1>{songInfo?.data?.name}</h1>

                            <div className="title-artists-box">
                                {songInfo?.data?.artists.map((artist) => {
                                    return (
                                        <h4 key={artist?.name}>
                                            {artist?.name}
                                        </h4>
                                    )
                                })}
                            </div>
                        </>
                    )}
                </div>

                <button
                    onClick={() => {
                        updatePlayVideo(true)
                    }}
                >
                    Play
                </button>
                <button
                    onClick={() => {
                        updatePlayVideo(false)
                    }}
                >
                    Stop
                </button>
                <p>{controlPanelInfo?.durationVideo}</p>
            </div>
        </>
    )
}

export default ControlPanel
