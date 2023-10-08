import { Card } from 'react-bootstrap'

const SearchResultArtists = (artists) => {
    return (
        <>
            <h1>Artists</h1>
            <div className="search-results-grid">
                {artists?.artists?.map(
                    (artist, index) =>
                        index <= 4 && (
                            <Card key={index} className="card-item">
                                <Card.Img
                                    variant="top"
                                    src={artist?.images?.[2]?.url}
                                    className="card-img-box img-artists"
                                />
                                <Card.Body>
                                    <Card.Title>{artist?.name}</Card.Title>
                                </Card.Body>
                            </Card>
                        )
                )}
            </div>
        </>
    )
}

export default SearchResultArtists
