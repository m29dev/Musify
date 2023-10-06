import { useDispatch, useSelector } from 'react-redux'
import {
    setOnChangeDuration,
    setPlayVideo,
    setSongInfo,
    setVolumeVideo,
} from '../redux/authSlice'
import { useGetSongIdMutation } from '../services/musicService'
import { BsFillPlayCircleFill, BsFillPauseCircleFill } from 'react-icons/bs'
import { BiSkipPrevious, BiSkipNext } from 'react-icons/bi'
import { useEffect, useState } from 'react'
import FormRange from 'react-bootstrap/FormRange'

const ControlPanel = () => {
    const { songInfo } = useSelector((state) => state.auth)
    const { controlPanelInfo } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const [getSong] = useGetSongIdMutation()
    const [duration, setDuration] = useState(0)

    const nextSong = async () => {
        try {
            let index = songInfo?.index
            // check if current song is last playlist's item
            if (
                index ===
                songInfo?.spotify_playlist?.tracks?.items?.length - 1
            ) {
                index = -1
            }

            const song =
                songInfo.spotify_playlist?.tracks?.items[index + 1]?.track
            const songArtist = song?.artists[0]?.name
            const songName = song?.name

            const res = await getSong(`${songArtist} - ${songName}`).unwrap()

            const songInfoObject = {
                index: index + 1,
                spotify_playlist: songInfo.spotify_playlist,
                spotify_song: song,
                youtube_song: res,
            }

            console.log(songInfoObject)

            dispatch(setSongInfo(songInfoObject))
            dispatch(controlPanelInfo.durationVideo(`0:00`))
        } catch (err) {
            console.log(err)
        }
    }

    const updatePlayVideo = (boolean) => {
        dispatch(setPlayVideo(boolean))
    }

    const updateVolume = (volume) => {
        dispatch(setVolumeVideo(volume))
    }

    const changeDuration = (event) => {
        setDuration(Math.trunc(event.target.value))
        dispatch(setOnChangeDuration(Math.trunc(event.target.value)))
    }

    function fancyTimeFormat(duration) {
        const mins = ~~((duration % 3600) / 60)
        const secs = ~~duration % 60
        let ret = ''
        ret += '' + mins + ':' + (secs < 10 ? '0' : '')
        ret += '' + secs
        return ret
    }

    useEffect(() => {
        // on duration updates set duration variable
        setDuration(controlPanelInfo?.durationVideo)
    }, [controlPanelInfo])
    return (
        <>
            {/* CONTROL PANEL */}
            <div className="control-panel-box">
                {/* upper control panel */}
                <div className="control-panel-upper">
                    {/* title */}
                    <div className="control-panel-title">
                        {songInfo?.spotify_song && (
                            <>
                                <h1>{songInfo?.spotify_song?.name}</h1>

                                <div className="title-artists-box">
                                    {songInfo?.spotify_song?.artists.map(
                                        (artist) => {
                                            return (
                                                <h4 key={artist?.name}>
                                                    {artist?.name}
                                                </h4>
                                            )
                                        }
                                    )}
                                </div>
                            </>
                        )}
                    </div>

                    <div className="control-panel-btn-box">
                        {/* PREVIOUS BTN */}
                        <BiSkipPrevious className="control-panel-btn"></BiSkipPrevious>

                        {/* PLAY BTN */}
                        <BsFillPlayCircleFill
                            onClick={() => {
                                updatePlayVideo(true)
                            }}
                            className="control-panel-btn"
                        ></BsFillPlayCircleFill>

                        {/* PAUSE BTN */}
                        <BsFillPauseCircleFill
                            onClick={() => {
                                updatePlayVideo(false)
                            }}
                            className="control-panel-btn"
                        ></BsFillPauseCircleFill>

                        {/* NEXT BTN */}
                        <BiSkipNext
                            className="control-panel-btn"
                            onClick={() => {
                                nextSong()
                            }}
                        ></BiSkipNext>
                    </div>

                    <div>
                        <input
                            type="range"
                            min={0}
                            max={1}
                            step={0.02}
                            value={controlPanelInfo?.volumeVideo}
                            onChange={(event) => {
                                updateVolume(event.target.valueAsNumber)
                            }}
                        />
                    </div>
                </div>

                {/* lower control panel */}
                <div className="control-panel-lower">
                    {/* video duration   */}
                    <div className="control-panel-current-duration">
                        {fancyTimeFormat(controlPanelInfo?.durationVideo)}
                    </div>

                    {/* progress duration */}
                    <input
                        type="range"
                        min={0}
                        max={songInfo?.spotify_song?.duration_ms / 1000}
                        step={0.01}
                        value={duration}
                        className="control-panel-range"
                        onChange={(event) => {
                            changeDuration(event)
                        }}
                    />

                    {/* video duration */}
                    <div className="control-panel-duration">
                        {fancyTimeFormat(
                            songInfo?.spotify_song?.duration_ms / 1000
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default ControlPanel
