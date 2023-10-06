import ReactPlayer from 'react-player'
import { useDispatch, useSelector } from 'react-redux'
import { setDurationVideo, setSongInfo } from '../redux/authSlice'
import { useGetSongIdMutation } from '../services/musicService'
import { useEffect, useRef } from 'react'

const YoutubePlayer = () => {
    const { songInfo } = useSelector((state) => state.auth)
    const { controlPanelInfo } = useSelector((state) => state.auth)
    const { onChangeDuration } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const [getSong] = useGetSongIdMutation()

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
        } catch (err) {
            console.log(err)
        }
    }

    const durationProgress = (e) => {
        const countProgress = Math.trunc(e.playedSeconds)
        dispatch(setDurationVideo(countProgress))
    }

    const videoPlayerRef = useRef(null)

    useEffect(() => {
        videoPlayerRef.current.seekTo(onChangeDuration?.durationVideo)
    }, [onChangeDuration])

    return (
        <>
            {/* YOUTUBE PLAYER */}
            <ReactPlayer
                ref={videoPlayerRef}
                url={`https://www.youtube.com/embed/${songInfo?.youtube_song?.id?.videoId}`}
                playing={controlPanelInfo?.playVideo}
                volume={controlPanelInfo?.volumeVideo}
                onProgress={durationProgress}
                onEnded={() => {
                    nextSong()
                }}
                width={`100%`}
                height={`100%`}
            ></ReactPlayer>
        </>
    )
}

export default YoutubePlayer
