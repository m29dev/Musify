import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    authInfo: localStorage.getItem('authInfo')
        ? JSON.parse(localStorage.getItem('authInfo'))
        : null,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthInfo: (state, action) => {
            state.authInfo = action.payload
            localStorage.setItem('authInfo', JSON.stringify(action.payload))
        },
        clearAuthInfo: (state) => {
            state.authInfo = null
            localStorage.removeItem('authInfo')
        },
    },
})

export const { setAuthInfo, clearAuthInfo } = authSlice.actions
export default authSlice.reducer
