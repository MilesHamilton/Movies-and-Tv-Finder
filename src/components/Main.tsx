import MovieContent from "./MovieContent"
import React, { useEffect, useState, useRef } from "react"
import TvContent from "./TvContent"
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
} from "antd"
import "./main.css"

const App = () => {
	const [movie, setMovie] = useState<any[]>([])
	const [tv, setTv] = useState<any[]>([])
	const [randomMovie, setRandomMovie] = useState("")
	const [randomTv, setRandomTv] = useState("")
	const [details, setDetails] = useState<any[]>([])
	const [movSlide, setMovSlide] = useState<number>(0)
	console.log(tv)

	const { Header, Footer, Sider, Content } = Layout

	useEffect(() => {
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
					<div>
						<Col className="movie_card_container">
							<div
								className="img"
								onClick={() => {
									setDetails([mv])
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
						</Col>
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
					<div>
						<Col className="movie_card_container">
							<div
								className="img"
								onClick={() => {
									setDetails([tv])
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
						</Col>
					</div>
				)
			})
		)
	}

	// Shows Movie or TV detials
	const showDetails = () => {
		return (
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
			</div>
		)
	}

	const carousalSettings = {
		slidesToShow: 8,
		slidesToScroll: 4,
		autoplay: true,
		pauseOnHover: true,
		draggable: true,
		autoplaySpeed: 5000,

		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 3,
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
				<Header>
					<h1>Movie and Tv finder</h1>
					<p>
						Click on a tab to discover a new movie or tv show. The trending tabs
						contain the most popular titles of both old and new film. The random
						tabs contain over 10,000 tv and movie titles from all over the
						world. Enjoy!
					</p>
				</Header>
				<div className="main_content">
					<Content>
						<Row>
							<Carousel {...carousalSettings}>{showMovies()}</Carousel>
						</Row>
						<Row>
							<Carousel {...carousalSettings}>{showTv()}</Carousel>
						</Row>
					</Content>

					<Sider>{details[0] == null ? null : showDetails()}</Sider>
				</div>

				<Footer></Footer>
			</Layout>
		</div>
	)
}

export default App
