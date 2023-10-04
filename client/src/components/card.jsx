import Card from 'react-bootstrap/Card'
import { useNavigate } from 'react-router-dom'
import parse from 'html-react-parser'

function CardComponent(playlist) {
    const playlistInfo = playlist
    const navigate = useNavigate()

    return (
        <Card
            className="card-item"
            onClick={() => {
                navigate(`/playlists/${playlistInfo.playlist.id}`)
            }}
        >
            <Card.Img
                variant="top"
                src={playlistInfo?.playlist?.images[0]?.url}
                className="card-img-box"
            />
            <Card.Body>
                <Card.Title>{playlistInfo?.playlist?.name}</Card.Title>

                <Card.Text>
                    {parse(playlistInfo?.playlist?.description)}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default CardComponent
