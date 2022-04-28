import React, { useEffect, useState, useContext } from "react"
import Spotify from "spotify-web-api-js"
import "../Sass/media_details.scss"
interface Props {
	details: any[]
	token: string
}

const MediaDetails: React.FC<Props> = ({ token, details }) => {
	const [album, setAlbum] = useState<SpotifyApi.AlbumSearchResponse>()
	const [albumTracks, setAlbumTracks] = useState<SpotifyApi.AlbumObjectFull>()
	const [playlist, setPlaylist] = useState<SpotifyApi.PlaylistSearchResponse>()
	const [playlistTracks, setPlaylistTracks] =
		useState<SpotifyApi.PlaylistObjectFull>()
	const [artist, setArtist] = useState<any>()
	const [artistInfo, setArtistInfo] = useState<SpotifyApi.ArtistObjectFull>()
	const [artistRecommendations, setArtistRecommendations] =
		useState<SpotifyApi.RecommendationsFromSeedsResponse>()
	const [artistTopTracks, setArtistTopTracks] =
		useState<SpotifyApi.ArtistsTopTracksResponse>()
	const [relatedArtists, setRelatedArtists] = useState<any>()
	const [relatedArtistTracks, setRelatedArtistTracks] = useState<any>()
	const [selectedTrack, setSelectedTrack] = useState<any>({
		artistImg: null,
		artistName: null,
		trackName: null,
		track: null,
	})

	const SpotifyApi = new Spotify()
	useEffect(() => {
		getAlbum()
		getPlaylist()
	}, [details])

	useEffect(() => {
		getArtist()
	}, [artist])

	console.log("Playlist:", playlist)
	console.log("Playlist Tracks:", playlistTracks)
	console.log("Album:", album)
	console.log("Album tracks:", albumTracks)
	console.log("Artist:", artist)
	console.log("Artist info:", artistInfo)
	console.log("Artist Recommendations:", artistRecommendations)
	console.log("Artist Top Tracks", artistTopTracks)
	console.log("Related Artists", relatedArtists)
	console.log("Selected Track", selectedTrack)
	console.log("Related Artist Tracks", relatedArtistTracks)
	// console.log(details[0])
	// console.log(details[0].title)

	if (token) {
		SpotifyApi.setAccessToken(token)
	}

	//Album pipe ---------------------------------------------------

	const filterSpotifyQuery = () => {
		if (details[0].title !== undefined) {
			return `${details[0].title} Original Motion Picture Soundtrack`
		} else {
			return `${details[0].original_name} Tv Series`
		}
	}

	const getAlbum = () => {
		if (details.length > 0) {
			SpotifyApi.searchAlbums(filterSpotifyQuery())
				.then((data) => {
					setAlbum(data)
					return data
				})
				.then((data) => {
					return SpotifyApi.getAlbum(data.albums.items[0].id)
				})
				.then((data) => {
					setAlbumTracks(data)
				})
				.catch((err) => {
					console.log(err)
				})
		}
	}

	const showAlbumTracks = (albumTracks?: SpotifyApi.AlbumObjectFull) => {
		if (albumTracks !== undefined) {
			return (
				albumTracks &&
				Object.values(albumTracks.tracks.items).map(
					(data: any, index: number) => {
						return (
							<div className="video_wrapper">
								<div className="info_wrapper">
									<p>{data.track_number}</p>
									<img
										src={albumTracks.images[2].url}
										alt="album track art"
									></img>
									<div className="artist_wrapper">
										<h1>{data.name}</h1>
										<div className="artist_info">
											{data.artists.map((artist: any) => (
												<h2> {artist.name} </h2>
											))}
										</div>
									</div>
								</div>

								<video
									key={index}
									// poster={albumTracks.images[1].url}
									onClick={() => {}}
									onMouseOver={(e) => {
										handleMouseOver(e)
										setArtist(data.artists[0].id)
										getArtist()
										setSelectedTrack({
											...selectedTrack,
											artistImg: artistInfo?.images[2].url,
											artistName: artistInfo?.name,
											trackName: data.name,
										})
									}}
									onMouseOut={handleMouseOut}
									src={data.preview_url}
									className="album_player"
								></video>
							</div>
						)
					}
				)
			)
		}
	}

	// Playlist pipe ----------------------------------------------
	const getPlaylist = () => {
		if (details.length > 0) {
			SpotifyApi.searchPlaylists(filterSpotifyQuery())
				.then((data) => {
					setPlaylist(data)
					return data
				})
				.then((data) => {
					return SpotifyApi.getPlaylist(data.playlists.items[0].id)
				})
				.then((data) => {
					setPlaylistTracks(data)
				})
				.catch((err) => {
					console.log(err)
				})
		}
	}

	const showPlaylistTracks = (
		playlistTracks?: SpotifyApi.PlaylistObjectFull
	) => {
		if (playlistTracks !== undefined) {
			return (
				playlistTracks &&
				Object.values(playlistTracks.tracks.items).map(
					(data: any, index: number) => {
						return (
							<div className="video_wrapper">
								<div className="info_wrapper">
									<p>{index}</p>
									<img
										src={data.track.album.images[2].url}
										alt="soundtrack art"
									></img>
									<div className="artist_wrapper">
										<h1>{data.track.name}</h1>
										<div className="artist_info">
											{data.track.artists.map((artist: any) => (
												<h2> {artist.name} </h2>
											))}
										</div>
									</div>
								</div>
								<video
									key={index}
									onClick={() => {}}
									onMouseOver={(e) => {
										handleMouseOver(e)
										setArtist(data.track.artists[0].id)
										getArtist()
										setSelectedTrack({
											artistImg: artistInfo?.images[1].url,
											artistName: artistInfo?.name,
											trackName: data.track.name,
										})
									}}
									onMouseOut={handleMouseOut}
									src={data.track.preview_url}
									className="playlist_player"
								></video>
							</div>
						)
					}
				)
			)
		}
	}

	//Artist pipe --------------------------------------------------------

	const getArtist = () => {
		SpotifyApi.getArtist(artist)
			.then((data) => {
				setArtistInfo(data)
			})
			.then(() => {
				SpotifyApi.getRecommendations({
					seed_artists: artist,
					seed_tracks: artist,
				}).then((data) => {
					setArtistRecommendations(data)
				})

				SpotifyApi.getArtistTopTracks(artist, "US").then((data) => {
					setArtistTopTracks(data)
				})

				const headers = {
					"Accept": "application/json",
					"Content-Type": "application/json",
					"Authorization": `Bearer ${token}`,
				}
				fetch(`https://api.spotify.com/v1/artists/${artist}/related-artists`, {
					headers,
				})
					.then((res) => res.json())
					.then((data) => {
						setRelatedArtists(data)
					})
			})
			.then(() => {
				let newRelatedArtistsArr: any[] = []
				let newRelatedArtistsTracksArr: any[] = []
				Object.values(relatedArtists).map((data: any) => {
					data.map((data: any) => {
						newRelatedArtistsArr.push(data)
					})
					newRelatedArtistsArr.map((data: any) => {
						SpotifyApi.getArtistTopTracks(data.id, "US").then((data) => {
							newRelatedArtistsTracksArr.push(data)
							setRelatedArtistTracks(newRelatedArtistsTracksArr)
						})
					})
				})
			})
	}

	const getSelectedTrackInfo = () => {
		if (selectedTrack !== undefined) {
			return (
				<div className="spotify_artists_info">
					<img src={selectedTrack.artistImg}></img>
					<h1>{selectedTrack.artistName}</h1>
					<h2>{selectedTrack.trackName}</h2>
				</div>
			)
		}
	}

	const spotifyRelatedArtistsInfo = () => {
		if (relatedArtists !== undefined) {
			return Object.values(relatedArtists).map((data: any) => {
				return data.map((data: any) => {
					return (
						<img
							onMouseOver={() =>
								setSelectedTrack({
									artistImg: data.images[1].url,
									artistName: data.name,
								})
							}
							src={data.images[2].url}
							className="artist_player"
						></img>
					)
				})
			})
		}
	}

	const spotifyRelatedArtistsTracks = () => {
		if (relatedArtistTracks !== undefined) {
			return relatedArtistTracks.map((data: any, index: number) => {
				return (
					<video
						key={index}
						// onClick={() => {
						// 	setArtist(data[0].tracks[0].id)
						// 	getArtist()
						// }}
						onMouseOver={(e) => {
							setSelectedTrack({
								...selectedTrack,
								track: data.tracks[0].preview_url,
								trackName: data.tracks[0].name,
							})
							handleMouseOver(e)
						}}
						onMouseOut={handleMouseOut}
						src={selectedTrack.track}
						className="related_artists_player"
					></video>
				)
			})
		}
	}

	const spotifyArtistTopTracks = () => {
		if (artistTopTracks !== undefined) {
			return (
				artistTopTracks &&
				Object.values(artistTopTracks).map((data) => {
					return data.map((data: any, index: number) => {
						return (
							<video
								key={index}
								poster={data.album.images[2].url}
								onMouseOver={(e) => {
									handleMouseOver(e)
								}}
								onMouseOut={handleMouseOut}
								src={data.preview_url}
								className="related_artists_player"
							></video>
						)
					})
				})
			)
		}
	}
	// console.log(
	// 	artistTopTracks &&
	// 		Object.values(artistTopTracks).map((data) => {
	// 			data.map((data: any) => {
	// 				console.log(data)
	// 			})
	// 		})
	// )
	const handleMouseOver = (e: React.MouseEvent<HTMLVideoElement>) => {
		e.currentTarget.play()
	}
	const handleMouseOut = (e: React.MouseEvent<HTMLVideoElement>) => {
		e.currentTarget.pause()
	}

	return (
		<>
			{details[0] == null ? null : (
				<div className="media_details_wrapper">
					<div className="media_details">
						<div className="media_info_wrapper">
							<div className="media_img">
								<img
									src={
										"https://image.tmdb.org/t/p/w200/" + details[0].poster_path
									}
								/>
							</div>
							<div className="media_info">
								<h1 className="details_title">{details[0].title}</h1>
								<h2 className="details_vote_average">
									{details[0].vote_average}/10
								</h2>
								<p className="details_release_date">
									Release Date: {details[0].release_date}
								</p>
								<p className="overview">Overview: {details[0].overview} </p>
							</div>
						</div>
						<div className="track_wrapper">
							{albumTracks === undefined
								? showPlaylistTracks(playlistTracks)
								: showAlbumTracks(albumTracks)}
						</div>
					</div>
					<div className="media_artists_wrapper">
						{getSelectedTrackInfo()}
						{spotifyRelatedArtistsInfo()}
						{spotifyRelatedArtistsTracks()}
						{spotifyArtistTopTracks()}
					</div>
				</div>
			)}
		</>
	)
}

export default MediaDetails
