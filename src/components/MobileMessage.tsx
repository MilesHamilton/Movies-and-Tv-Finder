import React from "react"
import "../Sass/landing.scss"

const MobileMessage = () => {
	return (
		<div className="mobile-message">
			<div className="opening-screen">
				<div className="logo-opening-screen"></div>
				<div className="opening-screen-body">
					<h1>Flixter</h1>
					<p>
						Your interface for quick movie soundtrack discovery, powered by
						Spotify.
					</p>
					<p className="info">A project by Miles Hamilton</p>
				</div>
			</div>
			<div className="video-box">
				<video width="500" height="300" autoPlay={true} muted>
					<source
						src={require("../Sass/images/React-App.webm")}
						type="video/webm"
					/>
				</video>
			</div>
			<div className="landing-footer">
				<p>
					Flixter was designed for a desktop experience. Intrigued?{" "}
					<a href="mailto:email@example.com"> Email yourself a link</a> to check
					it out on the big screen, or just copy the link and do with it what
					you will
				</p>

				<p className="copy-link">https://flixter.app</p>
			</div>
		</div>
	)
}

export default MobileMessage
