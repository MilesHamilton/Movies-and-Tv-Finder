import React, { useEffect, useState } from "react"
import { Layout, Carousel, Drawer, Divider } from "antd"
import "./main.css"
import Spotify from "spotify-web-api-js"

const SpotifyApi = new Spotify()
interface Spotify {
	playlistId: string
}

const App = (getParams: any) => {
	const [movie, setMovie] = useState<any[]>([])
	const [tv, setTv] = useState<any[]>([])
	const [details, setDetails] = useState<any[]>([])
	const [visible, setVisible] = useState<boolean>(false)
	const [playlist, setPlaylist] = useState<any>([])
	const [tracks, setTracks] = useState<any>([])

	if (getParams) {
		SpotifyApi.setAccessToken(getParams.getParams)
	}

	console.log(movie)
	console.log(tv)

	const showDrawer = () => {
		setVisible(true)
	}
	const onClose = () => {
		setVisible(false)
	}

	const { Header, Footer, Sider, Content } = Layout

	useEffect(() => {
		handleMovieData()
		handleTvData()
	}, [])

	useEffect(() => {
		getPlaylist()
		// if (playlist.length > 0) {
		// 	getPlaylistTracks()
		// }
	}, [details])

	console.log(tracks)
	// API calls
	const handleTvData = async () => {
		let tvUrl = `https://api.themoviedb.org/3/discover/tv?api_key=d99ca085dcabfdf79d02b94e61ac56c4&language=en-US&timezone=America%2FNew_York&vote_average.gte=0&include_null_first_air_dates=false&page=1`
		const res = await fetch(tvUrl)
		const data = await res.json()
		// console.log(data)
		setTv(data.results)
	}

	const handleMovieData = async () => {
		let moviesUrl = `https://api.themoviedb.org/3/discover/movie?api_key=d99ca085dcabfdf79d02b94e61ac56c4&language=en-US&include_adult=false&include_video=false&vote_average.gte=0&page=1}`
		const res = await fetch(moviesUrl)
		const data = await res.json()
		setMovie(data.results)
	}

	// Creates movie cards
	const showMovies = (): JSX.Element[] => {
		return (
			movie &&
			movie.map((mv) => {
				return (
					<div className="card-container">
						<div
							className="img"
							onClick={() => {
								setDetails([mv])
								showDrawer()
							}}
						>
							<img
								src={"https://image.tmdb.org/t/p/w200/" + mv.poster_path}
								alt={mv.poster_path}
							/>
						</div>

						<h1 className="title">{mv.title}</h1>

						<h2 className="vote_average">{mv.vote_average}/10</h2>
						<p className="release_date">{mv.release_date}</p>
					</div>
				)
			})
		)
	}
	//  creates TV cards
	const showTv = (): JSX.Element[] => {
		return (
			tv &&
			tv.map((tv) => {
				return (
					<div className="card-container">
						<div
							className="imgtv"
							onClick={() => {
								setDetails([tv])
								showDrawer()
								// getPlaylist()
							}}
						>
							<img
								src={"https://image.tmdb.org/t/p/w200/" + tv.poster_path}
								alt={tv.poster_path}
							/>
						</div>

						<h1 className="title">{tv.original_name}</h1>

						<h2 className="vote_average">{tv.vote_average}/10</h2>
						<p className="release_date">{tv.first_air_date}</p>
					</div>
				)
			})
		)
	}

	// request pipe to get playlist id and individual tracks
	const getPlaylist = () => {
		if (details.length > 0) {
			SpotifyApi.searchPlaylists(`${details[0].title} Soundtrack`)
				.then((data) => {
					setPlaylist(data)
					const playlistID = playlist.items[0].id
					SpotifyApi.getPlaylist(playlistID).then((data) => {
						console.log(data)
					})
				})
				.catch((err) => {
					console.log(err)
				})
		}
	}

	// const getPlaylistTracks = () => {
	// 	const playlistID = playlist.items[0].id
	// 	SpotifyApi.getPlaylist(playlistID).then((data) => {
	// 		console.log(data)
	// 	})
	// }

	console.log(playlist)

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

	const carousalSettings = {
		slidesToShow: 8,
		slidesToScroll: 4,
		dots: false,
		// autoplay: true,
		pauseOnHover: true,
		draggable: true,
		autoplaySpeed: 5000,

		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 5,
					slidesToScroll: 5,
					infinite: true,
					dots: true,
				},
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
					initialSlide: 2,
				},
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				},
			},
		],
	}

	return (
		<div className="App">
			<Layout>
				<Layout>
					<Header>
						<h1>Movie and Tv Finder</h1>
					</Header>
					<Content>
						<h1>Welcome</h1>
						<h2>
							Find information on your favorite Movies and TV shows, including
							their soundtracks
						</h2>
						<div className="movie-carousel">
							<h1>Trending Movies</h1>
							<Carousel {...carousalSettings}>{showMovies()}</Carousel>
						</div>
						<Divider plain />
						<div className="tv-carousel">
							<h1>Trending TV</h1>
							<Carousel {...carousalSettings}>{showTv()}</Carousel>
						</div>
						<div>
							<Drawer
								className="drawer_details"
								placement="right"
								closable={true}
								onClose={onClose}
								visible={visible}
								maskClosable={true}
							>
								{details[0] == null ? null : (
									<div>
										<div className="img">
											<img
												src={
													"https://image.tmdb.org/t/p/w200/" +
													details[0].poster_path
												}
												alt={details[0].poster_path}
											/>
										</div>
										<h1 className="details_title">{details[0].title}</h1>

										<h2 className="details_vote_average">
											{details[0].vote_average}/10
										</h2>
										<p className="details_release_date">
											{details[0].release_date}
										</p>
										<p className="overview"> {details[0].overview} </p>
									</div>
								)}
							</Drawer>
						</div>
					</Content>
					<Footer></Footer>
				</Layout>
			</Layout>
		</div>
	)
}

export default App
