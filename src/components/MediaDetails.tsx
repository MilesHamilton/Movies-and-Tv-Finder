import React, { useEffect, useState, useContext } from "react"
import Spotify from "spotify-web-api-js"
import "../Sass/media_details.scss"
var stringSimilarity = require("string-similarity")
interface Props {
	details: any[]
	token: string
	network: string
}

const MediaDetails: React.FC<Props> = ({ token, details, network }) => {
	const [album, setAlbum] = useState<any>()
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
		artistId: null,
		artistName: null,
		trackName: null,
		track: null,
	})
	const [hover, setHover] = useState<boolean>(false)
	const [showClass, setShowClass] = useState<boolean>(false)
	const [disableTracks, setDisableTracks] = useState<boolean>(false)
	const [isHidden, setIsHidden] = useState<boolean>(true)
	const [albumSort, setAlbumSort] = useState<any>()

	const SpotifyApi = new Spotify()
	useEffect(() => {
		getAlbum()
		getPlaylist()
	}, [details])

	useEffect(() => {
		getArtist()
	}, [artist, hover])

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
	console.log("Album Sort", albumSort)
	console.log()

	// console.log(details[0])
	// console.log(details[0].title)

	if (token) {
		SpotifyApi.setAccessToken(token)
	}

	//Mouse over logic ---------------------------------------
	const handleMouseOver = (e: React.MouseEvent<HTMLVideoElement>) => {
		e.currentTarget.play()
		setHover(true)
	}
	const handleMouseOut = (e: React.MouseEvent<HTMLVideoElement>) => {
		e.currentTarget.pause()
		setHover(false)
	}
	// hide tracks on click
	const handleClick = () => {
		setShowClass((showClass) => !showClass)
	}
	let toggleClassCheck = showClass ? "active" : "inactive"
	const handleClickDisable = () => {
		setDisableTracks((disableTracks) => !disableTracks)
	}
	let toggleClassDisable = showClass ? "disabled" : null

	//Album pipe ---------------------------------------------------

	const filterSpotifyQuery = () => {
		if (details[0].title !== undefined && network === "trending") {
			return `${details[0].title} Original Motion Picture Soundtrack`
		} else if (network === "netflix") {
			return `${details[0].original_name} Netflix Original TV`
		} else if (network === "amazon") {
			return `${details[0].original_name} Amazon Original`
		} else if (network === "disney") {
			return `${details[0].original_name} Disney Original Soundtrack`
		} else if (network === "apple") {
			return `${details[0].original_name} Apple Original Soundtrack`
		} else {
			return `${details[0].original_name}`
		}
	}

	//Look into sorting the array directly

	const getAlbum = () => {
		if (details.length > 0) {
			SpotifyApi.searchAlbums(filterSpotifyQuery())
				.then((data) => {
					return data.albums.items.filter((data: any) => {
						return (
							(data.total_tracks >= 10 && data.album_type === "album") ||
							data.album_type === "compilation"
						)
					})
				})
				.then((data: any) => {
					const matches = data.map((data: any) => {
						return stringSimilarity.compareTwoStrings(
							filterSpotifyQuery(),
							data.name
						)
					})

					console.log(filterSpotifyQuery())

					let filtered: any = []

					for (let i = 0; i < matches.length; i++) {
						if (matches[i] >= 0.5) {
							filtered.push(data[i])
						}
					}

					console.log(filtered)
					console.log(matches)
					console.log(data)
					return filtered
				})
				.then((data: any) => {
					return data.sort((a: any, b: any) => {
						return a.release_date < b.relase_date
							? 1
							: a.release_date > b.release_date
							? -1
							: 0
					})
				})
				.then((data) => {
					setAlbum(data)
					SpotifyApi.getAlbum(data[0].id)
						.then((data) => {
							setAlbumTracks(data)
						})
						.catch((err) => {
							console.log(err)
						})
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
							<div className="spotify_tracks">
								<div className="track_wrapper">
									<img
										src={albumTracks.images[1].url}
										alt="album track art"
									></img>
									<div className="artist_wrapper">
										<h1>{data.name}</h1>
									</div>
								</div>

								<video
									key={index}
									onClick={() => {
										setIsHidden(true)
										getArtistTopTracks()
										handleClickDisable()
									}}
									onMouseOver={(e) => {
										handleMouseOver(e)
										setArtist(data.artists[0].id)
										getArtist()
										setSelectedTrack({
											artistName: data.artists[0].name,
											artistId: data.artists[0].id,
											trackName: data.name,
											...setSelectedTrack,
										})
										setIsHidden(false)
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
					return data.playlists.items.filter((data: any) => {
						return data.tracks.total >= 10
					})
				})
				.then((data: any) => {
					const matches = data.map((data: any) => {
						return stringSimilarity.compareTwoStrings(
							filterSpotifyQuery(),
							data.name
						)
					})

					console.log(filterSpotifyQuery())

					let filtered: any = []

					for (let i = 0; i < matches.length; i++) {
						if (matches[i] >= 0.5) {
							filtered.push(data[i])
						}
					}

					console.log(filtered)
					console.log(matches)
					console.log(data)
					return filtered
				})
				.then((data: any) => {
					return data.sort((a: any, b: any) => {
						return a.release_date < b.relase_date
							? 1
							: a.release_date > b.release_date
							? -1
							: 0
					})
				})

				.then((data) => {
					return SpotifyApi.getPlaylist(data[0].id)
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
							<div className="spotify_tracks">
								<div className="track_wrapper">
									<img
										src={data.track.album.images[1].url}
										alt="soundtrack art"
									></img>
									<div className="artist_wrapper">
										<h1>{data.track.name}</h1>
									</div>
								</div>
								<video
									key={index}
									onClick={() => {
										setIsHidden(true)
										getArtistTopTracks()
										handleClickDisable()
									}}
									onMouseOver={(e) => {
										setArtist(data.track.artists[0].id)
										setSelectedTrack({
											artistName: data.track.artists[0].name,
											artistId: data.track.artists[0].id,
											trackName: data.track.name,
											...setSelectedTrack,
										})
										setIsHidden(false)
										getArtist()
										handleMouseOver(e)
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
				setSelectedTrack({
					artistImg: data.images[1].url,
					...selectedTrack,
				})
			})
			.then(() => {
				SpotifyApi.getRecommendations({
					seed_artists: artist,
					seed_tracks: artist,
				}).then((data) => {
					setArtistRecommendations(data)
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
				let newCombinedArray: any[] = []
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

	const getArtistTopTracks = () => {
		// if (selectedTrack.artistId !== undefined) {
		SpotifyApi.getArtistTopTracks(selectedTrack.artistId, "US").then((data) => {
			setArtistTopTracks(data)
		})
		// }
	}

	const getSelectedTrackInfo = () => {
		return (
			<div className="spotify_selectedtrack">
				<img src={selectedTrack.artistImg}></img>
				<h1>{selectedTrack.artistName}</h1>
				<h2>{selectedTrack.trackName}</h2>
			</div>
		)
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
									artistId: data.id,
									...setSelectedTrack,
								})
							}
							src={data.images[2] === undefined ? "" : data.images[2].url}
							className="related_artist_info"
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
						onClick={() => {
							getArtistTopTracks()
						}}
						onMouseOver={(e) => {
							setSelectedTrack({
								track: data.tracks[0].preview_url,
								trackName: data.tracks[0].name,
								...selectedTrack,
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
									setSelectedTrack({
										// track: data.tracks[0].preview_url,
										...selectedTrack,
										trackName: data.name,
										artistName: data.artists[0].name,
										artistImg: data.album.images[1].url,
									})
									handleMouseOver(e)
								}}
								onMouseOut={handleMouseOut}
								src={data.preview_url}
								className="artists_top_tracks_player"
							></video>
						)
					})
				})
			)
		}
	}

	return (
		<>
			{details[0] == null ? null : (
				<div className="main_media_details_wrapper">
					<div className="main_TMBD_info_wrapper">
						<div className="main_TMBD_img">
							<img
								src={
									"https://image.tmdb.org/t/p/w200/" + details[0].poster_path
								}
							/>
						</div>
						<div className="main_TMDB_info_details">
							<h1 className="details_title">{details[0].title}</h1>
							<h2 className="details_vote_average">
								{details[0].vote_average}/10
							</h2>
							<p className="details_release_date">
								Release Date: {details[0].release_date}
							</p>
							<p className="details_overview">
								<b>Overview:</b>
								<br></br> {details[0].overview}
							</p>
						</div>
					</div>
					<div className="spotify_wrapper">
						<div
							onClick={() => handleClick()}
							className={`main_spotify_toggle ${toggleClassCheck}`}
						>
							<div
								className={`main_spotify_track_wrapper ${toggleClassDisable}`}
								onClick={() => handleClickDisable()}
							>
								{albumTracks === undefined
									? showPlaylistTracks(playlistTracks)
									: showAlbumTracks(albumTracks)}
							</div>
						</div>
						<div className="sidebar_spotify_details_wrapper">
							<div className="sidebar_spotify_details">
								<div className="details_selectedtrack">
									{getSelectedTrackInfo()}
								</div>

								<div className="details_related_artist_title_wrapper">
									{isHidden === true ? <p>RELATED ARTISTS</p> : <></>}
								</div>
								<div className="details_related_artists">
									{isHidden === true ? spotifyRelatedArtistsInfo() : <></>}
								</div>
								<div className="details_related_tracks">
									{isHidden === true ? spotifyRelatedArtistsTracks() : <></>}
								</div>
							</div>

							<div className="details_artist_top_tracks">
								{isHidden === true ? <p>ARTIST TOP TRACKS</p> : <></>}
								{isHidden === true ? spotifyArtistTopTracks() : <></>}
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	)
}

export default MediaDetails
