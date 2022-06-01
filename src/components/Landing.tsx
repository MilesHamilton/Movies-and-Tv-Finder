import React from "react"
import "../Sass/landing.scss"
import { loginUrl } from "./Spotify"

const Landing = () => {
	return (
		<div className="opening-screen">
			<div className="logo-opening-screen"></div>
			<div className="opening-screen-body">
				<h1>Flixter</h1>
				<p>
					Your interface for quick movie soundtrack discovery, powered by
					Spotify.
				</p>
				<p className="info">A project by Miles Hamilton</p>
				<div>
					<button>
						<a href={loginUrl}>LOG IN WITH SPOTIFY</a>
					</button>
				</div>
			</div>
			<div className="video-box">
				<video></video>
			</div>
		</div>
	)
}

export default Landing
