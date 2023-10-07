import { useCallback, useEffect, useState } from 'react'
import { Image, Dropdown } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useGetAccountMutation } from '../services/accountService'
import {
    clearAccountInfo,
    clearAuthInfo,
    setAccountInfo,
    updateAuthInfoToken,
} from '../redux/authSlice'
import { useRefreshTokenMutation } from '../services/authService'
import {
    IoIosArrowDropleftCircle,
    IoIosArrowDroprightCircle,
} from 'react-icons/io'
import { BiHomeAlt2, BiSolidPlaylist } from 'react-icons/bi'
import { AiOutlineSearch } from 'react-icons/ai'
import { LuAlbum } from 'react-icons/lu'

const Navbar = () => {
    const [authMode, setAuthMode] = useState(false)
    const { authInfo } = useSelector((state) => state.auth)
    const { accountInfo } = useSelector((state) => state.auth)
    const dispatch = useDispatch()

    // navigation features
    const navigate = useNavigate()
    const navForward = () => {
        navigate(1)
    }
    const navBack = () => {
        navigate(-1)
    }
    const navTo = (query) => {
        navigate(`/${query}`)
    }

    // sign out
    const signOut = () => {
        // clear local storage info
        dispatch(clearAuthInfo())
        dispatch(clearAccountInfo())
    }

    // refresh token
    const [refreshToken] = useRefreshTokenMutation()
    const runRefreshToken = useCallback(async () => {
        // get refreshed token from server
        const res = await refreshToken(authInfo).unwrap()

        // save refreshed token to the state and local storage
        dispatch(updateAuthInfoToken(res))
    }, [refreshToken, authInfo, dispatch])

    // fetch authorized user account data
    const [getAccount] = useGetAccountMutation()
    const initAccountData = useCallback(async () => {
        try {
            const res = await getAccount(authInfo).unwrap()
            dispatch(setAccountInfo(res))
        } catch (err) {
            console.log(err)

            // if token has exipred, initialize refresh token feature
            if (err.data === 'The access token expired') {
                runRefreshToken()
            }
        }
    }, [getAccount, authInfo, dispatch, runRefreshToken])

    // on init get account data
    useEffect(() => {
        initAccountData()
    }, [initAccountData])

    // on authInfo change check authInfo status and select display mode
    useEffect(() => {
        if (authInfo) setAuthMode(false)
        if (!authInfo) setAuthMode(true)
    }, [authInfo])

    return (
        <>
            {!authMode && (
                <div className="navbar-box">
                    {/* nav buttons */}
                    <div className="navbar-box-item">
                        {/* arrow left */}
                        <div className="btn-arrow" onClick={navBack}>
                            <IoIosArrowDropleftCircle className="control-panel-btn"></IoIosArrowDropleftCircle>
                        </div>

                        {/* arrow right */}
                        <div className="btn-arrow" onClick={navForward}>
                            <IoIosArrowDroprightCircle className="control-panel-btn"></IoIosArrowDroprightCircle>
                        </div>

                        {/* home */}
                        <div
                            className="navbar-box-btn"
                            onClick={() => {
                                navTo('home')
                            }}
                        >
                            <BiHomeAlt2 className="control-panel-btn"></BiHomeAlt2>
                            Home
                        </div>

                        {/* search */}
                        <div
                            className="navbar-box-btn"
                            onClick={() => {
                                navTo('search')
                            }}
                        >
                            <AiOutlineSearch className="control-panel-btn"></AiOutlineSearch>
                            Search
                        </div>

                        {/* playlists */}
                        <div
                            className="navbar-box-btn"
                            onClick={() => {
                                navTo('playlists')
                            }}
                        >
                            <BiSolidPlaylist className="control-panel-btn"></BiSolidPlaylist>
                            Playlists
                        </div>

                        {/* albums */}
                        <div
                            className="navbar-box-btn"
                            onClick={() => {
                                navTo('albums')
                            }}
                        >
                            <LuAlbum className="control-panel-btn"></LuAlbum>
                            Albums
                        </div>
                    </div>

                    {/* nav account */}
                    <Dropdown>
                        <Dropdown.Toggle
                            variant="none"
                            className="img-dropdown"
                        >
                            <Image
                                src={
                                    accountInfo?.images
                                        ? accountInfo.images[0].url
                                        : ''
                                }
                                roundedCircle
                                className="img-box"
                            />
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item
                                onClick={() => {
                                    navTo(`account/${accountInfo.id}`)
                                }}
                            >
                                Account Settings
                            </Dropdown.Item>
                            <Dropdown.Item onClick={signOut}>
                                Sign Out
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            )}

            {authMode && (
                <div className="navbar-box">
                    <a href="http://localhost:3000/api/auth/signin">
                        Authorize
                    </a>
                </div>
            )}
        </>
    )
}

export default Navbar
