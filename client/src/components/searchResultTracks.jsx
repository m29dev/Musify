const SearchResultTracks = (tracks) => {
    return (
        <>
            <div className="search-results-tracks">
                <h1>Songs</h1>
                {tracks?.tracksData?.map(
                    (track, index) =>
                        index <= 4 && (
                            <div key={index} className="table-item">
                                {/* image */}
                                <img
                                    src={track?.album?.images?.[2]?.url}
                                    style={{
                                        height: '40px',
                                        width: '40px',
                                    }}
                                />

                                {/* title */}
                                <div className="column title">
                                    {track?.name && (
                                        <>
                                            <h1>{track?.name}</h1>

                                            <div className="title-artists-box">
                                                {track?.artists.map(
                                                    (artist) => {
                                                        return (
                                                            <h4
                                                                key={
                                                                    artist?.name
                                                                }
                                                            >
                                                                {artist?.name}
                                                            </h4>
                                                        )
                                                    }
                                                )}
                                            </div>
                                        </>
                                    )}
                                </div>

                                {/* duration */}
                            </div>
                        )
                )}
            </div>
        </>
    )
}

export default SearchResultTracks
