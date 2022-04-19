import React, { useEffect, useState, useContext } from "react"
import Spotify from "spotify-web-api-js"

interface Props {
	details: any[]
	token: any
}

const MediaDetails: React.FC<Props> = ({ token, details }) => {
	const SpotifyApi = new Spotify()
	const [playlist, setPlaylist] = useState<any>()
	const [playlistTracks, setPlaylistTracks] =
		useState<SpotifyApi.PlaylistObjectFull>()

	useEffect(() => {
		getPlaylist()
	}, [details])

	console.log("Playlist:", playlist)
	console.log("Playlist Tracks:", playlistTracks)

	if (token) {
		SpotifyApi.setAccessToken(token)
	}

	console.log(details)
	console.log(token)

	// render api results

	// Playlist pipe ----------------------------------------------
	const getPlaylist = () => {
		if (details.length > 0) {
			SpotifyApi.searchPlaylists(`${details[0].title} Movie Soundtrack`)
				.then((data) => {
					setPlaylist(data)
					const playlistID = playlist.playlists.items[0].id
					SpotifyApi.getPlaylist(playlistID).then((data) => {
						setPlaylistTracks(data)
					})
				})
				.catch((err) => {
					console.log(err)
				})
		}
	}

	const showTracks = (playlistTracks?: SpotifyApi.PlaylistObjectFull) => {
		if (playlistTracks !== undefined && playlistTracks !== null) {
			return (
				playlistTracks &&
				Object.values(playlistTracks.tracks.items).map(
					(data: any, index: number) => {
						return (
							<video
								key={index}
								poster={data.track.album.images[2].url}
								onMouseOver={handleMouseOver}
								onMouseOut={handleMouseOut}
								src={data.track.preview_url}
							></video>
						)
					}
				)
			)
		}
	}
	//-------------------------------------------------------------------

	// if (playlistTracks !== undefined && playlistTracks !== null) {
	// 	// 	// console.log(JSON.parse(JSON.stringify(playlistTracks)))

	// 	// Object.keys(playlistTracks).map((data: any, index: any) => {
	// 	// 	console.log(data, index)
	// 	// })
	// 	Object.values(playlistTracks.tracks.items).map((data: any, index: any) =>
	// 		console.log(data, index, data.track.preview_url)
	// 	)

	// 	// showTracks()
	// }

	const handleMouseOver = (e: React.MouseEvent<HTMLVideoElement>) => {
		e.currentTarget.play()
	}
	const handleMouseOut = (e: React.MouseEvent<HTMLVideoElement>) => {
		e.currentTarget.pause()
	}

	const showAlbums = () => {
		if (details) {
			SpotifyApi.getPlaylistTracks(`${details[0].title} Soundtrack`)
				.then((data) => {
					console.log("search", data)
				})
				.catch((err) => {
					console.log(err)
				})
		}
	}

	return (
		<div className="media_details">
			hello world
			{details[0] == null ? null : (
				<div>
					<div className="img">
						<img
							src={"https://image.tmdb.org/t/p/w200/" + details[0].poster_path}
							alt={details[0].poster_path}
						/>
					</div>
					<h1 className="details_title">{details[0].title}</h1>
					<h2 className="details_vote_average">{details[0].vote_average}/10</h2>
					<p className="details_release_date">{details[0].release_date}</p>
					<p className="overview"> {details[0].overview} </p>
					{showTracks(playlistTracks)}
					{/* {getTrackDetails(playlistTracks)} */}
				</div>
			)}
		</div>
	)
}

export default MediaDetails
