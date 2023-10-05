import { useSelector } from 'react-redux'
import ControlPanel from './controlPanel'

const Rightbar = () => {
    const { songInfo } = useSelector((state) => state.auth)

    return (
        <>
            <div className="bar-box rightbar">
                <div className="rightbar-img-box">
                    <ControlPanel></ControlPanel>
                </div>

                <h1>{songInfo?.data?.name}</h1>
                <h4>{songInfo?.data?.artists[0]?.name}</h4>
                <h5></h5>
            </div>
        </>
    )
}

export default Rightbar
