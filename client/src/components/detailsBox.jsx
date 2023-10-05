// for PLAYLIST's details / ALBUM's details
import parse from 'html-react-parser'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGetSongIdMutation } from '../services/musicService'
import { useDispatch } from 'react-redux'
import { setSongInfo } from '../redux/authSlice'

const DetailsBox = (playlistData) => {
    const playlist = playlistData.playlist
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const navTo = (id) => {
        navigate(`${id}`)
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

    const [getSong] = useGetSongIdMutation()
    const runPlayer = async (data) => {
        // if track's from playlist
        if (data?.track?.name) {
            const res = await getSong(
                `${data?.track?.artists[0]?.name} - ${data?.track?.name}`
            ).unwrap()

            const resObject = { data: data?.track, res: res }
            console.log(resObject)

            dispatch(setSongInfo(resObject))
        }

        // if track's from album
        if (data?.name) {
            const res = await getSong(
                `${data?.artists[0]?.name} - ${data?.name}`
            ).unwrap()

            const resObject = { data: data, res: res }
            console.log(resObject)

            dispatch(setSongInfo(resObject))
        }
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
                    <div
                        className={
                            playlist?.name?.length > 14
                                ? 'playlist-name-long'
                                : 'playlist-name'
                        }
                    >
                        {playlist?.name}
                    </div>

                    {/* description */}
                    {playlist?.description && (
                        <div className="playlist-description">
                            {parse(`${playlist?.description}`)}
                        </div>
                    )}

                    {/* author, songs amount, followers amount */}
                    {/* owner if it's playlist */}
                    {playlist?.owner && (
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
                    )}

                    {/* artist / artists if it's album */}
                    {playlist?.artists && (
                        <div className="playlist-author">
                            {playlist?.artists?.map((artist) => (
                                <p key={artist.name}>{artist.name}</p>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* playlists songs */}
            <div className="table-box">
                {/* table nav */}
                <div className="table-nav">
                    <div className="column index">#</div>
                    <div className="column title">Title</div>
                    {playlist?.type === 'playlist' ? (
                        <div className="column album">Album</div>
                    ) : (
                        <div className="column album"></div>
                    )}
                    <div className="column time">Time</div>
                </div>

                {/* table items */}
                {playlist?.tracks?.items?.map((item, index) => {
                    return (
                        <div
                            key={index}
                            className="table-item"
                            onClick={() => {
                                runPlayer(item)
                            }}
                        >
                            {/* id */}
                            <div className="column index">{index + 1}</div>

                            {/* title */}
                            <div className="column title">
                                {/* if playlist */}
                                {item?.track && (
                                    <>
                                        <h1>{item?.track?.name}</h1>

                                        <div className="title-artists-box">
                                            {item?.track?.artists.map(
                                                (artist) => {
                                                    return (
                                                        <h4 key={artist?.name}>
                                                            {artist?.name}
                                                        </h4>
                                                    )
                                                }
                                            )}
                                        </div>
                                    </>
                                )}

                                {/* if album */}
                                {item?.name && (
                                    <>
                                        <h1>{item?.name}</h1>

                                        <div className="title-artists-box">
                                            {item?.artists.map((artist) => {
                                                return (
                                                    <h4 key={artist?.name}>
                                                        {artist?.name}
                                                    </h4>
                                                )
                                            })}
                                        </div>
                                    </>
                                )}
                            </div>

                            {/* Album */}
                            {item?.track?.album ? (
                                <div className="column album">
                                    {item?.track?.album?.name}
                                </div>
                            ) : (
                                <div className="column album"></div>
                            )}

                            {/* Time */}
                            {item?.track?.duration_ms &&
                                convertTime(item?.track?.duration_ms)}

                            {item?.duration_ms &&
                                convertTime(item?.duration_ms)}
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default DetailsBox
