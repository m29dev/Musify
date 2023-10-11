import { Outlet } from 'react-router-dom'
import './App.css'
import Leftbar from './components/leftbar'
import Rightbar from './components/rightbar'
import ControlPanel from './components/controlPanel'
import YoutubePlayer from './components/youtubePlayer'

const App = () => {
    return (
        <>
            <div className="main-box">
                <Leftbar />
                <div className="test-home-box">
                    <Outlet />
                    {/* youtube player */}
                    <YoutubePlayer></YoutubePlayer>
                </div>
                <Rightbar />
            </div>

            {/* control panel bar */}
            <ControlPanel></ControlPanel>
        </>
    )
}

export default App
