import { Outlet } from 'react-router-dom'
import './App.css'
import Leftbar from './components/leftbar'
import Rightbar from './components/rightbar'

const App = () => {
    return (
        <>
            <div className="main-box">
                <Leftbar />
                <Outlet />
                <Rightbar />
            </div>
        </>
    )
}

export default App
