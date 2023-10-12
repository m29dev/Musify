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
                <div
                    style={{
                        padding: '23px',
                        textAlign: 'center',
                        marginTop: '50px',
                    }}
                >
                    <h1 className="welcome-h1">
                        Just the place for true music connoisseurs.
                    </h1>
                </div>
            )}
        </div>
    )
}

export default Home
