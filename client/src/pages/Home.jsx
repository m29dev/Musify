import Navbar from '../components/navbar'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setFullScreenMode } from '../redux/authSlice'

const Home = () => {
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
        <div
            className="center-box"
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
            }}
        >
            {/* navbar main */}
            <Navbar></Navbar>
        </div>
    )
}

export default Home
