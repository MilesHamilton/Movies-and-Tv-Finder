import React, { useState } from "react"
import "../Sass/landing.scss"
import { Button, Modal } from "antd"
import { loginUrl } from "./Spotify"
import MobileMessage from "./MobileMessage"
import {
	BrowserView,
	MobileView,
	isBrowser,
	isMobile,
} from "react-device-detect"
// import video from "../Sass/images/React-App.webm"

const Landing = () => {
	const [isModalVisible, setIsModalVisible] = useState(false)

	const showModal = () => {
		setIsModalVisible(true)
	}

	const handleOk = () => {
		setIsModalVisible(false)
	}

	const handleCancel = () => {
		setIsModalVisible(false)
	}
	return (
		<>
			{isMobile ? (
				<MobileMessage />
			) : (
				<div className="opening-screen">
					<div className="logo-opening-screen"></div>
					<div className="opening-screen-body">
						<h1>Flixter</h1>
						<p>
							Your interface for quick movie soundtrack discovery, powered by
							Spotify.
						</p>
						<p className="info">A project by Miles Hamilton</p>
						<div className="login">
							<button>
								<a href={loginUrl}>LOG IN WITH SPOTIFY</a>
							</button>
						</div>
						<div className="about">
							<Button type="primary" onClick={showModal}>
								About this project
							</Button>
							<Modal
								title="About this project"
								visible={isModalVisible}
								onOk={handleOk}
								onCancel={handleCancel}
								footer={null}
							>
								<p>
									This project was created by
									<a href="https://www.linkedin.com/in/miles-hamilton/"> me</a>,
									a humble developer that took great inspiration from another
									useful web application
									<a href="https://discoverquickly.com/">
										{" "}
										Discover quickly
									</a>{" "}
									created by Aliza Aufrichtig and Edward Lee
								</p>
								<p>
									Flixter is not an official Spotify project, but it is powered
									by the excellent public Spotify Web API, which exposes music
									metadata, playback and recommendation endpoints.
								</p>
							</Modal>
						</div>
					</div>
					<div className="video-box">
						<video width="1000" height="550" autoPlay={true} muted>
							<source
								src={require("../Sass/images/React-App.webm")}
								type="video/webm"
							/>
						</video>
					</div>
				</div>
			)}
		</>
	)
}

export default Landing
