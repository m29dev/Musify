import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'

const Leftbar = () => {
    const { songInfo } = useSelector((state) => state.auth)
    const [playlistDropdown, setPlaylistDropdown] = useState(false)
    const { fullScreenMode } = useSelector((state) => state.auth)

    useEffect(() => {
        // on fullScreenMode update set playlistDropdown
        setPlaylistDropdown(fullScreenMode)
    }, [fullScreenMode, setPlaylistDropdown])

    return (
        <>
            <div className="bar-box leftbar">
                <div className="leftbar-navbar">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
                        fill="currentColor"
                        className="bi bi-music-note-beamed"
                        viewBox="0 0 16 16"
                    >
                        <path d="M6 13c0 1.105-1.12 2-2.5 2S1 14.105 1 13c0-1.104 1.12-2 2.5-2s2.5.896 2.5 2zm9-2c0 1.105-1.12 2-2.5 2s-2.5-.895-2.5-2 1.12-2 2.5-2 2.5.895 2.5 2z" />
                        <path
                            fillRule="evenodd"
                            d="M14 11V2h1v9h-1zM6 3v10H5V3h1z"
                        />
                        <path d="M5 2.905a1 1 0 0 1 .9-.995l8-.8a1 1 0 0 1 1.1.995V3L5 4V2.905z" />
                    </svg>
                    <h1>Musify</h1>
                </div>

                <h1>Your Library</h1>

                {/* saved songs */}
                {/* <div className="leftbar-playlist-box">
                    <div className="leftbar-playlist-img">
                        <img src="" alt="" />
                    </div>
                    <div className="leftbar-playlist-info">
                        <p>Liked Songs</p>
                    </div>
                </div> */}

                {/* current playlist */}
                <div
                    className="leftbar-playlist-box"
                    onClick={() => {
                        setPlaylistDropdown(!playlistDropdown)
                    }}
                >
                    <img
                        src={
                            songInfo?.spotify_playlist?.images?.[2]?.url ||
                            songInfo?.spotify_playlist?.images?.[1]?.url ||
                            songInfo?.spotify_playlist?.images?.[0]?.url
                        }
                        alt=""
                        className="leftbar-playlist-img"
                    />

                    <div className="leftbar-playlist-info">
                        {songInfo?.spotify_playlist?.name}
                    </div>

                    <div style={{ flexGrow: 1 }}></div>

                    {playlistDropdown && <IoIosArrowDown></IoIosArrowDown>}
                    {!playlistDropdown && <IoIosArrowUp></IoIosArrowUp>}
                </div>

                {/* current playlist songs dropdown */}
                {playlistDropdown && (
                    <div className="leftbar-table-box">
                        {/* table items */}
                        {songInfo?.spotify_playlist?.tracks?.items?.map(
                            (item, index) => (
                                <div
                                    key={index}
                                    className={
                                        songInfo?.spotify_song?.id ===
                                        (item?.id || item?.track?.id)
                                            ? `table-item-active leftbar-table-item`
                                            : `table-item leftbar-table-item`
                                    }
                                    onClick={() => {
                                        // runPlayer(
                                        //     songInfo?.spotify_playlist,
                                        //     index
                                        // )
                                    }}
                                >
                                    <div className="column leftbar-title">
                                        {item?.track && (
                                            <>
                                                <h1>{item?.track?.name}</h1>

                                                <div className="album-artists-box">
                                                    {item?.track?.artists?.map(
                                                        (artist, index) => (
                                                            <h4 key={index}>
                                                                {index > 0
                                                                    ? `, ${artist?.name}`
                                                                    : artist?.name}
                                                            </h4>
                                                        )
                                                    )}
                                                </div>
                                            </>
                                        )}

                                        {item?.name && (
                                            <>
                                                <h1>{item?.name}</h1>

                                                <div className="album-artists-box">
                                                    {item?.artists?.map(
                                                        (artist, index) => (
                                                            <h4 key={index}>
                                                                {index > 0
                                                                    ? `, ${artist?.name}`
                                                                    : artist?.name}
                                                            </h4>
                                                        )
                                                    )}
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>
                            )
                        )}
                    </div>
                )}
            </div>
        </>
    )
}

export default Leftbar
