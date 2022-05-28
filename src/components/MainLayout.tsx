import React, { useEffect, useState, useContext } from "react"
import { Carousel, Divider } from "antd"
import "../Sass/main_layout.scss"
import { Routes, Route, Outlet, Link } from "react-router-dom"
interface Props {
	details: any[]
	upDetails: any
	trending: any
	netflixOriginals: any
	amazonOriginals: any
}
const MainLayout: React.FC<Props> = ({
	details,
	upDetails,
	trending,
	netflixOriginals,
	amazonOriginals,
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
						onClick={() => upDetails([mv])}
					>
						<div className="card-container">
							<div
								className="img"
								onClick={() => {
									upDetails([mv])
								}}
							>
								<img
									src={"https://image.tmdb.org/t/p/w200/" + mv.poster_path}
									alt={mv.poster_path}
								/>
							</div>

							{/* <h1 className="title">{mv.title}</h1>

							<h2 className="vote_average">{mv.vote_average}/10</h2>
							<p className="release_date">{mv.release_date}</p> */}
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
						onClick={() => upDetails([data])}
					>
						<div className="card-container">
							<div
								className="img"
								onClick={() => {
									upDetails([data])
								}}
							>
								<img
									src={"https://image.tmdb.org/t/p/w200/" + data.poster_path}
									alt={data.poster_path}
								/>
							</div>
							{/* <h1 className="title">{tv.original_name}</h1>
							<h2 className="vote_average">{tv.vote_average}/10</h2>
							<p className="release_date">{tv.first_air_date}</p> */}
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
						onClick={() => upDetails([data])}
					>
						<div className="card-container">
							<div
								className="img"
								onClick={() => {
									upDetails([data])
								}}
							>
								<img
									src={"https://image.tmdb.org/t/p/w200/" + data.poster_path}
									alt={data.poster_path}
								/>
							</div>
							{/* <h1 className="title">{tv.original_name}</h1>
							<h2 className="vote_average">{tv.vote_average}/10</h2>
							<p className="release_date">{tv.first_air_date}</p> */}
						</div>
					</Link>
				)
			})
		)
	}

	// request pipe to get playlist id and individual tracks

	const carousalSettings = {
		slidesToShow: 8,
		slidesToScroll: 4,
		dots: false,
		autoplay: true,
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
			<Divider plain />
			<div className="trending-carousel">
				<h1>Trending</h1>
				<Carousel arrows={true} {...carousalSettings}>
					{showTrending()}
				</Carousel>
			</div>
			<div className="netflix-carousel">
				<h1>Netflix Originals</h1>
				<Carousel {...carousalSettings}>{showNetflixOriginals()}</Carousel>
			</div>
			<div className="amazon-carousel">
				<h1>Amazon Originals</h1>
				<Carousel {...carousalSettings}>{showAmazonOriginals()}</Carousel>
			</div>
		</div>
	)
}

export default MainLayout
