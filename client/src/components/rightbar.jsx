import { useSelector } from 'react-redux'
import YoutubePlayer from './youtubePlayer'
import { useNavigate } from 'react-router-dom'
import { useEffect, useRef } from 'react'

const Rightbar = () => {
    const { songInfo, fullScreenMode } = useSelector((state) => state.auth)
    const navigate = useNavigate()

    const artistsBoxRef = useRef(null)

    useEffect(() => {
        const attach = document.querySelector('.slider-attach')
        attach.classList.remove('slider-track')

        const artists = document.querySelectorAll('.rightbar-artists')
        let artistsAllWidth = 0
        artists.forEach((artist) => {
            artistsAllWidth += artist.offsetWidth
        })

        const artistsBoxWidth = artistsBoxRef.current.offsetWidth

        if (artistsAllWidth >= artistsBoxWidth) {
            attach.classList.add('slider-track')
        }
    }, [songInfo])

    return (
        <>
            <div className="bar-box rightbar">
                {/* YouTube player box */}
                <div
                    className={
                        fullScreenMode
                            ? 'rightbar-img-box-absolute'
                            : 'rightbar-img-box'
                    }
                >
                    <YoutubePlayer></YoutubePlayer>
                </div>

                {fullScreenMode && (
                    <div
                        className="rightbar-img-box"
                        style={{
                            border: 'solid 1px gray',
                            borderRadius: '18px',
                        }}
                    >
                        {songInfo?.spotify_song?.album?.images ? (
                            <img
                                src={
                                    songInfo?.spotify_song?.album?.images?.[0]
                                        ?.url
                                }
                                style={{
                                    height: '100%',
                                    width: '100%',
                                    borderRadius: '18px',
                                }}
                            />
                        ) : (
                            <img
                                src={
                                    songInfo?.spotify_playlist?.images?.[0]?.url
                                }
                                style={{
                                    height: '100%',
                                    width: '100%',
                                    borderRadius: '18px',
                                }}
                            />
                        )}
                    </div>
                )}

                <h1>{songInfo?.spotify_song?.name}</h1>

                {/* artists slider */}
                <div ref={artistsBoxRef} className="slider-marquee">
                    <div className="slider-attach">
                        {songInfo?.spotify_song?.artists?.map(
                            (artist, index) => (
                                <a
                                    key={index}
                                    onClick={() => {
                                        navigate(`/artists/${artist?.id}`)
                                    }}
                                    className="artist-link rightbar-artists"
                                >
                                    {index > 0
                                        ? `, ${artist?.name}`
                                        : `${artist?.name}`}
                                </a>
                            )
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Rightbar
