import { apiSlice } from '../redux/apiSlice'

const MUSIC_URL = '/music'

export const musicApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllPlaylists: builder.mutation({
            query: (authInfo) => ({
                url: `${MUSIC_URL}/playlists/${authInfo.access_token}`,
                method: 'GET',
            }),
        }),
        getPlaylistId: builder.mutation({
            query: (authInfo) => ({
                url: `${MUSIC_URL}/playlists/${authInfo.access_token}/${authInfo.id}`,
                method: 'GET',
            }),
        }),
    }),
})

export const { useGetAllPlaylistsMutation, useGetPlaylistIdMutation } =
    musicApiSlice
