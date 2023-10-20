import Navbar from '../components/navbar'
import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setFullScreenMode, setSongInfo } from '../redux/authSlice'
import { BsGithub } from 'react-icons/bs'
import {
    useGetSongIdMutation,
    useGetSongsTopMutation,
} from '../services/musicService'

const Home = () => {
    const { authInfo, songInfo, accountInfo } = useSelector(
        (state) => state.auth
    )
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
    const [getSong] = useGetSongIdMutation()
    const getTopSongs = useCallback(async () => {
        try {
            const res = await topSongs(authInfo?.access_token).unwrap()
            console.log('RES_TEST: ', res)

            const songArtist = res?.items?.[0]?.artists?.[0]?.name
            const songName = res?.items?.[0]?.name

            const resYt = await getSong(`${songArtist} - ${songName}`).unwrap()

            const songInfoObject = {
                index: 0,
                spotify_playlist: {
                    tracks: { items: res?.items },
                    type: `playlist`,
                    name: `${accountInfo.display_name}'s Top Songs`,
                    images: res?.items?.[0]?.album?.images,
                },
                spotify_song: res?.items?.[0],
                youtube_song: resYt,
            }
            dispatch(setSongInfo(songInfoObject))
        } catch (err) {
            console.log(err)
        }
    }, [topSongs, getSong, authInfo, accountInfo, dispatch])

    useEffect(() => {
        if (!songInfo) {
            getTopSongs()
        }
    }, [songInfo, getTopSongs])

    return (
        <div
            className="center-box test-home-page"
            style={
                authInfo
                    ? {}
                    : {
                          maxWidth: '100%',
                          overflow: 'hidden',
                          display: 'flex',
                          justifyContent: 'center',
                      }
            }
        >
            {/* navbar main */}
            <Navbar></Navbar>

            {!authInfo && (
                <div className="welcome-box">
                    <div className="welcome-brand">
                        <h1 className="welcome-h1">Musify</h1>
                    </div>
                    <h2 className="welcome-h2">
                        Just the place for true music listeners.
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
