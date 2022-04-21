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

	// render api results
	console.log(details)
	//Album pipe ---------------------------------------------------
	const getAlbum = () => {
		if (details.length > 0) {
			SpotifyApi.searchAlbums(
				`${details[0].title} ${
					details[0].first_air_date
						? `Series`
						: `Original Motion Picture Soundtrack`
				}`
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

	const getAlbumArtist = (albumTracks?: SpotifyApi.AlbumObjectFull) => {
		return albumTracks?.artists.map((artists) => {
			return <h2>{artists.name}</h2>
		})
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
										{getAlbumArtist(albumTracks)}
									</div>
								</div>

								<video
									key={index}
									// poster={albumTracks.images[1].url}
									onMouseOver={handleMouseOver}
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
		if (playlistTracks !== undefined) {
			return (
				playlistTracks &&
				Object.values(playlistTracks.tracks.items).map(
					(data: any, index: number) => {
						return (
							<video
								key={index}
								// poster={data.track.album.images[0].url}
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
					<div className="media_img">
						<img
							src={"https://image.tmdb.org/t/p/w200/" + details[0].poster_path}
							alt={details[0].poster_path}
						/>
					</div>
					<h1 className="details_title">{details[0].title}</h1>
					<h2 className="details_vote_average">{details[0].vote_average}/10</h2>
					<p className="details_release_date">{details[0].release_date}</p>
					<p className="overview"> {details[0].overview} </p>
					<div className="track_wrapper">
						{albumTracks === undefined
							? showPlaylistTracks(playlistTracks)
							: showAlbumTracks(albumTracks)}
					</div>
				</div>
			)}
		</>
	)
}

export default MediaDetails
