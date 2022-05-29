import React, { useState, useEffect } from "react"
import { loginUrl } from "./components/Spotify"
import MainLayout from "./components/MainLayout"
import MediaDetails from "./components/MediaDetails"
import { Layout } from "antd"
import { ExtractToken } from "./components/Spotify"
import { Routes, Route } from "react-router-dom"

const { Header, Content } = Layout

const App = () => {
	const [trending, setTrending] = useState<any[]>([])
	const [netflixOriginals, setNetflixOriginals] = useState<any[]>([])
	const [amazonOriginals, setAmazonOriginals] = useState<any[]>([])
	const [details, setDetails] = useState<any[]>([])
	const [token, setToken] = useState<any>(null)
	const [network, setNetwork] = useState<any>("")

	useEffect(() => {
		const hash = ExtractToken()
		const token = hash.access_token
		// const refresh = hash.refresh_tokens
		console.log(hash)
		upDetails(details)
		setToken(token)
		handleTrending()
		handleNetflixOriginals()
		handleAmazonOriginals()
	}, [])

	console.log(details[0])
	console.log("network:", network)

	const upDetails = (details: any[]) => {
		setDetails(details)
	}

	const upNetwork = (network: any) => {
		setNetwork(network)
	}
	const API_KEY: string = "d99ca085dcabfdf79d02b94e61ac56c4"
	const handleTrending = async () => {
		let moviesUrl = `https://api.themoviedb.org/3/trending/all/week?api_key=${API_KEY}&language=en-US`
		const res = await fetch(moviesUrl)
		const data = await res.json()
		setTrending(data.results)
	}
	const handleNetflixOriginals = async () => {
		let tvUrl = `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_networks=213&language=en-US`
		const res = await fetch(tvUrl)
		const data = await res.json()
		setNetflixOriginals(data.results)
	}

	const handleAmazonOriginals = async () => {
		let amazonOriginalsUrl = `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_networks=1024&language=en-US`
		const res = await fetch(amazonOriginalsUrl)
		const data = await res.json()
		setAmazonOriginals(data.results)
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
									upNetwork={upNetwork}
									trending={trending}
									netflixOriginals={netflixOriginals}
									amazonOriginals={amazonOriginals}
								/>
							}
						/>
						<Route
							path="/trending/:movie"
							element={
								<MediaDetails
									token={token}
									details={details}
									network={network}
								/>
							}
						/>
						<Route
							path="/netflix-originals/:tv"
							element={
								<MediaDetails
									token={token}
									details={details}
									network={network}
								/>
							}
						/>
						<Route
							path="/amazon-originals/:tv"
							element={
								<MediaDetails
									token={token}
									details={details}
									network={network}
								/>
							}
						/>
					</Routes>
				</Content>
			</Layout>
		</div>
	)
}

export default App
