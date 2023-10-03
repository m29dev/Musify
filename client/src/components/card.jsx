import Card from 'react-bootstrap/Card'

function CardComponent(playlist) {
    const playlistInfo = playlist

    return (
        <Card className="card-item">
            <Card.Img
                variant="top"
                src={playlistInfo?.playlist?.images[0]?.url}
                className="card-img-box"
            />
            <Card.Body>
                <Card.Title>{playlistInfo.playlist.name}</Card.Title>
                {playlistInfo.playlist.description.slice(0, 1) !== '<' && (
                    <Card.Text>
                        {playlistInfo.playlist.description |
                        (playlistInfo.playlist.description.length > 50)
                            ? playlistInfo.playlist.description.slice(0, 50) +
                              '...'
                            : playlistInfo.playlist.description}
                    </Card.Text>
                )}
            </Card.Body>
        </Card>
    )
}

export default CardComponent
