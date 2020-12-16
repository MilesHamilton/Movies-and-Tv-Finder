import MovieContent from "./MovieContent"
import React, { useEffect, useState, useRef } from "react"
import TvContent from "./TvContent"
import qs from "query-string"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import {
	Layout,
	Row,
	Col,
	Input,
	AutoComplete,
	Carousel,
	InputNumber,
	Drawer,
	Divider,
} from "antd"
import "./main.css"
import SpotifyWebApi from "spotify-web-api-js"

const App = () => {
	const [movie, setMovie] = useState<any[]>([])
	const [tv, setTv] = useState<any[]>([])
	const [randomMovie, setRandomMovie] = useState("")
	const [randomTv, setRandomTv] = useState("")
	const [details, setDetails] = useState<any[]>([])
	const [visible, setVisible] = useState(false)
	const [accessToken, setAccessToken] = useState<any>("")
	var SpotifyApi = new SpotifyWebApi()
	SpotifyApi.setAccessToken(accessToken)

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
		let parsed = qs.parse(window.location.search)
		let token = parsed.access_token
		setAccessToken(token)
		handleMovieData()
		handleTvData()
		handleRandomMovie()
		handleRandomTv()
	}, [])

	// API calls
	const handleTvData = async () => {
		let random = Math.floor(Math.random() * (2 - 1 + 1)) + 1
		let tvUrl = `https://api.themoviedb.org/3/discover/tv?api_key=d99ca085dcabfdf79d02b94e61ac56c4&language=en-US&timezone=America%2FNew_York&vote_average.gte=0&include_null_first_air_dates=false&page=1`
		const res = await fetch(tvUrl)
		const data = await res.json()
		// console.log(data)
		setTv(data.results)
	}

	const handleRandomTv = async () => {
		let random = Math.floor(Math.random() * (500 - 1 + 1)) + 1
		let tvUrl = `https://api.themoviedb.org/3/discover/tv?api_key=d99ca085dcabfdf79d02b94e61ac56c4&language=en-US&timezone=America%2FNew_York&vote_average.gte=0&include_null_first_air_dates=false&page=${random}`
		const res = await fetch(tvUrl)
		const data = await res.json()
		// console.log(data)
		setRandomTv(data)
	}

	const handleMovieData = async () => {
		let random = Math.floor(Math.random() * (2 - 1 + 1)) + 1
		let moviesUrl = `https://api.themoviedb.org/3/discover/movie?api_key=d99ca085dcabfdf79d02b94e61ac56c4&language=en-US&include_adult=false&include_video=false&vote_average.gte=0&page=${random}`
		const res = await fetch(moviesUrl)
		const data = await res.json()
		// console.log(data)
		setMovie(data.results)
	}

	const handleRandomMovie = async () => {
		let random = Math.floor(Math.random() * (500 - 1 + 1)) + 1
		let moviesUrl = `https://api.themoviedb.org/3/discover/movie?api_key=d99ca085dcabfdf79d02b94e61ac56c4&language=en-US&include_adult=false&include_video=false&vote_average.gte=0&page=${random}`
		const res = await fetch(moviesUrl)
		const data = await res.json()
		// console.log(data)
		setRandomMovie(data)
	}
	// Creates movie cards
	const showMovies = () => {
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
	const showTv = () => {
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
						{/* </Col> */}
					</div>
				)
			})
		)
	}

	const showAlbums = () => {
		if (details) {
			SpotifyApi.searchAlbums(`${details[0].title} Soundtrack`)
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
						<div className="search-header">
							<h1>Welcome</h1>
							<h2>
								Find information on your favorite Movies and TV shows, including
								their soundtracks
							</h2>
							<AutoComplete
								// options={options}
								// onSelect={onSelect}
								// onSearch={onSearch}
								placeholder="Search for Movie or TV show"
							/>
						</div>
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
										{showAlbums()}
									</div>
								)}
							</Drawer>
						</div>
					</Content>
					<Footer></Footer>
				</Layout>

				{/* <Sider>{details[0] == null ? null : showDetails()}</Sider> */}
			</Layout>
		</div>
	)
}

export default App
