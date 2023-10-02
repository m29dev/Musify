import { useCallback, useEffect } from 'react'
import Navbar from '../components/navbar'
import { useGetAccountMutation } from '../services/accountService'
import { useSelector } from 'react-redux'

const Home = () => {
    const [getAccount] = useGetAccountMutation()
    const { authInfo } = useSelector((state) => state.auth)

    const getAccountApi = useCallback(async () => {
        try {
            const res = await getAccount(authInfo).unwrap()
            console.log(res)
        } catch (err) {
            console.log(err)
        }
    }, [getAccount, authInfo])

    useEffect(() => {
        getAccountApi()
    }, [getAccountApi])

    return (
        <div className="center-box">
            {/* navbar main */}
            <Navbar></Navbar>
            <h1>Home Page</h1>
        </div>
    )
}

export default Home
