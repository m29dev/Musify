import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    authInfo: localStorage.getItem('authInfo')
        ? JSON.parse(localStorage.getItem('authInfo'))
        : null,

    accountInfo: localStorage.getItem('accountInfo')
        ? JSON.parse(localStorage.getItem('accountInfo'))
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
    },
})

export const {
    setAuthInfo,
    updateAuthInfoToken,
    clearAuthInfo,
    setAccountInfo,
    clearAccountInfo,
} = authSlice.actions
export default authSlice.reducer
