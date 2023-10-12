import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseQuery = fetchBaseQuery({
    baseUrl: 'https://musifyserver.onrender.com/api',
})

export const apiSlice = createApi({
    baseQuery,
    tagTypes: ['Auth'],
    endpoints: () => ({}),
})
