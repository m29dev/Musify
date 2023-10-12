import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
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

    const [sliderTitle, setSliderTitle] = useState(false)
    const [sldierArtists, setSliderArtists] = useState(false)

    useEffect(() => {
        // title slider toggle
        const getTitle = document.querySelector('.get-title')
        console.log(getTitle?.innerHTML?.length)
        if (getTitle?.innerHTML?.length >= 23) {
            setSliderTitle(true)
            console.log('title TRUE SLIDER')
        } else {
            setSliderTitle(false)
            console.log('title FALSE')
        }

        // aritsts slider toggle
        const artists = document.querySelectorAll('.rightbar-artists')
        let artistsAllWidth = 0
        artists?.forEach((artist) => {
            artistsAllWidth += artist?.offsetWidth
        })
        if (+artistsAllWidth >= 400) {
            setSliderArtists(true)
            console.log('artists TRUE SLIDER')
        } else {
            setSliderArtists(false)
            console.log('artists FALSE')
        }
    }, [songInfo, setSliderTitle, setSliderArtists])

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

                {!hideRightbar && (
                    <>
                        {
                            <div className="rightbar-img-box">
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

                        {/* title slider */}
                        {/* <div
                            ref={titleBoxRef}
                            className="slider-marquee"
                        >
                            <div className="title-slider-attach slider-track">
                                <a className="get-title">
                                    {songInfo?.spotify_song?.name}
                                </a>
                            </div>
                        </div> */}

                        {/* title slider */}
                        <div
                            className="slider-marquee"
                            style={{ height: '35px' }}
                        >
                            <div className={sliderTitle ? 'slider-track' : ''}>
                                <div>
                                    <h1 className="get-title">
                                        {songInfo?.spotify_song?.name}
                                    </h1>
                                </div>
                            </div>
                        </div>

                        {/* artists slider */}
                        <div className="slider-marquee">
                            <div
                                className={sldierArtists ? 'slider-track' : ''}
                            >
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
