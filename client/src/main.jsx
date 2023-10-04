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
import Playlists from './pages/Playlists'
import Albums from './pages/Albums'
import AlbumDetails from './pages/AlbumDetails'
import PlaylistDetails from './pages/PlaylistDetails'

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App />}>
            {/* <Route path='/' element={<Navigate to="/home" replace={true} />}></Route> */}

            <Route path="auth" element={<Auth />}></Route>
            <Route path="home" element={<Home />}></Route>
            <Route path="search" element={<Search />}></Route>
            <Route path="playlists" element={<Playlists />}></Route>
            <Route path="playlists/:id" element={<PlaylistDetails />}></Route>
            <Route path="albums" element={<Albums />}></Route>
            <Route path="albums/:id" element={<AlbumDetails />}></Route>

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
