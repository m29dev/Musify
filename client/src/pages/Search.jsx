import Navbar from '../components/navbar'
import ControlPanel from '../components/controlPanel'
import { Card, Container, Form } from 'react-bootstrap'
import { useState } from 'react'
import { useSearchQueryMutation } from '../services/musicService'
import { useSelector } from 'react-redux'
import SearchResultTracks from '../components/searchResultTracks'
import SearchResultArtists from '../components/searchResultArtists'

const Search = () => {
    const { authInfo } = useSelector((state) => state.auth)
    const [searchQuery, setSearchQuery] = useState('')
    const [getSearchQuery] = useSearchQueryMutation()

    const [tracks, setTracks] = useState(null)
    const [artists, setArtists] = useState(null)
    const [playlists, setPlaylists] = useState(null)
    const [albums, setAlbums] = useState(null)

    const onSearchQuery = async (query) => {
        try {
            if (query === '')
                return (
                    setTracks(null),
                    setArtists(null),
                    setPlaylists(null),
                    setAlbums(null)
                )

            console.log(query, 'searchin')

            const res = await getSearchQuery({
                access_token: authInfo?.access_token,
                query,
            }).unwrap()

            setTracks(res?.tracks?.items)
            setArtists(res?.artists?.items)
            setPlaylists(res?.playlists?.items)
            setAlbums(res?.albums?.items)

            console.log(res)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="center-box">
            {/* navbar main */}
            <Navbar></Navbar>

            {/* search nav */}
            <Form>
                <Form.Control
                    type="text"
                    placeholder="Search"
                    className="form-control"
                    value={searchQuery}
                    onChange={(e) => {
                        setSearchQuery(e.target.value)
                        onSearchQuery(e.target.value)
                    }}
                />
            </Form>

            {/* Search results box */}
            <div className="search-results-box">
                {/* Tracks results */}
                {tracks && (
                    <SearchResultTracks
                        tracksData={tracks}
                    ></SearchResultTracks>
                )}

                {/* Artists results */}
                {artists && (
                    <SearchResultArtists
                        artists={artists}
                    ></SearchResultArtists>
                )}

                {/* Albums results */}
                {albums && (
                    <div className="search-results-albums">
                        <h1>Albums</h1>

                        <div className="search-results-grid">
                            {albums?.map(
                                (album, index) =>
                                    index <= 4 && (
                                        <Card key={index} className="card-item">
                                            <Card.Img
                                                variant="top"
                                                src={album?.images?.[1]?.url}
                                                className="card-img-box img-albums"
                                            />
                                            <Card.Body
                                                style={{ paddingTop: '0px' }}
                                            >
                                                <Card.Title
                                                    style={{ fontSize: '16px' }}
                                                >
                                                    {album?.name}
                                                </Card.Title>

                                                <div className="album-artists-box">
                                                    {album?.artists?.map(
                                                        (artist, index) => (
                                                            <p key={index}>
                                                                {index > 0
                                                                    ? `, ${artist?.name}`
                                                                    : artist?.name}
                                                            </p>
                                                        )
                                                    )}
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    )
                            )}
                        </div>
                    </div>
                )}

                {/* Playlists results */}
                {playlists && (
                    <div className="search-results-playlists">
                        <h1>Playlists</h1>
                    </div>
                )}
            </div>

            <ControlPanel></ControlPanel>
        </div>
    )
}

export default Search
