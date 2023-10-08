import { apiSlice } from '../redux/apiSlice'

const MUSIC_URL = '/music'

export const musicApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // playlists
        getAllPlaylists: builder.mutation({
            query: (authInfo) => ({
                url: `${MUSIC_URL}/playlists/${authInfo.access_token}`,
                method: 'GET',
            }),
        }),
        getPlaylistId: builder.mutation({
            query: (data) => ({
                url: `${MUSIC_URL}/playlists/${data.authInfo.access_token}`,
                method: 'POST',
                body: { id: data.id },
            }),
        }),

        // albums
        getAllAlbums: builder.mutation({
            query: (authInfo) => ({
                url: `${MUSIC_URL}/albums/${authInfo.access_token}`,
                method: 'GET',
            }),
        }),
        getAlbumId: builder.mutation({
            query: (data) => ({
                url: `${MUSIC_URL}/albums/${data.authInfo.access_token}`,
                method: 'POST',
                body: { id: data.id },
            }),
        }),

        // songs youtube
        getSongId: builder.mutation({
            query: (query) => ({
                url: `${MUSIC_URL}/youtube/${query}`,
                method: 'GET',
            }),
        }),

        // saved fav songs spotify
        getSongsSaved: builder.mutation({
            query: (query) => ({
                url: `${MUSIC_URL}/songs/saved/${query}`,
                method: 'GET',
            }),
        }),

        // search songs / artists / albums / playlists
        searchQuery: builder.mutation({
            query: (data) => ({
                url: `${MUSIC_URL}/search/${data.access_token}/${data.query}`,
                method: 'GET',
            }),
        }),
    }),
})

export const {
    useGetAllPlaylistsMutation,
    useGetPlaylistIdMutation,
    useGetAllAlbumsMutation,
    useGetAlbumIdMutation,
    useGetSongIdMutation,
    useGetSongsSavedMutation,
    useSearchQueryMutation,
} = musicApiSlice
