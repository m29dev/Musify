import { useCallback, useEffect, useState } from 'react'
import { useGetSongsSavedMutation } from '../services/musicService'
import { useSelector } from 'react-redux'

const Leftbar = () => {
    const { authInfo } = useSelector((state) => state.auth)
    const [songsSaved] = useGetSongsSavedMutation()
    const [savedSongs, setSavedSongs] = useState(null)

    const getSongsSaved = useCallback(async () => {
        try {
            const res = await songsSaved(authInfo?.access_token).unwrap()
            setSavedSongs(res)
            console.log(res)
        } catch (err) {
            console.log(err)
        }
    }, [songsSaved, authInfo, setSavedSongs])

    useEffect(() => {
        //callabck
        getSongsSaved()
    }, [getSongsSaved])

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
                <div className="leftbar-playlist-box">
                    <div className="leftbar-playlist-img">
                        <img src="" alt="" />
                    </div>
                    <div className="leftbar-playlist-info">
                        <p>Liked Songs</p>
                    </div>
                </div>

                {/* {savedSongs &&
                    savedSongs?.items?.map((item) => (
                        <div key={item?.track?.name}>{item?.track?.name}</div>
                    ))} */}
            </div>
        </>
    )
}

export default Leftbar
