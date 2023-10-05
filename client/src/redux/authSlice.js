import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    authInfo: localStorage.getItem('authInfo')
        ? JSON.parse(localStorage.getItem('authInfo'))
        : null,

    accountInfo: localStorage.getItem('accountInfo')
        ? JSON.parse(localStorage.getItem('accountInfo'))
        : null,

    songInfo: localStorage.getItem('songInfo')
        ? JSON.parse(localStorage.getItem('songInfo'))
        : null,

    controlPanelInfo: localStorage.getItem('controlPanelInfo')
        ? JSON.parse(localStorage.getItem('controlPanelInfo'))
        : null,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // authorization information
        setAuthInfo: (state, action) => {
            state.authInfo = action.payload
            localStorage.setItem('authInfo', JSON.stringify(action.payload))
        },
        updateAuthInfoToken: (state, action) => {
            state.authInfo.access_token = action.payload.access_token
            localStorage.setItem('authInfo', JSON.stringify(state.authInfo))
        },
        clearAuthInfo: (state) => {
            state.authInfo = null
            localStorage.removeItem('authInfo')
        },

        // account information
        setAccountInfo: (state, action) => {
            state.accountInfo = action.payload
            localStorage.setItem('accountInfo', JSON.stringify(action.payload))
        },
        clearAccountInfo: (state) => {
            state.accountInfo = null
            localStorage.removeItem('accountInfo')
        },

        // song information
        setSongInfo: (state, action) => {
            state.songInfo = action.payload
            localStorage.setItem('songInfo', JSON.stringify(action.payload))
        },

        // control panel
        setControlPanelInfo: (state, action) => {
            state.controlPanelInfo = action.payload
            localStorage.setItem(
                'controlPanelInfo',
                JSON.stringify(action.payload)
            )
        },
    },
})

export const {
    setAuthInfo,
    updateAuthInfoToken,
    clearAuthInfo,
    setAccountInfo,
    clearAccountInfo,
    setSongInfo,
    setControlPanelInfo,
} = authSlice.actions
export default authSlice.reducer
