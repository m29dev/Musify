import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
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
    const titleBoxRef = useRef(null)

    const [sliderTitle, setSliderTitle] = useState(false)
    const [sldierArtists, setSliderArtists] = useState(false)

    useEffect(() => {
        // title slider toggle
        //const attachTitle = document.querySelector('.title-slider-attach')
        const getTitle = document.querySelector('.get-title')
        if (+getTitle?.offsetWidth >= +titleBoxRef?.current?.offsetWidth) {
            // attachTitle?.classList?.add('slider-track')
            setSliderTitle(true)
            console.log('title TRUE SLIDER')
        } else {
            // attachTitle?.classList?.remove('slider-track')
            setSliderTitle(false)
            console.log('title FALSE')
        }

        // aritsts slider toggle
        //const attachArtists = document.querySelector('.artists-slider-attach')
        const artists = document.querySelectorAll('.rightbar-artists')
        let artistsAllWidth = 0
        artists?.forEach((artist) => {
            artistsAllWidth += artist?.offsetWidth
        })
        const artistsBoxWidth = artistsBoxRef?.current?.offsetWidth
        if (+artistsAllWidth >= +artistsBoxWidth) {
            // attachArtists?.classList?.add('slider-track')
            setSliderArtists(true)
            console.log('artists TRUE SLIDER')
        } else {
            // attachArtists?.classList?.remove('slider-track')
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

                {/* YouTube player box */}
                {!hideRightbar && (
                    <>
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
                            ref={titleBoxRef}
                            className="slider-marquee"
                            style={{ height: '35px' }}
                        >
                            <div className={sliderTitle ? 'slider-track' : ''}>
                                <div className="get-title">
                                    <h1>{songInfo?.spotify_song?.name}</h1>
                                </div>
                            </div>
                        </div>

                        {/* artists slider */}
                        <div ref={artistsBoxRef} className="slider-marquee">
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
