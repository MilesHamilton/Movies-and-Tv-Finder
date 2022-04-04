export const authEndPoint = "https://accounts.spotify.com/authorize"
const redirectUri = window.location.href
const clientId = "ebdf37b5ee9344768dab19cc34e33ab8"
const scopes = [
	"user-read-currently-playing",
	"user-read-recently-played",
	"user-read-playback-state",
	"user-top-read",
	"user-modify-playback-state",
]

interface Oauth {
	window: {}
}
export const ExtractToken = (Oath = { window: {} }) => {
	return window.location.hash
		.substring(1)
		.split("&")
		.reduce((initial: any, item: string) => {
			let parts = item.split("=")
			initial[parts[0]] = decodeURIComponent(parts[1])
			return initial
		}, {})
}
export const loginUrl = `${authEndPoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
	"%20"
)}&response_type=token&show_dialog=true`
