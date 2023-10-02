import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
    createBrowserRouter,
    createRoutesFromElements,
    RouterProvider,
    Route,
} from 'react-router-dom'
import { store } from './redux/store'
import { Provider } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App'
import Home from './pages/home'
import Search from './pages/Search'
import Auth from './pages/Auth'

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App />}>
            {/* <Route path='/' element={<Navigate to="/home" replace={true} />}></Route> */}

            <Route path="auth" element={<Auth />}></Route>
            <Route path="home" element={<Home />}></Route>
            <Route path="search" element={<Search />}></Route>

            <Route path="*" element={<h1>404</h1>}></Route>
        </Route>
    )
)

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </React.StrictMode>
)
