import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./Page/Home/Home"
import Tvs from "./Page/Tvs/Tvs"
import Login from "./Page/Login/LoginPage"
import "./App.css"
import DetailsPage from "./Page/Details/Details"
import TvDetailsPage from "./Page/TvDetails/TvDetails"

export function RequireAuth({ children }) {
	// Used to ensure the refreshToken is called once at a time
	// TODO Get user from local storage
	const user = localStorage.getItem("user")

	if (user === null) {
		window.location.href = "/login"
		return null
	} else {
		return children
	}
}

function App() {
	//Navigation dans requireAuth
	return (
		<BrowserRouter>
			<Routes>
				<Route
					path="/"
					element={
						<RequireAuth>
							<Home />
						</RequireAuth>
					}
				/>
				<Route
					path="/tvs"
					element={
						<RequireAuth>
							<Tvs />
						</RequireAuth>
					}
				/>
				<Route path="/login" element={<Login />} />
				<Route
					path="/movie/:id"
					element={
						<RequireAuth>
							<DetailsPage />
						</RequireAuth>
					}
				/>
				<Route
					path="/serie/:id"
					element={
						<RequireAuth>
							<TvDetailsPage />
						</RequireAuth>
					}
				/>
				<Route path="*" element={<h1>Page not found</h1>} />
			</Routes>
		</BrowserRouter>
	)
}

export default App
