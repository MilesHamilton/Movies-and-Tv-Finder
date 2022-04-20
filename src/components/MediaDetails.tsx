import React, { useEffect, useState, useContext } from "react"
import Spotify from "spotify-web-api-js"
import "../Sass/media_details.scss"
interface Props {
	details: any[]
	token: any
}

const MediaDetails: React.FC<Props> = ({ token, details }) => {
	const [album, setAlbum] = useState<SpotifyApi.AlbumSearchResponse>()
	const [albumTracks, setAlbumTracks] = useState<SpotifyApi.AlbumObjectFull>()
	const [playlist, setPlaylist] = useState<SpotifyApi.PlaylistSearchResponse>()
	const [playlistTracks, setPlaylistTracks] =
		useState<SpotifyApi.PlaylistObjectFull>()
	const SpotifyApi = new Spotify()
	useEffect(() => {
		getAlbum()
		getPlaylist()
	}, [details])

	useEffect(() => {}, [])

	console.log("Playlist:", playlist)
	console.log("Playlist Tracks:", playlistTracks)
	console.log("Album:", album)
	console.log("Album tracks:", albumTracks)

	if (token) {
		SpotifyApi.setAccessToken(token)
	}

	// console.log(details)
	// console.log(token)

	// render api results

	//Album pipe ---------------------------------------------------
	const getAlbum = () => {
		if (details.length > 0) {
			SpotifyApi.searchAlbums(
				`${details[0].title} Original Motion Picture Soundtrack`
			)
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
		if (albumTracks !== undefined && albumTracks !== null) {
			return (
				albumTracks &&
				Object.values(albumTracks).map((data, index: number) => {
					return (
						<video
							key={index}
							poster={data.images[0].url} //wtf
							onMouseOver={handleMouseOver}
							onMouseOut={handleMouseOut}
							// src={data.track.items.} //double wtf
							className="album_player"
						></video>
					)
				})
			)
		}
	}

	// Playlist pipe ----------------------------------------------
	const getPlaylist = () => {
		if (details.length > 0) {
			SpotifyApi.searchPlaylists(
				`${details[0].title} Original Motion Picture Soundtrack`
			)
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
								className="playlist_player"
							></video>
						)
					}
				)
			)
		}
	}

	// Render Playlists if Albums are empty
	const albumOrPlaylist = () => {
		if (albumTracks === undefined || albumTracks.tracks.items === []) {
			showPlaylistTracks(playlistTracks)
		} else {
			showAlbumTracks(albumTracks)
		}
	}
	//-------------------------------------------------------------------

	const handleMouseOver = (e: React.MouseEvent<HTMLVideoElement>) => {
		e.currentTarget.play()
	}
	const handleMouseOut = (e: React.MouseEvent<HTMLVideoElement>) => {
		e.currentTarget.pause()
	}

	return (
		<>
			{details[0] == null ? null : (
				<div className="media_details">
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
					{albumOrPlaylist()}

					{/* {showPlaylistTracks(playlistTracks)} */}
					{/* {getTrackDetails(playlistTracks)} */}
				</div>
			)}
		</>
	)
}

export default MediaDetails
