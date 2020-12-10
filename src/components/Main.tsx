import MovieContent from "./MovieContent"
import React, { useEffect, useState } from "react"
import TvContent from "./TvContent"
import { Layout, Row, Col, Input, AutoComplete } from "antd"
import "./main.css"

const App = () => {
	const [movie, setMovie] = useState<any[]>([])
	const [tv, setTv] = useState("")
	const [randomMovie, setRandomMovie] = useState("")
	const [randomTv, setRandomTv] = useState("")
	const [details, setDetails] = useState<any[]>([])
	console.log(details)

	useEffect(() => {
		handleMovieData()
		handleTvData()
		handleRandomMovie()
		handleRandomTv()
	}, [])

	const { Header, Footer, Sider, Content } = Layout

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
		console.log(data)
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

	const showMovies = () => {
		return (
			movie &&
			movie.map((mv) => {
				return (
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
				)
			})
		)
	}

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
						<Row className="movie_card_wrapper">{showMovies()}</Row>
						{/* <Tabs
					active={this.state.active}
					onChange={(active) => this.setState({ active })}
				>
					<button className="movieTab" key="movieTab">
						Trending Movies
					</button>
					<button className="randomMovieTab" key="randomMovieTab">
						Random Movies
					</button>
					<button className="tvTab" key="tvTab">
						Trending Series
					</button>
					<button className="randomTvTab" key="randomTvTab">
						Random Series
					</button>
				</Tabs>
				<div>{content[this.state.active]}</div> */}
					</Content>
					<Sider>{details[0] == null ? null : showDetails()}</Sider>
				</div>

				<Footer></Footer>
			</Layout>
		</div>
	)
}

export default App
