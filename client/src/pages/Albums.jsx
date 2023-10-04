import { useSelector } from 'react-redux'
import { useGetAllAlbumsMutation } from '../services/musicService'
import { useCallback, useEffect } from 'react'

const Albums = () => {
    const { authInfo } = useSelector((state) => state.auth)
    const [getAlbums] = useGetAllAlbumsMutation()

    const getAlbumsData = useCallback(async () => {
        try {
            const res = await getAlbums(authInfo).unwrap()
            console.log(res)
        } catch (err) {
            console.log(err)
        }
    }, [getAlbums, authInfo])

    useEffect(() => {
        getAlbumsData()
    }, [getAlbumsData])

    return <div>Albums</div>
}

export default Albums
