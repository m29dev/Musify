import { useEffect, useState } from 'react'
import { Image, Dropdown } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
    const [authMode, setAuthMode] = useState(false)
    const { authInfo } = useSelector((state) => state.auth)

    const navigate = useNavigate()

    // navigation features
    const navForward = () => {
        navigate(1)
    }
    const navBack = () => {
        navigate(-1)
    }
    const navTo = (query) => {
        navigate(`/${query}`)
    }

    // check authInfo status and select display mode
    useEffect(() => {
        console.log('auth info has changed')
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
                                src="https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="
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
