import React, { useEffect, useState, useContext } from "react"
import { Carousel, Divider } from "antd"
import "../Sass/main_layout.scss"
import { Routes, Route, Outlet, Link } from "react-router-dom"
interface Props {
	details: any[]
	upDetails: any
	upNetwork: any
	upToken: any
	trending: any
	netflixOriginals: any
	amazonOriginals: any
	disneyPlus: any
	appleOriginals: any
}
const MainLayout: React.FC<Props> = ({
	details,
	upDetails,
	upNetwork,
	upToken,
	trending,
	netflixOriginals,
	amazonOriginals,
	disneyPlus,
	appleOriginals,
}) => {
	// Creates movie cards
	const showTrending = (): JSX.Element[] => {
		return (
			trending &&
			trending.map((mv: any) => {
				return (
					<Link
						key={mv.id}
						to={`/trending/${mv.title}`}
						onClick={() => {
							upDetails([mv])
							upNetwork("trending")
						}}
					>
						<div className="card-container">
							<div
								className="img"
								onClick={() => {
									upDetails([mv])
									upNetwork("trending")
								}}
							>
								<img
									src={"https://image.tmdb.org/t/p/w200/" + mv.poster_path}
									alt={mv.poster_path}
								/>
							</div>
						</div>
					</Link>
				)
			})
		)
	}

	//  creates TV cards
	const showNetflixOriginals = (): JSX.Element[] => {
		return (
			netflixOriginals &&
			netflixOriginals.map((data: any) => {
				return (
					<Link
						key={data.id}
						to={`/Netflix-originals/${data.original_name}`}
						onClick={() => {
							upDetails([data])
							upNetwork("netflix")
						}}
					>
						<div className="card-container">
							<div
								className="img"
								onClick={() => {
									upDetails([data])
									upNetwork("netflix")
								}}
							>
								<img
									src={"https://image.tmdb.org/t/p/w200/" + data.poster_path}
									alt={data.poster_path}
								/>
							</div>
						</div>
					</Link>
				)
			})
		)
	}

	const showAmazonOriginals = (): JSX.Element[] => {
		return (
			amazonOriginals &&
			amazonOriginals.map((data: any) => {
				return (
					<Link
						key={data.id}
						to={`/Amazon-originals/${data.original_name}`}
						onClick={() => {
							upDetails([data])
							upNetwork("amazon")
						}}
					>
						<div className="card-container">
							<div
								className="img"
								onClick={() => {
									upDetails([data])
									upNetwork("amazon")
								}}
							>
								<img
									src={"https://image.tmdb.org/t/p/w200/" + data.poster_path}
									alt={data.poster_path}
								/>
							</div>
						</div>
					</Link>
				)
			})
		)
	}

	const showDisneyPlus = (): JSX.Element[] => {
		return (
			disneyPlus &&
			disneyPlus.map((data: any) => {
				return (
					<Link
						key={data.id}
						to={`/Disney-plus/${data.original_name}`}
						onClick={() => {
							upDetails([data])
							upNetwork("disney")
						}}
					>
						<div className="card-container">
							<div
								className="img"
								onClick={() => {
									upDetails([data])
									upNetwork("disney")
								}}
							>
								<img
									src={"https://image.tmdb.org/t/p/w200/" + data.poster_path}
									alt={data.poster_path}
								/>
							</div>
						</div>
					</Link>
				)
			})
		)
	}
	const showAppleOriginals = (): JSX.Element[] => {
		return (
			appleOriginals &&
			appleOriginals.map((data: any) => {
				return (
					<Link
						key={data.id}
						to={`/apple-originals/${data.original_name}`}
						onClick={() => {
							upDetails([data])
							upNetwork("apple")
						}}
					>
						<div className="card-container">
							<div
								className="img"
								onClick={() => {
									upDetails([data])
									upNetwork("apple")
								}}
							>
								<img
									src={"https://image.tmdb.org/t/p/w200/" + data.poster_path}
									alt={data.poster_path}
								/>
							</div>
						</div>
					</Link>
				)
			})
		)
	}

	// request pipe to get playlist id and individual tracks

	const carousalSettings = {
		slidesToShow: 7,
		slidesToScroll: 8,
		dots: false,
		autoplay: false,
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
		<div className="Content">
			<div className="header">
				<div className="logo"></div>
				<h1 className="pageTitle">Flixter</h1>
			</div>
			<div className="logout">
				<button onClick={() => upToken()}>
					{/* <a href={() => upToken}>Log out</a> */}
					Log out
				</button>
			</div>
			<Divider plain />
			<div className="carousel">
				<h1>Trending</h1>
				<Carousel arrows={true} {...carousalSettings}>
					{showTrending()}
				</Carousel>
			</div>
			<div className="carousel">
				<h1>Netflix Originals</h1>
				<Carousel arrows={true} {...carousalSettings}>
					{showNetflixOriginals()}
				</Carousel>
			</div>
			<div className="carousel">
				<h1>Amazon Originals</h1>
				<Carousel arrows={true} {...carousalSettings}>
					{showAmazonOriginals()}
				</Carousel>
			</div>
			<div className="carousel">
				<h1>Disney Plus</h1>
				<Carousel arrows={true} {...carousalSettings}>
					{showDisneyPlus()}
				</Carousel>
			</div>
			<div className="carousel">
				<h1>Apple Originals</h1>
				<Carousel arrows={true} {...carousalSettings}>
					{showAppleOriginals()}
				</Carousel>
			</div>
		</div>
	)
}

export default MainLayout
