import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import { BsGithub } from 'react-icons/bs'
import {
    TbLayoutSidebarRightCollapseFilled,
    TbLayoutSidebarRightExpandFilled,
} from 'react-icons/tb'
import { setHideRightbar } from '../redux/authSlice'

const Rightbar = () => {
    const { songInfo, hideRightbar } = useSelector((state) => state.auth)
    const navigate = useNavigate()
    const dispatch = useDispatch()

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
            <div
                className={
                    hideRightbar ? 'bar-box rightbar-hide' : 'bar-box rightbar'
                }
            >
                {/* absolute toggle button */}
                <div className="rightbar-navbar">
                    {/* current playlist name */}

                    {/* show / hide bar button */}
                    <div
                        onClick={() => dispatch(setHideRightbar(!hideRightbar))}
                    >
                        {/* on display true */}
                        {!hideRightbar && (
                            <TbLayoutSidebarRightCollapseFilled
                                style={{ width: '30px', height: '30px' }}
                            ></TbLayoutSidebarRightCollapseFilled>
                        )}

                        {/* on display false */}
                        {hideRightbar && (
                            <TbLayoutSidebarRightExpandFilled
                                style={{ width: '30px', height: '30px' }}
                            ></TbLayoutSidebarRightExpandFilled>
                        )}
                    </div>
                </div>

                {/* YouTube player box */}
                {!hideRightbar && (
                    <>
                        {/* <div
                            className={
                                fullScreenMode
                                    ? 'rightbar-img-box-absolute'
                                    : 'rightbar-img-box'
                            }
                        >
                            <YoutubePlayer></YoutubePlayer>
                        </div> */}

                        {
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
                                            songInfo?.spotify_song?.album
                                                ?.images?.[0]?.url
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
                                            songInfo?.spotify_playlist
                                                ?.images?.[0]?.url
                                        }
                                        style={{
                                            height: '100%',
                                            width: '100%',
                                            borderRadius: '18px',
                                        }}
                                    />
                                )}
                            </div>
                        }

                        <h1>{songInfo?.spotify_song?.name}</h1>

                        {/* artists slider */}
                        <div ref={artistsBoxRef} className="slider-marquee">
                            <div className="slider-attach">
                                {songInfo?.spotify_song?.artists?.map(
                                    (artist, index) => (
                                        <a
                                            key={index}
                                            onClick={() => {
                                                navigate(
                                                    `/artists/${artist?.id}`
                                                )
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

                        <div style={{ flexGrow: 1 }}></div>

                        {/* about info */}
                        <div className="about-info">
                            <h4
                                onClick={() => {
                                    navigate(`https://github.com/m29dev/Musify`)
                                }}
                            >
                                Musify <BsGithub></BsGithub>
                            </h4>
                            <h4>© Author 2023</h4>
                        </div>
                    </>
                )}
            </div>
        </>
    )
}

export default Rightbar
