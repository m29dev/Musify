import { useDispatch, useSelector } from 'react-redux'
import { setControlPanelInfo } from '../redux/authSlice'
import { useState } from 'react'

const ControlPanel = () => {
    const { songInfo } = useSelector((state) => state.auth)
    const { controlPanelInfo } = useSelector((state) => state.auth)
    const { currentDuration, setCurrentDuration } = useState(null)

    const dispatch = useDispatch()

    let countProgress = controlPanelInfo.durationVideo
    function fancyTimeFormat(duration) {
        // Hours, minutes and seconds
        const mins = ~~((duration % 3600) / 60)
        const secs = ~~duration % 60

        // Output like "1:01" or "4:03:59" or "123:03:59"
        let ret = ''

        ret += '' + mins + ':' + (secs < 10 ? '0' : '')
        ret += '' + secs

        //dispatch(setControlPanelInfo({ durationVideo: ret }))
        console.log(ret)
        setCurrentDuration(ret)
    }

    const durationProgress = (e) => {
        countProgress = Math.trunc(e.playedSeconds)
        fancyTimeFormat(countProgress)
    }

    const updateControlPanelInfo = (boolean) => {
        dispatch(
            setControlPanelInfo({
                playVideo: boolean,
                durationVideo: countProgress,
            })
        )
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
                        updateControlPanelInfo(true)
                    }}
                >
                    Play
                </button>
                <button
                    onClick={() => {
                        updateControlPanelInfo(false)
                    }}
                >
                    Stop
                </button>
                <p>{currentDuration}</p>
            </div>
        </>
    )
}

export default ControlPanel
