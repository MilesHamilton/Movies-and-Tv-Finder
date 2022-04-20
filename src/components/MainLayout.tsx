import React, { useEffect, useState, useContext } from "react"
import { Carousel, Drawer, Divider } from "antd"
import "../Sass/main_layout.scss"
import { Routes, Route, Outlet, Link } from "react-router-dom"
interface Props {
	details: any[]
	upDetails: any
	movie: any
	tv: any
}
const MainLayout: React.FC<Props> = ({ details, upDetails, movie, tv }) => {
	// Creates movie cards
	const showMovies = (): JSX.Element[] => {
		return (
			movie &&
			movie.map((mv: any) => {
				return (
					<Link
						key={mv.id}
						to={`/movie/${mv.title}`}
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

							<h1 className="title">{mv.title}</h1>

							<h2 className="vote_average">{mv.vote_average}/10</h2>
							<p className="release_date">{mv.release_date}</p>
						</div>
					</Link>
				)
			})
		)
	}

	//  creates TV cards
	const showTv = (): JSX.Element[] => {
		return (
			tv &&
			tv.map((tv: any) => {
				return (
					<div className="card-container">
						<div
							className="imgtv"
							onClick={() => {
								upDetails([tv])
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
					</div>
				)
			})
		)
	}

	// request pipe to get playlist id and individual tracks

	const carousalSettings = {
		slidesToShow: 8,
		slidesToScroll: 4,
		dots: true,
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
			<Divider plain />
			<div className="tv-carousel">
				<h1>Trending Movies</h1>
				<Carousel {...carousalSettings}>{showMovies()}</Carousel>
			</div>
			<div className="tv-carousel">
				<h1>Trending Television</h1>
				<Carousel {...carousalSettings}>{showTv()}</Carousel>
			</div>
		</div>
	)
}

export default MainLayout
