import { useCallback, useEffect, useState } from 'react'
import Navbar from '../components/navbar'
import { useGetAllPlaylistsMutation } from '../services/musicService'
import { useSelector } from 'react-redux'
import { Container } from 'react-bootstrap'
import CardComponent from '../components/card'

const Home = () => {
    const { authInfo } = useSelector((state) => state.auth)
    const [allPlaylists] = useGetAllPlaylistsMutation()
    const [playlists, setPlaylists] = useState(null)

    const getAllPlaylists = useCallback(async () => {
        try {
            const res = await allPlaylists(authInfo).unwrap()
            console.log(res.items)
            setPlaylists(res.items)
        } catch (err) {
            console.log(err)
        }
    }, [allPlaylists, authInfo])

    useEffect(() => {
        getAllPlaylists()
    }, [getAllPlaylists])

    return (
        <div className="center-box">
            {/* navbar main */}
            <Navbar></Navbar>

            {/* <div className="home-box">
                {playlists?.map((playlist) => {
                    return <div key={playlist?.name}>{playlist?.name}</div>
                })}
            </div> */}

            <Container fluid className="home-box">
                {/* card playlist item */}
                {playlists?.map((playlist) => {
                    return (
                        <div key={playlist?.name} className="home-box-item">
                            <CardComponent playlist={playlist}></CardComponent>
                        </div>
                    )
                })}
            </Container>
        </div>
    )
}

export default Home
