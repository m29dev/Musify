import Navbar from '../components/navbar'
import { Container } from 'react-bootstrap'
import Playlists from './Playlists'

const Home = () => {
    return (
        <div className="center-box">
            {/* navbar main */}
            <Navbar></Navbar>

            <Container fluid className="home-box">
                {/* card playlist item */}
                <Playlists></Playlists>
            </Container>
        </div>
    )
}

export default Home
