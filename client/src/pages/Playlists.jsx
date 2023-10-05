import { useCallback, useEffect, useState } from 'react'
import { useGetAllPlaylistsMutation } from '../services/musicService'
import { useSelector } from 'react-redux'
import CardComponent from '../components/card'
import Navbar from '../components/navbar'
import { Container } from 'react-bootstrap'
import ControlPanel from '../components/controlPanel'

const Playlists = () => {
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
        <>
            <div className="center-box">
                {/* navbar main */}
                <Navbar></Navbar>

                <Container fluid className="home-box">
                    {playlists?.map((playlist) => {
                        return (
                            <div key={playlist?.name} className="home-box-item">
                                <CardComponent
                                    playlist={playlist}
                                ></CardComponent>
                            </div>
                        )
                    })}
                </Container>

                <ControlPanel></ControlPanel>
            </div>
        </>
    )
}

export default Playlists
