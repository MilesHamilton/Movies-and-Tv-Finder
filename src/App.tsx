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

	useEffect(() => {
		const hash = ExtractToken()
		const token = hash.access_token
		const refresh = hash.refresh_token
		console.log(hash)
		upDetails(details)
		setToken(token)
		handleMovieData()
		handleTvData()
	}, [])

	const upDetails = (details: any[]) => {
		setDetails(details)
	}

	const handleMovieData = async () => {
		let moviesUrl = `https://api.themoviedb.org/3/discover/movie?api_key=d99ca085dcabfdf79d02b94e61ac56c4&language=en-US&region=US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_year=2022&watch_region=US`
		const res = await fetch(moviesUrl)
		const data = await res.json()
		setMovie(data.results)
	}
	const handleTvData = async () => {
		let tvUrl = `
https://api.themoviedb.org/3/discover/tv?api_key=d99ca085dcabfdf79d02b94e61ac56c4&language=en-US&sort_by=popularity.desc&first_air_date_year=2022&page=1&timezone=America%2FNew_York&with_genres=Drama&watch_region=US`
		const res = await fetch(tvUrl)
		const data = await res.json()
		// console.log(data)
		setTv(data.results)
	}

	return (
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
