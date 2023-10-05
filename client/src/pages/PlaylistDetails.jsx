import Navbar from '../components/navbar'
import { useGetPlaylistIdMutation } from '../services/musicService'
import { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import DetailsBox from '../components/detailsBox'
import ControlPanel from '../components/controlPanel'

const PlaylistDetails = () => {
    const [playlistId] = useGetPlaylistIdMutation()
    const params = useParams()
    const { authInfo } = useSelector((state) => state.auth)
    const [playlist, setPlaylist] = useState(null)

    const getPlaylistId = useCallback(async () => {
        try {
            // get params id
            const { id } = params
            const res = await playlistId({ authInfo, id }).unwrap()
            setPlaylist(res)
        } catch (err) {
            console.log(err)
        }
    }, [playlistId, params, authInfo, setPlaylist])

    useEffect(() => {
        // fetch playlid by id
        getPlaylistId()
    }, [getPlaylistId])

    return (
        <div className="center-box">
            {/* navbar main */}
            <Navbar></Navbar>
            {playlist && <DetailsBox playlist={playlist}></DetailsBox>}
            <ControlPanel></ControlPanel>
        </div>
    )
}

export default PlaylistDetails
