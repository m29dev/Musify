import Navbar from '../components/navbar'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setFullScreenMode } from '../redux/authSlice'

const Home = () => {
    const { authInfo } = useSelector((state) => state.auth)
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

    return (
        <div className="center-box test-home-page">
            {/* navbar main */}
            <Navbar></Navbar>

            {!authInfo && (
                <div style={{ padding: '23px', textAlign: 'center' }}>
                    <h1>Musify is the place for a real music enthusiasts.</h1>
                    <h5>
                        listen to your favorites tracks, artists, playlists,
                        alubums,
                    </h5>
                    <h5>
                        whatever You want, all with an Official Music Video.
                    </h5>
                </div>
            )}
        </div>
    )
}

export default Home
