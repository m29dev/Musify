import { apiSlice } from '../redux/apiSlice'

const AUTH_URL = '/auth'

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        signIn: builder.mutation({
            query: () => ({
                url: `${AUTH_URL}/signin`,
                method: 'GET',
            }),
        }),
    }),
})

export const { useSignInMutation, useSignUpMutation } = authApiSlice
