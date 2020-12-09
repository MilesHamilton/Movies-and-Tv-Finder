import MovieContent from "./MovieContent"
import React, { useEffect, useState } from "react"
import TvContent from "./TvContent"
import { Layout, Row, Col } from "antd"

const App = () => {
	const [movie, setMovie] = useState<any[]>([])
	const [tv, setTv] = useState("")
	const [randomMovie, setRandomMovie] = useState("")
	const [randomTv, setRandomTv] = useState("")

	useEffect(() => {
		handleMovieData()
		handleTvData()
		handleRandomMovie()
		handleRandomTv()
	}, [])

	console.log(movie)

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
			movie.map((elm) => {
				console.log(elm)
				return (
					<div className="container">
						<h1 className="title">{elm.title}</h1>
						<p className="overview"> {elm.overview} </p>
						<div className="img">
							<img
								src={"https://image.tmdb.org/t/p/w500/" + elm.poster_path}
								alt={elm.poster_path}
							/>
						</div>

						<h2 className="vote_average">Voting average: {elm.vote_average}</h2>
						<p className="release_date">Release date: {elm.release_date}</p>
					</div>
				)
			})

			// return (
			// 	<div className="container">
			// 		<h1 className="title">{elm.title}</h1>
			// 		<p className="overview"> {elm.overview} </p>
			// 		<div className="img">
			// 			<img
			// 				src={"https://image.tmdb.org/t/p/w500/" + elm.poster_path}
			// 				alt={elm.poster_path}
			// 			/>
			// 		</div>

			// 		<h2 className="vote_average">Voting average: {elm.vote_average}</h2>
			// 		<p className="release_date">Release date: {elm.release_date}</p>
			// 	</div>
			// )
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
				<Content className="wrapper">
					<Row>
						<Col span={6}>{showMovies()}</Col>
					</Row>
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
				<Footer></Footer>
			</Layout>
		</div>
	)
}

export default App

// 	async handleTvData() {
// 		let random = Math.floor(Math.random() * (2 - 1 + 1)) + 1
// 		let tvUrl = `https://api.themoviedb.org/3/discover/tv?api_key=d99ca085dcabfdf79d02b94e61ac56c4&language=en-US&timezone=America%2FNew_York&vote_average.gte=0&include_null_first_air_dates=false&page=${random}`
// 		const res = await fetch(tvUrl)
// 		const data = await res.json()
// 		console.log(data)
// 		this.setState({
// 			tv: data.results,
// 		})
// 	}

// 	async handleRandomTv() {
// 		let random = Math.floor(Math.random() * (500 - 1 + 1)) + 1
// 		let tvUrl = `https://api.themoviedb.org/3/discover/tv?api_key=d99ca085dcabfdf79d02b94e61ac56c4&language=en-US&timezone=America%2FNew_York&vote_average.gte=0&include_null_first_air_dates=false&page=${random}`
// 		const res = await fetch(tvUrl)
// 		const data = await res.json()
// 		// console.log(data);
// 		this.setState({
// 			randomTv: data.results,
// 		})
// 	}

// 	async handleMovieData() {
// 		let random = Math.floor(Math.random() * (2 - 1 + 1)) + 1
// 		let moviesUrl = `https://api.themoviedb.org/3/discover/movie?api_key=d99ca085dcabfdf79d02b94e61ac56c4&language=en-US&include_adult=false&include_video=false&vote_average.gte=0&page=${random}`
// 		const res = await fetch(moviesUrl)
// 		const data = await res.json()
// 		// console.log(data);
// 		this.setState({
// 			movie: data.results,
// 		})
// 	}

// 	async handleRandomMovie() {
// 		let random = Math.floor(Math.random() * (500 - 1 + 1)) + 1
// 		let moviesUrl = `https://api.themoviedb.org/3/discover/movie?api_key=d99ca085dcabfdf79d02b94e61ac56c4&language=en-US&include_adult=false&include_video=false&vote_average.gte=0&page=${random}`
// 		const res = await fetch(moviesUrl)
// 		const data = await res.json()
// 		// console.log(data);
// 		this.setState({
// 			randomMovie: data.results,
// 		})
// 	}

// 	render() {
// 		console.log(this.state)
// 		let random = Math.floor(Math.random() * (20 - 1 + 1)) + 1
// 		const content = {
// 			movieTab: (
// 				<div className="trendingMovie">
// 					<MovieContent {...this.state.movie[random]} />
// 				</div>
// 			),
// 			randomMovieTab: (
// 				<div className="randomMovie">
// 					<MovieContent {...this.state.randomMovie[random]} />
// 				</div>
// 			),
// 			tvTab: (
// 				<div className="trendingTv">
// 					<TvContent {...this.state.tv[random]} />
// 				</div>
// 			),
// 			randomTvTab: (
// 				<div className="randomTv">
// 					<TvContent {...this.state.randomTv[random]} />
// 				</div>
// 			),
// 		}
// 		console.log(content)
// 		return (
// 			<div className="App">
// 				<header>
// 					<h1>Movie and Tv finder</h1>
// 					<p>
// 						Click on a tab to discover a new movie or tv show. The trending tabs
// 						contain the most popular titles of both old and new film. The random
// 						tabs contain over 10,000 tv and movie titles from all over the
// 						world. Enjoy!
// 					</p>
// 				</header>
// 				<main className="wrapper">
// 					<Tabs
// 						active={this.state.active}
// 						onChange={(active) => this.setState({ active })}
// 					>
// 						<button className="movieTab" key="movieTab">
// 							Trending Movies
// 						</button>
// 						<button className="randomMovieTab" key="randomMovieTab">
// 							Random Movies
// 						</button>
// 						<button className="tvTab" key="tvTab">
// 							Trending Series
// 						</button>
// 						<button className="randomTvTab" key="randomTvTab">
// 							Random Series
// 						</button>
// 					</Tabs>
// 					<div>{content[this.state.active]}</div>
// 					<footer></footer>
// 				</main>
// 			</div>
// 		)
// 	}
// }

// export default App
