import React, { useState, useEffect } from "react"
import "./Sass/App.scss"
import Landing from "./components/Landing"
import MainLayout from "./components/MainLayout"
import MediaDetails from "./components/MediaDetails"
import MobileMessage from "./components/MobileMessage"
import { Layout } from "antd"
import { ExtractToken } from "./components/Spotify"
import { Routes, Route, useLocation } from "react-router-dom"
import { useLayoutEffect } from "react"
import {
	BrowserView,
	MobileView,
	isBrowser,
	isMobile,
} from "react-device-detect"
import ScrollToTop from "./components/ScrollToTop"

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
		removeLocationHash()
		// const refresh = hash.refresh_tokens
		// console.log(hash)

		upDetails(details)
		setToken(token)
		handleTrending()
		handleNetflixOriginals()
		handleAmazonOriginals()
		handleDisneyPlus()
		handleAppleOriginals()
		refreshToken()
	}, [])

	function removeLocationHash() {
		let noHashURL = window.location.href.replace(/#.*$/, "")
		window.history.replaceState("", document.title, noHashURL)
	}

	const refreshToken = () => {
		setTimeout(() => {
			setToken("")
		}, 1000 * 60 * 60)
	}

	// console.log(details[0])
	// console.log("network:", network)

	const upDetails = (details: any[]) => {
		setDetails(details)
	}

	const upNetwork = (network: any) => {
		setNetwork(network)
	}

	const upToken = () => {
		setToken("")
	}

	const API_KEY: string = "d99ca085dcabfdf79d02b94e61ac56c4"
	const handleTrending = async () => {
		let moviesUrl = `https://api.themoviedb.org/3/trending/all/week?api_key=${API_KEY}&language=en-US`
		const res = await fetch(moviesUrl)
		const data = await res.json()
		const shuffle = data.results.sort(() => Math.random() - 0.5)
		setTrending(shuffle)
	}

	const handleNetflixOriginals = async () => {
		let tvUrl = `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_networks=213&language=en-US&with_origin_country=US`
		const res = await fetch(tvUrl)
		const data = await res.json()
		const shuffle = data.results.sort(() => Math.random() - 0.5)
		setNetflixOriginals(shuffle)
	}

	const handleAmazonOriginals = async () => {
		let amazonOriginalsUrl = `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_networks=1024&language=en-US&with_origin_country=US`
		const res = await fetch(amazonOriginalsUrl)
		const data = await res.json()
		const shuffle = data.results.sort(() => Math.random() - 0.5)
		setAmazonOriginals(shuffle)
	}

	const handleDisneyPlus = async () => {
		let disneyPlusUrl = `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_networks=2739&language=en-US&with_origin_country=US`
		const res = await fetch(disneyPlusUrl)
		const data = await res.json()
		const shuffle = data.results.sort(() => Math.random() - 0.5)
		setDisneyPlus(shuffle)
	}

	const handleAppleOriginals = async () => {
		let appleOriginalsUrl = `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_networks=2552&language=en-US&with_origin_country=US`
		const res = await fetch(appleOriginalsUrl)
		const data = await res.json()
		const shuffle = data.results.sort(() => Math.random() - 0.5)
		setAppleOriginals(shuffle)
	}

	return (
		<div className="App">
			{token ? (
				<Layout>
					<Content>
						<ScrollToTop />
						<Routes>
							<Route
								path="/"
								element={
									<MainLayout
										details={details}
										upToken={upToken}
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
