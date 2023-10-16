import Navbar from '../components/navbar'
import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setFullScreenMode, setSongInfo } from '../redux/authSlice'
import { BsGithub } from 'react-icons/bs'
import { useGetSongsTopMutation } from '../services/musicService'

const Home = () => {
    const { authInfo, songInfo } = useSelector((state) => state.auth)
    const dispatch = useDispatch()

    // on HomePage init set fullScreen mode to true
    useEffect(() => {
        dispatch(setFullScreenMode(true))
    }, [dispatch])

    // on HomePage exit set fullScreen mode to false
    useEffect(() => {
        return () => {
            // Anything in here is fired on component unmount.
            dispatch(setFullScreenMode(false))
        }
    }, [dispatch])

    const [topSongs] = useGetSongsTopMutation()
    const getTopSongs = useCallback(async () => {
        try {
            const res = await topSongs(authInfo?.access_token).unwrap()
            // const songInfoObject = {
            //     index,
            //     spotify_playlist: {
            //         tracks: { items: tracks?.tracksData },
            //         type: `album`,
            //         name: `${songArtist} - Radio`,
            //         images: track?.album?.images,
            //     },
            //     spotify_song: track,
            //     youtube_song: res,
            // }
            dispatch(setSongInfo(res))
        } catch (err) {
            console.log(err)
        }
    }, [topSongs])

    useEffect(() => {
        if (!songInfo) {
            console.log('fetch top song')
            getTopSongs()
        }
    }, [songInfo, getTopSongs])

    return (
        <div className="center-box test-home-page">
            {/* navbar main */}
            <Navbar></Navbar>

            {!authInfo && (
                <div className="welcome-box">
                    <div className="welcome-brand">
                        <h1 className="welcome-h1">Musify</h1>
                    </div>
                    <h2 className="welcome-h2">
                        Just the place for true music connoisseurs.
                    </h2>
                </div>
            )}

            {!authInfo && (
                <div className="about-info home-about-info">
                    <a href="https://github.com/m29dev/Musify">
                        Musify <BsGithub></BsGithub>
                    </a>
                    <h4>©Michał Majchrzak, 2023.</h4>
                </div>
            )}
        </div>
    )
}

export default Home
