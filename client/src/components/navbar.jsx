import { useCallback, useEffect, useState } from 'react'
import { Image, Dropdown } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useGetAccountMutation } from '../services/accountService'
import { setAccountInfo, updateAuthInfoToken } from '../redux/authSlice'
import { useRefreshTokenMutation } from '../services/authService'

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
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="25"
                                height="25"
                                fill="currentColor"
                                className="bi bi-caret-left"
                                viewBox="0 0 16 16"
                            >
                                <path d="M10 12.796V3.204L4.519 8 10 12.796zm-.659.753-5.48-4.796a1 1 0 0 1 0-1.506l5.48-4.796A1 1 0 0 1 11 3.204v9.592a1 1 0 0 1-1.659.753z" />
                            </svg>
                        </div>

                        {/* arrow right */}
                        <div className="btn-arrow" onClick={navForward}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="25"
                                height="25"
                                fill="currentColor"
                                className="bi bi-caret-right"
                                viewBox="0 0 16 16"
                            >
                                <path d="M6 12.796V3.204L11.481 8 6 12.796zm.659.753 5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753z" />
                            </svg>
                        </div>

                        {/* home */}
                        <div
                            className="navbar-box-btn"
                            onClick={() => {
                                navTo('home')
                            }}
                        >
                            Home
                        </div>

                        {/* search */}
                        <div
                            className="navbar-box-btn"
                            onClick={() => {
                                navTo('search')
                            }}
                        >
                            Search
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
                            <Dropdown.Item>Account Settings</Dropdown.Item>
                            <Dropdown.Item>Sign Out</Dropdown.Item>
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
