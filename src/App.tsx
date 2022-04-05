import React, { useState, useEffect } from "react"
import MainLayout from "./components/MainLayout"
import Login from "./components/Login"
import { ExtractToken } from "./components/Spotify"

const App = () => {
	const [token, setToken] = useState<any>(null)

	useEffect(() => {
		const hash = ExtractToken()
		const _token = hash.access_token
		setToken(_token)
	}, [])

	return (
		<div>
			{token ? <h1>Successfully logged it</h1> : <Login />}
			<MainLayout token={token} />
		</div>
	)
}

export default App
