import Navbar from '../components/navbar'
import { Form } from 'react-bootstrap'
import { useState } from 'react'
import { useSearchQueryMutation } from '../services/musicService'
import { useSelector } from 'react-redux'
import SearchResultTracks from '../components/searchResultTracks'
import SearchResultArtists from '../components/searchResultArtists'
import SearchResultAlbums from '../components/searchResultAlbums'

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

            const res = await getSearchQuery({
                access_token: authInfo?.access_token,
                query,
            }).unwrap()

            setTracks(res?.tracks?.items)
            setArtists(res?.artists?.items)
            setPlaylists(res?.playlists?.items)
            setAlbums(res?.albums?.items)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="center-box">
            {/* navbar main */}
            <Navbar></Navbar>

            {/* search nav */}
            <Form
                onSubmit={(e) => {
                    e.preventDefault()
                }}
            >
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
                    <>
                        <h3 style={{ margin: '0px' }}>Songs</h3>
                        <SearchResultTracks
                            tracksData={tracks}
                        ></SearchResultTracks>
                    </>
                )}

                {/* Artists results */}
                {artists && (
                    <>
                        <h3>Artists</h3>
                        <SearchResultArtists
                            artists={artists}
                        ></SearchResultArtists>
                    </>
                )}

                {/* Albums results */}
                {albums && (
                    <>
                        <h3>Albums</h3>
                        <SearchResultAlbums
                            albums={albums}
                        ></SearchResultAlbums>
                    </>
                )}

                {/* Playlists results */}
                {playlists && (
                    <>
                        <h3>Playlists</h3>
                        <SearchResultAlbums
                            albums={playlists}
                        ></SearchResultAlbums>
                    </>
                )}
            </div>
        </div>
    )
}

export default Search
