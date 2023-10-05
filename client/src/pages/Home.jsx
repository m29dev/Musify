import Navbar from '../components/navbar'
import ControlPanel from '../components/controlPanel'

const Home = () => {
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
            {/* player */}
            {/* <ControlPanel></ControlPanel> */}
        </div>
    )
}

export default Home
