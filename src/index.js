import React, { useLayoutEffect } from "react"
import "./index.css"
import App from "./App"
import * as serviceWorker from "./serviceWorker"
import { useLocation, BrowserRouter as Router } from "react-router-dom"
import { createRoot } from "react-dom/client"
const container = document.getElementById("root")
const root = createRoot(container) // createRoot(container!) if you use TypeScript

const ScrollToTop = ({ children }) => {
	const location = useLocation()
	useLayoutEffect(() => {
		document.documentElement.scrollTo(0, 0)
	}, [location.pathname])
	return children
}

root.render(
	<Router>
		<ScrollToTop>
			<App />
		</ScrollToTop>
	</Router>
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
