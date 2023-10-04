// for PLAYLIST's details / ALBUM's details
import parse from 'html-react-parser'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const DetailsBox = (playlistData) => {
    const playlist = playlistData.playlist

    const navigate = useNavigate()
    const navTo = (id) => {
        navigate(`/account/${id}`)
    }

    // convers ms to min : sec
    const convertTime = (ms) => {
        let min = ms / 1000 / 60
        let r = min % 1
        let sec = Math.floor(r * 60)
        if (sec < 10) {
            sec = '0' + sec
        }
        min = Math.floor(min)
        return <div className="column time">{`${min}:${sec}`}</div>
    }

    useEffect(() => {
        console.log(playlist)
    }, [playlist])

    return (
        <>
            {/* navbar */}
            <div className="playlist-details-navbar">
                {/* image */}
                <img
                    src={playlist?.images ? playlist?.images[0]?.url : ''}
                    alt=""
                    className="playlist-details-img-box"
                />

                {/* details */}
                <div className="playlist-details-info">
                    {/* name */}
                    <div className="playlist-name">{playlist?.name}</div>

                    {/* description */}
                    <div className="playlist-description">
                        {parse(`${playlist?.description}`)}
                    </div>

                    {/* author, songs amount, followers amount */}
                    <div className="playlist-author">
                        <p
                            onClick={() => {
                                navTo(playlist?.owner?.id)
                            }}
                        >
                            {playlist?.owner.display_name}
                        </p>
                        {` - ${playlist?.tracks?.items?.length} songs - ${playlist?.followers?.total} likes`}
                    </div>
                </div>
            </div>

            {/* playlists songs */}
            <div className="table-box">
                {/* table nav */}
                <div className="table-nav">
                    <div className="column index">#</div>
                    <div className="column title">Title</div>
                    <div className="column album">Album</div>
                    <div className="column time">Time</div>
                </div>

                {/* table items */}
                {playlist?.tracks?.items?.map((item, index) => {
                    return (
                        <div key={index} className="table-item">
                            {/* id */}
                            <div className="column index">{index + 1}</div>

                            {/* title */}
                            <div className="column title">
                                <h1>{item?.track?.name}</h1>
                                {/* <h4>{item?.track?.artists[0]?.name}</h4> */}
                                <div className="title-artists-box">
                                    {item?.track?.artists.map((artist) => {
                                        return (
                                            <h4 key={artist?.name}>
                                                {artist?.name}
                                            </h4>
                                        )
                                    })}
                                </div>
                            </div>

                            {/* Album */}
                            <div className="column album">
                                {item?.track?.album?.name}
                            </div>

                            {/* Time */}
                            {/* <div>{item?.track?.duration_ms / 1000 / 60}</div> */}
                            {convertTime(item?.track?.duration_ms)}
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default DetailsBox
