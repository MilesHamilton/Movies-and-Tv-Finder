import React, { useState, useEffect } from "react"
import { loginUrl } from "./components/Spotify"
import MainLayout from "./components/MainLayout"
import MediaDetails from "./components/MediaDetails"
import { Layout } from "antd"
import { ExtractToken } from "./components/Spotify"
import { Routes, Route } from "react-router-dom"

const { Header, Footer, Content } = Layout

const App = () => {
	const [movie, setMovie] = useState<any[]>([])
	const [tv, setTv] = useState<any[]>([])
	const [details, setDetails] = useState<any[]>([])
	const [token, setToken] = useState<any>(null)
	const [refresh, setRefresh] = useState<any>(null)

	useEffect(() => {
		const hash = ExtractToken()
		const token = hash.access_token
		const refresh = hash.refresh_token
		console.log(hash)
		upDetails(details)
		setToken(token)
		setRefresh(refresh)
		handleMovieData()
		handleTvData()
	}, [])
	console.log(token)
	console.log(refresh)
	const upDetails = (details: any[]) => {
		setDetails(details)
	}

	const handleTvData = async () => {
		let tvUrl = `https://api.themoviedb.org/3/discover/tv?api_key=d99ca085dcabfdf79d02b94e61ac56c4&language=en-US&timezone=America%2FNew_York&vote_average.gte=0&include_null_first_air_dates=false&page=1`
		const res = await fetch(tvUrl)
		const data = await res.json()
		// console.log(data)
		setTv(data.results)
	}

	const handleMovieData = async () => {
		let moviesUrl = `https://api.themoviedb.org/3/discover/movie?api_key=d99ca085dcabfdf79d02b94e61ac56c4&language=en-US&include_adult=false&include_video=false&vote_average.gte=0&page=1`
		const res = await fetch(moviesUrl)
		const data = await res.json()
		setMovie(data.results)
	}
	//api.themoviedb.org/3/movie/now_playing?api_key=<<api_key>>&language=en-US&page=1
	https: return (
		<div className="App">
			{token ? (
				<h1>Successfully logged it</h1>
			) : (
				<a href={loginUrl}>LOG IN WITH SPOTIFY</a>
			)}
			<Layout>
				<Header>
					<h1>Movie and Tv Finder</h1>
				</Header>
				<Content>
					<Routes>
						<Route
							path="/"
							element={
								<MainLayout
									details={details}
									upDetails={upDetails}
									tv={tv}
									movie={movie}
								/>
							}
						/>
						<Route
							path="/movie/:movie"
							element={<MediaDetails token={token} details={details} />}
						/>
						<Route
							path="/tv/:tv"
							element={<MediaDetails token={token} details={details} />}
						/>
					</Routes>
				</Content>
			</Layout>
		</div>
	)
}

export default App
