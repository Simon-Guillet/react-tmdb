import React from "react"

// Style imports
import "./Header.css"

const Header = (props) => {
	return (
		<header>
			<div className="title">{props.title}</div>
			<ul className="nav">
				<li>
					<a href="/">Movies</a>
				</li>
				<li>
					<a href="/tvs">TV Shows</a>
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
