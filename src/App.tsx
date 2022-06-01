import React, { useState, useEffect } from "react"
import "./Sass/App.scss"
import Landing from "./components/Landing"
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
	const [disneyPlus, setDisneyPlus] = useState<any[]>([])
	const [appleOriginals, setAppleOriginals] = useState<any[]>([])
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
		handleDisneyPlus()
		handleAppleOriginals()
		refreshToken()
	}, [])

	const refreshToken = () => {
		setTimeout(() => {
			setToken("")
		}, 1000 * 60 * 60)
	}

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

	const handleDisneyPlus = async () => {
		let disneyPlusUrl = `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_networks=2739&language=en-US`
		const res = await fetch(disneyPlusUrl)
		const data = await res.json()
		setDisneyPlus(data.results)
	}

	const handleAppleOriginals = async () => {
		let appleOriginalsUrl = `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_networks=2552&language=en-US`
		const res = await fetch(appleOriginalsUrl)
		const data = await res.json()
		setAppleOriginals(data.results)
	}

	return (
		<div className="App">
			{token ? (
				<Layout>
					<div className="header">
						<div className="logo"></div>
						<h1 className="pageTitle">Flixter</h1>
					</div>

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
										disneyPlus={disneyPlus}
										appleOriginals={appleOriginals}
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
							<Route
								path="/disney-plus/:tv"
								element={
									<MediaDetails
										token={token}
										details={details}
										network={network}
									/>
								}
							/>
							<Route
								path="/apple-originals/:tv"
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
			) : (
				<Landing />
			)}
		</div>
	)
}

export default App
