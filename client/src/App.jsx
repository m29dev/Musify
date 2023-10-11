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
                <Outlet />
                <Rightbar />
            </div>

            {/* youtube player */}
            <YoutubePlayer></YoutubePlayer>

            {/* control panel bar */}
            <ControlPanel></ControlPanel>
        </>
    )
}

export default App
