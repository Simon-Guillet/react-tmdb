import React from "react"

// Style imports
import "./Header.css"

const Header = (props) => {
	return (
		<header>
			<div className="title">{props.title}</div>
			<ul className="nav">
				<li>
					{props.title === "Home page" ||
					props.title === "Movie Details" ? (
						<a href="/" aria-current="page">
							Movies
						</a>
					) : (
						<a href="/">Movies</a>
					)}
				</li>
				<li>
					{props.title === "Tv Shows" ||
					props.title === "Series Details" ? (
						<a href="/tvs" aria-current="page">
							TV Shows
						</a>
					) : (
						<a href="/tvs">TV Shows</a>
					)}
				</li>
			</ul>
			<button
				onClick={() => {
					localStorage.removeItem("user")
					localStorage.removeItem("token")
					window.location.href = "/login"
				}}
			>
				Logout
			</button>
		</header>
	)
}

export default Header
