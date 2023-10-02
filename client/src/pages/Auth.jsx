import Navbar from '../components/navbar'
import { useDispatch } from 'react-redux'
import { setAuthInfo } from '../redux/authSlice'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Auth = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        console.log('auth page reached')

        const queryParams = new URLSearchParams(window.location.search)
        const access_token = queryParams.get('access_token')
        const token_type = queryParams.get('token_type')
        const expires_in = queryParams.get('expires_in')
        const refresh_token = queryParams.get('refresh_token')
        const scope = queryParams.get('scope')

        if (
            queryParams &&
            access_token &&
            token_type &&
            expires_in &&
            refresh_token &&
            scope
        ) {
            dispatch(
                setAuthInfo({
                    queryParams,
                    access_token,
                    token_type,
                    expires_in,
                    refresh_token,
                    scope,
                })
            )
        }

        navigate('/home')
    }, [dispatch, navigate])

    return (
        <>
            <Navbar></Navbar>
            <h1>Loading...</h1>
        </>
    )
}

export default Auth
